---
title: xheavy-rung-round-up
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-482.2]
blocked-by:
  - CORE-482.2
---

# CORE-482.3 | xheavy-rung-round-up

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]]

## 🎯 Goal

Add the manual-only `[xheavy]`🔭 exploratory rung above `heavy` across every tier-vocabulary surface (SPEC/model.md, SPEC.md cue glossary + post-closure protocol, SPEC/gates.md glyph tables, the ft-task Step 1.5 gate fragment, /ft-stats buckets) and flip SPEC/model.md practical guidance to the round-up default (`[medium]` default; `[light]` only for provably mechanical work).

## ✅ Acceptance

- [x] SPEC/model.md tier ladder gains the fourth `xheavy` rung (`light < medium < heavy < xheavy`), position-based matching unchanged; `[xheavy]` documented as a **manual-only exploratory tag outside the primary trio** — automated choosers cap at `[heavy]` (prose contract, no new gate machinery)
- [x] Step 1.5 gate rule for `[xheavy]`: **always the ⚠️ under-tier advisory** (no roster model bands xheavy at default effort; note-then-proceed, operator decides) — reflected in SPEC/model.md matching table + ft-task SKILL.md Step 1.5 + step-1.5-model-edge.md; legacy-entry ask keeps recommending the trio only
- [x] 🔭 `XHEAVY` (exploratory) added to the next-task cue surfaces: SPEC/gates.md next-task cues table (+ glyph-layers coherent-reuse note), SPEC.md cue glossary row, SPEC.md post-closure protocol steps 2–3, SPEC/model.md §"Tier ladder vs. the next-move suggestion glyph" — mirror stays 1:1 across four rungs
- [x] SPEC/model.md §"Practical guidance" flipped to the round-up default: `[medium]` is the default, escalate freely to `[heavy]` on ambiguity/design smell, `[light]` reserved for provably mechanical clear-diff work, explicit "when in doubt, round up" rule for automated choosers
- [x] /ft-stats Section A + bucket sentence gain the `xheavy` tier bucket
- [x] Follow-up children **CORE-482.4** (emitter-glyph propagation: ~8 skill label-lists + SPEC/procedures/ft-task.md + docs/GLOSSARY.md + micro/goal Step 1.5 restatements) and **CORE-482.5** (viz parser 🔭 suggestion-glyph tolerance + test) filed in PLAN.md before `.N` (downstream-impact scan; user-confirmed 2026-08-27)
- [x] Out-of-scope honored: no emitter/parser code edits here, no `--unattended` park row, no calibration-table re-banding

## 🧩 Subtasks

- [ ] SPEC/model.md — extend the ladder + §"Category-vs-concrete matching" (fourth rung, always-advisory xheavy row in the match table, manual-only framing near the primary-labels intro)
- [ ] SPEC/model.md — flip §"Practical guidance and agent-aware defaults" to the round-up default
- [ ] SPEC/model.md — widen §"Tier ladder vs. the next-move suggestion glyph" to four glyphs + History note
- [ ] SPEC.md — cue glossary 🔧/🧩/🧠 row gains 🔭 `XHEAVY`; post-closure protocol steps 2–3 accommodate the fourth glyph
- [ ] SPEC/gates.md — §"Next-task cues" table + prose, §"Glyph layers and reuse" table row
- [ ] claude/skills/ft-task/SKILL.md Step 1.5 + step-1.5-model-edge.md — four-rung ladder, always-advisory xheavy branch note, legacy-entry trio unchanged
- [ ] claude/skills/ft-stats/SKILL.md — `xheavy` bucket (parse rule + Section A row)
- [ ] File CORE-482.4 + CORE-482.5 lines into PLAN.md between `.3` and `.N`
- [ ] Phase 3: markdown mental-pass + CI drift greps locally
- [ ] Phase 4: doc-drift sweep, tick-through, PLAN stub flip (nested), archive

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)
- [[CORE-482.2]] — blocked-by: sequential predecessor (shared SPEC/model.md surface; completed 2026-08-27)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Second (final) implementation child of CORE-EPIC-482, filed by the `.1` Discovery with an operator-resolved scoping table; `.2` closed earlier today and explicitly deferred exactly this scope ("practical-guidance bias flip, `[xheavy]`🔭 rung, gates.md glyph tables, cue glossary, /ft-stats buckets — all `.3` scope"). Nothing has moved since.

