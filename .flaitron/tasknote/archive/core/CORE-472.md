---
title: ft-task-sop-rotation-mirror
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-467, CORE-471]
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

# CORE-472 | ft-task-sop-rotation-mirror

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-467]] [[CORE-471]]

## 🎯 Goal

Mirror the `## Completed`-rotation advisory check into `SPEC/procedures/ft-task.md` Step 1 and bump its `last-verified:` stamp so the agent-neutral SOP stays in sync with `claude/skills/ft-task/SKILL.md`.

## ✅ Acceptance

- [x] `SPEC/procedures/ft-task.md` Step 1 restates the `## Completed`-rotation advisory (150-row threshold, one-line `⚠️` shape, informational-only / never-block framing), mirroring `claude/skills/ft-task/SKILL.md` Step 1's "Completed-rotation check (advisory)"
- [x] `SPEC/procedures/ft-task.md` frontmatter `last-verified:` bumped from `v5.17.0 · 2026-08-18` to `v5.19.0 · 2026-08-25`, matching `SPEC.md`'s current `**Version:**`
- [x] SOP still routes rather than copies — no Claude-specific machinery leaks into the neutral layer
- [x] PLAN.md CORE-472 line flipped to stub form; tasknote archived to `.flowtron/tasknote/archive/core/`

## 🧩 Subtasks

- [ ] Add the `## Completed`-rotation advisory paragraph to `SPEC/procedures/ft-task.md` Step 1, next to the existing capture-fields prose, routing to `SPEC/tasknote-selection.md` §"`## Completed` rotation" rather than restating its full contract
- [ ] Bump `SPEC/procedures/ft-task.md`'s `last-verified:` stamp to `v5.19.0 · 2026-08-25`
- [ ] Doc-drift sweep + closure

## 🔗 Related

