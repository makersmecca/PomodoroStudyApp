//Service Worker for Pomodoro Timer
const OFFLINE_VERSION = "0.2.1";
const CACHE_NAME = "hlfcs" + OFFLINE_VERSION;
const OFFLINE_URL = "fallback.html";
const assets = [
  "/", // Root path
  "/index.html",
  "/static/js/main.bundle.js", // Your main React bundle
  "/manifest.json",
  "fallback.html",
  "Icons/512x512.png",
  "Icons/256x256.png",
  "Icons/192x192.png",
  "Icons/iOS192x192.png",
  "Icons/128x128.png",
  "Icons/64x64.png",
  "Icons/32x32.png",
  "Icons/24x24.png",
  "Icons/16x16.png",
  "Sounds/Binaural.mp3",
  "Sounds/Bonfire.mp3",
  "Sounds/Library.mp3",
  "Sounds/Rain.mp3",
  "Sounds/River.mp3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching offline assets");
        return cache.addAll(assets);
      })
      .catch((error) => console.error("Error caching assets", error))
  );
  self.skipWaiting();
});
// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});
// Fetch event: Serve cached assets, fallback to offline page on failure
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    //navigation requests
    event.respondWith(
      (async () => {
        try {
          // Network fetch
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.error("Network failed; returning offline page", error);
          const cache = await caches.open(CACHE_NAME);
          return await cache.match(OFFLINE_URL);
        }
      })()
    );
  } else {
    //non-navigation requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

self.addEventListener('message', (event) => {
  // console.log(event);
  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data.payload;
    self.registration.showNotification(title, options)
      .catch(err => console.error('Error showing notification:', err));
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  // Focus or open the window when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // If we have a client, focus it
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      // If no client, open new window
      return clients.openWindow('/');
    })
  );
});

