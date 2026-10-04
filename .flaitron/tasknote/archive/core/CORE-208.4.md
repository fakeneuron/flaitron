---
title: global-claude-md
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-208]
---

# CORE-208.4 | global-claude-md

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Update the "Model Selection" line and surrounding guidance in the user's global `~/.claude/Claude.md` (plus a spot-check of `SPEC.md` + `templates/`) to use the agent-agnostic primary labels `[heavy]🧠` / `[light]🔧` with "design vs mechanical" prose and emoji visuals, eliminating the last hard-coded specific-model prompt examples in the Claude.md surface.

## ✅ Acceptance

- [ ] Criterion 1
- [ ] Criterion 2

## 🧩 Subtasks

- [ ] Step 1
- [ ] Step 2

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic (`heavy-light-suggestions`); all children deliberately `[light] 🔧`-scoped for mechanical hygiene work (this one retagged to `[grok]` at Step 1.5 gate for the current session)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the filed scope (global `~/.claude/Claude.md` Model Selection update + spot-check of SPEC/templates). Continues the mechanical hygiene pattern from siblings .2/.3/.7 (terminology locked in .1; emission generators cleaned). The global surface was explicitly called out in .1 inventory but deferred to this dedicated child. Retag to [grok] at Step 1.5 was operator choice for this session; does not change the light mechanical character of the doc edit. No scope growth or cross-cutting concerns.

