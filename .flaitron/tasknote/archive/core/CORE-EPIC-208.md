---
title: heavy-light-suggestions
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: ["CORE-208.1", "CORE-208.2", "CORE-208.3", "CORE-208.4", "CORE-208.5", "CORE-208.6", "CORE-208.7", "CORE-208.8"]
---

# CORE-EPIC-208 | heavy-light-suggestions

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-208.1]] [[CORE-208.8]]

## 🎯 Goal

Close the CORE-EPIC-208 `heavy-light-suggestions` epic in PLAN.md: flip CORE-208.6's unchecked line to stub form and flip the parent to stub form, then move the cohort block to `## Completed`.

## ✅ Acceptance

- [ ] CORE-208.6 PLAN.md line stubbed as `Completed 2026-05-26.`
- [ ] CORE-EPIC-208 parent line stubbed as `Completed 2026-05-29.` and block moved to `## Completed`
- [ ] All 8 children remain listed under the parent in `## Completed`

## 🧩 Subtasks

- [ ] Flip CORE-208.6 in PLAN.md from `- [ ]` to stub `- [x] … Completed 2026-05-26.`
- [ ] Flip parent CORE-EPIC-208 to `- [x] … Completed 2026-05-29.` and move cohort block from `## High` to top of `## Completed`
- [ ] Phase 4 closure: doc-drift sweep + archive this tasknote + stub-flip this CORE-EPIC-208.md entry in PLAN.md

## 🔗 Related

- [[CORE-208.1]] — discovery (filed epic children)
- [[CORE-208.2]] — ft-task-epic-copy-paste
- [[CORE-208.3]] — micro-audit-fragments
- [[CORE-208.4]] — global-claude-md
- [[CORE-208.5]] — verify-sweep
- [[CORE-208.6]] — audit (stale placeholder); archived 2026-05-26; PLAN.md checkbox left open per user choice during .6 task, deferred to .8
- [[CORE-208.7]] — suggestion-ux-cleanup
- [[CORE-208.8]] — final audit; confirmed all children complete + no misses; called out pending parent flip

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All 8 children (.1–.8) are complete and archived. CORE-208.6's archive tasknote has `status: completed` (2026-05-26) but its PLAN.md checkbox was intentionally left open (per user choice during the .6 task), deferred to the .8 audit. CORE-208.8 is checked and archived; its Final Summary explicitly calls out the pending parent flip. The only remaining work is PLAN.md hygiene.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Read PLAN.md (lines 14–22: full CORE-EPIC-208 block under `## High`), CORE-208.6.md archive, and CORE-208.8.md archive for context.

**Archive skim (core/, CORE-208*.md):** All 8 siblings present in archive/core/. Key findings:
- CORE-208.8 Final Summary: "With .8 closure, all 8 children of CORE-EPIC-208 will be [x]. Operator may now manually flip the parent line to stub form and move the cohort block to `## Completed`."
- CORE-208.6 Phase 4: ".6 PLAN line left [ ] per choice (no stub flip); supersession context now in this archive for .8." Intentional deferral confirmed.
- No conflicting decisions; no other tasknotes touch the CORE-EPIC-208 parent line.

**Drift check:** PASS. PLAN.md currently shows CORE-EPIC-208 under `## High` with .6 unchecked and parent unchecked — matches expectations from archive reads exactly.

**No clarifications needed.** Scope is unambiguous.

**Explicit assumptions:**
- CORE-208.6 completion date = 2026-05-26 (matches archive `created:` and .8 audit notation)
- Parent stub date = 2026-05-29 (today)
- Cohort block moves to top of `## Completed` as the most recently completed item
- CORE-208.8 frontmatter `status: in-progress` is a write-once artifact; actual state is completed per Phase 4 + "Archived: 2026-05-26"
- `## High` section will be left empty after removing the block (consistent with `## Low` pattern)
- The `🔧` emoji stays in all stub lines (already present in current PLAN.md lines)

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: prior epic parent closures (CORE-EPIC-211, CORE-EPIC-205, etc.) follow the same shape — stub the parent line + move cohort block to `## Completed`, children listed indented. Followed that pattern exactly.

Minimal solution: two edits to `_project/PLAN.md`:
1. Removed the CORE-EPIC-208 block (parent + 8 children) from `## High`; left `## High` empty (consistent with `## Low` pattern).
2. Inserted the completed stub block at the top of `## Completed`: parent stubbed as `Completed 2026-05-29.`, CORE-208.6 stubbed as `Completed 2026-05-26.`, all other children preserved as-is.

N/A for tests (pure markdown PLAN.md edit).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure PLAN.md edit (no code, no behavior, no frontend surface). Manual hygiene verification: confirmed correct placement in `## Completed` (top of section, above CORE-214), all 8 children listed with 2-space indent, CORE-208.6 and parent now `[x]` + stub form, `## High` left empty. Lint/type-check: N/A for `.md`. Frontend: N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (2026-05-29):**
- `README.md`: no change
- `SPEC.md`: no change
- `docs/MIGRATION.md`: no change
- `claude/AGENTS-snippet.md`: no change
- `docs/CONVENTIONS.md`: no change
- `CONTRIBUTING.md`: no change
- `SECURITY.md`: no change
- `docs/AGENT-NEUTRALITY.md`: no change
- `docs/PLATFORMS.md`: no change

Only `_project/PLAN.md` and this tasknote were changed — neither is in the AI-referenced docs list.

**Recap:** Closed the CORE-EPIC-208 `heavy-light-suggestions` epic by flipping the stale CORE-208.6 open checkbox and the parent line to stub form in PLAN.md, and moving the 9-entry cohort block (parent + 8 children) from `## High` to the top of `## Completed`.

2 PLAN.md edits; 0 AI-referenced docs changed; no code or frontend surface touched. Phase 1 skip 🛠️ (no scope deviation); Phase 2 was 2-line PLAN.md update; Phase 3 N/A (pure markdown). All 8 children already archived in archive/core/ since 2026-05-26.

**Archived:** 2026-05-29
