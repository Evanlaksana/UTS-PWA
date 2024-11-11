const CACHE_NAME = "TodoList App";
const urlsToCache = [
  "/",
  "/assets/css/styles.css",
  "/assets/img/about.jpg",
  "/assets/img/perfil.png",
  "/assets/img/workl.jpg",
  "/assets/img/work2.jpg",
  "/assets/img/work3.jpg",
  "/assets/img/work4.jpg",
  "/assets/img/work5.jpg",
  "/assets/img/work6.jpg",
  "/assets/js/main.js",
  "/assets/scss/styles.scss",
  "/assets/img/icon-192x192.png",
  "/assets/img/icon-512x512.png",
];

// Install event: PWA
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache:", error);
      })
  );
});

// Activate event: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
      .catch((error) => {
        console.error("Failed to activate:", error);
      })
  );
});

// Fetch event: static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});