# HENRY OS — MASTER HANDOFF FOR OPUS 4.6
**Created:** 2026-03-21 | **By:** Claude Sonnet 4.6 session
**For:** Next Opus 4.6 session
**Resume command:** See Section 1 below

---

## SECTION 1 — KICK-OFF PROMPT (copy-paste this exactly)

```
Read C:\Users\whitt\HENRY_CONTEXT.md
Read https://github.com/whd4/henry-ai-company/blob/main/OPUS_HANDOFF.md

You are HENRY — Whitt Dwyer's personal AI OS.
Do the following in order:
1. Read both files above
2. Check GitHub repo whd4/henry-ai-company for latest commits
3. Report: current status, what was built, what's broken, next 3 actions
4. Ask Whitt: what do you want to tackle first?

Whitt has ADD/ADHD. Bottom line first. Numbered steps. No fluff. NEXT ACTION at end.
```

---

## SECTION 2 — WHO YOU ARE TALKING TO

**Whitt Dwyer** — William H. Dwyer
- Houston, TX
- Founder: HENRY AI Corporation (targeting $1B revenue)
- ADD/ADHD — non-negotiable: bottom line first, numbered steps, micro-steps, NEXT ACTION
- Speaks via voice (Wispr Flow / browser speech) — spelling will be imperfect
- Execution over planning — build first, show it
- GitHub: whd4 | Email: whittdwyer@gmail.com | Claude Max plan

---

## SECTION 3 — COMPLETE INVENTORY

### GitHub Repos (whd4 org)
| Repo | Purpose | Status |
|------|---------|--------|
| henry-ai-company | MAIN — all agents, henry-os, handoffs | ✅ Active |
| expert-ai-skills | 233 AI skills | ✅ Exists |
| henry-bmad-v6 | BMAD framework copy | ✅ Exists |
| henry-launcher | Docker product | ✅ Exists |
| BMAD-METHOD | Foundation | ✅ Exists |
| Archimedius-os | Dormant | ⚠️ Old |

### henry-ai-company repo structure
```
henny-ai-company/
├── HENRY_BRAIN.md              ← master state (updated 2026-03-21)
├── OPUS_HANDOFF.md             ← THIS FILE
├── agents/                     ← 9 agent .md files (v2)
│   ├── atlas.agent.md
│   ├── closer.agent.md
│   ├── engine.agent.md
│   ├── forge.agent.md
│   ├── ledger.agent.md
│   ├── nexus.agent.md
│   ├── oracle.agent.md
│   ├── pulse.agent.md
│   └── shield.agent.md
├── memory/                     ← agent memory files
├── dark-factory/               ← CPA acquisition files
│   ├── LOI_TXS5345.md          ← LOI ready to send
│   └── VALUATION_TXS5345.md    ← Deal analysis
├── star-voss/
│   └── ATTORNEY_PACKAGE.md     ← Full legal package
└── henry-os/
    ├── henry-core/             ← MCP server (20 skills, Opus 4.6)
    ├── henry-phone/            ← Twilio voice/SMS server
    ├── openclaw/               ← Docker agent runtime
    ├── voice/                  ← Browser voice UI
    └── INSTALL.md
```

### Local Machine Paths (Windows)
```
C:\Users\whitt\HENRY_CONTEXT.md              ← MASTER CONTEXT — READ FIRST
C:\Users\whitt\AppData\Roaming\Claude\       ← Claude Desktop config
C:\Users\whitt\Development\henry-ai-company\ ← Main repo (cloned)
C:\Users\whitt\Development\AI-Projects\      ← AEGIS, PRISM, BMAD, DevFactory
C:\ZeroHumanCompany\                         ← Felix SR infrastructure
C:\Users\whitt\.agent\skills                 ← 233 expert skills
C:\Users\whitt\Downloads\.STARVOSS_LEGAL_CASE\ ← Star Voss evidence
```

---

## SECTION 4 — MCP SERVERS STATUS

| Server | Status | Path |
|--------|--------|------|
| filesystem | ✅ Live | C:\ + D:\ access |
| github | ✅ Fixed 2026-03-21 | New PAT, repo write scope |
| command-center | ✅ Live | DevFactory/mcp-servers/ |
| henry-core | ⚠️ Needs git pull + npm install | henry-os/henry-core/ |
| bmad | ✅ Live | AI-Dev/bmad-mcp-server/ |
| aegis | ⚠️ Wired, needs restart | AI-Projects/AEGIS/ |

**Fix henry-core (run once):**
```powershell
cd C:\Users\whitt\Development\henry-ai-company
git pull
cd henry-os\henry-core
npm install
# Restart Claude Desktop
```

---

## SECTION 5 — WHAT WAS BUILT (2026-03-21 session)

| Item | Status | Location |
|------|--------|----------|
| Mission Control UI | ✅ Built | Interactive widget in claude.ai |
| henry-core MCP (20 skills) | ✅ Pushed | henry-os/henry-core/ |
| Voice UI (browser) | ✅ Pushed | henry-os/voice/henry-voice.html |
| HENRY Phone (Twilio) | ✅ Pushed | henry-os/henry-phone/ |
| OpenClaw Docker runtime | ✅ Pushed | henry-os/openclaw/ |
| LOI for TXS5345 | ✅ Pushed | dark-factory/LOI_TXS5345.md |
| Deal valuation TXS5345 | ✅ Pushed | dark-factory/VALUATION_TXS5345.md |
| Star Voss attorney package | ✅ Pushed | star-voss/ATTORNEY_PACKAGE.md |
| HENRY_BRAIN.md updated | ✅ Pushed | HENRY_BRAIN.md |
| claude_desktop_config.json | ✅ Fixed | Local machine |
| GitHub PAT rotated | ✅ Done | ghp format, repo write scope |
| Anthropic API key rotated | ✅ Done | New key in config |
| HENRY_CONTEXT.md updated | ✅ Done | C:\Users\whitt\HENRY_CONTEXT.md |