- [[CORE-467]] — added the `## Completed`-rotation advisory to `claude/skills/ft-task/SKILL.md` Step 1; this task mirrors it into the agent-neutral SOP
- [[CORE-471]] — release v5.19.0's `/ft-release` SOP-currency check surfaced this gap (flag-don't-bump) on 2026-08-24

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Narrow, well-scoped mirror-and-restamp task; the gap is confirmed live in both files and CORE-471's SOP-currency check already adjudicated it as the sole Tier-1 candidate (Tier-2 `restates:` skim found no material drift). No re-scope needed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read.** `SPEC/procedures/ft-task.md` (full, 356 lines), `SPEC/procedures/README.md` (frontmatter schema + the `last-verified:` flag-don't-bump contract), `SPEC/tasknote-selection.md` §"`## Completed` rotation" (lines 242-307, the canonical contract this task routes to), `claude/skills/ft-task/SKILL.md` Step 1 (the source of the advisory being mirrored — loaded as this skill's own dispatch), and the archived `.flowtron/tasknote/archive/core/CORE-467.md` (which wrote the original advisory) and `CORE-471.md` (which surfaced this gap via the release SOP-currency check).

**Best Practices Review.** Doc-only change to one markdown file (`SPEC/procedures/ft-task.md`). The touched responsibility is Step 1's PLAN-line-capture prose; the existing pattern for advisory mirrors is CORE-395's precedent below — route to the contract module rather than restate it, keeping the SOP a thin projection per `SPEC/procedures/README.md`'s "route, don't copy" posture ([[CORE-091]] / [[CORE-270]]). No refactor needed; this is a pure addition.

**Archive skim.** `grep -ln "SPEC/procedures/ft-task.md" archive/core/*.md` returned ~75 hits (the SOP is a common touch point). The load-bearing one is **[[CORE-395]]** (`sop-currency-recheck`, 2026-08-02) — the direct precedent for this exact task shape: it re-synced the SOP against accumulated `SKILL.md` drift and bumped `last-verified:` to match `SPEC.md`'s then-current version, citing `CORE-361`'s finding that the stamp is a SOP↔source currency marker, "not a release pin or dogfood row" — i.e. bumping it here (not at `/ft-release` time) is correct and is this task's job. **[[CORE-467]]** is the source-side change being mirrored. **[[CORE-471]]** is the release task whose flag-don't-bump SOP-currency check filed this task, confirming (in its own Implementation Notes) it found exactly one Tier-1 drift candidate and a clean Tier-2 skim — so this task's scope is confirmed narrow, not part of a larger drift backlog.

**Drift check.** Verified against the current tree, not recalled:
- `claude/skills/ft-task/SKILL.md` Step 1 **does** carry the "Completed-rotation check (advisory)" paragraph (150-row threshold, one-line `⚠️` warning, "Informational only — never block, never rotate" framing) — confirmed present via this skill's own loaded dispatch content.
- `SPEC/procedures/ft-task.md` Step 1 (lines 76-89) captures the PLAN-line fields (model tag, shortname, description, priority, critical flag) but has **no** rotation-advisory mention — the gap is real.
- `SPEC/procedures/ft-task.md:5` reads `last-verified: v5.17.0 · 2026-08-18`; `SPEC.md:3` reads `**Version:** v5.19.0` — confirming the stamp is stale independent of the content gap.
- The PLAN.md line's citation of CORE-467 and CORE-471 both check out against their archived tasknotes (read above). No contradiction with any SPEC contract — this task is itself an instance of the `SPEC/procedures/README.md` currency-check contract it is fulfilling.

**Clarifying questions.** No clarifications needed. Explicit assumptions: (1) mirror as a **routed** paraphrase (name the 150-row bound + one-line advisory shape, point to `SPEC/tasknote-selection.md` for the full contract) rather than reproducing the SPEC's exact warning text verbatim, consistent with the SOP's existing style of routing to `SPEC.md` sections rather than copying their prose; (2) bump `last-verified:` to `v5.19.0 · 2026-08-25` (current `SPEC.md` version + today), per the CORE-395/CORE-361 precedent that this stamp tracks SOP↔source sync and is bumped by the resync task itself, not by `/ft-release`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — **N/A**: no code changed, doc-only mirror + stamp bump

**Implementation Notes:**

**Pattern survey.** Followed the CORE-395 precedent exactly: a short paragraph routing to the SPEC contract module rather than restating it, placed inline in Step 1 right after the existing PLAN-line-capture prose (same location the source `claude/skills/ft-task/SKILL.md` Step 1 places its rotation check, relative to its own capture logic). No new heading, no new primitives-table row — the advisory is capture-adjacent prose, not a new operation, so it doesn't belong in the "Agent-neutral primitives" table.

**Minimal refactor gate.** No refactor. Two edits only: (1) one new paragraph in Step 1 of `SPEC/procedures/ft-task.md`, (2) the `last-verified:` frontmatter bump. Every touched line traces directly to Acceptance.

**Changes made:**
- `SPEC/procedures/ft-task.md` Step 1 — added a "`## Completed`-rotation advisory" paragraph after the PLAN-line capture prose, naming the 150-row advisory threshold and the one-line `⚠️`/informational-only shape, and routing to `SPEC/tasknote-selection.md` §"`## Completed` rotation" for the full contract (100-row bound, month-block granularity, never-split rules) rather than restating it — consistent with the SOP's routing posture elsewhere (e.g. Step 4's debug-mode routing to `step-4-debug-mode.md`).
- `SPEC/procedures/ft-task.md:5` — `last-verified:` bumped `v5.17.0 · 2026-08-18` → `v5.19.0 · 2026-08-25`, matching `SPEC.md`'s current `**Version:** v5.19.0`.

**Routes-don't-copy check.** No Claude-specific machinery introduced (no `AskUserQuestion`, no slash dispatch, no `--fast`/`--debug` syntax) — the new paragraph uses the same "surface a one-line advisory" prose already used elsewhere in this SOP for other advisories. Per-platform pointer wrappers (`codex/procedures/ft-task.md`, `grok/procedures/ft-task.md`, `cursor/procedures/ft-task.md`) were not touched — they point at this file rather than restating it, so no wrapper edit is needed for a content change inside the routed target.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — **N/A**: markdown-only doc edit, no test-bearing code touched; flowtron has no markdown-lint/link-check tooling in CI (confirmed via grep of `.github/workflows/` and `tools/`)

