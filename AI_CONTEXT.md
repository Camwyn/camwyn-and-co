# Camwyn & Co

## 1. Executive Summary & Purpose

This document serves as the absolute context and instruction guide for AI code assistants working on the Camwyn & Co. project.

The objective is to translate design assets (Stitch mockups, `DESIGN.md`, reference HTML, and visual exports) into a production-ready, ultra-performant, static HTML website enhanced with Alpine.js.

## 2. Core Architectural Principles

- **Philosophy:** K.I.S.S. (Keep It Simple, Stupid) & Progressive Enhancement.
- **Paradigm:** Static Site Generation (SSG) / Jamstack.
- **Server Footprint:** Strictly zero PHP, databases, or node server runtimes at runtime. All content compiles to static HTML, CSS, and JS served over a CDN.
- **Source of Truth for Design:** The `stitch_mocks/` directory containing `DESIGN.md`, reference .html layouts, and asset screenshots takes visual and structural priority.
- **Accessibility & SEO:** HTML-first SSR/SSG parity ensures 100% crawlability. Interactive widgets hydrate purely client-side without degrading base content visibility.

## 3. Technology Stack & Dependencies


| Layer                  | Technology                 | Usage & Rules                                                                 |
| :--------------------- | :------------------------- | :---------------------------------------------------------------------------- |
| **Pre-renderer / SSG** | Eleventy (11ty) + Nunjucks | Assembles HTML, injects partials, processes JSON matrices into static markup. |
| **Reactivity Engine**  | Alpine.js (v3.x)           | Handles component state, transitions, and store bindings.                     |
| **State Persistence**  | `@alpinejs/persist`        | Saves quiz/user states across reloads via`localStorage`.                      |
| **Styling**            | Custom OCSS                | Driven strictly by the design tokens defined in`DESIGN.md`.                   |
| **Data Format**        | JSON                       | Holds matrices for questions, field notes mapping, and site metadata.         |

## 4. UI/UX & Design Alignment (Stitch Specs)

An earlier design is available which demonstrates some of the behavior at: `https://camwyn-and-co.memasinclination.chatgpt.site/`

HTML and image mocks for the three pages are found in the subfolders of  `digital_identity_mocks/`. Design guidelines are found in `digital_identity_mocks/design.md` (referred to as simply `DESIGN.md` from here on out)
When implementing components from `DESIGN.md` or Stitch HTML/image mocks:

1. **Typography & Spacing:** Mirror exact font pairings, line heights, and margin utility classes specified in `DESIGN.md`. 
2. **Semantic Structure:** Preserve original HTML tag choices (`<main>`, `<aside>`, `<article>`, `<section>`). Do not wrap elements in excessive unnecessary `<div>` layers.
3. **Responsive Execution:** Layouts must follow the desktop/mobile breakpoints established in the design mocks (e.g., sticky side navigation on desktop collapsing to flow navigation on mobile).
4. **Fallback Integrity:** All dynamic sections (like "Notes from the Field") must have default pre-rendered HTML matching the Stitch mock layout so the page looks complete before JS executes.

## 5. State Management & Data Patterns

### Alpine Store Architecture

Distant components MUST communicate through global Alpine stores, never via brittle parent-child DOM traversal.

```javascript
// store initialization protocol
document.addEventListener('alpine:init', () => {
  Alpine.store('compass', {
    // Persist result in localStorage as 'x_compassResult'
    result: Alpine.$persist(null).as('compassResult'),

    setResult(archetype) {
      this.result = archetype;
    }
  });
});
```

## 1. Executive Summary & Purpose

This document serves as the absolute context and instruction guide for AI code assistants working on the Camwyn & Co. project.

The objective is to translate design assets (Stitch mockups, `DESIGN.md`, reference HTML, and visual exports) into a production-ready, ultra-performant, static HTML website enhanced with Alpine.js.

## 2. Core Architectural Principles

- **Philosophy:** K.I.S.S. (Keep It Simple, Stupid) & Progressive Enhancement.
- **Paradigm:** Static Site Generation (SSG) / Jamstack.
- **Server Footprint:** Strictly zero PHP, databases, or node server runtimes at runtime. All content compiles to static HTML, CSS, and JS served over a CDN.
- **Source of Truth for Design:** The `stitch_mocks/` directory containing `DESIGN.md`, reference .html layouts, and asset screenshots takes visual and structural priority.
- **Accessibility & SEO:** HTML-first SSR/SSG parity ensures 100% crawlability. Interactive widgets hydrate purely client-side without degrading base content visibility

#### Directory Structure

