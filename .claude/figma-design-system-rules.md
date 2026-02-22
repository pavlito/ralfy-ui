# Ralfy-UI — Figma Design System Rules

> For AI agents generating code from Figma designs via MCP.
> This file teaches the AI how to translate Figma designs into ralfy-ui code.

## Figma Source

- **File**: https://www.figma.com/design/8K4IlKWDraPHQXCFp1hs1L/shadcn-ui--The-Ultimate-UI-Kit-for-Figma--Community-
- **fileKey**: `8K4IlKWDraPHQXCFp1hs1L`
- **Components page**: node-id `202-2028`
- Based on shadcn/ui Ultimate UI Kit (community file)

---

## 1. Token Pipeline

```
Figma → Tokens Studio → tokens.json → Style Dictionary (sd.config.mjs) → CSS
```

### Generated files (DO NOT edit manually)
| File | Selector | Contents |
|------|----------|----------|
| `src/tokens/generated/primitives.css` | `:root` | OKLCh color primitives (zinc-50..950, red-50..950, etc.) |
| `src/tokens/generated/light.css` | `:root` | Light mode semantic tokens referencing primitives |
| `src/tokens/generated/dark.css` | `.dark` | Dark mode semantic tokens referencing primitives |

### Entry point
`src/tokens/tokens.css` imports all generated files + defines Tailwind `@theme inline` mapping.

### Color format
All colors use **OKLCh** color space: `oklch(0.2103 0.0059 285.9)` with optional alpha.

### Rebuild tokens
```bash
pnpm tokens:build    # runs node sd.config.mjs
```

---

## 2. Token → Tailwind Class Mapping

No alias layer. Tailwind class names mirror Figma token names directly.

### Pattern
`{property}-{category}-{role}-{variant}`

### Background colors
| Figma token | Tailwind class | Usage |
|-------------|---------------|-------|
| `background/default` | `bg-background-default` | Page background |
| `background/card` | `bg-background-card` | Card surface |
| `background/popover` | `bg-background-popover` | Popover surface |
| `background/input` | `bg-background-input` | Input background |
| `background/muted` | `bg-background-muted` | Muted surface |
| `background/accent` | `bg-background-accent` | Hover surface |
| `background/primary/default` | `bg-background-primary-default` | Primary button |
| `background/primary/default-hover` | `hover:bg-background-primary-default-hover` | Primary hover |
| `background/primary/light` | `bg-background-primary-light` | Primary light surface |
| `background/secondary/default` | `bg-background-secondary-default` | Secondary button |
| `background/destructive/default` | `bg-background-destructive-default` | Destructive button |
| `background/destructive/light` | `bg-background-destructive-light` | Destructive light surface |
| `background/success/default` | `bg-background-success-default` | Success surface |
| `background/warning/default` | `bg-background-warning-default` | Warning surface |
| `background/disabled/default` | `bg-background-disabled-default` | Disabled surface |

### Foreground (text) colors
| Figma token | Tailwind class | Usage |
|-------------|---------------|-------|
| `foreground/default` | `text-foreground-default` | Body text |
| `foreground/muted` | `text-foreground-muted` | Secondary text |
| `foreground/accent` | `text-foreground-accent` | Accent text |
| `foreground/primary/default` | `text-foreground-primary-default` | Text on primary bg |
| `foreground/destructive/default` | `text-foreground-destructive-default` | Error text |
| `foreground/success/default` | `text-foreground-success-default` | Success text |
| `foreground/warning/default` | `text-foreground-warning-default` | Warning text |
| `foreground/disabled/default` | `text-foreground-disabled-default` | Disabled text |
| (primitive) | `text-white` | White text on colored surfaces |

### Border colors
| Figma token | Tailwind class |
|-------------|---------------|
| `border/default` | `border-border-default` |
| `border/primary/default` | `border-border-primary-default` |
| `border/destructive/default` | `border-border-destructive-default` |
| `border/success/default` | `border-border-success-default` |
| `border/warning/default` | `border-border-warning-default` |

