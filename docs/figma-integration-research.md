# Figma Integration Research (February 2026)

Complete research on all approaches for connecting Figma to the Ralfy-UI codebase — extracting tokens, reading designs, generating code, and syncing with Storybook.

---

## Table of Contents

1. [MCP Servers (AI ↔ Figma)](#1-mcp-servers)
2. [Token Extraction](#2-token-extraction)
3. [Component Extraction & Code Generation](#3-component-extraction--code-generation)
4. [Storybook Sync Tools](#4-storybook-sync-tools)
5. [Comparison Tables](#5-comparison-tables)
6. [Recommendations for Ralfy-UI](#6-recommendations-for-ralfy-ui)

---

## 1. MCP Servers

### 1.1 Figma Official MCP Server

**Endpoint:** `https://mcp.figma.com/mcp`

Two deployment modes:

| Aspect | Remote Server | Desktop Server |
|--------|--------------|----------------|
| Input method | Link-based (paste Figma URL) | Selection-based + link-based |
| Requires Figma Desktop | No | Yes |
| Auth | OAuth (browser popup) | Figma Desktop session |
| Setup | `claude mcp add --transport http figma https://mcp.figma.com/mcp` | `claude mcp add --transport http figma-desktop http://127.0.0.1:3845/mcp` |

**Desktop server must be enabled:** Figma Desktop → open file → Dev Mode (Shift+D) → inspect panel → "Enable desktop MCP server."

#### Tools

| Tool | Purpose | Server |
|------|---------|--------|
| `get_design_context` | Structured React + Tailwind representation of selection | Both |
| `get_metadata` | Sparse XML with layer IDs, names, types, positions | Both |
| `get_variable_defs` | Variables and styles (colors, spacing, typography) | Desktop only |
| `get_screenshot` | Visual screenshot of frame/layer | Both |
| `get_code_connect_map` | Figma node-to-code component mappings | Desktop only |
| `add_code_connect_map` | Create new node-to-code mappings | Desktop only |
| `get_code_connect_suggestions` | AI-suggested Figma-to-code mappings | Both |
| `send_code_connect_mappings` | Confirm Code Connect mappings | Both |
| `create_design_system_rules` | Generate rule files for design-to-code context | Both |
| `get_figjam` | FigJam diagrams to XML | Both |
| `generate_diagram` | Create FigJam from Mermaid syntax | Both |
| `generate_figma_design` | Push UI from Claude Code to Figma | Remote only (Claude Code only) |
| `whoami` | User identity and plan info | Remote only |

#### Rate Limits

| Plan | Seat Type | Daily Limit | Per-Minute |
|------|-----------|-------------|------------|
| Enterprise | Full/Dev | 600/day | 20/min |
| Organization | Full/Dev | 200/day | 15/min |
| Professional | Full/Dev | 200/day | 10/min |
| Starter | Any | 6/month | N/A |
| Any plan | View/Collab | 6/month | N/A |

Professional plan at 200 calls/day = ~50-65 component conversions per day (3-4 calls each). Practical for daily use.

#### `get_design_context` Output

Returns structured React + Tailwind code matching the Figma layer hierarchy:

```jsx
// Conceptual output for a card component:
<div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md w-[360px]">
  <div className="flex items-center gap-3">
    <img src="..." className="w-10 h-10 rounded-full" />
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-gray-900">Card Title</span>
      <span className="text-xs text-gray-500">Subtitle</span>
    </div>
  </div>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Primary</button>
</div>
```

**Known issue:** Responses can exceed token limits. Fix: set `MAX_MCP_OUTPUT_TOKENS` env var. Use `get_metadata` first for large designs, then `get_design_context` on specific nodes.

#### Code Connect Integration

When a Figma component has Code Connect mapping, `get_design_context` outputs your actual component:

```jsx
<CodeConnectSnippet
  imports="import { Button } from '@/components/Button'"
  snippet="<Button variant='primary' size='md'>Click me</Button>"
/>
```

**Two types:**
- **CLI-based:** `.figma.tsx` config files in codebase. Requires Organization or Enterprise plan.
- **UI-based:** Created in Figma's UI. Available on all paid plans. Includes "Add instructions for MCP" field.

#### Desktop MCP — Token Extraction Limitations

Desktop MCP moze da cita varijable, ali sa znacajnim ogranicenjima:

- **Selection-scoped:** Cita samo varijable **na selektovanom elementu**, NE moze da izvuce sve varijable iz fajla odjednom
- **Samo prvi mode:** Ne podrzava multi-mode extraction (npr. responsive breakpoints). Figma je potvrdila da je ovo na roadmapu
- **Nema kompletne stilove:** Ne moze da procita ceo katalog text/color/effect stilova — samo ono sto je primenjeno na selekciji
- **Zahteva placeni plan:** Dev seat ili Full seat na Pro ($15/mo), Organization ($45/mo), ili Enterprise ($75/mo)

**Zakljucak za token pipeline:** MCP (ni remote ni desktop) ne moze da zameni Tokens Studio za kompletnu token ekstrakciju. MCP je odlican za citanje dizajna i generisanje koda, ali za bulk token export treba plugin (Tokens Studio, Figma Variables to JSON).

#### Code to Canvas (Feb 2026, novo)

Figma + Anthropic kolaboracija — obrnuti smer od MCP:

- **Kod → Figma:** Salje rendered UI iz Claude Code u Figmu kao potpuno editabilne layere
- Kreira **bidirektionalni workflow:** Figma→kod (MCP) + kod→Figma (Code to Canvas)
- Pokrece se iz Claude Code-a koristeci `generate_figma_design` tool (remote MCP)
- Zahteva browser capture — generise JavaScript snippet koji se pokrece u browseru

**Prakticna upotreba:** Kad razvijes komponentu u kodu, mozes je poslati nazad u Figmu da dizajner nastavi rad na njoj.

#### Limitations (General)

- Read-only (except `generate_figma_design` / Code to Canvas)
- No interactions/animations extraction
- No responsive breakpoints
- Default output is React + Tailwind (can ask Claude to convert)
- No batch processing
- Desktop-only features: `get_variable_defs`, `get_code_connect_map`
- Quality reports: ~80% structural accuracy, ~50-70% time savings for initial dev
- **Token extraction je selection-scoped** — ne moze da zameni Tokens Studio za pipeline

---

### 1.2 claude-talk-to-figma-mcp (Community, Open Source)

**Location in project:** `/Users/pavlelucic/Documents/Dev/ralfy-ui/claude-talk-to-figma-mcp/`

**Architecture:**
```
Claude Code ←stdio→ MCP Server ←WebSocket→ Socket Server (port 3055) ←WebSocket→ Figma Plugin
```

#### Setup

```bash
# 1. Start WebSocket server:
cd claude-talk-to-figma-mcp && bun run socket
# Verify: curl http://localhost:3055/status

# 2. Install Figma plugin:
# Figma → Menu → Plugins → Development → Import plugin from manifest
# Select: claude-talk-to-figma-mcp/src/claude_mcp_plugin/manifest.json

# 3. Open plugin in Figma → copy channel ID

# 4. Add MCP to Claude Code:
claude mcp add ClaudeTalkToFigma -- npx -p claude-talk-to-figma-mcp@latest claude-talk-to-figma-mcp-server

# 5. In Claude Code: "Connect to Figma, channel {ID}"
```

#### Tools (50+)

**Document & Analysis:**
- `get_document_info` — page structure, top-level node IDs
- `get_selection` — currently selected nodes (ID, name, type)
- `get_node_info(nodeId)` — full node tree via `JSON_REST_V1` export (fills as hex, strokes, cornerRadius, text content, font styles, children)
- `get_nodes_info(nodeIds[])` — batch node inspection
- `get_styles` — local paint, text, effect styles
- `get_variables` — variable collections with light/dark mode values (v0.9.0+)
- `scan_text_nodes(nodeId)` — all text nodes recursively (chunked, 10 at a time)
- `export_node_as_image(nodeId, format, scale)` — PNG/JPG/SVG/PDF export

**Creation:**
- `create_rectangle`, `create_frame`, `create_ellipse`, `create_polygon`, `create_star`
- `create_text(x, y, text, fontSize, fontWeight, fontColor, parentId)`
- `create_component_instance`, `create_component_from_node`, `create_component_set`
- `clone_node`, `group_nodes`, `ungroup_nodes`, `insert_child`, `flatten_node`

**Modification:**
- `set_fill_color(nodeId, r, g, b, a)` — colors in 0-1 range
- `set_stroke_color`, `set_selection_colors` (bulk recolor)
- `set_corner_radius`, `set_auto_layout`, `set_effects`
- `move_node`, `resize_node`, `rotate_node`, `reorder_node`
- `set_gradient`, `set_image`, `boolean_operation`

**Text:**
- `set_text_content`, `set_multiple_text_contents`
- `set_font_name`, `set_font_size`, `set_font_weight`
- `set_letter_spacing`, `set_line_height`, `set_paragraph_spacing`
- `set_text_case`, `set_text_decoration`, `set_text_align`

**Components:**
- `get_local_components`, `get_remote_components`
- `set_instance_variant` — switch variant properties

**Variables (v0.9.0+):**
- `set_variable`, `apply_variable_to_node`, `switch_variable_mode`

**Pages:**
- `create_page`, `delete_page`, `rename_page`, `set_current_page`, `duplicate_page`

#### `get_node_info` Response Structure

The `filterFigmaNode()` function preserves:

| Property | Example |
|----------|---------|
| `id` | `"1:23"` |
| `name` | `"Button Primary"` |
| `type` | `"FRAME"`, `"TEXT"`, `"COMPONENT"`, `"INSTANCE"` |
| `fills` | `[{"type":"SOLID","color":"#3B82F6"}]` (hex) |
| `strokes` | `[{"type":"SOLID","color":"#E5E7EB"}]` |
| `cornerRadius` | `8` |
| `absoluteBoundingBox` | `{"x":0,"y":0,"width":320,"height":48}` |
| `characters` | `"Submit"` (TEXT nodes) |
| `style.fontFamily` | `"Inter"` |
| `style.fontSize` | `16` |
| `style.fontWeight` | `600` |
| `children` | Nested nodes (recursive) |

**Known gap:** `filterFigmaNode()` strips auto-layout properties (`layoutMode`, `itemSpacing`, padding, alignment). Fix by modifying `src/talk_to_figma_mcp/utils/figma-helpers.ts`:

```typescript
// Add to filterFigmaNode():
if (node.layoutMode) filtered.layoutMode = node.layoutMode;
if (node.itemSpacing !== undefined) filtered.itemSpacing = node.itemSpacing;
if (node.paddingTop !== undefined) filtered.paddingTop = node.paddingTop;
if (node.paddingRight !== undefined) filtered.paddingRight = node.paddingRight;
if (node.paddingBottom !== undefined) filtered.paddingBottom = node.paddingBottom;
if (node.paddingLeft !== undefined) filtered.paddingLeft = node.paddingLeft;
if (node.primaryAxisAlignItems) filtered.primaryAxisAlignItems = node.primaryAxisAlignItems;
if (node.counterAxisAlignItems) filtered.counterAxisAlignItems = node.counterAxisAlignItems;
```

Also strips: `boundVariables`, VECTOR nodes, `imageRef` from fills.

#### Limitations

- Requires Figma Desktop app
- Requires running WebSocket server
- No Code Connect integration
- No FigJam support
- Variables support still developing (no aliases, no bulk import/export)

---

### 1.3 Framelink / Figma-Context-MCP (by GLips)

**Repo:** [github.com/GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)

- **Read-only**, single tool: `get_figma_data`
- Simplifies Figma API responses for AI consumption
- Requires Figma Personal Access Token (free to generate)
- Free (MIT), no Dev Mode needed
- Best for: quick, free read access without needing write capabilities

---

### 1.4 Other MCP Options

| MCP | Direction | Best For |
|-----|-----------|----------|
| **TalkToFigmaDesktop (Grab)** | Read + Write | Same as claude-talk-to-figma but with GUI desktop app |
| **cc-fig-mcp (agenisea)** | Read + Write | Fork optimized for Claude Code, Docker-based relay |
| **html.to.design MCP** | Write only (HTML → Figma) | Push AI-generated HTML to Figma as editable layers |

---

## 2. Token Extraction

### 2.1 Tokens Studio + Style Dictionary (Full Pipeline)

The most complete approach for automated, CI/CD-ready token sync.

#### Architecture

```
Figma Variables
     ↓ (Tokens Studio plugin, free)
tokens/$themes.json + tokens/global.json + tokens/semantic/light.json + dark.json
     ↓ (GitHub sync)
Git repository
     ↓ (Style Dictionary 4 + sd-transforms)
src/tokens/generated/primitives.css + light.css + dark.css
     ↓ (import)
src/tokens/tokens.css → @theme inline { ... }
```

#### Tokens Studio Setup in Figma

1. Install from Figma Community → "Tokens Studio for Figma"
2. Import existing Figma Variables: Plugin → Styles & Variables → Import Variables
3. GitHub sync: Settings → Add new → GitHub → provide repo, branch, PAT, file path
4. Use DTCG format (`$value`, `$type`) — W3C standard, future-proof

**GitHub repo structure after sync:**
```
tokens/
├── $metadata.json
├── $themes.json
├── global.json              # primitive palette (OKLCh colors)
├── semantic/
│   ├── light.json           # semantic mappings for light mode
│   └── dark.json            # semantic mappings for dark mode
├── spacing.json
└── typography.json
```

#### Token JSON Examples (DTCG Format)

**Color tokens (global.json):**
```json
{
  "indigo": {
    "600": {
      "$value": "oklch(0.52 0.24 277)",
      "$type": "color"
    }
  }
}
```

**Semantic tokens with references (semantic/light.json):**
```json
{
  "primary": {
    "$value": "{indigo.600}",
    "$type": "color"
  },
  "primary-foreground": {
    "$value": "{white}",
    "$type": "color"
  }
}
```

**Spacing tokens:**
```json
{
  "spacing": {
    "sm": { "$value": "8", "$type": "dimension" },
    "md": { "$value": "16", "$type": "dimension" }
  }
}
```

**Typography composite token:**
```json
{
  "heading": {
    "xl": {
      "$value": {
        "fontFamily": "Inter",
        "fontWeight": "700",
        "fontSize": "30",
        "lineHeight": "1.2"
      },
      "$type": "typography"
    }
  }
}
```

**Theme configuration ($themes.json):**
```json
[
  {
    "name": "light",
    "selectedTokenSets": {
      "global": "enabled",
      "semantic/light": "enabled",
      "semantic/dark": "disabled",
      "spacing": "enabled"
    },
    "group": "color-mode"
  },
  {
    "name": "dark",
    "selectedTokenSets": {
      "global": "enabled",
      "semantic/light": "disabled",
      "semantic/dark": "enabled",
      "spacing": "enabled"
    },
    "group": "color-mode"
  }
]
```

#### Style Dictionary 4 Configuration

**Install:**
```bash
pnpm add -D style-dictionary @tokens-studio/sd-transforms colorjs.io
```

**`sd.config.mjs`:**
```javascript
import { register, permutateThemes, expandTypesMap } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { promises as fs } from 'fs';
import Color from 'colorjs.io';

// Register Tokens Studio transforms
register(StyleDictionary, {
  excludeParentKeys: true,
  'ts/color/modifiers': { format: 'hex' },
});

// Custom OKLCh color transform
StyleDictionary.registerTransform({
  name: 'color/oklch',
  type: 'value',
  transitive: true,
  filter: (token) => token.$type === 'color' || token.type === 'color',
  transform: (token) => {
    const value = token.$value ?? token.value;
    if (!value || typeof value !== 'string') return value;
    if (value.startsWith('oklch(')) return value; // passthrough

    try {
      const color = new Color(value);
      const oklch = color.to('oklch');
      const L = parseFloat(oklch.coords[0].toFixed(4));
      const C = parseFloat(oklch.coords[1].toFixed(4));
      const H = parseFloat((oklch.coords[2] || 0).toFixed(2));
      const alpha = oklch.alpha;
      return alpha < 1 ? `oklch(${L} ${C} ${H} / ${alpha})` : `oklch(${L} ${C} ${H})`;
    } catch {
      return value;
    }
  },
});

// Load themes and build per-theme
const $themes = JSON.parse(await fs.readFile('tokens/$themes.json', 'utf-8'));
const themes = permutateThemes($themes, { separator: '_' });

for (const [themeName, tokenSets] of Object.entries(themes)) {
  const sd = new StyleDictionary({
    source: tokenSets.map((set) => `tokens/${set}.json`),
    preprocessors: ['tokens-studio'],
    expand: { typesMap: expandTypesMap },
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab', 'color/oklch'],
        buildPath: 'src/tokens/generated/',
        files: [{
          destination: `${themeName}.css`,
          format: 'css/variables',
          options: {
            selector: themeName === 'light' ? ':root' : `.${themeName}`,
            outputReferences: true,
          },
        }],
      },
    },
  });
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

console.log('✅ Token build complete');
```

**Generated CSS output:**
```css
/* src/tokens/generated/light.css */
:root {
  --background: var(--white);
  --foreground: var(--gray-950);
  --primary: var(--indigo-600);
  --primary-foreground: var(--white);
}

/* src/tokens/generated/dark.css */
.dark {
  --background: var(--gray-950);
  --foreground: var(--gray-50);
  --primary: var(--indigo-500);
}
```

**Package.json scripts:**
```json
{
  "scripts": {
    "tokens:build": "node sd.config.mjs",
    "dev": "pnpm tokens:build && vite",
    "build": "pnpm tokens:build && pnpm typecheck && vite build"
  }
}
```

#### CI/CD: GitHub Actions

```yaml
# .github/workflows/build-tokens.yml
name: Build Design Tokens
on:
  push:
    paths: ['tokens/**']
    branches: [main]

jobs:
  build-tokens:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - run: pnpm install --frozen-lockfile
      - run: pnpm tokens:build
      - name: Commit generated tokens
        run: |
          git diff --quiet src/tokens/generated/ && exit 0
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add src/tokens/generated/
          git commit -m "chore(tokens): rebuild CSS from token changes"
          git push
```

#### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| `[object Object]` in CSS | Composite tokens not expanded | Add `expand: { typesMap: expandTypesMap }` |
| `NaNrem` values | Base font size not set | Settings → Base Font Size → `16` |
| References not resolving | Token set order wrong | Ensure primitives enabled before semantics |
| DTCG naming errors | `{`, `}`, `$` in token names | Rename tokens before converting |
| Multi-file sync | Requires Pro license | Use single-file sync on free tier |
| `sd-transforms` is ESM-only | Cannot use `require()` | Use `.mjs` extension |

---

### 2.2 Figma Plugins for Direct Export

Simpler alternatives — no build step, but less automation.

#### variables2css

**Best quick option.** 6 formats: CSS, Sass, Tailwind (v3), JSON, JS, Less.

- Choose units (rem/px) and color format (hex/rgb/hsl)
- Select collection and mode per export
- Dark mode requires two exports (one per mode)
- No OKLCh support
- Tailwind output is v3-style `module.exports`, not v4 `@theme`

**CSS output example:**
```css
:root {
  --color-primary: #4F46E5;
  --color-primary-foreground: #FFFFFF;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
}
```

#### Token Exporter

7 formats: CSS, TypeScript, Tailwind, JSON (W3C), Swift, Android XML, Flutter Dart.

- Naming convention control (camelCase, kebab-case, snake_case)
- 1000+ tokens in ~2 seconds
- Live preview before export
- Zero config, MIT licensed
- Number values lack units (need manual `px`/`rem`)

#### Design Tokens (W3C) Export

Exports W3C DTCG-compliant JSON. **Best for feeding into Style Dictionary.**

- Multiple collections → separate JSON files
- Multiple modes → nested objects per mode
- Alias preservation with `{path.to.token}` syntax
- Intelligent type inference (dimension, fontWeight, etc.)
- Typography → composite tokens, shadows → shadow tokens

**Output:**
```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#4F46E5",
      "$extensions": { "com.figma": { "variableId": "def456" } }
    }
  }
}
```

#### Other Plugins

| Plugin | Notes |
|--------|-------|
| **variables-to-css** | CSS only, no units on numbers, very basic |
| **Export Variables (CSS, SCSS, Tailwind)** | Similar to variables2css, fewer options |
| **fig2tw** | Figma Variables → Tailwind config or JSON |

#### Plugin Comparison

| Plugin | OKLCh? | Dark Mode | Units | Automation | Best For |
|--------|--------|-----------|-------|------------|---------|
| variables2css | No | 2 exports | rem/px | No | Quick copy-paste |
| Token Exporter | No | 2 exports | Raw numbers | No | Multi-platform |
| W3C Export | No | All-in-one JSON | Yes | Via Style Dictionary | Pipeline input |
| variables-to-css | No | 2 exports | Raw numbers | No | Simplest option |

**None produce OKLCh output.** All export hex. For Ralfy-UI's OKLCh tokens, use Style Dictionary with custom transform.

---

### 2.3 Figma REST API

**Two-step process for styles:**

```bash
# Step 1: Get style metadata (names, IDs)
curl -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY"

# Step 2: Get actual values from style nodes
curl -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/files/$FILE_KEY/nodes?ids=1:2,3:4,5:6"
```

#### Color Style Response

```json
{
  "nodes": {
    "1:2": {
      "document": {
        "name": "Primary",
        "type": "RECTANGLE",
        "fills": [{
          "type": "SOLID",
          "color": { "r": 0.239, "g": 0.521, "b": 0.957, "a": 1.0 }
        }]
      }
    }
  }
}
```

Colors are RGBA floats 0-1. Convert:
```javascript
function figmaRgbToHex({ r, g, b }) {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

#### Typography Style Response

```json
{
  "style": {
    "fontFamily": "Inter",
    "fontWeight": 700,
    "fontSize": 32,
    "lineHeightPx": 40,
    "letterSpacing": -0.5
  }
}
```

#### Variables API (Enterprise Only)

```bash
GET /v1/files/:file_key/variables/local
# Scope: file_variables:read
```

Returns collections with modes and `valuesByMode` per variable. Supports `COLOR`, `FLOAT`, `STRING`, `BOOLEAN` types. Variable aliases use `{ "type": "VARIABLE_ALIAS", "id": "..." }`.

**Workaround for non-Enterprise:** Use Tokens Studio plugin or custom Figma plugin that calls `figma.variables.getLocalVariablesAsync()` (works on all plans).

#### Rate Limits

| API Tier | Starter | Professional | Organization | Enterprise |
|----------|---------|--------------|--------------|------------|
| Tier 1 (file reads) - Full/Dev | 10/min | 15/min | 20/min | 20/min |
| Tier 2 (variables) - Full/Dev | 25/min | 50/min | 100/min | 100/min |
| View/Collab seats | 6/month | 6/month | 6/month | 6/month |

#### Token Extraction Script

```javascript
// extract-tokens.mjs
const FILE_KEY = 'YOUR_FILE_KEY';
const TOKEN = process.env.FIGMA_TOKEN;
const headers = { 'X-Figma-Token': TOKEN };

async function main() {
  // Get file with style metadata
  const file = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}`, { headers }).then(r => r.json());

  // Collect style node IDs by type
  const fillIds = [], textIds = [], effectIds = [];
  for (const [nodeId, style] of Object.entries(file.styles)) {
    if (style.styleType === 'FILL') fillIds.push(nodeId);
    if (style.styleType === 'TEXT') textIds.push(nodeId);
    if (style.styleType === 'EFFECT') effectIds.push(nodeId);
  }

  // Fetch actual values
  const fillNodes = await fetchNodes(fillIds);
  const textNodes = await fetchNodes(textIds);

  // Generate CSS
  let css = ':root {\n';
  for (const [id, node] of Object.entries(fillNodes)) {
    const fills = node?.document?.fills;
    if (fills?.[0]?.type === 'SOLID') {
      const hex = figmaRgbToHex(fills[0].color);
      css += `  --color-${slugify(file.styles[id].name)}: ${hex};\n`;
    }
  }
  css += '}\n';
  console.log(css);
}
```

#### Component Data Extraction

```bash
# Get component sets with full node trees
GET /v1/files/:file_key/nodes?ids=COMPONENT_SET_ID
```

Returns: children with variant names (`"Size=md, Variant=primary"`), `componentPropertyDefinitions`, auto-layout properties, fills, strokes, corner radius, etc.

Parse variant names:
```javascript
function parseVariantName(name) {
  const props = {};
  for (const pair of name.split(',').map(s => s.trim())) {
    const [key, value] = pair.split('=').map(s => s.trim());
    if (key && value) props[key] = value;
  }
  return props;
}
```

#### Figma Auto-Layout to CSS Flexbox Mapping

| Figma Property | CSS |
|----------------|-----|
| `layoutMode: "HORIZONTAL"` | `flex-direction: row` |
| `layoutMode: "VERTICAL"` | `flex-direction: column` |
| `primaryAxisAlignItems: "CENTER"` | `justify-content: center` |
| `counterAxisAlignItems: "CENTER"` | `align-items: center` |
| `itemSpacing` | `gap` |
| `paddingLeft/Right/Top/Bottom` | `padding-*` |
| `layoutWrap: "WRAP"` | `flex-wrap: wrap` |

#### Webhooks

Subscribe to events for automated sync:

```bash
curl -X POST "https://api.figma.com/v2/webhooks" \
  -H "X-Figma-Token: $TOKEN" \
  -d '{
    "event_type": "LIBRARY_PUBLISH",
    "team_id": "TEAM_ID",
    "endpoint": "https://your-server.com/webhook"
  }'
```

**Key events:**
- `FILE_UPDATE` — triggers ~30 min after editing stops
- `LIBRARY_PUBLISH` — when library file is published (most useful for CI/CD)
- `FILE_VERSION_UPDATE` — when a named version is created
- `DEV_MODE_STATUS_UPDATE` — when Dev Mode status changes

Retry policy: 3 retries at 5 min, 30 min, 3 hours.

#### Practical Tools Wrapping the REST API

| Tool | Description |
|------|-------------|
| **figma-api** (npm) | Fully typed TypeScript wrapper |
| **figma-js** (npm) | Lightweight client with TypeScript types |
| **@figma-export/cli** | CLI for exporting components as SVG/PNG + styles as CSS |
| **Figmagic** | Generates design tokens + React components from Figma |
| **FigmaToCode** | Converts nodes to HTML, Tailwind, React, Flutter, SwiftUI |

#### Plugin API vs REST API

| Capability | Plugin API | REST API |
|-----------|-----------|----------|
| Read file content | Current file only | Any file with access |
| Write/edit design | Full read/write | Read-only (design) |
| Access variables | **All plans** | Enterprise only |
| Requires Figma open | Yes | No |
| CI/CD integration | Not directly | Yes |
| componentPropertyDefinitions | Full interactive access | Read-only in node response |

---

## 3. Component Extraction & Code Generation

### 3.1 Figma Official MCP Workflow

**Step-by-step: Figma design → React + Storybook**

1. Select frame in Figma (use Dev Mode for best results)
2. In Claude Code:
   ```
   Look at my Figma selection. Use get_design_context and get_screenshot.
   Implement as a React component using our tokens from tokens.css.
   Use cva for variants, cn() for class merging, React.forwardRef.
   ```
3. Extract tokens (Desktop server):
   ```
   Run get_variable_defs on my selection.
   Map Figma variables to our CSS custom properties.
   ```
4. Generate Storybook story:
   ```
   Create a CSF3 Storybook story for the component.
   Include stories for each variant, size, and state.
   ```

**Best prompts:**
- Be specific about your stack (Tailwind tokens, cva, cn(), forwardRef)
- Reference existing components: "Use components from src/components/"
- Always request both `get_design_context` + `get_screenshot` for best accuracy

### 3.2 claude-talk-to-figma-mcp Workflow

1. Select component in Figma
2. `get_selection()` → get node ID
3. `get_node_info(nodeId)` → full design data
4. `export_node_as_image(nodeId)` → visual reference
5. `get_variables()` → design tokens
6. Claude generates React component + Storybook story

**Reverse direction (Code → Figma):**
```
create_frame(x: 0, y: 0, width: 320, height: 48, name: "Button")
set_fill_color(nodeId, r: 0.23, g: 0.51, b: 0.96)
set_auto_layout(nodeId, mode: "HORIZONTAL", spacing: 8, padding: 12)
create_text(x: 0, y: 0, text: "Submit", parentId: nodeId)
set_corner_radius(nodeId, radius: 8)
```

### 3.3 Figma Code Connect

Maps your existing components to Figma components so Dev Mode shows real code:

```tsx
// src/components/Button/Button.figma.ts
import figma from "@figma/code-connect/react";
import { Button } from "./Button";

figma.connect(Button, "FIGMA_COMPONENT_URL", {
  props: {
    variant: figma.enum("Variant", {
      Primary: "primary",
      Secondary: "secondary",
      Ghost: "ghost",
      Destructive: "destructive",
    }),
    size: figma.enum("Size", { Small: "sm", Medium: "md", Large: "lg" }),
    disabled: figma.boolean("Disabled"),
    label: figma.string("Label"),
  },
  example: ({ variant, size, disabled, label }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {label}
    </Button>
  ),
});
```

Install: `pnpm add -D @figma/code-connect`
Publish: `npx figma connect publish --token=PERSONAL_ACCESS_TOKEN`

**Plan requirements:**
- CLI-based: Organization or Enterprise
- UI-based: All paid plans (includes "Add instructions for MCP" field)

### 3.4 Figma-to-Code Generation Tools

| Tool | Output | Quality | Cost |
|------|--------|---------|------|
| **Builder.io Visual Copilot** | React + Tailwind | ~80% (needs polish) | Free tier + paid |
| **Locofy** | React, Next.js, Vue | Medium | Freemium |
| **Anima** | React with stateful components | Medium-High | $33-150/month |

**Not recommended for Ralfy-UI.** These generate generic code that doesn't use your `cva`, `cn()`, `forwardRef` patterns. Code Connect + MCP is the better path.

---

## 4. Storybook Sync Tools

### 4.1 @storybook/addon-mcp

Exposes Storybook component metadata to AI agents via MCP.

**Setup:**
```bash
pnpm add -D @storybook/addon-mcp
```

**.storybook/main.ts:**
```typescript
const config: StorybookConfig = {
  addons: [
    // ...existing addons
    '@storybook/addon-mcp',
  ],
  features: {
    experimentalComponentsManifest: true,
  },
};
```

**Add to Claude Code:**
```bash
claude mcp add storybook-mcp --transport http http://localhost:6006/mcp --scope project
```

**Tools exposed:**

| Tool | Purpose |
|------|---------|
| `get_ui_building_instructions` | Framework-specific UI dev guidelines, CSF3 conventions |
| `get_story_urls` | Direct URLs to specific stories in running Storybook |
| `list-all-documentation` | All available components and docs entries |
| `get-component-documentation` | Detailed prop types, descriptions, usage patterns |

**What Claude gets that CLAUDE.md doesn't provide:**
- Auto-extracted prop types from TypeScript (via react-docgen)
- Always in sync with code (auto-generated)
- Story URLs for visual verification
- On-demand data (lower token cost — queries specific components, not entire file)

**Requirements:** Storybook ≥9.1.16 (project has 10.2.10 ✓), Vite-based setup ✓

**Status:** Pre-1.0 (v0.3.1 as of Feb 20, 2026), active development (38 releases in 6 months). Breaking changes expected but setup cost is very low.

### 4.2 story.to.design (Storybook → Figma)

**Direction:** Code → Figma. Generates real Figma components from Storybook stories.

**How it works:**
- Figma plugin by divRIOTS
- Renders components via headless browser, converts DOM/CSS to native Figma layers
- Reads `argTypes` to create Figma Component Sets with variants
- Local Mode: connects to `localhost:6006` via Agent desktop app (port 9265)

**What you get in Figma:**
- Real Figma Components (not just frames) — appear in Assets panel
- Component Sets with variants from Storybook args
- Pseudo-state simulation: `:hover`, `:focus`, `:active`, `:disabled` as additional variants
- Auto Layout from CSS flexbox (~80-90% accuracy)
- Nested component detection and linking

**What you DON'T get:**
- Figma Variables linking (only local Styles)
- Clean layer names (Tailwind gives generic names)
- OKLCh colors (hex only)
- Perfect Auto Layout (complex CSS Grid/absolute positioning may fail)

**Setup:**
1. Install Figma plugin from Community
2. Download Agent desktop app for localhost access
3. Start Storybook on `localhost:6006` (hardcoded, no other port)
4. In plugin: check "private Storybook" → enter localhost URL → Connect

**Storybook configuration for best results:**
```typescript
// Button.stories.tsx
export const ForFigma: StoryObj<typeof Button> = {
  args: { children: 'Button', variant: 'primary', size: 'md' },
  parameters: {
    s2d: {
      variantProperties: ['variant', 'size', 'disabled'],
    },
  },
};
```

**Pricing:**
- Free trial (time-limited, unlimited components)
- Team: $149/month
- For 7 components: try free trial for Button/Badge, expect 1-2h cleanup per component

### 4.3 Storybook Connect (Chromatic)

**Direction:** Storybook → Figma (read-only embed)

Embeds live Storybook stories inside Figma. Designers see interactive story previews in Dev Mode.

**Setup:**
1. Publish Storybook to Chromatic: `npx chromatic --project-token=TOKEN`
2. Install "Storybook Connect" Figma plugin
3. Select Figma component → paste Chromatic story URL
4. Story linked — viewable in Design and Dev Mode

**Free tier:** 5,000 snapshots/month (or free unlimited for publish-only without visual testing).

### 4.4 Figma Code Connect for Storybook

See section 3.3 above. Can be defined in `.stories.tsx` files via `parameters.design` block.

---

## 5. Comparison Tables

### MCP Servers

| Feature | Official MCP | claude-talk-to-figma | Framelink |
|---------|-------------|---------------------|-----------|
| Read designs | Yes | Yes | Yes |
| Write/modify | Limited | Yes (60+ tools) | No |
| Figma plan | Paid (Full/Dev seat) | Any (free works) | Any |
| Rate limits | Per-plan tiers | None (local) | Figma API limits |
| Token extraction | Desktop only (selection-scoped) | Yes (v0.9.0+) | No |
| Code Connect | Yes | No | No |
| Setup | 1 command | 3 components | 1 command |
| Tool count | ~13 | 50+ | 1 |
| Code generation | React+Tailwind | Raw data | Context only |

### Token Pipelines

| Approach | OKLCh? | Dark Mode | Automation | Initial Effort | Ongoing Effort |
|----------|--------|-----------|------------|----------------|----------------|
| Tokens Studio + Style Dictionary | Yes (custom transform) | Automatic | CI/CD ready | ~2 hours | ~2 min |
| variables2css plugin | No (hex) | 2 exports | Manual | 5 min | ~15 min/export |
| W3C Export + Style Dictionary | Yes (with transform) | All-in-one JSON | CI/CD ready | ~45 min | ~2 min |
| Token Exporter plugin | No (hex) | 2 exports | Manual | 5 min | ~20 min/export |
| REST API script | Via code | Via modes | CI/CD ready | ~1 hour | ~2 min |
| Figma Dev Mode | No | Current mode only | Manual | 0 | Hours (not viable) |

### Storybook Integration

| Tool | Direction | Cost | What You Get |
|------|-----------|------|-------------|
| @storybook/addon-mcp | Storybook → AI agents | Free | Claude reads component APIs and stories |
| story.to.design | Storybook → Figma | $149/mo (free trial) | Real Figma components from stories |
| Storybook Connect | Storybook → Figma (embed) | Free (Chromatic) | Live story previews in Figma |
| Code Connect | Code → Figma Dev Mode | Org plan ($45+) | Real code snippets in Dev Mode |

---

## 6. Recommendations

### Kontekst

- **ralfy-fullstack** je produkcijska aplikacija (monorepo, `packages/frontend`)
- **ralfy-ui** je design system library sa Storybook-om
- Oba koriste OKLCh tokene i Tailwind 4 sa `@theme inline`
- ralfy-fullstack NE koristi ralfy-ui kao dependency — imaju odvojene komponente
- Figma je **source of truth** za tokene

### Priority 1: Immediate Setup (Done)

| Action | Status |
|--------|--------|
| Figma Official MCP (remote) | Podeseno: `figma-remote-mcp` |
| Autentikacija | Zavrsena |

### Priority 2: Token Pipeline (sledeci korak)

Set up **Tokens Studio + Style Dictionary** za automatski OKLCh token sync:
1. Install Tokens Studio plugin u Figmi
2. Definisati token setove koji pokrivaju oba projekta
3. Configure GitHub sync
4. Add Style Dictionary 5 sa custom OKLCh transform
5. Generisati `theme.css` (ralfy-fullstack) i `tokens.css` (ralfy-ui) iz istog JSON-a
6. Add CI/CD workflow

Detalji u: `docs/tokens-workflow.md`

### Priority 3: Component Workflow

- **Figma MCP** za citanje dizajna i generisanje React koda
- **Code to Canvas** (Feb 2026) za slanje koda nazad u Figmu
- **Storybook MCP addon** (`@storybook/addon-mcp`) da AI agenti citaju component API-je

### Priority 4: Evaluate (When Needed)

- **Desktop MCP** — ako treba selection-based workflow (zahteva Dev seat, placeni plan)
- **story.to.design** free trial — test sa Button/Badge
- **Code Connect** — if/when upgrading to Figma Organization plan
- **Tokens Studio → ralfy-fullstack direktno** — kad je pipeline stabilan, mozda prebaciti u monorepo

### What to Skip

- **Locofy/Anima/Builder.io** — generic code, doesn't use your design system
- **Figma Sites/Make** — not for component libraries
- **Figma Variables REST API** — Enterprise only ($75+/editor)
- **Figma Dev Mode for token export** — per-element copy, not scalable
- **Desktop MCP za token extraction** — selection-scoped, ne moze bulk export

---

## Sources

### Figma Official
- [Figma MCP Server - Developer Docs](https://developers.figma.com/docs/figma-mcp-server/)
- [MCP Tools and Prompts](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [MCP Plans, Access, Permissions](https://developers.figma.com/docs/figma-mcp-server/plans-access-and-permissions/)
- [Code Connect React Docs](https://developers.figma.com/docs/code-connect/react/)
- [REST API Variables](https://developers.figma.com/docs/rest-api/variables/)
- [REST API Webhooks](https://developers.figma.com/docs/rest-api/webhooks/)
- [REST API Rate Limits](https://developers.figma.com/docs/rest-api/rate-limits/)
- [Figma Blog: Introducing MCP Server](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [Figma Blog: Code to Canvas](https://www.figma.com/blog/introducing-claude-code-to-figma/)

### Community MCP
- [claude-talk-to-figma-mcp (GitHub)](https://github.com/arinspunk/claude-talk-to-figma-mcp)
- [Framelink / Figma-Context-MCP (GitHub)](https://github.com/GLips/Figma-Context-MCP)
- [TalkToFigmaDesktop by Grab (GitHub)](https://github.com/grab/TalkToFigmaDesktop)

### Token Tools
- [Tokens Studio Docs](https://docs.tokens.studio)
- [Tokens Studio + Style Dictionary](https://docs.tokens.studio/transform-tokens/style-dictionary)
- [@tokens-studio/sd-transforms (GitHub)](https://github.com/tokens-studio/sd-transforms)
- [Style Dictionary DTCG Support](https://styledictionary.com/info/dtcg/)
- [W3C Design Tokens Spec (2025.10)](https://www.w3.org/community/design-tokens/)
- [variables2css](https://variables2css.com/)
- [Design Tokens W3C Export Plugin](https://www.figma.com/community/plugin/1377982390646186215)

### Storybook Integration
- [@storybook/addon-mcp (npm)](https://www.npmjs.com/package/@storybook/addon-mcp)
- [Storybook MCP Sneak Peek](https://storybook.js.org/blog/storybook-mcp-sneak-peek/)
- [story.to.design](https://story.to.design/)
- [Chromatic Figma Plugin](https://www.chromatic.com/docs/figma-plugin/)
- [Figma Code Connect + Storybook](https://developers.figma.com/docs/code-connect/storybook/)

### Reviews & Tutorials
- [Figma MCP Server Tested (AIMultiple)](https://research.aimultiple.com/figma-to-code/)
- [A Better Figma MCP (cianfrani.dev)](https://cianfrani.dev/posts/a-better-figma-mcp/)
- [Claude Code + Figma MCP (Builder.io)](https://www.builder.io/blog/claude-code-figma-mcp-server)
- [Supercharge Design System with Storybook MCP (Codrops)](https://tympanus.net/codrops/2025/12/09/supercharge-your-design-system-with-llms-and-storybook-mcp/)
