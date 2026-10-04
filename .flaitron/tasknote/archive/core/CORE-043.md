---
title: release v1.0.0
status: completed
tags: []
created: 2026-05-07
due:
related-tasks: [CORE-028]
---

# CORE-043 | release v1.0.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-028]]

## 🎯 Goal

Cut flowtron v1.0.0 — wire all three slash commands into the adoption path, finalize the SPEC contract, and ship an annotated release tag with migration notes from v0.4.0.

## ✅ Acceptance

- [x] CLAUDE-snippet, new-project SKILL, and MIGRATION §1.2/§1.7 all wire **three** slash commands (`/task` + `/starter-task` + `/micro-task`) — three symlinks, three readlink checks
- [x] `SPEC/versioning.md` major-bump example reworded off `v0.x.y → v1.0.0` (so v1.0 isn't its own self-fulfilling example)
- [x] `SPEC.md` Version line bumped `v0.10.0` → `v1.0.0`
- [x] `_project/FUTURE.md` gitignored as personal scratchpad (FE-002 + CORE-041 already cover the public-facing "future work" surface in PLAN.md)
- [x] `_project/tasknote/archive/frontend/FE-015.md` staged for the closure commit
- [x] Annotated tag `v1.0.0` message drafted (executes at post-closure); migration block calls out the three-symlink wiring as the only adopter-side action
- [x] Adopters: no tasknote-format migration required (additive — new symlinks; existing `/task` wiring unchanged)

## 🧩 Subtasks

- [x] Update `claude/CLAUDE-snippet.md` symlink wiring: three commands, three skills
- [x] Update `claude/skills/new-project/SKILL.md` Step 3 (wire) + Step 7 (`git add`) + Step 8 (verify readlinks) for three commands
- [x] Update `docs/MIGRATION.md` §1.2 + §1.6 + §1.7 to reflect three-symlink wiring
- [x] Reword `SPEC/versioning.md` lines 8–14 major-bump example to a `v1.x → v2.0.0` hypothetical (also rebased patch/minor examples off `v0.x` → `v1.x`)
- [x] Bump `SPEC.md` Version `v0.10.0` → `v1.0.0`
- [x] Add `_project/FUTURE.md` to `.gitignore`
- [x] Stage `_project/tasknote/archive/frontend/FE-015.md` for the closure commit
- [x] Phase 3 sanity — `cd viz && npx tsc --noEmit` clean; `npx vitest run` 54/54 pass
- [x] Phase 4: PLAN.md stub flip, archive tasknote, user recap; then commit + `git tag -a v1.0.0` + push (post-closure)

## 🔗 Related

- [[CORE-028]] — release v0.4.0 (precedent for release tasknote shape + annotated tag flow)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly requested v1.0 stamp after a pre-audit pass that surfaced three must-fix items + housekeeping. All four decision points (wire all three slash commands; FUTURE.md by judgement; commit FE-015; file CORE-043 via /task) authorized in this session. No drift in scope.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — All cited paths exist on disk: `claude/CLAUDE-snippet.md`, `claude/skills/new-project/SKILL.md`, `docs/MIGRATION.md` §1.2 + §1.7, `SPEC.md` line 3 (Version), `SPEC/versioning.md` line 13 (`v0.x.y → v1.0.0` example), `_project/tasknote/archive/frontend/FE-015.md` (untracked, on disk), `_project/FUTURE.md` (untracked, on disk). v0.4.0 tag exists with annotated message in expected shape (verified via `git for-each-ref`). No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings.** Greppped `_project/tasknote/archive/core/` for tasknotes touching `MIGRATION.md|CLAUDE-snippet|new-project|versioning.md|SPEC.md`:

- **CORE-028** — release v0.4.0. Canonical release-tasknote precedent. Frontmatter (`title: release vX`, `related-tasks: [CORE-027, FE-006, ...]`), Acceptance/Subtasks shape, and annotated-tag-message structure (title → SPEC contract status → "Changes since vX" grouped by area → Migration block → migration paragraph) all patterned here. CORE-043 mirrors it.
- **CORE-027** — landed `/starter-task` slash command + skill. `claude/commands/starter-task.md` and `claude/skills/starter-task/SKILL.md` ship in the submodule; wiring just needs symlinks.
- **CORE-042.5** — landed `/micro-task` similarly. Same symlink shape.
- **CORE-042.2** — modularized SPEC into `SPEC/` subdir. The layout we're stamping at v1.0.
- **CORE-042.9** — SKILL-side lazy-load. Doesn't change the wiring footprint — `/task` is still one symlink to `claude/skills/task/`; the lazy fragments live inside that dir.
- **CORE-036** — stub-form `## Completed`. Already enforced.
- **CORE-040** — filing-discipline thresholds. CORE-043 PLAN.md long description = 39 words, comfortably under the 50-word target.

No prior decision blocks v1.0. The contract surface introduced by CORE-EPIC-042 (modular SPEC + lazy-load) is internally consistent and ready to be stamped.

**Range to summarize in tag message** (commits in v0.4.0..HEAD): CORE-029 epic lifecycle, CORE-030 blocked phase, CORE-031 archive skim, CORE-032 starter promotion verification, CORE-033 legacy/ extraction, CORE-034 priority-name reconciliation, CORE-035 retire "Last updated:", CORE-037 token-cost audit, CORE-038 task SKILL.md cite-don't-restate, CORE-039 SPEC prose tightening, CORE-040 filing-discipline thresholds, CORE-036 stub-form ## Completed, CORE-EPIC-042 (.1–.9), FE-007 viz refactor, FE-008 row-density, FE-011 auto-refresh, FE-013 viz polish, FE-015 filter chips, FE-016 viz consume archive, FE-009 viz dark mode. Plus this CORE-043.

**Assumptions (no clarifications needed):**

1. `_project/FUTURE.md` → gitignore (best judgement). It's a personal scratchpad with already-stale entries (dark mode ✅, frontmatter ✅, wikilinks ✅); the public-facing "future work" surface is FE-002 + CORE-041 in PLAN.md `Future Opportunities`.
2. Adopting projects already wired with the v0.4.0 (or any prior v0.x) symlink-set will need to add two new symlinks at bump time. This is the only adopter-side action for the v1.0 bump — additive, mechanical. Tag message should call this out under "Migration for adopting projects".
3. v0.5–v0.10 intermediate tags will not be backfilled. Single v1.0.0 tag covers v0.4.0 → v1.0.0. Tag message acknowledges the gap.
4. Annotated tag follows v0.4.0 message structure (already verified shape).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — every change extends an existing pattern: 3-symlink expansion mirrors the v0.4.0-era 2-symlink wiring; SPEC version bump is a single line; `SPEC/versioning.md` example reword preserves the existing `patch / minor / major` shape; `.gitignore` add follows the existing one-line-per-pattern convention. No new shape introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc + version-bump release task; no code changes)

