---
title: emitter-glyph-propagation
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482, CORE-482.3]
blocked-by:
  - CORE-482.3
---

# CORE-482.4 | emitter-glyph-propagation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]]

## 🎯 Goal

Propagate the `[xheavy]`🔭 glyph into every hard-coded next-move-suggestion emitter and glyph-vocabulary restatement that CORE-482.3 deliberately deferred, so a `[xheavy]`-tagged PLAN.md line renders correctly everywhere the trio was previously hard-coded.

## ✅ Acceptance

- [x] Real next-move / model-signal render sites widened to the four-way glyph (`🔧`/`🧩`/`🧠`/`🔭`): `claude/skills/ft-task/SKILL.md` Step 6, `claude/skills/ft-micro-task/SKILL.md` (Step 1.5 gate + Step 6-equivalent), `claude/skills/ft-close-epic/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-worktree-start/SKILL.md` + its command wrapper, `SPEC/procedures/ft-task.md` (cue vocabulary list + next-move/copy-paste restatement)
- [x] Documentation label rows widened to four-way: `docs/PLATFORMS.md` (Grok/Codex/Cursor model-switch rows), `claude/CAPABILITIES.md` (`/model` row), `docs/GLOSSARY.md` ("copy-paste line" entry)
- [x] Automated ticket-filing recommendation lists (`ft-refactor`, `ft-audit`, `ft-audit-context`, `ft-audit-repo`) get an explicit "never `[xheavy]`" exclusion clause rather than the glyph itself — preserves the settled "automated choosers cap at `[heavy]`" contract (SPEC/model.md) while making the exclusion legible instead of silent
- [x] Codex/Cursor/Grok mirrors confirmed to carry zero restated glyph vocabulary (pure pointers) — no edit, finding logged
- [x] `ft-goal-task` Step 1.5 confirmed to not restate the trio inline (defers to the already-updated shared `step-1.5-model-edge.md` fragment) — no edit, finding logged
- [x] CI drift greps (wrapper-name invariant, shipped-skill parity, Pairs A/B/C) still pass after edits

## 🧩 Subtasks

- [x] Widen `SPEC/procedures/ft-task.md` — cue vocabulary list (~line 77) + next-move/copy-paste restatement (~lines 381-393)
- [x] Widen `claude/skills/ft-task/SKILL.md` Step 6 (next-move emit sentence + copy-paste helper, ~lines 181-182)
- [x] Widen `claude/skills/ft-micro-task/SKILL.md` Step 1.5 gate (~lines 73, 76) + Step 6-equivalent restatement (~line 136)
- [x] Widen `claude/skills/ft-close-epic/SKILL.md` next-move + copy-paste helper (~lines 233, 238)
- [x] Widen `claude/skills/ft-epic-discovery/SKILL.md` next-move + copy-paste helper (~lines 257, 258)
- [x] Widen `claude/skills/ft-worktree-start/SKILL.md` glyph-selection sentence (~line 131) + `claude/commands/ft-worktree-start.md` (~line 6)
- [x] Widen `docs/PLATFORMS.md` three model-switch rows (Grok ~390, Codex ~418, Cursor ~455)
- [x] Widen `claude/CAPABILITIES.md` `/model` row (~line 36)
- [x] Widen `docs/GLOSSARY.md` "copy-paste line" entry (~line 35)
- [x] Add explicit xheavy-exclusion clause to `ft-refactor` (~line 109), `ft-audit` (~line 70), `ft-audit-context` (~line 100), `ft-audit-repo` (~line 73)
- [x] Phase 3: CI drift greps locally, markdown mental-pass
- [x] Phase 4: doc-drift sweep, tick-through, PLAN stub flip (nested), archive

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)
- [[CORE-482.3]] — blocked-by: filed this task via its downstream-impact scan (xheavy-rung-round-up; completed 2026-08-27)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed by CORE-482.3's downstream-impact scan as the direct follow-up: `.3` added the `[xheavy]`🔭 rung to the tier vocabulary and the SPEC-layer cue tables but explicitly deferred every hard-coded emitter restatement to this task ("no emitter/parser code edits here" was `.3`'s own out-of-scope line). Nothing has moved since; `.3` archived today.

