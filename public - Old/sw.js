var cacheName = "Hii";
var nudicache = [
    './manifest.json',
    './css/csskita.css',
    './images/favicon.ico',
    './images/logo.png',
    './images/apple-touch-icon.png',
    './images/safari-pinned-tab.svg',
    './images/icons/android-chrome-192x192.png',
    './images/icons/mstile-144x144.png',
    './js/jskita.js',
    './index.html',
    './about.html',
    './contact.html'
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache){
            cache.addAll(nudicache)
        })
        .then(self.skipWaiting())
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(respon){
            if (respon) {
                return respon;
            }
            return fetch(event.request);
        })
    );
});