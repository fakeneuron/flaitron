import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  createActiveHandler,
  createArchiveHandler,
  createEventsHandler,
  createPlanArchiveHandler,
  createPlanHandler,
  createProjectsHandler,
  projectFromQuery,
} from './devApi';
import { DEV_PORT } from './originGuard';
import { createArchiveCache } from './archiveCache';
import type { ProjectDescriptor } from './workspace';

interface FakeRes {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  chunks: string[];
  ended: boolean;
  flushed: boolean;
}

function makeReq(opts: {
  url?: string;
  method?: string;
  headers?: Record<string, string | undefined>;
}): IncomingMessage & { _close: () => void } {
  const closeListeners: Array<() => void> = [];
  const req = {
    url: opts.url ?? '/',
    method: opts.method ?? 'GET',
    headers: opts.headers ?? {},
    on(event: string, cb: () => void) {
      if (event === 'close') closeListeners.push(cb);
    },
    _close() {
      for (const cb of closeListeners) cb();
    },
  } as unknown as IncomingMessage & { _close: () => void };
  return req;
}

function makeRes(): { res: ServerResponse & { _error: () => void }; state: FakeRes } {
  const state: FakeRes = {
    statusCode: 200,
    headers: {},
    body: '',
    chunks: [],
    ended: false,
    flushed: false,
  };
  const errorListeners: Array<() => void> = [];
  const res = {
    get statusCode() {
      return state.statusCode;
    },
    set statusCode(code: number) {
      state.statusCode = code;
    },
    setHeader(name: string, value: string) {
      state.headers[name.toLowerCase()] = value;
    },
    write(chunk: string) {
      state.chunks.push(chunk);
    },
    flushHeaders() {
      state.flushed = true;
    },
    on(event: string, cb: () => void) {
      if (event === 'error') errorListeners.push(cb);
    },
    end(body?: string) {
      if (typeof body === 'string') state.body = body;
      state.ended = true;
    },
    _error() {
      for (const cb of errorListeners) cb();
    },
  } as unknown as ServerResponse & { _error: () => void };
  return { res, state };
}

const ALLOWED_ORIGIN = `http://localhost:${DEV_PORT}`;
const BLOCKED_ORIGIN = 'https://evil.example.com';
const PLAIN_TEXT = 'text/plain; charset=utf-8';

let root: string;
let outside: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'flaitron-viz-dev-api-'));
  outside = await mkdtemp(join(tmpdir(), 'flaitron-viz-dev-api-outside-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
  await rm(outside, { recursive: true, force: true });
});

async function makeProject(
  name: string,
  opts: {
    planText?: string;
    planArchiveText?: string;
    tasknotes?: Record<string, string>;
  } = {},
): Promise<ProjectDescriptor> {
  const projectRoot = join(root, name);
  const projectDir = join(projectRoot, '.flaitron');
  const tasknoteDir = join(projectDir, 'tasknote');
  const archiveDir = join(tasknoteDir, 'archive');
  await mkdir(archiveDir, { recursive: true });
  const planPath = join(projectDir, 'PLAN.md');
  await writeFile(planPath, opts.planText ?? `## High\n\n- [ ] **${name.toUpperCase()}-001** — seed\n`);
  // Left unwritten unless a test asks for it: an absent PLAN-ARCHIVE.md is the
  // normal state of a project that has never rotated.
  const planArchivePath = join(projectDir, 'PLAN-ARCHIVE.md');
  if (opts.planArchiveText !== undefined) await writeFile(planArchivePath, opts.planArchiveText);
  for (const [filename, content] of Object.entries(opts.tasknotes ?? {})) {
    await writeFile(join(tasknoteDir, filename), content);
  }
  return {
    name,
    root: projectRoot,
    planPath,
    planArchivePath,
    tasknoteDir,
    archiveDir,
    flaitronVersion: null,
  };
}

