---
title: mid-fleet failure test
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-424, CORE-424.2, CORE-424.3, CORE-424.N]
---

# CORE-424.4 | mid-fleet failure test

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-424]] · [[CORE-424.2]] · [[CORE-424.3]] · [[CORE-424.N]]

## 🎯 Goal

Extend the sandboxed `--apply` fixture with a guaranteed-failing adopter so the fleet updater continues past it, reports 1 failed, and exits 1.

## ✅ Acceptance

- [x] Sandboxed `--apply` CLI fixture includes a guaranteed-failing adopter mid-fleet
- [x] Loop continues past the failure (a later adopter still bumps / is reported)
- [x] Summary counts `1 failed`
- [x] CLI exit code is `1` (`runCli` with `expectFail: true`)
- [x] `node --test tools/update-adopters.test.mjs` passes; `node --check` clean on both updater files

## 🧩 Subtasks

- [x] Add a mid-fleet failure `it` under `describe('sandboxed --apply')`
- [x] Fixture: good-before + guaranteed-fail + good-after (alphabetical discovery order)
- [x] Assert exit 1, Summary `1 failed`, continuation (later adopter still processed)
- [x] Run suite + syntax checks

## 🔗 Related

- [[CORE-EPIC-424]] — parent epic: fleet-updater failure signals
- [[CORE-424.2]] — predecessor: exit-code + stderr (completed)
- [[CORE-424.3]] — predecessor: fail-closed migration gate (completed)
- [[CORE-424.N]] — sibling audit (pending)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-424.2 shipped `process.exitCode = 1` + stderr `✗` lines but deferred the mid-fleet regression fixture to this task. Implementation already continues past failures (`main` catch + `reportResult` bump catch); the gap is test-only. Still true today.

- [x] Read relevant source files — `tools/update-adopters.mjs` (`main` 543–591, `reportResult` 504–530, `reportSummary` 533–541), `tools/update-adopters.test.mjs` (`runCli` 37–48, `sandboxed --apply` 412–451, `applyBump rollback` pre-commit injection 492–513)

- [x] **Best Practices Review** — one responsibility: pin mid-fleet failure observability in the existing CLI harness. Extend `describe('sandboxed --apply')` with a new `it` (not a new abstraction). Reuse `makeAdopter` + `runCli({ expectFail: true })` + the CORE-419.3 pre-commit-hook fail recipe. No production-code change expected unless the test reveals a bug.

- [x] **Archive skim** — load-bearing hits:
  - **CORE-424.2** — introduced exit 1 + stderr; explicitly deferred this fixture here. Manual throwaway fixture already proved exit/stderr once.
  - **CORE-424.3** — fail-closed migration gate; adjacent epic child, not this surface.
  - **CORE-419.3** — pre-commit `exit 1` injection to force `applyBump` failure; reuse that shape for a guaranteed mid-apply fail.
  - **CORE-366** — non-1 git exit / corrupt-repo rethrow; check-fail alternative exists but is noisier on stderr.
  - **CORE-360** — importable-module seam + CLI harness origins.

- [x] **Drift check** — PLAN line matches intent. `main` still `continue`s after check failure; `reportResult` still swallows bump failure into `counts.failed` without aborting the loop; `process.exitCode = 1` still sits after `reportSummary`. No SPEC contract for this operator script's exit/test shape (carve-out still holds). No line-number claims in the PLAN description to go stale.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - **Bump-failure (not check-failure)** as the guaranteed fail — PLAN names the sandboxed `--apply` fixture; pre-commit hook injection (CORE-419.3) is the established way to fail apply mid-step without forge/origin surgery.
  - **Three adopters, alphabetical mid-fleet fail** — discover order is localeCompare-sorted; names `a-ok` / `b-fail` / `c-ok` put the failure between two successes so "continues past" is observable as `c-ok` still bumped.
  - **Test-only change** — production path already implements the contract; this task is the regression pin CORE-424.2 deferred.
  - **`expectFail: true`** on `runCli` so non-zero exit is returned rather than thrown.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

CORE-424.2 made failures shell-visible; this task pins that guarantee under multi-adopter `--apply` so a single mid-fleet crash cannot silently become "exit 0, everyone fine" again. Prefer the apply-path failure (pre-commit) over deleting `.git` so the assertion stays on the apply surface the PLAN names.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `describe('sandboxed --apply')` with a new `it`; reused `makeAdopter`, `runCli({ expectFail: true })`, and CORE-419.3's pre-commit `exit 1` injection. No new helper or production shape.

- [x] **Minimal refactor gate** — no refactor. Test-only addition; production continue/exit contract already shipped in CORE-424.2.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the whole deliverable is the new mid-fleet CLI fixture.

**Implementation Notes:**

`tools/update-adopters.test.mjs` only: new `it('continues past a mid-fleet bump failure, counts 1 failed, exits 1')` under sandboxed `--apply`. Three adopters (`a-ok`, `b-fail`, `c-ok`); `b-fail` gets a pre-commit hook that exits 1. Asserts `code === 1`, `a-ok` and `c-ok` bumped lines on stdout, `b-fail` bump-failed on stderr, Summary `bumped 2 · 0 skipped · 1 failed`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **32 pass, 0 fail** (32.7s)

- [x] Ran lint/type-check on changed code — `node --check` clean on both `tools/update-adopters.mjs` and `tools/update-adopters.test.mjs`

- [x] **Quality assertions** — no production-surface growth, no duplication beyond reusing the established pre-commit fail recipe, no dead code, no doc surface claiming the old "no mid-fleet coverage" state.

- [x] (frontend) N/A — no frontend surface touched

**Testing Notes:**

New case green on first run. Full suite 32/32 (was 31 after CORE-424.3).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: **no change**. Test-only addition; no AI-referenced doc asserts mid-fleet apply-failure coverage or exit-code fixtures.

- [x] Closed — all 5 Acceptance criteria ticked, YAML `status: completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-424` parent, tasknote archived to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Pinned the CORE-424.2 failure contract under multi-adopter `--apply`: a mid-fleet bump failure no longer has a silent "exit 0, everyone fine" regression hole. One new sandboxed CLI test forces a pre-commit reject on the middle adopter and asserts the loop still bumps the later adopter, the summary counts `1 failed`, and the process exits 1.

**Changed:** `tools/update-adopters.test.mjs` only (+~28 LOC) — new mid-fleet failure case under `describe('sandboxed --apply')`.

**Verified:** `node --test tools/update-adopters.test.mjs` → 32 pass / 0 fail; `node --check` clean on both updater files.

**Refactors:** none made, none deferred.

**Documentation:** all 14 AI-referenced docs verdicted "no change".

**Maintainability:** the fleet-updater failure path is now covered end-to-end (exit + stderr from CORE-424.2; mid-fleet continue + summary count from this task). Remaining epic child is the audit.

**Archived:** 2026-08-09
