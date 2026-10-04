---
title: plan-cohesion-blast-radius audit
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301, CORE-301.1, CORE-301.2, CORE-301.3, CORE-301.4, CORE-301.5]
---

# CORE-301.6 | plan-cohesion-blast-radius audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]]

## 🎯 Goal

Verify the completed `CORE-EPIC-301` (`plan-cohesion-blast-radius`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-301.6 — audit CORE-EPIC-301` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-301.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-301.6.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-301` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-301.6` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)
- [[CORE-301.1]] — Discovery; resolved scope + child split
- [[CORE-301.2]] — reconciliation-contract (SPEC/tasknote-selection.md)
- [[CORE-301.3]] — wire-inline-filers (ft-file-followup + ft-starter-task)
- [[CORE-301.4]] — wire-epic-and-decisions (ft-epic-discovery + ft-task decision path)
- [[CORE-301.5]] — adopter-doc-propagation (AGENTS-snippet + glossary)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-301.6`; pre-flight passed — `.6` is the highest `.N` child of `CORE-EPIC-301` and all implementation siblings (`.1`–`.5`) are closed (no open-sibling gate). Capture cohort state at audit time: all five children closed 2026-06-07, no early-audit decision (full cohort).

- [x] Read relevant source files — all five cohort archives (`CORE-301.1`–`.5`), `.flowtron/tasknote/README.md` §"AI-referenced docs", the contract `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation", the four wired skills, `claude/AGENTS-snippet.md`, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md`, `SPEC.md` module summary

- [x] **Archive skim** — self-referential for this audit: the cohort children (`.1`–`.5`) are themselves the archive entries inventoried. No non-cohort surfaces with prior tasknote history beyond the cohort.

- [x] **Drift check** — every cited surface resolves at HEAD: contract anchor at `SPEC/tasknote-selection.md:131`; all four skill cites + AGENTS-snippet + glossary resolve to it; `SPEC.md` module summary names the scan (line 484); glossary entry present, count ~52 + stamp `CORE-301.5 (2026-06-07)`. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Full cohort, all five children closed, no partial-scope ambiguity. Audit scope = the canonical epic-audit shape (doc-drift sweep + cohort coherence).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort children inventoried (deliverables):**
- **CORE-301.1** (discovery) — scoped the epic; filed `.2`–`.5` child cohort + confirmed `.6` audit. Deliverable = PLAN lines, not code. Resolved-scoping table pinned: contract home = `SPEC/tasknote-selection.md`, triggers = filing + mid-flow decision, child split .2/.3/.4/.5.
- **CORE-301.2** (reconciliation-contract) — authored `## Downstream-impact reconciliation` in `SPEC/tasknote-selection.md` (triggers · 3-step scan · impact-classification table · reconcile-action table merge/nest/edit/delete/leave · user-confirm gate). Synced `SPEC.md` module summary as a doc-drift catch. Contract-only, project-neutral.
- **CORE-301.3** (wire-inline-filers) — wired the scan into `/ft-file-followup` (Step 3 scan + Step 4 apply) and `/ft-starter-task` (Step 3 scan + Step 5 apply); folds into existing review gate; routine-skip carve-out; cite-don't-restate; zero new lazy-load.
- **CORE-301.4** (wire-epic-and-decisions) — wired `/ft-epic-discovery` Step 7 (cohort scan as Phase-2 review prompt) + `/ft-task` Step 5 Phase 2 (direction-changing-decision hook parallel to the park hook; survives `--fast`). Two-banner cap preserved.
- **CORE-301.5** (adopter-doc-propagation) — `claude/AGENTS-snippet.md` behavioral bullet (adopter path) + `docs/GLOSSARY.md` alphabetized term (count/stamp bumped). `docs/MIGRATION.md` resolved no-change (mechanical-only doc). Verification sweep passed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass over existing cohort deliverables, no new code surface.

- [x] Implemented the minimal solution — verification work; findings below. No inline fixes needed (no inconsistencies surfaced).

- [x] Updated/added tests for non-trivial behavior — N/A (no code edits).

**Implementation Notes:**

**Coherence findings — no inconsistencies surfaced.** The cohort sits coherently:

- **Contract ↔ wiring fidelity.** The four skill wirings (`ft-file-followup:59`, `ft-starter-task:50`, `ft-epic-discovery:200`, `ft-task:137`) each cite `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" as authoritative and reproduce the contract's vocab verbatim — impact classes `stale / contradictory / redundant / unaffected`, reconcile actions `merge / nest / edit / delete / leave`, `## Completed` out of scope, `[[wikilink]]`-dependency surface. No drift between contract and wirings.
- **Style parity.** All four use the identical `**Downstream-impact reconciliation scan** (per … — authoritative for triggers, scan steps, and vocabulary)` lead-in (cite-don't-restate house idiom). Each carries a routine-skip carve-out (`.3` filers "Routine filings…"; `ft-epic-discovery` "fresh-area epic… (judgment)"; `ft-task` "stays inside the current task").
- **Intentional two-shapes asymmetry (not an inconsistency).** `.3`'s two inline filers fold the scan into an existing Step-3 pre-write review; `.4`'s two surfaces surface it as a dedicated review prompt (epic-discovery) / mid-execution hook (ft-task) with explicit "AskUserQuestion-style review prompt, not a banner — two-banner cap preserved" framing. This is the deliberate "two surfaces, two shapes" design from `.4`, consistent with `ft-epic-discovery` Step 5.5's pre-existing usage.
- **No contradictory cross-refs.** Adopter snippet uses the adopter-context path `.flowtron/core/SPEC/...`; glossary uses bare `SPEC/...` house style — intentional per-surface convention, both resolve to the live anchor.
- **Neutrality preserved.** Contract (SPEC) + AGENTS-snippet describe behavior with no Claude tool names. The literal `AskUserQuestion` appears only in the `claude/skills/` layer (Claude-specific by construction) and matches pre-cohort Step 5.5 usage — outside the AGENT-NEUTRALITY ledger's contract-layer scope (ledger line 58). No new ledger entry owed.
- **Zero new lazy-load** confirmed — `SPEC/tasknote-selection.md` was already in every wired skill's loader line.
- **No regressions** in earlier-shipped surfaces: `.2`'s `SPEC.md` module-summary sync (line 484) and `.5`'s glossary count/stamp remain accurate at HEAD.

**Misses logged as `/ft-file-followup` candidates:** none — the cohort is internally coherent and complete.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit verification pass; no code edits landed).

- [x] Ran lint/type-check on changed code — N/A (no code edits). Verification greps run during the coherence pass instead (cite resolution, vocab consistency).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:** Markdown-prose verification only — no test surface, no inline fix applied. Cite-resolution + vocab-consistency greps across the cohort all passed (see Phase 1 drift check + Phase 2 findings).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", at audit time (cumulative cohort footprint): `README.md` no change · `SPEC.md` no change (module summary at line 484 already names the reconciliation scan, synced in `.2`; accurate at HEAD) · `docs/MIGRATION.md` no change (`.5` verdict — mechanical adoption/bump doc, no behavioral surface; verified no stale filing-only claim) · `claude/AGENTS-snippet.md` no change (behavioral bullet added in `.5`; resolves to live anchor) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change (scan is user-gated; no new injection surface) · `docs/AGENT-NEUTRALITY.md` no change (contract layer stays neutral; `AskUserQuestion` confined to the Claude skill layer per ledger line 58) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change. All cohort doc edits landed inside their respective children's closures — nothing left stale.

- [x] Closed — PLAN.md `.6` line flipped to stub form `Completed 2026-06-07.` (nested in place under `CORE-EPIC-301`; parent flip pending the Step 9 prompt) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:** Audited the completed `CORE-EPIC-301` (`plan-cohesion-blast-radius`) cohort — no inconsistencies surfaced; the slice sits coherently in the codebase. Verified contract↔wiring fidelity across all four wired skills (each cites `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" as authoritative and reproduces its vocab verbatim), confirmed the intentional "two surfaces, two shapes" asymmetry between `.3`'s fold-into-review filers and `.4`'s review-prompt/decision-hook surfaces, and validated neutrality (contract + snippet agent-neutral; `AskUserQuestion` confined to the Claude skill layer). Fixed doc-drift sweep clean — all eleven AI-referenced docs no-change at audit time (cohort edits landed in their own children's closures). No misses → no `/ft-file-followup` candidates. No code edits landed (verification-only audit).

**Archived:** 2026-06-07