---

## SECTION 6 — CRITICAL OPEN ITEMS

### Do TODAY
- [ ] **Scan F210 signed lease** → email to whittdwyer@gmail.com
- [ ] **Call APS.net (877) 632-1040** → TXS5513 buyer package
- [ ] **Call HAA (713) 595-0300** → Star Voss complaint
- [ ] **Buy Twilio number** (~$1.15/mo) → finish HENRY Phone

### This Week
- [ ] File RIA registration with Texas SSB (60-90 day clock not running)
- [ ] Submit LOI for TXS5345 (file is ready: dark-factory/LOI_TXS5345.md)
- [ ] Complete henry-core install (git pull + npm install + restart Desktop)
- [ ] Start OpenClaw Docker (docker-compose up in henry-os/openclaw/)
- [ ] Find Houston class action tenant attorney (contingency fee, DTPA)
- [ ] Request buyer packages for TXS5450 + TXS5491

---

## SECTION 7 — ANTHROPIC LATEST (as of 2026-03-21)

### Model: Claude Opus 4.6 (current session model)
- **Agent Teams**: Parallel multi-agent coordination in Claude Code — ENABLED
- **Adaptive Thinking**: Dynamic reasoning depth — default high effort
- **1M Token Context**: Beta, available on Developer Platform
- **128K Output Tokens**: Available
- **Compaction**: Server-side context summarization available

### Skills Format (Anthropic YAML frontmatter)
Correct format for skills:
```markdown
---
name: skill_name
description: "When Claude should call this..."
---
# Skill Content
```
Whitt has 233 skills at `C:\Users\whitt\.agent\skills` — need migration to YAML format.

### MCP Tool Search (Jan 2026 update)
- Progressive/on-demand tool loading now native
- henry-core uses this pattern — tools auto-register on startup

---

## SECTION 8 — AGENT ROSTER

| Invoke | Agent | Role | Model |
|--------|-------|------|-------|
| /orchestrator | ORCHESTRATOR | Routes all tasks | Opus 4.6 |
| /atlas | ATLAS | Strategy + acquisitions | Opus 4.6 |
| /ledger | LEDGER | Finance, valuations, SBA | DeepSeek R1 |
| /forge | FORGE | Code, MCP, architecture | DeepSeek R1 |
| /shield | SHIELD | Legal, LOIs, Star Voss | Opus 4.6 |
| /oracle | ORACLE | Research, due diligence | Opus 4.6 |
| /pulse | PULSE | Marketing, GTM, copy | Gemini Flash |
| /closer | CLOSER | Sales, proposals | Gemini Flash |
| /engine | ENGINE | Ops, sprint management | Gemini Flash |

---

## SECTION 9 — DARK FACTORY PIPELINE

| ID | Revenue | Buy At | Exit 7x | Status |
|----|---------|--------|---------|--------|
| TXS5513 | $424K | $170K | $2.1M | 🔴 CALL NOW |
| TXS5450 | $472K | $189K | $2.3M | Pipeline |
| TXS5491 | $910K | $364K | $4.5M | SBA eligible |
| TXS5345 | $142K | $57K | $784K | LOI ready |

**APS.net:** (877) 632-1040

---

## SECTION 10 — STAR VOSS LEGAL

- Units F210, F212, F310
- F210 original signed lease FOUND (2026-03-21) — scan + secure NOW
- 7 causes of action, 5 STRONG
- DTPA = 3x damages + mandatory attorney fees
- Class action potential: same bad-faith management across 7-8 Houston properties
- Attorney package: `star-voss/ATTORNEY_PACKAGE.md`
- HAA: (713) 595-0300 | TX AG: (800) 621-0508
- Evidence: C:\Users\whitt\Downloads\.STARVOSS_LEGAL_CASE\

---

## SECTION 11 — HOW HENRY OS WORKS

```
Whitt speaks/types
      ↓
  Claude Opus 4.6 (brain — always frontier model)
      ↓
  Task dispatcher
      ↓ ↓ ↓ ↓ ↓
[ORACLE] [LEDGER] [SHIELD] [FORGE] [PULSE] ← parallel, background
      ↓
  Results delivered to Whitt
      ↑
  Persistent memory (HENRY_BRAIN.md + agent memory files)
```

**Voice:** Browser Web Speech API (henry-voice.html in Chrome)
**Phone:** Twilio SMS + voice (henry-phone/)
**Agents:** OpenClaw Docker runtime (henry-os/openclaw/)
**MCP skills:** henry-core (20 specialists, all call Opus 4.6)

---

## SECTION 12 — CODEWORDS

| Codeword | Action |
|----------|--------|
| BUILD | Execute immediately. Show output. |
| FIX | Diagnose + fix. Show what changed. |
| EXPLAIN | Visual-first. Diagram. Examples. |
| ULTRA | Maximum depth. Full analysis. |
| STATUS | Full project state summary. |
| PAUSE | Checkpoint all state to HENRY_CONTEXT.md |

---
*Generated by HENRY AI — 2026-03-21 — Sonnet 4.6 session*
*Next session: paste kick-off prompt from Section 1*
