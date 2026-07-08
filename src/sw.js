const CACHE_NAME = 'bagatti-ar-v2';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './bundle.js',
  './manifest.json'
];

// Installazione: salvataggio asset base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(self.skipWaiting())
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Fetch: gestione richieste
self.addEventListener('fetch', event => {
  // Ignora richieste non HTTP o esterne (es. 8th Wall) per evitare problemi di licenza
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(response => {
        // Salva in cache dinamica solo se è un asset utile (immagini, audio, json)
        if (response.status === 200 && (
          event.request.url.includes('/asset/') || 
          event.request.url.includes('/quizbase/') ||
          event.request.url.includes('/image-targets/')
        )) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
