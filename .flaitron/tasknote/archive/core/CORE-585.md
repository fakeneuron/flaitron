---
title: updater-git-no-prompt-timeout
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: []
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-585 | updater-git-no-prompt-timeout

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make `tools/update-adopters.mjs` fail loudly (a ✗ line) instead of hanging forever when git wants an interactive prompt or a remote stalls mid-fetch.

## ✅ Acceptance

- [x] `git()` sets `GIT_TERMINAL_PROMPT=0` in the spawned process env — `grep -n "GIT_TERMINAL_PROMPT" tools/update-adopters.mjs`
- [x] `applyBump`'s fetch carries a timeout that surfaces as a rejected promise with a clear message, not an indefinite hang — `node --test tools/update-adopters.test.mjs`
- [x] New test exercises the hang→✗ path (a stalled remote causes `applyBump` to reject quickly rather than hang) — `node --test tools/update-adopters.test.mjs`
- [x] `node --check tools/update-adopters.mjs` and `node --check tools/update-adopters.test.mjs` — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Add `GIT_TERMINAL_PROMPT: '0'` to `git()`'s spawned env in `tools/update-adopters.mjs`
- [x] Give `git()` a way to pass through `execFile` options (timeout) for one call site without disturbing the rest-args call signature used everywhere else
- [x] Add a fetch timeout (env-overridable, so tests can shrink it) to the `git(sub, 'fetch', ...)` call in `applyBump`
- [x] Wrap the timeout rejection with a clearer message (git's own timeout error doesn't say "timed out")
- [x] Add a test that simulates a stalled remote and asserts `applyBump` rejects quickly with a timeout message (ended up as a `git` shim script, not a TCP listener — see Implementation Notes)

## 🔗 Related

