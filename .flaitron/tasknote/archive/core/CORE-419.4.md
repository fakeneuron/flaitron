---
title: root-arg validation
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-419, CORE-419.2, CORE-419.3]
---

# CORE-419.4 | root-arg validation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-419]] · [[CORE-419.2]] · [[CORE-419.3]]

## 🎯 Goal

Error when `--root` is missing its value or the value starts with `--`, instead of silently running against the real `~/code`.

## ✅ Acceptance

- [x] `--root` with no following argument (or followed by another flag, e.g. `--apply --root`) errors instead of silently falling back to `workspaceRoot`'s default (`$FLOWTRON_VIZ_WORKSPACE` or `~/code`)
- [x] `--root <value>` where `<value>` starts with `--` (e.g. `--root --apply`) errors instead of swallowing the next flag as a literal path value
- [x] Error message and exit path match `parseArgs`'s existing "Unknown arg" shape (`console.error` + `process.exit(2)` when `exitOnError`, thrown `Error` with `.code = 'USAGE'` otherwise)
- [x] Unit tests in `tools/update-adopters.test.mjs` cover both cases via `parseArgs(..., { exitOnError: false })`
- [x] Full `node --test tools/update-adopters.test.mjs` suite passes

## 🧩 Subtasks

- [x] Add a value-shape check in `parseArgs`'s `--root` branch: missing `argv[i + 1]` or a value starting with `--` routes to the existing error path (reuse the `msg`/`exitOnError` branch, don't duplicate it)
- [x] Update the header usage comment if the error case changes observable behavior worth documenting — N/A, comment only documents the flag's happy path, no claim to update
- [x] Add two test cases to the existing `parseArgs / pure helpers` describe block
- [x] Run the full suite + `node --check`

## 🔗 Related

- [[CORE-EPIC-419]] — parent epic: fleet-updater-safety
- [[CORE-419.2]] — sibling: pinned-ahead downgrade guard in `checkAdopter`
- [[CORE-419.3]] — sibling: mid-bump rollback in `applyBump`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and reproducible in current code. `parseArgs` (`tools/update-adopters.mjs:96-116`) handles `--root` at `:100-102` by unconditionally consuming `argv[i + 1]` with no check that it exists or that it isn't itself another flag. `--apply --root` (`--root` last, no value) leaves `args.root = undefined`; `workspaceRoot(undefined)` (`:131-134`) then falls through to `$FLOWTRON_VIZ_WORKSPACE` or the literal `'~/code'` default — exactly the silent-real-fleet-run the PLAN line describes. `--root --apply` (value starts with `--`) sets `args.root = '--apply'` and swallows the real `--apply` flag, so the run silently becomes dry-run against a bogus path instead of erroring.

- [x] Read relevant source files — `tools/update-adopters.mjs:1-180` (usage comment, `parseArgs`, `workspaceRoot`/`expandHome`) and `tools/update-adopters.test.mjs:1-180` (existing `parseArgs / pure helpers` describe block). Narrow, known read set; no probe needed.

- [x] **Best Practices Review** — `parseArgs` already owns all CLI-arg validation and already has an error path for unknown args (`msg` + `exitOnError` branch, `:104-113`). The fix is a value-shape check inside the existing `--root` branch that routes into that same error path — no new responsibility, no new abstraction, no dependency-direction change. Nothing to defer.

- [x] **Archive skim** — `grep -l "parseArgs\|--root" archive/core/*.md` → CORE-322, CORE-312, CORE-345, CORE-360, CORE-419.3:
  - **CORE-360** — built the `exitOnError: false` unit-test path on `parseArgs` specifically so args validation could be tested without `process.exit` killing the test runner, and established the temp-`--root`-fixture convention ("never touch live `~/code` adopters"). This task's new tests follow the same `exitOnError: false` idiom.
  - **CORE-322** — noted `parseArgs`/`main`'s existing error shape is `console.error()` + `process.exit()`; any new guard should follow the same shape rather than inventing a second one. Directly load-bearing: the new `--root` validation reuses `parseArgs`'s existing `msg`/`exitOnError` branch rather than adding a parallel error path.
  - **CORE-312** — original script design note: `--root` / `$FLOWTRON_VIZ_WORKSPACE` workspace override, dry-run by default. Confirms the override's intended precedence (explicit `--root` beats env beats `~/code` default), which the fix must not disturb.
  - **CORE-345** — smoke-tested `--root /private/tmp` as a dry-run sanity check; no `--root` validation logic touched.
  - **CORE-419.2 / CORE-419.3** (siblings, same epic) — established this epic's fixture idiom and guard-efficacy discipline (prove a new test fails against the pre-fix file); carried into this task's testing approach.

