---
title: flaky-only-b-assertion
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-852.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/update-adopters.test.mjs
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-871 | flaky-only-b-assertion

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-852.3]]

## 🎯 Goal

Make the `--only limits the sweep` test deterministic by matching the `only-b` adopter row (`only-b:`) instead of the bare text `only-b`, which also matches the random temp workspace name `ft-upd-only-b…` printed on the `workspace:` line.

## ✅ Acceptance

- [x] The assertion no longer matches the workspace path — `grep -cF 'only-b:' tools/update-adopters.test.mjs` prints 1
- [x] The updater suite passes — `node --test tools/update-adopters.test.mjs`
- [x] The assertion still catches a real leak (an `only-b` row printed) — `judgment`: one-off manual mutation, recorded in Testing Notes

## 🧩 Subtasks

- [x] Change the bare `only-b` pattern at line 938 to `only-b:` (adopter rows print `<name>: …`; mkdtemp suffixes never contain a colon)
- [x] Run the suite; mutation-check that the assertion still fails when `only-b` is swept

## 🔗 Related

- [[CORE-852.3]] — authored the `--only` test (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The flake is real and the cause is confirmed in source: `update-adopters.mjs` prints `workspace: ${root}`, and `root` comes from `mkdtemp('ft-upd-only-')`, so a suffix starting with `b` makes the bare `only-b` pattern match the workspace line.

- [x] Read relevant source files — `tools/update-adopters.test.mjs` lines 925-952, and the `workspace:` print at `tools/update-adopters.mjs:1577`.

- [x] **Best Practices Review** — N/A: one-token test-pattern change, no module-boundary work.

- [x] **Archive skim** — `archive/core/` hits on `--only` are the CORE-852.x feature work that authored the test; nothing load-bearing for this fix.

- [x] **Drift check** — the PLAN line matches the code (assertion at line 938, `--only limits the sweep` at 927); no drift.

- [x] No clarifications needed. Assumptions: the `only-b:` pattern is the fix (the PLAN line's first option), and adopter rows print `<name>:`, as the line 937 assertion on `only-a:` shows.

- [x] Subtasks populated; `touches:` declared.

**Discovery Notes:** Discovery surfaced no significant deviation → skip 🛠️. The fix is a one-token pattern change; the `workspace:` line is the only other output carrying the `only-` prefix.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — sibling assertions in the same test (`⬆ only-a: would bump`, `⏭ nosuch: skipped`) already anchor on the row text with a colon; the fix follows that shape.

- [x] **Minimal refactor gate** — no refactor; one token changed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — the change is to a test; the mutation check below stands in for a new one.

**Implementation Notes:** `tools/update-adopters.test.mjs:938` — `/only-b/` → `/only-b:/`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` (the repo's Validation roster for the updater)

- [x] **Verification receipt** — see Testing Notes; changed code has no duplication, dead code, or stale docs.

- [x] **External review** — `N/A`: a one-token test-pattern change, too small to grade (the shape that would skip a tasknote); the mutation check below decides the one judgment criterion.

- [x] (frontend) `N/A` — no rendered surface; `--fast` not set, but nothing to confirm visually.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → exit 0, 122 tests, 122 pass, 0 fail
- `node --check tools/update-adopters.test.mjs` → exit 0
- `grep -cF 'only-b:' tools/update-adopters.test.mjs` → 1
- Mutation check (temporary, reverted): added `--only only-b` to the test's argv; the targeted test failed with `expected to not match only-b:` on the row `⬆ only-b: would bump v8.2.0 → v8.3.0`. The assertion still catches a real leak, and the mutation is gone (`git diff` shows the single line).
- Flake root cause confirmed in the same run's output: the `workspace:` line printed `…/ft-upd-only-XyK5vw`, so a `b`-leading suffix would have matched the old bare pattern but not `only-b:`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: the README §"AI-referenced docs" entries do not cite this test assertion.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-06.` stub at the top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A.

**Final Summary:** Fixed the flaky `--only limits the sweep` test: the assertion `doesNotMatch(stdout, /only-b/)` matched the random `ft-upd-only-b…` temp workspace path whenever the mkdtemp suffix began with `b` (about 1 run in 62); it now matches the adopter row `only-b:`. One file changed (`tools/update-adopters.test.mjs`, one line), matching the declared `touches:`. The full updater suite passes (122/122) and a mutation check proves the assertion still fails on a real `only-b` row.

**Archived:** 2026-11-06
