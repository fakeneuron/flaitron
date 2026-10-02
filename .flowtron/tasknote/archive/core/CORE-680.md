---
title: epic-forward-window
status: completed
tags: []
created: 2026-10-02
due:
related-tasks: [CORE-683]
touches:
  - SPEC/epic.md
  - .flowtron/PLAN.md
---

# CORE-680 | epic-forward-window

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-683]]

## 🎯 Goal

Delete the expired Forward-looking paragraph in `SPEC/epic.md` and record window-start `a78a8ae5`, so a later check can restore it only if a filer followed it.

## ✅ Acceptance

- [x] The `**Forward-looking.**` paragraph is gone from `SPEC/epic.md` — `rg -q '^\*\*Forward-looking\.\*\*' SPEC/epic.md` exits 1
- [x] The intro judgment sentence stays — `rg -U -q "Simpler\nimplementations don't need it — apply judgment\." SPEC/epic.md` exits 0
- [x] No live citer of the removed backfill sentence — `rg -q --hidden "existing in-flight epics need no migration" --glob '!**/.git/**' --glob '!**/archive/**' --glob '!.flowtron/tasknote/CORE-680.md'` exits 1
- [x] Window-start `a78a8ae5` is recorded in this note — `rg -q a78a8ae5 .flowtron/tasknote/CORE-680.md` exits 0
- [x] [[CORE-683]] is an unchecked Low row carrying the restore bar — `rg -q '^- \[ \] \*\*CORE-683\*\*' .flowtron/PLAN.md` exits 0

## 🧩 Subtasks

- [x] Delete the three-line Forward-looking paragraph and the extra blank line under the audit-acceptance section
- [x] Confirm the intro judgment sentence and the `**Skills.**` paragraph still read in order
- [x] Record window-start `a78a8ae5` and the eight-note restore bar in this note
- [x] File [[CORE-683]] in `## Low` as the deferred restore check

## 🔗 Related

- [[CORE-683]] — follow-up (`blocked-by:` the window): after 8 epic tasknotes archive past `a78a8ae5`, restore the paragraph only if one followed it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Unchecked Low row; paragraph still at `SPEC/epic.md` lines 99–101; no tasknote or archive file for this ID.

- [x] Read relevant source files — `SPEC/epic.md` (full), `SPEC/procedures/ft-task.md` (drive), `SPEC.md` §"Tasknote frontmatter" and §"Deferred hand-off filing", `SPEC/plan-filing.md` §"Filing commits", `SPEC/gates.md` §"Conditional skip rule", `SPEC/gate-postures.md` (the `[unattended]` → autonomous row), `docs/CONTEXT-BUDGET.md` ledger line for `SPEC/epic.md`, `claude/skills/ft-audit/passes/context.md` pass 6, `.flowtron/tasknote/README.md` §"Archive layout" and §"AI-referenced docs". Narrow read; no probe.

- [x] **Best Practices Review** — `N/A`: one prose deletion inside an existing SPEC module. No new abstraction, dependency, or code boundary.

- [x] **Archive skim** — area `archive/core/` per the README table (not derived). A path grep for `SPEC/epic.md` returns 206 notes, so the skim narrowed to the clause text (`Forward-looking`, `in-flight epics need no migration`, `don't need the bracket`): 7 hits, all read. Load-bearing: [[CORE-208.6]] (2026-05-26) cited "in-flight epics need no migration" while scaffolding, so the exemption was followed once, near the 2026-05-06 commit that added the paragraph (`f8c59d33f`). [[CORE-603.1]] cited the bracket judgment, which also lives in the module intro and stays. [[CORE-047]] inserted the audit-acceptance block immediately above this paragraph; [[CORE-057.3]] and [[CORE-057.7]] mention the block as neighbors and do not cite it as a live rule. [[CORE-445.3]] and [[CORE-662]] use "Forward-looking" for unrelated claims.

- [x] **Drift check** — lines 99–101 are still the three-line `**Forward-looking.**` paragraph. `a78a8ae5` resolves to `a78a8ae50e71` (`docs: CORE-676 — refresh the Grok 4.7 calibration row`, 2026-10-02), the audit's recorded start, not the paragraph's birth commit. No live file outside `SPEC/epic.md` cites the paragraph. The intro sentence "Simpler implementations don't need it — apply judgment." is the repeat the row names, and it stays. `docs/CONTEXT-BUDGET.md` lists `SPEC/epic.md` at 6,127 chars inside a release-remeasured cold-start sum; a shrink-only edit does not refresh that ledger (same precedent as [[CORE-659]] / [[CORE-664]]). The plan does not contradict `SPEC/epic.md`'s bracket rule or pass 6's "record a window, then re-evaluate" shape. Deferred hand-off filing requires the restore bar to be its own open PLAN row, which this note files as [[CORE-683]] rather than leaving it as recap prose.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `No clarifications needed`. Autonomous mode is implied by the row's `[unattended]` marker. Assumptions: (1) record the given SHA `a78a8ae5`, not current `HEAD`; (2) delete only the Forward-looking paragraph; (3) the restore check is [[CORE-683]], not work this task performs; (4) an epic tasknote counts when its ID is `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>` and it archives after `a78a8ae5`; (5) "followed that paragraph" means a later note skipped an in-flight migration, or skipped the Discovery+Audit bracket by citing the deleted paragraph rather than the intro judgment sentence.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

