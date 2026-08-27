---
name: a11y-audit
description: Use this skill when verifying, debugging, or writing HTML/CSS to ensure strict WCAG 2.1 AA/AAA accessibility and running automated Axe/Pa11y test suites.
---

# Accessibility (A11y) & Axe-Core Audit Guide

Camwyn & Co is an HTML-first website committed to full WCAG 2.1 Level AA compliance across all viewports.

## Core Accessibility Standards:

1. **Color Contrast Thresholds:**
   - **Normal Body Text (< 18pt / < 24px):** Minimum contrast ratio of **4.5:1** (AA) / **7.0:1** (AAA).
   - **Large Text (≥ 18pt / ≥ 24px regular or ≥ 14pt / ≥ 18.5px bold):** Minimum contrast ratio of **3.0:1** (AA) / **4.5:1** (AAA).
   - **UI Components & Graphical Objects (borders, icons, focus rings):** Minimum contrast ratio of **3.0:1** against adjacent background.

### Color Contrast Verification Matrix:

| Foreground Token | Hex Code | Background Surface | Ratio | WCAG Rating | Usage Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `coffee-black` | `#121211` | `paper-white` (`#F9F8F6`) | **17.9:1** | **AAA** | All primary body text & headings |
| `coffee-black` | `#121211` | `warm-sand` (`#E8E2DA`) | **14.8:1** | **AAA** | Text on warm sections |
| `paper-white` | `#F9F8F6` | `coffee-black` (`#121211`) | **17.9:1** | **AAA** | Dark section headlines & copy |
| `muted-clay` | `#8C7361` | `paper-white` (`#F9F8F6`) | **4.4:1** | **AA Large** | Headings (≥24px), accents, borders ONLY |
| `muted-clay-text` | `#735D4E` | `paper-white` (`#F9F8F6`) | **5.8:1** | **AA / AAA Large** | Small body text / labels in clay |
| `outline` (dark) | `#595954` | `paper-white` (`#F9F8F6`) | **6.6:1** | **AA / AAA Large** | Secondary labels & metadata |
| `outline-variant` | `#C8C7BF` | `coffee-black` (`#121211`) | **11.3:1** | **AAA** | Borders & metadata on dark theme |

2. **Keyboard Navigation & Visible Focus:**
   - Every interactive element (`<a>`, `<button>`, `<input>`) MUST possess an explicit `:focus-visible` state:
     ```css
     :focus-visible {
       outline: 2px solid var(--color-coffee-black);
       outline-offset: 2px;
     }
     ```
   - Focus rings must NEVER be suppressed with `outline: none` unless replaced with a compliant visual indicator.

3. **Semantic HTML & Tap Targets:**
   - Quiz choices MUST be semantic `<button type="button">` elements.
   - Interactive tap targets must measure at least **44x44 CSS pixels** on touch viewports.
   - All images must provide meaningful `alt` attributes or `alt=""` if purely decorative.

4. **ARIA & Dynamic Updates:**
   - Multi-step forms/quizzes (Adventure Compass) must include `aria-live="polite"` on the active step container.
   - External links opening in new contexts or anchor jumps must provide clear text labels or `aria-label` descriptors.

5. **Automated Verification:**
   - Run the automated Axe / Pa11y test suite inside Lando:
     ```bash
     lando test:a11y
     ```
   - Zero violations allowed in CI.

