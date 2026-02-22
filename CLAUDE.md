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
| Secondary button | `bg-background-secondary-default` |
| Destructive button | `bg-background-destructive-default` |
| Destructive light surface | `bg-background-destructive-light` |
| Success surface | `bg-background-success-default` |
| Warning surface | `bg-background-warning-default` |
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
| Primary icon | `text-icon-primary-default` |
| Destructive icon | `text-icon-destructive-default` |
| Success icon | `text-icon-success-default` |
| Warning icon | `text-icon-warning-default` |
| Disabled icon | `text-icon-disabled-default` |

### Spacing
Use Tailwind's spacing utilities. Custom tokens available as CSS variables:
- `--spacing-xs`: 4px | `--spacing-sm`: 8px | `--spacing-md`: 16px
- `--spacing-lg`: 24px | `--spacing-xl`: 32px | `--spacing-2xl`: 48px | `--spacing-3xl`: 64px

### Typography
- Font: Inter (loaded via Google Fonts in index.html)
- Sizes: `text-xs` (12px) through `text-3xl` (30px)
- Weights: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)

### Shadows
- `shadow-sm` | `shadow-md` | `shadow-lg` | `shadow-xl`

### Border Radius
- `rounded-sm` | `rounded-md` | `rounded-lg` | `rounded-xl`

## Components

Import from `@/components/[ComponentName]`:

### Button
```tsx
import { Button } from '@/components/Button'

<Button variant="primary" size="md">Label</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button loading>Loading...</Button>
<Button asChild><a href="/link">Link</a></Button>
```
Props: `variant` (primary|secondary|ghost|destructive), `size` (sm|md|lg), `loading`, `disabled`, `asChild`

### Input
```tsx
import { Input } from '@/components/Input'

<Input label="Email" placeholder="you@example.com" />
<Input label="Name" helperText="Your display name" />
<Input label="Password" errorMessage="Required" type="password" />
<Input icon={<SearchIcon />} placeholder="Search..." />
```
Props: `label`, `placeholder`, `helperText`, `errorMessage`, `icon`, `disabled`, `type`

### Card (Compound)
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/Card'

<Card variant="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Actions here</CardFooter>
</Card>
```
Card props: `variant` (default|outlined|elevated)

### Badge
```tsx
import { Badge } from '@/components/Badge'

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>
<Badge variant="neutral">Draft</Badge>
```
Props: `variant` (success|warning|error|info|neutral), `size` (sm|md)

### Avatar
```tsx
import { Avatar } from '@/components/Avatar'

<Avatar src="url" alt="Name" fallback="PL" />
<Avatar fallback="PL" size="lg" status="online" />
```
Props: `src`, `alt`, `fallback`, `size` (sm|md|lg), `status` (online|offline)

### Toggle
```tsx
import { Toggle } from '@/components/Toggle'

<Toggle checked={value} onCheckedChange={setValue} label="Enable" />
```
Props: `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `label`, `id`

### Dialog (Compound)
```tsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogFooter, DialogTitle, DialogDescription, DialogClose,
} from '@/components/Dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description text.</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter>
      <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
Sub-components: `Dialog` (Root), `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`

## Patterns

### Compound Components
Use Card's compound pattern for complex UI. Each sub-component works independently:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Accessibility
- Every interactive element is keyboard accessible
- Focus states use `focus-visible:ring-2 ring-border-primary-default`
- Error states link to inputs via `aria-describedby`
- Toggle uses `aria-checked` via Radix Switch
- Avatar uses Radix Avatar for proper image loading/fallback
- Dialog uses Radix Dialog with compound pattern, overlay, and close button

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
├── components/     # React components (Button/, Input/, Card/, Badge/, Avatar/, Toggle/, Dialog/)
├── tokens/         # Design tokens (tokens.css, colors.ts, spacing.ts, etc.)
├── lib/            # Utilities (cn.ts)
├── test/           # Test setup
└── index.ts        # Public API exports
```

## Commands
- `pnpm dev` — Vite dev server (port 5173)
- `pnpm storybook` — Storybook (port 6006)
- `pnpm test` — Vitest watch mode
- `pnpm test:run` — Vitest single run
- `pnpm typecheck` — TypeScript check
- `pnpm build` — Production build
- `pnpm build-storybook` — Build Storybook static
- `pnpm chromatic` — Deploy to Chromatic

## Rules
- Never hardcode colors — use token classes
- Every component supports `className` prop for customization
- Use Figma token classes (bg-background-primary-default) over primitives (bg-blue-600)
- All components use `React.forwardRef`
- Dark mode: toggle `.dark` class on `<html>`
