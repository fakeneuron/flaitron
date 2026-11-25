---
title: updater-node-guard-order
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-931.8, CORE-932]
touches:
  - tools/update-adopters.mjs
---

# CORE-935 | updater-node-guard-order

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-931.8]] · [[CORE-932]]

## 🎯 Goal

Drop the updater's Node ≥20 guard (operator decision, 2026-11-24), so the entry no longer carries a version floor that ESM import hoisting makes unreliable and nothing else in the repo enforces.

## ✅ Acceptance

- [x] The guard is gone from the entry — `! grep -q 'versions.node' tools/update-adopters.mjs`
- [x] No stale "requires Node ≥20" text remains under `tools/` — `! grep -rq 'requires Node' tools/`
- [x] Entry still parses — `node --check tools/update-adopters.mjs`
- [x] Updater suite passes — `node --test tools/update-adopters.test.mjs`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Delete the guard block (`tools/update-adopters.mjs` lines 120–123) and its trailing blank line
- [x] Run the Acceptance commands

## 🔗 Related

- [[CORE-931.8]] — predecessor; its External review surfaced this (the entry split into modules)
- [[CORE-932]] — adjacent; added the six `node --check` roster lines for the modules

---

## ⚡ Notes

Carried from the retired sidequest stub:

> **Idea** — Since the CORE-EPIC-931 split, `tools/update-adopters.mjs` statically imports six modules under `tools/update-adopters/`, and ESM evaluates them before the entry's `process.versions.node` < 20 guard runs. A module that throws at load on old Node would surface a raw error instead of "requires Node ≥20" + exit 1. Decide: move the guard into a tiny module imported first, or accept the risk and drop the guard. Surfaced by CORE-931.8 External review.
>
> **Resume anchor** — CORE-931.8 Phase 3 — External review notes being fixed or filed before Phase 4 closure.

**Relevance:** Proceed — the guard is still at `tools/update-adopters.mjs:120` after six static imports, as the stub says; one-file removal, no design question left once the operator chose.
**Archive skim:** CORE-931.2 read release.mjs's top level (no side effects, no syntax newer than the entry's) and left the guard in place; CORE-931.8 and CORE-932 External reviews flagged the hoisting and filed this row. Nothing contradicts dropping it.
**Drift check:** No drift — the guard sits at `tools/update-adopters.mjs:120–123`, `grep` finds no other "requires Node" text under `tools/`, SPEC, docs or skills (only a viz-cohort line in `docs/VERSION-HISTORY.md`, unrelated), and the PLAN.md line matches the stub.
**Clarifications:** Asked once (drop / move into a first-imported module / keep and document the invariant); operator chose **drop**. Assumption: a raw error on an old Node is acceptable, since CI tests Node 24/26 and viz `engines` already require 24+.
**Pattern survey:** N/A — pure deletion; no new shape.
**Implementation:** Deleted the 4-line `process.versions.node` < 20 guard from `tools/update-adopters.mjs` (was lines 120–123, plus its blank line). No other file carried the "requires Node ≥20" text, so nothing else moved. The six-module roster is unchanged.
**Verification receipt:**
- `! grep -q 'versions.node' tools/update-adopters.mjs` → 0
- `! grep -rq 'requires Node' tools/` → 0
- `node --check tools/update-adopters.mjs` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (125 pass, 0 fail)
- `bash tools/drift-checks.sh` → first run exit 1: `pair_q FAILED`, `awk: can't open file .flaitron/sidequest/CORE-935.md` — the check read the tracked stub I had deleted but not yet staged. Not a flaky rerun: I staged the stub deletion (part of this closure) and the full run then exited 0 with every check `ok`. A clean-tree stash run confirmed `pair_q ok` without my changes.
- Changed code free of duplication, dead code and stale docs: a deletion only; the guard's `process` global is still used elsewhere in the entry, so no import went unused.
**Docs touched:** no change — no README §"AI-referenced docs" entry, SPEC, or skill mentions the guard; the one `Node ≥20` hit outside the entry is an unrelated viz line in `docs/VERSION-HISTORY.md` (historical record, left alone).
**N/A:** Best Practices — a pure deletion with no new responsibilities or dependencies · External review — a 4-line deletion, too small to grade against Acceptance

**Final Summary:** Dropped the updater's Node ≥20 guard (operator-chosen over moving it into a seventh first-imported module or documenting a load-safe invariant). ESM hoists the six static imports ahead of the entry body, so the guard was never guaranteed to run first, and nothing else in the repo enforces ≥20 (CI tests Node 24/26, viz `engines` need 24+). One file changed, `tools/update-adopters.mjs` (−5 lines); the updater suite (125 tests) and the full drift-check roster pass. `touches:` reconciled: declared `tools/update-adopters.mjs` matches the diff. Also retired the sidequest stub `.flaitron/sidequest/CORE-935.md`.

**Archived:** 2026-11-24
