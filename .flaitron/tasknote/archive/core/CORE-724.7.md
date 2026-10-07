---
title: decay-window-batch
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-659, CORE-660, CORE-680, CORE-683]
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
touches:
  - claude/skills/ft-audit/SKILL.md
  - SPEC/gates.md
  - docs/GATE-DISCIPLINE.md
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - claude/skills/ft-micro-task/SKILL.md
  - templates/tasknote-template.md
  - SPEC/tasknote-selection.md
  - README.md
  - .flaitron/PLAN.md
blocked-by: [CORE-724.5]
---

# CORE-724.7 | decay-window-batch

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Open one batched decay window: drop the live triggers of the epic's no-provenance rules (plus any prior declines `.2`–`.5` reopened), record the window-start SHA, and file a single restore-check row carrying one bar.

## ✅ Acceptance

- [x] ft-audit §7 Rationalizations and §8 Red Flags are gone; §6 Hard rules is the last section — `grep -qE '^## (7\. Rationalizations|8\. Red Flags)' claude/skills/ft-audit/SKILL.md` exits 1
- [x] The gate-discipline new-row trigger and its two empty "since the window" homes are gone, and the main tables stay — `grep -q 'Standing rule' SPEC/gates.md` exits 1; `grep -q 'since the window' SPEC/gates.md docs/GATE-DISCIPLINE.md` exits 1; `grep -q '^## Rationalizations$' docs/GATE-DISCIPLINE.md` exits 0
- [x] DRY/SRP/composition imperatives are dropped everywhere; the Minimal refactor gate and the Verification receipt still name duplication — `grep -rnE '\bDRY\b|single-responsibility|\bSRP\b|prefer(red)? composition' SPEC.md SPEC claude/skills templates` exits 1; `grep -c 'duplication' SPEC.md` ≥ 2
- [x] The ~15/~30-minute routing heuristics are gone; the other routing criteria stay — `grep -rnE '~ ?(15|30) min|>30 ?min' SPEC claude/skills` exits 1
- [x] No prior decline reopened — `judgment`: .2–.5 reopened none, and the operator chose "reopen none"; recorded in Discovery Notes
- [x] Every `§"…"` citation still resolves — CI Pair Q body, run locally, exits 0
- [x] Context budget holds — CI context-budget step body, run locally, exits 0
- [x] Window-start SHA and the restore bar are recorded in this note — `grep -q 'Window-start' .flaitron/tasknote/CORE-724.7.md` exits 0
- [x] CORE-727 is an unchecked `## Low` row that points at this note's bar — `grep -q '^- \[ \] \*\*CORE-727\*\*' .flaitron/PLAN.md` exits 0

## 🧩 Subtasks

- [x] Delete ft-audit §7 and §8
- [x] Drop the gates.md §"Gate discipline" standing rule (including its "/ft-audit own copy" clause), plus GATE-DISCIPLINE's intro new-row paragraph and its two empty "since the window" subsections
- [x] Drop the DRY/SRP/composition imperative from SPEC.md (Pattern-survey box and softener sentence), procedures/ft-task.md, ft-task SKILL Step 5, loop mode, ft-micro-task, and the template box
- [x] Drop the ~15/~30-minute clauses from tasknote-selection.md and ft-micro-task
- [x] Record window-start SHA + single restore bar; file CORE-727 in `## Low`
- [x] Run the Acceptance greps + CI Pair Q + context-budget bodies locally

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic; [[CORE-724.1]] scoped this window (Resolved scoping table)
- [[CORE-659]] / [[CORE-660]] — gate-discipline decay window and recount (drop trigger → record SHA → recount)
- [[CORE-680]] / [[CORE-683]] — window + restore-row shape this task copies
- [[CORE-727]] — follow-up restore check (filed at closure)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Unchecked child; its blocker [[CORE-724.5]] is closed (`7a2fc7b6`), and every named target is still live at HEAD.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`) — narrow read: ft-audit SKILL §6–§8, gates.md §"Gate discipline", GATE-DISCIPLINE.md, SPEC.md Phase 2, tasknote-selection.md, the runner Phase 2 sites; no probe

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason) — `N/A`: contract-prose deletions; no code or module boundary

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

`## Completed` holds 128 rows (advisory, >60). `[heavy]` is satisfied: the active model is Opus 5.5.

