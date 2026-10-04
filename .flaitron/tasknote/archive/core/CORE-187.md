---
title: ft-audit-glob-fix
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-187 | ft-audit-glob-fix

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Replace the bare `ft-audit*/` glob in `docs/MIGRATION.md:67` with an explicit brace-set, and normalize the ambiguous "six `ft-audit*`" phrasing in `docs/PLATFORMS.md:31,171` so ft-audit-context is clearly excluded from the 5-pass audit family.

## ⚡ Notes

**Relevance:** Proceed — exact paths and line numbers match; CORE-186 (added ft-audit-context) and CORE-185 (pass-name alignment) both confirmed ft-audit-context is intentionally distinct from the 5-pass family, making this glob fix necessary.

**Drift check:** `docs/MIGRATION.md:67` still contains `ft-audit*/` verbatim. `docs/PLATFORMS.md:31` has `six \`/ft-audit*\` skills` with explicit parenthetical list. `docs/PLATFORMS.md:171` has `the six \`ft-audit*\` skills` mid-listing. All three match the PLAN line description — no drift.

**Archive skim:** CORE-185 and CORE-186 both confirm ft-audit-context is deliberately scoped out of the 5-pass `/ft-audit*` family. CORE-185 explicitly states: "Its 4-pass Bloat/Redundancy/Namespace/Drift is the deliberate distinction from the /ft-audit* family." No prior tasknote addressed this glob fix.

**Pattern survey:** The explicit brace-set `ft-audit{,-docs,-security,-frontend,-backend,-performance}/` is the exact form suggested in the PLAN line. For PLATFORMS.md, changing `six \`ft-audit*\`` to `six \`ft-audit\`-family` follows the same disambiguation without requiring an expanded inline list (a parenthetical already exists at line 31).

**Implementation:** Three targeted edits: (1) MIGRATION.md:67 glob → brace-set; (2) PLATFORMS.md:31 `six \`/ft-audit*\`` → `six \`/ft-audit\`-family`; (3) PLATFORMS.md:171 `the six \`ft-audit*\`` → `the six \`ft-audit\`-family`.

**Docs touched:** `docs/MIGRATION.md` — updated (line 67 glob fix); `docs/PLATFORMS.md` — updated (lines 31, 171 phrasing). No SPEC changes needed.

## ✅ Recap

Replaced `ft-audit*/` bare glob with `ft-audit{,-docs,-security,-frontend,-backend,-performance}/` in MIGRATION.md:67, and normalized "six `ft-audit*`" to "six `ft-audit`-family" in PLATFORMS.md:31,171. All three edits prevent ft-audit-context from being misread as part of the 5-pass capped-findings family.

**Archived:** 2026-05-24
