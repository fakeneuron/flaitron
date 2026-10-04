---
title: worktree-end-hardening
status: completed
tags: [worktree, dx]
created: 2026-06-04
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.4"]
---

# CORE-279 | worktree-end-hardening

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]] [[CORE-215.4]]

## 🎯 Goal

Harden `/ft-worktree-end` with three close-time safety improvements: surface the ahead-of-target commit count + shortlog before the operator decides merged/discard, and list orphaned `wt-*` branches (start-without-end) at Step 0 as a non-blocking heads-up; verify the existing reused-name collision guard in `/ft-worktree-start` is complete.

## ✅ Acceptance

- [ ] `ft-worktree-end` Step 0: after verifying the specific task's worktree/branch, runs a non-blocking orphaned-`wt-*` scan (branches with `wt-` prefix that have no active worktree) and surfaces any hits as a heads-up before proceeding
- [ ] `ft-worktree-end` Step 1: before asking "merged or discard?", surfaces `git rev-list --count` + a short `git log --oneline` of commits ahead of the target — operator can judge drift without digging
- [ ] `ft-worktree-start` Step 1: existing collision guard covers branch + worktree-dir + live-worktree-registration; confirm no gap (or add the `git worktree list | grep` check if missing)
- [ ] `docs/WORKTREES.md` "Open Questions (None)" section updated only if the new checks warrant a mention (otherwise no change)
- [ ] No SPEC contract changes; changes are skill-text additions only

## 🧩 Subtasks

- [ ] Pattern survey — re-read ft-worktree-start Step 1 collision guard to confirm exact coverage; confirm whether `git worktree list | grep ${BRANCH}` is missing or already implied
- [ ] Add orphaned-`wt-*` listing block to ft-worktree-end Step 0 (after the task-specific branch/worktree verification; non-blocking; current project only)
- [ ] Add ahead-count + shortlog block to ft-worktree-end Step 1 (before the operator decision prompt; always show; no hard block)
- [ ] Enhance the unmerged-branch warning in ft-worktree-end Step 1 to cite the surfaced count
- [ ] If ft-worktree-start Step 1 is missing a live-worktree-registration check, add `git worktree list | grep "${BRANCH}"` there; otherwise confirm as-is
- [ ] Check if ft-worktree-end command stub description needs a one-line update to mention hardened checks
- [ ] Doc-drift sweep + archive + PLAN.md flip

## 🔗 Related

- [[CORE-EPIC-215]] — parent worktree-convention epic; locked the five conventions this task hardens around
- [[CORE-215.4]] — the ft-worktree-end implementation this task extends

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four checks in the PLAN.md scope are unambiguously absent from the current `ft-worktree-end` SKILL.md: Step 0 has no orphan scan; Step 1 has only `git branch --merged` + a binary yes/no ask with no commit-count visibility. One item (reused-name collision guard) is already present in `ft-worktree-start` Step 1 — scope is verifying completeness there, not adding a redundant guard. WORKTREES.md says "Open Questions (None)" and the 215.6 audit logged zero follow-up candidates; these checks were explicitly outside the 215 implementation scope. No re-scope or de-scope required.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — verify file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; surface any drift to the user before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings:** Grepped archive/core/ for "worktree" — hits in CORE-215.1–.6 (the worktree-convention epic) and CORE-242 (WORKTREES.md doc cleanup). Load-bearing: CORE-215.4 explicitly scoped the end skill as a "thin 5-step procedural mirror" with no drift/orphan checks (those were outside the .4 charter per CORE-215.1 scope); CORE-215.6 audit confirmed zero follow-up candidates filed after the full worktree epic. CORE-242 fixed two stale-prose issues in WORKTREES.md (no behavior change). Conclusion: the four hardening checks are genuinely new work, not regressions.

**Drift check:** All four files cited in the starter exist at their exact paths:
- `claude/skills/ft-worktree-end/SKILL.md` — 170 lines; Step 0 has branch/worktree verification for the specific TASK_ID but no orphan scan; Step 1 has `git branch --merged` + binary ask but no `rev-list` count or shortlog ✅ gap confirmed
- `claude/commands/ft-worktree-end.md` — thin command stub; description does not mention hardened checks
- `claude/skills/ft-worktree-start/SKILL.md` — Step 1 collision guard: checks `git show-ref --verify --quiet refs/heads/${BRANCH}` (branch exists?) + `test -d "${WT_DIR}"` (dir exists?); does NOT explicitly check `git worktree list | grep ${BRANCH}` (live worktree registration) — gap to verify in Phase 2
- `docs/WORKTREES.md` — "Open Questions (None)" at bottom; no mention of drift/orphan behavior

