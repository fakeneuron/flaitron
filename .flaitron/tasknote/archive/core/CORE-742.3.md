---
title: sidequest-promoted-guard
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-742, CORE-742.2, CORE-606]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONVENTIONS.md
---

# CORE-742.3 | sidequest-promoted-guard

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-742]]

## 🎯 Goal

Make `sidequest_orphan` also fail on a `.flaitron/sidequest/<ID>.md` stub whose ID already has a tasknote (active or archived), with a seeded case.

## ⚡ Notes

**Relevance:** Proceed — `sidequest_orphan` (CORE-742.2) only reads checked PLAN rows, so a stub beside a live or archived tasknote is unreported until the row flips; the gap is live in the code.
**Best Practices Review:** Extends the one existing function in place — same `bad=` accumulator and loop, one extra branch per stub; no new function, no new abstraction. No refactor needed or deferred.
**Drift check:** no drift — `sidequest_orphan()` in `tools/drift-checks.sh` and its `CASES.sidequest_orphan` seed match the PLAN line; park-mode.md §Notes "Promotion" still states the delete-at-promotion rule. Live stub `CORE-641` has no tasknote (checked below).
**Archive skim:** area `core` confirmed against the README table. Hit: CORE-742.2 (shape of the check, VACUOUS-floor and seeded-case conventions; its external review filed this task as note 2). CORE-606 made stub retirement executable at the promoting runners — this is the mechanical backstop at promotion time rather than row-flip time.
**Declared scope:** YAML `touches:` filled (script, self-test, CONVENTIONS sentence).
**Pattern survey:** extends `sidequest_orphan`'s per-stub loop and the existing multi-stub seeded case (two more stubs, one with an active tasknote, one with an archived one) rather than adding a sibling check; finding line follows the `ORPHANED STUB  <path>` shape.
**Implementation:** `sidequest_orphan()` in `tools/drift-checks.sh` now sets `id` per stub and, when the ID has no closed row, scans `.flaitron/tasknote/<id>.md` and `.flaitron/tasknote/archive/*/<id>.md`; a hit prints `PROMOTED STUB  <stub>  (tasknote <path>)` and fails. A closed row still reports `ORPHANED STUB` alone (`continue`), so one stub never double-reports. Design note added to the function comment. Seeded case grew two stubs (ZZ-3 beside an active note, ZZ-4 beside an archived one) and the finding regex requires all four lines in glob order. Repro: stub + active note `ZZ-9` → `PROMOTED STUB` exit 1; live repo (CORE-641, no note) → ok.
**Docs touched:** `docs/CONVENTIONS.md` sidequest-orphan sentence extended; `AGENTS.md`, `README.md` and every other AI-referenced doc: no change (none enumerate this check's findings). Script header sentence left unchanged (names the check, not its branches).

## ✅ Recap

Extended `sidequest_orphan` to fail with `PROMOTED STUB` when a sidequest stub's ID already has an active or archived tasknote, so a skipped promotion-time delete is caught before the row flips. Verification: `bash tools/drift-checks.sh sidequest_orphan` → 0 (live); `node --test tools/drift-checks.test.mjs` → 0 (18 pass, incl. the extended seeded case + coverage/floor tests); `bash tools/drift-checks.sh` → 0 (all checks); `node --check tools/drift-checks.test.mjs` → 0; `bash -n tools/drift-checks.sh` → 0; `just lint` → 0; ad-hoc `ZZ-9` stub + active note → `PROMOTED STUB`, exit 1. Structural: one extra branch in the existing loop, no duplication or dead code. No refactor; none deferred. `touches:` reconciliation: `git diff --name-only` = the three declared paths + `.flaitron/PLAN.md` (closure flip, workflow file) — no undeclared deliverable. Maintainability: the leftover-stub case now fails CI at promotion time rather than waiting for the row flip.

**Archived:** 2026-10-08
