---
title: audit-docs SKILL fork CORE-121 sync
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: []
---

# CORE-123 | audit-docs SKILL fork CORE-121 sync

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Update `.claude/skills/ft-audit-docs/SKILL.md` to reflect the CORE-121 addition of SECURITY.md: add it to the §1 inline scope list (7-item block) and correct the "six files" count in §2.

## ✅ Acceptance

- [ ] §1 inline scope list contains SECURITY.md (7 items)
- [ ] §2 count reads "seven" (not "six")

## 🧩 Subtasks

- [ ] Read `.claude/skills/ft-audit-docs/SKILL.md` and locate the two stale references
- [ ] Edit §1 inline scope list to add SECURITY.md
- [ ] Edit §2 count from "six" to "seven"
- [ ] Verify no other stale counts or scope references remain

## 🔗 Related

- [[CORE-121]] — added SECURITY.md to AI-referenced docs; this task syncs the fork SKILL.md that was not updated at that time

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both stale references confirmed in `.claude/skills/ft-audit-docs/SKILL.md` — §1 scope list (6 items, SECURITY.md absent) and §2 "six files" count.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-106 and CORE-097.6 touched `ft-audit-docs/SKILL.md`: CORE-106 fixed namespace residue (not relevant to scope count); CORE-121 added SECURITY.md to `_project/tasknote/README.md` §"AI-referenced docs" but did not update the forked SKILL.md — this is the origin of the gap.
- [x] **Drift check** — `.claude/skills/ft-audit-docs/SKILL.md` exists; SECURITY.md confirmed on disk; §1 lines 22–28 list 6 files (CONTRIBUTING.md last, SECURITY.md absent); §2 line 46 reads "six files". Task description accurate, no drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Two surgical edits: (1) append `SECURITY.md` to §1 scope list → 7 items; (2) "six files" → "seven files" in §2. No other count references found. SECURITY.md exists on disk at repo root.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — scope list is an existing bullet list inside a code block; appended SECURITY.md as the 7th entry following the established shape. Count fix is a word substitution. No new pattern.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Two edits to `.claude/skills/ft-audit-docs/SKILL.md`: (1) appended `SECURITY.md` to §1 scope block (line ~28); (2) changed "six files" → "seven files" in §2 (line ~46).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only edits to a SKILL.md file. No test suite or lint applies. No frontend changes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/CLAUDE-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change. Changed file (`.claude/skills/ft-audit-docs/SKILL.md`) is outside the AI-referenced docs set.
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Synced the forked `ft-audit-docs` SKILL.md with the CORE-121 SECURITY.md addition: added SECURITY.md to the §1 scope list and updated the §2 count from "six" to "seven". 1 SKILL.md file changed, 2 lines.

**Archived:** 2026-05-20
