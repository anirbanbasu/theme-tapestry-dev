#!/usr/bin/env node
/**
 * render-katex.js
 * ----------------
 * Build-time KaTeX pre-renderer for the Tapestry Zola theme demo site.
 *
 * WHY THIS EXISTS
 * ----------------
 * CONSTITUTION.md §2 bans all runtime JavaScript except the light/dark theme
 * switcher. Terminus (the upstream theme) renders KaTeX client-side via
 * `js/katex.min.js`, which Tapestry cannot ship. Per the decision recorded in
 * docs/terminus-compat-contract.md §7, Tapestry instead pre-renders KaTeX
 * markup at BUILD TIME using KaTeX's Node.js SSR API (`katex.renderToString`),
 * producing plain HTML + MathML with zero <script> tags, before handing the
 * content off to `zola build`.
 *
 * MECHANISM: WHY content/ IS NEVER MUTATED IN PLACE
 * --------------------------------------------------
 * Zola has no CLI flag to point at an alternate content directory — the
 * `content/` directory location is fixed relative to the project root
 * (`-r/--root`, which selects the whole project root, not just content).
 * That leaves three options:
 *
 *   (a) Overwrite content Markdown files in place (recursively) with rendered HTML.
 *       Rejected: this destroys the human-editable Markdown source. The next
 *       edit to the file would be editing generated HTML, and running the
 *       script twice would double-render already-rendered output.
 *
 *   (b) Write transformed copies into content/ under a naming convention
 *       (e.g. *.rendered.md) alongside the originals.
 *       Rejected: Zola would pick up BOTH the original and the transformed
 *       copy as separate pages/sections, producing duplicate content and
 *       broken permalinks.
 *
 *   (c) Build a full scratch project mirror outside content/, and run Zola
 *       with `--root` pointed at that mirror. [CHOSEN]
 *
 * This script implements (c): it creates `.katex-build/site/` (git-ignored)
 * containing:
 *   - A SYMLINK for every top-level entry in the real project root EXCEPT
 *     `content/` (so config.toml, themes/, static/, sass/, etc. are picked
 *     up live with no copying — editing them requires no re-sync).
 *   - A REAL (copied) `content/` tree, walked recursively, in which every
 *     Markdown file that has KaTeX enabled has its live (non-fenced)
 *     `$...$` / `$$...$$` math substituted with pre-rendered KaTeX HTML.
 *     Non-Markdown files (images, etc.) under content/ are copied verbatim.
 *
 * The real repo's `content/` directory is opened read-only and never
 * written to. `npm run build` / `npm run serve` invoke this script as a
 * `prebuild` step and then run `zola build|serve --root .katex-build/site`.
 *
 * KATEX-ENABLEMENT PRECEDENCE
 * ----------------------------
 * Terminus's own Tera macro (themes/terminus/templates/macros/config.html,
 * `config_macros::get`) resolves a setting as:
 *
 *   page.extra[setting] or section.extra[setting] or ancestor.extra[setting]
 *     or config.extra[setting] or default
 *
 * This script has no access to Zola's rendered page/section/ancestor
 * context, so it approximates that precedence using the filesystem:
 *
 *   1. The page's own front matter `[extra] katex` if present, else
 *   2. Its section's `_index.md` front matter `[extra] katex` if present
 *      (only the immediate parent directory's `_index.md` is checked here;
 *      terminus itself walks all ancestors, but for this repo's fixture
 *      layout — one section level deep under content/ — that reduces to
 *      the immediate parent, which this script checks explicitly), else
 *   3. The root `config.toml`'s `[extra] katex`, else
 *   4. Disabled (false).
 *
 * RAW HTML PASSTHROUGH ASSUMPTION
 * ---------------------------------
 * Zola's Markdown renderer (pulldown-cmark, CommonMark-compliant) passes
 * raw inline and block HTML through unescaped by default. The rendered
 * KaTeX snippets are substituted directly into the Markdown source as raw
 * HTML (wrapped in a `<span class="katex-inline">`/`<div class="katex-display">`
 * wrapper for inline/display math respectively) relying on that passthrough
 * behavior. This assumption is NOT yet verified end-to-end against a real
 * `zola build`, because themes/tapestry/ (templates + compiled Sass) is
 * still being built by a parallel task as of this writing — see the
 * project report for what remains to confirm once that lands.
 *
 * USAGE
 * -----
 *   npm install
 *   npm run build     # runs this script, then `zola build --root .katex-build/site`
 *   npm run serve      # runs this script, then `zola serve --root .katex-build/site`
 *
 * Re-run `npm run prebuild` (or `npm run build`/`serve`) any time content/
 * changes; the scratch mirror is fully regenerated (deleted and rebuilt)
 * on every run, so it never drifts from the real source.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('katex');

const REPO_ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(REPO_ROOT, 'content');
const SCRATCH_DIR = path.join(REPO_ROOT, '.katex-build', 'site');
const SCRATCH_CONTENT_DIR = path.join(SCRATCH_DIR, 'content');
const CONFIG_TOML_PATH = path.join(REPO_ROOT, 'config.toml');

// ---------------------------------------------------------------------------
// Minimal TOML front-matter reading: we only need one boolean flag
// (`[extra] katex`), so a hand-rolled parser avoids a heavy TOML dependency.
// ---------------------------------------------------------------------------

/**
 * Splits a Zola Markdown file into { frontMatter, body }. Zola front matter
 * is delimited by a line of exactly `+++` at the very start of the file and
 * a matching closing `+++` line.
 */
