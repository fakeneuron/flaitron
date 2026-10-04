---
title: spec-md-headroom-trim
status: completed
tags: [context-budget, spec, epic-child]
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-574, CORE-574.4, CORE-558.5, CORE-574.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-574.5 | spec-md-headroom-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-574]] [[CORE-574.4]] [[CORE-574.N]]

## 🎯 Goal

Confirm that `SPEC.md` holds at least one measured working unit of headroom under its 57,000-char budget, or — if it does not — move one narrow-use section into a lazy `SPEC/` module to restore it, without editing the Budgets table.

## ✅ Acceptance

- [x] `SPEC.md` holds ≥ one working unit of headroom by its own measured unit (CORE-558.5: +2,957 max) — `test $(wc -c < SPEC.md) -le 54043`
- [x] `SPEC.md` holds ≥ the epic's ~3,400-char floor — `test $(wc -c < SPEC.md) -le 53600`
- [x] CI context-budget step passes locally — the `.github/workflows/ci.yml` "Context budget" loop re-run from the shell, exit 0
- [x] `docs/CONTEXT-BUDGET.md` §"Budgets" table is not edited — `git diff --name-only` excludes it
- [x] Seam survey recorded in Discovery Notes — which sections remain, why none is a clean verbatim extraction, and the two-unit gap stated in numbers — `judgment`: a record, not a command
- [x] Repo validation gates — `N/A` as written (`AGENTS.md` §"Validation" scopes them to viz + the fleet updater); no code changed

## 🧩 Subtasks

- [x] Measure `SPEC.md` (`wc -c`) and compute headroom against the three units on file (CORE-558.5 max +2,957 · CORE-555 +2,567 · epic ~3,400)
- [x] Section map by heading; survey the remaining candidates for a narrow-use verbatim seam
- [x] Decide the branch with the operator (confirm vs. trim)
- [x] Re-run the CI context-budget loop locally; record the receipt
- [x] Close on the confirm branch: findings in Final Summary, ledger left to the next `/ft-release` §7.1

## 🔗 Related

- [[CORE-EPIC-574]] — parent epic (drift-ci-and-budget-headroom); no `.1` Discovery note — Discovery supplied by audit-repo 2026-09-11, so no Fan-out to echo
- [[CORE-574.4]] — depends-on: the sibling that ran the same check on `ft-task/SKILL.md` (verbatim extraction to a lazy fragment; ledger left to the next release cut)
- [[CORE-558.5]] — related-decision: set the 57,000 cap and measured SPEC.md's working unit at +1,127 to +2,957 across 45 touching commits
- [[CORE-574.N]] — follow-up: epic closure audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line offers two branches with a decision rule — confirm ≥ one working unit, else extract. The measurement resolves it to the confirm branch (numbers below); the task remains exactly as filed, no re-scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Read:** `SPEC.md` (section map below), `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Known over budget" / §"Ledger", `.github/workflows/ci.yml` "Context budget" step (CORE-574.2), `SPEC/epic.md` (no `.1` — nothing to echo), `SPEC/scope-boundaries.md` §"Cross-repo edit remit" (the module behind one candidate), `claude/skills/ft-release/step-7.1-mirror-pairs.md` line 240 (why the three compact summaries stay in SPEC core).

**Measurement:** `SPEC.md` = **51,817** chars (PLAN line said 51,188 at audit time; +629 since, CORE-577.2). Cap 57,000 → headroom **5,183**. Against the units on file: CORE-558.5's re-derived max substantial edit +2,957 → **1.75 units**; CORE-555's +2,567 → **2.0 units**; the epic's ~3,400 (the `ft-task` body's unit, not SPEC.md's) → **1.5 units**. The task's own criterion (≥ one unit) is met by every measure. The ledger's two-unit standard is met at +2,567 and missed by **731** at +2,957.

**Section map (`## ` headings, chars):** The 4-phase workflow 19,814 (Phase 1 5,717 · Phase 4 7,129 · Phase 3 3,291 · Phase 2 1,744 · gate cues 1,520) · Post-closure protocol 7,160 · Tasknote frontmatter 5,295 · Tasknote body shape ~4,660 · Task-line format 4,531 · Paper-complete guard 2,849 · Task ID convention 1,566 · What flowtron does NOT provide 1,018 · When to use a tasknote 915 · Cross-repo edit remit 822 · Loop tasks 811 · everything else < 600 each.

**Seam survey — why no verbatim extraction is on the table:**
- Every section ≥ 1,500 chars is every-task material (phase checklists, closure protocol, frontmatter schema, task-line grammar, paper-complete guard). Extracting any of it defers happy-path load without shedding it — the "gaming the number" case `docs/CONTEXT-BUDGET.md` names.
- The three sub-1,100 summaries that *look* narrow-use — §"Cross-repo edit remit", §"Loop tasks", §"What flowtron does NOT provide" — are each already a compaction of a lazy module (`scope-boundaries.md`, `loop.md`) with a pointer, and were **deliberately restored by [[CORE-558.2]]** after [[CORE-535.4]]'s trim lost them; `step-7.1-mirror-pairs.md` records them as a class kept in SPEC core on purpose. Re-compacting them re-litigates that restore.
- [[CORE-535.3]] already moved ten narrow-use sections out verbatim; what remains after it and CORE-558.2 has no branch-conditional block of the shape [[CORE-574.4]] found in `ft-task` Step 0.
- Therefore the only way to gain the missing 731 (+ stub cost) is a prose trim — the exact failure mode [[CORE-EPIC-558]] spent three children repairing, where every loss found was a disambiguator at a decision point.