```code
src/
├── _includes/      # Nunjucks partials & layouts
├── _data/          # JSON files (compass.json, fieldNotes.json)
├── css/            # OCSS styles (01-settings, 02-objects, 03-components, 04-utilities)
├── assets/         # Images, SVG logos (camwyn-logo.svg)
└── index.njk       # Base entry template
stitch_mocks/       # Visual authority & design specs (design.md, example HTML)
```

## 3.  Technology Stack & Dependencies


| Layer                  | Technology                 | Usage & Rules                                                                |
| ---------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| **Pre-renderer / SSG** | Eleventy (11ty) + Nunjucks | Assembles HTML, injects partials,processes JSON matrices into static markup. |
| **Reactivity Engine**  | Alpine.js (v3.x)           | Handles component state, transitions, and store bindings.                   |
| **State Persistence**  | `@alpinejs/persist`        | Saves quiz/user states across reloads via`localStorage`.                     |
| **Styling**            | Custom OCSS                | Driven strictly by the design tokens defined in`DESIGN.md`.                  |
| **Data Format**        | JSON                       | Holds matrices for questions, field notes mapping, and site metadata.        |

### Image & Font Handling

* Local vector assets (like `/camwyn-logo.svg`) should be linked relative to the output root or inline SVG.
* Fonts should map to CSS custom properties defined in `01-settings/tokens.css` (e.g., `--font-serif`, `--font-sans`).

## 4. UI/UX & Design Alignment (Stitch Specs)

When implementing components from `DESIGN.md` or Stitch HTML/image mocks:

1. **Typography & Spacing:** Mirror exact font pairings, line heights, and margin utility classes specified in `DESIGN.md`.
2. **Semantic Structure:** Preserve original HTML tag choices (`<main>`, `<aside>`, `<article>`, `<section>`). Do not wrap elements in excessive unnecessary `<div>` layers.
3. **Responsive Execution:** Layouts must follow the desktop/mobile breakpoints established in the design mocks (e.g., sticky side navigation on desktop collapsing to flow navigation on mobile).
4. **Fallback Integrity:** All dynamic sections (like "Notes from the Field") must have default pre-rendered HTML matching the Stitch mock layout so the page looks complete before JS executes

## 5. State Management & Data Patterns

### Alpine Store Architecture

Distant components MUST communicate through global Alpine stores, never via brittle parent-child DOM traversal.

```javascript
// store initialization protocol
document.addEventListener('alpine:init', () => {
  Alpine.store('compass', {
    // Persist result in localStorage as 'x_compassResult'
    result: Alpine.$persist(null).as('compassResult'),
  
    setResult(archetype) {
      this.result = archetype;
    }
  });
});
```
### JSON Matrix Contract

Interactive components like the Adventure Compass must consume structured JSON formatted as:

```json
{
  "questions": [
    {
      "id": 1,
      "text": "A free Saturday appears. Where do you go?",
      "options": [
        { "label": "Option text...", "archetype": "explorer" }
      ]
    }
  ],
  "fieldNotes": {
    "explorer": [
      { "tag": "Field prompt · 01", "title": "...", "excerpt": "...", "link": "#" }
    ]
  }
}
```
## 6. Code Generation Instructions for AI

When generating or refactoring code for this repository, you MUST:

- **Refuse Heavy Frameworks:** Never suggest React, Vue, Svelte, or Virtual-DOM runtime libraries.
- **Adhere to the Design Specs:** Match typography, color palettes, and component structures found in `DESIGN.md` and Stitch example files.
- **Maintain Zero-Build Runtime:** Keep JS execution purely in Alpine.js scripts.
- **Enforce Accessibility:** Use semantic HTML buttons for quiz choices, maintain keyboard navigation, and include appropriate ARIA attributes (aria-live="polite" for step changes).
- **Keep Payloads Light:** Ensure JS dependencies remain under a total threshold of 20KB gzipped.

## 7. CSS & Styling Conventions (OCSS + Custom Properties)

- **Styling Paradigm:** Pure Object-Oriented CSS (OCSS) utilizing CSS Custom Properties (`var(--...)`).
- **Forbidden:** No Tailwind CSS, PostCSS processing, or utility-first frameworks.
- **Class Naming Convention (BEM/OCSS):**
  - Layout Objects: `.o-object-name` (e.g., `.o-container`, `.o-grid`)
  - Components: `.c-component-name` (e.g., `.c-compass`, `.c-note-card`)
  - Modifiers / States: `.is-state` or `--modifier` (e.g., `.c-button--primary`, `.is-active`)
- **State Integration:** Alpine.js MUST bind states using semantic `.is-*` classes rather than inline style manipulation (e.g., `:class="{ 'is-selected': isSelected }"`).
- **Theme Variables:** All colors, spacing, and typography metrics defined in `DESIGN.md` MUST map to `--color-*`, `--space-*`, and `--font-*` variables in `01-settings/tokens.css`.
