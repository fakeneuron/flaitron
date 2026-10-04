---
title: emitter-propagation
status: completed
tags: []
created: 2026-08-08
related-tasks: [CORE-EPIC-415, CORE-415.1, CORE-415.2, CORE-415.4]
due:
---

# CORE-415.3 | emitter-propagation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-415]]

## 🎯 Goal

Propagate the `CORE-415.2` emphasized-inline-ask contract from its two canonical files (`SPEC/gates.md` + `SPEC.md`) to every downstream site whose statement about the 👁️ `CONFIRM` emission shape the change falsified, sweeping enumeration mirrors per the CORE-355 straggler lesson.

## ✅ Acceptance

- [x] Every site that makes a **shape** claim about 👁️ carries the emphasized-inline-ask description (own line, blank-line isolated, bold `**CONFIRM**` label)
- [x] Every site that makes only a **suppression** claim about 👁️ is left untouched, with the not-falsified verdict recorded per site
- [x] `templates/tasknote-template.md:77` Phase 3 checklist line synced to its `SPEC.md:572` counterpart (the mirror `.2` deliberately deferred here)
- [x] `SPEC/procedures/ft-task.md` re-synced against its watched surfaces and `last-verified:` bumped per `SPEC/procedures/README.md`
- [x] `SPEC/model.md:128`'s falsified exemplar (👁️ cited as the archetype of a *bare* inline prefix) corrected — same failure mode `.2` fixed inside `gates.md` §"Event cues"
- [x] Both optional mirrors landed per the operator decision — `docs/DOGFOOD.md`'s cue-render checklist emits 👁️ in its emphasized form, and `docs/AGENT-COMPAT.md` names bold as a fourth degradation mode that the ask survives
- [x] **Zero contract change** — this task restates the `.2` contract downstream; it adds no rule, glyph, gate, or banner
- [x] `.2`'s 12-site inherited list walked exhaustively, with a per-site verdict table in Implementation Notes (no site silently skipped)
- [x] `CORE-415.4` premise re-confirmed unchanged — no `viz`-parsed glyph set touched
- [x] Phase 4 doc-drift sweep across all 14 `.flowtron/tasknote/README.md` §"AI-referenced docs" entries

## 🧩 Subtasks

- [x] `templates/tasknote-template.md:77` — sync the Phase 3 checklist line to the `SPEC.md:572` wording
- [x] `claude/skills/ft-task/SKILL.md:152` — retype the shape parenthetical to the emphasized ask, keeping the not-a-banner assertion
- [x] `claude/skills/ft-goal-task/SKILL.md:111,159` — retype both one-time-visual-check emission instructions to the emphasized shape
- [x] `SPEC/procedures/ft-task.md:249` — retype the `👁️ CONFIRM:` prefix instruction to the emphasized shape; bump `last-verified:`
- [x] `docs/GLOSSARY.md:93` — retype "(inline emoji prefix only)" to the emphasized shape
- [x] `SPEC/model.md:128` — repair the falsified 👁️-as-bare-prefix exemplar
- [x] Resolve the two optional mirrors (`docs/DOGFOOD.md` cue-render list, `docs/AGENT-COMPAT.md` bold-degradation) per the operator decision
- [x] Full-repo `👁️` re-sweep post-edit; confirm every remaining hit is a suppression claim or already-correct shape claim
- [x] Verify zero glyph changes and zero `viz`-parsed surface touched; run the `viz` suite as a regression check

## 🔗 Related

- [[CORE-EPIC-415]] — parent epic (cue-emoji-legibility)
- [[CORE-415.1]] — epic Discovery (scoping table)
- [[CORE-415.2]] — the contract this task propagates; its Discovery Notes carry the inherited emission-site list
- [[CORE-415.4]] — follow-on: viz glyph tolerance (premise re-confirmed here)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed a real contract change (👁️ bare inline prefix → emphasized inline ask) in exactly two files and explicitly deferred every other emission site here, handing over a 12-site list. A measured sweep confirms downstream sites still describe the old shape — the propagation work is real and unstarted.

