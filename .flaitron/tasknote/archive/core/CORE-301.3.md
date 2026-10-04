---
title: wire-inline-filers
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301, CORE-301.1, CORE-301.2]
---

# CORE-301.3 | wire-inline-filers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]] [[CORE-301.1]] [[CORE-301.2]]

## 🎯 Goal

Wire the §"Downstream-impact reconciliation" scan into `/ft-file-followup` and `/ft-starter-task` so that, after drafting the new PLAN.md line, each skill scans active PLAN entries for downstream impact and folds proposed reconcile actions into its existing review gate before writing.

## ✅ Acceptance

- [x] `ft-file-followup`: scan fires after drafting the line, folds proposed reconcile actions into the existing Step 3 review gate, and confirmed edits apply in Step 4 (never before user confirm)
- [x] `ft-starter-task`: same — scan folds into the Step 3 review, confirmed edits apply in Step 5 alongside the PLAN.md append
- [x] Both skills cite `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" as authoritative (compact inline vocab + section cite, no full contract restatement); zero new lazy-load (module already in both skills' loader line)
- [x] Routine-skip judgment carve-out present in both wirings
- [x] Scope held to `.3`'s two skills (epic-discovery + ft-task decision path are `.4`; adopter docs are `.5`)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Re-read both skills' review/append steps to fix exact insertion points
- [x] Wire `ft-file-followup`: scan substep in Step 3, reconcile-apply substep in Step 4
- [x] Wire `ft-starter-task`: scan substep in Step 3, reconcile-apply substep in Step 5
- [x] Markdown mental-pass (headings, step numbering, cross-refs, wikilink-integrity)
- [x] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)
- [[CORE-301.1]] — Discovery; resolved scope + child split (`.3` = wire the two inline filers)
- [[CORE-301.2]] — reconciliation-contract; the §"Downstream-impact reconciliation" this child wires in

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct implementation of the `.1` Discovery deliverable. The `.1` Resolved-scoping table pins this child: `.3` wires `ft-file-followup` + `ft-starter-task`; `.2` shipped the contract at `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation". Pure skill-wiring; folds the scan into each skill's existing review gate.

- [x] Read relevant source files — `claude/skills/ft-file-followup/SKILL.md`, `claude/skills/ft-starter-task/SKILL.md`, `SPEC/tasknote-selection.md` (the contract), `SPEC/epic.md`, `templates/tasknote-template.md`, and the predecessor tasknotes `CORE-301.1.md` / `CORE-301.2.md`

- [x] **Archive skim** — predecessors `CORE-301.1` / `CORE-301.2` are the load-bearing precedents: `.1` resolved the child split + reconcile-action vocab (merge/nest/edit/delete/leave); `.2` authored the contract and confirmed both filing skills already lazy-load `SPEC/tasknote-selection.md` (its loader line lists `/ft-file-followup` and `/ft-starter-task`), so the new section is available for free — zero new lazy-load.

- [x] **Drift check** — both skill files exist at HEAD with the structure `.1` described: `ft-file-followup` has a Step 3 "Draft and surface for review" + Step 4 "File the entry"; `ft-starter-task` has a Step 3 "Draft the starter body" (+ review) + Step 5 "Append the PLAN.md entry". `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" exists at HEAD with the triggers/scan/classification/action tables. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** `.1`/`.2` resolved all scope. Explicit assumptions: (1) the scan folds into each skill's **existing** review gate (Step 3 for both) rather than adding a new operator gate — matches the task line ("in the same review gate") and the contract's user-confirm-gate framing; (2) confirmed reconcile edits apply where the skill already touches PLAN.md (`ft-file-followup` Step 4, `ft-starter-task` Step 5); (3) wiring cites the contract section as authoritative with a compact inline vocab reminder (house style — cite-don't-restate), so contract changes don't drift the skills; (4) `.4` (epic-discovery + ft-task decision path) and `.5` (adopter docs: AGENTS-snippet, MIGRATION, glossary) stay untouched — those surfaces are out of `.3`'s scope.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Insertion points.** `ft-file-followup`: the scan slots into Step 3 between the conversational-paragraph draft and the "Surface for review" list; the reconcile-apply substep slots into Step 4 alongside the line append. `ft-starter-task`: the scan slots into Step 3 (after the body draft, into the review surface); the reconcile-apply substep slots into Step 5 alongside the PLAN.md append (where the skill already edits PLAN.md).
- **Fold-not-gate.** Both skills already have a mandatory review-before-write step; the contract's user-confirm gate maps onto it 1:1. So the wiring **folds the reconcile proposals into the existing review surface** — no new banner, no `--fast` interaction (these filing skills carry no `--fast` flag).
- **Routine-skip carve-out.** The contract's "routine cases skip the scan — apply judgment" must carry into both wirings so a first-in-area or self-contained filing isn't forced through a no-op scan.
- **Scope fence.** `.3` = the two inline filers only. The `/ft-epic-discovery` child-cohort trigger and the `/ft-task` Phase-2 decision trigger are `.4`; adopter-doc propagation is `.5`. The contract itself already forward-references "each skill's own steps", so no contract edit is needed here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — both skills already carry a mandatory review-before-write step (ft-file-followup Step 3, ft-starter-task Step 3) and use the house idiom of `**bold lead-in**` + parenthetical section cites (e.g. ft-file-followup Step 2's filing-discipline gate cites `SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds"`). The `.2` tasknote established citing the contract by section rather than restating. Extended that exact shape — no new pattern invented.

