import { test, expect } from "@playwright/test";
import {
  STYLE_GROUPS,
  MODES,
  VIEWPORT_WIDTHS,
  PAGES,
  allVariants,
  defaultVariants,
  variantsForGroup,
} from "../../fixtures/permutations";

test("exactly 5 style groups, capped per CONSTITUTION.md §7", () => {
  expect(Object.keys(STYLE_GROUPS)).toHaveLength(5);
  expect(Object.keys(STYLE_GROUPS).sort()).toEqual(
    ["collective", "creative", "natural", "precision", "scholarly"].sort()
  );
});

test("every group has exactly 5 variants, including its own default", () => {
  for (const [group, def] of Object.entries(STYLE_GROUPS)) {
    expect(def.variants).toHaveLength(5);
    expect(def.variants).toContain(def.defaultVariant);
  }
});

test("allVariants() flattens to 25 entries", () => {
  expect(allVariants()).toHaveLength(25);
});

test("defaultVariants() returns exactly one variant per group, flagged isDefault", () => {
  const defaults = defaultVariants();
  expect(defaults).toHaveLength(5);
  for (const d of defaults) {
    expect(d.isDefault).toBe(true);
    expect(STYLE_GROUPS[d.style].defaultVariant).toBe(d.variant);
  }
});

test("variantsForGroup() returns only that group's 5 variants", () => {
  expect(variantsForGroup("scholarly")).toHaveLength(5);
  for (const v of variantsForGroup("scholarly")) {
    expect(v.style).toBe("scholarly");
  }
});

test("MODES is exactly light and dark", () => {
  expect(MODES).toEqual(["light", "dark"]);
});

test("VIEWPORT_WIDTHS matches the design spec's 4 fixed widths", () => {
  expect(VIEWPORT_WIDTHS).toEqual([320, 768, 1280, 1440]);
});

test("9 fixture pages, matching design spec §3", () => {
  expect(PAGES).toHaveLength(9);
  const a11yOnly = PAGES.filter((p) => p.inA11ySweep && !p.inVisualRegression);
  expect(a11yOnly.map((p) => p.slug)).toEqual(["tags-list"]);
  expect(PAGES.filter((p) => p.inVisualRegression)).toHaveLength(8);
});
