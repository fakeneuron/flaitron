---
title: flowtron-info-skill adopter framing
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: []
---

# CORE-090 | flowtron-info-skill adopter framing

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Rewrite the `/audit` row in the bundled-skills table (`claude/skills/flowtron/SKILL.md:50`) to reflect stack-neutral-scaffold framing so adopters get an accurate description of what the skill does.

## ✅ Acceptance

- [ ] `/audit` row no longer says "flowtron's markdown contract surface"
- [ ] Row description matches the stack-neutral framing from `docs/MIGRATION.md` §1.2.1 and the audit SKILL.md frontmatter
- [ ] Row is appropriately concise, matching the style of surrounding rows

## 🧩 Subtasks

- [ ] Update the `/audit` row in `claude/skills/flowtron/SKILL.md` (line 50)

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Current wording "flowtron's markdown contract surface" is flowtron-self-centric; the audit skill is a stack-neutral scaffold meant for any project and explicitly says so in its own frontmatter and in MIGRATION.md §1.2.1. One-line fix in SKILL.md.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope
- [x] **Drift check** — `claude/skills/flowtron/SKILL.md:50` confirmed; line reads: `| \`/audit\` | Ruthless principal-engineer audit of flowtron's markdown contract surface — 5 passes, capped findings, writes tickets to PLAN. |`
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Archive skim: checked `_project/tasknote/archive/core/` — no prior tasknotes touched `claude/skills/flowtron/SKILL.md`; CORE-084 created it but its tasknote wouldn't be instructive here.

The fix is straightforward: replace "flowtron's markdown contract surface" wording with stack-neutral language. The audit skill's own frontmatter description is the canonical reference:
> "Ruthless principal-engineer code audit — 5 passes (Security · Idioms · Hygiene · Orphans · Doc drift), capped at 5 findings each, writes prioritized tickets to `_project/PLAN.md`. Stack-neutral scaffold; adopters fork into `.claude/skills/audit/` and fill in rubric / verification gates / per-pass examples for their stack."

New row should: (1) drop the flowtron-centric phrase, (2) name the actual passes, (3) note it's a forkable scaffold. Keeping it concise to match surrounding row lengths.

No clarifications needed. Assumption: the table row should stay in one cell, concise, without replicating the full frontmatter description verbatim.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — surrounding rows are concise, no self-referential language; same shape applied to `/audit` row
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only change)

**Implementation Notes:**

Replaced `claude/skills/flowtron/SKILL.md:50` `/audit` row. Old: "Ruthless principal-engineer audit of flowtron's markdown contract surface — 5 passes, capped findings, writes tickets to PLAN." New: "Stack-neutral scaffold for a ruthless principal-engineer code audit — 5 passes (Security · Idioms · Hygiene · Orphans · Doc drift), capped findings, writes tickets to PLAN. Fork and customize per stack."

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown doc change, no runnable tests)
- [x] Ran lint/type-check on changed code — N/A
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:**

No tests apply. The change is a single table row in a markdown skill file.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change; `SPEC.md`: no change; `docs/MIGRATION.md`: no change; `claude/CLAUDE-snippet.md`: no change
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Fixed the `/audit` row in the `/flowtron` info-screen skill to use stack-neutral framing ("Stack-neutral scaffold for a ruthless principal-engineer code audit — 5 passes (Security · Idioms · Hygiene · Orphans · Doc drift)…") instead of the flowtron-centric "flowtron's markdown contract surface" wording. Single-line edit to `claude/skills/flowtron/SKILL.md:50`.

**Archived:** 2026-05-14
