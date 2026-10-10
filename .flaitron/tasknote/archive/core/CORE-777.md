---
title: ignored-skill-link-paths
status: completed
tags: [fleet-updater, skill-rename]
created: 2026-10-10
due:
related-tasks: [CORE-775.2, CORE-769.7]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-777 | ignored-skill-link-paths

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-775.2]]

## 🎯 Goal

Stop the fleet updater failing every skill-rename bump for adopters whose renamed link paths are gitignored: detect them in `checkAdopter` and skip the adopter with a reason naming the paths, before anything is mutated.

## ✅ Acceptance

- [x] `checkAdopter` runs `git check-ignore` on the plan's `newPath`s when the range crosses the skill rename, and returns `status: 'skip'` with a reason naming each ignored path and pointing at `/ft-update` — `grep -n "check-ignore" tools/update-adopters.mjs`
- [x] A new test: a gitignored renamed-link path yields `skip` with the path in the reason, and `--apply` flow's `applyBump` is never reached/leaves the repo untouched — `node --test tools/update-adopters.test.mjs`
- [x] A repo with no ignored new paths still classifies `bump`/`migrate` (existing skill-rename tests unchanged and green) — `node --test tools/update-adopters.test.mjs`
- [x] The new test fails against the unguarded code (red-then-green) — `judgment`: recorded by running it with the fix stashed
- [x] Fleet-updater suite and syntax checks green — `node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs`

## 🧩 Subtasks

- [x] Add a `check-ignore` helper over the plan's new paths (exit 0 → ignored list, exit 1 → none, other → throw)
- [x] Return the `skip` result in `checkAdopter` before the report note is built
- [x] Test: ignored new-link path → `skip` naming the path; repo untouched
- [x] Red-then-green run, then suite + syntax + drift checks

## 🔗 Related

- [[CORE-775.2]] — surfaced this: its rollback test pins the failure as a clean-but-failed bump
- [[CORE-769.7]] — introduced the skill-rename plan

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Live defect: `skillLinkPlan` plans `newPath`s without consulting ignore rules, so `applyBump`'s `git add` exits 1 on an ignored one and the bump rolls back (CORE-775.2 made that rollback clean, not successful). The PLAN line left the fix open; operator chose skip-with-reason.

- [x] Read relevant source files — `skillLinkPlan`, `checkAdopter`, `applySkillLinkPlan`, `git()`, the CORE-775.2 gitignore test

- [x] **Best Practices Review** — one small private helper beside `skillLinkPlan`, same `e.code !== 1` idiom; no new abstraction

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions (AskUserQuestion: skip-with-reason chosen)

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — `skillLinkPlan` / `applySkillLinkPlan` (`tools/update-adopters.mjs`) create renamed skill links at paths that may be gitignored. `git add` refuses them (exit 1), so an adopter that force-added its skill links under an ignored `.claude/` fails every bump crossing the skill-rename tag; since CORE-775.2 the rollback is clean, but the bump never lands. Fix at path selection: `git check-ignore` the planned paths in `skillLinkPlan` (flag or prune), or `git add -f` the planned link paths. Surfaced by CORE-775.2's external review.
>
> **Resume anchor** — CORE-775.2 was in Phase 3 grading its `/code-review medium` findings, with closure and commit next.

- Operator decision (AskUserQuestion): **skip the adopter with a reason** rather than `git add -f` (would override a deliberate ignore) or an untracked swap (fresh clones lose the wiring).
- Code: `checkAdopter` plans at `tools/update-adopters.mjs:797` (`skillLinkPlan`) only when the range crosses the rename; `reportResult` applies only for `bump`/`migrate` results, so a `skip` there stops everything before mutation. Skip reasons follow the `… — run /ft-update` shape (:767).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern: skip-result shape and `— run /ft-update` wording follow the migration-bearing skip (:767); helper mirrors the file's exit-1-means-none idiom. `ignoredNewLinks` runs `git -c core.quotePath=false check-ignore -- <newPaths>` (git rejects `-z` without `--stdin`) and `checkAdopter` skips before building the report note. Only `newPath`s are checked: `kept`/pruned entries create nothing. `applyBump` is unchanged — it is only reached after a non-skip check.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `node --test tools/update-adopters.test.mjs` → 0 (78 pass, 0 fail)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0
- `grep -n "check-ignore" tools/update-adopters.mjs` → line 870
- Red-then-green: with the source stashed the new test fails (pass 0 / fail 1); restored, it passes.
- `bash tools/drift-checks.sh` → only `pair_q` fails, pre-existing (CORE-776.6's not-yet-written §"ID allocation"); untouched by this diff.
- External review (`/code-review medium`, working-tree scope), no blockers:
  1. Fixed — `const wired =plan` typo my edit introduced.
  2. Fixed — C-quoted non-ASCII paths: now `-c core.quotePath=false` (`-z` is invalid without `--stdin`).
  3. Accepted — a check-ignore fatal (e.g. pathspec beyond a symlink) rethrows, but the sweep loop reports it as a per-adopter `✗ check failed`, failing closed.
  4. Accepted — "/ft-update is a dead end": `/ft-update` is operator-attended per repo, where the adopter can decide `git add -f` or an ignore edit; the skip exists to stop the unattended fleet sweep forcing that choice.
  5. Accepted — dispatch-on-skip is existing `reportResult` structure (skip never applies); not re-tested here.
  6. Accepted — extra coverage (multi-path, codex dir, pre-rename adopter) not added; the helper is one pathspec call.
  7. Accepted — a global `core.excludesFile` can vary the verdict by machine; that is the same rule `git add` itself applies, so the skip is accurate for the operator running it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** `checkAdopter` now skips an adopter whose renamed skill-link path is gitignored, with a reason naming the paths and pointing at `/ft-update`, instead of letting `git add` fail the bump after the checkout. One new test, red-then-green; suite 78/78. Doc-drift sweep: no change (SECURITY.md and MIGRATION.md describe the updater without per-skip reasons). `touches:` matched the diff. Learnings: N/A.

**Archived:** 2026-10-10
