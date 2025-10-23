// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART ---\
// -------------------------------------------------------------------------\
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v26'. I have changed it to 'v34'.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// and upload it, you MUST come into this file and
// increment this version number (e.g., to 'v35', then 'v36', etc.).
//
// This tells the browser your app has an update, forcing it
// to delete the old cache and download all the new files.
// If you don't change this, the browser will *always* use the old files.
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v34'; // <-- I updated this from v26 to v34!

// This is the list of all the files that will be saved for offline use.
// This list looks correct and matches all the files you provided.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'data2.csv', // <-- ADDED this new file
  'manifest.json'
  // NOTE: If you add any images, CSS, or new HTML files, add them here!
];

// --- INSTALLATION ---\
// This runs when the new service worker (with a new CACHE_NAME) is installed.\
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event starting.');
  // This 'waitUntil' tells the browser to wait until the promise is resolved\
  // (i.e., all our files are cached) before marking the install as complete.\
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Opened cache. Caching all files...');
        // 'addAll' fetches all the URLs in the list and stores them in the cache.\
        // If any file fails to download, the entire install fails.\
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached successfully. Install complete.');
        // This command forces the new service worker to become "active" immediately.\
        // This is good for development. Without it, you'd have to close all\
        // tabs for your site before the new version would activate.\
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Caching failed during install:', error);
      })
  );
});

// --- ACTIVATION ---\
// This runs after the 'install' event is complete and the new service worker is ready to take control.\
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event starting.');
  event.waitUntil(
    // Get all the existing cache "keys" (which are the cache names, like 'v25', 'v26')\
    caches.keys().then(cacheNames => {
      // We use Promise.all to wait for all deletion promises to complete.\
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is old (e.g., 'v33' after 'v34' is activated), delete it.\
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // This command ensures the activated service worker takes control of all\
      // open pages immediately, without needing a reload.\
      console.log('[Service Worker] Claiming clients.');
      return self.clients.claim();
    })
  );
});


// --- FETCH INTERCEPTION (NETWORK-FIRST for CSV, CACHE-FIRST for others) ---\
// This runs every time the browser tries to request any file.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for CSV files ---
  // This is critical for data.csv and data2.csv.
  // It tries the network first. If it succeeds, it updates the cache.
  // If it fails (offline), it serves the file from the cache.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        // 1. Try to fetch from the network.
        return fetch(event.request).then(networkResponse => {
          // 2. If successful, update the cache with the new file.
          // We must clone the response because it can only be read once.
          console.log(`[Service Worker] Fetched ${requestUrl.pathname} from network, updating cache.`);
          cache.put(event.request, networkResponse.clone());
          // 3. Return the network response to the browser.
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

