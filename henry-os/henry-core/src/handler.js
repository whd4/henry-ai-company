/**
 * HENRY-CORE HANDLER v3
 * 
 * Three execution modes:
 * 
 * 1. RALPH LOOP (persistent + pruning)
 *    Triggered by: ralph=true flag OR task starts with RALPH:
 *    - Ralph orchestrates sub-agents in loops
 *    - Monte Carlo validates every sub-agent path
 *    - Prunes bad paths, redirects agents
 *    - All sub-agents share a live status board
 *    - Keeps going until solved (16/20) or max iterations (8)
 * 
 * 2. PRISM-MC (triple-lens + confidence gate)
 *    Triggered by: strategic tools OR task contains strategy keywords
 *    - 3 parallel lenses: Optimizer / Validator / Contrarian
 *    - DeepConf gate at 14/20
 *    - Loops up to 3x if below threshold
 * 
 * 3. FAST PATH (single call)
 *    Triggered by: simple/lookup tasks
 *    - Single Opus call
 *    - Still includes confidence score
 */

import { tools } from './tools.js';
import { runPRISM } from './prism.js';
import { runRalph, StatusBoard } from './ralph.js';
import { randomUUID } from 'crypto';

const ROLES = {
  henry_agent_architect:    'Elite AI agent systems architect. Multi-agent topologies, orchestration, ReAct loops.',
  henry_ai_product_design:  'Senior AI product designer. AI UX, model selection, confidence UI, roadmapping.',
  henry_api_patterns:       'Senior API architect. REST/GraphQL, auth, versioning, OpenAPI.',
  henry_autonomous_loop:    'Agent loop specialist. ReAct, Plan-Execute, goal decomposition, failure recovery.',
  henry_copywriting:        'Elite direct-response copywriter. Landing pages, VSLs, cold outreach, B2B copy.',
  henry_launch_strategy:    'GTM strategist. Product launches, beta rollouts, waitlist, day-1 revenue.',
  henry_loki_mode:          'Autonomous full-stack engineer. PRD to deployed product, zero human intervention.',
  henry_mcp_builder:        'MCP server specialist. Tool schema design, stdio/SSE, Claude Desktop integration.',
  henry_memory_architect:   'Agent memory expert. Episodic/semantic/procedural memory, vector stores.',
  henry_parallel_agents:    'Parallel orchestration expert. Fan-out, aggregation, conflict resolution.',
  henry_pricing_strategy:   'SaaS pricing strategist. Tier design, usage-based, freemium, enterprise.',
  henry_prompt_engineer:    'Production prompt engineer. System prompts, few-shot, chain-of-thought.',
  henry_rag_engineer:       'RAG pipeline engineer. Chunking, embeddings, vector DBs, hybrid search.',
  henry_saas_launcher:      'Micro-SaaS specialist. Niche validation, MVP scoping, path to $1K MRR.',
  henry_seo_growth:         'SEO growth expert. Keyword research, content architecture, organic revenue.',
  henry_senior_fullstack:   'Senior fullstack engineer. Next.js, React, TypeScript, Node.js, PostgreSQL.',
  henry_software_architect: 'Principal architect. System design, DB schema, scalability, ADRs.',
  henry_stripe_fintech:     'Fintech specialist. Stripe subscriptions, webhooks, Plaid, KYC.',
  henry_systematic_debug:   'Debug specialist. Error analysis, reproduction, hypothesis testing.',
  henry_workflow_automation:'Automation engineer. n8n, Make, Zapier, webhooks, Windows automation.'
};

// ============================================================
// MAIN HANDLER
// ============================================================
export async function handleTool(name, args) {
  if (!tools.find(t => t.name === name))
    return { content: [{ type:'text', text:`Error: '${name}' not found` }], isError: true };

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return { content: [{ type:'text', text:'Error: set ANTHROPIC_API_KEY in henry-core/.env' }], isError: true };

  const role = ROLES[name] || 'HENRY specialist';
  const task = args.task;
  const context = args.context || '';

  try {
    // ROUTE 1: RALPH LOOP
    if (shouldUseRalph(name, task, args)) {
      const taskId = `ralph_${Date.now()}_${randomUUID().split('-')[0]}`;
      const result = await runRalph(task, context, taskId, key);
      return { content: [{ type:'text', text: result.text }] };
    }

    // ROUTE 2: PRISM-MC
    if (shouldUsePRISM(name, task)) {
      const result = await runPRISM(task, context, role, key);
      return { content: [{ type:'text', text: result.text }] };
    }

    // ROUTE 3: FAST PATH
    return await fastPath(name, task, context, role, key);

  } catch(e) {
    return { content: [{ type:'text', text:`Engine error: ${e.message}` }], isError: true };
  }
}

// ============================================================
// STATUS CHECK — read a Ralph task's live status board
// ============================================================
export async function getTaskStatus(taskId) {
  try {
    const board = new StatusBoard(taskId);
    return board.read();
  } catch(e) {
    return { error: e.message };
  }
}

// ============================================================
// ROUTING LOGIC
// ============================================================
function shouldUseRalph(toolName, task, args) {
  // Explicit ralph flag
  if (args.ralph === true) return true;
  // Task starts with RALPH:
  if (task.toUpperCase().startsWith('RALPH:')) return true;
  // Always ralph for complex multi-step tools
  const alwaysRalph = ['henry_loki_mode', 'henry_autonomous_loop'];
  if (alwaysRalph.includes(toolName)) return true;
  // Ralph if task is long and complex
  if (task.length > 200) return true;
  return false;
}

function shouldUsePRISM(toolName, task) {
  const alwaysPRISM = [
    'henry_agent_architect', 'henry_software_architect',
    'henry_ai_product_design', 'henry_launch_strategy',
    'henry_pricing_strategy', 'henry_saas_launcher'
  ];
  if (alwaysPRISM.includes(toolName)) return true;
  const keywords = ['strategy','decide','should i','best way','how to','design','build','plan','acquire','invest'];
  return keywords.some(kw => task.toLowerCase().includes(kw));
}

// ============================================================
// FAST PATH
// ============================================================
async function fastPath(name, task, context, role, key) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: `You are a HENRY specialist. Owner: Whitt Dwyer, Houston TX, severe ADD/ADHD.\nFORMAT: Bottom line first. Numbered steps. Micro-steps. CONFIDENCE: X/20 on first line. End: NEXT ACTION → [step]. No fluff.\nRole: ${role}`,
      messages: [{ role: 'user', content: `Task: ${task}${context ? `\nContext: ${context}` : ''}` }]
    })
  });
  if (!res.ok) return { content: [{ type:'text', text:`API error ${res.status}` }], isError: true };
  const d = await res.json();
  return { content: [{ type:'text', text: d.content?.[0]?.text || 'No response' }] };
}
