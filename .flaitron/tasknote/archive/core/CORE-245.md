---
title: release v4.4.0
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: [CORE-EPIC-224, CORE-225]
---

# CORE-245 | release v4.4.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]] [[CORE-225]]

## 🎯 Goal

Cut flowtron v4.4.0 — minor release tagging the agent-compatibility surface (CORE-EPIC-224: `docs/AGENT-COMPAT.md` matrix, `claude/CAPABILITIES.md` capability-trigger reference, and the `last-verified` convention) plus supporting doc/hygiene work since v4.3.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.3.0` → `**Version:** v4.4.0`
- [ ] `docs/MIGRATION.md:323` — example pin bumped `v4.3.0` → `v4.4.0`
- [ ] `SECURITY.md:70` — example pin bumped `v4.3.0` → `v4.4.0`
- [ ] `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION` bumped `v4.3.0` → `v4.4.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-245 — flowtron v4.4.0 (...)` commit lands
- [ ] Annotated `v4.4.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-245.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.3.0` → `**Version:** v4.4.0`
- [ ] `docs/MIGRATION.md:323` — bump example pin `(e.g., \`v4.3.0\`)` → `(e.g., \`v4.4.0\`)`
- [ ] `SECURITY.md:70` — bump example pin `(e.g. \`v4.3.0\`)` → `(e.g. \`v4.4.0\`)`
- [ ] `viz/src/ui/constants.ts:39` — bump `FLOWTRON_VERSION = 'v4.3.0'` → `'v4.4.0'`
- [ ] Phase 3 — markdown lint mental-pass on edited lines + viz lint/typecheck
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.4.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-224]] — agent-compatibility-surface (AGENT-COMPAT.md matrix + CAPABILITIES.md + last-verified convention; the feature triggering this minor bump)
- [[CORE-225]] — release v4.3.0 (most recent precedent; 4-pin bump shape)

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 26 commits since v4.3.0. Highest-rank classification = `feat:` (the CORE-EPIC-224 children CORE-224.1–.6, no `!` or BREAKING) → minor bump. The v4.3.0 tag was cut *before* the CORE-224 epic landed, so the epic's `feat:` commits sit in this window — the first-pass commit summary missed them; corrected at `/ft-release` Step 2 and user confirmed minor (v4.3.0 → v4.4.0). Recipe is canonical and living (CORE-225 v4.3.0 is the immediate precedent). Four live version pins exist in the AI-referenced doc set; two new `last-verified` stamps (AGENT-COMPAT.md, CAPABILITIES.md) are in scope for verification but not bumping (see Notes).

