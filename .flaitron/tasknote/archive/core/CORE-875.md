---
title: security-ci-coverage-job
status: completed
tags: []
created: 2026-11-07
due:
related-tasks: []
touches:
  - SECURITY.md
---

# CORE-875 | security-ci-coverage-job

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[FE-151]]

## 🎯 Goal

`SECURITY.md` §"GitHub Actions CI" covers all three `ci.yml` jobs, naming the `coverage` job's `diff-cover` PyPI fetch as a compromise path with its mitigation.

## ✅ Acceptance

- [x] "Both jobs" is gone and the section names the `coverage` job — `! grep -q 'Both jobs' SECURITY.md && grep -q '`coverage`' SECURITY.md`
- [x] The compromise-path list names `diff-cover` fetched from PyPI, and the section states the version pin as its mitigation and the missing hash as what remains — `awk '/^### GitHub Actions CI/{a=1;next} a&&/^### /{a=0} a' SECURITY.md | grep -q 'PyPI'`
- [x] Wording matches `ci.yml` (`pipx run "diff-cover==${DIFF_COVER_VERSION}"`, `pull_request` runs, `contents: read`) — `judgment` (prose accuracy against the workflow; no command decides it)
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Reword the section's opening to cover all three jobs
- [x] Add compromise path (4) for `diff-cover`
- [x] Add the pin mitigation bullet and the "what remains" gap
- [x] Run the verify commands

## 🔗 Related

- [[FE-151]] — added the `coverage` job and its `diff-cover` pin

---

## ⚡ Notes

**Relevance:** Proceed — `SECURITY.md:182` still says "Both jobs"; `ci.yml` has `validate`, `drift`, `coverage`.
**Best Practices Review:** N/A — a docs-only edit to one existing section.
**Archive skim:** FE-151 (`archive/fe/`) added the `coverage` job and updated `docs/CONVENTIONS.md` but not `SECURITY.md`; no archived core note touches this section's job list.
**Drift check:** `ci.yml` `coverage` job matches the PLAN line: `DIFF_COVER_VERSION: '10.5.1'`, `pipx run "diff-cover==${DIFF_COVER_VERSION}"`, no hash, runs on `pull_request` and push. Only `SECURITY.md:182` carries "Both jobs" (grep across `*.md`/`*.yml`/`*.sh`); `docs/CONVENTIONS.md` already says three jobs.
**Clarifications:** No clarifications needed (--micro, row scope fully specified). Assumption: pipx also resolves diff-cover's own dependencies unpinned at run time, so the gap sentence says so.
**Pattern survey:** Extended the section's existing shape — a numbered compromise-path list, a "Mitigations in the workflow" bullet per path, and a "What remains" gap sentence — with one entry in each.
**Implementation:** `SECURITY.md` §"GitHub Actions CI": opening names `validate`/`drift`/`coverage` and "All three jobs"; compromise path (4) added for `diff-cover` fetched from PyPI at run time on PR runs; mitigation bullet for the exact-version pin, runner `pipx` instead of a third-party action, no secrets; "What remains" now says the pin is a version not a hash, dependencies resolve unpinned, and `DIFF_COVER_VERSION` edits get reviewed as code.
**Verification receipt:** `! grep -q 'Both jobs' SECURITY.md && grep -q '`coverage`' SECURITY.md` → 0 · awk-scoped `grep -q 'PyPI'` on the section → 0 · `bash tools/drift-checks.sh` → 0 · prose matches `ci.yml` lines 93-145 (`judgment`, read against the workflow). No code changed.
**Docs touched:** `.flaitron/tasknote/README.md` §"AI-referenced docs" lists `SECURITY.md` as the threat model; the description is still accurate — no change. No Learnings.
**N/A:** Best Practices — docs-only edit to one section · External review — ~20 lines of prose in one file, too small to grade against the criteria

**Final Summary:** `SECURITY.md` §"GitHub Actions CI" now covers all three `ci.yml` jobs. It names `diff-cover` (fetched from PyPI at run time, on PR runs) as compromise path (4), lists the exact-version pin as its mitigation, and says under "What remains" that the pin is not a hash and its dependencies resolve unpinned. `touches:` (`SECURITY.md`) matches `git diff --name-only`, apart from the workflow's own PLAN and tasknote files.

**Archived:** 2026-11-07
