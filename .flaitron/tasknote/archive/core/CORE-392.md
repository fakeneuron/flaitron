---
title: ft-quality-retire
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-388, CORE-390, CORE-391]
---

# CORE-392 | ft-quality-retire

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-388]] [[CORE-390]] [[CORE-391]]

## 🎯 Goal

Confirm with the operator whether `/ft-quality` is habitually used; on confirmation retire the skill (Claude + Codex bodies, command wrapper, roster/global-install/enumeration surfaces), or record an operator veto and re-verdict it to KEEP.

## ✅ Acceptance

- [x] Operator confirm/veto obtained and recorded in Discovery Notes (this is the task's gate — CORE-388 called the CUT "weak confidence, operator veto expected if habitually used") — **confirmed unused; no veto**
- [x] **Retire branch:** three skill paths deleted — `claude/skills/ft-quality/`, `claude/commands/ft-quality.md`, `codex/skills/ft-quality/`
- [x] **Retire branch:** every live reference removed across the 7 referencing files (SPEC.md, ft-flowtron roster, ft-update, ft-release forbidden-install list, codex/AGENTS-snippet.md, docs/MIGRATION.md ×2, docs/PLATFORMS.md ×4)
- [x] **Retire branch:** skill-count enumerations shifted 21→20 (`docs/PLATFORMS.md` ×3; `ft-flowtron` roster table row count)
- [x] **Retire branch:** operator-side global symlinks (`~/.claude/skills/ft-quality`, `~/.claude/commands/ft-quality.md`) surfaced as a manual ✋ cleanup step (outside the repo — not removed by the agent without explicit go)
- [x] **Veto branch:** `N/A` — operator confirmed the CUT; no veto branch taken, no deletions skipped
- [x] `git status --porcelain` shows only intended paths — no collateral edits to [[CORE-390]] / [[CORE-391]] surfaces

## 🧩 Subtasks

- [x] Ask the operator: habitual use of `/ft-quality`? → retire or veto
- [x] (retire) Delete the 3 skill paths
- [x] (retire) Strip references: `SPEC.md` §"Skill namespace"; `claude/skills/ft-flowtron/SKILL.md` roster row; `claude/skills/ft-update/SKILL.md` global list; `claude/skills/ft-release/SKILL.md` forbidden-install list (×4 sites); `codex/AGENTS-snippet.md` global list
- [x] (retire) `docs/MIGRATION.md` — drop the global-install table row + the §1.2 global-utilities prose list mention
- [x] (retire) `docs/PLATFORMS.md` — drop from §"Installed-surface policy" ×2, drop from the `commands/` enumeration, shift the three `21` counts to `20`
- [x] (retire) Repo-wide grep for stray `ft-quality` hits outside `archive/`
- [x] (veto) `N/A` — branch not taken
- [x] Phase 4: doc-drift sweep, PLAN flip, archive move, closure commit

## 🔗 Related

- [[CORE-388]] — verdict source (skill-roster-utility-review): row 13 `ft-quality` → **CUT (weak confidence)**
- [[CORE-390]] — sibling fold from the same review (ft-debug → `/ft-task --debug`)
- [[CORE-391]] — sibling fold from the same review (ft-sidequest → `/ft-file-followup --park`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Last of the three CORE-388 roster folds (390/391 still open, 389 epic closed). The CUT verdict is explicitly conditional on an operator confirm, which is exactly what this task exists to obtain — so the task is still the right work regardless of which branch it takes.

- [x] Read relevant source files

- [x] **Best Practices Review** — mechanical retirement of a self-contained markdown skill with no code dependents, mirroring [[CORE-389.3]]'s precedent exactly (delete dead scaffolds → sync the enumeration surfaces). No abstraction to preserve: `ft-quality`'s body is a standalone stack-detection recipe imported by nothing. `N/A` for dependency-direction concerns — no code touched.

- [x] **Archive skim** — `grep -l ft-quality .flowtron/tasknote/archive/core/*.md` returns 20+ hits, nearly all incidental roster enumerations. Load-bearing ones: **[[CORE-097.5]]** created the skill (2026-05-20); **[[CORE-385]]** (skill-trigger-frontmatter) and **[[CORE-344]]** (codex wiring parity) and **[[CORE-191]]** (cosmetic drift) are its only later touches — i.e. every edit since creation has been roster-wide maintenance, never a functional change, which is itself weak evidence for the CUT. **[[CORE-389.3]]** is the direct procedural precedent for this shape of retirement, including its assumption (3) that snippet files needed no change; here `codex/AGENTS-snippet.md` **does** carry a live mention (globals prose list), unlike the audit family.

- [x] **Drift check** — all paths in the task line verified present: `claude/skills/ft-quality/SKILL.md`, `claude/commands/ft-quality.md`, `codex/skills/ft-quality/SKILL.md`. The "global-install row" named in the PLAN line resolves to `docs/MIGRATION.md:32`. One scope expansion vs. the task line's two named surfaces: **10 live reference sites across 7 files**, not just the skill + one row (full list in Discovery Notes). No path drift; no stale function/line references.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked the one question this task exists to resolve: *does the operator habitually use `/ft-quality`?* **Answer: no — retire it.** CORE-388's conditional CUT therefore stands unvetoed. Explicit assumptions carried into Phase 2: (1) retirement means removing every *live* reference, not just the two surfaces the PLAN line names — the 10-site inventory below is in scope, per [[CORE-389.3]]'s precedent; (2) `archive/` mentions are historical record and stay untouched (write-once); (3) the operator-side global symlinks in `~/.claude/` are outside this repo and outside `~/code/` — surfaced as a manual ✋ step, not removed by the agent.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**CORE-388's verdict (row 13, verbatim):** `ft-quality` → **CUT (weak confidence)** — "Function is native to any coding agent ('run lint/typecheck/tests'); not an oversight checkpoint (the positioning); duplicates each project's own commands. **Operator veto expected if habitually used.**" The net-roster arithmetic there is 26 → 18, with `−1 quality` as one of the four subtractions. Post-[[CORE-389]] the roster stands at **21**; retiring quality takes it to **20**, and [[CORE-390]] + [[CORE-391]] take it to the target 18.

**Live reference inventory (10 sites / 7 files, outside `archive/`):**

| File | Line(s) | Shape |
|---|---|---|
| `SPEC.md` | 106 | §"Skill namespace" slug enumeration |
| `claude/skills/ft-flowtron/SKILL.md` | 60 | Bundled-skills roster row (table is 21 rows → 20) |
| `claude/skills/ft-update/SKILL.md` | 88 | Global/by-reference skill list |
| `claude/skills/ft-release/SKILL.md` | 261, 277–279 | Forbidden repo-scoped-install list + 3 release-gate grep regexes |
| `codex/AGENTS-snippet.md` | 38 | Globals prose list |
| `docs/MIGRATION.md` | 32, 65 | One-time-global-install table row; §1.2 globals prose list |
| `docs/PLATFORMS.md` | 31, 68, 208–213, 238 | Installed-surface policy ×2; `commands/` enumeration; three literal `21` counts |

**Operator-side state (outside the repo):** `~/.claude/skills/ft-quality` and `~/.claude/commands/ft-quality.md` are both live symlinks into this checkout (installed 2026-05-20). Retiring the source dangles them. Also noted as **pre-existing, out of scope**: `~/.claude/skills/` still holds five dangling symlinks to the audit scaffolds [[CORE-389.3]] deleted (`ft-audit-{backend,frontend,docs,performance,security}`) — evidence that global-install cleanup is not currently swept by retirement tasks, and worth a follow-up rather than silent inclusion here.

**Signal on usage:** the repo carries no usage telemetry. `git log` on the three skill paths shows four commits, all roster-wide maintenance (create + 3 sweeps), none responding to a real-world failure or feature request in ~2.5 months of existence. That is suggestive but not decisive — hence the operator ask below.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed [[CORE-389.3]]'s retirement shape verbatim: `git rm` the skill paths, then sync each enumeration surface that named the slug. No new shape needed or invented.

- [x] **Minimal refactor gate** — no refactor. One judgment call beyond the literal Acceptance list: removed `ft-quality` from `claude/skills/ft-release/SKILL.md`'s *forbidden repo-scoped install* list (1 literal + 3 grep regexes). [[CORE-389.3]] assumption (2) had argued leaving retired slugs in a forbidden list is harmless, but [[CORE-389.4]] subsequently swept them out, leaving the list with zero dead entries — so removing is the consistent state, and a nonexistent slug in that list falsely signals the skill exists. Deferred nothing.

- [x] Implemented the minimal solution — 3 deletions + 10 reference edits across 7 files

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown-only; no test-bearing code (`viz/`, `tools/`) touched

**Implementation Notes:**

Deleted via `git rm -r`: `claude/skills/ft-quality/SKILL.md`, `claude/commands/ft-quality.md`, `codex/skills/ft-quality/SKILL.md`.

Reference edits, all mechanical slug/count removals:

| File | Edit |
|---|---|
| `SPEC.md` | §"Skill namespace" — dropped `/ft-quality` from the slug enumeration |
| `claude/skills/ft-flowtron/SKILL.md` | roster row removed (21 → 20 rows) |
| `claude/skills/ft-update/SKILL.md` | dropped from the global/by-reference skill list |
| `claude/skills/ft-release/SKILL.md` | dropped from the forbidden-install list + 3 release-gate `grep -E` alternations |
| `codex/AGENTS-snippet.md` | dropped from the globals prose list |
| `docs/MIGRATION.md` | §1.0 global-install table row deleted; §1.2 globals prose list trimmed |
| `docs/PLATFORMS.md` | Installed-surface policy ×2; `commands/` enumeration; three literal counts `21` → `20` |

`.flowtron/PLAN.md` still carries the string in CORE-392's own task line — flipped to stub form at closure, by design.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, markdown-only skill/doc changes; no `viz/` or `tools/` code touched

- [x] Ran lint/type-check on changed code — `N/A`, same reason

- [x] **Quality assertions** — verified against the actual diff: four independent counts now agree at **20** (`claude/commands/*.md`, `claude/skills/*/`, `codex/skills/*/`, `ft-flowtron` roster rows), matching the three `docs/PLATFORMS.md` literals; repo-wide `grep -rn ft-quality` outside `archive/` returns exactly one hit (this task's own PLAN line); `ft-release`'s three exact-set `diff` gates pass and its three forbidden-install `grep` gates exit 1 as required. No dead code, no duplication, no stale code-facing docs left behind.

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface

**Testing Notes:**

The `ft-release` release gates were dry-run directly rather than trusted by inspection, since this task edits the gate regexes themselves: the claude-skills exact-set `diff` produced no output and exit 0, and the forbidden-install `grep` produced no output and exit 1 — both the required outcomes.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (carries no skill roster or count)
  - `SPEC.md` — **updated** (§"Skill namespace" slug enumeration, 20 slugs)
  - `docs/MIGRATION.md` — **updated** (§1.0 global-install table row removed; §1.2 globals prose list trimmed)
  - `claude/AGENTS-snippet.md` — no change (globals were never in the adopter symlink set; grep-confirmed)
  - `codex/AGENTS-snippet.md` — **updated** (globals prose list trimmed)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (never listed `ft-quality` as a Claude-specific surface)
  - `docs/PLATFORMS.md` — **updated** (installed-surface policy ×2, `commands/` enumeration, three counts 21→20)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone task), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Retired `/ft-quality` after the operator confirmed they don't habitually use it, resolving the one conditional verdict CORE-388 left open. The skill's function — "run lint, typecheck, and tests" — is native to any coding agent and duplicated each project's own commands, so removing it costs no capability and takes the bundled roster from 21 skills to 20.

**Changed** — 3 deletions + 7 modified files, markdown only:
- Deleted: `claude/skills/ft-quality/SKILL.md` (135 lines), `claude/commands/ft-quality.md`, `codex/skills/ft-quality/SKILL.md`
- Reference edits across `SPEC.md`, `claude/skills/ft-flowtron/SKILL.md`, `claude/skills/ft-update/SKILL.md`, `claude/skills/ft-release/SKILL.md`, `codex/AGENTS-snippet.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md` — 10 sites total

**Verification:** four independent counts agree at 20 (`claude/commands/*.md`, `claude/skills/*/`, `codex/skills/*/`, `ft-flowtron` roster rows) and match the three `docs/PLATFORMS.md` literals; repo-wide grep outside `archive/` returns zero live references post-PLAN-flip; `ft-release`'s exact-set `diff` gate passes (exit 0, no output) and its forbidden-install `grep` gate exits 1 as required — dry-run rather than inspected, since this task edits those regexes; `git status --porcelain` matches the intended path set with no collateral edits into [[CORE-390]] / [[CORE-391]] territory.

**Refactors:** none. One scope call beyond the literal Acceptance list — removing the slug from `ft-release`'s forbidden-install list — documented with rationale in Implementation Notes.

**Documentation verdict:** four of twelve AI-referenced docs updated as this task's own deliverable; the other eight verified unaffected.

**Maintainability effect:** one fewer skill body, command wrapper, and Codex mirror to keep in sync, and one fewer row in every roster enumeration — the surfaces [[CORE-389.3]] identified as the repo's main drift class (a single rename previously cost 18 edits across 7 files). Two of CORE-388's four planned subtractions now remain ([[CORE-390]], [[CORE-391]]) before the roster reaches its target of 18.

**Follow-up surfaced (not actioned):** `~/.claude/skills/` holds five dangling symlinks to the audit scaffolds [[CORE-389.3]] deleted, and this task adds two more (`ft-quality` skill + command). Operator-side cleanup outside the repo — see the ✋ step in the closure response.

**Archived:** 2026-08-02
