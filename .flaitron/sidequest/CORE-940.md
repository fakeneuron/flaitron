---
title: reconciled-pin-source-rule
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-920.4
---

# CORE-940 | reconciled-pin-source-rule

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

The `tools/drift-checks.sh` header and `docs/CONVENTIONS.md` §"GitHub Actions CI" both count `reconciled_pin` ([[CORE-919.3]]) among the "nine checks [that] have neither a source rule nor a catalogue entry". But `/ft-release` SKILL.md Step 5 states its rule (overlay `flaitron-reconciled:` bumped each cut). Move it into the "automate a rule stated elsewhere" group in both files, and fix the counts. Surfaced by CORE-920.4's External review.

## Resume anchor

CORE-920.4 Phase 3: External review notes fixed or filed; next is the Testing Notes receipt and Phase 4 closure.
