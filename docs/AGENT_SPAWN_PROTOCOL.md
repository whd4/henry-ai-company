# HENRY AI — Agent Spawn Protocol
**Version:** 1.0 | **Date:** 2026-03-01
**Authority:** All agents must follow this when spinning up sub-agents or peer agents.

---

## WHY THIS EXISTS

Research (2025-2026) proved that vague agent briefings are the #1 cause of:
- Duplicate work across agents
- Context drift away from original goal
- Token waste on low-probability paths
- "Telephone game" degradation through agent chains

This protocol eliminates those failure modes.

---

## PART 1 — WHEN TO SPAWN

Spawn a sub-agent or peer agent ONLY when:

| Condition | Action |
|---|---|
| Task requires parallel work (2+ independent threads) | Spawn SUB-[PARENT]-[NN] agents |
| Task is outside your domain | Route to peer agent via ORCHESTRATOR |
| TIER 3+ complexity confirmed | Spin up parallel sub-agents |
| Token budget for current task would exceed TIER | Delegate sub-tasks before proceeding |

Do NOT spawn when:
- Task is TIER 1 or TIER 2 (you can handle it alone)
- You're unsure what to delegate (clarify first)
- Spawning would create coordination overhead > time saved

---

## PART 2 — NAMING CONVENTION

```
Sub-agents:  SUB-[PARENT]-[NN]
Examples:    SUB-RESEARCH-01, SUB-CFO-02, SUB-CTO-01

Peer agents: Use exact agent name
Examples:    RESEARCH, CFO, LEGAL
```

Sub-agent naming is permanent for the session. Do not reuse IDs.

---

## PART 3 — MANDATORY BRIEFING FORMAT

Every agent spawn MUST include ALL of the following. Missing fields = failed spawn.

```markdown
## AGENT BRIEF

Agent:          [SUB-RESEARCH-01 / CFO / etc.]
Spawned by:     [parent agent name]
Session ID:     [date-task-NN, e.g., 2026-03-01-DUE-DILIGENCE-01]

OBJECTIVE:
[One sentence. What does done look like? Be specific.]

SCOPE — WHAT TO COVER:
1. [specific sub-task]
2. [specific sub-task]

SCOPE — WHAT NOT TO COVER (critical):
- [explicit exclusion — what another agent is handling]
- [explicit exclusion]

TOOLS AUTHORIZED:
- [web_search / drive_search / github / specific MCP tool]
- [list only what this agent should use]

OUTPUT FORMAT:
- File path: [memory/SUB-RESEARCH-01-output.md]
- Structure: [findings / gaps / confidence / handoff]
- Do NOT return output through context — write to file only

TOKEN LIMIT:    [LOW <5k / MEDIUM <25k / HIGH <100k]
DONE WHEN:      [specific completion criterion]
DEADLINE:       [synchronous: wait / asynchronous: timestamp]
```

---

## PART 4 — SUB-AGENT RETURN FORMAT

When sub-agent completes, it MUST return:

```markdown
## SUB-AGENT RETURN

Agent:          [SUB-RESEARCH-01]
Parent:         [RESEARCH]
Task:           [what was done — one sentence]
File saved:     [memory/SUB-RESEARCH-01-output.md]
Confidence:     [X/20]
Key findings:   [3-5 bullet points — the signal, not the noise]
Gaps:           [what could not be determined]
Handoff:        [which agent should act on this data]
Tokens used:    [estimate — LOW/MEDIUM/HIGH]
```

Parent agent reads the file. Does NOT re-summarize through context.

---

## PART 5 — PARALLEL EXECUTION RULES

**Scaling (from Anthropic research system):**

| Task Type | Sub-agents | Tool calls each |
|---|---|---|
| Simple fact-finding | 0 (handle yourself) | N/A |
| Direct comparison / analysis | 2-4 parallel | 10-15 each |
| Complex research / due diligence | 5-10 parallel | 10-20 each |
| Full system build | 10+ with checkpointing | budget explicitly |

