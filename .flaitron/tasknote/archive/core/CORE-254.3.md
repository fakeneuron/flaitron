---
title: cue-contract-codify
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-254.1, CORE-254.2, CORE-254.4]
---

# CORE-254.3 | cue-contract-codify

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]] [[CORE-254.1]] [[CORE-254.2]] [[CORE-254.4]]

## 🎯 Goal

Codify the CORE-254.2 canonical operator-cue vocabulary into the contract — the full §1–§4 cue table into `SPEC/gates.md`, a cold-start cue glossary into `SPEC.md` core, the retrofit labels (🟢 GO / 👁️ CONFIRM / 🔍 AUDIT), and a bounded escalation contract for destructive 🗄️/▶️ cues that deliberately revises the CORE-065 two-banner cap while keeping cues inline-by-default.

## ✅ Acceptance

- [ ] The §1–§4 canonical cue vocabulary from CORE-254.2 is recorded in `SPEC/gates.md` as a contract section (the three new event cues 🗄️/▶️/✋, the retrofitted inline asks 🟢/👁️/🔍 with labels, the reaffirmed landmark 🛠️📦🏁✅ and next-task 🔧🧠 cues, plus the glyph+UPPERCASE-label convention + its non-render-survival rationale)
- [ ] `SPEC.md` core carries a cold-start cue glossary (decided shape per Discovery) so an AI consuming only core sees the cue vocabulary; it points to `SPEC/gates.md` for the full contract
- [ ] The retrofit labels (🟢 GO / 👁️ CONFIRM / 🔍 AUDIT) are codified in the contract layer (label wiring at emission sites is CORE-254.4)
- [ ] A **bounded escalation contract** for destructive 🗄️/▶️ cues is codified: escalation predicate, escalated-banner format, and the bound that keeps cues inline-by-default — written as a deliberate, scoped revision of the CORE-065 two-banner cap
- [ ] The "up to two banners" cap language is reconciled everywhere it appears (`SPEC.md` core §"The 4-phase workflow", `SPEC/gates.md`, Phase 3 "gate count stays at up-to-2") so the destructive-action banner does not read as a contradiction
- [ ] Control-marker integrity (injection defense) note in gates.md still holds for any newly-added markers
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs": per-entry "no change" or the update

## 🧩 Subtasks

- [ ] Decide cold-start glossary shape in `SPEC.md` core (compact full cue-table vs. pointer) — resolved in Discovery via AskUserQuestion
- [ ] Decide destructive-escalation predicate shape (enumerated list + conservative valve, and which way the valve biases) — resolved in Discovery
- [ ] Phase 2: add the canonical cue-vocabulary section (§1–§4 + conventions) to `SPEC/gates.md`
- [ ] Phase 2: codify the bounded destructive-escalation contract in `SPEC/gates.md` (predicate + banner format + bound), revising the two-banner-cap language
- [ ] Phase 2: reconcile every "up to two banners" / "up-to-2" mention across `SPEC.md` core + `SPEC/gates.md`
- [ ] Phase 2: add the cold-start cue glossary to `SPEC.md` core per the Discovery decision
- [ ] Phase 3: markdown mental-pass (glyph uniqueness, label casing, table integrity, cross-ref correctness, no cap contradictions)
- [ ] Phase 4: doc-drift sweep + flip .3 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-254]] — parent epic (cross-agent-operator-cues)
- [[CORE-254.1]] — Discovery; resolved escalation-allowed + retrofit-all scoping
- [[CORE-254.2]] — defines the canonical cue vocabulary table this task codifies
- [[CORE-254.4]] — wires the codified cues + labels into skill prose (downstream)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Third child of CORE-EPIC-254; the .2 vocabulary table (closed 2026-06-01) is the upstream dependency and is complete. Codification must land before .4 wiring. Scope unchanged from the filed line; the escalation-allowed + retrofit-all decisions were locked in .1/.2.

- [x] Read relevant source files

- [x] **Archive skim** — surfaced prior decisions on the cue/gate surface

- [x] **Drift check** — file paths and structure cited in the task description still match HEAD

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source surface confirmed at HEAD:**

- `SPEC/gates.md` — `paths: []` lazy module. §"Operator-gate cues" holds the two-banner cue surface + banner format + trigger table + control-marker integrity note; §"Phase 1→2 exit gate"; §"Conditional skip rule"; §"`--fast` operator override". This is where §1–§4 + the escalation contract land.
- `SPEC.md` core — §"The 4-phase workflow" → "Operator-gate cues" (line ~293, "up to two") points at gates.md; §"🧪 Phase 3" carries the 👁️ ask + "gate count stays at up-to-2" (~line 358); §"Post-closure protocol" specs 🟢/🏁/🔍/🔧/🧠 inline. The cold-start glossary lands here.
- `templates/tasknote-template.md` — section-heading glyphs only; no cue contract. No edit needed (template/skill wiring is .4).

