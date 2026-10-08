---
title: drift-floor-coverage
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-739.2, CORE-739.3, CORE-739.N]
touches:
  - tools/drift-checks.test.mjs
---

# CORE-740 | drift-floor-coverage

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-739.2]]

## 🎯 Goal

The drift self-test fails when a `drift-checks.sh` check lacks a `VACUOUS <name>` floor and is not one of the header's two exempt checks.

## ✅ Acceptance

- [x] New test passes on the live script — `node --test tools/drift-checks.test.mjs`
- [x] Test fails when a check's floor is removed or commented out — mutation run, see Testing Notes
- [x] Full validation set green — `just test` / `just lint` / `just typecheck`

## 🧩 Subtasks

- [x] Add the floor-coverage `it` beside the one-case-per-check test
- [x] Mutation-verify it

## 🔗 Related

- [[CORE-739.2]] — review note 9 (open half)
- [[CORE-739.3]] — the self-test this extends

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment** — **Verdict:** Proceed. **Rationale:** header rule and 15 checks match the PLAN line; only skill_pin_guard_parity and pair_h lack a floor.
- [x] Read relevant source files — drift-checks.sh header + `VACUOUS` lines, drift-checks.test.mjs
- [x] **Best Practices Review** — N/A, one test case in an existing file
- [x] **Archive skim** — CORE-739.2 / 739.3 / 739.N read; no conflicts
- [x] **Drift check** — no drift
- [x] Asked clarifying questions OR logged "No clarifications needed (--fast)": assumes the floor is the `VACUOUS <name>` text in the check's own body
- [x] Subtasks populated; `touches:` declared

**Discovery Notes:** none beyond the above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing regex-over-script test
- [x] **Minimal refactor gate** — none
- [x] Implemented the minimal solution
- [x] Updated/added tests — the deliverable is the test

**Implementation Notes:** body regex ends at the first column-0 `}`, which the header's shape rules guarantee; the parsed names are asserted equal to the check list so a truncated parse fails loudly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite
- [x] Ran lint/type-check
- [x] **Verification receipt** — below
- [x] **External review** — `/code-review medium`, below
- [x] (frontend) N/A — no rendered surface

**Testing Notes:**
- `node --test tools/drift-checks.test.mjs` → 0 (17 pass)
- Mutation: `VACUOUS pair_c` renamed in the script → test fails naming `pair_c`; floor commented out → fails; script restored via `git checkout`
- `just test` → 0 (587); `just lint` → 0; `just typecheck` → 0; `node --test tools/update-adopters.test.mjs` → 0 (65); `bash tools/drift-checks.sh` → all ok
- External review: 5 notes. Fixed: substring match was satisfied by a comment (now requires a non-comment line with `exit 1`); body-regex truncation (now asserted equal to the check list). Not taken, accepted: the test is static text and does not run a zero-input case (the floor firing is 739.2's mutation proof); EXEMPT is hard-coded, mirroring the header; the second function-name regex duplicates the first test's.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change
- [x] Closed
- [x] **Evidence-based recap** drafted
- [x] **Learnings** — N/A

**Final Summary:** Added `floors every check but the two the header exempts` to `tools/drift-checks.test.mjs`. `touches:` matches `git diff --name-only` plus the PLAN/archive closure writes. A new check without a floor now fails the self-test. `unattended-candidates: none`

**Archived:** 2026-10-08
