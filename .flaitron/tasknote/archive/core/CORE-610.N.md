---
title: archive-closure-integrity audit
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-610, CORE-610.2, CORE-610.3, CORE-610.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-610.N | archive-closure-integrity audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-610]]

## 🎯 Goal

Verify that the three CORE-EPIC-610 children (Pair P archive integrity check, the executable pre-move tick-through gate, the `**Archived:**` stamp-fill gate) sit well together across every closure surface, and run the epic-level doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs".

## ✅ Acceptance

- [x] All three children verified in place: Pair P block + CI step + Pair L row present, and both Pair P and Pair L print nothing on HEAD — `grep -q '^[*][*]Pair P ' claude/skills/ft-release/step-7.1-mirror-pairs.md && grep -q 'name: Pair P' .github/workflows/ci.yml && grep -q "'Pair P|" claude/skills/ft-release/step-7.1-mirror-pairs.md` + Pair P fence run → exit 0, no output + Pair L fence run → exit 0, no output
- [x] The three closure surfaces gated by CORE-610.3 / CORE-610.4 still carry the gate — `grep -q "Executable pre-move gate" claude/skills/ft-task/SKILL.md && grep -q "Verify, then move" claude/skills/ft-micro-task/SKILL.md && grep -A1 '\*\*Verify' SPEC/procedures/ft-task.md | grep -q 'before moving' && grep -q "line set to today's date" claude/skills/ft-task/SKILL.md`
- [x] `/ft-close-epic` Step 7 (the fourth closure surface, missed by the epic) sets `**Archived:**` before its `git mv` and states the same three-check pre-move gate, unsuppressed by `--unattended` — `grep -q "Verify, then move" claude/skills/ft-close-epic/SKILL.md && grep -q "not\[ -\]met" claude/skills/ft-close-epic/SKILL.md`
- [x] Stale stamp-gap attribution in the Pair P block (`CORE-610.3` → `CORE-610.4`) corrected — `! grep -q "CORE-610.3's pre-archive gate" claude/skills/ft-release/step-7.1-mirror-pairs.md`
- [x] Edited skill files stay under their `docs/CONTEXT-BUDGET.md` caps (`ft-close-epic/SKILL.md` ≤ 33,000; `step-7.1-mirror-pairs.md` is unbudgeted) — `wc -c claude/skills/ft-close-epic/SKILL.md`
- [x] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" recorded per entry in Final Summary — `judgment`: prose sweep, no command decides it

## 🧩 Subtasks

- [x] Inventory the three children's archived notes + Final Summaries; read the live surfaces each touched (Pair P block, CI step, Pair L row, the three pre-move gates, `docs/CONVENTIONS.md` §floor)
- [x] Run Pair P and Pair L on HEAD; confirm the CONVENTIONS `drift` roster names Pair P
- [x] Enumerate every archive-move surface (`grep -rl 'archive/<area>/<TASK-ID>'`) and check each carries the gate → `/ft-close-epic` Step 7 does not
- [x] Fix `/ft-close-epic` Step 7: stamp `**Archived:**` before the move; add a "Verify, then move" pre-move gate in the `/ft-micro-task` register; confirm `unattended-close-epic.md` §Step 7 still reads true
- [x] Fix the Pair P bullet's stale `CORE-610.3` stamp-gap attribution → `CORE-610.4`
- [x] Doc-drift sweep across the seventeen AI-referenced docs
- [x] Run Acceptance verify commands, byte-count `ft-close-epic/SKILL.md`, record the receipt

## 🔗 Related

