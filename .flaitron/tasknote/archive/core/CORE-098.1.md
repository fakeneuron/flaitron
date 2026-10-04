---
title: viz-embellishment discovery
status: completed
tags: []
created: 2026-05-15
due:
related-tasks: [CORE-EPIC-098]
---

# CORE-098.1 | viz-embellishment discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Inventory viz's current design + UX gaps + feature parity vs comparable Kanban tools, and file a prioritized improvement list (with sketches/refs) as CORE-098.2..N children in PLAN.md.

## ✅ Acceptance

- [ ] Viz UI current-state inventory captured in Discovery Notes: typography scale, color palette + contrast posture, spacing/density system, hierarchy posture, motion/transition usage, focus-ring system, info density per row + detail
- [ ] Three comparable tools surveyed (Linear, GitHub Projects, Notion / Obsidian Dataview) for *display & navigation* patterns transferable to a read-only viz; Trello deferred (canonical Kanban patterns covered by GitHub Projects)
- [ ] Pillar 1 (graphic-design best practices): findings ranked by leverage-to-lift ratio; ≥3 children filed
- [ ] Pillar 2 (UI feature parity / view-switcher): findings ranked; ≥3 children filed, including the optional Kanban-board view-switcher per user direction (must coexist with vertical-stack default at low maintenance cost)
- [ ] Pillar 3 (selective-visibility controls): gear-icon → settings-modal direction scoped; ≥1 child filed
- [ ] Audit subtask (`CORE-098.<N>` at highest number) filed per `SPEC/epic.md`
- [ ] All filed PLAN.md children stay ≤70w hard cap (target ≤50w); each carries a `| shortname` segment + `[model]` tag
- [ ] CORE-EPIC-098 parent line unchanged (stays open under Future Opportunities); only children get filed
- [ ] Proposed child list surfaced to user via AskUserQuestion before filing — filing is gated on user confirmation
- [ ] Doc-drift sweep at closure: no AI-referenced doc updates land in this Discovery (pure PLAN.md filing); contract-touching changes ride inside the implementation children

## 🧩 Subtasks

