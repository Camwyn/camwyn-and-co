# ADR 0005: Six-Archetype Compass Matrix and Centralized Data Architecture

* **Status:** Accepted (Updated)
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

The Camwyn & Co. ecosystem encompasses diverse initiatives—hospitality, creative writing, craft, momentum-building, storytelling, and systems engineering. To guide visitors to the dispatches, projects, and collaboration channels most relevant to them, we designed the **Adventure Compass**.

The model spans six canonical archetypes (*Gatherer*, *Explorer*, *Craftsman*, *Catalyst*, *Storykeeper*, and *Architect*). To eliminate brittle template conditionals and prevent hunt-and-peck maintenance when adding or updating archetypes, all archetype-specific content is centralized exclusively within structured data files (`src/_data/`).

## Decision

1. **Six Canonical Archetypes (`src/_data/compass.json`):**
   * **The Gatherer (`gatherer` / `leaf`):** Hospitality, long tables, warmth in good company.
   * **The Explorer (`explorer` / `landscape`):** Untraveled roads, curiosity, open possibilities.
   * **The Craftsman (`craftsman` / `brush`):** Workshop patience, durable joinery, fine lines.
   * **The Catalyst (`catalyst` / `bolt`):** Sparking action, partnerships, momentum.
   * **The Storykeeper (`storykeeper` / `key`):** Recording, remembering, finding meaning in ordinary moments.
   * **The Architect (`architect` / `rules`):** Blueprints, system dependencies, workflow logic, and load-bearing scalability.
2. **Centralized Archetype Data Model:**
   * Each archetype entry in `compass.json` encapsulates all contextual UI copy: `id`, `name`, `icon`, `gift`, `tagline`, `description`, `lifePrompt`, `fieldPrompt`, `dispatchTag`, `partnership` (for `/our-story/`), and `notFound` (for `/404.html`).
   * No template (e.g. `our-story.njk`, `404.njk`, `notes.njk`, `workshop-table.njk`) contains hardcoded archetype maps or static lists.
3. **Six-Way Venture Resonance (`src/_data/ventures.json`):** All 3 operating ventures (*Mema's Inclination*, *Creative Work*, *The Next Thing*) define specific resonance copy for all six archetypes, which dynamically highlights on `/what-we-do/`.
4. **21-Pairing Chemistry Matrix (`src/_data/chemistry.json`):** All pairs ($6 \times 7 / 2 = 21$) of instincts are cataloged with collaborative dynamics, friction watch-outs, and ideal project fits.
5. **Archetype-Aware Nav, CTA & 404:** The global sidenav (`src/_includes/sidenav.njk`) transforms the generic "Your Compass" item into a personalized badge linking to `/compass/:id/`, the footer CTA personalizes via `cta.json`, and `/404.html` displays warm, archetype-tailored error guidance.

## Consequences

### Positive
* **Zero Template Code Changes for New Archetypes:** Adding or modifying an archetype requires only data edits in `src/_data/` without hunting through Nunjucks templates.
* **100% Dynamic Build:** 11ty collections (`latestNotesByArchetype`), filters (`archetypeTag`, `archetypeIcon`), Alpine stores, and tests adapt automatically to whatever archetypes exist in `compass.json`.
* **Automated Data Contract Verification:** `scripts/site-integrity-test.js` enforces that all configured archetypes meet 100% of data contract requirements.

### Negative / Trade-offs
* **Content Authoring Discipline:** Adding an archetype requires authoring its complete data suite across `compass.json`, `cta.json`, `ventures.json`, and `chemistry.json`.

## Alternatives Considered
* **Hardcoded Template Conditionals:** Rejected as error-prone and unmaintainable.
* **Binary Personality Quiz:** Rejected as too reductive.
