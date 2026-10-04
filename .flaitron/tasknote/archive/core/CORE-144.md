---
title: ft-release-doc-list-update
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-144 | ft-release-doc-list-update

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the stale hardcoded doc-list parenthetical from `claude/skills/ft-release/SKILL.md` §7.1 so it no longer drifts out of sync with the canonical AI-referenced doc set.

## ✅ Acceptance

- [ ] `claude/skills/ft-release/SKILL.md` §7.1 no longer contains a hardcoded file list that can drift from `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Confirm the exact text to remove in §7.1
- [ ] Edit `claude/skills/ft-release/SKILL.md` to drop the parenthetical
- [ ] Verify no other occurrences of the stale 4-doc list remain in ft-release SKILL.md

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** §7.1 of `claude/skills/ft-release/SKILL.md` (line 159) contains `— currently \`README.md\`, \`SPEC.md\`, \`docs/MIGRATION.md\`, \`claude/AGENTS-snippet.md\`` which is a stale 4-doc list; the actual set in `_project/tasknote/README.md` is now 7 docs. The parenthetical is redundant (the pointer to README.md is already present) and drift-prone.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-121 added SECURITY.md to the doc set; CORE-047 established the doc-set drift contract. The 4-doc parenthetical predates those additions and was never updated. No contradictory decisions found.
- [x] **Drift check** — `claude/skills/ft-release/SKILL.md:159` reads exactly `_project/tasknote/README.md` §"AI-referenced docs" — currently \`README.md\`, \`SPEC.md\`, \`docs/MIGRATION.md\`, \`claude/AGENTS-snippet.md\`\`):` — confirmed stale.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: drop the `— currently ...` parenthetical suffix entirely; the pointer to `_project/tasknote/README.md §"AI-referenced docs"` is the canonical reference and listing the docs inline is redundant. This is consistent with the cite-don't-restate principle used elsewhere in flowtron.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The stale text lives at `claude/skills/ft-release/SKILL.md:159`. The fix is one targeted deletion: remove `— currently \`README.md\`, \`SPEC.md\`, \`docs/MIGRATION.md\`, \`claude/AGENTS-snippet.md\`` from the parenthetical, leaving the pointer to the README as the sole reference. No other files need changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — deletion of a redundant inline list matching the cite-don't-restate pattern used throughout flowtron; the pointer to README.md is the canonical reference shape.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

`claude/skills/ft-release/SKILL.md:159` — removed `— currently \`README.md\`, \`SPEC.md\`, \`docs/MIGRATION.md\`, \`claude/AGENTS-snippet.md\`` from the §7.1 parenthetical. The pointer to `_project/tasknote/README.md §"AI-referenced docs"` remains as the sole reference. 1 file, ~1 line deleted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edit. No test surface. Verified the stale list is gone via grep; surrounding prose is intact. No frontend files touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change. Only `claude/skills/ft-release/SKILL.md` changed (not in the AI-referenced set).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` and tasknote moved to `_project/tasknote/archive/core/CORE-144.md`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Removed the stale hardcoded 4-doc list from `claude/skills/ft-release/SKILL.md` §7.1, leaving the pointer to `_project/tasknote/README.md §"AI-referenced docs"` as the sole reference. Eliminates future drift risk; consistent with cite-don't-restate principle.

**Archived:** 2026-05-23
