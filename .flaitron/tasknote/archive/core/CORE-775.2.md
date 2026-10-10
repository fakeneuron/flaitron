---
title: bump-rollback-staging
status: completed
tags: [fleet-updater, rollback]
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-775, CORE-775.3, CORE-775.N]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-775.2 | bump-rollback-staging

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-775]]

## 🎯 Goal

Make `applyBump`'s rollback undo a partial `git add` — register the gitlink and link-path index resets before the add, so a failed add that already staged some paths leaves the adopter's index clean.

## ✅ Acceptance

- [x] `applyBump` sets `staged = true` and pushes the link-reset undo before `git add`, not after — `grep -n "staged = true\|skill links left staged\|'add', '--', SUBMODULE_PATH" tools/update-adopters.mjs` (both registrations precede the add line)
- [x] A new test bumps across the skill rename with the renamed link's path gitignored, asserts the ✗ rejection carries no `rollback incomplete`, and asserts `git diff --cached --quiet` exits 0 plus HEAD / submodule SHA unchanged — `node --test tools/update-adopters.test.mjs`
- [x] The new test fails against the pre-fix ordering (red-then-green) — `judgment`: recorded by running the test with the fix stashed
- [x] Fleet-updater suite and syntax checks green — `node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Move `staged = true` and the `skill links left staged` undo push ahead of the `git add` in `applyBump`; adjust the comment
- [x] Add a rollback test: gitignored new-link path → partial add → ✗ rollback leaves index clean
- [x] Run the test red against the old ordering, green against the new
- [x] Run the fleet-updater suite + syntax checks + drift checks

## 🔗 Related

- [[CORE-EPIC-775]] — parent epic (v7-bump-safety)
- [[CORE-775.3]] — sibling: migrate staging guards
- [[CORE-419.3]] — origin of the applyBump rollback window

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The defect is live at `tools/update-adopters.mjs:993-997`: `staged = true` and the link-path reset undo are registered only after `git add` returns. v7.0.0's skill-rename bump runs this path across the fleet, so a residue-leaving rollback would surprise adopters.

- [x] Read relevant source files — `applyBump`, `rollbackBump`, `unwind`, `applySkillLinkPlan`, `skillLinkPlan` in `tools/update-adopters.mjs`; skill-rename `describe` block in `tools/update-adopters.test.mjs` (`apply` / `rollback` / `unresolved` tests)

- [x] **Best Practices Review** — The fix keeps the file's established "push the undo as soon as the mutation could have landed" discipline (applyMigrate, applySkillLinkPlan). Registering before the mutation is safe because both undos are idempotent pathspec resets: `git reset -- <path>` on an unstaged or unindexed path is a no-op (exit 0, checked empirically). No new abstraction.

- [x] **Archive skim** — `grep -l update-adopters .flaitron/tasknote/archive/core/` hits many notes; the load-bearing one is CORE-419.3 (mid-bump rollback: undo the checkout, unstage the gitlink only when staged — rationale that the pre-bump index is verified clean by `checkAdopter`, so a pathspec reset restores it exactly). That premise is exactly what makes the reset safe here. CORE-419.3 also chose a *conditional* unstage (decision 3: "a reset that was never needed is a mutation the tool has no business making"); this fix keeps it by flipping `staged` immediately before the add rather than at the top — failures before the add (checkout, verifies, link plan) still skip the reset. The "add" is the first step that can stage, so it is the right boundary.

- [x] **Drift check** — PLAN line matches code: `staged = true` at :994 and the link undo at :996 both follow the add at :993. `unwind` reverses its list, so the link reset (pushed last) still runs before the symlink restores. Empirical repro (scratch repo): `git add -- a ign` with `ign` gitignored → exit 1, `a` staged; `git reset -- a ign` → exit 0, index clean.

- [x] No clarifications needed (--fast) — assumptions: the fix is the minimal reorder the PLAN line names (no `--ignore-errors`, no pre-check of ignore rules); the test uses the existing skill-rename fixtures and gitignores `.claude/skills/ft-update` (a renamed link's new path) in a committed `.gitignore`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- `rollbackBump(staged)` resets only `SUBMODULE_PATH`; the link paths are reset by the `linkUndo` entry. Both are currently registered post-add, so a throwing add leaves the gitlink and the tracked link deletions staged.
- `checkAdopter` refuses an adopter with staged changes, so the pre-bump index is clean and an unconditional pathspec reset cannot drop adopter work.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the file's "register the undo as soon as the mutation can have landed" shape (`applySkillLinkPlan`, `applyMigrate`); the new test extends the CORE-769.7 `describe` block's `rollback:` tests (`addRenameLinks` fixture + `assert.rejects` with a no-`rollback incomplete` predicate).

- [x] **Minimal refactor gate** — no refactor; a 3-line reorder plus a 2-line comment.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/update-adopters.mjs` `applyBump`: `staged = true` and the `skill links left staged` undo now precede `git add`. `unwind` reverses its list, so the link reset still runs before the symlink restores; `rollbackBump` still resets the gitlink after the submodule checkout revert. Failures before the add still skip both resets (CORE-419.3 decision 3 preserved).
- `tools/update-adopters.test.mjs`: new `rollback: a partial add on a gitignored new link leaves the index clean` — commits a `.gitignore` naming `.claude/skills/ft-update` (the `ft-old → ft-update` swap's new path), asserts the rejection names `ignored` with no `rollback incomplete`, then `git diff --cached --quiet`, HEAD and submodule SHA unchanged, and an empty `git status --porcelain`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n "staged = true\|skill links left staged\|'add', '--', SUBMODULE_PATH" tools/update-adopters.mjs` → 0 (lines 995, 997, then the add at 999)
- `node --test --test-name-pattern="partial add" tools/update-adopters.test.mjs` with `tools/update-adopters.mjs` stashed (pre-fix ordering) → 1; first failure: `Error: Command failed: git diff --cached --quiet`
- same, with the fix → 0 (1/1 pass)
- `node --test tools/update-adopters.test.mjs` → 0 (75/75 pass, 0 fail)
- `node --check tools/update-adopters.mjs` → 0; `node --check tools/update-adopters.test.mjs` → 0
- `bash tools/drift-checks.sh` → 1; only `pair_q` fails: `STALE SECTION .flaitron/PLAN.md — SPEC/plan-filing.md §"ID allocation"`. That citation is pre-existing on HEAD (c7e7f7a4's filing of CORE-776.6, whose deliverable creates the section); this diff does not touch PLAN.md, so not caused here and already tracked.
- Lint/type-check: the repo declares none for `tools/` beyond `node --check` (lint/typecheck scripts cover `viz/` only).
- Quality: no duplication or dead code; the moved comment states the new ordering's reason.
- 👁️: N/A — no rendered surface.

**External review** (`/code-review medium`, working-tree diff only) — no blockers; the main change was judged correct. Six notes:

1. *False residue when `git add` fails before staging anything* (e.g. a stale `index.lock`): both resets then run and may report "left staged" residue. **Note, accepted** — the PLAN line prescribes registering before the add, and a lock that blocks the add also blocks the resets, so the report names a real unrecovered state (the lock) even if the wording overstates it. Not fixed.
2. *Root cause: renamed links planned at gitignored paths fail every bump* → **filed** as CORE-777 (park, Medium, `da7b51ea`).
3. *`status --porcelain` hides the ignored stray link* → **fixed**: the test now asserts `.claude/skills/ft-update` does not exist.
4. *`/ignored/` regex depends on git's English wording* → **fixed**: matches the path `.claude/skills/ft-update` instead.
5. *`rollbackBump` doc comment says "already staged"* → **fixed**: now "once the `git add` was attempted (a partial add may have staged it)".
6. *Two separate resets give duplicate residue on one cause* → **note, not fixed** — merging them would restructure the CORE-419.3 / CORE-769.7 undo split beyond this task's scope.

Post-fix re-run: `node --test tools/update-adopters.test.mjs` → 0 (75/75); `node --check` on both files → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep: no change across the README §"AI-referenced docs" set — the only mention of the updater's rollback (`docs/MIGRATION.md` §"rollback-safe local commit") describes behavior this fix restores, not its staging order.

Learnings: N/A.

**Final Summary:**

- **Changed:** `tools/update-adopters.mjs` (`applyBump` registers `staged = true` and the link-reset undo before `git add`; `rollbackBump` comment updated); `tools/update-adopters.test.mjs` (new `rollback: a partial add on a gitignored new link leaves the index clean`).
- **Verified:** new test red on the pre-fix ordering (`git diff --cached --quiet` failed), green after; fleet-updater suite 75/75; `node --check` clean on both files. `drift-checks.sh` fails only on the pre-existing `pair_q` PLAN citation owned by CORE-776.6.
- **Review:** no blockers; three notes fixed (ignored-path existence assert, locale-safe match, comment), one filed (CORE-777, `da7b51ea`), two accepted with reasons.
- **Refactors:** none.
- **`touches:` reconciliation:** declared `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`; `git diff --name-only` adds only the workflow paths (PLAN.md, this tasknote) — matches.
- **Maintainability:** the undo is now registered where the staging can begin, matching the file's register-before-it-can-land pattern.

**Archived:** 2026-10-10
