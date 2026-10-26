---
title: check-cmd-drift
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-828, CORE-826]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - justfile
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/SKILL.md
  - docs/CONVENTIONS.md
---

# CORE-830 | check-cmd-drift

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-828]] · [[CORE-826]]

## 🎯 Goal

Add a drift check (`pair_t`) that fails when the justfile `check` recipe, with its dependency recipes expanded, stops equal to the eight AGENTS.md §"Validation" commands plus `bash tools/drift-checks.sh`.

## ✅ Acceptance

- [x] `pair_t` passes on the live tree — `bash tools/drift-checks.sh pair_t`
- [x] `pair_t` has a seeded-drift case and the self-test's one-case-per-check and VACUOUS-floor tests still pass — `node --test tools/drift-checks.test.mjs`
- [x] The full drift run passes, including `context_budget` and `pair_q` over the edited fragments — `bash tools/drift-checks.sh`
- [x] Pair T is catalogued where Pairs B–S are, and the "eleven pairs" / "A–S" counts say twelve / A–T — `grep -q 'Pair T' claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] `just check` still exits 0 — `just check`

## 🧩 Subtasks

- [x] Add `pair_t` after `pair_s` in `tools/drift-checks.sh`: extract the roster from AGENTS.md as `pair_h` does, append the `bash tools/drift-checks.sh` literal, expand the justfile `check` recipe (dependencies first, then its own lines), `diff -u`; floor on an empty side
- [x] Add a `pair_t` seeded-drift case to `tools/drift-checks.test.mjs`
- [x] Add the Pair T catalogue entry and bump the counts in `step-7.1-mirror-pairs.md`, `ft-release/SKILL.md`, `docs/CONVENTIONS.md`
- [x] Add one line to the justfile header naming the pair, where an editor of `check` will see it

## 🔗 Related

- [[CORE-828]] — predecessor: added the `check` recipe; its review filed this
- [[CORE-826]] — related-decision: the most recent pair added (`pair_s`), the shape this follows
- [[CORE-831]] — sibling follow-up from the same review (unattended examples), not touched here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line is open and the gap is real: the justfile `check` recipe carries the four `tools/` lines and the drift-checks line as a second copy that no pair compares to AGENTS.md §"Validation". Pair H binds AGENTS.md to `ci.yml` only.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Read set was narrow: `justfile`, AGENTS.md §"Validation", `tools/drift-checks.sh` (`pair_h`, `pair_s`, dispatcher), `tools/drift-checks.test.mjs`, the Pair H / R / S catalogue entries, and the CORE-826 commit's file list. No probe.

Best practices: `pair_h` already extracts the roster from AGENTS.md (`awk` between `## Validation` and `## Dev Server`, `grep -E '^(npm --prefix viz |node --)'`). `pair_t` reuses that extraction rather than a second parse, so the roster has one reading. The justfile side differs: `check` lists the four viz commands as dependency recipes (`test typecheck lint build`), so the check must expand dependencies to their one-line bodies before comparing. A small `awk` over the justfile does it without needing `just` on the CI runner. Recipe parameters and `@` prefixes are not handled: none exist, and the floor would surface a reshaped recipe as a finding.

Archive skim: area is `archive/core/` per the README table. Load-bearing: CORE-828 (added `check`; its external review filed this task and states the exact gap) and CORE-826 (the last pair; its commit lists the files a new pair touches: `drift-checks.sh`, the test, the §7.1 catalogue, `ft-release/SKILL.md`, `docs/CONVENTIONS.md`). No `supersedes:`, no ⚠️ pointer.

Drift check: the PLAN line matches. AGENTS.md §"Validation" has eight fenced commands plus the prose `bash tools/drift-checks.sh`; the justfile `check` recipe matches that list in order. Pair letters in use are B, C, H, J, M, N, O, P, Q, R, S, so the new pair is `pair_t` / Pair T. CORE-826's closure also touched AGENTS.md and `claude/AGENTS-snippet.md`, but only because `pair_s` binds those two files; `pair_t` needs neither.

