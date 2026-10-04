---
title: viz header logo + version
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: []
---

# CORE-197 | viz header logo + version

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add the flowtron logo to the viz header and the flowtron version to the stats subline so adopters can see which flowtron version a project uses at a glance.

## ✅ Acceptance

- [ ] Flowtron logo (`LOGO.png`) appears in the viz header alongside the h1
- [ ] Flowtron version (`FLOWTRON_VERSION` constant) appears in the stats subline
- [ ] Tests pass (no regressions to h1 text-content assertions)
- [ ] Visual confirmation from user

## 🧩 Subtasks

- [x] Add `export const FLOWTRON_VERSION = 'v4.0.0'` to `viz/src/ui/constants.ts`
- [x] Import `FLOWTRON_VERSION` in `App.tsx` and add logo `<img src="/LOGO.png">` inside h1
- [x] Append `· flowtron {FLOWTRON_VERSION}` to the stats `<p>` in `App.tsx`
- [x] Run tests + lint/typecheck on changed files

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Clear, well-scoped UI task. Header h1 at App.tsx:273, stats `<p>` at App.tsx:276–279. Logo asset confirmed at `viz/public/LOGO.png`.

- [x] Read relevant source files
- [x] **Archive skim** — no prior core tasknotes touched App.tsx header/stats. No load-bearing findings.
- [x] **Drift check** — h1 and stats `<p>` exactly match task description. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Logo source: `viz/public/LOGO.png` (user-supplied 228KB PNG)
- Version source: `FLOWTRON_VERSION = 'v4.0.0'` added to `constants.ts`; bumped as part of each `/ft-release`
- Logo placement: `<img src="/LOGO.png" alt="" aria-hidden="true" className="h-6 w-auto" />` inside `<h1 className="flex items-center gap-2 ...">` — img with empty alt so existing `toHaveTextContent('Flowtron — fintown')` assertions still pass
- Version placement: `{' · flowtron '}{FLOWTRON_VERSION}` appended as a sibling text node at the end of the stats `<p>`, always visible regardless of filter state
- No stats text assertions in App.test.tsx — no test changes required

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [ ] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

163/163 tests pass. Lint clean. Typecheck clean. h1 `toHaveTextContent` assertions unaffected (img alt is empty).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 AI-referenced docs: no change (task only touched viz/ UI files)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added `LOGO.png` to the viz header h1 and a `FLOWTRON_VERSION = 'v4.0.0'` constant (constants.ts) appended to the stats subline. Updated `index.html` favicon to `/LOGO.png`. 163 tests pass, lint/typecheck clean, visual confirmed.

**Archived:** 2026-05-25
