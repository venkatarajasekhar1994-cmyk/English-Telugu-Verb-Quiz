// service-worker.js

const CACHE_NAME = 'my-pwa-cache-v8'; // <-- BUMP THE VERSION!

const urlsToCache = [
  '/',                     
  'index.html',            
  'gamehub.html',          // CORRECT
  
  // Game File Names (Ensure these match your committed files EXACTLY)
  'Verbs game.html',       
  'English vocabulary game.html', 
  
  // SUPPORTING FILES (CRITICAL)
  'manifest.json',
  
  // EXTERNAL LIBRARIES (Must be listed if used offline)
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js', // <-- ADD THIS
  
  // Note: If you use any local CSS/JS files (e.g., styles/game-main.css), add them here too.
];

// ... rest of your service worker install/fetch logic
