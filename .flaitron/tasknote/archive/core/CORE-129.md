---
title: AGENTS.md migration
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: []
---

# CORE-129 | AGENTS.md migration

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-22

## 🎯 Goal

Move flowtron's canonical adopter paste-block from project-side `CLAUDE.md` to project-side `AGENTS.md` (and rename the source-of-truth snippet from `claude/CLAUDE-snippet.md` to `claude/AGENTS-snippet.md`) so non-Claude adopters (Codex CLI, Cursor, Sourcegraph Amp, Aider) work out-of-the-box with zero Claude-side regression.

## ✅ Acceptance

- [x] Source snippet renamed `claude/CLAUDE-snippet.md` → `claude/AGENTS-snippet.md` (single-line replacements inside the snippet update self-references; symlink-wiring block is content-stable)
- [x] `docs/MIGRATION.md` §1.3 retitled and rewritten to target `AGENTS.md` as the paste destination; §1.2 (install note) + §1.6 (commit step) + §2.2-2.6 (mirror reference) + §3.6 / §3.7 (legacy-migration paste pointers) updated
- [x] `SPEC.md` §"Working in the flowtron repo itself" updated (line 53 snippet ref + line 30 layout diagram)
- [x] `_project/tasknote/README.md` §"AI-referenced docs" entry renamed; `templates/tasknote-README.md` seed list extended to include `AGENTS.md`
- [x] Skills updated to point at the new path: `ft-new-project` (SKILL + command stub), `ft-flowtron`, `ft-release` (AI-referenced-docs list), `ft-epic-discovery` + `ft-close-epic` (auto-wired footers)
- [x] Audit-family forks updated: `.claude/skills/ft-audit/SKILL.md` + `.claude/skills/ft-audit-docs/SKILL.md` (multiple per-file refs each)
- [x] Claude Code `AGENTS.md` fallback validated — Phase 1 trusted Anthropic docs (`docs.claude.com/en/memory#agents-md`, surfaced by CORE-055's research) instead of live test
- [x] Existing adopters not forced to migrate — Claude Code reads both `AGENTS.md` and `CLAUDE.md`, so old installs keep working; the snippet's symlink-wiring block remains compatible
- [x] No live references to `CLAUDE-snippet.md` remain (`grep -rn "CLAUDE-snippet" --include="*.md"` excluding archive returns hits only in this tasknote's own historical body — intentional)
- [x] `CLAUDE.md` precondition in `ft-new-project` preserved as a project-validity guard (post-Phase-2 revert; minimal scope per 📦-preview); paste-block lands in `AGENTS.md` regardless

## 🧩 Subtasks

- [x] **Precondition** — Verified via CORE-055 research (`docs.claude.com/en/memory#agents-md`) rather than live test; user-locked decision at Phase 1.
- [x] **Snippet rename + self-reference sweep** — `git mv` landed; the two snippet-body `CLAUDE.md`-string lines flipped (line 3 paste-target prose + line 7 section heading).
- [x] **SPEC.md** — `SPEC.md:53` snippet-path cite flipped; `SPEC.md:30` adopter-project layout diagram flipped (`CLAUDE.md` row → `AGENTS.md`).
- [x] **MIGRATION.md sweep** — §1.2 install pointer + §1.3 heading & body (rewritten to explain `AGENTS.md` as open-standard target) + §1.6 commit step (`git add` list) + §2.2-2.6 step-list reference + §3.6 paste-block prose + §3.7 heading & body (rewritten to "Create `AGENTS.md`").
- [x] **`_project/tasknote/README.md`** — §"AI-referenced docs" entry renamed and reworded ("agent-neutral"); `templates/tasknote-README.md` seed list extended to add `AGENTS.md` and tag `CLAUDE.md` optional.
- [x] **Bundled skills (`claude/skills/`)** — `ft-new-project` SKILL + command stub (descriptions, Step 3, Step 4 heading + body + create-or-append behavior, Step 7 `git add`, Notes); `ft-flowtron` bundled-skills table row; `ft-release` AI-referenced-docs list; `ft-epic-discovery` + `ft-close-epic` auto-wired footers.
- [x] **Audit-family forks (`.claude/skills/`)** — `.claude/skills/ft-audit/SKILL.md` (`replace_all CLAUDE-snippet → AGENTS-snippet` + line 36 `CLAUDE.md` → `AGENTS.md`) and `.claude/skills/ft-audit-docs/SKILL.md` (same pattern + line 51 `CLAUDE.md` → `AGENTS.md`). Canonical templates at `claude/skills/ft-audit{,-docs}/` had no `CLAUDE-snippet` refs (only generic forker-illustrative `CLAUDE.md` placeholders); intentionally left.
- [x] **Full-tree sweep** — `grep -rn "CLAUDE-snippet" --include="*.md"` returns hits only inside this tasknote's own body (intentional historical record). `grep -rn "CLAUDE\.md" --include="*.md"` surfaced 12 remaining mentions; classified per-site (4 flipped, 8 intentionally preserved — precondition guard, in-prose distinction prose, parenthetical examples, command-stub mirror text).
- [x] **Phase 3 verification** — grep sweeps clean; no executable surface (markdown-only); `/ft-quality` not run (no lint/type target for markdown).

## 🔗 Related

- (none — first slice of a future `CORE-EPIC` for agent-agnostic decoupling; that epic is not yet filed)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-05-22 with full starter context; locked decisions stand. CORE-055's prior AGENTS.md follow-up scoped a much lighter touch (additive MIGRATION.md adopter-orientation note); CORE-129 supersedes it with the canonical paste-target rename. Anthropic docs (per CORE-055 research) confirm `AGENTS.md` is a first-class memory file Claude Code reads, so the precondition is satisfied on docs-faith without a session-restart live test. No structural blockers; all 13+ touch sites are markdown — low risk.

- [x] Read relevant source files (`claude/CLAUDE-snippet.md` end-to-end + every site flagged in the drift check)
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions — three locked via AskUserQuestion at promotion
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Drift check (run at promotion 2026-05-22).** Starter's "Files to touch" undercounted live references. Full grep `CLAUDE-snippet|paste-block` across non-archive markdown surfaced these additional sites:

- `claude/skills/ft-epic-discovery/SKILL.md:248` — "Auto-wired into adopters" footer cites `claude/CLAUDE-snippet.md`.
- `claude/skills/ft-close-epic/SKILL.md:205` — same auto-wired footer.
- `claude/skills/ft-release/SKILL.md:159` — AI-referenced-docs scope list cites `claude/CLAUDE-snippet.md`.
- `_project/tasknote/README.md:37` — adopter-paste-block entry in §"AI-referenced docs".
- `.claude/skills/ft-audit/SKILL.md:21, 36, 57, 72` — flowtron-self audit fork, multiple references.
- `.claude/skills/ft-audit-docs/SKILL.md:25, 36, 51, 67, 68, 85` — flowtron-self audit-docs fork, multiple references.
- `docs/MIGRATION.md:62, 267, 271` — additional §1.2, §3.6, §3.7 pointers beyond the §1.3 + §1.6 the starter named.

Starter's `SPEC.md:53` line-number citation is correct as of 2026-05-22; that line is the only `SPEC.md` reference. Subtasks above expanded to cover the full set. (Phase 2 surfaced 4 additional sites: `SPEC.md:30` layout diagram, `claude/commands/ft-new-project.md` frontmatter, `docs/MIGRATION.md:160` §2.2-2.6 mirror, `templates/tasknote-README.md:75` seed list.)

**Archive skim — load-bearing precedents:**

- **CORE-055** (`CLAUDE-snippet` best-practices review, 2026-05-09): explicitly flagged AGENTS.md interop in its gap analysis (`docs.claude.com/en/memory#agents-md`) and filed it as Follow-up #1 for "for adopters using Cursor/Aider/etc. alongside Claude Code, document the `@AGENTS.md` import pattern" — but **scoped as an additive `docs/MIGRATION.md` note, not a canonical paste-target rename.** CORE-129 supersedes that follow-up with materially larger scope. CORE-055 also confirms snippet boundary: "flowtron's snippet defines the workflow contract surface only; universal good-coding guidance stays in adopter's own CLAUDE.md" — preserved.
- **CORE-091** (wiring-snippet single-source collapse, 2026-05-14): codified the pattern that downstream surfaces (MIGRATION.md, ft-new-project skill) point at the snippet without restating its content. Implication for CORE-129: most downstream-site edits are **path-reference flips** (`CLAUDE-snippet.md` → `AGENTS-snippet.md`), not content rewrites. The snippet itself owns the only `CLAUDE.md`-string updates ("Paste the block below into your project's `CLAUDE.md`" line 3, "## Block to paste into CLAUDE.md" heading line 7).
- **CORE-125/126** (recent snippet edits): both prose-only tweaks; no structural changes to the snippet's section layout. The 4-section shape (Block / Symlinks / Bumping / Visualizer) stands.

**Locked decisions (AskUserQuestion at promotion 2026-05-22):**

1. **Snippet home:** `claude/AGENTS-snippet.md` (rename in place; defers `claude/` → `agents/` dir rename to the future epic).
2. **Old path fate:** Delete outright via `git mv`. Git history preserves the trail; write-once policy aligns; existing-adopter installs unaffected because they already pasted. MIGRATION.md gets a one-line rename note for adopters bumping the submodule.
3. **AGENTS.md fallback:** Trust Anthropic docs (`docs.claude.com/en/memory#agents-md` per CORE-055 research). No live session-restart test.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended **CORE-091's single-source-of-truth pattern**: `claude/AGENTS-snippet.md` is the canonical owner of paste-block content; downstream surfaces point at it without restating. Most edits are pure path-reference flips. The snippet body itself owned the only `CLAUDE.md`-as-target prose (2 lines). The 4-section snippet shape (Block / Symlinks / Bumping / Visualizer) and the cite-don't-restate baseline (CORE-038/050/051) preserved. No new pattern introduced.
- [x] Implemented the minimal solution (`git mv` + 24 surgical Edit calls across 13 files)
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only doc rename; no executable behavior changed)

**Implementation Notes:**

### Files touched (13 total, plus the snippet rename)

| File | Edit summary |
|---|---|
| `claude/CLAUDE-snippet.md` → `claude/AGENTS-snippet.md` | `git mv` rename; body line 3 (paste target prose) + line 7 (section heading) flipped from `CLAUDE.md` to `AGENTS.md` |
| `SPEC.md` | Line 53 snippet-path cite + line 30 adopter-project layout diagram (`CLAUDE.md` row → `AGENTS.md`) |
| `docs/MIGRATION.md` | §1.2 install pointer; §1.3 heading + body (rewritten to explain `AGENTS.md` as the open-standard memory file read by Claude Code/Codex/Cursor/Amp/Aider); §1.6 `git add` list (`CLAUDE.md` → `AGENTS.md`); §2.2-2.6 step-list reference; §3.6 paste-block prose; §3.7 heading + body (rewritten to "Create `AGENTS.md` from the paste-block") |
| `_project/tasknote/README.md` | §"AI-referenced docs" entry renamed + reworded ("agent-neutral") |
| `templates/tasknote-README.md` | Seed list extended: added `AGENTS.md` (flowtron paste-block destination) and tagged `CLAUDE.md` as optional |
| `claude/commands/ft-new-project.md` | Command-stub frontmatter description mirrored skill change ("creates/patches `AGENTS.md`") |
| `claude/skills/ft-new-project/SKILL.md` | Frontmatter description; Step 3 snippet-path; Step 4 heading + body (now create-or-append `AGENTS.md`); Step 7 `git add` list; Notes section. `CLAUDE.md` Step 0 precondition preserved as project-validity guard (post-Phase-2 revert for minimum-viable scope) |
| `claude/skills/ft-flowtron/SKILL.md` | Bundled-skills table row for `/ft-new-project` (`CLAUDE.md patch` → `AGENTS.md patch`) |
| `claude/skills/ft-release/SKILL.md` | §7.1 AI-referenced-docs subroutine-scope list |
| `claude/skills/ft-epic-discovery/SKILL.md` | "Auto-wired into adopters" footer path cite |
| `claude/skills/ft-close-epic/SKILL.md` | Same auto-wired footer |
| `.claude/skills/ft-audit/SKILL.md` | `replace_all CLAUDE-snippet → AGENTS-snippet` (4 sites: rubric list, two "Documentation drift" pass refs, "MIGRATION vs. AGENTS-snippet drift" severity-guide entry); line 36 description text `CLAUDE.md` → `AGENTS.md` |
| `.claude/skills/ft-audit-docs/SKILL.md` | `replace_all CLAUDE-snippet → AGENTS-snippet` (5 sites: two scope-tree blocks, rubric list, two Pass-1/2 examples); line 51 description text `CLAUDE.md` → `AGENTS.md` |

### Out-of-scope decisions (preserved by design)

- **Audit-family canonical templates** (`claude/skills/ft-audit{,-docs}/SKILL.md`): generic forker-illustrative `CLAUDE.md` placeholders left as-is — forker checklist examples are adopter-customized; flipping would impose flowtron's convention on adopters who may use either memory file.
- **README.md:29** "git repo + `CLAUDE.md` required": precondition preserved per Step 0 revert; line stays valid.
- **MIGRATION.md §0 + §1.0 precondition descriptions**: same — preserved.
- **MIGRATION.md §1.3 in-prose distinction** between `AGENTS.md` (agent-neutral, flowtron block) and `CLAUDE.md` (Claude-only optional): intentional — explains the new convention.
- **MIGRATION.md §3.7 body** mentions `CLAUDE.md` as "legacy workflow block lived inside `CLAUDE.md`": intentional — describes legacy-migration path for adopters whose prior system pasted into `CLAUDE.md`.
- **MIGRATION.md §3.8 parenthetical** mentions "`CLAUDE.md` project-guardrail check" as a project-specific tail: intentional — illustrative example, not a flowtron claim.
- **SPEC.md `SECURITY.md`/`docs/CONVENTIONS.md`/`CONTRIBUTING.md`**: zero `CLAUDE-snippet` hits; clean.

### Behavior change in `ft-new-project`

Step 4 evolved from "append to `CLAUDE.md`" (which always existed per precondition) to "create-or-append to `AGENTS.md`" (which may not exist). The Step 0 `CLAUDE.md` precondition was reverted mid-Phase-2 from an initial drop back to preservation — kept as a project-validity heuristic decoupled from the paste target. The reason: the 📦-preview approved by the user was path-flip focused; dropping a precondition was beyond authorized scope.

### Verification

- `grep -rn "CLAUDE-snippet" --include="*.md"` excluding archive: returns hits only inside this tasknote's own body (intentional historical record of what was renamed).
- `grep -rn "AGENTS-snippet" --include="*.md"` excluding archive: 13 expected sites populated.
- `git status` confirms the rename was tracked correctly (`RM claude/CLAUDE-snippet.md -> claude/AGENTS-snippet.md`).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface to test). Verification = grep sweeps (above).
- [x] Ran lint/type-check on changed code — N/A (markdown; flowtron's `/ft-quality` doesn't target docs).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend changes; the viz/ doesn't render the snippet).

