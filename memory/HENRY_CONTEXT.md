# HENRY AI CORPORATION — MASTER CONTEXT & HANDOFF
**Last Updated:** 2026-03-10 | **Session:** Felix SR Build + Auth Fix
**Next Chat Model:** Opus 4.6 (switch via model selector in Claude Code or Claude.ai)

---

## OWNER
- **Name:** Whitt Dwyer (William Dwyer)
- **Location:** Houston, TX
- **Company:** HENRY AI Corporation
- **GitHub:** whd4
- **Mission:** $1B+ human+AI holding company. Two tracks: Agency (cash flow) + Acquisitions (wealth)

---

## SYSTEM — LOCAL MACHINE
- Windows 11 Pro + WSL2 Ubuntu + RTX 4070
- Claude Desktop (Max Plan — Opus 4.6, OAuth authenticated as of 2026-03-10)
- Claude Code CLI — `C:\Users\whitt\.local\bin\claude.exe`
- Claude Code auth: **OAuth / Max Plan** (fixed 2026-03-10, API key removed)
- DevFactory base: `C:\Users\whitt\DevFactory`
- Ollama fallback: Qwen 2.5:14b

---

## CLAUDE CODE — PLUGINS INSTALLED (20 total)
### Newly installed 2026-03-10:
- ralph-loop ✅
- commit-commands ✅
- hookify ✅
- code-review ✅

### Previously installed:
- agent-sdk-dev, asana, atlassian, clangd-lsp, claude-code-setup
- csharp-lsp, feature-dev, gopls-lsp, jdtls-lsp, kotlin-lsp
- php-lsp, pr-review-toolkit, pyright-lsp, rust-analyzer-lsp
- swift-lsp, typescript-lsp

---

## MCP SERVERS — STATUS
| Server | Path | Status |
|--------|------|--------|
| command-center | `C:\Users\whitt\Development\AI-Projects\DevFactory\mcp-servers\command-center-mcp-server\dist\index.js` | Built, registered (verify with `claude mcp list`) |
| bmad | `C:\Users\whitt\Development\AI-Projects\AI-Dev\bmad-mcp-server\dist\server.js` | Built, registered (verify) |
| github | `npx -y @modelcontextprotocol/server-github` | Registered (verify) |

### Verify command (run in fresh PowerShell):
```powershell
& "C:\Users\whitt\.local\bin\claude.exe" mcp list
```

### Re-register if needed (scope = user, NOT global):
```powershell
$claude = "C:\Users\whitt\.local\bin\claude.exe"
& $claude mcp add command-center --scope user -- node "C:\Users\whitt\Development\AI-Projects\DevFactory\mcp-servers\command-center-mcp-server\dist\index.js"
& $claude mcp add bmad --scope user -- node "C:\Users\whitt\Development\AI-Projects\AI-Dev\bmad-mcp-server\dist\server.js"
& $claude mcp add github --scope user -- npx -y @modelcontextprotocol/server-github
```

---

## GITHUB REPOS — whd4 (15 repos)
| Repo | Visibility | Priority | Notes |
|------|-----------|----------|-------|
| henry-ai-company | Public | 🔴 Core | 9 agents v2, last push 2026-03-01 |
| expert-ai-skills | Public | 🔴 Install | 233 skills |
| henry-launcher | Private | 🔴 Deploy | 237 skills, Docker, PRISM-MC |
| dark-factory | Private | 🔴 Active | CPA acquisition engine |
| starvoss-legal-timeline | Private | 🔴 Legal | Most recent: 2026-03-08 |
| henry-devfactory | Private | 🟡 MCP | command-center MCP lives here |
| henry-master | Private | 🟡 | Master orchestration |
| henry-bmad-v6 | Public | 🟡 | Public BMAD version |
| openclaw-pro | Private | 🟡 | OpenClaw gateway + memory |
| catalyst-agent | Private | 🟢 | Triple-Lens Framework |
| BMAD-METHOD | Public | 🟢 | Foundation for all agents |
| TRANSRUP-TO-CODE- | Public | 🟢 | YouTube→Code, Fiverr asset |
| Archimedius-os | Public | 🟢 | Orchestrator dashboard, dormant |
| codewiki | Private | 🟢 | Empty/minimal |
| whd4 | Private | 🟢 | Profile README |

---

## HENRY AGENT TEAM — 9 AGENTS (henry-ai-company repo)
| Agent | Role | Invoke |
|-------|------|--------|
| NEXUS | Orchestrator. Routes tasks | /NEXUS |
| ATLAS | CEO/Strategy. Acquisitions | /ATLAS |
| LEDGER | CFO. Financials, valuations, SBA | /LEDGER |
| FORGE | CTO. Code, MCP, architecture | /FORGE |
| SHIELD | Legal. LOIs, NDAs, contracts | /SHIELD |
| ORACLE | Research/Intel. Due diligence | /ORACLE |
| PULSE | Marketing. GTM, copy, SEO | /PULSE |
| CLOSER | Sales. Proposals, pitch decks | /CLOSER |
| ENGINE | Ops. Sprint management | /ENGINE |

