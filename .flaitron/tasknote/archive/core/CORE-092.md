---
title: epic-discovery cite-don't-restate
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-038, CORE-050, CORE-051]
---

# CORE-092 | epic-discovery cite-don't-restate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-038]] [[CORE-050]] [[CORE-051]]

## 🎯 Goal

Collapse the inline AI-referenced doc-set enumeration in `claude/skills/epic-discovery/SKILL.md:179`'s doc-drift sweep bullet to a defer-to-README cite, matching the `task/`, `micro-task/`, `close-epic/` precedent.

## ✅ Acceptance

- [ ] `claude/skills/epic-discovery/SKILL.md` Step 9 doc-drift sweep bullet no longer enumerates the adopter/flowtron self-hosted doc sets inline
- [ ] The bullet defers to `<tasknote dir>/README.md` §"AI-referenced docs" by reference only, matching the task/SKILL.md and close-epic/SKILL.md pattern

## 🧩 Subtasks

- [ ] Remove the parenthetical `(typical adopter set: ...; flowtron self-hosted set: ...)` from line 179 of `claude/skills/epic-discovery/SKILL.md`
- [ ] Verify resulting prose reads cleanly against the close-epic/task precedent
- [ ] Doc-drift sweep and close out

## 🔗 Related

- [[CORE-038]] — task/SKILL.md cite-don't-restate (precedent)
- [[CORE-050]] — micro-task/SKILL.md cite-don't-restate (precedent)
- [[CORE-051]] — close-epic/SKILL.md cite-don't-restate (precedent)
- [[CORE-074]] — bulk cite-not-restate sweep (touched epic-discovery Steps 2 + 10; missed Step 9)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Line 179 of `claude/skills/epic-discovery/SKILL.md` contains `(typical adopter set: `README.md` / `CLAUDE.md` / `_project/PLAN.md`; flowtron self-hosted set: `README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md`)` inline — a restatement of `_project/tasknote/README.md` §"AI-referenced docs" content. CORE-074 swept Steps 2 and 10 of this file but left Step 9 untouched. Gap confirmed.

- [x] Read relevant source files
- [x] **Archive skim** — checked `_project/tasknote/archive/core/` for prior tasknotes touching `epic-discovery/SKILL.md`. CORE-074 is the most load-bearing hit: it confirms it deliberately left Step 9's doc-drift sweep enumeration, focusing on the area-list (Step 2) and bundle-parts (Step 10). No other prior tasknote touched line 179. No design decisions to preserve.
- [x] **Drift check** — `claude/skills/epic-discovery/SKILL.md` line 179 contains the inline enumeration exactly as cited in the task description. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: the parenthetical text `(typical adopter set: ...; flowtron self-hosted set: ...)` is the only content to remove; the surrounding bullet prose (`for each entry in ... state per-entry verdict...`) and the trailing sentence about pure Discovery filing both stay intact.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

CORE-074 swept 6 SKILL files in the cite-not-restate pass. It removed area-prefix decoder lists (Step 2) and bundle-parts enumerations (Step 10) from epic-discovery/SKILL.md, but the doc-drift sweep enumeration in Step 9 (line 179) was outside that task's scope and was left. CORE-092 is the targeted follow-up for that single remaining site.

The target form — `for each entry in <tasknote dir>/README.md §"AI-referenced docs", state per-entry verdict ("no change" or the specific update)` — is already used verbatim in the tasknote template's Phase 4 checklist (`templates/tasknote-template.md`) and is consistent with how task/SKILL.md (Step 5) and close-epic/SKILL.md reference the same doc-set.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `claude/skills/task/SKILL.md` Step 5 and `templates/tasknote-template.md` Phase 4 both use the bare-cite form `for each entry in ... §"AI-referenced docs", state per-entry verdict ("no change" or the specific update)` — same shape applied here.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Removed the parenthetical `(typical adopter set: `README.md` / `CLAUDE.md` / `_project/PLAN.md`; flowtron self-hosted set: `README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md`)` from `claude/skills/epic-discovery/SKILL.md:179`. Surrounding prose and trailing sentence preserved verbatim. 1 line touched, net -1 parenthetical clause.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edit. Mental-pass: prose flows cleanly from `§"AI-referenced docs"` directly into `, state per-entry verdict...`; no trailing whitespace; formatting intact. No test suite or linter applicable. No frontend surface.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/CLAUDE-snippet.md` no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Removed the inline doc-set enumeration from `claude/skills/epic-discovery/SKILL.md:179` — the doc-drift sweep bullet now defers to `_project/tasknote/README.md` §"AI-referenced docs" by reference only, consistent with task/, micro-task/, and close-epic/ precedents. This was the one site CORE-074's cite-not-restate sweep missed. 1 file touched, 1 clause removed, prose reads cleanly.

**Archived:** 2026-05-14
