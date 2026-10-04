---
title: dotN-grammar-suffix
status: completed
tags: []
created: 2026-07-03
due:
related-tasks: []
---

# CORE-333 | dotN-grammar-suffix

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 flowtron self

## 🎯 Goal

Make `.N` a grammar-legal reserved terminal subtask suffix so an epic's audit child (`<AREA>-<N>.N`) never needs renaming to a real sequential number at epic-close time.

## ✅ Acceptance

- [ ] All 5 parser.ts subtask-decimal regex slots accept `\.(?:\d+|N)`: `TASK_LINE`, `WIKILINK_PATTERN`, `BLOCKED_BY_BLOCK` (both inner occurrences), `SUBTASK_ID`, `ID_SHAPE_CASE_INSENSITIVE`
- [ ] `parsePlanWithDiagnostics` returns `CORE-005.N` as a parsed task with zero unparsed diagnostics for that line
- [ ] `[[CORE-005.N]]` wikilinks resolve into `relatedTasks`
- [ ] `groupTasks` nests a `.N` child under its `CORE-EPIC-005` parent
- [ ] Existing numeric-subtask tests still pass; full viz suite + typecheck + lint green
- [ ] `SPEC/epic.md` documents `.N` as permanently grammar-legal (no close-time rename; new impl children insert before `.N`; both forms valid going forward)
- [ ] `SPEC.md` §"Task ID convention" notes the subtask slot accepts `\d+` or reserved literal `N`
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Edit 5 regex constants in `viz/src/parser.ts` (`\.\d+` → `\.(?:\d+|N)`)
- [ ] Add parser.test.ts cases: `.N` parse, `.N` no-diagnostic, `[[..N]]` wikilink resolve, `.N` groupTasks nesting
- [ ] Update `SPEC/epic.md` audit-child lifecycle
- [ ] Update `SPEC.md` §"Task ID convention" numbering note
- [ ] Run `npm --prefix viz run test` + `typecheck` + `lint`
- [ ] Visual confirm `.N` renders without ⚠ banner (viz port 5120)

## 🔗 Related

- Closest precedent: FE-066 (grammar tolerances via alternation) / FE-067 (`LEGACY_LABEL_LINE` + `ID_SHAPE_CASE_INSENSITIVE`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly filed CORE-333 and invoked `/ft-task`. The change is well-scoped, fully designed in the brief, and eliminates a recurring adopter friction point (the `.N` → number rename that has been missed across repos).

- [x] Read relevant source files — `viz/src/parser.ts` (all 5 regex constants + `groupTasks`), `viz/src/parser.test.ts`, `SPEC.md` §"Task ID convention"/§"Task-line format", `SPEC/epic.md`.

- [x] **Archive skim** — 31 `archive/core/*.md` mention parser.ts; closest grammar precedents FE-066/FE-067 (in `archive/fe/`). Load-bearing: FE-066 established the alternation-without-new-capture-group pattern; FE-067 added `LEGACY_LABEL_LINE` + `ID_SHAPE_CASE_INSENSITIVE` where a completed bold token that *has* ID shape is treated as a typo (surfaced unparsed), and only shapeless tokens get the legacy exclusion. Implication: widening `ID_SHAPE_CASE_INSENSITIVE` to accept `.N` correctly classifies `CORE-005.N` as ID-shaped (a real ID, not a legacy record) — preserves FE-067 semantics.

- [x] **Drift check** — all 5 constants confirmed at parser.ts:58 (`TASK_LINE`), :80 (`WIKILINK_PATTERN`), :81-82 (`BLOCKED_BY_BLOCK`, 2 inner occurrences), :114 (`SUBTASK_ID`), :196 (`ID_SHAPE_CASE_INSENSITIVE`). `SPEC.md` §"Task ID convention" at :117; `SPEC/epic.md` numbering/lifecycle at :22-30. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Assumptions: (1) reserved suffix is uppercase `N` only per the brief (`\.(?:\d+|N)`), not case-insensitive `[Nn]`; (2) `groupTasks` needs no change — `subtaskParentKey` widened by the `SUBTASK_ID` edit yields the same parent key (`CORE-005`), matching `epicKey`; (3) `COMPLETED_DATE`'s `\.?` and `LEGACY_LABEL_LINE` carry no subtask-decimal slot and are left untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Exactly 5 constants, 6 textual replacements (BLOCKED_BY_BLOCK has two inner `\.\d+`). No new capture groups introduced → all destructures unchanged. `.N` sorts last naturally because grouping preserves PLAN.md line order (parse order), and the audit line is filed as the highest `.N` child.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed FE-066's idiom: widen the existing alternation in-place, no new capture group (all destructures unchanged).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `viz/src/parser.ts` — 6 textual replacements across 5 constants (`\.\d+` / `(?:\.\d+)?` → `\.(?:\d+|N)` / `(?:\.(?:\d+|N))?`): `TASK_LINE`, `WIKILINK_PATTERN`, `BLOCKED_BY_BLOCK` (2 inner), `SUBTASK_ID`, `ID_SHAPE_CASE_INSENSITIVE`. No capture groups added → destructures + `groupTasks` unchanged.
- `viz/src/parser.test.ts` — +4 tests: `.N` parse+nest, `[[..N]]` wikilink resolve, `.N` no-diagnostic, `.N` groupTasks nesting.
- `SPEC.md` §"Task ID convention" + `SPEC/epic.md` numbering convention — documented `.N` as reserved terminal audit suffix (grammar-legal, no rename; new children insert before `.N`; historical numeric form still valid).
- Filing format (ft-epic-discovery / ft-close-epic skills) deliberately untouched per brief scope — both `.N` and numeric audit forms parse; skill migration is a candidate follow-up.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full viz suite green: **226 passed** (16 files), including the 4 new `.N` cases.

- [x] Ran lint/type-check on changed code — `tsc --noEmit` clean, `eslint src` clean.

- [x] (frontend) Visual criterion satisfied-by-proxy: the viz ⚠ banner is driven by the parser's `unparsed[]`; the new "no-diagnostic" test asserts `unparsed === []` for a `.N` line. Live viz check offered at closure (not gated).

**Testing Notes:**

Regex-only parser change, no new UI surface. The single source feeding the ⚠ banner (unparsed diagnostics) is directly asserted for `.N`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` = **updated** (§"Task ID convention" `.N` note); `README.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` = **no change** (no subtask-grammar definition duplicated; `.N`/`.1` hits are task-ID wikilinks, "audit" hits are the `/ft-audit` skill family). `SPEC/epic.md` also updated in-scope (lazy module, not a cold-start sweep entry).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-03.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Made `.N` a grammar-legal reserved terminal subtask suffix so an epic's audit child (`<AREA>-<N>.N`) never needs renaming at close. Widened 5 parser.ts regex constants (`\.\d+` → `\.(?:\d+|N)`, 6 occurrences, no new capture groups), added 4 parser.test.ts cases (suite green: 226 passed), and documented the reserved suffix in `SPEC.md` §"Task ID convention" + `SPEC/epic.md` numbering convention. Filing format (ft-epic-discovery / ft-close-epic) deliberately untouched per scope — both `.N` and numeric audit forms parse; a skill-migration follow-up is a candidate.

**Archived:** 2026-07-03
