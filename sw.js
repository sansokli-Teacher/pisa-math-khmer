/* PISA CBA Khmer — Service Worker for Offline PWA Support */
const CACHE_NAME = 'pisa-cba-khmer-v2026-10-14-lazy';

// Pre-cached critical assets
const CORE_ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/img/logo.svg",
  "fonts/kantumruy-pro-khmer.woff2",
  "katex/katex.min.css?v=3f94e1b737",
  "css/app.css?v=af4caf0a76",
  "css/site.css?v=d4d815552b",
  "css/home.css?v=adf1c72f8a",
  "css/learn.css?v=20f48e37b9",
  "css/comfort.css?v=54c646fe2d",
  "css/design.css?v=9eb7a7e1f1",
  "css/design-test.css?v=9b9ac186b3",
  "js/core.js?v=06aefeaa76",
  "js/widgets.js?v=e020d17a92",
  "js/mathtype.js?v=cf56913e61",
  "js/calculator.js?v=257fedf43a",
  "js/comfort.js?v=d14582ddb6",
  "js/data/catalog.js?v=d52dc6595f",
  "js/main.js?v=ed13d6c70a",
  "js/visits.js?v=96ec68e49a",
  "fonts/NotoSansKhmer.woff",
  "fonts/KhmerM1.woff",
  "fonts/KhmerOSBattambang.woff",
  "fonts/tinos-latin-400-normal.woff2",
  "fonts/tinos-latin-400-italic.woff2",
  "fonts/tinos-latin-700-normal.woff2",
  "fonts/kantumruy-pro-latin.woff2",
  "assets/img/frame-certificate.png"
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
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isPage) {
    // the page itself: the network first, so a new version is seen at once; the saved copy when there is no connection
    evt.respondWith(
      fetch(req).then((res) => {
        if (res && res.status === 200) { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put('index.html', copy)); }
        return res;
      }).catch(() => caches.match('index.html').then((r) => r || caches.match('./')))
    );
    return;
  }
  // scripts, styles, fonts and pictures: a file with ?v=<hash> never changes, so the saved copy is right; others are
  // refreshed in the background
  const hashed = /[?&]v=[0-9a-f]+/.test(url.search);
  evt.respondWith(
    caches.match(req).then((cached) => {
      if (cached) {
        if (!hashed) fetch(req).then((res) => { if (res && res.status === 200) caches.open(CACHE_NAME).then((c) => c.put(req, res)); }).catch(() => {});
        return cached;
      }
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
        return res;
      });
    })
  );
});
