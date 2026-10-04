---
title: procedures-headroom
status: completed
tags: [context-budget]
created: 2026-10-02
due:
related-tasks: [CORE-EPIC-678, CORE-670.3, CORE-677.3, CORE-675]
touches:
  - SPEC/procedures/ft-task.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-678.2 | procedures-headroom

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-678]]

## 🎯 Goal

Bring `SPEC/procedures/ft-task.md` to at most 36,200 bytes by routing restatement back to the modules that own it, and refresh that file's figure in `docs/CONTEXT-BUDGET.md`. Cap stays 38,000.

## ✅ Acceptance

- [x] A1 `SPEC/procedures/ft-task.md` is at most 36,200 bytes — `test $(wc -c < SPEC/procedures/ft-task.md) -le 36200`
- [x] A2 Cap stays 38,000 — `grep -q '^| \`SPEC/procedures/ft-task.md\` | 38,000 |' docs/CONTEXT-BUDGET.md`
- [x] A3 Step 6 still loads `SPEC/post-closure.md` here and nowhere earlier, and still names the unattended queued-prompt park — `grep -q 'post-closure.md' SPEC/procedures/ft-task.md && grep -q 'nowhere earlier' SPEC/procedures/ft-task.md && grep -q 'park-reason: input-needed' SPEC/procedures/ft-task.md`
- [x] A4 Cross-repo work still routes to `SPEC/scope-boundaries.md` — `grep -q 'scope-boundaries.md' SPEC/procedures/ft-task.md`
- [x] A5 [[CORE-670.3]] and [[CORE-677.3]] load pointers survive — `grep -q 'step-4-debug-mode.md' SPEC/procedures/ft-task.md && grep -q 'step-5-loop-mode.md' SPEC/procedures/ft-task.md && grep -q 'step-0-flags.md' SPEC/procedures/ft-task.md && grep -q 're-verify' SPEC/procedures/ft-task.md`
- [x] A6 The lazy-module figure for this file equals `wc -c`, and Cap history names this task — `grep -q 'CORE-678.2' docs/CONTEXT-BUDGET.md`
- [x] A7 No contract meaning lost — `judgment`: cuts are restatements whose canonical copy stays in `SPEC/post-closure.md`, `SPEC.md` §"Cross-repo edit remit", or `SPEC/scope-boundaries.md`; mode deltas a skimming agent must not miss stay in the SOP

## 🧩 Subtasks

- [x] Route Step 6's copied post-closure shapes back to `SPEC/post-closure.md`, keeping the mode deltas
- [x] Route the cross-repo paragraph back to `SPEC.md` and `SPEC/scope-boundaries.md`
- [x] Measure; stop at ≤ 36,200 without further cuts
- [x] Refresh the ledger figure and append Cap history
- [x] Run A1–A6

## 🔗 Related

- [[CORE-EPIC-678]] — parent; discovery supplied by audit-repo 2026-10-02
- [[CORE-670.3]] — prior extract of this file (36,238 → 34,115); debug-mode body stays in `step-4-debug-mode.md`
- [[CORE-677.3]] — the +3,193 since v5.33.0; parity pointers, not trim targets
- [[CORE-675]] — Learnings sentence in Phase 4; keep it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** HEAD is 37,538 bytes, matching the parent epic's figure, 462 under the 38,000 cap. The row asks for ≤ 36,200 by extract or trim, cap held.

- [x] Read relevant source files — `SPEC/procedures/ft-task.md` (whole), `docs/CONTEXT-BUDGET.md` budgets/ledger/enforcement, `SPEC/post-closure.md`, `SPEC.md` §"Cross-repo edit remit" and §"Post-closure protocol", `SPEC/gates.md` §"Conditional skip rule", `SPEC/scope-boundaries.md` heading, CORE-670.3 / CORE-671 closure notes, the CORE-677.3 diff.

- [x] **Best Practices Review** — N/A for code. For this prose, the established pattern is CORE-670.3: route a restated body to the fragment that already owns it, and keep the one rule a skimming agent must not miss. CORE-671's within-file trim is the fallback if a route cannot land the byte target.

- [x] **Archive skim** — `archive/core/` matches the README table. Load-bearing hits, not the full path-grep: CORE-670.3 (debug restatement routed out; ledger left this file at 34,115), CORE-671 (cap-history records a trim; ledger figures stay release-owned unless a row says otherwise — this row does), CORE-677.3 (parity growth to 37,538), CORE-675 (Phase 4 Learnings line). No ⚠️ superseded pointer on those notes changes the target.

- [x] **Drift check** — `wc -c` is 37,538. The ledger still says 34,115, which is the figure to refresh after the trim, not a reason to retarget. Cap row is still 38,000. CI's context-budget step reads only the Budgets table, so a ledger refresh does not change the gate. No `## 🌳 Fan-out` names this child. `## Completed` holds 45 checked rows, under the 60-row advisory. The long description is 23 words.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

