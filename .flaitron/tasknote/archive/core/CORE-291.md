---
title: prune-stale-project-allows
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-291 | prune-stale-project-allows

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Remove the 12 allowlist entries in `.claude/settings.local.json` referencing `_project/` paths that no longer exist (migrated to `.flowtron/`).

## ✅ Acceptance

- [ ] All `_project/`-path allowlist entries removed from `.claude/settings.local.json`
- [ ] No valid/active allow entries are inadvertently removed
- [ ] File is valid JSON after edits

## 🧩 Subtasks

- [ ] Read `.claude/settings.local.json` and identify all entries referencing `_project/`
- [ ] Confirm those paths no longer exist in the repo
- [ ] Remove the stale entries
- [ ] Verify file is valid JSON

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `_project/` directory confirmed absent (migrated to `.flowtron/`). All 12 entries referencing `_project/` paths are stale allowlist accumulation.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched `.claude/settings.local.json`; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — verify that `_project/` paths referenced in the task description still appear in `.claude/settings.local.json` (i.e., haven't already been removed)

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `_project/` directory does not exist (`ls /.../_project/` → NOT FOUND); all entries referencing it as a file path are unreachable.
- CORE-220 (settings-local-allowlist-growth, 2026-05-30): pruned from 46→33 entries; did not specifically target `_project/` entries. CORE-214 (settings-local-hygiene, 2026-05-27): similar hygiene pass. Neither covered this specific stale set.
- Exactly 12 entries identified at lines 33–35, 67, 73, 74, 79, 87, 88, 90, 92, 93 of settings.local.json. Breakdown:
  - 3 historical `xargs perl` migration commands (lines 33–35) — referenced `_project/flowtron/` as a regex literal; migration is complete, commands will never be re-run.
  - 1 grep scanning `claude/AGENTS-snippet.md` for `_project/flowtron/` prefix (line 73) — migration complete.
  - 8 commands that access `_project/` as a literal file path (lines 67, 74, 79, 87, 88, 90, 92, 93) — directory gone, commands would fail.
- No clarifications needed. Assumptions: all 12 entries are safe to remove; no valid active allow rule references `_project/`.
- Will use Python to parse, filter, and re-emit JSON safely to avoid malformed output.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: Python parse→filter→re-emit to avoid JSON trailing-comma errors. Removed all 12 entries containing `_project/` from the `allow` array. File: `.claude/settings.local.json` (152→140 entries). No tests apply (settings file, not code).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

No test suite for settings JSON. Lint/type-check: validated JSON with `python3 json.load` post-edit (valid, correct entry count, zero `_project/` remaining). No frontend changes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: no change (only `.claude/settings.local.json` was modified, which is gitignored/intentionally personal)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-06.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Removed 12 stale allowlist entries from `.claude/settings.local.json` referencing `_project/` paths (the directory was migrated to `.flowtron/` and no longer exists). File went from 152→140 allow entries; JSON validated clean post-edit.

**Technical detail:** 1 file edited (`.claude/settings.local.json`, -12 entries). Used Python parse→filter→re-emit to ensure valid JSON. All 12 entries confirmed absent post-edit. No other files touched; no frontend changes; no privileged-ops surface → autonomous commit expected.

**Archived:** 2026-06-06
