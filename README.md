# Ralfy-UI

A design system extracted from a production React application, built to demonstrate how token-driven component architecture reduces engineering time and eliminates design-to-code drift.

> **Live Storybook:** [Browse Components on Chromatic](https://6999e35613453c9b648d640e-iwtddknqko.chromatic.com/)

## Why This Exists

This design system was extracted from [Ralfy](https://github.com/pavlelucic), a LinkedIn feed management tool built as a solo developer using Claude Code. The extraction process demonstrates a code-first philosophy: tokens and components are the source of truth, Figma mirrors them.

**The business case:** When UI patterns live only in Figma or only in a developer's head, every new screen requires re-interpretation. This system eliminates that overhead — a new engineer can build a compliant screen by importing components and reading CLAUDE.md, without studying a 50-page style guide.

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
| **TabItem** | Presentational | Standalone tab button, 3 sizes, active state |

All components use `React.forwardRef`, accept `className` for customization, and use only design tokens — zero hardcoded values.

### Sidebar Deep Dive

The Sidebar is the most complex component, with 16 sub-components that compose together:

```
Sidebar (root)
├── SidebarHeader / SidebarFooter
├── SidebarContent
│   └── SidebarGroup
│       ├── SidebarGroupLabel (size variants)
│       ├── SidebarGroupAction
│       └── SidebarMenu
│           └── SidebarMenuItem
│               ├── SidebarMenuButton (size, active, disabled, icon, shortcut, rightIcon)
│               ├── SidebarMenuAction (hover-reveal)
│               └── SidebarMenuSub → SidebarMenuSubItem → SidebarMenuSubButton
├── SidebarSeparator
└── SidebarBrand (size, active, icon, title, description, trailing)
```

Features: CSS-only collapsed mode (`group-data-[collapsed]`), 3 size variants (sm/md/lg), Figma-matched focus ring, left/right placement.

## Quick Start

```bash
git clone https://github.com/pavlelucic/ralfy-ui.git
cd ralfy-ui
pnpm install
pnpm storybook    # Open Storybook on port 6006
pnpm dev           # Vite dev server on port 5173
pnpm test:run      # Run all tests
pnpm typecheck     # TypeScript check
```

## AI-Ready

This design system includes a `CLAUDE.md` file — a machine-readable specification that enables AI tools (like Claude Code) to generate compliant UI code automatically.

**What this means in practice:** When an AI reads CLAUDE.md before generating code, it uses the correct tokens, imports, and component APIs without manual review. This eliminates a category of "fix the AI output" work.

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| **OKLch over hex/HSL** | Perceptually uniform steps, better dark mode, Tailwind v4 native |
| **Radix UI primitives** | Battle-tested accessibility (keyboard, ARIA, focus management) without custom implementation |
| **Storybook over Styleguidist** | Richer addon ecosystem (a11y, visual regression via Chromatic), better docs generation |
| **cva + cn pattern** | Type-safe variants with className composition — the emerging standard for Tailwind components |
| **2-tier tokens (not 3)** | Component-level tokens add indirection without value at this scale |
| **Compound patterns** | Alert, Sidebar, Tabs use compound composition over rigid prop drilling |
| **Figma token names directly** | No alias layer — Tailwind classes mirror Figma token names (e.g. `bg-background-primary-default`) |

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

- [Case Study](docs/case-study/index.html) — Full portfolio case study
- [Token Pipeline](docs/tokens-workflow.md) — Figma → Style Dictionary → CSS workflow

## License

MIT
