---
title: release v2.1.0
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-084, CORE-085, CORE-086, CORE-087, CORE-088, CORE-089, CORE-090, CORE-091, CORE-092, CORE-093, FE-031, CORE-083]
---

# CORE-094 | release v2.1.0

[← PLAN.md](../../PLAN.md) · ✅ Done · 🔗 [[CORE-083]]

## 🎯 Goal

Cut flowtron v2.1.0 — minor release tagging the feat: cohort accumulated since v2.0.1 (flowtron-info-skill, gate-UX overhaul, viz chip trim, SPEC tightenings, wiring-snippet consolidation).

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v2.0.1` → `v2.1.0`
- [ ] SPEC/versioning.md patch + minor examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 precedent)
- [ ] docs/MIGRATION.md example pin bumped `v2.0.1` → `v2.1.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-094 — flowtron v2.1.0 (...)` commit lands
- [ ] Annotated `v2.1.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-094.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v2.0.1` → `**Version:** v2.1.0`
- [ ] `SPEC/versioning.md` — shift patch example `v2.0.1 → v2.0.2` to `v2.1.0 → v2.1.1`; shift minor example `v2.0.x → v2.1.0` to `v2.1.x → v2.2.0` (major stays — still future-looking)
- [ ] `docs/MIGRATION.md` — bump example pin `(e.g., \`v2.0.1\`)` → `(e.g., \`v2.1.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep; flip PLAN.md; move tasknote to archive
- [ ] Post-closure — single commit; draft + cut annotated tag `v2.1.0`; push tag to origin

## 🔗 Related

- [[CORE-084]] — flowtron-info-skill (first feat since v2.0.1; new `/flowtron` info screen)
- [[CORE-085]] — flowtron-skill-phase-row (info-skill phases aligned to SPEC)
- [[CORE-086]] — contract-surface-fence-langtags (markdown hygiene fix)
- [[CORE-087]] — conditional-phase2-gate (gate-UX overhaul, part 1)
- [[CORE-088]] — gate-UX check-in 2 (gate-UX overhaul, no-op confirmation)
- [[CORE-089]] — conditional-precommit-gate (gate-UX overhaul, part 2)
- [[CORE-090]] — flowtron-info-skill adopter framing
- [[CORE-091]] — wiring-snippet single-source collapse
- [[CORE-092]] — epic-discovery cite-don't-restate
- [[CORE-093]] — SPEC tasknote-template claim trim
- [[FE-031]] — viz-chip-system-trim
- [[CORE-083]] — release v2.0.1 (most recent precedent; mirror its closure shape)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Minor release. 11 commits since v2.0.1; 8 `feat:` (+CORE-084 added since the PLAN-line description was filed), 1 `fix:`, 1 `docs:`, 1 `chore:`. Highest rank is `feat:` → minor bump. No `feat!:` or `BREAKING CHANGE:` commits. Pattern is well-established (CORE-060 v1.3.0, CORE-048 v1.2.0, CORE-046 v1.1.0 precedents for minor; CORE-080 v2.0.0 for major).

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior release tasknotes
- [x] **Drift check** — verify cited file paths and content
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live, confirmed on-spec):**
  - `SPEC.md:3` — `**Version:** v2.0.1` ✓
  - `SPEC/versioning.md:8` — patch example `v2.0.1 → v2.0.2` (needs shift to `v2.1.0 → v2.1.1`)
  - `SPEC/versioning.md:10` — minor example `v2.0.x → v2.1.0` (needs shift to `v2.1.x → v2.2.0`)
  - `SPEC/versioning.md:13` — major example `v2.x.y → v3.0.0` (stays — still future-looking)
  - `docs/MIGRATION.md:310` — `(e.g., \`v2.0.1\`)` (needs bump to `v2.1.0`)
  - `git describe --tags` → `v2.0.1` — matches SPEC.md:3, no drift
- **Commits since v2.0.1** (11 total):
  - `8a55fed` feat: CORE-091 — wiring-snippet single-source collapse (minor)
  - `7cb195b` feat: CORE-090 — flowtron-info-skill adopter framing (minor)
  - `5cc4b36` feat: CORE-093 — SPEC tasknote-template claim trim (minor)
  - `c3fea80` feat: CORE-092 — epic-discovery cite-don't-restate (minor)
  - `9b5046d` chore: CORE-088 — gate-UX check-in 2 (no-op) (patch)
  - `73ade2c` feat: CORE-089 — conditional-precommit-gate (minor)
  - `9f74553` feat: CORE-087 — conditional-phase2-gate (minor)
  - `8b5e5f2` feat: FE-031 — viz-chip-system-trim (minor)
  - `58ed7e6` fix: CORE-086 — contract-surface-fence-langtags (patch)
  - `ea07e22` docs: CORE-085 — align flowtron info /task phases with SPEC (patch)
  - `a428e4e` feat: CORE-084 — flowtron-info-skill (minor)
- **Archive skim:** CORE-083 (v2.0.1, patch), CORE-080 (v2.0.0, major), CORE-060 (v1.3.0, minor), CORE-048 (v1.2.0, minor) — canonical precedents. No structural drift in their recipe. CORE-083's Discovery Notes shape is the closest template.
- **Adopter migration impact:** None required. All eleven commits are either flowtron-self internal (SPEC/skill/docs/audit tweaks) or contract-compatible additions (new `/flowtron` info skill, gate-UX refinements applied via SPEC consumption, viz polish). No new symlinks to wire, no new slash commands adopters must install (the `/flowtron` skill ships in v1.0+ symlink set already via CORE-084's wiring; adopters who bumped past v2.0.0 already have it). No breaking changes. CORE-091's `claude/CLAUDE-snippet.md` collapse is a single-source consolidation — adopters who re-run `/new-project` benefit; existing adopters' CLAUDE.md is unchanged.
- **No clarifications needed.** Minor bump confirmed by commit log. User confirmed v2.1.0 in Step 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-083 / CORE-060 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits)

**Implementation Notes:**

Three edits:
1. `SPEC.md:3` — `**Version:** v2.0.1` → `**Version:** v2.1.0`
2. `SPEC/versioning.md:8,10` — patch example `v2.0.1 → v2.0.2` shifted to `v2.1.0 → v2.1.1`; minor example `v2.0.x → v2.1.0` shifted to `v2.1.x → v2.2.0` (major unchanged — still future-looking)
3. `docs/MIGRATION.md:310` — `(e.g., \`v2.0.1\`)` → `(e.g., \`v2.1.0\`)`

Verified post-edit: `grep -rn 'v2\.0\.1'` across live doc set returns empty — clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Markdown lint mental-pass: single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: version bump (Phase 2) · docs/MIGRATION.md: pin bump (Phase 2) · claude/CLAUDE-snippet.md: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-14.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v2.1.0 — minor release bundling eleven commits since v2.0.1. Headline additions: new `/flowtron` info skill (CORE-084 + adopter framing via CORE-085, CORE-090), conditional Phase 2 + pre-commit gate UX (CORE-087, CORE-089, CORE-088), SPEC + skill prose trims (CORE-092, CORE-093), wiring-snippet single-source collapse to claude/CLAUDE-snippet.md (CORE-091), markdown contract-surface fix (CORE-086), and viz chip-system trim (FE-031). Three doc-only edits land in this release: SPEC.md version bump, SPEC/versioning.md patch + minor example shifts, MIGRATION.md pin bump. No project-side changes required for adopters — all eleven changes are either flowtron-self internal or contract-compatible additions consumed automatically on submodule bump.

**Archived:** 2026-05-14
