---
title: epic-audit-drift-line-window
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-659, CORE-680, CORE-683, CORE-933]
touches:
  - claude/skills/ft-close-epic/SKILL.md
  - SPEC/epic.md
  - claude/skills/ft-open-epic/SKILL.md
---

# CORE-927 | epic-audit-drift-line-window

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-659]] · [[CORE-680]] · [[CORE-683]] · [[CORE-933]]

## 🎯 Goal

Open a decay window on the `.N` audit's fixed doc-drift Acceptance line: stop `/ft-close-epic` scaffolding it, mark its SPEC section as windowed, record the window-start SHA, and file the restore-read row.

## ✅ Acceptance

- [x] The fixed Acceptance bullet and the "non-negotiable" lead-in are gone from `claude/skills/ft-close-epic/SKILL.md` — `grep -qE 'fixed line, per SPEC/epic.md|non-negotiable' claude/skills/ft-close-epic/SKILL.md` exits 1
- [x] Goal, Subtask walk and Phase 4 sweep stay — `grep -q 'cumulative doc-drift sweep across' claude/skills/ft-close-epic/SKILL.md && grep -q 'AI-referenced docs" entries — fixed doc-drift sweep' claude/skills/ft-close-epic/SKILL.md && grep -q '^- \*\*Doc-drift sweep (fixed line)\*\*' claude/skills/ft-close-epic/SKILL.md` exits 0
- [x] The Acceptance cite in Step 5 follows the renumbering — `grep -q 'Acceptance criteria 1-3' claude/skills/ft-close-epic/SKILL.md && ! grep -q 'criteria 2-4' claude/skills/ft-close-epic/SKILL.md` exits 0
- [x] `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" keeps its heading (citers stay valid) and is marked windowed — `grep -q '^## Audit acceptance — fixed doc-drift line$' SPEC/epic.md && grep -qi 'windowed' SPEC/epic.md` exits 0
- [x] Window-start SHA is recorded in this note — `grep -q f2887f37a0f1643625f558078335a56bbf2ab1fc .flaitron/tasknote/CORE-927.md` exits 0
- [x] [[CORE-933]] is an unchecked row carrying the restore bar — `grep -q '^- \[ \] \*\*CORE-933\*\*' .flaitron/PLAN.md` exits 0
- [x] CI drift checks hold — `bash tools/drift-checks.sh` exits 0

## 🧩 Subtasks

- [x] In `/ft-close-epic` Step 3, replace the Acceptance lead-in with a plain `**Acceptance (parameterized):**` and delete the fixed-line bullet
- [x] In Step 5, change the "Acceptance criteria 2-4" cite to `1-3`
- [x] In `SPEC/epic.md`, rewrite the section paragraph as windowed, naming the window-start SHA and [[CORE-933]]
- [x] Record the window-start SHA and the restore bar in Implementation Notes
- [x] File [[CORE-933]] through `/ft-file-task --unattended` once the closure paths are staged

## 🔗 Related

- [[CORE-659]] — precedent for the window shape (drop the live trigger, record the SHA, recount later)
- [[CORE-680]] — closest precedent (a SPEC/epic.md deletion with its restore row filed in the closure commit)
- [[CORE-683]] — the restore-row shape: a `Blocked by decay-window depth:` lead and no `[[ID]]` blocker
- [[CORE-933]] — follow-up (`blocked-by:` the window): after 5 `.N` audits archive past the window-start, restore the line only if one missed drift

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Unchecked Low row; the fixed bullet, its lead-in and the `criteria 2-4` cite are all still at `claude/skills/ft-close-epic/SKILL.md` lines 99, 102 and 145; no tasknote, stub or archive file for this ID.

- [x] Read relevant source files — `claude/skills/ft-close-epic/SKILL.md` (full), `SPEC/epic.md` (full), `SPEC/blocked.md`, `SPEC/gate-postures.md`, `claude/skills/ft-task/unattended-mode.md`, `SPEC/plan-filing.md` §"ID allocation" and §"Filing commits", `claude/skills/ft-file-task/SKILL.md`, `.flaitron/tasknote/README.md` §"AI-referenced docs", `claude/skills/ft-audit/passes/context.md` pass 6, and the CORE-680 archived note. Narrow read; no probe.

- [x] **Best Practices Review** — `N/A`: prose edits in one skill body and one SPEC module. No code, dependency boundary or abstraction.

- [x] **Archive skim** — area `archive/core/` per the README table (not derived). A path grep for the skill file is wide, so the skim narrowed to the clause text and the window shape: [[CORE-680]] (SPEC/epic.md deletion; window-start recorded in the note; restore row [[CORE-683]] filed in the closure commit), [[CORE-659]] (the worked instance; first drop of a live trigger), [[CORE-724.7]] (same shape; restore row with a `Blocked by decay-window depth:` lead, no `[[ID]]` blocker), [[CORE-047]] (inserted the audit-acceptance block), [[CORE-727]] (a precedent read that closed a window by recount). [[CORE-057.3]] and [[CORE-057.7]] mention the block as a neighbor and do not cite it as a live rule.

- [x] **Drift check** — the PLAN row still matches HEAD. Line 99 carries the lead-in ("…and is non-negotiable"), line 102 the fixed bullet, line 115 the Subtask walk, line 167 the Phase 4 sweep. Two things the row does not name: (1) Step 5 (line 145) cites "Acceptance criteria 2-4", which becomes `1-3` once the first bullet goes, a stranded citer inside the same file that this task fixes; (2) `claude/skills/ft-open-epic/SKILL.md:95` calls the filed `.N` row "(fixed doc-drift sweep acceptance line)" and `docs/AGENT-NEUTRALITY.md:58` names the SPEC heading. Both cite the heading, which stays, so neither strands; neither is edited (outside the row and outside `touches:`). The Phase 4 sweep line (167) still says "contractually-required… never skip" and cites the same heading; the row says to keep the Phase 4 sweep, so it stays verbatim, and the window measures whether the Acceptance bullet adds anything beyond that sweep plus the Subtask walk. `unattended-close-epic.md` has no doc-drift text. Window-start: HEAD `1eb5e5460829ee7c0d524b5fdc3dd08c20e1773c` is the last commit carrying the line, so it is the restore source. SPEC/epic.md is not in the context-budget CI caps (ledger row only).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `No clarifications needed`. Assumptions: (1) the window-start is current HEAD `1eb5e546…`, the last commit that still has the line; (2) the SPEC heading is kept and only the paragraph under it changes, so every citer stays valid; (3) the restore row is [[CORE-933]] (next free CORE number: max found was 932), filed in `## Low` via `/ft-file-task --unattended` at closure so it rides the closure commit; (4) a `.N` audit counts toward the bar when its note archives after `1eb5e546` — this note does not count; (5) "missed drift" means an audit's Phase 4 sweep or a later task's sweep found cumulative slice-local staleness that the dropped Acceptance line would have caught.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Window-start to record: `1eb5e5460829ee7c0d524b5fdc3dd08c20e1773c` (`chore: park CORE-931.7 — drift`), the last commit in which the fixed bullet exists. Restore source for the line and its lead-in.

