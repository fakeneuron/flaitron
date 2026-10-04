---
title: parser-strip-html-comments
status: completed
tags: []
created: 2026-07-03
related-tasks: [CORE-335, CORE-333]
---

# CORE-336 | parser-strip-html-comments

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-335]]

## 🎯 Goal

Stop checkbox example lines inside HTML comments (the trailing grammar-reference block) from surfacing as false unparsed ⚠ diagnostics — the recurring cross-repo symptom CORE-335's template move didn't reach, because the parser has no comment handling.

## ✅ Acceptance

- [x] `parsePlanWithDiagnostics` blanks `<!-- -->` interiors before parsing; checkbox lines inside a comment yield no task and no diagnostic
- [x] Line numbers for real content after a multi-line comment stay accurate
- [x] Real task lines unaffected; existing suite green
- [x] Phase 4 doc-drift sweep

## 🧩 Subtasks

- [x] Confirm root cause (throwaway parse of a trailing-comment TASK-ID line → diagnostic)
- [x] Add `blankHtmlComments` helper + apply before the parse loop
- [x] Add tests (comment-ignored + line-number-preservation)
- [x] Run suite + typecheck + lint

## 🔗 Related

- [[CORE-335]] — template move (fixed new adopters only); this is the parser root-cause fix for all repos
- [[CORE-333]] — sibling parser change (`.N` grammar)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Active cross-repo bug report. CORE-335 relocated the template's grammar comment above `## High` but did not teach the parser about comments, so every existing adopter PLAN.md (comment at the bottom, under `## Completed`) keeps warning.

- [x] Read relevant source files — `viz/src/parser.ts` (`parsePlanWithDiagnostics`; no `<!--` handling anywhere — only `##` heading tracking).

- [x] **Archive skim** — CORE-333 (`.N` grammar) + CORE-335 (template move) are the direct predecessors; neither addressed comment stripping.

- [x] **Drift check** — confirmed via throwaway test: a `- [ ] **TASK-ID** ...` line inside a trailing `<!-- -->` block under `## Completed` parses (fails TASK_LINE) → 1 unparsed diagnostic. Matches the user's L458 report.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Fix is parser-level (root cause) rather than per-repo PLAN.md edits — one place, fixes all repos, and avoids bulk adopter edits. Assumption: comment blocks are always closed (`<!-- ... -->`); an unclosed `<!--` is left untouched (matching-to-EOF would risk blanking real content below a stray marker).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Root cause certain from reading the parser + confirming test. Blanking (not deleting) comment interiors preserves newlines → diagnostic line numbers stay accurate. Mirrors the existing `stripCodeSpans` text-transform idiom.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing `stripCodeSpans` text-transform idiom (a pre-parse normalization helper).

- [x] Implemented the minimal solution — `blankHtmlComments(markdown)` replaces `<!--[\s\S]*?-->` regions with newline-preserving whitespace; applied at the top of `parsePlanWithDiagnostics` before `.split()`.

- [x] Updated/added tests — 2 cases: comment-ignored (task + diagnostic both empty for the comment line) and line-number-preservation after a multi-line comment.

**Implementation Notes:**

`viz/src/parser.ts` — +7-line comment + 3-line helper; one-word change to the split line. No capture-group or signature change. `viz/src/parser.test.ts` — +2 tests in the `parsePlanWithDiagnostics` block.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — 227 parser/suite tests pass incl. the 2 new. One unrelated `App.test.tsx` wikilink-nav test flaked under full-suite load (28s); passes in isolation (3s); provably unaffected (no HTML comments in any UI fixture → helper is a no-op there).

- [x] Ran lint/type-check on changed code — `tsc --noEmit` clean, `eslint src` clean.

- [x] (frontend) Behavior is unit-asserted (diagnostics array); the ⚠ banner is a pure function of it.

**Testing Notes:**

Flaky UI test is pre-existing (timing/scroll-sensitive jsdom test), not caused by this change — noted as an observation, not filed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 cold-start AI-referenced docs = **no change** (none document the parser's comment handling). `viz/src/parser.ts` inline comment documents the CORE-336 rationale in place.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-03.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (held at the 📦 gate)

**Final Summary:**

Taught `parsePlanWithDiagnostics` to blank HTML-comment interiors before parsing, so checkbox example lines inside the trailing grammar-reference block stop surfacing as false ⚠ diagnostics. Root-cause fix behind CORE-335 (which only relocated the template comment for new adopters) — this fixes every existing adopter repo at the parser level, picked up on their next `/ft-update`. +2 tests; newline-preserving so diagnostic line numbers stay accurate.

**Archived:** 2026-07-03
