---
title: updater-hook-claims-and-exit-flush
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: []
touches:
  - tools/update-adopters.mjs
  - SECURITY.md
---

# CORE-584 | updater-hook-claims-and-exit-flush

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Reword the fleet updater's `--no-verify` documentation to state precisely which
hooks it skips (`pre-commit`/`commit-msg` only — `prepare-commit-msg`/`post-commit`
still run), and replace `discoverAdopters`'s `process.exit(1)` with
`process.exitCode = 1; return` so pending output flushes before exit.

## ✅ Acceptance

- [x] `tools/update-adopters.mjs` header comment (lines ~76-81) and inline comment
      (~line 692) no longer imply `--no-verify` suppresses all adopter hooks —
      `judgment` (prose-only change, no test asserts comment wording) — reworded,
      both now name `prepare-commit-msg`/`post-commit` as still running
- [x] `SECURITY.md` §"Fleet updater" `--no-verify` bullet states the same —
      `judgment` (prose-only change) — reworded to match
- [x] `discoverAdopters` catch-site `process.exit(1)` (main(), ~line 792) replaced
      with `process.exitCode = 1; return;` — `grep -A1 "process.exitCode = 1;" tools/update-adopters.mjs | grep -q return` → 0
- [x] No behavior change — `node --check tools/update-adopters.mjs && node --test tools/update-adopters.test.mjs` → 0 (51/51 pass)

## 🧩 Subtasks

- [x] Reword `tools/update-adopters.mjs` header comment (~L76-81) and inline
      comment (~L692) to state `--no-verify` skips only `pre-commit`/`commit-msg`
      hooks, not `prepare-commit-msg`/`post-commit`
- [x] Reword `SECURITY.md` §"Fleet updater" `--no-verify` bullet (~L196-198) to match
- [x] Replace `process.exit(1)` in the `discoverAdopters` catch block (main(), ~L792)
      with `process.exitCode = 1; return;`
- [x] Run `node --check` + the fleet-updater test suite

## 🔗 Related

—

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both edit sites confirmed live in `tools/update-adopters.mjs`
  (header comment lines 76-81, inline comment at 692, `discoverAdopters` catch
  block at ~789-792) and `SECURITY.md` (`--no-verify` bullet at 196-198). Matches
  the PLAN.md description; option (a) wording fix + exit-flush, no behavior change.

