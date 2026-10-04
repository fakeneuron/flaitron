---
title: updater-test-cleanup-race
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-EPIC-651, CORE-651.2]
touches:
  - tools/update-adopters.test.mjs
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-651.3 | updater-test-cleanup-race

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-651]]

## 🎯 Goal

Stop `tools/update-adopters.test.mjs`'s temp-root cleanup (`rm(..., {recursive:true})`) from intermittently failing with `ENOTEMPTY` on `.git/objects` when it races git's post-checkout object writes on macOS.

## ✅ Acceptance

- [x] Every temp-root cleanup site retries transient removal errors instead of failing once — `grep -c 'await rmTree(' tools/update-adopters.test.mjs` matches the prior bare-`rm` cleanup-site count, and `grep -n 'recursive: true, force: true' tools/update-adopters.test.mjs` shows only the `rmTree` definition itself
- [x] `node --check tools/update-adopters.test.mjs` — exit 0
- [x] Five consecutive local `node --test tools/update-adopters.test.mjs` runs each pass 54/54 — `judgment`, no single command decides five runs; each run's tail recorded in Testing Notes

## 🧩 Subtasks

- [ ] Add a local `rmTree(path)` helper next to `gitQuiet` wrapping `rm(path, { recursive: true, force: true, maxRetries, retryDelay })`
- [ ] Replace all 24 `rm(X, { recursive: true, force: true })` cleanup call sites with `rmTree(X)`
- [ ] `node --check` the test file
- [ ] Run `node --test tools/update-adopters.test.mjs` five consecutive times, confirm 54/54 each run

## 🔗 Related

