# Third-party assets and their licenses

Tapestry's own logo (specs/brand-logo.md) is an original, frozen asset — not
third-party. This file tracks everything else vendored into the theme that
carries its own license/attribution terms.

## Font Awesome Free — theme-switcher sun/moon icons

- **Files:** `themes/tapestry/templates/partials/icon-sun.svg.html`,
  `themes/tapestry/templates/partials/icon-moon.svg.html` (inlined verbatim
  path data from Font Awesome Free 6.7.2, `solid/sun.svg` and `solid/moon.svg`).
- **Source:** https://fontawesome.com
- **License:** https://fontawesome.com/license/free — icons are
  CC BY 4.0, fonts SIL OFL 1.1, code MIT. Only the icon SVG path data is used
  here (no Font Awesome fonts/JS/CSS framework), so CC BY 4.0 is the
  applicable term.
- **Attribution (required by CC BY 4.0):** Icons by
  [Font Awesome](https://fontawesome.com), licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- **Modification:** the icons' `fill` is set to `currentColor` (rather than
  Font Awesome's default black) so they inherit each presentation style's own
  colour tokens, consistent with how Tapestry's own logo works (specs/brand-logo.md
  §3). CC BY 4.0 permits colour/size modification; the underlying path
  geometry is otherwise unmodified from the source files.

## Openclipart — front-page paw print icon

- **File:** `content/paw.svg` (used unmodified as a CSS `mask` source, tinted
  via `background-color: var(--colour-text-heading)`, next to the "Dr. B.
  Dachshund" heading in `content/_index.md`).
- **Source:** https://openclipart.org/detail/142447/paw-print-by-kattekrab
  (also mirrored at https://freesvg.org/paw-print), created by kattekrab,
  2011-06-05.
- **License:** Public domain dedication
  (https://creativecommons.org/licenses/publicdomain/), per the file's own
  embedded RDF metadata. This is a public-domain/CC0-style dedication, not
  CC BY — no attribution is legally required.
- **Attribution:** not required, but recorded here for provenance, consistent
  with how every other vendored asset in this file is tracked regardless of
  whether its license mandates a credit line.

## Font Awesome Free — presentation style/variant switcher gear icon

- **File:** `themes/tapestry/templates/partials/icon-gear.svg.html` (inlined
  verbatim path data from Font Awesome Free 6.7.2, `solid/gear.svg`).
- **Source:** https://fontawesome.com
- **License:** https://fontawesome.com/license/free (Icons: CC BY 4.0), same
  terms and same `currentColor` modification rationale as the sun/moon icons
  above.
- **Attribution (required by CC BY 4.0):** Icons by
  [Font Awesome](https://fontawesome.com), licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
