---
title: drift-script-extract
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.3, CORE-631.2, CORE-464, CORE-543]
touches:
  - tools/drift-checks.sh
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/SKILL.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
  - SPEC/scope-boundaries.md
  - SPEC/layout.md
  - AGENTS.md
  - README.md
  - .flaitron/audit-overlay/SKILL.md
---

# CORE-734.2 | drift-script-extract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-734]] · [[CORE-734.3]] · [[CORE-631.2]] · [[CORE-464]] · [[CORE-543]]

## 🎯 Goal

Move the CI `drift` job's step bodies into `tools/drift-checks.sh` (one function per check) so CI and the `/ft-release` §7.1 walk both invoke the script, and §7.1 no longer parses `ci.yml`'s YAML shape.

## ✅ Acceptance

- [x] `tools/drift-checks.sh` carries one function per former `drift` step (16: `wrapper_name_invariant`, `shipped_skill_parity`, `skill_pin_guard_parity`, `context_budget`, `final_newline`, `pair_a` … `pair_r`), each body byte-identical to its HEAD `run: |` body (dedented) except Pair H's ci.yml-heredoc comment — `diff` of HEAD bodies vs function bodies (Phase 3 script)
- [x] Running all checks passes on the tree, each check under `bash -e` with no `pipefail` and in file order — `bash tools/drift-checks.sh` → 0, 16 `ok` lines
- [x] A finding fails its check and the run: a mutated scratch copy prints `FAILED` for the right check and exits non-zero; an unmatched pattern exits non-zero instead of passing vacuously — mutated-copy proof (Phase 3)
- [x] The CI `drift` job is one `- name:` + `run:` step invoking the script; no `- run:` line leaks into Pair H's extraction, and the file still parses as YAML — `grep -c '^        run: |' .github/workflows/ci.yml` (only gitleaks) + `pair_h` ok + js-yaml load
- [x] §7.1 no longer reads ci.yml's YAML shape: the local runner and Pair L read `tools/drift-checks.sh` — `! grep -nE "name: Pair|run: \\\||ci_paths" claude/skills/ft-release/step-7.1-mirror-pairs.md`; `bash tools/drift-checks.sh 'pair_*'` → 11 ok; the Pair L block run from the fragment prints nothing
- [x] Contracts say what is now true: CONVENTIONS drops "No script is added"; scope-boundaries says the self-host drift script is repo maintenance, not a CLI carve-out, so `update-adopters.mjs` stays singular; the `tools/` bullets in SPEC/layout.md, AGENTS.md and README.md name it — `! grep -q 'No script is added' docs/CONVENTIONS.md && grep -q drift-checks.sh SPEC/scope-boundaries.md SPEC/layout.md AGENTS.md README.md`
- [x] No other live surface still says the drift shell lives in `ci.yml` — `git grep -nE "shell lives in .\.github|CI copy|in \.github/workflows/ci\.yml" -- '*.md' ':!.flaitron/tasknote/archive' ':!.flaitron/PLAN-ARCHIVE.md' ':!docs/VERSION-HISTORY.md'` reviewed (`judgment` on the hit list)
- [x] `context_budget` stays green (the `ft-release/**` cap of 125,000) — covered by `bash tools/drift-checks.sh`; `shellcheck -S warning tools/drift-checks.sh` → 0 on the dispatch code (pre-existing check bodies are moved verbatim and not restyled)

## 🧩 Subtasks

