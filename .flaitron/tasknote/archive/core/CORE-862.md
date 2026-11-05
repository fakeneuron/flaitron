---
title: ci-job-timeouts
status: completed
tags: []
created: 2026-11-05
due:
related-tasks: [CORE-860]
touches:
  - .github/workflows/ci.yml
  - .github/workflows/install-test.yml
---

# CORE-862 | ci-job-timeouts

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-860]]

## 🎯 Goal

Set every GitHub Actions job's `timeout-minutes` to the NAT-528 default for its job kind (15 min lint/typecheck/unit, 30 min E2E/build/deploy) wherever it differs today.

## ✅ Acceptance

- [x] Every job in `ci.yml` and `install-test.yml` carries `timeout-minutes` at its kind's default (`validate` 15, `drift` 15, `coverage` 15, `shellcheck` 15, `e2e` 30) — `grep -nE '^  [a-z0-9-]+:$|timeout-minutes' .github/workflows/ci.yml .github/workflows/install-test.yml`
- [x] Both workflows still parse as YAML — `ruby -ryaml -e 'ARGV.each{|f| YAML.load_file(f)}' .github/workflows/ci.yml .github/workflows/install-test.yml`
- [x] Drift checks (incl. Pair H's `validate` roster extraction) still pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `ci.yml`: `validate` 20 → 15, `drift` 10 → 15 (`coverage` already 15)
- [x] `install-test.yml`: `shellcheck` 5 → 15, `e2e` 15 → 30
- [x] Run the three verify commands

## 🔗 Related

- [[CORE-860]] — brand-nearmiss-guard; last change to these workflows' neighbourhood, no overlap
- Origin: natabula NAT-528 (`docs/CODING-STANDARDS.md` §"Timeouts and abort")

---

## ⚡ Notes

**Relevance:** Proceed — both workflows still carry non-default timeouts (`validate` 20, `drift` 10, `shellcheck` 5, `e2e` 15).
**Archive skim:** no prior tasknotes touch these paths beyond workflow additions (CORE-734.*, FE-151 coverage job); none set or argue a timeout value.
**Drift check:** PLAN line matches the code — 5 jobs across 2 workflows, `coverage` (15) already at default; no docs in `docs/`, `SPEC/`, `tools/` or `claude/` cite a job timeout.
**Clarifications:** Asked, two job-kind calls: `validate` runs lint/typecheck/unit plus a ~1.5 min `npm run build` → treated as lint/unit, 15 min. `install-test.yml` `e2e` is the shell end-to-end test of `install.sh`, not Playwright → treated as the E2E row by role, 30 min.
**Pattern survey:** Plain `timeout-minutes:` integer on each job, as the four existing ones already do; no new shape.
**Implementation:** Four one-line `timeout-minutes` edits: `ci.yml` `validate` 20 → 15 and `drift` 10 → 15; `install-test.yml` `shellcheck` 5 → 15 and `e2e` 15 → 30. `coverage` already at 15. No raise above a default, so no explanatory comment is owed (NAT-528: comment only when raising a default). No refactor.
**Verification receipt:** `grep -nE '^  [a-z0-9-]+:$|timeout-minutes' .github/workflows/ci.yml .github/workflows/install-test.yml` → exit 0, validate 15 / drift 15 / coverage 15 / shellcheck 15 / e2e 30 (the `e2e:` header line has a digit, so the grep's `[a-z-]` job-name probe in the receipt run missed it; its `timeout-minutes: 30` sits at install-test.yml:40 directly under `runs-on: ${{ matrix.os }}`) · `ruby -ryaml -e 'ARGV.each{|f| YAML.load_file(f)}' …` → exit 0 · `bash tools/drift-checks.sh` → exit 0, every pair `ok` including `pair_h`. No duplication, dead code, or stale docs: no doc cites a job timeout.
**N/A:** Best Practices — one-integer config edits, no code shape · External review — 4-line diff, nothing to grade beyond the receipt · Docs — no change

**Final Summary:** Aligned all five Actions jobs with the NAT-528 timeout defaults: `ci.yml` `validate` 20 → 15 and `drift` 10 → 15 (`coverage` already 15); `install-test.yml` `shellcheck` 5 → 15 and `e2e` 15 → 30. Two job-kind calls were confirmed by the operator: `validate` counts as lint/unit despite its `npm run build` step, and `install-test`'s `e2e` counts as the E2E row by role though it is a shell test, not Playwright. Touches reconciled: both declared workflows changed, nothing else but the tasknote and PLAN.md. Only a push-time CI run can show the new ceilings suffice: `ci.yml` runs take ~1–2 min, so `validate` and `drift` have wide headroom, and the `install-test` runs seen in `gh run list` ranged up to ~20 min wall-clock (cause not checked), which the 30-min `e2e` ceiling covers.

**Archived:** 2026-11-05
