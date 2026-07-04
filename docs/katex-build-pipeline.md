# KaTeX build pipeline

## Why this exists

CONSTITUTION.md §2 bans all runtime JavaScript in Tapestry except a single
light/dark theme switcher. Terminus (the upstream theme, pinned per
`docs/terminus-compat-contract.md` §3) renders KaTeX math client-side via
`js/katex.min.js`, gated by `extra.katex = true`. Tapestry cannot ship that
script. Per the decision recorded in `docs/terminus-compat-contract.md` §7,
Tapestry instead **pre-renders KaTeX at build time**, using KaTeX's Node.js
server-side rendering API (`katex.renderToString`), before `zola build` ever
runs. The rendered output is plain HTML + MathML (`.katex` / `.katex-mathml`
/ `.katex-html` classes, styled by the already-vendored
`themes/tapestry/static/css/katex.min.css` and KaTeX webfonts under
`themes/tapestry/static/fonts/katex/`) — zero `<script>` tags, zero inline
event handlers, zero `javascript:` URIs.

This is a new build-time dependency alongside Zola: Node.js/npm, and the
`katex` npm package.

## Mechanism: why `content/` is never mutated in place

Zola has no CLI flag to point at an alternate content directory — the
`-r`/`--root` flag selects an entire alternate **project root** (config,
content, templates, static, sass all together), not just content. That
leaves a few options for where to put pre-rendered output:

1. **Overwrite `content/**/*.md` in place.** Rejected — this destroys the
   human-editable Markdown source with generated HTML. The next content
   edit would be editing generated output, and re-running the script would
   double-render already-rendered HTML.
2. **Write transformed copies into `content/` under a naming convention**
   (e.g. `*.rendered.md`) alongside the originals. Rejected — Zola would
   pick up both the original and the transformed copy as separate
   pages/sections, producing duplicate content and broken permalinks.
3. **Build a full scratch project mirror outside `content/`, and point
   `zola --root` at it.** Chosen.

`scripts/render-katex.js` implements option 3. On every run it:

- Deletes and regenerates `.katex-build/site/` (git-ignored) from scratch,
  so it can never drift from the real source.
- Symlinks every top-level entry of the real repo root into
  `.katex-build/site/` **except** `content/` — so `config.toml`, `themes/`,
  `static/`, `sass/`, etc. are picked up live, with no copying and no
  re-sync step required when they change.
- Recursively walks the real `content/` tree (read-only) and writes a
  **transformed copy** into `.katex-build/site/content/`: Markdown files
  with KaTeX enabled (see precedence below) get their live `$...$` /
  `$$...$$` math spans replaced with pre-rendered KaTeX HTML; everything
  else (non-Markdown assets, pages without KaTeX enabled) is copied
  through unchanged.

The real `content/` directory is opened read-only and is never written to
by this script.

## Running it

```sh
npm install
npm run build   # runs scripts/render-katex.js, then `zola --root .katex-build/site build`
npm run serve   # same, but `zola --root .katex-build/site serve`
```

`npm run build`/`npm run serve` replaces bare `zola build`/`zola serve` as
the documented build command for this repo, because of the KaTeX demo
content (`content/blog/math-typesetting.md`). If a future site built on
Tapestry does not use `extra.katex` anywhere, bare `zola build` would still
technically work (the prebuild step is a no-op transform in that case), but
running it via `npm run build` is the supported path.

The scratch mirror is fully regenerated on every `prebuild` run — there is
no incremental/caching behavior. This keeps the pipeline simple and correct
at the cost of needing to re-run pre-rendering (and thus re-run
`katex.renderToString` for every math span) on every build. Given this
repo's fixture-sized content, that cost is negligible.

## KaTeX enablement precedence

Terminus's own Tera macro (`themes/terminus/templates/macros/config.html`,
`config_macros::get`) resolves a setting with this precedence: `page.extra[setting]` or `section.extra[setting]` or `ancestor.extra[setting]`
  or `config.extra[setting]` or default.

`scripts/render-katex.js` runs before Zola renders anything, so it has no
access to Zola's page/section/ancestor context. It approximates the same
precedence using the filesystem:

1. The page's own front matter `[extra] katex`, if present.
2. Else, its immediate parent directory's `_index.md` front matter
   `[extra] katex`, if present. (Terminus walks *all* ancestor sections;
   this repo's content fixtures are only one section level deep under
   `content/`, so checking the immediate parent is equivalent in practice.
   A deeper content tree would need this extended to walk all ancestors.)
3. Else, the root `config.toml`'s `[extra] katex`.
4. Else, disabled.

