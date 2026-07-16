+++
title = "Documentation"
description = "Comprehensive documentation of the Tapestry theme"
sort_by = "date"
paginate_by = 10
insert_anchor_links = "right"

[extra]
copy_button = true
+++


## Documentation

Reference pages for configuring a Tapestry site:

- [Site-level configuration](site-configuration) — every `extra.*` key in
  `config.toml`.
- [Page-level configuration](page-configuration) — per-page `[extra]` front
  matter overrides.
- [Section-level configuration](section-configuration) — per-section
  `[extra]` front matter overrides.

Content authoring guides:

- [Markdown syntax guide](markdown) — basic Markdown syntax and how it's
  styled.
- [Mathematical typesetting](math-typesetting) — KaTeX math rendering.
- [Shortcodes](shortcodes) — `alert`, `responsive_image`, `wide_container`,
  `mastodon`, `references`, and more.

## Design principles & internals

This documentation covers *how to configure* a Tapestry site. The *why*
behind its design system, accessibility standards, and test infrastructure
lives in the theme's source repository rather than being duplicated here, so
it can't drift out of sync:

- [CONSTITUTION.md](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/CONSTITUTION.md) —
  the non-negotiable standards (accessibility, fonts, grid, navigation,
  presentation styles, design tokens, brand identity) every group and
  variant must meet.
- Design tokens per presentation style group:
  [scholarly](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/design-tokens-scholarly.md),
  [creative](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/design-tokens-creative.md),
  [natural](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/design-tokens-natural.md),
  [precision](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/design-tokens-precision.md),
  [collective](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/design-tokens-collective.md).
- [Brand logo spec](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/brand-logo.md) —
  the approved mark, usage rules, and source files.
- [Presentation style switcher spec](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/presentation-style-switcher.md) —
  the accordion menu's markup and interaction rules.
- [Terminus compatibility contract](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/terminus-compat-contract.md) —
  the frozen fixture of shortcodes/config keys Tapestry stays compatible
  with, and where it deliberately deviates.
- [Visual & accessibility test suite](https://github.com/anirbanbasu/theme-tapestry-dev/blob/master/specs/visual-a11y-test-suite.md) —
  the Playwright + axe-core suite verifying WCAG AA, keyboard navigation,
  and visual regression across every group/variant.

---
