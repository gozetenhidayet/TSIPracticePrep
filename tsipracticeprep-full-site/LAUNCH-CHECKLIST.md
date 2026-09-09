# TSI Practice Prep — GitHub, Domain DNS, Search Console, Analytics & AdSense Checklist

This is the step-by-step setup for the five things needed to take TSI
Practice Prep from "code in a folder" to "live, findable, and (eventually)
monetized site." Everything code-side that could be prepared in advance —
config placeholders, consent-gated loaders, a deploy workflow — is already
done (see "What's already wired up" at the end of each section). What's
left in each section requires YOUR own account/login at that provider —
nobody else can do that step for you, including an AI assistant with no
access to your Google/GitHub/registrar accounts. Once you have the values
noted in **bold** below, send them back and they'll be wired into the code
in one pass.

## 1. GitHub

**Already done locally:** this folder is already a git repository with full
commit history. A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`)
is ready to auto-deploy the static site to GitHub Pages on every push to
`main`/`master`, and a `.nojekyll` file is in place so GitHub Pages serves
every file as-is (Jekyll's default processing would otherwise ignore files
starting with `_`, like `_redirects`).

**What you do:**
1. Create a new, empty repository at https://github.com/new (do **not**
   initialize it with a README, .gitignore, or license — this folder
   already has all of that; an empty remote avoids a merge conflict on
   first push).
2. Copy the repository's URL (the "…or push an existing repository"
   section on the empty repo's page gives you the exact commands, but
   here's the general form):
   ```
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
   Run these from inside this project folder.
3. In the new repo's **Settings > Pages**, under "Build and deployment,"
   set **Source** to **GitHub Actions**. The workflow above will then run
   automatically on this first push (and every push after) and publish the
   site.
4. Still in **Settings > Pages**, under "Custom domain," enter
   `tsipracticeprep.com` and save — this writes the `CNAME` file's value
   into GitHub's Pages config (the `CNAME` file already in this repo does
   the same thing, so this should just confirm what's already there).
   Check "Enforce HTTPS" once it becomes available (can take a few minutes
   to an hour after DNS is pointed correctly — see section 2).

## 2. Domain DNS (pointing tsipracticeprep.com at GitHub Pages)

**What you do**, at whichever registrar/DNS provider tsipracticeprep.com is
registered with (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.) — in
that provider's DNS management screen for the domain:

