# HENRY Phone — Setup Guide
## Call or text HENRY from any phone

---

## What This Does
- You get a real phone number
- Call it → HENRY answers, listens, responds by voice
- Text it → HENRY responds by SMS
- Full conversation memory per phone number
- Powered by Claude Opus 4.6

---

## Step 1 — Get Twilio Account (5 min, FREE trial)

1. Go to https://www.twilio.com/try-twilio
2. Sign up (free, $15 credit included)
3. Verify your phone number
4. Go to Console → Get a phone number
   - Pick a Houston area code: 713, 281, 346, 832
   - Make sure it has Voice + SMS capabilities
5. Note your:
   - Account SID (starts with AC...)
   - Auth Token
   - Phone number (+1...)

---

## Step 2 — Install & Configure

```powershell
cd C:\Users\whitt\Development\henry-ai-company\henry-os\henry-phone
npm install
copy .env.example .env
notepad .env
```

Fill in your .env with Twilio credentials + Anthropic key.

---

## Step 3 — Expose to Internet (Cloudflare Tunnel — FREE)

```powershell
# Install cloudflared once:
winget install Cloudflare.cloudflared

# Run tunnel (gives you a public URL):
npx cloudflared tunnel --url http://localhost:3000
```

You'll see output like:
```
https://henry-abc123.trycloudflare.com
```

Copy that URL.

---

## Step 4 — Wire Twilio to Your Server

1. Go to https://console.twilio.com
2. Phone Numbers → Manage → Active Numbers → click your number
3. **Voice Configuration:**
   - "A call comes in" → Webhook
   - URL: `https://henry-abc123.trycloudflare.com/voice`
   - Method: HTTP POST
4. **Messaging Configuration:**
   - "A message comes in" → Webhook
   - URL: `https://henry-abc123.trycloudflare.com/sms`
   - Method: HTTP POST
5. Save

---

## Step 5 — Start HENRY Phone

```powershell
# Terminal 1 — start server
npm start

# Terminal 2 — start tunnel
npx cloudflared tunnel --url http://localhost:3000
```

---

## Step 6 — Test It

**Text test:**
Text your Twilio number: "What are my top priorities today?"
HENRY responds in seconds.

**Voice test:**
Call your Twilio number.
HENRY answers: "HENRY online. What do you need?"
Speak naturally.

---

## Permanent Setup (run on Windows startup)

Add to `start.ps1` in henry-os:
```powershell
# Start henry-phone server
Start-Process node -ArgumentList 'server.js' -WorkingDirectory $phoneDir -WindowStyle Hidden

# Start cloudflare tunnel
Start-Process cloudflared -ArgumentList 'tunnel --url http://localhost:3000' -WindowStyle Hidden
```

---

## Cost

| Item | Cost |
|------|------|
| Twilio trial | FREE ($15 credit) |
| Twilio number | ~$1.15/month after trial |
| Inbound SMS | $0.0079/message |
| Inbound voice | $0.0085/min |
| Claude Opus 4.6 | ~$0.01-0.03/conversation |
| Cloudflare tunnel | FREE |

**Total: ~$1-2/month + API usage**

---

## Upgrade: Permanent URL (no tunnel needed)

Deploy to Railway.app (free tier):
1. https://railway.app → New Project → Deploy from GitHub
2. Select whd4/henry-ai-company → henry-os/henry-phone
3. Add env vars
4. Get permanent URL like `https://henry-phone.railway.app`
5. Use that in Twilio instead of cloudflare URL

---

## Security (optional)

Add to server.js to restrict to your number only:
```js
if (req.body.From !== process.env.WHITT_PHONE) {
  return res.status(403).send('Unauthorized');
}
```
