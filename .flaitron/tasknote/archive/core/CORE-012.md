# CORE-012 | /new-project skill — guided scaffold flow

**Goal:** Ship a `/new-project` skill that walks a fresh `~/code/` repo through adding the flowtron submodule and populating the `_project/` skeleton via conversational `cp`/`mv` steps — staying inside the SPEC's "zero scripts / no CLI" rule.

**Priority:** Medium (re-scoped 2026-04-30 from Future Opportunities; promoted with re-scope)
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Original "cookiecutter-style scaffolder" framing collides with SPEC §"What flowtron does NOT provide" ("use `cp`, `mv`, and your editor" — no CLI tool). Re-scoped to a `/new-project` skill: markdown + skill-driven scaffold flow that runs the `cp`/`mv` steps conversationally (mirrors the shape of the existing `/task` skill). Stays inside the "zero scripts" rule and reuses the established skill+command pair pattern. PLAN.md line + tasknote header updated; promoted Future Opportunities → Medium.

- [x] Read relevant source files
- [x] **Drift check** — PLAN.md line cites no files/symbols/line numbers; only "drift" was the framing itself, handled by re-scope above. No code drift. ✅
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Defined concrete execution steps below

**Discovery Notes:**

**Files surveyed (parallel patterns to extend):**
- `claude/skills/task/SKILL.md` — canonical shape: numbered steps (Step 0 paths, Step 1 locate, Step 2 pre-flight, Step 3 scaffold, Step 4 drive Phase 1, etc.). Frontmatter `name` + `description`.
- `claude/commands/task.md` — thin pointer: frontmatter (`description`, `argument-hint`) + one-line "Invoke the `task` skill with `args=\"$ARGUMENTS\"`" body.
- `docs/MIGRATION.md` §1.1–1.7 — the seven manual steps the skill must automate (submodule add, symlink wire, CLAUDE.md paste, PLAN.md from template, tasknote README from template, commit, verify).
- `claude/CLAUDE-snippet.md` — source of truth for the CLAUDE.md block + symlink one-liners. Skill should *invoke* this content, not duplicate it.
- `templates/PLAN.md` + `templates/tasknote-README.md` — files copied into the new project; carry placeholders (`Project Name`, `vX.Y.Z`) the skill must substitute.
- SPEC §"What flowtron does NOT provide" — confirms a *skill* (markdown-driven) is not the same as a forbidden *CLI tool*; no SPEC change required.

**Locked design (from Step 5 clarifications):**
- **Distribution:** canonical source in flowtron at `claude/skills/new-project/SKILL.md` + `claude/commands/new-project.md`. Global install via symlinks from `~/.claude/skills/` and `~/.claude/commands/`. One-liner documented in `docs/MIGRATION.md`.
- **Inputs:** minimal — project name (default: cwd basename) + flowtron version pin (default: latest tag from `git ls-remote --tags --sort=-v:refname https://github.com/fakeneuron/flowtron.git`). User fills PLAN.md vision + initial tasks afterward.
- **Commit:** stage-only, surface message (`chore: adopt flowtron at vX.Y.Z`), ask for commit-go (mirrors `/task` post-closure protocol).
- **Scope:** fresh adoption only (MIGRATION.md §1). Migration from prior workflow (§2) stays manual — too many judgment calls.

**Preconditions enforced by the skill (abort if violated):**
- cwd is a git repo (`.git/` exists)
- cwd has `CLAUDE.md`
- cwd does *not* already have `_project/flowtron/`, `_project/PLAN.md`, `.claude/commands/task.md`, or `.claude/skills/task` (any of those → already adopted; refuse)

**Out of scope:**
- Migration from prior workflow systems (covered by MIGRATION.md §2; remains manual)
- Initialising a brand-new git repo or CLAUDE.md (skill assumes both exist)
- Seeding initial PLAN.md tasks beyond the template placeholder
- SPEC.md changes (skill is markdown-driven, not a CLI tool — no contract change)

**Execution Steps:**

1. Create skill scaffold: `claude/skills/new-project/SKILL.md` with frontmatter (`name: new-project`, description) + numbered steps (preconditions, input collection, six bootstrap actions, stage + commit-go).
2. Create thin command pointer: `claude/commands/new-project.md` mirroring `claude/commands/task.md` shape.
3. Write the skill body — each step references existing source-of-truth files (`docs/MIGRATION.md` §1.x, `claude/CLAUDE-snippet.md`) rather than duplicating commands.
4. Add §1.0 "Quick path: /new-project" pointer to `docs/MIGRATION.md` above §1.1, with the global-install one-liner. Keep §1.1–1.7 as the manual fallback / source of truth.
5. Add a one-line mention to repo-root `README.md` so the skill is discoverable.
6. Verify by reading the new files end-to-end (no shell test of the skill itself this round — running it for real would require a throwaway target dir; deferred unless user requests live test).
7. Phase 4 closure: archive tasknote, flip PLAN.md to Completed, recap, commit.

## Phase 2: Execution

