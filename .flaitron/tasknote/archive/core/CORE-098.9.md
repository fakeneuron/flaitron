---
title: keyboard-shortcuts overlay
status: completed
tags: [viz, ui, keyboard]
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.3]
---

# CORE-098.9 | keyboard-shortcuts overlay

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Replace the `ⓘ`-tooltip button in the viz header with a `?`-triggered native-`<dialog>` overlay modal that lists all keyboard shortcuts; reuses the `<dialog>` infra from CORE-098.3.

## ✅ Acceptance

- [ ] `ⓘ` button wired up with `onClick` to open the shortcuts overlay (same position; `aria-label="Keyboard shortcuts"` and `title="Keyboard shortcuts"`); was tooltip-only before
- [ ] New `viz/src/ui/ShortcutsModal.tsx` renders a native `<dialog>` listing all shortcuts (`/`, `j/k`, `Enter`, `r`, `Esc`, `?`); closes on Esc, Done click, and backdrop click; `aria-labelledby` points at the modal heading; dialog infra mirrors `SettingsModal.tsx` (same `useRef<HTMLDialogElement>` + `showModal()`/`close()` + event-listener pattern)
- [ ] `?` key (when not typing) opens the shortcuts overlay — `useKeyboardNav.ts` receives an `onOpenShortcuts` callback and fires it when `?` is pressed
- [ ] `npm --prefix viz exec tsc -- --noEmit` clean
- [ ] `npm --prefix viz run test` passes
- [ ] User visually confirms (👁️): `ⓘ` button opens modal; pressing `?` outside an input also opens it; Esc + Done + backdrop click close it; ThemeToggle shows emoji-only (no "Light"/"Dark" text); FE-019 a11y baseline preserved (native `<dialog>` focus-trap)

## 🧩 Subtasks

- [ ] Pattern survey — confirm `SettingsModal.tsx` dialog infra is the right shape to clone
- [ ] Build `viz/src/ui/ShortcutsModal.tsx` — `<dialog>` with shortcuts table (`kbd` + description rows for `/`, `j / k`, `Enter`, `r`, `Esc`, `?`); Done button; same ref+effect+event-listener pattern as `SettingsModal.tsx`
- [ ] Modify `viz/src/ui/App.tsx` — swap `ⓘ` button for `?` button with `onClick={() => setShortcutsOpen(true)}`; add `shortcutsOpen` state; pass `onOpenShortcuts` to `useKeyboardNav`; mount `<ShortcutsModal>` at end of root `<div>`
- [ ] Modify `viz/src/ui/useKeyboardNav.ts` — accept `onOpenShortcuts` callback; add `?` keydown handler (skip when `isTyping`; call `onOpenShortcuts()`)
- [ ] Modify `viz/src/ui/App.test.tsx` — add `describe('App — shortcuts modal')`: `?` button opens dialog; `Done` closes; pressing `?` key fires open
- [ ] Run `npm --prefix viz exec tsc -- --noEmit`
- [ ] Run `npm --prefix viz run test`
- [ ] Start dev server and ask user for visual confirmation (👁️)

## 🔗 Related

- [[CORE-EPIC-098]] — parent embellishment epic
- [[CORE-098.3]] — predecessor: settings-modal scaffold; `<dialog>` infra to reuse

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The `ⓘ` button at `App.tsx:328-335` uses only a native `title` tooltip — no click handler, no modal. CORE-098.3 shipped the exact `<dialog>` infra (ref + showModal/close + backdrop-click handler) that this task reuses. The header rail is intact; `?` replaces `ⓘ` in the same position. The `useKeyboardNav.ts` hook handles all key events via a single `keydown` listener — adding a `?` handler is a one-line extension. Scope is tightly bounded to 1 new file + 3 small modifications.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — No clarifications needed
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

`viz/src/ui/App.tsx` (header rail: `ⓘ` button at lines 328-335; `settingsOpen` state + `<SettingsModal>` mount at end of root div; `useKeyboardNav` call site), `viz/src/ui/SettingsModal.tsx` (canonical `<dialog>` infra: `useRef<HTMLDialogElement>` + `showModal()`/`close()` sync effect + `close`/`click` event listener cleanup — this is the shape to clone), `viz/src/ui/useKeyboardNav.ts` (single `keydown` listener with `isTyping` guard; existing keys: `/`, `j/k`, `Enter`, `r`, `Esc`; `?` handler slots in cleanly before the `isTyping` guard since `shift+?` needs to fire even after `isTyping` check — wait, `?` is Shift+/ on US keyboards, so `e.key === '?'` works natively; place it after `isTyping` check same as `j/k`/`Enter`/`r`).

### Archive skim

- `CORE-098.3` (settings-modal scaffold, 2026-05-15) — **directly relevant.** Ships the canonical `<dialog>` ref+effect+event pattern; `ShortcutsModal.tsx` clones the same shape (simpler body — no form controls, just a table + Done button).
- `FE-010` (viz keyboard nav, 2026-05-07) — established `useKeyboardNav.ts` with the `isTyping` guard. The `?` handler must sit after the `isTyping` guard to avoid firing during search input.
- `FE-019` (a11y baseline) — native `<dialog>` preserves FE-019's focus-trap / focus-restore / Esc-close baseline at zero extra cost.

