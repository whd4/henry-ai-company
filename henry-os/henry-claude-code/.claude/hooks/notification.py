#!/usr/bin/env python3
"""
HENRY NOTIFICATION HOOK — Speaks when agent needs Whitt's attention
"""
import json, sys, os, random, subprocess
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except: pass

def get_tts():
    d = Path(__file__).parent / 'utils' / 'tts'
    if os.getenv('ELEVENLABS_API_KEY') and (d/'elevenlabs_tts.py').exists():
        return str(d/'elevenlabs_tts.py')
    if os.getenv('OPENAI_API_KEY') and (d/'openai_tts.py').exists():
        return str(d/'openai_tts.py')
    if (d/'pyttsx3_tts.py').exists():
        return str(d/'pyttsx3_tts.py')
    return None

def notify():
    tts = get_tts()
    if not tts: return
    msgs = ["Whitt, your agent needs your input", "Agent waiting for you", "HENRY needs you"]
    try:
        subprocess.run(['python', tts, random.choice(msgs)], capture_output=True, timeout=10)
    except: pass

def main():
    try:
        data = json.loads(sys.stdin.read())
        log = Path.cwd()/'logs'/'notification.json'
        log.parent.mkdir(parents=True, exist_ok=True)
        existing = json.loads(log.read_text()) if log.exists() else []
        existing.append(data)
        log.write_text(json.dumps(existing, indent=2))
        if data.get('message','') != 'Claude is waiting for your input':
            notify()
        sys.exit(0)
    except: sys.exit(0)

if __name__ == '__main__': main()
