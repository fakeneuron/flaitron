---
title: ft-release-inline
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: []
---

# CORE-285 | ft-release-inline

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Make `/ft-release` drive the full release flow inline in one session instead of filing a task that requires a fresh `/ft-task` chat, with a context-size escape hatch that falls back to file+new-chat when context is large.

## ✅ Acceptance

- [ ] New "Step 2.5 — Context-budget self-assessment (escape hatch)" added to `claude/skills/ft-release/SKILL.md`, between Step 2 (version locked) and Step 3 (scaffold).
- [ ] **Comfortable** branch → proceed to Step 3 and drive inline (the unchanged default). **Tight** branch → surface an operator offer: drive inline now vs. defer to a fresh chat.
- [ ] Defer path: do NOT scaffold; the `release v*` PLAN line is already filed, so instruct the user to `/clear` and re-run `/ft-release` in a fresh session (clean context budget picks up the same pending line).
- [ ] Escape hatch documents that re-entry is `/ft-release` (not `/ft-task <ID>`) and why (recipe lives in this skill).
- [ ] Copy-paste cue uses the canonical 🧠 label line + `/ft-release` on its own line as inline-code, no trailing punctuation.
- [ ] Notes section gets a one-line pointer to the escape hatch.
- [ ] No other behavioral change; Part 1 (inline driving) left untouched; no downstream `Step N` cross-reference broken by the `2.5` insert.

## 🧩 Subtasks

- [ ] Draft "Step 2.5 — Context-budget self-assessment (escape hatch)" prose matching the skill's existing step voice.
- [ ] Insert between Step 2 and Step 3 (no renumber — `2.5` keeps all existing `Step N` headings intact).
- [ ] Add a Notes bullet pointing at the escape hatch.
- [ ] Grep the repo for `ft-release` + `Step ` cross-references to confirm the insert breaks none; markdown lint mental-pass (fenced blocks, cue shape).
- [ ] Closure (doc-drift sweep, PLAN flip, archive, recap, commit).

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [ ] **Relevance Assessment**

  **Verdict:** Proceed (scope: escape hatch only)
  **Rationale:** Part 1 of the task premise ("drive inline instead of a new `/ft-task` chat") is already satisfied by the current skill — recorded as a drift note, not a PLAN-line re-scope (the filed line still covers the live deliverable, Part 2, and becomes a `Completed` stub at closure today, so editing the long description now would be churn). Deliverable narrowed by best-judgement to **escape hatch only** (no self-file): preserves the deliberate pre-file guard. Trigger = self-assess + offer (operator's choice).

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` (full), `SPEC.md`, template.

- [x] **Archive skim** — narrowed `grep -l "skills/ft-release"` to 14 prior tasknotes. Most relevant: CORE-246/247/248/249 ("reconcile ft-release skill with release reality", commit 5f8b349), CORE-280 (viz test gate), CORE-267.x (gate wiring), CORE-174 (operator-gate cue alignment). These confirm the skill is the canonical driver and has been actively kept in sync with real cuts — it has driven inline for many releases.

- [x] **Drift check** — **DRIFT FOUND.** Task premise says make `/ft-release` "drive the full release flow in one session instead of filing a task that requires a new `/ft-task` chat." The current skill (Steps 3–8) **already** scaffolds + drives all 4 phases + commit/tag/push + post-closure inline in one session. There is no "file a task → open a fresh `/ft-task` chat" path. The genuinely-missing piece is the Part 2 escape hatch: `grep` confirms zero context-size / new-chat / defer language in the skill today. Global symlink → repo file, so editing `claude/skills/ft-release/SKILL.md` propagates.

- [x] Asked clarifying questions — surfaced the drift; user delegated scope ("use your best judgement" → escape-hatch-only) and picked the trigger ("self-assess + offer").

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- The skill requires a pre-filed `**<TASK-ID>** | release vX.Y.Z` PLAN.md line before it runs (preamble + Step 1; zero-match → "file a one-liner first, then run again"). One reading of "filing a task" = this pre-file requirement (a separate friction from the `/ft-task`-chat framing).
- Part 2 escape hatch is the clear net-new work: detect large context at invocation and suggest file+new-chat instead of driving inline.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched the skill's existing `## Step N` voice (imperative, SPEC-section refs, cue glyphs) and reused the canonical copy-paste cue shape (🧠 label line + own-line inline-code, no trailing punctuation) from Step 8 / SPEC §"Post-closure protocol".

- [x] Implemented the minimal solution — new `## Step 2.5` between Step 2 and Step 3; one Notes bullet.

- [x] Updated/added tests for non-trivial behavior — N/A (prose skill file; no executable behavior).

**Implementation Notes:**

- `claude/skills/ft-release/SKILL.md`: inserted `## Step 2.5 — Context-budget self-assessment (escape hatch)` (Comfortable → drive inline default; Tight → offer inline-vs-defer; defer = don't scaffold, re-run `/ft-release` in fresh chat). Added a Notes bullet. `Step 2.5` keeps all existing `Step 3..8` headings unrenumbered.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code; prose skill file).

- [x] Ran lint/type-check on changed code — markdown lint mental-pass: fenced-block balance even (20); both new openers tagged `markdown`; `grep` confirms no repo-wide `ft-release` + `Step N` cross-reference assumes adjacency, so the `2.5` insert breaks none.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- `grep -rn "ft-release" --include="*.md"` filtered to `Step [0-9]` → no external cross-references; only the skill itself. Step headings verified in order: 0, 1, 2, **2.5**, 3, 4, 5, 6, 7, 8.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: **no change**. Mentions are roster/name refs or "cuts a release" prose; none describe ft-release's step list. `docs/AGENT-COMPAT.md:84` cites `ft-release §5/§7` (dogfood gate) — the `Step 2.5` insert leaves Step 5/7 unrenumbered, so the ref stays valid.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-05.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-285.md`.

- [x] Recap drafted (inline on conditional skip — closure diff is prose-only, no signal trips).

**Final Summary:**

Added a context-budget escape hatch to `/ft-release` as a new `Step 2.5` between Step 2 (version locked) and Step 3 (scaffold): when remaining context looks tight for a full inline cut, the skill offers to defer the whole release to a fresh `/ft-release` chat — re-entry is `/ft-release` (not `/ft-task <ID>`), since the release recipe lives in this skill. Comfortable budgets skip the hatch and drive inline exactly as before. Part 1 of the filed premise ("drive inline in one session") was found already satisfied by the existing skill (drift, surfaced in Discovery); the delivered change is the previously-missing escape hatch only — no self-file, preserving the deliberate pre-file guard. Single-file edit + one Notes bullet; `Step 2.5` keeps all `Step 3..8` headings unrenumbered.

**Archived:** 2026-06-05
