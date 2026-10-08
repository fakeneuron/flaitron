---
title: audit-sibling-runtime-guard
status: completed
tags: [unattended, epic, audit]
created: 2026-10-08
due:
related-tasks: [CORE-736]
touches:
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/gate-postures.md
  - docs/EXTERNAL-AGENTS.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - SPEC/unattended-candidacy.md
  - docs/CONTEXT-BUDGET.md
  - claude/skills/ft-task/preamble.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
---

# CORE-738 | audit-sibling-runtime-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-736]]

## 🎯 Goal

An operator-less run of an epic's `.N` audit refuses, writing no tasknote, while any sibling of that audit row is still open — whichever runner the caller dispatches it through.

## ✅ Acceptance

- [x] The runners' `--unattended` pre-scaffold stops refuse a `.N` audit with any open sibling, writing nothing, in the existing stop shape with cause `open-siblings` — `grep -q 'Open-siblings audit' claude/skills/ft-task/unattended-mode.md && grep -q 'open-siblings:' claude/skills/ft-task/unattended-mode.md`
- [x] The SPEC contract carries the same stop — `grep -q 'Open-siblings audit' SPEC/gate-postures.md`
- [x] The "Refused" ending in the external-agent doc names it — `grep -q 'an audit with an open sibling' docs/EXTERNAL-AGENTS.md`
- [x] `/ft-refactor` and `/ft-epic-discovery` say where cascaded rows are named — `tr '\n' ' ' < claude/skills/ft-refactor/SKILL.md | grep -q 'name those in the Step 6 hand-off' && grep -q 'rows proposed, confirmed, and cascaded' claude/skills/ft-epic-discovery/SKILL.md`
- [x] The `unattended-candidates:` contract says a listed dependent is a candidate only with the predecessors it leaned on — `grep -q 'carries no dependency edges' SPEC/unattended-candidacy.md`
- [x] Every runner reaches the stop from its pre-flight — the Claude runners' every-run list and the agent-neutral procedure — `grep -q 'Open-siblings audit (' claude/skills/ft-task/preamble.md && grep -q 'open-siblings' SPEC/procedures/ft-task.md`
- [x] Drift checks (Pair N, context budget) pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the `open-siblings` bullet to `unattended-mode.md` §"Pre-scaffold stops" (executable: when it runs, how siblings are read, the stop line)
- [x] Add the matching contract bullet to `SPEC/gate-postures.md` §"Pre-scaffold stops"
- [x] Add the case to `docs/EXTERNAL-AGENTS.md` "Refused" list
- [x] Name the cascade-report location in `ft-refactor` Step 4 and `ft-epic-discovery` Step 7
- [x] Add the no-dependency-edges sentence to `SPEC/unattended-candidacy.md` §"Three postures" (`--fast`)
- [x] (review rounds 1, 4) Hook the stop from `preamble.md` §"Pre-flight", after the archive-collision check; name it in both runners' Pre-flight rosters
- [x] (review rounds 2–3) Add the stop to `SPEC/procedures/ft-task.md` Step 2 entry checks, ahead of the model check
- [x] Update `docs/CONTEXT-BUDGET.md` ledger for `ft-epic-discovery` bytes; run drift checks

## 🔗 Related

- [[CORE-736]] — predecessor: admission-time `.N` gate in `SPEC/unattended-candidacy.md` clause 6; its review rounds filed this follow-up

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The guard the PLAN line asked for already exists: `/ft-close-epic --unattended` Step 2 walks PLAN.md at run time and ends with `⏸ --unattended stop — open-siblings`, writing nothing (`unattended-close-epic.md` §"Steps 1-2"). That covers all three gaps CORE-736's review named, because the check reads live state, not admission-time state. The unguarded route is `/ft-task <ID>.N --unattended`, which `SPEC/epic.md` step 4 allows and which caobunga uses for every marked row (`caobunga/prompt.py:165`); JD-041.N "parked on drift" is a `/ft-task` outcome, not a `/ft-close-epic` one. caobunga's CBN-309 (`3cf63e7`) now denies a marked `.N` with open siblings on the caller side, but other callers have no flaitron-side guard. Re-scoped (operator-confirmed) to put the stop in the runners' shared `--unattended` fragment. PLAN line rewritten.

- [x] Read relevant source files — `claude/skills/ft-close-epic/SKILL.md` + `unattended-close-epic.md`, `claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops", `preamble.md` §"Pre-flight", `SPEC/gate-postures.md` §"Pre-scaffold stops", `SPEC/epic.md` step 4, `SPEC/unattended-candidacy.md` clause 6 + §"Three postures", `ft-refactor` Step 4, `ft-epic-discovery` Step 7, `ft-seed` Step 3, `docs/EXTERNAL-AGENTS.md` §"The Return"; caobunga `selection.py` CBN-309 docstring (sibling repo, read-only).

- [x] **Best Practices Review** — N/A: contract prose, no code. The stop's body goes in the lazy `--unattended` fragment (loaded only under the flag). Round-1 review showed that a lazy-only rule is never reached from the Pre-flight list the runners step through, so `preamble.md` carries a one-line hook (7,984 → 8,164 / 9,000) and `SPEC/procedures/ft-task.md` a short paragraph for the non-Claude runners.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*`). CORE-730 is the precedent: it added its skill/pin stop as a bullet to both `unattended-mode.md` and `SPEC/gate-postures.md` §"Pre-scaffold stops", and it records that stop causes are an open kebab-case vocabulary, so `SPEC/blocked.md` needs no change. CORE-552 named `open-siblings` as a cause slug. CORE-736 is the predecessor (admission gate + cascade).

