---
title: release v4.1.0
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-198, CORE-197, CORE-199, CORE-200, CORE-201, CORE-202, CORE-203, CORE-193]
---

# CORE-204 | release v4.1.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-198]] [[CORE-197]] [[CORE-199]] [[CORE-200]] [[CORE-193]]

## 🎯 Goal

Cut flowtron v4.1.0 — minor release tagging CORE-EPIC-198 (context-chain-portability: CLAUDE.md consolidation + grok wiring verification), CORE-197 (viz header logo + version subline), and CORE-199/200 (SPEC signal improvements: model-selection reduction + shell-discipline lift decision) plus ft-audit follow-ups CORE-201/202/203 since v4.0.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.0.0` → `**Version:** v4.1.0`
- [ ] `docs/MIGRATION.md:289` — example pin bumped `v4.0.0` → `v4.1.0`
- [ ] `SECURITY.md:66` — example pin bumped `v4.0.0` → `v4.1.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-204 — flowtron v4.1.0 (...)` commit lands
- [ ] Annotated `v4.1.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-204.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.0.0` → `**Version:** v4.1.0`
- [ ] `docs/MIGRATION.md:289` — bump example pin `(e.g., \`v4.0.0\`)` → `(e.g., \`v4.1.0\`)`
- [ ] `SECURITY.md:66` — bump example pin `(e.g. \`v4.0.0\`)` → `(e.g. \`v4.1.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.1.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-198]] — context-chain-portability (CLAUDE.md consolidation + grok wiring verification) — primary SPEC improvement of this release
- [[CORE-197]] — viz header logo + flowtron version in stats subline (additive; no adopter action)
- [[CORE-199]] — reduce user §Model Selection to one general sentence (SPEC improvement)
- [[CORE-200]] — shell-discipline lift candidate: decided not to lift the agent-neutral half (SPEC signal)
- [[CORE-201]] — ft-audit scope vs AI-referenced-docs reconciliation (doc-only)
- [[CORE-202]] — philosophy-md whats-next refresh (doc-only)
- [[CORE-203]] — ft-audit-context self-symlink cleanup (doc-only)
- [[CORE-193]] — release v4.0.0 (most recent precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 13 commits since v4.0.0 (mixed `feat:` / `chore:`). Highest-rank classification = `feat:` → minor bump. PLAN-line target `v4.1.0` matches the computed minor bump (v4.0.0 → v4.1.0); user confirmed at `/ft-release` Step 2. Recipe is canonical (CORE-193 v4.0.0 is the most recent precedent). SECURITY.md:66 carries an example pin that was bumped in CORE-193 — applying the same treatment here.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-193 (v4.0.0), CORE-128 (v3.2.0), CORE-105 (v3.0.0); see Discovery Notes
- [x] **Drift check** — see Discovery Notes; pin locations confirmed at SPEC.md:3, MIGRATION.md:289, SECURITY.md:66 — no line drift since v4.0.0
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v4.0.0` ✓
- `docs/MIGRATION.md:289` — `(e.g., \`v4.0.0\`)` ✓
- `SECURITY.md:66` — `(e.g. \`v4.0.0\`)` ✓
- `git describe --tags --abbrev=0` → `v4.0.0` — matches `SPEC.md:3`, no drift ✓

### Commits since v4.0.0 (13 total)

Grouped by adopter-facing area:

**Context-chain portability (CORE-EPIC-198):**
- feat: CORE-198.1 — file CORE-EPIC-198 + scope children (epic setup)
- feat: CORE-198.2 — redundancy audit + file CORE-199/200
- feat: CORE-198.3 — consolidate user CLAUDE.md + retire ~/code/CLAUDE.md (flowtron-self; no adopter impact)
- feat: CORE-198.4 — grok-adoption-verification (verified agent-neutral wiring works under grok)
- feat: CORE-198.5 — audit CORE-EPIC-198

**Viz embellishment (CORE-197):**
- feat: CORE-197 — viz header logo + flowtron version in stats subline (additive; no adopter action)

**SPEC signal improvements (CORE-199 / CORE-200):**
- feat: CORE-199 — reduce user §Model Selection to one general sentence (SPEC improvement; no adopter action)
- feat: CORE-200 — decide not to lift §Shell discipline agent-neutral half (SPEC decision; no adopter action)

**Doc currency (CORE-201/202/203):**
- chore: CORE-201/202/203 — ft-audit follow-ups (scope, PHILOSOPHY, detritus)

**Epic filing / process (no adopter impact):**
- feat: CORE-194.1 — file CORE-EPIC-194 + scope children
- feat: CORE-194.2 — docs/VISION.md + SPEC PR-archetype subsection
- feat: CORE-195.1 — file CORE-EPIC-195 + scope children
- chore: file CORE-196 starter — worktree-convention

### Archive skim findings

- **CORE-193** (v4.0.0, major, 2026-05-24) — most recent precedent. 3-file recipe (SPEC + MIGRATION + SECURITY bumped). Migration block was detailed (three themes). This release's migration block is simpler: no breaking or positioning shift; informational only.
- **CORE-128** (v3.2.0, minor, 2026-05-20) — canonical minor precedent. Clean "no required project-side edits" migration block shape.

### Adopter migration impact (v4.0.0 → v4.1.0) — no required adopter action

All commits are additive or internal:
- **CORE-EPIC-198** (context-chain-portability): flowtron-self CLAUDE.md consolidation; grok wiring verification confirms existing agent-neutral contract works — no adopter action.
- **CORE-197** (viz header): viz-only embellishment — adopters who run the viz get the version display automatically; no action.
- **CORE-199/200** (SPEC signal): prose-only SPEC improvements; no behavior change.
- **CORE-201/202/203** (ft-audit follow-ups): doc-only; no adopter action.
- **CORE-194/195** (new epics filed): epic scaffolding only; shipped features (children) not yet complete.
- **CORE-196** (worktree-convention): starter tasknote only; skill not yet authored.

**Migration block:** "No required project-side edits. All changes are additive or internal to flowtron-self."

### Assumptions (explicit, no clarifying questions needed)

1. **Bump kind:** minor (v4.0.0 → v4.1.0). Locked at `/ft-release` Step 2.
2. **SECURITY.md pin bump:** Apply (consistent with CORE-193 precedent).
3. **Migration block:** "No required project-side edits" (CORE-128 minor-release shape).
4. **No additional doc edits anticipated** beyond the 3-file pin recipe.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-193 / CORE-128 release-task pattern (3-file pin recipe)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits)

