# ADR 0003: Automated Accessibility (A11y) and Axe-Core Testing

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

Accessibility is a foundational brand requirement for Camwyn & Co ("Smart can be warm" means everyone has a seat at the table). The site must meet strict **WCAG 2.1 Level AA** standards (and Level AAA where feasible for reading contrast) across all viewports, interactive elements, and multi-step widgets.

Manual spot-checking is insufficient to guarantee zero regressions across dozens of generated static pages and dynamic state transitions.

## Decision

1. **Automated CI DOM Test Suite:** Implemented `scripts/a11y-audit.js` using `axe-core`, `jsdom`, and `pa11y-ci` to parse 100% of compiled HTML pages in `_site/`.
2. **Contrast Token Matrix Enforcement:** High-contrast token pairings verified in `tokens.css`:
   * `coffee-black` (`#121211`) on `paper-white` (`#F9F8F6`): **17.9:1** (AAA)
   * `coffee-black` (`#121211`) on `warm-sand` (`#E8E2DA`): **14.8:1** (AAA)
   * `muted-clay-text` (`#735D4E`) on `paper-white` (`#F9F8F6`): **5.8:1** (AA Normal / AAA Large)
   * `outline-dark` (`#595954`) on `paper-white` (`#F9F8F6`): **6.6:1** (AAA Large / AA Normal)
3. **Interactive A11y Standards:**
   * Visible focus indicators (`:focus-visible` with 2px offset) across all interactive elements.
   * Semantic `<button type="button">` elements for all quiz options.
   * `aria-live="polite"` on dynamic step containers (Adventure Compass) for screen reader announcement.
   * Minimum 44×44px touch targets on mobile viewports.

## Consequences

### Positive
* **Zero Violations in CI:** Automated regression prevention across all 27+ generated routes via `lando test:a11y`.
* **Inclusive Usability:** Full keyboard navigability and high-contrast legibility for all readers.

### Negative / Trade-offs
* **Color Palette Constraint:** Accent colors like `muted-clay` must be strictly gated between decorative borders vs. high-contrast text variants (`muted-clay-text`).

## Alternatives Considered
* **Manual Testing Only:** Rejected due to risk of silent accessibility regressions during template updates.
