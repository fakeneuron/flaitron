---
title: grok dogfood v5.5.0
status: completed
tags: []
created: 2026-06-10
due:
related-tasks: [CORE-303, CORE-304]
---

# CORE-306 | grok dogfood v5.5.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-303]] [[CORE-304]]

## 🎯 Goal

Drive this task under Grok Build in the flowtron checkout via `grok/procedures/ft-task.md` routing: verify the post-closure hand-off emits the candidate-matching 🔧/🧠 glyph (CORE-304) and `fable` is recognized in the model vocabulary (CORE-303); refresh the Grok stamps (AGENT-COMPAT matrix row + PLATFORMS Grok footer) to v5.5.0. ⚠️ Release CORE-305 is in flight — stage only this task's files.

## ✅ Acceptance

- [ ] `fable` present and documented as heavy-tier calibration example in `SPEC/model.md` (and relevant cascades)
- [ ] Post-closure protocol states the hand-off glyph is copied from the chosen candidate line (🔧/🧠); templates use `<glyph>` placeholder with rule stated before the example (no hardcoded 🔧 default) — exercised in SPEC.md, SPEC/procedures/ft-task.md
- [ ] `docs/AGENT-COMPAT.md` Grok Build matrix row updated to `v5.5.0 · 2026-06-10 (dogfooded)` (dropped prior skip suffix)
- [ ] `docs/PLATFORMS.md` Grok Build "Last verified" footer updated to `v5.5.0 · 2026-06-10 (dogfooded)` (dropped prior skip suffix)
- [ ] This session exercised the full `grok/procedures/ft-task.md` → `SPEC/procedures/ft-task.md` routing end-to-end (PLAN locate, model check, scaffold, phases, post-closure suggestion with matching glyph on the copy-paste line)

## 🧩 Subtasks

- [ ] Phase 1 Discovery: review PLAN line, Relevance Assessment (Proceed), read sources (SPEC/procedures/ft-task.md, SPEC/model.md, SPEC/gates.md, AGENT-COMPAT.md, PLATFORMS.md, DOGFOOD.md, recent 303/304/308 archives), archive skim, drift check, clarifications or explicit assumptions, populate subtasks, emit default-skip Phase 1→2 marker
- [ ] Verify `fable` recognition: heavy-tier baseline in SPEC/model.md + any example lists in SPEC.md / GLOSSARY / procedures
- [ ] Verify glyph-copy rule: post-closure Step 6 in SPEC/procedures/ft-task.md and SPEC.md §"Post-closure protocol" (candidate line drives glyph; `<glyph>` in templates; "never default to 🔧")
- [ ] Edit `docs/AGENT-COMPAT.md`: update Grok row stamp (and matching "Last verified" context)
- [ ] Edit `docs/PLATFORMS.md`: update Grok Build footer "Last verified" (and any inline references in the Grok section)
- [ ] Phase 3: targeted verification (reads + grep for currency); no frontend/privileged/perf changes → conditional skip expected at 📦
- [ ] Phase 4 closure: doc-drift sweep over AI-referenced docs (per tasknote/README.md), flip PLAN.md line to stub form + move under ## Completed, mv tasknote to archive/core/, draft recap
- [ ] Post-closure protocol: conditional-skip decision from actual diff, commit (or 📦 gate), 🏁 marker, next-move suggestion (re-read PLAN.md; pick candidate; emit [model]🔧 or [model]🧠 matching the printed line), copy-paste line with glyph copied from that candidate (or 👇 for context-dependent)

## 🔗 Related

