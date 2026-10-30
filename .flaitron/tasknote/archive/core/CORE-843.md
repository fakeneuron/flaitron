---
title: unattended-park-commit
status: completed
tags: []
created: 2026-10-30
due:
related-tasks: []
touches:
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - claude/skills/ft-task/micro-mode.md
  - claude/skills/ft-close-epic/unattended-close-epic.md
  - SPEC/gate-postures.md
  - SPEC/plan-filing.md
  - SPEC/procedures/ft-task.md
  - SPEC.md
  - docs/EXTERNAL-AGENTS.md
---

# CORE-843 | unattended-park-commit

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

When an unattended park's tasknote is the working tree's only uncommitted path, the park recipe commits that note alone so the next dispatch is not stopped by it.

## ✅ Acceptance

- [x] The park recipe commits `.flaitron/tasknote/<TASK-ID>.md` alone when porcelain names no other path, with subject `chore: park <TASK-ID> — <code>`, never push, no 🏁 — `grep -F -q 'chore: park <TASK-ID> — <code>' claude/skills/ft-task/unattended-mode.md`
- [x] Any other uncommitted path skips the commit and leaves the park in the tree — `grep -F -q 'left uncommitted' claude/skills/ft-task/unattended-mode.md`
- [x] `SPEC/gate-postures.md` §"What a park is" states the same rule — `grep -F -q 'chore: park <TASK-ID> — <code>' SPEC/gate-postures.md`
- [x] `SPEC/plan-filing.md` §"Filing commits" keeps the 📦 gate for deliverables and names the lone park as outside it — `grep -F -q 'What a park is' SPEC/plan-filing.md`
- [x] The neutral SOP's parking paragraph names the lone-park commit — `grep -F -q 'chore: park <ID> — <code>' SPEC/procedures/ft-task.md`
- [x] `docs/EXTERNAL-AGENTS.md` no longer records a parked ending as always commit-less, and step 9 allows the lone-park commit — `grep -F -q 'chore: park <ID> — <code>' docs/EXTERNAL-AGENTS.md`
- [x] Byte budgets hold — `wc -c` of `SPEC/gate-postures.md` ≤ 22000, `SPEC/procedures/ft-task.md` ≤ 34200, `SPEC.md` ≤ 49000, `claude/skills/ft-task/SKILL.md` ≤ 33000
- [x] The surfaces agree — `judgment`: one recipe, mirrors point at it, attended parks and caller-written `interrupted` notes stay uncommitted

## 🧩 Subtasks

- [x] Park recipe in `unattended-mode.md`: three writes, then the lone-park commit, then the marker, including the model-mismatch halt
- [x] Point the other unattended park sites at that step (SKILL.md, loop, micro, close-epic, SOP, gate-postures, plan-filing fence, SPEC foreign-dirt, EXTERNAL-AGENTS)
- [x] Verify greps, budgets, full validation, external review

## 🔗 Related

- CBN-443, CBN-252 — motivating fleet cases in other repos: an untracked park tripped the next dispatch's foreign-dirt gate

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is live. The park recipe's four writes end at the marker, and `docs/EXTERNAL-AGENTS.md` records a parked ending as "no commit", so a clean run leaves an untracked note that the next task's foreign-dirt gate refuses.

- [x] Read relevant source files — `claude/skills/ft-task/unattended-mode.md` §"The park recipe", `SPEC/gate-postures.md` §"What a park is", `SPEC/plan-filing.md` §"Filing commits", `SPEC.md` §"Paper-complete guard", `SPEC/procedures/ft-task.md` parking paragraph, `docs/EXTERNAL-AGENTS.md` §"The Return" and step 9, plus the loop, micro, and close-epic park sentences. Narrow read; no probe.

- [x] **Best Practices Review** — N/A for code. For the contract, copy the filing commit's pathspec, whole-index read, never-push, and no-🏁 shape, scoped to one path and the porcelain predicate the PLAN line states. Do not add a second commit authority.

