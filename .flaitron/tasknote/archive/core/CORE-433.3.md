---
title: widen gates
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-433, CORE-433.2]
---

# CORE-433.3 | widen gates

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-433]] · [[CORE-433.2]]

## 🎯 Goal

Add `AGENTS.md` to the AI-referenced docs sweep and encode release-time mirror-pair checks so park-priority and goal-task flag rosters cannot drift silently again.

## ✅ Acceptance

- [x] `AGENTS.md` listed in `.flowtron/tasknote/README.md` §"AI-referenced docs" with a one-line purpose
- [x] `/ft-release` §7.1 encodes a park-priority flag roster check covering the five mirror sites from CORE-433.2
- [x] `/ft-release` §7.1 encodes a `--worktree` roster check covering the two mirror sites from CORE-433.2
- [x] Both new checks return clean at HEAD before closure

## 🧩 Subtasks

- [x] Add `AGENTS.md` to `.flowtron/tasknote/README.md` §"AI-referenced docs"
- [x] Add Pair F (park-priority flags) to `claude/skills/ft-release/SKILL.md` §7.1
- [x] Add Pair G (`--worktree` roster) to `claude/skills/ft-release/SKILL.md` §7.1
- [x] Run both encoded checks at HEAD and record results in Testing Notes

## 🔗 Related

- [[CORE-EPIC-433]] — parent epic: drift blind spots
- [[CORE-433.2]] — fixed park/`--worktree` mirrors by hand; deferred gate automation here
- [[CORE-433.4]] — complementary validation-roster sync (out of scope)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pair E (shipped in CORE-420.N follow-up) covers `ft-flowtron` table rows ↔ skill `description:` flags only; the park-priority and `--worktree` prose rosters CORE-433.2 synced by hand still have no release gate. Adding `AGENTS.md` to the cold-start sweep closes the gap where flowtron-self edits to that file bypass Phase 4.

- [x] Read relevant source files — `.flowtron/tasknote/README.md` §"AI-referenced docs", `claude/skills/ft-release/SKILL.md` §7.1 (Pairs A–E), `claude/skills/ft-file-followup/SKILL.md` (park-flag SSOT), archived `CORE-433.2` + `CORE-420.N`/`CORE-420.5`, and all seven mirror surfaces at HEAD

- [x] **Best Practices Review** — extend the existing §7.1 mirror-pair block (Pairs A–E pattern); new pairs are prose + fenced commands only, no code module boundaries. N/A beyond pattern survey.

- [x] **Archive skim** — `CORE-433.2` deferred gate automation here; `CORE-420.N` filed Pair E for the `ft-flowtron` skill table; `CORE-420.5` established the §7.1 pair shape and `grep -e` lessons for flag patterns on BSD grep.

- [x] **Drift check** — PLAN line matches intent; all five park mirrors and both `--worktree` mirrors still carry the flags `.2` landed; Pair E already present at `ft-release/SKILL.md:416+` — this task adds F/G, not an E extension.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **SSOT:** park flags → `claude/skills/ft-file-followup/SKILL.md:42` usage line; `--worktree` → `claude/skills/ft-goal-task/SKILL.md` `--worktree` section.
- **Park mirrors (5):** `SPEC/tasknote-selection.md`, `AGENTS.md`, `docs/GLOSSARY.md` (sidequest entry), `claude/skills/ft-flowtron/SKILL.md`, `docs/MIGRATION.md` (retirement table).
- **Worktree mirrors (2):** `ft-flowtron/SKILL.md` goal-task row, `docs/PLATFORMS.md` operator-mode list.
- **Pair E extension rejected:** E's semantics are skill-table ↔ `description:`; park/worktree rosters are cross-doc prose mirrors — cleaner as Pair F + Pair G.
- **Assumptions:** presence check (all four park flags named) not byte-identity; `claude/AGENTS-snippet.md` and command `argument-hint` files stay out of scope (adopter paste / Claude wiring, not contract-layer mirrors `.2` named).
- **No clarifications needed.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed Pair A–E shape in `ft-release` §7.1: bold header, rationale, fenced `sh` block, resolution rule.

- [x] **Minimal refactor gate** — none; two additive pair blocks + one README list line.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown + release-gate prose); verification is the encoded shell commands.

**Implementation Notes:**

- `.flowtron/tasknote/README.md` — added `AGENTS.md` after `README.md` in the AI-referenced list.
- `claude/skills/ft-release/SKILL.md` — Pair F (park-priority flags, 5 mirrors) and Pair G (`--worktree`, 2 mirrors) before §7.2. Both commands use `grep -q -e` for BSD/macOS compatibility with `--`-prefixed patterns.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34/34 pass** (release machinery touched)

- [x] Ran lint/type-check on changed code — N/A (markdown-only deliverables)

- [x] **Quality assertions** — no duplication beyond deliberate cross-references to Pair B/E blind spots; no new public API; checks are additive gates only.

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

**Testing Notes:**

- Pair F command at HEAD → **no output** (all 5 mirrors × 4 flags present).
- Pair G command at HEAD → **no output** (both mirrors name `--worktree`).
- Updater suite 34/34 pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added `AGENTS.md` to the flowtron-self AI-referenced docs sweep and encoded Pair F (park-priority flag roster across five mirrors) and Pair G (`--worktree` across two mirrors) in `/ft-release` §7.1. Three markdown files; no code. Park/`--worktree` roster drift now fails at release cut instead of waiting for the next manual audit.

**Doc-drift sweep (15 entries):**
- `README.md` — no change
- `AGENTS.md` — **added to list** (this task)
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

Out-of-list deliverable: `claude/skills/ft-release/SKILL.md` (lazy-loaded; houses the new gates).

**Archived:** 2026-08-12
