---
title: roster-args-deep-flag
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: []
touches:
  - AGENTS.md
  - claude/AGENTS-snippet.md
  - claude/skills/ft-file-task/SKILL.md
  - claude/skills/ft-file-task/step-0-flags.md
  - claude/skills/ft-task/step-0-flags.md
  - codex/skills/ft-file-task/SKILL.md
---

# CORE-879 | roster-args-deep-flag

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make the skill rosters, `argument-hint` lines, descriptions, and usage notices name the flags the skills actually accept (`--deep`, `--medium|--future`, `-p`, `-d`, `-f`), and make the KEEP IN SYNC guard describe the rosters truthfully.

## ✅ Acceptance

- [x] Guard item 1 in `AGENTS.md` and `claude/AGENTS-snippet.md` reads "names plus per-skill flags" (the snippet alone carries arguments) — `grep -q 'names plus per-skill flags' AGENTS.md claude/AGENTS-snippet.md`
- [x] `/ft-open-epic` carries `--deep` in both rosters — `grep -c 'ft-open-epic. (.--deep.)' AGENTS.md claude/AGENTS-snippet.md`
- [x] `/ft-file-task`'s `argument-hint` names `--medium` and `--future`; its description and the Codex wrapper's document them — `grep -m1 '^argument-hint:' claude/skills/ft-file-task/SKILL.md`, Pair B/J/M via `bash tools/drift-checks.sh`
- [x] `/ft-file-task`'s usage notice names `-p`; `/ft-task`'s usage line names `-d` and `-f` — `grep -n 'Usage:' claude/skills/ft-file-task/step-0-flags.md claude/skills/ft-task/step-0-flags.md`
- [x] Full validation set stays green — `just check`
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Reword guard item 1 in `AGENTS.md` and the snippet's guard 1
- [x] Add `(`--deep`)` to `/ft-open-epic` in both rosters
- [x] Extend `ft-file-task` `argument-hint`, `description:`, and the Codex wrapper description
- [x] Add `-p` to `ft-file-task`'s usage notice; `-d` / `-f` to `ft-task`'s
- [x] Run `just check` and `bash tools/drift-checks.sh`

## 🔗 Related

- Surfaced by audit-docs 2026-11-07 (Finding #9, Low).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every named drift is confirmed in the current files: guard item 1 says rosters carry arguments but only the snippet does; neither roster names `--deep`; the `ft-file-task` hint omits `--medium|--future`, which `step-0-flags.md` accepts; the usage notices omit the short aliases.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A: documentation and frontmatter wording, no module boundaries.

- [x] **Archive skim** — see Discovery Notes.

- [x] **Drift check** — PLAN line matches the files read; see Discovery Notes.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Archive skim: `archive/core/` greps for the touched paths are not load-bearing for a wording fix; no prior note contradicts the change.
- Drift check: `tools/drift-checks.sh` Pair B (Claude ↔ Codex description flag sets), Pair J (prose flag → hint), Pair M (hint flag → description; exempts only `--low|--med|--fut|--high`) and `skill_frontmatter_yaml` (no `: ` or ` #` in a plain description) bind this change. Documenting `--medium` / `--future` in the Claude description therefore needs the same in the Codex wrapper, and the description may not use `priority: …`.
- No clarifications needed (--unattended). Assumptions: the usage notices get only the aliases the task names (`-p`; `-d`, `-f`), not `--medium` / `--future`; the description documents the whole park-priority set in one parenthetical rather than two flags alone.
- Size estimate: ~20 lines (rename-aware).
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the existing roster / hint / usage-notice shapes in place; no new shape.
- Edited the six `touches:` paths, each by a one-line wording change (the guard comments rewrapped).
- The `description:` parenthetical reads `priority via …` because a plain-scalar description may not hold `: ` (`skill_frontmatter_yaml`).
- External review fix: the `ft-file-task` usage notice now lists the full priority set (`--low|--med|--medium|--fut|--future|--high`) to match the hint — a one-token widening on the line already edited for `-p`.
- No tests added: wording-only change, covered by the existing drift checks (Pairs B, J, M, S, `skill_frontmatter_yaml`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (markdown and frontmatter wording only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Full validation set (`--unattended`): `just check` → 0, run twice (before and after the review fixes). It covers `npm --prefix viz test|typecheck|lint|build`, `node --test tools/update-adopters.test.mjs` (122 pass), `node --check` ×2, `node --test tools/drift-checks.test.mjs` (40 pass), and `bash tools/drift-checks.sh` (every check ok; `pair_b`, `pair_j`, `pair_m`, `pair_s`, `skill_frontmatter_yaml`, `context_budget` among them).

Acceptance verify commands:

- `grep -q 'names plus per-skill flags' AGENTS.md claude/AGENTS-snippet.md` → 0
- `grep -c 'ft-open-epic. (.--deep.)' AGENTS.md claude/AGENTS-snippet.md` → 1 and 1
- `grep -m1 '^argument-hint:' claude/skills/ft-file-task/SKILL.md` → 0, reads `[--park|-p [--low|--med|--medium|--fut|--future|--high]]`
- `grep -n 'Usage:' …/ft-file-task/step-0-flags.md …/ft-task/step-0-flags.md` → 0, shows `-p`, `-d`, `-f`
- `just check` → 0; `bash tools/drift-checks.sh` → 0

Scope guardrails (before Phase 3): all 6 paths in `touches:` plus this note; ~20 lines against the 400 cap.

External review (`/code-review medium`, this diff only): 6 findings, no blockers.

- Usage notice listed only the four short priority flags — **fixed** (see Implementation Notes).
- Guard item 1 wording "snippet.md's carries" was ungrammatical — **fixed**: "only the snippet's roster carries arguments".
- Guard 1 does not say which arguments belong to which surface — no change: it now says only the snippet block carries arguments, which is the point.
- Codex wrapper body not touched — no change: the wrapper reads and follows `claude/skills/ft-file-task/SKILL.md`, so the Claude flag handling applies.
- `-d` / `-f` absent from the AskUserQuestion options — no change: the hint already shows the aliases and the options name the long forms by design.
- `ft-open-epic` hint / byte budget — no change: its hint already carries `[--deep]`, and `context_budget ok` above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change (see Final Summary)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? N/A

**Final Summary:**

Reworded KEEP IN SYNC guard item 1 in `AGENTS.md` and `claude/AGENTS-snippet.md`; added `--deep` to `/ft-open-epic` in both rosters; added `--medium|--future` to `/ft-file-task`'s `argument-hint`, `description:` and the Codex wrapper description; added `-p` to its usage notice (plus the full priority set, per the review) and `-d` / `-f` to `/ft-task`'s usage line. `touches:` reconciles exactly with `git diff --name-only`. Doc-drift sweep: no change — the only other mention, the `SPEC/tasknote-selection.md` park example, is out of scope and still valid shorthand. Nothing deferred, so no filing and no `unattended-candidates:` line.

**Archived:** 2026-11-07