- [x] Read relevant source files
  - Target: full `/Users/fakeneuron/.claude/Claude.md` (75 lines; Model Selection is exactly the single bullet at :44 using "Opus" / "Sonnet")
  - `SPEC/model.md` (agent-aware practical guidance + Grok [light] notes, post-207)
  - `SPEC.md` §"Post-closure protocol" (the copy-paste example) + §"Model field" + §"When to use..."
  - `templates/tasknote-template.md` + `templates/PLAN.md` (placeholder [opus] examples only)
  - Sibling tasknotes: CORE-208.1 (inventory), 208.2/3/7 (cleanup precedent), 207 (model guidance), 205.x (agent-neutrality)
  - Current `claude/skills/ft-task/SKILL.md` post-closure text (now uses emoji + "design vs mechanical" + wrench cue, no literal /model)
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` (239 entries) for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
  - `ls _project/tasknote/archive/core/ | grep -E '208|207|206|205'` surfaced the 208 cohort + 207/205.
  - `grep -l` hits for "Claude.md|Model Selection|Default to Opus": CORE-208.1 (explicitly listed the global line as in-scope residual), CORE-207, 205.x, 204, 199, 198.5 (precedent sweeps).
  - `grep -l` for SPEC.md + templates/ in 208 family: only light mentions in .1 (templates clean at inventory time) and .7.
  - Load-bearing: 208.1 locked "global CLAUDE.md:44" as a target surface and "stick to heavy/light + 🧠/🔧 + design-vs-mechanical prose"; 207 enriched the SPEC guidance this child aligns to; no prior attempt at editing the *user's personal global* file itself in this epic. No file moves, regressions, or hardlink notes.
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
  - PLAN description cites "~/.claude/Claude.md "Model Selection" line" — exact match to current file (line 44: "Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind."). No drift.
  - The one residual specific-model *example* in SPEC (post-closure copy-paste text at ~523) was already present at .1 inventory time; not a behavioral emission site.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  - **No clarifications needed.** Explicit assumptions logged below.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source inventory (2026-05-26):**
- Global target `/Users/fakeneuron/.claude/Claude.md:44` still carries the pre-epic specific-model guidance ("Default to Opus... prefer Sonnet..."). This is the primary (and only) live user-facing Model Selection rule the operator sees on every session start via the context briefing. Updating it is the core deliverable of this child.
- SPEC/templates spot-check:
  - `SPEC.md:523` still shows the old example: `/clear then /model <opus|sonnet> then /<next-skill> <args>` inside the documented "Offer the copy-paste line" step. This is now a stale example (skills no longer emit it post-208.2/7), but it is in a contract doc, not a generator. Left for .5 verify or light touch if .4 broadens.
  - `templates/PLAN.md` uses `[opus]` only as illustrative placeholder in the example task-line grammar (fine; specific names remain valid per SPEC/model.md).
  - `templates/tasknote-template.md` and others: clean (no model tokens).
- No other residuals in the exact "SPEC/templates" surfaces that would require edits in this mechanical child. (The broader verify-sweep is .5's job.)
- Precedent from siblings: .1 identified the surface; .2/.7 cleaned the *emitted UX strings* in skills to the new visual-only + wrench-cue form; global personal config was the remaining user-standard surface.

**Explicit assumptions (no AskUserQuestion fired):**
- The replacement text for the global Model Selection section will be a crisp, single-bullet update using the locked terminology: `[heavy]🧠` for design/multi-file/ambiguity + `[light]🔧` for mechanical/clear-diff, plus a short note that specific models remain valid escape hatches (matching model.md §"Practical guidance").
- The global file's overall style (terse bullets under ### headings, personal "I" framing in other sections) will be preserved; only the one bullet changes.
- The edit is performed on the live `~/.claude/Claude.md`; future Grok/Claude sessions for this user will pick up the new guidance via their normal context loading.
- Spot-check findings that are merely "stale doc examples in SPEC" (not active prompt emitters) do not trigger scope expansion into editing SPEC in .4; they are noted for .5.
- No other sections of the global CLAUDE.md mention model selection or copy-paste instructions (confirmed by full read).
- Since this is the operator's personal global standard (and they invoked the epic child), the change is implicitly authorized; no separate confirmation gate beyond the task itself.

**Relevance / Pattern survey note:** This is pure doc configuration hygiene — identical shape to prior global/personal-standard sweeps in the 205/207 era. No code, no tests, visual confirmation will be "👁️ please review the updated section in your global Claude.md".

**Phase 1 exit judgment:** Discovery surfaced no significant deviation from the original plan (small clarifications only, explicit assumptions logged, scope remains the single global bullet + spot-check). → skip 🛠️. 

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
  - Precedent from epic siblings .2/.3/.7 (post-closure text hygiene) and 207 (model guidance): all used direct, minimal string replaces on the exact target surfaces, with Discovery Notes capturing the "why this wording" from .1 locked decisions. No new abstractions or helper patterns; the "shape" for global personal-standard updates is one-line (or one-bullet) authoritative replacement preserving the host file's terse style.
  - Global `~/.claude/Claude.md` itself follows a consistent short-bullet format under ### headings (no cross-refs, no tables in that section). The update is a 1:1 mechanical swap of the recommendation sentence.
  - No justification needed for "new shape" — this is pure vocabulary alignment on a config surface.
- [x] Implemented the minimal solution
  - Performed the exact targeted replacement in `/Users/fakeneuron/.claude/Claude.md:44` (the live global the user loads on every session).
  - Old: "Default to Opus for design/multi-file/ambiguity; prefer Sonnet for mechanical work with a clear diff in mind."
  - New: "Default to [heavy]🧠 for design/multi-file/ambiguity; prefer [light]🔧 for mechanical work with a clear diff in mind."
  - This directly fulfills the PLAN one-liner for .4 and the epic goal for the global CLAUDE.md leg. The "specific models remain valid" clause stays in SPEC/model.md (the canonical contract); the global now uses the primary-label form the epic standardized.
- [ ] Updated/added tests for non-trivial behavior
  (N/A for pure doc/config hygiene task — see Phase 3 verification plan: exact-string check + 👁️ user visual on the global file. No executable behavior changed.)

**Implementation Notes:**

**Phase 2 notes (2026-05-26):** Edit was surgical per the global CLAUDE.md's own "Surgical & Safe Changes" rule (which this task updated). Only the Model Selection bullet was touched; surrounding sections, port registry, scope/safety, and all other guidance left verbatim. The PLAN.md [light]→[grok] retag (performed at Step 1.5 per operator choice on the model-gate Ask) is recorded in the tasknote Related but is workflow infrastructure, not part of the "solution" for the global file.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
  (N/A — no executable code or behavior. Verification was exact-string + full-section read of the target global file before/after the replace.)
- [x] Ran lint/type-check on changed code
  (N/A — plain-text personal config file with no linter or type system. A manual markdown hygiene mental-pass was performed on the changed bullet (consistent heading style, no trailing spaces, matches surrounding bullet length and tone).)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)
  - 👁️ Ask issued with before/after text + context location. User response: "Looks good — proceed to closure". Confirmed the updated bullet is consistent in tone, length, and style with the surrounding personal standards in `~/.claude/Claude.md`. No tweaks requested. Visual sign-off complete.

**Testing Notes:**

**Phase 3 verification (2026-05-26):** 
- Exact string confirmation (post-edit read): old "Opus"/"Sonnet" tokens are absent from the Model Selection section; new primary-label + emoji form is live.
- Markdown hygiene: the bullet is a single line, no trailing punctuation change, matches the imperative style of peer bullets in the file ("Default to...", "prefer...").
- No other model-specific guidance or copy-paste examples exist in the global file (full 75-line read + targeted grep confirmed).
- 👁️ user visual passed with explicit "proceed" selection. Ready for Phase 4 auto-closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `README.md`: no change
  - `SPEC.md`: no change (the one stale `/clear then /model <opus|sonnet>` example at :523 noted in Discovery Notes; intentionally left for .5 verify-sweep per .4 scope)
  - `docs/MIGRATION.md`: no change
  - `claude/AGENTS-snippet.md`: no change
  - `docs/CONVENTIONS.md`: no change
  - `CONTRIBUTING.md`: no change
  - `SECURITY.md`: no change
  - `docs/AGENT-NEUTRALITY.md`: no change (already clean post-205 per sibling precedent)
  - `docs/PLATFORMS.md`: no change
  - Note: the actual deliverable edit (`~/.claude/Claude.md`) is the operator's personal global config, outside the AI-referenced repo doc set. Drift sweep covers only the 9 contract surfaces.
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Updated the operator's global `~/.claude/Claude.md` Model Selection guidance (and spot-checked SPEC/templates) to the agent-agnostic `[heavy]🧠` / `[light]🔧` + "design vs mechanical" form, completing the global CLAUDE.md leg of CORE-EPIC-208 with user visual sign-off.

Technical: 1-line surgical replace in `/Users/fakeneuron/.claude/Claude.md:44` (Opus/Sonnet → primary labels + emojis); 75-line file read + grep confirmed clean; spot-check of SPEC (523 example stale, noted) + templates (harmless placeholders only); 👁️ visual passed ("Looks good — proceed"); Phase 1 skipped 🛠️ (no deviation); [light]→[grok] retag at 1.5 per gate choice; doc-drift all "no change" on the 9 AI-referenced docs (global edit outside set). 0 LOC in repo sources; workflow artifacts only (this tasknote + PLAN retag). Verification: exact post-edit read + user confirmation.

**Archived:** 2026-05-26
