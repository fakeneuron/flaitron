---
title: overlay-markdown-counts
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-919, CORE-919.2]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/audit-overlay/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-919.4 | overlay-markdown-counts

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-919]]

## 🎯 Goal

Replace the hand-copied markdown file counts on the audit overlay's `docs:` scope line with the command that yields them, so the line stops going stale.

## ✅ Acceptance

- [x] No hand-copied count or date stamp remains on the `docs:` scope line — `! grep -nE '1,311|1,441|as of 2026-11-07' .flaitron/audit-overlay/SKILL.md` (prints nothing)
- [x] The replacing command runs and yields the archived share — `judgment` (no command decides prose); run once, output recorded in Testing Notes
- [x] Only the `docs:` scope line changed — `git diff --numstat HEAD -- .flaitron/audit-overlay/SKILL.md` shows 1 added / 1 deleted
- [x] Context budget, final-newline and drift checks still pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the clause after the dash on the `docs:` scope line: swap `1,311 of the repo's 1,441 … (as of 2026-11-07 …)` for the command that counts archived tasknotes
- [x] Run the embedded command; compare to the live count
- [x] Phase 3 receipt, closure

## 🔗 Related

- [[CORE-EPIC-919]] — parent epic
- [[CORE-919.2]] — predecessor; its External review filed this row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** the premise holds — `.flaitron/audit-overlay/SKILL.md` line 60 still reads `1,311 of the repo's 1,441 tracked markdown files … (as of 2026-11-07, …)`; it is the only comma-grouped figure or `as of` stamp in the file; one file in scope.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — N/A: prose edit in one skill file, no code or module boundaries

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Area: README table maps `CORE-*` → `archive/core/`. Archive skim: `archive/core/CORE-919.2.md` is the predecessor (same file); its Final Summary and External review name this figure as the deferred item. No other hit changes the plan.
- Plan/SPEC drift check: PLAN.md line matches; `SPEC.md` is v8.5.0; no `## 🌳 Fan-out` applies (CORE-919.1 was supplied by audit-repo, no `.1` note exists).
- Live counts today: `git ls-files '*.md'` → 1506; docs-scope selection → 134; archived tasknotes → 1371. The line's `1,311 of 1,441` has drifted, which is the row's point.
- The line's "wrong by two orders of magnitude" is itself a figure the counts do not support (1506 vs 134 is about one order). The replacement sentence states the ratio as a command instead of restating the claim.
- Clarifications: No clarifications needed. Assumption: replace with a command (the row's first option), keeping the sentence's purpose — why an unqualified `**/*.md` default is wrong; not dropping the figure outright.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the overlay convention CORE-919.2 used — a command in backticks beside the figure it sizes (the same line already says "append `| wc -l` for the file count").
- One edit, the clause after the dash on the `docs:` scope line: `1,311 of the repo's 1,441 … (as of 2026-11-07, …)` → a sentence naming the archived-tasknote count command. The "two orders of magnitude" claim went with it (the live ratio is about 11×, one order); the new sentence says "most of the repo's tracked markdown" instead of restating a magnitude.
- Tests: none added — prose-figure edit, no behavior change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — no rendered surface; markdown skill file only. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (Acceptance verify commands, run on the final file state):

```text
! grep -nE '1,311|1,441|as of 2026-11-07' .flaitron/audit-overlay/SKILL.md   → 0 (prints nothing)
git ls-files '*.md' | grep -c '^\.flaitron/tasknote/archive/'                 → 1371 (embedded command, run once)
git ls-files '*.md' | wc -l                                                    → 1506 (embedded command, run once)
git diff --numstat HEAD -- .flaitron/audit-overlay/SKILL.md                    → 1 added / 1 deleted
bash tools/drift-checks.sh                                                     → 0 (six pre-existing NEAR CAP warnings, none on the touched file)
```

Full validation set (`just check`) → 0 — 681 viz tests passed, typecheck, lint and build ok, every drift check ok.

External review (`/code-review medium`, this task's diff only) — two nits, no blockers:
- **nit** — "most of the repo's tracked markdown" is weaker than the old "two orders of magnitude" → **fixed**: now "the large majority" (live share 1371 of 1506, about 91%).
- **nit** — the archived-count command gave no total to read the share against → **fixed**: the total command `git ls-files '*.md' | wc -l` is named beside it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Replaced the hand-copied `1,311 of the repo's 1,441 tracked markdown files … (as of 2026-11-07)` figures on the audit overlay's `docs:` scope line with the two commands that yield them (archived-tasknote count and tracked total), and reworded the stale "two orders of magnitude" claim to "the large majority". One line changed in `.flaitron/audit-overlay/SKILL.md`. `just check` green (681 viz tests, all drift checks ok); External review found two nits, both fixed. Doc-drift sweep: no change — the old figures survive only in write-once archives and this task's own note. `touches:` reconciled — the diff matches the one declared path. Learnings: N/A. unattended-candidates: none

**Archived:** 2026-11-24
