# HENRY AI — Skills Registry
Updated: 2026-03-22
Format: Anthropic Agent Skills (March 2026)

## HENRY Agents (9)
| # | Skill | Agent | Role | Path |
|---|-------|-------|------|------|
| 1 | nexus | NEXUS | Orchestrator | skills/nexus/SKILL.md |
| 2 | atlas | ATLAS | Strategy | skills/atlas/SKILL.md |
| 3 | ledger | LEDGER | Finance | skills/ledger/SKILL.md |
| 4 | forge | FORGE | Engineering | skills/forge/SKILL.md |
| 5 | shield | SHIELD | Legal | skills/shield/SKILL.md |
| 6 | oracle | ORACLE | Research | skills/oracle/SKILL.md |
| 7 | pulse | PULSE | Marketing | skills/pulse/SKILL.md |
| 8 | closer | CLOSER | Sales | skills/closer/SKILL.md |
| 9 | engine | ENGINE | Operations | skills/engine/SKILL.md |

## BMAD Agents (5)
| # | Skill | Agent | Role | Path |
|---|-------|-------|------|------|
| 10 | bmad-architect | Architect | System Design | skills/architect/SKILL.md |
| 11 | bmad-developer | Developer | Implementation | skills/developer/SKILL.md |
| 12 | bmad-analyst | Analyst | Data & Metrics | skills/analyst/SKILL.md |
| 13 | bmad-pm | PM | Project Mgmt | skills/pm/SKILL.md |
| 14 | bmad-qa | QA | Quality | skills/qa/SKILL.md |

## Special Skills (2)
| # | Skill | Purpose | Path |
|---|-------|---------|------|
| 15 | deep-confidence | Decision reasoning engine | skills/deep-confidence/SKILL.md |
| 16 | autoresearch | Karpathy autonomous experiments | skills/autoresearch/SKILL.md |

## Slash Commands (4)
| Command | Purpose |
|---------|--------|
| /status | Full project state summary |
| /handoff | Context handoff doc generation |
| /review | Multi-agent 6-perspective code review |
| /build | Execute immediately, no questions |

## Hooks (3)
| Hook | Event | Action |
|------|-------|--------|
| session_start.py | SessionStart | Auto-load HENRY_CONTEXT.md |
| session_end.py | SessionEnd | Auto-save session log |
| stop.py | Stop | Handoff reminder at 50% context |