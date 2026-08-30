# ADR 0008: CI/CD FTP Deployment Pipeline and Git Push Governance

* **Status:** Accepted
* **Date:** 2026-08-30
* **Deciders:** Stephen Page & AI Architecture Team

---

## Context

Camwyn & Co. is hosted on production static hosting serving `https://camwyn.com`. Deployments must be repeatable, automated, and secure, without risking accidental production overwrite or untracked file destruction.

Furthermore, because autonomous AI coding assistants actively contribute to features, refactoring, and documentation, strict governance is required to ensure that automated agents do not push unreviewed changes directly to production.

## Decision

1. **GitHub Actions FTP Deployment Workflow (`.github/workflows/deploy.yml`):**
   * Triggered on `push` to the `main` branch with path filtering (`src/**`, `.eleventy.js`, dependencies, scripts).
   * Runs Node 22 build pipeline to generate static `_site/` output.
   * Synchronizes files using `SamKirkland/FTP-Deploy-Action@v4.4.0` with `dangerous-clean-slate: false` to preserve server assets and prevent accidental wipes.
2. **Git Commit & Push Governance:**
   * **Atomic Commits Encouraged:** AI agents have a free hand to create frequent, atomic commits on the local branch with Conventional Commit formatting.
   * 🚨 **Strict Push Restriction:** AI agents are strictly **forbidden from running `git push`**. Pushing to remote origin is exclusively reserved for the human developer after reviewing local commits.
3. **Local Pre-Commit Verification:**
   * All changes must pass `lando test` (11ty build + `scripts/site-integrity-test.js` validating RSS, sitemap, schemas + `scripts/a11y-audit.js` validating Axe-core rules) prior to committing.

## Consequences

### Positive
* **Deterministic Deployment:** Pushing to `main` guarantees accurate, synchronized production deployments.
* **Human Oversight & Safety:** Production releases cannot be triggered automatically by AI hallucinations or unverified agent operations.
* **Granular Commit History:** Atomic commits make rollback and auditing straightforward.

### Negative / Trade-offs
* **Manual Step:** The developer must explicitly run `git push` once satisfied with local verification.

## Alternatives Considered
* **Agent-Driven Auto-Push:** Rejected due to unacceptable risk of deploying untested or unintended modifications to live traffic.
* **Direct Server SSH Deployment:** Rejected in favor of version-controlled GitHub Actions workflows.
