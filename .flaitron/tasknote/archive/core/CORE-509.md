---
title: keep-in-sync-scope
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-509 | keep-in-sync-scope

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Widen the `KEEP IN SYNC` comment's scope (or point the lifecycle line at SPEC.md instead of restating it) so the parts of `AGENTS.md` duplicated into the paste-block but not currently covered by the comment don't drift unguarded.

## ✅ Acceptance

- [x] AGENTS.md's 4-phase line (:19-22) and claude/AGENTS-snippet.md's paste-block 4-phase line (:28) no longer restate the phase names — both point readers at SPEC.md's canonical §"The 4-phase workflow" instead
- [x] The KEEP IN SYNC comment pair (AGENTS.md:16, claude/AGENTS-snippet.md:9) widened to also name the path-convention bullets (AGENTS.md:8-12 ↔ paste-block:16-17) as guarded content, not just the peer-skill roster

## 🧩 Subtasks

- [ ] Edit AGENTS.md: reword the 4-phase sentence (lines 19-22) to point at SPEC.md instead of restating Discovery/Execution/Testing/Closure
- [ ] Edit claude/AGENTS-snippet.md: reword the matching paste-block sentence (line 28) the same way
- [ ] Widen the KEEP IN SYNC comment on AGENTS.md:16 to also cover the path-convention bullets
- [ ] Widen the mirrored KEEP IN SYNC comment on claude/AGENTS-snippet.md:9 the same way
- [ ] Verify no other adopter-facing surface (docs/MIGRATION.md, codex/cursor/grok snippets) restates the same 4-phase list or path-convention bullets in a way this task should also touch

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cited duplications (AGENTS.md:8-12/19-22 vs claude/AGENTS-snippet.md:16-17/28) verified live in the current files at the cited lines; task is well-scoped and actionable as filed.

- [x] Read relevant source files — read AGENTS.md and claude/AGENTS-snippet.md in full.

- [x] **Best Practices Review** — N/A, docs-only change; no code module boundaries touched.

- [x] **Archive skim** — `grep -l "AGENTS-snippet\|KEEP IN SYNC" archive/core/*.md` returned broad noise (most recent tasknotes reference SPEC.md generically). Traced the comment's origin via `git log -S "KEEP IN SYNC: this peer-skill roster"` → commit 22db3dc (CORE-318, dedup-peer-skill-roster), which predates the current tasknote archive (no CORE-318.md on disk — likely rotated to PLAN-ARCHIVE or pre-archive-convention). No further prior-decision context found beyond the comment's own text.

- [x] **Drift check** — Confirmed both cited spots match current code exactly: AGENTS.md:8-12 (path-convention bullets) vs claude/AGENTS-snippet.md paste-block:16-17 (same paths, reformatted); AGENTS.md:19-22 (4-phase prose) vs paste-block:28 (4-phase prose). Plan matches the PLAN.md line; no contradiction with SPEC.md (SPEC.md itself already carries the canonical §"The 4-phase workflow" section AGENTS.md can point to instead of restating).

- [x] Asked clarifying questions — AskUserQuestion: chose "Dereference the 4-phase list, widen comment for paths" (reword both 4-phase lines to point at SPEC.md's canonical section; widen the existing KEEP IN SYNC comment pair to also cover the path-convention bullets). Also checked codex/cursor/grok/AGENTS-snippet.md and docs/MIGRATION.md for the same restated content — none found (those surfaces derive only the symlink-wiring block, not this paste-block's prose), so no additional files are in scope.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Two independently-duplicated blocks exist beyond the guarded peer-skill roster: (1) path-convention bullets (AGENTS.md:8-12 ↔ paste-block:16-17), (2) the 4-phase workflow list (AGENTS.md:19-22 ↔ paste-block:28). Resolution: dereference (2) to SPEC.md's canonical §"The 4-phase workflow" (removes the duplication outright — SPEC.md is already the referenced canonical contract in both files' opening lines); widen the existing KEEP IN SYNC comment pair to additionally name (1) as guarded, since path conventions are concrete facts that must stay semantically aligned but aren't natural candidates for a single SPEC.md pointer (self-host and adopter layouts differ slightly — PLAN-ARCHIVE rotation is self-host-only).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing convention of dereferencing to SPEC.md rather than restating (e.g. AGENTS.md already says "the canonical workflow contract lives in SPEC.md" and both files already point to SPEC/*.md modules elsewhere); widened the existing KEEP IN SYNC comment rather than inventing a second comment mechanism.

