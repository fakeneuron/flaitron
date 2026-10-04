---
title: budget-ceilings
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-558, CORE-558.2, CORE-558.3, CORE-558.4]
touches:
  - docs/CONTEXT-BUDGET.md
blocked-by:
  - CORE-558.4
---

# CORE-558.5 | budget-ceilings

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Re-measure the files the `.2`–`.4` fidelity restores touched and raise the `docs/CONTEXT-BUDGET.md` ceilings where the restored process needs the room, recording the reason for each raise in the Budgets table.

## ✅ Acceptance

- [x] Every budgeted surface grown by `.2`–`.4` is measured at HEAD and either raised with a recorded reason or confirmed still under its cap — verify: `wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md`
- [x] `docs/CONTEXT-BUDGET.md` §"Budgets" `SPEC.md` row reads **57,000**, with the recalibration reason written into its existing "Why this number" cell (no new prose, no new section)
- [x] `docs/CONTEXT-BUDGET.md` §"Budgets" `claude/skills/*/SKILL.md` row reads **33,000**, reason recorded the same way
- [x] §"Known over budget" is empty or every listed surface has an open owner — verify: read the section; no row added by this task
- [x] The §"Ledger" measurements and its `Measured … at v5.26.0, refreshed by [[CORE-553]]` stamp are **unchanged** — caps move in-task, measurements are `/ft-release` §7.1's ([[CORE-555]] / [[CORE-556.2]] precedent) — verify: `git diff` shows no Ledger hunk
- [x] The Budgets table is structurally intact at 3 columns on every row and all `[[wikilinks]]` in the changed cells resolve to real task IDs

## 🧩 Subtasks

- [x] Measure every budgeted surface at HEAD and record the table in Discovery Notes
- [x] Raise the `SPEC.md` row 55,000 → 57,000; write the reason into its "Why this number" cell
- [x] Raise the `claude/skills/*/SKILL.md` row 30,000 → 33,000; write the reason into its cell
- [x] Confirm `SPEC/gates.md` and `claude/skills/ft-release/SKILL.md` need no raise; leave both rows byte-identical
- [x] Confirm §"Known over budget" is still empty; add nothing
- [x] Verify the Ledger and its stamp are untouched by the diff
- [x] Phase 3: re-run the §7.1 budget check by hand against the new caps; check table structure + wikilink resolution
- [x] Phase 4: doc-drift sweep, flip the PLAN line to stub form (nested under the active parent), archive the tasknote

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic (post-shrink fidelity)
- [[CORE-558.4]] — immediate predecessor (`blocked-by:`; Fan-out Sequential `.4` → `.5`)
- [[CORE-558.2]] — SPEC.md restores measured here
- [[CORE-558.3]] — gates + unattended restores measured here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's premise holds and the measurement is decisive. `.2`/`.3`/`.4` each closed handing `.5` "no ceiling raise needed" against their *own* cap — all true — but none of them asked the question this child was filed to ask: whether the ceilings still hold the working margin [[CORE-555]] sized them for. Two do not. `SPEC.md` is 51,566 of 55,000 (3,434 headroom, 1.3 working units against CORE-555's ~2), and the `claude/skills/*/SKILL.md` glob is 30,000 with `ft-task` at 29,355 (645 headroom, a quarter of one unit). Both are the exact defect CORE-555 named for `gates.md` — "a margin sized below one working unit of contract change". Scope matches the line as filed, including its "especially SPEC.md" hint.

- [x] Read relevant source files — `docs/CONTEXT-BUDGET.md` in full (§"Budgets", §"Known over budget", §"Ledger", §"How this is enforced", §"Not on the doc-drift sweep list"); `SPEC/epic.md` (Fan-out echo → `blocked-by: [CORE-558.4]`); the three sibling archive notes' hand-off lines; `git log` byte-delta history for `SPEC.md` and six `ft-*` skill bodies

