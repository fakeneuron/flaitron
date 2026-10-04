---
title: drift-ci-and-budget-headroom audit
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-574, CORE-574.2, CORE-574.3, CORE-574.4, CORE-574.5]
touches:
  - AGENTS.md
  - README.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-574.N | drift-ci-and-budget-headroom audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-574]]

## 🎯 Goal

Verify the completed `CORE-EPIC-574` (`drift-ci-and-budget-headroom`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `chore: CORE-574.N — audit CORE-EPIC-574` commit lands (doc-only inline fixes, no code)
- [x] PLAN.md line for `CORE-574.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-574.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-574` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-574.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-574]] — parent epic (Discovery supplied by audit-repo 2026-09-11; no `.1` child)
- [[CORE-574.2]] — ci-context-budget-check
- [[CORE-574.3]] — ci-pairs-j-m
- [[CORE-574.4]] — ft-task-headroom-trim
- [[CORE-574.5]] — spec-md-headroom-trim

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-574.N` invoked by the operator; all four implementation children (`.2`–`.5`) closed 2026-09-11, no early-audit decision needed. The epic had no `.1` — Discovery was supplied by the 2026-09-11 audit-repo pass, which is itself a scoping input this audit re-checks (see Discovery Notes).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` (verification pass over docs/CI; the three inline fixes are one-clause prose corrections) — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — self-referential (the four cohort archives are the read set); non-cohort precedents CORE-543 (Pair L), CORE-558.5 (unit measurement), CORE-556.2 (fragment extraction) already cited by the children and re-read via their notes — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — every cohort deliverable re-verified at HEAD (see Discovery Notes); PLAN line and `SPEC/epic.md` audit shape match — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Cohort inventory (archived tasknotes read):**
- **CORE-574.2** `ci-context-budget-check` — new `Context budget` step in the CI `drift` job parsing `docs/CONTEXT-BUDGET.md` §"Budgets" at run time (most-specific-row-wins precedence); §7.1 "Standing context-budget check" now runs the identical script; Pair L row + "seven → eight lifted checks"; rewrote `docs/CONTEXT-BUDGET.md` §"How this is enforced"; `docs/CONVENTIONS.md` roster line.
- **CORE-574.3** `ci-pairs-j-m` — lifted Pair J and Pair M into `drift` as two steps; Pair L rows + "eight → ten"; corrected the "release-gate only" lists to `(A, B, C, E, J, M, N)`; `docs/CONVENTIONS.md` roster line.
- **CORE-574.4** `ft-task-headroom-trim` — extracted the Step 0 flag walk into `claude/skills/ft-task/step-0-flags.md` (4,700), read only when a flag is present; `SKILL.md` 31,839 → 28,199 (headroom 4,801); one clause in `docs/PLATFORMS.md`.
- **CORE-574.5** `spec-md-headroom-trim` — confirm branch, no edit: `SPEC.md` 51,817 / 57,000 → 5,183 headroom; seam survey recorded; flagged the ledger's two-unit standard (missed by 731 at +2,957) for this audit to weigh.

**Drift check at HEAD (2026-09-11):** `ci.yml` `drift` job carries 11 steps = 10 lifted checks (Pair E is two steps) — matches Pair L's ten mapping rows and its "ten lifted checks" sentence; `docs/CONVENTIONS.md:58` roster `A, B, C, E, J, M, N` + context-budget matches `step-7.1-mirror-pairs.md:241`; `step-0-flags.md` exists and is dispatched from `SKILL.md` Step 0 with all four flag literals still in the body (the `docs/EXTERNAL-AGENTS.md` capability probe still answers); sizes: `SPEC.md` 51,817 · `ft-task/SKILL.md` 28,199 · `SPEC/gates.md` 35,943 · `ft-release/SKILL.md` 30,619.

