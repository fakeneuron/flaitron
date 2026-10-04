---
title: status source-of-truth
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-EPIC-042, CORE-042.1, CORE-042.3]
---

# CORE-042.4 | status source-of-truth

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-042]] [[CORE-042.1]] [[CORE-042.3]]

## 🎯 Goal

Make the tasknote nav-header chip render-derived from YAML `status:` so Phase 4 closure flips 2 places (PLAN checkbox + YAML status) instead of 3, eliminating one source of sync drift.

## ✅ Acceptance

- [ ] `TaskDetail.tsx` renders a derived status chip from `tasknote.frontmatter.status` next to the priority badge in the meta-header row (5 states: starter / not-started / in-progress / blocked / completed)
- [ ] Phase 4 closure box "Updated nav header status icon to ✅ Completed" is removed from `SPEC.md` §"🚀 Phase 4: Closure" and `templates/tasknote-template.md`
- [ ] `SPEC.md` §"Tasknote body shape" describes the chip as render-derived (viz computes from YAML; markdown chip is hand-authored at transitions for editor parity, not flipped at closure)
- [ ] SPEC version bumped v0.7.0 → v0.8.0 (Thrust C close: covers CORE-042.3 frontmatter audit + this task)
- [ ] Existing viz tests pass; build clean; lint/typecheck clean on changed files
- [ ] User confirms chip render visually in viz

## 🧩 Subtasks

- [ ] Add `STATUS_CHIP` map + status-chip element to `viz/src/ui/TaskDetail.tsx` (5 states; placement next to priority badge)
- [ ] Verify existing `viz` tests still pass; add a small TaskDetail or tasknote test if a natural seam exists (otherwise rely on visual confirmation)
- [ ] Drop Phase 4 closure box from `templates/tasknote-template.md` (line 73)
- [ ] Drop Phase 4 closure box from `SPEC.md` §"🚀 Phase 4: Closure" (line 283)
- [ ] Rewrite `SPEC.md` §"Tasknote body shape" Nav-header bullet (line 196–199) to reflect render-derived semantics
- [ ] Bump `SPEC.md` version v0.7.0 → v0.8.0 + add changelog entry covering Thrust C close (frontmatter slim + status source-of-truth)
- [ ] Run targeted vitest suite on `viz`; run typecheck/lint on touched files
- [ ] Manual visual confirmation in the running viz dev server
- [ ] Phase 4 closure: flip PLAN.md `CORE-042.4` line to completed, archive tasknote, recap to user

## 🔗 Related

- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink)
- [[CORE-042.1]] — Discovery; §A6 Status read-site map scopes this task
- [[CORE-042.3]] — predecessor (Thrust C frontmatter audit; deferred SPEC v0.8.0 bump to this task's closure)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Status currently lives in 3 sources (YAML `status:` / PLAN checkbox / nav-header chip in markdown) and Phase 4 closure flips all 3. Sync drift is real and structurally avoidable: YAML stays canonical, PLAN checkbox stays canonical for roadmap binary, nav chip becomes render-derived (computed from YAML at viz parse time). Drops one closure write and removes one source of drift. Scope settled in [[CORE-042.1]] §A6.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source files in scope** (post-drift-check; line numbers shifted slightly post-CORE-042.3 but references all still valid):

- `viz/src/tasknote.ts` — already parses + enum-validates `status:` (`STATUS_VALUES` set; `parseFrontmatter` returns typed `TasknoteStatus`). No parser change needed.
- `viz/src/ui/TaskDetail.tsx` — currently renders a meta-header row with priority badge + completed-date + VS Code link. **Does not render a status chip today.** This is where the derived chip lands.
- `viz/src/parser.ts` — PLAN-line `[ ]` / `[x]` parsing (line 146) — out of scope (PLAN checkbox stays canonical).
- `SPEC.md` §"Tasknote body shape" line 196–199 — describes nav-header chip "updated at Phase 4 closure"; needs rewording for render-derived contract.
- `SPEC.md` §"🚀 Phase 4: Closure" line 283 — drop "Updated nav header status icon to ✅ Completed" box.
- `templates/tasknote-template.md` line 73 — drop the same Phase 4 box.
- `claude/skills/task/SKILL.md` Step 5 Phase 4 description — already doesn't enumerate the nav flip explicitly, but spot-check; Steps 3a/3c (line 99, 135) keep their chip writes (transitions still benefit from accurate manually-authored chip at state changes).
- `claude/skills/starter-task/SKILL.md` line 92 — keeps its chip authoring at filing.
- `SPEC/blocked.md` line 31, 45 — keeps chip transitions at park/resume.

**Status quo: the chip in the markdown body is hand-maintained at 4 transition points** (scaffold/promotion, park, resume, closure). The closure-flip is the only one being retired. The other transitions remain useful for editor parity (markdown editors that don't run the viz still see a roughly-current chip when the file is touched).

**Phase 4 box reduction:** 6 → 5 boxes. Phase 4 closure now writes 2 places (PLAN checkbox + YAML status), down from 3.

**SPEC version bump:** per CORE-042.3 closure note, this task carries the v0.7.0 → v0.8.0 bump (covers all of Thrust C: frontmatter audit + status source-of-truth in one bump).

**Archive skim findings:**

- [[CORE-017]] — original frontmatter introduction; established YAML `status:` as a field. No regressions to flag.
- [[CORE-023]] — `model:` retirement migration playbook; precedent for legacy-frontmatter tolerance via `parseFrontmatter`. Mirror pattern: dropping a Phase 4 box doesn't require a parser/test change since no field is being retired (just a procedural step).
- [[CORE-042.3]] — immediately preceding Thrust C work; dropped `priority:` and `area:` from frontmatter; deferred SPEC v0.8.0 to this task. No drift — all line numbers shifted by ~10 lines but references still resolve.

**Drift summary:** §A6 cites `viz/src/tasknote.ts:68` (status enum validation) and `:135` (parseTasknote returns frontmatter). Current file: validation at line 64; parseTasknote returns at line 132. Same code, ~3 lines shifted post-CORE-042.3 frontmatter slimming. No semantic drift.

**Acceptable inconsistency for archived tasknotes:** §A6 explicitly accepts that archived tasknotes may show `🟢 In progress` chip text inconsistent with `status: completed` YAML, since archives are write-once and the chip becomes a "stable historical signal" rather than canonical state. Viz renders the canonical state from YAML.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

**Pattern survey** — `viz/src/ui/ModelChip.tsx` and `BlockerChip.tsx` are the established chip-component shape: small functional component, single span/button, single Tailwind className. Mirrored that.

**Pre-existing finding (not in §A6 read-site map):** `viz/src/ui/TaskRowInner.tsx` already renders a derived status chip on each task row (lines 116–128, using `STATUS_BADGE` + `STATUS_LABEL` from `viz/src/ui/constants.ts`). So the *row chip* was already render-derived from YAML — the gap was the **detail panel** (TaskDetail.tsx), which had no chip. This task adds the detail-panel chip and consolidates Phase 4 closure semantics.

**Files touched:**
- `viz/src/ui/StatusChip.tsx` — new component; emoji-prefixed labels (`🟢 In progress` / `✅ Completed` / `⏸ Blocked` / `⚪ Not started` / `🌱 Starter`) matching the markdown nav-header style. Reuses `STATUS_BADGE` color map from `constants.ts`.
- `viz/src/ui/TaskDetail.tsx` — imports `StatusChip`; renders next to priority badge in the meta-header row when `tasknote?.frontmatter?.status` exists.
- `templates/tasknote-template.md` — dropped the Phase 4 closure box "Updated nav header status icon to ✅ Completed" (line 73).
- `SPEC.md` — dropped the same Phase 4 closure box (line 283); rewrote §"Tasknote body shape" Nav-header bullet (line 196–199) to reflect render-derived chip; bumped version v0.7.0 → v0.8.0.
- No new test file — chip is presentational, mirrors existing chip components which have no test files. Existing 54 tests still pass.

**Why two label maps** (TaskRowInner uppercase no-emoji vs StatusChip emoji-prefixed): the row chip is a compact summary; the detail-panel chip mirrors the markdown nav header (which uses emojis). Color map (`STATUS_BADGE`) is shared.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation
- [x] Fixed all introduced issues

**Testing Notes:**

- `npx vitest run` — 54/54 tests pass (parser.test.ts 29, tasknote.test.ts 25). No regressions.
- `npm run build` — `tsc --noEmit && vite build` clean. 399 modules transformed.
- Visual: confirmed the new `StatusChip` renders in `TaskDetail` for `CORE-036` (starter status). Screenshot: `/tmp/playwright-mcp/core-036-detail.png` shows `[Future Opportunities] [🌱 Starter] ... VS Code →` in the meta-header row.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed YYYY-MM-DD`)
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Closes Thrust C of [[CORE-EPIC-042]]: status source-of-truth simplified. The nav-header chip in the markdown body is no longer flipped at Phase 4 closure; instead the viz computes the canonical chip from YAML `status:` at render time. Phase 4 closure now writes 2 places (PLAN.md checkbox + YAML `status:`) instead of 3. Archived tasknotes intentionally show stale chip text — this tasknote is the first dogfood: the body header still says `🟢 In progress` while YAML and PLAN read `completed`. Viz renders the correct state.

**Files touched (8):**

- `viz/src/ui/StatusChip.tsx` — new component; emoji-prefixed labels (`🌱 / ⚪ / 🟢 / ⏸ / ✅`); reuses `STATUS_BADGE` color map from `constants.ts`.
- `viz/src/ui/TaskDetail.tsx` — renders `StatusChip` next to the priority badge in the meta-header when `tasknote?.frontmatter?.status` exists.
- `templates/tasknote-template.md` — dropped the Phase 4 closure box "Updated nav header status icon to ✅ Completed".
- `SPEC.md` — same Phase 4 box dropped; §"Tasknote body shape" Nav-header bullet rewritten to reflect render-derived semantics; version bumped v0.7.0 → v0.8.0.

**Pre-existing finding (worth noting for the audit `.7`):** the *row* chip in `viz/src/ui/TaskRowInner.tsx` was already render-derived from YAML `status:` (lines 116–128, using `STATUS_BADGE`/`STATUS_LABEL` from `constants.ts`). The §A6 read-site map didn't surface this because it focused on the markdown-body chip and the Phase 4 closure-flip writes. Net effect: only the **detail-panel** chip was missing render-derivation, and that gap is now closed.

**Decision rationale (locked in §A6 + this task's clarifying questions):**

- Viz renders chip in detail panel beside the priority badge (vs above as separate row, or skipped entirely).
- Markdown chip stays hand-authored at scaffold/promotion/park/resume for editor parity; only the closure-flip retires.
- Two distinct chip shapes coexist intentionally: row chip is summary-compact (uppercase, no emoji on most states); detail chip mirrors markdown nav-header (sentence-case, emoji-prefixed). Color map shared via `STATUS_BADGE`.

**SPEC v0.8.0 covers all of Thrust C** — frontmatter audit ([[CORE-042.3]]: dropped `priority:` + `area:`) + status source-of-truth (this task: render-derived chip + Phase 4 simplification). Tagging is out-of-band per existing flowtron release flow.

**Archived:** 2026-05-06
