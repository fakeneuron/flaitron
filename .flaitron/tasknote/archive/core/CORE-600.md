---
title: layout-md-paths-contrast
status: completed
tags: []
created: 2026-09-14
due:
related-tasks: []
touches:
  - SPEC/layout.md
---

# CORE-600 | layout-md-paths-contrast

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Drop the stale "not `paths:`" contrast in `SPEC/layout.md` §"Procedure SOPs" now that the lazy-module `paths:` frontmatter convention it contrasts against is retired.

## ⚡ Notes

**Relevance:** Proceed — PLAN.md line still matches current repo state; `SPEC/layout.md` §"Procedure SOPs" (line 52) still reads "...`restates:` / `last-verified:`, not `paths:` — and are loaded by...", contrasting the procedure-SOP frontmatter shape against a `paths:` convention CORE-596 already retired from the 17 non-epic lazy modules.
**Best Practices Review:** Pure prose deletion; no responsibilities/abstractions/duplication in play. N/A.
**Drift check:** No drift — line number and surrounding text match the PLAN.md line exactly.
**Archive skim:** [[CORE-596]] (spec-paths-frontmatter-retire) is the direct precedent — it stripped `paths:` frontmatter from the 17 non-epic `SPEC/*.md` modules and deleted the other two documented contrast references (`SPEC/layout.md` §"Lazy SPEC module frontmatter" and the `SPEC/procedures/README.md` contrast sentence), but missed this third contrast phrase embedded inside §"Procedure SOPs" itself. Confirms `SPEC/epic.md`'s `paths:` frontmatter is a deliberate, documented exception (not drift) — irrelevant to this sentence, which is about the procedure-SOP shape, not epic.md.
**Declared scope:** `touches: [SPEC/layout.md]`
**Pattern survey:** N/A — single-sentence prose edit, no code shape involved.
**Implementation:** Removed the ", not `paths:`" clause from the sentence in `SPEC/layout.md` §"Procedure SOPs" describing the procedure-SOP frontmatter shape, leaving the rest of the sentence and section unchanged.
**Docs touched:** Checked `.flowtron/tasknote/README.md` §"AI-referenced docs" list — `SPEC/*.md` lazy modules are outside that sweep's file set (edited directly here); no other listed doc references this sentence. No change needed elsewhere.

## ✅ Recap

Removed the stale ", not `paths:`" contrast clause from `SPEC/layout.md`
§"Procedure SOPs" (line 52), which compared the procedure-SOP frontmatter
shape against the lazy-module `paths:` convention that [[CORE-596]] already
retired. One file, one line changed — `git diff --name-only` shows only
`SPEC/layout.md`, matching the declared `touches:` scope exactly. Verified
by grep: `not .paths:` no longer matches in the file, and the surrounding
sentence + section otherwise unchanged. No test/lint suite covers markdown
prose in this repo.

**Archived:** 2026-09-14
