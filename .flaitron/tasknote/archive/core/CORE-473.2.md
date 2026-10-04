---
title: unattended-posture
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.1]
touches:
  - SPEC/gates.md
  - SPEC.md
  - SECURITY.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-473.2 | unattended-posture

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Define the `--unattended` operator posture in `SPEC/gates.md` — a strict `--fast` superset that converts the gates an operator-less run cannot answer into a `status: blocked` park carrying a structured reason, without relaxing the paper-complete guard.

## ✅ Acceptance

- [x] `SPEC/gates.md` carries a `--unattended` posture section defining it as a **strict `--fast` superset** — it inherits all three `--fast` surfaces (📦 force-skip, 👁️ suppression, 🛠️ no-op for routine trips) and adds park conversions on top; passing it never requires also passing `--fast`
- [x] The section names the **five conversions** as a table (attended behavior → unattended behavior): 🛠️ drift carve-out (Re-scope/De-scope) · destructive-action escalation 🗄️/▶️/📡/💻 · ✋ ACTION when it is a prerequisite · Step 1.5 concrete-model STOP · a queued bundled in-📦 prompt
- [x] The section defines what a park **is** in this posture — `status: blocked`, `⏸ Blocked` nav chip, a structured reason distinguishing the five stop causes, halt before Phase 3/4 — and cites `SPEC/blocked.md` for the lifecycle and `SPEC.md` §"Tasknote frontmatter" for the reason key's home (no forward-dangling anchor)
- [x] The section states the **park-at-the-Phase-1→2-boundary widening** of `SPEC/blocked.md`'s mid-Phase-2 scoping, flagged as [[CORE-473.3]]'s edit to reflect
- [x] The section states explicitly what the posture **never relaxes**: all three parts of the paper-complete guard (foreign-dirt gate — report, never auto-clean; atomic single-commit closure; 🏁 only with a deliverable-covering SHA)
- [x] The section resolves **pre-scaffold stops**: the concrete-model STOP scaffolds-and-parks; foreign-dirt / `## Completed` status gate / archive collision terminate without writing, each with its stated reason
- [x] The **runtime/contract boundary** is restated in-section — flowtron ships the contract an orchestrator reports to, never the orchestrator — citing `docs/VISION.md` §"What we won't accept"
- [x] No new cue glyph is minted and the CORE-065 two-banner cap is untouched (a conversion *removes* a banner); verified by grep for new glyphs and `AWAITING APPROVAL` count parity
- [x] The existing §"Rationalizations" table and §"Red Flags" list gain `--unattended` entries, in the file's own idiom ([[CORE-386]] pattern)
- [x] Forward pointers added at the three converted-gate sites (§"Phase 1→2 exit gate" drift carve-out · §"Destructive-action escalation" `--fast` interaction · §"Conditional skip rule" bundled-prompt override) so the posture is reachable from each gate it changes
- [x] `SPEC.md`'s enumeration of what `SPEC/gates.md` carries (`SPEC.md:605-609`) is updated so the pointer does not go stale on this commit — the one drift this change creates, fixed in-task rather than deferred
- [x] No skill, command stub, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md` file is edited — runner wiring is [[CORE-473.4]]'s deliverable, and `.2` is contract-only

## 🧩 Subtasks

- [x] Draft the `## `--unattended` operator posture` section: definition + superset claim, runtime/contract boundary, the five-conversion table, what a park is, the never-relaxed list, the pre-scaffold-stop split, and the `.3` hand-off note
- [x] Insert it into `SPEC/gates.md` after §"`--fast` operator override", before §"Rationalizations"
- [x] Add the three forward pointers at the converted-gate sites (Phase 1→2 drift carve-out · destructive escalation `--fast` interaction · conditional-skip bundled-prompt override)
- [x] Add `--unattended` rows to §"Rationalizations" and bullets to §"Red Flags"
- [x] Update `SPEC.md:605-609`'s enumeration of gates.md contents with one clause
- [x] Phase 3: verify — `AWAITING APPROVAL` count unchanged, no new glyph introduced, every internal link resolves, no skill/stub/CAPABILITIES/PLATFORMS path in the diff, markdown pass on the edited blocks
- [x] Phase 4: doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" + flip the `.2` PLAN line to stub form (nested under the active parent) + archive

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic
- [[CORE-473.1]] — epic Discovery; gap inventory G1–G3 are this child's deliverable (`blocked-by:` undeclared — `.2` is Fan-out's Sequential first)
- [[CORE-473.3]] — consumes this posture; owns the structured park-reason frontmatter key
- [[CORE-473.4]] — wires the flag through the three runners + adopter surfaces
- [[CORE-473.5]] — applies this posture to the two unreachable entry points
- [[CORE-183]] — introduced the `default-skip` 🛠️ flavor and the `--fast` drift carve-out this posture must supersede-under-unattended
- [[CORE-254.1]] — admitted the destructive-action escalation as a bounded exception to the CORE-065 two-banner cap
- [[CORE-358]] — paper-complete guard; the one gate this posture must **not** soften

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The three gaps this child owns (G1 concrete-model STOP, G2 🛠️ drift carve-out, G3 destructive-action banner) were verified by direct read at HEAD during [[CORE-473.1]] and re-verified here. `.2` is Fan-out's Sequential-first child — every other child consumes the posture it defines, so nothing downstream can start until it lands.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Inherited constraint (from [[CORE-473.1]]).** `docs/VISION.md` §"What we won't accept" blesses this epic's exact shape — *"flowtron does ship the markdown contract a loop reports to … Contract in flowtron, runtime in the runner."* `.2` ships contract only: a posture named in `SPEC/gates.md`, no runner, no scheduler, no dispatcher. A version of this child that grows a runtime is out of scope by VISION, not by preference.

