---
title: ft-debug spec-integration
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: [CORE-EPIC-195, CORE-195.1, CORE-195.2, CORE-195.3]
---

# CORE-195.4 | spec-integration

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-195]] · [[CORE-195.1]] · [[CORE-195.2]] · [[CORE-195.3]]

## 🎯 Goal

Land the `/ft-debug` SPEC integration: add a positioning bullet under §"When to use a tasknote (and when not to)" and bump §"Skill namespace" enumeration to include `ft-debug`; verify §"The 4-phase workflow" needs no debug-specific guidance fold-in per the [[CORE-195.1]] decision that debug methodology lives in the SKILL drive, not in the template.

## ✅ Acceptance

- [ ] `SPEC.md` §"When to use a tasknote (and when not to)" gains a "Run a debug tasknote (`/ft-debug <ID>`) when:" block positioning the skill for bugs and unexpected behavior; placed naturally within the existing flavor-block sequence
- [ ] `SPEC.md` §"Skill namespace" bundled-skill enumeration includes `/ft-debug` in the comma-separated list (joins the tasknote-runner cluster)
- [ ] `SPEC.md` §"The 4-phase workflow" verified unchanged — no debug-specific guidance fold-in needed; verification logged in Discovery Notes
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (SPEC.md gets the "updated" verdict; other entries assessed)
- [ ] PLAN.md line flipped to stub `Completed YYYY-MM-DD.` form and tasknote archived to `archive/core/`

## 🧩 Subtasks

- [ ] Re-read `SPEC.md` §"When to use a tasknote (and when not to)" full block to lock the right insertion point and matching tone/structure
- [ ] Re-read `SPEC.md` §"Skill namespace" enumeration to confirm the cluster ordering (tasknote-runner first, then meta/util, then audit family)
- [ ] Re-read `SPEC.md` §"The 4-phase workflow" headers + Phase 1/3 prose to verify no debug-specific guidance needs to be folded in
- [ ] Draft the new "Run a debug tasknote when:" bullet block (4 bullets max, matching existing flavor-block shape: filing conditions, not skill internals)
- [ ] Draft the §"Skill namespace" enumeration edit (single insertion point, preserving alphabetical/functional grouping)
- [ ] Phase 2: apply both edits to `SPEC.md` with `Edit`
- [ ] Phase 3: re-read both edited blocks for grammar / cross-ref integrity / no broken sentences; structural sweep for `ft-debug` mentions
- [ ] Phase 4: doc-drift sweep + flip `.4` PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-195]] — parent epic
- [[CORE-195.1]] — Discovery; resolved the spec-slot decision (§"When to use a tasknote" + §"Skill namespace") and the no-template-change decision
- [[CORE-195.2]] — sibling: authored the SKILL.md + command stub
- [[CORE-195.3]] — sibling: wired the 5 adopter-facing surfaces

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the [[CORE-195.1]] Discovery plan exactly: add a positioning bullet block under §"When to use a tasknote (and when not to)" and bump §"Skill namespace" to enumerate `/ft-debug`; verify §"The 4-phase workflow" needs no debug-specific fold-in. All structural decisions pre-resolved in .1 (no template change — debug methodology lives in the SKILL drive). Sibling .2 authored the SKILL+command; sibling .3 wired the 5 adopter surfaces. This child closes the contract-side integration so the spec mentions match the wiring landed in .2/.3.

- [x] Read relevant source files — `SPEC.md` §"Skill namespace" (lines 81-98, the enumeration to extend), §"When to use a tasknote (and when not to)" (lines 530-591, the flavor-block sequence), §"The 4-phase workflow" (lines 285-441, the verification target), §"Tasknote body shape" (lines 228-283, confirms template shape is standard); `_project/tasknote/archive/core/CORE-195.1.md` + `.2.md` + `.3.md` (sibling context); `_project/tasknote/archive/core/CORE-146.md` (direct precedent — added the `**File a micro-tasknote when:**` block to §"When to use a tasknote" using the same flavor-block shape).

- [x] **Archive skim** — `grep -l 'When to use a tasknote\|Skill namespace\|4-phase workflow' _project/tasknote/archive/core/*.md` surfaced ~50+ hits; load-bearing for this child: **[[CORE-146]]** (micro-task SPEC carve-out — established the "File a X when: / Skip the X when:" paired-block shape for adding new filing flavors to §"When to use a tasknote"), **[[CORE-138]]** (spec-model-grammar lock — recent §"Skill namespace"-adjacent edit pattern), **[[CORE-EPIC-211]]** children (gate-clarity-agent-neutral; touched the 4-phase prose recently — confirms the section currently makes no per-skill debug carve-outs). No archived tasknote has ever added a peer-to-`/ft-task` runner to §"When to use a tasknote"; [[CORE-146]]'s micro pattern is the closest analog and the model to mirror.

