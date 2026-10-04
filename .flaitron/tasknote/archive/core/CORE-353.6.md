---
title: viz-parser-glyph-tolerance
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353, CORE-353.3]
---

# CORE-353.6 | viz-parser-glyph-tolerance

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]] [[CORE-353.3]]

## 🎯 Goal

Extend `viz/src/parser.ts`'s suggestion-glyph tolerance from `🧠|🔧` to `🧠|🔧|🧩` so `[medium]🧩`-decorated PLAN rows parse instead of dropping as diagnostics, and refresh the SPEC.md parser-tolerance note + parser header comment to match.

## ✅ Acceptance

- [ ] `viz/src/parser.ts` accepts `🧩` alongside `🧠`/`🔧` in the model-suggestion glyph tolerance (regex + any header comment)
- [ ] Regression test covers a `[medium]🧩`-decorated PLAN row parsing without a diagnostic
- [ ] SPEC.md §"Parser tolerances (decorative, not captured)" reflects the three-glyph set

## 🧩 Subtasks

- [x] Extend `viz/src/parser.ts`'s `TASK_LINE` regex glyph-tolerance group from `(?:🧠|🔧)` to `(?:🧠|🔧|🧩)`
- [x] Update the parser's header comment (tolerance #3 example) to name all three glyphs
- [x] Add a regression test in `parser.test.ts` covering a `[medium]🧩`-decorated row (parses, no diagnostic)
- [x] Update SPEC.md §"Parser tolerances (decorative, not captured)" to the three-glyph set
- [x] Run targeted viz tests + lint/typecheck on changed files

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)
- [[CORE-353.3]] — third-glyph-contract; surfaced this gap

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap surfaced and precisely diagnosed by CORE-353.3's downstream-impact scan (filed as this task). Task line matches that citation exactly — no drift, no re-scope needed.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-353.3's Implementation Notes already ran the archive skim for this exact gap and filed this task: `viz/src/parser.ts:58` hard-codes the suggestion-glyph tolerance as `(?:\s*(?:🧠|🔧)️?)?`, only stripping 🧠/🔧 after a `[model]` token. A `[medium]🧩` row (the new decoration `.4`'s emitters now write into PLAN.md) fails the full `TASK_LINE` regex and drops to an unparsed diagnostic. No filed child besides this one covers the viz parser; `.4` was skills-only, `.5` was docs. Also affects SPEC.md's parser-tolerance note (lines 194-196, names only 🧠/🔧) and the parser's own header comment (lines 53-54) — both correctly describe pre-fix behavior and move together with the code fix.

- [x] **Drift check** — verified against current HEAD: `viz/src/parser.ts:58` regex glyph group `(?:\s*(?:🧠|🔧)️?)?` matches CORE-353.3's citation exactly; header comment tolerance #3 (lines 53-54) still names only `[medium]🧠` / `[medium] 🔧`; SPEC.md §"Parser tolerances" (lines 194-196) still names only 🧠 (heavy) / 🔧 (light). No drift — proceeding as filed.

- [x] Asked clarifying questions — No clarifications needed. Scope, target lines, and fix shape are all fully specified by CORE-353.3's citation; this is a mechanical three-glyph extension with a regression test.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** See Archive skim + Drift check above — CORE-353.3 (third-glyph-contract) already root-caused this exact gap while filing the task, so Discovery here is confirmation rather than fresh investigation.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the exact FE-066 tolerance pattern already in the file: the regex alternation group, the header comment listing examples, and the paired `parser.test.ts` regression test. No new shape needed — this is additive to an existing tolerance, not a new one.

- [x] Implemented the minimal solution — three edits: `TASK_LINE` regex glyph alternation (`🧠|🔧` → `🧠|🔧|🧩`), header comment tolerance #3 example, SPEC.md §"Parser tolerances" prose. Byte-level Python replace used for the regex/comment edits after the Edit tool's string-matching choked on the literal `️?` + multi-byte emoji sequence in `old_string`; verified the resulting line via `grep`.

- [x] Updated/added tests for non-trivial behavior — new `parser.test.ts` case `'parses a [medium] suggestion glyph (🧩)'`, mirroring the existing 🧠/🔧 cases.

**Implementation Notes:** No production-code shape change — this is a pure tolerance-set widening (2→3 glyphs) matching CORE-353.3's contract exactly. The pre-existing `'does not flag glyph-decorated rows as unparsed diagnostics'` test already covers 🧠/🔧; left it as-is since 🧩 gets its own dedicated case for clearer failure attribution.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- src/parser.test.ts`: 57/57 passed, including the new `[medium]🧩` case

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` and `npm --prefix viz run lint`: both clean

- [x] (frontend) Asked the user for visual confirmation — N/A; no runtime UI surface touched (parser regex + test + doc prose only)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 12 AI-referenced docs walked. This task's edit surface is narrow (viz parser regex + test + SPEC.md's own tolerance note); grepped all 12 for `parser.ts`, 🧠, 🔧, 🧩, "suggestion glyph". **No change:** README.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, codex/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/PLATFORMS.md, docs/AGENT-COMPAT.md — no glyph or parser references. **`docs/AGENT-NEUTRALITY.md:37` + `claude/CAPABILITIES.md:31`** — both carry illustrative `[heavy]🧠` / `[light]🔧` two-glyph examples; still technically correct (they don't claim to be the exhaustive set) but incomplete post-🧩. CORE-353.3 already flagged these exact two hits and deferred them to `.5`; `.5`'s sweep reviewed both and logged "no change" (its scope was stale/version-pinned model *strings*, not glyph-set completeness — a narrower read of the same lines). Out of scope for `.6` (viz-parser-only task) — leaving as a known, already-surfaced gap rather than re-scoping here. SPEC.md is the changed contract itself (edited directly in Phase 2), not drift-in-another-doc.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-13.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (below; surfaces at the 📦 ready-to-commit gate)

**Final Summary:** Extended `viz/src/parser.ts`'s `TASK_LINE` suggestion-glyph tolerance from two glyphs (`🧠`/`🔧`) to three (`🧠`/`🔧`/`🧩`), closing the gap CORE-353.3 surfaced when it added the 🧩 `MEDIUM` glyph to the next-move-suggestion contract: `[medium]🧩`-decorated PLAN.md rows were failing the full `TASK_LINE` regex and dropping to unparsed diagnostics instead of parsing. Three edits: the regex alternation group (line 59), the header comment's tolerance-#3 example (lines 53-55), and SPEC.md §"Parser tolerances (decorative, not captured)" (lines 194-196) — all three previously enumerated only 🧠/🔧. Added a dedicated regression test (`parser.test.ts`, `'parses a [medium] suggestion glyph (🧩)'`) alongside the existing 🧠/🔧 cases; left the existing "does not flag glyph-decorated rows as unparsed diagnostics" test untouched since 🧩 now has its own case for clearer failure attribution. `npm --prefix viz test -- src/parser.test.ts` (57/57 passed), `typecheck`, and `lint` all clean. No production behavior change beyond the tolerance widening — mechanical, matches CORE-353.3's contract exactly.

**Archived:** 2026-07-13
