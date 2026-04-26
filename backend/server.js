const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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
  res.send("TripMind AI backend is running");
});

app.get("/api/wikipedia", async function (req, res) {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json({
      title: data.title,
      description: data.extract,
      image: data.originalimage?.source || data.thumbnail?.source || null,
      url: data.content_urls?.desktop?.page || null
    });
  } catch (error) {
    res.status(500).json({ error: "Wikipedia request failed" });
  }
});

app.get("/api/places", async function (req, res) {
  const city = req.query.city;
  const type = req.query.type || "tourism";
  const radius = type === "hotel" ? 8000 : 5000;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}&limit=1`;

    const locationResponse = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "TripMindAI/1.0"
      }
    });

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

    let placesData = null;

    for (const serverUrl of overpassServers) {
      try {
        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "data=" + encodeURIComponent(query)
        });

        const text = await response.text();

        if (!response.ok || text.trim().startsWith("<")) {
          continue;
        }

        placesData = JSON.parse(text);
        break;
      } catch (error) {
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
    res.status(500).json({
      error: "OpenStreetMap request failed",
      details: error.message
    });
  }
});

app.listen(PORT, function () {
  console.log(`TripMind AI backend running on http://localhost:${PORT}`);
});