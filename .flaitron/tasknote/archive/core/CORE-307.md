---
title: codex dogfood
status: completed
tags: []
created: 2026-06-11
due:
related-tasks: []
---

# CORE-307 | codex dogfood

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Record a skip entry for Codex CLI dogfood at v5.6.0 and close this cycle's tracking task; no live Codex session available in the current environment.

## ⚡ Notes

**Relevance:** De-scope — Codex subscription still unavailable; closing as skip-entry recording rather than full dogfood.
**Drift check:** `docs/AGENT-COMPAT.md` Codex row + `docs/PLATFORMS.md` §"Codex CLI" footer both already read `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.6.0)` — stamps are current; no drift from PLAN.md intent.
**Archive skim:** CORE-258 (dogfood session at v5.2.0, 2026-06-01) is the only prior Codex dogfood tasknote; CORE-129, CORE-132, CORE-154.* cover Codex wiring/procedure work. No new load-bearing findings for this skip.
**Pattern survey:** Grok row uses the same `(dogfooded; skipped @ vX.Y.Z)` parenthetical pattern for accumulating skip entries. The Codex row already matches this shape.
**Implementation:** Stamps confirmed current as of v5.6.0. No doc edits needed — the `skipped @ v5.6.0` entry was already applied (consistent with PLAN.md note referencing the v5.5.0+v5.6.0 release cycle). Closing CORE-307 as a skip-cycle close; re-file for the next Codex subscription window.
**Docs touched:** `docs/AGENT-COMPAT.md` — no change (stamp already current). `docs/PLATFORMS.md` — no change (stamp already current).

## ✅ Recap

Stamps in both `docs/AGENT-COMPAT.md` and `docs/PLATFORMS.md` already carry `v5.2.0 · 2026-06-03 (dogfooded; skipped @ v5.6.0)`. No doc edits were needed. CORE-307 closes as a skip-cycle acknowledgement; the live Codex dogfood deferred until a subscription is available.

**Archived:** 2026-06-11
