---
title: sop-ft-task-resync
status: completed
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-494, CORE-488, CORE-486]
touches:
  - SPEC/procedures/ft-task.md
---

# CORE-496 | sop-ft-task-resync

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-494]] · [[CORE-488]] · [[CORE-486]]

## 🎯 Goal

Re-verify `SPEC/procedures/ft-task.md` against its watched surfaces (`SPEC.md` + `claude/skills/ft-task/`) and close the drift the 2026-08-29 docs audit found: the CORE-494 `[unattended]` task-line marker missing from the §Steps parse description, the CORE-488 cross-repo edit remit, CORE-486 wording, and a stale `last-verified:`.

## ✅ Acceptance

- [x] Step 1's capture list mirrors `SPEC.md` §"Task-line format" completely — the optional `[unattended]` marker is named alongside `[model]` / `[!critical]` / `| shortname`, with its canonical AFTER-`[model]` position
- [x] The SOP states the row-level-vs-invocation-level split ([[CORE-494]] / `docs/EXTERNAL-AGENTS.md`): the marker is the operator's per-row declaration, the posture is the caller's per-invocation one, **neither implies the other**; flowtron never writes the marker, and an unmarked row is undecided, not approved
- [x] The [[CORE-488]] cross-repo edit remit is routed to from the SOP — deliverable lands in the repo whose session opened it; other-repo work is filed there, never edited directly from this cycle
- [x] That mirror carries the CORE-483.3 exception in [[CORE-486]]'s ratified framing (singular documented exception, not a precedent/license) rather than inventing new wording
- [x] Every task in the drift span since the `v5.19.0 · 2026-08-25` stamp is adjudicated in Discovery Notes as *already landed*, *routes-only (no mirror owed)*, or *fixed here* — none left unexamined
- [x] The SOP still **routes** rather than copies — no Claude-specific machinery (`AskUserQuestion`, slash dispatch, `--unattended` as required syntax) leaks into the neutral layer
- [x] `last-verified:` reads `v5.21.0 · 2026-08-29`, matching `SPEC.md` **Version:**
- [x] PLAN.md line flipped to stub form under `## Completed`; tasknote archived to `.flowtron/tasknote/archive/core/CORE-496.md`

## 🧩 Subtasks

- [x] Add `[unattended]` to Step 1's capture list, with its canonical position
- [x] Add the row-level-vs-invocation-level clarifier under that capture list, routed to `SPEC.md` §"Task-line format" + `docs/EXTERNAL-AGENTS.md`
- [x] Add a "Cross-repo work, in one paragraph" preamble paragraph mirroring `SPEC.md` §"Cross-repo edit remit", sibling to the existing "Parking, in one paragraph"
- [x] Bump `last-verified:` to `v5.21.0 · 2026-08-29`
- [x] Re-read the edited file for cross-reference integrity and neutrality-layer purity
- [x] Run the Phase 4 doc-drift sweep; closure + commit

## 🔗 Related

