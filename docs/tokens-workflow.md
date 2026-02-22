# Tokens Workflow: Figma → Code

Kratke instrukcije za sinhronizaciju design tokena iz Figme u kod.

## Pipeline

```
Figma (source of truth)
  ↓
Tokens Studio plugin (exportuje W3C DTCG JSON)
  ↓
tokens.json (root projekta)
  ↓
pnpm tokens:build (Style Dictionary 5)
  ↓
src/tokens/generated/
  ├── primitives.css   (boje: zinc, red, emerald, primary...)
  ├── light.css        (semantic tokeni, :root)
  └── dark.css         (semantic tokeni, .dark)
  ↓
src/tokens/tokens.css  (importuje generated + @theme inline)
```

## Korak 1: Priprema tokena u Figmi (Tokens Studio plugin)

### Jednokratni setup

1. Figma → Plugins → pretraziti "Tokens Studio" → Install
2. Otvoriti plugin → Settings → Sync Provider → **GitHub**
   - Repository: `ralfy-ui`
   - File path: `tokens.json`
   - Branch: `master`

### Organizacija token setova

Plugin ima 3 token seta (vidljivi kao tabovi):

```
Primitives/Mode 1     ← sirove boje (ne dirati osim za rebrand)
Tokens/Light          ← semantic tokeni za light mode
Tokens/Dark           ← semantic tokeni za dark mode
```

### Primitives/Mode 1 — sirove boje

Paleta boja sa 11 stepeni (50–950). Ne koriste se direktno u komponentama.

```
Zinc:    50, 100, 200, ..., 950    (neutralne sive)
Red:     50, 100, 200, ..., 950    (destructive/error)
Emerald: 50, 100, 200, ..., 950    (success)
Yellow:  50, 100, 200, ..., 950    (warning)
Primary: 50, 100, 200, ..., 950    (brand boja — trenutno zinc)
White, Black                        (beli, crni)
+ Slate, Gray, Stone, Blue, Indigo, Violet, Purple, itd.
```

Svaki token ima `$type: "color"` i `$value` kao hex (npr. `#fafafa`).

### Tokens/Light i Tokens/Dark — semantic tokeni

Ovi tokeni **referenciraju primitive** (ne hardkoduju boje). Organizovani su po kategorijama:

**Background** — pozadine povrsina i komponenti:
```
Background/
  ├── default            → {White}              pozadina stranice
  ├── card               → {White}              pozadina kartice
  ├── popover            → {White}              pozadina popovera
  ├── input              → {Zinc.200}           pozadina inputa
  ├── muted              → {Zinc.100}           prigusena pozadina
  ├── accent             → {Zinc.100}           akcentovana pozadina
  ├── Primary/
  │   ├── default        → {Primary.900}        primary dugme
  │   ├── default-hover  → {Primary.900} 80%    primary hover
  │   ├── light          → {Primary.50}         primary light varijanta
  │   └── light-hover    → {Primary.100}        primary light hover
  ├── Secondary/default  → {Zinc.100}           secondary dugme
  ├── Destructive/
  │   ├── default        → {Red.600}            destructive dugme
  │   ├── default-hover  → {Red.600} 80%        destructive hover
  │   ├── light          → {Red.600} 10%        destructive light
  │   └── light-hover    → {Red.600} 12%        destructive light hover
  ├── Success/...        → {Emerald.600/700}    success varijante
  ├── Warning/...        → {Yellow.500/600}     warning varijante
  └── Disabled/default   → {Neutral.400}        disabled stanje
```

**Foreground** — boje teksta:
```
Foreground/
  ├── default            → {Zinc.950}           glavni tekst
  ├── muted              → {Zinc.500}           sekundarni tekst
  ├── accent             → {Zinc.900}           akcentovani tekst
  ├── Primary/default    → {Primary.50}         tekst na primary bg
  ├── Secondary/default  → {Zinc.700}           secondary tekst
  ├── Destructive/default→ {Red.500}            crveni error tekst
  ├── Success/default    → {Emerald.700}        zeleni success tekst
  ├── Warning/default    → {Yellow.700}         zuti warning tekst
  └── Disabled/default   → {Zinc.400}           disabled tekst
```

**Border** — boje ivica:
```
Border/
  ├── default            → {Zinc.200}           standardna ivica
  ├── Primary/default    → {Zinc.400}           focus ring
  ├── Destructive/default→ {Red.500}            error ivica
  ├── Success/default    → {Emerald.700}        success ivica
  └── Warning/default    → {Yellow.600}         warning ivica
```

