# OpenClaw — Docker Agent Runtime Setup
## Autonomous agents with sub-agent spawning

---

## What This Is

- WebSocket server on port 18789
- Runs all 9 HENRY agents as callable services
- Spawns up to 10 sub-agents in parallel
- Persistent memory per agent (JSON files)
- Model routing: Opus 4.6 for orchestration, DeepSeek R1 for sub-agents, Gemini Flash for heartbeats

---

## Install Docker Desktop (if not installed)

1. https://www.docker.com/products/docker-desktop
2. Install for Windows
3. Launch Docker Desktop
4. Verify: open PowerShell, run `docker --version`

---

## Start Everything

```powershell
cd C:\Users\whitt\Development\henry-ai-company\henry-os\openclaw

# Copy env file and fill in keys
copy .env.example .env
notepad .env

# Start all containers
docker-compose up -d

# Check logs
docker-compose logs -f
```

---

## Test It

```javascript
// Test from browser console or Node.js
const ws = new WebSocket('ws://localhost:18789');
ws.onmessage = e => console.log(JSON.parse(e.data));

// Run an agent
ws.send(JSON.stringify({
  type: 'run',
  agent: 'ORACLE',
  task: 'Research TXS5513 CPA acquisition — what should I know?'
}));

// Run multiple agents in parallel
ws.send(JSON.stringify({
  type: 'parallel',
  tasks: [
    { agent: 'ORACLE', task: 'Research TXS5513' },
    { agent: 'LEDGER', task: 'Valuation model for $424K CPA' }
  ]
}));
```

---

## Agent Routing

| Agent | Model | Why |
|-------|-------|-----|
| ORCHESTRATOR | claude-opus-4-6 | Brain — best model for routing |
| ATLAS | claude-opus-4-6 | Strategy needs top model |
| LEDGER | deepseek-r1 | Math/finance — R1 excels |
| FORGE | deepseek-r1 | Code — R1 excels |
| SHIELD | claude-opus-4-6 | Legal — needs nuance |
| ORACLE | claude-opus-4-6 | Research — needs depth |
| PULSE | gemini-flash | Marketing copy — fast |
| CLOSER | gemini-flash | Sales scripts — fast |
| ENGINE | gemini-flash | Ops tracking — fast |

---

## Memory System

Each agent has persistent memory at `./openclaw-data/memory/{AGENT}.json`.
Stores last 50 task summaries per agent.
Loaded at start of each agent invocation.

---

## Stop Everything

```powershell
docker-compose down
```
