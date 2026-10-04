---
title: sop-currency-recheck
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-386, CORE-390, CORE-391, CORE-393, CORE-387]
---

# CORE-395 | sop-currency-recheck

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-386]] [[CORE-390]] [[CORE-391]] [[CORE-393]] [[CORE-387]]

## 🎯 Goal

Re-check `SPEC/procedures/ft-task.md` against its `source:`
(`claude/skills/ft-task/SKILL.md`), close the content drift accumulated since
the `v5.13.0 · 2026-07-21` stamp, and bump `last-verified:`.

## ✅ Acceptance

- [x] Every task named in the drift span (CORE-386 · CORE-390 · CORE-391 · CORE-393 · CORE-387) is adjudicated in Discovery Notes as *already landed* or *fixed here* — none left unexamined
- [x] Debug mode (CORE-390) is represented in the SOP: a neutral primitive symmetric with `autonomous mode`, the Phase 1 hypothesis prompts, and the Phase 3 repro re-verify
- [x] The `SPEC/gates.md` §"Rationalizations" / §"Red Flags" pair (CORE-386) is routed to from the SOP's gate prose
- [x] The downstream-impact reconciliation scan is present in the SOP's Phase 2 bullet
- [x] `last-verified:` reads `v5.14.1 · 2026-08-02`, matching `SPEC.md` **Version:**
- [x] SOP still **routes** rather than copies — no Claude-specific machinery (`AskUserQuestion`, slash dispatch, `--fast`/`--debug` as required syntax) leaks into the neutral layer
- [x] Per-platform pointer wrappers (`codex/`, `grok/`) verified unchanged — they point, they do not restate
- [x] PLAN.md line flipped to stub form under `## Completed`; tasknote archived to `.flowtron/tasknote/archive/core/CORE-395.md`

## 🧩 Subtasks

- [x] Add a `debug mode` row to the agent-neutral primitives table, symmetric with `autonomous mode`
- [x] Add the hypothesis-first block to Step 4 (Phase 1), routed to the source fragment
- [x] Add the repro re-verify obligation to Step 5 (Phase 3), noting it survives autonomous mode
- [x] Add the debug recap clause to Step 5 (Phase 4)
- [x] Add the downstream-impact reconciliation scan to Step 5 (Phase 2)
- [x] Route to `SPEC/gates.md` §"Rationalizations" / §"Red Flags" from the gate prose
- [x] Bump `last-verified:` to `v5.14.1 · 2026-08-02`
- [x] Verify no `/ft-debug` or `/ft-sidequest` residue anywhere in the SOP or its wrappers

## 🔗 Related

- [[CORE-390]] — debug-mode-fold; the one named drift item with no SOP representation
- [[CORE-386]] — skill-rationalizations-redflags; widened SPEC.md's gate-routing clause, never mirrored here
- [[CORE-387]] — cross-artifact-consistency; already landed in the SOP
- [[CORE-391]] — sidequest-fold; already landed in the SOP
- [[CORE-393]] — phase4-closure-hygiene; already landed in the SOP
- [[CORE-361]] — release v5.13.0; precedent that `last-verified:` is a SOP↔source stamp, deliberately *not* bumped at release time

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The stamp is genuinely stale (`v5.13.0` vs `SPEC.md` `v5.14.1`) and the re-check found real, un-mirrored content drift — the SOP has no representation of debug mode at all after CORE-390 retired `/ft-debug` into `/ft-task --debug`.

- [x] Read relevant source files

- [x] **Best Practices Review** — `N/A` for code boundaries; this is a documentation-layer task. The governing boundary is editorial: `SPEC/procedures/README.md` establishes the "route, don't copy" posture (locked at [[CORE-091]] / [[CORE-270]]), so every addition must point at its canonical home rather than restate the contract. The SOP's own established shape — compact one-line restatement + link to authority — is the pattern to extend; no new section shape is warranted.

- [x] **Archive skim** — `grep -ln "SPEC/procedures/ft-task.md" archive/core/*.md` returned 15 hits. The load-bearing one is [[CORE-361]] (release v5.13.0), whose Implementation Notes record an explicit residue adjudication: `SPEC/procedures/ft-task.md:4 last-verified: v5.12.0 · 2026-07-16 left untouched per CORE-356 precedent — SOP↔source currency stamp, not a release pin or dogfood row.` That settles the semantics this task depends on: the stamp tracks SOP↔source sync, not the release train, so bumping it is this task's job and not the releaser's.

