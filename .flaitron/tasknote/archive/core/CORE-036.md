---
title: PLAN.md Completed section archive strategy
status: completed
tags: []
created: 2026-05-05
due:
related-tasks: [CORE-037, CORE-040]
---

# CORE-036 | PLAN.md Completed section archive strategy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-037]] [[CORE-040]]

## 🎯 Goal

Choose and implement an archive strategy for PLAN.md's `## Completed` section to bound its unbounded growth (currently ~91% of PLAN.md tokens, paid on every workflow read).

## ✅ Acceptance

- [ ] All 47 entries in `_project/PLAN.md` `## Completed` follow the stub form: `- [ ] / - [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.`
- [ ] Every migrated entry has a non-empty `| shortname` segment (legacy entries that lacked one get a derived shortname)
- [ ] Original `[model]` and `Completed YYYY-MM-DD` date preserved verbatim per entry; legacy entries without `[model]` stay without (no retroactive guessing)
- [ ] `templates/PLAN.md` example line updated to the stub shape so adopting projects pick up the convention on next version bump
- [ ] `SPEC.md` documents the convention in a new sub-section (location TBD in pattern survey — likely under §"When to use a tasknote" parallel to §"PLAN.md filing-discipline thresholds")
- [ ] `SPEC.md` §"📝 Phase 4: Closure" + `claude/skills/task/SKILL.md` Step 5 Phase 4 language updated so the closure step writes the stub form (hardlinked SKILL.md edits land in both `.claude/` and `claude/` paths atomically per [[CORE-038]])
- [ ] viz tests pass (54/54) — parser already handles stub form per Discovery; verify empirically
- [ ] `tsc --noEmit` clean in `viz/`
- [ ] Visual confirmation in viz: Completed-section rows render correctly with shortnames as titles, `completedDate` chip present
- [ ] Token-cost recap measured at closure (PLAN.md before/after word count) and recorded in Final Summary
- [ ] SPEC version bump decision staged for closure recap (minor candidate v0.9.1 → v0.10.0; user decides whether to bundle a v1.0 cut here or defer)

## 🧩 Subtasks

- [ ] **Pattern survey** — locate the right home in `SPEC.md` for the new convention (parallel to §"PLAN.md filing-discipline thresholds" under §"When to use a tasknote", or a new top-level section). Confirm the closure-protocol language hooks point at the new convention.
- [ ] **Draft shortname assignments** for the ~12 legacy entries lacking `| shortname` (CORE-001–006, CORE-013–015, CORE-021, CORE-026, CORE-025, FE-001, FE-005, plus any others surfaced during migration). Derive from existing long-descriptions; surface for review.
- [ ] **Migrate `_project/PLAN.md`** — rewrite all 47 `## Completed` entries to the stub form, preserving `[model]`, newly-assigned-or-existing `| shortname`, and original `Completed YYYY-MM-DD` date. Keep checkbox `- [x]`.
- [ ] **Update `templates/PLAN.md`** — change line 32 example to the stub form so adopting projects see the new shape.
- [ ] **Add the convention to `SPEC.md`** — new sub-section per pattern survey decision, with the canonical stub-form example and a one-line cross-reference back to §"📝 Phase 4: Closure".
- [ ] **Update closure-protocol language** — `SPEC.md` §"📝 Phase 4: Closure" + `claude/skills/task/SKILL.md` Step 5 Phase 4 phrasing now explicitly produces the stub form. Verify hardlink atomicity.
- [ ] **Run viz tests** — `cd viz && npm test` against the migrated PLAN.md; expect 54/54 pass (parser already supports the form).
- [ ] **Run `tsc --noEmit`** in `viz/`.
- [ ] **Visual confirmation** — start viz dev server (or run existing instance), inspect the Completed section: stubs render with shortname as title, completedDate chip visible, model chip visible where present.
- [ ] **Measure token-cost delta** — `wc -w _project/PLAN.md` before/after; record in Final Summary along with Completed-section share before/after.
- [ ] **SPEC version bump** — propose v0.9.1 → v0.10.0 (minor; additive convention + template change). Release tag deferred to follow-up per established precedent.

## 🔗 Related

- [[CORE-037]] — workflow token-cost audit that filed this task; identified the Completed-section bloat
- [[CORE-040]] — active-section filing discipline (orthogonal layer; same audit conversation)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User-prompted via `/task CORE-036`. Token-cost case is stronger than at filing — `## Completed` grew from ~78% to ~91% of PLAN.md (5,536w / 47 entries). Strategy (b) minimal stub delivers ~5,000w savings on every workflow read, several times the entire CORE-EPIC-042 architecture push. Parser already supports the form; no code changes required.

