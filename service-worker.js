// service-worker.js

// -------------------------------------------------------------------------
// --- UNINSTALL SCRIPT (v-uninstall) ---
// -------------------------------------------------------------------------
// This file's ONLY job is to "uninstall" the old, broken service worker
// and delete all of its caches. This will force all browsers to
// download the new files from the server.
// -------------------------------------------------------------------------

// --- INSTALL ---
// Force this new worker to become active immediately.
self.addEventListener('install', event => {
  console.log('[Service Worker] Install (UNINSTALLER): Forcing activation.');
  self.skipWaiting();
});

// --- ACTIVATE & CLEANUP ---
// This is the most important part.
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate (UNINSTALLER): Deleting all caches.');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // 1. Delete every cache we find.
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('[Service Worker] Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // 2. Take control of all open pages.
      console.log('[Service Worker] (UNINSTALLER): Claiming clients.');
      return self.clients.claim();
    }).then(() => {
      // 3. UNREGISTER ourselves. We are done.
      console.log('[Service Worker] (UNINSTALLER): Unregistering itself.');
      self.registration.unregister();
    })
  );
});

// --- FETCH ---
// Do not serve anything from cache. Go directly to the network.
self.addEventListener('fetch', event => {
  // console.log('[Service Worker] (UNINSTALLER): Bypassing cache, fetching from network.');
  event.respondWith(fetch(event.request));
});

