---
title: receipt-not-transcript
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-614]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC.md
  - claude/skills/ft-task/SKILL.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-616 | receipt-not-transcript

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add one stack-neutral sentence to SPEC.md §"🧪 Phase 3" "The receipt" paragraph (mirrored in ft-task's Phase 3 bullet) clarifying that a receipt captures the runner's tail — exit code and first failure line — not a full transcript dump.

## ⚡ Notes

**Relevance:** Proceed — the PLAN.md line names the exact sentence and its two landing spots; no scope ambiguity.
**Best Practices Review:** Docs-only, no module boundary. DRY: SPEC.md defines the receipt contract; ft-task's Phase 3 bullet is a mirror, so both need the same clarifying clause, worded to fit each prose shape rather than copy-pasted verbatim.
**Drift check:** SPEC.md §"🧪 Phase 3: Testing & Linting" "The receipt" paragraph confirmed at line 467; ft-task's Phase 3 bullet (mirroring the Verification receipt box) confirmed at `claude/skills/ft-task/SKILL.md:172`. No SPEC contract conflict — this is an additive clarification, not a behavior change.
**Archive skim:** `archive/core/` has no note that previously touched this exact paragraph. [[CORE-614]] (dogfood-receipt-shape) is adjacent — it literalised DOGFOOD.md's session-reported receipt template — but touches a different file/consumer (operator-facing report, not the Testing Notes verification receipt this task's paragraph governs); no overlap or supersession. Quiet-reporter defaults (NAT-291) are explicitly out of scope per the PLAN.md line.
**Declared scope:** `SPEC.md`, `claude/skills/ft-task/SKILL.md` (see YAML `touches:`).
**Pattern survey:** Extends the existing "The receipt." bolded-lead-sentence paragraph shape in SPEC.md and the existing dense parenthetical shape in ft-task's Phase 3 bullet — no new structure introduced.
**Implementation:** SPEC.md — inserted "Capture the receipt, not the transcript: read the runner's tail — exit code and first failure line are the evidence." as a second sentence in "The receipt." paragraph, before the "Phase 3 runs those commands…" sentence. ft-task/SKILL.md — inserted a matching parenthetical clause ("the receipt, not the transcript: read the runner's tail, not its full scrollback") into the Phase 3 bullet's existing Verification-receipt parenthetical, right after "with the first failure line when non-zero".
**Docs touched:** Per `.flowtron/tasknote/README.md` §"AI-referenced docs" — `claude/skills/*/SKILL.md` sits outside the sweep set entirely, so `ft-task/SKILL.md` needs no entry. `SPEC.md` is the doc directly edited (self-consistent addition, not drift against another surface). All other sweep-set entries — no change; none references this paragraph.

## ✅ Recap

Added one clarifying sentence to SPEC.md's "The receipt." paragraph (§"🧪 Phase 3: Testing & Linting") and a matching parenthetical clause to ft-task's mirrored Phase 3 bullet, stating that a verification receipt is the runner's tail (exit code + first failure line), not a full transcript. `git diff --name-only` matches declared `touches:` exactly: `SPEC.md`, `claude/skills/ft-task/SKILL.md`. No refactor, no behavior change — prose clarification only, mirroring an existing distinction already implicit in both files' example/format.

**Archived:** 2026-09-19
