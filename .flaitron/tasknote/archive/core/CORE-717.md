---
title: plan-filing-commit
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: [CORE-591]
touches:
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - SPEC/plan-filing.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - SPEC.md
  - docs/AGENT-NEUTRALITY.md
  - docs/MIGRATION.md
  - claude/commands/ft-audit-repo.md
---

# CORE-717 | plan-filing-commit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-591]]

## 🎯 Goal

Every skill that writes new PLAN.md rows commits its own filing with a PLAN.md-only `chore: file …` commit, matching `/ft-file-followup` and SPEC/plan-filing.md §"Filing commits".

## ✅ Acceptance

- [x] Sweep recorded: every PLAN-row-writing skill classified as has-commit / lacks / exempt-with-reason — `judgment` (Discovery Notes table)
- [x] `/ft-audit-repo` commits its filing under the §"Filing commits" contract (pre-check, explicit pathspec, post-stage verification, no 🏁) — `grep -q 'chore: audit-repo file' claude/skills/ft-audit-repo/SKILL.md`
- [x] `/ft-epic-discovery` commits its Step 4 filing before scaffolding `.1` — `grep -q 'chore: file <AREA>-EPIC-<next-N>' claude/skills/ft-epic-discovery/SKILL.md`
- [x] SPEC/plan-filing.md §"Filing commits" motion list + message table name both new motions — `grep -c 'ft-audit-repo\|ft-epic-discovery' SPEC/plan-filing.md`
- [x] Context budget still holds — `npm --prefix viz test` + CI context-budget block (bash) → 0

## 🧩 Subtasks

- [x] Sweep skills; classify
- [x] Add filing-commit step to `/ft-audit-repo` §6
- [x] Add filing-commit step to `/ft-epic-discovery` Step 4; adjust Step 10 closure message
- [x] Extend SPEC/plan-filing.md §"Filing commits" list + table
- [x] Validate (viz tests incl. budget/drift checks)

## 🔗 Related

- [[CORE-591]] — origin of the index pre-check in §"Filing commits"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-audit` and `/ft-refactor` (named on the PLAN line) already commit their filing; two motions still don't: `/ft-audit-repo` (never commits) and `/ft-epic-discovery` (filing rides the `.1` closure commit, so it's uncommitted dirt while Discovery runs).

- [x] Read relevant source files

- [x] **Best Practices Review** — markdown contract edits; extend the existing ft-audit / ft-refactor commit-step shape rather than inventing one.

- [x] **Archive skim**

- [x] **Drift check** — PLAN line names ft-audit and ft-refactor as candidates; both already carry the commit step (drift, narrows scope, no Re-scope needed).

- [x] Asked clarifying questions — answers: (1) `/ft-epic-discovery` gets its own Step 4 filing commit `chore: file <AREA>-EPIC-<N> — <shortname>` before `.1` scaffold; closure commit becomes `feat: <AREA>-<N>.1 — scope <AREA>-EPIC-<N> children`. (2) `/ft-audit-repo` subject `chore: audit-repo file epics — <N> milestones`. (3) `/ft-release` stays exempt; SPEC §"Filing commits" names it (and closure-time filings) as deliberate exemptions. Also in scope: Pair O prose in `claude/skills/ft-release/step-7.1-mirror-pairs.md` names the runner roster — update it (CI step is literal-triggered, no edit).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

Sweep (`claude/skills/*/SKILL.md`, PLAN-row writers):

| Skill | New PLAN rows? | Filing commit | Verdict |
|---|---|---|---|
| ft-file-followup (default / --park / --starter) | yes | `chore: file <ID> follow-up/park/starter` | has |
| ft-audit | yes (tickets + inline-fix rows) | `chore: audit file tickets — <domain>` | has |
| ft-refactor | yes (epic + children) | `chore: file <AREA>-EPIC-<N> refactor plan` | has |
| ft-seed | edits rows only | `chore: seed [unattended]` | has (n/a) |
| ft-audit-repo | yes (epics per milestone) | none — leaves PLAN dirt | **lacks** |
| ft-epic-discovery | yes (parent + .1 + .N, Step 4) | bundled into `.1` closure `feat:` | **lacks** |
| ft-release | yes (Step 1 optional release row) | deliberately rides release commit ("Do not commit separately") | exempt |
| ft-new-project | creates PLAN.md | bootstrap commit | exempt |
| ft-task / ft-micro-task / ft-close-epic | closure flips; `.1` child filings are closure deliverables | closure commit | exempt |

Codex wrappers (`codex/skills/*/SKILL.md`) are 8-line pointers to the claude bodies — no mirror edit needed.

Archive skim: CORE-591 introduced the index pre-check; CORE-682 added the accumulated-filings rule. No archived note ever deliberately exempted ft-audit-repo or ft-epic-discovery from §"Filing commits" — they were simply never swept. The ft-audit §5 and ft-refactor Step 6 blocks are the shape to copy. Budget: ft-epic-discovery is capped in docs/CONTEXT-BUDGET.md (33,000 B at CORE-595) — keep the insert terse, pointing at the contract.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — copied the ft-audit §5 / ft-refactor Step 6 shape: pre-check setting `auto-commit = `, explicit-pathspec `git add` / `git diff --cached` / `git commit` fence, **Post-stage verification** paragraph, `SPEC/plan-filing.md` §"Filing commits" citation, no 🏁. That shape is what CI Pair O binds (literal-triggered), so both new runners are now under it automatically.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown contract; CI Pair O is the existing detector and now covers both runners.

**Implementation Notes:**

- `claude/skills/ft-epic-discovery/SKILL.md` — Step 4 opens with the pre-check and closes with the commit (`chore: file <AREA>-EPIC-<next-N> — <shortname>`) before Step 5 scaffolds `.1`; `auto-commit = false` leaves rows for the Step 10 closure. Step 10 message → `feat: <AREA>-<next-N>.1 — scope <AREA>-EPIC-<next-N> children`.
- `claude/skills/ft-audit-repo/SKILL.md` §6 — pre-check before the write, commit (`chore: audit-repo file epics — <N> milestones`) after; zero-milestone run skips both; §7 hand-off line names `committed <sha>`.
- `SPEC/plan-filing.md` §"Filing commits" — motion list, authorization list, and message table gain both; new "Deliberately exempt" sentence (closure-filed `.1` children; `/ft-release` release row).
- `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair O prose roster: Five → Seven.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — receipts below; no dead code / duplication beyond the per-runner restatement Pair O deliberately binds.

