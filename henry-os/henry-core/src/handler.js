/**
 * HENRY-CORE HANDLER
 * Now powered by PRISM-MC: Triple-Lens + Monte Carlo + DeepConf
 * 
 * Every tool call runs through:
 * 1. Triple-Lens (3 parallel perspectives: Optimizer / Validator / Contrarian)
 * 2. Monte Carlo scoring (each lens scored 0-20 on 4 dimensions)
 * 3. DeepConf gate (threshold 14/20 — loops up to 3x if below)
 * 4. Winner delivered with full confidence trace
 */

import { tools } from './tools.js';
import { runPRISM } from './prism.js';

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

export async function handleTool(name, args) {
  if (!tools.find(t => t.name === name))
    return { content: [{ type:'text', text:`Error: '${name}' not found` }], isError: true };
  
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return { content: [{ type:'text', text:'Error: set ANTHROPIC_API_KEY in henry-core/.env' }], isError: true };
  
  // Decide whether to use PRISM-MC or fast path
  // Fast path: simple lookups, short tasks (saves tokens)
  // PRISM-MC: anything strategic, creative, or high-stakes
  const usePRISM = shouldUsePRISM(name, args.task);
  
  try {
    if (usePRISM) {
      const result = await runPRISM(
        args.task,
        args.context || '',
        ROLES[name] || 'HENRY specialist',
        key
      );
      return { content: [{ type:'text', text: result.text }] };
    } else {
      // Fast path — single call, still gets confidence score
      return await fastPath(name, args, key);
    }
  } catch(e) {
    return { content: [{ type:'text', text:`PRISM error: ${e.message}` }], isError: true };
  }
}

// ============================================================
// PRISM-MC ROUTING DECISION
// ============================================================
function shouldUsePRISM(toolName, task) {
  // Always use PRISM for high-stakes tools
  const alwaysPRISM = [
    'henry_agent_architect',
    'henry_software_architect', 
    'henry_ai_product_design',
    'henry_launch_strategy',
    'henry_pricing_strategy',
    'henry_saas_launcher',
    'henry_loki_mode'
  ];
  if (alwaysPRISM.includes(toolName)) return true;
  
  // Use PRISM if task contains strategic keywords
  const strategicKeywords = ['strategy', 'decide', 'should i', 'best way', 'how to', 'design', 'build', 'plan', 'acquire', 'invest'];
  const taskLower = task.toLowerCase();
  return strategicKeywords.some(kw => taskLower.includes(kw));
}

// ============================================================
// FAST PATH — single call with confidence score
// ============================================================
async function fastPath(name, args, key) {
  const FMT = `You are a HENRY specialist. Owner: Whitt Dwyer, Houston TX, severe ADD/ADHD.
FORMAT: Bottom line first (1-2 sentences). Numbered steps. Micro-steps. Visual structure.
CONFIDENCE: Start response with CONFIDENCE: X/20 on its own line.
End: NEXT ACTION → [exact step]. No fluff.`;
  
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      system: `${FMT}\n\nRole: ${ROLES[name] || 'HENRY specialist'}`,
      messages: [{ role: 'user', content: `Task: ${args.task}${args.context ? `\nContext: ${args.context}` : ''}` }]
    })
  });
  
  if (!res.ok) return { content: [{ type:'text', text:`API error ${res.status}` }], isError: true };
  const d = await res.json();
  return { content: [{ type:'text', text: d.content?.[0]?.text || 'No response' }] };
}
