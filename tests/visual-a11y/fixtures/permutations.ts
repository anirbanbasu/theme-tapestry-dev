/**
 * Single source of truth for style groups, variants, default variants, and
 * fixture-page URLs. a11y.spec.ts, visual.spec.ts, keyboard.spec.ts, and the
 * CI shard matrix (.github/workflows/visual-a11y-tests.yaml) all read from
 * this module — adding a variant, group, or fixture page is a one-file edit.
 *
 * Mirrors themes/tapestry/templates/base.html's `valid_*_variants` /
 * `valid_styles` arrays and specs/design-tokens-*.md's defaults. Kept in
 * sync by hand, same as the three-way duplication already documented in
 * static/js/presentation-style-switcher.js's own header comment.
 */

export interface StyleGroupDef {
  defaultVariant: string;
  variants: string[];
}

export const STYLE_GROUPS: Record<string, StyleGroupDef> = {
  scholarly: {
    defaultVariant: "contemporary-research-lab",
    variants: [
      "classic-ivy",
      "nordic-minimalist",
      "dark-academia",
      "scientific-journal",
      "contemporary-research-lab",
    ],
  },
  creative: {
    defaultVariant: "editorial-zine",
    variants: [
      "bauhaus-studio",
      "editorial-zine",
      "watercolor-atelier",
      "neon-studio",
      "collage-mixed-media",
    ],
  },
  natural: {
    defaultVariant: "periodic-table-chemistry",
    variants: [
      "celestial-observatory",
      "periodic-table-chemistry",
      "field-notebook",
      "chalkboard-proof",
      "quantum-circuit",
    ],
  },
  precision: {
    defaultVariant: "swiss-precision-instrument",
    variants: [
      "blueprint-drafting",
      "surgical-precision",
      "aerospace-materials-lab",
      "biomedical-diagnostics",
      "swiss-precision-instrument",
    ],
  },
  collective: {
    defaultVariant: "cartographers-atlas",
    variants: [
      "cartographers-atlas",
      "ledger-index",
      "social-network-diagram",
      "agora-classical-philosophy",
      "strata-geology",
    ],
  },
};

export const MODES = ["light", "dark"] as const;
export type Mode = (typeof MODES)[number];

export const VIEWPORT_WIDTHS = [320, 768, 1280, 1440] as const;
export type ViewportWidth = (typeof VIEWPORT_WIDTHS)[number];

export interface FixturePage {
  slug: string;
  path: string;
  inA11ySweep: boolean;
  inVisualRegression: boolean;
}

// Mirrors design spec §3's URL table exactly.
export const PAGES: FixturePage[] = [
  { slug: "home", path: "/", inA11ySweep: true, inVisualRegression: true },
  { slug: "warp-and-weft", path: "/warp-and-weft/", inA11ySweep: true, inVisualRegression: true },
  { slug: "everything", path: "/warp-and-weft/everything/", inA11ySweep: true, inVisualRegression: true },
  { slug: "no-sidebar", path: "/warp-and-weft/no-sidebar/", inA11ySweep: true, inVisualRegression: true },
  { slug: "custom-sidebar", path: "/warp-and-weft/custom-sidebar/", inA11ySweep: true, inVisualRegression: true },
  { slug: "archive-view", path: "/warp-and-weft/archive-view/", inA11ySweep: true, inVisualRegression: true },
  { slug: "tag-test-fixture", path: "/tags/test-fixture/", inA11ySweep: true, inVisualRegression: true },
  { slug: "not-found", path: "/this-page-intentionally-does-not-exist/", inA11ySweep: true, inVisualRegression: true },
  { slug: "tags-list", path: "/tags/", inA11ySweep: true, inVisualRegression: false },
];

export interface VariantRef {
  style: string;
  variant: string;
  isDefault: boolean;
}

export function allVariants(): VariantRef[] {
  const out: VariantRef[] = [];
  for (const [style, def] of Object.entries(STYLE_GROUPS)) {
    for (const variant of def.variants) {
      out.push({ style, variant, isDefault: variant === def.defaultVariant });
    }
  }
  return out;
}

export function defaultVariants(): VariantRef[] {
  return Object.entries(STYLE_GROUPS).map(([style, def]) => ({
    style,
    variant: def.defaultVariant,
    isDefault: true,
  }));
}

export function variantsForGroup(group: string): VariantRef[] {
  const def = STYLE_GROUPS[group];
  if (!def) {
    throw new Error(`Unknown style group: ${group}`);
  }
  return def.variants.map((variant) => ({
    style: group,
    variant,
    isDefault: variant === def.defaultVariant,
  }));
}
