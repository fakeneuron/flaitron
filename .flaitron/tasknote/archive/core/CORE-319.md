---
title: release v5.7.0
status: completed
tags: []
created: 2026-06-13
due:
related-tasks: [CORE-312, CORE-310]
---

# CORE-319 | release v5.7.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-312]] [[CORE-310]]

## 🎯 Goal

Cut flowtron v5.7.0 — tag and ship [[CORE-312]]'s adopter version-currency dot + batch-update CLI plus the CORE-307…CORE-318 doc/fix cohort since v5.6.0, via the standard release recipe.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.6.0` → `v5.7.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.6.0` → `v5.7.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.6.0` → `v5.7.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.6.0` → `v5.7.0`
- [ ] `viz/package.json` `"version"` bumped `"5.6.0"` → `"5.7.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.7.0`, or recorded `skipped @ v5.7.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-319 — flowtron v5.7.0 (...)` commit lands
- [ ] Annotated `v5.7.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-319.md`

## 🧩 Subtasks

- [ ] Apply the 5 version-pin edits (SPEC.md:3 · docs/MIGRATION.md:383 · SECURITY.md:109 · viz/src/ui/constants.ts:41 · viz/package.json:4)
- [ ] Walk the dogfood gate — per-agent refresh-or-skip resolution (Claude / Grok / Codex) applied across matrix + footer/stamp locations together
- [ ] Verify pins clean via repo-wide grep (skipped-stamp + archive residue expected and exempt)
- [ ] Phase 3: viz lint + typecheck + test (version-string gate only)
- [ ] Phase 4: ft-audit-docs subroutine sweep · tag-message draft + review · PLAN flip + archive · 📦 bundled gate (commit-go + push-go) · commit + annotated tag + push

## 🔗 Related

- [[CORE-312]] — adopter version-currency dot + batch update CLI; the feat: driving the minor bump
- [[CORE-310]] — release v5.6.0; most recent release precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern well-established; version state verified clean (SPEC.md:3 = v5.6.0 = `git describe`), exactly one feat commit (CORE-312) since the tag drives a minor bump, PLAN target confirmed v5.7.0 via structured ask.

- [x] Read relevant source files

- [x] **Archive skim** — [[CORE-310]] (v5.6.0) is the immediate precedent and matches this skill's recipe exactly (5 pins, dogfood walk in Phase 2, ft-audit-docs subroutine, bundled 📦). No structural drift to account for.

- [x] **Drift check** — all 5 pins confirmed at `v5.6.0` @ HEAD: `SPEC.md:3`, `docs/MIGRATION.md:383`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4`. Dogfooded rows enumerated: Claude `v5.6.0 (dogfooded)`, Grok `v5.5.0 (dogfooded; skipped @ v5.6.0)`, Codex `v5.2.0 (dogfooded; skipped @ v5.6.0)`.

- [x] Asked clarifying questions — version confirmed v5.7.0 via structured ask. Adopter impact unambiguous (see notes): CORE-312 additive → "no required project-side edits". Dogfood per-agent walk happens in Phase 2.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Commits since v5.6.0: one `feat:` (CORE-312 — adopter version-currency dot + batch update CLI → minor), one `fix:` (CORE-316), eight `docs:` (CORE-307/311/313/314×2/315/317/318).
- **Adopter migration impact: none required.** CORE-312 ships (a) a viz project-chip version-currency dot — backward compatible, no dot when unreadable, picked up via the pin; and (b) `tools/update-adopters.mjs`, a maintainer-side batch updater that runs *from* the flowtron checkout against `~/code` adopters (never installed into adopter repos). The rest of the cohort is doc currency / dedup / a symlink-trailing-slash fix. `/ft-update` picks the viz dot up via the pin bump; no project-side edits.
- Working tree at cut start carries the uncommitted CORE-319 PLAN filing line + this tasknote — rides into the release commit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — neighboring release precedent followed ([[CORE-310]] recipe verbatim)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior (n/a — version-string substitutions only)

**Implementation Notes:**

- **5 version pins applied** v5.6.0→v5.7.0: `SPEC.md:3`, `docs/MIGRATION.md:383`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4`.
- **Dogfood gate walked** (per-agent structured ask): **Claude refreshed** → `v5.7.0 · 2026-06-13 (dogfooded)` (this `/ft-release` session is the verification run; AGENT-COMPAT matrix:36 + CAPABILITIES §"Last verified":56); **Grok skipped** → prefix held `v5.5.0 · 2026-06-10`, suffix bumped to `; skipped @ v5.7.0` (matrix:37 + PLATFORMS Grok footer:238); **Codex skipped** → prefix held `v5.2.0 · 2026-06-03`, suffix bumped to `; skipped @ v5.7.0` (matrix:38 + PLATFORMS Codex footer:253; no subscription per CORE-307).
- **Residue grep clean**: zero remaining `v5.6.0` outside archives (skipped stamps now carry `v5.7.0` in their suffix; prefixes at v5.5.0/v5.2.0 by design).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation — n/a; version-string edits only, no UI change

**Testing Notes:**

- Markdown pass: 3 prose edits are single-token substitutions; no frontmatter or fences touched.
- `npm --prefix viz run lint` ✓ · `npm --prefix viz run typecheck` ✓ · `npm --prefix viz test` → 14 files / 187 tests passed (~4.2s). The `flowtron-viz@5.7.0` script header confirms the package.json bump.
- Feature tests not re-run per skill contract — CORE-312 carried its own verification.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — run via `ft-audit-docs` subroutine over the 11-entry AI-referenced set: all 5 passes clean (version pins consistent at v5.7.0, dogfood stamps resolved across matrix + footers, no broken refs, no stale content). Zero findings — health 10/10.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-13.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.7.0, a minor release headlined by [[CORE-312]]'s adopter version-currency surface: viz project chips now carry a green/red currency dot (pinned-at-latest vs behind, absent when unreadable) backed by server-side latest-tag resolution + an `/api/projects` envelope, and a new zero-dep `tools/update-adopters.mjs` batch-bumps clean non-breaking adopters across `~/code` (dry-run default, per-repo safety gates, pathspec-scoped local commits, never pushes). The rest of the cohort (CORE-311/313/314/315/316/317/318) is skill-doc currency and dedup. Bumped the 5 version pins. Dogfood gate: Claude refreshed inline (this `/ft-release` session) → v5.7.0, Grok recorded `skipped @ v5.7.0` (prefix held v5.5.0), Codex recorded `skipped @ v5.7.0` (prefix held v5.2.0; no subscription per CORE-307). Doc-drift sweep clean (zero findings, 10/10). No adopter migration required — `/ft-update` picks up the viz dot via the pin; `update-adopters.mjs` is maintainer-side tooling.

**Archived:** 2026-06-13
