---
title: ft-release-self-file-line
status: complete
tags: []
created: 2026-08-29
due:
related-tasks: [CORE-484]
touches:
  - claude/skills/ft-release/SKILL.md
---

# CORE-499 | ft-release-self-file-line

[← PLAN.md](../PLAN.md) · ✅ Complete

## 🎯 Goal

Let `/ft-release` draft and file its own pending `release v*` PLAN line when none exists, instead of bailing and sending the operator away to hand-file a one-liner first.

## ⚡ Notes

**Relevance:** Proceed — surfaced live: a `/ft-release` invocation bounced on zero matches, and the operator asked why the filing could not be built into the skill itself.

**Best Practices Review:** The bump-kind derivation the fallback needs already existed verbatim in Step 2, so the new Step 1.1 reuses that rule rather than inventing a second classifier — the two cannot disagree, and Step 1.1 hands its computed result forward so Step 2 does not re-derive it. ID suggestion follows `/ft-file-followup` Step 1's existing scan shape (PLAN + active tasknotes + archive, highest + 1). No new abstraction introduced.

**Drift check:** No drift. `SPEC.md:3` reads `**Version:** v5.21.0` and `git describe --tags --abbrev=0` agrees; Step 2's cited locations still resolve. The change adds a step, contradicting no SPEC contract.

**Archive skim:** `.flowtron/tasknote/archive/core/CORE-484.md` (the v5.21.0 cut) confirms the recipe this skill encodes and the `[medium]🧩` + `## Medium` conventions every prior `release v*` line uses; those are what Step 1.1 defaults to. No prior tasknote touches the skill's Step 1.

**Pattern survey:** Extended `/ft-file-followup`'s established "AI proposes, operator confirms before anything is written" filing shape — an `AskUserQuestion` gate with accept / edit / decline, never a silent write. The decline branch preserves the pre-change stop message verbatim, so the old behavior remains reachable.

**Implementation:** Added Step 1.1 to `claude/skills/ft-release/SKILL.md` as the zero-matches branch of Step 1 (+15/−4). It recomputes current version and bump kind, suggests the next free `CORE-<N>`, drafts shortname / model / long description, surfaces the whole line verbatim for confirm-or-edit, and on accept appends under `## Medium` before continuing as though Step 1 had matched. Two deliberate calls: (1) the filed line is **not** committed separately — flowtron's release history shows the pending line and its §7.3 flip-to-Completed have always landed inside the single release commit, so a standalone filing commit would be a new pattern, not the existing one; (2) a `git describe` / `SPEC.md` mismatch stops the same way Step 2 stops, so the fallback never files a fresh release line over already-broken state. Reworded the intro paragraph and the "Why no args" note to match. The Codex twin is an 8-line wrapper that reads this body, and no `SPEC/procedures/` SOP mirrors the release recipe, so no mirror surface needed updating.

**Docs touched:** No change — `claude/skills/*/SKILL.md` is outside `.flowtron/tasknote/README.md` §"AI-referenced docs" (lazily-loaded, per CORE-492). Release-gate mirror pairs B / E / J are unaffected: the change adds no flag, no slug, and no `argument-hint` (`/ft-release` still takes no args).

## ✅ Recap

`/ft-release` no longer dead-ends when PLAN carries no pending `release v*` line — it now derives the version and bump kind itself, proposes a task ID and a fully drafted line, and files it after an operator confirm. The filing gate is preserved rather than removed: the decision to cut still requires an explicit yes, it just no longer requires leaving the skill to hand-write a line first. An `/ft-audit` pass should know the filed line is intentionally left uncommitted for the release commit to carry, matching every prior cut.

**Archived:** 2026-08-29
