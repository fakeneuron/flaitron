---
title: check-updater-modules
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-931.3
---

# CORE-932 | check-updater-modules

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

`node --check tools/update-adopters.mjs` does not follow imports, so the new `tools/update-adopters/*.mjs` modules (`release.mjs`, `workspace.mjs`, and the ones CORE-931.4–.7 add) are never syntax-checked directly. Add them to the `node --check` step in the justfile `check` recipe, `.github/workflows/ci.yml` and AGENTS.md / CLAUDE.md §"Validation". `/ft-release` §7.1 Pair H pins the roster byte-for-byte, so change every surface together. The test suite still imports the modules, so this is a nit. Surfaced by the CORE-931.3 External review.

## Resume anchor

Closing CORE-931.3: External review notes weighed; Testing Notes, closure checks and the commit are next.