No clarifications needed. Assumptions: (1) a new pair, not an extension of `pair_h`, because `pair_h` is catalogued as AGENTS.md ↔ `ci.yml` and the two bindings fail for different reasons; (2) `bash tools/drift-checks.sh` is a literal in the check, since AGENTS.md carries it only as prose; (3) no `just` dependency in the check, since the CI `drift` job's runner is checkout-only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the pair shape: `pair_t` sits after `pair_s`, reads the roster with `pair_h`'s own `awk | grep`, and expands the justfile `check` recipe with one `awk` (dependencies in listed order, then the recipe's own lines). Floors as `VACUOUS pair_t` rather than joining `pair_h`'s exemption list, so the self-test's floor rule needed no edit. Seeded case drops one `tools/` line from the recipe. Catalogue entry, counts (eleven → twelve, A–S → A–T, Q/R/S list + T) and a one-line justfile header note follow CORE-826's file list; AGENTS.md and the adopter snippet are untouched because `pair_t` does not read the snippet. No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted: `node --test tools/drift-checks.test.mjs` (21 pass, including the new `pair_t` case, the one-case-per-check test, and the VACUOUS-floor test). Lint/type-check: N/A — shell and a test file with no linter in the repo; the self-test and `just check` exercise them.

Verification receipt:

```text
bash tools/drift-checks.sh pair_t                  → 0
node --test tools/drift-checks.test.mjs            → 0 (21 pass)
bash tools/drift-checks.sh                         → 0 (every check ok)
grep -q 'Pair T' step-7.1-mirror-pairs.md          → 0
just check                                         → 0
```

Re-run after the review fixes: `pair_t` / `pair_q` / `context_budget` / `final_newline` ok, self-test 21 pass; the full drift run repeats after the archive move below.

External review (`/code-review medium`, forked read-only): no blockers. Dispositions:

- **Note, fixed** — `docs/CONVENTIONS.md` "those fourteen functions" went stale (11 pairs + invariant + 2 standing = 14, now 15). Changed to fifteen.
- **Note, fixed** — `pair_t`'s comment claimed the two roster reads "never disagree"; nothing enforces that, since it is a copy of `pair_h`'s line. Comment now says it is a copy (widen one, widen the other).
- **Note, fixed** — an indented `#` line inside a recipe body would read as a command and raise a false `CHECK DRIFT`. The awk now skips them. (The reviewer's `v := x` header case does not occur: the header regex needs the colon directly after the name.)
- **Note, skipped** — an undefined or parenthesized dependency expands to nothing. The expanded recipe then lacks those lines, so the diff against the roster still fails unless the roster lost them too, which is Pair H's and AGENTS.md's business.
- **Note, skipped** — only one seeded drift per check. The cases table is one-per-check by design; the dependency-drop path was probed by hand (below).
- **Note, skipped** — `just` runs a repeated dependency once while the awk prints it twice. No repeat exists, and a one-off diff would surface it.

Extra probe (not an Acceptance row): dropping `lint` from `check`'s dependency list makes `pair_t` print `CHECK DRIFT` with `-npm --prefix viz run lint`; justfile restored afterward.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Added `pair_t`, the twelfth drift pair: it fails when the justfile `check` recipe, dependencies expanded, stops equal to the eight AGENTS.md §"Validation" commands plus `bash tools/drift-checks.sh`. Seeded-drift case, Pair T catalogue entry, counts (`step-7.1-mirror-pairs.md`, `ft-release/SKILL.md`, `docs/CONVENTIONS.md`), and a one-line justfile header pointer. Receipt above; full drift run and `just check` exit 0. Review notes: three fixed, three skipped with reasons.

Doc-drift: docs/CONVENTIONS.md updated (pair list, function count); no change to README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippet files, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md — none names the pair list or the check count.

`touches:` reconciliation: declared six paths; `git diff --name-only` is exactly those six. This note and the PLAN stub are the closure's own files.

Learnings: N/A.

**Archived:** 2026-10-26
