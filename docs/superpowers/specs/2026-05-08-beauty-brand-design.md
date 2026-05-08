# Beauty Brand Landing Page — Design Spec

**Date:** 2026-05-08
**Project folder:** `D:/Project Ngoding/beauty-brand/`
**Stack:** Astro 5 + Tailwind v4 (CSS-first `@theme`)
**Test goal:** Measure how strongly a non-beauty `DESIGN.md` (Clay) shapes UI output when applied to a beauty brand landing page.

## 1. Test Hypothesis

The `awesome-design-md` repo claims that any `DESIGN.md` dropped into a project lets an AI agent generate "pixel-perfect UI that actually matches" the source brand. Beauty is not a category in the repo (no Glossier / Sephora / Fenty equivalent). The closest analogue picked here is **Clay** — a B2B GTM-data SaaS brand whose visual DNA (cream canvas, saturated 6-color cards, organic shapes, rounded display type) overlaps with the millennial-beauty aesthetic of brands like Glossier and Rare Beauty.

The test passes if the resulting page:
- Reads visually as a **millennial beauty brand** to a casual viewer
- Stays faithful to Clay's **token system** (no off-spec colors, fonts, radii, spacing)
- Exercises a representative cross-section of Clay components

The test fails if the result reads as B2B SaaS, or if matching the spec required extensive custom work outside the DESIGN.md tokens.

## 2. Brand Concept

- **Brand name (fictional):** DEWY CO.
- **Positioning:** Millennial / Gen-Z botanical-powered makeup, cruelty-free, vegan
- **Tagline:** *"Dewy skin, made fun."*
- **Sub-tagline:** *"Botanical-powered makeup that loves your skin back."*
- **Voice:** Friendly, playful, ingredient-forward, lightly editorial

Product line (fictional, 6 hero SKUs):
1. **Glow Drops Serum** — luminous skincare hybrid
2. **Petal Lip Tint** — buildable lip stain
3. **Cloud Cushion Blush** — whipped cream blush
4. **Halo Highlight Stick** — multi-use illuminator
5. **Velvet Brow Gel** — flexible-hold brow setter
6. **Dewy Mist Setting Spray** — botanical hydrating set

## 3. Architecture

### File Structure

```
beauty-brand/
├── astro.config.mjs
├── package.json              # Astro 5 + @astrojs/tailwind + Tailwind v4
├── tsconfig.json
├── DESIGN.md                 # verbatim copy of awesome-design-md/design-md/clay/DESIGN.md
├── CLAUDE.md                 # project notes + decisions log
├── public/
│   └── favicon.svg
└── src/
    ├── styles/
    │   └── global.css        # Tailwind v4 @theme directive — full Clay token port
    ├── data/
    │   └── content.ts        # typed copywriting + product list + Unsplash URLs
    ├── components/
    │   ├── TopNav.astro
    │   ├── Hero.astro
    │   ├── ProductCarousel.astro
    │   ├── FeaturedProduct.astro
    │   ├── BrandStory.astro
    │   ├── Testimonials.astro
    │   ├── IngredientSpotlight.astro
    │   ├── EmailCapture.astro
    │   └── Footer.astro
    └── pages/
        └── index.astro       # composes all 9 components, single page
```

### Why this structure

- **Component-per-section:** isolates DESIGN.md effect per section so reviewer can spot which components benefit most from the spec.
- **`content.ts` typed:** copy is decoupled from layout; reviewers can audit visual fidelity without copy-edit noise.
- **`DESIGN.md` at root:** keeps the audit trail. Future iterations can re-run a fresh AI agent against the same spec.
- **`CLAUDE.md`:** logs decisions (font substitute, asset strategy, off-spec deviations if any) for future reference.

## 4. Page Composition (9 sections)

Section spacing: 96px between bands (`spacing.section` from Clay).

