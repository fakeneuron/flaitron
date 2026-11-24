---
title: check-updater-modules
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-931.3, CORE-931]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - justfile
  - .github/workflows/ci.yml
  - AGENTS.md
  - docs/CONVENTIONS.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - tools/drift-checks.sh
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-932 | check-updater-modules

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-931.3]]

## 🎯 Goal

Syntax-check every `tools/update-adopters/*.mjs` module directly, in every surface that carries the `node --check` roster (justfile `check`, `ci.yml` `validate`, `AGENTS.md` §"Validation"), so the entrypoint's `node --check` no longer hides unchecked modules.

## ✅ Acceptance

- [x] `AGENTS.md` §"Validation", `ci.yml` `validate` and the justfile `check` recipe each carry one `node --check` line per module under `tools/update-adopters/` — `bash tools/drift-checks.sh pair_h pair_t` exits 0
- [x] Every listed command passes — `for f in tools/update-adopters/*.mjs; do grep -qxF "node --check $f" AGENTS.md || echo "MISSING $f"; done` prints nothing, and each `node --check` line exits 0
- [x] Prose that counted the roster ("eight") no longer states a stale count — `grep -rnE 'eight[ -](commands|command)' AGENTS.md docs claude tools` prints nothing
- [x] The drift suite and context budgets still pass — `node --test tools/drift-checks.test.mjs` and `bash tools/drift-checks.sh` exit 0

## 🧩 Subtasks

- [x] Add six `node --check tools/update-adopters/<module>.mjs` lines (apply, check, release, text, wiring, workspace) after the entrypoint's line in `AGENTS.md`, `ci.yml` and the justfile `check` recipe, same order everywhere
- [x] Replace the stale "eight commands" counts (AGENTS.md ×2, docs/CONVENTIONS.md, step-7.1 Pair H, drift-checks.sh `pair_t` comment) with count-free wording; update `docs/CODEX-VERIFICATION.md`'s `node --check` row
- [x] Run the roster, the drift checks and their self-test

## 🔗 Related

- [[CORE-931.3]] — External review of workspace-module surfaced this nit
- [[CORE-931]] — parent epic: updater split into `tools/update-adopters/*.mjs`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `tools/update-adopters/` holds six modules (apply, check, release, text, wiring, workspace) and only the entrypoint and its test are `node --check`ed in justfile / ci.yml / AGENTS.md. CORE-931 is closed, so the module set is stable. Still real, still unblocked.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — N/A: config/doc roster edit, no code or module boundary touched

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — `node --check tools/update-adopters.mjs` does not follow imports, so the new `tools/update-adopters/*.mjs` modules (`release.mjs`, `workspace.mjs`, and the ones CORE-931.4–.7 add) are never syntax-checked directly. Add them to the `node --check` step in the justfile `check` recipe, `.github/workflows/ci.yml` and AGENTS.md / CLAUDE.md §"Validation". `/ft-release` §7.1 Pair H pins the roster byte-for-byte, so change every surface together. The test suite still imports the modules, so this is a nit. Surfaced by the CORE-931.3 External review.
>
> **Resume anchor** — Closing CORE-931.3: External review notes weighed; Testing Notes, closure checks and the commit are next.

- **Archive skim:** `archive/core/` hits are the CORE-931.x children and earlier updater tasks that ran `node --check` ×2 by hand; no prior tasknote changed the roster shape. `CORE-931.5` ran `node --check` on `wiring.mjs` ad hoc.
- **Drift check:** PLAN line cites `tools/update-adopters/*.mjs`; six modules exist today. CLAUDE.md is a symlink to AGENTS.md, so one edit covers both. CI's `validate` job has the roster as `- run:` lines; `pair_h` and `pair_t` extract `^(npm --prefix viz |node --)` lines from AGENTS.md and diff them against ci.yml and the justfile `check` recipe.
- **Finding that shapes the approach:** `node --check a.mjs b.mjs` checks only the first file and exits 0 on a bad second one (tested on Node 26.13). So a glob, one command for all modules, would silently check one file. One `node --check` line per module is required.
- **Per-line vs loop:** a `for f in …` loop would auto-cover future modules, but it fails the `^node --` extraction in `pair_h` and `pair_t`, so it needs regex widening in both plus new self-test seeds. Per-module lines match the existing shape and need no drift-check code change. The module set is stable after CORE-931, so per-line wins. Tradeoff: a future module is unchecked until its line is added; its test import still covers it.
- **Stale counts:** "eight commands" is in `AGENTS.md` (×2), `docs/CONVENTIONS.md:72`, `step-7.1-mirror-pairs.md` Pair H, and the `pair_t` comment in `tools/drift-checks.sh`. Reword count-free rather than renumber to fourteen.
- No clarifications needed — assumptions: per-module lines (above), same order in all three surfaces, one commit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: roster/doc edit; `pair_h` / `pair_t` already bind the three surfaces and their self-test seeds still hold

