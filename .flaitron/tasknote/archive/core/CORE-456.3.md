---
title: grok-agents-snippet
status: completed
tags: []
created: 2026-08-20
due:
related-tasks:
  - CORE-EPIC-456
  - CORE-456.2
  - CORE-456.4
  - CORE-456.N
touches:
  - grok/AGENTS-snippet.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/AGENT-NEUTRALITY.md
  - docs/AGENT-COMPAT.md
  - README.md
  - AGENTS.md
  - SPEC.md
  - SECURITY.md
  - .gitignore
  - tools/update-adopters.mjs
  - claude/AGENTS-snippet.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-new-project/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-flowtron/SKILL.md
  - .flowtron/tasknote/README.md
---

# CORE-456.3 | grok-agents-snippet

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-456]] [[CORE-456.2]] [[CORE-456.4]] [[CORE-456.N]]

## 🎯 Goal

Ship `grok/AGENTS-snippet.md` as the Cursor-shaped Grok-only install path: if Claude, Codex, or Cursor is already wired, stop; otherwise symlink the canonical `claude/skills/` bodies into `.grok/skills/`.

## ✅ Acceptance

- [x] `grok/AGENTS-snippet.md` exists and carries the three sections `docs/PLATFORMS.md` §"What the `<PLATFORM>`-snippet must contain" mandates: paste-block **reference** (not a second copy), `## One-time symlink wiring`, pinning notes
- [x] The wiring section's primary path is "already wired for Claude / Codex / Cursor → stop"; the Grok-only `.grok/skills/` `ln -s` block targets canonical `claude/skills/` bodies and matches Cursor's adopter-subset slug set (11/11)
- [x] No `grok/skills/` or `grok/commands/` wrappers ship
- [x] Docs that still call the snippet "the remaining thin-bundle piece" (or "procedure pointer only") now name the shipped snippet; AGENT-COMPAT last-verified left for [[CORE-456.4]]
- [x] Cursor-shaped consumers register the Grok-only surface: `ft-update`, `ft-new-project`, `ft-release` §7.1, `tools/update-adopters.mjs`, `.gitignore`
- [x] Contract layer: only the `SPEC.md` repo-layout `grok/` bullet (a path fact, same treatment as `cursor/`); no new Grok-specific contract term
- [x] Phase 4 doc-drift sweep run across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Author `grok/AGENTS-snippet.md` from `cursor/AGENTS-snippet.md` (Grok discovery facts; no Cursor YAML-colon caveat)
- [x] Flip remaining-piece / pointer-only claims: PLATFORMS (intro, Today's surface, Installed-surface, tree, Worked example: Grok), MIGRATION §1.2 / §1.6 / §1.7, AGENT-NEUTRALITY, README, AGENTS.md, SPEC.md layout, SECURITY.md, AGENT-COMPAT primitive cell (stamp left), ft-flowtron Key docs
- [x] Register Grok-only surface: ft-update Step 4/4.6/5, ft-new-project Cursor-shaped note, ft-release §7.1 parity + forbidden grep, updater `WIRING_SURFACES`, `.gitignore` `.grok/`
- [x] Phase 3: slug-parity diffs, no `grok/skills/`, updater suite, `git diff --check`
- [x] Phase 4: doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-456]] — parent epic: grok-thin-wiring
- [[CORE-456.2]] — predecessor: Grok compat docs (deferred this snippet + Worked-example)
- [[CORE-456.4]] — sibling: dogfood restamp under Grok Build
- [[CORE-456.N]] — terminal audit child
- [[CORE-438.3]] / [[CORE-438.4]] — Cursor analog (ship snippet, then register surfaces)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Parent `CORE-EPIC-456` is open under Medium; this `.3` child is unchecked; `.2` closed 2026-08-20 and explicitly deferred `grok/AGENTS-snippet.md`. File does not exist (`ls` verified). The filed claim is still the remaining thin-bundle hole.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Read set

