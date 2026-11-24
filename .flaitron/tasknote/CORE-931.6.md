---
title: check-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/check.mjs
blocked-by:
  - CORE-931.5
---

# CORE-931.6 | check-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

Fifth move of CORE-EPIC-931. `checkAdopter`, the 15 skip and drift gates in
sequence, is the read-only half of the pipeline. With release, workspace
and wiring already in modules, it can move whole. The
`checkAdopter classification (fixtures)` block pins every gate.

### Solution shape

- Create `tools/update-adopters/check.mjs` and move: `recordedGitlinkSha`,
  `gitlinkDrift`, `trackedLedgers`, `checkAdopter`. The first two were held
  back from CORE-931.2: their `SUBMODULE_PATH` default would have made
  release.mjs import from workspace.mjs, a cycle.
- Gate order, inline shape and the CORE-479 comment move verbatim.
- Entry re-exports `checkAdopter`, `gitlinkDrift`; export set unchanged.
- Acceptance seeds: existing gate fixtures pin these seams; the move is
  behavior-preserving and never mixed with feature change; suite green
  after; export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; imports + re-exports.
- `tools/update-adopters/check.mjs` — new.

### Explicitly out of scope

- Extracting the gates into an ordered array — declined by CORE-479; not reopened here.
- `applyBump` and the rest of the write path: CORE-931.7.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Gate shape | Inline, unchanged | CORE-479: later gates consume earlier gates' state |
| gitlinkDrift home | check.mjs | Its only caller; avoids a release↔workspace import cycle |

### Acceptance that decides it

- Suite — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/check.mjs`

### Open at promotion (Phase 1 should resolve)

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.5]] — `blocked-by:` predecessor.
- [[CORE-479]] — related-decision: gates left inline.
