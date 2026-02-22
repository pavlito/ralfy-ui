# Ralfy-UI: Design System Case Study

## What I Built

Ralfy is a LinkedIn feed management tool. Custom feeds, AI-generated comments, reply drafts. I built the whole thing solo: React frontend, Express backend, Chrome extension.

As the product grew, I kept copy-pasting colors and components across three different codebases. Ralfy-UI is the design system I extracted to fix that.

[Storybook](https://6999e35613453c9b648d640e-iwtddknqko.chromatic.com/) | [GitHub](https://github.com/pavlito/ralfy-ui)

---

## How It Works

One pipeline connects Figma to production. A token changes in Figma, and it flows all the way to the live app without touching any component code.

> `[gif: the full pipeline in action, token change in Figma flowing to Storybook]`

```
Figma  →  Tokens Studio  →  tokens.json  →  Style Dictionary  →  CSS  →  Tailwind  →  Components  →  Storybook  →  npm  →  Production
```

That's the whole system. Everything else in this case study is about how each step works and why it's set up this way.

---

## The Problem: Three Surfaces, One Design

Most design systems serve one app. Ralfy has three rendering contexts, and each one fights you differently.

**The App.** Standard React + Tailwind. Components use token classes like `bg-background-primary-default`. Normal stuff.

**Chrome Extension (Shadow DOM).** The AI comment generator lives inside a Shadow Root injected into LinkedIn. Same tokens, but isolated from LinkedIn's CSS.

**Chrome Extension (Inline Styles).** LinkedIn actively overwrites injected classes. The only way to survive is `style={{}}` with JS token values. Highest specificity wins.

> `[gif: same component rendering correctly across all three surfaces]`

One set of token values powers all three. Change `--background-primary-default` once, and it updates the Tailwind class in the app, the CSS variable in Shadow DOM, and the JS object in the inline-styled component.

---

## Extracting the System

Ralfy wasn't built with a design system. I retrofitted one from a live product.

Both codebases had hardcoded hex colors scattered everywhere. Grays that looked the same but weren't. Changes in one codebase didn't propagate to the other.

Here's what the extraction looked like:

1. Audited every color, spacing value, and component pattern across both codebases
2. Grouped components into categories: Button, Input, Card, Badge, Avatar, Toggle, Dialog
3. Defined the token layer first. One source of truth for color, spacing, typography
4. Rebuilt each component against the token system
5. Connected it all to Figma via Tokens Studio

> `[gif: before/after comparison, hardcoded colors vs token classes]`

This is not a greenfield design system. Extracting from a live product is a fundamentally different problem, because you can't break what's already working.

---

## Tokens

### Two Tiers

Primitives are raw colors:
```css
--zinc-900: oklch(0.274 0.006 286.033);
--red-600: oklch(0.577 0.245 27.325);
```

Semantic tokens give them meaning:
```css
--background-primary-default: var(--primary-900);
--foreground-default: var(--zinc-950);
```

Components only use semantic tokens. Never primitives directly.

> `[gif: Tokens Studio in Figma showing primitive → semantic reference chain]`

### Figma Names = Tailwind Classes

Tailwind's `@theme inline` registers tokens as utilities. The names match Figma exactly:

```
Figma: background/primary/default  →  Tailwind: bg-background-primary-default
Figma: foreground/default          →  Tailwind: text-foreground-default
Figma: border/default              →  Tailwind: border-border-default
```

No alias layer. No translation table to maintain. Slashes become hyphens, that's it.

### Dark Mode

Light tokens live in `:root`. Dark tokens live in `.dark`. Components never branch on mode. `bg-background-primary-default` resolves to the right color automatically.

> `[gif: toggling dark mode in Storybook, all components switching together]`

### Why OKLch

Tailwind v4 uses OKLch by default. Lightness is an independent axis, so dark mode adjustments don't cause color drift. A 10-step gray ramp looks evenly spaced to the eye. And OKLch values pass through Tailwind without conversion.

---

## Figma Integration

### Token Pipeline

The Figma file has three token sets in Tokens Studio:

```
Primitives    →  raw color palettes (zinc, red, emerald, primary)
Tokens/Light  →  semantic tokens for light mode
Tokens/Dark   →  semantic tokens for dark mode
```

Changing a primitive propagates to every semantic token that references it.

> `[gif: changing a primitive in Tokens Studio, watching semantic tokens update]`

Export flow: Tokens Studio pushes `tokens.json` → `pnpm tokens:build` generates CSS → components use new values immediately.

### Building Components from Figma

I use Figma MCP to read designs directly and build components from them.

> `[gif: Figma MCP reading Button structure, showing extracted variants and tokens]`

The workflow:

1. Figma MCP extracts variants, sizes, states, and token references
2. Figma variable names map 1:1 to Tailwind classes
3. AI generates a React component with `cva` variants matching Figma
4. Storybook's AllVariants story confirms visual parity with Figma

This is codified as a reusable skill (more on that below).

---

## Components

Seven components, each extracted from production:

| Component | Key Decision |
|-----------|-------------|
| **Button** | `asChild` via Radix Slot. Renders as `<a>`, `<Link>`, or any element. No more "ButtonLink" components. |
| **Input** | Label, helper text, error state, icon. `aria-describedby` links errors to inputs. |
| **Card** | Compound pattern. Sub-components compose freely instead of one component with 15 props. |
| **Badge** | Semantic variants: success, warning, error, info. Color communicates meaning. |
| **Avatar** | Radix Avatar handles image loading, error fallback, initials. |
| **Toggle** | Radix Switch. Keyboard nav, `aria-checked`, focus management built in. |
| **Dialog** | Radix Dialog with compound pattern. Overlay, close button, accessible modal. |

> `[gif: Storybook AllVariants story for Button showing all 6 variants × states]`

Every component uses `cva` for variants, `cn()` for class merging, and `React.forwardRef`. Every component accepts a `className` prop for customization.

I didn't build navigation, form validation, or data tables. These are the components Ralfy actually uses. A design system earns trust by doing fewer things well.

---

## AI Workflow

### CLAUDE.md

The project has a `CLAUDE.md` file that AI tools read before generating code. It lists every token class, every component API, every accessibility rule.

Without it, AI generates this:
```tsx
<button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md">Save</button>
```

With it, AI generates this:
```tsx
<Button variant="default" size="md">Save</Button>
```

> `[gif: side by side, same prompt with and without CLAUDE.md]`

The first version hardcodes colors that won't update with token changes. The second inherits dark mode, tokens, and accessibility for free.

It's not just about component usage. CLAUDE.md catches things like `p-4` (arbitrary Tailwind) and steers toward `px-[var(--padding-sm)]` (token-linked). It catches `text-red-500` and steers toward `text-foreground-destructive-default`. It acts as an automated design review.

### Custom Skills

I built a set of Claude Code skills that encode the entire workflow into repeatable operations.

**figma-to-component** reads a Figma design via MCP, maps every token to a Tailwind class, generates a React component with cva variants, creates Storybook stories, and verifies the build. One command for simple components like Badge or Toggle.

> `[gif: running figma-to-component skill, Figma → finished Storybook story]`

**build-component** is the more structured version for complex components. It runs in 5 phases: Figma Analysis, Architecture, Build Atom by Atom, Composition, Verification. Each phase has a user approval gate before proceeding. Used for Dialog, Sidebar, Tabs.

**npm-publish** handles the full release: version bump, build, test, publish to npm, git tag, push to GitHub.

**ralfy-testing** generates tests after code changes. Happy path, edge cases, error handling, validation. It follows the project's testing patterns automatically.

Each skill encodes project conventions so the AI produces code that matches existing components. When I update conventions, the skills update too.

### Example: Building Button from Figma

Here's what the `figma-to-component` workflow actually looks like.

> `[video: full screen recording of the Button rebuild process]`

Figma MCP reads the component and extracts 6 variants, 4 sizes, and all token references.

Tokens map mechanically:
```
background/primary/default        →  bg-background-primary-default
background/primary/default-hover  →  hover:bg-background-primary-default-hover
foreground/primary/default        →  text-foreground-primary-default
radius/radius-md                  →  rounded-[var(--radius-md)]
padding/padding-sm                →  px-[var(--padding-sm)]
```

The AI generates a cva definition that mirrors the Figma structure:

```tsx
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--spacing-sm)] ...',
  {
    variants: {
      variant: {
        default: 'bg-background-primary-default text-foreground-primary-default ...',
        destructive: 'bg-background-destructive-default ...',
      },
      size: {
        sm: 'h-10 px-[var(--padding-sm)] text-sm',
        md: 'h-11 px-[var(--padding-sm)] text-base',
      },
    },
  },
)
```

AllVariants story in Storybook confirms visual parity with the Figma component sheet.

### Example: Token Change Propagation

The real test of a design system. What happens when you change a color?

> `[video: changing primary-900 in Figma, running the pipeline, seeing Button update]`

```
Designer updates primary-900 in Figma
  ↓
Tokens Studio exports → tokens.json
  ↓
pnpm tokens:build → new CSS generated
  ↓
light.css: --background-primary-default: var(--primary-900)   ← same reference
  ↓
Button renders with new color. Zero code changes.
```

One primitive change propagates through the semantic layer to every component. No find-and-replace. No "which components use the primary color?" The architecture handles it.

---

## Storybook

Storybook is the documentation layer.

> `[gif: browsing Storybook autodocs page for Button, showing props table and variants]`

Designers see an autodocs page with props tables and live examples. They can answer "what variants does Button support?" without asking an engineer.

Engineers see AllVariants stories showing every combination in one view, matching the Figma component sheet. Interactive controls let them test any combination of props.

Deployed on Chromatic with a shareable URL. No local setup needed.

---

## CSS Distribution

A Tailwind component library has a packaging problem. The consuming app's Tailwind doesn't scan `node_modules/`, so classes like `bg-background-muted` never get generated.

> `[gif: before/after, component rendering without styles vs with styles.css import]`

I researched how the ecosystem solves this (shadcn copies code, Radix ships pre-built CSS, daisyUI uses a plugin, Chakra uses CSS-in-JS) and chose the approach the Tailwind team recommends for v4.

ralfy-ui ships a `styles.css` that tells the consumer's Tailwind to scan the library and provides token variables. The consumer adds one import:

```css
@import "tailwindcss";
@import "ralfy-ui/styles.css";
```

That's it. Tree-shaking works. Tokens integrate naturally. No configuration beyond one line.

---

## At Scale

This system serves one developer on one product. Scaling to a team would need:

**Component-level tokens.** At 30+ components, the two-tier system shows strain. Per-component tokens like `--button-primary-bg` would give finer control.

**Contribution guidelines.** Clear ownership of what enters the system vs. stays local.

**Visual regression testing.** Chromatic is set up. At scale, snapshot approval workflows would catch token changes before merging.

---

## What I Learned

**Tokens first, components second.** The token system constrains every decision downstream. Getting it right first prevents rework.

**Build what you use.** Every component exists in production. Zero speculative components.

**Three surfaces forced better architecture.** Serving Tailwind, Shadow DOM, and inline styles from one token source pushed toward cleaner separation than a single app would have.

**The workflow matters more than the components.** Anyone can build a Button. The pipeline from Figma to production is what keeps a design system alive.

**CLAUDE.md is the unexpected multiplier.** A rules file readable by both humans and AI turns design system governance from a review process into an automated capability.
