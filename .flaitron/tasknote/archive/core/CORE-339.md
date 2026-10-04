---
title: release v5.9.0
status: completed
tags: []
created: 2026-07-03
due:
related-tasks: [CORE-333, CORE-334, FE-067, FE-068, CORE-335, CORE-336, CORE-337, CORE-338, CORE-332]
---

# CORE-339 | release v5.9.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-333]] [[CORE-334]] [[FE-067]] [[FE-068]] [[CORE-335]] [[CORE-336]] [[CORE-337]] [[CORE-338]] [[CORE-332]]

## 🎯 Goal

Cut flowtron v5.9.0 minor release tagging the dotN subtask grammar (CORE-333/334), viz parser legacy-line tolerance (FE-067), and project-switcher overflow (FE-068), plus parser/doc fixes (CORE-335/336/337/338) since v5.8.0.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.8.0` → `v5.9.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.8.0` → `v5.9.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.8.0` → `v5.9.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.8.0` → `v5.9.0`
- [ ] `viz/package.json` `"version"` bumped `"5.8.0"` → `"5.9.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.9.0`, or recorded `skipped @ v5.9.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-339 — flowtron v5.9.0 (...)` commit lands
- [ ] Annotated `v5.9.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-339.md`

## 🧩 Subtasks

- [ ] 1. Read SPEC.md:3 + MIGRATION.md + SECURITY.md + constants.ts pin locations
- [ ] 2. Archive skim — CORE-332, CORE-327 for release shape
- [ ] 3. Adopter-impact classification of commits since v5.8.0
- [ ] 4. Apply 5 version edits (SPEC · MIGRATION · SECURITY · constants.ts · package.json)
- [ ] 5. Dogfood gate — resolve every dogfooded row (refresh or skip)
- [ ] 6. Phase 3 lint/test pass (viz package scripts)
- [ ] 7. ft-audit-docs doc-drift sweep
- [ ] 8. Draft + review annotated tag message
- [ ] 9. Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-333]] — dotN-grammar-suffix (viz parser accepts `.N` reserved terminal subtask suffix)
- [[CORE-334]] — epic-audit-emit-dotN (skills emit/validate literal `.N` audit child)
- [[FE-067]] — viz-legacy-line-parse-tolerance (parser excludes completed pre-flowtron legacy label lines from unparsed diagnostics)
- [[FE-068]] — project-switcher-tab-overflow (viz ProjectSelector +N overflow dropdown)
- [[CORE-335]] — plan-template-example-diagnostics (relocate TASK-ID examples above `## High`)
- [[CORE-336]] — parser-strip-html-comments (ignore checkbox lines inside HTML comments)
- [[CORE-337]] — spec-doc-html-comment-tolerance (note HTML-comment lines ignored by parser)
- [[CORE-338]] — sse-write-error-guard (prune SSE client on response error instead of crashing dev server)
- [[CORE-332]] — prior release v5.8.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Standard minor release; 9 commits since v5.8.0 (8 task commits + 1 PLAN.md blank-line fix) spanning viz parser/UI resilience and the dotN subtask-grammar contract; bump pattern well-established (CORE-332, CORE-327 precedents).

- [x] Read relevant source files — SPEC.md:3, docs/MIGRATION.md:387 pin, SECURITY.md:109 pin, viz/src/ui/constants.ts:41, viz/package.json:4

- [x] **Archive skim** — CORE-332 (v5.8.0) is the nearest precedent; structural shape unchanged.

- [x] **Drift check** — SPEC.md:3 reads `**Version:** v5.8.0`; `git describe --tags --abbrev=0` returns `v5.8.0`; MIGRATION.md/SECURITY.md/constants.ts/package.json pins all at 5.8.0 — no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — no ambiguity; bump kind (minor) and target version (v5.9.0) confirmed by user in Step 2.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Commits since v5.8.0 (9 total), grouped by area:
- **viz parser/UI resilience** — FE-067 (legacy-line parse tolerance: excludes completed pre-flowtron legacy label lines from unparsed diagnostics), FE-068 (project-switcher +N overflow dropdown), CORE-336 (strip HTML-comment checkbox lines), CORE-338 (SSE write-error guard — prune client on RST instead of crashing dev server)
- **dotN subtask grammar** — CORE-333 (viz parser accepts `.N` reserved terminal subtask suffix), CORE-334 (skills emit/validate literal `.N` audit child)
- **doc/template fixes** — CORE-335 (relocate PLAN template TASK-ID examples above `## High`), CORE-337 (SPEC note: HTML-comment lines ignored by parser)
- **housekeeping** — PLAN.md stray blank-line fix

