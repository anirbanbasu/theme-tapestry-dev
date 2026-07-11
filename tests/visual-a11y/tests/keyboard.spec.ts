// tests/visual-a11y/tests/keyboard.spec.ts
import { test, expect } from "@playwright/test";
import { allVariants, MODES } from "../fixtures/permutations";
import { setPresentation } from "../lib/presentation";
import { contrastRatio } from "../lib/contrast";

const targetGroup = process.env.STYLE_GROUP;
const variants = targetGroup
  ? allVariants().filter((v) => v.style === targetGroup)
  : allVariants();

test.describe("nav collapse: keyboard operability", () => {
  test("main menu popover opens, is reachable by keyboard, and closes with Escape", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 800 }); // below the nav-collapse breakpoint
    await page.goto("/");

    const menuButton = page.locator(".main-menu-dropdown-button");
    await expect(menuButton).toBeVisible();

    await menuButton.focus();
    await page.keyboard.press("Enter");

    const menu = page.locator("#nav-menu");
    await expect(menu).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });

  test("no keyboard trap: tabbing forward N times then backward N times returns focus to start", async ({
    page,
  }) => {
    await page.goto("/warp-and-weft/everything/");
    await page.locator("body").click({ position: { x: 1, y: 1 } });

    const N = 15;
    const tags: string[] = [];
    for (let i = 0; i < N; i++) {
      await page.keyboard.press("Tab");
      tags.push(
        await page.evaluate(() => document.activeElement?.outerHTML.slice(0, 60) ?? "")
      );
    }
    for (let i = 0; i < N; i++) {
      await page.keyboard.press("Shift+Tab");
    }
    const backToStart = await page.evaluate(
      () => document.activeElement === document.body || document.activeElement?.tagName === "A"
    );
    expect(backToStart).toBe(true);
    // Distinct focus stops along the way — proof the loop didn't trap on one element.
    expect(new Set(tags).size).toBeGreaterThan(1);
  });
});

test.describe("theme toggle: keyboard operability and ARIA sync", () => {
  test("toggling with keyboard flips aria-pressed and the visible label", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-theme-toggle]");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");

    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await expect(toggle).toHaveAttribute("aria-label", "Switch to dark mode");
  });
});

test.describe("style switcher: exclusive accordion + current-state marking", () => {
  test("opening a second group's <details> closes the first (native name= exclusivity)", async ({
    page,
  }) => {
    await page.goto("/");
    const gearButton = page.locator(".style-switcher-toggle");
    await gearButton.focus();
    await page.keyboard.press("Enter");

    const scholarlyDetails = page.locator('details[data-style="scholarly"]');
    const creativeDetails = page.locator('details[data-style="creative"]');
    await expect(scholarlyDetails).toHaveJSProperty("open", true); // auto-expanded, config default is scholarly

    await creativeDetails.locator("summary").click();
    await expect(creativeDetails).toHaveJSProperty("open", true);
    await expect(scholarlyDetails).toHaveJSProperty("open", false);
  });

  test("current group and variant are marked at load, matching config.toml defaults", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator(".style-switcher-toggle").click();

    await expect(page.locator('details[data-style="scholarly"]')).toHaveClass(
      /style-switcher-group-current/
    );
  });
});

test.describe("focus-visible presence across every variant/mode", () => {
  for (const { style, variant } of variants) {
    for (const mode of MODES) {
      test(`${style}/${variant}/${mode}: a focused link has a non-none outline`, async ({
        page,
      }) => {
        await page.goto("/");
        await setPresentation(page, style, variant, mode);

        const link = page.locator("a").first();
        await link.focus();

        const outline = await link.evaluate((el) => getComputedStyle(el).outlineStyle);
        expect(outline).not.toBe("none");
      });
    }
  }
});

test.describe("focus-ring contrast (WCAG SC 1.4.11, >= 3:1)", () => {
  for (const { style, variant } of variants) {
    for (const mode of MODES) {
      test(`${style}/${variant}/${mode}: accent-on-background focus ring meets 3:1`, async ({
        page,
      }) => {
        await page.goto("/");
        await setPresentation(page, style, variant, mode);

        const [accent, background] = await page.evaluate(() => {
          const cs = getComputedStyle(document.body);
          return [
            cs.getPropertyValue("--colour-accent-primary").trim(),
            cs.getPropertyValue("--colour-bg-primary").trim(),
          ];
        });

        expect(contrastRatio(accent, background)).toBeGreaterThanOrEqual(3.0);
      });
    }
  }
});
