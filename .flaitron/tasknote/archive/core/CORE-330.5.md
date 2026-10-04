---
title: loop-wiring-doc-sync
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-330, CORE-330.4, CORE-330.3]
---

# CORE-330.5 | loop-wiring-doc-sync

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-330]] [[CORE-330.4]] [[CORE-330.3]]

## 🎯 Goal

Wire the new `/ft-goal-task` skill and heartbeat loop template into flowtron's adopter-facing surfaces (symlink set, MIGRATION, AGENTS-snippet, ft-update, README, GLOSSARY) so adopters pick them up on their next version bump.

## ✅ Acceptance

- [ ] `claude/AGENTS-snippet.md` symlink block carries 22 `^ln -s` lines (ft-goal-task command + skill appended); paste-block §Workflow roster names `/ft-goal-task`
- [ ] Root `AGENTS.md` §Workflow peer-skill roster names `/ft-goal-task` (KEEP-IN-SYNC pair with the snippet)
- [ ] `claude/skills/ft-new-project/SKILL.md`: Step 3 heading, Step 7 staging block (+2 paths), Step 8 verify (twenty→twenty-two + 2 readlinks) all include ft-goal-task
- [ ] `docs/MIGRATION.md`: §1.2 (23→24 ships, ten→eleven wires, seven→eight family + `/ft-goal-task` + purpose clause), §1.6 staging block (+2 paths), §1.7 verify enumeration (+`/ft-goal-task`)
- [ ] `docs/GLOSSARY.md`: three new entries (goal loop · heartbeat · iteration log) + count ~53→~56
- [ ] `README.md`: §Bootstrapping roster (seven→eight tasknote skills + `/ft-goal-task`); glossary count ~53→~56
- [ ] `claude/skills/ft-flowtron/SKILL.md`: `/ft-goal-task` row added to the bundled-skill table
- [ ] `SPEC.md` §"Skill namespace" parenthetical includes `/ft-goal-task`
- [ ] `SPEC/loop.md` points to `templates/loop-heartbeat-template.md` as the ready-made heartbeat shape ("ship the heartbeat template")
- [ ] Verify: all four wiring blocks count 22; zero stale "23 slash"/"wires ten"/"seven tasknote family"/"twenty symlinks"/"~53" references; `/ft-goal-task` present in all nine surfaces

## 🧩 Subtasks

- [ ] `claude/AGENTS-snippet.md` — append ft-goal-task command+skill to symlink block (→22); add `/ft-goal-task` to paste-block §Workflow roster
- [ ] Root `AGENTS.md` §Workflow — add `/ft-goal-task` to the peer-skill line
- [ ] `ft-new-project/SKILL.md` — Step 3 heading + Step 7 staging (+2) + Step 8 verify (twenty→twenty-two, +2 readlinks)
- [ ] `docs/MIGRATION.md` — §1.2 counts/enumeration/purpose, §1.6 staging (+2), §1.7 verify prose
- [ ] `docs/GLOSSARY.md` — add goal loop / heartbeat / iteration log entries (alphabetical) + count bump
- [ ] `README.md` — §Bootstrapping roster + glossary count bump
- [ ] `claude/skills/ft-flowtron/SKILL.md` — add `/ft-goal-task` table row after `/ft-debug`
- [ ] `SPEC.md` — add `/ft-goal-task` to §"Skill namespace" list after `/ft-debug`
- [ ] `SPEC/loop.md` — add pointer to the heartbeat template
- [ ] Verify counts + stale-reference sweep + presence check

## 🔗 Related

- [[CORE-EPIC-330]] — parent epic (loop-integration)
- [[CORE-330.4]] — predecessor: shipped `/ft-goal-task` skill being wired here
- [[CORE-330.3]] — predecessor: shipped `templates/loop-heartbeat-template.md`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every wiring/roster site cited is genuinely stale at HEAD — `/ft-goal-task` (shipped in [[CORE-330.4]]) is absent from the symlink set, all count/roster surfaces, and SPEC §"Skill namespace"; and `templates/loop-heartbeat-template.md` ([[CORE-330.3]]) is referenced from no adopter-facing surface. CORE-330.4's handoff summary explicitly assigns this exact fan-out to `.5`.

