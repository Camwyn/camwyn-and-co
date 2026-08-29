# Current Roadmap & Milestones: Camwyn & Co

## Milestone 1: AI Infrastructure & Guardrails (Completed)
- [x] Establish `.agentskills/lando-execution/SKILL.md` (Windows PowerShell & Lando routing).
- [x] Establish `.agentskills/scope-guardrails/SKILL.md` (Anti-scope creep directives).
- [x] Establish `.agentskills/ocss-architecture/SKILL.md` (Pure OCSS conventions).
- [x] Establish `.agentskills/alpine-store-patterns/SKILL.md` (Alpine store & persistence patterns).
- [x] Establish `.agentskills/a11y-audit/SKILL.md` (A11y, Axe-Core & WCAG standards).
- [x] Establish `.ai/` living documentation (`00-prd.md` through `05-current-roadmap.md`).

---

## Milestone 2: Automated Testing & Tooling Setup (Completed)
- [x] Install `pa11y-ci`, `axe-core`, and `jsdom` into `package.json` devDependencies.
- [x] Create automated DOM test runner (`scripts/a11y-audit.js`) verifying Axe rules and WCAG 2.1 contrast formulas across 100% of all generated HTML pages.
- [x] Create site integrity test runner (`scripts/site-integrity-test.js`) verifying JSON-LD schemas, search index completeness, dead links, missing images, XML feeds, and Compass scoring matrices.
- [x] Configure `test`, `test:integrity`, and `test:a11y` tooling commands in `.lando.yml` and `package.json`.

---

## Milestone 3: OCSS Design System Implementation (`src/css/`) (Completed)
- [x] Implement full earthy palette in `tokens.css` with verified WCAG 2.1 AA/AAA contrast ratios.
- [x] Create `02-objects/` layout primitives (`layout.css`, `stack.css`).
- [x] Create `03-components/` styles (`nav.css`, `hero.css`, `compass.css`, `note-card.css`, `project-row.css`, `article.css`, `form.css`, `footer.css`).
- [x] Create `04-utilities/` (`typography.css`, `spacing.css`, `print.css`).

---

## Milestone 4: JSON Data Matrices & Alpine Store Integration (Completed)
- [x] Create `src/_data/compass.json` (5 questions, archetype scoring matrices, archetype profiles).
- [x] Create `src/_data/compassArchetypes.js` (Eleventy collection helpers).
- [x] Create `src/_data/site.json` (metadata & navigation).
- [x] Initialize `Alpine.store('compass', ...)` with `@alpinejs/persist` in `base.njk` for instant client-side state hydration.

---

## Milestone 5: Core Pages & Layouts (Completed)
- [x] Build `src/_includes/` partials (`sidenav.njk`, `compass.njk`, `field-notes.njk`, `projects-list.njk`, `footer.njk`, `note.njk`).
- [x] Assemble `src/index.njk` (Homepage with interactive Adventure Compass & latest archetype notes).
- [x] Assemble `src/our-story.njk` (Our Story editorial view).
- [x] Assemble `src/what-we-do.njk` (Ventures and project deep-dives).
- [x] Assemble `src/compass-share.njk` (Dedicated archetype permalinks).

---

## Milestone 6: Automated Verification & 100% Corpus A11y Audit (Completed)
- [x] Run `lando test` to verify clean static compilation across all 24 production pages.
- [x] Verify zero Axe-core DOM accessibility violations and 100% WCAG 2.1 AA/AAA color contrast across all routes.
- [x] Execute 780+ automated site integrity assertions on dead links, media assets, XML feeds, and structured data.
- [x] Keyboard navigation, focus states, skip-links, and responsive testing.

---

## Milestone 7: Field Notes Markdown Engine & WordPress Migration (Completed)
- [x] Establish markdown blog architecture in `src/notes/` with Eleventy collections.
- [x] Migrate and convert 7 legacy WordPress essays into clean markdown frontmatter.
- [x] Copy and configure passthrough for media assets (`src/wp-content/uploads/`).
- [x] Build dedicated Field Notes archive (`/notes/`) with interactive Alpine archetype filter pills (`role="group"`).
- [x] Restrict homepage *"Notes from the field"* section to the single most recent note per archetype with link to full archive.
- [x] Configure `markdown-it` parser to automatically append `target="_blank" rel="noopener noreferrer"` to external links.

---

## Milestone 8: Universal Social Sharing & Native Web Share (Completed)
- [x] Create 1200×630px SVG Open Graph card templates for each archetype and note.
- [x] Integrate Alpine.js Native Web Share API (`navigator.share`) with fallback clipboard copy.
- [x] Add Open Graph and Twitter Card metadata to all templates.

---

## Milestone 9: "The Next Thing" Guided Project Intake Form (Completed)
- [x] Build `/the-next-thing/` intake page with custom form controls.
- [x] Non-blocking optional user perspective question with pre-filled compass archetype.
- [x] Needed-energy archetype selector cards including *"A Mix / Not Sure Yet"* option.
- [x] Interactive success banner and reset flow.

