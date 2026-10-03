import type { IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { endPlain } from './apiResponse.ts';
import { originGuard } from './originGuard.ts';
import { realpathWithin, safeRealpath } from './fsSafe.ts';
import { readTasknoteDir } from './tasknoteRead.ts';
import type { ProjectDescriptor } from './workspace.ts';
import type { ArchiveCache } from './archiveCache.ts';

type Handler = (req: IncomingMessage, res: ServerResponse) => void;
type AsyncHandler = (req: IncomingMessage, res: ServerResponse) => Promise<void>;

// /api/* responses are JSON/text/SSE, never HTML — lock CSP all the way down
// rather than reuse vite.config.ts's HTML-page CSP (script-src/style-src
// tolerances that make no sense for these payloads). Applied ahead of any
// guard clause so even 403/400/500 error bodies carry it.
// `frame-ancestors` is spelled out because `default-src` does not fall back to
// it: without the directive nothing stops a hostile page framing /api/events to
// occupy SSE slots. It pairs with originGuard's `Sec-Fetch-Site` reject — this
// half needs the browser to honor CSP, that half does not.
const API_SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'X-Content-Type-Options': 'nosniff',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};

function applyApiHeaders(res: ServerResponse): void {
  for (const [name, value] of Object.entries(API_SECURITY_HEADERS)) {
    res.setHeader(name, value);
  }
}

// Origin-less requests pass originGuard by design (see originGuard.ts), which
// leaves plan/tasknote content readable by anything that can reach the port
// without a browser Origin header. Rejecting non-GET/HEAD closes off
// state-changing or side-channel verbs before origin/business logic runs.
function methodGuard(req: IncomingMessage, res: ServerResponse): boolean {
  const method = req.method ?? 'GET';
  if (method === 'GET' || method === 'HEAD') return true;
  res.setHeader('Allow', 'GET, HEAD');
  endPlain(res, 405, 'Method Not Allowed');
  return false;
}

// The prelude every /api/* handler runs before its own logic: security headers
// on every response (error bodies included), then the method and origin guards.
// Wrapping rather than repeating it makes shipping a handler without them a
// structural impossibility instead of a review catch.
//
// Uniformly async, which widens the two synchronous handlers from `Handler` to
// `AsyncHandler`. Their observable behavior is unchanged: an async body runs
// synchronously up to its first suspension, and neither of those two contains
// an `await`.
function guarded(handler: Handler | AsyncHandler): AsyncHandler {
  return async (req, res) => {
    applyApiHeaders(res);
    if (!methodGuard(req, res)) return;
    if (!originGuard(req, res)) return;
    await handler(req, res);
  };
}

export function projectFromQuery(
  req: IncomingMessage,
  projects: Map<string, ProjectDescriptor>,
): ProjectDescriptor | { error: string } {
  const url = new URL(req.url ?? '', 'http://localhost');
  const name = url.searchParams.get('project');
  if (!name) return { error: 'missing ?project=<name>' };
  const project = projects.get(name);
  if (!project) {
    // Keep the caller's ?project= value off the wire — an error body is not the
    // place to reflect request input back. The name still reaches the operator
    // on server stderr, matching the log-detail/return-generic split these
    // handlers' 500 paths use.
    // JSON.stringify, not raw interpolation: a `?project=` value containing a
    // newline would otherwise forge or split a line in the operator's stderr.
    console.error(`[devApi] unknown project: ${JSON.stringify(name)}`);
    return { error: 'unknown project' };
  }
  return project;
}

export function createProjectsHandler(
  projects: Map<string, ProjectDescriptor>,
  latestRelease: string | null,
): AsyncHandler {
  return guarded((req, res) => {
    const list = Array.from(projects.values()).map((p) => ({
      name: p.name,
      flaitronVersion: p.flaitronVersion,
    }));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ latestRelease, projects: list }));
  });
}

export function createPlanHandler(
  projects: Map<string, ProjectDescriptor>,
): AsyncHandler {
  return guarded(async (req, res) => {
    const project = projectFromQuery(req, projects);
    if ('error' in project) {
      endPlain(res, 400, project.error);
      return;
    }
    try {
      // Same project-root containment createPlanArchiveHandler / createActiveHandler
      // apply: discoverProjects only validates planPath once, at scan time — without
      // a per-request check, a `.flaitron/PLAN.md` (or an ancestor) swapped to a
      // symlink afterward would let any readable file on disk reach /api/plan.
      const realRoot = await safeRealpath(project.root);
      const realPlan = realRoot === null ? null : await realpathWithin(realRoot, project.planPath);
      if (realPlan === null) {
        throw new Error('planPath resolves outside the project root');
      }
      const text = await readFile(realPlan, 'utf8');
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(text);
    } catch (e) {
      console.error(`[devApi] Failed to read PLAN.md: ${(e as Error).message}`);
      endPlain(res, 500, 'Failed to read PLAN.md');
    }
  });
}

