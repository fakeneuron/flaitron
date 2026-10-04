---
title: Modal-gated keyboard nav
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-421]
---

# CORE-421.5 | Modal-gated keyboard nav

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-421]]

## 🎯 Goal

Early-return in useKeyboardNav while a `dialog[open]` exists so Escape doesn't close the Settings modal and wipe search/filters in the same keypress.

## ✅ Acceptance

- [x] `useKeyboardNav`'s document keydown handler early-returns (no state mutation) whenever `document.querySelector('dialog[open]')` is non-null, so it never races the native `<dialog>` Escape-to-close behavior
- [x] Regression test: with the Settings modal open and a non-empty search query, pressing Escape leaves the query state untouched (jsdom's `<dialog>` is a bare stub with no native Escape-to-close wiring — see Testing Notes — so the test asserts the guarded state directly rather than the modal closing)
- [x] Existing `App.test.tsx` keyboard-nav and dialog tests still pass

## 🧩 Subtasks

- [x] Add a `dialog[open]` guard at the top of the keydown handler in `viz/src/ui/useKeyboardNav.ts`, before the existing early-return checks (`metaKey`/`ctrlKey`/`altKey`)
- [x] Add a regression test to `viz/src/ui/App.test.tsx` (near the existing gear/`?`-dialog tests around line 381/799) covering Escape-while-modal-open leaving search/filters intact
- [x] Run the targeted vitest suite for `viz/src/ui`
- [x] Run lint/type-check on changed files

## 🔗 Related

- [[CORE-EPIC-421]] — parent epic (viz-robustness)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task description matches current code exactly; the bug is live and the fix is a small, well-scoped guard clause plus a test.

- [x] Read relevant source files — `viz/src/ui/useKeyboardNav.ts`, `viz/src/ui/App.tsx`, `viz/src/ui/SettingsModal.tsx`, `viz/src/ui/ShortcutsModal.tsx`, `viz/src/ui/useDialog.ts`

- [x] **Best Practices Review** — the fix is a single guard-clause addition at the top of the existing keydown handler in `useKeyboardNav.ts`; no new abstraction needed, no duplication introduced, dependency direction unchanged (hook still owns only nav/search state, doesn't reach into modal internals — it just checks the DOM for an open `<dialog>`)

- [x] **Archive skim** — `grep -l` across `.flowtron/tasknote/archive/core/*.md` for `useKeyboardNav|useDialog|SettingsModal|ShortcutsModal` hit the CORE-098.* subtasks (original keyboard-nav/dialog build epic) plus CORE-116 and CORE-324.2. Read CORE-116 and CORE-324.2 directly (grepped for `Escape`/`dialog[open]`/`modal`); no load-bearing prior findings on this specific Escape-vs-modal race — the CORE-098.* hits are the original feature build, not a prior fix to this bug.

- [x] **Drift check** — confirmed by direct read: `useKeyboardNav.ts`'s Escape branch (lines 54-67) has no dialog-open guard; `SettingsModal.tsx`/`ShortcutsModal.tsx` both use `useDialog` → native `<dialog>` + `showModal()`, so the browser's native Escape-to-close ("cancel" event) fires independently of and concurrently with the document-level `keydown` listener the hook installs — the two aren't coordinated, confirming the described race. No SPEC/PLAN divergence.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: guard on `document.querySelector('dialog[open]')` (matches the task description's own phrasing) rather than threading an `isAnyModalOpen` prop through `useKeyboardNav`'s params — keeps the hook decoupled from which specific modals exist, and both `SettingsModal`/`ShortcutsModal` already render native `<dialog>` elements via `useDialog`, so the query is exhaustive today and stays exhaustive for future modals built the same way.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Root cause: `useKeyboardNav`'s document-level `keydown` handler (`viz/src/ui/useKeyboardNav.ts:47-119`) runs unconditionally on every keydown, including while a `<dialog>` is open via `showModal()`. Native `<dialog>` elements already close themselves on Escape (fires a `cancel`/`close` event, handled by `useDialog.ts:16`), but that native behavior doesn't stop the same keydown from also reaching the document-level listener. So today: Settings modal open + search query non-empty + Escape → modal closes (native) **and** the hook's Escape branch (line 57) sees `query` is non-empty and clears `query`/`statusFilter` in the same keypress. Fix: early-return at the very top of the handler (before the existing `metaKey`/`ctrlKey`/`altKey` guard) when `document.querySelector('dialog[open]')` is non-null — while a modal is open, the modal owns keyboard input and the underlying app's nav/search state should be untouched.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing guard-clause style already used at the top of the same handler (`e.metaKey || e.ctrlKey || e.altKey`); no new abstraction, single-responsibility of the hook (nav/search state) unchanged

- [x] **Minimal refactor gate** — N/A, no refactor needed; one guard clause added

- [x] Implemented the minimal solution — added `if (document.querySelector('dialog[open]')) return;` as the first line of the keydown handler in `viz/src/ui/useKeyboardNav.ts`

- [x] Updated/added tests for non-trivial behavior — added `App.test.tsx` regression test: search query populated, Settings modal opened, Escape pressed → modal closes, query untouched

**Implementation Notes:**

`viz/src/ui/useKeyboardNav.ts:47-48` — one-line guard added before the existing `metaKey`/`ctrlKey`/`altKey` early return, so it applies uniformly to every branch of the handler (Escape, `/`, `?`, `j`/`k`, Enter, `r`), not just Escape — any global shortcut is now inert while a native `<dialog>` is open, matching the intent that the modal owns keyboard input while open. `viz/src/ui/App.test.tsx` — added one test in the Settings-modal describe block, reusing the existing `plan`/`active` fixtures and the `dialog`/`Open settings` button query pattern from the adjacent "gear opens the dialog" test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test -- src/ui/App.test.tsx src/ui/useDialog.test.tsx src/ui/ProjectSelector.test.tsx` → 52/52 passed

- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` clean; `npm --prefix viz run typecheck` clean

- [x] **Quality assertions** — one-line guard clause, no duplication, no dead code, no public-surface growth, no stale docs to update

- [ ] N/A — no visually-observable UI change (the fix is a keyboard-event guard, not a render change); covered instead by the automated regression test above

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Initial test draft asserted `dialog.open` became `false` after Escape (mirroring real-browser native Escape-to-close). It failed: `viz/node_modules/jsdom/lib/jsdom/living/nodes/HTMLDialogElement-impl.js` is a bare stub (`class HTMLDialogElementImpl extends HTMLElementImpl {}`) — jsdom 26.1.0 implements `<dialog>`'s `open` property/`showModal()`/`close()` but not the native Escape-triggers-`cancel`/`close` browser behavior. Rewrote the test to assert the actually-guarded state (search query untouched) rather than the modal closing. Verified the test is a real regression check: `git stash push -- src/ui/useKeyboardNav.ts` (reverting only the fix) reproduced the failure (`Expected the element to have value: CORE-100, Received: ""`), then `git stash pop` restored the fix and the suite went green again (52/52).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. This is a self-contained `viz/src/ui` frontend bug fix; it touches no workflow contract, adoption procedure, agent-compat surface, or capability doc.

- [x] Closed — all three Acceptance criteria ticked; YAML `status:` flipped to `completed` below; PLAN.md line to be flipped to stub form and tasknote moved to archive in the same commit

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Fixed a keyboard-nav / modal race in the flowtron visualizer: `useKeyboardNav`'s document-level `keydown` handler ran unconditionally even while a native `<dialog>` (Settings or Shortcuts) was open via `showModal()`, so the browser's native Escape-to-close raced the app's own Escape handling — Escape while Settings was open, with an active search query, closed the modal *and* cleared the search query/status filters in the same keypress.

- **Fix:** `viz/src/ui/useKeyboardNav.ts:48` — added `if (document.querySelector('dialog[open]')) return;` as the first line of the keydown handler, ahead of the existing `metaKey`/`ctrlKey`/`altKey` guard. Applies uniformly to every shortcut branch (Escape, `/`, `?`, `j`/`k`, Enter, `r`), not just Escape — while any modal is open, the app-level shortcuts are inert.
- **Test:** `viz/src/ui/App.test.tsx` — added "Escape while the settings modal is open does not clear the search query" in the Settings-modal describe block. Verified as a genuine regression check by reverting the fix (`git stash`) and confirming the test fails, then restoring it and confirming green.
- **Verification:** `npm --prefix viz run test -- src/ui/App.test.tsx src/ui/useDialog.test.tsx src/ui/ProjectSelector.test.tsx` → 52/52 passed. `npm --prefix viz run lint` clean. `npm --prefix viz run typecheck` clean.
- **Refactors:** none — single guard-clause addition, no surrounding cleanup.
- **Documentation:** no drift (see doc-drift sweep above).
- **Maintainability:** the guard is a single, self-explanatory line reusing the handler's existing early-return style; no new abstraction or coupling introduced. Discovered along the way (not acted on, out of scope): jsdom 26.1.0's `HTMLDialogElement` is a bare stub with no native Escape-to-close wiring, which only affects test-authoring for `<dialog>`-based Escape behavior, not production code.

**Archived:** 2026-08-09
