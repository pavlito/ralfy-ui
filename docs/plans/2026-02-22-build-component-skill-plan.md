# Build Component Skill — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a Claude Code skill that guides building React components from Figma designs in 5 sequential phases with approval gates.

**Architecture:** Single skill file at `.claude/skills/build-component/SKILL.md` with frontmatter, phase instructions, code templates, and checklists. Replaces the simpler `figma-to-component` skill with a more rigorous phase-based workflow.

**Tech Stack:** Claude Code skills (Markdown with YAML frontmatter), Figma MCP, cva, Radix UI, Vitest, Storybook

---

### Task 1: Create the skill directory and frontmatter

**Files:**
- Create: `.claude/skills/build-component/SKILL.md`

**Step 1: Create the skill file with frontmatter and overview**

```markdown
---
name: build-component
description: Build React components from Figma designs in 5 sequential phases. Use when user asks to build, create, or rebuild a component from Figma. Triggers on "build component", "napravi komponentu", "komponenta iz Figme", "rebuild from Figma", or any Figma URL with component building intent. Replaces figma-to-component with a phased, approval-gated workflow.
---

# Build Component — Phased Workflow

Build React components from Figma designs in 5 sequential phases. Each phase produces clear outputs for user approval before proceeding.

**Gold standard:** `src/components/Button/index.tsx` — refer to this for conventions.

## Prerequisites

- Figma URL for the component
- Figma MCP connected (`/mcp` to check)
- Project Figma file: https://www.figma.com/design/8K4IlKWDraPHQXCFp1hs1L/

## Phase Overview

| Phase | Name | Output | Gate |
|-------|------|--------|------|
| 1 | Figma Analysis | Subcomponent list, variants, tokens | User approval |
| 2 | Architecture | File structure, interfaces, build order | User approval |
| 3 | Build Atom by Atom | Component + tests + story per subcomponent | Tests pass |
| 4 | Composition | Root component, composed stories, exports | Tests pass |
| 5 | Verification | Typecheck, all tests, checklist | All green |
```

**Step 2: Verify the file was created**

Run: `ls -la .claude/skills/build-component/SKILL.md`
Expected: File exists

**Step 3: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: scaffold build-component skill with frontmatter"
```

---

### Task 2: Write Phase 1 — Figma Analysis

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add Phase 1 content after the Phase Overview table**

```markdown
---

## Phase 1: Figma Analysis

**Input:** Figma URL from user
**Output:** Structured analysis for user approval
**Rule:** No code written in this phase.

### Steps

1. Extract `fileKey` and `nodeId` from the URL:
   - `figma.com/design/:fileKey/:fileName?node-id=:nodeId` → convert `-` to `:` in nodeId
   - If URL has `/branch/:branchKey/` → use branchKey as fileKey

2. Call `get_metadata` with fileKey and nodeId to see the full component tree

3. Call `get_design_context` on individual variant nodes (not the whole frame) to extract tokens

4. Call `get_screenshot` to visually verify

### Output Template

Present this to the user for approval:

```
## Component: [Name]

### Subcomponents identified
| Subcomponent | Type | Radix primitive? |
|---|---|---|
| [Name] | simple / compound / radix-wrapper | None / Dialog / Switch / etc. |

### Variants & States
| Subcomponent | Variants (visual) | States (interactive) |
|---|---|---|
| [Name] | default, secondary, destructive... | hover, focus, disabled, loading... |

### Props
| Subcomponent | Prop | Type | Default |
|---|---|---|---|
| [Name] | variant | 'default' \| 'secondary' \| ... | 'default' |

### Token Mapping
| Usage | Figma token | Tailwind class |
|---|---|---|
| Background | background/primary/default | bg-background-primary-default |
| Text | foreground/default | text-foreground-default |
| Border | border/default | border-border-default |
| Spacing | spacing/spacing-sm | gap-[var(--spacing-sm)] |
| Padding | padding/padding-sm | px-[var(--padding-sm)] |
| Radius | radius/radius-md | rounded-[var(--radius-md)] |
```

