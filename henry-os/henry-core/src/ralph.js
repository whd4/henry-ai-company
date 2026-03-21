/**
 * RALPH LOOP — Persistent Orchestrator with Monte Carlo Path Validation
 * 
 * Named after the Ralph security loop plugin — persistent, watchful, keeps going.
 * 
 * ARCHITECTURE:
 * 
 * RALPH = the persistent driver. Never gives up. Keeps trying until:
 *   a) Monte Carlo rates the solution above SOLVE_THRESHOLD (16/20)
 *   b) MAX_ITERATIONS hit (escalate to human)
 *   c) All paths pruned (dead end — escalate)
 * 
 * SHARED STATUS FILE = /data/status/TASK_ID.json
 *   Every sub-agent reads this before acting
 *   Every sub-agent writes its progress here after each step
 *   Ralph reads it to decide what to do next
 *   Monte Carlo reads it to evaluate path quality
 * 
 * MONTE CARLO PATH VALIDATOR:
 *   Runs after EVERY sub-agent action
 *   Scores the current path: 0-20
 *   Below PRUNE_THRESHOLD (8/20): path is PRUNED, sub-agent redirected
 *   Above PRUNE_THRESHOLD but below SOLVE_THRESHOLD: continue
 *   Above SOLVE_THRESHOLD (16/20): SOLVED, deliver result
 * 
 * SUB-AGENT COORDINATION:
 *   Ralph spawns sub-agents with specific roles
 *   Each sub-agent operates on one slice of the problem
 *   All sub-agents read shared status to avoid duplication
 *   All sub-agents write their findings to shared status
 *   Ralph synthesizes when all sub-agents report in
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATUS_DIR = process.env.STATUS_DIR || join(__dirname, '../../data/status');
const MODEL_ORCHESTRATOR = 'claude-opus-4-6';
const MODEL_SUBAGENT = process.env.MODEL_SUBAGENT || 'claude-opus-4-6';
const MODEL_SCORER = 'claude-opus-4-6';

const SOLVE_THRESHOLD = 16;   // Monte Carlo score to declare solved
const PRUNE_THRESHOLD = 8;    // Monte Carlo score below which path is pruned
const MAX_ITERATIONS = 8;     // Max Ralph loops before escalating
const MAX_SUBAGENTS = 6;      // Max parallel sub-agents per task

if (!existsSync(STATUS_DIR)) mkdirSync(STATUS_DIR, { recursive: true });

// ============================================================
// SHARED STATUS FILE MANAGER
// ============================================================
export class StatusBoard {
  constructor(taskId) {
    this.taskId = taskId;
    this.path = join(STATUS_DIR, `${taskId}.json`);
    if (!existsSync(this.path)) {
      this.write({
        taskId,
        created: new Date().toISOString(),
        status: 'initializing',
        iteration: 0,
        goal: '',
        subAgents: {},
        findings: [],
        prunedPaths: [],
        mcScores: [],
        currentBestScore: 0,
        solution: null,
        log: []
      });
    }
  }

  read() {
    try { return JSON.parse(readFileSync(this.path, 'utf8')); }
    catch { return {}; }
  }

  write(data) {
    writeFileSync(this.path, JSON.stringify(data, null, 2));
    return data;
  }

  update(updates) {
    const current = this.read();
    const updated = { ...current, ...updates, lastUpdated: new Date().toISOString() };
    return this.write(updated);
  }

  log(source, message, type = 'info') {
    const board = this.read();
    board.log = board.log || [];
    board.log.push({
      ts: new Date().toISOString(),
      source,
      message,
      type
    });
    // Keep last 100 log entries
    if (board.log.length > 100) board.log = board.log.slice(-100);
    this.write(board);
  }

  updateSubAgent(agentId, update) {
    const board = this.read();
    board.subAgents = board.subAgents || {};
    board.subAgents[agentId] = {
      ...board.subAgents[agentId],
      ...update,
      lastUpdated: new Date().toISOString()
    };
    this.write(board);
  }

  addFinding(source, finding, score = null) {
    const board = this.read();
    board.findings = board.findings || [];
    board.findings.push({
      source,
      finding,
      score,
      ts: new Date().toISOString()
    });
    this.write(board);
  }

  prunePath(agentId, reason, score) {
    const board = this.read();
    board.prunedPaths = board.prunedPaths || [];
    board.prunedPaths.push({
      agentId,
      reason,
      score,
      ts: new Date().toISOString()
    });
    // Mark sub-agent as pruned
    if (board.subAgents?.[agentId]) {
      board.subAgents[agentId].status = 'pruned';
      board.subAgents[agentId].pruneReason = reason;
    }
    this.write(board);
  }

  getStatusSummary() {
    const board = this.read();
    const activeAgents = Object.values(board.subAgents || {}).filter(a => a.status === 'active').length;
    const prunedAgents = Object.values(board.subAgents || {}).filter(a => a.status === 'pruned').length;
    const doneAgents = Object.values(board.subAgents || {}).filter(a => a.status === 'done').length;
    return {
      iteration: board.iteration,
      status: board.status,
      activeAgents,
      prunedAgents,
      doneAgents,
      findingsCount: (board.findings || []).length,
      currentBestScore: board.currentBestScore,
      lastUpdated: board.lastUpdated
    };
  }
}

// ============================================================
// MONTE CARLO PATH VALIDATOR
// ============================================================
async function validatePath(board, agentId, agentOutput, goal, apiKey) {
  const boardState = board.read();
  const contextStr = JSON.stringify({
    goal: boardState.goal,
    iteration: boardState.iteration,
    findingsSoFar: (boardState.findings || []).slice(-5).map(f => f.finding),
    prunedPaths: (boardState.prunedPaths || []).map(p => p.reason),
    agentId,
    agentOutput: agentOutput.substring(0, 500)
  });

  const scorerPrompt = `You are a Monte Carlo path validator for an AI agent system.
Given a goal and what a sub-agent just produced, score whether this path is moving toward solving the goal.

Return ONLY valid JSON:
{
  "score": <0-20>,
  "verdict": "good" | "prune" | "solved",
  "reason": "<one sentence>",
  "redirect": "<if pruning, what should agent do instead — one sentence>",
  "progress": <0-100>
}`;

  try {
    const res = await callModel(MODEL_SCORER, scorerPrompt,
      `Context: ${contextStr}`, apiKey);
    const parsed = JSON.parse(res.trim());
    return {
      score: parsed.score || 0,
      verdict: parsed.verdict || 'good',
      reason: parsed.reason || '',
      redirect: parsed.redirect || '',
      progress: parsed.progress || 0
    };
  } catch {
    return { score: 10, verdict: 'good', reason: 'scoring parse failed', redirect: '', progress: 50 };
  }
}

// ============================================================
// SUB-AGENT EXECUTOR
// ============================================================
async function runSubAgent(agentId, role, task, statusSummary, apiKey, board) {
  board.updateSubAgent(agentId, { status: 'active', role, task, startedAt: new Date().toISOString() });
  board.log(agentId, `Starting task: ${task.substring(0, 80)}`);

  const boardState = board.read();
  const contextForAgent = `
You are sub-agent ${agentId} with role: ${role}

MAIN GOAL: ${boardState.goal}
YOUR SPECIFIC TASK: ${task}

SHARED STATUS BOARD (what other agents have found):
${JSON.stringify(statusSummary, null, 2)}

EXISTING FINDINGS:
${(boardState.findings || []).slice(-3).map(f => `- [${f.source}] ${f.finding}`).join('\n')}

PRUNED PATHS (do NOT go down these):
${(boardState.prunedPaths || []).map(p => `- ${p.reason}`).join('\n') || 'none'}

INSTRUCTIONS:
1. Do your specific task
2. Be concrete and actionable
3. State what you found clearly
4. Flag if you hit a dead end
5. End with: FINDING: [your key finding in one sentence]`;

  try {
    const output = await callModel(MODEL_SUBAGENT,
      `You are a specialist sub-agent in HENRY OS. Owner: Whitt Dwyer, Houston TX, severe ADD/ADHD. Be direct, specific, actionable.`,
      contextForAgent, apiKey);

    board.updateSubAgent(agentId, { status: 'reporting', output: output.substring(0, 500) });
    board.log(agentId, `Completed task — validating path`, 'ok');

    // Extract finding
    const findingMatch = output.match(/FINDING:\s*(.+?)(?:\n|$)/i);
    const finding = findingMatch ? findingMatch[1] : output.split('\n')[0];
    board.addFinding(agentId, finding);

    return { agentId, output, finding, success: true };
  } catch(e) {
    board.updateSubAgent(agentId, { status: 'error', error: e.message });
    board.log(agentId, `Error: ${e.message}`, 'err');
    return { agentId, output: '', finding: '', success: false, error: e.message };
  }
}

// ============================================================
// RALPH — THE PERSISTENT ORCHESTRATOR
// ============================================================
export async function runRalph(goal, context, taskId, apiKey) {
  const board = new StatusBoard(taskId);
  board.update({ goal, context, status: 'running', iteration: 0 });
  board.log('RALPH', `Starting task: ${goal.substring(0, 80)}`);

  let iteration = 0;
  let bestSolution = null;
  let bestScore = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;
    board.update({ iteration, status: `loop_${iteration}` });
    board.log('RALPH', `=== LOOP ${iteration}/${MAX_ITERATIONS} ===`);

    // STEP 1: Ralph plans the sub-agent assignments for this iteration
    const plan = await ralphPlan(goal, context, board, iteration, apiKey);
    board.log('RALPH', `Plan: ${plan.assignments.length} sub-agents assigned`);

    // STEP 2: Run all sub-agents in parallel
    const subAgentPromises = plan.assignments.map((assignment, idx) => {
      const agentId = `SUB-${iteration}-${String(idx+1).padStart(2,'0')}`;
      return runSubAgent(agentId, assignment.role, assignment.task,
        board.getStatusSummary(), apiKey, board);
    });

    const subResults = await Promise.allSettled(subAgentPromises);
    const results = subResults.map(r => r.status === 'fulfilled' ? r.value : { success: false });

    // STEP 3: Monte Carlo validates each sub-agent's path
    const validations = [];
    for (const result of results) {
      if (!result.success || !result.output) continue;
      const validation = await validatePath(board, result.agentId, result.output, goal, apiKey);
      validations.push({ ...result, validation });
      board.log('RALPH',
        `MC [${result.agentId}]: ${validation.score}/20 — ${validation.verdict} — ${validation.reason}`,
        validation.verdict === 'prune' ? 'warn' : 'info'
      );

      if (validation.verdict === 'prune' || validation.score < PRUNE_THRESHOLD) {
        board.prunePath(result.agentId, validation.reason, validation.score);
        board.log('RALPH', `PRUNED ${result.agentId}: ${validation.redirect}`, 'warn');
      } else if (validation.score > bestScore) {
        bestScore = validation.score;
        bestSolution = result.output;
        board.update({ currentBestScore: bestScore });
      }

      if (validation.verdict === 'solved' && validation.score >= SOLVE_THRESHOLD) {
        board.log('RALPH', `SOLVED — score ${validation.score}/20 on iteration ${iteration}`, 'ok');
        board.update({ status: 'solved', solution: result.output });
        board.updateSubAgent(result.agentId, { status: 'done' });
        return buildRalphOutput(board, result.output, validation.score, iteration, 'solved');
      }
    }

    // STEP 4: Ralph synthesizes findings so far
    if (bestScore >= SOLVE_THRESHOLD) {
      board.update({ status: 'solved', solution: bestSolution });
      board.log('RALPH', `SOLVED via synthesis — score ${bestScore}/20`, 'ok');
      return buildRalphOutput(board, bestSolution, bestScore, iteration, 'solved');
    }

    // Mark completed sub-agents
    results.forEach(r => {
      if (r.success && board.read().subAgents?.[r.agentId]?.status !== 'pruned') {
        board.updateSubAgent(r.agentId, { status: 'done' });
      }
    });

    // STEP 5: All paths pruned? Try a completely different approach
    const boardState = board.read();
    const activePaths = Object.values(boardState.subAgents || {}).filter(a => a.status !== 'pruned').length;
    if (activePaths === 0 && iteration < MAX_ITERATIONS) {
      board.log('RALPH', 'All paths pruned — pivoting strategy', 'warn');
      board.update({ prunedPaths: [] }); // Reset pruned paths to allow fresh start
    }
  }

  // MAX_ITERATIONS hit — deliver best we have
  board.update({ status: 'max_iterations', solution: bestSolution });
  board.log('RALPH', `Max iterations (${MAX_ITERATIONS}) reached. Best score: ${bestScore}/20`, 'warn');
  return buildRalphOutput(board, bestSolution || 'Could not solve within iteration limit.', bestScore, iteration, 'partial');
}

// ============================================================
// RALPH PLANNER — decides sub-agent assignments each loop
// ============================================================
async function ralphPlan(goal, context, board, iteration, apiKey) {
  const boardState = board.read();
  const plannerPrompt = `You are RALPH, a persistent orchestrator AI.
Your job: plan which sub-agents to dispatch this iteration to make progress toward the goal.

GOAL: ${goal}
ITERATION: ${iteration}
FINDINGS SO FAR: ${JSON.stringify((boardState.findings || []).slice(-5))}
PRUNED PATHS: ${JSON.stringify((boardState.prunedPaths || []).map(p => p.reason))}
BEST SCORE SO FAR: ${boardState.currentBestScore}/20

Return ONLY valid JSON:
{
  "assignments": [
    { "role": "<specialist role>", "task": "<specific concrete task for this sub-agent>" },
    ... up to ${MAX_SUBAGENTS} assignments
  ],
  "strategy": "<one sentence explaining this iteration's approach>"
}`;

  try {
    const res = await callModel(MODEL_ORCHESTRATOR,
      'You are RALPH, a persistent AI orchestrator. Be strategic. Use different approaches each iteration if previous ones failed.',
      plannerPrompt, apiKey);
    const parsed = JSON.parse(res.trim());
    board.log('RALPH', `Strategy: ${parsed.strategy}`);
    return { assignments: parsed.assignments || [], strategy: parsed.strategy || '' };
  } catch {
    // Fallback plan
    return {
      assignments: [{ role: 'generalist', task: `Solve: ${goal}` }],
      strategy: 'fallback single agent'
    };
  }
}

// ============================================================
// FORMAT OUTPUT
// ============================================================
function buildRalphOutput(board, solution, score, iterations, status) {
  const boardState = board.read();
  const totalAgents = Object.keys(boardState.subAgents || {}).length;
  const prunedCount = (boardState.prunedPaths || []).length;
  const findingsCount = (boardState.findings || []).length;

  let output = `RALPH LOOP — ${status.toUpperCase()} (${score}/20 confidence)\n`;
  output += `Iterations: ${iterations}/${MAX_ITERATIONS} | Sub-agents: ${totalAgents} | Pruned paths: ${prunedCount} | Findings: ${findingsCount}\n\n`;
  output += `---\n`;
  output += solution;
  output += `\n\n---\nSHARED STATUS BOARD SUMMARY:\n`;
  output += `  Goal: ${boardState.goal}\n`;
  output += `  Status: ${boardState.status}\n`;
  output += `  Best MC score: ${score}/20\n`;
  output += `  Sub-agent activity:\n`;
  Object.entries(boardState.subAgents || {}).forEach(([id, agent]) => {
    const statusIcon = agent.status === 'done' ? '✓' : agent.status === 'pruned' ? '✗' : '●';
    output += `    ${statusIcon} ${id} [${agent.role}]: ${agent.status}\n`;
  });
  output += `  Status file: ${board.path}\n`;
  output += `\nNEXT ACTION → ${status === 'solved' ? 'Review solution above and implement.' : 'Review partial findings and re-run with more context.'}`;

  return { text: output, score, iterations, status, taskId: board.taskId, statusFile: board.path };
}

// ============================================================
// MODEL CALL
// ============================================================
async function callModel(model, system, userMsg, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 2048, system, messages: [{ role: 'user', content: userMsg }] })
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const d = await res.json();
  return d.content?.[0]?.text || '';
}
