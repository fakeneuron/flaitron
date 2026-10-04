---
title: Escape precedence fix
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-425, CORE-421.5]
---

# CORE-425.2 | Escape precedence fix

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-425]] · [[CORE-421.5]]

## 🎯 Goal

Stop `useKeyboardNav`'s Escape handler from swallowing the keypress on a
stale `expandedId` whose row is no longer in `visibleIds`, and pin the whole
Escape precedence chain with a dedicated hook test.

## ✅ Acceptance

- [x] `useKeyboardNav`'s Escape collapse branch fires only when `expandedId` is non-null **and** present in `visibleIds`; a stale `expandedId` (row filtered out, section collapsed, or parent epic collapsed) no longer swallows the keypress
- [x] With a stale `expandedId` and a non-empty `query`/`statusFilter`, Escape falls through and clears search + filters (the visible behavior the user expects)
- [x] No regression on the rest of the chain: `dialog[open]` still short-circuits; a *visible* expanded row still collapses and consumes the key; the search-input blur and the unhandled (`return`, no `preventDefault`) tails still behave as before
- [x] Dedicated `viz/src/ui/useKeyboardNav.test.ts` exercises the hook directly (`renderHook`) and pins every rung of the Escape precedence chain, including the stale-`expandedId` case as a genuine regression check — *filed in Discovery as `.tsx`; landed as `.ts` because the harness needs no JSX (matches `useProjectData.test.ts`)*
- [x] `npm test`, `npm run typecheck`, and `npm run lint` all green in `viz/`

## 🧩 Subtasks

- [x] Add the `visibleIds.includes(expandedId)` guard to the Escape collapse branch in `viz/src/ui/useKeyboardNav.ts`
- [x] Create `viz/src/ui/useKeyboardNav.test.ts` with a `renderHook` harness + a params factory carrying spy setters
- [x] Write the precedence-chain cases (dialog-open · visible-expanded collapse · stale-expanded fall-through · filter clear · search-input blur · unhandled no-op)
- [x] Verify the stale-expanded test is a real regression check by reverting the guard and confirming it fails
- [x] Run targeted tests + typecheck + lint

## 🔗 Related

- [[CORE-EPIC-425]] — parent epic: viz near-miss diagnostics
- [[CORE-421.5]] — prior fix to the same Escape branch (`dialog[open]` early-return)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bug confirmed by direct read — `useKeyboardNav.ts:56` takes the collapse branch on `expandedId !== null` with no visibility test, then `preventDefault()`s and returns, so a stale `expandedId` silently eats the keypress the user meant for "clear my search". Filed by audit-repo 2026-08-09 under the "near-miss blind spot" theme; still accurate against current code.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Root cause.** `viz/src/ui/useKeyboardNav.ts:55-68` — the Escape chain's first rung is
`if (expandedId !== null) { setExpandedId(null); }`, followed by `e.preventDefault(); return`.
`expandedId` is app-level state (`App.tsx:71`) that is *never* reconciled against row
visibility. `visibleIds` (`App.tsx:168-181`) is derived from non-collapsed priority sections
plus expanded epics, and `bySection` is itself filter-derived — so `expandedId` can point at a
row that isn't rendered at all. Three concrete routes:

1. Expand a row, then type a `query` that filters it out.
2. Expand a row, then collapse its priority section.
3. Expand a *subtask* row (possible since [[CORE-098.14]]), then collapse the parent epic —
   `visibleIds` only pushes children when `expandedEpicIds.has(parent)` (`App.tsx:174-176`).

In all three the row is gone from the DOM (`TaskRow.tsx:38`, `EpicRow.tsx:83`,
`SubtaskRow.tsx:25` all render detail only for the row they belong to), so
`setExpandedId(null)` produces **zero visible change** while `preventDefault()` consumes the
keypress. The user presses Escape expecting the search to clear, sees nothing happen, and has
to press it twice. Classic near-miss: no error, no diagnostic, just a swallowed key.

**Fix shape (operator-chosen).** Gate the collapse branch on
`visibleIds.includes(expandedId)`. This is the PLAN line's primary phrasing; the parenthetical
alternative (reactively clearing `expandedId`/`selectedId` when they drop out of `visibleIds`)
was offered and declined. Rationale recorded for the archive: the reactive variant also resets
`selectedId` on every filter change (restarting `j`/`k` from the top) and drops expansion when
a filter is cleared, which cuts against [[CORE-098.5]]'s explicit acceptance that
"`expandedId` … `selectedId` … preserve selection and expand state" across view changes.
Under the chosen guard, clearing the filter brings the row back *still expanded* — state
preserved, keypress not stolen.

**Scope note — `selectedId` is out of scope.** The PLAN line's parenthetical mentions
"expanded/selected", but `selectedId` never participates in the Escape chain. Its one
stale-state consumer, the `j`/`k` branch, already degrades gracefully:
`visibleIds.indexOf(selectedId)` returns `-1` and the ternaries fall back to index `0` / last
(`useKeyboardNav.ts:88-96`). No swallow, no phantom. Nothing to fix.