- [x] **Archive skim** — `archive/core/` matches the README table. Hits on the park recipe are more than a handful; load-bearing ones are CORE-731 (scaffold a mismatch park only when no note or stub exists) and CORE-733 (a committed `blocked` note is already a valid resume state; an uncommitted one trips the dirt gate). Hand-made `chore: park …` commits already exist (CORE-716.3, CORE-836). This task makes the recipe do that commit when the note is the only dirt.

- [x] **Drift check** — the PLAN line matches the recipe, which stops with "PLAN.md line unchanged" and no commit. Cited sections exist. CBN-443 and CBN-252 are other repos and were not re-read; the PLAN line's account of them is the requirement.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

No clarifications needed (--fast). Assumptions: attended parks do not auto-commit; "only uncommitted change" means `git status --porcelain` names no path except the tasknote; the subject is `chore: park <ID> — <code>` using the park-reason code, em dash, no body; other dirt, empty porcelain, an unrecognized index, or a failed commit leaves the park uncommitted; `/ft-close-epic` shares the recipe; a caller-written `interrupted` park stays uncommitted; pre-scaffold stops that write nothing do not commit; the commit is not a closure. Amending EXTERNAL-AGENTS' parked ending in place is not a move, rename, or retire of a stable-surface row, so no caller-repo filing.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: the filing commit (explicit pathspec, a pathspec-free index read, restore only the path this step added, commit the index with no pathspec, never push, never `--no-verify`, no 🏁), scoped to `.flaitron/tasknote/<TASK-ID>.md` and the porcelain predicate. Subject `chore: park <TASK-ID> — <code>`, no body. Any other path, empty porcelain, a rejected index, or a failed commit reports `left uncommitted`. Attended parks and a caller-written `interrupted` note do not run it. Pre-scaffold stops that write nothing never reach it. The model-mismatch branch that creates a note does.

The recipe is the one copy of the git steps (`unattended-mode.md` §"The park recipe": three writes, then the commit, then the marker). `SPEC/gate-postures.md` §"What a park is" owns the rule and points at those commands. `SPEC/plan-filing.md` keeps the 📦 fence and names this commit as outside both filing and closure. `SPEC.md` tells the foreign-dirt gate the commit is the note just written. The SOP parking paragraph states the subject and cites the recipe. `docs/EXTERNAL-AGENTS.md` records the parked ending, allows the commit at step 9, and adds the contract owner on the three-endings row. SKILL.md, loop, micro, and close-epic tell the runner to run the step.

Review fixes, same diff: the loop destructive/prerequisite commit sits inside the `When unattended-mode = true` sentence, so an attended `--loop` park does not commit. The SOP Phase 2 sentence keeps an attended destructive or prerequisite escalation as an ask; only unattended mode parks those and runs the commit. The park marker says `committed <sha> or left uncommitted`.

Budget trim, recorded because it is the refactor: `SPEC/procedures/ft-task.md` is 34198/34200. The SOP drift sentence does not repeat the commit (the parking paragraph covers every converted gate), and that paragraph says the partial work stays rather than "preserved verbatim". `SPEC/gate-postures.md` still says the partial work is preserved verbatim. The filing-duty sentence itself remains; an earlier restatement of it was removed to pay for the rule.

No new unit test. The behavior is a prose recipe. Acceptance is grep, `wc -c`, and judgment, plus `just check` for budgets and citation resolution.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface, so no `👁️ **CONFIRM**`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`grep -F -q 'chore: park <TASK-ID> — <code>' claude/skills/ft-task/unattended-mode.md` → 0

`grep -F -q 'left uncommitted' claude/skills/ft-task/unattended-mode.md` → 0

`grep -F -q 'chore: park <TASK-ID> — <code>' SPEC/gate-postures.md` → 0

