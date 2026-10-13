---
title: rotation-receipt
status: completed
tags: [closure, rotation]
created: 2026-10-12
due:
related-tasks: []
touches:
  - SPEC/post-closure.md
  - SPEC/plan-filing.md
  - SPEC/procedures/ft-task.md
  - SPEC.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-open-epic/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - docs/GLOSSARY.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-782 | rotation-receipt

[← PLAN.md](../../PLAN.md) · ✅ Completed

## 🎯 Goal

Make `## Completed` rotation hard to skip at post-closure: every closer prints the row count before 🏁, and rotates in that same response when the count is over 60.

## ✅ Acceptance

- [x] `SPEC/post-closure.md` step 2 counts `## Completed` with the release standing-check command and requires `Completed rotation: <N> rows (bound 60)` before 🏁, including when the section is under 60 — `grep -n 'Completed rotation:' SPEC/post-closure.md`
- [x] The four closing skills and the Grok/Codex/Cursor procedure name that line in the step they already restate, so a next-move checklist cannot finish the close — `grep -n 'Completed rotation:' claude/skills/ft-task/SKILL.md claude/skills/ft-close-epic/SKILL.md claude/skills/ft-open-epic/SKILL.md claude/skills/ft-release/SKILL.md SPEC/procedures/ft-task.md`
- [x] The two copies of the count command stay identical — `diff` of the awk lines in `SPEC/post-closure.md` and `claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] Context budget and Pair Q still pass — `bash tools/drift-checks.sh context_budget` and `bash tools/drift-checks.sh pair_q`

## 🧩 Subtasks

- [x] Pull rotation out of the next-move sentence in `SPEC/post-closure.md` and put the receipt on the 🏁 template
- [x] Name the receipt in `/ft-task`, `/ft-close-epic`, `/ft-open-epic`, `/ft-release`, and `SPEC/procedures/ft-task.md`
- [x] Point `SPEC/plan-filing.md`, the glossary, `SPEC.md`, and the release standing check at the same receipt
- [x] Re-run the budget and citation checks

## 🔗 Related

- CBN-358 F2 (caobunga) — pidlyse's grok close left 61 `## Completed` rows, and caobunga's own CBN-352–357 closes left 63, both without rotating. The SPEC already required the move. No upstream row had been filed.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The bound and the move procedure already exist. The miss is that step 2's skill restatements list the next-move checks and leave the count as one clause inside "suggest the next move." CBN-358's worker log ended on that list.

- [x] Read relevant source files — `SPEC/post-closure.md` step 2, `SPEC/plan-filing.md` §"`## Completed` rotation", the four closers' step-2 bullets, `SPEC/procedures/ft-task.md` §6, and the release standing check's awk. Narrow, so no probe.

- [x] **Best Practices Review** — N/A (contract prose; no module boundary)

- [x] **Archive skim** — `archive/core/` holds the rotation's own introduction (v7.0.0, CORE-779) and the pre-move grep gate, which is the pattern this task copies: a step agents were skipping became a command plus a line they must print. No superseded claim.

- [x] **Drift check** — The 60/40 bound, the legal skips (linked worktree, uncommitted edits to either file), and the release awk all match HEAD. Caobunga's 61 and 63 counts are that trial's record, not this repo's plan (this plan held 38 checked rows before this close).

- [x] Asked clarifying questions — No clarifications needed. Assumption: the operator's "make post-closure step 2 harder to skip" means a receipt the closer must print, using the count command that already exists, not a new script and not a CI failure on adopter plans.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Grok on pidlyse reads `SPEC/procedures/ft-task.md`, whose step 6 lists what post-closure "owns" and omitted rotation. Claude's skill bullets do the same under "run step 2 as written." `/ft-release` already prints a count, but only as an advisory line at release time, after the skipped closes have landed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Extended the release standing check's awk and the pre-move gate's "run this, then print the result" shape. Did not add a rotation script (`SPEC.md` core principle #2).

- [x] **Minimal refactor gate** — Edits are the receipt and the pointers to it. No unrelated cleanup.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no executable behavior; the drift checks are the regression gate)

**Implementation Notes:**

Over 60, the closer still rotates in the same response, with no prompt. `<N>` on the receipt is the count after that move. A linked worktree or uncommitted edits to `PLAN.md` / `PLAN-ARCHIVE.md` still skip the move, and the line names that skip. Any other over-60 close that prints the next-move list without the line has not finished step 2.

`ft-open-epic/SKILL.md` was at 32,734 of its 33,000 cap. The added clause leaves it at 32,860.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown contract)

- [x] Ran lint/type-check on changed code — N/A (markdown contract)

- [x] **Verification receipt** — commands recorded in Testing Notes. No new duplication: the awk lives in two places on purpose, with a keep-identical comment, because the release check runs before post-closure is loaded.

- [x] **External review** — N/A (the diff is contract prose; acceptance is the grep and drift commands below, graded here)

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

**Testing Notes:**

- `grep -n 'Completed rotation:' SPEC/post-closure.md` → the receipt is on the 🏁 template and in the step prose
- `grep -n 'Completed rotation:'` on the four skills and `SPEC/procedures/ft-task.md` → each names the line
- awk copies in `SPEC/post-closure.md` and `step-7.1-standing-checks.md` are the same command
- `bash tools/drift-checks.sh context_budget` → ok
- `bash tools/drift-checks.sh pair_q` → ok

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (the post-closure pointer now names the rotation count). `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change. `docs/GLOSSARY.md` and `docs/CONTEXT-BUDGET.md` are outside that set and were updated because they define the term and the post-closure surface.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line stubbed at the top of `## Completed`, tasknote written at `.flaitron/tasknote/archive/core/CORE-782.md`

- [x] **Evidence-based recap** drafted — see Final Summary. `touches:` matches the files this task edits plus this note and `.flaitron/PLAN.md`.

- [x] **Learnings** — N/A (the always-loaded `SPEC.md` sentence now names the count; nothing further belongs in AGENTS.md)

**Final Summary:**

Closers were treating post-closure step 2 as the next-move list, so a close could finish with `## Completed` over 60 rows and no rotation. The count is now its own action, printed as `Completed rotation: <N> rows (bound 60)` before 🏁 on every close. Over 60, the existing move still runs in that response unless the checkout is a linked worktree or either plan file has uncommitted edits, and that skip has to be named on the line.

**Archived:** 2026-10-12
