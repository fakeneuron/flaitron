---
title: release v5.8.0
status: completed
tags: []
created: 2026-07-03
due:
related-tasks: [FE-EPIC-063, FE-064, FE-065, FE-066, CORE-EPIC-328, CORE-EPIC-329, CORE-EPIC-330, CORE-331, CORE-327]
---

# CORE-332 | release v5.8.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-EPIC-063]] [[FE-064]] [[FE-065]] [[FE-066]] [[CORE-EPIC-328]] [[CORE-EPIC-329]] [[CORE-EPIC-330]] [[CORE-331]] [[CORE-327]]

## 🎯 Goal

Cut flowtron v5.8.0 minor release tagging FE-EPIC-063 (viz PLAN grammar/search/grouping resilience), FE-064–066 (viz render resilience, dedup cleanup, glyph tolerance), CORE-EPIC-328 (agent-CC alignment + autonomous-loop guidance), CORE-EPIC-329 (adopter-surface sync + new logo), CORE-EPIC-330 (loop-integration + `/ft-goal-task`), and CORE-331 (loop doc-sync) since v5.7.2.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.7.2` → `v5.8.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.7.2` → `v5.8.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.7.2` → `v5.8.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.7.2` → `v5.8.0`
- [ ] `viz/package.json` `"version"` bumped `"5.7.2"` → `"5.8.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.8.0`, or recorded `skipped @ v5.8.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-332 — flowtron v5.8.0 (...)` commit lands
- [ ] Annotated `v5.8.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-332.md`

## 🧩 Subtasks

- [ ] 1. Read SPEC.md:3 + MIGRATION.md + SECURITY.md + constants.ts pin locations
- [ ] 2. Archive skim — CORE-327, CORE-325 for release shape
- [ ] 3. Adopter-impact classification of commits since v5.7.2
- [ ] 4. Apply 5 version edits (SPEC · MIGRATION · SECURITY · constants.ts · package.json)
- [ ] 5. Dogfood gate — resolve every dogfooded row (refresh or skip)
- [ ] 6. Phase 3 lint/test pass (viz package scripts)
- [ ] 7. ft-audit-docs doc-drift sweep
- [ ] 8. Draft + review annotated tag message
- [ ] 9. Commit + tag + push (📦 gate)

## 🔗 Related

- [[FE-EPIC-063]] — viz PLAN grammar/search/grouping resilience
- [[FE-064]] — viz-render-resilience (per-row ErrorBoundary, SSE reconnect, vscode path guard)
- [[FE-065]] — viz-dedup-orphan-cleanup
- [[FE-066]] — viz-plan-grammar-glyph-tolerance
- [[CORE-EPIC-328]] — agent-CC alignment (memory positioning, skill-description dispatch audit, autonomous-loop guidance)
- [[CORE-EPIC-329]] — adopter-surface sync (`/ft-update` wiring, new logo, cosmetic sweep)
- [[CORE-EPIC-330]] — loop-integration (`SPEC/loop.md` contract, heartbeat template, `/ft-goal-task`)
- [[CORE-331]] — loop-integration doc-sync (audit inline fix)
- [[CORE-327]] — prior release v5.7.2 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Standard minor release; 26 commits since v5.7.2 spanning 4 completed epics/features; bump pattern well-established (CORE-327, CORE-325, CORE-319 precedents).

- [x] Read relevant source files — SPEC.md:3, docs/MIGRATION.md:387 pin, SECURITY.md:109 pin, viz/src/ui/constants.ts:41, viz/package.json:4

- [x] **Archive skim** — CORE-327 (v5.7.2) and CORE-325 (v5.7.1) are the nearest precedents; structural shape unchanged.

