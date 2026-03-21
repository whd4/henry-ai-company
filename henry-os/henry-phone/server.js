import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import twilio from 'twilio';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const VoiceResponse = twilio.twiml.VoiceResponse;
const MessagingResponse = twilio.twiml.MessagingResponse;

// ============================================================
// HENRY SYSTEM PROMPT
// ============================================================
const HENRY_CONTEXT = `You are HENRY — Whitt Dwyer's personal AI OS.
Whitt: entrepreneur, Houston TX, severe ADD/ADHD, building HENRY AI Corporation.

You are being contacted via PHONE (voice or SMS).
IMPORTANT: Keep responses SHORT and CLEAR for voice/SMS:
- Voice: Max 3-4 sentences. Speak naturally, no bullet points.
- SMS: Max 160 chars per response when possible. Use numbered lists.
- ALWAYS end with the single most important next action.

You handle EVERYTHING:
- Dark Factory CPA acquisitions (TXS5513 PRIORITY — call APS.net 877-632-1040)
- HENRY AI agency (Houston B2B, $5K-$25K/project)
- Star Voss legal case (F210 F212 F310 — class action, DTPA 3x damages)
- Personal life, scheduling, decisions
- Business strategy, niche finding, world domination

Active priorities:
1. Scan F210 signed lease + email to yourself
2. Call APS.net (877) 632-1040 — TXS5513 buyer package
3. Call HAA (713) 595-0300 — Star Voss complaint
4. npm install henry-core + restart Claude Desktop`;

// ============================================================
// CONVERSATION MEMORY (per phone number)
// ============================================================
const MEMORY_FILE = './conversations.json';

function loadMemory() {
  if (!existsSync(MEMORY_FILE)) return {};
  try { return JSON.parse(readFileSync(MEMORY_FILE, 'utf8')); }
  catch { return {}; }
}

function saveMemory(data) {
  writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
}

function getHistory(phone) {
  const mem = loadMemory();
  return mem[phone] || [];
}

function addToHistory(phone, role, content) {
  const mem = loadMemory();
  if (!mem[phone]) mem[phone] = [];
  mem[phone].push({ role, content, ts: new Date().toISOString() });
  // Keep last 20 messages per number
  if (mem[phone].length > 20) mem[phone] = mem[phone].slice(-20);
  saveMemory(mem);
}

// ============================================================
// ASK HENRY
// ============================================================
async function askHenry(phone, userMessage, mode = 'sms') {
  const history = getHistory(phone);
  const messages = [
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: userMessage }
  ];

  const systemPrompt = HENRY_CONTEXT + (mode === 'voice'
    ? '\n\nMODE: VOICE CALL. Respond in 2-3 natural spoken sentences only. No lists, no bullets, no markdown.'
    : '\n\nMODE: SMS. Respond in under 300 characters if possible. Be direct and actionable.');

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: mode === 'voice' ? 300 : 500,
    system: systemPrompt,
    messages
  });

  const reply = response.content[0].text;
  addToHistory(phone, 'user', userMessage);
  addToHistory(phone, 'assistant', reply);
  return reply;
}

// ============================================================
// SMS WEBHOOK
// ============================================================
app.post('/sms', async (req, res) => {
  const { Body, From } = req.body;
  console.log(`SMS from ${From}: ${Body}`);

  const twiml = new MessagingResponse();

  try {
    const reply = await askHenry(From, Body, 'sms');
    // Split long replies into multiple SMS
    const chunks = reply.match(/.{1,1600}/gs) || [reply];
    chunks.forEach(chunk => twiml.message(chunk));
  } catch (err) {
    console.error('SMS error:', err);
    twiml.message('HENRY error: ' + err.message);
  }

  res.type('text/xml').send(twiml.toString());
});

// ============================================================
// VOICE WEBHOOK — Incoming call
// ============================================================
app.post('/voice', async (req, res) => {
  const { From, CallSid } = req.body;
  console.log(`Call from ${From} (${CallSid})`);

  const twiml = new VoiceResponse();
  const gather = twiml.gather({
    input: 'speech',
    action: '/voice/respond',
    speechTimeout: 'auto',
    language: 'en-US',
    hints: 'HENRY, acquisition, Star Voss, Houston, legal, business'
  });

  gather.say({ voice: 'Polly.Matthew', language: 'en-US' },
    'HENRY online. What do you need?');

  res.type('text/xml').send(twiml.toString());
});

// ============================================================
// VOICE WEBHOOK — Process speech input
// ============================================================
app.post('/voice/respond', async (req, res) => {
  const { SpeechResult, From, Confidence } = req.body;
  console.log(`Voice [${From}] (${Confidence}): ${SpeechResult}`);

  const twiml = new VoiceResponse();

  try {
    const reply = await askHenry(From, SpeechResult, 'voice');
    twiml.say({ voice: 'Polly.Matthew', language: 'en-US' }, reply);
  } catch (err) {
    twiml.say({ voice: 'Polly.Matthew' }, 'Error reaching HENRY. Try again.');
  }

  // Continue listening
  const gather = twiml.gather({
    input: 'speech',
    action: '/voice/respond',
    speechTimeout: 'auto',
    language: 'en-US'
  });
  gather.say({ voice: 'Polly.Matthew' }, 'Anything else?');

  res.type('text/xml').send(twiml.toString());
});

// ============================================================
// STATUS
// ============================================================
app.get('/', (req, res) => {
  res.json({
    status: 'HENRY Phone Online',
    model: 'claude-opus-4-6',
    endpoints: {
      sms: 'POST /sms',
      voice: 'POST /voice'
    },
    uptime: process.uptime()
  });
});

// ============================================================
// START
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HENRY Phone server running on port ${PORT}`);
  console.log(`SMS endpoint:   POST http://localhost:${PORT}/sms`);
  console.log(`Voice endpoint: POST http://localhost:${PORT}/voice`);
});