- [x] **Drift check** — cited facts verified against the tree, not recalled. `SPEC/procedures/ft-task.md:4` reads `last-verified: v5.13.0 · 2026-07-21`; `SPEC.md:3` reads `**Version:** v5.14.1` — the discrepancy in the PLAN line is real. Commit-level cross-reference of `source:` vs SOP since `v5.13.0` is in Discovery Notes below. Cross-artifact half: the plan formed here contradicts no SPEC contract — `SPEC/procedures/README.md` §"Frontmatter schema" defines `last-verified:` as "bumped when the SOP is re-checked against `source:`", which is exactly this operation, and the "route, don't copy" posture constrains *how* the additions are written rather than forbidding them.

- [x] Asked clarifying questions — one scope ask (AskUserQuestion): whether pre-existing SOP gaps surfaced by the re-check but predating the stamp are in scope. **Operator chose the recommended option:** named drift (CORE-390, CORE-386) **plus** the downstream-impact reconciliation scan; the filing-discipline >70w advisory stays out as Claude-specific skill machinery the neutral layer deliberately does not restate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Commit-level drift ledger.** `git log v5.13.0..HEAD` on both files:

| Touched `source:` (SKILL.md) | Touched SOP | Verdict |
|---|---|---|
| CORE-362.3, CORE-363, CORE-381, CORE-393, CORE-391 | yes (all) | in sync |
| — | CORE-387 | in sync (SOP-only mirror) |
| **CORE-390** debug-mode-fold | **no** | **drift — fixed here** |
| CORE-385 skill-trigger-frontmatter | no | no SOP surface — the commit changed only SKILL.md's YAML `description:`, a Claude skill-dispatch field with no neutral-layer equivalent |

**CORE-390 (the substantive gap).** The commit retired `/ft-debug` (skill + command + Codex mirror deleted) and folded it into `/ft-task --debug` behind `claude/skills/ft-task/step-4-debug-mode.md`. It propagated to `SPEC.md`, `SPEC/gates.md`, `SPEC/model.md`, `SPEC/tasknote-selection.md`, both `AGENTS-snippet.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md` — but not to the procedure SOP. Result: `grep -i debug SPEC/procedures/ft-task.md` returns zero hits. A contract-only agent driving from this SOP cannot know debug mode exists, and the neutrality treatment is asymmetric — `--fast` earned a neutral `autonomous mode` primitive at the top of the file, `--debug` earned nothing.

**CORE-386 (pointer-only).** Touched `SPEC.md`, `SPEC/gates.md`, `claude/skills/ft-audit/SKILL.md` — not `source:`, so it is not source-drift in the strict sense. But it widened `SPEC.md`'s gate-routing clause to name the new `SPEC/gates.md` §"Rationalizations" / §"Red Flags" pair, and the SOP carries the parallel routing clause without the addition. The pair is anti-shortcut prose aimed squarely at agents driving gates conversationally — precisely the SOP's audience — so the pointer belongs here.

**CORE-387 / CORE-391 / CORE-393 — already current.** Each landed its SOP hunk in the same commit as its `source:` hunk: CORE-387 widened the Drift check bullet (`503a336`), CORE-391 dropped `/ft-sidequest` from the context-dependent-skills exception (`dec93c7`), CORE-393 added the Acceptance tick-through and the no-nav-chip-flip carve-out to the Phase 4 bullet (`3a86452`). No action.

**Pre-existing gaps (predate the stamp).** The reconciliation scan (CORE-301.4) and the filing-discipline >70w advisory (CORE-104) were both absent from the SOP before `v5.13.0`, so neither is drift *since* the stamp. Adjudicated by operator choice: the reconciliation scan is a `SPEC/tasknote-selection.md` **contract rule that changes what the agent does** in Phase 2 — a genuine floor gap — and is in scope. The >70w advisory is a warning-message shape belonging to Claude's skill machinery, not the contract, and stays out.

**Wrappers verified.** `codex/procedures/ft-task.md` and `grok/procedures/ft-task.md` are both 7-line pointers that link the SOP and state "This file routes; it does not restate the procedure." Neither carries `/ft-debug` or `/ft-sidequest` residue. No change needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the SOP's own established shape rather than inventing one. Debug mode enters through the same door `--fast` already uses: a row in the agent-neutral primitives table that leads with the neutral concept and demotes the Claude flag to a parenthetical. The Phase 1 / 2 / 3 / 4 additions each attach to the existing bullet for that phase instead of opening a new section, matching how CORE-387 and CORE-393 widened bullets in place.

