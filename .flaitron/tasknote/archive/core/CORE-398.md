---
title: wrapper-invoke-name-sweep
status: completed
tags: [skills, commands, hygiene]
created: 2026-08-02
due:
related-tasks: [CORE-396, CORE-104]
---

# CORE-398 | wrapper-invoke-name-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Sweep the 16 pre-CORE-104 "Invoke the `X` skill" sentences in `claude/commands/*.md` to the real `ft-*` skill names, settle the ft-audit fork-case wording, and leave a grep-able invariant so the class can't silently recur.

## ⚡ Notes

**Relevance:** Proceed — grep at execution time confirmed the filed state exactly (16 wrappers on pre-CORE-104 unprefixed names; only ft-audit-repo + ft-spec correct); purely mechanical.
**Best Practices Review:** Wrappers are single-sentence dispatch prose with no shared abstraction to extend; the fork-case is handled inside `ft-audit.md` itself with a parenthetical so the one file serves both namespaces (upstream `ft-audit`, fork `audit`) — no duplication introduced, no deferred cleanup.
**Drift check:** no drift — PLAN line's claims (16 stale, 2 correct, MIGRATION §1.2.1 fork-drops-prefix rule) all verified against current files; no SPEC contradiction.
**Archive skim:** recent archive hits touching `claude/commands/` (CORE-389.*, CORE-390, CORE-391, CORE-392, CORE-394) are folds/retirements/symlink work — none touched invoke sentences; no constraints.
**Pattern survey:** extended the shape of the two newest wrappers (ft-audit-repo, ft-spec), which already name the full prefixed skill in the invoke sentence.
**Implementation:** perl loop rewrote `Invoke the \`<short>\` skill` → `Invoke the \`ft-<short>\` skill` across 16 wrappers. `ft-audit.md` additionally gained the fork-case parenthetical `(in a forked install, your fork's local name — e.g. \`audit\`)` — decided because MIGRATION §1.2.1's both fork paths copy this wrapper verbatim into `.claude/commands/$SKILL.md`. The optional grep-able invariant landed as a new paragraph + check snippet in `SPEC.md` §"Skill namespace" (wrapper must name its own basename); check runs clean on all 18.
**Docs touched:** `SPEC.md` §"Skill namespace" — invariant paragraph added (in-task deliverable). GLOSSARY / CAPABILITIES / PLATFORMS / AGENT-COMPAT / MIGRATION — no change (none quote wrapper invoke sentences).

## ✅ Recap

17 files, ~20 changed lines: 16 one-line wrapper swaps to prefixed `ft-*` invoke names, `ft-audit.md` fork-case parenthetical (wrapper ships verbatim into forks, so it names both namespaces), and a grep-able wrapper-name invariant + check snippet added to `SPEC.md` §"Skill namespace". Verification: the invariant check prints nothing across all 18 wrappers. No refactors deferred; closes the last known residue of the CORE-104 rename. Landed before [[CORE-396]] so v5.15.0 adopters inherit clean wrappers.

**Archived:** 2026-08-02