**Targets at HEAD** (each drift-checked; no CI pair binds any of them: grep across `.github/`, `claude/skills/ft-release/`, `tools/`, `viz/src`, EXTERNAL-AGENTS, AGENT-NEUTRALITY, CONTEXT-BUDGET):

| group | live sites | origin |
|---|---|---|
| ft-audit §7/§8 | `claude/skills/ft-audit/SKILL.md` §7 (13-row excuse table) and §8 (17 symptoms), 7,949 chars (measured) of a skill loaded whole on every audit run. One external tie: gates.md's standing rule says to update "the consolidated `/ft-audit` skill's own copy" | [[CORE-386]] (agent-skills anatomy adoption). The gates.md half rests on an observed failure ([[CORE-389.N]]); the audit rows are mostly hypothetical |
| gate-discipline empty tables | gates.md §"Gate discipline" **Standing rule** paragraph (new rows ride every gate change); GATE-DISCIPLINE.md intro new-row paragraph, §"Rationalizations since the window" (header only), §"Red Flags since the window" ("none yet") | [[CORE-660]] / [[CORE-724.3]] review blocker. [[CORE-660]]'s recount of 34 tasknotes found no recurrence of the pre-window rows |
| DRY/SRP imperatives | SPEC.md Pattern-survey box clause and the "DRY, SRP, and composition are contextual prompts" sentence; procedures/ft-task.md:353; ft-task SKILL Step 5; step-5-loop-mode.md:66; ft-micro-task SKILL:79; template Pattern-survey box | [[CORE-362.2]] clean-code-contract (design-led, no failure cited). Still guarded after the cut: the Minimal refactor gate (duplication / responsibility / dependency direction) and the Verification receipt (no avoidable duplication) |
| ~15/30-min heuristics | tasknote-selection.md:13 (`~15 minutes` use-a-tasknote bullet), :84 and :93 (`~30 minutes` micro routing); ft-micro-task SKILL:10, :117 | CORE-001 bootstrap / [[CORE-223.3]] move. The other criteria (multi-file, design tradeoffs, has an ID, single-file) carry the routing |

**Prior declines.** None of [[CORE-724.2]]–[[CORE-724.5]] reopened one: .2 "no decline reopened", .3 deferred SPEC.md's restored sections to .7 only *if* reopened, .4 "No prior decline is reopened", .5 left the DRY/SRP phrase for this window. The operator chose "reopen none". The [[CORE-558.2]] sections have provenance (restored after an observed failure), so they fall outside a no-provenance window.

**Archive skim** (`archive/core/`, confirmed against the README table). [[CORE-659]] dropped triggers and kept the content in a doc. [[CORE-680]] deleted a paragraph outright and kept the content restorable from the SHA. [[CORE-683]] is the restore-row shape: a `Blocked by decay-window depth:` lead, no `[[ID]]` blocker so the viz does not show it as ready early, and the bar recorded in the archived note. [[CORE-724.3]] review blocker: the "since the window" homes existed to keep new rows apart from the pre-window record, which is the separation this window now tests. [[CORE-724.5]] kept the template's DRY/SRP phrase as "a short clause" on purpose, for this window.

**Drift.** Row parenthetical matches the sites. Since session start the operator filed [[CORE-726]] (`504f160f`) in another session, so the next free ID is CORE-727. The window-start SHA is the last commit with every dropped rule in place: HEAD at execution time, recorded in Phase 2.

**Clarifications** (AskUserQuestion):

| question | answer |
|---|---|
| Restore bar | 10 tasknotes (full or micro) archived past the SHA **and** ≥1 `/ft-audit` run committing filings past it |
| DRY/SRP depth | Everywhere, including SPEC.md's box and softener sentence |
| Reopen prior declines | None |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape — [[CORE-659]]/[[CORE-680]] shape: drop the live clause, record the window-start SHA here, and leave the restore check as its own PLAN row

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup — deletions only; `docs/CONTEXT-BUDGET.md` ledger left for the release remeasure (shrink-only, [[CORE-680]] precedent)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract prose; Acceptance is grep + CI-pair bodies

**Implementation Notes:**

