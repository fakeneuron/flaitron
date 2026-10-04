---
title: equalize stub cross-refs
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-057.8, CORE-056]
---

# CORE-063 | equalize stub cross-refs

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-057.8]] [[CORE-056]]

## 🎯 Goal

Equalize the `OTHER:` sibling cross-ref blocks in `claude/commands/file-followup.md`, `epic-discovery.md`, and `new-project.md` to match the 6-OTHER-non-release convention, completing the sweep left incomplete by CORE-057.8.

## ✅ Acceptance

- [x] `file-followup.md` cross-ref block extended to 6 siblings (adds `/epic-discovery` + `/close-epic`)
- [x] `epic-discovery.md` cross-ref block extended to 6 siblings (adds `/micro-task`)
- [x] `new-project.md` cross-ref block extended to 6 siblings (adds all 6 non-release others; MIGRATION §2 sentence remains last)

## 🧩 Subtasks

- [x] Add `/epic-discovery` + `/close-epic` to `file-followup.md` (before `/new-project`)
- [x] Add `/micro-task` to `epic-discovery.md` (before `/new-project`)
- [x] Add all 6 sibling cross-refs to `new-project.md` (before the MIGRATION §2 sentence)

## 🔗 Related

- [[CORE-057.8]] — incomplete sweep this task closes
- [[CORE-056]] — audit that flagged the gap

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gaps confirmed — file-followup has 4 of 6, epic-discovery has 5 of 6, new-project has 0 of 6 sibling cross-refs. Matches CORE-056 audit findings exactly. Pure addition, no re-scope needed.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-057.8 is the key prior tasknote: it explicitly de-scoped new-project and left the original cohort stubs (file-followup/epic-discovery) at their then-counts (4/5). That de-scope is the root cause of this task. No other archive hits for these files.
- [x] **Drift check** — current counts (file-followup=4, epic-discovery=5, new-project=0) match CORE-056 audit exactly. No drift.
- [x] Asked clarifying questions — No clarifications needed. Explicit assumptions: (1) add missing refs only, do not rewrite existing phrasing; (2) insert before `/new-project` in the two partial stubs; (3) for new-project.md, add 6 siblings before the MIGRATION §2 sentence (MIGRATION stays last, matching release.md precedent); (4) order: task → micro-task → starter-task → file-followup → epic-discovery → close-epic for new-project.md; for file-followup.md add epic-discovery → close-epic before /new-project; for epic-discovery.md add micro-task before /new-project.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Current cross-ref inventory:**
- `file-followup.md`: 4 siblings (starter-task, task, micro-task, new-project) — missing `/epic-discovery`, `/close-epic`
- `epic-discovery.md`: 5 siblings (task, close-epic, file-followup, starter-task, new-project) — missing `/micro-task`
- `new-project.md`: 0 siblings — has only MIGRATION.md §2 reference; missing all 6

**Phrasing to add (from existing conventions):**
- `/epic-discovery` → "For opening a new epic, use `/epic-discovery`."
- `/close-epic` → "For closing one, use `/close-epic`." (bare form — matches cohort convention from CORE-057.8 Discovery Notes)
- `/micro-task` → "For micro tasks, use `/micro-task <TASK-ID>`." (matches close-epic.md phrasing)
- `/task` (for new-project) → "For starting an existing PLAN.md task (starter, follow-up line, or fresh), use `/task <TASK-ID>`."

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cohort cross-ref blocks are the established shape (CORE-057.8 pattern); extending verbatim — no new shape introduced.
- [x] Implemented the minimal solution — 3 targeted edits, one per target stub.
- [x] No tests added — markdown-only doc edits; no code touched.

**Implementation Notes:**

- `claude/commands/file-followup.md` — inserted "For opening a new epic, use `/epic-discovery`. For closing one, use `/close-epic`." before the `/new-project` sentence (4 → 6 siblings).
- `claude/commands/epic-discovery.md` — inserted "For micro tasks, use `/micro-task <TASK-ID>`." before the `/new-project` sentence (5 → 6 siblings).
- `claude/commands/new-project.md` — prepended 6-sibling cross-ref block before the existing MIGRATION §2 sentence (0 → 6 siblings; MIGRATION ref preserved last).

## 🧪 Phase 3: Testing & Linting

- [x] No targeted test suite — doc-only edits.
- [x] No lint/type-check — markdown only.
- [x] Symmetry verified: file-followup 6 · epic-discovery 6 · new-project 6. All three at the 6-OTHER-non-release target.

**Testing Notes:** All three target stubs now carry all 6 non-release sibling cross-refs. Verified via grep.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: no change · `claude/CLAUDE-snippet.md`: no change. (Command stub cross-refs are not in the AI-referenced doc set.)
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Completed the cross-ref equalization sweep left incomplete by CORE-057.8. All three original cohort stubs (`file-followup`, `epic-discovery`, `new-project`) now carry the full 6-OTHER-non-release convention.

**Before:** file-followup 4 · epic-discovery 5 · new-project 0
**After:** file-followup 6 · epic-discovery 6 · new-project 6

Touched files: `claude/commands/file-followup.md` (+2 refs) · `claude/commands/epic-discovery.md` (+1 ref) · `claude/commands/new-project.md` (+6 refs, MIGRATION §2 sentence preserved last).

**Archived:** 2026-05-09
