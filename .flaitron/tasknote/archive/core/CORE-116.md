---
title: App-tsx-data-loading-hook
status: completed
tags: []
created: 2026-05-19
due:
related-tasks: [FE-007, FE-024]
---

# CORE-116 | App-tsx-data-loading-hook

[← PLAN.md](../../../PLAN.md) · ✅ Completed 2026-05-19 · 🔗 [[FE-007]] · 🔗 [[FE-024]]

## 🎯 Goal

Extract data-loading concerns from `viz/src/ui/App.tsx` into a `useProjectData(activeProject)` hook, leaving App.tsx focused on render/state composition.

## ✅ Acceptance

- [ ] `viz/src/ui/useProjects.ts` exports `useProjects()` returning `{projects, activeProject, setActiveProject, error}`; handles initial fetch, localStorage read/write, error capture
- [ ] `viz/src/ui/useProjectData.ts` exports `useProjectData(activeProject)` returning `{tasks, tasknotesById, loading, error, refresh, reset}`; subsumes the `load` callback, active-project-change trigger, `refresh`, and SSE wiring
- [ ] `viz/src/ui/App.tsx` no longer holds `projects` / `activeProject` / `tasks` / `tasknotesById` / `loading` / `error` / `activeProjectRef` state; LOC drops from 504 → ~440-450 (predecessor estimate-shape, not enforced)
- [ ] Combined error UI shows `projectsError ?? dataError`; behavior of the `{error && (...)}` banner unchanged
- [ ] `handleSelectProject` calls the hook's `reset()` before `setActiveProject(name)` to preserve eager-clear ordering (skeleton + empty rows on switch click, not a flash of stale data with new project name)
- [ ] All 73 existing `App.test.tsx` tests pass; `tsc --noEmit` clean; `npm run lint` clean on changed files
- [ ] No behavior change: project switching, /api/archive 500 mid-switch, SSE refresh, per-project prefs reload, localStorage active-project persistence all work identically

## 🧩 Subtasks

- [ ] Create `viz/src/ui/useProjects.ts` (project-list fetch + activeProject state + localStorage persistence; exports `useProjects()` returning `{projects, activeProject, setActiveProject, error}`)
- [ ] Create `viz/src/ui/useProjectData.ts` (load callback + activeProject-change trigger effect + refresh + SSE wiring + reset; exports `useProjectData(activeProject)` returning `{tasks, tasknotesById, loading, error, refresh, reset}`)
- [ ] Update `viz/src/ui/App.tsx`:
  - Remove the 7 `useState`/`useRef` declarations now owned by hooks (`projects`, `activeProject`, `tasks`, `tasknotesById`, `loading`, `error`, `activeProjectRef`), the inline `load` `useCallback`, the project-init effect, the `load(activeProject)` call inside the active-project effect, the `refresh` `useCallback`, and the SSE effect
  - Add `useProjects()` + `useProjectData(activeProject)` calls
  - Combine errors at render: `const errorMessage = projectsError ?? dataError;`
  - Keep the project-scoped prefs effect (now calls only `setVisibilityPrefs(readVisibilityPrefs(activeProject))` — `writeStoredProject` moves into `useProjects.setActiveProject`)
  - Simplify `handleSelectProject` to drop `setLoading(true)` / `setTasks([])` / `setTasknotesById(new Map())` and instead call `reset()` before `setActiveProject(name)`
  - Pass `refresh` to `useKeyboardNav` as `load` (unchanged from today)
- [ ] Run `npm --prefix viz test`, `npm --prefix viz run build` (tsc + vite), `npm --prefix viz run lint` — all green
- [ ] 👁️ Visual confirmation: project switch (skeleton + reload), SSE auto-refresh on file change, /api/projects failure surfaces error, per-project prefs reload still works

## 🔗 Related

