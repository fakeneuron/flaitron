---
title: procedures-ft-task-extract
status: completed
tags: [context-budget, procedures, debug-mode]
created: 2026-09-22
due:
related-tasks: [CORE-EPIC-670, CORE-631.3, CORE-395, CORE-608]
touches:
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/step-4-debug-mode.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-670.3 | procedures-ft-task-extract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-670]]

## 🎯 Goal

Bring `SPEC/procedures/ft-task.md` back under 90% of its 38,000 cap (≥10% headroom, the epic's target) by routing its inline debug-mode restatement to the existing `claude/skills/ft-task/step-4-debug-mode.md` fragment, loaded on demand.

## ✅ Acceptance

- [x] A1 `SPEC/procedures/ft-task.md` ≤ 34,200 chars (≥10% headroom; ≥1.5 units at the +892 high end) — `test $(wc -c < SPEC/procedures/ft-task.md) -le 34200`
- [x] A2 Debug mode remains reachable from the SOP: the primitives row names it and an explicit load instruction points at the fragment — `grep -c 'step-4-debug-mode.md' SPEC/procedures/ft-task.md` ≥ 1 and `grep -q '| \*\*debug mode\*\* |' SPEC/procedures/ft-task.md`
- [x] A3 The inline four-prompt restatement is gone (no duplicate) — `! grep -q 'Expected vs observed' SPEC/procedures/ft-task.md`
- [x] A4 The Phase 3 repro re-verify stays named as non-suppressible under autonomous mode in the SOP (the one debug rule a skimming agent must not miss) — `grep -q 're-verify' SPEC/procedures/ft-task.md`
- [x] A5 The fragment's header names the SOP as a second loader; the AGENT-NEUTRALITY row reflects load-not-cite — `grep -q 'SPEC/procedures/ft-task.md' claude/skills/ft-task/step-4-debug-mode.md` and `judgment` for the ledger prose
- [x] A6 CONTEXT-BUDGET cap-history row records the extraction; CI Context-budget step green — `grep -q 'CORE-670.3' docs/CONTEXT-BUDGET.md` + the `ci.yml` "Context budget" `run:` block under `bash -e`

## 🧩 Subtasks

- [x] S1 Primitives row: fold the "When to run" debug paragraph into the `debug mode` row, add the load instruction ("read `step-4-debug-mode.md` when requested; it carries Phases 1–4")
- [x] S2 Step 4: replace the four-prompt block with a two-sentence pointer (inside checklist, no box/gate, exit-gate unchanged)
- [x] S3 Step 5: drop the Phase 2 and Phase 4 debug clauses; shrink Phase 3 to the re-verify-survives-autonomous-mode sentence + pointer
- [x] S4 Fragment header: name the SOP as the agent-neutral loader and the vocabulary mapping
- [x] S5 `docs/AGENT-NEUTRALITY.md` row: pointer is now a load path, not only a derivation anchor
- [x] S6 `docs/CONTEXT-BUDGET.md` cap-history row: "held 38,000 [[CORE-670.3]] (debug mode → `step-4-debug-mode.md`)"
- [x] S7 Measure; run CI drift steps locally

## 🔗 Related

- [[CORE-EPIC-670]] — parent epic (context-headroom); Discovery supplied by audit-repo 2026-09-22, no `.1` sibling
- [[CORE-631.3]] — measured this file's working unit (+524 to +892) and set the trip condition
- [[CORE-395]] — added the debug-mode restatement to the SOP (compact restatement + fragment pointer)
- [[CORE-608]] — budgeted the file at 38,000

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** File measures 36,238/38,000 (headroom 1,762 ≈ 2.0 units at +892, but 4.6% — below the epic's ≥10% target). Debug mode is the one mode whose full text already lives in a lazy fragment the SOP calls canonical, so its ~2.4k inline restatement is pure duplication.

- [x] Read relevant source files

- [x] **Best Practices Review** — responsibility: the SOP routes, the fragment carries mode content (CORE-395's own framing: "routes rather than copies"). Removing the restatement makes the fragment the single body, so SOP-vs-fragment drift can no longer happen. Dependency direction unchanged (the SOP already names the fragment). No refactor beyond the move.

- [x] **Archive skim** — 141 core notes name the file; read the load-bearing ones. CORE-395 added debug mode to the SOP after CORE-390 left it absent — requirement was *representation* (primitive row + Phase 1/3 obligations) and "routes rather than copies"; a row + load pointer + re-verify sentence keeps that. CORE-631.3 measured the unit (+524 to +892) and named the trip condition (a new mode at CORE-473.4's scale); it declined to trim because it found "no ~1,400-byte block of duplication" — the debug restatement duplicates the fragment, but that was out of CORE-631.3's frame. CORE-608 set the 38,000 cap. CORE-556.2 rule: edit CONTEXT-BUDGET in-task only for cap history/cap changes; leave the §Ledger to `/ft-release`.

- [x] **Drift check** — PLAN figure 36,238 matches `wc -c`. Epic line says "≥10% headroom" while the child says "≥1.5 working units"; the current file already satisfies the latter (1,762 ≥ 1.5×892 = 1,338), so the binding target is the epic's ≤34,200. No SPEC contract changes — debug-mode semantics are untouched, only where the SOP reads them.

- [x] Asked clarifying questions — operator picked **point to the existing fragment** over a new neutral fragment (would duplicate) or extracting unattended mode (scattered, safety-relevant). Assumption: target ≤34,200.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Debug text in the SOP: "When to run" para (273) · primitives row (358) · Step 4 block (1,461) · Phase 2 clause (333) · Phase 3 clause (408) · Phase 4 clause (250).
- Neutrality: the fragment speaks Claude vocabulary (`--fast`, `fast-mode = true`, `AskUserQuestion`). The primitives table already maps each to a neutral primitive; the SOP pointer will say so in one clause. `docs/AGENT-NEUTRALITY.md` row registers the pointer as a "derivation anchor" — update to "load path".
- Not touched: `claude/skills/ft-task/SKILL.md`, `step-0-flags.md` (Claude path unchanged); `docs/PLATFORMS.md` §456 already describes debug as "SOP names the primitive, canonical body carries the fragment" — becomes more accurate, no edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, docs-only; CI drift steps are the test surface

**Implementation Notes:**

- Pattern: the SOP's own "route, don't restate" shape (CORE-395) and the Claude SKILL's lazy-fragment dispatch (`step-0-flags.md` → "Read `step-4-debug-mode.md` now"). No new file: the fragment already carried Phases 1–4 of debug mode in full, so the SOP's copy was pure duplication.
- `SPEC/procedures/ft-task.md` 36,238 → 34,115 (−2,123; headroom 3,885 = 10.2%, ≈4.4 units at +892). Cuts: "When to run" debug paragraph (folded into the primitives row), Step 4 four-prompt block → 3-line pointer, Phase 2 and Phase 4 debug clauses dropped, Phase 3 clause shrunk to the re-verify-survives-autonomous-mode sentence, composition paragraph compressed. The primitives row gains the load instruction + vocabulary mapping (`--fast`/`fast-mode` → autonomous mode, `AskUserQuestion` → structured ask).
- `step-4-debug-mode.md` header names the SOP as its second loader. `docs/AGENT-NEUTRALITY.md` row: pointer re-registered as a load path. `docs/CONTEXT-BUDGET.md` cap history: "held 38,000 [[CORE-670.3]]". §Ledger left to `/ft-release` (CORE-556.2 rule).
- Refactor gate: the only refactor is the duplication removal Acceptance requires.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — all 15 `drift` job `run:` blocks from `ci.yml` under `bash -e`

- [x] Ran lint/type-check on changed code — N/A, markdown only (Final newline step green)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A, no rendered surface — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 `test $(wc -c < SPEC/procedures/ft-task.md) -le 34200` → 0 (34,115)
- A2 `grep -c 'step-4-debug-mode.md' SPEC/procedures/ft-task.md` → 1; `grep -q '| \*\*debug mode\*\* |'` → 0
- A3 `! grep -q 'Expected vs observed' SPEC/procedures/ft-task.md` → 0
- A4 `grep -q 're-verify' SPEC/procedures/ft-task.md` → 0
- A5 `grep -q 'SPEC/procedures/ft-task.md' claude/skills/ft-task/step-4-debug-mode.md` → 0; ledger prose judgment: reads as a load path with the vocabulary mapping named
- A6 `grep -q 'CORE-670.3' docs/CONTEXT-BUDGET.md` → 0; CI drift job (Wrapper-name, Skill parity, Context budget, Final newline, Pairs A/B/C/H/J/M/N/O/P/Q/R) → 15× exit 0
- Structural: no dead pointers (every removed clause's content lives in the fragment); no public-surface growth.
- External review (`code-review` low, scoped to `git diff HEAD`): no findings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/AGENT-NEUTRALITY.md` updated (row re-registers the pointer as a load path); `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `claude/CAPABILITIES.md` (Claude path unchanged), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` no change; `docs/PLATFORMS.md` §"Non-Claude capability triggers" debug row no change (already says the canonical body carries the fragment — now literally true); npm commands N/A — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A; the lazy-fragment remedy is already the ledger's stated preference — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Routed the agent-neutral SOP's inline debug-mode restatement to the fragment that already carried the whole mode, taking `SPEC/procedures/ft-task.md` from 36,238 to 34,115 chars (10.2% headroom under the 38,000 cap; ≈4.4 of CORE-631.3's +892 units). A contract-only agent now loads `step-4-debug-mode.md` on request, the same way the Claude wiring does, so the two paths share one body and cannot drift. 4 files, +15/−52. `touches:` reconciliation: `git diff --name-only` = the four declared paths; no undeclared paths.

**Archived:** 2026-09-22
