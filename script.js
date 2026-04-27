const countrySelect = document.querySelector("#country");
const destinationSelect = document.querySelector("#destination");
const tripForm = document.querySelector("#tripForm");
const resultsSection = document.querySelector("#results");
const tripSummary = document.querySelector("#tripSummary");
const itineraryOutput = document.querySelector("#itineraryOutput");
const previewSection = document.querySelector("#preview");
const languageSelect = document.querySelector("#languageSelect");
const currencySelect = document.querySelector("#currencySelect");
const tripModeInputs = document.querySelectorAll('input[name="tripMode"]');
const multiCityPanel = document.querySelector("#multiCityPanel");
const multiCityList = document.querySelector("#multiCityList");
const addCityButton = document.querySelector("#addCityButton");
const multiCityPanelTitle = document.querySelector("#multiCityPanelTitle");
const multiCityPanelText = document.querySelector("#multiCityPanelText");


let additionalCityCount = 0;

const currencyRates = {
  USD: { symbol: "$", rate: 1, suffix: "USD" },
  MXN: { symbol: "MX$", rate: 17, suffix: "MXN" },
  EUR: { symbol: "€", rate: 0.92, suffix: "EUR" },
  GBP: { symbol: "£", rate: 0.79, suffix: "GBP" },
  JPY: { symbol: "¥", rate: 155, suffix: "JPY" }
};

