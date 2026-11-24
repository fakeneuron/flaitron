---
title: apply-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/apply.mjs
blocked-by:
  - CORE-931.6
---

# CORE-931.7 | apply-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Last code move of CORE-EPIC-931. The write path covers checkout,
follow-through, the commit contract and rollback. It moves out so the
entry is left as a thin CLI: args, main loop, report printers, `isMain`
guard, re-exports. The `sandboxed --apply`, `applyBump rollback`, fetch
timeout and memoization blocks pin it.

### Solution shape

- Create `tools/update-adopters/apply.mjs` and move: `fetchTimeoutMs`,
  `TASKNOTE_README`, `AGENTS_MD`, `cachedWorkflowBlock`,
  `verifyPinnedSha`, `rollbackBump`, `followThrough`, `checkoutVerified`,
  `applyBump`.
- The entry keeps `USAGE`, `usageError`, `parseArgs`, `reportResult`,
  `reportSummary`, `main`, the Node ≥20 guard and the `isMain` guard. The
  `isMain` guard compares against the entry's own `import.meta.url`, so it
  must stay there.
- Entry re-exports `applyBump`, `verifyPinnedSha`; export set unchanged.
- Acceptance seeds: existing apply and rollback tests pin these seams;
  `FLAITRON_FETCH_TIMEOUT_MS` is still read at call time; the move is
  behavior-preserving and never mixed with feature change; suite green
  after; export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; imports + re-exports.
- `tools/update-adopters/apply.mjs` — new.

### Explicitly out of scope

- Splitting the header comment across modules, and doc pointers: CORE-931.8.
- The untested rollback-incomplete residue branch: it moves whole; pin it only if promotion finds the move touches it.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Report printers | Stay in entry | CLI presentation; `reportResult` calls `applyBump` across the boundary |

### Acceptance that decides it

- Suite — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/apply.mjs`

### Open at promotion (Phase 1 should resolve)

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.6]] — `blocked-by:` predecessor.
