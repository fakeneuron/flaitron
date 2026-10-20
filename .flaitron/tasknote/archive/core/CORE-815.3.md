---
title: moderate-tier-viz
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-EPIC-815, CORE-815.1, CORE-815.2, CORE-815.4]
touches:
  - viz/src/parser.ts
  - viz/src/parser.test.ts
  - viz/src/ui/ModelChip.tsx
  - viz/src/ui/ModelChip.test.tsx
---

# CORE-815.3 | moderate-tier-viz

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Rename the tier wording in the visualizer's `parser.ts` and `ModelChip.tsx` comments to `moderate`, move the `parser.test.ts` tier cases to `[moderate]`, and add a `[moderate]🧩` glyph case plus a legacy `[medium]` alias case; parser logic does not change.

## ✅ Acceptance

- [x] `parser.ts` and `ModelChip.tsx` comments name the `moderate` tier and no tier `medium` remains in them — `grep -n -i medium viz/src/parser.ts viz/src/ui/ModelChip.tsx` → hits only `Medium` priority and the legacy-alias mention
- [x] `parser.test.ts` tier tokens are `[moderate]`; `## Medium` priority headings unchanged — `grep -n '\[medium\]' viz/src/parser.test.ts` → only the legacy alias case
- [x] A `[moderate]🧩` glyph case and a legacy `[medium]` alias case (stored as written) exist — `grep -c "moderate\]🧩" viz/src/parser.test.ts` ≥ 1 and the `[medium]🧩` case remains
- [x] viz suite, typecheck, lint pass — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint`
- [x] No parser logic changed — `git diff viz/src/parser.ts` shows comment lines only (`judgment`: no command separates comment from code lines)

## 🧩 Subtasks

- [x] `viz/src/parser.ts`: tier comments → `moderate`, one clause naming the stored-as-written legacy alias
- [x] `viz/src/ui/ModelChip.tsx`: comment → "Moderate and light"
- [x] `viz/src/parser.test.ts`: `[medium]` tier tokens and `model: 'medium'` → `moderate`; keep the 🧩 case as the legacy alias; add a `[moderate]🧩` case
- [x] `viz/src/ui/ModelChip.test.tsx`: `moderate` in the renders-nothing list, `medium` kept as the alias
- [x] Phase 3: viz test / typecheck / lint, External review

## 🔗 Related

- [[CORE-EPIC-815]] — parent epic (moderate-tier-rename)
- [[CORE-815.2]] — predecessor: states the alias rule (SPEC/model.md, SPEC/plan-parser.md) these tests pin
- [[CORE-815.4]] — follow-up: prose sweep outside viz

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed the alias rule and fixtures; viz still carries tier `[medium]` in `parser.ts` comments (lines 10, 81-83), `ModelChip.tsx` (line 5), and ~25 `parser.test.ts` rows. The parser regex accepts any token, so this is comments plus test data.

- [x] Read relevant source files — `viz/src/parser.ts` header + SUGGESTION_GLYPH comment, `viz/src/ui/ModelChip.tsx` and its test, `viz/src/parser.test.ts` tier rows, `SPEC/plan-parser.md` legacy-`[medium]` paragraph (via `.2`'s note)

- [x] **Best Practices Review** — N/A: comment and test-data rename; no module boundary changes

- [x] **Archive skim** — `archive/core/` confirmed against the README table; `CORE-815.2` (alias rule, fixtures) is the load-bearing hit; it reads the token raw (`model: "medium"` stays `"medium"`), so the alias test asserts the stored token.

- [x] **Drift check** — PLAN line matches `.1`/`.2`; HEAD 0ba8d7b7 still carries `[medium]` in the files above; `## Medium` headings and `font-medium` classes elsewhere in `viz/src` are priority / CSS, not tier, and stay.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

No clarifications needed. Assumptions: the legacy alias case is the existing `[medium]🧩` row (CORE-353), kept with `model: 'medium'`; the new `[moderate]🧩` row sits beside it. `ModelChip.test.tsx` keeps `medium` in its renders-nothing list as the alias beside `moderate`. `parser.ts` gets a one-clause alias note in the category-labels comment so the stored-as-written rule is visible where `TaskModel` is defined.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the `.2` fixtures shape: tier rows move to `[moderate]`, one `[medium]🧩` row stays as the legacy alias case

- [x] **Minimal refactor gate** — no refactor; token renames plus one added test

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `[moderate]🧩` glyph case, legacy `[medium]🧩` alias case (stored as written), `moderate` + `medium` in the ModelChip renders-nothing list

**Implementation Notes:**

- `viz/src/parser.test.ts`: `sed` `[medium]` → `[moderate]` and `model: 'medium'` / `toBe('medium')` → `moderate` (`## Medium` headings carry no brackets, so untouched). The 🧩 case became the `[moderate]` glyph case; a new case keeps `[medium]🧩` as the legacy alias, asserting `model: 'medium'`.
- `viz/src/parser.ts`: category-label comment → `moderate` plus one clause naming the read-only, stored-as-written `medium` alias; SUGGESTION_GLYPH examples → `[moderate]`. Comment lines only.
- `viz/src/ui/ModelChip.tsx`: comment "Moderate and light stay glyph-free". No logic change (`medium` and `moderate` both fall through to `null`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (616 passed)

- [x] Ran lint/type-check on changed code — typecheck and lint clean

- [x] **Verification receipt** — see Testing Notes; no duplication or dead code left behind

- [x] **External review** — N/A: a mechanical token rename, comment edits and two small test additions; no logic changed, so there is nothing for a reviewer to grade beyond the greps below

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered output changed (`ModelChip` logic untouched)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `grep -n -i medium viz/src/parser.ts viz/src/ui/ModelChip.tsx` → hits only the `Medium` priority (lines 5, 39, 293, 295) and the legacy-alias comment (line 12)
- A2 `grep -n '\[medium\]' viz/src/parser.test.ts` → only the legacy alias case (lines 426-427)
- A3 `grep -c "moderate\]🧩" viz/src/parser.test.ts` → 2 (the glyph case and the FE-100 row); the `[medium]🧩` alias case remains
- A4 `npm --prefix viz test` → 0 (29 files, 616 tests; was 614 before, +2: glyph/alias case, ModelChip `moderate`)
- A5 `npm --prefix viz run typecheck` → 0; `npm --prefix viz run lint` → 0
- A6 `git diff viz/src/parser.ts` non-comment lines → none (comments only; `judgment`)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change for every entry: `viz/README.md` carries no tier `medium`; the remaining tier prose outside viz is CORE-815.4's scoped sweep and the alias keeps it valid until then

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

The visualizer now says `moderate` wherever it means the tier, and pins the alias rule from `.2`: a `[moderate]🧩` row parses as `moderate`, and a legacy `[medium]🧩` row parses and is stored as `medium`. Changed files: `viz/src/parser.ts` (comments), `viz/src/parser.test.ts`, `viz/src/ui/ModelChip.tsx` (comment), `viz/src/ui/ModelChip.test.tsx`, plus PLAN.md and this tasknote. `touches:` reconciliation: every changed path falls inside the declared set. Verification: viz 616/616, typecheck and lint clean, no parser logic changed. Maintainability: viz tests now use the same vocabulary as the contract, and one test documents the alias.

**Archived:** 2026-10-20
