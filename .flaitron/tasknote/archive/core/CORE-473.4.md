---
title: unattended-wiring
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.1, CORE-473.2, CORE-473.3]
blocked-by:
  - CORE-473.2
---

# CORE-473.4 | unattended-wiring

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Wire the `--unattended` posture defined by [[CORE-473.2]] through the three
task-runner skills, their `claude/commands/*.md` stubs, `claude/CAPABILITIES.md`,
and every `docs/PLATFORMS.md` non-Claude trigger table that already commits to a
flag roster, so an orchestrator can reach the posture from any documented entry point.

## ✅ Acceptance

- [x] All three runners (`ft-task`, `ft-micro-task`, `ft-goal-task` `SKILL.md`) parse `--unattended` as an unordered flag token (no short alias), set `unattended-mode`, emit exactly one inline marker, and load the shared fragment when it is true
- [x] A shared lazy fragment `claude/skills/ft-task/unattended-mode.md` carries the five park conversions mapped onto each runner's own step numbers, the park-writing recipe, and the pre-scaffold stop split — owned by `/ft-task`, referenced by the other two the way `step-1.5-model-edge.md` already is
- [x] Each runner's gate sites (Phase 1→2 exit, destructive action, ✋ prerequisite, Step 1.5 mismatch, bundled in-📦 prompt) carry a one-clause `--unattended` branch pointing at the fragment — no new banner, no new cue glyph
- [x] `/ft-micro-task`'s mid-execution hard-dependency path parks with `park-reason: dependency — …` and records promote-to-`/ft-task` as a resume instruction rather than performing it autonomously
- [x] All three `claude/commands/ft-*.md` stubs name `--unattended` in `argument-hint` and carry a Usage bullet in each stub's established shape
- [x] `claude/CAPABILITIES.md` gains one `--unattended` row in the fixed four-column shape, and its §"Agent-neutrality cross-check" gains the matching per-trigger bullet
- [x] The Grok Build, Codex CLI, and Cursor tables in `docs/PLATFORMS.md` §"Non-Claude capability triggers" each gain an `--unattended` row written from the CAPABILITIES row and re-stated for that platform's availability story
- [x] `/ft-release` §7.1 Pair I's check prints nothing against the edited tree
- [x] `SPEC/procedures/ft-task.md` gains an `unattended mode` row in §"Agent-neutral primitives" and the gate-site clauses where "autonomous mode" already appears (absorbed scope — see Discovery Notes §Clarifications)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — per-entry verdict

## 🧩 Subtasks

