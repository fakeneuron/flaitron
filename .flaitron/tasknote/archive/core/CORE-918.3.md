---
title: plan-placeholder-check
status: completed
tags: [drift-checks, plan]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-918, CORE-918.2, CORE-918.4]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - .flaitron/PLAN.md
---

# CORE-918.3 | plan-placeholder-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-918]]

## 🎯 Goal

A new `tools/drift-checks.sh` check fails when a priority section of the live `.flaitron/PLAN.md` holds neither a task row nor `(none)`, seeded in `tools/drift-checks.test.mjs`, and the live PLAN.md is fixed in the same change so the check lands green.

## ✅ Acceptance

- [x] `plan_placeholder` check exists in `tools/drift-checks.sh` and passes on the live repo — `bash tools/drift-checks.sh plan_placeholder`
- [x] Its seeded case fails with its own finding lines and a `(none)` section stays silent — `node --test tools/drift-checks.test.mjs`
- [x] Live `## Future Opportunities` carries `(none)` and `## Completed` has no blank line between rows — `bash tools/drift-checks.sh plan_placeholder` plus `awk '/^## Completed/{c=1;next} c&&/^$/{b++} END{exit b>1}' .flaitron/PLAN.md` (the one blank right after the heading is allowed)
- [x] Every other drift check still passes — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add `plan_placeholder()` after `sidequest_orphan` in `tools/drift-checks.sh`, with a `VACUOUS` floor; name it in the header's "neither a source rule nor a catalogue entry" list
- [x] Add its seeded case to `CASES` in `tools/drift-checks.test.mjs`
- [x] Restore `(none)` under `## Future Opportunities` and drop the stray blank line inside `## Completed` in `.flaitron/PLAN.md`
- [x] Run the check, the self-test, and the full validation set

## 🔗 Related

