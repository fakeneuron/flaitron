---
title: xheavy-mirror-sweep
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-489, CORE-482.3, CORE-482.4]
touches:
  - docs/DOGFOOD.md
  - docs/GLOSSARY.md
---

# CORE-489.2 | xheavy-mirror-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-489]]

## 🎯 Goal

Propagate the `[xheavy]`🔭 rung into the two human/cold-start mirrors the v5.21.0 rollout missed — the `docs/DOGFOOD.md` §"Next-task cues" cue-render checklist and the `docs/GLOSSARY.md` `[model]` entry — and refresh the GLOSSARY maintenance stamp.

## ✅ Acceptance

- [x] `docs/DOGFOOD.md` §"Next-task cues" checklist lists all four tier glyphs (🔧 LIGHT / 🧩 MEDIUM / 🧠 HEAVY / 🔭 XHEAVY) plus 👇 HERE, matching `SPEC/gates.md` §"Next-task cues" label wording 1:1
- [x] `docs/GLOSSARY.md` `[model]` entry states the four-rung ladder (`[light]`/`[medium]`/`[heavy]`/`[xheavy]`) with an explicit manual-only note for `[xheavy]`, consistent with `SPEC/model.md` §"The `xheavy` rung is manual-only"
- [x] `docs/GLOSSARY.md` maintenance footer "Last significant update" stamp refreshed to this task
- [x] No new terms invented and no SPEC anchor changed — these are mirrors of contracts already landed by [[CORE-482.3]]

## 🧩 Subtasks

- [x] `docs/DOGFOOD.md:74-78` — insert `- 🔭 XHEAVY (exploratory — manual-only)` after the 🧠 HEAVY row, before 👇 HERE
- [x] `docs/GLOSSARY.md:85` — widen the `[model]` entry's primary-label list to four rungs + manual-only clause for `[xheavy]`
- [x] `docs/GLOSSARY.md` footer — refresh the "Last significant update" stamp
- [x] Phase 3: markdown mental-pass + CI drift greps run locally

## 🔗 Related

