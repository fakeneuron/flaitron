---
title: auto-rotate-contract
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-768, CORE-768.1, CORE-768.3, CORE-768.4, CORE-620, CORE-604.4, CORE-467]
touches:
  - SPEC/plan-filing.md
  - SPEC/post-closure.md
  - .flaitron/PLAN.md
  - .flaitron/PLAN-ARCHIVE.md
---

# CORE-768.2 | auto-rotate-contract

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-768]]

## 🎯 Goal

Turn `## Completed` rotation from an operator motion into an automatic agent procedure: once a closure commit lands and `## Completed` holds more than 60 rows, the agent moves the oldest whole cohorts into `PLAN-ARCHIVE.md` until 40 or fewer remain, in a separate `chore: rotate <N> Completed rows to PLAN-ARCHIVE.md` commit, hooked into `SPEC/post-closure.md`, with no script.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` §"`## Completed` rotation" defines rotation as an agent procedure: fires only past 60 rows, moves the oldest whole cohorts until ≤40 remain, keeps the append rules, gives the commit shape, skips linked worktrees, and has no "operator motion" text — `grep -c "operator motion" SPEC/plan-filing.md` → 0, plus `judgment` on the procedure prose
- [x] `SPEC/post-closure.md` runs the rotation check once the closure SHA lands, before 🏁, in a separate commit limited to `PLAN.md` + `PLAN-ARCHIVE.md` — `grep -n "plan-filing.md" SPEC/post-closure.md`, plus `judgment` on placement
- [x] No script added (SPEC principle #2) — `git diff --name-only 73592920 -- tools/ viz/` is empty
- [x] `SPEC/post-closure.md` stays under its 10,000-byte budget — `wc -c SPEC/post-closure.md`
- [x] Drift checks pass — `bash tools/drift-checks.sh` → 0
- [x] This task's own closure performs flaitron's first auto-rotation: `## Completed` ≤40 rows, rows moved verbatim (line multiset preserved across the two files), no cohort split — awk count + sorted-multiset `diff` recorded with the rotation commit. Runs by design at post-closure step 2, after this note is archived; the receipt goes in the rotation commit body and the 🏁 line

## 🧩 Subtasks

- [x] Rewrite `SPEC/plan-filing.md` §"`## Completed` rotation": bound + 40 target, "Rotation is an agent procedure" replacing the operator-motion paragraph, procedure steps (count → cut at a cohort boundary → append per month → commit), worktree skip, no-script rationale
- [x] Add the rotation hook to `SPEC/post-closure.md` (after the closure SHA lands, before 🏁; lazy-load plan-filing.md only when over the bound)
- [x] Run `bash tools/drift-checks.sh` and budget check; external review
- [x] Phase 4 closure commit, then perform the first auto-rotation per the new procedure as its own `chore:` commit

## 🔗 Related

- [[CORE-EPIC-768]] — parent epic
- [[CORE-768.1]] — Discovery; resolved mechanism, separate commit, >60 → 40 hysteresis
- [[CORE-768.3]] — follow-up: retires the >60 advisories this contract makes redundant
- [[CORE-768.4]] — follow-up: epic parent auto-flip, which runs before the rotation check in the same hook
- [[CORE-620]] — predecessor: the last manual rotation, the procedure this task automates
- [[CORE-604.4]] — predecessor: set the 60-row bound and row-count granularity

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `## Completed` holds 204 rows against a bound of 60. [[CORE-768.1]] filed this child with mechanism, commit shape, and hysteresis already resolved; nothing since has changed the plan.

- [x] Read relevant source files — `SPEC/plan-filing.md` §§"`## Completed` archive convention" + "`## Completed` rotation", `SPEC/post-closure.md` (full), `SPEC/gates.md` §"Conditional skip rule", `docs/WORKTREES.md` (End half + rules), `claude/skills/ft-release/SKILL.md` §§7.4–8, `.flaitron/PLAN-ARCHIVE.md` header and month blocks, `docs/CONTEXT-BUDGET.md` budget rows

- [x] **Best Practices Review** — `N/A` for code. Contract boundary: the procedure lives once, in `plan-filing.md`; `post-closure.md` holds only the trigger and a pointer, so the steps aren't restated in the always-run closing path

- [x] **Archive skim** — area `archive/core/` (README table). There are 65 hits for the rotation terms and 18 for `post-closure.md`, so I relied on [[CORE-768.1]]'s same-day skim of the load-bearing set ([[CORE-467]], [[CORE-604.4]], [[CORE-638.3]], [[CORE-089]], [[CORE-473.5]]) and read [[CORE-620]] in full, since it is the manual rotation being automated. Findings in Discovery Notes.

- [x] **Drift check** — the PLAN row and .1's inventory match the current files at `73592920`. One small drift: the PLAN row names the commit `chore: rotate ## Completed`, but the two prior rotation commits (`eb9c3dc4`, `06b28678`) used `chore: rotate <N> Completed rows to PLAN-ARCHIVE.md`. I'm following that precedent; the row's wording was a placeholder.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Active model Opus 5.5 under a `[heavy]` tag: satisfied.

**Resolved scoping** (operator, 2026-10-09, on top of [[CORE-768.1]]'s table):

| Question | Answer |
|---|---|
| Closure inside a `wt-<ID>` worktree | Skip rotation there; the next main-checkout closure catches up. A worktree branch that moves 20–160 PLAN rows would almost certainly conflict on merge-back. |
| `/ft-release` closures | Rotate like any other closer. The chore commit stays local until the next push, the same as any ordinary closure commit. |

**Load-bearing findings:**

- **Append position inside a month block.** [[CORE-620]] and the two prior rotation commits appended each batch at the *end* of its existing month block, keeping the batch in PLAN order. The batch is newer than everything already in the block, so a block ends up as a sequence of newest-first runs. The contract's "extends the block in place" means exactly this; the procedure states it outright so an agent doesn't re-sort.
- **Cohort month.** `PLAN-ARCHIVE.md`'s header says a nested child sits under its parent cohort's month. `plan-filing.md` already implies this through "never split an epic cohort"; the procedure keys the month on the top-level row.
- **Gate status.** The rotation commit touches only workflow markdown and cannot trip the privileged-ops signal. Per .1 it is autonomous under every posture, so it adds no row to `SPEC/gate-postures.md`'s surface matrix and no banner (the two-banner cap holds).
- **Budget.** `SPEC/post-closure.md` is 8,307 bytes against a 10,000 cap, so the hook must stay at a few hundred bytes. The procedure goes in `plan-filing.md`, which has no cap.
- **Downstream impact (already in scope).** `claude/skills/ft-release/SKILL.md`:336 says "a release cut never applies it". Under the release answer above, that text becomes stale. It is on [[CORE-768.3]]'s advisory-site list from .1's inventory, so .3 rewords it; no PLAN edit is needed. Until .3 lands, the advisory sites (preamble, SOP, close-epic, release §7.1) still say "operator motion". That interim state is expected under the epic's sequential plan.
- **Self-rotation size.** `## Completed` holds 204 rows: 57 from 2026-09 and 147 from 2026-10. Rotating down to 40 moves about 164 rows. The 2026-09 rows append to the open `## Completed 2026-09` block; the 2026-10 rows open a new `## Completed 2026-10` heading above it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing bold-label paragraphs in §"`## Completed` rotation" with a numbered procedure list (same shape as `SPEC/post-closure.md`'s steps); the hook extends post-closure step 2 in place, so the existing "steps 1–3" citations don't need renumbering

- [x] **Minimal refactor gate** — no refactor. Deferred to [[CORE-768.3]]: the advisory sites and prose mirrors that still say "operator motion"

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: SPEC prose only; flaitron has no tests for contract text beyond `tools/drift-checks.sh`

**Implementation Notes:**

- `SPEC/plan-filing.md`:
  - **The bound** now names the 40-row target and why the gap exists.
  - **Granularity** and the never-split rule are re-anchored to the target.
  - **Date resolution** gains the parent's-month rule for nested children.
  - "Rotation is an operator motion" is replaced by **Rotation is an agent procedure**, five steps: main checkout only → cut → move → verify → commit separately.
  - The commit uses `git add` plus `git commit … -- <two paths>`. A plain `git commit -- <path>` rejects an untracked file, which the archive file is on a project's first rotation, so the `add` is required.
- `SPEC/post-closure.md` step 2 opens with the count → read plan-filing → rotate → 🏁 suffix. That adds 432 bytes (8,307 → 8,739, cap 10,000). [[CORE-768.4]] will put the parent flip ahead of this count in the same place.
- Downstream note for [[CORE-768.3]]: `claude/skills/ft-release/SKILL.md`:336 ("a release cut never applies it") is now wrong, because a release closure rotates like any other closer (operator answer, Discovery Notes).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: SPEC prose; `bash tools/drift-checks.sh` is the applicable suite

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review fixes):
- `grep -c "operator motion" SPEC/plan-filing.md` → 0
- `grep -n "plan-filing.md" SPEC/post-closure.md` → exit 0 (hook at line 19)
- `git diff --name-only 73592920 -- tools/ viz/` → empty (no script)
- `wc -c SPEC/post-closure.md` → 8,804 (cap 10,000)
- `bash tools/drift-checks.sh` → 0
- `git -C viz rev-parse --path-format=absolute --git-dir --git-common-dir` → two identical paths. The worktree test now gives the right answer from a subdirectory.
- Self-rotation dry run (scratchpad, `python3 -I`): 204 → 39 rows, 165 moved (108 to a new `2026-10` heading, 57 appended to `2026-09`). The cut lands on the CORE-EPIC-739 cohort boundary.

Structural checks: no duplication (the procedure lives only in `plan-filing.md`; `post-closure.md` holds the trigger plus a pointer), no dead text, and stale mirrors deferred to [[CORE-768.3]].

External review: `/code-review medium` on the working-tree diff, nine findings.
- **Blocker, fixed.** `--git-dir` vs `--git-common-dir` gave a false "worktree" from a subdirectory; both now use `--path-format=absolute`. Phase 3 re-ran.
- **Blocker, fixed.** The verify step's sorted-line comparison counted new headings and blank lines as rows; it now compares `- [x]` rows only. Phase 3 re-ran.
- **Note, fixed.** The `git add` could pull unrelated PLAN.md hunks into the commit. Step 1 now skips rotation when either file has uncommitted edits.
- **Note, fixed.** The 🏁 SHA could pick up the rotation commit. Step 2 now records the closure SHA before rotating.
- **Note, fixed.** "Bottom = oldest" now cites §"Placement rule". An undated row now stays where it is and still counts.
- **Note, fixed.** The Goal's commit message now matches the spec.
- **Note, deferred to [[CORE-768.3]] (next sequential child, already filed).** `ft-close-epic/SKILL.md`:63, `ft-release/SKILL.md`:336, GLOSSARY, MIGRATION, and templates/PLAN.md still say "operator motion", which contradicts the new hook until .3 lands.
- **Note, no change.** A declined or hand-made commit skips that run's rotation. The next runner closure still catches up, and .3 keeps `/ft-release` §7.1 as a backstop.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/EXTERNAL-AGENTS.md`: rotation mirrors deferred to [[CORE-768.3]], which owns them by scope. `docs/WORKTREES.md`: no change ("post-closure protocol unchanged" still holds, and the skip lives inside that protocol). All other entries: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`

**Final Summary:**

`## Completed` rotation is now an automatic agent procedure. After a closure commit lands, the agent counts the rows. Over 60, it moves the oldest whole cohorts into `PLAN-ARCHIVE.md` until 40 or fewer remain, in a separate `chore: rotate <N> Completed rows to PLAN-ARCHIVE.md` commit. It runs with no prompt under every posture and skips linked worktrees or files with uncommitted edits.

- Changed: `SPEC/plan-filing.md` §"`## Completed` rotation" (+ about 40 lines: bound and target, five-step procedure) and `SPEC/post-closure.md` step 2 (+497 bytes, 8,804 of 10,000).
- Verification: drift checks 0; review blockers fixed and re-verified.
- No refactor. Doc verdict: mirrors deferred to [[CORE-768.3]].
- `touches:` reconciliation: closure diff = `SPEC/plan-filing.md`, `SPEC/post-closure.md`, `.flaitron/PLAN.md`, plus this archived note; `.flaitron/PLAN-ARCHIVE.md` lands in the follow-on rotation commit. Matches the declared paths.
- Maintainability: the procedure is written in one place, and the always-run closing path loads it only past the bound.

**Archived:** 2026-10-09
