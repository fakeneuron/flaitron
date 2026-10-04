---
title: emoji-surface-contract
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-EPIC-415, CORE-415.1]
---

# CORE-415.2 | emoji-surface-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-415]]

## 🎯 Goal

Audit flowtron's three emoji layers (operator cues, tasknote section headings, model-tier glyphs) for salience and clutter under a minimal-change bias, and land the resulting contract edits — including a higher-visibility emission shape for 👁️ CONFIRM (glyph kept) — in `SPEC/gates.md` + the `SPEC.md` glossary.

## ✅ Acceptance

- [x] All three emoji layers audited with an explicit per-layer verdict recorded in Discovery Notes — layer 1 (operator cues) changes; layers 2 (tasknote headings/chips) and 3 (model-tier glyphs) carry an explicit **no-change** verdict with rationale, so `CORE-415.3` has nothing to churn
- [x] 👁️ CONFIRM emission shape upgraded to the **emphasized inline ask** (own line, blank-line isolated, bold `**CONFIRM**` label) — glyph unchanged, no banner promotion, standing two-banner cap unaffected — canonical in `SPEC/gates.md` §"Inline asks"
- [x] Cross-layer glyph-reuse rule generalized in `SPEC/gates.md`, replacing the one-off "🧩 dual role" note and covering 🛠️ / ✅ / 🟢 / 🌱 / 🔧🧩🧠 under one clause
- [x] Non-cue glyph residual (⚡ ⚠️ 🔬 🧭 🌳 🔁 🔄 📌 📋) named in `SPEC/gates.md` as a legitimate bounded class outside the cue contract
- [x] `SPEC.md` mirrors updated — §"Operator-cue glossary" 👁️ row + §"🧪 Phase 3" shape paragraph — so the SPEC.md/gates.md pair carries no internal drift
- [x] **Zero glyph changes** — no glyph added, removed, or reassigned across all 31 active semantic glyphs (verified by re-running the inventory)
- [x] Scope boundary held: only `SPEC/gates.md` + `SPEC.md` edited; every other emission site (skills, procedures, templates, docs mirrors) left to `CORE-415.3`
- [x] `CORE-415.4` premise recorded from evidence — `viz/src/parser.ts` `STATUS_GLYPH`/`SUGGESTION_GLYPH` untouched → `.4` closes as a verification pass
- [x] Phase 4 doc-drift sweep across all 13 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries

## 🧩 Subtasks

- [x] Edit `SPEC/gates.md` §"Inline asks" — retype the 👁️ row's Shape cell to `emphasized inline ask`, update its inline example to the new shape
- [x] Add the **Emphasized inline ask shape** contract block under that table (what it is, why 👁️ gets it, explicit not-a-banner bound, 🟢 inheritance when emitted standalone)
- [x] Add a `### Glyph layers and reuse` subsection after the Casing rule — the cross-layer reuse rule + the non-cue residual class
- [x] Replace the standalone "🧩 dual role (not a table collision)" block in §"Next-task cues" with a one-line pointer to the new subsection
- [x] Update `SPEC.md` §"Operator-cue glossary" 👁️ row to reflect the emphasized shape
- [x] Update `SPEC.md` §"🧪 Phase 3: Testing & Linting" shape paragraph (lines ~589-592) to the new shape, keeping the no-banner/no-gate assertion
- [x] Re-run the emoji inventory and diff against the Phase 1 baseline to prove zero glyph changes
- [x] Verify scope boundary — `git diff --name-only` shows exactly `SPEC/gates.md` + `SPEC.md` (plus tasknote/PLAN)

## 🔗 Related

