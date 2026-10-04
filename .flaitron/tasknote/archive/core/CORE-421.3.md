---
title: duplicate-epic guard
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-421, CORE-421.2]
---

# CORE-421.3 | duplicate-epic guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-421]] [[CORE-421.2]]

## 🎯 Goal

Guard `parser.ts`'s `groupTasks` so an epic ID appearing under two headings doesn't get pushed twice (last write silently wins and the epic vanishes from its original section) — keep the first write and emit a diagnostic instead.

## ✅ Acceptance

- [x] A duplicate `<AREA>-EPIC-<N>` ID across two PLAN.md headings retains the **first** occurrence's task data (priority/section) in `groupTasks`'s output; the second is not written into the epic map. — `parser.test.ts` "keeps the first occurrence when an epic ID appears under two headings"; live-verified in the browser (High-section duplicate retained over the real Medium entry, matching file order).
- [x] The duplicate epic's `TaskNode` is pushed into the returned node list exactly once (not once per occurrence). — `parser.test.ts` "does not push the duplicated epic node into `nodes` twice"; `App.test.tsx` asserts a single `#row-CORE-EPIC-421` DOM node.
- [x] `groupTasks` surfaces a diagnostic for each duplicate epic ID encountered, following the codebase's existing `unparsed`-diagnostic UI pattern (`parsePlanWithDiagnostics` → `App.tsx` warning banner). — `DuplicateEpic`/`GroupTasksResult` return shape + mirrored badge/strip in `App.tsx`; live-verified.
- [x] Regression tests cover: duplicate epic under the same heading, duplicate epic across two different headings, and the diagnostic's shape/content. — `parser.test.ts` has both (same-heading via identical `t()` priority; cross-heading via differing `priority` args) plus a subtask-attachment case; `App.test.tsx` covers the rendered diagnostic shape end-to-end.
- [x] Existing `groupTasks` tests and call sites (`App.tsx`) updated for any return-shape change; full targeted suite green. — 8/8 existing tests updated to destructure `{ nodes }`; `App.tsx:135` updated; full suite 273/273.

## 🧩 Subtasks

- [ ] Guard `groupTasks` Pass 1 (`epicByKey.set`) to keep only the first-seen task per epic key; collect duplicate epic IDs encountered
- [ ] Guard `groupTasks` Pass 2 so the shared `TaskNode` is pushed into `nodes` only on the epic's first occurrence, not once per duplicate line
- [ ] Define a diagnostic shape for duplicate epics (mirroring `UnparsedLine`) and have `groupTasks` return it alongside `nodes`
- [ ] Update `App.tsx`'s `groupTasks(tasks)` call site + surface the new diagnostic in the UI (extend the existing warning-banner pattern used for `unparsed`)
- [ ] Update existing `groupTasks` tests in `parser.test.ts` for the new return shape; add regression tests for same-heading and cross-heading duplicate epics
- [ ] Run targeted tests (`parser`, `App`) + lint/typecheck

## 🔗 Related

- [[CORE-EPIC-421]] — parent epic (viz-robustness)
- [[CORE-421.2]] — predecessor: fence-aware tasknote scanners, same epic

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `parser.ts:161-189` `groupTasks` still has the described bug — Pass 1 populates `epicByKey` by `.set()` with no duplicate check, so a second line matching the same `<AREA>-EPIC-<N>` ID overwrites the first entry's task object (whichever section it belongs to). Pass 2 then pushes `epicByKey.get(eKey)!` once per matching line, so a duplicated epic ID renders its (last-write) node twice while vanishing from whichever section the first, discarded write belonged to — matches the PLAN.md line exactly, current line numbers unchanged.

- [x] Read relevant source files — `viz/src/parser.ts` (`groupTasks` L161-189, `epicKey`/`subtaskParentKey`/`isEpic` L139-159, `parsePlanWithDiagnostics` + `UnparsedLine` diagnostic pattern L191-298), `viz/src/ui/App.tsx` (sole call site L135 `useMemo(() => groupTasks(tasks), [tasks])`; existing `unparsed`-diagnostic warning banner L326-330 + L407-422), `viz/src/parser.test.ts` (`describe('groupTasks', ...)` L536-623, 8 existing cases).

