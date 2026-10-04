---
title: rotation-bound-and-ledger
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-604, CORE-604.1, CORE-604.2, CORE-604.3, CORE-595]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
touches:
  - SPEC/plan-filing.md
  - claude/skills/ft-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - docs/MIGRATION.md
  - docs/GLOSSARY.md
  - templates/PLAN.md
  - SPEC.md
  - docs/EXTERNAL-AGENTS.md
  - .flowtron/PLAN.md
  - .flowtron/PLAN-ARCHIVE.md
  - docs/CONTEXT-BUDGET.md
parallel-safe-with:
  - CORE-604.2
---

# CORE-604.4 | rotation-bound-and-ledger

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-604]]

## 🎯 Goal

Lower the `## Completed` rotation trigger from 150 to 60 rows (mirrored across `SPEC/plan-filing.md` and both runner-facing Step 1 checks), rotate flowtron's own overgrown `## Completed` section under the new threshold, and add a default-path cold-start sum line to `docs/CONTEXT-BUDGET.md` §Ledger.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` §"`## Completed` rotation" states a single 60-row threshold (bound and advisory collapsed into one number, per operator decision) and the granularity rule no longer requires whole calendar months or exempts the current month — `grep -c '\*\*60\*\*' SPEC/plan-filing.md` → 2; `grep -c '\*\*100\*\*\|\*\*150\*\*' SPEC/plan-filing.md` → 0 (the historical footnote uses bare `100`/`150`, not the bolded operative form)
- [x] `claude/skills/ft-task/SKILL.md` Step 1 and `SPEC/procedures/ft-task.md` (the SOP) both check for **60**, mirroring each other — `grep -c '\*\*60\*\*' claude/skills/ft-task/SKILL.md SPEC/procedures/ft-task.md` → 1 each
- [x] Mirror docs restating the old `150` figure (`docs/MIGRATION.md`, `docs/GLOSSARY.md`, `templates/PLAN.md`) updated to `60` — `grep -rl '150' docs/MIGRATION.md docs/GLOSSARY.md templates/PLAN.md` → no output
- [x] flowtron's own `.flowtron/PLAN.md` `## Completed` section rotated to at/near the new bound, oldest rows moved verbatim into `.flowtron/PLAN-ARCHIVE.md` under a `## Completed 2026-09` heading, no epic cohort split, operator confirmed the exact rule and row count before the move — `grep -c '^\s*- \[x\]' <(awk '/^## Completed$/{f=1} f' .flowtron/PLAN.md)` → 57; `awk '/^## Completed 2026-09$/{f=1} /^## Completed 2026-08$/{f=0} f' .flowtron/PLAN-ARCHIVE.md | grep -c '^\s*- \[x\]'` → 88; 57+88=145 (original count) — `judgment` on cohort-integrity (verified manually row-by-row, no automated cohort parser exists)
- [x] `docs/CONTEXT-BUDGET.md` §Ledger carries a "Default-path cold start" sum line (stub + skill + SPEC + README + template + gates + plan-filing + epic), explicitly labeled a ledger row and not a budget — `grep -q 'Default-path cold start' docs/CONTEXT-BUDGET.md` → 0
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — see Phase 4

## 🧩 Subtasks

- [x] Resolve the bound-vs-advisory ambiguity with the operator (the PLAN.md line only said "advisory", but the epic-closure summary and the projected char-count savings only make sense if the two numbers collapse into one) — AskUserQuestion, operator chose "collapse to a single 60 threshold"
- [x] Resolve the "nothing to rotate — all 145 rows are the current month" surprise with the operator; operator additionally asked to simplify the granularity rule itself (drop whole-month / never-current-month, rotate by row count)
- [x] Edit `SPEC/plan-filing.md` §"`## Completed` rotation": single 60-row bound, row-count granularity, drop the "never rotate current month" rule, keep "never split a cohort", rewrite the append-only note to allow appending to a still-open month heading
- [x] Edit `claude/skills/ft-task/SKILL.md` Step 1 advisory check (150→60, "month blocks"→"rows")
- [x] Edit `SPEC/procedures/ft-task.md` SOP advisory check (150→60, mirroring the skill)
- [x] Update the three mirror docs that restated the old figure: `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `templates/PLAN.md`
- [x] Small wording fixes in `SPEC.md` and `docs/EXTERNAL-AGENTS.md` ("month blocks" phrasing no longer accurate under row-count granularity) — same mechanism, same edit, encountered while sweeping citations of the changed rule
- [x] Fix a stale citation in `.flowtron/PLAN-ARCHIVE.md`'s own preamble (pointed at `SPEC/tasknote-selection.md`, moved to `SPEC/plan-filing.md` by CORE-595) — found while editing the same paragraph for the append-only nuance
- [x] Compute the actual rotation split for flowtron's own PLAN.md (145 rows, all September 2026; cohort-aware boundary lands at keep-57/archive-88, not keep-60/archive-85, because the CORE-EPIC-574 cohort straddles the 60-row line and cohorts never split)
- [x] Move the 88 oldest rows verbatim into a new `## Completed 2026-09` heading at the top of `.flowtron/PLAN-ARCHIVE.md`; delete the same rows from `.flowtron/PLAN.md`
- [x] Measure the 8 default-path surfaces (`wc -c`) and add the ledger sum line to `docs/CONTEXT-BUDGET.md` §Ledger, noting it's measured fresh (not pulled from the table's standing v5.28.0 figures)

