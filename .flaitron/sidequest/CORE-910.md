---
title: supply-chain-release-pin
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-14
parent: CORE-905
---

# CORE-910 | supply-chain-release-pin

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-14)

## Idea

The CORE-902 (shellcheck) and CORE-905 (gitleaks) hash pins are convention only: `supply_chain` in `tools/drift-checks.sh` pins `uses:` actions to SHAs but never checks hand-fetched binaries. Add a rule: every `releases/download` URL in a workflow step needs a pinned `*_SHA256` env and a `sha256sum -c` in the same step, so dropping a pin or adding an unpinned fetch fails drift. Add a seeded case to `tools/drift-checks.test.mjs`. Coordinate with CORE-907 (same function's line-by-line parsing limits).

## Resume anchor

CORE-905 Phase 3, filing out-of-scope `/code-review medium` notes (finding 4) before closure.
