---
title: Starter tasknotes
status: completed
priority: High
area: core
tags: [spec, skill, template]
created: 2026-05-03
due:
related-tasks: [CORE-017, CORE-018, CORE-023, FE-004]
---

# CORE-027 | Starter tasknotes

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-017]] [[CORE-018]] [[CORE-023]] [[FE-004]]

## 🎯 Goal

Add a `status: starter` lightweight tasknote shape (frontmatter + `## 🌱 Starter context` only) for capturing rich AI-discovered context at task-filing time without bloating PLAN.md, plus a `/starter-task <ID>` skill to file them and a `/task <ID>` checkout step that promotes them to full tasknotes.

## ✅ Acceptance

- [ ] `SPEC.md` adds `starter` to the YAML status enum (§"Tasknote frontmatter") and a new short §"Starter tasknotes" section between frontmatter and body-shape sections; one-line carve-out in §"Tasknote body shape" notes starters skip the spec+phase layout.
- [ ] `SPEC.md` `Version` header bumped v0.3.0 → v0.4.0 (additive minor — no migration required for existing tasknotes).
- [ ] `templates/tasknote-starter-template.md` exists with the minimal frontmatter + `## 🌱 Starter context` body.
- [ ] `claude/skills/starter-task/SKILL.md` (new) + `claude/commands/starter-task.md` (thin pointer) exist; the skill takes a required task-ID `args`, writes the starter file at `_project/tasknote/<ID>.md`, and appends the PLAN.md entry.
- [ ] `claude/skills/task/SKILL.md` gains an explicit starter-check step that runs unconditionally — detects `status: starter`, drift-checks captured context, scaffolds the rest of the template, and flips status to `in-progress` before continuing through Phases 1-4.
- [ ] `templates/tasknote-README.md` gains a one-bullet description of the starter shape so adopting projects' READMEs reflect it.
- [ ] CORE-027 itself promoted from starter to full tasknote (this file) and closed via the new flow — dogfooded prototype validates the shape end-to-end.

## 🧩 Subtasks

1. [x] Add `templates/tasknote-starter-template.md` — minimal frontmatter (`title`, `status: starter`, `priority`, `area`, `tags`, `created`) + nav header + `## 🌱 Starter context` body section with placeholders.
2. [x] Update `SPEC.md`:
   - Bump `Version` header v0.3.0 → v0.4.0.
   - Add `starter` to the YAML status enum in §"Tasknote frontmatter" with one-line note.
   - Insert new §"Starter tasknotes" section between §"Tasknote frontmatter" and §"Tasknote body shape" — defines purpose, layout (frontmatter + nav header + `## 🌱 Starter context` only), lifecycle (filed via `/starter-task`, sits with 🌱 chip in viz, promoted at `/task` checkout).
   - Add one-line carve-out in §"Tasknote body shape" — starters skip the spec+phase layout.
   - Add parallel "When to file a starter" paragraph to §"When to use a tasknote (and when not to)".
3. [x] Add `claude/skills/starter-task/SKILL.md` (mirrors `/new-project` shape: frontmatter + validate `args` task-ID against PLAN.md + write starter file + append PLAN.md entry + hand-off).
4. [x] Add `claude/commands/starter-task.md` (thin pointer mirroring `claude/commands/task.md`).
5. [x] Update `claude/skills/task/SKILL.md` Step 2 — branch on existing-file status: `status: starter` → promote (drift-check captured context + scaffold spec sections + add divider + four phase sections + flip status to `in-progress` + update nav header); other status → stop (current "continue conversationally" hint); absent → fresh scaffold (current Step 3). Document the promote sub-flow inline.
6. [x] Update `templates/tasknote-README.md` — one bullet describing the starter shape so adopting projects' READMEs reflect it.
7. [x] Targeted tests: `cd viz && npm test && npx tsc --noEmit`. Starter is a new status string only — no viz/ rendering yet (split to follow-up FE task per [[CORE-017]] / [[FE-004]] precedent). Confirm no parser regression. **Result:** 51/51 tests pass; tsc clean.
8. [x] At Phase 4 closure: file follow-up FE task ("viz/ 🌱 chip rendering for starter tasknotes" — render 🌱 chip on rows with `status: starter`, exclude starters from "in progress" counts, click-to-expand renders the starter context); file release task ("release v0.4.0") per [[CORE-014]] / [[CORE-025]] precedent. **Filed:** FE-006 [opus] under Medium; CORE-028 [sonnet] under Low.

## 🔗 Related

- [[CORE-017]] — frontmatter introduced the status enum that gains `starter`
- [[CORE-018]] — body shape (spec-on-top + log-below) which starters intentionally skip
- [[CORE-023]] — PLAN.md task-line grammar; unchanged here (filing only adds an entry, no new syntax)
- [[FE-004]] — viz/ frontmatter consumption; precedent for splitting viz/ rendering into a follow-up FE task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Starter design is well-vetted and dogfooded; addresses real friction (rich AI-discovered context being lost or bloating PLAN.md); no competing work in flight; predecessors [[CORE-017]] / [[CORE-018]] / [[CORE-023]] / [[FE-004]] are all closed.

