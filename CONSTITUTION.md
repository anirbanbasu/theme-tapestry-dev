# CONSTITUTION.md

Non-negotiable standards for the **Tapestry** Zola theme. These constraints hold regardless of which templates, styles, or design tokens change beneath them. Read alongside @CLAUDE.md, not instead of it — this file states *what must always be true*; CLAUDE.md states *how to work day to day*.

Amend this file deliberately and explicitly (see §10). Do not let it erode silently through unrelated operational work.

## 1. Accessibility

- The theme MUST conform to **WCAG 2.1 (or later) Level AA** across all shipped templates and default styles.
- This includes: sufficient colour contrast in both light and dark mode, fully keyboard-navigable interactive elements (including the theme switcher), semantic HTML landmarks and correct heading order, visible focus states, and alt-text support for images inserted via content or shortcodes.
- Verify with automated tooling (e.g. axe via the Playwright MCP server) plus a manual keyboard-only pass before treating any visual or structural change as complete.

## 2. JavaScript

- The theme MUST ship with **no JavaScript**, with exactly one exception: a **theme switcher**, equivalent in scope to terminus's own `js/theme-switcher.js` at the pinned snapshot (see §3) — and *only* that script, not terminus's JS footprint as a whole.
- The theme switcher must degrade gracefully: with JS disabled, the site must still render correctly and remain fully usable, defaulting to the system `prefers-colour-scheme`.
- No analytics scripts, no third-party embeds that require JS, no JS-dependent interactivity anywhere else in the theme. Any request that implies adding JS outside the theme switcher is a constitutional conflict — flag it, don't implement it.
- At the pinned terminus snapshot, terminus itself ships three further JS features beyond the theme switcher: a responsive-nav popover auto-closer, a copy-to-clipboard button on code blocks, and client-side KaTeX rendering (see `docs/terminus-compat-contract.md` §7 for the full inventory and resolution). None of these three are covered by the theme-switcher exception. Each must be reimplemented without JS or dropped — never carried forward as JS on the assumption that "terminus does it too."

## 3. Terminus compatibility

**Problem:** "Must stay compatible with terminus" is ambiguous if terminus itself keeps changing upstream — compatibility with a moving target isn't a stable, testable requirement.

**Resolution:**

- Compatibility is pinned to a **specific snapshot of terminus**, not to "terminus" as an ongoing project.
  - Pinned reference: terminus @ `aa8d8b67f9ab69ae48e1405f96e152d41f03e0ed`.
