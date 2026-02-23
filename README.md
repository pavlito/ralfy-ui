# Ralfy-UI

A token-driven design system built with AI in 2 days. From Figma tokens to production components, with a repeatable workflow for every step.

> **Live Storybook:** [Browse Components on Chromatic](https://master--6999e35613453c9b648d640e.chromatic.com/)
> **Case Study:** [Read the Full Case Study](https://pavlito.github.io/ralfy-ui/case-study/)

## Why This Exists

I built [Ralfy](https://ralfy-app.vercel.app), a LinkedIn feed management tool, as a solo developer using Claude Code. Frontend, backend, database, deployment. Speed was the priority, so there was no design system, no shared tokens, no component library.

The UI got inconsistent. Four screens, four button styles. Tabs built three ways. Colors hardcoded everywhere. So I gave myself a challenge: build a full design system pipeline in 2 days with AI.

## Token Architecture

```
Tier 1: Primitive     →  blue-600, gray-100, red-500
         (raw values, used for Figma import)

Tier 2: Semantic      →  primary, muted, destructive
         (role-based, used in all components)
```

- **Format:** OKLch (perceptually uniform, CSS Color Level 4, Tailwind v4 native)
- **Modes:** Light + Dark (CSS custom properties swap under `.dark` class)
- **Mapping:** `@theme inline` block bridges CSS variables → Tailwind utility classes
- **Pipeline:** Figma → Tokens Studio → `tokens.json` → Style Dictionary → `src/tokens/generated/*.css`

## Components

| Component | Type | Key Features |
|-----------|------|-------------|
| **Button** | Presentational | 6 variants, 4 sizes, loading state, icon support, `asChild` polymorphism |
| **Alert** | Compound | 4 variants (default, destructive, warning, success), Alert + Title + Description |
| **Sidebar** | Compound | 16 sub-components, 3 size variants, collapsible mode, brand header, menus with sub-items |
| **Tabs** | Compound | Radix Tabs, 3 sizes, TabsList + TabsTrigger + TabsContent |
| **TabItem** | Presentational | Standalone tab button, 3 sizes, icon support, active state |

All components use `React.forwardRef`, accept `className` for customization, and use only design tokens.

### Tabs Deep Dive

Tabs is built on Radix Tabs, providing full keyboard navigation and ARIA compliance out of the box:

```
Tabs (root — Radix Tabs.Root)
├── TabsList (Radix Tabs.List)
│   └── TabsTrigger (Radix Tabs.Trigger, uses tabItemVariants)
└── TabsContent (Radix Tabs.Content)
```

Features: arrow-key navigation between tabs, `aria-selected` state management, `data-state` driven styling, focus ring tokens. TabItem works as a standalone `role="tab"` button outside the compound when needed.

## Quick Start

```bash
git clone https://github.com/pavlito/ralfy-ui.git
cd ralfy-ui
pnpm install
pnpm storybook    # Open Storybook on port 6006
pnpm dev           # Vite dev server on port 5173
pnpm test:run      # Run all tests
pnpm typecheck     # TypeScript check
```

## AI-Ready

This design system includes a [`CLAUDE.md`](CLAUDE.md) file that lists every token class, component API, variant, and accessibility rule. It works as documentation-as-governance: AI follows the system by default.

Without CLAUDE.md, AI generates hardcoded colors and one-off styles. With it, AI uses the correct tokens, imports, and component APIs. This is how I built 5 components with 63 tests in 2 days.

I also built custom AI skills (`figma-to-component`, `build-component`, `ralfy-testing`, `npm-publish`) that encode the full component lifecycle into repeatable workflows.

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **OKLch over hex/HSL** | Perceptually uniform steps, better dark mode, Tailwind v4 native |
| **Radix UI primitives** | Battle-tested accessibility (keyboard, ARIA, focus management) without custom implementation |
| **Storybook over Styleguidist** | Richer addon ecosystem (a11y, visual regression via Chromatic), better docs generation |
| **cva + cn pattern** | Type-safe variants with className composition |
| **2-tier tokens (not 3)** | Component-level tokens add indirection without value at this scale |
| **Compound patterns** | Alert, Sidebar, Tabs use compound composition over rigid prop drilling |
| **Figma token names directly** | No alias layer. Tailwind classes mirror Figma token names (e.g. `bg-background-primary-default`) |

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Utility-first styling |
| Radix UI | Latest | Accessible primitives (Slot, Tabs) |
| Storybook | 10 | Component documentation |
| Vitest | 4 | Testing |
| Testing Library | Latest | Component testing |
| cva | 0.7 | Variant management |
| Style Dictionary | 5 | Token pipeline (Figma → CSS) |

## Documentation

- [Case Study](https://pavlito.github.io/ralfy-ui/case-study/) — Full portfolio case study
- [Live Storybook](https://master--6999e35613453c9b648d640e.chromatic.com/) — Browse all components on Chromatic

## License

MIT
