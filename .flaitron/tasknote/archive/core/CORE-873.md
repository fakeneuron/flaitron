---
title: unchecked-stub-row-check
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-869.3]
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

# CORE-873 | unchecked-stub-row-check

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-869.3]]

## 🎯 Goal

Make `tools/drift-checks.sh` fail a bold-ID PLAN row that ends in the `Completed YYYY-MM-DD.` stub tail but is still `- [ ]`, with a self-test seed.

## ✅ Acceptance

- [x] `pair_r` (or a sibling) prints a finding and exits 1 on an unchecked `- [ ] **ID** … Completed YYYY-MM-DD.` row — `node --test tools/drift-checks.test.mjs`
- [x] Self-test seeds an unchecked stub row and asserts that finding — `node --test tools/drift-checks.test.mjs`
- [x] Live repo stays clean under the new check — `bash tools/drift-checks.sh pair_r`

## 🧩 Subtasks

- [x] Add the unchecked-stub pass to `pair_r` and update its header comment
- [x] Extend the `pair_r` case in `tools/drift-checks.test.mjs` with an unchecked-row seed + finding
- [x] Run the self-test and the live check

## 🔗 Related

- [[CORE-869.3]] — its closure wrote the unchecked stub row that motivated this

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `pair_r` greps only `- [x]` stub rows; a `- [ ]` row with the stub tail is invisible to it. Live baseline is clean (`pair_r ok`), so the gap is real and the fix is local.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Extend `pair_r` rather than add a sibling: the dispatcher/self-test enforce one case per check, `pair_r` already owns the stub-tail regex, and the header's rationale (stub rows well-formed) covers it. Add a second grep per file for `^[[:space:]]*- \[ \] \*\*[^*]+\*\*.*Completed YYYY-MM-DD\.$` printing `UNCHECKED STUB  <file> :: <line>`; the VACUOUS floor and `n` counting stay on checked rows.
- Self-test: `pair_r` case seeds both drifts (existing checked no-pipe row in PLAN-ARCHIVE + an unchecked stub row in PLAN.md); `finding` becomes an array.
- Also update the `pair_r` catalogue entry in `claude/skills/ft-release/step-7.1-mirror-pairs.md` (line 117) to name `UNCHECKED STUB`; add to `touches:`.
- Archive skim: pair_r hits (CORE-734.2/739.2/742.2/771/778.5/803/815.N/826/856/861) are about harness shape, not this regex; nothing load-bearing beyond the "one case per check" and "VACUOUS floor" tests above.
- No clarifications needed: assumptions — extend `pair_r` (not a new check); unchecked rows under epic nesting (indented) also match; no carve-out needed because `fixed inline.` rows never carry the stub tail.



## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended `pair_r` in place (same file loop, same `echo FINDING / bad=1` shape) instead of a sibling; kept the `n` floor on checked rows so the VACUOUS contract is unchanged.
- Added an `UNCHECKED STUB` pass using the checked regex with `\[ \]`; `|| true` keeps `set -e`/pipefail callers quiet when no row matches.
- Self-test: `pair_r` seed now writes a checked no-pipe row in PLAN-ARCHIVE and a nested unchecked stub row in PLAN.md; `finding` is an array asserting both lines.
- §7.1 catalogue entry for Pair R names `UNCHECKED STUB` and its fix (tick the box).


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI change; Acceptance is machine-decided

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/drift-checks.test.mjs` → exit 0 (40 pass, 0 fail; `pair_r fails on its seeded drift` green with both findings).
- `bash tools/drift-checks.sh pair_r` → exit 0 (`pair_r ok`, live repo clean).
- `bash tools/drift-checks.sh` → exit 0 (full run, no FAILED/VACUOUS/OVER lines).
- Lint: `shellcheck tools/drift-checks.sh` — one pre-existing SC2016 info at line 103 (untouched code); nothing from the new lines.
- External review (`/code-review medium`, own diff only), six notes:
  - Fixed: unchecked seed now pipe-less (proves the pass is independent of the shortname check); dropped the redundant `|| true`.
  - No change, by design: VACUOUS floor stays on checked rows (the unchecked pass prints before it, so findings are never hidden; the floor guards against an unreadable PLAN); the regex needs a bold ID and the exact stub tail, so a false positive needs an open row that ends in `Completed YYYY-MM-DD.` — none exist and the fix text says tick the box only for a closure stub; Pair R heading/AGENTS.md wording ("checked PLAN stub rows") stays accurate for the shortname half and the Check paragraph names `UNCHECKED STUB`.
  - Out of scope: trailing-whitespace/CRLF evasion of the `$` anchor is shared with the pre-existing pass and with `viz` grammar; not widened here.



## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`pair_r` now also fails on a bold-ID PLAN row that carries the `Completed YYYY-MM-DD.` stub tail while still `- [ ]` (`UNCHECKED STUB`), the gap CORE-869.3's closure slipped through. Files: `tools/drift-checks.sh` (+12 lines incl. rationale comment), `tools/drift-checks.test.mjs` (seed now plants both a pipe-less checked row and a pipe-less unchecked nested row), `step-7.1-mirror-pairs.md` Pair R Check paragraph. Verification: self-test 40/40, live `pair_r ok`, full drift run exit 0. Doc-drift sweep: no change across the AI-referenced docs (AGENTS.md's "Pair R … checked stub rows … shortname" remains true). `touches:` matched the diff exactly. Learnings: N/A.

**Archived:** 2026-11-06