- [x] **Drift check** — The PLAN line's premise was wrong (above), which is what drove the Re-scope. `gate-postures.md` 21,088 / 22,000 leaves room for one bullet. `ft-epic-discovery` 32,296 / 33,000 leaves room for a one-clause add. `docs/EXTERNAL-AGENTS.md`'s `unattended-candidates:` stable-surface row fixes the line as bare IDs, so the dependency fix must be prose, not a grammar change.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked via AskUserQuestion (despite the `[unattended]`-implied `--fast`, because the PLAN line's premise was wrong). Answers: (1) put the stop in `/ft-task` via the shared `unattended-mode.md`, not refuse every `.N` and not de-scope; (2) keep both review notes in scope. Assumptions: the stop covers the reserved `.N` suffix only. A runner cannot tell a legacy numeric audit from the last implementation child, and clause 6 already gates that child on its predecessor (same limit as caobunga CBN-309). "Sibling" means every other child of the parent, `.1` included. The stop is unattended-only, because attended `/ft-task` on an early `.N` is an operator's choice.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the boxes above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-730's shape: one bullet in each of `unattended-mode.md` and `SPEC/gate-postures.md` §"Pre-scaffold stops", reusing the existing `⏸ --unattended stop — <cause>` line and `/ft-close-epic`'s `open-siblings` cause slug. The cascade clauses copy `/ft-seed`'s "name those in the Step 5 report" wording.

- [x] **Minimal refactor gate** — no refactor; prose additions only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose; Acceptance greps + drift checks cover it

**Implementation Notes:**

- `claude/skills/ft-task/unattended-mode.md` §"Pre-scaffold stops": new **Open-siblings audit** bullet. It runs in Pre-flight after the epic-ID dispatch, walks the parent's nested children, and on any open non-`.N` child stops with `⏸ --unattended stop — open-siblings: <IDs>. No tasknote written.`. Legacy numeric audits are explicitly out. Hooked from `preamble.md` §"Pre-flight" (both Claude runners) and `SPEC/procedures/ft-task.md` Step 2's entry checks, ahead of the model check (Codex/Cursor/Grok); `no-parent` / `parent-closed` stops when the parent is missing or closed.
- `SPEC/gate-postures.md` §"Pre-scaffold stops": matching contract bullet (21,088 → 21,482 / 22,000).
- `docs/EXTERNAL-AGENTS.md` §"The Return" → Refused: names the new case.
- `claude/skills/ft-refactor/SKILL.md` Step 4: cascaded rows are named in the Step 6 hand-off. `claude/skills/ft-epic-discovery/SKILL.md` Step 7 Capture list: "rows proposed, confirmed, and cascaded" (32,296 → 32,302 / 33,000 after round 1 folded the clause into the Capture list).
- `SPEC/unattended-candidacy.md` §"Three postures" (`--fast`): the line carries no dependency edges, so a listed `.k` / `.N` is a candidate only together with the siblings clause 6 named, and marking a subset re-runs clause 6. Prose only, because the line's bare-ID grammar is a stable surface (`docs/EXTERNAL-AGENTS.md`).
- `docs/CONTEXT-BUDGET.md`: `claude/skills/*/SKILL.md` row + ledger updated for 32,302; ledger rows for `preamble.md` 8,164, `gate-postures.md` 21,482, `SPEC/procedures/ft-task.md` 33,800.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (no code tests apply to SPEC/skill prose)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `final_newline` + drift checks pass

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — four `/code-review medium` rounds; dispositions in Testing Notes; — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Review round 1 (9 findings): **blocker** — the stop lived only in the lazy fragment, so neither runner reached it from the Pre-flight list they step through → hooked from `preamble.md` §"Pre-flight" (this also fixed the `/ft-micro-task` finding). Notes fixed: "unlike that bail" misstated `/ft-close-epic`'s run-time read; the candidacy sentence ignored rows admitted on a `- [x]` predecessor; missing/closed parent unhandled → `no-parent` / `parent-closed`; PLAN line trimmed (54w); ft-epic-discovery cascade folded into the existing Capture list. No change: `SPEC/epic.md` step 4 already states the "once all implementation children are closed" precondition the stop enforces; terminate causes are an open vocabulary (CORE-730), so `SPEC/blocked.md` is untouched.

Round 2 (10 findings): **blocker** — `SPEC/procedures/ft-task.md` (Codex/Cursor/Grok) had no hook → added. Notes fixed: stale tasknote rationale and numbers, `touches:` gaps, the backtick-in-code-span verify command, SPEC bullet now names the causes, duplicated placement prose dropped from the fragment. No change: audit-position parity (`.N` is the reserved audit suffix by definition; a wrong parent hits `no-parent`); ft-epic-discovery headroom went down, not up.

Round 3 (10 findings): **blocker** — in the procedure the stop ran after the model check, so an unattended concrete mismatch scaffolded a park first → moved into Step 2's entry checks. Notes fixed: literal `.N` named and legacy numeric audits explicitly unguarded at run time; a `- [x]` parent counts as closed; ordering pinned; ledger rows for `gate-postures.md` and the procedure; subtasks for the review-round hooks. Accepted: the bare-ID candidates line cannot show which sibling a dependent leaned on (stable grammar); the runtime stop is the backstop.

Round 4 (6 findings, no blocker): fixed — procedure Step 3 sentence split so the "note already exists" clause no longer covers the new stop, and it says unattended-only; archive collision now runs before the sibling walk (`preamble.md` hook moved after it; procedure order matched); both runners' Pre-flight rosters name the hook; the walk matches every `<AREA>-<N>.<sub>` row anywhere in PLAN.md, not only nested ones. Recorded, not fixed: the procedure gives no literal stop-line shape (it already requires a machine-readable report). Review loop stopped: round 4 surfaced no blocker.

Final receipt — all seven Acceptance verify commands → 0; `bash tools/drift-checks.sh` → 0 (context_budget ok: preamble 8,164 / 9,000, procedure 33,800 / 34,200, gate-postures 21,482 / 22,000, ft-epic-discovery 32,302 / 33,000).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README, AGENTS.md, SPEC.md, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, WORKTREES, VISION: no change (none mentions pre-scaffold stops or the candidates line); EXTERNAL-AGENTS: updated (Refused list) — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer; — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

An epic's `.N` audit run with `--unattended` now refuses, writing nothing, while any other `<AREA>-<N>.<sub>` row is open, or when its parent is missing or closed. This holds on every runner, not only `/ft-close-epic`, which already had the check. The stop lives once in `unattended-mode.md` §"Pre-scaffold stops", with its contract in `SPEC/gate-postures.md`. It is hooked from the shared `preamble.md` Pre-flight (`/ft-task`, `/ft-micro-task`) and from the agent-neutral procedure's entry checks (Codex/Cursor/Grok). The two CORE-736 review leftovers also landed: cascade reporting has a named place in `/ft-refactor` (Step 6 hand-off) and `/ft-epic-discovery` (Capture list), and the candidacy module says the bare-ID `unattended-candidates:` line carries no dependency edges.

- Re-scoped from the PLAN line: `/ft-close-epic --unattended` already refused at run time (Step 2 `open-siblings`). The unguarded route was `/ft-task <ID>.N --unattended`, which caobunga dispatches (its CBN-309 now also guards the caller side).
- Changed: `claude/skills/ft-task/unattended-mode.md`, `claude/skills/ft-task/preamble.md`, `claude/skills/ft-task/SKILL.md`, `claude/skills/ft-micro-task/SKILL.md`, `SPEC/gate-postures.md`, `SPEC/procedures/ft-task.md`, `SPEC/unattended-candidacy.md`, `claude/skills/ft-refactor/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `docs/EXTERNAL-AGENTS.md`, `docs/CONTEXT-BUDGET.md`.
- Verification: seven Acceptance greps → 0; `bash tools/drift-checks.sh` → 0.
- `touches:` reconciliation: 11 declared = 11 deliverable paths in `git diff --name-only` (preamble, procedure, and both runner SKILL bodies added during review rounds, declared before closure), plus PLAN.md / tasknote workflow paths.
- Known limit: a legacy numeric audit is not guarded at run time, because a runner cannot tell it from the last implementation child.
- Maintainability: budgets tightened — procedure has ~400 bytes left, gate-postures ~500, ft-epic-discovery ~700; the next substantial edit to any of them should extract or trim.

**Archived:** 2026-10-08