### Icon colors
| Figma token | Tailwind class |
|-------------|---------------|
| `icon/default` | `text-icon-default` |
| `icon/muted` | `text-icon-muted` |
| `icon/primary/default` | `text-icon-primary-default` |
| `icon/destructive/default` | `text-icon-destructive-default` |
| `icon/success/default` | `text-icon-success-default` |
| `icon/warning/default` | `text-icon-warning-default` |
| `icon/disabled/default` | `text-icon-disabled-default` |

### Spacing (CSS custom properties)
| Token | Value | Usage in Tailwind |
|-------|-------|-------------------|
| `--spacing-xxs` | 2px | `gap-[var(--spacing-xxs)]` |
| `--spacing-xs` | 4px | `gap-[var(--spacing-xs)]` |
| `--spacing-sm` | 8px | `gap-[var(--spacing-sm)]` |
| `--spacing-md` | 12px | `gap-[var(--spacing-md)]` |
| `--spacing-lg` | 16px | `p-[var(--spacing-lg)]` |
| `--spacing-xl` | 24px | `p-[var(--spacing-xl)]` |
| `--spacing-xxl` | 32px | `p-[var(--spacing-xxl)]` |
| `--spacing-3xl` | 40px | `p-[var(--spacing-3xl)]` |
| `--spacing-4xl` | 64px | `p-[var(--spacing-4xl)]` |

### Padding (CSS custom properties)
| Token | Value |
|-------|-------|
| `--padding-xxs` | 8px |
| `--padding-xs` | 12px |
| `--padding-sm` | 16px |
| `--padding-md` | 20px |
| `--padding-lg` | 24px |
| `--padding-xl` | 32px |
| `--padding-xxl` | 40px |
| `--padding-3xl` | 48px |
| `--padding-4xl` | 64px |

### Radius (registered in @theme inline)
| Token | Value | Tailwind |
|-------|-------|----------|
| `--radius-none` | 0 | `rounded-none` |
| `--radius-xs` | 2px | `rounded-xs` |
| `--radius-sm` | 4px | `rounded-sm` |
| `--radius-md` | 8px | `rounded-md` |
| `--radius-lg` | 12px | `rounded-lg` |
| `--radius-xl` | 16px | `rounded-xl` |
| `--radius-xxl` | 24px | `rounded-xxl` |
| `--radius-full` | 400px | `rounded-full` |

---

## 3. Component Library

### Available components

When you see these Figma components, map them to ralfy-ui:

| Figma component | Import | Key props |
|-----------------|--------|-----------|
| Button | `import { Button } from '@/components/Button'` | `variant`, `size`, `loading`, `iconLeft`, `iconRight`, `asChild` |
| Input | `import { Input } from '@/components/Input'` | `label`, `helperText`, `errorMessage`, `icon` |
| Card | `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card'` | Card: `variant` |
| Badge | `import { Badge } from '@/components/Badge'` | `variant`, `size` |
| Avatar | `import { Avatar } from '@/components/Avatar'` | `src`, `alt`, `fallback`, `size`, `status` |
| Toggle / Switch | `import { Toggle } from '@/components/Toggle'` | `checked`, `onCheckedChange`, `label` |
| Dialog / Modal | `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from '@/components/Dialog'` | Compound pattern |
| Alert | `import { Alert, AlertTitle, AlertDescription } from '@/components/Alert'` | `variant`, `icon` |
| Tabs | `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs'` | Radix-based compound |
| TabItem | `import { TabItem } from '@/components/TabItem'` | `active`, `size` |
| Sidebar | `import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, ... } from '@/components/Sidebar'` | `side`, `collapsed` |

### Component variant mappings

**Button variants** (Figma → code):
| Figma variant | Code `variant` prop |
|---------------|-------------------|
| Primary / Filled | `"default"` |
| Secondary / Light | `"secondary"` |
| Destructive / Danger | `"destructive"` |
| Outline / Bordered | `"outline"` |
| Ghost / Subtle | `"ghost"` |
| Link / Text | `"link"` |

