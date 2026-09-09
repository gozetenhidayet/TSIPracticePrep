/*
 * TSI Practice Prep — service worker
 *
 * Deliberately conservative: this only makes the core pages available
 * offline after a first visit. It never caches third-party origins
 * (Desmos, Google Fonts, AdSense, Firebase) so those always stay fresh
 * and a missing network connection to them never breaks the page.
 * Bump CACHE_NAME whenever the cached file list changes so visitors
 * pick up the new version instead of a stale one.
 *
 * v3 fixes a real bug: the fetch handler used to fall back to the cached
 * index.html for ANY failed same-origin request of ANY type (script,
 * image, or a page navigation) whenever the exact URL wasn't already in
 * the cache. About/Terms/Privacy/Contact (and every other page outside
 * the old, short SHELL_FILES list) were never pre-cached, so a routine
 * dropped connection while tapping one of those footer links -- common
 * on mobile -- silently served the cached homepage's markup instead,
 * with the address bar showing the tapped page's URL. Since the
 * homepage remembers the visitor's last-viewed exam tab, this looked
 * exactly like "About/Terms/Privacy/Contact just reopens SAT Practice."
 * Fixed by (1) caching every core content page up front so this almost
 * never needs a fallback at all, and (2) only ever falling back to the
 * app shell for an actual page navigation, never for a script/style/
 * image/fetch -- those now correctly fail instead of silently getting
 * replaced with unrelated HTML.
 */
const CACHE_NAME = "scorepath-shell-v3";
const SHELL_FILES = [
  "./index.html",
  "./sat.html",
  "./act.html",
  "./tsia2.html",
  "./teacher-login.html",
  "./teachers.html",
  "./about.html",
  "./terms.html",
  "./privacy.html",
  "./contact.html",
  "./disclaimer.html",
  "./editorial-standards.html",
  "./resources.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        SHELL_FILES.map((url) => cache.add(url).catch(() => {}))
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch third-party requests

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          // Nothing cached for this exact request. Only a real page
          // navigation may fall back to the app shell as a last resort
          // (standard offline-PWA behavior) -- a failed script, style,
          // image, or API call must stay a real failure, never get
          // silently swapped for unrelated homepage HTML.
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        })
      )
  );
});
