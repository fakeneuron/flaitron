---
title: exit-code + stderr
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-424, CORE-424.3, CORE-424.4, CORE-322, CORE-419.4]
---

# CORE-424.2 | exit-code + stderr

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-424]] [[CORE-424.4]]

## 🎯 Goal

Make a failed fleet bump observable to the shell and to stderr consumers: `tools/update-adopters.mjs` exits non-zero when any adopter failed, and both `✗` report lines go to `console.error` instead of `console.log`.

## ✅ Acceptance

- [x] `main()` sets `process.exitCode = 1` when `counts.failed > 0`, after `reportSummary`
- [x] The bump-failure `✗` line (`reportResult`) routes through `console.error`
- [x] The check-failure `✗` line (`main`'s per-adopter catch) routes through `console.error`
- [x] Success paths still exit 0 and keep their existing stdout lines unchanged
- [x] `node --test tools/update-adopters.test.mjs` passes; `node --check` clean on both updater files

## 🧩 Subtasks

- [x] Switch line 504 (`bump failed`) from `console.log` to `console.error`
- [x] Switch line 554 (`check failed`) from `console.log` to `console.error`
- [x] Add `if (counts.failed > 0) process.exitCode = 1;` immediately after `reportSummary(counts, args.apply)`
- [x] Document the exit-code contract in the script's header usage block
- [x] Run the updater suite + syntax checks

## 🔗 Related

- [[CORE-EPIC-424]] — parent epic: fleet-updater failure signals
- [[CORE-424.4]] — sibling; will assert the exit code this task introduces via a mid-fleet failure fixture
- [[CORE-322]] — established the file's error shape (`console.error` + `process.exit()`)
- [[CORE-419.4]] — reused that same shape for `--root` validation; confirms it as the house convention

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two `✗` lines and the exit-0-on-failure behavior are still exactly as the audit-repo finding described; nothing has moved since CORE-EPIC-424 was filed today.

- [x] Read relevant source files — `tools/update-adopters.mjs` (`reportResult` 484-510, `reportSummary` 513-521, `main` 523-567, CLI entrypoint 569-577), `tools/update-adopters.test.mjs` (runCli harness 37-48, CLI assertions 361-435)

- [x] **Best Practices Review** — the change touches one responsibility (operator-facing failure reporting) across two existing call sites plus one new line in `main`. No new abstraction warranted: three call sites of a one-line pattern, and SPEC.md §"PR / suggestion archetypes flowtron does not accept" explicitly rejects abstractions without two-project precedent. No deferred cleanup.

- [x] **Archive skim** — 43 archived tasknotes touch `update-adopters`. Load-bearing hits:
  - **CORE-322** — the file's error convention is `console.error()` + `process.exit()`; new guards should match rather than invent a second shape.
  - **CORE-419.4** — reaffirmed the same shape for `parseArgs`'s `--root` validation. Confirms `console.error` is the right sink for failure text.
  - **CORE-360** — built the importable-module seam (`main()` guarded by the `import.meta.url` entrypoint check) and recorded the constraint that "CLI flags, exit codes, and report strings stay behavior-identical for operators." That constraint is what this task deliberately amends — for the failure path only; success paths stay byte-identical.
  - **CORE-366** — precedent for distinguishing genuine failure from an expected non-zero git exit; unrelated to this change but confirms failure signalling in this file is a recurring theme.

- [x] **Drift check** — cited surfaces verified against current code: `reportSummary` defined at `tools/update-adopters.mjs:513`, called at `:566`; the two `✗` lines at `:504` (bump failed) and `:554` (check failed), both currently `console.log`. `counts.failed` is incremented at both sites. No SPEC contract conflict: `SPEC.md` §"What flowtron does NOT provide" carves this script out explicitly, and no SPEC or doc surface states the tool's exit-code behavior (grepped `README.md`, `docs/`, `SPEC.md`, `SPEC/`, `claude/`, `codex/` — only descriptive mentions, none exit-code-bearing). PLAN.md line matches the plan formed here.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - **`process.exitCode` over `process.exit(1)`** — the PLAN line names `process.exitCode` directly, and it is the correct choice here: `main()` returns immediately after `reportSummary`, so the process ends naturally with the code set, without truncating buffered stdout. `process.exit()` remains right for the pre-flight guards (Node-version, arg parsing, no-release-tag) that must abort before any work.
  - **`main` is not exported** (`export { FLOWTRON_REPO, SUBMODULE_PATH }` at :579 plus per-function exports; `main` is absent), so setting `process.exitCode` inside it cannot leak into a test process that imports helpers.
  - **No test currently asserts a `✗` line on stdout** — the CLI assertions match `✓`/`⚠`/`⬆`/`⏭`/`Summary:` only, and `runCli` captures both streams. Moving `✗` to stderr breaks nothing; the sibling CORE-424.4 adds the failure-path coverage.
  - **Header-comment documentation is in scope** — the exit-code contract is new operator-facing behavior and the file's header already documents its gates and rollback semantics. No external doc claims exit-0-always, so nothing else needs amending.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The failure path today is fully silent to automation: a failed check or a failed bump prints to stdout with the same weight as a success line, and the process exits 0 regardless. An operator piping the run into anything — a wrapper script, a CI-ish loop, `&&` chaining — sees success. This closes both halves of that (exit status + stream separation) with three one-line edits; the sibling `.4` adds the regression fixture that pins the behavior.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the file's established failure shape is `console.error` (CORE-322, CORE-419.4); both `✗` sites now match it rather than inventing a second reporting channel. The exit-status line uses `process.exitCode` instead of the pre-flight guards' `process.exit()` because `main()` must return normally so the summary flushes — a deliberate, commented divergence, not a parallel pattern. No new abstraction over three one-line sites.

- [x] **Minimal refactor gate** — no refactor. Three edits at existing call sites plus one new statement; `reportSummary` keeps its single presentation responsibility and the exit-status decision stays in `main`, which already owns the run's lifecycle.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — **deferred by design**: the mid-fleet failure fixture asserting exit 1 + summary counts is sibling [[CORE-424.4]]'s stated deliverable. Adding it here would duplicate that task. Behavior verified manually below instead.

**Implementation Notes:**

`tools/update-adopters.mjs`, +12/−2 across three sites:

- `:507` (`reportResult`, bump-failure branch) — `console.log` → `console.error`
- `:557` (`main`'s per-adopter catch, check-failure branch) — `console.log` → `console.error`
- `:573` — `if (counts.failed > 0) process.exitCode = 1;` after `reportSummary(counts, args.apply)`, with a 3-line comment recording why `exitCode` rather than `exit()`
- Header usage block — a 5-line `Exit codes:` paragraph documenting 0 / 1 / 2 and stating that skips and drift are reported outcomes, not failures

The tool's success surface is untouched: every `✓`/`⚠`/`⬆`/`⏭` line and the `Summary:` line still go to stdout with identical text.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **30 pass, 0 fail** (21.3s)

- [x] Ran lint/type-check on changed code — `node --check` clean on both `tools/update-adopters.mjs` and `tools/update-adopters.test.mjs` (the repo's declared check for this file per `.flowtron/tasknote/README.md` §"Project quick commands"; the `viz` npm lint/typecheck scripts don't cover `tools/`)

- [x] **Quality assertions** — no duplication introduced (the two `✗` edits are one-token changes at pre-existing sites), no dead code, no public-surface growth (`main` remains unexported), and the header comment was updated in the same change so the file's own documentation doesn't go stale.

- [x] (frontend) N/A — no frontend surface touched

**Testing Notes:**

Behavior verified directly against the CLI on two throwaway `--root` fixtures under the session scratchpad (never `~/code`):

1. **Failure path** — a fixture adopter whose parent dir is not a git repo, forcing `checkAdopter` to throw: `EXIT=1`, the `✗ broken: check failed — …` line on **stderr**, `Summary: … 1 failed` still on stdout. Both halves of the task confirmed in one run.
2. **Success path** — a fixture that resolves to a gated skip: `EXIT=0`, summary on stdout, stderr empty. No regression to the clean-run exit status.

The failure fixture's stderr also carried git's usage dump — that is the pre-existing CORE-366 non-1-exit-code path surfacing on an artificial non-git fixture, not a regression from this change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries: **no change**. Verified by grepping the doc set for `update-adopters`: only three descriptive mentions exist (`README.md:262` tools/ one-liner, `SPEC.md:58` + `:890` carve-out, `docs/MIGRATION.md:483` fleet-sweep pointer, `docs/CONVENTIONS.md:90` release-gate reference) and none asserts exit-code or stream behavior, so none is falsified. The tool's own header block was the only doc surface carrying this contract, and it was updated in the same diff.

- [x] Closed — all 5 Acceptance criteria ticked, YAML `status: completed`, PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-424` parent, tasknote archived to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Made a failed fleet bump visible to anything that isn't a human reading scrollback: `tools/update-adopters.mjs` now exits 1 when any adopter fails, and both `✗` lines go to stderr instead of stdout. Previously a failed check or bump printed with the same weight as a success and the process exited 0 regardless, so a wrapper script or `&&` chain read the whole sweep as clean.

**Changed:** `tools/update-adopters.mjs` (+12/−2) — two `console.log` → `console.error` swaps at the existing `✗` sites, one `process.exitCode = 1` guard after `reportSummary`, and a 5-line `Exit codes:` paragraph in the header usage block.

**Verified:** `node --test tools/update-adopters.test.mjs` → 30 pass / 0 fail; `node --check` clean on both updater files; plus a direct two-fixture CLI check confirming `EXIT=1` + stderr routing on a failing adopter and `EXIT=0` on a clean run.

**Refactors:** none made, none deferred. `process.exitCode` over the file's usual `process.exit()` is a deliberate, commented divergence (the summary must flush first), and `main` stays unexported so the assignment can't leak into a test process.

**Documentation:** the tool's header block gained the exit-code contract; all 14 AI-referenced docs verdicted "no change" (no doc asserted the old behavior).

**Maintainability:** the sweep is now automatable — the exit status carries the failure signal a wrapper needs, and stdout stays parseable as the report while stderr carries the exceptions. Test coverage for that guarantee lands with [[CORE-424.4]].

**Archived:** 2026-08-09