// `.flaitron/PLAN-ARCHIVE.md` is optional history: it does not exist until a
// project's first `## Completed` rotation, and many adopters will never rotate.
// Absence is an empty archive, never an error (SPEC/plan-filing.md
// §"`## Completed` rotation" — "consumers treat absence as an empty archive").
// The same tolerance covers a present-but-unreadable file: a board renders fine
// from PLAN.md alone, so supplementary history must never be able to 500 it.
// Containment mirrors createActiveHandler / archiveCache.readArchive — without
// it a symlinked PLAN-ARCHIVE.md would make any readable file on disk fetchable
// here.
export function createPlanArchiveHandler(
  projects: Map<string, ProjectDescriptor>,
): AsyncHandler {
  return guarded(async (req, res) => {
    const project = projectFromQuery(req, projects);
    if ('error' in project) {
      endPlain(res, 400, project.error);
      return;
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    const realRoot = await safeRealpath(project.root);
    if (realRoot === null) {
      res.end('');
      return;
    }
    // Null covers both "not there" and "resolves outside the project root" —
    // the response is the same empty archive either way.
    const realArchive = await realpathWithin(realRoot, project.planArchivePath);
    if (realArchive === null) {
      res.end('');
      return;
    }
    try {
      res.end(await readFile(realArchive, 'utf8'));
    } catch (e) {
      console.error(`[devApi] Failed to read PLAN-ARCHIVE.md: ${(e as Error).message}`);
      res.end('');
    }
  });
}

export function createActiveHandler(
  projects: Map<string, ProjectDescriptor>,
): AsyncHandler {
  return guarded(async (req, res) => {
    const project = projectFromQuery(req, projects);
    if ('error' in project) {
      endPlain(res, 400, project.error);
      return;
    }
    try {
      // Same project-root containment archiveCache.readArchive applies: a
      // symlinked `.flaitron/tasknote/` would otherwise let any readable file
      // on disk reach /api/active.
      const realRoot = await safeRealpath(project.root);
      if (realRoot === null) {
        res.setHeader('Content-Type', 'application/json');
        res.end('[]');
        return;
      }
      const tasknotes = await readTasknoteDir(realRoot, project.tasknoteDir);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(tasknotes));
    } catch (e) {
      console.error(`[devApi] Failed to list tasknotes: ${(e as Error).message}`);
      endPlain(res, 500, 'Failed to list tasknotes');
    }
  });
}

export function createArchiveHandler(
  projects: Map<string, ProjectDescriptor>,
  archiveCache: ArchiveCache,
): AsyncHandler {
  return guarded(async (req, res) => {
    const project = projectFromQuery(req, projects);
    if ('error' in project) {
      endPlain(res, 400, project.error);
      return;
    }
    try {
      const tasknotes = await archiveCache.get(project);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(tasknotes));
    } catch (e) {
      console.error(`[devApi] Failed to list archived tasknotes: ${(e as Error).message}`);
      endPlain(res, 500, 'Failed to list archived tasknotes');
    }
  });
}

const MAX_SSE_CLIENTS = 10;

export function createEventsHandler(sseClients: Set<ServerResponse>): AsyncHandler {
  return guarded((req, res) => {
    if (sseClients.size >= MAX_SSE_CLIENTS) {
      endPlain(res, 503, 'SSE capacity full');
      return;
    }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    // A HEAD probe wants the headers a GET would send, not a held-open stream
    // occupying one of the MAX_SSE_CLIENTS slots.
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    res.flushHeaders?.();
    res.write('event: open\ndata: {}\n\n');
    sseClients.add(res);
    req.on('close', () => {
      sseClients.delete(res);
    });
    // A write to a socket dropped by RST (before `close` fires) emits an
    // 'error' on the response; without this listener that error is unhandled
    // and crashes the long-running dev server. Prune the client instead.
    res.on('error', () => {
      sseClients.delete(res);
    });
  });
}
