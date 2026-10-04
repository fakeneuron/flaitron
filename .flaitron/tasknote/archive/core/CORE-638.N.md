---
title: completed-rotation-debt audit
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-638, CORE-638.2, CORE-638.3]
---

# CORE-638.N | completed-rotation-debt audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-638]]

## 🎯 Goal

Verify the completed `CORE-EPIC-638` (`completed-rotation-debt`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-638.N — audit CORE-EPIC-638` (or `chore: ...` if no code edits land) commit lands (staged at Step 9's 📦 gate; `chore:` — markdown only)
- [x] PLAN.md line for `CORE-638.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-638.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-638` to `Completed` and moving the cohort to `## Completed` (bundled into the 📦 gate; decision recorded in Final Summary)

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-638.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-638]] — parent epic (completed-rotation-debt)
- [[CORE-638.2]] — cohort child (rotate-completed-rows)
- [[CORE-638.3]] — cohort child (rotation-advisory-mirrors)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-638.N` invoked explicitly (operator passed the parent `CORE-EPIC-638` and confirmed the audit ID). Step 2 pre-flight passed. Cohort state at audit time: `CORE-638.2` (rotate-completed-rows) closed 2026-09-20 under `--unattended`; `CORE-638.3` (rotation-advisory-mirrors) closed 2026-09-20 under `--unattended`. No `.1` Discovery child — the epic's Discovery was supplied by `/ft-audit-repo` 2026-09-20. No open siblings; no early-audit decision. `## Completed` holds 60 checked rows (at the bound; advisory fires only when the count *exceeds* 60).

- [x] Read relevant source files — archived [[CORE-638.2]] and [[CORE-638.3]]; live `claude/skills/ft-task/SKILL.md` / `ft-micro-task/SKILL.md` / `ft-close-epic/SKILL.md` advisory blocks; `claude/skills/ft-release/step-7.1-standing-checks.md` + `ft-release/SKILL.md` §7.1 index / §7.4 verdict; `SPEC/plan-filing.md` §"`## Completed` rotation"; `docs/GLOSSARY.md`; `docs/MIGRATION.md`; `.flowtron/PLAN.md` `## Completed`; `.flowtron/PLAN-ARCHIVE.md` `## Completed 2026-09`.

- [x] **Best Practices Review** — N/A: verification pass over markdown deliverables; no code surface.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Cohort children are the archive entries in scope. Non-cohort hits on the same surfaces: [[CORE-604.4]] authored the 60-row bound + `/ft-task` / `SPEC/procedures/ft-task.md` advisory (explicitly those two runner surfaces); [[CORE-620]] earlier PLAN.md rotation (82→60); [[CORE-634]] replaced the contradictory "closed to further appends" clause so 638.2 could append into an existing `## Completed 2026-09` heading that already sat below a later month. No Fan-out / `.1` (audit-repo supplied Discovery).

- [x] **Drift check** — cited paths exist at HEAD. See Discovery Notes.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Cohort inventory.** `CORE-638.2` — cut the oldest 28 checked rows (`CORE-601` … `FE-115`, dated 2026-09-12 through 2026-09-14) from `.flowtron/PLAN.md` `## Completed` (88→60) into `.flowtron/PLAN-ARCHIVE.md`'s existing `## Completed 2026-09` heading, verbatim, no epic-cohort split (cut sat between standalone `FE-121` and `CORE-601`). `CORE-638.3` — copied `/ft-task` Step 1's 8-line Completed-rotation check into `/ft-micro-task` Step 1 and `/ft-close-epic` Step 2; added advisory-only standing check + count command to `/ft-release` §7.1 (`step-7.1-standing-checks.md`) with §7.1 index + §7.4 closure-review line; retargeted `docs/GLOSSARY.md` and `docs/MIGRATION.md` from "`/ft-task` surfaces" to "a runner skill that reads PLAN.md".
- **Archive skim (non-cohort).** [[CORE-604.4]] is why `/ft-task` already had the advisory this epic mirrored; [[CORE-620]] is the prior rotation precedent `.2` followed; [[CORE-634]] (same day, standalone) is the SPEC-clause fix `.2` relied on to append into a month heading that was no longer at the top of the archive file.
- **Drift check (HEAD, 2026-09-20).**
  - `awk '/^## Completed$/{f=1;next}/^## /{f=0} f' .flowtron/PLAN.md | grep -c '^\s*- \[x\]'` → `60` (at bound).
  - `diff` of the three 8-line `Completed-rotation check` blocks (`ft-task` 74–81 / `ft-micro-task` 74–81 / `ft-close-epic` 53–60) → identical.
  - `grep -A20 'Standing completed-rotation check' claude/skills/ft-release/step-7.1-standing-checks.md` → present, `if [ "$n" -gt 60 ]`, no `exit 1`.
  - `ft-release/SKILL.md:280` indexes `completed-rotation (advisory)`; `:289` names it as one of the two standing advisories; `:339` carries the §7.4 verdict line.
  - `grep -n 'surfaces a one-line advisory' docs/GLOSSARY.md docs/MIGRATION.md` → both "a runner skill that reads PLAN.md".
  - `SPEC/plan-filing.md` still says "When a runner skill reads PLAN.md"; `grep -q "closed to further appends"` → no match (CORE-634 holds).
  - Archive cut still present: `PLAN-ARCHIVE.md:136` `CORE-601`; `:163` `FE-115`. `FE-121` remains the oldest row still in PLAN.md `## Completed`.
