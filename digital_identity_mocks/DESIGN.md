---
name: Atelier Narrative
colors:
  surface: '#fcf9f5'
  surface-dim: '#dcdad6'
  surface-bright: '#fcf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ef'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e4'
  surface-container-highest: '#e5e2de'
  on-surface: '#1c1c19'
  on-surface-variant: '#474741'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f3f0ec'
  outline: '#777771'
  outline-variant: '#c8c7bf'
  surface-tint: '#5f5e5c'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1c1a'
  on-primary-container: '#858481'
  inverse-primary: '#c9c6c3'
  secondary: '#775840'
  on-secondary: '#ffffff'
  secondary-container: '#ffd5b6'
  on-secondary-container: '#795a42'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1c'
  on-tertiary-container: '#878384'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2de'
  primary-fixed-dim: '#c9c6c3'
  on-primary-fixed: '#1c1c1a'
  on-primary-fixed-variant: '#474744'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#e7bfa1'
  on-secondary-fixed: '#2c1604'
  on-secondary-fixed-variant: '#5d412a'
  tertiary-fixed: '#e7e1e2'
  tertiary-fixed-dim: '#cbc5c6'
  on-tertiary-fixed: '#1d1b1c'
  on-tertiary-fixed-variant: '#494647'
  background: '#fcf9f5'
  on-background: '#1c1c19'
  surface-variant: '#e5e2de'
  paper-white: '#F9F8F6'
  warm-sand: '#E8E2DA'
  coffee-black: '#121211'
  muted-clay: '#8C7361'
typography:
  display-hero:
    fontFamily: DM Serif Display
    fontSize: 84px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-md:
    fontFamily: DM Serif Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  numeral-index:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.0'
spacing:
  grid-margin: 4rem
  section-gap: 8rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

This design system is built on the philosophy of "Generous Minimalism"—an editorial-first approach that prioritizes storytelling, human connection, and a "lived-in" warmth. It avoids the sterile coldness of traditional corporate SaaS in favor of an aesthetic that feels like a boutique workshop or a high-end cultural journal.

The visual narrative is defined by:
- **Editorial Asymmetry:** Layouts that feel curated rather than manufactured, utilizing intentional line breaks to guide the reader's cadence.
- **Lived-in Sophistication:** A blend of high-contrast typography and raw, tonal backgrounds that suggest quality over flash.
- **Soulful Precision:** Clean, functional utility (monospaced numbering, fine lines) paired with warm, organic sentiments.
- **The "House" Metaphor:** UI elements are treated as "rooms" or "notes," emphasizing containment, hospitality, and a refusal to be "too polished."

## Colors

The palette is rooted in earth-toned neutrals to evoke a tactile, "paper-like" feeling. 

- **Primary:** A deep, near-black "Coffee" used for high-contrast headlines and structural elements.
- **Secondary:** A warm, desaturated "Clay" used for emphasis, accents within text, and subtle brand highlights.
- **Surface Strategy:** The design relies on varying shades of cream and beige (`paper-white`, `neutral`, `warm-sand`) to create "zones" or "rooms" without resorting to heavy borders.
- **Contrast:** High-contrast text is essential. Use the primary color for all critical copy to ensure an authoritative yet warm readability.

## Typography

Typography is the primary driver of the design's personality. 

- **Headlines:** Use a high-contrast serif with tight leading. Titles should often be broken into multiple lines to create a specific visual "shape."
- **Body:** A clean, contemporary sans-serif provides a functional counterpoint to the expressive headlines. It should feel unhurried with generous line height.
- **Labels & Numbers:** Use a monospaced font for metadata, small-caps labels, and indexing (e.g., 01, 02). This adds a "workbench" or "archival" feel to the editorial content.
- **Emphasis:** Use the secondary brand color for specific words within a serif headline to add a "hand-highlighted" effect.

## Layout & Spacing

The layout philosophy is "Intentional Asymmetry." 

- **The Grid:** A 12-column fluid grid is used as a base, but content should rarely span the full width. Align content to the left or right to create dynamic whitespace.
- **Rhythm:** Vertical spacing is extremely generous. Sections (or "rooms") are separated by massive gaps to allow ideas to breathe.
- **Fine Lines:** Use 1px horizontal and vertical rules in the primary or secondary color to subtly define borders or separate metadata from content. Lines should feel like pencil marks—thin and purposeful.
- **Breakpoints:** 
  - **Desktop (1440px+):** Wide margins, asymmetrical content placement.
  - **Tablet (768px):** Shift to more centered or balanced 2-column layouts.
  - **Mobile (375px):** Single column, reduced headline sizes, consistent 1.5rem side margins.

## Elevation & Depth

This system avoids optical shadows and blurs. Depth is communicated through:

- **Tonal Layering:** Shifting background colors between sections (e.g., moving from `paper-white` to `warm-sand`) creates a sense of moving between different physical spaces.
- **Flat Containers:** Cards and interactive zones use 1px outlines or slight tonal shifts rather than dropshadows.
- **Structural Lines:** Use "hairline" borders to frame content. These lines should often be "incomplete" (e.g., only a top and right border) to maintain the airy, editorial feel.

