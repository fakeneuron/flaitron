---
title: task-counter-date-grep-anchor
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-613, CORE-610.2]
touches:
  - claude/skills/ft-release/step-7.1-standing-checks.md
---

# CORE-615 | task-counter-date-grep-anchor

[← PLAN.md](../PLAN.md) · ✅ Complete

## 🎯 Goal

Anchor the `/ft-release` §7.1 README task-counter date grep to the `**Archived:**` line start so it stops matching mid-bullet fixture text.

## ⚡ Notes

**Relevance:** Proceed — the PLAN.md line matches the actual bug: the unanchored grep at `step-7.1-standing-checks.md:102` literally matches CORE-610.2's mid-bullet fixture text (`\`**Archived:** 2026-09-20\`, \`status: in-progress\`...` on line 125 of that archived note), reporting a latest-archive date of 2026-09-20 instead of the real footer stamp 2026-09-19 — confirmed live by CORE-613's Recap (line 162).
**Best Practices Review:** Single-line grep pattern fix, no new abstraction. Checked sibling copies of the same date-format check (`ft-task/SKILL.md` pre-move gate, `ft-close-epic/SKILL.md` verify-then-move, Pair P in this same file) — all three already anchor with `^...$`; only this README task-counter grep was unanchored. No duplication introduced.
**Drift check:** PLAN.md line's citation (`step-7.1-standing-checks.md`) matches current code; no SPEC contract conflict — this is a bash fragment inside a `claude/skills/` file, not a SPEC module.
**Archive skim:** `archive/core/` skimmed via `grep -l step-7.1-standing-checks`; no prior tasknote touched this exact grep line. CORE-613's own Recap (Implementation Notes, line 162) is the source that surfaced and diagnosed this bug — reproduced independently here before fixing.
**Declared scope:** `touches: claude/skills/ft-release/step-7.1-standing-checks.md`
**Pattern survey:** Matched the anchoring convention already used by the two sibling stamp-format checks (`^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}$` in `ft-task`/`ft-close-epic`), minus the trailing `$` since this grep's `-o` output is consumed by `awk '{print $2}'` and the surrounding prose already discusses trailing-content tolerance (unfilled placeholders) — only the line-start anchor was the actual bug.
**Implementation:** Added `^` to the `grep -rhoE` pattern at `step-7.1-standing-checks.md:102` (line-start anchor). Added one sentence to the surrounding prose (line 105) explaining why the anchor is load-bearing, citing CORE-613/CORE-610.2/CORE-615 for future readers. Verification receipt: ran the exact fenced command from the file (`bash -c "$(sed -n '102p' step-7.1-standing-checks.md)"`) → `2026-04-28` / `2026-09-19` (correct), vs. the pre-fix unanchored version which returned `2026-04-28` / `2026-09-20` (wrong — matched CORE-610.2:125 fixture text instead of its real footer stamp at :153). No test suite covers markdown-embedded shell fragments; the command-output comparison is the verification. Structural quality assertions: N/A — one-line regex fix in a prose/shell fragment, no code module.
**Docs touched:** `.flowtron/tasknote/README.md` §"AI-referenced docs" — no change (the touched file, `step-7.1-standing-checks.md`, is a skill-internal fragment, not in that list).

## ✅ Recap

Anchored the `/ft-release` §7.1 README task-counter date grep (`step-7.1-standing-checks.md:102`) with a `^` line-start anchor, fixing the bug CORE-613 surfaced: the unanchored version matched CORE-610.2's mid-bullet fixture text (`**Archived:** 2026-09-20` embedded in a Testing Notes example at line 125) instead of only real `**Archived:**` footer stamps, misreporting the latest-archive date as one day in the future. Re-ran the fixed command: now correctly returns `2026-04-28` to `2026-09-19`. Added a one-line rationale to the surrounding prose so the anchor's purpose survives future edits. `touches:` scope reconciliation: `git diff --name-only` matches the declared single-file scope exactly. No refactors, no doc-drift (fragment is not in the AI-referenced docs list).

**Archived:** 2026-09-19
