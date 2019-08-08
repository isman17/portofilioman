var cacheName = "Portofilioman";
var nudicache = [
    './manifest.json',
    './css/csskita.css',
    './img/logo.png',
    './img/icons/favicon-32x32.png',
    './img/icons/apple-touch-icon.png',
    './img/icons/safari-pinned-tab.svg',
    './img/icons/android-chrome-192x192.png',
    './img/icons/android-chrome-256x256.png',
    './img/icons/mstile-144x144.png',
    './js/jskita.js',
    './index.html',
    './about.html',
    './contact.html',
    './project.html',
    './progress.html'
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