**Best Practices Review:** `N/A` — no code or module-boundary work; a measurement task.

**Archive skim:** 45 notes cite `CONTEXT-BUDGET`; the load-bearing lineage is [[CORE-535.3]] (SPEC.md 78,119 → 49,005 by ten verbatim moves), [[CORE-535.4]] → [[CORE-558.2]] (trim lost fidelity; restore added 2,281 and minted the three summaries above), [[CORE-555]] / [[CORE-558.5]] (cap raises; both record the working-unit measurements used here), [[CORE-574.4]] (sibling: extracted a branch-conditional block, left the ledger to the release cut).

**Drift check:** PLAN figure 51,188 is stale by 629 (routine growth, within the +5..+283 routine band × 2); the cap and the CI step match the PLAN description; nothing else cited. No SPEC contradiction — the branch taken is the one the line names first.

**Clarifying question asked:** confirm-only vs. trim-to-two-units. Operator chose **confirm only**. Assumptions asserted: the ledger row is refreshed by the next `/ft-release` §7.1, not here (CORE-574.4 precedent); the two-unit shortfall is recorded for [[CORE-574.N]] to weigh, not silently dropped.

**`touches:`** omitted — no file deliverable on the confirm branch.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Confirm branch — no source edit. Pattern survey / refactor gate `N/A` (nothing changed); "minimal solution" is the measurement and the seam survey recorded in Discovery Notes. Tests `N/A` — no behavior changed. `docs/CONTEXT-BUDGET.md` deliberately untouched: the cap stands, and the §"Ledger" row is the next `/ft-release` §7.1's job, as [[CORE-574.4]] left it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `test $(wc -c < SPEC.md) -le 54043` → **0** (51,817)
- `test $(wc -c < SPEC.md) -le 53600` → **0**
- `.github/workflows/ci.yml` "Context budget" step, extracted and run with `bash` from the repo root → **0** (every budgeted surface under its cap)
- `git diff --name-only` → only this tasknote (pre-closure); `docs/CONTEXT-BUDGET.md` absent
- Lint/type-check `N/A` — no code changed; `.editorconfig` hygiene on this note (no trailing whitespace, final newline) checked at closure
- 👁️ `N/A` — no frontend change

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** `README.md` · `AGENTS.md` · `SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` — **no change**, all twelve: nothing outside this tasknote and PLAN.md was edited.

**Final Summary:**

`SPEC.md` measures **51,817 / 57,000 → 5,183 chars of headroom**. That is ≥ one working unit by every measure on file — 1.75× CORE-558.5's re-derived +2,957 max, 2.0× CORE-555's +2,567, 1.5× the epic's ~3,400 (which is the `ft-task` body's unit, not SPEC.md's) — so the task's confirm branch closes it with no edit to the contract. The CI context-budget step re-run locally exits 0.

**What was not done, and why:** the ledger's two-unit standard is missed by **731 chars** at the +2,957 unit (met at +2,567). Closing that gap is not a verbatim extraction: [[CORE-535.3]] already moved every narrow-use section out, and the three compact summaries that look like candidates (§"Cross-repo edit remit" 822 · §"Loop tasks" 811 · §"What flowtron does NOT provide" 1,018) were deliberately restored by [[CORE-558.2]] and are recorded in `step-7.1-mirror-pairs.md` as a class kept in SPEC core on purpose. Everything larger is every-task material whose extraction would defer load without shedding it. The only remaining lever is a prose trim — the failure mode [[CORE-EPIC-558]] repaired — so the operator chose confirm-only, and the 731 gap is recorded here for [[CORE-574.N]] to weigh.

**Changed:** nothing outside workflow artefacts (this tasknote, `.flowtron/PLAN.md`). `docs/CONTEXT-BUDGET.md` untouched — cap unchanged; the §"Ledger" row (49,285 at v5.26.0, now 51,817) is the next `/ft-release` §7.1's job, as [[CORE-574.4]] left it.

**Verification:** `wc -c` ≤ 54,043 and ≤ 53,600 both exit 0; CI budget loop exit 0; `git diff --name-only` excludes `docs/CONTEXT-BUDGET.md`.

**`touches:` reconciliation:** omitted (no file deliverable); `git diff --name-only` at closure = PLAN.md + this note only. Consistent.

**Refactors deferred:** none proposed. **Flag for the epic audit:** SPEC.md's routine growth since v5.26.0 is +2,532 across 8 commits; at that rate the next substantial contract task lands headroom near 2,200 — below one unit — so [[CORE-574.N]] may want to decide whether the two-unit standard or the one-unit floor is the epic's actual bar before closing.

**Archived:** 2026-09-11
