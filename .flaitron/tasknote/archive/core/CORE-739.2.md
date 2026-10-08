---
title: drift-vacuous-floor
status: completed
tags: [drift, ci, tools]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-739, CORE-739.3, CORE-739.N, CORE-734.2, CORE-734.7]
touches:
  - tools/drift-checks.sh
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-739.2 | drift-vacuous-floor

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-739]]

## 🎯 Goal

Every check in `tools/drift-checks.sh` counts the rows/files it actually compared and fails with `VACUOUS <check>` when that count is zero, so no check can pass by comparing nothing.

## ✅ Acceptance

- [x] Every check carries a floor: an `n` counter + `VACUOUS <check>` line, or (skill_pin_guard_parity, pair_h) an existing guard that already fails on an empty read — `grep -c 'echo "VACUOUS ' tools/drift-checks.sh` (13) and reading the two pre-floored checks → 13; pair_h prints NO VALIDATION ROSTER / NO VALIDATE RUN STEPS and skill_pin_guard_parity prints GUARD DRIFT with an empty count on empty reads (scratch mutation)
- [x] The live repo still passes every check — `bash tools/drift-checks.sh` → exit 0, fifteen `ok`
- [x] Each floor fires: a scratch copy with the check's input emptied prints `VACUOUS <check>` and `<check> FAILED`, exit non-zero — per-check mutation run in the scratchpad (recorded in Testing Notes)
- [x] bash 3.2 + shape rules kept: no new top-level function, counters use `n=$((n+1))` (not `((n++))`, which returns 1 at zero under `bash -e`) — `bash --version` (3.2.57) runs the suite; `sed -n 's/^\([a-z][a-z0-9_]*\)() {$/\1/p' tools/drift-checks.sh | wc -l` → 15
- [x] Readers of a finding can interpret `VACUOUS` — `grep -n VACUOUS claude/skills/ft-release/step-7.1-*.md`

## 🧩 Subtasks

- [x] Header shape rules: add the examined-count floor bullet
- [x] Add counters + floors to the 13 checks lacking one
- [x] Rewrite pair_n's "vacuous at birth, on purpose" note (the floor now fails that state)
- [x] One-sentence `VACUOUS` meaning in the §7.1 catalogue + the two standing-check outcome paragraphs
- [x] Run live suite + per-check mutation proof

## 🔗 Related

- [[CORE-EPIC-739]] — parent epic (drift-check-integrity)
- [[CORE-739.3]] — follow-up: the self-test that seeds drift into a temp copy
- [[CORE-734.7]] — predecessor: pair_h's empty-side guard, the pattern this generalises
- [[CORE-734.2]] — predecessor: moved the checks into this script; its tar-copy proof ran pair_q vacuously

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All fifteen checks pass today, and several would still pass with their input gone: a renamed `## Budgets` heading, missing `codex/skills/`, a reshaped `description:` key, or a copy with no `.git` all leave the loop empty and the check `ok`.

- [x] Read relevant source files — `tools/drift-checks.sh` (all 474 lines), `step-7.1-mirror-pairs.md` header, `step-7.1-standing-checks.md` outcome paragraphs for shipped_skill_parity and context_budget.

