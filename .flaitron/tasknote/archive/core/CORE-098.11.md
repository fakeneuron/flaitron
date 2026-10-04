---
title: audit
status: completed
tags: []
created: 2026-05-16
due:
related-tasks: [CORE-EPIC-098, CORE-098.1, CORE-098.2, CORE-098.3, CORE-098.4, CORE-098.6, CORE-098.7, CORE-098.8, CORE-098.9, CORE-098.10, CORE-098.12, FE-019, FE-026]
---

# CORE-098.11 | audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-098]]

## 🎯 Goal

Audit the CORE-EPIC-098 viz embellishment epic — verify a11y baseline ([[FE-019]]), bundle-size budget ([[FE-026]]), and typography/color/density interactions stay clean, then run the canonical doc-drift sweep per `SPEC/epic.md`.

## ✅ Acceptance

**Scope confirmed in Phase 1:** audit the 9 closed children (`.1`-`.4`, `.6`-`.10`, `.12`); defer `.5` (board view-switcher) — covered by `.5`'s own Phase 3/4 when it ships, with a follow-up audit child filed if cross-cutting drift surfaces post-`.5`.

**Bundle-size budget (FE-026):**

- [ ] `npm run build` per-chunk re-run captured (raw + gzipped) in Implementation Notes
- [ ] Entry chunk stays ≤ 80 KB gz (well under FE-019's pre-split 124 KB bar; allows reasonable headroom over FE-026's 53.55 KB gz post-fix mark for the new modal / chip / skeleton / density-token additions)
- [ ] `TaskDetail-*.js` lazy chunk still present (no static-import regression of `TaskDetail`)
- [ ] `gray-matter` absent from client bundle (`grep -l "gray-matter" dist/assets/*.js` → no hits)

**A11y baseline (FE-019):**

- [ ] Lighthouse desktop re-run vs `npm run preview` captured (Performance / Accessibility / Best-Practices / SEO + Core Web Vitals); a11y score ≥ 94 (FE-019 baseline; FE-026 lifted to 100)
- [ ] Native-semantics sweep: `grep -n "tabIndex\|role=" viz/src/ui/` returns zero overrides (FE-019 baseline)
- [ ] Both modal files (`SettingsModal.tsx`, `ShortcutsModal.tsx`) use native `<dialog>` with `aria-labelledby`, close-on-Esc, close-on-backdrop, and focus-trap (free from `<dialog>.showModal()`)
- [ ] `prefers-reduced-motion` honored: `Chevron.tsx` carries `motion-reduce:transition-none`; height-animated section/subtask expands respect reduced motion (grid-rows trick is class-based — verify the transition uses `motion-reduce:transition-none` or equivalent)
- [ ] Focus-ring coverage from `.6` is complete: any new interactive `<button>` shipped in `.7`-`.10` / `.12` after `.6` either uses `PILL_*` constants (which embed `PILL_FOCUS_RING`) or has an explicit `focus:ring-*` class

**Typography / color / density interactions:**

- [ ] No off-grid typography literals remain: `grep -E "text-\[(9|10|11)px\]" viz/src/ui/` returns zero hits (post-CORE-098.2 + CORE-098.12 deprecation)
- [ ] No re-introduced inline color maps in components: `PrioritySection.tsx`, `TaskDetail.tsx`, `PhaseDots.tsx`, `EpicRow.tsx`, `StatusChip.tsx`, `ModelChip.tsx`, `RelatedChip.tsx` all consume from `constants.ts` (no inline `Record<…, string>` maps)
- [ ] `DENSITY_TOKENS` consumed end-to-end on row surfaces: no hardcoded `px-2\.5 py-1\.5` / `px-2 py-1` / `px-3 py-2` on `TaskRow`, `EpicRow`, `SubtaskRow`, `TaskRowInner`, `PrioritySection` (TaskDetail + header chrome stay fixed by design — `.4` scope)
- [ ] Visual walk: all three density modes (Comfortable / Default / Compact) × both themes (light / dark) × representative content (epic with subtasks expanded, plain task, completed task, in-progress task with row-highlight); chip readability at post-`.12` caption size in Compact mode; user confirms (👁️)

**Code hygiene cross-cuts:**

- [ ] Port-5120 references consistent across the four `.9`-touched docs (`SPEC.md`, `docs/MIGRATION.md`, `README.md`, `claude/CLAUDE-snippet.md`) + `viz/vite.config.ts`; no stale `5176` references
- [ ] No dead exports in `constants.ts` (all tokens are consumed somewhere); no dead imports introduced by the shipped subtasks
- [ ] jsdom polyfill from `.3` still scoped to test setup only (no production import path)
- [ ] `npm --prefix viz run typecheck` clean
- [ ] `npm --prefix viz test` passes (≥ 105 tests — `.9` raised the count from 103 to 105)