describe('projectFromQuery', () => {
  it('returns the matching project for a known name', () => {
    const proj: ProjectDescriptor = {
      name: 'alpha',
      root: '/tmp/alpha',
      planPath: '/tmp/alpha/.flaitron/PLAN.md',
      planArchivePath: '/tmp/alpha/.flaitron/PLAN-ARCHIVE.md',
      tasknoteDir: '/tmp/alpha/.flaitron/tasknote',
      archiveDir: '/tmp/alpha/.flaitron/tasknote/archive',
      flaitronVersion: null,
    };
    const projects = new Map([['alpha', proj]]);
    const req = makeReq({ url: '/api/plan?project=alpha' });

    const result = projectFromQuery(req, projects);

    expect(result).toBe(proj);
  });

  it('returns an error for a missing query parameter', () => {
    const req = makeReq({ url: '/api/plan' });

    const result = projectFromQuery(req, new Map());

    expect(result).toEqual({ error: 'missing ?project=<name>' });
  });

  it('returns a generic error for an unknown project and logs the name to stderr', () => {
    const req = makeReq({ url: '/api/plan?project=ghost' });
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = projectFromQuery(req, new Map());

    // The caller-supplied name is operator-facing diagnostics, not wire content.
    expect(result).toEqual({ error: 'unknown project' });
    expect(logged).toHaveBeenCalledWith('[devApi] unknown project: "ghost"');
    logged.mockRestore();
  });
});

