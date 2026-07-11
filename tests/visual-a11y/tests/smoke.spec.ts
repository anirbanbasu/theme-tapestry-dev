// tests/visual-a11y/tests/smoke.spec.ts
import { test, expect } from "@playwright/test";
import { setPresentation } from "../lib/presentation";

test("home page loads and has the expected title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Tapestry");
});

test("home page body carries the config-default style/variant", async ({ page }) => {
  await page.goto("/");
  const body = page.locator("body");
  await expect(body).toHaveAttribute("data-style", "scholarly");
  await expect(body).toHaveAttribute("data-variant", "contemporary-research-lab");
});

test("warp-and-weft fixture section is reachable", async ({ page }) => {
  await page.goto("/warp-and-weft/");
  // section.html renders section.content directly with no auto <h1>; the
  // page <title> ("Warp & Weft | Tapestry", from section.html's title
  // block) is the reliable, always-present signal that the fixture section
  // rendered, not a missing heading element.
  await expect(page).toHaveTitle(/Warp & Weft/);
});

test("setPresentation() flips data-style/data-variant/data-color-mode without navigation", async ({ page }) => {
  await page.goto("/");
  await setPresentation(page, "creative", "neon-studio", "dark");

  const body = page.locator("body");
  await expect(body).toHaveAttribute("data-style", "creative");
  await expect(body).toHaveAttribute("data-variant", "neon-studio");
  await expect(page.locator("html")).toHaveAttribute("data-color-mode", "dark");

  // Confirm the compiled CSS actually reacted — _variants.scss keys every
  // custom property off these attribute selectors unconditionally.
  const accent = await page.evaluate(() =>
    getComputedStyle(document.body).getPropertyValue("--colour-accent-primary").trim()
  );
  expect(accent).not.toBe("");
});
