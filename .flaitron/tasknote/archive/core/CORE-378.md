---
title: release-recipe-lockfile
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: []
---

# CORE-378 | release-recipe-lockfile

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Resync `viz/package-lock.json` to `5.14.0`, add a lockfile step + verification grep to `/ft-release` Step 5, and fix the stale "4 doc-pin edits" count at `SKILL.md:84`.

## ⚡ Notes

**Relevance:** Proceed — surfaced by audit-repo 2026-07-27 (Theme: Enumeration mirrors / Release recipe; Findings #1–#3); confirmed drift still present (lockfile at 5.13.0 vs package.json 5.14.0; SKILL.md:84 still says "4 doc-pin edits").
**Best Practices Review:** Extends the existing 5-step version-edit recipe in `claude/skills/ft-release/SKILL.md` Step 5 with a 6th lockfile step, following the same numbered-list + verification-grep shape already used for the other 5 edits. No new abstraction — this is closing an enumeration-mirror gap (the recipe forgot the lockfile after CORE-372/373 raised the count to 5 edits).
**Drift check:** `viz/package.json:4` = `"version": "5.14.0"`; `viz/package-lock.json` root + `packages[""]` both were `"5.13.0"` (stale, confirmed). `SKILL.md:84` said "4 doc-pin edits" — stale since the 5th edit (`viz/package.json`) was added; both now fixed.
**Archive skim:** `.flowtron/tasknote/archive/core/` — CORE-114, CORE-115, CORE-119 touch package-lock; CORE-104/113/128/141/etc. touch ft-release. No load-bearing precedent beyond the existing Step 5 recipe shape already read inline.
**Pattern survey:** Followed the existing Step 5 numbered-edit + fenced verification-grep pattern already used for the SPEC/MIGRATION/SECURITY/constants.ts/package.json edits.
**Implementation:** Ran `npm install --package-lock-only` in `viz/` — synced `version` fields (root + `packages[""]`) from `5.13.0` → `5.14.0`, no dependency changes (2-line diff). Folded the lockfile resync into edit #5 of `claude/skills/ft-release/SKILL.md` Step 5 (alongside `viz/package.json`, not a new 6th edit — keeps the "5 version edits" count accurate) with a verification grep added to the existing bare-semver check block; mirrored the same line into Step 3's Acceptance template (`viz/package.json` bullet) and added `viz/package-lock.json` to the §7.4 `git add` staging list so future release cuts stage it automatically. Fixed `SKILL.md:84` "4 doc-pin edits" → "5 version edits" (Step 2.5 self-assessment prose).
**Docs touched:** `claude/skills/ft-release/SKILL.md` — updated to reflect the 6-edit recipe (was already stale re: 5 edits before this task; now correct).

## ✅ Recap

Resynced `viz/package-lock.json` (`5.13.0` → `5.14.0`, 2-line diff, no dependency changes) to close the drift left by CORE-372/373. Folded a lockfile-resync clause + verification grep into `/ft-release` Step 5's existing package.json edit (kept the "5 version edits" count intact rather than adding a 6th), mirrored it into the Step 3 Acceptance template and the §7.4 `git add` staging list, and corrected the stale "4 doc-pin edits" count at `SKILL.md:84` to "5 version edits" — next release cut will carry the lockfile forward automatically instead of silently drifting again.

**Archived:** 2026-07-27