- No clarifications needed. Assumptions: (1) the cohort is complete as filed (two implementation children, no `.1`); (2) CORE-638.2's three still-open Subtasks boxes in the archived note are a historical tick miss, not a live PLAN/archive-data miss — Acceptance is fully ticked and the files match the recap; do not rewrite the archive; (3) CORE-638.2's Phase 4 sentence claiming a standalone `## Completed` move is a recap error — the PLAN row stayed nested, which is the contract.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: no new surface; verification pass over existing cohort deliverables.

- [x] **Minimal refactor gate** — N/A: no edits applied.

- [x] Implemented the minimal solution — verification only; findings in Implementation Notes.

- [x] Updated/added tests for non-trivial behavior — N/A: no code edits landed.

**Implementation Notes:**

- **Cohort children inventoried.**
  - `CORE-638.2` (`rotate-completed-rows`): 28 oldest `## Completed` rows (`CORE-601` … `FE-115`) moved verbatim PLAN.md → PLAN-ARCHIVE.md `## Completed 2026-09`; count 88→60; no cohort split.
  - `CORE-638.3` (`rotation-advisory-mirrors`): `/ft-task` advisory copied into `/ft-micro-task` Step 1 and `/ft-close-epic` Step 2; `/ft-release` §7.1 standing check (never blocks) + §7.4 verdict; GLOSSARY.md + MIGRATION.md retargeted to SPEC's generic "runner skill".
- **Cohort coherence — no inconsistencies surfaced.** `.2` left the section *at* the bound; `.3` documents that the advisory fires only when the count *exceeds* 60 — current HEAD still 60, so this audit's own Step 2 correctly did not warn. The three SKILL.md 8-line blocks are byte-identical (`diff` clean). SPEC/plan-filing.md, GLOSSARY.md, and MIGRATION.md all say "a runner skill that reads PLAN.md"; `/ft-release` names the check as one of two standing advisories rather than "the one standing advisory". `.2` and `.3` touch disjoint paths (plan data vs runner/docs) — no cross-refs to contradict. `.3` correctly left `SPEC/procedures/ft-task.md` alone (already carried the advisory from CORE-604.4).
- **No regressions** in either child's surfaces at HEAD (Drift check receipts in Discovery Notes). Rotation cut still present in PLAN-ARCHIVE.md; `FE-121` remains the oldest PLAN.md `## Completed` row, matching `.2`'s cut-boundary claim.
- **Inline fixes:** none.
- **Misses → `/ft-file-followup`:** none. Two historical archive-note nits on `CORE-638.2` are logged in Discovery Notes and not re-filed: (1) three `## 🧩 Subtasks` boxes left unticked after the cut/append actually landed — Acceptance is fully ticked and Pair P does not scan Subtasks; rewriting the archive is out of contract; (2) Phase 4 recap claimed a standalone `## Completed` move, but the PLAN row stayed nested under the parent, which is the epic-child rule. Neither is live drift.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: markdown-prose verification only; no markdown linter in this repo

- [x] **Verification receipt** — recorded below; N/A for changed-code quality assertions (no code changed)

- [x] (frontend) N/A — not a frontend change; no 👁️ ask

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown-prose verification only; no test surface. Verification receipt = the Drift-check commands in Discovery Notes (all green at HEAD 2026-09-20):

- `awk … | grep -c '^\s*- \[x\]'` on PLAN.md `## Completed` → `60` (exit 0)
- `diff` of the three `Completed-rotation check` 8-line blocks → empty (exit 0)
- standing-check heading present in `step-7.1-standing-checks.md`; `ft-release/SKILL.md` §7.1 index + §7.4 verdict present
- GLOSSARY.md / MIGRATION.md "runner skill that reads PLAN.md" (no remaining "`/ft-task` surfaces" restatement)
- `grep -q "closed to further appends" SPEC/plan-filing.md` → no match (exit 1, as CORE-634 requires)

Frontend confirmation N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (verdicts in Final Summary)

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line to stub form nested under CORE-EPIC-638; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs", cumulative over the cohort): `docs/GLOSSARY.md` — **updated** by CORE-638.3 (rotation entry now says "a runner skill that reads PLAN.md"). `docs/MIGRATION.md` — **updated** by CORE-638.3 (same retarget). No change: `README.md` (already names verbatim rotation to `PLAN-ARCHIVE.md` without pinning the advisory to `/ft-task`), `AGENTS.md` (names the archive path, not the advisory), `SPEC.md` (already generic operator-motion), `claude/AGENTS-snippet.md` (already names PLAN-ARCHIVE rotation), `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (already names PLAN-ARCHIVE as the closed-row set), `docs/WORKTREES.md`, `docs/VISION.md`.

**Recap.** Audit ran over the two-child `CORE-EPIC-638` cohort; no inconsistencies surfaced — the 88→60 rotation is still at the bound, the three runner advisories are byte-identical, `/ft-release` §7.1/§7.4 carry the matching never-block check, and GLOSSARY/MIGRATION/SPEC agree on "runner skill". No inline fix. No `/ft-file-followup` candidates. Two historical nits on the archived `CORE-638.2` note (unticked Subtasks; recap claimed a standalone Completed move) are not live drift. `touches:` omitted (audit; no file deliverable). Maintainability: a day of micro-tasks, epic closes, and a release cut can no longer accrue rotation debt without a runner that reads PLAN.md saying so, and the section itself is back at the 60-row bound.

**Parent-flip decision (Step 8/9):** Yes — `CORE-EPIC-638` stubbed `Completed 2026-09-20.` and moved with `.2` / `.3` / `.N` to the top of `## Completed` in the audit commit.

**Archived:** 2026-09-20
