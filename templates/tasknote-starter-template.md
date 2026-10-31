---
title: One-line title
status: starter
tags: []
created: YYYY-MM-DD
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# `### Files to touch` below stays the prose survey; YAML `touches:` is the
# short queryable list once known.
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

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed YYYY-MM-DD)

## 🌱 Starter context

_Captured YYYY-MM-DD during <design discussion / mid-flow discovery / etc.> — promote to full tasknote at `/ft-task` checkout._

### Why this exists

<Rationale: the problem this solves, why captured context is rich enough to preserve as a starter rather than a one-line PLAN.md entry.>

### Solution shape

- <Key design decision>
- <Key design decision>

### Files to touch (preliminary survey — drift-check at promotion)

- `path/to/file` — <change summary>

### Explicitly out of scope

- <thing> — <why split / follow-up task>

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| <Decision> | <Choice> | <Why> |

### Acceptance that decides it

<!-- Promotion copies these into `## ✅ Acceptance` verbatim. Each names the
     command that decides it; none is `judgment` / `👁️`. Required, with
     `touches:` and an empty "Open at promotion", for a `[heavy]` or
     rendered-surface row to be an `[unattended]` candidate
     (SPEC/unattended-candidacy.md §"Readiness basis"). -->

- <Criterion> — `<verify command>`

### Open at promotion (Phase 1 should resolve)

- <Question>. Lean: <answer>.

### Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic; type-hint `blocked-by:` / `parallel-safe-with:` / `supersedes:` / `depends-on:` / `related-decision:` when the edge is set)
