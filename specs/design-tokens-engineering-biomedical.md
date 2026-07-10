# Design tokens — Engineering-Biomedical

Frozen design-token reference for the **engineering-biomedical** presentation style group, per [CONSTITUTION.md](../CONSTITUTION.md) §8. One section per variant below.

**Status of this document:** fonts, colour palettes (light + dark, contrast-verified), spacing scale, type scale, border radius, and shadows are frozen and ready for implementation — these were fully specified and numerically verified during prototyping (see each variant's prototype file for the contrast-ratio workings). **Grid sub-desktop breakpoints and the navigation-collapse breakpoint/treatment are now resolved**, via the shared technical spikes at `prototypes/spikes/responsive-grid-spike.html` and `prototypes/spikes/nav-collapse-spike.html` (both verified in-browser at multiple viewport widths, including 320px). These are shared, group-agnostic mechanism values applied uniformly across every group/variant — only each variant's own colour/spacing/font tokens (above) vary per style. **The article/sidebar column split below is content-driven**, per the CONSTITUTION.md §5 amendment of 2026-07-05: the sidebar (and the article's narrower 1–8 span) only appear when the page actually has an automatic TOC or custom `page.extra.sidebar` content to show — see `themes/tapestry/templates/partials/sidebar.html`.

**Default variant for this group:** *not yet designated.* CONSTITUTION.md §7 requires each group to name one variant as its default (used when `extra.presentation_variant` is unset or invalid); that choice has not been made yet for `engineering-biomedical`.

## Variants

- [Blueprint Drafting](#blueprint-drafting)
- [Surgical Precision](#surgical-precision)
- [Aerospace Materials Lab](#aerospace-materials-lab)
- [Biomedical Diagnostics](#biomedical-diagnostics)
- [Swiss Precision Instrument](#swiss-precision-instrument)

---

### Blueprint Drafting

*Prototype source: `prototypes/style-tiles/engineering-biomedical-01-blueprint-drafting.html` · Example persona: Prof. Elena Kowalski*

A technical-drawing aesthetic built on an authentic inversion: light mode is the "positive print" (vellum white, blueprint-blue ink), dark mode is the classic blueprint "negative" (navy ground, white/cyan lines) — both are literally how blueprints were reproduced historically. Fine graph-grid background, dimension-line rules, all-caps drafting-stencil headings. Suits structural, civil, and mechanical engineering researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Big Shoulders Display | 600/800 | "Arial Narrow", Arial, sans-serif |
| Body | IBM Plex Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f5f7fa` | `#0b2e4a` |
| `--colour-bg-secondary` | `#e7edf3` | `#123a5c` |
| `--colour-text-primary` | `#1a3a5c` | `#eaf3fb` |
| `--colour-text-heading` | `#12293f` | `#ffffff` |
| `--colour-text-muted` | `#5c7690` | `#9dbdd6` |
| `--colour-accent-primary` | `#0f5fa8` | `#6fc3e8` |
| `--colour-accent-secondary` | `#b8302a` | `#e0846b` |
| `--colour-border` | `#cddbe7` | `#1d4d70` |
| `--colour-code-bg` | `#e7edf3` | `#123a5c` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.9rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.15rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.05` |
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

### Surgical Precision

*Prototype source: `prototypes/style-tiles/engineering-biomedical-02-surgical-precision.html` · Example persona: Dr. Marcus Webb*

A clinical-instrumentation aesthetic: sterile steel-white ground, a crosshair/reticle motif marking each section (echoing surgical targeting overlays), a "vitals readout" sidebar in monospace. Teal reads as clinical/scrub, crimson is reserved for genuinely critical emphasis. Suits surgical robotics, biomedical devices, and clinical-engineering researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Barlow Condensed | 600/700 | "Arial Narrow", Arial, sans-serif |
| Body | Roboto | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Roboto Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f7f9fa` | `#12171a` |
| `--colour-bg-secondary` | `#eef2f3` | `#1b2226` |
| `--colour-text-primary` | `#1c2226` | `#eef2f3` |
| `--colour-text-heading` | `#101416` | `#ffffff` |
| `--colour-text-muted` | `#5a6a70` | `#9fb0b5` |
| `--colour-accent-primary` | `#0d6e6e` | `#4fc9c4` |
| `--colour-accent-secondary` | `#b3123a` | `#ef6f8e` |
| `--colour-border` | `#dbe3e5` | `#2a343a` |
| `--colour-code-bg` | `#eef2f3` | `#1b2226` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.55rem` |
| `--font-size-h3` | `1.15rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.1` |
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
| `--shadow-sm` | `0 1px 3px rgba(13, 20, 22, 0.08)` |
| `--shadow-md` | `0 6px 18px rgba(13, 20, 22, 0.1)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Aerospace Materials Lab

*Prototype source: `prototypes/style-tiles/engineering-biomedical-03-aerospace-materials-lab.html` · Example persona: Dr. Priya Ramanathan*

Titanium-and-carbon industrial palette, a diagonal hazard-stripe rule (drawn from aircraft ground-equipment markings) beneath the masthead, small rivet-dot accents. Amber reads as an instrument-panel warning tone, steel blue as structural calm. Suits aerospace, mechanical, and materials-science researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Rajdhani | 600/700 | "Segoe UI", Arial, sans-serif |
| Body | Overpass | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Red Hat Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#ece9e4` | `#17140f` |
| `--colour-bg-secondary` | `#ded9d0` | `#201c15` |
| `--colour-text-primary` | `#201f1d` | `#f2ede4` |
| `--colour-text-heading` | `#141311` | `#fbf7ee` |
| `--colour-text-muted` | `#6b6459` | `#b3a894` |
| `--colour-accent-primary` | `#96490a` | `#e8a33d` |
| `--colour-accent-secondary` | `#2b4c6f` | `#7fa8c9` |
| `--colour-border` | `#cec7ba` | `#35301f` |
| `--colour-code-bg` | `#ded9d0` | `#201c15` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.8rem` |
| `--line-height-heading` | `1.1` |
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
| `--radius-md` | `3px` |
| `--shadow-sm` | `0 2px 6px rgba(0,0,0,0.25)` |
| `--shadow-md` | `0 8px 22px rgba(0,0,0,0.3)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Biomedical Diagnostics

*Prototype source: `prototypes/style-tiles/engineering-biomedical-04-biomedical-diagnostics.html` · Example persona: Dr. Tomás Álvarez*

A clinical-imaging aesthetic: mint-white ground with a faint dot-grid texture (evoking a microscopy field or petri-dish scatter), rounded cards, molecular-dot bullet markers on section headings. Suits computational pathology, diagnostic imaging, and cellular/molecular-precision researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Sora | 600/700 | "Segoe UI", Helvetica, Arial, sans-serif |
| Body | Work Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f2f9f7` | `#0c1917` |
| `--colour-bg-secondary` | `#e3f1ed` | `#12211e` |
| `--colour-text-primary` | `#17242a` | `#e6f5f1` |
| `--colour-text-heading` | `#0e1a1f` | `#f5fffb` |
| `--colour-text-muted` | `#52716d` | `#9bc4bb` |
| `--colour-accent-primary` | `#0d7d6e` | `#5fd6c0` |
| `--colour-accent-secondary` | `#c1473a` | `#ef8672` |
| `--colour-border` | `#cfe6df` | `#1c332e` |
| `--colour-code-bg` | `#e3f1ed` | `#12211e` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.6rem` |
| `--font-size-h2` | `1.55rem` |
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
| `--radius-md` | `12px` |
| `--shadow-sm` | `0 2px 8px rgba(12, 25, 23, 0.08)` |
| `--shadow-md` | `0 10px 26px rgba(12, 25, 23, 0.12)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Swiss Precision Instrument

*Prototype source: `prototypes/style-tiles/engineering-biomedical-05-swiss-precision-instrument.html` · Example persona: Dr. Heidi Brunner*

International Typographic Style, taken seriously: one typeface for everything (weight, size, and letter-spacing are the only variables — the way Helvetica was used in the 1960s Swiss design tradition), pure grayscale, and exactly one accent colour, deployed sparingly like a chronograph's seconds hand. A dial-graduation rule stands in for a decorative flourish. Suits precision instrumentation, metrology, and any researcher who wants zero visual noise.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Inter | 400/500/700/800 | "Helvetica Neue", Helvetica, Arial, sans-serif |
| Body | IBM Plex Mono | 400/500 | "Helvetica Neue", Helvetica, Arial, sans-serif |
| Code |  | 400 (single weight) | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#ffffff` | `#101010` |
| `--colour-bg-secondary` | `#f2f2f2` | `#1a1a1a` |
| `--colour-text-primary` | `#121212` | `#f2f2f2` |
| `--colour-text-heading` | `#000000` | `#ffffff` |
| `--colour-text-muted` | `#6e6e6e` | `#9c9c9c` |
| `--colour-accent-primary` | `#c8102e` | `#ff3b52` |
| `--colour-accent-secondary` | `—` | `—` |
| `--colour-border` | `#dedede` | `#2c2c2c` |
| `--colour-code-bg` | `#f2f2f2` | `#1a1a1a` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.4rem` |
| `--font-size-h2` | `1.4rem` |
| `--font-size-h3` | `1.05rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.78rem` |
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
| `--radius-sm` | `0px` |
| `--radius-md` | `0px` |
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