- [x] Read relevant source files — `SPEC/gates.md` (full, post-`.2`), `SPEC.md` §"Operator-cue glossary" / §"🧪 Phase 3", `.flowtron/tasknote/archive/core/CORE-415.2.md` (full), `templates/tasknote-template.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-goal-task/SKILL.md`, `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-task/step-4-debug-mode.md`, `claude/commands/ft-task.md`, `claude/commands/ft-goal-task.md`, `claude/CAPABILITIES.md`, `SPEC/procedures/ft-task.md`, `SPEC/procedures/README.md`, `SPEC/loop.md`, `SPEC/model.md`, `docs/GLOSSARY.md`, `docs/DOGFOOD.md`, `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `.flowtron/tasknote/README.md`

- [x] **Best Practices Review** — N/A for module boundaries (markdown contract/skill surface, no code edited). The applicable analogue is the **contract-layer dependency direction**, assessed in Discovery Notes: `SPEC/gates.md` is canonical, `SPEC.md` is its core mirror, and every site edited here is strictly downstream. This task adds no rule of its own — a propagation task that *invents* contract is the boundary violation to avoid.

- [x] **Archive skim** — CORE-415.2 (the contract + inherited site list + optional-mirror deferrals), CORE-355 (propagation stragglers hide in enumeration mirrors — the lesson the PLAN line cites), CORE-254.2/254.4 (vocabulary mint, then wiring labels into emission sites — the direct precedent for this task's shape), CORE-308 / CORE-353.3 (one-glyph widenings and their propagation footprint), CORE-065 (two-banner cap — the constraint every edit here must preserve), CORE-353.6 (viz glyph tolerance)

- [x] **Drift check** — every line number cited by `.2`'s handoff still resolves; see "Drift-check result" below

- [x] Asked clarifying questions — one structured ask on the two optional mirrors; see "Resolved design decisions"

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### The classification that scopes this task

`.2` handed over a list of 12 files "belonging to `.3`". Reading all of them shows the list is a **candidate** list, not a work list — the sites split cleanly by *what they claim*:

| Claim type | Falsified by `.2`? | Action |
|---|---|---|
| **Shape** — how 👁️ is emitted ("prefix", "inline emoji only", "inline prose, not a banner") | **Yes** | Retype to the emphasized shape |
| **Suppression** — that `--fast` / loop semantics silence the ask | No | Leave untouched |
| **Existence** — that 👁️ is in the cue vocabulary at all | No | Leave untouched |

This distinction is what keeps the change minimal, and it is the whole reason the site count lands at 6 rather than 12.

**Critical vocabulary catch.** Several sites say "**prose ask**". That phrase is *not* a shape claim — it is a defined term in the ask-modality vocabulary (`structured ask` = multi-option / `prose ask` = free-text; see `docs/AGENT-NEUTRALITY.md:65-67`, `SPEC/procedures/ft-task.md:51-52`). A 👁️ `CONFIRM` ask is still a prose ask under the new contract, because the operator still answers in free text. Only the surrounding *emphasis* words — "prefix", "inline emoji only" — are falsified. Blanket-replacing "prose ask" would have corrupted a working vocabulary while fixing a shape bug; the edits below keep the term and change only the emphasis descriptor.

### Site-by-site verdicts (all 👁️ hits outside `/archive/`)

**Edit — shape claim falsified (6 sites, 7 lines):**

| Site | Current text | Why falsified |
|---|---|---|
| `templates/tasknote-template.md:77` | `(👁️ prefix on the prose ask)` | The `SPEC.md:572` counterpart was synced by `.2`; this is its explicitly-deferred mirror |
| `claude/skills/ft-task/SKILL.md:152` | ``(`👁️` prefix on the prose ask … — inline emoji only, not a banner block)`` | The primary `/ft-task` emission instruction — the single highest-traffic falsified line |
| `claude/skills/ft-goal-task/SKILL.md:111` | ``via a single `👁️` prose ask`` | Emission instruction for the one-time post-loop check |
| `claude/skills/ft-goal-task/SKILL.md:159` | ``surface them now as a single `👁️` prose ask`` | Same; Step 6 emission site |
| `SPEC/procedures/ft-task.md:249` | ``a `👁️ CONFIRM:` prefix (inline prose, not a banner)`` | The agent-neutral projection; contract-only agents read *only* this |
| `docs/GLOSSARY.md:93` | `👁️ visual-confirmation prose ask (inline emoji prefix only)` | Glossary shape claim |
| `SPEC/model.md:128` | ``like the `👁️` Phase 3 prefix`` | Falsified **exemplar** — see below |

**`SPEC/model.md:128` is the subtle one.** It explains that the `[heavy]`-under-tier ⚠️ advisory is "an inline advisory only (like the `👁️` Phase 3 prefix) — not an operator-gate banner". Both halves of the analogy broke: 👁️ is no longer a bare prefix, *and* 👁️ is now the contract's designated obligation-bearing ask while ⚠️ is a non-cue residual glyph (`gates.md` §"Glyph layers and reuse"). This is precisely the failure mode `.2` caught inside `gates.md` §"Event cues", which had cited 👁️ as the exemplar of a bare prefix — the same stale exemplar survives one file over. Catching it is the CORE-355 lesson operating at repo scale rather than file scale.

**Leave — suppression or existence claim, not falsified (10 sites):**

| Site | Claim | Verdict |
|---|---|---|
| `claude/CAPABILITIES.md:30` | `--fast` suppresses the 👁️ ask | suppression — untouched |
| `claude/commands/ft-task.md:13` | `--fast` suppresses the 👁️ prose ask | suppression; "prose ask" is correct modality vocabulary |
| `claude/commands/ft-goal-task.md:2,8` | 👁️ deferred to a one-time post-loop ask | suppression/deferral |
| `claude/skills/ft-goal-task/SKILL.md:43,113,138,174` | `--fast` marker; use-`/ft-task`-instead pointer; loop gate-collapse recap | suppression/existence |
| `claude/skills/ft-goal-task/SKILL.md:110` | `### 👁️ One-time visual checks` heading | layer-2 heading, not a cue emission |
| `claude/skills/ft-micro-task/SKILL.md:41` | `/ft-micro-task` has no separate 👁️ ask | existence |
| `claude/skills/ft-task/step-4-debug-mode.md:63` | `--fast` suppresses 👁️ but not the repro re-verify | suppression |
| `SPEC/loop.md:62,64` | 👁️ suppressed inside the loop; split to a one-time ask | suppression |
| `docs/PLATFORMS.md:301` | a Grok `--fast` equivalent would suppress 👁️ | suppression (`.2` reached the same verdict) |
| `.flowtron/PLAN.md:16` | the epic's own filing description | historical record — never retro-edited |

