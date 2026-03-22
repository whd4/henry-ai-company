# HENRY_BRAIN.md — Master State File
**Last Updated:** 2026-03-21 | **Session:** HENRY OS Build + Mission Control + Claude Code Setup
**Resume Command:** "Read HENRY_BRAIN.md — Status + next action."

---

## OWNER
Whitt Dwyer | Houston TX | whittdwyer@gmail.com | GitHub: whd4
ADD/ADHD — bottom line first, numbered steps, micro-steps, NEXT ACTION always
Claude Max Plan | Opus 4.6 primary

---

## TOP PRIORITIES RIGHT NOW (do these before anything else)

| # | Action | Detail | Status |
|---|--------|--------|--------|
| 1 | 🔴 Call APS.net | (877) 632-1040 — TXS5513 buyer package | NOT DONE |
| 2 | 🔴 Scan F210 lease | Photograph every page → email whittdwyer@gmail.com | NOT DONE |
| 3 | 🔴 Call HAA | (713) 595-0300 — Star Voss complaint | NOT DONE |
| 4 | 🔴 Buy Twilio number | console.twilio.com — ~$1.15/mo — finish HENRY Phone | NOT DONE |
| 5 | 🟡 Submit LOI TXS5345 | File: dark-factory/LOI_TXS5345.md — ready to send | NOT DONE |
| 6 | 🟡 File RIA — Texas SSB | 60-90 day clock NOT started | NOT DONE |
| 7 | 🟢 Restart Claude Desktop | Quit + relaunch → comes back to THIS chat | PENDING |
| 8 | 🟢 git pull henry-ai-company | Get all today's pushes to local machine | PENDING |

---

## WHAT WAS BUILT THIS SESSION (2026-03-21)

### 1. PRISM-MC Engine (henry-os/henry-core/src/prism.js)
**Status:** ✅ COMPLETE — pushed to GitHub + written to local machine
- Triple-Lens: 3 parallel Opus 4.6 calls (Optimizer / Validator / Contrarian)
- Monte Carlo: each lens scored 0-20 on 4 dimensions (accuracy/completeness/actionability/alignment)
- DeepConf gate: 14/20 threshold — loops up to 3x if below
- Winner delivered with full confidence trace
- Path: `henry-os/henry-core/src/prism.js`

### 2. RALPH Loop (henry-os/henry-core/src/ralph.js)
**Status:** ✅ COMPLETE — pushed to GitHub + written to local machine
- Persistent orchestrator — loops up to 8 iterations
- Monte Carlo rates every sub-agent path after each action
- Prune threshold: 8/20 — path abandoned, agent redirected
- Solve threshold: 16/20 — deliver result
- All sub-agents share `/data/status/TASK_ID.json` status board
- Max 6 parallel sub-agents per iteration
- Path: `henry-os/henry-core/src/ralph.js`

### 3. handler.js — Updated (henry-os/henry-core/src/handler.js)
**Status:** ✅ COMPLETE — all 3 engines wired
- Route 1: RALPH Loop (RALPH: prefix, ralph:true flag, loki_mode, autonomous_loop, task >200 chars)
- Route 2: PRISM-MC (strategic tools + strategy keywords)
- Route 3: Fast Path (everything else)
- Path: `henry-os/henry-core/src/handler.js`

### 4. HENRY Mission Control — NASA Edition (HENRY_MISSION_CONTROL.html)
**Status:** ✅ COMPLETE — available in Downloads
- Full NASA mission control room aesthetic (CRT scanlines, Orbitron font, phosphor green)
- 8 live screens: Agent Roster, Dark Factory Pipeline, PRISM-MC Gauges, RALPH Loop, Signal Monitor, System Log, Priority Queue, Power Techniques
- Scrolling ticker tape at bottom with all priorities
- Mascot: Officer Clawsworth — animated SVG lobster
  - Full lobster anatomy: tail segments, walking legs, big claws that snap, antennae that wave
  - Police badge on body, compound eyes track cursor
  - Mouth animates when talking, antennae wave when speaking
  - Patrols, bobs, eyes track mouse
  - 10 Cartman-attitude lines — self-important, tenacious, impatient
  - Click him for briefings, click agents/deals for situational awareness
