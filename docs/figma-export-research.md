# Figma Export Ecosystem — Deep Research

> Istraženo: Februar 2026

## 1. Figma REST API

### Šta dobijamo iz API-ja

Za svaki node (FRAME, COMPONENT, COMPONENT_SET, INSTANCE, TEXT) vraća:

**Layout & Auto-Layout:**
- `layoutMode` (NONE/HORIZONTAL/VERTICAL/GRID)
- `layoutSizingHorizontal`/`layoutSizingVertical` (FIXED/HUG/FILL)
- `paddingLeft`/`paddingRight`/`paddingTop`/`paddingBottom`
- `itemSpacing`, `counterAxisSpacing`, `layoutWrap`
- `primaryAxisAlignItems` (MIN/CENTER/MAX/SPACE_BETWEEN)
- `counterAxisAlignItems` (MIN/CENTER/MAX/BASELINE)

**Vizuelni propertyiji:**
- `fills` i `strokes` (nizovi Paint objekata)
- `cornerRadius` i `rectangleCornerRadii` (individual po uglu)
- `effects` (DropShadow, InnerShadow, Blur...)
- `opacity`, `blendMode`, `clipsContent`

**Component properties:**
- `componentPropertyDefinitions` — mapa svih propertyija sa tipovima (VARIANT, BOOLEAN, TEXT, INSTANCE_SWAP)

**Tipografija (TEXT nodovi):**
- Font family, weight, size, line height, letter spacing, text alignment

### Variables REST API

- Endpointi: `GET /v1/files/:key/variables/local` i `GET /v1/files/:key/variables/published`
- **OGRANIČENJE**: Dostupno SAMO na Enterprise planu ($90/user/mesečno)
- Workaround: Plugin API čita varijable na svim planovima

### REST API vs Plugin API

| Aspekt | REST API | Plugin API |
|--------|----------|------------|
| Pristup fajlovima | Bilo koji fajl | Samo trenutno otvoren |
| Izvršavanje | Bilo kad, bez korisnika | Mora korisnik da pokrene |
| Write pristup | Ograničen | Može skoro sve |
| Variables | Samo Enterprise | Svi planovi |
| Multi-file | Da | Ne |

---

## 2. React Export Plugini

### Anima + Frontier (VS Code Extension)

- **Kako radi**: Figma plugin + VS Code extension (Frontier). Frontier skenira tvoj codebase i generiše kod koristeći TVOJE komponente.
- **Kvalitet**: Visok. Stateful, interaktivne komponente. Responsiveness na osnovu Auto Layout-a.
- **Output**: React, Vue, HTML/CSS, Tailwind, shadcn, TypeScript, Next.js, MUI
- **Cena**: Starter $20/seat/mes (100 chat + 50 code gen), Pro $40/seat/mes
- **Verdict**: Jedan od najboljih. Frontier razume tvoj codebase — značajna prednost. 1.5M+ instalacija.

### Locofy

- **Kako radi**: AI sa "Large Design Models" (LDMs) treniranim na milionima UI dizajna.
- **Kvalitet**: HTML dobar, CSS može biti glomazan. Modularne komponente ali zahteva doradu.
- **Custom komponente**: Da — import iz GitHub/Storybook, automatsko mapiranje.
- **Output**: React, React Native, Next.js, Vue, Angular, Flutter, HTML/CSS, Tailwind
- **Cena**: Pay-as-you-go $0.40/token, Starter $33.3/mes, Pro $99.9/mes
- **Verdict**: Solidan accelerator ali token-based pricing nepredvidiv.

### Builder.io Visual Copilot

- **Kako radi**: Custom LLM generiše kod. "Fast" (free) i "Quality" (paid) modovi. AI component mapping.
- **Kvalitet**: ~80% puta. Čist, production-ready kod.
- **Custom komponente**: Da — AI semantičko prepoznavanje.
- **Output**: React, Angular, Svelte, Vue, Qwik, HTML + CSS/Tailwind
- **Cena**: Free (do 10 usera), Pro ~$24-49/user/mes
- **Verdict**: Jak ako treba i CMS. Dual pricing može da bude skup.