- [x] Read relevant source files — SPEC/model.md (full), SPEC/gates.md (full), SPEC.md cue glossary + post-closure protocol + `[model]` column, claude/skills/ft-task/step-1.5-model-edge.md (full), claude/skills/ft-stats/SKILL.md (full), viz/src/parser.ts glyph tolerance (targeted grep)

- [x] **Best Practices Review** — N/A for code (markdown contract surfaces; the two flagged code/emitter surfaces are deliberately split to `.4`/`.5`). Pattern to extend: the ladder's tier-count-agnostic "by position, not by count" design (CORE-259) absorbs a fourth rung with zero matching-logic change; CORE-353.3 is the direct precedent for a one-glyph cue-vocabulary widening.

- [x] **Archive skim** — [[CORE-482.1]] (resolved scoping table: `[xheavy]`🔭 manual-only, round-up default, Fan-out `.3` after `.2`); [[CORE-482.2]] (calibration table landed; its Implementation Notes name this task's exact deferred scope and left the ft-stats roster untouched on purpose); [[CORE-353.3]] (🧩 widening precedent — **also surfaced that the viz parser's hard-coded suggestion-glyph alternation broke on the new glyph**, fixed by CORE-353.6, and that emitter propagation was its own child .4); [[CORE-259]] (medium rung; ladder reads by position).

- [x] **Drift check** — no drift: SPEC/model.md §"Category-vs-concrete matching" still reads `light < medium < heavy` / "Three tiers"; §"Practical guidance" still opens `[light]` with "start here by default"; SPEC/gates.md next-task cues still three glyphs + 👇; SPEC.md cue glossary row still `🔧 / 🧩 / 🧠`; step-1.5-model-edge.md legacy-entry still recommends the trio; ft-stats still buckets `heavy/medium/light` + named + `other`/`legacy` (unknown `xheavy` would today land in `other`); viz `parser.ts:100` `SUGGESTION_GLYPH = (?:🧠|🔧|🧩)` — confirms the `.5` follow-up need. Plan matches the PLAN.md line and the `.1` resolutions verbatim.

- [x] Asked clarifying questions — three via AskUserQuestion, all resolved to the recommended option (2026-08-27): (1) **Gate match:** `[xheavy]` is never tier-satisfied — always the ⚠️ under-tier advisory (note-then-proceed); calibration table untouched. (2) **Scope:** emitter propagation + viz parser tolerance filed as new children `.4`/`.5` before `.N` (CORE-353 precedent), not folded in. (3) **Vocabulary:** `[xheavy]` stays outside the primary trio; manual-only is prose contract (automated choosers cap at `[heavy]`), no `--unattended` park row.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Edit surface (this task):** SPEC/model.md (ladder, match table, manual-only framing, guidance flip, glyph-mirror section) · SPEC.md (cue glossary row, post-closure steps 2–3) · SPEC/gates.md (next-task cues table + prose, glyph-layers reuse row) · claude/skills/ft-task/SKILL.md Step 1.5 + step-1.5-model-edge.md · claude/skills/ft-stats/SKILL.md · .flowtron/PLAN.md (two new child lines).
- **Deferred to `.4` (emitter propagation):** hard-coded `[heavy]🧠 / [medium]🧩 / [light]🔧` label-lists in ft-task Step 6, ft-micro-task, ft-close-epic, ft-epic-discovery, ft-refactor, ft-audit, ft-audit-context, ft-audit-repo SKILL.md + codex mirrors + SPEC/procedures/ft-task.md + docs/GLOSSARY.md + the micro/goal Step 1.5 trio restatements.
- **Deferred to `.5` (viz):** `parser.ts:100` suggestion-glyph alternation `(?:🧠|🔧|🧩)` → add 🔭 + test (CORE-353.6 shape).
- **Downstream-impact scan:** active PLAN sections hold only this epic's cohort; the impacted "entries" are the two gaps above, resolved by filing `.4`/`.5` — user confirmed via the Scope ask. No other active entry shares the surface.
- **Design guards:** ladder extension must keep "by position, not by count"; 🔭 is unused across all three glyph layers and the non-cue residual (verified against SPEC/gates.md tables); cue-table addition is the deliberate vocabulary change the epic itself authorizes (per §"Glyph layers and reuse" deliberation rule); no variant tokens; `.N` audit additionally verifies parser/stats accept `xheavy` per the `.1` acceptance note.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the two established shapes: CORE-259's position-based ladder (fourth rung, zero matching-logic change) and CORE-353.3's one-glyph cue widening (🔭 rides the same table rows, History paragraphs, and mirror-claim sentences 🧩 did)

