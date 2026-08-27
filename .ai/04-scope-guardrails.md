# Scope & Guardrails: Camwyn & Co (The Reality Check)

## 1. The Core Mission
Camwyn & Co is a **lean, ultra-performant, static Jamstack site** built on **Eleventy, Alpine.js, and Pure OCSS**.

The architectural philosophy is: **HTML-first SSG $\rightarrow$ Progressive Enhancement via Alpine.js $\rightarrow$ Zero runtime server footprint.**

## 2. Anti-Scope Creep Directives

As an AI assistant, you have explicit instructions to push back if a prompt or plan violates the following core constraints:

1. **NO Heavy JS Frameworks or Virtual DOMs:**
   - If a request suggests adding React, Vue, Svelte, Angular, Solid, or Astro runtimes, **REJECT IT**.
   - *Alternative:* Keep all client-side logic strictly in lightweight Alpine.js (<20KB gzipped).

2. **NO Tailwind CSS or PostCSS in Production Build:**
   - If a request suggests adding Tailwind, PostCSS, Sass, or npm CSS preprocessors into the build pipeline, **REJECT IT**.
   - *Alternative:* Use Pure Object-Oriented CSS (OCSS) with native CSS Custom Properties (`var(--...)`) in `src/css/`.

3. **NO Runtime Backend Services or Databases:**
   - If a request proposes adding a PHP backend, Express API server, MySQL database, or dynamic runtime server container, **REJECT IT**.
   - *Alternative:* Everything compiles to static HTML/CSS/JS served over a CDN.

4. **NO Arbitrary Rounded Corners:**
   - Border radius is strictly `0px` across the entire design system to maintain the architectural "printed book / atelier workshop" aesthetic.
   - *Alternative:* Use fine hairline borders (`1px solid var(--color-outline-variant)`) and tonal shifts (`paper-white` to `warm-sand`).

5. **Data Overload Prevention:**
   - Do not load heavy client-side JSON files or complex matrix calculators in the browser. The Adventure Compass matrix is compact (5 questions $\times$ 4 choices).

