# Case Study HTML Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone HTML case study page with engineering blog aesthetics for the Kit Senior Design Engineer II application.

**Architecture:** Single self-contained HTML file with inline `<style>`, Google Fonts, and Prism.js for syntax highlighting. No build step. Content adapted from `docs/case-study.md` with new sections for production integration and UI audit. Styled after Stripe/Linear/Vercel blog posts.

**Tech Stack:** HTML, CSS (inline), Inter + JetBrains Mono (Google Fonts), Prism.js (CDN)

**Source content:**
- Primary: `docs/case-study.md` — all existing sections
- New content: `docs/kit-application-tasks.md` — Production Integration and UI Audit sections

**Content note:** Do NOT mention Kit by name anywhere. Allude to their problems subtly — Dan Winer will recognize them. Specifically:
- Replace "problems Kit faces" with "the class of problems design systems exist to solve"
- Keep "30+ engineers" and "Component Librarians" references in Scale section (Kit-specific terms Dan will recognize)
- Keep focus on retrofitting, Figma-to-code parity, volunteer ownership model — all Kit pain points without naming Kit

---

### Task 1: Write the complete HTML page

**Files:**
- Create: `docs/case-study/index.html`

**Step 1: Create directory**

```bash
mkdir -p docs/case-study
```

**Step 2: Write the complete `docs/case-study/index.html`**

One self-contained file with everything: `<head>`, `<style>`, `<body>`, all content.

#### `<head>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ralfy-UI: Design System Case Study</title>

  <!-- OG meta tags for link previews -->
  <meta property="og:title" content="Ralfy-UI: Design System Case Study">
  <meta property="og:description" content="How I extracted a token-driven design system from a live product and built the Figma-to-production pipeline that keeps it in sync.">
  <meta property="og:type" content="article">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Prism.js syntax highlighting (Tomorrow Night theme) -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet">
</head>
```

#### `<style>` — Complete CSS

```css
/* Reset */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }

/* Base */
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: #fafafa;
  color: #18181b;
  line-height: 1.7;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
}

/* Layout */
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px 96px;
}

/* Typography */
h1 {
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 8px;
  color: #09090b;
}
h2 {
  font-size: 24px;
  font-weight: 600;
  margin: 64px 0 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e4e7;
  color: #09090b;
}
h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 32px 0 12px;
  color: #18181b;
}
p { margin: 0 0 24px; }
a { color: #2563eb; text-decoration: none; }
a:hover { text-decoration: underline; }
strong { font-weight: 600; }

/* Inline code */
code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: #f4f4f5;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Code blocks (Prism overrides) */
pre {
  margin: 0 0 24px;
  border-radius: 8px;
  overflow-x: auto;
}
pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: 14px;
  line-height: 1.6;
}

/* Tables */
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  margin: 0 0 24px;
}
th {
  text-align: left;
  padding: 12px 16px;
  border-bottom: 2px solid #e4e4e7;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #71717a;
}
td {
  padding: 12px 16px;
  border-bottom: 1px solid #f4f4f5;
  vertical-align: top;
}

/* Dividers */
hr {
  border: none;
  height: 1px;
  background: #e4e4e7;
  margin: 48px 0;
}

/* Lists */
ol, ul {
  margin: 0 0 24px;
  padding-left: 24px;
}
li {
  margin-bottom: 12px;
}

/* Hero */
.hero {
  padding: 80px 0 48px;
}
.hero .subtitle {
  color: #71717a;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 24px;
}
.hero .links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.hero .links a {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e4e4e7;
  border-radius: 999px;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #18181b;
  transition: border-color 0.15s, background 0.15s;
}
.hero .links a:hover {
  border-color: #a1a1aa;
  background: #fff;
  text-decoration: none;
}

/* Pipeline diagram */
.pipeline {
  background: #18181b;
  color: #a1a1aa;
  padding: 32px;
  border-radius: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 2;
  margin: 0 0 24px;
  overflow-x: auto;
}
.pipeline .step {
  color: #e4e4e7;
}
.pipeline .arrow {
  color: #52525b;
}
.pipeline .label {
  color: #71717a;
  font-style: italic;
}
.pipeline .highlight {
  color: #60a5fa;
}

/* Callout */
.callout {
  background: #eff6ff;
  border-left: 3px solid #2563eb;
  padding: 16px 20px;
  border-radius: 0 8px 8px 0;
  margin: 24px 0;
  font-size: 16px;
  color: #1e3a5f;
}
.callout p { margin: 0; }

/* Responsive */
@media (max-width: 640px) {
  body { font-size: 16px; }
  h1 { font-size: 28px; }
  h2 { font-size: 22px; margin-top: 48px; }
  .hero { padding-top: 48px; }
  .hero .subtitle { font-size: 17px; }
  .container { padding: 32px 16px 64px; }
  table { font-size: 13px; }
  th, td { padding: 8px 12px; }
  .pipeline { padding: 20px; font-size: 12px; }
}
```

#### `<body>` — Content sections

Write all content inside `<div class="container">`. Adapt text from `docs/case-study.md`. Use these exact sections in order:

**1. Hero**
```html
<div class="hero">
  <h1>Ralfy-UI: Design System Case Study</h1>
  <p class="subtitle">
    How I extracted a token-driven design system from a live product
    and built the Figma-to-production pipeline that keeps it in sync.
  </p>
  <div class="links">
    <a href="https://69983a8349303a08fb1562fd-kyvjhcchqd.chromatic.com/">Live Storybook</a>
    <a href="https://github.com/pavlito/ralfy-ui">Source Code</a>
  </div>
