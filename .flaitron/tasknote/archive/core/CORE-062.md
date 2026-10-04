---
title: lift date-format bullet
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-038, CORE-049]
---

# CORE-062 | lift date-format bullet

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-038]] [[CORE-049]]

## 🎯 Goal

Lift the trailing "Date format: YYYY-MM-DD..." Notes bullet from the 7 SKILL.md files into SPEC, then drop the restatements per the cite-don't-restate pattern from [[CORE-038]] / [[CORE-049]].

## ✅ Acceptance

- [ ] SPEC carries the date-format rule exactly once (in §"Tasknote frontmatter" or §"`## Completed` archive convention")
- [ ] All 7 SKILL.md files have the trailing Notes bullet removed (no restatement)
- [ ] No other file restates the date-format rule outside SPEC

## 🧩 Subtasks

- [ ] Identify all 7 SKILL.md files carrying the date-format bullet and verify exact wording
- [ ] Decide canonical home in SPEC (§"Tasknote frontmatter" vs §"`## Completed` archive convention") and add the rule
- [ ] Remove the bullet from each SKILL.md file
- [ ] Doc-drift sweep and closure

## 🔗 Related

- [[CORE-038]] — established cite-don't-restate pattern for SKILL.md files (predecessor)
- [[CORE-049]] — workflow token audit that extended the pattern (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exactly 7 SKILL.md files confirmed; CORE-056 audit documented the three phrasings and recommended this exact change. Fully mechanical.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-038 established the cite-don't-restate pattern; CORE-049 extended it; CORE-056 triaged this as a follow-up. No contradictory decisions found.
- [x] **Drift check** — No drift. All 7 files match the description. Three phrasings as CORE-056 documented: (a) task/release: "for `Completed` and `Archived` fields"; (b) micro-task: "for `created:`, `Completed`, and `Archived` fields"; (c) starter-task/file-followup/epic-discovery/close-epic: unqualified "always use `YYYY-MM-DD`."
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Canonical SPEC placement: `§"Tasknote frontmatter"` — already a hub section; `created:` is defined there; other sections already cite back here. Will add as a final sentence before the next `##` heading.

Wording in SPEC (most comprehensive, normalizes the three divergent phrasings):
`**Date format:** always use `YYYY-MM-DD` for `created:`, `Completed`, and `Archived` date fields.`

The date-format bullet is the last line of `## Notes` in each of the 7 files. Removal leaves the Notes section with 1–8 remaining bullets depending on file — all clean.

No clarifications needed. The CORE-056 audit already resolved all ambiguity.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — cite-don't-restate shape already active across all skills (CORE-038, CORE-049–051); extending the same pattern to 5 more SKILL files + adding the one missing SPEC anchor
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Added `**Date format:** always use \`YYYY-MM-DD\` for \`created:\`, \`Completed:\`, and \`Archived\` date fields.` to SPEC.md §"Tasknote frontmatter" (line 164, between the frontmatter prose and `## Starter tasknotes`). Removed the trailing date-format bullet from all 7 SKILL.md files (last line of `## Notes` in each).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation

**Testing Notes:**

Doc-only change — no test suite applies. Verified with grep: zero `- **Date format:**` bullets remain in `claude/skills/*/SKILL.md`; SPEC.md anchor confirmed at line 164.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change. `SPEC.md`: updated (date-format anchor added). `docs/MIGRATION.md`: no change. `claude/CLAUDE-snippet.md`: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Added a single `**Date format:**` anchor to SPEC.md §"Tasknote frontmatter". Removed the restatement bullet from all 7 `claude/skills/*/SKILL.md` files that carried it. Net: one canonical source for the date-format rule; 7 SKILL files shed their trailing Notes bullet.

**Archived:** 2026-05-09
