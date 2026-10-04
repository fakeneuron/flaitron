---
title: blocked-by-grammar-discipline
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: []
---

# CORE-531 | blocked-by-grammar-discipline

[← PLAN.md](../PLAN.md) · ✅ Completed

> **⚠️ Superseded by [[CORE-533]]** — the **Grammar discipline** paragraph in `SPEC/tasknote-selection.md` was reduced to a clause on the `Nest` row; the near-miss list moved into the canonical `SPEC.md` §"Long-description conventions", and the discoverability fix landed where rows get written (`templates/PLAN.md` grammar comment + the three filing skills' grammar pointer). The "row silently dispatches" consequence described adopter-runtime behavior, not flowtron's.

## 🎯 Goal

Add explicit grammar-discipline guidance to `SPEC/tasknote-selection.md` so
filing a real dependency uses the exact `Blocked by [[ID]]` wikilink grammar,
since near-miss variants silently fail to parse and leave the row looking
unblocked.

## ⚡ Notes

**Relevance:** Proceed — the gap is real and current. `SPEC.md`
§"Long-description conventions" already defines `Blocked by [[ID]]` as the
canonical, wikilink-only grammar (verified by reading the section and the
parser regex), but `SPEC/tasknote-selection.md`'s Downstream-impact
reconciliation section — the contract governing the `Nest` reconcile action,
which is exactly where a filing skill turns an impacted entry into "a
dependency of the new task" — says nothing about the required grammar. That
silence is what let caobunga CBN-123 F5 happen: three of three seeded rows
recorded the dependency in a form the parser doesn't match.

**Best Practices Review:** Contract-layer markdown only, no module touched.
Verified the parser mechanics before writing prose: `viz/src/parser.ts`'s
`BLOCKED_BY_BLOCK` regex matches the literal case-sensitive string
`Blocked by` followed by one or more `[[ID]]` wikilinks — no case-insensitive
flag, no bare-ID form, no synonym. So `Blocked on [[ID]]`, `Depends on
[[ID]]`, and free prose all fail silently (no parse error, just an empty
`Task.blockedBy`). Added the new paragraph directly after the existing
Reconcile actions table (the `Nest` row), matching the file's established
prose-paragraph-after-table style rather than inventing a new structure.

**Drift check:** No drift — `SPEC/tasknote-selection.md`'s Reconcile actions
table and `SPEC.md`'s `Blocked by [[ID]]` grammar definition are both current
and unchanged by this task; the new paragraph only cross-references them.

**Archive skim:** Grepped `.flowtron/tasknote/archive/` for `CBN-123` and
`Blocked on` — one hit (`archive/core/CORE-289.md`), an unrelated use of
"Blocked" as plain English, not the wikilink convention. No prior tasknote
has added this grammar-discipline warning; confirmed via `grep -c "Blocked
by" SPEC/tasknote-selection.md` returning `1` after the edit (no duplicate).
Also reviewed the sibling task `[[CORE-527]]` (blocked-by-closure-sweep,
same filing batch) for precedent — its Phase 4 sweep operates on the
*blocker* side of an already-correct clause, a distinct problem from this
task's *filing-time* grammar mistake; no overlap.

**Pattern survey:** Extended the existing shape — a bold-headed prose
paragraph placed adjacent to the table/rule it clarifies, the same pattern
`SPEC.md` uses for the superseded-claim pointer next to the closure box it
extends (per [[CORE-527]]'s Discovery Notes). No new heading, table, or
checklist introduced.

**Implementation:** One paragraph added to `SPEC/tasknote-selection.md`
directly after the Reconcile actions table, before "User-confirm gate". It:
(1) states the exact grammar (`Blocked by [[ID]]`, wikilink-only, cites
`SPEC.md` §"Long-description conventions"), (2) names the concrete near-miss
failure modes (`Blocked on`, `Depends on`, free prose, bare IDs) so a future
filer recognizes them before making the mistake, and (3) states the
consequence (empty `Task.blockedBy`, row dispatches as though unblocked) so
the rule reads as load-bearing rather than stylistic. Scoped to the `Nest`
reconcile action's real-world write point, with a clause extending it to
"any other motion in this contract that records a real, current blocker" so
it isn't misread as `Nest`-only.

**Docs touched:** No change to any of the 18 AI-referenced docs
(`.flowtron/tasknote/README.md` §"AI-referenced docs") — `SPEC/*.md` lazy
modules, including `tasknote-selection.md`, sit outside that sweep set by
design (same README section: "a volume decision, not a laziness one").

## ✅ Recap

Added a **Grammar discipline (Nest, and any dependency clause)** paragraph to
`SPEC/tasknote-selection.md`'s Downstream-impact reconciliation section,
immediately after the Reconcile actions table. It closes the gap that let
caobunga CBN-123 F5 happen: the file told filers to turn an impacted entry
into "a dependency of the new task" (the `Nest` action) without ever stating
the parser-required grammar, so three of three seeded rows in that incident
were written as `Blocked on [[ID]]` / free prose and silently dispatched as
unblocked. The new paragraph states the exact grammar (`Blocked by [[ID]]`,
wikilink-only), names the concrete near-miss forms that don't parse, and
states the silent-failure consequence.

Verified against `viz/src/parser.ts`'s `BLOCKED_BY_BLOCK` regex (case-
sensitive literal match, no bare-ID support) before writing the claim, so the
new prose describes actual parser behavior rather than the intended
convention. `grep -c "Blocked by" SPEC/tasknote-selection.md` confirms no
duplicate paragraph. No code path touched; no refactor; no docs outside
`SPEC/tasknote-selection.md` needed a mirror (the 18-doc sweep set excludes
`SPEC/*.md`, and no other file makes a claim this change would falsify).

**Archived:** 2026-09-06
