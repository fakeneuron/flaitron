---
title: adopter-template-reconcile
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-EPIC-489, CORE-489.3]
touches:
  - templates/tasknote-README.md
---

# CORE-489.4 | adopter-template-reconcile

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-489]]

## 🎯 Goal

Fix `templates/tasknote-README.md`'s "Three variants:" lead-in (four bullets actually follow) and reconcile the variant list against `ls templates/` — the sidequest stub (`sidequest-template.md`) has no bullet.

## ✅ Acceptance

- [x] `templates/tasknote-README.md`'s variant-list lead-in count matches the number of bullets that follow it
- [x] The variant list gains a Sidequest bullet (mirroring the existing bullet style) describing `/ft-file-followup --park` scaffolding from `sidequest-template.md`
- [x] No unrelated entries in the file reordered or reworded — `git diff` confirms a single-hunk edit to the lead-in line plus one inserted bullet

## 🧩 Subtasks

- [x] Fix the "Three variants:" lead-in in `templates/tasknote-README.md` to match the post-fix bullet count
- [x] Insert a Sidequest bullet into the variant list, matching the existing "**Name** — `/command` scaffolds from `template.md` ...; lifecycle/threshold at `<pointer>`" shape
- [x] Phase 3: markdown mental-pass + CI drift greps run locally

## 🔗 Related

