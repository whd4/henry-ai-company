#!/usr/bin/env python3
"""
HENRY PRE-TOOL HOOK — Runs BEFORE every Claude Code tool call
- Blocks dangerous rm -rf commands
- Blocks .env file access
- Logs all tool calls to logs/pre_tool_use.json
"""
import json, sys, re
from pathlib import Path

def is_dangerous_rm(command):
    n = ' '.join(command.lower().split())
    patterns = [
        r'\brm\s+.*-[a-z]*r[a-z]*f', r'\brm\s+.*-[a-z]*f[a-z]*r',
        r'\brm\s+--recursive\s+--force', r'\brm\s+--force\s+--recursive',
    ]
    for p in patterns:
        if re.search(p, n): return True
    if re.search(r'\brm\s+.*-[a-z]*r', n):
        for dp in [r'/', r'~', r'\$HOME', r'\.\.',  r'\*', r'\.\s*$']:
            if re.search(dp, n): return True
    return False

def is_env_access(tool_name, tool_input):
    if tool_name in ['Read','Edit','MultiEdit','Write']:
        fp = tool_input.get('file_path','')
        if '.env' in fp and not fp.endswith('.env.sample'): return True
    if tool_name == 'Bash':
        cmd = tool_input.get('command','')
        for p in [r'\b\.env\b(?!\.sample)', r'cat\s+.*\.env\b(?!\.sample)']:
            if re.search(p, cmd): return True
    return False

def main():
    try:
        data = json.load(sys.stdin)
        tool = data.get('tool_name','')
        inp  = data.get('tool_input',{})
        if is_env_access(tool, inp):
            print('HENRY BLOCKED: .env access prohibited. Use .env.sample.', file=sys.stderr)
            sys.exit(2)
        if tool == 'Bash' and is_dangerous_rm(inp.get('command','')):
            print('HENRY BLOCKED: Dangerous rm -rf command prevented.', file=sys.stderr)
            sys.exit(2)
        log = Path.cwd()/'logs'/'pre_tool_use.json'
        log.parent.mkdir(parents=True, exist_ok=True)
        existing = json.loads(log.read_text()) if log.exists() else []
        existing.append(data)
        log.write_text(json.dumps(existing, indent=2))
        sys.exit(0)
    except: sys.exit(0)

if __name__ == '__main__': main()
