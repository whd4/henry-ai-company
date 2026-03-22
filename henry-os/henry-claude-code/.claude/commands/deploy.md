---
name: deploy
description: Deploy HENRY components. Handles henry-core MCP restart, OpenClaw Docker, and GitHub pushes.
---

# HENRY Deploy Command

Deploy the specified HENRY component.

## Components

### henry-core (MCP server)
1. `cd C:\Users\whitt\Development\henry-ai-company`
2. `git pull`
3. Restart Claude Desktop (quit + relaunch)
4. Verify: type a message using henry_agent_architect tool

### openclaw (Docker)
1. `cd C:\Users\whitt\Development\henry-ai-company\henry-os\openclaw`
2. `docker-compose down`
3. `docker-compose up -d`
4. Verify: check Telegram bot responds

### dark-factory (GitHub push)
1. `cd C:\Users\whitt\Development\henry-ai-company`
2. `git add -A`
3. `git commit -m "dark-factory: [description]"`
4. `git push origin main`

NEXT ACTION → [exact command for the component specified]
