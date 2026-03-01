# HENRY AI — Research Archive
## Frontier Multi-Agent Systems & Memory
**Compiled:** 2026-03-01 | **Researcher:** Claude (Sonnet 4.6)
**Purpose:** Permanent reference. Informs all HENRY architecture decisions.

---

## EXECUTIVE SUMMARY (Bottom Line)

5 findings that changed HENRY's architecture:

1. **The harness is the moat** — Model is commodity. Architecture determines success.
2. **Agent Skills = progressive disclosure** — Context window is RAM. Load only what's needed.
3. **Persistent memory is the missing layer** — Working + episodic + semantic memory required.
4. **Living files — agents improve their own tools** — 40% efficiency gain documented.
5. **Scale effort to complexity** — Embed TIER rules in prompts or agents over-invest.

---

## SOURCE 1: ANTHROPIC ENGINEERING

### "How We Built Our Multi-Agent Research System" (Jun 2025)

**Architecture:**
- Pattern: Orchestrator-worker (lead agent + specialized subagents in parallel)
- Result: Multi-agent outperformed single-agent Claude Opus by **90.2%** on research tasks
- Token usage explains **80% of performance variance** on BrowseComp benchmark
- Multi-agent systems use ~15x more tokens than chat — justified for high-value tasks only

**Key lessons:**

| Lesson | What it means for HENRY |
|---|---|
| Teach orchestrator to delegate properly | Each sub-agent needs: objective, output format, tool guidance, task boundaries. Vague = duplicate work + gaps. | 
| Scale effort to query complexity | Simple: 1 agent, 3-10 calls. Compare: 2-4 sub-agents, 10-15 calls each. Complex: 10+ sub-agents. Embed scaling rules IN prompts. |
| Emergent behaviors | Small prompt changes unpredictably cascade. Best prompts = "frameworks for collaboration" not rigid scripts. |
| Observability critical | Agents are non-deterministic. Full production tracing required. Monitor decision patterns. |
| Let agents improve themselves | Claude 4 models are excellent prompt engineers. Let them rewrite their own tool descriptions. |
| Start wide, then narrow | Broad queries first, progressively focus. Prevents missing adjacent signals. |
| Parallel tool calling | 3-5 sub-agents in parallel + 3+ tools each = 90% time reduction. |
| Write plan to memory FIRST | Context windows get truncated at 200k tokens. Agents write plan before executing. |