- [x] Read relevant source files
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Promoted from starter 2026-05-03.** Starter context block absorbed into Goal / Acceptance / Related per the user's choice (starter "Open at promotion" #5); original preserved in git history.
- **Drift check:** all paths cited in the starter resolve in current code — `SPEC.md` §"Tasknote frontmatter" (line 145) ✓, §"Tasknote body shape" (line 181) ✓, `Version: v0.3.0` (target v0.4.0) ✓, `claude/skills/task/SKILL.md` Steps 0/1/1.5/2/3/4/5/6 ✓, parallel `claude/skills/new-project/SKILL.md` for shape mirroring ✓, `templates/tasknote-README.md` and `docs/MIGRATION.md` both present ✓.
- **One drift finding:** the starter listed `docs/MIGRATION.md` §"Bumping to v0.4.0" note as a deliverable. Reading current MIGRATION.md (§"Pinning and bumping" is generic; no per-version subsections) confirms this would fight the established CORE-013/CORE-015 convention — per-version migration notes live in the annotated tag message + release tasknote, not MIGRATION.md. **Resolution:** dropped the MIGRATION.md bullet from Acceptance; file untouched.
- **Clarifying questions** (resolved 2026-05-03 via AskUserQuestion):
  1. `/task` skill insertion point → **branch Step 2 on existing-file status** (3-way: `starter` → promote, other → stop, absent → scaffold).
  2. `/starter-task` args → **require explicit task-ID** (mirrors `/task` and `/new-project` shape).
  3. Starter frontmatter `priority:` → **AI guesses; overridable at promotion** (visualizers group correctly; cheap to fix).
  4. SPEC §"When to use a tasknote" → **add parallel "When to file a starter" paragraph**.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior
- [x] Ran targeted tests on changed files

**Implementation Notes:**

- **Pattern survey:** Three patterns mirrored — `templates/tasknote-template.md` (full template; starter is a subset shape), `claude/skills/new-project/SKILL.md` (parallel for `/starter-task`), `claude/commands/{task,new-project}.md` (parallel for command pointer). All three already existed; no new shape needed.
- **Files added (3):** `templates/tasknote-starter-template.md`, `claude/skills/starter-task/SKILL.md`, `claude/commands/starter-task.md`.
- **Files edited (4):** `SPEC.md` (5 sub-edits — version bump, status enum, new §"Starter tasknotes" section between frontmatter and body-shape sections, body-shape carve-out, parallel "When to file a starter" paragraph in §"When to use a tasknote"); `claude/skills/task/SKILL.md` (Step 2 restructure into pre-flight + 3-way file-state branch; Step 3 split into Step 3a "Promote a starter" and Step 3b "Scaffold a fresh tasknote"); `templates/tasknote-README.md` (parallel bullet for starter template).
- **Tests added:** None for this task — starter is a new status string only; no parser logic change required. The current viz parser passes through unrecognized status values transparently (51 tests confirm). Starter-aware viz rendering is split to the follow-up FE task per [[CORE-017]] / [[FE-004]] precedent.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/ rendering changes)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

- `cd viz && npm test -- --run`: **51/51 pass** (`parser.test.ts` 29, `tasknote.test.ts` 22). The dogfood promotion of `_project/tasknote/CORE-027.md` from `starter` → `in-progress` parses correctly; the existing parser is permissive on the `status:` field.
- `cd viz && npx tsc --noEmit`: **clean** (no output).

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change
- [x] Updated PLAN.md (status flipped to `Completed YYYY-MM-DD`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/<area>/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped the **starter tasknote** lightweight shape (frontmatter + `## 🌱 Starter context` only) for capturing rich AI-discovered context at task-filing time without bloating PLAN.md. Three new files (`templates/tasknote-starter-template.md`, `claude/skills/starter-task/SKILL.md`, `claude/commands/starter-task.md`) plus four edits: `SPEC.md` v0.3.0 → v0.4.0 (new §"Starter tasknotes" section between frontmatter and body-shape sections, body-shape carve-out, parallel "When to file a starter" paragraph in §"When to use a tasknote", `starter` added to status enum); `claude/skills/task/SKILL.md` Step 2 restructured into a 3-way file-state branch (`status: starter` → Step 3a Promote / other status → stop / file absent → Step 3b Scaffold); `templates/tasknote-README.md` parallel bullet for the starter template.

**Dogfooded:** CORE-027 itself was filed as a starter on 2026-05-03 and promoted to a full tasknote via the new flow during this same conversation. The promote sub-flow (drift-check captured context → flip frontmatter → restructure nav header → insert spec sections → add divider + four phase sections → absorb the starter block) was executed manually here because the `/task` skill didn't yet know about starters; it now does.

**Tests:** 51/51 viz parser + tasknote tests pass; `tsc --noEmit` clean. Starter is a new status string only — no parser logic change required (current parser is permissive on `status:`).

**Drift finding (Phase 1):** the starter listed `docs/MIGRATION.md` §"Bumping to v0.4.0" note as a deliverable; reading current MIGRATION.md confirmed this would fight the CORE-013/CORE-015 convention (per-version migration notes live in annotated tag messages + release tasknotes, not MIGRATION.md). Dropped from Acceptance; MIGRATION.md untouched.

**Follow-ups filed at closure:** **FE-006** [opus] (viz/ 🌱 chip rendering) under Medium per [[CORE-017]] / [[FE-004]] precedent of splitting viz/ rendering from spec/skill changes; **CORE-028** [sonnet] (release v0.4.0 — annotated tag + push) under Low per [[CORE-014]] / [[CORE-025]] precedent.

**Archived:** 2026-05-03
