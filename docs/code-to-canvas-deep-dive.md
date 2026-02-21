# Code to Canvas — Deep Dive Research (February 2026)

> **TL;DR:** Code to Canvas produces editable frames, NOT Figma components. No variants, no states, no token linking. For a proper design system, use story.to.design (free tier) or do it manually.

---

## What Code to Canvas Actually Does

Code to Canvas (`generate_figma_design` in Figma Remote MCP) is a **browser-to-Figma capture tool**. It works in two phases:

1. Injects a JavaScript snippet into your browser
2. Captures the rendered DOM/CSS state and converts it to Figma layers

It is a **render capture**, not a code parser. It captures what the browser has rendered at that exact moment.

---

## What You Get in Figma

| Feature | Reality |
|---------|---------|
| Output type | Frames with editable layers (NOT components) |
| Text | Editable real text ✅ |
| Auto-layout | Attempted — works for simple flex, unreliable for complex layouts |
| Layer names | Messy (class names, div nesting — not design-system naming) |
| Colors | Hardcoded hex values — NOT linked to Figma variables |
| Text styles | Raw values — NOT linked to Figma text styles |
| Component sets | ❌ Does not create them |
| Variants | ❌ Does not create them |
| States (hover/focus/disabled) | ❌ Only captures current browser state |
| Figma variables linking | ❌ None |
| Nested component detection | ❌ None |
| Shadow DOM content | ❌ Not accessible (DOM API limitation) |

---

## What It Cannot Do (Critical Corrections)

### `figmaselector` parameter does NOT exist

Documentation online (and our own plan) mentioned `?figmaselector=.component--list-item` as a URL parameter. **This is wrong.** There is no such API parameter.

Element selection is done through a **visual browser toolbar** injected by Claude Code — a human clicks and drags to select an element. Claude cannot programmatically select specific CSS selectors.

### Figma MCP has only ONE write tool

All Figma MCP tools except `generate_figma_design` are **read-only**:
- `get_design_context` — reads
- `get_metadata` — reads
- `get_screenshot` — reads
- `get_variable_defs` — reads

Claude cannot programmatically:
- Convert frames to components
- Combine variants / Create component sets
- Rename layers or variant properties
- Link colors to Figma variables

### Rate limits

- Starter plan: **6 calls per month**
- Paid Dev/Full seats: per-minute limits apply

---

## Code to Canvas vs. story.to.design

| | Code to Canvas | story.to.design |
|---|:---:|:---:|
| **Output** | Frames | Real Figma components |
| **Component sets** | ❌ manual | ✅ automatic |
| **Variants from props** | ❌ | ✅ from Storybook `argTypes` |
| **Hover/Focus/Disabled states** | ❌ current state only | ✅ auto-simulated |
| **Figma variables linking** | ❌ | ✅ |
| **Auto-layout fidelity** | ⚠️ simple flex only | ✅ |
| **Nested component linking** | ❌ | ✅ |
| **Sync on code change** | ❌ manual recapture | ✅ one-click |
| **Requires Storybook** | ❌ | ✅ |
| **Cost** | $0 (with rate limits) | Free tier (limited) / $149/mo |

---

## When Code to Canvas IS Useful

Code to Canvas is genuinely good for:

- **Quickly capturing complex UIs** for stakeholder review (dashboards, data-heavy screens)
- **Reference captures** — "what does this page look like in Figma for annotation?"
- **Quick exploration** — get a layout into Figma to iterate visually

It is **not** the right tool for building a design system with proper components.

---

## Storybook → Figma: What Actually Exists

### story.to.design ($0 free tier / $149/mo)

The only tool that properly converts Storybook stories to Figma components:
- Reads Storybook `args`/`argTypes` → creates component variants automatically
- Simulates pseudo-states (hover, focus, active, disabled)
- Imports design tokens as Figma styles
- Detects nested components and links them
- **Local Mode**: connects to `http://localhost:6006` — no deployment needed
- Works with any styling (inline styles, Tailwind, CSS modules, shadow DOM) because it captures the browser render

**Free tier exists** — worth testing before committing to $149/mo.

### @storybook/addon-mcp (experimental, late 2025)

Storybook's official MCP server — lets Claude read your story definitions, props, usage examples via MCP. Enables AI-assisted code generation aligned with your design system.

**Does NOT generate Figma components** — it's for AI code generation direction, not Figma.

- Requires: Storybook 9.1.16+, Node 24+
- Status: experimental (v0.2.3)

### Storybook Connect (Chromatic)

**Wrong direction** — Figma *shows* Storybook stories inside Dev Mode panel. Does not create Figma components from stories.

### react-figma

Requires rewriting components in a Figma-specific JSX API. Does not convert existing React components. Effectively abandoned (last feature work: mid-2024).

### Anima DSA

Similar to story.to.design but with 4 weekly npm downloads — effectively abandoned. Risky to rely on.

---

## Recommended Path for Ralfy (Zero Budget)

### Option A: story.to.design free tier (try first)
1. Add Storybook to the extension: `npx storybook@latest init`
2. Write stories for each shared component (InlineEditRow, ListItem, StatusBanner, etc.)
3. Install story.to.design Figma plugin
4. Connect to `localhost:6006` via Local Mode
5. Import components → Figma generates component sets with variants automatically
6. See how many components the free tier covers

### Option B: Manual (no Storybook needed)
1. Open `localhost:5174/figma-showcase.html` in browser
2. Use Code to Canvas toolbar to select individual components
3. For each state (default, hover, error, etc.): trigger state manually in browser → capture
4. In Figma: select captures → Create Component → Combine as Variants
5. Manually link colors to Figma variables (one-time setup)

### Option C: Hybrid
- Use Code to Canvas for complex assembled previews (FeedManager, IntentPicker) → reference frames
- Use story.to.design for atomic shared components (ListItem, StatusBanner, etc.) → real components

---

## What We Got Wrong in the Original Plan

The `figma-showcase.html` implementation plan included:
```
&figmaselector=.component--list-item
```

This parameter does not exist. The showcase page is still useful for:
- Visual reference during development
- Manual element selection via Code to Canvas toolbar
- Browser-based preview without shadow DOM

But it does **not** enable programmatic component capture as originally intended.

---

## Files Reference

| File | Purpose |
|------|---------|
| `packages/extension/ralfy_extension/figma-showcase.html` | No-shadow-DOM showcase — useful for manual Code to Canvas captures |
| `packages/extension/ralfy_extension/src/playground/FigmaShowcase.tsx` | All shared components rendered in regular DOM |
| `docs/design/building-mini-design-system.md` | Full design system setup guide |
| `docs/design/figma-mcp-workflow-guide.md` | Day-to-day Figma ↔ Code workflow |
| `docs/plans/2026-02-20-ralfy-figma-design-system.md` | Original Figma showcase plan (contains `figmaselector` — incorrect) |