- [x] Read relevant source files
- [x] **Archive skim** — CORE-225 (v4.3.0), CORE-210 (v4.2.0); see Discovery Notes
- [x] **Drift check** — the four pin locations are live and exact at HEAD (SPEC.md:3, docs/MIGRATION.md:323, SECURITY.md:70, viz/src/ui/constants.ts:39). Two additional live `v4.3.0` refs are `last-verified` stamps (AGENT-COMPAT.md:36, CAPABILITIES.md:56) — classified as verify-not-bump per the CORE-224 convention.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v4.3.0` ✓ → bump
- `docs/MIGRATION.md:323` — `(e.g., \`v4.3.0\`)` (final pin verification paragraph) ✓ → bump
- `SECURITY.md:70` — `(e.g. \`v4.3.0\`)` in "Pin to annotated release tags" ✓ → bump
- `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.3.0'` ✓ → bump
- `git describe --tags --abbrev=0` → `v4.3.0` — matches `SPEC.md:3`, no drift ✓

### Commits since v4.3.0 (26 total) — grouped by adopter-facing area

**Agent-compatibility surface (CORE-EPIC-224) — the feat: cohort:**
- feat: CORE-224.1 — scope epic children via --deep Discovery
- feat: CORE-224.2 — docs/AGENT-COMPAT.md agent-compatibility matrix
- feat: CORE-224.3 — claude/CAPABILITIES.md capability-trigger reference
- feat: CORE-224.4 — non-Claude capability triggers in PLATFORMS.md
- feat: CORE-224.5 — formalize last-verified convention + wire CAPABILITIES.md into doc-drift sweep
- feat: CORE-224.6 — audit and close CORE-EPIC-224

**Doc currency / hygiene / fixes (standalone, CORE-226–244):**
- docs: CORE-226 doc-drift-skill-roster, CORE-228 readme-skill-roster-drift, CORE-229 migration-worktree-stale-forwardref, CORE-230 doc-nit-sweep, CORE-234 readme-doc-index, CORE-237 post-closure-form-spec-drift, CORE-238 doc-xref-precision-sweep, CORE-239 security-csp-description, CORE-240 model-vocab-cascade, CORE-242 worktrees-doc-reconcile, CORE-243 glossary-audit-family-categorization
- fix: CORE-231 viz-csp, CORE-232 viz-link-allowlist, CORE-233 dep-gray-matter-stale (no-op), CORE-235 glossary-count-currency, CORE-241 agents-snippet-model-path, CORE-244 doc-count-and-layout-currency
- chore: CORE-227 plan-duplicate-cleanup, CORE-236 plan-stranded-completed, CORE-241 close-out, CORE-240 archived-tasknote-track, CORE-232/233 audit-security findings file

### Archive skim findings

- **CORE-225** (v4.3.0, 2026-05-30) — immediate precedent. 4 doc pins (SPEC + MIGRATION + SECURITY + viz constants). Clean "no required project-side edits" migration block. Note: CORE-225 ran the doc-drift sweep inline (subroutine channel was intermittent that session).
- **CORE-210** (v4.2.0) — 3 pins (viz `FLOWTRON_VERSION` not yet tracked then; CORE-221 made it canonical).
- **Structural note:** this cut matches CORE-225's 4-pin shape exactly. New this release: two `last-verified` stamps from CORE-224 (verify-not-bump).

### `last-verified` stamps — verify, do not bump

Two live `v4.3.0` refs are `last-verified` currency stamps introduced by CORE-224.5, not version pins:
- `docs/AGENT-COMPAT.md:36` — Claude Code row: `v4.3.0 · 2026-05-30 (dogfooded)`
- `claude/CAPABILITIES.md:56` — `v4.3.0 · 2026-05-30 (dogfooded)`

Per the convention (AGENT-COMPAT.md §"Reading the cells" → "Last verified"), the **update obligation** fires only when "you run a first flowtron session under the agent, or after a **major** version bump diverges from the prior entry." v4.3.0 → v4.4.0 is a **minor** bump, and Claude Code is already verified, so neither trigger fires. The stamps stay at `v4.3.0` — they remain factually accurate (Claude Code *was* dogfooded at v4.3.0). The doc-drift sweep (§7.1) verifies the stamps (still accurate ✓) without bumping them. To be re-surfaced at the §7.1 sweep for explicit operator confirmation.

### Adopter migration impact (v4.3.0 → v4.4.0) — no required adopter action

All 26 commits are additive reference docs (AGENT-COMPAT.md, CAPABILITIES.md), internal hygiene, or doc currency. The CORE-224 agent-compat surface is flowtron-self documentation shipped in the submodule; adopters bumping the pin pick it up with no manual file edits and no wiring change (CAPABILITIES.md is wired into flowtron-self's own doc-drift sweep, not adopters'). No SPEC contract breakage, no new required tasknote sections.

**Migration block (for the annotated tag):** "No required project-side edits. The agent-compatibility surface (AGENT-COMPAT.md + CAPABILITIES.md) is additive reference documentation shipped in the submodule; adopters bumping the pin receive it automatically. No SPEC contract changes."

### Assumptions (explicit, no clarifying questions needed)

1. The four version pins above are the only live references that *move*. The two `last-verified` stamps stay at v4.3.0 (minor-bump scoping). Historical refs in archive/ and PLAN.md history stay (write-once).
2. The tag message groups by area: agent-compatibility surface, doc currency / hygiene.
3. Push-go offered at the 📦 gate (default Yes).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-225 (v4.3.0) precedent; four single-token version-string substitutions, no prose or structural change
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (3 doc-prose edits + 1 string-constant edit)

**Implementation Notes:**

Four pin edits in order:

1. `SPEC.md:3` — `**Version:** v4.3.0` → `**Version:** v4.4.0`.
2. `docs/MIGRATION.md:323` — example pin `(e.g., \`v4.3.0\`)` → `(e.g., \`v4.4.0\`)`.
3. `SECURITY.md:70` — example pin `(e.g. \`v4.3.0\`)` → `(e.g. \`v4.4.0\`)`.
4. `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.3.0'` → `'v4.4.0'`.

Verified post-edit: broad grep for `v4.3.0` across the live doc + code set returns only the two `last-verified` stamps (AGENT-COMPAT.md:36, CAPABILITIES.md:56), intentionally retained per the minor-bump scoping. Total release diff: 5 files (4 pins + PLAN line), +6/−4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz lint + typecheck (the constants.ts edit); markdown edits need no suite
- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` (0) + `npm --prefix viz run typecheck` (`tsc --noEmit`, 0) both pass
- [x] (frontend) Asked the user for visual confirmation — N/A (version string only; footer label updates v4.3.0 → v4.4.0)

**Testing Notes:**

Markdown lint mental-pass passed — all three prose edits are single-token version substitutions inside existing sentences; no frontmatter, fenced blocks, or links altered. The `constants.ts` edit is a one-line string-constant substitution; viz `lint` + `typecheck` both clean. A version-string change does not affect the viz test suite.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `Skill(ft-audit-docs)` subroutine over the 11-file AI-referenced docs set returned **zero actionable findings** (health 10/10). One informational item: the two `last-verified` stamps (AGENT-COMPAT.md:36, CAPABILITIES.md:56) stay at `v4.3.0` per the convention's minor-bump scoping — verified accurate, deliberately not bumped. The set was heavily swept in the CORE-226–244 window preceding this cut.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.4.0 — minor release tagging the agent-compatibility surface (CORE-EPIC-224: `docs/AGENT-COMPAT.md` matrix, `claude/CAPABILITIES.md` capability-trigger reference, non-Claude triggers in PLATFORMS.md, and the formalized `last-verified` convention wired into the doc-drift sweep) plus the CORE-226–244 doc-currency/hygiene window since v4.3.0. Four version-pin edits (SPEC.md:3, docs/MIGRATION.md:323, SECURITY.md:70, viz/src/ui/constants.ts:39); the two `last-verified` stamps deliberately stay at v4.3.0 per the convention's minor-bump scoping. viz lint + typecheck green; doc-drift sweep returned 0 findings. Single commit + annotated `v4.4.0` tag. No required project-side edits for adopters — the agent-compat surface is additive reference documentation picked up automatically on pin bump.

**Archived:** 2026-05-31
