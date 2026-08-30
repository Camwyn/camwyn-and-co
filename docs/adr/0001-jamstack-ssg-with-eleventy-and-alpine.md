# ADR 0001: Jamstack Static Site Generation with Eleventy and Alpine.js

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

Camwyn & Co. is an editorial, tactile, and interactive digital presence representing an independent house of ventures. The site requires high-fidelity typography, instant load times (<1.0s LCP), zero hosting maintenance overhead, and seamless interactive widgets (like the Adventure Compass).

Traditional dynamic stacks (WordPress, PHP, Ruby on Rails, Node.js runtime servers) introduce vulnerability attack surfaces, runtime database dependencies, and ongoing infrastructure maintenance costs. Conversely, heavy Single Page Application (SPA) meta-frameworks (Next.js, Remix, Nuxt) introduce heavy JavaScript client bundles, hydration overhead, and brittle runtime rendering for what is fundamentally an editorial site.

## Decision

We chose a **Pure Jamstack (Static Site Generation / SSG)** architecture:
1. **SSG Engine:** **Eleventy (11ty) v3.x** with Nunjucks (`.njk`) templating. Eleventy compiles 100% of routes, markdown dispatches, and JSON matrices into static HTML/CSS/JS in `_site/` at build time.
2. **Client-Side Reactivity:** **Alpine.js v3.x** loaded via CDN script tags with `defer`. Alpine provides declarative, Vue-like reactivity without a Virtual DOM or client-side build compilation.
3. **Runtime Server Footprint:** Strictly **zero** runtime server processes, databases, or PHP engines. The generated `_site/` directory is deployed directly to static edge hosting via CDN/FTP.

## Consequences

### Positive
* **Extreme Performance:** Instant static file delivery with sub-second LCP.
* **Security & Reliability:** Zero server attack surface, no database injection risks, no node server crashes.
* **Zero Runtime Cost:** Can be hosted on any static web server, CDN, or object storage.
* **SEO & Crawlability:** 100% of copy and layout is pre-rendered in static HTML before JavaScript runs.

### Negative / Trade-offs
* **Dynamic Server Capabilities:** Features requiring real-time server mutations must be delegated to third-party static-friendly endpoints (e.g., Formspree for forms).
* **Build Step:** Content changes require an SSG rebuild rather than instant database row updates.

## Alternatives Considered
* **WordPress / Dynamic CMS:** Rejected due to runtime PHP/MySQL vulnerabilities, maintenance overhead, and payload bloat.
* **Next.js / Astro / SvelteKit:** Rejected to avoid node runtime dependencies, complex build pipelines, and virtual-DOM bundle payloads (>100KB).
