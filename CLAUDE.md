# CLAUDE.md

Operational memory for Claude Code working on **Tapestry** — a Zola theme derived from and backward-compatible with [terminus](https://github.com/ebkalderon/terminus), built for academic and industry researcher profile websites (research output, blog, projects, and other personal activities).

See @CONSTITUTION.md for non-negotiable design and compatibility standards. Read it before making any structural, visual, or compatibility decision — this file covers *how* to work; CONSTITUTION.md covers *what must always be true*.

## Project overview

- Static site theme for [Zola](https://www.getzola.org/).
- Base repo for the live site: [this repo](https://github.com/anirbanbasu/tapestry).
- Upstream theme being extended: terminus, pinned per the compatibility section of @CONSTITUTION.md.
- Working theme directory: `themes/tapestry/` (create if absent). Treat `themes/terminus/` as a read-only reference — never edit it in place.

## Build & preview commands

- `zola build` — build the site into `public/`. Run after any template or config change to catch Tera errors early.
- `zola serve` — local dev server with live reload, default at `http://127.0.0.1:1111`.
- `zola check` — validates internal/external links and Markdown syntax without a full build. Run before considering a task done.
- `zola --version` — confirm the installed Zola version matches what's pinned in @CONSTITUTION.md before relying on any Zola/Tera feature.

## Verification workflow

1. Build the current terminus-based site and the in-progress Tapestry version against the **same** `content/` fixtures.
2. Diff rendered HTML for pages that exercise shortcodes/config keys listed in the compatibility contract (see @CONSTITUTION.md, §3).
3. Before opening a PR that touches `themes/tapestry/**`, `content/warp-and-weft/**`, `tests/**`, or `config.toml`, run the automated suite locally: `cd tests/visual-a11y && npm test` (requires a `zola build --base-url http://127.0.0.1:1111` first — see `tests/visual-a11y/playwright.config.ts`'s `webServer`). This runs the axe-core accessibility sweep, the screenshot regression diff, and the keyboard-only interaction checks documented in `docs/superpowers/specs/2026-07-11-visual-a11y-test-suite-design.md`. The same suite runs in CI (`.github/workflows/visual-a11y-tests.yaml`) on every such PR.
4. Use the Playwright MCP server for ad-hoc, exploratory screenshot checks outside the fixed `warp-and-weft` test set (e.g. spot-checking real `content/` pages) — the automated suite is the gate; the MCP server remains useful for one-off visual investigation it doesn't cover.
5. A manual keyboard-only pass is still required before merge (CONSTITUTION.md §1) — tracked as a checklist item in `.github/pull_request_template.md`, since a genuinely manual step can't be a CI gate.

## Design prototyping workflow

- Early-stage design decisions (palette, type scale, spacing, font pairing) should be explored as standalone style tiles under `prototypes/style-tiles/` — small, self-contained HTML/CSS files rendering a fixed set of sample components (headings, body text, blockquote, code block, links, nav, post-list item, tags, footer). Do not prototype directly inside `themes/tapestry/`.
- Do not wire a style tile into the real theme until it has been explicitly approved.
- Once a direction is approved, extract its concrete values (hex codes, type scale ratio, spacing scale, font stack with fallbacks) into @CONSTITUTION.md as frozen design tokens — that becomes the real spec for implementation.

## Repository conventions

- Templates: Tera, under `themes/tapestry/templates/`.
- Styles: mirror terminus's build pipeline (Sass/SCSS) unless @CONSTITUTION.md says otherwise. Compiled CSS is a build artifact — never hand-edit it.
- Content fixtures used for testing/diffing: `content/`. Do not delete or restructure without checking impact on the live site.
- Config: `config.toml`. New keys should be additive. Never repurpose an existing terminus key with different meaning without recording the change in the compatibility contract (`specs/terminus-compat-contract.md`).

## What to always do

- Re-read @CONSTITUTION.md before any decision touching accessibility, JavaScript, fonts, or terminus compatibility.
- If a request conflicts with @CONSTITUTION.md, flag the conflict explicitly instead of silently overriding it or silently complying.
- Keep operational instructions (this file) separate from non-negotiable constraints (CONSTITUTION.md). New non-negotiables belong in CONSTITUTION.md, not here.
