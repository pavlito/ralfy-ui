# Ralfy-UI: Design System Case Study

## What I Built

Ralfy is a LinkedIn feed management tool — custom feeds, AI-generated comments, reply drafts. I built the entire product solo: React frontend, Express backend, and a Chrome extension that injects UI directly into LinkedIn's pages.

As the product grew, I kept duplicating color values, spacing, and component patterns across three separate rendering surfaces. Ralfy-UI is the design system I extracted to fix that.

**Live Storybook:** [Browse on Chromatic](https://69983a8349303a08fb1562fd-kyvjhcchqd.chromatic.com/)
**Source:** [github.com/pavlito/ralfy-ui](https://github.com/pavlito/ralfy-ui)

---

## From Organic Growth to System: The Retrofitting Process

Ralfy wasn't built with a design system. It was built feature by feature — a button here, a card there, colors picked per-component. The Chrome extension duplicated styles from the frontend. When I changed the primary color in the app, the extension still used the old one.

The extraction process:

1. **Audit.** I cataloged every color value, spacing unit, and component pattern across the frontend and extension. The frontend had 12 unique grays. The extension had 8, and only 4 matched.

2. **Identify patterns.** Most components fell into six categories: Button, Input, Card, Badge, Avatar, Toggle. Everything else was a composition of these.

3. **Extract tokens first.** Before touching components, I defined the token layer — one source of truth for color, spacing, and typography. This was the constraint that made everything else possible.

4. **Extract components.** Each production component was rebuilt against the token system, tested, and documented. The old components stayed in place until the new ones were verified.

5. **Validate across surfaces.** Every token and component was tested in all three rendering contexts — React app, Shadow DOM, inline styles — before the old code was removed.

This isn't a greenfield design system. It's a system extracted from a live product, which is a fundamentally different (and harder) problem.

---

## The Hard Problem: Three Surfaces, One Visual Language

Most design systems target one rendering context. Ralfy has three, and each has different constraints:

**1. Frontend App** — Standard React + Tailwind. Components use `bg-primary`, `text-muted-foreground`. Normal developer experience.

**2. Chrome Extension (Shadow DOM)** — The AI comment generator lives inside a Shadow Root injected into LinkedIn's page. Same Tailwind tokens, but isolated from LinkedIn's stylesheets via `:host` scoping. CSS variables are redeclared inside the shadow boundary.

**3. Chrome Extension (Inline Styles)** — LinkedIn actively overwrites injected CSS classes. The feed manager button survives by using `style={{}}` props with a JS token object. Highest specificity wins.

The design system had to serve all three. One set of token values, three delivery mechanisms. Changing `--primary` in `tokens.css` propagates to Tailwind classes in the app, CSS variables in the Shadow DOM, and JS token objects in the inline-styled components.

This constraint shaped every architectural decision.

---

## Token Architecture

### Two Tiers, Not Three

Primitive tokens (`--blue-500`, `--gray-900`) define raw OKLch values. Semantic tokens (`--primary`, `--destructive`) assign roles. Components only reference semantic tokens.

I evaluated a third tier (component-level tokens like `--button-bg`) and dropped it. Six components don't justify the indirection. If Ralfy grew to 30+ components, I'd revisit — but shipping unnecessary abstraction layers early creates maintenance cost with no users to benefit from it.

### Why OKLch

Tailwind v4 uses OKLch by default, and I kept it for three reasons:

1. **Dark mode is predictable.** Lightness is an independent axis in OKLch. Adjusting light/dark values means changing `L` without color drift. In HSL, reducing lightness shifts the perceived hue — grays turn blue, yellows turn green. OKLch avoids this entirely.

2. **Perceptual uniformity.** A 10-step gray ramp in OKLch looks evenly spaced to the eye. In HSL it doesn't. This eliminates the "this shade looks off" back-and-forth between design and engineering.

3. **Zero conversion.** Tailwind v4's `@theme inline` maps CSS custom properties to utility classes natively. OKLch values pass through without transformation.

The trade-off: OKLch is unfamiliar to most designers. Figma doesn't support it natively — only hex, RGB, and HSL. Designers would need a conversion step or plugin. For a solo project this didn't matter; for a team at Kit's scale, I'd provide hex equivalents in the documentation alongside OKLch source values.

### Light/Dark Mode

One set of CSS custom properties under `:root` (light) and `.dark` (dark). Components never branch on mode — `bg-primary` resolves to the correct value based on which class is on `<html>`. Toggle the class, everything updates. No component code changes, no conditional rendering.

---

## Design Fundamentals

A token system is only useful if the values it encodes are deliberate. These are the design decisions baked into Ralfy-UI's tokens.

### Spacing Scale

4px base unit, doubling at key breakpoints: 4, 8, 12, 16, 24, 32, 48, 64. Every margin, padding, and gap references this scale. The constraint prevents "just add 3px" fixes that erode visual rhythm over time.

Component internals follow the same scale — Button padding is `px-4 py-2` (16px/8px), Card padding is `py-6` (24px). The relationship between components stays proportional even as individual components change.

### Typography Hierarchy

Three variables per text role: size, weight, and line-height. Body text is `text-sm` (14px) at `font-normal`. Labels are `text-sm font-medium`. Headings step up through `text-lg`, `text-xl`, `text-2xl` with `font-semibold`.

The hierarchy isn't decorative — it encodes information priority. A user scanning a Card sees the title first (larger, bolder), then the description (smaller, lighter), then the content. The system enforces this hierarchy across every instance, not per-component.

### Color as Communication

Semantic color tokens encode meaning, not aesthetics:

- `primary` = action (buttons, links — "click this")
- `secondary` = supporting (less prominent actions — "or click this")
- `muted` = de-emphasized (helper text, placeholders — "this is context")
- `destructive` = danger (delete, error states — "this is irreversible")
- `accent` = hover/focus feedback (interactive states — "you're interacting with this")

A designer choosing between `destructive` and `primary` for a button is making a communication decision, not a color decision. The system encodes that intent. If the brand's red changes, every destructive action updates. The meaning stays.

---

## Component Decisions

### What I Built

| Component | Why This Pattern | Tests |
|-----------|-----------------|-------|
| **Button** | `asChild` via Radix Slot — renders as `<a>`, `<Link>`, or any element while keeping button styles. Six variants (`primary`, `destructive`, `outline`, `secondary`, `ghost`, `link`) and four sizes including `icon`. Eliminates the "ButtonLink" anti-pattern. | 18 |
| **Input** | Native `<input>` with label, helper text, error state, and icon. `aria-describedby` links error messages to the input for screen readers. Dark mode gets `bg-input/30` for subtle depth. | 11 |
| **Card** | Compound component — `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` compose independently. Three variants (`default`, `outlined`, `elevated`). Avoids the 15-prop god-component. | 11 |
| **Badge** | Four variants: `default`, `secondary`, `destructive`, `outline`. Rounded rectangle with border. Meaning is encoded in the variant name — `destructive` is always the danger color, regardless of theme. | 8 |
| **Avatar** | Radix Avatar handles image loading, error fallback, and initials rendering. Three sizes with online status indicator. Building this from scratch takes a week and still misses edge cases. | 9 |
| **Toggle** | Radix Switch provides keyboard navigation, `aria-checked`, and focus management. A custom implementation would need extensive accessibility testing. | 8 |

**65 unit tests** across components. Tests verify variant rendering, accessibility attributes, keyboard interaction, ref forwarding, and className merging. An additional **99 Storybook interaction tests** verify stories render correctly across 33 test files. **164 tests total.**

### Patterns Used Everywhere

- **`cva` (class-variance-authority)** — Variant logic is declarative. Adding a new Button variant is one line in the variants object, not a conditional chain. Variants are typed — TypeScript catches `variant="primry"` at compile time.
- **`cn()` (clsx + tailwind-merge)** — Merges classNames and deduplicates conflicting Tailwind utilities. Users can override styles without `!important`.
- **`React.forwardRef`** — Every component. Necessary for form libraries, animation tools, and tooltip positioning.

### What I Didn't Build

No navigation, no modals, no form validation, no data tables. These are the components Ralfy actually uses — I didn't pad the library with components I'd never tested in production. A design system earns trust by doing fewer things well, not by having a long component list.

---

## Storybook as Living Documentation

Storybook isn't an afterthought — it's the canonical reference for Ralfy-UI. It serves two audiences:

**For designers:** Token documentation pages show every semantic color with its light/dark values, the full typography scale, and the spacing system. A designer can open Storybook and answer "what's our destructive color?" without asking an engineer.

**For engineers:** Every component has stories for each variant, size, and state (loading, disabled, error). Composed page stories (Dashboard, Settings, Login) show how components combine in real layouts. An engineer can see exactly what `<Button variant="ghost" size="sm">` looks like before writing code.

**What's deployed:**

- 94 stories across 33 files
- Token architecture overview with interactive examples
- Dark mode toggle to preview both themes
- Deployed on Chromatic with a shareable URL — no local setup needed

This is the same role Storybook would play at Kit, replacing React Styleguidist as the canonical component reference. The transition path is familiar: document what exists, make it browsable, make it the source of truth.

---

## AI-Assisted Workflow

The project includes a `CLAUDE.md` file — a machine-readable specification that AI coding tools read before generating code. It lists every token class, component API, variant option, and accessibility requirement.

**Without CLAUDE.md**, AI generates plausible but non-compliant code:
```tsx
<button className="bg-[#1a1a2e] text-white px-4 py-2 rounded-md">Save</button>
```

**With CLAUDE.md**, same prompt produces:
```tsx
<Button variant="primary" size="md">Save</Button>
```

The difference isn't cosmetic. The first creates a maintenance liability — that hex value won't update with a brand change, won't swap in dark mode, and won't match adjacent components. The second inherits all of that for free.

This turns "design system compliance" from a manual review task into an automated toolchain capability. A new engineer describes what they need; the AI generates system-compliant code. The style guide review step disappears.

---

## What I'd Do Differently at Scale

This system serves one developer on one product. Scaling it to a team of 30+ engineers (like Kit's) would require changes:

1. **Component-level tokens.** At 30+ components, the two-tier system starts showing strain. `--button-primary-bg` gives designers per-component control without touching the semantic layer.

2. **Figma Variables pipeline.** Currently tokens live in code and Figma mirrors them manually. At scale, I'd automate this — export `tokens.css` to Figma Variables via Style Dictionary or a custom sync script. The token architecture is already structured for this: primitives map to a Figma primitive collection, semantics map to a semantic collection with light/dark modes.

3. **Contribution guidelines.** A volunteer Component Librarians model works early on but needs formalized ownership. Clear criteria for what gets into the system vs. stays as a local pattern.

4. **Visual regression testing.** Chromatic is already set up. At scale, I'd add snapshot approval workflows so token changes get visual review before merging.

---

## Lessons

1. **Start with tokens, not components.** The token system constrains every decision downstream. Getting it right first prevents rework when components inevitably change.

2. **Build what you use.** Every component in this system exists in production Ralfy. Zero speculative components. The design system earned trust because it solved real problems, not hypothetical ones.

3. **Three rendering surfaces forced better architecture.** The constraint of serving Tailwind, Shadow DOM, and inline styles from one token source pushed toward a cleaner separation than a single-context system would have demanded.

4. **CLAUDE.md is the unexpected multiplier.** A rules file readable by both humans and AI turns design system governance from a review process into an automated capability.
