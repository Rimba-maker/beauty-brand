# Beauty Brand Landing — Implementation Plan

**Companion to:** `2026-05-08-beauty-brand-design.md`
**Date:** 2026-05-08
**Estimated effort:** ~90 min build (no async waits except `pnpm install`)

## Sequencing Overview

```
Phase 1: Scaffold        → ~10 min (Astro init + Tailwind v4 wiring)
Phase 2: Token Port      → ~10 min (Clay tokens → @theme directive)
Phase 3: Content + Data  → ~10 min (content.ts with Unsplash URLs pre-curated)
Phase 4: Build Components → ~45 min (9 components, ~5 min each)
Phase 5: Compose + Polish → ~15 min (assemble index.astro, responsive QA)
```

Each phase is independently committable. Phase 4 components are mostly parallel (no inter-dependencies beyond shared tokens).

---

## Phase 1 — Scaffold (~10 min)

### Steps

1. `cd "D:/Project Ngoding/beauty-brand"` (already exists with `docs/` folder)
2. `pnpm create astro@latest .` — choose: empty project, TypeScript strict, no integrations yet
3. `pnpm add -D @astrojs/tailwind tailwindcss@next` (Tailwind v4 alpha)
4. Update `astro.config.mjs` — add `@astrojs/tailwind` integration with `applyBaseStyles: false`
5. Copy `D:/Project Ngoding/awesome-design-md/design-md/clay/DESIGN.md` → `D:/Project Ngoding/beauty-brand/DESIGN.md` (verbatim, audit trail)
6. Create `CLAUDE.md` at root with: project intent, decisions log link to spec, "do not modify DESIGN.md" rule, off-spec deviations list (CSS blobs, emoji)
7. Verify `pnpm dev` starts at `localhost:4321` with default Astro page

### Critical files
- `astro.config.mjs`
- `package.json`
- `tsconfig.json` (strict)
- `DESIGN.md` (read-only after copy)
- `CLAUDE.md`

### Done when
- `pnpm dev` runs clean
- DESIGN.md copy verified byte-for-byte vs source

---

## Phase 2 — Token Port (~10 min)

### Steps

