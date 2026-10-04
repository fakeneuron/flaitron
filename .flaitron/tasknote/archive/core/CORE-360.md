---
title: update-adopters-tests
status: completed
tags: []
created: 2026-07-16
due:
related-tasks: [CORE-312, CORE-351.3, CORE-345]
---

# CORE-360 | update-adopters-tests

[← PLAN.md](../../PLAN.md) · ✅ Completed · 🔗 [[CORE-312]] [[CORE-351.3]] [[CORE-345]]

## 🎯 Goal

Add automated tests for `tools/update-adopters.mjs` covering dry-run, skip gates, gitlink-drift classification, and a sandboxed `--apply` path if cheap.

## ✅ Acceptance

- [x] Automated tests cover dry-run classification: `current`, `drift`, `skip` (migration-bearing / staged / dirty submodule), and `would bump` paths
- [x] Gitlink-drift detection is asserted (worktree SPEC at latest + committed pin older → `drift`, not `current`)
- [x] Sandboxed `--apply` path exercised if fixture cost stays low; otherwise documented skip with rationale
- [x] Tests run via zero-dep `node --test` (no new package manager surface for `tools/`)
- [x] `node --check tools/update-adopters.mjs` still passes; suite is green

## 🧩 Subtasks

- [x] Pattern survey: confirm no existing tools test harness; choose `node:test` + fixture builders
- [x] Minimal production change: export testable helpers + guard `main()` so the CLI still runs only when executed as entrypoint
- [x] Add `tools/update-adopters.test.mjs` with temp-workspace fixtures (adopters under `--root`)
- [x] Cases: current, drift, skip gates, dry-run would-bump; sandboxed apply if cheap
- [x] Run `node --test tools/update-adopters.test.mjs` + `node --check`

## 🔗 Related

- [[CORE-312]] — introduced `tools/update-adopters.mjs`; verification was `node --check` + live dry-run only
- [[CORE-351.3]] — gitlink-drift status; explicitly noted "no unit-test suite by design"
- [[CORE-345]] — Codex wiring surfaces; ad-hoc temp module + dry-run smoke
- Surfaced by audit-repo 2026-07-16 (Theme: Fleet-tool confidence gap)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `tools/update-adopters.mjs` is the singular fleet CLI carve-out and has grown skip gates + gitlink-drift classification with no automated suite. Prior tasknotes (CORE-312, CORE-351.3) verified via `node --check` + live `~/code` dry-run; audit-repo correctly flagged the confidence gap. Scope is tests (+ minimal export/main-guard if needed), not behavior change.

- [x] Read relevant source files — full `tools/update-adopters.mjs` (~448 LOC); no root `package.json`; only `tools/` file is the script; viz uses vitest but is unrelated.

- [x] **Archive skim** — `rg -l update-adopters archive/core/` hits: CORE-312 (built tool; zero-dep Node ESM; dry-run default; skip gates; no unit suite), CORE-322 (Node ≥20 guard), CORE-320/CORE-345 (skill wiring surfaces; ad-hoc behavior checks), CORE-326 (migration sentinel interaction), CORE-351.3 (gitlink drift; load-bearing: "tool ships no unit-test suite by design"), releases that mention the tool. Load-bearing: (a) verification culture was live dry-run, not fixtures; (b) keep zero-dep; (c) never push; (d) pathspec-scoped commits only.

- [x] **Drift check** — PLAN paths/names match code: `tools/update-adopters.mjs` exists; dry-run is default (`args.apply`); skip gates for migration-bearing / staged index / dirty submodule are in `checkAdopter`; `gitlinkDrift` + `status: 'drift'` present; `--apply` → `applyBump`. No line-number claims in PLAN to drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Runner = built-in `node:test`** — no root package.json / vitest for tools; matches zero-dep CLI posture.
  2. **Minimal production refactor allowed** — export pure helpers + `checkAdopter` / discovery as needed, and guard `main()` with `import.meta.url` entrypoint check so the module is importable. CLI flags, exit codes, and report strings stay behavior-identical for operators.
  3. **Fixtures under a temp `--root`** — never touch live `~/code` adopters. FLOWTRON_REPO remains the real checkout (tags/SHAs for latest + migration content).
  4. **`--apply` if cheap** — only if a temp git superproject + real flowtron submodule pin can be constructed without network flakiness; otherwise dry-run coverage only and document.
  5. **Out of scope** — live fleet dry-run as a required gate; symlink re-wire coverage (owned by `/ft-update`); changing skip-gate policy.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Script is a single ESM file; helpers are module-private; `main()` always runs at bottom — import for unit tests needs an entrypoint guard.
- Classification surface under test: `current` | `drift` | `skip` (unreadable version, migration-bearing, staged, dirty sub) | `bump` (dry-run → planned line; apply → commit).
- `FLOWTRON_REPO` is resolved from `import.meta.url` → always the real flowtron tree when tests live beside the script; good for real tag/migration data, means fixtures only need fake *adopters*.
- No prior `tools/*.test.mjs`; first harness for this area.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: no tools test harness exists (viz uses vitest; CORE-312/351.3 established `node --check` + live dry-run). New shape: zero-dep `node:test` + temp-workspace fixtures; shared local-clone mirror for speed.
- Production: exported helpers used by tests; `parseArgs` gained optional `{ exitOnError: false }` for unit tests; `main(argv?)` accepts argv; CLI entrypoint guarded via `resolve(process.argv[1]) === fileURLToPath(import.meta.url)` so imports no longer auto-run.
- Tests: `tools/update-adopters.test.mjs` — pure helpers, real-tag migrationBearingTags, checkAdopter fixture matrix (current/drift/staged/dirty/migration/bump/unreadable), discoverAdopters + legacy, dry-run multi-status CLI, sandboxed `applyBump` + CLI `--apply` with pathspec assertion.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — N/A (CLI tool, no UI)

**Testing Notes:**

- `node --check tools/update-adopters.mjs` — pass
- `node --test tools/update-adopters.test.mjs` — **21/21 pass** (~24s; clone fixtures)
- CLI smoke: `node tools/update-adopters.mjs --root /private/tmp` still dry-runs correctly after main-guard
- No frontend; visual confirmation N/A

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change (tools/ still described as fleet scripts; public CLI contract unchanged)
  - `SPEC.md` — no change (carve-out still accurate; no verification-strategy claim for tools/)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-16.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added the first automated suite for the fleet updater: 21 zero-dep `node:test` cases covering dry-run classification (current / drift / skip gates / would-bump), real-tag migration-bearing detection, multi-status CLI dry-run, and a sandboxed `--apply` path that asserts pathspec-only commits. Minimal production change: export helpers + entrypoint guard so the module is importable without running the CLI.

**Archived:** 2026-07-16
