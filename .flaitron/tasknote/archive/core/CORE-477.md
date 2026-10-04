---
title: claude-example-flag-drift
status: completed
tags: []
created: 2026-08-25
due:
related-tasks: [CORE-476, CORE-460.3]
touches:
  - docs/PLATFORMS.md
---

# CORE-477 | claude-example-flag-drift

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-476]] · [[CORE-460.3]]

## 🎯 Goal

De-enumerate `docs/PLATFORMS.md` §"Worked example: Claude Code"'s stale two-bullet
operator-flag prose (missing `--unattended` and `--deep`) to a pointer at
`claude/CAPABILITIES.md`, the flags' actual source of truth.

## ⚡ Notes

**Relevance:** Proceed — the drift is live at HEAD exactly as the PLAN line
describes: the "Operator force-skip flag" / "Operator mode flag" bullets named
only `--fast`, `--debug`, `--park`, `--worktree`, missing `--unattended`
(shipped) and `--deep` (shipped). No gate reads this prose — Pair I in
`/ft-release` §7.1 scopes to §"Non-Claude capability triggers" only, and Pair G
greps `docs/PLATFORMS.md` whole-file for `--worktree`, satisfied elsewhere in
the file regardless of this bullet's content.

**Best Practices Review:** No code; documentation-only. Followed the CORE-460.3
precedent exactly: replace a prose enumeration that can silently go stale with
a single §-pointer to the section that actually enumerates. Confirmed every
fact in the old bullets (fragment names `step-4-debug-mode.md` / `park-mode.md`,
the `/ft-spec` + `/ft-refactor` separate-`--fast` caveat, the `--worktree`
handoff behavior) is already documented in `claude/CAPABILITIES.md`'s flag-row
table — the bullets were pure restatement, so full de-enumeration loses no
information. No refactor beyond the one collapsed bullet; nothing deferred.

**Drift check:** PLAN line's claim (missing `--unattended`, now also `--deep`)
verified against HEAD before editing — confirmed. No SPEC contract touched;
this is prose-only, non-gated.

**Archive skim:** [[CORE-460.3]] authored the exact pattern being extended here
— de-enumerated the Cursor/Grok worked-example operator-flag bullets (and two
other prose asides) to `§"Non-Claude capability triggers"` pointers, minting
Pair I to hold the two remaining enumerating tables to `claude/CAPABILITIES.md`.
[[CORE-476]] (immediately prior, same area) added `--deep`'s Pair I row and its
own recap explicitly named this Claude worked-example prose as "a flag short
since `--unattended` shipped, independent of `--deep`" — flagging but
deliberately not fixing it, which is why this follow-up exists. Confirmed via
`grep -rn "Operator force-skip flag\|Operator mode flag"` that no other live
doc restates the removed bullets (one unrelated generic checklist row remains
untouched at `docs/PLATFORMS.md:248`; one archived tasknote reference is
historical).

**Pattern survey:** Reused the exact idiom the three non-Claude worked
examples already use ("**Operator flags**: ... — per-flag detail ... below"),
adapted because Claude is the flags' native home rather than a mirror: point
straight at `claude/CAPABILITIES.md` §"The triggers" instead of a within-file
section, using the same relative-link shape already established at
`docs/PLATFORMS.md:379` (`[`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md)`).

**Implementation:** Collapsed the two stale bullets (`docs/PLATFORMS.md`,
former lines 270–282) into one: `**Operator flags**: canonical roster,
per-flag syntax, gate behavior, and when to reach for each in
[`../claude/CAPABILITIES.md`](../claude/CAPABILITIES.md) §"The triggers" —
these flags are Claude-native, so this worked example is their home, not a
mirror`. No flag names re-listed, so a future flag (or a renamed one) cannot
strand this bullet the way `--unattended` and `--deep` did.

**Docs touched:** `docs/PLATFORMS.md` — updated (one bullet collapsed, both
stale flags now covered by the pointer). Confirmed via targeted grep that no
other entry in `.flowtron/tasknote/README.md` §"AI-referenced docs" restates
the removed bullets' content — `claude/CAPABILITIES.md` is the pointer target,
read but not edited; all 15 remaining entries carry no reference to the
removed prose. No change to any of them.

## ✅ Recap

Fixed the two-flag drift the PLAN line named: `docs/PLATFORMS.md` §"Worked
example: Claude Code" enumerated operator flags in prose and had been missing
`--unattended` since it shipped, then `--deep` on top of that — and no gate
caught it, since Pair I scopes to the non-Claude mirror tables and Pair G's
whole-file `--worktree` grep was satisfied elsewhere regardless. Collapsed the
two stale bullets into one pointer at `claude/CAPABILITIES.md` §"The triggers",
the flags' actual source of truth, following the exact de-enumeration idiom
[[CORE-460.3]] used for the non-Claude worked-example asides. Verified every
fact in the removed prose (fragment names, the `/ft-spec`/`/ft-refactor`
separate-`--fast` caveat, `--worktree` handoff behavior) is already carried by
`CAPABILITIES.md`'s flag table, so nothing was lost — and because no flag name
is re-listed in the new bullet, a future flag addition or rename can't strand
it the way this drift arose twice.

**Changed:** 1 file, `docs/PLATFORMS.md` (−13 / +4 lines: two bullets → one
pointer bullet).

**Verification:** Re-ran Pairs F, G, and I from `/ft-release` §7.1 at HEAD
after the edit — all three print nothing (no regression from the
de-enumeration; `--worktree` presence for Pair G still holds via the
non-Claude trigger tables, untouched by this edit).

**Refactors:** none beyond the one collapsed bullet, which was the task.

**Maintainability:** net −1 mirror. The Claude worked example no longer
restates a flag roster that can (and twice did) drift from
`claude/CAPABILITIES.md`; it now points at the source instead.

**Archived:** 2026-08-25
