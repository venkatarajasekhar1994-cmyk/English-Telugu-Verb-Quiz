// service-worker.js

// -------------------------------------------------------------------------
// --- CACHE VERSION v29 ---
// -------------------------------------------------------------------------
// I've updated the version from v28 to v29.
//
// THE FIX:
// I have REMOVED 'spoken%20english.html' from the cache list.
// This file appears to be missing from your server, which was causing
// the entire service worker installation to fail (with a 404 error).
//
// By removing it, this service worker (v29) will finally install
// successfully, which will update all your other files, including 'data2.csv'.
// -------------------------------------------------------------------------
const CACHE_NAME = 'my-pwa-cache-v29'; // <-- I updated this from v28 to v29!

const urlsToCache = [
  './',
  'index.html',
  'game%20hub.html',
  'Verbs%20game.html',
  'English%20vocabulary%20game.html',
  'data.csv',
  'data2.csv',
  'diagram_data.js',
  'manifest.json'
  // 'spoken%20english.html' has been REMOVED because it was missing (404).
];

// --- INSTALLATION ---
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event for cache:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all specified files.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached successfully. Forcing activation.');
        return self.skipWaiting();
      })
      .catch(error => {
        // This log is crucial for debugging!
        console.error('[Service Worker] Cache addAll() failed:', error);
      })
  );
});

// --- ACTIVATION & CLEANUP ---
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event for cache:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Claiming clients (v29).');
      return self.clients.claim();
    })
  );
});


// --- FETCH INTERCEPTION (CACHE-FIRST) ---
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
  );
});