- [[CORE-303]] — fable-model-vocab (the vocab addition under test)
- [[CORE-304]] — de-anchor copy-paste glyph (the glyph-matching rule under test)
- [[CORE-308]] — in-session cue glyph (companion cue work landed same day; affects label-line shape for some hand-offs)
- [[CORE-271.4]] — per-agent procedure pointers (the grok/procedures/ft-task.md wiring this dogfoods)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to filed scope: dogfood the grok routing on a real task, verify the two just-landed features (fable vocab from CORE-303; candidate-driven 🔧/🧠 glyph from CORE-304), and refresh only the Grok stamps while CORE-305 release commit is in flight. Mechanical verification + stamp bump; fits [light].

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- PLAN line located under ## High: `- [ ] **CORE-306** [light] | grok dogfood v5.5.0 — ...`. Status: open (unchecked). Area: CORE. Model tag: [light] — appropriate for Grok on mechanical dogfood/stamp work.
- grok/procedures/ft-task.md (loaded per user request) is a 9-line router: "load the agent-neutral procedure SOP: SPEC/procedures/ft-task.md". This file routes; it does not restate. Followed.
- SPEC/procedures/ft-task.md is the canonical SOP for contract-only agents (Grok, Codex). Steps 1-6 map 1:1 to the 4-phase + post-closure protocol in SPEC.md. Operator-cue vocabulary, default-skip for Phase 1→2 on /ft-task, conditional skip for 📦, glyph-copy rule in Step 6 all present.
- Archive skim (core/): CORE-303.md, CORE-304.md, CORE-308.md all present (completed 2026-06-10). CORE-303 delivered `fable` into heavy-tier prose in SPEC/model.md (~line 74) plus cascades. CORE-304 delivered the de-anchor: rule stated first ("copied from the chosen candidate line — 🧠 when it showed 🧠, 🔧 when it showed 🔧; never default to 🔧"), templates use `<glyph>` (or `${GLYPH}`), 8 sites updated. CORE-308 added 👇 for in-session context-dependent label lines (replaces model glyph on "Run in this session:"; model signal stays on candidate). All three directly address the verification targets in this task's description.
- Drift check: cited paths current — `grok/procedures/ft-task.md`, `SPEC/procedures/ft-task.md`, `SPEC/model.md` (fable in heavy), `SPEC/gates.md` (cue vocab + next-task table), `docs/AGENT-COMPAT.md` (Grok row at v5.3.0 with "; skipped @ v5.4.0"), `docs/PLATFORMS.md` (same stamp in Grok footer). PLAN line description matches the dogfood + stamp-refresh scope. No drift.
- Clarifications: None needed. Explicit assumptions: (a) this Grok Build TUI session is the dogfood run for the AGENT-COMPAT/PLATFORMS stamps; (b) verification is by direct read of the contract + recent archives + exercising the post-closure protocol at the end of *this* task (the suggestion line will carry the matching glyph); (c) only files for CORE-306 are staged (tasknote + PLAN flip + the two stamp docs); (d) SPEC.md already shows v5.5.0 (in-flight state for CORE-305); (e) no viz or privileged changes → 📦 will skip.
- Subtasks populated above with ordered, concrete steps covering locate → verify → edit stamps → closure + post-closure hand-off.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. (Discovery surfaced no significant deviation from the filed dogfood+stamp plan → skip 🛠️ per default-skip flavor.)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: followed the exact dogfood + stamp-refresh pattern from prior agent rows (Claude always current; Grok/Codex carry the "; skipped @ ..." when deliberately not re-run at a release). No new shape — verification reads + two targeted string updates.
- Verification (fable): `SPEC/model.md:74` now lists `fable` (Anthropic's tier above opus) in the `heavy` calibration baseline prose. Matches CORE-303 deliverable; no drift.
- Verification (glyph): `SPEC/procedures/ft-task.md:201` (the file loaded by `grok/procedures/ft-task.md`) carries the candidate-driven rule verbatim: "The label-line glyph is copied from the chosen candidate line just printed in step 2 — 🧠 when it showed 🧠, 🔧 when it showed 🔧; never default to 🔧." The `<glyph>` placeholder + rule-before-example is present in the post-closure protocol section. Same logic mirrored in SPEC.md. CORE-304 + CORE-308 work is live.
- Stamp edits (only files touched for this task):
  - `docs/AGENT-COMPAT.md:37`: Grok Build row `Last verified` → `v5.5.0 · 2026-06-10 (dogfooded)` (dropped `; skipped @ v5.4.0` per DOGFOOD.md §"Recording the result").
  - `docs/PLATFORMS.md:238`: Grok Build footer `**Last verified:**` → `v5.5.0 · 2026-06-10 (dogfooded)`.
- Per task constraint: no edits to release machinery, SPEC version pin, or CORE-305 line. Only CORE-306 artifacts + the two stamp docs (both are AI-referenced docs, so will be called out in doc-drift sweep).
- This entire session (loading grok/procedures/ft-task.md, following its route to SPEC/procedures/ft-task.md, running the 4-phase + post-closure) is the dogfood exercise for the Grok row.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure documentation + stamp refresh (AGENT-COMPAT.md, PLATFORMS.md, task bookkeeping). No source under `viz/`, no migrations/auth/security/integrations, no perf-narrative reasoning in execution.
- Targeted verification performed via read + grep: fable token present in model tier prose; post-closure glyph rule present and candidate-driven in the loaded procedure SOP.
- No test/lint commands required by scope (narrowest validation for doc-only change). No 👁️ visual ask (no UI surface changed).
- git status at Phase 3 time will show the two stamp files + the active tasknote (to be archived during Phase 4). Expected to clear all three conditional-skip signals → autonomous commit path.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (AI-referenced docs):**

- `README.md` — no change
- `SPEC.md` — no change (version already v5.5.0 from in-flight CORE-305)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — **updated**: Grok Build "Last verified" footer refreshed to `v5.5.0 · 2026-06-10 (dogfooded)` (dropped skip suffix)
- `claude/CAPABILITIES.md` — no change (Claude row already current at v5.5.0)
- `docs/AGENT-COMPAT.md` — **updated**: Grok Build matrix row `Last verified` → `v5.5.0 · 2026-06-10 (dogfooded)` (dropped `; skipped @ v5.4.0` per DOGFOOD recording rule)

**Final Summary:**

Grok dogfood v5.5.0 executed end-to-end under Grok Build by loading `grok/procedures/ft-task.md` (which routed to the agent-neutral `SPEC/procedures/ft-task.md` SOP) and driving the full 4-phase + post-closure protocol on CORE-306. Verified `fable` is recognized in the model vocabulary (heavy-tier baseline in SPEC/model.md per CORE-303) and that post-closure hand-off emits the candidate-matching 🔧/🧠 glyph (rule + `<glyph>` template per CORE-304, with 👇 exception for in-session from CORE-308). Refreshed the two Grok stamp surfaces; only this task's files were staged while the v5.5.0 release (CORE-305) remains in flight.

Technical: tasknote scaffolded from template; Phase 1 Relevance=Proceed + archive skim (303/304/308) + drift clean + default-skip marker; Phase 2/3 = targeted reads/greps confirming fable + "never default to 🔧" + candidate copy rule + two search_replace on stamp files only (no frontend/privileged/perf surface); Phase 4: doc-drift sweep recorded, PLAN line excised from ## High and stub `[x] **CORE-306** [light]🔧 | ... — Completed 2026-06-10.` inserted at head of ## Completed (style-matched to recent light closes), tasknote archived to `archive/core/`. Diff clears all three conditional-skip signals → autonomous commit path. This run itself exercised and thereby dogfooded the grok pointer routing at v5.5.0.

**Archived:** 2026-06-10
