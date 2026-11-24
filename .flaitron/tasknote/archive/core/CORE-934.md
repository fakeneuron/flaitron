---
title: fixed-drift-labels
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-927, CORE-933, CORE-931.5]
touches:
  - SPEC/epic.md
  - claude/skills/ft-close-epic/SKILL.md
  - docs/AGENT-NEUTRALITY.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-934.md
---

# CORE-934 | fixed-drift-labels

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-927]] · [[CORE-933]] · [[CORE-931.5]]

## 🎯 Goal

Reword the three "fixed" doc-drift labels CORE-927 left behind (two in `claude/skills/ft-close-epic/SKILL.md`, one `SPEC/epic.md` heading) to "cumulative", and update every live citation of the heading in the same commit so `pair_q` stays green.

## ✅ Acceptance

- [x] No live "fixed doc-drift" / "fixed line" label remains in the three files — `! grep -niE 'fixed (doc-drift|line)' claude/skills/ft-close-epic/SKILL.md SPEC/epic.md docs/AGENT-NEUTRALITY.md`
- [x] The `SPEC/epic.md` heading reads "Audit acceptance — cumulative doc-drift sweep" — `grep -q '^## Audit acceptance — cumulative doc-drift sweep$' SPEC/epic.md`
- [x] Every live citer names the new heading and none names the old one — `! git grep -n 'Audit acceptance — fixed' -- . ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md'` and `git grep -c 'Audit acceptance — cumulative doc-drift sweep' -- claude/skills/ft-close-epic/SKILL.md docs/AGENT-NEUTRALITY.md SPEC/epic.md` lists all three
- [x] Drift checks (pair_q citations, context budgets, final newlines) pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `SPEC/epic.md`: rename the `## Audit acceptance — fixed doc-drift line` heading to `## Audit acceptance — cumulative doc-drift sweep`
- [x] `claude/skills/ft-close-epic/SKILL.md`: Subtask line ("fixed doc-drift sweep" → "cumulative doc-drift sweep"), Phase 4 bullet label ("(fixed line)" → "(cumulative)"), and the heading citation inside that bullet
- [x] `docs/AGENT-NEUTRALITY.md`: update the heading citation in the `SPEC/epic.md` row
- [x] Run the Acceptance commands; record receipts

## 🔗 Related

- [[CORE-927]] — parent of the wording: windowed the Acceptance line, kept the heading and the two skill labels so citers stayed valid
- [[CORE-933]] — restore-read row for that window; its restore source (`f2887f37`) is unaffected by a label rename
- [[CORE-931.5]] — surfaced this as an External review note

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN row matches HEAD: all three labels still read "fixed" (`ft-close-epic/SKILL.md:114` and `:166`, `SPEC/epic.md:92`). CORE-927 now calls the line "windowed" and the sweep "cumulative", so "fixed" is stale.

- [x] Read relevant source files — `SPEC/epic.md:85-125`, `ft-close-epic/SKILL.md:95-118` and `:162-170`, `docs/AGENT-NEUTRALITY.md:58`. Small, known read set; probe not warranted.

- [x] **Best Practices Review** — N/A: wording-only edits to markdown, no code or module boundary touched.

- [x] **Archive skim** — area `archive/core/` per the README table. Hits: [[CORE-927]] (windowed the line; its Acceptance verify commands pin the old strings, but it is archived and historical, so untouched), [[CORE-365]] (promoted the heading to a real `##` so its three citations resolve; the citers are what this task must keep resolving). Other archive hits (CORE-057.x, CORE-680, CORE-489.3) cite the section as history only, and `pair_q` excludes `tasknote/archive/`.

