---
title: cosmetic-sweep
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-329]
---

# CORE-329.4 | cosmetic-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-329]]

## 🎯 Goal

Strip the stale internal CORE-215.5 reference from the worktree command docs and close the glossary's ~52→~53 count gap by adding the missing `/ft-update` term.

## ✅ Acceptance

- [ ] `claude/commands/ft-worktree-start.md` no longer references CORE-215.5
- [ ] `claude/commands/ft-worktree-end.md` no longer references CORE-215.5 (same stale pattern, fixed for consistency)
- [ ] `docs/GLOSSARY.md` gains a new alphabetized `/ft-update` entry; real term count is 53
- [ ] `README.md:20` and `docs/GLOSSARY.md:7` counts read ~53, matching the true entry count

## 🧩 Subtasks

- [ ] Edit `claude/commands/ft-worktree-start.md:19` — drop the "plus the wiring in CORE-215.5" clause
- [ ] Edit `claude/commands/ft-worktree-end.md:19` — same stale clause
- [ ] Draft `/ft-update` glossary entry (alphabetical slot between `follow-up` and `grammar elements`)
- [ ] Insert the new entry into `docs/GLOSSARY.md`
- [ ] Update `docs/GLOSSARY.md:7` count ~52→~53
- [ ] Update `README.md:20` count ~52→~53
- [ ] Verify: real entry count in `docs/GLOSSARY.md` = 53

## 🔗 Related

- [[CORE-EPIC-329]] — parent epic (adopter-surface-sync, audit-repo 2026-07-02)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited issues are real once resolved with the user: the CORE-215.5 forward-reference is genuinely stale (task landed 2026-05-30, per PLAN.md:213), and the "~53" glossary count is achievable by adding the epic's own obvious missing term (`/ft-update`) rather than being a phantom drift.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **CORE-215.5 reference:** confirmed live at `claude/commands/ft-worktree-start.md:19` — "This skill + its end sibling (`/ft-worktree-end`) plus the wiring in CORE-215.5 complete the worktree-convention epic." CORE-215.5 completed 2026-05-30 (PLAN.md:213); the internal task-ID is dead weight for adopters who never had CORE-215.5 in their own PLAN. **Drift found:** the identical clause also lives at `claude/commands/ft-worktree-end.md:19` — the PLAN.md line only names the start file. Surfaced to the user; answer: fix both.
- **Glossary count:** counted real entries in `docs/GLOSSARY.md` precisely (excluding the bolded intro line 3 and the "Maintenance." footer line 117, neither of which is a term) — exactly 52. Both `README.md:20` ("~52 load-bearing terms") and `docs/GLOSSARY.md:7` ("~52 entries") already match reality. **Drift found:** no live count mismatch exists to "fix" mechanically; the PLAN line's ~52→~53 premise assumed a new term would land with this epic and none has yet. Surfaced to the user; answer: author a `/ft-update` entry (the epic's own subject — CORE-272 introduced the command, CORE-312/CORE-329.2 extended its wiring — and no glossary term currently documents it) to make the bump truthful, then update both counts.
- **Archive skim:** `.flowtron/tasknote/archive/core/` — CORE-215.6 (worktree epic audit) confirms CORE-215.5 shipped 2026-05-30 and enumerated the 5 wiring surfaces it touched (none were `claude/commands/*.md`, so the stale reference was never in scope for that cleanup). CORE-235 and CORE-244 previously refreshed the glossary count (~48→~53, then re-verified) but that was under a different term set — no direct file overlap with `/ft-update` today. CORE-324.4 (2026-06-14) was the last GLOSSARY.md touch, fixing two unrelated drift items ([model] label, PR-archetypes count); no residue affecting this task.
- No further clarifications needed beyond the two surfaced above; both resolved via AskUserQuestion before Phase 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey:** new glossary entry follows the exact existing shape (bold term — em-dash — one/two-sentence description — `See ...` pointer), placed at its correct alphabetical slot between `follow-up` and `grammar elements`. No new shape needed.
- `claude/commands/ft-worktree-start.md:19` and `ft-worktree-end.md:19` — dropped the "plus the wiring in CORE-215.5" clause from both files' closing sentence; kept the rest of the sentence (sibling cross-reference + workflow-orthogonal note) unchanged.
- `docs/GLOSSARY.md` — inserted the `/ft-update` entry (adopter-side submodule-bump command; cross-links docs/MIGRATION.md, notes it's the consumer-side counterpart to `/ft-release`); bumped the "~52 entries" line at `GLOSSARY.md:7` to "~53".
- `README.md:20` — bumped "~52 load-bearing terms" to "~53" to match.
- Swept the rest of the repo for other `CORE-215.5` references: `SKILL.md` files, `docs/WORKTREES.md`, and `docs/MIGRATION.md` also cite CORE-215.5, but those are legitimate historical documentation of what that task shipped (not internal-ID noise in user-facing command prose) — left as-is, consistent with the PLAN line's scope (the two `claude/commands/*.md` entrypoints only).
- No tests applicable — documentation-only change; verification is the deterministic count/grep checks below.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- No test suite applicable — markdown-only change, no code/behavioral logic (repo root has no markdown linter configured, consistent with prior doc-only tasknotes e.g. CORE-329.2).
- Verification performed via deterministic checks: real `docs/GLOSSARY.md` entry count = 53 (excluding the intro/footer prose lines); zero `CORE-215.5` hits remain in `claude/commands/ft-worktree-{start,end}.md`; `README.md:20` and `docs/GLOSSARY.md:7` both read "~53"; new entry sits in correct alphabetical slot between `follow-up` and `grammar elements`.
- No frontend surface touched → 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — **updated by this task** (glossary count ~52→~53 at line 20)
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change (its own CORE-215.5 reference at line 383 is a legitimate historical citation, out of this task's scope per the user's confirmed answer)
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - (`docs/GLOSSARY.md` is deliberately excluded from this list per its own Maintenance line, but is the primary artifact of this task — updated with the new `/ft-update` entry + count bump)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-02.` (stays nested under the open `CORE-EPIC-329` in `## High`; cohort moves to `## Completed` when the epic's `.5` audit closes) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Discovery surfaced that both cited premises needed the user's judgment before proceeding: the CORE-215.5 forward-reference existed identically in both worktree command docs (PLAN.md only named the start file), and the glossary's ~52→~53 count bump had no live drift to fix mechanically — the real count already matched the "~52" text in both README.md and GLOSSARY.md, so hitting 53 required authoring a genuinely new term. User chose to fix both worktree files and to add a `/ft-update` glossary entry (the epic's own subject, previously undocumented).

Technical: stripped the stale "plus the wiring in CORE-215.5" clause from `claude/commands/ft-worktree-start.md:19` and `ft-worktree-end.md:19`. Added a new alphabetized `/ft-update` term to `docs/GLOSSARY.md` (between `follow-up` and `grammar elements`), bumped the entry-count text at `docs/GLOSSARY.md:7` and `README.md:20` from ~52 to ~53. Verified: real entry count = 53 (excluding intro/footer prose lines), zero remaining `CORE-215.5` hits in either command doc, both count references match. 4 files touched, doc-only change, no code/tests.

**Archived:** 2026-07-02
