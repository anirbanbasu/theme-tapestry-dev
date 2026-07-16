# Design tokens — Collective

Frozen design-token reference for the **collective** presentation style group, per [CONSTITUTION.md](../CONSTITUTION.md) §8. One section per variant below.

**Status of this document:** fonts, colour palettes (light + dark, contrast-verified), spacing scale, type scale, border radius, and shadows are frozen and ready for implementation — these were fully specified and numerically verified during prototyping (see each variant's prototype file for the contrast-ratio workings). **Grid sub-desktop breakpoints and the navigation-collapse breakpoint/treatment are now resolved**, via the shared technical spikes at `prototypes/spikes/responsive-grid-spike.html` and `prototypes/spikes/nav-collapse-spike.html` (both verified in-browser at multiple viewport widths, including 320px). These are shared, group-agnostic mechanism values applied uniformly across every group/variant — only each variant's own colour/spacing/font tokens (above) vary per style. **The article/sidebar column split below is content-driven**, per the CONSTITUTION.md §5 amendment of 2026-07-05: the sidebar (and the article's narrower 1–8 span) only appear when the page actually has an automatic TOC or custom `page.extra.sidebar` content to show — see `themes/tapestry/templates/partials/sidebar.html`.

**Default variant for this group:** `cartographers-atlas` (CONSTITUTION.md §7). Used when `extra.presentation_style` is `"collective"` and `extra.presentation_variant` is unset or names a variant that doesn't exist within this group. Note this does not change Tapestry's theme-wide default group+variant (`scholarly`/`contemporary-research-lab`, CONSTITUTION.md §7) — it only applies once `collective` has been explicitly selected as the style.

*Correction (implementation planning, 2026-07-11): this line originally read "not yet designated" — CONSTITUTION.md §7 requires every group to name a default variant, and that choice had not been made when this document was drafted. Resolved to `cartographers-atlas` during implementation planning.*

## Variants

- [Cartographers Atlas](#cartographers-atlas)
- [Ledger Index](#ledger-index)
- [Social Network Diagram](#social-network-diagram)
- [Agora Classical Philosophy](#agora-classical-philosophy)
- [Strata Geology](#strata-geology)

---

### Cartographers Atlas

*Prototype source: `prototypes/style-tiles/collective-01-cartographers-atlas.html` · Example persona: Prof. Ingrid Vance*

Aged-map parchment with a faint concentric contour-line texture, a compass-rose glyph marking each post, coordinate-style monospace metadata. Terrain green and ocean blue as the two accents, in a cool cartographic blue-grey palette deliberately distinct from the group's warmer earth-toned variants. Suits human geography, cartography, and spatial-analysis researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Domine | 400/700 | Georgia, "Times New Roman", serif |
| Body | Noto Serif | 400/500 | Georgia, serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#e8edf0` | `#101823` |
| `--colour-bg-secondary` | `#dbe3e8` | `#182430` |
| `--colour-text-primary` | `#1c2833` | `#e6edf0` |
| `--colour-text-heading` | `#12191f` | `#f5f8fa` |
| `--colour-text-muted` | `#536570` | `#9aabb8` |
| `--colour-accent-primary` | `#245c3f` | `#6fc99a` |
| `--colour-accent-secondary` | `#1f4e73` | `#6fa8d9` |
| `--colour-border` | `#c9d5db` | `#233242` |
| `--colour-code-bg` | `#dbe3e8` | `#182430` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#556873`: that value was only 4.47:1 against `--colour-code-bg` — the background `.sidebar-toc-title`/figcaption (`themes/tapestry/sass/css/_sidebar.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#536570` keeps the same slate-blue hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.82rem` |
| `--line-height-heading` | `1.2` |
| `--line-height-body` | `1.7` |

**Spacing scale**

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |

**Border radius & shadows**

| Token | Value |
|---|---|
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-sm` | `0 2px 8px rgba(28, 40, 51, 0.14)` |
| `--shadow-md` | `0 8px 22px rgba(28, 40, 51, 0.18)` |

*Correction (implementation planning, 2026-07-11): the shadow rgba above originally read `rgba(46, 42, 28, ...)`, a warm brown that matches neither this variant's `--colour-text-primary` (`#1c2833` → `rgb(28,40,51)`) nor `--colour-text-heading` (`#12191f` → `rgb(18,25,31)`) — inconsistent with this variant's own "cool cartographic blue-grey palette" and with the derivation pattern used everywhere else (every other variant in every group ties its shadow rgb to its own `text-primary`/`text-heading` value). It appears to have been carried over from a warm-toned variant during drafting. Resolved to `rgba(28, 40, 51, ...)`, derived from this variant's own `--colour-text-primary`, consistent with the rest of the group.*

**Decorative background pattern (§8)** — a faint concentric contour-line texture (`repeating-radial-gradient`, offset toward the upper-left), evoking topographic map contours. 0.07 alpha in both modes, well under the §8 0.15 ceiling.

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | `repeating-radial-gradient(circle at 15% 20%, transparent 0, transparent 26px, rgba(36, 92, 63, 0.07) 27px, transparent 28px)` | `repeating-radial-gradient(circle at 15% 20%, transparent 0, transparent 26px, rgba(111, 168, 217, 0.07) 27px, transparent 28px)` |
| `--pattern-bg-size` | `auto` (the gradient repeats via its own ring geometry) | `auto` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Ledger Index

*Prototype source: `prototypes/style-tiles/collective-02-ledger-index.html` · Example persona: Dr. Marcus Feldstein*

Accounting-ledger ruled paper, tabular monospace figures throughout metadata, a crisp bond-paper white in light mode with a saturated gold and emerald palette recalling banknotes and ledger covers, deliberately brighter/whiter than the group's other warm-cream variants, a small ticker-style indicator for headline numbers. Suits economics, financial-markets, and quantitative-policy researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Bitter | 600/700 | Georgia, "Times New Roman", serif |
| Body | IBM Plex Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f8f7f4` | `#0d1510` |
| `--colour-bg-secondary` | `#ece8de` | `#162019` |
| `--colour-text-primary` | `#16211a` | `#eee7d6` |
| `--colour-text-heading` | `#0c140f` | `#f7f4e6` |
| `--colour-text-muted` | `#5c6a5f` | `#a3ab9a` |
| `--colour-accent-primary` | `#836215` | `#d9ab52` |
| `--colour-accent-secondary` | `#164d33` | `#6fbf94` |
| `--colour-border` | `#ddd6c4` | `#233428` |
| `--colour-code-bg` | `#ece8de` | `#162019` |

`--colour-accent-primary` (light) corrected 2026-07-16 from the original `#8a6817`: that value was only 4.21:1 against `--colour-code-bg` — the background inline `code` (`themes/tapestry/sass/css/_main.scss`) actually pairs it with — below the 4.5:1 AA floor this table claims. `#836215` keeps the same gold hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.6rem` |
| `--font-size-h2` | `1.55rem` |
| `--font-size-h3` | `1.15rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.2` |
| `--line-height-body` | `1.6` |

**Spacing scale**

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |

**Border radius & shadows**

| Token | Value |
|---|---|
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-sm` | `0 2px 6px rgba(15, 26, 19, 0.12)` |
| `--shadow-md` | `0 8px 20px rgba(15, 26, 19, 0.16)` |

**Decorative background pattern (§8)** — ruled-ledger horizontal rule lines (`linear-gradient`, 30px row height) echoing accounting-ledger paper. Light mode reuses `--colour-border` directly (a solid, not an alpha-blended colour — visually equivalent to a printed rule); dark mode uses an explicit 0.09-alpha gold to keep the ledger-gold identity, under the §8 0.15 ceiling.

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | `linear-gradient(var(--colour-border) 1px, transparent 1px)` | `linear-gradient(rgba(217, 171, 82, 0.09) 1px, transparent 1px)` |
| `--pattern-bg-size` | `100% 30px` | `100% 30px` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Social Network Diagram

*Prototype source: `prototypes/style-tiles/collective-03-social-network-diagram.html` · Example persona: Dr. Aaliyah Johnson*

A node-and-edge network graph rendered faintly behind the page, pill-shaped tags standing in for graph nodes, a small "○—○" glyph marking section headings. Warm coral and analytical teal as the two "tie" colours. Suits sociology, social-network analysis, and organisational-behaviour researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Outfit | 600/700 | "Segoe UI", Helvetica, Arial, sans-serif |
| Body | Hanken Grotesk | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | JetBrains Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#faf6f2` | `#1c1815` |
| `--colour-bg-secondary` | `#f0e7dd` | `#241f1a` |
| `--colour-text-primary` | `#2a2420` | `#f2ece4` |
| `--colour-text-heading` | `#181410` | `#fbf7f2` |
| `--colour-text-muted` | `#6b5f54` | `#b8ac9e` |
| `--colour-accent-primary` | `#b0442c` | `#e88a6c` |
| `--colour-accent-secondary` | `#1f6b6b` | `#5fc9c4` |
| `--colour-border` | `#e2d4c6` | `#362e26` |
| `--colour-code-bg` | `#f0e7dd` | `#241f1a` |

`--colour-accent-primary` (light) corrected 2026-07-16 from the original `#b8472e`: that value was only 4.31:1 against `--colour-code-bg` — the background inline `code` (`themes/tapestry/sass/css/_main.scss`) actually pairs it with — below the 4.5:1 AA floor this table claims. `#b0442c` keeps the same rust hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.6rem` |
| `--font-size-h2` | `1.5rem` |
| `--font-size-h3` | `1.15rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.15` |
| `--line-height-body` | `1.65` |

**Spacing scale**

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |

**Border radius & shadows**

| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `14px` |
| `--shadow-sm` | `0 2px 8px rgba(42, 36, 32, 0.1)` |
| `--shadow-md` | `0 10px 24px rgba(42, 36, 32, 0.14)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Agora Classical Philosophy

*Prototype source: `prototypes/style-tiles/collective-04-agora-classical-philosophy.html` · Example persona: Prof. Dimitrios Kallistos*

Marble-and-column restraint: an inscriptional display face for headings, centred double-rule blockquotes styled like carved dialogue, small-caps epigraphy-style metadata. Terracotta and aged-bronze verdigris as the two accents. Suits philosophy, classics, and history-of-ideas researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Marcellus | 400 (single weight) | Georgia, "Times New Roman", serif |
| Body | PT Serif | 400/700 | Georgia, "Times New Roman", serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f2efe9` | `#1c1c1a` |
| `--colour-bg-secondary` | `#e6e0d4` | `#262624` |
| `--colour-text-primary` | `#2b2a28` | `#ede9e0` |
| `--colour-text-heading` | `#171614` | `#faf7f0` |
| `--colour-text-muted` | `#65625d` | `#b3ada0` |
| `--colour-accent-primary` | `#a8432b` | `#d97a5f` |
| `--colour-accent-secondary` | `#3f6b5c` | `#7fada0` |
| `--colour-border` | `#d6cfbf` | `#37372f` |
| `--colour-code-bg` | `#e6e0d4` | `#262624` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#6b6862`: that value was only 4.22:1 against `--colour-code-bg` — the background `.sidebar-toc-title`/figcaption (`themes/tapestry/sass/css/_sidebar.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#65625d` keeps the same warm-grey hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.25` |
| `--line-height-body` | `1.7` |

**Spacing scale**

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |

**Border radius & shadows**

| Token | Value |
|---|---|
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-sm` | `0 2px 8px rgba(23, 22, 20, 0.12)` |
| `--shadow-md` | `0 8px 20px rgba(23, 22, 20, 0.16)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Strata Geology

*Prototype source: `prototypes/style-tiles/collective-05-strata-geology.html` · Example persona: Dr. Freya Lindqvist*

A layered sediment-core rule marks each post like a stratigraphic column, era-style labelling for metadata, a rust-and-neutral-slate earth-tone palette on a warm stone-grey ground — deliberately greyer and less yellow than the group's other cream-paper variants, and the slate here is desaturated (near-neutral grey) rather than blue, unlike the Cartographer's Atlas variant. Suits geology, sedimentology, and earth-systems-science researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Zilla Slab | 600/700 | Georgia, "Times New Roman", serif |
| Body | Public Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#e6e0d5` | `#1f160f` |
| `--colour-bg-secondary` | `#d9d0be` | `#2a2015` |
| `--colour-text-primary` | `#2e2015` | `#ece2cf` |
| `--colour-text-heading` | `#1c130b` | `#f7efdf` |
| `--colour-text-muted` | `#625747` | `#b3a68f` |
| `--colour-accent-primary` | `#943f16` | `#d98a56` |
| `--colour-accent-secondary` | `#505962` | `#9aa3ab` |
| `--colour-border` | `#cfc4ac` | `#3d301f` |
| `--colour-code-bg` | `#d9d0be` | `#2a2015` |

`--colour-accent-primary` (light) corrected 2026-07-16 from the original `#9c4318` (4.25:1), `--colour-accent-secondary` (light) from `#57616b` (4.12:1), and `--colour-text-muted` (light) from `#6b5f4e` (4.07:1): all below the 4.5:1 AA floor this table claims against `--colour-code-bg` — the background inline `code` and `.post-tags` pills (`themes/tapestry/sass/css/_main.scss`, `_post.scss`) actually pair them with. All three corrected values keep their original hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.15` |
| `--line-height-body` | `1.65` |

**Spacing scale**

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4rem` |

**Border radius & shadows**

| Token | Value |
|---|---|
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-sm` | `0 2px 8px rgba(46, 36, 24, 0.14)` |
| `--shadow-md` | `0 8px 22px rgba(46, 36, 24, 0.18)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---
