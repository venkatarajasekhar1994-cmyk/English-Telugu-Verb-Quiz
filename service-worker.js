// Service Worker for Offline Caching
const CACHE_NAME = 'telugu-verb-quiz-v1';

// List of all files and external resources needed for offline use
const urlsToCache = [
    'index.html',
    'manifest.json',
    'service-worker.js',
    // External resources (Tailwind, Tone.js, Fonts)
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lora:wght=700&family=Roboto:wght@400;700&family=Merriweather:wght==400;700&family=Playfair+Display:wght@700&family=Montserrat:wght@400;700&family=Source+Sans+3:wght@400;700&display=swap',
    'https://fonts.gstatic.com/s/inter/v13/Uu/DMRPw2J-wN2.woff2', // Inter font files
    // Placeholder image used in manifest (or any other required image assets)
    'https://placehold.co/192x192/4f46e5/ffffff?text=VQ', 
    'https://placehold.co/512x512/4f46e5/ffffff?text=VQ'
];

// Installation: Cache essential files
self.addEventListener('install', event => {
    // Force the service worker to activate immediately
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching files...');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation: Clean up old caches
self.addEventListener('activate', event => {
    // Claim control of all pages within the scope immediately
    event.waitUntil(self.clients.claim());
    
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch: Serve cached content first, then try network
self.addEventListener('fetch', event => {
    // Only handle HTTP/HTTPS requests, ignore chrome-extension:// etc.
    if (!event.request.url.startsWith('http')) return;
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // IMPORTANT: Clone the request. A request is a stream and can only be consumed once.
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                            return networkResponse;
                        }

                        // IMPORTANT: Clone the response. Response is a stream and can only be consumed once.
                        const responseToCache = networkResponse.clone();

                        // Only cache GET requests
                        if (event.request.method === 'GET') {
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return networkResponse;
                    }
                );
            })
    );
});