const translations = {
  en: {
    oneCity: "One city",
    sameCountry: "One country, multiple cities",
    multiCountry: "Multiple countries / cities",
    destinationOverview: "Destination overview",
    day: "Day",
    tripLength: "Trip length",
    budgetTier: "Budget tier",
    travelStyle: "Travel style",
    seasonAnalysis: "Season analysis",
    aiRecommendation: "AI recommendation",
    selectedInterests: "Selected interests",
    importantAmenities: "Important amenities",
    destinations: "Destinations",
    copyItinerary: "Copy itinerary",
    copied: "Copied!",
    downloadPdf: "Download PDF",
    planAnotherTrip: "Plan another trip",
    mainFocus: "Main focus",
    realStayOptions: "Real stay options",
    recommendedArea: "Recommended area",
    realNearbyPlaces: "Real nearby places",
    preferenceMatch: "Preference match",
    smartDailyPlan: "Smart daily plan",
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    budgetEstimate: "Budget estimate",
    estimatedDailySpend: "Estimated daily spend",
    generating: "Generating your AI travel plan...",
    fetching: "Fetching destination insights...",
    hotels: "Finding top hotels...",
    attractions: "Searching attractions and local spots...",
    building: "Building your smart itinerary...",
    readMore: "Read more on Wikipedia",
    completeForm: "Please complete country, city, dates, and travel style before generating your itinerary.",
    returnDate: "Return date must be after the departure date.",
    positiveBudget: "Budget must be a positive amount.",
    copiedMessage: "Itinerary copied to clipboard.",
    resetMessage: "Ready for a new trip. Your previous selections were cleared.",
    chooseMainCountry: "Choose the main country before adding more cities.",
    chooseMainDestination: "Choose the main destination before generating a multi-city itinerary.",
    sameCountryPanelTitle: "More cities in the same country",
    sameCountryPanelText: "Add extra cities from the country selected above.",
    multiCountryPanelTitle: "More countries and cities",
    multiCountryPanelText: "Add extra stops from different countries.",
    additionalCities: "Additional cities",
    additionalCitiesText: "Add more stops if your trip includes multiple destinations.",
    firstPrototype: "FIRST PROTOTYPE",
    createProfile: "Create your travel profile",
    profileIntro: "Fill out your travel profile and TripMind AI will generate a first itinerary preview.",
    tripMode: "Trip mode",
    country: "Country",
    city: "City",
    departureDate: "Departure date",
    returnDateLabel: "Return date",
    budget: "Budget",
    budgetPlaceholder: "Example: $500 USD or flexible",
    chooseCountry: "Choose a country",
    chooseCity: "Choose a city",
    chooseCountryFirst: "Choose a country first",
    travelStyleLabel: "Travel style",
    chooseOne: "Choose one",
    interestsLabel: "Interests",
    amenitiesLabel: "Important amenities",
    generateButton: "Generate itinerary preview",
    generatedPreview: "GENERATED PREVIEW",
    smartTitle: "Your smart travel itinerary",
    smartIntro: "TripMind AI combines your destination, dates, budget, travel style, interests, and nearby place data to create a personalized itinerary preview.",
    noInterests: "No specific interests selected",
    noAmenities: "No specific amenities selected",
    daysLabel: "days",
    nightsLabel: "nights",
    highSeason: "High season",
    shoulderSeason: "Shoulder season",
    lowSeason: "Low season",
    highSeasonRecommendation: "These dates may be more expensive and crowded. TripMind AI recommends booking lodging and activities early.",
    shoulderSeasonRecommendation: "These dates are a strong choice. You may find better prices, pleasant weather, and fewer crowds.",
    lowSeasonRecommendation: "These dates may offer lower prices and calmer attractions. TripMind AI recommends checking weather conditions before booking.",
    lowCost: "Low-cost",
    balanced: "Balanced",
    premium: "Premium",
    flexible: "Flexible",
    noSpecificInterests: "No specific interests selected",
    noSpecificAmenities: "No specific amenities selected",
    budgetHotel: "Budget hotel or hostel",
    premiumHotel: "Boutique hotel or premium apartment",
    balancedHotel: "Comfort hotel or central apartment",
    estimatedOption: "estimated option based on your budget tier",
    fallbackPlace: "suggested fallback when live place data is limited",
    premiumBudgetTip: "Include curated experiences, premium restaurants, and private transportation options.",
    lowBudgetTip: "Prioritize free attractions, public transportation, and casual food spots.",
    balancedBudgetTip: "Balance iconic attractions, comfortable food choices, and efficient transportation.",
    copiedFailed: "Copy failed",
    copyFailedMessage: "Copy failed. Please try again or use the PDF export.",
    popupMessage: "Please allow pop-ups to open the PDF export view.",
    pdfMessage: "Opening your printable PDF view. Choose Save as PDF in the print dialog.",
    currencyMessage: "Currency set to",
    regenerateMessage: "Generate the itinerary again to update estimates.",
    remove: "Remove",
    addCity: "Add city"
  },
  es: {
    oneCity: "Una ciudad",
    sameCountry: "Un país, varias ciudades",
    multiCountry: "Varios países / ciudades",
    destinationOverview: "Resumen del destino",
    day: "Día",
    tripLength: "Duración del viaje",
    budgetTier: "Nivel de presupuesto",
    travelStyle: "Estilo de viaje",
    seasonAnalysis: "Análisis de temporada",
    aiRecommendation: "Recomendación de IA",
    selectedInterests: "Intereses seleccionados",
    importantAmenities: "Comodidades importantes",
    destinations: "Destinos",
    copyItinerary: "Copiar itinerario",
    copied: "¡Copiado!",
    downloadPdf: "Descargar PDF",
    planAnotherTrip: "Planear otro viaje",
    mainFocus: "Enfoque principal",
    realStayOptions: "Opciones de hospedaje",
    recommendedArea: "Zona recomendada",
    realNearbyPlaces: "Lugares cercanos",
    preferenceMatch: "Coincidencia con preferencias",
    smartDailyPlan: "Plan inteligente del día",
    morning: "Mañana",
    afternoon: "Tarde",
    evening: "Noche",
    budgetEstimate: "Estimación de presupuesto",
    estimatedDailySpend: "Gasto diario estimado",
    generating: "Generando tu plan de viaje con IA...",
    fetching: "Buscando información del destino...",
    hotels: "Buscando opciones de hospedaje...",
    attractions: "Buscando atracciones y lugares locales...",
    building: "Construyendo tu itinerario inteligente...",
    readMore: "Leer más en Wikipedia",
    completeForm: "Completa país, ciudad, fechas y estilo de viaje antes de generar el itinerario.",
    returnDate: "La fecha de regreso debe ser posterior a la fecha de salida.",
    positiveBudget: "El presupuesto debe ser una cantidad positiva.",
    copiedMessage: "Itinerario copiado al portapapeles.",
    resetMessage: "Listo para un nuevo viaje. Tus selecciones anteriores fueron limpiadas.",
    chooseMainCountry: "Elige el país principal antes de agregar más ciudades.",
    chooseMainDestination: "Elige el destino principal antes de generar un itinerario multi-ciudad.",
    sameCountryPanelTitle: "Más ciudades del mismo país",
    sameCountryPanelText: "Agrega ciudades extra del país seleccionado arriba.",
    multiCountryPanelTitle: "Más países y ciudades",
    multiCountryPanelText: "Agrega paradas extra de diferentes países.",
    additionalCities: "Ciudades adicionales",
    additionalCitiesText: "Agrega más paradas si tu viaje incluye varios destinos.",
    firstPrototype: "PRIMER PROTOTIPO",
    createProfile: "Crea tu perfil de viaje",
    profileIntro: "Completa tu perfil de viaje y TripMind AI generará una primera vista previa del itinerario.",
    tripMode: "Modo de viaje",
    country: "País",
    city: "Ciudad",
    departureDate: "Fecha de salida",
    returnDateLabel: "Fecha de regreso",
    budget: "Presupuesto",
    budgetPlaceholder: "Ejemplo: $500 USD o flexible",
    chooseCountry: "Elige un país",
    chooseCity: "Elige una ciudad",
    chooseCountryFirst: "Elige un país primero",
    travelStyleLabel: "Estilo de viaje",
    chooseOne: "Elige una opción",
    interestsLabel: "Intereses",
    amenitiesLabel: "Comodidades importantes",
    generateButton: "Generar vista previa del itinerario",
    generatedPreview: "VISTA PREVIA GENERADA",
    smartTitle: "Tu itinerario inteligente de viaje",
    smartIntro: "TripMind AI combina destino, fechas, presupuesto, estilo de viaje, intereses y lugares cercanos para crear una vista previa personalizada.",
    noInterests: "Sin intereses específicos seleccionados",
    noAmenities: "Sin comodidades específicas seleccionadas",
    daysLabel: "días",
    nightsLabel: "noches",
    highSeason: "Temporada alta",
    shoulderSeason: "Temporada media",
    lowSeason: "Temporada baja",
    highSeasonRecommendation: "Estas fechas pueden ser más caras y concurridas. TripMind AI recomienda reservar hospedaje y actividades con anticipación.",
    shoulderSeasonRecommendation: "Estas fechas son una buena elección. Puedes encontrar mejores precios, clima agradable y menos gente.",
    lowSeasonRecommendation: "Estas fechas pueden ofrecer precios más bajos y atracciones más tranquilas. TripMind AI recomienda revisar el clima antes de reservar.",
    lowCost: "Bajo costo",
    balanced: "Equilibrado",
    premium: "Premium",
    flexible: "Flexible",
    noSpecificInterests: "Sin intereses específicos seleccionados",
    noSpecificAmenities: "Sin comodidades específicas seleccionadas",
    budgetHotel: "Hotel económico u hostal",
    premiumHotel: "Hotel boutique o departamento premium",
    balancedHotel: "Hotel cómodo o departamento céntrico",
    estimatedOption: "opción estimada según tu nivel de presupuesto",
    fallbackPlace: "sugerencia alternativa cuando los datos en vivo son limitados",
    premiumBudgetTip: "Incluye experiencias curadas, restaurantes premium y opciones de transporte privado.",
    lowBudgetTip: "Prioriza atracciones gratuitas, transporte público y lugares de comida casual.",
    balancedBudgetTip: "Equilibra atracciones icónicas, comida cómoda y transporte eficiente.",
    copiedFailed: "No se pudo copiar",
    copyFailedMessage: "No se pudo copiar. Intenta de nuevo o usa la exportación PDF.",
    popupMessage: "Permite las ventanas emergentes para abrir la vista de exportación PDF.",
    pdfMessage: "Abriendo tu vista imprimible. Elige Guardar como PDF en el diálogo de impresión.",
    currencyMessage: "Moneda cambiada a",
    regenerateMessage: "Genera el itinerario otra vez para actualizar los estimados.",
    remove: "Eliminar",
    addCity: "Agregar ciudad"
  },
  fr: {},
  it: {},
  ja: {}
};

