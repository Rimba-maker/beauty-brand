# Changelog

## 2026-10-12 — Centered product and ritual modals

- Fixed the user-reported top-left product panel by restoring explicit `margin: auto` on the shared dialog class after Tailwind Preflight's margin reset.
- Product details and ritual finder are now centered in the viewport; the shopping bag retains its separate right-edge drawer placement.
- Production browser smoke asserted horizontal/vertical modal center offsets below 1px on desktop and mobile, verified Escape/close controls, and checked unchanged bag right/top/full-height anchoring. Production build succeeded.

## 2026-10-12 — Editorial motion upgrade

- Preserved The Beauty Atelier identity while rebuilding the campaign as a three-edit photographic contact sheet, with each edit connected to its actual catalog essential.
- Added a single opening aperture/headline sequence (ends at 760ms), directional campaign reveals (460ms), and native collection View Transitions with immediate fallback.
- Added brief bag, mobile-menu and ritual-result feedback, plus a right-edge bag-drawer entrance. No new dependencies, autoplay loops or scroll effects.
- Rapid changes retain the latest requested campaign/filter. Failed image decoding retains the usable previous edit; reduced-motion preference and hidden-page changes cancel owned motion without leaving clipped layers.
- Removed the obsolete single featured-product export; campaign and collection content share the same typed catalog.
- Verification: Astro check on 18 files reported zero errors/warnings/hints; production build succeeded. Browser smoke exercised keyboard campaign selection, rapid campaign/filter changes, native-API fallback, actual image failure/retry, live reduced motion, mobile bag/finder flow, and 320/390/768/1280/1440px layouts. Frame samples show the opening moving at 120/360ms and fully cleaned up at 900ms. Hidden-page cancellation used an isolated synthetic visibility event, not a background-device benchmark.

## 2026-10-12 — The Beauty Atelier

- Replaced the Clay/Mastercard visual experiment with DEWY CO.'s approved premium beauty identity: lavender, espresso, mauve, fashion typography and square campaign photography.
- Rebuilt navigation, campaign, collection, ritual discovery, story, ingredients, journal, newsletter preview and footer.
- Added working mobile navigation, campaign switching, five collection filters, six product-detail views, shade choices, a two-preference ritual finder and browser-local shopping bag with quantities, removal and calculated USD subtotal.
- Replaced unsupported testimonial/endorsement presentation with editorial content. Stock models and packaging are clearly illustrative.
- Added twelve locally served Pexels photographs with photographer/source records and embedded origin metadata. Bundled fonts with their SIL Open Font Licenses.
- Added PRODUCT.md as the current PRD. Historical May experiment documents are retained as history, not current requirements.
- Demo boundaries: no checkout, order fulfilment, live shade matching, customer endorsements or newsletter signup service. No email addresses or payment information collected.

Verification: Astro check reported zero errors, warnings and hints. Browser smoke exercised desktop/mobile navigation, every filter and product, shade-separated bag line items, subtotal and quantity changes, bag reload persistence, finder-to-product flow, campaign controls and native details panels. Final production verification is recorded in the task delivery.
