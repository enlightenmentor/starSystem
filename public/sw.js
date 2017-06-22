const mainCacheName = 'STAR-SYSTEM-CACHE';

const filesToCache = [
  'index.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.11/p5.min.js',
  'sketch.js'
];

const cacheFiles = async (cacheName, files) => {
  const cache = await caches.open(cacheName);
  return cache.addAll(files);
};

const deleteOldCaches = async (cacheWhitelist) => {
  const cacheNames = await caches.keys();
  return cacheNames
    .filter(cacheName => cacheWhitelist.indexOf(cacheName) === -1)
    .map(cacheName => caches.delete(cacheName));
};

const fetchResponse = async (cacheName, request) => {
  const cache = await caches.open(cacheName);
  let response = await cache.match(request);
  if (!response) {
    response = await fetch(request);
    if (request.method == 'GET')
      cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('install', event => {
  event.waitUntil(
    cacheFiles(mainCacheName, filesToCache)
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    deleteOldCaches([mainCacheName])
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetchResponse(mainCacheName, event.request)
  )
})