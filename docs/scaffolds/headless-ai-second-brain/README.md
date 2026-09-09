# Headless AI Second Brain Starter Kit
*An autonomous, human-friendly knowledge architecture for teams and solo operators powered by Obsidian & Model Context Protocol (MCP).*

---

## 🎯 What is This?

This kit provides a **turnkey scaffolding** that transforms an Obsidian vault into a **headless, shared AI context engine**. 

Instead of forcing collaborators or clients to learn Obsidian, Markdown formatting, or complex folder hierarchies, team members interact with the vault entirely through their favorite AI assistants (**ChatGPT Desktop**, **Claude Desktop**, **Antigravity IDE**, **Cursor**, or custom agents).

```
┌─────────────────────────────────────────────────────────────┐
│                    Any AI Interface                         │
│       (ChatGPT Desktop · Claude Desktop · IDE Agents)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ MCP Protocol (obsidian-mcp)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            Headless Local Obsidian Vault Files              │
│                 (No App Needs to Be Open!)                  │
├─────────────────────────────────────────────────────────────┤
│ • 00-INBOX/        — Frictionless capture for humans & AIs  │
│ • AI CONTEXT.md    — The Brand Constitution & Agent Guardrails │
│ • PARA-Index.md    — Authoritative Map of Content (MOC)     │
│ • Projects/        — Active sprints, tasks & worklogs       │
│ • Areas/           — Standards, governance & business pillars│
│ • Resources/       — Knowledge bases & playbooks            │
│ • Archives/        — Historical milestone records           │
└──────────────────────────────┬──────────────────────────────┘
                               │ Background E2EE Sync
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Remote Vault / Team Sync                    │
│      (Obsidian Sync · Private GitHub Repo · Cloud Mirror)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Package Contents

- **`vault-template/`**: A sanitized, pre-structured PARA directory skeleton with starter MOCs, project templates, and an `AI CONTEXT.md` constitution.
- **`connectors/`**: Ready-to-paste configuration files for:
  - `chatgpt-desktop/`: Visual form instructions and Custom GPT templates.
  - `claude-desktop/`: Plug-and-play `claude_desktop_config.json`.
  - `antigravity-ide/`: Universal agent `mcp_config.json`.
- **`scripts/`**: 1-click installation and verification scripts for Windows and macOS.

---

## 🚀 Quickstart Guide (5-Minute Setup)

### Step 1: Create or Sync the Vault
1. Copy the contents of `vault-template/` to a local folder on your computer (e.g. `C:\Users\username\Documents\Obsidian\my-second-brain` or `~/Documents/Obsidian/my-second-brain`).
2. (Optional) If sharing with a team, enable **Obsidian Sync** with End-to-End Encryption and invite collaborators.

### Step 2: Install Node.js
`obsidian-mcp` runs headlessly via `npx`. Ensure Node.js is installed:
- **Windows (PowerShell):** `winget install OpenJS.NodeJS.LTS`
- **Mac (Homebrew):** `brew install node`
- **Or download from:** [nodejs.org](https://nodejs.org)

### Step 3: Connect Your AI Client

#### Option A: ChatGPT Desktop (Windows & Mac)
1. Open **ChatGPT Desktop → Settings → Developer / Advanced → MCP Servers**.
2. Click **Add Server**:
   - **Name:** `obsidian`
   - **Command:** `cmd.exe` (Windows) or `npx` (Mac)
   - **Arguments:** `/c npx -y obsidian-mcp serve --vault main="<ABSOLUTE_PATH_TO_VAULT>"`
3. Save and restart ChatGPT.

#### Option B: Claude Desktop (Windows & Mac)
1. Open `claude_desktop_config.json`:
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
2. Copy the contents from `connectors/claude-desktop/claude_desktop_config.json` and replace the path with your local vault directory.

---

## 💬 Example Prompts for Team Members

Once connected, team members can ask their AI:

- **Read Knowledge:** *"What are our brand colors and core taglines in the vault?"*
- **Check Status:** *"What tasks are currently open under Project Alpha?"*
- **Create Dispatches:** *"Draft a new dispatch about our launch and save it to `Dispatches/`."*
- **Log Updates:** *"Add a note to today's worklog under Project Alpha summarizing my meeting."*

---

## 🛡️ Best Practices & Conventions

1. **Keep the AI CONTEXT.md Updated:** This file acts as the primary "constitution" for all AI workers. Whenever brand guidelines or operating rules change, update this note.
2. **Attribution in Worklogs:** When multiple collaborators log updates, use the format `### YYYY-MM-DD — @name` to avoid edit collisions.
3. **Frictionless Inbox:** Drop unstructured thoughts or rough notes into `00-INBOX/`; let your AI sort and synthesize them into proper Area or Project notes during weekly reviews.