</div>
```

**2. "What I Built"** — `<h2>` + 2-3 paragraphs from case-study.md intro. Context: Ralfy is a LinkedIn tool, solo-built, three rendering surfaces, why a design system was needed.

**3. "The End-to-End Workflow"** — `<h2>` + pipeline diagram using `<div class="pipeline">` with `.step`, `.arrow`, `.label`, `.highlight` spans. Then explanatory paragraph. Then `.callout` block: "This workflow directly addresses the problems Kit faces..."

**4. "From Organic Growth to System"** — `<h2>` + intro paragraph + `<ol>` with 5 steps from case-study.md. Emphasize this is retrofitting a live product.

**5. "Three Surfaces, One Visual Language"** — `<h2>` + intro + three `<h3>` sub-sections (Frontend App, Chrome Extension Shadow DOM, Chrome Extension Inline Styles). Closing paragraph about one token source, three delivery mechanisms.

**6. "Token Architecture"** — `<h2>` with sub-sections:
- `<h3>` "Two Tiers" — two `<pre><code class="language-css">` blocks (primitives, semantic)
- `<h3>` "Token Categories" — `<table>` with Category, Token, Tailwind Class, Usage columns
- `<h3>` "Why OKLch" — numbered list (3 reasons)
- `<h3>` "Light/Dark Mode" — one paragraph

**7. "Production Integration"** — `<h2>` + NEW content from kit-application-tasks.md:
- Paragraph: installed ralfy-ui in ralfy-fullstack, imported generated CSS files
- Bullet points: replaced ~30 hardcoded oklch values with `var()` references, fixed hsl() wrapper bug, verified 167/167 CSS variable references
- Closing: "The system works in production, not just Storybook."

**8. "UI Inconsistency Audit"** — `<h2>` + NEW content:
- Paragraph: audited production UI for inconsistencies
- Bullet points: 6 fixes across specific components, ~42 hardcoded → ~13 token references, standardized spacing and hover patterns
- Closing: design system catches real problems

**9. "Figma Integration"** — `<h2>` with sub-sections:
- `<h3>` "Tokens Studio Pipeline" — `<div class="pipeline">` showing three token sets + export flow
- `<h3>` "Figma MCP for Component Development" — numbered list (4 steps)

**10. "Component Decisions"** — `<h2>` with sub-sections:
- `<h3>` "What I Built" — `<table>` with Component, Why This Pattern, Key Feature columns (7 rows)
- `<h3>` "Patterns Used Everywhere" — bullet list (cva, cn, forwardRef)
- `<h3>` "What I Didn't Build" — one paragraph about intentional scope

**11. "AI-Assisted Workflow"** — `<h2>`:
- Paragraph about CLAUDE.md
- Before/after code comparison: two `<pre><code>` blocks (without CLAUDE.md vs with)
- Paragraph about figma-to-component skill

**12. "Storybook as Living Documentation"** — `<h2>` + two paragraphs (for designers, for engineers). Mention Chromatic deploy.

**13. "What I'd Do at Scale"** — `<h2>` + intro + `<ol>` with 3 items (component-level tokens, contribution guidelines, visual regression).

**14. "Lessons"** — `<h2>` + `<ol>` with 5 lessons from case-study.md. This is the closing section — strong, memorable takeaways.

#### Footer scripts

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-css.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
```

**Step 3: Verify in browser**

```bash
open docs/case-study/index.html
```

Check:
- Inter font loads, page is centered at 720px
- Hero has large title, muted subtitle, pill-button links
- Pipeline diagrams render dark with monospace text
- Code blocks have syntax highlighting (CSS, TSX, bash)
- Tables are clean with subtle row borders
- Callout has blue-50 background with left border
- Responsive: resize to 375px width — text scales, tables don't overflow
- All links work (Storybook, GitHub)

---

### Task 2: Polish and verify

**Files:**
- Modify: `docs/case-study/index.html`

**Step 1: Read the complete HTML file end-to-end**

Check for:
- Typos, grammar issues, or awkward phrasing
- Sections that are too long or too short
- CSS inconsistencies (spacing between sections, font sizes)
- Code blocks that overflow on mobile
- Tables where columns are too wide/narrow

**Step 2: Verify the page tells a compelling story**

The target reader is Dan Winer (Kit Product Design Director) who:
- Values connecting design work to business outcomes
- Can execute designs from wireframe to code himself
- Wants to see: token parity, retrofitting, Figma-to-code, production results

Check that these Kit-relevant signals are clearly visible:
- End-to-end pipeline (not just components)
- Retrofitting from live product (not greenfield)
- Real production numbers (167 vars, 30 hardcoded values replaced, 6 fixes)
- AI-assisted workflow (differentiator)

**Step 3: Fix any issues found**

**Step 4: Final browser test at both desktop and mobile widths**

---

### Task 3: Commit

**Step 1: Stage and commit**

```bash
git add docs/case-study/index.html
git commit -m "feat: case study HTML page for Kit application"
```