**Layers 2 and 3 confirmed no-op.** `.2` recorded explicit **no-change** verdicts for tasknote-structure glyphs and model-tier glyphs. Verified there is nothing to propagate: no glyph was added, removed, or reassigned, so no heading, chip, template, or tier mirror moves. The `.2` handoff did its job — this task has zero work on two of the epic's three layers.

**No mirror exists for `.2`'s new subsections.** §"Glyph layers and reuse" and the non-cue residual list are *new* contract with no pre-existing downstream restatement, so they propagate nowhere. Confirmed by grep: the uniqueness rule (`unique across the table`) appears only in `gates.md`, and no other file enumerates the glyph layers. Nothing to sync.

### Drift-check result

**Clean against code and line numbers.** All seven target lines resolve exactly as `.2` recorded them: `templates/tasknote-template.md:77`, `claude/skills/ft-task/SKILL.md:152`, `claude/skills/ft-goal-task/SKILL.md:111,159`, `SPEC/procedures/ft-task.md:249`, `docs/GLOSSARY.md:93`, `SPEC/model.md:128`.

**Cross-artifact half — one narrowing, no contradiction.** The `PLAN.md` line names four docs mirrors: `AGENT-COMPAT`, `DOGFOOD`, `GLOSSARY`, `PLATFORMS`. Read against evidence:

- `GLOSSARY` — falsified, **in scope** as filed.
- `PLATFORMS` — its single 👁️ hit is a suppression claim, **not falsified**. `.2`'s own doc-drift sweep independently reached this verdict.
- `AGENT-COMPAT` / `DOGFOOD` — **not falsified**, but each has a coherence-completeness case (below), which `.2` flagged as optional and left to an operator call here.

The `PLAN.md` line also omits `SPEC/model.md`, which *is* falsified. This is the expected shape of a filing written before the sweep ran — a candidate list, narrowed and extended by measurement — not scope drift. It does **not** contradict any SPEC contract: this task adds no rule and preserves the CORE-065 two-banner cap by construction, since restating an existing shape cannot promote it.

### Resolved design decisions (AskUserQuestion, 2026-08-08)

| # | Question | Resolution |
|---|---|---|
| 1 | The two optional mirrors `.2` deferred — `docs/DOGFOOD.md`'s cue-render checklist (emit 👁️ in its emphasized form so the dogfood run actually exercises bold?) and `docs/AGENT-COMPAT.md`'s non-render failure modes (add a bold-degradation line?) | **Both.** Land them. DOGFOOD's checklist exists to *test* the canonical cue shape, so leaving it emitting the pre-`.2` form would keep certifying a shape the contract no longer specifies; and bold is a genuine fourth degradation mode that AGENT-COMPAT's stripped/tofu/mojibake triad does not cover. Chosen over strict-falsification-only, which would have left the verification surface lagging the contract it verifies |

**Effect on scope:** 8 sites, 9 lines. The 6 falsified sites are unchanged by this decision; the 2 optional mirrors are additive and were already anticipated by subtask 7.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — every edit copies wording already canonized by `.2` in `SPEC/gates.md` / `SPEC.md` rather than paraphrasing it, and each downstream site keeps its own register: the template mirrors its `SPEC.md:572` counterpart near-verbatim, the skills keep their dense single-line prose, the agent-neutral SOP keeps its route-don't-restate posture (states the shape, links the contract). No new shape vocabulary was invented — a propagation task that coins its own phrasing recreates the drift it is closing.

- [x] **Minimal refactor gate** — no refactor. Each edit is a localized retype of an emphasis descriptor inside an existing sentence; no section was moved, merged, or restructured. Deferred: nothing.

- [x] Implemented the minimal solution — 8 files, +30/−11, zero glyph changes

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract/skill surface; no executable behavior). `viz` suite run as a regression check, see Testing Notes.

**Implementation Notes:**

**Per-site verdict table — all 20 non-archive 👁️ sites walked.**

| # | Site | Verdict | Change |
|---|---|---|---|
| 1 | `templates/tasknote-template.md:77` | falsified | Phase 3 checklist line → `(emphasized \`👁️ **CONFIRM**\` ask on its own line)`, matching `SPEC.md:572` |
| 2 | `claude/skills/ft-task/SKILL.md:152` | falsified | `` `👁️` prefix … inline emoji only`` → emphasized ask; not-a-banner assertion **kept and sharpened** ("emphasis raised *within* the inline shape") |
| 3 | `claude/skills/ft-goal-task/SKILL.md:111` | falsified | one-time visual-check emission → emphasized ask + contract link |
| 4 | `claude/skills/ft-goal-task/SKILL.md:159` | falsified | Step 6 emission → emphasized ask + contract link |
| 5 | `SPEC/procedures/ft-task.md:249` | falsified | `` `👁️ CONFIRM:` prefix (inline prose, not a banner)`` → emphasized shape + `gates.md` link, keeping the inline-prose/not-a-banner distinction explicit |
| 6 | `SPEC/procedures/ft-task.md` frontmatter | stale stamp | `last-verified: v5.14.1 · 2026-08-02` → `v5.15.0 · 2026-08-08` — a genuine re-sync against the changed `restates: SPEC.md` surface, per `SPEC/procedures/README.md` |
| 7 | `docs/GLOSSARY.md:93` | falsified | "(inline emoji prefix only)" → emphasized shape + `gates.md` cross-link |
| 8 | `SPEC/model.md:128` | falsified exemplar | rewritten — see below |
| 9 | `docs/DOGFOOD.md:63` | optional mirror (operator: land) | cue-render checklist emits `👁️ **CONFIRM**` and asks the dogfooder to note whether bold renders / shows asterisks / is stripped |
| 10 | `docs/AGENT-COMPAT.md` §"Cross-agent cue fallback policy" | optional mirror (operator: land) | +10 lines naming bold as a fourth, milder degradation the ask survives |
| 11–20 | `claude/CAPABILITIES.md:30` · `claude/commands/ft-task.md:13` · `claude/commands/ft-goal-task.md:2,8` · `ft-goal-task/SKILL.md:43,110,113,138,174` · `ft-micro-task/SKILL.md:41` · `step-4-debug-mode.md:63` · `SPEC/loop.md:62,64` · `docs/PLATFORMS.md:301` · `.flowtron/PLAN.md:16` | **not falsified** | untouched — suppression, existence, heading, or historical-record claims (full reasoning in Discovery Notes) |