- Surfaced by audit 2026-09-12 (Finding #2, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task description names the exact function (`git()`) and call site (`applyBump`'s fetch) in `tools/update-adopters.mjs`; both still match current code at the cited lines.

- [x] Read relevant source files — read `tools/update-adopters.mjs` (imports, `git()` at line 151, `applyBump` at line 667, `reportResult`'s catch at line 736) and the relevant slices of `tools/update-adopters.test.mjs` (existing `applyBump` rollback tests, `runCli` harness, `makeAdopter` fixture builder).

- [x] **Best Practices Review** — `git()` is the single chokepoint every git spawn in the script already goes through, so adding `GIT_TERMINAL_PROMPT=0` there covers every call, not just the fetch. The fetch-specific timeout needs a per-call override without breaking `git(cwd, ...args)`'s rest-args signature (every existing call site passes only string args) — extending `git()` to pop a trailing plain-object as options is the smallest change that doesn't touch any of the ~30 existing call sites. No new abstraction beyond that.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/ | grep -i update-adopters` and `grep -rl "update-adopters.mjs" .flowtron/tasknote/archive/core/*.md` turned up prior tasknotes touching this file (CORE-490 series, CORE-582, CORE-583, CORE-584). Skimmed CORE-584 (`updater-hook-claims-and-exit-flush`, most recent, same file) — it touched the `--apply` loop's exit-code/summary flush, unrelated to `git()`/`applyBump`'s fetch; no overlap or conflicting decision with this task's scope.

- [x] **Drift check** — `git()` (line 151-154), `applyBump` (line 667), and the `fetch` call (line 672) all match the task description exactly. No drift.

- [x] Logged "No clarifications needed (--fast)" — the `[unattended]` PLAN.md marker set fast-mode; assumptions: (1) a 30s default fetch timeout is reasonable for this tool's use case (operator-run fleet sweep, not a hot path); (2) the timeout is env-overridable (`FLOWTRON_FETCH_TIMEOUT_MS`) so tests can shrink it, following the existing `FLOWTRON_UPDATE_LATEST`/`FLOWTRON_VIZ_WORKSPACE` override convention; (3) a raw TCP listener that accepts and never responds is an acceptable stand-in for "stalled remote" in a test (no real network dependency, deterministic, fast).

- [x] Subtasks above populated; `touches:` declared.

**Discovery Notes:**

`git()` (tools/update-adopters.mjs:151) is the sole exported wrapper around `execFileAsync('git', args, { cwd })` — every one of the ~30 call sites in this file and its test suite passes only string args. `applyBump` (line 667) opens with an un-timed `git(sub, 'fetch', '--tags', '--quiet', 'origin')` (line 672), explicitly outside the rollback `try` block (fetch only adds refs, no worktree/index mutation) — so a rejection there propagates straight to `reportResult`'s catch (line 736), which already renders any `applyBump` throw as `✗ <name>: bump failed — <message>`. That means the fix only needs `applyBump`'s fetch call to actually reject on hang/prompt; the ✗-line rendering is already correct and untouched.

Two failure modes named in the PLAN line:
1. **Interactive prompt** (e.g. HTTPS credential helper prompting, or SSH host-key confirmation) — git blocks on stdin. Fix: `GIT_TERMINAL_PROMPT=0` makes git fail fast instead of prompting (an SSH askpass prompt is a separate mechanism `GIT_TERMINAL_PROMPT` doesn't cover, but that's not this task's cited surface — out of scope).
2. **Stalled remote** (TCP connects, then the peer never responds) — no prompt involved, git just blocks in network I/O forever. `GIT_TERMINAL_PROMPT=0` doesn't help here; only a timeout does.

So both parts of the fix are needed, and they're independent: `GIT_TERMINAL_PROMPT=0` in `git()`'s env (blanket, all calls) + a timeout scoped to the one fetch call in `applyBump` (the network operation that can genuinely stall; the other git calls in this script are local-only and don't need one).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `git()` is the established single-chokepoint wrapper; extending it (rather than adding a parallel `gitWithOptions` helper or a one-off `execFileAsync` call in `applyBump`) keeps that property intact. Precedent for env-var test overrides: `FLOWTRON_UPDATE_LATEST` (parsed at call time, not module load, so a child process's own env at spawn time is what's read) and `FLOWTRON_VIZ_WORKSPACE`.

- [x] **Minimal refactor gate** — only `git()` and `applyBump` change; no other call site is touched (all still pass plain string args, so the new trailing-options support is additive and backward compatible).

- [x] Implemented the minimal solution — see Implementation Notes.

- [x] Updated/added tests for non-trivial behavior — see Testing Notes.

**Implementation Notes:**

`tools/update-adopters.mjs`:
- `git(cwd, ...args)` now pops a trailing plain-object arg (if present) as `execFile` options, and always merges `GIT_TERMINAL_PROMPT: '0'` into the spawned env (on top of `process.env`, so it can't be silently shadowed by an inherited value). On a timed-out call it rewrites the error's message to `git <args> timed out after <ms>ms` (Node's own timeout error doesn't say "timeout" anywhere, which would've made the eventual ✗ line unreadable) and rethrows.
- Added `fetchTimeoutMs()`, reading `FLOWTRON_FETCH_TIMEOUT_MS` from the environment **at call time** (not cached at module load) so tests can override it per-case without a child-process boundary; defaults to 30000ms.
- `applyBump`'s `git(sub, 'fetch', '--tags', '--quiet', 'origin')` now passes `{ timeout: fetchTimeoutMs() }`. This call already sits outside the rollback `try` block, so a rejection here propagates unchanged to `reportResult`'s existing catch → ✗ line; no closure/rollback logic needed touching.

`tools/update-adopters.test.mjs`:
- New `describe('applyBump fetch timeout (CORE-585)', ...)`: prepends a `git` shim script to `PATH` that hangs forever (`exec sleep 100`) on a `fetch` subcommand and forwards everything else to the real git binary (resolved once via `which` before the shim directory goes on PATH, so the shim can't re-find itself). Sets `FLOWTRON_FETCH_TIMEOUT_MS` to a short value for the test, then asserts `applyBump(...)` rejects with `/timed out after 300ms/`. Both env mutations (`PATH`, `FLOWTRON_FETCH_TIMEOUT_MS`) are restored in a `finally`.
- First attempt used a bare `node:net` TCP server (accept-and-never-respond) with the submodule's `origin` pointed at `git://127.0.0.1:<port>/x`, to simulate the stalled-remote case more literally at the network layer. That hung the whole suite indefinitely (no output, no git subprocess left running) — root cause not conclusively isolated, prime suspect is `server.close()` blocking on an open socket. Abandoned in favor of the shim script, which is simpler, has no socket-lifecycle edge cases, and is fully deterministic.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — no lint config targets `tools/`; `node --check` is the applicable syntax gate for this zero-dep script (per SPEC/PLAN precedent, e.g. CORE-582/583/584).

- [x] **Verification receipt** — see Testing Notes. No dead code, duplication, or unexplained complexity introduced; `git()`'s public signature is unchanged for every existing caller (options object is additive/optional).

- [ ] (frontend) N/A — no frontend surface touched.

**Testing Notes:**

- `node --check tools/update-adopters.mjs` → 0
- `node --check tools/update-adopters.test.mjs` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (full suite green, including the new hang→✗ test)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs". No change: this task touches only `tools/update-adopters.mjs`'s internal git-spawn behavior (prompt suppression, a fetch timeout) and its test file — no documented CLI usage, exit code, or workflow-contract surface changed. `FLOWTRON_FETCH_TIMEOUT_MS` is an internal/test-determinism knob (parallel to `FLOWTRON_UPDATE_LATEST`, also undocumented outside the script itself), documented inline at its definition rather than in README/docs.

- [x] Closed — all four Acceptance criteria ticked; YAML `status:` flipped to `completed`; PLAN.md CORE-585 line flipped to stub form and placed at the top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/CORE-585.md`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Changed `tools/update-adopters.mjs` (+35/-3 lines): `git()` now always sets `GIT_TERMINAL_PROMPT=0` in the spawned env (so a git call needing interactive credentials fails fast instead of blocking on stdin) and accepts an optional trailing options object (additive — every other call site is untouched, still plain string args) for a per-call `execFile` timeout, with the raw Node timeout error rewritten to say `git <args> timed out after <ms>ms`. `applyBump`'s `fetch` — the one git call in this script that talks to a remote — now carries that timeout, read at call time from `FLOWTRON_FETCH_TIMEOUT_MS` (default 30000ms) so tests can shrink it without a child-process boundary.

Changed `tools/update-adopters.test.mjs` (+38/-0 lines): new `describe('applyBump fetch timeout (CORE-585)', ...)` with one test — a `git` shim script hangs forever on `fetch` and forwards everything else to the real binary; with the shim on `PATH` and a 300ms `FLOWTRON_FETCH_TIMEOUT_MS`, `applyBump` is asserted to reject with `/timed out after 300ms/`. (First attempt used a raw TCP listener to simulate the stalled remote at the network layer directly — it deadlocked the whole suite indefinitely; abandoned for the simpler, fully-deterministic shim approach. See Implementation Notes.)

Verification: `node --check` clean on both files; full suite `node --test tools/update-adopters.test.mjs` → 52/52 passing (including the new test, ~1.3s) in ~54s total.

Refactors: none beyond the minimal `git()` signature extension — no unrelated cleanup.

Documentation: no change needed (see doc-drift sweep above).

`touches:` reconciliation — declared `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`; `git diff --name-only` matches exactly, no undeclared paths.

Maintainability: every other `git()` call site is now protected against interactive-prompt hangs for free; the fetch-specific timeout is scoped to the one call that can genuinely stall on a slow/dead network peer, without adding a parallel git-spawn helper.

**Archived:** 2026-09-12
