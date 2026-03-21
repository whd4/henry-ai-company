import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, '..', '.env');
if (existsSync(envPath)) {
  readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k?.trim() && v.length) process.env[k.trim()] = v.join('=').trim();
  });
}

import { tools } from './tools.js';
import { handleTool } from './handler.js';

const server = new Server(
  { name: 'henry-core', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: tools.map(t => ({ name: t.name, description: t.description, inputSchema: t.inputSchema }))
}));

server.setRequestHandler(CallToolRequestSchema, async (req) =>
  handleTool(req.params.name, req.params.arguments)
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('[HENRY-CORE] 20 skills active — Opus 4.6 ready');
