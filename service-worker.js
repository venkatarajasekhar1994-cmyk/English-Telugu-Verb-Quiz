// service-worker.js

// CRITICAL: Cache version incremented to v16.
// Every time you change a file that's cached (like your HTML pages or data),
// you MUST increment this version number. This tells the browser to delete the old cache
// and download the new files.
const CACHE_NAME = 'my-pwa-cache-v16';

// This is the list of all the files that will be saved for offline use.
// Make sure all your important files are listed here.
const urlsToCache = [
  '/',
  'index.html',
  'game_hub.html',
  'spoken_english.html',
  'data.csv',
  'English vocabulary game.html',
  'Verbs game.html',
  'manifest.json',
];

// Installation Step: The service worker is installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install Event');
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all core assets');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
});

// Activation Step: The service worker is activated.
// This is where we clean up old, unused caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate Event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cacheName is not our current cache, we delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Step: The service worker intercepts network requests.
self.addEventListener('fetch', event => {
  // For the CSV data file, we use a "Network First, then Cache" strategy.
  // This ensures users always get the latest questions if they are online,
  // but the game still works with the old data if they are offline.
  if (event.request.url.endsWith('.csv')) {
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

