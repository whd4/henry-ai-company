#!/bin/bash
# HENRY BMAD V6 — Deploy Script
# Usage: ./deploy.sh all

set -e

BMAD_DIR="$HOME/.bmad"
AGENTS_DIR="$BMAD_DIR/agents"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "================================"
echo " HENRY BMAD V6 — Deploy"
echo "================================"

mkdir -p "$AGENTS_DIR"

cat > "$BMAD_DIR/module.yaml" << 'EOF'
name: henry-ai-corp
version: 6.0.0
description: HENRY AI Corporation — 9-agent team for Dark Factory
author: Whitt Dwyer
agents:
  - nexus
  - atlas
  - ledger
  - forge
  - shield
  - oracle
  - pulse
  - closer
  - engine
EOF

echo "Deploying agents..."
for agent_file in "$SCRIPT_DIR/agents"/*.agent.md; do
  agent_name=$(basename "$agent_file" .agent.md)
  cp "$agent_file" "$AGENTS_DIR/${agent_name}.agent.md"
  echo "  ✓ $agent_name deployed"
done

echo ""
echo "✅ HENRY BMAD V6 deployed to $BMAD_DIR"
echo "   Agents: $(ls $AGENTS_DIR | wc -l) files"
echo ""
echo "Next: Restart Claude Desktop to activate agents"
