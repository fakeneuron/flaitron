# CORE-007 | Migrate photard (single task — smallest footprint, proves the system)

**Goal:** Migrate photard to use flowtron as its workflow system (add submodule, wire CLAUDE.md, retire any prior workflow files) as the first real cross-repo adoption.

**Priority:** High
**Area:** core
**Model:** opus
**Status:** Completed

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed (with scope clarification — see drift notes)
  **Rationale:** Photard is still the smallest-footprint adoption candidate (single repo, no epic), but the PLAN.md line "single task — smallest footprint" understates the work because photard already has a parallel home-grown workflow that has to be reconciled. Goal stands; scope needs explicit decisions.

- [x] Read relevant source files
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

State of `~/code/photard/` as of 2026-04-29:

1. **Not a git repo.** No `.git/` directory anywhere in `photard/`. The flowtron SPEC's canonical adoption mechanism is `_project/flowtron/` as a git submodule — that's blocked until photard is initialized as a git repo OR we adopt via symlink (the same mechanism flowtron self-hosts with — CORE-004).
2. **Parallel home-grown workflow already in place:**
   - `CLAUDE.md` references a "5-phase" lifecycle (Discovery → Execution → Testing → Closure → Commit) and `/task` command — close to flowtron's 4-phase but functionally distinct (flowtron treats commit as post-closure, not a phase).
   - `_project/tasknote/` exists with its own `README.md`, `tasknote-template.md`, `TEMPLATE_GUIDE.md`, and `archive/` — all to be retired/replaced.
   - `.claude/skills/task/` is photard's local `/task` skill — must be replaced by flowtron's.
   - `.claude/skills/{backend,frontend,ocr}/` are domain skills — orthogonal to flowtron, leave alone.
3. **Plan-file shape mismatch.** Photard splits planning across four root-level files: `PLAN.md` (active tasks, header-per-task with `Goal/Priority/Phase/Status/Dependencies/Files/Notes`), `ROADMAP.md`, `PLAN_ARCHIVE.md`, `FUTURE_OPPORTUNITIES.md`. Flowtron expects a single `_project/PLAN.md` with `- [ ] **<AREA>-<NUMBER>** — <one-line>` rows grouped by priority.
4. **Task ID convention mismatch.** Existing photard task IDs are `P3-2`..`P3-8` (phase-numbered) and `BL-1`..`BL-3` (backlog), which don't match flowtron's canonical `<AREA>-<NUMBER>`. Either rename existing tasks or declare `P3-` / `BL-` as project-specific prefixes in `_project/tasknote/README.md`.
5. **Scope ambiguity.** "Single task — smallest footprint, proves the system" reads as bare-minimum adoption (wire flowtron, keep photard runnable with `/task`). But the prior-workflow reconciliation (items 2–4) is real work and may or may not belong inside CORE-007 vs follow-up tasks.

Need user decisions on adoption mechanism, scope cut, plan-file migration, and ID convention before defining execution steps.

**Decisions captured (from clarifying Qs):**

- **Adoption mechanism:** git submodule. User initialized photard as a git repo (commit `dcb9691`, remote `origin → github.com/fakeneuron/photard.git`). Pin flowtron submodule to `v0.1.0`.
- **Scope:** full migration in this single task.
- **Plan-file shape:** collapse `PLAN.md` + `ROADMAP.md` + `PLAN_ARCHIVE.md` + `FUTURE_OPPORTUNITIES.md` into one `_project/PLAN.md`.
- **Task IDs:** rename to canonical `BE-` / `FE-` / `OCR-`. Completed historical entries (P1, P2, P3-1) keep their original IDs as inert history.

**Execution Steps:**

1. Add flowtron as a git submodule at `_project/flowtron/` and pin it to tag `v0.1.0`.
2. Wire `.claude/` symlinks per `claude/CLAUDE-snippet.md`. Remove photard's existing local `.claude/skills/task/` first, then create:
   - `.claude/commands/task.md` → `../../_project/flowtron/claude/commands/task.md`
   - `.claude/skills/task` → `../../_project/flowtron/claude/skills/task`
