/**
 * PRISM-MC ENGINE
 * Triple-Lens reasoning + Monte Carlo simulation + DeepConf validation
 * 
 * HOW IT WORKS:
 * 1. TRIPLE-LENS: Same task sent to 3 specialist perspectives simultaneously
 *    - Lens A: OPTIMIZER — highest upside, most aggressive path
 *    - Lens B: VALIDATOR — risk-adjusted, conservative, safest path  
 *    - Lens C: CONTRARIAN — non-obvious angle, creative/disruptive path
 * 
 * 2. MONTE CARLO: Each lens scores itself 0-20 on confidence
 *    + system independently scores each lens output on 4 dimensions
 *    = composite confidence score per lens
 * 
 * 3. DEEPCONF: Confidence gate at 14/20
 *    - Below 14: loop back, regenerate with failure context fed in
 *    - Above 14: deliver winner
 *    - Max 3 loops before escalating to user
 * 
 * 4. OUTPUT: Winner delivered with full confidence trace
 */

const MODEL = 'claude-opus-4-6';
const DEEPCONF_THRESHOLD = 14;
const MAX_LOOPS = 3;

// ============================================================
// TRIPLE-LENS PROMPTS
// ============================================================
const LENSES = {
  A: {
    name: 'OPTIMIZER',
    role: 'You are the OPTIMIZER lens. Your job: find the highest-upside path. Maximize return, speed, and impact. Be aggressive. Assume best-case execution. Prioritize momentum over caution.',
    bias: 'aggressive / high-upside'
  },
  B: {
    name: 'VALIDATOR', 
    role: 'You are the VALIDATOR lens. Your job: find the safest, most defensible path. Identify all risks first. Recommend the option with highest probability of success even if lower ceiling. Prioritize execution reliability.',
    bias: 'conservative / risk-adjusted'
  },
  C: {
    name: 'CONTRARIAN',
    role: 'You are the CONTRARIAN lens. Your job: find what everyone else is missing. Challenge obvious paths. Find non-obvious leverage points, overlooked angles, creative shortcuts, or disruptive approaches.',
    bias: 'creative / non-obvious'
  }
};

const WHITT_FMT = `Owner: Whitt Dwyer, Houston TX, severe ADD/ADHD.
FORMAT: Bottom line first (1-2 sentences). Numbered steps. Micro-steps. Visual structure.
End with: NEXT ACTION → [exact step].
No fluff. Execute.`;

const CONFIDENCE_SCORER_PROMPT = `You are a confidence scoring system. Given a task and a response, score the response on 4 dimensions.
Return ONLY valid JSON, no other text:
{
  "accuracy": <0-5>,
  "completeness": <0-5>,
  "actionability": <0-5>,
  "alignment": <0-5>,
  "reasoning": "<one sentence explaining the total score>",
  "total": <sum of above, 0-20>
}`;

// ============================================================
// MONTE CARLO SIMULATION ENGINE
// ============================================================
export async function runPRISM(task, context, role, apiKey) {
  let loop = 0;
  let failureContext = '';
  
  while (loop < MAX_LOOPS) {
    loop++;
    
    // STEP 1: Run all 3 lenses in parallel
    const lensResults = await runTripleLens(task, context, role, apiKey, failureContext);
    
    // STEP 2: Score each lens with DeepConf
    const scored = await scoreAllLenses(task, lensResults, apiKey);
    
    // STEP 3: Find winner
    const winner = scored.reduce((best, cur) => cur.score > best.score ? cur : best);
    
    // STEP 4: DeepConf gate
    if (winner.score >= DEEPCONF_THRESHOLD) {
      return buildOutput(winner, scored, loop);
    }
    
    // Below threshold — feed failure context into next loop
    failureContext = `Previous attempt scored ${winner.score}/20. Reason: ${winner.reasoning}. Improve on: accuracy and actionability.`;
  }
  
  // Exhausted loops — return best we have with warning
  const scored = await scoreAllLenses(task, await runTripleLens(task, context, role, apiKey, failureContext), apiKey);
  const winner = scored.reduce((best, cur) => cur.score > best.score ? cur : best);
  return buildOutput(winner, scored, loop, true);
}

