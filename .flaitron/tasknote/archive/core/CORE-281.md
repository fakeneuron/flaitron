---
title: doc-audit-spec-namespace
status: completed
tags: []
created: 2026-06-04
due:
related-tasks: []
---

# CORE-281 | doc-audit-spec-namespace

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `/ft-update` to the SPEC.md §"Skill namespace" enumeration and the PLATFORMS.md Claude Code skill row where it was missing from the standalone skills list.

## ⚡ Notes

**Relevance:** Proceed — `/ft-update` exists at `claude/commands/ft-update.md` and `claude/skills/ft-update/` but is absent from both the SPEC.md namespace enumeration and PLATFORMS.md table row; both docs are authoritative references auditors/adopters rely on.
**Drift check:** SPEC.md:96-105 §"Skill namespace" confirmed at these lines; PLATFORMS.md:31 Claude Code table row confirmed. Paths stable.
**Archive skim:** no prior tasknotes touch these paths (archive has CORE-278/279/280; none overlap with namespace enumeration edits).
**Pattern survey:** standalone skills are appended to the end of the inline list before "and the audit family" in SPEC.md, and appended to the standalone list in the PLATFORMS.md table cell.
**Implementation:** Two single-line doc edits — (1) SPEC.md:100 adds `, `/ft-update`` before "and the audit family"; (2) PLATFORMS.md:31 adds `, /ft-update` to the standalone skills list in the Claude Code row. No code changed.
**Docs touched:** SPEC.md §"Skill namespace" updated; docs/PLATFORMS.md Claude Code skill row updated.

## ✅ Recap

Added `/ft-update` to SPEC.md §"Skill namespace" (standalone skills enumeration) and docs/PLATFORMS.md Claude Code skill row. Two-line doc fix; no code changes.

**Archived:** 2026-06-04
