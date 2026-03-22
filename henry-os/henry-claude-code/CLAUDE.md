# HENRY OS — Claude Code Configuration

## Project
HENRY AI Corporation — Dark Factory CPA acquisition + AI agent platform
Owner: Whitt Dwyer, Houston TX | GitHub: whd4 | ADD/ADHD — bottom line first always

## Stack
- Runtime: Node.js 20+ (ESM), Python 3.11+
- Platform: Windows 11 Pro + WSL2 Ubuntu + Docker
- AI: Claude Opus 4.6 via Anthropic API + OpenRouter
- Repos: henry-ai-company, henry-launcher, henry-core, dark-factory (all under whd4 org)

## Active Engines (all running)
- **RALPH Loop**: Persistent orchestrator, Monte Carlo path validation, prune threshold 8/20, solve threshold 16/20
- **PRISM-MC**: Triple-lens (Optimizer/Validator/Contrarian), DeepConf gate 14/20
- **henry-core**: 20 MCP specialist tools, handler.js routes to RALPH or PRISM based on task

## Response Format (non-negotiable)
1. Bottom line first — answer in 1-2 sentences before anything else
2. Numbered steps only — never prose for instructions
3. Micro-steps — smallest possible units
4. End every response with: NEXT ACTION → [exact thing to do]
5. Confidence score when relevant: RECOMMENDATION (X/20)

## File Locations
- Main repo: `C:\Users\whitt\Development\henry-ai-company`
- henry-core: `henry-os/henry-core/src/` (handler.js, prism.js, ralph.js, tools.js)
- Dark Factory: `henry-os/henry-claude-code/` + dark-factory repo
- Living context: `C:\Users\whitt\HENRY_CONTEXT.md`
- Config: `C:\Users\whitt\AppData\Roaming\Claude\claude_desktop_config.json`

## Dark Factory Pipeline
| Deal | Revenue | Buy At | Exit 7x | Action |
|------|---------|--------|---------|--------|
| TXS5513 | $424K | $170K | $2.1M | CALL NOW — 877-632-1040 |
| TXS5345 | $142K | $57K | $784K | LOI ready to send |
| TXS5491 | $910K | $364K | $4.5M | SBA eligible |
| TXS5450 | $472K | $189K | $2.3M | Pipeline |

## Agents Available
- `/agents tech-lead-architect` — system design and architecture
- `/agents frontend-engineer` — UI, dashboards, HENRY aesthetic
- `/agents code-reviewer` — security, performance, quality
- `/agents project-manager` — sprint planning, priorities
- `/agents ux-designer` — ADD/ADHD-optimized UX flows

## Custom Commands
- `/todo` — manage sprint tasks in todos.md
- `/review` — full code review checklist
- `/pr` — create pull request with logical commit splitting
- `/tdd` — test-driven development workflow
- `/deploy` — deploy henry-core, openclaw, or dark-factory

## Hooks (active on all tool calls)
- `pre_tool_use.py` — blocks rm -rf, blocks .env access, logs all calls
- `post_tool_use.py` — logs all results
- `stop.py` — TTS completion announcement + saves chat transcript
- `notification.py` — TTS alert when agent needs input

## Security Rules
- Never commit API keys — use .env files only
- Never rm -rf (hook will block it)
- Never expose .env contents
- Always use .env.sample as template
