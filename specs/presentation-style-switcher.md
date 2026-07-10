# Presentation style/variant switcher — interaction spec

Frozen specification per [CONSTITUTION.md](../CONSTITUTION.md) §2 (amendment
2026-JUL-10-001). This document covers the switcher's menu structure and
interaction behaviour; it does not cover *whether* the switcher exists at all
(§2 already gates that on `extra.presentation_style_switcher`, default `false`)
or the colour/type/spacing tokens it lets a visitor preview (those are frozen
per group in `specs/design-tokens-<group-name>.md`).

- **Approved:** 2026-07-10.
- **Supersedes:** the flat, single-level `<style>/<variant>` listing shipped
  in `themes/tapestry/templates/partials/style-switcher.html` as of commit
  `06a5442` (10 combinations: `scholarly` × 5 variants, `creative` × 5
  variants). That flat structure remains valid *content* — every combination
  still needs an entry — but the *shape* it's rendered in changes per this
  spec.

## 1. Why grouped, not flat

A flat list scales linearly with total variants across all groups. At the
§7 cap of 5 style groups, each free to define as many variants as
prototyping produces, a flat list has no ceiling — 10 combinations (the
count at the time of this amendment) was already the point where the menu
stopped reading as a quick picker and started reading as a wall of text; 25
would be unusable. Grouping by style caps what's visible at rest to one row
per style group (5, frozen by §7), with variants revealed only for the group
currently open.

## 2. Markup shape

Two-level nested disclosure: an outer `popover`-based menu (unchanged
mechanism from the current implementation — the `.style-switcher-toggle`
button and `popovertarget`), containing one `<details>` per style group,
each wrapping a `<ul>` of that group's variant buttons.

```html
<div class="style-switcher">
  <button type="button" class="style-switcher-toggle" popovertarget="style-switcher-menu"
      aria-haspopup="true" aria-label="Choose presentation style and variant">
    <!-- gear icon, unchanged -->
  </button>
  <ul id="style-switcher-menu" class="style-switcher-menu" aria-label="Presentation style and variant" popover>
    <li>
      <details name="style-switcher-group" class="style-switcher-group" data-style="scholarly">
        <summary>Scholarly</summary>
        <ul>
          <li><button type="button" class="style-switcher-option" data-style="scholarly" data-variant="classic-ivy">Classic Ivy</button></li>
          <li><button type="button" class="style-switcher-option" data-style="scholarly" data-variant="nordic-minimalist">Nordic Minimalist</button></li>
          <li><button type="button" class="style-switcher-option" data-style="scholarly" data-variant="dark-academia">Dark Academia</button></li>
          <li><button type="button" class="style-switcher-option" data-style="scholarly" data-variant="scientific-journal">Scientific Journal</button></li>
          <li><button type="button" class="style-switcher-option" data-style="scholarly" data-variant="contemporary-research-lab">Contemporary Research Lab</button></li>
        </ul>
      </details>
    </li>
    <li>
      <details name="style-switcher-group" class="style-switcher-group" data-style="creative">
        <summary>Creative</summary>
        <ul>
          <li><button type="button" class="style-switcher-option" data-style="creative" data-variant="bauhaus-studio">Bauhaus Studio</button></li>
          <li><button type="button" class="style-switcher-option" data-style="creative" data-variant="editorial-zine">Editorial Zine</button></li>
          <li><button type="button" class="style-switcher-option" data-style="creative" data-variant="watercolor-atelier">Watercolor Atelier</button></li>
          <li><button type="button" class="style-switcher-option" data-style="creative" data-variant="neon-studio">Neon Studio</button></li>
          <li><button type="button" class="style-switcher-option" data-style="creative" data-variant="collage-mixed-media">Collage Mixed Media</button></li>
        </ul>
      </details>
    </li>
  </ul>
</div>
```

Notes on this shape:

- Variant button labels switch from the current `scholarly/classic-ivy`
  slug form to a human-readable title (`Classic Ivy`) — the group is now
  named once, on the `<summary>`, so repeating it per variant is redundant.
  `data-style`/`data-variant` attributes keep the machine-readable slugs;
  `presentation-style-switcher.js` is unaffected since it already reads
  those attributes, not the button text.
- `<details name="style-switcher-group">` on every group is what makes them
  mutually exclusive: opening one closes any other open group, natively, in
  every current evergreen browser, with zero JS. This is the same
  no-JS-first posture as §6's nav collapse.

## 3. Accordion behaviour

- Exactly zero or one group is open at a time (native `<details name>`
  semantics — see §2).
- Clicking an already-open group's `<summary>` closes it, leaving zero
  groups open (native `<details>` toggle behaviour; not overridden).
- No group is required to start open in the *markup default* — see §4 for
  the actual open-on-menu-open rule, which is applied via the `open`
  attribute rather than by relying on this section's baseline.

## 4. Auto-expand and marking the active choice

Two independent rules, both keyed off the currently resolved
`data-style`/`data-variant` (the same values `base.html` resolves onto
`<body>`, per its existing fallback logic):

1. **Auto-expand:** the `<details>` whose `data-style` matches the current
   style renders with the `open` attribute already set — at build time via
   Tera (the template already has the resolved style/variant available for
   this, see `base.html`'s existing resolution block), and updated by
   `presentation-style-switcher.js` (`applyChoice()`) whenever a visitor
   picks a variant from a different group, so the newly-active group is the
   one left open afterward.
2. **Marking current:** both of the following get a bold visual treatment
   (a dedicated CSS rule keyed off `[aria-current="true"]`, and a matching
   rule on the group `<summary>` keyed off a `data-style` match against
   `<body data-style>`):
   - The active variant's `<button>` — already gets `aria-current="true"`
     from the existing `updateCurrentOption()` function in
     `presentation-style-switcher.js`; no JS logic change needed there,
     only the CSS rule that renders it bold.
   - The active group's `<summary>` — bold whenever `data-style` on the
     `<details>` matches `<body data-style>`, **regardless of whether that
     group is currently open or collapsed**. This is what lets a visitor
     tell which group they're in without opening anything, addressing the
     original "which group do I even open" scaling problem directly.

Both rules re-evaluate on every `applyChoice()` call
(`presentation-style-switcher.js`), so switching groups live keeps the
auto-expand and bold-marking in sync with the new selection, exactly as
`updateCurrentOption()` already keeps `aria-current` in sync today.

## 5. Keyboard behaviour

No new keyboard handling is introduced — `<details>`/`<summary>` and
`popover` are both natively keyboard-operable (Tab to reach a `<summary>`,
Enter/Space to toggle it; Tab continues into an open group's variant
buttons; Escape closes the popover, per existing `popovertarget` behaviour).
This satisfies CONSTITUTION.md §1's keyboard-operability requirement for the
switcher without any script-managed focus trapping.

## 6. No-JS / switcher-disabled degradation

Unchanged from the existing rule (§2): if `extra.presentation_style_switcher`
is `false` (default) or JS is disabled, the switcher control is not
rendered/is inert, and the site stays on its build-time-configured style and
variant. One incidental improvement: because the accordion mechanic (§2–§3)
is native HTML rather than script-driven, a visitor whose
`presentation-style-switcher.js` fails to load for some reason (but who still
has the control rendered, e.g. a script error rather than the config gate)
would still see a working, correctly-grouped, correctly-pre-expanded menu —
selecting a *different* variant just wouldn't do anything, since that part
genuinely requires the JS. This is a resilience improvement, not a new
requirement.

## 7. Out of scope

- Any type-ahead/filter affordance on top of this structure (considered and
  deferred — not needed at the current 10-combination count; revisit if a
  future group/variant addition makes the grouped menu itself feel long).
- Redesigning the toggle button, its icon, or the outer popover mechanism —
  all unchanged from the current implementation.
- Design-token content (colours, type, spacing) for any style/variant —
  unaffected; see `specs/design-tokens-<group-name>.md`.