Skip-tier advisory: the row reads as full (two contract files, a SPEC edit, a filing), invoked as full; no mismatch.

Discovery surfaced no deviation from the row → proceed. Size estimate: ~25 lines (rename-aware).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same shape as [[CORE-659]] / [[CORE-680]]: delete the live trigger, keep the heading, record the window-start SHA in this note, and leave the re-evaluation as its own PLAN row.

- [x] **Minimal refactor gate** — deletion plus one rewritten SPEC paragraph and one renumbered cite. Unrelated cleanup deferred (see Implementation Notes).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract prose. Acceptance is grep checks plus the drift checks.

**Implementation Notes:**

**Resume anchor.** Phase 2 edits are complete and uncommitted in the working tree (`SPEC/epic.md`, `claude/skills/ft-close-epic/SKILL.md`). Left to do on resume: settle the red `pair_q` (an operator call — fix `CORE-931.5.md`'s citation first, or close over it), run the External review (`/code-review medium` over this task's diff only), file [[CORE-933]] in `## Low` through `/ft-file-task --unattended` once the closure paths are staged (the SPEC paragraph already cites it), then Phase 4. Do not re-run Discovery.

**Resumed 2026-11-24 (attended).** Operator chose to fix the citation first: `f2887f37` repaired `CORE-931.5.md`'s `unattended-mode.md` path on its own, and `pair_q` went green. The window-start moved from `1eb5e546` to `f2887f37` (review finding 1): the line survives in every commit until this closure lands, so the window opens at this closure's parent.

Restore bar for [[CORE-933]], keyed off `f2887f37a0f1643625f558078335a56bbf2ab1fc`:

- Count an archived tasknote when its ID matches `<AREA>-EPIC-<N>.N` or any `.N` audit child and its archive commit is after `f2887f37`. This note does not count.
- Restore the Acceptance bullet and its "non-negotiable" lead-in (from `f2887f37`, `claude/skills/ft-close-epic/SKILL.md` Step 3) and un-window the SPEC paragraph only if one of the five audits missed cumulative doc-drift the Phase 4 sweep did not catch, or an audit skipped the sweep because the Acceptance line was gone.
- If none did, leave the line dropped and close the window.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full validation set under `--unattended` (`just check`); see Testing Notes for the one red