- [x] Read relevant source files — `SPEC/model.md` (full, post-`.3`), `SPEC.md` §"Operator-cue glossary" + §"Post-closure protocol" (post-`.3`, the canonical four-way wording to mirror), `SPEC/gates.md` (confirmed already fully widened by `.3`, no gaps), `claude/skills/ft-task/SKILL.md` (Step 1.5 already 4-way from `.3`; Step 6 still 3-way — confirms exact scope), `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-close-epic/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-refactor/SKILL.md`, `claude/skills/ft-audit{,-context,-repo}/SKILL.md`, `claude/skills/ft-worktree-start/SKILL.md`, `claude/commands/ft-worktree-start.md`, `claude/skills/ft-task/step-1.5-model-edge.md` (already 4-way, sets the "explicit exclusion clause" precedent), `claude/skills/ft-goal-task/SKILL.md` Step 1.5, `SPEC/procedures/ft-task.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/GLOSSARY.md`, `codex/procedures/ft-task.md` + `codex/skills/*/SKILL.md` (repo-wide grep — zero glyph content), `cursor/procedures/ft-task.md`, `grok/procedures/ft-task.md`

- [x] **Best Practices Review** — pure markdown contract-surface propagation, no code. Pattern to extend: mirror the exact wording `.3` already landed in `SPEC.md`'s post-closure protocol (the canonical four-way restatement — `[xheavy]🔭` labeled "rare — manual-only filings", glyph list `🔧/🧩/🧠/🔭`) into each hard-coded emitter restatement, rather than inventing new phrasing per site. For the automated-filing sites (ft-refactor/ft-audit family), extend `step-1.5-model-edge.md`'s already-established "Legacy entry" precedent ("Do not offer `[xheavy]` as an option") instead of adding the glyph — a different pattern for a different responsibility (rendering an existing tag vs. recommending a tag to file).

- [x] **Archive skim** — [[CORE-482.3]] (Discovery Notes name the exact deferred file list verbatim: "ft-task Step 6, ft-micro-task, ft-close-epic, ft-epic-discovery, ft-refactor, ft-audit, ft-audit-context, ft-audit-repo SKILL.md + codex mirrors + SPEC/procedures/ft-task.md + docs/GLOSSARY.md + the micro/goal Step 1.5 trio restatements"); [[CORE-482.1]] (scoping table — `[xheavy]` manual-only, round-up default); [[CORE-482.2]] (calibration table; left ft-stats/emitters untouched on purpose); [[CORE-353.6]] (the direct precedent for this exact shape of task — viz parser glyph-tolerance widening as its own child, filed as [[CORE-482.5]] here rather than folded in, per `.3`'s Scope ask resolution).

- [x] **Drift check** — `.3`'s deferred-list wording ("codex mirrors") turned out looser than the actual repo state: a repo-wide grep of `codex/`, `cursor/`, `grok/` finds **zero** restated glyph vocabulary anywhere — every per-platform procedure/skill file is a thin pointer to `SPEC/procedures/ft-task.md` or `claude/skills/*/SKILL.md`. So "codex mirrors" and "`SPEC/procedures/ft-task.md`" in the PLAN.md line name the same actual edit site, not two. No drift against the PLAN.md line's substance (all nine named surfaces are covered, several as "confirmed no-op" rather than an edit) — the PLAN.md line's `docs/PLATFORMS.md` + `claude/CAPABILITIES.md` clause matches Phase-4-deferred items named explicitly in `.3`'s own doc-drift sweep. One addition beyond the named list: `claude/skills/ft-worktree-start/SKILL.md` + its command wrapper carry the identical hard-coded three-way glyph-selection pattern (found via the same repo-wide grep) — same emitter category, not a new concern, included for completeness rather than leaving a known-matching gap.

- [x] Asked clarifying questions — none via AskUserQuestion; one design split resolved by reading the already-settled contract text rather than asking: SPEC/model.md's "automated choosers cap at `[heavy]`" rule (landed in `.3`) means the four ticket-*filing* recommendation sites (ft-refactor, ft-audit, ft-audit-context, ft-audit-repo) must NOT gain `[xheavy]` as a selectable option — the correct propagation there is an explicit exclusion clause (mirroring `step-1.5-model-edge.md`'s already-shipped "Do not offer `[xheavy]`" precedent), not the glyph itself. Logged as an explicit assumption rather than asked because it is directly derivable from committed SPEC text, not a judgment call.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Two edit shapes, same task:** (1) **render sites** — next-move suggestion emitters and glyph-vocabulary glossary/reference rows that describe an *existing* PLAN.md `[model]` tag — widened to the real four-way glyph, mirroring SPEC.md's already-landed canonical wording verbatim where the sentence shape matches. (2) **filing-recommendation sites** — automated ticket-filers that choose a tag to *write* — get a short explicit-exclusion clause instead, per the automated-choosers-cap-at-heavy contract.
- **No code changed** — every touched file is markdown (SKILL.md, command wrapper, SPEC/procedures, docs). Confirms this task's own [light] tag.
- **Confirmed no-ops (documented, not edited):** codex/cursor/grok procedure + skill wrappers (zero restated glyph content, pure pointers); `ft-goal-task` Step 1.5 (references the shared `step-1.5-model-edge.md` fragment rather than restating the category-tag list inline, so already correct post-`.3`); `SPEC/gates.md` (already fully four-way from `.3`, re-verified, no gaps found).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — reused SPEC.md's own already-landed four-way phrasing (post-closure protocol steps 2-3) as the template for every render-site edit rather than drafting new wording per file; reused `step-1.5-model-edge.md`'s "Do not offer `[xheavy]`" phrasing as the template for every filing-recommendation-site edit. No new shape introduced.