translations.fr = {
  ...translations.en,
  oneCity: "Une ville",
  sameCountry: "Un pays, plusieurs villes",
  multiCountry: "Plusieurs pays / villes",
  destinationOverview: "Aperçu de la destination",
  day: "Jour",
  tripLength: "Durée du voyage",
  budgetTier: "Niveau de budget",
  travelStyle: "Style de voyage",
  seasonAnalysis: "Analyse de saison",
  aiRecommendation: "Recommandation IA",
  selectedInterests: "Intérêts sélectionnés",
  importantAmenities: "Commodités importantes",
  destinations: "Destinations",
  copyItinerary: "Copier l'itinéraire",
  copied: "Copié !",
  downloadPdf: "Télécharger PDF",
  planAnotherTrip: "Planifier un autre voyage",
  mainFocus: "Objectif principal",
  realStayOptions: "Options d'hébergement",
  recommendedArea: "Zone recommandée",
  realNearbyPlaces: "Lieux proches",
  preferenceMatch: "Correspondance avec les préférences",
  smartDailyPlan: "Plan intelligent du jour",
  morning: "Matin",
  afternoon: "Après-midi",
  evening: "Soir",
  budgetEstimate: "Estimation du budget",
  estimatedDailySpend: "Dépense quotidienne estimée",
  generating: "Génération de votre plan de voyage IA...",
  fetching: "Recherche d'informations sur la destination...",
  hotels: "Recherche d'hébergements...",
  attractions: "Recherche d'attractions et de lieux locaux...",
  building: "Construction de votre itinéraire intelligent...",
  readMore: "Lire plus sur Wikipedia",
  completeForm: "Veuillez compléter le pays, la ville, les dates et le style de voyage avant de générer l'itinéraire.",
  returnDate: "La date de retour doit être après la date de départ.",
  positiveBudget: "Le budget doit être un montant positif.",
  copiedMessage: "Itinéraire copié dans le presse-papiers.",
  resetMessage: "Prêt pour un nouveau voyage. Vos sélections précédentes ont été effacées.",
  chooseMainCountry: "Choisissez le pays principal avant d'ajouter d'autres villes.",
  chooseMainDestination: "Choisissez la destination principale avant de générer un itinéraire multi-villes.",
  sameCountryPanelTitle: "Plus de villes dans le même pays",
  sameCountryPanelText: "Ajoutez des villes supplémentaires du pays sélectionné ci-dessus.",
  multiCountryPanelTitle: "Plus de pays et de villes",
  multiCountryPanelText: "Ajoutez des étapes supplémentaires dans différents pays.",
  additionalCities: "Villes supplémentaires",
  additionalCitiesText: "Ajoutez plus d'étapes si votre voyage comprend plusieurs destinations.",
  firstPrototype: "PREMIER PROTOTYPE",
  createProfile: "Créez votre profil de voyage",
  profileIntro: "Remplissez votre profil de voyage et TripMind AI générera un premier aperçu d'itinéraire.",
  tripMode: "Mode de voyage",
  country: "Pays",
  city: "Ville",
  departureDate: "Date de départ",
  returnDateLabel: "Date de retour",
  budget: "Budget",
  budgetPlaceholder: "Exemple : 500 USD ou flexible",
  chooseCountry: "Choisissez un pays",
  chooseCity: "Choisissez une ville",
  chooseCountryFirst: "Choisissez d'abord un pays",
  travelStyleLabel: "Style de voyage",
  chooseOne: "Choisissez une option",
  interestsLabel: "Intérêts",
  amenitiesLabel: "Commodités importantes",
  generateButton: "Générer l'aperçu de l'itinéraire",
  generatedPreview: "APERÇU GÉNÉRÉ",
  smartTitle: "Votre itinéraire de voyage intelligent",
  smartIntro: "TripMind AI combine destination, dates, budget, style de voyage, intérêts et lieux proches pour créer un aperçu personnalisé.",
  daysLabel: "jours",
  nightsLabel: "nuits",
  highSeason: "Haute saison",
  shoulderSeason: "Saison intermédiaire",
  lowSeason: "Basse saison",
  highSeasonRecommendation: "Ces dates peuvent être plus chères et fréquentées. TripMind AI recommande de réserver tôt.",
  shoulderSeasonRecommendation: "Ces dates sont un bon choix. Vous pouvez trouver de meilleurs prix, un climat agréable et moins de foule.",
  lowSeasonRecommendation: "Ces dates peuvent offrir des prix plus bas et des attractions plus calmes. Vérifiez la météo avant de réserver.",
  lowCost: "Économique",
  balanced: "Équilibré",
  premium: "Premium",
  flexible: "Flexible",
  noSpecificInterests: "Aucun intérêt spécifique sélectionné",
  noSpecificAmenities: "Aucune commodité spécifique sélectionnée",
  budgetHotel: "Hôtel économique ou auberge",
  premiumHotel: "Hôtel boutique ou appartement premium",
  balancedHotel: "Hôtel confortable ou appartement central",
  estimatedOption: "option estimée selon votre niveau de budget",
  fallbackPlace: "suggestion alternative lorsque les données en direct sont limitées",
  premiumBudgetTip: "Incluez des expériences sélectionnées, des restaurants premium et des options de transport privé.",
  lowBudgetTip: "Privilégiez les attractions gratuites, les transports publics et les lieux de restauration simples.",
  balancedBudgetTip: "Équilibrez attractions emblématiques, repas confortables et transport efficace.",
  copiedFailed: "La copie a échoué",
  copyFailedMessage: "La copie a échoué. Réessayez ou utilisez l'export PDF.",
  popupMessage: "Autorisez les fenêtres pop-up pour ouvrir la vue d'export PDF.",
  pdfMessage: "Ouverture de la vue imprimable. Choisissez Enregistrer en PDF dans la boîte d'impression.",
  currencyMessage: "Devise définie sur",
  regenerateMessage: "Générez à nouveau l'itinéraire pour mettre à jour les estimations.",
  remove: "Supprimer",
  addCity: "Ajouter une ville"
};

