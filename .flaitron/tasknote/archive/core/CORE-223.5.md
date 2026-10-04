---
title: spec-lazy-module-split audit
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-223, CORE-223.1, CORE-223.2, CORE-223.3, CORE-223.4]
---

# CORE-223.5 | spec-lazy-module-split audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-223]]

## 🎯 Goal

Verify the completed `CORE-EPIC-223` (`spec-lazy-module-split`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `chore: CORE-223.5 — audit CORE-EPIC-223` commit lands (no code edits; doc fixes inline)
- [ ] PLAN.md line for `CORE-223.5` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-223.5.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-223` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-223.5` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-223]] — parent epic (spec-lazy-module-split)
- [[CORE-223.1]] — discovery
- [[CORE-223.2]] — gates-module
- [[CORE-223.3]] — selection-module
- [[CORE-223.4]] — integration-wiring

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-223.5`; Step 2 pre-flight confirmed all four siblings closed, this is the highest `.N`. Cohort state at audit time: `.1`–`.4` all closed 2026-05-30 (same day); no early-audit decision needed.

- [x] Read relevant source files — read all four archived sibling tasknotes (Final Summary + Implementation Notes).

- [x] **Archive skim** — no non-cohort prior tasknotes touch the new lazy-module paths; the pattern is well-established (CORE-042.2, CORE-042.9). Cohort children are the authoritative history.

- [x] **Drift check** — verified current HEAD: SPEC.md = 25,789 chars, SPEC/gates.md = 10,116 chars, SPEC/tasknote-selection.md = 7,626 chars. Byte deltas match cohort claims (small variance: +19 bytes on both modules from `.4`'s `paths:` frontmatter addition). Module headings and pointer stubs verified in SPEC.md.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Cohort scope is complete (all four implementation children closed; no deferred work outstanding to the cohort).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort deliverables:**

- **CORE-223.1 (discovery):** Scoped the split — measured SPEC.md at 39,862 chars, identified two target modules (gates.md ≈−8,200 chars, tasknote-selection.md ≈−6,900 chars), mapped cross-ref rewiring, filed children `.2`/`.3`/`.4`. Files: PLAN.md + tasknote only.
- **CORE-223.2 (gates-module):** Created `SPEC/gates.md` (10,116 chars post-`.4` frontmatter); extracted §"Operator-gate cues", §"Phase 1→2 exit gate", §"Conditional skip rule" + consolidated §"`--fast` operator override" (deduped 4× restatement). SPEC.md: 39,862 → 32,528 chars (−7,334). Rewired 15 gate §-refs across 5 skills (ft-task ×4, ft-epic-discovery ×4, ft-close-epic ×3, ft-micro-task ×2, ft-release ×2). Deferred: GLOSSARY/PLATFORMS doc refs and `paths:` frontmatter → `.4`.
- **CORE-223.3 (selection-module):** Created `SPEC/tasknote-selection.md` (7,626 chars post-`.4` frontmatter); extracted §"When to use a tasknote" + §"PLAN.md filing-discipline thresholds" + §"`## Completed` archive convention" (promoted `###`→`##`). SPEC.md: 32,528 → 25,754 chars (−6,774). Rewired 23 selection §-refs across 14 skill/command/template files + SPEC.md internal ref + `claude/AGENTS-snippet.md` (scope refinement). Deferred: MIGRATION.md 150/292, AGENT-NEUTRALITY :34 → `.4`.
- **CORE-223.4 (integration-wiring):** Added `paths: []` frontmatter to both new modules; updated SPEC §"Lazy SPEC module frontmatter" enumeration (added `gates` · `tasknote-selection`); retargeted two broken GLOSSARY refs (l.29/83: `SPEC §"Conditional skip rule"` → `SPEC/gates.md §"Conditional skip rule"`). Verified SPEC.md at 25,789 chars (≈64% of 40k budget). Determined MIGRATION.md:150's `SPEC §"When to use a tasknote"` and PLATFORMS/AGENT-NEUTRALITY refs resolve to live SPEC anchors → no change.

**Two coherence misses found during audit drift check:**