| # | Section | Surface | Clay Components Used | Notes |
|---|---------|---------|---------------------|-------|
| 1 | TopNav | `colors.canvas` | `top-nav` (64h), `button-text-link`, `button-primary` "Try your shade" | Logo "DEWY CO." text-only. Mobile = hamburger icon (no JS slide-out). |
| 2 | Hero | `colors.canvas` | `hero-band`, `hero-illustration-card`, `button-primary` + `button-secondary` | 7/5 split desktop. Left: h1 `display-xl` + sub-headline `body-md` + 2 buttons. Right: cream rounded card holding 1 Unsplash beauty model close-up + CSS gradient blob backdrop. |
| 3 | ProductCarousel | `colors.canvas` | 6× `feature-card-{pink, teal, lavender, peach, ochre, cream}` | CSS-only `overflow-x-auto snap-x snap-mandatory` — no JS. Each card carries Unsplash product photo + name + price + ingredient tag. **Color rotation enforced no-repeat per Clay rule.** |
| 4 | FeaturedProduct | `colors.canvas` (page) holding centered `feature-card-peach` | `feature-card-peach` widened to max-width 1100px, 2-col internal layout: photo left, copy right with `button-on-color`. Card retains `rounded.xl` + 32px padding (does NOT become a full-width section band — stays a card on canvas) | "Hero this season: Glow Drops Serum". |
| 5 | BrandStory | `colors.canvas` | Pure typography: `display-lg` headline + 2× `body-md` paragraphs | Single column max-width 720px. **No images** — typography-fidelity test. |
| 6 | Testimonials | `colors.canvas` | 4-up grid `testimonial-card` (cream `surface-card`) | Avatar (Unsplash) + name + role + quote in `body-md`. |
| 7 | IngredientSpotlight | `colors.canvas` | 3-up smaller cards using `feature-card-{lavender, peach, ochre}` variants (defined in Clay spec) | Hyaluronic Acid / Niacinamide / Vitamin C. Emoji as 3D mockup substitute (✨💧🍊). **Note:** initial draft proposed mint/coral cards, but Clay spec only defines feature-card variants for pink/teal/lavender/peach/ochre/cream. Sticking to defined variants — `brand-mint` and `brand-coral` colors stay reserved for illustration accents per Clay's intent (line 323-324). |
| 8 | EmailCapture | `colors.surface-soft` | `cta-band-illustrated` (rounded xl, padding 80px), `text-input` + `button-primary` inline | "Join the dew list" — visual only, no submit handler. CSS gradient blob decoration. |
| 9 | Footer | `colors.surface-soft` | 4-column link grid, padding 80px, `body-sm` muted text | **Cream-tinted, NOT dark** (Clay non-negotiable rule). |

### Mandatory Clay rules enforced

- Brand-color rotation: pink → teal → lavender → peach → ochre → cream, no two adjacent same color
- Display weight max 500 (no bold)
- Cream footer
- 96px section rhythm
- No custom hover states beyond Clay tokens
- Cream canvas `#fffaf0` everywhere — no cool grays

## 5. Token Mapping (Clay → Beauty Brand)

### Colors
All 32 Clay color tokens imported 1:1 into Tailwind v4 `@theme` block. No additions, no overrides.