- [x] Generate `tools/drift-checks.sh` mechanically from HEAD's `drift` steps (awk: dedent 10, wrap each body as a function and keep the step name as its header comment), then add the script header (design notes from the ci.yml job comment) and the dispatch: no args runs all, args are glob patterns, and each check re-execs `bash -e "$self" --run <fn>`
- [x] Update Pair H's comment (the ci.yml presence hit is now satisfied by the `validate` job's `- run:` lines, not the heredoc)
- [x] Rewrite the ci.yml `drift` job: shortened header comment plus one `- name: Drift checks (tools/drift-checks.sh)` / `run: bash tools/drift-checks.sh` step
- [x] `step-7.1-mirror-pairs.md`: intro + local runner → `bash tools/drift-checks.sh 'pair_*'`; Pair L `ci_paths` → `fn_paths` on the script, with source rows keyed by function name; the 11 `CI step:` lines → `Check: \`pair_x\``; Pair L bullets (join key, coverage)
- [x] `step-7.1-standing-checks.md` L214–222, `ft-release/SKILL.md` L290, `docs/CONTEXT-BUDGET.md` L327, `.flaitron/audit-overlay/SKILL.md` L60: point at the script
- [x] `docs/CONVENTIONS.md` L58/L60; `SPEC/scope-boundaries.md` scope note; `tools/` bullets in `SPEC/layout.md`, `AGENTS.md`, `README.md`
- [x] Phase 3: body-equivalence diff, full run, `pair_*` run, Pair L block, mutated-copy proof, YAML parse, shellcheck

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax); Discovery supplied by audit-repo 2026-10-07, no `.1` note
- [[CORE-734.3]] — sibling: mirror-pair census; runs after this lands the script
- [[CORE-631.2]] — related-decision: moved the Pair shell into `ci.yml` (budget-driven); this task moves it again
- [[CORE-464]] — related-decision: lifted §7.1 into the `drift` job under an explicit "No new script" constraint
- [[CORE-543]] — related-decision: minted Pair L as a path-set compare

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The YAML-shape coupling is live: the §7.1 runner and Pair L both awk on `- name: Pair <L> ` / `run: |` / 10-space indent, and CORE-464's comment guard exists only to protect it. The operator chose to add the script with a scope note, after the zero-scripts conflict below was surfaced.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Current shape.** `.github/workflows/ci.yml` `drift` job (L84–514) has 16 `- name:` + `run: |` steps: wrapper-name invariant, shipped-skill parity, skill/pin guard parity (CORE-729), context budget, final newline, Pairs A B C H J M N O P Q R. `/ft-release` §7.1 (`step-7.1-mirror-pairs.md` L11–20) awk-extracts every `Pair <letter> ` step's `run: |` body and pipes it to `bash -e`; Pair L (L170–211) awk-extracts each step's block by `- name:` prefix (`ci_paths`) and path-set-compares it to a source fence or a `Reads:` line.
- **Archive skim (probe over 109 `ci.yml` hits; read CORE-464, 574.3, 543, 621, 631.2/.3/.N, 729).** A script was never weighed as a design option. Each time it was declined by citing a rule. CORE-464.md:33 made "No new file is added to the repo — every check is inline `run:` shell" an acceptance criterion. CORE-631.2.md:84 re-affirmed "CONVENTIONS' 'no script is added' still holds". CORE-631.2 moved the shell into `ci.yml` to fit the `ft-release/**` budget (122,895 of 125,000 → 108,576). It was not a preference for YAML. Step-shape constraints that must survive: Pair H's CI-verbatim half greps `^      - run: ` (a single-line `- run:` in `drift` would leak into it; CORE-464.md:109). The `bad=` accumulator rule means no `out=$(for … case …)` (CORE-464.md:267). The shell is `bash -e`, no `pipefail` (CORE-631.2.md:81; CORE-729.md:139 — Pair B/J/M fail on an empty `grep -o` under pipefail). Final-newline ships unbound (CORE-621). `tools/` is "Not budgeted, deliberately" (`docs/CONTEXT-BUDGET.md`:68).
- **Drift check — cross-artifact conflict (surfaced to operator).** The PLAN line's deliverable contradicts three settled contracts:
  1. `docs/CONVENTIONS.md` §"GitHub Actions CI" L58: "No script is added, and the shell of each check lives in exactly one place."
  2. `SPEC/scope-boundaries.md` §"What flaitron does NOT provide" (mirrored in `SPEC.md` and `SPEC/layout.md` L48): `tools/update-adopters.mjs` is "the singular CLI carve-out", and the carve-outs are "singular exceptions, not precedents".
  3. `docs/PHILOSOPHY.md` §"Zero scripts".

  A drift-check script is self-host CI infrastructure, not a workflow CLI adopters run. That distinction has to be written down; it cannot be assumed.

  Other drifted live surfaces that say the drift shell lives in ci.yml: `step-7.1-standing-checks.md` L214–222 ("binds the CI copy"); `ft-release/SKILL.md` L290; `docs/CONTEXT-BUDGET.md` L327; `.flaitron/audit-overlay/SKILL.md` L60 (Pair Q's file selection "in `.github/workflows/ci.yml`"); `docs/CONVENTIONS.md` L58/L60. The PLAN line's "Rebind Pair H" means Pair H's own comment about its ci.yml heredoc. Its CI-verbatim half reads the `validate` job's `- run:` lines, which stays correct: that read is the roster binding, not a read of the drift shell.
- **Clarifications (AskUserQuestion, 2026-10-07).**
  1. *Zero-scripts conflict* → **Proceed + scope note.** Add the script. Amend CONVENTIONS. Add one scope-boundaries sentence saying the self-host CI check script is repo maintenance, not a workflow CLI, so the `update-adopters.mjs` carve-out stays singular. Update the `tools/` bullets. `SPEC.md`'s summary stays unchanged: it rules out a CLI tool, which this is not.
  2. *CI shape* → **one step runs all.** A single `drift` step runs `bash tools/drift-checks.sh`. No CI-step ↔ function mirror is created, which fits the epic's goal of fewer mirrors. The GitHub UI shows one step; the log names each check `ok` or `FAILED`.
- **Best Practices Review.** One responsibility moves: the drift-check shell gets a home of its own. Dependency direction afterwards: CI → script ← §7.1 runner; Pair L reads the script. Nothing reads CI for check bodies any more. Each body is moved verbatim, with no restyling (minimal refactor). The only new code is the dispatch.
  - *Semantics to preserve:* GitHub runs `run:` under `bash -e`, no pipefail. `set -e` is ignored inside a `( … ) || …` subshell, so each check re-execs as its own `bash -e` process, the same as today's `| bash -e` runner.
  - *Order:* checks run in file order, read from the script's own `name() {` lines. `declare -F` sorts alphabetically, so it is not used.
  - *Root:* the script `cd`s to the repo root itself, so it works from any cwd.
  - *bash 3.2:* the local bash is 3.2 and the baseline runner passes all 11 pairs on it. The dispatch avoids bash-4 features.
- **Assumptions.**
  - Function names: snake_case of each step's name prefix; `pair_<letter>` for the pairs.
  - The old step title stays as a `#` header comment above each function. It sits outside the body, so Pair L does not read it.
  - The catalogue's `CI step:` label becomes `Check:`. Pair L reads only `Reads:` lines.
  - The stale `(A … Q)` list in Pair K's "Release-gate only" bullet (missing R) predates this task and is left alone.
  - No `.1` Discovery note exists, so there is no Fan-out echo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- *Pattern survey.* Nothing like a check script existed in `tools/` (only the Node updater). The shape extends what the job already had, one unit per check with the title kept, moved from YAML steps to functions. Pair L's existing awk-extraction idiom was rebound from `- name:` blocks to `name() {` … `}` blocks. Its `paths()` normalizer and the source/catalogue split are unchanged.
- *Mechanical move.* `tools/drift-checks.sh` was generated by awk from HEAD's 16 `drift` steps: each body dedented 10 columns, wrapped in a function, and preceded by its step title as a `#` line. Bodies stay at column 0, because Pair H's heredoc terminator must. The only body edits are comments: Pair H's note on how the ci.yml presence hit is satisfied (now the `validate` job's `- run:` lines, not the heredoc), and final_newline's "above" → "below" (review note).
- *Dispatch (the only new logic).*
  - `cd` to the repo root, `CDPATH`-safe.
  - With no args, every check runs; args are globs, and every pattern must match a check or the run exits 2.
  - Each check re-execs as `bash -e "$self" --run <fn>`, its own process with no pipefail. `set -e` would be ignored inside a `( … ) || …` subshell.
  - Checks run in file order, read from the script's own `name() {` lines.
