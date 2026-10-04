---
title: flowtron-nat-011 investigation
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: []
---

# CORE-100 | flowtron-nat-011 investigation

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-18

## 🎯 Goal

Investigate what `flowtron-nat-011` is and what depends on it, then — if safe — delete the project directory and remove it from the viz workspace projects list.

## ✅ Acceptance

- [x] Identity of `flowtron-nat-011` established (origin, purpose, current function)
- [x] Dependency surface mapped (what references it; what it references)
- [x] Safe-to-delete verdict documented with rationale
- [x] If safe: project directory deleted from disk
- [x] If safe: viz workspace projects list updated to remove the entry

## 🧩 Subtasks

- [x] Run `git worktree remove /Users/fakeneuron/code/flowtron-nat-011`
- [x] Run `git branch -D docs/extending-claude-md` (preserves origin copy)
- [x] Verify `git worktree list` no longer lists the worktree
- [x] Verify `.git/worktrees/flowtron-nat-011/` metadata cleaned up
- [x] Verify the directory `/Users/fakeneuron/code/flowtron-nat-011` is gone

## 🔗 Related

- Filed-from: CORE-098.5 follow-up list (archive: `_project/tasknote/archive/core/CORE-098.5.md:53`)
- Historical observations: [[FE-002]], [[FE-020]], [[FE-029]], [[CORE-066]] all mention `flowtron-nat-011` as a viz-discovered adopter; none have functional dependencies on it.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Investigation confirmed `flowtron-nat-011` is a stale git worktree of this repo at `/Users/fakeneuron/code/flowtron-nat-011`, checked out on branch `docs/extending-claude-md` — 1 commit ahead of merge-base `a79e0fe` (CORE-014 / v0.1.1), 186 commits behind current `main` (v3.0.0). No uncommitted work; the lone unique commit is preserved on `origin/docs/extending-claude-md`. Safe to remove.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Identity.** `flowtron-nat-011` is a git worktree of this repo, not a standalone project. Worktree metadata lives at `.git/worktrees/flowtron-nat-011/`; the checkout sits at `/Users/fakeneuron/code/flowtron-nat-011` (lowercase `code`; macOS APFS is case-insensitive so it occupies the same dir-space as `~/Code/`). Confirmed via `git worktree list`.

**Branch state.** Checked out at `docs/extending-claude-md`, commit `7231c79` (`docs: clarify CLAUDE.md compose order around the workflow snippet`). Merge-base with `main` is `a79e0fe` (CORE-014 v0.1.1 release). Branch is 1 commit ahead / 186 commits behind. Branch also exists on `origin/docs/extending-claude-md` — recoverable. No uncommitted changes in the worktree (`git status --porcelain` clean).

**viz inclusion mechanism.** Viz does not hardcode a project list. `viz/src/workspace.ts:32` `discoverProjects()` enumerates `~/code/` (or `FLOWTRON_VIZ_WORKSPACE` if set) and includes any directory containing `_project/PLAN.md`. Removing the worktree directory therefore auto-removes it from viz with no separate code edit. Confirmed `flowtron-nat-011/_project/PLAN.md` exists (v0.1.1-era PLAN; long stale).

**Archive references.** Five tasknotes mention `flowtron-nat-011`, all as a passive observation that it appears in viz alongside other adopters:
- `archive/core/CORE-098.5.md:53` — filed CORE-100 itself in its follow-up list
- `archive/core/CORE-066.md:104` — flagged as out-of-scope exploration target
- `archive/frontend/FE-002.md:97,115,176` — included in initial 7-adopter viz enumeration (user-locked decision 2026-05-08: "scan whatever has `_project/PLAN.md`")
- `archive/frontend/FE-020.md:30,59,96,103` — included in 7-adopter dogfood interaction sweep; "Tiny archive ~4 files", "Loaded fine first try"
- `archive/frontend/FE-029.md:49` — noted it loaded cleanly on cold-start (small-archive case, didn't trigger the Promise.all race)

No archived tasknote depends on its continued presence. Removal does not break any past finding — they are point-in-time observations.

**Drift check.** Task description cites `flowtron-nat-011` and "viz workspace projects list". Both still match: worktree dir present at the cited location, viz workspace discovery still runtime-scan-based at `viz/src/workspace.ts:32`. No drift.

**No clarifications surfaced** beyond the cleanup-scope question (worktree + local branch chosen). Removal mechanics use `git worktree remove` (not `rm -rf`) to also clean up `.git/worktrees/flowtron-nat-011/` metadata atomically.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

No code pattern to survey — this was a git-state op, not a code change. The "minimal solution" was two git commands:

```
git worktree remove /Users/fakeneuron/code/flowtron-nat-011
git branch -D docs/extending-claude-md
```

`git worktree remove` was chosen over `rm -rf` because it atomically cleans up the `.git/worktrees/<name>/` metadata directory alongside the working-tree directory. A bare `rm -rf` would have left dangling metadata that `git worktree prune` later has to sweep. No test surface — git's own state is the verification.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

No code surface → no test/lint applicable. Verification was direct state inspection (all five expectations met):

| Check | Expected | Observed |
|---|---|---|
| `git worktree list` | only `Code/flowtron [main]` | ✅ only `Code/flowtron e270242 [main]` |
| `.git/worktrees/` exists | no (dir removed once last worktree dropped) | ✅ `No such file or directory` |
| `/Users/fakeneuron/code/flowtron-nat-011` exists | no | ✅ `No such file or directory` |
| Local branches | only `main` | ✅ only `* main` |
| `origin/docs/extending-claude-md` preserved | yes (recovery path) | ✅ still on remote |

Frontend visual confirmation N/A — no UI surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**

- `README.md` — no change (no `flowtron-nat-011` references; grep confirmed)
- `SPEC.md` — no change (no `flowtron-nat-011` references; grep confirmed)
- `docs/MIGRATION.md` — no change (no `flowtron-nat-011` references; grep confirmed)
- `claude/CLAUDE-snippet.md` — no change (no `flowtron-nat-011` references; grep confirmed)

Archived tasknotes (FE-002, FE-020, FE-029, CORE-066, CORE-098.5) retain their mentions as point-in-time historical records — per convention, archive entries are immutable observations and are not rewritten to reflect later state changes.

**Final Summary:**

`flowtron-nat-011` turned out to be a stale git worktree of this very repo, parked at branch `docs/extending-claude-md` (commit `7231c79`, 186 commits behind current `main`). It had been auto-discovered by viz's runtime workspace scan (`viz/src/workspace.ts:32`) because its `_project/PLAN.md` existed at `~/code/flowtron-nat-011/_project/PLAN.md`. Removed it via `git worktree remove` (cleans up `.git/worktrees/<name>/` metadata atomically) and deleted the local branch via `git branch -D`. The branch's lone commit remains on `origin/docs/extending-claude-md` if ever needed. Five archived tasknotes (FE-002, FE-020, FE-029, CORE-066, CORE-098.5) had mentioned the worktree as a passive viz-discovery observation; none had functional dependencies, all left intact.

**Archived:** 2026-05-18
