const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { app, getFallbackPlaces, isOriginAllowed } = require('../server');
const realFetch = global.fetch.bind(global);

function makeResponse({ status = 200, jsonData, textData, ok } = {}) {
  const responseOk = typeof ok === 'boolean' ? ok : status >= 200 && status < 300;
  return {
    ok: responseOk,
    status,
    json: async () => jsonData,
    text: async () => (textData !== undefined ? textData : JSON.stringify(jsonData ?? {}))
  };
}

async function withServer(fn) {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    return await fn(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

async function withMockFetch(responses, fn) {
  const originalFetch = global.fetch;
  let index = 0;

  global.fetch = async function (url, options) {
    if (index >= responses.length) {
      throw new Error(`Unexpected fetch call: ${url}`);
    }

    const handler = responses[index];
    index += 1;
    return handler(url, options);
  };

  try {
    return await fn();
  } finally {
    global.fetch = originalFetch;
  }
}

test('health endpoint responds ok', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    const response = await realFetch(`${baseUrl}/api/health`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(data, { status: 'ok', service: 'TripMind AI backend' });
  });
});

test('root endpoint advertises the API', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    const response = await realFetch(`${baseUrl}/`);
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.status, 'ok');
    assert.match(data.message, /TripMind AI backend/i);
    assert.ok(Array.isArray(data.endpoints));
    assert.ok(data.endpoints.some((endpoint) => endpoint.includes('/api/wikipedia')));
  });
});

test('wikipedia endpoint validates missing city', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    const response = await realFetch(`${baseUrl}/api/wikipedia`);
    const data = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(data, { error: 'City is required' });
  });
});

test('wikipedia endpoint maps upstream data', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    await withMockFetch([
      () => makeResponse({
        status: 200,
        jsonData: {
          title: 'Paris',
          extract: 'Paris is the capital of France.',
          originalimage: { source: 'https://example.com/paris.jpg' },
          content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Paris' } }
        }
      })
    ], async () => {
      const response = await realFetch(`${baseUrl}/api/wikipedia?city=Paris`);
      const data = await response.json();

      assert.equal(response.status, 200);
      assert.equal(data.title, 'Paris');
      assert.equal(data.description, 'Paris is the capital of France.');
      assert.equal(data.image, 'https://example.com/paris.jpg');
      assert.equal(data.url, 'https://en.wikipedia.org/wiki/Paris');
    });
  });
});

test('places endpoint validates missing city', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    const response = await realFetch(`${baseUrl}/api/places`);
    const data = await response.json();

    assert.equal(response.status, 400);
    assert.deepEqual(data, { error: 'City is required' });
  });
});

test('places endpoint returns structured OpenStreetMap data', { concurrency: false }, async () => {
  await withServer(async (baseUrl) => {
    await withMockFetch([
      () => makeResponse({
        status: 200,
        jsonData: [{ lat: '48.8566', lon: '2.3522' }]
      }),
      () => makeResponse({
        status: 200,
        textData: JSON.stringify({
          elements: [
            {
              tags: { name: 'Cafe de Flore', amenity: 'cafe' },
              lat: 48.8567,
              lon: 2.3333
            },
            {
              tags: { name: 'Le Procope', amenity: 'restaurant' },
              lat: 48.853,
              lon: 2.339
            }
          ]
        })
      })
    ], async () => {
      const response = await realFetch(`${baseUrl}/api/places?city=Paris&type=cafe`);
      const data = await response.json();

      assert.equal(response.status, 200);
      assert.equal(data.city, 'Paris');
      assert.equal(data.type, 'cafe');
      assert.equal(data.source, 'openstreetmap');
      assert.deepEqual(data.coordinates, { lat: '48.8566', lon: '2.3522' });
      assert.equal(data.places[0].name, 'Cafe de Flore');
      assert.equal(data.places[0].type, 'cafe');
    });
  });
});

test('fallback helpers stay usable when upstream APIs fail', { concurrency: false }, () => {
  const places = getFallbackPlaces('Paris', 'restaurant');

  assert.equal(places.length, 3);
  assert.equal(places[0].type, 'restaurant');
  assert.match(places[0].name, /Paris/);
  assert.equal(isOriginAllowed('https://hotzh3.github.io'), true);
  assert.equal(isOriginAllowed('https://evil.example.com'), false);
});