**Wait for user approval before proceeding to Phase 2.**

> After approval, recommend `/clear` to free context before Phase 2.
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add Phase 1 (Figma Analysis) to build-component skill"
```

---

### Task 3: Write Phase 2 — Architecture

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add Phase 2 content**

```markdown
---

## Phase 2: Architecture

**Input:** Approved analysis from Phase 1
**Output:** Architecture plan for user approval
**Rule:** No code written in this phase.

### Steps

1. Read `CLAUDE.md` to confirm token tables and component conventions
2. Read `src/components/Button/index.tsx` as the gold standard reference
3. Determine component type:
   - **Simple** (Badge, Avatar): single file, cva variants
   - **Compound** (Card, Dialog): multiple sub-components, compound export pattern
   - **Radix wrapper** (Dialog, Toggle): wraps a Radix primitive, forwards its API

### Output Template

Present this to the user for approval:

```
## Architecture: [Name]

### Component Type
[Simple / Compound / Radix wrapper] — [reason]

### File Structure
- `src/components/[Name]/index.tsx` — component(s)
- `src/components/[Name]/[Name].test.tsx` — tests
- `src/components/[Name]/[Name].stories.tsx` — stories

### Build Order (leaves first)
1. [LeafComponent] — no dependencies
2. [MiddleComponent] — depends on LeafComponent
3. [RootComponent] — composes all

### TypeScript Interfaces
```tsx
// For each subcomponent:
export interface [Name]Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof [name]Variants> {
  // custom props from Phase 1
}
```

### Dependencies
- [x] cva (already installed)
- [x] cn utility (already installed)
- [ ] @radix-ui/react-[primitive] (needs install)
```

**Wait for user approval before proceeding to Phase 3.**

> After approval, recommend `/clear` to free context before Phase 3.
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add Phase 2 (Architecture) to build-component skill"
```

---

### Task 4: Write Phase 3 — Build Atom by Atom

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add Phase 3 content**

```markdown
---

## Phase 3: Build Atom by Atom

**Input:** Approved architecture from Phase 2
**Gate:** Tests must pass after each subcomponent before moving to the next.

For each subcomponent in dependency order (leaves first), do all 3 steps:

### Step A: Build Component

Create in `src/components/[Name]/index.tsx`:

```tsx
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const [name]Variants = cva(
  // base classes — use token classes from Phase 1 mapping
  'inline-flex items-center ...',
  {
    variants: {
      variant: {
        default: 'bg-background-primary-default text-foreground-primary-default',
        // ... from Phase 1
      },
      size: {
        sm: 'h-8 px-[var(--padding-xs)] text-sm',
        md: 'h-10 px-[var(--padding-sm)] text-base',
        // ... from Phase 1
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

export interface [Name]Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof [name]Variants> {
  // custom props
}

const [Name] = React.forwardRef<HTMLDivElement, [Name]Props>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn([name]Variants({ variant, size, className }))}
      {...props}
    />
  ),
)
[Name].displayName = '[Name]'

export { [Name], [name]Variants }
```

**Rules:**
- Every component uses `React.forwardRef`
- Every component accepts `className` prop
- Use `cn()` for className composition
- Use `cva` for variant management
- No hardcoded colors — all token classes from CLAUDE.md
- Use `Slot` from `@radix-ui/react-slot` if `asChild` is needed
- Focus states: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-default focus-visible:ring-offset-2`
- Disabled states: `disabled:pointer-events-none disabled:opacity-50`

### Step B: Write Tests

Create in `src/components/[Name]/[Name].test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { [Name] } from '.'

