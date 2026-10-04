---
title: archived-tasknote-integrity-check
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-610, CORE-610.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-610.2 | archived-tasknote-integrity-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-610]]

## 🎯 Goal

Add a machine check — CI `drift` step + `/ft-release` §7.1 pair — over `.flowtron/tasknote/archive/**` that, for tasknotes with `**Archived:**` ≥ 2026-09-20, requires `status: completed` and an `N/A —` / `not met —` annotation on every `- [ ]` under `## ✅ Acceptance`; pre-floor files are exempt by date, and the floor + check are documented in `docs/CONVENTIONS.md`.

## ✅ Acceptance

- [x] `/ft-release` §7.1 carries a **Pair P** block (bold-lead `**Pair P — `) whose fenced shell walks `.flowtron/tasknote/archive/*/*.md`, exempts files whose `**Archived:**` date is < 2026-09-20 (or unparseable), and flags `status:` ≠ `completed` and any unannotated `- [ ]` under `## ✅ Acceptance` — `grep -q '^[*][*]Pair P ' claude/skills/ft-release/step-7.1-mirror-pairs.md` + the block run on HEAD prints nothing → exit 0
- [x] CI `drift` job carries a `- name: Pair P …` step lifted from that block, bash-clean on HEAD — extract the step with the Pair L `awk` and run it → exit 0
- [x] Pair L binds the new step: mapping row `'Pair P|…|^[*][*]Pair P '` present and the Pair L block prints nothing on HEAD — run the Pair L fence → no output
- [x] Non-vacuity proven on a mutated copy: a scratch fixture dated 2026-09-20 with `status: in-progress` and one bare `- [ ]` under Acceptance makes the check print two findings and exit 1; removing the fixture restores exit 0 — recorded in Testing Notes
- [x] `docs/CONVENTIONS.md` documents the 2026-09-20 floor, the annotation forms, the exemption rule, and names Pair P in the `drift` roster — `grep -q '2026-09-20' docs/CONVENTIONS.md` + `grep -q 'Pair P' docs/CONVENTIONS.md`

## 🧩 Subtasks

- [x] Write the Pair P block in `claude/skills/ft-release/step-7.1-mirror-pairs.md` after Pair O (bold-lead, fenced `sh` block, "Must print nothing" prose, bullets: floor semantics, unparseable-date exemption, token-tolerant annotation match, lifted-into-CI note)
- [x] Lift the block into `.github/workflows/ci.yml` `drift` job as `- name: Pair P — archived-tasknote integrity (docs/CONVENTIONS.md §"Archived-tasknote integrity floor")` with `bad=` accumulator + `exit 1`
- [x] Add the `'Pair P|…'` row to Pair L's mapping; run Pair L to confirm the path sets agree
- [x] `docs/CONVENTIONS.md`: add `### Archived-tasknote integrity floor` under §"Adheres to" (floor date, what is checked, annotation forms, exemptions, forward-only rationale); add Pair P to the `drift` roster sentence in §"GitHub Actions CI"
- [x] Verify: run both copies on HEAD (exit 0), run the mutated-fixture proof, run Pair L, `wc -c` the touched budgeted files

## 🔗 Related

