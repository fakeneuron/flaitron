---
title: "nit: snippet cd form + README layout gap"
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: []
---

# CORE-125 | nit: snippet cd form + README layout gap

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Normalize the `git show` invocation in `claude/CLAUDE-snippet.md` to the `git -C` form, and add `SECURITY.md` to the repo layout section in `README.md`.

## ✅ Acceptance

- [ ] `claude/CLAUDE-snippet.md` line 51 uses `git -C _project/flowtron show vX.Y.Z` (no `cd` form)
- [ ] `README.md` §"Repo layout" lists `SECURITY.md` as an entry

## 🧩 Subtasks

- [ ] Read `claude/CLAUDE-snippet.md` around line 51 and apply the `git -C` normalization
- [ ] Read `README.md` §"Repo layout" and add `SECURITY.md` entry
- [ ] Lint/type-check (N/A — markdown only)

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited issues confirmed at HEAD. `claude/CLAUDE-snippet.md:51` has `cd _project/flowtron && git show vX.Y.Z` (the `cd` form to normalize). `README.md §"Repo layout"` has no SECURITY.md entry (SECURITY.md is in §"Documents" but absent from the layout inventory).

- [x] Read relevant source files
- [x] **Archive skim** — CORE-070 established the current §"Repo layout" shape (pre-SECURITY.md); CORE-121 added SECURITY.md to `_project/tasknote/README.md §"AI-referenced docs"` but explicitly scoped out §"Repo layout" — that's the gap this task fills. CORE-055 / CORE-091 show no prior decision on `git -C` vs `cd` form. No conflicting prior decisions.
- [x] **Drift check** — `claude/CLAUDE-snippet.md:51` confirmed with `cd _project/flowtron && git show vX.Y.Z`. `README.md:100-111` §"Repo layout" confirmed without SECURITY.md entry. No drift from task description.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: SECURITY.md goes between `CONTRIBUTING.md` and `LICENSE` in §"Repo layout" (consistent with the standalone-files group). Short descriptor mirrors the §"Documents" entry without the full parenthetical.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

CORE-070 (repo-layout-doc-currency) explicitly excluded SECURITY.md changes (it didn't exist yet). CORE-121 (security-md-ai-ref-decision) added SECURITY.md to the tasknote README AI-referenced docs list but left README.md §"Repo layout" untouched. Both confirm this task is the correct owner of the gap.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `git -C <dir>` form is the established pattern (CLAUDE.md mandates no `cd dir &&`); SECURITY.md placement mirrors `CONTRIBUTING.md` / `LICENSE` grouping in §"Repo layout"
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only changes

**Implementation Notes:**

`claude/CLAUDE-snippet.md:51`: replaced `` `cd _project/flowtron && git show vX.Y.Z` `` → `` `git -C _project/flowtron show vX.Y.Z` ``
`README.md:109`: inserted `- \`SECURITY.md\` — threat model and vulnerability reporting` between `CONTRIBUTING.md` and `LICENSE`

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend changes)

**Testing Notes:**

Mental render pass: both markdown files render cleanly. The `git -C` form is valid shell. The new SECURITY.md bullet in §"Repo layout" is syntactically consistent with surrounding entries.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: changed (SECURITY.md bullet added to §"Repo layout"; list entry "public-facing flowtron repo overview" still accurate). `claude/CLAUDE-snippet.md`: changed (git -C normalization; list entry unchanged). All other AI-referenced docs: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-20.` and tasknote moved to `_project/tasknote/archive/core/CORE-125.md`
- [x] Recap drafted

**Final Summary:**

Fixed two nits surfaced by the 2026-05-20 audit-docs run: normalized `claude/CLAUDE-snippet.md:51` from `cd _project/flowtron && git show vX.Y.Z` to `git -C _project/flowtron show vX.Y.Z` (consistent with the no-cd shell discipline), and added `SECURITY.md` to `README.md §"Repo layout"` alongside `CONTRIBUTING.md` and `LICENSE`.

**Archived:** 2026-05-20
