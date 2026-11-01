---
title: agent-baseline-redundancy-survey
status: starter
tags: [context, survey]
created: 2026-11-01
related-tasks: [CORE-657, CORE-660, CORE-661]
touches:
  - docs/HARNESS-SURVEY.md
---

# CORE-856 | agent-baseline-redundancy-survey

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-01) · 🔗 [[CORE-657]] · 🔗 [[CORE-660]] · 🔗 [[CORE-661]]

## 🌱 Starter context

_Captured 2026-11-01 during a design discussion on flaitron's context bloat — promote to full tasknote at `/ft-task` checkout._

### Why this exists

The operator is concerned flaitron is over-specified relative to what coding
agents now do unprompted. Confirmed pains (all four): per-task token cost,
over-constraining agents, operator maintenance tax, adopter legibility.
Evidence: simple tasks feel heavy, plus a growth hunch.

Both prior `docs/HARNESS-SURVEY.md` passes (2026-09-21, 2026-09-22) compared
flaitron to *other frameworks*; neither compared it to the *agent's own
unprompted behavior*. Pass 6 (Contract decay, [[CORE-661]]) is the existing
subtractive force but runs one clause per measurement window — [[CORE-660]]
took ~10 days to move 11K of gate prose. This survey applies the missing lens
across the whole ordinary-task load path at once.

### Solution shape

- **Map the load path per runner** with `wc -c`: Claude `SPEC.md` (44.8K) +
  `claude/skills/ft-task/SKILL.md` (27K) + `preamble.md` (7.5K) +
  `SPEC/gates.md` (near-universal); Codex/Cursor/Grok `SPEC/procedures/ft-task.md`
  (34K) + their snippets.
- **Classify clauses into buckets:**
  - **A — agent-default restatement** ("Read relevant source files",
    "Implemented the minimal solution", "Ran lint"). Test: would the weakest
    runner in use behave differently without it?
  - **B — harness-primitive explainer** (probe/sub-agent prose, reviewer
    wiring). Cut to the trigger; runner-specific wiring moves to the snippet.
  - **C — rationale/history in loaded text.** Move to `docs/` / archive with a
    pointer; re-examine [[CORE-657]]'s "load-bearing remainder" verdict.
  - **D — self-maintenance machinery** (mirror pairs, KEEP IN SYNC blocks,
    drift-check pairs, the ~118K `/ft-release` dir). Does it protect adopters
    or only flaitron's self-consistency?
  - **E — small-task ceremony.** Sample 8–10 recent small archived tasknotes;
    ceremony lines vs diff size; candidate fixes in
    `SPEC/tasknote-selection.md` thresholds and `--micro` defaults.
  - **F — load-bearing differentiator.** Keep and record so it isn't
    relitigated (HARNESS-SURVEY §"Differentiators").
- **Score** each candidate: per-task bytes saved, maintenance removed,
  legibility, risk.
- **Recommend** (a) an epic with bucket-grouped children, (b) pass 6 → batch
  proposals by bucket, or (c) targeted trims only. Rule: ≥~15% ordinary-task
  load reduction, or bucket E addressed → (a).
- Use probes for the classification fan-out; keep only the distilled table in
  the main window.

### Files to touch (preliminary survey — drift-check at promotion)

- `docs/HARNESS-SURVEY.md` — append `## 2026-11-xx — third pass (agent-baseline lens)` in the existing append-only shape (Landscape → classification table → Overkill re-ranked → Filing).

### Explicitly out of scope

- Any edit to `SPEC.md`, `SPEC/`, `claude/skills/`, or runner snippets — the survey is read-only on the contract.
- Filing the epic — only on operator go at the 📦 gate, via `/ft-open-epic`.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Redundancy baseline | Weakest runner in use (Grok/Codex/Cursor) | Every runner shares the SPEC; a clause is redundant only if none of them needs it |
| Deliverable | Exploration, then decide | Measure before cutting |
| Hard constraints | External-caller parse surface untouched; pass-6 rules hold | HARNESS-SURVEY §"External-caller exposure" (Phase headings, per-phase checkboxes, `status:`/`park-reason:`, `## 🎯 Goal`); labeled mirrors aren't duplication; skipped-fragment catchers stay |

### Acceptance that decides it

- Survey section appended and drift checks pass — `bash tools/drift-checks.sh`
- No contract edits — `git diff --stat` shows no `SPEC.md` / `SPEC/` / `claude/skills/` paths
- Every bucket row cites file + section with a reproducible `wc -c` byte count — `judgment` (read the table)
- Recommendation (a)/(b)/(c) stated with rationale against the 15% / bucket-E rule — `judgment` (operator call at 📦)

### Open at promotion (Phase 1 should resolve)

- What counts as a "small" archived task for bucket E? Lean: ≤50 LOC of non-tasknote diff.
- Does the survey doc need its own `docs/CONTEXT-BUDGET.md` row? Lean: no — read at survey time, not task time.

### Related

- [[CORE-657]] — `related-decision:` De-scoped incident-history trim; bucket C re-examines its verdict
- [[CORE-660]] — `related-decision:` gate-discipline trim via the decay window; the cadence data point
- [[CORE-661]] — `related-decision:` added `/ft-audit context` pass 6, the subtractive force recommendation (b) would change
