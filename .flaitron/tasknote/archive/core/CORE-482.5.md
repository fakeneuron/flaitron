---
title: viz-xheavy-glyph-tolerance
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-482.3, CORE-353.6]
blocked-by:
  - CORE-482.3
---

# CORE-482.5 | viz-xheavy-glyph-tolerance

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]] [[CORE-353.6]]

## 🎯 Goal

Widen `viz/src/parser.ts`'s `SUGGESTION_GLYPH` tolerance from `🧠|🔧|🧩` to also accept `🔭` after the model token, plus a regression test and the matching SPEC.md tolerance-note update — the exact CORE-353.6 shape, one glyph later.

## ✅ Acceptance

- [x] `viz/src/parser.ts` accepts `🔭` alongside `🧠`/`🔧`/`🧩` in the model-suggestion glyph tolerance (regex + header comment)
- [x] Regression test covers an `[xheavy]🔭`-decorated PLAN row parsing without a diagnostic
- [x] SPEC.md §"Parser tolerances (decorative, not captured)" reflects the four-glyph set

## 🧩 Subtasks

- [x] Extend `viz/src/parser.ts`'s `SUGGESTION_GLYPH` regex alternation from `(?:🧠|🔧|🧩)` to `(?:🧠|🔧|🧩|🔭)`
- [x] Update the parser's header comment (tolerance #3 example) to name all four glyphs
- [x] Add a regression test in `parser.test.ts` covering an `[xheavy]🔭`-decorated row (parses, no diagnostic)
- [x] Update SPEC.md §"Parser tolerances (decorative, not captured)" to the four-glyph set
- [x] Run targeted viz tests + lint/typecheck on changed files

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)
- [[CORE-482.3]] — blocked-by: added the `[xheavy]`🔭 rung this task's tolerance closes the parser gap for (completed 2026-08-27)
- [[CORE-353.6]] — direct precedent: the identical two-glyph-then-three-glyph widening this task repeats for the fourth glyph

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed by CORE-482.3's downstream-impact scan alongside [[CORE-482.4]] (just completed). Task line names the exact gap (`viz/src/parser.ts` `SUGGESTION_GLYPH` still `(?:🧠|🔧|🧩)`) and the exact precedent (CORE-353.6). Nothing has moved since filing.

- [x] Read relevant source files — `viz/src/parser.ts` (lines 60-115, `SUGGESTION_GLYPH` + header comment), `viz/src/parser.test.ts` (existing glyph-tolerance test block, lines 237-300), `SPEC.md` §"Parser tolerances (decorative, not captured)" (already read in full this session)

- [x] **Best Practices Review** — pure additive regex-alternation widening on an existing tolerance, following the exact pattern CORE-353.6 already established (🧠|🔧 → 🧠|🔧|🧩). No new shape, no refactor.

- [x] **Archive skim** — [[CORE-353.6]] (identical shape: extended the same `SUGGESTION_GLYPH` alternation for the 🧩 medium glyph, same three edits — regex, header comment, SPEC.md tolerance note — plus one dedicated regression test; also flagged that `docs/AGENT-NEUTRALITY.md`/`claude/CAPABILITIES.md` illustrative two-glyph examples were "known, already-surfaced" gaps left out of scope, since those are covered by [[CORE-482.4]]'s render-site propagation, not this parser task); [[CORE-482.3]] (added the `[xheavy]`🔭 rung + confirmed via drift check that `parser.ts:100`'s alternation was still three-way, motivating this filing); [[CORE-482.4]] (just closed; separately propagated the render-side glyph, confirming this parser task and `.4` are non-overlapping — parser accept-and-drop tolerance vs. next-move-emitter rendering).

- [x] **Drift check** — verified against current HEAD: `viz/src/parser.ts:100` `SUGGESTION_GLYPH = String.raw\`(?:\s*(?:🧠|🔧|🧩)️?)?\`` — three-way, matches the citation exactly; header comment tolerance #3 (lines 79-81) names `[medium]🧠` / `[medium] 🔧` / `[medium]🧩` — three examples, no 🔭; SPEC.md §"Parser tolerances (decorative, not captured)" — three-glyph prose (🧠 heavy / 🔧 light / 🧩 medium), no 🔭. No drift — proceeding as filed.

