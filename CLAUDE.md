# Ralfy-UI Design System Rules

## Token Usage
Never hardcode colors, spacing, font sizes, or shadows. Always use Tailwind utility classes that map to CSS custom properties from `src/tokens/tokens.css`.

### Colors
Tailwind class names mirror Figma token names directly (no alias layer). The pattern is `{property}-{category}-{role}-{variant}`.

#### Background colors
| Usage | Tailwind class |
|-------|---------------|
| Page background | `bg-background-default` |
| Card surface | `bg-background-card` |
| Popover surface | `bg-background-popover` |
| Input background | `bg-background-input` |
| Muted surface | `bg-background-muted` |
| Accent surface | `bg-background-accent` |
| Primary button | `bg-background-primary-default` |
| Primary button hover | `hover:bg-background-primary-default-hover` |
| Primary light surface | `bg-background-primary-light` |
| Primary light hover | `hover:bg-background-primary-light-hover` |
| Secondary button | `bg-background-secondary-default` |
| Destructive button | `bg-background-destructive-default` |
| Destructive hover | `hover:bg-background-destructive-default-hover` |
| Destructive light surface | `bg-background-destructive-light` |
| Destructive light hover | `hover:bg-background-destructive-light-hover` |
| Success surface | `bg-background-success-default` |
| Success hover | `hover:bg-background-success-default-hover` |
| Success light surface | `bg-background-success-light` |
| Success light hover | `hover:bg-background-success-light-hover` |
| Warning surface | `bg-background-warning-default` |
| Warning hover | `hover:bg-background-warning-default-hover` |
| Warning light surface | `bg-background-warning-light` |
| Warning light hover | `hover:bg-background-warning-light-hover` |
| Disabled surface | `bg-background-disabled-default` |

#### Text (foreground) colors
| Usage | Tailwind class |
|-------|---------------|
| Default body text | `text-foreground-default` |
| Muted/secondary text | `text-foreground-muted` |
| Accent text | `text-foreground-accent` |
| Primary-colored text | `text-foreground-primary-default` |
| Secondary-colored text | `text-foreground-secondary-default` |
| Red error/destructive text | `text-foreground-destructive-default` |
| Green success text | `text-foreground-success-default` |
| Yellow warning text | `text-foreground-warning-default` |
| Disabled text | `text-foreground-disabled-default` |
| White text (on colored bg) | `text-white` |

#### Border colors
| Usage | Tailwind class |
|-------|---------------|
| Default border | `border-border-default` |
| Primary focus ring | `border-border-primary-default` |
| Destructive border | `border-border-destructive-default` |
| Success border | `border-border-success-default` |
| Warning border | `border-border-warning-default` |

#### Icon colors
| Usage | Tailwind class |
|-------|---------------|
| Default icon | `text-icon-default` |
| Muted icon | `text-icon-muted` |
| Accent icon | `text-icon-accent` |
| Primary icon | `text-icon-primary-default` |
| Secondary icon | `text-icon-secondary-default` |
| Destructive icon | `text-icon-destructive-default` |
| Destructive icon on destructive bg | `text-icon-destructive-on-destructive` |
| Success icon | `text-icon-success-default` |
| Warning icon | `text-icon-warning-default` |
| Disabled icon | `text-icon-disabled-default` |

### Spacing
Use Tailwind's spacing utilities. Custom tokens available as CSS variables:
- `--spacing-none`: 0 | `--spacing-xxs`: 2px | `--spacing-xs`: 4px | `--spacing-sm`: 8px | `--spacing-md`: 12px
- `--spacing-lg`: 16px | `--spacing-xl`: 24px | `--spacing-xxl`: 32px | `--spacing-3xl`: 40px | `--spacing-4xl`: 64px

### Padding
Padding tokens have different values from spacing tokens. Components use these for internal padding:
- `--padding-none`: 0 | `--padding-xxs`: 8px | `--padding-xs`: 12px | `--padding-sm`: 16px | `--padding-md`: 20px
- `--padding-lg`: 24px | `--padding-xl`: 32px | `--padding-xxl`: 40px | `--padding-3xl`: 48px | `--padding-4xl`: 64px

### Typography
- Font: Inter (loaded via Google Fonts in index.html)
- Sizes: `text-xs` (12px) through `text-3xl` (30px)
- Weights: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)

### Shadows
- `shadow-sm` | `shadow-md` | `shadow-lg` | `shadow-xl`

### Border Radius
- `rounded-none` (0) | `rounded-xs` (2px) | `rounded-sm` (4px) | `rounded-md` (8px)
- `rounded-lg` (12px) | `rounded-xl` (16px) | `rounded-xxl` (24px) | `rounded-full` (400px)