- [x] **Minimal refactor gate** — no refactor; prose edits limited to the five filed surfaces + the round-up flip. One consistency fix beyond the literal list: the "When in doubt, start with the label…" bullet in §"Cross-provider calibration" contradicted the new round-up default and was flipped to match (same file, same section family — Acceptance-required coherence, not cleanup)

- [x] Implemented the minimal solution — see Implementation Notes

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract surfaces; CI drift greps are the executable check, run in Phase 3; parser test lands with [[CORE-482.5]])

**Implementation Notes:**

- **SPEC/model.md** — intro gains the manual-only `[xheavy]`🔭 sentence (outside the primary trio); category-tag lists widened to four; ladder now `light < medium < heavy < xheavy` ("Four tiers", CORE-482.3 noted alongside CORE-259); new "The `xheavy` rung is manual-only" block (chooser cap + no-default-band ⚠️-always rule); match table gains the `[xheavy]`-always-advisory row; §"Practical guidance" flipped to the round-up default (new standing-bias paragraph, `[light]` header reworded "only when provably mechanical", `[medium]` header "the default", new "When to choose `[xheavy]`" block, when-in-doubt bullet flipped); glyph-mirror section widened to four glyphs + History sentence.
- **SPEC.md** — cue glossary row now `🔧 / 🧩 / 🧠 / 🔭` with `XHEAVY` label + "exploratory (manual-only)"; post-closure step 2 emits `[xheavy]🔭` (marked rare) and mirrors four rungs; step 3 copy-glyph list widened.
- **SPEC/gates.md** — §"Next-task cues" gains the 🔭 `XHEAVY` row + four-glyph prose + CORE-482.3 History sentence + rare-by-design note; §"Glyph layers" layer-3 line and reuse-table row widened; destructive-escalation non-command cue list gains 🔭.
- **Step 1.5 gate** — ft-task SKILL.md category list widened + always-advisory xheavy sentence on the under-tier branch; step-1.5-model-edge.md: category list in Mismatch, new xheavy paragraph under Category under-tier, legacy-entry ask gains round-up phrasing + do-not-offer-`[xheavy]` rule.
- **ft-stats** — `xheavy` tier bucket (parse rule, field enum, Section A row above `heavy`, always-shown sentence, Step 3 render note).
- **PLAN.md** — filed [[CORE-482.4]] (emitter propagation, [light]) + [[CORE-482.5]] (viz 🔭 tolerance + test, [light]) between `.3` and `.N`, per the user-confirmed downstream-impact scan.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for markdown; ran the CI `drift` job's greps locally instead (wrapper-name invariant OK, claude↔codex shipped-skill parity OK, Pair A roster clauses OK, Pair B flag parity OK, Pair C back-link depth OK)

