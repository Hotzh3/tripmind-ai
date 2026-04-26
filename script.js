const countrySelect = document.querySelector("#country");
const destinationSelect = document.querySelector("#destination");
const tripForm = document.querySelector("#tripForm");
const resultsSection = document.querySelector("#results");
const tripSummary = document.querySelector("#tripSummary");
const itineraryOutput = document.querySelector("#itineraryOutput");
const previewSection = document.querySelector("#preview");

const selectedInterests = [];
const selectedAmenities = [];

function setChoiceButtonState(button, isSelected) {
  button.classList.toggle("active", isSelected);
  button.setAttribute("aria-pressed", String(isSelected));
}

function wait(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

function showFormMessage(message, type = "error") {
  let messageBox = document.querySelector("#formMessage");

  if (!messageBox) {
    messageBox = document.createElement("div");
    messageBox.id = "formMessage";
    messageBox.className = "form-message";
    tripForm.prepend(messageBox);
  }

  messageBox.textContent = message;
  messageBox.className = `form-message ${type}`;
  messageBox.classList.remove("hidden");

  setTimeout(function () {
    messageBox.classList.add("hidden");
  }, 4500);
}

const countryDisplayNames = {
  mexico: "Mexico",
  usa: "United States",
  france: "France",
  uk: "United Kingdom",
  italy: "Italy",
  spain: "Spain",
  japan: "Japan",
  "south-korea": "South Korea",
  uae: "United Arab Emirates",
  argentina: "Argentina",
  peru: "Peru",
  colombia: "Colombia",
  australia: "Australia"
};

const wikipediaSearchAliases = {
  Nara: "Nara, Nara, Japan",
  Nice: "Nice, France",
  Mérida: "Mérida, Yucatán",
  Córdoba: "Córdoba, Argentina",
  Granada: "Granada, Spain",
  Valencia: "Valencia, Spain",
  Naples: "Naples, Italy",
  Perth: "Perth, Australia",
  Santiago: "Santiago, Chile"
};

function injectLoadingBarFix() {
  if (document.querySelector("#loadingBarFixStyle")) return;

  const style = document.createElement("style");
  style.id = "loadingBarFixStyle";
  style.textContent = `
    .loading-card::after {
      display: none !important;
      content: none !important;
    }
  `;
  document.head.appendChild(style);
}

injectLoadingBarFix();

function getWikipediaQuery(city, countryValue) {
  if (wikipediaSearchAliases[city]) {
    return wikipediaSearchAliases[city];
  }

  const countryName = countryDisplayNames[countryValue];

  if (countryName) {
    return `${city}, ${countryName}`;
  }

  return city;
}

function isWeakWikipediaDescription(description, city) {
  if (!description) return true;

  const normalizedDescription = description.toLowerCase();
  const normalizedCity = city.toLowerCase();

  return (
    normalizedDescription.includes("may refer to") ||
    normalizedDescription.includes("can refer to") ||
    normalizedDescription.length < 80 ||
    !normalizedDescription.includes(normalizedCity)
  );
}

function buildDestinationDescription(city, wikipediaDescription, style, interests, amenities) {
  const interestText = formatPreferenceList(interests, "your selected interests");
  const amenityText = formatPreferenceList(amenities, "your preferred amenities");
  const baseDescription = wikipediaDescription && !isWeakWikipediaDescription(wikipediaDescription, city)
    ? wikipediaDescription
    : `${city} is the selected destination for this TripMind AI itinerary.`;

  return `${baseDescription} For this trip, TripMind AI uses your ${style} travel style, ${interestText}, and ${amenityText} to shape a route that feels more personal than a generic travel list. The itinerary below combines destination context, nearby place data, stay options, budget level, and daily pacing so each day has a clear focus while still leaving room for flexibility, food, rest, and spontaneous discoveries.`;
}

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1800&q=80"
];

