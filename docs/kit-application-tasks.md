# Kit Application - Task Tracker

## Goal
Submit a strong application for Kit Senior Design Engineer II with:
1. Case study (markdown or HTML) with embedded video
2. Storybook on Chromatic (live link)
3. GitHub repo (source)

## Application Deliverables

| Deliverable | Status | Notes |
|------------|--------|-------|
| Case study | Needs update | `docs/case-study.md` — add production integration + UI audit sections |
| Storybook on Chromatic | Needs deploy | Color palette story added, components being rebuilt |
| GitHub repo | Done | https://github.com/pavlito/ralfy-ui |
| Video walkthrough | Not started | AI-powered workflow demo (see Demo Script below) |
| Cover letter | Not started | |
| Application answers | Not started | |

---

## Completed Work

### Token Pipeline
- Figma → Tokens Studio → `tokens.json` → Style Dictionary → CSS
- Three generated files: `primitives.css`, `light.css`, `dark.css`
- `pnpm tokens:build` regenerates from JSON

### Button Component (from Figma)
- 6 variants, 4 sizes, icon support, loading state
- 15 tests passing
- 16 Storybook stories (incl. AllVariants, AllSizes)
- Autodocs

### Production Integration (ralfy-fullstack)
- Installed `ralfy-ui` as link dependency
- Imported generated CSS (primitives → light → dark → theme.css)
- Replaced ~30 hardcoded oklch values in theme.css `:root` and `.dark` with `var()` references to ralfy-ui tokens
- Fixed `hsl()` wrapper bug on oklch values in `pulse-success` animation
- 167/167 CSS variable references verified

### UI Inconsistency Fixes (ralfy-fullstack)
- Audit document: `docs/ui-inconsistencies.md`
- 6 fixes across StatusBadge, StatsCard, account-tab, extension-error-logs, profile-tab, SourceItem
- ~42 hardcoded color declarations → ~13 theme token references
- Standardized spacing and hover patterns

### Color Palette Story
- `src/tokens/ColorPalette.stories.tsx` — visual token reference in Storybook
- Shows all background, foreground, border, and icon tokens
- Labels `background-primary-light` as "sidebar" for demo

---

## Remaining Tasks

### 1. Build Input component from Figma
Read Figma design via MCP → build component with token classes → stories with autodocs → tests.
Shows the workflow is repeatable, not a one-off.

### 2. Build Badge component from Figma
Simpler component, good for showing the skill works on multiple components.
Semantic variants (success, warning, error, info, neutral).

### 3. Verify Color Palette story in Storybook
Run `pnpm storybook` and confirm it renders correctly in light and dark mode.

### 4. Deploy to Chromatic
`pnpm chromatic` — get a shareable URL Dan can open.

### 5. Update case-study.md
Add sections:
- Production integration (theme.css retrofit)
- UI inconsistency audit and fixes
- AI-powered workflow (Figma MCP → Storybook → production)
- Sidebar fix as concrete example
Update Chromatic link.

### 6. Record Demo Video (2-3 min)
See Demo Script below.

### 7. Write Cover Letter
Key points:
- End-to-end workflow owner (design AND code)
- Figma token pipeline (exactly what Kit is missing)
- Retrofitting real product, not greenfield
- AI-assisted design-to-code (CLAUDE.md + Figma MCP + skills)
- Found and fixed real inconsistencies in production

### 8. Answer Application Questions
Check exact questions on Ashby form.

---

## Demo Script: AI-Powered Design-to-Code Workflow

### Concept
Live recording of AI doing the work. Not "look what I did" but "look how I work."
One concrete example: sidebar doesn't match Figma → find → fix → verify.

### Step 1: Read from Figma (30s)
**Prompt:** "Pročitaj sidebar dizajn iz Figme i reci mi koje tokene koristi"
- Claude reads Figma via MCP
- Returns: sidebar uses `background/primary/light` = `#18181B`
- Show Figma side-by-side

### Step 2: Build Sidebar preview in Storybook (30s)
**Prompt:** "Napravi Sidebar preview u Storybook-u koristeći te Figma tokene"
- Claude creates a story using `var(--background-primary-light)`
- Open Storybook → see the sidebar with correct Figma color
- Toggle dark mode → still correct

### Step 3: Review production sidebar (30s)
**Prompt:** "Uporedi produkcijski sidebar sa Figma dizajnom — da li matchuje?"
- Claude reads `theme.css` → finds `--sidebar: var(--card)`
- Reports: "Ne matchuje. Produkcija koristi `--card` (zinc-950 = #09090B), Figma kaže `background-primary-light` (#18181B)"
- Show Chrome DevTools proving the mismatch

### Step 4: Fix (15s)
**Prompt:** "Popravi sidebar da koristi pravi Figma token"
- Claude changes one line: `--sidebar: var(--background-primary-light)`
- Refresh → sidebar now matches Figma

### Step 5: Magic moment — token change propagation (30s)
- Change a token value in `tokens.json` (or Figma)
- `pnpm tokens:build`
- Storybook updates → production updates
- "Jedna promena, sve se ažurira"

### Key message
"Nisam samo napravio komponente — napravio sam workflow koji povezuje Figmu sa produkcijom. To je ono što Kit-u fali, i to mogu da donesem od prvog dana."

---

## Architecture: Full Pipeline

```
Figma (source of truth)
  ↓ Tokens Studio export
tokens.json
  ↓ pnpm tokens:build (Style Dictionary)
src/tokens/generated/*.css
  ↓
ralfy-ui Storybook (visual verification)
  ↓
ralfy-ui npm package
  ↓
ralfy-fullstack: @import 'ralfy-ui/generated/primitives.css'
  ↓
theme.css: --sidebar: var(--background-primary-light)
  ↓
Production app renders with Figma tokens
```

---

## Reference Docs

| Doc | Purpose |
|-----|---------|
| `docs/case-study.md` | Portfolio piece — main deliverable |
| `docs/kit-role-research.md` | Internal reference — role requirements, Dan's priorities |
| `docs/ui-inconsistencies.md` | Audit of production UI inconsistencies (in ralfy-fullstack) |