**Button sizes**:
| Figma size | Code `size` prop |
|------------|-----------------|
| Small (h=40px) | `"sm"` |
| Medium (h=44px) | `"md"` |
| Large (h=48px) | `"lg"` |
| Icon only | `"icon"` |

**Badge variants**:
| Figma variant | Code `variant` prop |
|---------------|-------------------|
| Success / Green | `"success"` |
| Warning / Yellow | `"warning"` |
| Error / Red / Destructive | `"error"` |
| Info / Blue | `"info"` |
| Neutral / Default / Gray | `"neutral"` |

**Alert variants**:
| Figma variant | Code `variant` prop |
|---------------|-------------------|
| Default / Info | `"default"` |
| Destructive / Error | `"destructive"` |
| Warning | `"warning"` |
| Success | `"success"` |

**Card variants**:
| Figma variant | Code `variant` prop |
|---------------|-------------------|
| Default / Filled | `"default"` |
| Outlined / Bordered | `"outlined"` |
| Elevated / Raised | `"elevated"` |

---

## 4. Architecture Patterns

### Component structure (follow for new components)

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

// 1. Define variants with cva
const componentVariants = cva('base-classes', {
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... },
})

// 2. Define props interface
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // additional props
}

// 3. Use forwardRef
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  ),
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

### Critical rules

1. **Always use `cn()`** for className composition — never string concatenation
2. **Always use `React.forwardRef`** — every component forwards refs
3. **Always use `cva`** for variant management when component has variants
4. **Always accept `className` prop** for external customization
5. **Never hardcode colors** — always use token-mapped Tailwind classes
6. **Use Figma token classes** (`bg-background-primary-default`) not Tailwind primitives (`bg-blue-600`)
7. **Spacing via CSS vars** — `gap-[var(--spacing-sm)]`, `p-[var(--padding-sm)]`
8. **Radius via CSS vars** — `rounded-[var(--radius-md)]` or registered `rounded-md`

### Compound components

For complex UI (Card, Dialog, Sidebar, Tabs), use compound pattern:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Radix UI primitives

Used for accessible interactive components:
| Component | Radix package |
|-----------|--------------|
| Button (Slot) | `@radix-ui/react-slot` |
| Avatar | `@radix-ui/react-avatar` |
| Dialog | `@radix-ui/react-dialog` |
| Toggle/Switch | `@radix-ui/react-switch` |
| Tabs | `@radix-ui/react-tabs` |

---

## 5. Styling Approach

### Framework
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **No `tailwind.config.js`** — theme defined in `@theme inline` block in `tokens.css`

### Class merging utility
```tsx
// src/lib/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Focus states
Standard pattern: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-default focus-visible:ring-offset-2`

### Dark mode
Toggle `.dark` class on `<html>` element. Tokens switch automatically via `light.css` (`:root`) and `dark.css` (`.dark`).

### Responsive design
No custom breakpoints — use standard Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).

---

## 6. File Structure

```
src/
├── components/
│   ├── Alert/          index.tsx, Alert.stories.tsx
│   ├── Avatar/         index.tsx
│   ├── Badge/          index.tsx
│   ├── Button/         index.tsx, Button.stories.tsx, Button.test.tsx
│   ├── Card/           index.tsx
│   ├── Dialog/         index.tsx
│   ├── Input/          index.tsx
│   ├── Sidebar/        index.tsx, *.stories.tsx
│   ├── TabItem/        index.tsx, TabItem.stories.tsx
│   ├── Tabs/           index.tsx, Tabs.stories.tsx
│   └── Toggle/         index.tsx
├── tokens/
│   ├── tokens.css          ← entry point (imports + @theme inline)
│   ├── generated/          ← auto-generated (DO NOT edit)
│   │   ├── primitives.css
│   │   ├── light.css
│   │   └── dark.css
│   ├── colors.ts           ← JS color tokens for inline styles
│   ├── spacing.ts          ← JS spacing tokens
│   ├── shadows.ts          ← JS shadow tokens
│   ├── typography.ts       ← JS typography tokens
│   └── index.ts            ← re-exports all JS tokens
├── lib/
│   └── cn.ts               ← clsx + tailwind-merge utility
└── index.ts                ← public API exports
```