describe('createProjectsHandler', () => {
  it('rejects a cross-origin request with 403', () => {
    const handler = createProjectsHandler(new Map(), null);
    const req = makeReq({ headers: { origin: BLOCKED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.body).toBe('Forbidden: cross-origin request');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('rejects a non-GET/HEAD request with 405', () => {
    const handler = createProjectsHandler(new Map(), null);
    const req = makeReq({ method: 'POST', headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    expect(state.body).toBe('Method Not Allowed');
  });

  it('returns the latest release + project list as JSON on the allowed origin', async () => {
    const alpha = await makeProject('alpha');
    const beta = await makeProject('beta');
    const projects = new Map([
      ['alpha', alpha],
      ['beta', beta],
    ]);
    const handler = createProjectsHandler(projects, 'v5.6.0');
    const req = makeReq({ headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.headers['content-type']).toBe('application/json');
    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    expect(JSON.parse(state.body)).toEqual({
      latestRelease: 'v5.6.0',
      projects: [
        { name: 'alpha', flaitronVersion: null },
        { name: 'beta', flaitronVersion: null },
      ],
    });
  });

  it('serves a null latestRelease when no tag resolved', async () => {
    const alpha = await makeProject('alpha');
    const handler = createProjectsHandler(new Map([['alpha', alpha]]), null);
    const req = makeReq({ headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(JSON.parse(state.body)).toEqual({
      latestRelease: null,
      projects: [{ name: 'alpha', flaitronVersion: null }],
    });
  });
});

describe('createPlanHandler', () => {
  it('rejects a cross-origin request with 403', async () => {
    const handler = createPlanHandler(new Map());
    const req = makeReq({
      url: '/api/plan?project=alpha',
      headers: { origin: BLOCKED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('rejects a non-GET/HEAD request with 405', async () => {
    const handler = createPlanHandler(new Map());
    const req = makeReq({
      url: '/api/plan?project=alpha',
      method: 'POST',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('returns the PLAN.md text on the allowed origin', async () => {
    const planText = '## High\n\n- [ ] **ALPHA-001** — hello\n';
    const alpha = await makeProject('alpha', { planText });
    const handler = createPlanHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.headers['content-type']).toBe('text/plain; charset=utf-8');
    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    expect(state.body).toBe(planText);
  });

  it('returns a typed 400 that does not echo the requested project name', async () => {
    const handler = createPlanHandler(new Map());
    const req = makeReq({
      url: '/api/plan?project=ghost',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    await handler(req, res);

    expect(state.statusCode).toBe(400);
    expect(state.body).toBe('unknown project');
    expect(state.body).not.toContain('ghost');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    logged.mockRestore();
  });

  it('returns a typed 400 when ?project= is missing entirely', async () => {
    const handler = createPlanHandler(new Map());
    const req = makeReq({ url: '/api/plan', headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(400);
    expect(state.body).toBe('missing ?project=<name>');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('returns a typed 500 when PLAN.md cannot be read', async () => {
    const alpha = await makeProject('alpha');
    const broken = { ...alpha, planPath: join(root, 'alpha', '.flaitron', 'nope.md') };
    const handler = createPlanHandler(new Map([['alpha', broken]]));
    const req = makeReq({
      url: '/api/plan?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    await handler(req, res);

    expect(state.statusCode).toBe(500);
    expect(state.body).toBe('Failed to read PLAN.md');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    logged.mockRestore();
  });

  it('returns a typed 500 when PLAN.md symlinks outside the project root', async () => {
    const outside = await mkdtemp(join(tmpdir(), 'flaitron-outside-'));
    const secret = join(outside, 'secret.md');
    await writeFile(secret, '## High\n\n- [ ] **LEAK-001** — leaked\n');
    const alpha = await makeProject('alpha');
    await rm(alpha.planPath);
    await symlink(secret, alpha.planPath);
    const handler = createPlanHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    await handler(req, res);

    expect(state.statusCode).toBe(500);
    expect(state.body).toBe('Failed to read PLAN.md');
    expect(state.body).not.toContain('LEAK-001');
    logged.mockRestore();
    await rm(outside, { recursive: true, force: true });
  });
});

// Rotated `## Completed` history. The endpoint's whole contract is that
// it degrades instead of failing — an absent archive is the normal state.
describe('createPlanArchiveHandler', () => {
  it('returns the PLAN-ARCHIVE.md text on the allowed origin', async () => {
    const planArchiveText = '# PLAN Archive\n\n## Completed 2026-07\n\n- [x] **ALPHA-001** — Completed 2026-07-14.\n';
    const alpha = await makeProject('alpha', { planArchiveText });
    const handler = createPlanArchiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan-archive?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.headers['content-type']).toBe('text/plain; charset=utf-8');
    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    expect(state.body).toBe(planArchiveText);
  });

  it('returns an empty body when the archive does not exist', async () => {
    // makeProject writes no PLAN-ARCHIVE.md unless asked — a project that has
    // never rotated.
    const alpha = await makeProject('alpha');
    const handler = createPlanArchiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan-archive?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(200);
    expect(state.body).toBe('');
    expect(state.headers['content-type']).toBe('text/plain; charset=utf-8');
  });

  it('returns an empty body when the archive symlinks outside the project root', async () => {
    const outside = await mkdtemp(join(tmpdir(), 'flaitron-outside-'));
    const secret = join(outside, 'secret.md');
    await writeFile(secret, '## Completed 2026-07\n\n- [x] **LEAK-001** — Completed 2026-07-14.\n');
    const alpha = await makeProject('alpha');
    await symlink(secret, alpha.planArchivePath);
    const handler = createPlanArchiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan-archive?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(200);
    expect(state.body).toBe('');
    expect(state.body).not.toContain('LEAK-001');
    await rm(outside, { recursive: true, force: true });
  });

  it('returns a typed 400 that does not echo the requested project name', async () => {
    const handler = createPlanArchiveHandler(new Map());
    const req = makeReq({
      url: '/api/plan-archive?project=ghost',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();
    const logged = vi.spyOn(console, 'error').mockImplementation(() => {});

    await handler(req, res);

    expect(state.statusCode).toBe(400);
    expect(state.body).toBe('unknown project');
    expect(state.body).not.toContain('ghost');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    logged.mockRestore();
  });

  it('rejects a cross-origin request with 403', async () => {
    const alpha = await makeProject('alpha', { planArchiveText: 'secret' });
    const handler = createPlanArchiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/plan-archive?project=alpha',
      headers: { origin: 'https://evil.example' },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.body).not.toContain('secret');
  });

  it('rejects a non-GET/HEAD request with 405', async () => {
    const handler = createPlanArchiveHandler(new Map());
    const req = makeReq({
      url: '/api/plan-archive?project=alpha',
      method: 'POST',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
  });
});

describe('createActiveHandler', () => {
  it('rejects a cross-origin request with 403', async () => {
    const handler = createActiveHandler(new Map());
    const req = makeReq({
      url: '/api/active?project=alpha',
      headers: { origin: BLOCKED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('rejects a non-GET/HEAD request with 405', async () => {
    const handler = createActiveHandler(new Map());
    const req = makeReq({
      url: '/api/active?project=alpha',
      method: 'POST',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('lists active tasknote files as JSON on the allowed origin', async () => {
    const tasknote = `---
title: hi
status: in-progress
created: 2026-05-18
---

# CORE-999 | hi
`;
    const alpha = await makeProject('alpha', { tasknotes: { 'CORE-999.md': tasknote } });
    const handler = createActiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/active?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.headers['content-type']).toBe('application/json');
    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    const parsed = JSON.parse(state.body) as Array<{ id: string }>;
    expect(parsed.map((t) => t.id)).toEqual(['CORE-999']);
  });

  it('tolerates a malformed tasknote and returns the rest', async () => {
    const good = `---
title: hi
status: in-progress
created: 2026-05-18
---

# CORE-999 | hi
`;
    const malformed = '---\nkey:\n\tdrops-good-rest\n---\nbody\n';
    const alpha = await makeProject('alpha', {
      tasknotes: { 'CORE-999.md': good, 'CORE-998.md': malformed },
    });
    const handler = createActiveHandler(new Map([['alpha', alpha]]));
    const req = makeReq({
      url: '/api/active?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(200);
    const parsed = JSON.parse(state.body) as Array<{ id: string }>;
    expect(parsed.map((t) => t.id)).toEqual(['CORE-999']);
  });

  it('drops tasknotes that resolve outside the project root', async () => {
    const outsideNote = `---
title: leaked
status: in-progress
created: 2026-08-21
---

# SECRET-001 | leaked
`;
    // Project root is real, but `.flaitron/tasknote` points out of the tree.
    const stash = join(outside, 'stash');
    await mkdir(stash, { recursive: true });
    await writeFile(join(stash, 'SECRET-001.md'), outsideNote);
    const projectRoot = join(root, 'escaper');
    await mkdir(join(projectRoot, '.flaitron'), { recursive: true });
    await symlink(stash, join(projectRoot, '.flaitron', 'tasknote'));
    const escaper: ProjectDescriptor = {
      name: 'escaper',
      root: projectRoot,
      planPath: join(projectRoot, '.flaitron', 'PLAN.md'),
      planArchivePath: join(projectRoot, '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir: join(projectRoot, '.flaitron', 'tasknote'),
      archiveDir: join(projectRoot, '.flaitron', 'tasknote', 'archive'),
      flaitronVersion: null,
    };
    const handler = createActiveHandler(new Map([['escaper', escaper]]));
    const req = makeReq({
      url: '/api/active?project=escaper',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(200);
    expect(JSON.parse(state.body)).toEqual([]);
  });

  it('still lists tasknotes under a symlinked project root', async () => {
    const tasknote = `---
title: hi
status: in-progress
created: 2026-08-21
---

# CORE-999 | hi
`;
    const realProject = join(outside, 'linked-adopter');
    const realTasknoteDir = join(realProject, '.flaitron', 'tasknote');
    await mkdir(realTasknoteDir, { recursive: true });
    await writeFile(join(realTasknoteDir, 'CORE-999.md'), tasknote);
    const linkedRoot = join(root, 'linked');
    await symlink(realProject, linkedRoot);
    const linked: ProjectDescriptor = {
      name: 'linked',
      root: linkedRoot,
      planPath: join(linkedRoot, '.flaitron', 'PLAN.md'),
      planArchivePath: join(linkedRoot, '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir: join(linkedRoot, '.flaitron', 'tasknote'),
      archiveDir: join(linkedRoot, '.flaitron', 'tasknote', 'archive'),
      flaitronVersion: null,
    };
    const handler = createActiveHandler(new Map([['linked', linked]]));
    const req = makeReq({
      url: '/api/active?project=linked',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    const parsed = JSON.parse(state.body) as Array<{ id: string }>;
    expect(parsed.map((t) => t.id)).toEqual(['CORE-999']);
  });
});

describe('createArchiveHandler', () => {
  it('rejects a cross-origin request with 403', async () => {
    const handler = createArchiveHandler(new Map(), createArchiveCache());
    const req = makeReq({
      url: '/api/archive?project=alpha',
      headers: { origin: BLOCKED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('rejects a non-GET/HEAD request with 405', async () => {
    const handler = createArchiveHandler(new Map(), createArchiveCache());
    const req = makeReq({
      url: '/api/archive?project=alpha',
      method: 'POST',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
  });

  it('serves archived tasknotes from the cache on the allowed origin', async () => {
    const alpha = await makeProject('alpha');
    await mkdir(join(alpha.archiveDir, 'core'), { recursive: true });
    await writeFile(
      join(alpha.archiveDir, 'core', 'CORE-001.md'),
      `---
title: prior
status: completed
created: 2026-05-01
---

# CORE-001 | prior
`,
    );
    const handler = createArchiveHandler(new Map([['alpha', alpha]]), createArchiveCache());
    const req = makeReq({
      url: '/api/archive?project=alpha',
      headers: { origin: ALLOWED_ORIGIN },
    });
    const { res, state } = makeRes();

    await handler(req, res);

    expect(state.headers['content-type']).toBe('application/json');
    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    const parsed = JSON.parse(state.body) as Array<{ id: string }>;
    expect(parsed.map((t) => t.id)).toEqual(['CORE-001']);
  });
});

describe('createEventsHandler', () => {
  it('rejects a cross-origin request with 403 and does not register the client', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    const req = makeReq({ headers: { origin: BLOCKED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.statusCode).toBe(403);
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    expect(sseClients.size).toBe(0);
  });

  it('rejects a non-GET/HEAD request with 405 and does not register the client', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    const req = makeReq({ method: 'POST', headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.statusCode).toBe(405);
    expect(state.headers['allow']).toBe('GET, HEAD');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    expect(sseClients.size).toBe(0);
  });

  it('ends a HEAD request with SSE headers and no body, without registering a client', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    const req = makeReq({ method: 'HEAD', headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.headers['content-type']).toBe('text/event-stream');
    expect(state.ended).toBe(true);
    expect(state.chunks).toEqual([]);
    expect(sseClients.size).toBe(0);
  });

  it('registers the response, writes the SSE preamble, and unregisters on close', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    const req = makeReq({ headers: { origin: ALLOWED_ORIGIN } });
    const { res, state } = makeRes();

    handler(req, res);

    expect(state.headers['x-content-type-options']).toBe('nosniff');
    expect(state.headers['content-security-policy']).toBe(
      "default-src 'none'; frame-ancestors 'none'",
    );
    expect(state.headers['content-type']).toBe('text/event-stream');
    expect(state.headers['cache-control']).toBe('no-cache, no-transform');
    expect(state.headers['connection']).toBe('keep-alive');
    expect(state.flushed).toBe(true);
    expect(state.chunks).toEqual(['event: open\ndata: {}\n\n']);
    expect(sseClients.has(res)).toBe(true);

    req._close();
    expect(sseClients.has(res)).toBe(false);
  });

  it('returns a typed 503 once the client cap is reached', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    for (let i = 0; i < 10; i++) {
      const { res } = makeRes();
      handler(makeReq({ headers: { origin: ALLOWED_ORIGIN } }), res);
    }
    const { res, state } = makeRes();

    handler(makeReq({ headers: { origin: ALLOWED_ORIGIN } }), res);

    expect(state.statusCode).toBe(503);
    expect(state.body).toBe('SSE capacity full');
    expect(state.headers['content-type']).toBe(PLAIN_TEXT);
    expect(sseClients.size).toBe(10);
  });

  it('unregisters the client when the response emits an error (dropped socket)', () => {
    const sseClients = new Set<ServerResponse>();
    const handler = createEventsHandler(sseClients);
    const req = makeReq({ headers: { origin: ALLOWED_ORIGIN } });
    const { res } = makeRes();

    handler(req, res);
    expect(sseClients.has(res)).toBe(true);

    res._error();
    expect(sseClients.has(res)).toBe(false);
  });
});
