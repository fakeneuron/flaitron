---
title: entry-docs
status: starter
tags: [refactor, updater, docs]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/*.mjs
  - SECURITY.md
  - SPEC/layout.md
  - README.md
  - .flaitron/audit-overlay/SKILL.md
blocked-by:
  - CORE-931.7
---

# CORE-931.8 | entry-docs

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

CORE-931.2–.7 moved code and left the entry's 193-line header whole. Each
new module opened with a pointer back to it. That header restates sections
whose code now lives elsewhere: gates, gitlink drift, follow-through,
skill wiring, audit forks, rollback and the commit contract. This step
puts each section beside its code and brings the docs that name the
updater's internals up to date.

### Solution shape

- Header split: the entry keeps usage, selection, `--accept-migration`,
  exit codes, the submodule-path rule and a one-line-per-module map. Each
  module's own header takes its sections: check.mjs gets the gates and
  gitlink drift; apply.mjs follow-through, rollback and the commit contract;
  wiring.mjs skill wiring and audit forks; release.mjs the retired
  migrations note. "Not covered" stays in the entry.
- Doc pointers:
  - `SECURITY.md`'s `git()` line names release.mjs.
  - `SPEC/layout.md`'s `tools/` line names the module directory.
  - So does README's `tools/` line.
  - The audit overlay's `performance:` scope reads `tools/update-adopters*`.
- Behavior-preserving: comments and docs only; no code change.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` and `tools/update-adopters/*.mjs` — header comments.
- `SECURITY.md` §"Fleet updater (`tools/`)" — `git()` pointer.
- `SPEC/layout.md` — `tools/` line.
- `README.md` — `tools/` line (~330).
- `.flaitron/audit-overlay/SKILL.md` — `performance:` scope line.
- Possibly `SPEC/scope-boundaries.md` and `SPEC.md` §carve-outs (see Open).

### Explicitly out of scope

- The `node --check` list in AGENTS.md, `justfile` and `ci.yml` (Pair H) — locked unchanged by CORE-931.2.
- The 4 AGENTS-snippets' "parsed by `tools/update-adopters.mjs`" — still true through the entry.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Section placement | Beside its code | Each module documents what it does |

### Acceptance that decides it

- Code unchanged — `git diff --stat` shows comment-only hunks in `tools/`; `node --test tools/update-adopters.test.mjs`
- Docs — `bash tools/drift-checks.sh`

### Open at promotion (Phase 1 should resolve)

- `SPEC/scope-boundaries.md` and `SPEC.md` call the updater "singular" and name only `tools/update-adopters.mjs`. Should the carve-out text name the module directory too, so the exception's bounds are explicit? Lean: one clause in scope-boundaries ("with its modules under `tools/update-adopters/`"); SPEC.md unchanged; check both against `docs/CONTEXT-BUDGET.md`.

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.7]] — `blocked-by:` predecessor.
- [[CORE-EPIC-919]] — the overlay's hand-copied figures; this step touches only its scope line.
