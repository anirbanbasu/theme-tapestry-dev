# Design tokens — Natural

Frozen design-token reference for the **natural** presentation style group, per [CONSTITUTION.md](../CONSTITUTION.md) §8. One section per variant below.

**Status of this document:** fonts, colour palettes (light + dark, contrast-verified), spacing scale, type scale, border radius, and shadows are frozen and ready for implementation — these were fully specified and numerically verified during prototyping (see each variant's prototype file for the contrast-ratio workings). **Grid sub-desktop breakpoints and the navigation-collapse breakpoint/treatment are now resolved**, via the shared technical spikes at `prototypes/spikes/responsive-grid-spike.html` and `prototypes/spikes/nav-collapse-spike.html` (both verified in-browser at multiple viewport widths, including 320px). These are shared, group-agnostic mechanism values applied uniformly across every group/variant — only each variant's own colour/spacing/font tokens (above) vary per style. **The article/sidebar column split below is content-driven**, per the CONSTITUTION.md §5 amendment of 2026-07-05: the sidebar (and the article's narrower 1–8 span) only appear when the page actually has an automatic TOC or custom `page.extra.sidebar` content to show — see `themes/tapestry/templates/partials/sidebar.html`.

**Default variant for this group:** `periodic-table-chemistry` (CONSTITUTION.md §7). Used when `extra.presentation_style` is `"natural"` and `extra.presentation_variant` is unset or names a variant that doesn't exist within this group. Note this does not change Tapestry's theme-wide default group+variant (`scholarly`/`contemporary-research-lab`, CONSTITUTION.md §7) — it only applies once `natural` has been explicitly selected as the style.

## Variants

- [Celestial Observatory](#celestial-observatory)
- [Periodic Table Chemistry](#periodic-table-chemistry)
- [Field Notebook](#field-notebook)
- [Chalkboard Proof](#chalkboard-proof)
- [Quantum Circuit](#quantum-circuit)

---

### Celestial Observatory

*Prototype source: `prototypes/style-tiles/natural-01-celestial-observatory.html` · Example persona: Dr. Yusuf Al-Rashid*

Antique star-atlas engraving in light mode (aged parchment, gold ink, navy type), true night-sky in dark mode (deep space navy-black with a faint scattered starfield). Centred blockquotes framed by gold rules, star-glyph tag markers. Suits astronomy, astrophysics, and observational-cosmology researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Cardo | 400/700 | Georgia, "Times New Roman", serif |
| Body | Crimson Pro | 400/500 | Georgia, Cambria, serif |
| Code | JetBrains Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f7f3e8` | `#0a0e1c` |
| `--colour-bg-secondary` | `#efe8d4` | `#121a30` |
| `--colour-text-primary` | `#1b2440` | `#e8e6f0` |
| `--colour-text-heading` | `#10162b` | `#ffffff` |
| `--colour-text-muted` | `#6c674e` | `#9098b8` |
| `--colour-accent-primary` | `#7d621b` | `#d9b968` |
| `--colour-accent-secondary` | `#2c4a7c` | `#7fa8e0` |
| `--colour-border` | `#ddd3ae` | `#232c4a` |
| `--colour-code-bg` | `#efe8d4` | `#121a30` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#7a7458`: that value was only 3.84:1 against `--colour-code-bg` and 4.24:1 against `--colour-bg-primary` — the backgrounds `.copyright`/`time`/`figcaption` (`themes/tapestry/sass/css/_main.scss`, `_post.scss`) actually pair it with — both below the 4.5:1 AA floor this table claims. `#6c674e` keeps the same olive hue, darkened to ≥4.5:1 against both backgrounds.

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.9rem` |
| `--font-size-h2` | `1.7rem` |
| `--font-size-h3` | `1.25rem` |
| `--font-size-body` | `1.1rem` |
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
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--shadow-sm` | `0 2px 8px rgba(10, 14, 28, 0.2)` |
| `--shadow-md` | `0 8px 24px rgba(10, 14, 28, 0.28)` |

**Decorative background pattern (§8)** — a sparse starfield (five overlapping `radial-gradient` points across a 260×160px tile). Dark mode only: a night sky has no light-mode analogue, so the light submap omits `--pattern-bg-image`/`--pattern-bg-size` entirely (resolves to `none`/`auto`, per §8's optional-per-variant rule). Exempt from the §8 alpha ceiling as a sparse point decoration — the tile is >99% exposed flat background.

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | *(none — not used in light mode)* | `radial-gradient(1.5px 1.5px at 20px 30px, rgba(255, 255, 255, 0.5), transparent), radial-gradient(1px 1px at 90px 70px, rgba(255, 255, 255, 0.4), transparent), radial-gradient(1.5px 1.5px at 160px 20px, rgba(255, 255, 255, 0.4), transparent), radial-gradient(1px 1px at 220px 90px, rgba(255, 255, 255, 0.35), transparent), radial-gradient(1.5px 1.5px at 60px 130px, rgba(255, 255, 255, 0.4), transparent)` |
| `--pattern-bg-size` | *(none)* | `260px 160px` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Periodic Table Chemistry

*Prototype source: `prototypes/style-tiles/natural-02-periodic-table-chemistry.html` · Example persona: Dr. Wei Lin Zhao*

Element-tile tags shaped like periodic-table cells (symbol + atomic number), a dashed "bond-line" rule under headings, clean lab-notebook palette split between a "metal" cobalt and a "nonmetal" emerald. Suits physical, inorganic, and analytical chemistry researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Roboto Slab | 600/700 | Georgia, "Times New Roman", serif |
| Body | Noto Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f5f7f8` | `#0c1319` |
| `--colour-bg-secondary` | `#e8edf0` | `#141d24` |
| `--colour-text-primary` | `#14202a` | `#e6eef2` |
| `--colour-text-heading` | `#0c161e` | `#ffffff` |
| `--colour-text-muted` | `#55697b` | `#93a7b3` |
| `--colour-accent-primary` | `#1a5ba8` | `#6fa8e8` |
| `--colour-accent-secondary` | `#157a4f` | `#4fd68f` |
| `--colour-border` | `#cfdbe2` | `#23303a` |
| `--colour-code-bg` | `#e8edf0` | `#141d24` |

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
| `--radius-sm` | `4px` |
| `--radius-md` | `6px` |
| `--shadow-sm` | `0 2px 6px rgba(20, 32, 42, 0.1)` |
| `--shadow-md` | `0 8px 20px rgba(20, 32, 42, 0.14)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Field Notebook

*Prototype source: `prototypes/style-tiles/natural-03-field-notebook.html` · Example persona: Dr. Beatrix Sorensen*

Aged-paper cream ground, warm ink-brown text, a hand-stamped "date" tag rotated slightly off-axis, italic serif navigation reminiscent of handwritten field-journal captions. Suits field ecology, evolutionary biology, and natural-history researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Lora | 600/700 | Georgia, "Times New Roman", serif |
| Body | Vollkorn | 400/500 | Georgia, serif |
| Code | IBM Plex Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f3ecd9` | `#1c2318` |
| `--colour-bg-secondary` | `#e8ddc3` | `#262f1f` |
| `--colour-text-primary` | `#3b2e1f` | `#ece3cc` |
| `--colour-text-heading` | `#241a10` | `#f7f0dc` |
| `--colour-text-muted` | `#6d5f46` | `#b3a883` |
| `--colour-accent-primary` | `#3f5c3a` | `#8fbf80` |
| `--colour-accent-secondary` | `#7a4a24` | `#d19a5f` |
| `--colour-border` | `#d8c9a3` | `#384730` |
| `--colour-code-bg` | `#e8ddc3` | `#262f1f` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#7a6a4e`: that value was only 3.89:1 against `--colour-code-bg` and 4.45:1 against `--colour-bg-primary` — the backgrounds `.copyright`/`time`/`figcaption` (`themes/tapestry/sass/css/_main.scss`, `_post.scss`) actually pair it with — both below the 4.5:1 AA floor this table claims. `#6d5f46` keeps the same warm-brown hue, darkened to ≥4.5:1 against both backgrounds.

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
| `--radius-sm` | `3px` |
| `--radius-md` | `6px` |
| `--shadow-sm` | `0 2px 8px rgba(59, 46, 31, 0.12)` |
| `--shadow-md` | `0 8px 22px rgba(59, 46, 31, 0.16)` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Chalkboard Proof

*Prototype source: `prototypes/style-tiles/natural-04-chalkboard-proof.html` · Example persona: Prof. Étienne Moreau*

International-Style chalkboard, taken literally: dark mode is a true chalkboard green-black with chalk-yellow and chalk-blue "handwriting" colours; light mode inverts to paper-and-graphite. A "∎" (Q.E.D.) box closes every blockquote, theorem-style numbering marks section headings, dashed rules stand in for chalk-drawn lines. Suits pure mathematics, number theory, and theoretical-physics researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Newsreader | 500/600 | Georgia, "Times New Roman", serif |
| Body | Literata | 400/500 | Georgia, serif |
| Code | Fira Code | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f7f5ef` | `#1b2e22` |
| `--colour-bg-secondary` | `#ece8dc` | `#24392b` |
| `--colour-text-primary` | `#2a2a28` | `#f0ede3` |
| `--colour-text-heading` | `#16160f` | `#ffffff` |
| `--colour-text-muted` | `#68685c` | `#b7c2ba` |
| `--colour-accent-primary` | `#2f5c46` | `#e8d67a` |
| `--colour-accent-secondary` | `#7e6414` | `#9fd8e0` |
| `--colour-border` | `#ddd7c3` | `#325240` |
| `--colour-code-bg` | `#ece8dc` | `#24392b` |

`--colour-text-muted` (light) corrected 2026-07-16 from the original `#6b6b5e` (4.41:1) and `--colour-accent-secondary` (light) from `#8a6d16` (4.01:1): both below the 4.5:1 AA floor this table claims against `--colour-code-bg` — the background `.sidebar-toc-title`/figcaption and `.post-tags` pills (`themes/tapestry/sass/css/_sidebar.scss`, `_post.scss`) actually pair them with. Both corrected values keep their original hue, darkened to ≥4.5:1 against `--colour-code-bg`.

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
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.2)` |
| `--shadow-md` | `0 8px 22px rgba(0,0,0,0.26)` |

**Decorative background pattern (§8)** — a fine chalk-dust texture (`radial-gradient`, 5px tile, 0.02 alpha). Dark mode only: chalk dust only reads against a dark chalkboard ground, so the light submap omits `--pattern-bg-image`/`--pattern-bg-size` entirely (resolves to `none`/`auto`, per §8's optional-per-variant rule).

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | *(none — not used in light mode)* | `radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)` |
| `--pattern-bg-size` | *(none)* | `5px 5px` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---

### Quantum Circuit

*Prototype source: `prototypes/style-tiles/natural-05-quantum-circuit.html` · Example persona: Dr. Aiko Tanaka*

A precise, diagrammatic take on quantum computing — cyan/magenta as the two basis states, a faint horizontal "circuit wire" ruling across the page, Dirac bra-ket brackets wrapping tag pills, a two-colour gradient rule under the title standing in for a superposition state. Suits quantum information, quantum computing, and theoretical-physics researchers.

**Fonts**

| Role | Typeface | Weights | Fallback stack |
|---|---|---|---|
| Heading | Chivo | 600/700 | "Helvetica Neue", Arial, sans-serif |
| Body | Plus Jakarta Sans | 400/500 | "Segoe UI", Helvetica, Arial, sans-serif |
| Code | JetBrains Mono | 400/500 | "SFMono-Regular", Consolas, monospace |

**Colour palette** (all values verified ≥4.5:1 against their paired background at normal text size, except where noted as decorative/large-text-only in the prototype)

| Token | Light | Dark |
|---|---|---|
| `--colour-bg-primary` | `#f5f3fb` | `#120c24` |
| `--colour-bg-secondary` | `#e9e4f6` | `#1c1438` |
| `--colour-text-primary` | `#241b3d` | `#ece6fa` |
| `--colour-text-heading` | `#150f28` | `#ffffff` |
| `--colour-text-muted` | `#6a5f8a` | `#b0a3d6` |
| `--colour-accent-primary` | `#09717c` | `#4de8f0` |
| `--colour-accent-secondary` | `#a3157e` | `#ef6fd8` |
| `--colour-border` | `#d7cdec` | `#2e2354` |

`--colour-accent-primary` (light) corrected 2026-07-16 from the original `#0a7a86`: that value was only 4.08:1 against `--colour-code-bg` — the background `.post-tags` pills/`.framed` links (`themes/tapestry/sass/css/_post.scss`, `_main.scss`) actually pair it with — below the 4.5:1 AA floor this table claims. `#09717c` keeps the same teal hue, darkened to ≥4.5:1 against `--colour-code-bg`.
| `--colour-code-bg` | `#e9e4f6` | `#1c1438` |

**Type scale**

| Token | Value |
|---|---|
| `--font-size-h1` | `2.7rem` |
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
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--shadow-sm` | `0 0 10px rgba(163, 21, 126, 0.2)` |
| `--shadow-md` | `0 0 24px rgba(163, 21, 126, 0.25)` |

**Decorative background pattern (§8)** — a horizontal circuit-trace rule pattern (`linear-gradient`, 46px row height), echoing PCB trace rows. Light mode reuses `--colour-border` directly; dark mode uses an explicit 0.06-alpha cyan to keep the circuit-glow identity, under the §8 0.15 ceiling.

| Token | Light | Dark |
|---|---|---|
| `--pattern-bg-image` | `linear-gradient(var(--colour-border) 1px, transparent 1px)` | `linear-gradient(rgba(77, 232, 240, 0.06) 1px, transparent 1px)` |
| `--pattern-bg-size` | `100% 46px` | `100% 46px` |

**Grid breakpoints & column spans (§5)** — desktop spans confirmed in the prototype; sub-desktop breakpoint resolved by `prototypes/spikes/responsive-grid-spike.html` (verified at 320px–1200px, no horizontal overflow at any width).

| Region | Desktop (≥ prototype width) | Narrower breakpoints |
|---|---|---|
| Article body | columns 1–8 (`grid-column: 1 / span 8`) when a sidebar renders; full width (columns 1–12) when it doesn't — the reservation is never left empty | below `1024px`: columns 1–12 (stacks full-width, in source order) |
| Sidebar | columns 9–12 (`grid-column: 9 / span 4`); content-driven, not unconditional — renders only for an automatic "on this page" heading TOC (pages with ≥2 headings) and/or custom content via `page.extra.sidebar` (path to a colocated Markdown snippet); omitted entirely when neither applies, or when `page.extra.sidebar = false` | below `1024px`: columns 1–12 (stacks full-width, below the article) |
| Nav / header, footer, post-list | full width, columns 1–12 | unchanged — already full-width at every breakpoint |

**Navigation collapse breakpoint & treatment (§6)** — resolved by `prototypes/spikes/nav-collapse-spike.html`: collapses below `860px` into a native `popover`/`popovertarget` disclosure (matching terminus's own mechanism at the pinned snapshot, zero JS), verified with 8 realistic-length nav items (none of the 25 style tiles tested more than 4 short items). Expanded treatment: nav items inline, no toggle button. Collapsed treatment: a "☰ Menu" toggle button styled with the variant's own `--colour-accent-primary`/`--colour-text-heading` tokens, opening a floating panel using `--colour-bg-secondary`/`--colour-border` for its background/border.

---
