---
title: release v4.2.0
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-205, CORE-EPIC-208, CORE-206, CORE-207, CORE-194, CORE-204]
---

# CORE-210 | release v4.2.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-205]] [[CORE-EPIC-208]] [[CORE-206]] [[CORE-207]] [[CORE-194]] [[CORE-204]]

## 🎯 Goal

Cut flowtron v4.2.0 — minor release tagging agent-neutral [heavy]/[light] model labels (CORE-206 + heavy rollout in EPIC-208), post-closure copy-paste cleanup + suggestion UX + verify-sweep, agent-neutrality sweep (EPIC-205), agent-aware model guidance (CORE-207), and GSD-Pi learnings + SECURITY allowlist docs (CORE-194.4) since v4.1.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.1.0` → `**Version:** v4.2.0`
- [ ] `docs/MIGRATION.md:289` — example pin bumped `v4.1.0` → `v4.2.0`
- [ ] `SECURITY.md:66` — example pin bumped `v4.1.0` → `v4.2.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-210 — flowtron v4.2.0 (...)` commit lands
- [ ] Annotated `v4.2.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-210.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.1.0` → `**Version:** v4.2.0`
- [ ] `docs/MIGRATION.md:289` — bump example pin `(e.g., \`v4.1.0\`)` → `(e.g., \`v4.2.0\`)`
- [ ] `SECURITY.md:66` — bump example pin `(e.g. \`v4.1.0\`)` → `(e.g. \`v4.2.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.2.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-205]] — agent-neutrality-sweep (docs + wiring symmetry)
- [[CORE-EPIC-208]] — heavy-light-suggestions (neutral labels adoption, post-closure UX, global CLAUDE.md, verify-sweep)
- [[CORE-206]] — introduce neutral primary model labels [heavy]/[light] (foundational)
- [[CORE-207]] — agent-aware model guidance (centralized practical examples + Grok [light] default)
- [[CORE-194]] — gsd-pi-learnings (SECURITY.md adopter scanner allowlist guidance)
- [[CORE-204]] — release v4.1.0 (most recent precedent)

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 14 commits since v4.1.0 (mix of `feat:`, `docs:`, `chore:`). Highest-rank classification = `feat:` (no `!` or BREAKING) → minor bump. PLAN-line target `v4.2.0` exactly matches the computed bump (v4.1.0 → v4.2.0); user confirmed at `/ft-release` Step 2 + explicit "go". Recipe is canonical and living (CORE-204 v4.1.0 is the immediate precedent). Only three live version pins exist in the AI-referenced doc set; all other v4.1.0 references are historical or inside this tasknote.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-204 (v4.1.0), CORE-193 (v4.0.0), CORE-048 (v1.2.0); see Discovery Notes
- [x] **Drift check** — see Discovery Notes; the three pin locations (SPEC.md:3, MIGRATION.md:289, SECURITY.md:66) are live and exact at HEAD. No other v4.1.0 pins in the live doc surface (verified via broad grep excluding archive/).
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v4.1.0` ✓
- `docs/MIGRATION.md:289` — `(e.g., \`v4.1.0\`)` (final pin verification paragraph) ✓
- `SECURITY.md:66` — `v4.1.0` in "Pin to annotated release tags (e.g. `v4.1.0`)" ✓
- `git describe --tags --abbrev=0` → `v4.1.0` — matches `SPEC.md:3`, no drift ✓

### Commits since v4.1.0 (14 total)

Grouped by adopter-facing area (from `git log v4.1.0..HEAD`):

**Agent neutrality + heavy/light labels (primary theme of the release):**
- feat: CORE-206 — introduce neutral primary model labels [heavy]/[light]
- feat: CORE-208.2 — agent-agnostic post-closure copy-paste in ft-task + ft-epic-discovery
- feat: CORE-208.5 — verify-sweep (heavy-light-suggestions epic)
- feat: CORE-208.7 — suggestion-ux-cleanup
- docs: CORE-208.4 — global-claude-md
- chore: CORE-208.3 — micro-audit-fragments
- chore: CORE-208.8 — audit CORE-EPIC-208
- docs: CORE-205.3 — wiring-layer-symmetry
- docs: CORE-205.4 — adopter-neutrality carve-outs
- chore: CORE-205.6 — audit CORE-EPIC-205

**Model guidance + docs currency:**
- docs: CORE-207 — agent-aware model guidance (centralized practical examples + Grok [light] default)
- docs: CORE-194.4 — Add adopter scanner false-positive allowlist guidance to SECURITY.md
- chore: CORE-194.5 — audit CORE-EPIC-194

**Epic scaffolding (internal):**
- feat: CORE-205.1 — file CORE-EPIC-205 + scope children

### Archive skim findings

- **CORE-204** (v4.1.0, 2026-05-25) — immediate precedent. 3-file bump (SPEC + MIGRATION + SECURITY). Clean "no required project-side edits" migration block. We follow the identical shape.
- **CORE-193** (v4.0.0, major) and **CORE-048** (v1.2.0, minor) — established the single-commit + annotated tag + Changes + Migration structure that all subsequent releases use.
- No structural drift in the release recipe between CORE-204 and today.

### Adopter migration impact (v4.1.0 → v4.2.0) — no required adopter action

All 14 commits are internal polish, agent-neutrality improvements, or doc currency for flowtron-self:

- Neutral [heavy]🧠 / [light]🔧 labels + post-closure cleanup (EPIC-208 + CORE-206): transparent UX win for anyone using the skills. No project-side files or wiring changes required.
- Agent-neutrality sweep (EPIC-205): docs + wiring symmetry only; adopters already on the agent-neutral contract (per CORE-205) see no breakage.
- CORE-207 / CORE-194.4: documentation improvements only (model guidance examples, SECURITY allowlist).
- No SPEC contract changes, no new required sections in adopter `_project/tasknote/README.md`, no behavior changes to skills or commands.

**Migration block (for the annotated tag):** "No required project-side edits. All changes are additive or internal to flowtron-self. Adopters bumping the submodule receive improved suggestion quality and cleaner model-agnostic copy-paste text automatically."

### Assumptions (explicit, no clarifying questions needed)

1. The three version pins (SPEC, MIGRATION, SECURITY) are the only live references that move in this cut. Historical references in archive/ and older tasknotes stay as-is (write-once).
2. The tag message will group under "Agent neutrality + model selection UX" and "Doc currency", following the CORE-204 precedent of area-based bullets.
3. Push-go will be offered at the 📦 gate (default Yes, per recent release precedent).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-204 (v4.1.0) and CORE-193 exact precedent: three single-token version pin substitutions in SPEC + MIGRATION + SECURITY. No new prose or structural change.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only prose edits)

