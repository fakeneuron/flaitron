---
title: grok-trigger-table
status: completed
tags: []
created: 2026-08-20
due:
related-tasks:
  - CORE-456.N
  - CORE-EPIC-456
touches:
  - docs/PLATFORMS.md
---

# CORE-458 | grok-trigger-table

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-456.N]] [[CORE-EPIC-456]]

## 🎯 Goal

Refresh `docs/PLATFORMS.md`'s Grok Build trigger-table Sub-agent, `/model`, and `/clear` rows against current vendor docs; restamp last-verified if facts change.

## ✅ Acceptance

- [x] Sub-agent / isolated exploration row reflects the native `spawn_subagent` tool (not the manual-second-session approximation)
- [x] Model / session switch row reflects the documented in-session `/model` command
- [x] Context freshness row reflects the documented in-session `/clear` command
- [x] Last-verified stamp restamped if the underlying facts changed the currency of the row — evaluated `N/A`: stamp already dated 2026-08-20 from today's dogfood session that these facts trace back to; no version bump; reasoning logged in Discovery Notes assumption 3

## 🧩 Subtasks

- [ ] Rewrite the Sub-agent / isolated exploration row citing `spawn_subagent` (vendor doc + this repo's dogfood observation)
- [ ] Rewrite the Model / session switch row citing `/model`
- [ ] Rewrite the Context freshness row citing `/clear`
- [ ] Decide whether the Grok last-verified stamp needs to move
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-456.N]] — predecessor: epic audit that filed this follow-up after observing native `spawn_subagent` under a Grok 4.6 session but scoping the trigger-table rewrite out of that audit
- [[CORE-EPIC-456]] — parent epic: grok-thin-wiring (closed 2026-08-20)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `CORE-EPIC-456` closed 2026-08-20; `.N` explicitly filed this follow-up rather than rewriting the trigger table inline. Nothing since then has touched `docs/PLATFORMS.md`'s Grok section beyond the `.4` stamp restamp (which explicitly left the trigger table untouched). Still relevant.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

PLAN.md (line 16), `docs/PLATFORMS.md` §"Non-Claude capability triggers" → Grok Build table (lines 380–396), archived `CORE-456.N.md` (filed this follow-up) and `CORE-456.4.md` (adjacent restamp, explicitly left the table alone). No probe — named files, known shape.

### Archive skim (load-bearing)

