---
title: updater-node-guard-order
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-931.8
---

# CORE-935 | updater-node-guard-order

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

Since the CORE-EPIC-931 split, `tools/update-adopters.mjs` statically imports six modules under `tools/update-adopters/`, and ESM evaluates them before the entry's `process.versions.node` < 20 guard runs. A module that throws at load on old Node would surface a raw error instead of "requires Node ≥20" + exit 1. Decide: move the guard into a tiny module imported first, or accept the risk and drop the guard. Surfaced by CORE-931.8 External review.

## Resume anchor

CORE-931.8 Phase 3 — External review notes being fixed or filed before Phase 4 closure.
