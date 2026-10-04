# CORE-004 | Build `claude/` (CLAUDE-snippet.md, `/task` command, `/task` skill)

**Goal:** Make `/task <ID>` resolve in flowtron and adopting projects, driven by a SPEC-faithful procedure, with symlink-based adoption.

**Priority:** High
**Area:** core
**Model:** opus
**Status:** Completed 2026-04-28

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/task` currently fails ("Unknown command"); flowtron cannot self-host or migrate other projects until the command resolves. CORE-005/006/007 all depend on this.

- [x] Read relevant source files
- [x] **Drift check** — `_project/PLAN.md:20` lists CORE-004; `claude/commands/` and `claude/skills/task/` exist but are empty; `templates/tasknote-template.md` and `templates/tasknote-README.md` match SPEC. No drift.
- [x] Asked clarifying questions
- [x] Defined concrete execution steps below

**Discovery Notes:**

User decisions (locked via AskUserQuestion):

- **Adoption mechanism:** symlink at adoption. Adopter creates `.claude/commands/task.md` → `_project/flowtron/claude/commands/task.md` and `.claude/skills/task` → `_project/flowtron/claude/skills/task`. Always tracks the pinned submodule version.
- **Scope:** start-only. `/task <ID>` creates a fresh tasknote and drives Phase 1 Discovery, then continues conversationally. Resume happens via plain prompt ("continue CORE-004"). No `/task-close`, no `/task-next`, no auto-resume detection.
- **Cmd/skill split:** thin command, fat skill. `claude/commands/task.md` parses the ID and invokes the Skill. `claude/skills/task/SKILL.md` holds the SPEC-driven procedure as the single source of truth.

Implicit decisions:

- Self-hosting: flowtron's own `.claude/commands/task.md` and `.claude/skills/task` symlink to `claude/...` in this repo (relative paths within the same tree, no submodule).
- CLAUDE-snippet.md is the adoption block — what an adopter pastes into their project's CLAUDE.md, plus the shell commands to create the symlinks.

**Execution Steps:**

1. Write `claude/skills/task/SKILL.md` — frontmatter (name, description) + SPEC-driven procedure: locate task in PLAN.md, copy template, fill header, drive 4 phases + post-closure protocol.
2. Write `claude/commands/task.md` — thin wrapper that invokes the `task` skill with `$ARGUMENTS`.
3. Write `claude/CLAUDE-snippet.md` — adoption block for adopters' CLAUDE.md, with symlink shell commands and reference to SPEC.
4. Self-host: create `.claude/commands/task.md` and `.claude/skills/task` symlinks in flowtron itself so `/task` resolves here.
5. Verify: confirm symlinks resolve, files are syntactically valid (frontmatter parses), and the skill body covers every SPEC checklist item.
6. Phase 4 closure: archive tasknote, flip PLAN.md, recap.

## Phase 2: Execution

- [x] **Pattern survey** — no neighboring commands/skills exist in this repo or in `~/.claude/` to model on. Falling back to documented Claude Code conventions for command/skill file shapes. The skill body's "execute SPEC, don't duplicate it" approach extends the existing pattern of SPEC.md being the single contract.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only repo; behavior is verified by reading)
- [x] Ran targeted tests on changed files — N/A

**Implementation Notes:**

Files written:

- `claude/skills/task/SKILL.md` — frontmatter (`name`, `description`) + 7-step procedure (resolve paths, locate task in PLAN, pre-flight, scaffold, Phase 1, Phases 2–4, post-closure) + Notes covering epic subtasks, skip cases, date format. Path resolution covers both adopters (`_project/flowtron/...`) and self-hosted flowtron (repo root).
- `claude/commands/task.md` — thin wrapper. Frontmatter sets description + `argument-hint: <TASK-ID>`. Body delegates to the skill with `args="$ARGUMENTS"`, with empty-arg guard.
- `claude/CLAUDE-snippet.md` — three sections: paste-block for adopters' CLAUDE.md (workflow overview + `/task` entry point + Model field rule + submodule read-only note), one-time symlink commands using relative paths, and a bumping note pointing at flowtron's CHANGELOG.
- `.claude/commands/task.md` and `.claude/skills/task` — relative symlinks (`../../claude/...`) so flowtron is self-hosting. Verified the symlinks resolve.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)
- [x] Ran lint/type-check on changed code — N/A
- [x] (frontend) Asked the user for visual confirmation — N/A (not frontend)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

Manual verification in lieu of an automated suite:

- `readlink` on both self-hosting symlinks returns the expected `../../claude/...` targets and `head` reads through them correctly.
- Both files have valid YAML frontmatter (`---` delimiters, scalar fields).
- SKILL.md procedurally covers all 19 SPEC checkbox items across the 4 phases plus the 3 post-closure protocol items.
- `/task` cannot be invoked end-to-end inside this turn (the command is loaded at session start) — verification that the slash command actually appears in the menu requires a fresh `/clear` from the user. Flagging as a verification request below.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — none needed; SPEC, PLAN templates, and tasknote-README already reference the workflow shape that CORE-004 implements.
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-28`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Flowtron is now self-hosting. `/task <ID>` resolves via a thin command (`claude/commands/task.md`) that delegates to a fat skill (`claude/skills/task/SKILL.md`) encoding the full SPEC-driven 4-phase workflow plus post-closure protocol. Adopters wire the same command/skill into their `.claude/` via two `ln -s` calls documented in `claude/CLAUDE-snippet.md`. Architecture decisions (symlink adoption, start-only command scope, thin-command/fat-skill split) were locked via AskUserQuestion before any code was written.

**Archived:** 2026-04-28
