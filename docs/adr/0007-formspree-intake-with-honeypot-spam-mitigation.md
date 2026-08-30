# ADR 0007: Formspree Project Intake with Honeypot Spam Mitigation

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

"The Next Thing" (`/the-next-thing/`) provides an open door for partners, collaborators, and friends to submit project ideas. The intake form captures project details, submitter perspective, needed energy/archetype, and contact information.

Because the site has zero runtime server containers, the form submission must be handled cleanly without maintaining custom serverless functions, databases, or third-party CAPTCHA widgets (reCAPTCHA, hCaptcha) that degrade accessibility and brand aesthetics.

## Decision

1. **Formspree Backend Endpoint:** Submissions route to Formspree via endpoint URL configured in `src/_data/site.json` (`site.formspreeEndpoint`).
2. **Invisible CSS Honeypot Field:** A hidden input `<input type="text" name="_gotcha" style="display:none !important" tabindex="-1" autocomplete="off">` traps automated spam bots without burdening human visitors with friction-heavy challenge widgets.
3. **Progressive Enhancement & No-JS Fallback:**
   * When JavaScript is active, Alpine handles asynchronous JSON submission (`fetch`), displaying live validation, loading indicators, and a branded confirmation view with reset flow.
   * If JavaScript is disabled, the standard `<form action="..." method="POST">` submits natively via browser HTTP POST.
4. **Accessible Error Messaging:** Form inputs maintain explicit `<label for="...">` associations, high-contrast focus rings, and accessible `role="alert"` announcements.

## Consequences

### Positive
* **Zero Infrastructure Overhead:** No backend server, Lambda functions, or email relays to manage.
* **Frictionless Human Experience:** No visual CAPTCHAs or image puzzles.
* **Progressive Reliability:** Works whether JavaScript is running or blocked.

### Negative / Trade-offs
* **Third-Party Relay Dependency:** Delivery depends on Formspree service availability.

## Alternatives Considered
* **Custom Netlify/AWS Lambda Functions:** Rejected to avoid vendor lock-in and extra deployment configuration.
* **Google Forms / Typeform Embed:** Rejected due to iframe styling constraints, heavy third-party tracker scripts, and broken design system integration.
