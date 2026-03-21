import { tools } from './tools.js';

const MODEL = 'claude-opus-4-6';
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

const FMT = `You are a HENRY specialist. Owner: Whitt Dwyer, Houston TX, severe ADD/ADHD.
FORMAT (non-negotiable):
- BOTTOM LINE FIRST — 1-2 sentences max
- NUMBERED STEPS ONLY — never prose
- MICRO-STEPS — smallest possible units
- VISUAL STRUCTURE — headers, tables
- CONFIDENCE SCORING: RECOMMENDATION (X/20)
- End every response: NEXT ACTION → [exact step]
- No fluff. No preamble. Execute.`;

export async function handleTool(name, args) {
  if (!tools.find(t => t.name === name))
    return { content: [{ type:'text', text:`Error: '${name}' not found` }], isError: true };
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key)
    return { content: [{ type:'text', text:'Error: set ANTHROPIC_API_KEY in henry-core/.env' }], isError: true };
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        system: `${FMT}\n\nRole: ${ROLES[name] || 'HENRY specialist'}`,
        messages: [{ role: 'user', content: `Task: ${args.task}${args.context ? `\nContext: ${args.context}` : ''}` }]
      })
    });
    if (!res.ok) return { content: [{ type:'text', text:`API error ${res.status}` }], isError: true };
    const d = await res.json();
    return { content: [{ type:'text', text: d.content?.[0]?.text || 'No response' }] };
  } catch(e) {
    return { content: [{ type:'text', text:`Error: ${e.message}` }], isError: true };
  }
}
