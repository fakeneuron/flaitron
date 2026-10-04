---
title: engines-ci-matrix
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: []
touches:
  - viz/package.json
---

# CORE-651.4 | engines-ci-matrix

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Reconcile `viz/package.json`'s `engines.node` range with the CI matrix (`[24, 26]`), and fix any stale restatement of the CORE-639.2 rationale.

## ✅ Acceptance

- [x] `viz/package.json` `engines.node` no longer claims support for a Node line the CI matrix doesn't test — `grep -n 'engines' -A2 viz/package.json`
- [x] No stale restatement of the CORE-639.2 "Node 24/26 matrix" rationale remains — `grep -rn '639.2\|Node 24' docs/CONVENTIONS.md`

## 🧩 Subtasks

- [x] Drop the `^22.22.2 ||` clause from `viz/package.json` `engines.node` so it matches the CI matrix (`[24, 26]`)
- [x] Confirm `docs/CONVENTIONS.md` §"GitHub Actions CI" already reflects the 24/26 matrix (CORE-639.2) with no stale restatement
- [x] Run validation roster

## 🔗 Related

- [[CORE-639.2]] — set the CI matrix to `[24, 26]`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `viz/package.json` `engines.node` is `^22.22.2 || ^24.15.0 || >=26.0.0`; CI matrix (`.github/workflows/ci.yml`) tests `[24, 26]` only, added by CORE-639.2. Confirmed against current file content — matches the task line's description exactly.

- [x] Read relevant source files — read `viz/package.json` (`engines` block), `.github/workflows/ci.yml` (matrix), `docs/CONVENTIONS.md` §"GitHub Actions CI".

- [x] **Best Practices Review** — single JSON key edit, no module boundaries involved. N/A.

- [x] **Archive skim** — grepped `archive/core/` for `639.2`/`22.22.2`/`engines.node`: `CORE-639.2` (added the CI matrix), `CORE-639.N` (epic audit), `CORE-642`, `CORE-119`, `CORE-128`, `CORE-430.2` reference Node versions incidentally. Read `CORE-639.2.md` in full — it deliberately set the matrix to `[24, 26]` (not `[22, 24, 26]`) and already updated `docs/CONVENTIONS.md`'s "on Node 24" clause to "on a Node 24/26 matrix"; nothing there references or restates a rationale in `viz/package.json` or elsewhere needing correction.

- [x] **Drift check** — grepped repo-wide (excluding archived tasknotes/PLAN.md) for `639.2` / `22.22.2`: no hits outside `viz/package.json`'s literal version string and the archived CORE-639.2 note itself. `docs/CONVENTIONS.md` already says "on a Node 24/26 matrix" — no stale restatement exists to fix. No drift from the PLAN.md line's description.

- [x] Asked clarifying questions — No clarifications needed (--unattended). Assumption: since CI intentionally tests only `[24, 26]` (CORE-639.2's deliberate choice) and no 22 job exists or is being added, the correct reconciliation is dropping the `^22.22.2 ||` clause from `engines.node` rather than adding 22 to the CI matrix — matching the "drop the 22 line" option named first in the PLAN.md line.

- [x] Subtasks populated above; `touches:` declared.

**Discovery Notes:** No stale restatement of CORE-639.2's rationale exists anywhere outside the archived tasknote itself (which is historical and not touched). The only concrete fix is the `engines.node` line in `viz/package.json`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, single JSON value edit.

- [x] **Minimal refactor gate** — N/A, no refactor.

- [x] Implemented the minimal solution — dropped `^22.22.2 || ` from `viz/package.json` `engines.node`, leaving `^24.15.0 || >=26.0.0` to match the CI matrix `[24, 26]`. No stale CORE-639.2 restatement existed elsewhere to fix (confirmed in Discovery).

- [x] Updated/added tests for non-trivial behavior — N/A, config-only change with no testable application logic.

**Implementation Notes:** One-line change: `viz/package.json` `engines.node` `"^22.22.2 || ^24.15.0 || >=26.0.0"` → `"^24.15.0 || >=26.0.0"`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (config-only change, ran as part of full roster below)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck`, `npm --prefix viz run lint`

- [x] **Verification receipt** — recorded below. No duplication/dead code/complexity introduced; no stale code-facing documentation (CONVENTIONS.md was already current per Discovery).

- [x] (frontend) N/A — not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `grep -n 'engines' -A2 viz/package.json` → 0 (`engines.node` now reads `^24.15.0 || >=26.0.0`)
- `grep -rn '639.2\|Node 24' docs/CONVENTIONS.md` → 0 (reads "on a Node 24/26 matrix", no stale bare "Node 24")
- `npm --prefix viz test` → 0 (575 tests passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked `.flowtron/tasknote/README.md` §"AI-referenced docs"; `docs/CONVENTIONS.md` already reflects the Node 24/26 matrix (CORE-639.2), no change needed. No other referenced doc mentions `engines.node` or the Node version.

- [x] Closed — every Acceptance criterion ticked; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to `## Completed`; tasknote to be archived to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:** Dropped the `^22.22.2 ||` clause from `viz/package.json` `engines.node` (1 line changed), leaving `^24.15.0 || >=26.0.0` to match the CI `validate` job's `[24, 26]` matrix (CORE-639.2). No stale restatement of the CORE-639.2 rationale was found anywhere in scope — `docs/CONVENTIONS.md` already reads "on a Node 24/26 matrix" from that prior task. Full test/typecheck/lint roster for the touched package all pass (575 tests). `touches:` scope reconciliation: `git diff --name-only` → `viz/package.json` — matches declared `touches:` exactly. Maintainability effect: `engines.node` no longer overstates support for a Node line CI doesn't test, closing the gap between the declared compatibility range and what's actually exercised.

**Archived:** 2026-09-21