- [x] **External review** — `/code-review medium` on the working-tree diff; findings + dispositions below. Phase 3 re-ran from the top after the blocker fixes.

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipts (final run, after review fixes):

- `grep -q 'chore: audit-repo file' claude/skills/ft-audit-repo/SKILL.md` → 0
- `grep -q 'chore: file <AREA>-EPIC-<next-N>' claude/skills/ft-epic-discovery/SKILL.md` → 0
- `grep -c 'ft-audit-repo\|ft-epic-discovery' SPEC/plan-filing.md` → 8 (≥1)
- CI Pair O block, run under bash → 0 (`bad=none`, 8 runners incl. both new ones). Under zsh the same loop false-fails every runner — run CI steps with bash.
- CI context-budget block, run under bash → 0 (ft-epic-discovery 30,877 ≤ 33,000)
- `npm --prefix viz test` → 0 (587/587); `npm --prefix viz run lint` → 0

External review (10 findings):

1. plan-filing.md execution-skill fence still said "five" and listed `/ft-epic-discovery` as unchanged → **blocker**, fixed ("seven"; "`/ft-epic-discovery` past its Step 4 filing").
2. SPEC.md:756 roster said "five filing motions" → **blocker**, fixed.
3. plan-filing.md lazy-load header roster missing both → **blocker**, fixed.
4. docs/AGENT-NEUTRALITY.md:39 "five filing motions" → **blocker**, fixed.
5. ft-audit-repo advertised "strictly read-only" while now committing → **blocker**, fixed: "read-only on source" in description, §1.3, §7, `claude/commands/ft-audit-repo.md`, `docs/MIGRATION.md` (×2).
6. Untracked PLAN.md (pre-adoption) would pass the pre-check as clean → **blocker**, fixed: `??` → `auto-commit = false` in ft-audit-repo.
7. Step 10 subject lost "file EPIC" wording when Step 4 skipped → **blocker**, fixed: alternate subject for the uncommitted branch.
8. Step 9 `git mv` on the never-staged `.1` tasknote → **note**, pre-existing → filed [[CORE-718]] (park).
9. `<N>` placeholder collides with the epic number → **note**, fixed: `<count>` + one-line gloss (SKILL + SPEC table).
10. `.N` row named unconditionally; per-runner duplication → **note**: `.N` wording fixed ("when filed"). Duplication is no change, because each runner restating the steps is the Pair O design.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md`: updated (filing-motion roster, five → seven). `docs/MIGRATION.md`: updated ("read-only on source"). `docs/AGENT-NEUTRALITY.md`: updated (seven filing motions). README.md, AGENTS.md, claude/codex/cursor/grok AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md: no change (none names the filing-runner roster or audit-repo's read-only claim).

- [x] Closed

- [x] **Evidence-based recap** drafted

- [x] **Learnings** — N/A in the always-loaded layer. CI blocks extracted for local runs must use `bash`; zsh false-fails Pair O. That's a local-tooling quirk, not a contract change.

**Final Summary:**

Two filing motions now commit their own PLAN.md filing. `/ft-audit-repo` commits as `chore: audit-repo file epics — <count> milestones` (and refuses on an untracked PLAN.md). `/ft-epic-discovery` commits as `chore: file <AREA>-EPIC-<N> — <shortname>` at Step 4, before `.1` is scaffolded, and its `.1` closure subject became `scope … children`. The other filers (ft-file-followup ×3, ft-audit, ft-refactor, ft-seed) already complied. ft-release, ft-new-project, and closure-time filings are now named as deliberate exemptions in SPEC/plan-filing.md §"Filing commits". Rosters in SPEC.md, the module header, the fence, AGENT-NEUTRALITY, and Pair O prose moved from five to seven. 8 files, +53/−19. Scope reconciliation: declared 4 paths; undeclared SPEC.md, docs/AGENT-NEUTRALITY.md, docs/MIGRATION.md, and claude/commands/ft-audit-repo.md came from review findings and were added to `touches:`. Follow-up: [[CORE-718]].

**Archived:** 2026-10-06