- [[CORE-EPIC-610]] — parent epic (archive-closure-integrity)
- [[CORE-610.3]] — sibling: makes the pre-archive closure step itself refuse unannotated boxes (upstream of this post-hoc check)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic's evidence reproduces on HEAD (survey below: 10 September archivals with bare `- [ ]` under Acceptance, 4 archived notes with `status:` ≠ `completed`); the check shape is the established §7.1 pair + lifted CI step (Pairs N/O precedent, bound by Pair L). Scope is exactly the PLAN line.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sources read.** `.github/workflows/ci.yml` (`drift` job: `- name:` + `run: |` steps, `bad=` accumulator idiom, Pair H comment forbidding single-line `- run:`), `/ft-release` SKILL.md §7.1 + `step-7.1-mirror-pairs.md` (Pairs A–O; O is the latest and the shape to copy; L is the CI↔§7.1 path-set binding with an explicit mapping row per lifted step), `docs/CONVENTIONS.md` §"GitHub Actions CI" (names the lifted roster "A, B, C, J, M, N, and O"), SPEC.md §"Acceptance tick-through" (the rule: annotate `N/A — <reason>` / `not met — <reason>`, never leave bare), `docs/CONTEXT-BUDGET.md` (mirror-pairs fragment has no budget row; `ft-release/SKILL.md` capped at 40,000 but is not touched here).
- **Archive survey (955 notes).** `**Archived:** YYYY-MM-DD` on 954; 1 carries a `(pending 📦 gate)` suffix; 2 legacy notes (CORE-410.3, CORE-577.6) still hold the `YYYY-MM-DD` placeholder. `status:` — 945 `completed`, 3 `in-progress` (CORE-471, CORE-499, CORE-593), 1 `complete` (CORE-412). Bare `- [ ]` under Acceptance in September: 10 files (CORE-535.1, 541, 553, 575.2, 579, 581, 586, 596, 605, 608). All pre-floor → exempt; at the 2026-09-20 floor the archive is green on HEAD, which is the epic's "never backfill" intent.
- **Annotation forms in the wild** are inconsistent (`N/A —`, `N/A,`, `not-met`, `not met**:`, `not met).`). The check keys on the **token** (`N/A` or `not[ -]met`, case-insensitive) rather than the em-dash, so a punctuation variant does not redden CI; CONVENTIONS documents the canonical `N/A — <reason>` / `not met — <reason>` form.
- **Unparseable date → exempt.** A note with no `**Archived:** YYYY-MM-DD` cannot be placed against the floor, so it is skipped. Known gap: a future closure that leaves the placeholder unfilled is invisible to Pair P. That is a different miss class (stamp, not tick-through) and sits with the sibling CORE-610.3's pre-archive gate; noted in CONVENTIONS, not closed here.
- **Floor constant appears in both copies** (§7.1 block + CI step). Pair L compares path sets, not literals, so the two floors are unbound — acceptable because the floor is set once and never moves (forward-only by construction); CONVENTIONS is the third restatement and the documented source.
- **Date compare** uses bash `[[ "$d" < "$floor" ]]` (lexical on ISO dates). `[ "$d" \> … ]` breaks under zsh ("condition expected"), which is the operator's shell for the §7.1 walk — verified during Discovery.
- **Archive skim.** 90+ notes touch `ci.yml` / the mirror-pairs fragment; load-bearing ones: CORE-543 (minted Pair L; lesson — prove every new step non-vacuous on a mutated copy, and confirm it still yields ≥1 path after the `echo`-strip), CORE-593 (Pair O, the latest pair and the shape copied here), CORE-577.6 (Pair N lift), CORE-603.2 (Pair E retired; letters are never reused). No prior note touches archived-tasknote integrity itself — the class is new.
- **Drift check.** PLAN line cites `docs/CONVENTIONS.md` and `/ft-release` §7.1 — both exist as described. Pair letters A–O taken; next is **P**. No SPEC contradiction: SPEC §"Write-once policy" says archived notes are historical, and the check reads but never edits them.
- **Best practices.** Extending the pair catalogue (one bold-lead + one fence + one CI step + one Pair L row) is the established shape; no new script, no new file. `No clarifications needed` — assumptions: Pair letter P; token-tolerant annotation match; unparseable-date exemption; floor 2026-09-20 hard-coded in both copies.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Copied Pair O's shape exactly: bold-lead paragraph with the failure history, one `sh` fence, "Must print nothing" prose naming each finding string and the fix direction, then a bullet list of design decisions. CI step in the `- name:` + `run: |` block-scalar shape with `bad=` accumulator and `[ -z "$bad" ] || exit 1`; body byte-identical to the §7.1 fence (diffed). One mapping row added to Pair L; Pair K's roster parenthetical and CONVENTIONS' roster sentence updated to name P.
- **No refactor.** Nothing touched beyond the four insertion points; no new file, no script.
- **Bug found and fixed during the proof.** First draft ended both command substitutions in a `grep` (`… | sed` after `grep -m1`, and `… | grep -viE`). Under CI's default `bash -e`, an assignment whose substitution exits non-zero terminates the step — so the first *clean* post-floor note (no bare boxes → `grep -v` returns 1) would have failed the job. Fixed with `|| true` on both substitutions in both copies; recorded as a Pair P bullet so the next lifted step does not repeat it. HEAD was green under `bash -e` only because no post-floor note exists yet — the mutated-copy proof (CORE-543's lesson) is what caught it.
- **CONVENTIONS placement.** New `### Archived-tasknote integrity floor` under §"Adheres to", between §"Dependency audit cadence" and §"Canonical source with labeled mirrors"; the CI step name cites it.
- **Tests.** No unit test surface for shell in this repo; the fixture matrix in Testing Notes is the test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [ ] (frontend) Asked the user for visual confirmation — N/A — no frontend change (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (all run from repo root, 2026-09-19):

- `grep -q '^[*][*]Pair P ' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0
- §7.1 Pair P fence extracted (Pair L `awk`) and run on HEAD: `bash` → 0, `zsh` → 0, no output
- CI Pair P step extracted and run on HEAD: `bash -e` → 0, `bash -eo pipefail` → 0, no output; `diff` §7.1 fence vs CI body → identical
- Pair L fence run on HEAD → 0, no output (path sets agree: `.flowtron/tasknote/archive/*`, `Acceptance/`, `N/A`, `s/.*` on both sides — non-vacuous after the `echo`-strip)
- Mutated-copy proof (scratch `archive/core/CORE-999.md`, deleted after; `git status --porcelain` shows only the four intended paths):
  - `**Archived:** 2026-09-20`, `status: in-progress`, one bare `- [ ]`, plus `N/A —`, `not met —`, `Not-Met:` boxes and a bare Subtasks box → prints `STATUS NOT COMPLETED` + one `UNANNOTATED BOX` (the bare Acceptance box only) → exit 1
  - same note stamped `2026-09-19` → no output, exit 0 (pre-floor exempt)
  - same note stamped `YYYY-MM-DD` → no output, exit 0 (unparseable exempt)
  - repaired (`2026-09-21`, `status: completed`, box ticked) → `bash -e` 0, `bash -eo pipefail` 0 (this is the case that failed before the `|| true` fix)
- Every `drift` step extracted and run locally under `bash -e` → all 11 exit 0
- `grep -q '2026-09-20' docs/CONVENTIONS.md && grep -q 'Pair P' docs/CONVENTIONS.md` → 0
- Lint/type-check: no code surface (`.yml` + markdown); YAML shape matches sibling steps and the block-scalar rule the workflow comment requires; Pair H extraction count unchanged (7 single-line `- run:` lines, all in `validate`). Structural: no duplication beyond the deliberate §7.1↔CI lift Pair L binds; no dead code; no public-surface growth; CONVENTIONS updated alongside.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `docs/CONVENTIONS.md` — updated (new §"Archived-tasknote integrity floor"; `drift` roster names Pair P). All other entries — README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — no change (none names the drift-job pair roster or the archive-integrity rule).

Added `/ft-release` §7.1 **Pair P** and its lifted CI `drift` step: every tasknote archived on or after 2026-09-20 must carry `status: completed` and no unannotated `- [ ]` under `## ✅ Acceptance`; pre-floor and unstamped notes are exempt, Pair L binds the two copies, and `docs/CONVENTIONS.md` documents the floor. On HEAD the check is green by construction (no post-floor archival exists yet); it first bites on the next closure.

- Changed: `.github/workflows/ci.yml` (+14), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (+33/−4: Pair P block, Pair L row, Pair K roster, coverage count), `docs/CONVENTIONS.md` (+12/−1).
- Verification: see Testing Notes — both copies green on HEAD in bash/zsh/`bash -e`/pipefail, Pair L clean, four-state fixture proof, all 11 drift steps green locally.
- Refactors: none. Deferred: the unstamped-`**Archived:**` gap is documented, not closed (belongs to CORE-610.3's pre-archive gate).
- `touches:` reconciliation: `git diff --name-only` = the three declared paths + this tasknote; no undeclared paths.
- Maintainability effect: the closure contract SPEC states now has a detector that fires on the commit that lands the miss, off the authoring machine, in the same idiom as the ten checks before it.

**Archived:** 2026-09-19