**The three gaps `.2` owns, re-verified at HEAD.**

| # | Gap | Evidence (v5.19.0) |
|---|---|---|
| G1 | Concrete `[model]` mismatch is a hard STOP + AskUserQuestion that `--fast` does not reach | `claude/skills/ft-task/step-1.5-model-edge.md:11-16` |
| G2 | Re-scope/De-scope fires 🛠️ even under `--fast` (the drift carve-out) | `SPEC/gates.md:358-361`, `:414-418` |
| G3 | The destructive-action escalation has no unattended posture outside a loop | `SPEC/gates.md:308-311` vs. the solved case at `SPEC/loop.md:67-75` |

**Best Practices Review — the posture is an extension, not a new shape.** `SPEC/loop.md:67-75` already solves G3 for exactly one skill: *"a loop cannot fire a blocking banner into an unattended session. So … the loop **parks the tasknote via `status: blocked`** … Parking, not banner-into-the-void, is the loop's hard-stop for irreversible actions."* `.2`'s job is to lift that one-skill carve-out into a posture the runners share, and to widen it from destructive actions alone to every gate an operator-less run cannot answer. Extension-first per `docs/VISION.md:26`. Dependency direction is preserved: `SPEC/gates.md` is the gate-machinery owner, `SPEC/loop.md` and `SPEC/blocked.md` already cite it, and nothing new points inward.

**Placement.** New `## `--unattended` operator posture` section immediately after §"`--fast` operator override" (its strict subset) and before §"Rationalizations" (which then extends to cover it). Three existing sections gain a one-clause forward pointer so the posture is discoverable from the gates it converts: §"Destructive-action escalation" → "`--fast` interaction", §"Conditional skip rule" → bundled-prompt override, §"Phase 1→2 exit gate" → drift carve-out.

**Archive skim (`.flowtron/tasknote/archive/core/`, grep `SPEC/gates.md` + `--fast`).** Load-bearing hits beyond `.1`'s epic-level skim:

