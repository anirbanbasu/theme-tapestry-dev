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
 * Font loading: all scholarly variant fonts are self-hosted as WOFF2 files
 * under themes/tapestry/static/fonts/scholarly/<variant>/ and declared via
 * @font-face in the main stylesheet (CONSTITUTION.md §4). No CDN stylesheet
 * injection is needed — when a visitor switches variant the browser already
 * has every font available from the @font-face declarations in style.css.
 *
 * Palette display: templates/shortcodes/presentation_palette.html renders a
 * static, build-time snapshot of the style/variant name and its light/dark
 * swatch colours. This script carries its own copy of the same token table
 * (mirroring _variants.scss and that shortcode's light/dark maps) so it can
 * rewrite that snapshot's text and colours live too, via the
 * `presentation-palette*`/`data-palette-*` hooks that shortcode renders.
 * This is a deliberate three-way duplication (SCSS, Tera shortcode, here) —
 * see the design discussion recorded wherever this feature was requested;
 * kept in sync by hand.
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

  // Google Fonts URLs for variants that still rely on CDN font delivery.
  // Mirrors templates/base.html's per-variant <link> selection — kept in sync
  // by hand. contemporary-research-lab is intentionally absent: its fonts are
  // self-hosted via @font-face in the main stylesheet (no CDN stylesheet
  // needed). Remove each entry here once that variant's WOFF2 files are
  // vendored under themes/tapestry/static/fonts/ (CONSTITUTION.md §4).
  var FONT_URLS = {
    "classic-ivy": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap",
    "nordic-minimalist": "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Source+Serif+4:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap",
    "dark-academia": "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=EB+Garamond:wght@400;500&family=Fira+Code:wght@400;500&display=swap",
    "scientific-journal": "https://fonts.googleapis.com/css2?family=Spectral:wght@600;700&family=PT+Serif:wght@400;700&family=Source+Code+Pro:wght@400;500&display=swap"
  };

  // Mirrors themes/tapestry/sass/css/_variants.scss's $variants map and
  // templates/shortcodes/presentation_palette.html's light/dark maps.
  // Structure: PALETTE[style][variant][mode][token] -> hex.
  var PALETTE = {
    scholarly: {
      "classic-ivy": {
        light: { bg_primary: "#faf6ec", text_heading: "#14212c", accent_primary: "#7a2231", accent_secondary: "#a8823f" },
        dark: { bg_primary: "#14191f", text_heading: "#f5efe0", accent_primary: "#e0a5ad", accent_secondary: "#d1ab6c" }
      },
      "nordic-minimalist": {
        light: { bg_primary: "#f7f8f7", text_heading: "#14171b", accent_primary: "#2f5f8f", accent_secondary: "#4b6b4b" },
        dark: { bg_primary: "#14171b", text_heading: "#f4f5f5", accent_primary: "#8fb4de", accent_secondary: "#9dc09d" }
      },
      "dark-academia": {
        light: { bg_primary: "#efe6d8", text_heading: "#201712", accent_primary: "#6e2c33", accent_secondary: "#33502f" },
        dark: { bg_primary: "#1b1512", text_heading: "#f4ead9", accent_primary: "#c98089", accent_secondary: "#86ab82" }
      },
      "scientific-journal": {
        light: { bg_primary: "#ffffff", text_heading: "#0d1117", accent_primary: "#1449a6", accent_secondary: "#0b6d64" },
        dark: { bg_primary: "#0d1117", text_heading: "#f4f8fb", accent_primary: "#79b1ff", accent_secondary: "#57d9c4" }
      },
      "contemporary-research-lab": {
        light: { bg_primary: "#fbfaf8", text_heading: "#1e1521", accent_primary: "#a8481f", accent_secondary: "#1f5c50" },
        dark: { bg_primary: "#1a1420", text_heading: "#faf7f5", accent_primary: "#e8916b", accent_secondary: "#6cb5a4" }
      }
    }
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

  function updatePaletteDisplay(style, variant) {
    var tokens = PALETTE[style] && PALETTE[style][variant];
    if (!tokens) {
      return;
    }

    var panels = document.querySelectorAll(".presentation-palette");
    for (var p = 0; p < panels.length; p++) {
      panels[p].setAttribute("data-palette-style", style);
      panels[p].setAttribute("data-palette-variant", variant);
    }

    var names = document.querySelectorAll(".presentation-palette-style-name");
    for (var s = 0; s < names.length; s++) {
      names[s].textContent = style;
    }

    var variantNames = document.querySelectorAll(".presentation-palette-variant-name");
    for (var v = 0; v < variantNames.length; v++) {
      variantNames[v].textContent = variant;
    }

    var swatches = document.querySelectorAll(".presentation-palette-swatch");
    for (var i = 0; i < swatches.length; i++) {
      var swatch = swatches[i];
      var mode = swatch.getAttribute("data-palette-mode");
      var token = swatch.getAttribute("data-palette-token");
      var hex = tokens[mode] && tokens[mode][token];
      if (!hex) {
        continue;
      }
      var colorBox = swatch.querySelector(".presentation-palette-swatch-color");
      var hexLabel = swatch.querySelector(".presentation-palette-swatch-hex");
      if (colorBox) {
        colorBox.style.background = hex;
      }
      if (hexLabel) {
        hexLabel.textContent = hex;
      }
    }
  }

  function applyChoice(style, variant, persist) {
    document.body.setAttribute("data-style", style);
    document.body.setAttribute("data-variant", variant);
    ensureFontLoaded(variant);
    updateCurrentOption(variant);
    updatePaletteDisplay(style, variant);
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
