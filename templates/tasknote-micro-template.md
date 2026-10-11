---
title: Task Title
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

# TASK-ID | Task Title

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[RELATED]]

## 🎯 Goal

One-sentence goal of what this task accomplishes.

## ✅ Acceptance

- [ ] Criterion 1 — `verify command`
- [ ] Criterion 2 — `judgment` (or `👁️`) + one-line reason when no command decides it

## 🧩 Subtasks

- [ ] Step 1
- [ ] Step 2

## 🔗 Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic; edge type hint when set — SPEC.md §"Tasknote body shape")

---

## ⚡ Notes

**Relevance:** Proceed | Re-scope | De-scope — <one-line rationale>
**Best Practices Review:** <responsibilities, dependency direction, existing abstractions, duplication, and any in-scope refactor or deferred cleanup; OR N/A with reason>
**Archive skim:** <relevant findings from `.flaitron/tasknote/archive/<area>/` (prefer YAML `touches:`; also follow Related / `supersedes` / ⚠️), OR "no prior tasknotes touch these paths" — on an absent or empty `archive/<area>/`, re-check `<area>` against the README table first>
**Drift check:** <cited paths and hypotheses match current code, AND the plan matches its PLAN.md line and the SPEC; OR the specific findings>
**Clarifications:** <answers, OR "No clarifications needed" with the explicit assumptions>
**Pattern survey:** <neighboring code or sibling shape extended, OR justification for a new shape>
**Implementation:** <what changed, key decisions, refactors made or deferred with reason>
**Verification receipt:** <each Acceptance verify command as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs; a frontend change's 👁️ CONFIRM reply; OR N/A with reason>
**External review:** <findings with disposition (blocker → back to Implementation; note → fixed or filed), OR N/A with reason>
**Docs touched:** <per-entry verdict for `.flaitron/tasknote/README.md` §"AI-referenced docs" — "no change" or the update; plus a Learnings line for the always-loaded layer, or N/A>

**Final Summary:**

**Archived:** YYYY-MM-DD
