// service-worker.js

// **CRITICAL:** CHANGE THE CACHE VERSION (e.g., to v7 or v10)
// INCREMENTED VERSION TO FORCE BROWSER TO RELOAD ALL ASSETS
const CACHE_NAME = 'my-pwa-cache-v10'; 

const urlsToCache = [
  '/',                     
  'index.html',            
  'game hub.html',          // The main UI
  
  // Final, Correct File Names:
  'Verbs game.html',       
  'English vocabulary game.html', 
  'ai_teacher.html', // <--- NEW AI TEACHER FILE
  
  // Shared assets
  'manifest.json',
];

// Installation: Cache all essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        // Filter out CDN links which cache.addAll might fail on
        const offlineUrls = urlsToCache.filter(url => !url.startsWith('http') || url.includes(self.location.host));
        return cache.addAll(offlineUrls);
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
            
            return networkResponse;
          }
        );
      })
    );
});



