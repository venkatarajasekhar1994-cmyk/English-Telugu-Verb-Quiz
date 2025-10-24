// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART ---\
// -------------------------------------------------------------------------\
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v36'. I have changed it to 'v37'.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// and upload it, you MUST come into this file and
// increment this version number (e.g., to 'v38', then 'v39', etc.).
//
// This tells the browser your app has an update, forcing it
// to delete the old cache and download all the new files.
// If you don't change this, the browser will *always* use the old files.
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v37'; // <-- I updated this from v36 to v37!

// This is the list of all the files that will be saved for offline use.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html', // <-- RE-ADDED this file to the cache
  'data.csv',
  'data2.csv',
  'Vocabulary.csv',
  'manifest.json'
  // NOTE: If you add any images, CSS, or new HTML files, add them here!
];

// --- INSTALLATION ---\
// This runs when the new service worker is first installed.
// It opens our app's cache and adds all the files listed above.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event starting...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Opened cache. Caching all core files.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached successfully. Install complete.');
        // Force the new service worker to become active immediately
        return self.skipWaiting();
      })
      .catch(error => {
        // This is critical! If *any* file in urlsToCache fails to download,
        // the service worker will not install.
        console.error('[Service Worker] Install failed, could not cache files:', error);
      })
  );
});

// --- ACTIVATION ---\
// This runs *after* installation, when the new service worker takes control.
// Its job is to clean up old, unused caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event starting...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache's name is NOT our current (new) cache name...
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            // ...then delete it!
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('[Service Worker] Old caches cleared. Now active.');
        // Tell all open browser tabs to use this new service worker
        return self.clients.claim();
    })
  );
});

// --- FETCHING (Serving files) ---\
// This runs every time your app tries to fetch a file (e.g., a page, a CSV, an image).
// It intercepts the request and decides whether to serve from the cache or the network.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for CSV files (and API calls) ---
  // We want to *try* the network first for data files.
  // This ensures the user gets the *freshest* data if they are online.
  // If they are offline, we'll fall back to the cached version.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      // 1. Try to open the cache.
      caches.open(CACHE_NAME).then(cache => {
        // 2. Try to fetch the file from the network.
        return fetch(event.request).then(networkResponse => {
          // 3. If the network fetch succeeds (online)...
          // ...update the cache with the fresh file.
          console.log(`[Service Worker] Fetched fresh data: ${requestUrl.pathname}`);
          cache.put(event.request, networkResponse.clone());
          // ...and return the fresh file to the app.
          return networkResponse;
        }).catch(() => {
          // 4. If the network fetch fails (offline), try to get it from the cache.
          console.log(`[Service Worker] Network failed for ${requestUrl.pathname}, serving from cache.`);
          return cache.match(event.request);
        });
      })
    );
    return; // Stop here for CSV files
  }

  // --- Strategy 2: Cache-First for all other files (HTML, JSON, etc.) ---
  // This is fast and good for the main app "shell".
  // It serves from the cache immediately if available.
  // It only goes to the network if the file isn't in the cache.
  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If we find a match (it's in the cache), return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If it's not in the cache, fetch it from the network.
        // This is important for external requests (like Google Fonts or Tailwind).
        return fetch(event.request).then(networkResponse => {
            // Note: We don't cache these external files by default,
            // but you could add logic here to cache them if you wanted.
            return networkResponse;
        }).catch(error => {
            console.error('[Service Worker] Fetch failed, and not in cache:', error);
            // You could return a specific "offline" fallback page here if you wanted.
        });
      })
  );
});

