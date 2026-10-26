---
title: unattended-just-check
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-828]
touches:
  - SPEC/gate-postures.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/procedures/ft-task.md
---

# CORE-831 | unattended-just-check

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-828]]

## 🎯 Goal

Name `just check` first in the `--unattended` full-validation examples when the justfile defines that recipe, so a literal reading still runs build, the tools commands, and drift-checks.

## ✅ Acceptance

- [x] The three full-validation examples name `just check` before `just test` — `python3 -c "import pathlib,sys; ps=['SPEC/gate-postures.md','claude/skills/ft-task/unattended-mode.md','SPEC/procedures/ft-task.md']; [sys.exit(1) for p in ps if not (0<=pathlib.Path(p).read_text().find('just check')<pathlib.Path(p).read_text().find('just test'))]"`
- [x] Each example keeps the three-recipe fallback only after "when the justfile defines that recipe, else", and runs each recipe the justfile defines — `python3 -c "import pathlib,sys; ps=['SPEC/gate-postures.md','claude/skills/ft-task/unattended-mode.md','SPEC/procedures/ft-task.md']; [sys.exit(1) for p in ps for t in [pathlib.Path(p).read_text()] for a in [t.find('when the justfile defines that recipe, else')] for b in [t.find('just test', a)] for c in [t.find('just lint', b)] for d in [t.find('just typecheck', c)] for e in [t.find('for each of those the justfile defines', d)] if not (0<=a<b<c<d<e)]"`
- [x] This repo's `check` recipe is the aggregate that includes build, the tools commands, and drift-checks — `just --show check | grep -q 'check: test typecheck lint build' && just --show check | grep -q 'node --test tools/update-adopters.test.mjs' && just --show check | grep -q 'bash tools/drift-checks.sh' && just --show build | grep -q 'npm --prefix viz run build'`
- [x] `SPEC/gate-postures.md` stays inside its 22,000-char budget — `test "$(wc -c < SPEC/gate-postures.md)" -le 22000`
- [x] `SPEC/procedures/ft-task.md` stays inside its 34,200-char budget — `test "$(wc -c < SPEC/procedures/ft-task.md)" -le 34200`

## 🧩 Subtasks

- [x] Put `just check` first in `SPEC/gate-postures.md` §"What `--unattended` never relaxes", with the three recipes as the fallback
- [x] Mirror that order in `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes"
- [x] Name the same order in `SPEC/procedures/ft-task.md` so a literal SOP reading does too
- [x] Confirm `just --show check` still runs build, the tools commands, and drift-checks

## 🔗 Related

- [[CORE-828]] — predecessor; added `just check` and filed this row from review

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The two example sites still name only `just test` / `just lint` / `just typecheck`, and `justfile` `check` now aggregates build, the tools commands, and drift-checks. The PLAN line matches that gap.

- [x] Read relevant source files — narrow set: `justfile`, `SPEC/gate-postures.md` §"What `--unattended` never relaxes", `claude/skills/ft-task/unattended-mode.md` same section, `SPEC/procedures/ft-task.md` Phase 3, `SPEC.md` Phase 3 pointer, archived CORE-828

- [x] **Best Practices Review** — N/A for module boundaries. The two paragraphs are the contract and its executable mirror; edit both in place, do not add a third restatement.

- [x] **Archive skim** — `archive/core/` is the README row for `CORE-*`. Load-bearing hit: CORE-828's review filed this row because those examples still named the three recipes. CORE-637 introduced the justfile without `check`. No `supersedes:` and no ⚠️ pointer on that hit.

- [x] **Drift check** — `justfile` `check` depends on `test typecheck lint build`, then runs the four `tools/` commands and `bash tools/drift-checks.sh`. The two examples still lead with the three recipes. `SPEC/procedures/ft-task.md` says "its justfile recipes" and points at the contract; it does not name the incomplete trio. `docs/HARNESS-SURVEY.md`'s `just test/lint/typecheck` is a capability-probe remark, not this example. PLAN line matches.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

No clarifications needed (--fast). Assumptions: (1) the examples to edit are the two sites that name `just test` / `just lint` / `just typecheck` as the unattended full set; (2) when `check` exists the runner runs `just check` alone, because that recipe already depends on the viz recipes and then the tools and drift commands; (3) a justfile with no `check` recipe keeps the three-recipe fallback, then `AGENTS.md` / `CLAUDE.md`, then CI; (4) the procedure SOP stays a pointer and is not a third copy of the example list.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the two existing full-validation sentences and the procedure's Phase 3 sentence. No new section. `just check` is first when the justfile defines that recipe; `just test` / `just lint` / `just typecheck` are the fallback, each only when the justfile defines it. Tests: N/A — the change is contract prose; the Acceptance commands decide it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`--unattended` full validation set is `just check`.

```text
python3 order check (just check before just test, three files) → 0
python3 else-branch check (for each of those the justfile defines) → 0
just --show check | grep build dependency, tools test, drift-checks.sh
  && just --show build | grep npm --prefix viz run build → 0
test gate-postures bytes -le 22000 → 0 (20162)
test procedures bytes -le 34200 → 0 (34189)
just check → 0
```

`just check` tail: viz 624 tests passed, `tsc --noEmit` and eslint clean, vite build succeeded, update-adopters 77 tests passed, both `node --check` silent, drift-checks.test 21 passed, `bash tools/drift-checks.sh` every check `ok`.

Structural: the three sentences name the same discovery order. No dead code. `SPEC/procedures/ft-task.md` is 34,189 of 34,200.

External review, first pass: blocker — the fallback grep did not require the `else` or `just typecheck` on `gate-postures.md`. Fixed the verify command and aligned the three sentences, then re-ran Phase 3. Second pass: no blockers. Notes, all fixed before this receipt: the procedure now names `AGENTS.md` or `CLAUDE.md`; the fallback says `for each of those the justfile defines`; the procedure budget is its own Acceptance command. `just check` above is the run after those fixes. A remaining note — any recipe named `check` still replaces the rest of discovery — is filed as CORE-832.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Named `just check` first in the three `--unattended` full-validation examples (`SPEC/gate-postures.md`, `claude/skills/ft-task/unattended-mode.md`, `SPEC/procedures/ft-task.md`), with `just test` / `just lint` / `just typecheck` only as the fallback for recipes the justfile actually defines. `just check` exited 0. No refactor. Doc-drift: no change to README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, codex/AGENTS-snippet.md, cursor/AGENTS-snippet.md, grok/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — none of them name the three-recipe list. Learnings: N/A. `touches:` declared those three paths.

unattended-candidates: none

**Archived:** 2026-10-26
