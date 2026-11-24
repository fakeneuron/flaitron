---
title: overlay-figures-to-commands
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-919, CORE-919.3]
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

# CORE-919.2 | overlay-figures-to-commands

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-919]]

## 🎯 Goal

Make `.flaitron/audit-overlay/SKILL.md` stop carrying stale hand-copied figures: bump `flaitron-reconciled:` to v8.5.0 and swap the docs-scope file count and the structure pass-4 line counts for the commands that produce them.

## ✅ Acceptance

- [x] `flaitron-reconciled:` reads v8.5.0 — `grep -q '^flaitron-reconciled: v8.5.0$' .flaitron/audit-overlay/SKILL.md`
- [x] The bump is justified: scaffold diff empty — `git diff --quiet v8.4.0 v8.5.0 -- claude/skills/ft-audit/`
- [x] No stale `at v8.3.0` figure remains — `! grep -n 'at v8.3.0' .flaitron/audit-overlay/SKILL.md` (prints nothing)
- [x] Docs-scope count and pass-4 median / p90 / outlier lines are commands — `judgment` (no command decides prose); each embedded command is run once and its output compared in Testing Notes
- [x] Frontend chunk sizes untouched — `git diff -U0 HEAD -- .flaitron/audit-overlay/SKILL.md | grep -c '75.6 kB'` prints 0
- [x] Context budget and drift checks still pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Bump the `flaitron-reconciled:` frontmatter pin to v8.5.0
- [x] Docs-scope bullet: replace `(129 files at v8.3.0)` with a `| wc -l` on the existing command
- [x] Structure pass-4: replace median / p90 / file count / outlier line counts with the one command that yields them
- [x] Phase 3 receipt, closure

## 🔗 Related

- [[CORE-EPIC-919]] — parent epic
- [[CORE-919.3]] — follow-up: where a trailing pin gets caught

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** the row's premises hold — pin reads v8.4.0, scaffold diff v8.4.0..v8.5.0 on `claude/skills/ft-audit/` is empty, `at v8.3.0` sits at overlay lines 60 and 85, one file in scope.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Plan/SPEC drift check: PLAN.md line matches the task; `SPEC.md` is v8.5.0; `git diff --quiet v8.4.0 v8.5.0 -- claude/skills/ft-audit/` exits 0 (empty), so the pin bump is valid.
- Archive skim: `archive/core/CORE-869.4.md` last re-measured pass 4 (median 41, p90 272, 71 files). Its method was "inferred"; re-derived here: tracked `viz/src` + `tools` files, `*.test.*` and `*.d.ts` excluded, extensions ts/tsx/mjs/sh/js/css → 71 files, median 41, p90 272 today, so the command reproduces the recorded figures. Scaffold-bootstrap says to set the pin to `git describe --tags` (= v8.5.0).
- Figures to replace: line 60 `(129 files at v8.3.0)` (live count 133) and line 85 pass-4 sentence. `1,311 of 1,441 tracked markdown files` (line 60) is an `as of 2026-11-07` hand-copied figure outside this row's named set — left as is; flagged for the epic audit (.N).
- Frontend chunk sizes (line 82) are the regression baseline — untouched.
- Best practices: N/A — doc-figure edit, no code boundaries.
- Clarifications: No clarifications needed (--unattended); assumptions: the median/p90 command uses the CORE-869.4 file definition above; "outliers" are replaced by a `tail -2` variant of the same pipeline.
- Size estimate: ~6 lines (rename-aware). Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the existing overlay convention (a command in backticks beside the scope it sizes — the `docs:` / `structure:` scope globs already do this). No new shape.
- Edits, all in `.flaitron/audit-overlay/SKILL.md`: pin v8.4.0 → v8.5.0; `docs:` bullet `(129 files at v8.3.0)` → `(append | wc -l for the file count)`; structure pass-4 median/p90/file-count/outlier figures → one `git ls-files … | awk` pipeline plus its `tail -2` variant for the outliers. Frontend chunk sizes untouched.
- Tests: none added — prose-figure edit, no behavior change.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — no rendered surface; markdown skill file only. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (Acceptance verify commands):

```text
grep -q '^flaitron-reconciled: v8.5.0$' .flaitron/audit-overlay/SKILL.md          → 0
git diff --quiet v8.4.0 v8.5.0 -- claude/skills/ft-audit/                          → 0
grep -n 'at v8.3.0' .flaitron/audit-overlay/SKILL.md                               → 1 (no match; prints nothing)
git diff -U0 HEAD -- .flaitron/audit-overlay/SKILL.md | grep -c '75.6 kB'          → 0 matches
docs-scope command … | wc -l                                                       → 133
pass-4 pipeline (awk)                                                              → 71 41 272 (matches CORE-869.4's recorded figures)
pass-4 pipeline (tail -2)                                                          → tools/drift-checks.sh 1255, tools/update-adopters.mjs 1655
bash tools/drift-checks.sh context_budget final_newline                            → 0 (ok)
```

Full validation set (`just check`, unattended posture): → 0 — `node --test tools/update-adopters.test.mjs` 123 pass / 0 fail; `node --test tools/drift-checks.test.mjs` 45 pass / 0 fail; viz tests, typecheck, lint, build ok; `bash tools/drift-checks.sh` all checks ok.

Scope guardrail (before Phase 3 and after the sweep): paths = `.flaitron/audit-overlay/SKILL.md` (in `touches:`) + this note; ~6 changed lines against the 400 cap → clear.

External review (`/code-review medium`, this task's diff only) — four findings, no blockers:
- **note** — outlier instruction said "the same pipeline ending `| tail -2`", ambiguous after the awk stage → **fixed**: now "swap its final `awk` stage for `tail -2` … anything above the p90"; re-ran the swapped variant (output above).
- **note** — pass-4 line lost the baseline numbers → **fixed in part**: the outlier definition ("anything above the p90") is stated; the old figures are deliberately gone (they are the hand-copied values this row removes; CORE-869.4's archive holds the 41 / 272 / 71 record).
- **note (pre-existing)** — line 60 still carries `1,311 of the repo's 1,441 tracked markdown files … (as of 2026-11-07)` → **filed** as CORE-919.4.
- **note** — the one-liner depends on a hard-coded extension list and `xargs` batching → **accepted**: it reproduces CORE-869.4's figures exactly, and moving it to a script would add a tool this row does not ask for.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Bumped the audit overlay's `flaitron-reconciled:` to v8.5.0 (scaffold diff v8.4.0..v8.5.0 empty) and replaced the docs-scope file count and the structure pass-4 file count, median, p90 and outlier lines with the commands that produce them; frontend chunk sizes kept. `just check` green; External review found no blockers. Doc-drift sweep: no change across the AI-referenced docs (none cites the replaced figures). `touches:` reconciled — diff matches the one declared path. Learnings: N/A. Deferred: the `1,311 of 1,441 tracked markdown files (as of 2026-11-07)` figure on the overlay's `docs:` line (out of this row's named set), filed as CORE-919.4 (overlay-markdown-counts). unattended-candidates: none

**Archived:** 2026-11-24
