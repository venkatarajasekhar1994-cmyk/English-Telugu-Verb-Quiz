// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART: YOUR GOLDEN RULE ---\
// -------------------------------------------------------------------------\
//
// Every time you upload *any* change to your GitHub files
// (e.g., you update 'spoken english.html' or 'Verbs.csv'),
// you MUST come into this file and change this version number.
//
// For example, change 'v47' to 'v48', then 'v49', and so on.
//
// This is the *only* way to tell the browser to delete the old
// cached files and download your new ones.
//
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v47'; // <-- Updated from v46 to v47

// This list includes all the files needed for your app to work offline.
// It correctly includes all HTML pages and their required data files.
const urlsToCache = [
  './', // This caches the root folder (which loads index.html)
  'index.html',
  'game hub.html',
  'manifest.json',

  // Game 1: Spoken English
  'spoken english.html',
  'data.csv',
  'data2.csv',
  'diagram_data.js',

  // Game 2: English Vocabulary
  'English vocabulary game.html',
  'Vocabulary.csv',

  // Game 3: Verbs Game
  'Verbs game.html',
  'Verbs.csv'

  // NOTE: If you add any new pages, images, or CSS files, add them here!
];

// --- 1. INSTALL: Cache all the core app files ---
// This runs when the service worker is first installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all app shell files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached. Ready to activate.');
        // Force the new service worker to become active immediately.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Failed to cache files:', error);
      })
  );
});

// --- 2. ACTIVATE: Clean up old caches ---
// This runs after 'install' and when the new service worker takes control.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache's name is different from our new CACHE_NAME, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Old caches cleared. Claiming clients.');
      // Take control of all open pages immediately.
      return self.clients.claim();
    })
  );
});

// --- 3. FETCH: Intercept network requests ---
// This runs every time the app makes a network request (e.g., for a file or data).
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for .csv and .js data files ---
  // This ensures that if the user is online, they *always* get the
  // freshest data. If they are offline, it falls back to the cache.
  if (requestUrl.pathname.endsWith('.csv') || requestUrl.pathname.endsWith('.js')) {
    // console.log(`[Service Worker] Fetching (Network-First): ${requestUrl.pathname}`);
    event.respondWith(
      // 1. Try to fetch from the network first.
      fetch(event.request)
        .then(networkResponse => {
          // 2. If successful, cache the new response and return it.
          // console.log(`[Service Worker] Fetched from Network: ${requestUrl.pathname}`);
          // Clone the response because it can only be read once.
          const responseToCache = networkResponse.clone();
          // Open our cache and put the new, fresh file into it.
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          // Return the fresh response to the page.
          return networkResponse;
        })
        .catch(error => {
          // 3. If the network request fails (user is offline):
          console.log(`[Service Worker] Network failed for ${requestUrl.pathname}, serving from cache.`);
          // Try to get the file from the cache instead.
          return caches.match(event.request);
        })
    );
    return; // Stop here for CSV/JS files
  }

  // --- Strategy 2: Cache-First for App Shell (all other files) ---
  // For HTML, JSON, etc., we want to be fast and offline-first.
  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If it's in the cache, return it immediately.
        if (cachedResponse) {
          // console.log(`[Service Worker] Serving from Cache: ${requestUrl.pathname}`);
          return cachedResponse;
        }
        // 3. If it's not in the cache, fetch it from the network.
        // (This mainly happens on the very first visit).
        console.log(`[Service Worker] Not in cache, fetching from Network: ${requestUrl.pathname}`);
        return fetch(event.request).then(networkResponse => {
          // 4. Once fetched, cache it for next time.
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
      .catch(error => {
        console.error('[Service Worker] Fetch failed:', error);
        // You could return a fallback offline page here if you had one.
      })
  );
});

