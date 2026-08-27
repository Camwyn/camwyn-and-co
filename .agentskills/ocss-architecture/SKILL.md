---
name: ocss-architecture
description: Use this skill when writing, refactoring, or translating styles for Camwyn & Co from design specifications into Pure OCSS.
---

# Object-Oriented CSS (OCSS) Architecture & Conventions

All styling in Camwyn & Co strictly adheres to Object-Oriented CSS (OCSS) powered by CSS Custom Properties (`var(--...)`).

## Directory Hierarchy (`src/css/`):

```
src/css/
├── 01-settings/
│   └── tokens.css         # Design tokens: colors, typography, spacing, breakpoints
├── 02-objects/
│   ├── layout.css         # Unstyled layout structures (.o-container, .o-grid, .o-canvas)
│   └── stack.css          # Vertical/horizontal flow primitives (.o-stack, .o-cluster)
├── 03-components/
│   ├── nav.css            # .c-sidenav, .c-nav-link
│   ├── hero.css           # .c-hero layout & typography
│   ├── compass.css        # .c-compass quiz card, options, progress & results
│   ├── note-card.css      # .c-note-card editorial card components
│   └── project-row.css    # .c-project-row bento/editorial project layout
└── 04-utilities/
    ├── typography.css     # .u-font-serif, .u-font-mono, .u-text-clay, .u-text-uppercase
    └── spacing.css        # Margin & padding helpers (.u-mb-md, .u-pt-lg)
```

## Class Naming Conventions:

1. **Layout Objects (`.o-*`):**
   - Agnostic of design details (no background colors or borders).
   - Examples: `.o-container`, `.o-grid`, `.o-stack`.

2. **Components (`.c-*`):**
   - Concrete visual modules.
   - Examples: `.c-compass`, `.c-note-card`, `.c-sidenav`.
   - Modifiers use BEM double-hyphen or semantic state classes: `.c-button--primary`, `.c-note-card--featured`.

3. **State Modifiers (`.is-*`):**
   - Applied dynamically by Alpine.js.
   - Examples: `.is-selected`, `.is-active`, `.is-visible`, `.is-hidden`.
   - Never manipulate inline styles via JS when a `.is-*` class can express the state.

4. **Utilities (`.u-*`):**
   - Single-purpose overrides.
   - Examples: `.u-visually-hidden`, `.u-text-center`.

## Design Token Rules:

- Never hardcode raw hex values (like `#121211` or `#8C7361`) in component files.
- Always reference `var(--color-*)`, `var(--font-*)`, and `var(--space-*)`.
- Ensure all text/background combinations meet WCAG 2.1 AA (4.5:1 for normal body text, 3:1 for large headlines >= 24px/18pt).

