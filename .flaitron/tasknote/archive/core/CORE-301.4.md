---
title: wire-epic-and-decisions
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301, CORE-301.1, CORE-301.2, CORE-301.3]
---

# CORE-301.4 | wire-epic-and-decisions

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]] [[CORE-301.1]] [[CORE-301.2]] [[CORE-301.3]]

## 🎯 Goal

Wire the §"Downstream-impact reconciliation" scan into the two remaining trigger surfaces: `/ft-epic-discovery` Phase 2 child-cohort filing (scan the rest of active PLAN for impacted entries) and a `/ft-task` Phase 2 hook (a direction-changing mid-execution decision triggers the same reconciliation before continuing).

## ✅ Acceptance

- [ ] `ft-epic-discovery`: Step 7 (Phase 2) scans active PLAN for entries impacted by the new child cohort, surfaces classified impact + one proposed reconcile action per entry, applies only user-confirmed edits; routine-skip carve-out present
- [ ] `ft-task`: Step 5 Phase 2 carries a direction-changing-decision hook (parallel to the hard-dependency park hook) that fires the scan before continuing execution; routine decisions skip it
- [ ] Both wirings cite `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" as authoritative (compact inline vocab + section cite, no full contract restatement); zero new lazy-load
- [ ] Both user-confirms are AskUserQuestion-style review prompts, **not** new banners — the two-banner cap (🛠️ + 📦) is preserved
- [ ] Scope held to `.4`'s two surfaces (inline filers were `.3`; adopter docs are `.5`)
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Re-read ft-epic-discovery Step 7 + ft-task Step 5 to fix exact insertion points
- [ ] Wire ft-epic-discovery Step 7: scan paragraph after the child-write bullets + Implementation-Notes capture
- [ ] Wire ft-task Step 5 Phase 2: direction-changing-decision hook parallel to the hard-dependency park hook
- [ ] Markdown mental-pass (headings, step refs, cross-refs, wikilink-integrity, two-banner-cap consistency)
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)
- [[CORE-301.1]] — Discovery; resolved scope + child split (`.4` = epic-discovery + ft-task decision path)
- [[CORE-301.2]] — reconciliation-contract; the §"Downstream-impact reconciliation" this child wires in
- [[CORE-301.3]] — wire-inline-filers; established the cite-don't-restate fold-into-review wiring pattern this child mirrors

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct implementation of the `.1` Discovery deliverable. The `.1` Resolved-scoping table pins this child: `.4` wires `/ft-epic-discovery` (child-cohort filing) + the `/ft-task` Phase-2 decision path; `.2` shipped the contract and `.3` shipped the wiring pattern. Pure skill-wiring; no code surface.

- [x] Read relevant source files — `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-task/SKILL.md`, `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" (contract), `SPEC/epic.md`, `SPEC.md` §"The 4-phase workflow" / §"Post-closure protocol", `claude/skills/ft-file-followup/SKILL.md` (`.3` wiring exemplar), and predecessors `CORE-301.1/.2/.3.md`

