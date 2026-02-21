# Kit Application - Task Tracker

## Goal
Submit a strong application for Kit Senior Design Engineer II with:
1. Case study page (HTML) with embedded video
2. Storybook on Chromatic (live link)
3. GitHub repo (source)

## Application Deliverables

| Deliverable | Status | Notes |
|------------|--------|-------|
| Case study HTML page | Done | `case-study.html` - updated stats, Dialog screenshots added. Needs video embed. |
| Storybook on Chromatic | Done | https://69983a8349303a08fb1562fd-kyvjhcchqd.chromatic.com/ |
| GitHub repo | Done | https://github.com/pavlito/ralfy-ui |
| Video walkthrough | Not started | 2-3 min, embedded in case study |
| Cover letter | Not started | |
| Application answers | Not started | |

---

## Remaining Tasks

### 1. Rebuild Storybook & Update Screenshots
**Status:** Done (except Chromatic push)
**Why:** Dialog component added, DashboardPage updated - Storybook static build and case study screenshots were stale.

- [x] Run `pnpm build-storybook`
- [x] Retake screenshots with Playwright (dashboard-light, dashboard-dark, button-variants + 4 dialog screenshots)
- [x] Update case-study.html with new screenshots and stats
- [ ] Push to Chromatic: `pnpm chromatic`

### 2. Deploy Case Study Page
**Status:** Not started
**Why:** case-study.html needs to be accessible via URL, not just local file.

- [ ] Deploy to Vercel or Netlify (static HTML + screenshots)
- [ ] Or add as a route in Storybook

### 3. Record Video (2-3 min)
**Status:** Not started
**Why:** Kit explicitly asks for portfolio evidence. Video shows live product + workflow.

**Script:**
1. **Production app** (30s) - Dashboard, feeds, dark mode toggle. Proves it's a real product.
2. **Storybook** (45s) - Token docs, component variants, Dialog component, light/dark.
3. **New component workflow** (60s) - Show Dialog from Storybook matching production usage.
4. **CLAUDE.md demo** (30s) - AI generates system-compliant code.

- [ ] Record with Loom or QuickTime
- [ ] Embed in case-study.html (Loom embed or video file)

### 4. Update Case Study Page
**Status:** Mostly done
**Why:** Add video section, update component count (now 7), update test/story counts.

- [ ] Add video embed section (between Hero and Problem sections) - waiting for video
- [x] Update hero stats: 7 components, 180 tests, 99 stories
- [x] Add Dialog screenshots to Components section (4 variants: form, confirmation, destructive, info)
- [x] Update stats grid: 7 components, 76 unit tests, 104 storybook tests, 99 stories

### 5. Write Cover Letter
**Status:** Not started
**Why:** Kit reads every application. This is the narrative wrapper.

Key points to hit:
- Retrofitting a live product (not greenfield)
- Three rendering surfaces constraint
- Token architecture with OKLch reasoning
- AI-assisted workflow (CLAUDE.md)
- Solo builder who can design AND code

### 6. Answer Application Questions
**Status:** Not started
**Why:** Required by Kit application.

Need to check exact questions on Ashby form.

---

## Completed Tasks

### Dialog Component
**Status:** Done
- `Dialog.tsx` - Radix-based, compound pattern
- `Dialog.test.tsx` - 11 unit tests
- `Dialog.stories.tsx` - 5 stories (Default/Form, Confirmation, Destructive Verification, Info, AllVariants)
- Exported from `index.ts`
- All 180 tests pass, typecheck clean

### DashboardPage Sync
**Status:** Done
- Changed Quick Actions buttons from `variant="secondary"` to `variant="outline"` to match production app

### Case Study HTML Page
**Status:** Done
- `case-study.html` - Dark theme, responsive, inline CSS
- Sections: Hero, Three Surfaces, Token Architecture, Components (with Dialog showcase), AI Workflow, Footer
- Screenshots in `public/case-study/` (dashboard light/dark, button variants, 4 dialog variants)
- Stats updated: 7 components, 180 tests, 99 stories

### Token Audit
**Status:** Done
- ralfy-ui and frontend tokens match
- Extension has stale desaturated colors (separate concern, not blocking)

### Production Component Audit
**Status:** Done
- 140+ production components audited
- 27 shadcn/ui base components, 99% token usage
- Only 3 hardcoded colors (LinkedIn brand)
- No critical inconsistencies

---

## Current Stats

| Metric | Value |
|--------|-------|
| Components | 7 (Button, Input, Card, Badge, Avatar, Toggle, Dialog) |
| Unit tests | 76 |
| Storybook tests | 104 |
| Total tests | 180 |
| Stories | ~99 |
| Rendering surfaces | 3 (Tailwind, Shadow DOM, Inline styles) |
