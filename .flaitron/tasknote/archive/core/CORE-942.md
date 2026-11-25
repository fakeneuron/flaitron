---
title: updater-roster-whitespace
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-920.2, CORE-936]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
---

# CORE-942 | updater-roster-whitespace

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-936]]

## 🎯 Goal

`updater_roster` in `tools/drift-checks.sh` reads an AGENTS.md roster line that carries leading or trailing whitespace, instead of skipping it and failing closed with a spurious `UNLISTED MODULE`, `STALE ROSTER LINE` or `VACUOUS`.

## ✅ Acceptance

- [x] A roster line with leading and/or trailing whitespace is read, so `updater_roster` passes on an otherwise-correct AGENTS.md — new self-test case `updater_roster reads a roster line padded with whitespace (CORE-942)` passes; fails with the fix reverted
- [x] The existing seeded-drift behavior is unchanged — `node --test tools/drift-checks.test.mjs`
- [x] The check still passes on the real tree and adds no shellcheck finding — `bash tools/drift-checks.sh updater_roster`; `shellcheck` reports only pre-existing info/warning lines, none on the changed line

## 🧩 Subtasks

- [x] Widen the `sed` in `updater_roster` to tolerate leading/trailing `[[:space:]]`
- [x] Add a self-test case that pads roster lines with whitespace and asserts a clean pass
- [x] Run the Acceptance commands

## 🔗 Related

- [[CORE-936]] — predecessor; added `updater_roster` and declined this change as fail-safe because `pair_h` fails first
- [[CORE-920.2]] — review that surfaced this

---

## ⚡ Notes

**Relevance:** Proceed — filed row still matches the code: the sed at `drift-checks.sh:1342` anchors on `^node --check ` and `$`.
**Best Practices Review:** N/A — one-line sed change in an existing check; no new abstraction.
**Archive skim:** CORE-936 declined this ("trailing whitespace reads as UNLISTED → not changed: `pair_h` compares the same lines byte-for-byte and fails first, and the failure is fail-safe"). CORE-920.2's review re-surfaced it. The operator filed CORE-942 after both, so the tolerance is wanted; `pair_h` still fails on the padded line, so nothing goes silent — this only drops the misleading second error.
**Drift check:** Cited `updater_roster` and its anchored sed match the current code; PLAN.md line and the SPEC agree.
**Clarifications:** No clarifications needed — assumptions: tolerate any `[[:space:]]` (spaces, tabs, CR) before `node` and after the path; leave `pair_h`/`pair_t` byte-exact comparison alone.

**Pattern survey:** Extended `reconciled_pin`'s `[[:space:]]` idiom in the same file; the test is one standalone `it` beside the per-check seeded-drift loop (a clean-pass case does not fit CASES, which asserts a failure per check).
**Implementation:** `updater_roster` sed now matches `^[[:space:]]*node --check (path)[[:space:]]*$` with the path as `[^[:space:]]+` (a trailing tab no longer rides into the capture). Added a self-test that pads one roster line with leading spaces and another with a trailing space+tab in the temp copy, then asserts no `UNLISTED MODULE` / `STALE ROSTER LINE` / `VACUOUS`. `pair_h` and `pair_t` left byte-exact, as CORE-936 decided.
**Verification receipt:** `node --test tools/drift-checks.test.mjs` → 0 (51 pass); with the sh change stashed → 1 (the new case fails, 50 pass); `bash tools/drift-checks.sh updater_roster` → 0; `bash tools/drift-checks.sh` → 0, no FAILED; `shellcheck tools/drift-checks.sh` → 1 on pre-existing SC2016/SC2013/SC1003/SC2088 lines only (none on 1342); no frontend change.
**N/A:** Best Practices — one-line sed change, no new abstraction · External review — 11-line diff across two files, too small to grade · Docs — no change

**Final Summary:**
`updater_roster` now reads an AGENTS.md roster line that has leading or trailing whitespace, where it used to skip it and fail with a spurious `UNLISTED MODULE`, `STALE ROSTER LINE` or `VACUOUS`. One sed change in `tools/drift-checks.sh` plus a clean-pass self-test in `tools/drift-checks.test.mjs`. The test fails with the fix reverted. The full self-test and every drift check pass. `touches:` matches the diff (`git diff --name-only`: the two declared files). `pair_h` still compares roster lines byte-for-byte and still fails on a padded line, so the loosened read never hides a roster that is actually wrong.

**Archived:** 2026-11-24