- [x] Asked clarifying questions — No clarifications needed. Scope, target lines, and fix shape are fully specified by the PLAN.md line + the CORE-353.6 precedent; mechanical fourth-glyph extension with a regression test.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** CORE-353.6 already did the identical widening once (two → three glyphs); this task repeats the exact same three-edit shape (regex, header comment, SPEC.md prose) plus a dedicated test for the fourth glyph. No fresh investigation needed beyond confirming no drift, which the drift check above did.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reused the exact CORE-353.6 shape (regex alternation, header comment, SPEC.md prose, dedicated regression test); no new pattern

- [x] **Minimal refactor gate** — no refactor; pure additive widening of an existing tolerance

- [x] Implemented the minimal solution — see Implementation Notes

- [x] Updated/added tests for non-trivial behavior — new `parser.test.ts` case `'parses an [xheavy] suggestion glyph (🔭)'`, mirroring the existing 🧩 case

**Implementation Notes:** No production-code shape change — pure tolerance-set widening (3→4 glyphs) matching the PLAN.md citation exactly. `viz/src/parser.ts:100` `SUGGESTION_GLYPH` alternation widened to `(?:🧠|🔧|🧩|🔭)`; the Edit tool's string-matching choked on the literal `️?` + multi-byte emoji sequence in `old_string` (same failure CORE-353.6 hit) — used a byte-level Python replace instead, verified via `grep`. Header comment tolerance #3 example (lines 79-81) widened to name all four glyphs. SPEC.md §"Parser tolerances (decorative, not captured)" prose widened to the four-glyph set. Left the pre-existing "does not flag glyph-decorated rows as unparsed diagnostics" test untouched — 🔭 gets its own dedicated case for clearer failure attribution, same rationale CORE-353.6 used for 🧩.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- src/parser.test.ts`: 90/90 passed, including the new `[xheavy]🔭` case

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` and `npm --prefix viz run lint`: both clean

- [x] **Quality assertions** — no duplication (widens the existing tolerance, doesn't fork it); no dead code; no unnecessary public-surface growth (parser's exported behavior gains exactly the one glyph the epic already authorized); SPEC.md prose kept in sync with the code change

- [x] (frontend) Asked the user for visual confirmation — N/A; no runtime UI surface touched (parser regex + test + doc prose only)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: **updated** (parser-tolerance prose — this task's deliverable) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change (illustrative two-glyph examples there are a known, already-surfaced gap per CORE-353.6's Phase 4 note — out of scope for this viz-parser-only task, and separately covered by [[CORE-482.4]]'s render-site propagation) · docs/PLATFORMS.md: no change (updated by [[CORE-482.4]] already) · claude/CAPABILITIES.md: no change (updated by [[CORE-482.4]] already) · docs/AGENT-COMPAT.md: no change · docs/EXTERNAL-AGENTS.md: no change · docs/WORKTREES.md: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.5` line flipped to stub form and kept 2-space nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Final Summary:**

Extended `viz/src/parser.ts`'s `SUGGESTION_GLYPH` tolerance from three glyphs (`🧠`/`🔧`/`🧩`) to four (`🧠`/`🔧`/`🧩`/`🔭`), closing the gap [[CORE-482.3]] surfaced when it added the `[xheavy]` rung to the tier vocabulary: an `[xheavy]🔭`-decorated PLAN.md row would have failed the full `TASK_LINE` regex and dropped to an unparsed diagnostic instead of parsing. Repeats the exact [[CORE-353.6]] shape one glyph later — three edits: the regex alternation group (`viz/src/parser.ts:100`), the header comment's tolerance-#3 example (lines 79-81), and SPEC.md §"Parser tolerances (decorative, not captured)". Added a dedicated regression test (`parser.test.ts`, `'parses an [xheavy] suggestion glyph (🔭)'`) alongside the existing 🧠/🔧/🧩 cases. `npm --prefix viz test -- src/parser.test.ts` (90/90 passed), `typecheck`, and `lint` all clean. No production behavior change beyond the tolerance widening — mechanical, matches the PLAN.md citation and the CORE-353.6 precedent exactly. This closes the second of [[CORE-482.3]]'s two deferred children; only the epic-closing [[CORE-482.N]] audit remains.

**Archived:** 2026-08-27