**Inputs (the spec I codify to):** CORE-254.2's "CANONICAL OPERATOR-CUE VOCABULARY" table (§1 new event cues 🗄️ DB / ▶️ RUN / ✋ ACTION; §2 retrofit 🟢 GO / 👁️ CONFIRM / 🔍 AUDIT; §3 reaffirmed landmarks 🛠️📦🏁✅; §4 next-task 🔧🧠) + the glyph+UPPERCASE-label convention + the recorded-but-deferred bounded-escalation note (the contract is *this* task's to write).

**Archive skim findings (load-bearing invariants):**
- **CORE-065** (`trim gates to 2`) — origin of the two-banner cap. This task deliberately revises it; the revision must stay *bounded* (cues inline-by-default) so it doesn't reintroduce the proliferation CORE-065 cut.
- **CORE-211.x** (gate-clarity-agent-neutral) — cue framing must stay agent-neutral. The glyph+UPPERCASE-label convention satisfies this by construction.
- **CORE-068** (🏁), **CORE-184/190** (🔍 audit flag), **CORE-189** (copy-paste grammar), **CORE-208.x** (🔧🧠) — the reaffirmed cues' origins; codification must not alter their existing semantics.
- **CORE-250** (injection-threat-model-harden) — gates.md §"Operator-gate cues" → "Control-marker integrity" enumerates the assistant-emitted markers. Any new marker text I add must be covered by that note.

**Drift check:** No drift. gates.md §"Operator-gate cues"/§"Conditional skip rule" and SPEC.md core §"The 4-phase workflow"/§"Post-closure protocol" match the structure cited in the .2 downstream-impact note. The two-banner-cap language lives at SPEC.md:293, gates.md:16, and the SPEC.md Phase-3 "up-to-2" note (~358).

**Resolved clarifications (AskUserQuestion, two rounds):**

| # | Question | Resolution |
|---|---|---|
| 1 | Destructive-escalation bias | **Broad + fire-on-doubt** — escalate 🗄️/▶️ to a banner whenever an action *might* be destructive/irreversible; on doubt fire. Mirrors the perf-narrative "fire on doubt" valve in §"Conditional skip rule". |
| 2 | Is the .2 vocabulary comprehensive? (operator raised: visit-URL? summary? light/heavy?) | **Codify .2's 11 as-is — no new glyphs.** light/heavy already in §4 (🔧/🧠). visit-URL is covered by 👁️ CONFIRM (already embeds the localhost URL); summary is anchored by 🏁 (carries the 1-2 sentence accomplishment line). Document both coverages explicitly in the contract rather than minting cues. Keeps scan surface tight; respects .2's closure. |
| 3 | SPEC.md core glossary shape | **Compact full cue table** — at-a-glance glyph·label·meaning table of all cues in core + pointer to gates.md for the full contract (cold-start sessions see the whole vocabulary without loading the lazy module). |

**Scope note:** Q2 was an operator-raised completeness check on .2's (closed) vocabulary. Resolved to "no change" — .3 stays a pure codification of the 11 cues; no vocabulary expansion. The escalation-bias (Q1) and glossary-shape (Q3) choices are policy/structure *within* the already-planned subtasks, not new files or a new approach.

**Exit-gate judgment (default-skip flavor):** Discovery surfaced no significant scope deviation — the completeness detour landed on "codify as-is", and the two policy/structure picks live inside the pre-planned subtasks (no file-set change, no approach change, no restructured subtask list). → **skip 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended gates.md's existing section/table style and the standard `AWAITING APPROVAL` banner block. The escalated destructive-action banner reuses that exact block (cue glyph + label + mandatory preview line) rather than inventing a new shape; the three event cues follow the established 👁️/🟢 inline-prefix shape (per .2's survey). Bare task-IDs in prose (CORE-065, CORE-254.x) match the established gates.md/SPEC.md prose style — wikilinks are reserved for PLAN.md / tasknote bodies.

**`SPEC/gates.md`:**
- New `## Operator-cue vocabulary` section (after §"Operator-gate cues"): labeling + casing conventions; §Event cues (🗄️ DB / ▶️ RUN / ✋ ACTION); §Inline asks retrofit (🟢 GO / 👁️ CONFIRM — documented to cover visit-URL / 🔍 AUDIT); §Landmark cues (🛠️📦🏁✅ — 🏁 documented as the work-summary anchor); §Next-task cues (🔧/🧠); and `### Destructive-action escalation` — the bounded contract (broad fire-on-doubt predicate, banner format, the inline-by-default bound, `--fast` does-not-suppress).
- §"Operator-gate cues" intro: "up to two operator-gate banners" → "up to two **standing phase-gate** banners"; added the orthogonal destructive-action-banner sentence + forward-pointer.
- Trigger table: added the conditional in-execution destructive-action row.
- Module intro + control-marker-integrity note: extended to cover the new vocabulary + the escalation banner as an assistant-emitted marker.