- [x] **Pattern survey** — `/task` skill+command pair (`claude/skills/task/SKILL.md` + `claude/commands/task.md`) is the existing shape; extended it 1:1 for `/new-project`. Skill body uses the same numbered-Step structure ("Step 0 — verify preconditions" / "Step 1 — collect inputs" / etc.) as `task` SKILL.md. Command file is a thin pointer in the same shape as `task.md`.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only deliverable; the skill itself is the contract, no testable code)
- [x] Ran targeted tests on changed files — N/A as above

**Implementation Notes:**

**Files created:**
- `claude/skills/new-project/SKILL.md` — main skill: 8 numbered steps (preconditions, input collection, submodule add, symlink wire, CLAUDE.md patch, PLAN.md from template, tasknote README from template, stage + commit-go, verify + hand off). References `docs/MIGRATION.md` §1.x for each step rather than duplicating prose.
- `claude/commands/new-project.md` — thin command pointer mirroring `claude/commands/task.md` shape.

**Files patched:**
- `docs/MIGRATION.md` — added §1.0 "Quick path: /new-project" above §1.1, including the one-time global-install one-liner (symlinks from `~/.claude/skills/` and `~/.claude/commands/` into `~/code/flowtron/claude/`). §1.1–1.7 retained as the manual fallback / source of truth.
- `README.md` — added a 4-line "Bootstrapping a new project" section pointing at `/new-project` + MIGRATION.md §1.0; extended the `claude/` repo-layout bullet to mention `/new-project` alongside `/task`.

**Key design decisions (locked in Phase 1, executed here):**
- Skill lives canonically inside flowtron at `claude/skills/new-project/` so it stays versioned with SPEC; users install globally via symlinks (one-time, per-machine) so `/new-project` is invokable from any cwd before the submodule exists in the target project.
- Skill assumes cwd is the new project root (already a git repo with `CLAUDE.md`) — refuses otherwise. Avoids re-implementing `git init` / CLAUDE.md scaffolding.
- Skill stages files explicitly (no `git add .` / `-A`) — protects unrelated unstaged work in the target project.
- No commit without commit-go — mirrors `/task` post-closure protocol.
- Migration from prior workflow systems (MIGRATION.md §2) deliberately stays manual — judgment-call territory.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)
- [x] Ran lint/type-check on changed code — N/A (markdown-only; no project-side markdownlint configured)
- [x] (frontend) Asked the user for visual confirmation — N/A (not a frontend change)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

Verification was by end-to-end re-read of the four files for cross-reference coherence:

- SKILL.md Step 4 reads `_project/flowtron/claude/CLAUDE-snippet.md` — exists. ✓
- SKILL.md Steps 5–6 read `_project/flowtron/templates/PLAN.md` + `templates/tasknote-README.md` — both exist. ✓
- SKILL.md Step 1 default-version detection (`git ls-remote --tags --sort=-v:refname ... | head -n1`) — manually validated against the public repo (current latest tag: `v0.1.1`).
- `docs/MIGRATION.md` §1.0 install one-liner — paths match flowtron's actual layout (`claude/skills/new-project`, `claude/commands/new-project.md`). ✓
- README.md `claude/` line still accurate after the new skill is added. ✓

**Live dry-run deferred** — running `/new-project` against a throwaway target repo would require either spinning up a sacrificial `~/code/` directory or doing it post-merge. User opted to defer at the Phase 1 checkpoint; if a regression surfaces during the first real adoption, it gets a follow-up `CORE-` task.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change (`docs/MIGRATION.md` §1.0; `README.md` repo-layout + new "Bootstrapping a new project" section)
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-30`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Re-scoped from "cookiecutter-style scaffolder" (CLI tool — collides with SPEC §"What flowtron does NOT provide") to a markdown-driven `/new-project` skill that walks a fresh `~/code/` repo through MIGRATION.md §1's six bootstrap steps conversationally. Promoted Future Opportunities → Medium and shipped immediately.

**Shipped:**
- `claude/skills/new-project/SKILL.md` — 8-step skill mirroring the `/task` skill shape: precondition checks (git repo + `CLAUDE.md`, no existing flowtron wiring), input collection (project name + pinned version), submodule add, symlink wire, CLAUDE.md append, PLAN.md from template, tasknote README from template, stage + commit-go, verify + hand off.
- `claude/commands/new-project.md` — thin command pointer.
- `docs/MIGRATION.md` §1.0 "Quick path: /new-project" — usage + one-time global-install one-liner; §1.1–1.7 retained as manual fallback / source of truth.
- `README.md` — 4-line "Bootstrapping a new project" section + extended `claude/` repo-layout bullet.

**Key decisions:**
- Skill canonical at `~/code/flowtron/claude/skills/new-project/`; users install globally by symlinking into `~/.claude/skills/` and `~/.claude/commands/` (chicken-and-egg: `/new-project` runs *before* the target project has the submodule, so it can't live inside `_project/flowtron/`).
- Stage-only commit (no unprompted commits — mirrors `/task` post-closure protocol).
- Explicit `git add` of bootstrap files only — protects unrelated unstaged work.
- Migration from prior workflow systems (MIGRATION.md §2) stays manual by design.

**Verification deferred:** live dry-run against a throwaway target repo not done this round (user opted to defer at Phase 1 checkpoint). First real adoption is the practical test; regressions would file a follow-up `CORE-` task.

**Archived:** 2026-04-30
