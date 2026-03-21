/**
 * HENRY OS — OpenClaw Agent Runtime
 * Autonomous agent platform with sub-agent spawning
 * WebSocket gateway on port 18789
 * Telegram command interface
 */

import Anthropic from '@anthropic-ai/sdk';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MEMORY_PATH = process.env.MEMORY_PATH || './data/memory';
const MAX_SUBAGENTS = parseInt(process.env.MAX_SUBAGENTS || '10');

if (!existsSync(MEMORY_PATH)) mkdirSync(MEMORY_PATH, { recursive: true });

// ============================================================
// AGENT DEFINITIONS
// ============================================================
const AGENT_ROSTER = {
  ORCHESTRATOR: { model: process.env.MODEL_ORCHESTRATOR, role: 'Routes all tasks to specialist agents. Maintains mission context.' },
  ATLAS:        { model: process.env.MODEL_ORCHESTRATOR, role: 'Business strategy, acquisitions, Dark Factory pipeline.' },
  LEDGER:       { model: process.env.MODEL_SUBAGENT,     role: 'Finance, valuations, SBA structure, deal modeling.' },
  FORGE:        { model: process.env.MODEL_SUBAGENT,     role: 'Engineering, MCP servers, Docker, architecture.' },
  SHIELD:       { model: process.env.MODEL_SUBAGENT,     role: 'Legal, LOIs, NDAs, contracts, Star Voss case.' },
  ORACLE:       { model: process.env.MODEL_SUBAGENT,     role: 'Research, due diligence, deal sourcing, intel.' },
  PULSE:        { model: process.env.MODEL_SUBAGENT,     role: 'Marketing, GTM, copy, SEO, content.' },
  CLOSER:       { model: process.env.MODEL_SUBAGENT,     role: 'Sales, proposals, outreach, closing.' },
  ENGINE:       { model: process.env.MODEL_SUBAGENT,     role: 'Operations, sprint management, execution tracking.' }
};

// ============================================================
// MEMORY SYSTEM
// ============================================================
function readMemory(agent) {
  const p = join(MEMORY_PATH, `${agent}.json`);
  if (!existsSync(p)) return { entries: [], lastUpdated: null };
  return JSON.parse(readFileSync(p, 'utf8'));
}

function writeMemory(agent, entry) {
  const p = join(MEMORY_PATH, `${agent}.json`);
  const mem = readMemory(agent);
  mem.entries.unshift({ ts: new Date().toISOString(), entry });
  if (mem.entries.length > 50) mem.entries = mem.entries.slice(0, 50);
  mem.lastUpdated = new Date().toISOString();
  writeFileSync(p, JSON.stringify(mem, null, 2));
}

function getMemoryContext(agent) {
  const mem = readMemory(agent);
  if (!mem.entries.length) return '';
  return '\n\nYour recent memory:\n' + mem.entries.slice(0, 10).map(e => `- [${e.ts.split('T')[0]}] ${e.entry}`).join('\n');
}

// ============================================================
// WHITT CONTEXT (loaded at runtime)
// ============================================================
const WHITT_CONTEXT = `You are part of HENRY OS — Whitt Dwyer's personal AI system.
Whitt: entrepreneur, Houston TX, severe ADD/ADHD, building HENRY AI Corporation.
Mission: $1B revenue via Dark Factory CPA acquisitions + HENRY AI agency.

Active priorities:
1. TXS5513 ($424K CPA, HNW) — call APS.net (877) 632-1040 for buyer package
2. TXS5345 — LOI drafted, ready to submit
3. Star Voss legal — F210 signed lease found, class action potential
4. RIA registration with Texas SSB — NOT FILED

FORMAT: Bottom line first. Numbered steps. No fluff. End with NEXT ACTION.`;

// ============================================================
// AGENT EXECUTOR
// ============================================================
async function runAgent(agentName, task, context = '') {
  const agent = AGENT_ROSTER[agentName];
  if (!agent) throw new Error(`Unknown agent: ${agentName}`);

  const memCtx = getMemoryContext(agentName);
  const system = `${WHITT_CONTEXT}\n\nYou are the ${agentName} agent.\nRole: ${agent.role}${memCtx}`;

  const response = await anthropic.messages.create({
    model: agent.model || 'claude-opus-4-6',
    max_tokens: 4096,
    system,
    messages: [{ role: 'user', content: context ? `Context: ${context}\n\nTask: ${task}` : task }]
  });

  const result = response.content[0].text;
  writeMemory(agentName, `Task: ${task.substring(0, 80)} | Result: ${result.substring(0, 120)}`);
  return result;
}

// ============================================================
// SUB-AGENT SPAWNER
// ============================================================
const activeSubAgents = new Map();

async function spawnSubAgent(parentAgent, subTask, subAgentId) {
  if (activeSubAgents.size >= MAX_SUBAGENTS) {
    throw new Error(`Max sub-agents (${MAX_SUBAGENTS}) reached`);
  }
  activeSubAgents.set(subAgentId, { parent: parentAgent, task: subTask, started: Date.now() });
  try {
    const result = await runAgent(parentAgent, subTask);
    activeSubAgents.delete(subAgentId);
    return result;
  } catch(e) {
    activeSubAgents.delete(subAgentId);
    throw e;
  }
}

// ============================================================
// PARALLEL DISPATCH
// ============================================================
async function dispatchParallel(tasks) {
  // tasks = [{ agent, task, context }]
  const results = await Promise.allSettled(
    tasks.map(t => runAgent(t.agent, t.task, t.context || ''))
  );
  return results.map((r, i) => ({
    agent: tasks[i].agent,
    status: r.status,
    result: r.status === 'fulfilled' ? r.value : r.reason?.message
  }));
}

// ============================================================
// WEBSOCKET SERVER (port 18789)
// ============================================================
const httpServer = createServer();
const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', (ws) => {
  console.log('[OpenClaw] Client connected');
  ws.send(JSON.stringify({ type: 'connected', message: 'HENRY OS OpenClaw online', agents: Object.keys(AGENT_ROSTER) }));

  ws.on('message', async (data) => {
    let msg;
    try { msg = JSON.parse(data.toString()); } catch { return; }

    try {
      if (msg.type === 'run') {
        const result = await runAgent(msg.agent || 'ORCHESTRATOR', msg.task, msg.context);
        ws.send(JSON.stringify({ type: 'result', agent: msg.agent, task: msg.task, result }));
      } else if (msg.type === 'parallel') {
        const results = await dispatchParallel(msg.tasks);
        ws.send(JSON.stringify({ type: 'parallel_results', results }));
      } else if (msg.type === 'status') {
        ws.send(JSON.stringify({
          type: 'status',
          agents: Object.keys(AGENT_ROSTER),
          activeSubAgents: activeSubAgents.size,
          maxSubAgents: MAX_SUBAGENTS
        }));
      } else if (msg.type === 'memory') {
        const mem = readMemory(msg.agent || 'ORCHESTRATOR');
        ws.send(JSON.stringify({ type: 'memory', agent: msg.agent, memory: mem }));
      }
    } catch(e) {
      ws.send(JSON.stringify({ type: 'error', message: e.message }));
    }
  });
});

httpServer.listen(18789, () => {
  console.log('[OpenClaw] WebSocket gateway running on port 18789');
  console.log('[OpenClaw] Agents:', Object.keys(AGENT_ROSTER).join(', '));
  console.log('[OpenClaw] Max sub-agents:', MAX_SUBAGENTS);
});
