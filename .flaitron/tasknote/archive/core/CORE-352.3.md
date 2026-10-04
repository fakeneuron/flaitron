---
title: ft-spec-wiring
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-352, CORE-352.2]
---

# CORE-352.3 | ft-spec-wiring

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-352]] · [[CORE-352.2]]

## 🎯 Goal

Fan `/ft-spec` out into adopter-facing wiring: MIGRATION §1.2 counts, AGENTS-snippets, `ft-new-project`, the `ft-flowtron` roster, the AGENTS.md peer list, and the tasknote-selection when-to-use bullet.

## ✅ Acceptance

- [ ] `claude/AGENTS-snippet.md` symlink block carries 26 `^ln -s` lines (ft-spec command + skill appended); paste-block §Workflow roster names `/ft-spec`
- [ ] `codex/AGENTS-snippet.md` symlink block gains an `ft-spec` line in alphabetical position
- [ ] Root `AGENTS.md` §Workflow peer-skill roster names `/ft-spec` (KEEP-IN-SYNC pair with the snippet)
- [ ] `claude/skills/ft-new-project/SKILL.md`: Step 3 heading, Step 7 staging block (+2 paths), Step 8 verify (twenty-four→twenty-six + 2 readlinks) all include `/ft-spec`
- [ ] `docs/MIGRATION.md`: §1.2 (nine→ten tasknote family + `/ft-spec` + purpose clause), §1.6 staging block (+2 paths), §1.7 verify enumeration (+`/ft-spec`), §"smoke" list (+`/ft-spec`, ten→eleven total, provenance note)
- [ ] `claude/skills/ft-flowtron/SKILL.md`: `/ft-spec` row added to the bundled-skill table
- [ ] `SPEC/tasknote-selection.md`: "Draft a spec" when-to-use bullet contrasting `/ft-spec` vs `/ft-starter-task` / `/ft-epic-discovery`
- [ ] `docs/PLATFORMS.md` Installed-surface policy table: `/ft-spec` added to the adopter-installed subset cell for both Claude Code and Codex CLI rows
- [ ] `SPEC.md` §"Skill namespace" parenthetical includes `/ft-spec` (Phase 4 doc-drift finding)
- [ ] Verify: symlink counts consistent everywhere; zero stale "nine"/"twenty-four" references; `/ft-spec` present across all nine edited surfaces

## 🧩 Subtasks

