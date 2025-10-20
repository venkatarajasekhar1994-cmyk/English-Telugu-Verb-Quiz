// service-worker.js

// App Version: 1.0.1 (Fixed CSV parsing bug in Spoken English quiz)
// CRITICAL: Cache version incremented to v18.
// Every time you change a file that's cached (like your HTML pages or data),
// you MUST increment this version number. This tells the browser to delete the old cache
// and download the new files.
const CACHE_NAME = 'my-pwa-cache-v18';

// This is the list of all the files that will be saved for offline use.
// This list matches all the files in your project.
const urlsToCache = [
  '/',
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'manifest.json',
];

// Installation Step: The service worker is installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install Event for version', CACHE_NAME);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all core assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the new service worker to become active immediately.
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
});

// Activation Step: The service worker is activated.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate Event for version', CACHE_NAME);
  // This is the ideal place to delete old, unused caches.
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => {
        // Tell the active service worker to take control of the page immediately.
        return self.clients.claim();
    })
  );
});

// Fetch Step: The service worker intercepts network requests.
self.addEventListener('fetch', event => {
  // For the CSV data file, we use a "Network First, then Cache" strategy.
  // This ensures users always get the latest questions if they are online,
  // but the game still works with the old data if they are offline.
  if (event.request.url.endsWith('data.csv')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
            // If we get a valid response from the network, cache it and return it.
            return caches.open(CACHE_NAME).then(cache => {
                // We must clone the response as it can only be consumed once.
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
        .catch(() => {
            // If the network request fails (e.g., user is offline), serve from the cache.
            console.log('[Service Worker] Network failed for CSV, serving from cache.');
            return caches.match(event.request);
        })
    );
    return;
  }

  // For all other files (HTML, etc.), we use a "Cache First, then Network" strategy.
  // This makes the app load instantly from the cache for a fast, offline-first experience.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If we find a match in the cache, return it.
        if (response) {
          return response;
        }

        // If no match in cache, try to fetch it from the network.
        return fetch(event.request);
      })
    );
});

