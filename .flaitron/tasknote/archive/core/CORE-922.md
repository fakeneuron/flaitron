---
title: fence-cases
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-853, CORE-866, CORE-618]
touches:
  - SPEC/fixtures/fence/
  - SPEC/layout.md
  - viz/src/fence.test.ts
  - viz/tsconfig.browser.json
  - viz/tsconfig.node.json
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
---

# CORE-922 | fence-cases

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-853]] · [[CORE-866]]

## 🎯 Goal

One shared fence-case fixture, `SPEC/fixtures/fence/cases.json`, decides which lines sit inside a fenced code block, and all four repo scanners (`viz/src/fence.ts`, `headingLines` + `snippetLinks` in `tools/update-adopters.mjs`, the `handoff_rows` awk) pass it.

## ✅ Acceptance

- [x] `SPEC/fixtures/fence/cases.json` exists, holds CommonMark fence cases (indent ≤3, tilde, info string, backtick-in-info, char/length closing, trailing text on a closer, unclosed to EOF, nested runs), each with a per-line mask — `test -f SPEC/fixtures/fence/cases.json && node -e "JSON.parse(require('fs').readFileSync('SPEC/fixtures/fence/cases.json'))"`
- [x] `viz/src/fence.test.ts` runs every case against `fenceMask` — `npm --prefix viz test`
- [x] `tools/update-adopters.mjs` takes `headingLines` and `snippetLinks` from one fence scanner on `fence.ts`'s rules, and `tools/update-adopters.test.mjs` runs every case through it — `node --test tools/update-adopters.test.mjs`
- [x] The `handoff_rows` awk follows `fence.ts`'s rules, and `tools/drift-checks.test.mjs` runs every case through it — `node --test tools/drift-checks.test.mjs`
- [x] The live repo still passes `handoff_rows` and the rest of the drift checks — `bash tools/drift-checks.sh`
- [x] Full validation set green — `just check`

## 🧩 Subtasks

- [x] Write `SPEC/fixtures/fence/cases.json` (`describes` + `cases[{name, lines, mask}]`), expected values taken from `fence.ts`'s CommonMark rules
- [x] Add `viz/src/fence.test.ts` running the fixture against `fenceMask`
- [x] `tools/update-adopters.mjs`: one exported `fenceOpeners(lines)` (index of the opening fence line, or -1) on `fence.ts`'s rules incl. the backtick-info rule; `headingLines` derives from it; `snippetLinks` reads `ln -s` only inside a fence whose opener's info string is `sh`
- [x] `tools/update-adopters.test.mjs`: fixture loop over `fenceOpeners`; a `snippetLinks` case for a nested ```` ```sh ```` inside a 4-backtick fence and a `~~~sh` fence
- [x] `tools/drift-checks.sh` `handoff_rows`: replace the `fence = !fence` toggle with an opener-tracking scan (≤3 spaces, same char, ≥ length, blank after, backtick-info rule)
- [x] `tools/drift-checks.test.mjs`: isolated-fixture describe that writes one archived note per case with probe lines turned into `## Hand-off` headings, and asserts the reported lines are exactly the unfenced probes
- [x] `SPEC/layout.md`: list `SPEC/fixtures/fence/` beside `SPEC/fixtures/plan/`

## 🔗 Related