## 🔗 Related

- [[CORE-EPIC-604]] — parent epic
- [[CORE-604.1]] — Discovery; scoped this child and resolved "rotation bound lowered to 60, operator-confirmed month blocks" in its Resolved Scoping table
- [[CORE-604.2]] — Fan-out parallel-safe sibling (gate-postures split); no actual file overlap encountered
- [[CORE-604.3]] — predecessor in sequence; trimmed the same `SKILL.md`/`SPEC/procedures/ft-task.md` bodies this task also edits, so this task's edits build on its trimmed baseline
- [[CORE-595]] — split `tasknote-selection.md` into `plan-filing.md`; this task edits the rotation contract that landed there

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed epic child with a clear, bounded scope (three concrete deliverables: lower a threshold, perform one rotation, add one ledger line). No re-scope of the epic itself; the granularity-rule simplification that emerged during clarification is a refinement of the filed rotation-bound work, not new epic scope.

- [x] Read relevant source files — `SPEC/plan-filing.md` §"`## Completed` rotation" in full, `claude/skills/ft-task/SKILL.md` Step 1, `SPEC/procedures/ft-task.md` §2 advisory, `.flowtron/PLAN.md` in full, `.flowtron/PLAN-ARCHIVE.md` preamble + heading structure, `docs/CONTEXT-BUDGET.md` §Ledger.

- [x] **Best Practices Review** — `N/A` — markdown contract + one data-file rotation, no code module boundaries.

- [x] **Archive skim** — `.1`'s own Discovery Notes (§A/§B/§E) already carried the load-bearing precedent for this child (measured surfaces, resolved scoping table naming "bound lowered to 60, operator-confirmed month blocks"); read it directly rather than re-grepping `archive/core/` for `SPEC/plan-filing.md` (11 hits per `.1`'s own count) — the parent epic's own Discovery is the higher-signal source for a child it scoped minutes earlier. No other archived tasknote materially bears on the rotation-bound change.

- [x] **Drift check** — `SPEC/plan-filing.md`'s cited numbers (100-row bound, 150-row advisory) matched current HEAD at read time. One drift found and fixed in passing: `.flowtron/PLAN-ARCHIVE.md`'s own preamble still cited `SPEC/tasknote-selection.md` for the rotation contract, which CORE-595 moved to `SPEC/plan-filing.md` — same file/section I was already editing for the append-only nuance, fixed inline.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — two rounds of AskUserQuestion; see Discovery Notes below.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit.

**Discovery Notes:**

**Ambiguity #1 — bound vs. advisory.** The PLAN.md line says "lower the rotation *advisory* from 150 to 60", naming only one of the two numbers `SPEC/plan-filing.md` defines (100-row bound = rotation target, 150-row advisory = nag trigger, with the 50-row gap explained as deliberate hysteresis). Lowering only the advisory to 60 while leaving the bound at 100 would put the nag trigger *below* the target it's supposed to be nagging about — the hysteresis framing breaks. Cross-checked against `.1`'s own Resolved Scoping table ("bound is lowered to 60") and its Final Summary's projected savings (129k → 116k chars "once flowtron's own PLAN.md is rotated"), which only add up if the actual rotation target drops toward 60, not just a nag trigger sitting above an unchanged 100-row target. Asked the operator directly; they confirmed **collapse to a single 60-row threshold** after a clarifying round (they initially asked for a plainer explanation of bound vs. advisory vs. "rotation" itself, which is captured in the transcript, not reproduced here).

**Ambiguity #2 — nothing to rotate.** All 145 current `## Completed` rows are dated September 2026, today's calendar month. The (then-standing) "never rotate the current calendar month" rule would have made this subtask a no-op. Surfaced this to the operator; rather than accept the no-op, they asked to **drop the whole-month / never-current-month granularity rule entirely** and rotate by row count instead, since "there's no need to hold onto a whole month's completed tasks." Confirmed the concrete rewording before implementing (quoted back the exact new rule text for sign-off).

