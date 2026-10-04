---
title: header version
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-432]
---

# CORE-432.2 | header version

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Stop the viz header from presenting `VIZ_VERSION` as a project's flowtron pin when the real pin is unknown — omit the version segment (or show unknown) instead of inventing one.

## ⚡ Notes

**Relevance:** Proceed — single-line dishonest fallback at `App.tsx:326`; matches epic theme (edge states misreport instead of admitting unknown).
**Best Practices Review:** Header should report project pin only when known. `versionCurrency` / ProjectSelector already treat missing pin as unknown (no invented currency). Keep `VIZ_VERSION` in constants for release pin + package.json mirror; it must not stand in for project pin. No broader refactor.
**Drift check:** PLAN cites `App.tsx:326` — still exact (`projectVersions[…] ?? VIZ_VERSION`). No SPEC contract on viz header. Line matches.
**Archive skim:** CORE-262/265/278/300/305/341 touch `VIZ_VERSION` only as release pin bumps, not this honesty fix. ProjectSelector (version currency) already omits UI chrome when unknown.
**Pattern survey:** Extend ProjectSelector / `versionCurrency` honesty: unknown → omit, never substitute another number. Prefer omit over "unknown" text so the subtitle stays clean (PLAN allows either).
**Implementation:** Dropped `?? VIZ_VERSION` in `viz/src/ui/App.tsx` header subtitle; render ` · flowtron ${pin}` only when `projectVersions[active]` is truthy, else null. Removed unused `VIZ_VERSION` import (constant remains for `/ft-release` + package.json mirror). Added two App tests: known pin shown; null pin omits segment (no invented version).
**Docs touched:** no change — AI-referenced docs do not document this header fallback; behavior is self-explanatory in code + tests.

## ✅ Recap

Honest header version: when the active project's flowtron pin is unknown, the subtitle no longer fabricates `VIZ_VERSION`. Known pins still show as ` · flowtron vX.Y.Z`; unknown omits the segment. `VIZ_VERSION` stays in `constants.ts` for the release pin. Verified: App.test 42/42 pass; typecheck + lint clean. No refactor beyond the dead import removal.

**Archived:** 2026-08-10
