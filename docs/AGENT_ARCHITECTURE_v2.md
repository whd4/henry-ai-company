# HENRY AI — AGENT ARCHITECTURE v2
**Research Basis:** Anthropic Engineering, Manus Context Engineering, Phil Schmid Harness 2026, A-MEM, MemoryArena Feb 2026, MALT multi-agent training
**Version:** 2.0 | **Date:** 2026-03-01
**Status:** PRODUCTION STANDARD — All new agent files use this architecture

---

## WHY THIS ARCHITECTURE EXISTS

As of March 2026, the research is conclusive:

> **The model is a commodity. The harness determines whether agents succeed or fail.**
> — Phil Schmid, Anthropic Engineering, Manus post-mortem

Manus rebuilt their agent harness 5 times in 6 months. Same models. 5 architectures. Each rebuild improved reliability. Vercel removed 80% of their agent's tools — accuracy jumped from 80% to 100%, tokens dropped 37%, speed improved 3.5x.

Anthropics own internal research system — the one powering Claude Research — uses this exact pattern. Their multi-agent system outperformed single-agent Claude Opus by 90.2% on complex research tasks.

We are building HENRY on what works at the frontier, not what seems smart.

---

## THE COMPUTER METAPHOR (how to think about this)

```
MODEL          = CPU          (raw intelligence, interchangeable)
CONTEXT WINDOW = RAM          (volatile, limited, expensive)
HARNESS        = OPERATING SYSTEM  (boots the agent, manages resources)
AGENT FILE     = APPLICATION  (specific logic running on the OS)
MEMORY FILES   = HARD DRIVE   (persistent, survives context wipes)
```

The HENRY harness is OpenClaw. The agent files are what run on top of it.
Memory files are GitHub. That is the hard drive.

---

## THE 3-LAYER PROGRESSIVE DISCLOSURE STANDARD

Source: Anthropic Agent Skills architecture (Oct 2025, production-validated)

Agent files are NOT monolithic system prompts dumped into context.
They are 3-layer structures that load only what's needed — context window is RAM, treat it like RAM.

```
LAYER 1 — METADATA (always in context, < 200 tokens)
  name:
  description:
  triggers: [keywords that activate this agent]
  version:
  memory_file: [path to persistent memory]

LAYER 2 — SKILL.md CORE (loaded when agent is triggered, < 2000 tokens)
  Identity and role
  Constraints and guardrails
  Output format
  Scaling rules (effort vs. complexity)
  Memory read/write protocol
  Self-improvement triggers

LAYER 3 — LINKED SUB-FILES (loaded on demand, unlimited depth)
  domain_knowledge.md  — specific facts, frameworks, checklists
  playbooks/           — step-by-step procedures for known scenarios
  memory/              — persistent memory files (read at start, write at end)
  scripts/             — executable code the agent can run
```

**Key insight from Anthropic:** Agents with filesystem access don't need everything in context.
Context bundled into skills is effectively unbounded — load it progressively.

---

## THE HENRY HARNESS PROTOCOL

Every agent in the HENRY system runs this protocol on every invocation:

```
BOOT SEQUENCE (runs automatically at agent start):
1. READ memory file → load what I know about current state
2. READ task brief → understand what's being asked
3. CLASSIFY complexity → select effort level (see scaling rules below)
4. PLAN → multi-path scoring before any action
5. EXECUTE → run the plan
6. SELF-EVALUATE → score output before returning
7. WRITE memory → log what was done, what was learned, next recommended action

SHUTDOWN SEQUENCE (runs automatically at agent end):
1. Write EXECUTION_LOG entry (timestamp, task, outcome, confidence, lessons)
2. Update agent's own AGENT_MEMORY.md with lessons learned
3. Flag any tool or process improvements discovered
4. Return output to ORCHESTRATOR with confidence score
```

---

## SCALING RULES — EMBED IN EVERY AGENT

Source: Anthropic Research System engineering post (Jun 2025)
Without embedded scaling rules, agents over-invest in simple tasks. This is the most common failure mode.

