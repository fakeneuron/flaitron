---
title: readme-maturity-note
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-629]
touches:
  - README.md
---

# CORE-630 | readme-maturity-note

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a short README maturity note clarifying that flowtron's major version
number tracks the May 2026 rapid-iteration period (v1–v5 in 25 days), not
project maturity, and that the contract has been break-free since v5.0.0.

## ⚡ Notes

**Relevance:** Proceed — single-file doc addition, exactly as scoped in the PLAN.md line.
**Best Practices Review:** Pure doc addition to an existing `## Version` section in README.md; no code, no abstraction, no refactor in scope.
**Drift check:** No paths/line numbers cited in the PLAN.md line to verify. Verified against git tags: v1.0.0 tagged 2026-05-07, v5.0.0 tagged 2026-06-01 — 25 days, confirming the "v1–v5 in 25 days" claim. No SPEC contradiction.
**Archive skim:** `archive/core/` has no prior tasknote touching README.md's `## Version` section (grep for `README.md` in touches: across archive/core turned up unrelated hits only). No prior tasknote to build on.
**Declared scope:** `touches: [README.md]` (see frontmatter).
**Pattern survey:** Matches existing README voice — reuses "solo-maintained" phrasing already established in `CONTRIBUTING.md`/`SECURITY.md` rather than inventing new terminology.
**Implementation:** Added one paragraph to README.md's `## Version` section (after the submodule/`CHANGELOG.md` paragraph, before `## License`) noting flowtron is solo-maintained with a personal adopter fleet, and that the major version counts breaking changes from the May 2026 rapid-iteration period (v1.0.0 on 2026-05-07 → v5.0.0 on 2026-06-01, 25 days), not maturity — the contract has been break-free since v5.0.0 (2026-06-01). Verification receipt: `git diff --name-only` → `README.md` only, matches declared `touches:`. No code changed; no lint/typecheck/test applicable to a doc-only addition.
**Docs touched:** README.md is the deliverable itself. No other AI-referenced doc needs updating for this addition.

## ✅ Recap

Added a one-paragraph maturity note to README.md's `## Version` section:
single-maintainer project with a personal adopter fleet; major version
counts breaking changes from the May 2026 rapid-iteration period (v1–v5 in
25 days), not maturity; contract has been break-free since v5.0.0
(2026-06-01). Dates verified against git tags. `touches:` scope
(`README.md`) matches `git diff --name-only`. No refactor, no other files
touched.

**Archived:** 2026-09-20
