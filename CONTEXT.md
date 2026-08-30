# Camwyn & Co — Domain Context & Ubiquitous Language Glossary

This document serves as the authoritative domain model, vocabulary, and architectural context for **Camwyn & Co.** under the Pocock AI workflow. It defines the ubiquitous language shared across templates, data matrices, and agent-generated content.

---

## 1. Domain Overview & Philosophy

**Camwyn & Co.** is an independent house of projects, ventures, experiments, and worthwhile adventures founded on the conviction that:
* **Smart can be warm:** Technical precision and operational depth should be expressed with hospitality, clarity, and care.
* **Ambition can have soul:** Commercial and creative projects are rooted in long-term purpose, relationships, land, and memory.
* **Serious work can still be fun:** Rigorous craft and disciplined engineering coexist naturally with curiosity and unscripted discovery.

### Production Environment & Identifiers
* **Canonical Production Domain:** `https://camwyn.com` (Note: the live domain is `camwyn.com`, *not* `camwynandco.com`).
* **Contact Email:** `hello@camwyn.com`
* **Local Development Domain:** `https://camwyn-and-co.lndo.site`

---

## 2. Ubiquitous Language & Domain Entities

### The House (Camwyn & Co.)
The parent entity that stewards creative ventures, hospitality initiatives, and digital/physical experiments.

### The Operating Ventures
The three core operating expressions of the House:
1. **Mema's Inclination (`/what-we-do/` & `https://memas-inclination.com`):** Hospitality, physical land stewardship, heritage livestock, seasonal tables, and family gatherings. The heart of family operations.
2. **Creative Work (`/what-we-do/` & `https://poeticentanglement.com`):** Brand architecture, narrative strategy, editorial direction, typography, and publication for purposeful ventures.
3. **The Next Thing (`/the-next-thing/`):** A permanent open door for emerging collaborations, experimental sparks, and unmapped adventures. Features a guided project intake form.

### The Adventure Compass (`/compass/` & Homepage Widget)
An interactive 5-question discovery widget that helps visitors discover their personal creative archetype and tailors site dispatches, 404 guidance, navigation permalinks, and venture resonance to their perspective.

### The 5 Archetypes (`src/_data/compass.json`)
The five canonical creative profiles recognized across the site:
1. **The Gatherer (`gatherer`):**
   * *Icon:* Leaf (`leaf`)
   * *Gift:* "You bring warmth to good company."
   * *Tagline:* "Rooted in hospitality, generous tables, and shared stories."
   * *Field Prompt:* "Pull up a chair to our table notes and family recipes."
   * *Life Prompt:* "Invite two people who should know each other to share a meal."
2. **The Explorer (`explorer`):**
   * *Icon:* Landscape (`landscape`)
   * *Gift:* "You bring possibility to good company."
   * *Tagline:* "Drawn to untraveled roads and open possibilities."
   * *Field Prompt:* "Seek out uncharted notes and open-ended experiments."
   * *Life Prompt:* "Take the unfamiliar route and document one thing you nearly missed."
3. **The Craftsman (`craftsman`):**
   * *Icon:* Brush (`brush`)
   * *Gift:* "You bring shape to good ideas."
   * *Tagline:* "Driven by care, fine lines, and the patience of the workshop."
   * *Field Prompt:* "Inspect our workbench dispatches and making-of notes."
   * *Life Prompt:* "Make the smallest real version of an idea you keep postponing."
4. **The Catalyst (`catalyst`):**
   * *Icon:* Bolt (`bolt`)
   * *Gift:* "You bring momentum to good ideas."
   * *Tagline:* "Sparking action, cross-pollinating ideas, and defying inertia."
   * *Field Prompt:* "Explore active collaborations and in-progress ventures."
   * *Life Prompt:* "Send the message that could start something worthwhile."
5. **The Storykeeper (`storykeeper`):**
   * *Icon:* Key (`key`)
   * *Gift:* "You bring meaning to good company."
   * *Tagline:* "Recording, remembering, and passing on good ideas."
   * *Field Prompt:* "Explore our chronicles and recorded stories."
   * *Life Prompt:* "Ask someone you love for a story you have never heard."

### Field Notes & Dispatches (`src/notes/` & `/notes/`)
Editorial essays, workbench notes, and table dispatches authored in Markdown with YAML frontmatter. Tagged by category and archetype, searchable via client-side full-text index, and syndicated via RSS (`/feed.xml`).

### Colophon (`/colophon/`)
A dedicated atelier specification page detailing the typography stack (*DM Serif Display*, *Hanken Grotesk*, *JetBrains Mono*), design tokens, iconography attributions (*Metrize Circled Icons*), and accessibility standards.

---

## 3. Voice and Tone Governance for AI Agents

When autonomous agents generate copy (such as Field Note drafts, system dispatches, dynamic UI copy, or automated summaries), text must strictly adhere to the Camwyn & Co. editorial identity:

### Core Editorial Principles
* **Smart can be warm:** Explain technical concepts, software architectures, or operational systems using clear, welcoming, accessible prose. Avoid dense corporate jargon (*"synergy," "paradigm shift," "disruption"*).
* **Ambition can have soul:** Emphasize human context, long-term purpose, memory, and relationships over throughput, vanity metrics, or raw output.
* **Serious work can still be fun:** Treat craft and engineering discipline with deep respect, while maintaining curiosity and the joy of experimentation.

### Lexicon & Imagery
* **Workbench & Table Imagery:** Favor grounded metaphors—such as *workbench dispatches, joinery vs. lacquer, off-cuts, worn wooden mallets, structural shoring, and generous tables*.
* **Care Over Polish:** Frame quality as structural durability rather than superficial shine (*"Durability lives in the joints, not the lacquer"*).
* **Useful Over Impressive:** Focus on real-world utility, clear solutions, and unhurried dispatches rather than aggressive sales pitches or conversion hype.

### Prohibited Copy Patterns
* 🚫 **No Frantic Urgency:** Avoid artificial scarcity or aggressive hype (*"Don't miss out," "Act now," "Game-changing"*).
* 🚫 **No Corporate Boilerplate:** Avoid sterile tech-marketing buzzwords (*"We leverage synergistic frameworks to optimize omnichannel engagement"*).
* 🚫 **No Staccato Fragmentation:** Avoid breaking prose into artificial single-line bulleted lists when cohesive paragraph flow is more natural.

---

## 4. Architectural Invariants

1. **Pure Jamstack (SSG):** Eleventy compiles 100% of templates into static HTML/CSS/JS in `_site/`. Zero runtime node/PHP/DB processes.
2. **HTML-First SSR/SSG Parity:** Every page renders fully formed HTML at build time so search crawlers and non-JS clients have complete access before client-side hydration.
3. **Pure Object-Oriented CSS (OCSS):** Token-driven styling in `src/css/` utilizing native CSS Custom Properties. Strictly zero Tailwind or PostCSS build steps in production.
4. **Strict 0px Border Radius:** All buttons, cards, containers, inputs, and image frames strictly maintain `border-radius: 0px` to preserve the architectural, printed-book aesthetic.
5. **Lightweight Reactivity:** Client-side state is strictly limited to Alpine.js (<20KB gzipped) and persisted in `localStorage` via `@alpinejs/persist`.
