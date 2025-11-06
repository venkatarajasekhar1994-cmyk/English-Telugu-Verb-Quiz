// service-worker.js

// వెర్షన్‌ను 51కి అప్‌డేట్ చేస్తున్నాము (మీ పాత వెర్షన్ 50)
const CACHE_VERSION = 51;
const STATIC_CACHE_NAME = `static-cache-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `dynamic-cache-v${CACHE_VERSION}`;

// మీ యాప్ ఆఫ్‌లైన్‌లో పనిచేయడానికి అవసరమైన అన్ని ఫైల్స్
// మీరు అందించిన జాబితా ప్రకారం
const FILES_TO_CACHE = [
    './', // రూట్ డైరెక్టరీ (index.html కోసం)
    'index.html',
    'game hub.html',
    'spoken english.html',
    'English vocabulary game.html',
    'Verbs game.html',
    'Teluginglish dictionary.html',
    'manifest.json',
    'diagram_data.js',
    'data.csv',
    'data2.csv',
    'Vocabulary.csv',
    'english2telugu.csv',
    'Verbs.csv'
];

// 1. Install Event: యాప్ షెల్ మరియు డేటాను కాష్ చేయండి
self.addEventListener('install', (event) => {
    console.log(`[Service Worker] Installing version ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching App Shell and Data');
            // బ్రౌజర్ యొక్క HTTP కాష్‌ను దాటవేయడానికి { cache: 'reload' } వాడండి
            const cachePromises = FILES_TO_CACHE.map((url) => {
                return cache.add(new Request(url, { cache: 'reload' })).catch(err => {
                    console.warn(`[Service Worker] Failed to cache: ${url}`, err);
                });
            });
            return Promise.all(cachePromises);
        })
    );
    self.skipWaiting(); // కొత్త సర్వీస్ వర్కర్‌ను వెంటనే యాక్టివేట్ చేయండి
});

// 2. Activate Event: పాత కాష్‌లను తొలగించండి
self.addEventListener('activate', (event) => {
    console.log(`[Service Worker] Activating version ${CACHE_VERSION}...`);
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
                        console.log('[Service Worker] Removing old cache:', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// 3. Fetch Event: కాష్ నుండి సర్వ్ చేయండి, లేకపోతే నెట్‌వర్క్‌కు వెళ్లండి
self.addEventListener('fetch', (event) => {
    // కేవలం http/https రిక్వెస్ట్‌లను మాత్రమే హ్యాండిల్ చేయండి
    if (event.request.url.indexOf('http') !== 0) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // 1. కాష్‌లో దొరికింది - కాష్ నుండి ఇవ్వండి (Cache-First)
                return cachedResponse;
            }

            // 2. కాష్‌లో లేదు - నెట్‌వర్క్ నుండి తెచ్చుకోవడానికి ప్రయత్నించండి
            return fetch(event.request).then((networkResponse) => {
                // 3. నెట్‌వర్క్ నుండి విజయవంతంగా వచ్చింది - డైనమిక్‌గా కాష్ చేసి, యూజర్‌కు పంపండి
                return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                    // రెస్పాన్స్‌ను క్లోన్ చేయండి, ఎందుకంటే అది ఒక స్ట్రీమ్
                    cache.put(event.request.url, networkResponse.clone());
                    return networkResponse;
                });
            }).catch((error) => {
                // 4. నెట్‌వర్క్ విఫలమైంది - ఫాల్‌బ్యాక్ పేజీని ఇవ్వండి
                console.warn(`[Service Worker] Fetch failed. URL: ${event.request.url}`, error);
                
                // ఫెయిల్ అయిన రిక్వెస్ట్ ఒక HTML పేజీ (navigation) అయితే, index.htmlను చూపించండి
                if (event.request.mode === 'navigate') {
                    console.log('[Service Worker] Returning fallback HTML page.');
                    return caches.match('index.html'); 
                }
                
                // ఇతర ఫైల్స్ (data, images) ఫెయిల్ అయితే ఎర్రర్ ఇవ్వండి
                return new Response(JSON.stringify({ error: 'Offline and resource not cached' }), {
                    headers: { 'Content-Type': 'application/json' },
                    status: 503
                });
            });
        })
    );
});


