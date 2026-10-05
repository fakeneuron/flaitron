---
title: global config rebrand
status: completed
tags: []
created: 2026-10-04
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.8, CORE-711.N]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-713.md
  - ~/.claude/CLAUDE.md
  - ~/.claude/settings.json
  - ~/.claude/hooks/guard-path-access.sh
  - ~/Code/AGENTS.md
---

# CORE-713 | global config rebrand

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.8]] [[CORE-711.N]]

## 🎯 Goal

Retire the remaining pre-rebrand `flowtron` references in the operator-owned global configuration (`~/.claude`, `~/Code`, the path-access guard hook), and scan `~/fakeneuron/` once the operator has added its access root.

## ✅ Acceptance

- [x] Global CLAUDE layers carry no `flowtron` — `grep -c -i flowtron ~/.claude/CLAUDE.md ~/Code/AGENTS.md` → 0 / 0
- [x] `settings.json` and the guard hook carry no `flowtron`, and both are still valid — operator-run `grep -n -i flowtron ~/.claude/settings.json ~/.claude/hooks/guard-path-access.sh ~/.claude/path-access-roots` → exit 1; `python3 -m json.tool` → ok; `bash -n` → ok; mode `-rwxr-xr-x` retained
- [x] Global ft-* symlinks: none into the old path, none dangling — operator-run `ls -l … | grep -i flowtron` and `find -L ~/.claude/{skills,commands} -maxdepth 1 -type l` → empty
- [x] `~/fakeneuron/` scan — N/A: root added by the operator, but the folder does not exist (`ls -d ~/fakeneuron` → exit 1); nothing to scan

## 🧩 Subtasks

- [x] Operator adds the `~/fakeneuron` access root (agent-supplied one-liner, operator-run)
- [x] Rebrand `~/.claude/CLAUDE.md` L12 + L44 and `~/Code/AGENTS.md` L12 (backups in session scratchpad)
- [x] Operator reports `settings.json`, hook, and symlink hits (read-only `!` command)
- [x] Operator applies `settings.json` L105 + hook L56/L369 edits with backups and validity checks
- [x] Scan `~/fakeneuron/` — absent, N/A

## 🔗 Related