// ============================================================
// TRIPLE LENS EXECUTION — all 3 in parallel
// ============================================================
async function runTripleLens(task, context, role, apiKey, failureCtx) {
  const userMsg = `${context ? `Context: ${context}\n\n` : ''}Task: ${task}${failureCtx ? `\n\nIMPROVEMENT NOTE: ${failureCtx}` : ''}`;
  
  const calls = Object.entries(LENSES).map(([key, lens]) => ({
    key,
    lens,
    promise: callOpus(apiKey, `${lens.role}\n\n${WHITT_FMT}\n\nSpecialist role: ${role}`, userMsg)
  }));
  
  const results = await Promise.allSettled(calls.map(c => c.promise));
  
  return calls.map((c, i) => ({
    lensKey: c.key,
    lensName: c.lens.name,
    bias: c.lens.bias,
    text: results[i].status === 'fulfilled' ? results[i].value : `Lens ${c.key} failed: ${results[i].reason?.message}`
  }));
}

// ============================================================
// DEEPCONF SCORING — score all lenses in parallel
// ============================================================
async function scoreAllLenses(task, lensResults, apiKey) {
  const scorePromises = lensResults.map(lr =>
    callOpus(apiKey, CONFIDENCE_SCORER_PROMPT,
      `Task: ${task}\n\nResponse to score:\n${lr.text}`
    ).then(raw => {
      try {
        const parsed = JSON.parse(raw.trim());
        return {
          ...lr,
          score: parsed.total || 0,
          scoreBreakdown: {
            accuracy: parsed.accuracy,
            completeness: parsed.completeness,
            actionability: parsed.actionability,
            alignment: parsed.alignment
          },
          reasoning: parsed.reasoning || 'No reasoning provided'
        };
      } catch {
        return { ...lr, score: 10, scoreBreakdown: {}, reasoning: 'Score parse failed' };
      }
    }).catch(() => ({ ...lr, score: 8, scoreBreakdown: {}, reasoning: 'Scoring failed' }))
  );
  
  return Promise.all(scorePromises);
}

// ============================================================
// FORMAT FINAL OUTPUT
// ============================================================
function buildOutput(winner, allScored, loops, lowConfidence = false) {
  const others = allScored.filter(s => s.lensKey !== winner.lensKey);
  
  let output = '';
  
  // Confidence header
  output += `RECOMMENDATION (Confidence: ${winner.score}/20 — ${winner.lensName} lens)\n`;
  if (lowConfidence) output += `⚠️ Low confidence after ${loops} attempts. Verify before acting.\n`;
  output += `Approach: ${winner.bias}\n\n`;
  
  // Winner output
  output += winner.text;
  
  // Alternative lenses (if gap is small)
  const secondBest = others.reduce((b, c) => c.score > b.score ? c : b);
  if (winner.score - secondBest.score <= 3) {
    output += `\n\n---\nALTERNATIVE (${secondBest.lensName} lens — ${secondBest.score}/20):\n${secondBest.text.split('\n').slice(0,4).join('\n')}...`;
  }
  
  // Confidence trace
  output += `\n\n---\nCONFIDENCE TRACE:\n`;
  allScored.forEach(s => {
    output += `${s.lensName}: ${s.score}/20 (accuracy:${s.scoreBreakdown?.accuracy||'?'} completeness:${s.scoreBreakdown?.completeness||'?'} actionability:${s.scoreBreakdown?.actionability||'?'})\n`;
  });
  output += `Loops: ${loops} | Gate: ${DEEPCONF_THRESHOLD}/20 | Winner: ${winner.lensName}`;
  
  return { text: output, confidence: winner.score, loops, winner: winner.lensName };
}

// ============================================================
// OPUS CALL
// ============================================================
async function callOpus(apiKey, system, userMsg) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: userMsg }]
    })
  });
  
  if (!res.ok) throw new Error(`API ${res.status}`);
  const d = await res.json();
  return d.content?.[0]?.text || 'No response';
}