PLAN.md (parent + children), archived [[CORE-456.2]] / [[CORE-438.3]] / [[CORE-438.4]], `cursor/AGENTS-snippet.md` (shape to extend), `claude/AGENTS-snippet.md` (paste-block SSOT + 11 skill `ln -s` set), `grok/procedures/ft-task.md` (keep), `docs/PLATFORMS.md` (Today's surface, Installed-surface, plug-in tree, Grok adoption notes, Cursor worked example), `docs/MIGRATION.md` §1.2 / §1.6 / §1.7, `docs/AGENT-NEUTRALITY.md`, `docs/AGENT-COMPAT.md` Grok row, README / AGENTS.md / SPEC.md layout, SECURITY.md, `.gitignore`, `tools/update-adopters.mjs` `WIRING_SURFACES`, `claude/skills/{ft-update,ft-new-project,ft-release,ft-flowtron}/SKILL.md`, `~/.grok/docs/user-guide/08-skills.md` (vendor discovery table). No probe — named files, known shape.

### What `.2` locked (inherit, don't re-decide)

| Decision | Source | Effect on `.3` |
|---|---|---|
| Grok is Cursor-shaped: scans `.claude/skills/` + `.agents/skills/` (+ `.cursor/skills/`) | [[CORE-456.2]] | Primary snippet path is "already wired → stop" |
| Do **not** ship the snippet in `.2`; Worked-example waits for it | [[CORE-456.2]] | This task owns both |
| AGENT-COMPAT last-verified left for `.4` | [[CORE-456.2]] | Primitive cell may name the snippet; stamp untouched |
| SPEC.md `grok/` layout line factually true until `.3` | [[CORE-456.2]] | Flip the layout bullet; no other SPEC contract edit |
| No Fan-out (no `.1`; Discovery supplied by audit-repo) | [[CORE-456.2]] | Omit `blocked-by:` / `parallel-safe-with:` |

### Cursor analog (what to copy)

[[CORE-438.3]] shipped `cursor/AGENTS-snippet.md` (paste-block reference, Claude-block as primary, Cursor-only `ln -s` variant, pinning notes, one-canonical-install-path) and left contract layer untouched. [[CORE-438.4]] registered enumeration sites + `ft-update` / `ft-release` / updater / `.gitignore`. This epic has no surface-integration child (`.4` is dogfood), so `.3` ships the snippet **and** registers the Cursor-shaped consumers — otherwise Grok-only adopters would have an install recipe the bump path never reads.

### Grok discovery facts (vendor)

Priority: `.grok/skills/` (native) → `.claude/skills/` + `.claude/commands/` (compat, default on) → `.cursor/skills/` (compat, default on) → `.agents/skills/` at each tier. Skills auto-wire as `/<name>`. Therefore Claude, Codex, **or Cursor** wiring already serves Grok. PLAN names Claude/Codex; Cursor is the same default-on compat scan — include it in the stop rule.

Do **not** copy Cursor's YAML `description:` colon caveat — that is a Cursor parser quirk, not documented for Grok.

Do **not** symlink `claude/commands/` into `.grok/commands/` for Grok-only: skills auto-expose as slash commands (Cursor same choice). When Claude `.claude/commands/` is present, Grok's Claude-compat scan already loads those stubs.

### Drift check

- `grok/AGENTS-snippet.md` does not exist. `grok/procedures/ft-task.md` does.
- PLAN line (~28w) matches this plan. 70-word cap fine.
- MIGRATION §1.2 / AGENT-NEUTRALITY / PLATFORMS Today's surface still say "remaining thin-bundle piece" / "pointer only today" — those become false when the file ships; flipping them is in-scope, not a re-interpretation.
- No SPEC *semantic* change. Neutrality posture preserved.
- AGENT-NEUTRALITY L19 still says "Future full platform wiring (Grok Build, …)" — stale after `.2`; this task's snippet makes it worse. Flip to remaining contract-only agents.
- VERSION-HISTORY is release-gated — no hand-edit.
- No Fan-out on a missing `.1`.

### Best Practices Review

Touched boundary is the thin-bundle install snippet + the docs/skills that *enumerate* it. Dependency direction stays one-way: docs/skills may name `grok/AGENTS-snippet.md`; contract semantics do not grow Grok-specific terms. Duplication risk: restating the `ln -s` list — primary path points at `claude/AGENTS-snippet.md`; Grok-only block is the Cursor-only variant with `.grok/skills/`. Updater Grok surface keys off the snippet's `claude/skills/` `ln -s` targets (thin bundle has no `grok/skills/`). No refactor of `claude/` or `codex/` bodies.

### Clarifications

No clarifications needed. Assumptions: (1) already-wired stop includes Cursor because Grok scans `.cursor/skills/` by default; (2) Grok-only prefers `.grok/skills/` over `.agents/skills/` (Codex collision, same as Cursor); (3) registering `ft-update` / `ft-release` / updater / `.gitignore` is completing the shipped snippet, not a Re-scope — this epic has no `.5` for it; (4) last-verified stamps stay for [[CORE-456.4]]; (5) flowtron-self does not commit `.grok/` wiring (gitignored, same as `.claude/` / `.cursor/`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended `cursor/AGENTS-snippet.md` (thin sibling: paste-block reference, already-wired stop, Grok-only `.grok/skills/` `ln -s` of canonical `claude/skills/` bodies, pinning notes, one-canonical-install-path). Did not copy Cursor's YAML-colon caveat. Stop rule includes Cursor because Grok scans `.cursor/skills/` by default. Registered the same consumers Cursor's `.4` did (this epic has no surface-integration child). No refactor of `claude/` or `codex/` bodies. Tests: updater `WIRING_SURFACES` iterates dynamically — no new test file; suite still passes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- Slug parity: grok `ln -s` set == Cursor 11/11; forbidden-install grep empty (exit 1)
- `ls grok/` = `AGENTS-snippet.md` + `procedures/` only
- `git diff --check` clean
- `node --test tools/update-adopters.test.mjs` 34/34 pass; `node --check` both updater files
- Quality: snippet points at Claude paste-block rather than duplicating it; Grok-only `ln -s` is the one extra list (same as Cursor)
- Frontend: N/A — no UI surface

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — **updated** (layout + quickstart + all-docs PLATFORMS blurb)
  - `AGENTS.md` — **updated** (layout + Platform Notes)
  - `SPEC.md` — **updated** (repo-layout `grok/` bullet only)
  - `docs/MIGRATION.md` — **updated** (§1.2 / §1.6 / §1.7)
  - `claude/AGENTS-snippet.md` — **updated** (verify sentence)
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — **added** to this list (this task)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — **updated** (thin-bundle execution surfaces)
  - `docs/AGENT-NEUTRALITY.md` — **updated** (wiring-layer list + MIGRATION ledger row)
  - `docs/PLATFORMS.md` — **updated** (this task; last-verified left for [[CORE-456.4]])
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — **updated** (primitive cell; last-verified left for [[CORE-456.4]])
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

  - `README.md` — **updated** (layout + quickstart + all-docs PLATFORMS blurb)
  - `AGENTS.md` — **updated** (layout + Platform Notes)
  - `SPEC.md` — **updated** (repo-layout `grok/` bullet only)
  - `docs/MIGRATION.md` — **updated** (§1.2 / §1.6 / §1.7)
  - `claude/AGENTS-snippet.md` — **updated** (verify sentence)
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — **added** to this list (this task)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — **updated** (thin-bundle execution surfaces)
  - `docs/AGENT-NEUTRALITY.md` — **updated** (wiring-layer list + MIGRATION ledger row)
  - `docs/PLATFORMS.md` — **updated** (this task; last-verified left for [[CORE-456.4]])
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — **updated** (primitive cell; last-verified left for [[CORE-456.4]])
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Shipped `grok/AGENTS-snippet.md` as the Cursor-shaped Grok-only install path (already-wired Claude/Codex/Cursor → stop; else symlink canonical `claude/skills/` into `.grok/skills/`) and registered it in the same consumers Cursor uses. Grok-only adopters now have an executable snippet; bump and release parity read it.

**Archived:** 2026-08-20
