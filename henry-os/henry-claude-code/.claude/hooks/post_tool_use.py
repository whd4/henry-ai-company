#!/usr/bin/env python3
"""
HENRY POST-TOOL HOOK — Logs all tool results for audit trail
"""
import json, sys
from pathlib import Path

def main():
    try:
        data = json.load(sys.stdin)
        log = Path.cwd()/'logs'/'post_tool_use.json'
        log.parent.mkdir(parents=True, exist_ok=True)
        existing = json.loads(log.read_text()) if log.exists() else []
        existing.append(data)
        log.write_text(json.dumps(existing, indent=2))
        sys.exit(0)
    except: sys.exit(0)

if __name__ == '__main__': main()
