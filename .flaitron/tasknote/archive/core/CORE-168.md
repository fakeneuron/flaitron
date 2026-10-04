---
title: versioning-example-placeholders
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-168 | versioning-example-placeholders

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace literal `v3.2.0`/`v3.2.x`/`v3.3.0` version strings in `SPEC/versioning.md` tier examples with generic `vX.Y.Z` placeholders so they don't stale on the next version bump.

## ⚡ Notes

**Relevance:** Proceed — literal version strings present on lines 12 and 14 of `SPEC/versioning.md`, exactly as described.
**Drift check:** No drift — `v3.2.0`, `v3.2.1`, `v3.2.x`, `v3.3.0` confirmed present in the target file.
**Archive skim:** CORE-128 and CORE-154.1 previously bumped these same examples (v3.1.x → v3.2.x); confirms the manual-update pattern this task eliminates. No load-bearing constraints on approach.
**Pattern survey:** Line 17 already used `v3.x.y → v4.0.0` (lowercase wildcards). Adopted same neutral-number `v1.x` base across all three tier examples for consistency; also updated line 17 (`v3.x.y → v4.0.0` → `v1.x.y → v2.0.0`) since it carried the same staleness risk.
**Implementation:** Replaced patch example (`v3.2.0 → v3.2.1` → `v1.2.3 → v1.2.4`), minor example (`v3.2.x → v3.3.0` → `v1.2.x → v1.3.0`), and major example (`v3.x.y → v4.0.0` → `v1.x.y → v2.0.0`) in a single edit. The `v1.x` base avoids any collision with real flowtron version history.
**Docs touched:** `SPEC/versioning.md` — updated all three tier examples to generic `v1.x` placeholders (lazy module; not in default cold-start sweep, no other AI-referenced docs affected).

## ✅ Recap

Replaced all three tier-example version strings in `SPEC/versioning.md` with neutral `v1.x` placeholders (`v1.2.3/v1.2.4` for patch, `v1.2.x/v1.3.0` for minor, `v1.x.y/v2.0.0` for major). No more manual bump required when flowtron cuts a release. Extended scope from the two mentioned lines to include line 17 for full-block consistency.

**Archived:** 2026-05-23
