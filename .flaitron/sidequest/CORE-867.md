---
title: doc-sweep-touches-scope
status: sidequest
priority: Medium
pickup: soon
created: 2026-11-06
parent:
---

# CORE-867 | doc-sweep-touches-scope

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-06)

## Idea

In unattended runs the Phase 4 doc-drift sweep can edit a doc outside the row's `touches`. The worker then parks the row as out-of-scope with all work uncommitted, and the dirty tree stops the whole drain. Seen in marscharts BE-526 (2026-11-06): work done and green, but a one-line edit to `docs/architecture/E2E_DATA_PATH.md` held 20 files; 4 unattended rows skipped. Options: limit the unattended sweep to `touches`, or file a follow-up for out-of-scope drift instead of editing. Evidence: `~/.caobunga/invocations/20261106T151521497Z-fcebcd786dff41da96d830773da6caf7.yaml`; marscharts `.flaitron/tasknote/BE-526.md` (archived once closed).

## Resume anchor

Filed standalone from a marscharts session's hand-off; no flaitron work was in flight.
