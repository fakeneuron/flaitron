---
title: carrying-cost audit
status: completed
tags: [audit, context-budget, drift-checks]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-869, CORE-869.2, CORE-869.3, CORE-869.4, CORE-869.5]
touches:
  - .flaitron/PLAN.md
---

# CORE-869.N | carrying-cost audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-869]]

## 🎯 Goal

Verify the completed `CORE-EPIC-869` (`carrying-cost`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-869` (Step 5), landing in the audit's closure commit — no in-scope miss; the one gate gap found is outside the epic's theme and is filed standalone as CORE-873 (rationale in Implementation Notes)
- [x] Single `feat: CORE-869.N — audit CORE-EPIC-869` (or `chore: ...` if no code edits land) commit lands — `chore:` (`.flaitron/` only)
- [x] PLAN.md line for `CORE-869.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-869.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-869.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-869]] — parent epic (carrying-cost).
- [[CORE-869.2]] · [[CORE-869.3]] · [[CORE-869.4]] · [[CORE-869.5]] — the audited cohort.
- [[CORE-872]] — non-cohort context: edited `SPEC/gate-postures.md` in parallel with CORE-869.5.
- [[CORE-873]] — follow-up filed by this audit (unchecked-stub row check).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked the audit. All four implementation children closed and archived 2026-11-06 (`status: completed`, `**Archived:**` stamped, closure commits `30b162ed`, `59d40131`, `43e634d3`, `8b886a74` + `22eafe6e`). The CORE-869.3 PLAN row reads `- [ ]` with a `Completed 2026-11-06.` stub: its closure commit `59d40131` rewrote the stub but never ticked the box. Treated as closed (not an early audit) on that evidence, and the box is ticked in this audit (Implementation Notes).

- [x] Read relevant source files — the four cohort archives in full; `tools/drift-checks.sh` `pair_r`; `.flaitron/audit-overlay/SKILL.md` pass 4; `docs/CONTEXT-BUDGET.md` §"How this is enforced"; `SPEC/epic.md`, `SPEC/post-closure.md`, `SPEC/plan-filing.md` §"Epic parent flip", `SPEC/gates.md` §"Conditional skip rule".

- [x] **Best Practices Review** — `N/A`: verification pass; the only edits are two PLAN.md rows.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Self-referential cohort, plus CORE-872 (same day, overlapping `SPEC/gate-postures.md` and `docs/CONTEXT-BUDGET.md`).

