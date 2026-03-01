# HENRY AI — Research Archive
## Frontier Multi-Agent Systems & Memory
**Compiled:** 2026-03-01 | **Researcher:** Claude (Sonnet 4.6)
**Purpose:** Permanent reference. Informs all HENRY architecture decisions.
**Living file:** Append new findings with date. Never overwrite existing entries.

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

## SOURCE 5: PERPLEXITY COMPUTER (Feb 27, 2026)
**Added:** 2026-03-01 | **Researcher:** Claude (Sonnet 4.6)

### What It Is
Cloud-based, fully managed multi-agent orchestration platform. Launched Feb 25, 2026.
Coordinates **19+ frontier AI models** (Anthropic, Google, OpenAI, xAI) within a single interface.
Available only to Perplexity Max subscribers at **$200/month** + credit-based usage.
**No public developer API** for the orchestration layer (as of March 2026).

### Architecture: The Meta-Router
Core is a **meta-router** that:
1. Receives natural-language goal
2. Decomposes into subtasks
3. Classifies each by type/complexity
4. Routes to optimal model — invisibly to user

**Known model routing:**
| Model | Role |
|---|---|
| Claude Opus 4.6 | Primary reasoning engine, orchestration, complex coding |
| Google Gemini | Deep research, multi-source web aggregation |
| ChatGPT 5.2 | Long-context recall, month-long workflows |
| Grok | Ultra-low-latency lightweight queries (cost protection) |
| Nano Banana | Image generation |
| Veo 3.1 | Video generation |

**Key design principle:** Decoupled concerns — reasoning, code, summarization, vision, retrieval each have separate routing logic. Model-agnostic — swap models without redesigning platform.

### Capabilities
- Research & analysis: market research, competitive intel, parallel web search
- Document creation: reports, slide decks, spreadsheets
- Software development: web dashboards, micro-apps, Android apps — end to end
- Async monitoring: email/calendar/flight watching, condition-based triggers, scheduled briefings
- Tasks can run **for hours or months** in isolated cloud sandboxes
- 400+ app integrations (Gmail, Slack, GitHub, Notion, Salesforce, etc.)

### Perplexity Computer vs. OpenClaw

| Dimension | Perplexity Computer | OpenClaw |
|---|---|---|
| Deployment | Fully managed cloud | Self-hosted, local-first |
| Interface | Web app | Messaging apps (Telegram, WhatsApp, etc.) |
| Model routing | Proprietary meta-router, 19+ models | User-configured, 14+ providers + local models |
| Data residency | Perplexity's cloud | User's own hardware |
| Extensibility | 400+ curated connectors | Open skill system, shell access, MCP |
| Pricing | $200/month + credits | Free (you pay model API costs) |
| Source code | Proprietary | MIT open-source |
| Security | Sandboxed cloud isolation | Broad local permissions |

**Bottom line:** Perplexity Computer = Apple's curated App Store. OpenClaw = open web. Same goal (multi-model agent orchestration), opposite philosophy.

### What This Means for HENRY's Product Strategy
**HENRY's product is exactly this** — a custom-configured OpenClaw harness sold as a managed service.

```
Perplexity Computer:  $200/month flat, Perplexity controls the harness
HENRY [VERTICAL]:     $500 setup + $X/month, Whitt controls the harness, client owns their AI bill

HENRY's advantage:
  - Vertical-specific (CPA firms, HVAC, contractors — not generic)
  - Client pays their own API costs directly (no margin compression)
  - OpenClaw is open-source foundation — zero licensing cost
  - Whitt's custom agent configs ARE the product (the harness is the moat)
```

**No developer API for Perplexity Computer = no competition for builders yet.**
Watch March 11, 2026 "Ask" developer conference for API announcement.

### Pricing
- Max tier: $200/month required
- Included: 10,000 credits/month
- Launch bonus: 20,000 credits (expires 30 days)
- Additional credits: pay-as-you-go, auto-refill available
- Unused monthly credits do NOT roll over
- Tasks pause (not cancel) when credits run out

---

## SOURCE 6: PEER REVIEW OF HENRY ARCHITECTURE (2026-03-01)
**Added:** 2026-03-01 | **Source:** Gemini Pro 3.1 independent peer review

### Overall Assessment: Accept with Major Revisions

### ✅ Valid Critiques (Claude agrees)

**1. The "Bitter Lesson" contradiction is real.**
Research says complex pipelines are being replaced by single-context prompts — yet HENRY builds a massively complex pipeline (parallel sub-agents, Zettelkasten memory, MCTS, logit masking).
- **Resolution:** HENRY's complexity is *transitionally* justified (models aren't quite there yet in 2026). Architecture should shrink over time as model capabilities absorb pipeline logic. Build rip-out hooks from day one.

**2. 20-query eval is insufficient for OPTIMIZER write permissions.**
For a system that auto-rewrites tools system-wide, 20-query LLM-as-judge is dangerously low bar.
- **Resolution:** OPTIMIZER requires higher eval threshold before pushing system-wide updates. Minimum 50 queries, human approval gate on structural changes. This is a real operational risk.

**3. "Model = commodity" vs. "Claude 4 is excellent" contradiction.**
Architecture simultaneously claims models don't matter AND relies on Claude 4's specific reasoning quality.
- **Resolution:** Models are approaching commodity but not there yet in 2026. HENRY uses Claude Sonnet 4 as daily driver. Architecture should work when model is swapped, but current quality dependency is acknowledged.

### ❌ Critiques Claude Disagrees With

**4. Logit masking vs. autonomous tool creation — NOT a real contradiction.**
Reviewer claims: "If state machine restricts tool visibility, agents can't invent new tools."
- **Rebuttal:** Logit masking operates at *execution layer* (which tool to call mid-task). Tool *creation* happens at *improvement layer* (OPTIMIZER, between sessions). These don't conflict. Analogy: a surgeon restricted to sterile tools during surgery can still invent new instruments in the lab.

**5. Zettelkasten vs. structured memory tiers — design tradeoff, not a flaw.**
Reviewer claims forcing associative memory into rigid tiers "frequently causes retrieval failures."
- **Rebuttal:** Pure Zettelkasten with no structure is retrieval chaos at scale. The 4-layer memory system is a practical engineering constraint. The hybrid (associative linking within structured tiers) is intentional and defensible.

### 🔴 Real Risk the Peer Review MISSED

**Token cost is the actual operational risk — not the philosophical ones.**
HENRY's parallel sub-agent architecture + full memory reads at boot will burn tokens fast. Whitt already burned 7.5M tokens in 6 hours and $120 in one run.
- **Mitigation already in place:** Multi-model routing (Gemini Flash for heartbeats, DeepSeek for reasoning, Claude Sonnet for execution). This must be enforced at TIER level — not optional.

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
| Perplexity Computer launch | Feb 2026 | perplexity.ai/hub/blog |
| Perplexity Computer peer review | Mar 2026 | Gemini Pro 3.1 analysis |

---

*This document is the permanent research record. Append new findings below with date. Never overwrite.*