### Typography
| Clay token | Substitute | Reason |
|---|---|---|
| `Plain Black` (Clay's licensed display font) | **Inter** weight 500 with `letter-spacing: -0.05em` at display sizes | This is Clay's **own recommended public substitute** (DESIGN.md line 377). Staying faithful to spec rather than swapping to a "more beauty-feeling" font (Fraunces / Recoleta) — the test is whether Clay's spec works, not whether we can font-shop our way to a beauty look. |
| `Inter` body | Inter (no change) | Loaded via Google Fonts: `Inter:wght@400;500;600`. |

### Spacing & Radius
All Clay spacing scale + radius scale ported to Tailwind v4 `@theme`. No custom values.

## 6. Asset Strategy

**Choice:** Unsplash direct URLs (no API key, no auth, free).

URL format: `https://images.unsplash.com/photo-{id}?w={width}&auto=format&fit=crop&q=80`

**Pre-curated photo categories (~10 photos total):**
- 1× Hero: millennial woman dewy makeup close-up
- 1× Featured product: serum bottle hero shot
- 6× Carousel products: lipstick / blush / serum / gloss / mascara / spray (flat-lay style preferred)
- 4× Testimonial avatars: diverse face crops, friendly

Specific photo IDs will be selected during implementation to match Clay's warm cream aesthetic (not cool-toned, not high-contrast editorial). Each `<img>` tag uses `loading="lazy"` and explicit `width/height` to prevent CLS.

**Decoration:** CSS-only gradient blobs (radial-gradient + border-radius percentages) substitute for Clay's signature 3D claymation illustrations. This is documented as an off-spec deviation in CLAUDE.md.

**Emoji as 3D mockup substitute** (Section 7 IngredientSpotlight only): playful, on-brand for millennial beauty, zero-asset cost.

## 7. Copywriting

Language: **English**.

All copy fictional but believable. `data/content.ts` is the single source of truth — typed `Product`, `Testimonial`, `Ingredient` interfaces. Sample shape:

```ts
type Product = {
  name: string;
  tagline: string;
  price: string;          // formatted, e.g., "$24"
  imageUrl: string;       // Unsplash URL
  cardVariant: 'pink' | 'teal' | 'lavender' | 'peach' | 'ochre' | 'cream';
};
```

## 8. Responsive Behavior

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | < 768px | Hamburger nav (icon only, no JS menu). Hero stacks vertical (h1 → image). Carousel keeps scroll-x. Grids collapse to 1-up. h1 scales 72px → 36px. |
| Tablet | 768–1024px | 2-up grids. Carousel shows ~2 cards visible. |
| Desktop | 1024–1440px | Full top-nav. 3-up feature grids. Carousel shows ~3 cards. Hero 7/5 split. |
| Wide | > 1440px | Same as desktop, max content 1280px centered. |

Touch targets ≥ 44×44px (WCAG AAA, matches Clay button height).

## 9. Out of Scope

Explicitly NOT building:

- 3D claymation illustration generation (substitute: CSS blobs + emoji + Unsplash)
- Form submission backend (email capture is visual-only)
- Mobile hamburger slide-out menu (placeholder icon, no JS)
- Animations / scroll-trigger (Clay spec line 539: "animation tidak in scope")
- Multiple pages (single `index.astro`)
- Dark mode (Clay has none)
- Real cart / checkout
- i18n
- Tests (visual review project only)
- Lighthouse / perf optimization beyond defaults
- SEO meta beyond basic title/description

## 10. Success Criteria

After implementation, the user evaluates:

1. **Brand-genre fidelity** — does the page read as millennial beauty to a casual viewer who doesn't know about Clay?
2. **Spec adherence** — were any Clay rules violated? (cream canvas, no dark footer, color rotation, display weight cap, 96px rhythm)
3. **Component coverage** — did the page exercise ≥7 distinct Clay components?
4. **Effort attribution** — what % of the visual quality came from DESIGN.md tokens vs custom decisions?

These are subjective by design — the test result is qualitative.

## 11. References

- Source DESIGN.md: `D:/Project Ngoding/awesome-design-md/design-md/clay/DESIGN.md`
- Repo: https://github.com/VoltAgent/awesome-design-md
- DESIGN.md format: https://stitch.withgoogle.com/docs/design-md/format/
- Astro 5 + Tailwind v4 patterns: see MBG Dashboard `mbg-dashboard-tech-stack.md` reference (Tailwind v4 `@theme` directive, no `tailwind.config.js`)

## 12. Decisions Log

- **Folder name `beauty-brand` (not `dewy-co`):** user preference, reflects test-project nature.
- **Brand internal name "DEWY CO." retained:** fictional, makes the page feel like a real brand for evaluation purposes.
- **Inter 500 over Fraunces/Recoleta:** test integrity > beauty-genre fitness. Clay's spec recommends Inter 500 directly.
- **Composition C (Hybrid) over A or B:** user choice, exercises carousel + email-capture components additionally.
- **Single build (not A/B):** user choice, simpler scope.
- **Unsplash over CSS-only or AI-generated:** user choice, accepting that asset realism becomes a confounding variable.
