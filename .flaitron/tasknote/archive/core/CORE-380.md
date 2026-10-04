---
title: release v5.14.1
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: [CORE-374, CORE-375, CORE-376, CORE-377, CORE-378, CORE-379, CORE-372]
---

# CORE-380 | release v5.14.1

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-374]] [[CORE-375]] [[CORE-376]] [[CORE-377]] [[CORE-378]] [[CORE-379]] [[CORE-372]]

## 🎯 Goal

Cut the v5.14.1 patch release tagging CORE-374/375/376/377/378/379 (doc-drift + mirror fixes) since v5.14.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.14.0` → `v5.14.1`
- [x] docs/MIGRATION.md example pin bumped `v5.14.0` → `v5.14.1`
- [x] SECURITY.md release-tag example pin bumped `v5.14.0` → `v5.14.1`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.14.0` → `v5.14.1`
- [x] `viz/package.json` `"version"` bumped `"5.14.0"` → `"5.14.1"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] Dogfood gate resolved — Claude refreshed to `v5.14.1`; Grok and Codex recorded `skipped @ v5.14.1` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — zero findings
- [ ] Single `feat: CORE-380 — flowtron v5.14.1 (...)` commit lands
- [ ] Annotated `v5.14.1` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-380.md`

## 🧩 Subtasks

- [x] 5 version edits + dogfood gate stamps
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + wiring-count/parity/installed-surface checks
- [x] Tag message drafted and approved
- [ ] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-374]] — conventions-declines-count doc fix
- [[CORE-375]] — neutrality-ledger-currency doc fix
- [[CORE-376]] — spec-omissions-mirror doc fix
- [[CORE-377]] — platforms-worked-example-currency doc fix
- [[CORE-378]] — release-recipe-lockfile doc fix
- [[CORE-379]] — model-example-fable doc fix
- [[CORE-372]] — prior release v5.14.0 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe` both read `v5.14.0` (no drift). All 7 unreleased commits are `docs:`/`chore:` — no `feat:`, `feat!:`, or `BREAKING CHANGE:` — highest rank is patch → `v5.14.1`, matching the PLAN-line target and the user-confirmed bump.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md` example pin, `SECURITY.md` release-tag pin, `viz/src/ui/constants.ts`, `viz/package.json`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — CORE-372 (v5.14.0) is the direct prior precedent: same five-pin, dogfood-gate, doc-sweep, tag, archive shape, reused here.

- [x] **Drift check** — all five pins resolved at `v5.14.0` pre-edit; last tag matched `SPEC.md:3`. No pre-edit drift.

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion during Phase 2).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** Commits since v5.14.0: **CORE-377** (`docs:` platforms-worked-example-currency), **CORE-375** (`docs:` neutrality-ledger-currency), **CORE-374** (`docs:` conventions-declines-count), **CORE-376** (`docs:` spec-omissions-mirror), **06cb52c** (`chore:` ft-audit-repo filing CORE-378/CORE-379), **CORE-378** (`chore:` release-recipe-lockfile), **CORE-379** (`docs:` model-example-fable). All doc-currency/mirror fixes surfaced by the 2026-07-27 audit-repo pass; no adopter-facing feature or contract change.

**Adopter impact:** no required project-side edits — every changed surface is doc prose read live from the submodule at the pinned tag; no new skill, template, or contract shape shipped. Migration sentinel: `No required project-side edits`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-372

- [x] **Minimal refactor gate** — N/A (version-string release)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string release; source doc fixes landed in their own tasknotes)

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — version-string and prose edits only; no duplication, dead code, or public-surface growth introduced

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior changed

**Testing Notes:** `npm --prefix viz run lint` clean (eslint src). `npm --prefix viz run typecheck` clean (tsc --noEmit). `npm --prefix viz run test`: 18 files, 242/242 passed. `node --test tools/update-adopters.test.mjs`: 24/24 across 9 suites. Package reports `flowtron-viz@5.14.1` (bump confirmed). Markdown mental-pass on SPEC.md / docs/MIGRATION.md / SECURITY.md: single-token version substitutions only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `ft-audit-docs` subroutine run over all 12 AI-referenced docs (5 passes). Zero findings — the doc set was already swept clean by CORE-372/374-379 within the prior 24h. Standing checks green: Claude symlink wiring count 26 (matches MIGRATION §1.6, `claude/AGENTS-snippet.md`, ft-new-project Step 7 + Step 8); shipped-skill parity claude↔codex exact; installed-surface 13-slug adopter subset exact across all three snippets; zero forbidden repo-scoped installs.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-27.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:** Flowtron v5.14.1 patch release ships six doc-currency/mirror fixes surfaced by the 2026-07-27 audit-repo pass (CORE-374 conventions-declines-count, CORE-375 neutrality-ledger-currency, CORE-376 spec-omissions-mirror, CORE-377 platforms-worked-example-currency, CORE-378 release-recipe-lockfile, CORE-379 model-example-fable) — all doc-only, no code or contract-shape change. No required adopter migration: every changed surface is doc prose read live from the submodule at the pinned tag. Dogfood gate: Claude refreshed to `v5.14.1 · 2026-07-27 (dogfooded)`; Grok and Codex recorded `skipped @ v5.14.1` (prefix held at last real verification, v5.14.0). Gates: viz 242/242 across 18 files, updater 24/24, lint and typecheck clean. Doc-drift sweep found zero new issues.

**Archived:** 2026-07-27
