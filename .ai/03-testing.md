# Testing & Verification Strategy: Camwyn & Co

This document defines the automated and manual testing framework for Camwyn & Co, with particular emphasis on **Accessibility (A11y)**, **Axe-Core / Pa11y integration**, **Color Contrast validation**, and **Static SSG build verification**.

---

## 1. Automated Accessibility (A11y) Test Suite

### Tooling & Standards
- **Standard:** WCAG 2.1 Level AA (with Level AAA adherence for primary reading copy).
- **Engine:** `axe-core` via `pa11y-ci` and `@axe-core/cli`.
- **Target Endpoints:**
  - `http://localhost:8080/` (Homepage)
  - `http://localhost:8080/our-story/` (Our Story)
  - `http://localhost:8080/what-we-do/` (What We Do)

### Running Automated A11y Tests

Inside Lando container:
```bash
lando test:a11y
```
Or combined static build + test:
```bash
lando test
```

### Configuration (`.pa11yci.json`)
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 15000,
    "runners": ["axe", "htmlcs"],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  },
  "urls": [
    "http://localhost:8080/",
    "http://localhost:8080/our-story/",
    "http://localhost:8080/what-we-do/"
  ]
}
```

---

## 2. Color Contrast Verification Matrix

| Color Token | Hex | Surface | Contrast Ratio | WCAG 2.1 Status | Permitted Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `coffee-black` | `#121211` | `paper-white` (`#F9F8F6`) | **17.9:1** | **Pass AAA** | All primary body text, headlines, icons |
| `coffee-black` | `#121211` | `warm-sand` (`#E8E2DA`) | **14.8:1** | **Pass AAA** | Text on warm sections |
| `paper-white` | `#F9F8F6` | `coffee-black` (`#121211`) | **17.9:1** | **Pass AAA** | Dark section headlines & copy |
| `muted-clay` | `#8C7361` | `paper-white` (`#F9F8F6`) | **4.4:1** | **Pass AA Large** | Headings (≥24px), bold spans, borders |
| `muted-clay-text` | `#735D4E` | `paper-white` (`#F9F8F6`) | **5.8:1** | **Pass AA Normal** | Small body text / labels in clay |
| `outline-dark` | `#595954` | `paper-white` (`#F9F8F6`) | **6.6:1** | **Pass AAA** | Metadata & monospaced labels |
| `outline-variant` | `#C8C7BF` | `paper-white` (`#F9F8F6`) | **1.6:1** | **Decorative** | Dividers & hairline borders only |
| `outline-variant` | `#C8C7BF` | `coffee-black` (`#121211`) | **11.3:1** | **Pass AAA** | Borders, metadata & text on dark mode |

---

## 3. Keyboard & Focus Ring Testing
- **Focus Rings:** Ensure every interactive link and button displays a clear 2px outline on `:focus-visible` with a 2px offset.
- **Tab Sequence:** Verify logical tab order through the fixed desktop navigation, skip links, main content sections, and quiz options.
- **Quiz Controls:** Ensure `Space` and `Enter` keys trigger button selections seamlessly without losing focus.

---

## 4. Static Build & Performance Verification
- **Zero-Error Build:** `lando 11ty` compiles all pages to `_site/` without Nunjucks syntax errors or missing partial warnings.
- **Payload Budget:** All JavaScript bundles (Alpine.js + plugins) strictly remain under **20KB gzipped**.
- **No Console Errors:** Zero unhandled JavaScript exceptions during client-side hydration or localStorage interactions.