- [[CORE-456.N]] — the epic audit's Grok 4.6 session observed a native `spawn_subagent` tool (with `enter_plan_mode`) not reflected in the table; cited vendor guide files `16-subagents.md` (spawn_subagent, `explore`/`plan` types) and `04-slash-commands.md` (`/model`, `/clear`) from that session's environment. Logged the discrepancy and filed this task rather than rewriting inline (out of that audit's PLAN).
- [[CORE-456.4]] — sibling restamp child that touched the Grok stamp same day; its Implementation Notes explicitly defer the sub-agent row rewrite to `.N`/this task and state "Deferred: PLATFORMS Grok sub-agent trigger row still says 'No documented sub-agent spawn primitive'... leave for CORE-456.N." Confirms no one has touched the three rows since.

### Best Practices Review

Docs-only content fix — no code module boundaries. Table row shape (`| Trigger | Syntax | What it controls | When to reach for it |`) is established by the Grok/Cursor/Codex tables in the same file; extending it, not inventing a new shape.

### Drift check

- PLAN.md line (16) still matches: "Refresh PLATFORMS.md Grok Sub-agent, /model, and /clear trigger rows against current vendor docs (spawn_subagent, /model, /clear); restamp last-verified if facts change." No drift.
- Current table content confirmed stale by independent public-vendor-doc lookup (this session, not just the inherited Grok 4.6 observation):
  - `docs.x.ai/build/modes-and-commands` (public xAI docs, fetched this session): `/model <name>` (alias `/m`) switches the active model in-session; `/new` (alias `/clear`) starts a fresh session in-place. Both contradict the table's "no in-session equivalent is documented" claims.
  - `github.com/xai-org/grok-build` → `crates/codegen/xai-grok-pager/docs/user-guide/16-subagents.md` (public source repo, matches the filename CORE-456.N cited from its local environment): `spawn_subagent` tool with `subagent_type` (`general` / `explore` / `plan`) and `resume_from` params; `explore`/`plan` read-only, `general` full toolset. Confirms CORE-456.N's observation was a real, currently-documented primitive, not a one-session fluke.
- No SPEC contradiction — this is a factual currency fix to a per-platform capability-trigger table, the exact surface SPEC/docs earmark for platform-specific detail (contract layer untouched).

### Clarifications

No clarifications needed. Assumptions:
1. "Current vendor docs" in the PLAN line is satisfied by cross-referencing both the inherited first-person Grok 4.6 session observation (CORE-456.N) and this session's independent public-docs lookup (`docs.x.ai/build/modes-and-commands`, `github.com/xai-org/grok-build`) — stronger evidence than either alone.
2. Table rewrite stays scoped to the three named rows (Sub-agent, Model/session switch, Context freshness); the `/effort` slash command and workflow/`/tasks` commands surfaced by the public docs are out of scope — not named in the PLAN line, and existing rows (Effort/thinking level) already cover the reasoning-effort concept via `reasoning_effort`, which the docs' `/effort` command doesn't contradict.
3. The Grok "Last verified" stamp (`v5.18.0 · 2026-08-20 (dogfooded)`, set by `.4` today) does not need a date/version bump: it denotes the last actual first-use dogfood session under Grok, and this fix is a same-day correction from that same dogfood's own observation plus desk research under Claude Code — not a new dogfood run. No version bump either (SPEC.md still `v5.18.0`). This is logged explicitly rather than silently left alone, satisfying the Acceptance criterion's "if facts change" branch by reasoning to "stamp semantics unchanged" rather than skipping the question.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Extended the existing `| Trigger | Syntax | What it controls | When to reach for it |` row shape already used by all four per-platform trigger tables in this file (Grok/Codex/Cursor). Matched the Sub-agent row's phrasing style to Cursor's equivalent row (native primitive → probe/delegate split → when-to-reach-for) for cross-row consistency.

**Minimal refactor gate.** No refactor. Three table cells (Syntax column) plus a one-sentence provenance addition to the existing first-use-verification line. Deferred: nothing new surfaced — the public-docs cross-check didn't reveal any other stale row in the Grok table (Effort/thinking level, Skill invocation, Force-skip, Debug mode, Structured ask, Procedure pointer all still hold).

**Deliverables:** `docs/PLATFORMS.md` — rewrote the Sub-agent / isolated exploration, Model / session switch, and Context freshness rows in the Grok Build trigger table; appended a provenance sentence to the table's first-use-verification line. Left the `**Last verified:** \`v5.18.0 · 2026-08-20 (dogfooded)\`` stamp untouched — reasoning logged in Phase 1 Discovery Notes assumption 3 (same-day correction from the dogfood session that already set the stamp, no version bump, not a new dogfood run).

Tests N/A — docs-only content fix, no test surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: docs-only, no test surface

- [x] Ran lint/type-check on changed code — `git diff --check` clean

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A: no UI surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

| Check | Result |
|---|---|
| `git diff -- docs/PLATFORMS.md` | 3 rows rewritten (Sub-agent, Model/session switch, Context freshness) + 1 provenance sentence appended; 4 insertions/4 deletions |
| `git diff --check` | clean |
| Grok Last-verified stamp | unchanged — `v5.18.0 · 2026-08-20 (dogfooded)` already reflects today's dogfood; reasoning logged in Discovery assumption 3 |
| Other Grok trigger rows (Effort, Skill invocation, Force-skip, Debug mode, Structured ask, Procedure pointer) | unaffected — confirmed via same public-docs cross-check |
| `docs/AGENT-COMPAT.md` Grok row | checked — carries consume-mode summary only, no spawn_subagent/`/model`/`/clear` facts; no drift introduced |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change (wiring commands only; not the trigger-table facts this task touches)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — **updated** (Grok Sub-agent / `/model` / `/clear` trigger rows + provenance sentence)
  - `claude/CAPABILITIES.md` — no change (Claude-only stamp)
  - `docs/AGENT-COMPAT.md` — no change (verified: Grok row carries consume-mode summary only, not these row-level facts)
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Refreshed `docs/PLATFORMS.md`'s Grok Build trigger table: the Sub-agent / isolated exploration, Model / session switch, and Context freshness rows all claimed "no documented primitive" for `spawn_subagent`, `/model`, and `/clear` respectively — stale since CORE-456.N's Grok 4.6 dogfood session observed a native `spawn_subagent` tool and cited vendor docs for all three. This task corrects the rows, cross-referencing that inherited observation against independently-fetched public vendor docs (`docs.x.ai/build/modes-and-commands`, `xai-org/grok-build`'s `16-subagents.md`) for stronger evidence than either source alone.

**Paths:** `docs/PLATFORMS.md` — 3 table cells rewritten + 1 provenance sentence appended (4 insertions, 4 deletions).

**Verification:** `git diff --check` clean; cross-checked the remaining Grok trigger rows and `docs/AGENT-COMPAT.md`'s Grok row for related drift (none found). No test surface (docs-only).

**Refactors:** none — table shape and row-phrasing convention already established by the sibling Cursor/Codex tables in the same file; extended, not changed.

**Documentation verdict:** `docs/PLATFORMS.md` is the only AI-referenced doc touched. Grok `Last verified` stamp left as-is (`v5.18.0 · 2026-08-20 (dogfooded)`) — it denotes the last first-use dogfood session, which already happened today under CORE-456.4/.N; this fix is a same-day correction from that session's own observation, not a new dogfood run.

**Maintainability:** closes the gap CORE-456.N logged and deferred; the Grok trigger table now matches both the dogfooded primitive and public vendor docs, removing the last known currency gap from the `CORE-EPIC-456` grok-thin-wiring epic.

**Archived:** 2026-08-20
