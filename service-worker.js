// service-worker.js

// CRITICAL: Cache version.
// Every time you change ANY file that's cached (HTML, CSV, etc.),
// you MUST increment this version number. This tells the browser to
// delete the old cache and download the new files.
const CACHE_NAME = 'my-pwa-cache-v21'; // I've incremented this from v18 for you

// This is the list of all the files that will be saved for offline use.
// It's important these paths are correct relative to your website's root.
// For a GitHub repo like "user.github.io/my-repo/", these paths are correct.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'manifest.json'
];

// --- INSTALLATION ---
// This runs when the service worker is first installed.
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing version ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all core assets');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the new service worker to become active immediately.
        self.skipWaiting();
      })
      .catch(err => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
});

// --- ACTIVATION ---
// This runs after the installation and cleans up old caches.
self.addEventListener('activate', event => {
    console.log(`[Service Worker] Activating version ${CACHE_NAME}`);
    event.waitUntil(
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
            // Tell the active service worker to take control of the page immediately.
            return self.clients.claim();
        })
    );
});


// --- FETCH INTERCEPTION ---
// This runs every time the browser tries to fetch a file.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Strategy: Network First, then Cache for data.csv
  // This ensures users get the latest questions if online, but the game works offline with old data.
  if (url.pathname.endsWith('data.csv')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
            // If the network request is successful, cache the new data and return it.
            return caches.open(CACHE_NAME).then(cache => {
                // We must clone the response as it can only be consumed once.
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
        .catch(() => {
            // If the network fails (user is offline), try to serve the file from the cache.
            console.log('[Service Worker] Network failed for CSV, serving from cache.');
            return caches.match(event.request);
        })
    );
    return;
  }

  // Strategy: Cache First, then Network for all other app shell files.
  // This makes the app load instantly and work offline.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If we find a match in the cache, return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }
        // If not in cache, fetch from the network.
        // (This is a fallback and shouldn't happen for files in urlsToCache)
        return fetch(event.request);
      })
    );
});




