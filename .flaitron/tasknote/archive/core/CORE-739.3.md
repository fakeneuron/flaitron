---
title: drift-self-test
status: completed
tags: [drift, ci, tools, test]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-739, CORE-739.2, CORE-739.N, CORE-734.7]
touches:
  - tools/drift-checks.test.mjs
  - .github/workflows/ci.yml
  - AGENTS.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - README.md
  - SPEC/layout.md
  - tools/drift-checks.sh
---

# CORE-739.3 | drift-self-test

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-739]]

## 🎯 Goal

A standing `node:test` suite seeds one known drift per `tools/drift-checks.sh` check into a git-backed temp copy and asserts that check exits non-zero with its own finding line. It runs in CI `validate` and AGENTS.md §"Validation", which change together.

## ✅ Acceptance

- [x] Every check has exactly one seeded-drift case, and a coverage test fails when the script has a check with no case (or a case for no check) — `node --test tools/drift-checks.test.mjs` → exit 0; the coverage test parses function names with the dispatcher's own regex
- [x] Each case asserts a non-zero exit **and** the check's own finding text, so a `VACUOUS` or wrong-reason failure does not count — reading the case table, plus one scratch proof that breaking one check (e.g. making it `exit 0`) turns its case red
- [x] The temp copy carries git state (`git init` + `git add -A`), so final_newline and pair_q read real input — same suite run (their cases assert NO FINAL NEWLINE / STALE SECTION, not VACUOUS)
- [x] CI `validate` and AGENTS.md §"Validation" gain the same line in the same position, and Pair H still passes — `bash tools/drift-checks.sh pair_h` → exit 0
- [x] Roster-count prose follows the new count — `git grep -n "seven commands"` returns no Validation-roster hit; mirror-pairs Pair H entry names the drift self-test
- [x] Live suite still passes and the budget holds — `bash tools/drift-checks.sh` → exit 0; `node --check tools/drift-checks.test.mjs` → exit 0

## 🧩 Subtasks

- [x] Write `tools/drift-checks.test.mjs`: temp copy via `git ls-files -co --exclude-standard` + tar, `git init && git add -A`, one case per check, reset (`git checkout -- . && git clean -fdqx`) between cases, coverage test
- [x] Add `- run: node --test tools/drift-checks.test.mjs` to CI `validate` and the same line to AGENTS.md §"Validation"
- [x] Update roster-count prose (AGENTS.md "seven commands"; mirror-pairs Pair H entry)
- [x] Update the `tools/` layout inventories (AGENTS.md, README.md, SPEC/layout.md) to name the self-test
- [x] Run the suite, the live drift checks, and a scratch break-one-check proof

## 🔗 Related

- [[CORE-EPIC-739]] — parent epic (drift-check-integrity)
- [[CORE-739.2]] — predecessor: the VACUOUS floors; it flagged that this copy must carry git state
- [[CORE-739.N]] — follow-up: epic audit (weighs 739.2 review note 9, the dispatcher-level floor)
- [[CORE-734.7]] — pair_h's roster binding, which the new roster line must satisfy

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** 739.2 floored every check against *empty* input, but nothing standing proves any check still *catches drift*. A check edited to always pass (a wrong regex, a broken case pattern) stays green in CI forever. 739.2's mutation proof was a one-off run in the scratchpad.

- [x] Read relevant source files — `tools/drift-checks.sh` (all 15 checks + dispatcher), `.github/workflows/ci.yml`, AGENTS.md §"Validation", `tools/update-adopters.test.mjs` head (sibling style), the Pair H entry in `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md` §"GitHub Actions CI".