- [[CORE-494]] — predecessor; introduced the `[unattended]` marker grammar the SOP must mirror
- [[CORE-488]] — predecessor; introduced the cross-repo edit remit
- [[CORE-486]] — predecessor; wording the SOP should absorb

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three named gaps verified present in the current SOP, and the `last-verified:` stamp is two minor versions stale (`v5.19.0` vs `SPEC.md` `v5.21.0`). The audit finding is accurate as filed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` (documentation-only; no code or module boundary is touched). The doc-layer analogue *does* bind and is respected: the SOP is a **routing** layer per [[CORE-270]] / [[CORE-091]], so each edit points at the canonical surface rather than copying its rules, and each mirror is **labeled** with its source per `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors".

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Two-tier currency check, run by hand** (the `/ft-release` Step 5 walk, per
[`SPEC/procedures/README.md`](../../SPEC/procedures/README.md) §"Frontmatter
schema"), anchored on the stamp date `2026-08-25`:

- **Tier 1 (`source:` = `claude/skills/ft-task/ templates/tasknote-template.md`)** — 2 commits since the stamp that did not also touch the SOP.
- **Tier 2 (`restates:` = `SPEC.md`)** — 11 commits since the stamp.

**Drift-span adjudication** (every task named, per [[CORE-395]] precedent):

| Task | Surface touched | Verdict |
|---|---|---|
| CORE-482.2 (`model-effort-inventory`) | `step-1.5-model-edge.md` roster prose | **routes-only** — SOP Step 2 routes to `SPEC/model.md` for the tier check and never restates the roster. No mirror owed. |
| CORE-482.3 (`xheavy-rung-round-up`) | `SKILL.md` Step 1.5 + `step-1.5-model-edge.md` | **already landed** — 🔭 / `[xheavy]` are present in the SOP's cue vocabulary and in Step 6's glyph list (propagated by CORE-482.4). The ladder + round-up guidance itself is routed, not restated. No mirror owed. |
| CORE-482.5, CORE-482.N, CORE-484, CORE-480, CORE-473.5 | `SPEC.md` (tier 2) | **already landed** — viz-only, audit, release cuts, and the `--unattended` posture + interrupted-resume path, all of which the SOP already carries (unattended-mode primitive row, parking paragraph, Step 3 in-flight branch). |
| CORE-486 (`cross-project-carveouts-note`) | `SPEC.md` §"What flowtron does NOT provide" | **fixed here** — not as its own edit: the ratified "singular exception, not a precedent" framing is the wording the CORE-488 mirror below adopts. |
| CORE-488 (`cross-repo-tasknote-remit`) | `SPEC.md` §"Cross-repo edit remit" (new section) | **fixed here** — grep confirms zero cross-repo remit coverage anywhere in the SOP. |
| CORE-494 (`unattended-marker-grammar`) | `SPEC.md` §"Task-line format" | **fixed here** — SOP Step 1's capture list names `[model]`, `| shortname`, description, priority heading, `[!critical]` — but not `[unattended]`. |
| CORE-495 (`visual-confirm-park`) | `SPEC.md`, `SPEC/gates.md`, SOP | **already landed** — this commit touched the SOP directly (`a29fa7a`), so it is in-sync by construction. |

**Contract sources read (not recalled):**

- `SPEC.md` §"Task-line format" — grammar line carries `[unattended]`; ordering is `[!critical]` BEFORE `[model]`, `[unattended]` AFTER it; "Flowtron itself never writes it — seeding is an operator act"; parses into `Task.unattended: boolean`.
- `docs/EXTERNAL-AGENTS.md:63` — "an **unmarked row is undecided, not approved**"; "The marker is row-level and the posture in step 1 is invocation-level; **neither implies the other**." This is the exact distinction the SOP needs, since the SOP already carries an "unattended mode" *invocation* primitive and would otherwise read as if the two were one thing.
- `SPEC.md` §"Cross-repo edit remit" — deliverable lands in the repo whose session opened it; other-repo work is *filed* there; CORE-483.3 is "the single documented exception, not a license — like the CLI and cross-project-query carve-outs in §'What flowtron does NOT provide'". That back-reference is precisely CORE-486's deliverable, which is why the PLAN line bundles the two.

**Placement decisions:**

1. **`[unattended]`** → Step 1's capture sentence, plus a short clarifier paragraph beneath it. It cannot go in the primitives table: that table's `unattended mode` row is the *invocation posture*, and merging the two there would create exactly the conflation `docs/EXTERNAL-AGENTS.md` warns against.
2. **Cross-repo remit** → a `**Cross-repo work, in one paragraph.**` preamble paragraph, sibling to the existing `**Parking, in one paragraph.**`. Rejected alternatives: a Step 4 bullet (the Step 4 bullets mirror the tasknote's Phase 1 checklist boxes 1:1, and the template has no such box — adding one would diverge the SOP from `templates/tasknote-template.md`, a `source:` file); a Step 5 Phase 2 bullet (SPEC anchors the trigger at Discovery, so a Phase 2-only home would miss it). The preamble placement is cross-cutting, matches an established shape in this very file, and disturbs no step flow.

**Observation, deliberately out of scope.** The cross-repo edit remit lives in `SPEC.md` only — `claude/skills/ft-task/` carries no mention of it. That is defensible (Step 0 loads `SPEC.md` as always-loaded core for Claude), so it is not asserted here as a gap; noting it so a future audit can adjudicate rather than rediscover. This tasknote's `touches:` is scoped to the SOP file.

**No clarifications needed.** Explicit assumptions:

- "Absorb CORE-486 wording" means adopting the ratified carve-out framing *inside* the CORE-488 mirror, not a separate edit — CORE-486's own deliverable was a 3-line reciprocal cross-reference in a SPEC section the SOP does not restate.
- The stamp takes `SPEC.md`'s current **Version:** (`v5.21.0`) and today's date, per the schema's `<version> · <YYYY-MM-DD>` form. This is a hand re-check, not a release cut, so the flag-don't-bump rule ([[CORE-397]] / [[CORE-361]]) is not violated — that rule forbids a *release* bumping the stamp, which is exactly the motion this task performs deliberately.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose-only, no executable surface. The mechanical check that *does* exist for this file (the two-tier currency walk) was run before and after; see Testing Notes.

**Implementation Notes:**

**Pattern survey.** Both additions extend shapes already in the file rather
than inventing new ones:

- The cross-repo paragraph is a direct sibling of the existing
  `**Parking, in one paragraph.**` preamble paragraph — same bolded-lead
  shape, same one-paragraph budget, same "full contract:" route at the tail.
- The `[unattended]` clarifier sits under the Step 1 capture sentence in the
  same bolded-lead-then-prose shape as `**Status gate (non-negotiable).**`
  immediately above it.

Both are **labeled mirrors** per `docs/CONVENTIONS.md` §"Canonical source with
labeled mirrors": each names the surface it restates, so a future drift check
can see what it is bound to.

**Minimal refactor gate.** No restructuring. Three edits, all additive except
the stamp: `+33 / −4` in one file. The four removed lines are the capture
sentence reflowed to absorb the new segment.

**Edits:**

1. `last-verified: v5.19.0 · 2026-08-25` → `v5.21.0 · 2026-08-29`.
2. Step 1's capture sentence gains `[unattended]` plus the canonical ordering
   (`[!critical]` before `[model]`, `[unattended]` after it), followed by the
   `**The [unattended] marker is not unattended mode.**` clarifier.
3. New `**Cross-repo work, in one paragraph.**` preamble paragraph, placed
   between the parking paragraph and the operator-cue-vocabulary paragraph.

**Wording sourced, not invented.** "Neither implies the other" and "an
unmarked row is undecided, not approved" are `docs/EXTERNAL-AGENTS.md:63`
verbatim; "single documented exception, not a precedent" is `SPEC.md`
§"Cross-repo edit remit" absorbing [[CORE-486]]'s ratified carve-out framing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` (prose-only). The file's actual verification is the two-tier currency walk, run below.

- [x] Ran lint/type-check on changed code — `N/A` (markdown, no linted surface in this repo). Ran the mechanical checks that do apply: link-target resolution, SPEC.md anchor existence, and line-width conformance.

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface touched (`viz/` untouched).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Currency walk, before → after.** The check this file exists to satisfy:

- **Before** (anchor `2026-08-25`): tier 1 = 2 candidates (`b5480ad` CORE-482.3, `f434a47` CORE-482.2); tier 2 = 11 `SPEC.md` commits.
- **After** (anchor `2026-08-29`): tier 1 = **0 candidates**, tier 2 = 0. Clean, and it is clean *honestly* — the two prior candidates were adjudicated as routes-only / already-landed in Discovery Notes rather than being buried by the stamp bump.

**Mechanical checks:**

- Link targets resolve: `../../SPEC.md` ✅, `../../docs/EXTERNAL-AGENTS.md` ✅.
- Cited `SPEC.md` anchors exist: `## Task-line format` ✅, `## Cross-repo edit remit` ✅, `What flowtron does NOT provide` ✅.
- Line width: no added line exceeds 100 columns (matches the file's existing wrap).
- Neutrality grep over added lines: no `AskUserQuestion`, no slash dispatch, no `--fast` / `--unattended` as required syntax, no `SKILL_DIR`. The added prose names `[unattended]` only as PLAN.md *grammar* (which is contract-layer, agent-neutral) and refers to the posture by its neutral name "unattended mode".

**Quality assertions.** No duplication introduced: grep confirms the cross-repo remit had zero prior coverage in the SOP, and `[unattended]` had zero prior mention. The clarifier is not a restatement of the primitives-table `unattended mode` row — it exists precisely to *separate* the two concepts, which is the drift risk `docs/EXTERNAL-AGENTS.md` calls out. Public surface unchanged (no new frontmatter field, no new step, no new gate, no new cue glyph).

**Diff:** `SPEC/procedures/ft-task.md` — 1 file, +33 / −4.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — describes the SOP layer's existence, not its step contents |
  | `AGENTS.md` | no change — repo layout + validation commands unaffected |
  | `SPEC.md` | no change — this task mirrors *from* SPEC.md; both mirrored sections (§"Task-line format", §"Cross-repo edit remit") are already canonical and correct |
  | `docs/MIGRATION.md` | no change — adoption/bump procedures untouched |
  | `claude/AGENTS-snippet.md` | no change — adopter paste block does not restate SOP steps |
  | `codex/AGENTS-snippet.md` | no change — thin wiring; points at the SOP, does not restate it (verified: still a pointer) |
  | `cursor/AGENTS-snippet.md` | no change — same, thin wiring |
  | `grok/AGENTS-snippet.md` | no change — same, thin wiring |
  | `docs/CONVENTIONS.md` | no change — the labeled-mirror convention it states is *followed* by both new mirrors, not altered by them |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — no contributor-content or submodule-bump surface touched |
  | `docs/AGENT-NEUTRALITY.md` | **checked closely, no change** — line 41's ledger row for this very file inventories its Claude-specific sites as "the `autonomous mode`, `debug mode`, and `unattended mode` rows (1 site each)" plus the debug-block pointer. Both additions are fully neutral (`[unattended]` is PLAN.md *grammar*, contract-layer by `docs/AGENT-NEUTRALITY.md`'s own reckoning), so the site count is still exact and the row needs no edit |
  | `docs/PLATFORMS.md` | no change — two-layer contract/wiring model unchanged; the SOP stays the neutral floor |
  | `claude/CAPABILITIES.md` | no change — Claude capability triggers untouched; its own last-verified stamp is a release-time concern, not this task's |
  | `docs/AGENT-COMPAT.md` | no change — per-agent consume-mode/entry-point matrix unaffected |
  | `docs/EXTERNAL-AGENTS.md` | **checked closely, no change** — this task *consumes* its `[unattended]` deny-by-default contract rather than altering it. Its own text (line 63) already states the row-level/invocation-level split and routes to `SPEC.md` for grammar; the SOP now routes back to it. Bidirectional, no drift. |
  | `docs/WORKTREES.md` | no change — isolation convention untouched |
  | `docs/VISION.md` | no change — scope boundaries unaltered. The cross-repo remit mirror cites §"What flowtron does NOT provide" (SPEC.md's mirror of VISION.md) as an *analogy* for exception-framing, adding no new rejection and restating none |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Re-synced the agent-neutral `ft-task` procedure SOP with its watched surfaces
and closed the three drift gaps the 2026-08-29 docs audit found. A
contract-only agent (Codex, Grok, Cursor) driving flowtron from this file now
knows that a PLAN.md row can carry `[unattended]`, that reading that marker is
*not* the same as being told nobody is present, and that a deliverable
belonging to another repo gets **filed** there rather than edited from this
task cycle.

**Changed:** `SPEC/procedures/ft-task.md` — 1 file, +33 / −4.

1. **`[unattended]` in Step 1's parse description** ([[CORE-494]]) — the
   capture list named `[model]`, `| shortname`, description, priority heading,
   and `[!critical]`, but not the marker CORE-494 promoted to first-class
   grammar. Added, with the canonical ordering, plus a clarifier separating the
   row-level marker from the invocation-level posture in the primitives table
   above it — the specific conflation `docs/EXTERNAL-AGENTS.md:63` warns
   against, and a live risk here because this file already carries an
   "unattended mode" row.
2. **Cross-repo edit remit** ([[CORE-488]]) — the SOP had *zero* coverage of
   the rule (grep-verified). Added as a `**Cross-repo work, in one
   paragraph.**` preamble paragraph, sibling in shape to the existing
   `**Parking, in one paragraph.**`.
3. **[[CORE-486]] wording** — absorbed rather than added: the CORE-483.3
   exception is framed as the "single documented exception, not a precedent",
   the carve-out framing CORE-486 ratified, instead of new wording.
4. **`last-verified:`** `v5.19.0 · 2026-08-25` → `v5.21.0 · 2026-08-29`.

**Verification.** The two-tier currency walk was run *before* (tier 1: 2
candidates, tier 2: 11 `SPEC.md` commits) and *after* (both 0). The stamp
bump did not launder the two prior tier-1 candidates: CORE-482.2 and
CORE-482.3 were each adjudicated in Discovery Notes as routes-only /
already-landed, so the clean result is earned. Link targets and all three
cited `SPEC.md` anchors resolve; no added line exceeds the file's 100-column
wrap; a neutrality grep over the added lines found no Claude-specific
machinery.

**Refactors.** None — additive only; the 4 removed lines are the capture
sentence reflowed. Deferred deliberately: the cross-repo remit is absent from
`claude/skills/ft-task/` too. Not asserted as a gap (Claude loads `SPEC.md`
as always-loaded core), and outside this tasknote's `touches:` scope; recorded
in Discovery Notes so a future audit adjudicates rather than rediscovers.

**Documentation verdict.** Doc-drift sweep run across all 19 entries — no
change to any. Two were checked closely rather than waved through:
`docs/EXTERNAL-AGENTS.md` (this task consumes its deny-by-default contract and
now routes back to it — bidirectional, no drift) and
`docs/AGENT-NEUTRALITY.md` (its line-41 ledger row inventories this file's
Claude-specific sites as "1 site each"; both additions are neutral, so the
count stays exact). No superseded-claim pointer: [[CORE-395]] / [[CORE-397]] /
[[CORE-409]] remain accurate — this task *exercises* the machinery they built
rather than falsifying it.

**Maintainability effect.** The SOP's currency check is clean again, so the
next `/ft-release` Step 5 walk reports real drift instead of a two-version
backlog that trains the operator to skim past it. The adherence gap this layer
exists to narrow now covers the two contracts most likely to be violated by an
agent without gate machinery: dispatching an unapproved row, and editing
another repo from this cycle.

**Archived:** 2026-08-29
