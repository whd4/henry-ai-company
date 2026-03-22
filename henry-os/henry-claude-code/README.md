# HENRY Claude Code Setup

Claude Code CLI configuration for HENRY OS — adapted from [Claude-Code-Everything-You-Need-to-Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know).

## What's Here

```
henny-os/henry-claude-code/
├── .claude/
│   ├── CLAUDE.md          ← Auto-loaded context for every Claude Code session
│   ├── settings.json      ← Permissions + hook wiring
│   ├── agents/            ← Specialized agents (invoke with /agents name)
│   │   ├── tech-lead-architect.md
│   │   ├── frontend-engineer.md
│   │   ├── code-reviewer.md
│   │   ├── project-manager.md
│   │   └── ux-designer.md
│   ├── commands/          ← Custom slash commands
│   │   ├── todo.md        ← Sprint task manager
│   │   ├── review.md      ← Code review
│   │   ├── pr.md          ← Pull request creator
│   │   ├── tdd.md         ← Test-driven workflow
│   │   └── deploy.md      ← Deploy HENRY components
│   └── hooks/             ← Auto-run Python scripts
│       ├── pre_tool_use.py    ← Blocks rm -rf + .env access
│       ├── post_tool_use.py   ← Logs all results
│       ├── stop.py            ← TTS completion + chat transcript
│       ├── notification.py    ← TTS alert when waiting
│       └── utils/tts/
│           └── pyttsx3_tts.py ← Free TTS, no API key needed
└── CLAUDE.md
```

## Install

### 1. Install Claude Code CLI
```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Copy .claude folder to your project root
```bash
cp -r henry-os/henry-claude-code/.claude /path/to/your/project/
```

### 3. Install TTS (free, no API key)
```bash
pip install pyttsx3
```

### 4. Install uv (Python package runner) — optional, for advanced hooks
```bash
pip install uv
```

### 5. Launch Claude Code in your project
```bash
cd /path/to/your/project
claude
```

## Usage

### Agents
```
/agents tech-lead-architect
Design the architecture for the henry-phone Twilio integration
```

```
/agents frontend-engineer  
Build a new gauge component for the Mission Control dashboard
```

### Commands
```
/todo add "Call APS.net for TXS5513 buyer package" today
/todo list
/todo complete 1

/review
/pr
/tdd
/deploy henry-core
```

### Trigger RALPH Mode
```
RALPH: Research TXS5513 and build a complete acquisition strategy
```

### Thinking Modes (Claude Code specific)
```
think          → standard reasoning
think hard     → deeper reasoning  
think harder   → maximum depth
ultrathink     → extended thinking mode (most tokens)
```

## Hooks Explained

| Hook | When It Fires | What It Does |
|------|---------------|--------------|
| pre_tool_use | Before every tool call | Blocks rm -rf, blocks .env access, logs call |
| post_tool_use | After every tool call | Logs result for audit trail |
| stop | When Claude finishes | Speaks "Task complete!" via TTS, saves transcript |
| notification | When Claude needs input | Speaks "Whitt, your agent needs your input" |

## Key Difference: Claude Code vs Claude Desktop

| Feature | Claude Desktop | Claude Code CLI |
|---------|---------------|------------------|
| Interface | GUI chat | Terminal |
| File access | Via MCP filesystem | Direct file system |
| Hooks | Not supported | Full hook system |
| /commands | Not supported | Custom slash commands |
| Worktrees | Not applicable | Full git worktree support |
| Token mode | Conversation | Session-based |
| henry-core | Via MCP server | Via MCP or direct |

**Use Claude Desktop** for strategy, architecture, complex reasoning, mission control
**Use Claude Code CLI** for actual coding, file manipulation, git operations, TDD