- [x] **Best Practices Review** — Touched responsibility is two numbers and their justifications, nothing else. The established shape is [[CORE-555]]'s: a cap change is two cells in an existing 3-column table, with the reason written into the row's existing "Why this number" prose rather than into a new section — the cell already carries `[[wikilink]]` provenance on all five rows. No new abstraction, no new mechanism. Deferred cleanup, explicitly: do **not** refresh the §"Ledger" measurements (release-owned), do **not** add a cap-change-history mechanism ([[CORE-555]] recorded the operator declining it), do **not** re-evaluate whether `ft-release` still needs its own row now that [[CORE-556.2]] put it under the glob figure, and do **not** touch `SPEC/gates.md`'s row.

- [x] **Archive skim** — `grep -l CONTEXT-BUDGET .flowtron/tasknote/archive/core/` returns 21 notes. Load-bearing reads:
  - [[CORE-555]] — the only prior cap *raise*, and the source of every number this task reasons with: the measured working unit (+2,567 substantial, +97–283 routine) and the sizing rule "a ceiling wants roughly two substantial tasks of room". Also the shape precedent (reason into the existing cell) and the explicit decision **not** to touch the ledger stamp when only caps move.
  - [[CORE-556.2]] — the same defect on `ft-release` (685 chars of headroom) solved by *extraction* rather than a raise, and its acceptance restating the standard as "~5,134 bytes of headroom (two working units per CORE-555)". Its Discovery Notes carry the rule this task follows verbatim: **"Edit CONTEXT-BUDGET in-task only for cap changes; leave the ledger to the next `/ft-release`."**
  - [[CORE-535.2]] — minted the Budgets table and the numbers-live-in-one-place rule (§"How this is enforced": the release check measures, this doc decides). Nothing here restates a cap elsewhere.
  - [[CORE-537]] — why `.flowtron/PLAN.md` carries a band, not a number; confirms the ledger is expected to be stale between cuts.
  - [[CORE-553]] — the v5.26.0 cut that set the current ledger stamp.

- [x] **Drift check** — one cited premise from a sibling is corrected here, and one PLAN-line assumption is narrowed.
  1. [[CORE-558.2]]'s out-of-sweep note says the `docs/CONTEXT-BUDGET.md` ledger figure for `SPEC.md` "is stale until `.5` refreshes it." **`.5` does not refresh it.** The doc's own §"Ledger" declares the measurements `/ft-release` §7.1-owned and staleness between cuts expected; [[CORE-555]] deliberately left the stamp alone for exactly this reason; [[CORE-556.2]] wrote the rule out as a Discovery constraint. Refreshing here would also force the stamp line — `Measured 2026-09-09 at v5.26.0, refreshed by [[CORE-553]]` — to name a task instead of a release, breaking the invariant that the ledger reports a cut. Recorded rather than acted on.
  2. The PLAN line reads "raise ceilings ... **where the restored process needs room**". Taken literally, no restore breached a cap and the answer is nothing. Taken as [[CORE-558.1]]'s Constitution #2 frames it ("Caps are a ratchet, not a reason to compress process"), the question is whether the ceilings still carry a working margin after the epic spent some of it. This task takes the second reading, operator-confirmed below. It does **not** raise `SPEC/gates.md`, where the margin survived.
  3. One measurement in the ledger is stale for a reason unrelated to this epic: `ft-release` reads 39,315 there but measures 30,619 at HEAD, because [[CORE-556.2]] extracted a fragment after the v5.26.0 cut. Noted so the `.N` audit does not read it as this epic's doing. Not corrected here — same release-owned rule as (1).
  4. No SPEC contract is contradicted. §"Known over budget" explicitly sanctions changing a budget "as an explicit decision rather than a silent drift", which is this task's shape.

- [x] Asked clarifying questions — two, both material, both answered via AskUserQuestion:

  | Question | Answer |
  |---|---|
  | `SPEC.md` cap — raise, or leave it under-cap? | **Raise to 57,000** (5,434 headroom ≈ 2.1 working units, restoring the CORE-555 posture `.2` consumed) |
  | `SKILL.md` glob — raise, extract per CORE-556.2, or leave? | **Raise the glob to 33,000** (`ft-task` gets 3,645 ≈ 1.5 units; the other three large bodies stay meaningfully capped) |

  Assumptions carried forward without asking: `SPEC/gates.md` stays at 40,000 (4,618 headroom ≈ 1.8 units — within rounding of the intended two, and `.3` spent only 419 of it); `ft-release`'s own row stays at 40,000 and is not re-evaluated against the new glob figure; the ledger is not refreshed.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Measured at HEAD (`wc -c`), against the caps as they stand:**

