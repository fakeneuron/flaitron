---
title: FUTURE.md cleanup
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-056, CORE-035]
---

# CORE-061 | FUTURE.md cleanup

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-056]] [[CORE-035]]

## 🎯 Goal

Delete `_project/FUTURE.md` per [[CORE-056]] audit Finding 9a (orphan + stale-content + retired `**Last updated:**` line); nothing migrates per the user-walk decision.

## ✅ Acceptance

- [x] `_project/FUTURE.md` deleted
- [x] Repo-wide grep confirms zero surviving references to `FUTURE.md`
- [x] Doc-drift sweep clean (no AI-referenced docs need follow-up edits)

## 🧩 Subtasks

- [x] Delete `_project/FUTURE.md`
- [x] Re-grep repo for `FUTURE.md` references; confirm only the PLAN.md task line remains (auto-resolves at Phase 4 stub-flip)

## 🔗 Related

- [[CORE-056]] — convention/coherence audit; Finding 9a is this task's source brief and user-walk record
- [[CORE-035]] — retired the `**Last updated:**` line convention repo-wide; one of the three problems on FUTURE.md

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-056]] audit Finding 9a is the source brief; user-walk decision (delete entirely, nothing migrates) already locked. No re-litigation needed. Mechanically a 1-file deletion; flagged opus only because the audit's "judgment about what to keep" call is already settled.

- [x] Read relevant source files — re-read `_project/FUTURE.md` (3 problems still present: 0 inbound refs, lists shipped features as "future", retired `**Last updated: 2026-04-30**` line at L3); re-read [[CORE-056]] §Axis 9 + user-walk decisions
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **no clarifications needed** at scaffold. Assumptions: (a) PLAN.md task-line `FUTURE.md` mention auto-resolves when the line stub-flips at Phase 4; (b) archive-tasknote mentions of `_project/FUTURE` are historical and not edited per archive convention. (One mid-execution clarification surfaced — see Phase 2.)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Archive skim

3 archive tasknotes mention `_project/FUTURE`:
- **[[CORE-056]]** (convention/coherence audit, 2026-05-09) — **load-bearing precedent.** Filed this task per Finding 9a. User-walk locked: delete entirely, nothing migrates (PHILOSOPHY.md covers design filters; surviving open ideas declined for PLAN.md `## Future Opportunities`).
- **[[CORE-022]]** (Working in Obsidian README section, 2026-05-01) — incidental mention only; no constraint on this task.
- **[[CORE-043]]** (release v1.0.0, 2026-05-07) — incidental mention only; no constraint on this task.

Archive convention: completed tasknotes are not edited. The 3 historical mentions stay as-is.

### Drift check (2026-05-09, at scaffold)

- File still present at `_project/FUTURE.md` ✓
- All 3 problems from [[CORE-056]] Finding 9a still hold:
  1. Orphan: `grep -r FUTURE.md` across `viz/ README.md SPEC.md SPEC/ docs/ templates/ claude/` → **0 hits** ✓ (only `_project/PLAN.md` matches, and that's the CORE-061 task line itself, which stub-flips at Phase 4)
  2. Stale content: still lists [[FE-002]], [[FE-009]], [[FE-003]], [[CORE-017]], [[FE-013]] (all closed) as "future" ✓
  3. Retired `**Last updated:** 2026-04-30` line still at L3 ✓
- User-walk decisions still hold:
  - PHILOSOPHY.md still exists at `docs/PHILOSOPHY.md` ✓ (would cover any design-filter migration if needed; per user-walk, no migration)
  - PLAN.md `## Future Opportunities` still `(none)` per user-walk decline ✓
- No drift. Proceed with single-file deletion.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a; 1-file deletion. No neighboring code pattern to extend.
- [x] Implemented the minimal solution — see Implementation Notes
- [x] Updated/added tests for non-trivial behavior — n/a (file deletion; no behavior to test)

**Implementation Notes:**

### Mid-execution surprise — gitignored file

`git rm _project/FUTURE.md` failed (`pathspec did not match any files`). Investigation: `git check-ignore -v _project/FUTURE.md` revealed `.gitignore:10:_project/FUTURE.md` — the file was never tracked by git. [[CORE-056]] audit didn't catch this (focused on file content, not git status).

User-walk on the orphan ignore rule: **remove L10 too.** Rationale: leaving the rule orphans an ignore for a non-existent file — the same dead-surface pattern Finding 9a flagged on FUTURE.md itself. Finishing the same delete, not scope creep.

### Changes

1. `rm _project/FUTURE.md` (plain rm; was gitignored, never tracked)
2. `.gitignore` L10 (`_project/FUTURE.md`) removed; trailing entry now `SCRATCH.md` at L9

### Post-deletion verification

`grep -rn "FUTURE\.md\|_project/FUTURE"` across `viz/ README.md SPEC.md SPEC/ docs/ templates/ claude/ .gitignore` → **0 hits** ✓

Only surviving mention is `_project/PLAN.md:27` (the CORE-061 task line itself), which stub-flips to `Completed YYYY-MM-DD.` at Phase 4 closure — drops the long description containing `_project/FUTURE.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (file deletion; no code changed)
- [x] Ran lint/type-check on changed code — n/a (markdown + .gitignore; no lint targets)
- [x] (frontend) Asked the user for visual confirmation — n/a (not a frontend change)

**Testing Notes:** 1-file deletion + 1 gitignore-line removal. No code paths affected; no behavior to test. Verification was the post-deletion grep (Phase 2 Implementation Notes).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `README.md` — **no change.** Audit confirmed zero inbound refs from README.md to FUTURE.md (Finding 9a part of the orphan diagnosis).
  - `SPEC.md` — **no change.** Workflow contract doesn't reference FUTURE.md; deletion doesn't affect tasknote lifecycle, PLAN.md grammar, or any SPEC-defined surface.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures don't reference FUTURE.md (it was always flowtron-self-only, never an adopter-facing surface).
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter paste-block doesn't reference FUTURE.md.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Deleted `_project/FUTURE.md` per [[CORE-056]] audit Finding 9a (orphan + stale-content + retired `**Last updated:**` line); nothing migrated per the locked user-walk decision (`docs/PHILOSOPHY.md` already covers design filters; surviving open ideas declined for PLAN.md `## Future Opportunities` shelf-life).

**Mid-execution surprise:** the file was gitignored (`.gitignore:10`), never tracked by git. `git rm` failed; resolved with plain `rm`. User-walked the orphan ignore rule and removed L10 in the same change — same dead-surface pattern the audit flagged.

**Final diff:** 1 file deleted (`_project/FUTURE.md`), 1 line removed (`.gitignore:10`).

**Doc-drift canary:** clean. All 4 AI-referenced docs unaffected (zero inbound refs to FUTURE.md confirmed by grep across `README.md`, `SPEC.md`, `SPEC/`, `docs/`, `templates/`, `claude/`, `viz/`, `.gitignore` post-deletion).

**Cohort progress (per [[CORE-056]] follow-up filings):** [[CORE-061]] closed (this task). Remaining: [[CORE-062]] (lift date-format bullet), [[CORE-063]] (equalize stub cross-refs), [[CORE-064]] (equalize step-1.5 fragments) — all sonnet, all mechanical.

**Archived:** 2026-05-09