translations.it = {
  ...translations.en,
  oneCity: "Una città",
  sameCountry: "Un paese, più città",
  multiCountry: "Più paesi / città",
  destinationOverview: "Panoramica della destinazione",
  day: "Giorno",
  tripLength: "Durata del viaggio",
  budgetTier: "Fascia di budget",
  travelStyle: "Stile di viaggio",
  seasonAnalysis: "Analisi della stagione",
  aiRecommendation: "Raccomandazione AI",
  selectedInterests: "Interessi selezionati",
  importantAmenities: "Servizi importanti",
  destinations: "Destinazioni",
  copyItinerary: "Copia itinerario",
  copied: "Copiato!",
  downloadPdf: "Scarica PDF",
  planAnotherTrip: "Pianifica un altro viaggio",
  mainFocus: "Focus principale",
  realStayOptions: "Opzioni di soggiorno",
  recommendedArea: "Zona consigliata",
  realNearbyPlaces: "Luoghi vicini",
  preferenceMatch: "Corrispondenza con le preferenze",
  smartDailyPlan: "Piano intelligente del giorno",
  morning: "Mattina",
  afternoon: "Pomeriggio",
  evening: "Sera",
  budgetEstimate: "Stima del budget",
  estimatedDailySpend: "Spesa giornaliera stimata",
  generating: "Generazione del tuo piano di viaggio AI...",
  fetching: "Ricerca di informazioni sulla destinazione...",
  hotels: "Ricerca di alloggi...",
  attractions: "Ricerca di attrazioni e luoghi locali...",
  building: "Creazione del tuo itinerario intelligente...",
  readMore: "Leggi di più su Wikipedia",
  completeForm: "Completa paese, città, date e stile di viaggio prima di generare l'itinerario.",
  returnDate: "La data di ritorno deve essere successiva alla data di partenza.",
  positiveBudget: "Il budget deve essere un importo positivo.",
  copiedMessage: "Itinerario copiato negli appunti.",
  resetMessage: "Pronto per un nuovo viaggio. Le selezioni precedenti sono state cancellate.",
  chooseMainCountry: "Scegli il paese principale prima di aggiungere altre città.",
  chooseMainDestination: "Scegli la destinazione principale prima di generare un itinerario multi-città.",
  sameCountryPanelTitle: "Altre città nello stesso paese",
  sameCountryPanelText: "Aggiungi città extra dal paese selezionato sopra.",
  multiCountryPanelTitle: "Altri paesi e città",
  multiCountryPanelText: "Aggiungi tappe extra in paesi diversi.",
  additionalCities: "Città aggiuntive",
  additionalCitiesText: "Aggiungi altre tappe se il viaggio include più destinazioni.",
  firstPrototype: "PRIMO PROTOTIPO",
  createProfile: "Crea il tuo profilo di viaggio",
  profileIntro: "Compila il tuo profilo di viaggio e TripMind AI genererà una prima anteprima dell'itinerario.",
  tripMode: "Modalità di viaggio",
  country: "Paese",
  city: "Città",
  departureDate: "Data di partenza",
  returnDateLabel: "Data di ritorno",
  budget: "Budget",
  budgetPlaceholder: "Esempio: 500 USD o flessibile",
  chooseCountry: "Scegli un paese",
  chooseCity: "Scegli una città",
  chooseCountryFirst: "Scegli prima un paese",
  travelStyleLabel: "Stile di viaggio",
  chooseOne: "Scegli un'opzione",
  interestsLabel: "Interessi",
  amenitiesLabel: "Servizi importanti",
  generateButton: "Genera anteprima itinerario",
  generatedPreview: "ANTEPRIMA GENERATA",
  smartTitle: "Il tuo itinerario di viaggio intelligente",
  smartIntro: "TripMind AI combina destinazione, date, budget, stile di viaggio, interessi e luoghi vicini per creare un'anteprima personalizzata.",
  daysLabel: "giorni",
  nightsLabel: "notti",
  highSeason: "Alta stagione",
  shoulderSeason: "Mezza stagione",
  lowSeason: "Bassa stagione",
  highSeasonRecommendation: "Queste date possono essere più costose e affollate. TripMind AI consiglia di prenotare in anticipo.",
  shoulderSeasonRecommendation: "Queste date sono una buona scelta. Potresti trovare prezzi migliori, clima piacevole e meno folla.",
  lowSeasonRecommendation: "Queste date possono offrire prezzi più bassi e attrazioni più tranquille. Controlla il meteo prima di prenotare.",
  lowCost: "Economico",
  balanced: "Bilanciato",
  premium: "Premium",
  flexible: "Flessibile",
  noSpecificInterests: "Nessun interesse specifico selezionato",
  noSpecificAmenities: "Nessun servizio specifico selezionato",
  budgetHotel: "Hotel economico o ostello",
  premiumHotel: "Hotel boutique o appartamento premium",
  balancedHotel: "Hotel confortevole o appartamento centrale",
  estimatedOption: "opzione stimata in base alla fascia di budget",
  fallbackPlace: "suggerimento alternativo quando i dati live sono limitati",
  premiumBudgetTip: "Includi esperienze curate, ristoranti premium e trasporti privati.",
  lowBudgetTip: "Dai priorità ad attrazioni gratuite, trasporto pubblico e cibo informale.",
  balancedBudgetTip: "Bilancia attrazioni iconiche, pasti comodi e trasporti efficienti.",
  copiedFailed: "Copia non riuscita",
  copyFailedMessage: "Copia non riuscita. Riprova o usa l'esportazione PDF.",
  popupMessage: "Consenti i pop-up per aprire la vista di esportazione PDF.",
  pdfMessage: "Apertura della vista stampabile. Scegli Salva come PDF nella finestra di stampa.",
  currencyMessage: "Valuta impostata su",
  regenerateMessage: "Genera di nuovo l'itinerario per aggiornare le stime.",
  remove: "Rimuovi",
  addCity: "Aggiungi città"
};