`grep -F -q 'What a park is' SPEC/plan-filing.md` → 0

`grep -F -q 'chore: park <ID> — <code>' SPEC/procedures/ft-task.md` → 0

`grep -F -q 'chore: park <ID> — <code>' docs/EXTERNAL-AGENTS.md` → 0

`wc -c` → 0 against the caps: `SPEC/gate-postures.md` 21319/22000, `SPEC/procedures/ft-task.md` 34198/34200, `SPEC.md` 43748/49000, `claude/skills/ft-task/SKILL.md` 26750/33000. The subject em dash is U+2014.

`just check` → 0. Viz 647 tests, typecheck, lint, build, updater tests 77, drift-checks self-test 21, `bash tools/drift-checks.sh` all ok. An earlier run of this phase failed `pair_q` (`MISSING FILE SPEC/procedures/ft-task.md — unattended-mode.md §"The park recipe"`): a bare filename resolves beside the skill and not from `SPEC/procedures/`. The cite is now `claude/skills/ft-task/unattended-mode.md`. This receipt is the re-run from the top after that fix.

Judgment: one recipe holds the git steps. The mirrors point at it. Attended parks and a caller-written `interrupted` note stay uncommitted.

External review (read-only probe of this run's diff):

- **Blocker** — `step-5-loop-mode.md` told every loop park, attended included, to run the lone-park commit. Fixed: the commit clause is inside the `unattended-mode = true` sentence.
- **Note** — the SOP Phase 2 sentence read as if an attended destructive or prerequisite escalation parked. Fixed: `Under unattended mode` governs that park and its commit.
- **Note** — the SOP named the subject and not the recipe, so a neutral runner could improvise the git commands. Fixed: the parking paragraph cites the recipe. The SOP drift sentence and its Phase 3 full-suite and external-review sentences do not repeat the commit; the file has 2 bytes of headroom, and the parking paragraph covers every converted gate. Declined as a repeat.
- **Note** — "four writes, then the lone-park commit" counted the commit twice. Fixed: three writes, then the commit, then the marker (`unattended-mode.md`, `unattended-close-epic.md`).
- **Note** — the marker's `<committed <sha> | left uncommitted>` could be emitted literally. Fixed: `committed <sha> or left uncommitted`.
- **Note** — the three-endings row named the commit while its owners were Paper-complete and `SPEC/blocked.md`. Fixed: the owner cell adds `SPEC/gate-postures.md` §"What a park is". In-place amendment of the row, not a move, rename, or retire, so no caller-repo filing.
- **Note** — SKILL.md's external-review park, the loop `input-needed` park, and the unattended full-suite and external-review sentences did not name the commit. Fixed at those sites.

No duplication of the git steps. The SOP's shorter "stay" is the budget trim above, not a second rule.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

An unattended park now commits its tasknote alone when that note is the working tree's only uncommitted path, subject `chore: park <ID> — <code>`. Any other dirt stays uncommitted, so a clean park no longer trips the next dispatch's foreign-dirt gate.

The git steps live once, in `claude/skills/ft-task/unattended-mode.md` §"The park recipe". Contract owner: `SPEC/gate-postures.md` §"What a park is". Mirrors: `SPEC/plan-filing.md`, `SPEC.md` (foreign-dirt), `SPEC/procedures/ft-task.md`, `docs/EXTERNAL-AGENTS.md`, plus the skill sites in `touches:`. `just check` → 0 after the recipe cite was given a repo-root path so Pair Q can resolve it. `touches:` matches that deliverable set. One runner now has one commit rule, with the skip and the attended exception written next to it.

Doc-drift: `SPEC.md` updated (the foreign-dirt exemption names this commit). `docs/EXTERNAL-AGENTS.md` updated (parked ending, step 9, three-endings owner). No change: `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

No deferred operator step, so no filing and no `unattended-candidates:` line.

**Learnings:** N/A

**Archived:** 2026-10-30