- [x] **Drift check:**
  - `SPEC.md` §"Skill namespace" enumeration (lines 83-89): ✅ matches the form expected; `/ft-close-epic` is the last tasknote-cluster entry before the meta/util/audit groups (`/ft-flowtron`, `/ft-stats`, `/ft-quality`, `/ft-audit-context`, audit family). `/ft-debug` joins right after `/ft-close-epic`.
  - `SPEC.md` §"When to use a tasknote (and when not to)" (lines 530-591): ✅ ends with the micro-tasknote pair (575-589) then the "When in doubt" closer (591). Insertion point: between line 589 and line 591 — the new `/ft-debug` pair joins the flavor-block sequence at the end, matching CORE-146's positioning of the micro pair after follow-up.
  - `SPEC.md` §"The 4-phase workflow" (lines 285-441): ✅ contains no per-skill debug references today; Phase 1 prose stays generic ("Relevance Assessment", "Archive skim", "Drift check"), Phase 2/3/4 reference no debug-specific cadence. Confirmed no fold-in needed — debug methodology (E/O capture → hypotheses → minimal repro → re-verify) lives inside `claude/skills/ft-debug/SKILL.md` Steps 4 + 6 per [[CORE-195.1]] decision #1 and the [[CORE-195.2]] authoring. The 4-phase shape stays generic across all tasknote runners.
  - `SPEC.md` §"Tasknote body shape" (228-283): ✅ also unchanged — `templates/tasknote-template.md` reused as-is per .1 decision.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed**. Explicit assumptions: (a) the §"When to use a tasknote" addition is a **paired block** ("Run a debug tasknote when:" + "Skip the debug tasknote when:") mirroring the established starter/follow-up/micro pattern, not a single bullet — the .1 plan's "Add bullet" wording was descriptive of scope-area, and every existing flavor in the section is filed as a pair; (b) placement is at the end of the flavor-block sequence (after the micro-tasknote pair, before "When in doubt..."), matching CORE-146's "append new flavor to end" pattern; (c) §"Skill namespace" enumeration insertion is right after `/ft-close-epic` (continues the tasknote-runner cluster — same logic [[CORE-195.3]] used for the ft-flowtron roster placement); (d) §"The 4-phase workflow" verification is a Discovery-Notes log entry only (no edit), since the .1 decision was to keep the 4-phase prose generic.

- [x] Subtasks above populated with concrete, ordered steps — initial scaffold list reviewed; reflects the two SPEC edits + the verification log + closure motion.

**Discovery Notes:**

**Edit plan:**

| # | SPEC.md section | Edit shape | Lines |
|---|---|---|---|
| 1 | §"When to use a tasknote (and when not to)" | New paired block after the micro-tasknote pair (between lines 589 and 591): "Run a debug tasknote (`/ft-debug <ID>`) when:" (3-4 bullets) + "Skip the debug tasknote (use `/ft-task` instead) when:" (3-4 bullets) | Insert ~12-16 new lines |
| 2 | §"Skill namespace" enumeration (lines 83-89) | Insert `/ft-debug` after `/ft-close-epic` to continue the tasknote-runner cluster | Modify 1 line (or split across 2 if the line wraps) |
| 3 | §"The 4-phase workflow" | **No edit** — verification only; debug methodology lives in SKILL drive per .1 decision #1 | 0 lines |

**Block draft (#1 above):**

```markdown
**Run a debug tasknote (`/ft-debug <ID>`) when:**

- The work is investigating a bug, regression, or other unexpected behavior where the root cause is not yet known
- Hypothesis-first cadence pays off: capturing expected vs. observed first, ranking hypotheses, and designing a minimal repro before code edits prevents shotgun-debugging
- The fix lives behind the investigation — Phase 1 produces the hypothesis, Phase 2 targets it, and Phase 3 re-verifies the same minimal repro to confirm the root cause (not just the symptom) is fixed

**Skip the debug tasknote (use `/ft-task` instead) when:**

- The work is feature-shaped, not bug-shaped — the goal is to *add* behavior, not to explain *unexpected* behavior
- The root cause is already known at filing time and the work is just landing the fix — `/ft-task`'s standard Phase 1 is enough
- The bug is trivial (typo, one-liner) — `/ft-task` (or the skip-the-tasknote rule above) is the right shape
```

A `/ft-debug` tasknote uses the same standard 4-phase template as `/ft-task`; the debug cadence (E/O → hypotheses → minimal repro → re-verify) lives inside the skill's Phase 1 and Phase 3 drive, not in the template itself. (Single trailing sentence; matches the trailing-paragraph pattern after the micro block at line 582.)

**Exit gate judgment** (default-skip flavor per ft-task Step 4): Discovery surfaced zero scope deviation from the .1 plan. The block-shape assumption (paired, not single) is a structural-consistency call, not a scope shift. Zero clarifying questions fired. **Discovery surfaced no significant deviation → skip 🛠️.** Proceeding directly to Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — read §"When to use a tasknote" lines 530-591 (the existing flavor-block sequence: starter, follow-up, micro pairs + trailing-paragraph notes) and §"Skill namespace" lines 81-98 (current enumeration shape, parenthesized comma-separated list). [[CORE-146]] (micro-task SPEC carve-out) confirmed the pattern: new flavor blocks append at the end of the section, mirror existing "File / Skip" paired shape, optionally followed by a single trailing paragraph clarifying tasknote-shape (matches line 582 micro-trailing pattern). Extended the existing pattern; no new shape justified.

- [x] Implemented the minimal solution
  - **Edit 1** — `SPEC.md` §"Skill namespace" enumeration (1 line modified): inserted `/ft-debug` after `/ft-close-epic` to continue the tasknote-runner cluster before the meta/util/audit groups.
  - **Edit 2** — `SPEC.md` §"When to use a tasknote (and when not to)" (16 new lines inserted between the micro pair and "When in doubt..." closer): "Run a debug tasknote when:" 3-bullet block + 1-line trailing-paragraph clarifying-template-shape + "Skip the debug tasknote when:" 3-bullet block. Mirrors the micro pair structure (line 575-589 was the model).
  - **No edit** — §"The 4-phase workflow" intentionally untouched per .1 decision #1 (debug methodology lives in SKILL drive, not template/spec).

- [x] Updated/added tests for non-trivial behavior — N/A (pure SPEC.md documentation edit; no executable surface; no parser/grammar change). The PLAN.md task-line grammar and viz parser are unaffected.

**Implementation Notes:**

- Total delta: 1 file (`SPEC.md`), 2 hunks, +17 net new lines.
- §"Skill namespace" enumeration placement (after `/ft-close-epic`, before `/ft-flowtron`) matches the cluster decisions made in [[CORE-195.3]] (ft-flowtron roster placement) — keeps the tasknote-runner cluster contiguous: `ft-task, ft-starter-task, ft-micro-task, ft-file-followup, ft-epic-discovery, ft-close-epic, ft-debug`.
- §"When to use a tasknote" trailing-paragraph after the "Run a debug tasknote" block intentionally mirrors line 582's micro trailing-paragraph shape (single explanatory sentence about tasknote-shape, no new bullets) — keeps the section visually rhythmic.
- The "Skip the debug tasknote" bullets are deliberately asymmetric with the "Run" bullets (3 each, but different axes: skip is about *task type* — feature/known-cause/trivial; run is about *investigative cadence*). Same asymmetry holds in the existing starter/micro pairs (file = capture conditions; skip = filing-mode mismatch).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure SPEC.md doc edit; no executable surface).