- *ci.yml.* The `drift` job is now one `- name: Drift checks (tools/drift-checks.sh)` / `run: bash tools/drift-checks.sh` step. The header comment is cut down to a pointer plus the Pair H `- run:` leak warning, and the other design notes moved into the script header.
- *§7.1.*
  - The local runner is now `bash tools/drift-checks.sh 'pair_*'`.
  - Pair L's `ci_paths` became `fn_paths`, with source rows keyed by function name.
  - The 11 catalogue `CI step:` lines became `Check: \`pair_x\``.
  - The Pair L bullets were rewritten: the join key is now the function name, and the coverage bullet now names `skill_pin_guard_parity` (CORE-729) as unbound next to final_newline.
- *Contracts.*
  - CONVENTIONS §"GitHub Actions CI" drops "No script is added" and records why the shell moved twice.
  - SPEC/scope-boundaries gets its own paragraph: the drift script is repo maintenance, not a carve-out.
  - The `tools/` bullets in SPEC/layout.md, AGENTS.md and README.md name the script.
  - Pointers in standing-checks, ft-release SKILL.md (L265 now names the doc-gate command; L290), CONTEXT-BUDGET, and the audit overlay now point at the script.
- *Minimal refactor gate.* No check body was restyled: Pair Q's one shellcheck warning, SC2088 (an intentionally quoted `'~/'`, documented in its comment), was left verbatim. The stale "(A … Q)" list in Pair K's bullet predates this task and is untouched.
- *Tests.* Flaitron has no shell test harness, and the scope-boundaries rule rules out adding one. The mutated-copy proofs below are the behavioural evidence, the same method CORE-610.2 and CORE-729 used.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface; shell + markdown only

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (local bash 3.2.57; Acceptance order):

