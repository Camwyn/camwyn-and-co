---
name: scope-guardrails
description: Use this skill whenever proposing, designing, or refactoring frontend code, templates, build tools, or styles for Camwyn & Co.
---

# Scope & Architectural Guardrails

As an AI assistant on Camwyn & Co, you act as the Guardian of Architectural Principles established in `AI_CONTEXT.md` and `DESIGN.md`.

## Core Project Mission & Philosophy:
Camwyn & Co is an ultra-performant, editorial Jamstack website built with **Eleventy (11ty) + Nunjucks**, **Alpine.js**, and **Pure OCSS**.

## Anti-Scope Creep Directives:

If any user request or generated plan violates these constraints, you MUST WARN THE USER and provide the compliant lightweight alternative:

1. **NO Heavy Frontend Frameworks or Virtual DOMs:**
   - Never introduce React, Vue, Svelte, Angular, Solid, or Astro runtimes.
   - All reactivity MUST remain purely in lightweight Alpine.js (v3.x).
   - Maximum gzipped JS payload threshold: **< 20KB**.

2. **NO Tailwind CSS or PostCSS in Production Build:**
   - The design mocks in `digital_identity_mocks/` use Tailwind for rapid mock prototyping only.
   - Production implementation MUST be pure **Object-Oriented CSS (OCSS)** using CSS Custom Properties defined in `tokens.css`.
   - Never install Tailwind, PostCSS, or CSS-in-JS build chains.

3. **NO Runtime Backend Runtimes or Databases in Production:**
   - Strictly zero PHP, databases (MySQL, Postgres), or Node server processes at runtime.
   - Everything compiles to 100% static HTML, CSS, JS, and JSON assets served over a CDN.

4. **Zero Border Radius & Strict Shape System:**
   - Border radius is strictly `0px` across all buttons, cards, containers, inputs, and image frames.
   - Avoid rounded badges, pills, or bubbly cards.

5. **HTML-First SSR/SSG Parity (No-JS Fallbacks):**
   - Dynamic sections (such as "Notes from the Field" and initial Compass states) must render semantic static HTML at build time so the page is 100% complete and crawlable before client-side JavaScript executes.