- [x] **Minimal refactor gate** — no refactor beyond the two targeted sentence edits per file; nothing else in either file restates this content.

- [x] Implemented the minimal solution — 2 files changed: `AGENTS.md` (4-phase sentence dereferenced to SPEC.md; KEEP IN SYNC comment widened), `claude/AGENTS-snippet.md` (same two edits, adopter-relative path `.flowtron/core/SPEC.md`).

- [x] Updated/added tests — N/A, prose-only doc change with no parseable structure or test surface.

**Implementation Notes:**

`AGENTS.md`: 4-phase sentence now reads "follow the tasknote lifecycle: `SPEC.md` §\"The 4-phase workflow\"" instead of restating Discovery/Execution/Testing/Closure; KEEP IN SYNC comment gained one sentence naming the path-convention bullets as covered.

`claude/AGENTS-snippet.md`: matching KEEP IN SYNC sentence added; 4-phase bullet now points at `.flowtron/core/SPEC.md` §"The 4-phase workflow" (adopter-relative path, consistent with every other SPEC reference already in this paste-block).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose-only markdown edit; confirmed no CI check parses these files (`grep -n "KEEP IN SYNC\|AGENTS" .github/workflows/ci.yml` found none).

- [x] Ran lint/type-check on changed code — N/A, no linter targets `.md` files in this repo.

- [x] **Quality assertions** — `git diff` reviewed: both edits are the two targeted sentence changes, no unrelated content touched; no new duplication introduced (the fix removes duplication rather than adding it); no dead code/complexity concerns (prose only).

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change. `AGENTS.md`: updated (this task's target). `SPEC.md`: no change. `docs/MIGRATION.md`: no change (already derives its 4-phase mention generically, doesn't restate the list — verified during Discovery). `claude/AGENTS-snippet.md`: updated (this task's target). `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`: no change (verified during Discovery — none restate the path bullets or 4-phase list independently). `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change (none reference the KEEP IN SYNC comment scope or restate this content).

- [x] Closed — both Acceptance criteria ticked (verified via `git diff` above); YAML `status:` flipped to `completed`; PLAN.md line to be flipped to stub form and moved to top of `## Completed` in the same commit; tasknote to be moved to `.flowtron/tasknote/archive/core/` in the same commit.

- [x] **Evidence-based recap** drafted (below).

**Final Summary:**

2 files changed, 4 lines total (2 sentence edits per file). `AGENTS.md`: the 4-phase-workflow sentence (was lines 19-22) now dereferences to `SPEC.md` §"The 4-phase workflow" instead of restating Discovery/Execution/Testing/Closure; the existing peer-skill-roster KEEP IN SYNC comment (line 16) gained a clause naming the path-convention bullets (lines 8-12) as also covered. `claude/AGENTS-snippet.md`: mirrored both edits — its KEEP IN SYNC comment (line 9) gained the matching clause, and its 4-phase bullet (was line 28) now points at `.flowtron/core/SPEC.md` §"The 4-phase workflow" (adopter-relative path). Verification: no test suite or CI lint covers these prose files (confirmed via `grep` against `.github/workflows/ci.yml`); reviewed the full `git diff` for both files — only the four targeted sentences changed. No refactor beyond the two sentence edits per file; no code touched. Doc-drift sweep found no other AI-referenced doc restating this content. Maintainability effect: the 4-phase list can no longer silently drift from `SPEC.md`'s canonical phase names (dereferenced, not duplicated); the path-convention bullets remain duplicated by design (self-host vs. adopter layouts differ slightly) but are now explicitly named under the existing sync-comment pair, so an editor changing one side is prompted to check the other.

**Archived:** 2026-08-30
