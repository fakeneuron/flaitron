---
title: large-docs-budget-decision
status: completed
tags: [context-budget, docs]
created: 2026-09-22
due:
related-tasks: [CORE-EPIC-670, CORE-670.2, CORE-670.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-670.4 | large-docs-budget-decision

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-670]]

## 🎯 Goal

Record an explicit budget-or-exempt call for `docs/MIGRATION.md` and `docs/PLATFORMS.md` in `docs/CONTEXT-BUDGET.md` — operator chose **exempt explicitly** — so the two largest unbudgeted docs stop sitting under the blanket `docs/` clause by omission.

## ✅ Acceptance

- [x] §Budgets "Not budgeted, deliberately" names both docs with the section-addressed reason — `awk '/^\*\*Not budgeted, deliberately/,/^## Cap history/' docs/CONTEXT-BUDGET.md | grep -o 'docs/MIGRATION.md\|docs/PLATFORMS.md' | wc -l` ≥ 2
- [x] §Ledger carries a "Large reference docs" subsection whose figures match `wc -c` today — `grep -q '^### Large reference docs' docs/CONTEXT-BUDGET.md` + `wc -c docs/MIGRATION.md docs/PLATFORMS.md` vs the recorded numbers
- [x] The ledger entry names the trigger that would earn either doc a §Budgets row — `judgment` (prose; grep for "earns a row" in the subsection)
- [x] §Budgets table rows unchanged and the CI context-budget step passes — `git diff -U0 docs/CONTEXT-BUDGET.md | grep -E '^[-+]\| \`'` prints nothing; CI step script → exit 0

## 🧩 Subtasks

- [x] Extend the "Not budgeted, deliberately" paragraph to name both docs explicitly with the reason (read by section, never whole)
- [x] Add `### Large reference docs` under §Ledger: measured sizes, growth since 2026-06-01, the per-reader access pattern, and the earns-a-row trigger
- [x] Run the CI context-budget step locally; verify Budgets table untouched

## 🔗 Related

- [[CORE-EPIC-670]] — parent epic (context-headroom)
- [[CORE-670.2]] / [[CORE-670.3]] — sibling children, closed; same doc
- [[CORE-492]] — related-decision: sweep-list per-task cost rule the ledger reasoning leans on

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both docs are still the largest unbudgeted `docs/` files (62,249 / 67,894) and the §Budgets exemption covers them only by the blanket `docs/` word; no call has been recorded.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sizes / growth** (`git show <rev>:<file> | wc -c`): MIGRATION 33,194 (2026-06-01) → 62,249 (1.9×); PLATFORMS 21,497 → 67,894 (3.2×). The "no ratchet" pattern §"Why byte budgets" describes — but on files outside the load path it measures.
- **Access pattern** (grep of `claude/`, `codex/`, `cursor/`, `grok/`, `SPEC/`): every reader is section-addressed — `ft-new-project` cites MIGRATION §1.1–§1.7 / §2 / §3 / §"Pinning and bumping"; `ft-release` greps the `describe --tags` pin and `awk`s §1.6, and reads PLATFORMS §"Installed-surface policy"; `SPEC/model.md` points at PLATFORMS §"Platform×model×effort calibration table"; `ft-update` cites MIGRATION §"Retired skills…". No runner loads either whole.
- **Sweep list:** both are on `.flowtron/tasknote/README.md` §"AI-referenced docs", walked each Phase 4 closure — a judgment walk (grep for the touched contract), not a full read; §"Not on the doc-drift sweep list" already reasons about per-task sweep cost ([[CORE-492]]).
- **CI:** the drift step parses only `| \`surface\` | N |` rows between `## Budgets` and `## Known over budget`; prose edits in that span are inert. No CI edit needed for either option.
- **Best practices:** doc-only; single file; extends the existing "Not budgeted" paragraph and adds one Ledger subsection beside its siblings (no new mechanism).
- **Archive skim:** `grep -l` for both paths × "budget" in `archive/core/` hits only pre-budget CORE-0xx notes (no prior budget call); CORE-670.2/.3 touched the doc but not these files.
- **Drift check:** PLAN line sizes (62 KB / 68 KB) match `wc -c`. Plan agrees with the PLAN line ("budget or ledger-exempt; record in §Ledger") and with §Budgets' own rule ("a lazy module that starts arriving on most tasks earns a row").
- **Clarification:** AskUserQuestion — operator chose **Exempt explicitly** over "Budget both" / "Hybrid".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose-only doc edit; the CI budget step is the executable check

