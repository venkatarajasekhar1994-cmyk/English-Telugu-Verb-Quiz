// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART: YOUR GOLDEN RULE ---
// -------------------------------------------------------------------------\
//
// Every time you upload *any* change to your GitHub files
// (e.g., you update 'spoken english.html' or 'Verbs.csv'),
// you MUST come into this file and change this version number.
//
// For example, change 'v40' to 'v41', then 'v42', and so on.
//
// This is the *only* way to tell the browser to delete the old
// cached files and download your new ones.
//
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v40'; // <-- I've updated this from v39 to v40!

// This list includes all the files needed for your app to work offline.
// It correctly includes all HTML pages and their required CSV data files.
const urlsToCache = [
  './', // This caches the root folder (which loads index.html)
  'index.html',
  'game hub.html',
  'manifest.json',

  // Game 1: Spoken English
  'spoken english.html',
  'data.csv',
  'data2.csv',

  // Game 2: English Vocabulary
  'English vocabulary game.html',
  'Vocabulary.csv',

  // Game 3: Verbs Game
  'Verbs game.html',
  'Verbs.csv'

  // NOTE: If you add any new pages, images, or CSS files, add them here!
];

// --- INSTALL: Caching the App Shell ---
// This runs when the service worker is first installed.
// It downloads all the files in urlsToCache and saves them.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all app shell files...');
        // We use { cache: 'reload' } to make sure we're getting the
        // latest files from the server, not the browser's HTTP cache.
        const requests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
        return cache.addAll(requests);
      })
      .then(() => {
        console.log('[Service Worker] All files cached. Ready to activate.');
        return self.skipWaiting(); // Force the new service worker to become active
      })
  );
});

// --- ACTIVATE: Cleaning up Old Caches ---
// This runs after 'install' when the new service worker activates.
// Its job is to find and delete any *old* caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Find all caches that start with 'my-pwa-cache-'
          // BUT are NOT the new CACHE_NAME.
          return cacheName.startsWith('my-pwa-cache-') && cacheName !== CACHE_NAME;
        }).map(cacheName => {
          // Delete the old cache
          console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('[Service Worker] Old caches cleared. Claiming clients.');
      return self.clients.claim(); // Take control of all open pages
    })
  );
});

// --- FETCH: Intercepting Network Requests ---
// This is the main part. It runs for *every single request* the page makes.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for Data Files (.csv) ---
  // We want to *always* try to get the freshest data if online.
  // If offline, we fall back to the cached version.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      // 1. Try to fetch from the network first.
      // We use 'no-store' to bypass the browser's HTTP cache,
      // forcing a request to the *absolute latest* file from the server.
      fetch(event.request, { cache: 'no-store' })
        .then(networkResponse => {
          // 2. If the network request succeeds (user is online):
          console.log(`[Service Worker] Fetched from Network (and Caching): ${requestUrl.pathname}`);
          // We must clone the response because it can only be read once.
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
    return; // Stop here for CSV files
  }

  // --- Strategy 2: Cache-First for App Shell (all other files) ---
  // For HTML, JSON, etc., we want to be fast and offline-first.
  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If it's in the cache, return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }
        // 3. If it's not in the cache, fetch it from the network.
        // (This mainly happens on the very first visit).
        return fetch(event.request);
      })
  );
});