- [[CORE-853]] — added `headingLines` (fence-aware Workflow replace) to the updater
- [[CORE-866]] — added the `handoff_rows` check and its toggle-style fence skip
- [[CORE-618]] — `SPEC/fixtures/plan/`, the shape this fixture follows

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four scanners exist as described and do disagree: `headingLines` lacks the backtick-info rule; `snippetLinks` toggles on any column-0 ```` ``` ```` (no tilde, no length/char matching, ignores indent ≤3); the awk toggles on `^[ \t]*(```|~~~)` (any indent incl. tabs, no char/length matching, a closer with an info string closes). `fence.ts` has no test file of its own.

- [x] Read relevant source files — `viz/src/fence.ts`, `tools/update-adopters.mjs` (`snippetLinks` :586, `FENCE`/`headingLines`/`workflowHeadings`/`replaceWorkflowSection` :1007-1090), `tools/drift-checks.sh` `handoff_rows` (:346-460), `tools/drift-checks.test.mjs` (CASES + isolated-fixture describes such as `pair_p across notes`), `tools/update-adopters.test.mjs` (`snippetLinks` test :1436), `viz/src/parser.test.ts` (fixture-loading style :1182), `SPEC/fixtures/plan/README.md`, the four `*/AGENTS-snippet.md` sh fences (flat, column-0, never nested — the CommonMark rewrite keeps every shipped link)

- [x] **Best Practices Review** — The three tools copies are duplicated logic across languages (JS, awk) that cannot import `fence.ts` (tools are zero-dep Node and bash); a shared data fixture is the right seam rather than a shared module. Inside `update-adopters.mjs` the two JS copies collapse to one scanner, removing in-file duplication.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). Hits: CORE-853 (introduced `headingLines`; assumptions were CommonMark fences, unclosed to EOF — consistent; its pattern survey deliberately left the ```` ```sh ```` toggle alone as narrower, which this task now aligns), CORE-866 (`handoff_rows`; seeded case proves a fenced heading does not report — must keep passing), CORE-618 (plan fixtures shape), CORE-916/CORE-892/CORE-918.3/CORE-622.4 touch the same files for unrelated rules.

- [x] **Drift check** — cited paths and functions match current code (line numbers above). PLAN line names exactly these four scanners and three test files. Not named: `workflowPasteBlock`'s ```` ```markdown ```` open / first ```` ``` ```` close (`update-adopters.mjs:1071`) and `codexRoster` (no fence read) — left as is; they are first-fence extractors over one known file, not mask scanners.

- [x] No clarifications needed (--fast) — assumptions: `fence.ts` is the reference (PLAN line: "align the tools copies with `fence.ts`"); the fixture is a per-line boolean mask (fence lines included, as `fence.ts`); tools keep their CRLF tolerance (a closer followed by `\r` still closes) — no CRLF case in the fixture since `fence.ts` splits lines upstream; tab-indented and 4-space-indented fence lines stop counting as fences in the awk (CommonMark indented code), matching `fence.ts`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Probe harness for the awk: it only prints line numbers of unfiled hand-off blocks, so the drift test turns each lone-lowercase-word line of a case (a plain content line, never a fence delimiter) into a `## Hand-off` heading; the reported line set must equal the probes whose mask is `false`. The fixture's `describes` states the probe convention so the content lines stay probe-shaped.
- Size estimate: ~200 lines (rename-aware).
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** fixture follows `SPEC/fixtures/plan/` (JSON contract with a `describes` key, read by the consumer test via a repo-relative path); viz test follows `parser.test.ts`'s fixture describe; the drift harness follows the isolated-fixture `pair_p across notes` describe (script copied into a temp dir, one archive note per case).
- **Refactor (for Acceptance and to remove duplication):** `tools/update-adopters.mjs` had two fence scanners (`headingLines`, the `snippetLinks` toggle). Both now read one exported `fenceOpeners(lines)` (per line, the index of the opening fence line or -1), which carries `fence.ts`'s rules including the backtick-info rule `headingLines` lacked. `snippetLinks` keeps an `ln -s` line only when its fence's opener info string starts `sh` — so a ```` ```sh ```` shown inside a 4-backtick fence is content and `~~~sh` counts. Shipped snippets are flat column-0 ```` ```sh ```` fences, unchanged result (the existing `wired links` tests that read the four real snippets stay green).
- **awk:** `handoff_rows` replaces `fence = !fence` on `^[ \t]*(```|~~~)` with an open-run tracker (`fence` holds the run): ≤3 spaces, no backtick in a backtick info string, closes on the same char with length ≥ and only whitespace (incl. `\r`) after. No `{n}` intervals (mawk). First attempt broke the shell quoting with an apostrophe in an awk comment — rephrased.
- Live `handoff_rows` still passes on the real archive; the new harness fails against the pre-change awk (stash check: 0 pass / 1 fail) and passes after.
- **Docs:** `SPEC/layout.md` lists the new fixture beside `SPEC/fixtures/plan/`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (fixture, scanners, tsconfig lines, docs)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

First pass parked `drift` (resolved on resume): a `fence.test.ts` is a browser-tier shared-pure test, so it needs `"src/fence.test.ts"` in `viz/tsconfig.browser.json` `include` and `viz/tsconfig.node.json` `exclude`, plus a fixture read with no `node:fs`. Operator widened `touches:` to the two tsconfigs; the test now loads the fixture as a JSON module (option a), and the browser tier typechecks and builds with it.

Receipt after resume:

- `test -f SPEC/fixtures/fence/cases.json && node -e "JSON.parse(…)"` → 0
- `npm --prefix viz test` → 0 (32 files, 679 tests; `src/fence.test.ts` and both `sharedPure.test.ts` tier assertions pass)
- `node --test tools/update-adopters.test.mjs` → 0
- `node --test tools/drift-checks.test.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (`handoff_rows ok`)
- `just check` → 0 (viz test, typecheck, lint, build, the updater and drift suites, and every drift check)
- `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0
- Diff: 118 insertions / 30 deletions tracked plus the new fixture and test; no dead code (the old `snippetLinks` toggle and `headingLines` scanner are replaced, not left beside `fenceOpeners`).

External review (`/code-review medium` over this task's own diff, working tree plus the untracked fixture and test) — no blockers; four notes:

- **note — tasknote out of date with the tree** (Phase 3 still showed red/parked). Stale read: the reviewer opened the note while this run was still writing the post-resume receipt. Disposition: N/A, the note is current.
- **note — fixture had no closer-side indent case.** Fixed: added `four-space indent does not close` and `tab indent does not close` to `cases.json`; `fence.test.ts` (20/20), `update-adopters.test.mjs`, `drift-checks.test.mjs` and `drift-checks.sh` all → 0.
- **note — no CRLF case for the `\r` tolerance in the awk and `fenceOpeners`.** Declined: Discovery ruled it out deliberately (`fence.ts` splits lines upstream, so a `\r` case would pin tools-only behavior in a shared fixture).
- **note — `snippetLinks` re-runs `FENCE.exec` on the opener per fenced line.** Declined: snippet-sized input, no behavior effect.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: `SPEC/layout.md` lists the new fixture (done in Phase 2); `AGENTS.md`'s `fixtures/plan` mention is an illustrative parenthetical that defers to layout.md — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

One shared fixture, `SPEC/fixtures/fence/cases.json` (19 CommonMark fence cases, each a per-line mask), now decides fenced lines for all four scanners. `viz/src/fence.ts` (`fence.test.ts`, loading the fixture as a JSON module so it stays Node-free) was the reference; `tools/update-adopters.mjs` collapsed `headingLines` and the `snippetLinks` toggle onto one exported `fenceOpeners`, which gained the backtick-info rule `headingLines` lacked and the tilde, length and indent rules `snippetLinks` lacked; the `handoff_rows` awk replaced its `fence = !fence` toggle with an opener-tracking scan. Both updater and drift suites run every case. Resume resolved the one park: `touches:` widened to `viz/tsconfig.browser.json` and `viz/tsconfig.node.json`, one line each. `just check` → 0.

**Archived:** 2026-11-24
