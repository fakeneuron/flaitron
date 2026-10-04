---
title: dev-advisory refresh
status: completed
tags: []
created: 2026-07-22
due:
related-tasks: [TEST-EPIC-002, TEST-002.3, TEST-002.4, TEST-002.N]
---

# TEST-002.2 | dev-advisory refresh

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[TEST-EPIC-002]]

## 🎯 Goal

Refresh the visualizer lockfile past both vulnerable `brace-expansion` ranges and prove the full and production-only npm audit surfaces are clean.

## ✅ Acceptance

- [x] The lockfile resolves the minimatch 3 branch to `brace-expansion` >=1.1.16 and the minimatch 10 branch to >=5.0.7
- [x] `viz/package.json` dependency ranges remain unchanged and the refresh is lockfile-only
- [x] `npm --prefix viz audit` exits 0 with zero vulnerabilities
- [x] `npm --prefix viz audit --omit=dev` exits 0 with zero vulnerabilities
- [x] Visualizer tests, typecheck, and lint pass

## 🧩 Subtasks

- [x] Apply npm's non-breaking lockfile-only advisory fix
- [x] Verify both `brace-expansion` dependency branches resolve above their vulnerable ranges
- [x] Run full and production-only npm audits
- [x] Run visualizer tests, typecheck, and lint
- [x] Complete the documentation sweep and archive the task atomically with its lockfile deliverable

## 🔗 Related

- [[TEST-EPIC-002]] — parent portable full-repo gates epic
- [[TEST-002.3]] — sibling updater fixture portability task
- [[TEST-002.4]] — sibling gate discoverability task
- [[TEST-002.N]] — terminal portable-gates audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The live full npm audit reports one high-severity `brace-expansion` vulnerability spanning two installed ranges, and npm reports a fix is available.

- [x] Read relevant source files — `viz/package.json`, `viz/package-lock.json`, and the installed dependency tree from `npm --prefix viz ls brace-expansion minimatch --all`

- [x] **Best Practices Review** — dependency metadata only: npm owns the lockfile graph, direct ranges remain in `package.json`, and the minimal boundary-preserving change is an npm-generated lockfile-only fix. No source abstraction, duplication, or refactor is in scope.

- [x] **Archive skim** — no `archive/TEST/` tasknotes exist yet. The load-bearing same-file precedent is `archive/core/CORE-351.2.md`: use npm's in-range lockfile fix, leave `package.json` unchanged, then run the full visualizer gates. `CORE-351.N` later confirmed that lockfile-only shape was coherent.

- [x] **Drift check** — the cited `viz/package-lock.json` exists and still pins `brace-expansion` 1.1.14 and 5.0.6. The registry audit confirms vulnerable ranges `<1.1.16` and `>=3.0.0 <5.0.7`; both match the task description, so there is no scope drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assume npm can resolve both fixes without changing direct dependency ranges; if it cannot, stop before broadening beyond a lockfile-only refresh.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The full audit reports one high-severity vulnerability record with two advisory ranges and two installed nodes. `eslint` reaches `brace-expansion@1.1.14` through `minimatch@3.1.5`; `typescript-eslint` reaches `brace-expansion@5.0.6` through `minimatch@10.2.5`. Both fixes are available as patch releases. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the `CORE-351.2` lockfile-only `npm audit fix` precedent and the repository's standard visualizer gate set; no new shape or duplicated mechanism introduced

- [x] **Minimal refactor gate** — no refactor needed; npm-generated dependency metadata is the only deliverable and unrelated dependency updates remain deferred

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (lockfile-only patch with no source behavior change)

**Implementation Notes:**

`npm --prefix viz audit fix --package-lock-only` changed only `viz/package-lock.json` (8 insertions / 8 deletions). The vulnerable nodes advanced from `brace-expansion` 1.1.14 → 1.1.16 and 5.0.6 → 5.0.7. npm also synchronized the lockfile root's stale package version 5.11.0 → 5.13.0 to match `viz/package.json`; direct dependency ranges did not change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: 16 files, 230 tests passed

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` and `npm --prefix viz run lint`: clean

- [x] **Quality assertions** — N/A for source-quality concerns because no code changed; the lockfile diff contains only npm-owned version, URL, and integrity metadata for two patch updates plus root-version synchronization

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no UI source, styling, or rendered behavior changed)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `npm --prefix viz audit`: exit 0, zero vulnerabilities.
- `npm --prefix viz audit --omit=dev`: exit 0, zero vulnerabilities.
- A registry-enabled `npm --prefix viz ci` installed all 433 lockfile packages; the resulting tree resolves `brace-expansion` 1.1.16 and 5.0.7.
- Visualizer gates: 230/230 tests passed; typecheck and lint exited cleanly.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — lockfile-only advisory patches do not change documented behavior, workflow, compatibility, or public dependencies:

  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change; its v5.13.0 verification stamp remains current
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md child line flipped to stub form `Completed 2026-07-22.` and kept nested beneath active parent `TEST-EPIC-002`; tasknote moved to `.flowtron/tasknote/archive/TEST/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Refreshed both vulnerable `brace-expansion` branches in the visualizer lockfile with patch-only updates, clearing the full and production-only npm audit surfaces without changing direct dependency ranges or application code. The npm-managed diff is 8 insertions / 8 deletions; all 230 tests, typecheck, and lint pass, and all 12 AI-referenced docs require no update. No refactor was needed, and the dependency baseline is safe for the epic's later full-repository audit.

**Archived:** 2026-07-22
