/* I sourced the following information from
https://developers.google.com/web/fundamentals/primers/service-workers/
*/

// Cache name
const cacheName = 'restaurant';

// Files to cache:
const cacheAssets = [
	'/',
	'./index.html',
	'./restaurant.html',
	'./css/styles.css',
	'./js/main.js',
	'./js/dbhelper.js',
	'./js/restaurant_info.js',
  './data/restaurants.json',
	'./img/1.jpg',
	'./img/2.jpg',
	'./img/2.jpg',
	'./img/4.jpg',
	'./img/5.jpg',
	'./img/6.jpg',
	'./img/7.jpg',
	'./img/8.jpg',
	'./img/9.jpg',
	'./img/10.jpg',
];

// This will cache the assests listed above in 'CacheAssests'
self.addEventListener('install', function (evt) {
	evt.waitUntil(
		caches
		.open(cacheName)
		.then((cache) => {
			console.log('Service Worker: Caching Assets');
			return cache.addAll(cacheAssets);
		})
	);
});

// This will remove older caches and use the new cache
self.addEventListener('activate', function (evt) {
	evt.waitUntil(
		caches
		.keys()
		.then((cacheNames) => {
			return Promise.all(
				cacheNames.filter(function (thisCacheName) {
					return cacheName.startsWith('restaurant') &&
						thisCacheName != cacheName;
						console.log('Working: Removing Outdated Caches from the following', thisCacheName );
				})
				.map(function (cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', (evt) => {
	evt.respondWith(
		caches.match(evt.request)
		.then((response) => {
			// Return cached version or fetch
			return response || fetch(evt.request);
		})
	);
})