- [[CORE-EPIC-415]] — parent epic (cue-emoji-legibility)
- [[CORE-415.1]] — epic Discovery predecessor (scoping decisions + design-surface inventory)
- [[CORE-415.3]] — follow-on: propagate this contract across every emission site
- [[CORE-415.4]] — follow-on: viz parser/render tolerance (conditional on what this task changes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic's motivating defect is real and confirmed by inventory — 👁️ CONFIRM is the only operator cue that requires a response before the task can be called done, yet carries the weakest emission shape of any action-requiring cue. Scope matches the PLAN line exactly (audit three layers, design the shape, land contract edits in `SPEC/gates.md` + `SPEC.md`).

- [x] Read relevant source files — `SPEC/gates.md` (full), `SPEC.md` §"Tasknote body shape" / §"Operator-gate cues" / §"Operator-cue glossary" / §"🧪 Phase 3", `SPEC/model.md` §"Effort axis", `SPEC/epic.md`, `templates/tasknote-template.md`, `docs/DOGFOOD.md` cue list, `docs/AGENT-COMPAT.md` §non-render failure modes, `viz/src/parser.ts`, `viz/src/tasknote.ts`

- [x] **Best Practices Review** — N/A for module boundaries (markdown contract surface, no code edited). The applicable analogue — *contract* boundaries — is assessed in Discovery Notes: the `.2`/`.3` split (contract vs. propagation) is the dependency direction being respected, and this task edits only the two canonical files.

- [x] **Archive skim** — CORE-254.2 (vocabulary mint + glyph/label convention), CORE-065 (4→2 banner trim — the constraint that forbids promoting 👁️ to a banner), CORE-353.3 (🧩 third-glyph widening precedent), CORE-308 (👇 one-glyph widening), CORE-355 (propagation stragglers in enumeration mirrors), CORE-353.6 (viz glyph tolerance), CORE-415.1 (this epic's Discovery + scoping table)

- [x] **Drift check** — clean. Every path and line cited by the epic still matches: `SPEC/gates.md:92` (👁️ row), `SPEC/gates.md:124-130` (🧩 dual-role block), `SPEC.md:469` (glossary row), `SPEC.md:589-592` (Phase 3 shape paragraph), `templates/tasknote-template.md:77`. The plan formed here contradicts no SPEC contract — notably it *preserves* the CORE-065 two-banner cap rather than testing it.

- [x] Asked clarifying questions — two structured asks resolved 2026-08-08; see "Resolved design decisions" below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Glyph inventory (measured, not recalled).** Scanned every `*.md` outside `.git/`, `/archive/`, `node_modules/`, `dist/`: **31 distinct semantic glyphs** (plus box-drawing `─├│└` used for ASCII trees in `SPEC.md`/`docs/PLATFORMS.md`, and `□` appearing only as the tofu *illustration* in `docs/AGENT-COMPAT.md` + `docs/DOGFOOD.md`). They partition cleanly into the epic's three layers plus a residual:

| Layer | Glyphs | Count | Governed by |
|---|---|---|---|
| 1 — Operator cues | 🗄️ ▶️ ✋ · 🟢 👁️ 🔍 · 🛠️ 📦 🏁 ✅ · 🔧 🧩 🧠 👇 | 14 | `SPEC/gates.md` §"Operator-cue vocabulary" |
| 2 — Tasknote structure | 🎯 ✅ 🧩 🔗 🔄 📝 🛠️ 🧪 🚀 · 🌱 🔁 📌 📋 🧭 · chips 🟢 ⏸ ⚪ | ~14 (overlapping L1) | `SPEC.md` §"Tasknote body shape" + `templates/` |
| 3 — Model tier | 🔧 🧩 🧠 | 3 (all overlap L1) | `SPEC/model.md` §"Tier ladder…" |
| Residual — non-cue | ⚡ ⚠️ 🔬 🧭 🌳 🔁 🔄 📌 📋 ❌ | ~10 | **nothing** — see finding F3 |

Volume leaders are the tier glyphs (🔧 212 · 🧠 146 · 🧩 109 = 467 occurrences), which is expected: every PLAN line carries one.

**Per-layer verdicts.**

- **Layer 1 — change (one shape edit, zero glyph edits).** See F1/F2/F3 below.
- **Layer 2 — no change.** Nine required headings + five optional. Every H2 carries a glyph, which reads as heavy in isolation but is doing real work: a tasknote is a long document read by both humans and agents, and the glyph makes section boundaries scannable without reading heading text. Cost of change is severe and one-directional — the template, ~400 archived tasknotes, and `viz` chip parsing all encode the current set — against a purely aesthetic gain. **Explicit no-change so `CORE-415.3` has nothing to propagate here.**
- **Layer 3 — no change.** 🔧/🧩/🧠 map 1:1 onto the tier ladder, are documented in both `SPEC/model.md` and `SPEC/gates.md`, are parsed by `viz`, and are the highest-volume glyphs in the repo. Nothing is broken. **Explicit no-change.**

**Finding F1 — the 👁️ salience defect (the epic's motivating case).** Ranking every cue by *emission salience* against *operator obligation* exposes exactly one outlier:

| Cue | Requires operator response? | Structural emphasis today |
|---|---|---|
| 🛠️ / 📦 | yes | banner: `---` rules + bold UPPERCASE label + preview line |
| 🗄️ / ▶️ (destructive) | yes | escalates to banner |
| 🏁 / ✅ | no (state markers) | end-of-response position |
| ✋ ACTION | yes, but out-of-band | inline prefix (acceptable — not blocking assistant progress) |
| 🟢 GO | yes | in practice bundled *inside* the 📦 banner → inherits banner salience |
| **👁️ CONFIRM** | **yes — work cannot be called done without it** | **bare inline prefix inside a prose paragraph** |

👁️ is the only cue that gates completion while having no structural emphasis at all. That is the mechanism behind "blends into monochrome terminal text": it is not a color problem, it is a **document-structure** problem — the ask has no line of its own, no whitespace isolation, and no weight.

**Finding F2 — cross-layer glyph reuse is documented for exactly one case.** `SPEC/gates.md` §"Next-task cues" carries a "🧩 dual role (not a table collision)" block explaining that 🧩 is both the `MEDIUM` cue and the `## 🧩 Subtasks` heading. That reasoning is correct — but the same phenomenon occurs four more times and is unmentioned:

| Glyph | Cue meaning | Structural meaning | Documented? |
|---|---|---|---|
| 🧩 | `MEDIUM` next-task | `## 🧩 Subtasks` heading | ✅ yes (one-off block) |
| 🛠️ | Phase 1→2 banner | `## 🛠️ Phase 2` heading | ❌ no |
| ✅ | phase/closure marker | `## ✅ Acceptance` heading + `✅ Completed` chip | ❌ no |
| 🟢 | `GO` commit-ask | `🟢 In progress` chip | ❌ no |
| 🌱 | — | `## 🌱 Starter context` + `🌱 Starter` chip | ❌ no |
| 🔧🧩🧠 | next-task cues | model-tier glyphs | ✅ yes (1:1 mirror, stated) |

The Casing rule's uniqueness constraint is already correctly scoped ("unique across *the table*"), so none of these is a rule violation. The gap is that one instance got a bespoke defense while four identical instances got none — which reads as if 🧩 were an exception rather than an instance of a rule. Generalizing the block into a single clause is **roughly word-neutral** (it replaces rather than stacks) and covers all six.

**Finding F3 — the contract governs 14 of ~31 active glyphs, with no statement about the rest.** ⚡ (`--fast` marker), 🔬 (`--debug` marker), 🧭 (deep pre-pass), 🌳 (worktree), 🔁 (Iterations log), 🔄 (Handoff), 📌 (sidequest), 📋 (spec template), ⚠️ (inline advisory), ❌ (loop-failure example) are all in active emission. None collides with a cue; each is scoped to one skill or template. But nothing in the contract says whether they are legitimate or drift, so a future audit has no basis to judge them either way. One sentence naming them as a bounded residual closes this.

**Clutter verdict (the epic's second question).** The surface is **not** over-emoji'd — 31 glyphs across a spec system this size is proportionate, and every one carries a distinct meaning. The genuine deficiency is **contract coverage, not glyph count**: the vocabulary governs 14 glyphs, silently tolerates ~10 more, and defends one cross-layer reuse out of six. The minimal-change bias is therefore satisfied by **three prose edits and zero glyph changes** — which is the strongest possible outcome for an epic filed under that bias.

**Resolved design decisions (AskUserQuestion, 2026-08-08):**

| # | Question | Resolution |
|---|---|---|
| 1 | 👁️ emission shape | **Bold label, own line** — blank-line isolated, `👁️ **CONFIRM** — <ask>`. Chosen over a blockquote callout (which would overload flowtron's existing "blockquote = guidance aside" idiom, e.g. the template's *Choosing a test strategy* note) and over bold+rule (which reads as a half-banner and erodes the CORE-065 two-banner distinction) |
| 2 | Scope of the coverage gaps | **Land both F2 and F3** in this task — they are contract edits to the two files `.2` already owns, and the F2 generalization is word-neutral |

**Scope boundary with `CORE-415.3` (load-bearing).** `.2` edits **only** `SPEC/gates.md` + `SPEC.md`. Every other 👁️ emission site — `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-goal-task/SKILL.md`, `claude/skills/ft-task/step-4-debug-mode.md`, `claude/commands/*.md`, `claude/CAPABILITIES.md`, `SPEC/procedures/ft-task.md`, `SPEC/loop.md`, `SPEC/model.md`, `templates/tasknote-template.md`, `docs/GLOSSARY.md`, `docs/DOGFOOD.md`, `docs/PLATFORMS.md` — belongs to `.3`. Full emission-site list captured above so `.3` inherits it rather than re-deriving it (the CORE-355 straggler lesson: enumeration mirrors are what get missed).

**`CORE-415.4` premise — resolved from evidence.** `viz/src/parser.ts` parses exactly two glyph sets: `STATUS_GLYPH` = `🟢|⏸|✅|⚪|🌱` (line 66) and `SUGGESTION_GLYPH` = `🧠|🔧|🧩` (line 71). Operator cues (👁️ 🛠️ 📦 🏁 🗄️ ▶️ ✋ 🔍 👇) are **not** parsed anywhere in `viz/`. Since this task changes no glyph and touches no chip or tier position, **nothing viz-parsed changes** → `.4` closes as a verification pass, exactly as its conditional PLAN line anticipated.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the established contract-module shape: canonical rule + bounded-scope statement + explicit "this is not X" guard, the same structure `SPEC/gates.md` §"Destructive-action escalation" uses (predicate → format → **Bound**). The new §"Emphasized inline ask shape" mirrors it 1:1 rather than inventing a layout. Cross-references use the file's existing `§"Section"` convention.

- [x] **Minimal refactor gate** — one consolidation performed, in service of Acceptance #3: the standalone "🧩 dual role" block was **replaced** (not supplemented) by the generalized §"Glyph layers and reuse", removing a special-case defense that the general rule now subsumes. Deferred: nothing. No unrelated cleanup touched.

- [x] Implemented the minimal solution — 3 additions + 3 edits across the two owned files; **zero glyph changes**

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract surface; no executable behavior). `viz` suite run anyway as a regression check, see Testing Notes

**Implementation Notes:**

**Edits — `SPEC/gates.md` (+~100/-14):**

1. **New `### Glyph layers and reuse`** (after the Casing rule, before the cue tables) — names the three layers, scopes the uniqueness rule to layer 1, states the cross-layer-coherence rule, tabulates all six reuses (🧩 🛠️ ✅ 🟢 🌱 🔧/🧠), and names the ~10-glyph non-cue residual as legitimate and bounded. Placed adjacent to the Casing rule deliberately: a rule and the statement of its scope should not be separated by four tables.
2. **New `#### Emphasized inline ask shape`** (under §"Inline asks") — the 👁️ contract. Leads with *why* 👁️ is the outlier (the obligation-vs-emphasis table from Discovery, compressed to prose), states the fix is structural rather than chromatic, gives the shape + a rendered example, and closes with an explicit **not-a-banner bound** protecting the CORE-065 cap.
3. **👁️ table row** — Shape cell `inline ask prefix` → `**emphasized** inline ask`; example updated to the new form.
4. **🟢 table row** — notes it inherits 📦's salience when bundled and takes the emphasized shape when standalone.
5. **§"Event cues" lead-in** — previously cited "the 👁️/🟢 shape" as the exemplar of a *bare* inline prefix, which the change falsified. Rewritten to separate plain event-cue prefixes from the obligation-bearing asks.
6. **§"Next-task cues"** — 7-line 🧩 dual-role block → 3-line pointer to the new subsection.

**Edits — `SPEC.md` (+14/-6):**

7. §"Operator-cue glossary" 👁️ row — notes the emphasized shape.
8. §"🧪 Phase 3" shape paragraph — rewritten to the emphasized shape with a rendered example, preserving the no-banner/no-gate assertion verbatim and linking the full contract.
9. §"🧪 Phase 3" **checklist line** — caught during the Phase 3 consistency sweep: still read "(👁️ prefix on the prose ask)", contradicting the contract paragraph 20 lines below it. Synced. Strict-entailment edit within an owned file (same precedent as CORE-065's template sync); the *template* mirror at `templates/tasknote-template.md:77` is deliberately left for `CORE-415.3`.

**Scope boundary held.** `git status` shows exactly `SPEC.md` + `SPEC/gates.md` modified. The 12 other emission sites enumerated in Discovery Notes are untouched and belong to `.3`.

**Net effect.** Zero glyphs added, removed, or reassigned. The contract now governs the full active surface (was: 14 of ~31 glyphs), defends all six cross-layer reuses under one clause (was: one bespoke defense out of six), and gives the one completion-gating cue an emission shape proportionate to its obligation.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for the changed files (markdown); ran the full `viz` suite as a regression check: **18 files / 245 tests passed**

- [x] Ran lint/type-check on changed code — N/A (no executable surface); markdown structural pass recorded below

- [x] **Quality assertions** — no code changed. Applied to the *contract* surface instead, since that is what this task modifies: see Testing Notes

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; the change is to a contract that *describes* an ask, not to any rendered UI)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Invariant 1 — zero glyph changes (Acceptance #6).** Re-ran the Phase 1 inventory script against the post-edit tree and diffed the glyph set: **0 added, 0 removed.** (The script's raw output lists `─ │ └ ├ □` as "added" only because my hand-typed baseline set deliberately excluded box-drawing characters and the tofu *illustration* in `docs/AGENT-COMPAT.md` / `docs/DOGFOOD.md`; those five are pre-existing and untouched. No emoji changed.)

**Invariant 2 — scope boundary (Acceptance #7).** `git status --porcelain` → `M SPEC.md`, `M SPEC/gates.md`, `?? .flowtron/tasknote/CORE-415.2.md`. Exactly the two owned files.

**Regression check.** `npm --prefix viz test` → 18 files / 245 tests passed (7.8s). Not strictly required — nothing executable changed — but it confirms cheaply that the SPEC edits disturbed nothing. Verified *why* it cannot: the only `viz` reference to `SPEC.md` is `viz/src/workspace.ts:86`, which tests the file's **existence** for adopter-layout detection and never reads its content. `viz/src/parser.ts` parses only `STATUS_GLYPH` (line 66) and `SUGGESTION_GLYPH` (line 71) out of PLAN/tasknote lines — neither touched.

**Structural pass on the markdown.** Heading nesting verified via `grep '^#\{2,4\} '`: `#### Emphasized inline ask shape` sits correctly under `### Inline asks`; `### Glyph layers and reuse` sits correctly under `## Operator-cue vocabulary`; no level skipped. Both new tables have matching column counts. All `§"…"` cross-references resolve to real headings in the same file; the two inter-file links (`../SPEC.md`, `model.md`) match the file's existing relative-link convention.

**Contract quality assertions (the analogue of code quality assertions, applied to what actually changed):**

- *No avoidable duplication* — the generalized reuse rule **replaced** the 🧩 block rather than sitting alongside it; the `SPEC.md` Phase 3 paragraph states the shape and **links** the rationale instead of restating it, preserving the established core-spec/lazy-module split.
- *No dead contract* — every clause added is reachable: the reuse table enumerates six live reuses, the residual list enumerates ten live glyphs, and the 👁️ shape is emitted by four skills.
- *No unexplained complexity* — the new subsection reuses the §"Destructive-action escalation" layout the file already established.
- *No unnecessary surface growth* — zero new glyphs, zero new gates, zero new banners; the two-banner cap is explicitly reaffirmed rather than tested.
- *No stale cross-references* — the full-file `👁️` sweep caught two statements the change falsified (`gates.md` §"Event cues" lead-in, `SPEC.md:572` checklist) and both were synced.

**Consistency sweep (how #5/#9 were found).** After the primary edits, grepped `👁️` across both owned files and read all 20 hits. Two contradicted the new contract; both fixed. This is the CORE-355 straggler lesson applied *within* a file rather than across the repo — the same failure mode operates at both scales.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries walked; verdicts below

| Doc | Verdict |
|---|---|
| `README.md` | no change — no cue-vocabulary surface |
| `SPEC.md` | **updated** — glossary 👁️ row, §"🧪 Phase 3" shape paragraph, §"🧪 Phase 3" checklist line |
| `docs/MIGRATION.md` | no change — adoption/bump procedures only |
| `claude/AGENTS-snippet.md` | no change — no cue surface |
| `codex/AGENTS-snippet.md` | no change — wiring commands only |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — its only `glyph`-adjacent text is the homoglyph / ASCII-smuggler threat note, unrelated to the cue vocabulary |
| `docs/AGENT-NEUTRALITY.md` | no change — no Claude-specific surface added (the shape is markdown, agent-neutral) |
| `docs/PLATFORMS.md` | no change **now** — its one 👁️ mention (line 301, Grok `--fast` equivalence) describes suppression, not shape, so it is not falsified; propagation is `CORE-415.3`'s declared scope |
| `claude/CAPABILITIES.md` | no change **now** — its 👁️ mention (line 30) likewise describes `--fast` suppression, not shape; `.3` scope |
| `docs/AGENT-COMPAT.md` | no change **now** — verified **not falsified**: the glyph+UPPERCASE-label convention and all three non-render failure modes (stripped / tofu / mojibake) are unchanged, and the emphasized shape *reinforces* the fallback story (bold degrades to plain text; the UPPERCASE label still names the cue). `.3` may optionally add a bold-degradation line; not required for correctness |
| `docs/EXTERNAL-AGENTS.md` | no change — delegation/handoff surface untouched |
| `docs/WORKTREES.md` | no change — isolation convention untouched |

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and **kept nested** beneath the still-active `CORE-EPIC-415` in `## Medium` per SPEC/epic.md §"Child placement invariant", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: all three signals clear)

**Final Summary:**

Audited all three of flowtron's emoji layers and landed the resulting contract in the two files `.2` owns — **with zero glyph changes**, the strongest available outcome for an epic filed under a minimal-change bias.

**The audit.** Measured the real surface rather than recalling it: **31 distinct semantic glyphs** across active markdown, partitioning into 14 operator cues, ~14 tasknote-structure glyphs (headings + nav chips), 3 model-tier glyphs, and a ~10-glyph non-cue residual. Layers 2 and 3 got explicit **no-change** verdicts with rationale — they earn their orientation value, and rewriting them would churn the template, ~400 archived tasknotes, and `viz` parsing for aesthetic gain — recorded so `CORE-415.3` has nothing to propagate there.

**The defect, diagnosed.** Ranking every cue by operator obligation against emission salience isolated exactly one outlier: 👁️ `CONFIRM` is the **only cue that gates task completion** yet had no structural emphasis at all (🛠️/📦 get banner rules, destructive 🗄️/▶️ escalate, 🏁/✅ need no answer, ✋ is out-of-band, 🟢 rides inside 📦). So "blends into monochrome terminal text" is a **document-structure** problem, not a color problem — the ask had no line of its own. Per operator decision, the glyph is kept and the emission shape strengthened: own line, blank-line isolated, bold label — `👁️ **CONFIRM** — <ask>` — with an explicit not-a-banner bound so the CORE-065 two-banner cap is reaffirmed rather than tested.

**Two coverage gaps closed.** (1) The contract carried a bespoke "🧩 dual role" defense while **five identical cross-layer reuses** (🛠️ ✅ 🟢 🌱 🔧/🧠) went unmentioned — generalized into one §"Glyph layers and reuse" clause that *replaces* the special case, so the file says more with roughly the same words. (2) The vocabulary governed 14 of ~31 active glyphs and said nothing about the rest — the ~10-glyph residual (⚡ ⚠️ 🔬 🧭 🌳 🔁 🔄 📌 📋) is now named as legitimate and bounded, giving future audits a basis to judge it.

**Verification.** Zero glyph changes proven by re-running the Phase 1 inventory and diffing the set (0 added / 0 removed). Scope boundary held — only `SPEC.md` + `SPEC/gates.md` touched; the 12 other emission sites are enumerated in Discovery Notes so `.3` inherits the list rather than re-deriving it (CORE-355 straggler lesson). A full-file `👁️` sweep caught two statements the change falsified — the §"Event cues" lead-in, which cited 👁️ as the exemplar of a *bare* prefix, and the `SPEC.md:572` checklist line — both synced. `viz` suite green (18 files / 245 tests); verified structurally that it *cannot* be affected, since `workspace.ts:86` tests only SPEC.md's existence and `parser.ts` parses only the chip and tier glyph sets.

**`CORE-415.4` premise resolved from evidence, not assumption.** `viz/src/parser.ts` parses exactly `STATUS_GLYPH` (🟢⏸✅⚪🌱, line 66) and `SUGGESTION_GLYPH` (🧠🔧🧩, line 71); operator cues are parsed nowhere in `viz/`. This task touches neither set → **`.4` closes as a verification pass**, exactly as its conditional PLAN line anticipated.

**Maintainability effect.** The contract now covers the full active glyph surface instead of 45% of it, defends six cross-layer reuses under one rule instead of one under a special case, and gives the sole completion-gating cue an emission shape proportionate to its obligation — at the cost of ~100 added lines in one lazy-loaded module and no behavioral change to any gate.

**Archived:** 2026-08-08
