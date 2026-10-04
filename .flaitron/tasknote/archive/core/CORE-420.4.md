---
title: sidequest back-link depth
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: [CORE-EPIC-420]
---

# CORE-420.4 | sidequest back-link depth

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-420]]

## 🎯 Goal

Fix `templates/sidequest-template.md`'s back-link so it correctly points to `PLAN.md` from `.flowtron/sidequest/`.

## ✅ Acceptance

- [ ] `templates/sidequest-template.md:12` back-link reads `../PLAN.md`, matching `.flowtron/sidequest/<ID>.md` → `.flowtron/PLAN.md`'s one-level depth
- [ ] Doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Edit `templates/sidequest-template.md:12` (`../../PLAN.md` → `../PLAN.md`)
- [ ] Verify: repo-wide re-grep for the stale string returns zero live hits

## 🔗 Related

- [[CORE-EPIC-420]] — parent epic (release-surface-sync)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed at HEAD — `templates/sidequest-template.md:12` still reads `../../PLAN.md`, and `/ft-file-followup --park` still writes stubs to `.flowtron/sidequest/<ID>.md` (per `park-mode.md:91`). One level up from `.flowtron/sidequest/` is `.flowtron/`, where `PLAN.md` actually lives, so `../../PLAN.md` resolves outside `.flowtron/` entirely — a dead link, exactly as filed. Purely mechanical one-line fix, no contract change.

- [x] Read relevant source files — `templates/sidequest-template.md` (full, 20 lines), `templates/tasknote-template.md:12` (sibling back-link for depth comparison), `SPEC/epic.md` (child-placement contract), `claude/skills/ft-file-followup/park-mode.md` (park-mode write target), `claude/skills/ft-file-followup/SKILL.md` (sidequest dir references). Read set narrow; no probe needed.

- [x] **Best Practices Review** — `N/A` — single relative-path correction in a markdown template; no code module, dependency direction, or abstraction boundary in scope.

- [x] **Archive skim** — `grep -l "sidequest-template"` over `.flowtron/tasknote/archive/core/*.md` hit `CORE-408.2`, `CORE-368`, `CORE-408.3`, `CORE-391` — none touched the back-link path itself (they added the probe template, audited `--fast` staleness, documented `## 🔄 Handoff`, and folded `/ft-sidequest` into `/ft-file-followup --park` respectively). No prior tasknote already fixed this link; confirms it's a live, unaddressed bug. `CORE-420.2` (sibling epic child) is the pattern reference for a mirror-fix tasknote shape (verified state table, sibling-drift check, exhaustive re-grep verification).

- [x] **Drift check** — task description's file path (`templates/sidequest-template.md`) and claim (`../../PLAN.md`) verified at HEAD, still accurate. Confirmed the fix target: `templates/tasknote-template.md:12` (same one-level depth, `.flowtron/tasknote/` → `.flowtron/`) already uses `../PLAN.md`, so `../PLAN.md` is the established sibling pattern, not a new choice. No SPEC contract touched; no PLAN.md divergence.

- [x] Asked clarifying questions — none needed; single unambiguous one-line fix with a same-repo precedent (`tasknote-template.md:12`) for the correct depth.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Depth verification.** `.flowtron/sidequest/<ID>.md` and `.flowtron/tasknote/<ID>.md` are siblings, both one directory level under `.flowtron/` where `PLAN.md` lives. `templates/tasknote-template.md:12` already encodes this correctly as `../PLAN.md`. `templates/sidequest-template.md:12` encodes `../../PLAN.md` (two levels), which resolves to the parent of `.flowtron/` — outside the submodule/self-host boundary, a dead link. Fix: match the established sibling pattern exactly.

**Sibling-drift check.** `grep -rn '\.\./\.\./PLAN\.md' --include='*.md'` (excluding `/archive/`) returns exactly two hits: the PLAN.md task-line description itself (expected, quotes the bug) and `templates/sidequest-template.md:12` (the fix target). No other file carries the same stale pattern — single-file fix, no epic-style scope widening needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — matched `templates/tasknote-template.md:12`'s existing `../PLAN.md` back-link verbatim (same one-level sibling depth); no new phrasing or path shape invented.

- [x] **Minimal refactor gate** — `N/A` — single-character path correction; nothing structural, nothing deferred.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown link text only.

**Implementation Notes:**

One-line edit: `templates/sidequest-template.md:12` `../../PLAN.md` → `../PLAN.md`. Matches `templates/tasknote-template.md:12`'s already-correct sibling pattern exactly.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no code changed (markdown link text only; `viz/` untouched).

- [x] Ran lint/type-check on changed code — `N/A`, no code changed.

- [x] **Quality assertions** — `N/A` for the code-facing clauses; verified below by exhaustive re-grep instead.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Repo-wide re-grep for the stale string, excluding `/archive/` (write-once historical records):

```sh
grep -rn --include='*.md' '\.\./\.\./PLAN\.md' . | grep -v '/archive/'
```

Zero live hits outside this tasknote's own before-state quotes (Discovery Notes, Subtasks) and `.flowtron/PLAN.md:21`'s task-line description (both expected — they document the bug, not a live citation). `git diff --stat`: 1 file changed, 1 insertion(+), 1 deletion(-).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 entries checked; none reference `templates/sidequest-template.md`'s back-link path. **No change** across the board: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, epic child kept nested beneath `CORE-EPIC-420`, tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Fixed `templates/sidequest-template.md:12`'s back-link depth: `../../PLAN.md` → `../PLAN.md`. Park mode (`/ft-file-followup --park`) writes sidequest stubs to `.flowtron/sidequest/<ID>.md`, one directory level under `.flowtron/` where `PLAN.md` lives — the same depth as `.flowtron/tasknote/<ID>.md`, whose sibling template (`templates/tasknote-template.md:12`) already used the correct `../PLAN.md`. The old two-level `../../PLAN.md` resolved outside `.flowtron/` entirely, so every parked stub shipped a dead link.

**Evidence.** 1 file, 1 insertion / 1 deletion — single-character path correction, no code, no contract change. Verified by repo-wide `grep -rn --include='*.md' '\.\./\.\./PLAN\.md'` (excluding `/archive/`): zero live hits remain outside this tasknote's own before-state quotes and the PLAN.md task-line description. Sibling-drift check (same grep) confirmed no other file carried the stale pattern — single-file fix, no scope widening.

**Refactors:** none made, none deferred — nothing structural was in scope.

**Documentation verdict:** documentation *is* the deliverable; doc-drift sweep above returned 14/14 "no change" (no AI-referenced doc cites this back-link path).

**Maintainability effect.** Every future parked sidequest stub now links back to the real `PLAN.md` instead of a path outside the flowtron boundary — a one-character fix that stops a dead link from being minted on every `/ft-file-followup --park` invocation going forward.

**Archived:** 2026-08-09
