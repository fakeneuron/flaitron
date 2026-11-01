---
title: workflow-replace-fence-aware
status: completed
tags: []
created: 2026-11-01
due:
related-tasks: [CORE-852.6, CORE-852.4, CORE-854]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-update/SKILL.md
  - .flaitron/PLAN.md
  - .flaitron/sidequest/CORE-853.md
---

# CORE-853 | workflow-replace-fence-aware

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-852.6]] [[CORE-854]]

## 🎯 Goal

Make the AGENTS.md `## Workflow` replace ignore `#` lines inside code fences, in `tools/update-adopters.mjs` and in `/ft-update` Step 3.5.

## ✅ Acceptance

- [x] A fenced `# comment` inside the Workflow section no longer ends it; the whole section (fence included) is replaced — `node --test tools/update-adopters.test.mjs`
- [x] A fenced `## Workflow` neither counts toward the doubled-heading skip nor is taken as the section start — same suite
- [x] `claude/skills/ft-update/SKILL.md` Step 3.5 states the fence-aware rule, matching the updater — `judgment` (prose mirror; no command decides it)

## 🧩 Subtasks

- [x] Fence-aware heading scan in the updater (`headingLines` / `workflowHeadings`), used by `replaceWorkflowSection` and the follow-through heading count
- [x] Unit + integration tests; confirm both fail on the old code
- [x] Mirror the rule in `/ft-update` Step 3.5

## 🔗 Related

- [[CORE-852.6]] — parent; parked this from its Phase 3 external review (finding #3)
- [[CORE-852.4]] — introduced the Workflow replace in the updater
- [[CORE-854]] — release v8.2.0; operator asked to fix this inline before the cut ships `/ft-update`'s new Workflow replace

---

## ⚡ Notes

**Relevance:** Proceed — v8.2.0 is the first release whose `/ft-update` writes the Workflow block; the operator chose to fix this before the cut rather than ship a caution note.
**Best Practices Review:** One private scanner (`headingLines`) feeds both heading consumers, so the section start, section end and doubled-heading count can't disagree. No new exports.
**Archive skim:** CORE-852.4 (updater follow-through) and CORE-852.6 (skill parity) own these paths; the sidequest stub is the whole prior context.
**Drift check:** `WORKFLOW_HEADING` / `SECTION_END` at `tools/update-adopters.mjs:1003-1004`, used at `replaceWorkflowSection` and the `followThrough` heading count, as the stub cited. `/ft-update` Step 3.5 said "a `#` line inside a code fence counts too", which matched the old behaviour.
**Clarifications:** Operator: "can we fix inline?" Assumptions: CommonMark fences (``` or ~~~, ≤3 spaces of indent, closed by an equal-or-longer run of the same character with only whitespace after it); an unclosed fence runs to EOF, so nothing after it is a heading.
**Pattern survey:** Extends the existing line-by-line scan. `wiringFromSnippet`'s ```sh fence toggle (~:588) is narrower, scoped to one fence kind, and was left alone.
**Implementation:** `FENCE` regex + `headingLines(lines)` (per-line heading-candidate mask) + `workflowHeadings(lines)`. `replaceWorkflowSection` takes its start from `workflowHeadings` and its end from the first unfenced H1/H2. `followThrough` counts with `workflowHeadings`. Step 3.5's sentence now states the fence rule.
**Verification receipt:** `node --test tools/update-adopters.test.mjs` → 0 (122/122). The two new CORE-853 tests run against the stashed old `update-adopters.mjs` → 2 fail. `node --check` on both files → 0. `bash tools/drift-checks.sh` → 0.
**External review:** N/A. Small, test-pinned fix inside the release session; the CORE-854 §7.1 sweep reads the skill mirror.
**Docs touched:** `claude/skills/ft-update/SKILL.md` updated (Step 3.5 fence rule). Every other AI-referenced entry: no change. Learnings: N/A.

**Final Summary:** The fleet updater's and `/ft-update`'s AGENTS.md `## Workflow` replace now skips lines inside code fences. A fenced `# comment` no longer cuts a customized section off mid-fence, and a fenced `## Workflow` no longer trips the doubled-heading skip. Pinned by a unit test and an apply-mode integration test, both of which fail on the old code.

**Archived:** 2026-11-01
