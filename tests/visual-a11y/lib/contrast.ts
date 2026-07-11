/**
 * WCAG 2.1 relative luminance and contrast ratio math
 * (https://www.w3.org/TR/WCAG21/#dfn-relative-luminance /
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio), used by
 * tests/keyboard.spec.ts to check focus-ring contrast (SC 1.4.11, ≥ 3:1)
 * against the live --colour-accent-primary / --colour-bg-primary custom
 * properties, read directly from the page rather than duplicating the hex
 * values from themes/tapestry/sass/css/_variants.scss a third time.
 */

function normalizeHex(hex: string): string {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error(`Invalid hex colour: ${hex}`);
  }
  return h;
}

function srgbChannelToLinear(c: number): number {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const h = normalizeHex(hex);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const [rl, gl, bl] = [r, g, b].map(srgbChannelToLinear);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}
