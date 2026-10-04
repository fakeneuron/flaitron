---
title: third-glyph-contract
status: completed
tags: []
created: 2026-07-13
due:
related-tasks: [CORE-EPIC-353, CORE-353.1, CORE-353.2]
---

# CORE-353.3 | third-glyph-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-353]]

## 🎯 Goal

Add a third post-closure next-move suggestion glyph for `[medium]` candidates — reversing CORE-254's two-glyph lock — and define it across the three contract surfaces (SPEC.md cue glossary + post-closure protocol, SPEC/model.md §"Tier ladder vs. next-move glyph", SPEC/gates.md next-task cue table), including the glyph char and its firing rule.

## ✅ Acceptance

- [ ] A third glyph char + `MEDIUM` label chosen for `[medium]` next-move candidates (glyph unique across the SPEC/gates.md cue table)
- [ ] SPEC.md cue glossary row + post-closure protocol updated: three-valued glyph set (`[light]`🔧 / `[medium]`<X> / `[heavy]`🧠), firing rule stated
- [ ] SPEC/gates.md §"Next-task cues" table + surrounding prose updated from binary to three-valued; CORE-254/CORE-259 "stays binary" claims reconciled
- [ ] SPEC/model.md §"Tier ladder vs. the next-move suggestion glyph" rewritten: glyph now mirrors the three-rung ladder 1:1 (was: deliberately binary), firing rule for concrete tokens via inherent tier
- [ ] Firing rule defined: `[light]`/light-tier → 🔧, `[medium]`/medium-tier → <X>, `[heavy]`/heavy-tier → 🧠 (candidate line + copy-paste label line both)
- [ ] Contract-only scope confirmed: this task defines the contract; emitter propagation across skills is sibling `.4` (no skill edits here)
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Choose the glyph char + label via structured ask (candidates + rendered previews)
- [ ] Rewrite SPEC/model.md §"Tier ladder vs. the next-move suggestion glyph" — binary → three-valued 1:1 mirror of the ladder
- [ ] Update SPEC.md §"Operator-cue glossary" glyph row + §"Post-closure protocol" steps 2-3 (candidate-line + copy-paste-line emission)
- [ ] Update SPEC/gates.md §"Next-task cues" table + the "stays binary 🔧/🧠" prose in the 👇 paragraph
- [ ] Markdown mental-pass; cross-ref integrity check on the three edited files
- [ ] Phase 4: doc-drift sweep + flip PLAN.md line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-353]] — parent epic (refresh-model-roster)
- [[CORE-353.1]] — Discovery; locked "add a third glyph" as the decision this task executes
- [[CORE-353.2]] — sibling; reworked SPEC/model.md calibration baseline (adjacent section)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches CORE-353.1's filed scope exactly (reverse the two-glyph lock, add a `[medium]` glyph, define across SPEC.md + SPEC/model.md + SPEC/gates.md, pick the glyph char and firing rule). No drift; the decision-to-add was locked in `.1` Discovery.

- [x] Read relevant source files (SPEC.md §"Operator-cue glossary" + §"Post-closure protocol"; SPEC/model.md §"Tier ladder vs. next-move glyph" + §"Category-vs-concrete matching"; SPEC/gates.md §"Operator-cue vocabulary" → "Next-task cues"; both predecessor tasknotes)

- [x] **Archive skim** — `.1` and `.2` predecessors already ran the epic-level surface skim. Load-bearing precedents: **CORE-254** locked the post-closure cue vocabulary at two next-task glyphs (🔧/🧠) — this task reverses that lock (a one-glyph widening precedent exists: **CORE-308** added 👇 `HERE`). **CORE-259** added the `medium` gate rung with the note "next-move glyph set stays binary" — that claim must be reconciled here. **CORE-255/CORE-304/CORE-266** wired the glyph emission sites (de-anchored, own-line copy-paste) — those are sibling `.4`'s propagation surface, out of scope here.

- [x] **Drift check** — all three target sections present at HEAD and match the cited text: SPEC/model.md §"Tier ladder vs. the next-move suggestion glyph" (lines ~179-189, "No third glyph is added"), SPEC.md glossary row (line 384, `🔧 / 🧠 | LIGHT / HEAVY`) + post-closure steps 2-3 (lines ~522-546), SPEC/gates.md §"Next-task cues" table (lines ~107-122) + the "stays binary 🔧/🧠 (CORE-259)" prose (line 121). No drift.