- [[FE-007]] — App.tsx render-tree decomposition (predecessor)
- [[FE-024]] — App.tsx further decomposition pass (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** App.tsx is 504 LOC (task cited 498 — within churn) with 17 `useState`/`useRef` declarations and 7 of them plus three effects + two callbacks form a tight, self-contained data-loading concern. Predecessors [[FE-007]] (902 → 319, render-tree extraction) and [[FE-024]] (466 → 423, localStorage + `useToggleSet` extraction) explicitly left data-loading as the remaining concentration. The extraction targets named in the task description (`load`, project-init effect, SSE wiring) are all present and unchanged in shape; the named pattern (`useKeyboardNav`/`useToggleSet`) is an exact fit. No interdependencies with open follow-ups.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source-file map (current state — `viz/src/ui/App.tsx`, 504 LOC):**

| Surface | Lines (today) | Lines (task cite) | Notes |
|---|---|---|---|
| Data-loading state declarations | L46-51, L65, L67-68 | n/a | `projects`, `activeProject`, `tasks`, `tasknotesById`, `loading`, `error`, `highlightTimer`, `activeProjectRef` (last two stay in App; `highlightTimer` belongs to UI nav) |
| `load` `useCallback` | L70-95 | L72-97 | -2 line shift; same body |
| Project-init `useEffect` | L97-121 | L99-123 | -2 line shift; same body. Sets `projects`, initial `activeProject`, calls `setLoading(false)` on no-projects branch |
| Active-project change `useEffect` | L123-128 | (not cited) | **Crosses concerns**: `writeStoredProject` + `setVisibilityPrefs(readVisibilityPrefs(activeProject))` + `void load(activeProject)`. Data-load piece moves into `useProjectData`; `writeStoredProject` moves into `useProjects.setActiveProject`; visibility-prefs read stays in App as its own effect |
| `refresh` `useCallback` | L143-146 | (not cited but in scope) | Depends on `activeProjectRef`; consumed by SSE effect + `useKeyboardNav.load` prop |
| SSE wiring `useEffect` | L148-152 | L150-154 | -2 line shift; same body |
| `handleSelectProject` | L254-269 | (not cited) | Eager-clears `tasks`/`tasknotesById`/`loading` before `setActiveProject` to avoid stale-data flash. After extraction, calls hook's `reset()` instead |

**Drift summary:** -2 line shift on all three cited blocks (file grew by ~6 lines from FE-039/FE-044/CORE-115 lint pass since the task line was written; logic unchanged). Non-blocking.

**Archive skim (`grep -l "App.tsx"`):**

- [[FE-007]] — initial component extraction (App.tsx 902 → 319). Set the precedent for "App.tsx as composition layer." No data-loading touch.
- [[FE-024]] — `useToggleSet` + `projectStorage.ts` extraction (App.tsx 466 → 423). Established the **two patterns this task continues**: (1) `viz/src/projectStorage.ts` sibling module for the localStorage helpers (already in use here), (2) custom hooks in `viz/src/ui/use*.ts` with named exports. Also established the "no per-hook unit test; integration coverage via App.test.tsx" precedent for refactors of this shape.
- [[FE-018]] — viz-code-token-audit that surfaced FE-024 + FE-021/22/23. Generalised the "App.tsx ought to keep shrinking" framing CORE-116 inherits.
- [[FE-029]] / [[FE-030]] — viz-archive cold-start 500 + stale-state-on-failure (data-load error paths). Defined the `setError`/`setLoading(false)` semantics in the `load` `catch`/`finally` blocks that move into `useProjectData` verbatim.
- [[FE-028]] — viz-archive-cache. Lives in `viz/src/archiveCache.ts` and is invoked transitively by the `/api/archive` route on the server; client-side `fetch('/api/archive')` doesn't need to know about it. Out of scope.
- **No prior tasknote at `viz/src/ui/useProjects.ts` or `viz/src/ui/useProjectData.ts`** (greenfield filenames).
- [[CORE-118]] (just-merged) extracted `originGuard`/`devApi` from `vite.config` and **added** dedicated unit tests. User opted for the FE-024 precedent (integration-only) for this task — both precedents are valid; the call here is shape-matching FE-024 since the hooks are render-tied and integration-coverable.

**Design decisions confirmed (with user via AskUserQuestion):**

1. **Two hooks**, not one: `useProjects()` returning `{projects, activeProject, setActiveProject, error}` + `useProjectData(activeProject)` returning `{tasks, tasknotesById, loading, error, refresh, reset}`. Matches the literal PLAN signature `useProjectData(activeProject)` and gives clean independent boundaries.
2. **Integration-only tests** — no new `useProjectData.test.ts(x)` / `useProjects.test.ts(x)`. Existing 73 App.test.tsx tests (project switching, /api/archive 500 mid-switch, prefs reload on switch, localStorage persistence) cover the contract; sibling pattern (`useKeyboardNav` / `useToggleSet`) has no per-hook test. Matches FE-024 precedent.

**Composition shape (App.tsx after extraction):**

```tsx
const { projects, activeProject, setActiveProject, error: projectsError } = useProjects();
const { tasks, tasknotesById, loading, error: dataError, refresh, reset } =
  useProjectData(activeProject);
const errorMessage = projectsError ?? dataError;

// Project-scoped visibility prefs (stays in App — not data-loading)
useEffect(() => {
  if (!activeProject) return;
  setVisibilityPrefs(readVisibilityPrefs(activeProject));
}, [activeProject]);
```

**`handleSelectProject` (after extraction):**

```tsx
const handleSelectProject = (name: string) => {
  if (name === activeProject) return;
  // UI resets (caller-owned state)
  setQuery('');
  setStatusFilter(new Set());
  setExpandedId(null);
  setExpandedEpicIds(new Set());
  setSelectedId(null);
  setCollapsedSections(new Set(['Completed']));
  if (highlightTimer.current) clearTimeout(highlightTimer.current);
  setHighlightId(null);
  window.scrollTo({ top: 0, behavior: 'auto' });
  // Data reset (hook-owned state) — keeps eager-clear ordering
  reset();
  setActiveProject(name);
};
```

The `reset()` call is the **non-obvious bit**: without it, the hook's activeProject-change effect would only clear stale data after React commits the new activeProject, producing a one-frame flash where old rows render under the new project name. `reset()` flushes the hook's data state in the same batched render as the caller's UI resets, preserving today's behavior verbatim.

**Out of scope (explicit):**

- App.test.tsx changes — tests exercise rendered behavior, not the hook surface. Stays as-is.
- New `useProjectData.test.tsx` / `useProjects.test.tsx` — per user decision (integration-only).
- Decomposing the JSX rendering blocks (header / main / modals) further — that was FE-007 territory; not in CORE-116 scope.
- Touching `viz/src/archiveCache.ts` or any server-side concern — server-side caching is invisible to the client.
- Renaming or restructuring the `viz/src/ui/use*` directory — keep the flat layout (matches `useKeyboardNav.ts`, `useToggleSet.ts`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:**

- `viz/src/ui/useKeyboardNav.ts` — named-export custom hook taking a prop bag, side-effect only (no return value). `useProjectData` mirrors the side-effect shape (manages effects internally) but additionally returns a state-bag.
- `viz/src/ui/useToggleSet.ts` — named-export custom hook returning a tuple `[set, toggle, setSet] as const`. `useProjects` and `useProjectData` mirror the "owns state + exposes setters/actions" shape; the return type is an object (named fields) rather than a positional tuple because both hooks expose 4-6 fields and named access reads better than positional destructuring at the call site.
- No new abstractions introduced — the hooks slot into the existing `viz/src/ui/use*.ts` convention with no rename or relocation.

**Files created:**

- `viz/src/ui/useProjects.ts` (46 LOC) — fetches `/api/projects` on mount, sets `projects` + initial `activeProject` from localStorage, exposes `setActiveProject` that persists via `writeStoredProject`. Exposes `initialLoading` (true while the projects fetch is in flight; flips to false in `finally`) so the App composer can keep the skeleton visible across the useProjects→useProjectData transition. Cancelled-mount guard via the `cancelled` flag is preserved verbatim from the original effect.
- `viz/src/ui/useProjectData.ts` (70 LOC) — owns `tasks`/`tasknotesById`/`loading`/`error`. The `load` callback, active-project-change effect, `refresh` callback, and SSE wiring move in verbatim. Adds a `reset()` action for the caller to flush stale data + restore loading=true in the same batched render as a project switch (preserves the no-stale-flash invariant).

**Files changed:**

- `viz/src/ui/App.tsx` (504 → 446 LOC, **-58**): removed 7 state declarations + activeProjectRef + the inline `load` callback + the project-init effect + the SSE effect + the `refresh` callback + the `load(activeProject)` call inside the active-project change effect. Added two hook calls + the loading/error composition. `handleSelectProject` simplified: dropped `setLoading(true)` / `setTasks([])` / `setTasknotesById(new Map())`, now calls `reset()` before `setActiveProject(name)`. Project-scoped prefs effect now only reads `readVisibilityPrefs` (`writeStoredProject` moved into `useProjects.setActiveProject`). Imports trimmed: dropped `parsePlan`, `readStoredProject`, `writeStoredProject`, `type Tasknote`.

**Loading composition (non-obvious):**

The App-level `const loading = initialLoading || (activeProject !== null && dataLoading);` guards against a one-frame flash of the empty state between (a) `useProjects` resolving and setting activeProject, and (b) `useProjectData`'s effect re-firing to call `load(activeProject)`. Without the `activeProject !== null` clause, the no-projects case would render a permanent skeleton (because `useProjectData`'s `dataLoading` defaults to true and never settles when activeProject stays null). The two clauses together correctly model:

- Initial mount: `initialLoading=true` → loading=true (skeleton).
- useProjects resolves with projects: `initialLoading=false`, `activeProject='foo'`, `dataLoading=true` (unchanged) → loading=true (skeleton stays).
- useProjectData's load() finishes: `dataLoading=false` → loading=false (data shown).
- useProjects resolves with no projects OR errors: `initialLoading=false`, `activeProject=null` → second clause false → loading=false (empty state or error banner).

**Behavioral checks (verified via dev-server smoke run on :5120):**

- Page load: header `Flowtron — flowtron`, 177 tasks · 1 in progress, 8 projects in selector, no console errors. ✓
- Project switch flowtron→fintown: header flips to `Flowtron — fintown`, count drops to `116 tasks · 1 in progress · 4 starters`, localStorage `flowtron-viz-active-project` writes `fintown`, search resets to empty, no console errors. ✓ (Reset back to flowtron after smoke check.)
- The in-flight CORE-116 row renders with phase-2 indicator + 🟢 in-progress chip + 🧠 opus model chip — confirms `useProjectData` reads the active `_project/tasknote/CORE-116.md` correctly through the hook path.

**Tests:** No new unit tests for the hooks (per Phase 1 decision — integration-only via App.test.tsx). All 154 existing tests pass unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz test` — **10 files, 154 tests passed** (App.test.tsx integration: project switching, /api/archive 500 mid-switch, prefs reload on switch, localStorage persistence all green).
- `npm --prefix viz run build` (tsc --noEmit + vite build) — **clean**, 314 modules, 188kB bundle, no warnings.
- `npm --prefix viz run lint` — **clean** (one transient `Tasknote` unused-import error was fixed in the same pass: type-only import dropped after `tasknotesById` state moved into the hook).
- Playwright smoke run (existing dev server on :5120, hot-reloaded via Vite HMR): page renders end-to-end, project switch works, localStorage persists, zero console errors/warnings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep results:**

| Doc | Verdict |
|---|---|
| `README.md` | no change — public-facing repo overview, no `viz/` internals |
| `SPEC.md` | no change — workflow contract, no React-layer references |
| `docs/MIGRATION.md` | no change — adoption procedures, no `viz/` internals |
| `claude/CLAUDE-snippet.md` | no change — adopter snippet, no `viz/` internals |
| `docs/CONVENTIONS.md` | no change — commits/versioning/formatting conventions, no `viz/` internals |
| `CONTRIBUTING.md` | no change — solo-maintenance model, no `viz/` internals |

Grep across all six AI-referenced docs for `App.tsx`, `useProjectData`, `useProjects` returned zero hits — confirms the refactor is invisible to the cold-start AI surface.

**Final Summary:**

Extracted data-loading concerns from `viz/src/ui/App.tsx` into two new custom hooks, completing the App.tsx decomposition arc started by [[FE-007]] (902 → 319, render-tree split) and continued by [[FE-024]] (466 → 423, localStorage helpers + `useToggleSet`). `useProjects()` owns the `/api/projects` fetch, the initial-project resolution from localStorage, and the `setActiveProject` persistence helper. `useProjectData(activeProject)` owns the `load` callback, the active-project-change trigger, the `refresh` callback, the SSE wiring, and a new `reset()` action that flushes stale data in the same batched render as a project switch (preserves the no-stale-flash invariant). App.tsx 504 → 446 LOC (-58); composition glues both hooks through an OR-combined `loading` and a `??`-combined error. All 154 existing tests, tsc, vite build, and ESLint pass; visual confirmation green on the dev server.

**Archived:** 2026-05-19
