---
title: command-stub cross-refs
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-057.6]
---

# CORE-057.8 | command-stub cross-refs

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-09 · 🔗 [[CORE-EPIC-057]]

## 🎯 Goal

Equalize the "For X, use /Y" sibling cross-refs in `task.md` / `micro-task.md` / `starter-task.md` / `release.md` so discovery parity matches the cohort-shipped stubs (`close-epic.md` / `epic-discovery.md` / `file-followup.md`).

## ✅ Acceptance

- [x] Each of the four target stubs (`task.md`, `micro-task.md`, `starter-task.md`, `release.md`) carries a sibling cross-ref block on par with the cohort-shipped stubs (≥4 siblings, curated for the stub's user context). ✓ (task: 6 · micro-task: 6 · starter-task: 6 · release: 7)
- [x] Cross-ref phrasing matches the existing "For X, use /Y" idiom — no new patterns introduced. ✓
- [x] No restatement of skill behaviors — cross-refs name the skill + its single-clause use case, nothing more. ✓

## 🧩 Subtasks

- [x] Draft cross-ref block for `task.md` (currently 0 siblings → target ≥4, curated)
- [x] Draft cross-ref block for `micro-task.md` (currently 2 → extend to ≥4)
- [x] Draft cross-ref block for `starter-task.md` (currently 2 → extend to ≥4)
- [x] Draft cross-ref block for `release.md` (currently 1 sibling + MIGRATION ref → extend to ≥4 siblings, preserve MIGRATION ref)
- [x] Apply edits to all four files
- [x] Verify symmetry across all 7 in-scope stubs (cohort 3 + targets 4)

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic
- [[CORE-057.6]] — audit that surfaced this asymmetry

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-057.6 audit (closed today, 2026-05-09) explicitly surfaced this asymmetry as audit follow-up. All 8 command stubs verified at HEAD; the gap between cohort-shipped (close-epic / epic-discovery / file-followup, 4-6 siblings each) and the four targets (task: 0, micro-task: 2, starter-task: 2, release: 1) is real and reproducible. Polish item, not a re-think.

- [x] Read relevant source files (all 8 command stubs read in prep; cohort SKILL Final Summaries pulled from CORE-057.6)
- [x] **Archive skim** — pulled CORE-057.1-.7 cohort tasknotes; key precedent is CORE-057.6's "Final Summary" line characterizing the asymmetry. CORE-051/050 (cite-don't-restate) sets the bar: cross-refs name the skill + its single-clause use case, no behavior restatement.
- [x] **Drift check** — all 8 command stubs exist; argument-hint frontmatter values verified (`<TASK-ID>` for task/micro-task/starter-task/file-followup, `<AUDIT-SUBTASK-ID>` for close-epic, none for epic-discovery/release/new-project). No drift.
- [x] Asked clarifying questions — scope (four targets, leave new-project alone) + curation (per-stub curated, ≥4 siblings, /new-project last) confirmed via AskUserQuestion.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort cross-ref inventory (the bar to match):**

- `close-epic.md`: 6 siblings (epic-discovery, task, file-followup, starter-task, micro-task, new-project) — bracket-twin first, then closely-related, /new-project last.
- `epic-discovery.md`: 5 siblings (task, close-epic, file-followup, starter-task, new-project) — most-common-alt first, bracket-twin, mid-flow, start, /new-project last.
- `file-followup.md`: 4 siblings (starter-task, task, micro-task, new-project) — heavier-alt first, then start-existing, alt one-shot, /new-project last.

**Phrasing convention (locked from cohort):**

- Arg-taking skills referenced as `/skill <ARG>` (e.g., `/task <TASK-ID>`, `/file-followup <TASK-ID>`).
- No-arg skills referenced bare (e.g., `/epic-discovery`, `/close-epic`, `/new-project`). Note: cohort uses bare `/close-epic` even though it takes `<AUDIT-SUBTASK-ID>` — match this for navigation parity; arg detail belongs in the close-epic stub itself.
- Each cross-ref = "For X, use /Y" — single-clause use case, no behavior restatement.

**Cross-ref drafts (per stub):**