- Priority queue: checkable, he reacts to each completion
- All 20 power techniques with individual toggles + master switch + 3 combo presets
- Local path: `C:\Users\whitt\Downloads\HENRY_MISSION_CONTROL.html` (multiple versions)
- OPEN IN CHROME FULL SCREEN (F11)

### 5. Power Techniques Panel (in Mission Control)
**Status:** ✅ COMPLETE — all 20 notecards from uploaded file
- 4 always-on: Role Assignment (#3), Context Priming (#8), Skill Invocation (#11), Memory Management (#12), Context Referencing (#19)
- 16 toggleable with individual switches
- Master toggle activates all 20
- 3 combo presets: ADD/ADHD, Production Code, Max Intelligence
- All 20 confirmed accurate and real

### 6. Henry Claude Code Setup (henry-os/henry-claude-code/)
**Status:** ✅ COMPLETE — pushed to GitHub
Adapted from Obsidian project: `C:\Users\whitt\Downloads\.4MYAI\Claude-Code-Everything-You-Need-to-Know-main`

**Hooks (auto-run on every tool call):**
- `pre_tool_use.py` — blocks rm -rf, blocks .env access, logs all calls
- `post_tool_use.py` — audit trail for every tool result
- `stop.py` — TTS "Task complete Whitt!" + saves full transcript to chat.json
- `notification.py` — TTS "Your agent needs your input"
- `utils/tts/pyttsx3_tts.py` — free TTS, no API key (pip install pyttsx3)

**Agents (invoke with /agents name in Claude Code CLI):**
- `tech-lead-architect` — system design, HENRY stack aware
- `frontend-engineer` — HENRY aesthetic specialist
- `code-reviewer` — security, performance, quality
- `project-manager` — knows all 5 HENRY tracks
- `ux-designer` — ADD/ADHD-optimized UX flows

**Custom Commands:**
- `/todo` — sprint task manager with due dates
- `/review` — full code review checklist
- `/pr` — auto PR with logical commit splitting
- `/tdd` — test-driven development workflow
- `/deploy` — deploy henry-core, openclaw, or dark-factory

**CLAUDE.md** — auto-loads HENRY context into every Claude Code session

---

## SYSTEM ARCHITECTURE — THREE BRAINS

### Brain 1: henry-launcher
- Docker-based white-label product
- OpenClaw framework with HENRY personality
- Status: Built, Docker/WSL deployment pending

### Brain 2: henry-ai-company (BMAD V6)
- 9-agent system with persistent memory
- OPTIMIZER self-improvement loop
- Status: RALPH + PRISM-MC NOW WIRED IN

### Brain 3: henry-core MCP
- 20 specialist stateless skills
- All routes to RALPH / PRISM-MC / Fast Path
- Status: ✅ FULLY BUILT — needs Claude Desktop restart to activate

---

## AGENT ROSTER (names UPDATED to plain English)

| Claude Code ID | Plain English Name | Role | Model | Status |
|---------------|-------------------|------|-------|--------|
| /router | The Router | Orchestrator | Opus | ✅ Online |
| /strategist | The Strategist | Strategy & acquisitions | Opus | ✅ Online |
| /finance | The Finance Agent | Finance & valuations | DeepSeek R1 | 🟡 Busy |
| /engineer | The Engineer | Code & infrastructure | DeepSeek R1 | ✅ Online |
| /legal | The Legal Agent | Legal & contracts | Opus | ✅ Online |
| /researcher | The Researcher | Research & due diligence | Opus | 🟡 Busy 91% |
| /marketer | The Marketer | Marketing & growth | Gemini Flash | 💤 Idle |
| /sales | The Sales Agent | Sales & outreach | Gemini Flash | 💤 Idle |
| /ops | The Ops Agent | Sprint & operations | Gemini Flash | ⚠️ Warn |

---

## DARK FACTORY PIPELINE

| Deal | Revenue | Buy At (0.4x) | Exit (7x) | Return | Status |
|------|---------|---------------|-----------|--------|--------|
| TXS5513 | $424K | $170K | **$2.1M** | 12.4x | 🔴 CALL NOW — HNW/RIA upsell |
| TXS5345 | $142K | $57K | $784K | 13.8x | 🟡 LOI READY — send today |
| TXS5491 | $910K | $364K | **$4.5M** | 12.4x | 🔵 SBA eligible — Live Oak Bank |
| TXS5450 | $472K | $189K | $2.3M | 12.2x | 🔵 Pipeline — research phase |

**APS.net broker:** (877) 632-1040
**SBA contact:** Live Oak Bank (910) 790-5867
**RIA registration:** Texas SSB — NOT FILED — 60-90 day clock NOT running

---

## STAR VOSS LEGAL
- Units: F210, F212, F310
- F210 original signed lease: FOUND — SCAN + EMAIL NOW
- 7 causes of action — 5 STRONG
- DTPA §17.46 = 3x damages + mandatory attorney fees
- Class action potential: same illegal lease boilerplate, 7-8 Houston properties
- Evidence: `C:\Users\whitt\Downloads\.STARVOSS_LEGAL_CASE\` (360+ files)
- Attorney package: `star-voss/ATTORNEY_PACKAGE.md` on GitHub
- HAA: (713) 595-0300 | TX AG Consumer Protection: (800) 621-0508

---

## GITHUB STATUS
- Repo: github.com/whd4/henry-ai-company (main)
- PAT: ghp format, repo write scope — WORKING
- All pushes from this session confirmed committed

**Files pushed this session:**
- `henry-os/henry-core/src/prism.js` — PRISM-MC engine
- `henry-os/henry-core/src/ralph.js` — RALPH Loop
- `henry-os/henry-core/src/handler.js` — routing logic (UPDATED)
- `henry-os/henry-claude-code/.claude/hooks/pre_tool_use.py`
- `henry-os/henry-claude-code/.claude/hooks/post_tool_use.py`
- `henry-os/henry-claude-code/.claude/hooks/stop.py`
- `henry-os/henry-claude-code/.claude/hooks/notification.py`
- `henry-os/henry-claude-code/.claude/hooks/utils/tts/pyttsx3_tts.py`
- `henry-os/henry-claude-code/.claude/settings.json`
- `henry-os/henry-claude-code/.claude/agents/tech-lead-architect.md`
- `henry-os/henry-claude-code/.claude/agents/frontend-engineer.md`
- `henry-os/henry-claude-code/.claude/agents/code-reviewer.md`
- `henry-os/henry-claude-code/.claude/agents/project-manager.md`
- `henry-os/henry-claude-code/.claude/agents/ux-designer.md`
- `henry-os/henry-claude-code/.claude/commands/todo.md`
- `henry-os/henry-claude-code/.claude/commands/review.md`
- `henry-os/henry-claude-code/.claude/commands/pr.md`
- `henry-os/henry-claude-code/.claude/commands/tdd.md`
- `henry-os/henry-claude-code/.claude/commands/deploy.md`
- `henry-os/henry-claude-code/CLAUDE.md`
- `henry-os/henry-claude-code/README.md`
- `HENRY_BRAIN.md` (this file)

---

## LOCAL MACHINE KEY PATHS

```
C:\Users\whitt\HENRY_CONTEXT.md                             ← READ FIRST every session
C:\Users\whitt\HENRY_KICKOFF_PROMPT.txt                     ← Opus kickoff prompt
C:\Users\whitt\AppData\Roaming\Claude\claude_desktop_config.json
C:\Users\whitt\Development\henry-ai-company\                ← Main repo (cloned)
C:\Users\whitt\Development\henry-ai-company\henry-os\henry-core\src\  ← RALPH+PRISM files
C:\Users\whitt\Development\AI-Projects\                    ← AEGIS, PRISM, BMAD
C:\Users\whitt\Downloads\HENRY_MISSION_CONTROL.html         ← Open in Chrome
C:\Users\whitt\Downloads\.4MYAI\Claude-Code-Everything-You-Need-to-Know-main\ ← Source material
C:\Users\whitt\Downloads\.STARVOSS_LEGAL_CASE\             ← Star Voss evidence
```

---

## MCP SERVERS (claude_desktop_config.json)

| Server | Status | Notes |
|--------|--------|-------|
| filesystem | ✅ Live | C:\ + D:\ |
| github | ✅ Live | whd4 org, new PAT |
| command-center | ✅ Configured | DevFactory path |
| henry-core | ⚠️ Needs restart | All files ready |
| bmad | ✅ Configured | AI-Dev path |
| aegis | ⚠️ Wired | .venv Python path |

**Fix henry-core:** Just restart Claude Desktop — config + .env + node_modules all ready

---

## ENGINES STATUS

| Engine | Status | Gate | Notes |
|--------|--------|------|-------|
| PRISM-MC | ✅ Wired in handler.js | 14/20 DeepConf | 3 lenses parallel |
| RALPH Loop | ✅ Wired in handler.js | 8/20 prune, 16/20 solve | 8 iterations max |
| Fast Path | ✅ Always available | N/A | Single call + confidence |
| Status Board | ✅ Built | N/A | `/data/status/TASK_ID.json` |

**Trigger RALPH:** Start task with `RALPH:` or pass `ralph: true`

---

## OPEN TASKS — NOTHING DROPS

### TODAY (critical, in order)
- [ ] Restart Claude Desktop → come back to THIS chat
- [ ] `git pull` in `C:\Users\whitt\Development\henry-ai-company`
- [ ] Open `HENRY_MISSION_CONTROL.html` in Chrome (F11 full screen)
- [ ] Call APS.net (877) 632-1040 → TXS5513 buyer package
- [ ] Scan F210 lease → email to whittdwyer@gmail.com
- [ ] Call HAA (713) 595-0300 → Star Voss complaint
- [ ] Buy Twilio number ($1.15) → finish HENRY Phone

### THIS WEEK
- [ ] Submit LOI for TXS5345 (file ready: dark-factory/LOI_TXS5345.md)
- [ ] File RIA registration with Texas SSB
- [ ] Install Claude Code CLI: `npm install -g @anthropic-ai/claude-code`
- [ ] Install TTS: `pip install pyttsx3`
- [ ] Copy henry-claude-code/.claude/ folder into active projects
- [ ] Run `docker-compose up` in henry-os/openclaw/ → get OpenClaw online
- [ ] Call Live Oak Bank (910) 790-5867 → TXS5491 SBA structure
- [ ] Find Houston class action tenant attorney (contingency fee)

### HORIZON
- [ ] EIDOLON personal AI OS — full spec in EIDOLON_HANDOFF.md
- [ ] henry-launcher product tiers: Personal / Pro / Enterprise
- [ ] Fiverr/Upwork AI automation gigs (PDF, research, Windows, GitHub)
- [ ] Finish Twilio HENRY Phone integration
- [ ] Skills format migration to new Anthropic YAML frontmatter

---

## CODEWORDS
| Word | Action |
|------|--------|
| BUILD | Execute immediately, show output |
| FIX | Diagnose + fix, show what changed |
| EXPLAIN | Visual-first, diagram, short sentences |
| ULTRA | Maximum depth, all resources |
| STATUS | Full project state summary |
| PAUSE | Checkpoint all state to HENRY_BRAIN.md |
| RALPH: [goal] | Trigger RALPH persistent loop |

---

## RESUME INSTRUCTIONS

When starting a new session, say:
> "Read HENRY_BRAIN.md from whd4/henry-ai-company — Status + next action."

Or paste the kickoff prompt from:
`C:\Users\whitt\HENRY_KICKOFF_PROMPT.txt`

**CRITICAL:** After restarting Claude Desktop — come back to THIS chat, not a new one.
Only open a new chat if using the kickoff prompt for a completely fresh session.

---
*Generated by HENRY OS — 2026-03-21 session*
