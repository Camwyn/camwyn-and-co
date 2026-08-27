---
name: lando-execution
description: Use this skill whenever you need to execute 11ty build, dev, test, npm, or shell commands inside the Lando container or manage Lando services on Windows PowerShell.
---

# Lando Execution & Windows PowerShell Guardrails

You are operating on a **Windows Host OS**, but the entire Node/11ty static build environment is containerized inside Lando (`appserver` service, `type: node:20`).

## Mandatory PowerShell & Lando Rules:

1. **Routing Commands into Lando:**
   - Always run containerized commands using `lando ssh -s appserver -c "<command>"` or defined Lando tooling (e.g. `lando 11ty`, `lando build`, `lando test`, `lando npm <args>`).
   - Do NOT run host-level `node` or `npx` commands that rely on Linux/container-specific paths or missing host binaries.

2. **PowerShell Quoting Guardrails:**
   - In Windows PowerShell, nested quotes inside `-c` must be handled properly:
     - Preferred: `lando ssh -s appserver -c "npx @11ty/eleventy"`
     - If passing quotes inside commands: `lando ssh -s appserver -c 'npm run test:a11y'`
   - Avoid unescaped double quotes inside double quotes.

3. **Non-Interactive Execution:**
   - Never run commands that prompt for interactive input or wait for stdin indefinitely.
   - When rebuilding Lando, always pass the `-y` flag: `lando rebuild -y`.

4. **Dev Server & Host Networking:**
   - The Eleventy dev server must never be invoked with `--host=0.0.0.0` on the CLI (unsupported flag in 11ty CLI). Network binding is configured in `.eleventy.js` via `eleventyConfig.setServerOptions({ port: 8080, showAllHosts: true })`.
   - Access the site via Lando's proxy URLs:
     - `http://camwyn-and-co.lndo.site`
     - `https://camwyn-and-co.lndo.site`
     *(Never append `:8080` to the proxy domain in browser).*

5. **Version Control Exceptions:**
   - Git commands (`git add`, `git commit`, `git status`, `git diff`) must be executed directly on the Windows host. Do not run Git through Lando.

## Common Valid Commands:

* **Build Static Site:** `lando 11ty` or `lando ssh -s appserver -c "npx @11ty/eleventy"`
* **Install NPM Packages:** `lando npm install <package> --save-dev`
* **Run Tests / A11y Audit:** `lando test:a11y` or `lando ssh -s appserver -c "npm run test:a11y"`
* **Inspect Container Logs:** `lando logs -s appserver`
* **Check Lando Service Status:** `lando info`