- Add **four A records** for the root/apex domain (host `@` or blank,
  depending on the provider's UI) pointing to GitHub Pages' IP addresses:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- Optionally, add a **CNAME record** for `www` pointing to
  `<your-username>.github.io` (with the trailing dot some providers
  require: `<your-username>.github.io.`) if you also want
  `www.tsipracticeprep.com` to work and redirect to the root domain.
- Remove any existing A/CNAME record for `@` (or `www`) that points
  somewhere else first — you can't have two conflicting records for the
  same host.
- DNS changes can take anywhere from a few minutes to 24-48 hours to fully
  propagate worldwide, even though they often work within minutes. If
  GitHub Pages' "Enforce HTTPS" checkbox stays greyed out, it's almost
  always still waiting on DNS/certificate provisioning — wait and recheck
  rather than changing anything.
- If you're using Cloudflare specifically: set the DNS records' proxy
  status to "DNS only" (grey cloud, not orange) at least until GitHub's
  HTTPS certificate has provisioned, or GitHub's own domain-verification
  can fail.

You can verify propagation yourself anytime with:
```
dig +short tsipracticeprep.com
```
(should eventually return the four IPs above).

## 3. Google Search Console

**Already done code-side:** `index.html` has a ready, currently-commented-out
verification meta tag near the top of `<head>`:
```html
<!-- <meta name="google-site-verification" content="REPLACE_WITH_YOUR_REAL_VERIFICATION_CODE"> -->
```

**What you do:**
1. Go to https://search.google.com/search-console and add a property for
   `https://tsipracticeprep.com` (use the "URL prefix" property type, not
   "Domain," so it matches exactly what's live).
2. Choose the **HTML tag** verification method. Google gives you a
   `<meta name="google-site-verification" content="...">` tag with a real
   code.
3. Send me that real `content="..."` value (or edit it yourself): uncomment
   the line above in `index.html` and replace
   `REPLACE_WITH_YOUR_REAL_VERIFICATION_CODE` with it.
4. Push/deploy that change, then click "Verify" in Search Console.
5. Once verified, submit the sitemap: in Search Console's left nav, go to
   **Sitemaps**, and submit `sitemap.xml` (the file already exists at
   `https://tsipracticeprep.com/sitemap.xml` and is already referenced from
   `robots.txt`).

## 4. Google Analytics (GA4)

**Already done code-side:** both `index.html` and `consent-banner.js` (the
file every other page loads) have a `GA_MEASUREMENT_ID` placeholder and a
consent-gated `activateAnalytics()` function — Analytics only loads after a
visitor clicks "Accept" on the cookie banner (or already had, from a
previous visit), exactly like the existing AdSense loader, and never before.
IP addresses are anonymized (`anonymize_ip: true`).

**What you do:**
1. Go to https://analytics.google.com, create an account (if you don't
   have one) and a new **GA4 property** for TSI Practice Prep.
2. Add a **Web** data stream for `https://tsipracticeprep.com`.
3. Copy the **Measurement ID** it gives you — looks like `G-XXXXXXXXXX`
   (Admin > Data Streams > your web stream).
4. Send me that ID (or edit it yourself): replace the empty
   `var GA_MEASUREMENT_ID = "";` in **both** `index.html` (search for
   `scorepath-adsense-consent`) and `consent-banner.js` with
   `var GA_MEASUREMENT_ID = "G-XXXXXXXXXX";` (your real ID, same value in
   both places).
5. Push/deploy. Traffic will start appearing in GA4's Realtime report
   within a few minutes of the first visitor who accepts cookies.

## 5. Google AdSense

**Already done code-side:** `ADSENSE_CLIENT_ID` placeholders and the whole
consent-gated ad-loading/slot-filling system already exist in `index.html`
and `consent-banner.js`; `ads.txt` has clear replace-this-line instructions
already in a comment.

**What you do:**
1. Go to https://www.google.com/adsense and apply with
   `https://tsipracticeprep.com` (the site needs to be live and reachable
   first — steps 1-2 above — before Google can review it).
2. Google's review can take anywhere from about a day to a few weeks. It
   commonly asks for original content and clear navigation, both of which
   this site already has.
3. Once approved, go to **Sites** in your AdSense account, click your
   site, and copy the **Publisher ID** — looks like `ca-pub-1234567890123456`.
4. Send me that ID (or edit it yourself): replace the empty
   `var ADSENSE_CLIENT_ID = "";` in **both** `index.html` and
   `consent-banner.js` with your real `ca-pub-...` value (same value in
   both places), and replace the placeholder line in `ads.txt` at the repo
   root with the real line AdSense's Sites page gives you for `ads.txt`
   (looks like `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`).
5. If you also want to fill in specific ad slot IDs per placement (hub,
   trust, teacherTools, preTest, results) rather than relying on the
   fallback logic already in place, AdSense's **Ad units** screen gives you
   one slot ID per ad unit you create — send those too and they'll go into
   the `ADSENSE_AD_SLOTS` object in both files.
6. If any of your traffic is from the EEA, UK, or Switzerland, AdSense
   requires a Google-certified Consent Management Platform in addition to
   this site's own cookie banner — set up Google's "Privacy & messaging"
   (Funding Choices) from inside your approved AdSense account; it
   generates its own script tag that gets added alongside (not instead of)
   the existing banner.

## Order that actually matters

Steps 3-5 (Search Console, Analytics, AdSense) all work independently of
each other and can happen in any order or in parallel — but all three
benefit from the site actually being live on the real domain first (steps
1-2), since that's the URL you'll be verifying/registering everywhere.
AdSense specifically will not approve a site that isn't reachable yet.
