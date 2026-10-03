import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { ServerResponse } from 'node:http';
import { fileURLToPath } from 'node:url';
import chokidar from 'chokidar';
import {
  discoverProjects,
  latestReleaseTag,
  workspaceRoot,
  type ProjectDescriptor,
} from './src/workspace.ts';
import { createArchiveCache } from './src/archiveCache.ts';
import { DEV_PORT } from './src/originGuard.ts';
import {
  createActiveHandler,
  createArchiveHandler,
  createEventsHandler,
  createPlanArchiveHandler,
  createPlanHandler,
  createProjectsHandler,
} from './src/devApi.ts';
import {
  archiveWatchOptions,
  createChangeBroadcaster,
  createHeartbeat,
  createOnWatchError,
  createOnWatchEvent,
  SSE_DEBOUNCE_MS,
  SSE_HEARTBEAT_MS,
  WATCH_HOT_OPTIONS,
} from './src/flaitronWatch.ts';
import { watchSets } from './src/watchSet.ts';

// Static nonce stamped onto every Vite-injected <script> (the React-refresh
// preamble and @vite/client) via `html.cspNonce`, and echoed in the dev CSP's
// script-src below. Lets script-src stay free of 'unsafe-inline' even though
// Vite's dev server injects an inline preamble script. A fixed value (rather
// than per-response random) is an accepted trade-off for a loopback-only dev
// tool — the win is keeping the directive honestly inline-free.
const DEV_CSP_NONCE = 'flaitron-dev';

// Defense-in-depth CSP for the dev server (the only deployment surface).
// script-src: 'self' + nonce, no 'unsafe-inline' — our theme-init.js is now an
// external /public script ('self'), and Vite's injected scripts carry the nonce.
// style-src keeps 'unsafe-inline': Vite/Tailwind inject <style> at runtime in
// dev, which can't carry a build-time nonce. connect-src allows same-origin SSE
// (/api/events) plus the HMR websocket.
const DEV_CSP = [
  "default-src 'self'",
  `script-src 'self' 'nonce-${DEV_CSP_NONCE}'`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  `connect-src 'self' ws://localhost:${DEV_PORT} ws://127.0.0.1:${DEV_PORT}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join('; ');

function flaitronApi(): Plugin {
  const sseClients = new Set<ServerResponse>();
  let hotWatcher: ReturnType<typeof chokidar.watch> | null = null;
  let archiveWatcher: ReturnType<typeof chokidar.watch> | null = null;
  const projects = new Map<string, ProjectDescriptor>();
  const archiveCache = createArchiveCache();
  const changeBroadcaster = createChangeBroadcaster({ sseClients, debounceMs: SSE_DEBOUNCE_MS });
  const heartbeat = createHeartbeat(sseClients, SSE_HEARTBEAT_MS);

  return {
    name: 'flaitron-api',
    async configureServer(server) {
      const root = workspaceRoot();
      const discovered = await discoverProjects(root);
      for (const p of discovered) projects.set(p.name, p);
      // Resolved from the viz dir — git walks up to the flaitron checkout.
      const latestRelease = await latestReleaseTag(fileURLToPath(new URL('.', import.meta.url)));

      if (server.httpServer) {
        const { hot, archive } = watchSets(discovered);
        const onWatchEvent = createOnWatchEvent({
          projects: projects.values(),
          archiveCache,
          broadcast: changeBroadcaster,
        });

        // Hot set (PLAN.md + active tasknotes) must poll: FSEvents does not
        // reliably fire inside symlinked project roots.
        if (hot.length > 0) {
          hotWatcher = chokidar.watch(hot, WATCH_HOT_OPTIONS);
          hotWatcher.on('all', onWatchEvent);
          hotWatcher.on('error', createOnWatchError('hot'));
        }

        // Archives are write-once and fleet-scale (~thousands of files). Native
        // watch is cheap here; polling them at 200ms would waste CPU at this scale.
        if (archive.length > 0) {
          archiveWatcher = chokidar.watch(archive, archiveWatchOptions(archive));
          archiveWatcher.on('all', onWatchEvent);
          archiveWatcher.on('error', createOnWatchError('archive'));
        }

        heartbeat.start();

        server.httpServer.on('close', () => {
          changeBroadcaster.dispose();
          heartbeat.stop();
          void hotWatcher?.close();
          void archiveWatcher?.close();
          archiveCache.clear();
          for (const res of sseClients) res.end();
          sseClients.clear();
        });

        server.middlewares.use('/api/events', createEventsHandler(sseClients));
      }

      server.middlewares.use('/api/projects', createProjectsHandler(projects, latestRelease));
      server.middlewares.use('/api/plan', createPlanHandler(projects));
      // Distinct route, not a widened /api/plan body: concatenating the two
      // files server-side would leave parser diagnostics reporting line numbers
      // that exist in neither. Connect matches mount paths on a `/` or `.`
      // boundary, so `/api/plan` does not swallow `/api/plan-archive`.
      server.middlewares.use('/api/plan-archive', createPlanArchiveHandler(projects));
      server.middlewares.use('/api/active', createActiveHandler(projects));
      server.middlewares.use('/api/archive', createArchiveHandler(projects, archiveCache));
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), flaitronApi()],
  // Stamp DEV_CSP_NONCE onto Vite-injected <script>/<style> tags so the dev
  // CSP's script-src can omit 'unsafe-inline' (see DEV_CSP above).
  html: { cspNonce: DEV_CSP_NONCE },
  // Pin the dev port and refuse to auto-bump. 5120 is well outside the 5173+
  // Vite default cluster other projects in the same workspace tend to use.
  // Without strictPort, vite climbs 5120 → 5121 → ... and can collide
  // unexpectedly. Better to fail loudly so the user can free the port.
  // The single-port discipline also enforces the "one global viz" model:
  // if a second instance is launched, it errors out instead of silently
  // scanning the same workspace on a different port.
  server: {
    port: DEV_PORT,
    strictPort: true,
    // Restrict Host header to loopback names. Combined with `originGuard()`
    // on each /api/* middleware, this defeats DNS-rebinding against the dev
    // server (a remote site resolving its domain to 127.0.0.1 to bypass
    // SOP). Mirrors Vite's own post-`CVE-2025` default posture.
    allowedHosts: ['localhost', '127.0.0.1'],
    headers: {
      'Content-Security-Policy': DEV_CSP,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: false,
    // Default 5000ms is too tight for userEvent-heavy App.test.tsx tests under
    // Node 26: the file runs ~26s in full-suite runs (vs ~340ms per test in
    // isolation), so parallel contention can push a single test past 5s and
    // flake the /ft-release viz gate. 15s leaves headroom while still catching
    // genuine hangs.
    testTimeout: 15_000,
    // Cap fork-pool workers at half the cores. The default (all cores) makes
    // the suite compete with itself — 25 jsdom environments spinning up across
    // 8 workers starves userEvent waits past even the raised timeouts above
    // whenever the machine carries other load. Half leaves headroom for that
    // load, kills the flake structurally instead of via further timeout bumps
    // (already maxed out), and measured *faster* wall-clock under load than
    // the default.
    maxWorkers: '50%',
  },
});
