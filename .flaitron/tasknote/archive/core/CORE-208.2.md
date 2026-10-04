---
title: ft-task-epic-copy-paste
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-208]
---
# CORE-208.2 | ft-task-epic-copy-paste

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Update the post-closure copy-paste generators (and nearby model-segment comment) in `claude/skills/ft-task/SKILL.md` + `claude/skills/ft-epic-discovery/SKILL.md` to agent-agnostic `[heavy]🧠` / `[light]🔧` primary-label text with design-vs-mechanical prose and emoji visuals, eliminating all hard-coded `opus|sonnet` examples per CORE-208.1 decisions.

## ✅ Acceptance

- [ ] Hard-coded `/clear then /model <opus|sonnet> ...` copy-paste example strings removed from both files' Step 6 / post-closure protocol sections
- [ ] Replacement guidance instructs the assistant to substitute the actual `[model]` tag from the next task's PLAN.md line (primary labels + 🧠/🔧 emoji visuals + "design vs mechanical" prose preferred)
- [ ] ft-task/SKILL.md:51 grammar comment updated from legacy `(`opus` | `sonnet`)` example for consistency with SPEC/model.md
- [ ] No new or residual specific-model prompt examples remain in the edited post-closure or model-comment sections of the two files
- [ ] Targeted markdown hygiene pass (grammar, indent, wikilinks, em-dashes) on changed sections passes; doc-drift sweep at Phase 4 confirms only the two SKILL.md files changed among AI-referenced surfaces

## 🧩 Subtasks

- [ ] Pattern survey of post-closure protocol text (Step 6) + model guidance in both target SKILL.md files; also cross-check ft-micro-task for scope boundary (out of .2)
- [ ] Edit ft-task/SKILL.md: update copy-paste generator at Step 6 + the Step 1 model-segment comment example
- [ ] Edit ft-epic-discovery/SKILL.md: update the copy-paste generator text at its Step 10
- [ ] Phase 3: markdown mental-pass + light verification on the two edited files (no executable code)
- [ ] Phase 4: doc-drift sweep across `_project/tasknote/README.md` AI-referenced docs, PLAN.md stub flip + move to Completed, tasknote archive move, recap

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic (`heavy-light-suggestions`); all children deliberately `[light] 🔧`-scoped for mechanical hygiene work
- [[CORE-208.1]] — epic Discovery (2026-05-26) that performed the surface inventory and locked the `[heavy]🧠`/`[light]🔧` + design-vs-mechanical terminology decisions

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct continuation of CORE-EPIC-208 after .1 Discovery closed today (2026-05-26). Scope is mechanical, pre-inventoried exact emission sites (ft-task:51/148 + ft-epic-discovery:236), terminology and visuals locked in 208.1 (primary `[heavy]🧠`/`[light]🔧` labels + "design vs mechanical" prose + emoji visuals; eliminate hard `opus|sonnet` in post-closure UX text). Matches the deliberate `[light] 🔧` scoping for all children. No re-scope or de-scope; zero open questions.

- [x] Read relevant source files
- [x] **Archive skim** — ls _project/tasknote/archive/core/ (80+ entries) + grep -l for the two in-scope paths hit 25 files. Load-bearing: CORE-208.1.md (exact inventory of the three strings + locked decisions + "all children light-scoped"), CORE-189.md (prior post-closure grammar widening to `/<next-skill> <args>` shape that left the model example untouched — the precise residual), CORE-205.1/207 (adjacent agent-neutrality + model-vocab work; did not touch these UX emission sites). Older hits incidental citations of the central skills. No file moves, regressions, or hardlink notes relevant to the copy-paste generators.
- [x] **Drift check** — exact lines cited in 208.1 (ft-task/SKILL.md:51 `(`opus` | `sonnet`)` comment and :148 post-closure generator; ft-epic-discovery/SKILL.md:236 identical generator) still contain the hard-coded strings on current HEAD (re-verified via read_file + grep immediately before any edit). No path, line, or content drift since .1.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  **No clarifications needed.**

  Explicit assumptions: (1) The two post-closure generator sites + the one nearby grammar comment in ft-task/SKILL.md are the complete and only changes required for .2 (ft-micro-task, step-1.5-model-edge.md fragments, audit-family example grammars, and global CLAUDE.md are explicitly out of scope for this child per 208.1 inventory + the PLAN.md cohort lines). (2) Replacement text will direct the AI to emit the *actual* `[model]` token from the suggested next task's PLAN line (e.g. `[light]🔧`, `[heavy]🧠`, or a specific like `[grok]`), accompanied by brief "design vs mechanical" prose and the 🧠/🔧 emoji visuals when primary labels are used. (3) Pure documentation/UX-text hygiene; no runtime behavior change.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive & Drift (Phase 1, 2026-05-26):** See ticked items above for full skim/drift record. CORE-208.1 is the authoritative predecessor record for the exact strings and the approved replacement policy. No load-bearing surprises from older archives. All cited paths and line numbers stable.