describe('[Name]', () => {
  // 1. Rendering
  it('renders with default props', () => {
    render(<[Name]>Content</[Name]>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  // 2. Variants — one test per variant
  it('applies default variant classes', () => {
    render(<[Name]>Test</[Name]>)
    expect(screen.getByText('Test').className).toContain('bg-background-primary-default')
  })

  it('applies [variant] variant classes', () => {
    render(<[Name] variant="[variant]">Test</[Name]>)
    expect(screen.getByText('Test').className).toContain('[expected-class]')
  })

  // 3. Sizes — one test per size
  it('applies [size] size classes', () => {
    render(<[Name] size="[size]">Test</[Name]>)
    expect(screen.getByText('Test').className).toContain('[expected-class]')
  })

  // 4. Interactive states
  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<[Name] onClick={onClick}>Click</[Name]>)
    await userEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  // 5. Ref forwarding
  it('forwards ref', () => {
    const ref = vi.fn()
    render(<[Name] ref={ref}>Ref</[Name]>)
    expect(ref).toHaveBeenCalled()
  })

  // 6. className merging
  it('merges custom className', () => {
    render(<[Name] className="custom-class">Custom</[Name]>)
    expect(screen.getByText('Custom').className).toContain('custom-class')
  })

  // 7. Disabled state (if applicable)
  it('is disabled when disabled prop is true', () => {
    render(<[Name] disabled>Disabled</[Name]>)
    expect(screen.getByRole('[role]')).toBeDisabled()
  })
})
```

### Step C: Write Story

Create in `src/components/[Name]/[Name].stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { [Name] } from '.'

const meta: Meta<typeof [Name]> = {
  title: 'Components/[Name]',
  component: [Name],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '[One-line description]',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', ...],
      description: 'Visual style',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
      table: { defaultValue: { summary: 'md' } },
    },
  },
}
export default meta
type Story = StoryObj<typeof [Name]>

// One story per variant
export const Default: Story = { args: { children: '[Name]' } }
export const [Variant]: Story = { args: { children: '[Variant]', variant: '[variant]' } }

// One story per key state
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } }

// AllVariants matrix
const variants = ['default', ...] as const
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {variants.map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 100, fontSize: 12, color: '#888' }}>{v}</span>
          <[Name] variant={v}>Label</[Name]>
          <[Name] variant={v} disabled>Disabled</[Name]>
        </div>
      ))}
    </div>
  ),
}

// AllSizes
const sizes = ['sm', 'md', 'lg'] as const
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'end', gap: 12 }}>
      {sizes.map((s) => (
        <[Name] key={s} size={s}>{s.toUpperCase()}</[Name]>
      ))}
    </div>
  ),
}
```

### After Each Subcomponent

Run: `pnpm test:run -- --reporter=verbose src/components/[Name]/[Name].test.tsx`
Expected: All tests PASS

**Only proceed to next subcomponent (or Phase 4) when tests pass.**
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add Phase 3 (Build Atom by Atom) to build-component skill"
```

---

### Task 5: Write Phase 4 — Composition

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add Phase 4 content**

```markdown
---

## Phase 4: Composition

**Input:** All subcomponents built and tested from Phase 3
**Gate:** Tests pass, composed stories render

### Step A: Root Component (compound pattern)

If the component is compound (like Card, Dialog), create the root that composes subcomponents:

```tsx
// At the end of index.tsx, re-export everything:
export {
  [Root],
  [SubA],
  [SubB],
  // ...
}
```

For compound components, each sub-component should work independently but compose together:
```tsx
<[Root]>
  <[Header]>
    <[Title]>Title<[/Title]>
  </[Header]>
  <[Content]>Body</[Content]>
  <[Footer]>Actions</[Footer]>
</[Root]>
```

### Step B: Composed Stories

Add to `[Name].stories.tsx`:

```tsx
// Realistic composed example
export const Composed: Story = {
  render: () => (
    <[Root]>
      <[SubA] ... />
      <[SubB] ... />
    </[Root]>
  ),
}

// Multiple configurations
export const Configurations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Minimal */}
      <[Root]>...</[Root]>
      {/* Full */}
      <[Root]>...</[Root]>
      {/* Edge case */}
      <[Root]>...</[Root]>
    </div>
  ),
}
```

### Step C: Update Exports

Add to `src/index.ts`:

```tsx
export { [Name], [SubA], [SubB] } from './components/[Name]'
export type { [Name]Props } from './components/[Name]'
```

### Run Tests

Run: `pnpm test:run -- --reporter=verbose src/components/[Name]/`
Expected: All tests PASS
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add Phase 4 (Composition) to build-component skill"
```