- [x] Asked clarifying questions — one structured ask: the glyph char. **Resolved: 🧩** (label `MEDIUM`, prose "moderate"). User picked 🧩 puzzle over ⚙️/⚖️ — it matches medium's "assemble multi-step, well-scoped pieces" definition best, accepting the `## 🧩 Subtasks` section-header reuse (documented as deliberate + context-disambiguated below).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Scope boundary (contract-only)

This is the **contract** child. It defines the glyph + firing rule in the three SPEC surfaces. Rolling the glyph through the 13 skill emitters + `SPEC/procedures/ft-task.md` is sibling **`.4`** (glyph-emitter-propagation); docs currency is `.5`. No `claude/skills/**` edits here — confirmed against `.1`'s child structure.

### The design shape

Three contract surfaces currently encode a **binary** next-task glyph (🔧 LIGHT / 🧠 HEAVY), with `[medium]` explicitly collapsing to the "nearer" glyph. This task makes the set **three-valued**, cleanly mirroring the existing three-rung tier ladder (`light < medium < heavy`) 1:1: `[light]`→🔧, `[medium]`→<new>, `[heavy]`→🧠. Concrete tokens bucket by inherent tier (e.g. `sonnet`/`grok`→medium glyph, `opus`/`fable`→🧠, `haiku`→🔧). This collapses the deliberate gate-ladder-vs-glyph distinction that SPEC/model.md's binary section maintained — that distinction only existed to justify the binary glyph; once the third glyph lands, the glyph becomes a direct projection of the model category.

### The one open decision → glyph char

Everything follows deterministically once the glyph char is set: label = `MEDIUM` (parallels `LIGHT`/`HEAVY`), prose = "moderate" (parallels "mechanical"/"design"), firing rule = 1:1 tier mapping. The glyph char itself is the subjective, unique-across-the-cue-table choice → surfacing via structured ask (candidates + rendered previews). Uniqueness constraint (SPEC/gates.md casing rule): must not collide with 🗄️ ▶️ ✋ 🟢 👁️ 🔍 🛠️ 📦 🏁 ✅ 🔧 🧠 👇 ⚠️.

**Resolved: 🧩 `MEDIUM` (moderate).** The `## 🧩 Subtasks` tasknote-section header also uses 🧩, so the glyph carries two roles system-wide. This is **not** a cue-table collision — the SPEC/gates.md casing rule ("each glyph is unique across the table") is scoped to the operator-cue table, and a section header is not a cue; 🧩 stays unique *within* that table. Handle in the contract with a one-line note flagging the section-header reuse as deliberate and context-disambiguated (candidate/copy-paste line vs. body heading), so the dual role is documented rather than accidental.

### Gate judgment (Phase 1→2)

Discovery surfaced no significant deviation → **skip 🛠️**. The single ask was a subjective glyph-char pick (a "format/style pick / marker wording" clarification, explicitly in the `default-skip` skip branch) — it changed no file targets, no subtask structure, no approach. Scope matches `.1`'s filed plan exactly.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution — three SPEC surfaces edited (see below)

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only SPEC contract edits; no executable surface in `.3`'s scope)

**Implementation Notes:**

**Contract edits landed (the three SPEC surfaces this task owns):**

