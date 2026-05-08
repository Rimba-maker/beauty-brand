# Beauty Brand — Project Notes

A test project for evaluating how strongly a `DESIGN.md` from the [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) repo shapes the visual output of an unrelated brand category.

## What this is

- **Brand (fictional):** DEWY CO. — millennial botanical-powered makeup
- **Source DESIGN.md:** [Clay](https://getdesign.md/clay/design-md) — B2B GTM-data SaaS, copied verbatim to `./DESIGN.md`
- **Test goal:** Does Clay's spec (cream canvas, saturated 6-color cards, rounded display type) translate into a convincing beauty brand landing when faithfully applied?

## Spec & Plan

- Design spec: `docs/superpowers/specs/2026-05-08-beauty-brand-design.md`
- Implementation plan: `docs/superpowers/specs/2026-05-08-beauty-brand-plan.md`

## Stack

- Astro 6.3.1
- Tailwind v4.2.4 via `@tailwindcss/vite` (no `tailwind.config.js`, CSS-first via `@theme` directive)
- TypeScript strict
- pnpm 10

## Rules of engagement (do not violate)

These come from Clay's DESIGN.md and the test contract. Violations invalidate the experiment.

1. **Do not modify `DESIGN.md`.** It is the source of truth, copied verbatim from the repo.
2. **No off-token colors.** Every color must come from the `@theme` block in `src/styles/global.css`.
3. **No display weight > 500.** Clay's display type stays at 500. Bold (700) is system violation.
4. **Cream footer only.** No dark footer (Clay rule, line 312 in DESIGN.md).
5. **No adjacent same-color cards.** ProductCarousel rotation must be: pink → teal → lavender → peach → ochre → cream.
6. **No custom hover states.** Clay spec line 500.
7. **96px section rhythm.** Token `spacing.section` between bands.
8. **Cream canvas `#fffaf0`.** Never replace with cool gray.

## Off-spec deviations (logged here intentionally)

- **Plain Black font → Inter 500 + -0.05em letter-spacing.** Plain Black is licensed to Clay; Inter 500 is the substitute Clay's own spec recommends (DESIGN.md line 377).
- **3D claymation illustrations → CSS gradient blobs + emoji + Unsplash photography.** Clay's signature 3D illustrations are commissioned assets, not available. Spec calls this out as a deviation.
- **Asset realism via Unsplash.** Real product photos are not available for a fictional brand. Acknowledged as a confounding variable in the test (the visual quality may come from photo quality, not just from DESIGN.md fidelity).

## Phase status

- [x] Phase 1 — Scaffold (Astro + Tailwind v4 + DESIGN.md copy) — commit `cad6015`
- [x] Phase 2 — Token port to `@theme` — commit `a2c4721`
- [x] Phase 3 — Content + data layer — commit `0e4d47c`
- [x] Phase 4 — Build 9 components — commit `3076527`
- [x] Phase 5 — Compose + responsive QA — pending final commit

## Audit results (Phase 5)

- Zero hex codes outside `src/styles/global.css`
- Zero `font-bold` / `font-extrabold` / `font-black` anywhere
- Footer uses `bg-surface-soft` (cream), NOT dark
- Carousel color rotation: pink → teal → lavender → peach → ochre → cream
- All sections use `py-section` (96px) rhythm
- `pnpm check` 0 errors / 0 warnings
- `pnpm build` 1.07s, 1 page

## How to run

```powershell
pnpm install   # only first time
pnpm dev       # http://localhost:4321
pnpm build     # static output to dist/
pnpm check     # type + Astro check
```

## Known asset risks

- Unsplash photo IDs in `src/data/content.ts` are educated guesses. If any 404 in browser, swap the photo ID for a working one. The HTML/CSS structure is stable — only the URLs may need tweaking.
- Pravatar avatars (`i.pravatar.cc/200?img=N`) for testimonials — these are stable and randomized per N value.

## Out of scope

See spec section 9. Briefly: no animations, no form backend, no mobile slide-out menu, no dark mode, no multi-page, no tests.
