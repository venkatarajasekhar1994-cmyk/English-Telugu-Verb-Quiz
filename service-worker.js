// service-worker.js

// **CRITICAL:** INCREMENTED VERSION TO FORCE BROWSER TO RELOAD ALL ASSETS
// We are increasing the version number to ensure the browser discards the old, problematic cache.
const CACHE_NAME = 'my-pwa-cache-v11'; 

const urlsToCache = [
  '/',                     
  'index.html',            
  
  // Explicitly list the main hub and game files with their exact names
  'game hub.html',         
  'Verbs game.html',       
  'English vocabulary game.html', 
  
  // Shared assets
  'manifest.json',
  
  // Cache Tailwind CSS CDN link
  'https://cdn.tailwindcss.com', 
];

// Installation: Cache all essential files
self.addEventListener('install', event => {
  console.log('[Service Worker] Install (v11)');
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
  // Forces the waiting service worker to become the active service worker.
  self.skipWaiting();
});

// Activation: CRITICAL STEP TO DELETE OLD CACHES AND ENSURE CONTROL
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate (v11) - Deleting Old Caches');
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
    }).then(() => {
        // Essential for immediate control, helping to solve the GitHub Pages issue
        return self.clients.claim();
    })
  );
});

// Fetch: Serve from cache first, then fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          networkResponse => {
            if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            return networkResponse;
          }
        );
      })
    );
});