**Downstream-impact scan (SPEC/tasknote-selection.md §"Downstream-impact reconciliation").** The granularity-rule change is direction-changing (it edits a `SPEC/plan-filing.md` contract clause beyond what the PLAN.md line described), but it was resolved through an explicit operator confirm-before-implement exchange in Phase 1 Discovery, which is the review this scan would otherwise force — no separate scan needed since the operator already made the call with full context.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing "lazy SPEC module + mirror docs" citation pattern (no new shape); the rotation-file edit followed the archive's own established month-heading convention (newest month first, verbatim rows, no interior blank lines between cohorts within a block — confirmed against the existing `## Completed 2026-08` block before writing the new `## Completed 2026-09` one)

- [x] **Minimal refactor gate** — touched `SPEC.md` and `docs/EXTERNAL-AGENTS.md` beyond the two files the PLAN.md line named, but only for the exact phrase ("month blocks") that the granularity-rule change made inaccurate — same fact, same edit, not adjacent cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — no executable surface; verification is `grep`/`awk` receipts (below)

**Implementation Notes:**

- **Rotation math.** 145 rows total, all September 2026. Target ≤60 kept. Walking from the oldest row upward in cohort-atomic units, the boundary lands mid-way through the CORE-EPIC-574 cohort (parent + 5 children, indices 58–63 from the top): including the whole cohort in the kept set gives 63 (above 60), excluding it gives 57 (below 60). Per "never split a cohort" + "at or below the bound", stopped at **57 kept / 88 archived** rather than forcing exactly 60.
- Moved the 88 oldest rows verbatim (stripped 3 interior blank lines that existed in `PLAN.md`'s own formatting between epic cohorts — not present in any existing archive month block, so dropped for archive-style consistency; the row *text* itself is untouched) into a new `## Completed 2026-09` heading, inserted above the existing `## Completed 2026-08` heading (newest month first).
- `SPEC.md` and `docs/EXTERNAL-AGENTS.md` word-choice fixes ("older month blocks spill verbatim" / "moved verbatim in month blocks") are the same single fact — rotation is no longer whole-month-triggered — surfacing in two more places; not new scope, same edit rippling to its citations.
- Fixed one pre-existing stale citation in `.flowtron/PLAN-ARCHIVE.md`'s preamble (`SPEC/tasknote-selection.md` → `SPEC/plan-filing.md`, stale since CORE-595) while rewriting the same paragraph for the append-only nuance.
- `docs/CONTEXT-BUDGET.md` ledger sum uses numbers measured fresh at filing (post this task's own edits to `SKILL.md` and `plan-filing.md`), not the table's standing v5.28.0 figures — noted explicitly in the new paragraph to avoid an apparent-drift red herring for the next reader. Did **not** refresh the pre-existing table rows for the same files (`SKILL.md` 28,291, `plan-filing.md` 15,263 — both now stale) since that refresh is `/ft-release` §7.1's job, not this task's; flagged here so it isn't lost.
- Downstream-impact scan already covered in Discovery Notes (the one direction-changing decision was resolved with the operator before implementation, not mid-execution).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown + one data-file edit, no executable surface

- [x] Ran lint/type-check on changed code — `N/A` — markdown only; no linter configured for `.md`/`SPEC/*.md`

- [x] **Verification receipt** — recorded below; confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation beyond the one known-and-flagged residual (the two un-refreshed ledger table rows, explicitly out of scope and noted)

- [x] (frontend) Asked the user for visual confirmation — `N/A` — no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -c '\*\*60\*\*' SPEC/plan-filing.md                                          → 0  (output 2)
grep -c '\*\*100\*\*\|\*\*150\*\*' SPEC/plan-filing.md                            → 0  (output 0)
grep -c '\*\*60\*\*' claude/skills/ft-task/SKILL.md                               → 0  (output 1)
grep -c '\*\*60\*\*' SPEC/procedures/ft-task.md                                   → 0  (output 1)
grep -rl '150' docs/MIGRATION.md docs/GLOSSARY.md templates/PLAN.md               → 1  (no output, all clean)
grep -c '^\s*- \[x\]' <(awk '/^## Completed$/{f=1} f' .flowtron/PLAN.md)          → 0  (output 57)
awk '/^## Completed 2026-09$/{f=1} /^## Completed 2026-08$/{f=0} f'
  .flowtron/PLAN-ARCHIVE.md | grep -c '^\s*- \[x\]'                               → 0  (output 88)
grep -q 'Default-path cold start' docs/CONTEXT-BUDGET.md                          → 0
grep -n ' $' <all 11 touched files>                                               → 1  (no trailing whitespace)
tail -c1 .flowtron/PLAN.md .flowtron/PLAN-ARCHIVE.md | grep -c .                  → confirmed final newline on both
```

57 + 88 = 145 (original checked-row count, confirmed no row lost or duplicated). CI's `drift` job's "Context budget" step reads only the `## Budgets` table span (`## Budgets` through `## Known over budget`) — the `## Ledger` section this task edits sits entirely outside that span, so the new sum line cannot trip CI.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change · `AGENTS.md` no change · `SPEC.md` updated (one-phrase wording fix, "month blocks" → "the oldest rows", same rotation-bound fact this task changed) · `docs/MIGRATION.md` updated (150→60, month-block→row-count wording) · `claude/AGENTS-snippet.md` no change (generic "outgrows its bound" phrasing, no number to drift) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (its `plan-filing.md` ledger row already citations-only, no number) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (one-phrase wording fix, "moved verbatim in month blocks" → "moved verbatim and grouped by month") · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

  Not on the sweep list but edited for direct consistency: `docs/GLOSSARY.md` (150→60, month-block wording), `templates/PLAN.md` (~150→~60, month-block wording), `.flowtron/PLAN-ARCHIVE.md` (stale `SPEC/tasknote-selection.md` citation → `SPEC/plan-filing.md`; append-only nuance), `docs/CONTEXT-BUDGET.md` (new ledger row — this task's own deliverable, not a drift fix).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and kept nested beneath the active `CORE-EPIC-604` parent (epic still open — `.N` remains); tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Lowered flowtron's `## Completed` rotation trigger from a two-number 100-row-bound/150-row-advisory split to a single 60-row threshold, and simplified the granularity rule from "whole complete calendar months, never the current month" to "oldest rows by count, current month included, cohorts never split" — both changes made in direct consultation with the operator after the literal PLAN.md line ("lower the advisory to 60") proved internally inconsistent with the unchanged 100-row bound, and after discovering the *literal* current-month rule would have made "rotate flowtron's own Completed" a no-op (all 145 rows were September 2026). Performed the first rotation under the new rule: 88 oldest rows (cohort-atomic, landing at 57 kept rather than exactly 60 because the CORE-EPIC-574 cohort straddles the line) moved verbatim from `.flowtron/PLAN.md` into a new `## Completed 2026-09` heading in `.flowtron/PLAN-ARCHIVE.md`. Added a "Default-path cold start" ledger row to `docs/CONTEXT-BUDGET.md` summing the 8 files a flagless epic-subtask `/ft-task` reads before Phase 1 writes: 139,621 chars (≈35k tokens), down from `.1`'s ≈172k-char v5.28.0 baseline for the same shape of run.

- Files: `SPEC/plan-filing.md`, `claude/skills/ft-task/SKILL.md`, `SPEC/procedures/ft-task.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `templates/PLAN.md`, `SPEC.md`, `docs/EXTERNAL-AGENTS.md`, `.flowtron/PLAN.md`, `.flowtron/PLAN-ARCHIVE.md`, `docs/CONTEXT-BUDGET.md`.
- Verification: see Phase 3 Testing Notes receipt block; 57+88=145 row-count reconciliation; no trailing whitespace; both edited data files end with a final newline.
- Refactors: none. Two pre-existing ledger-table rows (`SKILL.md`, `plan-filing.md` byte counts) are now stale from this task's own edits; deliberately left for `/ft-release` §7.1's standing refresh rather than partially refreshing the table here — flagged in Implementation Notes so it isn't silently lost.
- Documentation verdict: 2 swept-doc updates (`SPEC.md`, `docs/MIGRATION.md`), 1 swept-doc wording fix (`docs/EXTERNAL-AGENTS.md`), 3 non-swept mirror updates (`docs/GLOSSARY.md`, `templates/PLAN.md`, `.flowtron/PLAN-ARCHIVE.md` preamble), 14 swept docs unchanged.
- `touches:` reconciliation: `git diff --name-only` — matches the declared `touches:` list exactly (11 files, no undeclared paths).
- Maintainability effect: the bound/advisory split had drifted into describing a gap nothing depended on (CI never checks it, only the informational advisory fires); collapsing to one number removes a standing source of exactly the kind of internal-inconsistency bug this task found. The row-count granularity rule is simpler to state and to verify than "whole calendar months except the current one."

**Archived:** 2026-09-18