- [x] **Minimal refactor gate** — no refactor; every edit is a widening of an existing sentence/list to the already-settled four-rung vocabulary. `claude/skills/ft-worktree-start/SKILL.md` + its command wrapper included beyond the literal PLAN.md list because they carry the identical stale three-way pattern this task exists to fix — deferring a known-matching gap would just re-create the same follow-up shape `.3` itself produced.

- [x] Implemented the minimal solution — see Implementation Notes

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract surfaces; no executable behavior changed; CI drift greps are the executable check, run in Phase 3)

**Implementation Notes:**

- **`SPEC/procedures/ft-task.md`** — cue-vocabulary list gains `🔭`; next-move-candidate sentence and copy-paste-helper paragraph widened to the four-way glyph, mirroring SPEC.md §"Post-closure protocol" steps 2-3 wording (`[xheavy]🔭` rare/manual-only framing; glyph list `🔧/🧩/🧠/🔭`).
- **`claude/skills/ft-task/SKILL.md`** Step 6 — next-move emit sentence and copy-paste-helper parenthetical widened to four-way, same wording pattern.
- **`claude/skills/ft-micro-task/SKILL.md`** — Step 1.5 category-tag list + always-advisory-xheavy branch note added (mirrors `ft-task/SKILL.md` Step 1.5, already four-way from `.3`); Step 6-equivalent next-move/copy-paste restatement widened to four-way.
- **`claude/skills/ft-close-epic/SKILL.md`**, **`claude/skills/ft-epic-discovery/SKILL.md`** — next-move emit sentence + copy-paste-helper parenthetical widened to four-way in each.
- **`claude/skills/ft-worktree-start/SKILL.md`** — glyph-selection sentence widened from three-way to four-way (`🔭` for xheavy-appropriate tag); **`claude/commands/ft-worktree-start.md`** — the "🔧/🧩/🧠" mention in the wrapper's parenthetical widened to include 🔭.
- **`docs/PLATFORMS.md`** — the three per-platform "Model / session switch" rows (Grok Build, Codex CLI, Cursor) each widened from `[heavy]🧠 / [medium]🧩 / [light]🔧` to the four-way list.
- **`claude/CAPABILITIES.md`** — the `/model` row's emoji-signal description widened to four-way.
- **`docs/GLOSSARY.md`** — the "copy-paste line" entry's emoji primary label list widened to four-way.
- **`claude/skills/ft-refactor/SKILL.md`**, **`claude/skills/ft-audit/SKILL.md`**, **`claude/skills/ft-audit-context/SKILL.md`**, **`claude/skills/ft-audit-repo/SKILL.md`** — each filing-recommendation sentence gains a short trailing clause naming `[xheavy]` as never auto-filed (manual-only per `SPEC/model.md`), instead of adding the glyph as a choosable option.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed; ran the CI `drift` job's local greps instead

