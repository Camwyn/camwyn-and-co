# Agent Guidelines & Operational Protocol: Camwyn & Co

This document defines the operational rules, execution environment, and architectural guardrails for AI agents working in the **Camwyn & Co.** codebase.

---

## 1. Git Commit & Push Protocol

* **Atomic Commits:** Agents have a **free hand** to make frequent, small, atomic git commits as logical milestones or refactoring steps are completed.
* **Commit Message Format:** Use structured Conventional Commits (e.g., `feat(compass): ...`, `fix(a11y): ...`, `docs(adr): ...`, `refactor(ocss): ...`).
* 🚨 **STRICT PUSH RESTRICTION:** **Agents must NEVER execute `git push` under any circumstances.** Pushing to remote repositories and triggering CI/CD deployment pipelines is strictly reserved for the human developer.
* **Host Execution for Git:** Always execute git commands (`git status`, `git add`, `git commit`, `git diff`) on the Windows host shell, not inside the Lando container.

---

## 2. Containerized Execution Environment (Lando on Windows)

* **Host Environment:** Windows 11 / Windows PowerShell.
* **Container Runtime:** The Node.js build system is containerized via Lando (`appserver` service, `type: node:20`).
* **Command Routing:** Run containerized commands using Lando tooling or `lando ssh`:
  * Build static site: `lando build` or `lando 11ty`
  * Run test suite: `lando test`
  * Run site integrity audit: `lando test:integrity`
  * Run accessibility audit: `lando test:a11y`
  * Install dependencies: `lando npm install <pkg> --save-dev`
  * Direct execution: `lando ssh -s appserver -c "<command>"`
* **PowerShell Quoting Guardrails:** When executing commands containing quotes inside `lando ssh`, use proper nesting:
  * Preferred: `lando ssh -s appserver -c 'npm run test:integrity'`
  * Avoid unescaped double quotes inside double quotes.
* **Non-Interactive Execution:** Always supply `-y` flags for operations that might prompt for confirmation. Never run commands that block waiting for interactive stdin.
* **Local Development Domain:** `https://camwyn-and-co.lndo.site` (proxy port configured via `.lando.yml` and `.eleventy.js`). Do not append `:8080` in browsers.

---

## 3. Anti-Scope Creep Guardrails

1. **NO Heavy JavaScript Frameworks or Virtual DOMs:**
   * Reject proposals to introduce React, Vue, Svelte, Angular, Solid, or Astro runtimes.
   * All client-side reactivity MUST remain strictly in lightweight **Alpine.js (v3.x)** (< 20KB gzipped).
2. **NO Tailwind CSS or PostCSS in Production:**
   * The mockups in `digital_identity_mocks/` use Tailwind for rapid design prototyping only.
   * Production styles MUST be written in **Pure Object-Oriented CSS (OCSS)** using CSS Custom Properties (`var(--...)`) in `src/css/`.
3. **NO Runtime Backend Services or Databases:**
   * Strictly zero PHP, databases (MySQL, Postgres), or Node server processes at runtime.
   * Everything compiles to 100% static HTML, CSS, JS, and JSON assets served over a CDN.
4. **Strict 0px Border Radius:**
   * Border radius is strictly `0px` across all buttons, cards, containers, inputs, and image frames to maintain the architectural "printed book / atelier workshop" aesthetic.
5. **HTML-First SSR/SSG Parity:**
   * Dynamic components (Adventure Compass, Notes from the Field, filter pills) MUST render complete, valid default HTML at build time so the site is 100% crawlable and functional before client-side JS executes.
6. **Mandatory Section Header IDs for Deep Linking:**
   * All major section headers (`<h2>`, `<h3>`) in Nunjucks templates (`src/*.njk`), specifications, and legal pages MUST include human-readable, kebab-case `id` attributes (e.g., `<h2 id="formspree">...</h2>`).
   * Markdown files automatically receive slugified heading IDs via our Markdown-it pipeline in `.eleventy.js`.
   * This ensures persistent deep-linking and direct cross-referencing between pages (such as Colophon to Privacy).

---

## 4. CSS Architecture & Naming Conventions (Pure OCSS)

Styles in `src/css/` follow the OCSS layered structure:
* `01-settings/tokens.css`: Design tokens (colors, typography scales, spacing). Never hardcode raw hex values in components.
* `02-objects/`: Layout primitives (`.o-container`, `.o-grid`, `.o-stack`, `.o-cluster`).
* `03-components/`: Visual modules (`.c-sidenav`, `.c-compass`, `.c-note-card`, `.c-project-row`, `.c-btn`).
* `04-utilities/`: Single-purpose helpers (`.u-text-clay`, `.u-visually-hidden`, `.u-mb-md`).
* **State Classes:** Alpine.js MUST toggle semantic `.is-*` classes (e.g. `:class="{ 'is-active': active }"`), never direct inline styles.

---

## 5. Automated Verification & Testing Commands

Before concluding any feature or refactoring task, execute the full verification suite:

```bash
# Run full static compilation + site integrity + a11y audit
lando test

# Run site integrity suite (validates RSS feed.xml, sitemap, schemas, matrices, dead links)
lando test:integrity

# Run Axe-core DOM accessibility suite across 100% of generated HTML pages
lando test:a11y
```

---

## 6. Voice and Tone Governance for Generated Content

All agent-generated prose, dispatches, UI copy, and documentation must adhere to the **Workbench & Table** editorial identity detailed in [`CONTEXT.md`](file:///c:/Users/camwy/Projects/camwyn-and-co/CONTEXT.md) and [`digital_identity_mocks/DESIGN.md`](file:///c:/Users/camwy/Projects/camwyn-and-co/digital_identity_mocks/DESIGN.md):
* **Smart can be warm:** Clear, hospitable, jargon-free explanations.
* **Ambition can have soul:** Grounded in human memory, long-term purpose, and relationships.
* **Serious work can still be fun:** Respectful of engineering discipline with room for curiosity.
* 🚫 **No frantic urgency, corporate buzzwords, or artificial conversion funnels.**

---

## 7. Documentation Boundary & Knowledge Management (Repo vs. Obsidian)

To keep the codebase lean while maintaining complete second-brain knowledge:

* **In the Git Repository (AND in Obsidian):**
  * **Code notes, technical specifications, and Architectural Decision Records (ADRs)** belong in the repo (`docs/adr/`, codebase comments, architecture docs) **AND** must always be synced to Obsidian.
* **Exclusively in Obsidian (The Second/Shared Brain):**
  * **Higher-level strategy, brand positioning, post scheduling/distribution strategies, marketing plans, and venture concepts** belong **ONLY in Obsidian** (`Areas/00 Camwyn & Co/`, `Areas/04 Poetic Entanglement/`, etc.).
  * **Pre-release dispatch drafts & embargoed content** should remain in Obsidian until their scheduled launch date, rather than committing unreleased draft prose to the public repository.
  * Do not clutter the code repository with high-level strategic or editorial planning documents.

