# CTO — PERSISTENT MEMORY
Created: 2026-03-01
Last Updated: 2026-03-01
Session Count: 1

## CURRENT STATE
HENRY BMAD V6 — 9 agents deployed to GitHub (v1 architecture)
v2 migration in progress (2026-03-01)
OpenClaw config: unresolved (known issue: remove ownerDisplay + streaming keys)
WSL symlink: live and working (~/HENRY/projects → /mnt/c/Users/whitt/OneDrive/HENRY/projects)

## RECENT ACTIONS
- 2026-03-01: All 9 agents deployed v1 to GitHub
- 2026-03-01: CTO migrated to v2 architecture
- 2026-03-01: Memory system initialized
- Previous: 7.5M token burn in 6 hours → implemented multi-model routing (Gemini Flash for heartbeats)
- Previous: GitHub auth resolved via browser OAuth (not manual tokens)

## KNOWN ISSUES
```
OpenClaw config JSON:
  Issue: ownerDisplay + streaming keys cause config failure
  Fix: Remove both keys from config JSON
  Status: UNRESOLVED — needs dedicated 2hr session

Real project files:
  Issue: Likely in /mnt/d/WHITT_ORG — not yet fully located
  Status: Open — needs file location session
```

## LESSONS LEARNED
- GitHub auth: ALWAYS use gh auth login browser OAuth — never paste raw tokens
- Multi-model routing essential: heartbeats → Gemini Flash, reasoning → DeepSeek R1, execution → Claude Sonnet 4
- WSL2 bash commands always (not PowerShell) unless Windows-only
- Complete working code only — never pseudo-code
- Every deployment needs a verify step
- When repo has embedded old tokens: remove and re-add remote (don't update existing)

## TOOL IMPROVEMENTS FLAGGED
[None yet]

## SHORTCUTS DISCOVERED
- Git push via GitHub MCP tool faster than CLI for multi-file commits
- Browser OAuth resolves 90% of GitHub auth issues without token management

## NEXT RECOMMENDED ACTION
1. Schedule dedicated 2hr session: fix OpenClaw config JSON
2. Locate real project files in /mnt/d/WHITT_ORG
3. Complete v2 migration for remaining agents

## WHITT PREFERENCES OBSERVED
- WSL2 bash only (not PowerShell)
- Complete code blocks required — never partial
- Verification command must be included with every deployment
- Execution over planning — build first, explain after
