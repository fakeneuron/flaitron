---
title: nas-term-cues
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-254.3, CORE-308, CORE-353.3]
---

# CORE-444 | nas-term-cues

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-254.3]] [[CORE-308]] [[CORE-353.3]]

## 🎯 Goal

Add 📡 NAS and 💻 TERM as event cues, narrow ▶️ RUN to generic/agent-adjacent steps, and extend uniqueness plus destructive-escalation so the new command cues escalate like 🗄️/▶️.

## ✅ Acceptance

- [x] `SPEC/gates.md` event-cue table carries 📡 `NAS` (operator runs a command on the NAS) and 💻 `TERM` (paste a command into the operator TTY), and ▶️ `RUN`'s "Fires when" is narrowed to generic/agent-adjacent steps
- [x] Destructive-action escalation applies to 📡 and 💻 the same way it applies to 🗄️/▶️ (predicate, banner labels, bound, `--fast` does-not-suppress, never-escalates list)
- [x] Uniqueness holds: 📡 and 💻 collide with no existing cue, structure, tier, or residual glyph
- [x] Cold-start mirrors stay coherent: `SPEC.md` glossary + destructive sentence, `docs/DOGFOOD.md` event-cue list, `SPEC/procedures/ft-task.md` roster, `docs/AGENT-COMPAT.md` fallback-label list
- [x] Existing ▶️ RUN emission sites stay ▶️ unless they are NAS-bound or operator-TTY-bound (none currently are)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Update `SPEC/gates.md` event-cue table + surrounding command-destination prose
- [x] Extend destructive-escalation (intro, trigger table, predicate, banner labels, bound, red-flag, control-marker note)
- [x] Update `SPEC.md` operator-cue glossary + the two 🗄️/▶️ destructive sentences
- [x] Update mirrors: `docs/DOGFOOD.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-COMPAT.md`, `SPEC/loop.md`, `claude/CAPABILITIES.md`
- [x] Markdown mental-pass: uniqueness, cross-refs, 🗄️/▶️ leftover enumerations that should now include 📡/💻
- [x] Phase 4: doc-drift sweep + PLAN stub + archive

## 🔗 Related

- [[CORE-254.3]] — original event-cue contract (🗄️/▶️/✋ + destructive escalation)
- [[CORE-308]] — one-glyph widening precedent (👇 HERE) that updated contract + roster in one task
- [[CORE-353.3]] — later one-glyph widening (🧩 MEDIUM); contract-only because wiring was a sibling

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The filed split (NAS vs operator TTY vs generic RUN) is still the right vocabulary gap; ▶️ RUN currently covers every non-DB command with no destination, and the uniqueness + escalation extensions are the same change, not a re-scope.

- [x] Read relevant source files — `SPEC/gates.md` §"Operator-cue vocabulary" (event cues, uniqueness, destructive escalation), `SPEC.md` §"Operator-cue glossary", `docs/DOGFOOD.md` Step 2, `SPEC/procedures/ft-task.md` roster, `docs/AGENT-COMPAT.md` fallback-label list, `SPEC/loop.md` destructive carve-out, `claude/CAPABILITIES.md` `--fast` row, existing ▶️ RUN emission sites in `ft-release` + `step-1.5-model-edge`

- [x] **Best Practices Review** — `SPEC/gates.md` is the SSOT; `SPEC.md` glossary is the compact cold-start projection; other files are mirrors or leftover `🗄️/▶️` enumerations. No new shape: add two event-cue rows and widen the existing command-cue escalation family. Existing ▶️ RUN sites (`git commit`/`tag`/`push`, `/model`) remain agent-adjacent and stay ▶️.

- [x] **Archive skim** — CORE-254.2 minted 🗄️/▶️/✋; CORE-254.3 codified the table + destructive escalation; CORE-308 added 👇 (contract + roster in one task); CORE-353.3 added 🧩 (contract-only because `.4` owned emitters). This standalone task follows the CORE-308 pattern for mirrors, not the epic-split pattern.

- [x] **Drift check** — cited surfaces match HEAD. Event-cue table is still 🗄️/▶️/✋ only. Uniqueness is scoped to the cue table; residual set is ⚡ 🔬 🧭 🌳 🔁 🔄 📌 📋 ⚠️ — neither 📡 nor 💻 appears. Escalation still names only 🗄️ DB and ▶️ RUN. PLAN.md line matches this plan.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Explicit assumptions:

1. **Destination split.** 📡 NAS = run this on the NAS. 💻 TERM = paste this command into the operator's TTY (not the agent shell). ▶️ RUN narrows to generic/agent-adjacent workspace commands (build, test, script, server). ✋ ACTION stays non-command manual steps (paste a secret, click a link).
2. **📡 stays NAS-named** as filed — not generalized to HOST/REMOTE.
3. **Scope is contract + required mirrors**, not a skill-rewire. Existing ▶️ RUN sites stay ▶️ (they are workspace/session commands, not NAS or operator-TTY).
4. **Destructive banner labels** parallel 🗄️: `Destructive NAS command` / `Destructive TERM command`. ▶️ keeps `Destructive command`.
5. **Uniqueness** is the existing table rule applied to the new glyphs, not a new uniqueness regime.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: same shape as CORE-254.3's event-cue rows + CORE-308's one-glyph widening. New cues are two more event-cue table rows; escalation widens the existing command-cue family rather than inventing a second banner type. `SPEC/gates.md` stays SSOT; glossary / dogfood / procedures / AGENT-COMPAT / `--fast` prose are projections.

Minimal refactor: none. Existing ▶️ RUN emission sites (`ft-release` git commit/tag/push, `step-1.5-model-edge` `/model`) stay ▶️ — they are workspace/session commands, not NAS- or TTY-bound.

Tests N/A: markdown contract, no executable surface (CORE-254.3 / CORE-353.3 precedent).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Targeted suite / lint / typecheck: N/A — markdown-only contract (no viz parser or executable surface). Frontend 👁️: N/A.

Quality: uniqueness grep — 📡 and 💻 appear only as the new cue; residual set (⚡ 🔬 🧭 🌳 🔁 🔄 📌 📋 ⚠️) untouched. Stale "non-DB command" RUN wording gone. Leftover `🗄️/▶️` enumerations that name the escalation set now read `🗄️/▶️/📡/💻`. Mirrors list labels/glyphs only; they do not restate the full table.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added 📡 NAS and 💻 TERM as event cues and narrowed ▶️ RUN to generic/agent-adjacent workspace commands, so a command cue now names *where* it runs. Destructive-action escalation covers the new command cues the same way it covers 🗄️/▶️.

Paths: `SPEC/gates.md` (SSOT table + escalation), `SPEC.md` glossary, mirrors in `docs/DOGFOOD.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-COMPAT.md`, `SPEC/loop.md`, `claude/CAPABILITIES.md`. ~+33/−18 markdown. No executable surface; existing ▶️ RUN emission sites left as-is (still agent-adjacent).

Doc-drift: `SPEC.md` updated; `claude/CAPABILITIES.md` updated; `docs/AGENT-COMPAT.md` updated. Remaining AI-referenced docs: no change (`README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`).

Maintainability: command destination is now a first-class cue split instead of an overloaded ▶️ RUN, and the escalation family stays one banner type.

**Archived:** 2026-08-17
