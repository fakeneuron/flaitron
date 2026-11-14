---
title: gitleaks-step-fleet-shape
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-14
parent: CORE-905
---

# CORE-909 | gitleaks-step-fleet-shape

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-14)

## Idea

`ci.yml`'s gitleaks scan sits in the `validate` job after `npm --prefix viz ci`/build: it scans `viz/node_modules` + `viz/dist`, runs after third-party lifecycle scripts (which could shadow `sha256sum`/`tar` via `$GITHUB_PATH`), and runs once per Node-matrix leg. Move it ahead of install (or into its own job / `if: matrix.node == 24`), and adopt natabula's spine-deposit step shape so `/natabula-layer-drift` stops classifying it diverged (NAT-462 skipped flaitron for shape). Then narrow-claim note in SECURITY.md can drop. Mind Pair H (`- name:` + `run:` shape).

## Resume anchor

CORE-905 Phase 3, filing out-of-scope `/code-review medium` notes (findings 1-3, 5) before closure.
