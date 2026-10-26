---
title: epic-filing-entry
status: blocked
park-reason: drift — Phase 1 complete; operator retagged the row [frontier] so the Phase 2 seam design runs on Fable @ high
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-769.1, CORE-766, CORE-741.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-836 | epic-filing-entry

[← PLAN.md](../PLAN.md) · ⏸ Blocked · 🔗 [[CORE-769.1]]

## 🎯 Goal

Settle how `/ft-open-epic` hands its `[frontier]` `.1` Discovery to the right model, and file the implementation row that lands the design.

## ✅ Acceptance

- [ ] Design for the file→drive model seam written up in Implementation Notes: gate placement, STOP branches, resume entry, `--deep` interaction, mirrors, budget plan — `judgment`: a design call, no command decides it
- [ ] One implementation row filed in `.flaitron/PLAN.md` (≤70w, `[model]` per `SPEC/model.md`) — `grep -cE '^- \[ \] \*\*CORE-[0-9]+\*\* .*\| open-epic-model-seam' .flaitron/PLAN.md` → 1
- [ ] Drift checks stay green — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [ ] Phase 2 (on Fable): draft the seam design against the Resolved scoping table
- [ ] Draft the implementation row, word-count it, run the reconciliation scan against CORE-835/CORE-641
- [ ] File the row; record the design in Implementation Notes
- [ ] Phase 3: `bash tools/drift-checks.sh`; External review `N/A` (filed row, not a diff)
- [ ] Phase 4: doc-drift sweep, flip CORE-836 to stub, archive

## 🔗 Related

- [[CORE-769.1]] — settled the `ft-open-epic` / `ft-file-task` / `ft-close-epic` names; precedent cost of a rename
- [[CORE-766]] — the `[frontier]` chooser clause in `/ft-open-epic` Step 2 item 4
- [[CORE-741.2]] — origin of the `[frontier]` rung and its "Heavy-epic Discovery" trigger

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope — the work is unchanged, but the `[model]` tag goes from `[heavy]` to `[frontier]` (operator, at clarifications). The note is parked for a Fable session.
  **Rationale:** The gap is real at HEAD. `/ft-open-epic` Step 2 item 4 files a `[heavy]`/`[frontier]` epic's `.1` as `[frontier]`, and Steps 5–6 go straight into driving it. No model gate runs between the filing and the drive, so the `.1` runs on whatever model filed it.

- [x] Read relevant source files — `claude/skills/ft-open-epic/SKILL.md` (whole file), `claude/skills/ft-task/preamble.md` §"Model gate", `claude/skills/ft-task/step-1.5-model-edge.md`, `SPEC/epic.md` §"Epic lifecycle", `SPEC/model.md` §"Category-vs-concrete matching" + §"When to choose `[frontier]`", `claude/skills/ft-file-task/SKILL.md`.

- [x] **Best Practices Review** — boundary question, not code. Filing lives in `/ft-file-task` (three weights). Epic `.1` driving lives only in `/ft-open-epic` Steps 5–10. `/ft-task` can run a `.1` (`SPEC/epic.md` lifecycle step 2: "`/ft-task <ID>.1` if filed manually") but has none of `/ft-open-epic`'s `.1`-specific behaviour. A file-only path that hands off to `/ft-task` would therefore duplicate or lose Steps 5–10.

- [x] **Archive skim** — `archive/core/` (README row confirmed). 25 notes cite `ft-open-epic`. The load-bearing ones:
  - CORE-769.1 settled the current names: `ft-epic-discovery`→`ft-open-epic`, `ft-file-followup`→`ft-file-task`, as a pair with `ft-close-epic`. The rename was a hard-cut BREAKING major (v7.0.0) touching 25–50 files per slug: four snippet roster blocks, `SPEC/layout.md`, `docs/PLATFORMS.md`, `AGENTS.md`, `docs/GLOSSARY.md`, the `skill_pin_guard_parity`/`shipped_skill_parity` slug lists, and the codex wrappers. Probe B also found the tooling treats a rename as retire + add.
  - CORE-766 added the trigger-only `[frontier]` chooser clause to Step 2 item 4. It changed only how the token is picked, not whether anything gates on it.
  - CORE-741.2 is where the `[frontier]` rung and its "Heavy-epic Discovery" trigger came from.

- [x] **Drift check** — PLAN line matches HEAD. `SPEC/model.md` §"When to choose `[frontier]`" lists "Heavy-epic Discovery" as a trigger, and `/ft-open-epic` Step 2 item 4 applies it. `/ft-task`'s gate for a category tag above the active tier is the advisory "Category under-tier" branch (⚠️ note, proceed), not a STOP. So even the hand-filed `/ft-task <ID>.1` path would only warn a run that's below the tagged tier. Budget: `ft-open-epic/SKILL.md` is 32,906 of its 33,000-byte cap (`docs/CONTEXT-BUDGET.md`), so any gate text must go in a lazy fragment or be paid for with trims. Self-check: this task changes a workflow contract, which is a `[frontier]` trigger ("Contract or architecture design"), yet it was filed `[heavy]`. That's the same kind of under-tagging the task is about, so it's raised as a clarifying question.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Resolved scoping** (operator, 2026-10-26):

| Question | Answer | Consequence |
|---|---|---|
| Direction | Gate inside `/ft-open-epic` | No new slug, no rename, no `/ft-file-task --epic`; the open/close pair from CORE-769.1 stays |
| Gate strength | STOP with a choice | After the Step 4 filing commit, before the Step 5 scaffold. When `.1`'s tag outranks the active model: stop (the filing is already committed; resume on the right model) or proceed here. Stronger than `/ft-task`'s advisory under-tier note |
| CORE-836 deliverable | Decision + one filed implementation row | No skill/SPEC edits in this task |
| This task's model | Retag `[frontier]`, park for Fable | Changing a workflow contract is a `[frontier]` trigger; Phase 2 design runs on Fable @ high |

**Open design points for Phase 2** (each to be decided in the implementation row or written into it):
1. **Resume entry.** The proposal is `/ft-open-epic <AREA>-<N>.1`, which accepts an already-filed `.1` and jumps to Step 5. Step 1.5 only accepts `--deep` today. Decide how the run recovers its locked inputs (area, shortname, M, epic model) from the filed parent/`.1`/`.N` rows. Decide how `--deep` combines with the resume. Decide whether an existing `.1` tasknote gets refused the way `/ft-task` refuses an in-flight one.
2. **The proceed-here branch.** Either keep `.1`'s tag (as `/ft-task`'s under-tier branch does) or retag it to the active tier (as the concrete-mismatch "retag" option does). Choose one and say why.
3. **Placement and budget.** `SKILL.md` has 94 B of headroom. Put the gate and resume entry in a lazy fragment (precedent: `step-5.5-deep-prepass.md`), and trim `SKILL.md` to pay for the pointer.
4. **Mirrors.** Update `codex/skills/ft-open-epic/`, any `SPEC/procedures/` equivalent, `SPEC/epic.md` lifecycle step 2 (the resume entry), the `argument-hint:` / `description:` frontmatter, the flag rosters checked by `pair_s`, `docs/GLOSSARY.md`, and `docs/CONTEXT-BUDGET.md`. Confirm each one with grep before writing the row.
5. **Hand-filed `.1` via `/ft-task`.** Is pointing `/ft-task <ID>.1` users at `/ft-open-epic <ID>.1` in scope? Default: no — the implementation row may cite it as a follow-up.
## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — extended an existing pattern or justified a new shape

- [ ] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [ ] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [ ] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [ ] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [ ] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [ ] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Archived:** YYYY-MM-DD
