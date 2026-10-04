---
title: cue-emoji-legibility discovery
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-415]
---

# CORE-415.1 | cue-emoji-legibility discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-415]]

## 🎯 Goal

Scope the `CORE-EPIC-415` epic (`cue-emoji-legibility`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-415.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-415.2 .. CORE-415.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds") — 43w / 40w / 39w
- [x] Audit line CORE-415.N reviewed and confirmed as-filed (scope reframe to keep-👁️ doesn't change the audit's fixed doc-drift shape)
- [x] Phase 4 doc-drift sweep at closure: all 13 AI-referenced docs "no change" (pure Discovery filing; contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-415.2 .. CORE-415.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-415 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-415]] — parent epic (cue-emoji-legibility)
- [[CORE-353.3]] — third-glyph-contract precedent (glyph vocabulary design)
- [[CORE-254.2]] — cue-vocabulary precedent (operator-cue set established)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator explicitly invoked `/ft-epic-discovery` with the brief: review flowtron's emoji vocabulary for orientation value + leanness, and fix the 👁️ CONFIRM cue's low visual salience against monochrome terminal text.

- [x] Read relevant source files — `SPEC/gates.md` §"Operator-cue vocabulary" (canonical cue table), `SPEC.md` §"Operator-cue glossary" + Phase 3 👁️ contract, `SPEC/loop.md`, `SPEC/model.md`, `SPEC/procedures/ft-task.md`, `templates/tasknote-template.md`

- [x] **Best Practices Review** — N/A (markdown contract surface; no code-module boundaries touched in Discovery — viz code enters only via the `.4` child)

- [x] **Archive skim** — CORE-254 cohort (cue vocabulary minted; 👁️ retrofitted with `CONFIRM` label), CORE-353 cohort (third-glyph contract + emitter propagation — closest structural precedent), CORE-355 (propagation stragglers: enumeration mirrors get missed), CORE-353.6 (viz glyph tolerance), CORE-304/308 (copy-paste cue glyphs)

- [x] **Drift check** — clean. Cue table at `SPEC/gates.md` §"Operator-cue vocabulary" and mirror at `SPEC.md` §"Operator-cue glossary" both current; 👁️ CONFIRM contract at `SPEC.md` Phase 3 + `templates/tasknote-template.md:77` as described. PLAN line matches this tasknote's plan; no SPEC contradiction.

- [x] Asked clarifying questions — resolved via AskUserQuestion; see "Resolved scoping" table below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Shared design surface inventory:**

- **Contract layer:** `SPEC/gates.md` §"Operator-cue vocabulary" (canonical: 15 cues — event 🗄️ ▶️ ✋ · inline asks 🟢 👁️ 🔍 · landmarks 🛠️ 📦 🏁 ✅ · next-task 🔧 🧩 🧠 👇); mirror table `SPEC.md` §"Operator-cue glossary"; glyph+UPPERCASE-label pairing with table-scoped uniqueness rule.
- **👁️ CONFIRM emission sites:** `SPEC.md` §Phase 3 (contract + example), `SPEC/gates.md` (3 tables + `--fast` rows), `SPEC/loop.md:62-64`, `SPEC/model.md:128` (analogy), `SPEC/procedures/ft-task.md:62,249-250`, `templates/tasknote-template.md:77` (+ SPEC.md:572 checklist mirror).
- **Other emoji layers:** tasknote body-section headings (🎯 ✅ 🧩 🔗 📝 🛠️ 🧪 🚀, nav 🟢/🔗, 📌 sidequest, ⏸ blocked, 🧭 deep pre-pass, 🔁 iterations); model-tier glyphs `[light]🔧 [medium]🧩 [heavy]🧠` (SPEC/model.md).
- **Docs mirrors:** `docs/AGENT-COMPAT.md` (per-agent render matrix — tofu/strip failure modes), `docs/DOGFOOD.md` (cue-render list), `docs/GLOSSARY.md`, `docs/PLATFORMS.md`.
- **Viz:** parser/render tolerance precedent CORE-353.6; archives retain historical glyphs, so any changed form must parse alongside the old.

**Archive-skim load-bearing findings:** CORE-254.2 minted the vocabulary + uniqueness rule; the UPPERCASE label is the deliberate non-render fallback (the glyph is fast-scan only). CORE-353.4 + CORE-355 show propagation must sweep enumeration mirrors (DOGFOOD cue list, procedures "full vocabulary" line) or stragglers leak. CORE-381 is the archive-backfill precedent (not taken here — see scoping).