**Best Practices Review.** Single touched responsibility — the hook owns keyboard→state
translation, and `visibleIds` is already one of its params, so the visibility test needs no new
dependency, no new prop, and no change to the effect's dep array. `visibleIds.includes(...)` mirrors
the existing `visibleIds.indexOf(selectedId)` idiom two branches down; a `Set` would be a
premature micro-optimization on a board-sized list and would introduce a shape the hook doesn't
otherwise use. No duplication introduced, no dependency direction crossed, no deferred cleanup.

**Archive skim.** `grep -l` over `.flowtron/tasknote/archive/core/*.md` for
`useKeyboardNav|visibleIds|expandedId` hit 11 notes; read the load-bearing ones:

- [[CORE-421.5]] — the *previous* fix to this exact handler: added the
  `document.querySelector('dialog[open]')` early-return at line 48. Two findings carry forward:
  (a) that guard is the chain's rung 0 and the new test must pin it; (b) jsdom 26.1.0's
  `HTMLDialogElement` is a bare stub with no native Escape-to-close, so a `dialog[open]` test
  must assert the *guarded state* rather than the dialog closing. Also confirms the value of a
  revert-and-watch-it-fail check for this handler.
- [[CORE-098.14]] — established that `expandedId` legitimately holds subtask IDs and that
  `visibleIds` gates subtask entries on the parent epic being expanded. This is route (3) above.
- [[CORE-098.5]] — the preserve-expand/select-state intent cited in the fix rationale.
- [[CORE-116]], [[CORE-324.2]] — skimmed via `.5`'s prior pass; nothing on Escape precedence.

No prior tasknote addressed the precedence chain itself, and there is no existing dedicated test
file for the hook — every current keyboard assertion runs through `App.test.tsx` (one Escape test,
line 397, the `.5` regression). That is exactly why a stale-`expandedId` Escape has never been
covered: through `App`, arranging the stale state costs a filter round-trip, so nobody did it.

**Drift check.** Task description cites `useKeyboardNav` and `visibleIds` — both current
(`viz/src/ui/useKeyboardNav.ts`, `App.tsx:168`). Root-cause hypothesis verified by read, not
recall. Cross-artifact half: re-read the `PLAN.md` line (unchanged from filing) and
`SPEC.md` §"What flowtron does NOT provide" — viz is the carved-out read-only visualizer, so a
viz-internal keyboard fix touches no SPEC contract. No drift, no superseded-claim pointer owed.

**Clarifying questions.** One asked (the two-option fork the PLAN line left open); answered
"gate the collapse branch". Explicit assumptions carried forward: `selectedId` stays untouched
per the scope note; the new test file is a `renderHook`-driven unit test rather than another
`App.test.tsx` case, per the PLAN line's word "dedicated".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Fix — `viz/src/ui/useKeyboardNav.ts:55-59`** (+4 lines: 1 condition, 3 comment).
The Escape collapse branch gained a visibility test:

```ts
if (expandedId !== null && visibleIds.includes(expandedId)) {
```

`visibleIds` was already a hook param and already in the effect's dep array, so the
change adds no dependency, no prop, and no re-subscription behavior. Pattern survey:
`.includes` mirrors the `visibleIds.indexOf(selectedId)` idiom in the `j`/`k` branch 30
lines below — same array, same linear scan, same board-sized input. A `Set` would be a
premature micro-optimization introducing a shape the hook doesn't otherwise carry.
Minimal refactor gate: nothing refactored; the fix is one condition on the line
Acceptance names.

**Test — `viz/src/ui/useKeyboardNav.test.ts`** (new, 150 LOC, 8 cases). First test to
exercise this hook directly; every prior keyboard assertion routed through
`App.test.tsx`. Shape: `renderHook` + a `makeParams` factory
(`Parameters<typeof useKeyboardNav>[0]` — the param interface isn't exported, and the
inferred type is exactly right, so no export was added just for the test) whose setters
are `vi.fn()` spies. A `pressEscape(target)` helper dispatches a cancelable `keydown` at
`document` and returns `ev.defaultPrevented`, which is the load-bearing assertion — the
bug was never about state, it was about the keypress being *consumed*.

Cases cover every rung: dialog-open short-circuit · visible-expanded collapse (asserting
the filter rung does **not** also fire) · stale-expanded fall-through via filter · stale
subtask under a collapsed epic · stale-expanded with nothing below it (must not consume)
· filter clear · search-input blur · full no-op.

`.ts` not `.tsx`: the harness needs no JSX, matching `useProjectData.test.ts`
(`useDialog.test.tsx` carries the extension because it renders a `<dialog>` wrapper).

