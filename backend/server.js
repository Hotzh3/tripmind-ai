require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);

const GITHUB_PAGES_ORIGIN = /^https:\/\/[a-z0-9-]+\.github\.io$/i;
const VERCEL_PREVIEW_ORIGIN = /^https:\/\/[a-z0-9.-]+\.vercel\.app$/i;
const LOCALHOST_ORIGIN = /^http:\/\/localhost(?::\d+)?$/i;
const LOOPBACK_ORIGIN = /^http:\/\/127\.0\.0\.1(?::\d+)?$/i;

function extraAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || "";
  return raw
    .split(",")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
}

function isOriginAllowed(origin) {
  if (!origin) {
    return true;
  }
  if (GITHUB_PAGES_ORIGIN.test(origin)) {
    return true;
  }
  if (VERCEL_PREVIEW_ORIGIN.test(origin)) {
    return true;
  }
  if (LOCALHOST_ORIGIN.test(origin)) {
    return true;
  }
  if (LOOPBACK_ORIGIN.test(origin)) {
    return true;
  }
  return extraAllowedOrigins().indexOf(origin) !== -1;
}

app.use(
  cors({
    origin: function (origin, callback) {
      if (isOriginAllowed(origin)) {
        callback(null, origin || true);
      } else {
        console.warn("[cors] blocked origin:", origin);
        callback(null, false);
      }
    }
  })
);

app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again in a few minutes." },
  validate: { trustProxy: true }
});

function fetchWithTimeout(url, options, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(function () {
    controller.abort();
  }, timeoutMs);

  const opts = Object.assign({}, options || {}, { signal: controller.signal });
  return fetch(url, opts).finally(function () {
    clearTimeout(id);
  });
}

function getFallbackPlaces(city, type) {
  const fallbackByType = {
    hotel: [
      { name: `${city} budget hotel area`, type: "hotel" },
      { name: `${city} boutique hotel zone`, type: "hotel" },
      { name: `${city} central accommodation district`, type: "hotel" }
    ],
    museum: [
      { name: `${city} main museum area`, type: "museum" },
      { name: `${city} art museum district`, type: "museum" },
      { name: `${city} historic exhibition center`, type: "museum" }
    ],
    restaurant: [
      { name: `${city} local restaurant district`, type: "restaurant" },
      { name: `${city} food market area`, type: "restaurant" },
      { name: `${city} traditional dining zone`, type: "restaurant" }
    ],
    cafe: [
      { name: `${city} cafe zone`, type: "cafe" },
      { name: `${city} coffee shop district`, type: "cafe" },
      { name: `${city} quiet cafe area`, type: "cafe" }
    ]
  };

  return fallbackByType[type] || [
    { name: `${city} historic center`, type: "attraction" },
    { name: `${city} local restaurant district`, type: "restaurant" },
    { name: `${city} main museum area`, type: "museum" },
    { name: `${city} cafe zone`, type: "cafe" },
    { name: `${city} public park`, type: "leisure" },
    { name: `${city} shopping area`, type: "shopping" }
  ];
}

app.get("/", function (req, res) {
  res.json({
    status: "ok",
    message: "TripMind AI backend is running",
    endpoints: ["/api/wikipedia?city=Paris", "/api/places?city=Paris&type=tourism"]
  });
});

app.get("/api/health", function (req, res) {
  res.json({ status: "ok", service: "TripMind AI backend" });
});