```text
diff HEAD drift-step bodies vs script function bodies (16 = 16)   → 1, only Pair H's ci.yml-heredoc comment (+ later final_newline "below" comment)
bash tools/drift-checks.sh                                      → 0  (16 ok)
bash tools/drift-checks.sh 'pair_*'                             → 0  (11 ok)
bash tools/drift-checks.sh 'nope_*'                             → 2  no check matches: nope_*
bash tools/drift-checks.sh pair_q final-newline                 → 2  no check matches: final-newline
(cd viz && bash ../tools/drift-checks.sh pair_c)                → 0
mutated copy: README roster clause broken → pair_a              → 1  NO ROSTER CLAUSE  README.md / pair_a FAILED
mutated copy: codex/skills/ft-seed removed → shipped_skill_parity → 1  (diff's status under bash -e) shipped_skill_parity FAILED
mutated copy: 'pair_[abc]' 'shipped*'                           → 1  pair_a FAILED, pair_b ok, pair_c ok, shipped_skill_parity FAILED
mutated copy: Pair C Reads: line + README.md → Pair L block     → prints PAIR L MISS: Pair C … > README.md
grep -c '^        run: |' .github/workflows/ci.yml              → 1  (gitleaks only)
js-yaml load .github/workflows/ci.yml                           → jobs [validate, drift], drift steps 2
! grep -nE 'name: Pair|run: \||ci_paths' step-7.1-mirror-pairs.md → 0
contracts grep (CONVENTIONS / scope-boundaries / layout / AGENTS / README) → 0
git grep stale "drift shell in ci.yml" phrases                  → 2 remaining hits, both historical (v5.25.0 CI copy; CORE-546) — judgment: correct as history
Pair L block extracted from step-7.1-mirror-pairs.md            → 0, prints nothing
shellcheck -S warning tools/drift-checks.sh                     → 1  only SC2088 at pair_q's verbatim body (dispatch clean)
context_budget (ft-release/** 120,047 ≤ 125,000)                → ok
node --test tools/update-adopters.test.mjs                      → 0  (65 pass)
node --check tools/update-adopters.mjs                          → 0
```

