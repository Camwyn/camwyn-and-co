# Product Requirements Document (PRD): Camwyn & Co

## 1. Executive Summary
**Camwyn & Co** is an independent house of projects, ventures, experiments, and worthwhile adventures (including Mema's, creative brand collaborations, and emerging initiatives).

The digital presence is an editorial, tactile, and highly interactive Jamstack static website built with **Eleventy (11ty)**, **Alpine.js**, and **Pure OCSS**.

## 2. Core User Personas & Intent
- **The Curious Explorer:** Arrives looking for high-quality food, gatherings, brand stories, or collaborations; engages with the "Adventure Compass" quiz to discover their personal archetype.
- **The Prospective Partner / Collaborator:** Evaluates Camwyn & Co's point of view, philosophy ("Smart can be warm. Ambitious can have soul. Serious work can still be fun."), and working ventures.
- **The Community Member:** Reads "Notes from the Field," explores projects, and reaches out via direct contact channels.

## 3. Key Pages & Feature Requirements

### Page 1: Homepage (`index.njk`)
1. **Hero Canvas:** High-impact editorial typography (`display-hero`), intro statement, and down-arrow anchor link.
2. **Our Story Summary:** Point of view narrative and three working theories.
3. **Adventure Compass (Interactive Quiz Widget):**
   - 5-question multi-step quiz with progressive choices.
   - Real-time scoring determining user archetype (`explorer`, `craftsman`, `gatherer`, `catalyst`).
   - Archetype reveal card with tailored takeaway prompt and recommendations.
   - `@alpinejs/persist` persistence to save answers and results in `localStorage`.
   - Pre-rendered HTML fallback for SEO and no-JS resilience.
4. **Around Here Lately (What We're Building):**
   - Editorial rows showcasing active ventures: Mema's, Creative Work, The Next Thing.
5. **Notes from the Field:**
   - 3-column responsive card grid displaying dispatches and table notes.
   - Dynamically reorders / filters based on the Adventure Compass result if completed, with static fallback.

### Page 2: Our Story (`our-story.njk`)
1. **Editorial Manifesto:** Detailed narrative on founding principles, curiosity, and family roots.
2. **Visual Studio & Craft Photography:** Grayscale-to-color hover interactions with responsive imagery.
3. **Four Core Values:** "Care over polish", "Useful over impressive", "People over process", "Curiosity, always".
4. **Pull Up a Chair Contact Block:** Prominent call-to-action to `hello@camwynandco.com`.

### Page 3: What We Do (`what-we-do.njk`)
1. **Portfolio Header:** Dark-theme high-contrast header (`coffee-black` background).
2. **Bento / Row Project Articles:**
   - Deep dive into Mema's (Food / Gathering / Good stories).
   - Deep dive into Creative Work (Story / Brand / Collaboration).
   - The Next Thing (Open door for future adventures).
3. **Colophon & Footer:** Minimalist, accessible navigation links and copyright.

## 4. Non-Functional Requirements
- **Performance:** 100/100 Lighthouse Performance score, < 1.0s LCP on mobile.
- **Accessibility:** 100% WCAG 2.1 AA compliance, zero Axe violations, 4.5:1 text contrast minimum.
- **Payload:** Total JavaScript payload < 20KB gzipped.
- **Zero-Build Runtime:** No node/server execution at runtime; static files served via CDN.