**Regression check:** every `drift`-job `run:` block extracted via `js-yaml` and executed locally under `bash -e` (GitHub's default `run:` shell — a first pass under `-eo pipefail` produced three false FAILs from `grep -o` matching nothing) → 11/11 PASS. Remote CI has not yet run on the cohort commits (last run predates the epic), so the local run is the regression evidence.

**Epic-bar decision (answers CORE-574.5's flag):** the epic's own PLAN line sets the bar at "≥ one measured working unit (~3,400 chars) of headroom on every budgeted surface" — the one-unit floor, not the ledger's two-unit *sizing* standard (which governs where a cap is set, not whether a surface passes). `SPEC.md` at 5,183 clears it; no further action on `SPEC.md`.

**"Every budgeted surface" re-check:** the audit-repo Discovery filed children for `ft-task` and `SPEC.md` only. Measured headroom across all budgeted surfaces at HEAD: `SPEC/gates.md` 4,057 (unit +2,567, CORE-536 — clears); `ft-release/SKILL.md` 9,381 (clears); `claude/skills/ft-file-followup/SKILL.md` **2,118** — below the ~3,400 floor and below its own unit (last substantial edits: CORE-570 +3,091, CORE-577.4 +2,874, CORE-563 +925). **Miss** → follow-up candidate.

No clarifications needed. Assumptions: (1) the three stale-claim fixes are in-audit scope (one clause each, all falsified by CORE-574.2's CI lift); (2) the `ft-file-followup` headroom gap is filed, not fixed here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A` (no new shape; three prose clauses) — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — no refactor; each edit is the minimum clause that makes the sentence true — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` (no behavior)

**Implementation Notes:**

**Coherence findings:** cohort deliverables are mutually consistent — Pair L rows, lifted-check count, CONVENTIONS roster, and the "release-gate only" lists all agree at HEAD; `.3` correctly found `.2`'s `Context budget` step in place and extended the same shape; `.4`/`.5` left `docs/CONTEXT-BUDGET.md` §"Budgets" untouched as required and both defer the §"Ledger" refresh to the next `/ft-release`.

**Cumulative staleness surfaced (missed by per-task closures):** three sentences still described enforcement as release-only after CORE-574.2 lifted it into CI. CORE-574.2's own sweep concluded "no other entry on that list references the context-budget check" — `AGENTS.md` and `README.md` do, in passing, and the §"Budgets" intro inside `docs/CONTEXT-BUDGET.md` (off the sweep list) contradicted the §"How this is enforced" paragraph the same task rewrote. Inline fixes applied:
- `AGENTS.md:71-72` — "enforced at release" → "enforced in CI and at release" (rewrapped ≤80).
- `README.md:107` — "the release-time check that keeps them honest" → "the CI and release-time checks that keep them honest".
- `docs/CONTEXT-BUDGET.md` §"Budgets" intro — "Checked at every release cut by `/ft-release` §7.1" → "Checked on every push by the CI `drift` job and at every release cut by `/ft-release` §7.1".

**No regressions** in earlier-shipped cohort surfaces (drift job 11/11 locally after the edits).

**Misses → `/ft-file-followup` candidates (file after closure):**
- **`ft-file-followup-headroom-trim`** — `claude/skills/ft-file-followup/SKILL.md` 30,882 / 33,000, headroom 2,118 < one working unit (~3,000 on this body) and < the epic's ~3,400 floor; the epic's "every budgeted surface" promise was scoped by Discovery to two surfaces. Recipe: CORE-574.4's lazy-fragment extraction (`park-mode.md` / `starter-mode.md` already exist — the unattended posture or the ID-allocation block are the candidate seams), never a cap raise. `[medium]`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code; ran the CI `drift` job locally (11/11) and `node --test tools/update-adopters.test.mjs` (51 pass / 0 fail)

- [x] Ran lint/type-check on changed code — `git diff --check` clean; `.editorconfig` hygiene (≤80 cols on the rewrapped `AGENTS.md` lines, final newline)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user — `N/A`, no frontend for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node run-drift.mjs` (js-yaml extraction of every `drift` `run:` block, `bash -e`) → 0 (11/11 PASS, before and after the inline fixes)
- `node --test tools/update-adopters.test.mjs` → 0 (51 pass)
- `git diff --check` → 0
- `awk 'length > 80' AGENTS.md README.md` on edited lines → none over

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` **updated** (§docs list: CI + release-time checks) · `AGENTS.md` **updated** (repo-layout `docs/` bullet: enforced in CI and at release) · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (its CONTEXT-BUDGET pointer makes no enforcement claim) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (roster already updated by `.2`/`.3`, verified consistent) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change (`.4`'s clause present; the `skills/` bullet's fragment list is "including", non-exhaustive) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (capability-probe literal still in the `ft-task` body) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change. Off-list but cohort-touched: `docs/CONTEXT-BUDGET.md` **updated** (§"Budgets" intro).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audit of `CORE-EPIC-574` closed with no cohort inconsistencies; three cumulative stale enforcement claims fixed inline (`AGENTS.md`, `README.md`, `docs/CONTEXT-BUDGET.md` §"Budgets" intro); one miss recorded for `/ft-file-followup` filing — `ft-file-followup/SKILL.md` headroom 2,118, below the epic's floor. CORE-574.5's two-unit flag resolved against the epic's own one-unit bar. Drift job 11/11 locally; fleet-updater suite 51/0.

**Changed:** `AGENTS.md` (1 clause, rewrapped), `README.md` (1 clause), `docs/CONTEXT-BUDGET.md` (1 clause) — matches declared `touches:`; plus `.flowtron/PLAN.md` and this note (workflow artefacts). Documentation verdict: sweep walked, two on-list docs updated, sixteen unchanged. Maintainability effect: the CI/release split introduced by `.2` is now stated consistently on every surface that describes it.

> **Parent-flip decision:** operator confirmed **Yes** at the 📦 gate — `CORE-EPIC-574` flipped to stub form and the cohort (`.2`–`.5`, `.N`) moved atomically to the top of `## Completed`; `## High` restored to `(none)`.

**Archived:** 2026-09-11