**Rules:**
1. Assign non-overlapping scope to each sub-agent (use WHAT NOT TO COVER)
2. All sub-agents write to separate files — never share a file
3. Parent agent synthesizes file outputs — never re-runs the research
4. If any sub-agent returns confidence < 12/20: parent flags gap, does not guess

---

## PART 6 — CONTEXT ENGINEERING DURING SPAWN

**Front-load critical instructions:**
First 200 tokens of every brief = mission-critical info.
Do not bury the objective. State it first.

**Append-only corrections:**
If you need to correct a brief mid-task: append correction at END.
Do not modify the original brief in-place.

**Stable prefixes for cache efficiency:**
Standard sections (ACTIVE CONTEXT, GUARDRAILS) go first.
Task-specific content goes last.
This enables 10x cost reduction via KV-cache hits.

**Lost-in-the-Middle prevention:**
Critical data at beginning OR end of context — never buried in middle.
For long outputs: put TL;DR at top, full data below.

---

## PART 7 — QUALITY GATES

Before accepting sub-agent output, parent agent checks:

```
[ ] Is every data point sourced or explicitly flagged as assumption?
[ ] Are gaps documented (not papered over)?
[ ] Does output match the DONE WHEN criterion?
[ ] Confidence >= 14/20? (if not: flag, do not discard — document gap)
[ ] File written to correct path?
```

If any gate fails: return brief to sub-agent with specific correction request.
Do NOT synthesize incomplete data into parent output.

---

## PART 8 — REPORTING CHAIN

```
SUB-AGENT → writes file → PARENT AGENT reads file
PARENT AGENT → synthesizes → ORCHESTRATOR
ORCHESTRATOR → routes output → WHITT
```

No agent skips a level in the reporting chain without ORCHESTRATOR approval.
Whitt sees the final synthesized output — not raw sub-agent data.

---

## PART 9 — SELF-IMPROVEMENT DURING SPAWN

After every spawn cycle, the spawning agent logs to its memory file:

```
SPAWN LOG:
  Session: [date-task]
  Agents spawned: [list]
  Coordination quality: [X/20]
  What worked: [one sentence]
  What to do differently: [one sentence]
  Token efficiency: [actual vs. budget]
```

The OPTIMIZER reads spawn logs to identify:
- Agents that consistently over-spawn (inefficiency)
- Agents that under-spawn on TIER 3+ tasks (bottleneck)
- Scope overlap patterns (wasted parallel work)

---

## PART 10 — EXAMPLE: FULL DUE DILIGENCE SPAWN

```
RESEARCH agent receives: "Full due diligence on TXS5513"
RESEARCH classifies: TIER 3
RESEARCH spawns 3 parallel sub-agents:

  SUB-RESEARCH-01:
    Objective: Financial profile (revenue, P&L, client concentration)
    NOT covering: Legal, operational
    Output: memory/SUB-RESEARCH-01-TXS5513-FINANCIAL.md
    Token limit: MEDIUM

  SUB-RESEARCH-02:
    Objective: Operational profile (staff, software, key person risk)
    NOT covering: Financial, legal
    Output: memory/SUB-RESEARCH-02-TXS5513-OPERATIONAL.md
    Token limit: MEDIUM

  SUB-RESEARCH-03:
    Objective: HNW/RIA profile (AUM, investment services, compliance exposure)
    NOT covering: Financial P&L, operations
    Output: memory/SUB-RESEARCH-03-TXS5513-HNW.md
    Token limit: MEDIUM

RESEARCH reads all 3 files. Synthesizes into single DD report.
Hands off: CFO (financial model) + LEGAL (compliance review)
```

---

## AUTHORITY

This protocol overrides any conflicting instructions in individual agent files.
When in doubt: follow this protocol.
For exceptions: flag to ORCHESTRATOR — do not self-authorize deviation.

**Maintained by:** OPTIMIZER
**Review trigger:** After 10 sessions or when spawn failure rate > 20%
