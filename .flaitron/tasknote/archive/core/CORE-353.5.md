---
title: docs-example-currency
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353, CORE-353.1, CORE-353.2, CORE-353.3]
---

# CORE-353.5 | docs-example-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]]

## 🎯 Goal

Refresh remaining stale/version-pinned model strings and last-verified stamps in docs (PLATFORMS.md, AGENT-COMPAT.md, AGENT-NEUTRALITY.md, GLOSSARY.md, CAPABILITIES.md) plus skill example token lists not covered by `.2`, aligning all to the `.2`/`.3` decisions.

## ✅ Acceptance

- [ ] `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `claude/CAPABILITIES.md` reviewed for stale/version-pinned model strings and last-verified stamps; each either updated or confirmed as needing no change (with reason logged)
- [ ] Skill example token lists (e.g. `step-1.5-model-edge.md` ×2, `ft-task`/`ft-micro-task`/`ft-stats`/`ft-audit-*` SKILL.md) not already covered by `.2`/`.4` reviewed and refreshed for currency
- [ ] All refreshed examples align with `.2`'s illustrative-only, no-version-pinning direction and `.3`'s three-glyph decision (no reintroduced binary-glyph language)
- [ ] No new decisions made — mechanical currency refresh only, inheriting `.2`/`.3`'s locked directions
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Update `docs/PLATFORMS.md`'s Grok Build "Effort / thinking level" trigger row (line 282) — replace the stale model-selection framing (`grok-3` vs `grok-4`) with the effort-parameter framing per `.2`'s WebSearch findings, abstract/no version-pinning
- [ ] Add a symmetric Codex CLI "Effort / thinking level" trigger row to `docs/PLATFORMS.md`'s Codex section (currently absent, unlike Grok's), sourced from `.2`'s verified Codex effort-axis findings
- [ ] Confirm `docs/AGENT-COMPAT.md` needs no change (last-verified stamps are current/resolved at v5.11.0, no version bump since) — log reason
- [ ] Confirm `docs/AGENT-NEUTRALITY.md` needs no change (ledger examples already generic/current) — log reason
- [ ] Confirm `docs/GLOSSARY.md` needs no change (model entry already generic) — log reason
- [ ] Confirm `claude/CAPABILITIES.md` needs no change (examples generic, last-verified resolved) — log reason
- [ ] Confirm skill example token lists (`step-1.5-model-edge.md` ×2, `ft-task`/`ft-micro-task`/`ft-stats`/`ft-audit-*` `SKILL.md`) need no change (tokens already current per `.2`/`.4`) — log reason
- [ ] Phase 3: markdown mental-pass on the PLATFORMS.md edit; lint/type-check N/A (prose-only)
- [ ] Phase 4: doc-drift sweep + flip PLAN.md line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)
- [[CORE-353.1]] — Discovery; inventoried the docs-currency surface this task refreshes
- [[CORE-353.2]] — effort-axis-calibration; refreshed `SPEC/model.md`'s calibration baseline, left other stale version-pinned prose to this task
- [[CORE-353.3]] — third-glyph-contract; locked the glyph/label/prose this task must not contradict

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches `.1`'s filed scope; mechanical currency refresh of the five named docs + skill example token lists not covered by `.2`/`.4`. Discovery narrowed the actual edit surface to one file (below) — remaining docs were already current.

- [x] Read relevant source files (`docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `claude/CAPABILITIES.md`, `claude/skills/{ft-task,ft-micro-task}/step-1.5-model-edge.md`, `claude/skills/ft-stats/SKILL.md`, `claude/skills/ft-audit*/SKILL.md`, `.2`'s and `.1`'s archived Discovery Notes for the WebSearch-verified per-vendor effort-axis terminology)

- [x] **Archive skim** — `.1` (inventoried this exact docs-currency surface), `.2` (WebSearch-verified current per-vendor effort-axis naming: Claude `low`/`medium`/`high`/`max`(+`xhigh`); Grok `reasoning_effort`/`reasoning.effort` — `none`/`low`/`medium`/`high`, default varies by model; Codex `none`/`low`/`medium`/`high`/`xhigh`/`max`(+CLI `minimal`); explicitly left non-`SPEC/model.md` stale prose to this task), `.3` (locked the `[medium]🧩` glyph/label/prose this task must not contradict), `.4` (propagated the glyph through all 13 `claude/skills/**` emitters + the SOP mirror — already current, nothing left for this task there).

- [x] **Drift check** — grepped all 5 named docs + the skill example-token files for stale/version-pinned model strings (`Grok 4.3`, `grok-3`, `grok-4`, `GPT-5`, `gpt-5`). One genuine hit: `docs/PLATFORMS.md` line 282's Grok Build "Effort / thinking level" trigger row describes the mechanism as **model selection** (`grok-3` default vs `grok-4` extended-thinking) — this contradicts `.2`'s verified finding that Grok's effort level is a `reasoning_effort` API parameter *independent* of model choice. Everything else grepped clean: `AGENT-COMPAT.md`/`AGENT-NEUTRALITY.md`/`GLOSSARY.md`/`CAPABILITIES.md` already use generic, non-version-pinned examples (`opus`/`sonnet`/`grok`/`fable`/`haiku`/`gpt-5` as bare family names, not dated builds); the skill example-token lists already carry the same current generic set (no `.2`/`.4` drift). Last-verified stamps in `AGENT-COMPAT.md`/`PLATFORMS.md`/`CAPABILITIES.md` are all resolved states (`vX.Y.Z (dogfooded)` or explicit `skipped @ v5.11.0`) — current version is still v5.11.0 (no release since), so none are stale.