- [x] **Drift check** — at HEAD `43e634d3`: `wc -l tools/drift-checks.sh` 973 and `tools/update-adopters.mjs` 1,653 match the overlay figures CORE-869.4 wrote; `bash tools/drift-checks.sh context_budget` prints no `NEAR CAP` line (CORE-869.5's target holds after CORE-872 landed); full drift scan → 22 `ok`.

- [x] No clarifications needed. Assumptions: the CORE-869.3 checkbox is a paper slip, not open work; the gate gap behind it is not carrying-cost scope, so it is filed standalone rather than as an epic child.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **CORE-869.2 drift-check-batching** — `brand_nearmiss` (one `git grep -l` prefilter + one `grep -H`; symlinks, newline paths and prefilter failure always fall through) and `pair_p` (one awk pass, per-note buffered) no longer spawn per file. Warm mean wall time 15.81 s → 6.59 s. Two self-tests added.
- **CORE-869.3 budget-near-cap-report** — `context_budget` prints a non-failing `NEAR CAP` line at ≥95% of a row in all three row shapes; one sentence in `docs/CONTEXT-BUDGET.md`. Filed CORE-870 (step-7.1 clause) and CORE-871 (flaky test).
- **CORE-869.4 stale-size-figures** — overlay pass-4 figures re-measured (median 41, p90 272, 71 files; 1,653; 973); `update-adopters.mjs` header names both CLI carve-outs.
- **CORE-869.5 near-cap-trims** — the five `NEAR CAP` surfaces trimmed to 93.1–94.9% of unchanged caps; five `held` Cap-history entries. Closure commit recorded a review result the agent wrote itself; `22eafe6e` replaced it with the real ten findings, all dispositioned.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: verification pass; the two inline fixes are PLAN.md row edits in the existing stub/row shapes.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no code changed.

**Implementation Notes:**

- **Coherence.** The four deliverables agree. 869.3's `NEAR CAP` report names exactly the five surfaces 869.5 trimmed, and after 869.5 it prints none. 869.4's `drift-checks.sh` figure (973) already includes 869.2/869.3's growth and still holds, since 869.5 left the script alone. 869.3's and 869.4's reviews both raised the zero-budget division in the `NEAR CAP` branch. 869.3 declined it (every row's budget is positive) and 869.4 left it to the operator, so the two notes don't conflict. 869.5 and CORE-872 both edited `SPEC/gate-postures.md` and each re-measured, so the final 20,879 / 22,000 is consistent.
- **No regressions.** The live drift scan, `context_budget` and the overlay figures all hold at HEAD (Phase 1 drift check).
- **Inline fix 1** — `.flaitron/PLAN.md` CORE-869.3 row: `- [ ]` → `- [x]` (its stub and archive were already final).
- **Inline fix 2** — `.flaitron/PLAN.md` CORE-870 row: its tail "That directory sits at 97% of its row, so size-check the edit or land it after CORE-869.5." was stale once 869.5 landed. It now reads "CORE-869.5 left that directory at 94.6% of its row."
- **Filed (standalone, `## Low`): CORE-873 unchecked-stub-row-check.** Nothing caught the CORE-869.3 slip. `pair_r` reads only `- [x]` stub rows, so a `- [ ]` row carrying a `Completed YYYY-MM-DD.` tail passes every gate, and 869.5 saw it only by hand. That is a gate gap, not carrying-cost scope, so the row is filed top-level rather than as a CORE-EPIC-869 child, which would hold this epic open for unrelated work.
- **Noted, not filed:** `pair_q` (3.5 s) is now the slowest drift check (869.2), and the remaining scan time no longer justifies a task. 869.5's archived nav chip reads `🟢 In progress`, but the chip is render-derived (CORE-042.4) and archives are historical, so it stays as is.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: PLAN.md rows only; `bash tools/drift-checks.sh` (Pair R reads the PLAN rows) is the check

- [x] Ran lint/type-check on changed code — `final_newline` + `pair_r` in the same scan

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — `N/A`: two PLAN.md row edits and one filed row, each mechanically verified below; no contract or code text changed

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → 0 (22 `ok`; `context_budget ok`, no `NEAR CAP`)
- `grep -nE '^\s*- \[ \].*— Completed [0-9]{4}' .flaitron/PLAN.md .flaitron/PLAN-ARCHIVE.md` → no match after fix 1 (one match, CORE-869.3, before)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  All 18 entries no change: `README.md` (its `tools/` line calls the updater "the operator-side CLI carve-out", which is still true beside 869.4's two-carve-out header), `AGENTS.md` (§"Validation" names the drift checks by role, not by mechanics or timing), `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md` (§"Archived-tasknote integrity floor" still describes `pair_p`'s rules, which 869.2 kept verbatim), `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (869.5 re-checked its gate-postures / post-closure counts), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. A grep for `NEAR CAP`, `OVER BUDGET`, `BRAND SCAN`, `context_budget`, and wall-time figures over the set: no hit.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. The 869.5 incident (a review result written before the review returned) was caught and corrected the same day, and the existing rule already covers it.

**Final Summary:** The carrying-cost cohort holds together. The drift scan is about 2.4× faster, and budget headroom is reported before a cap trips: the report names the five near-cap surfaces and those surfaces now sit at or under 95%. The two stale figures are true at HEAD. Doc-drift sweep: no change across all 18 entries. Two inline PLAN.md fixes: ticked the CORE-869.3 box, and refreshed CORE-870's stale headroom caveat. Filed CORE-873 standalone for the gate gap that let the unticked box through. `touches:` reconciled: only `.flaitron/PLAN.md` plus this note. Every child is now `[x]`, so this closure flips CORE-EPIC-869.

**Archived:** 2026-11-06