translations.ja = {
  ...translations.en,
  oneCity: "1都市",
  sameCountry: "1か国・複数都市",
  multiCountry: "複数の国 / 都市",
  destinationOverview: "目的地の概要",
  day: "日目",
  tripLength: "旅行期間",
  budgetTier: "予算レベル",
  travelStyle: "旅行スタイル",
  seasonAnalysis: "季節分析",
  aiRecommendation: "AIのおすすめ",
  selectedInterests: "選択した興味",
  importantAmenities: "重要な設備",
  destinations: "目的地",
  copyItinerary: "旅程をコピー",
  copied: "コピーしました！",
  downloadPdf: "PDFをダウンロード",
  planAnotherTrip: "別の旅行を計画",
  mainFocus: "主なテーマ",
  realStayOptions: "宿泊オプション",
  recommendedArea: "おすすめエリア",
  realNearbyPlaces: "近くのスポット",
  preferenceMatch: "好みに合わせた提案",
  smartDailyPlan: "スマート日程",
  morning: "朝",
  afternoon: "午後",
  evening: "夜",
  budgetEstimate: "予算見積もり",
  estimatedDailySpend: "1日の推定費用",
  generating: "AI旅行プランを作成中...",
  fetching: "目的地情報を取得中...",
  hotels: "宿泊先を検索中...",
  attractions: "観光地とローカルスポットを検索中...",
  building: "スマート旅程を作成中...",
  readMore: "Wikipediaで続きを読む",
  completeForm: "旅程を作成する前に、国、都市、日付、旅行スタイルを入力してください。",
  returnDate: "帰着日は出発日より後である必要があります。",
  positiveBudget: "予算は正の金額で入力してください。",
  copiedMessage: "旅程をクリップボードにコピーしました。",
  resetMessage: "新しい旅行の準備ができました。以前の選択はクリアされました。",
  chooseMainCountry: "都市を追加する前にメインの国を選んでください。",
  chooseMainDestination: "複数都市の旅程を作成する前にメインの目的地を選んでください。",
  sameCountryPanelTitle: "同じ国の追加都市",
  sameCountryPanelText: "上で選択した国から追加都市を選んでください。",
  multiCountryPanelTitle: "追加の国と都市",
  multiCountryPanelText: "異なる国の追加ストップを選んでください。",
  additionalCities: "追加都市",
  additionalCitiesText: "複数の目的地がある場合は追加ストップを加えてください。",
  firstPrototype: "初期プロトタイプ",
  createProfile: "旅行プロフィールを作成",
  profileIntro: "旅行プロフィールを入力すると、TripMind AIが旅程プレビューを作成します。",
  tripMode: "旅行モード",
  country: "国",
  city: "都市",
  departureDate: "出発日",
  returnDateLabel: "帰着日",
  budget: "予算",
  budgetPlaceholder: "例: 500 USD または flexible",
  chooseCountry: "国を選択",
  chooseCity: "都市を選択",
  chooseCountryFirst: "最初に国を選択",
  travelStyleLabel: "旅行スタイル",
  chooseOne: "選択してください",
  interestsLabel: "興味",
  amenitiesLabel: "重要な設備",
  generateButton: "旅程プレビューを作成",
  generatedPreview: "生成されたプレビュー",
  smartTitle: "スマート旅行旅程",
  smartIntro: "TripMind AIは目的地、日付、予算、旅行スタイル、興味、近くの場所を組み合わせてパーソナライズされた旅程を作成します。",
  daysLabel: "日",
  nightsLabel: "泊",
  highSeason: "ハイシーズン",
  shoulderSeason: "ショルダーシーズン",
  lowSeason: "ローシーズン",
  highSeasonRecommendation: "この時期は高く混雑する可能性があります。宿泊とアクティビティは早めの予約がおすすめです。",
  shoulderSeasonRecommendation: "この時期は良い選択です。より良い価格、快適な天候、少ない混雑が期待できます。",
  lowSeasonRecommendation: "この時期は低価格で落ち着いた観光が期待できます。予約前に天候を確認してください。",
  lowCost: "低予算",
  balanced: "バランス型",
  premium: "プレミアム",
  flexible: "柔軟",
  noSpecificInterests: "特定の興味は選択されていません",
  noSpecificAmenities: "特定の設備は選択されていません",
  budgetHotel: "低価格ホテルまたはホステル",
  premiumHotel: "ブティックホテルまたは高級アパート",
  balancedHotel: "快適なホテルまたは中心部のアパート",
  estimatedOption: "予算レベルに基づく推定オプション",
  fallbackPlace: "ライブデータが限られる場合の代替提案",
  premiumBudgetTip: "厳選体験、プレミアムレストラン、専用交通手段を含めましょう。",
  lowBudgetTip: "無料の観光地、公共交通機関、カジュアルな食事を優先しましょう。",
  balancedBudgetTip: "有名スポット、快適な食事、効率的な移動をバランスよく組み合わせましょう。",
  copiedFailed: "コピーに失敗しました",
  copyFailedMessage: "コピーに失敗しました。もう一度試すかPDF出力を使用してください。",
  popupMessage: "PDF出力画面を開くためにポップアップを許可してください。",
  pdfMessage: "印刷用ビューを開いています。印刷画面でPDFとして保存を選択してください。",
  currencyMessage: "通貨を設定しました:",
  regenerateMessage: "見積もりを更新するには旅程を再生成してください。",
  remove: "削除",
  addCity: "都市を追加"
};

function getCurrentLanguage() {
  return languageSelect?.value || "en";
}

function getCurrentCurrency() {
  return currencySelect?.value || "USD";
}

function t(key) {
  const language = getCurrentLanguage();
  return translations[language]?.[key] || translations.en[key] || key;
}

function formatMoneyRange(minUsd, maxUsd) {
  const currency = currencyRates[getCurrentCurrency()] || currencyRates.USD;
  const min = Math.round(minUsd * currency.rate);
  const max = Math.round(maxUsd * currency.rate);
  return `${currency.symbol}${min.toLocaleString()} - ${currency.symbol}${max.toLocaleString()} ${currency.suffix}`;
}

