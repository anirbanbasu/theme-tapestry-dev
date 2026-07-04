# Terminus compatibility contract

Frozen fixture per [CONSTITUTION.md](../CONSTITUTION.md) §3. This document is
the source of truth Tapestry is tested against — **not** the live terminus
repository, which continues to change upstream independently of this
contract.

- **Pinned snapshot:** terminus @ `aa8d8b67f9ab69ae48e1405f96e152d41f03e0ed`.
- **Upstream `min_version` at that snapshot:** Zola `0.22.0`.
- Extracted by reading `theme.toml`, `config.toml`, `templates/`, `content/`
  and `README.md` at the pinned commit, checked out read-only into
  `themes/terminus/` (see [CLAUDE.md](../CLAUDE.md)).

Changes to this contract are deliberate and explicit only — see
CONSTITUTION.md §3 for the amendment process. This repo's actual live usage
(`content/`, `config.toml`) is the hard floor: whatever is in use there is
non-negotiable regardless of what this contract says.

---

## 1. Shortcodes

| Shortcode | Parameters | Notes |
|---|---|---|
| `alert(type, title, icon, text)` | `type` (default `"info"`; one of `note`, `tip`, `info`, `warning`, `danger`), `title` (default: `type` uppercased), `icon` (default: `type`), `text` — or body content instead of `text` | Renders `<section class="alert {type}" role="note">`. Label ID is a SHA-256 hash of `type~title~icon~text`, truncated to 8 chars. |
| `mastodon(url, is_me)` | `url` (required, post URL), `is_me` (default `false`) | Fetches the post via the Mastodon API at build time (`load_data`) and embeds it as a `<figure class="mastodon-post">`. Requires network access at build time. |
| `references()` | body only | Wraps body in `<section class="references-list">` with hanging-indent formatting. Body is rendered as Markdown. |
| `responsive_image(src, alt, caption, lazy)` | `src` (required, relative to `page.colocated_path`), `alt` (required), `caption` (optional, rendered as inline Markdown), `lazy` (default `true`) | Generates multiple resized candidates per `[extra.responsive_images].widths`, plus one fallback at `fallback_width`. Emits `srcset`/`sizes`; `sizes` differs depending on `config.extra.layout == "full-width"` vs. other layouts. |
| `wide_container()` | body only | Wraps body (rendered as inline Markdown) in `<div class="wide-container">` — full article width on desktop, horizontal-scroll on mobile for wide elements like tables. |

## 2. Config keys — root level (`config.toml`)

| Key | Type | Notes |
|---|---|---|
| `base_url` | string | Standard Zola key. |
| `title` | string | Used as page title fallback and OpenGraph `og:site_name`. |
| `description` | string | Fallback meta description / `og:description`. |
| `compile_sass` | bool | Standard Zola key; terminus ships Sass under `sass/`. |
| `generate_feeds` | bool | Gates feed `<link>` tags and footer feed icon. |
| `author` | string | Fallback author for meta tags and footer copyright `$AUTHOR` placeholder. |
| `taxonomies` | array of `{ name, feed?, paginate_by? }` | Standard Zola key. Demo site defines `tags` and `categories`. |
| `build_search_index` | bool | Standard Zola key; terminus does not ship a search UI itself. |

### `[markdown]`

| Key | Type | Notes |
|---|---|---|
| `render_emoji` | bool | Standard Zola key. |
| `external_links_class` | string | Standard Zola key; terminus's CSS targets `.external`. |
| `bottom_footnotes` | bool | Standard Zola key. |
| `lazy_async_image` | bool | Standard Zola key. When `true`, alt text for images must be plain text. |
| `github_alerts` | bool | Standard Zola key (requires Zola ≥ 0.21.0). Enables `> [!NOTE]`-style callouts as an alternative to the `alert` shortcode. |

### `[markdown.highlighting]`

| Key | Type | Notes |
|---|---|---|
| `style` | `"inline"` \| `"class"` | Standard Zola key. Terminus CSP partial adds `'unsafe-inline'` to `style-src-attr` when `"inline"`. |
| `extra_themes` | array of paths | Terminus ships `syntaxes/monokai-classic.json`, a patched Monokai variant. |
| `theme` | string | Terminus demo uses `"monokai-classic"`. |

## 3. Config keys — `[extra]`

