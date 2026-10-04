---
title: adopter-filing-check
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-494, CORE-531, CORE-533]
touches:
  - docs/CONVENTIONS.md
---

# CORE-534 | adopter-filing-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-494]] [[CORE-531]] [[CORE-533]]

## 🎯 Goal

Name, once, the failure class where a filed PLAN/SPEC line asserts a
consequence true of an adopter's own runtime as if it were flowtron's own
behavior — corrected twice already (CORE-494, CORE-531/533) — and state the
fix: verify each behavioral claim against `viz/src/parser.ts` before writing
the line.

## ⚡ Notes

**Relevance:** Proceed — the gap is real and current. Grepped `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, and `docs/GLOSSARY.md` for "adopter-filed" / "adopter filing" / "adopter-filing" before writing: no hit outside the PLAN.md line itself. The failure has fired twice (CORE-494, CORE-531/533) with no named contract to point at.
**Best Practices Review:** Docs-only, no module touched. Placed the new entry in `docs/CONVENTIONS.md` under "Adheres to," immediately after "Canonical source with labeled mirrors" — both are internal-authorship-discipline conventions (a class already present in that file despite its stated external-conventions scope), so it extends an existing precedent rather than opening a new one. `CONTRIBUTING.md` was the other option named on the PLAN line; declined because the failure recurs at PLAN.md/SPEC filing time, which `docs/CONVENTIONS.md` already governs (grammar, mirrors), not at GitHub issue/PR filing time, which is `CONTRIBUTING.md`'s scope.
**Drift check:** Re-read at HEAD before writing the claim: `SPEC.md` §"Long-description conventions" (:303-318) still carries the exact phrase "nothing that reads the field sees the dependency" that CORE-533 landed; `viz/src/parser.ts` remains the canonical parser SPEC points to. No SPEC contract contradicted — this is additive prose naming a pattern, not a rule change.
**Archive skim:** [[CORE-494]] read in full — the `[!unattended]` "drops the whole line" correction (true of caobunga's reader, not flowtron's `parsePlanWithDiagnostics().unparsed` fallthrough). [[CORE-531]] and [[CORE-533]] read in full — the "silently dispatches" claim and its replacement. `grep -rn "CORE-[0-9]" docs/CONVENTIONS.md` confirmed citing prior CORE IDs as historical justification (CORE-105, CORE-099.1/115/321, CORE-469, CORE-487) is the file's established pattern, followed here.
**Pattern survey:** Extended the existing "Adheres to" subsection shape (`### <name>` + prose + optional historical citation) rather than inventing a new heading level or table; mirrors "Canonical source with labeled mirrors"'s own citation-of-precedent style (that entry cites CORE-487).
**Implementation:** Added one `### Verify behavioral claims against flowtron's own source` subsection to `docs/CONVENTIONS.md` (+7/−0 lines), between "Canonical source with labeled mirrors" and "## Declines". States the rule (verify against `viz/src/parser.ts`, not an adopter's reimplementation or its observed behavior), why runtime-presupposing verbs ("dispatches") are a tell, and cites both prior corrections with their concrete before/after wording.
**Docs touched:** `docs/CONVENTIONS.md` — updated (deliverable). No other AI-referenced doc restates the task-line/PLAN-filing grammar in a way this contradicts or must mirror; the entry is discovery-only prose, not a new mechanism another surface would need to point at.

## ✅ Recap

Added a **Verify behavioral claims against flowtron's own source** entry to `docs/CONVENTIONS.md`'s "Adheres to" section, naming the failure class the PLAN line pointed at: a filed PLAN.md/SPEC line asserting a consequence of flowtron's own behavior that was actually only true of an adopter's independent reimplementation. Cites both prior corrections concretely — CORE-494's `[!unattended]` PLAN-line fix and CORE-531/533's "silently dispatches" → "nothing that reads the field sees the dependency" replacement — and states the fix as a filing-time check: verify each behavioral claim against `viz/src/parser.ts` before writing the line.

1 file, +7/−0. No code changed — docs-only edit, no test/typecheck/lint surface affected. `.editorconfig` hygiene (LF, no trailing whitespace, final newline) confirmed on the changed file. Refactors: none. Documentation verdict: the change is the deliverable. Maintainability effect: the next PLAN-line filer (self or an orchestrator like caobunga running a cross-repo sweep) has one named place to check before asserting a behavioral consequence, instead of the pattern recurring a third time.

**Archived:** 2026-09-06