- [[CORE-EPIC-489]] — parent epic (tier-mirror-and-sweep-coverage)
- [[CORE-489.3]] — sibling child; closed the other two doc-drift-sweep coverage gaps this same epic surfaced

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both facts cited in the PLAN.md line are verifiably still true. `templates/tasknote-README.md` §"Layout" (the adopter-facing seed file, not flowtron-self's own `.flowtron/tasknote/README.md`) opens "Tasknotes are scaffolded automatically by the slash commands from `.flowtron/core/templates/`; inspect those files directly for the canonical shapes. Three variants:" followed by four bullets (Standard, Starter, Micro, Epic lifecycle). `ls templates/` additionally lists `sidequest-template.md`, `spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md` — none has a bullet in this list. Confirmed scope-narrowing below: only the sidequest stub is in scope.

- [x] Read relevant source files — `templates/tasknote-README.md` (full file, 81 lines), `.flowtron/tasknote/README.md` (flowtron-self's own equivalent, for contrast), `templates/sidequest-template.md`, `claude/skills/ft-file-followup/SKILL.md` (park-mode section), `SPEC.md` §"Working in the flowtron repo itself" (templates/ roster), `SPEC/tasknote-selection.md` (sidequest filing-motion mention). Probe not warranted — read set was small and known.

- [x] **Best Practices Review** — N/A for module boundaries (markdown prose only). The relevant discipline is matching the existing bullet's fixed shape: `**Name** — `/command [args]` scaffolds from `template.md` for <one-line purpose>; <lifecycle-or-threshold pointer>.` The new bullet follows that shape exactly rather than inventing a new one.

- [x] **Archive skim** — `ls .flowtron/tasknote/archive/core/` then `grep -l "tasknote-README"` and `grep -l "sidequest"` over the hits. `CORE-489.3` touches `.flowtron/tasknote/README.md` (the *self-host* copy, a different file from this task's target) — confirms the two READMEs are edited independently and this task's target (`templates/tasknote-README.md`) was untouched by that sibling. No archived tasknote previously edited `templates/tasknote-README.md`'s variant-list section — this is a first touch. `CORE-353.*` and a few others reference "sidequest" in passing (adding the `📌` glyph, the `--park` flag itself) but none touch this README file.

- [x] **Drift check** — re-read `templates/tasknote-README.md` line-by-line: "Three variants:" at line 16, followed by exactly four `-` bullets (Standard 4-phase, Starter, Micro, Epic lifecycle) at lines 17-20. `ls templates/` (10 entries) vs. the four bulleted + `PLAN.md` (the seed file itself, not a tasknote variant) confirms `sidequest-template.md`, `spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md` all lack a bullet. Cross-checked flowtron-self's own `.flowtron/tasknote/README.md` for contrast: it never had this "Three/Four variants:" framing at all — its "Layout" section is a flat list of all ten `templates/` filenames instead, so it carries no analogous drift and needs no matching edit. Cross-referencing `SPEC.md` §"Tasknote frontmatter" / §"Starter tasknotes" and `SPEC/tasknote-selection.md`: nothing in the SPEC contract requires this README section to enumerate every template file — it documents only the tasknote-shaped variants scaffolded by an ID-taking slash command into `.flowtron/tasknote/` or `.flowtron/sidequest/`. That scopes `spec-template.md` (used by `/ft-spec`, writes to `.flowtron/specs/`, a planning artifact, not a tasknote), `loop-heartbeat-template.md` (a `## 🔁 Iterations` log fragment within a goal-loop tasknote, per `SPEC/loop.md`, not a standalone variant) and `audit-overlay-template.md` / `subagent-probe-template.md` (audit-fork and probe-brief formats, neither scaffolded into the tasknote/sidequest dirs) **out** of this list — matching the PLAN.md line's explicit parenthetical, which names only the sidequest stub as unlisted.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. "Reconcile the variant list with `ls templates/`" means add the one variant genuinely missing (sidequest) per the PLAN.md line's own parenthetical — not enumerate every file in `templates/`, several of which (`spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md`, `PLAN.md`) are not tasknote-shaped scaffolding variants and are already documented elsewhere (`SPEC.md`'s templates/ roster paragraph, `docs/MIGRATION.md` §1.2.1 for audit-overlay).
  2. The lead-in count fix should read "Five variants:" after the sidequest bullet is inserted, keeping the sentence style (`Three variants:` → `Five variants:`) rather than dropping the count into prose.
  3. New bullet position: after Micro, before Epic lifecycle — mirrors a light-to-heavy-ish ordering (Standard, Starter, Micro, Sidequest) with the structurally-different bracketing pattern (Epic lifecycle) kept last, matching where it already sits.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Confirmed the drift is isolated to `templates/tasknote-README.md` — the adopter-facing seed copy under `templates/` that `/ft-new-project` drops into new adopter repos (per `SPEC.md` §"Working in the flowtron repo itself"). Flowtron-self's own `.flowtron/tasknote/README.md` (read for contrast) already lists all ten `templates/` filenames flatly in its "Layout" section and carries no "Three/Four variants:" lead-in at all, so it has no matching drift and is out of scope. `docs/VISION.md` doc-drift sweep target list (`.flowtron/tasknote/README.md` §"AI-referenced docs") does not include `templates/tasknote-README.md` itself, so this fix carries no doc-drift-sweep ripple.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing bullet shape (`**Name** — command + template + one-line purpose + lifecycle/threshold pointer`) for the new Sidequest bullet rather than inventing a new format.

- [x] **Minimal refactor gate** — no refactor; two surgical edits (lead-in count, one inserted bullet) trace directly to Acceptance.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown prose only.

**Implementation Notes:**

One file, +2/−1 (single hunk): `templates/tasknote-README.md:15-19`.

1. Lead-in count `Three variants:` → `Five variants:`, matching the post-fix bullet count.
2. Inserted a Sidequest bullet after Micro-tasknote, before Epic lifecycle: `**Sidequest stub** — `/ft-file-followup --park [ID]` scaffolds from `sidequest-template.md` to park a mid-session idea or quick fix without losing it; writes `.flowtron/sidequest/<ID>.md` alongside a PLAN.md line. Filing-motion guidance at `.flowtron/core/SPEC/tasknote-selection.md` §"When to use a tasknote (and when not to)".` — same shape as the three preceding bullets (command + template + one-line purpose + pointer).

`spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md`, and `PLAN.md` deliberately left off the list per the Discovery drift-check scope call: none is a tasknote-shaped variant scaffolded into `.flowtron/tasknote/` or `.flowtron/sidequest/` by an ID-taking slash command, and each is already documented elsewhere (`SPEC.md`'s templates/ roster paragraph; `docs/MIGRATION.md` §1.2.1 for audit-overlay).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed. Substituted the equivalent guard: the CI `drift` job's wrapper-name invariant check, run locally (below).

- [x] Ran lint/type-check on changed code — N/A (markdown). `git diff templates/tasknote-README.md` reviewed line-by-line: single hunk, +2/−1, no adjacent lines disturbed.

- [x] **Quality assertions** — no duplication introduced: the new bullet reuses the exact shape of the three preceding bullets. No public surface grew; no code-facing documentation went stale (the edited file is documentation itself, and the edit corrects rather than introduces staleness).

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface; `viz/` untouched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- **`git diff` review** — one file, single-hunk, +2/−1: clean, no reflow of surrounding content.
- **Wrapper-name invariant** (CI `drift` job check, run locally) — `for f in claude/commands/ft-*.md; do grep -q "\`$(basename "$f" .md)\`" "$f" || echo FAIL; done` — clean, no output. Unaffected by this edit (different file family) but the closest-matching CI `drift` guard to this surface, so run as the equivalent verification.
- **Doc-drift sweep target check** — `templates/tasknote-README.md` is not itself an entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" (grep confirmed), so this edit carries no doc-drift-sweep ripple.
- **Presence check** — `templates/tasknote-README.md` now reads "Five variants:" followed by exactly five bullets (was "Three variants:" / four bullets); `sidequest-template.md` now has exactly one bullet referencing it (was zero).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Doc-drift sweep verdicts** — 18 AI-referenced entries in `.flowtron/tasknote/README.md` §"AI-referenced docs": all 18 — **no change** (none reference `templates/tasknote-README.md`'s variant-list section; the edited file is itself off the AI-referenced-docs sweep list, confirmed by grep during Phase 3).

**Final Summary:**

Fixed the adopter-facing `templates/tasknote-README.md`'s stale "Three variants:" lead-in (four bullets actually followed) and closed the one genuine gap it flagged: `sidequest-template.md` had no bullet in the variant list, even though `/ft-file-followup --park` scaffolds a real, currently-shipping tasknote variant from it. Single-hunk edit, +2/−1: lead-in corrected to "Five variants:" and a new Sidequest bullet inserted (after Micro, before Epic lifecycle) matching the existing bullet shape exactly. Deliberately left four other `templates/` files (`spec-template.md`, `audit-overlay-template.md`, `loop-heartbeat-template.md`, `subagent-probe-template.md`) off the list — none is a tasknote-shaped variant scaffolded into `.flowtron/tasknote/` or `.flowtron/sidequest/`, and each is already documented elsewhere (`SPEC.md`'s templates/ roster paragraph; `docs/MIGRATION.md` §1.2.1 for audit-overlay), matching the PLAN.md line's own parenthetical scope call ("sidequest stub unlisted"). Verification: `git diff` confirmed a clean single hunk; the CI `drift` job's wrapper-name invariant check ran clean locally (unaffected surface, closest-matching guard); confirmed by grep that `templates/tasknote-README.md` is not itself on the doc-drift sweep list, so this fix has no sweep ripple. Docs verdict: 18 of 18 AI-referenced entries no change (this fix targets a file outside that sweep set). Maintainability effect: an adopter reading `templates/tasknote-README.md` cold now sees a lead-in count that matches what follows and a complete tasknote-variant roster, instead of a stale count and a shipping variant (`--park` sidequests) it never learns about.

**Archived:** 2026-08-29