| Key | Type | Default | Notes |
|---|---|---|---|
| `close_responsive_menu_on_resize` | bool | — | **Requires JS** (`js/auto-close-popover-on-resize.js`). See §7 conflict note. |
| `color_scheme` | string | `"terminus"` | One of: `terminus`, `tokyo-night`, `solarized-dark`, `nord`, `one-dark`, `gruvbox-dark`, `oled-abyss`, `solar-flare`, `catppuccin-latte`, `catppuccin-frappe`, `catppuccin-macchiato`, `catppuccin-mocha`, `synthwave-84`. Applied as `data-theme` attribute on `<body>`. |
| `color_scheme_switcher` | bool | `false` | **Requires JS** (`js/theme-switcher.js`) — this is the sanctioned theme-switcher exception under CONSTITUTION.md §2. |
| `stylesheets` | array of paths | `[]` | Concatenated across config/section/page level; each additive. |
| `copy_button` | bool | — | **Requires JS** (`js/copy-code-to-clipboard.js`). Overridable per-page/section via `extra.copy_button` (see §5). See §7 conflict note. |
| `copyright` | string (Markdown) | site default string | Footer text. `$YEAR` and `$AUTHOR` placeholders; `::`-delimited segments become separate responsive `<span>`s. |
| `favicon` | path | — | Mutually exclusive with `favicon_emoji`; generates `apple-touch-icon` if PNG. |
| `favicon_emoji` | string (emoji) | — | Rendered as inline SVG data URI. Requires CSP `img-src data:` (handled automatically). |
| `feed_icon` | bool \| string | — | `true` = default RSS/Atom icon; string = custom icon name from `static/images/social_icons/`. |
| `fediverse_creator` | string | — | Emits `<meta name="fediverse:creator">`. |
| `header_title` | string | `config.title` | Overrides header text. |
| `header_logo` | path | — | Image (including SVG) used instead of header text. |
| `katex` | bool | `false` | **Requires JS** (`js/katex.min.js` + `css/katex.min.css`). Overridable per-page/section via `extra.katex` (see §5). See §7 conflict note. |
| `layout` | `"center"` \| `"left"` \| `"full-width"` | `"center"` | Affects body class and `responsive_image` `sizes` attribute. |
| `show_default_author` | bool | `true` | Whether to show `config.author` on pages without `authors = [...]` in front matter. |
| `main_menu` | array of `{ name, url, trailing_slash?, new_tab? }` | — | `url` starting with `http` is treated as external and used verbatim. |
| `socials` | array of `{ name, url }` | — | `name` must match an SVG filename (minus extension) in `static/images/social_icons/`. |

### `[extra.content_security_policy]`

| Key | Type | Notes |
|---|---|---|
| `enable` | bool | Gates the CSP `<meta>` tag entirely. |
| `allowed_domains` | array of `{ directive, domains }` | Merged with automatic entries for `zola serve` (adds `ws:`), `favicon_emoji` (adds `data:` to `img-src`), and inline highlighting style (adds `'unsafe-inline'` to `style-src-attr`). |

### `[extra.responsive_images]`

| Key | Type | Notes |
|---|---|---|
| `widths` | array of ints | Candidate widths for the `responsive_image` shortcode. Demo default: `[640, 784, 1280, 1920, 2560]`. |
| `fallback_width` | int | `<img src>` fallback size. Demo default: `1280`. |

## 4. Template blocks (`templates/base.html`)

| Block | Purpose |
|---|---|
| `title` | `<title>` contents. |
| `translations` | `<link rel="alternate" hreflang="...">` tags for i18n. |
| `feeds` | Additional feed `<link>` tags beyond the automatic per-`config.feed_filenames` ones (used by `taxonomy_single.html` for per-term feeds). |
| `description` | Meta description `<meta>` tag. |
| `robots` | Robots meta tag (overridden to `noindex, follow` in `404.html`). |
| `head` | Free insertion point at the end of `<head>`. |
| `header` | Defaults to `partials/header.html`. |
| `main` | Main page content — overridden by every page-type template (`page.html`, `section.html`, `index.html`, `archive.html`, `taxonomy_list.html`, `taxonomy_single.html`, `404.html`). |
| `footer` | Defaults to `partials/footer.html`. |

Page-type templates and their `extends` chain:

- `page.html` → extends `base.html`.
- `section.html` → extends `base.html`.
- `index.html` → extends `base.html` (homepage; supports `section.extra.section_path` "featured section" pattern).
- `archive.html` → extends `section.html`.
- `taxonomy_list.html` → extends `base.html`.
- `taxonomy_single.html` → extends `base.html`.
- `404.html` → extends `base.html`.

Overridable partial: `templates/partials/comments.html` ships as an empty
stub by design — intended to be replaced wholesale by site authors who want
a comment system.

## 5. Front-matter fields

### Page-level