- [x] Asked clarifying questions — **No clarifications needed.** Explicit assumptions: (1) the historical "First-use verification" narrative lines in `PLATFORMS.md` (`Grok 4.3 interactive CLI`, `Codex/GPT-5 session`, CORE-257/CORE-258 dated observations) are point-in-time dogfood records, not roster examples — left untouched, same judgment `.2` applied to `SPEC/model.md`'s historical Grok-4.3-retag anecdote; (2) `PLATFORMS.md`'s Codex section is missing a symmetric "Effort / thinking level" trigger row that Grok's section has — since `.2` already researched and verified the exact Codex effort-axis facts (no new decision needed, purely porting already-verified content into the existing per-agent trigger-row shape for structural parity with Grok's row), I'm including it in this task's mechanical scope rather than filing a separate follow-up.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Grepped `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `claude/CAPABILITIES.md` for `opus|sonnet|grok|gpt-5|Grok|Claude|last-verified` plus a targeted grep for `Grok 4\.3|grok-3|grok-4|GPT-5|gpt-5` repo-wide (excluding archive). Also reviewed `step-1.5-model-edge.md` (both copies, near-identical modulo skill-name substitution) and the model-token bucket/example lines in `ft-task`/`ft-micro-task`/`ft-stats`/`ft-audit-*` `SKILL.md`.

**Findings:**
- Only `docs/PLATFORMS.md` line 282 needed a substantive edit (Grok effort-mechanism framing, stale relative to `.2`).
- `docs/PLATFORMS.md`'s Codex section has no equivalent effort-axis trigger row at all — a structural gap, not just staleness; filling it is in-scope per the assumption above.
- `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `claude/CAPABILITIES.md`: no stale content found. All model examples are already generic/current (`fable`/`opus`/`sonnet`/`grok`/`haiku`/`gpt-5`/`gemini-pro` as bare illustrative family names); last-verified stamps are resolved states at the current v5.11.0 — no update due until the next release.
- Skill example token lists (`step-1.5-model-edge.md` ×2, `ft-task`/`ft-micro-task`/`ft-stats`/`ft-audit-*` `SKILL.md`): all already current, already three-glyph-propagated by `.4`, no `.2`-driven drift found.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing per-agent trigger-table shape already established for Grok Build's row (`docs/PLATFORMS.md` §"Non-Claude capability triggers"), per the fixed shape documented in `claude/CAPABILITIES.md`'s pattern note ("what it is · syntax · what it controls in flowtron · when to reach for it").

- [x] Implemented the minimal solution — edited `docs/PLATFORMS.md` only: (1) rewrote the Grok Build "Effort / thinking level" row to describe the `reasoning_effort`/`reasoning.effort` parameter (independent of model choice) instead of the stale model-selection framing; (2) added a symmetric Codex CLI "Effort / thinking level" row (previously absent) using `.2`'s verified effort-axis terminology. All other reviewed docs (`AGENT-COMPAT.md`, `AGENT-NEUTRALITY.md`, `GLOSSARY.md`, `CAPABILITIES.md`, skill example token lists) confirmed as needing no change — see Discovery Notes.

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only doc edit, no executable surface).

**Implementation Notes:**

- Edit surface: `docs/PLATFORMS.md` only, 2 table rows changed/added (~4 lines).
- Left the historical "First-use verification" narrative lines (CORE-257 "Grok 4.3 interactive CLI", CORE-258 "Codex/GPT-5 session") untouched — point-in-time dogfood records, not roster examples, matching `.2`'s judgment on `SPEC/model.md`'s historical anecdote.
- Downstream-impact scan: active PLAN.md has no other entries touching PLATFORMS.md's trigger tables or the model-example surface — no downstream impact.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; no executable test surface (`docs/PLATFORMS.md` is a prose reference doc, not code)

- [x] Ran lint/type-check on changed code — N/A (no markdown linter configured in this repo); `git status --short` confirms only `docs/PLATFORMS.md` changed (plus the new tasknote); markdown mental-pass done (table row grammar intact, column count matches, cross-refs unaffected)

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

- [x] **Doc-drift sweep**:
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (no new Claude-specific surface introduced; edit made the Grok/Codex rows more agent-neutral, if anything)
  - `docs/PLATFORMS.md` — **this task's edit target**; Grok row rewritten, Codex effort row added
  - `claude/CAPABILITIES.md` — no change (reviewed in Discovery; already current)
  - `docs/AGENT-COMPAT.md` — no change (reviewed in Discovery; last-verified stamps already resolved at current v5.11.0)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-13.` and tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (below).

**Final Summary:**

Refreshed `docs/PLATFORMS.md`'s Grok Build "Effort / thinking level" trigger row, which described the mechanism as **model selection** (`grok-3` vs `grok-4`) — stale relative to `.2`'s WebSearch-verified finding that Grok's effort level is a `reasoning_effort`/`reasoning.effort` API parameter independent of model choice. Also added a symmetric Codex CLI "Effort / thinking level" row (structurally absent, unlike Grok's), sourced from `.2`'s already-verified Codex effort-axis terminology (`none`/`low`/`medium`/`high`/`xhigh`/`max` + CLI `minimal`). Edit surface: `docs/PLATFORMS.md` only, ~4 lines. Reviewed the other four named docs (`AGENT-COMPAT.md`, `AGENT-NEUTRALITY.md`, `GLOSSARY.md`, `CAPABILITIES.md`) and the skill example-token lists (`step-1.5-model-edge.md` ×2, `ft-task`/`ft-micro-task`/`ft-stats`/`ft-audit-*` `SKILL.md`) — all already current, no changes needed. Left the historical dogfood-verification narrative lines (CORE-257/258, dated Grok/Codex sessions) untouched — point-in-time records, not roster examples, consistent with `.2`'s precedent.

**Archived:** 2026-07-13
