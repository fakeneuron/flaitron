---
title: workspace-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/workspace.mjs
  - tools/update-adopters.test.mjs
  - viz/src/workspace.ts
blocked-by:
  - CORE-931.2
---

# CORE-931.3 | workspace-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Second move of CORE-EPIC-931. Workspace and path code imports only
release.mjs (CORE-931.2), and text.mjs (CORE-931.4) needs its
`SUBMODULE_PATH`, so it moves next. Its viz mirrors (`expandHome`,
`workspaceRoot`, `isFile`, `pinnedVersion`) are what the Version-regex
parity test and `viz/src/workspace.ts`'s comments point at, so both
repoint in this step.

### Solution shape

- Create `tools/update-adopters/workspace.mjs` and move: `FLAITRON_DIR`,
  `SUBMODULE_PATH`, `expandHome`, `workspaceRoot`, `isFile`,
  `realOrResolve`, `pinnedVersion`, `pathKind`, `FLAITRON_URL`,
  `declaredSubmodulePaths`, `discoverAdopters`. It imports `git` /
  `FLAITRON_REPO` from release.mjs.
- Move the "mirror viz/src/workspace.ts verbatim" comments with their functions.
- Repoint the Version-regex parity test (CORE-366) from the entry's source
  text to workspace.mjs's. Repoint `viz/src/workspace.ts`'s three mirror
  comments (lines ~20, ~42, ~64) to the new file. pinnedVersion and the
  `expandHome` / `workspaceRoot` / `isFile` mirrors land here.
  `latestReleaseTag`'s name-sharing note now points at release.mjs.
  Only comments change in viz.
- Entry re-exports `SUBMODULE_PATH`, `realOrResolve`, `pinnedVersion`,
  `discoverAdopters`; export set unchanged (CORE-931.2's pin).
- Acceptance seeds: the parity test reads the new home and is green
  **before** the old copy is deleted; the move is behavior-preserving and
  never mixed with feature change; suite green after; export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; imports + re-exports.
- `tools/update-adopters/workspace.mjs` — new.
- `tools/update-adopters.test.mjs` — the parity test reads `workspace.mjs`.
- `viz/src/workspace.ts` — mirror comments only (no code; no `node:*` import change).

### Explicitly out of scope

- Markdown helpers: CORE-931.4. Wiring: CORE-931.5.
- Sharing code with viz — the zero-dependency mirror decision stands.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| `pathKind` home | workspace.mjs | Shared by wiring, audit forks and follow-through; it classifies adopter paths |
| viz edits | Comments only | viz tier rules; no shared module across tools/↔viz |

### Acceptance that decides it

- Suite incl. parity test — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/workspace.mjs`
- viz untouched in behaviour — `npm --prefix viz run typecheck && npm --prefix viz run lint`

### Open at promotion (Phase 1 should resolve)

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.2]] — `blocked-by:` predecessor.
- [[CORE-366]] — related-decision: Version-regex parity pin.
