self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    // Add code to cache resources if needed
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
