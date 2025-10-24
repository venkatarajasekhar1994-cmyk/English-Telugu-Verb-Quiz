// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART ---
// -------------------------------------------------------------------------\
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v37'. I have changed it to 'v38'.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// and upload it, you MUST come into this file and
// increment this version number (e.g., to 'v39', then 'v40', etc.).
//
// This tells the browser your app has an update, forcing it
// to delete the old cache and download all the new files.
// If you don't change this, the browser will *always* use the old files.
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v38'; // <-- I updated this from v37 to v38!

// This is the list of all the files that will be saved for offline use.
// This list already correctly includes all the files you mentioned.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'data2.csv',
  'Vocabulary.csv',
  'manifest.json'
  // NOTE: If you add any images, CSS, or new HTML files, add them here!
];

// --- INSTALLATION ---
// This code runs when the service worker is first installed.
// It opens our cache and adds all the files listed above.
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all app shell files');
        // We use addAll to fetch and cache all the files in urlsToCache
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete. Activating...');
        // Force the new service worker to become active immediately
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Cache addAll failed:', error);
      })
  );
});

// --- ACTIVATION ---
// This code runs when the new service worker becomes active.
// Its job is to delete all *old* caches to save space.
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating new service worker...`);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cacheName is not our current one, delete it!
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // Tell the service worker to take control of all open pages
        return self.clients.claim();
    })
  );
});

// --- FETCH (INTERCEPTING REQUESTS) ---
// This is where the magic happens. Every time your app
// tries to fetch a file (like 'data.csv' or 'game hub.html'),
// this code intercepts the request.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for CSV data files ---
  // This is for your data files: data.csv, data2.csv, Vocabulary.csv
  // We want to get the *newest* data if possible, but use the
  // *cached* data if the user is offline.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      // 1. Open our cache.
      caches.open(CACHE_NAME).then(cache => {
        // 2. Try to fetch the file from the network (internet).
        return fetch(event.request).then(networkResponse => {
          // 3. If successful, update the cache with the new file.
          console.log(`[Service Worker] Fetched from network and caching: ${requestUrl.pathname}`);
          cache.put(event.request, networkResponse.clone());
          // 4. Return the new file from the network.
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

