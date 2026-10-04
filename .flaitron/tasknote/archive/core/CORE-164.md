---
title: platforms-audit-family-notation
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: []
---

# CORE-164 | platforms-audit-family-notation

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace the ambiguous `/ft-audit-*` glob in PLATFORMS.md:31 with unambiguous prose naming all six audit skills, aligned with the Worked Example's unhyphenated `ft-audit*` form.

## ⚡ Notes

**Relevance:** Proceed — targeted wording fix, single line in PLATFORMS.md:31.
**Drift check:** PLATFORMS.md:31 still contains `/ft-audit-*` (hyphenated); all six audit skills (ft-audit, ft-audit-backend, ft-audit-docs, ft-audit-frontend, ft-audit-performance, ft-audit-security) confirmed in `claude/skills/`. Worked Example at line 171 already uses correct unhyphenated form `the six \`ft-audit*\` skills`.
**Archive skim:** No prior tasknotes reference this specific notation issue in PLATFORMS.md.
**Pattern survey:** Worked Example (line 171) uses compact `the six \`ft-audit*\` skills` pattern. Line 31 adopts same pattern with leading `/` (slash commands) plus inline enumeration for full explicitness.
**Implementation:** Replace `plus the \`/ft-audit-*\` family` on line 31 with the six skills listed inline, matching Worked Example's unhyphenated glob form as prefix and enumerating all six for unambiguity.
**Docs touched:** PLATFORMS.md — line 31 wording updated.

## ✅ Recap

Replaced `/ft-audit-*` (hyphenated glob, excludes `/ft-audit` itself) with `the six \`/ft-audit*\` skills (\`/ft-audit\`, \`/ft-audit-docs\`, \`/ft-audit-backend\`, \`/ft-audit-frontend\`, \`/ft-audit-performance\`, \`/ft-audit-security\`)` — unambiguous, names all six, aligns with the Worked Example's unhyphenated form at line 171.

**Archived:** 2026-05-23
