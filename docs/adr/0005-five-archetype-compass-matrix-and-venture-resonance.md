# ADR 0005: Five-Archetype Compass Matrix and Venture Resonance

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

The Camwyn & Co. ecosystem encompasses diverse initiatives—hospitality, creative writing, craft, momentum-building, and storytelling. To guide visitors to the dispatches, projects, and collaboration channels most relevant to them, we designed the **Adventure Compass**.

The initial four-archetype model (*Gatherer*, *Explorer*, *Craftsman*, *Catalyst*) was expanded to five archetypes with the formal addition of **The Storykeeper**, reflecting the crucial role of long-term memory, chronicles, and passing down good tales.

## Decision

1. **Five Canonical Archetypes (`src/_data/compass.json`):**
   * **The Gatherer (`gatherer` / `leaf`):** Hospitality, long tables, warmth in good company.
   * **The Explorer (`explorer` / `landscape`):** Untraveled roads, curiosity, open possibilities.
   * **The Craftsman (`craftsman` / `brush`):** Workshop patience, durable joinery, fine lines.
   * **The Catalyst (`catalyst` / `bolt`):** Sparking action, partnerships, momentum.
   * **The Storykeeper (`storykeeper` / `key`):** Recording, remembering, finding meaning in ordinary moments.
2. **Matrix Scoring Protocol:** The 5-question multi-step quiz tallies user selections across the 5 archetypes and computes the dominant match with tie-breaking defaults.
3. **Five-Way Venture Resonance (`src/_data/ventures.json`):** All 3 operating ventures (*Mema's Inclination*, *Creative Work*, *The Next Thing*) define specific resonance copy for all five archetypes, which dynamically highlights on `/what-we-do/`.
4. **Archetype-Aware Nav & 404:** The global sidenav (`src/_includes/sidenav.njk`) transforms the generic "Your Compass" item into a personalized badge linking to the visitor's archetype permalink, and `/404.html` displays warm, archetype-tailored error guidance.

## Consequences

### Positive
* **Rich Domain Consistency:** Single source of truth in `src/_data/compass.json` and `src/_data/ventures.json` powers the quiz, share pages, dispatches filter, and venture resonance.
* **Engaging Editorial Personalization:** Visitors receive tailored field prompts and venture perspectives without intrusive user tracking.

### Negative / Trade-offs
* **Content Authoring Discipline:** Adding a new venture requires authoring distinct resonance notes for all five archetypes.

## Alternatives Considered
* **Binary Personality Quiz:** Rejected as too reductive.
* **Complex Multi-Dimensional Psychometrics:** Rejected to avoid heavy client calculations and maintain approachable, generous tone.
