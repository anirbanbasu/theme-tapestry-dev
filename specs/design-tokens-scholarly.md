# Design tokens — Scholarly

Frozen design-token reference for the **scholarly** presentation style group, per [CONSTITUTION.md](../CONSTITUTION.md) §8. One section per variant below.

**Status of this document:** fonts, colour palettes (light + dark, contrast-verified), spacing scale, type scale, border radius, and shadows are frozen and ready for implementation — these were fully specified and numerically verified during prototyping (see each variant's prototype file for the contrast-ratio workings). **Grid sub-desktop breakpoints and the navigation-collapse breakpoint/treatment are now resolved**, via the shared technical spikes at `prototypes/spikes/responsive-grid-spike.html` and `prototypes/spikes/nav-collapse-spike.html` (both verified in-browser at multiple viewport widths, including 320px). These are shared, group-agnostic mechanism values applied uniformly across every group/variant — only each variant's own colour/spacing/font tokens (above) vary per style. **The article/sidebar column split below is content-driven**, per the CONSTITUTION.md §5 amendment of 2026-07-05: the sidebar (and the article's narrower 1–8 span) only appear when the page actually has an automatic TOC or custom `page.extra.sidebar` content to show — see `themes/tapestry/templates/partials/sidebar.html`.

**Default variant for this group:** `contemporary-research-lab` (CONSTITUTION.md §7). This is also Tapestry's theme-wide default group+variant when `extra.presentation_style`/`extra.presentation_variant` are unset or invalid.

## Variants

- [Classic Ivy](#classic-ivy)
- [Nordic Minimalist](#nordic-minimalist)
- [Dark Academia](#dark-academia)
- [Scientific Journal](#scientific-journal)
- [Contemporary Research Lab](#contemporary-research-lab)

---

### Classic Ivy

*Prototype source: `prototypes/style-tiles/scholarly-01-classic-ivy.html` · Example persona: Prof. Margaret Hartwell*

A traditional university-press look: warm parchment ground, high-contrast ink text, a maroon-and-gold editorial accent pair. Evokes bound journals and reading rooms — suits historians, humanities faculty, and classic-academia profiles.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Playfair Display | 700/900 | Georgia, "Times New Roman", serif |
| Body | Source Serif 4 | 400/600 | Georgia, "Cambria", serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#faf6ec` | `#14191f` |
| `--colour-bg-secondary` | `#f1ead7` | `#1c232b` |
| `--colour-text-primary` | `#1c2b39` | `#ece4d3` |
| `--colour-text-heading` | `#14212c` | `#f5efe0` |
| `--colour-text-muted` | `#5b5142` | `#b3a890` |
| `--colour-accent-primary` | `#7a2231` | `#e0a5ad` |
| `--colour-accent-secondary` | `#806330` | `#d1ab6c` |
| `--colour-border` | `#ded2b3` | `#33404d` |
| `--colour-code-bg` | `#f1ead7` | `#1c232b` |

`--colour-accent-secondary` (light) corrected 2026-07-16 from the original `#a8823f`: that value was only 3.28:1 against `--colour-bg-primary` and 2.94:1 against `--colour-bg-secondary` — the background the `.post-tags` pill (`themes/tapestry/sass/css/_post.scss`, the token's only consumer) actually pairs it with — both below the 4.5:1 AA floor this table claims. `#806330` keeps the same gold/bronze hue, darkened to ≥4.6:1 against both backgrounds.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.75rem` |
| `--font-size-h2` | `1.85rem` |
| `--font-size-h3` | `1.35rem` |
| `--font-size-body` | `1.125rem` |
| `--font-size-small` | `0.875rem` |
| `--line-height-heading` | `1.15` |
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
| `--shadow-sm` | `0 1px 2px rgba(20, 33, 44, 0.08)` |
| `--shadow-md` | `0 4px 16px rgba(20, 33, 44, 0.12)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Nordic Minimalist

*Prototype source: `prototypes/style-tiles/scholarly-02-nordic-minimalist.html` · Example persona: Dr. Ingrid Solberg*

A clean, contemporary academic look: cool neutral ground, geometric sans headings against a warm serif body for readability, restrained steel-blue and sage accents. Suits cognitive science, social science, and lab-style profiles that want understated clarity over ornament.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Space Grotesk | 500/700 | "Segoe UI", Helvetica, Arial, sans-serif |
| Body | Source Serif 4 | 400/600 | Georgia, "Cambria", serif |
| Code | JetBrains Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f7f8f7` | `#14171b` |
| `--colour-bg-secondary` | `#ecefec` | `#1c2026` |
| `--colour-text-primary` | `#20242b` | `#e7e9ea` |
| `--colour-text-heading` | `#14171b` | `#f4f5f5` |
| `--colour-text-muted` | `#5c6470` | `#9aa2ab` |
| `--colour-accent-primary` | `#2f5f8f` | `#8fb4de` |
| `--colour-accent-secondary` | `#4b6b4b` | `#9dc09d` |
| `--colour-border` | `#d5dad5` | `#2c333c` |
| `--colour-code-bg` | `#ecefec` | `#1c2026` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.6rem` |
| `--font-size-h2` | `1.7rem` |
| `--font-size-h3` | `1.25rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
| `--line-height-heading` | `1.1` |
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
| `--radius-sm` | `0px` |
| `--radius-md` | `2px` |
| `--shadow-sm` | `none` |
| `--shadow-md` | `none` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Dark Academia

*Prototype source: `prototypes/style-tiles/scholarly-03-dark-academia.html` · Example persona: Dr. Percival Ashworth-Vane*

Moody library aesthetic: deep leather-and-ink tones, italic display serif headings, a double-rule blockquote border, ornamental initial caps. Aimed at literature, philosophy, and classics researchers who want a distinctly literary, "old library" feel rather than a clinical one.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Cormorant Garamond | 600/700 | Garamond, Georgia, serif |
| Body | EB Garamond | 400/500 | Garamond, Georgia, serif |
| Code | Fira Code | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#efe6d8` | `#1b1512` |
| `--colour-bg-secondary` | `#e5d9c5` | `#241c17` |
| `--colour-text-primary` | `#2a1f1a` | `#ece1cf` |
| `--colour-text-heading` | `#201712` | `#f4ead9` |
| `--colour-text-muted` | `#6b5c4c` | `#a8977e` |
| `--colour-accent-primary` | `#6e2c33` | `#c98089` |
| `--colour-accent-secondary` | `#33502f` | `#86ab82` |
| `--colour-border` | `#cdbc9f` | `#3c322a` |
| `--colour-code-bg` | `#e5d9c5` | `#241c17` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `3rem` |
| `--font-size-h2` | `1.9rem` |
| `--font-size-h3` | `1.4rem` |
| `--font-size-body` | `1.15rem` |
| `--font-size-small` | `0.85rem` |
| `--line-height-heading` | `1.1` |
| `--line-height-body` | `1.75` |

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
| `--radius-md` | `3px` |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.25)` |
| `--shadow-md` | `0 6px 20px rgba(0,0,0,0.35)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Scientific Journal

*Prototype source: `prototypes/style-tiles/scholarly-04-scientific-journal.html` · Example persona: Dr. Amara Chen*

Crisp, clinical, IEEE/Nature-adjacent: pure white ground, cobalt-and-teal accent pair, structured "abstract" callout and numbered sections. Suits STEM researchers who want their profile to read like a well-typeset paper rather than a blog.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Spectral | 600/700 | Georgia, "Times New Roman", serif |
| Body | PT Serif | 400/700 | Georgia, "Times New Roman", serif |
| Code | Source Code Pro | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#ffffff` | `#0d1117` |
| `--colour-bg-secondary` | `#f2f4f7` | `#161b22` |
| `--colour-text-primary` | `#1a1a1a` | `#e6edf3` |
| `--colour-text-heading` | `#0d1117` | `#f4f8fb` |
| `--colour-text-muted` | `#57606a` | `#8b949e` |
| `--colour-accent-primary` | `#1449a6` | `#79b1ff` |
| `--colour-accent-secondary` | `#0b6d64` | `#57d9c4` |
| `--colour-border` | `#d8dee4` | `#30363d` |
| `--colour-code-bg` | `#f2f4f7` | `#161b22` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.5rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.2` |
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
| `--radius-sm` | `3px` |
| `--radius-md` | `5px` |
| `--shadow-sm` | `0 1px 2px rgba(13, 17, 23, 0.08)` |
| `--shadow-md` | `0 6px 18px rgba(13, 17, 23, 0.1)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Contemporary Research Lab

*Prototype source: `prototypes/style-tiles/scholarly-05-contemporary-research-lab.html` · Example persona: Dr. Sam Okafor*

A modern, editorial-leaning take: a quirky soft-serif display face for headings against a clean humanist sans body, warm terracotta-and-teal accents, rounded cards and pill-shaped tags. Suits digital humanities, interdisciplinary labs, or researchers who want "scholarly" without looking severe.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Fraunces | 600/900 | Georgia, "Iowan Old Style", serif |
| Body | Inter | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Space Mono | 400/700 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#fbfaf8` | `#1a1420` |
| `--colour-bg-secondary` | `#f1ede8` | `#241c2c` |
| `--colour-text-primary` | `#2b1f2e` | `#f1ece9` |
| `--colour-text-heading` | `#1e1521` | `#faf7f5` |
| `--colour-text-muted` | `#6d6070` | `#b6a9b9` |
| `--colour-accent-primary` | `#a8481f` | `#e8916b` |
| `--colour-accent-secondary` | `#1f5c50` | `#6cb5a4` |
| `--colour-border` | `#e2dad2` | `#382d40` |
| `--colour-code-bg` | `#f1ede8` | `#241c2c` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.9rem` |
| `--font-size-h2` | `1.75rem` |
| `--font-size-h3` | `1.25rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
| `--line-height-heading` | `1.05` |
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
| `--radius-md` | `12px` |
| `--shadow-sm` | `0 2px 8px rgba(43, 31, 46, 0.08)` |
| `--shadow-md` | `0 10px 30px rgba(43, 31, 46, 0.14)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---