function applyBasicLanguageLabels() {
  const modeCards = document.querySelectorAll(".trip-mode-card");
  if (modeCards[0]) modeCards[0].querySelector("span").textContent = t("oneCity");
  if (modeCards[1]) modeCards[1].querySelector("span").textContent = t("sameCountry");
  if (modeCards[2]) modeCards[2].querySelector("span").textContent = t("multiCountry");

  // Add mode descriptions block
  const modeDescriptions = [
    "Plan one destination in detail.",
    "Add more cities from the same country.",
    "Combine stops from different countries."
  ];

  const translatedModeDescriptions = {
    en: modeDescriptions,
    es: [
      "Planea un destino con detalle.",
      "Agrega más ciudades del mismo país.",
      "Combina paradas de diferentes países."
    ],
    fr: [
      "Planifiez une destination en détail.",
      "Ajoutez plus de villes du même pays.",
      "Combinez des étapes dans différents pays."
    ],
    it: [
      "Pianifica una destinazione in dettaglio.",
      "Aggiungi più città dello stesso paese.",
      "Combina tappe in paesi diversi."
    ],
    ja: [
      "1つの目的地を詳しく計画します。",
      "同じ国の都市を追加します。",
      "異なる国のストップを組み合わせます。"
    ]
  };

  const descriptionSet = translatedModeDescriptions[getCurrentLanguage()] || translatedModeDescriptions.en;
  modeCards.forEach(function (card, index) {
    const small = card.querySelector("small");
    if (small && descriptionSet[index]) small.textContent = descriptionSet[index];
  });

  const heroKicker = document.querySelector(".hero .kicker");
  const heroTitle = document.querySelector(".hero h1");
  const heroIntro = document.querySelector(".hero > p");
  const formButton = tripForm?.querySelector('button[type="submit"]');

  if (heroKicker) heroKicker.textContent = t("firstPrototype");
  if (heroTitle) heroTitle.textContent = t("createProfile");
  if (heroIntro) heroIntro.textContent = t("profileIntro");
  if (formButton) formButton.textContent = t("generateButton");

  const labels = {
    country: t("country"),
    destination: t("city"),
    startDate: t("departureDate"),
    endDate: t("returnDateLabel"),
    budget: t("budget"),
    style: t("travelStyleLabel")
  };

  Object.entries(labels).forEach(function ([id, text]) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) label.textContent = text;
  });

  const tripModeLabel = document.querySelector(".trip-mode-group > label");
  const interestsTitle = document.querySelector("#interests")?.previousElementSibling;
  const amenitiesTitle = document.querySelector("#amenities")?.previousElementSibling;
  const budgetInput = document.querySelector("#budget");

  if (tripModeLabel) tripModeLabel.textContent = t("tripMode");
  if (interestsTitle) interestsTitle.textContent = t("interestsLabel");
  if (amenitiesTitle) amenitiesTitle.textContent = t("amenitiesLabel");
  if (budgetInput) budgetInput.placeholder = t("budgetPlaceholder");

  updateSelectPlaceholders();
  updateMultiCityVisibility();
}

function updateSelectPlaceholders() {
  const countryPlaceholder = countrySelect.querySelector('option[value=""]');
  const destinationPlaceholder = destinationSelect.querySelector('option[value=""]');
  const stylePlaceholder = document.querySelector('#style option[value=""]');

  if (countryPlaceholder) countryPlaceholder.textContent = t("chooseCountry");
  if (destinationPlaceholder) {
    destinationPlaceholder.textContent = countrySelect.value ? t("chooseCity") : t("chooseCountryFirst");
  }
  if (stylePlaceholder) stylePlaceholder.textContent = t("chooseOne");

  document.querySelectorAll(".extra-country").forEach(function (select) {
    const placeholder = select.querySelector('option[value=""]');
    if (placeholder) placeholder.textContent = t("chooseCountry");
  });

  document.querySelectorAll(".extra-city").forEach(function (select) {
    const placeholder = select.querySelector('option[value=""]');
    if (placeholder) placeholder.textContent = select.dataset.country ? t("chooseCity") : t("chooseCountryFirst");
  });
}

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

function getTripMode() {
  const selectedMode = document.querySelector('input[name="tripMode"]:checked');
  return selectedMode ? selectedMode.value : "single";
}

function createCityOptionsMarkup(selectedCountry = "") {
  if (!selectedCountry || !citiesByCountry[selectedCountry]) {
    return `<option value="">${t("chooseCountryFirst")}</option>`;
  }

  return [`<option value="">${t("chooseCity")}</option>`]
    .concat(
      citiesByCountry[selectedCountry].map(function (city) {
        return `<option value="${city}">${city}</option>`;
      })
    )
    .join("");
}

function updateMultiCityVisibility() {
  if (!multiCityPanel) return;

  const tripMode = getTripMode();
  const usesExtraCities = tripMode === "same-country" || tripMode === "multi-country";

  multiCityPanel.classList.toggle("hidden", !usesExtraCities);

  if (multiCityPanelTitle && multiCityPanelText) {
    if (tripMode === "same-country") {
      multiCityPanelTitle.textContent = t("sameCountryPanelTitle");
      multiCityPanelText.textContent = t("sameCountryPanelText");
    } else if (tripMode === "multi-country") {
      multiCityPanelTitle.textContent = t("multiCountryPanelTitle");
      multiCityPanelText.textContent = t("multiCountryPanelText");
    } else {
      multiCityPanelTitle.textContent = t("additionalCities");
      multiCityPanelText.textContent = t("additionalCitiesText");
    }
  }
}

function addAdditionalCityRow() {
  if (!multiCityList) return;

  const tripMode = getTripMode();

  if (tripMode === "same-country" && !countrySelect.value) {
    showFormMessage(t("chooseMainCountry"));
    return;
  }

  additionalCityCount += 1;

  const row = document.createElement("div");
  row.className = "multi-city-row";
  row.dataset.cityRow = String(additionalCityCount);

  if (tripMode === "same-country") {
    row.innerHTML = `
      <div class="form-group">
        <label for="extraCity${additionalCityCount}">${t("city")} ${additionalCityCount + 1}</label>
        <select id="extraCity${additionalCityCount}" class="extra-city" data-country="${countrySelect.value}">
          ${createCityOptionsMarkup(countrySelect.value)}
        </select>
      </div>

      <button type="button" class="btn secondary small-btn remove-city-btn">${t("remove")}</button>
    `;
  } else {
    row.innerHTML = `
      <div class="form-group">
        <label for="extraCountry${additionalCityCount}">${t("country")} ${additionalCityCount + 1}</label>
        <select id="extraCountry${additionalCityCount}" class="extra-country">
          <option value="">${t("chooseCountry")}</option>
          ${Object.entries(countryDisplayNames)
            .map(function ([value, label]) {
              return `<option value="${value}">${label}</option>`;
            })
            .join("")}
        </select>
      </div>

      <div class="form-group">
        <label for="extraCity${additionalCityCount}">${t("city")} ${additionalCityCount + 1}</label>
        <select id="extraCity${additionalCityCount}" class="extra-city">
          <option value="">${t("chooseCountryFirst")}</option>
        </select>
      </div>

      <button type="button" class="btn secondary small-btn remove-city-btn">${t("remove")}</button>
    `;

    const extraCountry = row.querySelector(".extra-country");
    const extraCity = row.querySelector(".extra-city");

    extraCountry.addEventListener("change", function () {
      extraCity.innerHTML = createCityOptionsMarkup(extraCountry.value);
      extraCity.dataset.country = extraCountry.value;
    });
  }

  const removeButton = row.querySelector(".remove-city-btn");

  removeButton.addEventListener("click", function () {
    row.remove();
  });

  multiCityList.appendChild(row);
}

