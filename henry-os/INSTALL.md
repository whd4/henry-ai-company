# HENRY OS — Install Guide

## 1. Clone / pull latest
```powershell
cd C:\Users\whitt\Development
git clone https://github.com/whd4/henry-ai-company.git
# OR if already cloned:
cd henry-ai-company && git pull
```

## 2. Install henry-core
```powershell
cd henry-os\henry-core
npm install
```

## 3. Create .env
Create file `henry-os\henry-core\.env`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

## 4. henry-core is already wired in claude_desktop_config.json
Path: `C:\Users\whitt\Development\henry-ai-company\henry-os\henry-core\src\index.js`
Restart Claude Desktop after npm install.

## 5. Voice UI
Open `henry-os\voice\henry-voice.html` in Chrome.
Paste API key. Click mic. Talk.