**Evaluation strategy:**
- 20 queries sufficient for early development (don't over-build eval before product)
- LLM-as-judge: single prompt, 0.0-1.0 scores, pass-fail grade
- Focus on end-state evaluation for multi-turn conversations
- Human eval catches edge cases automation misses

**Production reliability:**
- Agents are stateful — errors compound. Need durable execution + graceful error handling
- Debugging requires full production tracing + monitoring decision patterns
- Rainbow deployments to avoid disrupting running agents
- Synchronous bottleneck — asynchronous preferred for scale

---

### "Equipping Agents for the Real World with Agent Skills" (Oct 2025 / Dec 2025 open standard)

**Core concept:** Skill = directory containing SKILL.md with YAML frontmatter + body

**3-Layer Progressive Disclosure:**

```
Layer 1: Metadata (name/description) → always loaded at startup (tiny cost)
Layer 2: Full SKILL.md → loaded when agent triggers the skill
Layer 3: Additional sub-files → loaded on demand as task requires

Context window changes dynamically. Amount of context in skill is "effectively unbounded."
```

**How it works:**
1. Context starts: core system prompt + ALL skill metadata + user message
2. Agent triggers skill: reads SKILL.md via tool call
3. Agent reads bundled sub-files (e.g., forms.md) as needed
4. Agent executes using loaded instructions

**Skills + Code execution:**
Skills can include pre-written scripts that agents execute as tools.
Code is deterministic + efficient for structured operations (PDF forms, sorting, data extraction).

**Development best practices:**
- Start with evaluation (identify gaps before building)
- Structure for scale (split SKILL.md into sub-files when >5k tokens)
- Think from agent's perspective (monitor usage, iterate based on observations)
- Iterate WITH the agent (ask it to capture successful approaches into reusable context)

**Security:** Skills from untrusted sources = attack vector. Audit before installing.

**Future vision:** Agents create, edit, and evaluate their own Skills autonomously.

**Tool-testing agent (specific Anthropic build):**
- Agent attempts to use flawed MCP tool
- Identifies failure mode
- Rewrites tool description automatically
- Result: **40% decrease in task completion time** for future agents using improved description

---

## SOURCE 2: AGENT HARNESS RESEARCH (2026)

### Phil Schmid — "The Importance of Agent Harness in 2026" (Jan 2026)
### Antonino Ingargiola — "The Rise of the Agent Harness" (Feb 2026)
### Aakash Gupta — "2025 Was Agents. 2026 Is Agent Harnesses" (Jan 2026)
### Evangelos Pappas — "The Agent Harness Is the Architecture" (Feb 2026)

**Core thesis:** Model = commodity. Harness determines success or failure.

**The computer metaphor:**

```
Model           = CPU (raw processing power — interchangeable)
Context Window  = RAM (limited, volatile working memory)
Agent Harness   = Operating System (curates context, boot sequence, standard drivers)
Agent           = Application (specific user logic running on top of OS)
Memory          = Hard Drive (persistent storage across sessions)
```

**Harness vs. Framework:**
- Framework: tools and patterns
- Harness: higher-level. Prompt presets, opinionated tool call handling, lifecycle hooks, ready-to-use capabilities. "Batteries included."

**The Bitter Lesson (applied to agents):**

| Company | What happened | Lesson |
|---|---|---|
| Manus | Refactored harness 5x in 6 months (same models each time) | Architecture > model choice |
| LangChain | Re-architected Open Deep Research 3x in one year | Iterative harness improvement compounds |
| Vercel | Removed 80% of agent tools | Accuracy: 80%→100%, tokens: -37%, speed: 3.5x |

**Key insight from Vercel:** More tools ≠ better agent. Fewer, well-defined tools = dramatically better performance.

**Capabilities that required complex pipelines in 2024 are handled by single context-window prompts in 2026.** Harnesses must allow ripping out "smart" logic as models improve.

---

## SOURCE 3: MANUS CONTEXT ENGINEERING

*(Manus acquired by Meta ~$2B Dec 2025 — validation of harness architecture value)*

**KV-Cache optimization:**

```
Uncached cost:  $3/MTok
Cached cost:    $0.30/MTok
Reduction:      10x from harness optimization alone

How:
  - Stable prefixes (standard sections go first, task-specific goes last)
  - Append-only context (corrections at end, never in middle)
  - Deterministic serialization
```

**Tool management via logit masking:**
- Context-aware state machine constrains tool selection
- Agents average ~50 tool calls per task
- Without constraints: agents pick wrong tools often, waste tokens
- With logit masking: only valid tools shown at each state = near-zero wrong-tool calls

**Context quality collapse:**
- Performance degrades past threshold NOT because model "forgot" — but because signal-to-noise ratio collapsed
- "Lost in the Middle" research: LLMs exhibit U-shaped attention (strong beginning/end, poor middle)
- Fix: critical info at start OR end — never buried

**Harness components:**
1. Human approval workflows
2. Filesystem access management
3. Tool orchestration
4. Sub-agent coordination
5. Prompt preset management
6. Lifecycle hooks (init, run, save state, handle failures, retry logic, logging)

**Convergence trend:** Training and inference environments converging. Context durability is new bottleneck.

---

## SOURCE 4: ACADEMIC PAPERS

### Hindsight (Dec 2025) — Structured Memory Architecture

**Components:**
- Salient snippets
- Vector stores
- Graph-based stores
- Temporal entity-aware memory layer
- Reflection layer

**Capabilities:** Retain, recall, reflect. Synthesized entity summaries, evolving beliefs, logical networks.
**Result:** Outperforms baselines on LongMemEval and LoCoMo benchmarks vs GPT-4o.

---

### A-MEM (Feb 2025) — Agentic Memory via Zettelkasten

**Core method:** Zettelkasten note-taking system adapted for agents.

**Features:**
- Dynamic indexing + linking
- Memory evolution over time
- Contextual descriptions, keywords, tags

**Why it matters:** Each memory note links to related notes. Agent doesn't just store facts — it stores relationships between facts. Improves adaptability and context-aware retrieval.

**Applied to HENRY:** Each agent memory file links to related agents ("handoff to CFO", "feeds LEGAL"). This IS the Zettelkasten pattern.

---

### MARS (Jan 2026) — Meta-Cognitive Reflection for Self-Improvement

**Inspired by:** Educational psychology

**Two reflection types:**
- Principle-based reflection: "What general rule does this failure reveal?"
- Procedural reflection: "What specific step went wrong?"

**Outputs:** Optimized instructions, agent evolution over time.
**Avoids:** Recursive loops and computational overhead.

**Applied to HENRY:** Self-improvement triggers (TOOL_FAILURE, LOW_CONFIDENCE, FASTER_PATH) are MARS-pattern reflection moments.

---

### Agent-R (Jan 2025) — Iterative Self-Training via Monte Carlo Tree Search

**Process:**
1. Agent attempts task
2. Failed trajectories are analyzed
3. Self-critique datasets built from failures
4. Behavior cloning from successful paths
5. Error correction integrated into next run

**Result:** Real-time action correction in interactive environments. Scalable self-improvement without human labels.

**Applied to HENRY:** OPTIMIZER agent reads EXECUTION_LOG.md + memory files. This IS Agent-R at the system level.

---

### MALT (Dec 2024) — Multi-Agent LLM Training with Specialized Roles

**Technique:** Joint outcome-based rewards + trajectory expansion + credit assignment.
**Models:** Llama 3.1 8B
**Results:** Improved performance on MATH, GSM8k, CQA.

**Implication for HENRY:** Specialized agent roles (CEO, CFO, CTO vs. generalist) is validated by academic training research — not just a product decision.

---

### Memory Survey Papers

**"Memory in the Age of AI Agents" (Dec 2025):**
Memory types: Token-level, parametric, latent, factual, experiential, working memory.
Emerging: RAG, context engineering, RL integration, multimodal memory, multi-agent memory.

**"The AI Hippocampus" (Jan 2026):**
- Implicit memory: Internal parameters, memorization, associative retrieval
- Explicit memory: External storage, dynamic knowledge representations
- Agentic memory: Persistent structures, long-term planning, self-consistency

**MemoryArena (Feb 2026):**
Benchmark for memory-agent-environment loops. Tests: multi-session tasks, memory acquisition, decision-making, experience distillation.
Finds: Current long-context memory benchmarks are insufficient — multi-session is what matters.

---

## SYNTHESIS: WHAT IT ALL MEANS FOR HENRY

### The Three Layers That Matter

```
Layer 1 — BEHAVIOR:   Agent files (markdown) shape how agents think
Layer 2 — KNOWLEDGE:  Memory files + spawn protocol = what agents know
Layer 3 — INTELLIGENCE: Claude Sonnet 4 (the CPU — interchangeable)
```

HENRY's moat is in Layers 1 and 2. Layer 3 is a commodity.

### The Memory Architecture

```
Working memory:   Context window (volatile — lost on session end)
Episodic memory:  [AGENT]_MEMORY.md ("what happened this session")
Semantic memory:  Architecture docs + spawn protocol ("what we know in general")
System memory:    HENRY_BRAIN.md ("where everything stands right now")
```

### The Self-Improvement Loop

```
Agent executes task
  → Flags TOOL_FAILURE / FASTER_PATH / LOW_CONFIDENCE
  → Writes to [AGENT]_MEMORY.md
  → OPTIMIZER reads all memory files after 10 sessions
  → OPTIMIZER proposes improvements
  → Whitt approves
  → Improvements deployed to agent files
  → Next session: agents are measurably better
```

This is Agent-R + MARS combined. The full academic self-improvement loop — implemented in production files.

---

## REFERENCES

| Source | Date | URL/Location |
|---|---|---|
| Anthropic multi-agent research system | Jun 2025 | anthropic.com/engineering |
| Anthropic Agent Skills | Oct 2025, Dec 2025 | anthropic.com/engineering |
| Phil Schmid — Agent Harness | Jan 2026 | philschmid.de |
| Antonino Ingargiola — Agent Harness | Feb 2026 | Medium |
| Aakash Gupta — 2026 Is Harnesses | Jan 2026 | aakashg.com |
| Evangelos Pappas — Harness Is Architecture | Feb 2026 | Medium |
| Manus context engineering | 2025 | Multiple sources (acquired by Meta Dec 2025) |
| Hindsight — structured memory | Dec 2025 | arXiv |
| A-MEM — Zettelkasten memory | Feb 2025 | arXiv |
| MARS — meta-cognitive reflection | Jan 2026 | arXiv |
| Agent-R — MCTS self-training | Jan 2025 | arXiv |
| MALT — multi-agent training | Dec 2024 | arXiv |
| Memory in Age of AI Agents survey | Dec 2025 | arXiv |
| The AI Hippocampus | Jan 2026 | arXiv |
| MemoryArena benchmark | Feb 2026 | arXiv |

---

*This document is the permanent research record. Do not modify — append new findings below with date.*
