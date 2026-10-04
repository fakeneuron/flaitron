---
title: model-effort-inventory
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-482.1]
touches:
  - SPEC/model.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - SPEC.md
supersedes:
  - CORE-353.2
---

# CORE-482.2 | model-effort-inventory

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]] [[CORE-482.1]]

## 🎯 Goal

Build the maintained platform×model×effort calibration table in SPEC/model.md — current rosters and effort ladders for Claude, OpenAI, xAI, and Google peers, each row mapped to a tier-band equivalence — and refresh the hard-coded roster in step-1.5-model-edge.md and the SPEC.md token examples.

## ✅ Acceptance

- [x] SPEC/model.md carries a platform×model×effort calibration table — Claude, OpenAI, xAI, Google rows, each mapped to a tier-band equivalence (incl. the filed `sonnet@xhigh ≈ heavy-band` example) — with an explicit refreshed-at-releases maintenance note and an as-of date
- [x] Both "no frozen/maintained lookup table" sentences in SPEC/model.md (calibration baseline + effort axis) reconciled with the new table without weakening the tier-is-task-load contract, the gate's self-assessment rule, or the no-variant-token rule
- [x] Roster names verified current against live vendor documentation before landing in the table (web search 2026-08-27 + bundled claude-api reference for the Claude rows)
- [x] step-1.5-model-edge.md legacy-entry roster refreshed to current names, consistent with the table
- [x] SPEC.md `[model]` column token examples refreshed to current names
- [x] Out-of-scope surfaces untouched: SPEC/gates.md glyph tables, SPEC.md cue glossary, and the practical-guidance default bias all belong to [[CORE-482.3]]

## 🧩 Subtasks

- [ ] Web-verify current rosters + effort ladders: Claude (5 family), OpenAI (GPT-5.x + Codex line), xAI (Grok 4.x), Google (Gemini 3.x)
- [ ] Draft the calibration table as a new SPEC/model.md subsection under §"Effort axis" — one row per platform×model, columns for effort ladder + tier-band equivalence, as-of date + refresh-at-release note
- [ ] Reconcile the two no-table sentences (calibration baseline intro + effort-axis paragraph): the table is a calibration *reference* maintained at releases; gate-time tier reading stays self-assessed
- [ ] Refresh the hard-coded roster in step-1.5-model-edge.md §"Legacy entry" and point it at the table
- [ ] Refresh SPEC.md `[model]` column token examples (line ~184)
- [ ] Phase 3: markdown mental-pass + cross-file roster-consistency grep
- [ ] Phase 4: doc-drift sweep, tick-through, PLAN stub flip (nested), archive

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)
- [[CORE-482.1]] — epic Discovery; resolved scoping table governs this child (effort stays orthogonal session config; table refreshed at releases)
- [[CORE-482.3]] — successor (blocked-by: this task; shared SPEC/model.md surface per the .1 Fan-out)
- [[CORE-353.2]] — supersedes: reversed its "no maintained cross-provider model→tier table" decision (the effort-axis framing it added survives)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** First implementation child of CORE-EPIC-482, filed one session ago by the `.1` Discovery with an operator-resolved scoping table; nothing has moved since. The table closes the real gap that automated choosers (caobunga) have no calibration reference for tier-band picks.

- [x] Read relevant source files — SPEC/model.md (full), claude/skills/ft-task/step-1.5-model-edge.md (full), SPEC.md `[model]` column + grammar examples (lines ~184, ~218, ~292–293)

- [x] **Best Practices Review** — N/A (markdown contract surfaces only; no code-module boundaries). The pattern to extend: SPEC/model.md's existing §-per-concern structure; the table lands as a sibling subsection of §"Effort axis" rather than inflating the calibration-baseline bullets.

- [x] **Archive skim** — via `touches:` grep: [[CORE-353.2]] (added the effort-axis section and the "no frozen table" decision this task reverses — `supersedes:` recorded in YAML), [[CORE-259]] (medium rung; tier-count-agnostic ladder design — the table must not turn the ladder into a lookup the gate *requires*), [[CORE-400]] (made step-1.5-model-edge.md a shared fragment — edits there reach /ft-task, /ft-micro-task, /ft-goal-task), [[CORE-482.1]] (resolved scoping table; Fan-out declares .3 sequential after this task).

- [x] **Drift check** — no drift: SPEC/model.md still carries both "no maintained table" sentences (calibration-baseline intro + effort-axis ¶3); step-1.5-model-edge.md §"Legacy entry" still hard-codes `fable`/`opus` (heavy), `sonnet`/`grok` (medium), `haiku` (light); SPEC.md line 184 still lists `fable, opus, sonnet, haiku, gpt-5, gemini-pro`. Plan matches the PLAN.md line and the .1 resolution verbatim; the deliberate contradiction with CORE-353.2's decision is the epic's point, recorded via `supersedes:`.

