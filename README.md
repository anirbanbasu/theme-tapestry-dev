# Tapestry

[![Visual & accessibility tests](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/visual-a11y-tests.yaml/badge.svg)](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/visual-a11y-tests.yaml) [![Build and deploy Zola website](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/publish.yaml/badge.svg)](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/publish.yaml) [![Publish theme](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/publish-theme.yaml/badge.svg)](https://github.com/anirbanbasu/theme-tapestry-dev/actions/workflows/publish-theme.yaml)

Tapestry is a theme for the Zola static site generator.

This is the **development monorepo**. If you're looking to install Tapestry
as a theme for your own Zola site, see
[themes/tapestry/README.md](themes/tapestry/README.md) instead — that
directory is what gets published as the standalone, submodule-installable
[`anirbanbasu/tapestry`](https://github.com/anirbanbasu/tapestry) repository.

## What this repo is

This repository serves two purposes at once:

- It builds and deploys the live Tapestry demo site directly (see
  [`.github/workflows/publish.yaml`](.github/workflows/publish.yaml)), using
  the `content/` fixtures and `config.toml` committed here.
- It is the source of truth for the theme itself, developed under
  `themes/tapestry/`. On every tagged release,
  [`.github/workflows/publish-theme.yaml`](.github/workflows/publish-theme.yaml)
  syncs just that directory out to the separate
  [`anirbanbasu/tapestry`](https://github.com/anirbanbasu/tapestry) repo,
  which is what end users add as a Git submodule.

Day-to-day theme development happens here, in `themes/tapestry/**`; nothing
in the standalone theme repo should be edited directly.

Try the live demo (built from this repo's `content/` and `config.toml`):

- [https://ghp-tapestry.netlify.app](https://ghp-tapestry.netlify.app)
- [https://ghp-tapestry.anirbanbasu.com](https://ghp-tapestry.anirbanbasu.com)

## Repository layout

- `themes/tapestry/` — the theme itself (Tera templates, Sass, static
  assets). This is what gets published to the standalone theme repo.
- `themes/terminus/` — the upstream theme Tapestry is derived from, kept as
  a read-only reference. Never edited in place.
- `content/` — content fixtures used both for testing/diffing and as the
  actual content of the live demo site.
- `specs/` — frozen, checked-in contracts: the terminus compatibility
  contract, per-style-group design tokens, the brand logo spec, the
  presentation style switcher spec, the visual/a11y test suite spec, and
  third-party asset licenses.
- `prototypes/` — early-stage design exploration (style tiles, logo
  concepts). Never wired into the live theme directly; a direction is only
  adopted once its tokens are frozen into `specs/`.
- `tests/visual-a11y/` — the Playwright + axe-core accessibility, visual
  regression, and keyboard-navigation test suite.
- `.github/workflows/` — CI/CD: build & deploy the demo site, publish the
  theme on tag push, run the visual/a11y suite on relevant PRs, and update
  visual regression baselines on demand.

`CLAUDE.md` and `CONSTITUTION.md` are the operational and non-negotiable
design/compatibility references for anyone working in this repo — read
`CONSTITUTION.md` before any change touching accessibility, JavaScript,
fonts, or terminus compatibility.

## Quick start

Confirm your local Zola version matches the pin in `CONSTITUTION.md` §3
before relying on any Zola/Tera feature:

```bash
zola --version   # expect 0.22.1
zola build       # build the site into public/
zola serve       # local dev server with live reload, http://127.0.0.1:1111
zola check       # validate internal/external links and Markdown, no full build
```

A [`justfile`](justfile) wraps the more involved workflows:

| Recipe | What it does |
|---|---|
| `just serve` | `zola serve` with a friendly banner. |
| `just install-pre-commit-hooks` | Installs the repo's pre-commit hooks via `prek`. |
| `just pre-commit-update` | Updates pinned pre-commit hook versions via `prek`. |
| `just visual-a11y-tests-local [groups]` | Runs `zola check`, builds the site, and runs the accessibility, visual, and keyboard suites for the given presentation style groups (defaults to all five). Mirrors what CI runs. |
| `just update-visual-baselines-local` | Regenerates visual regression screenshot baselines locally. Intended for testing the script only — font rendering varies across machines, so real baseline updates should go through the `update-visual-baselines.yaml` GitHub Actions workflow instead. |

## Testing

Before opening a PR that touches `themes/tapestry/**`, `content/**`,
`tests/**`, or `config.toml`, run the automated suite
(`just visual-a11y-tests-local`, or see CLAUDE.md's verification workflow
for the manual step-by-step). It runs an axe-core accessibility sweep,
screenshot regression diffing, and keyboard-only interaction checks across
every presentation style group — full spec in
[`specs/visual-a11y-test-suite.md`](specs/visual-a11y-test-suite.md). The
same suite runs in CI on every such PR
([`.github/workflows/visual-a11y-tests.yaml`](.github/workflows/visual-a11y-tests.yaml)).

A manual keyboard-only pass is still required before merge — tracked as a
checklist item in
[`.github/pull_request_template.md`](.github/pull_request_template.md),
since it can't be fully automated in CI.

## Contributing

Contributions to the theme are welcome — see `CONSTITUTION.md` for the
non-negotiable standards any change must meet (WCAG 2.1 AA, the no-JS
policy and its three sanctioned exceptions, terminus compatibility
pinning, self-hosted fonts, the 12-column grid, and navigation collapse).

1. Run `just install-pre-commit-hooks` once, after cloning.
2. Make your change under `themes/tapestry/**` (or `content/**`/`specs/**`
   as appropriate).
3. Run the quick start commands above, then the test suite.
4. Open a PR against `master` using the checklist in
   [`.github/pull_request_template.md`](.github/pull_request_template.md).

## Credits and third-party assets

This theme uses the following components:

- **Theme:** Based on [terminus](https://github.com/ebkalderon/terminus) for
  [Zola](https://www.getzola.org/).
- **Fonts:** Self-hosted WOFF2 files, vendored from
  [Google Fonts](https://fonts.google.com/) as an upstream source only —
  never loaded at runtime from a CDN (see `CONSTITUTION.md` §4).
- **Icons and other vendored assets:** Font Awesome Free (theme-switcher
  sun/moon icons, presentation style switcher gear icon) and an Openclipart
  paw print icon. Full attribution and license terms for every vendored
  asset are tracked in
  [specs/third-party-licenses.md](specs/third-party-licenses.md).

## License

This project is licensed under the terms of the [MIT license](LICENSE).
