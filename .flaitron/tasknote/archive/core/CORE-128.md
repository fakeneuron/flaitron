---
title: release v3.2.0
status: completed
tags: []
created: 2026-05-20
due:
related-tasks: [CORE-121, CORE-122, CORE-123, CORE-124, CORE-125, CORE-126, CORE-127, CORE-120, FE-044, FE-039, FE-040, FE-041, FE-042, FE-043, CORE-114, CORE-116, CORE-118, CORE-113]
---

# CORE-128 | release v3.2.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-121]] [[FE-044]] [[FE-039]] [[CORE-114]] [[CORE-113]]

## 🎯 Goal

Cut flowtron v3.2.0 — minor bump shipping SECURITY.md integration into the AI-referenced doc set (CORE-121/123/126/127), CORE-120's PLAN.md critical-heading cleanup, CORE-122's PHILOSOPHY.md historical-frame update, CORE-124–125's SPEC + snippet tightening, FE-044's critical-as-flag redesign, FE-039–043's viz board and UI refinements, and CORE-114+116+118's viz security and code-quality pass.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v3.1.0` → `**Version:** v3.2.0`
- [ ] `SPEC/versioning.md` — patch + minor examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 / CORE-105 / CORE-113 precedent; major `v3.x.y → v4.0.0` stays — still future-looking)
- [ ] `docs/MIGRATION.md` — example pin bumped `v3.1.0` → `v3.2.0` (line 285 at time of filing)
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-128 — flowtron v3.2.0 (...)` commit lands
- [ ] Annotated `v3.2.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-128.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v3.1.0` → `**Version:** v3.2.0`
- [ ] `SPEC/versioning.md` — shift patch example `v3.1.0 → v3.1.1` to `v3.2.0 → v3.2.1`; shift minor `v3.1.x → v3.2.0` to `v3.2.x → v3.3.0`; major stays `v3.x.y → v4.0.0`
- [ ] `docs/MIGRATION.md:285` — bump example pin `(e.g., \`v3.1.0\`)` → `(e.g., \`v3.2.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v3.2.0` (subject + summary + Changes since v3.1.0 + Migration block); push tag to origin

## 🔗 Related

