// tests/visual-a11y/lib/presentation.ts
import type { Page } from "@playwright/test";
import type { Mode } from "../fixtures/permutations";

/**
 * Flips <body data-style/data-variant> and <html data-color-mode> directly,
 * the same attributes themes/tapestry/static/js/presentation-style-switcher.js's
 * applyChoice() and theme-switcher.js's applyMode() set. Every variant's
 * tokens are already compiled into the one stylesheet the page loaded
 * (themes/tapestry/sass/css/_variants.scss's `@each` loop is unconditional),
 * so this never requires a navigation or rebuild — just a repaint.
 */
export async function setPresentation(
  page: Page,
  style: string,
  variant: string,
  mode: Mode
): Promise<void> {
  await page.evaluate(
    ({ style, variant, mode }) => {
      document.body.setAttribute("data-style", style);
      document.body.setAttribute("data-variant", variant);
      document.documentElement.setAttribute("data-color-mode", mode);
    },
    { style, variant, mode }
  );
}
