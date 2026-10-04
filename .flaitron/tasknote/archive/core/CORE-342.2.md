---
title: release-v5.10.0
status: completed
tags: []
created: 2026-07-05
due:
related-tasks: ["CORE-EPIC-342", "CORE-341"]
---

# CORE-342.2 | release-v5.10.0

[← PLAN.md](../../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-342]] [[CORE-341]]

## 🎯 Goal

Cut flowtron v5.10.0 minor release shipping `/ft-sidequest` since v5.9.1; walk dogfood-or-explicit-skip rows (Grok refreshed, Codex skipped).

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.9.1` → `v5.10.0`
- [x] docs/MIGRATION.md example pin bumped `v5.9.1` → `v5.10.0`
- [x] SECURITY.md release-tag example pin bumped `v5.9.1` → `v5.10.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.9.1` → `v5.10.0`
- [x] `viz/package.json` `"version"` bumped `"5.9.1"` → `"5.10.0"`
- [x] Dogfood gate resolved — Claude + Grok refreshed → v5.10.0; Codex `skipped @ v5.10.0`
- [x] Phase 4 doc-drift sweep — zero findings; symlink count 24/24/24
- [x] Single `feat: CORE-342.2 — flowtron v5.10.0 (...)` commit + annotated tag + push
- [x] PLAN.md child line stubbed under parent epic

## 🧩 Subtasks

- [x] 5 version edits + dogfood stamps
- [x] viz lint/typecheck/test (229 passed)
- [x] Doc-drift sweep + wiring-count check
- [x] Tag message drafted
- [x] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-EPIC-342]] — parent epic
- [[CORE-341]] — prior release v5.9.1

---

**Final Summary:**

Flowtron v5.10.0 minor release shipping `/ft-sidequest` — the lightest persistent mid-session filing motion (tiny stub + PLAN line, resume inline). Five version pins bumped v5.9.1 → v5.10.0. Dogfood gate: Claude + Grok refreshed → v5.10.0 (this Grok /ft-task epic session); Codex recorded `skipped @ v5.10.0`. Doc-drift sweep + wiring-count check: clean. No adopter-side migration required — picked up on next `/ft-update` pin bump; new skill symlinks wire via the standard /ft-update note.

**Archived:** 2026-07-05