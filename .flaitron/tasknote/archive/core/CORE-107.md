---
title: ft-flowtron template-list trim
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: []
---

# CORE-107 | ft-flowtron template-list trim

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the phantom "epic" entry from the `templates/` bullet in `claude/skills/ft-flowtron/SKILL.md` so it accurately lists the three templates that actually ship on disk (`full, micro, starter`).

## ✅ Acceptance

- [ ] `claude/skills/ft-flowtron/SKILL.md` "Key docs" templates bullet reads `(full, micro, starter)` — no "epic"
- [ ] No other doc references `tasknote-epic-template.md` as a shipped artifact

## 🧩 Subtasks

- [x] Edit `claude/skills/ft-flowtron/SKILL.md:64` — remove `epic` from the templates list
- [x] Verify no other doc references a shipped epic template artifact

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `claude/skills/ft-flowtron/SKILL.md:64` still reads `(full, micro, starter, epic)`; no `tasknote-epic-template.md` exists in `templates/`. Fix is valid and needed.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Archive grep found 19 CORE tasknotes touching "ft-flowtron" or "template/epic" broadly; none specifically targeted this templates bullet. CORE-104 renamed the skill directory but didn't trim the listing.
- Drift check: `SKILL.md:64` confirmed — `(full, micro, starter, epic)`. Templates on disk: `tasknote-template.md`, `tasknote-micro-template.md`, `tasknote-starter-template.md`. No epic template ships.
- Broader grep: only one real doc hit (`SKILL.md:64`). `ft-epic-discovery/SKILL.md:110` uses "templates" generically in a checklist — not a shipped-artifact claim.
- No clarifications needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Deleted `, epic` from `SKILL.md:64` templates parenthetical. No new shape needed — string deletion in place.
- No tests applicable (markdown doc edit).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- No test suite/linter for markdown. Targeted grep confirmed zero remaining phantom "epic" template references across docs (excluding `_project/`). One expected remaining hit in `ft-epic-discovery/SKILL.md` is a generic checklist word, not a shipped-artifact claim.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep: README.md — no change · SPEC.md — no change · docs/MIGRATION.md — no change · claude/CLAUDE-snippet.md — no change.

Removed phantom `, epic` from `claude/skills/ft-flowtron/SKILL.md:64` templates bullet. One-word deletion; no other doc referenced a shipped epic template artifact.

**Archived:** 2026-05-17
