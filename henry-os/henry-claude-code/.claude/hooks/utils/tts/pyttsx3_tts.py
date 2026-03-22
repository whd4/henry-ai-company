#!/usr/bin/env python3
"""
FREE TTS — pyttsx3, no API key needed
Install: pip install pyttsx3
Usage:   python pyttsx3_tts.py "Your message"
"""
import sys

def speak(text):
    try:
        import pyttsx3
        engine = pyttsx3.init()
        engine.setProperty('rate', 175)
        engine.setProperty('volume', 0.9)
        voices = engine.getProperty('voices')
        for v in voices:
            if 'english' in v.name.lower() or 'david' in v.name.lower():
                engine.setProperty('voice', v.id)
                break
        engine.say(text)
        engine.runAndWait()
    except ImportError:
        print(f'[TTS] pyttsx3 not installed. pip install pyttsx3')
        print(f'[TTS] Message was: {text}')
    except Exception as e:
        print(f'[TTS Error] {e}')

if __name__ == '__main__':
    msg = ' '.join(sys.argv[1:]) if len(sys.argv) > 1 else 'HENRY complete'
    speak(msg)