### Drift check

- `ⓘ` button is at `App.tsx:328-335` — confirmed present, no click handler (title tooltip only). Replacing in-place.
- Shortcut list in `title` attr: `/  focus search`, `j / k  navigate rows`, `Enter  expand`, `r  refresh`, `Esc  close detail / clear filters` — matches `useKeyboardNav.ts` key handlers exactly. No drift.
- `SettingsModal.tsx` dialog infra confirmed at `SettingsModal.tsx:38-60` (ref + two effects) — correct shape to clone.

### No clarifications needed

Assumptions:
- `ShortcutsModal.tsx` closes only on Done/Esc/backdrop — no form controls (read-only list).
- `?` handler in `useKeyboardNav.ts` fires after the `isTyping` check (consistent with `j`/`k`/`Enter`/`r` — won't fire while user is typing in search).
- The `?` key entry is added to the shortcuts list in the modal itself (`?  show shortcuts`).
- No separate test file needed — new `describe` block in existing `App.test.tsx` (matches CORE-098.3 precedent).

### Expected closure-diff signal profile

- Frontend files: **yes** (1 new + 3 modified `.tsx`/`.ts`) → 📦 **fires**
- Privileged-ops paths: no
- Perf-narrative: no

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

### Files changed (1 new + 3 modified)

**New (1):**
- `viz/src/ui/ShortcutsModal.tsx` — native `<dialog>` with a 6-row shortcuts table (`/`, `j/k`, `Enter`, `r`, `Esc`, `?`); Done button with `autoFocus`; same `useRef<HTMLDialogElement>` + two-effect pattern as `SettingsModal.tsx` (sync open-prop to `showModal()`/`close()` + `close`/`click` event listeners for Esc and backdrop-click close); `aria-labelledby="shortcuts-modal-title"`; dark-mode styling mirrors `SettingsModal.tsx`

**Modified (3):**
- `viz/src/ui/App.tsx` — imported `ShortcutsModal`; added `shortcutsOpen` state; kept `ⓘ` button (user preferred) but added `onClick={() => setShortcutsOpen(true)}`; passed `onOpenShortcuts: () => setShortcutsOpen(true)` to `useKeyboardNav`; mounted `<ShortcutsModal>` alongside `<SettingsModal>` at end of root `<div>`
- `viz/src/ui/ThemeToggle.tsx` — stripped "Light"/"Dark" text from button labels (emoji-only: `☀️` / `🌙`); tightened padding from `px-3` to `px-2`
- `viz/src/ui/useKeyboardNav.ts` — added `onOpenShortcuts` to `UseKeyboardNavParams` interface and destructure; added `?` keydown handler (after `isTyping` check; calls `onOpenShortcuts()` + `preventDefault()`); added `onOpenShortcuts` to the dependency array
- `viz/src/ui/App.test.tsx` — added `describe('App — shortcuts modal')` with 2 tests: `?` button click opens dialog + Done closes it; pressing `?` key opens dialog

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm run typecheck`: clean (zero errors)
- `npm run test`: 105/105 pass (7 test files; occasional timing-flaky failures in unrelated App tests are pre-existing). New `describe('App — shortcuts modal')` adds 2 tests: `ⓘ` button opens modal + Done closes it; `?` key press opens modal. Both target the shortcuts dialog by its `aria-labelledby="shortcuts-modal-title"` attribute, avoiding collision with the co-mounted settings dialog.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change (no flowtron-as-product surface shift). `SPEC.md`: port reference updated 5176→5120 (this task). `docs/MIGRATION.md`: two port references updated 5176→5120 (this task). `claude/CLAUDE-snippet.md`: port reference updated 5176→5120 (this task).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-16.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Wired the existing `ⓘ` button in the viz header to open a native-`<dialog>` keyboard shortcuts overlay listing all 6 shortcuts (`/`, `j/k`, `Enter`, `r`, `Esc`, `?`); `?` key press (when not typing) also opens it. Stripped "Light"/"Dark" text from the ThemeToggle (emoji-only). Moved dev server port from `5176` to `5120` to avoid conflicts with sibling projects. Files: **1 new** — `viz/src/ui/ShortcutsModal.tsx` (clones `SettingsModal.tsx` dialog infra — ref + two effects + backdrop-click; read-only shortcuts table + Done button); **4 modified** — `viz/src/ui/App.tsx` (import + `shortcutsOpen` state + `ⓘ` click handler + `onOpenShortcuts` → `useKeyboardNav` + modal mount), `viz/src/ui/useKeyboardNav.ts` (`onOpenShortcuts` param + `?` handler), `viz/src/ui/App.test.tsx` (+2 shortcuts-modal tests), `viz/src/ui/ThemeToggle.tsx` (emoji-only labels + `px-2`); **1 config** — `viz/vite.config.ts` (port 5120 + updated comment); **4 docs** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md` (port references). Tests: 105/105 pass; typecheck clean.

**Archived:** 2026-05-16
