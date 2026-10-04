---
title: readme-glossary-count
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: []
touches:
  - README.md
---

# CORE-611 | readme-glossary-count

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Align README.md's glossary term-count figure with `docs/GLOSSARY.md`'s actual count.

## ⚡ Notes

**Relevance:** Proceed — single-line prose fix, no design tradeoffs.
**Best Practices Review:** N/A — one-line numeral edit in existing prose, no code/abstraction surface.
**Drift check:** `README.md:76` still says "~68"; `docs/GLOSSARY.md:7` still says "~71". Counted actual glossary term entries (bold-term bullets, excluding the intro sentence and the closing "Maintenance." note) via `grep -c '^\*\*[^*]\+\*\* '` minus the 2 false positives: 73 − 2 = 71, confirming GLOSSARY.md's own "~71" is accurate and README.md's "~68" is the stale figure.
**Archive skim:** `grep -rl "GLOSSARY.md" .flowtron/tasknote/archive/core/*.md` hits CORE-606, CORE-607, CORE-603.2, CORE-603.3, CORE-EPIC-194 — all citation/structural work (CORE-607's glossary-path rename sweep), none touching the term-count figure. No prior tasknote owns this number.
**Declared scope:** `touches: [README.md]`.
**Pattern survey:** N/A — single prose numeral, no shape to extend.
**Implementation:** Changed README.md:76 `~68` → `~71` to match `docs/GLOSSARY.md`'s stated and actual count.
**Docs touched:** README.md — the fix itself. No other AI-referenced doc references this count.

## ✅ Recap

Updated `README.md:76` glossary term count from "~68" to "~71" to match `docs/GLOSSARY.md`'s stated count (verified against the actual entry count via grep). Scope matched declared `touches:` — only README.md changed. No refactor, no test surface (prose-only).

**Archived:** 2026-09-19
