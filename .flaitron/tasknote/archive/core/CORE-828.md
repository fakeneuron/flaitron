---
title: just-check
status: completed
tags: []
created: 2026-10-25
due:
related-tasks: []
touches:
  - justfile
  - AGENTS.md
  - README.md
---

# CORE-828 | just-check

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a `check` just recipe that runs the eight AGENTS.md §"Validation" commands plus `bash tools/drift-checks.sh`, and say so in the justfile header and the AGENTS.md repo-layout bullet.

## ✅ Acceptance

- [x] `just --show check` lists dependencies `test`, `typecheck`, `lint`, and `build`, then the four `tools/` commands from AGENTS.md §"Validation" and `bash tools/drift-checks.sh` — `just --show check`
- [x] `just check` exits 0 — `just check`
- [x] The justfile header no longer claims every recipe only delegates to `npm --prefix viz` — `grep -q 'check` runs' justfile`
- [x] AGENTS.md §"Repo Layout" justfile bullet names `check` — `grep -q 'typecheck`/`build`/`check`' AGENTS.md`

## 🧩 Subtasks

- [x] Add the `check` recipe after `build`, depending on the four viz validation recipes and running the four `tools/` commands plus `bash tools/drift-checks.sh`
- [x] Update the justfile header so `check` is described beside the viz delegations
- [x] Update the AGENTS.md §"Repo Layout" justfile bullet to name `check`
- [x] Update the README justfile bullet in the doc-drift sweep (it currently says every recipe only delegates to viz npm)

## 🔗 Related

- [[CORE-637]] — related-decision: hand-authored root justfile this recipe extends; validation stayed the roster of record

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The open PLAN line matches the tree: no `check` recipe, eight validation commands, drift-checks additive, layout bullet lists only the six viz verbs.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Read set was narrow (justfile, AGENTS.md §"Repo Layout" and §"Validation", README layout bullet, SPEC tasknote + Phase 1–3). No probe.

Best practices: the justfile is a flat list of one-line recipes. `test` / `typecheck` / `lint` / `build` already are the four `npm --prefix viz` validation commands. `check` extends that pattern by depending on those recipes (commands stay written once) and appending the four `tools/` lines plus `bash tools/drift-checks.sh`. `setup` and `dev` stay out: install, and a long-running server.

Archive skim: area is `archive/core/` per the README table. `justfile` hits are numerous and mostly incidental. Load-bearing note is CORE-637, which added the hand-authored six-verb justfile and left AGENTS validation as the roster of record. This task is the filed extension of that surface, not a reversal. No `supersedes:` and no ⚠️ pointer on that note.

Drift check: PLAN line, justfile, and AGENTS.md §"Validation" agree. The eight commands are the four npm lines, three `update-adopters` node lines, and `node --test tools/drift-checks.test.mjs`. `bash tools/drift-checks.sh` is the additive ninth the PLAN names. SPEC has no justfile contract this contradicts.

No clarifications needed (--fast). Assumptions: (1) viz commands run via recipe dependencies, in AGENTS.md order, rather than duplicated lines; (2) README's justfile bullet is updated because it would otherwise stay false; (3) no new justfile test harness — `just --show` and `just check` decide the criteria, same as CORE-637.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing one-recipe-per-verb shape. `check` depends on `test` `typecheck` `lint` `build` so the four `npm --prefix viz` lines stay owned by those recipes, then runs the four `tools/` commands and `bash tools/drift-checks.sh` in AGENTS.md order. Header comment now separates viz delegations from `check`. No refactor beyond that. Tests: N/A — a justfile has no unit harness (CORE-637); `just --show check` and `just check` are the verifiers.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`--unattended` full validation set is `just check` (the recipe this task adds: viz test, typecheck, lint, build, the four `tools/` commands, and `bash tools/drift-checks.sh`).

```text
just --show check                                              → 0
just check                                                     → 0
grep -q 'check` runs' justfile                                 → 0
grep -q 'typecheck`/`build`/`check`' AGENTS.md                 → 0
```

`just check` tail: viz 618 tests passed, `tsc --noEmit` and eslint clean, vite build succeeded, update-adopters 102 tests passed, both `node --check` silent, drift-checks.test 20 passed, `bash tools/drift-checks.sh` every check `ok`.

Structural: the four npm lines stay on their existing recipes; `check` only adds the five commands that had no recipe. Header and the two layout bullets match that split. No dead code.

External review (read-only subagent): no blockers. Note — the four `tools/` lines are now a second copy Pair H does not compare to the justfile; filed as CORE-830. Note — the unattended full-set examples still name `just test` / `just lint` / `just typecheck` first; filed as CORE-831. Both Low, `[light]`, no `[unattended]` token written.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Added `just check`, which runs the four viz validation recipes and then the four `tools/` commands plus `bash tools/drift-checks.sh`. Header, AGENTS.md layout bullet, and README layout bullet name it. `just check` exited 0. No refactor. `touches:` declared `justfile`, `AGENTS.md`, `README.md`; the deliverable diff is those three (this note and the PLAN stub are the closure's own files).

Doc-drift: README.md updated; AGENTS.md updated; no change to SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, codex/AGENTS-snippet.md, cursor/AGENTS-snippet.md, grok/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md. None of those name the six-verb recipe list.

Learnings: N/A. The AGENTS.md layout bullet already carries `check`.

unattended-candidates: CORE-830
unattended-candidates: CORE-831

**Archived:** 2026-10-25
