---
title: update-adopters-gitlink-state
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-351, CORE-351.2, CORE-351.N]
---

# CORE-351.3 | update-adopters-gitlink-state

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-351]]

## 🎯 Goal

Teach `tools/update-adopters.mjs` to detect and report superproject gitlink drift — a committed submodule pin that lags the latest release even though the checked-out `.flowtron/core/SPEC.md` already reads the latest version.

## ✅ Acceptance

- [ ] `checkAdopter` no longer reports `current` when the worktree SPEC.md reads latest but the superproject's committed gitlink points at an older commit.
- [ ] A new `drift` status is reported (in both dry-run and `--apply`) naming the stale committed pin vs the latest release, and pointing at the fix (`/ft-update` / commit the gitlink).
- [ ] The clean happy path (committed gitlink == latest release commit) is unaffected — still reports `current`.
- [ ] `node --check tools/update-adopters.mjs` passes; dry-run against `~/code` runs clean and the drift path is exercised against a constructed drift case.

## 🧩 Subtasks

- [ ] Add a `gitlinkDrift(repo, latest)` helper: read the superproject's committed gitlink SHA (`git rev-parse HEAD:.flowtron/core`) and the latest release tag's commit SHA (from `FLOWTRON_REPO`), return a reason string on mismatch, else null.
- [ ] In `checkAdopter`, gate the `current === latest` early-return through `gitlinkDrift`; return `{status:'drift', current, reason}` on drift.
- [ ] Add a `drift` branch to `main()`'s per-adopter report + a `drifted` counter in the summary line.
- [ ] Update the header comment's safety-gate notes to mention gitlink-drift detection.
- [ ] Verify: `node --check`; dry-run against `~/code`; construct a drift case (check out latest tag in an adopter submodule without committing the pin) and confirm it reports `drift`.

## 🔗 Related

- [[CORE-EPIC-351]] — parent safety-net epic (Milestone 0)
- [[CORE-351.2]] — sibling: cleared the viz dependency advisories
- [[CORE-351.N]] — epic audit child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and matches the code: `checkAdopter` (`tools/update-adopters.mjs:282`) returns `{status:'current'}` as soon as the worktree SPEC.md version equals latest, never inspecting the superproject's committed gitlink. A submodule checked out at the latest tag but with an uncommitted pin reports "current" while a fresh clone would revert to the stale pin.

- [x] Read relevant source files — `tools/update-adopters.mjs` (full), `SPEC.md` §"What flowtron does NOT provide" carve-out.

- [x] **Archive skim** — `archive/core/` hits for `update-adopters`: CORE-312 (built the tool — established `pinnedVersion()` reads the worktree SPEC.md version line as the current-state proxy; the tool has no unit-test suite by design, verified via `node --check` + dry-run against `~/code`); CORE-320 (skill-flag precision on `newSkillsShipped`); CORE-322 (Node ≥20 guard); CORE-345 (Codex wiring surface). `gitlink` hits: CORE-312 (pathspec-scoped gitlink commit) + sibling CORE-351.2 (deps, unrelated). No prior tasknote added gitlink-drift detection. Load-bearing: (a) verification is `node --check` + dry-run, not a test file; (b) the tool is the SPEC-carved singular CLI exception — keep it zero-dep Node ESM, conservative, never auto-mutating beyond the documented apply path.

- [x] **Drift check** — confirmed against current code: `pinnedVersion` (`:132`) reads the worktree `.flowtron/core/SPEC.md` Version line; `checkAdopter` (`:277`) early-returns `current` at `:282`; `applyBump` (`:318-321`) already commits the gitlink via `git add SUBMODULE_PATH` + pathspec commit. `SUBMODULE_PATH = '.flowtron/core'` (`:43`). No drift — line refs and function names all match.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. **Detect-and-report only, no auto-fix.** The task says "detect/report"; the tool's conservative posture (dry-run default, per-repo skip gates) argues against silently committing a pin the operator may have left uncommitted deliberately. Drift is surfaced in both dry-run and `--apply`; the fix is left to the operator (`/ft-update` / manual gitlink commit).
  2. **Drift signal = committed gitlink SHA (`git rev-parse HEAD:.flowtron/core` in the superproject) ≠ latest release tag's commit SHA (`git rev-parse <latest>^{commit}` in `FLOWTRON_REPO`).** Commit SHAs are content-identical across clones, so `FLOWTRON_REPO` is the canonical source and no adopter-side fetch is required for detection.
  3. **Scope stays inside the `current === latest` branch.** The bump/skip paths are unchanged — `applyBump` already commits the gitlink there, so drift only masks in the "worktree reads latest" case.
  4. **Report names a version when the stale pin resolves to a tag** (`git tag --points-at`), else a short SHA — cheap and far more legible than a bare SHA.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The masking scenario, concretely: operator runs `git -C <adopter>/.flowtron/core checkout v5.11.0` (worktree SPEC.md now reads v5.11.0 = latest) but never runs `git add .flowtron/core && git commit` in the superproject. The committed gitlink still records the v5.10.0 commit. `pinnedVersion` reads the worktree → `current === latest` → `{status:'current'}`. A fresh clone / `git checkout` of the superproject would restore the stale v5.10.0 pin. The submodule *worktree* is clean (`git status --porcelain` in the sub is empty), so the existing dirty-worktree gate doesn't catch it — the signal lives in the superproject tree, not the submodule worktree.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the tool's existing shapes: null-tolerant `try/catch` git helpers (mirrors `pinnedVersion` / `wiredSkillKeys`) and status-object returns from `checkAdopter` (mirrors the `current` / `skip` / `bump` branches). New status `drift` slots alongside them; no new pattern invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: the tool ships no unit-test suite by design (CORE-312 established `node --check` + live dry-run as its verification). Both code branches are exercised by the dry-run against the live `~/code` fleet (see Testing Notes).

