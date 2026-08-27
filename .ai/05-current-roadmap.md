# Current Roadmap & Milestones: Camwyn & Co

## Milestone 1: AI Infrastructure & Guardrails (Completed)
- [x] Establish `.agentskills/lando-execution/SKILL.md` (Windows PowerShell & Lando routing).
- [x] Establish `.agentskills/scope-guardrails/SKILL.md` (Anti-scope creep directives).
- [x] Establish `.agentskills/ocss-architecture/SKILL.md` (Pure OCSS conventions).
- [x] Establish `.agentskills/alpine-store-patterns/SKILL.md` (Alpine store & persistence patterns).
- [x] Establish `.agentskills/a11y-audit/SKILL.md` (A11y, Axe-Core & WCAG standards).
- [x] Establish `.ai/` living documentation (`00-prd.md` through `05-current-roadmap.md`).

---

## Milestone 2: Automated Testing & Tooling Setup
- [ ] Install `pa11y-ci` and `@axe-core/cli` into `package.json` devDependencies.
- [ ] Create `.pa11yci.json` test runner configuration.
- [ ] Configure `test` and `test:a11y` tooling commands in `.lando.yml`.

---

## Milestone 3: OCSS Design System Implementation (`src/css/`)
- [ ] Implement full palette in `tokens.css` with verified WCAG 2.1 AA/AAA contrast ratios.
- [ ] Create `02-objects/` layout primitives (`layout.css`, `stack.css`).
- [ ] Create `03-components/` styles (`nav.css`, `hero.css`, `compass.css`, `note-card.css`, `project-row.css`).
- [ ] Create `04-utilities/` (`typography.css`, `spacing.css`).

---

## Milestone 4: JSON Data Matrices & Alpine Store Integration
- [ ] Create `src/_data/compass.json` (5 questions, options, archetypes).
- [ ] Create `src/_data/fieldNotes.json` (editorial dispatches tagged by archetype).
- [ ] Create `src/_data/site.json` (metadata & navigation).
- [ ] Initialize `Alpine.store('compass', ...)` with `@alpinejs/persist` in `base.njk`.

---

## Milestone 5: Layouts, Partials & Page Delivery
- [ ] Build `src/_includes/` partials (`sidenav.njk`, `compass.njk`, `field-notes.njk`, `projects-list.njk`, `footer.njk`).
- [ ] Assemble `src/index.njk` (Homepage with full interactive compass & field notes).
- [ ] Assemble `src/our-story.njk` (Our Story editorial view).
- [ ] Assemble `src/what-we-do.njk` (What We Do venture deep-dives).

---

## Milestone 6: Automated Verification & A11y Audit
- [ ] Run `lando 11ty` to verify clean static compilation.
- [ ] Run `lando test:a11y` to verify zero Axe/Pa11y accessibility violations.
- [ ] Manual verification of keyboard navigation, persistence across reloads, and mobile responsiveness.

