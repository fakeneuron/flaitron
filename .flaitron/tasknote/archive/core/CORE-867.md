---
title: doc-sweep-touches-scope
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-850.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-task/SKILL.md
  - SPEC/gate-postures.md
  - SPEC/procedures/ft-task.md
  - SPEC.md
  - docs/GLOSSARY.md
  - docs/CONTEXT-BUDGET.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-867 | doc-sweep-touches-scope

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-850.5]]

## 🎯 Goal

Stop an `--unattended` run's Phase 4 doc-drift sweep from editing docs outside `touches:`, so finished, green work stops parking `out-of-scope` uncommitted and stalling the drain.

## ✅ Acceptance

- [x] `unattended-mode.md` §"Scope guardrails" carries the scoped-sweep rule: in-scope docs edited within the size cap, out-of-scope drift recorded `drift — <update>` and filed as one `/ft-file-task --unattended` default-flow row per run, `filed <ID>` appended after, a stopped filing recorded `unfiled` and closure proceeds — `grep -q 'drift — <the update it needs>' claude/skills/ft-task/unattended-mode.md && grep -q 'one\*\* `/ft-file-task --unattended`' claude/skills/ft-task/unattended-mode.md && grep -q 'unfiled (<stop cause>)' claude/skills/ft-task/unattended-mode.md`
- [x] `SPEC/gate-postures.md` §"Scope guardrails" states the contract and stays inside its 22,000 budget — `grep -q 'filing that drift' SPEC/gate-postures.md && grep -q 'ft-file-task --unattended' SPEC/gate-postures.md && bash tools/drift-checks.sh`
- [x] Walked hooks: the `SKILL.md` Phase 4 bullet and the procedure's Phase 4 step 1 name the rule — `grep -q 'files out-of-scope drift' claude/skills/ft-task/SKILL.md && grep -q 'out-of-scope drift' SPEC/procedures/ft-task.md`
- [x] `SPEC.md` §"Scope reconciliation" and the glossary's "Doc-drift sweep" entry no longer claim the sweep always edits — `grep -q 'files out-of-scope drift' SPEC.md && grep -q 'files out-of-scope drift' docs/GLOSSARY.md`
- [x] Budgets, citations and the cold-start ledger hold — `bash tools/drift-checks.sh && node --test tools/drift-checks.test.mjs`
- [x] The BE-526 replay closes instead of parking — `judgment`: a prose walk of the contract, no runner to execute

## 🧩 Subtasks

- [x] Write the executable rule in `unattended-mode.md` §"Scope guardrails"
- [x] State the contract in `SPEC/gate-postures.md` §"Scope guardrails", trimming to stay in budget
- [x] Hook it where the runner walks: `SKILL.md` Phase 4 bullet, `SPEC/procedures/ft-task.md` Phase 4 step 1
- [x] Fix the claims it falsifies: `SPEC.md` §"Scope reconciliation", `docs/GLOSSARY.md` "Doc-drift sweep"
- [x] Re-measure the `SKILL.md` row in `docs/CONTEXT-BUDGET.md`'s cold-start ledger

## 🔗 Related