| Surface | Cap | HEAD | Headroom | Working units | Grown by |
|---|---|---|---|---|---|
| `SPEC.md` | 55,000 | 51,566 | 3,434 | ~1.3 | `.2` (+2,281) |
| `SPEC/gates.md` | 40,000 | 35,382 | 4,618 | ~1.8 | `.3` (+419) |
| `claude/skills/*/SKILL.md` (max: `ft-task`) | 30,000 | 29,355 | 645 | ~0.25 | `.4` (+431) |
| `claude/skills/ft-release/SKILL.md` | 40,000 | 30,619 | 9,381 | ~3.7 | — ([[CORE-556.2]] cut it) |

Next-largest skill bodies, for the glob row: `ft-goal-task` 27,140 · `ft-epic-discovery` 26,986 · `ft-close-epic` 26,935 · `ft-file-followup` 23,648. At 33,000 all four stay capped with room, and the cap keeps biting on regrowth.

**Working unit, re-derived rather than inherited.** [[CORE-555]] measured +2,567 for a substantial contract task on `gates.md`. Re-measured here per surface from `git log` byte deltas:

- `SPEC.md`, 45 touching commits: substantial edits run +1,127 to +2,957 (CORE-504 +2,957 · CORE-445.3 +2,765 · CORE-473.3 +2,452 · CORE-558.2 +2,281 · CORE-494 +1,842); routine ones +5 to +283. CORE-555's +2,567 sits mid-range — it holds.
- `ft-task/SKILL.md`: +3,390 · +2,345 · +1,257 · +1,187 · +1,163 · +807. Across the six lifecycle runners the substantial band is ~+1,200–2,950, ignoring two whole-posture introductions (`ft-file-followup` +7,617, `ft-close-epic` +6,815).

So a 645-char margin on `ft-task` is under a quarter of one edit's worth, and 3,434 on `SPEC.md` is about 1.3 — both below the two-unit standard [[CORE-555]] set and [[CORE-556.2]] restated.

**Why these two rows and not the other two.** `gates.md` at 1.8 units is a rounding difference from the intended two, not a defect, and `.3` barely touched it. `ft-release` has 3.7 units after its own extraction. Raising either would be inventing a number the measurement does not ask for — the failure mode the PLAN line's last sentence names.

**Scope boundary.** The whole deliverable is two cells in one table. Everything else `.5` does is verification: confirm §"Known over budget" is still empty, confirm the Ledger diff is empty, confirm the table survives structurally.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-555]]'s established shape exactly: a cap change is a number and a justification in the same 3-column row, with the reason appended to the existing "Why this number" cell (all five rows already carry `[[wikilink]]` provenance there). No new section, no new prose block, no cap-change-history mechanism — [[CORE-555]] recorded the operator declining that, and reviving it here would be scope the task did not ask for.

- [x] **Minimal refactor gate** — one rewrite the change itself made necessary: the `SPEC.md` cell's `Raised from 50,000 by [[CORE-555]]` / `The prior figure` phrasing was unambiguous while there was one raise and misleading with two, so it became `Raised from 50,000 to 55,000 by [[CORE-555]]` / `The 50,000 figure`. The glob cell's `At 30,000 every shipped skill except ft-release below passes today` was likewise falsified by the new number — [[CORE-556.2]] has since put `ft-release` at 30,619, under the new glob cap — so it was rewritten into the past tense as [[CORE-535.2]]'s original reasoning. Both traceable to this task's edit. Nothing else touched.

- [x] Implemented the minimal solution — 2 lines changed in 1 file

- [x] Updated/added tests for non-trivial behavior — N/A (markdown table cells; no executable surface)

