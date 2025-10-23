// service-worker.js

// CRITICAL: Cache version.
// Every time you change ANY file that's cached (HTML, CSV, etc.),
// you MUST increment this version number (e.g., to 'v26', 'v27').
const CACHE_NAME = 'my-pwa-cache-v25'; // <-- This is the only change needed.

// This is the list of all the files that will be saved for offline use.
// Ensure all paths are correct relative to your website's root.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'manifest.json'
  // NOTE: Any other assets like images or CSS files should be added here.
];

// --- INSTALLATION ---
// This runs when a new service worker is being installed.
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing version ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all core assets');
        // addAll will fail if any of the files fail to download.
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // This command tells the new service worker to take over control immediately
        // once it's installed, instead of waiting for the user to close all tabs.
        console.log('[Service Worker] Skipping waiting and activating immediately.');
        return self.skipWaiting();
      })
  );
});


// --- ACTIVATION ---
// This runs after the new service worker is installed and ready to take over.
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating version ${CACHE_NAME}`);
  event.waitUntil(
    // Get all the cache names (e.g., 'my-pwa-cache-v24', 'my-pwa-cache-v23')
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is old (not our current CACHE_NAME), delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // This command ensures the activated service worker takes control of all
      // open pages immediately, without needing a reload.
      console.log('[Service Worker] Claiming clients.');
      return self.clients.claim();
    })
  );
});


// --- FETCH INTERCEPTION (STREAMLINED) ---
// This runs every time the browser tries to request any file.
// This is a "Cache-First" strategy.
// It instantly serves files from the cache for offline-first speed.
// Updates are handled *only* when the CACHE_NAME is incremented,
// which forces the 'install' event to re-fetch all assets.
// This guarantees that your HTML files and data.csv are always the same version.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If we find a match in the cache, return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }

        // If not in cache, fetch from the network.
        // This is important for any files you *forgot* to cache
        // or for any external requests (like to Google Fonts or Tailwind).
        return fetch(event.request);
      })
  );
});

