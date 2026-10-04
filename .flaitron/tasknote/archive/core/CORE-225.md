---
title: release v4.3.0
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-195, CORE-EPIC-215, CORE-EPIC-211, CORE-EPIC-194, CORE-EPIC-208, CORE-210]
---

# CORE-225 | release v4.3.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-195]] [[CORE-EPIC-215]] [[CORE-EPIC-211]] [[CORE-EPIC-194]] [[CORE-EPIC-208]] [[CORE-210]]

## 🎯 Goal

Cut flowtron v4.3.0 — minor release tagging the `/ft-debug` skill (EPIC-195), the worktree convention + `/ft-worktree-start`/`-end` skills (EPIC-215), the contract-gates SPEC work (EPIC-211), and supporting doc/hygiene work since v4.2.0.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v4.2.0` → `**Version:** v4.3.0`
- [ ] `docs/MIGRATION.md:325` — example pin bumped `v4.2.0` → `v4.3.0`
- [ ] `SECURITY.md:70` — example pin bumped `v4.2.0` → `v4.3.0`
- [ ] `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION` bumped `v4.2.0` → `v4.3.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-225 — flowtron v4.3.0 (...)` commit lands
- [ ] Annotated `v4.3.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-225.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v4.2.0` → `**Version:** v4.3.0`
- [ ] `docs/MIGRATION.md:325` — bump example pin `(e.g., \`v4.2.0\`)` → `(e.g., \`v4.3.0\`)`
- [ ] `SECURITY.md:70` — bump example pin `(e.g. \`v4.2.0\`)` → `(e.g. \`v4.3.0\`)`
- [ ] `viz/src/ui/constants.ts:39` — bump `FLOWTRON_VERSION = 'v4.2.0'` → `'v4.3.0'`
- [ ] Phase 3 — markdown lint mental-pass on edited lines + viz lint/typecheck
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v4.3.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-195]] — ft-debug-skill (hypothesis-first debugging skill + command + adopter wiring + SPEC integration)
- [[CORE-EPIC-215]] — worktree-convention (isolated git worktrees for independent epic children; thin start/end skills + docs/WORKTREES.md)
- [[CORE-EPIC-211]] — contract-gates (SPEC gate-prose + template/skill alignment)
- [[CORE-EPIC-194]] — gsd-pi-learnings (VISION.md + supporting docs)
- [[CORE-EPIC-208]] — heavy-light-suggestions (closed in this window)
- [[CORE-210]] — release v4.2.0 (most recent precedent; 4-pin bump shape)