**`SPEC.md` core:**
- §"Operator-gate cues": "up to two" → "up to two **standing phase-gate** banners" + orthogonal-escalation sentence; pointer now also names the cue vocabulary.
- New `### Operator-cue glossary`: compact at-a-glance glyph·label·meaning table of all cues for cold-start sessions, pointing to gates.md for the full contract.
- §"🧪 Phase 3": "gate count stays at up-to-2" → "the standing phase-gate count is unaffected".

**Scope boundary held:** emission-site label wiring (🟢 GO / 👁️ CONFIRM / 🔍 AUDIT in skill prose + examples) and `ft-epic-discovery/SKILL.md:144`'s "two-banner cap is preserved" phrasing are CORE-254.4's lane — left untouched here. .3 codifies the contract; .4 wires it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure contract-markdown edits to `SPEC.md` + `SPEC/gates.md` — no executable surface. The viz suite (`test`/`typecheck`/`lint`) parses PLAN.md task lines + tasknote frontmatter, not SPEC docs, so all three are N/A (matches the .1/.2 markdown-deliverable precedent). Markdown mental-pass:
- **Cap consistency:** grep confirms all four cap mentions (SPEC.md:293, SPEC.md:387, gates.md:17, gates.md:156) now read "standing phase-gate" and frame the escalation as orthogonal — no contradiction.
- **Anchor/cross-ref integrity:** `## Operator-cue vocabulary` + `### Destructive-action escalation` exist in gates.md; SPEC.md's two pointers resolve to them; `../docs/AGENT-COMPAT.md` relative path correct from SPEC/.
- **Glyph uniqueness / casing:** 11 cues, 11 distinct glyphs; labels UPPERCASE single words; banner labels keep `AWAITING APPROVAL — …`.
- **Table integrity:** all new tables have aligned pipe counts; inline code spans render.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change (no cue/banner mention)
  - `SPEC.md` — **updated by this task** — added `### Operator-cue glossary` (compact cold-start cue table), reconciled the "up to two" cap to "standing phase-gate banners" + orthogonal-escalation note, Phase-3 "gate count stays at up-to-2" → "standing phase-gate count is unaffected"
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change — §"Forged in-content control-markers" (line 86) is an *illustrative* enumeration that defers to `SPEC/gates.md` §"Control-marker integrity" as the authoritative clause; that note **was** updated to include the destructive-action banner. The new banner is an approval pause, not a gate-bypass vector, so it adds nothing to the injection illustration
  - `docs/AGENT-NEUTRALITY.md` — no change (the glyph+UPPERCASE-label cue vocabulary is agent-neutral by construction; no new Claude-specific surface; the cited `--fast`-ledger anchors still exist)
  - `docs/PLATFORMS.md` — no change (§"Operator-gate cues" anchor intact; the `--fast`-equivalent suppression description correctly lists 👁️ + 📦, consistent with the destructive-action banner being non-suppressible)
  - `claude/CAPABILITIES.md` — no change (the `--fast` row's enumerated suppressions stay accurate; the destructive-banner non-suppression nuance is for `.4`/`.5` to fold in when they touch CAPABILITIES for cross-agent currency)
  - `docs/AGENT-COMPAT.md` — no change (matrix-row + cross-agent verification is `.5`'s lane; this task only added a forward-pointer to it from gates.md)

  (`SPEC/gates.md` — the primary edited file — is a lazy module, not a cold-start sweep entry per README §"AI-referenced docs".)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` (subtask flipped in place under the parent epic; the parent `CORE-EPIC-254` flips at `.6` audit close per SPEC/epic.md) and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Codified CORE-254.2's canonical operator-cue vocabulary into the contract. Added a new `## Operator-cue vocabulary` section to `SPEC/gates.md` — the labeling (`<glyph> <UPPERCASE-LABEL>`) + casing conventions, the three new event cues (🗄️ DB / ▶️ RUN / ✋ ACTION), the retrofitted inline asks (🟢 GO / 👁️ CONFIRM / 🔍 AUDIT, with 👁️ CONFIRM documented to cover visit-URL), the reaffirmed landmark (🛠️📦🏁✅, 🏁 documented as the work-summary anchor) and next-task (🔧/🧠) cues. Codified the **bounded destructive-action escalation** (operator-chosen broad/fire-on-doubt predicate, standard banner format, the inline-by-default bound, `--fast` does-not-suppress) as a deliberate, scoped revision of the CORE-065 two-banner cap. Reconciled every "up to two" / "up-to-2" mention across `SPEC.md` core + `SPEC/gates.md` to "standing phase-gate banners" so the new banner reads as orthogonal, not contradictory; extended the control-marker-integrity injection note to cover it. Added a compact cold-start `### Operator-cue glossary` to `SPEC.md` core. Held the scope boundary: emission-site label wiring + `ft-epic-discovery/SKILL.md` cap phrasing are CORE-254.4's lane. No executable surface — pure contract markdown.

**Archived:** 2026-06-01
