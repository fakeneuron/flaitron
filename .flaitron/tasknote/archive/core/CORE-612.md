---
title: caobunga-commit-type
status: completed
tags: []
created: 2026-09-19
due:
related-tasks:
  - CORE-597
---

# CORE-612 | caobunga-commit-type

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Resolve the unrecognized `caobunga:` commit type flagged by audit-repo against commit `71e5051`, per `docs/CONVENTIONS.md:17`'s type list.

## ⚡ Notes

**Relevance:** De-scope — `71e5051` (2026-09-12) is the only `caobunga:` commit that has ever landed, and `CORE-597` (completed 2026-09-13, one day later) already fixed the root cause: `caobunga-status.md` was untracked (`git rm --cached`) and gitignored specifically so "the cross-repo orchestrator's status writes stop landing as unconventional `caobunga:` commits on `main`". Verified current state: `git ls-files caobunga-status.md` is empty (untracked) and `git check-ignore -v caobunga-status.md` confirms `.gitignore:12`. `git log --all --oneline` shows exactly one `caobunga:` commit, ever. Neither alternative offered on the PLAN.md line (document `caobunga:` in `docs/CONVENTIONS.md`, or have the orchestrator emit `chore:`) is needed — the orchestrator no longer commits this artifact at all, so there's no live drift to fix and no recurring pattern to name as a convention. Documenting a one-time, already-closed historical commit as an active type would misstate `docs/CONVENTIONS.md`'s "Types in active use" list, and CORE-597's own closure rationale explicitly rejected registering a new commit-type convention for this file. audit-repo (2026-09-19) surfaced the historical commit without cross-referencing CORE-597's fix.
**Best Practices Review:** N/A — de-scoped before any code/doc change.
**Drift check:** PLAN.md line's factual claim (`71e5051` uses `caobunga:`, not in `docs/CONVENTIONS.md:17`'s list) is accurate but stale — it doesn't account for CORE-597 landing the day after that commit and closing the gap at the source (untrack + gitignore), which no longer appears in the currently-open PLAN.md/SPEC surface the audit swept.
**Archive skim:** `.flowtron/tasknote/archive/core/CORE-597.md` (caobunga-status-file-home, completed 2026-09-13) — directly load-bearing: untracked + gitignored `caobunga-status.md` for exactly this reason, chose "untrack + gitignore" over "register as a tracked convention" as the more surgical fix. No other archived tasknote references `caobunga-status.md` or a `caobunga:` commit type.
**Declared scope:** N/A — no file deliverable (de-scoped; no PLAN.md-line changes applied beyond closure).
**Pattern survey:** N/A — de-scoped.
**Implementation:** N/A — de-scoped; no code or doc changes made.
**Docs touched:** No change — `docs/CONVENTIONS.md`'s type list is already correct as-is (`caobunga:` was never an active, in-use type; CORE-597 ensured it can't recur).

## ✅ Recap

De-scoped: no changes needed. The `caobunga:` commit type audit-repo flagged (`71e5051`, 2026-09-12) was already resolved at the source by `CORE-597` (2026-09-13), which untracked and gitignored `caobunga-status.md` so the cross-repo orchestrator's status writes stop landing as commits on `main` at all. Verified `caobunga-status.md` is currently untracked and gitignored, and that `71e5051` remains the only `caobunga:` commit in the repo's full history. Neither of the PLAN.md line's two proposed fixes (document the type, or have the orchestrator emit `chore:`) applies — there's no recurring commit to redirect and no active convention to document. `docs/CONVENTIONS.md` needed no edit. No refactors. `touches:` reconciliation: none declared, none made — matches `git diff --name-only` (no diff besides this tasknote's own lifecycle files).

**Archived:** 2026-09-19
