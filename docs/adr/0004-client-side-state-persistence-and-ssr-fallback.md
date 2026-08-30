# ADR 0004: Client-Side State Persistence and SSR / No-JS Fallback Parity

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

The Adventure Compass and site personalization features (filtering dispatches on `/notes/`, highlighting venture resonance on `/what-we-do/`, tailoring 404 guidance on `/404.html`, and evolving nav permalinks) require remembering the visitor's archetype across multiple page navigations and return visits.

However, as a pure static Jamstack site without a dynamic backend server, traditional HTTP session cookies and database lookups are unavailable. Furthermore, search engine crawlers and users with JavaScript disabled must still see a rich, fully populated, readable website.

## Decision

1. **Global Alpine Store:** State is centralized in `Alpine.store('compass', ...)` within `src/_includes/base.njk` to enable cross-component communication without brittle parent-child DOM querying.
2. **Local Persistence via `@alpinejs/persist`:** Compass quiz results and answers are persisted to the browser's `localStorage` under `compassResult` and `compassHistory`.
3. **HTML-First SSR/SSG Parity:**
   * Default markup is fully rendered on the server inside Nunjucks templates at build time.
   * "Notes from the Field" renders a complete static baseline of dispatches.
   * The Adventure Compass includes an initial pre-rendered state and direct links to all archetype profile permalinks (`/compass/gatherer/`, `/compass/explorer/`, etc.).
   * `x-cloak` is used strictly on alternate conditional step views to prevent flash of unstyled content (FOUC) while keeping primary HTML accessible to non-JS engines.

## Consequences

### Positive
* **Zero Backend Overhead:** Personalization works seamlessly on static hosting without server session costs.
* **Instant Client-Side Hydration:** Alpine instantly reads `localStorage` on page load to adjust filters, eyebrow labels, and venture callouts.
* **Resilient Graceful Degradation:** Site remains 100% crawlable and functional even if client scripts fail or are blocked.

### Negative / Trade-offs
* **Cross-Device Sync:** User state is tied to the specific browser `localStorage` and does not sync across different devices without an account system.

## Alternatives Considered
* **Client-Only Single Page App Rendering:** Rejected due to poor SEO and complete failure for no-JS visitors.
* **Server-Side Session Cookies:** Rejected because it violates the Jamstack zero-runtime server architectural invariant.