- [x] **Drift check** — PLAN line matches the stub and HEAD. `git grep` for the old heading finds exactly three live citers: `ft-close-epic/SKILL.md:166`, `docs/AGENT-NEUTRALITY.md:58`, and the heading itself. `ft-open-epic/SKILL.md:95` already says "cumulative doc-drift sweep" (CORE-927 review fix), `ft-close-epic/SKILL.md:97` too. No `tools/` check or anchor slug pins the old strings. `PLAN-ARCHIVE.md` CORE-365's prose names the old heading, but it is archived and append-only, so untouched.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) the stub's suggested wording "cumulative doc-drift sweep" is the target, matching the two existing sites; (2) archived tasknotes and `PLAN-ARCHIVE.md` keep the old strings; (3) the Phase 4 bullet label becomes "(cumulative)" in place of "(fixed line)".

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — CORE-927 windowed the epic-audit doc-drift Acceptance line, but three labels still call it "fixed": `claude/skills/ft-close-epic/SKILL.md` Subtask line ~114 ("fixed doc-drift sweep"), its Phase 4 bullet ~166 ("Doc-drift sweep (fixed line)"), and the `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" heading (cited by `docs/AGENT-NEUTRALITY.md`:58 and ft-close-epic). Reword them, e.g. to "cumulative doc-drift sweep". If the heading changes, update every citation in the same commit so pair_q stays green. Surfaced by CORE-931.5's External review as a note.
>
> **Resume anchor** — CORE-931.5 Phase 3: External review returned no blockers; next is recording the review and moving into Phase 4 closure.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey** — extended the existing wording: `ft-open-epic/SKILL.md:95` and `ft-close-epic/SKILL.md:97` already say "cumulative doc-drift sweep", so the three stragglers now match them.
- **Minimal refactor gate** — none; rename-only. The CORE-927 windowed-section prose in `SPEC/epic.md` and the Phase 4 bullet's "windows only the Acceptance line" sentence were left as written.
- **Tests** — N/A: no behavior changed; `pair_q` is the existing check that binds heading citations.
- Edits (4 lines): `SPEC/epic.md:92` heading → `## Audit acceptance — cumulative doc-drift sweep`; `ft-close-epic/SKILL.md:114` "fixed" → "cumulative"; `:166` label `(fixed line)` → `(cumulative)` plus its heading citation; `docs/AGENT-NEUTRALITY.md:58` heading citation.
- Closure also deletes the retired sidequest stub `.flaitron/sidequest/CORE-934.md` (tracked, so the deletion is staged: `pair_q` walks `git ls-files` and failed on the missing file until it was).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests / lint — N/A: markdown-only diff, no `viz/` or `tools/` code touched; `bash tools/drift-checks.sh` is the applicable check (below).

Verification receipt:

```text
grep -niE 'fixed (doc-drift|line)' <3 files>                              → 1 (no match)
grep -q '^## Audit acceptance — cumulative doc-drift sweep$' SPEC/epic.md → 0
git grep -n 'Audit acceptance — fixed' (excl. archives)                   → 1 (no match)
git grep -c 'Audit acceptance — cumulative doc-drift sweep' <3 files>     → 0 (1 hit each)
bash tools/drift-checks.sh                                                → 0
```

- `drift-checks.sh` first failed `pair_q` (`awk: can't open file .flaitron/sidequest/CORE-934.md`): the stub was deleted in the working tree but still indexed. Cause was demonstrated, not a transient; staging the deletion fixed it, and the re-run exited 0 with no FAILED / VACUOUS lines.
- Changed files free of duplication, dead code, and stale docs: no live "fixed" label remains; archived notes and `PLAN-ARCHIVE.md` keep the old strings by design (append-only history).
- **External review** — N/A: four one-line label/citation edits, the shape that would have skipped the tasknote; the only way to get it wrong is a missed citer, which the repo-wide `git grep` and `pair_q` already decide mechanically.
- 👁️ visual confirmation — N/A: no rendered surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the stub-delete-vs-`pair_q` ordering resolves itself once the closure commit stages the deletion; nothing for the always-loaded layer.

**Final Summary:**

Renamed the three "fixed" doc-drift labels CORE-927 left behind to "cumulative": the `SPEC/epic.md` heading is now `## Audit acceptance — cumulative doc-drift sweep`, `ft-close-epic/SKILL.md` carries "cumulative doc-drift sweep" on its Subtask line and `(cumulative)` on its Phase 4 bullet, and both live citers of the heading (that bullet and `docs/AGENT-NEUTRALITY.md:58`) name the new one. `pair_q` and the rest of `tools/drift-checks.sh` pass. The retired sidequest stub went with the closure commit.

- **Doc-drift sweep:** no change across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries beyond the `docs/AGENT-NEUTRALITY.md` citation edited above. `git grep` finds the old heading only in archived tasknotes and `PLAN-ARCHIVE.md`.
- **`touches:` reconciliation:** `git diff --name-only` = `SPEC/epic.md`, `claude/skills/ft-close-epic/SKILL.md`, `docs/AGENT-NEUTRALITY.md`, `.flaitron/PLAN.md`, this note (plus the deleted sidequest stub, retired per Step 3b). Matches the declared list.
- **Maintainability:** the epic-audit sweep now has one name across `SPEC/epic.md`, `ft-close-epic` and `ft-open-epic`. [[CORE-933]]'s restore read is unaffected (its restore source is a SHA, not a label).

**Archived:** 2026-11-24
