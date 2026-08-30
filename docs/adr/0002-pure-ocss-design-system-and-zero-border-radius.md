# ADR 0002: Pure Object-Oriented CSS (OCSS) Design System and Zero Border Radius

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

The Camwyn & Co. brand identity reflects an "atelier workshop and printed book" aesthetic—tactile, generous, structured, and timeless. The design specifications in `digital_identity_mocks/DESIGN.md` define an earthy color palette (`paper-white`, `warm-sand`, `coffee-black`, `muted-clay`), precise typographic scales, and strict architectural proportions.

Modern web workflows often default to utility-first CSS frameworks (like Tailwind CSS) or heavy CSS-in-JS preprocessors (Sass, PostCSS). While Tailwind was used in the exploratory mockup HTML for rapid prototyping, shipping Tailwind or CSS preprocessors to production adds dependency overhead, node build steps, and class bloat in templates.

## Decision

1. **Pure Object-Oriented CSS (OCSS):** All production styling in `src/css/` is structured around OCSS layers:
   * `01-settings/tokens.css`: Canonical CSS Custom Properties (`--color-*`, `--font-*`, `--space-*`).
   * `02-objects/`: Layout primitives (`.o-container`, `.o-grid`, `.o-stack`, `.o-cluster`).
   * `03-components/`: Concrete visual modules (`.c-sidenav`, `.c-hero`, `.c-compass`, `.c-note-card`, `.c-project-row`, `.c-btn`).
   * `04-utilities/`: Single-purpose overrides (`.u-text-clay`, `.u-visually-hidden`, `.u-mb-md`).
2. **Zero Border Radius (`border-radius: 0px`):** All buttons, cards, containers, inputs, and image frames strictly enforce a `0px` border radius. Roundness, bubbly cards, and rounded pill badges are prohibited to preserve the architectural, printed-book feel.
3. **Zero CSS Preprocessors in Production:** No Tailwind, Sass, or PostCSS build steps. Browser stylesheets are directly copied to `_site/css/` via Eleventy passthrough.

## Consequences

### Positive
* **Build Simplicity:** CSS builds instantaneously with zero npm compilation or purge steps.
* **Maintainability & Token Control:** Colors, typography, and spacing metrics change in one place (`tokens.css`) and cascade natively.
* **Strict Aesthetic Discipline:** 0px radius rule ensures consistent visual gravity across all pages.

### Negative / Trade-offs
* **Utility Ergonomics:** Developers cannot use Tailwind shorthand classes (`flex p-4 bg-gray-100`) and must author semantic OCSS classes.

## Alternatives Considered
* **Tailwind CSS in Production:** Rejected due to node build toolchain complexity and divergence from hand-crafted atelier aesthetic.
* **Sass / SCSS:** Rejected because native CSS Custom Properties and modern CSS Grid/Flexbox satisfy all styling requirements natively.