- [x] Ran lint/type-check on changed code — structural sweep: `grep -n "ft-debug" SPEC.md` returned 3 expected hits (line 86 namespace enumeration, line 591 paired-block heading, line 597 trailing-paragraph reference). Re-read lines 81-98 (namespace) and 584-605 (flavor-block sequence) — both edits read cleanly: list ordering preserved, paired-block shape matches surrounding starter/follow-up/micro flavors, no broken cross-refs, no stray punctuation, no fence/markdown issues. Bold heading + bullet syntax matches established style.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (SPEC.md edit; no UI/viz/browser surface).

**Testing Notes:**

The §"When to use a tasknote" addition mirrors the micro pair structure exactly (3 bullets + trailing-paragraph + 3 bullets), preserving section rhythm. The §"Skill namespace" enumeration insertion keeps the tasknote-runner cluster contiguous (`ft-task` through `ft-debug`) before the meta/util group (`ft-flowtron`, `ft-stats`, `ft-quality`, `ft-audit-context`) and the audit family. No viz parser surface touched (no PLAN.md grammar change). Phase 4 doc-drift sweep is the last gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change.
  - `SPEC.md` — **updated** (this task): §"Skill namespace" enumeration adds `/ft-debug` (line 86); §"When to use a tasknote (and when not to)" gains a "Run a debug tasknote / Skip the debug tasknote" paired block + trailing-paragraph clarifying-template-shape (lines 591-603).
  - `docs/MIGRATION.md` — no change (the §1.2 "six → seven" + §1.6/1.7/3.8 enumeration updates landed in [[CORE-195.3]]).
  - `claude/AGENTS-snippet.md` — no change (paste-block + symlink-list updates landed in [[CORE-195.3]]).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change (skill-count bumps 18→19 + "Six → Seven" enumeration landed in [[CORE-195.3]]).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-29.` and tasknote moved to `_project/tasknote/archive/core/CORE-195.4.md`.

- [x] Recap drafted (inline autonomous-commit per conditional-skip rule — diff is SPEC.md edit + tasknote close; no frontend, no privileged-ops, no perf concern).

**Final Summary:**

Closed the SPEC-side integration for `/ft-debug` (CORE-EPIC-195 child .4). Two edits to `SPEC.md`: §"Skill namespace" enumeration now includes `/ft-debug` in the tasknote-runner cluster (after `/ft-close-epic`); §"When to use a tasknote (and when not to)" gains a "Run a debug tasknote / Skip the debug tasknote" paired block (mirroring the established starter/follow-up/micro pattern) plus a single trailing sentence noting that the standard 4-phase template is reused — debug methodology lives in the skill drive. §"The 4-phase workflow" verified untouched per the [[CORE-195.1]] decision that debug methodology stays in `claude/skills/ft-debug/SKILL.md` Steps 4 + 6, not in the spec. 1 file changed, 2 hunks, +17 net new lines. The epic's audit subtask `.5` (final doc-drift sweep + cohort review) is the only remaining child.

**Archived:** 2026-05-29