- [x] Ran lint/type-check on changed code — N/A, markdown only; mental-pass instead

- [x] **Quality assertions** — no duplication introduced (every render-site edit mirrors SPEC.md's single canonical four-way phrasing rather than inventing variants); no stale docs left among the touched set; public-surface growth is exactly the glyph-vocabulary widening the parent epic already authorized in `.3`, applied to the sites `.3` deferred; no code changed

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface (viz parser tolerance is [[CORE-482.5]])

**Testing Notes:**

- CI drift-job greps run locally: wrapper-name invariant (`claude/commands/ft-*.md` self-naming) — OK; claude↔codex shipped-skill parity — OK; Pair A/B/C description-flag + roster-clause checks — OK (edits are body-prose only, no frontmatter/description changes).
- Markdown mental-pass on every touched file: no residual bare three-way `🔧/🧩/🧠` list left where a four-way was intended; no trailing whitespace; wikilinks/backticks balanced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: no change (already four-way from `.3`) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change (no new Claude-specific surface introduced) · docs/PLATFORMS.md: **updated** (three model-switch rows) · claude/CAPABILITIES.md: **updated** (`/model` row) · docs/AGENT-COMPAT.md: no change · docs/EXTERNAL-AGENTS.md: no change · docs/WORKTREES.md: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.4` line flipped to stub form and kept 2-space nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Final Summary:**

Propagated the `[xheavy]`🔭 glyph — added to flowtron's tier vocabulary by [[CORE-482.3]] but deliberately left out of every hard-coded emitter restatement — into thirteen files across two edit shapes. **Render sites** (next-move suggestion emitters that describe an existing PLAN.md `[model]` tag) were widened to the real four-way glyph list `🔧/🧩/🧠/🔭`, mirroring SPEC.md's already-landed canonical wording: `claude/skills/ft-task/SKILL.md` Step 6, `claude/skills/ft-micro-task/SKILL.md` (Step 1.5 gate + Step 6-equivalent), `claude/skills/ft-close-epic/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-worktree-start/SKILL.md` + its command wrapper (found via repo-wide grep — same stale pattern, not in the literal PLAN.md list but the same emitter category), `SPEC/procedures/ft-task.md` (cue list + next-move restatement), `docs/PLATFORMS.md` (Grok/Codex/Cursor rows), `claude/CAPABILITIES.md`, and `docs/GLOSSARY.md`. **Filing-recommendation sites** (`ft-refactor`, `ft-audit`, `ft-audit-context`, `ft-audit-repo`) — where an automated tool chooses a tag to *write*, not render — instead gained an explicit "never `[xheavy]`" exclusion clause, preserving SPEC/model.md's settled "automated choosers cap at `[heavy]`" rule rather than contradicting it; this mirrors the exclusion-clause precedent `step-1.5-model-edge.md` already shipped in `.3`. Confirmed-and-documented no-ops: codex/cursor/grok procedure and skill wrappers carry zero restated glyph content (pure pointers to `SPEC/procedures/ft-task.md` / `claude/skills/*/SKILL.md`); `ft-goal-task` Step 1.5 defers to the shared fragment rather than restating the category list inline; `SPEC/gates.md` was already fully four-way from `.3`. No code changed — every edit is markdown prose. Verification: CI drift-job greps run locally (wrapper-name, shipped-skill parity, Pairs A/B/C — all clean); markdown mental-pass found no residual bare three-way lists. Docs verdict: PLATFORMS.md + CAPABILITIES.md updated as deliverable; 15 remaining AI-referenced docs unchanged. This closes the deferred-scope loop `.3` opened; the sibling deferred child [[CORE-482.5]] (viz parser tolerance) and the epic-closing [[CORE-482.N]] audit remain.

**Archived:** 2026-08-27
