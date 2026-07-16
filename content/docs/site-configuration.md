+++
title = "Site-level Configuration Reference"
description = "A comprehensive reference for every extra.* setting Tapestry reads from config.toml — defaults, examples, and behavioural notes."
date = 2026-07-16
authors = ["Anirban Basu"]
insert_anchor_links = "right"

[taxonomies]
tags = ["docs", "configuration"]
categories = ["docs"]

[extra]
copy_button = true
+++

This page documents every setting Tapestry reads from the `[extra]` table of
your site's `config.toml`, as defined in the theme's own `theme.toml`. For
Zola's own built-in configuration keys (`base_url`, `title`,
`[markdown]`, taxonomies, and so on), see
[Standard Zola configuration](#standard-zola-configuration) at the bottom of
this page.

## Identity & branding

### `header_logo`, `header_title`, and the brand-mark fallback

```toml
[extra]
header_title = "My Research Site"
# header_logo = "images/logo/logo.svg"
```

The header renders exactly one of the following, in this priority order:

1. **`header_logo`** — an image (including SVG), if set.
2. **`header_title`** — plain text, if `header_logo` is unset.
3. **Tapestry's own brand mark** — an inlined SVG, used only when *neither* of
   the above is set. `config.title` is still included as screen-reader-only
   text alongside the mark.

Setting `header_logo` always takes priority — `header_title` is ignored
entirely once a logo image is present.

### `favicon` and `favicon_emoji`

```toml
[extra]
favicon = "images/logo/logo-01-woven-monogram-square.svg"
# favicon_emoji = "🔬"
```

These are mutually exclusive: if `favicon` is set, it is used and
`favicon_emoji` is ignored outright, regardless of whether `favicon_emoji` is
also set.

- SVG favicons are linked directly (`rel="icon" type="image/svg+xml"`).
- Raster favicons additionally get a 180×180 `apple-touch-icon` generated
  automatically when the source is a PNG.
- `favicon_emoji` is embedded as an inline SVG `data:` URI containing the
  emoji as text — no image file needed. Stick to plain emoji characters here;
  the value is interpolated into the data URI without escaping, so characters
  like `"` or `#` will break it.

### `copyright`

```toml
[extra]
copyright = "© $YEAR $AUTHOR :: Powered by [Zola](https://www.getzola.org) :: [Tapestry](https://github.com/anirbanbasu/tapestry) theme."
```

- `$YEAR` is replaced with the current year (wrapped in a `<time>` element).
- `$AUTHOR` is replaced with `config.author` (empty string if unset).
- The string is split on the literal delimiter `::`; each segment becomes its
  own `<span>` (so they can wrap/stack independently on narrow screens), and
  each segment is rendered as inline Markdown — links, emphasis, etc. all
  work.
- If `copyright` is left unset entirely, Tapestry falls back to a built-in
  three-segment default equivalent to the example above.

---

## Presentation style

### `presentation_style` and `presentation_variant`

```toml
[extra]
presentation_style = "scholarly"
presentation_variant = "contemporary-research-lab"
```

Tapestry ships **5** preset style **groups**, each with **5** fully-specified
**variants** (25 combinations total). If `presentation_style` is unset or
names a group that doesn't exist, Tapestry falls back to `scholarly`. If
`presentation_variant` is unset or names a variant that doesn't exist within
the selected group, Tapestry falls back to that group's own default variant.

{% alert(type="note", title="Migrating from terminus") %}

If you're migrating a site from terminus, any `extra.color_scheme` or
`extra.color_scheme_switcher` left over in your config is inert under
Tapestry — it is never read, mapped, or migrated into an equivalent
style/variant. Set `presentation_style`/`presentation_variant` explicitly, or
accept the `scholarly`/`contemporary-research-lab` default.

{% end %}

| Group | Default variant | All variants |
|---|---|---|
| `scholarly` | `contemporary-research-lab` (also the theme-wide default) | `classic-ivy`, `nordic-minimalist`, `dark-academia`, `scientific-journal`, `contemporary-research-lab` |
| `creative` | `editorial-zine` | `bauhaus-studio`, `editorial-zine`, `watercolor-atelier`, `neon-studio`, `collage-mixed-media` |
| `natural` | `periodic-table-chemistry` | `celestial-observatory`, `periodic-table-chemistry`, `field-notebook`, `chalkboard-proof`, `quantum-circuit` |
| `precision` | `swiss-precision-instrument` | `blueprint-drafting`, `surgical-precision`, `aerospace-materials-lab`, `biomedical-diagnostics`, `swiss-precision-instrument` |
| `collective` | `cartographers-atlas` | `cartographers-atlas`, `ledger-index`, `social-network-diagram`, `agora-classical-philosophy`, `strata-geology` |

Every group and variant independently meets WCAG AA contrast, ships its own
self-hosted font pairing, and is built on the same 12-column responsive grid
and no-JS navigation collapse.

### `presentation_style_switcher`

```toml
[extra]
presentation_style_switcher = true
```

Opt-in (default `false`). Adds a disclosure menu next to the theme switcher
that lets a visitor preview any group/variant combination live, without a
page reload — a two-level accordion (one entry per group, expandable to
reveal that group's variants), not a flat list of all 25 combinations. This
is one of Tapestry's three sanctioned JavaScript exceptions; with JS
disabled, the control simply doesn't appear and the site stays on its
build-time `presentation_style`/`presentation_variant`.

---

## Navigation & social links

### `main_menu`

```toml
[extra]
main_menu = [
    { name = "docs", url = "docs", trailing_slash = true },
    { name = "about", url = "about", trailing_slash = false },
    { name = "repo github", url = "https://github.com/anirbanbasu/tapestry", new_tab = true },
]
```

Each entry supports:

| Field | Required | Default | Notes |
|---|---|---|---|
| `name` | yes | — | Link text. |
| `url` | yes | — | Internal content path, or a full external URL. |
| `trailing_slash` | no | `false` | Only applies to internal paths (see below). |
| `new_tab` | no | `false` | Adds `target="_blank"`. |

A `url` is treated as **external** whenever it starts with the literal
characters `http` — otherwise it's resolved internally with Zola's
`get_url()`, honouring `trailing_slash`. `new_tab` only adds
`target="_blank"`; it does not add `rel="noopener"` (modern browsers apply
that protection to `target="_blank"` links automatically, but it's worth
knowing this isn't set explicitly).

### `socials`

```toml
[extra]
socials = [
    { name = "email", url = "mailto:hello@example.com" },
    { name = "github", url = "https://github.com/anirbanbasu" },
    { name = "orcid", url = "https://orcid.org/0000-0000-0000-0000" },
]
```

Each entry is just `name` and `url` — there is no separate icon override key.
`name` **must** exactly match an SVG filename (without extension) under
`themes/tapestry/static/images/social_icons/`, since it's used directly to
build the icon path. A name with no matching file doesn't fail the build —
it silently renders a broken icon link, so double-check the spelling against
the list below.

Icons currently shipped: `bitcoin`, `bluesky`, `codeberg`, `codepen`,
`discord`, `discourse`, `email`, `ethereum`, `facebook`, `fediverse`,
`flickr`, `forgejo`, `gitea`, `github`, `gitlab`, `google-maps`,
`google-scholar`, `instagram`, `keybase`, `keyoxide`, `ko-fi`, `linkedin`,
`mastodon`, `matrix`, `monero`, `orcid`, `patreon`, `phone`, `pixelfed`,
`reddit`, `researchgate`, `signal`, `slack`, `spotify`, `stackexchange`,
`stackoverflow`, `steam`, `telegram`, `twitch`, `venmo`, `vimeo`, `whatsapp`,
`x`, `youtube`, `zulip` (plus `atom`/`rss`, normally reserved for
`feed_icon` below).

### `feed_icon`

```toml
[extra]
feed_icon = true
# feed_icon = "atom"
```

Shown in the footer alongside `socials`, only when `config.generate_feeds` is
also `true`.

- `true` uses the default icon, `rss`.
- A string uses that name instead, looked up the same way as `socials`.
- If your site's `feed_filenames` produces more than one feed **and** one of
  those filenames contains `"atom"`, that specific feed link is forced to the
  `atom` icon regardless of what `feed_icon` is set to. With a single
  default feed (the common case — just `generate_feeds = true`, no
  `feed_filenames` override), this distinction never triggers.

---

## Content features

### `katex`

```toml
[extra]
katex = false
```

```toml
# per-page front matter override
[extra]
katex = true
```

Site-wide default for client-side KaTeX math rendering (one of Tapestry's
three sanctioned JS exceptions). Resolved with page-level precedence: a
page's own `extra.katex`, then its section's, then walking up any ancestor
sections' `extra.katex`, then the site-wide `config.extra.katex`, defaulting
to `false`. An explicit `false` at a more specific level always wins over a
`true` set higher up — so a section can enable KaTeX globally while an
individual page opts back out. With JS disabled, KaTeX-enabled pages show
raw, unrendered `$...$`/`$$...$$` source instead of typeset math.

### `show_default_author`

```toml
[extra]
show_default_author = true
```

When `true`, pages without their own `authors = [...]` front matter show
`config.author` instead. Set `false` to only show authorship where a page
explicitly declares one.

### `fediverse_creator`

```toml
[extra]
fediverse_creator = "@user@mastodon.social"
```

Emits a `<meta name="fediverse:creator">` tag for Mastodon's article
attribution feature. Leave unset to omit the tag.

---

## Layout

### `layout`

```toml
[extra]
layout = "center"
```

One of `"center"`, `"left"`, or `"full-width"`, applied as a `layout-*` body
class and used to vary the `sizes` attribute the `responsive_image`
shortcode generates.

{% alert(type="note", title="Current visual difference") %}

`"center"` and `"left"` currently produce identical CSS and layout — the
distinction exists in the config surface but isn't yet visually
differentiated. `"full-width"` is the one value that visibly changes both the
page's max-width behaviour and the `responsive_image` `sizes` output.

{% end %}

---

## Styling extensibility

### `stylesheets`

```toml
[extra]
stylesheets = ["css/custom.css"]
```

Site-, section-, and page-level `stylesheets` are all **additive** — every
stylesheet declared at any of the three levels is linked on the resulting
page, not just the most specific one. Use this to layer small overrides on
top of your chosen presentation style rather than to replace it.

---

## Images

### `[extra.responsive_images]`

```toml
[extra.responsive_images]
widths = [640, 784, 1280, 1920, 2560]
fallback_width = 1280
```

`widths` is the set of candidate image widths generated for the
`responsive_image` shortcode's `srcset`; `fallback_width` is the size used
for browsers that ignore `srcset`. This setting is scoped **only** to images
inserted via that shortcode in your Markdown content — it does not affect
`og:image` (always generated at a fixed 1200×675), the favicon's
apple-touch-icon (always 180×180), or `header_logo` (used at its native
size, unresized).

---

## Security

### `[extra.content_security_policy]`

```toml
[extra.content_security_policy]
enable = true
allowed_domains = [
    { directive = "base-uri", domains = ["'self'"] },
    { directive = "form-action", domains = ["'self'"] },
    { directive = "img-src", domains = ["'self'", "https://images.example.com"] },
]
```

- `enable` gates the entire `Content-Security-Policy` `<meta>` tag — when
  `false`, no CSP tag is emitted at all.
- `allowed_domains` is a generic list of `{ directive, domains }` entries.
  Any CSP directive name works here (`script-src`, `img-src`, `connect-src`,
  `style-src`, `font-src`, etc.) — it isn't limited to a fixed set.
- Even with `allowed_domains = []`, the theme always emits a baseline policy:
  `default-src 'self'; img-src 'self' data:; style-src-attr 'unsafe-inline'`
  (the `data:` and inline-style allowances are needed by the theme's own
  mask-icons and inline styles).

Under `zola serve`, the policy is additionally relaxed with `connect-src
'self' ws:` and `script-src-elem 'self' 'unsafe-inline'`, to allow the
dev-mode live-reload WebSocket. This relaxation never applies to production
builds.

---

## Multi-site deployments

### `site_id`

```toml
[extra]
site_id = "my-site-slug"
```

Both the theme switcher and the presentation-style switcher persist a
visitor's choice to `localStorage`, scoped by the browser to the page's
*origin* (scheme+host+port) but **not** by path. Two Tapestry sites sharing
an origin but deployed under different paths — e.g. two GitHub Pages project
sites both under `username.github.io/` — would otherwise silently share and
overwrite each other's saved preferences. `site_id` namespaces both storage
keys to prevent that.

If unset, it falls back to `config.base_url`, which is enough to distinguish
sites in a plain `zola build`, but **not** during `zola serve` (which
rewrites `base_url` to `http://127.0.0.1:<port>/`, discarding any path) or a
`zola build --base-url <url>` override that strips or normalises the path.
Set `site_id` explicitly if your site is deployed to a shared-origin
subdirectory, or regularly tested locally alongside other Tapestry sites on
the same port.

---

## Quick reference

| Key | Type | Default | Purpose |
|---|---|---|---|
| `site_id` | string | `config.base_url` | Namespaces the theme-switcher and style-switcher `localStorage` keys. |
| `presentation_style` | string | `"scholarly"` | Top-level style group. |
| `presentation_variant` | string | group's own default | Variant within the chosen group. |
| `presentation_style_switcher` | bool | `false` | Opt-in live style/variant preview menu. **Requires JS.** |
| `main_menu` | array of tables | `[]` | Header navigation entries. |
| `socials` | array of tables | `[]` | Footer social/contact links. |
| `feed_icon` | bool \| string | unset | Show a feed icon in the footer alongside `socials`. |
| `copyright` | string (Markdown) | built-in fallback text | Footer copyright line. |
| `favicon` | path | unset | Favicon image (SVG or raster). Wins over `favicon_emoji` if both set. |
| `favicon_emoji` | string (emoji) | unset | Emoji favicon, ignored if `favicon` is also set. |
| `header_title` | string | `config.title` | Header text, if no `header_logo` is set. |
| `header_logo` | path | unset | Header logo image. Takes priority over `header_title`. |
| `katex` | bool | `false` | Site-wide KaTeX math rendering. Overridable per section/page. **Requires JS.** |
| `layout` | `"center"` \| `"left"` \| `"full-width"` | `"center"` | Overall content-width treatment. |
| `show_default_author` | bool | `true` | Show `config.author` on pages without their own `authors`. |
| `fediverse_creator` | string | unset | Emits a `fediverse:creator` meta tag. |
| `stylesheets` | array of paths | `[]` | Extra stylesheets, additive with section/page-level `stylesheets`. |
| `[extra.content_security_policy]` | table | — | Site CSP `<meta>` tag configuration. |
| `[extra.responsive_images]` | table | — | Width candidates for the `responsive_image` shortcode. |

---

## Standard Zola configuration

Root-level keys like `base_url`, `title`, `description`, `theme`,
`compile_sass`, `generate_feeds`, `author`, `taxonomies`,
`build_search_index`, and the `[markdown]`/`[markdown.highlighting]` tables
are standard Zola configuration, not Tapestry-specific — see
[Zola's own configuration documentation](https://www.getzola.org/documentation/getting-started/configuration/)
for the full reference.

One Tapestry-relevant note: `[markdown.highlighting] style = "class"`
requires *some* built-in Zola highlighting theme to be configured (e.g.
`theme = "monokai"`), but every presentation style/variant fully overrides
the resulting `.z-*` token colours itself — the configured theme name only
acts as a placeholder to satisfy Zola, not as the actual code-block palette
you'll see rendered.
