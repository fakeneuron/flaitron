---
title: plan-filing-accumulate
status: completed
tags: []
created: 2026-10-02
due:
related-tasks: [CORE-429, CORE-591, CORE-593]
touches:
  - SPEC/plan-filing.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-file-followup/starter-mode.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-seed/SKILL.md
  - claude/commands/ft-file-followup.md
---

# CORE-682 | plan-filing-accumulate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-429]] [[CORE-591]] [[CORE-593]]

## 🎯 Goal

When a filing finds `.flowtron/PLAN.md` already dirty, commit that dirt with the new rows when it is only earlier task-row filings, so the next `/ft-task` is not stopped by an uncommitted plan.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` §"Filing commits" commits accumulated PLAN task rows with the new filing, skips when `git diff --cached --quiet` is non-zero, and skips when any other PLAN change is present — `grep -q 'Also lands earlier uncommitted filings' SPEC/plan-filing.md`
- [x] The line test accepts `git show 2d3ebb01 -- .flowtron/PLAN.md` and rejects a synthetic edit of an existing task row — `/tmp/core-682-classify.py` exits 0
- [x] Each filing runner that sets `auto-commit = ` still has a non-quiet `git diff --cached` and a resolving `SPEC/*.md` §"Filing commits" citation — Pair O shell exits 0
- [x] The index probe `git diff --cached --quiet` remains on the runners CORE-591 bound, plus seed — `test $(grep -l 'diff --cached --quiet' claude/skills/ft-file-followup/SKILL.md claude/skills/ft-file-followup/park-mode.md claude/skills/ft-audit/SKILL.md claude/skills/ft-refactor/SKILL.md claude/skills/ft-seed/SKILL.md | wc -l) -eq 5`
- [x] Skill bodies stay under 33,000 bytes — `test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 33000 && test $(wc -c < claude/skills/ft-audit/SKILL.md) -le 33000 && test $(wc -c < claude/skills/ft-refactor/SKILL.md) -le 33000 && test $(wc -c < claude/skills/ft-seed/SKILL.md) -le 33000`
- [x] `claude/commands/ft-file-followup.md` no longer says a filing is skipped whenever PLAN.md already carried other edits — `! grep -q 'skipped when PLAN.md already carried other edits' claude/commands/ft-file-followup.md`
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — `judgment` (each entry recorded in Phase 4)

## 🧩 Subtasks

- [x] Rewrite the pre-check and post-stage bullets in `SPEC/plan-filing.md`
- [x] Restate the decision on the six skill surfaces and the follow-up command stub
- [x] Run the classifier, Pair O, and the byte caps
- [x] External review, then close

## 🔗 Related

- [[CORE-429]] — filing approval is commit authorization; explicit pathspecs; skip when PLAN was already dirty (`related-decision:`)
- [[CORE-591]] — a non-empty index still skips, because the commit publishes the whole index (`related-decision:`)
- [[CORE-593]] — post-stage reads `git diff --cached` with no pathspec (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The open row matches the confirmed rule. Uncommitted task-row filings were blocking the next `/ft-task` via the paper-complete guard.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Area resolves to `archive/core/` from `.flowtron/tasknote/README.md` §"Archive layout" (`CORE-*`). `[medium]` matches this session's tier. `## Completed` holds 43 checked rows, under the rotation advisory. No sidequest stub. Tree was clean at entry.

Archive predecessors, read at their goals: [[CORE-429]] made filing approval the commit and introduced skip-on-dirt so a parent task's unfinished edits are not swept. [[CORE-591]] added the index probe so a staged closure cannot ride out under `chore: file`. [[CORE-593]] added `/ft-refactor`'s post-stage read. Those three constraints stay. The contract now lives in `SPEC/plan-filing.md` (moved out of `tasknote-selection.md`).

No clarifications needed. Assumptions:

- The committed PLAN row is the rule. A non-empty index skips. Any PLAN change that is not an added task row, a blank line, or a removed `(none)` skips. Unstaged files other than PLAN.md do not skip and are not staged. Explicit pathspecs already keep a parent task's edits out of the commit. Reading the earlier option text as "any dirty file skips" would stop mid-task filings, which CORE-429's pathspec rule exists to allow.
- This does not commit every PLAN edit as it happens. Only a later filing motion picks up earlier task-row filings.
- `/ft-seed` inserts ` [unattended]` into existing rows. That edit fails the line test, so the pre-check runs before the seed write. Post-stage accepts the pre-check's accumulated rows and the token edits the seed itself wrote.
- Companion files from an earlier skipped park or starter are not staged. This commit is PLAN-only. A leftover sidequest or starter file can still stop the next `/ft-task`. Out of scope for this row.
- The paper-complete guard, execution-skill commit-go gates, and the skip sentence `left uncommitted (PLAN.md or the index already carried other changes)` stay.
- `SPEC.md`'s one-liner already says the filing motions auto-commit and does not restate skip-on-dirt. It is not edited.
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing filing-commit pre-check. The line test lives once in `SPEC/plan-filing.md`. Each runner keeps a short decision and still points at that section. No repo script: flowtron stays markdown-only, and the classifier used for Acceptance stayed in `/tmp`.

Review fix: the first skill sentence recognized only added task rows. A removed `(none)` or blank from the same accumulated diff would have been treated as foreign and the commit would skip. The sentence now names those lines too, matching the spec test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A — markdown contract, no code suite

- [x] Ran lint/type-check on changed code — N/A — no TypeScript or lint surface

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (first run, before the review fix; re-checked after the sentence change):

- `python3 /tmp/core-682-classify.py` → 0. `2d3ebb01` accepted. An edited existing row, and a Vision sentence, rejected. A `(none)` removal plus an epic parent and indented `.N` child accepted.
- Pair O shell → 0 (`Pair O ok`).
- `grep -l 'diff --cached --quiet'` on the five runners → 5.
- `wc -c` on the four skill bodies → all under 33,000 (`ft-file-followup` 26327, `ft-audit` 27670, `ft-refactor` 16404, `ft-seed` 12633, before the one-sentence review fix; still under the cap after it).
- `grep -q 'skipped when PLAN.md already carried other edits'` → exit 1 (phrase gone).
- `grep -q 'Also lands earlier uncommitted filings'` → 0.
- `git diff --check` → 0.
- Structural half: N/A — contract prose. The line test is not copied into each skill; the skills name the same classes the spec classifies.

External review (read-only subagent):

- **blocker** — skill post-stage text recognized only added task rows, so a removed `(none)` or blank would skip. Fixed in the six surfaces. Spec already had the wider test.
- **note** — doc-drift sweep not yet written. Recorded in Phase 4. No file on the sweep list changed.
- **note** — the line test is narrower than `viz/src/parser.ts` `TASK_LINE` (`[X]`, extra id shapes). Left. A miss skips the commit, which is the safe direction. Live plan and `2d3ebb01` pass.
- **note** — an earlier uncommitted sidequest or starter file is not staged, so the next `/ft-task` can still stop on that file. Accepted. The row is PLAN-only, and the spec says so.
- **note** — `/ft-audit` still nicknames the skip report "skip-on-dirt". Left. The report sentence itself was kept on purpose.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

A later filing now commits earlier PLAN.md task rows with itself. A non-empty index, or any edit that is not a task row, a blank, or a removed `(none)`, still skips.

Doc-drift sweep, no change: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. `SPEC.md` still says the filing motions auto-commit and that execution skills keep their commit-go gate.

`touches:` matches the diff aside from this tasknote and the PLAN row. Learnings: N/A. The rule belongs in the lazy filing module the runners already load.

**Archived:** 2026-10-02