### TeleportHQ

- **Kvalitet**: Ispod proseka. NE podržava maske, blur, rotacije, radial gradiente, shadow tokene, component overrides/varijante.
- **Verdict**: Najslabiji od glavnih opcija. Ne preporučuje se.

### Quest AI

- **Kako radi**: AI konverzija sa MUI osnovom.
- **Kvalitet**: Solidan ali MUI-centrisan.
- **Verdict**: Nije za Tailwind design sisteme.

### Rangiranje

| Plugin | Kvalitet koda | Koristi tvoje komponente? | Cena |
|--------|-------------|--------------------------|------|
| **Anima Frontier** | Odličan | DA | $20-40/seat/mes |
| **Builder.io** | Dobar (~80%) | DA (AI mapiranje) | $24-49/user/mes |
| **Locofy** | Solidan | DA (GitHub import) | $33-100/mes + tokeni |
| **Quest AI** | Dobar | Ne (samo MUI) | Free tier |
| **TeleportHQ** | Ispod proseka | Ne | Free tier |

---

## 3. Design Token Export

### Tokens Studio (koristimo)

- Dominantan plugin za token management.
- Pun W3C DTCG format support (`$value`, `$type` prefiksi).
- 23+ tipova tokena (više od Figma native varijabli).
- GitHub/GitLab sync za version control.
- Radi sa `@tokens-studio/sd-transforms` za Style Dictionary integraciju.

### W3C DTCG Token Format

- **Status**: Prva stabilna verzija (2025.10) zvanično objavljena — ovo JE budući standard.
- Vendor-neutral JSON format.
- Podržavaju: Style Dictionary v4, Tokens Studio, Terrazzo, Figma, Penpot, Sketch, Framer, Supernova...

### Figma Native Variable Export

- **Najavljeno na Schema 2025** — dolazi novembar 2026.
- Export po modu → ZIP sa JSON fajlom po modu.
- Usklađeno sa DTCG 1.0 specifikacijom.
- Kad izađe, može smanjiti zavisnost od Tokens Studio za osnovni export. Ali Tokens Studio ostaje koristan za napredne feature-e (reference, kompozicije, math).

### Token Transformation Alati

| Alat | Status | Napomena |
|------|--------|---------|
| **Style Dictionary** (Amazon UX) | De facto standard, koristimo ga | v4 ima DTCG support, 50+ platformi |
| **Terrazzo** | Noviji, DTCG-native | Dobra alternativa za nove projekte |
| **Theo** (Salesforce) | Zreo ali manje aktivan | Enterprise-proven |

---

## 4. Figma Code Connect

### Šta je

Bridge između codebase-a i Figma Dev Mode-a. Umesto auto-generisanog CSS-a, developeri vide TVOJ component kod.

### Kako radi

Piše se `.figma.tsx` fajl:

```tsx
// Button.figma.tsx
import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://figma.com/file/xxx/node-id', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
    }),
    label: figma.string('Label'),
  },
  example: ({ variant, label }) => (
    <Button variant={variant}>{label}</Button>
  ),
})
```

### Ograničenja

- Zahteva **Organization** ($55/user/mes) ili **Enterprise** ($90/user/mes) plan
- `.figma.tsx` fajlovi se moraju ažurirati kad se komponente menjaju
- Ne generiše kod — samo prikazuje snippete u Dev Mode-u

### Alternativa

MCP server ima `add_code_connect_map` koji radi slično — besplatno.

---

## 5. Figma MCP Server (naš pristup)

### Dostupni alati (13 ukupno)

