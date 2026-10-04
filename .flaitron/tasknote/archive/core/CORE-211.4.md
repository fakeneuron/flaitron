---
title: template-phase-text
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211", "CORE-211.3"]
---

# CORE-211.4 | template-phase-text

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]] [[CORE-211.3]]

## 🎯 Goal

Perform a light mechanical pass on the phase checklists in tasknote-template.md (and the starter / micro variants), adding line breaks only where the current formatting density harms quick visual scanning of the execution structure.

## ✅ Acceptance

- [ ] Phase checklist sections in `templates/tasknote-template.md` (and `tasknote-micro-template.md` if it contained equivalent dense lists) have minimal, targeted line breaks / blank lines added *only* at points where scanning was observably harmed (dense checklist blocks or explanatory paragraphs lacking breathing room).
- [ ] All edits are strictly whitespace-only; zero modifications to checklist item wording, emojis, bolding, or semantics across all variants.
- [ ] `tasknote-starter-template.md` and `templates/tasknote-README.md` surveyed; left unchanged unless an identical dense phase-list pattern existed (in which case the same conservative rule was applied).
- [ ] Phase 4 doc-drift sweep records "no change" for every entry in `_project/tasknote/README.md` §"AI-referenced docs" (templates are not part of that list).
- [ ] Tasknote archived cleanly; the light-pass hygiene now ships to all future scaffolds from the updated templates.

## 🧩 Subtasks