- The Zola version itself is pinned for reproducible builds: **Zola `0.22.1`**. Run `zola --version` and confirm it matches before relying on any Zola/Tera feature (per CLAUDE.md's build-command checklist) — a mismatch is a signal to stop and reconcile, not to proceed anyway. `0.22.1` satisfies terminus's own `min_version = "0.22.0"` (`theme.toml`) and the Zola `0.21.0`+ requirement for GitHub-style alerts (`docs/terminus-compat-contract.md` §2, `markdown.github_alerts`).
- That snapshot's shortcodes, config keys, template blocks, and front-matter fields are extracted once into a standalone compatibility contract, checked into this repo at `docs/terminus-compat-contract.md`. **That contract — not the live terminus repo — is the source of truth Tapestry is tested against.**
- The contract is a frozen fixture. It changes only when a deliberate decision is made to adopt a newer terminus feature or drop an old one — never automatically, and never merely because upstream terminus changed.
- "Sync with the latest terminus" is always a separate, explicit task: re-diff the new terminus snapshot against the contract, decide what to adopt, and update the contract intentionally.
- This repo's actual live usage (`content/` and `config.toml` as they exist today) is the hard floor: whatever shortcodes/config keys are currently in use are non-negotiable regardless of what the contract says. The contract must be a superset of what's actually in use, not a replacement for it.

## 4. Fonts

- The theme uses **Google Fonts** as the web font provider.
- Multiple presentation styles (to be defined later) may each pair different typefaces for headings, body, and code. Each presentation style must have a fully specified, tested typeface pairing.
- For each presentation style:
  - Heading typeface: <name, weights required, e.g. "Merriweather 400, 700">.
  - Body typeface: <name, weights required, e.g. "Inter 400, 500">.
  - Code typeface (if used): <monospace, weights required, e.g. "IBM Plex Mono 400">.
  - Fallback stack for each: system font fallbacks, e.g. "Merriweather, Georgia, serif".
- Fonts are loaded via Google Fonts CDN. Font subsetting and variable fonts are permitted if they reduce payload without compromising glyph coverage for supported languages.
- The font choice must pass WCAG AA readability at the smallest body text size used in the site (typically 14–16px).

## 5. Layout grid system

- All presentation styles MUST be built on a **12-column responsive grid system**. This applies to every shipped template (page, section, index, archive, taxonomy list/single, 404) and every preset style — no style may opt out or substitute a different column count.
- The grid must be implemented in CSS only, per §2 (no JS-driven layout). CSS Grid (`display: grid` with a 12-column `grid-template-columns`, e.g. `repeat(12, 1fr)`, or an equivalent fractional definition) is the reference mechanism.
- Content regions (article body, sidebars, pagination, footer columns, etc.) must span a documented, deliberate number of the 12 columns at each breakpoint — not arbitrary percentage or pixel widths.
- Breakpoints and their per-breakpoint column spans are frozen design tokens (see §7) and must be documented in each style's `docs/design-tokens-<style-name>.md` alongside colour, spacing, and type tokens.
- The grid must remain fully responsive down to a minimum viewport width of 320px without introducing horizontal scrolling of the page itself (per §1 accessibility requirements).

## 6. Navigation

- The main site navigation MUST collapse into a disclosure/hamburger pattern below a defined breakpoint. This applies to every preset presentation style and every variant within it — no style or variant may opt out, substitute an always-expanded nav, or otherwise skip the collapse.
- The collapse MUST be implemented without JavaScript, per §2. The native HTML `popover` attribute with a `popovertarget` invoker (as terminus itself uses for its own main menu at the pinned snapshot), the `<details>`/`<summary>` element, or an equivalent CSS-only mechanism (e.g. the checkbox hack) are acceptable reference mechanisms. Terminus's own `close_responsive_menu_on_resize` JS auto-closer is explicitly out of scope here — per §2, it must be reimplemented without JS or dropped, never carried forward to satisfy this requirement.
- The collapse breakpoint, and the collapsed/expanded visual treatment either side of it, are frozen design tokens (see §8) and must be documented per style/variant, consistent with how grid breakpoints are documented under §5.
- The collapsed state MUST remain fully keyboard-operable (open, navigate between items, close) and expose correct ARIA/disclosure semantics, per §1. This is non-negotiable regardless of how few items a given style's sample navigation happens to show — the mechanism must not silently rely on there being few enough items to fit on one line.

## 7. Presentation styles

- The theme ships with a set of **preset presentation style groups** that users can select via theme configuration (e.g. `extra.presentation_style` in `config.toml`).
- Maximum of **5 preset style groups** (e.g. `scholarly`, `creative`, `engineering`, ...). This cap applies to top-level groups only, not to variants within a group (see next bullet) — a group may offer as many variants as prototyping produces.
- Each group may offer multiple **variants**: distinct, fully-specified pairings of typefaces, colour tokens, spacing, and layout decisions that share the group's overall creative intent (e.g. `scholarly` variants: "classic-ivy", "nordic-minimalist", "dark-academia", "scientific-journal", "contemporary-research-lab"). A group with only one viable direction may ship a single variant.
- Variant selection uses a second, group-scoped configuration key, e.g. `extra.presentation_variant` in `config.toml`. Each group MUST designate one variant as its default, used when `extra.presentation_variant` is unset or names a variant that does not exist within the selected group.
- The number of groups, their names, the number of variants per group, variant names, and their specific typeface pairings are to be determined during prototyping and documented separately (not in this constitution).
- All preset style groups — and every variant within them — must independently satisfy the requirements in §1 (WCAG AA), §4 (fonts and readability), §5 (12-column grid), and §6 (navigation collapse).

## 8. Design tokens

- Each presentation style group has a frozen set of design tokens documented in `docs/design-tokens-<group-name>.md` (e.g. `design-tokens-scholarly.md`), containing one section per variant. Tokens are discovered and approved during prototyping; once approved, they become the spec for CSS/template implementation.
- **Every variant of every presentation style group must provide both light and dark mode variants.** Users can select any group/variant combination regardless of their `prefers-color-scheme` preference.
- Design tokens for each variant must include:
  - Colour palette (light mode and dark mode): named CSS custom properties with hex values for each mode, e.g. `--colour-bg-primary: #ffffff` (light), `--colour-bg-primary: #1a1a1a` (dark). These values are toggled by the theme switcher.
  - Spacing scale: base unit and multiples (e.g. `--space-xs: 0.5rem`, `--space-sm: 1rem`, `--space-md: 1.5rem`...).
  - Type scale: `--font-size-h1`, `--font-size-body`, `--font-size-small` with rem or px values, and corresponding `--line-height-*` values.
  - Border radius (if applicable): `--radius-sm`, `--radius-md`.
  - Shadows (if applicable): `--shadow-sm`, `--shadow-md` for layering.
  - Grid breakpoints and column spans (see §5): named custom properties or documented values for how each region maps onto the 12-column grid at each breakpoint.
  - Navigation collapse breakpoint and treatment (see §6): the viewport width at which the nav collapses, and the documented expanded/collapsed styling either side of it.
- All colour values must be verified to maintain WCAG AA contrast ratios in both light and dark mode, for every variant, before the token set is approved.

## 9. Brand identity

- The theme MUST use the approved Tapestry logo, rendered via `currentColor` so it inherits each preset style's own colour tokens rather than carrying a fixed colour. The full specification, usage rules, and canonical source files are frozen in `docs/brand-logo.md`.
- The logo's wordmark portion MUST be vector outlines, not live text, so it renders identically regardless of whether any web font is installed or downloads successfully. Brand identity may not silently depend on network font availability.
- The logo is a single frozen asset shared across every preset style group and variant — unlike fonts, colours, and tokens (§8), it does not get redrawn or recoloured per style. Any request to reskin the logo per style is a constitutional conflict; flag it rather than silently complying.

## 10. Amendments

- Any new non-negotiable belongs here, not in CLAUDE.md.
- State new clauses as direct, verifiable requirements ("contrast ratio ≥ 4.5:1 for body text"), not vague guidance ("follow best practices").
- When adding or changing a clause, record the date and reason in the changelog below, so drift over time stays visible.

---

**Changelog**

- `2026-JUL-04-001` — Initial constitution: WCAG AA, no-JS-except-theme-switcher, and the terminus compatibility pinning strategy established. Fonts and design tokens frameworks established; specific typeface pairings and presentation styles deferred to prototyping.
- `2026-JUL-04-002` — Clarified §2 (JavaScript): the theme-switcher exception scopes narrowly to terminus's `js/theme-switcher.js`, not to terminus's JS footprint generally. Reason: the terminus compatibility audit (pinned snapshot `aa8d8b67f9ab69ae48e1405f96e152d41f03e0ed`) found terminus ships three additional JS features (popover auto-close, copy-to-clipboard, KaTeX rendering) beyond the theme switcher, which the original "equivalent in scope to terminus's own implementation" wording could be misread as endorsing. No change to the substantive rule (still zero JS except the switcher) — wording only.
- `2026-JUL-04-003` — Added §5 Layout grid system: every preset presentation style must be built on a 12-column responsive CSS grid, with no per-style opt-out. Reason: requested as a cross-cutting structural constraint (not a per-style choice) at the start of 'scholarly' style prototyping, so all five presets stay visually and structurally consistent at the grid level regardless of typography/colour differences. Renumbered §§5–7 to §§6–8 accordingly and fixed a stale §6 cross-reference in the intro (was pointing at Design tokens instead of Amendments).
- `2026-JUL-04-004` — Restructured §6 (Presentation styles) and §7 (Design tokens) into a two-level **group + variant** model: the 5-preset cap now applies to top-level groups (e.g. `scholarly`, `creative`, `engineering`), each of which may contain multiple fully-specified variants selected via a second config key (`extra.presentation_variant`), with one variant designated default per group. Reason: 'scholarly' prototyping produced five genuinely distinct, viable variants; flattening them into five separate top-level presets (`scholarly-01`...`scholarly-05`) would have consumed the entire 5-preset budget on one look-and-feel family, leaving no room for the other groups planned (`creative`, `engineering`, etc.). Design tokens now live one file per group (`docs/design-tokens-<group-name>.md`) with a section per variant, rather than one file per flattened style. No change to the substantive per-variant requirements (WCAG AA, font specification, 12-column grid, light/dark mode) — all now explicitly apply per variant rather than per top-level style.
- `2026-JUL-04-005` — Added §6 Navigation: the main nav must collapse into a disclosure/hamburger pattern below a breakpoint, implemented without JavaScript (native `popover`/`popovertarget`, `<details>`/`<summary>`, or checkbox-hack — never terminus's own JS auto-closer), with no per-style or per-variant exception. Reason: auditing the scholarly/creative style tiles found none of the ten prototype navs had a working collapse mechanism at all — they only looked fine at phone width because the sample menus happened to be short, which would silently break (horizontal overflow, violating §5) the moment a real site used more or longer menu items. Renumbered §§6–8 to §§7–9 accordingly; added a corresponding "must independently satisfy" reference in §7 (Presentation styles) and a nav-breakpoint token bullet in §8 (Design tokens).
- `2026-JUL-04-006` — Added §9 Brand identity: the theme must use the approved Tapestry logo (the "woven monogram" mark), rendered via `currentColor`, spec frozen in `docs/brand-logo.md`. Reason: the logo went through five prototyped concepts and two rounds of refinement (icon merged into the wordmark as the literal "t"; wordmark converted from live text to true vector outlines extracted from Space Grotesk Bold, so it no longer depends on the font loading) and is now approved — this closes out that design decision the same way approved design tokens get frozen into their own doc. Renumbered §9 (Amendments) to §10.
- `2026-JUL-04-007` — Pinned the Zola version to `0.22.1` in §3 (Terminus compatibility). Reason: CLAUDE.md's build-command checklist already instructed confirming the installed Zola version against a pin in this file, but no such pin existed yet — a dangling instruction with nothing to point at. `0.22.1` was chosen because it satisfies both terminus's own `min_version = "0.22.0"` and the Zola `0.21.0`+ requirement for GitHub-style alerts already relied on in the compat contract.