Two carried forward from [[CORE-421.5]]'s notes: the `dialog[open]` rung is asserted via
the *guarded state* rather than the dialog closing (jsdom's `HTMLDialogElement` has no
native Escape-to-close), and the fix was revert-verified rather than assumed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Targeted:** `npm --prefix viz test -- src/ui/useKeyboardNav.test.ts` → 8/8 green.

**Revert-verified (the check that makes the test real).**
`git stash push -- viz/src/ui/useKeyboardNav.ts` reverted *only* the guard, leaving the
new test in place: **3 failed / 5 passed** — and the three failures are exactly the three
stale-`expandedId` cases (filtered-out row, collapsed-epic subtask, stale-alone), each
failing on `defaultPrevented` or on `setExpandedId` being called for an off-screen row.
The five rungs the fix does not touch stayed green, confirming the guard is narrow.
`git stash pop` restored it and the file went 8/8 again.

**Full suite:** `npm --prefix viz test` → **19 files, 291 tests passed** (283 before this
task; +8 from the new file, zero disturbed).
`npm --prefix viz run typecheck` → clean. `npm --prefix viz run lint` → clean.

**Quality assertions.** No duplication introduced — the `.includes` check reuses the
existing `visibleIds` param and mirrors the neighbouring `indexOf` idiom. No dead code.
No public-surface growth: the hook's exported signature is byte-identical, and the test
reads its param type structurally via `Parameters<>` rather than forcing an interface
export. Complexity is one conjunct on an existing condition, explained by a 3-line
comment naming all three stale routes. No code-facing documentation references this
behavior (checked `README.md`, `SPEC.md`, `docs/`), so nothing went stale.

**Visual confirmation.** Surfaced as an emphasized 👁️ **CONFIRM** ask alongside the 📦
gate. Note the change is state-machine-only — no rendered output moves; the observable
difference is that Escape on a hidden-expanded row now clears the search instead of
doing nothing.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — all 13 AI-referenced entries: no change.** `README.md` ·
`SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` ·
`codex/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` ·
`SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` ·
`claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` ·
`docs/WORKTREES.md`. None documents viz keyboard behavior — the visualizer is
carved out of the workflow contract (`SPEC.md` §"What flowtron does NOT provide"),
so a viz-internal keyboard fix has no contract surface. No superseded-claim pointer
owed: the drift check falsified nothing in the archive.

**Final Summary:**

Closed a near-miss keyboard bug in the flowtron visualizer: pressing Escape did
nothing when a previously-expanded row had scrolled out of existence, because the
handler "collapsed" a row that wasn't on screen and ate the keypress meant for
clearing the search.

- **Root cause.** `useKeyboardNav`'s Escape chain led with `if (expandedId !== null)`
  and no visibility test. `expandedId` (`App.tsx:71`) is never reconciled against
  `visibleIds` (`App.tsx:168-181`), which is filter- and collapse-derived — so three
  routes stranded it: filtering the row out, collapsing its priority section, or
  collapsing the parent epic of an expanded subtask (possible since [[CORE-098.14]]).
  In each, `setExpandedId(null)` changed nothing visible while `preventDefault()`
  consumed the key. No error, no diagnostic — the user just pressed Escape twice.
- **Fix.** `viz/src/ui/useKeyboardNav.ts:55-59` (+4 LOC) — gated the collapse branch on
  `visibleIds.includes(expandedId)`, the PLAN line's primary option. The declined
  alternative (reactively nulling `expandedId`/`selectedId` when hidden) would also
  reset `j`/`k` selection on every filter change and drop expansion when a filter
  cleared, cutting against [[CORE-098.5]]'s preserve-state acceptance. Under the guard,
  clearing the filter brings the row back still expanded.
- **Scope.** `selectedId` deliberately untouched: it never enters the Escape chain, and
  its only stale-state consumer (`j`/`k`) already falls back to index `0`/last on
  `indexOf === -1`. The PLAN parenthetical's "selected" half had nothing to fix.
- **Test.** New `viz/src/ui/useKeyboardNav.test.ts` (150 LOC, 8 cases) — the first
  direct test of this hook; all prior keyboard coverage ran through `App.test.tsx`,
  where reaching the lower Escape rungs costs a filter round-trip, which is precisely
  why this rung was never covered. Asserts `defaultPrevented` per rung, not just state.
- **Verification.** Targeted 8/8; full suite **291 passed** (from 283); typecheck and
  lint clean. Revert-verified: stashing only the guard failed exactly the 3
  stale-`expandedId` cases and left the other 5 rungs green.
- **Refactors.** None made, none deferred. The fix adds one conjunct to an existing
  condition using a param the hook already takes and already lists in its dep array.
- **Documentation.** All 13 AI-referenced docs: no change (see sweep above).
- **Maintainability.** Net positive beyond the one-line fix: the hook now has a
  dedicated test file, so the *next* change to the Escape chain — this is the second
  fix to it after [[CORE-421.5]]'s `dialog[open]` guard — has a cheap place to land
  and a full precedence chain already pinned against silent reordering.

**Archived:** 2026-08-09
