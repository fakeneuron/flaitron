---
title: viz-audit-fix
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-EPIC-716]
---

# CORE-716.2 | viz-audit-fix

[← PLAN.md](../../../PLAN.md) · ✅ Completed

## 🎯 Goal

Lift the transitive `source-map-js` past GHSA-68fv-2mgg-jv7q via `npm --prefix viz audit fix` (lockfile only) with the four viz gates still green.

## ⚡ Notes

**Relevance:** Proceed — `npm --prefix viz audit` reported 1 high (source-map-js 1.0.0–1.2.1) with a fix available.
**Best Practices Review:** N/A — lockfile-only dependency bump; no code, boundaries, or abstractions touched.
**Drift check:** no drift — the advisory and affected range match the PLAN.md line; fix was available as stated.
**Archive skim:** grep for `package-lock`/`source-map` in `archive/core/` hit only generic lockfile mentions (CORE-114/115/119, 351.x, 378–430.2); none concern source-map-js or audit policy.
**Declared scope:** touches: viz/package-lock.json
**Pattern survey:** Used the stock `npm audit fix` path; no new shape.
**Implementation:** `npm --prefix viz audit fix` moved source-map-js 1.2.1 → 1.2.2 (3 lines in `viz/package-lock.json`; package.json untouched). Verification receipt:
- `npm --prefix viz audit --audit-level=high` → exit 0 (0 vulnerabilities; was 1 high)
- `npm --prefix viz test` → exit 0 (29 files, 587/587)
- `npm --prefix viz run typecheck` → exit 0
- `npm --prefix viz run lint` → exit 0
- `npm --prefix viz run build` → exit 0
Structural quality assertions: N/A — no source code changed.
**Docs touched:** no change.

## ✅ Recap

Ran `npm --prefix viz audit fix`; the only change is `viz/package-lock.json` (source-map-js 1.2.1 → 1.2.2, +3/−3). Audit now reports 0 vulnerabilities and all four viz gates pass (587/587 tests). Declared scope matches `git diff --name-only` (only `viz/package-lock.json`). Incidental: npm warns fsevents has install scripts not covered by `allowScripts`; unrelated, left as-is. Vitest's jsdom hint is CORE-716.4's subject.

**Archived:** 2026-10-06
