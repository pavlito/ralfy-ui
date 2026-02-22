# Case Study Structure

## Flow

Haos → odluka da se reši → kako sam ga rešio (odluke) → šta sam naučio

---

## 1. Šta je ovo
- Jedna rečenica: design system izvučen iz produkcije
- Linkovi: Storybook, GitHub
- 📸 **screenshot**: Storybook landing page sa svim komponentama

## 2. Kontekst
- Šta je Ralfy (LinkedIn tool, feeds, AI komentari)
- Solo developer, sve sam radio
- Tri surface-a: app, Shadow DOM, inline styles na LinkedInu
- 📸 **screenshot**: Ralfy app UI (frontend)
- 📸 **screenshot**: Chrome extension na LinkedIn-u (Shadow DOM + inline)
- 📐 **dijagram**: tri surface-a i kako ih DS opslužuje (App → Tailwind classes, Shadow DOM → CSS vars, Inline → JS token object). Jedan izvor, tri delivery mehanizma

## 3. Problem
- Duplikacija: hardcoded hex boje u oba codebase-a, bez zajedničkog izvora
- Promena boje u app-u ne propagira u extension
- Copy-paste komponenti između codebases
- 📸 **screenshot**: kod sa hardcoded hex bojama (before)
- 📸 **screenshot**: isti kod sa token klasama (after)

## 4. Kako sam pristupio
- Retrofitting, ne greenfield. Sistem izvučen iz live producta
- Tokens first, components second. Zašto tim redom
- 📸 **dijagram**: pipeline Figma → Tokens Studio → tokens.json → Style Dictionary → CSS → Tailwind → Components → Storybook → npm → Production

## 5. Token sistem
- Dva tiera: primitives (raw OKLch) → semantic (uloge)
- Zašto OKLch (Tailwind v4 default, lightness osa za dark mode)
- Imenovanje: Figma path = Tailwind klasa, nema alias layer
- Dark mode: :root vs .dark, komponente ne znaju koji je mode
- 📸 **dijagram**: primitive token (--zinc-900) → semantic (--background-primary-default) → Tailwind (bg-background-primary-default)
- 🎬 **gif**: dark mode toggle u Storybooku, sve komponente se menjaju odjednom

## 6. Figma pipeline
- Tokens Studio sa 3 seta (primitives, light, dark)
- Export: tokens.json → Style Dictionary → generated CSS
- Demo: šta se desi kad promenim jednu boju
- Figma MCP: čitanje dizajna direktno, mapiranje tokena
- 📸 **screenshot**: Tokens Studio u Figmi, tri token seta
- 🎬 **video (kratak, 30s)**: promena tokena u Figmi → export → pnpm tokens:build → Storybook prikazuje novu boju

## 7. Komponente
- Šta sam napravio (5 komponenti: Button, Alert, Sidebar, TabItem, Tabs) i zašto baš te
- Zašto cva za varijante (deklarativno, TypeScript type safety)
- Zašto compound pattern za Alert/Sidebar/Tabs (vs god-component sa 15 props)
- Zašto Radix za Tabs (accessibility out of the box)
- Šta nisam napravio i zašto
- 📐 **dijagram**: compound pattern anatomy (Card → CardHeader + CardContent + CardFooter, svaki nezavisan). Poređenje sa god-component koji ima 15 props
- 📸 **screenshot**: Storybook AllVariants story za Button (svi varijanti × states)
- 📸 **screenshot**: Figma component sheet pored Storybook AllVariants (side by side parity)

## 8. CSS distribucija
- Problem: Tailwind v4 ne skenira node_modules
- Istraživanje ekosistema: shadcn, Radix, daisyUI, Chakra
- Rešenje: styles.css sa @source + token imports. Jedan import za konzumera
- 📐 **dijagram**: kako styles.css rešava problem. ralfy-ui šalje @source + token CSS → consumer Tailwind skenira → klase se generišu. Poređenje sa alternativama (shadcn copy, Radix pre-built, Chakra runtime)
- 📸 **screenshot (before)**: komponenta renderovana bez stilova u consuming app-u
- 📸 **screenshot (after)**: ista komponenta sa stilovima posle jednog import-a

## 9. AI workflow
- CLAUDE.md: šta je, before/after primer generisanog koda
- Custom skills: figma-to-component, build-component, npm-publish, ralfy-testing
- Kako build-component radi u 5 faza sa approval gates
- Zašto ovo matters: skills kodifikuju konvencije, AI ne driftuje
- 📐 **dijagram**: build-component 5 faza flow (Figma Analysis → Architecture → Build → Composition → Verification) sa approval gates između svake
- 📸 **screenshot (before/after)**: AI output bez CLAUDE.md (hardcoded) vs sa CLAUDE.md (design system)
- 🎬 **video (kratak, 45s)**: figma-to-component skill u akciji, od Figma URL-a do gotove Storybook story

## 10. Rezultat
- Token promena propagira bez code changes
- Nova komponenta od Figme do Storybooka u jednom sessionu
- Tri surface-a iz jednog izvora tokena
- 📸 **screenshot**: pre/posle poređenje (hardcoded codebase vs token-driven)

## 11. Šta bih drugačije na većem timu
- Component-level tokeni na 30+ komponenti
- Contribution guidelines, formalno vlasništvo
- Visual regression testing workflow
- (bez vizuala, kratka sekcija)

## 12. Šta sam naučio
- Tokens first, components second
- Build what you use
- Tri surface-a natjerali bolju arhitekturu
- Workflow matters more than components
- CLAUDE.md kao multiplier
- (bez vizuala, kratka sekcija)

---

## Vizuali ukupno

| Tip | Broj | Gde |
|-----|------|-----|
| 📸 screenshot | 12 | sekcije 1-10 |
| 📐 dijagram | 6 | sekcija 2 (tri surface-a), 4 (pipeline), 5 (token flow), 7 (compound pattern), 8 (CSS distribucija), 9 (build-component faze) |
| 🎬 gif | 1 | sekcija 5 (dark mode toggle) |
| 🎬 video (kratak) | 2 | sekcija 6 (token change), sekcija 9 (AI skill) |
| **Ukupno** | **21** | |
