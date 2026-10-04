---
title: refresh-model-roster discovery
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353]
---

# CORE-353.1 | refresh-model-roster discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]]

## 🎯 Goal

Scope the `CORE-EPIC-353` epic (`refresh-model-roster`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-353.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (SPEC/model.md tier ladder + glyph section, cue glossary in SPEC.md, docs trigger references, skill glyph emitters, example tokens, contract impact) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via structured ask — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-353.2 .. CORE-353.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-353.N reviewed and confirmed as-filed (M grew 3→4 during Discovery; audit `.N` suffix unaffected)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (SPEC/model.md, SPEC.md cue glossary, SPEC/gates.md, docs/PLATFORMS.md, docs/AGENT-COMPAT.md, docs/AGENT-NEUTRALITY.md, GLOSSARY.md, claude/CAPABILITIES.md, 13 claude/skills glyph emitters + step-1.5-model-edge.md) — logged in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents (CORE-259 tier ladder, CORE-254 cue-glyph lock, CORE-224 trigger references) — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — all cited paths present at HEAD; no drift
- [x] Surface open scoping questions via structured ask (versioning style, effort-mapping direction, mid-tier glyph, child structure) — recorded in "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-353.2 .. CORE-353.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-353 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + refine parent description + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` to update supported models "mostly for effort gate." Discovery reframed the epic from a mechanical string-refresh into a design epic once the vendor effort-axis + mid-tier-glyph questions surfaced.

- [x] Read relevant source files (SPEC/model.md, SPEC.md cue glossary + post-closure protocol, SPEC/gates.md, docs/PLATFORMS.md, docs/AGENT-COMPAT.md, claude/CAPABILITIES.md, step-1.5-model-edge.md)

- [x] **Archive skim** — CORE-259 (added the `medium` rung to the tier ladder, zero change to comparison logic), CORE-254 (locked the post-closure cue glyph vocabulary at two values — the decision `.3` reverses), CORE-224 (non-Claude trigger references pattern in docs/PLATFORMS.md).

- [x] **Drift check** — all cited paths present at HEAD (SPEC/model.md, docs/PLATFORMS.md, docs/AGENT-COMPAT.md, docs/AGENT-NEUTRALITY.md, claude/CAPABILITIES.md, both step-1.5-model-edge.md). No drift.

- [x] Asked clarifying questions (4 structured asks: inputs; versioning style; effort-mapping + glyph direction; re-scoped structure) — see Resolved scoping table.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface (inventory)

- **Effort-gate core (contract):** `SPEC/model.md` — calibration baseline (lines ~73–83: `fable`/`opus`/GPT-5.5-class = heavy; `sonnet`/`grok` = medium; `haiku` = light), practical guidance ("Grok 4.x (2026-05)"), cross-provider notes ("Grok 4.3", "GPT-5"), and §"Tier ladder vs. the next-move suggestion glyph" (the binary-glyph rationale `.3` rewrites).
- **Cue-glyph contract:** `SPEC.md` cue glossary (lines 194–195, 384) + post-closure protocol (522–546); `SPEC/gates.md` glyph references. This is the CORE-254-locked two-glyph vocabulary.
- **Docs currency:** `docs/PLATFORMS.md` (Grok 4.3 ×2, grok-3/grok-4, GPT-5), `docs/AGENT-COMPAT.md` (per-agent rows + last-verified stamps), `docs/AGENT-NEUTRALITY.md` (2026-05), `docs/GLOSSARY.md`, `claude/CAPABILITIES.md` (`/model opus`, last-verified stamp).
- **Glyph emitters:** 13 `claude/skills/**` files emit 🔧/🧠 + `SPEC/procedures/ft-task.md` (agent-neutral SOP). Model-example token lists in step-1.5-model-edge.md (×2) + ft-task/ft-micro-task/ft-stats/ft-audit-* SKILL.md.
- **Codex-neutral finding (load-bearing):** the `codex/` tree carries **zero** concrete model tokens **and zero** 🔧/🧠 glyph emitters — codex skills are agent-neutral and inherit the cue from `SPEC/procedures/`. So both the model-example refresh **and** the glyph propagation are **claude-tree + SPEC only**; codex needs no edits. (The filing-time parent placeholder's "and their codex mirrors" is inaccurate — refine at closure.)

### Scope shift (M 3→4)

Filed as a mechanical string-refresh (M=3). Discovery surfaced two design questions that reshaped it: (A) vendors now expose an **effort axis orthogonal to the named model**, so tier↔model is 2-D; (B) user wants a **mid-tier glyph**. Clarified that flowtron already has a 3-rung *gate* ladder (CORE-259); only the *suggestion glyph* is binary (CORE-254). User chose: (A) keep tier abstract + add an effort-axis note (no frozen table); (B) add a third glyph. This split the SPEC contract work into a low-risk wording child (.2) and a locked-decision-reversal child (.3), plus mechanical propagation (.4) and docs currency (.5). Audit `.N` unaffected.

### Resolved scoping

| # | Question | Resolution |
|---|---|---|
| 1 | Area / shortname / priority / model / M | CORE · refresh-model-roster · Medium · [medium] · M=3 (later →4) + audit |
| 2 | Versioning style for examples | Superseded by Q3 → **abstract tier + effort note** (illustrative-only, no version-pinning) |
| 3 | Which flagships to name | **Claude + Grok + Codex** (leave incidental Gemini mentions untouched) |
| 4a | Tier ↔ (model × effort) mapping | **Abstract tier + effort note** — keep cognitive-load label, no frozen lookup table |
| 4b | Mid-tier suggestion glyph | **Add a third `medium` glyph** — reverse CORE-254's two-glyph lock |
| 5 | Re-scoped child structure | **M=4**: .2 effort-axis-calibration · .3 third-glyph-contract · .4 glyph-emitter-propagation · .5 docs-currency (+ .N audit) |
| 6 | Vendor effort taxonomy facts | Verify exact current per-vendor names/levels via WebSearch inside .2, not from memory |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-352 cohort is the closest precedent for indent/tag/em-dash child-filing style.

- [x] Implemented the minimal solution — wrote 4 child lines (.2..5) under CORE-EPIC-353, before the `.N` audit.

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing).

**Implementation Notes:**

- 4 child lines written (.2 effort-axis-calibration / .3 third-glyph-contract / .4 glyph-emitter-propagation / .5 docs-example-currency); word-counts 43 / 41 / 40 / 30 (all ≤50 target).
- M shifted 3→4 during Discovery (glyph split from effort-axis); audit `.N` suffix unaffected.
- Fixed the `.1` line's child range `.2..4` → `.2..5`.
- Downstream-impact scan: active PLAN has no other entries (High/Low/Future empty) — **no downstream impact**.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose PLAN.md edits only)

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass done (indent / bold IDs / tag+glyph / ≤30-char shortnames / em-dash / ≤70w all pass)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry in README §"AI-referenced docs" = **no change** (Discovery touched only PLAN.md + this tasknote; contract edits land in children .2–.5).

