# Visual & accessibility test suite — design and maintenance

Frozen specification per [CONSTITUTION.md](../CONSTITUTION.md) §1
(accessibility) and §8 (design tokens' WCAG AA requirement). This document
records why the suite under `tests/visual-a11y/` is shaped the way it is, and
how to keep it in sync as presentation styles/variants/pages are added.
Referenced from [CLAUDE.md](../CLAUDE.md)'s Verification workflow.

- **Approved:** 2026-07-11.
- **Implemented:** 2026-07-11, merged to `master`.

## Purpose

Tapestry ships 5 presentation style groups × 5 variants each (25 combinations),
each requiring light and dark mode (50 permutations total), plus a 12-column
responsive grid, a no-JS nav collapse, and a self-imposed WCAG 2.1 AA bar
(CONSTITUTION.md §1). Before this suite existed there was no automated
verification of any of this — only `zola build`/`zola check` and manual
Lighthouse runs. This suite is an automated visual-regression and
accessibility test suite that runs as a GitHub Actions workflow, gating
changes to the theme.

## 1. Test matrix scope

Running all 50 style/variant/mode permutations through both an accessibility
sweep and pixel-diff screenshots, across every page and viewport, would
produce thousands of screenshots and an unworkably slow CI job. Coverage is
split by cost:

- **Accessibility (axe-core):** all **50 permutations** (25 variants × 2
  modes). Axe checks are cheap, fast (no baseline images to maintain), and
  their assertions (contrast, landmarks, heading order, ARIA state) are
  tolerant of routine content edits — unlike pixel screenshots.
- **Visual regression (screenshot diffing):** only the **5 default variants**
  (one per group) × 2 modes = **10 permutations**. Pixel diffing requires
  stable, controlled content (see §2) to avoid false failures from unrelated
  edits, so it is not extended to all 25 variants.

## 2. Content fixtures

No real content page exercised the "no sidebar" or "custom sidebar" states
required by CONSTITUTION.md §5 (every real page has ≥2 headings and no
`page.extra.sidebar` override, so only the auto-TOC state was ever exercised).
Beyond that gap, real demo content (`about.md`, blog posts) is expected to
change over time for reasons unrelated to the theme, which would otherwise
make the test suite fragile (either flaky pixel diffs, or — if a page is
renamed/removed — tests failing by looking for something that no longer
exists).

**Decision:** a dedicated, test-owned fixture section, `content/warp-and-weft/`,
fully decoupled from real demo content:

```text
content/warp-and-weft/
├── _index.md                        section landing (section.html)
├── everything/
│   ├── index.md                     every markdown construct + every
│   │                                shortcode + KaTeX; ≥2 headings so it
│   │                                also covers the auto-TOC sidebar state
│   └── example-hi-res-image.jpg     colocated asset for responsive_image
│                                    (requires a genuine Zola page bundle —
│                                    a bare leaf .md file cannot have
│                                    colocated assets; page.colocated_path
│                                    is only populated for `<slug>/index.md`
│                                    bundles)
├── no-sidebar.md                    ≥2 headings but extra.sidebar = false —
│                                    exercises the forced-off override branch
│                                    specifically (distinct from just having
│                                    <2 headings)
├── custom-sidebar.md                extra.sidebar points at the snippet
│                                    below; also has ≥2 headings so custom
│                                    content and auto-TOC render together
├── custom-sidebar-snippet.txt       colocated snippet, non-.md extension
│                                    deliberately — Zola only special-cases
│                                    `_index.md`; any other `*.md` file,
│                                    even underscore-prefixed, is still
│                                    parsed as its own page. `load_data`
│                                    (format="plain") is extension-agnostic,
│                                    and the `markdown` filter renders it
│                                    regardless of file extension.
└── archive-view/
    └── _index.md                    template = "archive.html",
                                     extra.section_path = "warp-and-weft/_index.md"
                                     — archive.html is applied via front-matter
                                     template override on an _index.md (it
                                     extends section.html and reads
                                     section.pages / section.extra.section_path),
                                     so it must be its own nested section, not
                                     a leaf page. This permanently owns
                                     archive.html template coverage, immune to
                                     whatever happens to the real /archive/.
```

All fixture pages carry `tags = ["test-fixture"]`, giving a stable
`/tags/test-fixture/` taxonomy-single URL as well.

A `warp-and-weft` entry was added to `main_menu` in `config.toml`, pointing at
the section landing (`/warp-and-weft/`), which itself lists its children via
the normal `section.html` post-excerpt loop.

## 3. Final page/URL set

Used consistently for both the a11y sweep and (where noted) the
visual-regression set. Every URL here is either **config-guaranteed** (exists
as long as basic config.toml settings don't change) or **test-owned**
(exists as long as the test suite's own fixtures exist) — never contingent on
real demo-content decisions like renaming or removing `/blog/` or `/about`.

| URL | Template | In a11y sweep | In visual regression |
|---|---|---|---|
| `/` | `index.html` | ✅ | ✅ |
| `/warp-and-weft/` | `section.html` | ✅ | ✅ |
| `/warp-and-weft/everything/` | `page.html` (auto-TOC) | ✅ | ✅ |
| `/warp-and-weft/no-sidebar/` | `page.html` (forced off) | ✅ | ✅ |
| `/warp-and-weft/custom-sidebar/` | `page.html` (custom+auto-TOC) | ✅ | ✅ |
| `/warp-and-weft/archive-view/` | `archive.html` | ✅ | ✅ |
| `/tags/test-fixture/` | `taxonomy_single.html` | ✅ | ✅ |
| `/this-page-intentionally-does-not-exist/` | `404.html` | ✅ | ✅ |
| `/tags/` | `taxonomy_list.html` | ✅ | ❌ (content volume can drift as tags are added; URL itself is config-guaranteed via the `tags` taxonomy declaration, so it's safe for a11y, not for pixel diffs) |

Real-content pages (`/about`, `/blog/`, `/archive/`) are deliberately **not**
in either set — both because their content is expected to change for reasons
unrelated to the theme, and because they could be renamed or removed
entirely, which would make a test suite depending on them fail by looking for
something nonexistent rather than by finding a real regression.

## 4. Tooling stack

**Playwright + `@axe-core/playwright`**, scoped entirely to a subdirectory:
`tests/visual-a11y/` with its own `package.json`, `package-lock.json`, and
`node_modules`. This is the standard, most mature combination for this exact
job (first-class screenshot diffing via `toHaveScreenshot()`, first-class
axe-core integration, trace viewer, large ecosystem).

This reintroduces an npm dependency into the repo, which is worth flagging
explicitly: a past CONSTITUTION amendment (2026-JUL-05-001) deliberately
*removed* npm/`package.json` from the repo root, because a build-time KaTeX
pipeline gated behind a separate `npm run build` entry point broke the
discoverability of the obvious `zola build`/`zola serve` commands. That
concern does not apply here — this is CI-only test tooling that never gates
or participates in the actual site build. Root `zola build`/`zola serve`
remain completely unaffected and un-aware that `tests/visual-a11y/` exists.

Isolation mechanics for CI (standard, well-supported — this is how JS
monorepos scope CI to a subdirectory routinely):

- Every step in the test job uses `working-directory: tests/visual-a11y`.
- `actions/setup-node`'s `cache-dependency-path` points at
  `tests/visual-a11y/package-lock.json`.
- `npm ci` and `npx playwright install --with-deps chromium` run scoped to
  that directory.
- A separate step builds the Zola site (`zola build`) and serves the
  `public/` output locally for Playwright to point its `baseURL` at.

## 5. Screenshot baseline strategy

- **Location:** `tests/visual-a11y/screenshots/<page-slug>/<style>-<variant>-<mode>-<width>.png`,
  via a custom Playwright `snapshotPathTemplate` (not the noisier
  per-spec-file default).
- **Resolution:** full-page screenshots (not viewport-cropped, to catch
  everything below the fold without guessing a fixed height) at the 4 fixed
  widths from §3's implicit viewport set: **320px** (minimum supported width,
  CONSTITUTION.md §5), **768px** (tablet), **1280px** (common desktop),
  **1440px** (confirms the 1200px max-width cap, CONSTITUTION.md §5, holds on
  wide screens). 1× device scale factor only — no retina/2× axis, to keep the
  matrix tractable. Chromium only — cross-browser rendering parity isn't the
  risk being guarded against; pixel drift between runs is.
- **Creation/update mechanism:** baselines are **never generated locally**.
  Playwright embeds the OS platform into snapshot filenames by default, and
  font rendering genuinely differs between a contributor's Mac and the Linux
  CI runner — generating locally and comparing in CI would fail on day one
  from rendering drift alone, not real regressions. Playwright's own default
  `updateSnapshots` mode (`"missing"`) is overridden to `"none"` in
  `tests/visual-a11y/playwright.config.ts` specifically to enforce this — a
  missing baseline just fails locally, like any other assertion. Instead, a
  manually-triggered `workflow_dispatch` GitHub Actions job
  (`.github/workflows/update-visual-baselines.yaml`) runs on `ubuntu-latest`
  with the pinned Playwright version, runs `playwright test
  --update-snapshots` (which overrides the config default), and opens a PR
  with the new/changed PNGs for human review before merge. CI is the single
  source of truth for what a baseline looks like.
- **Diff tolerance:** `maxDiffPixelRatio` defaults to approximately `0.01`, to
  absorb anti-aliasing noise while still catching real regressions. Revisit
  if it proves too loose/tight once the suite is running against real
  content.

## 6. Keyboard-only pass automation

Full automation is achievable because this theme's entire interactive surface
is small, fixed, and enumerable (unlike a general web application): the theme
switcher, the nav collapse, the style-switcher accordion+menu, and ordinary
links/TOC anchors. Automated coverage (`tests/visual-a11y/tests/keyboard.spec.ts`):

- Tab reachability and order (`Tab`/`Shift+Tab`, recording
  `document.activeElement`)
- Operability: Enter/Space activation, Esc-to-close, native
  `<details name="...">` exclusive-accordion mechanics, `popover`/
  `popovertarget` behavior
- No keyboard traps — forward N tabs and backward N shift-tabs must produce
  exactly mirrored focus sequences (not merely "ended up somewhere
  plausible"), confirming no smaller sub-loop trapped focus along the way
- ARIA state sync (`aria-pressed`, `aria-expanded`) as keyboard interaction
  happens
- Focus-visible presence (computed `outline`/`box-shadow` actually changes on
  `:focus-visible` and isn't `none`)
- **Focus-ring contrast**, computed live from each variant/mode's actual
  computed `--colour-accent-primary`/`--colour-bg-primary` CSS custom
  properties via `tests/visual-a11y/lib/contrast.ts`'s WCAG relative-luminance
  math — this is the one dimension usually left to humans industry-wide
  (WCAG SC 1.4.11 non-text contrast), but it doesn't require visual judgment
  when the token set is closed and known.

CONSTITUTION.md §1 explicitly requires "a manual keyboard-only pass," and
this suite does not amend that clause. Instead, the automated suite above
covers everything §1 substantively cares about (keyboard-navigable, visible
focus states), and the literal manual-pass requirement is satisfied by a
lightweight human checkpoint that lives outside CI: a
`.github/pull_request_template.md` checklist item ("Performed a manual
keyboard-only spot-check...") ticked before merge. A genuinely manual step
cannot be a CI gate regardless, so this checkpoint was always going to live
in the PR-review process rather than the workflow file.

## 7. CI shape

`.github/workflows/visual-a11y-tests.yaml`, separate from the existing
deploy-only `publish.yaml` (which stays triggered on `push` to `master` for
GitHub Pages deployment and is out of scope for this suite).

- **Trigger:** `pull_request` targeting `master`, path-filtered to
  `themes/tapestry/**`, `content/warp-and-weft/**`, `tests/**`, and
  `config.toml`. Skips the expensive matrix for changes that touch none of
  these (e.g. README edits, real blog posts), while still gating every
  theme-relevant PR.
- **Jobs:**
  1. Fast-fail gate: `zola check` (link/Markdown validation) — cheap, runs
     first, fails fast before the expensive matrix starts.
  2. Shared build: `zola build`, uploads `public/` as a workflow artifact —
     built once, reused by every downstream job rather than rebuilt 5×.
  3. Test matrix, **sharded by presentation-style group** (`scholarly`,
     `creative`, `natural`, `precision`, `collective` — 5 parallel jobs).
     Each job downloads the shared `public/` artifact, serves it locally, and
     runs its slice of both the a11y sweep (5 variants × 2 modes × 9 pages
     from §3's a11y column, all 9 rows) and the visual-regression set (its 1
     default variant × 2 modes × 8 pages from §3's visual column × 4 widths).
     This maps 1:1 onto the domain model, so a failure reads as "collective
     group failed," not "shard 3/8 failed."
  4. On failure: Playwright HTML report uploaded as an artifact for review.
- **Baseline updates:** a separate `workflow_dispatch`-triggered job (see §5)
  — not part of the PR-triggered workflow above.
- **Branch protection:** once the workflow has a green run, `master`'s branch
  protection should be updated via `gh api` to require this workflow's job(s)
  as required status checks before merge. This is a repo-wide setting
  affecting everyone's merge flow, so it is a deliberate follow-up action, not
  something this suite changes on its own.

## Explicitly out of scope

- Performance/Lighthouse checks (the original ask was "visual and
  accessibility"; Lighthouse reports already exist as a separate manual
  process under `lighthouse-reports/`).
- Cross-browser testing beyond Chromium.
- Retina/2× device-scale-factor screenshots.
- A full screen-reader/assistive-technology pass (a stronger bar than
  "keyboard-only," and not separately mandated by CONSTITUTION.md §1).

## Maintenance

The 5 groups, their variants/default-variant, and the 9 fixture-page URLs
(§3's table) are declared exactly once, in
`tests/visual-a11y/fixtures/permutations.ts` — `a11y.spec.ts`,
`visual.spec.ts`, and `keyboard.spec.ts` all import from it, so adding a
variant, group, or fixture page is a one-file edit rather than three. The CI
shard matrix in `.github/workflows/visual-a11y-tests.yaml`
(`strategy.matrix.group`) is the one place still hand-maintained separately
from that module, since GitHub Actions matrices can't import TypeScript —
keep it in sync by hand when a group is added or removed (capped at 5 per
CONSTITUTION.md §7, so this list changes rarely).

- **Design tokens or fixture content change (colours, fonts, spacing,
  `content/warp-and-weft/**` markup):** re-run the
  `update-visual-baselines.yaml` `workflow_dispatch` job (§5). It rebuilds,
  regenerates only the screenshot PNGs, and opens a PR containing just the
  diffed images for human review — never regenerate baselines locally
  (Mac/Linux font rendering drift produces false diffs). The axe-core sweep
  and keyboard checks need no baseline update; they simply pass or fail
  against the new state.
- **New presentation style group or variant added:** add it to
  `fixtures/permutations.ts`'s `STYLE_GROUPS` (this alone updates
  `a11y.spec.ts` and `keyboard.spec.ts` automatically, and adds it to
  `visual.spec.ts` if it's a new group's default variant), add the group name
  to the CI matrix in `visual-a11y-tests.yaml` if it's a new group, then run
  the baseline-update workflow to create that variant's initial screenshots.
- **New fixture page added:** add it to `fixtures/permutations.ts`'s `PAGES`
  array with the appropriate `inA11ySweep`/`inVisualRegression` flags. No
  other file needs editing.

## Known open issue

The first full run of the a11y sweep found 127 of 450 test cases failing with
genuine, pre-existing WCAG AA colour-contrast violations in `themes/tapestry`
(at least two distinct root causes: `code` element text colour against its
background in `_main.scss`, and the footer `.copyright` text colour against
`--colour-bg-primary`, across many of the 25 variants in both modes). This is
the suite correctly doing its job, not a defect in the suite — it is tracked
as a separate, not-yet-scheduled remediation task, following the CONSTITUTION.md
§8 process for re-verifying colour tokens.

---