- [x] Read relevant source files — `claude/AGENTS-snippet.md`, root `AGENTS.md`, `ft-new-project/SKILL.md`, `ft-update/SKILL.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `README.md`, `ft-flowtron/SKILL.md`, `SPEC.md`, `SPEC/loop.md`, `templates/loop-heartbeat-template.md`, `commands/ft-goal-task.md`, `skills/ft-goal-task/SKILL.md`.

- [x] **Archive skim** — CORE-329.2 (ft-update-wiring-sync, 2026-07-02) is the byte-for-byte precedent: same fan-out shape (moved the wiring count 18→20 by appending the ft-update command+skill pair across AGENTS-snippet + ft-new-project Steps 3/7/8 + MIGRATION §1.2/§1.6/§1.7, plus a standing count check in ft-release §7.1). CORE-330.3 (heartbeat template) + CORE-330.4 (ft-goal-task skill) both explicitly deferred *all* adopter wiring + roster + SPEC-namespace + GLOSSARY + README sync to this `.5`.

- [x] **Drift check** — verified at HEAD: AGENTS-snippet has 20 `^ln -s` lines (no ft-goal-task); `commands/ft-goal-task.md` stub exists; MIGRATION §1.2 says "ships 23 slash commands" but `ls claude/commands/` = **24** stubs (ft-goal-task uncounted) and "wires ten"; ft-new-project Step 8 "all twenty symlinks"; GLOSSARY + README say "~53 entries"; SPEC §"Skill namespace" list and ft-flowtron table both omit `/ft-goal-task`; `SPEC/loop.md` describes heartbeats but contains **no** reference to the template path. No stale cite in the task description itself.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Scope authority:** CORE-330.4 Final Summary — *"all adopter wiring (symlink set, MIGRATION/AGENTS-snippet counts, `ft-update`, GLOSSARY, README + `ft-flowtron` rosters, and the SPEC §"Skill namespace" entry) is `.5`'s."* This is the canonical scope list, wider than the PLAN parenthetical but not a deviation from it.
- **ft-update needs no edit.** `ft-update/SKILL.md` Step 4 re-wires new skills by reading the `ln -s` list from the freshly-bumped `AGENTS-snippet.md` §"One-time symlink wiring" *dynamically* — no hardcoded count. Adding ft-goal-task to the snippet is automatically picked up. Its Step 4 global-skills exclusion list (`ft-flowtron/ft-stats/ft-quality/ft-new-project/ft-audit-context/ft-update`) correctly does **not** include ft-goal-task (a per-project runner). Confirmed no change required — the "ft-update" bullet in the PLAN parenthetical is satisfied by the snippet edit.
- **Ordering decision (append-at-end):** ft-goal-task is a tasknote-family runner, but the symlink/staging/verify blocks are chronologically appended (worktree pair, then ft-update, sit after the tasknote skills — not interleaved). Mirroring CORE-329.2 exactly, ft-goal-task's command+skill are **appended at the end** of each block (after ft-update). Prose groupings ("eight tasknote family") describe logical groups, not physical block order.
- **"Ship the heartbeat template" =** add a discoverability pointer from `SPEC/loop.md` (the loop contract) to `templates/loop-heartbeat-template.md`. The file already ships via submodule and is in the project-local ledger (`.flowtron/tasknote/README.md:11`, done by CORE-330.3), but no adopter-facing contract names it — an adopter reading the heartbeat section has no path to the ready-made shape. The README repo-layout templates line (193) is deliberately selective (omits micro/starter too) → left alone.
- **GLOSSARY scope held to the three named terms** (goal loop, heartbeat, iteration log). A `/ft-goal-task` command entry (paralleling the existing `/ft-update` entry) is a reasonable future nicety but out of the PLAN's explicit three — the command is already covered by SPEC §"Skill namespace" + the two rosters. Count is approximate ("~"); bumping ~53→~56 for +3.
- **README ft-update omission (out of scope, flagged):** README §Bootstrapping lists "seven tasknote skills … plus the two worktree utilities" and omits `/ft-update` (a pre-existing gap CORE-329.2's doc-drift sweep chose to leave). This task adds `/ft-goal-task` (seven→eight) but does **not** silently backfill ft-update — candidate for a later micro if desired.
- **No clarifications needed.** Explicit assumptions: (1) ft-goal-task is auto-wired per-project (per 330.4 "symlink set" scope); (2) append-at-end ordering per CORE-329.2 precedent; (3) heartbeat "ship" = SPEC/loop.md pointer; (4) GLOSSARY = exactly the three named terms. All are routine judgment calls, no approach-changing ambiguity.
- Discovery surfaced no significant deviation → skip 🛠️ (the wider fan-out is the *planned* scope per 330.4's handoff, mirroring CORE-329.2).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-329.2 fan-out shape verbatim: append the command+skill pair at the end of each wiring block, bump the counts, add the skill to every roster/enumeration in place. No new shape invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (documentation/skill-prose only; verification is the deterministic count + presence sweep in Phase 3)

**Implementation Notes:**

Nine surfaces edited (append-at-end ordering throughout, per precedent):

1. `claude/AGENTS-snippet.md` — symlink block 20→22 (ft-goal-task command+skill appended after ft-update); paste-block §Workflow roster gains a `/ft-goal-task` bullet (sibling to the `/ft-debug` bullet) that also names the heartbeat template.
2. `AGENTS.md` (root) — §Workflow peer-skill line gains `/ft-goal-task` (KEEP-IN-SYNC pair with the snippet).
3. `claude/skills/ft-new-project/SKILL.md` — Step 3 heading, Step 7 staging (+2 paths, →22), Step 8 verify ("twenty"→"twenty-two" + 2 readlinks, →22).
4. `docs/MIGRATION.md` — §1.2 ("23"→"24" ships, "ten"→"eleven" wires, "seven"→"eight tasknote family" + `/ft-goal-task` in the list + "goal-loop runner" purpose clause); §1.6 staging (+2 paths, →22); §1.7 verify menu enumeration (+`/ft-goal-task`).
5. `docs/GLOSSARY.md` — three alphabetized entries (goal loop / heartbeat / iteration log) + count "~53"→"~56".
6. `README.md` — §Bootstrapping ("seven"→"eight tasknote skills" + `/ft-goal-task`); glossary count "~53"→"~56".
7. `claude/skills/ft-flowtron/SKILL.md` — `/ft-goal-task` table row after `/ft-debug`.
8. `SPEC.md` — §"Skill namespace" parenthetical gains `/ft-goal-task` after `/ft-debug`.
9. `SPEC/loop.md` — intro now points to `templates/loop-heartbeat-template.md` as the ready-made heartbeat shape ("ship the heartbeat template").

**Deliberately not touched:** `ft-update/SKILL.md` (reads the snippet's `ln -s` list dynamically → auto-picks-up ft-goal-task; global-skills exclusion correctly omits it); MIGRATION §3.8 legacy-migration smoke list ("eight total" subset that already omits `/ft-update` — CORE-329.2 left it, so parity holds); README repo-layout templates line (deliberately selective — omits micro/starter too).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; no test-bearing code changed)

- [x] Ran lint/type-check on changed code — deterministic verification instead: 24 command stubs; AGENTS-snippet / ft-new-project Step 7 / ft-new-project Step 8 / MIGRATION §1.6 all count 22; stale-reference sweep (`ships 23`/`wires ten`/`seven tasknote family`/`all twenty symlinks`/`~53`) returns zero; `/ft-goal-task` present in all nine surfaces; `git diff --check` clean (no trailing whitespace)

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; docs/skill-prose only)

**Testing Notes:**

- Count checks: `ls claude/commands/ | wc -l` = 24 (matches new "ships 24"); `grep -c "^ln -s"` snippet = 22; Step 7 staging `.claude/` paths = 22; Step 8 readlinks = 22; MIGRATION §1.6 `.claude/` paths = 22.
- Stale sweep clean; presence sweep confirms `/ft-goal-task` in AGENTS-snippet (3×), AGENTS.md, ft-new-project (5×), MIGRATION (4×), GLOSSARY, README, ft-flowtron, SPEC.md, SPEC/loop.md (4×).
- No code changed (markdown only; no md linter configured); no frontend → 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 11 AI-referenced ledger entries:

  - `README.md` — **updated** (§Bootstrapping roster seven→eight + `/ft-goal-task`; glossary count ~53→~56)
  - `SPEC.md` — **updated** (§"Skill namespace" +`/ft-goal-task`)
  - `docs/MIGRATION.md` — **updated** (§1.2 counts/enumeration/purpose; §1.6 staging; §1.7 verify menu)
  - `claude/AGENTS-snippet.md` — **updated** (symlink block 20→22; paste-block §Workflow roster +`/ft-goal-task`)
  - `docs/CONVENTIONS.md` — no change (conventions doc; no skill roster/count)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (goal-loop/heartbeat add no new attack surface — the loop gate-collapse parks on destructive steps via `status: blocked`, inside the existing threat model)
  - `docs/AGENT-NEUTRALITY.md` — no change (`/ft-goal-task` is agent-neutral; no new Claude-specific contract-layer surface)
  - `docs/PLATFORMS.md` — **updated** (surfaced by this sweep: matrix row "Seven→Eight tasknote skills" +`/ft-goal-task`; `commands/`+`skills/` counts 23→24 + `ft-goal-task.md` in the stub enumeration)
  - `claude/CAPABILITIES.md` — no change (Claude Code capability-trigger reference, not a skill roster)
  - `docs/AGENT-COMPAT.md` — no change (per-agent matrix says "full `ft-*` bundle shipped" with no count/roster; last-verified stamps are version-pinned)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-02.` (stays nested under the open `CORE-EPIC-330` in `## Medium`; cohort moves to `## Completed` when the epic closes at `.6`) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:** Wired `/ft-goal-task` (shipped [[CORE-330.4]]) into the adopter-facing surface and shipped the heartbeat template pointer, per [[CORE-330.4]]'s handoff scope and the [[CORE-329.2]] fan-out precedent. **Symlink set** (append-at-end, mirroring CORE-329.2): `claude/AGENTS-snippet.md` 20→22 `ln -s` lines + paste-block §Workflow roster bullet; `ft-new-project/SKILL.md` Step 3 heading + Step 7 staging + Step 8 verify (twenty→twenty-two); `docs/MIGRATION.md` §1.2 (ships 23→24, wires ten→eleven, seven→eight tasknote family + goal-loop purpose), §1.6 staging, §1.7 verify menu. **Rosters/enumerations**: root `AGENTS.md` §Workflow (KEEP-IN-SYNC), `ft-flowtron` bundled-skill table, `SPEC.md` §"Skill namespace", and `docs/PLATFORMS.md` (matrix row + 23→24 stub counts — surfaced by the Phase 4 doc-drift sweep). **GLOSSARY**: three new entries (goal loop · heartbeat · iteration log) + count ~53→~56, echoed in README. **Heartbeat "ship"**: `SPEC/loop.md` intro now points to `templates/loop-heartbeat-template.md` (the file shipped in [[CORE-330.3]] but was referenced from no adopter-facing contract). `ft-update/SKILL.md` deliberately untouched — it re-wires new skills by reading the snippet's `ln -s` list dynamically. Verified: 24 command stubs; all four wiring blocks count 22; zero stale `23`/`ten`/`seven`/`twenty`/`~53` references; `/ft-goal-task` present across all ten edited surfaces; `git diff --check` clean. Markdown-only, no code. Remaining epic child: `.6` (audit).

**Archived:** 2026-07-02
