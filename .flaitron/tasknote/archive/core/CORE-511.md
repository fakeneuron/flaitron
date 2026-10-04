---
title: Contributor Wiring Gap
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

# CORE-511 | Contributor Wiring Gap

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Close the contributor wiring gap: `.gitignore:22` ignores `.claude/` wholesale so a fresh clone has no wired `ft-*` slash commands, and `CONTRIBUTING.md` never mentions wiring.

## ✅ Acceptance

- [ ] `CONTRIBUTING.md` names the `.claude/` wiring step and points to `docs/MIGRATION.md` §1.2.2 for the recipe
- [ ] No wiring instructions duplicated between `CONTRIBUTING.md` and `docs/MIGRATION.md`

## 🧩 Subtasks

- [ ] Add a short "Getting set up" pointer to `CONTRIBUTING.md` (Pull requests section) noting that `.claude/` is gitignored per-machine wiring and linking to `docs/MIGRATION.md` §"1.2.2 Developing flowtron skills & commands" for the symlink recipe
- [ ] Re-read the edited `CONTRIBUTING.md` section for tone/length fit with the rest of the doc

## 🔗 Related

None.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.gitignore:22` is confirmed to ignore `.claude/` wholesale (`.claude/`), and a fresh clone genuinely has no `.claude/` directory at all — the `ft-*` wiring lives only as gitignored symlinks. `CONTRIBUTING.md` genuinely never mentions wiring. Both claims in the PLAN.md line hold.

- [x] Read relevant source files — `.gitignore`, `.claude/` (symlink targets confirmed pointing into tracked `claude/`), `CONTRIBUTING.md`, `docs/MIGRATION.md`

- [x] **Best Practices Review** — N/A (docs-only change; no code/module boundaries touched)

- [x] **Archive skim** — `git log --follow -- CONTRIBUTING.md` shows one prior commit (CORE-099.6, original authoring) plus later docs-convention edits (CORE-374, CORE-384); none of them addressed wiring. No prior tasknote closed this specific gap.

- [x] **Drift check** — No drift. Confirmed live: `docs/MIGRATION.md` §"1.2.2 Developing flowtron skills & commands (maintainer & contributors)" (line 212) **already documents the exact wiring recipe** flowtron contributors need (`mkdir -p .claude/commands .claude/skills` + `ln -s ../../claude/commands/*.md` / `ln -s ../../claude/skills/*`), and explicitly states the design intent: "The in-repo `.claude/` directory is gitignored ... and must never contain committed per-machine wiring." This resolves the task's second proposed remedy (narrow the ignore + track the symlinks) — that would contradict an existing, deliberate design decision. The real gap is narrower than the PLAN.md line implies: the wiring recipe already exists, it's just not linked from `CONTRIBUTING.md`, the doc a new contributor actually lands on.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. The repo itself resolves the fork in the task description (add doc section vs. narrow gitignore): MIGRATION.md's own text rules out narrowing the ignore, so the fix is a short pointer from `CONTRIBUTING.md` to `docs/MIGRATION.md` §1.2.2, not new wiring instructions duplicated in two places.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- `.gitignore:22` — bare `.claude/` line, ignores the whole directory.
- `.claude/commands/*.md` and `.claude/skills/*` are symlinks into tracked `claude/commands/` and `claude/skills/` (verified via `file`/`ls -la`); `git check-ignore -v` confirms all of them match `.gitignore:22`, so none survive a fresh clone.
- `docs/MIGRATION.md` §1.2.2 (line 212-225) already carries the self-host wiring recipe and the rationale for keeping `.claude/` gitignored — this section is the authoritative fix target to link to, not duplicate.
- `CONTRIBUTING.md` has 5 sections (Maintenance model, Filing issues, Pull requests, Where conventions live, Licensing) and no "getting set up" step; a contributor cloning the repo to work on skills/commands would hit `.claude/`-less commands with no signpost.
- Decision: add a short pointer in `CONTRIBUTING.md` (Pull requests section, since that's where a contributor would actually need working `/ft-*` commands) to `docs/MIGRATION.md` §1.2.2. Minimal, non-duplicative, respects the existing gitignore-by-design decision.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the numbered-steps pattern already in "Pull requests"; added a 4th step rather than a new subsection, matching the existing shape

- [x] **Minimal refactor gate** — no refactor; single additive list item

- [x] Implemented the minimal solution — `CONTRIBUTING.md` "Pull requests" §, new step 4 pointing to `docs/MIGRATION.md` §1.2.2

- [x] N/A — docs-only change, no test-worthy behavior

**Implementation Notes:**

- Added one numbered step to the existing "Pull requests" list (`CONTRIBUTING.md`) rather than a new section — keeps the doc's length/shape and puts the pointer exactly where a contributor needs it (about to make a PR touching skills/commands).
- Verified the quoted section title (`### 1.2.2 Developing flowtron skills & commands (maintainer & contributors)`) matches `docs/MIGRATION.md` verbatim, so the pointer won't drift silently if the heading is ever reworded without a grep hit.

## 🧪 Phase 3: Testing & Linting

- [x] N/A — no test suite applies to a prose doc addition

- [x] N/A — no lint/type-check applies to markdown prose

- [x] **Quality assertions** — no duplication (pointer only, recipe stays single-sourced in MIGRATION.md); no dead code; matches surrounding numbered-list style; verified quoted section title stays in sync with the actual heading

- [x] N/A — no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**
  - `README.md` — no change (its two `CONTRIBUTING.md` pointers are one-line summaries, unaffected by the new step)
  - `AGENTS.md` — no change (no mention of `.claude/` wiring or `CONTRIBUTING.md` content)
  - `SPEC.md` — no change (workflow contract, not adoption/wiring docs)
  - `docs/MIGRATION.md` — no change (source of truth for the recipe; `CONTRIBUTING.md` now points to it rather than duplicating it)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md` — no change (adopter-facing wiring snippets, unrelated to flowtron-self contributor onboarding)

- [x] Closed — both `## ✅ Acceptance` criteria met: `CONTRIBUTING.md` now names the wiring step and points to `docs/MIGRATION.md` §1.2.2; no duplication introduced (pointer only, recipe stays single-sourced)

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Added a one-line pointer to `CONTRIBUTING.md`'s "Pull requests" section (new step 4) directing contributors whose change touches a skill or command to `docs/MIGRATION.md` §"1.2.2 Developing flowtron skills & commands" for the one-time `.claude/` symlink wiring, and naming why `.claude/` is gitignored (per-machine wiring, never committed). Discovery found the wiring recipe already existed in MIGRATION.md §1.2.2 — the gap was purely that `CONTRIBUTING.md` never pointed to it, not a missing recipe or a wrong `.gitignore` design. No code changed; no tests apply. 1 file touched, 1 line added.

**Archived:** 2026-08-30
