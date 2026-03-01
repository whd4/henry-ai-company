# HENRY_BRAIN.md — Master Resume File
**Last Updated:** 2026-03-01
**Resume Command:** "Read HENRY_BRAIN.md. Status + next action."
**Session Protocol:** Read this at session START. Update and push at session END.

---

## WHO WE ARE

**Company:** HENRY AI Corporation
**Founder:** Whitt Dwyer — Houston, TX
**Mission:** Acquire distressed CPA firms at 0.4x revenue → 90-day AI transformation → exit at 7x EBITDA
**Target:** $1B+ valuation via Dark Factory acquisition engine + AI services
**Operator style:** ADD/ADHD — bottom line first, numbered steps, micro-steps, NEXT ACTION always singular

---

## CURRENT PRIORITIES (in order)

| Priority | Track | Status | Blocker |
|---|---|---|---|
| 🔴 P1 | Dark Factory — Acquisitions | TXS5513 buyer package NOT requested | Call APS.net NOW |
| 🔴 P1 | Dark Factory — RIA Registration | NOT FILED with Texas SSB | File immediately |
| 🔴 P2 | Star Voss Legal | Active litigation F210/F212/F310 | Whitt to update status |
| 🟡 P3 | HENRY BMAD V6 | v2 migration complete (2026-03-01) | OpenClaw config unresolved |
| 🟡 P4 | Agency Track | Not started — 0 clients | Identify 3 Houston contacts |
| 🟢 P5 | Fiverr/Upwork | Active | MARKETING: optimize gig copy |

---

## DARK FACTORY PIPELINE

| ID | Revenue | Offer | Post-AI EBITDA | Exit | Status |
|---|---|---|---|---|---|
| TXS5513 | $424K | $127K–$170K | $254K–$297K | $1.78M–$2.1M | 🔴 CALL NOW — HNW/RIA |
| TXS5450 | $472K | $189K–$236K | $283K–$330K | $1.98M–$2.3M | Research |
| TXS5491 | $910K | $364K–$546K | $546K–$637K | $3.8M–$4.5M | SBA eligible |
| TXS5345 | $142K | $57K–$71K | $85K–$99K | $595K–$700K | Backup |

**APS.net contact:** (877) 632-1040
**Call script:** "Hi, I'm looking to acquire an accounting practice in Houston Texas. I'm interested in TXS5513 and would love to receive the buyer package. My name is Whitt Dwyer."
**Call order:** TXS5513 FIRST → then TXS5450 → then TXS5491

---

## AGENT SYSTEM — HENRY BMAD V6

### Architecture Status
- **Version:** v2 (as of 2026-03-01)
- **Agents:** 10 total (9 specialist + OPTIMIZER)
- **Memory system:** LIVE — all agents have persistent memory files
- **GitHub:** github.com/whd4/henry-ai-company

### Agent Registry

| Agent | File | Memory | Status |
|---|---|---|---|
| ORCHESTRATOR | docs/agent-definitions/ORCHESTRATOR_v2.md | memory/ORCHESTRATOR_MEMORY.md | ✅ v2 |
| CEO | docs/agent-definitions/CEO_v2.md | memory/CEO_MEMORY.md | ✅ v2 |
| CFO | docs/agent-definitions/CFO_v2.md | memory/CFO_MEMORY.md | ✅ v2 |
| CTO | docs/agent-definitions/CTO_v2.md | memory/CTO_MEMORY.md | ✅ v2 |
| LEGAL | docs/agent-definitions/LEGAL_v2.md | memory/LEGAL_MEMORY.md | ✅ v2 |
| RESEARCH | docs/agent-definitions/RESEARCH_v2.md | memory/RESEARCH_MEMORY.md | ✅ v2 |
| MARKETING | docs/agent-definitions/MARKETING_v2.md | memory/MARKETING_MEMORY.md | ✅ v2 |
| SALES | docs/agent-definitions/SALES_v2.md | memory/SALES_MEMORY.md | ✅ v2 |
| OPERATIONS | docs/agent-definitions/OPERATIONS_v2.md | memory/OPERATIONS_MEMORY.md | ✅ v2 |
| OPTIMIZER | docs/agent-definitions/OPTIMIZER.md | memory/OPTIMIZER_MEMORY.md | ✅ v2 |

