---
title: release v2.0.0
status: completed
tags: []
created: 2026-05-11
due:
related-tasks: [CORE-EPIC-057, CORE-066, CORE-068, CORE-072, CORE-073, FE-018, FE-024, FE-028, CORE-060]
---

# CORE-080 | release v2.0.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-066]] [[CORE-068]] [[CORE-072]] [[CORE-073]] [[FE-018]] [[FE-024]] [[FE-028]] [[CORE-060]]

## 🎯 Goal

Cut flowtron v2.0.0 — release tagging the gate-UX bundle (CORE-059/065/066/068), the audit infrastructure (CORE-072/073), the cite-don't-restate / doc-tightening sweep (CORE-055/056/074/075/076), the viz polish run (FE-018–028 + FE-029/030 follow-up fixes), and the cross-project viz dogfooding (FE-020), accumulated on main since v1.3.0. User-elected major bump despite no breaking-change commits — semver-minor in mechanics, treated as v2.0 by call.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v1.3.0` → `v2.0.0`
- [x] SPEC/versioning.md patch + minor + **major** examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 / CORE-060 precedent; major shift is the v2.0.0-specific deviation since the prior major example `v1.x.y → v2.0.0` is now in the past)
- [x] docs/MIGRATION.md example pin bumped `v1.3.0` → `v2.0.0`
- [x] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-080 — flowtron v2.0.0 (...)` commit lands
- [x] Annotated `v2.0.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `_project/tasknote/archive/core/CORE-080.md`

## 🧩 Subtasks