const cityBackgrounds = {
  "Mexico City": "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1800&q=80",
  Cancún: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  Oaxaca: "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&w=1800&q=80",
  Guadalajara: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1800&q=80",
  Monterrey: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1800&q=80",
  Mérida: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",

  "New York City": "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1800&q=80",
  "Los Angeles": "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1800&q=80",
  Chicago: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1800&q=80",
  Miami: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  "San Francisco": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1800&q=80",
  "Las Vegas": "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1800&q=80",

  Paris: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80",
  Lyon: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=80",
  Nice: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  Marseille: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  Bordeaux: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",

  London: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80",
  Manchester: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80",
  Edinburgh: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
  Liverpool: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1800&q=80",

  Rome: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=80",
  Florence: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=80",
  Venice: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1800&q=80",
  Milan: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=80",
  Naples: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1800&q=80",

  Barcelona: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",
  Madrid: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1800&q=80",
  Seville: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",
  Valencia: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",
  Granada: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=80",

  Tokyo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=80",
  Kyoto: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1800&q=80",
  Osaka: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=1800&q=80",
  Nara: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1800&q=80",
  Sapporo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1800&q=80",

  Seoul: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1800&q=80",
  Busan: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1800&q=80",
  Jeju: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  Incheon: "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1800&q=80",

  Dubai: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",
  "Abu Dhabi": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",
  Sharjah: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=80",

  "Buenos Aires": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1800&q=80",
  Mendoza: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
  Bariloche: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
  Córdoba: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=1800&q=80",

  Lima: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80",
  Cusco: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80",
  Arequipa: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80",

  Bogotá: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=80",
  Medellín: "https://images.unsplash.com/photo-1583997052301-0042b33fc598?auto=format&fit=crop&w=1800&q=80",
  Cartagena: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
  Cali: "https://images.unsplash.com/photo-1583997052301-0042b33fc598?auto=format&fit=crop&w=1800&q=80",

  Sydney: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1800&q=80",
  Melbourne: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1800&q=80",
  Brisbane: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1800&q=80",
  Perth: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1800&q=80"
};

const citiesByCountry = {
  mexico: ["Mexico City", "Cancún", "Oaxaca", "Guadalajara", "Monterrey", "Mérida"],
  usa: ["New York City", "Los Angeles", "Chicago", "Miami", "San Francisco", "Las Vegas"],
  france: ["Paris", "Lyon", "Nice", "Marseille", "Bordeaux"],
  uk: ["London", "Manchester", "Edinburgh", "Liverpool"],
  italy: ["Rome", "Florence", "Venice", "Milan", "Naples"],
  spain: ["Barcelona", "Madrid", "Seville", "Valencia", "Granada"],
  japan: ["Tokyo", "Kyoto", "Osaka", "Nara", "Sapporo"],
  "south-korea": ["Seoul", "Busan", "Jeju", "Incheon"],
  uae: ["Dubai", "Abu Dhabi", "Sharjah"],
  argentina: ["Buenos Aires", "Mendoza", "Bariloche", "Córdoba"],
  peru: ["Lima", "Cusco", "Arequipa"],
  colombia: ["Bogotá", "Medellín", "Cartagena", "Cali"],
  australia: ["Sydney", "Melbourne", "Brisbane", "Perth"]
};

const itineraryTemplates = {
  culture: ["Historic center", "Museum visit", "Local architecture walk"],
  food: ["Local breakfast", "Food market tour", "Dinner at a recommended restaurant"],
  adventure: ["Outdoor activity", "Scenic viewpoint", "Active afternoon experience"],
  relax: ["Slow morning", "Spa or quiet cafe", "Sunset walk"],
  romantic: ["Beautiful brunch spot", "Couple-friendly attraction", "Romantic dinner"],
  luxury: ["Luxury hotel breakfast", "Private city experience", "Fine dining dinner"],
  nightlife: ["Late brunch", "Trendy district walk", "Nightlife experience"],
  family: ["Family attraction", "Relaxed lunch spot", "Easy evening walk"],
  nature: ["Nature walk", "Scenic viewpoint", "Outdoor sunset plan"],
  shopping: ["Shopping district", "Local boutiques", "Mall or market visit"],
  business: ["Efficient breakfast", "Coworking-friendly area", "Short evening activity"],
  solo: ["Walkable neighborhood", "Museum or cafe", "Safe evening plan"],
  photography: ["Iconic photo spot", "Architecture walk", "Golden hour viewpoint"]
};

const placeTypeByStyle = {
  culture: "museum",
  food: "restaurant",
  relax: "cafe",
  romantic: "restaurant",
  shopping: "tourism",
  adventure: "tourism",
  nature: "tourism",
  nightlife: "restaurant",
  family: "tourism",
  luxury: "hotel",
  business: "cafe",
  solo: "tourism",
  photography: "tourism"
};