app.get("/api/wikipedia", apiLimiter, async function (req, res) {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`;
    const response = await fetchWithTimeout(
      url,
      {},
      Number(process.env.WIKIPEDIA_FETCH_TIMEOUT_MS) || 15000
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Wikipedia city summary not found" });
    }

    const data = await response.json();

    res.json({
      title: data.title || city,
      description: data.extract || "No Wikipedia description available for this destination.",
      image: data.originalimage?.source || data.thumbnail?.source || null,
      url: data.content_urls?.desktop?.page || data.content_urls?.mobile?.page || null
    });
  } catch (error) {
    const isAbort = error && error.name === "AbortError";
    console.error("[api/wikipedia]", isAbort ? "timeout" : error.name, error.message || error, {
      city: req.query.city
    });
    res.status(isAbort ? 504 : 500).json({
      error: isAbort ? "Wikipedia request timed out" : "Wikipedia request failed"
    });
  }
});

app.get("/api/places", apiLimiter, async function (req, res) {
  const city = req.query.city;
  const type = req.query.type || "tourism";
  const radius = type === "hotel" ? 8000 : 5000;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;

    const locationResponse = await fetchWithTimeout(
      nominatimUrl,
      {
        headers: {
          "User-Agent": process.env.NOMINATIM_USER_AGENT || "TripMindAI/1.0 (+https://github.com/Hotzh3/tripmind-ai)"
        }
      },
      Number(process.env.NOMINATIM_FETCH_TIMEOUT_MS) || 18000
    );

    const locationData = await locationResponse.json();

    if (!locationData.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const lat = locationData[0].lat;
    const lon = locationData[0].lon;

    const query = `
      [out:json][timeout:25];
      (
        node["tourism"](around:${radius},${lat},${lon});
        node["amenity"="restaurant"](around:5000,${lat},${lon});
        node["amenity"="cafe"](around:5000,${lat},${lon});
        node["tourism"="hotel"](around:5000,${lat},${lon});
        node["tourism"="museum"](around:5000,${lat},${lon});
        node["leisure"](around:5000,${lat},${lon});
      );
      out center 20;
    `;

    const overpassServers = [
      "https://overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://maps.mail.ru/osm/tools/overpass/api/interpreter"
    ];

    const overpassTimeoutMs = Number(process.env.OVERPASS_FETCH_TIMEOUT_MS) || 32000;

    let placesData = null;

    for (const serverUrl of overpassServers) {
      try {
        const response = await fetchWithTimeout(
          serverUrl,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "data=" + encodeURIComponent(query)
          },
          overpassTimeoutMs
        );

        const text = await response.text();

        if (!response.ok || text.trim().startsWith("<")) {
          continue;
        }

        placesData = JSON.parse(text);
        break;
      } catch (error) {
        const isAbort = error && error.name === "AbortError";
        console.warn("[api/places][overpass]", isAbort ? "timeout" : error.name, serverUrl);
        continue;
      }
    }

    if (!placesData) {
      return res.json({
        city,
        type,
        coordinates: { lat, lon },
        source: "fallback",
        places: getFallbackPlaces(city, type)
      });
    }

    const places = (placesData.elements || [])
      .filter(function (place) {
        return place.tags && place.tags.name;
      })
      .filter(function (place) {
        if (type === "hotel") return place.tags.tourism === "hotel";
        if (type === "museum") return place.tags.tourism === "museum";
        if (type === "restaurant") return place.tags.amenity === "restaurant";
        if (type === "cafe") return place.tags.amenity === "cafe";
        return true;
      })
      .slice(0, 10)
      .map(function (place) {
        return {
          name: place.tags.name,
          type: place.tags.tourism || place.tags.amenity || place.tags.leisure || "place",
          lat: place.lat || place.center?.lat,
          lon: place.lon || place.center?.lon
        };
      });

    res.json({
      city,
      type,
      coordinates: { lat, lon },
      source: "openstreetmap",
      places: places.length ? places : getFallbackPlaces(city, type)
    });
  } catch (error) {
    const isAbort = error && error.name === "AbortError";
    console.error("[api/places]", isAbort ? "timeout" : error.name, error.message || error, {
      city: req.query.city,
      type: req.query.type
    });
    res.status(isAbort ? 504 : 500).json({
      error: isAbort ? "Places lookup timed out" : "OpenStreetMap request failed"
    });
  }
});

app.listen(PORT, function () {
  console.log(`TripMind AI backend running on port ${PORT}`);
});