---

## FELIX SR — AGENT ROSTER (OpenClaw)
- **IRIS** → Customer Support (inbound email, refunds, escalation)
- **REMY** → Sales & Lead Gen (Clawsourcing queries, proposals, closing)
- **RALPH** → Engineering (coding loops, deploy, test)

### Felix SR Files Location:
- Output folder: `/mnt/user-data/outputs/felix-sr/` (Claude's computer)
- Target deploy: `C:\ZeroHumanCompany\`

---

## BUSINESS TRACKS

### TRACK 1 — AGENCY (Cash Flow)
- AI transformation for Houston businesses (CPA, legal, real estate, marketing)
- Model: Whitt meets clients → HENRY AI builds → deliver + collect
- Revenue target: $5K–$25K/project + $500–$2K/month retainer, 85%+ margin

### TRACK 2 — ACQUISITIONS (Wealth)
- Buy distressed CPA/accounting firms at 0.4x revenue
- 90-day AI transformation → 60–70% EBITDA margin → exit at 7x

### ACTIVE CPA PIPELINE:
| ID | Description | Priority | Status |
|----|-------------|----------|--------|
| TXS5345 | $142K remote CPA | 🔴 PRIORITY | LOI NOT YET SUBMITTED — BLEEDING TIME |
| TXS5450 | TBD | 🟡 | In pipeline |
| TXS5513 | TBD | 🟡 | In pipeline |
| TXS5491 | TBD | 🟡 | In pipeline |

---

## OPEN TASKS — PRIORITY ORDER
1. 🔴 **[NEXT CHAT]** Opus 4.6 audit — verify full local setup (MCP, plugins, Claude Code, paths)
2. 🔴 **Submit LOI — TXS5345** ($142K CPA, use /SHIELD + /LEDGER agents)
3. 🔴 **Deploy Felix SR** — copy files from outputs to `C:\ZeroHumanCompany\`, fill .env
4. 🔴 **Verify MCP servers** — run `claude mcp list`, re-register if missing
5. 🟡 **Configure Telegram bot** — via @BotFather for Felix SR
6. 🟡 **OpenClaw install** — `curl -fsSL https://openclaw.ai/install.sh | bash` in WSL
7. 🟡 **Fiverr gigs** — PDF, research, Windows, GitHub (use TRANSRUP-TO-CODE-)
8. 🟢 **Star Voss Legal** — continue building case (starvoss-legal-timeline repo)

---

## KEY FILE PATHS
```
C:\Users\whitt\DevFactory\dark-factory\HENRY_CONTEXT.md   ← THIS FILE (local copy)
C:\Users\whitt\.local\bin\claude.exe                       ← Claude Code binary
C:\Users\whitt\.claude\settings.json                       ← Claude Code settings
C:\Users\whitt\.claude.json                                ← Claude auth config (primaryApiKey REMOVED)
C:\Users\whitt\.claude\plugins\installed_plugins.json      ← Plugin registry
C:\Users\whitt\DevFactory\                                  ← Dev root
C:\Users\whitt\Development\AI-Projects\                    ← MCP servers live here
C:\ZeroHumanCompany\                                       ← Felix SR deploy target
```

---

## AUTH STATUS (as of 2026-03-10)
- ✅ Claude Code: OAuth / Max Plan (William Dwyer)
- ✅ Model: Opus 4.6
- ✅ Old API key: DELETED (was sk-ant-api03-pNsh...)
- ✅ 20 plugins installed including ralph-loop

---

## CODEWORDS (always active)
| Codeword | Action |
|----------|--------|
| BUILD | Execute immediately. Show output. No plan first. |
| FIX | Diagnose + fix. Show what changed. |
| EXPLAIN | Visual-first. Diagram. Examples. |
| ULTRA | Maximum depth. Full analysis. |
| STATUS | Full project state summary. |
| PAUSE | Checkpoint all state to files. |

---

## NEXT CHAT INSTRUCTIONS
1. Open new chat window in Claude.ai or Claude Code
2. Switch model to **Opus 4.6**
3. Paste this file or reference: `C:\Users\whitt\DevFactory\dark-factory\HENRY_CONTEXT.md`
4. First task: **Full local audit** — verify MCP servers, plugins, Claude Code auth, all paths
5. Second task: **Submit LOI on TXS5345**