function setHeroBackground(imageUrl) {
  const heroSection = document.querySelector(".hero");

  heroSection.classList.add("is-fading");

  setTimeout(function () {
    heroSection.style.background = `
      linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.55)),
      url("${imageUrl}")
    `;
    heroSection.style.backgroundSize = "cover";
    heroSection.style.backgroundPosition = "center";

    heroSection.classList.remove("is-fading");
  }, 450);
}

function updatePlannerBackground(city) {
  const plannerSection = document.querySelector(".planner");
  const imageUrl = cityBackgrounds[city];

  if (!imageUrl) return;

  plannerSection.style.setProperty("--planner-bg", `url("${imageUrl}")`);
}

let heroIndex = 0;

setInterval(function () {
  if (destinationSelect.value) return;

  heroIndex = (heroIndex + 1) % heroImages.length;
  setHeroBackground(heroImages[heroIndex]);
}, 5000);

function setupMultiSelectButtons(containerSelector, selectedArray) {
  const buttons = document.querySelectorAll(`${containerSelector} .choice-btn`);

  buttons.forEach(function (button) {
    button.setAttribute("type", "button");
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", function () {
      const value = button.dataset.value;
      const isAlreadySelected = selectedArray.includes(value);

      if (isAlreadySelected) {
        selectedArray.splice(selectedArray.indexOf(value), 1);
        setChoiceButtonState(button, false);
      } else {
        selectedArray.push(value);
        setChoiceButtonState(button, true);
      }
    });
  });
}

setupMultiSelectButtons("#interests", selectedInterests);
setupMultiSelectButtons("#amenities", selectedAmenities);

function updateCityOptions() {
  const selectedCountry = countrySelect.value;
  const cities = citiesByCountry[selectedCountry] || [];
  const currentDestination = destinationSelect.value;

  destinationSelect.innerHTML = `<option value="">Choose a city</option>`;

  cities.forEach(function (city) {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    destinationSelect.appendChild(option);
  });

  if (cities.includes(currentDestination)) {
    destinationSelect.value = currentDestination;
  }

  if (destinationSelect.value) {
    updatePlannerBackground(destinationSelect.value);
  }
}

countrySelect.addEventListener("change", function () {
  updateCityOptions();
});

updateCityOptions();

destinationSelect.addEventListener("change", function () {
  updatePlannerBackground(destinationSelect.value);
});

function calculateTripLength(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const differenceInTime = end - start;
  const nights = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
  const days = nights + 1;

  return { days, nights };
}

function getSeasonAnalysis(startDate) {
  const date = new Date(startDate);
  const month = date.getMonth() + 1;

  if (month === 12 || month === 7 || month === 8) {
    return {
      season: "High season",
      recommendation:
        "These dates may be more expensive and crowded. TripMind AI recommends booking lodging and activities early."
    };
  }

  if (month === 4 || month === 5 || month === 9 || month === 10) {
    return {
      season: "Shoulder season",
      recommendation:
        "These dates are a strong choice. You may find better prices, pleasant weather, and fewer crowds."
    };
  }

  return {
    season: "Low season",
    recommendation:
      "These dates may offer lower prices and calmer attractions. TripMind AI recommends checking weather conditions before booking."
  };
}

function getBudgetTier(budget) {
  const normalizedBudget = budget.toLowerCase().trim();

  if (!normalizedBudget || normalizedBudget.includes("flexible")) {
    return "Flexible";
  }

  const numberMatch = normalizedBudget.match(/\d+/);

  if (!numberMatch) return "Flexible";

  const amount = Number(numberMatch[0]);

  if (amount < 300) return "Low-cost";
  if (amount <= 900) return "Balanced";
  return "Premium";
}

function getDailyEstimate(budgetTier) {
  if (budgetTier === "Low-cost") {
    return "Prioritize free attractions, public transportation, and casual food spots.";
  }

  if (budgetTier === "Premium") {
    return "Include curated experiences, premium restaurants, and private transportation options.";
  }

  return "Balance iconic attractions, comfortable food choices, and efficient transportation.";
}

function getStayRecommendation(budgetTier) {
  if (budgetTier === "Low-cost") {
    return {
      type: "Budget hotel or hostel",
      rooms: "1 private room or shared room",
      bathrooms: "Shared or 1 bathroom",
      note: "Best for saving money and staying close to public transportation."
    };
  }

  if (budgetTier === "Premium") {
    return {
      type: "Boutique hotel or premium apartment",
      rooms: "1-2 bedrooms",
      bathrooms: "1-2 bathrooms",
      note: "Best for comfort, location, and curated experiences."
    };
  }

  return {
    type: "Comfort hotel or central apartment",
    rooms: "1 bedroom",
    bathrooms: "1 bathroom",
    note: "Best balance between comfort, price, and location."
  };
}

