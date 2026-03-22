#!/usr/bin/env python3
"""
HENRY STOP HOOK — Fires when Claude Code finishes a task
- Announces completion via TTS
- Saves full chat transcript to logs/chat.json
"""
import json, sys, os, random, subprocess
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except: pass

MESSAGES = ["Task complete, Whitt!", "All done!", "HENRY finished!", "Ready for your next move!", "Done. What's next?"]

def get_tts():
    d = Path(__file__).parent / 'utils' / 'tts'
    if os.getenv('ELEVENLABS_API_KEY') and (d/'elevenlabs_tts.py').exists():
        return str(d/'elevenlabs_tts.py')
    if os.getenv('OPENAI_API_KEY') and (d/'openai_tts.py').exists():
        return str(d/'openai_tts.py')
    if (d/'pyttsx3_tts.py').exists():
        return str(d/'pyttsx3_tts.py')
    return None

def speak(msg):
    tts = get_tts()
    if not tts: return
    try:
        subprocess.run(['python', tts, msg], capture_output=True, timeout=10)
    except: pass

def main():
    try:
        data = json.load(sys.stdin)
        log = Path.cwd()/'logs'/'stop.json'
        log.parent.mkdir(parents=True, exist_ok=True)
        existing = json.loads(log.read_text()) if log.exists() else []
        existing.append(data)
        log.write_text(json.dumps(existing, indent=2))
        # Save transcript
        tp = data.get('transcript_path','')
        if tp and Path(tp).exists():
            lines = []
            for line in Path(tp).read_text().splitlines():
                line = line.strip()
                if line:
                    try: lines.append(json.loads(line))
                    except: pass
            (Path.cwd()/'logs'/'chat.json').write_text(json.dumps(lines, indent=2))
        speak(random.choice(MESSAGES))
        sys.exit(0)
    except: sys.exit(0)

if __name__ == '__main__': main()
