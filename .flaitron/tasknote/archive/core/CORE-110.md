---
title: epic-099 downstream refresh
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099]
---

# CORE-110 | epic-099 downstream refresh

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-099]]

## 🎯 Goal

Wire `docs/CONVENTIONS.md` and `CONTRIBUTING.md` into the three doc-set slots that EPIC-099 missed so they are drift-swept in Phase 4 and visible to adopters browsing the info skill and repo layout.

## ✅ Acceptance

- [ ] `_project/tasknote/README.md` §"AI-referenced docs" lists both `docs/CONVENTIONS.md` and `CONTRIBUTING.md`
- [ ] `README.md` §"Repo layout" has rows for `CONTRIBUTING.md` and `LICENSE`
- [ ] `claude/skills/ft-flowtron/SKILL.md` §"Key docs" has bullets for CONVENTIONS and CONTRIBUTING

## 🧩 Subtasks

- [ ] Add `docs/CONVENTIONS.md` + `CONTRIBUTING.md` entries to `_project/tasknote/README.md` §"AI-referenced docs"
- [ ] Add `CONTRIBUTING.md` + `LICENSE` rows to `README.md` §"Repo layout"
- [ ] Add `docs/CONVENTIONS.md` + `CONTRIBUTING.md` bullets to `claude/skills/ft-flowtron/SKILL.md` §"Key docs"

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic whose closure missed these three wiring points

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three wiring slots exist and are clearly under-populated. `docs/CONVENTIONS.md` and `CONTRIBUTING.md` are shipped files (both confirmed present at HEAD); they are referenced in `README.md §"Documents"` but absent from the three discovery/info surfaces this task targets. No ambiguity in scope.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source files read.** `_project/tasknote/README.md` (AI-referenced docs list: 4 entries at lines 34-37); `README.md` §"Repo layout" (lines 98-106, bullet list without CONTRIBUTING.md or LICENSE rows); `claude/skills/ft-flowtron/SKILL.md` §"Key docs" (lines 62-66, 4 bullets: SPEC.md / PHILOSOPHY.md / MIGRATION.md / templates/).

**Archive skim.** Relevant prior tasknotes:
- [[CORE-047]] (doc-set drift contract, 2026-05-08) — established `_project/tasknote/README.md` §"AI-referenced docs" with the initial 4-entry seed (README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md). No precedent for adding CONVENTIONS.md or CONTRIBUTING.md at that time.
- [[CORE-099.7]] (EPIC-099 audit, 2026-05-18) — **load-bearing design context.** Audit explicitly asked user "Add CONVENTIONS.md to AI-ref docs list?" → Answer: **"No (keep at 4)"**. Also declined adopter-facing pointers. This is the decision this task reverses. CORE-110 was filed by the subsequent `ft-audit` (Findings #2 + #3 Medium, #4 Low), which surfaced the gaps from a different angle. Since the user filed CORE-110 with explicit intent to add both docs to AI-referenced docs, the CORE-099.7 "keep at 4" decision is superseded for these two docs. Proceeding as filed.
- [[CORE-070]] (repo-layout-doc-currency, 2026-05-10) — last touch of `README.md §"Repo layout"`; landed the current bullet-list shape. No LICENSE or CONTRIBUTING.md rows were present at that time (both files didn't exist yet).

**Drift check.** All three target paths and sections verified at HEAD:
- `_project/tasknote/README.md` §"AI-referenced docs" — confirmed at lines 34-37; currently 4 entries (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md). ✓ slot to add: after line 37.
- `README.md` §"Repo layout" — confirmed at lines 98-106; bullet list with 8 items; no CONTRIBUTING.md or LICENSE entries. ✓ slot: natural addition to the bullet list.
- `claude/skills/ft-flowtron/SKILL.md` §"Key docs" — confirmed at lines 62-66; 4 bullets. ✓ slot: after `docs/MIGRATION.md` bullet (line 65) and before `templates/` bullet (line 66).
- `docs/CONVENTIONS.md` — exists ✓. `CONTRIBUTING.md` — exists ✓.

**No clarifications needed.** All three edits are additive, one-line additions to existing bullet/list sections. The task description names the exact sections and the exact items to add.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (doc-only changes; no executable code touched)

**Implementation Notes:**

Existing `- \`path\` — one-line purpose` bullet form applied consistently across all three targets. Added in parallel (three independent file edits, no ordering dependency).

- `_project/tasknote/README.md` §"AI-referenced docs" — two entries appended after existing 4: `docs/CONVENTIONS.md` (conventions + rationale) + `CONTRIBUTING.md` (solo-maintenance model).
- `README.md` §"Repo layout" — two rows inserted before the `pre-v0.1.0` tag line: `CONTRIBUTING.md` + `LICENSE`.
- `claude/skills/ft-flowtron/SKILL.md` §"Key docs" — two bullets inserted between `docs/MIGRATION.md` and `templates/`: `docs/CONVENTIONS.md` + `CONTRIBUTING.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable code)
- [x] Ran lint/type-check on changed code — N/A (no TypeScript/JavaScript touched)
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

Cross-ref consistency verified via grep: all 6 new path references (`docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `LICENSE`) appear in their respective target files. All three referenced files exist at HEAD (`docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `LICENSE`). No code surface touched; viz suite not affected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — §"Repo layout" extended by this task; §"Documents" already listed both files |
  | `SPEC.md` | no change — workflow contract orthogonal to repo-meta doc wiring |
  | `docs/MIGRATION.md` | no change — adoption mechanics unchanged |
  | `claude/CLAUDE-snippet.md` | no change — adopter paste-block unchanged |
  | `docs/CONVENTIONS.md` | no change — file content unchanged; only its listing in other docs was added |
  | `CONTRIBUTING.md` | no change — file content unchanged; only its listing in other docs was added |

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Wired `docs/CONVENTIONS.md` and `CONTRIBUTING.md` into the three slots EPIC-099 missed. (1) `_project/tasknote/README.md` §"AI-referenced docs" extended from 4 to 6 entries; (2) `README.md` §"Repo layout" gained `CONTRIBUTING.md` + `LICENSE` rows; (3) `claude/skills/ft-flowtron/SKILL.md` §"Key docs" gained two bullets between `docs/MIGRATION.md` and `templates/`. All edits follow the existing `- \`path\` — one-line purpose` bullet form. Three files changed, 6 lines added, no deletions.

**Archived:** 2026-05-18
