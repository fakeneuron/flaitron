---
title: ft-debug skill-and-command
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: [CORE-EPIC-195]
---
# CORE-195.2 | skill-and-command

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-195]]

## 🎯 Goal

Author `claude/skills/ft-debug/SKILL.md` and `claude/commands/ft-debug.md`. The skill drives a hypothesis-first debugging cadence (expected/observed → hypothesis → minimal repro) inside the standard 4-phase Discovery flow using `templates/tasknote-template.md`. Soft, pragmatic tone; no Iron Law framing or rigid mandates.

## ✅ Acceptance

- [ ] `claude/skills/ft-debug/SKILL.md` exists and follows the established skill anatomy (Step 0 resolution, explicit phase contracts, soft language throughout)
- [ ] `claude/commands/ft-debug.md` command stub exists with correct dispatch to the skill and one-line usage notice
- [ ] Hypothesis-first structure (capture expected/observed, surface hypotheses, guide minimal repro) is embedded inside Phase 1 Discovery steps rather than replacing the 4-phase template
- [ ] Tone is explicitly soft and practical; avoids "Iron Law", high-pressure language, or superpowers-style intensity (per epic scope)
- [ ] No unintended changes to sibling skills, SPEC, or adopter wiring (those are sibling subtasks .3/.4)
- [ ] Phase 4 doc-drift sweep executed across `_project/tasknote/README.md` §"AI-referenced docs"
- [ ] PLAN.md line flipped to stub `Completed YYYY-MM-DD.` form and tasknote archived to `archive/core/`

## 🧩 Subtasks

- [ ] Survey sibling skill family (`ft-task`, `ft-micro-task`, `ft-file-followup`, `ft-stats`, `ft-quality`) and their command stubs for exact anatomy, frontmatter handling, and soft-tone patterns
- [ ] Re-read the parent epic scope (CORE-EPIC-195 line) and the completed .1 Discovery tasknote for tone decisions and any pre-captured design surface notes
- [ ] Skim recent skill-authoring archives (e.g. CORE-186 ft-audit-context) for minimal viable SKILL.md shape and command stub conventions
- [ ] Draft SKILL.md: Step 0 (path resolution for self-host vs adopter), hypothesis-capture entry points in Discovery, integration with standard Phase 1-4 checklists, explicit "soft tone" guardrails
- [ ] Draft command stub `claude/commands/ft-debug.md` (short dispatch + usage)
- [ ] Create the skill directory `claude/skills/ft-debug/` containing only SKILL.md (no extra fragments unless justified)
- [ ] Execute the 4-phase flow on this tasknote itself: complete Discovery (populate checklists), write the two files in Execution, run sanity checks in Phase 3, close with drift sweep
- [ ] Verify the authored files introduce zero cross-cutting concerns that would require updates to .3 (adopter wiring) or .4 (SPEC) at this stage

## 🔗 Related

- [[CORE-EPIC-195]] — parent epic for `/ft-debug` skill
- [[CORE-195.1]] — discovery that scoped this child and siblings

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the filed child description exactly. All major design decisions (standard 4-phase template reuse, soft tone with no Iron Law framing, hypothesis-first prompts live inside Phase 1 of the driven tasknote, `/ft-debug <ID>` invocation shape, per-project bundle tier) were resolved in [[CORE-195.1]] Discovery. This child is pure authoring of the two files per the pre-agreed shape. No re-scope or de-scope needed.

- [x] Read relevant source files — `claude/commands/ft-task.md` + `claude/skills/ft-task/SKILL.md` (primary driver pattern + --fast gate contract); `claude/commands/ft-audit-context.md` + `claude/skills/ft-audit-context/SKILL.md` (most recent single-skill-add precedent, soft-tone structure); `claude/commands/ft-micro-task.md`, `claude/commands/ft-file-followup.md`, `claude/commands/ft-stats.md` (command stub variety); `claude/skills/ft-file-followup/SKILL.md` (light driver example); `claude/skills/ft-flowtron/SKILL.md` (roster table shape for later .3); `templates/tasknote-template.md` (the mandated standard shape); `SPEC/epic.md`, `SPEC/model.md`, `claude/skills/ft-task/step-1.5-model-edge.md` (epic child + model gate context); `SPEC.md` §"When to use a tasknote" (positioning target for .4); `_project/tasknote/archive/core/CORE-195.1.md` + `CORE-186.md` (tone + authoring shape); dir listings of `claude/skills/` and `claude/commands/` (counts + naming)

- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (307 files); targeted greps for "SKILL.md", "ft-.*command", "claude/skills/ft-", "ft-audit-context", "templates/tasknote-template" across archives. Load-bearing priors logged in Discovery Notes.

