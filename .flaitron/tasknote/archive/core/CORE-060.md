---
title: release v1.3.0
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-049, FE-002, CORE-058, CORE-048]
---

# CORE-060 | release v1.3.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-057]] [[CORE-049]] [[FE-002]] [[CORE-058]] [[CORE-048]]

## 🎯 Goal

Cut v1.3.0 minor release tagging the additive features that have accumulated on main since v1.2.0 — the 4-skill cohort expansion (CORE-EPIC-057), the cite-don't-restate sweep (CORE-049/050/051/052/053), cross-project viz (FE-002), the task-skill early model-switch catch (CORE-058 de-scope plus CORE-059 follow-up filing), and the command-stub cross-ref equalization (CORE-057.8).

## ✅ Acceptance

- [x] SPEC.md `**Version:** v1.2.0` → `v1.3.0`
- [x] SPEC/versioning.md patch/minor examples shifted off the just-cut release (per CORE-043 / CORE-046 / CORE-048 precedent)
- [x] docs/MIGRATION.md example pin bumped `v1.2.0` → `v1.3.0`
- [x] Phase 4 doc-drift sweep run across all `_project/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-060 — flowtron v1.3.0 (...)` commit lands
- [x] Annotated `v1.3.0` tag created with adopter-facing release notes
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `_project/tasknote/archive/core/CORE-060.md`

## 🧩 Subtasks

- [x] `SPEC.md:3` — bump `**Version:** v1.2.0` → `**Version:** v1.3.0`
- [x] `SPEC/versioning.md:8-10` — shift patch example `v1.2.0 → v1.2.1` to `v1.3.0 → v1.3.1`; minor `v1.2.x → v1.3.0` to `v1.3.x → v1.4.0`; major unchanged (already future-looking)
- [x] `docs/MIGRATION.md:303` — bump example pin `(e.g., \`v1.2.0\`)` → `(e.g., \`v1.3.0\`)`
- [x] Phase 3 — markdown lint mental-pass on edited paragraphs; viz suite unaffected (no viz code change), not re-run
- [x] Phase 4 — doc-drift sweep over `_project/tasknote/README.md` §"AI-referenced docs" (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md); flip PLAN.md line to stub form; move tasknote to `archive/core/`
- [x] Post-closure — single commit `feat: CORE-060 — flowtron v1.3.0 (...)`; draft + cut annotated tag `v1.3.0` (subject + summary + Changes since v1.2.0 + Migration block); push tag to origin

## 🔗 Related