- [x] **Minimal refactor gate** — no restructuring. Every edit is an insertion into an existing table, bullet, or paragraph; no section was moved, renamed, or split. The one file touched beyond the SOP (`docs/AGENT-NEUTRALITY.md`) got a single appended table row, not an edit to existing rows.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`; documentation-layer change with no executable surface. The SOP is prose loaded by contract-only agents, not parsed by `viz/src/parser.ts` or any other code path.

**Implementation Notes:**

Seven edits to `SPEC/procedures/ft-task.md` (+73/−3, file now 327 lines) plus one to `docs/AGENT-NEUTRALITY.md` (+1).

**Debug mode (CORE-390) — five insertions:**

1. §"When to run this procedure" — one paragraph naming debug mode as an entry variant, pointing at the primitives table. It stays a full tasknote; only what Phases 1–4 record changes.
2. §"Agent-neutral primitives" — a `debug mode` row symmetric with `autonomous mode`: neutral concept first, `--debug` as the Claude spelling, explicit-opt-in-only, adds content and no mechanics.
3. Same section — a composition paragraph: the two modes are orthogonal, and under both the repro re-verify still runs (it is not a gate autonomous mode may suppress).
4. Step 4 (Phase 1) — the four hypothesis prompts compactly restated (expected vs observed · ranked hypotheses · minimal repro · run-and-update), framed as guidance-not-a-gate, with the autonomous-mode variant, routed to `claude/skills/ft-task/step-4-debug-mode.md` for full detail.
5. Step 5 — three clauses: Phase 2 emphasis (weight the survey toward the suspect area; smallest hypothesis-testing edit; name the hypothesis in Implementation Notes), Phase 3 repro re-verify (**runs even under autonomous mode**; a still-failing repro returns to Phase 2, not closure), and the Phase 4 recap clause (name the top hypothesis; state whether the repro passes).

**Rationalizations / Red Flags (CORE-386) — one insertion:** a paragraph after the operator-cue vocabulary routing to `SPEC/gates.md` §"Rationalizations" / §"Red Flags", framed as advisory prose aimed at exactly this layer — an agent driving gates conversationally rather than through enforced skill machinery.

**Downstream-impact reconciliation scan — one insertion:** appended to the Phase 2 bullet: trigger (direction-changing decision reaching beyond the task), the enumerate → classify → propose sequence, the operator-confirm, the not-a-third-banner note, and the runs-even-under-autonomous-mode carve-out; routed to `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation" for the authoritative version.

**Stamp:** `last-verified: v5.13.0 · 2026-07-21` → `v5.14.1 · 2026-08-02`, matching `SPEC.md:3`.

**Neutrality-ledger row (`docs/AGENT-NEUTRALITY.md`).** Surfaced by the doc-drift sweep, not by the ticket. The ledger's `--fast` row covered `SPEC.md` + `SPEC/gates.md` but never `SPEC/procedures/ft-task.md`, which already carried a `--fast` reference before this task — so adding `--debug` to the same file would have compounded an unregistered Claude-flag reference in the neutral layer, and a future neutrality audit would have flagged both. One appended row now registers the SOP's two primitive-table flag references and the `step-4-debug-mode.md` derivation pointer, with the justification that the primitives table is the designated place for naming a platform's spelling of a neutral operation. In-scope closure work, not scope creep: the sweep is a mandatory Phase 4 step and this was its finding.

**Deliberately not done.** The filing-discipline >70w advisory (CORE-104) stays out per the Phase 1 scope decision — it is a warning-message shape belonging to Claude's skill machinery, not a contract rule, and the neutral layer does not restate skill polish.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz run test`: 18 files, 242 tests, all passing (standing gate; no viz surface touched)

- [x] Ran lint/type-check on changed code — `N/A` for linting: markdown only, no linted surface. Substituted structural verification, below.

- [x] **Quality assertions** — no duplication introduced (each addition attaches to the phase bullet that owns it; nothing is stated twice in the file), no dead prose, no new section shape, and the "route, don't copy" posture holds — every addition names its canonical home rather than restating the contract. Public surface grew by exactly one primitives row, mirroring the one already there.

- [x] (frontend) Visual confirmation not needed — no frontend surface; documentation-layer change only

**Testing Notes:**

**Link integrity.** All ten link targets resolve from `SPEC/procedures/`: `../gates.md`, `../blocked.md`, `../tasknote-selection.md`, `../model.md`, `../epic.md`, `../starter.md`, `../../SPEC.md`, `../../claude/skills/ft-task/SKILL.md`, `../../claude/skills/ft-task/step-4-debug-mode.md`, `../../docs/AGENT-NEUTRALITY.md`.

