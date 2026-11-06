---
title: dependabot-minimatch-alert
status: completed
tags: []
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-868, CORE-868.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - viz/package.json
  - viz/package-lock.json
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-868.4 | dependabot-minimatch-alert

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-868]]

## 🎯 Goal

Close Dependabot alert #6 (minimatch < 11.0.1, GHSA-g3hv-75wg-m249) in `viz` by the cheapest route that keeps lint green, and record which route.

## ✅ Acceptance

- [x] No minimatch below 11.0.1 remains in the resolved `viz` tree (or the alert is dismissed as dev-only with that reason) — `npm --prefix viz ls minimatch`
- [x] `npm --prefix viz run lint` stays green — `npm --prefix viz run lint`
- [x] viz tests, typecheck and build stay green — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run build`
- [x] The route taken (eslint bump / `overrides` pin / dismissal) is recorded in Implementation Notes — `grep -q 'Route taken' .flaitron/tasknote/CORE-868.4.md`
- [x] Alert #6 state reflects the outcome — `judgment`; N/A until pushed: GitHub re-scans only after the operator pushes. Local resolved tree and `npm audit` (0) are the evidence now.

## 🧩 Subtasks

- [x] Confirm no eslint / typescript-eslint release lifts the minimatch range
- [x] Add `overrides: { minimatch: "^11.0.1" }` to `viz/package.json`, refresh the lockfile
- [x] Run lint, tests, typecheck, build
- [x] If lint breaks, revert the pin and dismiss the alert as dev-only (N/A — lint stayed green)

## 🔗 Related

- [[CORE-EPIC-868]] — parent epic
- [[CORE-868.N]] — closing audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Alert #6 is still `open` (medium, development scope, vulnerable `>= 7.0.0, < 11.0.1`, patched 11.0.1). Resolved tree has minimatch 10.2.6 via eslint 10.9.0, `@eslint/config-array` 0.23.5 and `@typescript-eslint/typescript-estree` 8.67.0. The PLAN line still matches reality.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Option 1 (eslint release that lifts the range) is closed.** eslint latest 10.14.0 declares `minimatch ^10.2.6`; `@eslint/config-array` latest 0.23.5 `^10.2.4`; `@typescript-eslint/typescript-estree` latest 8.72.1 `^10.2.2`. Nothing upstream reaches 11 yet, so a bump cannot lift the range.
- **Option 2 (`overrides`) is the live path.** minimatch latest is 11.0.5 (`engines: 20 || >=22`, fits `viz` engines `^24.15.0 || >=26`). Majors 10 to 11 means eslint's pinned `^10` is forced past its declared range, so lint is the real test, per the PLAN line. `viz/package.json` has no `overrides` today.
- **Option 3 (dismiss as dev-only)** is the fallback if lint, tests or build break. It is a state-changing GitHub API call, so it needs a separate confirm.
- Precedent: FE-129 (`archive/fe/`) bumped `viz` advisories via a non-forced `audit fix`; no prior `overrides` use.
- The `Dependabot Updates` runs fail because `open-pull-requests-limit: 0` leaves security PRs off; it is not part of this task and is not changed here.
- The alert shows resolved only after a push re-scan. Push needs an explicit ask, so the final state of #6 is judged, not verified, at closure.
- Clarifications: none needed. Assumptions: `overrides` to `^11.0.1` is allowed if lint, tests, typecheck and build all stay green; a failure on any of them reverts the pin and parks the dismissal for operator confirm.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Route taken: `overrides` pin.** Added `"overrides": { "minimatch": "^11.0.1" }` to `viz/package.json`; `npm --prefix viz install` refreshed the lockfile. Resolved minimatch 10.2.6 → 11.0.5 for eslint, `@eslint/config-array` and `@typescript-eslint/typescript-estree`; one new transitive dev package (`@isaacs/nonrecursive-glob-match` 1.1.0), `brace-expansion` already satisfied `^5.0.12`.
- Pattern survey: `viz` had no `overrides`; this is the standard npm key, no new shape. Minimal refactor gate: nothing touched beyond the two files. No new tests — dependency-only change, covered by the existing suite.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
npm --prefix viz run lint       → 0
npm --prefix viz test           → 0   (31 files, 647 tests passed)
npm --prefix viz run typecheck  → 0
npm --prefix viz run build      → 0
npm --prefix viz ls minimatch   → 0   (all three paths resolve minimatch@11.0.5)
npm --prefix viz audit          → 0   (found 0 vulnerabilities)
grep -q 'Route taken' .flaitron/tasknote/CORE-868.4.md → 0
```

- Targeted suite = the full viz suite (cheap, 17s); lint/type-check ran on the whole `src`.
- Verification receipt: no code changed, only `viz/package.json` + lockfile; duplication / dead code / stale docs `N/A`.
- **External review: N/A** — the diff is a 3-line `overrides` key plus a lockfile hunk touching only minimatch and its one new transitive dependency, all decided by the receipt above; too small to grade independently. Lockfile diff inspected: minimatch 10.2.6 → 11.0.5 and `@isaacs/nonrecursive-glob-match` added, nothing else.
- Frontend 👁️ CONFIRM: N/A — no rendered UI changed (dev dependency only).
- Not changed: alert #6 stays `open` on GitHub until the operator pushes and GitHub re-scans. `dismiss` was not needed. The failing `Dependabot Updates` runs (`open-pull-requests-limit: 0`) are out of scope here.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:** Closed alert #6 locally by the `overrides` route: eslint/typescript-eslint releases still pin minimatch `^10`, so a bump could not lift the range; the `^11.0.1` override resolves 11.0.5 and lint, 647 tests, typecheck, build and `npm audit` all stay green. Doc-drift sweep: no change (no doc names minimatch). `touches:` reconciled — diff is `viz/package.json` + `viz/package-lock.json`, as declared. Learnings: N/A. GitHub shows the alert fixed only after the operator pushes.

**Archived:** 2026-11-06