---

## Milestone 10: CI/CD Pipeline & Production Infrastructure (Completed)
- [x] Build GitHub Actions workflow (`.github/workflows/deploy.yml`) utilizing `actions/checkout@v6`, Node 22, and `SamKirkland/FTP-Deploy-Action@v4.4.0`.
- [x] Configure safe FTP synchronization preserving existing server directories (`dangerous-clean-slate: false`).
- [x] Add path-filtering on push triggers (`src/**`, `.eleventy.js`, dependencies, scripts) to optimize CI/CD runs.
- [x] Untrack `.lando.yml` and harden `.gitignore` against keys, secrets, local configs, and temporary dumps.
- [x] Configure external venture and markdown links to automatically open in new tabs with `target="_blank" rel="noopener noreferrer"`.

---

## Milestone 11: SEO, Syndication & Structured Data (Completed)
- [x] **SEO & Indexing**: Add dynamic `sitemap.xml` and `robots.txt` generation across all site routes.
- [x] **RSS / Atom Feed**: Generate `src/feed.xml` for blog readers and syndication, auto-discovery in `<head>`, and footer link.
- [x] **JSON-LD Organization & WebSite Schema**: Embed rich schema on homepage defining Camwyn & Co. as an independent house of projects.
- [x] **JSON-LD Article / BlogPosting Schema**: Embed rich schema in field note layouts (`note.njk` and `layouts/post.njk`) with headline, dates, author, and publisher data for rich search snippets.
- [x] Set canonical site URL to `https://camwyn.com`.

---

## Milestone 12: Search, Discovery & Dynamic Personalization (Completed)
- [x] **Static Search Index Auto-Generation**: Generate a lightweight `/search-index.json` during the Eleventy build step containing cleaned full-text bodies, excerpts, and metadata across all dispatches.
- [x] **Full-Text Live Search**: Alpine lazy-loads the index on search focus/typing to perform instant client-side full-text searches with zero external dependencies.
- [x] **Archetype Icons**: Embed visual Metrize icons on filter buttons with adaptive dark/light inversion styles (`.c-btn__icon`).
- [x] **Archetype Pre-Selection**: Automatically pre-select the visitor's Compass archetype on `/notes/` from `$store.compass` / `localStorage`.
- [x] **Dynamic Eyebrow**: Display archetype-tailored subtitle (`"Showing dispatches tailored for The Explorer (Your Archetype)"`) reflecting current active filter and user perspective.
- [x] **Robust DOM & URL Matching**: Match cards by URL and archetype, avoiding quote escaping errors and supporting full-text query matches.

---

## Milestone 13: Responsive Editorial Polish & ASCII Diagrams (Completed)
- [x] **Responsive Code Blocks**: Add horizontal touch-scrolling (`overflow-x: auto; -webkit-overflow-scrolling: touch;`) and container containment to `.c-article__body pre` to keep wide ASCII architecture diagrams (e.g. The Threshold Protocol) responsive on mobile viewports.
- [x] Add design system styling tokens to code and preformatted elements.

---

## Milestone 14: Contextual Archetype-Aware 404 Experience (Completed)
- [x] **Adaptive 404 Page**: Build `/404.html` with personalized error copy, eyebrow, and CTAs tailored to the visitor's stored archetype (*Explorer*, *Craftsman*, *Gatherer*, *Catalyst*, *Storykeeper*) with warm fallback.
- [x] Fully integrated with OCSS design system tokens and buttons.

---

## Milestone 15: Craftsman Colophon & Atelier Spec (Completed)
- [x] **Colophon Page**: Create dedicated `/colophon/` page documenting the engineering stack (Eleventy, Alpine.js, Pure OCSS), typography scale (DM Serif Display, Hanken Grotesk, JetBrains Mono), design philosophy (Generous Minimalism / Atelier Narrative), and accessibility standards.
- [x] **Iconography Attribution**: Attribute Metrize Circled Icons by Alessio Atzeni with live visual specimen cards.
- [x] **Footer Navigation & A11y Audit**: Add Colophon link to global footer and include in automated WCAG accessibility test runner (27 static pages verified).

---

## Milestone 16: Intake Form Backend & Formspree Integration (Completed)
- [x] **Form Submission Backend**: Connect "The Next Thing" intake form to Formspree (`src/_data/site.json` -> `formspreeEndpoint`).
- [x] **Spam Mitigation**: Add a hidden honeypot field (`<input type="text" name="_gotcha" style="display:none !important">`) to trap bots without annoying visitors with CAPTCHAs.
- [x] **Fallback Progressive Enhancement**: Form gracefully degrades and submits natively via standard HTTP POST if JavaScript is disabled or blocked.
- [x] **Accessibility (a11y)**: All inputs maintain explicit `<label for="...">` associations, high-contrast focus rings, and accessible live error alerts (`role="alert"`).
- [x] **Client-Side Async State**: Alpine handles asynchronous JSON submission with loading indicators, inline error handling, and branded confirmation view with reset flow.   
