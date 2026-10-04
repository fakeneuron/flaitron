---
title: viz-advisory-patches
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-351, CORE-351.3, CORE-351.N]
---

# CORE-351.2 | viz-advisory-patches

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-351]]

## 🎯 Goal

Apply the minimal dependency updates so `npm --prefix viz audit --audit-level=moderate` passes clean, then confirm the three viz gates (test/typecheck/lint) still pass.

## ✅ Acceptance

- [x] `npm --prefix viz audit --audit-level=moderate` exits 0 (no moderate+ advisories)
- [x] Only in-range (non-major) dependency bumps; `package.json` direct-dep ranges unchanged unless a major is unavoidable
- [x] `npm --prefix viz run test` passes
- [x] `npm --prefix viz run typecheck` passes
- [x] `npm --prefix viz run lint` passes

## 🧩 Subtasks

- [x] Run `npm audit fix` in `viz/` to sync `package-lock.json` to fixed versions
- [x] Re-run the moderate audit; confirm clean
- [x] Run test, typecheck, lint gates
- [x] Close: flip PLAN line, archive tasknote

## 🔗 Related

- [[CORE-EPIC-351]] — parent safety-net epic (Milestone 0)
- [[CORE-351.3]] — sibling: update-adopters gitlink-state detection
- [[CORE-351.N]] — epic audit child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `npm --prefix viz audit --audit-level=moderate` currently exits 1 with 4 advisories (1 low, 1 moderate, 2 high). Task is live and correctly scoped.

- [x] Read relevant source files — `viz/package.json`, `viz/package-lock.json`

- [x] **Archive skim** — prior dep tasknotes: CORE-233 (dep-gray-matter-stale) removed a stray dep; CORE-119 (node-engines-bump). No prior tasknote touched the lockfile-vs-tree drift. Nothing load-bearing beyond confirming lockfile is git-tracked and committed.

- [x] **Drift check** — task cites `npm --prefix viz audit --audit-level=moderate` as the gate; confirmed exact command exits 1 today. No path/name drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumption: sync the committed lockfile to fixed versions via `npm audit fix` (non-major, in-range).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Root cause: the committed `viz/package-lock.json` (Jun 14) pins vulnerable versions
(vite 6.4.2, ws 8.20.1, js-yaml 3.14.2 + 4.1.1, @babel/core 7.29.0), while the local
`node_modules` already resolved to the fixed versions (vite 6.4.3, ws 8.21.0,
js-yaml 3.15.0 + 4.3.0, @babel/core 7.29.7). `npm audit` reads the lockfile → flags 4
advisories; `npm ls` reads node_modules → shows fixed. All fixes are within the
existing `package.json` semver ranges (vite `^6.4.2` → 6.4.3 patch; ws/js-yaml/babel
are transitive), so `npm audit fix` syncs the lock with no major bumps.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — dependency-currency work; the gate is the same three viz npm scripts used across the repo. No new pattern.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (dependency update, no source change)

**Implementation Notes:**

`npm audit fix` in `viz/` rewrote `package-lock.json` only (105 ins / 95 del) — no
`package.json` change. Pinned versions advanced within existing ranges:
@babel/core 7.29.0→7.29.7, js-yaml 3.14.2→3.15.0 + 4.1.1→4.3.0, vite 6.4.2→6.4.3,
ws 8.20.1→8.21.0. All transitive except vite (direct devDep, `^6.4.2` patch bump).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm run test`: 16 files, 229 tests passed

- [x] Ran lint/type-check on changed code — `npm run typecheck` + `npm run lint`: clean

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI/behavior change)

**Testing Notes:**

`npm --prefix viz audit --audit-level=moderate` now exits 0 (0 vulnerabilities).
test 229/229, typecheck clean, lint clean.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all AI-referenced docs: **no change** (no doc pins dependency versions or the viz lockfile; viz version 5.11.0 unchanged)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Synced the stale committed `viz/package-lock.json` to the fixed dependency versions
already resolved in `node_modules`, clearing all 4 npm-audit advisories (1 low, 1
moderate, 2 high) at moderate level. Lockfile-only change; three viz gates green.

**Archived:** 2026-07-12
