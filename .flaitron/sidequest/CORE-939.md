---
title: ft-update-fence-close-prose
status: sidequest
priority: Low
pickup: next-chat
created: 2026-11-24
parent: CORE-920.4
---

# CORE-939 | ft-update-fence-close-prose

[← PLAN.md](../PLAN.md) · 📌 Sidequest (filed 2026-11-24)

## Idea

`claude/skills/ft-update/SKILL.md` Step 3.5 says a "same-length" backtick line closes the paste fence, but `tools/update-adopters/text.mjs` `fenceOpeners` closes on any backtick run at least as long as the opener. An agent following the prose by hand would read a longer closer as body text. Reword the prose to "at least as long". Surfaced by CORE-920.4's External review.

## Resume anchor

CORE-920.4 Phase 3: External review notes being fixed or filed; next is the second park (reconciled_pin header claim), then Testing Notes and closure.
