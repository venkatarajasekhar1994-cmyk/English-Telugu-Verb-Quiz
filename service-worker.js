// service-worker.js

// **CRITICAL:** CHANGE THE CACHE VERSION (e.g., to v7 or v8)
const CACHE_NAME = 'my-pwa-cache-v7'; 

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

// ... rest of your service worker install/fetch logic


