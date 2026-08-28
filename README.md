# ScorePath Practice

Free, original SAT / ACT / TSIA2 practice: skill-tagged questions with full explanations, mistake-pattern analysis (concept gap, process error, reading trap, pacing/guess), pacing tools, a Teacher Classroom for live in-class sessions with roster and error analytics, and an optional student account for cross-device sync.

V20 focused on clearer navigation, a simplified header, direct exam selection, a redesigned Teacher Classroom, and 6-character alphanumeric class codes.

## What this pass fixed and added

This repository came in as a "GitHub ready" export with a few gaps that would have broken it on a real static host. This pass closed those and layered on the pieces needed to run the site professionally, monetize it, and get it indexed:

**Fixed a real bug that broke most of the site.** `index.html` had two `$("heroTimed").onclick=...` calls targeting an element ID that doesn't exist anywhere in the page. Because that line lived inside a large inline `<script>` block, the resulting `TypeError` aborted the rest of that script — silently skipping the `satStore`/`satState`/`actStore`/`actState` declarations and everything after them. That, in turn, is why the SAT/ACT dashboards, mistake history, goal ring, and focus-lock features threw `is not defined` errors at runtime. Fixed with a small null-safe `safeClick()` helper; verified with Playwright that all pages now load with zero console errors.

**Fixed a second, separately-hidden bug in Teacher Classroom.** `teachers.html` read and wrote a `securityEvents` array (for the Secure Timed Mode activity log) that was never declared anywhere. Every call to `renderAll()` — including the one that runs immediately on page load — threw `securityEvents is not defined` partway through `renderRoster()`, which silently skipped `renderOverview()`, `renderQuestions()`, `renderStudentsTab()`, and `renderSkills()` every single time. In practice this meant the Overview, Questions, Students, and Skills analytics tabs never populated, ever — the single biggest feature this platform has over a plain question-answering site was completely non-functional. Fixed by declaring `securityEvents=[]` alongside the other session state. Verified end-to-end with two real browser tabs (a teacher room + a student joining, answering, and finishing): roster sync, live progress, and all four analytics tabs now populate correctly.

**Made a defensive console wrapper (`spConsole`).** Some embedding/preview contexts run pages inside a sandboxed `<iframe>` with a restricted `console` shim that only implements a subset of the real console API. This page called `console.info(...)` in three places (bank-size diagnostics) and `console.error(...)` in one; in an environment where `console.info` isn't a function, that throws and can abort a script block the same way the `heroTimed` bug did. All four calls now go through `spConsole(method, ...)`, which checks the method exists before calling it and silently no-ops instead of throwing if it doesn't. Verified by simulating a restricted console (only `log`/`warn`/`error`, no `info`) in Playwright — zero errors.

**Added real Open Graph / Twitter Card images and an Apple touch icon.** `index.html`, `sat.html`, `act.html`, `tsia2.html`, and `teachers.html` had no `og:image` at all, so a link shared in Slack, iMessage, or Twitter/X would render as a bare title with no preview image, and "Add to Home Screen" on iOS (outside the PWA manifest flow) had no icon to use. Generated `og-image.png` (1200×630, on-brand) and wired up `og:image`, `og:url`, `og:site_name`, `twitter:image`, and `twitter:card=summary_large_image` on all five pages, plus `<link rel="apple-touch-icon">`.

**Added the five files `index.html` and the account/classroom pages already referenced but that weren't in the export:**
- `firebase-config.js` — empty by default (`window.SCOREPATH_FIREBASE_CONFIG = null`); cloud sync stays off until you fill in a real Firebase project config.
- `sync-engine.js` — implements `window.ScorePathSync` (student account sign-in/create/device-only mode). Throws a clear, honest error if you try to sign in before Firebase is configured, rather than pretending to create an account.
- `realtime-adapter.js` — implements `window.ScorePathRealtime` for Teacher Classroom. Defaults to `BroadcastChannel` (same-browser, tab-to-tab local demo — exactly what FIREBASE-SETUP.md already documented as the intended fallback); switches to Firebase Realtime Database automatically once a real config is present.
- `manifest.webmanifest` + `icons/icon-192.png` + `icons/icon-512.png` — real PWA icons (generated, not placeholders) so "Add to Home Screen" works.
- `sw.js` — a conservative service worker: caches only same-origin pages for offline access, never touches third-party requests (Desmos, Firebase, AdSense, fonts), and always fetches fresh over cache.
- `favicon.svg` / `app-icon.svg` — the site linked to both filenames; both now exist with the same brand mark.

