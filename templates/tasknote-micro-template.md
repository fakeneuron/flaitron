---
title: One-line title
status: in-progress
tags: []
created: YYYY-MM-DD
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# TASK-ID | One-line title

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

<One-sentence description of what this micro-tasknote accomplishes.>

## ⚡ Notes

**Relevance:** Proceed | Re-scope | De-scope — <one-line rationale>
**Best Practices Review:** <responsibilities, dependency direction, existing abstractions, duplication, and any in-scope refactor or deferred cleanup; OR N/A with reason>
**Drift check:** <paths/line numbers/function names cited in PLAN.md still match current code, AND the plan neither contradicts a SPEC contract nor diverges from its PLAN.md line; OR "no drift" / specific findings>
**Archive skim:** <relevant findings from `.flaitron/tasknote/archive/<area>/` (prefer YAML `touches:`; also follow Related / `supersedes` / ⚠️), OR "no prior tasknotes touch these paths" — on an absent or empty `archive/<area>/`, re-check `<area>` against the README table first; a derived-and-wrong folder reads exactly like an empty one>
**Declared scope:** <YAML `touches:` filled with the paths this task expects to edit; OR "N/A — no file deliverable">
**Pattern survey:** <neighboring code or sibling shape extended, OR justification for a new shape>
**Implementation:** <ad-hoc free text — what changed, key decisions, anything load-bearing for future readers>
**Docs touched:** <per-entry verdict for `.flaitron/tasknote/README.md` §"AI-referenced docs" — "no change" or the update>

## ✅ Recap

<Brief final summary: what changed, key decisions, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), anything an `/ft-audit` pass should know. The PLAN.md flip + tasknote archive happen at recap time as part of closure (see SPEC/tasknote-selection.md §"When to use a tasknote" micro carve-out and `claude/skills/ft-micro-task/SKILL.md`).>

**Archived:** YYYY-MM-DD
