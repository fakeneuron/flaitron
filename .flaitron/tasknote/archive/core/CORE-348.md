---
title: suggested-id-filers
status: completed
tags: []
created: 2026-07-08
due:
related-tasks: []
---

# CORE-348 | suggested-id-filers

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Let `/ft-file-followup` and `/ft-starter-task` handle missing task IDs by suggesting the next available ID instead of requiring the operator to provide one up front.

## ✅ Acceptance

- [x] Both filing skills define a deterministic next-ID suggestion path when `args` is missing.
- [x] The suggestion path checks PLAN.md plus active and archived tasknotes so it does not propose a reused ID.
- [x] Claude command stubs no longer instruct the command layer to ask for an ID before invoking the skill.
- [x] Documentation or onboarding surfaces that describe the filing skills stay accurate after the optional-ID behavior change.

## 🧩 Subtasks

- [x] Update `claude/skills/ft-file-followup/SKILL.md` missing-args/pre-flight flow.
- [x] Update `claude/skills/ft-starter-task/SKILL.md` missing-args/pre-flight flow in parallel.
- [x] Update `claude/commands/ft-file-followup.md` and `claude/commands/ft-starter-task.md` to invoke skills even with empty arguments.
- [x] Check adopter-facing workflow text for stale `<ID>`-required wording and make only necessary wording updates.
- [x] Verify by re-reading the edited skill flows and running targeted text checks.

## 🔗 Related

- None.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN entry is current and narrowly targets two filing skills whose current instructions both hard-stop on missing `args`.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN entry: `.flowtron/PLAN.md` `## Medium` line for `CORE-348` is open, tagged `[medium]`, shortname `suggested-id-filers`.
- Relevant live files read: `claude/skills/ft-file-followup/SKILL.md`, `claude/skills/ft-starter-task/SKILL.md`, the two Codex wrappers, `claude/commands/ft-file-followup.md`, `claude/commands/ft-starter-task.md`, `SPEC/tasknote-selection.md`, `SPEC/starter.md`, and the adopter snippets.
- Archive skim: `CORE-057.5` established `/ft-file-followup` as a lighter filing-only peer to starter and recorded the no-extra-artifact contract. `CORE-141` touched both filing skills in parallel for model-token wording, confirming they should stay aligned when the same filing prompt behavior changes.
- Drift check: both skill files still say missing or invalid `args` should stop and ask for a valid task ID. Both command stubs also say empty arguments should ask for a task ID before invoking the skill. That matches the filed root cause.
- Clarifications: No clarifications needed. Assumption: "suggest the next available task ID" means propose, then ask the operator to confirm or override before filing; it does not mean silently allocate and write a PLAN row with no ID review.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: `/ft-sidequest` already uses optional ID syntax and auto-allocation wording in its command stub; `/ft-epic-discovery` already scans PLAN/archive for the next available epic suffix. The filing-skill change extends those existing shapes rather than adding tooling.
- Updated `claude/skills/ft-file-followup/SKILL.md` and `claude/skills/ft-starter-task/SKILL.md` so missing `args` now enters a Suggested ID flow: infer/ask area, scan `.flowtron/PLAN.md`, `.flowtron/tasknote/`, `.flowtron/tasknote/archive/`, and `.flowtron/sidequest/`, propose the next unused integer for that prefix, and keep the ID reviewable before any write.
- Kept invalid explicit IDs as a stop-and-ask path. The new behavior is for omitted IDs, not malformed ones.
- Added a final-ID validation guard: if the user overrides the suggested ID during input collection, rerun the pre-flight uniqueness checks before drafting or writing.
- Updated `claude/commands/ft-file-followup.md` and `claude/commands/ft-starter-task.md` to use `argument-hint: [TASK-ID]`, invoke their skills even with empty arguments, and describe suggested-ID behavior.
- Refreshed the authoritative and onboarding references that advertise the filing commands: `SPEC/tasknote-selection.md`, `SPEC/starter.md`, `claude/AGENTS-snippet.md`, `templates/tasknote-README.md`, sibling command cross-reference lines, and the relevant `/ft-epic-discovery` comparison text.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Targeted test suite: N/A; changes are markdown skill/command/SPEC/snippet text only, with no executable parser or frontend files changed.
- Lint/type-check equivalent: `git diff --check` passed.
- Targeted stale-text searches confirmed the two filing command stubs no longer advertise mandatory `<TASK-ID>` argument hints or "ask for task ID before invoking" behavior. Remaining mandatory-ID hits are for runner/worktree/debug skills, or sidequest promotion where a parked ID is already known.
- Frontend visual confirmation: N/A; no frontend files changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-file-followup` and `/ft-starter-task` now accept omitted IDs by suggesting the next available task ID for review instead of stopping at the command layer.

Technical detail: both filing skills now define the suggested-ID flow, including area selection, PLAN/tasknote/archive/sidequest collision scanning, final-ID validation after user overrides, and no-write-until-review semantics. Claude command stubs use `[TASK-ID]` and invoke the skills with empty arguments; SPEC/tasknote-selection, SPEC/starter, the Claude adopter snippet, the tasknote README template, sibling command cross-references, and `/ft-epic-discovery` comparison text now advertise the optional-ID behavior. Validation was `git diff --check` plus targeted stale-text searches; no executable or frontend tests were applicable.

**Doc-drift sweep:**

- `README.md`: no change; it lists skill names only, not argument grammar for the two filers.
- `SPEC.md`: updated through `SPEC/tasknote-selection.md` and `SPEC/starter.md` lazy modules; root SPEC points to those canonical modules for this behavior.
- `docs/MIGRATION.md`: no change; it lists wired skill inventory and smoke checks, not filing command argument grammar.
- `claude/AGENTS-snippet.md`: updated to show `/ft-starter-task [ID]` and `/ft-file-followup [ID]` with suggested-ID wording.
- `codex/AGENTS-snippet.md`: no change; it delegates the workflow block to `claude/AGENTS-snippet.md` and only owns Codex symlink wiring.
- `docs/CONVENTIONS.md`: no change; commit conventions unaffected.
- `CONTRIBUTING.md`: no change; contribution model unaffected.
- `SECURITY.md`: no change; prompt-injection/supply-chain threat model unaffected.
- `docs/AGENT-NEUTRALITY.md`: no change; ledger lists canonical skill names only.
- `docs/PLATFORMS.md`: no change; platform inventory and install policy unaffected.
- `claude/CAPABILITIES.md`: no change; capability triggers unaffected.
- `docs/AGENT-COMPAT.md`: no change; compatibility matrix unaffected.

**Archived:** 2026-07-08
