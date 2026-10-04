---
title: readme-task-counter-currency
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: []
---

# CORE-411 | readme-task-counter-currency

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Give the README.md task-count claim a reproducible derivation and an owner in `/ft-release`'s doc-currency step, or drop the precision if it can't be kept current cheaply.

## ⚡ Notes

**Relevance:** Proceed — `README.md:22-23` still claims a stale count; issue confirmed live.
**Best Practices Review:** No new abstraction needed — extended the existing "Standing X check" pattern already used three times in `/ft-release` §7.1 (symlink-wiring, shipped-skill parity, SOP-currency) rather than inventing a new mechanism. Responsibility stays with `/ft-release` (the only place doc-currency edits already land in a commit); README.md itself just states the derived numbers.
**Drift check:** `README.md:22-23` confirmed stale: claimed "**618 tasks**... between 2026-04-28 and 2026-07-31" but the actual archive today (2026-08-08) holds only 606 files — fewer than the claimed 618 despite 8 more days of closures, so 618 was never a correct archive-file count even when written (likely a hand-typed/miscounted figure, not a simple staleness lag). `SKILL.md:159`'s grep confirmed to check only `vX\.Y\.Z` pins, no task-count logic. PLAN.md's own filing note (601 archived / 490 checked, as of 2026-08-06) is itself already 2 days stale vs. today's 606 / 492 — independent confirmation that hand-maintained counts drift fast and reproducible derivation is the right fix over a one-time correction.
**Archive skim:** `grep -l` over `.flowtron/tasknote/archive/core/CORE-40*.md` and `CORE-41*.md` (the recent doc-currency/audit cluster) found no prior tasknote that addressed this specific README claim. CORE-409 is cited in-line at `SKILL.md:215` as the precedent for why standing checks stay lightweight (count-not-candidates) — followed that precedent for this check's shape too.
**Pattern survey:** Modeled the new "Standing README task-counter check" directly on the three existing `/ft-release` §7.1 standing checks (same bold-header + fenced derivation command + resolution-rule shape), placed immediately after the last one (machine-global wiring) and before §7.2, so all of §7.1's standing checks stay contiguous.
**Implementation:** `README.md:22-23` — corrected the closed-task count (618→606) and date range (2026-07-31→2026-08-08) to the reproducibly-derived current values, and added a one-line pointer to the new `/ft-release` check so the sentence explains its own provenance. `claude/skills/ft-release/SKILL.md` §7.1 — added "Standing README task-counter check" with two derivation commands (archive file count; earliest/latest `**Archived:**` date via grep+sort), a note on the ~2-file archive-hygiene undercount (CORE-255 has an unfilled `YYYY-MM-DD` placeholder), and a blocking (Critical/High, fix inline) resolution rule matching the other mechanical-edit standing checks in that section.
**Docs touched:** `README.md` (AI-referenced doc) — updated per this task's Acceptance, verdict: **updated**. No other AI-referenced doc cites the count.

## ✅ Recap

`README.md:22-23`'s hand-typed closed-task count was corrected (618→606) and its date range refreshed (2026-07-31→2026-08-08); drift check found the old figure had never matched a reproducible derivation even at write time (618 exceeded today's true count of 606 despite 8 additional days of closures). Gave the claim a source: two grep/find commands (archive file count; earliest/latest `**Archived:**` date) now live in `claude/skills/ft-release/SKILL.md` §7.1 as a new "Standing README task-counter check," matching the shape of the section's three existing standing checks and resolved the same way (blocking, fix inline, mechanical text substitution). README now also states its own provenance so the next reader/release knows where the number comes from. Noted but did not fix a ~2-file archive-hygiene gap (`CORE-255.md` has an unfilled `**Archived:** YYYY-MM-DD` placeholder) that slightly undercounts the date-range derivation — out of scope for this task, small enough not to warrant a follow-up ticket on its own.

**Archived:** 2026-08-08
