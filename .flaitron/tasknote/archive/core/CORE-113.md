---
title: release v3.1.0
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-EPIC-097, CORE-109, CORE-110, CORE-111, CORE-112, FE-EPIC-033, FE-038, CORE-105]
---

# CORE-113 | release v3.1.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-099]] [[CORE-EPIC-097]] [[CORE-109]] [[CORE-110]] [[CORE-111]] [[CORE-112]] [[FE-EPIC-033]] [[FE-038]] [[CORE-105]]

## 🎯 Goal

Cut flowtron v3.1.0 — minor bump shipping CORE-EPIC-099's open-source foundations (MIT LICENSE, CONVENTIONS.md, CONTRIBUTING.md, .editorconfig, vault README section), CORE-EPIC-097's three new bundled skills (ft-stats, ft-quality, ft-epic-discovery --deep), CORE-109–112's doc-set and skill-listing improvements, and FE-EPIC-033+FE-038's viz theme system and contrast fix.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v3.0.0` → `**Version:** v3.1.0`
- [ ] `SPEC/versioning.md` — patch + minor examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 / CORE-105 precedent; major `v3.x.y → v4.0.0` stays — still future-looking)
- [ ] `docs/MIGRATION.md` — example pin bumped `v3.0.0` → `v3.1.0` (line 349 at time of filing)
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-113 — flowtron v3.1.0 (...)` commit lands
- [ ] Annotated `v3.1.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-113.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v3.0.0` → `**Version:** v3.1.0`
- [ ] `SPEC/versioning.md` — shift patch example `v3.0.0 → v3.0.1` to `v3.1.0 → v3.1.1`; shift minor `v3.0.x → v3.1.0` to `v3.1.x → v3.2.0`; major stays `v3.x.y → v4.0.0`
- [ ] `docs/MIGRATION.md:349` — bump example pin `(e.g., \`v3.0.0\`)` → `(e.g., \`v3.1.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v3.1.0` (subject + summary + Changes since v3.0.0 + Migration block); push tag to origin

## 🔗 Related