- [[CORE-EPIC-711]] — parent rebrand epic (closed)
- [[CORE-711.1]] — discovery; global inventory (L83) names these surfaces
- [[CORE-711.8]] — routed this handoff here
- [[CORE-711.N]] — terminal audit; confirmed this remainder is routed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-711.1 inventoried the surfaces, and `grep` confirmed the legacy name still sat in each named file.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A`: one-token prose/comment/message substitutions in config; no module boundary. For code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- Area lookup: `CORE-*` → `archive/core/` (README table). Model `[medium]` satisfied by the active model (heavy tier).
- Archive skim: CORE-711.1 global inventory (L83) — `~/.claude/CLAUDE.md` L44 (`~/code/flowtron/` pointer), `~/.claude/settings.json` L105 (prose), `~/.claude/hooks/guard-path-access.sh` (mentions flowtron; contents unread, the hook blocked the read), 23 global ft-* symlinks into `~/Code/flowtron/claude/...` (10 already dangling), memory dir `projects/-Users-fakeneuron-Code-flowtron/`; `path-access-roots` has a bare `~/Code` root, so it is unaffected. `~/Code/CLAUDE.md` names the "flowtron `wt-<ID>` worktree convention". `~/fakeneuron/` was blocked by the guard and left unscanned. CORE-711.8 recorded the current line refs: `~/.claude/CLAUDE.md` L12 + L44, `settings.json` L105, `~/Code/CLAUDE.md` L12.
- Path-access posture: `~/.claude/**` and `~/fakeneuron/**` need explicit in-conversation approval that names each path. `path-access-roots` is operator-written only, never by an agent.
- Clarifications (AskUserQuestion, 2026-10-04): read + edit approved for `~/.claude/CLAUDE.md`, `settings.json`, and `hooks/guard-path-access.sh`; the global ft-* symlinks are in scope (check + list; removing or retargeting is operator-confirmed); the operator asked for a script to add the `~/fakeneuron` root.
- The guard hook blocked reads of `settings.json` and the hook script despite the in-conversation approval, because only `path-access-roots` lifts it. That makes those surfaces operator-run (`!` commands), which is the `[handoff]`.
- 2026-10-05: the operator ran the roots script (`~/fakeneuron` appended; the file mixes absolute, `~/`, and `read`/`write`-prefixed entries; `~/.claude/CLAUDE.md` is already a root). `~/fakeneuron/` does not exist (`ls` exit 1), so the scan has nothing to scan.
- Drift check: line refs match CORE-711.8 (CLAUDE.md L12/L44, `~/Code/CLAUDE.md` L12 → symlink to `~/Code/AGENTS.md`, edited at the target so the link survives). Two new hook hits not in the earlier inventory: L56 (comment) and L369 (block message telling agents to file in `.flowtron/PLAN.md`). The symlink concern from CORE-711.1 had already been resolved. No SPEC conflict: the operator performed every write under `~/.claude` that the guard blocks. `~/.claude/CLAUDE.md` is an operator-listed root, so the agent edited it after explicit approval.
- Phase 1→2: Discovery surfaced no significant deviation (the absent `~/fakeneuron/` makes one criterion N/A and does not change direction) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` beyond in-place token substitution; extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — `N/A`, no refactor; refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no behavior change (hook message text only)

**Implementation Notes:**

- Agent: `sed -i ''` on `~/.claude/CLAUDE.md` (L12 `a flowtron bump` → `a flaitron bump`; L44 `**flowtron** (\`~/code/flowtron/\`)` → `**flaitron** (\`~/code/flaitron/\`)`) and `~/Code/AGENTS.md` L12; backups were taken first because neither file is under git.
- Operator (`!`): `settings.json` L105 `Flowtron-based` → `Flaitron-based`; hook L56 + L369 `.flowtron/PLAN.md` → `.flaitron/PLAN.md`; backups in the session scratchpad.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no in-repo code; config validity checks stand in

- [x] Ran lint/type-check on changed code — `json.tool` + `bash -n` (operator-run), both ok

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — `N/A`: six single-token substitutions, each decided mechanically by the receipts below. a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -c -i flowtron ~/.claude/CLAUDE.md ~/Code/AGENTS.md` → 0 / 0 (exit 1)
- `grep -n -i flowtron ~/.claude/settings.json ~/.claude/hooks/guard-path-access.sh ~/.claude/path-access-roots` → exit 1 (operator-run)
- `python3 -m json.tool ~/.claude/settings.json` → exit 0; `bash -n ~/.claude/hooks/guard-path-access.sh` → exit 0; hook mode `-rwxr-xr-x`
- Symlink `ls … | grep -i flowtron` + `find -L … -type l` → empty (operator-run)
- `ls -d ~/fakeneuron` → exit 1

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any README §"AI-referenced docs" entry; no in-repo doc was touched. for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — `N/A`: the guard hook blocking an approved read is designed behavior. The `[handoff]` marker correctly predicted operator-run steps. did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Removed the last global `flowtron` references from 4 out-of-repo files (6 lines): `~/.claude/CLAUDE.md` L12/L44 and `~/Code/AGENTS.md` L12 (agent-edited), plus `~/.claude/settings.json` L105 and `guard-path-access.sh` L56/L369 (operator-edited). The guard blocked the agent from those two. The hook's block message now points agents to `.flaitron/PLAN.md`. Global symlinks were already clean; `~/fakeneuron/` is absent, so the scan is N/A. `touches:` reconciliation: in-repo diff = PLAN.md + this note; the out-of-repo paths are declared and unversioned.

**Archived:** 2026-10-05
