---
title: release-ci-line
status: completed
tags: []
created: 2026-10-18
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-release/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-803 | release-ci-line

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-546]]

## 🎯 Goal

Move `/ft-release`'s post-push CI report out of the pre-push §7.4 📦 gate (where it can never have a result) into Step 8 beside the 🏁 marker, as one flag-don't-block line.

## ✅ Acceptance

- [x] §6.1's closing paragraph no longer routes the post-push run through the §7.4 closure review — `! grep -q 'Carry the post-push run into' claude/skills/ft-release/SKILL.md`
- [x] Step 8 carries one flag-don't-block `gh run list --commit <release-sha>` line, run after §7.5's push — `awk '/^## Step 8/{a=1} a' claude/skills/ft-release/SKILL.md | grep -q 'gh run list --commit'`
- [x] Drift checks pass — `bash tools/drift-checks.sh`
- [x] ft-release budget rows hold (body ≤ 40,000; directory ≤ 113,000) — `wc -c claude/skills/ft-release/SKILL.md` and `find claude/skills/ft-release -type f | xargs cat | wc -c`
- [x] The Step 8 wording reads correctly on push-go No and on an unreadable `gh` — `judgment`: prose, no command decides it

## 🧩 Subtasks

- [x] Rewrite §6.1's closing "Carry the post-push run into the §7.4 closure review" sentence to point at Step 8
- [x] Add a Step 8 bullet: after §7.5's push (push-go Yes only), run the one-line `gh run list --commit <release-sha>` and print it beside the 🏁 marker; flag, never block
- [x] Run drift-checks and re-measure the ft-release budget rows

## 🔗 Related

- [[CORE-546]] — added §6.1 (CI on the commit being built on) after v5.25.0 tagged over a red `main`; the pre-push half is unchanged here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** the defect is real in the current text. §6.1's last paragraph says the post-push run is carried "into the §7.4 closure review", but §7.4 is the pre-commit 📦 gate and §7.5 holds the push, so the run it names does not exist yet when the review is written. Step 8 runs after §7.5 and is the first place the release commit has a run to read.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Source read: `claude/skills/ft-release/SKILL.md` §6.1 (lines 189-223), §7.4 (verdict bullets, 318-351), §7.5, Step 8 (364-381). §7.4 carries no CI bullet — the only place the post-push run is routed is §6.1's closing sentence (line 222-223). So the fix is two edits in one file: reword that sentence, add the Step 8 bullet.
- Cross-refs: `grep` for `post-push` / `§6.1` finds only `step-7.1-mirror-pairs.md:9` (cites §6.1 for the pre-commit HEAD gate — unaffected) and `docs/CONVENTIONS.md:66` (cites §6.1 as the per-cut check shape — unaffected). The 🏁 marker shape is canonical in `SPEC/post-closure.md`; the release marker block is a local variant, so a CI line added beside it touches no mirror.
- Archive skim: CORE-543 minted §6.1, CORE-575.4 added §6.2 after it, CORE-553 cut v5.26.0 over it (its Testing Notes record HEAD-unpushed → "no runs reported" is not a pass). Nothing there depends on the post-push sentence.
- Design: one line after §7.5's push (push-go Yes only; on No nothing is on origin, so say `CI: not pushed`). The jq folds `conclusion == ""` back to `status` so a run still `in_progress` reads as such, never as a pass. Trial run on `origin/main` printed `CI success`; on an unpushed HEAD it prints nothing, which the bullet must surface as "no runs yet" rather than omit. The line never blocks: the tag is already pushed, so a red result is a report to the operator (and, if red, a follow-up fix commit), not a gate. §6.1's pre-commit blocking check on the inherited HEAD stays untouched.
- Budget baseline: SKILL.md 35,892 (cap 40,000); directory 108,240 (cap 113,000). Drift-checks all `ok` before the edit.
- Clarifications: No clarifications needed (--fast). Assumptions: line goes in a new Step 8 bullet, not inside the marker template block; `<release-sha>` is the §7.5 commit sha the marker already names.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: reused §6.1's own `gh run list --commit` shape and its fail-open wording ("no runs / gh missing / unauthenticated is not a pass"), collapsed to one line via `jq join`; the new bullet sits in Step 8's existing bullet list between Rotation and Suggest-next-move.
- Minimal refactor: none. Two edits in `claude/skills/ft-release/SKILL.md` — §6.1's closing sentence reworded to point at Step 8; one new Step 8 bullet (`Release-commit CI line`). No tests exist for skill prose; the drift-check suite is the test surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [N/A] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests / lint-type-check: `N/A` — markdown-only diff; viz/fleet-updater suites untouched. The drift-check suite is the applicable gate.
- `! grep -q 'Carry the post-push run into' claude/skills/ft-release/SKILL.md` → exit 0
- `awk '/^## Step 8/{a=1} a' claude/skills/ft-release/SKILL.md | grep -q 'gh run list --commit'` → exit 0
- `bash tools/drift-checks.sh` → every check `ok` (skill_name_invariant … pair_r), no failure line
- Budget rows: `claude/skills/ft-release/SKILL.md` 36,893 B (cap 40,000; was 35,892, +1,001); directory 109,241 B (cap 113,000; was 108,240); `context_budget ok` in the drift run.
- The `jq` filter on synthetic data: `[in_progress, failure]` → `CI in_progress · Drift failure` (an empty `conclusion` falls back to `status`); `[]` → empty output, which the bullet maps to `CI: no runs reported`. Against live `origin/main` → `CI success`.
- Step 8 wording on the unhappy paths (push-go No, `gh` unreadable) — `judgment`: reads correctly; each case has its own printed line, none blocks the 🏁 marker.
- External review: `N/A` — a 13-line prose diff to one skill file whose only executable content (the jq) was run against live and synthetic input above; too small to grade independently.
- 👁️ visual confirmation: `N/A` — no rendered surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Doc-drift sweep: no change — the only other citations of §6.1 (`step-7.1-mirror-pairs.md:9`, `docs/CONVENTIONS.md:66`) cite the pre-commit HEAD gate, which this task leaves intact. Learnings: `N/A`.

Changed `claude/skills/ft-release/SKILL.md`: §6.1's closing sentence no longer routes the post-push CI run through the pre-push §7.4 gate, and Step 8 gains a `Release-commit CI line` bullet — one flag-don't-block `gh run list --commit <release-sha>` line printed under the 🏁 marker after the §7.5 push (`CI: not pushed` on push-go No; fail-open wording for no runs / unreadable `gh`). Verification: the two grep criteria exit 0, `bash tools/drift-checks.sh` all `ok`, budgets 36,893/40,000 (body) and 109,241/113,000 (directory). `touches:` reconciliation: `git diff --name-only` = `claude/skills/ft-release/SKILL.md` only, matching the declaration (plus the workflow's own PLAN/tasknote files). Maintainability: the report now sits where its data exists; no new mirror to keep in sync.

**Archived:** 2026-10-18
