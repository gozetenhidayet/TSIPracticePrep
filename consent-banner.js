/*
 * ScorePath Practice — shared cookie-consent banner + AdSense activation
 *
 * Self-installs on any page that loads this script: injects its own CSS,
 * the banner markup, and a "Cookie Preferences" reopen link into whatever
 * footer this page has (or a small fixed corner link if the page has no
 * footer at all). Shares the same localStorage key as index.html's own
 * banner, so a visitor's choice is consistent across the whole site.
 *
 * index.html does NOT load this file — it already has its own inline copy
 * wired directly to its AdSense activation code (see the
 * "scorepath-adsense-consent" script there). This file is for every other
 * content page (sat/act/tsia2, and the info pages) that carries its own
 * .spAdSlot placeholder(s): it shows the same consent banner AND, once a
 * visitor accepts, fills any .spAdSlot on the page with a real AdSense unit
 * — using the same off-by-default pattern as index.html.
 *
 * Off by default. Fill in ADSENSE_CLIENT_ID below once your AdSense account
 * is approved (see README "Turning on ads"). Until then this file only
 * manages the consent banner; .spAdSlot placements stay exactly as hidden
 * as they were before.
 */
(function () {
  var CONSENT_KEY = "scorepath_consent_v1";
  var ADSENSE_CLIENT_ID = ""; // e.g. "ca-pub-1234567890123456" — same value as index.html's copy

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(CONSENT_KEY, v); } catch (e) {}
  }

  function loadAdSenseScript() {
    if (!ADSENSE_CLIENT_ID) return;
    if (document.getElementById("adsbygoogle-js")) return;
    var s = document.createElement("script");
    s.id = "adsbygoogle-js"; s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(ADSENSE_CLIENT_ID);
    document.head.appendChild(s);
  }

  function fillSlot(container, slotId) {
    if (!container || !slotId || container.querySelector("ins.adsbygoogle")) return;
    var ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", ADSENSE_CLIENT_ID);
    ins.setAttribute("data-ad-slot", slotId);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    container.innerHTML = "";
    container.appendChild(ins);
  }

  function activateAds() {
    if (!ADSENSE_CLIENT_ID || getConsent() !== "accepted") return;
    loadAdSenseScript();
    document.body.classList.add("ads-enabled");
    document.querySelectorAll('.spAdSlot[data-ad-ready="true"]').forEach(function (el) {
      fillSlot(el.querySelector("span") || el, el.getAttribute("data-ad-slot-id") || "");
    });
    setTimeout(function () {
      document.querySelectorAll("ins.adsbygoogle:not([data-adsbygoogle-status])").forEach(function () {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      });
    }, 250);
  }
  window.__spActivateAds = activateAds;

  function injectStyles() {
    if (document.getElementById("sp-consent-shared-css")) return;
    var style = document.createElement("style");
    style.id = "sp-consent-shared-css";
    style.textContent =
      '.spConsent{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#07142f;color:#e2e8f0;border-top:1px solid rgba(255,255,255,.12);box-shadow:0 -18px 45px rgba(0,0,0,.28);padding:16px 18px;display:flex;gap:16px;align-items:center;flex-wrap:wrap}' +
      ".spConsent.hidden{display:none}" +
      ".spConsent p{margin:0;font-size:12.5px;line-height:1.55;color:#cbd5e1;max-width:640px}" +
      ".spConsent p b{color:#fff}" +
      ".spConsent a{color:#93c5fd;font-weight:800;text-decoration:none}" +
      ".spConsentActions{display:flex;gap:8px;margin-left:auto}" +
      ".spConsentBtn{border:0;border-radius:11px;padding:10px 15px;font-weight:900;font-size:12.5px;cursor:pointer}" +
      ".spConsentBtn.accept{background:#2563eb;color:#fff}" +
      ".spConsentBtn.decline{background:rgba(255,255,255,.08);color:#e2e8f0;border:1px solid rgba(255,255,255,.18)}" +
      "@media(max-width:640px){.spConsent{padding:14px}.spConsentActions{margin-left:0;width:100%}.spConsentBtn{flex:1}}" +
      ".spCookiePrefsFab{position:fixed;left:14px;bottom:14px;z-index:9998;background:#0f172a;color:#93c5fd;font-size:11px;font-weight:800;padding:8px 12px;border-radius:999px;box-shadow:0 8px 20px rgba(0,0,0,.25);text-decoration:none}" +
      ".spAdSlot{display:none;margin:22px auto;max-width:970px;min-height:90px;border:1px dashed #cbd5e1;border-radius:13px;background:#fafafa;place-items:center;color:#94a3b8;font-size:11px}" +
      '.spAdSlot span:before{content:"Advertisement";letter-spacing:.5px}' +
      ".spAdSafeNote{display:none;max-width:970px;margin:-10px auto 22px;font-size:10.5px;color:#94a3b8;text-align:center}" +
      ".ads-enabled .spAdSlot{display:grid!important}.ads-enabled .spAdSafeNote{display:block!important}" +
      ".spAdSlot ins.adsbygoogle{display:block;width:100%}";
    document.head.appendChild(style);
  }

  function injectBanner() {
    var existing = document.getElementById("spConsent");
    if (existing) return existing;
    var div = document.createElement("div");
    div.className = "spConsent hidden";
    div.id = "spConsent";
    div.setAttribute("role", "dialog");
    div.setAttribute("aria-label", "Cookie preferences");
    div.innerHTML =
      '<p><b>Cookies &amp; ads.</b> ScorePath Practice can show ads on some pages to help keep practice free. Ads and any related cookies only turn on if you accept &mdash; declining keeps your visit ad-free. Change your mind anytime with the &quot;Cookie Preferences&quot; link in the footer. See <a href="privacy.html">Privacy</a>.</p>' +
      '<div class="spConsentActions"><button class="spConsentBtn decline" id="spConsentDecline" type="button">Decline</button><button class="spConsentBtn accept" id="spConsentAccept" type="button">Accept</button></div>';
    document.body.appendChild(div);
    return div;
  }

  function injectFooterLink() {
    if (document.getElementById("spCookiePrefsLink")) return;
    var container = document.querySelector(".footlinks") || document.querySelector(".footnav");
    var a = document.createElement("a");
    a.href = "#";
    a.id = "spCookiePrefsLink";
    a.textContent = "Cookie Preferences";
    if (container) {
      a.style.color = "#93c5fd";
      a.style.fontWeight = "700";
      a.style.fontSize = "12px";
      container.appendChild(a);
    } else {
      // No footer on this page (e.g. teachers.html) — add a small fixed link instead.
      a.className = "spCookiePrefsFab";
      document.body.appendChild(a);
    }
  }

  function activate() {
    injectStyles();
    var banner = injectBanner();
    injectFooterLink();

    if (!getConsent()) banner.classList.remove("hidden");
    else if (getConsent() === "accepted") activateAds();

    document.getElementById("spConsentAccept").addEventListener("click", function () {
      setConsent("accepted");
      banner.classList.add("hidden");
      if (typeof window.__spActivateAds === "function") window.__spActivateAds();
    });
    document.getElementById("spConsentDecline").addEventListener("click", function () {
      setConsent("declined");
      banner.classList.add("hidden");
    });
    document.getElementById("spCookiePrefsLink").addEventListener("click", function (ev) {
      ev.preventDefault();
      banner.classList.remove("hidden");
    });
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", activate) : activate();
})();
