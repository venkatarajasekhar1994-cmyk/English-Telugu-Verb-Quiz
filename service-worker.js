// service-worker.js

// CRITICAL: Cache version.
// Every time you change ANY file that's cached (HTML, CSV, etc.),
// you MUST increment this version number. This is the most important step.
const CACHE_NAME = 'my-pwa-cache-v22'; // Version incremented to 22

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
        console.log('[Service Worker] Installation successful, skipping waiting.');
        self.skipWaiting();
      })
      .catch(err => {
        console.error('[Service Worker] Caching failed:', err);
      })
  );
});

// --- ACTIVATION ---
// This runs after the new service worker is installed and takes control.
// Its job is to clean up any old, unused caches.
self.addEventListener('activate', event => {
    console.log(`[Service Worker] Activating version ${CACHE_NAME}`);
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // If a cache's name is not our current CACHE_NAME, it's an old one.
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // This ensures the newly activated service worker takes control of the page
            // immediately, so the user sees the updates right away.
            console.log('[Service Worker] Claiming clients.');
            return self.clients.claim();
        })
    );
});


// --- FETCH INTERCEPTION ---
// This runs every time the browser tries to request a file from your site.
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Strategy for data.csv: Network first, then Cache.
  // This ensures users get the latest questions if online.
  if (url.pathname.endsWith('data.csv')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            });
        })
        .catch(() => {
            // If the network fails (offline), serve the file from the cache.
            return caches.match(event.request);
        })
    );
    return;
  }

  // Strategy for all other files: Cache first, then Network.
  // This makes the app load instantly and work offline.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // If we find a match in the cache, return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }
        // If not in cache, fetch from the network.
        return fetch(event.request);
      })
    );
});