```
COMPLEXITY TIER 1 — Simple Lookup
  When: Single fact, single decision, clear answer exists
  Resources: 1 agent, 3-10 tool calls
  Token budget: LOW
  Example: "What is TXS5513's revenue?"

COMPLEXITY TIER 2 — Analysis / Comparison
  When: Multiple options, scoring required, recommendation needed
  Resources: 1 agent + 1-2 sub-agents if parallel paths exist
  Token budget: MEDIUM
  Example: "Compare TXS5513 vs TXS5450 for acquisition priority"

COMPLEXITY TIER 3 — Deep Research / Strategy
  When: Open-ended, path-dependent, multi-domain
  Resources: Lead agent + 3-10 specialized sub-agents in parallel
  Token budget: HIGH — justified by task value
  Example: "Build complete due diligence on TXS5513 including RIA exposure"

COMPLEXITY TIER 4 — System Build / Full Execution
  When: Multi-day workstream, many dependencies, external actions
  Resources: Full HENRY team, sub-agents, checkpointing
  Token budget: MAXIMUM — must justify against business value
  Example: "Execute Dark Factory Week 1 — all tracks"
```

---

## PERSISTENT MEMORY STANDARD

Source: A-MEM (Feb 2025), Hindsight Memory (Dec 2025), MemoryArena (Feb 2026), Anthropic Research post-mortem

Every agent has its own memory file. Format:

```markdown
# [AGENT NAME] — PERSISTENT MEMORY
Last Updated: [timestamp]
Session Count: [N]

## CURRENT STATE
[What I am working on right now]

## RECENT ACTIONS
[Last 5 things I did, with outcomes]

## LESSONS LEARNED
[What I discovered that changes how I work]

## TOOL IMPROVEMENTS FLAGGED
[Tools that worked poorly — for OPTIMIZER agent to fix]

## NEXT RECOMMENDED ACTION
[What should happen next time I am invoked]

## WHITT PREFERENCES OBSERVED
[How Whitt likes to work — learned from interaction]
```

Memory file location: `memory/[AGENT_NAME]_MEMORY.md`
Write trigger: End of every session, even short ones.
Read trigger: First action of every session, before anything else.

**WHY THIS MATTERS:** Anthropic's own research agent saves its plan to memory before executing because context windows get truncated at 200k tokens. Memory files are the solution. Every HENRY agent writes to memory or it doesn't run.

---

## SELF-IMPROVEMENT TRIGGERS — LIVING FILES

Source: Anthropic Engineering (tool-testing agent, 40% improvement from self-description rewrites)
Source: MARS framework — "Meta-cognitive Reflection for Efficient Self-Improvement" (Jan 2026)
Source: Agent-R — "Iterative Self-Training via Monte Carlo Tree Search" (Jan 2025)

Agent files are NOT static. They evolve.

**Built-in self-improvement triggers in every agent:**

```
TRIGGER: TOOL_FAILURE
  When: A tool call fails or returns poor results
  Action: Note the failure. Log to memory. Recommend description improvement.
  Format: "TOOL_IMPROVEMENT: [tool name] — [what happened] — [suggested fix]"

TRIGGER: LOW_CONFIDENCE_OUTPUT
  When: Confidence score < 14/20
  Action: Self-reflect before returning. "Why did I score low?"
  Log the root cause. Adjust approach for next invocation.

TRIGGER: TASK_FASTER_PATH_DISCOVERED
  When: Agent finds a more efficient route mid-execution
  Action: Complete current task. Then write the shortcut to memory.
  Format: "SHORTCUT: [task type] → [faster approach] (saved ~X tokens)"

TRIGGER: INSTRUCTION_DRIFT
  When: Agent detects it has drifted from original task goal
  Action: STOP. Re-read original objective. Re-anchor. Log drift cause.
  This is the agent harness equivalent of a watchdog timer.

TRIGGER: END_OF_SESSION
  When: Every session ends
  Action: Write full memory update. Score the session. Recommend next action.
  Non-negotiable. Every session. Even 5-minute ones.
```

---

## THE OPTIMIZER AGENT — SYSTEM SELF-IMPROVEMENT

Source: Anthropic (tool-testing agent), Agent-R (iterative self-training), MARS (meta-cognitive reflection)

The HENRY system includes a dedicated OPTIMIZER agent that runs periodically.
This is the agent that makes all other agents smarter over time.

**OPTIMIZER reads:**
- All agent memory files
- All TOOL_IMPROVEMENT flags
- All SHORTCUT discoveries
- Execution logs for failure patterns

**OPTIMIZER does:**
- Rewrites tool descriptions where failures were logged
- Updates agent SKILL.md files with discovered shortcuts
- Identifies agents that are duplicating work (task overlap patterns)
- Surfaces patterns to Whitt: "These 3 agents are inefficient — here's why"
- Proposes new sub-agent configurations for common task types