**Resolved scoping (AskUserQuestion, 2026-08-08):**

| # | Question | Resolution |
|---|---|---|
| 1 | Sweep breadth | **Full surface, minimal-change bias** — audit cues + section headings + model glyphs for salience/clutter, but change only what's genuinely broken |
| 2 | 👁️ CONFIRM fix | **Keep 👁️, strengthen framing** — no glyph swap; raise visibility via emission shape (e.g., bold/emphasized `👁️ CONFIRM:` line) — exact shape is `.2`'s design call |
| 3 | Archive policy | **Leave archives, tolerate both** — active surfaces only; viz tolerates old + new forms (moot for 👁️ itself since glyph is kept; applies to any other change `.2` lands) |
| 4 | Child split | **contract / propagation / viz** — `.2` emoji-surface-contract, `.3` emitter-propagation, `.4` viz-glyph-tolerance |

**Scope note:** Q2's "keep 👁️" answer narrows the epic from glyph replacement to emission-shape strengthening + a lean full-surface audit. `.4` becomes conditional-scope: tolerance work only for whatever `.2` actually changes; if `.2` lands zero glyph/shape changes that reach viz-parsed surfaces, `.4` closes as a verification pass.

**Drafted child lines (word counts: 43 / 40 / 39):** see Phase 2 Implementation Notes for the filed forms.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-EPIC-057-style cohort-children filing pattern (2-space indent under the parent, `[model]` tag on every line, em-dash separator, ≤50w target / 70w cap per line); CORE-EPIC-353 is the structural precedent for the contract → propagation → viz child split

- [x] **Minimal refactor gate** — N/A (pure PLAN.md filing; no code path touched)

- [x] Implemented the minimal solution — three child lines (CORE-415.2 .. .4) written under CORE-EPIC-415, between the `.1` and `.N` lines

- [x] Updated/added tests for non-trivial behavior — N/A (no executable surface)

**Implementation Notes:**

- 3 child lines filed; word counts 43 / 40 / 39 (all under the 50w target).
- M unchanged from filing-time estimate (M=3); `.N` audit line untouched.
- Per-child model tokens: `.2` [heavy]🧠 (design), `.3` [medium]🧩 (propagation sweep), `.4` [light]🔧 (mechanical/conditional) — operator approved at the 🛠️ gate.
- Downstream-impact reconciliation scan: active PLAN sections contain only this epic's cohort — **no downstream impact**; no existing lines edited.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only)

- [x] **Quality assertions** — N/A (no code changed; markdown mental-pass recorded in Testing Notes)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space child indent preserved on all five nested lines; bold `**CORE-415.x**` IDs intact; `[model]` tag present on every line; `| shortname` segments all ≤30 chars (emoji-surface-contract = 21, emitter-propagation = 19, viz-glyph-tolerance = 19); em-dash separators consistent; no trailing whitespace; no existing lines touched (reconcile scan was clean).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 13 entries (README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, codex/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md): **no change** — pure Discovery filing; contract edits belong to CORE-415.2/.3

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath CORE-EPIC-415 in `## Medium`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: PLAN.md edit + tasknote scaffold/archive only)

**Final Summary:**

Filed CORE-EPIC-415 (cue-emoji-legibility) and closed its Discovery. Scoped a lean, full-surface review of flowtron's emoji vocabulary — operator cues, tasknote section headings, model-tier glyphs — with a minimal-change bias. Key operator decision: **keep the 👁️ CONFIRM glyph; strengthen its emission shape instead** (the epic's original glyph-swap framing was narrowed at scoping). Children filed: `.2` emoji-surface-contract ([heavy]🧠, 43w), `.3` emitter-propagation ([medium]🧩, 40w), `.4` viz-glyph-tolerance ([light]🔧, conditional, 39w); `.N` audit confirmed as-filed. Design surface inventoried (SPEC/gates.md canonical table + SPEC.md mirror + 8 emission-site files + 4 docs mirrors); precedents logged (CORE-254, CORE-353 cohort, CORE-355 straggler lesson); drift check clean; no downstream PLAN impact.

**Archived:** 2026-08-08