- [x] Closed — `.1` PLAN.md line flipped to stub form `Completed 2026-07-13.`; tasknote moved to `.flowtron/tasknote/archive/core/`. Parent description refined from filing-time placeholder.

- [x] Recap drafted (below).

**Final Summary:**

Filed `CORE-EPIC-353` (refresh-model-roster) and drove its `.1` Discovery to close. Discovery reframed the epic from a mechanical version-string refresh into a design epic once two surfaces emerged: (A) vendors now expose an **effort axis orthogonal to the named model**, and (B) the user wants a **mid-tier suggestion glyph**. Clarified that flowtron already has a 3-rung *gate* ladder (CORE-259) — only the post-closure *glyph* is binary (CORE-254). Locked directions: keep tier abstract + add an effort-axis note (no frozen table); add a third `[medium]` glyph. Two load-bearing findings: the `codex/` tree carries **zero** model tokens **and** zero glyph emitters (agent-neutral; inherits `SPEC/procedures/`), so both refresh and glyph propagation are **claude-tree + SPEC only**. Filed M=4 children (up from 3): `.2` effort-axis-calibration `[medium]` · `.3` third-glyph-contract `[heavy]` · `.4` glyph-emitter-propagation `[light]` · `.5` docs-example-currency `[light]`, plus the reserved `.N` audit. No downstream impact.

**Archived:** 2026-07-13
