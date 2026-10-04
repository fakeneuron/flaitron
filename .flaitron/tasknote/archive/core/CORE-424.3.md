---
title: fail-closed migration gate
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-424, CORE-424.2, CORE-424.4]
---

# CORE-424.3 | fail-closed migration gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-424]]

## 🎯 Goal

In `migrationBearingTags`, treat an empty tag annotation (lightweight / hand-made tag) as migration-bearing so the fleet updater never auto-bumps across an unknown release.

## ⚡ Notes

**Relevance:** Proceed — the empty-annotation path still hit `headingIdx === -1` → `continue` (non-breaking); fail-open on unreadable release notes was exactly the audit-repo finding.
**Best Practices Review:** One responsibility already owned by `migrationBearingTags`; one early-return branch, no new abstraction. Deferred: broader "annotated but no Migration heading" policy — out of scope; PLAN names empty / lightweight only.
**Drift check:** `migrationBearingTags` at `tools/update-adopters.mjs:258`. PLAN line matches. No SPEC contract states this classifier's empty-tag policy.
**Archive skim:** CORE-424.2 (sibling exit-code path); CORE-419.* (fleet-updater safety — adjacent, not this gate); CORE-360 (importable-module seam). No prior tasknote flipped empty-annotation polarity.
**Pattern survey:** Extend the existing fail-closed shape (BREAKING headings, non-all-clear bodies) — lightweight / empty-message tags join the bearing set.
**Implementation:** `migrationBearingTags` now checks `%(objecttype)` first. Lightweight tags report `objecttype=commit` and (importantly) still populate `%(contents)` with the *commit* message — so emptiness alone was the wrong probe. Gate: `objecttype !== 'tag' || !contents.trim()` → push bearing. Annotated tags with a real Migration block keep the prior BREAKING / all-clear / body logic. Test creates/deletes a temporary lightweight tag under a `v0.0.0-core-424-3-empty-*` name.
**Docs touched:** no change — classifier behavior is internal to the operator script; header comment in `update-adopters.mjs` documents the fail-closed rule.

## ✅ Recap

`tools/update-adopters.mjs` `migrationBearingTags`: fail closed on lightweight tags (`objecttype !== 'tag'`) and empty annotated messages. Root cause nuance: git's `%(contents)` for lightweight tags returns the commit message, not empty — objecttype is the real signal. One new unit test pins the lightweight path; suite 31/31 pass; `node --check` clean on both files. No docs outside the function comment.

**Archived:** 2026-08-09
