---
title: near-miss heading diagnostic
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-425, CORE-425.2]
---

# CORE-425.3 | near-miss heading diagnostic

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-425]]

## 🎯 Goal

An unrecognized PLAN.md heading that case-insensitively matches a known priority name (High/Medium/Low/Future Opportunities) emits a diagnostic instead of silently dropping its tasks.

## ✅ Acceptance

- [x] An unrecognized `## heading` that case-insensitively matches one of the five `Priority` section names (High/Medium/Low/Future Opportunities/Completed) is collected into a new `nearMissHeadings` diagnostic returned from `parsePlanWithDiagnostics`, mirroring the existing `UnparsedLine`/`DuplicateEpic` pattern — instead of `currentPriority` silently going `null` with no trace. — `parser.ts` `NearMissHeading`/`LOWERCASE_TO_PRIORITY`; `parser.test.ts` near-miss tests.
- [x] Tasks under a near-miss heading are still excluded from the parsed task list (today's drop behavior preserved) — this is a visibility fix, not auto-recovery, per operator decision. — `parser.test.ts` "flags a near-miss heading ... and still drops its tasks"; live-verified (`CORE-999` absent from the board).
- [x] `App.tsx` surfaces the new diagnostic via a badge + warning-strip mirroring the existing `unparsed`/`duplicateEpics` UI treatment. — `App.tsx` badge + strip; `App.test.tsx` rendering tests; live-verified via screenshot.
- [x] Regression tests in `parser.test.ts` cover: a near-miss heading (case difference), an exact match (no diagnostic), an unrelated heading (no diagnostic, e.g. `## Vision`), and the diagnostic's shape/content; `App.test.tsx` covers the rendered diagnostic. — 4 + 2 new tests respectively, all passing.
- [x] Existing parser/App tests and call sites updated for the new return/prop shape; full targeted suite green. — `parser` 69/69, `App` 40/40, full suite 297/297; lint + typecheck clean.

## 🧩 Subtasks

- [x] Add `NearMissHeading` type + case-insensitive match check in `parsePlanWithDiagnostics`'s unrecognized-heading branch; collect into a new `nearMissHeadings` array on the parse result
- [x] Thread `nearMissHeadings` through `useProjectData.ts` (state + reset + return shape)
- [x] Add badge + warning-strip in `App.tsx` mirroring the `unparsed`/`duplicateEpics` pattern
- [x] Add regression tests to `parser.test.ts` (near-miss detected, exact match → no diagnostic, unrelated heading → no diagnostic, tasks under near-miss still dropped)
- [x] Add rendering tests to `App.test.tsx` mirroring the existing diagnostic-block tests
- [x] Run targeted tests (parser, App) + lint/typecheck; visual confirmation in dev server

## 🔗 Related

- [[CORE-EPIC-425]] — parent epic (viz near-miss diagnostics)
- [[CORE-425.2]] — predecessor epic child (Escape precedence fix)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `viz/src/parser.ts:300-317` `parsePlanWithDiagnostics`'s heading branch still has the described gap — an unrecognized heading falls into the `else` clause, sets `currentPriority = null`, and every checkbox line under it is skipped before it even reaches the `TASK_LINE`/`unparsed` diagnostic path (`if (!currentPriority) continue;` at L318). Matches the PLAN.md line exactly; current line numbers unchanged.

- [x] Read relevant source files — `viz/src/parser.ts` (`SECTION_HEADINGS` L29-35, `LEGACY_CRITICAL_HEADING` L40-41, `HEADING_LINE` L86, heading branch + `currentPriority` gate L292-357), `viz/src/ui/App.tsx` (existing `unparsed`/`duplicateEpics` badge + banner pattern L326-335, L412-440), `viz/src/ui/useProjectData.ts` (state wiring for `unparsed`), `viz/src/parser.test.ts` ("skips task-shaped lines outside known section headings" L84-94).

- [x] **Best Practices Review** — Touched responsibility: `parsePlanWithDiagnostics` already returns `{ tasks, unparsed }` as its one diagnostics surface; this is the established in-repo pattern (per CORE-421.3's `groupTasks`→`duplicateEpics` precedent, same lineage) for "surface a hand-authoring mistake instead of silently dropping/misrendering it." Extending the return shape with a parallel `nearMissHeadings` array follows that pattern rather than inventing a new mechanism. Ripple is the same shape as CORE-421.3: `parser.ts` + its sole diagnostics consumers (`useProjectData.ts`, `App.tsx`) + their tests — in-scope, minimal.

- [x] **Archive skim** — `CORE-421.3.md` (duplicate-epic guard, same epic-diagnostics lineage) is the exact precedent: extended `groupTasks`'s return shape with a new diagnostic array (`DuplicateEpic[]`) mirroring `UnparsedLine`, plus a matching `App.tsx` badge/strip. This task follows the identical shape one level up (heading recognition instead of post-parse grouping). No other archived CORE-425.* note yet (425.2 is the only sibling, covers Escape-precedence — unrelated surface).

- [x] **Drift check** — Code matches: `SECTION_HEADINGS`/heading branch at `viz/src/parser.ts:29-35,300-317` current. SPEC: no SPEC contract governs PLAN.md heading-typo tolerance; nothing contradicted. PLAN.md line: matches this task's filed description exactly (viz near-miss diagnostics epic, "typo'd priority-heading diagnostic").

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Asked whether a near-miss heading should auto-recover its tasks under the matched priority or stay dropped with only a diagnostic added. Operator chose **diagnostic-only, still drop** (matches CORE-421.3's conservative precedent: report the mistake, never reinterpret hand-authored structure). Scope assumption: "priority name" in the PLAN.md line means the five `Priority` values (High/Medium/Low/Future Opportunities/Completed) only — the legacy `Critical` heading is a separate, already-handled exact-match case and is out of scope for this near-miss check.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Precedent (`CORE-421.3`) fully determines the shape: new diagnostic array on the parser's return type, threaded through `useProjectData.ts`, surfaced via a badge + warning-strip in `App.tsx` mirroring `unparsed`/`duplicateEpics` verbatim. No open questions beyond the one resolved above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `parsePlanWithDiagnostics`'s existing `{ tasks, unparsed }` diagnostics shape with a parallel `nearMissHeadings: NearMissHeading[]` array, following the exact `DuplicateEpic`/`GroupTasksResult` precedent from CORE-421.3. No new mechanism invented; `App.tsx`'s badge + warning-strip markup is reused verbatim (same amber classes, same two-tier badge+strip layout) for visual/pattern consistency with `unparsed` and `duplicateEpics`.

- [x] **Minimal refactor gate** — no refactor beyond the literal addition: a new `LOWERCASE_TO_PRIORITY` lookup map (built once from the existing `SECTION_HEADINGS` Set), one `nearMissHeadings.push(...)` in the existing unrecognized-heading `else` branch, and threading the new field through `useProjectData.ts`'s state/reset/return shape and `App.tsx`'s destructure + two new JSX blocks.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`viz/src/parser.ts` (+24/-2).** New `NearMissHeading` interface (`{ line, heading, matched: Priority }`, exported like `UnparsedLine`) and `PlanParseResult.nearMissHeadings: NearMissHeading[]`. A `LOWERCASE_TO_PRIORITY` map (built once from `SECTION_HEADINGS`) backs the check. In `parsePlanWithDiagnostics`'s heading branch, the existing `else` arm (heading doesn't match `SECTION_HEADINGS`, isn't legacy `Critical`) now additionally looks up `heading.toLowerCase()` in the map; a hit pushes `{ line: i + 1, heading, matched }`. `currentPriority` still goes `null` either way — tasks under the near-miss heading are still excluded from `tasks`, per the operator's diagnostic-only decision. Scope: only the five `Priority` names are checked; the legacy `Critical` heading (already exact-match-only) is untouched.

**`viz/src/ui/useProjectData.ts` (+6/-1).** New `nearMissHeadings` state, populated from `parsed.nearMissHeadings` alongside `tasks`/`unparsed`, cleared in `reset()`, exposed in the hook's return shape and type signature — mirrors `unparsed` wiring exactly.

**`viz/src/ui/App.tsx` (+19/-1).** Destructures `nearMissHeadings` from `useProjectData`. Header gains a `⚠ N near-miss heading(s)` badge next to the `duplicateEpics` badge (identical amber classes). A new warning strip (identical container classes to the `unparsed`/`duplicateEpics` strips) lists each near-miss as `L{line}: "{heading}" (did you mean "{matched}"?)`.

**`viz/src/parser.test.ts` (+50).** 4 new tests in the `parsePlanWithDiagnostics` block: a case-differing near-miss heading is flagged and its task dropped; an exact-match heading is not flagged; an unrelated heading (`## Vision`) is not flagged; multiple near-misses collect with correct 1-based line numbers.

**`viz/src/ui/App.test.tsx` (+27).** New `describe('App — near-miss heading diagnostics (CORE-425.3)')` block mirroring the `duplicate-epic diagnostics` block: badge + strip render with the correct heading/suggestion text and the dropped task's ID never appears; no badge/strip when every heading matches exactly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — no avoidable duplication (`LOWERCASE_TO_PRIORITY` is built once at module scope, not per-line; the badge/strip JSX is intentionally near-identical to `unparsed`/`duplicateEpics` for visual consistency, matching CORE-421.3's precedent, not accidental copy-paste drift); no dead code; no unexplained complexity; one new exported type (`NearMissHeading`) is necessary public surface — the diagnostic has to leave `parser.ts` to reach the UI, same as `UnparsedLine`/`DuplicateEpic`; no code-facing documentation went stale.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — operator confirmed ("go").

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Targeted: `npm --prefix viz test -- parser` → 69/69. `npm --prefix viz test -- App` → 40/40.
- Full suite: `npm --prefix viz test` → **297/297 across 19 files**.
- `npm --prefix viz run lint` → clean. `npm --prefix viz run typecheck` → clean.
- **Visual verification** (frontend change — new warning badge + strip in `App.tsx`): started the viz dev server (`npm run dev`, port 5120), temporarily added `## medium\n\n- [ ] **CORE-999** | temp-test — ...` after `## Future Opportunities` in `.flowtron/PLAN.md`, loaded the flowtron project in the running app, and confirmed via screenshot: header shows `⚠ 1 near-miss heading`, warning strip reads `L30: "medium" (did you mean "Medium"?)`, and `CORE-999` does not appear anywhere in the task list (correctly dropped, not double-counted). Reverted the temporary PLAN.md line immediately after (`git status --porcelain` confirmed clean) and stopped the dev server. Screenshot reviewed live with the operator during the session; not persisted (ephemeral verification artifact, not a repo deliverable).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries for mentions of `parsePlanWithDiagnostics`/`unparsed`/heading-recognition behavior. `SPEC.md:238-239` mentions `unparsed` but only in the unrelated legacy-label-line context (task-line grammar, not heading recognition) — still accurate, no change needed. Zero hits elsewhere. **No change** to any of the 14 docs; this is an internal `viz` implementation + test change with no doc-surface impact (mirrors CORE-421.3's identical finding).

- [x] Closed — all 5 `## ✅ Acceptance` criteria ticked with evidence above; YAML `status:` flipped to `completed`; PLAN.md line flips to stub form, kept nested beneath its active parent `CORE-EPIC-425` (epic child, sibling `.4`/`.N` still open); tasknote moves to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

An unrecognized PLAN.md `## heading` fell into `parsePlanWithDiagnostics`'s `else` branch, set `currentPriority = null`, and silently dropped every task line under it — the existing `unparsed` diagnostic never fired because it's only reached inside a *recognized* section (`if (!currentPriority) continue;` short-circuits first). A heading that's merely a typo of a real priority name (`## medium` vs `## Medium`) is now caught: a case-insensitive lookup against the five `Priority` names collects a new `NearMissHeading` diagnostic (`{ line, heading, matched }`), surfaced via a header badge + warning strip in `App.tsx` mirroring the existing `unparsed`/`duplicateEpics` pattern (CORE-421.3 precedent). Per operator decision, this is diagnostic-only — tasks under the near-miss heading still don't parse; the fix makes the drop visible, not automatic-recovery.

**Changed files (5).** `viz/src/parser.ts` (+24/-2) — `NearMissHeading` type, `LOWERCASE_TO_PRIORITY` map, collection in the heading branch, threaded into `PlanParseResult`. `viz/src/ui/useProjectData.ts` (+6/-1) — state wiring mirroring `unparsed`. `viz/src/ui/App.tsx` (+19/-1) — badge + warning-strip UI. `viz/src/parser.test.ts` (+50) — 4 new regression tests. `viz/src/ui/App.test.tsx` (+27) — 2 new rendering tests.

**Verification.** Targeted: `parser` 69/69, `App` 40/40. Full suite: **297/297 across 19 files**. Lint + typecheck clean. Visual: live-verified in the dev server against a temporary `## medium` heading in `.flowtron/PLAN.md` (reverted immediately after, `git status --porcelain` confirmed clean) — badge, warning strip with the correct "did you mean" text, and the dropped task's absence from the board all render correctly. Operator confirmed ("go").

**Refactors.** None beyond the diagnostic itself and its necessary return-shape/call-site ripple (Minimal Refactor Gate, Phase 2) — same shape as the CORE-421.3 precedent this task followed.

**Documentation.** No change — doc-drift sweep found zero references to the touched internals across all 14 AI-referenced docs.

**Maintainability effect.** `parsePlanWithDiagnostics` now fails visibly on a typo'd priority heading instead of silently, matching the parser's existing `unparsed`/`duplicateEpics` diagnostic convention rather than adding a third, inconsistent mechanism.

**Archived:** 2026-08-09