**Implementation Notes:**

- Pattern: extended the existing §Budgets "Not budgeted, deliberately" paragraph (one sentence) and added `### Large reference docs` as a sibling of the other §Ledger `###` subsections — same `path size · path size` line shape. No new mechanism.
- Mid-execution correction: the first draft's re-budget trigger ("a section a runner reads that grows past ~15,000 chars") was already exceeded on day one — PLATFORMS §"Non-Claude capability triggers" is 34,235, MIGRATION §1 35,456. Measured at the heading depth readers cite (`###`), MIGRATION's largest is §1.2.1 at 11,992. Replaced the invented threshold with the two measured largest-cited-section figures and a split-the-section-not-cap-the-file remedy. Same pass surfaced a missed reader (`SPEC/procedures/ft-task.md` → PLATFORMS §"Non-Claude capability triggers"); added.
- No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no frontend change. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:
- `awk '/^\*\*Not budgeted, deliberately/,/^## Cap history/' docs/CONTEXT-BUDGET.md | grep -o 'docs/MIGRATION.md\|docs/PLATFORMS.md' | wc -l` → 2 (exit 0). (Acceptance originally said `grep -c`; both names share a line, so `-o | wc -l` is the correct count.)
- `grep -q '^### Large reference docs' docs/CONTEXT-BUDGET.md` → 0
- `awk '/^### Large reference docs/,/^## How this/' … | grep -c 'earns a §"Budgets" row'` → 1; figures in subsection `62,249 67,894 34,235 11,992` match `wc -c` / heading-span `awk` measurements taken this task.
- `git diff -U0 docs/CONTEXT-BUDGET.md | grep -E '^[-+]\| \`'` → exit 1 (no table-row changes)
- CI "Context budget" step extracted from `.github/workflows/ci.yml` and run locally → exit 0
- Trailing-whitespace grep → none; final newline present.
- External review: `/code-review low docs/CONTEXT-BUDGET.md` (forked context, did not write the diff) → no findings; it independently re-derived the 3.2× / 1.9× growth ratios and checked each cited-section figure is below its file total. No blockers, no notes.
- Structural quality: prose-only; no duplication (figures live only in §Ledger, the §Budgets sentence points there).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — no change to any listed doc (README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION): the diff is confined to `docs/CONTEXT-BUDGET.md`, which is deliberately off the list, and makes no claim any listed doc restates. MIGRATION/PLATFORMS are the *subject* of the ledger entry, not edited.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? N/A — the lesson (measure at the heading depth readers cite before writing a size threshold) is local to budget prose and now lives in the ledger entry itself.

**Final Summary:**

Operator chose **exempt explicitly**. `docs/CONTEXT-BUDGET.md` now names `docs/MIGRATION.md` and `docs/PLATFORMS.md` in §Budgets "Not budgeted, deliberately" instead of leaving them under the `docs/` glob by omission, and adds §Ledger → `### Large reference docs` with sizes (67,894 / 62,249), growth since 2026-06-01 (3.2× / 1.9×), each reader's section-addressed access, and the trigger for a budget row (a step that names the file with no section). It also records the largest cited sections (PLATFORMS §"Non-Claude capability triggers" 34,235; MIGRATION §1.2.1 11,992), with "split the section, don't cap the file" as the remedy.

- Changed: `docs/CONTEXT-BUDGET.md` (+~30 lines, prose only; §Budgets table untouched), plus this tasknote and the PLAN.md stub.
- Verification: all four Acceptance commands pass; the CI context-budget step run locally → exit 0; external review → no findings.
- Refactors: none. Deferred: none.
- Scope reconciliation: `git diff --name-only` = `docs/CONTEXT-BUDGET.md` (declared) + workflow files (PLAN.md, tasknote move); no undeclared deliverable paths.
- Maintainability: the next ledger refresh at release has a named figure to diff against, and the next budget audit finds an explicit, reasoned call instead of re-asking the question.

**Archived:** 2026-09-22
