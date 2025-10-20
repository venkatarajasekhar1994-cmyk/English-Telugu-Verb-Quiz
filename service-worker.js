// service-worker.js

// CRITICAL: Cache version incremented to v13 to reflect the latest updates to the game hub.
// Every time you change a file that's cached, you MUST increment this version number.
const CACHE_NAME = 'my-pwa-cache-v13'; 

// This is the list of all the files that will be saved for offline use.
const urlsToCache = [
  '/',                     
  'index.html',            
  'game hub.html',          // The main UI, recently updated with new settings.
  
  // Game files
  'spoken_english.html',
  'data.csv', // The data file for the Spoken English quiz.
  'English vocabulary game.html', 
  'Verbs game.html',       
  
  // Shared PWA assets
  'manifest.json',
];

// Installation Step: The service worker is installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install Event');
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
          // If a cache's name is different from our current CACHE_NAME, it's an old cache.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // This ensures the new service worker takes control of the page immediately.
  event.waitUntil(self.clients.claim());
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




