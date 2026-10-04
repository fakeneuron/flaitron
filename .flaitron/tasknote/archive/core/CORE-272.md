---
title: ft-update-skill
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-271]
---

# CORE-272 | ft-update-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-271]]

## 🎯 Goal

Ship `/ft-update` — an adopter-only skill that bumps a project's pinned flowtron submodule (version check → fetch latest tag → checkout → `git submodule update` → re-wire symlinks for any newly shipped tasknote-family skills → lightweight smoke check), superseding the manual prose in `claude/AGENTS-snippet.md` §"Bumping the pinned flowtron version".

## ✅ Acceptance

- [x] `claude/skills/ft-update/SKILL.md` created — adopter-only bump skill; Step 0 resolves `<FT>` submodule path from `.gitmodules` (handles both `.flowtron/core/` and `.flowtron/flowtron/`) then guards on `<FT>/SPEC.md` + repo-root non-flowtron heading
- [x] `claude/commands/ft-update.md` command wrapper created, mirroring sibling wrapper shape
- [x] Skill surfaces old→new version (from `<FT>/SPEC.md:3` + tag), moves the pin (`checkout` + `git add <FT>`, **not** `git submodule update`), then re-wires per-project symlinks only for newly shipped tasknote-family skills (read from the bumped AGENTS-snippet symlink block)
- [x] `claude/AGENTS-snippet.md` §"Bumping the pinned flowtron version" superseded to point at `/ft-update`; `.flowtron/flowtron` → `.flowtron/core` corrected in the snippet's own manual-equivalent text
- [x] `docs/MIGRATION.md` global-install skill table (§1.2 area) lists `/ft-update`; `claude/commands/ft-release.md` bump cross-ref repointed to `/ft-update`
- [x] `claude/skills/ft-flowtron/SKILL.md` roster table lists `/ft-update`
- [x] No grok/codex procedure wrappers added (only `ft-task` projected to date) and no per-project symlink line added (global glob `claude/skills/*` covers it) — both decisions noted
- [x] Markdown mental-pass across all edited/created files

## 🧩 Subtasks

- [x] Write `claude/commands/ft-update.md` (copy sibling wrapper shape + cross-ref footer)
- [x] Write `claude/skills/ft-update/SKILL.md` — Step 0 resolve `<FT>` + adopter guard → Step 1 current/target version → Step 2 tag-changelog confirm → Step 3 move pin (`checkout` + `git add <FT>`) → Step 4 new-skill symlink rewire → Step 5 smoke check + staged recap; Notes
- [x] Supersede `AGENTS-snippet.md` bump prose + fix `.flowtron/flowtron` → `.flowtron/core`
- [x] Add `/ft-update` to `docs/MIGRATION.md` global-install table + repoint `ft-release.md` cross-ref
- [x] Add `/ft-update` to `ft-flowtron` roster
- [x] Markdown mental-pass + Phase 4 closure

## 🔗 Related

- [[CORE-271]] — cross-agent-skill-projection (established the grok/codex `procedures/` wrapper convention; informs the "no per-agent wrapper needed yet" decision)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly filed + started this via /ft-starter-task → /ft-task after a scope triage that confirmed single-task scope. The bump workflow exists only as prose today; a skill is the natural codification of the `/ft-release` (producer) counterpart on the consumer side.

- [x] Read relevant source files

- [x] **Archive skim** — `core/` archive is large; scoped grep for skill-build + bump precedents. ft-release SKILL is the closest counterpart (layout-guarded, global-symlink, single-side-of-lifecycle). No prior tasknote touched `AGENTS-snippet.md` §bump.

- [x] **Drift check** — see Discovery Notes; one real bug found in the prose being superseded.

- [x] Asked clarifying questions — resolved the three starter "open at promotion" questions via Discovery; one load-bearing design decision routed to the 🛠️ Phase 1→2 gate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

*Starter context (absorbed):* rationale, solution shape, and file survey carried over from the starter filing; full text in git history (`git show` the pre-promotion blob).

*Surface map (verified against HEAD):*
- Per-skill artifacts = `claude/skills/<name>/SKILL.md` + `claude/commands/<name>.md`. There are 21 of each.
- Global skills (ft-stats / ft-quality / ft-flowtron / ft-new-project / ft-audit-context / ft-release) install via the glob `ln -s ~/code/flowtron/claude/skills/* ~/.claude/skills/` (`docs/MIGRATION.md:101`). **A new file under `claude/skills/` is therefore auto-installed globally — no per-project symlink and no MIGRATION §1.2 symlink-block line needed.**
- Per-project symlinks (`AGENTS-snippet.md:40-50`, MIGRATION §1.2) cover only the **nine** tasknote-family + worktree skills. A newly shipped *tasknote-family* skill is the only case that needs a fresh per-project symlink — this is exactly the "re-wire symlinks if new skills were added" piece `/ft-update` must handle.
- `grok/procedures/` + `codex/procedures/` (CORE-271) currently hold **only** `ft-task.md`. The projection convention is opt-in per skill; a new skill does **not** require a per-agent wrapper. → no grok/codex files for `/ft-update`.