- [x] **Best Practices Review** — Test-only module; no production dependency direction changes. The dispatcher's `--run <fn>` and name args already let a test invoke one check, so the test spawns `bash tools/drift-checks.sh <check>` from inside the copy (the script `cd`s to its own repo root, so the copy's script must be the one run). One case table keyed by check name. A coverage test derives the check list from the dispatcher's own `sed` regex, so a new check fails the suite until it has a case. This partly answers 739.2 review note 9: a missing *case* gets caught, but a missing *floor* still does not.

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/` confirmed). Load-bearing hits:
  - CORE-739.2: a copy without `.git` makes final_newline and pair_q fail `VACUOUS`, so the copy needs `git init && git add -A`. Its mutation recipe (tar the `ls-files -co` list) is the model here.
  - CORE-734.7: pair_h extracts AGENTS.md lines matching `^(npm --prefix viz |node --)` within §Validation, in order, against the `validate` job's single-line `- run:` steps. A `node --test …` line needs no regex change, but the AGENTS.md and ci.yml positions must match.
  - CORE-734.2: the drift job's step must stay `- name:` + `run:`, which is why the new `validate` step is single-line `- run:` (bound), not `- name:`.

- [x] **Drift check** — PLAN line matches the code: 15 checks, CI `validate` has 7 bound run steps, and AGENTS.md §Validation has 7 roster lines. "Pair H binds the two byte-for-byte" is correct. The PLAN line does not mention three things: the "seven commands" count prose in AGENTS.md L112 and in `step-7.1-mirror-pairs.md` L48, which goes stale, and the three `tools/` layout inventories. All are small doc follow-ons, not a re-scope.

- [x] Clarifying questions asked (AskUserQuestion): **node:test `.mjs`** (matches the sibling suite; pair_h's regex already covers `node --`), and **drift-only + coverage**, no VACUOUS cases (739.2 proved the floors by hand). Further assumptions: (1) a case asserts the finding regex, not a clean baseline first, so a live drift elsewhere does not redden this suite (the `drift` job owns that); (2) only `node --test` joins the roster, not a `node --check` of the test file, since `--test` already fails on a syntax error; (3) cases run sequentially in one copy, with a git reset between them.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** See above. Discovery surfaced no significant deviation (the count-prose and layout follow-ons are doc mirrors of the planned change) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `tools/update-adopters.test.mjs`'s shape (zero-dep `node:test`, temp fixture, `execFile`) and 739.2's mutation recipe (`ls-files -co` copy + `git init && git add -A`); the coverage test reuses the dispatcher's own function-name regex instead of a second roster

- [x] **Minimal refactor gate** — no refactor; `tools/drift-checks.sh` untouched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the deliverable is the test

**Implementation Notes:**

- `tools/drift-checks.test.mjs`: `CASES` maps each check to `seed()` + `finding` regex. The seeds are a self-less stub, a codex-only skill, a varied guard paragraph, a 1-byte Budgets row, README with no final newline, a codex-only `--zz-drift`, a too-deep template back-link, an extra `validate` run step, a stub-documented flag missing from its hint, a hint flag missing from its description, a filer missing the literal / post-stage diff, a post-floor archived note not completed, an unresolvable `§"…"` citation, and a stub row with no shortname. Each case asserts exit 1, `<check> FAILED`, its finding, and no `VACUOUS` line. `afterEach` resets with `git checkout -- . && git clean -fdqx`. The copy is built once in `before` (cpSync per listed file, symlinks kept verbatim).
- One portability fix found on the first run: BSD `wc -c` left-pads the count, so the context_budget regex allows `+` spaces.
- `ci.yml` `validate` + AGENTS.md §Validation: `node --test tools/drift-checks.test.mjs` appended as the last bound line of each (new AGENTS.md paragraph + fence after the fleet-updater block).
- Count prose: AGENTS.md "seven" → "eight"; mirror-pairs Pair H "seven … (4 viz + `node --test` + 2 × `node --check`)" → "eight … (4 viz + 2 × `node --test`, one of them the drift-check self-test, + 2 × `node --check`)".
- Layout inventories: AGENTS.md, README.md, SPEC/layout.md `tools/` lines name the self-test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` (16/16) + full `bash tools/drift-checks.sh`