1. `SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph" — rewrote binary→three-valued: glyph now mirrors the ladder 1:1 (`[light]`→🔧 / `[medium]`→🧩 / `[heavy]`→🧠), concrete tokens bucket by inherent tier; added a History paragraph reconciling the CORE-254 lock reversal (framed as a one-glyph widening like CORE-308's 👇).
2. `SPEC.md` — glossary row (line 384) → three-valued; post-closure step 2 (candidate line, added `[medium]🧩` example + "moderate" prose + 1:1 mapping note) and step 3 (copy-paste glyph, added 🧩); fixed the residual `🔧/🧠` in step 3's context-dependent-skills flag.
3. `SPEC/gates.md` §"Next-task cues" — added the Medium row, rewrote the prose to three-valued 1:1 + widening note, added a "🧩 dual role (not a table collision)" note (section-header reuse is table-scope-safe + context-disambiguated); fixed the residual `🔧/🧠` in the destructive-escalation never-escalate list.

Emitter propagation (13 skills + `SPEC/procedures/ft-task.md`) is sibling `.4` — deliberately untouched here; the ft-task SKILL's "binary… nearer glyph" text stays until `.4` (expected transient contract-vs-propagation lag, the normal epic pattern).

**Downstream-impact reconciliation (mid-execution discovery — `.1` miss):**

`viz/src/parser.ts:58` hard-codes the suggestion-glyph tolerance as `(?:\s*(?:🧠|🔧)️?)?` — only 🧠/🔧 are stripped after a `[model]` token. A row decorated `[medium]🧩` fails the full line regex (traced: the glyph group matches empty, then `| shortname` / `— desc` / `$` all fail against the leftover 🧩), so the task drops off the board and surfaces as an unparsed diagnostic. The new contract makes `[medium]🧩` the natural decoration `.4`'s ft-task closure emitter will write into PLAN.md rows. No filed child (`.4` skills-only, `.5` docs, `.N` audit) covers the viz parser. Classification: **gap** (missing entry), not stale/contradictory/redundant. Also affects the SPEC.md parser-tolerance note (lines 194–196, names only 🧠/🔧, example `[medium]🧠`) + the parser's own header comment (line 53) — those correctly describe *current* viz behavior and should move together with the code fix, so they stay out of `.3`. Surfaced for user confirm before resuming closure.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; prose-only SPEC contract edits, no executable surface in `.3`'s scope (the viz regression test lives in `.6`).

- [x] Ran lint/type-check on changed code — no markdown linter configured; `git status --short` confirms only the 4 intended files changed (PLAN.md, SPEC.md, SPEC/gates.md, SPEC/model.md) + the new tasknote, no stray edits. Markdown mental-pass done: table grammar intact, three-valued glyph set consistent across all three surfaces (final grep), residual `🔧/🧠` pairings fixed at SPEC.md:547 + gates.md:179, sibling cross-ref link normalized to `](model.md)` (matching SPEC/-internal convention), link targets verified.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; `.3` touches no frontend surface (viz code is untouched here — deferred to `.6`).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 12 AI-referenced docs walked. **No change:** README.md, docs/MIGRATION.md, claude/AGENTS-snippet.md (generic "next-task suggestion" mention, no glyph enum), codex/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/PLATFORMS.md. **Deferred to CORE-353.5** (owns these docs; "align to .2/.3 decisions"): `docs/AGENT-COMPAT.md:118` — cue-label survival list `(AUDIT, LIGHT, HEAVY, HERE)` missing `MEDIUM` (real drift); `docs/AGENT-NEUTRALITY.md:37` + `claude/CAPABILITIES.md:31` — illustrative `[heavy]🧠`/`[light]🔧` emoji examples, still-correct but now incomplete. SPEC.md is the changed contract itself (not drift-in-another-doc); its parser-tolerance note (194–196) intentionally deferred to CORE-353.6 with the viz code fix.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-13.`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (below).

**Final Summary:**

Reversed CORE-254's two-glyph lock and added a third post-closure next-move suggestion glyph — **🧩 `MEDIUM` (moderate)** — for `[medium]` candidates, defined across the three contract surfaces: `SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph" (rewritten binary→three-valued: the glyph now mirrors the `light<medium<heavy` tier ladder 1:1, concrete tokens bucket by inherent tier, + a History paragraph reconciling the lock reversal as a one-glyph widening à la CORE-308's 👇); `SPEC.md` cue glossary row + post-closure protocol steps 2–3; `SPEC/gates.md` §"Next-task cues" table + prose + a "🧩 dual role (not a table collision)" note documenting the `## 🧩 Subtasks` section-header reuse as table-scope-safe and context-disambiguated. User picked 🧩 (over ⚙️/⚖️) — it best fits medium's "assemble multi-step, well-scoped pieces" definition. Mid-execution I found a Discovery (`.1`) miss: the new `[medium]🧩` decoration breaks `viz/src/parser.ts`'s hard-coded `🧠|🔧` suggestion-glyph tolerance; ran the downstream-impact reconciliation scan and, on user confirm, filed **CORE-353.6** (viz-parser-glyph-tolerance) before `.N` + made a compact honesty-edit to the parent's "SPEC only" tail. Emitter propagation (13 skills + SPEC/procedures) stays with `.4`; the three doc-drift hits stay with `.5`. Edit surface: 3 SPEC files (prose contract), + PLAN.md (1 new child line, parent tweak). Contract-only, no code, no tests.

**Archived:** 2026-07-13