| Alat | Namena |
|------|--------|
| `get_design_context` | **Glavni** — React + Tailwind kod, screenshot, hintovi |
| `get_metadata` | XML hijerarhija lejera (ID-jevi, tipovi, pozicije) |
| `get_screenshot` | Screenshot bilo kog nodea |
| `get_variable_defs` | Varijable i stilovi (boje, spacing, tipografija) |
| `get_code_connect_map` | Figma node → code component mapiranja |
| `add_code_connect_map` | Dodavanje novih mapiranja |
| `get_code_connect_suggestions` | AI-sugestovana mapiranja |
| `create_design_system_rules` | Rule fajlovi za design system kontekst |
| `generate_figma_design` | Slanje UI-a nazad u Figmu (Code to Canvas) |
| `generate_diagram` | Mermaid → FigJam |
| `get_figjam` | FigJam sadržaj kao XML |

### MCP vs REST API

| Aspekt | Figma MCP | REST API |
|--------|-----------|----------|
| Ciljna publika | AI agenti/LLM-ovi | Tradicionalne aplikacije |
| Format | Optimizovan za AI | Sirov JSON |
| Variables | Radi bez Enterprise plana | Samo Enterprise |
| Bidirekcioni | Da (Code to Canvas) | Ograničen write |
| Real-time | Radi sa live selekcijom | Point-in-time snapshot |

### Prednosti za ralfy-ui

1. `get_variable_defs` — čita varijable **bez Enterprise plana**
2. `get_design_context` — strukturirani podaci za code generation
3. `create_design_system_rules` — uči AI naše konvencije
4. **Code to Canvas** (feb 2026) — šalje UI nazad u Figmu

---

## 6. Ostali pristupi

### Storybook + Chromatic + Figma (Storybook Connect)

- Linkuje Storybook storyije sa Figma komponentama.
- Side-by-side poređenje implementacije vs dizajna.
- Visual regression testing.
- **Za**: hvatanje vizuelnog drifta, NE za generisanje koda.

### Supernova

- Full design system documentation platforma.
- Importuje Figma varijable, teme, komponente.
- Eksportuje tokene u Tailwind, CSS variables.
- Ima svoj MCP server.
- **Cena**: ~$35+/seat/mesečno.
- **Za**: Mid-to-large timove sa 500+ tokena.

### Specify

- Design token distribution platforma.
- Konsoliduje token izvore u jedan source of truth.
- **Za**: Timove koji koriste Figma Variables I Tokens Studio istovremeno.

### Code to Canvas (Figma + Anthropic, Feb 2026)

- **NOVO**: Slanje Claude Code UI-a direktno u Figmu kao editabilne lejere.
- Bidirekcioni workflow: Figma → Claude Code → Figma.
- Koristi MCP server.

---

## 7. Zaključak i preporuke za ralfy-ui

### Trenutni setup je optimalan

1. **Tokens Studio → Style Dictionary → CSS** — industrijski standard, DTCG-aligned ✅
2. **Figma MCP + Claude Code** — najmoderniji pristup ✅
3. **Direktno mapiranje tokena** (bez alias sloja) — čist pristup ✅

### Šta vredi probati

1. **`create_design_system_rules`** u MCP-u — da AI bolje zna naš stack (besplatno, već dostupno)
2. **`add_code_connect_map`** u MCP-u — mapiranje komponenti bez plaćanja Code Connect plana
3. **Code to Canvas** — bidirekcioni workflow, već dostupno
4. **Anima Frontier** ($20/mes) — ako treba VS Code automatizacija

### Šta NE treba

- **Code Connect** — zahteva Organization plan ($55/user/mes), preskupo za mali tim
- **Supernova/Specify** — preveliko za naš scope
- **TeleportHQ/Quest** — loš kvalitet koda
- **Custom REST API skripta** — previše posla, MCP radi isto
- **Locofy** — token-based pricing nepredvidiv

### Prioriteti

1. Nastavi sa MCP + Tokens Studio + Style Dictionary
2. Dodaj design system rules u MCP
3. Testiraj Code to Canvas
4. Razmotri Anima Frontier kad bude potreba za više automatizacije
