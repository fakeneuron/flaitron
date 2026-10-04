---
title: skill-trigger-frontmatter
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: []
---

# CORE-385 | skill-trigger-frontmatter

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Sweep every shipped skill's `description:` frontmatter and add an explicit "Use when the user asks to…" trigger clause where missing, matching the `ft-audit-*` reference pattern, so more skills can auto-surface.

## ⚡ Notes

**Relevance:** Proceed — the sweep touches many files but each edit is the same mechanical one-clause insertion with no design tradeoffs; matches the task's own "extension-first, no new shape" framing.
**Best Practices Review:** No new shape introduced — reused the exact `ft-audit-*` phrasing convention ("Use when the user asks to…") verbatim across all edits. No refactor needed; each `description:` is an independent frontmatter field, no shared abstraction to extend.
**Drift check:** PLAN.md line's claim ("`ft-task`, `ft-quality`, `ft-stats` and peers state only what they do") verified true at read time — confirmed via a grep sweep of all 26 `claude/skills/*/SKILL.md` frontmatter descriptions.
**Archive skim:** `ls .flowtron/tasknote/archive/core/` + grepped for prior tasknotes touching `claude/skills` paths — none address skill description/trigger-condition consistency specifically; no prior tasknote to build on.
**Pattern survey:** Extended the existing `ft-audit-*` "Use when the user asks to…" clause into the 19 skills that lacked it (18 non-audit skills + `ft-audit-repo`, the one audit-family exception). No new shape.
**Implementation:** Added a one-sentence "Use when the user asks to…" trigger clause to the `description:` frontmatter of: `ft-close-epic`, `ft-debug`, `ft-epic-discovery`, `ft-file-followup`, `ft-flowtron`, `ft-goal-task`, `ft-micro-task`, `ft-new-project`, `ft-quality`, `ft-release`, `ft-sidequest`, `ft-spec`, `ft-starter-task`, `ft-stats`, `ft-task`, `ft-update`, `ft-worktree-end`, `ft-worktree-start`, `ft-audit-repo`. All other content in each description preserved verbatim; only the trigger clause is new. The other 7 `ft-audit-*` skills already had the pattern — untouched.
Discovered but out of scope: `claude/commands/*.md` (the slash-command mirror, symlinked into adopters' `.claude/commands/`) carries its own independent, shorter `description:` per skill — none of them, including the `ft-audit-*` family, carry the "Use when…" clause. This is a second, separate surface from `claude/skills/*/SKILL.md` and wasn't part of the reference pattern cited in PLAN.md (which points only at the SKILL.md family). Flagging as a candidate follow-up rather than folding into this task's scope.
**Docs touched:** no change — this is the doc surface itself (skill frontmatter); no separate doc references skill trigger-condition wording that would now drift.

## ✅ Recap

Added explicit "Use when the user asks to…" trigger clauses to the `description:` frontmatter of 19 shipped skills that previously stated only what they do (not when to invoke them): `ft-close-epic`, `ft-debug`, `ft-epic-discovery`, `ft-file-followup`, `ft-flowtron`, `ft-goal-task`, `ft-micro-task`, `ft-new-project`, `ft-quality`, `ft-release`, `ft-sidequest`, `ft-spec`, `ft-starter-task`, `ft-stats`, `ft-task`, `ft-update`, `ft-worktree-end`, `ft-worktree-start`, `ft-audit-repo`. Followed the existing `ft-audit-*` phrasing convention verbatim; no new shape, no other content changed. The other 7 `ft-audit-*` skills already had the pattern and were left untouched.

Discovered a second, out-of-scope drift while sweeping: `claude/commands/*.md` (the slash-command mirror) has its own independent `description:` copies that also lack "Use when…" — even for the `ft-audit-*` family. Not folded into this task since it's a separate surface from the one the PLAN.md line and reference pattern point at; worth a follow-up ticket if the operator wants that surface aligned too.

No code changed, no tests to run — this is a documentation-only frontmatter edit. Verified by re-grepping all 26 `SKILL.md` descriptions post-edit: every one now either already had, or now has, an explicit trigger clause.

**Archived:** 2026-07-31