`## Completed` holds 44 checked rows, under the 60-row rotation advisory. The long description is under 70 words. Active model is Grok, medium tier; `[light]` is satisfied (over-tier proceeds silently). `[unattended]` implies autonomous mode on this attended run.

Window-start to record: `a78a8ae50e71e6fa06a0b40c508eb262da2f6c28`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same shape as [[CORE-659]]: delete the live clause, record the window-start SHA in the tasknote, and leave the re-evaluation as its own PLAN row. No new section.

- [x] **Minimal refactor gate** — deletion only. The intro judgment sentence stays, so the bracket rule is not lost. `docs/CONTEXT-BUDGET.md` left for the release remeasure.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract prose. Acceptance is `rg` checks, not a test suite.

**Implementation Notes:**

Removed the three-line paragraph and the blank line that would have doubled under `**Skills.**`. [[CORE-683]] filed at the top of `## Low` in the same closure commit (deferred hand-off; not a separate `chore: file` commit, because this task's edits are still uncommitted).

Restore bar for [[CORE-683]], keyed off `a78a8ae50e71e6fa06a0b40c508eb262da2f6c28`:

- Count an archived tasknote when its ID matches `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>` and the archive commit is after `a78a8ae5`. This note does not count.
- Restore the three lines (between the audit-acceptance section and `**Skills.**`) only if one of those eight skipped an in-flight migration, or skipped the Discovery+Audit bracket by citing the deleted paragraph rather than the intro sentence "Simpler implementations don't need it — apply judgment."
- If none did, leave the paragraph deleted and close the window.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only. The Acceptance `rg` commands are the suite.

- [x] Ran lint/type-check on changed code — `N/A`: no code.

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend change. Autonomous mode (implied by `[unattended]`) suppresses the ask.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (re-run after the review fix):

- `rg -q '^\*\*Forward-looking\.\*\*' SPEC/epic.md` → 1
- `rg -U -q "Simpler\nimplementations don't need it — apply judgment\." SPEC/epic.md` → 0
- `rg -q --hidden "existing in-flight epics need no migration" --glob '!**/.git/**' --glob '!**/archive/**' --glob '!.flowtron/tasknote/CORE-680.md'` → 1
- `rg -q a78a8ae5 .flowtron/tasknote/CORE-680.md` → 0
- `rg -q '^- \[ \] \*\*CORE-683\*\*' .flowtron/PLAN.md` → 0

Structural half: the deletion removes a repeated judgment sentence. The intro sentence stays. No new public surface. The open CORE-680 row's "lines 99–101" cite goes stale in this same commit and is removed by the stub flip, not left behind.

External review (read-only probe):

- **blocker** — `.flowtron/tasknote/CORE-680.md:25`: the no-citer `rg` had no path, so it skipped hidden `.flowtron/` and exited 1 without searching this note or `PLAN.md`. Fixed. The command now passes `--hidden` and excludes this note, whose only hit is the command quoting its own needle. A hidden-aware search finds no other non-archive hit. Re-ran → 1.
- **note** — `.flowtron/PLAN.md:28`: `Blocked by decay-window depth:` is not `Blocked by [[ID]]`, so the viz `blockedBy` field does not see it. Left. Same shape as [[CORE-660]]. `Blocked by [[CORE-680]]` would clear in this closure and show [[CORE-683]] as ready before eight epic tasknotes archive.
- **note** — `.flowtron/PLAN.md:28`: the row is shorter than the restore bar and points at this note for the bar. Left. The note is the record; the row is the pointer.
- **note** — `.flowtron/PLAN.md:30`: the still-open CORE-680 line cites lines 99–101, which are now `**Skills.**`. Fixed by the stub flip in this closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Deleted the expired Forward-looking paragraph in `SPEC/epic.md` (the 2026-05-06 backfill exemption, plus a repeat of the intro judgment sentence) and opened the restore window at `a78a8ae5`. [[CORE-683]] carries the check: after eight epic tasknotes archive past that SHA, restore the paragraph only if one followed it.

`SPEC/epic.md` lost 4 lines (the paragraph and its blank line). The audit-acceptance section now runs straight into `**Skills.**`. The intro sentence "Simpler implementations don't need it — apply judgment." is unchanged. No refactor. `docs/CONTEXT-BUDGET.md` stays for the release remeasure; the edit only shrinks `SPEC/epic.md`.

Verification: the five Acceptance `rg` commands exited 1, 0, 1, 0, 0 as recorded in Testing Notes. No test or lint run; the diff is markdown.

Doc-drift sweep, each "no change": `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. `SPEC/epic.md` is outside the sweep set. No stable-surface row moved.

`touches:` reconciliation: declared `SPEC/epic.md` and `.flowtron/PLAN.md`. The closure diff also adds this tasknote's archive move, which the reconciliation excludes. No undeclared deliverable path.

Maintainability: one less exemption for a filer to apply, and the bracket rule remains in a single sentence at the top of the module.

**Learnings:** N/A

**Archived:** 2026-10-02
