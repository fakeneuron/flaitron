---
title: release v3.0.0
status: completed
tags: []
created: 2026-05-17
due:
related-tasks: [CORE-104, CORE-106, CORE-107, CORE-108, CORE-103, CORE-102, CORE-080]
---

# CORE-105 | release v3.0.0

[← PLAN.md](../../PLAN.md) · ✅ Completed · 🔗 [[CORE-104]] [[CORE-106]] [[CORE-107]] [[CORE-108]] [[CORE-103]] [[CORE-102]] [[CORE-080]]

## 🎯 Goal

Cut flowtron v3.0.0 — a major bump shipping CORE-104's `ft-` skill namespace rename as a hard cutover, with an annotated tag message that calls out the breaking change and the adopter re-symlink + global-install steps.

## ✅ Acceptance

- [ ] `SPEC.md:3` — `**Version:** v2.2.0` → `**Version:** v3.0.0`
- [ ] `SPEC/versioning.md` — patch + minor + **major** examples shifted off the just-cut release (per CORE-080 / CORE-043 precedent for major bumps; the prior major example `v2.x.y → v3.0.0` is no longer future-looking and must shift to `v3.x.y → v4.0.0`)
- [ ] `docs/MIGRATION.md` — example pin bumped `v2.2.0` → `v3.0.0` (line 335)
- [ ] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries (via `Skill(ft-audit-docs)` subroutine per `ft-release` §7.1)
- [ ] Single `feat: CORE-105 — flowtron v3.0.0 (...)` commit lands
- [ ] Annotated `v3.0.0` tag created with adopter-facing release notes — Migration block MUST list re-symlink steps + new `/ft-flowtron` global install (per PLAN-line + `docs/MIGRATION.md` §1.0 / §1.2)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `_project/tasknote/archive/core/CORE-105.md`

## 🧩 Subtasks