- [x] Asked clarifying questions — No clarifications needed. Explicit assumptions: (1) table rows use bare family tokens + `@effort` notation (`sonnet@xhigh`), matching the filed example and the no-variant-token rule; (2) table ships with the current three bands — the `[xheavy]` rung is [[CORE-482.3]]'s edit, which may re-band top-end rows; (3) rosters verified via web search before landing, table stamped with an as-of date; (4) SPEC.md grammar examples at lines 292–293 (`[opus]`) stay — they illustrate grammar, not roster currency.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Surfaces in scope:** SPEC/model.md §"Category-vs-concrete matching" (calibration baseline bullets — intro sentence says "flowtron does not pin a cross-provider model→tier table that needs maintenance every release") · §"Effort axis" (¶3 "not a frozen model→tier lookup table"; effort ladders already list Claude `low/medium/high/xhigh/max`, Grok `none/low/medium/high`, Codex `none/low/medium/high/xhigh/max` + `minimal`) · step-1.5-model-edge.md §"Legacy entry" roster sentence · SPEC.md `[model]` column examples.
- **Reconciliation frame:** the table is a *calibration reference* refreshed at releases; the Step 1.5 gate keeps reading the active model's self-assessed tier — the table informs the assessment, it does not become a required lookup. Tier stays a task-load label; no variant tokens.
- **Sequencing guard:** practical-guidance bias flip, `[xheavy]`🔭 rung, gates.md glyph tables, cue glossary, /ft-stats buckets — all `.3` scope; leave untouched here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended SPEC/model.md's §-per-concern shape (new `##` section between §"Effort axis" and §"Practical guidance"); plain-text task-ID citations match the module's existing §"History" style; dated-stamp maintenance mirrors the AGENT-COMPAT `last-verified` convention in spirit without adding a new stamp grammar

- [x] **Minimal refactor gate** — no refactor; the two "no frozen table" sentences were reworded only as far as Acceptance requires (reconciling them with the table), keeping the self-assessment and no-variant-token contracts verbatim in spirit

- [x] Implemented the minimal solution — calibration table section added to SPEC/model.md; both no-table sentences reconciled; Grok effort ladder updated (`xhigh` at 4.6+); roster refreshes in step-1.5-model-edge.md §"Legacy entry", SPEC/model.md intro token list, SPEC.md `[model]` column examples

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract surfaces; CI drift greps are the executable check, run in Phase 3)

**Implementation Notes:**

- Roster sources: Claude rows verified against the bundled claude-api reference (Fable 5 / Opus 5 / Sonnet 5 five-rung effort ladder, default `high`; **Haiku 4.5 takes no effort parameter** — its ladder cell says so rather than inventing one). OpenAI (GPT-5.5 / GPT-5.4 / GPT-5.3 Codex), xAI (Grok 4.6, `xhigh` new at 4.6), Google (Gemini 3.1 Pro / 3.7 Flash / Deep Think) verified by web search 2026-08-27.
- The table intro's maintenance claim was corrected mid-execution: `/ft-release` has no generic "doc-currency pass" row that could own the sweep — the honest mechanism is the release cut's `/ft-audit docs` subroutine flagging the dated as-of stamp. Registering a dedicated ft-release gate row was considered and rejected as scope creep beyond the filed line.
- step-1.5-model-edge.md roster now tier-buckets cross-provider (`gemini-pro` heavy; `codex`/`gemini-flash` medium) and points at the table for `gpt-5` sub-family nuance — the one-liner can't honestly bucket a family spanning heavy→light.
- ft-stats bucket roster (`fable`/`opus`/`sonnet`/`haiku` named buckets) untouched — still consistent; `[xheavy]` bucketing is [[CORE-482.3]]/.N scope.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for markdown; ran the CI `drift` job's greps locally instead (wrapper-name invariant OK, claude↔codex skill parity OK, Pair A roster clauses OK)

- [x] Ran lint/type-check on changed code — markdown mental-pass: new table is uniformly 6 columns (awk field-count check: 11×8-field rows vs the existing 5×4-field gate table); no trailing whitespace in changed files; plain-text task-ID citations match §"History" house style (no unintended wikilinks in SPEC surfaces)

- [x] **Quality assertions** — no stale "frozen"/"does not pin a table" language survives anywhere in SPEC/ or docs/; step-1.5 fragment doesn't duplicate the table (one-liner + pointer); no public-surface growth beyond the one new SPEC section the epic filed

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: **updated** (`[model]` column token examples refreshed — part of this task's deliverable) · docs/MIGRATION.md: no change (its `[opus]`/`[sonnet]` lines are grammar illustrations, still-valid tokens) · claude/AGENTS-snippet.md: no change · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: **updated** (SPEC/model.md ledger-row provenance chain gains the CORE-482.2 calibration-table entry) · docs/PLATFORMS.md: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.2` line flipped to stub form and kept 2-space nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Final Summary:**

Built the platform×model×effort calibration table in SPEC/model.md — nine family-level rows (Anthropic `fable`/`opus`/`sonnet`/`haiku`, OpenAI `gpt-5`/`codex`, xAI `grok`, Google `gemini-pro`/`gemini-flash`) mapping current rosters and effort ladders to tier-band equivalences, dated **as of 2026-08-27** and refreshed at releases via the release cut's `/ft-audit docs` subroutine. Reconciled both "no frozen/maintained table" sentences (calibration baseline + effort axis) with the new section — self-assessment stays the gate rule; the table calibrates, never replaces — recording the reversal of CORE-353.2's no-table decision via YAML `supersedes:` on this note (a superseded decision, not a falsified fact — no ⚠️ pointer written). Rosters verified live: Claude rows against the bundled claude-api reference (five-rung effort ladder on the 5-family; Haiku 4.5 has no effort parameter), OpenAI/xAI/Google by web search (GPT-5.5/5.4/5.3-Codex; Grok 4.6 adding `xhigh`; Gemini 3.1 Pro / 3.7 Flash). Refreshed the hard-coded roster in step-1.5-model-edge.md (now cross-provider, pointing at the table) and SPEC.md `[model]` token examples (+`grok`, `codex`); updated the Grok effort ladder in §"Effort axis". Verification: CI drift-job greps run locally (wrapper-name, skill parity, Pair A — all clean); table column-count check; no stale "frozen"/"does not pin" language survives. Docs verdict: SPEC.md + AGENT-NEUTRALITY.md updated as part of the deliverable; 11 remaining AI-referenced docs unchanged. `.3` (xheavy rung + round-up guidance) now unblocked per the Fan-out sequence.

**Archived:** 2026-08-27
