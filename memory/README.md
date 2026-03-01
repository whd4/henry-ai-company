# HENRY AI — Memory System

This directory contains persistent memory files for each HENRY agent.

## Structure

```
memory/
  README.md                   ← This file
  ORCHESTRATOR_MEMORY.md      ← ORCHESTRATOR persistent memory
  CEO_MEMORY.md               ← CEO persistent memory
  CFO_MEMORY.md               ← CFO persistent memory
  CTO_MEMORY.md               ← CTO persistent memory
  LEGAL_MEMORY.md             ← LEGAL persistent memory
  RESEARCH_MEMORY.md          ← RESEARCH persistent memory
  MARKETING_MEMORY.md         ← MARKETING persistent memory
  SALES_MEMORY.md             ← SALES persistent memory
  OPERATIONS_MEMORY.md        ← OPERATIONS persistent memory
  OPTIMIZER_MEMORY.md         ← OPTIMIZER persistent memory
```

## Protocol

Every agent reads its memory file at session start.
Every agent writes to its memory file at session end.
No exceptions.

## Memory File Format

```markdown
# [AGENT NAME] — PERSISTENT MEMORY
Created: [date]
Last Updated: [date]
Session Count: [N]

## CURRENT STATE
## RECENT ACTIONS
## LESSONS LEARNED
## TOOL IMPROVEMENTS FLAGGED
## SHORTCUTS DISCOVERED
## NEXT RECOMMENDED ACTION
## WHITT PREFERENCES OBSERVED
```

## Research Basis

- A-MEM: Agentic Memory for LLM Agents (Feb 2025)
- Hindsight is 20/20: Building Agent Memory that Retains, Recalls, and Reflects (Dec 2025)
- MemoryArena: Benchmarking Agent Memory in Multi-Session Agentic Tasks (Feb 2026)
- Anthropic Research System: agents write plan to memory before executing (Jun 2025)
- Manus Context Engineering: filesystem as external memory (2025)