- [x] Write `claude/skills/ft-task/unattended-mode.md` — the shared fragment (conversions × runners, park recipe, pre-scaffold split)
- [x] Wire `claude/skills/ft-task/SKILL.md` — Step 0 parse + marker + fragment load; branch clauses at Steps 1.5, 2, 4, 5, 6
- [x] Wire `claude/skills/ft-micro-task/SKILL.md` — Step 0 parse + marker; branch clauses at Steps 1.5, 1 pre-flight, 3 (relevance + dependency park), 5
- [x] Wire `claude/skills/ft-goal-task/SKILL.md` — Step 0 parse + marker; branch clauses at Steps 1.5, 4, 5 (loop park already exists — add the `park-reason` obligation), 6
- [x] Update the three `claude/commands/ft-*.md` stubs (`argument-hint` + Usage bullet)
- [x] Add the `--unattended` row + cross-check bullet to `claude/CAPABILITIES.md`
- [x] Add the `--unattended` row to the Grok / Codex / Cursor tables in `docs/PLATFORMS.md`
- [x] Absorb the SOP: `SPEC/procedures/ft-task.md` primitives row + gate-site clauses
- [x] Run `/ft-release` §7.1 Pair I check + the repo's markdown/link verifications
- [x] Phase 4: doc-drift sweep, closure, atomic commit

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic (unattended-orchestration)
- [[CORE-473.2]] — predecessor; defines the `--unattended` posture this task wires (`blocked-by:`)
- [[CORE-473.3]] — sibling; park-reason frontmatter key emitted by the parked posture
- [[CORE-473.1]] — epic Discovery; Fan-out places this child Sequential after `.2`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-473.2]] landed the `--unattended` contract in `SPEC/gates.md` and deliberately edited zero runner, command-stub, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md` paths, naming this child as the owner. [[CORE-473.3]] landed the `park-reason:` key the parks write. Both prerequisites are archived; the flag is currently unreachable from every documented entry point, which is exactly the gap this child closes.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**The contract is already complete; this child is pure wiring.** `SPEC/gates.md`
§"`--unattended` operator posture" (~100 lines, [[CORE-473.2]]) defines the
posture, the five park conversions, the pre-scaffold stop split, and what the
flag never relaxes. `SPEC/blocked.md` carries the Phase 1→2 boundary park and
the resume path; `SPEC.md` §"Tasknote frontmatter" carries the closed-set
`park-reason:` codes ([[CORE-473.3]]). Nothing here needs new contract — the
work is translating an authoritative module into runner steps.

**Read set.** `SPEC/gates.md` §§"`--fast` operator override" / "`--unattended`
operator posture" / "Conditional skip rule" · `SPEC/blocked.md` ·
`SPEC.md` §"Tasknote frontmatter" · the three runner `SKILL.md` bodies ·
`claude/skills/ft-task/step-1.5-model-edge.md` (dispatch sites only) ·
the three `claude/commands/ft-*.md` stubs · `claude/CAPABILITIES.md` ·
`docs/PLATFORMS.md` §"Non-Claude capability triggers" ·
`claude/skills/ft-release/SKILL.md` §7.1 Pair I ·
`SPEC/procedures/ft-task.md` · `codex/skills/ft-{task,micro-task,goal-task}/SKILL.md`.

**Best Practices Review.** Touched responsibility is the *wiring layer*
(`claude/`, `docs/PLATFORMS.md`) plus one absorbed contract-layer surface
(the SOP). Dependency direction is one-way — skills consume `SPEC/`, never
the reverse — and every clause added here points at `SPEC/gates.md` rather
than restating it, so the contract stays single-sourced. The established
abstraction for cross-runner behavior is the **shared lazy fragment**:
`claude/skills/ft-task/step-1.5-model-edge.md` is owned by `/ft-task` and
read by `/ft-micro-task` + `/ft-goal-task` through a `MODEL_EDGE` path
binding. `--unattended` has the same shape (one posture, three runners,
divergent step numbers), so it extends that pattern rather than minting a
new one — and it is the only structure that avoids triplicating ~40 lines of
park logic across three bodies. No refactor required; no nearby duplication
introduced.

**Archive skim.** `grep -l` over `archive/core/` for the touched paths, then
read:

- [[CORE-473.2]] — hands this child the surface list explicitly: *"No skill,
  command stub, `claude/CAPABILITIES.md`, or `docs/PLATFORMS.md` file is
  edited — runner wiring is [[CORE-473.4]]'s deliverable."* Its doc-drift
  table pre-writes two of this child's verdicts.
- [[CORE-473.1]] — flags `/ft-release` §7.1 Pair I as the non-obvious
  obligation landing here, and [[CORE-465]] as the reason not to re-fork a
  wiring roster.
- [[CORE-460.3]] — minted Pair I after `--park` / `--worktree` sat missing
  from the Grok and Cursor tables *since they shipped*, because the gates
  that existed (Pair B/E frontmatter-derived, Pair G whole-file grep) were
  blind to the flag roster. Direct precedent for the failure this task must
  not repeat, and the reason the check is roster-derived rather than listed.
- [[CORE-465]] — `claude/AGENTS-snippet.md` §"One-time symlink wiring" is
  the SSOT for the adopter roster with five derived surfaces. Symlinks are
  per-skill-*directory*, so a new fragment inside `ft-task/` is wired the
  day it lands and **no roster edit is needed** — confirmed by reading the
  `ln -s` lines rather than assuming.
- [[CORE-438.5]] / [[CORE-456.2]] — the Cursor and Grok trigger tables'
  provenance; both stamp `last verified` on first-use observation, which a
  desk-research row addition must not move ([[CORE-460.4]] precedent).

**Drift check.** Every cited path, section, and line verified against HEAD by
direct read. `SPEC/gates.md:437` §"`--unattended` operator posture" and its
park table exist as `.2` describes; `SPEC/blocked.md:42` carries the Phase 1→2
boundary park; `SPEC.md:426-432` carries the six `park-reason` codes;
`claude/skills/ft-release/SKILL.md:519` is Pair I. Three surfaces in scope
carry the `--fast`-era two-flag assumption in prose and are *supposed* to
change here. One pre-existing tension surfaced and is resolved below rather
than silently: `/ft-micro-task` Step 3 asserts *"micro-tasks are not designed
to park"*, while `SPEC/gates.md` §"What `--unattended` never relaxes" states
the posture **applies to** `/ft-micro-task`. The contract wins; the skill's
sentence is scoped to the attended path and gains an unattended branch.

**Clarifications (structured ask, 3 questions).**

1. **SOP scope — absorb into `.4`.** `SPEC/procedures/ft-task.md` names
   `--fast` / `--debug` as the Claude spellings of neutral primitives and
   references *autonomous mode* at six gate sites; Codex's wrapper reads it
   **before** the canonical body, so a contract-only agent reaches the flag
   only through it. It is not on `.4`'s filed surface list. Operator chose
   absorb over filing a `.7`: the alternative would have shipped a flag whose
   own SOP does not mention it, and forced the PLATFORMS Codex row to
   document a gap. Scope addition is one primitives row plus the gate-site
   clauses — recorded, not silent, and surfaced at the 🛠️ exit gate.

2. **Micro hard-dependency park — park with `dependency` + a promote note.**
   Under `--unattended` nobody can perform the attended "re-file as
   `/ft-task`" motion. The park flips `status: blocked` with
   `park-reason: dependency — …` and *records* promote-to-`/ft-task` as a
   resume instruction, matching the posture's own rule that a park never
   performs the operator's motion autonomously (cf. `SPEC/blocked.md`'s
   drift park, which leaves the PLAN edit and the tasknote deletion to the
   resuming operator).

3. **No short alias.** `--unattended` only, matching `--worktree`.
   `SPEC/gates.md` spells only the long form, and a one-letter alias for a
   posture flag that suppresses every operator pause invites
   typo-activation. `-u` stays unclaimed.

**Explicit assumptions.** (a) The fragment is named `unattended-mode.md`
rather than a `step-N-` prefix, because the posture attaches across many
steps rather than one — mirroring `ft-file-followup/park-mode.md`. (b) The
Codex wrappers' own frontmatter is not edited: `--park` and `--worktree`
set the precedent that a flag lives in the canonical body and the wrapper
delegates. (c) `last verified` stamps in `claude/CAPABILITIES.md` and the
three PLATFORMS tables are **not** moved — adding a row is desk research,
not a new session under that agent ([[CORE-460.4]] precedent).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown-only change; the executable checks are `/ft-release` §7.1's Pairs B / E / I, run in Phase 3

**Implementation Notes:**

**One shared fragment, three thin call sites.** `claude/skills/ft-task/unattended-mode.md`
(115 lines) carries the posture's whole executable interpretation: the four-write
park recipe, a conversion map keyed to each runner's *own* step numbers, the
pre-scaffold stop split, and the never-relaxed list. `/ft-micro-task` and
`/ft-goal-task` bind it as `<UNATTENDED>` exactly as they already bind
`<MODEL_EDGE>` — the established shared-fragment shape, extended rather than
re-invented. Each runner then carries only a flag parse, one marker, and a
one-clause branch per gate site pointing at the fragment. Triplicating the park
logic would have been ~40 lines × 3 with three drift surfaces.

**The fragment points at the contract; it never re-states it.** Every section
links `SPEC/gates.md` §"`--unattended` operator posture", `SPEC/blocked.md`, or
`SPEC.md` §"Tasknote frontmatter" for the authoritative text. `.2` and `.3`
already own the contract, so a second copy here would be the exact drift class
`/ft-release` §7.1 exists to catch.

**No new glyph, no new banner.** The activation marker reuses `⚡` (the `--fast`
glyph — correct, since the posture is that flag's superset) and the park/stop
markers reuse `⏸`, the pre-existing nav chip. Verified rather than asserted:
the `AWAITING APPROVAL` count is byte-identical to HEAD (58 → 58), and `⏸` is
present at HEAD in four files.

**`--unattended` implies `--fast`.** Set at parse time in all three runners, so
the operator passes one flag and every existing `fast-mode` branch keeps
working untouched. This is what let the wiring stay additive: not one
`fast-mode` clause needed rewriting.

**Two runner-specific reconciliations.**
`/ft-micro-task`'s *"micro-tasks are not designed to park"* is preserved as the
attended-path sentence and gains an unattended branch that parks with
`park-reason: dependency — …; promote to /ft-task on resume` — the promotion
recorded as an instruction, never performed. `/ft-goal-task`'s loop already
parked on a destructive step by construction, so the posture adds only the
`park-reason:` obligation there; its `loop-max` **soft stop** is explicitly
marked *not* a conversion, since it hands back with the tasknote unparked
either way.

**SOP absorption (the approved scope addition).** `SPEC/procedures/ft-task.md`
gained an `unattended mode` primitives row, a one-paragraph "Parking, in one
paragraph" explainer, and five gate-site clauses (model gate, foreign-dirt,
Phase 1→2 exit, Phase 2 destructive/prerequisite, reconciliation scan, Step 6
bundled prompt). This is what let the PLATFORMS **Codex** row describe the same
two-step routing `--fast` has, instead of documenting a gap.

**Refactors:** none. **Deferred:** nothing — the two gate findings this change
created were fixed in-task (below) rather than filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-only change, so the real suite is `/ft-release` §7.1's release gates.
Ran every pair the edit could plausibly touch, not just the one the PLAN line
named — which is how the two findings below surfaced.

| Check | Result |
|---|---|
| §7.1 **Pair I** — `CAPABILITIES.md` flag rows ↔ non-Claude trigger tables | **pass** (prints nothing). Roster now derives `--fast --unattended --debug --worktree --park`; all three flag-bearing sections carry every one |
| §7.1 **Pair B** — Claude skill flags ↔ Codex wrapper `description:` | **found + fixed** (see below) |
| §7.1 **Pair E** — `ft-flowtron` roster rows ↔ shipped skills / flags | **found + fixed** (see below); row `diff` exits 0 |
| §7.1 **Pair G** — `--worktree` mirrors | pass, untouched |
| `git diff --check` | clean |
| Glyph audit — `AWAITING APPROVAL` count vs HEAD | 58 → 58; only `⏸` appears on added lines, present at HEAD |
| Fragment relative links (`../../../SPEC{,.md,/gates.md,/blocked.md}`) | 3/3 resolve |
| `park-reason` codes used vs the closed set in `SPEC.md` | 6/6 match; no invented code |
| `<UNATTENDED>` binding declared + used | 1 declaration + 6 uses in each of micro / goal |
| `node --test tools/update-adopters.test.mjs` | 0 fail |
| `npm --prefix viz test` | 470/470 pass, 25 files |

**Two gate findings this change created, both fixed in-task.** Naming
`--unattended` in `/ft-task`'s Claude `description:` is precisely what Pairs B
and E watch for:

- **Pair B** — `MISMATCH ft-task | claude:[--debug --unattended] codex:[--debug]`.
  Fixed by appending the capability to `codex/skills/ft-task/SKILL.md`'s
  `description:` in Codex's own voice, per the pair's stated fix ("not by
  copying the Claude sentence").
- **Pair E** — `MISSING FLAG ft-task --unattended`. Fixed by extending
  `/ft-task`'s roster row in `claude/skills/ft-flowtron/SKILL.md`. Also added
  the flag to the `/ft-micro-task` and `/ft-goal-task` rows: the pair's flag
  half is deliberately blind to them (their descriptions name the flag only
  inside a quote-stripped `args="…"` illustration), and leaving them bare is
  exactly the [[CORE-460.3]] failure — a flag missing from a mirror since the
  day it shipped.

Both pairs re-run clean.

**Quality assertions.** No duplication introduced: the fragment is the single
home for the posture's runner-side steps, and each SKILL branch is a pointer,
not a copy. No dead surface — every clause added is reachable from a parse
branch. Public-surface growth is one flag and one fragment file, both required
by the Acceptance. No stale code-facing docs left behind: the drift the change
created in `docs/AGENT-NEUTRALITY.md` was caught by the sweep and fixed, not
deferred.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts.** Wiring-layer change plus one absorbed
contract surface; the sweep caught two real drifts the change itself created.

| Doc | Verdict |
|---|---|
| `README.md` | no change — L234's `--fast` within-task-autonomy bullet stays accurate and README never enumerates the flag roster |
| `AGENTS.md` | no change — L16's peer-skill roster is names-only by design, with a single Pair-F exception for park-priority flags |
| `SPEC.md` | no change — L652–653 already names the posture ([[CORE-473.2]]); L808's `--fast` 👁️ clause covers `--unattended` transitively, since the flag implies it |
| `docs/MIGRATION.md` | no change — §1.2's capsule is per-skill and explicitly defers to each `SKILL.md` frontmatter, which now names the flag; the `ln -s` roster is untouched, and symlinks are per-skill-*directory*, so the new fragment ships without a roster edit ([[CORE-465]] SSOT intact) |
| `claude/AGENTS-snippet.md` | **updated** — one paste-block bullet. [[CORE-473.2]] deferred "adopter-facing flag wiring" here explicitly, and this block is what an adopter's assistant reads to learn the workflow surface |
| `codex/AGENTS-snippet.md` | no change — thin wiring, names no flags |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change — L56 cites `--fast` as an example of a skipped Phase 3 step; Phase 3 lint/type-check still runs under the posture |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change — L88 already names `--unattended` alongside `--fast` ([[CORE-473.2]] fixed it in the same commit that created the risk) |
| `docs/AGENT-NEUTRALITY.md` | **updated ×2** — L41's ledger row described the SOP primitives table as carrying *two* rows (`autonomous mode`, `debug mode`); absorbing the SOP made that three. L115's inventory of what `claude/CAPABILITIES.md` holds was missing the new trigger. Both are factual staleness this commit caused |
| `docs/PLATFORMS.md` | **updated** — `--unattended` rows added to the Grok Build, Codex CLI, and Cursor tables, each written from the `CAPABILITIES.md` row and re-stated for that platform's availability story. `last verified` stamps deliberately unmoved: desk research, not a new session under those agents ([[CORE-460.4]] precedent) |
| `claude/CAPABILITIES.md` | **updated** — one flag row in the fixed four-column shape + the matching §"Agent-neutrality cross-check" bullet. `Last verified` stamp unmoved, same reason |
| `docs/AGENT-COMPAT.md` | no change — L19 names `--fast` as an *example* capability trigger, deliberately not a flag mirror (the Pair I rationale) |
| `docs/EXTERNAL-AGENTS.md` | **stale, owned by [[CORE-473.6]]** — §"Relationship"'s "No SPEC contract change." and §"The Return"'s operator-as-control-point claim remain false. Verdict carried forward from [[CORE-473.2]] unchanged; fixing it here would hand `.6` a conflicting edit |
| `docs/WORKTREES.md` | no change |

**Final Summary:**

Made `--unattended` reachable. [[CORE-473.2]] defined the posture and
[[CORE-473.3]] gave its parks a machine-readable reason, but the flag was
documented in exactly one contract module and accepted by zero entry points —
an orchestrator reading `SPEC/gates.md` had nothing to pass. All three runners
now parse it, all three command stubs and both flag rosters name it, and the
agent-neutral SOP names it as a neutral primitive so contract-only agents reach
it too.

The structural decision was **one shared fragment over three copies**.
`claude/skills/ft-task/unattended-mode.md` carries the four-write park recipe, a
conversion map keyed to each runner's own step numbers, the pre-scaffold stop
split, and the never-relaxed list; `/ft-micro-task` and `/ft-goal-task` bind it
as `<UNATTENDED>` exactly as they already bind `<MODEL_EDGE>`, so this extends
the established shared-fragment shape instead of minting one. Each runner keeps
only a parse, a marker, and a one-clause branch per gate. Because the parse sets
`fast-mode = true` alongside `unattended-mode = true`, not a single existing
`fast-mode` branch needed rewriting — the wiring is purely additive.

Two runner-specific tensions were reconciled rather than papered over.
`/ft-micro-task`'s *"micro-tasks are not designed to park"* directly contradicts
`SPEC/gates.md`'s claim that the posture applies to it; the contract wins, the
sentence is scoped to the attended path, and the unattended branch parks with
`park-reason: dependency — …; promote to /ft-task on resume` — recording the
operator's motion rather than performing it. `/ft-goal-task`'s loop already
parked on destructive steps, so it gained only the `park-reason:` obligation,
and its `loop-max` soft stop is explicitly marked *not* a conversion.

**Changed:** 15 files, **+232 / −50** (13 edited, 2 new — the fragment and this
tasknote). Runners `ft-task` / `ft-micro-task` / `ft-goal-task`, their three
command stubs, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` (3 tables),
`SPEC/procedures/ft-task.md` (the approved absorption), plus four surfaces the
change's own drift pulled in: `codex/skills/ft-task/SKILL.md`,
`claude/skills/ft-flowtron/SKILL.md`, `docs/AGENT-NEUTRALITY.md`, and
`claude/AGENTS-snippet.md`.