- [x] **Best Practices Review** — Touched responsibility: `groupTasks` is a pure function turning a flat `Task[]` into a parent/child `TaskNode[]` tree; it currently has no diagnostics output, unlike its sibling `parsePlanWithDiagnostics` which already returns `{ tasks, unparsed }` and is rendered as a warning banner in `App.tsx`. That's the established in-repo pattern for "surface a hand-authoring mistake instead of silently dropping/misrendering it" (`UnparsedLine`, CORE-336/FE-063.2 lineage). Extending `groupTasks` to return `{ nodes, duplicateEpics }` alongside the guard follows that pattern rather than reaching for an unrelated mechanism (e.g. `console.warn`, which the codebase reserves for server-side/error-boundary logging in `devApi.ts` / `ErrorBoundary.tsx`, not user-facing PLAN.md diagnostics). This does touch `groupTasks`'s public return shape and its one call site (`App.tsx:135`) plus all 8 existing tests — an in-scope, minimal ripple, not a broader refactor.

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` has one prior CORE-421.* note, `CORE-421.2.md` (fence-aware scanners, same epic, `viz/src/tasknote.ts`). Its Discovery/Implementation Notes twice flag that `viz/src/parser.ts` "has the same bug class against PLAN.md" (fenced/quoted content read as real structure) and state "CORE-421.3 already owns its neighbouring defect" — i.e. at 421.2's filing time, 421.3 was expected to close a **fence-unawareness** gap in `parsePlanWithDiagnostics`, not the duplicate-epic guard this task's PLAN.md line actually describes. See Drift check below for the reconciliation.

- [x] **Drift check** — Code: `groupTasks` at `viz/src/parser.ts:161-189` matches the PLAN.md description exactly (line numbers, function name, root cause all current). SPEC cross-reference: `SPEC/epic.md` §"Numbering convention" confirms `.3` is a normal implementation child, nothing epic-lifecycle-special applies. Plan-vs-prior-note cross-reference: CORE-421.2's forward-reference to "the neighbouring `parser.ts` defect" was about fence-unawareness in `parsePlanWithDiagnostics` (the raw-markdown scan), not the duplicate-epic Map bug in `groupTasks` (the post-parse grouping step) — two different functions, two different bug classes, both plausibly filed under the epic's "duplicate-tolerant" / "fence-aware" language in `CORE-EPIC-421`'s own PLAN.md line. Practical check: `parsePlanWithDiagnostics` has no fence-mask today, but `.flowtron/PLAN.md` and `templates/PLAN.md` contain zero markdown code fences (grepped), and `templates/PLAN.md`'s illustrative task-line examples sit above the first `##` heading inside an HTML comment (already inert per `currentPriority` gating + `blankHtmlComments`) — so the fence-unawareness gap CORE-421.2 flagged is real but currently dormant, not the live defect this task's filed line targets. **Surfacing, not blocking:** this is a genuine gap the current epic's filed children (`.3` `.4` `.5` `.N`) don't cover; flagging it for the `.N` audit or a follow-up rather than folding it into this task, since CORE-421.3's actual filed scope (duplicate-epic guard) is well-defined, current, and matches `CORE-EPIC-421`'s "duplicate-tolerant" language on its own.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: diagnostic surfacing follows the existing `unparsed` UI pattern (banner in `App.tsx`) rather than a console-only warning, since the PLAN.md line says "emit a diagnostic" and the repo already has a user-facing convention for exactly this kind of PLAN.md authoring mistake.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The parser.ts fence-unawareness gap CORE-421.2 anticipated 421.3 would close is a separate, currently-dormant defect (no live PLAN.md fences trigger it today) — noted for the epic's `.N` audit or a follow-up filing, not folded into this task. See Drift check above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the codebase's one existing PLAN.md-diagnostic pattern: `parsePlanWithDiagnostics` already returns `{ tasks, unparsed }` with `unparsed: UnparsedLine[]` surfaced in `App.tsx` as an amber badge + warning-strip. `groupTasks` had no such shape; changed it to `{ nodes, duplicateEpics }` with a parallel `DuplicateEpic[]` and mirrored the exact badge/strip markup for `App.tsx`, rather than reaching for `console.warn` (which the repo reserves for server-side/error-boundary logging, not PLAN.md-authoring diagnostics). No new UI shape invented.

