---
title: wire-ft-spec
status: completed
tags: []
created: 2026-08-07
due:
related-tasks: [CORE-EPIC-410, CORE-410.2, CORE-410.4]
---

# CORE-410.3 | wire-ft-spec

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-410]] [[CORE-410.2]] [[CORE-410.4]]

## 🎯 Goal

Add the two missing `.claude/` symlinks (`skills/ft-spec`, `commands/ft-spec.md`) so flowtron's own checkout can run the `/ft-spec` skill it ships to adopters.

## ✅ Acceptance

- [x] `.claude/skills/ft-spec` exists as a relative symlink resolving to `../../claude/skills/ft-spec/`, matching the pattern used by every other wired skill (e.g. `.claude/skills/ft-task`).
- [x] `.claude/commands/ft-spec.md` exists as a relative symlink resolving to `../../claude/commands/ft-spec.md`, matching the pattern used by every other wired command.
- [x] CORE-410.2's local-half standing parity check (`/ft-release` §7.1) reports a clean (empty) diff for both the skills and commands comparison when re-run.

## 🧩 Subtasks

- [x] Create `.claude/skills/ft-spec` symlink pointing at `../../claude/skills/ft-spec/`.
- [x] Create `.claude/commands/ft-spec.md` symlink pointing at `../../claude/commands/ft-spec.md`.
- [x] Verify both links resolve and re-run the CORE-410.2 local diff to confirm clean.

## 🔗 Related

- [[CORE-EPIC-410]] — parent epic: nothing verifies flowtron's own installed skill/command surface.
- [[CORE-410.2]] — predecessor: the parity check that measured and named this exact gap (2 local-missing findings).
- [[CORE-410.4]] — sibling: prunes the nine dangling `~/.claude/` links; separate (global, advisory) half of the same epic.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Re-verified live — `.claude/skills/ft-spec` and `.claude/commands/ft-spec.md` are both absent while the source (`claude/skills/ft-spec/`, `claude/commands/ft-spec.md`) exists and is fully wired in every adopter-facing doc. Matches CORE-410.2's measured finding exactly.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set.** PLAN.md CORE-410.3 line, `SPEC/epic.md`, `.flowtron/tasknote/archive/core/CORE-410.2.md` (direct predecessor), live filesystem state of `.claude/skills/`, `.claude/commands/`, `claude/skills/`, `claude/commands/`.

**Measured current state (2026-08-07).** `.claude/skills/ft-spec` and `.claude/commands/ft-spec.md` do not exist. `claude/skills/ft-spec` (directory) and `claude/commands/ft-spec.md` (file) both exist in the shipped source tree. The existing wiring pattern for every other skill is a relative symlink: `.claude/skills/ft-task -> ../../claude/skills/ft-task/` and `.claude/commands/ft-task.md -> ../../claude/commands/ft-task.md`. `ft-spec` is the sole gap.

**Archive skim.** [[CORE-410.2]] is the direct predecessor and already fully diagnosed this gap: `ft-spec` shipped 2026-07-12 (CORE-352.2), was wired into the adopter-facing `claude/AGENTS-snippet.md` and `/ft-new-project` Step 3, but was never wired into flowtron's own `.claude/` checkout. `docs/PLATFORMS.md` §"Installed-surface policy" (updated by CORE-410.2) now states the rule this task satisfies: flowtron's own checkout is not an adopter and mirrors the full shipped inventory in `.claude/`. No other archived tasknote touches `.claude/skills/ft-spec` or `.claude/commands/ft-spec.md`.

**Drift check.** No drift — CORE-410.2's live measurement (2 local-missing: `ft-spec` skill + command) matches today's re-check exactly. No SPEC contract conflict: this is a two-symlink mechanical fix matching an already-established pattern, not a new subsystem. Matches the PLAN.md line verbatim (add the two missing symlinks).

**No clarifications needed** — the fix is fully specified by the existing symlink pattern (relative `../../claude/...` links, matching all 17 other wired skills/commands) and by CORE-410.2's precise diagnosis. No design decision remains.