- [ ] Inventory viz's current visual surface (typography / color / spacing / hierarchy / motion / focus rings / info density per row + detail) — log in Discovery Notes
- [ ] Survey Linear, GitHub Projects, Notion / Obsidian Dataview for *display & navigation* patterns transferable to a read-only viz (filtering, density modes, view-switching, settings affordances, empty-state design); skip edit/drag/drop lanes
- [ ] Inventory missing UI features in viz vs comparable tools, scoped to display & navigation only (viz is read-only by design)
- [ ] Sketch the selective-visibility settings modal: gear-icon trigger in header, modal shape, scope of toggles (row chips + detail sections), persistence (localStorage per-project), default state
- [ ] Sketch the optional Kanban-board view-switcher: coexistence with vertical-stack default, view-state persistence, what re-uses vs what's net-new code, future-maintenance risk
- [ ] Compile gap matrix in Discovery Notes: pattern / lift / leverage / risk; rank by leverage-to-lift ratio
- [ ] Draft ≥9 children PLAN.md lines covering Pillars 1–3 + audit subtask; verify each ≤70w (target ≤50w) and carries `| shortname` + `[model]`
- [ ] Surface the proposed child list to the user via AskUserQuestion; gate filing on user confirmation
- [ ] File the confirmed children into PLAN.md under the existing CORE-EPIC-098 parent line

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic (viz-embellishment)
- [[FE-031]] — chip-system trim (just-shipped; signals user's strong preference for low default visual density)
- [[FE-019]] — a11y + perf baseline (anchors current-state inventory)
- [[FE-008]] — row-density redesign (origin of the two-cluster grid + Tier 1/Tier 2 hierarchy)
- [[FE-005]] — vertical-list rebuild (the layout the view-switcher must preserve as the default)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-EPIC-098 was filed today (2026-05-15) as an exploration epic shell; CORE-098.1's job is the Discovery deliverable per `SPEC/epic.md` — surveying current state + comparable tools and filing implementation children. No drift to correct (PLAN.md line cites no code paths). Three pillars in the parent epic (graphic-design / feature parity / selective-visibility) all land squarely in `viz/src/ui/`, which just stabilized after FE-031 + FE-019 + FE-024 — a sound moment to plan the next round before code ships. The just-shipped FE-031 chip trim establishes the relevant design philosophy (default density low; opt-in to richer signals) that Pillar 3's selective-visibility direction is the natural extension of.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — 4 resolved via AskUserQuestion (see Discovery Notes §"Clarifying-question outcomes")
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed (audit-only — read, don't modify in `.1`)

`viz/index.html` (themes pre-bootstrap), `viz/src/styles.css` (Tailwind base only), `viz/src/ui/App.tsx` (state + layout), `viz/src/ui/PrioritySection.tsx`, `TaskRow.tsx`, `TaskRowInner.tsx`, `EpicRow.tsx`, `SubtaskRow.tsx`, `TaskDetail.tsx`, `DetailSection.tsx`, `Chevron.tsx`, `StatusChip.tsx`, `PhaseDots.tsx`, `SubtaskProgress.tsx`, `ProjectSelector.tsx`, `ThemeToggle.tsx`, `WikilinkMarkdown.tsx`, `useKeyboardNav.ts`, `useToggleSet.ts`, `theme.ts`, `utils.ts`, `constants.ts`, `tailwind.config.ts`, `viz/package.json`. Bundle: Vite 5 + React 18 + Tailwind 3; React-Markdown + remark-gfm code-split per FE-026. No linter; `tsc --noEmit` covers static analysis.

### Archive skim — five load-bearing prior tasknotes

- `FE-005` — vertical-list rebuild (replaced the original 6-column Kanban). **Implication:** the optional view-switcher in Pillar 2 must not regress this; vertical-stack is the studied default.
- `FE-008` — row-density redesign (two-cluster grid + Tier 1/Tier 2 chip hierarchy). **Implication:** any new chips must respect the established tier vocabulary.
- `FE-013` — polish bundle (favicon + autoComplete + relative due-date + zero-count status hidden). **Implication:** small polish has a precedent; granular polish children are valid scope shapes.
- `FE-019` — a11y + perf baseline (Lighthouse 84/94/96/82; zero `tabIndex` / `role=` overrides; native semantics throughout). **Implication:** any new feature must preserve this baseline; settings-modal in Pillar 3 needs explicit focus-trap design (today there are zero modal surfaces).
- `FE-031` — chip-system trim (just-shipped 2026-05-14). **Implication:** the user wants *low default visual density*. Pillar 3's selective-visibility direction is the *additive* path that preserves the trimmed default while letting power-users opt back in.

### Drift check

PLAN.md line for CORE-098.1 cites no concrete file paths, line numbers, or function names — only directional language ("inventory viz's current design + UX gaps + feature parity"). The cross-reference to `SPEC/epic.md` was verified at the top of Step 2 (file exists; lifecycle confirmed). No drift to flag.

### Clarifying-question outcomes (resolved 2026-05-15)

1. **Selectivity unit** — *user's best judgement; gear/settings icon with accompanying modal.* Interpreted as: settings modal triggered from a header gear icon, scoped over **both** per-row chips AND per-detail-panel sections (single modal, two sections). One filed child for the modal scaffold + visibility-control logic; second child if it grows.
2. **Comparable tools** — *no radical new structure; consider a view-switcher between vertical-stack default and a more traditional Kanban view; explore without daunting future-maintenance cost.* Interpreted as: survey display & navigation patterns from Linear / GitHub Projects / Notion-Dataview (Trello deferred — patterns covered by GitHub Projects); file a view-switcher child explicitly under Pillar 2; reject any cross-tool pattern requiring deep state/feature coupling.
3. **Analysis home** — Tasknote Discovery Notes.
4. **Children count** — Comprehensive (9+).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Discovery subtask, no code change; "pattern" here is the precedent set by CORE-057.1 (sister epic-discovery subtask): audit findings + comparable inventory + filing proposal land in this tasknote's Implementation Notes, children get filed into PLAN.md after user-confirmation gate. Followed verbatim.
- [x] Implemented the minimal solution — audit ran inline; ≥9 children proposed below; surfaced to user via AskUserQuestion before any PLAN.md edits; filed the confirmed set.
- [x] Updated/added tests for non-trivial behavior — N/A (no code changed in `.1`).

**Implementation Notes:**

### Current viz visual surface inventory

**Typography.** Tailwind defaults (system sans). Six effective sizes in active use: `text-lg` (h1), `text-sm` (section header / search), `text-xs` (row title / button label), `text-[10px]` (status chips / metadata), `text-[11px]` (subtask row content), `text-[9px]` (subtask checkmark). Weights: `font-semibold` (h1), `font-medium` (section name / status badge / chip). `font-mono` + `tabular-nums` on task IDs only. **Gap:** scale is unsystematic — no documented role mapping; six sizes feels ad-hoc rather than a 4-step (heading / body / caption / micro) scale.

**Color palette.** Tailwind palette only. Six section tints (red / orange / amber / sky / violet / emerald — 50/200 light, 950/30/900 dark). Five status badges (lime / slate / amber / rose / emerald). Selection ring sky-400/600. Highlight amber. Phase dots emerald/amber/slate. Subtask bar sky-500. **Gap:** semantic overlap — `amber` is reused across "active phase" + "transient highlight" + "in-progress status" + "Medium priority", creating cross-talk; e.g., an in-progress Medium task with active-phase dot reads as one continuous amber smear.

**Spacing / density.** Section `p-2`, header `px-3 py-2`, row `px-2.5 py-1.5`, inter-row `gap-1.5`. Dense by default. **Gap:** no opt-in alternate density (Linear has three modes); the post-FE-031 trim already maxes out info-per-row at this density.

**Hierarchy.** Two-tier chip system from FE-008 (Tier 1: PhaseDots / SubtaskProgress = bolder; Tier 2: chips = `text-[10px]`). Section tint signals priority. **Gap:** epic-vs-standalone-task hierarchy reads only via chevron + `N/M done` chip — same row height + font; the parent-child visual relationship could be reinforced with a subtle border weight or leading icon on epic rows.

**Motion / transitions.** `transition-colors` on rows (highlight fade); smooth `scrollIntoView` on nav. No chevron rotation; expand/collapse instant. **Gap:** static feel; small motion vocabulary (chevron rotate, height-animated expand, hover tint) would lift polish without overdoing — risk is straightforward to bound.

**Focus rings.** Search `focus:ring-2 focus:ring-slate-300/600`. Keyboard selection cursor `ring-2 ring-sky-400/600`. **Gap:** chip buttons (filter pills, status pills, project chips, theme toggle, gear, view-switcher segments — once added) rely on browser-default focus, which is invisible against `bg-slate-100` in light mode. Explicit `focus:ring-*` needed.

**Info density / customization.** Row content fixed: ID + title + (PhaseDots / SubtaskProgress / StatusChip when tasknote present). Detail-panel fixed: Goal / Acceptance / Subtasks (or starter context / fallback to PLAN.md description). Header: search + ⓘ + theme toggle + project chips + status filter chips. **Gap:** zero per-user customization. Post-FE-031 default is intentionally lean; Pillar 3's selective-visibility is the *additive* path back to richer signals without polluting the default.

**Empty / loading.** "No tasks" placeholder for empty section. No loading indicator on initial fetch (blank list until JSON lands). Filter-narrowed-to-zero states render the section with `0` count but no "clear filters" affordance. **Gap:** loading skeleton missing; filter-zero state could be informative ("No matches. Esc to clear.").

### Comparable-tools survey (display & navigation patterns; edit/drag lanes excluded — viz is read-only by contract)

**Linear** — three density modes (Comfortable / Default / Compact); top-bar view switcher (List / Board / Backlog / Cycle); hierarchical row treatment (parent border + nested indent); filter pills with applied-count badges ("Status: 2"); `?` overlay for shortcuts; subtle motion (status icon pulse) — taste-dependent, lean static.

**GitHub Projects** — top-bar view switcher (Table / Board / Roadmap); gear-icon "Configure" panel for per-view field visibility — *direct precedent for Pillar 3*; group-by control (Status / Priority / Assignee).

**Notion / Obsidian Dataview** — per-view properties-shown toggles — *direct precedent for Pillar 3*; multiple view types per database; informative empty-state with action (flowtron skips the action — read-only — but the informative copy applies). Dataview's frontmatter-query mode is power-user surface; out of MVP scope.

**Trello — deferred.** Canonical Kanban patterns are covered by GitHub Projects' Board view; no incremental signal worth a separate survey lane.

**Rejected patterns** — drag-and-drop reordering, inline edit, quick-add, comments/activity, saved views (last is power-user; deferrable).

### Sketch — Pillar 3 settings modal (gear icon in header rail, right of theme toggle)

```
┌─ Settings ──────────────────────────────────────────┐
│                                                      │
│  Row chips (opt-in, off by default post-FE-031)     │
│   ☐ Tags         ☐ Model chip                       │
│   ☐ Related      ☐ Due date                         │
│                                                      │
│  Detail panel sections                               │
│   ☑ Goal         ☑ Acceptance                       │
│   ☑ Subtasks     ☐ Phase checklists                 │
│                                                      │
│  Density                                             │
│   ○ Comfortable  ● Default  ○ Compact                │
│                                                      │
│  [Reset to defaults]                  [Done]         │
└──────────────────────────────────────────────────────┘
```

Persistence: `localStorage` keyed per-project (`flowtron-viz-prefs:<projectName>`) so different projects can carry different prefs. Implementation: native `<dialog>` element with `showModal()` — free focus-trap, focus-restore, and Esc-to-close (viz's first modal surface; explicit focus management would otherwise be net-new infra). Plumb prefs via a `useVisibilityPrefs(projectName)` hook + prop-drill through `PrioritySection` → `TaskRow` / `EpicRow` / `TaskRowInner` / `TaskDetail` (no React context — drill depth is bounded; context premature). Re-introduces some FE-031-trimmed chips as opt-in, preserving the lean default.

### Sketch — Pillar 2 view-switcher (segmented control in header rail, left of search)

```
┌──────────────┐
│ List  Board  │   ← default "List" (current vertical-stack)
└──────────────┘
```

"Board" lays the 6 priority sections out as horizontal columns; each column is a vertical stack of cards using the existing `TaskRow` / `EpicRow` / `SubtaskRow` components verbatim — only the outer layout shell is net-new (~60 LOC `<BoardView>` + `viewMode` state in `App.tsx` + a horizontal-scroll wrapper). Filtering, keyboard nav, detail-panel expand, settings modal — all unchanged. Persistence: `localStorage` global (`flowtron-viz-view`). Maintenance footprint: bounded — the view-switcher is a layout-container, not a fork; row components don't branch on `viewMode`.

### Gap matrix — ranked

| # | Gap / pattern | Pillar | Lift | Leverage | Risk | Filed? |
|---|---|---|---|---|---|---|
| 1 | Selective-visibility settings modal (gear icon + localStorage prefs, scoped per-project) | 3 | M | H | M | **.3** |
| 2 | Density modes (Comfortable / Default / Compact) inside the settings modal | 1 + 3 | M | H | M | **.4** |
| 3 | Typography scale codified (4-step) + color palette consolidation (semantic mapping) | 1 | M | H | L | **.2** |
| 4 | Optional Kanban / Board view-switcher (layout-only, re-uses row components) | 2 | M | M | L | **.5** |
| 5 | Focus-ring system for all chip buttons (explicit `focus:ring-*` per element) | 1 + a11y | L | M | L | **.6** |
| 6 | Epic-row visual lift (heavier border / leading icon / background tint) | 1 | L | M | L | **.7** |
| 7 | Motion polish (chevron rotation, height-animated expand, hover tint) | 1 | L | L | L | **.8** |
| 8 | Keyboard-shortcuts overlay modal (replace ⓘ tooltip with `?` overlay; reuses .3's `<dialog>` infra) | 2 | L | M | L | **.9** |
| 9 | Empty-state + loading-state polish (informative copy + skeleton) | 1 + 2 | L | L | L | **.10** |
| 10 | Filter summary chip ("Status: 2 selected") | 2 | M | M | M | **deferred** — scannability tradeoff vs current at-a-glance pills; revisit if Pillar 2 audit catches need |
| 11 | Group-by control (Priority / Status / Area / Epic) | 2 | M | M | M | **deferred** — scope too large for an embellishment epic; warrants its own epic if surfaced as a need |

### Proposed CORE-098.2..11 child slate (drafted before filing; surfaced via AskUserQuestion below)

The full proposed slate (10 children = 9 implementation + 1 audit, fitting the "9+ Comprehensive" envelope). All lines verified ≤50w. Models: 4 `[opus]` (design judgment + non-trivial plumbing), 5 `[sonnet]` (mechanical / well-scoped), 1 `[opus]` (audit).

```markdown
  - [ ] **CORE-098.2** [opus] | typography & color audit — Codify a 4-step typography scale and consolidate the color palette (resolve amber-collision across active-phase / highlight / in-progress / Medium); document semantic mapping in `viz/src/ui/theme.ts` and apply across components.
  - [ ] **CORE-098.3** [opus] | settings-modal scaffold — Gear-icon trigger in header rail + native-`<dialog>` settings modal with selective-visibility controls for row chips (tags / model / related / due, all opt-in) and detail-panel sections; persist prefs in `localStorage` per-project.
  - [ ] **CORE-098.4** [opus] | density modes — Add Comfortable / Default / Compact density toggles to the settings modal; each mode adjusts row padding + chip sizing + section gap; persists alongside visibility prefs.
  - [ ] **CORE-098.5** [opus] | board view-switcher — Add a List / Board segmented control to the header; Board lays the 6 priority sections out as columns, re-using `TaskRow` / `EpicRow` / `SubtaskRow` verbatim; persist `viewMode` in `localStorage`.
  - [ ] **CORE-098.6** [sonnet] | focus-ring system — Audit all interactive elements (chip buttons, gear, view-switcher segments, modal controls) and add explicit `focus:ring-*` classes where browser-default focus is invisible in either theme.
  - [ ] **CORE-098.7** [sonnet] | epic-row visual lift — Subtle visual distinction for epic rows (heavier border + leading icon + background tint, picked via Discovery) so the epic-vs-task hierarchy reads at a glance without the chevron.
  - [ ] **CORE-098.8** [sonnet] | motion polish — Chevron-rotation on expand/collapse, subtle height-animated section + row expand, hover-tint on rows. Small bundle; easy to overdo — keep subtle.
  - [ ] **CORE-098.9** [sonnet] | keyboard-shortcuts overlay — Replace the `ⓘ`-tooltip with a `?`-triggered overlay modal listing all shortcuts; reuses the `<dialog>` infra from CORE-098.3.
  - [ ] **CORE-098.10** [sonnet] | empty + loading states — Informative empty-state ("No matches. Press Esc to clear filters.") and a loading skeleton on initial fetch.
  - [ ] **CORE-098.11** [opus] | audit — Verify the completed embellishment epic sits well in the codebase: a11y baseline preserved (FE-019), bundle-size budget intact (FE-026), typography/color/density interactions clean; doc-drift sweep per `SPEC/epic.md`.
```

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; no viz/ source changed. Validation = filed PLAN.md children inspection: 10 lines added under CORE-EPIC-098 at the same indentation as `.1`, each carries `| shortname` + `[model]`, each long description ≤50w (target 50w / cap 70w per SPEC).
- [x] Ran lint/type-check on changed code — N/A; markdown-only diff.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no UI change to confirm. Slate confirmation already gated on AskUserQuestion in Phase 2.

**Testing Notes:**

- Discovery deliverable is the filed child slate, not code. Validated by re-reading the 10 inserted PLAN.md lines after the edit.
- The closure diff is markdown-only: `_project/PLAN.md` (10 lines added) + `_project/tasknote/CORE-098.1.md` (full Discovery → archive move).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview; Discovery-only filing doesn't shift any flowtron-as-a-product surface.
  - `SPEC.md` — **no change.** Workflow contract is unchanged; this Discovery uses the existing 4-phase + epic-lifecycle contracts as-is.
  - `docs/MIGRATION.md` — **no change.** Adoption / bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-15.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (delivered inline on the 📦 skip branch — see commit response)

**Final Summary:**

Scoped CORE-EPIC-098 (viz-embellishment) by inventorying viz's current visual surface (typography / color / spacing / hierarchy / motion / focus rings / info density), surveying Linear + GitHub Projects + Notion-Dataview for transferable display-and-navigation patterns (edit / drag lanes excluded — viz is read-only by contract), sketching the two novel directions (gear-icon settings modal with native-`<dialog>` focus-trap; List / Board view-switcher as a layout-only shell re-using existing row components), and compiling a ranked gap matrix. Filed 10 children CORE-098.2..11 covering all three pillars: typography & color (.2), settings modal + selective-visibility + density (.3, .4), Board view-switcher (.5), polish bundle (.6-.10 — focus rings, epic-row lift, motion, keyboard-shortcuts overlay, empty + loading states), and audit (.11). Four `[opus]` (.2-.5, .11), five `[sonnet]` (.6-.10). Two items deferred — filter-summary chip (scannability tradeoff) and group-by control (warrants its own epic) — recorded in the gap matrix for future re-evaluation. Closure diff: `_project/PLAN.md` (10 lines added) + `_project/tasknote/CORE-098.1.md` (Discovery audit + Phase 2/3/4 → archived).

**Archived:** 2026-05-15
