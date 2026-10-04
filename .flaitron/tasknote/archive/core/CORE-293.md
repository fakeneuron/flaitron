---
title: agents-skill-roster-gap
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-293 | agents-skill-roster-gap

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a one-liner bullet to AGENTS.md `## Workflow` naming `/ft-task` and peer skills, so flowtron-self agents are as invocation-directed as adopters are via the paste-block.

## ⚡ Notes

**Relevance:** Proceed — gap confirmed: AGENTS.md `## Workflow` names the phase sequence but not the skill invocations; adopter paste-block has explicit `/ft-task <ID>` + peer roster; flowtron-self agents lack that cue.
**Drift check:** AGENTS.md `## Workflow` bullet list ends at line 13 ("Lazy workflow modules…"); paragraph at lines 17–19 names the phases. No drift from PLAN.md description.
**Archive skim:** CORE-130 (filed five filing-skill symlinks for self-host) and CORE-132 (AGENTS.md edits) are the closest prior tasknotes. Neither added a skill-invocation bullet to the workflow list. CORE-129 (AGENTS.md migration) also didn't add it. Pattern: omission has persisted across multiple AGENTS.md passes.
**Pattern survey:** Paste-block bullet "Start a task with `/ft-task <TASK-ID>`…" + "Other filing skills…" is the reference shape. For self-host, condense to one bullet since the full paste-block detail isn't warranted — SPEC.md and skill SHORTNAMEs are available locally.
**Implementation:** Added one bullet after the "Lazy workflow modules" line: names `/ft-task` as the primary entry point + all peer skills with terse purpose labels. Follows the paste-block's enumeration order.
**Docs touched:** AGENTS.md updated (the change itself). No other AI-referenced docs affected.

## ✅ Recap

Added one bullet to `AGENTS.md ## Workflow` listing `/ft-task <TASK-ID>` as the primary invocation plus all peer skills with terse labels — closing the gap between the adopter paste-block and flowtron-self agent guidance.

**Archived:** 2026-06-06
