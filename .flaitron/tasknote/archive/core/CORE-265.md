---
title: release v5.0.0
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-264, FE-046, CORE-260]
---

# CORE-265 | release v5.0.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-264]] [[FE-046]] [[CORE-260]]

## 🎯 Goal

Cut flowtron **v5.0.0** — the first **major** release, tagging CORE-264 (the breaking `_project/` → `.flowtron/` directory rename that requires adopter migration), plus FE-046 (viz stale-response guard) and the supporting fixes/doc-currency work since v4.5.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.5.0` → `**Version:** v5.0.0`
- [ ] `docs/MIGRATION.md` example pin bumped `v4.5.0` → `v5.0.0`
- [ ] `SECURITY.md` release-tag example pin bumped `v4.5.0` → `v5.0.0`
- [ ] `viz/src/ui/constants.ts` `FLOWTRON_VERSION` bumped `v4.5.0` → `v5.0.0`
- [ ] **Major-bump `last-verified` stamp obligation** resolved across the 6 stamps (Claude Code ×2, Grok ×2, Codex ×2) per the operator's Discovery decision
- [ ] Phase 4 doc-drift sweep run across the `.flowtron/tasknote/README.md` §"AI-referenced docs" set (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-265 — flowtron v5.0.0 (...)` commit lands
- [ ] Annotated `v5.0.0` tag created with adopter-facing release notes (BREAKING: `.flowtron/` rename migration steps)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/CORE/CORE-265.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.5.0` → `v5.0.0`
- [ ] `docs/MIGRATION.md` — bump example pin (grep `(e.g., v4.5.0`) → `v5.0.0`
- [ ] `SECURITY.md` — bump release-tag example pin (grep `release tags (e.g.`) → `v5.0.0`
- [ ] `viz/src/ui/constants.ts` — bump `FLOWTRON_VERSION = 'v4.5.0'` → `'v5.0.0'`
- [ ] Resolve the 6 `last-verified` stamps per the major-bump obligation (operator decision in Discovery)
- [ ] Phase 3 — markdown lint mental-pass on edited lines + viz lint/typecheck
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)`; flip PLAN.md line to stub; move tasknote to `archive/CORE/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v5.0.0` (BREAKING migration block); push to origin

## 🔗 Related

- [[CORE-264]] — flowtron-dir-rename (`_project/` → `.flowtron/`; the breaking change that makes this a major bump)
- [[FE-046]] — viz-stale-response-guard (the lone `feat:` in the cohort)
- [[CORE-260]] — release v4.5.0 (most recent precedent; 4-pin bump shape + minor-bump stamp scoping)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 14 commits since v4.5.0. Strict Conventional-Commits highest rank = `feat:` (FE-046) → minor; but CORE-264's `_project/` → `.flowtron/` rename is a genuine breaking change requiring adopter migration (committed as `refactor:` with a "Breaking change" body but no `!`/footer). PLAN-line target = v5.0.0 (major) wins; operator confirmed the major designation at the release-path gate. Current version v4.5.0 matches `git describe` (no drift). Four live version pins; six `last-verified` stamps at v4.4.0 — major bump fires the refresh obligation (resolved below).

- [x] Read relevant source files — `SPEC.md:3`, `viz/src/ui/constants.ts:39`, `docs/MIGRATION.md:323`, `SECURITY.md:109`; stamps in `docs/AGENT-COMPAT.md:36-38`, `claude/CAPABILITIES.md:56`, `docs/PLATFORMS.md:236/247`
- [x] **Archive skim** — CORE-260 (v4.5.0, immediate precedent; clean 4-pin shape, minor-bump verify-not-bump stamp scoping). This cut diverges: it is the first **major**, so the stamp obligation fires.
- [x] **Drift check** — all four pins live and exact at HEAD (SPEC.md:3, viz/src/ui/constants.ts:39, docs/MIGRATION.md:323, SECURITY.md:109). Broad `v4.5.0` grep returns only those four (the six `last-verified` stamps are at v4.4.0, not v4.5.0). **Zero stray `_project/` refs** in the live doc/code set — CORE-264 rename was thorough.
- [x] Asked clarifying questions (major bump → three operator decisions captured below)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Commits since v4.5.0 (14) — adopter-facing grouping

**Breaking (headline — the major trigger):**
- refactor: CORE-264 — `_project/` → `.flowtron/` dotfolder rename (breaking; requires adopter migration)

**Feature:**
- feat: FE-046 — viz-stale-response-guard

**viz fixes:**
- fix: FE-047 (api-error-path-leak), FE-048 (per-project-version-display), FE-050 (originGuard referer port), FE-051 (stale-load guard + README capitalization)

**Doc / workflow currency:**
- docs: CORE-261 (last-verified backtick-style), CORE-262/263 (ft-release + ft-stats wiring fixes), CORE-266 (next-task cue own-line), FE-049 (deflake wikilink-nav test), plus doc-drift/STATS sweeps

### Operator decisions (three clarifying questions, major-bump)

1. **`last-verified` stamps (major-bump obligation).** Ship-now decision: refresh the **2 Claude Code** stamps (AGENT-COMPAT.md:36, CAPABILITIES.md:56) to `v5.0.0 · 2026-06-01 (dogfooded)` — this session dogfoods the v5.0.0 contract. The **4 Grok/Codex** stamps (AGENT-COMPAT.md:37/38, PLATFORMS.md:236/247) are **explicit-skip**: left at `v4.4.0 · 2026-06-01 (dogfooded)` (honest last-real-verification; cannot re-dogfood non-Claude agents from this session). The lag is tracked durably by CORE-EPIC-267.
2. **Upgrade docs.** Add a durable "Upgrading an existing adopter (`_project/` → `.flowtron/`)" subsection to `docs/MIGRATION.md` as part of this cut (not tag-only).
3. **Dogfood-gate process.** Filed **CORE-EPIC-267** (release-dogfood-gate) to make per-agent dogfood-or-explicit-skip a release gate in `ft-release`. Committed separately (`b24f91d`); to be scoped via `/ft-epic-discovery`.

### Adopter migration impact (v4.5.0 → v5.0.0) — BREAKING

CORE-264 renamed the convention dir `_project/` → `.flowtron/`. An existing adopter pinned under the v4.x `_project/` convention must, on bumping to v5.0.0: (a) `git mv _project .flowtron` (moves PLAN.md, tasknote/, and the submodule), (b) re-pin the submodule to `v5.0.0`, (c) re-run the symlink wiring from `.flowtron/core/claude/AGENTS-snippet.md` (old symlinks pointed at `_project/flowtron/...`), (d) update any `_project/` references in `AGENTS.md` / project docs. Spelled out in the v5.0.0 tag's Migration block **and** the new MIGRATION.md upgrade subsection. Fresh adopters are unaffected (MIGRATION already uses `.flowtron/` throughout). FE-046 + the viz fixes ship in the submodule and are picked up automatically on the re-pin.

### Pre-flight cleanup committed before the cut

- `20c3f91` fix: FE-051 — dangling close from a prior session (committed clean)
- `750b0ce` docs: CORE-266 — next-task cue own-line
- `b24f91d` docs: file CORE-EPIC-267 — release-dogfood-gate

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-260 (v4.5.0) precedent for the 4 pins; major-bump stamp refresh + MIGRATION upgrade subsection are new (no minor-bump precedent)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (version-string + doc-prose edits)

**Implementation Notes:**

Six edits + one new doc subsection:

1. `SPEC.md:3` — `**Version:** v4.5.0` → `v5.0.0`
2. `viz/src/ui/constants.ts:39` — `VIZ_VERSION = 'v4.5.0'` → `'v5.0.0'` (note: constant was renamed `FLOWTRON_VERSION` → `VIZ_VERSION` by CORE-262)
3. `docs/MIGRATION.md:323` — example pin `(e.g., \`v4.5.0\`)` → `v5.0.0`
4. `SECURITY.md:109` — release-tag example pin `(e.g. \`v4.5.0\`)` → `v5.0.0`
5. `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:56` — Claude Code `last-verified` `v4.4.0` → `v5.0.0 · 2026-06-01 (dogfooded)` (major-bump refresh, this session dogfoods)
6. `docs/MIGRATION.md` §"Pinning and bumping" — new `### Upgrading an existing adopter from v4.x (\`_project/\` → \`.flowtron/\`)` subsection (5-step rename + re-pin + rewiring)

Grok/Codex stamps (AGENT-COMPAT.md:37/38, PLATFORMS.md:236/247) deliberately left at `v4.4.0` (explicit-skip; tracked by CORE-EPIC-267). Post-edit grep: zero live `v4.5.0`; remaining `v4.4.0` = only the 4 Grok/Codex stamps.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz lint + typecheck (the constants.ts edit); markdown edits need no suite
- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` (0) + `npm --prefix viz run typecheck` (`tsc --noEmit`, 0) both pass
- [x] (frontend) Asked the user for visual confirmation — N/A (version-string only; viz footer label updates v4.5.0 → v5.0.0)

**Testing Notes:**

Markdown lint mental-pass clean — pin edits are single-token substitutions inside existing sentences; the new MIGRATION subsection uses standard heading + ordered list + fenced `sh` blocks, no frontmatter touched. constants.ts edit is a one-line string-constant substitution; viz lint + typecheck green.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — focused sweep over the 11-file AI-referenced docs set: **clean, zero findings**. Updated by this cut: SPEC.md, docs/MIGRATION.md, SECURITY.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md. No change: README.md, claude/AGENTS-snippet.md (cross-ref anchor valid), docs/CONVENTIONS.md, CONTRIBUTING.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md (Grok/Codex stamps intentionally held). No doc hardcodes the version except SPEC.md:3; the only stray `_project` ref is the intentional one in the new MIGRATION upgrade subsection.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` and tasknote moved to `.flowtron/tasknote/archive/CORE/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron **v5.0.0** — the first major release, tagging CORE-264 (the breaking `_project/` → `.flowtron/` directory rename), FE-046 (viz stale-response guard), and the FE-047/048/049/050/051 + CORE-261/262/263/266 fixes/doc-currency work since v4.5.0. Four version-pin edits (SPEC.md:3, viz/src/ui/constants.ts:39, docs/MIGRATION.md:323, SECURITY.md:109); the 2 Claude Code `last-verified` stamps refreshed to v5.0.0 (this session dogfoods), the 4 Grok/Codex stamps held at v4.4.0 as an explicit-skip tracked by CORE-EPIC-267. New `### Upgrading an existing adopter (\`_project/\` → \`.flowtron/\`)` subsection in MIGRATION.md gives existing adopters a durable v4→v5 path. viz lint + typecheck green; doc-drift sweep clean. BREAKING for existing adopters (dir rename + re-pin + rewiring); fresh adopters unaffected.

**Archived:** 2026-06-01
