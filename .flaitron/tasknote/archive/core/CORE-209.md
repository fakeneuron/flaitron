---
title: fix-migration-glossary-link
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: []
---

# CORE-209 | fix-migration-glossary-link

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix the double-`docs/` relative href in MIGRATION.md's first-paragraph vocabulary callout so the link to GLOSSARY.md resolves correctly.

## ⚡ Notes

**Relevance:** Proceed — single-character path fix matching the PLAN.md description exactly.
**Drift check:** `docs/MIGRATION.md:3` — href `docs/GLOSSARY.md` confirmed present; GLOSSARY.md lives at `docs/GLOSSARY.md` (repo-root-relative), so from inside `docs/` the correct relative href is `GLOSSARY.md`.
**Archive skim:** no prior tasknotes touch these paths.
**Pattern survey:** other relative links in MIGRATION.md use bare filenames (e.g., `PHILOSOPHY.md`, `../SPEC.md`) — consistent with the fix.
**Implementation:** Changed `[docs/GLOSSARY.md](docs/GLOSSARY.md)` → `[GLOSSARY.md](GLOSSARY.md)` at `docs/MIGRATION.md:3`.
**Docs touched:** `docs/MIGRATION.md` — corrected href; no other AI-referenced docs changed.

## ✅ Recap

One-character path fix: removed the erroneous `docs/` prefix from the GLOSSARY.md href in MIGRATION.md's first paragraph. The link now resolves correctly relative to the `docs/` directory.

**Archived:** 2026-05-26