Mutation copy built in the scratchpad by `git ls-files -co | tar` (no `.git`, so pair_q's `git ls-files` selection was vacuous there — irrelevant to the four mutated checks). Structural: no duplication (the shell now has exactly one home), no dead code, public surface grows by one script whose CLI is `[glob…]`; code-facing docs updated in the same diff.

External review — `/code-review medium` over the working tree (this task's diff only; no commits made). No blockers: every Acceptance criterion holds (it re-ran the 16 checks, the `pair_*` filter, and the Pair L fence). Seven notes, all **fixed**:
1. a typo'd pattern beside a valid one skipped silently → every pattern must now match (exit 2);
2. a `CDPATH` echo could corrupt `self` → `CDPATH='' cd --`;
3. the Pair L intro still said "three `drift` steps" → "three `drift` checks in `tools/drift-checks.sh`";
4. the script header attributed both unbound checks to CORE-621 → CORE-729 / CORE-621;
5. final_newline's "Pair P/Q above" → "pair_p/pair_q below";
6. ft-release SKILL.md L265's doc-gate run now names `bash tools/drift-checks.sh pair_q final_newline context_budget`;
7. the scope-boundaries sentence rendered inside the "Do not add them" paragraph → now its own paragraph.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:**
- `docs/CONVENTIONS.md`: updated (§"GitHub Actions CI": script, move history, carve-out note).
- `README.md`, `AGENTS.md`: updated (`tools/` bullet).
- `docs/VISION.md`: no change. Its scope list names no tools carve-out; `SPEC/scope-boundaries.md` (its mirror) carries the new paragraph.
- `SECURITY.md`: no change. §"GitHub Actions CI" still holds: a PR's tree was already executed as inline shell, now as a script from the same tree.
- `docs/MIGRATION.md`: no change. Its `tools/update-adopters.mjs` mention is still accurate.
- No change: `SPEC.md` (rules out a CLI tool; this is not one), `claude/AGENTS-snippet.md`, `codex/`, `cursor/`, `grok/` snippets, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`.

**Recap.** The CI `drift` job's 16 checks now live in `tools/drift-checks.sh`, one function per check, and CI and the `/ft-release` §7.1 walk both run that script. Neither the §7.1 runner nor Pair L parses `ci.yml`'s YAML shape any more, which closes the PLAN line's Done criterion.

- **Changed:** 12 files, +566/−499.
  - `tools/drift-checks.sh` is new (505 lines, about 470 of them moved verbatim).
  - `ci.yml` shrank by 453 lines.
  - `step-7.1-mirror-pairs.md`: ±75.
  - The rest are 2–7-line pointer edits.
- **Verification:** the receipt above. 16/16 checks pass on the tree, 11/11 for `pair_*`, Pair L is clean, the mutation proofs fail correctly, and the updater suite passes 65/65.
- **Refactors:** only the move. Bodies were not restyled, and Pair Q's SC2088 is left as is.
- **Contracts:** CONVENTIONS' "No script is added" is reversed with its history recorded. The operator chose this (Discovery clarification 1). scope-boundaries says why `update-adopters.mjs` stays the singular carve-out.
- **Scope:** declared 12 files, changed 12. Nothing undeclared.
- **Maintainability:**
  - The drift shell has one home.
  - A new check is one function. CI needs no edit, and §7.1 needs a catalogue entry or mapping row as before.
  - CORE-464's comment guard on the YAML step shape now protects one line instead of 16 bodies.
  - The `ft-release/**` budget is down 646 bytes (120,693 → 120,047).

**Learnings:** N/A. The one durable fact (the drift shell lives in `tools/drift-checks.sh`) is now in AGENTS.md's `tools/` bullet, which is always loaded.

**Archived:** 2026-10-07