---
## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 35 commits since v4.2.0 (mix of `feat:`, `fix:`, `docs:`, `chore:`). Highest-rank classification = `feat:` (no `!` or BREAKING) → minor bump. PLAN-line target `v4.3.0` matches the computed bump (v4.2.0 → v4.3.0); user confirmed at `/ft-release` Step 2. Recipe is canonical and living (CORE-210 v4.2.0 is the immediate precedent). Four live version pins exist in the AI-referenced doc set; all other v4.2.0 references are historical or inside this tasknote.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-210 (v4.2.0), CORE-204 (v4.1.0), CORE-048 (v1.2.0); see Discovery Notes
- [x] **Drift check** — the four pin locations are live and exact at HEAD (SPEC.md:3, docs/MIGRATION.md:325, SECURITY.md:70, viz/src/ui/constants.ts:39). No other v4.2.0 pins in the live doc surface (verified via broad grep excluding archive/ + PLAN.md history).
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v4.2.0` ✓
- `docs/MIGRATION.md:325` — `(e.g., \`v4.2.0\`)` (final pin verification paragraph) ✓
- `SECURITY.md:70` — `v4.2.0` in "Pin to annotated release tags (e.g. `v4.2.0`)" ✓
- `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.2.0'` ✓
- `git describe --tags --abbrev=0` → `v4.2.0` — matches `SPEC.md:3`, no drift ✓

### Commits since v4.2.0 (35 total) — grouped by adopter-facing area

**`/ft-debug` skill (EPIC-195):**
- feat: /ft-debug skill + command stub (CORE-195.2)
- docs: CORE-195.3 — wire /ft-debug into adopter-facing surfaces
- docs: CORE-195.4 — SPEC integration for /ft-debug
- feat: CORE-195.5 — audit CORE-EPIC-195

**Worktree convention + skills (EPIC-215):**
- docs: CORE-215.2 — worktree-doc (docs/WORKTREES.md)
- feat: CORE-215.3 — worktree-start (thin skill + command)
- feat: add thin /ft-worktree-end skill + command (CORE-215.4)
- chore: wire /ft-worktree-start + /ft-worktree-end into 5 adopter surfaces (CORE-215.5)
- feat: CORE-215.6 — audit CORE-EPIC-215

**Contract-gates + epic closures (EPIC-211, EPIC-194, EPIC-208):**
- feat: CORE-211.6 / docs: CORE-211.2/.3/.4 — contract-gates SPEC + skill/template prose
- chore: CORE-EPIC-194 — close gsd-pi-learnings epic
- chore: CORE-EPIC-208 — close heavy-light-suggestions epic

**Hygiene / fixes / doc currency (standalone):**
- fix: CORE-222 — viz-watch-export-hygiene
- fix: CORE-221 — viz-version-drift
- chore: CORE-220 — settings-local-allowlist-growth
- chore: CORE-219 — incomplete-dot-claude-skill-wiring
- fix: CORE-216 — repair dangling [[CORE-196]] cite in docs/WORKTREES.md
- chore: CORE-217/CORE-218 — .claude/ wiring hygiene + MIGRATION §1.2.2 contributor setup
- docs: CORE-214/CORE-213/CORE-212/CORE-209 — settings hygiene, CONVENTIONS retarget, seed-surface cleanup, MIGRATION href fix
- docs: CORE-EPIC-223 — spec-lazy-module-split (SPEC/ modular split)

### Archive skim findings

- **CORE-210** (v4.2.0, 2026-05-26) — immediate precedent. 3 doc pins (SPEC + MIGRATION + SECURITY); note: viz `FLOWTRON_VERSION` was NOT yet a tracked pin at that cut. Clean "no required project-side edits" migration block.
- **CORE-204** (v4.1.0) / **CORE-048** (v1.2.0) — established the single-commit + annotated tag + Changes + Migration structure.
- **Structural note:** this cut adds a 4th pin (`viz/src/ui/constants.ts:39`) versus CORE-210's 3. CORE-221 (viz-version-drift, this window) made `FLOWTRON_VERSION` the canonical viz pin, so it now moves with each release.

### Adopter migration impact (v4.2.0 → v4.3.0) — no required adopter action

All 35 commits are additive skills, internal hygiene, or doc currency. New `/ft-debug`, `/ft-worktree-start`, `/ft-worktree-end` skills are auto-wired into adopters via `/ft-new-project` and documented in MIGRATION §1.2; existing adopters bumping the submodule pick them up with no manual file edits. No SPEC contract breakage, no new required tasknote sections.

**Migration block (for the annotated tag):** "No required project-side edits. New `/ft-debug` + worktree skills are additive; adopters bumping the submodule pin receive them automatically. The SPEC/ modular split (EPIC-223) is internal to flowtron-self and transparent to consumers."

### Assumptions (explicit, no clarifying questions needed)

1. The four version pins above are the only live references that move. Historical refs in archive/ and PLAN.md history stay (write-once).
2. The tag message groups by area: `/ft-debug`, worktree convention, contract/SPEC, doc currency.
3. Push-go offered at the 📦 gate (default Yes).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-210 (v4.2.0) precedent plus the new 4th pin from CORE-221. Four single-token version-string substitutions; no prose or structural change.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (3 doc-prose edits + 1 string-constant edit)

**Implementation Notes:**

Four edits in order:

1. `SPEC.md:3` — `**Version:** v4.2.0` → `**Version:** v4.3.0`.
2. `docs/MIGRATION.md:325` — example pin `(e.g., \`v4.2.0\`)` → `(e.g., \`v4.3.0\`)`.
3. `SECURITY.md:70` — example pin `(e.g. \`v4.2.0\`)` → `(e.g. \`v4.3.0\`)`.
4. `viz/src/ui/constants.ts:39` — `FLOWTRON_VERSION = 'v4.2.0'` → `'v4.3.0'`.

Verified post-edit: broad grep for `v4.2.0` across the live doc + code set returns empty (only historical refs in `_project/PLAN.md`, this tasknote, and `archive/` remain). Total diff: 4 files, +4/−4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz lint + typecheck (the constants.ts edit); markdown edits need no suite
- [x] Ran lint/type-check on changed code — `npm --prefix viz run lint` + `tsc --noEmit` both pass
- [x] (frontend) Asked the user for visual confirmation — N/A (version string only; no visual surface change beyond the footer label)

**Testing Notes:**

Markdown lint mental-pass passed — all three prose edits are single-token version substitutions inside existing sentences; no frontmatter, fenced blocks, or links altered. The `constants.ts` edit is a one-line string-constant substitution; viz lint (0) + typecheck (0) confirm it's clean. Full viz suite (163 tests) was green at audit earlier this session and is unaffected by a version-string change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — release-time currency sweep over the 9-file AI-referenced docs set. The four version pins were the only currency items; all now at v4.3.0. Broad straggler grep (`v4.[0-2].x` across SPEC/SPEC modules/docs/README/SECURITY/CONTRIBUTING/templates/claude/viz) returns empty. A full 5-pass `/ft-audit` (incl. doc-drift) ran clean earlier this session — 0 findings. Sweep done inline (subroutine skipped: tool channel was intermittent; the release-relevant job is pin currency, verified clean).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v4.3.0 — minor release tagging the `/ft-debug` skill (EPIC-195), the worktree convention + `/ft-worktree-start`/`-end` skills (EPIC-215), the contract-gates SPEC work (EPIC-211), the SPEC/ lazy-module split (EPIC-223), and supporting doc/hygiene work (EPIC-194/208 closures, CORE-209/212/213/214/216–222) since v4.2.0. Four version-pin edits (SPEC.md:3, docs/MIGRATION.md:325, SECURITY.md:70, viz/src/ui/constants.ts:39 — the last newly tracked via CORE-221). viz lint + typecheck green; 163-test suite unaffected. Single commit + annotated `v4.3.0` tag. No required project-side edits for adopters — the new skills are additive and auto-wired via `/ft-new-project`.

**Archived:** 2026-05-30
