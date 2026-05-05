# TripMind AI

TripMind AI is a full-stack travel planning demo that combines a static web frontend with a small Express API. Users describe a trip (destinations, dates, budget, travel style, interests, and amenities). The app enriches that input with live geographic and encyclopedic data, then produces a structured day-by-day itinerary using **rule-based heuristics**, templates, and clear in-browser presentation.

![TripMind AI banner](./portadatraveleria.png)

---

## Project overview

The goal is to show realistic integration work: calling third-party APIs safely from a backend, handling failures with fallbacks, constraining CORS and rate limits for production-style deploys, and building a polished single-page experience without a heavy frontend framework. The product name includes "AI" as a brand label; the current implementation does **not** use machine learning models or hosted LLMs. Intelligence in the itinerary is explicit logic, scoring patterns, and external data—not trained models.

---

## Live demo links

- **GitHub Pages:** https://hotzh3.github.io/tripmind-ai/
- **Vercel (mirror):** https://tripmind-ai-vert.vercel.app/

The static sites load `config.js`, which chooses the API base URL. In production, the browser talks to the API hosted on Render (see Architecture).

---

## Architecture

High-level data flow:

1. **GitHub Pages (or Vercel)** serves the static frontend (`index.html`, `styles.css`, `script.js`, `config.js`).
2. **`config.js`** selects the backend URL: on `localhost` / loopback it uses `http://localhost:3001` for local development; otherwise it uses the deployed Render API URL.
3. The browser calls the **Render** Express backend (`/api/health`, `/api/wikipedia`, `/api/places`).
4. The backend proxies and aggregates **Wikipedia** (summary text and images) and **OpenStreetMap** services (**Nominatim** for geocoding, **Overpass** for points of interest), with timeouts, rate limiting on API routes, and JSON fallbacks where appropriate.
5. The frontend merges API results with form input and renders the itinerary, summaries, optional PDF export, and clipboard copy—entirely in the browser.

No database or user sessions sit in the middle; each run is stateless on the server.

---

## How it works

1. **Input:** Country and city(ies), trip mode (single / same country / multi-country), dates, optional budget text, travel style, interests, amenities, language, and display currency.
2. **Backend calls:** For each destination, the frontend requests Wikipedia summaries and place lists (hotels, museums, tourism, etc.) through the Express API so the browser never hits Wikipedia or OSM endpoints directly (avoiding CORS and centralizing error handling).
3. **Composition:** Client-side code applies budget tiers, season hints, style templates, and interest/amenity tips, then lays out per-day cards with live names where data exists and fallback suggestions when APIs are empty or slow.
4. **Output:** Summary cards, destination overview blocks, day-by-day plans, copy-to-clipboard, and a print-friendly PDF view.

---

## Tech stack

| Layer | Technologies |
| ----- | ------------ |
| Frontend | HTML5, CSS3, vanilla JavaScript |
| Static hosting | GitHub Pages; optional Vercel mirror |
| Backend | Node.js, Express 5 |
| Backend libraries | `cors`, `dotenv`, `express-rate-limit` |
| External services | Wikipedia REST API, Nominatim, Overpass API |

---

## Data sources and APIs

| Source | Role |
| ------ | ---- |
| **Wikipedia** (`/api/wikipedia`) | Short destination description, lead image when available, link to the full article. |
| **Nominatim** (OpenStreetMap) | Resolve city name to coordinates inside `/api/places`. |
| **Overpass API** | Query OSM nodes around those coordinates for hotels, restaurants, cafés, museums, tourism, and leisure POIs. |
| **Client-side heuristics** | Budget bands, seasonal messaging, daily templates, and preference text—not a separate paid "Places API" product. |

Responses may use server-side **place fallbacks** when Overpass is unavailable or returns no usable results.

---

## Features

- Multi-step trip profile with travel style, interests, and amenities
- Multi-city and multi-country planning modes
- Wikipedia-backed destination overview cards
- Live POI names from OpenStreetMap when the upstream chain succeeds
- Day-by-day itinerary cards with stay, area, nearby places, and pacing sections
- Budget tier hinting and rough daily spend **ranges** (in selected currency using **fixed** conversion factors in the frontend)
- Seasonal messaging based on trip month
- Multi-language labels for key UI strings (planner-focused; not every paragraph is localized)
- Copy itinerary and export to PDF via the browser print dialog
- Loading states and responsive layout
- Backend health check route for monitoring

---

## Local development

1. **Clone the repository** (adjust URL if you forked the project).

   ```bash
   git clone https://github.com/Hotzh3/tripmind-ai.git
   cd tripmind-ai
   ```