- [[CORE-EPIC-651]] — parent epic (gate-reliability)
- [[CORE-651.2]] — sibling child, landed first (Pair Q out-of-repo skip)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Baseline `node --test tools/update-adopters.test.mjs` passes 54/54 on this run (the race is intermittent, matching the PLAN line's framing), and all 24 cleanup sites share the exact same `rm(X, { recursive: true, force: true })` shape with no `maxRetries`/`retryDelay` — the described gap is real and unfixed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Source: `tools/update-adopters.test.mjs`. No sibling `CORE-651.1` file exists (this epic has no Discovery/Audit bracket — implementation children only, per `SPEC/epic.md` "simpler implementations don't need it"), so no `## 🌳 Fan-out` claim to echo.
- All 24 cleanup sites use the identical shape `await rm(X, { recursive: true, force: true })` — no existing `maxRetries`/`retryDelay`, confirmed via `grep -n "rm("`. Three of the 24 (L304, L394, L453) remove a live `.git` dir mid-test to simulate corruption rather than end-of-test cleanup, but share the same shape and the same race exposure, so the fix applies uniformly.
- `tools/update-adopters.mjs` (production source) has no `rm(...)` calls at all — the race is confined to the test file, no shared helper to extend there.
- Test-side git spawning goes through a local `gitQuiet(cwd, ...args)` helper (L54) plus a few direct `execFileAsync('git', [...])` clone calls — the PLAN line's alternative fix (`-c gc.auto=0`) would touch this surface instead; not applying it (see clarifications below).
- **Best practices:** one small local helper (`rmTree`), colocated with the existing `gitQuiet` local helper — same file, same "local test utility" responsibility class, no new module boundary. No refactor beyond the mechanical call-site swap.
- **Archive skim:** `grep -l "update-adopters.test.mjs" archive/core/*.md` returns 100+ hits — noise, since nearly every past task on this file logs "ran the test suite" in its own Testing Notes, not because it touched cleanup logic. Read the one directly relevant note instead: [[CORE-651.2]] (immediate sibling, same epic, landed today) — it touched CI/docs, not `tools/`, so no direct precedent for this fix, but confirms the epic's Discovery-supplied framing (from `audit-repo 2026-09-21`) and its `--fast`/no-clarification convention. No prior tasknote touched cleanup-race handling in this file.
- **Drift check:** PLAN.md line's file path, symptom (`ENOTEMPTY` on `.git/objects`), and fix shape (`maxRetries`/`retryDelay` and/or `-c gc.auto=0`) all match current code — no drift. No SPEC contract governs this file's internals.
- No clarifications needed (--fast). Assumptions: (1) implement the `maxRetries`/`retryDelay` half of the PLAN line's "and/or" — it directly targets the described `ENOTEMPTY` race via Node's own built-in retry-on-transient-error mechanism (`fs.rm` retries `EBUSY`/`ENOTEMPTY`/etc. when `maxRetries > 0`), and is a smaller, single-file diff than also threading `-c gc.auto=0` through every test-side git invocation; (2) `maxRetries: 10`, `retryDelay: 100` (Node's own default delay) — bounded, generous enough for a background git write to finish, cheap when no race occurs (zero retries taken); (3) the acceptance bar ("five consecutive local runs pass 54/54") is checked by literally running the suite five times in a row on this machine, since the race is real but rare and no single run proves the fix.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Added `rmTree(path)` next to the existing `gitQuiet` local helper (same "local test utility" class, no new module) wrapping `rm(path, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 })` — Node's own `fs.rm` retries `ENOTEMPTY`/`EBUSY`/etc. transient errors when `maxRetries > 0`, which directly covers the described race.
- Replaced all 24 `rm(X, { recursive: true, force: true })` cleanup call sites with `rmTree(X)` via a scripted, pattern-anchored substitution (verified count: 24 in, 24 out, only the `rmTree` definition itself still calls bare `rm`).
- No test behavior changed — same cleanup target paths, same options plus retry knobs; nothing new to test (the fix *is* the change under test, verified by repeated suite runs in Phase 3).
- Did not add `-c gc.auto=0` to the test-side `gitQuiet`/clone calls (the PLAN line's alternative) — the `maxRetries`/`retryDelay` fix is smaller (one helper + call-site swap, no touch to every git invocation) and targets the exact reported symptom (`ENOTEMPTY` on cleanup) rather than a suspected upstream cause.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A, no frontend surface (suppressed under `--fast` regardless)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -c 'await rmTree(' tools/update-adopters.test.mjs` → 24; `grep -n 'recursive: true, force: true' tools/update-adopters.test.mjs` → only the `rmTree` definition (L65) — 0
- `node --check tools/update-adopters.test.mjs` → 0
- `node --test tools/update-adopters.test.mjs` × 5 consecutive local runs → 54/54 pass, 0 fail, every run (durations ~18-29s each; no `ENOTEMPTY` or any other failure surfaced)
- Structural quality: one small local helper (`rmTree`) colocated with the existing `gitQuiet` helper; 24 identical mechanical call-site swaps, no duplication introduced (the duplication that existed — 24 copies of the same options object — is what this removes), no dead code, no public-surface growth (helper is file-local, unexported), no stale docs (no doc referenced the old `rm(...)` shape).
- `git diff --name-only` → `tools/update-adopters.test.mjs` only, matching declared `touches:`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- Doc-drift sweep: all "AI-referenced docs" entries — no change (internal test-utility fix, no doc-visible surface; `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`).
- Changed: `tools/update-adopters.test.mjs` (+34/−24) — added a local `rmTree(path)` helper (`rm` with `maxRetries: 10`, `retryDelay: 100`) next to the existing `gitQuiet` helper, and swapped all 24 `rm(X, { recursive: true, force: true })` cleanup call sites to `rmTree(X)`.
- Verification: `node --check` → 0; five consecutive `node --test tools/update-adopters.test.mjs` runs → 54/54 pass every time, 0 fail.
- Refactors: none beyond the mechanical helper extraction (removed 24x duplicated options object); deferred nothing. Considered but did not apply the PLAN line's alternative (`-c gc.auto=0` on test-side git spawns) — the smaller, more directly targeted fix sufficed.
- `touches:` reconciliation: declared `tools/update-adopters.test.mjs`; `git diff --name-only` matches exactly.
- Maintainability effect: local test runs no longer intermittently fail on a transient macOS filesystem race during cleanup — removes a source of false-red CI-adjacent signal and repeated re-runs; the fix is confined to test infrastructure, no production code touched.

**Archived:** 2026-09-21