- **ft-audit.** §7 Rationalizations and §8 Red Flags deleted; §6 Hard rules now ends the file. 26,306 → 18,357 chars (−7,949).
- **Gate discipline.** Dropped gates.md §"Gate discipline"'s **Standing rule** paragraph (new rows ride every gate change, plus "the consolidated `/ft-audit` skill's own copy"). In `docs/GATE-DISCIPLINE.md`, dropped the intro's new-row paragraph and the two empty subsections §"Rationalizations since the window" and §"Red Flags since the window". The [[CORE-659]]/[[CORE-660]] history sentence stays. The main tables and §"Refused carve-outs" are unchanged, and the gates.md heading the cue-vocabulary pointer relies on is kept.
- **DRY/SRP.** Removed the "check DRY / SRP, prefer composition" clause from SPEC.md's Pattern-survey box, the SPEC.md "contextual prompts" sentence, `SPEC/procedures/ft-task.md`, ft-task SKILL Step 5, `step-5-loop-mode.md`, ft-micro-task, and the template box. The Pattern-survey box keeps its bold label (EXTERNAL-AGENTS stable surface) and the extend-or-justify imperative. The Minimal refactor gate and the Verification receipt still name duplication and responsibility.
- **Time heuristics.** Dropped the `~15 minutes` use-a-tasknote bullet and both `~30 minutes` micro-routing clauses from `SPEC/tasknote-selection.md`, and both from ft-micro-task (intro and §Notes routing). Routing now rests on file count, design tradeoffs, the ID, and "unsure → `/ft-task`".
- **Declines reopened:** none.
- **Window filed.** [[CORE-727]] sits at the top of `## Low` (50 words), same shape as [[CORE-683]]: a `Blocked by decay-window depth:` lead with no `[[ID]]` blocker, so the viz does not show it as ready early.

**Window-start:** `504f160f81cc45fc1000413b24a6971a5de5058f` (`chore: file CORE-726 park`, 2026-10-07): the last commit with every dropped rule in place. Restore source: `git show 504f160f:<path>`.

**Restore bar for [[CORE-727]]** (single bar, one count plus one audit condition):

- **When the window closes.** 10 tasknotes (full or micro) archived in commits after `504f160f` (this note excluded), **and** at least one `/ft-audit` run whose filings commit after `504f160f`. Until both hold, the row stays open.
- **What to restore.** For each group below, restore it from the window-start SHA only if a note, audit run, or review in the window shows the failure it guarded against:
  1. **ft-audit §7/§8:** an audit run fixed source outside the §5 trivial-fix carve-out, filed a finding outside the resolved scope, padded a pass to its cap, filed an `Operator action:` with no dispatchable instruction, or wrote PLAN tickets while running as a subroutine.
  2. **Gate-discipline new-row rule and "since the window" homes:** a gate-surface change (`SPEC/gates.md` / `SPEC/gate-postures.md`) landed in the window, and a later run skipped or converted a gate that change added or altered, on an excuse no row in `docs/GATE-DISCIPLINE.md`'s main tables already refutes.
  3. **DRY/SRP imperative:** a closed task added a near-duplicate of an existing helper or section, or tangled two responsibilities in one file, and its own Minimal refactor gate and Verification receipt passed over it (caught by its review, a later task, or the audit).
  4. **~15/~30-minute heuristics:** a task was mis-routed (a micro that had to escalate to `/ft-task`, or a skipped tasknote that needed one), and a time estimate would have routed it correctly where the file-count and design-tradeoff criteria did not.
