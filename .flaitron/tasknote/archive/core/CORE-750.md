---
title: release-budget-ratchet
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-734, CORE-622.2, CORE-671]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-750 | release-budget-ratchet

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-734]] · [[CORE-622.2]] · [[CORE-671]]

## 🎯 Goal

Re-ratchet the `claude/skills/ft-release/**` directory-total cap in `docs/CONTEXT-BUDGET.md` from 125,000 to 113,000 so it again holds the measured total plus ~1.5 working units, and log the change in Cap history.

## ✅ Acceptance

- [x] §"Budgets" `claude/skills/ft-release/**` row reads 113,000 — `grep -qE '^\| `claude/skills/ft-release/\*\*` \| 113,000 \|' docs/CONTEXT-BUDGET.md`
- [x] Cap history row for `claude/skills/ft-release/**` appends `→ 113,000 [[CORE-750]]` — `grep -E '^\| `claude/skills/ft-release/\*\*` \| .*→ 113,000 \[\[CORE-750\]\]' docs/CONTEXT-BUDGET.md`
- [x] The directory still fits the new cap — `bash tools/drift-checks.sh context_budget` → `context_budget ok`
- [x] The row's "Why this number" rationale (measured total + ~1.5 working units, unit +4,000–5,300) is true of the new cap — `judgment`: 113,000 − 106,247 = 6,753 ≈ 1.3–1.7 units; no command decides it

## 🧩 Subtasks

- [x] Measure the directory total and the working unit; pick the cap
- [x] Edit the §"Budgets" `claude/skills/ft-release/**` cap 125,000 → 113,000
- [x] Append `→ 113,000 [[CORE-750]] (…)` to that surface's Cap history row
- [x] Run the verify commands; record the receipt

## 🔗 Related

- [[CORE-734]] — epic whose pair retirements cut the directory (120,047 → 106,247 across its children), opening the slack
- [[CORE-622.2]] — budgeted the row at 125,000 (117,971 + ~1.5 units)
- [[CORE-671]] — settled that headroom is judged per row in working units, not a flat percent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The premise holds at HEAD. `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → 106,247 (the PLAN line's 106,074 predates CORE-749's +173); 125,000 − 106,247 = 18,753 ≈ 4 units at the row's own +4,000–5,300 unit, against a rationale that says ~1.5. The task offers "lower to ~113,000 or restate the rationale"; lowering is the smaller edit and keeps the row's ratchet purpose, so that is the pick.

- [x] Read relevant source files — `docs/CONTEXT-BUDGET.md` §"Budgets" row (line 52) and §"Cap history" row (line 101); `tools/drift-checks.sh` `context_budget()` (sums `find … -exec cat | wc -c`, reads the table, restates no number — so no code or CI edit); `docs/CONVENTIONS.md` / `ft-release` fragments name the row but not the number (`grep 125,000` finds only CONTEXT-BUDGET.md).

- [x] **Best Practices Review** — `N/A`: a number and one history entry in a doc, no code or module boundary.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). 155 notes cite CONTEXT-BUDGET, so read only the ones that bear on this row: CORE-622.2 (sized 125,000 = 117,971 + ~1.5 units, unit measured over the last twenty touching commits as +4,000–5,300; the same arithmetic gives 113,000 here), CORE-671 (headroom is per-row working units), CORE-734.2 (measured 120,047 ≤ 125,000 mid-epic; no cap review at the pair-retire children). No prior task lowered this cap.

- [x] **Drift check** — PLAN line matches the SPEC grammar and the doc: row text, cap, and rationale are as the line describes; only the measured total moved (106,074 → 106,247). Left alone by design: line 65's "8.8% there is ~2 units" (a historical heuristic illustration, unit-based, still true) and the §Ledger `ft-release` 116,152 figure (the release cut refreshes it, per the Ledger's own header).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (a) lower rather than restate, per the PLAN line's stated preference; (b) 113,000 as given — 6,753 headroom ≈ 1.4 units at CORE-622.2's average unit (~4,686); (c) the Cap history entry carries the measured figure, the Budgets cell stays one line.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see boxes above. Cap arithmetic: 106,247 + 1.5 × (4,000…5,300) = 112,247…114,197, so 113,000 sits inside the band.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape (cap-history row already carries `→ N [[ID]] (reason)` entries; this appends one)

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Two cell edits in `docs/CONTEXT-BUDGET.md`: the §"Budgets" `claude/skills/ft-release/**` cap 125,000 → 113,000, and a `→ 113,000 [[CORE-750]] (…)` entry on that surface's Cap history row. The row's "Why this number" prose is unchanged — it was already correct and the new cap makes it true again. No code, CI, or fragment edit: `context_budget()` reads the table and restates no number.

Tests: N/A — a doc number; `context_budget` is the test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -qE '^\| `claude/skills/ft-release/\*\*` \| 113,000 \|' docs/CONTEXT-BUDGET.md` → 0
- `grep -E '^\| `claude/skills/ft-release/\*\*` \| .*→ 113,000 \[\[CORE-750\]\]' docs/CONTEXT-BUDGET.md` → 0 (the Cap history row matched)
- `bash tools/drift-checks.sh context_budget` → 0 (`context_budget ok`; directory 106,247 ≤ 113,000)
- `bash tools/drift-checks.sh final_newline` → 0 (`final_newline ok`)
- Lint/type-check: `N/A` — markdown only, no viz or tooling change.
- Verification receipt: no code touched; no duplication, dead code, or stale docs introduced. The two figures I left alone (line 65's 8.8% illustration, Ledger's `ft-release` 116,152) are read-by-the-cut / historical, not made stale by this edit.
- External review: `N/A` — a 2-line, 2-cell doc diff with machine-checked acceptance; too small to grade.
- Acceptance 4 (`judgment`): 113,000 − 106,247 = 6,753 headroom = 1.27–1.69 units across the row's +4,000–5,300 unit; the "~1.5 working units" rationale holds.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change (`docs/CONTEXT-BUDGET.md` is named there as CI-enforced and outside the sweep set; no other doc cites 125,000)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect (in the closing response)

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A`

**Final Summary:**

Lowered the `claude/skills/ft-release/**` directory-total cap in `docs/CONTEXT-BUDGET.md` from 125,000 to 113,000 (measured total 106,247, so ~1.5 working units of headroom instead of ~4) and logged `→ 113,000 [[CORE-750]]` in Cap history. `context_budget` passes; doc-drift sweep: no change (`docs/CONTEXT-BUDGET.md` is outside the sweep set — CI-enforced). Not touched, by design: the §Ledger's `ft-release` 116,152 reading, which the next release cut refreshes.

**Archived:** 2026-10-08
