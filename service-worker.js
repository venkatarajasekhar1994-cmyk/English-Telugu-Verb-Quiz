// service-worker.js

// -------------------------------------------------------------------------\
// --- CACHE VERSION v28 ---\
// -------------------------------------------------------------------------\
// I've updated the version from v27 to v28.
//
// THE FIX:
// The cache list now uses URL-encoded names for files with spaces
// (e.g., 'game hub.html' is now 'game%20hub.html').
// This will prevent the 'install' step from failing and will ensure
// ALL files, including data2.csv, are saved correctly.
// -------------------------------------------------------------------------\
const CACHE_NAME = 'my-pwa-cache-v28'; // <-- I updated this from v27 to v28!

// This is the list of all the files that will be saved for offline use.
// I've encoded the names of files that contain spaces.
const urlsToCache = [
  './', // Caches the root directory, which serves index.html
  'index.html',
  'game%20hub.html', // <-- FIXED (was 'game hub.html')
  'spoken%20english.html', // <-- FIXED (was 'spoken english.html')
  'Verbs%20game.html', // <-- FIXED (was 'Verbs game.html')
  'English%20vocabulary%20game.html', // <-- FIXED (was 'English vocabulary game.html')
  'data.csv',
  'data2.csv',
  'diagram_data.js',
  'manifest.json'
];

// --- INSTALLATION ---\
// This runs when the new service worker (with a new CACHE_NAME) is installed.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event v28... Caching files.');
  // We wait until the cache is fully populated before finishing installation.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching all specified app shell files.');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // This forces the new service worker to become "active" immediately
        console.log('[Service Worker] All files cached (v28). Skipping wait.');
        return self.skipWaiting();
      })
      .catch(error => {
        // This is the error that was likely happening before!
        console.error('[Service Worker] Cache addAll (v28) failed:', error);
      })
  );
});


// --- ACTIVATION ---\
// This runs after 'install' and when the new service worker takes control.
// Its main job is to clean up old, outdated caches (like v26 and v27).
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event (v28)...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // We check all caches on the user's device.
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is old (e.g., 'v26', 'v27'), delete it.
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // This command ensures the activated service worker takes control of all
      // open pages immediately, without needing a reload.
      console.log('[Service Worker] Claiming clients (v28).');
      return self.clients.claim();
    })
  );
});


// --- FETCH INTERCEPTION (CACHE-FIRST) ---\
// This runs every time the browser tries to request any file.
self.addEventListener('fetch', event => {
  // We only apply the cache-first strategy to GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    // 1. Try to find a match in the cache.
    // When the browser requests 'spoken english.html', the
    // event.request object will have the encoded URL, so it
    // will correctly match 'spoken%20english.html' in the cache.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. If we find a match (it's in the cache), return it immediately.
        if (cachedResponse) {
          return cachedResponse;
        }

        // 3. If it's not in the cache, fetch it from the network.
        return fetch(event.request);
      })
      .catch(error => {
        console.error('[Service Worker] Fetch failed:', error);
      })
  );
});