1. Create `src/styles/global.css`
2. Add `@import "tailwindcss";` at top
3. Add `@theme { ... }` block with full Clay token port:
   - All 32 colors → `--color-{name}`
   - All 14 typography tokens → custom utilities (since Tailwind v4 doesn't natively support typography presets, use `@layer components` for class definitions like `.type-display-xl`)
   - 8 spacing tokens → `--spacing-{name}` (Tailwind v4 supports this via `@theme`)
   - 7 radius tokens → `--radius-{name}`
4. Add Google Fonts `@import` for `Inter:wght@400;500;600` at top of file
5. Set `body { font-family: 'Inter', system-ui, sans-serif; background-color: var(--color-canvas); color: var(--color-ink); }`
6. Reference `src/pages/index.astro` to import `global.css`
7. Sanity check: dev server shows cream `#fffaf0` background

### Token mapping spec (from Clay)

```css
@theme {
  /* Colors */
  --color-primary: #0a0a0a;
  --color-primary-active: #1f1f1f;
  --color-primary-disabled: #e5e5e5;
  --color-ink: #0a0a0a;
  --color-body: #3a3a3a;
  --color-body-strong: #1a1a1a;
  --color-muted: #6a6a6a;
  --color-muted-soft: #9a9a9a;
  --color-hairline: #e5e5e5;
  --color-hairline-soft: #f0f0f0;
  --color-canvas: #fffaf0;
  --color-surface-soft: #faf5e8;
  --color-surface-card: #f5f0e0;
  --color-surface-strong: #ebe6d6;
  --color-surface-dark: #0a1a1a;
  --color-surface-dark-elevated: #1a2a2a;
  --color-on-primary: #ffffff;
  --color-on-dark: #ffffff;
  --color-on-dark-soft: #a0a0a0;
  --color-brand-pink: #ff4d8b;
  --color-brand-teal: #1a3a3a;
  --color-brand-lavender: #b8a4ed;
  --color-brand-peach: #ffb084;
  --color-brand-ochre: #e8b94a;
  --color-brand-mint: #a4d4c5;
  --color-brand-coral: #ff6b5a;
  /* Spacing */
  --spacing-section: 96px;
  --spacing-xxl: 48px;
  --spacing-xl: 32px;
  --spacing-lg: 24px;
  --spacing-md: 16px;
  --spacing-sm: 12px;
  --spacing-xs: 8px;
  --spacing-xxs: 4px;
  /* Radius */
  --radius-pill: 9999px;
  --radius-xl: 24px;
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
  --radius-xs: 6px;
}
```

Typography tokens go in `@layer components` as `.type-display-xl` etc. with size + weight + line-height + letter-spacing per Clay table.

### Done when
- All Clay tokens accessible via Tailwind utility classes (`bg-canvas`, `text-ink`, `rounded-xl`, etc.)
- Dev server background = cream
- `<h1 class="type-display-xl">Test</h1>` renders Inter 500 with -2.5px letter-spacing

---

## Phase 3 — Content + Data (~10 min)

### Steps

1. Create `src/data/content.ts` with typed exports:

```ts
export type CardVariant = 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream';

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  imageUrl: string;
  cardVariant: CardVariant;
};

export type Testimonial = {
  name: string;
  role: string;
  avatarUrl: string;
  quote: string;
};

export type Ingredient = {
  emoji: string;
  name: string;
  description: string;
  cardVariant: 'lavender' | 'peach' | 'ochre';
};

export const HERO = { ... };
export const PRODUCTS: Product[] = [ ... 6 items ];
export const FEATURED_PRODUCT = PRODUCTS[0];  // Glow Drops Serum
export const TESTIMONIALS: Testimonial[] = [ ... 4 items ];
export const INGREDIENTS: Ingredient[] = [ ... 3 items ];
export const BRAND_STORY = { headline, paragraphs: [...] };
export const FOOTER_LINKS = { columns: [ ... 4 column groups ] };
```

2. Pre-curate Unsplash URLs (each photo selected for cream-warm tone, dewy aesthetic):
   - 1 hero photo (millennial woman dewy makeup)
   - 1 featured product photo (serum bottle)
   - 6 carousel product photos (lipstick, blush, serum, gloss, mascara, mist)
   - 4 testimonial avatars

URL pattern: `https://images.unsplash.com/photo-{ID}?w=800&auto=format&fit=crop&q=80`

I will pick specific photo IDs during implementation by browsing Unsplash search for: "dewy makeup model", "minimal cosmetic flat lay cream", "young woman portrait soft lighting".

### Done when
- `content.ts` fully typed, no `any`
- All URLs return 200 (quick spot-check)
- 6 products have all 6 distinct cardVariants assigned in rotation order

---

## Phase 4 — Build Components (~45 min)

Build order matters slightly because shared CSS classes propagate. Recommend:

1. **TopNav** (~3 min) — simplest, validates nav-link type + button-primary
2. **Footer** (~5 min) — validates body-sm muted, surface-soft, 4-col grid
3. **Hero** (~7 min) — h1 display-xl is biggest typography test
4. **ProductCarousel** (~7 min) — exercises 6 feature-card variants in rotation
5. **FeaturedProduct** (~5 min) — single peach card, 2-col internal
6. **BrandStory** (~3 min) — pure typography
7. **Testimonials** (~5 min) — 4-up cream cards
8. **IngredientSpotlight** (~5 min) — 3-up small cards (lavender/peach/ochre)
9. **EmailCapture** (~5 min) — surface-soft band with input + button

### Per-component pattern

Each `.astro` file:
- Imports its data slice from `~/data/content.ts`
- Renders the section with semantic HTML (`<header>`, `<section>`, `<article>` where appropriate)
- Uses ONLY tokens from `@theme` (no inline hex, no custom radii)
- Has explicit `loading="lazy"` + `width`/`height` on all `<img>`
- Mobile-first responsive via Tailwind breakpoints

### Critical Clay rules to enforce per component

- **ProductCarousel:** `cardVariant` rotation must be: pink, teal, lavender, peach, ochre, cream — in that exact order, no swaps
- **All cards:** rounded `xl` (24px) for feature-cards, `lg` (16px) for testimonial/product-mockup, `md` (12px) for buttons/inputs
- **Display headings:** weight 500 max — never set `font-weight: 700` on headings
- **Buttons:** height 44px, padding 12px×20px, rounded `md`
- **No custom hover states** — Clay spec line 500 explicitly prohibits

### Done when
- All 9 components render in isolation (test by importing one at a time into index.astro)
- No console errors
- TypeScript strict passes (`pnpm astro check`)

---

## Phase 5 — Compose + Polish (~15 min)

### Steps

1. Update `src/pages/index.astro` to import + render all 9 components in order:
   ```astro
   <TopNav />
   <Hero />
   <ProductCarousel />
   <FeaturedProduct />
   <BrandStory />
   <Testimonials />
   <IngredientSpotlight />
   <EmailCapture />
   <Footer />
   ```

2. Verify section spacing — each section should have `py-section` (96px) padding-block

3. Mobile QA at 375px, 768px, 1024px, 1440px:
   - Hero stacks vertical
   - Carousel scrolls horizontally without overflow on body
   - 4-up testimonials → 2-up → 1-up
   - Footer columns collapse 4 → 2 → 1

4. Visual audit checklist:
   - [ ] No element uses non-token color
   - [ ] All headings ≤ weight 500
   - [ ] Footer is cream (NOT dark)
   - [ ] Carousel color rotation correct + no adjacent repeats
   - [ ] Page reads as millennial beauty (subjective gut check)

5. Update `CLAUDE.md` decisions log with any deviations encountered during build

### Done when
- Full page renders cleanly at all 4 breakpoints
- Audit checklist 100% passed
- User confirms visual fidelity matches expectation

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Tailwind v4 alpha API changes mid-build | Pin exact version in `package.json`, document Tailwind version in CLAUDE.md |
| Inter 500 + -0.05em looks too techy, not beauty enough | Logged as test data — that's the result. Don't swap font mid-build (would invalidate test). |
| Unsplash photos look incongruent with cream warmth | Pre-screen all 12 photos before component build; reject any cool-toned ones |
| Mobile carousel scroll-x leaks horizontal scroll on body | Wrap carousel in `overflow-hidden` parent; use `overflow-x-auto` only on inner rail |
| Clay's "no hover state" rule conflicts with web UX expectation | Honor the rule. Document deviation if user explicitly asks for hover states post-build. |

---

## Validation Strategy

Since this is a **visual fidelity test** (not functional), validation is:

1. **Manual visual review** at 4 breakpoints
2. **Token compliance audit** — grep `src/` for any hex codes outside `global.css` (should return 0)
3. **Clay rule audit** — manual checklist (footer cream, color rotation, weight cap)
4. **Subjective genre fit** — user gut-check: "does this feel like a beauty brand?"

**No automated tests.** No Playwright, no Vitest. Out of scope per spec.

---

## Approval Gate

Before starting Phase 1, confirm with user:
- [ ] Plan approved as-is
- [ ] OK to start Phase 1 (scaffold + `pnpm install`)
- [ ] OK to commit incremental progress per phase, OR build everything then single commit
