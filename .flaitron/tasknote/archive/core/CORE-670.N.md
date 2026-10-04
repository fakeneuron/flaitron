---
title: context-headroom audit
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-EPIC-670, CORE-670.2, CORE-670.3, CORE-670.4]
touches:
  - .flowtron/PLAN.md
---

# CORE-670.N | context-headroom audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-670]]

## 🎯 Goal

Verify the completed `CORE-EPIC-670` (`context-headroom`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-670.N — audit CORE-EPIC-670` commit lands (`chore:` — only a PLAN.md placement fix, no code edits)
- [x] PLAN.md line for `CORE-670.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-670.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-670` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Re-measure every §Budgets surface against the epic's headline goal (≥10% headroom on every budgeted surface)
- [x] Inline fix: 2-space-nest the cohort under `CORE-EPIC-670` (SPEC/epic.md §"Child placement invariant")
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-670.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-670]] — parent epic (context-headroom); Discovery supplied by audit-repo 2026-09-22, no `.1` sibling
- [[CORE-670.2]] / [[CORE-670.3]] / [[CORE-670.4]] — the audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic`; pre-flight passed. Cohort state at audit time: `.2`, `.3`, `.4` all closed 2026-09-22; no open siblings, no early-audit. No `.1` — audit-repo supplied the epic-level discovery.

- [x] Read relevant source files — the three archived cohort tasknotes, `docs/CONTEXT-BUDGET.md` §Budgets, the CI "Context budget" step, `claude/skills/ft-audit-repo/SKILL.md` §filing

- [x] **Best Practices Review** — N/A: verification pass, no code-module work

- [x] **Archive skim** — self-referential (cohort children are the archive entries); CORE-604.2 / CORE-631.3 / CORE-622.2 cap-history rows read in `docs/CONTEXT-BUDGET.md` for the headroom context

- [x] **Drift check** — every path the cohort touched still exists at HEAD; the epic's PLAN line ("≥10% headroom on every budgeted surface") re-read verbatim and measured below — two surfaces fall short

- [x] No clarifications needed — scope is the full closed cohort; assumption: the epic's "≥10%" is measured per §Budgets row, globs expanded per the CI step

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- **CORE-670.2** (`budget-rationale-refresh`) — `docs/CONTEXT-BUDGET.md` `claude/skills/*/SKILL.md` row: dropped retired `ft-goal-task`, refreshed `ft-epic-discovery` (29,277) / `ft-close-epic` (28,002).
- **CORE-670.3** (`procedures-ft-task-extract`) — `SPEC/procedures/ft-task.md` 36,238 → 34,115 by routing debug mode to `claude/skills/ft-task/step-4-debug-mode.md`; fragment header, `docs/AGENT-NEUTRALITY.md` row and CONTEXT-BUDGET cap-history row updated.
- **CORE-670.4** (`large-docs-budget-decision`) — `docs/MIGRATION.md` / `docs/PLATFORMS.md` explicitly exempted in §Budgets "Not budgeted, deliberately"; new §Ledger `### Large reference docs` with sizes and the earns-a-row trigger.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass; the inline fix follows existing nested cohorts in `## Completed` (e.g. CORE-652)

- [x] **Minimal refactor gate** — no refactor; one PLAN.md placement fix required by SPEC/epic.md §"Child placement invariant"

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, no code

**Implementation Notes:**

- **Coherence:** no inconsistencies. `ft-close-epic` (28,002) and `ft-epic-discovery` (29,277) sizes cited by `.2` still match `wc -c`; `.3`'s AGENT-NEUTRALITY row, fragment header and CAPABILITIES/PLATFORMS debug-mode rows agree (SOP loads the one debug body); `.4`'s exemption prose and `.2`/`.3` edits sit in separate sections of the same doc without contradiction. CI "Context budget" step run locally → exit 0.
- **Headroom re-measure (epic's headline goal) — partially met.** At HEAD: `SPEC.md` 11%, `gates.md` 18%, `post-closure.md` 34%, `task-line-segments.md` 43%, `ft-release/SKILL.md` 17%, `SPEC/procedures/ft-task.md` 10.2%, largest `*/SKILL.md` (`ft-task`) 11%. Two short and **unchanged since filing** (`504c9497`) — no cohort child targeted them:
  - `SPEC/gate-postures.md` 21,592/23,000 = **6.1%** (1,408 chars ≈ 1 of its row's ~1,400-char working units; the row is sized for ~1.5).
  - `claude/skills/ft-release/**` 113,985/125,000 = **8.8%** (11,015 chars ≈ 2+ units at its row's +4,000–5,300 unit — fine by the row's own measure, short only on the flat 10% heuristic).
- **Filing drift:** the cohort was filed flat (top-level `- [ ]`) under `## Medium`, not 2-space nested as SPEC/epic.md §"Child placement invariant" requires. Root cause: `claude/skills/ft-audit-repo/SKILL.md` filing bullet ("One parent per milestone, plus its implementation children and a closing `.N`") never says to nest. `FE-EPIC-125` has the same shape.
- **Inline fix:** `.flowtron/PLAN.md` — `CORE-670.2`/`.3`/`.4`/`.N` rows indented 2 spaces under `CORE-EPIC-670`, so the cohort travels as one block (plan-filing §"Never split an epic cohort").
- **Follow-up candidates** (`/ft-file-followup <NEW-ID>`, after closure):
  1. `gate-postures-headroom` — restore `SPEC/gate-postures.md` to ≥1.5 working units / ≥10%; decide whether the epic's flat 10% or each row's working-unit sizing governs `ft-release/**`.
  2. `audit-repo-nest-children` — state 2-space nesting in `ft-audit-repo`'s filing bullet; nest the `FE-EPIC-125` rows.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, PLAN.md whitespace only

- [x] Ran lint/type-check on changed code — N/A

- [x] **Verification receipt** — CI "Context budget" step (lifted from `.github/workflows/ci.yml`) under `bash -e` → exit 0

- [x] **External review** — N/A: diff is an indentation change plus workflow files

- [x] (frontend) N/A

**Testing Notes:**

Markdown/PLAN-only audit; no test surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `AGENTS.md` no change (CONTEXT-BUDGET blurb still true) · `SPEC.md` no change · `docs/MIGRATION.md` no change (`ft-goal-task` row is retirement history) · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (updated in-cohort by CORE-670.3) · `docs/PLATFORMS.md` no change (debug-mode row still accurate) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change · `docs/WORKTREES.md` no change · `docs/VISION.md` no change

- [x] Closed — Acceptance ticked, YAML `status:` flipped, PLAN.md line stubbed and kept nested, tasknote archived

- [x] **Evidence-based recap** drafted

- [x] **Learnings** — N/A; the nesting gap belongs in the audit-repo skill (follow-up 2), not the always-loaded layer

**Final Summary:**

Audit of CORE-EPIC-670: the three children are coherent and green (CI budget step exit 0, doc sweep clean), but the epic's headline goal is only partly met — `SPEC/gate-postures.md` (6.1%) and `claude/skills/ft-release/**` (8.8%) were never targeted and still sit under 10%. Also fixed inline: the cohort was filed flat by `/ft-audit-repo`; now 2-space nested. Two follow-up candidates logged above. Parent flip: operator confirmed — `CORE-EPIC-670` stubbed and the nested cohort moved to the top of `## Completed`; the headroom gap carries forward as follow-up 1.

**Archived:** 2026-09-22
