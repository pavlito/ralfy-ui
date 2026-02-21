# Kit Senior Design Engineer II - Role Research

## The Company

Kit (formerly ConvertKit) is a creator marketing platform (email marketing, landing pages, automations). ~102 people, ~30 engineers, ~5 product designers. Fully remote, bootstrapped, growing toward $100M ARR.

**Product Design Director:** Dan Winer (joined Sep 2024, ex-PandaDoc, ex-Smile.io). Reports to him. He values connecting design work to business outcomes over vague "consistency" talk. Can execute designs from wireframe to code himself.

## Kit's Current Design System State

**What exists:**
- `@convertkit/design` - React component library on npm (v2.2.6, Oct 2025)
- design.kit.com - public documentation site (Tokens, Components, Guides)
- React Styleguidist (NOT Storybook) for component docs, localhost:6060
- Component Librarians - volunteer engineer group that reviews PRs
- Figma usage for product and brand design (no public Figma Variables pipeline)

**What's broken:**
- UI inconsistency across the app (explicitly stated in job posting)
- No dedicated design system owner (volunteer model)
- CSS history: Bootstrap + BEM + OOCSS + CSS modules -> Tailwind (2023)
- No automatic rebuilding during local dev
- Manual version bumps to update components in main app
- Incomplete Figma-to-code token parity

**Tech stack:**
- Ruby on Rails + React (possibly plain JS, not TypeScript confirmed)
- Tailwind CSS (adopted 2023)
- Rollup for component library build
- Netlify for PR deploy previews
- CircleCI for CI
- Custom Slate.js fork for rich text editor

## The Role: Design Engineer

### What this role IS

The Design Engineer owns the **system** - tokens, components, documentation, and the workflow between design and code. Designers and engineers are your users.

### What this role is NOT

Not a product designer (doesn't design pages/screens/flows). Not a pure frontend engineer (doesn't just code what they're told).

### Scope Boundary

| Responsibility | Product Designer | Design Engineer |
|---|---|---|
| Works in | Figma | Figma + VS Code |
| Creates | Pages, flows, UX | Components, tokens, system |
| Decides | How a specific page looks | How a Button looks on ALL pages |
| Output | Figma mockups | React code + Storybook + Figma library |
| Users | End users | Designers + engineers |

### Day-to-Day

**Month 1:**
- Audit UI for patterns and inconsistencies
- Establish token architecture mapped between Figma and code
- Implement missing React components

**Months 2-6:**
- Lead development of 5-8 core components with production docs
- Navigation suites with performance targets
- Work with designers to define pattern standards
- Provide React hand-offs for features
- Help design team use AI-assisted code generation (Figma -> components)

**Year 1:**
- Establish Storybook as canonical UI reference (replacing Styleguidist)
- Create stable, predictable design-to-code workflow
- Drive adoption with visible consistency improvements
- Implement guardrails to prevent UI drift

### Required Experience

- 6+ years with significant design system work in production
- Retrofitting legacy UI into cohesive design systems
- Prior design work with portfolio showing UI fundamentals
- Deep React component architecture
- Storybook maintenance as canonical reference
- Design token system management with Figma integration
- Bridging design and code in live products
- AI tooling for design-to-code acceleration

### Compensation

- Salary: $186,000 (Level 4)
- Equity: $50,000/year
- Profit sharing, 401k (5% match), health ($2,100/mo), $3,500 learning budget

## How Ralfy-UI Maps to Kit's Needs

| Kit needs | Ralfy-UI demonstrates |
|---|---|
| Token architecture (Figma <-> code) | 2-tier OKLch system with `@theme inline` mapping |
| React/TS component architecture | 21 components, forwardRef, cva, compound patterns |
| Storybook as canonical reference | Live Chromatic with 94 stories |
| Retrofitting legacy UI into system | Extraction of real Ralfy production components |
| AI tooling for design-to-code | CLAUDE.md + AI workflow documentation |
| Bridging design and code | Extension + frontend components from live product |
| Visual design fundamentals | Token-driven dark mode, spacing scale, typography |
| Strong design eye | Can make system-level design decisions (spacing, hierarchy) |

## Sources

- Job posting: https://jobs.ashbyhq.com/kit/3cfaf05f-241e-453e-85c0-05fb640a105a
- Kit careers: https://kit.com/careers
- Engineering blog: https://engineering.kit.com/
- Tailwind adoption: https://engineering.kit.com/2023/03/27/why-we-use-tailwind/
- Team culture: https://kit.com/handbook/team-and-culture
- Design system engineer scope: https://www.uxpin.com/studio/blog/design-system-engineer/
