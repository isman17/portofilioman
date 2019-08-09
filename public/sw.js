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
    './img/project/helpdesk.png',
    './img/project/inventory.png',
    './img/project/server-inventory.png',
    './img/project/mybook.png',
    './img/project/siklinik.png',
    './js/jskita.js',
    './index.html',
    './about.html',
    './contact.html',
    './project.html',
    './progress.html'
];

// self.addEventListener("install", function(event) {
//     event.waitUntil(
//         cacheNames.open(cacheNameName)
//         .then(function(cacheName){
//             cacheName.addAll(nudicacheName)
//         })
//         .then(self.skipWaiting())
//     );
// });

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     cacheNames.keys().then(function(cacheNameNames) {
//       return Promise.all(
//         cacheNameNames.map(function(cacheNameName) {
//           if (cacheNameName.startsWith('pages-cacheName-') && staticcacheNameName !== cacheNameName) {
//             return cacheNames.delete(cacheNameName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         cacheNames.match(event.request)
//         .then(function(respon){
//             if (respon) {
//                 return respon;
//             }
//             return fetch(event.request);
//         })
//     );
// });
// ================

self.addEventListener("install", function (event) {
  console.log("[Portofilioman] Install Event processing");

  console.log("[Portofilioman] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then(function (cacheName) {
      console.log("[Portofilioman] Caching pages during install");
      return cacheName.addAll(nudicache);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("[Portofilioman] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cacheName and serve it from there first
self.addEventListener("fetch", function (event) { 
  if (event.request.method !== "GET") return;

  event.respondWith(
    fromcacheName(event.request).then(
      function (response) {
        // The response was found in the cacheName so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updatecacheName(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cacheName so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cacheName
            event.waitUntil(updatecacheName(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            console.log("[Portofilioman] Network request failed and no cacheName." + error);
          });
      }
    )
  );
});

function fromcacheName(request) {
  // Check to see if you have it in the cacheName
  // Return response
  // If not in the cacheName, then return
  return caches.open(cacheNameName).then(function (cacheName) {
    return caches.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updatecacheName(request, response) {
  return caches.open(cacheName).then(function (cacheName) {
    return caches.put(request, response);
  });
}