- [[CORE-121]] — add SECURITY.md to AI-referenced docs list
- [[CORE-123]] — sync ft-audit-docs SKILL fork with CORE-121 SECURITY.md addition
- [[CORE-126]] — add npm install step to CLAUDE-snippet.md
- [[CORE-127]] — add SECURITY.md to ft-flowtron key-docs list
- [[CORE-120]] — remove legacy ## Critical heading from PLAN.md; add (none) placeholders
- [[CORE-122]] — reframe PHILOSOPHY.md Model bullet as historical pattern
- [[CORE-124]] — retire stale "future visualizer" parenthetical in SPEC
- [[CORE-125]] — normalize git -C snippet form; add SECURITY.md to README
- [[FE-044]] — critical-as-flag (drop Priority='Critical', add [!critical] PLAN-line flag)
- [[FE-039]] — board view: render Critical as leftmost column / omit when empty
- [[FE-040]] — add chevron expand-affordance to list-view task rows
- [[FE-041]] — bump phase dots to 10px and fix inactive-dot contrast
- [[FE-042]] — search-match highlight + fix shortname filter gap
- [[FE-043]] — normalize STATUS_CHIP_LABEL to mono glyphs
- [[CORE-114]] — viz dev-server security pass (origin guard + vite v6 bump + SECURITY.md)
- [[CORE-116]] — extract App.tsx data-loading into useProjects + useProjectData hooks
- [[CORE-118]] — extract originGuard/devApi from vite.config + add unit tests
- [[CORE-113]] — release v3.1.0 (most recent precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 21 commits since v3.1.0 (17 `feat:` + 4 `chore:`). All are `feat:` (no `!`) or `chore:` — highest rank is minor. PLAN-line target v3.2.0 agrees. Recipe pattern is canonical (CORE-113 v3.1.0, CORE-105 v3.0.0 precedents). No breaking changes — Migration block is additive-only (FE-044 critical-as-flag is opt-in; SECURITY.md adoption is opt-in for forked ft-audit-docs scopes).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; MIGRATION.md pin drifted from line 349 (CORE-113) → 285 (terse-pass cut content above it); content confirmed at 285
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v3.1.0` ✓
- `SPEC/versioning.md:12` — patch example `v3.1.0 → v3.1.1` (needs shift to `v3.2.0 → v3.2.1`)
- `SPEC/versioning.md:14` — minor example `v3.1.x → v3.2.0` (needs shift to `v3.2.x → v3.3.0`)
- `SPEC/versioning.md:17` — major example `v3.x.y → v4.0.0` (stays — still future-looking)
- `docs/MIGRATION.md:285` — `(e.g., \`v3.1.0\`)` (needs bump to `v3.2.0`)
- `git describe --tags --abbrev=0` → `v3.1.0` — matches SPEC.md:3, no drift ✓

### Commits since v3.1.0 (21 total)

**SECURITY.md integration (CORE-121/123/125/126/127):**
- feat: CORE-121 — add SECURITY.md to AI-referenced docs list
- feat: CORE-123 — sync ft-audit-docs SKILL fork with CORE-121 SECURITY.md addition
- feat: CORE-125 — normalize git -C snippet form; add SECURITY.md to README
- feat: CORE-126 — add npm install step to CLAUDE-snippet.md
- feat: CORE-127 — add SECURITY.md to ft-flowtron key-docs list

**Doc-set and SPEC improvements (CORE-120/122/124):**
- feat: CORE-120 — remove legacy ## Critical heading, add (none) placeholders
- feat: CORE-122 — reframe PHILOSOPHY.md Model bullet as historical pattern
- feat: CORE-124 — retire stale "future visualizer" parenthetical in SPEC

**Viz — critical-as-flag + UI refinements (FE-039/040/041/042/043/044):**
- feat: FE-044 — critical-as-flag (drop Priority='Critical', add [!critical] PLAN-line flag)
- feat: FE-039 — board view: render Critical as leftmost column / omit when empty
- feat: FE-040 — add chevron expand-affordance to list-view task rows
- feat: FE-041 — bump phase dots to 10px and fix inactive-dot contrast
- feat: FE-042 — search-match highlight + fix shortname filter gap
- feat: FE-043 — normalize STATUS_CHIP_LABEL to mono glyphs

**Viz — security and code-quality pass (CORE-114/115/116/117/118/119):**
- feat: CORE-114 — viz dev-server security pass (origin guard + vite v6 bump + SECURITY.md)
- feat: CORE-116 — extract App.tsx data-loading into useProjects + useProjectData hooks
- feat: CORE-118 — extract originGuard/devApi from vite.config + add unit tests
- chore: CORE-115 — viz ESLint baseline + lint script
- chore: CORE-119 — bump viz engines.node >=18 → >=20 (Node 18 EOL)
- chore: CORE-117 — push legacy-pre-v0.1.0 tag + rm legacy/ dir

**Process / filing (omit from adopter-facing Changes block):**
- chore: token-economy pass — tighten SPEC + skills + MIGRATION (−229 lines)

### Archive skim findings

- **CORE-113** (v3.1.0, minor, 2026-05-18) — most recent precedent; same bump shape (minor, additive, no required adopter edits). Directly applicable.
- **CORE-105** (v3.0.0, major, 2026-05-17) — breaking-change release; v3.2.0 is additive only — no re-symlink, no mandatory adopter steps.
- **CORE-102** (v2.2.0, minor, 2026-05-17) — second closest shape; confirmed "no required project-side edits" migration block pattern for minor releases.

### Adopter migration impact (v3.1.0 → v3.2.0) — additive only

- **No required project-side edits** on submodule bump. Adopters bump the submodule SHA and get all improvements automatically.
- **FE-044 critical-as-flag**: Adopters who want to use the viz's Critical board column should add `[!critical]` to the relevant PLAN lines. Prior `Priority: Critical` frontmatter field (if any adopter used it) is superseded. Opt-in; no action needed if the Critical column is not in use.
- **CORE-121/123 SECURITY.md in AI-ref scope**: Flowtron-self's ft-audit-docs now includes SECURITY.md in its 5-file AI-referenced set. Adopters who have forked ft-audit-docs should add SECURITY.md to their own scope if they have one in their repo. Opt-in.
- **CORE-126 CLAUDE-snippet npm install**: The wiring snippet now explicitly includes `npm install` for the viz. Adopters re-running setup or onboarding new contributors benefit automatically.
- **Viz improvements** (FE-039–043, CORE-114–118): Adopters running the centralized viz get all improvements automatically on submodule bump. No config needed.
- **CORE-119 Node >=20**: The viz's `engines.node` field now requires Node 20+. Adopters running the viz on Node 18 should upgrade. Node 18 reached EOL April 2025.

### Drift check details

- `SPEC.md:3` confirmed `**Version:** v3.1.0` at HEAD ✓
- `SPEC/versioning.md:12,14,17` confirmed (patch / minor / major examples) ✓
- `docs/MIGRATION.md:285` confirmed `(e.g., \`v3.1.0\`)` ✓ (line drifted from 349 → 285 since CORE-113 due to terse-pass trimming content above it)
- `git describe --tags --abbrev=0` → `v3.1.0` ✓ (matches SPEC.md:3)

### Assumptions (explicit, no clarifying questions needed)

1. **Bump kind:** `minor` (v3.1.0 → v3.2.0). All 17 `feat:` commits are additive; no `feat!:` or `BREAKING CHANGE:`. PLAN-line shortname `release v3.2.0` confirms.
2. **Major example in SPEC/versioning.md:** Stays `v3.x.y → v4.0.0` — still future-looking (no v4.x.y series yet).
3. **Migration block:** Additive opt-in (FE-044 critical-as-flag, SECURITY.md ft-audit-docs scope, Node >=20 for viz); no required project-side edits.
4. **Tag Changes block:** Grouped by area (SECURITY.md integration / Doc-set improvements / Viz — critical-as-flag + UI / Viz — security + code quality). Omits 4 `chore:` process commits and the token-economy pass from the adopter-facing block.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-113 / CORE-105 / CORE-102 release-task pattern
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Four doc edits in order:

1. `SPEC.md:3` — `**Version:** v3.1.0` → `**Version:** v3.2.0`.
2. `SPEC/versioning.md:12,14` — patch `v3.1.0 → v3.1.1` shifted to `v3.2.0 → v3.2.1`; minor `v3.1.x → v3.2.0` shifted to `v3.2.x → v3.3.0`; major `v3.x.y → v4.0.0` stays (still future-looking).
3. `docs/MIGRATION.md:285` — example pin `(e.g., \`v3.1.0\`)` → `(e.g., \`v3.2.0\`)`.
4. `SECURITY.md:59` — example pin `(e.g. \`v3.1.0\`)` → `(e.g. \`v3.2.0\`)` (ft-audit-docs subroutine Finding #1 Low — absorbed inline).

Verified post-edit: `grep -rn 'v3\.1\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/ SECURITY.md CONTRIBUTING.md` returns empty — live doc set clean. Total diff: 4 files, +4/−4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: all edits are single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — ft-audit-docs subroutine (5 passes, 7-file AI-referenced scope):
  - `SECURITY.md` — 1 Low finding absorbed inline (example pin bumped v3.1.0 → v3.2.0)
  - `SPEC.md` — version-line bump (Phase 2)
  - `docs/MIGRATION.md` — example-pin bump (Phase 2)
  - `claude/CLAUDE-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (historical v3.0.0 ref at line 25 is write-once)
  - `CONTRIBUTING.md` — no change
  - `README.md` — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-20.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v3.2.0 — minor release shipping SECURITY.md integration into the 7-file AI-referenced doc set (CORE-121/123/125/126/127), CORE-120's PLAN.md critical-heading cleanup, CORE-122's PHILOSOPHY.md historical-frame update, CORE-124's SPEC terse nit, FE-044's [!critical] flag redesign replacing the prior Priority='Critical' frontmatter approach, FE-039–043's viz board and UI refinements, and CORE-114+116+118+119's viz dev-server security pass and code-quality improvements.

Four doc-only edits land in the release commit: SPEC.md:3 version bump v3.1.0 → v3.2.0; SPEC/versioning.md patch + minor example shifts (major stays — still future-looking); MIGRATION.md:285 example pin bump; SECURITY.md:59 example pin bump (ft-audit-docs subroutine Finding #1 Low, absorbed inline). No required adopter steps on submodule bump. Opt-in: [!critical] PLAN-line flag for viz Critical column; SECURITY.md addition to forked ft-audit-docs scopes; Node >=20 for viz.

**Archived:** 2026-05-20