**Implementation Notes:**

Three edits in order (exact surgical replacements):

1. `SPEC.md:3` — `**Version:** v4.1.0` → `**Version:** v4.2.0`.
2. `docs/MIGRATION.md:289` — example pin `(e.g., \`v4.1.0\`)` → `(e.g., \`v4.2.0\`)`.
3. `SECURITY.md:66` — example pin `(e.g. \`v4.1.0\`)` → `(e.g. \`v4.2.0\`)`.

Verified post-edit: `grep -rn 'v4\.1\.0'` across the live doc set (`SPEC.md`, `SPEC/`, `docs/`, `README.md`, `templates/`, `claude/`) returns empty (only historical refs in `_project/PLAN.md`, this tasknote, and `archive/` remain, per write-once policy). Total diff: 3 files, +3/−3.

No other files touched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure markdown-prose version pins; no executable surface)
- [x] Ran lint/type-check on changed code — N/A for markdown (no frontmatter, fenced blocks, or links altered)
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz change)

**Testing Notes:**

Markdown lint mental-pass passed. All three edits are single-token version-string substitutions inside existing prose sentences. Surrounding text, formatting, and structure untouched. Viz suite and any code paths are completely unaffected by a release cut (per established precedent). No re-run required.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — via `ft-audit-docs` subroutine (5 passes over the 9-file AI-referenced set declared in `_project/tasknote/README.md` §"AI-referenced docs"). 0 findings requiring absorption into this cut. Version pins were the only currency items and are now updated in Phase 2. Prior epics (CORE-EPIC-205/208) already executed their own full audits at closure (.6 / .8). No new critical drift surfaced.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.2.0 — minor release tagging the agent-neutrality sweep (EPIC-205), heavy-light-suggestions rollout (EPIC-208), neutral [heavy]/[light] model labels (CORE-206), agent-aware model guidance (CORE-207), and supporting docs (CORE-194.4). Three doc-only edits (SPEC.md:3, docs/MIGRATION.md:289, SECURITY.md:66 version pins). Single commit + annotated `v4.2.0` tag with adopter-facing notes. No required project-side edits for adopters. Tag pushed to origin.

**Archived:** 2026-05-26