**Wired up real, consent-gated Google AdSense.** The CSS already had `.adSlot` / `.adZone` placements hidden by default and only revealed via an `.ads-enabled` class that nothing ever set — the plumbing existed but nothing was connected. Added:
- A cookie-consent banner (bottom of `index.html`) — ads and any related cookies only load after a visitor clicks Accept; declining or ignoring it keeps the visit ad-free. A "Cookie Preferences" link in the footer reopens it anytime.
- `ADSENSE_CLIENT_ID` / `ADSENSE_AD_SLOTS` config placeholders (search `scorepath-adsense-consent` in `index.html`) — empty until you fill them in, so no fake or placeholder ad ever shows to a real visitor.
- `ads.txt` at the repo root.
- Ads still never show during an actual practice session — the existing `.exam-running` rule (unchanged) already guarantees that, and this pass confirmed it's genuinely wired to a live `MutationObserver`, not dead CSS.

**Added `robots.txt` and `sitemap.xml`.** The sitemap lists the real public pages and excludes `teacher-login.html`, `student-account.html`, and `student-room.html` (already marked `noindex,nofollow` in their own `<meta>` tags).

**Built the 8 pages the footer nav already linked to but that didn't exist:** `about.html`, `contact.html`, `disclaimer.html`, `editorial-standards.html`, `graduation-guide.html`, `privacy.html`, `resources.html`, `terms.html`. Content was written to match what `index.html` already promises elsewhere on the site (the Trust/Quality Center section, the Accuracy Standards section, `QUESTION-BANK-QUALITY.md`) rather than inventing new claims. `sat.html`, `act.html`, and `tsia2.html` footers now link to all of these too, plus a shared favicon.

**Made the cookie-consent banner work on every page, not just `index.html`.** Previously only the homepage had a working banner; every other page either had none or a dead footer link. Added `consent-banner.js`, a single self-installing script (injects its own CSS, the banner markup, and the "Cookie Preferences" reopen link into whatever footer a page has, or a small fixed corner link on pages with no footer) that shares the same `localStorage` key as `index.html`'s own banner, so a visitor's choice is honored consistently site-wide. Wired into `sat.html`, `act.html`, `tsia2.html`, `teachers.html`, `teacher-login.html`, `student-account.html`, `student-room.html`, and all 8 info pages. `index.html` keeps its own original inline banner (already tied directly to its AdSense activation code) rather than being swapped over, to avoid ID collisions. Verified with Playwright on a representative page from each family: banner shows on first visit, Accept hides it and persists the choice, and the footer's "Cookie Preferences" link reopens it.

**Added an explicit back button to every page except the homepage.** `sat.html`, `act.html`, `tsia2.html`, and the 8 info pages now show "← Back to ScorePath Practice" in the hero; `teacher-login.html` and `student-account.html` already had one and were left as-is; `student-room.html` (the classroom join screen) had none and now does too. Verified with Playwright across all 15 non-home pages.

**Replaced the placeholder `contact.html` mailto link with a real contact form that never exposes an email address.** The old page displayed `support@scorepathpractice.com` directly in the HTML (copyable and scrapeable) and did nothing but open the visitor's own mail client. The new page is a real form (name, email, topic, message, honeypot spam field) that POSTs via `fetch()` to [Web3Forms](https://web3forms.com), a service built exactly for this: the site owner gets a public "access key" tied to a verified inbox, and that key can only submit messages *to* that inbox — it cannot be used to read it, so nothing sensitive is exposed even though the key sits in view-source. No email address appears anywhere in `contact.html`'s HTML or JS. Until a real key is pasted in, the form shows an honest "not connected yet" message instead of silently failing or pretending to send — see "Turning on the contact form" below for the one-minute setup. Verified with Playwright: submitting with the placeholder key shows the correct error state, and no `support@`-style string appears anywhere in the page source.

## Recommended next steps for performance, brand, and quality

Not done in this pass, but worth doing before or shortly after launch, roughly in priority order:

1. **Split `index.html` into smaller loaded chunks or defer non-critical scripts.** The file is ~500KB of inline HTML/CSS/JS in one document — everything (SAT engine, ACT engine, TSIA2 engine, Teacher tools, the 5,000-item generated bank) loads and runs on every visit even if a student only ever touches one exam. Lazy-loading the practice engines per-exam, or at minimum moving script execution to `defer`, would measurably improve first paint on slower connections.
2. **Real per-page OG images**, not one shared image for every page — a SAT-specific vs. ACT-specific vs. Teacher-specific preview card reads better when a link is shared.
3. **Build the `skills/*.html` pages** (see Known gaps) — real content there is also real long-tail SEO surface area that's currently just internal dead links.
4. **A real, monitored contact address** in place of the `support@scorepathpractice.com` placeholder, and a `terms.html` reviewed by an actual lawyer given the site handles student data and classroom monitoring.
5. **Lighthouse / PageSpeed pass** once hosted on the real domain — the animation and gradient-heavy CSS is unlikely to cause problems, but it's worth checking Cumulative Layout Shift specifically around the sticky header and the scroll-reveal (`revealV5`) sections.
6. **A short "Brand" style guide** (exact hex values, logo usage, the "S" mark do's/don'ts) once this becomes a real, marketed product — right now the brand mark exists (favicon, PWA icons, OG image) but isn't documented anywhere for a second designer to pick up consistently.

