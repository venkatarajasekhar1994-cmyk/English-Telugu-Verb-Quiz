// service-worker.js

// **CRITICAL:** CHANGE THE CACHE VERSION (e.g., to v7 or v8)
// INCREMENTED VERSION TO FORCE BROWSER TO RELOAD ALL ASSETS
const CACHE_NAME = 'my-pwa-cache-v8'; 

const urlsToCache = [
  '/',                     
  'index.html',            
  'gamehub.html',          // The main UI
  
  // Final, Correct File Names:
  'Verbs game.html',       
  'English vocabulary game.html', // <--- THE CORRECTED FILE NAME
  
  // Shared assets (ensure all shared images, CSS, and JS files are listed)
  'manifest.json',
  'https://cdn.tailwindcss.com', // If you rely on the CDN, it might not cache reliably. 
                                // Best practice is to download Tailwind CSS locally and cache it here.
  // 'styles/game-main.css',  
  // 'scripts/game-logic.js',
];

// Installation: Cache all essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Failed to cache assets:', err);
      })
  );
});

// Activation: Clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Ensure the service worker claims clients right away so that all pages load with the latest cache
  event.waitUntil(self.clients.claim());
});

// Fetch: Serve from cache first, then fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // No match in cache - fetch from network
        return fetch(event.request).then(
          networkResponse => {
            // Check if we received a valid response
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // OPTIONAL: Clone the response to cache it later
            // const responseToCache = networkResponse.clone();
            
            // // Cache new resources as they are fetched
            // if (urlsToCache.some(url => event.request.url.endsWith(url))) {
            //     caches.open(CACHE_NAME)
            //     .then(cache => {
            //         cache.put(event.request, responseToCache);
            //     });
            // }

            return networkResponse;
          }
        );
      })
    );
});

