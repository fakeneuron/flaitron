---
title: proactive-starter-on-handoff
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-027, CORE-051, CORE-057.3]
---

# CORE-173 | proactive-starter-on-handoff

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-027]] [[CORE-051]] [[CORE-057.3]]

## 🎯 Goal

Add a cross-session AI-handoff trigger to flowtron's "file a starter" guidance so Claude proactively invokes `/ft-starter-task` (rather than burying the suggestion in prose) when rich mid-conversation context would be lost across a `/clear` boundary.

## ✅ Acceptance

- [ ] `SPEC.md` §"File a starter (`/ft-starter-task <ID>`) when:" carries a new bullet covering the cross-session AI-handoff trigger, ≤50w
- [ ] `claude/skills/ft-starter-task/SKILL.md` §Notes carries proactive-on-handoff behavioral guidance (invoke vs. suggest) citing the new SPEC bullet
- [ ] `claude/skills/ft-epic-discovery/SKILL.md` §Notes "Compare with `/ft-starter-task`" line is expanded with the cross-session case
- [ ] `SPEC/starter.md` unchanged (lifecycle module, not trigger list — per cite-don't-restate)
- [ ] Sibling skills (`/ft-task`, `/ft-micro-task`, `/ft-file-followup`) unchanged

## 🧩 Subtasks

- [ ] Pattern survey on the SPEC trigger list and existing Notes "Routing" / "Compare with" shapes
- [ ] Draft + apply the SPEC.md bullet (word-count to ≤50w)
- [ ] Draft + apply the ft-starter-task Notes expansion
- [ ] Draft + apply the ft-epic-discovery Notes cross-ref expansion
- [ ] Markdown mental-pass on the three edits
- [ ] Phase 4 closure: doc-drift sweep + flip PLAN line + archive

## 🔗 Related

- [[CORE-027]] — starter tasknotes (original spec for the artifact)
- [[CORE-051]] — starter-task SKILL cite-don't-restate (most recent starter-skill touchpoint)
- [[CORE-057.3]] — /ft-epic-discovery skill (cross-ref target for the expanded "Compare with" line)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The behavioral gap is real and observed (starter captured during a stockshock-side `/ft-epic-discovery` invocation where prior-chat context was lost on `/clear`). The fix is a small routing/behavior nudge — surface the cross-session-handoff trigger explicitly so Claude defaults to invoking `/ft-starter-task` rather than burying the suggestion in prose.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Drift check (4 cited files):** All confirmed at HEAD —
  - `SPEC.md` §"File a starter (`/ft-starter-task <ID>`) when:" — present at lines 519-525, four trigger bullets; the closest existing bullet is "The captured context would be lost or would bloat the PLAN.md long description if recorded as inline prose" but its surrounding clause is about inline-prose loss, not session-boundary loss. The cross-session trigger is genuinely absent.
  - `SPEC/starter.md` Lifecycle §1 (Filing) — present; describes the lifecycle stage, not the triggers (so the trigger lives in SPEC.md per cite-don't-restate).
  - `claude/skills/ft-starter-task/SKILL.md` §Notes Routing paragraph — present at lines 94-97, two bullets; second bullet is the "Routing" bullet that needs the proactive-on-handoff expansion.
  - `claude/skills/ft-epic-discovery/SKILL.md` §Notes "Compare with `/ft-starter-task`" — present at line 251.
- **Archive skim findings:**
  - CORE-027 (starter tasknotes origin spec, 2026-05-03) — the artifact itself was introduced here; current SPEC sections trace back to it.
  - CORE-051 (starter-task SKILL cite-don't-restate, 2026-05-09) — most recent touch on `ft-starter-task/SKILL.md`; established the cite-don't-restate convention for the skill (SPEC owns triggers; skill cites them). Aligns with adopted lean Q1.
  - CORE-057.3 (/ft-epic-discovery skill, 2026-05-09) — original `ft-epic-discovery` skill filing; established the "Compare with /ft-starter-task" line.
  - No prior tasknotes touch the cross-session-handoff scenario specifically — this is new ground.
- **User decisions (from AskUserQuestion):** Adopted all three of the starter's leans —
  1. Both SPEC and skill files (with cite-don't-restate: SPEC owns the trigger; skill cites + adds behavioral guidance).
  2. No touch to sibling skills (`/ft-task`, `/ft-micro-task`, `/ft-file-followup`) — `/ft-starter-task` is the destination skill; cluttering siblings adds drift surface for marginal clarity.
  3. Mechanical: keep new SPEC bullet under 50w.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC trigger list uses short bullets (≤50w each); ft-starter-task §Notes uses bold-prefix bullets (`**Routing:**`); ft-epic-discovery §Notes "Compare with" lines are paragraphs with `**bold** —` lead. New shapes mirror these.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Three surgical doc edits applied:

1. **`SPEC.md` §"File a starter (`/ft-starter-task <ID>`) when:"** — added a 5th trigger bullet (40 words; under 50w target) covering rich mid-conversation context that won't be consumed in this session.
2. **`claude/skills/ft-starter-task/SKILL.md` §Notes** — added a third Notes bullet "Proactive invocation on cross-session handoff" with the behavioral nudge (invoke vs. suggest) + cite to the new SPEC trigger.
3. **`claude/skills/ft-epic-discovery/SKILL.md` §Notes "Compare with `/ft-starter-task`"** — appended a "Cross-session handoff" clause covering the epic-brief-survives-`/clear` workflow, with a cross-ref to the new ft-starter-task Notes bullet.

No code changes; no test surface. Cite-don't-restate preserved: SPEC owns the trigger, skill files cite it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only edits to one SPEC and two SKILL files. No test suite, no lint surface, no frontend changes. Markdown mental-pass confirmed: SPEC bullet 40w (under 50w target); skill bullets follow existing bold-prefix shape; em-dash separators consistent; no trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (5th trigger bullet added to §"File a starter when" — this task). Other 8 AI-referenced docs: no change.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/CORE-173.md`
- [x] Recap drafted

**Final Summary:**

Added a cross-session AI-handoff trigger to flowtron's "file a starter" guidance so Claude proactively invokes `/ft-starter-task` rather than burying epic briefs / design conclusions / multi-step plans in parenthetical "(run `/ft-X` next and paste this)" suggestions that get lost on `/clear`. Three surgical edits across one SPEC (40w bullet added) and two SKILL files (`ft-starter-task` Notes gets a "Proactive invocation on cross-session handoff" bullet citing the new SPEC trigger; `ft-epic-discovery` Notes "Compare with /ft-starter-task" line gets a cross-session-handoff clause). Cite-don't-restate preserved.

**Archived:** 2026-05-24