- **[[CORE-183]]** — authored the `default-skip` flavor *and* the `--fast` drift carve-out this posture overrides. Its shipped pattern is "shared SPEC contract; per-SKILL overrides" (itself inherited from CORE-087), which is precisely the `.2` → `.4` split this epic already filed. Confirms `.2` writes contract and touches no skill.
- **[[CORE-254.1]]** — the destructive-action escalation was admitted as a *deliberate, bounded* revision of the CORE-065 two-banner cap. `.2` must not spend that budget again: converting a banner to a park **removes** a banner, so the cap is unaffected and no new cue glyph is minted (`.1`'s resolved-scoping row already fixed this).
- **[[CORE-386]]** — added the §"Rationalizations" / §"Red Flags" pair to this exact file. Any new escape hatch in `SPEC/gates.md` is expected to arrive with the excuse that skips it named in-file; `--unattended` is a large hatch and gets rows.
- **[[CORE-358]]** — paper-complete guard. Its foreign-dirt STOP is the gate this posture must **not** soften, and the reason the Q1 resolution below splits.

**Drift check.** All cited paths, section names, and line numbers verified against HEAD by direct read (`SPEC/gates.md`, `SPEC/loop.md`, `SPEC/blocked.md`, `SPEC.md` §"Tasknote frontmatter" / §"Paper-complete guard", `step-1.5-model-edge.md`). No pre-existing drift. One drift is *created* by this change and is fixed inside `.2`'s own closure rather than deferred: `SPEC.md:605-609` enumerates what `SPEC/gates.md` carries (skip rule · `--fast` · cue vocabulary · Rationalizations/Red Flags); that list goes stale the moment the posture lands, so it gains one clause.

**Resolved scoping**

| Question | Resolution | Effect |
|---|---|---|
| Pre-scaffold stops have no tasknote to park | **Scaffold-then-park for the model STOP; terminate for the three repo-state / collision stops** — see the conflict note below | Posture distinguishes task-level from repo-level stops |
| ✋ ACTION conversion breadth | **Park only when the manual action is a prerequisite for continuing**; advisory ✋ records and continues | Preserves ✋'s existing out-of-band semantics (`SPEC/gates.md:133-136`) |
| Bundled in-📦 prompt (`--fast` does not suppress it) | **`.2` defines the general rule** (an unanswerable queued question parks); `.5` applies it to `/ft-close-epic`'s parent-flip | `.5` stays a wiring task, not a second contract author |

**Conflict surfaced on the Q1 answer (operator picked uniform scaffold-then-park).** Applied to the foreign-dirt gate, that answer breaks: the parked tasknote is an untracked file written into a tree the paper-complete guard has just refused to touch, so it becomes its own foreign dirt and trips the same gate on the next invocation — a self-blocking loop. The `## Completed` status gate and the archive-collision gate fail differently but as hard: both mean a tasknote for this ID already exists, so there is nothing new to park. The operator's *principle* (one uniform stop surface the orchestrator can read) is honoured where it can hold — the concrete-model mismatch is a task-level assignment problem with no such conflict, and it scaffolds-and-parks. The three repo-state / collision stops terminate. This is the substance of the offered "split by gate" option, reached by applying the chosen option's principle rather than by overriding it, and it is the reason the 🛠️ exit gate fires below.

**Hand-off to [[CORE-473.3]] (explicit, so it is not rediscovered).** Two items `.2` names but does not own:

1. `SPEC/blocked.md:36-37` currently scopes `status: blocked` to mid-Phase-2 parking — *"a Phase 1 blocker has no Phase 2 work to preserve."* The 🛠️ conversion parks at the **Phase 1→2 boundary**, where Phase 1 *is* complete and its Discovery is exactly the work worth preserving. `.2` names this widening in `SPEC/gates.md`; reflecting it into `SPEC/blocked.md` is `.3`'s edit.
2. `.2` fixes the **cardinality** of the structured park reason — the five stop causes it must distinguish (drift · destructive-action · action-prerequisite · model-mismatch · bundled-prompt). `.3` fixes the **spelling** (key name and code tokens). `.2` therefore cites `SPEC.md` §"Tasknote frontmatter" as the key's home, which resolves today and gains the specific row when `.3` lands — no dangling anchor is written.

**Assumptions asserted.** The flag name `--unattended` is adopted as filed (`.1` left it provisional and owned by `.2`); it is descriptive, and `.3`–`.6` already reference it. Between `.2` and `.4` landing, `SPEC/gates.md` names a posture no runner parses yet — the same contract-then-wiring order [[CORE-183]] used, and the transient `.N` is filed to audit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey — extended, not invented.** The posture is `SPEC/loop.md` §"Gate collapse" → "Destructive-action carve-out" lifted from one skill to a shared posture, and it is shaped like the section it neighbours: `## `--fast` operator override` states what it touches, names its bounds, and ends with an applies-to line; `## `--unattended` operator posture` does the same. The Rationalizations/Red Flags additions follow [[CORE-386]]'s in-file idiom (excuse | why it's wrong | refuting clause). No new shape was introduced and no new file was created.

**Minimal refactor gate.** No refactor. Every edit is additive except two sentences that gained a clause (`SPEC.md`'s enumeration of gates.md contents, `SECURITY.md`'s first-run advisory). No existing rule was rewritten or weakened.

**Edit surface — 3 files, +134/−4 on the contract layer:**