- [[CORE-850.5]] — predecessor: added the scope guardrails and, by operator Q1, the post-sweep re-check this task revisits

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Field evidence (marscharts BE-526, 2026-11-06): the post-sweep re-check CORE-850.5 added parks green work uncommitted, and the dirty tree halts the drain (4 rows skipped). Nothing in HEAD has fixed it yet.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read:** `unattended-mode.md` (conversion map, §"Scope guardrails"), `SPEC/gate-postures.md` §"Scope guardrails", `SPEC.md` §"🚀 Phase 4" + §"Scope reconciliation", `SPEC/procedures/ft-task.md` Phase 4, `SKILL.md` Phase 4, `ft-file-task/SKILL.md` + `step-0-flags.md` (`--unattended` works on the default flow only, since `--park --unattended` is a terminal flag-conflict; ≤70w cap; stops on id-conflict / over-cap; Step 4 commits standalone on a clean index and rides an already-staged closure otherwise). I misread this at first and the External review caught it, `docs/CONTEXT-BUDGET.md`.
- **Best practices:** the contract goes once in `gate-postures.md`, the executable steps in `unattended-mode.md`, and short hooks in the walked steps (`SKILL.md`, the procedure). That is CORE-738's lesson: a stop that lives only in a lazy fragment is never reached.
- **Archive skim** (`archive/core/`, per the README table): CORE-850.5 added the post-sweep re-check because the operator chose it (Q1, 2026-10-31). Its review flagged the park-on-sweep outcome five times and kept it each time as "the intended outcome; the resume is attended". This task partly reverses that decision on field evidence, and the operator confirmed the reversal below. CORE-850.N's lesson: check sweep docs for claims another file's mechanism falsifies (here, GLOSSARY's "records … the precise update performed").
- **Drift check:** every cited path exists. Budgets: `gate-postures.md` 21,991 / 22,000 (9 left, so every addition needs a matching trim), procedure 25,765 / 26,000, `SKILL.md` 23,487 / 27,000 (cold-start ledger row needs a re-measure), `SPEC.md` 43,772 / 48,000. The workflow-path list already admits "a note or stub that this run's `/ft-file-task` filing created" plus `.flaitron/PLAN.md`, so a follow-up filing passes the post-sweep check with no change to the check itself. The plan matches the PLAN line.
- **Clarifications (answered 2026-11-06):** (1) **file, don't edit**: under `--unattended` the sweep edits only docs inside the scope, and records out-of-scope drift as `drift — <update>; filed <ID>`; the post-sweep re-check stays as the backstop. (2) **one stub per run**, listing every out-of-scope doc and the update it needs.
  Assumptions: "in scope" uses the same entry matching as the paths check (exact / dir `/` / `:(glob)`); attended runs are unchanged (the recap's scope line already reports undeclared edits); ~~a filing that stops parks `input-needed`~~ (revised at review pass 1: that park leaves the same green work uncommitted, so a stopped filing records `unfiled (<cause>)` and closure proceeds, with the archived note as the record); `/ft-close-epic` is untouched (its audit fixes aren't scoped by `touches:`).

Carried from the retired sidequest stub:

> **Idea**
>
> In unattended runs the Phase 4 doc-drift sweep can edit a doc outside the row's `touches`. The worker then parks the row as out-of-scope with all work uncommitted, and the dirty tree stops the whole drain. Seen in marscharts BE-526 (2026-11-06): work done and green, but a one-line edit to `docs/architecture/E2E_DATA_PATH.md` held 20 files; 4 unattended rows skipped. Options: limit the unattended sweep to `touches`, or file a follow-up for out-of-scope drift instead of editing. Evidence: `~/.caobunga/invocations/20261106T151521497Z-fcebcd786dff41da96d830773da6caf7.yaml`; marscharts `.flaitron/tasknote/BE-526.md` (archived once closed).
>
> **Resume anchor**
>
> Filed standalone from a marscharts session's hand-off; no flaitron work was in flight.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose only; no drift pair binds the new sentences

**Implementation Notes:**

- **Pattern:** extends CORE-850.5's split. The executable paragraph sits in `unattended-mode.md` §"Scope guardrails", beside the "`touches:` is fixed" paragraph. The contract sentence goes in `gate-postures.md` §"Scope guardrails", with one-clause hooks in `SKILL.md` Phase 4 and procedure Phase 4 step 1. It reuses the existing workflow-path admission for "a note or stub that this run's `/ft-file-task` filing created", so the paths check itself is unchanged.
- **Refactor (budget-driven):** `gate-postures.md` had 9 bytes free. I cut "a check every unattended `/ft-task` run takes" (the section's opening sentence already says it) and shortened the baseline sentence to "…, even a byte-identical one" (the full reasoning is in the `GATE-DISCIPLINE.md` link right after it). 21,991 → 21,999 / 22,000. The "(working tree plus this task's own commits)" gloss was cut at first; review pass 1 restored it because the SPEC-only runners need it.
- **Claims fixed:** `SPEC.md` §"Scope reconciliation" and `docs/GLOSSARY.md` "Doc-drift sweep". `docs/CONTEXT-BUDGET.md`'s cold-start ledger was re-measured as a whole: `AGENTS.md` had drifted +11 before this task.
- The sidequest-stub deletion is staged with `git rm --cached`, because Pair Q reads `git ls-files` and failed on the tracked-but-missing path.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs`

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (markdown-only diff; no viz/updater code touched)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: contract prose, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final tree):
- A1 `grep -q 'drift — <the update it needs>' … && grep -q 'one\*\* `/ft-file-task --unattended`' … && grep -q 'unfiled (<stop cause>)' claude/skills/ft-task/unattended-mode.md` → 0
- A2 `grep -q 'filing that drift' SPEC/gate-postures.md && grep -q 'ft-file-task --unattended' SPEC/gate-postures.md && bash tools/drift-checks.sh` → 0 (gate-postures 21,999 / 22,000)
- A3 `grep -q 'files out-of-scope drift' claude/skills/ft-task/SKILL.md && grep -q 'out-of-scope drift' SPEC/procedures/ft-task.md` → 0
- A4 `grep -q 'files out-of-scope drift' SPEC.md && grep -q 'files out-of-scope drift' docs/GLOSSARY.md` → 0. The first run gave → 1 because line wraps split the phrase in SPEC.md and the procedure; rewrapping fixed it.
- A5 `bash tools/drift-checks.sh` → 0. The first run failed Pair Q on the unstaged stub deletion, fixed with `git rm --cached`. `node --test tools/drift-checks.test.mjs` → 0 (27/27).
- A6 judgment, BE-526 replay. The sweep finds drift in `docs/architecture/E2E_DATA_PATH.md`, which is outside `touches:`, so it does not edit it. The entry reads `drift — <update>`. The post-sweep check then sees only in-scope paths plus workflow paths, and the closure writes run. At Step 6, once the closure paths are staged, the run makes one `/ft-file-task --unattended` default-flow filing. It writes a PLAN.md row that rides the closure commit, and `; filed <ID>` is added to the archived note. The closure commits, the tree is clean, and the drain continues. A filing that stops records `unfiled (<cause>)` and the run still closes.
- No duplication or dead text was added. The stale-claim fixes are in SPEC.md and GLOSSARY.

External review (`/code-review medium`, this task's uncommitted diff only):
- **Pass 1, 10 findings.** **Blocker, fixed:** `/ft-file-task` refuses `--park --unattended` as a terminal flag-conflict (`ft-file-task/step-0-flags.md`), so the rule could never file. It moved to the unattended default flow, which writes a PLAN row and no stub. Fixed: the contract named plain `--park`; the stopped-filing fallback parked `input-needed`, which is the same stall (it now records `unfiled` and closes); `filed <ID>` was written before the ID existed (it is now appended after the filing); a multi-doc row would overflow 70 words (the row now points at the note for the updates); the restored "own diff" gloss in the contract; the `It` antecedent (sentence reordered); the "three rows held" ledger prose; the gate-postures history and size-line restamp; sweep edits could breach the 400-line cap (in-scope edits now stay under the cap or get filed).
- **Pass 2, 9 findings, all fixed.** The row pointer now names the archive path. The filing runs at Step 6 after staging, so it rides the closure commit rather than committing standalone on a clean index (`ft-file-task` Step 4). The contract now names the size cap too. The `; filed <ID>` append shape is explicit. The Discovery claims about the `--park --unattended` misread, the `input-needed` assumption and the trim list are corrected. `SKILL.md` Phase 3's unattended note filing now names the default flow, because `--park` refuses `--unattended`. The SPEC.md line is rewrapped.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry. **Updated:** `SPEC.md` (§"Scope reconciliation" clause). **No change:** `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (its `--unattended` row says the guardrail parks on a diff outside `touches:`, which is still true), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (the `out-of-scope` park semantics are unchanged), `docs/WORKTREES.md`, `docs/VISION.md`. Outside the set, `docs/GLOSSARY.md` was updated.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. A note for this repo: a contract that delegates to another skill's flag combination should be checked against that skill's flag-composition table, because `--park` and `--unattended` look like they compose and don't.

**Final Summary:**

An `--unattended` `/ft-task` run's Phase 4 doc-drift sweep now edits only in-scope docs, and only within the 400-line cap. Out-of-scope drift is recorded per entry and filed as one `/ft-file-task --unattended` default-flow PLAN row that rides the atomic closure commit. Finished, green work therefore closes instead of parking uncommitted and stalling the drain (marscharts BE-526).

- **Changed:** `claude/skills/ft-task/unattended-mode.md` (executable rule, +1 paragraph), `SPEC/gate-postures.md` (contract sentence, budget trims, 21,991 → 21,999 / 22,000), `claude/skills/ft-task/SKILL.md` (Phase 4 hook; Phase 3 unattended note filing names the default flow), `SPEC/procedures/ft-task.md` (Phase 4 step 1 hook), `SPEC.md` (§"Scope reconciliation"), `docs/GLOSSARY.md`, `docs/CONTEXT-BUDGET.md` (ledger re-measure 106,443, +193; gate-postures restamp).
- **Verification:** A1–A5 → 0, A6 judgment walk; two External review passes, every finding fixed.
- **Refactors:** gate-postures trims, budget-driven (see Implementation Notes).
- **Docs verdict:** SPEC.md and GLOSSARY updated; everything else no change.
- **Scope reconciliation:** declared 7 files, changed 7, nothing undeclared (excluding this note, the PLAN row and the retired sidequest stub).
- **Maintainability:** one rule in the fragment, one contract sentence, two walked hooks. The paths check itself is unchanged, since it reuses the existing workflow-path admission for PLAN.md.
- **Reversal note:** this partly reverses CORE-850.5's Q1 (park on post-sweep drift), on the operator's 2026-11-06 answer. The stopped-filing fallback (record `unfiled` and close) is the runner's call from review pass 1, not an operator answer.

**Archived:** 2026-11-06