function splitFrontMatter(source) {
  if (!source.startsWith('+++')) {
    return { frontMatter: '', body: source };
  }
  const lines = source.split('\n');
  // lines[0] is the opening '+++' (possibly with trailing whitespace).
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '+++') {
      end = i;
      break;
    }
  }
  if (end === -1) {
    return { frontMatter: '', body: source };
  }
  const frontMatter = lines.slice(1, end).join('\n');
  const body = lines.slice(end + 1).join('\n');
  return { frontMatter, body };
}

/**
 * Extracts the boolean value of `katex` under a `[extra]` TOML table.
 * Returns true/false if found, or null if not present. Deliberately narrow:
 * only handles the exact shape this repo uses (`[extra]` section with a
 * `katex = true|false` line), which is all this fixture-driven build step
 * needs.
 */
function extractExtraKatexFlag(frontMatterText) {
  if (!frontMatterText) return null;
  const lines = frontMatterText.split('\n');
  let inExtra = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^\[.*\]$/.test(line)) {
      inExtra = line === '[extra]';
      continue;
    }
    if (inExtra) {
      const m = line.match(/^katex\s*=\s*(true|false)\s*(#.*)?$/i);
      if (m) {
        return m[1].toLowerCase() === 'true';
      }
    }
  }
  return null;
}

function readConfigKatexDefault() {
  if (!fs.existsSync(CONFIG_TOML_PATH)) return false;
  const text = fs.readFileSync(CONFIG_TOML_PATH, 'utf8');
  const flag = extractExtraKatexFlag(text);
  return flag === true;
}

// ---------------------------------------------------------------------------
// Math delimiter scanning that skips fenced/indented code blocks.
// ---------------------------------------------------------------------------

/**
 * Splits Markdown body text into an array of segments, each tagged as
 * `code` (fenced ``` blocks, or lines indented as code) or `text` (anything
 * else, eligible for math substitution). Fenced code blocks are detected by
 * matching opening/closing lines of 3+ backticks (or tildes); Zola/pulldown-
 * cmark's own fence-matching rules (closing fence must be >= length of
 * opening fence, same character) are approximated closely enough for this
 * repo's fixtures, which only use plain ``` fences with optional info
 * strings (e.g. ```tex, ```toml, ```markdown,name=...).
 */