3. Build new `_project/PLAN.md` collapsing the four root plan files. Vision section drawn from `ROADMAP.md`. Active tasks grouped Critical/High/Medium/Low. Completed section seeded from `PLAN_ARCHIVE.md` (P1, P2) plus the existing P3-1 entry. Future Opportunities migrated from `FUTURE_OPPORTUNITIES.md` with canonical IDs.
4. Build new `_project/tasknote/README.md` from flowtron's `templates/tasknote-README.md`. Declare `OCR-` as project-specific prefix; pin v0.1.0; fill in photard's quick commands.
5. Update photard's root `CLAUDE.md`: replace the "Planning & Task Management" block with the flowtron snippet's `## Workflow` block; remove `task/SKILL.md` from the Skills list (now provided by flowtron via the symlinked skill).
6. Delete the now-redundant photard files: root `PLAN.md`, `ROADMAP.md`, `PLAN_ARCHIVE.md`, `FUTURE_OPPORTUNITIES.md`; `_project/tasknote/tasknote-template.md`; `_project/tasknote/TEMPLATE_GUIDE.md`.
7. Verify wiring on photard side: symlinks resolve, `_project/flowtron/SPEC.md` is reachable, `_project/PLAN.md` is the only plan file at root or under `_project/`.
8. Commit on photard side: single commit `feat: adopt flowtron — migrate from in-repo workflow (CORE-007)` covering submodule add, symlinks, plan collapse, CLAUDE.md rewrite, deletions.
9. Phase 4 closure on flowtron side: flip CORE-007 in flowtron's PLAN.md, archive this tasknote to `_project/tasknote/archive/core/CORE-007.md`, recap to user, commit `feat: CORE-007 — migrate photard to flowtron`.

**Proposed ID rename map (active + backlog):**

Active (from photard's `PLAN.md`):

| Old ID | New ID | Title (truncated) |
|---|---|---|
| P3-2 | FE-001 | Project creation form in dashboard |
| P3-3 | FE-002 | Inline metadata editor for flagged photos |
| P3-4 | FE-003 | "Process incoming/" trigger button |
| P3-5 | BE-001 | Configurable confidence thresholds (UI settings panel) |
| P3-6 | BE-002 | Watchdog auto-process daemon |
| P3-7 | BE-003 | Categorization fallback for missing-metadata photos |
| P3-8 | OCR-001 | Threshold calibration + Tesseract preprocessing |
| BL-1 | BE-004 | HEIC edge-case hardening |
| BL-2 | BE-005 | DB backup / export |
| BL-3 | BE-006 | Incremental processing (skip already-imported files) |

Future Opportunities: per user decision, migrate `FUTURE_OPPORTUNITIES.md` content as ID-less bulleted ideas (parking lot) under the `## Future Opportunities` heading in `_project/PLAN.md`. IDs to be assigned only when promoted to a priority section.

Completed (kept verbatim, no rename): P1, P2, P3-1.

## Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (config/doc migration, no runtime code changed)
- [x] Ran targeted tests on changed files — N/A (no code; verified symlinks + submodule pin instead)

**Implementation Notes:**

Pattern survey: this is the second flowtron adoption (after flowtron self-hosting itself in CORE-004). CORE-004 used relative symlinks for `.claude/commands/task.md` and `.claude/skills/task` because flowtron can't submodule itself. The same symlink shape applies here, except photard *can* submodule flowtron — so we layer the symlinks on top of a real `_project/flowtron/` submodule pinned to `v0.1.0`. CLAUDE-snippet.md already documents this exact recipe; followed it literally.

What was done in `~/code/photard/`:

1. Added `_project/flowtron/` as a git submodule from `https://github.com/fakeneuron/flowtron.git`, then `git checkout v0.1.0` inside the submodule (now at `f68b879`, a detached HEAD on the v0.1.0 tag).
2. Removed photard's local `.claude/skills/task/` (a 2.2 KB SKILL.md predating flowtron) and replaced with relative symlinks:
   - `.claude/commands/task.md → ../../_project/flowtron/claude/commands/task.md`
   - `.claude/skills/task → ../../_project/flowtron/claude/skills/task`
3. Created `_project/PLAN.md` (14 KB) collapsing the previous four root files. Kept the original Vision + Phase Summary + Design Principles content from `ROADMAP.md`. Renamed active task IDs per the approved map (FE-001..FE-003, BE-001..BE-006, OCR-001). Migrated `FUTURE_OPPORTUNITIES.md` content as ID-less bulleted ideas under `## Future Opportunities`. Completed entries (P1, P2, P3-1) kept their legacy IDs as inert history.
4. Created `_project/tasknote/README.md` from flowtron's `templates/tasknote-README.md` template; declared `OCR-` as photard's project-specific prefix; recorded pinned version v0.1.0; filled in photard's quick commands. Added a "Pre-flowtron historical archives" section noting that `archive/P3-1.md` lives at the archive root rather than under an area subfolder (legacy layout, do not relocate).
5. Updated photard's root `CLAUDE.md`: replaced the "Planning & Task Management" block with the flowtron snippet's `## Workflow` block; removed `task/SKILL.md` from the Skills enumeration with a one-line note pointing at the flowtron-provided symlink; updated the architecture diagram to add `_project/PLAN.md` and `_project/flowtron/` lines and clarify that the task skill is symlinked from flowtron.
6. `git rm`'d the four root plan files (`PLAN.md`, `ROADMAP.md`, `PLAN_ARCHIVE.md`, `FUTURE_OPPORTUNITIES.md`) and the two redundant tasknote-dir files (`tasknote-template.md`, `TEMPLATE_GUIDE.md`).

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no runtime code changed)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change)
- [x] Fixed all introduced issues

