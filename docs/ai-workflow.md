# AI-Assisted Design-to-Code Workflow

## The Problem AI Solves

When an engineer builds a new screen, they typically consult a style guide, cross-reference Figma files, and manually verify token usage. Each step is a handoff point where drift enters the system -- hardcoded hex values, wrong spacing scales, inconsistent component APIs. The result is engineering time spent on compliance instead of product work.

## CLAUDE.md as Machine-Readable Design System Rules

The `CLAUDE.md` file at the project root is both human documentation and an AI instruction set. It specifies every token class, component API, variant option, and structural pattern in the system. When Claude Code (or any LLM-powered tool) reads this file before generating code, it produces output that follows the system automatically -- no style guide review step required.

Key rules enforced by the file:
- Never hardcode colors, spacing, font sizes, or shadows
- Use semantic token classes (`bg-primary`) over primitives (`bg-blue-600`)
- All components use `React.forwardRef`
- Every interactive element must be keyboard accessible
- Use `cn()` for className composition, `cva` for variant management

## The Flow

### Figma to Code (Forward)

1. Designer creates a component or screen in Figma using Variables that match the token naming.
2. Engineer opens Claude Code in the project. The AI reads `CLAUDE.md` on initialization.
3. Engineer describes the desired component or pastes a Figma screenshot.
4. AI generates a React component using the correct tokens, Radix primitives, and component APIs -- all drawn from the rules file.
5. Engineer reviews and commits. No manual compliance pass needed.

### Code to Canvas (Reverse)

React component implementations can inform Figma updates via MCP (Model Context Protocol) tools. When a component's API changes in code, the AI can surface that change to design tooling, closing the feedback loop in both directions.

## Before and After

**Without CLAUDE.md** -- AI generates plausible but non-compliant code:
```tsx
// Hardcoded values, wrong patterns
<button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md">
  Save
</button>
```

**With CLAUDE.md** -- AI generates system-compliant code:
```tsx
// Token classes, correct component API
<Button variant="primary" size="md">Save</Button>
```

The difference is not cosmetic. The first example creates a maintenance liability -- that hex value will not update when the brand changes, will not swap in dark mode, and will not match adjacent components. The second example inherits all of those behaviors for free.

## Business Outcome

A new engineer can build a compliant UI screen on their first day by importing components and describing what they need. The AI handles token selection, accessibility attributes, and API adherence. The manual work of "checking the style guide" is eliminated -- it is embedded in the toolchain.