**The `SPEC/model.md` repair (site 8).** The old text defended the `[heavy]`-under-tier ⚠️ advisory by analogy: "an inline advisory only (like the `👁️` Phase 3 prefix)". Both halves broke. The replacement drops the analogy entirely and grounds ⚠️ in `.2`'s new §"Glyph layers and reuse" instead — ⚠️ is a **non-cue residual** glyph, so the cue vocabulary's emission contract does not govern it — then draws the contrast explicitly: 👁️ is obligation-bearing and gates completion; ⚠️ requires no operator response and stays a plain inline note. Net: an unstable analogy (which had to be re-audited every time 👁️ moved) becomes a stable classification. This site was **not** in the `PLAN.md` line's docs list — the sweep found it.

**What was deliberately *not* changed: the phrase "prose ask".** Six sites pair 👁️ with "prose ask", which reads like a shape claim but is a defined ask-*modality* term (free-text vs. multi-option; `docs/AGENT-NEUTRALITY.md:65-67`). A 👁️ ask is still a prose ask. Blanket-replacing it would have broken a working vocabulary in the name of fixing a shape bug, so only the emphasis descriptors were retyped.

**Contract-layer boundary held.** Zero edits to `SPEC/gates.md` or `SPEC.md` — the two canonical files stay exactly as `.2` left them. Every changed line restates them downstream; no rule, glyph, gate, or banner was added.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A for the changed files (markdown). Ran the full `viz` suite as a regression check: **18 files / 245 tests passed** (7.1s)

- [x] Ran lint/type-check on changed code — N/A (no executable surface); structural + invariant passes recorded below

- [x] **Quality assertions** — no code changed; applied to the contract/skill surface instead, below

- [x] (frontend) Asked the user for visual confirmation — N/A. No frontend surface: the change edits documents *describing* an ask, not any rendered UI, and no `viz/` file was touched.

**Testing Notes:**

**Invariant 1 — zero glyph changes.** Scripted the glyph set of every changed file at `HEAD` and post-edit and diffed: **added `[]`, removed `[]`**. This task restates a shape; it moves no glyph, exactly as `.2` moved none.

**Invariant 2 — no falsified shape claim survives.** Re-ran the full-repo `👁️` sweep filtered for the stale emphasis words (`prefix`, `inline emoji only`, `inline prose, not a banner`). Every surviving hit is inside this tasknote's own Discovery/Implementation notes, where the strings appear as quoted *before*-state evidence. Zero hits in shipped files.

**Invariant 3 — scope.** `git status --porcelain` → the 8 intended files plus this tasknote. Notably `SPEC.md` and `SPEC/gates.md` are **absent**, confirming the canonical layer was not re-edited.