| Field | Notes |
|---|---|
| `title`, `description`, `date`, `updated` | Standard Zola fields. |
| `authors` | Array of strings; overrides `config.author` for that page. |
| `draft` | Standard Zola field; renders a "DRAFT" label in post headers and archive listings. |
| `[taxonomies]` (`tags`, `categories`, or other configured taxonomies) | Standard Zola field. |
| `[extra.social_media_image]` `{ path, alt_text }` | `path` relative to `page.colocated_path`; used for `og:image`/`twitter:card`. |
| `[extra] copy_button` | Per-page override of the global `copy_button` setting (see §3, §7). |
| `[extra] katex` | Per-page override of the global `katex` setting (see §3, §7). |
| `[extra] stylesheets` | Additive with config/section-level stylesheets. |

### Section-level

| Field | Notes |
|---|---|
| `title`, `description`, `sort_by`, `paginate_by`, `insert_anchor_links` | Standard Zola fields. |
| `template` | e.g. `"archive.html"` to opt a section into the archive layout. |
| `[extra] framed` | Adds a `framed` CSS class to the section's content header. |
| `[extra] section_path` | Path to another section's `_index.md` whose pages should be rendered here (powers the homepage "featured section" pattern and the archive page). |
| `[extra] max_posts` | Caps how many posts from `section_path` are shown (homepage use case). |
| `[extra] copy_button`, `[extra] katex`, `[extra] stylesheets` | Same semantics as page-level, inherited by descendant pages via `macros/config.html::get` (walks `page.ancestors`). |

## 6. Colocated/derived data used by templates

- `page.colocated_path`, `page.permalink`, `page.lower`/`page.higher` (adjacent posts), `page.reading_time`, `page.word_count`, `page.translations`, `page.taxonomies` — all standard Zola page fields relied upon directly by templates.
- `section.pages`, `section.translations`, `paginator.*` — standard Zola section/pagination fields.
- `get_image_metadata`, `resize_image`, `get_taxonomy_url`, `get_section`, `load_data`, `now`, `get_hash` — Zola built-in Tera functions in active use; confirm availability against the pinned Zola `min_version = 0.22.0` (or newer, per `github_alerts`'s `0.21.0` requirement) before relying on them.

## 7. JavaScript inventory — constitutional conflict flag

CONSTITUTION.md §2 permits **exactly one** JS file: a theme switcher. At the
pinned snapshot, terminus ships **four** conditionally-loaded scripts:

| Script | Loaded when | Scope |
|---|---|---|
| `js/theme-switcher.js` | `extra.color_scheme_switcher = true` | Runtime colour-scheme switching with `localStorage` persistence — this is the sanctioned exception. |
| `js/auto-close-popover-on-resize.js` | `extra.close_responsive_menu_on_resize = true` | Closes the responsive nav popover on window resize. |
| `js/copy-code-to-clipboard.js` | `extra.copy_button = true` (or per-page/section override) | Adds a "copy to clipboard" button to fenced code blocks. |
| `js/katex.min.js` | `extra.katex = true` (or per-page/section override) | Client-side KaTeX math rendering. |

**Resolution (decided 2026-07-04):** reimplement without JS wherever
feasible; drop whatever can't be done without JS. Concretely, per feature:

- **Responsive nav popover auto-close** — reimplement CSS-only (e.g.
  `:target`/checkbox-hack or native `popover`/`:has()` where supported)
  instead of `js/auto-close-popover-on-resize.js`.
- **Copy-to-clipboard button on code blocks** — no clipboard write is
  possible without JS; drop the button. `copy_button` becomes a no-op /
  unsupported key rather than a silently-dead one — record this explicitly
  wherever Tapestry's own config-key documentation lists `copy_button`.
  as it will make its way into the reference contract.
- **KaTeX math rendering** — investigate build-time rendering (e.g. Zola
  external command / preprocessing step producing static MathML or SVG)
  before implementation begins; if no viable build-time path exists, drop
  client-side KaTeX and document the gap rather than shipping the JS.

This is a decision, not yet an implementation — no code has been written
for any of the three replacements. Revisit this section once the actual
templates/CSS/build step land, and update it if the concrete approach
changes.

## 8. Config-driven CSS entry points

- `sass/css/style.scss` is the single compiled entry point; per-file
  partials (`_alerts.scss`, `_archive.scss`, `_code.scss`, `_fonts.scss`,
  `_footer.scss`, `_header.scss`, `_main.scss`, `_menu.scss`,
  `_pagination.scss`, `_post.scss`, `_shortcodes.scss`, `_taxonomies.scss`,
  `_theme-selector.scss`, `_themes.scss`) are imported from it.
- `_themes.scss` defines the CSS custom properties for all 13 named colour
  schemes listed in §3, keyed off `[data-theme="..."]` on `<body>`.