function getDailyBudgetEstimate(budgetTier) {
  if (budgetTier === "Low-cost") return "$40 - $80 USD";
  if (budgetTier === "Premium") return "$180 - $350 USD";
  return "$90 - $170 USD";


}

function getRecommendedArea(style) {
  const areas = {
    culture: "Historic center or museum district",
    food: "Food market district or restaurant zone",
    adventure: "Area close to outdoor activities",
    relax: "Quiet neighborhood near parks or wellness spots",
    romantic: "Scenic or boutique neighborhood",
    luxury: "Premium hotel zone",
    nightlife: "Nightlife district",
    family: "Safe central family-friendly area",
    nature: "Area close to parks or nature routes",
    shopping: "Shopping district",
    business: "Business district or coworking area",
    solo: "Walkable and safe central area",
    photography: "Scenic district with viewpoints"
  };

  return areas[style] || "Central and well-connected area";
}

function getNearbyPlaces(destination, style, amenities) {
  return [
    `${destination} local restaurants`,
    `${destination} public transport access`,
    `${destination} main attractions`,
    amenities || "nearby cafés, pharmacies, and safe areas",
    getRecommendedArea(style)
  ];
}

function formatPreferenceList(value, fallbackText) {
  if (!value || !value.trim()) return fallbackText;

  return value
    .split(",")
    .map(function (item) {
      return item.trim();
    })
    .filter(function (item) {
      return item.length > 0;
    })
    .join(", ");
}

function getInterestBasedTip(interests, style) {
  const selected = interests.toLowerCase();

  if (selected.includes("local food") || selected.includes("street food")) {
    return "Add a local food stop between main activities to make the route feel more authentic.";
  }

  if (selected.includes("museums") || selected.includes("history") || style === "culture") {
    return "Prioritize historic areas, museums, and walkable cultural districts.";
  }

  if (selected.includes("beaches") || selected.includes("nature") || selected.includes("hiking")) {
    return "Keep part of the day open for outdoor time, viewpoints, or nature-based activities.";
  }

  if (selected.includes("shopping") || style === "shopping") {
    return "Include a shopping district, local boutiques, or a market during the afternoon.";
  }

  if (selected.includes("nightlife") || style === "nightlife") {
    return "Save energy for the evening and choose a stay near nightlife or safe transportation.";
  }

  if (selected.includes("romance") || style === "romantic") {
    return "Choose scenic places, slower pacing, and dinner spots with a special atmosphere.";
  }

  return "Use the selected interests to balance iconic spots with personal experiences.";
}


function getAmenityBasedTip(amenities) {
  const selected = amenities.toLowerCase();
  const tips = [];

  if (selected.includes("public transport")) {
    tips.push("stay close to metro, bus, or train access");
  }

  if (selected.includes("restaurants nearby")) {
    tips.push("choose areas with food options within walking distance");
  }

  if (selected.includes("pharmacies nearby")) {
    tips.push("check for pharmacies near the hotel zone");
  }

  if (selected.includes("safe areas")) {
    tips.push("prioritize safe and well-lit neighborhoods");
  }

  if (selected.includes("parking")) {
    tips.push("confirm parking before booking lodging");
  }

  if (selected.includes("pet friendly")) {
    tips.push("verify pet policies before reserving");
  }

  if (tips.length === 0) {
    return "No required amenity selected, so the plan keeps the location flexible.";
  }

  return `Based on your amenities, ${tips.join(", ")}.`;
}