**Invariant 4 — `CORE-415.4` premise re-confirmed.** `viz/src/parser.ts` parses only `STATUS_GLYPH` (🟢⏸✅⚪🌱) and `SUGGESTION_GLYPH` (🧠🔧🧩). No `viz/` file changed, and the glyph diff is empty, so neither set moved. `.4` still closes as a verification pass.

**Structural pass.** New `docs/AGENT-COMPAT.md` paragraph sits at body level inside §"Cross-agent cue fallback policy" with no heading introduced; the `SPEC/procedures/ft-task.md` insertion preserves the bullet's continuation indentation; all four new relative links (`../gates.md`, `gates.md`, `../SPEC/gates.md`, and the `SPEC/gates.md` §-reference in `GLOSSARY.md`) resolve to a real `§"Emphasized inline ask shape"` / `§"Glyph layers and reuse"` heading in `SPEC/gates.md`. Wrapper-name invariant (`SPEC.md` §"Skill namespace") re-run: clean.

**Contract quality assertions:**

- *No avoidable duplication* — downstream sites **state** the shape and **link** the rationale; the full argument (why structural not chromatic, the not-a-banner bound) stays single-sourced in `SPEC/gates.md`.
- *No dead contract* — every edited line is on a live read path: the template is copied at each scaffold, both SKILLs drive real runs, the SOP is the sole contract-only-agent surface, DOGFOOD is executed per agent, GLOSSARY and AGENT-COMPAT are in the Phase 4 sweep set.
- *No unexplained complexity* — no new section, term, or rule; the largest addition is one explanatory paragraph in `docs/AGENT-COMPAT.md`.
- *No unnecessary surface growth* — zero glyphs, gates, banners, or checklist boxes added. The CORE-065 two-banner cap is untouched, and three edits explicitly reassert it.
- *No stale cross-references* — the sweep caught the `SPEC/model.md` stale exemplar that the `PLAN.md` filing had not anticipated.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries walked; verdicts below

| Doc | Verdict |
|---|---|
| `README.md` | no change — zero 👁️/`CONFIRM` hits; its only cue mention is the post-closure session-reset prose |
| `SPEC.md` | no change — `.2` synced all three 👁️ surfaces (glossary row, §"🧪 Phase 3" paragraph, §"🧪 Phase 3" checklist line); re-editing the canonical layer here would violate this task's boundary |
| `docs/MIGRATION.md` | no change — adoption/bump procedures; zero hits |
| `claude/AGENTS-snippet.md` | no change — zero hits |
| `codex/AGENTS-snippet.md` | no change — wiring commands only; verified zero 👁️ hits anywhere under `codex/` or `grok/` |
| `docs/CONVENTIONS.md` | no change — zero hits |
| `CONTRIBUTING.md` | no change — zero hits |
| `SECURITY.md` | no change — zero hits |
| `docs/AGENT-NEUTRALITY.md` | no change — and positively **reaffirmed**: its `prose ask` ledger row is the authority behind this task's decision to preserve that term while retyping only the emphasis descriptor |
| `docs/PLATFORMS.md` | no change — its single hit (line 301, Grok `--fast` equivalence) is a suppression claim, not a shape claim; independently the same verdict `.2` reached |
| `claude/CAPABILITIES.md` | no change — its single hit (line 30) is likewise suppression-only. Stamp checked per this entry's standing obligation: `v5.15.0 · 2026-08-02 (dogfooded)` — version current, and the date pins to the last **real** dogfood, so it is correctly left alone (bumping it without a dogfood run is exactly what `docs/AGENT-COMPAT.md` §"Reading the cells" forbids) |
| `docs/AGENT-COMPAT.md` | **updated** — §"Cross-agent cue fallback policy" gains a bold-degradation paragraph naming a fourth, milder non-render mode the emphasized ask survives |
| `docs/EXTERNAL-AGENTS.md` | no change — delegation/handoff surface untouched; zero hits |
| `docs/WORKTREES.md` | no change — isolation convention untouched; zero hits |

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and **kept nested** beneath the still-active `CORE-EPIC-415` in `## Medium` per SPEC/epic.md §"Child placement invariant", tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip: all three signals clear)

