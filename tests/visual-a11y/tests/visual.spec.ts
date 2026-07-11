// tests/visual-a11y/tests/visual.spec.ts
import { test, expect } from "@playwright/test";
import { defaultVariants, PAGES, MODES, VIEWPORT_WIDTHS } from "../fixtures/permutations";
import { setPresentation } from "../lib/presentation";

const targetGroup = process.env.STYLE_GROUP;
const variants = targetGroup
  ? defaultVariants().filter((v) => v.style === targetGroup)
  : defaultVariants();

const visualPages = PAGES.filter((p) => p.inVisualRegression);

for (const page of visualPages) {
  test.describe(`visual: ${page.slug} (${page.path})`, () => {
    for (const { style, variant } of variants) {
      for (const mode of MODES) {
        for (const width of VIEWPORT_WIDTHS) {
          test(`${style}/${variant}/${mode}/${width}px matches baseline`, async ({
            page: browserPage,
          }) => {
            await browserPage.setViewportSize({ width, height: 1024 });
            await browserPage.goto(page.path);
            await setPresentation(browserPage, style, variant, mode);

            await expect(browserPage).toHaveScreenshot(
              `${page.slug}/${style}-${variant}-${mode}-${width}.png`,
              { fullPage: true }
            );
          });
        }
      }
    }
  });
}
