---
title: model-tier-recalibration audit
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-482.1, CORE-482.2, CORE-482.3, CORE-482.4, CORE-482.5]
---

# CORE-482.N | model-tier-recalibration audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]]

## 🎯 Goal

Verify the completed `CORE-EPIC-482` (`model-tier-recalibration`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces (viz suite 481/481; CI drift greps clean; SPEC/model.md ladder/match-table/glyph-mirror internally consistent)
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing — one miss found (👇/HERE prose three-way lists), small and clearly in scope, fixed inline instead; no follow-up filings needed
- [x] Single `feat: CORE-482.N — audit CORE-EPIC-482` commit lands
- [x] PLAN.md line for `CORE-482.N` flipped to stub form `Completed 2026-08-27.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-482.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-482` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate (none needed — single miss fixed inline)
- [x] Phase 4: flip `CORE-482.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)
- [[CORE-482.1]] — discovery; filed the cohort + resolved scoping table
- [[CORE-482.2]] — model-effort-inventory (calibration table)
- [[CORE-482.3]] — xheavy-rung-round-up (fourth rung + round-up default)
- [[CORE-482.4]] — emitter-glyph-propagation (13-file render/filing-site widening)
- [[CORE-482.5]] — viz-xheavy-glyph-tolerance (parser 🔭 + regression test)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-close-epic CORE-482.N`; Step 2 pre-flight passed with all five siblings `[x]` (`.1`–`.5`, all closed 2026-08-27) — full-cohort audit, no early-audit partiality.

- [x] Read relevant source files — all five archived cohort tasknotes read in full (Final Summary + Implementation Notes each); deliverables captured in Discovery Notes

- [x] **Best Practices Review** — N/A (verification pass over existing markdown/code deliverables; the one inline fix extends the `.4` four-way-widening pattern verbatim)

- [x] **Archive skim** — self-referential: the cohort children are the archive entries in scope. Beyond the cohort: [[CORE-353.N]] (prior glyph-widening epic's audit shape), [[CORE-353.6]] (parser-tolerance precedent `.5` repeated) — consulted via the children's own Related links; no non-cohort conflicts.

- [x] **Drift check** — cohort-cited paths verified at HEAD: `viz/src/parser.ts:100` alternation is four-way `(?:🧠|🔧|🧩|🔭)`; SPEC/model.md ladder line 65 reads `light < medium < heavy < xheavy`; ft-stats SKILL.md enumerates the `xheavy` bucket (parse rule, field enum, Section A). No cohort deliverable moved since archiving (all closed today).

- [x] Asked clarifying questions — No clarifications needed. Full cohort closed; audit scope is the canonical fixed shape.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Cohort deliverables inventory:

- **`.1` discovery** — filed the epic + `.2`/`.3` children; operator-resolved scoping table (`[xheavy]`🔭 manual-only, effort orthogonal + calibration table, round-up default). Its acceptance tasked `.N` with verifying the viz parser + `/ft-stats` accept `xheavy` — done this audit (see Implementation Notes).
- **`.2` model-effort-inventory** — platform×model×effort calibration table in SPEC/model.md (9 family rows, as-of 2026-08-27, refreshed at releases); reconciled both "no frozen table" sentences; roster refresh in step-1.5-model-edge.md + SPEC.md token examples; `supersedes: CORE-353.2`.
- **`.3` xheavy-rung-round-up** — fourth `xheavy` rung (`light < medium < heavy < xheavy`, manual-only, always-⚠️-advisory at the gate); round-up default in §"Practical guidance"; 🔭 `XHEAVY` cue across SPEC.md/gates.md/model.md; ft-stats bucket; filed `.4`/`.5` via downstream-impact scan.
- **`.4` emitter-glyph-propagation** — 13 files: render sites widened to `🔧/🧩/🧠/🔭`; four automated filing-recommendation skills got explicit "never `[xheavy]`" exclusion clauses; documented no-ops (codex/cursor/grok pure pointers, ft-goal-task shared fragment, gates.md already four-way).
- **`.5` viz-xheavy-glyph-tolerance** — `parser.ts:100` alternation + header comment + SPEC.md tolerance prose widened to four glyphs; dedicated `[xheavy]🔭` regression test (CORE-353.6 shape).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the inline fix reuses `.4`'s exact four-way-widening edit shape on the two files it touches; no new shape

- [x] **Minimal refactor gate** — N/A (verification pass; the inline fix is a 3-spot list widening, no refactor)

- [x] Implemented the minimal solution — coherence pass walked; one miss fixed inline (see Implementation Notes)

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only inline fix; the cohort's own regression test already covers the parser surface)

**Implementation Notes:**

**Cohort coherence findings:**

- **One miss, fixed inline:** the 👇/HERE (`Run in this session:`) prose still listed the model signal as three-way `🔧/🧩/🧠` in three spots — `SPEC.md` §"Post-closure protocol" context-dependent-skills flag (line ~958) and `SPEC/gates.md` §"Next-task cues" 👇 paragraph (lines 263 + 265). `.3` widened the neighboring cue tables and `.4` widened the emitters, but neither touched the 👇 paragraphs (they describe the *replaced* glyph, so both children's greps skipped them). Widened all three to `🔧/🧩/🧠/🔭` — same edit shape as `.4`. Post-fix repo-wide grep for three-way lists lacking 🔭: zero hits across SPEC.md, SPEC/, claude/, codex/, cursor/, grok/, docs/, templates/, README/AGENTS/CONTRIBUTING/SECURITY.
- **`.1`-mandated verification (parser + stats accept `xheavy`):** `viz/src/parser.ts:100` four-way alternation confirmed at HEAD with the dedicated `[xheavy]🔭` regression case; full viz suite run this audit — **481/481 passed** (25 files). `/ft-stats` SKILL.md carries the `xheavy` bucket end-to-end (parse-rule sentence, field enum line 81, Section A row, render note).
- **No contradictory cross-refs:** `.2`'s three-band calibration table and `.3`'s "no roster model bands at `xheavy` by default" rule read consistently (the always-⚠️-advisory match-table row at model.md line 122 states the same fact); the manual-only contract lives once in SPEC/model.md with the filing-skill exclusion clauses pointing at it, per `.4`'s no-duplication design.
- **Naming/style parity:** all five children used the same stub-flip form, nested placement, `supersedes:`/`blocked-by:` YAML conventions, and mirror-SPEC-wording edit style; `.4`'s two-edit-shape split (render vs. filing-recommendation) is consistently applied.
- **No regressions:** CI drift greps re-run locally this audit (wrapper self-name, claude↔codex shipped-skill parity, Pair C back-link depth, Pair E roster rows) — all clean. README task counter (765 as-of 2026-08-26; archive now 771) is release-owned per its own maintenance note — recomputed by `/ft-release` §7.1 — so not an audit miss.

**Follow-up candidates:** none — the single surfaced miss was fixed inline.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code changed by the audit; regression check on cohort surfaces: `npm --prefix viz test` 481/481 passed

- [x] Ran lint/type-check on changed code — N/A for the two markdown prose edits; verification grep (residual three-way lists) returns zero hits post-fix; CI drift greps clean

- [x] **Quality assertions** — inline fix introduces no duplication (widens existing lists in place), no dead prose, no public-surface growth beyond the glyph the epic already authorized

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change; parser behavior covered by the `.5` test)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:** Verification, not new-code testing: viz suite 481/481 (includes the `.5` `[xheavy]🔭` regression case); local CI drift greps clean; post-fix residual-glyph grep clean repo-wide.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change (task counter 765 as-of 2026-08-26 is release-owned, recomputed at next `/ft-release` §7.1 — noted, not edited) · AGENTS.md: no change · SPEC.md: **updated** (audit inline fix — 👇 context-dependent-skills flag's model-signal list widened to `🔧/🧩/🧠/🔭`) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change (its `[medium]`-often / `[light]`-mechanical guidance reads round-up-consistent, per `.3`'s sweep) · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change (cohort provenance entries landed in `.2`/`.3`; the audit adds no Claude-specific surface) · docs/PLATFORMS.md: no change (four-way since `.4`) · claude/CAPABILITIES.md: no change (four-way since `.4`; last-verified stamp is version-bump territory) · docs/AGENT-COMPAT.md: no change (glyph prose is mechanism-generic, no vocabulary restatement) · docs/EXTERNAL-AGENTS.md: no change (no tier vocabulary) · docs/WORKTREES.md: no change. Sibling file also updated by the inline fix: SPEC/gates.md (lazy module, not on the cold-start list).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.N` line flipped to stub form and kept nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces at the 📦 ready-to-commit gate (parent-flip eligible)

**Final Summary:**

Audited the completed `CORE-EPIC-482` (`model-tier-recalibration`) cohort — `.1` discovery/scoping, `.2` calibration table, `.3` `[xheavy]`🔭 rung + round-up default, `.4` emitter propagation (13 files), `.5` viz parser tolerance + test. **One miss surfaced and fixed inline:** the 👇/HERE prose in SPEC.md (~958) and SPEC/gates.md (263, 265) still listed the model signal three-way `🔧/🧩/🧠`; widened all three spots to `🔧/🧩/🧠/🔭` (the paragraphs describe the glyph 👇 *replaces*, so `.3`/`.4`'s own sweeps skipped them). Post-fix repo-wide grep confirms zero residual three-way lists. `.1`'s mandated verification passed: parser accepts `[xheavy]🔭` (four-way alternation at `parser.ts:100`, dedicated regression case, full viz suite 481/481) and `/ft-stats` buckets `xheavy` end-to-end. Coherence otherwise clean: no contradictory cross-refs (manual-only contract single-sourced in SPEC/model.md; calibration table and always-advisory rule consistent), style parity across all five children, CI drift greps clean. README task counter noted as release-owned drift (765 → archive at 771), not an audit miss. No follow-up filings needed. **Parent-flip: confirmed Yes** — CORE-EPIC-482 flipped to stub form and the full cohort moved atomically to the top of `## Completed` in the audit commit.

**Archived:** 2026-08-27
