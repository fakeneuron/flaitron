---
title: audit doc-drift sweep
status: completed
tags: []
created: 2026-05-11
due:
related-tasks: []
---

# CORE-082 | audit doc-drift sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix two doc-drift findings from the 2026-05-11 audit: stale §3.2 cross-references in MIGRATION.md and a bare `templates/...` path in the starter-task skill fragment that lacks Step 0's resolved-path prefix.

## ✅ Acceptance

- [ ] `docs/MIGRATION.md` §3.1 and §3.8 references to "§3.2's symlink step" / "symlinks added in §3.2" corrected to point at §1.2
- [ ] `claude/skills/task/step-3a-promote-starter.md:24` bare path carries the resolved-path prefix from Step 0
- [ ] `claude/skills/starter-task/SKILL.md:56` companion bare path similarly corrected

## 🧩 Subtasks

- [ ] Read MIGRATION.md lines ~223 and ~329; confirm the stale §3.2 cites and write the corrected §1.2 references
- [ ] Read `claude/skills/task/step-3a-promote-starter.md`; fix the bare `templates/...` path at line 24
- [ ] Read `claude/skills/starter-task/SKILL.md`; fix the companion bare path at line 56
- [ ] Verify no other stale §3.2-symlink references remain in scope files

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four cited locations confirmed present with the exact stale references described. No drift.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **MIGRATION.md line 223** (§3.1): `will fail §3.2's symlink step` — §3.2 is "Freeze the legacy plan"; symlinks are wired in §1.2 "Wire `/task`, `/starter-task`, …". Fix: `§1.2's symlink step`.
- **MIGRATION.md line 329** (§3.8): `symlinks added in §3.2` — same wrong section. Fix: `symlinks added in §1.2`.
- **step-3a-promote-starter.md line 24**: `copied from \`templates/tasknote-template.md\`` — bare path, breaks for adopting projects where the template lives at `_project/flowtron/templates/tasknote-template.md`. Fix: `copied from the template (path resolved in Step 0)`.
- **starter-task/SKILL.md line 56**: `in \`templates/tasknote-starter-template.md\`` — same bare-path issue. Fix: `in the starter template (path resolved in Step 0)`. (Lines 23/29 in that file already correctly list both layout variants; line 3 frontmatter description is narrative, not an actionable path reference — leave it.)
- Archive skim: CORE-045 (MIGRATION.md pre-flight rewrite), CORE-051 (starter-task SKILL cite-don't-restate), CORE-027 (starter workflow origin). No load-bearing prior context changes the approach.
- No clarifications needed. Changes are mechanical text substitutions.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — doc-only fixes; pattern is the existing resolved-path notation already used in task/SKILL.md Step 3b ("path resolved in Step 0") and the established §X.Y cross-ref style throughout MIGRATION.md
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only changes)

**Implementation Notes:**

Four surgical substitutions:
- `docs/MIGRATION.md:223` — `§3.2's symlink step` → `§1.2's symlink step`
- `docs/MIGRATION.md:329` — `symlinks added in §3.2` → `symlinks added in §1.2`
- `claude/skills/task/step-3a-promote-starter.md:24` — `` `templates/tasknote-template.md` `` → `the template (path resolved in Step 0)`
- `claude/skills/starter-task/SKILL.md:56` — `` `templates/tasknote-starter-template.md` `` → `the starter template (path resolved in Step 0)`

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:** N/A

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: no change · docs/MIGRATION.md: updated (this task) · claude/CLAUDE-snippet.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-11.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Fixed two doc-drift findings from the 2026-05-11 audit: corrected stale `§3.2` → `§1.2` cross-references in MIGRATION.md §3.1 and §3.8 (symlinks live in §1.2, not §3.2), and replaced bare `templates/...` paths in `step-3a-promote-starter.md:24` and `starter-task/SKILL.md:56` with the Step 0 resolved-path notation used elsewhere in the skill surface.

**Archived:** 2026-05-11
