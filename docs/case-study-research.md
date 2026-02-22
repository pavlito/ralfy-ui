# Case Study Research

Research on how to structure a design system case study for a developer/engineering portfolio.

## Design Case Study (UX-focused)

Sources:
- [Adham Dannaway — Figma Design System](https://www.adhamdannaway.com/portfolio/figma-design-system)
- [Learn UI — Great UX/UI Case Study](https://www.learnui.design/blog/great-ux-ui-portfolio-case-study.html)
- [IxDF — How to Write UX Case Studies](https://www.interaction-design.org/literature/article/how-to-write-great-case-studies-for-your-ux-design-portfolio)
- [UX Planet — Case Study Template](https://uxplanet.org/ux-portfolio-case-study-template-plus-examples-from-successful-hires-86d5b0faa2d6)

### Structure
1. Hero / Rezultat prvo
2. Kontekst (proizvod, role)
3. Problem (specifičan bol)
4. Pristup i odluke (zašto, ne šta)
5. Rešenje sa deep dive-ovima
6. Rezultat / Uticaj
7. Šta bih drugačije

### Pravila
- 800-1500 reči
- 60-80% tekst, 20-40% vizuali
- Vizual na svakih 80-180 reči
- Pokaži odluke, ne proces
- Konverzacijski ton, prvo lice
- Annotirani screenshotovi > code blokovi

### Primer: Adham Dannaway
- Kratke sekcije (80-180 reči svaka)
- 24+ slika
- Svaki koncept objašnjen pa odmah vizual
- Before/after poređenja
- Konverzacijski ton, prvo lice

---

## Developer Case Study (engineering-focused)

Sources:
- [Peerlist — How to Write a Case Study as a Developer](https://blog.peerlist.io/p/how-to-write-a-case-study-as-a-developer)
- [Nucamp — Writing Project Case Studies](https://www.nucamp.co/blog/coding-bootcamp-job-hunting-writing-project-case-studies-telling-the-story-of-your-code)
- [Josh Comeau — Building an Effective Dev Portfolio](https://www.joshwcomeau.com/effective-portfolio/)
- [Tobias van Schneider — How to Write Case Studies](https://vanschneider.com/blog/portfolio-tips/write-project-case-studies-portfolio/)

### 7-Part Framework (Peerlist)
1. Project Selection — demonstrira tehničku ekspertizu
2. Problem Definition — kontekst i ciljevi
3. Approach Explanation — strategija, alati, tehnologije + **zašto** baš ti
4. Process Detail — step-by-step implementacija, izazovi, kako su rešeni
5. Outcome Discussion — rezultati sa metrikama
6. Future Improvements — šta bih drugačije
7. Conclusion — lekcije i šira primena

### Razlika od dizajn case studija
Developer case study naglašava **tehničke odluke i reasoning**:
- Izbor tech stack-a i zašto
- Objašnjenje koda i pristupa rešavanju problema
- Odluke o arhitekturi sa trade-offovima
- Performanse i integracija
- Deployment odluke

### Ključne preporuke
- Code walkthrough sa objašnjenjima korak po korak
- Problemi na koje si naišao i kako si ih rešio
- Konkretni primeri koji demonstriraju odluke
- Objasni lične biase koji su uticali na odluke
- Piši pristupačno, ne samo za tehničku publiku
- Vizuali koji objašnjavaju tehničke koncepte

### Storytelling pristup (Nucamp)
- Transformiši tehničku dokumentaciju u narativ
- Lična motivacija i izazovi tokom developmenta
- Neuspesi preformulirani kao prilike za učenje
- Breakthrough momenti koji pokazuju rešavanje problema
- 78% čitalaca prioritizuje razumevanje ljudskog uticaja tehnologije

### Josh Comeau savet
- 2-5 projekata max, highlight reel
- Budi "tour guide" kroz tehničke odluke
- Objasni **zašto** rešenja matter, ne samo šta si napravio
- Razlikuje te od template portfolija

### Tobias van Schneider savet
- Ljudi skeniraju, ne čitaju. Ako čitaju samo captions, i dalje treba da razumeju projekat
- Ceo case study treba da se pročita za 3 minuta
- Scannable: headlines, kratki paragrafi, captions
- Ispričaj priču: borbe, izazovi, nagrađujući ishod

---

## Zaključak: Šta naš case study treba da bude

Naš case study je za **Kit poziciju (UX Engineer)**, pa treba da kombinuje oba pristupa:

### Struktura
1. **Hero** — screenshot Storybooka + jedna rečenica šta je ovo
2. **Kontekst** — Ralfy proizvod, solo developer, zašto design system
3. **Problem** — 12 sivih, 3 surface-a, copy-paste između codebases
4. **Tehničke odluke** (srž case studija):
   - Token arhitektura: zašto 2 tiera, zašto OKLch, zašto nema alias layer
   - Figma pipeline: zašto Tokens Studio, kako mapiranje radi
   - Component patterns: zašto cva, zašto compound, zašto Radix
   - CSS distribution: problem sa Tailwind v4 + node_modules, kako rešeno
   - AI workflow: CLAUDE.md, custom skills, zašto ovo matters
5. **Rezultat** — šta se promenilo, uticaj na development velocity
6. **Šta bih drugačije** — skaliranje, component-level tokens
7. **Lekcije** — kratko, 3-5 bullet points

### Ton i format
- Konverzacijski, prvo lice
- Kratke sekcije (max 150 reči)
- Vizual posle svake sekcije (screenshot, gif, annotiran dijagram)
- Code blokovi samo gde je neophodno (max 5-10 linija)
- Čita se za 3-5 minuta
- 1000-1500 reči teksta + vizuali