**Implementation Notes:**

3 doc edits applied in order:
1. `SPEC.md:3` — `**Version:** v4.0.0` → `**Version:** v4.1.0`
2. `docs/MIGRATION.md:289` — example pin `(e.g., \`v4.0.0\`)` → `(e.g., \`v4.1.0\`)`
3. `SECURITY.md:66` — example pin `(e.g. \`v4.0.0\`)` → `(e.g. \`v4.1.0\`)`

Verified post-edit: `grep -rn 'v4\.0\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/ SECURITY.md CONTRIBUTING.md` returns empty — live doc set clean. Total diff: 3 files, +3/−3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

Markdown lint mental-pass: 3 edits are single-token version-string substitutions; surrounding prose unchanged. No frontmatter touched; no fenced blocks broken. Viz suite untouched — viz code unchanged in this release commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `Skill(ft-audit-docs)` subroutine, 5 passes, 9-file AI-referenced scope: all nine docs returned zero findings. Version pins (SPEC.md, MIGRATION.md, SECURITY.md) updated in Phase 2; all other docs: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.1.0 — minor release. Headline: CORE-EPIC-198 (context-chain portability verified under grok; user CLAUDE.md consolidated) + CORE-197 (viz header logo + version subline) + CORE-199/200 (SPEC signal improvements: §Model Selection trimmed, §Shell discipline lift deliberately declined and documented). New epics CORE-EPIC-194/195 and CORE-196 starter filed; their children are in-progress and not yet shipped. Doc-currency chore: CORE-201/202/203 (ft-audit scope reconciliation, PHILOSOPHY.md refresh, ft-audit-context symlink cleanup). Doc-drift sweep: zero findings across 9-file AI-referenced set. Adopter migration: no required project-side edits; submodule bump is sufficient.

**Archived:** 2026-05-25