## Shapes

The shape language is strictly "Sharp." 

0px border radii are used across all elements—buttons, cards, and image containers—to maintain a sophisticated, architectural, and "printed" feel. Roundness is avoided to ensure the UI feels serious and structured, like a well-bound book or a blueprint.

## Components

- **Buttons:** Buttons are typically text-based with a trailing arrow icon (↗ or ↓). If a contained button is necessary, it should be a flat rectangle with no radius and high-contrast text.
- **Cards:** Used for "Notes" or "Project" summaries. They feature a 1px border on at least two sides, a monospaced index number at the top, and generous internal padding.
- **Input Fields:** Minimalist lines. Use a single bottom border (underscore style) for inputs rather than boxed fields. Labels should use the `label-caps` monospaced style.
- **Lists:** High-density but clear. Use fine horizontal dividers between items. Leading numerals (01, 02) should be used to provide a sense of order.
- **Signatures:** The brand mark should be used sparingly, almost like a "wax seal" or a signature at the end of a note, rather than a repetitive header element on every page.
- **Directional Glyphs:** Use standard unicode arrows (↑, ↓, →, ↗) as the primary iconography for actions.

### Voice and Tone for Text Created by Agents (AI Governance)

When autonomous agents or automated workflows generate content—such as Field Note drafts, system dispatches, dynamic UI copy, or automated summaries—they must strictly adhere to the established Camwyn & Co. editorial identity[cite: 1, 3, 6]. AI output should never sound like generic corporate marketing, sterile tech boilerplate, or frantic "growth-hacking" copy[cite: 1, 2, 6].

#### Core Working Principles
Agent-generated text must be directly anchored in our three working pillars[cite: 1, 2]:
* **Smart can be warm[cite: 1, 2]:** Technical concepts, software architectures, or operational systems should be explained using clear, welcoming, and accessible language[cite: 1, 2]. Avoid dense corporate jargon ("synergy," "paradigm shift," "disruption")[cite: 1, 2].
* **Ambition can have soul[cite: 1, 2]:** Emphasize human context, long-term purpose, memory, and relationships over pure throughput, vanity metrics, or raw output[cite: 1, 2, 3].
* **Serious work can still be fun[cite: 1, 2]:** Treat craft, engineering discipline, and problem-solving with respect, while leaving ample room for curiosity, unscripted breakthroughs, and the joy of experimentation[cite: 1, 2, 4].

---

#### Vocabulary & Imagery Guidelines
Agents must draw from a physical, grounded, and tactile lexicon ("Workbench & Table" imagery) to explain abstract ideas[cite: 1, 2, 3]:
* **Use Grounded Metaphors:** Favor workshop, architectural, agricultural, and culinary metaphors—such as *workbench dispatches, joinery vs. lacquer, off-cuts, worn wooden mallets, structural shoring, and generous tables*[cite: 1, 3, 4].
* **Care Over Polish[cite: 2, 6]:** Frame quality as structural durability rather than superficial shine (*"Durability lives in the joints, not the lacquer"*[cite: 1, 4]). 
* **Useful Over Impressive[cite: 2, 6]:** Focus on real-world utility, clear solutions, and unhurried dispatches rather than aggressive sales pitches or pushy calls to action[cite: 1, 2, 6].

---

#### Editorial Rhythm & Formatting Rules
* **Generous Minimalism[cite: 2, 6]:** Maintain an unhurried, conversational reading cadence[cite: 1, 2, 6]. Use short, deliberate paragraph blocks and allow whitespace to let ideas breathe[cite: 1, 2, 6].
* **Selective Bolding & Emphasis:** In headlines or summary callouts, apply the signature secondary accent color (`.u-text-clay`) to trailing words (the "punch") to establish visual rhythm[cite: 1, 11, 12].
* **Quotable Centerpieces:** Where appropriate, format core insights as standalone, punchy pull-quotes[cite: 1, 3] (e.g., *"To remember what mattered is to give the next generation a foundation rather than an empty room"*[cite: 1, 3]).
* **Actionable Field Prompts:** Conclude long-form posts or dispatches with grounding, low-pressure habits or invites rather than aggressive conversion funnels[cite: 1, 3] (e.g., *"Send the message early"*[cite: 4], *"Measure twice, question the measurement"*[cite: 4]).

---

#### Banned Patterns for Agents
* 🚫 **No Frantic Urgency:** Avoid artificial scarcity or aggressive hype (e.g., "Don't miss out," "Act now," "Game-changing").
* 🚫 **No Over-Polished Boilerplate:** Avoid generic, sterile summaries (e.g., "We leverage synergistic frameworks to drive holistic engagement").
* 🚫 **No Staccato Fragmentation:** Avoid breaking prose into repetitive single-line sentences without cohesive paragraph flow[cite: 1, 10].