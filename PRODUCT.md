# DEWY CO. — Product Requirements

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

A fictional botanical-powered beauty brand, redesigned as a premium, interactive discovery and shopping demo. This replaces the previous Clay/Mastercard design-system experiment; historical documents in docs/superpowers/specs remain historical, not current requirements.

## Users

The original PRD targets millennial / Gen-Z beauty shoppers. [INFERENCE] The primary visitor wants to explore skin-first makeup, understand ingredients, and assemble a personal ritual without pressure.

## Positioning

DEWY CO. combines makeup with botanical skincare ingredients. Preserve the six fictional products, their existing prices, and the Jakarta origin story. Cruelty-free and vegan are fictional brand positioning, not independently verified certifications.

## Brand Commitments

- Name: DEWY CO.
- User-requested premium beauty identity, an entirely new visual system, extensive curated Pexels imagery, and useful interactive behavior.
- English storefront copy, as established by the original PRD.
- Skin-first, botanical, personable editorial voice; upgrade clarity without inventing clinical results, certifications, discounts, sales figures, or real endorsements.

## Capabilities and Constraints

User confirmed a complete interactive demo, not a transactional store.

- Responsive navigation with working mobile menu.
- Six-product collection with category filtering.
- Product details, applicable shade selection, and add-to-bag actions.
- Shopping bag: quantities, removal, calculated subtotal, browser-local persistence, visible demo disclosure; no payment or fake checkout success.
- Short beauty ritual finder that returns recommendations from the existing catalog, without medical diagnosis or unsupported shade matching.
- Ingredient exploration and editorial brand story.
- Newsletter area must disclose that there is no email service; do not fabricate subscription success or store email addresses as subscribers.
- Keep Astro, TypeScript, Tailwind CSS-first integration, and the existing /beauty-brand base path. Native browser interactions preferred over new dependencies.
- Stock photographs illustrate the fictional collection; do not imply stock packaging is an actual DEWY product or stock models are customers.

## Catalog

| Product | Price | Established purpose |
|---|---|---|
| Glow Drops Serum | $28 | Luminous skincare hybrid |
| Petal Lip Tint | $18 | Buildable lip stain |
| Cloud Cushion Blush | $22 | Whipped cream blush |
| Halo Highlight Stick | $24 | Multi-use illuminator |
| Velvet Brow Gel | $20 | Flexible-hold brow setter |
| Dewy Mist Setting Spray | $26 | Botanical hydrating finish |

## Evidence on Hand

- Original PRD: docs/superpowers/specs/2026-05-08-beauty-brand-design.md.
- Original catalog, ingredients, story and fictional quotes: src/data/content.ts.
- No genuine customer testimonials, clinical studies, checkout service, shipping policies or mailing-list integration exist.
- Replace old Unsplash and Pravatar assets with verified Pexels assets. Keep source and photographer attribution in the asset manifest.

## Product Principles

1. Let visitors see, understand, and interact with the collection immediately.
2. Make every visible control functional and every demo boundary explicit.
3. Premium comes from coherent typography, composition and photography, not decorative UI density.
4. Product content has one typed source of truth.
5. Preserve brand truth while replacing all obsolete visual conventions.

## Accessibility & Inclusion

Keyboard-operable navigation, dialogs, product filtering, and bag controls. Visible focus, readable contrast, touch targets of at least 44px, reduced-motion support, descriptive image alternatives, and no interactions dependent on hover alone.

## Acceptance Criteria

- No Clay/Mastercard token system, pill-navigation treatment, orbital decorations or circular testimonial cards remain in the shipped surface.
- All six products are accessible through the collection and discovery interactions.
- Bag calculations and persistence work; shade choices are reflected in line items.
- Desktop and mobile render without horizontal page overflow or broken imagery.
- Pexels source URLs and photography credits are recorded.
- Astro check and production build pass, and the actual browser experience is exercised at desktop and mobile sizes.