- [x] Ran lint/type-check on changed code — `just check` runs `lint` and `typecheck` as dependencies before its body; both ahead of the failing line

- [x] **Verification receipt** — Acceptance commands run; all seven exit as specified on the resumed run (see Testing Notes → Resume receipt)

- [x] **External review** — `/code-review medium` over the uncommitted diff: 2 important, 2 nits, all fixed inline. (1) window-start `1eb5e546` → `f2887f37`; (2) [[CORE-933]] not yet filed → filed in this closure commit; (3, nit) the `ft-close-epic` Phase 4 bullet called the sweep "contractually-required" under a windowed section → now says only the Acceptance line is windowed, never skip; (4, nit) `ft-open-epic/SKILL.md:95` `.N` row template named the "fixed doc-drift sweep acceptance line" → "cumulative doc-drift sweep" (added to `touches:`)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrail at Phase 3 entry — paths: `SPEC/epic.md`, `claude/skills/ft-close-epic/SKILL.md` (both in `touches:`) and this note; size 19 lines against the 400 cap. Clear.

Acceptance receipt:

- `grep -qE 'fixed line, per SPEC/epic.md|non-negotiable' claude/skills/ft-close-epic/SKILL.md` → 1
- Goal, Subtask walk, Phase 4 sweep `grep` chain → 0
- `grep -q 'Acceptance criteria 1-3' … && ! grep -q 'criteria 2-4' …` → 0
- `grep -q '^## Audit acceptance — fixed doc-drift line$' SPEC/epic.md && grep -qi 'windowed' SPEC/epic.md` → 0 (the first draft of this command was case-sensitive and exited 1 against the capitalised "Windowed"; fixed the command, not the SPEC)
- `grep -q f2887f37a0f1643625f558078335a56bbf2ab1fc .flaitron/tasknote/CORE-927.md` → 0
- `grep -q '^- \[ \] \*\*CORE-933\*\*' .flaitron/PLAN.md` — not run; the row is filed at closure and the run parked first
- `bash tools/drift-checks.sh` → 1
    MISSING FILE  .flaitron/tasknote/CORE-931.5.md — unattended-mode.md §"Scope guardrails"  (then `pair_q FAILED`)

Full validation set: `just check` (test, typecheck, lint, build as dependencies, then the node tests and `bash tools/drift-checks.sh`) → 1, failing only at the last line. Every other drift check printed `ok`, including `pair_q`'s other citations, and `SPEC/epic.md` and the skill body raised no STALE SECTION.

Why it is not this diff's: `CORE-931.5.md` is tracked and untouched here (`git diff HEAD -- .flaitron/tasknote/CORE-931.5.md` is empty); it entered HEAD at `a577f53c chore: park CORE-931.5 — out-of-scope`, three commits ago. Fixing it means editing another task's parked note, which the scope guardrail names as out of scope, so the run parks instead of closing over it.

**Resume receipt (2026-11-24, attended, after `f2887f37` and the review fixes):** c1 → 1; c2, c3, c4, c5 → 0; `grep -q '^- \[ \] \*\*CORE-933\*\*' .flaitron/PLAN.md` → 0; `bash tools/drift-checks.sh` → 0; `just check` → 0. Scope: four deliverable paths (`SPEC/epic.md`, both epic skill bodies, PLAN.md) plus this note; `ft-open-epic/SKILL.md` added to `touches:` for review finding 4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change across all entries. The README intro (line 47) still holds: the sweep runs at every epic-audit subtask, and only the Acceptance line is windowed. `docs/AGENT-NEUTRALITY.md:58` names the kept heading. `SPEC.md` and the snippets carry no fixed-line text (`git grep -iE 'fixed doc-drift|doc-drift line'` hits only the kept heading, its two skill citers and the PLAN row)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the window's start rule (the closure's parent, not the last SHA read at Discovery) is task-local and is recorded in Implementation Notes

**Final Summary:**

Dropped the `.N` audit's fixed doc-drift Acceptance line and its "non-negotiable" lead-in from `/ft-close-epic` Step 3, renumbered the Step 5 cite to criteria 1-3, and marked `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line" as windowed from `f2887f37`. Review fixes: the window-start moved to `f2887f37`; the close-epic Phase 4 bullet now says only the Acceptance line is windowed; the `/ft-open-epic` `.N` row template reads "cumulative doc-drift sweep". [[CORE-933]] was filed in `## Low` as the restore-read row. `touches:` matches `git diff --name-only` plus PLAN.md and this note. The audit's walk and its Phase 4 sweep are unchanged, so maintainability holds; a later reader will find the restore source at `f2887f37`.

unattended-candidates: none

**Archived:** 2026-11-24
