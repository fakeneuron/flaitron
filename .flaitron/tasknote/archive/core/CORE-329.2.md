---
title: ft-update-wiring-sync
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-329]
---

# CORE-329.2 | ft-update-wiring-sync

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-329]]

## 🎯 Goal

Sync the `/ft-update` wiring fan-out across its downstream doc consumers (`docs/MIGRATION.md`, `claude/skills/ft-new-project/SKILL.md`) and evaluate a standing snippet-count check for the `/ft-release` doc-drift sweep.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.2 wiring count reads ten and names `/ft-update` in the enumeration
- [x] `docs/MIGRATION.md` §1.6 staging block includes `.claude/commands/ft-update.md` + `.claude/skills/ft-update`
- [x] `claude/skills/ft-new-project/SKILL.md` Step 7 staging block includes the same two paths
- [x] `claude/skills/ft-new-project/SKILL.md` Step 8 says twenty symlinks and lists both `ft-update` readlinks
- [x] Standing snippet-count check (`grep -c "^ln -s" claude/AGENTS-snippet.md` vs the three consumer blocks) added to `/ft-release` §7.1 doc-drift sweep
- [x] All consumer blocks list exactly 20 paths, matching the canonical snippet's 20 `^ln -s` lines

## 🧩 Subtasks

- [x] Update `docs/MIGRATION.md` §1.2 sentence (nine→ten, add `/ft-update`); check §1.2 heading + §1.7 verify enumeration for the same staleness
- [x] Add the ft-update pair to `docs/MIGRATION.md` §1.6 staging block
- [x] Add the ft-update pair to `ft-new-project/SKILL.md` Step 7 staging block; update Step 3 heading enumeration
- [x] Update `ft-new-project/SKILL.md` Step 8: eighteen→twenty + 2 readlink lines
- [x] Append the standing snippet-count check to `ft-release/SKILL.md` §7.1
- [x] Verify: count paths in each consumer block against `grep -c "^ln -s" claude/AGENTS-snippet.md` (= 20)

## 🔗 Related

- [[CORE-EPIC-329]] — parent epic (adopter-surface-sync, audit-repo 2026-07-02)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Drift is real and verified at every cited site: canonical `claude/AGENTS-snippet.md` carries 20 `^ln -s` lines (ft-update pair added in `e8f492a`), while all three downstream consumers still describe the pre-ft-update 18-path wiring.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Root cause:** `e8f492a` ("docs: AGENTS-snippet — add ft-update to symlink wiring block") updated the canonical snippet to 20 `ln -s` lines but never touched the consumers. Exactly the "canonical-block fan-out drift" theme from audit-repo 2026-07-02.
- **Verified sites:** `docs/MIGRATION.md:63` says "wires nine — the seven tasknote family … plus two thin worktree utilities"; §1.6 staging block (lines 213–222) lists 18 `.claude/` paths; `ft-new-project/SKILL.md` Step 7 (lines 96–101) same 18 paths; Step 8 (line 114) says "all eighteen symlinks" with 18 readlink lines.
- **Same-fan-out enumeration sites also stale** (folded in as in-scope): MIGRATION §1.2 heading/sentence enumeration, §1.7 verify parenthetical command list, `ft-new-project` Step 3 heading — each enumerates the nine pre-ft-update skills and would contradict the new "ten" count if left.
- **Archive skim:** CORE-324.3 (consistency review, 2026-06-14) explicitly verified "ft-new-project symlink counts match MIGRATION" — true then; drift landed after, with `e8f492a`. CORE-272 introduced `/ft-update` itself. No other prior tasknote bears on these blocks.
- **Snippet-count check:** the "three consumers" are MIGRATION §1.6 staging block, ft-new-project Step 7 staging block, ft-new-project Step 8 readlink list. Check lands in `ft-release/SKILL.md` §7.1 (doc-drift sweep) as a standing one-liner.
- No clarifications needed. Explicit assumptions: (1) "consider a standing snippet-count check" is resolved as *implement it* — one short standing check appended to §7.1, cheap and it prevents exactly this drift class recurring; (2) the stale enumeration sites above are part of "sync the fan-out across downstream doc consumers" even though the PLAN line doesn't name them — heading edits contingent on no anchor links pointing at the old heading text (checked in Phase 2).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Every edit extends an existing enumeration or staging-block shape in place; ft-update pair placed after the worktree pair, mirroring the canonical snippet's ordering (commands then skills).
- `docs/MIGRATION.md`: §1.2 heading + sentence (nine→ten, `/ft-update` named with a one-clause role note), §1.6 staging block +2 paths, §1.7 verify parenthetical +`/ft-update`. Anchor-link check ran first — no markdown anchors reference the old heading text, so the heading edit is safe.
- `claude/skills/ft-new-project/SKILL.md`: Step 3 heading +`/ft-update`, Step 7 staging block +2 paths, Step 8 eighteen→twenty + 2 readlink lines.
- `claude/skills/ft-release/SKILL.md` §7.1: standing symlink-wiring count check added (count-relative, no hardcoded 20 — stays valid across future skill additions). "Consider" resolved as implement, per Discovery assumption.
- No tests to add — documentation/skill-prose change; verification is the deterministic count check (Phase 3).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Count verification: snippet `grep -c "^ln -s"` = 20; MIGRATION §1.6 block = 20 `.claude/` paths; ft-new-project Step 7 = 20 `.claude/` paths; Step 8 = 20 readlink lines. All four match.
- Stale-count sweep: `grep -rn "wires nine|eighteen symlinks"` across docs/, claude/, README.md, SPEC — zero hits remain.
- No code changed (markdown only; no md linter configured); no frontend surface → 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change (no wiring counts; glossary count is CORE-329.4's scope)
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — **updated by this task** (§1.2 heading + sentence, §1.6 staging block, §1.7 verify enumeration)
  - `claude/AGENTS-snippet.md` — no change (canonical block; already carried the 20-line wiring)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change (line 31 roster already names `/ft-update` among standalone skills; carries no wiring count)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-02.` (stays nested under the open CORE-EPIC-329 in `## High`; cohort moves to `## Completed` when the epic closes) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Synced the `/ft-update` wiring fan-out that `e8f492a` left behind: canonical `claude/AGENTS-snippet.md` had 20 `ln -s` lines while all three consumers still described the 18-path wiring. Fixed `docs/MIGRATION.md` (§1.2 nine→ten + heading + `/ft-update` role clause; §1.6 staging block +2 paths; §1.7 verify enumeration) and `claude/skills/ft-new-project/SKILL.md` (Step 3 heading; Step 7 staging block +2 paths; Step 8 eighteen→twenty + 2 readlink lines). Added a standing, count-relative symlink-wiring check to `claude/skills/ft-release/SKILL.md` §7.1 so future snippet additions that skip the fan-out are caught at release time. Verified all four blocks count exactly 20; zero stale "nine"/"eighteen" references remain.

**Archived:** 2026-07-02