---

### Task 6: Write Phase 5 — Verification

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add Phase 5 content**

```markdown
---

## Phase 5: Verification

**Run all checks. Every item must pass.**

### Automated Checks

```bash
# 1. TypeScript — zero errors
pnpm typecheck

# 2. All tests — pass
pnpm test:run

# 3. Build — succeeds
pnpm build
```

### Manual Checklist

Review every subcomponent and confirm:

- [ ] Uses `React.forwardRef`
- [ ] Accepts `className` prop
- [ ] Uses `cn()` for className composition
- [ ] Uses `cva` for variants
- [ ] No hardcoded colors — all token classes from CLAUDE.md
- [ ] Focus-visible states: `focus-visible:ring-2 ring-border-primary-default`
- [ ] Disabled states handled
- [ ] `aria` attributes where needed (aria-label, aria-describedby, aria-busy, etc.)
- [ ] Exported in `src/index.ts` (component + types)
- [ ] Stories render correctly in Storybook
- [ ] Dark mode works (token classes handle this automatically)

### Done

Component is complete. Summarize what was built:
- Component name and type (simple/compound/radix)
- Number of subcomponents
- Number of variants and sizes
- Number of tests passing
- Number of stories
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add Phase 5 (Verification) to build-component skill"
```

---

### Task 7: Add token mapping reference and context tips

**Files:**
- Modify: `.claude/skills/build-component/SKILL.md`

**Step 1: Add reference section at the end of the skill file**

```markdown
---

## Reference

### Token Mapping Quick Reference

| Figma token path | Tailwind pattern |
|---|---|
| `background/X` | `bg-background-X` (replace `/` with `-`) |
| `foreground/X` | `text-foreground-X` |
| `border/X` | `border-border-X` |
| `icon/X` | `text-icon-X` |
| `spacing/X` | `gap-[var(--X)]` |
| `padding/X` | `px-[var(--X)]` or `py-[var(--X)]` |
| `radius/X` | `rounded-[var(--X)]` |

For the complete token list, see CLAUDE.md.

### Context Management

- **`/clear` between phases** — each phase should start with clean context
- **Read CLAUDE.md** at the start of Phase 3 to refresh token tables
- **Read Button component** as reference when building — it's the gold standard
- Each phase is designed to be small enough to succeed in one shot

### When to Use This Skill vs figma-to-component

- **build-component** (this skill): Complex components with multiple subcomponents, variants, or states. Sidebar, Dialog, DataTable, Form.
- **figma-to-component**: Simple, single-file components. Badge, Avatar, Toggle.

Both skills share the same conventions (cva, cn, forwardRef, token classes).
```

**Step 2: Commit**

```bash
git add .claude/skills/build-component/SKILL.md
git commit -m "feat: add reference section to build-component skill"
```

---

### Task 8: Deprecate figma-to-component skill

**Files:**
- Modify: `.claude/skills/figma-to-component/SKILL.md`

**Step 1: Add deprecation notice to the top of figma-to-component**

Add this line after the frontmatter `---`:

```markdown
> **Deprecated:** For complex components, use the `build-component` skill instead. This skill is still valid for simple, single-file components (Badge, Avatar, Toggle).
```

**Step 2: Commit**

```bash
git add .claude/skills/figma-to-component/SKILL.md
git commit -m "docs: add deprecation notice to figma-to-component skill"
```

---

### Task 9: Test the skill by dry-running Phase 1

**Step 1: Verify the skill appears in Claude Code**

Run: `ls -la .claude/skills/build-component/SKILL.md`
Expected: File exists with all phases

**Step 2: Read the complete skill file to verify formatting**

Read `.claude/skills/build-component/SKILL.md` and verify:
- Frontmatter has name and description
- All 5 phases are present with clear inputs/outputs/gates
- Code templates are complete
- Token mapping reference is accurate
- No broken markdown formatting

**Step 3: Commit any fixes**

If formatting issues found, fix and commit.