- [x] Ran lint/type-check on changed code — `node --check` on the test file; `bash -n` on the script (comment-only edit); no JS lint covers `tools/` (viz eslint scope only)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI; test file, CI yaml and markdown only

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:
- `node --test tools/drift-checks.test.mjs` → exit 0, 16 pass / 0 fail (~10s)
- Scratch proofs (copy of the repo with its own `git init`): pair_c neutered with `exit 0` → its case fails `pair_c exited 0`; context_budget made `exit 1` with no output → its case fails `failed without its finding`; an extra uncovered `zz()` check → `has exactly one case per check` fails
- `bash tools/drift-checks.sh pair_h` → exit 0 (lockstep line bound)
- `git grep -n "seven commands" -- AGENTS.md claude/skills/ft-release/` → exit 1 (no stale count)
- `bash tools/drift-checks.sh` → exit 0, 15 `ok`; `node --check tools/drift-checks.test.mjs` → exit 0; `bash -n tools/drift-checks.sh` → exit 0
- The final_newline / pair_q cases assert NO FINAL NEWLINE / STALE SECTION and that no `VACUOUS` line printed, so the copy's git state is proven live

External review (`/code-review medium`, working-tree diff), 10 findings, no blockers:
1. Note, fixed: the guard finding regex did not depend on the seed → now asserts `copies-per-variant: (1 6|6 1) `.
2. Note, fixed: the pair_c regex matched only the generic line → now asserts the `templates/zz-drift.md:1:` grep hit.
3. Note, fixed: `git add -A` could leave a force-added tracked file untracked in the copy, so `clean -x` would delete it → `git add -A -f`.
4. Note, fixed: an untracked nested repo listed as `dir/` would crash `cpSync` → filtered out.
5. Note, fixed: stderr was dropped from failure messages → appended.
6. Note, kept: the context_budget seed matches exactly the row shape the check parses (`^\| \`x\` \| [0-9,]+ \|`). History rows are not check input, and if no such row is left the check itself goes VACUOUS, so the seed failing loudly there is correct.
7. Note, kept: no `node --check` for the new suite. `node --test` already fails on a parse error; the reason is recorded in Discovery assumption (2).
8. Note, fixed: SPEC/layout.md now calls the self-test a registered release gate too, matching the sibling suite.
9. Note, fixed: drift-checks.sh shape rules gain one bullet pointing new checks at the self-test (an undeclared touch, recorded below).
10. Note, kept: the Node 24/26 matrix runs it twice. Pair H requires the line in `validate`; ~10s duplicate is accepted.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: AGENTS.md (Validation roster + count + `tools/` layout line), README.md and SPEC/layout.md (`tools/` inventories), step-7.1-mirror-pairs.md (Pair H count). No change: docs/CONVENTIONS.md (says `validate` runs AGENTS.md §Validation verbatim, which is still true, and restates no count), CONTEXT-BUDGET.md (`tools/` unbudgeted; `ft-release/**` at ~106k of 125,000), and the rest of the README §"AI-referenced docs" entries, which don't touch the roster or `tools/`.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; the new-check rule lives in the script header's shape rules, where check authors read it.

**Final Summary:**

Added `tools/drift-checks.test.mjs`: a temp copy with git state, one seeded drift per check (15), each asserting exit 1 + the check's own finding with no `VACUOUS`, and a coverage test bound to the dispatcher's own regex. Wired `node --test tools/drift-checks.test.mjs` into CI `validate` and AGENTS.md §Validation together (Pair H ok), with count prose "seven" → "eight", the three `tools/` inventories, and one drift-checks.sh header bullet. Verified as listed in Testing Notes. `touches:` reconciliation: `git diff --name-only` = the six declared paths + `tools/drift-checks.sh`, added from review note 9 and now declared. Effect on maintainability: a check that stops catching its drift now reddens `validate`, and a new check can't land without a case. A new check still needs its own floor, which is 739.2 note 9's open half for CORE-739.N.

**Archived:** 2026-10-08
