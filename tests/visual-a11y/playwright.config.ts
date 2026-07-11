// tests/visual-a11y/playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",

  use: {
    baseURL: "http://127.0.0.1:1111",
    trace: "on-first-retry",
  },

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },

  // Playwright's own default (no --update-snapshots flag) is "missing" —
  // silently writing a baseline for any snapshot that doesn't exist yet,
  // which directly violates design spec §5's "baselines are never generated
  // locally" rule the moment someone runs visual.spec.ts without realizing
  // it. "none" makes a missing baseline just fail, like any other assertion;
  // the CLI's explicit `--update-snapshots` flag (used only by the
  // workflow_dispatch baseline-update job) overrides this config value.
  updateSnapshots: "none",

  // Screenshot paths become screenshots/<page-slug>/<style>-<variant>-<mode>-<width>.png
  // via the explicit filename each toHaveScreenshot() call passes in visual.spec.ts —
  // this template just pins the root directory (design spec §5).
  snapshotPathTemplate: "screenshots/{arg}{ext}",

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npx http-server ../../public -p 1111 -s -c-1",
    port: 1111,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