### v2 Architecture Features (all agents)
- ✅ 7-step boot sequence (read memory → classify → plan → execute → evaluate → write memory)
- ✅ Scaling rules (TIER 1-4 — match effort to complexity)
- ✅ Self-improvement triggers (TOOL_FAILURE, LOW_CONFIDENCE, FASTER_PATH, INSTRUCTION_DRIFT, END_OF_SESSION)
- ✅ Persistent memory (read at boot, write at shutdown — no exceptions)
- ✅ OPTIMIZER interface (flags feed into system-wide improvement loop)
- ✅ Filesystem output protocol (sub-agents write to files, not context)
- ✅ Context engineering countermeasures (front-load, append-only, stable prefixes)

### Architecture Basis
Researched and built from frontier sources (2025-2026):
- Anthropic multi-agent research system + Agent Skills
- Manus context engineering (KV-cache, tool logit masking)
- Phil Schmid Agent Harness 2026 pattern
- A-MEM (Zettelkasten memory), MARS (meta-cognitive reflection), Agent-R (MCTS self-training)

---

## TECH STACK

```
OS:           Windows 11 Pro + WSL2 Ubuntu
GPU:          RTX 4070
IDE:          Antigravity (VS Code fork)
AI Platform:  OpenClaw 2026.2.9 — STATUS: Config JSON unresolved
Local AI:     Ollama + Qwen 2.5:14b
Cloud AI:     Claude Sonnet 4 (daily driver via OpenRouter)
Routing:      Heartbeats → Gemini Flash | Reasoning → DeepSeek R1 | Execution → Claude Sonnet 4
GitHub:       github.com/whd4/henry-ai-company (main)
              github.com/whd4/dark-factory
              github.com/whd4/henry-devfactory
Auth:         gh auth login (browser OAuth) — NEVER manual tokens
Paths (WSL):  ~/HENRY/projects → /mnt/c/Users/whitt/OneDrive/HENRY/projects (symlink live)
Real files:   Likely in /mnt/d/WHITT_ORG (not yet fully located)
```

---

## LEGAL + COMPLIANCE

```
Texas §513.11: Non-CPA CAN own CPA firm — CONFIRMED — do not re-research
RIA Registration: NOT FILED — file with Texas SSB immediately (60-90 day clock)
Star Voss: Active litigation — units F210, F212, F310 — keep separate from acquisition work
LOI template: Ready in LEGAL_v2.md — waiting for buyer packages to draft
```

---

## OPEN TASKS — NOTHING DROPS

### CRITICAL (do today)
- [ ] **CALL APS.net: (877) 632-1040 → TXS5513 buyer package** ← FIRST ACTION
- [ ] **FILE RIA registration with Texas SSB** ← 60-90 day clock not running

### HIGH (this week)
- [ ] Fix OpenClaw config JSON (remove ownerDisplay + streaming keys) — CTO 2hr session
- [ ] Identify 3 Houston business contacts for agency track — Whitt
- [ ] Request buyer packages for TXS5450 + TXS5491 on same APS.net call
- [ ] Locate /mnt/d/WHITT_ORG files — CTO
- [ ] Star Voss status update — Whitt

### NORMAL (this sprint)
- [ ] MARKETING: audit + rewrite Fiverr/Upwork gig descriptions
- [ ] MARKETING: build Houston CPA outreach sequence → SALES
- [ ] Run first OPTIMIZER audit after 10 sessions

---

## SESSION LOG

| Date | Session Focus | Key Output | Status |
|---|---|---|---|
| 2026-03-01 | Architecture research + v2 build | 9 agent v2 files + 9 memory files + HENRY_BRAIN.md | ✅ Complete |
| 2026-03-01 | v1 agent build + GitHub deploy | S01-S09 deployed to henry-ai-company | ✅ Complete |

---

## RECOVERY PROTOCOL

If session lost or context reset:
1. Open GitHub: github.com/whd4/henry-ai-company
2. Read this file: HENRY_BRAIN.md
3. Say: "Read HENRY_BRAIN.md. Status + next action."
4. HENRY will orient you to exact state + next step in < 30 seconds