- [x] **Drift check** — code half: `parseArgs` at `:96`, the `--root` branch at `:100-102`, the existing unknown-arg error path at `:104-113`, `workspaceRoot` at `:131-134` — all match the line numbers implied by the PLAN description. The `--apply --root` silent-fallback claim is exact (verified by tracing `args.root = undefined` → `workspaceRoot(undefined)` → env/`~/code` fallback). Contract half: PLAN.md line re-read (`.flowtron/PLAN.md:17`); SPEC.md's carve-out for this tool ("operator-side fleet maintenance", "never auto-mutating beyond the documented apply path") is unaffected — this narrows accepted input, it doesn't widen the tool's mutation footprint. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:

  1. **Both invalid shapes route through the existing unknown-arg error path**, not a new bespoke message — consistent with `parseArgs`'s one error shape today (`Unknown arg: ...` / `Usage: ...`), and CORE-322's finding that new guards should follow it.
  2. **A `--root` value that legitimately starts with `-` but not `--` is out of scope.** Unix paths starting with a single `-` are pathological and not a realistic `~/code` workspace path; the PLAN line names `--` specifically (i.e. "looks like another flag"), which the light-tier scope keeps narrow.
  3. **`--root` followed immediately by end-of-argv is the same failure class as `--root` followed by another flag** — both mean "no usable value was supplied" and get the same error message, no need to distinguish them in the message text.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Baseline before any edit: `node --test tools/update-adopters.test.mjs` → 28 pass / 0 fail (per CORE-419.3's closing count).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the fix reuses `parseArgs`'s existing unknown-arg error shape (`msg` string + `exitOnError` branch: `console.error`×2 + `process.exit(2)`, or a thrown `Error` with `.code = 'USAGE'`) verbatim, just triggered from inside the `--root` branch instead of the `else`. No new pattern, no new abstraction — single-responsibility stays intact (`parseArgs` is still the sole arg-validation site).

- [x] **Minimal refactor gate** — no refactor. The duplicated `msg`/`exitOnError` block (identical shape, different message) was left inline rather than factored into a shared helper: `parseArgs` is a ~20-line function with exactly two call sites of this shape, and extracting a helper for two uses would add indirection without reducing real duplication (the two messages and their trigger conditions differ). Deferred, not required by Acceptance.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`tools/update-adopters.mjs`** (+11/−2), one hunk: the `--root` branch in `parseArgs` (`:100-102`) now reads `argv[i + 1]` into a local `value` and checks `value === undefined || value.startsWith('--')` before accepting it. On failure it throws/exits via the same shape as the existing unknown-arg branch, with the message `--root requires a value`. On success, behavior is unchanged (`args.root = value; i += 1`).

**`tools/update-adopters.test.mjs`** (+14): two new `it` blocks in the existing `parseArgs / pure helpers` describe, both using the `exitOnError: false` idiom CORE-360 established — `['--apply', '--root']` (missing value) and `['--root', '--apply']` (value starts with `--`), each asserting `/--root requires a value/`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **30 pass / 0 fail** (baseline before the change: 28/28).

- [x] Ran lint/type-check on changed code — `node --check` clean on both `tools/update-adopters.mjs` and `tools/update-adopters.test.mjs`. Zero-dep plain-Node tool; no repo-root ESLint config applies (matches CORE-419.3's precedent).

- [x] **Quality assertions** — no avoidable duplication introduced beyond the deliberate, deferred two-call-site pattern noted in Phase 2. No dead code — both new branches (missing value, `--`-prefixed value) are covered by a fixture. No unexplained complexity: the check is a single boolean condition co-located with the code it guards. Public surface unchanged — `parseArgs`'s signature and return shape are identical on the success path. No code-facing documentation went stale (the header usage comment already just says `--root <dir>` with no claim about validation behavior to update).

- [x] (frontend) N/A — no frontend surface; the change is a Node CLI arg parser and its test suite.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change.

  Only `README.md:262` and `SPEC.md:58`/`:890` mention the tool at all (grep across the 14-doc list); both describe it at carve-out/release-gate level (dry-run default, `--apply`/`--root` override, the `node --test` suite as a gate) without describing `parseArgs`'s validation behavior for individual flags. Neither is falsified by tightening `--root`'s input validation.

- [x] Closed

- [x] **Evidence-based recap** drafted

**Final Summary:**

`tools/update-adopters.mjs --root` silently accepted a missing or flag-shaped value: `--apply --root` (value omitted) fell through `workspaceRoot(undefined)` to `$FLOWTRON_VIZ_WORKSPACE` or the real `~/code`, and `--root --apply` swallowed the real `--apply` flag as a literal (bogus) path value. Both are now rejected with the same `Unknown arg`-style error shape `parseArgs` already used, instead of degrading into an unintended fleet-wide dry-run or apply.

- **Changed:** `tools/update-adopters.mjs` (+11/−2: value-shape check in `parseArgs`'s `--root` branch, reusing the existing `msg`/`exitOnError` error path), `tools/update-adopters.test.mjs` (+14: two new cases in the `parseArgs / pure helpers` describe block).
- **Verification:** `node --test tools/update-adopters.test.mjs` **30/30** (baseline 28/28); `node --check` clean on both files. Both new tests were confirmed to fail against the pre-fix `parseArgs` (`Missing expected exception` on each) before the fix, then pass after.
- **Refactors:** none — the fix is additive inside an existing branch; a shared-helper extraction for the two now-similar error blocks was considered and deliberately deferred (two call sites, differing messages, not enough duplication to justify the indirection).
- **Documentation:** doc-drift sweep clean across all 14 AI-referenced docs — the two that mention the tool describe it at carve-out/release-gate level, unaffected by this input-validation tightening.
- **Maintainability:** `--root`'s failure mode is now an immediate, explicit error instead of a silent fallback to the real `~/code` workspace or a swallowed `--apply` flag — closing the last of the three fleet-updater-safety gaps this epic (CORE-EPIC-419) set out to harden (pinned-ahead guard, mid-bump rollback, and now root-arg validation).

**Archived:** 2026-08-08
