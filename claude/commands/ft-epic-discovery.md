---
description: File a new flaitron epic and drive its `.1` Discovery tasknote in one motion — files parent + `.1` + `.N` audit PLAN lines, scaffolds `.1` with tailored pre-fill, then drives the full 4-phase Discovery (deliverable = filed implementation children). Optional `--deep` arg adds a `constitution → specify → clarify` pre-pass for high-uncertainty epics.
argument-hint: '[--deep]'
---

Invoke the `ft-epic-discovery` skill. The skill verifies cwd is a flaitron-using project, parses `$ARGUMENTS` (empty | `--deep`), collects inputs (area + shortname + priority + model + implementation-child count M) via AskUserQuestion, scans `.flaitron/PLAN.md` + archive for the next available `<AREA>-EPIC-<N>` numeric suffix, files three PLAN.md lines (parent epic + `.1` Discovery + `.N` audit placeholder) under the chosen priority, scaffolds the `.1` tasknote with tailored Goal / Acceptance / Subtasks, then drives the full 4-phase tasknote inline through closure (Phase 2 deliverable = filed implementation children `.2..(M+1)`).

Usage:

- `/ft-epic-discovery` — default flow; all inputs collected via AskUserQuestion.
- `/ft-epic-discovery --deep` — adds a three-stage pre-pass (constitution → specify → clarify) before Phase 1 Discovery, with AskUserQuestion review-and-confirm gates between stages. For high-uncertainty epics where upfront staging is worth the extra interruption.

For starting an existing PLAN.md entry, use `/ft-task <TASK-ID>`. For the closing audit subtask of an epic, use `/ft-close-epic` (sibling skill that scaffolds + drives the audit `.N` tasknote and prompts to flip the parent epic line). For parking an idea or quick fix mid-session, use `/ft-file-followup --park [TASK-ID]` (lightest persistent filing; priority flags in `SPEC/tasknote-selection.md`). For mid-flow follow-up filings, use `/ft-file-followup [TASK-ID]` (lightweight, no tasknote artifact; `--starter` for a starter tasknote with single-task scope and rich AI-captured context). For micro tasks, use `/ft-micro-task <TASK-ID>`. For bootstrapping a fresh repo with flaitron, use `/ft-new-project`.
