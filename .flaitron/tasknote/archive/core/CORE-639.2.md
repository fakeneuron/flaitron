---
title: ci-node-matrix
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-639.N]
touches:
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
---

# CORE-639.2 | ci-node-matrix

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-639.N]]

## 🎯 Goal

Add a Node 24/26 matrix to the `validate` job in `ci.yml`, wired through `setup-node`, and update the `docs/CONVENTIONS.md` "on Node 24" clause to match.

## ✅ Acceptance

- [x] `validate` job carries `strategy.matrix.node: [24, 26]` and `setup-node`'s `node-version` references `${{ matrix.node }}` — `grep -n 'matrix' .github/workflows/ci.yml`
- [x] No `- run:` line changed (Pair H untouched) — `git diff .github/workflows/ci.yml` shows only job-level key changes
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" no longer says "on Node 24" alone — `grep -n 'Node 24' docs/CONVENTIONS.md`

## 🧩 Subtasks

- [x] Add `strategy: matrix: node: [24, 26]` to the `validate` job
- [x] Point `setup-node`'s `node-version` at `${{ matrix.node }}`
- [x] Update `docs/CONVENTIONS.md` §"GitHub Actions CI" Node clause
- [x] Verify Pair H (AGENTS.md §"Validation" ↔ ci.yml `- run:` steps) still passes

## 🔗 Related

- [[CORE-639.N]] — epic closure audit (parent: CORE-EPIC-639)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line is concrete and unambiguous — add a matrix key to one job, no run-line changes, and fix one doc clause. Confirmed against current `.github/workflows/ci.yml` and `docs/CONVENTIONS.md`.

- [x] Read relevant source files — read `.github/workflows/ci.yml` in full (both `validate` and `drift` jobs, plus Pair H's `run:` block) and the `docs/CONVENTIONS.md` §"GitHub Actions CI" paragraph.

- [x] **Best Practices Review** — this is a pure CI-config change (YAML key addition), no code module boundaries involved. N/A.

- [x] **Archive skim** — `archive/core/` grepped for `ci.yml`: prior CI-touching notes (CORE-578 secret scan, CORE-631.2 Pair mirroring) established the job-level/run-level boundary Pair H enforces; no note previously added a node matrix. Nothing contradicts this change.

- [x] **Drift check** — Current `ci.yml` line 24 is `node-version: 24` (single value, not a matrix); PLAN.md line matches: "job-level keys only, no `- run:` line changes." No drift.

- [x] Asked clarifying questions — No clarifications needed (--unattended/--fast). Assumption: matrix runs both 24 and 26 for every step in `validate` (test/typecheck/lint/build + the update-adopters checks + gitleaks); this is the standard GitHub Actions matrix expansion and matches "Add ... to the validate job" without further scoping language.

- [x] Subtasks populated above; `touches:` declared.

**Discovery Notes:** Straightforward mechanical change. `setup-node`'s pinned SHA (`49933ea5...` # v4.4.0) stays; only `node-version:` value changes to `${{ matrix.node }}`. The `cache-dependency-path` stays as-is. Matrix key goes under the `validate:` job, alongside `runs-on`/`timeout-minutes`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing `validate` job shape by adding a standard `strategy.matrix` key (a common GitHub Actions pattern); no new job or workflow needed.

- [x] **Minimal refactor gate** — no refactor performed; only the two lines required (matrix key + `node-version` interpolation) plus the doc clause were touched.

- [x] Implemented the minimal solution — added `strategy.matrix.node: [24, 26]` to `validate`; changed `node-version: 24` to `node-version: ${{ matrix.node }}`; updated `docs/CONVENTIONS.md`'s "on Node 24" clause to "on a Node 24/26 matrix".

- [x] Updated/added tests for non-trivial behavior — N/A, CI-config-only change with no testable application logic; correctness verified via YAML diff shape + Pair H's own check logic (below).

**Implementation Notes:** Confirmed via `git diff` that only job-level keys changed under `validate:` — no `- run:` line touched, so Pair H (AGENTS.md §"Validation" ↔ ci.yml verbatim diff) stays satisfied. `setup-node`'s pinned SHA and `cache`/`cache-dependency-path` keys are untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (change doesn't touch viz source, ran as part of full roster below)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck`, `npm --prefix viz run lint`

- [x] **Verification receipt** — recorded below. No avoidable duplication/dead code/complexity introduced; docs updated in the same commit (no stale code-facing documentation).

- [x] (frontend) N/A — not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `grep -n 'matrix' .github/workflows/ci.yml` → 0 (`strategy:`/`matrix:`/`node: [24, 26]` present)
- `git diff .github/workflows/ci.yml` → 0 (only `strategy:` block added + `node-version` value changed; no `- run:` line touched)
- `grep -n 'Node 24' docs/CONVENTIONS.md` → 0 (line now reads "on a Node 24/26 matrix")
- Pair H shell (AGENTS.md §"Validation" ↔ ci.yml `- run:` diff) run manually → 0, clean diff
- `npm --prefix viz test` → 0 (568 tests passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (54 tests passed)
- Final-newline check (`.editorconfig`) on changed files → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md` §"GitHub Actions CI" updated in-scope (the task's own deliverable). No other `.flowtron/tasknote/README.md` §"AI-referenced docs" entry references the Node version.

- [x] Closed — every Acceptance criterion ticked; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to `## Completed`; tasknote to be archived to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:** Added `strategy.matrix.node: [24, 26]` to the `validate` job in `.github/workflows/ci.yml` and pointed `setup-node`'s `node-version` at `${{ matrix.node }}` (3 lines added, 1 line changed). Updated `docs/CONVENTIONS.md`'s "GitHub Actions CI" paragraph to say "on a Node 24/26 matrix" instead of "on Node 24". No `- run:` line changed, so Pair H stays satisfied (verified manually). Full validation roster (7 AGENTS.md commands) + Pair H shell all pass. `touches:` scope reconciliation: `git diff --name-only` → `.github/workflows/ci.yml`, `docs/CONVENTIONS.md` — matches declared `touches:` exactly. Maintainability effect: CI now exercises both Node LTS lines flowtron targets, catching Node-version-specific regressions before a real adopter hits them; no added complexity (native GH Actions matrix feature).

**Archived:** 2026-09-20