**Implementation Notes:**

Edits, in order:

1. `claude/CLAUDE-snippet.md` — paste-block adds one bullet describing `/starter-task` + `/micro-task` (cites SPEC §"When to use a tasknote"); wiring section grows from 2 symlinks to 6 (three commands × {command, skill}); verify line mentions all three.
2. `claude/skills/new-project/SKILL.md` — Step 3 wires all six symlinks; Step 7 stages all six explicitly in `git add` (preserving the explicit-paths-not-`-A` discipline); Step 8 verifies all six readlinks; hand-off message mentions the three commands.
3. `docs/MIGRATION.md` §1.2 — header retitled `Wire /task, /starter-task, /micro-task`; new intro paragraph names all three commands; symlink block grows to six. §1.6 `git add` stages all six. §1.7 verify mentions all three slash commands.
4. `SPEC/versioning.md` line 8–14 — patch/minor/major examples shifted from `v0.x → v0.x+1` / `v0.x.y → v1.0.0` (where v1.0.0 was the example) to `v1.x.y → v2.0.0` so the v1.0 release isn't its own self-fulfilling example.
5. `SPEC.md` line 3 — `**Version:** v0.10.0` → `**Version:** v1.0.0`. Status line unchanged (`Stable`).
6. `.gitignore` — added `_project/FUTURE.md` after `SCRATCH.md` (treat as personal scratchpad; FE-002 + CORE-041 in PLAN.md `Future Opportunities` cover the public-facing surface).

Two house-keeping items deferred to the closure commit (not file edits): staging `_project/tasknote/archive/frontend/FE-015.md` (closure leftover from FE-015's archive flow) and the CORE-043 closure paperwork (PLAN.md flip + tasknote archive move).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npx vitest run` → 54/54 passed (parser + tasknote suites; no grammar change but confirmed nothing parsed broke).
- [x] Ran lint/type-check on changed code — `cd viz && npx tsc --noEmit` → clean. SPEC/MIGRATION/snippet edits are markdown-only; no other lint pipeline.
- [ ] (frontend) Asked the user for visual confirmation — N/A (no UI change).

**Testing Notes:** All tests pass. The doc + version edits don't touch parser or runtime code; the test run is a sanity confirmation, not a regression gate.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — SPEC.md, SPEC/versioning.md, CLAUDE-snippet.md, new-project SKILL.md, MIGRATION.md all updated this phase. README.md and PHILOSOPHY.md left as-is (PHILOSOPHY's "v0.1.0 first cut" reads as historical context; README still accurate).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-07.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Cut flowtron v1.0.0 — the contract-stability stamp. Three slash commands (`/task`, `/starter-task`, `/micro-task`) now wire identically across CLAUDE-snippet, new-project SKILL, and MIGRATION; SPEC bumped v0.10.0 → v1.0.0 and `SPEC/versioning.md` major-bump example rebased off v1.0 so v1.0 isn't its own example. Housekeeping: FE-015 archive committed (closure leftover), `_project/FUTURE.md` gitignored as personal scratchpad. Annotated tag `v1.0.0` cut at the closure commit summarizes v0.4.0 → v1.0.0 (CORE-EPIC-042 modular SPEC + lazy-load, starter, micro, blocked phase, epic lifecycle, archive skim, stub-form `## Completed`, viz dark mode + consume archive); intermediate v0.5–v0.10 tags intentionally not backfilled. Adopters: only action is adding two new symlinks for `/starter-task` + `/micro-task`; existing `/task` wiring unchanged.

**Archived:** 2026-05-07
