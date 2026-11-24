---
title: just-wire
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: []
touches:
  - justfile
  - CONTRIBUTING.md
---

# CORE-925 | just-wire

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add an idempotent `just wire` recipe that links only the missing `.claude/skills`, audit-overlay and `.agents/skills` entries (printing dangling links, removing none), and point `CONTRIBUTING.md` §"Developing flaitron skills" at it.

## ✅ Acceptance

- [x] `justfile` has a `wire` recipe — `just --summary | tr ' ' '\n' | grep -qx wire`
- [x] On a fresh scratch tree the recipe creates every missing link (one per `claude/skills/*`, one per `codex/skills/*`, plus `audit`) — scratch-tree run, `test -L` on each
- [x] A second run is a no-op that exits 0 and prints no `linked` line — scratch-tree run, `grep -c '^linked'` is `0`
- [x] An existing link (even one with a different target) is left untouched, and a dangling link is printed but not removed — scratch-tree run, `readlink` unchanged and `test -L` on the dangling link still true
- [x] `CONTRIBUTING.md` §"Developing flaitron skills" names `just wire` — `grep -q 'just wire' CONTRIBUTING.md`
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the `wire` recipe to `justfile` (bash shebang recipe; `[ -e ] || [ -L ]` guard per link; overlay link; dangling inventory)
- [x] Update the justfile header comment only if it lists recipes it would now miss
- [x] Point `CONTRIBUTING.md` §"Developing flaitron skills" at `just wire` (keep the manual commands as the fallback for a machine without `just`)
- [x] Verify against a scratch tree, then run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-217]] — drove tracked `.claude/` wiring to zero; `.claude/` stays wholly ignored
- audit-structure 2026-11-24 Finding #8 (Medium) — source of this row

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No `wire` recipe exists in `justfile`; `.agents/skills` is already missing `ft-import-task` (present in `codex/skills/` and linked in `.claude/skills/`), the exact gap the manual `ln -s` glob leaves.

- [x] Read relevant source files — `justfile`, `CONTRIBUTING.md` §"Developing flaitron skills", current `.claude/skills` and `.agents/skills` link listings.

- [x] **Best Practices Review** — N/A with reason: one shell recipe, no module boundary touched.

- [x] **Archive skim** — `archive/core/` resolved from the README table (`CORE-*` → `archive/core/`); see Discovery Notes.

- [x] **Drift check** — PLAN line matches the repo: no `wire` recipe, CONTRIBUTING still shows the manual `ln -s` commands, and `.claude/` + `.agents/` are gitignored (`.gitignore:23-24`).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: links are relative (`../../claude/skills/<slug>`, `../../codex/skills/<slug>`, `../../.flaitron/audit-overlay/`), matching the existing ones; "missing" means no file or symlink (dangling included) at the link path; the recipe never deletes or retargets; the dangling inventory covers `.claude/skills`, `.claude/commands` and `.agents/skills` (the three CONTRIBUTING `find` globs).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Archive skim (`archive/core/`, grep for `just wire` / `Developing flaitron skills`): CORE-769.2 renamed the CONTRIBUTING heading to §"Developing flaitron skills" and fixed its citations (Pair Q guards them) — keep the heading text unchanged. CORE-790 marks command stubs as pre-v7.0.0 there — leave those lines alone. The justfile header cites CORE-637 / CORE-828 / CORE-830 for the viz and `check` recipes; `drift-checks` `pair_t` guards only the `check` recipe's command list, so a new standalone recipe is out of its reach.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: follows `coverage`'s `#!/usr/bin/env bash` + `set -euo pipefail` shebang recipe. New shape justified: a small `link()` helper guarded by `[ -e ] || [ -L ]`, so a dangling or retargeted link at a path counts as present and is never replaced. Links are relative, matching the existing ones (`../../claude/skills/<slug>`, `../../codex/skills/<slug>`, `../../.flaitron/audit-overlay/`). The dangling inventory uses CONTRIBUTING's own `find` globs, `|| true`-guarded so a missing `.claude/commands` can't fail the recipe. The header comment lists no recipes, so it needs no edit. CONTRIBUTING gains one paragraph above the manual commands, which stay as the no-`just` fallback; the §"Developing flaitron skills" heading is untouched (Pair Q). No test file: the recipe is shell glue in an ignored directory, verified by scratch-tree runs below.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI; recipe and doc only

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scratch tree `scratchpad/wire2` (two claude skills, one codex skill, an overlay dir), run via `just --justfile <repo>/justfile --working-directory <scratch> wire`:

- `just --justfile justfile --summary | tr ' ' '\n' | grep -qx wire` → 0
- fresh run (empty `codex/skills/`) → 0; linked `a`, `b`, `audit`; no literal `*` link (nullglob)
- after adding `codex/skills/a`, run, then re-run → 0, `grep -c '^linked'` = 0
- custom link `b -> custom-target` kept (`readlink` unchanged); `stale` dangling link printed and still present → 0
- real checkout `just wire` → 0, silent (the only missing link, `.agents/skills/ft-import-task`, was created by the earlier run; ignored dir, nothing tracked)
- `grep -q 'just wire' CONTRIBUTING.md` → 0
- `bash tools/drift-checks.sh` → 0 (all pairs ok, `pair_q` and `pair_t` included)

Lint/type: N/A — shell recipe and markdown; `just` parsed it (`--summary`) and the drift checks cover the markdown.

External review (`/code-review medium`, over this task's diff only), four notes, all nits:

- CONTRIBUTING said the manual commands were "the same steps" although `ln -sfn` forces `audit` — **fixed**, reworded to name the difference.
- No `nullglob` on the skill globs (an empty dir would create a link named `*`) — **fixed**, `shopt -s nullglob`; checked with an empty `codex/skills/`.
- Dangling inventory swallowed all `find` errors with `2>/dev/null || true` — **fixed**, roots limited to directories that exist, no suppression.
- Link targets lack the trailing slash the older links carry — **declined**: the documented manual `ln -s` over the `claude/skills` glob yields none, and CONTRIBUTING's unlink guard names the target without one, so `wire` matches the documented form.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`just wire` now does this checkout's skill wiring in one idempotent step: it links only the missing `.claude/skills`, audit-overlay and `.agents/skills` entries, leaves existing links (even retargeted ones) alone, and prints dangling links without removing any. CONTRIBUTING §"Developing flaitron skills" points at it and keeps the manual commands as the no-`just` fallback. Files: `justfile` (+34), `CONTRIBUTING.md` (+2). Doc-drift sweep: `CONTRIBUTING.md` is the only AI-referenced doc it touches, and that was the update. `touches:` matches `git diff --name-only` (`justfile`, `CONTRIBUTING.md`). Learnings: N/A.

**Archived:** 2026-11-24
