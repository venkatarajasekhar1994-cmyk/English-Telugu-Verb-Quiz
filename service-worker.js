// service-worker.js

// -------------------------------------------------------------------------\
// --- THE MOST IMPORTANT PART: YOUR GOLDEN RULE ---\
// -------------------------------------------------------------------------\
//
// Every time you upload *any* change to your GitHub files
// (e.g., you update 'spoken english.html' or 'Verbs.csv'),
// you MUST come into this file and change this version number.
//
// For example, change 'v46' to 'v47', then 'v48', and so on.
//
// This is the *only* way to tell the browser to delete the old
// cached files and download your new ones.
//
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v46'; // <-- Updated from v41 to v46

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

// --- Install Event: Cache all the core app files ---
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing Cache: ${CACHE_NAME}`);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all app shell files');
        // AddAll will fetch and cache all the files in the list.
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker.
        console.log('[Service Worker] Install complete, activating immediately.');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Caching failed:', error);
      })
  );
});

// --- Activate Event: Clean up old caches ---
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating Cache: ${CACHE_NAME}`);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If a cache's name is different from our new CACHE_NAME, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting Old Cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tell the active service worker to take control of the page immediately.
      console.log('[Service Worker] Claiming clients.');
      return self.clients.claim();
    })
  );
});

// --- Fetch Event: How to respond to network requests ---
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // --- Strategy 1: Network-First for Data Files (CSV) ---
  // We always want the freshest data for CSV files if online.
  if (requestUrl.pathname.endsWith('.csv')) {
    // 1. Try to fetch from the network first.
    event.respondWith(
      fetch(event.request)
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
  // For HTML, JS, JSON, etc., we want to be fast and offline-first.
  event.respondWith(
    // 1. Try to find a match in the cache.
    caches.match(event.Request)
      .then(cachedResponse => {
        // 2. If it's in the cache, return it immediately.
        if (cachedResponse) {
          // console.log(`[Service Worker] Serving from Cache: ${requestUrl.pathname}`);
          return cachedResponse;
        }
        // 3. If it's not in the cache, fetch it from the network.
        // (This mainly happens on the very first visit).
        console.log(`[Service Worker] Not in cache, fetching from Network: ${requestUrl.pathname}`);
        return fetch(event.request);
      })
  );
});