1. **`docs/MIGRATION.md`:292** — `SPEC §"\`## Completed\` archive convention"` is now a broken ref: the heading `## \`## Completed\` archive convention` was moved to `SPEC/tasknote-selection.md` in `.3`; only a prose mention remains in SPEC.md's thin anchor. `.4` claimed it resolved to a live SPEC anchor — it does not (no heading exists in SPEC.md for this section). Fix: retarget to `SPEC/tasknote-selection.md §"\`## Completed\` archive convention"`.
2. **`docs/AGENT-NEUTRALITY.md`:35** — the ledger row citing `SPEC.md | §"Operator-gate cues", §"📝 Phase 1: Discovery", §"🧪 Phase 3: Testing & Linting", §"Conditional skip rule" (4 sites)` still attributes `§"Conditional skip rule"` to `SPEC.md`, but that heading now lives in `SPEC/gates.md`. SPEC.md retains only prose references (no heading). Fix: update the row's file column to note `SPEC.md + SPEC/gates.md` for this site, or split into two rows.

Both are small inline fixes (one line each). Applying in Phase 2.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a; audit is a verification pass over existing cohort deliverables. The two inline fixes follow the established AGENT-NEUTRALITY.md table row style and MIGRATION.md prose-link style.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — n/a (doc fixes only; no executable surface).

**Implementation Notes:**

Three inline fixes applied (two from initial Discovery, one additional found during verification grep):

1. **`docs/MIGRATION.md`:292** — retargeted `SPEC §"\`## Completed\` archive convention"` → `` `SPEC/tasknote-selection.md` §"\`## Completed\` archive convention" `` (heading moved to module in `.3`; SPEC.md pointer stub has no heading anchor). `.4` missed this.
2. **`docs/AGENT-NEUTRALITY.md`:35** — updated ledger row File column from `SPEC.md` to `SPEC.md + SPEC/gates.md`; split the "4 sites" into 3 in SPEC.md + 1 in SPEC/gates.md (§"Conditional skip rule" heading moved to gates.md in `.2`). `.4` missed this — it assessed AGENT-NEUTRALITY as "no moved-section refs" but line 35 explicitly named the moved section.
3. **`claude/commands/ft-micro-task.md`:12** — retargeted `SPEC §"Conditional skip rule"` → `` `SPEC/gates.md` §"Conditional skip rule" ``. Command stubs were in `.3`'s rewire scope for selection refs but not `.2`'s gate-ref scope; this one slipped through.

No misses requiring `/ft-file-followup` — all three are single-line corrections applied inline.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (markdown docs only).

- [x] Ran lint/type-check on changed code — n/a (no code; grep-verified: zero remaining broken `SPEC §"<moved-heading>"` refs across docs/ + claude/ + templates/).

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — n/a.

**Testing Notes:** Grep verified clean after all three fixes: no remaining bare `SPEC §"Conditional skip rule"`, `SPEC §"\`## Completed\` archive convention"`, or `SPEC §"Phase 1→2 exit gate"` refs pointing at SPEC.md (where those headings no longer exist). `SPEC §"When to use a tasknote"` and `SPEC §"Operator-gate cues"` refs left intact — thin anchors for both still live in SPEC.md at lines 290 and 431.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — no change (audit applied no changes to SPEC.md)
  - `docs/MIGRATION.md` — **updated** (l.292: retargeted `SPEC §"\`## Completed\` archive convention"` → `SPEC/tasknote-selection.md §…`)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (l.35: `SPEC.md` → `SPEC.md + SPEC/gates.md`; split 4-site count to 3+1)
  - `docs/PLATFORMS.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-30.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (inline on conditional skip).

**Final Summary:** Audited CORE-EPIC-223 (spec-lazy-module-split) cohort. Confirmed deliverables: SPEC.md shrunk from 39,862 → 25,789 chars (−35% / ≈64% of 40k budget); two lazy modules landed cleanly (`SPEC/gates.md` 10,116 chars, `SPEC/tasknote-selection.md` 7,626 chars); 38 §-refs rewired across the cohort (15 gate + 23 selection); `paths:` frontmatter and module-list registration wired in `.4`. Three dangling refs that slipped past per-task Phase 4 sweeps fixed inline: `MIGRATION.md`:292, `AGENT-NEUTRALITY.md`:35, `commands/ft-micro-task.md`:12. Cohort coherent; no regressions; no `/ft-file-followup` candidates.

**Archived:** 2026-05-30