- `task.md` (0 → 6): `/micro-task` (small one-shots) → `/starter-task` (rich-context starters) → `/file-followup` (lightweight filings) → `/epic-discovery` (open epic) → `/close-epic` (close epic) → `/new-project` (bootstrap).
- `micro-task.md` (2 → 6): keep existing `/task` + `/starter-task`; add `/file-followup` → `/epic-discovery` → `/close-epic` → `/new-project`.
- `starter-task.md` (2 → 6): keep existing `/task` + `/new-project` (move to end); add `/file-followup` → `/micro-task` → `/epic-discovery` → `/close-epic`. Final order: `/task` → `/file-followup` → `/micro-task` → `/epic-discovery` → `/close-epic` → `/new-project`.
- `release.md` (1 sibling + MIGRATION ref → 6 siblings + MIGRATION ref): keep existing `/task` and the MIGRATION.md "Pinning and bumping" note (preserves the flowtron-self-only constraint). Add `/micro-task` → `/starter-task` → `/file-followup` → `/epic-discovery` → `/close-epic` → `/new-project`. MIGRATION ref stays last (it's about the cross-repo bump path, distinct from sibling skill nav).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort cross-ref blocks (close-epic / epic-discovery / file-followup) are the established shape; extending verbatim — no new shape introduced.
- [x] Implemented the minimal solution — 4 single-line edits, one per target stub.
- [x] No tests added — markdown-only doc edits; no code touched.

**Implementation Notes:**

**Files touched:**

- `claude/commands/task.md` — appended 6-sibling cross-ref paragraph after the existing `If $ARGUMENTS is empty` line.
- `claude/commands/micro-task.md` — extended existing 2-sibling cross-ref paragraph to 6 siblings (kept `/task` + `/starter-task`; added `/file-followup` → `/epic-discovery` → `/close-epic` → `/new-project`).
- `claude/commands/starter-task.md` — extended existing 2-sibling cross-ref paragraph to 6 siblings (kept `/task` first and `/new-project` last; inserted `/file-followup` → `/micro-task` → `/epic-discovery` → `/close-epic`).
- `claude/commands/release.md` — extended existing 1-sibling + MIGRATION-ref paragraph to 7-sibling + MIGRATION-ref (kept `/task` first and the MIGRATION.md "Pinning and bumping" note last; inserted `/micro-task` → `/starter-task` → `/file-followup` → `/epic-discovery` → `/close-epic` → `/new-project` between).

## 🧪 Phase 3: Testing & Linting

- [x] No targeted test suite — doc-only edits.
- [x] No lint/type-check — markdown only.
- [x] Symmetry verified via `grep -oE '/(task|...)\b'` across all 7 in-scope stubs. Sibling counts: task 6 · micro-task 6 · starter-task 6 · release 7 (release self-ref `/release` excluded) · close-epic 6 (cohort) · epic-discovery 5 (cohort) · file-followup 4 (cohort). All targets at or above cohort floor.

**Testing Notes:** All four targets equalized; sibling counts ≥4 (cohort floor) and on par with the upper cohort siblings (close-epic at 6).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change. (Refs in AI-referenced docs are about symlink wiring + command counts, not stub bodies; this task changed only inner cross-ref prose in 4 stubs.)
- [x] Closed — CORE-057.8 PLAN.md line flipped to stub form in place under CORE-EPIC-057 (subtasks stay nested with the parent until the parent flips); tasknote moved to `_project/tasknote/archive/core/CORE-057.8.md`.
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Closing audit follow-up of CORE-EPIC-057. Equalized sibling cross-refs across the four sparse command stubs (`task.md` / `micro-task.md` / `starter-task.md` / `release.md`) so all 8 stubs now carry comparable "For X, use /Y" navigation blocks.

**Asymmetry before:** task 0 · micro-task 2 · starter-task 2 · release 1 (+ MIGRATION ref) — vs cohort close-epic 6 · epic-discovery 5 · file-followup 4.

**Symmetry after:** task 6 · micro-task 6 · starter-task 6 · release 7 (+ MIGRATION ref preserved). All targets at or above cohort floor (4); curated per stub for user context per SPEC cite-don't-restate baseline (CORE-038/050/051) — no behavior restatement.

**Touched files:**

- `claude/commands/task.md` — appended cross-ref paragraph (6 siblings).
- `claude/commands/micro-task.md` — extended cross-ref paragraph (2 → 6).
- `claude/commands/starter-task.md` — extended cross-ref paragraph (2 → 6).
- `claude/commands/release.md` — extended cross-ref paragraph (1 → 7), preserving the existing MIGRATION.md "Pinning and bumping" note as the closing sentence.
- `_project/PLAN.md` — CORE-057.8 line flipped in place under CORE-EPIC-057.
- `_project/tasknote/CORE-057.8.md` → `_project/tasknote/archive/core/CORE-057.8.md` (this file).

**Parent-epic state:** With CORE-057.8 closed, all 8 CORE-EPIC-057 children (.1-.8) are now complete. Per SPEC §"Sub-tasks of an epic", the parent line is eligible to flip to `[x]` and the whole epic block moves to `## Completed`. Surfaced to user at recap (this is the auto-prompt that `/close-epic` would have provided — outside this `/task` flow's auto-authority).

**Archived:** 2026-05-09