- [[CORE-EPIC-057]] — 4-skill cohort expansion (/release, /epic-discovery, /close-epic, /file-followup); the headline feature set in v1.3.0
- [[CORE-049]] — workflow token audit; predecessor cohort to CORE-050/051/052/053 cite-don't-restate sweep included in v1.3.0
- [[FE-002]] — cross-project viz / global workspace scanner (additive feature in v1.3.0)
- [[CORE-058]] — task-skill early model-switch catch (de-scoped; CORE-059 filed as follow-up — neither ships executable code in this release, but CORE-058's de-scope rationale is part of the cohort context)
- [[CORE-048]] — release v1.2.0 (most recent precedent; mirror its closure shape)
- [[CORE-046]] — release v1.1.0 (earlier precedent)
- [[CORE-043]] — release v1.0.0 (established the doc-currency-shift convention)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** Pure release task — additive `feat:` commits since v1.2.0 (CORE-EPIC-057 children + cite-don't-restate cohort + FE-002 cross-project viz). No new code or SPEC content to write; just version bump + doc-currency shifts + annotated tag + push. Pattern is well-established (CORE-048 / CORE-046 / CORE-043 release-tasknote precedents). No `feat!:` or BREAKING CHANGE in the log → minor.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-048 / CORE-046 / CORE-043 release precedents)
- [x] **Drift check** — see Discovery Notes; no drift on cited paths/lines
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live + on-spec):**
  - `SPEC.md:3` — currently `**Version:** v1.2.0`
  - `SPEC/versioning.md:8` — patch example `v1.2.0 → v1.2.1`
  - `SPEC/versioning.md:10` — minor example `v1.2.x → v1.3.0`
  - `SPEC/versioning.md:13` — major `v1.x.y → v2.0.0` (already future-looking; no change)
  - `docs/MIGRATION.md:303` — example pin `(e.g., \`v1.2.0\`)`
  - `_project/PLAN.md` — CORE-060 line under `## High` (filed 24612f8)
- **Out of scope (verified clean — `grep -rn 'v1\.2\.0' SPEC.md SPEC docs README.md templates claude` returns only the 3 doc-set hits above, plus `claude/skills/release/SKILL.md:15` which is an illustrative example string and pre-existing drift — see "Pre-existing minor drift" below):**
  - `README.md` — no version refs
  - `claude/CLAUDE-snippet.md` — no version refs
  - `viz/package.json` — `"version"` is independent component versioning, not flowtron contract version
- **Commits since v1.2.0** (21 total — verified via `git log v1.2.0..HEAD`):
  - **Skills cohort (CORE-EPIC-057):**
    - `dffedbf` feat: CORE-057.1 — Discovery: lock 4-skill cohort scopes (discovery-only)
    - `51a2f1c` feat: CORE-057.2 — ship `/release` skill (flowtron-self only; not symlinked into adopters)
    - `e7b9c33` feat: CORE-057.3 — ship `/epic-discovery` skill (adopter-facing)
    - `47999a9` feat: CORE-057.4 — ship `/close-epic` skill (adopter-facing)
    - `6f9f34c` feat: CORE-057.5 — ship `/file-followup` skill (adopter-facing)
    - `65387a9` chore: CORE-057.6 — cohort audit + doc-drift fixes (touches `docs/MIGRATION.md`)
    - `d76ad3d` chore: CORE-057.7 — `SPEC/epic.md` inline cohort cites
    - `d60c496` feat: CORE-057.8 — equalize command-stub sibling cross-refs (touches `claude/commands/{micro-task,release,starter-task,task}.md`; closes CORE-EPIC-057)
    - `74cb123` feat: CORE-054 — file CORE-EPIC-057 (filing only)
  - **Cite-don't-restate cohort:**
    - `aae7b8d` feat: CORE-049 — workflow token audit (predecessor; files starters CORE-050/051/052)
    - `e6b5c14` feat: CORE-050 — micro-task SKILL cite-don't-restate (touches `claude/skills/micro-task/SKILL.md` + new `step-1.5-model-edge.md`)
    - `5eb6158` feat: CORE-051 — starter-task SKILL cite-don't-restate (touches `claude/skills/starter-task/SKILL.md`)
    - `7458639` feat: CORE-052 — tasknote-README variant trim (touches `templates/tasknote-README.md`)
    - `cf10e44` feat: CORE-053 — MIGRATION §1.5 variant trim (touches `docs/MIGRATION.md`)
  - **Cross-project viz:**
    - `f1e3a3b` feat: FE-002 — cross-project viz / global workspace scanner (additive; viz scans `${FLOWTRON_VIZ_WORKSPACE:-~/code}/*/_project/PLAN.md`)
  - **Process / chore (omit from adopter-facing tag Changes block):**
    - `8e2c19c` chore: CORE-058 — de-scope (UserPromptSubmit hook not viable) + file CORE-059
    - `24612f8` chore: file CORE-060 — release v1.3.0
    - `5f9d4cf` chore: file CORE-054/055/056 starters + FE-017/018/019/020
    - `75433c8` chore: file CORE-053 starter
    - `95e0caa` chore: drop CORE-041, file CORE-049
    - `d47e934` chore: promote FE-002 + file starter
- **Archive skim hits (release-task precedents):**
  - `CORE-048.md` (v1.2.0) — most recent precedent. Single commit + annotated tag pattern. Adopter migration block deviated from boilerplate to call out CORE-047's `_project/tasknote/README.md §"AI-referenced docs"` action item.
  - `CORE-046.md` (v1.1.0) — established the "Changes since vP.Q.R" + Migration block tag-message shape and the doc-currency shift convention.
  - `CORE-043.md` (v1.0.0) — established `SPEC/versioning.md` example shifts off the just-cut release.
- **Adopter migration impact (v1.2.0 → v1.3.0):**
  - **3 new adopter-facing skills require symlink wiring on bump.** `claude/commands/{file-followup,epic-discovery,close-epic}.md` and `claude/skills/{file-followup,epic-discovery,close-epic}/` are new since v1.2.0. Fresh adopters via `/new-project` get these wired automatically (Step 3 was updated in CORE-057.3/.4/.5 to include all 6 commands + 6 skills). **Existing adopters bumping to v1.3.0 must add the 3 new commands + 3 new skills as symlinks** in `.claude/commands/` and `.claude/skills/` after `git checkout v1.3.0` of the submodule. The "Pinning and bumping" section in `docs/MIGRATION.md` (lines 312-328) currently says "symlinks don't need to be touched" — true only for *existing* symlinks; the 3 new ones need fresh `ln -s` lines. Migration block must call this out explicitly.
  - **`/release` is flowtron-self only and does NOT require an adopter symlink.** `/new-project` Step 3 deliberately excludes it.
  - **Cite-don't-restate cohort (CORE-049/050/051/052/053)** — pure doc/template tightening. No adopter action; tightened content is consumed automatically on submodule bump.
  - **CORE-057.6/.7/.8** — doc tightening (MIGRATION.md, SPEC/epic.md, command stubs). No adopter action.
  - **FE-002 cross-project viz** — additive viz feature; the global viz at `~/code/flowtron/viz` now scans all `~/code/*/_project/PLAN.md`. No project-side action; adopters benefit automatically once they re-open the global viz.
  - **CORE-058 de-scope + CORE-059 follow-up filing** — no behavioral code change ships in v1.3.0; CORE-059 is a future task. Omit from Changes block.
- **Drift check details:**
  - `SPEC.md:3` confirmed `**Version:** v1.2.0` at HEAD
  - `SPEC/versioning.md:8` confirmed `v1.2.0 → v1.2.1` (patch); `:10` confirmed `v1.2.x → v1.3.0` (minor)
  - `docs/MIGRATION.md:303` confirmed `(e.g., \`v1.2.0\`)`
  - `docs/MIGRATION.md:302` already lists `/file-followup, /epic-discovery, /close-epic` in the smoke check (added in CORE-057.6 audit) — no further update needed
  - `git describe --tags --abbrev=0` returns `v1.2.0` — matches SPEC.md:3, no drift
- **Pre-existing minor drift (out of scope for this release; surface as `/file-followup` candidate at recap):**
  - `claude/skills/release/SKILL.md:15` shows an illustrative PLAN-line example with stale task ID (`CORE-058` — that ID was de-scoped/repurposed; the actual filed release task is `CORE-060`). Skill self-doc, not part of `_project/tasknote/README.md §"AI-referenced docs"`, so excluded from the doc-drift sweep. Worth a follow-up to genericize the example so it doesn't silently bit-rot each release.
- **Clarifying questions:** None. Three assumptions made explicit:
  1. Tag-message Changes block will group commits by area (Skills cohort / Cite-don't-restate cohort / Cross-project viz) and omit pure chore/filing commits — adopter-facing, not exhaustive history.
  2. Migration block will call out the "add 3 new symlinks" action item for existing adopters bumping to v1.3.0 (deviates from CORE-046's "no required project-side edits" boilerplate; matches CORE-048's pattern of context-sensitive callouts).
  3. `/release` itself ships in this release as a `feat:` (CORE-057.2) but is flowtron-self only — Changes block notes this so adopters don't expect a slash-menu addition for it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed CORE-048 / CORE-046 / CORE-043 release-task pattern (single bump commit + annotated tag with subject + summary + Changes block + Migration block)
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only edits; no test surface)

**Implementation Notes:**

Three edits in order:

1. `SPEC.md:3` — `**Version:** v1.2.0` → `**Version:** v1.3.0`.
2. `SPEC/versioning.md:8-10` — patch example shifted `v1.2.0 → v1.2.1` to `v1.3.0 → v1.3.1`; minor `v1.2.x → v1.3.0` to `v1.3.x → v1.4.0`. Major (`v1.x.y → v2.0.0`) unchanged — already future-looking.
3. `docs/MIGRATION.md:303` — example pin `(e.g., \`v1.2.0\`)` → `(e.g., \`v1.3.0\`)`.

Verified post-edit: `grep -rn 'v1\.2\.0'` across live doc set (`SPEC.md`, `SPEC/`, `docs/`, `README.md`, `templates/`, `claude/`) returns one hit at `claude/skills/release/SKILL.md:15` — pre-existing drift in the skill's own illustrative example block (documented in Discovery Notes; out of scope for this release). All AI-referenced doc-set entries are clean. Total diff: 3 files, +4/-4.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits; no test surface)
- [x] Ran lint/type-check on changed code — N/A for markdown
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/frontend change)

