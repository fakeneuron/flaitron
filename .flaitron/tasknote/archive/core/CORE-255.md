---
title: next-task-cue-emoji-hardcoded
status: completed
created: 2026-06-01
related-tasks: ["CORE-EPIC-254"]
---

# CORE-255 | next-task-cue-emoji-hardcoded

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]]

## 🎯 Goal

Update the post-closure copy-paste instruction ("Clear your session, then use 🔧 ...") in the five skills named in the PLAN line (ft-task, ft-epic-discovery, ft-close-epic, ft-micro-task, ft-worktree-start) to emit the model-appropriate emoji (🔧 for [light] next-tasks, 🧠 for [heavy]) instead of hardcoding the wrench, aligning the executable SKILL guidance with the carve-out already stated at SPEC.md:453.

## ✅ Acceptance

- [ ] The Copy-paste helper bullets (and worktree handoff block) in all five SKILL.md files now instruct the assistant to use the emoji that matches the primary label printed on the chosen next-task candidate line (or the target task's own [model] for worktree-start), rather than a literal 🔧 glyph.
- [ ] Phrasing is consistent across the five files and references the SPEC §"Post-closure protocol" contract.
- [ ] Command files and any prose examples that show the copy-paste line are either updated or explicitly noted as illustrative (the stable pattern is the emoji on the candidate line + matching cue).
- [ ] Archive skim + drift check complete; no prior decisions contradict the alignment.
- [ ] Task closes with a clean doc-only diff (no behavior change to the 4-phase machinery itself).

## 🧩 Subtasks

- [ ] Read the five target SKILL.md files (focus on their Step 6 / Step 10 / Step 5 post-closure "Copy-paste helper" sections) + SPEC.md §"Post-closure protocol" + gates.md
- [ ] Archive skim of `_project/tasknote/archive/core/` for any prior tasknotes touching the claude/skills/ft-*/SKILL.md files or the post-closure copy-paste surface
- [ ] Drift check on the cited location SPEC.md:453 (confirm the "(or 🧠 for heavy)" carve-out is still present and accurate)
- [ ] Clarifying questions on edge cases (legacy lines without [model]; how to pick emoji when multiple next candidates are offered; worktree-start case where the ID is the *current* task not a "next")
- [ ] Draft the precise replacement wording for each of the five Copy-paste helper bullets
- [ ] Apply the five edits (one per SKILL)
- [ ] Sweep claude/commands/*.md and docs/ for any hardcoded example strings that should be loosened
- [ ] Phase 3 prose mental-pass + any markdown hygiene
- [ ] Phase 4: doc-drift sweep, PLAN.md flip to stub, git mv to archive/core/, recap

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic that delivered the operator-cue vocabulary and cross-agent reliability work; this is the residual "hardcoded wrench in copy-paste" item.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the filed residual from [[CORE-EPIC-254]]. The spec text at the cited location already carries the carve-out; the five SKILLs that emit the copy-paste line simply have not been updated to the variable form yet. Pure mechanical alignment, no scope change, no re-interpretation needed.

- [x] Read relevant source files

  The five SKILL files whose Copy-paste helper bullets (or handoff block) contain the hardcoded 🔧:
  - `claude/skills/ft-task/SKILL.md:151`
  - `claude/skills/ft-epic-discovery/SKILL.md:237`
  - `claude/skills/ft-close-epic/SKILL.md:196`
  - `claude/skills/ft-micro-task/SKILL.md:122`
  - `claude/skills/ft-worktree-start/SKILL.md:140`
  Plus the contract surface `SPEC.md:453` (the parenthetical carve-out) and `SPEC/gates.md` §"Next-task cues".

- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

  `ls _project/tasknote/archive/core/` (recent: CORE-25[0-4]* + EPICs) + targeted `grep -l` for the five skill paths + "copy-paste" + "🔧" + "Clear your session".
  Hits: only the direct siblings CORE-254.1.md, .2.md, .3.md, .4.md.
  Load-bearing findings (detailed in Discovery Notes below): CORE-254.4 (the [light] cue-skill-wiring child) explicitly scoped the consistency sweep to 9 files (5 SKILL + 4 step fragments) and accepted the hardcoded "Clear your session, then use 🔧 ..." phrasing as the target form for the next-task cue. ft-worktree-start was out of .4 scope. The residual was known and filed as CORE-255 at epic closure time. No contradictory design decisions; this task is the planned follow-through.

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

  - SPEC.md:453 still contains the exact carve-out text: `"... use 🔧 /<next-skill> <args>" (or 🧠 for heavy tasks).` — no drift.
  - The five SKILL files and their post-closure Step X sections still exist at the cited relative paths; the "Copy-paste helper" bullets still contain the literal 🔧 strings.
  - PLAN.md line for CORE-255 still lists exactly those five skills.
  - No file renames, no moved emission sites, no change to the "When *printing the list to the user*" rule text that already does the right emoji for candidate lines.
  - Root cause hypothesis (hardcoded prose in the five instruction sites) remains accurate.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** The scope is purely mechanical prose alignment inside five well-scoped bullets. Edge cases are trivial and covered by existing patterns:
  - Legacy PLAN lines without `[model]`: fall back to 🔧 (light) as the documented default for routine work; or read the model at suggestion time the same way the candidate-line code already does.
  - Multiple candidates offered: the copy-paste line is always paired with one concrete chosen next (the "primary" or user-picked one); use *that one's* emoji.
  - ft-worktree-start case: the ID is the *current* task being handed off, not a "next"; read its own PLAN line's [model] (already done for the handoff block) and emit the matching glyph.
  - ft-release delegates its post-closure to the canonical protocol and does not contain a hardcoded copy-paste bullet of its own — correctly omitted from the CORE-255 list.

  Explicit assumptions (matching the .4 precedent):
  - This remains a [light]🔧 doc-only change. No contract edits, no new gates, no behavior in the running machinery.
  - Edits confined to the five SKILL.md "Copy-paste helper" paragraphs (plus any obvious command/ doc examples that duplicate the string for illustration).
  - The stable agent-agnostic pattern ("emoji on the candidate line + matching cue") is already documented in SPEC; we are just making the five instruction sites faithful to it.

- [x] Subtasks above populated with concrete, ordered steps

  The 🧩 Subtasks list in the top spec section was pre-populated at scaffold with a concrete 9-step plan (survey → archive/drift → clarify → draft wording → 5 edits → commands/docs sweep → Phase 3/4). No refinement needed; the list is already ordered and verifiable. (Minor: the "Subtasks above populated" item itself is now satisfied.)

**Discovery Notes:**

**From CORE-254.4 (the wiring child that preceded this residual):**
- Scope for .4 was the 9 files (ft-task + 3 steps, ft-micro + 1 step, epic-discovery, close-epic, release). The consistency sweep for next-task cues normalized the *candidate list printing rule* ("emit only the emoji primary label...") and treated the copy-paste sentence as already correct when it used the (then-hardcoded) 🔧 form.
- ft-worktree-start was never in .4 scope (it was added to the residual list for 255).
- .4 closed with "All existing 🔧/🧠 next-task copy-paste lines already carried the cue glyph; the sweep confirmed uniformity".
- The parenthetical in SPEC was the *aspirational* form; the executable SKILL instructions were left in the pre-variable state.

**Why CORE-255 exists:** User report (via the epic residual) that a [heavy]🧠 next-task suggestion still emits the wrench in the copy-paste line that follows the candidate list. The candidate lines themselves were fixed in .4 (they read the next task's [model]); the following prose sentence was not made dynamic.

**No scope deviation surfaced.** This is exactly the "align the 5 skills" work item that was carved out of .4 and filed separately. Proceed with the filed plan.

**Phase 1→2 exit judgment (default-skip flavor per ft-task SKILL Step 4):** Discovery surfaced zero AskUserQuestion calls and zero scope-reshaping clarifications (only explicit assumptions and confirmation that the filed plan is still exact). This is the textbook "small-clarifications-only or zero asks" skip case. Per SPEC/gates.md: "Routine clarifications skip 🛠️." Record: "Discovery surfaced no significant deviation → skip 🛠️."

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

  Precedent: CORE-254.4's wiring of the other cue glyphs + the "When *printing the list..." rule text (already model-driven) that sits immediately above the copy-paste bullets in the same post-closure sections. The candidate-line emission already reads the next task's full PLAN line (including [model]) and maps to 🔧/🧠. The only missing piece was making the following prose sentence follow the same mapping. No new shape invented.

- [x] Implemented the minimal solution

  Five targeted string replacements in the Copy-paste helper bullets (ft-task, ft-epic-discovery, ft-close-epic, ft-micro-task) + one handoff block (ft-worktree-start) + one descriptive update in its command wrapper. Wording normalizes to "uses the same emoji primary label just printed for the chosen next-task candidate line" + "Typical shape" example that shows the variable case. Total diff: small, surgical, zero contract impact.

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pure prose alignment (no executable surface). Pattern survey + minimal targeted edits complete. No tests applicable. Ready for Phase 3 mental-pass.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

  N/A — pure markdown instruction changes in claude/skills/** and one command description. No executable behavior, no test surface in this repo for skill prose.

- [x] Ran lint/type-check on changed code

  N/A (markdown only; the changed files are not under the viz/ TS project or any linted Python surface). Manual prose review performed: all five bullets now use parallel "same emoji primary label just printed for the chosen..." phrasing; no surrounding text was broken; the worktree handoff addition is a clear follow-on instruction.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

  N/A — no frontend surface touched (claude/ and SPEC/ are not UI code; the viz/ visualizer is a consumer of PLAN.md tags and is unaffected).

**Testing Notes:**

All changes are documentation / instruction text only. The canonical "emoji on candidate line + matching cue" pattern is now faithfully reflected in the emission sites the assistant actually follows at post-closure time. No visual or behavioral surface for the operator to confirm beyond the diff itself. Ready for Phase 4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  All 11 entries: "no change". The edited files (`claude/skills/ft-task/SKILL.md`, `ft-epic-discovery/SKILL.md`, `ft-close-epic/SKILL.md`, `ft-micro-task/SKILL.md`, `ft-worktree-start/SKILL.md`, and `claude/commands/ft-worktree-start.md`) are outside the declared AI-referenced set (they are loaded on-demand by the ft- skills themselves, not cold-start ground truth). Matches the exact finding from CORE-254.4 for its adjacent cue-wiring edits.

- [ ] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [ ] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Archived:** YYYY-MM-DD

