// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART ---\
// -------------------------------------------------------------------------\
// This cache version number is the "magic key" to updating your app.
// Your old file said 'v26'. I have changed it to 'v27'
// because we are updating the list of files to cache.
//
// **YOUR GOLDEN RULE:**
// Every time you change ANY file (like spoken english.html or data.csv)
// you MUST come into this file and increment this version number
// (e.g., to 'v28', then 'v29', etc.).
//
// This tells the browser your app has an update, forcing it
// to delete the old cache and download all the new files.
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v27'; // <-- I updated this from v26 to v27!

// This is the list of all the files that will be saved for offline use.
// I've added 'data2.csv' and 'diagram_data.js' so the Spoken English
// page works correctly offline.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game hub.html',
  'spoken english.html',
  'Verbs game.html',
  'English vocabulary game.html',
  'data.csv',
  'data2.csv', // <-- ADDED
  'diagram_data.js', // <-- ADDED
  'manifest.json'
];

// --- INSTALLATION ---\
// This runs when the new service worker (with a new CACHE_NAME) is installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event... Caching files.');
  // We wait until the cache is fully populated before finishing installation.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all specified app shell files.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // This forces the new service worker to become "active" immediately
        // instead of waiting for the user to close all old tabs.
        console.log('[Service Worker] All files cached. Skipping wait.');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Cache addAll failed:', error);
      })
  );
});


// --- ACTIVATION ---\
// This runs after 'install' and when the new service worker takes control.
// Its main job is to clean up old, outdated caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // We check all caches on the user's device.
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is old (e.g., 'v26' after 'v27' is activated), delete it.
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


// --- FETCH INTERCEPTION (CACHE-FIRST) ---\
// This runs every time the browser tries to request any file (e.g., an HTML page, data.csv).
self.addEventListener('fetch', event => {
  // We only apply the cache-first strategy to GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If we find a match (it's in the cache), return it immediately.
        // This is what makes the app work offline.
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If it's not in the cache, fetch it from the network.
        // This is important for any files you forgot to cache
        // or for external requests (like to Google Fonts or Tailwind).
        // Note: This network-fetched response is NOT added to the cache here.
        // Only the files in 'urlsToCache' are proactively cached on install.
        // This is a "Cache-First" strategy.
        return fetch(event.request);
      })
      .catch(error => {
        // This can happen if the network request fails and it's not in the cache.
        console.error('[Service Worker] Fetch failed:', error);
        // You could return a custom offline fallback page here if you wanted.
        // e.g., return caches.match('offline.html');
      })
  );
});

