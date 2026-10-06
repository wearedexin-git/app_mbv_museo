// Il segnaposto BUILD_ID (tra doppi underscore) viene sostituito da webpack a ogni build (config/webpack.config.js):
// cambia il contenuto di sw.js, quindi il browser installa il nuovo SW e
// l'app shell (index.html + bundle) si aggiorna senza bump manuali.
const SHELL_CACHE = 'bagatti-ar-shell-__BUILD_ID__';
// Cache dei contenuti (immagini, audio, quiz, image target). Nome stabile e
// condiviso con src/pwa-precache.ts, così i download restano tra un deploy e
// l'altro. Cambiarlo solo per forzare il ri-download di tutti i contenuti.
const ASSET_CACHE = 'bagatti-ar-v5';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './bundle.js?v=__BUILD_ID__',
  './manifest.json'
];

// Installazione: salvataggio asset base
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Attivazione: pulizia vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => Promise.all(
        cacheNames
          .filter(name => name !== SHELL_CACHE && name !== ASSET_CACHE)
          .map(name => caches.delete(name))
      ))
      // Le versioni precedenti salvavano l'app shell in ASSET_CACHE: va tolta,
      // altrimenti caches.match() potrebbe restituire un index.html vecchio.
      .then(() => caches.open(ASSET_CACHE))
      .then(cache => cache.keys().then(requests => Promise.all(
        requests
          .filter(req => !/\/(asset|quizbase|image-targets)\//.test(new URL(req.url).pathname))
          .map(req => cache.delete(req))
      )))
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
          caches.open(ASSET_CACHE).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});