- [x] **Archive skim** — predecessors `CORE-301.1/.2/.3` are the load-bearing precedents: `.1` resolved the child split + reconcile vocab; `.2` authored the contract (confirming `SPEC/tasknote-selection.md` is already in both target skills' loader line → zero new lazy-load); `.3` established the exact wiring shape (cite the section as authoritative, name vocab inline, fold into an existing user-confirm review, carry the routine-skip carve-out). No other archive tasknote codifies a cohesion scan.

- [x] **Drift check** — both target skills exist at HEAD with the structure `.1` described: `ft-epic-discovery` has Step 7 "Drive Phase 2: Execution" (writes the `.2..(N-1)` child lines) and a Step 5.5 deep-pre-pass precedent for "AskUserQuestion review prompt, not a banner — two-banner cap preserved"; `ft-task` has Step 5 whose Phase 2 bullet already carries a mid-execution hook ("If a hard dependency surfaces … park"). `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" exists at HEAD with the triggers/scan/classification/action tables. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** `.1`/`.2`/`.3` resolved all scope. Explicit assumptions: (1) ft-epic-discovery's scan folds into a dedicated Phase-2 user-confirm **review prompt** (AskUserQuestion-style, not a banner), mirroring Step 5.5's two-banner-cap language — epic-discovery has no inline pre-write review gate to reuse the way the `.3` filers did, so the contract's own user-confirm gate surfaces as a Phase-2 review; (2) ft-task's hook is added **parallel to the existing hard-dependency park hook** in the Step 5 Phase 2 bullet — same "mid-execution" shape, inline confirm, no new banner; (3) the ft-task scan, like the Re-scope/De-scope drift carve-out, guards plan correctness, so it fires regardless of `--fast` (it proposes; the user still owns the confirm) — an inline review, not a suppressible banner trip; (4) vocab named inline, section cited authoritative (cite-don't-restate, matching `.3`); (5) `.5` (adopter docs) stays untouched.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Two surfaces, two shapes.** Unlike `.3`'s two inline filers (both had a symmetric Step-3 pre-write review to fold into), `.4`'s two surfaces differ: `ft-epic-discovery` files a *cohort* in Phase 2 with no pre-write review gate → the scan surfaces as a dedicated Phase-2 review prompt; `ft-task` has no filing step at all → the scan is a *decision-driven* mid-execution hook parallel to the blocked-park hook.
- **Two-banner-cap precedent.** `ft-epic-discovery` Step 5.5 already says the right thing for non-banner AskUserQuestion review prompts ("not the banner-block 🛠️ / 📦 … the two-banner cap is preserved"). Reuse that exact framing so the new scan review doesn't read as a third standing gate.
- **`--fast` for ft-task.** The ft-task hook is the one place a `--fast` interaction could matter. Resolution: the reconciliation scan is a plan-correctness gate (the contract's whole motivation is "nobody notices until that task is picked up"), so it follows the **drift carve-out precedent** — it survives `--fast`. It is an inline user-confirm review, not a 👁️ ask or a 📦 signal trip, so it is outside the two things `--fast` suppresses anyway.
- **Order in ft-epic-discovery.** Write the child cohort first (the Phase 2 deliverable), *then* scan the rest of active PLAN for existing entries the new children impact. The new children + `## Completed` are out of scope of the scan's enumeration.
- **Zero new lazy-load.** `SPEC/tasknote-selection.md` is already in `ft-epic-discovery`'s loader-relevant module set (it Reads `SPEC/epic.md`; the selection module is loaded by the filing/runner skills per its own loader line which lists `/ft-epic-discovery` and `/ft-task`). No loader edit needed in either skill.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `.3`'s wiring of the two inline filers is the direct precedent: cite `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" as authoritative, name the vocab inline, fold the proposals into a user-confirm review, carry the routine-skip carve-out. For the non-banner framing, reused `ft-epic-discovery` Step 5.5's existing "AskUserQuestion review prompt, not a banner — two-banner cap preserved" language. No new pattern invented.

- [x] Implemented the minimal solution — three edits across two files:
  - `ft-epic-discovery` Step 7: added a **Downstream-impact reconciliation scan** paragraph after the child-write checklist bullets (scan the rest of active PLAN after writing `.2..(N-1)`; classify; propose one reconcile action; user-confirm review prompt, not a banner; routine-skip carve-out) + extended the Implementation-Notes capture line.
  - `ft-epic-discovery` Step 8: added a markdown-pass bullet so reconcile-edited existing lines still parse.
  - `ft-task` Step 5 Phase 2 bullet: added an **"If a direction-changing decision surfaces mid-execution"** hook parallel to the existing hard-dependency park hook — runs the scan before continuing, inline user-confirm (not a banner), fires regardless of `fast-mode` (drift-carve-out parallel).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill contracts; no executable surface)

**Implementation Notes:** Two surfaces, two shapes (unlike `.3`'s symmetric inline filers): `ft-epic-discovery` files a *cohort* with no pre-write review gate → the scan surfaces as a dedicated Phase-2 review prompt; `ft-task` has no filing step → the scan is a *decision-driven* mid-execution hook parallel to the blocked-park hook. Both cite the contract section as authoritative with inline vocab (cite-don't-restate); zero new lazy-load (`SPEC/tasknote-selection.md` already loaded by both). The `ft-task` hook is the only `--fast` surface: resolved as a plan-correctness gate that follows the Re-scope/De-scope drift carve-out (survives `fast-mode`), and it is an inline review rather than a 👁️ ask or 📦 trip, so it sits outside what `--fast` suppresses regardless. No step renumbering — both edits are inline insertions within existing steps.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — markdown mental-pass + greps instead (below)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Greps confirmed: both skills cite §"Downstream-impact reconciliation" exactly once (inline-vocab + section-cite, no restatement); **zero** parseable `[[A-Z]+-[0-9]+` wikilinks introduced (the `[[wikilink]]` token is lowercase-literal); two-banner-cap phrasing present and consistent in both new blocks; `fast-mode` carve-out present in the `ft-task` hook; no trailing whitespace. Step numbering intact (inline insertions, no renumber). Pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` no change · `SPEC.md` no change (§"When to use a tasknote" module-summary already names the reconciliation scan from `.2`'s sync) · `docs/MIGRATION.md` no change (adopter propagation is `.5`) · `claude/AGENTS-snippet.md` no change (`.5`) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change (scan is user-gated; no new injection surface) · `docs/AGENT-NEUTRALITY.md` no change (wiring is agent-neutral; AskUserQuestion is named as a review-prompt style, consistent with the pre-existing Step 5.5 usage) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change.

- [x] Closed — PLAN.md `.4` line flipped to stub form `Completed 2026-06-07.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:** Wired the §"Downstream-impact reconciliation" scan into its two remaining trigger surfaces. `/ft-epic-discovery` Step 7 now, after filing the `.2..(N-1)` child cohort, scans the rest of active PLAN for existing entries the new children make stale/contradictory/redundant and surfaces one reconcile action per impacted entry behind a Phase-2 user-confirm review (not a banner; routine-skip carve-out). `/ft-task` Step 5 Phase 2 gains an "If a direction-changing decision surfaces mid-execution" hook — parallel to the hard-dependency park hook — that runs the same scan before continuing, with an inline user-confirm that (like the Re-scope/De-scope drift carve-out) survives `--fast`. Both cite the contract section as authoritative with inline vocab; zero new lazy-load; two-banner cap preserved. Scope held to `.4`'s two surfaces — adopter-doc propagation is `.5`.

**Archived:** 2026-06-07
