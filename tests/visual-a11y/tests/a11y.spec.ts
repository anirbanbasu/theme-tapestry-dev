// tests/visual-a11y/tests/a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { allVariants, PAGES, MODES } from "../fixtures/permutations";
import { setPresentation } from "../lib/presentation";

// CI shards this file by style group (visual-a11y-tests.yaml sets
// STYLE_GROUP per matrix entry); unset/empty means "run every group"
// (the default for local/manual runs).
const targetGroup = process.env.STYLE_GROUP;
const variants = targetGroup
  ? allVariants().filter((v) => v.style === targetGroup)
  : allVariants();

const a11yPages = PAGES.filter((p) => p.inA11ySweep);

for (const page of a11yPages) {
  test.describe(`a11y: ${page.slug} (${page.path})`, () => {
    for (const { style, variant } of variants) {
      for (const mode of MODES) {
        test(`${style}/${variant}/${mode} has no WCAG 2.1 AA violations`, async ({
          page: browserPage,
        }) => {
          await browserPage.goto(page.path);
          await setPresentation(browserPage, style, variant, mode);

          const results = await new AxeBuilder({ page: browserPage })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze();

          expect(
            results.violations,
            JSON.stringify(results.violations, null, 2)
          ).toEqual([]);
        });
      }
    }
  });
}
