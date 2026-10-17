---
title: global-standards-diff
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-770, CORE-770.1]
touches:
  - ~/.claude/CLAUDE.md
  - ~/code/AGENTS.md
parallel-safe-with:
  - CORE-770.2
  - CORE-770.4
---

# CORE-770.3 | global-standards-diff

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-770]]

## 🎯 Goal

Draft (and land, operator-applied or with per-path approval) the layer-1/2 edits that align `~/.claude/CLAUDE.md` and `~/code/AGENTS.md` with flaitron v7, and inventory stale `~/.claude/skills/` links.

## ✅ Acceptance

- [x] `~/.claude/CLAUDE.md` carries the skill-gates carve-out next to the ask-first rule — `grep -q 'flaitron skill (`.ft-\*`) drives the task' ~/.claude/CLAUDE.md`
- [x] `~/.claude/CLAUDE.md` Model Selection names all five rungs — `grep -oE '\[(light|medium|heavy|frontier|xheavy)\]' ~/.claude/CLAUDE.md | sort -u | wc -l` = 5
- [x] `~/.claude/CLAUDE.md` new-repo pointer names `/ft-adopt` and `/project-20-adopt` — `grep -q 'run `.ft-adopt`' ~/.claude/CLAUDE.md && grep -q '`.project-20-adopt`' ~/.claude/CLAUDE.md`
- [x] `~/code/AGENTS.md` says skill invocation authorizes its closure commit and push stays an explicit ask — `grep -q 'authorizes its closure commit' ~/code/AGENTS.md`
- [x] `~/.claude/skills/` inventoried: each flaitron-owned entry classified live / renamed / retired / dangling, with drafted fix commands for the operator — `judgment` (listing came from an operator `ls`; the hook blocks agent reads)
- [x] No other line in either file changed — `judgment` (four anchored `Edit` replacements, each matching the before/after text approved at 🛠️)

## 🧩 Subtasks

- [x] Draft the four edits (before/after) and show them at 🛠️
- [x] Operator runs `! ls -la ~/.claude/skills/`; classify each entry and draft fix commands
- [x] Apply the layer-1 edits to `~/.claude/CLAUDE.md` (per-path approval; on hook block, hand the text to the operator)
- [x] Apply the layer-2 edit to `~/code/AGENTS.md` (same fallback)
- [x] Run the Acceptance greps; record the receipt
- [x] Phase 4: doc-drift sweep, `.3` stub flip, archive, commit (tasknote + PLAN only — the global files are outside the repo)

## 🔗 Related

- [[CORE-EPIC-770]] — parent epic
- [[CORE-770.1]] — Discovery; §A items 1–4 and §D are this child's inputs
- [[CORE-770.4]] — project-20 rows; the NAT-195 grep-pattern false positive hit again here (Implementation Notes)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both layer-1/2 files in this session's context still carry every gap `.1` §A named: the ask-first rule has no skill carve-out, Model Selection names only `[heavy]`/`[light]`, the new-repo pointer names `SPEC.md` + `docs/MIGRATION.md` but not `/ft-adopt` or `/project-20-adopt`, and `~/code/AGENTS.md` says nothing about closure-commit authorization.

- [x] Read relevant source files — `~/.claude/CLAUDE.md` and `~/code/AGENTS.md` (in session context, then read from disk before editing), `SPEC/model.md` §1 (the five-rung ladder + glyphs), `claude/skills/` roster and `claude/skills/ft-adopt/SKILL.md` frontmatter (`ft-adopt` bootstraps fresh projects in v7).

- [x] **Best Practices Review** — `N/A` for code. Ownership boundary from `.1`: layers 1–2 are operator-authored, so edits land only as an operator-applied diff or under explicit per-path approval.

- [x] **Archive skim** — `archive/core/` (confirmed against README table row `CORE-*`). `CORE-770.1` is the load-bearing precedent (§A, §D, Resolved scoping); CORE-769.3–.7 record the NAT-195 hook blocking `~/.claude` paths.

- [x] **Drift check** — PLAN line matches `.1`'s Resolved scoping verbatim (carve-out → layer 1; commit authorization → layer 2; push stays an ask). `~/.claude/skills/` remains uninspected (`.1` §D) — needs an operator `ls`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 3 asks via AskUserQuestion; see Resolved scoping

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Resolved scoping (AskUserQuestion, 2026-10-09).**

| Question | Decision |
|---|---|
| Apply mode | Agent applies under per-path approval (`~/.claude/CLAUDE.md`, `~/code/AGENTS.md`) after the operator reviews the draft; hook block → hand the text over |
| Skills inventory | Operator runs `! ls -la ~/.claude/skills/` in-session; agent classifies and drafts fix commands |
| Carve-out strength | Skill gates govern; ask-first covers work outside a skill (no extra ambiguity clause) |

**Paper-complete note.** The deliverables live outside the repo (`~/code` is not a git repo; `~/.claude` is not tracked here), so the closure commit stages only this note + PLAN. The Acceptance greps are the evidence that the out-of-repo edits landed. `touches:` lists the two global files for the record; `git diff --name-only` cannot reconcile them.

