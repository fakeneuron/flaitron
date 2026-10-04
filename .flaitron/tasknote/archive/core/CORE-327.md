---
title: release v5.7.2
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-326, CORE-325]
---

# CORE-327 | release v5.7.2

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-326]] [[CORE-325]]

## 🎯 Goal

Cut flowtron v5.7.2 patch release tagging CORE-326 (release migration sentinel hardening) since v5.7.1.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.7.1` → `v5.7.2`
- [ ] docs/MIGRATION.md example pin bumped `v5.7.1` → `v5.7.2`
- [ ] SECURITY.md release-tag example pin bumped `v5.7.1` → `v5.7.2`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.7.1` → `v5.7.2`
- [ ] `viz/package.json` `"version"` bumped `"5.7.1"` → `"5.7.2"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.7.2`, or recorded `skipped @ v5.7.2` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-327 — flowtron v5.7.2 (...)` commit lands
- [ ] Annotated `v5.7.2` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-327.md`

## 🧩 Subtasks

- [ ] 1. Read SPEC.md:3 + MIGRATION.md + SECURITY.md + constants.ts pin locations
- [ ] 2. Archive skim — CORE-325, CORE-319 for release shape
- [ ] 3. Adopter-impact classification of commits since v5.7.1
- [ ] 4. Apply 5 version edits (SPEC · MIGRATION · SECURITY · constants.ts · package.json)
- [ ] 5. Dogfood gate — resolve every dogfooded row (refresh or skip)
- [ ] 6. Phase 3 lint/test pass (viz package scripts)
- [ ] 7. ft-audit-docs doc-drift sweep
- [ ] 8. Draft + review annotated tag message
- [ ] 9. Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-326]] — release-migration-sentinel hardening (the fix this release ships)
- [[CORE-325]] — prior release v5.7.1 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Standard patch release; one `fix:` commit since v5.7.1; bump pattern well-established (CORE-325, CORE-319, CORE-310 precedents).

- [ ] Read relevant source files

- [x] **Archive skim** — CORE-325 (v5.7.1) and CORE-319 (v5.7.0) are the nearest precedents; structural shape unchanged.

- [x] **Drift check** — SPEC.md:3 reads `**Version:** v5.7.1`; `git describe --tags --abbrev=0` returns `v5.7.1` — no drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — version confirmed by user (v5.7.2); no ambiguity.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Commits since v5.7.1:
- `fix: CORE-326 — harden release migration sentinel (template + detector)` → patch bump

Adopter impact: CORE-326 fixes the sentinel detection logic inside flowtron tooling (`update-adopters.mjs`). No adopter-side edits required — the fix is in the flowtron tooling layer only. Migration block: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — 5 version edits per canonical recipe (CORE-325 precedent)

- [ ] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code

- [ ] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [ ] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [ ] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [ ] Recap drafted

**Final Summary:**

Flowtron v5.7.2 patch release shipping CORE-326's release migration sentinel hardening. Five version pins bumped (SPEC.md, MIGRATION.md, SECURITY.md, constants.ts, package.json). Dogfood gate resolved: Claude refreshed at v5.7.2; Grok and Codex recorded skipped @ v5.7.2. Doc-drift sweep: zero findings. No adopter-side migration required.

**Archived:** 2026-06-14
