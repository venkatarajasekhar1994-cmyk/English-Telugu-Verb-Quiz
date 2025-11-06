// --
// service-worker.js (Updated Version)
// --

// --
// (1) మీ యాప్ యొక్క "గోల్డెన్ రూల్" (Golden Rule)
// --
// మీరు మీ ఫైల్స్‌లో (html, csv, js) ఏ చిన్న మార్పు చేసినా,
// ఈ కింది వెర్షన్ నంబర్‌ను తప్పకుండా మార్చాలి.
//
// ఇది పాత కాష్ (cache) ను తొలగించి, కొత్త ఫైల్స్‌ను డౌన్‌లోడ్ చేయమని బ్రౌజర్‌కు చెబుతుంది.
// --
const CACHE_NAME = 'app-cache-v4'; // <-- UPDATED from v3 to v4

// --
// (2) కాష్ చేయవలసిన అన్ని ఫైల్స్ జాబితా
// --
// This list includes all the HTML pages and the data files
// each page needs, just as you described.
// --
const urlsToCache = [
  // Core App Shell
  './', // This caches the root (which loads index.html)
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
  'Verbs game.html', // Matched your file name
  'Verbs.csv',

  // Game 4: Dictionary
  'Teluginglish dictionary.html',
  'english2telugu.csv'
];

// --
// (3) INSTALL Event: Save all the files to the cache
// --
// This runs when the new service worker is first installed.
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing cache: ${CACHE_NAME}`);
  
  // event.waitUntil() ensures the service worker doesn't
  // activate until all the files are successfully cached.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all app shell files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the new service worker to become active immediately.
        // This is good for updates.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Failed to cache files during install:', error);
      })
  );
});

// --
// (4) ACTIVATE Event: Clean up old caches
// --
// This runs after the new service worker is installed.
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating new cache: ${CACHE_NAME}`);
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // If the cacheName is not the new one, delete it.
            if (cacheName !== CACHE_NAME) {
              console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all open clients (pages) immediately.
        return self.clients.claim();
      })
  );
});

// --
// (5) FETCH Event: Serve from cache first, then network (Cache-First Strategy)
// --
self.addEventListener('fetch', event => {
  event.respondWith(
    // 1. Try to find the request in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If it's in the cache, return it immediately (fast load).
        if (cachedResponse) {
          // console.log(`[Service Worker] Serving from Cache: ${event.request.url}`);
          return cachedResponse;
        }

        // 3. If not in cache, go to the network to fetch it.
        // console.log(`[Service Worker] Not in cache, fetching from Network: ${event.request.url}`);
        return fetch(event.request).then(networkResponse => {
            // 4. (Optional)
            // You could cache the response here if it's a new, dynamic resource,
            // but for this app, we only cache the core files on install.
            return networkResponse;
          })
          .catch(error => {
            // This happens when both cache and network fail (e.g., offline)
            console.error('[Service Worker] Fetch failed from both cache and network:', error);
          });
      })
  );
});


