// tests/visual-a11y/tests/smoke.spec.ts
import { test, expect } from "@playwright/test";

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
