---
title: narrow-just-check
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-831]
touches:
  - SPEC/gate-postures.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/procedures/ft-task.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-832 | narrow-just-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-831]]

## 🎯 Goal

Make the `--unattended` full validation set run `just check` plus each of `just test` / `just lint` / `just typecheck` the justfile defines that `check` does not already run, so a narrow `check` cannot drop a recipe the repo declares.

## ✅ Acceptance

- [x] All three sites gate the justfile tier on any of the four recipes, then name `just check` if defined, then the gap rule read off `just --show check` — `(for f in SPEC/gate-postures.md claude/skills/ft-task/unattended-mode.md SPEC/procedures/ft-task.md; do tr '\n' ' ' < $f | tr -s ' ' | grep -qE 'any of .check. / .test. / .lint. / .typecheck., .just check. if defined plus each other one it defines that .check. does not reach \(.just --show check.' || exit 1; done)`
- [x] The no-`check` case still runs each trio recipe the justfile defines, then `AGENTS.md`/`CLAUDE.md`, then CI — `judgment`: ordering prose, read in Phase 3 against all three sites
- [x] `SPEC/gate-postures.md` stays inside its 22,000-char budget — `test "$(wc -c < SPEC/gate-postures.md)" -le 22000`
- [x] `SPEC/procedures/ft-task.md` stays inside its 34,200-char budget — `test "$(wc -c < SPEC/procedures/ft-task.md)" -le 34200`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the full-validation sentence in `SPEC/gate-postures.md` §"What `--unattended` never relaxes" (check + gaps, one-line reason)
- [x] Mirror it in `claude/skills/ft-task/unattended-mode.md` same section
- [x] Shrink `SPEC/procedures/ft-task.md` Phase 3 sentence to the new rule within its 11 spare chars
- [x] Run Acceptance commands + `just check`

## 🔗 Related

- [[CORE-831]] — predecessor; named `just check` first and filed this row from its review

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The live rule takes any `check` recipe as the whole justfile set. adppro's `check` runs `just lint`, a scripts lint, and `just test`, but not its own `typecheck` (or `build`), so an unattended adppro run would skip typecheck today.

- [x] Read relevant source files — `SPEC/gate-postures.md` §"What `--unattended` never relaxes", `claude/skills/ft-task/unattended-mode.md` same section, `SPEC/procedures/ft-task.md` Phase 3, flaitron `justfile`, every `~/Code/*/justfile` `check` recipe

- [x] **Best Practices Review** — N/A for module boundaries. Contract + executable mirror edited in place; the procedure stays a short pointer, not a third full copy.

- [x] **Archive skim** — `archive/core/` confirmed against the README row. Load-bearing: CORE-831 (this row's parent; procedure budget left at 34,189/34,200) and CORE-828 (added `check`, Pair T binds it to `AGENTS.md` §Validation). Other `justfile` hits (CORE-637 etc.) predate `check`. No `supersedes:` or ⚠️ pointer.

- [x] **Drift check** — the three sites read exactly as CORE-831 left them; PLAN line matches. Fleet: only flaitron and adppro define `check`; flaitron's covers all three recipes, adppro's misses `typecheck`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Operator chose "Check plus gaps" over "fall through when narrow" and "keep as is". Assumptions: (1) the addition covers only the existing trio, not `build` — the fallback list never named `build`, and widening it is a separate decision; (2) "already runs" is read off `just --show check` (its dependencies and `just <x>` lines), no parser; (3) no `check` recipe → each trio recipe the justfile defines, unchanged; (4) the procedure sentence shrinks to fit its 11 spare chars rather than raise the budget.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the same three sentences CORE-831 wrote; no new section. `SPEC/gate-postures.md` names the rule and one reason sentence (a narrow `check` is narrower than the repo's own set). `unattended-mode.md` mirrors the rule. `SPEC/procedures/ft-task.md` compressed its sentence to fit (34,189 → 34,164). Tests: N/A — contract prose; Acceptance commands decide it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run):

```text
for-loop grep (any of check/test/lint/typecheck → just check if defined → does not reach (just --show check), three files) → 0
test gate-postures bytes -le 22000 → 0 (20596)
test procedures bytes -le 34200 → 0 (34192)
bash tools/drift-checks.sh → 0
just check → 0 (viz 624 tests, tsc, eslint, vite build, update-adopters suite, node --check ×2, drift-checks.test, drift-checks all ok)
```

Criterion 2 (judgment): all three sites put the four-recipe condition first, so with no `check` nothing is reached and every trio recipe the justfile defines runs; the else falls to `AGENTS.md`/`CLAUDE.md`, then CI. `gate-postures.md` now says so outright.

Structural: three sites, one rule; no dead text. The procedure is a compressed pointer at the contract.

External review, first pass (8 findings). Blockers: the no-`check` grammar in `unattended-mode.md` hung the trio off `check` existing; the procedure dropped the `check` condition; a `;`-before-`else` misparse in `gate-postures.md`. Fixed by leading all three with "when the justfile defines any of `check` / `test` / `lint` / `typecheck`", then re-ran Phase 3 (the verify command was rewritten to follow the new wording and avoid backticks). Notes fixed: `just --show` doesn't follow dependencies (contract now says "followed through its dependencies"); the reason sentence implied `build`; the three wordings are now aligned. Notes declined: altitude (fix adppro's `check` instead) — the operator chose check-plus-gaps; budget headroom — recorded here.

Second pass: no blockers. Note fixed: defined "reach" (dependency at any depth or `just <name>` in a body; a raw command doesn't count) and stated the no-`check` case outright in the contract. Notes recorded, not fixed: the procedure omits "followed through its dependencies" — it points at the contract, and adding the clause would break its budget; the procedure sits at 34,192 of 34,200, so the next substantive edit there must trim first.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Unattended full validation now runs `just check` plus each defined `just test` / `just lint` / `just typecheck` that `check` does not reach (as a dependency at any depth or a `just <name>` line). With no `check`, every defined trio recipe runs, then `AGENTS.md`/`CLAUDE.md`, then CI. Edited `SPEC/gate-postures.md` (contract + reason + definition of reach), `claude/skills/ft-task/unattended-mode.md` (mirror), and `SPEC/procedures/ft-task.md` (compressed pointer, 34,189 → 34,192). `just check` exits 0. No refactor. Doc-drift: no change to README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md, docs/GATE-DISCIPLINE.md — they say only "full validation set" and point at the contract. `touches:` reconciliation: diff = the three declared paths plus PLAN/archive. Maintainability: adppro's `check` (which skips `typecheck`) no longer narrows an unattended run. Learnings: N/A.

unattended-candidates: none

**Archived:** 2026-10-26
