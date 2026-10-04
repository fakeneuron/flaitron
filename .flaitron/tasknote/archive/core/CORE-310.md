---
title: release v5.6.0
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: [CORE-309, CORE-305]
---

# CORE-310 | release v5.6.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-309]] [[CORE-305]]

## 🎯 Goal

Cut flowtron v5.6.0 — tag and ship [[CORE-309]]'s `/ft-audit-repo` first-contact holistic audit skill to adopters via the standard release recipe.

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v5.5.0` → `v5.6.0`
- [ ] docs/MIGRATION.md example pin bumped `v5.5.0` → `v5.6.0`
- [ ] SECURITY.md release-tag example pin bumped `v5.5.0` → `v5.6.0`
- [ ] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.5.0` → `v5.6.0`
- [ ] `viz/package.json` `"version"` bumped `"5.5.0"` → `"5.6.0"` (bare semver, no `v` prefix)
- [ ] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.6.0`, or recorded `skipped @ v5.6.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [ ] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-310 — flowtron v5.6.0 (...)` commit lands
- [ ] Annotated `v5.6.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-310.md`

## 🧩 Subtasks

- [ ] Apply the 5 version-pin edits (SPEC.md:3 · docs/MIGRATION.md:382 · SECURITY.md:109 · viz/src/ui/constants.ts:41 · viz/package.json:4)
- [ ] Walk the dogfood gate — per-agent refresh-or-skip resolution (Claude / Grok / Codex) applied across matrix + footer/stamp locations together
- [ ] Verify pins clean via repo-wide grep (skipped-stamp + archive residue expected and exempt)
- [ ] Phase 3: viz lint + typecheck + test (version-string gate only)
- [ ] Phase 4: ft-audit-docs subroutine sweep · tag-message draft + review · PLAN flip + archive · 📦 bundled gate (commit-go + push-go) · commit + annotated tag + push

## 🔗 Related

- [[CORE-309]] — /ft-audit-repo skill; the feature this release ships
- [[CORE-305]] — release v5.5.0; most recent release precedent

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern well-established; version state verified clean (SPEC.md:3 = v5.5.0 = `git describe`), exactly one feat commit since the tag, PLAN target matches the computed minor bump.

- [x] Read relevant source files

- [x] **Archive skim** — [[CORE-305]] (v5.5.0) is the immediate precedent and matches this skill's recipe exactly (5 pins, dogfood walk in Phase 2, ft-audit-docs subroutine, bundled 📦). [[CORE-048]] remains the canonical tasknote shape. No structural drift to account for.

- [x] **Drift check** — all 5 pins confirmed at `v5.5.0` @ HEAD: `SPEC.md:3`, `docs/MIGRATION.md:382`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4`. Minor skill-text drift: the SKILL's MIGRATION grep pattern `(e.g., v` no longer matches — the pin now reads ``(e.g., `v5.5.0`)`` with a backtick (CORE-261 backtick style); located via direct version grep instead. Dogfooded rows enumerated: Claude `v5.5.0 (dogfooded)`, Grok `v5.5.0 (dogfooded)`, Codex `v5.2.0 (dogfooded; skipped @ v5.5.0)`.

- [x] Asked clarifying questions — version confirmed v5.6.0 via structured ask (proposed minor bump = PLAN target). Adopter impact unambiguous: CORE-309 is purely additive (new skill, no-fork by-reference — no symlink rewiring, no template/doc-set entry changes requiring adopter action) → "no required project-side edits". Dogfood per-agent walk happens in Phase 2.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- One commit since v5.5.0: `22048fa` feat: CORE-309 — /ft-audit-repo (additive → minor).
- Adopter migration impact: none required. `/ft-update` picks up the new skill via the pin; `/ft-audit-repo` is invoked by reference from the submodule path (`.flowtron/core/claude/skills/ft-audit-repo/SKILL.md`) — deliberately not part of the symlink wiring, so no re-wire step fires.
- Working tree at cut start carries the uncommitted CORE-310 PLAN filing line — rides into the release commit (PLAN.md is staged as part of the cut).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits ([[CORE-305]] recipe followed verbatim)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior (n/a — version-string substitutions only)

**Implementation Notes:**

- **5 version pins applied** v5.5.0→v5.6.0: `SPEC.md:3`, `docs/MIGRATION.md:382`, `SECURITY.md:109`, `viz/src/ui/constants.ts:41`, `viz/package.json:4`.
- **Dogfood gate walked** (per-agent structured ask): **Claude refreshed** → `v5.6.0 · 2026-06-10 (dogfooded)` (this `/ft-release` session is the verification run; AGENT-COMPAT matrix + CAPABILITIES §"Last verified"); **Grok skipped** → prefix held at `v5.5.0 · 2026-06-10`, suffix `; skipped @ v5.6.0` (matrix + PLATFORMS Grok footer); **Codex skipped** → prefix held at `v5.2.0 · 2026-06-03`, suffix bumped to `; skipped @ v5.6.0` (matrix + PLATFORMS Codex footer; no subscription per CORE-307).
- **Residue grep clean**: remaining `v5.5.0` hits are the two recorded-skip stamps (Grok matrix + footer) and AGENT-COMPAT:96's last-real-verification prose — all expected categories; archives exempt.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a; version-string edits only, no UI change

**Testing Notes:**

- Markdown pass: 3 prose edits are single-token substitutions; no frontmatter or fences touched.
- `npm --prefix viz run lint` ✓ · `npm --prefix viz run typecheck` ✓ · `npm --prefix viz test` → 14 files / 178 tests passed.
- Feature tests not re-run per skill contract — CORE-309 was markdown-only and carried its own verification.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — run via `ft-audit-docs` subroutine over the 11-entry AI-referenced set: passes 2–5 clean (version pins, family-arity phrasing, cross-refs, dogfood stamps all consistent at v5.6.0); one Low finding (ft-release SKILL's dead MIGRATION-pin grep locator) filed as [[CORE-311]] rather than absorbed — health 9/10

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-10.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v5.6.0, tagging the [[CORE-309]] cohort — `/ft-audit-repo`, the seventh audit-family member: a first-contact holistic audit (Repo Map → thin capped sweep → 3–5 themes with won't-fix tradeoffs + done-signals → milestone plan filed as native epics with a Milestone-0 safety net → delegation to the six focused scaffolds), strictly read-only and no-fork (run by reference from the submodule path). Bumped the 5 version pins. Dogfood gate: Claude refreshed inline (this `/ft-release` session), Grok recorded `skipped @ v5.6.0` (prefix held at v5.5.0), Codex recorded `skipped @ v5.6.0` (prefix held at v5.2.0; no subscription per CORE-307). Doc-drift sweep: clean except one Low in the release skill itself, filed as [[CORE-311]]. No adopter migration required — `/ft-update` picks everything up via the pin; the new skill needs no symlink wiring.

**Archived:** 2026-06-10
