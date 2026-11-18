---
title: direct-edit-path
status: starter
tags: []
created: 2026-11-17
touches:
  - SPEC/tasknote-selection.md
  - SPEC/plan-filing.md
  - claude/skills/ft-task/preamble.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-915 | direct-edit-path

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-17)

## 🌱 Starter context

_Captured 2026-11-17 during a post-closure fix session (7fe2c277). Promote to a full tasknote at `/ft-task` checkout._

### Why this exists

The operator wants simple tasks to run taskless more often, with less ceremony. The prompt was 7fe2c277, a one-sentence fix to `SPEC/post-closure.md` committed with no task ID and no rule that said this was allowed. The skip tier (`SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)") exists but has three gaps:

1. It only covers **filed rows** (`SPEC/plan-filing.md` §"Exception — skip-tier closures"). Nothing defines an **unfiled** fix found mid-session, so taskless commits are improvised.
2. Eligibility is **size-based** (typo, formatting, doc patch under ~25 lines, trivial config), not **risk-based**. A one-sentence SPEC contract change qualifies. An obvious three-line single-file code fix with a test does not.
3. **No defined checks or record.** There are no pre-commit checks (drift checks, context budget, the narrowest §"Validation" command) and no recording convention: the commit message shape, and whether a `## Completed` row is written.

### Solution shape

- Eligibility judged on blast radius, not line count: single file (or a tight pair), no new decision, behaviour obvious from the diff, cheap to revert.
- A short "direct edit" protocol: diff shown, narrowest validation run, commit.
- Covers both filed rows (the existing exception) and unfiled fixes.
- Stays a routing rule, not a new skill.

### Files to touch (preliminary survey — drift-check at promotion)

- `SPEC/tasknote-selection.md` — skip list and routing.
- `SPEC/plan-filing.md` — §"Exception — skip-tier closures", plus a possible no-row variant.
- `claude/skills/ft-task/preamble.md` — the Step 1 tier advisory; near its budget cap.
- `docs/CONTEXT-BUDGET.md` — if any budgeted file grows.

### Explicitly out of scope

- Changing the micro tier's shape.
- Relaxing gates on epic children — they keep their tasknotes because closing one drives the parent flip.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Weight | Starter, not epic | One deliverable: widen the skip tier and add a short protocol |

### Acceptance that decides it

- The skip tier names eligibility, required checks, and the recording shape for both filed and unfiled edits — `bash tools/drift-checks.sh`
- Budgets hold — `bash tools/drift-checks.sh` (context budgets)

### Open at promotion (Phase 1 should resolve)

- Does an unfiled direct edit write a `## Completed` row, or is the commit the only record? Lean: commit only. A row would bring back the ceremony this task removes.
- Should a SPEC contract change, like 7fe2c277, count as eligible even though it's tiny? Lean: yes when it clarifies existing intent; no when it adds a new rule.
- Commit message shape: plain `fix:` / `docs:` with no ID, or a marker? Lean: plain, as in 7fe2c277.
- Should `/ft-task` get a route for unfiled work, or does this stay prose-only routing? Lean: prose-only.

### Related

- 7fe2c277 — the taskless fix that prompted this.