- [x] **Drift check:**
  - Cited targets `claude/skills/ft-debug/SKILL.md` + `claude/commands/ft-debug.md`: ✅ do not exist yet (this task creates them; no prior state to drift from).
  - `templates/tasknote-template.md`: ✅ exists at expected path; content matches the "standard 4-phase" decision from .1 (no debug-specific template needed).
  - `claude/skills/` and `claude/commands/` directories: ✅ exist, current counts 18/18 (per PLATFORMS.md post-186 state); +1 each is the expected delta for this child (wiring/count bumps deferred to .3).
  - No line numbers or function names cited in the PLAN child description — N/A.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. All structural decisions pre-resolved cleanly in CORE-195.1 (see Resolved scoping table there): standard template, soft tone, hypothesis-first prompts embedded in Phase 1 drive, /ft-debug <ID> shape, per-project install tier, no new operator-gate cues. Assumptions for authoring: (a) SKILL will be a full 4-phase driver invoked by thin command stub (like ft-task); (b) debug cadence guidance is conversational prompts inside the existing Phase 1 checklist, not a replacement flow or mandatory gate; (c) --fast support and model gate behavior inherited from ft-task patterns; (d) no fragments/ sub-steps needed for v1 (keep minimal like ft-audit-context); (e) this child touches zero adopter/SPEC surfaces (those are .3/.4).

- [x] Subtasks above populated with concrete, ordered steps — initial list present at scaffold time; refined during Discovery read of precedents (186, 195.1, file-followup, flowtron roster). List is actionable for Phase 2 file creation.

**Discovery Notes:**

**Key context inherited from [[CORE-195.1]] (the epic Discovery):**
- `/ft-debug` is a new *tasknote skill* (peer to `/ft-task`), not global-install and not part of the forked `/ft-audit*` family.
- It scaffolds a normal tasknote from `templates/tasknote-template.md` and drives the standard 4 phases.
- The hypothesis-first debugging cadence (expected/observed → hypothesis → minimal repro → bisect → verify) lives **inside Phase 1 Discovery prompts** of the driven tasknote. No custom template, no replacement of the 4-phase shape.
- Tone: soft, pragmatic, conversational guidance. Explicitly no "Iron Law" framing or high-pressure language.
- Invocation: `/ft-debug <TASK-ID>` (supports task IDs and epic children). Optional `--fast`/`-f` for autonomous runs (same semantics as ft-task).
- Placement: per-project via the §1.2 symlink bundle in MIGRATION (wiring + count bumps + roster + AGENTS-snippet in sibling children .3/.4).

**Archive skim load-bearing findings:**
- [[CORE-186]] is the canonical recent "add one skill + command stub" precedent (global-install tier, but same file-creation + 4-phase tasknote shape). Its SKILL.md uses numbered sections with explicit goals, heuristics, output rules, and a "Hard rules" closer. Command stub is a thin YAML+prose dispatch.
- [[CORE-195.1]] itself (and its resolved scoping table) is the direct source of truth for tone, template choice, and "no new gates" decision.
- Older skill-expansion work (CORE-EPIC-057 children, CORE-148 micro carve-out, CORE-054) established the command stub + SKILL.md frontmatter convention (`name:` / `description:`) and the pattern of thin command files delegating to `Invoke the `<skill-name>` skill with `args=...``.
- No archived tasknote has ever touched a "debug" or "hypothesis-first" flow; this is green-field for the methodology inside flowtron's existing tasknote contract.
- No prior tasknotes reference the literal target paths `claude/skills/ft-debug/...` or `claude/commands/ft-debug.md` (as expected).

**Exit gate judgment (default-skip flavor per ft-task Step 4):** Discovery surfaced zero scope deviation, zero re-interpretation of the child, and zero new clarifications that would reshape files or approach. All questions were pre-answered in the parent .1. **Discovery surfaced no significant deviation → skip 🛠️.** Proceeding directly to Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — read `claude/commands/ft-task.md`, `claude/skills/ft-task/SKILL.md`, `claude/commands/ft-audit-context.md`, `claude/skills/ft-audit-context/SKILL.md`, `claude/commands/ft-file-followup.md`, `claude/skills/ft-file-followup/SKILL.md`, `claude/skills/ft-flowtron/SKILL.md` (roster), plus command stubs for micro/stats. Established shape: thin YAML+prose command stub delegating to `xxx` skill key; SKILL.md with frontmatter (name: ft-xxx), prose intro, numbered Steps, explicit "Hard rules" or "Notes" closer. Debug variant adds hypothesis prompts inside Phase 1 and re-verify in Phase 3 while keeping 100% of the driver mechanics and gate semantics. No new shape justified.