2. **Start the backend** (from the `backend` directory):

   ```bash
   cd backend
   npm install
   npm start
   ```

   The API listens on `http://localhost:3001` by default (`PORT` overrides this).

3. **Start the frontend** in a **second terminal** from the **repository root** (not inside `backend`):

   ```bash
   python3 -m http.server 5500
   ```

4. Open **`http://localhost:5500`** in your browser.

5. **`config.js`** detects `localhost` (and common loopback hostnames) and sets `window.TRIPMIND_API_BASE_URL` to **`http://localhost:3001`**, so the static site talks to your local Express process without editing `script.js`. For production hosts, the same file points to the deployed Render URL.

Optional: create `backend/.env` for environment variables (see below). `dotenv` loads it when the server starts.

---

## Backend deployment

Deploy the `backend` folder to **Render** (or a similar Node host):

- **Start command:** `npm start` (runs `node server.js`).
- **Root directory:** `backend` if the service is configured from the monorepo.
- Set environment variables in the host dashboard as needed (see [Environment variables](#environment-variables)).
- Ensure the host sets `PORT` or that the platform injects it; the server reads `process.env.PORT`.

After deploy, update production expectations:

- Cold starts on free tiers can add latency to the first request after idle.
- CORS only allows known frontend origins (GitHub Pages pattern, Vercel preview pattern, localhost) unless you extend `ALLOWED_ORIGINS`.

---

## Frontend deployment

- **GitHub Pages:** Publish the repository root (or the `main` branch `/docs` folder, depending on your repo settings) so that `index.html`, `config.js`, `script.js`, and `styles.css` are served at the same path as in local testing.
- **`config.js` must be deployed** next to `index.html` so the browser can load it before `script.js`.
- **Vercel:** Point the static project at the same root; `config.js` will select the Render API URL when the site is not served from localhost.

No build step is required for the frontend.

---

## Environment variables

All variables are optional unless your host requires them. The backend uses `dotenv` and reads `backend/.env` when present.

| Variable | Purpose |
| -------- | ------- |
| `PORT` | HTTP port for Express. Render and similar platforms usually set this automatically. Default in code: `3001`. |
| `ALLOWED_ORIGINS` | Comma-separated list of extra allowed `Origin` values for CORS (beyond `*.github.io`, `*.vercel.app`, `localhost`, and `127.0.0.1`). |
| `WIKIPEDIA_FETCH_TIMEOUT_MS` | Abort Wikipedia outbound requests after this many milliseconds. Default: `15000`. |
| `NOMINATIM_FETCH_TIMEOUT_MS` | Timeout for Nominatim geocoding requests. Default: `18000`. |
| `OVERPASS_FETCH_TIMEOUT_MS` | Timeout per Overpass HTTP request (each mirror is tried in turn). Default: `32000`. |
| `NOMINATIM_USER_AGENT` | `User-Agent` string for Nominatim (recommended: app name plus contact URL). A sensible default including the GitHub repo URL is built into the server if unset. |

---

## Known limitations

- **No ML or LLM pipeline:** Itineraries are generated with deterministic rules, templates, and API-fed names—not learned models or RAG.
- **Currency display:** Conversion uses **fixed multipliers** in the client for demo purposes, not live foreign-exchange APIs.
- **Third-party reliability:** Wikipedia, Nominatim, and Overpass are public services with usage policies, rate limits, and occasional outages; the app degrades with generic or fallback content when needed.
- **Hosting latency:** Free Render instances may sleep; the first request after idle can be slow.
- **No accounts or persistence:** There is no authentication layer or database; itineraries exist only in the browser session unless the user copies or prints them.
- **Internationalization:** Language switching covers many UI labels, but some narrative strings remain English-only.

---

## Future improvements

- Automated **tests** for Express routes and for pure client-side helpers
- **CI** (lint, test on pull requests)
- **Server-side caching** (short TTL) for Wikipedia and place lookups to reduce upstream load
- **Persistence** (saved trips) with authentication if the product grows beyond a demo
- **Smarter ranking** of POIs (distance, category fit, deduplication) still without overselling "AI"
- Optional **LLM or RAG** integration for natural-language explanations, clearly labeled as an add-on
- **Full i18n** pass for hero copy, feature blurbs, and heuristic tip strings

---

## Portfolio value

TripMind AI demonstrates full-stack fluency on a constrained stack: a static site that scales cheaply, a small API that respects CORS and abuse limits, honest integration with real geographic and encyclopedic APIs, and a user experience that feels finished. Recruiters and reviewers can trace a clear request path from the browser to Wikipedia and OpenStreetMap and see how the project behaves when those services fluctuate.

---

## Author

José G Malfavaun
