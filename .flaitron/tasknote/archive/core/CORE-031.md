---
title: archive search in Phase 1
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-06
due:
related-tasks: []
---

# CORE-031 | archive search in Phase 1

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make Phase 1 Discovery surface prior archived tasknotes touching the same files/area, so historical decisions stay accessible as `archive/<area>/` grows.

## ✅ Acceptance

- [ ] `SPEC.md` §"📝 Phase 1: Discovery" gains a new required checklist bullet between "Read relevant source files" and "Drift check", instructing the assistant to skim `_project/tasknote/archive/<area>/` for prior tasknotes touching the same files / area, and to surface relevant findings before re-interpreting the task.
- [ ] `templates/tasknote-template.md` Phase 1 checklist mirrors the SPEC change (same bullet, same position) so newly scaffolded tasknotes carry the step.
- [ ] `.claude/skills/task/SKILL.md` Step 4 imperatives gain a thin operational bullet (cite-don't-restate shape, per CORE-038 precedent): area listing + filename-grep mechanics, with findings logged in Discovery Notes.
- [ ] SPEC version header bumped (patch vs minor decision deferred to Phase 4 closure once the diff is concrete).
- [ ] Self-test: this very tasknote (CORE-031) has its Phase 1 archive skim performed and findings logged in Discovery Notes (already complete — see notes below).
- [ ] `viz/` test suite + `tsc --noEmit` pass (sanity check; doc-only edits shouldn't affect parser, but verifies nothing collateral moved).

## 🧩 Subtasks

- [ ] Draft the new SPEC.md Phase 1 checklist bullet (concise wording matching neighboring bullets; reference the `archive/<area>/` path).
- [ ] Insert the bullet into SPEC.md §"📝 Phase 1: Discovery" between "Read relevant source files" and "Drift check".
- [ ] Mirror the bullet into `templates/tasknote-template.md` Phase 1 checklist (same position).
- [ ] Add a thin imperative to `.claude/skills/task/SKILL.md` Step 4 operationalizing the skim (area listing + filename grep) without restating the SPEC bullet.
- [ ] Decide SPEC version bump (patch v0.6.2 → v0.6.3 vs minor v0.6.2 → v0.7.0) — surface tradeoff to user once diff is concrete.
- [ ] Bump SPEC.md version header per the chosen tier.
- [ ] Run `viz/` tests + `tsc --noEmit`; confirm clean.
- [ ] Phase 4 closure — flip PLAN.md to Completed, archive this tasknote, commit.

## 🔗 Related

- (none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `archive/core/` already holds 23 tasknotes; prior decisions are now genuinely retrievable but not surfaced during Phase 1. The "cheap fix" framed in the PLAN line (SPEC patch + skill imperative) is small and additive — no parser/schema/code surface affected. The optional viz "archive search" view is explicitly out of scope.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift check:** PLAN.md line cites three surfaces — `archive/<area>/`, Phase 1 Discovery, and the skill instruction surface. All three exist as referenced (`_project/tasknote/archive/<area>/`, SPEC.md §"📝 Phase 1: Discovery" lines 299-318, `.claude/skills/task/SKILL.md` Step 4 lines 135-145). No drift.

- **Self-test archive skim** (dogfooding the very feature this task adds — area `core`, files in scope: `SPEC.md`, `templates/tasknote-template.md`, `.claude/skills/task/SKILL.md`):
  - 19 of 23 archive/core tasknotes mention `SPEC.md`; 16 mention `tasknote-template.md`; 14 mention `task/SKILL.md` or `skills/task`. Most are bootstrap noise (CORE-004 through CORE-030 establishing the system). The genuinely precedential priors are the four most recent SPEC/skill-shaping tasks: CORE-037 (token-cost audit), CORE-038 (cite-don't-restate for SKILL.md), CORE-039 (SPEC prose tightening), CORE-040 (filing-discipline thresholds).
  - **Three load-bearing findings from the skim:**
    1. **`.claude/skills/task/SKILL.md` and `claude/skills/task/SKILL.md` are hardlinked** (shared inode per CORE-038 archive). A single edit lands in both — no double-write needed.
    2. **Cite-don't-restate is the active norm for SKILL.md** (CORE-038). SPEC carries the canonical Phase 1 bullet; SKILL.md cites it and adds only thin operational imperatives. Our addition follows the same shape.
    3. **CORE-040 was tagged patch (v0.6.0 → v0.6.1)** for an additive SPEC clarification — but explicitly because it touched no parser/schema/template. CORE-031 DOES touch the template (new checklist line in `templates/tasknote-template.md`), so the patch-vs-minor call is genuinely a judgment, not auto-patch. Surface to user at Phase 4.

- **Clarifying questions resolved (via AskUserQuestion):**
  1. Shape & placement: **new top-level checklist item between "Read relevant source files" and "Drift check"** — highest visibility; assistant explicitly ticks it.
  2. Skim scope: **area listing + file-overlap grep** — `ls archive/<area>/`, then `grep -l <source-path> archive/<area>/*.md` for each in-scope path; matches PLAN.md's "same files / area" phrasing.

- **Edge case noted:** when `archive/<area>/` doesn't exist (early in a project, or a fresh area like first-ever DB task), the skim is a no-op. SPEC bullet wording should accommodate gracefully ("if non-empty" or similar). Decided in Phase 2 wording draft.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

- **Pattern survey:** the archive-skim bullet's closest neighbor in Phase 1 is "Drift check" — both are non-obvious steps requiring an inline explanatory clause AND a corresponding short paragraph below the checklist. Mirrored that shape exactly: bolded label + em-dash + intent/method clause + "before re-interpreting the task" tail. SKILL.md operationalization follows the cite-don't-restate norm established in CORE-038 (SPEC carries canonical bullet; SKILL.md adds thin imperatives). New shape is justified-by-extension, not invention.

- **SPEC.md edits** (`/Users/fakeneuron/Code/flowtron/SPEC.md`):
  1. Version header bumped v0.6.2 → **v0.7.0** (minor — adds a new required template section per SPEC §"Versioning"; CORE-040 patch-bump rationale explicitly excluded template-touching changes).
  2. §"📝 Phase 1: Discovery" checklist gained a new bullet between "Read relevant source files" and "Drift check" — `**Archive skim** — surface prior decisions on the same files / area by skimming _project/tasknote/archive/<area>/ for tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task`.
  3. §"📝 Phase 1: Discovery" explanatory prose gained a matching paragraph between the Relevance Assessment and Drift check paragraphs — explains the why (prior tasknotes record load-bearing context: file rename trails, regression notes, design rationales, hardlink discoveries) and the cost/payoff curve (trivial when archive empty; scales as it matures).

- **`templates/tasknote-template.md` edit:** Phase 1 checklist mirrored the SPEC bullet at the same position. Wording slightly trimmed to match the template's lighter prose voice (`skim _project/tasknote/archive/<area>/ for prior tasknotes ...` rather than the fuller `surface prior decisions on the same files / area by skimming ...`).

- **`.claude/skills/task/SKILL.md` edit (Step 4):** Added one operational bullet between the "first checklist item already done" note and the "Clarifying questions" imperative — concrete recipe (`ls _project/tasknote/archive/<area>/`, then per-source-path `grep -l`, log hits, fallback for empty/absent dir). Cite-don't-restate shape — SPEC carries the what; the skill adds the how.

- **Hardlink confirmed:** `.claude/skills/task/SKILL.md` and `claude/skills/task/SKILL.md` share inode 79895343 (per CORE-038 archive). Single edit landed in both paths atomically; verified via `ls -li` + grep.

- **In-flight self-dogfood:** added the new Archive-skim checkbox retroactively to this tasknote's own Phase 1 and ticked it (the skim was actually performed during Discovery — see notes above; the box closes the loop structurally).

- **No tests added/changed** — markdown-only doc edits; no parser, schema, or code surface affected. Sanity test run lives in Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `viz/` test suite (sanity: confirms no collateral parser regression; SPEC/template/skill prose changes don't touch parser logic, but viz reads `_project/PLAN.md` and SPEC shape indirectly)
- [x] Ran lint/type-check on changed code — `npx tsc --noEmit` in `viz/`, clean
- [x] (frontend) Asked the user for visual confirmation — n/a (doc-only edit; no UI surface changed)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

53/53 viz tests pass (`src/parser.test.ts` 29 tests, `src/tasknote.test.ts` 24 tests; ~2.1s); `tsc --noEmit` clean. SPEC.md, template, and skill SKILL.md changes are pure prose; they do not affect the markdown parser (`viz/src/parser.ts`), the tasknote frontmatter parser (`viz/src/tasknote.ts`), or any UI surface. The test run is a sanity check that nothing collateral moved. Cold re-read of all three edits confirms they read cleanly: SPEC checklist sequence (Reviewed → Relevance → Read source → Archive skim → Drift check → Clarifying → Subtasks) is natural; explanatory prose order (Relevance / Archive skim / Drift check) mirrors the checklist; SKILL.md `ls` + `grep -l` recipe matches the voice and depth of neighboring imperatives.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — SPEC.md (§"📝 Phase 1: Discovery" checklist + matching prose paragraph + Version header bump), `templates/tasknote-template.md` (Phase 1 checklist mirror), `.claude/skills/task/SKILL.md` (Step 4 operational imperative; landed in `claude/skills/task/SKILL.md` automatically via hardlink). No `MIGRATION.md` / release-notes update — release tag deferred to follow-up per the CORE-029 / CORE-030 / CORE-024 / CORE-040 pattern.
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Added a required **Archive skim** step to Phase 1 Discovery: SPEC.md §"📝 Phase 1: Discovery" gained a new checklist bullet between "Read relevant source files" and "Drift check" + a matching explanatory paragraph; `templates/tasknote-template.md` mirrored the bullet; `.claude/skills/task/SKILL.md` Step 4 added a thin operational imperative (`ls archive/<area>/` enumerate + per-source-path `grep -l`; log hits in Discovery Notes; empty/absent dir → log "no prior tasknotes" and tick). Cite-don't-restate shape per CORE-038 — SPEC carries canonical intent, skill operationalizes mechanics. SKILL.md hardlink (CORE-038 finding) confirmed: edit landed in both paths atomically (inode 79895343).

**Version bump: minor v0.6.2 → v0.7.0** — adopting the SPEC §"Versioning" framing that "additive features (new template sections)" earn minor. The template gained a new required Phase 1 checklist line; CORE-040's patch-bump rationale ("no parser/schema/template change") explicitly excludes template-touching changes from patch.

**Self-dogfood:** ran the new Archive skim during this very tasknote's Phase 1; the skim surfaced three load-bearing findings (SKILL.md hardlink from CORE-038, cite-don't-restate norm from CORE-038, patch/minor precedent from CORE-040) — empirical evidence the feature pays off in mature areas. Added the new checklist box retroactively to this tasknote's own Phase 1 and ticked it.

**Out of scope:** the optional viz "archive search" view explicitly mentioned in the PLAN line; would be filed separately if pursued.

53/53 viz tests pass; `tsc --noEmit` clean. Touched files: `SPEC.md`, `templates/tasknote-template.md`, `.claude/skills/task/SKILL.md` (= `claude/skills/task/SKILL.md` via hardlink), `_project/PLAN.md`, `_project/tasknote/CORE-031.md` → `_project/tasknote/archive/core/CORE-031.md` (this file).

**Archived:** 2026-05-06