*Drift / bug found:* `claude/AGENTS-snippet.md:59` cites `git -C .flowtron/flowtron show vX.Y.Z`, but the submodule lives at `.flowtron/core/` everywhere else (lines 12, 22, 29, 33+). The `.flowtron/flowtron` path is a bug in the prose this task supersedes — fix it in the rewrite.

*Resolved scoping (starter "open at promotion"):*
| Question | Resolution |
|---|---|
| Symlink claim tension (line 59 says symlinks don't change on bump) | True for existing skills (relative symlinks track the pin); the gap is brand-new tasknote-family skills with no symlink yet. `/ft-update` diffs shipped `ft-*` skills vs adopter `.claude/skills/` and creates missing ones. |
| Self-host vs adopter | Adopter-only. Step 0 bails when `.flowtron/core/SPEC.md` is absent — the exact inverse of `/ft-release`'s flowtron-self-only guard (there is no submodule to bump in flowtron-self). |
| Smoke-test shape | Lightweight: `readlink` the wired symlinks resolve + report old→new version; **offer** but do not auto-run a full `/ft-task`. Keeps the bump fast. |

*Design decision routed to 🛠️ gate:* the wiring model (global-glob install + adopter-only guard) and the supersede-the-prose scope expand the file list beyond the starter's lean guess — surfacing before Phase 2.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `ft-release` SKILL is the layout-guarded single-side-of-lifecycle counterpart (Step 0 cwd guard, global-symlink, no-args); `ft-quality`/`ft-worktree-*` are the thin-procedural-no-tasknote precedent. `/ft-update` extends both shapes; no new pattern invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill + doc edits; no executable code surface)

**Implementation Notes:**

Created `claude/skills/ft-update/SKILL.md` (~6 steps + Notes) and `claude/commands/ft-update.md`. Doc edits: superseded `AGENTS-snippet.md` §"Bumping…" prose (now points at `/ft-update` + manual fallback); added `/ft-update` row to `docs/MIGRATION.md` global-install table and `ft-flowtron` roster; repointed `claude/commands/ft-release.md` bump cross-ref.

**Mid-flow discovery (ground-truthed against the fleet):** the flowtron submodule path is **not uniform** — fintown pins at `.flowtron/flowtron/`, bidviz at `.flowtron/core/` (a convention rename that didn't fully propagate). In-scope consequence: the skill now **resolves `<FT>` from `.gitmodules`** in Step 0 instead of hard-coding `.flowtron/core`, so it works on both layouts. Out-of-scope consequence: `ft-new-project` Step 2 + `docs/MIGRATION.md` §1.1 / §"Pinning and bumping" still tell **new** adopters to add the submodule at `.flowtron/flowtron`, then reference `.flowtron/core` immediately after (half-migrated bootstrap that would break a literal follow-through). → filed as a separate follow-up (see Final Summary).

7 files touched (2 created, 4 edited, 1 tasknote). No grok/codex wrappers, no per-project symlink line (global glob covers a `claude/skills/` addition).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code; markdown only)

- [x] Ran lint/type-check on changed code — markdown mental-pass: frontmatter valid on both new files; fenced blocks balanced; roster/table rows column-aligned with siblings; cross-refs resolve; `<FT>` placeholder used consistently after Step 0 defines it

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

Verification greps confirmed: no stray `.flowtron/flowtron` left in the *edited* surfaces (remaining hits are the pre-existing bootstrap-bug locations, filed separately, + write-once archived tasknotes); `/ft-update` now appears in both roster surfaces + MIGRATION table; `ft-release` cross-ref repointed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/MIGRATION.md` updated (table row); `claude/AGENTS-snippet.md` updated (§"Bumping…" superseded + path fix); `README.md` / `SPEC.md` / `docs/CONVENTIONS.md` / `CONTRIBUTING.md` / `SECURITY.md` / `docs/AGENT-NEUTRALITY.md` / `docs/PLATFORMS.md` / `claude/CAPABILITIES.md` / `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-02.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Shipped `/ft-update` — the adopter-side submodule-bump skill (consumer counterpart to `/ft-release`). New: `claude/skills/ft-update/SKILL.md` + `claude/commands/ft-update.md`. The skill resolves the submodule path from `.gitmodules` (works on both `.flowtron/core/` and `.flowtron/flowtron/` layouts), shows current→target + the annotated-tag changelog for confirmation, moves the pin (`checkout` + `git add` — not `git submodule update`), re-wires per-project symlinks for any newly shipped tasknote-family skills, runs a lightweight smoke check, and stages a `chore:` bump (commits on operator go). Wired into the roster (`ft-flowtron`, `docs/MIGRATION.md` global-install table) and supersedes the `AGENTS-snippet.md` §"Bumping…" prose; repointed the `ft-release` cross-ref. Design calls (operator-confirmed at the 🛠️ gate): global install + adopter-only guard; lightweight smoke; no per-agent wrappers. Mid-flow, ground-truthed a fleet split (fintown `.flowtron/flowtron` vs bidviz `.flowtron/core`) — handled in-skill via path resolution, and **filed [[CORE-273]]** for the separate pre-existing half-migrated bootstrap docs (`ft-new-project` Step 2 + `docs/MIGRATION.md` §1.1/§"Pinning and bumping" still seed new adopters at `.flowtron/flowtron`).

**Archived:** 2026-06-02