**Testing Notes:**

Verification done in lieu of test suite (no runtime code changed):

- `git status` in photard reports the expected staged/unstaged set: `.gitmodules` + `_project/flowtron` added, `CLAUDE.md` + `_project/tasknote/README.md` modified, four root plan files deleted, two tasknote-dir files deleted, `.claude/skills/task/SKILL.md` worktree-deleted (its symlink replacement is untracked).
- `readlink .claude/commands/task.md` and `readlink .claude/skills/task` both resolve to the expected relative paths inside the submodule.
- `cd _project/flowtron && git describe --tags` reports `v0.1.0`.
- `_project/flowtron/claude/skills/task/SKILL.md` exists (7733 bytes) and `_project/flowtron/claude/commands/task.md` exists — symlinks point to real files.

End-to-end smoke test of `/task` from inside photard is deferred — it requires a fresh Claude Code session in photard's working directory and is the natural first verification the user will do post-commit.

## Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation
- [ ] Fixed all introduced issues

**Testing Notes:**

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-30`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Migrated `~/code/photard/` from its in-repo workflow to flowtron, the first real cross-repo adoption beyond flowtron self-hosting. User initialized photard as a git repo before the task started, which unlocked the canonical submodule mechanism (rather than the symlink-only fallback flowtron uses for self-hosting).

Photard-side changes (single commit, photard repo):
- `_project/flowtron/` added as a git submodule pinned to tag `v0.1.0` (commit `f68b879`); `.gitmodules` records the path/url.
- `.claude/commands/task.md` and `.claude/skills/task` now relative symlinks into the submodule; photard's prior local `.claude/skills/task/SKILL.md` removed.
- `_project/PLAN.md` (new, 14 KB) collapses the four root files (`PLAN.md` / `ROADMAP.md` / `PLAN_ARCHIVE.md` / `FUTURE_OPPORTUNITIES.md`) into one canonical plan.
- Active task IDs renamed per the approved map: `P3-2..P3-8` and `BL-1..BL-3` → `FE-001..FE-003`, `BE-001..BE-006`, `OCR-001`. Future Opportunities migrated as ID-less bullets (parking lot). Completed entries (P1, P2, P3-1) keep their legacy IDs as inert history.
- `_project/tasknote/README.md` rewritten from flowtron's `templates/tasknote-README.md`. Declares `OCR-` as photard's project-specific prefix, pins v0.1.0, lists project quick commands, and includes a "Bumping the pinned flowtron version" section with concrete commands (added late in Phase 4 in response to a user question — see Late additions below).
- Photard root `CLAUDE.md`: replaced "Planning & Task Management" block with flowtron's "Workflow" snippet; removed `task/SKILL.md` from Skills enumeration with a redirect note; updated architecture diagram to add `_project/PLAN.md` and `_project/flowtron/` lines.
- `git rm`'d four root plan files + two redundant tasknote-dir files.

Flowtron-side change (single commit, flowtron repo):
- This tasknote archived to `_project/tasknote/archive/core/CORE-007.md`.
- Flowtron's `_project/PLAN.md` flips CORE-007 to `[x]` under Completed (dated 2026-04-30) and adds a new `CORE-013` entry under Low for the ghost-CHANGELOG.md reference cleanup discovered during CORE-007 (see Late additions below).

Key decisions:
1. Adoption mechanism: git submodule (after user `git init`'d photard).
2. Scope: full migration in one task, not minimum-viable + follow-ups.
3. Plan-file shape: collapse all four into a single `_project/PLAN.md`.
4. Task IDs: rename to canonical for active tasks; preserve historical (P1/P2/P3-1) IDs in Completed.
5. Future Opportunities: migrated as ID-less bullets (per user) — IDs assigned only on promotion.

Late additions (during Phase 4):
- User asked how submodule bumps work. The CLAUDE-snippet.md I'd cribbed from said "see flowtron's CHANGELOG.md for migration steps" — but flowtron explicitly dropped CHANGELOG.md in CORE-006. Patched photard's `_project/tasknote/README.md` to remove the ghost reference and added a concrete "Bumping the pinned flowtron version" procedure. The same stale reference still lives inside flowtron's own `claude/CLAUDE-snippet.md` — captured as `CORE-013` in flowtron's PLAN.md for a follow-up fix.

**Archived:** 2026-04-30
