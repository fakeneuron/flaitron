---
title: viz-best-practices
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-EPIC-324]
---

# CORE-324.2 | viz-best-practices

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Audit `viz/src/` TypeScript/React code against best practices (typing strictness, hook patterns, component decomposition, test-coverage gaps, accessibility) and apply inline fixes for each high-confidence finding.

## ✅ Acceptance

- [x] `viz/src/` audited across all five scoped dimensions (typing, hooks, decomposition, test coverage, a11y); findings recorded in Discovery Notes
- [x] `eslint-plugin-react-hooks` added as a viz devDependency and wired into `viz/eslint.config.js`
- [x] `npm --prefix viz run lint` passes clean with the new plugin active (rules-of-hooks + exhaustive-deps enforced)
- [x] `npm --prefix viz run typecheck` and `npm --prefix viz test` remain green

## 🧩 Subtasks

- [x] Add `eslint-plugin-react-hooks` to `viz/package.json` devDependencies and install
- [x] Wire the plugin into `viz/eslint.config.js` (two canonical rules, not v7's full Compiler preset)
- [x] Run lint; fixed the one surfaced `exhaustive-deps` warning inline
- [x] Re-run typecheck + test to confirm no regression

## 🔗 Related

- [[CORE-EPIC-324]] — parent epic (repo-best-practices-sweep)
- [[CORE-324.1]] — discovery subtask that scoped this child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed (narrowed)
  **Rationale:** The audit dimension is valid and unaddressed (no prior task targeted a holistic viz/src best-practices pass). The code itself came back clean, so the deliverable narrows from "inline fixes across many findings" to one high-confidence tooling fix: adding the missing `eslint-plugin-react-hooks`. User confirmed this path via AskUserQuestion.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Baseline:** typecheck clean, lint clean, 190 tests / 14 files green (`viz@5.7.0`).

**Audit by dimension:**

- **Typing strictness** — `tsconfig.json` has `strict: true`. App code has zero `any` (only two test-only `as unknown` casts in `test/fixtures.ts` + `test/setup.ts`, both standard mock plumbing) and one justified non-null assertion (`parser.ts:138`, guarded by a prior `.has()` check). No finding.
- **Hook patterns** — `useProjectData`, `useProjects`, `useKeyboardNav` reviewed in full: proper cancellation guards (`cancelled` flag, `activeProjectRef`), `useRef` for latest-value reads, complete dep arrays, EventSource cleanup. Exemplary. No code finding.
- **Component decomposition** — `App.tsx` (456 LOC, mostly JSX) is a clean container; data fetching extracted to hooks (FE-024), presentational pieces split into `ui/`. No finding worth a fix.
- **Test coverage** — 190 tests. Only `projectStorage.ts` (17-line localStorage wrapper) and `tasknote-parse.ts` lack same-named test files; `tasknote-parse`'s `parseTasknote` is directly exercised by `tasknote.test.ts`. No real gap.
- **Accessibility** — all interactive elements are `<button type="button">` with `aria-expanded`/`aria-label`/focus rings; `role="group"` + `aria-pressed` on the view-mode toggle; `aria-hidden` on decorative glyphs. Strong. No finding.

**The one high-confidence finding:** `eslint.config.js` runs only `js.configs.recommended` + `tseslint.configs.recommended` — **no `eslint-plugin-react-hooks`**, the standard React lint plugin enforcing rules-of-hooks + `exhaustive-deps`. Currently zero violations, so it's a preventive guardrail.

**Resolved scoping (AskUserQuestion):**

| Question | Answer |
|---|---|
| How should CORE-324.2 land given the clean audit? | Add `eslint-plugin-react-hooks` (the proportionate best-practice fix); not react-refresh, not audit-only. |

**Archive skim:** 25 prior FE-* tasknotes touched `viz/src` (FE-019 a11y/perf, FE-024 App decomposition, FE-053/054 tests, FE-060 subtask-row a11y, FE-062 SSE). None previously added react-hooks linting — the gap is real, not a re-litigation. CORE-115 (`viz-eslint-add`) introduced the current flat config without the hooks plugin.

**Drift check:** All cited surfaces verified against current code — `eslint.config.js` flat config, `package.json` scripts/deps, `tsconfig.json strict`. No drift.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** `eslint.config.js` already composes flat-config entries via `tseslint.config(...)`. Extended that same shape — registered `react-hooks` in a `plugins:` map on the existing `src/**` block rather than spreading a preset.
- **Why not the v7 preset:** v7.1.1's `configs.flat.recommended` bundles the React-Compiler ruleset (16+ rules). Probed it against the code → 4 problems, of which 3 are React-Compiler-strict opinions flagging *correct* patterns (`set-state-in-effect` on the fetch-on-mount effect ×2; `react-hooks/refs` on the `activeProjectRef` latest-value idiom). Enabled only `rules-of-hooks: error` + `exhaustive-deps: warn` — the canonical guardrail the task scoped. Rationale captured in a config comment so a future contributor doesn't "upgrade" to the preset blindly.
- **One inline fix:** `exhaustive-deps` flagged `App.tsx` `navigateToTask` (was `[tasks]`) missing `setCollapsedSections` / `setExpandedEpicIds`. Both are raw `useState` setters surfaced through `useToggleSet`'s return tuple — stable identity, so adding them is zero-behavior and makes the dep contract explicit. Now `[tasks, setCollapsedSections, setExpandedEpicIds]`.
- **No new test files:** the change is lint tooling + a stable-setter dep tweak; existing 190 tests cover the behavior (unchanged) and the config carries no app logic to unit-test.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz run lint` → exit 0, clean (plugin resolved + active; an unregistered rule would error out).
- `npm --prefix viz run typecheck` → clean.
- `npm --prefix viz test` → 190/190 pass, 14 files (unchanged from baseline).
- **Visual confirmation N/A:** no UI/render change — lint-config + a zero-behavior dep-array edit. Nothing to view.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** no change across all 11 AI-referenced docs — none reference viz lint/eslint tooling (confirmed by grep); the plugin add is internal viz config, not cold-start surface.

**Final Summary:** Audited `viz/src/` across the five scoped best-practice dimensions; the code came back clean (strict typing, exemplary hooks, strong a11y, well-covered). The single high-confidence gap — no `eslint-plugin-react-hooks` in the flat config — is now closed: added the plugin (v7.1.1) with the two canonical rules (`rules-of-hooks: error`, `exhaustive-deps: warn`), deliberately not v7's React-Compiler preset (it errors on correct fetch-on-mount / ref-latest patterns; rationale captured in a config comment). Fixed the one surfaced `exhaustive-deps` warning in `App.tsx`'s `navigateToTask` (stable-setter deps made explicit, zero behavior change). Lint/typecheck clean, 190/190 tests green.

**Archived:** 2026-06-14
