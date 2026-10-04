---
title: unattended-orchestration discovery
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-473.1 | unattended-orchestration discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Scope the `CORE-EPIC-473` epic (`unattended-orchestration`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-473.2..6` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-473.2 .. CORE-473.6 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-473.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift) — reviewed, stands unchanged
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children) — all 17 entries "no change"; three flagged as owned by `.4` / `.6`

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-473.2 .. CORE-473.6; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-473 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic
- [[CORE-358]] — paper-complete guard; established the foreign-dirt gate whose STOP an unattended worker cannot answer
- [[CORE-254.2]] — operator-cue vocabulary; the cue table this epic's park-as-blocked conversions must respect
- [[CORE-467]] — `## Completed` rotation; recent precedent for a SPEC-contract change fanned across skills

## 🌳 Fan-out

- **Parallel:** [[CORE-473.3]] · [[CORE-473.5]] — both consume only `.2`'s posture and touch disjoint surfaces (frontmatter + `SPEC/blocked.md` vs `/ft-close-epic` + the resume path)
- **Sequential:** [[CORE-473.2]] first (defines the posture every other child consumes) · [[CORE-473.4]] after [[CORE-473.2]] · [[CORE-473.6]] after [[CORE-473.3]], [[CORE-473.4]], [[CORE-473.5]] (documents the finished contract)
- **Synthesis:** [[CORE-473.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The operator invoked `/ft-epic-discovery` after an exploration that surfaced six concrete headless gaps against a live consumer (an external CLI orchestrator pinned to v5.19.0). The gaps are verified by direct read, not inference, and the epic sits inside an already-blessed boundary (see Discovery Notes §Constraint).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Constraint (load-bearing — found before scoping).** `docs/VISION.md` §"What we won't accept" → "Loop runners, schedulers, and session tooling" already carries the exact bounded exception this epic needs: *"flowtron does ship the markdown **contract a loop reports to** — gate collapse, the `## 🔁 Iterations` log, the `loop:` frontmatter keys, and the `status: blocked` park as the destructive-action hard stop. Contract in flowtron, runtime in the runner."* This epic is that same exception widened from loop-runners to orchestrators. It is therefore **in-boundary only while it ships contract and no runtime** — no scheduler, no dispatcher, no session daemon, no polling. Every child inherits this constraint; a child that grows a runtime is out of scope by VISION, not by preference.

**Gap inventory (verified by direct read at HEAD).**

| # | Gap | Evidence | Child |
|---|---|---|---|
| G1 | Concrete `[model]` mismatch is a hard STOP `--fast` does not reach | `claude/skills/ft-task/SKILL.md:94` → `step-1.5-model-edge.md:11` (STOP + structured ask) | `.2` |
| G2 | Re-scope/De-scope fires 🛠️ even under `--fast` (drift carve-out) | `SPEC/gates.md:358-361`, `:414-418` | `.2` |
| G3 | Destructive-action banner has no unattended posture in `/ft-task` | `SPEC/gates.md:308-311` vs the solved case at `SPEC/loop.md:67-75` | `.2` |
| G4 | Epics structurally unclosable unattended | `SPEC/gates.md:381` (bundled-prompt override force-fires) + `:420` (`/ft-close-epic` takes no `--fast`) | `.5` |
| G5 | No resume entry point for an in-progress note | `claude/skills/ft-task/SKILL.md:113` (start-only by design); `SPEC/blocked.md:52` covers *blocked* resume only | `.5` |
| G6 | Hard stops are prose + a question, not machine-readable | every STOP site; consumer runs stdio at `DEVNULL` | `.3` |

**Precedent — the design is already shipped, once.** `SPEC/loop.md:67-75` §"Gate collapse" → "Destructive-action carve-out" solves G3 exactly: *"a loop cannot fire a blocking banner into an unattended session. So … the loop **parks the tasknote via `status: blocked`** … Parking, not banner-into-the-void, is the loop's hard-stop for irreversible actions."* This epic generalizes that one-skill carve-out into a posture the three runners share. Extension-first (`docs/VISION.md:26`) — not a new shape.

**Archive skim (`.flowtron/tasknote/archive/core/`).** Load-bearing hits:

- **[[CORE-460.2]]** — *command-stub `--high` + Pair F widening*. Direct precedent for **adding a flag**: a flag shipped in a skill body drifted in the `claude/commands/*.md` stubs and was hand-fixed a fourth time before the fix was to *gate* the layer. Adding `--unattended` inherits this obligation.
- **`/ft-release` §7.1 Pair I** (`claude/skills/ft-release/SKILL.md:519`) — gates `claude/CAPABILITIES.md` flag rows against `docs/PLATFORMS.md` §"Non-Claude capability triggers" per-agent tables. Any section that *already* commits to a flag roster must name the new flag or the release gate fails. Non-obvious, and it lands on `.4`.
- **[[CORE-465]]** — `claude/AGENTS-snippet.md` §"One-time symlink wiring" is the SSOT for the adopter-wiring roster; other copies are pointers. `.4` must not re-fork a roster.
- **[[CORE-358]]** — paper-complete guard. Its foreign-dirt STOP is the one gate this epic must **not** soften: an unattended run may report the stop machine-readably, never auto-clean.

**Drift check.** All cited paths, section names, and line numbers verified against HEAD (v5.19.0) during this Discovery — no drift. Two *content* drifts are created by this epic and are `.6`'s deliverable, not pre-existing errors:

- `docs/EXTERNAL-AGENTS.md:43` §"The Return" asserts "the operator reviewing the diff is still the control point" — false per-task under `--unattended` (control shifts to the orchestrator's own review surface).
- `docs/EXTERNAL-AGENTS.md:60` §"Relationship" asserts "**No SPEC contract change.**" — this epic adds a posture to the gate contract.

**Resolved scoping**

| Question | Resolution | Effect |
|---|---|---|
| Home for the orchestration contract | **Extend `docs/EXTERNAL-AGENTS.md`**, not a new `docs/ORCHESTRATION.md` — it already owns §"Not an Orchestration Runtime"; extension-first per `docs/VISION.md:26` | Reshaped `.6`; AI-referenced doc roster unchanged (no 3rd doc) |
| `--unattended` ↔ `--fast` | **`--unattended` implies `--fast`** (strict superset) | One flag for a consumer to pass; removes the half-configured-unattended footgun |
| Epic-close reach (G4) | **Park, don't close** — `.N` audit runs to closure, then parks at the parent-flip | Preserves the bundled-prompt override's intent (`SPEC/gates.md:381`); the irreversible cohort move stays operator-owned |
| Stop-code shape (G6) | **Structured park reason in tasknote YAML; no new glyph** | No cue-vocabulary change (`SPEC/gates.md:100-109` guards that table); suits a `DEVNULL` consumer that reads files, not stdout |

**Assumptions asserted.** Flag name `--unattended` is provisional and owned by `.2`; a better name surfacing during contract design is a `.2` decision, not a re-scope. M stays 5 — the four resolutions redistributed scope across children without changing the count.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface)

**Implementation Notes:**

**Pattern survey.** Followed the `CORE-EPIC-463` cohort shape for child filing: 2-space indent under the parent, `[<model>]` + emoji on every line, ` — ` em-dash separator, `| shortname` ≤30 chars. No new shape invented.

**Lines written:** 5 (`.2`–`.6`). Word counts against the ≤50w target / 70w hard cap: `.2` 43w · `.3` 38w · `.4` 32w · `.5` 38w · `.6` 35w. All clear.

**M unchanged at 5.** The four Phase 1 resolutions redistributed scope rather than changing the count: the doc-home answer reshaped `.6` from "new `docs/ORCHESTRATION.md`" to "extend `docs/EXTERNAL-AGENTS.md`", and the epic-close answer bounded `.5` to park-at-parent-flip instead of full auto-close. The audit's reserved `.N` suffix is unaffected and never renumbers.

**Audit line reviewed as-filed.** `.N` stands unchanged — the fixed doc-drift sweep is the right acceptance shape for an epic whose blast radius spans `SPEC/gates.md`, `SPEC.md` §"Tasknote frontmatter", `SPEC/blocked.md`, three runners, the command-stub layer, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, and `docs/EXTERNAL-AGENTS.md`.

**Model tags.** `.N` filed `[light]🔧` rather than the epic's locked `[heavy]`, matching the audit-child precedent in this repo (`CORE-463.N`, `FE-94.N` both `[light]🔧`). `.2` and `.5` carry `[heavy]🧠` (contract design); `.3`, `.4`, `.6` carry `[medium]🧩`.

**Downstream-impact reconciliation: no downstream impact.** `## High` held only the `(none)` placeholder this filing replaced; `## Medium`, `## Low`, and `## Future Opportunities` are empty. No existing active entry shares a surface with any new child, so no reconcile action was proposed or applied.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits only; no executable surface)

- [x] Ran lint/type-check on changed code — N/A (same)

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A (no frontend surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass over the edited `.flowtron/PLAN.md` block, verified by grep rather than eye: 2-space child indent on all 7 cohort rows · bold `**CORE-473.<n>**` IDs intact · `[<model>]` + emoji on every line · ` — ` em-dash separator consistent · every long description under the 70w cap · no trailing whitespace anywhere in the file · `## 🌳 Fan-out` populated and its wikilinks match the five filed children exactly. The one row failing a strict ≤30-char shortname check is `.1` itself (`unattended-orchestration discovery`, 34 chars) — the skill's own prescribed `<shortname> discovery` shape, matching `CORE-463.1` (38 chars); the ≤30 guidance governs the base shortname (`unattended-orchestration`, 24).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts.** Pure Discovery filing; contract edits belong to the children.

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `AGENTS.md` | no change |
| `SPEC.md` | no change — the `--unattended` posture and the park-reason key land in [[CORE-473.2]] / [[CORE-473.3]] |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change — wiring-roster SSOT ([[CORE-465]]) is untouched by a PLAN filing |
| `codex/AGENTS-snippet.md` | no change |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — the epic is orchestrator-neutral by construction; no vendor-specific surface added |
| `docs/PLATFORMS.md` | no change **now**; §"Non-Claude capability triggers" tables gain a `--unattended` row in [[CORE-473.4]] (`/ft-release` §7.1 Pair I) |
| `claude/CAPABILITIES.md` | no change **now**; gains a `--unattended` flag row in [[CORE-473.4]] (same gate) |
| `docs/AGENT-COMPAT.md` | no change — deliberately not a flag mirror (Pair I rationale) |
| `docs/EXTERNAL-AGENTS.md` | no change **now**; two claims flagged stale-on-arrival and owned by [[CORE-473.6]] — §"The Return" ("the operator reviewing the diff is still the control point") and §"Relationship" ("**No SPEC contract change.**") both become false once the posture ships |
| `docs/WORKTREES.md` | no change |

**Final Summary:** Filed `CORE-EPIC-473` (`unattended-orchestration`) and closed its `.1` Discovery, scoping six verified headless gaps into five implementation children plus the reserved `.N` audit. Discovery's load-bearing find was that `docs/VISION.md` §"What we won't accept" already blesses this epic's exact shape — *"flowtron does ship the markdown contract a loop reports to … Contract in flowtron, runtime in the runner"* — so the epic is in-boundary only while it ships contract and no runtime, a constraint every child inherits. `SPEC/loop.md`'s destructive-action carve-out turned out to be the same design solved once for one skill, making this an extension rather than a new shape. Four scoping questions resolved: the orchestration contract extends `docs/EXTERNAL-AGENTS.md` rather than minting a parallel doc (extension-first); `--unattended` is a strict `--fast` superset so a consumer passes one flag; epic-close parks at the parent-flip instead of auto-approving an irreversible cohort move; and stop reasons ride a structured YAML park key with no new cue glyph. Archive skim surfaced the non-obvious wiring obligation that `/ft-release` §7.1 Pair I gates any new flag across `claude/CAPABILITIES.md` and the `docs/PLATFORMS.md` non-Claude tables — assigned to `.4` rather than discovered late. M held at 5; the four resolutions redistributed scope without changing the count.

**Archived:** 2026-08-25