Discovery surfaced an operator review point (draft before out-of-repo writes) → fire 🛠️. Operator replied "go".

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — each edit extends its file's existing bullet style (layer 1: single-line bullets; layer 2: wrapped bullets with bold lead); no new section

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose edits to operator config

**Implementation Notes:**

Applied verbatim as approved at 🛠️ (all via `Edit`; the hook does not gate `Edit`):

1. `~/.claude/CLAUDE.md` §Core Principles — new bullet after the ask-first rule: "When a flaitron skill (`/ft-*`) drives the task, its own gates and flags decide when to ask; the ask-first rule above governs work outside a skill."
2. `~/.claude/CLAUDE.md` §Model Selection — line now names `[medium]🧩`, `[frontier]💎` (deliberate, never default), `[xheavy]🔭` (manual-only), pointing at `SPEC/model.md`.
3. `~/.claude/CLAUDE.md` §Execution & Verification — new-repo pointer now leads with `/ft-adopt` (MIGRATION for manual steps, SPEC for the contract) and names `/project-20-adopt` as the front door for repos with a brainstorm root `PLAN.md`.
4. `~/code/AGENTS.md` §Git workflow — new bullet after the commit-to-main rule: invoking a `/ft-*` skill authorizes its closure commit per its own gates; push always needs an explicit ask.

**`~/.claude/skills/` inventory (flaitron-owned entries only).** Other entries are non-flaitron (vendor links and local skills) and out of scope; per the Path Access rule they are not itemized here.

| Entry | Target | Verdict |
|---|---|---|
| `ft-audit-repo` | `flaitron/claude/skills/ft-audit-repo` (absolute) | live |
| `ft-new-project` | `flaitron/claude/skills/ft-new-project` (absolute) | **dangling** — renamed to `ft-adopt` in v7 (`test -e` → 1) |
| `project-20-*` (5) | `project-20/.claude/skills/*` | live; any v7 wording inside them is `.4`'s remit (NAT-391) |

Drafted fix for the operator (absolute target, so the NAT-195 relative-`..` false positive does not fire):

```sh
rm ~/.claude/skills/ft-new-project
ln -s ~/code/flaitron/claude/skills/ft-adopt ~/.claude/skills/ft-adopt
```

**Hook false positive (evidence for `.4`).** The first Acceptance run was blocked because NAT-195 read the grep pattern `'/ft-adopt'` as a path outside the repo. Rewritten with `.` in place of the leading `/`, it ran. This is the same class as the grep-regex case `.1` §C logged; `.4`'s row already carries that class, so nothing new is filed.

**Downstream impact:** none — no flaitron contract or open row changes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — Acceptance greps below; in-repo diff is this note + PLAN (markdown pass + drift checks)

- [x] **External review** — `N/A`: the deliverable is operator-config prose the operator approved verbatim at 🛠️, and it lives outside the repo diff a `/code-review` would grade (CORE-770.1 precedent)

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -q 'flaitron skill (`.ft-\*`) drives the task' ~/.claude/CLAUDE.md          → 0
grep -oE '\[(light|medium|heavy|frontier|xheavy)\]' ~/.claude/CLAUDE.md | sort -u | wc -l → 5
grep -q 'run `.ft-adopt`' … && grep -q '`.project-20-adopt`' ~/.claude/CLAUDE.md → 0
grep -q 'authorizes its closure commit' ~/code/AGENTS.md                         → 0
test -e claude/skills/ft-new-project                                             → 1 (dangling link confirmed)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change for every entry. The edits land in the operator's layers 1–2, which flaitron's docs deliberately do not cite (`.1` drift check).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`. The boundary `.1` set holds: flaitron's contract says nothing about the global layer.

**Final Summary:**

The operator's global layer now matches flaitron v7. `~/.claude/CLAUDE.md` gained three edits:
- a carve-out letting `/ft-*` skill gates govern asking
- the full five-rung model ladder
- a new-repo pointer naming `/ft-adopt` and `/project-20-adopt`

`~/code/AGENTS.md` now says that invoking a skill authorizes its closure commit, while push stays an explicit ask. The skills inventory found one dangling link, `ft-new-project`; the drafted relink to `ft-adopt` is the operator's to run.

- **Changed files:** `~/.claude/CLAUDE.md`, `~/code/AGENTS.md` (outside the repo, approved by name); in-repo: `.flaitron/PLAN.md` (`.3` stub) and this note.
- **Verification:** 4 Acceptance greps → 0; dangling-link check → 1 as expected; drift checks → 0.
- **Refactors:** none.
- **Docs verdict:** no change.
- **`touches:` reconciliation:** both declared paths are outside the repo, verified by grep. `git diff --name-only` shows only PLAN + this note.
- **Maintainability:** each edit is one bullet in its file's existing style, so the operator can read and revert it at a glance.

**Archived:** 2026-10-09