- [x] `SPEC.md:3` — bump `**Version:** v1.3.0` → `**Version:** v2.0.0`
- [x] `SPEC/versioning.md` — shift patch example `v1.3.0 → v1.3.1` to `v2.0.0 → v2.0.1`; minor `v1.3.x → v1.4.0` to `v2.0.x → v2.1.0`; major `v1.x.y → v2.0.0` to `v2.x.y → v3.0.0` (major shift is v2.0.0-specific — prior precedents kept major unchanged because it was already future-looking; here it's now past)
- [x] `docs/MIGRATION.md` — bump example pin `(e.g., \`v1.3.0\`)` → `(e.g., \`v2.0.0\`)`
- [x] Phase 3 — markdown lint mental-pass on edited paragraphs; viz suite unaffected (no viz code change in this release commit), not re-run
- [x] Phase 4 — doc-drift sweep over `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md); flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [x] Post-closure — single commit `feat: CORE-080 — flowtron v2.0.0 (...)`; draft + cut annotated tag `v2.0.0` (subject + summary + Changes since v1.3.0 + Migration block); push tag to origin

## 🔗 Related

- [[CORE-066]] / [[CORE-068]] / [[CORE-065]] / [[CORE-059]] — gate-UX bundle: visual operator-gate cues, committed-state marker, trim 4→2 banners; adopter-visible workflow surface change
- [[CORE-072]] / [[CORE-073]] — `/audit` skill (stack-neutral scaffold, forked-not-symlinked) + flowtron-self audit dogfooding
- [[FE-018]] / [[FE-024]] / [[FE-028]] — viz polish bundle: code/token audit, App.tsx decomposition, archive cache (subsumes FE-027 race)
- [[CORE-060]] — release v1.3.0 (most recent precedent; mirror its closure shape; major-example shift is the deviation)
- [[CORE-048]] — release v1.2.0 (CORE-047-style context-sensitive Migration block precedent)
- [[CORE-046]] — release v1.1.0 (established "Changes since vP.Q.R" + Migration block tag-message shape)
- [[CORE-043]] — release v1.0.0 (established `SPEC/versioning.md` example shifts off the just-cut release)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task. 40 commits since v1.3.0 — bundle of additive `feat:` (gate-UX, audit, cite-don't-restate sweep, viz polish), no `feat!:` or `BREAKING CHANGE:` in the log → mechanically a minor bump. User elected v2.0.0 anyway (judgment call on bundle weight). No new code or SPEC content to write here — version bump + doc-currency shifts + annotated tag + push. Pattern is well-established (CORE-048 / CORE-060 release-tasknote precedents). The major-example shift in `SPEC/versioning.md` is a v2.0.0-specific deviation from prior-release precedents (since prior majors were all future-looking; this one cuts the example).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-060 / CORE-048 / CORE-046 / CORE-043 release precedents)
- [x] **Drift check** — see Discovery Notes; no drift on cited paths
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live + on-spec):**
  - `SPEC.md:3` — currently `**Version:** v1.3.0`
  - `SPEC/versioning.md:8` — patch example `v1.3.0 → v1.3.1`
  - `SPEC/versioning.md:10` — minor example `v1.3.x → v1.4.0`
  - `SPEC/versioning.md:13` — major example `v1.x.y → v2.0.0` (now in the past — needs forward-shift to `v2.x.y → v3.0.0`)
  - `docs/MIGRATION.md:330` — example pin `(e.g., \`v1.3.0\`)`
  - `_project/PLAN.md` — CORE-080 line under `## Medium` (filed in this session)
- **Out of scope (verified clean — `grep -rn 'v1\.3\.0' SPEC.md SPEC/ docs/ README.md templates/ claude/` returns only the 3 doc-set hits above, plus `claude/commands/release.md:7` and `claude/skills/release/SKILL.md:{15,32,34,86}` which are illustrative example strings inside the release-skill self-doc — pre-existing carry-over from CORE-060, surfaced there as a follow-up candidate; same disposition here).**
  - `README.md` — no version refs
  - `claude/CLAUDE-snippet.md` — no version refs
  - `viz/package.json` — independent component versioning, not flowtron contract version
- **Commits since v1.3.0** (40 total — verified via `git log v1.3.0..HEAD`):
  - **Gate-UX bundle (adopter-visible workflow surface):**
    - `264d13a` feat: CORE-065 — trim operator-gate banners 4→2; recap + parent-flip bundle into ready-to-commit
    - `d79975e` feat: CORE-059 — banner-style operator-gate cues across 4-phase workflow
    - `f62aa4d` feat: CORE-066 — gate-UX refinements
    - `cba144d` feat: CORE-068 — committed-state-marker
    - `0f68c3a` chore: CORE-067 — gate-UX check-in (no-op; omit from Changes block)
  - **Audit infrastructure (new for v2.0.0):**
    - `dbb18e8` feat: CORE-072 — audit-skill (stack-neutral scaffold; forked-not-symlinked per MIGRATION §1.2.1)
    - `db749c6` feat: CORE-073 — audit-flowtron-self (dogfood the scaffold against flowtron's own surface)
  - **Cite-don't-restate / doc-tightening sweep:**
    - `5ac7d60` feat: CORE-074 — cite-not-restate sweep
    - `13d7e36` docs: CORE-075 — drop Last-updated residue
    - `e3c2943` feat: CORE-076 — wikilink-token placeholder hygiene
    - `734f8ff` feat: CORE-056 — audit conventions/coherence axis (filed 4 follow-ups)
    - `c4644ab` docs: CORE-055 — trim CLAUDE-snippet bullet 4
    - `7961a5a` feat: CORE-062 — lift date-format bullet to SPEC; drop from 7 SKILLs
    - `b1c62af` feat: CORE-063 — equalize stub cross-refs to 6-OTHER-non-release convention
    - `48ec9c3` feat: CORE-064 — equalize micro-task step-1.5 fragment with task reference
  - **Viz polish bundle:**
    - `d475220` feat: FE-018 — viz code/token audit; filed 4 trim follow-ups (FE-021–024)
    - `cbde69f` feat: FE-021 — rowOutlineClass helper + EpicRow prop-shape symmetry
    - `55bcd9e` feat: FE-022 — parser.ts exports isEpic, getSubtaskParentEpicId, WIKILINK_PATTERN
    - `4e1936f` feat: FE-023 — viz-constants-consolidation
    - `aca195e` feat: FE-024 — viz-app-decomposition
    - `5037c21` feat: FE-019 — viz-a11y-perf-pass
    - `d3f12fc` feat: FE-025 — viz-contrast-fix
    - `fa561b3` feat: FE-026 — viz-bundle-code-split
    - `eb3f089` feat: FE-028 — viz-archive-cache (subsumes FE-027 race)
  - **Cross-project viz dogfooding:**
    - `5b34d91` chore: FE-020 — cross-project-viz-dogfooding
  - **Post-v1.3.0 fixes:**
    - `d85dbb6` fix: FE-030 — viz-load-stale-state-on-failure
    - `f66ef14` fix: FE-029 — viz-archive-cold-start-500
    - `e7c0601` chore: CORE-079 — tag bare code fences in SPEC.md with text/markdown
    - `5d5f0f8` fix: CORE-078 — insert (none) under empty ## Medium in PLAN.md
    - `0cbf6a6` docs: CORE-077 — drop single-project MVP qualifier
    - `96e518f` fix: CORE-069 — template-status-default
  - **Doc currency / repo layout:**
    - `f8729ab` docs: CORE-070 — repo-layout-doc-currency
    - `c24bdaa` docs: CORE-071 — release-global-install-doc
  - **Process / chore (omit from adopter-facing tag Changes block):**
    - `e0b6284` chore: file CORE-078 + CORE-079 — audit followups
    - `61e4e95` chore: file CORE-073 — audit-flowtron-self
    - `8aa0f30` chore: defer FE-020 to Future Opportunities; file FE-027/028
    - `0a51600` chore: widen scratchpad ignore pattern to SCRATCH*.md
    - `60c6b80` chore: bump viz dev port 5173 → 5176
    - `edf3cee` chore: CORE-061 — delete _project/FUTURE.md (orphan + stale)
- **Archive skim hits (release-task precedents):**
  - `CORE-060.md` (v1.3.0) — most recent. Single commit + annotated tag. Adopter migration called out 3 new symlinks.
  - `CORE-048.md` (v1.2.0) — CORE-047 context-sensitive callout precedent.
  - `CORE-046.md` (v1.1.0) — established Changes / Migration block shape.
  - `CORE-043.md` (v1.0.0) — established `SPEC/versioning.md` example shifts.
- **Adopter migration impact (v1.3.0 → v2.0.0):**
  - **No new symlinks required.** No new adopter-facing slash commands since v1.3.0. The same twelve symlinks (`/task`, `/starter-task`, `/micro-task`, `/file-followup`, `/epic-discovery`, `/close-epic` × command + skill) wired by `/new-project` Step 3 still apply. `/release` remains flowtron-self only.
  - **`/audit` is new, but forked-not-symlinked.** Per `docs/MIGRATION.md §1.2.1`, adopters who want `/audit` copy `claude/skills/audit/SKILL.md` + `claude/commands/audit.md` into their own `.claude/`, then walk the §0 Forker checklist to customize for their stack. **Optional**: projects that don't want a structured audit can skip. Existing adopters bumping to v2.0.0 who want `/audit` should consult MIGRATION §1.2.1.
  - **Gate-UX bundle (CORE-059/065/066/068) is adopter-visible but non-breaking.** Adopters bumping consume SPEC.md changes automatically — they will see new banner styling, the trim from 4 operator-gate banners → 2, and the committed-state marker the next time they run `/task`. No project-side edits required.
  - **Doc tightening + viz polish + cross-project viz dogfooding** — pure consumed-on-bump. No project-side action.
  - **Post-v1.3.0 fixes (CORE-077/078/079, CORE-069, FE-029/030)** — corrections to template/SPEC/viz that adopters benefit from automatically on submodule bump.
- **Drift check details:**
  - `SPEC.md:3` confirmed `**Version:** v1.3.0` at HEAD
  - `SPEC/versioning.md:8` confirmed `v1.3.0 → v1.3.1`; `:10` confirmed `v1.3.x → v1.4.0`; `:13` confirmed `v1.x.y → v2.0.0` (now stale post-cut)
  - `docs/MIGRATION.md:330` confirmed `(e.g., \`v1.3.0\`)`
  - `git describe --tags --abbrev=0` returns `v1.3.0` — matches SPEC.md:3, no drift
- **Pre-existing minor drift (out of scope; same disposition as CORE-060 noted):**
  - `claude/commands/release.md:7` and `claude/skills/release/SKILL.md:{15,32,34,86}` show illustrative PLAN-line examples / shortname examples with `v1.3.0`. Skill self-doc, not in `_project/tasknote/README.md §"AI-referenced docs"`, so excluded from the doc-drift sweep. CORE-060 already surfaced this as a follow-up candidate to genericize; carry forward.
- **Clarifying questions:** None. Three assumptions made explicit:
  1. User-elected major bump (no breaking-change commits in log; semver-minor in mechanics). Surfaced and confirmed before scaffolding.
  2. Tag-message Changes block groups commits by area (Gate-UX / Audit / Cite-don't-restate / Viz polish / Cross-project viz / Post-fixes / Doc currency) and omits pure chore/filing commits — adopter-facing, not exhaustive history.
  3. Migration block calls `/audit` adoption out as optional (per MIGRATION §1.2.1), not a required action — matches CORE-048's pattern of context-sensitive callouts without forcing project-side work.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-060 / CORE-048 / CORE-046 / CORE-043 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block); v2.0.0-specific deviation: also shift the major example in `SPEC/versioning.md`
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Three edits in order:

1. `SPEC.md:3` — `**Version:** v1.3.0` → `**Version:** v2.0.0`.
2. `SPEC/versioning.md:8-15` — patch example shifted `v1.3.0 → v1.3.1` to `v2.0.0 → v2.0.1`; minor `v1.3.x → v1.4.0` to `v2.0.x → v2.1.0`; **major `v1.x.y → v2.0.0` shifted to `v2.x.y → v3.0.0`** (v2.0.0-specific deviation from prior release precedents — this time the major example was no longer future-looking).
3. `docs/MIGRATION.md:330` — example pin `(e.g., \`v1.3.0\`)` → `(e.g., \`v2.0.0\`)`.

Verified post-edit: `grep -rn 'v1\.3\.0'` across live doc set returns 5 hits, all in `claude/commands/release.md:7` and `claude/skills/release/SKILL.md:{15,32,34,86}` — illustrative example strings inside the release-skill self-doc, not part of `_project/tasknote/README.md §"AI-referenced docs"`. Pre-existing carry-over from CORE-060 (same finding, same disposition); follow-up candidate to genericize. All AI-referenced doc-set entries are clean. Total diff: 3 files, +5/-5.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change in the release commit)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: edits are single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken. Viz suite untouched and not re-run — viz polish (FE-018–028, FE-029/030) tests passed in their own tasknotes; viz code itself is unchanged in this release commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — verdicts per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (no version refs; v2.0.0's adopter-facing surface stays reachable via existing `claude/CLAUDE-snippet.md` and `docs/MIGRATION.md` pointers)
  - `SPEC.md` — version-line bump (Phase 2)
  - `docs/MIGRATION.md` — example-pin bump (Phase 2). `/audit` MIGRATION §1.2.1 already at HEAD via CORE-072.
  - `claude/CLAUDE-snippet.md` — no change (no version refs; symlink set unchanged across v1.3.0 → v2.0.0)
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Cut flowtron v2.0.0 — user-elected major-numbered release tagging the additive feature bundle accumulated on main since v1.3.0. **Headline shipments:** the gate-UX overhaul (CORE-059/065/066/068) — banner-style operator-gate cues, trim 4 → 2, recap+parent-flip bundling, committed-state marker; the new `/audit` skill (CORE-072) — stack-neutral 5-pass scaffold (Security · Idioms · Hygiene · Orphans · Doc drift), forked-not-symlinked per MIGRATION §1.2.1 — plus its flowtron-self dogfooding (CORE-073); the cite-don't-restate / doc-tightening sweep (CORE-055/056/062/063/064/074/075/076); the viz polish run (FE-018–028) — App.tsx decomposition, code/token audit, a11y/perf, contrast, code-split, archive cache; cross-project viz dogfooding (FE-020); and the post-v1.3.0 fix sweep (CORE-069/077/078/079, FE-029/030). **Pure release-task scope:** no new code beyond the 40 commits already on main; three doc-only edits (`SPEC.md:3` version bump, `SPEC/versioning.md` patch+minor+**major** example shifts off v2.0.0 — major shift is v2.0.0-specific deviation since the prior `v1.x.y → v2.0.0` example was now stale, `docs/MIGRATION.md:330` example pin → v2.0.0) — total diff 3 files, +5/-5. Single commit + annotated `v2.0.0` tag with adopter-facing release notes. **Adopter migration:** no required project-side edits — same twelve symlinks wired by `/new-project` Step 3 still apply (no new adopter-facing slash commands; `/audit` is forked-not-symlinked per MIGRATION §1.2.1; `/release` remains flowtron-self only). Gate-UX changes are visible-but-non-breaking — adopters consume on submodule bump. Optional callout for adopters wanting `/audit`: copy `claude/skills/audit/SKILL.md` + `claude/commands/audit.md` and walk the §0 Forker checklist. **Carry-forward follow-up:** illustrative `v1.3.0` example strings still inline in `claude/skills/release/SKILL.md` (lines 15, 32, 34, 86) and `claude/commands/release.md:7` — same drift CORE-060 surfaced; worth a `/file-followup` to genericize so it stops bit-rotting each release. Tag pushed to origin alongside the commit.

**Archived:** 2026-05-11
