importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
var offlineFallbackPage="index.html"
var CACHENAME = "cachestore";
var FILES = [
  "index.html",
  "css/style.css",
  "login.html",
  "css/login.css"
];


self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Permite la navegación precargada si tiene compatibilidad
      // Mira https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Le dice al service worker activo que tome el control inmediato de la página.
  self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("load", () => {
  function handleNetworkChange(event) {
    if (navigator.onLine) {
      document.body.classList.add("offline");
    } else {
      document.body.classList.add("offline");
    }
  }
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
});