- [x] **Drift check** — SPEC.md:3 reads `**Version:** v5.7.2`; `git describe --tags --abbrev=0` returns `v5.7.2`; MIGRATION.md/SECURITY.md/constants.ts/package.json pins all at 5.7.2 — no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — no ambiguity; bump kind (minor) and target version (v5.8.0) confirmed by user in Step 2.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Commits since v5.7.2 (26 total), grouped by area:
- **viz/PLAN resilience** — FE-063.2–.5 (unparsed-line diagnostics, search-reaches-subtasks, order-independent grouping, epic audit), FE-064 (render resilience: per-row ErrorBoundary, SSE reconnect, vscode path guard), FE-065 (dedup/orphan cleanup), FE-066 (PLAN-grammar glyph tolerance — parser was silently dropping 148 rows on model-chip glyph)
- **loop integration** — CORE-330.1–.6 (`SPEC/loop.md` loop-task contract, heartbeat template + LOOP-LOG convention, `/ft-goal-task` skill, adopter wiring fan-out, audit), CORE-331 (doc-sync fix for enumeration sites the epic missed)
- **adopter-surface sync** — CORE-329.2–.5 (`/ft-update` wiring fan-out sync, new logo adoption, cosmetic sweep, audit)
- **agent-CC alignment** — CORE-328.1–.5 (agent-memory positioning doc, skill-description dispatch audit, autonomous-loop guidance, audit)

Adopter impact: all `feat:`/`fix:`/`docs:`/`chore:`, no `feat!:` or `BREAKING CHANGE:`. viz-internal changes (FE-063–066) and flowtron-self doc/logo work (CORE-328, CORE-329) require no adopter action. CORE-330's new `/ft-goal-task` skill is picked up automatically by the standard `/ft-update` bump procedure — CORE-330.5 already shipped the wiring fan-out. Migration block: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — 5 version edits per canonical recipe (CORE-327 precedent)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string edits only)

**Implementation Notes:**

5 version edits applied: SPEC.md:3, docs/MIGRATION.md:387, SECURITY.md:109, viz/src/ui/constants.ts:41, viz/package.json:4 (v5.7.2 → v5.8.0 / bare "5.8.0"). Grep verification clean — zero stray v5.7.2 pins in the checked paths.

Dogfood gate resolved:
- Claude: refreshed → `v5.8.0 · 2026-07-03 (dogfooded)` (docs/AGENT-COMPAT.md:36, claude/CAPABILITIES.md:56)
- Grok: skipped → `v5.7.0 · 2026-06-14 (dogfooded; skipped @ v5.8.0)` (docs/AGENT-COMPAT.md:37, docs/PLATFORMS.md:238)
- Codex: skipped → `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.8.0)` (docs/AGENT-COMPAT.md:38, docs/PLATFORMS.md:253)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A, version-string-only edits

**Testing Notes:**

`npm --prefix viz run lint && npm --prefix viz run typecheck && npm --prefix viz run test` — all clean. 16 test files, 212 tests passed. Markdown prose edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, docs/AGENT-COMPAT.md, docs/PLATFORMS.md, claude/CAPABILITIES.md) are single-token version-string substitutions; no frontmatter or fenced blocks touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `ft-audit-docs` subroutine over the 11 AI-referenced docs: zero findings (5 passes clean). Standing symlink-wiring count check also clean (22 = 22 = 22 = "twenty-two" across `claude/AGENTS-snippet.md`, `docs/MIGRATION.md` §1.6, `ft-new-project/SKILL.md` Steps 7 + 8).

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Flowtron v5.8.0 minor release shipping four completed epics/features since v5.7.2: viz PLAN parser/render resilience (FE-EPIC-063, FE-064, FE-065, FE-066 — glyph-tolerant grammar fixing 148 silently-dropped rows, per-row ErrorBoundary, SSE reconnect, subtask search/grouping, dead-code cleanup), loop integration (CORE-EPIC-330 — `SPEC/loop.md` contract + `/ft-goal-task` skill + heartbeat LOOP-LOG convention), adopter-surface sync (CORE-EPIC-329 — `/ft-update` wiring fan-out, new logo), and agent-CC alignment (CORE-EPIC-328 — memory positioning, dispatch audit, autonomous-loop guidance). Five version pins bumped. Dogfood gate resolved: Claude refreshed at v5.8.0; Grok and Codex recorded skipped @ v5.8.0. Doc-drift sweep: zero findings. No adopter-side migration required — `/ft-goal-task` wiring is picked up automatically on the next `/ft-update` bump.

**Archived:** 2026-07-03