- [x] Read relevant source files — `viz/src/parser.ts` (TASK_LINE regex makes long description optional; `cleanDescription` strips the `Completed YYYY-MM-DD.` marker; row-title preference is shortname > description), `templates/PLAN.md` (single example line at L32), starter-block context preserved above.
- [x] **Archive skim** — closest precedents: [[CORE-035]] (single-pass cleanup of a drift-prone PLAN.md line + matching template edit, no SPEC change); [[CORE-040]] (added §"PLAN.md filing-discipline thresholds" sub-section to SPEC + skills + sweep — explicitly carved Completed-section out of scope, "see CORE-036"); [[CORE-024]] (long-description wikilinks contribute to `Task.relatedTasks` — option (b) sacrifices this for completed entries; downstream impact on [[FE-012]] inbound-chip work is minor since that's active-row-driven); [[CORE-038]] (SKILL.md hardlink atomicity); [[CORE-031]] (template-touching change → minor SPEC bump precedent).
- [x] **Drift check** — Cited paths verified extant (templates/PLAN.md, viz/src/parser.ts, docs/MIGRATION.md, SPEC.md sections). Stale stats updated above. Starter's "Open at promotion" Q3 (parser parseability) resolved empirically: stub form parses cleanly with `completed=true`, `completedDate` extracted, shortname carrying the row title.
- [x] Asked clarifying questions — two AskUserQuestion calls resolved: (1) preserve starter block under Discovery Notes; (2) strategy = (b) minimal stub + (3) migration = in-flight + template update.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Drift surfaced at promotion (2026-05-07)

The starter's measurements have grown significantly since filing:

| Metric | Starter (2026-05-05) | Now (2026-05-07) | Δ |
|---|---|---|---|
| PLAN.md total | ~4,100w | 6,063w | +48% |
| `## Completed` section | ~3,200w | 5,536w | +73% |
| Completed share of PLAN.md | ~78% | ~91% | +13pp |
| Completed entry count | 41 | 47 | +6 |

Most of the growth is the `CORE-EPIC-042` closure burst (10 children, ~1,300w combined). Direction is unchanged; case is stronger.

All cited paths verified extant: `_project/PLAN.md`, `templates/PLAN.md`, `viz/src/parser.ts`, `docs/MIGRATION.md`, SPEC.md §"Versioning" / §"Layout in adopting projects".

### Starter context (preserved verbatim)

> _Captured 2026-05-05 during the [[CORE-037]] workflow token-cost audit — promote to full tasknote at `/task` checkout. Originally filed inline in PLAN.md; converted to starter as part of [[CORE-040]] dogfood pass._
>
> **Why this exists**
>
> The `## Completed` section in `_project/PLAN.md` grows unboundedly and is pulled into AI context every workflow read, paying token cost regardless of recency. The [[CORE-037]] audit measured this section at ~3,200 words / **~78% of PLAN.md's total tokens** (41 entries × 200-450w average). Many entries are paragraph-length duplicates of their archived tasknote summaries. The active-task index is ~1,200w; the rest is history.
>
> **Solution shape**
>
> Three candidate approaches — Discovery should compare and pick:
>
> - **(a) Periodic rollup** — at a cadence (monthly? per-tag? when threshold hit), move the oldest completed entries to `_project/PLAN-archive.md` or `_project/archive/PLAN-YYYY-MM.md`. PLAN.md keeps recent history; older context is one click away.
> - **(b) ID + completion-date stub** — completed entries collapse to one line: `- [x] **TASK-ID** — completed YYYY-MM-DD. See archive/<area>/<TASK-ID>.md.` Full long-description lives only in the archived tasknote. Maximum compression; preserves cross-reference accessibility.
> - **(c) Age- or size-based truncation** — keep the last N completed entries (or last N weeks) in PLAN.md verbatim, truncate older with a "see archive" pointer. Hybrid.
>
> Each has a token-impact estimate worth computing in Discovery.
>
> **Files to touch (preliminary survey — drift-check at promotion)**
>
> - `_project/PLAN.md` — primary target
> - `templates/PLAN.md` — propagate the new `## Completed` shape to adopting projects
> - `viz/src/parser.ts` — verify completed-section parsing still works after the chosen shape lands; add archive-source parsing if option (a)
> - `SPEC.md` §"Versioning" / §"Layout in adopting projects" — document the convention if it's adopting-project-facing
> - `docs/MIGRATION.md` — add a section on the migration if (a) or (b) requires adopting-project action
>
> **Explicitly out of scope**
>
> - Active-section filing discipline ([[CORE-040]] covers that — orthogonal layer)
> - Per-entry word-count convention for new completed entries (downstream of whichever strategy is picked)
>
> **Open at promotion (Phase 1 should resolve)**
>
> - Which strategy? Lean toward (b) for simplicity — the archived tasknote already holds the full record; PLAN.md doesn't need to duplicate.
> - If (a): rollup cadence, threshold, naming convention.
> - If (b): is the stub line still parseable by viz? Does `Task.completed = true` survive without the long-form completion summary?
> - Backwards compatibility — does this require a one-time migration of the existing 41 entries, or apply prospectively only?

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling decision: new sub-section §"`## Completed` archive convention" added under §"When to use a tasknote", parallel to existing §"PLAN.md filing-discipline thresholds" (active-line discipline + completed-line discipline pair naturally; existing "see CORE-036" cross-ref retired in favor of "see §`## Completed` archive convention"). Closure-protocol prose (SPEC §"📝 Phase 4: Closure" + `claude/skills/task/SKILL.md` Step 5 Phase 4) extended to cite the new convention. No parser change needed — existing `parser.ts` regex already supports the stub form.
- [x] Implemented the minimal solution — 4 files touched: `SPEC.md` (+ new sub-section, updated cross-ref); `claude/skills/task/SKILL.md` (Step 5 Phase 4 prose; hardlinked atomically with `.claude/` path); `templates/PLAN.md` (single example line at L32); `_project/PLAN.md` (full migration of all 56 Completed entries).
- [x] Updated/added tests for non-trivial behavior — N/A; the convention is a content+doc change, not a code change. Parser already supports the stub form per Discovery's empirical check.

**Implementation Notes:**

- **PLAN.md migration scope:** all 56 Completed entries rewritten. ~22 legacy entries (CORE-001–006, CORE-007, CORE-008, CORE-010–015, CORE-017, CORE-018, CORE-020, CORE-021, CORE-022, FE-001, FE-004, FE-005) lacked `| shortname` and gained one derived from existing long-descriptions. CORE-EPIC-042 normalized from "Closed" to "Completed" prefix (regex parser only matches "Completed" for `completedDate` extraction).
- **One pre-existing parser quirk fixed in-flight:** FE-007's existing shortname `viz refactor — split App.tsx` contained a literal ` — ` separator that the non-greedy parser interpreted as the shortname/description boundary (taking only "viz refactor" as shortname). Migrated to `viz refactor: split App.tsx` (colon avoids the parser quirk; row title now reads informatively).
- **Original entry order preserved + epic-children indentation kept.** Did not flatten or re-sort; the file's existing manual ordering was respected.
- **Token-cost result:** PLAN.md 6,063w → 1,114w (**−4,949w / −81.6%**); `## Completed` section 5,536w → 587w (**−89.4%**). Savings hit on every workflow read — several times the entire CORE-EPIC-042 architecture push (~12.6% structural).

### Coherence audit (user-prompted)

Grepped `Phase 4|Completed YYYY-MM-DD|flip.*PLAN|## Completed` across `SPEC.md`, `SPEC/`, `claude/`, `templates/`, `docs/`, `README.md`. Three drift sites surfaced and fixed:

- **`claude/skills/micro-task/SKILL.md:113` (critical)** — closure step still said `flip the line to '...| shortname — <description>. Completed YYYY-MM-DD.'`, instructing the AI to keep the long description. Without this fix, every future micro-task closure would have produced non-conforming entries. Updated to instruct the stub form + cite `SPEC §"## Completed archive convention"`.
- **`SPEC.md:285` Phase 4 closure box** — generic `flipped to 'Completed YYYY-MM-DD'` with no pointer to the new convention. Updated to `flipped to stub form 'Completed YYYY-MM-DD.' (see §"## Completed archive convention")`. Discoverable from the checkbox.
- **`templates/tasknote-template.md:69`** — same generic phrasing as SPEC; mirrored to keep template + spec in sync (the box copies into every new tasknote).

**Files left alone (verified consistent):**
- `claude/skills/task/SKILL.md:134` — already updated in Phase 2.
- `claude/skills/starter-task/SKILL.md` — no closure-flip language (starters file new tasks, don't close).
- `claude/skills/new-project/SKILL.md` — scaffolds from `templates/PLAN.md`, which now ships stub-form example.
- `claude/CLAUDE-snippet.md`, `templates/tasknote-README.md`, `README.md`, `docs/MIGRATION.md` — no closure-protocol prescriptions; only generic "Phase 4" mentions which remain accurate.
- `SPEC.md:95` task-line grammar row — describes the long-description column generally; the new convention specializes for `## Completed` entries. Tension is intentional and tolerable.
- `SPEC/blocked.md` — describes parked-state semantics; orthogonal to closure protocol.
- `viz/src/parser.ts` — parser already supports stub form (54/54 pass, tsc clean re-verified post-fix).

**Result:** `/task`, `/micro-task`, and the canonical Phase 4 box all point at the same convention. Future closures across all three paths will produce stub-form entries.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `viz/` 54/54 pass (parser.test.ts 29, tasknote.test.ts 25); re-verified post-coherence-audit fixes.
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` clean (also re-verified).
- [x] (frontend) Asked the user for visual confirmation — user surfaced a real latent gap: viz never consumed `_project/tasknote/archive/<area>/`, so completed rows fall back to rendering `task.description` (PLAN.md long-description). After migration that's empty, leaving an empty click-expansion. Pre-existing latent issue (any tasknote-less completed row was always broken the same way) but the migration exposes it broadly. Filed [[FE-016]] as the proper fix; does not block this closure.

**Testing Notes:**

Parser handles the stub form transparently — no test failures, no regressions. The PLAN.md change is content-only; no code paths exercised differently. Coherence-audit fixes (micro-task SKILL, SPEC + template Phase 4 boxes) verified via second test pass + grep sweep.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — SPEC.md version v0.9.1 → v0.10.0; new §"`## Completed` archive convention" sub-section; closure-protocol prose updated in `/task` SKILL Step 5, `/micro-task` SKILL Step 4, SPEC + template Phase 4 checkbox texts; `templates/PLAN.md` example updated; FE-016 follow-up filed.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-07.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`. **Dogfood:** this is the first stub-form entry written under the new convention.
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

PLAN.md `## Completed` section migrated to stub form per chosen option (b) Minimal stub. **56 entries** rewritten in place: full paragraph closure summaries collapsed to `- [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.` Token cost: PLAN.md **6,063w → 1,114w (−81.6%)**; `## Completed` section **5,536w → 587w (−89.4%)** — savings paid on every workflow read, several times the entire CORE-EPIC-042 architecture push (~12.6% structural).

New SPEC.md §"`## Completed` archive convention" codifies the contract under §"When to use a tasknote", parallel to §"PLAN.md filing-discipline thresholds". Closure-protocol prose updated in three places — `/task` SKILL Step 5, `/micro-task` SKILL Step 4, SPEC + template Phase 4 checkbox text — all citing the new convention. SPEC v0.9.1 → **v0.10.0** (minor — additive convention + template-touching change per [[CORE-031]]/[[CORE-040]] precedent; v1.0 still deferred per [[CORE-042.1]] audit's separate bundling intent). Release tag deferred to follow-up.

Two load-bearing findings during execution:

1. **User-prompted coherence audit** caught a critical drift in `claude/skills/micro-task/SKILL.md:113` — closure step still instructed `flip the line to '... | shortname — <description>. Completed YYYY-MM-DD.'`, which would have produced non-conforming entries on every future `/micro-task` close. Fixed in the same task. Pattern survey scoped narrowly to "where does the new convention live in SPEC" missed enumerating downstream callsites; flagging this as a process lesson for future convention-introducing tasks (a closing skill-side audit pass parallel to [[CORE-042.8]] would catch this reliably).
2. **User-surfaced latent UX gap** in viz: completed rows show empty click-expansion because viz only reads `_project/tasknote/` (active dir), never `_project/tasknote/archive/<area>/`. Pre-existing — any tasknote-less completed row (CORE-026, CORE-035, CORE-013–015) was always broken the same way; the migration broadens the symptom from a few rows to all of them. Filed [[FE-016]] (viz consume archive — `/api/archive` endpoint, merge in loader, distinguish 'never had tasknote' from 'archived'). The starter explicitly flagged this open question under "If (b): is the stub line still parseable by viz?" — I answered the parser side empirically but underweighted the rendering half; would file the FE follow-up at promotion next time.

Drive-by mechanical fix: FE-007's existing shortname `viz refactor — split App.tsx` had a literal ` — ` separator that the non-greedy parser collapsed to `viz refactor`. Migrated to `viz refactor: split App.tsx` (colon avoids the parser quirk; row title now reads informatively).

Pattern survey + execution kept tight: 4 files touched (`SPEC.md`, `claude/skills/task/SKILL.md`, `claude/skills/micro-task/SKILL.md`, `templates/tasknote-template.md`) plus the migrated `_project/PLAN.md` and the example line in `templates/PLAN.md`. No code changes required — `viz/src/parser.ts` regex already supported the stub form (long description is optional). 54/54 viz tests pass + tsc clean both pre- and post-coherence-fix.

**Archived:** 2026-05-07