## Math scanning: fenced code blocks are never touched

`content/blog/math-typesetting.md` deliberately shows the raw `$$...$$`
source inside fenced ` ```tex ` code blocks as literal examples, immediately
followed by a live (non-fenced) copy meant to actually render. The script
splits each Markdown body into `code` and `text` segments by tracking
fenced code block open/close markers (three-or-more backticks or tildes,
matching Zola/pulldown-cmark's own fence-matching rule that the closing
fence must be at least as long as the opening one) before scanning for math
delimiters — only `text` segments are scanned. This was verified against
the real fixture: the ` ```tex ` blocks are byte-for-byte preserved, while
the live `$$...$$` copies directly below them are replaced with rendered
KaTeX HTML.

## Raw HTML passthrough into Zola's Markdown renderer

Zola's Markdown renderer (pulldown-cmark, CommonMark-compliant) passes raw
HTML through unescaped, but block-level vs. inline HTML placement matters:

- **Inline math** is wrapped as `<span class="katex-inline-wrapper">...`
  directly in place of the `$...$` span, inline within the surrounding
  paragraph text.
- **Display math** is wrapped as a standalone
  `<div class="katex-display-wrapper">...</div>` block, with a blank line
  emitted before and after it in the substituted Markdown. This is required
  for pulldown-cmark to recognize it as an HTML *block* (rendered as-is,
  outside any `<p>`) rather than inline HTML embedded inside a paragraph.

Both behaviors were verified with a minimal standalone Zola project (Zola
`0.22.1`, matching the pin in CONSTITUTION.md §3): a `<div>` wrapper without
surrounding blank lines got folded into the enclosing `<p>` tag by
pulldown-cmark; the same wrapper with blank lines above and below was
emitted as a sibling block, unwrapped. `scripts/render-katex.js` always
emits the blank-line form for display math.

**Still to verify once `themes/tapestry/` templates and Sass are complete**
(that work is in progress in parallel): a full `zola build`/`zola check`
run of this repo's actual `content/` + `themes/tapestry/` combination.
As of this writing, `zola build`/`zola check` fails in this repo **even
without any of the KaTeX tooling involved** — reproduced identically by
running bare `zola check` in the untouched repo root — with:

```sh
ERROR Failed to build the site
ERROR I/O error: No such file or directory (os error 2)
```

This is a pre-existing issue unrelated to this pipeline (most likely a
still-missing static asset or template reference from the in-progress
`themes/tapestry/` work), not something introduced by
`scripts/render-katex.js` or the scratch-mirror mechanism. The raw-HTML
passthrough assumption above was instead verified against a minimal
synthetic Zola project exercising the same wrapper markup, and should be
re-confirmed against the real site once the rest of `themes/tapestry/`
lands and `zola check`/`zola build` succeed at all.

## Adopting this in your own site

`package.json`, `package-lock.json`, and `scripts/render-katex.js` live at
this repo's root, not inside `themes/tapestry/` — deliberately. A Zola theme
is only what lives under `themes/<name>/`; this repo happens to be both
Tapestry's development repo *and* its own demo site, so root-level files are
site-level tooling, not theme package contents. If you add `tapestry` as a
theme to your own Zola project (e.g. as a git submodule under
`themes/tapestry/`, the same way this repo vendors `themes/terminus/`), you
will **not** automatically get this KaTeX pipeline, exactly as terminus's own
`syntaxes/monokai-classic.json` doesn't travel with `themes/terminus/` either
— terminus's README tells adopting sites to copy that file into their own
project root, and the same pattern applies here.

To get build-time KaTeX rendering in your own Tapestry-based site:

1. Copy `package.json` and `scripts/render-katex.js` from this repo into your
   own project root.
2. Run `npm install`.
3. Use `npm run build` / `npm run serve` in place of bare `zola build` /
   `zola serve`.
4. `themes/tapestry/static/css/katex.min.css` and
   `themes/tapestry/static/fonts/katex/` ship with the theme itself (unlike
   the pre-render script), so no extra copying is needed for those.

If your site never sets `extra.katex` anywhere, the prebuild step is a
no-op passthrough — copying the pipeline in is harmless even if unused, but
also entirely optional in that case.

## Files

- `package.json` — declares the `katex` dependency and the `prebuild`
  (`node scripts/render-katex.js`), `build`, and `serve` npm scripts.
- `scripts/render-katex.js` — the pre-rendering script itself; see the
  header comment in that file for the fullest inline explanation.
- `.katex-build/` — git-ignored scratch output; safe to delete at any time,
  regenerated on every `npm run build`/`serve`/`prebuild`.
