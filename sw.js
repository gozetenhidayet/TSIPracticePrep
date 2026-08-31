/*
 * ScorePath Practice — service worker
 *
 * Deliberately conservative: this only makes the core pages available
 * offline after a first visit. It never caches third-party origins
 * (Desmos, Google Fonts, AdSense, Firebase) so those always stay fresh
 * and a missing network connection to them never breaks the page.
 * Bump CACHE_NAME whenever the cached file list changes so visitors
 * pick up the new version instead of a stale one.
 */
const CACHE_NAME = "scorepath-shell-v2";
const SHELL_FILES = [
  "./index.html",
  "./sat.html",
  "./act.html",
  "./tsia2.html",
  "./teacher-login.html",
  "./teachers.html",
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
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
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
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