- [[CORE-EPIC-099]] — open-source foundations (MIT LICENSE, CONVENTIONS.md, CONTRIBUTING.md, .editorconfig, vault README section)
- [[CORE-EPIC-097]] — new bundled skills (ft-stats, ft-quality, ft-epic-discovery --deep, paths frontmatter on SPEC/*.md)
- [[CORE-109]] — SPEC.md terse pass (−662w / −12.2%)
- [[CORE-110]] — wire CONVENTIONS.md + CONTRIBUTING.md into AI-ref docs + ft-flowtron key docs
- [[CORE-111]] — ft-flowtron self-row in bundled-skills table
- [[CORE-112]] — ft-audit-docs scope refresh (4-file → 6-file AI-referenced set)
- [[FE-EPIC-033]] — viz theme system (palette picker, GitHub palette, curated themes)
- [[FE-038]] — viz muted-footer contrast fix (2.45:1 → 4.6:1 light)
- [[CORE-105]] — release v3.0.0 (most recent precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 29 commits since v3.0.0 (20 `feat:` + 9 `chore:`). All are `feat:` (no `!`) or `chore:` — highest rank is minor. PLAN-line target v3.1.0 agrees. Recipe pattern is canonical (CORE-105 v3.0.0, CORE-102 v2.2.0, CORE-094 v2.1.0 precedents). No breaking change — Migration block is additive-only (opt-in new skills for adopters who want ft-stats / ft-quality).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; MIGRATION.md pin drifted from line 335 → 349 since CORE-105 (content confirmed at 349); no other drift
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v3.0.0` ✓
- `SPEC/versioning.md:12` — patch example `v3.0.0 → v3.0.1` (needs shift to `v3.1.0 → v3.1.1`)
- `SPEC/versioning.md:14` — minor example `v3.0.x → v3.1.0` (needs shift to `v3.1.x → v3.2.0`)
- `SPEC/versioning.md:17` — major example `v3.x.y → v4.0.0` (stays — still future-looking)
- `docs/MIGRATION.md:349` — `(e.g., \`v3.0.0\`)` (needs bump to `v3.1.0`)
- `git describe --tags --abbrev=0` → `v3.0.0` — matches SPEC.md:3, no drift ✓

### Commits since v3.0.0 (29 total)

**CORE-EPIC-099 — open-source foundations:**
- feat: CORE-099.1 — file CORE-EPIC-099 children + audit
- feat: CORE-099.2 — add MIT LICENSE
- feat: CORE-099.3 — docs/CONVENTIONS.md (8 axes: 4 adherences + 4 declines)
- feat: CORE-099.4 — add .editorconfig (LF/UTF-8/2-space/trim/final-newline)
- feat: CORE-099.5 — README "Working in markdown vaults" (Obsidian + Foam + Logseq parity)
- feat: CORE-099.6 — CONTRIBUTING.md (solo-maintained; issues OK, PRs rare)
- feat: CORE-099.8 — README "License" section + CORE-EPIC-099 close

**CORE-EPIC-097 — external-skill survey:**
- feat: CORE-097.1 — file CORE-EPIC-097 children + audit
- feat: CORE-097.2 — /ft-stats skill (model dist + velocity + per-area)
- feat: CORE-097.3 — paths: frontmatter on SPEC/*.md lazy modules
- feat: CORE-097.4 — SPEC.md terse-pass audit + file CORE-109
- feat: CORE-097.5 — /ft-quality skill (lint+typecheck+test sweep)
- feat: CORE-097.6 — /ft-epic-discovery --deep mode (constitution → specify → clarify pre-pass)

**Doc-set and skill-listing improvements:**
- feat: CORE-110 — wire CONVENTIONS.md + CONTRIBUTING.md into AI-ref docs, repo layout, ft-flowtron key docs
- feat: CORE-111 — add /ft-flowtron self-row to bundled-skills table
- feat: CORE-112 — ft-audit-docs scope refresh (4-file → 6-file AI-referenced set)
- chore: CORE-109 — SPEC.md terse pass (Tier A+B trims; −662w / −12.2%)

**Viz — theme system + polish (FE-EPIC-033 + FE-034–038):**
- feat: FE-033.3 — linear palette curated
- feat: FE-033.4 — curated GitHub palette + picker unlock
- feat: FE-033.5 — palette picker UI + schema v2
- feat: FE-033.6 — theme-system epic audit + FE-038 filed + README drift fix
- feat: FE-034 — hide empty priority sections + muted footer
- feat: FE-035 — hide unimplemented palettes from picker
- feat: FE-036 — viz completed-status chip glyph ✅ → ✓ (subtler)
- feat: FE-037 — asymmetric model-chip rendering (🧠 opus-only, rightmost)
- feat: FE-038 — fix muted-footer contrast (2.45:1 → 4.6:1 light)

**Process / filing (omit from adopter-facing Changes block):**
- chore: CORE-097.4 — PLAN.md flip + file CORE-109
- chore: CORE-097.7/8 — EPIC-097 audit + close
- chore: CORE-099.7 — EPIC-099 audit
- chore: CORE-100 — remove stale flowtron-nat-011 worktree

### Archive skim findings

- **CORE-105** (v3.0.0, major, 2026-05-17) — most recent precedent. Breaking-change release; v3.1.0 is additive only — no re-symlink, no mandatory adopter steps.
- **CORE-102** (v2.2.0, minor, 2026-05-17) — closest shape match (minor, additive, no required adopter edits). Migration block: "no required project-side edits."
- **CORE-094** (v2.1.0, minor, 2026-05-14) — second minor precedent; same shape.

### Adopter migration impact (v3.0.0 → v3.1.0) — additive only

- **No required project-side edits** on submodule bump. Adopters bump the submodule SHA and get all improvements automatically.
- **Opt-in new global skills:** ft-stats and ft-quality are new bundled skills — adopters who want them add the symlinks + command stubs per the existing MIGRATION §1.2 recipe (same steps as any other bundled skill). Not mandatory.
- **ft-epic-discovery --deep** is a new mode on an existing skill — picking it up requires no adopter action beyond the submodule bump (the symlink already points at the updated SKILL.md).
- **ft-audit-docs 6-file scope** — flowtron-self-only change; adopters' forked ft-audit-docs skills are unaffected (forks define their own scope in the §0 Forker checklist).
- **Viz theme system** — adopters running the centralized viz get the theme picker automatically. No config needed.
- **MIT LICENSE, CONVENTIONS.md, CONTRIBUTING.md, .editorconfig** — repo hygiene additions; no adopter workflow impact.

### Drift check details

- `SPEC.md:3` confirmed `**Version:** v3.0.0` at HEAD ✓
- `SPEC/versioning.md:12,14,17` confirmed (patch / minor / major examples) ✓
- `docs/MIGRATION.md:349` confirmed `(e.g., \`v3.0.0\`)` ✓ (line drifted from 335 → 349 since CORE-105 due to added content above)
- `git describe --tags --abbrev=0` → `v3.0.0` ✓ (matches SPEC.md:3)

### Assumptions (explicit, no clarifying questions needed)

1. **Bump kind:** `minor` (v3.0.0 → v3.1.0). All 20 `feat:` commits are additive; no `feat!:` or `BREAKING CHANGE:`. PLAN-line shortname `release v3.1.0` confirms.
2. **Major example in SPEC/versioning.md:** Stays `v3.x.y → v4.0.0` — still future-looking (no v4.x.y series yet). Deviation only applies when the prior major example is no longer future-looking (CORE-080, CORE-105 precedent).
3. **Migration block:** Additive opt-in (ft-stats, ft-quality global install); no required steps.
4. **Tag Changes block:** Grouped by area (Open-source foundations / New skills / Doc-set improvements / Viz). Omits 4 `chore:` filing commits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-102 / CORE-094 / CORE-105 release-task pattern
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Four edits in order:

1. `SPEC.md:3` — `**Version:** v3.0.0` → `**Version:** v3.1.0`.
2. `SPEC/versioning.md:12,14` — patch example `v3.0.0 → v3.0.1` shifted to `v3.1.0 → v3.1.1`; minor `v3.0.x → v3.1.0` shifted to `v3.1.x → v3.2.0`; major `v3.x.y → v4.0.0` stays (still future-looking).
3. `docs/MIGRATION.md:349` — example pin `(e.g., \`v3.0.0\`)` → `(e.g., \`v3.1.0\`)`.
4. `README.md` §"Repo layout" — `docs/` description updated from "philosophy and migration guides" to "philosophy, migration, and conventions guides" (ft-audit-docs subroutine Finding #1 Low — absorbed inline).

Verified post-edit: `grep -rn 'v3\.0\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/` returns one historical-context hit in `docs/CONVENTIONS.md:25` (write-once) — live doc set clean. Total diff: 4 files, +5/−5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: all edits are single-token version-string or label substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — ft-audit-docs subroutine (5 passes, 6-file scope):
  - `README.md` — 1 Low finding absorbed inline (docs/ layout label updated)
  - `SPEC.md` — version-line bump (Phase 2)
  - `docs/MIGRATION.md` — example-pin bump (Phase 2); historical [[CORE-044]] wikilink resolves ✓
  - `claude/CLAUDE-snippet.md` — no change (symlink wiring and paste-block unchanged; no version refs)
  - `docs/CONVENTIONS.md` — no change (historical v3.0.0 ref at line 25 is write-once context)
  - `CONTRIBUTING.md` — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-18.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v3.1.0 — minor release shipping CORE-EPIC-099's open-source foundations (MIT LICENSE, docs/CONVENTIONS.md, CONTRIBUTING.md, .editorconfig, README "Working in markdown vaults" section), CORE-EPIC-097's three new global skills (ft-stats, ft-quality, ft-epic-discovery --deep) plus SPEC/*.md paths: frontmatter, CORE-109's SPEC.md terse pass (−662w / −12.2%), CORE-110–112's AI-referenced doc-set expansion to 6 files and ft-flowtron/ft-audit-docs improvements, and FE-EPIC-033+FE-034–038's viz theme system with palette picker, curated palettes, and UX polish.

Four doc-only edits land in this release: SPEC.md:3 version bump v3.0.0 → v3.1.0; SPEC/versioning.md patch + minor example shifts (major stays — still future-looking); MIGRATION.md:349 example pin bump; README.md docs/ layout label updated (ft-audit-docs Finding #1 Low absorbed inline). No adopter breaking changes — no required project-side edits on submodule bump. ft-stats and ft-quality are new opt-in global skills installable per MIGRATION.md §1.0.

**Archived:** 2026-05-18