- [[CORE-EPIC-610]] — parent epic (archive-closure-integrity)
- [[CORE-610.2]] — predecessor: `/ft-release` §7.1 Pair P + CI `drift` step (post-hoc archive integrity check, 2026-09-20 floor)
- [[CORE-610.3]] — predecessor: executable pre-move gate on `/ft-task`, `/ft-micro-task`, `SPEC/procedures/ft-task.md`
- [[CORE-610.4]] — predecessor: `**Archived:**` stamp-fill instruction + third pre-move grep

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three implementation children are closed (`[x]` in PLAN.md, archived under `archive/core/`), so the epic is at its audit step. The audit's fixed deliverable (verify integration + doc-drift sweep) stands; Discovery adds one inline fix (a fourth closure surface without the gate) and one stale attribution, both operator-confirmed below.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Children inventory.** CORE-610.2 (Pair P block in `claude/skills/ft-release/step-7.1-mirror-pairs.md`, lifted CI `drift` step, Pair L row, `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor"); CORE-610.3 (executable pre-move gate on `/ft-task` Phase 4, `/ft-micro-task` Step 4 item 4, `SPEC/procedures/ft-task.md` Step 5); CORE-610.4 (stamp-fill instruction + third grep on the `/ft-task` and procedures surfaces; CONVENTIONS attribution fix). No `.1` Discovery child — Discovery was supplied by audit-repo 2026-09-19, so there is no `## 🌳 Fan-out` to echo.
- **Live-surface verification.** Pair P fence run on HEAD under `bash -eo pipefail` → exit 0, no output (no post-floor archival exists yet — the check first bites on the 2026-09-20+ closures). Pair L → exit 0, no output. CI `drift` job carries `- name: Pair P — …` as its 12th step. `docs/CONVENTIONS.md` §"GitHub Actions CI" roster reads "Pairs A, B, C, J, M, N, O, and P". All three CORE-610.3 / 610.4 grep receipts still exit 0 on HEAD.
- **Integration miss (the audit's finding).** `grep -rl 'archive/<area>/<TASK-ID>'` enumerates every archive-move surface; the epic gated `/ft-task`, `/ft-micro-task`, and `SPEC/procedures/ft-task.md`, but **`/ft-close-epic` Step 7** is a fourth closure path with its own `git mv` and (a) no executable pre-move gate and (b) an ordering that sets `**Archived:**` *after* the move — "Move the audit tasknote — `git mv …`. Set `**Archived:** YYYY-MM-DD` in the tasknote." Its `unattended-close-epic.md` §Step 7 says the step "runs exactly as written" under `--unattended`, i.e. the `[unattended]` close-epic path — the population the epic was filed over (24% miss vs 6%) — has no detector. Operator chose (AskUserQuestion) to fix inline rather than file CORE-610.5.
- **Stale attribution.** The Pair P block's "Unparseable stamp → exempt" bullet still says the stamp miss "sits with CORE-610.3's pre-archive gate"; CORE-610.4 owns it (its own Final Summary and `docs/CONVENTIONS.md` line 78 agree). One-token fix, same class CORE-610.4 already made in CONVENTIONS. The prose sentence "[[CORE-610.3]] puts the same two greps in front of the archive move" stays correct (610.3 did put the two greps there).
- **Archive-skim observations, no action.** CORE-610.3's Final Summary carries a literal `<FOLLOW-UP-ID>` placeholder where CORE-610.4 was later allocated; CORE-610.4 archived with four unticked `## 🧩 Subtasks` boxes. Both are pre-floor (stamped 2026-09-19), Subtasks is exempt by contract, and the archive is write-once — recorded here, not patched.
- **Best Practices Review.** Prose-only skill edits; the fix reuses `/ft-micro-task` Step 4 item 4's exact "Verify, then move" register and the `/ft-task` three-grep idiom rather than a new shape. No refactor.
- **Drift check.** PLAN.md line ("Epic closure audit + doc-drift sweep") and SPEC/epic.md §"Audit acceptance — fixed doc-drift line" both hold; the inline fix is the audit-anticipated "inline fixes applied" class named in `/ft-close-epic` Step 5. No SPEC contract contradicted — SPEC §"🚀 Phase 4: Closure" already orders the `status:` flip before the move, which the close-epic reorder now honours for the stamp too.
- **Clarifications.** One AskUserQuestion fired (inline fix vs. file CORE-610.5) → inline fix. Assumptions: `step-7.1-mirror-pairs.md` is unbudgeted (it is not a `SKILL.md`); the `ft-close-epic` Codex wrapper is a pointer stub and needs no mirror edit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `claude/skills/ft-close-epic/SKILL.md` Step 7: replaced the single "Move the audit tasknote" bullet (which ran `git mv` first and set `**Archived:**` afterwards) with two bullets — **Stamp the audit tasknote** (set the date before the move) and **Verify, then move** (the three-check gate: `status: completed` grep, unannotated-Acceptance-box scan, filled-stamp grep; "applies identically under `--unattended`"; then the `git mv`). Register copied from `/ft-micro-task` Step 4 item 4; greps copied verbatim from `/ft-task`'s pre-move gate. `unattended-close-epic.md` §Step 7 ("runs exactly as written — including … the archive move") remains true with no edit.
- `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair P bullet: "sits with CORE-610.3's pre-archive gate" → "sits with CORE-610.4's stamp-fill gate on the closure surfaces". The neighbouring "[[CORE-610.3]] puts the same two greps in front of the archive move" sentence is still accurate and untouched.
- Pattern survey: the extended shape is the existing verify-then-move bullet on the other three closure surfaces; no new shape. Refactor: none. Tests: prose-only skill edits — the Acceptance greps are the tests.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests / lint: N/A — markdown-only; the verify commands below and the CI `drift` steps re-run locally are the check surface. Frontend 👁️: N/A — no UI.
- Verification receipt (all run on the edited tree):
  - A1 presence greps → 0; Pair P fence (`bash -eo pipefail`) → 0, no output; Pair L fence → 0, no output
  - A2 four-grep chain over `/ft-task`, `/ft-micro-task`, `SPEC/procedures/ft-task.md` → 0
  - A3 `grep -q "Verify, then move" claude/skills/ft-close-epic/SKILL.md && grep -q "not\[ -\]met" …` → 0
  - A4 `! grep -q "CORE-610.3's pre-archive gate" …step-7.1-mirror-pairs.md` → 0
  - A5 `wc -c claude/skills/ft-close-epic/SKILL.md` → 27,350 (cap 33,000; was 26,610)
  - CI `Context budget` step extracted and run → 0; CI `Pair B` step → 0
- Structural: no duplication (the gate text mirrors, by design, the other three surfaces — labeled mirror per `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors"), no dead text, no public-surface growth.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"), per entry: `README.md` — no change; `AGENTS.md` — no change; `SPEC.md` — no change (§"Acceptance tick-through" and §"🚀 Phase 4: Closure" state the contract; execution lives in the skills by design); `docs/MIGRATION.md` — no change; `claude/AGENTS-snippet.md` · `codex/AGENTS-snippet.md` · `cursor/AGENTS-snippet.md` · `grok/AGENTS-snippet.md` — no change; `docs/CONVENTIONS.md` — no change (§"Archived-tasknote integrity floor" already attributes the stamp gap to `CORE-610.4` and the `drift` roster already names Pair P); `CONTRIBUTING.md` — no change; `SECURITY.md` — no change; `docs/AGENT-NEUTRALITY.md` — no change; `docs/PLATFORMS.md` — no change; `claude/CAPABILITIES.md` — no change; `docs/AGENT-COMPAT.md` — no change; `docs/EXTERNAL-AGENTS.md` — no change (its template-labels row names where `**Archived:**` sits, not who fills it); `docs/WORKTREES.md` — no change; `docs/VISION.md` — no change.

