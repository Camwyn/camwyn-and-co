# ADR 0006: Static Search Index, Field Notes Markdown Engine, and RSS Syndication

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

"Notes from the Field" is the editorial publication channel for Camwyn & Co, featuring essays migrated from WordPress alongside new dispatches. Readers need to filter by archetype, browse archives, search the full text of dispatches, and subscribe via RSS feed readers.

External search SaaS providers (Algolia, Swiftype) introduce third-party network dependencies, API subscription costs, and potential privacy tracking.

## Decision

1. **Markdown Engine with Eleventy Collections:** Dispatches are authored as Markdown files in `src/notes/` with frontmatter (`title`, `date`, `archetype`, `category`, `excerpt`, `coverImage`). Eleventy parses them using `markdown-it` configured to add `target="_blank" rel="noopener noreferrer"` to external links automatically.
2. **Build-Time Search Index Generation (`src/search-index.njk`):** Eleventy generates a lightweight `/search-index.json` containing cleaned text excerpts, titles, URLs, tags, and archetypes across all posts at build time.
3. **Client-Side Alpine Full-Text Search:** Alpine lazy-loads `/search-index.json` upon search input focus and executes instant substring/token filtering locally in the browser with zero external dependencies.
4. **RSS / Atom Syndication (`src/feed.njk`):** Generates valid RSS 2.0 XML at `/feed.xml` with auto-discovery tags in `<head>` across all pages and automated XML validation in `scripts/site-integrity-test.js`.

## Consequences

### Positive
* **Zero External Dependencies:** Completely self-hosted, private, zero-cost search and syndication.
* **Instantaneous Search Response:** Sub-millisecond client filtering across all dispatches.
* **Clean Syndication:** Full RSS reader interoperability validated automatically during test runs.

### Negative / Trade-offs
* **Scalability Threshold:** For hundreds or thousands of long-form articles, the monolithic `search-index.json` size would grow; however, for the current and medium-term editorial cadence (<100 articles), payload is minimal (<30KB).

## Alternatives Considered
* **Algolia / Third-Party Search SaaS:** Rejected due to external reliance, scripts, and cost.
* **Pagefind Binary:** Evaluated, but lightweight Nunjucks JSON index + Alpine search proved simpler and required no extra Rust/Go binary installation in CI.