**Anchor existence** (the sections the new pointers claim exist): `SPEC/gates.md:311` `## Rationalizations`, `SPEC/gates.md:340` `## Red Flags`, `SPEC/tasknote-selection.md:166` `## Downstream-impact reconciliation`. All three verified present, not assumed.

**Retired-skill residue.** `grep -n "ft-debug\|ft-sidequest\|ft-quality"` across `SPEC/procedures/ft-task.md`, `codex/procedures/ft-task.md`, `grok/procedures/ft-task.md` → clean. No dangling reference to any of the three skills retired since the last stamp.

**Stamp consistency.** `SPEC/procedures/ft-task.md:4` `last-verified: v5.14.1 · 2026-08-02` matches `SPEC.md:3` `**Version:** v5.14.1`.

**Wrappers unchanged.** `codex/procedures/ft-task.md` and `grok/procedures/ft-task.md` remain 7-line pointers; neither restates the procedure, so neither needed an edit for the new content to reach Codex and Grok agents.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change; `SPEC.md` no change (§"Procedure SOPs" describes the layer, not SOP contents); `docs/MIGRATION.md` no change (SOPs are not adopter-installed surfaces); `claude/AGENTS-snippet.md` no change; `codex/AGENTS-snippet.md` no change (verified: carries no `debug` or `procedures` reference to go stale); `docs/CONVENTIONS.md` no change; `CONTRIBUTING.md` no change; `SECURITY.md` no change; **`docs/AGENT-NEUTRALITY.md` — updated**, one appended ledger row registering the SOP's `--fast`/`--debug` primitive-table references and the `step-4-debug-mode.md` derivation pointer; `docs/PLATFORMS.md` no change (already current — CORE-390 landed debug mode at lines 31 and 223–224, and line 32 confirms Codex's `ft-task` routes through this SOP, which is what made the gap functional rather than cosmetic); `claude/CAPABILITIES.md` no change (Claude capability stamp, unaffected by an SOP re-check); `docs/AGENT-COMPAT.md` no change (dogfood currency rows advance only on a real verification run, which this task did not perform).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-08-02.` at the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/CORE-395.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

`SPEC/procedures/ft-task.md` — the agent-neutral SOP that Codex and Grok agents actually drive `ft-task` from — had fallen behind its `source:` by one substantive feature: CORE-390 retired `/ft-debug` into `/ft-task --debug` and propagated the fold to eight files, but not to the SOP, leaving contract-only agents with no way to know debug mode exists. This task closed that gap and bumped the currency stamp.

The re-check adjudicated all five tasks in the ticket's named drift span. Three (CORE-387, CORE-391, CORE-393) had already landed their SOP hunks in the same commit as their `source:` hunks and needed nothing. CORE-390 was the real gap. CORE-386 was a pointer-only miss — it widened `SPEC.md`'s gate-routing clause to name the new §"Rationalizations" / §"Red Flags" pair without mirroring it here.

**Changed:** `SPEC/procedures/ft-task.md` (+73/−3, 327 lines) — debug mode across five insertion points (entry note · primitives row · composition note · Phase 1 four-prompt block · Phase 2/3/4 clauses), the gates anti-shortcut pointer, the downstream-impact reconciliation scan, and the stamp bump to `v5.14.1 · 2026-08-02`. `docs/AGENT-NEUTRALITY.md` (+1) — one ledger row.

**Verified:** viz 242/242 passing; all ten link targets resolve; all three newly-cited section anchors confirmed present in `SPEC/gates.md` and `SPEC/tasknote-selection.md`; zero retired-skill residue across the SOP and both wrappers; stamp matches `SPEC.md` **Version:**.

**Refactors:** none made — every edit is an insertion into an existing table, bullet, or paragraph. One deferred: the filing-discipline >70w advisory stays out of the neutral layer as Claude-specific skill machinery.

**Documentation verdict:** one AI-referenced doc updated (`docs/AGENT-NEUTRALITY.md`); eleven verified unchanged, `docs/PLATFORMS.md` explicitly re-read rather than assumed.

**Maintainability effect:** the asymmetry that let this drift hide is gone — `--debug` now has the same neutral-primitive treatment `--fast` has, so the next mode-shaped feature has an obvious slot to land in. Registering the SOP's flag references in the neutrality ledger closes a second latent gap: a future audit would have flagged the pre-existing unregistered `--fast` reference and the new `--debug` one together.

**Archived:** 2026-08-02