function getSelectedTripCities() {
  const cities = [];
  const tripMode = getTripMode();

  if (destinationSelect.value) {
    cities.push({ country: countrySelect.value, city: destinationSelect.value });
  }

  if (tripMode === "same-country" || tripMode === "multi-country") {
    document.querySelectorAll(".multi-city-row").forEach(function (row) {
      const extraCountry = row.querySelector(".extra-country")?.value || countrySelect.value;
      const extraCitySelect = row.querySelector(".extra-city");
      const city = extraCitySelect?.value;
      const country = extraCitySelect?.dataset.country || extraCountry;

      if (country && city) {
        cities.push({ country, city });
      }
    });
  }

  return cities;
}

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

  destinationSelect.innerHTML = `<option value="">${selectedCountry ? t("chooseCity") : t("chooseCountryFirst")}</option>`;

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
  if (getTripMode() === "same-country") {
    additionalCityCount = 0;
    if (multiCityList) multiCityList.innerHTML = "";
  }
}); 

updateCityOptions();

destinationSelect.addEventListener("change", function () {
  updatePlannerBackground(destinationSelect.value);
});

tripModeInputs.forEach(function (input) {
  input.addEventListener("change", updateMultiCityVisibility);
});

if (addCityButton) {
  addCityButton.addEventListener("click", addAdditionalCityRow);
}

updateMultiCityVisibility();

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
      season: t("highSeason"),
      recommendation: t("highSeasonRecommendation")
    };
  }

  if (month === 4 || month === 5 || month === 9 || month === 10) {
    return {
      season: t("shoulderSeason"),
      recommendation: t("shoulderSeasonRecommendation")
    };
  }

  return {
    season: t("lowSeason"),
    recommendation: t("lowSeasonRecommendation")
  };
}

function getBudgetTier(budget) {
  const normalizedBudget = budget.toLowerCase().trim();

  if (!normalizedBudget || normalizedBudget.includes("flexible")) {
    return t("flexible");
  }

  const numberMatch = normalizedBudget.match(/\d+/);

  if (!numberMatch) return t("flexible");

  const amount = Number(numberMatch[0]);

  if (amount < 300) return t("lowCost");
  if (amount <= 900) return t("balanced");
  return t("premium");
}

function getDailyEstimate(budgetTier) {
  if (budgetTier === t("lowCost")) return t("lowBudgetTip");
  if (budgetTier === t("premium")) return t("premiumBudgetTip");
  return t("balancedBudgetTip");
}

function getStayRecommendation(budgetTier) {
  if (budgetTier === t("lowCost")) {
    return { type: t("budgetHotel") };
  }

  if (budgetTier === t("premium")) {
    return { type: t("premiumHotel") };
  }

  return { type: t("balancedHotel") };
}