**Icon** — boje ikonica:
```
Icon/
  ├── default            → {Zinc.950}           standardna ikonica
  ├── muted              → {Zinc.500}           prigusena ikonica
  ├── Primary/default    → {Primary.50}         primary ikonica
  ├── Destructive/default→ {Red.500}            error ikonica
  ├── Success/default    → {Emerald.700}        success ikonica
  └── ...
```

**Spacing, Padding, Radius** — dimenzije (iste u Light i Dark):
```
spacing-xs: 4     padding-xs: 12     radius-sm: 4
spacing-sm: 8     padding-sm: 16     radius-md: 8
spacing-md: 12    padding-md: 20     radius-lg: 12
spacing-lg: 16    padding-lg: 24     radius-xl: 16
```

### Kako dodati novi token

1. Otvoriti Tokens Studio plugin u Figmi
2. Izabrati set (`Tokens/Light`)
3. Kliknuti `+` u odgovarajucoj kategoriji (npr. Background)
4. Uneti ime (npr. `info/default`) i vrednost kao referencu (npr. `{Blue.500}`)
5. Ponoviti za `Tokens/Dark` sa dark mode vrednoscu (npr. `{Blue.400}`)
6. Push to GitHub

Nakon pusha, u kodu:
```bash
pnpm tokens:build
```
Pa dodati mapping u `src/tokens/tokens.css` → `@theme inline` blok:
```css
--color-background-info-default: var(--background-info-default);
```

### Kako promeniti postojeci token

1. U Tokens Studio, naci token (npr. `Background/Primary/default`)
2. Promeniti referencu (npr. `{Primary.900}` → `{Indigo.600}`)
3. Promeniti i u `Tokens/Dark` setu
4. Push to GitHub → `pnpm tokens:build`

### Export

1. Proveriti da su sva 3 seta aktivna (checkmark pored imena)
2. Kliknuti **Push** (dole desno)
3. Uneti commit poruku
4. Plugin pushuje `tokens.json` na GitHub

## Korak 2: Build tokena

```bash
pnpm tokens:build
```

Ovo pokrece `sd.config.mjs` koji:
- Cita `tokens.json`
- Konvertuje boje u OKLCh format
- Generise 3 CSS fajla u `src/tokens/generated/`

## Korak 3: Provera

```bash
pnpm build    # CSS kompajlira bez gresaka
```

Pogledaj diff u `src/tokens/generated/` da vidis sta se promenilo.

## Struktura tokena

### Primitives (Tier 1)
Sirove boje, ne koriste se direktno u komponentama:
```
--zinc-50, --zinc-100, ..., --zinc-950
--red-50, ..., --red-950
--primary-50, ..., --primary-950
--white, --black
```

### Semantic (Tier 2)
Referenciraju primitive, koriste se u komponentama:

| Kategorija | Primer tokena | Tailwind klasa |
|-----------|---------------|----------------|
| Background | `--background-primary-default` | `bg-background-primary-default` |
| Foreground | `--foreground-default` | `text-foreground-default` |
| Border | `--border-default` | `border-border-default` |
| Icon | `--icon-primary-default` | `text-icon-primary-default` |

### Spacing & Radius
```
--spacing-xs: 4px    --radius-sm: 4px
--spacing-sm: 8px    --radius-md: 8px
--spacing-md: 12px   --radius-lg: 12px
--spacing-lg: 16px   --radius-xl: 16px
```

## Fajlovi

| Fajl | Edituje se? | Opis |
|------|-------------|------|
| `tokens.json` | Ne (generise Tokens Studio) | Sirovi tokeni iz Figme |
| `sd.config.mjs` | Retko | Style Dictionary konfiguracija |
| `src/tokens/generated/*.css` | Nikad | Auto-generisano, ne editovati |
| `src/tokens/tokens.css` | Da | Importi + @theme inline + base styles |

## Troubleshooting

- **Tailwind ne vidi nove tokene** → Dodaj mapping u `@theme inline` blok u `tokens.css`, restartuj dev server
- **Style Dictionary greska** → Proveri da `tokens.json` koristi `$value`/`$type` (W3C DTCG format)
- **Boje ne izgledaju tacno** → `colorjs.io` konvertuje hex→OKLCh, male razlike su normalne
