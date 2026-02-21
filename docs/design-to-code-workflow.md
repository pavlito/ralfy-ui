# Design-to-Code Workflow

## Overview

This document describes the workflow for translating designs created in Figma (using the shadcn Figma kit) into system-compliant code using Ralfy-UI's token architecture and AI-assisted code generation.

The core insight: **the shadcn Figma kit and Ralfy-UI share a token vocabulary but not identical values**. This is the same problem Kit faces with incomplete Figma-to-code token parity — and this workflow demonstrates how to solve it.

---

## The 4-Step Workflow

### Step 1: Design in Figma with shadcn Kit

The designer works in Figma using the [shadcn/ui Figma kit](https://www.figma.com/community/file/1203061493325953101). This kit provides:
- Component variants (Button, Input, Card, Badge, Avatar, Dialog, etc.)
- Figma Variables for colors, spacing, and typography
- Light and dark mode support via variable modes

The designer doesn't need to know about OKLch or CSS custom properties. They work in the Figma-native abstraction.

### Step 2: Token Mapping (Figma Variables → tokens.css)

When a design is ready for implementation, the token mapping bridges the gap:

| Figma Variable | CSS Custom Property | Tailwind Class |
|---|---|---|
| `primary` | `--primary` | `bg-primary` |
| `primary-foreground` | `--primary-foreground` | `text-primary-foreground` |
| `secondary` | `--secondary` | `bg-secondary` |
| `destructive` | `--destructive` | `bg-destructive` |
| `muted` | `--muted` | `bg-muted` |
| `muted-foreground` | `--muted-foreground` | `text-muted-foreground` |
| `card` | `--card` | `bg-card` |
| `border` | `--border` | `border-border` |
| `input` | `--input` | `border-input` |
| `ring` | `--ring` | `ring-ring` |
| `background` | `--background` | `bg-background` |
| `foreground` | `--foreground` | `text-foreground` |
| `success` | `--success` | `bg-success` |
| `warning` | `--warning` | `bg-warning` |
| `info` | `--info` | `bg-info` |

**What matches:** The semantic token names are identical (primary, secondary, destructive, muted, etc.). A Figma design using `primary` translates directly to `bg-primary` in code.

**What differs:** The actual color values. shadcn uses HSL; Ralfy-UI uses OKLch. The values are perceptually similar but not bit-identical. This is acceptable — the semantic meaning is preserved, and OKLch provides better dark mode behavior.

### Step 3: AI Generates Compliant Code

The engineer opens Claude Code (or any AI coding tool) in the project. The AI reads `CLAUDE.md` on initialization, which contains:
- Every token class and its semantic role
- Every component API (props, variants, sizes)
- Composition patterns (compound components, className merging)
- Accessibility requirements

The engineer describes the desired UI or pastes a Figma screenshot. The AI generates code that:
- Uses only semantic token classes (never hardcoded values)
- Imports from the correct component paths
- Follows accessibility patterns (aria attributes, keyboard navigation)
- Uses `cn()` for class composition and `cva` for variants

### Step 4: Storybook Verification

The generated code is verified in Storybook:
1. Does it render correctly in both light and dark mode?
2. Does it use the correct component APIs?
3. Does it pass accessibility checks (addon-a11y)?
4. Does it match the Figma design intent?

Storybook serves as the single source of truth — if a component looks right in Storybook, it will look right in production.

---

## Before / After

### Without this workflow (no CLAUDE.md, no token mapping)

```tsx
// AI generates plausible but non-compliant code
<button className="bg-[#4f46e5] text-white px-4 py-2 rounded-md
  hover:bg-[#4338ca] focus:ring-2 focus:ring-[#4f46e5]">
  Save Changes
</button>
```

Problems:
- Hardcoded hex values won't update with token changes
- No dark mode support
- No connection to the design system
- Manual review needed for every generated component

### With this workflow (CLAUDE.md + token mapping)

```tsx
// AI reads CLAUDE.md, generates system-compliant code
import { Button } from '@/components/Button'

<Button variant="primary" size="md">
  Save Changes
</Button>
```

Benefits:
- Inherits all token values, dark mode, focus states
- Correct component API used automatically
- Accessibility built in (keyboard, ARIA)
- No manual compliance review needed

---

## Token Audit: shadcn Figma Kit vs Ralfy-UI

### Color Token Parity

| Token | shadcn Figma (HSL) | Ralfy-UI (OKLch) | Match? |
|---|---|---|---|
| primary | hsl(239, 84%, 67%) | oklch(0.52 0.24 277) | Semantic ✓ |
| secondary | hsl(240, 5%, 96%) | oklch(0.96 0.005 277) | Semantic ✓ |
| destructive | hsl(0, 84%, 60%) | oklch(0.58 0.22 25) | Semantic ✓ |
| muted | hsl(240, 5%, 96%) | oklch(0.96 0.005 277) | Semantic ✓ |
| border | hsl(240, 6%, 90%) | oklch(0.92 0.005 277) | Semantic ✓ |
| background | hsl(0, 0%, 100%) | oklch(1 0 0) | Exact ✓ |

**Summary:** All semantic tokens map 1:1 by name. Color format differs (HSL vs OKLch) but semantic roles are preserved. This is intentional — OKLch provides perceptually uniform dark mode transitions that HSL cannot.

### Component Parity

| Component | shadcn Figma | Ralfy-UI | Notes |
|---|---|---|---|
| Button | ✓ | ✓ | Variants match (primary, secondary, ghost, destructive) |
| Input | ✓ | ✓ | Label, helper, error patterns match |
| Card | ✓ | ✓ | Compound pattern matches |
| Badge | ✓ | ✓ | Ralfy adds success/warning/info variants |
| Avatar | ✓ | ✓ | Ralfy adds status indicator |
| Switch/Toggle | ✓ | ✓ | Both use Radix primitives |
| Dialog | ✓ | ✓ | Compound pattern matches |

### Spacing Parity

Both systems use a 4px base unit with similar scales. shadcn uses Tailwind's default spacing; Ralfy-UI adds named tokens (xs through 3xl) that map to the same values.

---

## Why This Matters for Kit

Kit's design system has the same challenge: **incomplete Figma-to-code token parity**. Designers work in Figma with one set of variables; engineers work in code with another. The gap between them is where UI drift enters the system.

This workflow demonstrates a practical solution:
1. Standardize on semantic token names across both surfaces
2. Accept that value formats may differ (HSL in Figma, OKLch in code)
3. Use AI tooling (CLAUDE.md) to automate the translation
4. Use Storybook as the verification layer

The result: designers and engineers use the same vocabulary, and the toolchain handles the format conversion automatically.
