---
title: ci-job-timeouts
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - .github/workflows/ci.yml
---

# CORE-633 | ci-job-timeouts

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add `timeout-minutes` to both `ci.yml` jobs (`validate` 20, `drift` 10) so a hung worker fails fast instead of running to GitHub's 360-minute default.

## ✅ Acceptance

- [x] `validate` job has `timeout-minutes: 20` — `grep -A2 '^  validate:' .github/workflows/ci.yml | grep -q 'timeout-minutes: 20'`
- [x] `drift` job has `timeout-minutes: 10` — `grep -A2 '^  drift:' .github/workflows/ci.yml | grep -q 'timeout-minutes: 10'`
- [x] No `- run:` line changes (Pair H untouched) — `judgment` — diff review confirms only `timeout-minutes:` keys added

## 🧩 Subtasks

- [ ] Add `timeout-minutes: 20` under `validate:`'s `runs-on: ubuntu-latest`
- [ ] Add `timeout-minutes: 10` under `drift:`'s `runs-on: ubuntu-latest`

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both jobs in `.github/workflows/ci.yml` lack `timeout-minutes`; PLAN.md line still matches current file state.

- [x] Read relevant source files — read `.github/workflows/ci.yml` in full (460 lines); the change is job-level key additions only, no `- run:` line edits, so Pair H (validation-roster ↔ restatement) is unaffected.

- [x] **Best Practices Review** — `timeout-minutes` is a standard GitHub Actions job-level key; placing it alongside `runs-on:` matches common convention. No existing abstraction or duplication concerns.

- [x] Archive skim — `ls .flowtron/tasknote/archive/core/`, grepped for `ci.yml` and `timeout-minutes` hits. Several prior CORE tasknotes touched `ci.yml` (CORE-623, CORE-629, CORE-621, CORE-631.3, CORE-631.N) but none added job timeouts. No load-bearing precedent found.

- [x] Clarifying questions — No clarifications needed (--fast). Assumption: `timeout-minutes` placed directly under `runs-on: ubuntu-latest` in each job, consistent with common YAML style.

- [x] Populate Acceptance / Subtasks (above)

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

---

## 🛠️ Phase 2: Execution

- [x] Implement changes
- [x] Targeted tests on changed files

## 🧪 Phase 3: Testing & Linting

- [x] Verification receipt — `grep -A2 '^  validate:' .github/workflows/ci.yml | grep -q 'timeout-minutes: 20'` → 0; `grep -A2 '^  drift:' .github/workflows/ci.yml | grep -q 'timeout-minutes: 10'` → 0; `git diff -- .github/workflows/ci.yml` shows only two added `timeout-minutes:` lines, no `- run:` changes
- [x] Lint / type-check — N/A, YAML-only job-key addition; no viz/tools code touched

## 🚀 Phase 4: Closure

- [x] Doc-drift sweep — checked `.flowtron/tasknote/README.md` §"AI-referenced docs" set; none reference `ci.yml` timeout keys, no drift
- [x] Acceptance tick-through — all three criteria verified above
- [x] PLAN.md updated — CORE-633 row flipped and moved to `## Completed` (stub form)
- [x] Archived

## 📌 Recap

Added `timeout-minutes: 20` to the `validate` job and `timeout-minutes: 10` to the `drift` job in `.github/workflows/ci.yml`. Both are job-level key additions only — no `- run:` step changes, so Pair H's validation-roster check is unaffected. Verified via targeted `grep` and a full diff review of the changed file.

**Archived:** 2026-09-20