- [[CORE-EPIC-918]] — parent epic (closure-placeholder)
- [[CORE-918.2]] — predecessor: put the `(none)` clause on the Phase 4 Closed line
- [[CORE-918.4]] — sibling: same clause in the Codex procedure

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `## Future Opportunities` is still blank today (line 41-42) and `## Completed` still has a stray blank between CORE-894 and CORE-892, so the drift the row names is live; no check covers it.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — one check per top-level function per the header's shape rules; mirror `sidequest_orphan` (also reads PLAN.md) and floor with `VACUOUS plan_placeholder` on one line so the test's floor regex sees it.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Area `CORE-*` → `archive/core/` (README table). Archive skim: CORE-918.2 (Closed-line clause; notes Pair Q resolves cited headings), CORE-866 (`handoff_rows`, a PLAN-reading check with a whole-output seeded case), CORE-742.2 (`sidequest_orphan`). No `.1` tasknote for this epic (Discovery supplied by audit-repo), so no Fan-out claim to echo.
- Rule source: `SPEC/plan-filing.md` §"Empty-section placeholder" — the five sections are `## High`, `## Medium`, `## Low`, `## Future Opportunities`, `## Completed`. Task-row pattern from §"Filing commits": `^[[:space:]]*- \[[ x]\] \*\*[A-Z]+-(EPIC-)?[0-9]+(\.[0-9N]+)?\*\*` (no `{n}` interval, mawk-safe).
- Test harness: `has exactly one case per check` and `floors every check` mean a new function needs a `CASES` entry and a one-line `VACUOUS plan_placeholder … exit 1`.
- No clarifications needed (--unattended). Assumptions: a heading that is absent is not a finding (the floor catches a reshape that hides all five); a section body is everything up to the next `## ` heading; the check reads only the live `.flaitron/PLAN.md`, not `PLAN-ARCHIVE.md` (its month headings are not priority sections).
- Size estimate: ~60 lines (rename-aware)
- Phase 1 verdict Proceed → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended the existing one-function-per-check shape; `sidequest_orphan` is the nearest neighbour (reads the live PLAN, `MISSING FILE` guard), and the new check sits right after it. One awk pass, uncaptured, so an awk error or a finding both fail the `bash -e` check; the `VACUOUS plan_placeholder … exit 1` floor sits on one line so the self-test's floor regex sees it. No refactor.
`plan_placeholder` reports `EMPTY SECTION` (no row, no `(none)`), and after the External review also `STALE PLACEHOLDER` (row and `(none)` both) and `MISSING SECTION` (one of the five headings absent); the row pattern is the §"Filing commits" one with `[ x]` exactly; `[ \t]` instead of a POSIX class for older mawk. Header updated: listed among the no-source-rule checks, and named beside `pair_p` as counting inside its awk.
Seeded case: `## Medium` reduced to space-padded `(none)` and an empty `## Zz Notes` stay silent; emptied `## Low`, prose-only `## Future Opportunities`, `(none)` above `## Completed`'s rows, and `## High` renamed to `## High priority` report — asserted as the whole output.
PLAN.md: `(none)` restored under `## Future Opportunities`; the stray blank between CORE-894 and CORE-892 in `## Completed` dropped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`, no rendered surface (shell check + test)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Full validation set (`--unattended`): `just check` → 0 (runs `test typecheck lint build`, the updater suite and checks, `node --test tools/drift-checks.test.mjs`, `bash tools/drift-checks.sh`; no other `check`/`test`/`lint`/`typecheck` recipe outside it). Re-run after the review fixes → 0 (viz 123/123, drift self-test 45/45).
Receipt:
- `bash tools/drift-checks.sh plan_placeholder` → 0 (before the PLAN fix it printed `EMPTY SECTION  .flaitron/PLAN.md :: ## Future Opportunities` and exited 1)
- `node --test tools/drift-checks.test.mjs` → 0 (45 pass; `plan_placeholder fails on its seeded drift`, `has exactly one case per check`, `floors every check…` all ✔)
- `awk '/^## Completed/{c=1;next} c&&/^$/{b++} END{exit b>1}' .flaitron/PLAN.md` → 0
- `bash tools/drift-checks.sh` → 0
- `shellcheck tools/drift-checks.sh` → 1, all findings pre-existing info/warning lines outside this function; CI does not shellcheck this file.
Scope guardrails (Phase 3 entry and re-entry): paths `.flaitron/PLAN.md`, `tools/drift-checks.sh`, `tools/drift-checks.test.mjs`, this note — all in `touches:` or workflow paths; size 60 lines (39+5, 21+0) against 400.
External review: `/code-review medium` over the working-tree diff. No blocker; four notes, all fixed in place: (1) a `(none)` left beside rows passed → `STALE PLACEHOLDER`; (2) row pattern accepted `[X]`, unlike the cited SPEC pattern → `[ x]`; (3) fenced / HTML-comment lines read as plan text → documented as a known limit in the function comment (the plan holds none); (4) a renamed heading dropped its section silently → `MISSING SECTION`. Seeded case extended to cover (1) and (4).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep (per README §"AI-referenced docs"): `README.md` no change · `AGENTS.md` no change (Validation names the drift job's checks only "among others") · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` drift — §"GitHub Actions CI" says "Six checks have neither a source rule nor a catalogue entry" and lists them; it needs `plan_placeholder` (CORE-918.3: each of the five priority sections in `.flaitron/PLAN.md` holds a task row or `(none)`, never both, and all five headings exist) added, making seven. Outside `touches:`, so filed rather than edited; filed CORE-928 · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change.
Post-sweep scope check: the sweep edited nothing; paths and size unchanged from Phase 3 (60 lines, all in scope).

**Final Summary:**

Recap: the drift job now fails when a priority section of the live `.flaitron/PLAN.md` is blank, keeps a stale `(none)` beside rows, or has lost its heading, so the placeholder rule CORE-918.2 put on the Closed line is enforced off-machine; the live plan was fixed in the same change.
- Changed: `tools/drift-checks.sh` (+39/−5: `plan_placeholder()` and two header lines), `tools/drift-checks.test.mjs` (+21: seeded case), `.flaitron/PLAN.md` (`(none)` under Future Opportunities, stray blank in Completed dropped, this row's flip).
- Verification: `just check` → 0; `bash tools/drift-checks.sh` → 0; drift self-test 45/45.
- Refactors: none. Doc verdict: one out-of-scope drift in `docs/CONVENTIONS.md`, filed as CORE-928.
- Scope: declared 3 files, changed 3. Undeclared: none.
- Maintainability: a closure that forgets `(none)` now fails CI at its push instead of waiting for an audit to notice.

unattended-candidates: CORE-928

Learnings: N/A — the rule already lives in `SPEC/plan-filing.md` and the Closed line; the check is the enforcement.

**Archived:** 2026-11-24
