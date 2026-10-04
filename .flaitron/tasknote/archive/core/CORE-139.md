---
title: Generalize "Claude cannot run /clear" wording in SPEC + SKILL
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-132]
---

# CORE-139 | spec-clear-claude-specific

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Replace Claude Code-specific "Claude cannot run `/clear` itself" language in SPEC.md and the ft-task SKILL.md with runtime-neutral phrasing so adopters on other runtimes aren't confused.

## ✅ Acceptance

- [ ] `SPEC.md:499` no longer says "Claude cannot run `/clear` itself" — replaced with "the assistant cannot run `/clear` itself"
- [ ] `claude/skills/ft-task/SKILL.md:146` no longer says "You cannot run `/clear` yourself" — replaced with runtime-neutral phrasing
- [ ] Both edits are minimal and surgically scoped

## 🧩 Subtasks

- [ ] Edit `SPEC.md:499` — "Claude cannot run `/clear` itself" → "the assistant cannot run `/clear` itself"
- [ ] Edit `SKILL.md:146` — "(You cannot run `/clear` yourself.)" → "(The assistant cannot run `/clear` itself.)"
- [ ] Verify no other instances remain via grep
- [ ] Doc-drift sweep and Phase 4 closure

## 🔗 Related

- [[CORE-132]] — audit that surfaced Finding #4.2 (model & assistant assumptions pass)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The wording is factually Claude Code-specific; flowtron targets multiple assistant runtimes. A simple s/Claude/the assistant/ at both sites removes the assumption without adding noise.

- [x] Read relevant source files
- [x] **Archive skim** — `CORE-132.md` is the direct antecedent; Finding #4.2 is the canonical source. No earlier tasknote touched these lines. Archive skim complete.
- [x] **Drift check** — `SPEC.md:499` still reads "Claude cannot run `/clear` itself"; `SKILL.md:146` still reads "(You cannot run `/clear` yourself.)". Both match the task description. No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Two sites in scope (not just one):

1. `SPEC.md:499`: `Claude cannot run \`/clear\` itself; this is for the user to paste in a fresh context.`
2. `claude/skills/ft-task/SKILL.md:146`: `(You cannot run \`/clear\` yourself.)`

Chosen approach: **generalize to "the assistant"** (option 1 from the task description) — cleaner than adding a parenthetical note, and consistent across both sites. No functional behavior change; prose-only.

No clarifications needed. Explicit assumptions:
- Both sites receive the same phrasing approach ("the assistant cannot run `/clear` itself").
- The SKILL.md edit keeps the surrounding parenthetical structure intact.
- No other files in scope (grep confirmed only two hits plus PLAN.md and archive).

✅ Phase 1 Discovery complete (no clarifications needed); entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — doc-only; no code pattern needed. Simple in-place prose substitution.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (prose-only change)

**Implementation Notes:**

- `SPEC.md:499`: `Claude cannot run \`/clear\` itself` → `The assistant cannot run \`/clear\` itself`
- `claude/skills/ft-task/SKILL.md:146`: `(You cannot run \`/clear\` yourself.)` → `(The assistant cannot run \`/clear\` itself.)`
- Verified via grep: no remaining Claude-specific "cannot run /clear" wording in production files

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A

**Testing Notes:** Prose-only change. Grep confirms both target strings replaced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md` updated (the changed file itself); all other AI-referenced docs unchanged
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Replaced Claude Code-specific "Claude cannot run `/clear` itself" wording with runtime-neutral "the assistant cannot run `/clear` itself" at two sites: `SPEC.md:499` and `claude/skills/ft-task/SKILL.md:146`. Two-line doc patch; no functional change.

**Archived:** 2026-05-22
