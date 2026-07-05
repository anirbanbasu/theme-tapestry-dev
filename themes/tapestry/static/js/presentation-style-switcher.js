/**
 * Tapestry presentation style/variant switcher.
 *
 * Scope (CONSTITUTION.md §2, amendment 2026-JUL-05-002): this is the third
 * sanctioned JS exception, opt-in via `extra.presentation_style_switcher`
 * (default false). It lets a visitor override the site's configured
 * `data-style`/`data-variant` attributes on <body> at runtime, without a
 * page reload — every scholarly variant's CSS custom properties are already
 * keyed off those attributes (_variants.scss), so flipping them is enough
 * to repaint colours, fonts, spacing, etc. live.
 *
 * Font loading: templates/base.html only <link>s the Google Fonts stylesheet
 * for the *build-time-configured* variant, to avoid loading all 5 variants'
 * fonts on every page load. This script mirrors that same variant -> Google
 * Fonts URL mapping so it can lazily inject the correct stylesheet the first
 * time a visitor switches to a variant that wasn't already loaded.
 *
 * No-JS / switcher-disabled degradation: if this script doesn't run (JS
 * disabled, or `presentation_style_switcher` is false so the control and
 * this script tag aren't even rendered), the site simply stays on its
 * build-time-configured `extra.presentation_style`/`extra.presentation_variant`
 * — nothing here is required for the site to render or function correctly.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "tapestry-presentation-style";

  // Mirrors the Google Fonts URLs in templates/base.html's per-variant
  // <link> selection — kept in sync by hand (same duplication tradeoff
  // already accepted for the palette shortcode's token values).
  var FONT_URLS = {
    "classic-ivy": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
    "nordic-minimalist": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Source+Serif+4:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap",
    "dark-academia": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=EB+Garamond:wght@400;500&family=Fira+Code:wght@400;500&display=swap",
    "scientific-journal": "https://fonts.googleapis.com/css2?family=Spectral:wght@600;700&family=PT+Serif:wght@400;700&family=Source+Code+Pro:wght@400;500&display=swap",
    "contemporary-research-lab": "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;900&family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap"
  };

  var loadedFonts = {};

  function ensureFontLoaded(variant) {
    var url = FONT_URLS[variant];
    if (!url || loadedFonts[variant]) {
      return;
    }
    // Also treat as "loaded" if base.html already linked this exact URL
    // server-side (the build-time-configured variant).
    if (document.querySelector('link[href="' + url + '"]')) {
      loadedFonts[variant] = true;
      return;
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
    loadedFonts[variant] = true;
  }

  function applyChoice(style, variant, persist) {
    document.body.setAttribute("data-style", style);
    document.body.setAttribute("data-variant", variant);
    ensureFontLoaded(variant);
    updateCurrentOption(variant);
    if (persist) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ style: style, variant: variant }));
      } catch (e) {
        // Ignore storage failures; the choice still applies for this page view.
      }
    }
  }

  function updateCurrentOption(variant) {
    var options = document.querySelectorAll(".style-switcher-option");
    for (var i = 0; i < options.length; i++) {
      var isCurrent = options[i].getAttribute("data-variant") === variant;
      options[i].setAttribute("aria-current", isCurrent ? "true" : "false");
    }
  }

  function getStoredChoice() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      var parsed = JSON.parse(raw);
      if (parsed && parsed.style && parsed.variant && FONT_URLS[parsed.variant]) {
        return parsed;
      }
    } catch (e) {
      // Ignore storage/parse failures — fall through to build-time default.
    }
    return null;
  }

  function init() {
    var menu = document.querySelector(".style-switcher-menu");
    if (!menu) {
      return;
    }

    updateCurrentOption(document.body.getAttribute("data-variant"));

    var stored = getStoredChoice();
    if (stored) {
      applyChoice(stored.style, stored.variant, false);
    }

    menu.addEventListener("click", function (event) {
      var option = event.target.closest(".style-switcher-option");
      if (!option) {
        return;
      }
      applyChoice(option.getAttribute("data-style"), option.getAttribute("data-variant"), true);
      if (typeof menu.hidePopover === "function") {
        menu.hidePopover();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
