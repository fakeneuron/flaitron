---
title: effort-axis-calibration
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353, CORE-353.1]
---

# CORE-353.2 | effort-axis-calibration

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]]

## 🎯 Goal

Rework `SPEC/model.md`'s calibration baseline to add an effort-axis note (each abstract tier is realizable as small-model-high-effort or big-model-low-effort; tier stays a cognitive-load label, no frozen table) and refresh the roster examples to current Claude/Grok/Codex as illustrative-only.

## ✅ Acceptance

- [ ] `SPEC/model.md` carries a new effort-axis note: each abstract tier (`light`/`medium`/`heavy`) is realizable as small-model-high-effort or big-model-low-effort; tier stays a cognitive-load label, never a frozen model→tier table
- [ ] Calibration-baseline roster examples refreshed to name Claude, Grok, and Codex as the three illustrative flagship vendors, with no hard version-pinning (per CORE-353.1 Resolved scoping Q2/Q3)
- [ ] Per-vendor current effort-level naming verified via WebSearch (not recalled from memory) and reflected accurately in the note
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Draft the effort-axis note (placement: `SPEC/model.md` §"Category-vs-concrete matching", new `## Effort axis (orthogonal to model choice)` section after the match table)
- [x] Refresh the `heavy`/`medium`/`light` calibration-baseline bullets to cite Claude/Grok/Codex illustratively, dropping version-pinned tokens (`GPT-5.5-class`) in favor of generic vendor-neutral phrasing
- [x] Markdown mental-pass on the edited section (prose flow, bullet grammar, cross-refs)
- [x] Phase 3: lint/type-check N/A (prose-only SPEC edit); no frontend surface
- [x] Phase 4: doc-drift sweep + flip PLAN.md line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)
- [[CORE-353.1]] — Discovery predecessor; filed this child's scope + the "Resolved scoping" table this task executes against

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches CORE-353.1's filed scope exactly; no drift, no new information changes the shape of the work.

- [x] Read relevant source files (`SPEC/model.md` in full; `.flowtron/tasknote/archive/core/CORE-353.1.md` predecessor)

- [x] **Archive skim** — `.1` (predecessor) already ran the epic-level shared-surface skim (CORE-259: added the `medium` rung, zero gate-logic change; CORE-254: locked the two-value glyph vocabulary, reversed by sibling `.3`; CORE-224: non-Claude trigger-reference pattern). Targeted re-check for `.2`'s narrower scope: `CORE-259` and `CORE-256` archived tasknotes confirm the current tier-ladder text (position-based matching, `light < medium < heavy`) is their intended end state — nothing to unwind.

- [x] **Drift check** — `SPEC/model.md`'s calibration-baseline bullets (§"Category-vs-concrete matching", lines ~69-83) and the "Tier ladder vs. next-move glyph" section (~157-167) cited in `.1`'s Discovery Notes still match current file content at HEAD. No drift.