function buildSmartDailyPlan(dayNumber, destination, style, interests, amenities, realPlaces = []) {
  const selectedInterests = interests.toLowerCase();
  const selectedAmenities = amenities.toLowerCase();
  const hasRealPlaces = realPlaces.length > 0;

  const firstPlace = hasRealPlaces
    ? realPlaces[(dayNumber - 1) % realPlaces.length].name
    : `${destination} central area`;

  const secondPlace = hasRealPlaces
    ? realPlaces[dayNumber % realPlaces.length].name
    : `${destination} recommended attraction`;

  const thirdPlace = hasRealPlaces
    ? realPlaces[(dayNumber + 1) % realPlaces.length].name
    : `${destination} evening area`;

  let morning = `Start the morning at ${firstPlace} to get familiar with the area.`;
  let afternoon = `Continue with ${secondPlace} as the main activity of the day.`;
  let evening = `Finish near ${thirdPlace} with a slower evening plan.`;

  if (style === "culture" || selectedInterests.includes("history") || selectedInterests.includes("museums")) {
    morning = `Start with a cultural visit around ${firstPlace}.`;
    afternoon = `Use the afternoon for ${secondPlace}, focusing on history, museums, or architecture.`;
    evening = `End near ${thirdPlace} with a relaxed walk through a historic or central area.`;
  }

  if (style === "food" || selectedInterests.includes("local food") || selectedInterests.includes("street food")) {
    morning = `Start with breakfast or coffee near ${firstPlace}.`;
    afternoon = `Explore ${secondPlace} and add a local food stop nearby.`;
    evening = `Finish near ${thirdPlace} with dinner in a lively restaurant area.`;
  }

  if (style === "relax" || selectedInterests.includes("spa")) {
    morning = `Begin slowly near ${firstPlace}, avoiding an overloaded schedule.`;
    afternoon = `Visit ${secondPlace} at a calm pace and leave room for rest.`;
    evening = `End near ${thirdPlace} with a quiet dinner, cafe, or wellness activity.`;
  }

  if (style === "adventure" || selectedInterests.includes("adrenaline") || selectedInterests.includes("hiking")) {
    morning = `Start early near ${firstPlace} to take advantage of daylight.`;
    afternoon = `Use ${secondPlace} as the active or outdoor highlight of the day.`;
    evening = `Finish near ${thirdPlace} and keep the evening flexible for recovery.`;
  }

  if (style === "shopping" || selectedInterests.includes("shopping") || selectedInterests.includes("markets")) {
    morning = `Start near ${firstPlace} and check nearby boutiques or markets.`;
    afternoon = `Dedicate the afternoon to ${secondPlace} as the main shopping or browsing stop.`;
    evening = `Finish near ${thirdPlace}, ideally close to food options and transportation.`;
  }

  if (selectedInterests.includes("beaches")) {
    evening = `End the day near ${thirdPlace}, leaving time for a beach walk or sunset view if available.`;
  }

  if (selectedAmenities.includes("parking")) {
    afternoon += " Confirm parking availability before moving between stops.";
  }

  if (selectedAmenities.includes("public transport")) {
    evening += " Prefer routes that stay close to public transportation.";
  }

  if (selectedAmenities.includes("pet friendly")) {
    morning += " Check pet-friendly access before arriving.";
  }

  return { morning, afternoon, evening };
}


function generateDayPlan(dayNumber, destination, style, interests, amenities, budgetTier, realPlaces = [], realHotels = []) {
  const activities = itineraryTemplates[style] || itineraryTemplates.culture;
  const mainActivity = activities[(dayNumber - 1) % activities.length];
  const stay = getStayRecommendation(budgetTier);
  const dailyBudget = getDailyBudgetEstimate(budgetTier);
  const recommendedArea = getRecommendedArea(style);
  const nearbyPlaces = getNearbyPlaces(destination, style, amenities);
  const interestSummary = formatPreferenceList(interests, "No specific interests selected");
  const amenitySummary = formatPreferenceList(amenities, "No specific amenities selected");
  const interestTip = getInterestBasedTip(interests, style);
  const amenityTip = getAmenityBasedTip(amenities);

  const hotelOptions = realHotels.length
    ? realHotels
        .slice((dayNumber - 1) % realHotels.length, ((dayNumber - 1) % realHotels.length) + 3)
        .map(function (hotel) {
          return `<li><strong>${hotel.name}</strong> — ${hotel.type}</li>`;
        })
        .join("")
    : `<li>${stay.type} — estimated option based on your budget tier</li>`;

  const realPlaceOptions = realPlaces.length
    ? realPlaces
        .slice((dayNumber - 1) % realPlaces.length, ((dayNumber - 1) % realPlaces.length) + 3)
        .map(function (place) {
          return `<li><strong>${place.name}</strong> — ${place.type}</li>`;
        })
        .join("")
    : nearbyPlaces
        .map(function (place) {
          return `<li>${place} — suggested fallback when live place data is limited</li>`;
        })
        .join("");

  const smartPlan = buildSmartDailyPlan(
    dayNumber,
    destination,
    style,
    interests,
    amenities,
    realPlaces
  );

  return `
    <article class="day-card">
      <h3>Day ${dayNumber} · ${destination}</h3>

      <p><strong>Main focus:</strong> ${mainActivity} in ${destination}</p>

      <div class="mini-section">
        <h4>🏨 Real stay options</h4>
        <ul>
          ${hotelOptions}
        </ul>
      </div>

      <div class="mini-section">
        <h4>📍 Recommended area</h4>
        <p>${recommendedArea}</p>
      </div>

      <div class="mini-section">
        <h4>🧭 Real nearby places</h4>
        <ul>
          ${realPlaceOptions}
        </ul>
      </div>

      <div class="mini-section">
        <h4>🎯 Preference match</h4>
        <p><strong>Selected interests:</strong> ${interestSummary}</p>
        <p><strong>Important amenities:</strong> ${amenitySummary}</p>
        <p>${interestTip}</p>
        <p>${amenityTip}</p>
      </div>

      <div class="mini-section">
        <h4>🗓 Smart daily plan</h4>
        <ul>
          <li><strong>Morning:</strong> ${smartPlan.morning}</li>
          <li><strong>Afternoon:</strong> ${smartPlan.afternoon}</li>
          <li><strong>Evening:</strong> ${smartPlan.evening}</li>
        </ul>
      </div>

      <div class="mini-section">
        <h4>💸 Budget estimate</h4>
        <p><strong>Estimated daily spend:</strong> ${dailyBudget}</p>
        <p>${getDailyEstimate(budgetTier)}</p>
      </div>
    </article>
  `;
}


tripForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const country = document.querySelector("#country").value;
  const destination = document.querySelector("#destination").value;
  const startDate = document.querySelector("#startDate").value;
  const endDate = document.querySelector("#endDate").value;
  const budget = document.querySelector("#budget").value.trim();
  const style = document.querySelector("#style").value;
  const interests = selectedInterests.join(", ");
  const amenities = selectedAmenities.join(", ");

  if (!country || !destination || !startDate || !endDate || !style) {
    showFormMessage("Please complete country, city, dates, and travel style before generating your itinerary.");
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const tripLength = calculateTripLength(startDate, endDate);

  if (tripLength.nights < 1) {
    showFormMessage("Return date must be after the departure date.");
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (budget && Number(budget) < 0) {
    showFormMessage("Budget must be a positive amount.");
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  resultsSection.classList.remove("hidden");
  tripSummary.innerHTML = "";
  previewSection.innerHTML = "";
  itineraryOutput.innerHTML = `
    <article class="loading-card">
      <div class="loading-spinner"></div>
      <h3 id="loadingTitle">Generating your AI travel plan...</h3>
      <p id="loadingText">Fetching destination insights...</p>
      <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
      </div>
    </article>
  `;

  const loadingStartTime = Date.now();
  const loadingText = document.querySelector("#loadingText");
  const progressBar = document.querySelector("#progressBar");

  if (progressBar) progressBar.style.width = "12%";

  setTimeout(() => {
    if (loadingText) loadingText.textContent = "Finding top hotels...";
    if (progressBar) progressBar.style.width = "35%";
  }, 1000);

  setTimeout(() => {
    if (loadingText) loadingText.textContent = "Searching attractions and local spots...";
    if (progressBar) progressBar.style.width = "68%";
  }, 2000);

  setTimeout(() => {
    if (loadingText) loadingText.textContent = "Building your smart itinerary...";
    if (progressBar) progressBar.style.width = "90%";
  }, 3000);


  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

  const placeType = placeTypeByStyle[style] || "tourism";
  const [realPlaces, realHotels] = await Promise.all([
    fetchPlacesData(destination, placeType),
    fetchPlacesData(destination, "hotel"),
    fetchWikipediaData(destination, country, style, interests, amenities)
  ]).then(function (results) {
    return [results[0], results[1]];
  });

  const loadingElapsedTime = Date.now() - loadingStartTime;

  if (loadingElapsedTime < 1400) {
    await wait(1400 - loadingElapsedTime);
  }


  const budgetTier = getBudgetTier(budget);
  const seasonInfo = getSeasonAnalysis(startDate);

  tripSummary.innerHTML = `
    <article class="summary-card">
      <span>Destination</span>
      <strong>${destination}</strong>
    </article>

    <article class="summary-card">
      <span>Trip length</span>
      <strong>${tripLength.days} days / ${tripLength.nights} nights</strong>
    </article>

    <article class="summary-card">
      <span>Budget tier</span>
      <strong>${budgetTier}</strong>
    </article>

    <article class="summary-card">
      <span>Travel style</span>
      <strong>${style}</strong>
    </article>

    <article class="summary-card">
      <span>Season analysis</span>
      <strong>${seasonInfo.season}</strong>
    </article>

    <article class="summary-card">
      <span>AI recommendation</span>
      <strong>${seasonInfo.recommendation}</strong>
    </article>

    <article class="summary-card">
      <span>Selected interests</span>
      <strong>${interests || "No specific interests selected"}</strong>
    </article>

    <article class="summary-card">
      <span>Important amenities</span>
      <strong>${amenities || "No specific amenities selected"}</strong>
    </article>

    <article class="summary-card itinerary-actions-card">
      <button type="button" class="btn primary itinerary-action-btn" id="copyItineraryBtn">Copy itinerary</button>
      <button type="button" class="btn primary itinerary-action-btn" id="downloadPdfBtn">Download PDF</button>
      <button type="button" class="btn primary itinerary-action-btn" id="planAnotherTripBtn">Plan another trip</button>
    </article>
  `;

  let itineraryHTML = "";

  for (let day = 1; day <= tripLength.days; day++) {
    itineraryHTML += generateDayPlan(
      day,
      destination,
      style,
      interests,
      amenities,
      budgetTier,
      realPlaces,
      realHotels
    );
  }


  if (progressBar) progressBar.style.width = "100%";
  itineraryOutput.innerHTML = itineraryHTML;

  const generatedCards = document.querySelectorAll(".day-card, .summary-card, .itinerary-actions-card");
      
  generatedCards.forEach((card, index) => {
    card.classList.remove(
      "fade-in",
      "fade-in-delay-1",
      "fade-in-delay-2",
      "fade-in-delay-3"
    );
  
    void card.offsetWidth;
  
    card.classList.add("fade-in");
  
    if (index === 0) card.classList.add("fade-in-delay-1");
    if (index === 1) card.classList.add("fade-in-delay-2");
    if (index >= 2) card.classList.add("fade-in-delay-3");
  });


  setupItineraryActions(destination);

  resultsSection.classList.remove("hidden");

  setTimeout(function () {
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 150);


});
function setupItineraryActions(destination) {
  const copyButton = document.querySelector("#copyItineraryBtn");
  const downloadButton = document.querySelector("#downloadPdfBtn");
  const planAnotherButton = document.querySelector("#planAnotherTripBtn");

  if (copyButton) {
    copyButton.addEventListener("click", async function () {
      const itineraryText = [
        tripSummary.innerText,
        previewSection.innerText,
        itineraryOutput.innerText
      ].join("\n\n");

      function markCopied() {
        copyButton.textContent = "Copied!";
        showFormMessage("Itinerary copied to clipboard.", "success");
        setTimeout(function () {
          copyButton.textContent = "Copy itinerary";
        }, 1800);
      }

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(itineraryText);
          markCopied();
          return;
        }

        const temporaryTextArea = document.createElement("textarea");
        temporaryTextArea.value = itineraryText;
        temporaryTextArea.setAttribute("readonly", "");
        temporaryTextArea.style.position = "fixed";
        temporaryTextArea.style.opacity = "0";
        document.body.appendChild(temporaryTextArea);
        temporaryTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(temporaryTextArea);
        markCopied();
      } catch (error) {
        console.error("Copy failed:", error);
        copyButton.textContent = "Copy failed";
        showFormMessage("Copy failed. Please try again or use the PDF export.");
        setTimeout(function () {
          copyButton.textContent = "Copy itinerary";
        }, 1800);
      }
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      const pdfWindow = window.open("", "_blank");

      if (!pdfWindow) {
        showFormMessage("Please allow pop-ups to open the PDF export view.");
        return;
      }

      showFormMessage("Opening your printable PDF view. Choose Save as PDF in the print dialog.", "success");

      const safeDestination = destination || "Trip";
      const summaryClone = tripSummary.cloneNode(true);
      const actionsClone = summaryClone.querySelector(".itinerary-actions-card");

      if (actionsClone) {
        actionsClone.remove();
      }

      const summaryHTML = summaryClone.innerHTML;
      const previewHTML = previewSection.innerHTML;
      const itineraryHTML = itineraryOutput.innerHTML;

      pdfWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>TripMind AI Itinerary PDF</title>
            <style>
              * { box-sizing: border-box; }
              body {
                margin: 0;
                padding: 32px;
                font-family: Arial, Helvetica, sans-serif;
                background: #ffffff;
                color: #111827;
                line-height: 1.5;
              }
              h1, h2, h3, h4 { color: #0f172a; }
              h1 { font-size: 32px; margin-bottom: 8px; }
              .pdf-subtitle { color: #475569; margin-bottom: 24px; }
              .trip-summary, .itinerary-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 14px;
              }
              .summary-card, .day-card {
                border: 1px solid #cbd5e1;
                border-radius: 14px;
                padding: 16px;
                margin-bottom: 14px;
                page-break-inside: avoid;
              }
              .summary-card span {
                display: block;
                color: #0284c7;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                margin-bottom: 6px;
              }
              .summary-card strong { color: #111827; }
              .wiki-image {
                width: 100%;
                max-height: 260px;
                object-fit: cover;
                border-radius: 10px;
                margin: 10px 0;
              }
              a { color: #0284c7; }
              ul { padding-left: 20px; }
              @media print {
                body { padding: 24px; }
                .day-card, .summary-card { break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <h1>TripMind AI Itinerary</h1>
            <p class="pdf-subtitle">Generated itinerary for ${safeDestination}.</p>
            <h2>Trip summary</h2>
            <section class="trip-summary">${summaryHTML}</section>
            <h2>Destination overview</h2>
            <section>${previewHTML}</section>
            <h2>Daily itinerary</h2>
            <section class="itinerary-grid">${itineraryHTML}</section>
            <script>
              window.onload = function () {
                window.print();
              };
            <\/script>
          </body>
        </html>
      `);

      pdfWindow.document.close();
    });
  }

  if (planAnotherButton) {
    planAnotherButton.addEventListener("click", function () {
      resultsSection.classList.add("hidden");
      tripSummary.innerHTML = "";
      previewSection.innerHTML = "";
      itineraryOutput.innerHTML = "";

      tripForm.reset();
      selectedInterests.length = 0;
      selectedAmenities.length = 0; 

      document.querySelectorAll(".choice-btn.active").forEach(function (button) {
        setChoiceButtonState(button, false);
      });

      updateCityOptions();
      showFormMessage("Ready for a new trip. Your previous selections were cleared.", "success");
      tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}


async function fetchWikipediaData(city, countryValue, style = "balanced", interests = "", amenities = "") {
  try {
    const wikipediaQuery = getWikipediaQuery(city, countryValue);
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaQuery)}`
    );

    if (!response.ok) {
      throw new Error(`Wikipedia request failed with status ${response.status}`);
    }

    const data = await response.json();
    const fallbackImage = cityBackgrounds[city] || heroImages[0];
    const image = data.originalimage?.source || data.thumbnail?.source || fallbackImage;
    const description = buildDestinationDescription(
      city,
      data.extract || "",
      style,
      interests,
      amenities
    );

    const wikiCard = `
    <article class="day-card destination-card">
      <h3>🌎 Destination overview: ${city}</h3>
      <img src="${image}" class="wiki-image" alt="${city}">
      <p>${description}</p>
      ${data.content_urls?.desktop?.page || data.content_urls?.mobile?.page
        ? `<a href="${data.content_urls?.desktop?.page || data.content_urls?.mobile?.page}" target="_blank">Read more on Wikipedia</a>`
        : ""} 

      </article>
    `;

    previewSection.innerHTML = wikiCard;
    return true;
  } catch (error) {
    console.error("Wikipedia fetch failed:", error);

    const fallbackImage = cityBackgrounds[city] || heroImages[0];
    
    previewSection.innerHTML = `
      <article class="day-card destination-card">
        <h3>🌎 Destination overview: ${city}</h3>
        <img src="${fallbackImage}" class="wiki-image" alt="${city}">
        <p>${buildDestinationDescription(city, "", style, interests, amenities)}</p>
      </article>
    `;

    return false;
  }
}

async function fetchPlacesData(city, type = "tourism") {
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
    ],
    tourism: [
      { name: `${city} historic center`, type: "attraction" },
      { name: `${city} local restaurant district`, type: "restaurant" },
      { name: `${city} main museum area`, type: "museum" },
      { name: `${city} cafe zone`, type: "cafe" },
      { name: `${city} public park`, type: "leisure" },
      { name: `${city} shopping area`, type: "shopping" }
    ]
  };

  return fallbackByType[type] || fallbackByType.tourism;
}