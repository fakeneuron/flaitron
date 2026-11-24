---
title: closure-placeholder audit
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-918, CORE-918.2, CORE-918.3, CORE-918.4]
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
---

# CORE-918.N | closure-placeholder audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-918]]

## 🎯 Goal

Verify the completed `CORE-EPIC-918` (`closure-placeholder`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-918` (Step 5), landing in the audit's closure commit — no misses, none filed
- [x] Single `feat: CORE-918.N — audit CORE-EPIC-918` (or `chore: ...` if no code edits land) commit lands — `chore:`, no code edits
- [x] PLAN.md line for `CORE-918.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-918.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-918.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-918]] — parent epic
- [[CORE-918.2]] — cohort: Closed-line clause in `SPEC.md` + template
- [[CORE-918.3]] — cohort: `plan_placeholder` drift check
- [[CORE-918.4]] — cohort: clause in the Codex closure procedure
- [[CORE-928]] — standalone follow-up from CORE-918.3 (still open)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** operator invoked `/ft-close-epic CORE-918.N`; pre-flight passed. Cohort state at audit time: CORE-918.2, .3, .4 all closed 2026-11-24; no open siblings, no early-audit decision. The epic has no `.1` (Discovery supplied by audit-repo).

- [x] Read relevant source files — the three archived cohort notes plus the live sites they edited

- [x] **Best Practices Review** — `N/A`, verification pass over markdown contract and one shell check; no new module boundary

- [x] **Archive skim** — cohort children are the archive entries; CORE-605 (Closed-line pointer softening) already cited by CORE-918.2, no other non-cohort history needed

- [x] **Drift check** — cited paths match HEAD: `SPEC.md:471`, `templates/tasknote-template.md:99`, `SPEC/procedures/ft-task.md:347-353`, `tools/drift-checks.sh:318` (`plan_placeholder`), `SPEC/plan-filing.md` §"Empty-section placeholder" and §"Epic parent flip" step 3

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — omitted, no file deliverable beyond PLAN/tasknote

**Discovery Notes:**

- CORE-918.2 — added "a section this move leaves empty gets its `(none)` back" + pointer to `SPEC/plan-filing.md` §"Empty-section placeholder" on the Phase 4 Closed line in `SPEC.md` and `templates/tasknote-template.md`. Filed CORE-918.4.
- CORE-918.3 — `plan_placeholder()` in `tools/drift-checks.sh` (`EMPTY SECTION`, `STALE PLACEHOLDER`, `MISSING SECTION`, `VACUOUS` floor) with seeded case in `tools/drift-checks.test.mjs`; fixed live PLAN.md. Filed CORE-928 (standalone, `docs/CONVENTIONS.md` roster).
- CORE-918.4 — same clause in `SPEC/procedures/ft-task.md` step 5 item 5, size held (24,766 → 24,763 bytes) by trimming three restated clauses.
- No clarifications needed. Assumption: CORE-928 is a doc follow-up already filed as a standalone row, not an epic miss, so it does not hold the parent open.
- Phase 1 verdict Proceed → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`, verification pass; no new code surface

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution — audit findings below; no inline fixes needed

- [x] Updated/added tests for non-trivial behavior — `N/A`, no code edits

**Implementation Notes:**

- Coherence: the clause is word-identical at all three closure sites ("a section this move leaves empty gets its `(none)` back"); pointer shape follows each file's convention ("see … if unclear" in `SPEC.md`/template per CORE-605, plain link in the procedure file). `SPEC/plan-filing.md` §"Epic parent flip" step 3 already carries the rule for parent moves, so the `/ft-close-epic` path is covered too. No contradictory cross-refs.
- Coverage: `grep -rl 'Empty-section placeholder'` hits `SPEC.md`, the template, the procedure, `SPEC/plan-filing.md`, `tools/drift-checks.sh`. The micro template has no Closed line (CORE-918.2 scoped it out); the CI check now backstops any runner that misses the clause.
- Regressions: `bash tools/drift-checks.sh` → 0 at HEAD; live PLAN.md sections all carry a row or `(none)`.
- Minor, no action: archived CORE-918.2 and .4 nav chips read `🟢 In progress` while CORE-918.3 reads `✅ Completed`. The chip is render-derived since CORE-042.4 and archived notes are historical, so neither is rewritten.
- Misses filed as child rows: none.
- Open hand-offs: none deferred. CORE-928 (out-of-scope doc fix from CORE-918.3) is already filed standalone in `## Low`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed

- [x] Ran lint/type-check on changed code — `N/A`, no code changed

- [x] **Verification receipt** — `N/A`, no code changed; `bash tools/drift-checks.sh` → 0 recorded as the regression check

- [x] **External review** — `N/A`, no inline fix to grade; the audit is itself the review

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown-only audit. `bash tools/drift-checks.sh` → 0 before the closure edits.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`; the rule now sits on every closure surface and CI enforces it

Doc-drift sweep (per README §"AI-referenced docs"): `README.md` no change · `AGENTS.md` no change · `SPEC.md` no change (carries the clause, CORE-918.2) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` drift still open — §"GitHub Actions CI" "Six checks" list lacks `plan_placeholder`; already filed as CORE-928, not re-filed · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

**Final Summary:**

Audit ran over CORE-918.2/.3/.4; no inconsistencies surfaced. The `(none)` clause is word-identical at all three closure sites, the parent-flip path already carries it in `SPEC/plan-filing.md`, and `plan_placeholder` enforces it in CI. One doc drift (`docs/CONVENTIONS.md` check roster) remains, already tracked as CORE-928. No child rows filed; the closure flips CORE-EPIC-918.

**Archived:** 2026-11-24