**OPTIMIZER runs:**
- Automatically: After 10 sessions logged, or weekly
- Manually: Whitt says `OPTIMIZER: run` or `OPTIMIZE: [specific agent]`

**OPTIMIZER does NOT:**
- Push changes without showing Whitt first
- Change agent identity, values, or business context
- Remove guardrails or constraints

---

## CONTEXT ENGINEERING — HOW HENRY STAYS SHARP

Source: Manus Context Engineering post, Anthropic harness guide, Lost in the Middle research (Liu et al.)

**The U-shaped attention problem:** LLMs attend strongly to the beginning and end of context. Middle content gets lost. This is why long agent runs degrade — important early instructions get buried.

**HENRY's countermeasures:**

```
1. FRONT-LOAD CRITICAL INSTRUCTIONS
   First 200 tokens of every agent prompt = mission-critical info
   Never bury constraints in the middle

2. APPEND-ONLY CONTEXT (Manus pattern)
   Don't modify earlier context. Append corrections at the end.
   The model attends to the end. Use it.

3. SUBAGENT FILESYSTEM OUTPUT (Anthropic pattern)
   Subagents write results to files. Pass file references to lead agent.
   Not: subagent → memory → lead agent (telephone game degrades quality)
   Yes: subagent → filesystem → lead agent reads file (full fidelity)

4. CONTEXT COMPACTION AT THRESHOLD
   When approaching 150k tokens: summarize completed work, archive it
   Start fresh sub-task with clean context + summary reference
   Anthropic: agents spawn fresh subagents with clean contexts + handoff notes

5. STABLE PREFIXES FOR CACHE EFFICIENCY
   System prompt = never changes between runs (cache hit = 10x cheaper)
   Dynamic content = always appended at end, never inserted in middle
   Manus achieved 10x cost reduction purely from cache optimization
```

---

## TOKEN EFFICIENCY STANDARDS

Source: Manus (KV-cache optimization), Vercel (tool reduction), Anthropic (scaling rules)

Every agent must:
- Report token tier used (LOW / MEDIUM / HIGH / MAXIMUM) with every output
- Never use TIER 3 for a TIER 1 task
- Flag when a task takes more tokens than expected (potential optimization opportunity)

System-wide targets:
- Simple queries: < 5,000 tokens
- Analysis tasks: < 25,000 tokens  
- Deep research: < 100,000 tokens
- Full strategy sessions: budget explicitly before starting

---

## SUB-AGENT PROTOCOL

### Naming
```
FORMAT:  SUB-[PARENT]-[NN]
Example: SUB-CFO-01, SUB-RESEARCH-02, SUB-CTO-01
```

### Briefing Format (what parent sends to sub-agent)
Source: Anthropic Research post — vague sub-agent briefs cause duplicate work and coverage gaps

```
SUB-AGENT BRIEFING:
  Agent:       SUB-[NAME]-[NN]
  Parent:      [PARENT AGENT]
  Objective:   [ONE sentence — exactly what to find/do]
  Scope:       [What to cover — and what NOT to cover (prevents overlap)]
  Tools:       [Which specific tools to use]
  Output:      [Exact format of what to return]
  File output: [Path to write results — use filesystem, not context]
  Token limit: [TIER 1/2/3]
  Done when:   [Definition of done]
```

### Return Format (what sub-agent sends back)
```
SUB-AGENT RETURN:
  Agent:      SUB-[NAME]-[NN]
  Task done:  [what was completed]
  Results:    [findings — facts, data, output]
  File saved: [path where full output was written]
  Confidence: [X/20]
  Gaps:       [what couldn't be determined]
  Next:       [recommended follow-up if needed]
```

### Reporting Chain
```
SUB-AGENT → PARENT AGENT → ORCHESTRATOR → WHITT
```
Sub-agents never surface directly to Whitt without passing through their parent.

---

## AGENT FILE TEMPLATE (use this for all new agents)

See: `docs/agent-definitions/AGENT_TEMPLATE.md`

---

## MIGRATION STATUS — EXISTING AGENTS

All 9 existing agent files were built on v1 architecture (monolithic prompts).
They are functional. They should be migrated to v2 progressively.

Priority order for migration:
1. ORCHESTRATOR (it routes everything — most leverage)
2. RESEARCH (heaviest token user — most savings from scaling rules)
3. CFO (financial models — most value from persistent memory)
4. All others as time permits

Migration does NOT require rewriting the business logic.
It requires adding: memory protocol, scaling rules, self-improvement triggers, and progressive disclosure structure.