- [x] **Minimal refactor gate** — the only refactor beyond the literal guard is threading the new return shape through `groupTasks`'s sole call site (`App.tsx:135`, destructured to `{ nodes: allNodes, duplicateEpics }`) and its 8 existing tests. Required by the diagnostic itself; nothing else touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**`viz/src/parser.ts` (+34 / -5).** `groupTasks` (L161-207) now guards both passes against a duplicate `<AREA>-EPIC-<N>` ID:

- **Pass 1** (`epicByKey` indexing) — a `seenEpicKeys` Set gates the `.set()`; the first occurrence's task (and its section/priority) is kept, a second occurrence pushes `{ id: task.id }` onto a new `duplicateEpics: DuplicateEpic[]` array instead of overwriting the map entry.
- **Pass 2** (node assembly) — a `pushedEpicKeys` Set mirrors the guard so the shared `TaskNode` is pushed into `nodes` only once, not once per matching line (this is what previously rendered the epic twice while it "vanished" from its original section — last-write-wins meant both pushes resolved to the *same*, later-write object).
- New `DuplicateEpic` interface (`{ id: string }`) and `GroupTasksResult` (`{ nodes: TaskNode[]; duplicateEpics: DuplicateEpic[] }`) exported; `groupTasks`'s return type changed from `TaskNode[]` to `GroupTasksResult`.

**`viz/src/ui/App.tsx` (+22 / -1).** Sole call site updated to `const { nodes: allNodes, duplicateEpics } = useMemo(() => groupTasks(tasks), [tasks])` (downstream `allNodes` usage unchanged — same `TaskNode[]` shape). Added a `duplicateEpics.length > 0` amber badge next to the existing `unparsed` badge, and a matching warning strip listing each duplicated ID — both copy the `unparsed` pattern's markup/classes verbatim for visual consistency.

**`viz/src/parser.test.ts` (+50 / -10).** All 8 existing `groupTasks` tests updated to destructure `{ nodes }`; 4 new regression tests: no diagnostics when IDs are unique, first-occurrence priority retained on a cross-heading duplicate, the duplicated node is pushed into `nodes` exactly once, and subtasks still attach correctly to the retained (first-occurrence) epic node when it's duplicated.

**`viz/src/ui/App.test.tsx` (+40).** New `describe` block (mirroring the existing `unparsed`-diagnostics block): badge + strip render with the duplicated ID and correct singular/plural copy, only one `#row-CORE-EPIC-421` DOM node exists despite two PLAN.md entries, and no badge/strip renders when nothing is duplicated.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — no avoidable duplication (the two guard Sets mirror each other by necessity, not by accident — Pass 1 and Pass 2 walk the same array for different purposes); no dead code; no unexplained complexity (`seenEpicKeys`/`pushedEpicKeys` are named for exactly what they guard); one new exported type pair (`DuplicateEpic`, `GroupTasksResult`) is necessary public surface — the diagnostic has to leave the function to reach the UI, matching the existing `UnparsedLine` precedent; no code-facing documentation went stale.

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Targeted: `npm --prefix viz test -- parser` → 61/61. `npm --prefix viz test -- App` → 37/37 (34 pre-existing + 3 new).
- Full suite: `npm --prefix viz test` → **273/273 across 18 files** (270 before; +3 new).
- `npm --prefix viz run lint` → clean. `npm --prefix viz run typecheck` → clean.
- **Visual confirmation** (frontend change — new warning badge + strip in `App.tsx`): started the viz dev server (`npm run dev`, port 5120), temporarily appended a duplicate `**CORE-EPIC-421**` line under `.flowtron/PLAN.md`'s `## High` (the real entry lives under `## Medium`), loaded the flowtron project in the running viz app, and confirmed via screenshot: the header shows an `⚠ 1 duplicate epic` badge, a warning strip lists `CORE-EPIC-421`, and the epic renders exactly once (as the retained first-occurrence node, correctly still showing all 5 children) rather than twice or vanished. Reverted the temporary PLAN.md line immediately after (`git diff` confirmed clean) and stopped the dev server. Screenshots: `/tmp/playwright-mcp/core-421-3-duplicate-epic-banner.png` (before switching project), `/tmp/playwright-mcp/core-421-3-flowtron-project-view.png` (the actual verification, flowtron project selected).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — checked all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries (`README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`) for any mention of `groupTasks`/`TaskNode`/duplicate-epic behavior — zero hits across all 14. **No change** to any of them; this task is an internal `viz` implementation + test change with no doc-surface impact.