- [x] Asked clarifying questions — **No clarifications needed.** `.1`'s "Resolved scoping" table (Q2/Q3/4a/6) already pins this child's exact deliverable. Explicit assumption logged: this child's edit surface is `SPEC/model.md`'s calibration-baseline bullets + a new effort-axis note; the file's other stale version-pinned prose (`Practical guidance`'s "Grok 4.x (2026-05)" usage line, `Cross-provider calibration`'s historical Grok-4.3-retag anecdote) is judgment-included only where it's a generic illustrative roster example — the one-off historical anecdote documenting a specific past PLAN.md event is left untouched (it's a record, not a roster list). Remaining docs-tree version pins outside `SPEC/model.md` stay with sibling `.5`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**WebSearch verification of current per-vendor effort-axis naming (2026-07-13):**

- **Claude (Anthropic):** `effort` parameter — `low` / `medium` / `high` / `max`, with `xhigh` on some newer models (matches this very session's own tool surface, which exposes `low`/`medium`/`high`/`xhigh`/`max`).
- **Grok (xAI):** `reasoning_effort` (Chat Completions) / `reasoning.effort` (Responses API) — `none` / `low` / `medium` / `high`; default varies by model (Grok 4.3 defaults `low`, Grok 4.5 defaults `high`).
- **OpenAI / Codex:** `none` / `low` / `medium` / `high` / `xhigh` / `max` depending on model generation; Codex CLI additionally exposes a `minimal` rung below `low`, and the Codex app/IDE surface uses "Light" where the CLI says "Low." OpenAI's own Codex prompting guide recommends `medium` as the default for interactive coding.

All three vendors now expose an effort axis that is independent of which named model is selected — confirms the epic-level framing from `.1` (tier↔model is 2-D) and gives concrete, current vendor terminology for the new note. No exact version-pinned model IDs will be written into `SPEC/model.md` (per Resolved scoping Q2/Q3 — illustrative-only, no version-pinning); the per-vendor effort-level *names* above inform the note's accuracy but the note itself stays abstract.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing "## Section" prose-note pattern already used by sibling sections in `SPEC/model.md` (`## Practical guidance...`, `## Tier ladder vs. the next-move suggestion glyph`) rather than inventing a new heading depth or a table/schema.

- [x] Implemented the minimal solution — edited `SPEC/model.md` only: refreshed the three calibration-baseline bullets (heavy/medium/light) to name Claude/Grok/Codex illustratively with no version pins, and added a new `## Effort axis (orthogonal to model choice)` section documenting the vendor effort parameters and the "tier ≠ frozen model table" principle.

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only SPEC contract edit, no executable surface).

**Implementation Notes:**

- Left `Practical guidance`'s "Grok 4.x (2026-05)" usage line and `Cross-provider calibration`'s historical Grok-4.3-retag anecdote untouched — the former is a stale-but-out-of-narrow-scope usage stat, the latter documents a specific past event, not a roster example; both are within sibling `.5`'s "docs-example-currency" remit if still stale after `.3`/`.4` land.
- `codex` is deliberately placed only in the `medium` bullet (its own vendor-documented default effort), not duplicated into `heavy` — the new Effort axis section explains that any tier is reachable by dialing effort, so no single bullet needs every vendor listed at every tier.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; no executable test surface (`SPEC/model.md` is a prose contract doc, not code)

- [x] Ran lint/type-check on changed code — N/A (no markdown linter configured in this repo); `git status --short` confirms only `SPEC/model.md` changed (plus the new tasknote), no stray edits; markdown mental-pass done (heading hierarchy consistent with sibling `##` sections, bullet/table grammar intact, cross-ref `§"Effort axis"` resolves to the new heading)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 AI-referenced docs = **no change** (`SPEC/model.md` is a lazy module, explicitly outside the default cold-start sweep per README §"AI-referenced docs"; grepped all 12 for `GPT-5.5-class` / `calibration baseline` — zero hits, nothing referenced the changed text).

- [x] Closed — PLAN.md line flipped to stub form; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (below).

**Final Summary:**

Reworked `SPEC/model.md`'s calibration baseline for the model×effort era. Added a new `## Effort axis (orthogonal to model choice)` section documenting that vendor APIs now expose a reasoning-effort parameter independent of model choice (Claude `low`/`medium`/`high`/`max`(+`xhigh`), Grok `none`/`low`/`medium`/`high`, Codex `none`/`low`/`medium`/`high`/`xhigh`/`max`(+CLI `minimal`) — verified current via WebSearch, not recalled) — and states plainly that flowtron's tier stays a cognitive-load label, realizable as either a big model at low effort or a small model at high effort, never a frozen model→tier table. Refreshed the `heavy`/`medium`/`light` calibration-baseline bullets to name Claude/Grok/Codex illustratively, dropping the version-pinned `GPT-5.5-class` phrasing (per CORE-353.1's Resolved scoping: no version-pinning). Edit surface: `SPEC/model.md` only, ~25 lines added/changed. Left the file's other stale version-pinned prose (Practical guidance's dated Grok usage stat, the historical Grok-4.3-retag anecdote) untouched — out of this child's narrow scope, deferred to sibling `.5`.

**Archived:** 2026-07-13