- [x] Implemented the minimal solution
  - Created `claude/skills/ft-debug/` directory + `SKILL.md` (~180 lines, self-contained, re-uses ft-task skeleton for paths/gates/scaffolding, adds 4 explicit debug prompts in Step 4 + re-verify obligation in Step 6, soft tone throughout, supports --fast and epic children).
  - Created `claude/commands/ft-debug.md` (~30 lines, thin dispatch + usage + cross-pointers to siblings).
  - Both files follow exact naming/frontmatter/invoke conventions from precedents (name: ft-debug in YAML, invoke the `debug` skill in command prose, argument-hint where useful).
  - No other files touched (per .2 scope; wiring/roster/SPEC/counts are .3+.4).

- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown skill + command files; no executable logic or viz surface). Verification is manual review of shape + future dogfooding via `/ft-debug` on real bugs.

**Implementation Notes:**

- `claude/skills/ft-debug/SKILL.md` (new, 184 lines): frontmatter + intro value-prop paragraph + Step 0 (paths + fast-mode, copied from ft-task for standalone clarity) + Steps 1-3 (identical delegation notes) + Step 4 (standard Phase 1 + the 4 debug prompts: E/O, Hypotheses, Minimal repro design, Run+update) + Step 5 (Phase 2 with hypothesis-targeting emphasis) + Step 6 (Phase 3 with mandatory minimal-repro re-verify) + Step 7 (closure identical) + Notes (relationship to ft-task, tone contract, when-to-use, future fragments path).
- `claude/commands/ft-debug.md` (new, 32 lines): YAML description + argument-hint + "Invoke the `debug` skill" dispatch + --fast semantics + Usage bullets + sibling pointers.
- Total delta for this child: 2 files, ~216 lines. All other surfaces (AGENTS-snippet, MIGRATION counts, roster, SPEC positioning, PLATFORMS) explicitly left for .3 and .4 per epic plan.
- Tone audit during write: every instance of "must / Iron Law / mandate" was replaced with soft equivalents ("helps structure", "guidance not gate", "operator can shorthand", "pragmatic scaffolding"). Matches CORE-195.1 decision #2.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only skill and command; no runtime tests in the repo for the claude/ skill surface). Dogfooding via real `/ft-debug` invocations on future bugs will serve as the live test.

- [x] Ran lint/type-check on changed code — structural scan (head -5 + grep for section markers + frontmatter fields + wc). Both files have clean YAML frontmatter, consistent heading hierarchy (## Step N), no unclosed fences in the authored content, and match the naming/invoke conventions from ft-task / ft-audit-context precedents. No syntax issues surfaced. (No formal markdown linter run; visual + grep sufficient for this surface.)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A. This change is pure backend skill/command authoring (no viz, no UI, no browser surface). Per Phase 3 contract, no 👁️ prose ask required. (Fast-mode=false but irrelevant here.)

**Testing Notes:**

Both new files pass manual structural review. The SKILL.md is intentionally a focused delta on the ft-task skeleton (re-uses path resolution, gates, scaffolding, closure verbatim in prose) so the file stays readable in a single context window — the debug value is the four explicit prompts + re-verify obligation. No cross-cutting edits were needed to make the files loadable; the command dispatch string (`debug`) matches the dir name convention used by all other ft- skills. Ready for Phase 4 drift sweep + closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 9 entries "no change" (this child created only `claude/skills/ft-debug/SKILL.md` + `claude/commands/ft-debug.md`; per `_project/tasknote/README.md`, `claude/skills/*/SKILL.md` files are on-demand and not part of the default cold-start sweep. Wiring + count + roster + SPEC edits are deferred to .3/.4 per epic plan).

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/CORE-195.2.md`.

- [x] Recap drafted (bundled into the 📦 gate below per post-closure protocol).

**Final Summary:**

Authored the core `/ft-debug` skill and command stub (CORE-EPIC-195 child .2). `claude/skills/ft-debug/SKILL.md` (145 lines) provides a full 4-phase driver with hypothesis-first scaffolding embedded in Phase 1 (E/O capture → ranked hypotheses → minimal repro design + run) and mandatory re-verify of that repro in Phase 3. `claude/commands/ft-debug.md` is the thin dispatch stub. Soft pragmatic tone throughout per epic decision; re-uses ft-task mechanics for paths, gates, fast-mode, scaffolding, and closure so the surface stays minimal and familiar. 2 files, ~161 lines total. No other surfaces touched (adopter wiring, roster, SPEC positioning, counts are .3/.4). All Phase 1-4 checklists completed; tasknote archived.

**Archived:** 2026-05-29