- [x] Implemented the minimal solution — four edits across two files:
  - `ft-file-followup` Step 3 (retitled "Draft, scan, and surface for review"): added the **Downstream-impact reconciliation scan** substep + a reconcile-actions line in the review surface.
  - `ft-file-followup` Step 4: added substep 2 **Apply confirmed reconcile edits** (renumbered the conversational-paragraph delivery to 3; fixed the Step 5 hand-off cross-ref `4.2 → 4.3`).
  - `ft-starter-task` Step 3 (retitled "Draft the starter body and scan for downstream impact"): same scan substep + reconcile line in the review surface.
  - `ft-starter-task` Step 5: added **Apply confirmed reconcile edits** alongside the PLAN.md append.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill contracts; no executable surface)

**Implementation Notes:** The scan folds into each skill's **existing** review gate (not a new operator banner) — matches the task line ("in the same review gate") and the contract's user-confirm-gate framing. Confirmed reconcile edits apply where each skill already touches PLAN.md (ft-file-followup Step 4, ft-starter-task Step 5). Both wirings carry the contract's "routine cases skip the scan — apply judgment" carve-out. Vocab (classes stale/contradictory/redundant/unaffected; actions merge/nest/edit/delete/leave) is named inline but the section is cited as authoritative, so contract changes don't drift the skills. Zero new lazy-load — `SPEC/tasknote-selection.md` is already in both skills' loader line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — markdown mental-pass + greps instead (below)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Greps confirmed: no stale `Step 4.2`/`Step 3.x` refs after renumber (the one hit at the Step 5 hand-off was fixed to `4.3`); no references to the old Step 3 title "Draft and surface"; **zero** parseable `[[A-Z]+-[0-9]]` wikilinks introduced (the `[[wikilink]]` example is lowercase-literal); both skills cite §"Downstream-impact reconciliation"; Step 4 numbering of ft-file-followup is clean 1/2/3. Pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` no change · `SPEC.md` no change (§"When to use a tasknote" module-summary already names the reconciliation scan from `.2`'s sync) · `docs/MIGRATION.md` no change (adopter propagation is `.5`) · `claude/AGENTS-snippet.md` no change (`.5`) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change (scan is user-gated; no new injection surface) · `docs/AGENT-NEUTRALITY.md` no change (wiring is agent-neutral; no Claude-specific tool names) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change.

- [x] Closed — PLAN.md `.3` line flipped to stub form `Completed 2026-06-07.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:** Wired the §"Downstream-impact reconciliation" scan into the two inline filing skills. `/ft-file-followup` and `/ft-starter-task` now, after drafting the new PLAN.md line, scan active PLAN entries for downstream impact (shared files / subsystem / contract / `[[wikilink]]` dependency), classify each (stale/contradictory/redundant/unaffected), and fold one proposed reconcile action per impacted entry (merge/nest/edit/delete/leave) into their existing pre-write review gate — applying confirmed edits only after user confirmation (ft-file-followup Step 4, ft-starter-task Step 5). Both carry the routine-skip carve-out and cite the contract section as authoritative (no restatement drift, zero new lazy-load). Scope held to `.3`'s two skills; epic-discovery + the ft-task decision path are `.4`, adopter docs `.5`.

**Archived:** 2026-06-07