| File | Change |
|---|---|
| `SPEC/gates.md` | New `## `--unattended` operator posture` section (~100 lines: definition + superset claim · runtime/contract boundary · five-conversion table · what a park is · the `SPEC/blocked.md` widening · pre-scaffold-stop split · never-relaxed list · applies-to). Three forward pointers at the converted-gate sites. One forward pointer closing §"`--fast` operator override". Three §"Rationalizations" rows + four §"Red Flags" bullets |
| `SPEC.md` | One clause in the §"Operator-gate cues" enumeration of what `SPEC/gates.md` carries — the pointer would have gone stale on this commit |
| `SECURITY.md` | One clause: the first-run advisory named only `--fast` as the pause not to suppress; `--unattended` supersets it and would have routed around the advisory |

**The `--fast` superset is genuinely strict.** `--unattended` inherits all three `--fast` surfaces verbatim rather than restating them, so the two flags cannot drift apart: a future edit to `--fast`'s three bullets propagates to the posture by reference. That was the reason for placing the posture immediately after `--fast` rather than in a section of its own elsewhere in the file.

**Deferred deliberately (filed, not forgotten).** `docs/EXTERNAL-AGENTS.md:60` §"Relationship" asserts *"**No SPEC contract change.**"* — false as of this commit. `.1`'s resolved scoping assigned that correction, together with §"The Return"'s control-point claim, to [[CORE-473.6]], which rewrites both sections around the positive orchestration contract. Duplicating the fix here would hand `.6` a conflicting edit, so the verdict is recorded in the doc-drift sweep instead and surfaced in the recap. The `.N` audit backstops it.

**Downstream-impact reconciliation — none required.** The Q1 resolution (splitting pre-scaffold stops) changes a clause inside `.2`'s own deliverable and reaches no other active PLAN entry: `.3` still owns the reason key, `.4` the wiring, `.5` the entry points, `.6` the doc contract, and none of their filed scopes shift. `## Medium`, `## Low`, and `## Future Opportunities` are empty. No reconcile action proposed.

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

No executable surface — markdown contract prose only, so the targeted-suite and lint/type-check boxes are `N/A` in the code sense. The Acceptance criteria are structural, and each was verified by command rather than by eye:

| Check | Command | Result |
|---|---|---|
| Two-banner cap intact | `grep -c "AWAITING APPROVAL"` on `HEAD:SPEC/gates.md` vs. working copy | 12 → 12, unchanged |
| No new cue glyph minted | Python set-diff of all `So`/`Sk` code points, HEAD vs. working copy | One addition: `⏸`. **Not a cue** — it is the layer-2 nav-header chip, already canonical at `SPEC.md:455` (chip vocabulary), `SPEC/blocked.md:41`, and two skills. New to `SPEC/gates.md` only because this file had never quoted the chip before. Cue table unchanged |
| Every added link resolves | extract `](…)` from added lines, test each path | 4/4 OK (`../docs/VISION.md`, `../SPEC.md`, `blocked.md`, `loop.md`) |
| Every cited §heading exists | grep each anchor in its target file | 8/8 OK |
| Quoted `SPEC/blocked.md` phrase is verbatim | `grep -c "a Phase 1 blocker has no"` | 1 — quote is exact, not paraphrased |
| Contract-only (no wiring) | `git diff --stat` | 3 files, all contract layer; zero skill / command-stub / `claude/CAPABILITIES.md` / `docs/PLATFORMS.md` paths — `.4`'s surface untouched |
| No trailing whitespace | `grep -nE ' +$'` on changed files | none |

One prose defect caught on read-back and fixed before closure: the section's opening sentence garden-pathed (*"The gates `--fast` deliberately does not reach **park the tasknote** …"* parses with "gates" as subject of "park"), rewritten to *"Where `--fast` still lets a gate fire, `--unattended` **parks the tasknote** …"*.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts.** Contract-layer change; the flag-roster surfaces are [[CORE-473.4]]'s by the epic's own filing.