Epic audit for CORE-EPIC-610: the three children (Pair P post-hoc archive check + CI lift, executable pre-move gate on three closure surfaces, `**Archived:**` stamp-fill + third grep) are all present and green on HEAD. The audit found one integration miss — `/ft-close-epic` Step 7 is a fourth closure surface with its own `git mv`, no pre-move gate, and a stamp written *after* the move, on the very `--unattended` path the epic's miss-rate data pointed at — and fixed it inline (operator-confirmed), plus one stale `CORE-610.3` attribution in the Pair P block.

- Changed: `claude/skills/ft-close-epic/SKILL.md` (+2/−1 bullets in Step 7), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (one clause).
- Verification: see Testing Notes — six Acceptance receipts, Pair P / Pair L / Context-budget / Pair B all exit 0.
- Refactors: none. Deferred: nothing filed. Observed-not-patched (write-once, pre-floor): CORE-610.3's literal `<FOLLOW-UP-ID>` placeholder; CORE-610.4's four unticked Subtasks boxes (exempt by contract).
- `touches:` reconciliation: `git diff --name-only` = the two declared paths + this tasknote + PLAN.md; no undeclared paths.
- Maintainability effect: every archive `mv` flowtron ships — `/ft-task`, `/ft-micro-task`, `SPEC/procedures/ft-task.md`, and now `/ft-close-epic` — is preceded by the same three mechanical checks, so a post-floor closure miss cannot reach Pair P from any closure path.

**Archived:** 2026-09-19
