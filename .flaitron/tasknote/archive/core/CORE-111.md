---
title: ft-flowtron self-listing
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: []
---

# CORE-111 | ft-flowtron self-listing

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a `/ft-flowtron` row to the info screen's Bundled-skills table so the tool that adopters invoke to see the skill roster also appears in that roster.

## ✅ Acceptance

- [ ] `/ft-flowtron` row present in the Bundled-skills table in `claude/skills/ft-flowtron/SKILL.md`
- [ ] Row format is consistent with sibling rows (skill name, one-liner)

## 🧩 Subtasks

- [ ] Read `claude/skills/ft-flowtron/SKILL.md` lines 42–59 to confirm current table shape and find insertion point
- [ ] Insert `/ft-flowtron` row in alphabetical or logical order matching the table convention
- [ ] Verify no duplicate or stale row exists

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The table at `claude/skills/ft-flowtron/SKILL.md:42-59` is confirmed; `/ft-flowtron` is absent. Straightforward one-row insertion.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `claude/skills/ft-flowtron/SKILL.md` lines 42-59: header `## Bundled skills` at 40, table header at 42-43, 16 skill rows at 44-59. `/ft-flowtron` is absent. No drift from task description.
- Archive hits: CORE-107 (template-list trim in Key docs, not the skills table); CORE-104 (ft- namespace rename, listed 15 skills at the time — `ft-flowtron` was one of 15 skills in `claude/skills/` but the info-screen table was not updated to include itself); CORE-110 (Key docs section update, not skills table). No prior tasknote addressed this gap.
- Insertion point: end of the table (after `/ft-release`) — consistent with the "meta/ops" grouping at the bottom. One-liner derived from the SKILL.md frontmatter `description:` field.
- No clarifications needed. Assumptions: use table's existing format; one-liner from frontmatter description, trimmed to match table style.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Inserted `/ft-flowtron` row at end of the Bundled-skills table in `claude/skills/ft-flowtron/SKILL.md` (after `/ft-release`). One-liner derived from SKILL.md frontmatter `description:` field, trimmed to match table density. No tests applicable (markdown table edit).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

No test suite applies (markdown-only change). Lint: verified single insertion, no duplicate row, format consistent with 16 sibling rows. Confirmed table renders correctly around lines 56-62.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added the missing `/ft-flowtron` row to the Bundled-skills table in `claude/skills/ft-flowtron/SKILL.md` (line 60), so the tool an adopter invokes to see the skill roster now lists itself. One-liner derived from the SKILL.md frontmatter description. All 6 AI-referenced docs: no change.

**Archived:** 2026-05-18