**Implementation Notes:**

Two rows in `docs/CONTEXT-BUDGET.md` §"Budgets":

- **`SPEC.md` 55,000 → 57,000.** Headroom 3,434 → 5,434 (~2.1 working units at [[CORE-555]]'s +2,567 rate, restoring the posture that task sized in and [[CORE-558.2]] spent 40% of).
- **`claude/skills/*/SKILL.md` 30,000 → 33,000.** `ft-task`'s headroom 645 → 3,645 (~1.5 units on that body).

Each cell records *why*, not just *that*: the SPEC row names `.2`'s +2,281 and the re-measured unit; the glob row names `.4`, `ft-task`'s 645-char squeeze, the three next-largest bodies that stay capped, and — deliberately — that [[CORE-556.2]]'s fragment extraction is the better remedy for a body that is genuinely overgrown rather than merely near its line. That last clause keeps the raise from reading as precedent for raising a cap whenever one is approached.

**Deliberately not done:** `SPEC/gates.md` unchanged (35,382/40,000 = ~1.8 units; `.3` spent only 419 — a rounding difference from two, not a defect). `ft-release`'s specific row unchanged and not re-evaluated against the new glob figure. §"Known over budget" unchanged and still empty. §"Ledger" measurements and stamp untouched — caps move in-task, measurements are `/ft-release` §7.1's, per [[CORE-555]] and [[CORE-556.2]]'s written-out rule.

**Downstream-impact reconciliation:** scan run — not triggered. The decision raises two ceilings and changes no contract, sequencing, or data shape; its effect stays inside `docs/CONTEXT-BUDGET.md`. Two active siblings *benefit* ([[CORE-557]] and [[CORE-559]] both grow `SPEC.md` and both would have inherited a 1.3-unit margin) but neither has a premise to reconcile — a larger ceiling invalidates nothing they plan. Class: **Unaffected / Leave.** No reconcile edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose; the repo's suites cover `viz/` and `tools/`, neither touched)

- [x] Ran lint/type-check on changed code — N/A, same reason. Substituted the check that does apply: a hand re-run of the `/ft-release` §7.1 standing budget check against the new caps (see Testing Notes)

- [x] **Quality assertions** — no duplication introduced: the two caps are stated in exactly one place, re-verified by `grep -rn` for both old and new figures across all `*.md` (only hits outside this doc are `/ft-audit-context`'s 30,000–40,000 severity bands for an *adopter's* `CLAUDE.md`, a different mechanism that happens to share a number — inspected and confirmed unrelated). No dead prose left: both stale clauses the new numbers falsified were rewritten. No public-surface growth. No stale code-facing docs — the release check reads these caps and was verified to restate none of them.

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

**Testing Notes:**

| Check | Command | Result |
|---|---|---|
| §7.1 budget check, new caps | `wc -c` over all four budgeted surfaces | **4/4 OK** — `SPEC.md` 51,566/57,000 (5,434) · `gates.md` 35,382/40,000 (4,618) · `ft-release` 30,619/40,000 (9,381) · largest glob body `ft-task` 29,355/33,000 (3,645) |
| Glob row, all 18 bodies | `wc -c claude/skills/*/SKILL.md` | all under 33,000; next three after `ft-task` are `ft-goal-task` 27,140 · `ft-epic-discovery` 26,986 · `ft-close-epic` 26,935 |
| Caps stated once | `grep -rn` for `55,000` / `30,000` / `57,000` / `33,000` across `*.md` | only the two edited rows; no mirror to update |
| Table structure | pipe count, rows 40–45 | 4 pipes on every row — 3 columns intact |
| Wikilinks in changed cells | resolve 8 IDs against tasknotes + PLAN | 8/8 resolve (7 archived, 1 active — this note) |
| Ledger + Known-over-budget untouched | `git diff -U0` | 2 hunks, both single-line, at 42 and 44 — no hunk in either section |
| Diff size | `git diff --numstat` | `2  2  docs/CONTEXT-BUDGET.md` |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` · `AGENTS.md` · `SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` · `docs/VISION.md` — **18/18 no change.** The caps are stated only in `docs/CONTEXT-BUDGET.md`, which is deliberately *not* on this list (its own §"Not on the doc-drift sweep list" explains why, and that reasoning is unaffected: this task changed caps, which that section says are swept "when a budget changes" — done here, in the rows themselves). No swept doc cites a budget figure.

  Out-of-sweep note for [[CORE-558.N]]: the §"Ledger" measurements are stale by design between release cuts and were deliberately left so. Three rows read stale at HEAD — `SPEC.md` 49,285 (now 51,566, from `.2`), `ft-task` 28,845 (now 29,355, from `.4`), and `ft-release` 39,315 (now 30,619, from [[CORE-556.2]], unrelated to this epic). The next `/ft-release` §7.1 refreshes all three in the same motion that reads them.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Raised two context ceilings that had stopped holding a working margin, and confirmed the other two still do.

The epic's own restores were the trigger: [[CORE-558.2]] added 2,281 chars to `SPEC.md` and [[CORE-558.4]] added 431 to `ft-task`. Neither breached a cap — all three siblings correctly closed handing this child "no ceiling raise needed" — but that is the wrong question. [[CORE-555]] established that a ceiling should hold **two** substantial tasks of room, and named the real defect as "a margin sized below one working unit of contract change". By that standard `SPEC.md` had eroded to ~1.3 units and the `claude/skills/*/SKILL.md` glob was at **0.25** — `ft-task` sat 645 chars under its line, a quarter of one edit on that body.

**Changed:** `docs/CONTEXT-BUDGET.md`, 2 lines in 1 file. `SPEC.md` 55,000 → **57,000** (headroom 3,434 → 5,434, ~2.1 units). `claude/skills/*/SKILL.md` 30,000 → **33,000** (`ft-task` 645 → 3,645, ~1.5 units). Each row records the reason in its existing "Why this number" cell.

**Numbers measured, not invented.** [[CORE-555]]'s +2,567 working unit was re-derived rather than inherited: across 45 commits touching `SPEC.md`, substantial edits run +1,127 to +2,957 and routine ones +5 to +283, so the unit holds and only the headroom had moved. On skill bodies the substantial band is ~+1,200–2,950 (`ft-task`'s own: +3,390 · +2,345 · +1,257 · +1,187).

**Verification:** the §7.1 standing check re-run by hand shows 4/4 budgeted surfaces OK under the new caps, and all 18 glob bodies under 33,000. `grep -rn` over every `*.md` confirms both figures are still stated in exactly one place. The Budgets table is structurally intact at 3 columns, all 8 `[[wikilinks]]` in the changed cells resolve, and `git diff -U0` shows two single-line hunks — §"Known over budget" (still empty) and §"Ledger" are untouched.

**Two things deliberately not done, both against a sibling's stated expectation.** [[CORE-558.2]] handed this child the ledger as "stale until `.5` refreshes it"; `.5` declines. The doc's §"Ledger" declares those measurements `/ft-release` §7.1-owned, [[CORE-555]] left the stamp alone for that reason, and [[CORE-556.2]] wrote the rule out verbatim — *edit CONTEXT-BUDGET in-task only for cap changes*. Refreshing here would also force the stamp to name a task rather than a release. Separately, `SPEC/gates.md` was left at 40,000: `.3` spent only 419 of its margin and 1.8 units is a rounding difference from two, not a defect. Raising it would have been the invented number the task line warns against.

**Maintainability effect:** the two filed successors that grow these surfaces — [[CORE-557]] (`SPEC.md` + three skill Phase 3 restatements) and [[CORE-559]] (`SPEC.md` + six restatements) — would each have run at a budgeted surface with under one edit's headroom, and would have hit the decision mid-task under gate pressure. That is the failure mode [[CORE-555]] described and this raise removes. The ratchet still bites: 57,000 and 33,000 are real caps, the glob still constrains the four large runners, and the glob cell now says in writing that extraction, not another raise, is the answer when a body is actually overgrown.

**Archived:** 2026-09-10
