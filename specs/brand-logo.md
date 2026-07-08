# Tapestry brand logo — "Woven Monogram"

Frozen specification per [CONSTITUTION.md](../CONSTITUTION.md) §9. This is the
single approved Tapestry logo, shared across every preset presentation style
and variant — it is not redrawn or recoloured per style.

- **Approved:** 2026-07-04.
- **Concept:** Woven Monogram (one of five concepts prototyped under
  `prototypes/logo/`; see `logo-concepts-gallery.html` in that directory for
  the four concepts not chosen and the rationale for each).
- **Canonical source files (current location, pending copy into
  `themes/tapestry/static/` at implementation time):**
  - Primary rectangular lockup: `prototypes/logo/logo-01-woven-monogram-wide.svg`
  - Square icon / favicon source: `prototypes/logo/logo-01-woven-monogram-square.svg`

## 1. Design rationale

"Tapestry" evokes intricate, layered weaving — but the project delivers
clean, minimal design templates. This mark resolves that tension by reducing
"weaving" to the smallest possible gesture: a single thread crossing under
another, once. The icon reads as a monogram at a glance, built from two
stacked "T" shapes (a large one — crossbar + upper stem — and a small one —
weft thread + lower stem), which also lets it double as the literal "t" of
the wordmark "tapestry" in the rectangular lockup.

## 2. Construction spec

### 2.1 Icon (the mark itself)

Square coordinate space, `viewBox="0 0 64 64"`. Four strokes, all
`stroke="currentColor"`, `stroke-width="6"`, `stroke-linecap="round"`, no fill:

| Element | Path | Purpose |
|---|---|---|
| Crossbar | `line x1="12" y1="16" x2="52" y2="16"` | Top bar of the "T" |
| Upper stem | `line x1="32" y1="16" x2="32" y2="30"` | Stem above the weave gap |
| Lower stem | `line x1="32" y1="44" x2="32" y2="54"` | Stem below the weave gap |
| Weft thread | `line x1="18" y1="37" x2="46" y2="37"` | Crosses the gap between the two stem segments, creating the woven illusion |

With 6px round-capped strokes, the icon's true visual (ink) bounding box is
**x: [9, 55], y: [13, 57]** — i.e. a 46×44 mark, not a perfect 64×64 fill;
this matters when compositing it against other elements (see §2.2) or when
deriving a favicon (§4).

### 2.2 Rectangular lockup (icon + wordmark)

The icon **is** the "t" of "tapestry" — there is no separately-typed "t".
"apestry" follows immediately after it. Two spacing/rendering decisions were
made deliberately, both verified numerically rather than eyeballed:

1. **Consistent gap rhythm.** The gap between the icon's right edge (x=55)
   and the first letter "a" equals the gap between every subsequent pair of
   letters in "apestry": **10 SVG units**, at a wordmark font-size of 30.
   This is implemented as explicit per-glyph `dx="10"` offsets between
   `<tspan>`s — **not** the CSS/SVG `letter-spacing` property, which adds a
   phantom gap *after* the last character too (confirmed by measuring actual
   glyph advances: with `letter-spacing`, total advance was 176.7 units
   against a true ink width of 167.1 — a ~10-unit gap with nothing after it).
2. **Font-independent wordmark.** "apestry" is not live `<text>`. It has been
   converted to real vector path outlines extracted directly from the actual
   **Space Grotesk Bold** (weight 700) glyph data, so the wordmark renders
   pixel-identically regardless of whether Space Grotesk is installed or
   successfully downloads over the network. Each letter is a `<path>` with
   its own glyph outline (in font units) plus a `transform="matrix(s 0 0 -s
   tx 42)"`, where `s = fontSize / unitsPerEm = 30/1000 = 0.03` (Space
   Grotesk's `unitsPerEm` is 1000) and `tx` is that letter's absolute x
   position (icon right edge + cumulative advances + gaps, per point 1
   above). The whole lockup (icon + wordmark) is wrapped in one `<g>` and
   translated so it sits centred — both horizontally and vertically — on
   its own measured combined ink bounding box within a `viewBox="0 0 260
   64"` canvas.

**Reproducing or resizing the wordmark outlines:** if the mark ever needs to
change size, do not simply scale the existing paths naively without
re-checking proportions — regenerate the outlines from the source font using
[fontTools](https://github.com/fonttools/fonttools) (`SVGPathPen` for the
glyph outlines, `BoundsPen` for exact bounding boxes), following the same
method used to produce the current file: download Space Grotesk Bold
(`https://fonts.gstatic.com/s/spacegrotesk/...` — resolve the current URL via
the Google Fonts CSS2 API, `family=Space+Grotesk:wght@700`), extract outlines
for each letter in "apestry", scale/position them per the formula above, and
recompute the centring translate from the true combined bounding box.

## 3. Colour rule

The entire mark — icon strokes and wordmark fill alike — uses `currentColor`
exclusively. No hex values are hard-coded anywhere in the source files. This
is what lets one SVG asset drop into any preset style/variant and
automatically inherit that style's own colour token (e.g. `--colour-text-heading`
or `--colour-accent-primary`, whichever the embedding context sets as the CSS
`color`), per CONSTITUTION.md §9.

## 4. Favicon / square-icon derivation

Use `logo-01-woven-monogram-square.svg` (the icon alone, no wordmark) as the
source for any square application — browser favicon, app icon, social
preview avatar, etc. Do not crop the wordmark lockup into a square; the icon
was designed square-native from the start for exactly this purpose.

When rasterising for favicon formats that require a fixed background colour
(e.g. `.ico`, PNG-based `apple-touch-icon`), pick a background from whichever
preset style/variant is the site's active one at build time, and set the
icon's rendered colour to that style's foreground/heading colour token —
still governed by the "one frozen mark, per-style colour inheritance" rule
in CONSTITUTION.md §9, just resolved to concrete pixels at raster time
instead of left as `currentColor`.

## 5. Usage rules

- **Do not** recolour the mark with a fixed brand colour — it must always
  inherit `currentColor` from its embedding context (this is what makes one
  asset work across all five preset style groups and their variants).
- **Do not** stretch or distort the aspect ratio of either file. Scale
  uniformly only.
- **Do not** redraw, simplify, or add ornamentation to the icon per
  presentation style — it is one frozen mark, not a per-style variable (see
  CONSTITUTION.md §9's explicit call-out that this is a constitutional
  conflict if requested).
- **Minimum clear space:** leave at least half the icon's own height (≈22px
  at native `viewBox` scale) of empty margin on all sides when placing the
  mark next to other UI elements (e.g. in the site header, alongside nav).
- **Minimum size:** the icon should not be rendered smaller than 24×24px in
  any live context (favicons aside, which are a special case per §4) — below
  that the weave gap in the strokes stops reading clearly.

## 6. File manifest

| File | Purpose | Aspect ratio |
|---|---|---|
| `prototypes/logo/logo-01-woven-monogram-wide.svg` | Primary lockup (icon + wordmark) | Rectangular, `viewBox="0 0 260 64"` |
| `prototypes/logo/logo-01-woven-monogram-square.svg` | Icon only, for favicons/square contexts | Square, `viewBox="0 0 64 64"` |

Both files currently live under `prototypes/` because the theme
implementation itself (`themes/tapestry/`) hasn't started yet. When
implementation begins, copy these two files verbatim into
`themes/tapestry/static/images/logo/` (or wherever the theme's static asset
convention lands) — do not redraw them from this spec; the files themselves
are the source of truth, this document is the rationale and usage guide.
