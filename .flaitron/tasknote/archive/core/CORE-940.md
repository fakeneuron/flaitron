---
title: reconciled-pin-source-rule
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-919.3, CORE-920.4, CORE-924, CORE-928]
touches:
  - tools/drift-checks.sh
  - docs/CONVENTIONS.md
---

# CORE-940 | reconciled-pin-source-rule

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-919.3]] · [[CORE-920.4]] · [[CORE-924]]

## 🎯 Goal

Regroup `reconciled_pin` from the "neither a source rule nor a catalogue entry" list into the "automate a rule stated elsewhere" group, in both `tools/drift-checks.sh`'s header and `docs/CONVENTIONS.md` §"GitHub Actions CI", and fix the counts.

## ✅ Acceptance

- [x] `docs/CONVENTIONS.md` no longer lists `reconciled_pin` among the no-source-rule checks, and that count reads "Eight" — `grep -c 'Eight checks have neither' docs/CONVENTIONS.md` is 1 and `grep -c 'Nine checks' docs/CONVENTIONS.md` is 0
- [x] `docs/CONVENTIONS.md` lists `reconciled_pin` in the "automate a rule stated elsewhere" sentence, count "Three", naming `/ft-release` Step 5 — `grep -c 'Three more automate a rule stated elsewhere' docs/CONVENTIONS.md` is 1
- [x] `tools/drift-checks.sh` header moves `reconciled_pin` to the "automate a rule stated elsewhere" paragraph — `sed -n 1,35p tools/drift-checks.sh | grep -B1 'have neither' | grep -c reconciled_pin` is 0
- [x] No drift introduced — `bash tools/drift-checks.sh` exits 0 (context budget, final newline) and `node --test tools/drift-checks.test.mjs` exits 0

## 🧩 Subtasks

- [x] Edit the `tools/drift-checks.sh` header (lines 21-30)
- [x] Edit `docs/CONVENTIONS.md` line 60: "Two more" → "Three more" with `reconciled_pin`, "Nine" → "Eight", drop the reconciled-pin entry from the no-rule list
- [x] Run the Acceptance commands

## 🔗 Related

- [[CORE-919.3]] — added `reconciled_pin`
- [[CORE-924]] — precedent for the "automate a rule stated elsewhere" group
- [[CORE-928]] — last edit to the no-source-rule list
- [[CORE-920.4]] — External review surfaced this

---

## ⚡ Notes

Carried from the retired sidequest stub:

> **Idea** — The `tools/drift-checks.sh` header and `docs/CONVENTIONS.md` §"GitHub Actions CI" both count `reconciled_pin` ([[CORE-919.3]]) among the "nine checks [that] have neither a source rule nor a catalogue entry". But `/ft-release` SKILL.md Step 5 states its rule (overlay `flaitron-reconciled:` bumped each cut). Move it into the "automate a rule stated elsewhere" group in both files, and fix the counts. Surfaced by CORE-920.4's External review.
>
> **Resume anchor** — CORE-920.4 Phase 3: External review notes fixed or filed; next is the Testing Notes receipt and Phase 4 closure.

**Relevance:** Proceed — `SKILL.md:190` states the overlay-pin bump and names `reconciled_pin`; the header and CONVENTIONS still file it under no-source-rule; two prose edits.
**Best Practices Review:** N/A — doc-prose edit, no code structure touched.
**Archive skim:** `archive/core/` confirmed against the README table. `grep -l reconciled_pin` hits CORE-919.3 (added it), 919.N, 920.4 (surfaced this), 939. CORE-924 is the precedent for the "stated elsewhere" group; CORE-936 left the no-rule list to CORE-928/929. Nothing contradicts the regroup.
**Drift check:** Cited paths match current code — header lines 21-30 and CONVENTIONS line 60 carry the "nine" list and the "Two more" sentence as the stub describes; PLAN line matches the SPEC.
**Clarifications:** No clarifications needed. Assumptions: the "both counts" are CONVENTIONS' "Nine"→"Eight" and "Two more"→"Three more" (the header carries no number); the `plus reconciled_pin (below)` pointer stays valid.
**Pattern survey:** Extended CORE-924's "automate a rule stated elsewhere" sentence in CONVENTIONS and the matching header paragraph; no new shape.
**Implementation:** `tools/drift-checks.sh` header: dropped `reconciled_pin` from the no-rule list, added it to the "stated elsewhere" paragraph naming `/ft-release` Step 5's overlay-pin bump. `docs/CONVENTIONS.md` §"GitHub Actions CI": "Two more" → "Three more" (cites `CORE-940`) with a `reconciled_pin` clause, "Nine" → "Eight", reconciled-pin entry removed from the no-rule list and "and" moved to the updater-roster entry. The `plus reconciled_pin (below)` pointer still resolves to the new clause.
**Verification receipt:** `grep -c 'Eight checks have neither' docs/CONVENTIONS.md` → 1 · `grep -c 'Nine checks' docs/CONVENTIONS.md` → 0 · `grep -c 'Three more automate a rule stated elsewhere' docs/CONVENTIONS.md` → 1 · header `grep -B1 'have neither' | grep -c reconciled_pin` → 0 · `bash tools/drift-checks.sh` → exit 0, 29 `ok` (first run showed `pair_q FAILED` on the deleted sidequest stub still in the index — cleared by `git rm --cached`, a retire-the-stub artifact, not a finding) · `node --test tools/drift-checks.test.mjs` → 50 pass, 0 fail.
**N/A:** Best Practices — doc-prose edit, no code structure touched · External review — 12-line prose regroup across two comment/doc paragraphs, too small to grade against Acceptance (the four grep counts and the drift suite decide it) · Docs — no change beyond the deliverable (`docs/CONVENTIONS.md` is the edit; the other AI-referenced docs carry no count of these checks); no Learnings.

**Final Summary:** `reconciled_pin` now sits with the checks that automate a rule stated elsewhere (`/ft-release` Step 5's overlay-pin bump) instead of the no-source-rule list, in both the `tools/drift-checks.sh` header and `docs/CONVENTIONS.md`, and the two counts read "Three more" and "Eight". Changed `tools/drift-checks.sh` (6 lines) and `docs/CONVENTIONS.md` (1 paragraph line); retired the sidequest stub. Verified by four grep counts, `bash tools/drift-checks.sh` (exit 0) and `node --test tools/drift-checks.test.mjs` (50 pass). Scope: declared 2 files, changed 2 (plus the stub deletion and closure writes).

**Archived:** 2026-11-24
