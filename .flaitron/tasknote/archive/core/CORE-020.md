---
title: Update /new-project skill and MIGRATION.md for new template format
status: completed
priority: Medium
area: core
model: sonnet
tags: []
created: 2026-05-01
due:
related-tasks: []
---

# CORE-020 | Update /new-project skill and MIGRATION.md for new template format

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Update the `/new-project` skill and `docs/MIGRATION.md` to reflect the CORE-018 template format (YAML frontmatter + spec-on-top + log-below body shape), and optionally surface natabula as a higher-level opinionated setup option.

## ✅ Acceptance

- [ ] `/new-project` skill accurately reflects the current template format
- [ ] `docs/MIGRATION.md` accurately reflects the current template format
- [ ] Natabula is mentioned (if in scope — see clarifying questions)
- [ ] No references to old template shape remain in either file

## 🧩 Subtasks

- [ ] Audit `/new-project` SKILL.md for gaps vs. current template format
- [ ] Audit `docs/MIGRATION.md` §1.4–1.5 for gaps vs. current template format
- [ ] Apply changes to SKILL.md
- [ ] Apply changes to MIGRATION.md
- [ ] (optional) Add natabula mention

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-018 shipped the new tasknote template format (YAML frontmatter + spec-on-top + log-below). The `/new-project` skill and `docs/MIGRATION.md` predate that change. Audit found both files are procedurally correct but neither surfaces the new template shape to adopters; the natabula mention is still unaddressed.

- [x] Read relevant source files
  - `claude/skills/new-project/SKILL.md`
  - `claude/commands/new-project.md`
  - `docs/MIGRATION.md`
  - `templates/tasknote-template.md`
  - `templates/tasknote-README.md`
  - `templates/PLAN.md`

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

  All file paths confirmed present. One minor discrepancy noted: `tasknote-README.md` Layout section says `tasknote-template.md — copy this when starting a new task` (implying a local copy), but the new-project skill never copies it there. User confirmed this is not in scope; procedural gaps are acceptable.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Scope confirmed:**
  - Add a brief description of the YAML frontmatter + spec-on-top + log-below shape to `docs/MIGRATION.md` §1.5 and `claude/skills/new-project/SKILL.md` Step 6
  - Add a natabula callout in `docs/MIGRATION.md` §1 intro (not in SKILL.md)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Drift check clean. No functional gaps in scope — this is a prose/description update only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

  `docs/MIGRATION.md` uses no existing callout pattern. Chose blockquote (`>`) as the natural markdown callout shape. Prose-only changes; no new abstractions.

- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs)
- [x] Ran targeted tests on changed files — N/A (markdown docs)

**Implementation Notes:**

Three changes:
1. `docs/MIGRATION.md` §1 — added natabula blockquote callout immediately after the `## 1 — Fresh adoption` heading
2. `docs/MIGRATION.md` §1.5 — added paragraph describing the tasknote template shape after the existing "Edit the Pinned to:" instructions
3. `claude/skills/new-project/SKILL.md` Step 6 — added paragraph describing the template shape after the existing edit-bullet list

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown docs)
- [x] Ran lint/type-check on changed code — N/A (markdown docs)
- [x] (frontend) Asked the user for visual confirmation — N/A
- [x] Fixed all introduced issues — N/A

**Testing Notes:**

Documentation-only task. Visual read-through confirmed prose is correct and placements are coherent.

## 🚀 Phase 4: Closure

- [ ] Verified all prior phases complete
- [ ] Updated docs/inventories affected by the change
- [ ] Updated PLAN.md (status flipped to `Completed YYYY-MM-DD`)
- [ ] Updated nav header status icon to ✅ Completed
- [ ] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Added natabula callout in `docs/MIGRATION.md` §1 and template-format descriptions in `docs/MIGRATION.md` §1.5 and `claude/skills/new-project/SKILL.md` Step 6. Prose-only changes; no procedural or functional modifications.

**Archived:** 2026-05-01