- [x] Ran lint/type-check on changed code — markdown mental-pass: no residual "Three tiers"/"three rungs"/"three glyphs"/"three values" claims in any touched file (grep clean); ladder block reads `light < medium < heavy < xheavy`; no trailing whitespace in changed files; new PLAN child lines keep 2-space nesting, bold IDs, `[light]` tags, em-dash separators, both under the 70w cap (.4 ≈ 48w, .5 ≈ 33w)

- [x] **Quality assertions** — no duplication: the manual-only contract lives once in SPEC/model.md, other surfaces point at it; no stale docs among touched files; public-surface growth is exactly the one glyph/rung the epic authorizes (cue-table addition per the §"Glyph layers and reuse" deliberation rule); no code changed

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; viz work is [[CORE-482.5]])

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: **updated** (cue glossary row + post-closure steps 2–3 — part of this task's deliverable) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change (its `[medium]`-often / `[light]`-mechanical guidance already reads round-up-consistent) · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: **updated** (SPEC/model.md ledger-row provenance chain gains the CORE-482.3 entry) · docs/PLATFORMS.md: no change here — its trio label rows are hard-coded emitter restatements, deferred to the filed [[CORE-482.4]] · claude/CAPABILITIES.md: no change here — same deferral to [[CORE-482.4]] · docs/AGENT-COMPAT.md: no change · docs/EXTERNAL-AGENTS.md: no change · docs/WORKTREES.md: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.3` line flipped to stub form and kept 2-space nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Final Summary:**

Added the manual-only **`[xheavy]`🔭 exploratory rung** above `heavy` and flipped flowtron's practical model guidance to the **round-up default**. The tier ladder is now `light < medium < heavy < xheavy` — still matched by position, not count (CORE-259's design absorbs the fourth rung with zero comparison-logic change). `[xheavy]` stays **outside the primary trio**: a deliberate operator-only filing for open-ended exploratory work, which automated choosers must never pick up (cap at `[heavy]`, prose contract, no new gate machinery) and which the Step 1.5 gate reads as **always the ⚠️ under-tier advisory** (no roster model bands at `xheavy` by default; note-then-proceed, expected rather than exceptional). 🔭 `XHEAVY` joined the next-task cue vocabulary across SPEC/gates.md (cue table, glyph-layers rows, escalation-bound list), SPEC.md (cue glossary, post-closure steps 2–3), and SPEC/model.md's glyph-mirror section — a one-glyph widening by the CORE-353.3 precedent. Practical guidance now leads with the standing round-up bias: `[medium]` default, escalate freely to `[heavy]`, `[light]` only for provably mechanical clear-diff work, "when in doubt, round up" (binding automated choosers especially). `/ft-stats` gained the `xheavy` tier bucket. Operator resolved three design asks (gate semantics, propagation scope, vocabulary framing) to the recommended options; the downstream-impact scan filed **CORE-482.4** (emitter-glyph propagation) and **CORE-482.5** (viz parser 🔭 tolerance — `parser.ts:100` still hard-codes `🧠|🔧|🧩`, the CORE-353.6 failure shape) before `.N`. Changed: SPEC/model.md, SPEC.md, SPEC/gates.md, ft-task SKILL.md Step 1.5 + step-1.5-model-edge.md, ft-stats SKILL.md, docs/AGENT-NEUTRALITY.md, PLAN.md (2 new child lines). Verification: CI drift-job greps run locally (wrapper-name, shipped-skill parity, Pairs A/B/C — all clean); no residual three-tier/three-glyph claims in touched files. Docs verdict: SPEC.md + AGENT-NEUTRALITY.md updated as deliverable; PLATFORMS/CAPABILITIES label rows deferred to `.4`; 13 remaining AI-referenced docs unchanged.

**Archived:** 2026-08-27
