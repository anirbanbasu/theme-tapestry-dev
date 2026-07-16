# Design tokens — Creative

Frozen design-token reference for the **creative** presentation style group, per [CONSTITUTION.md](../CONSTITUTION.md) §8. One section per variant below.

**Status of this document:** fonts, colour palettes (light + dark, contrast-verified), spacing scale, type scale, border radius, and shadows are frozen and ready for implementation — these were fully specified and numerically verified during prototyping (see each variant's prototype file for the contrast-ratio workings). **Grid sub-desktop breakpoints and the navigation-collapse breakpoint/treatment are now resolved**, via the shared technical spikes at `prototypes/spikes/responsive-grid-spike.html` and `prototypes/spikes/nav-collapse-spike.html` (both verified in-browser at multiple viewport widths, including 320px). These are shared, group-agnostic mechanism values applied uniformly across every group/variant — only each variant's own colour/spacing/font tokens (above) vary per style. **The article/sidebar column split below is content-driven**, per the CONSTITUTION.md §5 amendment of 2026-07-05: the sidebar (and the article's narrower 1–8 span) only appear when the page actually has an automatic TOC or custom `page.extra.sidebar` content to show — see `themes/tapestry/templates/partials/sidebar.html`.

**Default variant for this group:** `editorial-zine` (CONSTITUTION.md §7). Used when `extra.presentation_style` is `"creative"` and `extra.presentation_variant` is unset or names a variant that doesn't exist within this group. Note this does not change Tapestry's theme-wide default group+variant (`scholarly`/`contemporary-research-lab`, CONSTITUTION.md §7) — it only applies once `creative` has been explicitly selected as the style.

## Variants

- [Bauhaus Studio](#bauhaus-studio)
- [Editorial Zine](#editorial-zine)
- [Watercolor Atelier](#watercolor-atelier)
- [Neon Studio](#neon-studio)
- [Collage Mixed Media](#collage-mixed-media)

---

### Bauhaus Studio

*Prototype source: `prototypes/style-tiles/creative-01-bauhaus-studio.html` · Example persona: Prof. Lena Voss*

Bold geometric grotesk headings, primary-colour accents (crimson red, deep blue) with sunflower yellow reserved strictly for shapes and fill badges, hard edges, no rounded corners, thick offset shadows. Suits design theory, visual culture, and studio-art researchers who want structural confidence over ornament.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Archivo | 700/900 | "Helvetica Neue", Arial, sans-serif |
| Body | Work Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | DM Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#ffffff` | `#121212` |
| `--colour-bg-secondary` | `#f0f0f0` | `#1c1c1c` |
| `--colour-text-primary` | `#111111` | `#f2f2f2` |
| `--colour-text-heading` | `#000000` | `#ffffff` |
| `--colour-text-muted` | `#555555` | `#a8a8a8` |
| `--colour-accent-primary` | `#c81d25` | `#ff6b6b` |
| `--colour-accent-secondary` | `#1b3a8a` | `#6ea8fe` |
| `--colour-border` | `#111111` | `#f2f2f2` |
| `--colour-code-bg` | `#f0f0f0` | `#1c1c1c` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `3rem` |
| `--font-size-h2` | `1.8rem` |
| `--font-size-h3` | `1.3rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
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
| `--radius-md` | `0px` |
| `--shadow-sm` | `none` |
| `--shadow-md` | `6px 6px 0 rgba(0,0,0,0.15)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Editorial Zine

*Prototype source: `prototypes/style-tiles/creative-02-editorial-zine.html` · Example persona: JAX RIVERA*

Punk/zine energy: heavyweight condensed display headlines set at a slight tilt, dashed rules, highlighter-style keyword treatment (acid green as a background fill behind dark text, never as text colour itself), typewriter code blocks. Suits media studies, performance, and cultural-studies researchers who want personality over polish.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Anton | 400 (single weight) | "Arial Narrow", Arial, sans-serif |
| Body | Public Sans | 400/700 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Courier Prime | 400/700 | "Courier New", monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#fdfdfb` | `#121212` |
| `--colour-bg-secondary` | `#efeee9` | `#1d1d1a` |
| `--colour-text-primary` | `#111111` | `#f5f5f0` |
| `--colour-text-heading` | `#000000` | `#ffffff` |
| `--colour-text-muted` | `#555555` | `#b0b0a8` |
| `--colour-accent-primary` | `#c2006e` | `#ff5fa8` |
| `--colour-accent-secondary` | `#38701c` | `#9ee36b` |
| `--colour-border` | `#111111` | `#f5f5f0` |
| `--colour-code-bg` | `#efeee9` | `#1d1d1a` |

`--colour-accent-secondary` (light) corrected 2026-07-16 from the original `#3f7d20`: that value was only 4.33:1 against `--colour-code-bg` — the background `.post-tags` pills (`themes/tapestry/sass/css/_post.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#38701c` keeps the same green hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `3.4rem` |
| `--font-size-h2` | `1.9rem` |
| `--font-size-h3` | `1.3rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
| `--line-height-heading` | `0.95` |
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
| `--radius-md` | `0px` |
| `--shadow-sm` | `none` |
| `--shadow-md` | `none` |

**Decorative background pattern (§8)** — a halftone-dot print texture (`radial-gradient`, 8px tile), reinforcing the zine's photocopy aesthetic.

*Adaptation (implementation planning, 2026-07-11): the prototype applied a single black-based pattern (`rgba(0,0,0,0.05)`) unconditionally to both light and dark mode via a shared `body` rule — on this variant's dark-mode background (`#121212`, near-black) that value would be visually indistinguishable from a flat background. The dark-mode value below substitutes this variant's own dark `--colour-border` (`#f5f5f0`, near-white) at the same 0.05 alpha, keeping the halftone motif visible in both modes while preserving the prototype's exact light-mode value and alpha.*

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | `radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)` | `radial-gradient(circle, rgba(245, 245, 240, 0.05) 1px, transparent 1px)` |
| `--pattern-bg-size` | `8px 8px` | `8px 8px` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Watercolor Atelier

*Prototype source: `prototypes/style-tiles/creative-03-watercolor-atelier.html` · Example persona: Dr. Odalys Marín*

Soft, painterly, and warm: blush-and-cream palette, blurred colour "wash" blobs behind the header, an elegant italic serif display face, rounded generous corners throughout. Suits studio artists, art historians, and practice-based researchers who want a gallery-brochure feel.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | DM Serif Display | 400 (single weight) | Georgia, "Times New Roman", serif |
| Body | Karla | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#fbf3f0` | `#241a20` |
| `--colour-bg-secondary` | `#f3e6e2` | `#2f2229` |
| `--colour-text-primary` | `#3b2a35` | `#f1e6ea` |
| `--colour-text-heading` | `#2c1f28` | `#f9f0f3` |
| `--colour-text-muted` | `#7a6270` | `#c2a9b6` |
| `--colour-accent-primary` | `#a3475a` | `#e39aad` |
| `--colour-accent-secondary` | `#3f6355` | `#8bbfa8` |
| `--colour-border` | `#e6d3cd` | `#423039` |
| `--colour-code-bg` | `#f3e6e2` | `#2f2229` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.9rem` |
| `--font-size-h2` | `1.7rem` |
| `--font-size-h3` | `1.25rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
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
| `--radius-sm` | `10px` |
| `--radius-md` | `20px` |
| `--shadow-sm` | `0 2px 10px rgba(59, 42, 53, 0.08)` |
| `--shadow-md` | `0 10px 30px rgba(59, 42, 53, 0.12)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Neon Studio

*Prototype source: `prototypes/style-tiles/creative-04-neon-studio.html` · Example persona: Dr. Kai Osei*

Futuristic and high-energy: geometric display face, gradient magenta-to-cyan headline treatment, glow effects (kept subtle in light mode, fuller in dark mode). Suits new media artists, digital performance, and computational-arts researchers who want their profile to feel like an installation, not a CV.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Orbitron | 700/900 | "Segoe UI", Arial, sans-serif |
| Body | Manrope | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Space Mono | 400/700 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f5f2fb` | `#150f24` |
| `--colour-bg-secondary` | `#ece5f7` | `#1e1533` |
| `--colour-text-primary` | `#241b36` | `#eee6ff` |
| `--colour-text-heading` | `#17102a` | `#ffffff` |
| `--colour-text-muted` | `#675a7d` | `#b3a3d1` |
| `--colour-accent-primary` | `#b0158a` | `#ff6fd8` |
| `--colour-accent-secondary` | `#096d78` | `#4de8f0` |
| `--colour-border` | `#d9cdec` | `#362959` |
| `--colour-code-bg` | `#ece5f7` | `#1e1533` |

`--colour-accent-secondary` (light) corrected 2026-07-16 from the original `#0a7a86`: that value was only 4.13:1 against `--colour-code-bg` — the background `.post-tags` pills (`themes/tapestry/sass/css/_post.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#096d78` keeps the same teal hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
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
| `--radius-sm` | `4px` |
| `--radius-md` | `10px` |
| `--shadow-sm` | `0 0 12px rgba(176, 21, 138, 0.25)` |
| `--shadow-md` | `0 0 28px rgba(176, 21, 138, 0.3)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Collage Mixed Media

*Prototype source: `prototypes/style-tiles/creative-05-collage-mixed-media.html` · Example persona: Dr. Naomi Fitzgerald*

Warm, tactile, and approachable: rounded friendly headings, mustard-and-plum accents, sticky-note-style asides with a washi-tape corner accent, gently rotated cards evoking a corkboard or scrapbook. Suits ethnographers, social scientists, and community-based researchers who want warmth over formality.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Fredoka | 500/700 | "Segoe UI", Helvetica, Arial, sans-serif |
| Body | Mulish | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | Ubuntu Mono | 400/700 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#faf3e7` | `#201812` |
| `--colour-bg-secondary` | `#f1e6d2` | `#2b2018` |
| `--colour-text-primary` | `#2e2013` | `#f2e9da` |
| `--colour-text-heading` | `#201607` | `#fbf5e9` |
| `--colour-text-muted` | `#6c5c48` | `#c2ae90` |
| `--colour-accent-primary` | `#7d6118` | `#d9b24c` |
| `--colour-accent-secondary` | `#6b3f57` | `#c98fb0` |
| `--colour-border` | `#e2d2b3` | `#3d3024` |
| `--colour-code-bg` | `#f1e6d2` | `#2b2018` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#786751`: that value was only 4.40:1 against `--colour-code-bg` — the background `.sidebar-toc-title`/`figcaption` (`themes/tapestry/sass/css/_sidebar.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#6c5c48` keeps the same warm-brown hue, darkened to ≥4.5:1 against `--colour-code-bg`.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.6rem` |
| `--font-size-h2` | `1.6rem` |
| `--font-size-h3` | `1.2rem` |
| `--font-size-body` | `1.0625rem` |
| `--font-size-small` | `0.85rem` |
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
| `--radius-sm` | `8px` |
| `--radius-md` | `16px` |
| `--shadow-sm` | `0 3px 10px rgba(46, 32, 19, 0.12)` |
| `--shadow-md` | `0 10px 24px rgba(46, 32, 19, 0.16)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---