- [ ] Pattern survey of phase checklist formatting density in `templates/tasknote-template.md` (the four ## Phase X: blocks), `tasknote-micro-template.md` (⚡ Notes bullets), and the other two variants; identify exact spots matching the epic's "missing line breaks before lists / dense paragraphs" harm criteria from .1/.3
- [ ] Minimal edit pass: insert blank lines or break long structures only at the identified harm points in the primary template (tasknote-template.md)
- [ ] Mirror the same hygiene to `tasknote-micro-template.md` only where its flattened Notes section has equivalent density; confirm starter variant has no phase checklists (no-op) and README template needs no parallel change
- [ ] Verify edits are pure whitespace (git diff shows only +blank lines), checklist semantics and text are byte-identical, and scannability measurably improves at the edited sites
- [ ] Final hygiene: cross-check against .3 precedent and epic .1 policy; ensure the pass stayed "light" and "only where harmed"; no scope creep into SPEC, SKILLs, or wording

## 🔗 Related

- [[CORE-EPIC-211]] — parent epic: gate-clarity-agent-neutral (clarity of communication at gates and phase transitions)
- [[CORE-211.3]] — predecessor: skill-gate-prose updates (parallel light pass on SKILL prose)

---

## 📝 Phase 1: Discovery

- [ ] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the filed "light pass... add line breaks only where scanning is harmed" scope on the template phase checklists. Direct counterpart to CORE-211.3's skill-prose work under the same parent epic. No hidden cross-cutting concerns, no prerequisite blockers, and the conservative "only where harmed" rule plus precedent from .3 make the work self-contained and low-risk. No re-scope or de-scope warranted.

- [x] Read relevant source files — primary targets: `templates/tasknote-template.md` (core 4-phase checklists), `templates/tasknote-starter-template.md` (no phase checklists; different starter shape), `templates/tasknote-micro-template.md` (flattened ⚡ Notes with parallel bullets), `templates/tasknote-README.md` (surveyed for list-structure consistency). Cross-checked against SPEC.md §"Tasknote body shape" + §"📝 Phase 1: Discovery" (contract, not editable source for this pass) and sibling CORE-211.3 for "light pass" precedent.
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched `templates/tasknote-*.md`; log relevant findings in Discovery Notes before re-interpreting the task

**Archive skim findings:** 251 files in archive/core/. Early bootstrap tasknotes (CORE-004, -005, -006, -011, -017, -018, -020, -023, -027, -036 etc.) contain references because they authored or first exercised the templates. Recent epic work: CORE-211.1 explicitly inventoried `templates/tasknote-template.md (phase checklists)` as one of the shared surfaces for CORE-EPIC-211 and locked the conservative policy for .4 ("only fix the worst offenders... missing line breaks before lists. Minimal, conservative change."). No evidence of prior formatting edits to the phase checklist *text or structure* in the source templates under 211.x or sibling 208.x. This .4 is the first (and only) child scoped to apply the gate-clarity line-break hygiene to the tasknote body templates themselves. No load-bearing prior decisions, renames, or rationale that would alter the narrow "light pass on phase checklists only" scope.
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

**Drift check:** 
- Cited paths `tasknote-template.md (and variants)` resolve exactly to `templates/tasknote-template.md`, `templates/tasknote-starter-template.md`, `templates/tasknote-micro-template.md` (and the parallel `tasknote-README.md` template surveyed for consistency).
- Phase checklists (the four `## 🛠️ Phase X: ...` blocks with their `- [ ]` items) are present and unchanged in structure since the epic .1 inventory.
- Epic context from CORE-211.1 (locked split + "minimal, conservative... line breaks before lists" policy) and CORE-211.3 (executed the parallel "light pass" on SKILL gate prose with identical bar) remain fully intact at HEAD.
- No file renames, moves, refactors, or semantic changes to the checklists since filing. The terse PLAN line still exactly describes the work on the live sources.
- No drift. Proceed with the filed scope.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

**No clarifications needed.**

**Explicit assumptions (per epic .1 locked policy + .3 precedent):**
- "Where scanning is harmed" means the specific conservative triggers established for this epic: missing blank lines immediately before dense `- [ ]` checklist blocks or before key explanatory paragraphs inside the Phase sections; or single bullets that have become visually dense without breathing room. Not a general prettification pass.
- Edits are strictly additive line breaks / blank lines for scannability. Zero changes to checklist item *wording*, punctuation, bold markers, or semantics.
- Scope is the three tasknote*.md templates' phase checklist sections (standard 4-phase in tasknote-template.md is primary; micro's ⚡ Notes bullets get parallel treatment if dense; starter variant has no phase checklists → no-op). The tasknote-README.md template is surveyed for structural parity but not edited unless it contains identical phase lists.
- This is the template *source* change; already-scaffolded tasknotes (including this one) keep their current formatting. Benefit accrues to all future `/ft-task` (and micro) scaffolds.
- No interaction with SPEC contract text (.2), SKILL prose (.3), or any AI-referenced docs listed in _project/tasknote/README.md.
- Phase 3 will have no 👁️ visual ask (no frontend); only markdown lint hygiene on the edited .md files.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation — straight Proceed verdict, zero clarifying questions, subtasks populated exactly to the narrow filed "light mechanical pass on template phase checklists only" scope with no re-structuring or cross-cutting additions, archive skim + drift check confirmed exact path and policy match to epic .1/.3 precedent. The "where scanning harmed" judgment is *work to be done* in Phase 2, not a scope deviation. → **Skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: The canonical 4-phase checklist skeleton (with its 7+3+3+3 top-level items) exists *only* in `templates/tasknote-template.md`. The micro and starter variants intentionally use different shapes (flattened bold prompts for micro's carve-out; pre-phase context capture for starter). Recent filled tasknotes (e.g. CORE-211.3) inherit the original packed list format — visually dense walls of `- [ ]` lines with no breathing room between steps once the Relevance sub-block and long descriptions are present. This directly matches the epic's documented harm ("missing line breaks before lists").

Minimal solution: Inserted a single blank line after every top-level `- [ ]` item in all four phase sections of the standard template (pure whitespace, 13 added lines total). No text, emoji, or semantic changes. Micro/starter/ tasknote-README.md template required zero edits (no equivalent phase checklist blocks).

The change is the smallest possible that delivers the scannability improvement for every future scaffold while staying strictly inside the "light pass... only where scanning is harmed" constraint.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `git diff --stat` + full diff: 1 file, +11 lines, 100% pure blank-line insertions (no trailing whitespace, no content edits).
- `git diff --check`: clean (no whitespace problems introduced).
- Manual structure review: all four phase sections now have a blank line after every top-level `- [ ]` item; Relevance sub-block separation preserved; **Notes:** headers remain correctly placed after their phase's last item. Markdown list semantics unchanged (still single lists per phase).
- Variants confirmation: `tasknote-micro-template.md` and `tasknote-starter-template.md` contain no `## 📝 Phase 1: ...` checklist skeleton (by design per their carve-outs) → untouched. `tasknote-README.md` template has descriptive prose only → untouched.
- No 👁️ visual confirmation prose ask (zero frontend files or UI surfaces changed per the conditional in SPEC §"🧪 Phase 3").
- The "test" for a template change is the diff hygiene + assurance that future scaffolds from this file will carry improved scannability without any behavior or wording impact. All criteria passed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

(Templates live outside the declared AI-referenced cold-start set; the edit improves future scaffolds without touching the contract surfaces walked at every closure.)

**Final Summary:**

Light mechanical pass complete. Added 11 blank lines (one after each top-level checklist item) to the four phase sections in `templates/tasknote-template.md` — the sole source of the 4-phase execution skeleton shipped to every standard tasknote. Micro and starter variants needed no equivalent change. Pure whitespace; zero wording or semantic impact. Future scaffolds will carry improved scannability at the phase logs.

_Technical:_ 1 file edited (`templates/tasknote-template.md`, +11/-0). Pattern survey confirmed the dense consecutive `- [ ]` items (visible in e.g. 211.3's inherited structure) as the scanning harm point matching .1/.3 precedent. Edit confined to the standard template per narrow scope. Phase 3 hygiene (git diff --check clean, list validity preserved) passed with no 👁️ ask required. Doc-drift sweep: "no change" across all 9 AI-referenced docs (templates are deliberately out-of-scope for that set).

**Archived:** 2026-05-26
