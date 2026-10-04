---
title: release v2.2.0
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: [CORE-EPIC-098, FE-033.1, FE-033.2, CORE-101, FE-032, CORE-095, CORE-096, CORE-094]
---

# CORE-102 | release v2.2.0

[← PLAN.md](../../PLAN.md) · ✅ Done · 🔗 [[CORE-094]]

## 🎯 Goal

Cut flowtron v2.2.0 — minor release tagging the feat: cohort accumulated since v2.1.0 (CORE-EPIC-098 viz-embellishment with 15 children, theme-system foundations FE-033.1/.2, CORE-101 audit-family bundle, FE-032 ProjectSelector restyle, CORE-095/096 hygiene).

## ✅ Acceptance

- [ ] SPEC.md `**Version:** v2.1.0` → `v2.2.0`
- [ ] SPEC/versioning.md patch + minor examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 / CORE-094 precedent)
- [ ] docs/MIGRATION.md example pin bumped `v2.1.0` → `v2.2.0`
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-102 — flowtron v2.2.0 (...)` commit lands
- [ ] Annotated `v2.2.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-102.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v2.1.0` → `**Version:** v2.2.0`
- [ ] `SPEC/versioning.md` — shift patch example `v2.1.0 → v2.1.1` to `v2.2.0 → v2.2.1`; shift minor example `v2.1.x → v2.2.0` to `v2.2.x → v2.3.0` (major stays — still future-looking)
- [ ] `docs/MIGRATION.md` — bump example pin `(e.g., \`v2.1.0\`)` → `(e.g., \`v2.2.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep (via `/audit-docs` subroutine); flip PLAN.md; move tasknote to archive
- [ ] Post-closure — single commit; draft + cut annotated tag `v2.2.0`; push tag to origin

## 🔗 Related

- [[CORE-EPIC-098]] — viz-embellishment (15 children: typography/color audit, settings modal, density modes, focus-ring system, epic-row lift, motion polish, keyboard-shortcuts overlay, empty + loading states, embellishment audit, TaskDetail polish, density-aware subtask list, subtask detail-panel expand, view-switcher + chip cleanup)
- [[FE-033.1]] — theme-system discovery (palette inventory + reference themes + storage + picker UI sketch)
- [[FE-033.2]] — palette architecture (12 semantic tokens + theme.ts module)
- [[CORE-101]] — audit family bundle (5 scaffolds + /release subroutine wiring)
- [[FE-032]] — ProjectSelector segmented-control restyle
- [[CORE-095]] — wikilink-form self-sweep
- [[CORE-096]] — audit-fork CHANGELOG residue
- [[CORE-094]] — release v2.1.0 (most recent precedent; mirror its closure shape)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Minor release. 24 commits since v2.1.0; 18 `feat:` + 6 `chore:`. Highest rank → minor bump. No `feat!:` or `BREAKING CHANGE:`. Pattern is canonical (CORE-094 v2.1.0, CORE-060 v1.3.0, CORE-048 v1.2.0, CORE-046 v1.1.0 precedents for minor).

- [x] Read relevant source files
- [x] **Archive skim** — skimmed `_project/tasknote/archive/core/` for prior release tasknotes
- [x] **Drift check** — verified cited file paths and content
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live, confirmed on-spec):**
  - `SPEC.md:3` — `**Version:** v2.1.0` ✓
  - `SPEC/versioning.md:8` — patch example `v2.1.0 → v2.1.1` (needs shift to `v2.2.0 → v2.2.1`)
  - `SPEC/versioning.md:10` — minor example `v2.1.x → v2.2.0` (needs shift to `v2.2.x → v2.3.0`)
  - `SPEC/versioning.md:13` — major example `v2.x.y → v3.0.0` (stays — still future-looking)
  - `docs/MIGRATION.md:326` — `(e.g., \`v2.1.0\`)` (needs bump to `v2.2.0`)
  - `git describe --tags` → `v2.1.0` — matches SPEC.md:3, no drift
- **Commits since v2.1.0** (24 total):
  - `ba6ba8d` feat: CORE-101 — audit family bundle (5 scaffolds + /release subroutine wiring)
  - `1e7436e` chore: queue FE-034 in PLAN.md
  - `6813a24` feat: FE-033.2 — palette architecture
  - `5315bc1` feat: FE-033.1 — theme-system discovery
  - `06149da` feat: FE-032 — ProjectSelector segmented-control restyle
  - `db13548` chore: close CORE-EPIC-098 (viz-embellishment)
  - `ff344d9` feat: CORE-098.5 — viz Board view-switcher + chip-system cleanup
  - `4c0edd2` feat: CORE-098.13 — density-aware subtask-list wrapper
  - `a469673` feat: CORE-098.15 — TaskDetail visual polish
  - `d427ab9` feat: CORE-098.14 — subtask detail-panel expand
  - `e17ac12` feat: CORE-098.11 — viz embellishment audit (PASS)
  - `e4d59a7` feat: CORE-098.10 — viz empty + loading states
  - `52535f9` feat: CORE-098.9 — viz keyboard-shortcuts overlay
  - `4321c8a` feat: CORE-098.8 — viz motion polish
  - `9721953` feat: CORE-098.7 — viz epic-row visual lift
  - `40ea2e9` feat: CORE-098.6 — viz focus-ring system
  - `0a14ee7` feat: CORE-098.12 — viz typography scale bump
  - `9e56f3d` feat: CORE-098.4 — viz density modes (Comfortable/Default/Compact)
  - `62b32a9` feat: CORE-098.3 — viz settings-modal scaffold + visibilityPrefs
  - `f7fafc5` feat: CORE-098.2 — viz typography & color audit (constants.ts tokens)
  - `6c3ee03` chore: CORE-098.1 — viz-embellishment discovery
  - `41fb138` chore: file CORE-EPIC-097/098/099
  - `21d4b22` chore: CORE-095/CORE-096 — wikilink-form self-sweep + audit-fork CHANGELOG residue
- **Archive skim:** CORE-094 (v2.1.0, minor) is the closest precedent — same shape (3 doc edits + tag with adopter-facing release notes). CORE-080 (v2.0.0, major) and CORE-083 (v2.0.1, patch) bracket the bump-kind range. No structural drift in their recipe.
- **Adopter migration impact:**
  - **viz visual refresh (CORE-EPIC-098, 15 children).** Adopters running their viz submodule see a significant visual overhaul on bump: typography scale (CORE-098.12), color tokens (CORE-098.2), density modes via settings modal (CORE-098.3/.4), focus-ring system (CORE-098.6), epic-row visual lift (CORE-098.7), motion polish (CORE-098.8), keyboard-shortcuts overlay (CORE-098.9), empty + loading states (CORE-098.10), TaskDetail polish (CORE-098.15), density-aware subtask wrapper (CORE-098.13), subtask detail-panel expand (CORE-098.14), Board view-switcher (CORE-098.5). **No action required** — `visibilityPrefs` schema initializes from defaults on first render; opt-in features (density, board view) are settings-modal toggles.
  - **theme-system foundation (FE-033.1/.2).** Discovery + palette-architecture refactor introducing `theme.ts` with 12 semantic tokens. Visually unchanged (default palette preserved). **No action required.** The picker UI ships later (FE-033.5).
  - **ProjectSelector restyle (FE-032).** Segmented-control redesign. **No action required.**
  - **New audit-family scaffolds (CORE-101).** Ships 5 forkable scaffolds (`/audit-docs`, `/audit-security`, `/audit-frontend`, `/audit-backend`, `/audit-performance`) alongside existing `/audit`. `docs/MIGRATION.md §1.2.1` updated to cover all 6. **Optional opt-in** — adopters wanting the family follow §1.2.1's per-skill fork cp template. Existing `/audit` fork keeps working.
  - **Internal hygiene (CORE-095/096).** flowtron-self markdown sweeps; no adopter impact.
- **No clarifications needed.** Minor bump confirmed by commit log. User confirmed v2.2.0 in Step 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-094 / CORE-083 / CORE-060 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits)

**Implementation Notes:**

Three edits:
1. `SPEC.md:3` — `**Version:** v2.1.0` → `**Version:** v2.2.0`
2. `SPEC/versioning.md:8,10` — patch example `v2.1.0 → v2.1.1` shifted to `v2.2.0 → v2.2.1`; minor example `v2.1.x → v2.2.0` shifted to `v2.2.x → v2.3.0` (major unchanged — still future-looking)
3. `docs/MIGRATION.md:326` — `(e.g., \`v2.1.0\`)` → `(e.g., \`v2.2.0\`)`

Verified post-edit: `grep -rn 'v2\.1\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/` returns empty — clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Markdown lint mental-pass: single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/audit-docs` subroutine run over the 4-file AI-referenced doc set (README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md) returned zero findings across all 5 passes; routine version-pin drift absorbed by Phase 2 edits. One out-of-scope pre-existing observation surfaced (claude/skills/flowtron/SKILL.md's bundled-skill table advertises `/flowtron` but adopters don't get it wired via MIGRATION §1.0 or CLAUDE-snippet); not introduced by this release, candidate for `/file-followup` if pursued.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-17.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v2.2.0 — minor release bundling 24 commits since v2.1.0. Headline: a 15-child viz visual overhaul (CORE-EPIC-098: typography & color tokens, settings-modal scaffold + visibilityPrefs, density modes, focus-ring system, epic-row lift, motion polish, keyboard-shortcuts overlay, empty/loading states, TaskDetail polish, density-aware subtask wrapper + detail-panel expand, Board view-switcher), theme-system foundations underneath (FE-033.1 discovery + FE-033.2 palette architecture introducing 12 semantic tokens), an audit-family bundle (CORE-101: 5 new forkable scaffolds + `/release` §7.1 subroutine wiring to `/audit-docs`), ProjectSelector segmented-control restyle (FE-032), and internal hygiene (CORE-095, CORE-096). Three doc-only edits land in this release: SPEC.md version bump, SPEC/versioning.md patch + minor example shifts, MIGRATION.md pin bump. No project-side changes required for adopters — viz changes are automatic on submodule bump (visibilityPrefs initializes from defaults), theme refactor preserves the default palette, audit-family scaffolds are optional opt-in per MIGRATION §1.2.1.

**Archived:** 2026-05-17