**Testing Notes:**

Markdown-only doc rename + path-reference sweep. Verification surface is the two grep sweeps documented above: `CLAUDE-snippet` purged from live surface (returns only intentional self-references inside this tasknote); `AGENTS-snippet` propagated across 13 expected sites. No executable code changed. No frontend surface affected. No lint/type-check target applies.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `_project/tasknote/README.md` §"AI-referenced docs" (7 entries):
  - `README.md` — **no change.** Single `CLAUDE.md` reference (`git repo + CLAUDE.md required`, line 29) stays valid; precondition preserved.
  - `SPEC.md` — **updated** (line 53 snippet-path cite + line 30 adopter-project layout diagram).
  - `docs/MIGRATION.md` — **updated** (§1.2 install pointer, §1.3 heading + rewritten body, §1.6 `git add` list, §2.2-2.6 step-list reference, §3.6 paste-block prose, §3.7 heading + rewritten body).
  - `claude/AGENTS-snippet.md` — **updated** (the rename itself, plus body lines 3 + 7).
  - `docs/CONVENTIONS.md` — **no change** (zero `CLAUDE-snippet` hits).
  - `CONTRIBUTING.md` — **no change** (zero `CLAUDE-snippet` hits).
  - `SECURITY.md` — **no change** (zero `CLAUDE-snippet` hits).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted

**Final Summary:**

Moved flowtron's canonical adopter paste-block from project-side `CLAUDE.md` to project-side `AGENTS.md` (open-standard memory file read by Claude Code, Codex CLI, Cursor, Sourcegraph Amp, and Aider). First slice of the future agent-agnostic decoupling epic. Non-Claude adopters now work out-of-the-box; existing Claude-only adopters keep working because Claude Code reads both files.

**Mechanism.** Renamed `claude/CLAUDE-snippet.md` → `claude/AGENTS-snippet.md` via `git mv`. Flipped the snippet body's two `CLAUDE.md`-string lines (paste-target prose + section heading) to `AGENTS.md`. Swept 13 downstream sites across `SPEC.md`, `docs/MIGRATION.md` (six §s: 1.2, 1.3, 1.6, 2.2-2.6, 3.6, 3.7), `_project/tasknote/README.md`, `templates/tasknote-README.md`, `claude/commands/ft-new-project.md`, and six skill files (5 bundled + 2 audit-family forks). MIGRATION.md §1.3 and §3.7 received body rewrites (not just path flips) explaining the new convention.

**Behavior change.** `ft-new-project` Step 4 evolved from "append to `CLAUDE.md`" to "create-or-append to `AGENTS.md`"; Step 0 `CLAUDE.md` precondition preserved as a project-validity guard (decoupled from the paste target). The reverted-mid-Phase-2 precondition stays minimum-viable — explicit drop was beyond the 📦-preview's authorized scope.

**Out of scope (preserved by design).** `claude/` → `agents/` directory rename; opening the `[model]` enum; `AskUserQuestion` references in skill bodies; `.codex/` adapter scaffolding. All deferred to the future `CORE-EPIC`. Forker-illustrative `CLAUDE.md` placeholders in `claude/skills/ft-audit{,-docs}/` canonical templates intentionally left — adopters customize.

**Version-bump impact.** Minor (adopter-visible contract surface changes: paste destination file renamed). Bump notes should call out: (1) the canonical paste target moved to `AGENTS.md`; (2) existing installs keep working without action; (3) re-pasting from the new path picks up the rename + any upstream snippet refinements.

**Archived:** 2026-05-22
