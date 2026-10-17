# CORE-011 | Fold or delete `~/code/Project-28/` (the older predecessor folder)

**Goal:** Decide whether any content in `~/code/Project-28/` is worth folding into flowtron, then remove the predecessor folder so it no longer sits alongside the canonical workflow.

**Priority:** Medium
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `~/code/Project-28/` (5 small files, dated 2025-04-02) is the explicit predecessor of flowtron — referenced by name in `docs/PHILOSOPHY.md` lines 17 and 47. flowtron is a strict superset: every concept in Project-28 (4-phase serial flow, mandatory clarifying questions, single-context-window sizing, plan-as-source-of-truth, archive-on-close) is already in `SPEC.md` with more rigor (relevance gate, drift check, pattern survey, model field, post-closure protocol, `/task` skill). Nothing to fold; the folder is dead weight.

- [x] Read relevant source files
- [x] **Drift check** — task description ("Fold or delete `~/code/Project-28/`") matches reality: folder exists at the cited path, is older than flowtron (2025-04-02 vs. flowtron's 2026-04-28 inception), and is the same artifact PHILOSOPHY.md narrates around. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

  **Q (asked via AskUserQuestion):** Disposition + how to update PHILOSOPHY.md's two references?
  **A:** Delete outright + patch PHILOSOPHY.md to past-tense, drop `~/code/` prefix.

**Discovery Notes:**

Project-28 contents (all small, all superseded):
- `AI-PROMPT.md` (705B) — generic AI rules; superseded by `claude/CLAUDE-snippet.md` + `/task` skill
- `PLAN.md` (326B) — bare PLAN template; superseded by `templates/PLAN.md`
- `README-TASKNOTE.md` (1.9KB) — quick-start overview; superseded by `docs/PHILOSOPHY.md` + `docs/MIGRATION.md`
- `tasknote-template.mc` (1.2KB) — 4-phase template (Planning/Implementation/Verification/Closure); superseded by `templates/tasknote-template.md` (Discovery/Execution/Testing & Linting/Closure with relevance + drift + pattern survey)
- `WORKFLOW.md` (961B) — step-by-step start/work/finish guide; superseded by `SPEC.md`

External references to `~/code/Project-28/`:
- `docs/PHILOSOPHY.md:17` and `:47` — historical narrative ("I had a `~/code/Project-28/` folder...", "This is the part the `~/code/Project-28/` folder didn't have")
- `_project/tasknote/archive/core/CORE-005.md:59` — frozen archive entry describing what was written into PHILOSOPHY.md (do not edit; archive is immutable)
- `_project/PLAN.md` — this task's own line + the entry I'll flip at closure
- No references in `~/.claude/CLAUDE.md` or `~/code/CLAUDE.md`

**Execution Steps:**

1. Patch `docs/PHILOSOPHY.md:17` — drop `~/code/` prefix, soften "I had a folder where I kept" to "I kept a folder".
2. Patch `docs/PHILOSOPHY.md:47` — drop `~/code/` prefix, insert "earlier" to mark it historical.
3. `rm -rf ~/code/Project-28/` (5 small files, all superseded; no salvage).
4. Verify with `grep -r Project-28` across flowtron repo + `~/code/CLAUDE.md` + `~/.claude/CLAUDE.md` — only PLAN.md, this tasknote, and the frozen archive (CORE-005) should remain.

## Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

Pattern survey: PHILOSOPHY.md's own project list at lines 9-11 (project-14 / Project-17 / project-22) name-drops sibling projects with bare names and no absolute paths. My patches mirror that voice — `Project-28/` without the `~/code/` prefix.

Diff applied:
- `docs/PHILOSOPHY.md:17` — "I had a `~/code/Project-28/` folder where I kept a reference implementation: scripts, templates, validators." → "I kept a `Project-28/` reference folder with scripts, templates, and validators —"
- `docs/PHILOSOPHY.md:47` — "the `~/code/Project-28/` folder didn't have" → "the earlier `Project-28/` folder didn't have"
- `rm -rf ~/code/Project-28/` — 5 files (AI-PROMPT.md, PLAN.md, README-TASKNOTE.md, tasknote-template.mc, WORKFLOW.md) all superseded by flowtron equivalents.

No tests or lint apply — prose + filesystem op, no code touched.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code)
- [x] Ran lint/type-check on changed code — N/A (no code)
- [x] (frontend) Asked the user for visual confirmation — N/A
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

Verification step from execution plan ran clean:
- `grep -ril Project-28` across flowtron repo + `~/code/CLAUDE.md` + `~/.claude/CLAUDE.md` returns only the expected files: `_project/PLAN.md` (task line, will flip at closure), `_project/tasknote/CORE-011.md` (this active tasknote), `_project/tasknote/archive/core/CORE-005.md` (frozen archive — never edited), `docs/PHILOSOPHY.md` (now-correct references).
- `grep -n Project-28 docs/PHILOSOPHY.md` confirms both edits landed cleanly with no `~/code/` prefix on either reference.
- `ls ~/code/Project-28` returns "No such file or directory".

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — `docs/PHILOSOPHY.md` patched (the only doc that referenced the path; CLAUDE.md files and tasknote-README/MIGRATION/SPEC don't mention Project-28)
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-30`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Deleted `~/code/Project-28/` outright — flowtron's predecessor folder, now strictly superseded. Patched `docs/PHILOSOPHY.md` lines 17 and 47 to past-tense and dropped the `~/code/` absolute-path prefix so the historical narrative no longer points at a defunct location. Verified by grep that no other repo or CLAUDE.md file references the path.

Decision log: rejected "move to flowtron's `legacy/`" option — git history of project-14/Project-17/project-22 is the authoritative record of how flowtron's design evolved; preserving the artifact in-repo just for narrative-completeness adds repo bloat without unique information.

**Archived:** 2026-04-30