function splitOutCodeBlocks(body) {
  const lines = body.split('\n');
  const segments = [];
  let current = [];
  let currentType = 'text';
  let fenceChar = null;
  let fenceLen = 0;

  const flush = () => {
    if (current.length > 0) {
      segments.push({ type: currentType, text: current.join('\n') });
      current = [];
    }
  };

  for (const line of lines) {
    const fenceMatch = line.match(/^(\s{0,3})(`{3,}|~{3,})/);
    if (currentType === 'text' && fenceMatch) {
      // Opening fence.
      flush();
      currentType = 'code';
      fenceChar = fenceMatch[2][0];
      fenceLen = fenceMatch[2].length;
      current.push(line);
    } else if (currentType === 'code' && fenceMatch && fenceMatch[2][0] === fenceChar && fenceMatch[2].length >= fenceLen) {
      // Closing fence.
      current.push(line);
      flush();
      currentType = 'text';
      fenceChar = null;
      fenceLen = 0;
    } else {
      current.push(line);
    }
  }
  flush();
  return segments;
}

/**
 * Within a non-code text segment, finds `$$...$$` (display) and `$...$`
 * (inline) math spans and replaces them with pre-rendered KaTeX HTML.
 * Display math is matched first (greedy on the outer `$$` pair) so that
 * inline-math matching does not misinterpret the inner `$`s.
 */
function renderMathInText(text) {
  // Display math: $$ ... $$ (may span multiple lines).
  let out = text.replace(/\$\$([\s\S]+?)\$\$/g, (whole, expr) => {
    return renderMathSpan(expr.trim(), true);
  });

  // Inline math: $...$ (single line, no leading/trailing whitespace directly
  // inside the delimiters, and not an escaped \$).
  out = out.replace(/(^|[^\\])\$([^\n$]+?)\$/g, (whole, prefix, expr) => {
    return prefix + renderMathSpan(expr.trim(), false);
  });

  return out;
}

function renderMathSpan(expr, displayMode) {
  let html;
  try {
    html = katex.renderToString(expr, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml',
    });
  } catch (err) {
    // throwOnError: false already prevents most throws, but guard anyway so
    // one malformed expression can't abort the whole build.
    process.stderr.write(`[render-katex] Failed to render expression: ${expr}\n${err}\n`);
    return displayMode ? `$$${expr}$$` : `$${expr}$`;
  }
  // Wrap so Zola/pulldown-cmark treats this as raw HTML passthrough rather
  // than re-parsing the contents as Markdown. A blank line before/after a
  // block-level wrapper is required for pulldown-cmark to recognize it as
  // an HTML block rather than inline HTML mixed with paragraph text.
  if (displayMode) {
    return `\n<div class="katex-display-wrapper">\n${html}\n</div>\n`;
  }
  return `<span class="katex-inline-wrapper">${html}</span>`;
}

function renderMathInMarkdownBody(body) {
  const segments = splitOutCodeBlocks(body);
  return segments
    .map((seg) => (seg.type === 'code' ? seg.text : renderMathInText(seg.text)))
    .join('\n');
}

// ---------------------------------------------------------------------------
// KaTeX-enablement resolution (page > section > config precedence).
// ---------------------------------------------------------------------------

function isIndexFile(fileName) {
  return fileName === '_index.md';
}

function resolveKatexEnabled(pageFrontMatterText, sectionIndexPath, configDefault) {
  const pageFlag = extractExtraKatexFlag(pageFrontMatterText);
  if (pageFlag !== null) return pageFlag;

  if (sectionIndexPath && fs.existsSync(sectionIndexPath)) {
    const sectionText = fs.readFileSync(sectionIndexPath, 'utf8');
    const { frontMatter } = splitFrontMatter(sectionText);
    const sectionFlag = extractExtraKatexFlag(frontMatter);
    if (sectionFlag !== null) return sectionFlag;
  }

  return configDefault;
}

// ---------------------------------------------------------------------------
// Filesystem walking + scratch project assembly.
// ---------------------------------------------------------------------------

function rimraf(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

/** Recursively processes content/, writing (possibly transformed) copies into destDir. */
function processContentDir(srcDir, destDir, configDefault) {
  ensureDir(destDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  const sectionIndexPath = path.join(srcDir, '_index.md');

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      processContentDir(srcPath, destPath, configDefault);
      continue;
    }

    if (!entry.isFile()) continue;

    if (entry.name.endsWith('.md')) {
      const source = fs.readFileSync(srcPath, 'utf8');
      const { frontMatter, body } = splitFrontMatter(source);

      // A page's "section" is its own parent directory's _index.md — unless
      // this file IS the _index.md, in which case its own front matter
      // already covers step 1, and there's no separate section to check
      // (its ancestor precedence continues further up the tree, which this
      // repo's fixtures do not exercise beyond one level).
      const enabled = isIndexFile(entry.name)
        ? (extractExtraKatexFlag(frontMatter) !== null
            ? extractExtraKatexFlag(frontMatter)
            : configDefault)
        : resolveKatexEnabled(frontMatter, sectionIndexPath, configDefault);

      let newBody = body;
      if (enabled) {
        newBody = renderMathInMarkdownBody(body);
      }

      const output = frontMatter
        ? `+++\n${frontMatter}\n+++\n${newBody}`
        : newBody;
      fs.writeFileSync(destPath, output, 'utf8');
    } else {
      // Non-Markdown content asset (images, etc.) — copy verbatim.
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** Symlinks every top-level entry of the repo root into the scratch dir, except `content/`. */
function assembleScratchProjectShell(scratchDir) {
  ensureDir(scratchDir);
  const entries = fs.readdirSync(REPO_ROOT, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'content') continue;
    if (entry.name === '.katex-build') continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name === '.git') continue;

    const srcPath = path.join(REPO_ROOT, entry.name);
    const linkPath = path.join(scratchDir, entry.name);
    fs.symlinkSync(srcPath, linkPath);
  }
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    process.stderr.write(`[render-katex] No content/ directory found at ${CONTENT_DIR}; nothing to do.\n`);
    process.exit(1);
  }

  const configDefault = readConfigKatexDefault();

  // Full regeneration on every run so the scratch mirror never drifts from
  // the real source (config.toml, themes/, static/, sass/, content/).
  rimraf(path.join(REPO_ROOT, '.katex-build'));
  ensureDir(SCRATCH_DIR);

  assembleScratchProjectShell(SCRATCH_DIR);
  processContentDir(CONTENT_DIR, SCRATCH_CONTENT_DIR, configDefault);

  process.stdout.write(
    `[render-katex] Wrote transformed content to ${path.relative(REPO_ROOT, SCRATCH_CONTENT_DIR)} ` +
    `(config-level katex default: ${configDefault}).\n`
  );
  process.stdout.write(
    `[render-katex] Scratch Zola project root: ${path.relative(REPO_ROOT, SCRATCH_DIR)}\n`
  );
}

main();