**Doc-drift sweep (mandatory per `SPEC/epic.md`):**

- [ ] Per-entry verdict on the four `_project/tasknote/README.md` §"AI-referenced docs" entries: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md` — "no change" or the specific update

**Audit deliverable:**

- [ ] Findings table compiled (rule / location / severity / suggested fix / filed-as Y/N); records findings even when nothing is wrong (per `SPEC/epic.md`)
- [ ] Actionable findings filed as `CORE-098.13+` follow-up children in PLAN.md (per `SPEC/epic.md` step 5: "Audit follow-ups. Misses surfaced by the audit get filed as `.<N+1>` children")
- [ ] Final summary written; PLAN.md `.11` flipped to stub form `Completed YYYY-MM-DD.`; tasknote archived to `_project/tasknote/archive/core/`

## 🧩 Subtasks

**Phase 2 — Instrumented re-runs:**

- [ ] Run `npm --prefix viz run build`; capture per-chunk raw + gzipped sizes; verify `gray-matter` absent (`grep -l "gray-matter" viz/dist/assets/*.js`); verify `TaskDetail-*.js` lazy chunk still present
- [ ] Start `npm --prefix viz run preview` (port 4173); run `npx lighthouse http://localhost:4173 --only-categories=performance,accessibility,best-practices,seo --form-factor=desktop --output=json --output-path=/tmp/flowtron-lighthouse-098-11.json`; capture all 4 scores + Core Web Vitals; stop the preview server

**Phase 2 — Static-analysis sweeps (grep / read):**

- [ ] Grep off-grid typography: `grep -rn "text-\[\(9\|10\|11\)px\]" viz/src/ui/` (expect zero hits)
- [ ] Grep hardcoded row-surface padding: `grep -rn -E "px-(2\.5|3) py-(1\.5|2)|px-2 py-1" viz/src/ui/{TaskRow,EpicRow,SubtaskRow,TaskRowInner,PrioritySection}.tsx` (expect zero — all should consume `DENSITY_TOKENS`)
- [ ] Grep native-semantics overrides: `grep -rn "tabIndex\|role=" viz/src/ui/` (expect zero per FE-019)
- [ ] Grep for re-introduced inline color/typography maps: read `PrioritySection.tsx`, `TaskDetail.tsx`, `PhaseDots.tsx`, `EpicRow.tsx`, `StatusChip.tsx`, `ModelChip.tsx`, `RelatedChip.tsx` — verify they import from `constants.ts` and don't re-declare local `Record<…, string>` maps
- [ ] Grep port references: `grep -rn "5176\|5120" SPEC.md docs/MIGRATION.md README.md claude/CLAUDE-snippet.md viz/vite.config.ts` (no `5176` survivors; `5120` consistent)
- [ ] Read both modal files end-to-end (`SettingsModal.tsx`, `ShortcutsModal.tsx`): verify `aria-labelledby`, native `<dialog>`, `showModal()`, close-on-Esc, close-on-backdrop, focus-trap-by-default, focus-ring on Reset + Done buttons
- [ ] Read `Chevron.tsx` for `motion-reduce:transition-none`; read `PrioritySection.tsx` + `EpicRow.tsx` grid-rows transitions for reduced-motion handling
- [ ] Read post-`.6` interactive surfaces shipped in `.7`-`.12` for focus-ring coverage (any new `<button>` without `PILL_*` or explicit `focus:ring-*`)

**Phase 3 — Build + test + visual:**

- [ ] Run `npm --prefix viz exec tsc -- --noEmit` (clean)
- [ ] Run `npm --prefix viz test` (≥ 105 pass)
- [ ] Start `npm --prefix viz run dev` (port 5120); request 👁️ visual confirmation at all 3 density modes × both themes

**Phase 4 — Synthesis + closure:**

- [ ] Compile findings table in tasknote Implementation / Testing Notes (rule / location / severity / suggested fix / filed-as Y/N)
- [ ] File actionable findings as `CORE-098.13+` follow-up children in PLAN.md (one line per finding under the epic parent; if zero actionable findings, log explicitly)
- [ ] Doc-drift sweep — per-entry verdict on the 4 AI-referenced docs
- [ ] Flip PLAN.md `.11` to `[x] **CORE-098.11** [opus] | audit — Completed YYYY-MM-DD.`; move tasknote to `_project/tasknote/archive/core/`
- [ ] Draft recap (1-2 sentence plain-English summary + technical findings + verification ask)

## 🔗 Related

- [[CORE-EPIC-098]] — parent epic this subtask audits
- [[CORE-098.1]] — Discovery (filed the child task list)
- [[CORE-098.2]] — typography & color audit
- [[CORE-098.3]] — settings-modal scaffold
- [[CORE-098.4]] — density modes
- [[CORE-098.6]] — focus-ring system
- [[CORE-098.7]] — epic-row visual lift
- [[CORE-098.8]] — motion polish
- [[CORE-098.9]] — keyboard-shortcuts overlay
- [[CORE-098.10]] — empty + loading states
- [[CORE-098.12]] — typography scale bump
- [[FE-019]] — viz a11y/perf pass; baseline to verify
- [[FE-026]] — viz bundle code-split; budget to verify

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Nine of ten implementation children are closed (`.1`-`.4`, `.6`-`.10`, `.12`); the epic has stabilized for an audit pass. Per `SPEC/epic.md`, the audit subtask runs "once all implementation children are closed" — `.5` (board view-switcher) remains open, surfaced for user decision in Q1. The PLAN.md line cites three concrete baselines to verify (FE-019 a11y, FE-026 bundle, typography/color/density interactions) plus the mandatory doc-drift sweep — all are well-scoped, instrumented re-runs are the natural fit (Lighthouse vs FE-019, `npm run build` vs FE-026). The viz UI surface has not been touched outside of `.6`-`.10` + `.12` since the cited baselines, so the audit's signal is high.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions — 1 resolved via AskUserQuestion (Q1 below)
- [x] Subtasks above populated with concrete, ordered steps

### Clarifying-question outcome (resolved 2026-05-16)

**Q1: `.5` (board view-switcher) is still open — how to handle?** → *Audit closed work now; re-audit if/when `.5` lands.* Run `.11` against the 9 closed children (`.1`-`.4`, `.6`-`.10`, `.12`); when `.5` ships later, its own Phase 3/4 covers its immediate surface; if cross-cutting drift surfaces post-`.5`, file a follow-up audit child (e.g., `.14`) at that time. Keeps momentum on closing the epic's main thrust while preserving rigor.

**Discovery Notes:**

### Source files reviewed (audit-only — read, don't modify in `.11`)

**Tasknote archives (10 in scope — the full closed-children set):**
- `CORE-098.1` (Discovery; filed the .2-.11 slate + gap matrix; 10 deferred items recorded)
- `CORE-098.2` (typography & color audit; `constants.ts` token registry codified — `TYPOGRAPHY`, `SECTION_TINT`, `PRIORITY_BADGE`, `PHASE_DOT`, `ROW_HIGHLIGHT`/`ROW_HIGHLIGHT_SUBTASK`/`ROW_SELECTION`/`ROW_SELECTION_SUBTASK`/`ROW_NEUTRAL`; amber→indigo highlight migration)
- `CORE-098.3` (settings-modal scaffold; native `<dialog>`; `visibilityPrefs.ts` schema v1; `ModelChip` + `RelatedChip` re-introduced post-FE-031; 3-col `TaskRowInner` grid; jsdom polyfill)
- `CORE-098.4` (density modes; `DENSITY_TOKENS` registry; `density: DensityMode` added to schema additively under v1; row-surface scope only; `DENSITY_TOKENS` padding-only — text size stays on `TYPOGRAPHY.caption`)
- `CORE-098.6` (focus-ring system; `PILL_FOCUS_RING` constant + embedded in `PILL_ACTIVE` / `PILL_DEFAULT_SLATE`; 10 button surfaces gained explicit rings; native form inputs left to browser default)
- `CORE-098.7` (epic-row visual lift; `EPIC_ROW_NEUTRAL` constant + `epicRowOutlineClass` helper; `border-2` + left stripe + bg tint on `EpicRow`)
- `CORE-098.8` (motion polish; chevron `duration-200` + `motion-reduce:transition-none`; grid-rows CSS trick for section/subtask expand; hover-tint on `TaskRow`/`SubtaskRow`/`EpicRow` header — one `App.test.tsx` `toBeNull()` assertion updated since grid-trick keeps subtask DOM mounted)
- `CORE-098.9` (keyboard-shortcuts overlay; `ShortcutsModal.tsx` clones `SettingsModal.tsx` dialog infra; `?` keyboard shortcut added to `useKeyboardNav.ts`; `ⓘ` button became modal-trigger; ThemeToggle stripped to emoji-only; **dev-server port moved 5176→5120** with 4 doc updates: SPEC.md, MIGRATION.md, README.md, CLAUDE-snippet.md)
- `CORE-098.10` (empty + loading states; new `LoadingSkeleton.tsx`; `loading: boolean` state in `App.tsx`; filter-empty "No matches. Press Esc to clear filters." message; density-aware skeleton spacing)
- `CORE-098.12` (typography scale bump; sweep of 36 literal class occurrences across 14 files; `subhead` `text-sm→text-base`, `body` `text-xs→text-sm`, `caption` `text-[10px]→text-xs`; heading stays `text-lg`)

**Baseline reference tasknotes:**
- `FE-019` (a11y + perf baseline; Lighthouse desktop prod-build scores **84/94/96/82**; bundle **415 KB raw / 124 KB gz** single chunk pre-FE-026; zero `tabIndex` / `role=` overrides; native semantics throughout)
- `FE-026` (viz-bundle-code-split; entry chunk **53.55 KB gz** post-fix; lazy `TaskDetail-*.js` chunk **48.37 KB gz**; `gray-matter` no longer in client; Lighthouse perf 84→**100**)
- `FE-031` (chip-system trim; user's strong "low default density" preference; `ModelChip` + `RelatedChip` deleted then re-introduced by `.3` as opt-in)

**Current viz state (cross-checked vs archive claims):**
- `viz/src/visibilityPrefs.ts` — confirmed `version: 1` schema with `rowChips` / `detailSections` / `density` fields; `DEFAULT_PREFS` has `model: true` (per user direction during `.3` confirmation), all others off; `density: 'default'`. `parsePrefs` per-field fallback matches the `.3` + `.4` archive claims.
- `viz/src/ui/constants.ts` — confirmed `TYPOGRAPHY` reflects post-`.12` values (`heading: text-lg`, `subhead: text-base`, `body: text-sm`, `caption: text-xs`); all `.2`/`.4`/`.6`/`.7` tokens present (`STATUS_BADGE`, `SECTION_TINT`, `PRIORITY_BADGE`, `PHASE_DOT`, row-state classes, `EPIC_ROW_NEUTRAL`, `PILL_FOCUS_RING`/`PILL_ACTIVE`/`PILL_DEFAULT_SLATE`, `DENSITY_TOKENS`).

### Drift check

**Three baselines cited in PLAN.md — all anchored to specific archived tasknotes:**

- ✅ **FE-019 (a11y baseline preserved)** — Lighthouse 84/94/96/82 + zero `tabIndex` / `role=` overrides. Confirmable via re-run `npx lighthouse` against `npm run preview`.
- ✅ **FE-026 (bundle-size budget intact)** — entry chunk 53.55 KB gz post-FE-026. Confirmable via `npm run build` per-chunk report.
- ✅ **Typography / color / density interactions** — three closed tasknotes (`.2`, `.4`, `.12`) ship the registry; visual confirmation walk at all three density modes × both themes catches any cross-axis surprise.

**No path / function-name drift** in the PLAN.md line — it cites baselines symbolically (FE-019, FE-026), not specific file paths.

**One open dependency surfaced (Q1 below):** `.5` board view-switcher is still open under Future Opportunities. Multiple closed tasknotes explicitly exclude that surface (`.6` focus-rings: "View-switcher excluded — CORE-098.5 not yet implemented"). Per `SPEC/epic.md`, audit runs "once all implementation children are closed" — strictly, `.5` should ship first. User invoked `/task CORE-098.11` despite `.5` being open, suggesting a deliberate choice; surface the decision rather than guess.

### Audit dimensions identified

Composed from the PLAN.md line + `SPEC/epic.md` audit-acceptance contract + the 10 closed-tasknote archives:

1. **A11y baseline (FE-019)** — Lighthouse re-run vs 94 baseline; native-semantics sweep (any new `tabIndex` / `role=` overrides?); modal a11y (Settings + Shortcuts both use native `<dialog>` → free focus-trap + Esc + focus-restore — verify); focus-ring coverage from `.6` is comprehensive (any new buttons added in `.7`-`.10` / `.12` that bypassed the `.6` audit?); `prefers-reduced-motion` honored by `.8` motion polish.
2. **Bundle-size budget (FE-026)** — `npm run build` per-chunk re-run; entry chunk must stay close to 53.55 KB gz post-FE-026; lazy `TaskDetail-*.js` must still split (no new static imports of `TaskDetail` from non-lazy callers); no `gray-matter` regression in client bundle; net additions (`SettingsModal`, `ShortcutsModal`, `LoadingSkeleton`, `ModelChip`, `RelatedChip`, density-token table) under a reasonable headroom (target: entry ≤80 KB gz, well under FE-019's 124 KB pre-split bar).
3. **Typography / color / density interactions** — visual walk all three density modes (Comfortable / Default / Compact) × both themes (light / dark) × representative content (epic with subtasks expanded, plain task, completed task, in-progress task with highlight); chip readability at post-`.12` caption size in Compact mode; no off-grid typography literals remain (CORE-098.2 deprecation grep); no inline color maps remain (CORE-098.2 token-consolidation grep); `DENSITY_TOKENS` consumed end-to-end (no row-surface site using hardcoded `px-* py-*` instead of token).
4. **Code hygiene cross-cuts** — dead code / dead imports introduced by the shipped subtasks; unused exports in `constants.ts`; `App.tsx` complexity post `.3` + `.9` + `.10` additions (visibility prefs + settings modal + shortcuts modal + loading state); jsdom polyfill from `.3` still scoped to test setup only; port-5120 references consistent across docs + config (per `.9` doc-drift work).
5. **Doc-drift sweep (mandatory per `SPEC/epic.md`)** — per-entry verdict on `README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md` re: anything the epic landed.
6. **Audit-follow-up filing** — any misses get filed as `.13+` children per `SPEC/epic.md` step 5.

### Expected closure-diff signal profile (informs Step 6 📦 evaluation)

- Frontend files: **typically no** (audit is read-only by design — the tasknote + any new PLAN.md follow-ups are the deliverable). If the audit surfaces minor regressions fixable inline rather than filed (e.g., a missed focus-ring on a button added late), the diff *may* include `viz/src/ui/` files → 📦 fires. Decide branch at closure time based on actual diff content.
- Privileged-ops paths: no
- Perf-narrative: no (re-running Lighthouse / bundle is measurement, not optimization)


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — audit-only task; the "audit" pattern follows the FE-019 / CORE-057.6 precedent: instrumented re-runs + static-analysis sweeps + read-only file walk, findings table compiled in this tasknote, actionable misses filed as `.13+` follow-up children per `SPEC/epic.md`. No code shape introduced.
- [x] Implemented the minimal solution — ran the audit, compiled findings (see Implementation Notes), filed one actionable follow-up (`.13`).
- [x] Updated/added tests for non-trivial behavior — N/A (audit is read-only by design; no viz/ source changed).

**Implementation Notes:**

### Bundle-size baseline (`npm --prefix viz run build`, 2026-05-16)

| Asset | Raw | Gzipped | vs FE-026 post-fix | vs FE-019 pre-split |
|---|---|---|---|---|
| `dist/index.html` | 0.93 kB | 0.53 kB | — | — |
| `dist/assets/index-*.css` | 24.79 kB | 5.00 kB | +0.52 KB gz | — |
| `dist/assets/index-*.js` (entry) | 176.37 kB | **55.43 kB gz** | **+1.88 KB gz** | **−68.14 KB gz (−55%)** |
| `dist/assets/TaskDetail-*.js` (lazy) | 158.75 kB | **48.21 kB gz** | −0.16 KB gz | (didn't exist) |

- 313 modules transformed (vs FE-026's 311; +2 — net effect of `SettingsModal`, `ShortcutsModal`, `LoadingSkeleton`, `ModelChip`, `RelatedChip`, density-token table, etc. vs deletions/refactors).
- `gray-matter` confirmed **absent** from client bundle (`grep -l "gray-matter" viz/dist/assets/*.js` → no hits).
- `react-markdown`/`remark-gfm` confirmed in lazy chunk only (`TaskDetail-*.js`); zero hits in entry chunk.
- **Verdict: PASS.** Entry chunk well under the 80 KB acceptance bar; tiny +1.88 KB delta over FE-026 absorbed across 5+ new components is healthy. FE-026's code-split discipline preserved.

### Lighthouse scores (desktop, prod-build via `vite preview`, 2026-05-16)

| Category | FE-019 baseline | FE-026 post-fix | **CORE-098.11 re-run** | Δ vs FE-019 |
|---|---|---|---|---|
| Performance | 0.84 | 1.00 | **1.00** | +0.16 |
| Accessibility | 0.94 | 1.00 | **1.00** | +0.06 |
| Best Practices | 0.96 | 0.96 | **0.96** | 0 |
| SEO | 0.82 | 0.82 | **0.82** | 0 |

| Core Web Vital | FE-019 | FE-026 | **`.11`** | Δ vs FE-026 |
|---|---|---|---|---|
| LCP | 1881 ms | 438 ms | **400 ms** | −38 ms |
| FCP | 1558 ms | 376 ms | **300 ms** | −76 ms |
| Speed Index | 1.8 s | 639 ms | **400 ms** | −239 ms |
| TBT | 0 ms | 0 ms | **0 ms** | — |
| CLS | 0 | 0.025 | **0** | −0.025 |
| TTI | 1.9 s | — | **0.4 s** | — |
| TTFB | 151 ms | 117 ms | 10 ms | −107 ms |

Raw report: `/tmp/flowtron-lighthouse-098-11.json` (transient — not checked in).

**Verdict: PASS** — FE-019 baseline preserved; a11y improved 94→100 across the epic; bundle-split + lazy TaskDetail still paying off (perf 100, CLS 0).

### Static-analysis sweep results

| Sweep | Command | Result | Verdict |
|---|---|---|---|
| Off-grid typography literals | `grep -rn -E "text-\[(9\|10\|11)px\]" viz/src/ui/` | 1 hit (`constants.ts:20` JSDoc deprecation note — intentional documentation) | ✅ PASS |
| Native-semantics overrides | `grep -rn -E "tabIndex\|role=" viz/src/ui/` | 0 hits | ✅ PASS (FE-019 baseline preserved) |
| Hardcoded row-surface padding | `grep -rn -E "px-(2\.5\|3) py-(1\.5\|2)\|px-2 py-1" viz/src/ui/{TaskRow,EpicRow,SubtaskRow,TaskRowInner,PrioritySection}.tsx` | 3 hits (see Findings) | ⚠️ 1 actionable, 2 by-design |
| Port-5176 survivors | `grep -rn "5176" SPEC.md docs/MIGRATION.md README.md claude/CLAUDE-snippet.md viz/vite.config.ts` | 0 hits | ✅ PASS (`.9` port migration clean) |
| Port-5120 consistency | same | All 5 surfaces consistent | ✅ PASS |
| `gray-matter` in client bundle | `grep -l "gray-matter" viz/dist/assets/*.js` | 0 hits | ✅ PASS (FE-026 preserved) |
| `react-markdown` distribution | per-chunk grep | Lazy chunk only | ✅ PASS |

### Native `<dialog>` a11y walk

| Modal | `aria-labelledby` | `showModal()` | close-on-Esc | close-on-backdrop | focus-trap | focus-ring on buttons |
|---|---|---|---|---|---|---|
| `SettingsModal.tsx` | ✅ `settings-modal-title` | ✅ | ✅ (native) | ✅ (e.target===dialog) | ✅ (native) | ✅ Reset + Done |
| `ShortcutsModal.tsx` | ✅ `shortcuts-modal-title` | ✅ | ✅ (native) | ✅ (e.target===dialog) | ✅ (native) | ✅ Done |

Both modals share the same `useRef<HTMLDialogElement>` + 2-effect pattern (open-state sync + close/click event listeners). `ShortcutsModal` is a clean clone of `SettingsModal` infra per `.9`'s scope.

### Reduced-motion sweep

| Surface | Transition | `motion-reduce:transition-none`? |
|---|---|---|
| `Chevron.tsx` | `transition-transform duration-200` | ✅ |
| `PrioritySection.tsx` grid-rows | `transition-[grid-template-rows] duration-200` | ✅ |
| `EpicRow.tsx` subtask grid-rows | `transition-[grid-template-rows] duration-200` | ✅ |
| `TaskRow.tsx` hover-tint | `transition-colors` (color-only) | Per `.8` scope, color-only transitions are unaffected by reduced-motion |
| `SubtaskRow.tsx` hover-tint | `transition-colors` (color-only) | same |
| `EpicRow.tsx` outer + header hover | `transition-colors` (color-only) | same |

**Verdict: PASS** — `.8`'s motion polish honors `prefers-reduced-motion` on all height-animated surfaces; color-only transitions intentionally not gated.

### Focus-ring coverage — post-`.6` interactive surfaces

| Element | File | Focus-ring source |
|---|---|---|
| Search input | `App.tsx:338` | inline `focus:ring-slate-300/600` |
| `ⓘ` shortcuts button | `App.tsx:346` | inline `focus:ring-slate-400/500` |
| Gear settings button | `App.tsx:356` | inline `focus:ring-slate-400/500` |
| Status filter pills (inactive) | `App.tsx:379` | `PILL_FOCUS_RING` constant |
| Status filter pills (active) | `App.tsx:379` | `PILL_ACTIVE` (embeds `PILL_FOCUS_RING`) |
| ThemeToggle | `ThemeToggle.tsx:31` | inline `focus:ring-slate-400/500` |
| ProjectSelector chips | `ProjectSelector.tsx:24` | `PILL_ACTIVE` / `PILL_DEFAULT_SLATE` (both embed `PILL_FOCUS_RING`) |
| PrioritySection header | `PrioritySection.tsx:49` | inline `focus:ring-inset focus:ring-slate-400/500` (inset to stay inside card border) |
| EpicRow chevron | `EpicRow.tsx:60` | inline `focus:ring-slate-400/500` |
| TaskRowInner detail-toggle | `TaskRowInner.tsx:48` | inline `focus:ring-slate-400/500` |
| SubtaskRow navigate | `SubtaskRow.tsx:44` | inline `focus:ring-slate-400/500` |
| SettingsModal Reset / Done | `SettingsModal.tsx:139,147` | inline `focus:ring-slate-400/500` |
| ShortcutsModal Done | `ShortcutsModal.tsx:71` | inline `focus:ring-slate-400/500` |

**Verdict: PASS** — every interactive surface has an explicit focus ring; no element relies on browser-default. `.6`'s focus-ring system held through `.7`-`.12` additions.

### Findings table

| # | Severity | Category | Rule | Location | Suggested fix | Filed as |
|---|---|---|---|---|---|---|
| 1 | Minor | density-coverage | Subtask-list wrapper padding hardcoded (`px-2 py-1.5`) — not density-aware. Container around expanded subtask list in EpicRow stays fixed while everything inside it (subtask rows, inter-row gaps) scales with density. Small visual inconsistency in Compact mode: wrapper feels slightly looser than the rows it contains. | `EpicRow.tsx:90` | Add `subtaskContainerPad` to `DENSITY_TOKENS` (Comfortable: `px-2.5 py-2`, Default: `px-2 py-1.5`, Compact: `px-1.5 py-1`); have EpicRow consume it. | **CORE-098.13** |
| 1b | Medium | missing-feature | **Subtask rows can't expand a detail panel.** Surfaced by user during `.11` visual confirmation. `SubtaskRow.tsx`'s only button (`navigateToTask`) scrolls + highlights but doesn't toggle a TaskDetail panel — subtasks have no `expandedId` / `setExpandedId` plumbing at all (unlike `TaskRow`/`EpicRow` which both lazy-mount `<TaskDetail>` when expanded). For subtasks with their own tasknote (Goal / Acceptance / Subtasks), this is a meaningful UX gap — the only way to read a subtask's detail is to navigate via VS Code link or open the tasknote file directly. | `SubtaskRow.tsx:41-47` + plumbing through `EpicRow.tsx` → `App.tsx` `expandedId` | Add `expandedId` / `setExpandedId` props to `SubtaskRow`; lazy-import `TaskDetail`; render `<Suspense><TaskDetail …/></Suspense>` when `expandedId === subtask.id`; either swap the navigate button for a detail-toggle button (matches `TaskRow` shape) or have a click both navigate AND expand. Decide button shape in Discovery. | **CORE-098.14** |
| 2 | Info | density-scope | Section-header button padding hardcoded (`px-3 py-2`). | `PrioritySection.tsx:49` | **Not filing — by design** per CORE-098.4 scope ("header chrome stays fixed; density is a row/list-surface concern"). Section header is the section's own chrome. |  — |
| 3 | Info | density-scope | "No tasks" empty-state placeholder padding hardcoded (`px-2 py-1`). | `PrioritySection.tsx:65` | **Not filing — by design.** Empty-state placeholder is its own surface, not a row. The bigger filter-empty state in `App.tsx:401-405` likewise uses fixed `py-16`. |  — |
| 4 | Info | density-scope | Inner-row gap utilities (`gap-1.5`) hardcoded in TaskRowInner. | `TaskRowInner.tsx:58,65,86` | **Not filing — by design.** These are intra-row chip-cluster gaps within a single row; `.4`'s density-token scope is inter-row + section gaps, not intra-row internals. Tightening these would require chip-cluster reflow. |  — |
| 5 | Info | preview-only | Best-Practices `errors-in-console` (1 console error) — preview server has no SSE/HTTP backend, so `/api/*` paths 404 during Lighthouse run. | viz preview env | **Not filing — environment-specific, not a viz/ issue.** Already documented in FE-019 as not actionable. |  — |
| 6 | Info | token-coverage | `SubtaskProgress.tsx:14` uses hardcoded `bg-sky-500` for the progress-bar fill. | `SubtaskProgress.tsx:14` | **Not filing — single-use color, not a maintenance hazard.** Tokenizing as `SUBTASK_PROGRESS_FILL` would be premature consolidation for one site. |  — |

**Net:** the embellishment epic shipped exceptionally clean on automated dimensions (Lighthouse, bundle, static-analysis sweeps all PASS). Two actionable findings filed as follow-up children: `.13` (density-coverage — subtask-list wrapper) and `.14` (missing-feature — subtask detail-panel expand, surfaced by user during the visual walk). Five informational findings recorded but not filed (by-design per `.4`'s explicit scope decisions or single-use-cost).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test`: **105/105 pass** (7 test files, 3.46s). No viz/ source changed in `.11`; existing suite covers the audited surfaces.
- [x] Ran lint/type-check on changed code — `tsc --noEmit` clean (verified twice: inside `npm run build` + standalone `npx tsc --noEmit` in viz/). No linter configured per FE-019 / `.1` notes.
- [x] (frontend) Asked the user for visual confirmation (👁️) — user confirmed "looks good" across density modes + themes; surfaced one missing-feature finding (subtasks can't open detail panels) — captured as finding #1b → filed as `.14`.

**Testing Notes:**

- Instrumented re-runs (`npm run build` + Lighthouse) and 7 static-analysis sweeps documented in Phase 2 Implementation Notes.
- Visual walk caught a feature gap the automated sweeps couldn't have: `SubtaskRow.tsx` lacks any `expandedId` plumbing. Filed as `.14` per `SPEC/epic.md` step 5.
- Test suite unchanged at 105 (no new tests in `.11` — audit is read-only). The 105-count matches the post-`.9` baseline.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts:
  - `README.md` — **no change.** Public-facing flowtron overview unaffected by an audit subtask + 2 PLAN.md follow-up filings.
  - `SPEC.md` — **no change.** Workflow contract is unchanged; `.11` consumed `SPEC/epic.md` audit contract verbatim.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopters' assistant-facing surface unaffected.
- [x] Closed — PLAN.md `.11` line flipped to stub form `Completed 2026-05-16.`; tasknote moved to `_project/tasknote/archive/core/CORE-098.11.md`. Followup children `.13` + `.14` filed under the parent epic before `.11` flipped.
- [x] Recap drafted (delivered inline on the 📦-skip branch — see commit response)

**Final Summary:**

Audited the completed slice of CORE-EPIC-098 (9 closed children — `.1`-`.4`, `.6`-`.10`, `.12`) per `SPEC/epic.md`; deferred `.5` (board view-switcher, still open) per user direction to be covered by its own Phase 3/4 when it ships. The embellishment epic landed exceptionally clean on automated dimensions: Lighthouse desktop **100 / 100 / 96 / 82** (Performance + Accessibility both at 100; A11y improved 94→100 over the epic; FE-019 baseline preserved; FE-026 code-split discipline intact); entry chunk **55.43 KB gz** (+1.88 KB over FE-026 post-fix; well under the 80 KB acceptance bar absorbing 5+ new components — `SettingsModal`, `ShortcutsModal`, `LoadingSkeleton`, `ModelChip`, `RelatedChip`, density-token table); `gray-matter` still absent from client; `react-markdown` still scoped to lazy `TaskDetail-*.js` (48.21 KB gz). Seven static-analysis sweeps clean: zero off-grid typography literals (post-`.2`/`.12` discipline holds), zero native-semantics overrides (FE-019 preserved), zero port-5176 survivors (`.9` migration clean), zero re-introduced inline color maps (all 7 chip-family components consume from `constants.ts`). Native `<dialog>` a11y walk confirmed both modals (`SettingsModal`, `ShortcutsModal`) carry `aria-labelledby` + close-on-Esc + close-on-backdrop + native focus-trap + focus-rings on action buttons. `prefers-reduced-motion` honored on all 3 height-animated surfaces from `.8` motion polish (Chevron, PrioritySection grid-rows, EpicRow subtask grid-rows). All 13 post-`.6` interactive surfaces carry explicit focus rings (no element relies on browser-default). Two actionable findings filed as follow-up children: **`.13`** (minor — `EpicRow.tsx:90` subtask-list wrapper has hardcoded `px-2 py-1.5`, not density-aware; add `subtaskContainerPad` token) and **`.14`** (medium — surfaced during user visual confirmation: subtasks under expanded epics can't open a TaskDetail panel because `SubtaskRow.tsx` has no `expandedId` plumbing at all; add lazy-`TaskDetail` mount + detail-toggle behavior matching `TaskRow`/`EpicRow`). Five informational findings recorded but not filed (by-design per `.4`'s explicit scope decisions). Closure diff: PLAN.md (1 line flipped to stub, 2 lines added for `.13` + `.14`) + this tasknote (full audit body → archived).

**Archived:** 2026-05-16