- [x] Closed — all 5 `## ✅ Acceptance` criteria ticked with evidence above; YAML `status:` flipped to `completed`; PLAN.md line flips to stub form, kept nested beneath its active parent `CORE-EPIC-421` (epic child, siblings `.2` `.4` `.5` `.N` still open); tasknote moves to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

`groupTasks` (`viz/src/parser.ts`) indexed epics into a `Map` with an unguarded `.set()`, so a hand-authoring mistake — the same `<AREA>-EPIC-<N>` ID filed under two PLAN.md headings — let the second occurrence silently overwrite the first: the epic's node then rendered under the *second* heading's section while vanishing from the first, with the shared `TaskNode` object pushed into the output twice. Both passes now guard on first-write (`seenEpicKeys` / `pushedEpicKeys` Sets), and `groupTasks`'s return shape grew from `TaskNode[]` to `{ nodes, duplicateEpics }` — mirroring the codebase's one existing PLAN.md-diagnostic pattern (`parsePlanWithDiagnostics`'s `unparsed`), including the `App.tsx` badge + warning-strip UI treatment.

**Changed files (4).** `viz/src/parser.ts` (+34/-5) — guard + new `DuplicateEpic`/`GroupTasksResult` types. `viz/src/ui/App.tsx` (+22/-1) — call-site update + duplicate-epic badge/strip. `viz/src/parser.test.ts` (+50/-10) — 8 existing tests updated for the new return shape, 4 new regression tests. `viz/src/ui/App.test.tsx` (+40) — 3 new end-to-end diagnostic-rendering tests.

**Verification.** Targeted: `parser` 61/61, `App` 37/37. Full suite: **273/273 across 18 files** (270 before). Lint + typecheck clean. Visual: live-verified in the dev server against a temporary duplicate `CORE-EPIC-421` line (reverted immediately after, `git diff` confirmed clean) — badge, warning strip, and single deduped row with all 5 children intact all render correctly; operator confirmed ("go").

**Refactors.** None beyond the guard + its necessary return-shape/call-site ripple (Minimal Refactor Gate, Phase 2).

**Documentation.** No change — doc-drift sweep found zero references to the touched internals across all 14 AI-referenced docs.

**Maintainability effect.** `groupTasks` now fails visibly (diagnostic + first-write-wins) instead of silently on a duplicate epic ID, matching the parser's existing `unparsed`-diagnostic convention rather than adding a second, inconsistent mechanism.

**Scope note (not actioned here).** Discovery surfaced that CORE-421.2's tasknote expected `.3` to close a *fence-unawareness* gap in `parsePlanWithDiagnostics` (parallel to the fix it made in `tasknote.ts`) — but this task's actual filed PLAN.md line covers a different bug (the `groupTasks` duplicate-epic Map issue) instead. That fence-unawareness gap in `parsePlanWithDiagnostics` is real but currently dormant (no live PLAN.md fences trigger it) and isn't covered by any of `CORE-EPIC-421`'s current children (`.4` `.5` `.N`) — worth a look at the `.N` audit.

**Archived:** 2026-08-09
