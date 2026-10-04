---
title: reconciliation-contract
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301, CORE-301.1]
---

# CORE-301.2 | reconciliation-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]] [[CORE-301.1]]

## 🎯 Goal

Add a §"Downstream-impact reconciliation" to `SPEC/tasknote-selection.md` defining the structured scan — trigger conditions, impact classification, and propose-reconcile-actions-behind-a-user-confirm-gate — that later children wire into the filing skills.

## ✅ Acceptance

- [x] New §"Downstream-impact reconciliation" added to `SPEC/tasknote-selection.md`
- [x] Section defines the two triggers (new-task filing · mid-flow direction-changing decision)
- [x] Section defines the scan: enumerate active PLAN entries → classify impact → propose reconcile actions (merge/nest/edit/delete/leave)
- [x] Reconcile actions gated behind a user-confirm step (never auto-rewrite the plan)
- [x] Section is contract-only (no skill-wiring imperatives — those land in `.3`/`.4`); forward-references the wiring skills by slug
- [x] Loader prose / cross-refs consistent; no doc claims the old filing-only behavior (within this file's scope)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Re-read `SPEC/tasknote-selection.md` to choose the section's insertion point
- [x] Draft the §"Downstream-impact reconciliation" prose (triggers · scan · classification · reconcile actions · user-confirm gate)
- [x] Insert the section; verify cross-refs and the loader line still cohere
- [x] Markdown mental-pass (headings, fences, wikilink-integrity)
- [x] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)
- [[CORE-301.1]] — Discovery; resolved scope + child split (contract home = this file)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct implementation of the `.1` Discovery deliverable. `.1`'s Resolved-scoping table pins this child precisely: contract home = `SPEC/tasknote-selection.md` (zero new lazy-load), trigger scope = filing + mid-flow direction-changing decisions, scan rigor = structured enumerate→classify→propose→user-confirm. Pure contract authoring; no code surface.

- [x] Read relevant source files — `SPEC/tasknote-selection.md` (target), `SPEC/epic.md`, `SPEC.md` §"The 4-phase workflow" / §"Post-closure protocol", `.flowtron/tasknote/archive/core/CORE-301.1.md` (Discovery output)

- [x] **Archive skim** — grepped `archive/core/` for `tasknote-selection` and `reconcil|downstream.impact|plan.cohesion|blast.radius`. The `tasknote-selection.md` hits are prior contract/structure edits (CORE-223 lazy-split, neutrality sweeps); the reconcil/cohesion hits are incidental word-matches (priority-name reconciliation, doc reconciles). Corroborates `.1`'s finding: no prior tasknote codifies a downstream-impact/cohesion scan — greenfield contract.

- [x] **Drift check** — `SPEC/tasknote-selection.md` exists at HEAD with the structure `.1` described (§"When to use…", §"PLAN.md filing-discipline thresholds", §"`## Completed` archive convention"); loader line already lists all filing skills. PLAN.md `.2` line matches the resolved scope. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** `.1` resolved all scope. Explicit assumptions: (1) this child is contract-only — it defines the discipline; the skill-wiring imperatives land in `.3`/`.4`, so the section forward-references them rather than embedding skill steps; (2) the new section goes at the end of the file (after §"`## Completed` archive convention") as a peer top-level section; (3) the user-confirm gate is described in agent-neutral terms (no Claude-specific tool names), consistent with the rest of the module.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Section placement:** append as a new top-level `## Downstream-impact reconciliation` after §"`## Completed` archive convention" (the file's current last section). Keeps the use/skip thresholds → filing-discipline → archive-convention flow intact and adds the cohesion contract as a distinct peer.
- **Loader line:** the module's `> Lazy-loaded …` line already enumerates every filing skill (`/ft-task`, `/ft-starter-task`, `/ft-file-followup`, `/ft-epic-discovery`, …) — no loader edit needed; the new section is available to all of them for free.
- **Contract vs. wiring boundary:** `.3` wires `ft-file-followup` + `ft-starter-task`; `.4` wires `ft-epic-discovery` + the `ft-task` decision path; `.5` propagates to the adopter surface. This child writes only the *what/when*, forward-referencing those children for the *where-wired*.
- **Reconcile-action vocabulary** (from `.1`): merge / nest / edit / delete / leave — the five verdicts the scan proposes per impacted entry.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the module's existing shape: `##` top section + `**bold.**` lead-ins + compact `|---|` tables (mirrors §"PLAN.md filing-discipline thresholds"). Appended as a peer section after §"`## Completed` archive convention".

- [x] Implemented the minimal solution — added `## Downstream-impact reconciliation` to `SPEC/tasknote-selection.md`: failure-mode framing, two triggers, three-step scan, impact-classification table, reconcile-action table (merge/nest/edit/delete/leave), and a user-confirm gate. Project-neutral (skills cited by slug, no flowtron task IDs; failure mode described abstractly, no adopter name).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract; no executable surface)

**Implementation Notes:** ~50 lines added. No loader-line edit needed — the module's `> Lazy-loaded …` line already enumerates every filing skill, so the section is available to all of them for free. Forward-reference kept generic ("see each skill's own steps") rather than naming `.3`/`.4` IDs, since the SPEC ships to adopters.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — markdown mental-pass + greps instead: no task-ID wikilinks in file (`[[wikilink]]` is literal, not a `[A-Z]+-[0-9]+` match); 4 `##` headings clean; table delimiters 1 pre-existing + 2 new = 3 ✓.

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Markdown mental-pass: section heading consistent with siblings · two tables well-formed (4 + 5 rows) · bold lead-ins match module style · numbered scan list intact · cross-ref to `SPEC.md` §"What flowtron does NOT provide" resolves. Pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` no change · **`SPEC.md` UPDATED** — §"When to use a tasknote" module-summary extended to enumerate the new downstream-impact reconciliation scan (kept the SPEC pointer cohesive with the module) · `docs/MIGRATION.md` no change (adopter propagation is `.5`) · `claude/AGENTS-snippet.md` no change (`.5`) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (section is agent-neutral) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change.

- [x] Closed — PLAN.md `.2` line flipped to stub form `Completed 2026-06-07.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:** Added §"Downstream-impact reconciliation" to `SPEC/tasknote-selection.md` — the contract for the epic's core discipline. It defines two triggers (new-task filing · mid-flow direction-changing decision), a three-step scan (enumerate active PLAN entries → classify impact → propose reconcile action), an impact-classification table (stale/contradictory/redundant/unaffected), a reconcile-action table (merge/nest/edit/delete/leave), and a user-confirm gate that never auto-rewrites the plan. Contract-only and project-neutral (skills cited by slug, no task IDs; failure mode abstract, no adopter name) — the skill-wiring children (`.3`/`.4`) and adopter propagation (`.5`) consume it. Synced the `SPEC.md` module-summary as a doc-drift catch.

**Archived:** 2026-06-07
