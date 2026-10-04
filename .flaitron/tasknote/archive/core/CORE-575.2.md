---
title: npm-audit-fix-in-range
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-575]
touches:
  - viz/package.json
  - viz/package-lock.json
---

# CORE-575.2 | npm-audit-fix-in-range

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-575]]

## 🎯 Goal

Run `npm audit fix` in `viz/` to clear the in-range advisories (vitest, browserslist, baseline-browser-mapping) and confirm the full AGENTS.md §"Validation" gates still pass.

## ✅ Acceptance

- [ ] `npm audit` no longer reports the vitest / browserslist / baseline-browser-mapping advisories — `npm --prefix viz audit`
- [ ] Visualizer test suite passes — `npm --prefix viz test`
- [ ] Typecheck passes — `npm --prefix viz run typecheck`
- [ ] Lint passes — `npm --prefix viz run lint`

## 🧩 Subtasks

- [ ] Run `npm --prefix viz audit` to capture the baseline advisory list
- [ ] Run `npm --prefix viz audit fix` for the in-range set
- [ ] Re-run `npm --prefix viz audit` to confirm the vitest / browserslist / baseline-browser-mapping advisories are gone (js-yaml/gray-matter residue is out of scope — CORE-575.3)
- [ ] Run the AGENTS.md §"Validation" gates (test / typecheck / lint)

## 🔗 Related

- [[CORE-EPIC-575]] — parent epic (viz-dependency-posture)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the epic's stated in-range advisory set (vitest / browserslist / baseline-browser-mapping); js-yaml/gray-matter is explicitly deferred to CORE-575.3.

- [x] Read relevant source files — no source read needed beyond `viz/package.json` (audit output is the primary input, checked at Execution)

- [x] **Best Practices Review** — N/A: dependency-version bump via `npm audit fix`, no module-boundary or abstraction work involved

- [x] **Archive skim** — `archive/core/` has no prior tasknotes touching `viz/package.json` / dependency audits; logged "no prior tasknotes"

- [x] **Drift check** — PLAN.md line matches the epic's Discovery findings (5 advisories, 2 high); no drift

- [x] Asked clarifying questions OR logged "No clarifications needed (--fast)" — implied by the `[unattended]` row marker per SPEC/gates.md; assumption: "in-range set" means `npm audit fix`'s default (non-`--force`) resolution, leaving any breaking-change advisory for a separate task

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:** Epic Discovery (audit-repo, 2026-09-11) already scoped this child to the in-range advisory set. No further investigation needed before Execution — the exact resolution (which packages actually move) is determined by running `npm audit` itself.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: pure dependency-version bump, no code pattern involved

- [x] **Minimal refactor gate** — N/A: no refactor, `npm audit fix` only touched the lockfile

- [x] Implemented the minimal solution — ran `npm --prefix viz audit fix`; updated 16 packages, `viz/package.json` unchanged, `viz/package-lock.json` updated

- [x] Updated/added tests for non-trivial behavior — N/A, no source behavior changed

**Implementation Notes:** `npm audit fix` resolved all 4 in-range advisories (vitest/@vitest-mocker, baseline-browser-mapping, browserslist ×2) without any `package.json` range changes. As a side effect it also bumped gray-matter's nested `js-yaml` from a vulnerable 3.x to 3.15.2 (still within gray-matter's own `^3.13.1` range, patching GHSA-2883-xcg3-v3hh), so `npm audit` now reports 0 vulnerabilities — the js-yaml/gray-matter residue targeted by CORE-575.3 may already be resolved; that task's Discovery should re-run `npm audit` before deciding its own scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` → 28 files / 531 tests passed

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` and `npm --prefix viz run lint` both clean

- [x] **Verification receipt** — see Testing Notes below; no duplication/dead-code/doc-drift introduced (lockfile-only change)

- [x] (frontend) N/A — dependency/audit maintenance task, no UI change

**Testing Notes:**
- `npm --prefix viz audit` → 0 (0 vulnerabilities, was 5)
- `npm --prefix viz test` → 0 (531 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any entry in `.flowtron/tasknote/README.md` §"AI-referenced docs"; this is a lockfile-only dependency bump with no contract, workflow, or wiring surface touched

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form, kept nested under active parent `CORE-EPIC-575`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

`npm --prefix viz audit fix` cleared the 4 in-range advisories (vitest/@vitest-mocker GHSA-82fw-gwwq-j7x9, baseline-browser-mapping GHSA-w5vr-8v7q-w6rv, browserslist ×2 GHSA-c83g-rgw3-j3cx/GHSA-73wf-gq98-2v4g) — 16 packages updated, `viz/package.json` untouched, `viz/package-lock.json` changed (77 insertions / 74 deletions). As a bonus, the same command also bumped gray-matter's nested `js-yaml` in-range to 3.15.2, patching the CPU-use advisory (GHSA-2883-xcg3-v3hh) that CORE-575.3 was filed to address — `npm --prefix viz audit` now reports **0 vulnerabilities** (was 5). `touches:` scope matches exactly: `viz/package.json` (read, unchanged) + `viz/package-lock.json` (changed). Verification: `npm --prefix viz audit` → 0, `npm --prefix viz test` → 531/531 passed, `npm --prefix viz run typecheck` → 0, `npm --prefix viz run lint` → 0. No refactor needed; no docs drifted. Recommend CORE-575.3's Discovery re-run `npm audit` first — it may already be satisfied and reduce to a `SECURITY.md` note rather than an `overrides` pin.

**Archived:** 2026-09-11
