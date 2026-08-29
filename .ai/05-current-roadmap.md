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
- [x] Create automated DOM test runner (`scripts/a11y-audit.js`) verifying Axe rules and WCAG 2.1 contrast formulas.
- [x] Configure `test` and `test:a11y` tooling commands in `.lando.yml` and `package.json`.

---

## Milestone 3: OCSS Design System Implementation (`src/css/`) (Completed)
- [x] Implement full earthy palette in `tokens.css` with verified WCAG 2.1 AA/AAA contrast ratios.
- [x] Create `02-objects/` layout primitives (`layout.css`, `stack.css`).
- [x] Create `03-components/` styles (`nav.css`, `hero.css`, `compass.css`, `note-card.css`, `project-row.css`, `article.css`, `form.css`, `footer.css`).
- [x] Create `04-utilities/` (`typography.css`, `spacing.css`).

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

## Milestone 6: Automated Verification & A11y Audit (Completed)
- [x] Run `lando test` to verify clean static compilation across all 22 pages.
- [x] Verify zero Axe-core DOM accessibility violations and 100% WCAG 2.1 AA/AAA color contrast.
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

---

## Milestone 11: Future Horizons & Enhancements (Planned)
- [ ] **Form Submission Backend**: Connect "The Next Thing" intake form to an active email or webhook endpoint (e.g., Netlify Forms, Formspree, or custom server endpoint).
- [ ] **RSS / Atom Feed**: Generate `src/feed.xml` for blog readers and syndication.
- [ ] **SEO & Indexing**: Add `sitemap.xml` and `robots.txt` generation.
- [ ] **Search & Tagging**: Add client-side search or tag filtering across long-form field notes.
