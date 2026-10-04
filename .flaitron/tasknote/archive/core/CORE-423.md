---
title: parser fence-awareness
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-421.2, CORE-421.3, CORE-421.N]
---

# CORE-423 | parser fence-awareness

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-421.2]] [[CORE-421.3]] [[CORE-421.N]]

## 🎯 Goal

Port `tasknote.ts`'s `fenceMask` to `parser.ts` so `parsePlanWithDiagnostics` skips fenced PLAN.md lines.

## ✅ Acceptance

- [ ] `parser.ts` gains a module-level `FENCE_DELIMITER` regex + private `fenceMask(lines): boolean[]` helper mirroring `tasknote.ts`'s CommonMark-aware implementation (unexported, per `.2`'s no-export precedent)
- [ ] `parsePlanWithDiagnostics` consults the mask so a fenced line never flips the current section (heading) and never parses as a task or surfaces as an unparsed diagnostic
- [ ] Regression tests added to `parser.test.ts` covering: a task row quoted inside a fence is not parsed as real, a heading inside a fence does not change section, and existing behavior outside fences is unchanged
- [ ] `npm --prefix viz test` and lint/typecheck pass

## 🧩 Subtasks

- [ ] Port `FENCE_DELIMITER` + `fenceMask(lines): boolean[]` from `tasknote.ts` into `parser.ts` as module-level, unexported additions
- [ ] Compute the fence mask once per `parsePlanWithDiagnostics` call and guard the heading-match and task-line branches on it (mirroring how `blankHtmlComments` already inerts comment lines ahead of the same loop)
- [ ] Add regression tests to `parser.test.ts` (fenced task row not parsed as real; fenced heading doesn't switch section; unfenced behavior unchanged)
- [ ] Run `npm --prefix viz test` and lint/typecheck on changed files

## 🔗 Related

- [[CORE-421.2]] — fence-aware scanners; flagged this gap in parser.ts
- [[CORE-421.3]] — duplicate-epic guard; also flagged this gap
- [[CORE-421.N]] — viz-robustness audit; confirmed the gap as dormant fleet-wide

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap confirmed still open (`grep -n "fence" viz/src/parser.ts` → zero hits) and still fleet-wide dormant (zero fenced blocks in `.flowtron/PLAN.md`, `templates/PLAN.md`, or any adopter `.flowtron/PLAN.md` under `~/code`). Matches the established `.2`/`fenceMask` pattern exactly — real, well-scoped, no re-scope needed.

- [x] Read relevant source files — `viz/src/tasknote.ts` (full: `FENCE_DELIMITER`/`fenceMask` L106-141, all four consuming scanners), `viz/src/parser.ts` (full: `parsePlanWithDiagnostics` L259-322, `TASK_LINE`/`HEADING_LINE` L1-95, `blankHtmlComments` L248-257), `viz/src/tasknote.test.ts` (fence regression tests L179-247, style reference), `viz/src/parser.test.ts` (`parsePlanWithDiagnostics` describe block L379-534). Read set was known and bounded from the PLAN.md line's citations — no probe needed.

- [x] **Best Practices Review** — CORE-421.2 deliberately did **not** export `fenceMask`/`FENCE_DELIMITER` from `tasknote.ts` ("consumed only inside this module" — public-surface-growth cost). The established shape per that note's Pattern Survey is *pure predicate + module-level regex constant, private to the consuming module* — not a shared cross-module import. Porting means duplicating that same shape into `parser.ts` (module-level `FENCE_DELIMITER` + private `fenceMask`), not importing from `tasknote.ts`. `parser.ts` has no existing import from/to `tasknote.ts` today (checked both directions), so this preserves that boundary. In-scope refactor: apply the mask inside `parsePlanWithDiagnostics`'s single scan loop (no new function needed — one additional guard per iteration, mirroring how `blankHtmlComments` already inerts HTML-comment lines before the same loop runs).

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-421.2.md` (fence-aware scanners, `tasknote.ts`), `CORE-421.3.md` (duplicate-epic guard, `parser.ts`), `CORE-421.N.md` (cohort audit). `.2`'s Implementation Notes: "Deliberately not done. No export of either helper... `viz/src/parser.ts` has the same bug class against `PLAN.md` and is untouched... `CORE-421.3` already owns its neighbouring defect." `.3`'s Drift check then reconciled that forward-reference as a mix-up (`.3`'s actual scope was the duplicate-epic Map bug, a different function) and re-flagged the real gap for `.N` or a follow-up. `.N`'s Finding E confirmed it open and fleet-wide dormant, and is the direct filing source for this task's PLAN.md line.

- [x] **Drift check** — Code: `parsePlanWithDiagnostics` (`parser.ts:259-322`) still has no fence handling — confirmed matches `.N`'s Finding E exactly, no path/line drift since that audit (both stamped 2026-08-09, same-day). `fenceMask`/`FENCE_DELIMITER` in `tasknote.ts` (L106-141) unchanged from `.2`'s deliverable. SPEC cross-reference: no SPEC contract governs `parser.ts` internals (parser tolerances documented in SPEC §"Task-line format" are about the `TASK_LINE` grammar, not fence-awareness) — nothing to reconcile against. Plan-vs-prior-note: this task's PLAN.md line matches `.N`'s Finding E's framing verbatim ("Port `tasknote.ts`'s `fenceMask` to `parser.ts`"); no divergence.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Explicit assumption: port means duplicate-per-module (matching `.2`'s no-export precedent), not a shared import; fenced lines are inert for both heading/section tracking and task-line matching (matches `extractSection`'s treatment of fenced `##` headings in `tasknote.ts`).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Two prior children (`.2`, `.3`) both flagged this exact gap and deferred it; the `.N` audit confirmed it open and fleet-wide dormant (zero fenced blocks in any adopter PLAN.md) and filed it as this follow-up. `.2` established the shape to mirror: an unexported module-level `FENCE_DELIMITER` regex + private `fenceMask(lines): boolean[]` helper implementing CommonMark fence rules (≤3-space indent, closing run same-char and ≥ opening length, backtick info string can't contain a backtick, unclosed fence runs to EOF), consulted by every line-scanner in the module. `parser.ts` has exactly one line-scanner (`parsePlanWithDiagnostics`'s main loop), so this is a single-consumer port, not a multi-scanner fan-out like `.2`'s four.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `.2`'s established shape exactly: a module-level `FENCE_DELIMITER` regex constant + a private `fenceMask(lines): boolean[]` predicate, unexported (mirrors `.2`'s explicit no-export decision — public-surface growth is a cost). No new shape introduced, no dependency crossed between `parser.ts` and `tasknote.ts` (still zero imports either direction).

- [x] **Minimal refactor gate** — no refactor of existing logic; the mask is consulted with a single added `if (inFence[i]) continue;` guard at the top of the existing scan loop, mirroring how `blankHtmlComments` already inerts HTML-comment lines ahead of the same loop. No other line touched.

- [x] Implemented the minimal solution — `FENCE_DELIMITER` + `fenceMask` ported into `parser.ts` (module-level, unexported); `parsePlanWithDiagnostics` computes the mask once per call and skips fenced lines entirely (heading match, task match, and unparsed-diagnostic collection all inert inside a fence).

- [x] Updated/added tests for non-trivial behavior — 4 regression tests added to `parser.test.ts`: fenced task row not parsed as real; fenced heading doesn't switch section; malformed line inside a fence produces no diagnostic; parsing resumes correctly after a fence closes.

**Implementation Notes:**

`viz/src/parser.ts` (+29/-0): `FENCE_DELIMITER` + `fenceMask` added directly above `parsePlanWithDiagnostics` (was between `HEADING_LINE` and `blankHtmlComments`'s call site) so the helper sits next to its sole consumer. The loop change is one line (`if (inFence[i]) continue;`) placed after the existing `blankHtmlComments` pass, before the `HEADING_LINE` check — a fenced line is fully inert, so a single early-continue covers both the section-tracking branch and the task/diagnostic branch below it (no per-branch guard needed, unlike `tasknote.ts`'s four independent scanners which each consult the mask separately).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- parser.test.ts run` → 65/65 passed

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` clean, `npm --prefix viz run lint` clean

- [x] **Quality assertions** — no avoidable duplication (the two per-module `fenceMask` copies are the established, deliberate pattern — `.2` chose module-private over shared-export); no dead code; no unexplained complexity (single early-continue guard); no public-surface growth (`fenceMask`/`FENCE_DELIMITER` unexported, matching `.2`); no stale code-facing documentation (no doc references `parser.ts`'s prior fence-unawareness to update — confirmed by the Phase 4 doc-drift sweep below)

- [x] N/A — no frontend/UI surface changed; this is a pure parsing-logic change with no render path

Full suite also run for cross-cutting confidence: `npm --prefix viz test` → 283/283 passed.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries checked (`grep -in "fence" <doc>`):
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — one unrelated hit (a markdown-fence comment about the paste block itself, not parser behavior) — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change; §"Markdown flavor" already declares "fenced code blocks with language tags" as a GFM feature in use — confirming, not drifting (same disposition as `.2`)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — all four Acceptance criteria satisfied and ticked below; `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to top of `## Completed` in the same commit as this archive move.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Ported `tasknote.ts`'s `fenceMask` fence-detection helper into `parser.ts` so `parsePlanWithDiagnostics` no longer treats content quoted inside a fenced code block (a grammar-reference example, a quoted PLAN.md row) as a real task line or section heading — closing the gap `CORE-421.2` and `.3` both flagged and `CORE-421.N` filed as this follow-up.

- **Changed files:** `viz/src/parser.ts` (+29/-0) — module-level `FENCE_DELIMITER` regex + private `fenceMask(lines): boolean[]` added beside `HEADING_LINE`, ported verbatim from `tasknote.ts`'s CommonMark-aware implementation; `parsePlanWithDiagnostics` computes the mask once per call and adds a single `if (inFence[i]) continue;` guard, making a fenced line fully inert (no section switch, no task parse, no unparsed diagnostic). `viz/src/parser.test.ts` (+52/-0) — 4 new regression tests.
- **Verification:** `npm --prefix viz test -- parser.test.ts run` → 65/65; full suite `npm --prefix viz test` → 283/283; `npm --prefix viz run typecheck` clean; `npm --prefix viz run lint` clean.
- **Refactors:** none — single additive guard, no existing logic touched.
- **Documentation verdict:** no drift; `docs/CONVENTIONS.md`'s GFM/fenced-code-blocks declaration already covers this (confirming, not requiring an update — full sweep above).
- **Maintainability effect:** closes the asymmetry `CORE-421.N`'s audit named as its headline follow-up — "which lines are document structure" is now answered by a dedicated mask in both files that scan markdown line-by-line (`tasknote.ts` and `parser.ts`), rather than answered once and left unasked in the other. The two `fenceMask` copies are intentionally separate per `.2`'s no-export decision (each module's line-scanning is self-contained; no cross-module coupling introduced).

Acceptance:
- [x] `parser.ts` gains a module-level `FENCE_DELIMITER` regex + private `fenceMask(lines): boolean[]` helper mirroring `tasknote.ts`'s CommonMark-aware implementation (unexported, per `.2`'s no-export precedent)
- [x] `parsePlanWithDiagnostics` consults the mask so a fenced line never flips the current section (heading) and never parses as a task or surfaces as an unparsed diagnostic
- [x] Regression tests added to `parser.test.ts` covering: a task row quoted inside a fence is not parsed as real, a heading inside a fence does not change section, and existing behavior outside fences is unchanged
- [x] `npm --prefix viz test` and lint/typecheck pass

**Archived:** 2026-08-09
