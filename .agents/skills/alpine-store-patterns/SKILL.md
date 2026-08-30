---
name: alpine-store-patterns
description: Use this skill when implementing Alpine.js stores, component state, persistence with @alpinejs/persist, or interactive widgets like the Adventure Compass.
---

# Alpine.js Store Patterns & State Management

In Camwyn & Co, all cross-component communication and persistent state MUST flow through global Alpine stores, never via brittle parent-child DOM traversal.

## Store Initialization Protocol:

Always register stores within the `alpine:init` lifecycle event:

```javascript
document.addEventListener('alpine:init', () => {
  Alpine.store('compass', {
    // Current step (0 = not started / intro, 1..5 = questions, 6 = result)
    step: 1,
    totalSteps: 5,
    answers: {},
    result: Alpine.$persist(null).as('compassResult'),
    history: Alpine.$persist([]).as('compassHistory'),

    selectOption(questionId, archetype) {
      this.answers[questionId] = archetype;
      if (this.step < this.totalSteps) {
        this.step++;
      } else {
        this.calculateResult();
      }
    },

    calculateResult() {
      // Tally archetypes and compute primary match
      const counts = {};
      Object.values(this.answers).forEach(arch => {
        counts[arch] = (counts[arch] || 0) + 1;
      });
      const topArchetype = Object.keys(counts).reduce((a, b) => counts[a] >= counts[b] ? a : b, 'explorer');
      this.result = topArchetype;
      this.step = 6;
    },

    reset() {
      this.step = 1;
      this.answers = {};
      this.result = null;
    }
  });
});
```

## Mandatory Directives:

1. **State Persistence:**
   * Use `Alpine.$persist(value).as('keyName')` from `@alpinejs/persist` to save user selections across page reloads.
2. **Accessible Step Transitions:**
   * Add `aria-live="polite"` and `aria-atomic="true"` on the question container so screen readers announce changes as steps advance.
3. **Keyboard Accessibility:**
   * Use semantic `<button type="button">` elements for all interactive quiz options.
   * Do NOT use clickable `<div>` or `<span>` without keyboard handlers and roles.
4. **SSR / Pre-rendered HTML Parity:**
   * Always output valid, styled default markup inside Nunjucks templates before Alpine mounts (`x-cloak` used only on alternate step views).
   * "Notes from the Field" must pre-render a default set of notes in HTML so non-JS visitors and search engine crawlers see complete content.
