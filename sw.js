/* PISA CBA Khmer — Service Worker for Offline PWA Support */
const CACHE_NAME = 'pisa-cba-khmer-v2026-10-08-learn';

// Pre-cached critical assets
const CORE_ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'css/site.css',
  'css/home.css',
  'css/learn.css',
  'fonts/NotoSansKhmer.woff',
  'fonts/kantumruy-pro-khmer.woff2',
  'fonts/kantumruy-pro-latin.woff2',
  'assets/img/logo.svg',
  'assets/img/frame-certificate.png',
  'katex/katex.min.css',
  'katex/katex.min.js',
  'katex/contrib/auto-render.min.js',
  'js/core.js',
  'js/widgets.js',
  'js/mathtype.js',
  'js/calculator.js',
  'js/main.js',
  'js/visits.js',
  'js/data/book_units.js',
  'js/data/textbook_units.js',
  'js/units/book_scoring.js',
  'js/units/book_units.js',
  'js/units/tutorial.js'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching core offline assets...');
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Core pre-cache item warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', k);
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  // Ignore non-GET and browser extension requests
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;

  // Stale-while-revalidate / Cache-first strategy for static assets
  evt.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        // Fetch in background to update cache
        fetch(req).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
          }
        }).catch(() => {/* offline, use cached */});
        return cached;
      }
      return fetch(req).then((networkRes) => {
        if (!networkRes || networkRes.status !== 200 || networkRes.type !== 'basic') {
          return networkRes;
        }
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        return networkRes;
      }).catch(() => {
        // Fallback for navigation requests
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return caches.match('index.html');
        }
      });
    })
  );
});