- [x] Ran lint/type-check on changed code — **N/A**: no lint/type-check surface for `.md` files in this repo

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — **N/A**: no frontend code changed

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
| Manual re-read of edited section (Step 1, `SPEC/procedures/ft-task.md:76-99`) | New paragraph reads cleanly in place; relative link `../tasknote-selection.md` resolves to `SPEC/tasknote-selection.md`, matching the file's existing link convention (e.g. line 35's `[SPEC/tasknote-selection.md](../tasknote-selection.md)`) |
| Frontmatter stamp | `last-verified: v5.19.0 · 2026-08-25` matches `SPEC.md:3`'s `**Version:** v5.19.0` |
| Wrapper check | `codex/`, `grok/`, `cursor/procedures/ft-task.md` — all still 8-line thin pointers, unaffected by a content change inside the routed target |
| Routes-don't-copy check | New paragraph names the threshold + shape only and routes to `SPEC/tasknote-selection.md` for the full contract; no Claude-specific machinery introduced |

**Quality assertions.** Single-file, two-edit markdown diff (~7 added lines + 1 changed line). No duplication — the new paragraph states the trigger condition and routes to the contract rather than restating the 100-row bound, month-block granularity, or never-split rules already spelled out in `SPEC/tasknote-selection.md`. No dead code, no complexity, no public-surface growth. Documentation is now current rather than stale.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep** — 16 AI-referenced docs walked; all **no change**:

| Doc | Verdict |
|---|---|
| `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md` | No change — already describe the rotation contract itself (via `SPEC/tasknote-selection.md`), not the SOP's mirror status |
| `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` | No change — point at `procedures/ft-task.md` generically, no content-level claim about what Step 1 restates |
| `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/WORKTREES.md` | No change — zero references to the SOP's Step 1 content or `last-verified:` stamp |
| `docs/AGENT-NEUTRALITY.md` | No change — its `SPEC/procedures/ft-task.md` ledger row names only the `autonomous mode`/`debug mode` primitives-table Claude-spelling sites (CORE-395); the new rotation-advisory paragraph introduces no new Claude-specific reference, so no new row is needed |
| `docs/PLATFORMS.md` | No change — describes the pointer-wrapper routing shape (`cursor/`, `grok/`, `codex/procedures/ft-task.md` → `SPEC/procedures/ft-task.md`), unaffected by a content change inside the routed target |
| `claude/CAPABILITIES.md` | No change — its `--debug` ledger row cites the SOP's primitives table, which this task didn't touch |
| `docs/AGENT-COMPAT.md` | No change — its per-platform `v5.19.0 · 2026-08-24 (dogfooded)` stamps track platform dogfood verification, a different currency dimension from the SOP's own `last-verified:` frontmatter stamp this task bumped |
| `docs/EXTERNAL-AGENTS.md` | No change — describes the handoff contract, not Step 1 content |

**Changed files:**
- `SPEC/procedures/ft-task.md` — +7 lines (new advisory paragraph in Step 1), 1 line changed (`last-verified:` stamp bump)

**Verification:** doc-only change; no test/lint tooling covers `.md` files in this repo (confirmed via grep of `.github/workflows/` and `tools/`). Verified by manual re-read + link-target check (see Testing Notes).

**Refactors:** none — pure addition, per the Minimal Refactor Gate in Implementation Notes.

**Documentation verdict:** this task *is* the documentation fix; no further doc-drift found (sweep above).

**Maintainability effect:** closes the one real drift candidate CORE-471's release-time SOP-currency check surfaced — a contract-only agent (Codex/Grok/Cursor) driving `/ft-task` now sees the same `## Completed`-rotation advisory a Claude Code session already surfaces, and the SOP's `last-verified:` stamp again reflects an actual resync rather than a 2-release-old checkpoint.

**Archived:** 2026-08-25
