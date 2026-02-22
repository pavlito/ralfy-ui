/**
 * Style Dictionary config for Figma → OKLCh CSS pipeline
 *
 * Reads tokens.json (exported by Tokens Studio) and generates:
 *   src/tokens/generated/primitives.css  — :root with OKLCh primitive colors
 *   src/tokens/generated/light.css       — :root with light-mode semantic tokens
 *   src/tokens/generated/dark.css        — .dark with dark-mode semantic tokens
 *
 * Usage: node sd.config.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';
import Color from 'colorjs.io';

// ---------------------------------------------------------------------------
// 1. Read source tokens
// ---------------------------------------------------------------------------

const allTokens = JSON.parse(fs.readFileSync('tokens.json', 'utf-8'));

// ---------------------------------------------------------------------------
// 2. Custom transforms (registered BEFORE Tokens Studio to avoid name clash)
// ---------------------------------------------------------------------------

// Convert any color to OKLCh
StyleDictionary.registerTransform({
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'color',
  transform: (token) => {
    try {
      const color = new Color(token.$value);
      const [l, c, h] = color.oklch;
      const alpha = color.alpha;
      const L = Number(l.toFixed(4));
      const C = Number(c.toFixed(4));
      const H = Number.isNaN(h) ? 0 : Number(h.toFixed(1));

      if (alpha < 1) {
        const a = Math.round(alpha * 100) / 100;
        return `oklch(${L} ${C} ${H} / ${a})`;
      }
      return `oklch(${L} ${C} ${H})`;
    } catch {
      return token.$value;
    }
  },
});

// Convert numbers to px (spacing, padding, radius)
StyleDictionary.registerTransform({
  name: 'size/pxOrZero',
  type: 'value',
  filter: (token) => token.$type === 'number',
  transform: (token) => {
    return token.$value === 0 ? '0' : `${token.$value}px`;
  },
});

// Clean CSS variable names from Figma token paths
StyleDictionary.registerTransform({
  name: 'name/figma-kebab',
  type: 'name',
  transform: (token) => {
    const parts = token.path.map((p) =>
      p.toLowerCase().replace(/\s+/g, '-').replace(/-{2,}/g, '-'),
    );
    // De-duplicate redundant prefixes:
    //   Spacing/spacing-xs → spacing-xs
    //   Padding/padding-sm → padding-sm
    //   Radius/radius-md   → radius-md
    if (
      parts.length === 2 &&
      parts[1].startsWith(parts[0] + '-')
    ) {
      return parts[1];
    }
    return parts.join('-');
  },
});

// ---------------------------------------------------------------------------
// 3. Register Tokens Studio preprocessor + transforms
// ---------------------------------------------------------------------------

await register(StyleDictionary, {
  excludeParentKeys: true,
});

// ---------------------------------------------------------------------------
// 4. Helpers — classify tokens as primitive vs semantic
// ---------------------------------------------------------------------------

const PRIMITIVE_GROUPS = new Set([
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'green', 'emerald',
  'teal', 'cyan', 'sky', 'indigo', 'violet',
  'purple', 'fuchsia', 'pink', 'rose', 'lime',
  'yellow', 'blue', 'white', 'black', 'primary',
]);

const isPrimitive = (token) =>
  PRIMITIVE_GROUPS.has(token.path[0].toLowerCase());

const isSemantic = (token) => {
  if (isPrimitive(token)) return false;
  // Skip semantic white/black aliases — they duplicate primitives
  if (
    token.path.length === 1 &&
    ['white', 'black'].includes(token.path[0].toLowerCase())
  ) {
    return false;
  }
  return true;
};

// ---------------------------------------------------------------------------
// 5. Prepare temp multi-set files for each theme
// ---------------------------------------------------------------------------

const tmpDir = path.resolve('.tokens-tmp');
fs.mkdirSync(tmpDir, { recursive: true });

// Light build: Primitives + Light semantics
fs.writeFileSync(
  path.join(tmpDir, 'light.json'),
  JSON.stringify({
    Primitives: allTokens['Primitives/Mode 1'],
    Tokens: allTokens['Tokens/Light'],
  }),
);

// Dark build: Primitives (for reference resolution) + Dark semantics
fs.writeFileSync(
  path.join(tmpDir, 'dark.json'),
  JSON.stringify({
    Primitives: allTokens['Primitives/Mode 1'],
    Tokens: allTokens['Tokens/Dark'],
  }),
);

// ---------------------------------------------------------------------------
// 6. Shared config
// ---------------------------------------------------------------------------

const transforms = [
  'name/figma-kebab',
  'ts/resolveMath',
  'color/oklch',
  'size/pxOrZero',
];

const outDir = 'src/tokens/generated/';

// ---------------------------------------------------------------------------
// 7. Build Light (primitives + light semantic tokens)
// ---------------------------------------------------------------------------

const sdLight = new StyleDictionary({
  source: [path.join(tmpDir, 'light.json')],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transforms,
      buildPath: outDir,
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
          filter: isPrimitive,
          options: {
            outputReferences: false,
          },
        },
        {
          destination: 'light.css',
          format: 'css/variables',
          filter: isSemantic,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

// ---------------------------------------------------------------------------
// 8. Build Dark (dark semantic tokens only)
// ---------------------------------------------------------------------------

const sdDark = new StyleDictionary({
  source: [path.join(tmpDir, 'dark.json')],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transforms,
      buildPath: outDir,
      files: [
        {
          destination: 'dark.css',
          format: 'css/variables',
          filter: isSemantic,
          options: {
            outputReferences: true,
            selector: '.dark',
          },
        },
      ],
    },
  },
});

// ---------------------------------------------------------------------------
// 9. Execute builds
// ---------------------------------------------------------------------------

console.log('Building tokens...');

await sdLight.buildAllPlatforms();
console.log('  ✓ primitives.css + light.css');

await sdDark.buildAllPlatforms();
console.log('  ✓ dark.css');

// Cleanup temp files
fs.rmSync(tmpDir, { recursive: true });

console.log(`\nDone → ${outDir}`);
