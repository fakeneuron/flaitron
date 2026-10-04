---
title: agents-skill-roster
status: completed
tags: []
created: 2026-06-13
due:
related-tasks: []
---

# CORE-315 | agents-skill-roster

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Sync the peer-skill roster in `AGENTS.md` with the adopter snippet roster in `claude/AGENTS-snippet.md` so both lists are identical, then consider a release-time drift check.

## ⚡ Notes

**Relevance:** Proceed — both surfaces missing `/ft-update`; straightforward two-file doc patch.
**Drift check:** AGENTS.md line 14 is the peer-skills bullet added by CORE-293; `claude/AGENTS-snippet.md` lines 16–20 are the pasted-block workflow bullets. Neither drift from their described positions.
**Archive skim:** CORE-293 (2026-06-06) added the peer-skills bullet to AGENTS.md for the first time, listing all skills current at that date but predating `/ft-update` shipping. CORE-226 fixed doc-drift in skill rosters elsewhere. No prior tasknote addressed `/ft-update` omission specifically.
**Pattern survey:** Both files use backtick inline-code form for skill names. Snippet adds a sentence-level bullet per skill group; AGENTS.md uses a condensed comma-list on one line. The snippet already has a dedicated "Bumping the pinned flowtron version" section outside the pasted block, so the new bullet inside the block stays brief.
**Implementation:** (1) Appended `, \`/ft-update\` (version bump)` to the peer-skills comma-list in `AGENTS.md:14`. (2) Added a new bullet after the `/ft-debug` bullet in the snippet's pasted block (inside the markdown fence), one-liner that names `/ft-update` and its action. Release-time drift-check idea deferred — not implemented; no mechanical check wired.
**Docs touched:** `AGENTS.md` and `claude/AGENTS-snippet.md` updated (the changes themselves). Both are AI-referenced surfaces; change is additive, no cross-ref breakage.

## ✅ Recap

Added `/ft-update (version bump)` to the peer-skills roster in `AGENTS.md:14` and added a brief `/ft-update` bullet to the pasted block in `claude/AGENTS-snippet.md` so both skill inventories are in sync. The release-time drift-check suggestion was noted but not implemented (out of micro-task scope).

**Archived:** 2026-06-13
