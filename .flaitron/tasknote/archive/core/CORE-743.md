---
title: maintainer-wiring-glob
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: []
touches:
  - CONTRIBUTING.md
  - codex/AGENTS-snippet.md
---

# CORE-743 | maintainer-wiring-glob

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Rewrite the maintainer `ln -s ../../…/*` glob recipes in `CONTRIBUTING.md` and `codex/AGENTS-snippet.md` so they link correctly when run as documented.

## ✅ Acceptance

- [x] No bare `ln -s ../../…/*` glob remains in either file — `! git grep -nE '^ln -s \.\./\.\./(claude|codex)/[a-z]+/\*' -- CONTRIBUTING.md codex/AGENTS-snippet.md`
- [x] The rewritten recipes, extracted from the edited files and run from the root of a scratch clone, create the expected links under both `bash` and `zsh` — scratch-clone script (receipt in Testing Notes)
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite `CONTRIBUTING.md` lines 44-45 and 58 as `(cd <dir> && ln -s ../../<src>/* .)`
- [x] Rewrite `codex/AGENTS-snippet.md` line 88 the same way
- [x] Verify in a scratch clone under bash and zsh
- [x] Run `bash tools/drift-checks.sh`

## 🔗 Related

- Surfaced by audit-docs 2026-10-08 (Finding #1, High)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The recipes are still in the tree as the PLAN row describes; the symlink target resolves relative to the link's directory, so the `../../` prefix is right only when the command runs from `.claude/skills/` (or `.claude/commands/`, `.agents/skills/`), and the glob expands in the invoking shell's cwd. Both facts hold today.

- [x] Read relevant source files — `CONTRIBUTING.md` (lines 41-61), `codex/AGENTS-snippet.md` (lines 76-89), `claude/skills/ft-release/step-7.1-standing-checks.md` (lines 55-62).

- [x] **Best Practices Review** — N/A: docs-only edit, no code or module boundaries.

- [x] **Archive skim** — `archive/core/` has no tasknote touching these recipes' glob form that changes the plan; the only coupling is `/ft-release` §7.1's anchored `grep '^ln -s ../../.flaitron/core/…'`, which the rewritten `(cd … && ln -s …)` lines do not match, so the set diff stays unchanged (§7.1 line 62 already says the maintainer block must stay out of the set).

- [x] **Drift check** — PLAN line matches the files: the globs are at `CONTRIBUTING.md:44,45,58` and `codex/AGENTS-snippet.md:88`. `git grep` over tracked md/mjs/sh/yml finds no other glob `ln -s` recipe. The PLAN row says "recipes", plural, and the third `CONTRIBUTING.md` one (Codex block) is the same bug, so it is in scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed (--fast). Assumptions: the subshell `(cd … && …)` form is the fix the PLAN row names; the `ln -sfn` audit-overlay line and the non-glob `ln -s` lines already work from the root and stay untouched.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** Mechanism: `ln -s ../../claude/skills/* .claude/skills/` run from the root expands `../../claude/skills/*` against the parent of the repo, so it matches nothing (zsh aborts with `no matches found`; bash passes the literal `*`). Running from the link directory makes `../../claude/skills/*` resolve to the repo's own dirs, and the symlink target text stays correct relative to the link.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: docs-only; verification is the scratch-clone run below

**Implementation Notes:** Pattern: the PLAN row's own `(cd <dir> && ln -s ../../<src>/* .)` subshell form, applied to all three glob recipes (`CONTRIBUTING.md` ×3: commands, skills, Codex; `codex/AGENTS-snippet.md` ×1). Non-glob lines (`ln -sfn …audit-overlay`, `…ft-audit.md .claude/commands/audit.md`) work from the root as written and are untouched. No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — scratch-clone run below (no code tests apply)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `drift-checks.sh` is the lint half

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no rendered surface. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `! git grep -nE '^ln -s \.\./\.\./(claude|codex)/[a-z]+/\*' -- CONTRIBUTING.md codex/AGENTS-snippet.md` → exit 0 (grep exit 1, no match)
- Scratch clone (`git clone` of the repo into the session scratchpad), recipe lines extracted from the edited `CONTRIBUTING.md` and run from the clone root: `bash` → exit 0, `zsh` → exit 0. Both produced 13 `.claude/commands` links (12 + `audit.md`), 13 `.claude/skills` links (12 + `audit`), 12 `.agents/skills` links; every link resolved, none dangling. The `codex/AGENTS-snippet.md` recipe is the same text as the `.agents/skills` line verified.
- `bash tools/drift-checks.sh` → all checks `ok` (incl. `pair_h`, `pair_q`, `context_budget`, `final_newline`).
- Not re-demonstrated: the old form's failure under zsh (the PLAN row states it; the path-access hook blocked the literal command text).
- External review: N/A — 4-line docs-only diff across two files, mechanically verified above; too small to grade.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: the two edited files are the AI-referenced entries for this change; `/ft-release` §7.1 line 62 (anchored greps) still correct; no other doc changes

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect — changed `CONTRIBUTING.md`, `codex/AGENTS-snippet.md` (= declared `touches:`); verified as above; no refactors; doc verdict no further change; maintainers can now paste the recipes as written.

- [x] **Learnings** — anything the always-loaded layer should carry? N/A

**Final Summary:** Rewrote the four maintainer glob `ln -s` recipes (`CONTRIBUTING.md` ×3, `codex/AGENTS-snippet.md` ×1) as `(cd <dir> && ln -s ../../<src>/* .)` so the glob expands from the link directory. Verified in a scratch clone under bash and zsh; drift checks green.

**Archived:** 2026-10-08