- [[CORE-EPIC-489]] — parent epic (tier-mirror-and-sweep-coverage)
- [[CORE-482.3]] — introduced the `[xheavy]`🔭 rung across SPEC surfaces (predecessor)
- [[CORE-482.4]] — propagated 🔭 to emitter restatements incl. `docs/GLOSSARY.md` `copy-paste line`, but missed the `[model]` entry and DOGFOOD entirely (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited mirrors are verifiably stale against the landed v5.21.0 contract. `docs/DOGFOOD.md` contains zero `xheavy`/`🔭`/`XHEAVY` occurrences; `docs/GLOSSARY.md:85` `[model]` still names only the three primary labels. The fix is prose-only, bounded to two files, and mirrors contracts already settled in `SPEC/model.md` + `SPEC/gates.md` — no new design surface.

- [x] Read relevant source files — `docs/DOGFOOD.md` (Step 2 cue-render checklist, lines 55-82), `docs/GLOSSARY.md` (`copy-paste line` :35, `[model]` :85, maintenance footer), `SPEC/gates.md` §"Next-task cues" (:234-254) + §"Glyph layers and reuse" (:85-96), `SPEC/model.md` (:16, :61-86, :279-296), `SPEC.md` cue glossary (:685). Probe not warranted — read set was small and known.

- [x] **Best Practices Review** — N/A for module boundaries (markdown prose only). The relevant discipline is **mirror fidelity**: label wording is copied verbatim from the canonical `SPEC/gates.md` table rather than paraphrased, so a future grep-based drift check can match both surfaces.

- [x] **Archive skim** — `grep -l` over `.flowtron/tasknote/archive/core/` for both `touches:` paths. GLOSSARY hits: CORE-433.3, CORE-467, **CORE-482.3**, CORE-473.N, CORE-476, CORE-473.6, **CORE-482.4**, CORE-485. DOGFOOD hits: CORE-438.1/.2/.3/.5, CORE-444, CORE-445.4, CORE-456.2, CORE-456.4. Load-bearing findings below.

- [x] **Drift check** — all three cited anchors verified against current code: `docs/GLOSSARY.md:85` is exactly the `[model]` entry (line number in the PLAN description is accurate, not drifted); `docs/DOGFOOD.md` §"Next-task cues" is at :74-78 with three tier rows + 👇; footer stamp reads `CORE-463.5 (2026-08-23)`. No contradiction with any SPEC contract — this task only mirrors already-landed ones. Plan matches the PLAN.md line exactly.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. DOGFOOD's cue checklist is a **render site** (verifies glyph rendering), not a filing-recommendation site — so it takes the four-way glyph list, per the CORE-482.4 edit-shape split. It is not an automated chooser and needs no "never `[xheavy]`" exclusion clause.
  2. Label wording mirrors `SPEC/gates.md:241` verbatim: `XHEAVY` (exploratory — manual-only).
  3. Extending the `[model]` entry to a rung already defined in SPEC is a *definition change*, hence "significant" under the GLOSSARY footer's own maintenance rule — the stamp refresh is warranted, and this is an epic child updating an authoritative SPEC mirror, which the rule permits.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Why the mirrors were missed (root cause, from the archive).** [[CORE-482.3]] added the rung to the SPEC/contract layer; [[CORE-482.4]] then propagated 🔭 to thirteen *emitter* restatements. `docs/GLOSSARY.md` was in `.4`'s scope — but only its `copy-paste line` entry (:35, an emitter description) was widened. The `[model]` entry (:85, a *vocabulary* definition) sits in the same file yet a different category, and slipped. `docs/DOGFOOD.md` was in neither task's scope at all: it is a **cold-start human-verification** surface, not an emitter and not a SPEC anchor, so neither task's grep shape reached it. This is the theme the parent epic names — the rollout covered contract + emitter layers but stopped short of the human/cold-start mirror layer.

**Edit-shape precedent (binding).** `.4` established two shapes: *render sites* get the literal four-way list `🔧/🧩/🧠/🔭`; *filing-recommendation sites* (where a tool picks a tag to write) instead get an explicit "never `[xheavy]`" exclusion, preserving `SPEC/model.md`'s "automated choosers cap at `[heavy]`" rule. Both surfaces here are render/definition sites → four-way list, no exclusion clause.

**Checked and deliberately not touched.** `SPEC/gates.md:92` renders as `🔧 / 🧠 / 🔭` without 🧩 — not drift: 🧩 has its own dedicated row at :87 in that glyph-layers table, so the grouped row is correct as written. No follow-up filed.

**Scope boundary.** The sibling coverage-gap fixes (VISION.md into the AI-referenced docs sweep list, `SPEC/procedures/` into AGENTS Repo Layout) belong to [[CORE-489.3]]; the adopter-template miscount to [[CORE-489.4]]. Not touched here.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established shape rather than inventing one. The DOGFOOD row copies the label wording from the canonical `SPEC/gates.md:241` table verbatim (`XHEAVY` (exploratory — manual-only)) and slots between 🧠 HEAVY and 👇 HERE, preserving the table's tier-then-navigation ordering. The GLOSSARY `[model]` rewrite follows the ladder phrasing already in `SPEC/model.md:65` (`light < medium < heavy < xheavy`, "matched by position") plus the manual-only clause from §"The `xheavy` rung is manual-only". No new vocabulary.

- [x] **Minimal refactor gate** — no refactor. Three surgical prose edits; every changed line traces to an Acceptance criterion. Adjacent staleness deliberately left alone (see Implementation Notes).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose only, no code path and no parser input changed. The repo's guard for these surfaces is the CI `drift` job, run locally in Phase 3.

**Implementation Notes:**

Three edits, +3/−2 across two files:

1. **`docs/DOGFOOD.md:78`** (+1) — inserted `- 🔭 XHEAVY (exploratory — manual-only)` into the Step 2 cue-render checklist. This checklist is what a cold-start operator walks to confirm each glyph renders in their terminal; without the row, 🔭 shipped with no render verification anywhere.

2. **`docs/GLOSSARY.md:85`** (−1/+1) — the `[model]` entry moved from "primary labels `[heavy]` / `[medium]` / `[light]`" to the full four-rung ladder, keeping the position-matching note and adding why `[xheavy]` is different: operator-filed only, never chooser-assigned, and always the Step 1.5 ⚠️ under-tier advisory. The three facts are mirrors of `SPEC/model.md` :65, :74-86, and :122 respectively — no new claim originates here.

3. **`docs/GLOSSARY.md:151`** (−1/+1) — maintenance stamp refreshed from `CORE-463.5 (2026-08-23)` to `CORE-489.2 (2026-08-29)`. [[CORE-482.4]] edited this file without refreshing the stamp, so the stamp had been silently under-reporting the file's currency by two tasks.

**Deliberately not touched.** `SPEC/gates.md:92` renders `🔧 / 🧠 / 🔭` without 🧩 — verified correct, not drift: 🧩 owns its own row at :87 in that glyph-layers table. The primary-trio references in `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, and `claude/CAPABILITIES.md` are also correct as written — they map *effort ladders* to the trio, and `[xheavy]` is by contract outside the trio and not an effort band. Sibling scope ([[CORE-489.3]] sweep coverage, [[CORE-489.4]] template miscount) untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed. Substituted the equivalent guard for these surfaces, the CI `drift` job, run locally in full (below).

- [x] Ran lint/type-check on changed code — `N/A` (markdown). CI `drift` job run locally, all five checks pass: wrapper-name invariant **OK**, shipped-skill parity (claude ↔ codex) **OK**, Pair A templates-roster clause **OK**, Pair C template back-link depth **OK**, Pair E ft-flowtron roster rows **OK**.

- [x] **Quality assertions** — no duplication introduced: both edits point back at the canonical `SPEC/` anchors rather than restating the rationale. Residual-staleness grep over both touched files for three-way tier lists (`[heavy]` / `[medium]` / `[light]`, bare `🔧/🧩/🧠`) returns **none**. No public surface grew; no code-facing docs went stale.

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface; `viz/` untouched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Verification was documentation-appropriate rather than test-suite-based:

- **CI `drift` job, locally** — all five checks green (`.github/workflows/ci.yml` job `drift`). This is the repo's standing guard against exactly the cross-file mirror staleness this task fixes.
- **Residual three-way grep** — `docs/DOGFOOD.md` + `docs/GLOSSARY.md` searched for the trio-only patterns; zero hits.
- **Presence check** — `xheavy|XHEAVY|🔭` now occurs 1× in `docs/DOGFOOD.md` (was 0) and 3× in `docs/GLOSSARY.md` (was 1, the `copy-paste line` entry).
- **Mirror-fidelity read** — DOGFOOD's new row diffed by eye against `SPEC/gates.md:241`; label text matches character-for-character.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Doc-drift sweep verdicts** — all 17 AI-referenced entries: **no change**. Neither touched file is on the list (`docs/GLOSSARY.md` is explicitly barred from it by its own maintenance footer; `docs/DOGFOOD.md` is not listed — a coverage question that belongs to [[CORE-489.3]], not here). Spot-grepped all 17 for residual three-way tier claims: the hits in `docs/AGENT-NEUTRALITY.md:50/:54`, `docs/PLATFORMS.md:382/:410`, and `claude/CAPABILITIES.md:29/:56` are correct as written — they name the **primary trio** or map *effort ladders* to it, and `[xheavy]` is by contract outside the trio and not an effort band. The emitter rows at `docs/PLATFORMS.md:390/:418` already carry 🔭 from [[CORE-482.4]].

**Final Summary:**

Closed the two human/cold-start mirrors the v5.21.0 `[xheavy]`🔭 rollout stopped short of. [[CORE-482.3]] landed the rung across the SPEC/contract layer and [[CORE-482.4]] propagated the glyph to thirteen emitter restatements — but `docs/DOGFOOD.md` was in neither task's scope (it is a cold-start *human-verification* surface, matching neither grep shape), and inside `docs/GLOSSARY.md` only the `copy-paste line` entry was widened while the `[model]` **definition** entry — same file, different category — slipped. Three edits, +3/−2: DOGFOOD's Step 2 cue-render checklist gained `- 🔭 XHEAVY (exploratory — manual-only)`, copied character-for-character from the canonical `SPEC/gates.md:241` table so a future drift grep matches both surfaces; the GLOSSARY `[model]` entry moved to the full four-rung ladder (`[light]` < `[medium]` < `[heavy]` < `[xheavy]`, matched by position) with the three manual-only facts mirrored from `SPEC/model.md` :65 / :74-86 / :122 — operator-filed only, never chooser-assigned, always the Step 1.5 ⚠️ under-tier advisory; and the maintenance stamp refreshed from `CORE-463.5 (2026-08-23)` to this task, correcting a stamp `.4` had left two tasks stale. No new terms and no SPEC anchor changed — every claim here is a mirror. Deliberately left alone after verification: `SPEC/gates.md:92`'s `🔧 / 🧠 / 🔭` row (not drift — 🧩 owns its own row at :87) and the primary-trio references in AGENT-NEUTRALITY / PLATFORMS / CAPABILITIES (correct — they map effort ladders, and `[xheavy]` is outside the trio by contract). Verification: CI `drift` job run locally, all five checks green; residual three-way-tier grep over both touched files returns zero. Docs verdict: all 17 AI-referenced entries **no change** — neither touched file is on the list, which is itself the coverage gap [[CORE-489.3]] takes up. Maintainability effect: the operator's cold-start render check and the project's own vocabulary reference now agree with the contract, so a `[xheavy]` filing no longer reads as an undocumented tag to a human arriving through the docs layer.

**Archived:** 2026-08-29
