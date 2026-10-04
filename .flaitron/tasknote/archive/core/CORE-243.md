---
title: glossary-audit-family-categorization
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-243 | glossary-audit-family-categorization

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the `audit-family` glossary term (docs/GLOSSARY.md:17) so it excludes `/ft-audit-context`, aligning the glossary with SPEC §"Skill namespace" / PLATFORMS §"Today's surface" / MIGRATION §1.2.1, where the family is the six forkable stack scaffolds and `/ft-audit-context` is a standalone context-surface skill.

## ✅ Acceptance

- [ ] GLOSSARY.md `audit-family` entry lists only the six skills (`/ft-audit`, `-docs`, `-backend`, `-frontend`, `-performance`, `-security`) — no `/ft-audit-context`
- [ ] The `/ft-audit*` glob (which would match `-context`) is replaced by the precise six-skill set, matching SPEC's brace notation framing
- [ ] Entry notes `/ft-audit-context` as standalone, not part of the family
- [ ] No regression to the adjacent `audit-family fork` entry (line 19) or the term count stamp (deferred to CORE-244)

## 🧩 Subtasks

- [ ] Reword GLOSSARY.md:17 to exclude `/ft-audit-context` and reframe the family as the six forkable stack scaffolds
- [ ] Verify alignment against the three cited anchors

## 🔗 Related

- [[CORE-244]] — sibling audit-docs finding; owns the glossary term-count refresh (don't touch the count here)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** GLOSSARY.md:17 genuinely misclassifies `/ft-audit-context` as audit-family; SPEC/PLATFORMS/MIGRATION all treat it as standalone. Clear-diff doc correction.

- [x] Read relevant source files — GLOSSARY.md:17, SPEC.md §"Skill namespace", PLATFORMS.md §"Today's surface", MIGRATION.md §1.2.1.

- [x] **Archive skim** — no prior tasknotes touched docs/GLOSSARY.md `audit-family` categorization (CORE-194.3 introduced the glossary; CORE-235 touched the count stamp). Nothing load-bearing for this categorization fix.

- [x] **Drift check** — GLOSSARY.md:17 still contains the 7-item parenthetical including `/ft-audit-context`; line number matches. SPEC line 89-90, PLATFORMS §"Today's surface", MIGRATION §1.2.1 all confirm the six-skill family + standalone context. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. Assumptions: (1) scope is line 17 only; do NOT add a new standalone `audit-context` glossary entry (out of scope, and would shift the count owned by CORE-244); (2) leave the `audit-family fork` entry (line 19) and the `~53` count stamp untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Canonical family = `/ft-audit{,-docs,-security,-frontend,-backend,-performance}` (six). `/ft-audit-context` is a context-surface skill that follows its own recipe (PLATFORMS lists it alongside `/ft-new-project`, `/ft-release`, etc.). The current `/ft-audit*` glob in the glossary is the root of the bug — it textually matches `-context`. Replacing the glob with the explicit/brace six-skill set fixes both the list and the framing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended SPEC §"Skill namespace" brace-notation framing (`/ft-audit{,-docs,...}`); mirrors the canonical six-skill set rather than inventing new phrasing.

- [x] Implemented the minimal solution — reworded GLOSSARY.md:17 only.

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only doc edit).

**Implementation Notes:**

Replaced the `/ft-audit*` glob + 7-item parenthetical with the explicit six-skill brace set and a sentence marking `/ft-audit-context` as standalone. Single-line change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (GLOSSARY.md is prose, not parsed by viz).

- [x] Ran lint/type-check on changed code — N/A (markdown).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verified the rendered line reads cleanly; swept all 11 AI-referenced docs for audit-family/`-context` references (SPEC, MIGRATION, PLATFORMS) — all already use the correct six-skill framing.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: **no change**. The three that reference the audit-family (SPEC §"Skill namespace", MIGRATION §1.2.1, PLATFORMS §"Today's surface") already framed it as six skills + standalone context; the glossary was brought into line with them, not vice-versa. GLOSSARY.md itself is excluded from the sweep list by design.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:**

Corrected docs/GLOSSARY.md:17 so the `audit-family` term lists only the six forkable stack scaffolds (`/ft-audit{,-docs,-backend,-frontend,-performance,-security}`) and explicitly marks `/ft-audit-context` as a standalone context-surface skill. The old `/ft-audit*` glob was the root of the misclassification (it textually matched `-context`). Glossary now aligns with SPEC / PLATFORMS / MIGRATION. Term count stamp left untouched (CORE-244 owns it).

**Archived:** 2026-05-31