function getDailyBudgetEstimate(budgetTier) {
  if (budgetTier === t("lowCost")) return formatMoneyRange(40, 80);
  if (budgetTier === t("premium")) return formatMoneyRange(180, 350);
  return formatMoneyRange(90, 170);
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
  const interestSummary = formatPreferenceList(interests, t("noSpecificInterests"));
  const amenitySummary = formatPreferenceList(amenities, t("noSpecificAmenities"));
  const interestTip = getInterestBasedTip(interests, style);
  const amenityTip = getAmenityBasedTip(amenities);

  const hotelOptions = realHotels.length
    ? realHotels
        .slice((dayNumber - 1) % realHotels.length, ((dayNumber - 1) % realHotels.length) + 3)
        .map(function (hotel) {
          return `<li><strong>${hotel.name}</strong> — ${hotel.type}</li>`;
        })
        .join("")
    : `<li>${stay.type} — ${t("estimatedOption")}</li>`;

  const realPlaceOptions = realPlaces.length
    ? realPlaces
        .slice((dayNumber - 1) % realPlaces.length, ((dayNumber - 1) % realPlaces.length) + 3)
        .map(function (place) {
          return `<li><strong>${place.name}</strong> — ${place.type}</li>`;
        })
        .join("")
    : nearbyPlaces
        .map(function (place) {
          return `<li>${place} — ${t("fallbackPlace")}</li>`;
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
      <h3>${t("day")} ${dayNumber} · ${destination}</h3>

      <p><strong>${t("mainFocus")}:</strong> ${mainActivity} in ${destination}</p>

      <div class="mini-section">
        <h4>🏨 ${t("realStayOptions")}</h4>
        <ul>
          ${hotelOptions}
        </ul>
      </div>

      <div class="mini-section">
        <h4>📍 ${t("recommendedArea")}</h4>
        <p>${recommendedArea}</p>
      </div>

      <div class="mini-section">
        <h4>🧭 ${t("realNearbyPlaces")}</h4>
        <ul>
          ${realPlaceOptions}
        </ul>
      </div>

      <div class="mini-section">
        <h4>🎯 ${t("preferenceMatch")}</h4>
        <p><strong>${t("selectedInterests")}:</strong> ${interestSummary}</p>
        <p><strong>${t("importantAmenities")}:</strong> ${amenitySummary}</p>
        <p>${interestTip}</p>
        <p>${amenityTip}</p>
      </div>

      <div class="mini-section">
        <h4>🗓 ${t("smartDailyPlan")}</h4>
        <ul>
          <li><strong>${t("morning")}:</strong> ${smartPlan.morning}</li>
          <li><strong>${t("afternoon")}:</strong> ${smartPlan.afternoon}</li>
          <li><strong>${t("evening")}:</strong> ${smartPlan.evening}</li>
        </ul>
      </div>

      <div class="mini-section">
        <h4>💸 ${t("budgetEstimate")}</h4>
        <p><strong>${t("estimatedDailySpend")}:</strong> ${dailyBudget}</p>
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
  const tripCities = getSelectedTripCities();

  if (!country || !destination || !startDate || !endDate || !style) {
    showFormMessage(t("completeForm"));
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if ((getTripMode() === "same-country" || getTripMode() === "multi-country") && tripCities.length === 0) {
    showFormMessage(t("chooseMainDestination"));
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const tripLength = calculateTripLength(startDate, endDate);

  if (tripLength.nights < 1) {
    showFormMessage(t("returnDate"));
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (budget && Number(budget) < 0) {
    showFormMessage(t("positiveBudget"));
    tripForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  resultsSection.classList.remove("hidden");
  tripSummary.innerHTML = "";
  previewSection.innerHTML = "";
  itineraryOutput.innerHTML = `
    <article class="loading-card">
      <div class="loading-spinner"></div>
      <h3 id="loadingTitle">${t("generating")}</h3>
      <p id="loadingText">${t("fetching")}</p>
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
    if (loadingText) loadingText.textContent = t("hotels");
    if (progressBar) progressBar.style.width = "35%";
  }, 1000);

  setTimeout(() => {
    if (loadingText) loadingText.textContent = t("attractions");
    if (progressBar) progressBar.style.width = "68%";
  }, 2000);

  setTimeout(() => {
    if (loadingText) loadingText.textContent = t("building");
    if (progressBar) progressBar.style.width = "90%";
  }, 3000);

  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

  const placeType = placeTypeByStyle[style] || "tourism";
  const cityDataList = await Promise.all(
    tripCities.map(async function (tripCity) {
      const [realPlaces, realHotels, wikipediaCard] = await Promise.all([
        fetchPlacesData(tripCity.city, placeType),
        fetchPlacesData(tripCity.city, "hotel"),
        fetchWikipediaData(tripCity.city, tripCity.country, style, interests, amenities)
      ]);

      return {
        ...tripCity,
        realPlaces,
        realHotels,
        wikipediaCard
      };
    })
  );

  previewSection.innerHTML = cityDataList
    .map(function (cityData) {
      return cityData.wikipediaCard;
    })
    .join("");

  const loadingElapsedTime = Date.now() - loadingStartTime;
  if (loadingElapsedTime < 1400) {
    await wait(1400 - loadingElapsedTime);
  }

  const budgetTier = getBudgetTier(budget);
  const seasonInfo = getSeasonAnalysis(startDate);

  tripSummary.innerHTML = `
    <article class="summary-card">
      <span>${t("destinations")}</span>
      <strong>${tripCities.map(function (item) { return item.city; }).join(" → ")}</strong>
    </article>

    <article class="summary-card">
      <span>${t("tripLength")}</span>
      <strong>${tripLength.days} ${t("daysLabel")} / ${tripLength.nights} ${t("nightsLabel")}</strong>
    </article>

    <article class="summary-card">
      <span>${t("budgetTier")}</span>
      <strong>${budgetTier}</strong>
    </article>

    <article class="summary-card">
      <span>${t("travelStyle")}</span>
      <strong>${style}</strong>
    </article>

    <article class="summary-card">
      <span>${t("seasonAnalysis")}</span>
      <strong>${seasonInfo.season}</strong>
    </article>

    <article class="summary-card">
      <span>${t("aiRecommendation")}</span>
      <strong>${seasonInfo.recommendation}</strong>
    </article>

    <article class="summary-card">
      <span>${t("selectedInterests")}</span>
      <strong>${interests || t("noSpecificInterests")}</strong>
    </article>

    <article class="summary-card">
      <span>${t("importantAmenities")}</span>
      <strong>${amenities || t("noSpecificAmenities")}</strong>
    </article>

    <article class="summary-card itinerary-actions-card">
      <button type="button" class="btn primary itinerary-action-btn" id="copyItineraryBtn">${t("copyItinerary")}</button>
      <button type="button" class="btn primary itinerary-action-btn" id="downloadPdfBtn">${t("downloadPdf")}</button>
      <button type="button" class="btn primary itinerary-action-btn" id="planAnotherTripBtn">${t("planAnotherTrip")}</button>
    </article>
  `;

  let itineraryHTML = "";
  for (let day = 1; day <= tripLength.days; day++) {
    const cityData = cityDataList[(day - 1) % cityDataList.length];

    itineraryHTML += generateDayPlan(
      day,
      cityData.city,
      style,
      interests,
      amenities,
      budgetTier,
      cityData.realPlaces,
      cityData.realHotels
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
        copyButton.textContent = t("copied");
        showFormMessage(t("copiedMessage"), "success");
        setTimeout(function () {
          copyButton.textContent = t("copyItinerary");
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
        copyButton.textContent = t("copiedFailed");
        showFormMessage(t("copyFailedMessage"));
        setTimeout(function () {
          copyButton.textContent = t("copyItinerary");
        }, 1800);
      }
    });
  }

  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      const pdfWindow = window.open("", "_blank");

      if (!pdfWindow) {
        showFormMessage(t("popupMessage"));
        return;
      }

      showFormMessage(t("pdfMessage"), "success");

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
      additionalCityCount = 0;
      if (multiCityList) multiCityList.innerHTML = "";
      updateMultiCityVisibility();
      showFormMessage(t("resetMessage"), "success");
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
      <h3>🌎 ${t("destinationOverview")}: ${city}</h3>
      <img src="${image}" class="wiki-image" alt="${city}">
      <p>${description}</p>
      ${data.content_urls?.desktop?.page || data.content_urls?.mobile?.page
        ? `<a href="${data.content_urls?.desktop?.page || data.content_urls?.mobile?.page}" target="_blank">${t("readMore")}</a>`
        : ""} 

      </article>
    `;

    return wikiCard;
  } catch (error) {
    console.error("Wikipedia fetch failed:", error);

    const fallbackImage = cityBackgrounds[city] || heroImages[0];
    
    return `
      <article class="day-card destination-card">
        <h3>🌎 ${t("destinationOverview")}: ${city}</h3>
        <img src="${fallbackImage}" class="wiki-image" alt="${city}">
        <p>${buildDestinationDescription(city, "", style, interests, amenities)}</p>
      </article>
    `;
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
if (languageSelect) {
  languageSelect.addEventListener("change", function () {
    applyBasicLanguageLabels();
  });
}

if (currencySelect) {
  currencySelect.addEventListener("change", function () {
    showFormMessage(`${t("currencyMessage")} ${getCurrentCurrency()}. ${t("regenerateMessage")}`, "success");
  });
}

applyBasicLanguageLabels();