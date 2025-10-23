// service-worker.js

// -------------------------------------------------------------------------
// --- THE MOST IMPORTANT PART ---
// -------------------------------------------------------------------------
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v25'. I have changed it to 'v26'.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// and upload it to GitHub, you MUST come into this file and
// increment this version number (e.g., to 'v27', then 'v28', etc.).
//
// This tells the browser your app has an update, forcing it
// to delete the old cache and download all the new files.
// If you don't change this, the browser will *always* use the old files.
// -------------------------------------------------------------------------
const CACHE_NAME = 'my-pwa-cache-v26'; // <-- I updated this from v25 to v26!

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
  'manifest.json'
  // NOTE: If you add any images, CSS, or new HTML files, add them here!
];

// --- INSTALLATION ---
// This runs when the new service worker (with a new CACHE_NAME) is installed.
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing version ${CACHE_NAME}`);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all core assets');
        // addAll will fetch all files from the network and cache them.
        // If any file fails to download, the whole install fails.
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
// This runs after the new service worker is installed.
// Its job is to clean up old caches.
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating version ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is old (e.g., 'v25' after 'v26' is activated), delete it.
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


// --- FETCH INTERCEPTION (CACHE-FIRST) ---
// This runs every time the browser tries to request any file (e.g., an HTML page, data.csv).
self.addEventListener('fetch', event => {
  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If we find a match (it's in the cache), return it immediately.
        // This is what makes the app work offline.
        // This is ALSO what causes the problem: it *never* checks the network
        // if the file already exists in the cache.
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If it's not in the cache, fetch it from the network.
        // This is important for any files you forgot to cache
        // or for external requests (like to Google Fonts or Tailwind).
        return fetch(event.request);
      })
  );
});

