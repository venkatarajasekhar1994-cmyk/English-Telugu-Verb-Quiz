// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART ---
// -------------------------------------------------------------------------\
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v37'. I have changed it to 'v38'.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// and upload it to GitHub, you MUST come into this file and
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

// --- 1. Install Event ---
// This runs when the service worker is first installed or updated.
// It opens the cache and saves all the files listed in urlsToCache.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event triggered. Caching app shell.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching files:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Cache addAll failed:', err);
      })
  );
  // Force the new service worker to become active immediately.
  self.skipWaiting();
});

// --- 2. Activate Event ---
// This runs after the install event.
// Its main job is to clean up old caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event triggered. Cleaning old caches.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cacheName is not our current one, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Tell the service worker to take control of all open pages.
  return self.clients.claim();
});

// --- 3. Fetch Event ---
// This runs every time your app makes a network request (e.g., for a file or data).
// This is where we decide how to respond: from the cache or from the network.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // We only want to handle 'GET' requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // --- Strategy 1: Network-First for CSV files ---
  // This is for your data files (data.csv, data2.csv, Vocabulary.csv).
  // We want to get the *newest* data from the network first.
  // If the network fails (offline), we'll use the cached version.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        // 1. Try to fetch from the network.
        return fetch(event.request).then(networkResponse => {
          // 2. If successful, update the cache with the new file.
          console.log(`[Service Worker] Network-First: Fetched ${requestUrl.pathname} from network, updating cache.`);
          cache.put(event.request, networkResponse.clone());
          // 3. Return the new response from the network.
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
  // This is for your main app "shell" (index.html, game hub.html, etc.).
  // This is fast and good for offline use.
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
        // This is important for the very first load or for files
        // you forgot to add to urlsToCache.
        return fetch(event.request).then(networkResponse => {
            // Note: We don't cache these files by default,
            // because they *should* have been in the urlsToCache list.
            return networkResponse;
        }).catch(error => {
            console.error('[Service Worker] Fetch failed, and not in cache:', error);
            // You could return a specific "offline" fallback page here if you wanted.
        });
      })
  );
});

