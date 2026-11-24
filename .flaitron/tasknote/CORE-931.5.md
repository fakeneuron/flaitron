---
title: wiring-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/wiring.mjs
blocked-by:
  - CORE-931.4
---

# CORE-931.5 | wiring-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Fourth move of CORE-EPIC-931. Skill wiring and audit-fork reads
(CORE-852.5) form one cohesive block of about 250 lines. It is used by both
`checkAdopter` (read-only plan and fork gates) and `followThrough` (link
writes), so it must move before both (CORE-931.6, .7). The
`skill wiring and audit forks (CORE-852.5)` describe block covers it
end to end, including rollback of link changes.

### Solution shape

- Create `tools/update-adopters/wiring.mjs` and move: `WIRING_SURFACES`,
  `PRUNE_SKIP`, `wiringPlan`, `linkTarget`, `ignoredPaths`,
  `danglingLinks`, `trackedPaths`, `wireSkills`, `FORK_ROOTS`,
  `auditForks`, `forkPassGaps`, `cachedForkDrift`. It imports from
  release.mjs, workspace.mjs (`pathKind`, `SUBMODULE_PATH`) and text.mjs
  (`snippetLinks`, `codexRoster`).
- `cachedForkDrift`'s map adopts CORE-931.2's memo helper.
- Entry re-exports `wiringPlan`; export set unchanged. `checkAdopter` and
  `followThrough` (still in the entry) import what they call.
- Acceptance seeds: the CORE-852.5 describe block already pins these seams
  (say so at promotion; add a pin only if the drift check finds an uncovered
  path); the move is behavior-preserving and never mixed with feature change;
  suite green after; export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; imports + re-exports.
- `tools/update-adopters/wiring.mjs` — new.

### Explicitly out of scope

- `checkAdopter`'s Codex and fork gates stay inline in it: CORE-931.6.
- `followThrough` / rollback of `ctx.links` / `ctx.dirs`: CORE-931.7.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Forks with wiring | One module | Same surfaces (`.claude/skills`, `.agents/skills`), same CORE-852.5 contract, one describe block |

### Acceptance that decides it

- Suite — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/wiring.mjs`

### Open at promotion (Phase 1 should resolve)

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.4]] — `blocked-by:` predecessor.