### Component file convention
- Each component in its own directory: `src/components/ComponentName/`
- Main file: `index.tsx`
- Stories: `ComponentName.stories.tsx`
- Tests: `ComponentName.test.tsx`

---

## 7. Build & Dev

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Vite dev server (port 5173) |
| `pnpm storybook` | Storybook dev (port 6006) |
| `pnpm build` | Production build → `dist/` |
| `pnpm test` | Vitest watch mode |
| `pnpm test:run` | Vitest single run |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm tokens:build` | Rebuild tokens from `tokens.json` |
| `pnpm chromatic` | Deploy Storybook to Chromatic |

### Build output
- ES modules (`preserveModules`)
- External: React, React DOM, Radix UI, cva, clsx, tailwind-merge
- CSS not code-split
- Type declarations via `vite-plugin-dts`

### Path aliases
- `@/*` → `./src/*` (configured in `tsconfig.json` and `vite.config.ts`)

---

## 8. Storybook

- **Storybook 10** with `@storybook/react-vite`
- Addons: docs, a11y, themes, vitest
- Theme switching via `withThemeByClassName` (Light / Dark)
- Stories in `src/**/*.stories.tsx`
- Layout: centered

---

## 9. Figma → Code Translation Rules

When translating a Figma design to ralfy-ui code:

1. **Check existing components first** — if the Figma design uses a Button, Card, Badge, etc., use the ralfy-ui component instead of recreating it
2. **Map Figma fills to token classes** — look up the color in the token tables above
3. **Map Figma auto-layout to Tailwind flex** — `layoutMode: HORIZONTAL` → `flex`, `VERTICAL` → `flex flex-col`
4. **Map Figma spacing to CSS vars** — `itemSpacing: 8` → `gap-[var(--spacing-sm)]`
5. **Map Figma padding to CSS vars** — `padding: 16` → `p-[var(--padding-sm)]`
6. **Map Figma corner radius to CSS vars** — `cornerRadius: 8` → `rounded-[var(--radius-md)]`
7. **Map Figma font weight** — Regular→`font-normal`, Medium→`font-medium`, SemiBold→`font-semibold`, Bold→`font-bold`
8. **Map Figma font size** — 12→`text-xs`, 14→`text-sm`, 16→`text-base`, 18→`text-lg`, 20→`text-xl`, 24→`text-2xl`, 30→`text-3xl`
9. **Map Figma effects** — Drop Shadow→`shadow-sm/md/lg/xl` depending on blur radius
10. **If a Figma color doesn't match any token** — find the closest semantic token, don't hardcode the hex value

### Auto-layout → Flexbox mapping

| Figma property | Tailwind class |
|----------------|---------------|
| `layoutMode: HORIZONTAL` | `flex` |
| `layoutMode: VERTICAL` | `flex flex-col` |
| `primaryAxisAlignItems: MIN` | `justify-start` |
| `primaryAxisAlignItems: CENTER` | `justify-center` |
| `primaryAxisAlignItems: MAX` | `justify-end` |
| `primaryAxisAlignItems: SPACE_BETWEEN` | `justify-between` |
| `counterAxisAlignItems: MIN` | `items-start` |
| `counterAxisAlignItems: CENTER` | `items-center` |
| `counterAxisAlignItems: MAX` | `items-end` |
| `layoutSizingHorizontal: FILL` | `w-full` |
| `layoutSizingHorizontal: HUG` | `w-fit` |
| `layoutSizingVertical: FILL` | `h-full` |
| `layoutSizingVertical: HUG` | `h-fit` |
| `layoutWrap: WRAP` | `flex-wrap` |