**Verification, by command rather than by eye.** Running *every* plausibly
affected `/ft-release` §7.1 pair — not only Pair I, the one the PLAN line named
— is what earned the change its two real findings. Naming the flag in
`/ft-task`'s Claude `description:` immediately tripped **Pair B**
(`codex:[--debug]` lagging `claude:[--debug --unattended]`) and **Pair E**
(`MISSING FLAG ft-task --unattended`); both were fixed in-task, in each pair's
own prescribed shape, and both re-run clean. Pair E's flag half is deliberately
blind to `/ft-micro-task` and `/ft-goal-task`, whose descriptions name the flag
only inside a quote-stripped illustration — so their roster rows were extended
by hand, because a flag missing from a mirror since the day it shipped is
precisely the [[CORE-460.3]] failure this epic keeps citing. Also verified: the
`AWAITING APPROVAL` count is byte-identical to HEAD (58 → 58) and `⏸` is the
only glyph on added lines, so **no new banner and no new cue glyph** — the
CORE-065 two-banner cap holds; all 6 `park-reason` codes match the closed set
with none invented; 3/3 fragment links resolve; `git diff --check` clean;
`node --test` 0 fail; `npm --prefix viz test` 470/470.

**Doc-drift caught two staleness items the change itself created** —
`docs/AGENT-NEUTRALITY.md`'s ledger row still described the SOP primitives table
as two rows when the absorption made it three, and its `CAPABILITIES.md`
inventory was missing the new trigger. Both fixed here.
`docs/EXTERNAL-AGENTS.md`'s two false claims stay [[CORE-473.6]]'s, carried
forward unchanged.

**Maintainability:** the posture now has one executable home instead of three,
so a future change to what a park writes edits one file and reaches all three
runners. An orchestrator can pass `--unattended` to any documented entry point,
under Claude, Codex, Cursor, Grok, or the agent-neutral SOP, and read the stop
cause out of `park-reason:` without a transcript. Remaining epic gaps are the
two unreachable entry points ([[CORE-473.5]]) and the published orchestration
contract ([[CORE-473.6]]).

**Archived:** 2026-08-25
