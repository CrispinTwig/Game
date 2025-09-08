const CACHE_NAME = 'pwa-cache-v0.0'; // increment on each deploy
const urlsToCache = [
    '/',
    '/main.js',
    '/main.css',
    '/icon.png',
    // add other static assets like CSS/images here
];

// Install: cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .catch(err => console.error('Cache install failed:', err))
    );

    // Only skip waiting in production (not localhost)
    if (self.location.hostname !== 'localhost') {
        self.skipWaiting();
    }
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );

    if (self.location.hostname !== 'localhost') {
        self.clients.claim();
    }
});

// Fetch: network-first for HTML, cache-first for assets
self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.mode === 'navigate') {
    // Network-first for HTML pages
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response && response.status === 200) {
                        caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
                    }
                    return response;
                })
                .catch(() => caches.match(request).then(cached => cached || caches.match('/offline.html')))
        );
    } else {
    // Cache-first for assets
        event.respondWith(
            caches.match(request).then(cached => cached || fetch(request))
        );
    }
});