**Clarifying-question resolutions (from starter "Open at promotion"):**

No clarifications needed. Explicit assumptions:
1. **Collision guard placement:** Start-side guard (ft-worktree-start Step 1) is the prevention surface; end-side orphan listing is the detect-stale surface. They are complementary, not duplicate. No new collision guard on the end side; orphan listing in Step 0 covers "stale wt- branch sitting unnoticed."
2. **"Drifted past scope" heuristic:** No commit-count threshold or hard block. Surface `git rev-list --count main..<BRANCH>` + `git log --oneline -10 main..<BRANCH>` before the operator decision; operator judges. This covers both the "drift detection" and "unmerged/ahead-of-target warning" items from the scope in one block.
3. **Orphan listing scope:** Current project only (`git branch --list 'wt-*'` vs `git worktree list`). No cross-project `~/code/*-worktrees/` scan — keeps the skill thin.
4. **ft-worktree-start Step 1 gap:** If the live-worktree-registration check is missing (no `git worktree list | grep ${BRANCH}`), add it; otherwise note as complete. This is a narrow verification step in Phase 2.
5. **WORKTREES.md update:** Only if the new checks materially change the conceptual convention. They don't (purely skill-level implementation; convention doc describes the 4 conceptual End steps which remain unchanged). Expect no WORKTREES.md edit.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation → skip 🛠️. Starter context fully absorbed into Goal/Acceptance/Subtasks above. Collision guard is a verify-not-add on the start side; the three real adds are all in ft-worktree-end. No file pivot; no approach change; all assumptions pre-resolvable from reads.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Existing ft-worktree-end is a 5-step thin procedural skill — same shape as ft-worktree-start and ft-debug. Extended Steps 0 and 1 in place; no new step or structural change. ft-worktree-start Step 1 was extended with a third collision check using the same shell-snippet style the existing two checks use.

**Minimal implementation (4 files, ~30 LOC net added):**
- `claude/skills/ft-worktree-end/SKILL.md` — Step 0: added orphaned-`wt-*` branch scan sub-section with `comm -23` comparison of all `wt-*` branches vs active-worktree branches; non-blocking info note. Step 1: added `git rev-list --count HEAD..${BRANCH}` + `git log --oneline HEAD..${BRANCH} | head -10` block before the operator ask; updated ask text to cite the count.
- `claude/skills/ft-worktree-start/SKILL.md` — Step 1: added `git worktree list | grep "${BRANCH}"` as a third collision check; added bullet for the stale-registration case (dir deleted, worktree registration persists).
- `claude/commands/ft-worktree-end.md` — frontmatter description updated to mention orphan listing and ahead-count.

No SPEC, template, or adopter-surface changes; changes are purely within the two thin skill files and the command stub.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure prompt/markdown files — same as CORE-215.4 and the rest of the worktree-convention epic. No test suite or lint/type-check surface. No frontend changes; no 👁️ visual confirmation. Markdown hygiene self-review: fences have `sh` language tags; backtick usage consistent; `comm -23` with process substitution is portable POSIX; `git rev-list --count HEAD..${BRANCH}` is standard. Shell snippets are minimal and non-destructive (read-only scan in Step 0; display-only count/log in Step 1; read-only collision check in ft-worktree-start). No command-injection vectors (`${BRANCH}` derived from `TASK_ID` validated as a flowtron ID pattern before use). Zero drift from house style.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (11 AI-referenced docs):**
- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change

(Changes land in `claude/skills/*/SKILL.md` + `claude/commands/` — outside the declared sweep list per tasknote/README.md §"AI-referenced docs".)

**Final Summary:**

Hardened the `/ft-worktree-end` skill with three targeted close-time safety improvements: ahead-of-target commit count/shortlog before the merge/discard decision, a non-blocking orphaned-`wt-*` branch scan in Step 0, and a live-worktree-registration check in `/ft-worktree-start` Step 1 for the stale-registration edge case.

Technical: 4 files touched — `claude/skills/ft-worktree-end/SKILL.md` (~22 lines added: Step 0 orphan scan sub-section + Step 1 ahead-count block), `claude/skills/ft-worktree-start/SKILL.md` (~4 lines: third collision check + stale-registration bullet), `claude/commands/ft-worktree-end.md` (description updated). No SPEC, template, or adopter-surface changes. Zero frontend, zero test surface, zero privileged ops.

**Archived:** 2026-06-04
