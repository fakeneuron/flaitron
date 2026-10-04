---
title: unreachable-entrypoints
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-EPIC-473, CORE-473.1, CORE-473.2, CORE-473.3, CORE-473.4, CORE-473.6]
blocked-by:
  - CORE-473.2
parallel-safe-with:
  - CORE-473.3
---

# CORE-473.5 | unreachable-entrypoints

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-473]]

## 🎯 Goal

Close the two entry points an orchestrator cannot reach: give `/ft-close-epic` an `--unattended` posture that drives the `.N` audit to closure then parks at the parent-flip instead of auto-approving it, and document a resume path for an in-progress tasknote that `/ft-task` refuses by design.

## ✅ Acceptance

- [x] `/ft-close-epic` parses `--unattended` (its only flag — it takes no `--fast`), emits an activation marker, and reuses existing glyphs only (⚡ / ⏸); no new cue glyph, no new banner
- [x] Pre-scaffold stops terminate write-nothing in the `⏸ --unattended stop — <cause>: …` shape: foreign dirt, in-flight audit note, archived audit, no parent epic, parent already `## Completed`, invalid audit position, and open implementation siblings (Step 2's default-No bail taken deterministically)
- [x] Step 4's Phase 1→2 🛠️ (the `default-fire-on-clarifications` flavor) converts to a park with a closed-set `park-reason:` — the audit note exists by then, so the standard park recipe applies unchanged
- [x] Step 9 **unbundles and defers** the parent-flip: the `.N` audit closes and commits atomically with a real deliverable-covering SHA (audit deliverables + its own PLAN stub flip + archive move), the parent line and cohort are untouched, and a machine-readable `⏸ --unattended stop — parent-flip: …` is emitted and recorded in the archived audit's Final Summary
- [x] `SPEC/gates.md` §"`--unattended` operator posture" → **Applies to** updated: it defers epic-skill acceptance to "their own entry points" and must now name `/ft-close-epic`'s
- [x] `SPEC.md` §"Tasknote frontmatter" closed set gains one row — `interrupted` — for a run that ended without reaching closure *or* a gate
- [x] `SPEC/blocked.md` gains §"Resuming an interrupted run": the caller writes `status: blocked` + `park-reason: interrupted — …` and re-invokes `<SKILL> <ID>`, which takes the existing Step 3c resume path unchanged. Scoped to `in-progress`; states explicitly that flowtron ships no crash detector — the caller performs the writes
- [x] All three runners' in-flight refusal line (`/ft-task` SKILL.md:110 and its `/ft-micro-task` · `/ft-goal-task` equivalents) points at that section instead of ending at "continue conversationally"
- [x] Roster wiring holds: `claude/CAPABILITIES.md` `--unattended` row, the Grok / Codex / Cursor trigger tables in `docs/PLATFORMS.md`, `claude/skills/ft-flowtron/SKILL.md`'s `/ft-close-epic` row (Pair E), `codex/skills/ft-close-epic/SKILL.md`'s `description:` (Pair B), and `claude/commands/ft-close-epic.md` all name the flag
- [x] `AWAITING APPROVAL` count unchanged from HEAD (61) — verified by grep, not asserted
- [x] Doc-drift sweep run; single `feat: CORE-473.5 — …` commit lands with PLAN stub flip + archive

## 🧩 Subtasks

- [x] `SPEC.md` §"Tasknote frontmatter" — add the `interrupted` row to the `park-reason:` closed set and reconcile the "first five are gate conversions / `dependency` is the mid-Phase-2 park" sentence with a third category
- [x] `SPEC/blocked.md` — add §"Resuming an interrupted run" (caller writes, re-invoke, Step 3c unchanged, scoping, no-crash-detector boundary)
- [x] `SPEC/gates.md` — widen the `input-needed` reading to cover `/ft-close-epic`'s Phase 1→2 clarification ask, and rewrite the **Applies to** paragraph now that an epic skill accepts the flag
- [x] `claude/skills/ft-close-epic/SKILL.md` — flag parse at Step 0/1, stop shapes at Steps 1-2, park conversion at Step 4, unbundle-and-defer at Steps 8-9
- [x] Runner refusal-line pointers — `/ft-task`, `/ft-micro-task`, `/ft-goal-task` (+ `SPEC/procedures/ft-task.md` if it restates the refusal)
- [x] Roster wiring — `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` (3 tables + the Claude row), `ft-flowtron` roster row, codex wrapper `description:`, `claude/commands/ft-close-epic.md`
- [x] Phase 3 — re-run `/ft-release` §7.1 Pairs B / E / G / I, the `AWAITING APPROVAL` count, and a markdown/link pass over every edited file

## 🔗 Related

- [[CORE-EPIC-473]] — parent epic (unattended-orchestration)
- [[CORE-473.1]] — Discovery; source of gaps G4 (epic-close) + G5 (resume) and the "park, don't close" resolution
- [[CORE-473.2]] — `blocked-by:` — defines the `--unattended` posture this child consumes
- [[CORE-473.3]] — `parallel-safe-with:` — `park-reason:` frontmatter key
- [[CORE-473.4]] — `--unattended` runner wiring + roster
- [[CORE-473.6]] — follow-up; documents the finished orchestration contract

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both gaps are verified by direct read at HEAD, not inferred: `/ft-close-epic` accepts no flag at all (`SKILL.md:10` parses `args` as an ID only), and every runner's four-way branch refuses `status: completed` with an instruction only a human in a live session can follow (`claude/skills/ft-task/SKILL.md:110`). [[CORE-473.2]] shipped the posture and [[CORE-473.3]] the machine-readable reason; this child is the last one that makes them reachable from the two entry points the runner wiring in [[CORE-473.4]] deliberately left out.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Constraint inherited from the epic.** `docs/VISION.md` §"What we won't accept" permits shipping *the contract a runner reports to*, never the runner. Both deliverables here are contract-only: no crash detector, no scheduler, no auto-approval. Where a write is needed to enter a documented state, the **caller** performs it and flowtron documents its shape.

**Gap A — `/ft-close-epic` is unreachable (G4).** Two independent blocks, both at HEAD:

| Site | Block |
|---|---|
| `claude/skills/ft-close-epic/SKILL.md:10` | Parses `args` as an ID only — no flag surface at all |
| `:58-65` | Open-siblings **AskUserQuestion** (default No bails) |
| `:122-125` | Phase 1→2 exit gate, `default-fire-on-clarifications` flavor — *any* surfaced clarification fires 🛠️ |
| `:179-194` + `SPEC/gates.md:386` | Parent-flip is a **bundled in-📦 prompt** that force-fires 📦 regardless of signal state |

`SPEC/gates.md:540-541` explicitly leaves the door open: *"The epic skills … take no `--fast`; whether and how they accept `--unattended` is defined at their own entry points, not here."* This task writes that entry point, so that paragraph must be updated in the same change — it currently describes a decision that has not been made.

**Gap B — no resume entry point (G5).** `claude/skills/ft-task/SKILL.md:110` refuses `not-started` / `in-progress` / `completed` and recommends *"continue conversationally (e.g., \"continue CORE-004\")"*. That instruction presumes a session holding the task's context. An orchestrator whose child session was killed or ran out of context has neither the session nor a flag. `SPEC/blocked.md:71-79` has a complete, well-tested resume path — it is simply gated on `status: blocked`, which an interrupted run never reached.

**Decisions (both confirmed by operator ask at Phase 1 exit — confirmations of the `.1` resolutions, not deviations):**

1. **Parent-flip: unbundle and defer, do not park.** The bundled-prompt override exists because *autonomous commit cannot resolve a user-input question* (`SPEC/gates.md:386`, authored by [[CORE-437]]). Unbundling preserves that intent exactly — the question stays unanswered — while letting the audit close, which is what G4 is about. Parking the audit instead would leave the expensive verification pass uncommitted over a question that never touched it, and only half-closes the gap. The deferred flip needs no park because there is nothing to park: the audit note is `completed` and archived, and parking a closed note would contradict `SPEC/blocked.md:64` (*"paused, not closed"*). PLAN.md carries the signal structurally — parent `[ ]` with every child `[x]` is unambiguous.
2. **Resume: park-then-resume, no `--resume` flag.** Two frontmatter writes by the caller (`status: blocked` + `park-reason: interrupted — …`) route an interrupted note into the *existing* Step 3c path with zero executable change. The alternative adds a fifth flag, a fifth branch in three runners, a second resume path beside Step 3c, and the full Pair B / E / I wiring tax — to reach a state the file format already expresses.

**One closed-set edit, one addition.** `interrupted` is a genuinely new stop cause (the run ended without reaching closure *or* a gate) and takes a new row, exactly as `SPEC.md`'s table instructs. `/ft-close-epic`'s Phase 1→2 clarification ask is *not* new — it is the same "question autonomous execution cannot answer" that `input-needed` already names; that row's prose is widened rather than a seventh code minted.

**Archive skim (`.flowtron/tasknote/archive/core/`).** Load-bearing hits:

- **[[CORE-437]]** — *loosen auto-commit gates*. Authored the bundled-prompt override this task unbundles. Its rationale (autonomous commit cannot resolve user-input questions) is the thing to preserve; the bundling is the mechanism, not the contract.
- **[[CORE-358]]** — *paper-complete guard*. Its foreign-dirt STOP and the deliverable-covering-SHA rule are the two lines this task must hold hardest: the unattended audit commit is a **real** commit, so 🏁 needs a real SHA and the dirt gate still terminates write-nothing.
- **[[CORE-460.2]]** / `/ft-release` §7.1 **Pair I** — adding a flag to a skill obligates the mirror surfaces. `--unattended` already has a CAPABILITIES row and non-Claude table rows from [[CORE-473.4]], so this is an *edit* to existing rows (naming `/ft-close-epic` in the "where it applies" column), not new rows — Pair I's flag-derived grep stays green either way, but the rows would be factually stale.
- **[[CORE-418]]** — audit-shortname flip; confirms Step 7's PLAN stub form for the `.N` row, which the unattended path still writes.
- **[[CORE-334]]** — the reserved `.N` suffix; the deferred-flip stop line must name the cohort without assuming numeric audit IDs.

**Drift check.** Every path, section name, and line number cited above re-read at HEAD (`98acbb6`) — no drift. Pair B / E / G / I definitions re-read at `claude/skills/ft-release/SKILL.md:384` / `:416` / `:474` / `:519`. `AWAITING APPROVAL` baseline measured, not recalled: **61** across `*.md` at HEAD. The plan formed here contradicts no SPEC contract; the one contract it *changes* (`SPEC/gates.md` **Applies to**) is a deliverable, and the `.1` note flagged `docs/EXTERNAL-AGENTS.md`'s two stale claims as [[CORE-473.6]]'s, not this task's.

**Assumptions asserted.** `/ft-close-epic --unattended` does **not** imply `--fast` the way the runners' flag does — the epic skills never accepted `--fast`, so there is no flag to be a superset of. It carries the posture's own semantics directly: suppress what has no operator, park or terminate what cannot be answered.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown-only change; the executable checks are `/ft-release` §7.1's Pairs B / E / I plus the banner and glyph counts, all run in Phase 3

**Implementation Notes:**

**Two deliverables, one shape between them.** Both gaps had the same cause — a
state the file format already expresses, with no way for an operator-less
caller to reach it. Neither fix invents a mechanism:

| Gap | Existing machinery reused | What was actually added |
|---|---|---|
| G4 epic-close | the posture (`.2`), `park-reason:` (`.3`), the shared `unattended-mode.md` fragment (`.4`) | one flag parse, one park conversion, one unbundling |
| G5 resume | `SPEC/blocked.md`'s Step 3c resume path, untouched | one closed-set code, one contract section, three pointers |

**Unbundling, not parking, at the parent-flip.** The bundled-prompt override
([[CORE-437]], `SPEC/gates.md`) forces 📦 to fire because *autonomous commit
cannot resolve a user-input question*. Unbundling keeps that intent exactly —
the question stays unanswered — while removing the coupling that made the
audit itself unreachable. Parking instead would have stranded a verification
pass that had no unanswered question of its own, and there is nothing to park
by Step 9: the audit note is `completed` and archived, and `SPEC/blocked.md`
§"Parked state" defines a parked note as *paused, not closed*. The deferral is
recorded twice where a caller will find it — the archived note's Final Summary,
and PLAN.md structurally (parent `- [ ]` above a cohort of `- [x]`).

**`--unattended` on `/ft-close-epic` is not a `--fast` superset.** The runners'
flag is defined as one, but the epic skills never accepted `--fast`, so there
is nothing to inherit; the flag carries the posture directly. Said in all four
places that assert the superset relation (`SPEC/gates.md`,
`unattended-mode.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` ×3) rather
than left to be inferred.

**The resume path adds no executable change.** Two frontmatter writes by the
caller (`status: blocked` + `park-reason: interrupted — …`) route a stranded
note into the branch that already exists. The rejected alternative — a
`--resume` flag — would have added a fifth CAPABILITIES row, a fifth branch in
three runners, a second resume path beside Step 3c, and the full Pair B / E / I
wiring tax, to reach a state the format already had. The three runner refusal
lines gained a pointer, not a branch.

**One code minted, one widened.** `interrupted` is genuinely new — the run
ended without reaching closure *or* a gate, and it is the one code a *caller*
writes rather than a runner, so `SPEC.md`'s "first five are gate conversions /
`dependency` is the mid-Phase-2 park" sentence gained a third category.
`/ft-close-epic`'s Phase 1→2 clarification is not new: it is the same "question
autonomous execution cannot answer" `input-needed` already names, so that row's
prose widened rather than a seventh code appearing.

**Two corrections the change obligated.** `SPEC/gates.md`'s **Applies to**
paragraph explicitly deferred epic-skill acceptance to "their own entry points,
not here" — writing that entry point makes the deferral stale, so it now names
`/ft-close-epic` and states why `/ft-epic-discovery` still does not accept the
flag (opening an epic is a scoping conversation; there is nobody to have it
with). `SPEC/blocked.md`'s "which of the **six** stop causes" became seven.

**Scope boundaries held.** No crash detector, no supervisor, no auto-approval —
`SPEC/blocked.md` §"Resuming an interrupted run" says outright that flowtron
performs neither write. `not-started` and `completed` are explicitly excluded
from the resume path (the latter routed to the paper-complete guard, where it
belongs) rather than quietly folded in.

**Refactors:** none. **Deferred:** nothing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` in the usual sense (13 markdown files, no executable surface); the release gates below are the equivalent

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`: no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-only change across 13 files (+192/−24). Every assertion below was run,
not asserted.

| Check | Result |
|---|---|
| `/ft-release` §7.1 **Pair B** (Claude `description:` flags ↔ Codex wrapper) | clean — `ft-close-epic`'s two descriptions now both carry `--unattended` |
| §7.1 **Pair E** (roster rows + roster flags) | clean both directions |
| §7.1 **Pair I** (CAPABILITIES flags ↔ non-Claude trigger sections) | 15 MISSING lines, **identical at HEAD** — the three stub sections (Gemini CLI / Aider / Amp) carry no flag rows at all. Pre-existing, not a regression; verified by re-running the script against a stashed tree |
| **No new banner** — `AWAITING APPROVAL` count | 61 → 61 on tracked `*.md` (`git grep -c` at HEAD vs worktree). `git diff` adds and removes **zero** lines containing the string. (A plain `grep -r` reads 64 either way — the `.claude/` symlink farm double-counts; the tracked-file count is the honest one.) |
| **No new cue glyph** | every glyph on an added line is pre-existing vocabulary referenced in prose — 📦 ×10, 🛠 ×6, ⏸ ×5, ✋ ×4, 🏁 ×2, 🗄/▶/📡/💻 ×2 each, 🟢 ⚡ 👁 ×1. `SPEC/gates.md` §"Operator-cue vocabulary" and §"Glyph layers and reuse" are untouched by the diff |
| Relative-link resolution across all 13 edited files | clean. One hit (`SPEC.md` → `../PLAN.md`) is the tasknote nav-header *example* at `SPEC.md:473`, pre-existing and correct in its own context — absent from this diff |
| `git diff --check` | clean |
| Section anchors every new cross-reference targets | all three exist: `SPEC/blocked.md` §"Resuming an interrupted run", `SPEC/gates.md` §"`/ft-close-epic` under the posture", `SPEC.md`'s `interrupted` table row |

**Quality assertions.** No duplication: the contract lives once in
`SPEC/gates.md` / `SPEC.md` / `SPEC/blocked.md` and every skill-side mention
links to it rather than restating it — the drift class `/ft-release` §7.1
exists to catch. Public-surface growth is one flag on one skill and one
closed-set code. One consistency fix made in-task: `/ft-close-epic` initially
bound the shared fragment as a *directory* (`<UNATTENDED>/unattended-mode.md`);
switched to the file binding `/ft-goal-task` established, so all four callers
now spell it the same way.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep — per-entry verdicts** (`.flowtron/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change — names no flag |
| `AGENTS.md` | no change |
| `SPEC.md` | **updated** — `interrupted` row added to the `park-reason:` closed set, plus the third-category sentence |
| `docs/MIGRATION.md` | no change — wiring is by symlink roster, and no new skill or fragment shipped |
| `claude/AGENTS-snippet.md` | **updated** — its `--unattended` paragraph named three skills and asserted the superset relation unconditionally; now names `/ft-close-epic` with its two differences, and points at the interrupted-resume path |
| `codex/AGENTS-snippet.md` | no change — symlink wiring only; `ft-close-epic` already listed |
| `cursor/AGENTS-snippet.md` | no change |
| `grok/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | **updated** — "the `--unattended` posture that supersets it" is no longer universally true; parenthetical trimmed, the security claim itself unchanged |
| `docs/AGENT-NEUTRALITY.md` | no change — the `--unattended` ledger row piggybacks on the `--fast` row per `claude/CAPABILITIES.md`'s own note, and that row's site list counts `--fast` sites, none of which this change touched. `/ft-*` skill names in `SPEC/gates.md` are pre-existing there and agent-neutral (each ships a Codex wrapper) |
| `docs/PLATFORMS.md` | **updated** — all three non-Claude trigger tables (Grok / Codex / Cursor) name `/ft-close-epic` and carry the deferral semantics |
| `claude/CAPABILITIES.md` | **updated** — `--unattended` row's applies-to and behavior columns |
| `docs/AGENT-COMPAT.md` | no change — per-agent consume-mode and currency stamps, unaffected |
| `docs/EXTERNAL-AGENTS.md` | **no change, deliberately** — its two stale claims (§"The Return"'s operator-as-control-point, §"Relationship"'s "No SPEC contract change") were scoped to [[CORE-473.6]] at Discovery and remain its deliverable. Editing them here would take that child's work |
| `docs/WORKTREES.md` | no change |

**Final Summary:**

Closed the two entry points an orchestrator could not reach. `/ft-close-epic`
now accepts `--unattended`: its pre-scaffold bails terminate write-nothing in
the machine-readable stop shape, its Phase 1→2 gate parks, and — the change
that actually unblocks epic-close — the parent-flip is **unbundled from the 📦
gate and deferred** rather than answered, so the `.N` audit closes and commits
atomically while the irreversible cohort move stays operator-owned. Separately,
an `in-progress` tasknote stranded by a dead session is now recoverable: the
caller writes `status: blocked` + a new closed-set `park-reason: interrupted`,
and re-invoking the skill takes `SPEC/blocked.md`'s existing resume path with
no executable change to any runner.

15 markdown files, +227/−28. Verified rather than asserted: `/ft-release` §7.1
Pairs B and E clean; Pair I's 15 MISSING lines identical at HEAD (stub sections,
pre-existing); `AWAITING APPROVAL` 61 → 61 on tracked `*.md` with zero add/remove
in the diff; every glyph on an added line pre-existing vocabulary, with the cue
tables untouched; relative links resolve across all edited files; `git diff
--check` clean. No refactors, nothing deferred. Doc-drift: `SPEC.md`,
`claude/AGENTS-snippet.md`, `SECURITY.md`, `docs/PLATFORMS.md`,
`claude/CAPABILITIES.md` updated; `docs/EXTERNAL-AGENTS.md` left to
[[CORE-473.6]] by design; the rest no change.

**Maintainability effect.** The posture's surface grew by one flag on one skill
and one `park-reason` code, and both fixes route into machinery that already
existed rather than adding a parallel path — no second resume flow beside Step
3c, no new banner, no new glyph, no crash detector. `SPEC/gates.md`'s
**Applies to** paragraph, which had explicitly deferred this decision, now
states it instead of pointing at a decision nobody had made.

**Archived:** 2026-08-25
