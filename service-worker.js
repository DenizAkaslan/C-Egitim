// =========================================================
// ÇİMENTO TEKNİK EĞİTİMLERİ — Service Worker
// Uygulama kabuğunu (app shell) önbelleğe alır, dokümanları
// önce ağdan, olmadığında önbellekten sunar.
// =========================================================
var CACHE_NAME = "cimento-pwa-v1";

var APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./data.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) { return caches.delete(key); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  var url = new URL(event.request.url);
  var isDynamicContent = url.pathname.endsWith("data.json") || url.pathname.indexOf("/docs/") !== -1;

  if (isDynamicContent) {
    // Network-first: yeni eklenen dokümanlar / güncellemeler hemen görünsün.
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
          return response;
        })
        .catch(function () { return caches.match(event.request); })
    );
  } else {
    // Cache-first: uygulama kabuğu (arayüz dosyaları) hızlı ve çevrimdışı çalışsın.
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        return cached || fetch(event.request);
      })
    );
  }
});
