# CORE-008 | Draft InvisiPaw migration playbook (re-scoped from execution → planning)

**Goal:** Produce a ready-to-execute migration playbook for `~/code/InvisiPaw/` and queue the actual execution as CORE-016 (blocked on user's InvisiPaw backlog). No InvisiPaw files touched in this task.

**Priority:** Medium
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope (planning-only; execution split out as CORE-016)
  **Rationale:** InvisiPaw is the right next adoption target, but the PLAN.md line "single task" was written before discovery surfaced 15 in-flight tasknotes, a dirty working tree, and extra root-level files. After clarifying questions, the user signaled they want to drain the InvisiPaw backlog *first* and then execute migration against a clean tree. CORE-008 therefore becomes the planning deliverable (a ready-to-launch playbook captured in the archived tasknote) and CORE-016 is added to PLAN.md as the deferred execution task. Both PLAN.md line and tasknote header have been updated to match this re-scope (see edits dated 2026-04-30).

- [x] Read relevant source files
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

State of `~/code/InvisiPaw/` as of 2026-04-30:

1. **Is a git repo** with GitHub remote `https://github.com/fakeneuron/InvisiPaw.git`. Submodule mechanism is available out of the box (unlike photard, which needed `git init` first).
2. **Parallel home-grown workflow already in place:**
   - `CLAUDE.md` describes a 4-phase lifecycle (Discovery → Execution → Testing → Closure) — already closer to flowtron's 4-phase than photard's 5-phase was.
   - `.claude/skills/task/` is InvisiPaw's local `/task` skill — must be replaced by flowtron's symlinked one. No `.claude/commands/` dir exists yet.
   - `_project/tasknote/` exists with its own `README.md`, `tasknote-template.md`, `TEMPLATE_GUIDE.md`, `archive/`, and `screenshots/`. README/template/guide retire; archive + screenshots stay.
   - `.claude/skills/{audit-backend,audit-frontend,backend,frontend,financial}/` are domain skills — orthogonal to flowtron, leave alone. Only `task/` gets replaced.
3. **Plan-file shape mismatch (same as photard).** Four root-level files: `PLAN.md` (124 KB — much larger than photard's), `ROADMAP.md` (4 KB), `PLAN_ARCHIVE.md` (8 KB), `FUTURE_OPPORTUNITIES.md` (5 KB). Flowtron expects a single `_project/PLAN.md` with `- [ ] **<AREA>-<NUMBER>** — <one-line>` rows grouped by priority.
4. **Task ID convention mismatch.** In-flight tasknote IDs include `P11.7-1..8`, `P11.8-3`, `P11.10-1`, `P11.10-3`, `P11.10-4`, `P17-22`, `P17-6`, `P19-1` — phase-numbered, dotted, and inconsistent in granularity. Doesn't match flowtron's canonical `<AREA>-<NUMBER>` (`BE-`, `FE-`, etc.).
5. **In-flight tasknotes (15 of them).** Far more than photard's zero. Need an explicit reconciliation policy: rename to canonical, declare project-specific prefixes, or freeze-as-legacy. CORE-EPIC-009 (fintown) already calls out this problem as a dedicated subtask — InvisiPaw has the same problem at smaller scale.
6. **Extra root-level project files (not in photard):**
   - `ALGO_CHANGELOG.md` (1.7 KB) — algorithm/strategy version log
   - `STRATEGY_FRAMEWORK_DESIGN.md` (4.4 KB) — design doc
   - `SCRATCHPAD.md` (2 KB) — working notes
   - `risk.yaml`, `DOCKER.md`, `README.md`, `ALGO_CHANGELOG.md` — these are stable project files, leave alone.
   - The disposition of the three "non-plan but plan-adjacent" files (ALGO_CHANGELOG, STRATEGY_FRAMEWORK_DESIGN, SCRATCHPAD) needs a decision: keep at root, fold under `_project/`, or leave alone (they're not flowtron's concern).
7. **Dirty working tree.** `git status` shows:
   - `M PLAN.md` — uncommitted edits to the active plan file (which we're about to delete/collapse)
   - `?? _project/tasknote/P19-1.md` — an untracked in-flight tasknote
   - These conflict with a clean migration commit. Need user direction: commit InvisiPaw's pending work first as a separate commit, or roll into the migration commit?
8. **Latest flowtron tag is `v0.1.1`** (not `v0.1.0` like photard pinned to). Photard pinned to v0.1.0 *because* v0.1.1 didn't exist yet; for InvisiPaw the natural pin is v0.1.1. Worth confirming since photard hasn't been bumped yet either — symmetry argument cuts both ways.

Need user decisions on: tasknote-reconciliation policy, ID convention, extra-files disposition, dirty-tree handling, and pinned flowtron version before defining execution steps.

**Clarifying questions resolved (asked 2026-04-30):**

- Q-IDs: Active task IDs in PLAN.md will be **fully renamed to canonical** (`BE-`/`FE-`) at execution time. The 15 in-flight tasknote *files* are out of scope for CORE-016 — they keep their `P*-*` IDs as inert legacy and a separate future task handles renaming once the user has drained the in-flight pile down. User's reasoning: "minimize rewrite once I have slimmed down pending tasks."
- Q-extra-files: `ALGO_CHANGELOG.md`, `STRATEGY_FRAMEWORK_DESIGN.md`, `SCRATCHPAD.md` — **leave alone**. Orthogonal to flowtron.
- Q-dirty-tree: **No execution now.** Migration is deferred until the user signals InvisiPaw is in a clean state. CORE-016 will start from a clean working tree by precondition; no special dirty-tree handling needed inside the playbook.
- Q-scope: **Split.** CORE-016 covers flowtron wiring + plan-file collapse + active-task-ID rename. Tasknote-file reconciliation deferred to a later follow-up task (to be filed at the same time CORE-016 closes, or earlier if the user decides).
- Q-version: **Resolved at execution time.** Pin CORE-016 to whatever the latest flowtron tag is when CORE-016 actually runs (do not hardcode `v0.1.1` — it'll likely be stale by then).

**Execution Steps (for this planning task):**

1. Write the InvisiPaw migration playbook into Phase 2 implementation notes below. Sections: preconditions, step-by-step execution, verification, commit plan, and explicit out-of-scope items.
2. Spot-check the playbook against the current `claude/CLAUDE-snippet.md` adoption recipe and `docs/MIGRATION.md` so the steps don't drift from the canonical adoption procedure.
3. Phase 3 N/A — no code or tests to run; the deliverable is a markdown plan reviewed by the user.
4. Phase 4 closure: archive this tasknote, flip CORE-008 in PLAN.md, single commit covering PLAN.md (re-scope + CORE-016 add + flip-to-completed) + archived tasknote.

## Phase 2: Execution

- [x] **Pattern survey** — neighboring code for the playbook is `_project/tasknote/archive/core/CORE-007.md` (photard adoption) plus the canonical recipes in `claude/CLAUDE-snippet.md` and `docs/MIGRATION.md`. Playbook below mirrors the photard execution shape, deviates only where InvisiPaw's surface area differs (15 in-flight tasknotes, extra root files, larger PLAN.md).
- [x] Implemented the minimal solution — playbook drafted below.
- [x] Updated/added tests for non-trivial behavior — N/A (planning deliverable, no runtime code).
- [x] Ran targeted tests on changed files — N/A.

**Implementation Notes:**

### InvisiPaw migration playbook (consumed by CORE-016)

This playbook is the deliverable. CORE-016 follows it step-by-step when the user signals InvisiPaw's backlog is cleared. It assumes everything inside `~/code/InvisiPaw/` at execution time is committed and the working tree is clean — that precondition is the user's gating signal, not a step in this playbook.

#### Preconditions (verified before starting CORE-016)

1. `cd ~/code/InvisiPaw && git status` is clean. No staged, unstaged, or untracked files. If not clean, stop and ask the user.
2. The user has explicitly said "InvisiPaw is ready" (or similar). Do not start otherwise.
3. The latest flowtron tag is identified: `cd ~/code/flowtron && git fetch --tags && git tag --sort=-v:refname | head -1`. Record that tag — call it `<FLOWTRON-TAG>` for the rest of this playbook (likely `v0.1.x` for some `x ≥ 1`; do not hardcode `v0.1.1`).

#### Step 1 — Add flowtron as a submodule

```sh
cd ~/code/InvisiPaw
mkdir -p _project   # already exists; mkdir -p is a no-op safety
git submodule add https://github.com/fakeneuron/flowtron.git _project/flowtron
git -C _project/flowtron checkout <FLOWTRON-TAG>
```

This creates `.gitmodules` and adds the submodule pointer at `<FLOWTRON-TAG>`.

#### Step 2 — Wire `.claude/` symlinks (and remove the local task skill)

InvisiPaw has a local `task` skill at `.claude/skills/task/` that must be removed before symlinking. Other domain skills (`audit-backend`, `audit-frontend`, `backend`, `frontend`, `financial`) are orthogonal — leave them alone.

```sh
rm -rf .claude/skills/task
mkdir -p .claude/commands   # InvisiPaw has no commands dir yet
ln -s ../../_project/flowtron/claude/commands/task.md .claude/commands/task.md
ln -s ../../_project/flowtron/claude/skills/task     .claude/skills/task
```

Verify:

```sh
readlink .claude/commands/task.md   # should resolve to ../../_project/flowtron/claude/commands/task.md
readlink .claude/skills/task        # should resolve to ../../_project/flowtron/claude/skills/task
ls .claude/skills/task/SKILL.md     # should exist (resolved via symlink)
```

#### Step 3 — Build new `_project/PLAN.md` (collapsing the four root plan files)

Source files to collapse:

- `~/code/InvisiPaw/PLAN.md` (~124 KB; active tasks)
- `~/code/InvisiPaw/ROADMAP.md` (~4 KB; vision/phases)
- `~/code/InvisiPaw/PLAN_ARCHIVE.md` (~8 KB; completed tasks)
- `~/code/InvisiPaw/FUTURE_OPPORTUNITIES.md` (~5 KB; backlog ideas)

Target shape (per flowtron's `templates/PLAN.md`):

```
# InvisiPaw — PLAN.md

**Last updated:** YYYY-MM-DD (CORE-016 / migrated to flowtron)

## Vision
<paragraph drawn from ROADMAP.md>

## Critical
## High
## Medium
## Low
## Future Opportunities
## Completed
```

**Task ID rule (the nuanced one — read carefully):**

- **Active task IDs in PLAN.md without an existing in-flight tasknote file** → rename to canonical area-prefix form (`BE-NNN`, `FE-NNN`, etc.) per SPEC §"Task ID convention". Choose numbers in the order tasks appear; record the rename map in this tasknote's archive notes when CORE-016 closes.
- **Active task IDs that DO have an in-flight tasknote file** at CORE-016 time (any of `P11.7-*`, `P11.8-*`, `P11.10-*`, `P17-*`, `P19-*` — or whatever survives the user's backlog drain) → **keep the legacy ID** in PLAN.md so it matches the tasknote filename. These IDs are protected by `docs/MIGRATION.md §2.1` ("Preserve task IDs exactly. Archived tasknotes reference them; renumbering breaks the links") and by the existence of an in-flight tasknote file.
- **Completed entries** (from `PLAN_ARCHIVE.md` and any `[x]` rows in current `PLAN.md`) → keep IDs verbatim. Do not rename. Move them under `## Completed`.
- **Future Opportunities** (from `FUTURE_OPPORTUNITIES.md`) → migrate as ID-less bullet points (parking lot). Assign IDs only when promoted to a priority section. (This matches photard CORE-007.)

**Project-specific prefixes** to declare in `_project/tasknote/README.md` (Step 5): whichever of `P11`, `P17`, `P19` (and any others) still appear in surviving in-flight tasknote filenames at CORE-016 time. Declaring these silences the `/task` skill's "Unknown prefix" check for those legacy IDs.

#### Step 4 — Build new `_project/tasknote/README.md`

```sh
cp _project/flowtron/templates/tasknote-README.md _project/tasknote/README.md
```

Then edit:

- `Pinned to:` line → set to `<FLOWTRON-TAG>`.
- Project-specific prefixes section → declare any `P11`/`P17`/`P19` (or surviving legacy prefixes) as project-specific. Note that these are frozen-legacy and new tasks should use canonical area prefixes.
- "Project quick commands" section → fill in InvisiPaw's actual commands. Reference points from current `CLAUDE.md`:
  - Tests: `cd backend && python -m pytest tests/ -v`
  - DB: SQLite at `invisipaw.db` (repo root)
  - Config: `risk.yaml`, `.env`
- Add a "Pre-flowtron historical archives" note if any tasknotes in `_project/tasknote/archive/` predate the flowtron migration (legacy layout — do not relocate).

#### Step 5 — Update `~/code/InvisiPaw/CLAUDE.md`

Replace the existing "## Planning & Task Management" block (currently 4 lines pointing at `ROADMAP.md`/`PLAN.md`/`PLAN_ARCHIVE.md` + `_project/tasknote/` + `/task P11.7-1` example + lifecycle reminder) with the flowtron paste-block from `_project/flowtron/claude/CLAUDE-snippet.md` (the "Block to paste into CLAUDE.md" section).

Keep all other CLAUDE.md content as-is:
- "## Project Overview" (paper-mode/live-trading gate description) — orthogonal to flowtron.
- "## Architecture" — orthogonal, but update the three-line `_project/tasknote/` snippet inside the code block to also list `_project/flowtron/` and `_project/PLAN.md`.
- "**Key details:**" bullets — orthogonal.
- The trailing pointer to `~/.claude/CLAUDE.md` and `~/code/CLAUDE.md` — keep verbatim.

#### Step 6 — Delete the now-redundant InvisiPaw files

```sh
git rm PLAN.md ROADMAP.md PLAN_ARCHIVE.md FUTURE_OPPORTUNITIES.md
git rm _project/tasknote/tasknote-template.md _project/tasknote/TEMPLATE_GUIDE.md
```

Notes:
- `_project/tasknote/README.md` is *replaced* not deleted (Step 4 overwrites it).
- `_project/tasknote/archive/` and `_project/tasknote/screenshots/` stay untouched.
- `_project/tasknote/<P*-*>.md` in-flight tasknotes stay untouched.
- Root files left alone per user decision: `ALGO_CHANGELOG.md`, `STRATEGY_FRAMEWORK_DESIGN.md`, `SCRATCHPAD.md`, `README.md`, `risk.yaml`, `DOCKER.md`, `.env*`, etc.

#### Step 7 — Verification (before commit)

Run all of these from `~/code/InvisiPaw/`:

```sh
git status                                       # expected: deletions of 4 root plan files + 2 tasknote-dir files; additions of .gitmodules, _project/flowtron, _project/PLAN.md, _project/tasknote/README.md (modified), .claude/commands/task.md, .claude/skills/task; modifications of CLAUDE.md
ls _project/PLAN.md && [ ! -f PLAN.md ]          # only one plan file exists, at the new path
readlink .claude/commands/task.md                 # resolves into the submodule
readlink .claude/skills/task                      # resolves into the submodule
cd _project/flowtron && git describe --tags      # reports <FLOWTRON-TAG>
```

Smoke-test (deferred to post-commit, requires fresh Claude Code session in InvisiPaw): typing `/task` should show the command in the menu; `/task <SOME-ID>` against an entry in the new `_project/PLAN.md` should scaffold a tasknote.

#### Step 8 — Commit (InvisiPaw side)

Single commit covering submodule add + symlinks + plan collapse + README replace + CLAUDE.md update + deletions:

```sh
git add .gitmodules _project/flowtron _project/PLAN.md _project/tasknote/README.md \
        .claude/commands/task.md .claude/skills/task CLAUDE.md
# git rm -ed files in Step 6 are already staged
git commit -m "chore: adopt flowtron at <FLOWTRON-TAG> (CORE-016)"
```

#### Step 9 — Phase 4 closure (flowtron side)

In `~/code/flowtron/`:
- Flip CORE-016 to `[x]` under `## Completed` in `_project/PLAN.md` with the close date.
- Archive CORE-016's tasknote to `_project/tasknote/archive/core/CORE-016.md`.
- Capture the active-task ID rename map in CORE-016's Final Summary (the photard precedent — preserves the mapping for future reference).
- Single flowtron-side commit: `feat: CORE-016 — execute InvisiPaw migration per CORE-008 plan`.

#### Out-of-scope for CORE-016 (deferred follow-ups)

- **Renaming the in-flight tasknote files** (`P11.7-*`, `P11.8-*`, `P11.10-*`, `P17-*`, `P19-*`, or whichever survive). User wants these drained down before any rename. File a separate task in flowtron's PLAN.md when CORE-016 closes if any non-trivial pile remains.
- **Touching `ALGO_CHANGELOG.md`, `STRATEGY_FRAMEWORK_DESIGN.md`, `SCRATCHPAD.md`** — explicitly orthogonal per user decision.
- **Bumping flowtron in InvisiPaw post-adoption** — bumps are their own task per `docs/MIGRATION.md §"Pinning and bumping"`.

#### Risks / things that could change before CORE-016 runs

- The 15 in-flight tasknote pile may shift (more added, some closed). Step 3's task-ID rule is written to handle whatever pile exists at execution time, not a frozen snapshot.
- A new flowtron release between now and CORE-016 may add migration steps for adopting projects. Read the latest annotated tag message before starting (`docs/MIGRATION.md §"Pinning and bumping"` step 1).
- InvisiPaw's PLAN.md is large (124 KB at planning time) and may have grown further. Step 3 is a manual translation — budget time accordingly.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (planning deliverable, no runtime code)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change)
- [x] Fixed all introduced issues

**Testing Notes:**

Verification done in lieu of test suite:

- Spot-checked the playbook against `claude/CLAUDE-snippet.md` and `docs/MIGRATION.md` — symlink commands, `CLAUDE.md` paste-block, commit message format, and "preserve task IDs exactly" rule all match canonical guidance.
- Cross-referenced photard CORE-007 (`_project/tasknote/archive/core/CORE-007.md`) for the deviation pattern (rename active IDs, preserve completed IDs, ID-less Future Opportunities) — playbook follows the same shape with one explicit refinement: in-flight tasknote files force their own IDs to stick (a case photard didn't have because it had zero in-flight tasknotes at adoption time).
- Confirmed the version-pinning instruction does not hardcode `v0.1.1` — the playbook resolves `<FLOWTRON-TAG>` at execution time.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (CORE-008 line re-scoped + flipped to `Completed 2026-04-30`; CORE-016 added under Medium)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-008 was re-scoped from "execute InvisiPaw migration" to "draft InvisiPaw migration playbook." Discovery surfaced 15 in-flight tasknotes, a dirty working tree on InvisiPaw side, and extra root-level files (`ALGO_CHANGELOG.md`, `STRATEGY_FRAMEWORK_DESIGN.md`, `SCRATCHPAD.md`) — far more than the "single task" PLAN.md line implied. User wants to drain the InvisiPaw backlog *first* and migrate against a clean tree, so execution was deferred to a new task (CORE-016).

Deliverable: the playbook in Phase 2 implementation notes above. CORE-016 follows it step-by-step when the user signals readiness.

Key calls captured in the playbook:

1. **Version pinning** is resolved at execution time (latest flowtron tag at the moment CORE-016 runs), not hardcoded now.
2. **Active task ID rename rule is nuanced**: rename PLAN.md entries to canonical area prefixes UNLESS an in-flight tasknote file already pins the legacy ID. Preserves the `docs/MIGRATION.md §2.1` "preserve IDs exactly" rule for any tasknote that exists when CORE-016 runs.
3. **Project-specific prefix declaration** (`P11`/`P17`/`P19` etc.) handles whichever in-flight tasknote files survive the user's backlog drain.
4. **Out-of-scope for CORE-016**: renaming in-flight tasknote files, touching the three extra root files, bumping flowtron post-adoption. Each will be its own task if needed.
5. **Photard-pattern deviations** (Future Opportunities as ID-less bullets, completed entries verbatim) carried over.

PLAN.md edits in flowtron repo:
- Line 3 `Last updated:` rewritten.
- Line 24 (CORE-008) re-scoped from "Migrate InvisiPaw (single task)" to the planning-deliverable wording, then flipped to `[x]` under `## Completed` at closure.
- New line under `## Medium` for CORE-016: "Execute InvisiPaw migration per CORE-008 playbook. Blocked: do not start until user signals InvisiPaw backlog is cleared. Scope: flowtron wiring + plan-file collapse + active-task-ID rename. Out of scope: renaming the 15 in-flight tasknote files (deferred further)."

No InvisiPaw files touched (per re-scope).

**Archived:** 2026-04-30
