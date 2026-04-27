# TripMind AI

> AI-powered smart travel itinerary planner that creates personalized travel plans based on destination, budget, travel style, interests, amenities, and live destination data.

![TripMind AI Banner](./portadatraveleria.png)

## Live Demo

- GitHub Pages: https://hotzh3.github.io/tripmind-ai/
- Vercel: https://tripmind-ai-vert.vercel.app/

## Features

- Destination overview with Wikipedia integration
- Real stay options and nearby places
- Smart daily itinerary generation
- Budget tier analysis
- Season analysis
- Travel style and interest-based recommendations
- Multi-country / multi-city trip planning
- Multi-language support
- Currency conversion
- Copy itinerary to clipboard
- Export itinerary to PDF
- Reset and generate another itinerary
- Smooth loading states, progress bars, animations, and responsive UI

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### APIs and Data Sources

- Wikipedia API
- Places API
- Exchange rate / currency conversion services

## Installation and Local Development

### 1. Clone repository

```bash
git clone https://github.com/Hotzh3/tripmind-ai.git
cd tripmind-ai
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Start backend server

```bash
node server.js
```

The backend runs on:

```bash
http://localhost:3001
```

### 4. Start frontend locally

Open another terminal:

```bash
cd ~/Documents/tripmind-ai
python3 -m http.server 5500
```

Then open:

```bash
http://localhost:5500
```

## Project Structure

```bash
tripmind-ai/
├── index.html
├── styles.css
├── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## API Integrations

### Wikipedia API

Used for:

- destination descriptions
- images
- links to learn more

### Places API

Used for:

- nearby attractions
- hotels
- restaurants
- points of interest

## Roadmap

- Deploy frontend online
- Deploy backend online
- Add authentication
- Save itineraries to database
- Add real hotel booking APIs
- Add flight APIs
- Add AI chat assistant
- Add weather and map integrations

## Author

José G Malfavaun
