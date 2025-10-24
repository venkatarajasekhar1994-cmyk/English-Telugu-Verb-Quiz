// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART: YOUR GOLDEN RULE ---\
// -------------------------------------------------------------------------\
//
// Every time you upload *any* change to your GitHub files
// (e.g., you update 'spoken english.html' or 'Verbs.csv'),
// you MUST come into this file and change this version number.
//
// For example, change 'v42' to 'v43', then 'v44', and so on.
//
// This is the *only* way to tell the browser to delete the old
// cached files and download your new ones.
//
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v42'; // <-- I've updated this from v41 to v42!


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


// --- 1. INSTALL Event ---
// This runs when the service worker is first installed.
// It opens the cache and adds all the 'urlsToCache' to it.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached successfully');
        return self.skipWaiting(); // Force the new SW to become active
      })
      .catch(error => {
        console.error('[Service Worker] Cache addAll failed:', error);
      })
  );
});


// --- 2. ACTIVATE Event ---
// This runs when the new service worker becomes active.
// It's the perfect place to clean up old, outdated caches.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache's name is NOT our new CACHE_NAME, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        console.log('[Service Worker] Old caches cleaned up');
        return self.clients.claim(); // Take control of all open pages
    })
  );
});


// --- 3. FETCH Event ---
// This runs every time the app makes a network request (e.g., for a file or data).
// This is where we define our caching strategies.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for CSV files ---
  // We want to get the *latest* data if online, but fall back to cache if offline.
  if (requestUrl.pathname.endsWith('.csv')) {
    event.respondWith(
      // 1. Try to fetch from the network first.
      fetch(event.request)
        .then(networkResponse => {
          // 2. If the request succeeds (user is online):
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

