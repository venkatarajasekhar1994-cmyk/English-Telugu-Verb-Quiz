// ---
// service-worker.js (Brand New Version - Updated)
// ---

// ---
// (1) మీ యాప్ యొక్క "గోల్డెన్ రూల్" (Golden Rule)
// ---
// మీరు మీ ఫైల్స్‌లో (html, csv, js) ఏ చిన్న మార్పు చేసినా,
// ఈ కింది వెర్షన్ నంబర్‌ను తప్పకుండా మార్చాలి.
// ఉదాహరణకు: 'app-cache-v2' నుండి 'app-cache-v3' కి, ఆ తర్వాత 'app-cache-v4' కి.
//
// ఇది పాత కాష్ (cache) ను తొలగించి, కొత్త ఫైల్స్‌ను డౌన్‌లోడ్ చేయమని బ్రౌజర్‌కు చెబుతుంది.
// ---
const CACHE_NAME = 'app-cache-v2'; // <-- UPDATED TO v2

// ---
// (2) కాష్ చేయవలసిన అన్ని ఫైల్స్ జాబితా
// ---
// మీ యాప్ ఆఫ్‌లైన్‌లో పనిచేయడానికి అవసరమైన అన్ని ముఖ్యమైన ఫైల్స్ ఇక్కడ ఉన్నాయి.
// ---
const urlsToCache = [
  // Core App Shell
  './', // రూట్ ఫోల్డర్‌ను కాష్ చేస్తుంది (index.html ను లోడ్ చేస్తుంది)
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
  'Verbs.csv',

  // Game 4: Dictionary
  'Teluginglish dictionary.html',
  'english2telugu.csv'
];

// ---
// (3) ఇన్‌స్టాల్ ఈవెంట్ (Install Event)
// ---
// సర్వీస్ వర్కర్ మొదట ఇన్‌స్టాల్ అయినప్పుడు ఇది రన్ అవుతుంది.
// ఇది మన కాష్‌ను తెరిచి, పైన ఉన్న జాబితాలోని అన్ని ఫైల్స్‌ను డౌన్‌లోడ్ చేస్తుంది.
// ---
self.addEventListener('install', event => {
  console.log('[Service Worker] Install event: Caching all files...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching App Shell...');
        // We use addAll(urlsToCache) to cache all files.
        // If any file fails to download, the whole install fails, which is safe.
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] All files cached. Activating immediately.');
        // Forces the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Cache install failed:', error);
      })
  );
});

// ---
// (4) యాక్టివేట్ ఈవెంట్ (Activate Event)
// ---
// ఇన్‌స్టాల్ అయిన వెంటనే ఇది రన్ అవుతుంది.
// ఇది మన కొత్త CACHE_NAME తో సరిపోలని పాత కాష్ ఫైల్స్‌ను శుభ్రపరుస్తుంది (delete చేస్తుంది).
// ---
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event: Cleaning up old caches...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // If the cache name is not our current one, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Now active and claiming clients.');
      // Makes sure the new service worker takes control of all open pages.
      return self.clients.claim();
    })
  );
});

// ---
// (5) ఫెచ్ ఈవెంట్ (Fetch Event)
// ---
// యాప్ నుండి ఏ ఫైల్ రిక్వెస్ట్ వచ్చినా (ఉదా: పేజీ లోడ్, డేటా ఫైల్) ఇది రన్ అవుతుంది.
// ఇది "Cache-First, falling back to Network" పద్ధతిని ఉపయోగిస్తుంది.
// ---
self.addEventListener('fetch', event => {
  event.respondWith(
    // 1. మొదట కాష్ (Cache) లో వెతుకుతుంది.
    caches.match(event.request)
      .then(cachedResponse => {
        // 2. కాష్‌లో దొరికితే, వెంటనే దానిని అందిస్తుంది (ఇది చాలా వేగంగా ఉంటుంది).
        if (cachedResponse) {
          // console.log(`[Service Worker] Serving from Cache: ${event.request.url}`);
          return cachedResponse;
        }

        // 3. కాష్‌లో దొరకకపోతే (బహుశా కొత్త ఫైల్ కావచ్చు),
        //    ఇంటర్నెట్ (Network) నుండి తెచ్చుకోవడానికి ప్రయత్నిస్తుంది.
        console.log(`[Service Worker] Not in cache, fetching from Network: ${event.request.url}`);
        return fetch(event.request).then(networkResponse => {
            // 4. నెట్‌వర్క్ నుండి తెచ్చిన తర్వాత, భవిష్యత్తు కోసం దాన్ని కాష్‌లో సేవ్ చేస్తుంది.
            //    (This is a fallback, but good practice)
            return caches.open(CACHE_NAME).then(cache => {
              // We must clone the response because it can only be consumed once.
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(error => {
            // నెట్‌వర్క్ కూడా విఫలమైతే (ఉదా: ఇంటర్నెట్ లేదు)
            console.error('[Service Worker] Fetch failed from both cache and network:', error);
            // You could return a custom offline fallback page here if you wanted.
          });
      })
  );
});

