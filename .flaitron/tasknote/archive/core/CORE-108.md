---
title: version-pin Pinned-to slot
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: []
---

# CORE-108 | version-pin Pinned-to slot

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Seed a `Pinned to: vX.Y.Z` placeholder in `templates/tasknote-README.md` and wire `ft-new-project` Step 6 to substitute the real version at adoption time.

## ✅ Acceptance

- [ ] `templates/tasknote-README.md` `## Flowtron version` section contains a `Pinned to: vX.Y.Z` line
- [ ] `claude/skills/ft-new-project/SKILL.md` Step 6 substitutes the chosen version string into that line at adoption time

## 🧩 Subtasks

- [x] Add `Pinned to: vX.Y.Z` line to `## Flowtron version` section in `templates/tasknote-README.md`
- [x] Wire `claude/skills/ft-new-project/SKILL.md` Step 6 to substitute the version at adoption time
- [x] Add matching note to `docs/MIGRATION.md` §1.5 (manual adoption path has the same gap)

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `templates/tasknote-README.md` has no `Pinned to:` line despite SPEC/versioning.md:18 and CLAUDE-snippet.md:20 both claiming the README records the pinned version. `ft-new-project` Step 6 creates the README but does not substitute a version. The gap is real and the fix is minimal.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

CORE-026 commit (`e9b07cf`) removed the "Pinned to:" line from `tasknote-README.md` as "redundant" in v0.4.0. It was redundant at the time because `ft-new-project` never populated it — adopters would always see `Pinned to: vX.Y.Z` unsubstituted. CORE-108 closes the loop: seed the slot AND wire the substitution. MIGRATION.md §1.5 (manual adoption path) references the same copy step without mentioning version substitution — also updating it to avoid a parallel gap.

No drift. All file paths and line-number citations verified against current state.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Three files changed:
1. `templates/tasknote-README.md` — added `Pinned to: vX.Y.Z` line in `## Flowtron version` section (plain prose, matches section style)
2. `claude/skills/ft-new-project/SKILL.md` Step 6 — prepended substitution instruction: replace `vX.Y.Z` with actual pinned version from Step 1
3. `docs/MIGRATION.md` §1.5 — added matching substitution note for the manual adoption path

No tests; documentation-only changes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Documentation-only. Visually confirmed each changed section reads correctly and is consistent across all three files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` updated (this task) · `claude/CLAUDE-snippet.md` no change
- [x] Closed — PLAN.md line flipped to stub form and moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Added `Pinned to: vX.Y.Z` slot to `templates/tasknote-README.md` and wired `ft-new-project` Step 6 + `docs/MIGRATION.md` §1.5 to substitute the actual version at adoption time. Closes the gap between SPEC/versioning.md's claim and the template reality.

**Archived:** 2026-05-17
