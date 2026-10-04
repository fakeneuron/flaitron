---
title: pair-h-lift-to-ci
status: completed
tags: [ci, mirror-pairs, release-gate]
created: 2026-09-20
due:
related-tasks: [CORE-623]
touches:
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
blocked-by:
  - CORE-623
---

# CORE-624 | pair-h-lift-to-ci

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-623]]

## 🎯 Goal

Lift the Pair H release-gate check (validation-roster presence + CI-verbatim halves) into the CI `drift` job so a validation-roster mirror miss fails on the commit that lands it rather than at the next release cut, and add its Pair L mapping row.

## ✅ Acceptance

- [x] The `drift` job carries a `Pair H` step whose body holds both §7.1 halves (presence loop + CI-verbatim `diff -u`), in the `- name:` + `run: |` shape — `grep -q '^      - name: Pair H ' .github/workflows/ci.yml` and `grep -c '^      - run: ' .github/workflows/ci.yml` still prints `8` (install + seven roster commands; no single-line `- run:` leak)
- [x] The extracted CI step passes on HEAD under CI's shell — extract the step body, run with `bash -e` and `bash -eo pipefail` → 0, no output
- [x] The CI step is non-vacuous — on a scratch copy of `ci.yml` with `npm --prefix viz run build` dropped from `validate`, and on a scratch copy of `AGENTS.md` with the same line dropped, the step prints a finding and exits 1 (mutated-copy proof, CORE-543's lesson)
- [x] Pair L maps the new step — `grep -q "'Pair H|claude/skills/ft-release/step-7.1-mirror-pairs.md|" claude/skills/ft-release/step-7.1-mirror-pairs.md`, and the Pair L block run verbatim prints nothing (path sets agree; the step yields ≥1 path after the `echo`-strip)
- [x] Every `drift` step still passes locally — each `run: |` body extracted and run under `bash -e` → 0
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" and the Pair L coverage bullet list H among the lifted checks, not the release-only ones — `grep -n 'Pairs D, F, H' docs/CONVENTIONS.md claude/skills/ft-release/step-7.1-mirror-pairs.md` prints nothing; `grep -q 'thirteen lifted checks' claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] Context budget holds — `claude/skills/ft-release/**` total ≤ 125,000 (`find claude/skills/ft-release -type f -exec cat {} + | wc -c`)

## 🧩 Subtasks

- [x] `.github/workflows/ci.yml`: add a `Pair H — validation roster ↔ its restatement sites (AGENTS.md §"Validation")` step to `drift` after Pair C (letter order), body = both §7.1 fences verbatim with a `bad=` accumulator; presence findings and the `diff -u` both flip `bad`
- [x] `claude/skills/ft-release/step-7.1-mirror-pairs.md`: Pair H gains a closing "Lifted into the CI `drift` job" bullet in the N/O/P/Q idiom, noting that the heredoc copy in `ci.yml` makes the presence half's `ci.yml` hit trivially satisfied and the CI-verbatim half is the binding check for that surface; Pair L mapping gains the `'Pair H|…|^[*][*]Pair H '` row after Pair C; "twelve lifted checks" → "thirteen", H dropped from the release-only lists in the Coverage and Release-gate-only bullets
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI": add H to the lifted Pairs list; drop H from the two "stay there" lists (§"GitHub Actions CI" and §"Dependency audit cadence")
- [x] Verify: extracted step on HEAD (`bash -e`, `bash -eo pipefail`), two mutated-copy proofs, Pair L verbatim, all drift steps locally, `wc -c` budget

## 🔗 Related

- [[CORE-623]] — predecessor (`blocked-by:` — landed 2026-09-20); introduced the validation roster + Pair H release gate this task lifts into CI

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-623 landed this morning (HEAD `df96268`), so the blocker is cleared and both Pair H halves are green on HEAD — the right moment to lift, since a lifted check must start green. The miss class is real and recent: CORE-622.4 added a `validate` step and five mirrors sat stale until the audit caught it; §7.1 would have caught it only at the next cut. Pair H is deterministic against the commit (no release context, no judgment), so it belongs in the same release-context-free subset as A/B/C/J/M/N/O/P/Q. The `drift` job already has the `- name:` + `run: |` shape and `bad=` idiom to copy, and Pair L has the mapping-row hook the PLAN line names.

- [x] Read relevant source files — `.github/workflows/ci.yml` (validate job lines 13-46; drift job 48-236: header comment on the `- name:`/`run: |` shape and the `bad=` accumulator, steps Wrapper-name → Pair Q); `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair H (lines 81-114: prose, presence fence, CI-verbatim fence) and Pair L (214-263: mapping printf, awk join, five bullets); `docs/CONVENTIONS.md` §"GitHub Actions CI" (lines 54-60) and §"Dependency audit cadence" (66); `docs/CONTEXT-BUDGET.md` rows 48-49 (`ft-release/**` 125,000; directory at 122,198 today → 2,802 headroom)

- [x] **Best Practices Review** — shell-in-YAML plus skill prose. Dependency direction is fixed by Pair L's contract: §7.1 is the source, the CI step is the adapted copy, "adapted only to fail the step on a finding" — so the CI body is the two fences verbatim plus `bad=` / `|| exit 1`, nothing rewritten. Duplication is the accepted kind (every lifted step is a bound second copy; Pair L is the binding). One shape question: one step or two? One step with both halves — Pair L joins on the `- name:` prefix and unions the source's fences, so either works, but a single step matches the one-pair-one-step norm (Pair E's two-step shape was the exception, since retired). No refactor.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. 51 notes name the mirror-pairs fragment; 20 name Pair L. Load-bearing: [[CORE-623]] (predecessor; roster now seven commands, both halves green, names this task as the structural fix); [[CORE-543]] (minted Pair L — lesson: prove every new step non-vacuous on a mutated copy and confirm ≥1 path after the `echo`-strip); [[CORE-610.2]] (Pair P lift — CI runs `bash -e`, so a command substitution ending in a `grep` that matches nothing on a *clean* state kills the step; here the clean state matches, so no `|| true` is needed, but run the extracted body under `bash -e` and `bash -eo pipefail` as it did); [[CORE-621]] (final-newline step ships unbound by design — the opposite of this task, which adds the row); [[CORE-603.2]] (Pair E retired, letters never reused; the two-step-one-prefix union rule survives in Pair L's bullet). Idiom for the fragment note: Pairs N/O/P/Q each close with a "**Lifted into the CI `drift` job, like …**" bullet ending "Pair L binds the CI copy to the block above."

- [x] **Drift check** — PLAN line names only the fragment and the `drift` job; both exist in the shapes assumed. Two extra sites the PLAN line does not name but the change forces: `docs/CONVENTIONS.md` §"GitHub Actions CI" enumerates the lifted pairs ("A, B, C, J, M, N, O, P, and Q") and the release-only ones ("D, F, H, I, K, and L"), §"Dependency audit cadence" repeats the release-only list, and Pair L's Coverage bullet says "twelve lifted checks … Pairs D, F, G, H, I, and K" — all four go stale the moment H is lifted, and Pair Q / the doc-drift sweep read CONVENTIONS, so they are in scope. One consequence to record rather than hide: once the presence heredoc lives in `ci.yml`, the presence half's `grep -F` against `ci.yml` is satisfied by the heredoc itself, in both the §7.1 run and the CI run — that surface is bound by the CI-verbatim half (byte-for-byte on `- run:` lines), which is stricter, so nothing is lost; noted in the Pair H bullet. No SPEC contract touched.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumptions: (1) one CI step carrying both halves, placed after Pair C in letter order; (2) the step's shell is the two §7.1 fences verbatim, with `bad=1` on any presence finding and on a non-zero `diff -u`, then `[ -z "$bad" ] || exit 1`; (3) Pair H's CI-verbatim `grep -E '^      - run: '` cannot self-match the new step, whose lines are indented ten spaces and never begin with `- run:`; (4) `ci.yml`'s header comment about the `- name:` + `run: |` shape stays as-is — it is still the reason; (5) `AGENTS.md`, `.flowtron/tasknote/README.md`, and `/ft-release` SKILL.md are not touched — the roster itself is unchanged.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Pair L path sets for the new step, predicted from `paths()` on the two Pair H fences: `AGENTS.md`, `.github/workflows/ci.yml`, `.flowtron/tasknote/README.md`, `claude/skills/ft-release/SKILL.md`, `docs/CONVENTIONS.md`, `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs` — seven, so the step is far from vacuous after the `echo`-strip. Verified empirically in Phase 3.
- Budget: 2,802 bytes of headroom on `ft-release/**`; the fragment edits (one mapping row, one bullet, two list edits) should land well under 1,000.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A as a test file: the lifted step *is* the test; its non-vacuity was proven on three mutated copies (Phase 3)

**Implementation Notes:**

- Pattern survey: extended the existing lifted-step shape — `- name: Pair X — …` + `run: |`, `bad=` accumulator, `[ -z "$bad" ] || exit 1` — one step for the pair (the N/O/P/Q norm), placed after Pair C in letter order. Body is the two §7.1 fences verbatim; the only deltas are `bad=1` on each presence finding and on a non-zero `diff -u`, plus two comment lines naming the halves (Pair A and the final-newline step carry comments the same way). The heredoc survives YAML's block-scalar indentation strip: the terminator lands at column 0 in the shell, confirmed by extracting the `run:` string with a YAML parser and running it.
- Fragment: Pair H gained the closing "**Lifted into the CI `drift` job, like N, O, P and Q.**" bullet in the established idiom, recording the one honest consequence (the `ci.yml` presence hit is satisfied by the heredoc copy; the CI-verbatim half is the binding check for that surface). Pair L: mapping row after Pair C; "twelve lifted checks" → "thirteen"; H dropped from the two release-only lists — and retired Pair G with it, since those lists still named it (CORE-571 retired G; CORE-627 fixed the same staleness in CONVENTIONS, not here) and the edit is the same line. CONVENTIONS: H moved from the "stay there" lists (two sites) to the lifted list.
- Minimal refactor gate: no refactor. Left as-is: the `ci.yml` header comment (still the reason for the `- name:` + `run: |` shape); `AGENTS.md`, `.flowtron/tasknote/README.md`, `/ft-release` SKILL.md (roster unchanged); the pre-existing `s/` token `paths()` extracts from `sed 's/^      - run: //'` — it appears identically on both Pair L sides, so it is noise, not a miss, and tightening `paths()` is outside this task.
- Diff: 3 files, +35/−4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the extracted CI step on HEAD + three mutated copies; Pair L verbatim; §7.1 Pair H verbatim; every `drift` step

- [x] Ran lint/type-check on changed code — N/A: YAML + markdown; `ci.yml` parsed by Ruby's `YAML.load_file` as the extraction step, which is the syntax check that matters here

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1: `grep -q '^      - name: Pair H ' .github/workflows/ci.yml` → 0; `grep -c '^      - run: '` → `8` (unchanged: install + seven roster lines; the new step leaks nothing into Pair H's extraction)
- A2: step body extracted via `YAML.load_file` → `bash -e` → 0, `bash -eo pipefail` → 0, no output
- A3 mutated-copy proofs, all exit 1 with a readable finding: `validate` drops `run build` → `diff -u` shows `-npm --prefix viz run build`; `AGENTS.md` drops the line → `MISSING VALIDATION CMD … :: npm --prefix viz run build` + `+npm --prefix viz run build`; `CONVENTIONS.md` drops the `run lint` mention → `MISSING VALIDATION CMD … :: npm --prefix viz run lint`
- A4: mapping-row grep → 0; Pair L block verbatim → 0, no output; `paths()` on the CI step yields 8 tokens (7 real paths + the pre-existing `s/` artifact, present on both sides)
- A5: all 14 `drift` step bodies re-extracted after the fragment edits and run under `bash -e` → 14 × 0 (Pair Q included, so the new prose introduces no stale citation)
- A6: `grep -n 'Pairs D, F, H' docs/CONVENTIONS.md claude/skills/ft-release/step-7.1-mirror-pairs.md` → 1 (no matches — pass); `grep -q 'thirteen lifted checks'` → 0
- A7: `claude/skills/ft-release/**` = 122,901 ≤ 125,000 (was 122,198; +703); `SKILL.md` untouched at 31,705 ≤ 40,000
- §7.1 Pair H halves run verbatim from the fragment → 0, no output
- Final newline present on all three touched files
- Structural quality: the duplication is the bound kind Pair L exists for; no dead code; no new public surface; the three prose sites that enumerate lifted-vs-release-only pairs all agree again.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md`: updated (deliverable — H moved to the lifted list in §"GitHub Actions CI"; dropped from §"Dependency audit cadence"'s release-only list). `AGENTS.md`: no change (roster unchanged; §"Validation" still the source of truth). `README.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`s, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Lifted §7.1 Pair H — both halves, verbatim plus a `bad=` accumulator — into the CI `drift` job as one `Pair H` step after Pair C, so a validation-roster mirror miss (the CORE-622.4 → CORE-623 class) now fails the commit that lands it instead of surfacing at the next `/ft-release` cut. Pair L gained the mapping row that binds the copy to its source; its coverage prose and `docs/CONVENTIONS.md`'s two lifted-vs-release-only lists moved H across. Verification: A1–A7 receipts above all green; the step is non-vacuous on three mutated copies; all 14 drift steps and the §7.1 Pair H / Pair L blocks pass on HEAD under `bash -e`; `ft-release/**` at 122,901/125,000. No refactors; deferred: the `s/` token `paths()` extracts from the `sed` on both Pair L sides is pre-existing noise, not touched. `touches:` reconciliation: `git diff --name-only` = exactly the three declared paths. Maintainability: thirteen of §7.1's checks now run per push; the presence half's `ci.yml` hit is documented as subsumed by the stricter CI-verbatim half rather than left as a silent tautology.

**Archived:** 2026-09-20