- [ ] `claude/AGENTS-snippet.md` — append ft-spec command+skill to symlink block (→26); add `/ft-spec` bullet to paste-block §Workflow roster
- [ ] `codex/AGENTS-snippet.md` — insert `ft-spec` symlink line alphabetically (between `ft-sidequest` and `ft-starter-task`)
- [ ] Root `AGENTS.md` §Workflow — add `/ft-spec` to the peer-skill line
- [ ] `ft-new-project/SKILL.md` — Step 3 heading + Step 7 staging (+2) + Step 8 verify (twenty-four→twenty-six, +2 readlinks)
- [ ] `docs/MIGRATION.md` — §1.2 counts/enumeration/purpose, §1.6 staging (+2), §1.7 verify prose, smoke-test list
- [ ] `claude/skills/ft-flowtron/SKILL.md` — add `/ft-spec` table row (planning-peer placement, near `/ft-starter-task`/`/ft-epic-discovery`)
- [ ] `SPEC/tasknote-selection.md` — add "Draft a spec" + "Skip the spec" bullet pair ahead of the starter-task section
- [ ] `docs/PLATFORMS.md` — add `/ft-spec` to the Installed-surface policy table (both rows)
- [ ] `SPEC.md` — add `/ft-spec` to §"Skill namespace" list
- [ ] Verify counts + stale-reference sweep + presence check

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic
- [[CORE-352.2]] — predecessor (shipped the `/ft-spec` skill this task wires up)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-spec` shipped in [[CORE-352.2]] but is absent from every adopter-facing wiring surface (symlink sets, rosters, counts). CORE-352.1's Discovery locked "auto-wire into adopter subset" as scoping decision #8 for this exact child.

- [x] Read relevant source files — `docs/MIGRATION.md` §1.2/§1.6/§1.7/smoke-list, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `claude/skills/ft-new-project/SKILL.md`, `claude/skills/ft-flowtron/SKILL.md`, root `AGENTS.md`, `SPEC/tasknote-selection.md`, `docs/PLATFORMS.md` §"Installed-surface policy", `SPEC.md` §"Skill namespace", `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`.

- [x] **Archive skim** — [[CORE-330.5]] (`loop-wiring-doc-sync`, wiring `/ft-goal-task`) is the byte-for-byte precedent: same fan-out shape (symlink block, root AGENTS.md, ft-new-project Steps 3/7/8, MIGRATION §1.2/§1.6/§1.7, ft-flowtron roster, SPEC.md §"Skill namespace"), append-at-end ordering, deterministic count-verification in Phase 3. That task in turn cited [[CORE-329.2]] as its own precedent (same shape, one skill earlier). [[CORE-352.1]] Discovery Notes explicitly deferred `docs/PLATFORMS.md` to this child ("no change (wiring/skill inventory child)").

- [x] **Drift check** (2026-07-12 HEAD): `claude/AGENTS-snippet.md` has 24 `^ln -s` lines, no `ft-spec`. `claude/commands/`, `claude/skills/`, `codex/skills/` all = 26 (already include `/ft-spec` — shipped in [[CORE-352.2]]). `codex/AGENTS-snippet.md` symlink block is alphabetically ordered and missing `ft-spec`. `ft-new-project/SKILL.md` Step 8 says "twenty-four symlinks". `docs/MIGRATION.md` §1.2 says "nine tasknote family"; smoke-list (~line 395) says "(ten total)". `SPEC.md` §"Skill namespace" list omits `/ft-spec`. `docs/PLATFORMS.md` Installed-surface policy table's adopter-installed subset cells omit `/ft-spec` for both Claude and Codex rows. No GLOSSARY.md/README.md drift — CORE-352.1's shared-surface table deliberately excludes them (unlike CORE-EPIC-330, this epic introduces no new terminology).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Explicit assumptions: (1) `/ft-spec` is auto-wired per-project per CORE-352.1 lock #8; (2) claude/AGENTS-snippet.md + ft-new-project append at the very end of each block (mirrors CORE-330.5/CORE-329.2 precedent); (3) codex/AGENTS-snippet.md inserts alphabetically (matches that file's existing convention, untouched by the goal-task precedent); (4) `SPEC/tasknote-selection.md` gets a new "Draft a spec" bullet pair (per CORE-352.1's explicit surface-table entry naming this file); (5) `SPEC.md` §"Skill namespace" edit is in scope as a standard Phase 4 doc-drift finding (in the AI-referenced docs ledger) even though not named on the PLAN.md line, mirroring CORE-330.5's identical judgment call.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Nine surfaces to edit (append-at-end ordering for claude-side blocks, alphabetical for codex, matching each file's own established convention):

1. `claude/AGENTS-snippet.md` — symlink block 24→26; paste-block §Workflow roster gains a `/ft-spec` bullet
2. `codex/AGENTS-snippet.md` — symlink block gains one alphabetical `ft-spec` line
3. `AGENTS.md` (root) — §Workflow peer-skill line gains `/ft-spec`
4. `claude/skills/ft-new-project/SKILL.md` — Step 3 heading, Step 7 staging (+2, →26), Step 8 verify (twenty-four→twenty-six, +2 readlinks)
5. `docs/MIGRATION.md` — §1.2 (nine→ten + `/ft-spec` + purpose clause), §1.6 staging (+2), §1.7 verify menu, smoke-list (ten→eleven total + provenance note)
6. `claude/skills/ft-flowtron/SKILL.md` — `/ft-spec` table row
7. `SPEC/tasknote-selection.md` — new "Draft a spec" / "Skip the spec" bullet pair
8. `docs/PLATFORMS.md` — Installed-surface policy table, both rows
9. `SPEC.md` — §"Skill namespace" parenthetical

Discovery surfaced no significant deviation from CORE-352.1's locked scope → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-330.5]]'s fan-out shape verbatim: append at the end of each claude-side block (matching its own established convention), insert alphabetically in `codex/AGENTS-snippet.md` (that file's native ordering), bump counts in place. No new shape invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (documentation/skill-prose only; verification is the deterministic count + presence sweep in Phase 3)

**Implementation Notes:**

Nine planned surfaces edited, plus one drift finding surfaced mid-sweep:

1. `claude/AGENTS-snippet.md` — symlink block 24→26 (ft-spec command+skill appended after ft-goal-task); paste-block §Workflow roster gains a `/ft-spec` bullet.
2. `codex/AGENTS-snippet.md` — `ft-spec` line inserted alphabetically (between `ft-sidequest` and `ft-starter-task`).
3. `AGENTS.md` (root) — §Workflow peer-skill line gains `/ft-spec` (KEEP-IN-SYNC pair with the snippet).
4. `claude/skills/ft-new-project/SKILL.md` — Step 3 heading, Step 7 staging (+2 paths, →26), Step 8 verify ("twenty-four"→"twenty-six" + 2 readlinks).
5. `docs/MIGRATION.md` — §1.2 ("nine"→"ten tasknote family" + `/ft-spec` + "planning-peer spec drafter" purpose clause), §1.6 staging (+2 paths), §1.7 verify menu (+`/ft-spec`), smoke-list ("ten total"→"eleven total" + `/ft-spec` + provenance note).
6. `claude/skills/ft-flowtron/SKILL.md` — `/ft-spec` table row added after `/ft-starter-task`.
7. `SPEC/tasknote-selection.md` — new "Draft a spec" / "Skip the spec" bullet pair ahead of the starter-task section.
8. `docs/PLATFORMS.md` — Installed-surface policy table (both rows gain `/ft-spec`); also found and fixed a second drift spot in the same file (§"Worked example" `commands/`/`skills/` stub-count enumerations were stale at "25", predating this task — bumped to 26 and added `ft-spec.md`/`ft-spec` to both Claude and Codex enumerations).
9. `SPEC.md` — §"Skill namespace" parenthetical gains `/ft-spec` (Phase 4 doc-drift finding; not on the PLAN.md line but in the AI-referenced docs ledger).

**Extra drift finding (not in original 6-surface scope, fixed as part of Phase 4 doc-drift discipline):** `README.md` §"Bootstrapping a new project" said "wire the nine tasknote skills" and omitted `/ft-spec` from its enumeration — same drift pattern as everywhere else. Bumped "nine"→"ten" + added `/ft-spec`. (`GLOSSARY.md` was checked and left untouched — no new terminology introduced by `/ft-spec`, unlike CORE-EPIC-330's goal-loop/heartbeat/iteration-log additions.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown/skill-prose only; no test-bearing code changed)

- [x] Ran lint/type-check on changed code — deterministic verification instead

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

**Testing Notes:**

- `claude/AGENTS-snippet.md`: 26 `^ln -s` lines (was 24).
- `codex/AGENTS-snippet.md`: `ft-spec` correctly slotted alphabetically between `ft-sidequest` and `ft-starter-task`.
- `claude/skills/ft-new-project/SKILL.md`: 26 `readlink` lines; Step 7 staging block carries 26 `.claude/` paths.
- `docs/MIGRATION.md` §1.6: 26 `.claude/` staging paths.
- Stale-reference sweep (`nine tasknote`, `twenty-four symlink`, `25 \`.md\``, `25 \`SKILL.md\``) across the whole repo (excluding archive) returns clean — only this tasknote's own Discovery Notes and correctly-untouched archived historical tasknotes match.
- `ft-spec` presence confirmed in all nine planned surfaces + the extra `README.md` finding.
- `git diff --check` clean (no trailing whitespace, no missing newline).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 11 AI-referenced ledger entries:

  - `README.md` — **updated** (§"Bootstrapping a new project" nine→ten + `/ft-spec`)
  - `SPEC.md` — **updated** (§"Skill namespace" +`/ft-spec`)
  - `docs/MIGRATION.md` — **updated** (§1.2 counts/enumeration/purpose; §1.6 staging; §1.7 verify menu; smoke-list)
  - `claude/AGENTS-snippet.md` — **updated** (symlink block 24→26; paste-block §Workflow roster +`/ft-spec`)
  - `codex/AGENTS-snippet.md` — **updated** (symlink block +`ft-spec`, alphabetical)
  - `docs/CONVENTIONS.md` — no change (conventions doc; no skill roster/count)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (`/ft-spec` adds no new attack surface — review-first, writes only to `.flowtron/specs/`, inside the existing threat model)
  - `docs/AGENT-NEUTRALITY.md` — no change (`/ft-spec` is agent-neutral; no new Claude-specific contract-layer surface)
  - `docs/PLATFORMS.md` — **updated** (Installed-surface policy table both rows; §"Worked example" stub-count enumerations 25→26 for Claude `commands/`/`skills/` and Codex `skills/` — a second drift spot found in the same file, predating this task)
  - `claude/CAPABILITIES.md` — no change (Claude Code capability-trigger reference, not a skill roster)
  - `docs/AGENT-COMPAT.md` — no change (per-agent matrix has no count/roster; last-verified stamps are version-pinned)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` (stays nested under the open `CORE-EPIC-352` in `## High`; cohort moves to `## Completed` when the epic closes at `.N`) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Wired `/ft-spec` (shipped [[CORE-352.2]]) into the adopter-facing surface, per [[CORE-352.1]]'s locked scoping decision #8 and the [[CORE-330.5]] fan-out precedent. **Symlink set** (append-at-end for claude-side blocks, alphabetical for codex): `claude/AGENTS-snippet.md` 24→26 `ln -s` lines + paste-block §Workflow roster bullet; `codex/AGENTS-snippet.md` +1 alphabetical line; `ft-new-project/SKILL.md` Step 3 heading + Step 7 staging + Step 8 verify (twenty-four→twenty-six); `docs/MIGRATION.md` §1.2 (nine→ten tasknote family + planning-peer purpose clause), §1.6 staging, §1.7 verify menu, smoke-list (ten→eleven total). **Rosters/enumerations**: root `AGENTS.md` §Workflow (KEEP-IN-SYNC), `ft-flowtron` bundled-skill table, `SPEC.md` §"Skill namespace", `SPEC/tasknote-selection.md` (new "Draft a spec" / "Skip the spec" bullet pair), and `docs/PLATFORMS.md` (Installed-surface policy table both rows + a second stale stub-count spot found and fixed in the same file). **Extra drift finding**: `README.md` §"Bootstrapping" also said "nine tasknote skills" — fixed as part of Phase 4 doc-drift discipline (not in the original six-surface PLAN description, but a genuine ledger-entry drift). `GLOSSARY.md` deliberately untouched — `/ft-spec` introduces no new terminology (unlike CORE-EPIC-330's goal-loop/heartbeat/iteration-log additions). Verified: 26 symlinks/readlinks/staging paths everywhere; zero stale "nine"/"twenty-four"/"25" references; `/ft-spec` present across all nine planned surfaces + the README finding; `git diff --check` clean. Markdown-only, no code. Remaining epic children: `.4` (external-and-validation), `.5` (dogfood), `.N` (audit).

**Archived:** 2026-07-12
