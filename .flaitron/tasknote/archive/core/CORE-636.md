---
title: Remove dead root .claudeignore
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-632.N, CORE-632.3]
touches:
  - .claudeignore
---

# CORE-636 | Remove dead root .claudeignore

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-632.N]] [[CORE-632.3]]

## 🎯 Goal

Delete flowtron's dead root `.claudeignore` (`SCRATCH.md`, which no longer exists) since Claude Code has no `.claudeignore` mechanism to begin with.

## ✅ Acceptance

- [x] Root `.claudeignore` removed — `test ! -f .claudeignore`
- [x] No stray live reference to `.claudeignore` outside `.flowtron/` other than `docs/MIGRATION.md`'s "there is no `.claudeignore`" sentence — `git grep -n claudeignore -- . ':!.flowtron'`

## 🧩 Subtasks

- [x] `git rm .claudeignore`
- [x] Re-verify `git grep -n claudeignore -- . ':!.flowtron'` hits only the MIGRATION §1.1 sentence
- [x] Closure: flip PLAN.md stub, archive tasknote

## 🔗 Related

- [[CORE-632.N]] — adopter-footprint audit that surfaced this as a follow-up candidate (park-low)
- [[CORE-632.3]] — verified Claude Code has no `.claudeignore` mechanism (the documented control is a `Read` deny rule)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both facts the PLAN line and sidequest stub assert still hold at HEAD (checked below). Nothing has changed since CORE-632.N filed this as a follow-up.

- [x] Read relevant source files — root `.claudeignore` (one line, `SCRATCH.md`) and the sidequest stub `.flowtron/sidequest/CORE-636.md` (now retired per promotion rule).

- [x] **Best Practices Review** — N/A: single dead-file deletion, no code surface, no module boundary touched.

- [x] **Archive skim** — `grep -l claudeignore archive/core/*.md` → `CORE-483.N`, `CORE-483.3` (screenshot-discipline epic; natabula-side `.claudeignore`/`.cursorignore` deposits, unrelated to this repo's root file), `CORE-632.3`, `CORE-632.N` (source of this follow-up). No prior tasknote touched flowtron-self's root `.claudeignore` other than the original filing (`CORE-029`, commit `a6e4f47`, per CORE-632.N's `git log -- .claudeignore`). No blocking decision found.

- [x] **Drift check (HEAD, 2026-09-20).** `cat .claudeignore` → still exactly `SCRATCH.md` (unchanged since CORE-029). `git grep -n claudeignore -- . ':!.flowtron'` → exactly one hit, `docs/MIGRATION.md:60`, the "there is no `.claudeignore`" sentence — matches the sidequest's expected verification exactly. No SPEC contract touched; PLAN.md line matches the sidequest stub's description.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Assumption: this is a plain `git rm` with a post-removal grep check, no other file touches the removed path, and the sidequest stub's verification command is the acceptance bar.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** Sidequest stub (`.flowtron/sidequest/CORE-636.md`, filed by CORE-632.N) retired per the promotion rule (`ft-file-followup/park-mode.md` §Notes → "Promotion"). No new information beyond what CORE-632.N already established — this is a mechanical follow-through on an audit finding.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: single dead-file deletion, no pattern to extend.

- [x] **Minimal refactor gate** — N/A: no code touched, no refactor opportunity.

- [x] Implemented the minimal solution — `git rm .claudeignore`.

- [x] Updated/added tests for non-trivial behavior — N/A: no behavior, a stale file removal.

**Implementation Notes:** `git rm .claudeignore` staged the deletion. No other file references the removed path.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code, no test surface.

- [x] Ran lint/type-check on changed code — N/A: no code touched.

- [x] **Verification receipt** — recorded below. No avoidable duplication/dead code/complexity/doc drift: the file itself was the dead artifact.

- [x] (frontend) Asked the user for visual confirmation — N/A: not a frontend change.

**Testing Notes:**
- `test ! -f .claudeignore` → 0 (file absent)
- `git grep -n claudeignore -- . ':!.flowtron'` → exit 0, exactly one line: `docs/MIGRATION.md:60`, the "there is no `.claudeignore`" sentence — matches Acceptance.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `.flowtron/tasknote/README.md` §"AI-referenced docs": no change to any listed doc. `docs/MIGRATION.md` §1.1 already correctly states "there is no `.claudeignore`" (fixed by CORE-632.3); this deletion makes that sentence fully accurate with no further doc edit needed.

- [x] Closed — both Acceptance criteria met; YAML `status:` flipped to `completed`; PLAN.md line flipped to `Completed 2026-09-20.` stub form at the top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:** Removed flowtron's dead root `.claudeignore` (one line, `SCRATCH.md`, filed by CORE-029 `a6e4f47`) — the file it referenced no longer exists, and CORE-632.3 already established Claude Code has no `.claudeignore` mechanism. `git rm .claudeignore` (1 file, −1 line). Verification: `test ! -f .claudeignore` → true; `git grep -n claudeignore -- . ':!.flowtron'` → exactly one hit, `docs/MIGRATION.md:60`'s "there is no `.claudeignore`" sentence, which is the permitted/expected form. No refactor, no test, no doc change needed. `touches:` reconciliation: declared `.claudeignore`; `git diff --name-only` = `.claudeignore` + this tasknote + `PLAN.md` — matches. Maintainability: one fewer stale artifact; the repo no longer implies a control that doesn't exist for the tool it names.

**Archived:** 2026-09-20
