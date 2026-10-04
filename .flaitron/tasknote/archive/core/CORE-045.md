---
title: MIGRATION.md pre-flight + post-cleanup
status: completed
tags: []
created: 2026-05-07
due:
related-tasks: [CORE-044]
---

# CORE-045 | MIGRATION.md pre-flight + post-cleanup

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-044]]

## 🎯 Goal

Add a permanent §3.x subsection to `docs/MIGRATION.md` that captures the
generalized pre-flight collision check + post-migration cleanup checklists
distilled from fintown's CORE-098 and invisipaw's P43-1 migration tasknotes.

## ✅ Acceptance

- [x] New `§3.1 Pre-flight collision check` subsection added before the current §3.1 (Freeze), generic core only with 1-2 bracketed examples per item, distilled from CORE-098 P1-P10 + P43-1 P1-P11
- [x] New `§3.8 Post-migration cleanup` subsection added after the current §3.6 (Update `CLAUDE.md`) and before the commit step, distilled from CORE-098 Phase 3.5 + P43-1 Phase 3.5
- [x] Existing §3.1-§3.7 (Freeze / Cross-walk / Populate / Finish-or-rewrap / Retire helpers / Update CLAUDE.md / Commit) renumbered in place to §3.2-§3.7 + §3.9
- [x] Inbound self-ref at MIGRATION.md line 259 (`track §3.1–§3.6`) updated to the renumbered span — extended to `§3.1–§3.8` (substantively right; covers the new pre-flight + cleanup steps the migration tasknote tracks)
- [x] One-line cross-ref added in §2 pointing at the new §3.1 pre-flight checklist (collision risks apply equally to the heavy path)
- [x] §3.1 pre-flight section carries an explicit "project-specific items belong in the adopter's migration tasknote, not here" guardrail so future adopters don't graft local detail back into the generic checklist
- [x] Read-back of the full updated §3 confirms execution order, parallel structure with existing subsections, and self-consistent numbering

## 🧩 Subtasks

- [x] Draft the new §3.1 Pre-flight collision check body (generic core with bracketed examples; project-specific guardrail callout)
- [x] Draft the new §3.8 Post-migration cleanup body (generic core with bracketed examples)
- [x] Renumber existing §3.1-§3.7 headings to §3.2-§3.7 + §3.9 in `docs/MIGRATION.md`
- [x] Insert the new §3.1 + §3.8 sections at their target positions
- [x] Update inbound self-ref at MIGRATION.md line 259 (`§3.1–§3.6` → `§3.1–§3.8`)
- [x] Add one-line cross-ref from §2 to the new §3.1 pre-flight (place at the §2 preamble or in §2.1 just before any `git mv`)
- [x] Read-back the full revised §3 and the §2 cross-ref location to confirm it reads cleanly

## 🔗 Related

- [[CORE-044]] — new-project legacy detection (paired sibling; same lineage of fintown/invisipaw migration learnings)
- [[CORE-020]] — prior `/new-project` + MIGRATION.md update (last MIGRATION.md restructure of similar shape)
- [[CORE-036]] — `## Completed` archive convention (referenced from §3.3 example block)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v1.0.0 just shipped; CORE-044 (legacy detection in `/new-project`) merged the same day and explicitly cites this task as the paired follow-on. PLAN.md description (~50w) is under the 70w cap. Concrete deliverable: doc edit to `docs/MIGRATION.md` only, with the source material already concretized in CORE-098 + P43-1 — clear diff in mind.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Files in scope:**

- `docs/MIGRATION.md` — the only file edited
- Source material (read-only, NOT in this repo): `~/code/fintown/_project/tasknote/CORE-098.md` and `~/code/invisipaw/_project/tasknote/P43-1.md` — both still in their pre-execution state (status: Not Started). The Pre-Flight + Phase 3.5 sections in those files are the substance to generalize.

**Archive skim findings.** `_project/tasknote/archive/core/` greppped for `MIGRATION` + `pre-flight` + `cleanup`:

- **CORE-020** — original `/new-project` + MIGRATION.md update; established the §1 / §2 split. No pre-flight or post-cleanup content existed at that point.
- **CORE-036** — `## Completed` archive convention (referenced from current §3.3 — survives the renumber as §3.4).
- **CORE-043** — v1.0.0 release; v1.0 audit surfaced this gap.
- **CORE-044** — paired predecessor; merged today. Added legacy-marker detection to `/new-project` Step 0 with bail pointing at MIGRATION.md §3, and tightened §1.0 line 25 to match. CORE-044's Final Summary explicitly references this task: *"CORE-045 (paired follow-on) generalizes the cross-project pre-flight + post-cleanup checklists into a permanent §3.x subsection."*
- No prior flowtron tasknote has touched MIGRATION.md §3 substantively beyond its initial v0.10.0 introduction (commit 7a61dc9). Numbering is fresh — renumbering is safe.

**Drift check.**

- `docs/MIGRATION.md` §3 starts at line 169; sub-sections §3.1-§3.7 verified in place.
- `~/code/fintown/_project/tasknote/CORE-098.md` exists with Pre-Flight P1-P10 (lines 37-48) + Phase 3.5 (lines 84-99). Status `Not Started` — content is the filed plan, not a post-execution log.
- `~/code/invisipaw/_project/tasknote/P43-1.md` exists with Pre-Flight P1-P11 (lines 46-60) + Phase 3.5 (lines 96-114). Status `Not Started` — same shape.
- Inbound MIGRATION.md self-ref at line 259 (`track §3.1–§3.6`) is the only intra-doc number reference. Workspace-wide grep confirms no other `§3.[1-9]` references in flowtron's tree (md or otherwise).

**Generalization scope** (from cross-comparing CORE-098 P1-P10 + P43-1 P1-P11):

- **Generic pre-flight (carries to §3.1):** working tree clean · gitignore audit (paths vary by stack) · `.claude/` collisions (commands/task.md OR skills/task per project) · `_project/tasknote/README.md` collision (the exact gap surfaced as CORE-044) · `_project/tasknote/tasknote-template.md` collision · active migration-tasknote disposition (legacy-shape vs rewrap mid-migration) · root-level workflow-file inventory · path-reference grep
- **Project-specific (stays in adopter tasknotes):** credentials safety · live runtime state (paused / paper-mode) · project-local `.claude/skills/` orthogonal to flowtron · project-specific orphan dirs (`brainstorm/`, `scratch/`, etc.)
- **Generic post-cleanup (carries to §3.8):** redundant template removal · `_legacy_task` backup disposition · stale path-reference + ID sweep · CI / pre-commit hook check · `/starter-task` and `/micro-task` slash-menu smoke · final pin verification · cleanup commit decision
- **Project-specific (stays in adopter tasknotes):** runtime smoke (live-trading restart) · CLAUDE.md sweep for project-specific guardrails · orthogonal-doc final disposition

**Decisions locked (via clarifying questions, see ✅ Acceptance):**

1. **Numbering:** renumber existing §3.1-§3.7 → §3.2-§3.7 + §3.9; insert new §3.1 (pre-flight) and §3.8 (post-cleanup). Reads in execution order; v0.10.0-fresh numbering means no inbound-link breakage outside line 259.
2. **§2 cross-ref:** add a one-liner from §2 pointing at the new §3.1 pre-flight — collision risks (`.claude/` symlinks, `_project/tasknote/README.md`, working-tree-clean) apply equally to the heavy path.
3. **Examples density:** generic core with 1-2 bracketed examples per checklist item. Examples concretize without bloating; project-specific items stay in adopter tasknotes per the task description's explicit boundary.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Existing §3 sub-sections use `### 3.X Title` heading + intro paragraph + bulleted/numbered list or fenced code block, with **bold-prefix** bullets in the bullet-decision style (§3.4-rewrap, §3.5-retire). New §3.1 + §3.8 follow the same shape verbatim — no new pattern introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only doc edit)

**Implementation Notes:**

Nine edits to `docs/MIGRATION.md`:

1. **§2 cross-ref (line 128, new paragraph).** Inserted between §2's "Section 1 first" preamble and the §3-redirect, pointing readers at §3.1 pre-flight before any `git mv` on the heavy path.
2. **§3.7 → §3.9 + new §3.8 inserted.** "Commit the migration" heading renumbered; new "Post-migration cleanup" subsection lands above it. Also updated the inbound self-ref inside §3.9's body from `§3.1–§3.6` to `§3.1–§3.8` (substantive: span now covers the new pre-flight + cleanup steps the migration tasknote tracks).
3-7. **§3.6 → §3.7, §3.5 → §3.6, §3.4 → §3.5, §3.3 → §3.4, §3.2 → §3.3.** One Edit per heading; bodies untouched.
8. **§3.1 → §3.2 + new §3.1 inserted.** "Freeze the legacy plan + tasknote dirs" heading renumbered; new "Pre-flight collision check" subsection lands above it.

New §3.1 carries an explicit "generic core; project-specific tells belong in the adopter's migration tasknote — not here" guardrail to keep future MIGRATION.md churn minimal. New §3.8 mirrors the same boundary.

**Generalization choices** (from cross-comparing CORE-098 P1-P10 + P43-1 P1-P11 / Phase 3.5):

- Pre-flight kept to 8 generic items (working tree clean, gitignore, `.claude/` collision, `_project/tasknote/README.md` collision, template collision, active migration-tasknote disposition, root-level workflow-file inventory, path-reference grep).
- Post-cleanup kept to 7 generic items (template removal, `_legacy_task` backup, path-reference sweep, CI/pre-commit, `/starter-task`+`/micro-task` smoke, pin verification, cleanup commit).
- Project-specific items (credentials safety, live-trading runtime, project-local audit skills, brainstorm/scratch dirs) explicitly carved out — left to adopter tasknotes.
- §3.1 callout cites `[[CORE-044]]` directly so the paired-sibling lineage is discoverable from the doc.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only doc edit; no test pipeline)
- [x] Ran lint/type-check on changed code — N/A (markdown-only)
- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Read-back of the full revised §3 (lines 171-299) confirms sub-numbering is sequential 3.1 → 3.9, all intra-doc §-references are consistent (§3.5 → §2.2, §3.6 → §2.3+§2.4, §3.7 → §2.5+§1.3 untouched; new internal refs §3.1 ↔ §3.2/§3.4/§3.5/§3.8 and §3.8 ↔ §3.1/§3.2/§3.3/§3.9 all valid), and the §2 cross-ref at line 128 reads cleanly. Workspace-wide grep `§3\.[1-9]` returned only intra-MIGRATION.md hits — no other flowtron doc, skill, or template referenced §3 sub-numbers, so renumbering is fully contained.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `docs/MIGRATION.md` only. No SPEC, README, CLAUDE-snippet, or template propagation needed: §3.x is self-contained doc structure; the §2 cross-ref is the only outbound touch point.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-07.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Generalized fintown CORE-098 + InvisiPaw P43-1's migration pre-flight (P1-P10/P11) and Phase 3.5 post-migration cleanup checklists into permanent `docs/MIGRATION.md` subsections §3.1 (Pre-flight collision check) and §3.8 (Post-migration cleanup). Existing §3.1-§3.7 (Freeze / Cross-walk / Populate / Finish-or-rewrap / Retire helpers / Update CLAUDE.md / Commit) renumbered in place to §3.2-§3.7 + §3.9, reading top-to-bottom in execution order. §2 (heavy path) gained a one-line cross-ref pointing at §3.1 — collision risks (`.claude/` symlinks, `_project/tasknote/README.md`, working-tree-clean) apply identically there. Inbound self-ref inside §3.9 extended from `§3.1–§3.6` to `§3.1–§3.8` (now covers pre-flight + cleanup). Project-specific items (credentials safety, live-trading runtime, project-local skills, orphan dirs) explicitly carved out via guardrail prose — they stay in adopter migration tasknotes, not in this generic checklist. Pairs with [[CORE-044]] which closed the upstream `/new-project` legacy detection on the same day. Doc-only edit; no SPEC, README, CLAUDE-snippet, template, or test changes.

**Archived:** 2026-05-07
