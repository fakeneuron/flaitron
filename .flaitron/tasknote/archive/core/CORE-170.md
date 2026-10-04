---
title: audit scaffold §0 parity
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-170 | audit scaffold §0 parity

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align the §0 closing-line wording across the five audit-family skill scaffolds (`ft-audit-docs`, `ft-audit-security`, `ft-audit-frontend`, `ft-audit-backend`, `ft-audit-performance`) to match `ft-audit/SKILL.md:25`, appending the "leaving it in confuses the auditor's first read on every run" rationale.

## ⚡ Notes

**Relevance:** Proceed — five single-line doc edits; no semantic change; all paths confirmed
**Drift check:** All five `claude/skills/ft-audit-{docs,security,frontend,backend,performance}/SKILL.md` exist; reference `ft-audit/SKILL.md:25` confirmed at expected line; no drift
**Archive skim:** CORE-129 touches audit-family §0 in a different context (CLAUDE.md placeholder policy); no prior tasknote touches this closing-line parity issue
**Pattern survey:** All five scaffolds had the identical truncated closing line — uniform fix, same append to each; no new shape introduced
**Implementation:** Appended ` — leaving it in confuses the auditor's first read on every run.` to the §0 closing line in all five `claude/skills/ft-audit-*/SKILL.md` files; no structural or behavioral change
**Docs touched:** `claude/skills/ft-audit-docs/SKILL.md`, `claude/skills/ft-audit-security/SKILL.md`, `claude/skills/ft-audit-frontend/SKILL.md`, `claude/skills/ft-audit-backend/SKILL.md`, `claude/skills/ft-audit-performance/SKILL.md` — all updated; no other AI-referenced docs changed

## ✅ Recap

Appended ` — leaving it in confuses the auditor's first read on every run.` to the §0 closing line in all five `claude/skills/ft-audit-{docs,security,frontend,backend,performance}/SKILL.md`. Purely additive; no structural or behavioral change. All five now match the canonical wording at `ft-audit/SKILL.md:25`.

**Archived:** 2026-05-24
