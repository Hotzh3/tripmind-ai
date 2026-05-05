/**
 * TripMind API base URL (no build step).
 *
 * Optional override — set before this script runs, e.g. in DevTools or an HTML snippet:
 *   window.TRIPMIND_API_BASE_URL = "http://127.0.0.1:3001";
 *
 * Default: localhost / 127.0.0.1 / IPv4 loopback → http://localhost:3001
 *          any other host (GitHub Pages, Vercel, etc.) → production Render URL
 */
(function () {
  if (typeof window === "undefined") {
    return;
  }

  if (window.TRIPMIND_API_BASE_URL) {
    return;
  }

  var host = (window.location && window.location.hostname) || "";
  var isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    /^127\.\d+\.\d+\.\d+$/.test(host);

  window.TRIPMIND_API_BASE_URL = isLocal
    ? "http://localhost:3001"
    : "https://tripmind-ai-backend.onrender.com";
})();