- [ ] `SPEC.md:3` — bump `**Version:** v2.2.0` → `**Version:** v3.0.0`
- [ ] `SPEC/versioning.md` — shift patch example `v2.2.0 → v2.2.1` to `v3.0.0 → v3.0.1`; minor `v2.2.x → v2.3.0` to `v3.0.x → v3.1.0`; **major `v2.x.y → v3.0.0` to `v3.x.y → v4.0.0`** (v3.0.0-specific deviation since the prior major example is no longer future-looking, mirroring CORE-080's v2.0.0 cut)
- [ ] `docs/MIGRATION.md:335` — bump example pin `(e.g., \`v2.2.0\`)` → `(e.g., \`v3.0.0\`)`
- [ ] Phase 3 — markdown lint mental-pass on edited lines
- [ ] Phase 4 — doc-drift sweep via `Skill(ft-audit-docs)` subroutine; flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [ ] Post-closure — single commit; draft + cut annotated tag `v3.0.0` (subject + summary + Changes since v2.2.0 + **Migration block calling out CORE-104 breaking change**); push tag to origin

## 🔗 Related

- [[CORE-104]] — the `ft-` skill namespace prefix rename (BREAKING) — primary headline of this release
- [[CORE-106]] — `ft-` namespace residue sweep (post-CORE-104 surgical fixes to `/ft-release` §7.1, MIGRATION §1.2.1 audit-family install recipe, `/ft-micro-task` copy-paste line)
- [[CORE-107]] — `ft-flowtron` template-list trim (removed phantom "epic" template from `/ft-flowtron` info text)
- [[CORE-108]] — version-pin `Pinned to:` slot (seeded `templates/tasknote-README.md` + wired `/ft-new-project` Step 6 + MIGRATION §1.5)
- [[CORE-103]] — `/ft-flowtron` adopter-wiring gap (folded into CORE-104; substantive payload landed in MIGRATION §1.0)
- [[CORE-102]] — release v2.2.0 (most recent precedent for the release-task shape)
- [[CORE-080]] — release v2.0.0 (canonical major-bump precedent; established the `SPEC/versioning.md` major-example-shift deviation)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 6 commits since v2.2.0 (4 `feat:` + 2 `chore:`). By Conventional-Commits rote, the commit log alone would classify as a minor bump (no `feat!:` or `BREAKING CHANGE:` token). However, CORE-104's substantive change is breaking — adopters' `.claude/skills/{task,…}` symlinks dangle on bump until re-symlinked to the new `ft-` upstream paths, per `docs/MIGRATION.md` §1.0 / §1.2. The PLAN-line target locks `v3.0.0` (decided at file-time per CORE-104 decision #2: "Hard cutover — single major bump"). PLAN-line target wins per `/ft-release` Step 2 default. Recipe pattern is canonical (CORE-080 v2.0.0, CORE-102 v2.2.0 precedents); CORE-080's major-bump-specific deviation (`SPEC/versioning.md` major example also shifts) applies here.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes; no drift on cited paths
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files (live, confirmed on-spec)

- `SPEC.md:3` — `**Version:** v2.2.0` ✓
- `SPEC/versioning.md:8` — patch example `v2.2.0 → v2.2.1` (needs shift to `v3.0.0 → v3.0.1`)
- `SPEC/versioning.md:10` — minor example `v2.2.x → v2.3.0` (needs shift to `v3.0.x → v3.1.0`)
- `SPEC/versioning.md:13` — major example `v2.x.y → v3.0.0` (now stale post-cut — needs shift to `v3.x.y → v4.0.0`, mirroring CORE-080's v2.0.0 deviation)
- `docs/MIGRATION.md:335` — `(e.g., \`v2.2.0\`)` (needs bump to `v3.0.0`)
- `git describe --tags --abbrev=0` → `v2.2.0` — matches SPEC.md:3, no drift

### Commits since v2.2.0 (6 total — verified via `git log v2.2.0..HEAD`)

- **Breaking — skill namespace rename:**
  - `adb47d1` feat: CORE-104 — ft- skill namespace prefix (15 bundled skills renamed; SPEC §"Skill namespace" added; CORE-103 folded; flowtron-self `.claude/` rewired; new `/ft-flowtron` adopter global install in MIGRATION §1.0)
- **Post-CORE-104 cleanup (additive, non-breaking):**
  - `2108798` feat: CORE-106 — ft- namespace residue sweep (3 missed call-sites: `/ft-release` §7.1, MIGRATION §1.2.1 install recipe, `/ft-micro-task` copy-paste line)
  - `2bb1357` feat: CORE-107 — ft-flowtron template-list trim (removed phantom "epic" template from info-screen text)
- **New feature (additive, non-breaking):**
  - `d91c67f` feat: CORE-108 — version-pin Pinned-to slot (seeded `templates/tasknote-README.md` + wired `/ft-new-project` Step 6 + MIGRATION §1.5)
- **Process / filing (omit from adopter-facing tag Changes block):**
  - `b837b69` chore: file CORE-104 — skill namespace prefix
  - `6f9b3b3` chore: file CORE-103 — /flowtron adopter-wiring gap

### Archive skim findings

- **CORE-102** (v2.2.0, minor, 2026-05-17) — most recent precedent. Same 3-edit recipe shape. Verbatim Acceptance/Subtasks template.
- **CORE-080** (v2.0.0, major, 2026-05-11) — **canonical major-bump precedent.** Established the `SPEC/versioning.md` major-example-shift deviation (when the prior major example was no longer future-looking, shift it forward alongside patch/minor). v2.0.0 was a user-elected major without a true breaking change; v3.0.0 here is a real breaking change. Tag Migration block was "no required project-side edits" — opposite shape from what v3.0.0 needs.
- **CORE-094** (v2.1.0, minor) — minor precedent; mirror its closure shape.
- **CORE-043** (v1.0.0, major) — original major; established `SPEC/versioning.md` example shifts.
- **No prior tasknote** in the archive matches v3.0.0's shape: a major release with a real breaking change requiring adopter re-symlink. The closest analog by adopter-impact shape is the `/ft-new-project` global install added in CORE-046 (v1.1.0) — a new adopter-global wiring step landed in the Migration block — but that was additive, not breaking.

### Adopter migration impact (v2.2.0 → v3.0.0) — BREAKING

This is the v3.0.0 differentiator vs. all prior releases. Three migration actions land in the tag Migration block:

1. **Re-symlink the bundled-skill set under adopter `.claude/`** (CORE-104). Existing adopters' symlinks like `.claude/skills/task → _project/flowtron/claude/skills/task` will dangle on submodule bump — upstream is now at `_project/flowtron/claude/skills/ft-task`. The adopter MUST tear down + recreate the 12 symlinks per the updated `docs/MIGRATION.md §1.2` + `claude/CLAUDE-snippet.md` wiring block (now references `ft-` paths on both source and target sides).
2. **Add the new `/ft-flowtron` global install** (CORE-103 fold). New adopter-facing global symlink shipped in `docs/MIGRATION.md §1.0` — adopters who want the info-screen skill add `~/.claude/skills/ft-flowtron` + `~/.claude/commands/ft-flowtron.md` per the §1.0 block.
3. **Audit family forks unchanged** (CORE-104 + CORE-106). Adopters with forked `audit*/` skills in `.claude/skills/` keep working — forks stay unprefixed per SPEC §"Skill namespace". To pick up the rename on the upstream `cp` source paths, re-fork from `_project/flowtron/claude/skills/ft-audit*/` per the updated MIGRATION §1.2.1 recipe (the `SKILL=…` variable interpolates `ft-$SKILL` for the source path, `$SKILL` for the destination — split CORE-106 introduced).

Non-migration-related shipments:

- **CORE-106** — install recipes (`/ft-release` §7.1 subroutine, MIGRATION §1.2.1 `cp` template) now resolve end-to-end. Without CORE-106, the v3.0.0 release skill would fail its own doc-drift sweep on first invocation. Automatic on bump; no adopter action.
- **CORE-107** — info-skill text correction. No adopter action.
- **CORE-108** — `Pinned to: vX.Y.Z` slot. NEW adopters via `/ft-new-project` get the populated line automatically; EXISTING adopters can hand-add the line at next convenience (not required).

### Drift check details

- `SPEC.md:3` confirmed `**Version:** v2.2.0` at HEAD ✓
- `SPEC/versioning.md:8,10,13` confirmed (patch / minor / major examples) ✓
- `docs/MIGRATION.md:335` confirmed `(e.g., \`v2.2.0\`)` ✓
- `git describe --tags --abbrev=0` → `v2.2.0` ✓ (matches SPEC.md:3)
- Omnibus grep `v2\.2\.0` across `SPEC.md SPEC/ docs/ README.md templates/ claude/` returns exactly the 3 expected hits — no surprise drift, no leftover example strings to clean up (the carry-forward follow-up CORE-080 noted in `claude/skills/release/SKILL.md` was absorbed by CORE-081 / CORE-101 / CORE-104's sweeps — verified absent).

### Assumptions (explicit, no clarifying questions needed)

The PLAN line and CORE-104's discovery decisions already resolved every parameter:

1. **Bump kind:** `major` (v2.2.0 → v3.0.0). Locked at file-time per CORE-104 decision #2; PLAN-line shortname `release v3.0.0` confirms.
2. **Tag Migration block contents:** Three actions enumerated above (re-symlink, new `/ft-flowtron` install, optional audit re-fork). Drafted from CORE-104 decision record + MIGRATION §1.0 / §1.2 / §1.2.1 + CORE-106 install-recipe fix. User reviews the rendered tag draft at Phase 4 §7.2 — that is the canonical review point for tag-message contents.
3. **Tag Changes block:** Groups commits by area (Breaking / Post-CORE-104 cleanup / New feature). Omits the two `chore: file …` filing commits — adopter-facing, not exhaustive history.
4. **Major-example shift in SPEC/versioning.md:** Apply (per CORE-080 precedent). Prior major example `v2.x.y → v3.0.0` is now past — shift to `v3.x.y → v4.0.0`.
5. **No follow-up release/fix tasks filed:** v3.0.0 is the cut; any post-cut drift surfaces via `/ft-file-followup` at the §7.1 doc-drift sweep, same as CORE-102.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-102 / CORE-080 / CORE-094 / CORE-043 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block); v3.0.0-specific deviation: shift the major example in `SPEC/versioning.md` alongside patch + minor (per CORE-080 precedent for major bumps that retire the prior major example)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Three edits in order:

1. `SPEC.md:3` — `**Version:** v2.2.0` → `**Version:** v3.0.0`.
2. `SPEC/versioning.md:8-15` — patch example shifted `v2.2.0 → v2.2.1` to `v3.0.0 → v3.0.1`; minor `v2.2.x → v2.3.0` to `v3.0.x → v3.1.0`; **major `v2.x.y → v3.0.0` shifted to `v3.x.y → v4.0.0`** (v3.0.0-specific deviation — prior major example was no longer future-looking, mirroring CORE-080's v2.0.0 cut).
3. `docs/MIGRATION.md:335` — example pin `(e.g., \`v2.2.0\`)` → `(e.g., \`v3.0.0\`)`.

Verified post-edit: `grep -rn 'v2\.2\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/` returns empty — live doc set is clean. Total diff: 3 files, +5/-5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: edits are single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken. Viz suite untouched and not re-run — viz code is unchanged in this release commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — verdicts per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (no version refs; `/ft-task` reference already on `ft-` prefix via CORE-104; symlink wiring reachable via existing `docs/MIGRATION.md` + `claude/CLAUDE-snippet.md` pointers)
  - `SPEC.md` — version-line bump (Phase 2)
  - `docs/MIGRATION.md` — example-pin bump (Phase 2). §1.0 new `/ft-flowtron` global install + §1.2 `ft-`-prefixed symlink wiring + §1.2.1 split-source/dest `cp` recipe + §1.5 `Pinned to:` substitution note all already at HEAD via CORE-104 / CORE-106 / CORE-108
  - `claude/CLAUDE-snippet.md` — no change (no version refs; symlink wiring on `ft-` prefix via CORE-104; the §"Bumping the pinned flowtron version" pointer to "the annotated tag message (`git show vX.Y.Z`)" is exactly how v3.0.0's migration steps reach adopters)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-17.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Cut flowtron v3.0.0 — major release shipping CORE-104's `ft-` skill namespace prefix rename as a hard cutover, alongside its post-rename surgical sweeps (CORE-106 — 3 missed call-sites in `/ft-release` §7.1, MIGRATION §1.2.1 install recipe, `/ft-micro-task` copy-paste line), an info-skill text correction (CORE-107 — `/ft-flowtron` template-list trim), and one new feature (CORE-108 — `Pinned to: vX.Y.Z` slot in `templates/tasknote-README.md` wired into `/ft-new-project` Step 6 + MIGRATION §1.5). CORE-103 (`/ft-flowtron` adopter-wiring gap) folded into CORE-104 — its substantive payload ships in MIGRATION §1.0 as the new adopter-facing global install.

**Three doc-only edits land in this release**: SPEC.md:3 version bump v2.2.0 → v3.0.0; SPEC/versioning.md patch + minor + **major** example shifts (the major-example shift is the v3.0.0-specific deviation since the prior `v2.x.y → v3.0.0` example was no longer future-looking, mirroring CORE-080's v2.0.0 cut); MIGRATION.md:335 example pin bump.

**Adopter migration is BREAKING — the v3.0.0 differentiator.** Existing adopters MUST tear down + recreate the 12 bundled-skill symlinks under `.claude/` per the updated CLAUDE-snippet wiring block + MIGRATION §1.2 (now `ft-` on both source and target sides). Adopters who want the `/ft-flowtron` info-screen skill add the new global install per MIGRATION §1.0. Audit-family forks (`.claude/skills/audit*/`) keep working unchanged — forks stay unprefixed per SPEC §"Skill namespace"; re-fork from `_project/flowtron/claude/skills/ft-audit*/` upstream to pick up the split-source/dest install recipe from MIGRATION §1.2.1.

**Archived:** 2026-05-17
