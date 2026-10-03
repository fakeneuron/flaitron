# Flaitron visualizer (`viz/`)

Read-only Vite/React/TypeScript view of every flaitron-adopting project under
`${FLAITRON_VIZ_WORKSPACE:-~/code}`. Operator-facing runbook (workspace scan,
port, adopter submodule path) lives in the repo-root
[`README.md` §Visualizer](../README.md#visualizer); threat model in
[`SECURITY.md` §Visualizer](../SECURITY.md#visualizer-viz-dev-server-scope).
This file declares the **module architecture** structural audits judge against.

## Commands

From the repository root (parent of `viz/`):

```sh
npm --prefix viz install
npm --prefix viz run dev        # http://localhost:5120 (strictPort)
npm --prefix viz test
npm --prefix viz run typecheck
npm --prefix viz run lint
npm --prefix viz run build
```

Inside `viz/`, drop the `--prefix viz`.

### `package.json`'s `version` field is not maintained

It does not track the flaitron release version — the git tag is the sole
version authority for viz. It briefly mirrored a runtime `VIZ_VERSION`
constant (`FE-056`), which CORE-478 later deleted as dead code, dropping the
`/ft-release` bump step along with it. Don't wire it back into the release
recipe or treat its value as a pin to keep current.

## Architecture — three tiers

`viz/src` is split into three tiers. Dependency direction is one-way down the
table: a tier may import from tiers below it, never above.

| Tier | Where | Role |
|---|---|---|
| **Browser UI** | `src/ui/` | React components, hooks, and browser-view selectors. |
| **Shared pure** | `src/*.ts` with no `node:` imports | Parsing (`parser`, `tasknote`) plus other Node-free shared modules (`fence`, `sseChange`, `storage`, `viewMode`, `visibilityPrefs`, `projectStorage`). Usable from the browser bundle and, where relevant, from the Node plugin. |
| **Node-only dev API** | `src/*.ts` with `node:` imports + `vite.config.ts` | Filesystem scan, contained tasknote reads (`tasknote-parse` frontmatter parse), archive cache, watchers, `/api/*` handlers, origin guard. Hosted only by the Vite plugin — never shipped to the browser. |

### Hard rule: no Node imports under `src/ui/`

Files under `src/ui/` **must not** import `node:*` builtins or any Node-only
tier module (`devApi`, `workspace`, `fsSafe`, `tasknoteRead`, `tasknote-parse`,
`archiveCache`, `flaitronWatch`, `watchSet`, `originGuard`, `apiResponse`). They import shared pure modules via
`../…` and sibling UI modules via `./…` only.

This is enforced by an eslint `no-restricted-imports` rule scoped to
`src/ui/**` (`eslint.config.js`), not just an import-graph convention.

### Dependency direction

```text
src/ui/*          →  shared pure (../parser, ../tasknote, …)
                     ✗ never → Node-only

Node-only         →  shared pure (./sseChange, …)
                     ✗ never → src/ui/*

shared pure       →  other shared pure only
                     ✗ never → Node-only or src/ui/*
```

`sseChange.ts` is the canonical shared example: its header states it stays
Node-free so the browser client and the Vite plugin share one SSE wire-format
encoder/decoder without pulling `node:path` into the bundle.

### Entrypoints

- **Browser:** `src/main.tsx` mounts `ui/App` into `#root`.
- **Node:** `vite.config.ts` registers the `flaitron-api` plugin, which wires
  `workspace` / `devApi` / `flaitronWatch` / `archiveCache` onto the dev server.

### Layout sketch

```text
viz/
  vite.config.ts          Node-only plugin host
  src/
    main.tsx              browser entry
    ui/                   Browser UI tier
    parser.ts             Shared pure (PLAN parsing)
    tasknote.ts           Shared pure (tasknote model + section helpers)
    fence.ts              Shared pure (fenced-code-block line mask)
    sseChange.ts          Shared pure (SSE payload codec)
    storage.ts            Shared pure (localStorage read/write helper)
    viewMode.ts           Shared pure (localStorage view mode)
    visibilityPrefs.ts    Shared pure (localStorage visibility prefs)
    projectStorage.ts     Shared pure (localStorage active project)
    devApi.ts             Node-only (/api handlers)
    workspace.ts          Node-only (project discovery)
    fsSafe.ts             Node-only (path-safe fs helpers)
    tasknoteRead.ts       Node-only (contained tasknote-dir reader)
    tasknote-parse.ts     Node-only (frontmatter split + js-yaml parse)
    archiveCache.ts       Node-only
    flaitronWatch.ts      Node-only
    watchSet.ts           Node-only
    originGuard.ts        Node-only
    apiResponse.ts        Node-only
```
