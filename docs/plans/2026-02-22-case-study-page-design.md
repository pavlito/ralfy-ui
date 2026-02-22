# Case Study Web Page — Design

## Goal
Standalone HTML case study page for Kit Senior Design Engineer II application. Portfolio piece that demonstrates end-to-end design system thinking.

## Target Audience
Kit hiring team (Dan Winer, Product Design Director). Values business outcomes over vague "consistency" talk. Can execute designs from wireframe to code himself.

## Technical Approach
- Standalone HTML file: `docs/case-study/index.html`
- All CSS inline (no build step required)
- Inter font via Google Fonts
- Hostable anywhere (Vercel, Netlify, GitHub Pages, or open directly in browser)

## Visual Style: Engineering Blog
References: Stripe, Linear, Vercel engineering blog posts.

- **Layout:** Max-width ~720px prose column, centered
- **Typography:** Inter, large hierarchy (h1 ~36px, body ~18px, line-height 1.7)
- **Colors:** Neutral zinc palette, accent color for links/highlights
- **Code blocks:** Dark background, monospace, language label
- **Tables:** Clean, subtle zebra striping, no heavy borders
- **Pipeline diagrams:** Styled `<pre>` blocks or visual step indicators
- **Section dividers:** Spacing or subtle `<hr>`, no heavy visual borders
- **Hero:** Title + subtitle + links (Storybook, GitHub) at top
- **Responsive:** Mobile-first, fluid typography, horizontal scroll on code blocks

## Content Structure
Based on `docs/case-study.md` with additions from `docs/kit-application-tasks.md`:

1. Hero — title, subtitle, links (Storybook, GitHub)
2. What I Built — Ralfy context, why a design system was needed
3. The End-to-End Workflow — pipeline diagram
4. Retrofitting Process — extraction from live product
5. Three Rendering Surfaces — the hard constraint
6. Token Architecture — two tiers, OKLch, light/dark
7. Production Integration — theme.css retrofit, var() references (NEW)
8. UI Inconsistency Audit — found and fixed real issues (NEW)
9. Figma Integration — Tokens Studio pipeline + Figma MCP
10. Component Decisions — what was built and why
11. AI-Assisted Workflow — CLAUDE.md + figma-to-component skill
12. Storybook as Documentation
13. What I'd Do at Scale
14. Lessons

## Deliverable
One self-contained HTML file that can be shared as a link in the Kit application.
