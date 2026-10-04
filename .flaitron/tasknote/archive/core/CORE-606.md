---
title: sidequest-stub-retirement
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: []
touches:
  - .flowtron/sidequest/CORE-587.md
  - .flowtron/sidequest/CORE-588.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - SPEC/procedures/ft-task.md
---

# CORE-606 | sidequest-stub-retirement

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Delete the two orphaned sidequest stubs left behind after CORE-587/588 were promoted and completed, and add an executable stub-retirement check to the three runners that actually promote a sidequest so the rule fires instead of sitting inert in `park-mode.md` + the glossary.

## ⚡ Notes

**Relevance:** Proceed — single-theme hygiene + one small executable-contract fix, both named explicitly in the PLAN.md line; no re-scope needed.
**Best Practices Review:** The delete-after-promotion rule already existed in prose (`park-mode.md` §Notes → "Promotion", `docs/GLOSSARY.md` "sidequest") but was never executable by the runner that actually promotes a stub — `/ft-task` and `/ft-micro-task` never read `park-mode.md` (that fragment loads only under `/ft-file-followup --park`). Placed the check at the one point each runner actually writes a fresh tasknote (`/ft-task` Step 3b, `/ft-micro-task` Step 2, SOP §3 "Absent" branch) rather than at literal "Step 0" — deleting the stub before confirming the run will actually scaffold (e.g. before the archive-collision / in-flight checks) risked losing a parked idea on a run that never promotes it. No refactor beyond the three insertions; nothing else in scope.
**Drift check:** PLAN.md line's citation (`park-mode.md:187` + glossary) matches current content exactly — confirmed both sources still state the rule and neither executes it. No divergence from the PLAN.md line.
**Archive skim:** `archive/core/CORE-359.3.md` (2026-07-16) did this exact cleanup once before for a different ID (`CORE-348`) — manual, one-off, no systemic fix — confirming this is a recurring gap and validating this task's systemic fix (the check, not just the delete) as the right scope. No other archived tasknote touches `park-mode.md` or the sidequest mechanism's promotion path.
**Declared scope:** see YAML `touches:` above.
**Pattern survey:** Followed the existing scaffold-step shape in both skills (a bold-prefixed callout inserted at the top of the relevant Step, mirroring how other skill-specific scaffold notes are written) and the SOP's existing branch-list shape (extended the "Absent →" bullet rather than adding a new bullet, since the check is inseparable from that branch). No new abstraction introduced.
**Implementation:** Deleted `.flowtron/sidequest/CORE-587.md` and `CORE-588.md` (both already `- [x]` in PLAN.md `## Completed`, archived at `archive/core/`). Added a "Sidequest-stub retirement" check to `claude/skills/ft-task/SKILL.md` Step 3b, `claude/skills/ft-micro-task/SKILL.md` Step 2, and `SPEC/procedures/ft-task.md` §3's "Absent" bullet — each checks for `.flowtron/sidequest/<TASK-ID>.md` and deletes it as part of the fresh-scaffold write, since a sidequest stub's ID never has a `.flowtron/tasknote/` file yet (promotion always lands on the "Absent"/Step 3b/Step 2 branch, never the starter or blocked branches). Verified context-budget CI check passes locally on all three edited files, and shipped-skill parity (`claude/skills` ↔ `codex/skills`) is unaffected since Codex/Cursor/Grok wrappers route through the now-updated `SPEC/procedures/ft-task.md` rather than duplicating the logic.
**Docs touched:** no change — `claude/skills/*/SKILL.md` and `SPEC/procedures/` are both explicitly excluded from the `.flowtron/tasknote/README.md` §"AI-referenced docs" sweep set (a volume decision, not a laziness one).

## ✅ Recap

Deleted the two orphaned sidequest stubs (`CORE-587.md`, `CORE-588.md`) — both had already been promoted and completed weeks ago but the stub-delete step was skipped, same failure mode CORE-359.3 fixed manually for `CORE-348` in 2026-07. Rather than repeat a one-off manual cleanup, added the missing executable check: `/ft-task` (Step 3b), `/ft-micro-task` (Step 2), and the agent-neutral SOP `SPEC/procedures/ft-task.md` (§3 "Absent" branch) now delete `.flowtron/sidequest/<TASK-ID>.md` as part of a fresh-scaffold promotion, closing the "rule stated where it can't fire" gap the audit named. `touches:` matches `git diff --name-only` exactly (2 deletions, 3 modifications, no undeclared paths). Context-budget CI check verified passing locally; no runtime test suite applies to markdown-only skill/SOP edits.

**Archived:** 2026-09-19