Discovery surfaced no significant deviation → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the existing 17-pair symlink pattern verbatim — no new shape invented. `ln -s ../../claude/skills/ft-spec/ ft-spec` (run from `.claude/skills/`) and `ln -s ../../claude/commands/ft-spec.md ft-spec.md` (run from `.claude/commands/`), mirroring `ft-task`'s links exactly (relative path depth, trailing slash on the directory target — 16 of 17 existing skill links carry a trailing slash; the first attempt omitted it, caught by an explicit cross-check against all existing links and corrected before verification).

**Minimal refactor gate.** No refactor — two `ln -s` calls, nothing else touched.

**Updated/added tests.** N/A — no code, no automated test surface for symlink wiring; verification is direct filesystem inspection (`ls -la`, `readlink`) plus re-running CORE-410.2's diff check, both done in Phase 3.

**Testing Notes:**

Verified via direct filesystem inspection: both new links exist, are relative, resolve correctly (`.claude/skills/ft-spec/SKILL.md` reads through the link), and match the trailing-slash convention used by 16 of 17 other wired skill links. Re-ran CORE-410.2's exact local-half checks:

- `diff <(ls claude/skills/) <(ls .claude/skills/ | grep '^ft-')` → empty, exit 0 (previously one `-ft-spec` line).
- `diff <(ls claude/commands/) <(ls .claude/commands/ | grep '^ft-')` → empty, exit 0 (previously one `-ft-spec.md` line).
- `find .claude/skills .claude/commands -type l ! -exec test -e {} \; -print` → empty (no broken links, local half stays clean).

**Quality assertions.** N/A — no code changed; two filesystem symlinks added, nothing to duplicate, no dead code, no complexity, no public surface, no code-facing docs affected.

**👁️ visual confirmation** — N/A, no frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change; doesn't enumerate `.claude/` install state.
  - `SPEC.md` — no change; contract layer, unaffected by a local symlink fix.
  - `docs/MIGRATION.md` — no change; adopter-facing, and `ft-spec` was already correctly wired into adopter guidance.
  - `claude/AGENTS-snippet.md` — no change; adopter surface, already correct.
  - `codex/AGENTS-snippet.md` — no change; Codex-specific, out of scope (`.claude/` only).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change; wiring-layer fix (`.claude/` symlinks), outside the ledger's contract-layer scope.
  - `docs/PLATFORMS.md` — no change; the policy this fix satisfies ("flowtron's own checkout mirrors the full shipped inventory") was already written by [[CORE-410.2]] — this task executes against that policy, doesn't restate it.
  - `claude/CAPABILITIES.md` — no change; no capability trigger involved.
  - `docs/AGENT-COMPAT.md` — no change; no agent-compat matrix impact.
  - `docs/EXTERNAL-AGENTS.md` — no change; no delegation/handoff surface touched.
  - `docs/WORKTREES.md` — no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added the two `.claude/` symlinks CORE-410.2 identified as missing: `.claude/skills/ft-spec -> ../../claude/skills/ft-spec/` and `.claude/commands/ft-spec.md -> ../../claude/commands/ft-spec.md`. Flowtron's own checkout can now run `/ft-spec`, the skill it has shipped to adopters since 2026-07-12 (CORE-352.2) but never wired into itself.

Change: 2 symlinks added, 0 lines of code or prose touched. First attempt omitted the trailing slash `ft-task` and 14 other skill links carry on their directory target; caught by cross-checking all 17 existing links before verifying, then corrected.

Verification: re-ran CORE-410.2's exact local-half standing check — the skills-set diff and commands-set diff (`claude/{skills,commands}` vs `.claude/{skills,commands}` `ft-*` entries) are both now empty (previously one `-ft-spec` / `-ft-spec.md` line each), and the broken-link scan stays clean. Live confirmation: this session's own skill listing now includes `ft-spec` as an invocable skill, which was not true before this change.

No refactor, no code, no doc drift — a pure two-symlink wiring fix executing against the policy CORE-410.2 already wrote into `docs/PLATFORMS.md`. Maintainability effect: closes one of the two local findings CORE-410.2's parity check surfaced; the sibling CORE-410.4 (nine dangling global links) is the epic's remaining child before the check reports a fully clean state.

