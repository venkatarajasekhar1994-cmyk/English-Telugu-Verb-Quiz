// service-worker.js

// Incrementing the version to 52 to trigger the update
const CACHE_VERSION = 52;
const STATIC_CACHE_NAME = `static-cache-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `dynamic-cache-v${CACHE_VERSION}`;

// This list now includes all the files you mentioned,
// with comments explaining their purpose based on your description.
const FILES_TO_CACHE = [
    // --- Core App Shell ---
    './', // This caches the root, which serves index.html
    'index.html', // The entry point (redirects to hub)
    'game hub.html', // The main hub page
    'manifest.json', // The PWA manifest

    // --- Page 1: Spoken English ---
    'spoken english.html',
    'data.csv', // Dependency for spoken english
    'data2.csv', // Dependency for spoken english
    'diagram_data.js', // Dependency for spoken english

    // --- Page 2: English Vocabulary Game ---
    'English vocabulary game.html',
    'Vocabulary.csv', // Dependency for English vocabulary game

    // --- Page 3: Verbs Game ---
    'Verbs game.html',
    'Verbs.csv', // Dependency for Verbs game

    // --- Page 4: Teluginglish Dictionary ---
    'Teluginglish dictionary.html',
    'english2telugu.csv', // Dependency for Teluginglish dictionary
    
    // --- Page 5: Correction Pad ---
    'correction pad.html' // No specific data dependency mentioned
];

// 1. Install Event: Cache all the core app shell files
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] Installing version ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching App Shell and Data');
            // Use { cache: 'reload' } to bypass the browser's HTTP cache.
            // This ensures we get the latest files from the server.
            const cachePromises = FILES_TO_CACHE.map((url) => {
                return fetch(url, { cache: 'reload' })
                    .then(response => {
                        if (!response.ok) {
                            // If a file fails to fetch, log it but don't break the entire install
                            console.error(`[Service Worker] Failed to cache ${url}: ${response.status} ${response.statusText}`);
                            // If it's a critical file, you might want to throw an error
                            // throw new Error(`Failed to cache ${url}`);
                        }
                        return cache.put(url, response);
                    })
                    .catch(err => {
                        console.error(`[Service Worker] Cache error for ${url}:`, err);
                    });
            });
            
            return Promise.all(cachePromises);
        }).then(() => {
            console.log('[Service Worker] All files cached successfully.');
            // Force the waiting service worker to become the active service worker
            return self.skipWaiting();
        })
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log(`[Service Worker] Activating version ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                // Delete old caches that are not the current static or dynamic cache
                if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache:', key);
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            // Tell the active service worker to take control of the page immediately
            return self.clients.claim();
        })
    );
});

// 3. Fetch Event: Serve from cache first, then network (Cache-First strategy)
self.addEventListener('fetch', (event) => {
    // Don't intercept requests for non-HTTP/HTTPS protocols
    if (!(event.request.url.startsWith('http'))) {
        return;
    }

    // For all other requests, use Cache-First
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1. Found in Cache - Return it
            if (cachedResponse) {
                // console.log(`[Service Worker] Serving from Cache: ${event.request.url}`);
                return cachedResponse;
            }

            // 2. Not in Cache - Fetch from Network
            // console.log(`[Service Worker] Fetching from Network: ${event.request.url}`);
            return fetch(event.request).then((networkResponse) => {
                // 3. Network successful - Clone, cache dynamically, and return
                return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                    // Clone the response because it's a stream and can only be consumed once
                    cache.put(event.request.url, networkResponse.clone());
                    // console.log(`[Service Worker] Dynamically Cached: ${event.request.url}`);
                    return networkResponse;
                });
            }).catch((error) => {
                // 4. Network failed - Handle offline
                console.warn(`[Service Worker] Fetch failed. URL: ${event.request.url}`, error);
                
                // If the failed request is an HTML page (navigation), return the main index.html as a fallback.
                if (event.request.mode === 'navigate') {
                    console.log('[Service Worker] Returning fallback HTML page (index.html).');
                    return caches.match('index.html'); 
                }
                
                // For other failed requests (e.g., data, images), return a generic error response
                // This prevents the page from hanging indefinitely
                return new Response(JSON.stringify({ error: 'Offline and resource not in cache.' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 503 // Service Unavailable
                });
            });
        })
    );
});

