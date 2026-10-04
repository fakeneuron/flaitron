---
title: archive-folder-naming-rule
status: in-progress
tags: []
created: 2026-08-08
due:
related-tasks: []
---

# CORE-412 | archive-folder-naming-rule

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

State a derivable archive-folder naming rule for `.flowtron/tasknote/README.md` §"Archive layout" and reconcile the three existing archive folders (`core`, `frontend`, `TEST`) with it.

## ⚡ Notes

**Relevance:** Proceed — the mapping is genuinely non-derivable today (2 rows cover 6 canonical prefixes) and `archive/TEST/` already diverged; fixing the rule and the divergence is exactly the filed scope.
**Best Practices Review:** No refactor beyond the naming fix — folder renames via `git mv` preserve history; doc edits are localized to the "Archive layout" section in each of the two living docs that define it.
**Drift check:** PLAN.md line's cited paths (`README.md` §"Archive layout", `archive/TEST/`) matched current state exactly; no drift.
**Archive skim:** no prior tasknotes touch the archive-naming rule itself (incidental mentions in CORE-049/052/097.6/257/258/359.N were unrelated README word-count audits).
**Pattern survey:** `templates/tasknote-README.md` (adopter template) had already drifted from `.flowtron/tasknote/README.md` (this repo's live doc) — the template used full descriptive words (`backend`/`frontend`/`database`/`deployment`/`testing`) for canonical prefixes but plain lowercase (`archive/ocr/`) for adopter-declared ones, an internal inconsistency. Asked the operator to pick between "lowercase the prefix" (mechanical, no lookup table) vs. "full descriptive word" (more readable, needs a maintained lookup); operator chose lowercase-the-prefix. Applied uniformly to both docs, closing the template's internal inconsistency too.
**Implementation:** Renamed `archive/frontend/` → `archive/fe/` (84 files) and `archive/TEST/` → `archive/test/` (8 files, via a temp-name intermediate since APFS is case-insensitive and `TEST`→`test` collides in a single `git mv`) — both `git mv` renames, history preserved. Added a **Rule:** line + full 6-row table to `.flowtron/tasknote/README.md` §"Archive layout" and `templates/tasknote-README.md` §"Archive layout" (rule: `<AREA>-*` → `archive/<area lowercased, no trailing dash>/`, applies uniformly to canonical and adopter-declared prefixes). Confirmed no other live doc or code hardcodes the old folder names — `viz/src/archiveCache.ts` discovers area folders dynamically (no lookup table); `archiveCache.test.ts`'s `'frontend'` fixture string is an isolated temp-dir test fixture, unrelated to the real repo folders. `archive/core/` was already correct under the new rule, no change.
**Docs touched:** `.flowtron/tasknote/README.md` §"Archive layout" — rule stated + table completed. Other AI-referenced docs (`SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, root `README.md`) only reference `archive/core/` (unchanged) or generic `archive/<area>/` phrasing — no change needed.

## ✅ Recap

Stated a mechanical archive-folder naming rule (`<AREA>-*` → `archive/<area-lowercased>/`) in `.flowtron/tasknote/README.md` and `templates/tasknote-README.md`, replacing the previous 2-row (live doc) / inconsistent 5-row-plus-ad-hoc (template) tables. Reconciled the three existing folders: `archive/frontend/` → `archive/fe/` (84 files) and `archive/TEST/` → `archive/test/` (8 files) renamed via `git mv`; `archive/core/` needed no change. `viz` test suite (`archiveCache.test.ts`, which reads area folders dynamically) still passes — 10/10. No adopter-facing code depends on the old folder names.

**Archived:** 2026-08-08
