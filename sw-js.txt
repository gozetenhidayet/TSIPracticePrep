/*
 * TSI Practice Prep — Service Worker v4
 *
 * v4 fully removes the class of bug behind "About/Terms/Privacy/Contact
 * opens SAT Practice": v3 still had one last-resort case where a failed
 * navigation to an uncached page fell back to the cached index.html. Since
 * the homepage remembers the visitor's last-viewed exam tab, that could
 * look exactly like the wrong page opening. v4 never does this — a failed
 * navigation to a page with nothing cached gets a real, honest "you're
 * offline" page instead, never another page's content.
 *
 * - Network first, exact-page cache second, never a different page's cache.
 * - Only successful (res.ok) same-origin responses are ever cached — a
 *   404/error response is never stored and can never later be served as if
 *   it were a different, working page.
 * - Old scorepath-shell-* caches are deleted on activation.
 * - Registered from index.html as /sw.js?v=4 with updateViaCache:'none' so
 *   a returning visitor's browser can't keep serving an old cached copy of
 *   this very script out of its own (separate from the Cache API) HTTP
 *   cache — that was a real gap in how v3 was registered.
 */
const CACHE_NAME = "scorepath-shell-v4";

const CORE_PAGES = [
  "./",
  "./index.html",
  "./sat.html",
  "./act.html",
  "./tsia2.html",
  "./teacher-login.html",
  "./teachers.html",
  "./teacher-resources.html",
  "./about.html",
  "./terms.html",
  "./privacy.html",
  "./contact.html",
  "./disclaimer.html",
  "./editorial-standards.html",
  "./resources.html",
  "./graduation-guide.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of CORE_PAGES) {
        try {
          const res = await fetch(url, { cache: "reload" });
          if (res && res.ok) await cache.put(url, res.clone());
        } catch (_) {
          // A single unavailable file must not block SW installation.
        }
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("scorepath-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function offlinePage() {
  return new Response(
    `<!doctype html>
     <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width,initial-scale=1">
       <meta name="robots" content="noindex">
       <title>Offline | TSI Practice Prep</title>
       <style>
         body{font-family:system-ui,-apple-system,Segoe UI,sans-serif;margin:0;
              min-height:100vh;display:grid;place-items:center;background:#f8fafc;color:#0f172a}
         main{max-width:560px;padding:32px;text-align:center}
         a{display:inline-block;margin-top:16px;padding:11px 16px;border-radius:10px;
           background:#2563eb;color:#fff;text-decoration:none;font-weight:800}
       </style>
     </head>
     <body><main>
       <h1>You&rsquo;re offline</h1>
       <p>This page is not cached yet. Reconnect and try again.</p>
       <a href="/">Back to TSI Practice Prep</a>
     </main></body></html>`,
    { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // never touch third-party requests

  event.respondWith(
    fetch(req)
      .then((res) => {
        // Cache only valid responses. Never cache 404s or error pages --
        // an error response must never later be served in place of a
        // different, real page.
        if (res && res.ok && res.type !== "opaque") {
          const copy = res.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(req, copy))
            .catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        // Exact request match only -- never any other page's cached entry.
        const cached = await caches.match(req, { ignoreSearch: false });
        if (cached) return cached;

        if (req.mode === "navigate") {
          // A version-querystring URL may differ from the plain cached
          // entry for the same page; try that once, still same page only.
          const clean = new Request(url.origin + url.pathname, {
            method: "GET",
            headers: req.headers,
            mode: "same-origin",
            credentials: "same-origin",
            redirect: "follow"
          });
          const exactPath = await caches.match(clean);
          if (exactPath) return exactPath;
          // Nothing cached for this page at all -- an honest offline
          // notice, never another page's content.
          return offlinePage();
        }

        return Response.error();
      })
  );
});