No clarifications needed. Assumptions: (1) trim by routing, not by reversing CORE-677.3's flag, model-edge, starter, resume, and phase deltas; (2) Step 6 is the largest pure restatement — `SPEC/post-closure.md` already carries the three steps, the marker, the PLAN re-read, the exhausted-PLAN form, and the copy-paste shape; (3) the cross-repo paragraph restates `SPEC.md` §"Cross-repo edit remit", which already points at `scope-boundaries.md`; (4) the parking paragraph stays — it is the unattended floor CORE-670.3 declined to extract; (5) refresh only this file's lazy-module figure, and say the sibling figures remain the 2026-09-23 stamp, so the list is not a false same-moment sum; (6) `[medium]` matches this session (Grok 4.7 bands medium at its default effort).

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern is CORE-670.3's route-don't-copy. Two cuts, then stop: Step 6 now points at `SPEC/post-closure.md` and keeps the autonomous-skip, unattended queued-prompt park, and paper-complete / same-turn deltas; the cross-repo paragraph now points at `SPEC.md` and `SPEC/scope-boundaries.md` and still says CORE-483.3 is not a precedent. Parking paragraph, Step 0, and the CORE-677.3 fragment loads were not trimmed. Measured 37,538 → 34,302 (headroom 3,698 under 38,000). No further cuts. `docs/CONTEXT-BUDGET.md` cap held; Cap history records the route; the lazy-module figure is 34,302 with an explicit note that sibling figures stay the 2026-09-23 stamp. Tests N/A — prose only; the verify commands are the checks.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Test suite and lint/type-check: N/A — markdown contract prose only; no viz or tools code changed. Structural half: the cuts remove a second copy of post-closure and cross-repo prose; no new public surface. The CI context-budget script from `.github/workflows/ci.yml` was run by hand → exit 0. Credential-shaped keyword scan on added lines → no hits.

- A1 `test $(wc -c < SPEC/procedures/ft-task.md) -le 36200` → 0 (34,302)
- A2 `grep -q '^| \`SPEC/procedures/ft-task.md\` | 38,000 |' docs/CONTEXT-BUDGET.md` → 0
- A3 post-closure load + `nowhere earlier` + `park-reason: input-needed` → 0
- A4 `grep -q 'scope-boundaries.md' SPEC/procedures/ft-task.md` → 0
- A5 debug, loop, flags, and `re-verify` pointers → 0
- A6 `grep -q 'CORE-678.2' docs/CONTEXT-BUDGET.md` → 0; ledger figure 34,302 equals `wc -c`
- A7 judgment — external review pass; see dispositions below

External review (read-only probe, deliverable diff only): pass. No blockers.

- Note: "Discovery — or later execution" is not repeated in `SPEC.md` or `scope-boundaries.md`, which still say "When Discovery surfaces". Disposition: left as written. The replacement forbids editing another repo "from this cycle", which is not phase-limited, and both modules already forbid editing "from this task cycle".
- Note: the skip-path "in one response" sequence is not restated in Step 6. Disposition: left as written. Step 6 still branches to `SPEC/gates.md` §"Conditional skip rule", whose "On skip" paragraph carries that sequence, and `SPEC/post-closure.md` defers on-skip routing there.

Frontend visual confirmation: N/A — no UI.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep:** no change — `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. `docs/CONTEXT-BUDGET.md` is off that list by design; this task updated its ledger figure and cap history directly. `SPEC/*.md` is outside the sweep set.

**Final Summary:**

Routed two restatements out of the agent-neutral task procedure: Step 6 now follows `SPEC/post-closure.md` instead of copying it, and the cross-repo paragraph now follows `SPEC.md` and `SPEC/scope-boundaries.md`. `SPEC/procedures/ft-task.md` went from 37,538 to 34,302 bytes (headroom 3,698 under the unchanged 38,000 cap). `docs/CONTEXT-BUDGET.md` records 34,302 for this file only and names CORE-678.2 in cap history. Deliverable diff: 2 files, +30/−75. Verification: A1–A6 exit 0; hand-run context-budget script exit 0; external review pass, two notes left in place because the cited modules still carry the rules. No refactor beyond the route. `touches:` reconciliation: declared `SPEC/procedures/ft-task.md` and `docs/CONTEXT-BUDGET.md`; closure also rewrites this tasknote and its PLAN row, which the recap excludes. Maintainability: a contract-only agent still has the mode deltas in the SOP and one body for the post-closure shapes, so the two copies cannot drift.

**Learnings:** N/A

**Archived:** 2026-10-02