Adopter impact: all `feat:`/`fix:`/`docs:`, no `feat!:` or `BREAKING CHANGE:`. viz-internal changes (FE-067/068, CORE-336/338) require no adopter action. The dotN grammar (CORE-333/334) ships new emit/validate behavior in the epic skills, picked up automatically on the next `/ft-update` pin bump; existing numeric audit children stay backward-compatible via the parser tolerance. Doc/template fixes are flowtron-self. Migration block: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — 5 version edits per canonical recipe (CORE-332 precedent)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string edits only)

**Implementation Notes:**

5 version edits applied: SPEC.md:3, docs/MIGRATION.md:387, SECURITY.md:109, viz/src/ui/constants.ts:41, viz/package.json:4 (v5.8.0 → v5.9.0 / bare "5.9.0"). Grep verification clean — zero stray v5.8.0 pins in the checked paths.

Dogfood gate resolved — **clean sweep, all three rows refreshed from real v5.9.0 verification sessions** (operator ran live Grok Build + Codex CLI dogfood sessions against the flowtron repo per `docs/DOGFOOD.md`; both passed all three steps with clean cue-render + Phase-1 drive):
- Claude: refreshed → `v5.9.0 · 2026-07-03 (dogfooded)` (docs/AGENT-COMPAT.md:36, claude/CAPABILITIES.md:56)
- Grok: refreshed → `v5.9.0 · 2026-07-03 (dogfooded)` (docs/AGENT-COMPAT.md:37, docs/PLATFORMS.md:238)
- Codex: refreshed → `v5.9.0 · 2026-07-03 (dogfooded)` (docs/AGENT-COMPAT.md:38, docs/PLATFORMS.md:253)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — N/A, version-string-only edits

**Testing Notes:**

`npm --prefix viz run lint && npm --prefix viz run typecheck && npm --prefix viz run test` — all clean. 16 test files, 229 tests passed. `flowtron-viz@5.9.0` in the script banner confirms the package.json bump. Markdown prose edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, docs/AGENT-COMPAT.md, docs/PLATFORMS.md, claude/CAPABILITIES.md) are single-token version-string/stamp substitutions; no frontmatter or fenced blocks touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `ft-audit-docs` subroutine over the 11 AI-referenced docs: one Low Currency finding (AGENT-COMPAT.md:96 stale Grok/Codex verification versions, drift from this cut's own dogfood walk) fixed inline; passes 1/2/3/5 clean. Standing symlink-wiring count check: no-op (no wiring files touched since v5.8.0; roster unchanged at 22).

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive

- [x] Recap drafted

**Final Summary:**

Flowtron v5.9.0 minor release shipping the dotN audit-child subtask grammar and a batch of viz parser/dev-server hardening since v5.8.0. dotN grammar: viz parser accepts the reserved terminal `.N` subtask suffix (CORE-333) and epic skills emit/validate a literal `.N` audit child (CORE-334), with existing numeric children backward-compatible. viz resilience: legacy-line parse tolerance (FE-067), ProjectSelector +N overflow dropdown (FE-068), HTML-comment checkbox stripping (CORE-336), SSE write-error guard (CORE-338). Contract/template fixes: PLAN template example relocation (CORE-335), SPEC HTML-comment note (CORE-337). Five version pins bumped v5.8.0 → v5.9.0. Dogfood gate: clean sweep — all three rows (Claude, Grok, Codex) refreshed from real v5.9.0 verification sessions. Doc-drift sweep: one Low Currency finding (stale Grok/Codex prose from the dogfood walk) fixed inline. No adopter-side migration required — the dotN grammar is picked up automatically on the next `/ft-update` bump.

**Archived:** 2026-07-03
