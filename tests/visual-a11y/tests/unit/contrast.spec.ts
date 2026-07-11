import { test, expect } from "@playwright/test";
import { relativeLuminance, contrastRatio } from "../../lib/contrast";

test("relative luminance of pure white is 1", () => {
  expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 5);
});

test("relative luminance of pure black is 0", () => {
  expect(relativeLuminance("#000000")).toBeCloseTo(0, 5);
});

test("contrast ratio of black on white is 21:1", () => {
  expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
});

test("contrast ratio is symmetric", () => {
  expect(contrastRatio("#123456", "#abcdef")).toBeCloseTo(
    contrastRatio("#abcdef", "#123456"),
    5
  );
});

test("contrast ratio of a colour against itself is 1:1", () => {
  expect(contrastRatio("#7a2231", "#7a2231")).toBeCloseTo(1, 5);
});

test("accepts 3-digit hex shorthand", () => {
  expect(contrastRatio("#000", "#fff")).toBeCloseTo(21, 1);
});

test("known WCAG example: #767676 on #ffffff meets 4.5:1 (AA normal text)", () => {
  expect(contrastRatio("#767676", "#ffffff")).toBeGreaterThanOrEqual(4.5);
});