- [x] **Best Practices Review** — The shape rules forbid helper functions (the dispatcher runs every top-level function as a check), so each floor is inlined: `n=0`, `n=$((n+1))` at the compare site, `[ "$n" -gt 0 ] || { echo "VACUOUS <check>  …"; exit 1; }` before the existing `bad` exit. Same shape as pair_h's empty-side guard. No duplication beyond that one line per check, which is the file's existing idiom (`[ -z "$bad" ] || exit 1`).

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/` confirmed). 13 hits for `drift-checks.sh`; grep for vacuous/empty narrowed them to the load-bearing ones:
  - CORE-734.7: pair_h failed open on two empty extractions; fixed with `NO VALIDATION ROSTER` / `NO VALIDATE RUN STEPS`. That is the precedent — pair_h is already floored.
  - CORE-734.2: its mutation copy was built with `git ls-files -co | tar` (no `.git`), so pair_q ran vacuously and nobody noticed. After this task, final_newline and pair_q fail `VACUOUS` in such a copy. That's intended, but **CORE-739.3's temp copy must carry git state** (`git init && git add -A` or a worktree), or those two checks fail in the self-test baseline for the wrong reason.
  - CORE-734.5: pair_j's per-stub `continue` (no flags documented) is deliberate. The floor counts flags compared across all stubs, so the per-stub skip stays.

- [x] **Drift check** — PLAN line matches: the named known cases (context_budget's Budgets-table read; pair_b/J/M `|| continue` skips) are all present at the cited sites (L109, L139, L214/L216, L259). The extra cases come from the sweep: shipped_skill_parity (two empty finds diff clean), pair_c (`grep -rn` on a missing `templates/` exits 2, so `if` is false and the check passes), final_newline/pair_q (`git ls-files` empty outside a repo), pair_n/o (no filers found), pair_p (no post-floor notes), and pair_r (both PLAN files missing). skill_pin_guard_parity needs exactly `7 ` (an empty read fails) and pair_h has its guard, so both are already floored. pair_n's "Vacuous at birth, on purpose" comment is history: it now has 7 filers, and pair_o has 8.

- [x] No clarifications needed. Assumptions: (1) the floor is per-check total, not per-row/per-file, so legitimately empty rows such as a glob matching only exempted files or a stub with no flags stay legal; (2) the finding text is `VACUOUS <check>` plus a short unit hint (e.g. `VACUOUS pair_b  no Codex-paired description compared`); (3) the "compared" unit is what decides drift: flags for J/M, non-empty flag-set pairs for B, citations for Q, stub rows for R; (4) the catalogue gets one sentence, not per-pair entries.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** See above. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended pair_h's CORE-734.7 empty-side guard (`[ … ] || { echo …; exit 1; }` before the `bad` exit) to a per-check counter; no helper function, since the dispatcher runs every top-level function as a check

- [x] **Minimal refactor gate** — one rename for Acceptance: context_budget's size variable `n` → `sz`, freeing `n` for the counter. shipped_skill_parity's inline `diff <(find…) <(find…)` became two captured lists so the empty case can be tested. Nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A in-repo: the standing self-test is CORE-739.3's deliverable; this task's proof is the scratchpad mutation run (Testing Notes)

**Implementation Notes:**

- `tools/drift-checks.sh`: header bullet stating the floor, the per-check (not per-row) scope, the `n=$((n+1))` rule, and why skill_pin_guard_parity and pair_h need no counter.
- What counts toward each floor: stub files (wrapper_name_invariant; an unmatched glob is now skipped via `[ -f ]` so it counts zero instead of reporting a bogus NO SELF-NAME), either inventory non-empty (shipped_skill_parity), measured surfaces (context_budget), non-empty tracked files (final_newline), non-empty flag-set pairs (pair_b), files under `templates/` (pair_c), flags checked (pair_j, pair_m), filer files (pair_n, pair_o), post-floor notes (pair_p), non-skipped citations (pair_q), stub rows read (pair_r).
- pair_n's "vacuous at birth" note now says the floor fails that state.
- `step-7.1-mirror-pairs.md` (one sentence after the FAILED-line guidance) and `step-7.1-standing-checks.md` (one clause each in the shipped-parity and context-budget outcome paragraphs) now say what a `VACUOUS` line means.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full `bash tools/drift-checks.sh` (the script is the whole suite) plus the scratch mutation runs

- [x] Ran lint/type-check on changed code — `bash -n` clean; `shellcheck -S warning` shows only SC2088 on pair_q's deliberate `'~/'*` pattern, also present at HEAD

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — shell script and markdown only

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:
- `grep -c 'echo "VACUOUS ' tools/drift-checks.sh` → exit 0 (13)
- `bash tools/drift-checks.sh` → exit 0, 15 `ok`
- `bash --version` → 3.2.57; `sed -n 's/^\([a-z][a-z0-9_]*\)() {$/\1/p' tools/drift-checks.sh | wc -l` → 15; the one `((n++))` hit is the header comment that forbids it
- `grep -n VACUOUS claude/skills/ft-release/step-7.1-*.md` → exit 0 (mirror-pairs 1, standing-checks 2)
- Mutation proof: the scratch copy is `git ls-files -co | tar` + `git init && git add -A`, with one mutation per check (rm the stubs / both skill trees / `codex/skills` / `templates` / archive / both PLAN files / `.git`; rename `## Budgets` and `argument-hint:`; rewrite the pair_n/pair_o trigger literals). All 13 → `VACUOUS <check>` + `<check> FAILED`, rc=1, run twice (before and after the review fixes).
- Review-fix edges: a `/**` row naming a missing dir → `MISSING DIR` + FAILED; all hints stripped → 5 MISSING HINT and no VACUOUS; `claude/commands` removed → 12 MISSING STUB and no VACUOUS; `codex/skills` removed → the diff with no phantom blank line.

External review (`/code-review medium`, working-tree diff), 10 findings, no blockers:
1. Note, fixed: a `/**` row with a missing dir counted as measured (sz=0) → now `MISSING DIR`.
2–3. Note, fixed: pair_j MISSING HINT and pair_m MISSING STUB `continue`d before counting, so real findings also printed a misleading VACUOUS → those branches now count as examined.
4. Note, already fixed: the acceptance grep now reads `echo "VACUOUS ` → 13.
5. Note, fixed: a phantom blank line when one inventory was empty → `[ -z ] \|\| printf`.
6. Note, kept: pair_c's floor counts files under `templates/`, which is exactly the set `grep -r` scans.
7–8. Note, fixed in docs: the catalogue said VACUOUS covers every check → it now excepts pair_h and names its own empty-read findings. skill_pin_guard_parity has no catalogue entry, and the header records it.
9. Note, not taken here (altitude): enforce the floor once in the dispatcher. The inline idiom matches pair_h's guard and keeps each check self-contained. Left for CORE-739.N to weigh, together with whether CORE-739.3's self-test already catches a new check that lacks a floor.
10. Note, deferred to CORE-739.3: the `.git` dependency is intended and documented in the header; 739.3's temp copy must carry git state.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any README §"AI-referenced docs" entry: README.md, AGENTS.md, CONVENTIONS.md and AGENT-NEUTRALITY.md name the script or job but not finding semantics; the rest don't touch it. Updated: the two step-7.1 release fragments (deliverables).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; the rule lives in the script header, where every check author reads it.

**Final Summary:**

Changed: `tools/drift-checks.sh` (header floor rule; 13 checks floored; context_budget `n`→`sz`; `/**` MISSING DIR; shipped_skill_parity diff now runs on captured lists), `step-7.1-mirror-pairs.md` (+1 sentence), and `step-7.1-standing-checks.md` (+2 clauses). Verified as listed in Testing Notes. `touches:` reconciliation: `git diff --name-only` = the three declared paths exactly. Effect on maintainability: a dry read now fails loudly; in exchange each new check must carry its own floor (review note 9, for CORE-739.N).

**Archived:** 2026-10-08