**Testing Notes:**

No automated check applies. Markdown lint mental-pass: edits are single-token version-string substitutions; surrounding prose unchanged; no frontmatter touched; no fenced blocks broken. Viz suite untouched and not re-run — FE-002's own tests passed in its own tasknote and the viz code itself is unchanged in this release.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — verdicts per `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (no version refs; v1.3.0's adopter-facing surface is reachable via the existing `claude/CLAUDE-snippet.md` and `docs/MIGRATION.md` pointers — no README user-facing concept needs update)
  - `SPEC.md` — version-line bump (Phase 2). CORE-057.5 already landed the `/file-followup` discipline definition at HEAD via its own commit; no extra release-time change.
  - `docs/MIGRATION.md` — example-pin bump v1.2.0 → v1.3.0 (Phase 2). CORE-053 / CORE-057.6 / CORE-057.3 / CORE-057.4 / CORE-057.5 each updated MIGRATION.md as part of their own commits (smoke check now lists `/file-followup, /epic-discovery, /close-epic`); already at HEAD.
  - `claude/CLAUDE-snippet.md` — no change. CORE-057.3/.4/.5 already added the 3 new commands to the discipline paragraph and to the symlink-wiring block as part of their own commits.
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Cut flowtron v1.3.0 — minor release tagging the additive feature set that accumulated on main since v1.2.0. **Headline shipments:** the 4-skill cohort (CORE-EPIC-057) — `/file-followup`, `/epic-discovery`, `/close-epic` (adopter-facing), plus `/release` (flowtron-self only); the cite-don't-restate sweep (CORE-049/050/051/052/053) trimming long-form restatements out of the SKILL/template surface; cross-project viz (FE-002) where the global viz now scans all `~/code/` projects. **Pure release-task scope:** no new code beyond the 21 commits already on main; three doc-only edits (`SPEC.md:3` version bump, `SPEC/versioning.md:8-10` patch/minor example shifts off the just-cut release per CORE-043 precedent, `docs/MIGRATION.md:303` example pin → v1.3.0) — total diff 3 files, +4/-4. Single commit + annotated `v1.3.0` tag with adopter-facing release notes. **Adopter migration block deviates from boilerplate** to call out the action item: existing adopters bumping v1.2.0 → v1.3.0 must add 3 new command symlinks + 3 new skill symlinks for `/file-followup`, `/epic-discovery`, `/close-epic` (none existed at v1.2.0); fresh adopters via `/new-project` get all twelve symlinks wired automatically. `/release` is flowtron-self only — no adopter symlink. Cite-don't-restate cohort + cross-project viz require no project-side action. Tag pushed to origin alongside the commit.

**Archived:** 2026-05-09
