# Beauty Brand — Project Notes

A test project for evaluating how strongly a `DESIGN.md` from the [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) repo shapes the visual output of an unrelated brand category.

## What this is

- **Brand (fictional):** DEWY CO. — millennial botanical-powered makeup
- **Test goal:** Does a non-beauty `DESIGN.md` translate into a convincing beauty brand landing when faithfully applied?

## Branches

This repo holds **A/B variants** of the same beauty brand using two different `DESIGN.md` files. The composition (9 sections) and content (`src/data/content.ts`) are identical across branches. Only the design system swaps.

| Branch | DESIGN.md source | Vibe | Status |
|--------|------------------|------|--------|
| `master` | [Clay](https://getdesign.md/clay/design-md) — B2B GTM-data SaaS | Cream canvas + 6 saturated brand colors + rounded display | shipped, 5 commits |
| `mastercard` | [Mastercard](https://getdesign.md/mastercard/design-md) — global payments | Warm putty cream + ink black + circular portraits + dark footer + pill shapes | active branch |

`git checkout master` to see Clay variant. `git checkout mastercard` for Mastercard variant.

## Spec & Plan (master / Clay variant)

- Design spec: `docs/superpowers/specs/2026-05-08-beauty-brand-design.md`
- Implementation plan: `docs/superpowers/specs/2026-05-08-beauty-brand-plan.md`

The Mastercard branch reuses the same composition but adapts components to Mastercard's vocabulary — see "Mastercard adaptations" below.

## Stack

- Astro 6.3.1
- Tailwind v4.2.4 via `@tailwindcss/vite` (no `tailwind.config.js`, CSS-first via `@theme` directive)
- TypeScript strict
- pnpm 10

## Mastercard adaptations (this branch)

Mastercard's spec required structural changes, not just color swaps:

| Component | Clay original | Mastercard variant |
|-----------|---------------|---------------------|
| TopNav | Sticky 64h cream bar | Floating white pill, 999px radius, fixed below viewport top with shadow |
| Hero | 7/5 split with cream rounded card | Text section + stadium media frame (40px radius all corners) full-bleed below |
| ProductCarousel | 6 saturated rotation cards | 6 pill-shaped cards (999px radius), full-bleed photo, white chip + ink pill CTA inside |
| FeaturedProduct | Peach card | Stadium frame 40px on dark ink with ingredient pill chips |
| BrandStory | Plain editorial | Editorial with ghost watermark headline (cream-on-cream layered) |
| Testimonials | 4-up cream cards | Circular portraits (220px) with white satellite CTA + asymmetric vertical offset |
| IngredientSpotlight | 3-up brand-color cards | Circular portraits (280px) with satellite CTA + decorative orange orbital arc |
| EmailCapture | cream surface band with rounded-md input | Lifted cream stadium frame with pill input (999px) and ink pill CTA |
| Footer | **Cream surface-soft** (Clay rule) | **Dark ink #141413** (Mastercard rule, opposite of Clay) |

## Rules of engagement (Mastercard branch)

These come from Mastercard DESIGN.md and override the Clay rules on this branch:

1. **Canvas Cream `#F3F0EE`** — never pure white, never cool gray
2. **Dark ink footer `#141413`** — opposite of Clay, but Mastercard non-negotiable
3. **Body weight 450** — half-step weight is signature; do not flatten to 400
4. **Headlines weight 500 with -2% tracking** — never bold
5. **Three radii: 20px (buttons), 40px (stadium frames), 999px (pills/circles)** — no 8/12/16
6. **Mask service imagery as perfect circles** — not rounded rectangles
7. **Eyebrow labels carry the • accent dot** — uppercase, 14px / 700 / +4% tracking
8. **Signal Orange `#CF4500` reserved for compliance/consent only** — NOT for marketing CTAs
9. **Light Signal Orange `#F37338` for orbital decorative arcs only** — never body text
10. **Mastercard logo red/yellow are brand mark only** — never UI palette

## Off-spec deviations

- **Sofia Sans → MarkForMC**: Mastercard's own recommended open-source substitute (DESIGN.md line 86). Loaded via Google Fonts at weights 400/450/500/700.
- **Asset realism via Unsplash**: educated-guess photo IDs, some may 404.
- **Pravatar avatars** for testimonials.
- **Ghost watermark** uses lighter cream `#E8E2DA` (Mastercard spec says it varies between `#E8E2DA` and `#D1CDC7`).

## Phase status (Mastercard branch)

- [x] Phase A — Token swap (DESIGN.md + @theme + Sofia Sans)
- [x] Phase B — Refactor 9 components to Mastercard vocabulary
- [x] Phase C — Compose verified, audit passed, commit pending

## Audit results (Mastercard branch)

- Zero hex codes outside `src/styles/global.css`
- Footer uses `bg-ink` (dark) — correct for Mastercard
- All radii from defined scale (20 / 40 / 999 / 50%)
- Eyebrow dots present via `.eyebrow-dot` helper class
- `pnpm check` 0 errors / 0 warnings
- `pnpm build` 1.14s

## How to run

```powershell
pnpm install   # only first time
pnpm dev       # http://localhost:4321
pnpm build     # static output to dist/
pnpm check     # type + Astro check

# Switch between variants
git checkout master      # Clay variant
git checkout mastercard  # Mastercard variant
```
