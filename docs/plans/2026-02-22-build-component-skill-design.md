# Build Component Skill — Design

## Problem

Building complex components with AI fails in one shot. Structure, tokens, variants, and stories all get wrong. Multiple iterations needed.

## Solution

A single Claude Code skill (`build-component`) that breaks component building into 5 sequential phases. Each phase has clear outputs and must be approved before proceeding.

## Source

Always starts from a Figma URL. Uses Figma MCP to read the design.

## Phases

### Phase 1: Figma Analysis

Input: Figma URL
Output (for approval):
- List of subcomponents identified in the design
- For each: variants (default, active, disabled...) and states (hover, collapsed...)
- Props candidates (icon, label, badge, onClick...)
- Radix primitive needed (if any)
- Token mapping: which colors, spacing, radii are used

No code written. User approves list before proceeding.

### Phase 2: Architecture

Input: Approved list from Phase 1
Output (for approval):
- File structure: `src/components/[Name]/index.tsx`, `[Name].stories.tsx`, `[Name].test.tsx`
- TypeScript interfaces for each subcomponent
- Dependency order: leaf components first, compounds next, root last
- Component type decision: simple (Badge) vs compound (Card) vs Radix wrapper (Dialog)

No code written. User approves architecture before proceeding.

### Phase 3: Build Atom by Atom

For each subcomponent in dependency order (leaves first):

1. Build component: cva variants, forwardRef, cn(), token classes, className prop
2. Write tests: rendering, variants, interactions, states, ref forwarding, className merging
3. Write story: one per variant, states, matrix story, argTypes for controls
4. Run tests — must pass before moving to next subcomponent

### Phase 4: Composition

1. Root component: compound pattern, state management if needed, export all
2. Composed stories: realistic examples with all subcomponents together, multiple configs, dark mode
3. Update `src/index.ts` with exports

### Phase 5: Verification

1. `pnpm typecheck` — zero errors
2. `pnpm test:run` — all tests pass
3. Storybook review — all stories render correctly
4. Checklist:
   - Every subcomponent uses forwardRef
   - Every subcomponent accepts className
   - No hardcoded colors — all token classes
   - Focus-visible states exist
   - aria attributes where needed
   - Exported in src/index.ts

## Key Principles

- `/clear` between phases to keep context clean
- Each phase small enough to succeed first try
- Button component is the gold standard reference
- CLAUDE.md token tables are the constraint — never hardcode
- Tests run after each subcomponent, not just at the end
