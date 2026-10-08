---
title: pair-q-wrapped-citations
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-749 | pair-q-wrapped-citations

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 none

## 🎯 Goal

Make `pair_q` check path-bearing `§"Title"` citations whose quoted title wraps onto the next line, pin it with a seeded self-test case, and note the shape in the Pair Q catalogue entry.

## ✅ Acceptance

- [x] `pair_q` examines wrapped-title citations and still passes on the live tree — `bash tools/drift-checks.sh pair_q`
- [x] The self-test seeds a stale wrapped citation and the check fails on it — `node --test tools/drift-checks.test.mjs`
- [x] The seeded wrapped case is a real regression guard — it fails against the pre-change `drift-checks.sh` (negative control, `git stash` the script)
- [x] The Pair Q catalogue entry names the wrapped-title shape — `grep -q 'CORE-749' claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] All drift checks and context budgets stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Join wrapped `§"` titles per file in `pair_q` before the three extraction greps
- [x] Seed a wrapped stale citation in `drift-checks.test.mjs` (`finding` accepts a list)
- [x] Note the shape in the Pair Q catalogue entry and the in-function comment
- [x] Run the Acceptance commands

## 🔗 Related

- Surfaced by audit-docs 2026-10-08 (Finding #12, Low).
- [[CORE-622.3]] — landed Pair Q; [[CORE-651.2]] — its out-of-repo skip.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Reproduces on HEAD: `pair_q` extracts with line-local `grep -oE`, so a `§"Title` whose closing quote is on the next line matches none of the three shapes. A survey of live markdown found 37 such sites (the row says 39 in 28 files; the count differs by how a site is delimited), every one wrapping by exactly one line, with indent or a `>` blockquote marker on the continuation.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Best practices: one shell function gains a small pre-pass; no module-boundary change. The pre-pass stays inside `pair_q` rather than a shared helper — no other pair needs it, and Pairs N and O already defer citation resolution to Q.
- Archive skim: 20+ hits for Pair Q in `archive/core/` (CORE-622.3 landed it, CORE-651.2 added the out-of-repo skip, CORE-631.2 moved the shell). None decided anything about wrapped titles; the catalogue entry's "line-local grep" remark concerns *bare-section* citations and stays true.
- Drift check: the PLAN row's "39 sites in 28 files" vs 37 found by an independent regex — immaterial; the fix is shape-based. All wrapped citations resolve today, so the fix lands green with no citer edits.
- Design: awk folds a line ending in an unclosed `§"` with the next one or two lines (leading whitespace and `>` stripped, single space between) and keeps the fold only if it closes the quote, so a stray `§"` cannot swallow prose. A path wrapped away from its `§` is out of scope (none in the live set) and is said so in the comment.
- Test harness: `drift-checks.test.mjs` enforces exactly one case per check, so the wrapped seed joins the existing `pair_q` case and `finding` now accepts a regex or a list of them.
- Clarifications: No clarifications needed (--fast). Assumptions: scope is the three files the row names (script, self-test, catalogue entry); `docs/CONVENTIONS.md`'s description of the check stays accurate without edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/drift-checks.sh` `pair_q`: per-file `joined=$(awk …)`, and the three extraction greps read `printf '%s\n' "$joined"` instead of `"$f"`; header bullet records the fold rule and the out-of-scope split-path case. Awk (already used by `pair_p`) over perl to keep the script's dependency set unchanged.
- `tools/drift-checks.test.mjs`: `pair_q` seed adds a blockquoted, indented wrapped stale citation beside the single-line one; the runner asserts every regex in `[finding].flat()`.
- `step-7.1-mirror-pairs.md`: one sentence after "The path-bearing shape is the contract…".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh pair_q` → 0 (`pair_q ok`)
- `node --test tools/drift-checks.test.mjs` → 0 (19 pass, 0 fail)
- Negative control: `git stash push tools/drift-checks.sh` then `node --test --test-name-pattern=pair_q tools/drift-checks.test.mjs` → fails on the missing `STALE SECTION … §"Zz Wrapped Nowhere"` finding; stash popped, diff intact.
- `node --check tools/drift-checks.test.mjs` → 0
- `grep -q 'CORE-749' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0
- `bash tools/drift-checks.sh` → 0 (every check `ok`, context budgets included)
- Lint/type-check: N/A beyond `node --check` (shell + one test-file edit; the repo has no linter for either).
- 👁️ CONFIRM: N/A (no rendered surface).
- Re-run after review fixes: `node --test tools/drift-checks.test.mjs` → 0 (19 pass); `bash tools/drift-checks.sh` → 0; negative control against the pre-change script → pair_q case fails (1 fail).
- External review (`/code-review medium`, 7 findings): (1) **blocker, fixed** — the fold consumed continuation lines, so a citation after the closing quote went unread; the awk now appends only up to the first `"` and leaves the remainder as its own line (read once). (2) stray `§"` at line end can pair with an unrelated later quote — **note, accepted**: yields a loud false STALE SECTION cured by the placeholder shape, now stated in the in-function comment. (3) list markers / table pipes on a continuation not stripped — **note, no change**: no live case (the marker sits on the first line; table cells do not wrap) and the Discovery survey found only indent and `>`. (4) one awk fork per file — **note, no change**: ~130 forks, milliseconds on a per-push gate. (5) test covered only the happy path — **fixed**: the seed's continuation line now carries a second stale citation (`Zz Tail Nowhere`). (6)/(7) comment and catalogue omitted the two-line span and first-quote close — **fixed** in both.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`pair_q` now joins a `§"Title` that wraps across lines (up to two further lines, `>`/indent stripped, first `"` closes) before extracting, so the 37 live wrapped citations are checked — all resolve, no citer edits. The self-test's `pair_q` case seeds a blockquoted wrapped stale citation with a second stale citation on the continuation line and fails against the pre-change script; the Pair Q catalogue entry names the shape. Doc-drift sweep: no change (`docs/CONVENTIONS.md` describes the check at a level the fix does not touch; the other AI-referenced docs do not mention citation extraction). `touches:` reconciliation: declared 3 files, changed 3, none undeclared. Learnings: N/A. External review's one blocker was fixed in Phase 2 and Phase 3 re-run.

**Archived:** 2026-10-08