- [x] Read relevant source files — `tools/update-adopters.mjs` (header comment,
  the `applyBump` `--no-verify` commit + its comment, `discoverAdopters`,
  `main()`'s discovery try/catch and its exit-status handling) and
  `SECURITY.md` §"Fleet updater" `--no-verify` bullet

- [x] **Best Practices Review** — N/A: pure comment/doc reword plus a single
  exit-mechanism swap already used elsewhere in the same file (`counts.failed`
  branch at ~L822 sets `process.exitCode` instead of calling `exit()` for the
  same flush reason); no new abstraction, no module-boundary change

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/` then
  `grep -l "update-adopters" .flowtron/tasknote/archive/core/*.md`: hits include
  CORE-490 (perf caching), CORE-493 (cache warmth), CORE-432 (semver validation)
  — none touch the `--no-verify` comment wording or the `discoverAdopters` exit
  path. No load-bearing prior decision found for this specific wording/exit-code
  choice.

- [x] **Drift check** — PLAN.md line's cited symbols (`discoverAdopters`,
  `process.exit(1)`, `SECURITY.md` §"Fleet updater") all match current code at
  the line numbers found above; no contradiction with SPEC.md.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No
  clarifications needed. Option (a) is explicit in the PLAN.md line: reword
  only, no behavior change to the `--no-verify` commit itself.

- [x] Subtasks above populated with concrete, ordered steps; `touches:` declared

**Discovery Notes:**

- `tools/update-adopters.mjs:76-81` (header) and `:692` (inline, right above the
  `--no-verify` commit call) both phrase the rationale in a way that reads as
  "no adopter hook runs" — accurate for the two hooks git's `--no-verify` flag
  actually skips (`pre-commit`, `commit-msg`) but doesn't say so explicitly, and
  could be misread as skipping every hook type. `prepare-commit-msg` and
  `post-commit` are not gated by `--no-verify` and still fire.
- `SECURITY.md:196-198` bullet has the same gap: "an adopter's own
  `pre-commit`/`commit-msg` hooks ... never run" is true but stops short of
  naming the two hook types that *do* still run, which is the audit's ask.
- `discoverAdopters`'s only caller-side failure handling is the try/catch in
  `main()` at ~L787-792; today it calls `process.exit(1)` directly inside the
  catch, before any of the sweep's own stdout is written — but the later
  `counts.failed` path uses `process.exitCode = 1` (no `return`, falls through
  to natural completion) specifically so buffered output flushes; the
  `discoverAdopters` site should match that pattern for consistency, per the
  task's "exit-flush" framing. Using `process.exitCode = 1; return;` inside
  `main()` lets node's normal event-loop drain flush stdout/stderr before exit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the file's own established `process.exitCode`
  + `return` pattern already used at the `counts.failed` branch; no new pattern
  introduced

- [x] **Minimal refactor gate** — N/A, no refactor: wording + one exit-mechanism
  swap only, scoped exactly to Acceptance

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no behavior change
  (exit code and exit timing semantics preserved — `exitCode` still ends the
  process with status 1); existing suite covers `discoverAdopters` return-value
  paths, not process-exit mechanics, so no test gap opened

**Implementation Notes:**

- `tools/update-adopters.mjs:76-81` header comment reworded to name
  `pre-commit`/`commit-msg` as the specific hooks skipped and state that
  `prepare-commit-msg`/`post-commit` still run.
- `tools/update-adopters.mjs:692-693` inline comment reworded to match.
- `SECURITY.md:196-198` `--no-verify` bullet reworded to state the same.
- `tools/update-adopters.mjs:792` (`discoverAdopters` catch block in `main()`):
  `process.exit(1)` → `process.exitCode = 1; return;`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (51 pass, 0 fail)

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` (exit 0)

- [x] **Verification receipt** — recorded below; no duplication, dead code, or
  stale doc left by this change (it removes a wording gap, doesn't add one)

- [ ] (frontend) Asked the user for visual confirmation — N/A, no frontend change

**Testing Notes:**

- `node --check tools/update-adopters.mjs` → 0
- `node --check tools/update-adopters.test.mjs` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (51 pass, 0 fail)
- `grep -A1 "process.exitCode = 1;" tools/update-adopters.mjs | grep -q return` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced
  docs": `SECURITY.md` is the deliverable itself (updated above); no other listed
  doc references the `--no-verify` hook claim or the `discoverAdopters` exit
  mechanics — no change to any other entry.

- [x] Closed — every Acceptance criterion ticked with evidence above; YAML
  `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and
  tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Reworded the `--no-verify` rationale in three places — `tools/update-adopters.mjs`
header comment (L76-81), its inline comment above the bump commit (L692-693), and
`SECURITY.md` §"Fleet updater" (L195-198) — to state explicitly that `--no-verify`
skips only `pre-commit`/`commit-msg`, and that `prepare-commit-msg`/`post-commit`
still run. Replaced `process.exit(1)` with `process.exitCode = 1; return;` in the
`discoverAdopters` catch block of `main()` (L792-793) so pending stdout/stderr
flushes before exit, matching the pattern already used at the `counts.failed`
branch later in the same function. Pure wording + exit-mechanism change, no
behavior change: `node --check` and the full `tools/update-adopters.test.mjs`
suite (51 tests) both pass. `touches:` reconciliation — `git diff --name-only`:
`tools/update-adopters.mjs`, `SECURITY.md`, both declared.

**Archived:** 2026-09-12