**Relevance:** Proceed with zero deviation from the filed scope. This is the first mechanical implementation child of the epic; all decisions pre-locked.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation (pre-scoped exact sites + terminology from .1; pure mechanical string hygiene on two files; zero asks or scope shifts) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — The direct precedent is CORE-189 (targeted prose edit to the exact copy-paste example string in ft-task + ft-micro SKILL files while preserving the "substitute..." nudge and surrounding contract text). No new shape or abstraction; this change is the symmetric continuation for the model-token example itself after the 205/206/207 terminology work. ft-epic-discovery carries the identical legacy string (forked at some point); editing both keeps them in parity. No justification for a new pattern — minimal string hygiene is the established shape for these UX-text residuals.
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-26):** Confirmed via reads of CORE-189.md + the two target files' Step 6/10 sections + SPEC/model.md. The "cite the actual PLAN [model] token, illustrate with primary labels + visuals" approach is already the documented intent in model.md and 208.1; the SKILL files were simply still shipping the pre-206 example text in their operator instructions.

**Implementation:** Three targeted string replaces (ft-task:51 comment, ft-task:148 generator, ft-epic-discovery:236 generator). Old hard-coded `<opus|sonnet>` examples removed; new text directs substitution of the *actual* token from the relevant PLAN line and explicitly calls for primary-label + "design vs mechanical" + 🧠/🔧 prose. Zero runtime behavior change; pure prompt-text hygiene. 2 files, ~3 lines net diff. No new functions, no refactors.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Verification (2026-05-26):** 
- Re-ran strict grep for the removed hard-coded pattern (`/model <opus|sonnet>` and `<opus|sonnet>` in generator context) across both edited files → ✅ "no hard-coded /model <opus|sonnet> prompt examples remain in either file."
- The only remaining mentions of `opus` / `sonnet` are in the *new* ft-task:51 comment as "e.g. valid specific names" (correct per SPEC/model.md escape-hatch language).
- Markdown mental-pass on the three edits (ft-task comment, ft-task generator bullet, ft-epic generator bullet): grammar, em-dashes, wikilinks (none added), backticks, and sentence flow all clean. No trailing whitespace, consistent indentation in the lists. The new phrasing is slightly longer but stays well under any practical line-length concerns for prompt files.
- No frontend surface (pure CLI skill text) → no 👁️ visual confirmation required from operator.
- No executable code paths or tests exist for these prompt strings; the "test suite" and "lint" for this change are the re-grep + mental pass documented here. Both pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (for 📦 gate):** Updated the post-closure "copy-paste line" instructions in ft-task/SKILL.md and ft-epic-discovery/SKILL.md (plus one nearby grammar comment) to emit agent-agnostic guidance: substitute the actual `[model]` token from the next PLAN line, preferring primary `[heavy]🧠`/`[light]🔧` labels with design-vs-mechanical prose and emoji visuals. Eliminated the last hard-coded `opus|sonnet` examples in the core task-runner post-closure UX text. 2 files, 3 targeted replaces, zero behavior change.

**Technical detail:** 
- Files: `claude/skills/ft-task/SKILL.md` (comment at :51 + generator at :148), `claude/skills/ft-epic-discovery/SKILL.md` (generator at :236)
- Diff: 2 files changed, ~3 lines net, +40 chars. All edits are prose example strings in Step 6/10 "Skill-specific" bullets.
- Key decisions: (a) illustrate with the actual token the AI will see on the PLAN line at emission time (not a fixed example); (b) call out the primary labels + 🧠/🔧 visuals + "design vs mechanical" language explicitly so future operators and the AI have the correct UX contract in the executable prompt; (c) kept the "substitute the next task's..." nudge intact (cite-don't-restate).
- Verification: re-grep confirmed no remaining hard-coded `<opus|sonnet>` generator examples; markdown hygiene pass clean; doc-drift sweep trivial ("no change" on all 9 AI-referenced docs because SKILL.md files are lazy-loaded and excluded from the cold-start list).
- No tests (prompt text only); no frontend; no privileged surface.

**Archived:** 2026-05-26
