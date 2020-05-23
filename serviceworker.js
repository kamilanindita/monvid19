var CACHE_NAME = 'my-site-cache-v3';
var urlsToCache = [
  '/',
  '/fallback.json',
  '/manifest.json',
  '/css/bootstrap.min.css',
  '/css/header.css',
  '/css/footer.css',
  '/css/timeline.css',
  '/js/main.js',
  '/js/jquery-3.4.1.js',
  '/js/bootstrap.js',
  '/js/bootstrap.min.js',
  '/js/popper.min.js',
  '/images/about.png',
  '/images/global.jpg',
  '/images/indo.jpg',
  '/images/icon.png',
  '/images/logo.png',
  '/images/logo-covid19api.png',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('in install serviceWorker...Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {

  var request = event.request
  var url     = new URL(request.url)

  //memisahkan request api dan internet
  if(url.origin === location.origin){
    event.respondWith(
      caches.match(request).then(function(response){
        return response || fetch(request)
      })
    );
  }else {
    event.respondWith(
      caches.open('data-cache').then(function(cache){
        return fetch(request).then(function(liveResponse){
          cache.put(request, liveResponse.clone())
          return liveResponse
        }).catch(function(){
          return caches.match(request).then(function(response){
            if(response) return response
            return caches.match('/fallback.json')
          })
        })
      })
    )
  }

});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }).map(function(cacheName){
          return caches.delete(cacheName)
        })
      );
    })
  );
});