**Final Summary:**

Propagated `CORE-415.2`'s emphasized-inline-ask contract to every downstream site that still described the old 👁️ `CONFIRM` shape — **8 files, +30/−11, zero glyph changes and zero contract changes**. The 👁️ ask is now described identically wherever an agent might read it, so no emitter can cite a stale sentence to justify the old bare-prefix shape.

**The classification that did the real work.** `.2` handed over 12 candidate files. Reading all 20 non-archive 👁️ sites showed they split by *what they claim*: **shape** claims ("prefix", "inline emoji only") were falsified and needed retyping; **suppression** claims (`--fast` silences the ask) and **existence** claims were untouched by `.2` and left alone. That is what kept the edit at 6 falsified sites instead of a 12-file rewrite — and it is why the diff is 30 lines rather than several hundred.

**The catch that mattered most: what *not* to change.** Six sites pair 👁️ with the phrase "prose ask". It reads like a shape claim, but it is a defined ask-*modality* term — free-text reply vs. multi-option (`docs/AGENT-NEUTRALITY.md:65-67`, `SPEC/procedures/ft-task.md:51-52`) — and a 👁️ ask is still a prose ask under the new contract. A blanket find-and-replace would have corrupted a working cross-agent vocabulary while fixing a formatting bug. Only the emphasis descriptors were retyped.

**One site the filing did not anticipate.** `SPEC/model.md:128` defended the `[heavy]`-under-tier ⚠️ advisory by analogy — "an inline advisory only (like the `👁️` Phase 3 prefix)" — and both halves broke: 👁️ is no longer a bare prefix, and it is now the contract's designated obligation-bearing ask while ⚠️ requires no response at all. This is the same stale-exemplar failure `.2` fixed inside `gates.md` §"Event cues", surviving one file over — CORE-355's straggler lesson operating at repo scale. The fix drops the analogy and grounds ⚠️ in `.2`'s new **non-cue residual** class instead, replacing a reference that needed re-auditing every time 👁️ moved with a stable classification.

**Two optional mirrors landed** (operator decision). `docs/DOGFOOD.md`'s cue-render checklist now emits 👁️ in its emphasized form and asks the dogfooder to record whether bold renders, shows literal asterisks, or is stripped — a verification protocol that kept certifying the pre-`.2` shape would have been quietly obsolete. `docs/AGENT-COMPAT.md` gains a paragraph naming bold as a fourth, milder degradation alongside stripped/tofu/mojibake, noting the ask survives it because the emphasis is **structural** (line break + blank-line isolation, both plain text) rather than chromatic.

**Verification.** Zero glyph changes proven by scripting the glyph set of every changed file at `HEAD` vs. post-edit and diffing (added `[]`, removed `[]`). Zero falsified shape claims survive: the full-repo `👁️` sweep filtered for `prefix` / `inline emoji only` / `inline prose, not a banner` returns hits only inside this tasknote's own quoted before-state evidence. Scope confirmed by `git status` — `SPEC.md` and `SPEC/gates.md` are absent, so the canonical layer stands exactly as `.2` left it. All four new relative links resolve to real `SPEC/gates.md` headings; the wrapper-name invariant re-ran clean; `viz` suite green (18 files / 245 tests).

**`CORE-415.4` premise re-confirmed.** No `viz/` file changed and the glyph diff is empty, so neither `STATUS_GLYPH` nor `SUGGESTION_GLYPH` moved — `.4` still closes as a verification pass, as both `.2` and its conditional PLAN line predicted.

**Maintainability effect.** The epic's contract layer and its ~20 downstream emission sites now agree on one shape statement, single-sourced: downstream sites *state* the shape and *link* the rationale rather than re-arguing it, so the next change to 👁️ touches one file plus mechanical mirrors. One unstable analogy was retired, one verification protocol was brought back in step with the contract it verifies, and one stale currency stamp was re-synced — at the cost of 30 added lines and no behavioral change to any gate.

**Archived:** 2026-08-08