- **Otherwise** close the window. Groups that show no failure stay deleted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` for a suite: markdown only; the Acceptance greps and CI drift bodies are the targeted checks

- [x] Ran lint/type-check on changed code — `N/A`: no code; trailing-whitespace + final-newline checks run instead

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- `grep -qE '^## (7\. Rationalizations|8\. Red Flags)' claude/skills/ft-audit/SKILL.md` → 1
- `grep -q 'Standing rule' SPEC/gates.md` → 1; `grep -q 'since the window' SPEC/gates.md docs/GATE-DISCIPLINE.md` → 1; `grep -q '^## Rationalizations$' docs/GATE-DISCIPLINE.md` → 0
- `grep -rnE '\bDRY\b|single-responsibility|\bSRP\b|prefer(red)? composition' SPEC.md SPEC claude/skills templates` → 1; `grep -c duplication SPEC.md` → 3
- `grep -rnE '~ ?(15|30) min|>30 ?min' SPEC claude/skills` → 1
- `grep -q 'Window-start' .flaitron/tasknote/CORE-724.7.md` → 0
- `grep -q '^- \[ \] \*\*CORE-727\*\*' .flaitron/PLAN.md` → 0
- All 15 `drift`-job step bodies (extracted from `.github/workflows/ci.yml`, gitleaks excluded), run locally on the working tree: Wrapper-name, Skill parity, Context budget, Final newline, and Pairs A/B/C/H/J/M/N/O/P/Q/R → 0 each
- Trailing whitespace on changed files → none

Not run: viz test/lint/typecheck/build and the updater suite. No code changed, and nothing under `viz/src` or `tools/` reads an edited file (grep → none).

External review (`/code-review medium`, scoped to the working-tree diff plus this untracked note): no blocker. Six notes:

- **note** — `SPEC/tasknote-selection.md`: with `~15 minutes` gone, a large single-file change with no ID and no tradeoffs matches neither the use list nor the skip list. Left on purpose: this is the exact failure restore group 4 measures ("a skipped tasknote that needed one").
- **note** — `SPEC/tasknote-selection.md`: "single-file or near it" (micro) and "touches multiple files" (full) overlap now that the time tie-break is gone. Left: "unsure → `/ft-task`" is the stated tie-break, and group 4 covers mis-routing.
- **note** — `docs/GATE-DISCIPLINE.md`: nothing in the doc recorded the new-row rule's removal. Fixed: one sentence names [[CORE-724.7]], `504f160f` and [[CORE-727]].
- **note** — this note's Pattern-survey tick still said "checked DRY / SRP boundaries" (scaffolded from the pre-edit template). Fixed.
- **note** — restore criterion 2 could almost never fire, because it compared against rows nobody writes during the window. Fixed: it now asks for a skip or conversion of a gate the window's change added or altered, on an excuse the main tables don't already refute.
- **note** — `docs/CONTEXT-BUDGET.md`'s ft-audit ledger row is stale, and Discovery said "~8.6k" against a measured −7,949. Estimate corrected to the measured figure. The ledger is left for the release remeasure ([[CORE-680]] precedent).

Re-ran after the fixes: context budget, final newline, Pair P, Pair Q → 0 each.

Structural half: deletions only, plus one README clause and one new PLAN row. No new public surface or heading. Every removed `§"…"` target had no live citer (Pair Q green).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep:** `README.md` updated: the GATE-DISCIPLINE entry no longer calls it "the home for a new row when a gate surface changes". `SPEC.md` updated: Pattern-survey box clause and Phase 2 DRY/SRP sentence (the deliverable). No change: `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (Pattern-survey bold label kept), `docs/WORKTREES.md`, `docs/VISION.md`. Pre-existing drift found but not caused here, left for [[CORE-724.N]]: `AGENTS.md`'s `SPEC/` roster still lists "gate discipline" and "the purpose blurb", both modules [[CORE-724.3]] retired.

**Final Summary:**

Opened the context-diet decay window at `504f160f`. Four rule groups with no recorded failure behind them were dropped, and [[CORE-727]] holds the single restore bar: 10 tasknotes plus at least one `/ft-audit` run, with each group restored only on evidence of the failure it guarded.

- **Dropped:** `/ft-audit` §7/§8 (−7,949 chars of a whole-loaded skill); the gate-discipline new-row rule and its two empty homes; the DRY/SRP/composition imperative at 7 sites; the ~15/~30-minute routing clauses at 5 sites. 12 files changed, about 110 lines removed.
- **Unchanged guards:** duplication and responsibility are still covered by the Minimal refactor gate and the Verification receipt. Routing still rests on file count, design tradeoffs, and "unsure → `/ft-task`".
- **No prior decline reopened** (operator choice; .2–.5 reopened none).
- **Verification:** the Acceptance greps match their expected exits, and all 15 CI drift bodies exit 0 locally. External review: no blocker; 4 notes fixed, 2 left for the window to measure.
- **`touches:` reconciliation:** the diff matches the declared paths, with `docs/GATE-DISCIPLINE.md` and `README.md` declared. The archive move is excluded. Nothing undeclared.
- **Maintainability:** per-task cold start loses the DRY/SRP and time-heuristic prose; audit runs load a skill about 30% smaller. Every cut is restorable from one SHA.

**Learnings:** N/A. The window shape is already recorded in [[CORE-659]]/[[CORE-680]].

**Archived:** 2026-10-07