**Implementation Notes:**

- Six `node --check tools/update-adopters/<m>.mjs` lines (apply, check, release, text, wiring, workspace) added after the entrypoint line, same order, in `AGENTS.md` §"Validation", `ci.yml` `validate`, and the justfile `check` recipe.
- Reworded the stale "eight commands" count-free in `AGENTS.md` (×2), `docs/CONVENTIONS.md`, `step-7.1-mirror-pairs.md` Pair H (which now also records that `node --check` reads one file per call, so a glob is not an option), and the `pair_t` comment in `tools/drift-checks.sh`.
- Left `docs/CODEX-VERIFICATION.md` alone: its `node --check` row is a dated verification log, not the roster. Dropped it from `touches:`.
- The deleted sidequest stub made `pair_q` fail until the deletion was staged (it reads `git ls-files`); staged with `git add -u` on that one path.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on all eight updater files (the thing this task adds) plus `git diff --check`; no `viz/` code touched

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [ ] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh pair_h pair_t                          → 0
for f in tools/update-adopters/*.mjs; grep -qxF "node --check $f" AGENTS.md; node --check "$f"   → 0, no MISSING
grep -rnE 'eight[ -](commands|command)' AGENTS.md docs claude tools → 1 (no match)
node --test tools/drift-checks.test.mjs                           → 0 (48/48)
node --test tools/update-adopters.test.mjs                        → 0 (124/124)
bash tools/drift-checks.sh                                        → 0 (NEAR CAP advisories only, none from this diff's net growth: ft-release/** was already 95%)
git diff --check                                                  → 0
```

Structural check: no duplication or dead code; the one stale-doc risk (the roster count) is fixed above.

**External review** (`/code-review medium`, forked context, over this task's uncommitted diff; no blockers):

- **note — fixed:** the reworded `pair_t` comment read lopsided ("the drift-checks / command is a literal"). Now names `bash tools/drift-checks.sh` as the literal. `bash tools/drift-checks.sh` → 0 after the fix.
- **note — filed:** nothing enforces that every `tools/update-adopters/*.mjs` has a roster line, so a later module left off all three surfaces passes unchecked. Parked as CORE-936 `roster-covers-modules` (Low).
- **pre-existing, not this diff — already filed:** the Node ≥20 guard runs after the static module imports (hoisted). Tracked as CORE-935 `updater-node-guard-order`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Doc-drift sweep: walked the AI-referenced docs for roster mentions. Changed `AGENTS.md`, `docs/CONVENTIONS.md`, `claude/skills/ft-release/step-7.1-mirror-pairs.md` (count-free wording); no other listed doc names the `node --check` roster. `docs/CODEX-VERIFICATION.md` is a dated log and stays as written.

Learnings: `node --check` takes one file per call, so a glob checks only the first. Recorded in step-7.1 Pair H's prose, where the next editor of the roster will read it. No other line for the always-loaded layer.

Recap: six `node --check tools/update-adopters/<module>.mjs` lines added after the entrypoint's in `AGENTS.md` §"Validation", `ci.yml` `validate` and the justfile `check` recipe (same order; `pair_h` and `pair_t` bind them). The stale "eight commands" counts are now count-free. `touches:` reconciled: declared `docs/CODEX-VERIFICATION.md` dropped on purpose; extra paths are the two sidequest files (CORE-932 stub retired, CORE-936 filed) and the PLAN/tasknote closure writes. Effect: a syntax error in any updater module now fails `just check` and CI directly, not only by way of the test imports. Follow-ups: CORE-936 (roster-covers-modules); CORE-935 already tracks the Node-guard ordering.

**Archived:** 2026-11-24