## Known gaps (not fixed in this pass)

- **`skills/*.html` pages.** `sat.html`, `act.html`, and `tsia2.html` each link to 6–8 individual skill pages (e.g. `skills/sat-algebra.html`) that don't exist yet. Left out intentionally rather than rushed — each one deserves real, specific written content, not a templated stub.
- **`contact.html`'s form** needs a real Web3Forms access key pasted in before it can actually deliver messages — see "Turning on the contact form" below. Until then it correctly tells visitors it isn't connected yet, rather than pretending to work.
- **Firebase and Google AdSense are both still unconfigured by design.** See "Turning on cloud sync" and "Turning on ads" below — this project intentionally ships with honest placeholders instead of fabricated credentials.
- **`terms.html`** is a plain-language starting point, not a lawyer-reviewed document — the page says so.

## Turning on cloud sync (Firebase)

1. Create a Firebase project + Web App, enable Authentication (Email/Password + Anonymous) and Firestore (student sync) and/or Realtime Database (classroom sync).
2. Paste your Web App config into `firebase-config.js`.
3. Replace development database rules with production rules that limit teachers to rooms they own and students to rooms they joined (see `FIREBASE-SETUP.md`).
4. Test with two separate browsers/devices before launch. `ScorePathRealtime.isCloudSynced` and `ScorePathSync.configured` let you confirm which mode is active from the console.

## Turning on ads (Google AdSense)

1. Get your site approved for [Google AdSense](https://adsense.google.com) (needs a live, real domain — see "Going live" below).
2. In `index.html`, find `ADSENSE_CLIENT_ID` and `ADSENSE_AD_SLOTS` (search for `scorepath-adsense-consent`) and fill in your publisher ID and the slot IDs for the `hub`, `trust`, and `teacherTools` placements.
3. Replace `ads.txt` with the real snippet AdSense gives you.
4. Ads activate automatically for visitors who accept the cookie banner; nothing changes for visitors who decline.

## Turning on the contact form (Web3Forms)

`contact.html` ships with a real, working contact form — it just isn't connected to an inbox yet, on purpose, so no fake submissions ever silently vanish and no fabricated address is ever shown.

1. Go to [web3forms.com](https://web3forms.com) and enter the email address you want messages delivered to. No account or password is needed — you just verify that inbox once.
2. Web3Forms emails you a public **access key** instantly.
3. Open `contact.html`, find the hidden input `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY">`, and replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key you were emailed.
4. That's it — submissions now arrive in your inbox as an email. The access key is safe to leave visible in the page source: it can only be used to *send* a form submission to your verified address, never to read your inbox or send arbitrary email, and it is not your email address itself.
5. Optional hardening once you have a real domain: in the Web3Forms dashboard you can restrict the key to only accept submissions from `scorepathpractice.com`, and add a reCAPTCHA/Turnstile key for extra spam protection (the built-in honeypot field already blocks basic bots).

Until step 3 is done, visitors who submit the form see an honest "This form is not connected yet" message instead of a fake success confirmation.

## Setting up Google Search Console

1. Add your property in [Search Console](https://search.google.com/search-console) and verify ownership (HTML file or meta tag method both work on a static host).
2. Submit `sitemap.xml`.
3. Build out the `skills/*.html` pages (see "Known gaps") if you want those specific skill queries to rank — right now they're only internal links, not indexed pages.

## Going live checklist

- Every page uses `https://scorepathpractice.com` as its canonical/OG domain already — point your real DNS at this domain, or do a project-wide replace if you're using a different one.
- Paste a real Web3Forms access key into `contact.html` (see "Turning on the contact form" above) so messages actually reach you.
- Fill in Firebase and AdSense config as above.
- Add a `CNAME` file at the repo root if hosting on GitHub Pages with a custom domain.

## Running it locally

Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Disclaimer

ScorePath Practice is an independent educational practice resource. It is not affiliated with, endorsed by, or sponsored by the College Board, ACT, Inc., or the Texas Higher Education Coordinating Board. All practice questions are original. Practice results are for learning purposes only and are not official test scores. See `disclaimer.html` for the full statement.
