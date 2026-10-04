---
title: template-status-default
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: []
---

# CORE-069 | template-status-default

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Flip the standard tasknote template's `status:` default from `not-started` to `in-progress` to match the nav-header chip and the `/task` skill's scaffold behavior.

## ⚡ Notes

**Relevance:** Proceed — audit 2026-05-10 (Finding #1) surfaced the inconsistency; `templates/tasknote-template.md:3` ships `status: not-started` but the nav-header chip on `:12` reads `🟢 In progress`, and `claude/skills/task/SKILL.md:106` overwrites `status:` to `in-progress` at scaffold anyway. The `not-started` default is dead.

**Drift check:** Confirmed — `templates/tasknote-template.md:3` still reads `status: not-started`; nav-header chip on `:12` still reads `🟢 In progress`. No drift from audit findings.

**Archive skim:** `_project/tasknote/archive/core/` — CORE-017 (frontmatter) and CORE-018 (body shape) defined the template; CORE-042.3 (frontmatter audit) reviewed it. None re-examined the `status:` default vs chip alignment, so no prior decision contradicts this fix.

**Pattern survey:** `templates/tasknote-starter-template.md` ships `status: starter` aligned with `🌱 Starter (filed YYYY-MM-DD)`; `templates/tasknote-micro-template.md` ships `status: in-progress` aligned with `🟢 In progress`. The standard template is the lone outlier — extending the existing sibling-template pattern, not inventing a new shape.

**Implementation:** Single-line edit at `templates/tasknote-template.md:3` — `status: not-started` → `status: in-progress`. PLAN.md `[model]` retagged `[sonnet]` → `[opus]` at task entry per SPEC §"Model field" mismatch path (user declined `/model sonnet` switch).

**Docs touched:** Walked `_project/tasknote/README.md` §"AI-referenced docs":
- `README.md` — no change (doesn't describe template default)
- `SPEC.md` — no change (§"Tasknote frontmatter" enumerates valid `status:` values but doesn't pin the template default)
- `docs/MIGRATION.md` — no change (procedural; no template-default reference)
- `claude/CLAUDE-snippet.md` — no change (adopter paste-block; no template-default reference)

## ✅ Recap

Flipped `templates/tasknote-template.md:3` to `status: in-progress`, matching the nav-header chip and the `/task` Step 3b scaffold behavior. Internal-consistency parity now matches `tasknote-starter-template.md` and `tasknote-micro-template.md`. Write-once policy on archived tasknotes means no retroactive migration; new tasknotes scaffolded by `/task` already wrote `in-progress` (skill overwrote the dead default), so this is contract-tightening rather than behavior-changing.

**Archived:** 2026-05-10