**Implementation Notes:**

- Added `gitlinkDrift(repo, latest)`: reads the superproject's committed gitlink SHA (`git rev-parse HEAD:.flowtron/core`) and the latest release tag's commit SHA (`git rev-parse <latest>^{commit}` in `FLOWTRON_REPO`); returns a reason string on mismatch, else null. Null-tolerant `try/catch` on both reads.
- Added `describePin(sha)`: resolves a committed gitlink SHA to a release tag via `git tag --points-at` (first semver match), falling back to a 12-char short SHA — so the report names `v5.9.0` rather than a raw hash.
- `checkAdopter` now gates the `current === latest` early-return through `gitlinkDrift`, returning `{status:'drift', current, reason}` on drift. Scope stays inside that branch — bump/skip paths unchanged (`applyBump` already commits the gitlink).
- `main()`: new `drift` report branch (`⚠` line) + `drifted` counter in the summary. Report-only in both dry-run and `--apply` — never auto-committed.
- Header comment gained a "Gitlink-drift detection" block explaining the masking scenario and the report-only posture.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no unit suite exists; verified via `node --check` (pass) + dry-run against `~/code`: 7 `current`, 10 `drift`, 1 would-bump, 0 failed. Both branches fire.

- [x] Ran lint/type-check on changed code — `node --check tools/update-adopters.mjs` passes; no eslint config covers `tools/` (viz's is viz-scoped), so `node --check` is the standing lint/typecheck equivalent per CORE-312.

- [x] (frontend) Asked the user for visual confirmation — N/A (CLI tool, no UI).

**Testing Notes:**

- Cross-checked SHAs directly: `v5.11.0^{commit}` = `72905fc…`; adppro (reported `current`) gitlink = `72905fc…` (matches → clean); bananapeel (reported `drift`) gitlink = `f94bc84…` = `v5.9.0^{commit}` (matches → `describePin` renders `v5.9.0`). Confirms the equality/mismatch branches and tag resolution all execute correctly (not a swallowed-error false pass).
- **Live finding (out of scope — detection only):** 10 `~/code` adopters currently carry real gitlink drift — worktree SPEC.md at v5.11.0 but committed pin at v5.9.0. Per-repo fixes are `/ft-update` / manual gitlink commit in each repo's own session (not bulk-pushed from flowtron).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all AI-referenced docs **no change**: the change adds an internal report status (`drift`) to `tools/update-adopters.mjs`; no doc enumerates the tool's report vocabulary. `SPEC.md` carve-out ("dry-run default, local commits, never pushes") stays accurate — drift is report-only. `README.md` / `docs/MIGRATION.md` tool pointers don't list statuses. Remaining docs unrelated.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` (in place under `CORE-EPIC-351`; cohort moves to `## Completed` at epic close) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`tools/update-adopters.mjs` now detects superproject gitlink drift — a committed submodule pin lagging the latest release even though the checked-out `.flowtron/core/SPEC.md` reads latest (tag checked out inside the submodule, pin never committed). New `gitlinkDrift()` compares the committed gitlink SHA (`git rev-parse HEAD:.flowtron/core`) against the latest release tag's commit SHA; `describePin()` renders the stale pin as a tag (`v5.9.0`) rather than a hash. `checkAdopter` routes such repos to a new report-only `drift` status (⚠ line + `drifted` counter) instead of falsely reporting `current`; the bump/skip paths and the clean happy path are untouched. Report-only — never auto-committed. Verified via `node --check` + live dry-run: 7 current / 10 drift / 1 would-bump, with SHAs cross-checked directly. Live finding: 10 `~/code` adopters carry real drift (worktree v5.11.0, pin v5.9.0) — fixes belong per-repo, not bulk-pushed from flowtron.

**Archived:** 2026-07-12
