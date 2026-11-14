---
title: supply-chain-latest-download
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-14
parent: CORE-910
---

# CORE-911 | supply-chain-latest-download

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-14)

## Idea

CORE-910's release-fetch rule in `supply_chain` (`tools/drift-checks.sh`) matches only the literal `releases/download`. A `releases/latest/download/<asset>` URL or a `gh release download` step is an unpinned binary fetch the rule never sees. Extend the match, and decide whether `latest` fails outright (a digest cannot pin a moving asset) or must name a pinned version. Add a seeded case to `tools/drift-checks.test.mjs`. Found by CORE-910's external review.

## Resume anchor

CORE-910 Phase 3 closing: step ids made global across jobs (review blocker fixed); next is the Acceptance tick-through and closure.
