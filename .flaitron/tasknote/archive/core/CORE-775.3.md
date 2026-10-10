---
title: migrate-staging-guards
status: completed
tags: [fleet-updater, migrate]
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-775, CORE-775.2, CORE-775.N]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
---

# CORE-775.3 | migrate-staging-guards

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-775]]

## 🎯 Goal

Make `applyMigrate` never sweep an adopter's own unstaged work into the migration commit: guard step 4's symlink re-point like step 5's `.gitignore` guard, and re-check the index is clean after the fetch, before the first mutation.

## ✅ Acceptance

- [x] Step 4 runs `git diff --quiet -- <path>` per re-pointed link and stages only clean ones (dirty ones are rewritten in place, left unstaged) — `grep -n "diff', '--quiet'" tools/update-adopters.mjs` shows both the link and `.gitignore` guards
- [x] `applyMigrate` re-checks `git diff --cached --quiet` after the fetch and before the first mutation, throwing on a dirty index — `grep -n "cached', '--quiet'" tools/update-adopters.mjs`
- [x] A new test migrates with a tracked `.flowtron` link carrying unstaged edits: the link is re-pointed in place, absent from the commit, and still `M` in `git status` — `node --test tools/update-adopters.test.mjs`
- [x] A new test with a staged change appearing after `checkAdopter` makes `applyMigrate` reject before any mutation, leaving the repo untouched — `node --test tools/update-adopters.test.mjs`
- [x] The new tests fail against the unguarded code (red-then-green) — `judgment`: recorded by running them with the fix stashed
- [x] Fleet-updater suite and syntax checks green — `node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Add the post-fetch `git diff --cached --quiet` re-check in `applyMigrate`
- [x] Guard step 4's staging with `git diff --quiet -- <path>` (rewrite in place, leave unstaged)
- [x] Test: dirty tracked link is re-pointed but not committed
- [x] Test: staged change after the check rejects before mutation
- [x] Red-then-green run, then suite + syntax + drift checks

## 🔗 Related

- [[CORE-EPIC-775]] — parent epic (v7-bump-safety)
- [[CORE-775.2]] — sibling: bump rollback staging (same family of index-safety fixes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Live at `tools/update-adopters.mjs:1189-1204`: step 4 pushes every re-pointed link into `toStage` unconditionally, and step 7's `git add` stages it, so an adopter's unstaged edit to a tracked link is committed. Step 5 already guards `.gitignore` this way. The index-clean premise (`checkAdopter` at :772) is also checked long before `applyMigrate` runs, with a network fetch in between.

- [x] Read relevant source files — `applyMigrate`, `trackedSymlinks`, `unwind`, `checkAdopter`'s index check, `skillLinkPlan` interplay (step 6); migrate tests in `tools/update-adopters.test.mjs` (`makePreRenameAdopter`, `dirty-gitignore`, rollback).

- [x] **Best Practices Review** — Reuse step 5's exact try/catch shape (`e.code !== 1` rethrow); no new helper unless duplication reads badly with two call sites.

- [x] **Archive skim** — CORE-775.2 (sibling, same file): undo-registration discipline; its premise "checkAdopter verified the index clean" is what the post-fetch re-check hardens. No other load-bearing hits.

- [x] **Drift check** — PLAN line matches code: step 4 has no diff guard (:1189-1204), step 5 does (:1216-1222), no cached-index check exists inside `applyMigrate`. Step 6 stages `toStage` before `skillLinkPlan`, so a dirty unstaged link stays visible to its uncommitted-edit skip.

- [x] No clarifications needed (--fast) — assumptions: the post-fetch re-check throws a plain Error before the `try` window (nothing to unwind); the dirty-link test edits a tracked link's target in the worktree.

**Discovery Notes:** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern: step 4 now uses step 5's exact `git diff --quiet -- <path>` / `e.code !== 1` shape (`clean` flag gates `toStage.push`). Post-fetch `git diff --cached --quiet` re-check sits just before `const undo = []`, so it throws outside the rollback window with nothing to unwind. No refactor; tests added beside `dirty-gitignore`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface (CLI tool)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `node --test tools/update-adopters.test.mjs` → 0 (77 pass, 0 fail)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0
- Red-then-green: with `tools/update-adopters.mjs` stashed, both new tests fail (pass 0 / fail 2); restored, both pass.
- `bash tools/drift-checks.sh` → `pair_q` FAILED on `.flaitron/PLAN.md` citing `SPEC/plan-filing.md` §"ID allocation" (CORE-776.6's not-yet-written section) — pre-existing, untouched by this diff.
- External review (`/code-review medium`, scoped to the working tree): no blockers. Notes:
  1. Dirty link left re-pointed but unstaged leaves HEAD with the old `.flowtron` target (dangling until the adopter stages it) — accepted: the PLAN line mandates step 5's "rewrite in place, leave unstaged" and `.gitignore` behaves identically; a migrate-output warning is a possible follow-up.
  2. The re-check narrows but doesn't close the staging race (step 7 commits with no pathspec) — accepted: the contract is "after the fetch, before the first mutation"; a pre-step-7 re-check or pathspec commit is a possible follow-up.
  3. Dirty-check try/catch now appears at three sites — noted, deferred (adjacent refactor, out of remit).
  4. Test doesn't mix a clean and dirty link / `skillRename` — the existing `apply-migrate` test already covers the clean-link-staged path; not added.
  5. Ordering of the guard relative to the fetch isn't pinned by the test (local origin) — red-then-green recorded above; accepted.
  6. Error doesn't list staged paths — noted; minor.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** `applyMigrate` now re-checks a clean index after the fetch and before its first mutation, and step 4 leaves a tracked link with the adopter's unstaged edits re-pointed in place but unstaged (mirroring step 5's `.gitignore` guard). Two new tests, red-then-green; suite 77/77. Doc-drift sweep: no change. `touches:` matched the diff exactly. Follow-ups worth filing if wanted: pre-step-7 index re-check, and a migrate-output note when a dirty link/`.gitignore` stays unstaged.

**Archived:** 2026-10-10
