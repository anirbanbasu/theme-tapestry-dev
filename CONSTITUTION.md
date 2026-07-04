# CONSTITUTION.md

Non-negotiable standards for the **Tapestry** Zola theme. These constraints hold regardless of which templates, styles, or design tokens change beneath them. Read alongside @CLAUDE.md, not instead of it — this file states *what must always be true*; CLAUDE.md states *how to work day to day*.

Amend this file deliberately and explicitly (see §6). Do not let it erode silently through unrelated operational work.

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

## 5. Presentation styles

- The theme ships with a set of **preset presentation styles** that users can select via theme configuration (e.g. `extra.presentation_style` in `config.toml`).
- Maximum of **5 preset styles**. Each style is a complete, tested pairing of typefaces, colour tokens, spacing, and layout decisions.
- The number of preset styles, their names, and their specific typeface pairings are to be determined during prototyping and documented separately (not in this constitution).
- All preset styles must independently satisfy the requirements in §1 (WCAG AA) and §4 (fonts and readability).

## 6. Design tokens

- Each presentation style has a frozen set of design tokens documented in `docs/design-tokens-<style-name>.md` (e.g. `design-tokens-scholarly.md`). Tokens are discovered and approved during prototyping; once approved, they become the spec for CSS/template implementation.
- **All five presentation styles must provide both light and dark mode variants**. Users can select any style regardless of their `prefers-color-scheme` preference.
- Design tokens for a style must include:
  - Colour palette (light mode and dark mode): named CSS custom properties with hex values for each mode, e.g. `--colour-bg-primary: #ffffff` (light), `--colour-bg-primary: #1a1a1a` (dark). These values are toggled by the theme switcher.
  - Spacing scale: base unit and multiples (e.g. `--space-xs: 0.5rem`, `--space-sm: 1rem`, `--space-md: 1.5rem`...).
  - Type scale: `--font-size-h1`, `--font-size-body`, `--font-size-small` with rem or px values, and corresponding `--line-height-*` values.
  - Border radius (if applicable): `--radius-sm`, `--radius-md`.
  - Shadows (if applicable): `--shadow-sm`, `--shadow-md` for layering.
- All colour values must be verified to maintain WCAG AA contrast ratios in both light and dark mode before the token set is approved.

## 7. Amendments

- Any new non-negotiable belongs here, not in CLAUDE.md.
- State new clauses as direct, verifiable requirements ("contrast ratio ≥ 4.5:1 for body text"), not vague guidance ("follow best practices").
- When adding or changing a clause, record the date and reason in the changelog below, so drift over time stays visible.

---

**Changelog**

- `2026-JUL-04-001` — Initial constitution: WCAG AA, no-JS-except-theme-switcher, and the terminus compatibility pinning strategy established. Fonts and design tokens frameworks established; specific typeface pairings and presentation styles deferred to prototyping.
- `2026-JUL-04-002` — Clarified §2 (JavaScript): the theme-switcher exception scopes narrowly to terminus's `js/theme-switcher.js`, not to terminus's JS footprint generally. Reason: the terminus compatibility audit (pinned snapshot `aa8d8b67f9ab69ae48e1405f96e152d41f03e0ed`) found terminus ships three additional JS features (popover auto-close, copy-to-clipboard, KaTeX rendering) beyond the theme switcher, which the original "equivalent in scope to terminus's own implementation" wording could be misread as endorsing. No change to the substantive rule (still zero JS except the switcher) — wording only.