## Components

Import from `@/components/[ComponentName]`:

### Button
```tsx
import { Button } from '@/components/Button'

<Button variant="default" size="md">Label</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>
<Button loading>Loading...</Button>
<Button iconLeft={<PlusIcon />}>Add Item</Button>
<Button asChild><a href="/link">Link</a></Button>
```
Props: `variant` (default|secondary|destructive|outline|ghost|link), `size` (sm|md|lg|icon), `loading`, `disabled`, `iconLeft`, `iconRight`, `asChild`

### Alert (Compound)
```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/Alert'

<Alert variant="default" icon={<InfoIcon />}>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>Description text.</AlertDescription>
</Alert>
<Alert variant="destructive">Error message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="success">Success message</Alert>
```
Props: `variant` (default|destructive|warning|success), `icon`

### Sidebar (Compound)
```tsx
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator, SidebarBrand } from '@/components/Sidebar'

<Sidebar side="left" collapsed={false}>
  <SidebarHeader>
    <SidebarBrand icon={<Logo />} title="App" description="v1.0" />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Section</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton icon={<HomeIcon />} active>Dashboard</SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>Footer</SidebarFooter>
</Sidebar>
```
Props: `side` (left|right), `collapsed`
Sub-components: SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuAction, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarSeparator, SidebarBrand

Key sub-component props:
- **SidebarMenuButton**: `icon`, `active`, `size` (sm|md|lg), `shortcut`, `rightIcon`, `showLeftChevron`, `leftChevron`, `disabled`
- **SidebarBrand**: `icon`, `title`, `description`, `trailing`, `size` (sm|md|lg), `active`
- **SidebarGroupLabel**: `size` (sm|md|lg)
- **SidebarMenuSubButton**: `size` (sm|md|lg), `active`

### Tabs (Compound)
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/Tabs'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```
Built on Radix Tabs. Sub-components: Tabs (Root), TabsList, TabsTrigger (`size` sm|md|lg), TabsContent

### TabItem
```tsx
import { TabItem } from '@/components/TabItem'

<TabItem active size="sm">Tab Label</TabItem>
<TabItem icon={<StarIcon />}>With Icon</TabItem>
```
Props: `active`, `size` (sm|md|lg), `icon`, `disabled`

## Patterns

### Compound Components
Use compound pattern for complex UI (Alert, Sidebar, Tabs). Each sub-component works independently:
```tsx
<Sidebar>
  <SidebarHeader>
    <SidebarBrand title="App" />
  </SidebarHeader>
  <SidebarContent>...</SidebarContent>
</Sidebar>
```

### Accessibility
- Every interactive element is keyboard accessible
- Focus states use `focus-visible:ring-2 ring-border-primary-default`
- Alert uses `role="alert"` for screen readers
- TabItem uses `role="tab"` with `aria-selected`
- Tabs built on Radix Tabs (keyboard nav, ARIA roles)
- Button supports `asChild` via Radix Slot for polymorphic rendering

### Component Variants
Use `cva` (class-variance-authority) for variant management:
```tsx
import { cva } from 'class-variance-authority'
const variants = cva('base-classes', { variants: { ... } })
```

### Class Merging
Always use `cn()` for className composition:
```tsx
import { cn } from '@/lib/cn'
<div className={cn('base-class', conditional && 'extra', className)} />
```

## File Structure
```
src/
├── components/     # React components (Button/, Alert/, Sidebar/, TabItem/, Tabs/)
├── tokens/         # Design tokens (tokens.css, generated/*.css)
├── styles.css      # Global styles entry point
├── lib/            # Utilities (cn.ts)
├── test/           # Test setup
└── index.ts        # Public API exports (components + cn utility)
```

## Commands
- `pnpm dev` — Vite dev server (port 5173)
- `pnpm storybook` — Storybook (port 6006)
- `pnpm test` — Vitest watch mode
- `pnpm test:run` — Vitest single run
- `pnpm typecheck` — TypeScript check
- `pnpm lint` — ESLint
- `pnpm build` — Production build
- `pnpm build-storybook` — Build Storybook static
- `pnpm chromatic` — Deploy to Chromatic
- `pnpm tokens:build` — Regenerate CSS from tokens.json (Style Dictionary)

## Rules
- Never hardcode colors — use token classes
- Every component supports `className` prop for customization
- Use Figma token classes (bg-background-primary-default) over primitives (bg-blue-600)
- All components use `React.forwardRef`
- Dark mode: toggle `.dark` class on `<html>`