| Doc | Verdict |
|---|---|
| `README.md` | no change — L234 describes `--fast` as within-task autonomy and cites SPEC for syntax; still accurate |
| `AGENTS.md` | no change |
| `SPEC.md` | **updated** — §"Operator-gate cues" enumeration of what `SPEC/gates.md` carries gained a `--unattended` clause; without it the pointer went stale on this commit |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change — its four `--fast` mentions are conceptual (compose-order, loop semantics, `/ft-spec`, `/ft-refactor`); adopter-facing flag wiring is [[CORE-473.4]] |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — L56's `--fast` mention is an example of a skipped Phase 3 step, unaffected |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | **updated** — L88's first-run advisory named only `--fast` as the pause not to suppress against contributor-authored content; `--unattended` supersets that flag and would have routed around the advisory. One clause added |
| `docs/AGENT-NEUTRALITY.md` | no change — the posture is orchestrator-neutral; no vendor-specific surface added, nothing new to ledger |
| `docs/PLATFORMS.md` | no change **now** — §"Non-Claude capability triggers" tables gain a `--unattended` row in [[CORE-473.4]] (`/ft-release` §7.1 Pair I gates it) |
| `claude/CAPABILITIES.md` | no change **now** — gains a `--unattended` flag row in [[CORE-473.4]] (same Pair I gate) |
| `docs/AGENT-COMPAT.md` | no change — L19 names `--fast` as an example capability trigger, deliberately not a flag mirror (Pair I rationale) |
| `docs/EXTERNAL-AGENTS.md` | **stale as of this commit, owned by [[CORE-473.6]]** — L60 §"Relationship" asserts "**No SPEC contract change.**", which this commit falsifies, and L43 §"The Return" asserts "the operator reviewing the diff is still the control point", false per-task under the posture. `.1`'s resolved scoping assigned both to `.6`, which rewrites the sections around the positive orchestration contract; fixing them here would hand `.6` a conflicting edit |
| `docs/WORKTREES.md` | no change |

**Final Summary:** Defined the `--unattended` operator posture in `SPEC/gates.md` — a strict `--fast` superset for callers with no operator present, which converts the five gates an operator-less run cannot answer (🛠️ Re-scope/De-scope drift · destructive-action escalation · a prerequisite ✋ ACTION · the Step 1.5 concrete-model STOP · a queued bundled in-📦 prompt) from *ask and wait* into a `status: blocked` park carrying a structured reason. The design is `SPEC/loop.md`'s destructive-action carve-out generalized from one runner to a shared posture, so it is an extension rather than a new shape: a conversion **removes** a banner, minting no cue glyph and leaving the CORE-065 two-banner cap untouched.

Three things the posture pins down that the epic would otherwise have discovered late. **Pre-scaffold stops split.** The operator's answer was a uniform scaffold-then-park, but applied to the foreign-dirt gate that writes an untracked file into a tree the paper-complete guard has just refused to touch — the park file becomes its own foreign dirt and trips the same gate next invocation, a self-blocking loop. The model mismatch (task-level, tree known clean) scaffolds-and-parks; foreign-dirt, the `## Completed` status gate, and archive collision terminate without writing. The operator's principle is preserved where it can hold, and the conflict was surfaced at the 🛠️ gate rather than resolved silently. **The park widens `SPEC/blocked.md` by one position** — that module scopes `status: blocked` to mid-Phase-2 on the reasoning that a Phase 1 blocker has no Phase 2 work to preserve, but the 🛠️ conversion parks at the Phase 1→2 boundary where Discovery *is* the work worth preserving; the reasoning holds, the scoping widens, and reflecting it into `blocked.md` is handed to [[CORE-473.3]] explicitly. **`.2` fixes the reason's cardinality, `.3` its spelling** — five stop causes named here, key name and code tokens there, so `.2` cites `SPEC.md` §"Tasknote frontmatter" (which resolves today) and writes no dangling forward anchor.

`--unattended` removes pauses, never proof: all three parts of the paper-complete guard hold with no unattended variant, stated in-section. Edit surface is 3 files, +134/−4, contract layer only — zero skill, command-stub, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md` paths, since runner wiring is `.4`'s deliverable. Verified by command rather than by eye: `AWAITING APPROVAL` count 12→12, glyph set-diff clean (the one addition, `⏸`, is the pre-existing layer-2 nav chip, not a cue), 4/4 added links resolve, 8/8 cited section anchors exist, and the `blocked.md` quote is verbatim. The sweep caught one real drift beyond the SPEC pointer — `SECURITY.md`'s advisory not to suppress the remaining pause named only `--fast`, which the new posture would have routed around — fixed in the same commit. `docs/EXTERNAL-AGENTS.md`'s two now-false claims are recorded and left to [[CORE-473.6]], which already owns them.

**Archived:** 2026-08-25
