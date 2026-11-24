---
title: drift-flag-helper
status: completed
tags: [tooling, drift-checks]
created: 2026-11-24
due:
related-tasks: []
touches:
  - tools/drift-checks.sh
---

# CORE-923 | drift-flag-helper

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Extract a `_description_flags` helper in `tools/drift-checks.sh` for the documented-flag pipeline that `pair_b`, `pair_j` and `pair_m` each copy, and sanction `_`-prefixed helpers in the header shape rules.

## ✅ Acceptance

- [x] `_description_flags` is defined once and the three checks call it (pair_b twice, J and M once — 4 call sites); the quote-strip sed appears only in the helper — `[ "$(grep -cF 's/"[^"]*"//g' tools/drift-checks.sh)" = 1 ] && [ "$(grep -c '_description_flags "' tools/drift-checks.sh)" = 4 ]`
- [x] The header shape rules sanction `_`-prefixed helpers (not run as checks) — `grep -q '_`-prefixed' tools/drift-checks.sh`
- [x] Behavior preserved: the three checks pass on the live tree and fail on their seeded drift — `bash tools/drift-checks.sh pair_b pair_j pair_m` and `node --test tools/drift-checks.test.mjs`
- [x] The dispatcher does not run the helper as a check — `bash tools/drift-checks.sh | grep -c _description_flags` prints 0
- [x] Full validation set green — `just check`

## 🧩 Subtasks

- [x] Add `_description_flags` (with a `#` title line and the moved load-bearing quote-strip rationale) above `pair_b`
- [x] Route `pair_b`, `pair_j`, `pair_m` through it; reword their "pipeline verbatim" comments to point at the helper
- [x] Add the `_`-prefix helper rule to the header shape rules
- [x] Run the pair checks, drift-check self-test, and `just check`

## 🔗 Related

- Surfaced by audit-structure 2026-11-24 (Finding #3, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The copy is live — `pair_b` (two lines), `pair_j` (inside its own/span union) and `pair_m` each spell `grep -m1 '^description:' | sed -E 's/"[^"]*"//g' | grep -oE '--…'`, and their comments ask that a change land "in B, J and M together". The dispatcher's `fns=` regex (`^[a-z][a-z0-9_]*() {$`) and the self-test's coverage regexes already skip `_`-prefixed names.

- [x] Read relevant source files — `tools/drift-checks.sh` header (shape rules), `pair_b`/`pair_j`/`pair_m`, dispatcher; `tools/drift-checks.test.mjs` coverage + floor tests.

- [x] **Best Practices Review** — removes a three-way duplication whose comments already demand lockstep edits; the helper owns the one rule (what counts as a *documented* flag). Pair J keeps its span half local: union-then-extract equals extract-each-then-union, so routing only its description half through the helper preserves behavior.

- [x] **Archive skim** — `archive/core/` (area confirmed against README table: `CORE-*` → `archive/core/`); hits on pair_b/j/m (CORE-734.5, 744, 769.2, 778.2, 790, 838, 879) are verification receipts and hint moves, nothing load-bearing for the extraction. CORE-420.5's quote-strip rationale is quoted in pair_b's comment and moves with the pipeline.

- [x] **Drift check** — cited checks and dispatcher match the PLAN line; "the dispatcher already skips them" verified (`fns=` and both test regexes start `[a-z]`).

- [x] No clarifications needed (--fast). Assumptions: the helper prints the sorted, unique flag list one per line and callers join with `tr`; it lives in the same file (checks run via `bash -e "$self" --run fn`, which defines every function first); no test change needed since no check is added or removed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Size estimate: ~30 lines (rename-aware).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no shared helper existed in the file; a `_`-prefixed top-level function is the smallest shape the dispatcher (`fns=`) and self-test regexes already ignore, and checks run via `bash -e "$self" --run fn`, which defines it first. Justified new shape, sanctioned in the header rules.

- [x] **Minimal refactor gate** — only the three description-flag pipelines and their "verbatim" comments changed; pair_m's argument-hint extraction (same regex, different source line) left alone as out of scope.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: behavior-preserving extraction, no check added or removed; existing seeded cases for pair_b/j/m cover it, plus an old-vs-new equivalence run (below)

**Implementation Notes:**

- `_description_flags <file>` prints the sorted, unique `--flag` list from the file's `description:` line (quote-strip kept, CORE-420.5 rationale moved onto it). B and M join it with `tr`; J unions it with its own-slug span flags (span half extracts flags itself, then one `sort -u`). Union-then-extract equals extract-each-then-union, so J is unchanged.
- Header shape rule: "A function here that is not a check would run as one, unless its name is `_`-prefixed" — names the dispatcher's `fns=` pattern and the self-test coverage regex as the skippers.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `shellcheck tools/drift-checks.sh`: 11 findings, identical count to HEAD (all pre-existing info/warning; not a CI gate)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (shell script only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (full validation set, `--unattended`):

- Acceptance 1: `[ "$(grep -cF 's/"[^"]*"//g' tools/drift-checks.sh)" = 1 ] && [ "$(grep -c '_description_flags "' tools/drift-checks.sh)" = 4 ]` → 0
- Acceptance 2: `grep -q '_`-prefixed' tools/drift-checks.sh` → 0
- Acceptance 3: `bash tools/drift-checks.sh pair_b pair_j pair_m` → 0; `node --test tools/drift-checks.test.mjs` → 0 (46 pass, 0 fail)
- Acceptance 4: `bash tools/drift-checks.sh | grep -c _description_flags` → prints 0; `bash tools/drift-checks.sh '_*'` → 2 (`no check matches: _*`)
- Acceptance 5: `just check` → 0 (viz test/typecheck/lint/build, update-adopters suite + `node --check` ×2, drift-checks self-test, every drift check ok)
- Equivalence: old vs new pipelines (J's `own`, B/M's description set) over every `claude/skills/ft-*/SKILL.md` and `codex/skills/ft-*/SKILL.md` → `diffs=0`
- Scope guardrails at Phase 3 entry: paths = `tools/drift-checks.sh` + this note; size 51 lines (30+/21−) against 400 → clear.
- Duplication/dead code/stale docs: no remaining "pipeline verbatim" / "B, J and M together" outside archived notes.

External review (`/code-review medium`, this task's working-tree diff only): no correctness findings; confirmed equivalence, dispatcher skip, and definition order. One **note** — Acceptance 1's original grep used BRE-escaped brackets (counted 0) and expected 3 call sites instead of 4 → fixed in the criterion above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every AI-referenced doc: no change. None restates the drift-checks shape rules or the B/J/M pipeline (the header says SPEC/layout.md and step-7.1 docs point at the script, not copy it); `grep` for "pipeline verbatim" / "B, J and M together" outside the archive finds nothing.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; the `_`-prefix rule lives in the script header, where every editor of a check reads it.

**Final Summary:**

The documented-flag pipeline that Pairs B, J and M each copied now lives once, in `_description_flags`, and the header shape rules sanction `_`-prefixed helpers.

- Changed: `tools/drift-checks.sh` (+30/−21) — new helper, three call sites, three comment rewrites, one header rule.
- Verification: `just check` → 0; drift self-test 46/46; old-vs-new equivalence over every skill file → no diffs.
- Refactors: only the extraction itself.
- Docs: no change (sweep above).
- `touches:` reconciliation: `git diff --name-only` = `tools/drift-checks.sh` (+ workflow paths) — matches declared.
- Maintainability: a change to what counts as a documented flag is now one edit, not three kept in lockstep by comments.

**Archived:** 2026-11-24
