# Camwyn & Co

> **An Independent House of Projects**  
> *Big ideas. Good company.*  
> Canonical Production: [https://camwyn.com](https://camwyn.com)

---

## The Atelier & The Workbench

Camwyn & Co is the home of **Mema's Inclination**, **Creative Work / Poetic Entanglement**, and **The Next Thing**—a growing family of ventures, hospitality spaces, physical land stewardship, and digital experiments.

We believe that:
* **Smart can be warm:** Technical precision and operational depth should be expressed with hospitality, clarity, and care.
* **Ambition can have soul:** Commercial and creative projects are rooted in long-term purpose, relationships, land, and memory.
* **Serious work can still be fun:** Rigorous craft and disciplined engineering coexist naturally with curiosity and unscripted discovery.

This repository is the living digital workshop for the static site at [camwyn.com](https://camwyn.com). We maintain it in the open because we believe in the patience of the workshop floor, the dignity of visible craftsmanship, and the beauty of software built to endure without bloat or artificial urgency.

---

## Architectural Guardrails & Tech Stack

The site is engineered around durable, web-standard primitives:

1. **Static Site Generation:** Built with [Eleventy (11ty)](https://www.11ty.dev/) v3. Compiles 100% static HTML, CSS, and JSON assets served over a CDN with zero runtime server containers, zero databases, and zero serverless cold starts.
2. **Zero Heavy JavaScript Frameworks:** No React, Vue, Svelte, or Virtual DOM. Client-side reactivity is strictly powered by lightweight [Alpine.js](https://alpinejs.dev/) (< 20KB gzipped) with full server-side rendering parity.
3. **Pure Object-Oriented CSS (OCSS):** Written by hand with CSS Custom Properties (`var(--...)`) in `src/css/`. Strictly zero Tailwind CSS or PostCSS processing in production.
4. **Architectural 0px Border Radius:** A deliberate `0px` radius across all cards, buttons, dialogs, inputs, and image frames, evoking the timeless quality of printed book craft and atelier workbenches.
5. **Rigorous Automated Accessibility:** Automated [Axe-core](https://github.com/dequelabs/axe-core) and [Pa11y](https://pa11y.org/) CI suites enforcing 100% WCAG 2.1 AA/AAA compliance and color contrast across every compiled route.

For in-depth technical rationales, see our [Architectural Decision Records](docs/adr/):
* [ADR 0001: Jamstack SSG with Eleventy & Alpine](docs/adr/0001-jamstack-ssg-with-eleventy-and-alpine.md)
* [ADR 0002: Pure OCSS Design System and Zero Border Radius](docs/adr/0002-pure-ocss-design-system-and-zero-border-radius.md)
* [ADR 0003: Automated Accessibility & Axe-core Testing](docs/adr/0003-automated-accessibility-and-axe-core-testing.md)
* [ADR 0004: Client-Side State Persistence & SSR Fallback](docs/adr/0004-client-side-state-persistence-and-ssr-fallback.md)
* [ADR 0005: Six Archetype Compass Matrix & Venture Resonance](docs/adr/0005-five-archetype-compass-matrix-and-venture-resonance.md)
* [ADR 0006: Static Search Index & Field Notes Markdown Engine](docs/adr/0006-static-search-index-and-field-notes-markdown-engine.md)
* [ADR 0007: Formspree Project Intake with Honeypot Spam Mitigation](docs/adr/0007-formspree-intake-with-honeypot-spam-mitigation.md)
* [ADR 0008: CI/CD FTP Deployment Pipeline & Git Governance](docs/adr/0008-ci-cd-ftp-deployment-pipeline-and-git-push-governance.md)

---

## Directory Structure

```text
camwyn-and-co/
├── .agents/               # AI agent skills & operational context
├── .github/workflows/     # Automated test & deployment pipeline
├── docs/                  # Architectural Decision Records (ADRs) & project history
├── digital_identity_mocks/# Design prototypes & visual specifications
├── scripts/               # Automated site integrity & accessibility test runners
├── src/
│   ├── _data/             # JSON data matrices (Compass archetypes, chemistry, ventures)
│   ├── _includes/         # Modular Nunjucks layout templates & components
│   ├── assets/            # Fonts, SVG icons, rasterized social open-graph cards
│   ├── css/               # Layered OCSS (01-settings, 02-objects, 03-components, 04-utilities)
│   ├── notes/             # Markdown Field Notes & dispatches
│   └── wp-content/        # Media archives from historic dispatches
├── .eleventy.js           # Eleventy configuration, custom filters & Markdown-it rules
└── package.json           # Development scripts & testing harnesses
```

---

## Local Development

The development environment is containerized via [Lando](https://lando.dev/) (Node 20), but can also run directly with Node.js on your host system:

### Using Lando (Recommended)
```bash
# Start container environment
lando start

# Start Eleventy development server (https://camwyn-and-co.lndo.site)
lando dev

# Run static site compilation
lando build

# Run site integrity and accessibility audit suite
lando test
```

### Using Host Node.js
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:8080)
npm run dev

# Run compilation and test suite
npm test
```

---

## Repository Governance & Interactions

This repository is maintained as a public read-only window into our craftsmanship.

* **Issues & Discussions:** GitHub Issues and Discussions are disabled on this repository to preserve unhurried focus in the workshop.
* **Proposing Projects & Collaborations:** If you have an idea, project, or adventure you'd like to build together, visit our guided intake form at **[The Next Thing](https://camwyn.com/the-next-thing/)**.
* **General Inquiries:** Reach our table directly at [hello@camwyn.com](mailto:hello@camwyn.com).

---

## Licensing

This repository operates under a **dual license**:

1. **Code & Architecture (MIT License):** All templates, stylesheets, scripts, build tools, and configuration files are open source under the terms of the MIT License.
2. **Content, Brand & Creative Works (All Rights Reserved):** The Camwyn & Co name, trademarks, logos, photography, Field Notes essays, and the 6 Archetypes creative framework are proprietary and strictly reserved.

See [`LICENSE.md`](LICENSE.md) for full terms.
