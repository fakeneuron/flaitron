---
title: footprint-decision
status: completed
tags: [epic-child, decision]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-735, CORE-735.2, CORE-735.4, CORE-735.N, CORE-727, CORE-683]
touches:
  - .flaitron/PLAN.md
  - .flaitron/tasknote/CORE-735.3.md
---

# CORE-735.3 | footprint-decision

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-735]]

## 🎯 Goal

Decide, from CORE-735.2's measured numbers, how flaitron cuts the adopter submodule footprint — documented shallow submodules, relocating archived tasknotes off the default branch, or another measured option — while keeping flaitron-self's decay-window evidence reachable.

## ✅ Acceptance

- [x] Decision, rationale, and each rejected option with its reason are recorded in this note — `grep -q '^### Decision' .flaitron/tasknote/archive/core/CORE-735.3.md && grep -q '^### Rejected options' .flaitron/tasknote/archive/core/CORE-735.3.md`
- [x] CORE-735.4 (implementation) is filed as an unchecked child nested under the epic, before `.N`, within the 70-word cap — `awk '/\*\*CORE-735\.4\*\*/{a=NR} /\*\*CORE-735\.N\*\*/{n=NR} END{exit !(a && n && a<n)}' .flaitron/PLAN.md && grep -qE '^  - \[ \] \*\*CORE-735\.4\*\*' .flaitron/PLAN.md`
- [x] Decay-window evidence stays reachable: the tasknote archive stays on `main` at its current path, so CORE-727 / CORE-683 counts are unchanged — `git ls-files .flaitron/tasknote/archive/core | grep -q CORE-724.7.md && git ls-files .flaitron/tasknote/archive/core | grep -q CORE-680.md`
- [x] Decision-only: no deliverable outside `.flaitron/` — `git show --name-only HEAD | grep -v '^\.flaitron/'` shows only the commit header
- [x] Downstream-impact scan recorded for the `.4` filing and the direction change — `grep -q '^### Downstream-impact scan' .flaitron/tasknote/archive/core/CORE-735.3.md`

## 🧩 Subtasks

- [x] Frame the options against the `.2` numbers, adding sparse-checkout as a third measured option (scratchpad test)
- [x] Operator chooses the direction and the `.3` scope (AskUserQuestion)
- [x] Record the decision, rejected options, and `.4` scope in Implementation Notes
- [x] File CORE-735.4 nested before `.N`; run the downstream-impact scan

## 🔗 Related

- [[CORE-EPIC-735]] — parent epic (adopter-footprint)
- [[CORE-735.2]] — predecessor: the measured numbers this decision consumes
- [[CORE-735.4]] — follow-up: implements the decision
- [[CORE-735.N]] — follow-up: epic audit
- [[CORE-727]] — decay-window evidence that must stay reachable
- [[CORE-683]] — decay-window evidence that must stay reachable

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` left the choice open with numbers in hand ("Implications for `.3` (not decided here)"). Nothing else in PLAN decides it. The row offers two options. Discovery measured a third, and the operator chose it at the clarifying step. The task is still "choose", so this is not a Re-scope. The `.3` stub flip at closure replaces the two-option description anyway.

- [x] Read relevant source files — the archived CORE-735.2 note (all tables), `docs/MIGRATION.md` §1.1 (add → `checkout <tag>` → dogfood-archive fence), `claude/skills/ft-new-project/SKILL.md` Step 2 + Step 3b, `claude/skills/ft-update/SKILL.md` Step 1 (`fetch --tags`, `tag --sort`) and Step 3 (`checkout <target>`, `describe --tags`), the four `AGENTS-snippet.md` fence paragraphs, and `tools/update-adopters.mjs` (fleet bumps do the submodule checkout too).

- [x] **Best Practices Review** — N/A: decision task, no code or module-boundary change. For relocation, the boundary question is whether flaitron-self's archive path diverges from the adopter layout. It would, and the decision weighs that.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). Load-bearing hits:
  - [[CORE-735.2]]: all numbers.
  - [[CORE-724.7]] / [[CORE-680]]: decay-window bars. Each counts tasknotes archived past a window-start SHA (`504f160f`: 10 notes + ≥1 `/ft-audit` filing; `a78a8ae5`: 8 epic notes). Either count needs new archives to keep landing where `git log`/`ls` on `main` can see them.
  - [[CORE-464]]: CI `validate` keeps `fetch-depth: 0`.
  - The audit-repo "Self-hosting ballast" theme is recorded only in the PLAN parent row, not in an archived note.

- [x] **Drift check** — PLAN row matches. The cited surfaces exist as named (MIGRATION §1.1, `ft-new-project` Step 2, `ft-update` Steps 1/3). The `.2` numbers re-checked: `du -sk .flaitron/tasknote/archive` → 16,332 KB, 956 files in `archive/core/`. Live `tasknote/archive` references outside `.flaitron/`: 35 files (runners' archive skim, `/ft-release` Pair P, `tools/drift-checks.sh` pairs at lines 117/358/417, `.gitleaks.toml:40`, CONTRIBUTING, DOGFOOD, viz tests). Those 35 measure the relocation cost. No SPEC drift.

- [x] Asked clarifying questions — AskUserQuestion, two questions:
  - **Direction:** operator chose **Sparse-checkout (Recommended)** over sparse + `shallow = true`, shallow only, and relocate archive.
  - **Scope:** operator chose **Decide + file `.4` (Recommended)**. `.3` records the decision and files the implementation as CORE-735.4.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Sparse-checkout probe (scratchpad, local `file://` submodule of this checkout):
- `git submodule add` + `checkout v5.35.0` → working tree 18,528 KB.
- `git -C <FT> sparse-checkout set --no-cone '/*' '!/.flaitron/'` → **2,892 KB** (−84%). `.flaitron/` is gone; `SPEC.md` and `claude/skills/ft-task/SKILL.md` are present.
- `checkout v6.0.0`, i.e. `/ft-update` Step 3 → sparse still holds (no `.flaitron/`), `describe --tags` → `v6.0.0`, `status --short` clean.
- Sparse config lives in the submodule's gitdir (`.git/modules/.flaitron/core`). Like a bare `--depth 1`, a fresh `clone --recurse-submodules` of the superproject does not carry it.
- Probe git: 2.55.0. `--no-cone` patterns need git ≥ 2.25; `.4` should state its own floor.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the [[CORE-735.2]] shape: the record lives in this note, and the follow-on work is its own nested PLAN row, filed before `.N` per `SPEC/epic.md` §Lifecycle step 5 ("new implementation children insert *before* `.N`").

- [x] **Minimal refactor gate** — no source touched. The only PLAN.md edit is the new `.4` row; the `.3` flip happens at closure.

- [x] Implemented the minimal solution — decision recorded below, and CORE-735.4 filed.

- [x] Updated/added tests for non-trivial behavior — N/A: no code.

**Implementation Notes:**

### Decision

**Adopters sparse-checkout the submodule without `.flaitron/`. Flaitron-self's archive stays on `main`, where it is now.** Recipe: `git -C .flaitron/core sparse-checkout set --no-cone '/*' '!/.flaitron/'`. It runs once after the pin checkout in MIGRATION §1.1 and `ft-new-project` Step 2. `ft-update` re-runs it after each checkout; the command is idempotent. Sparse config is per-clone, so a fresh superproject clone comes back full until the next bump. The existing deny-rule / `.ignore` / `.cursorignore` fence stays as the fallback for that window and for adopters who skip the step.

Why sparse:
- It targets the larger share. The 15.8 MB `.flaitron/` checkout is ~85% of the working tree, and it grows with every release. Measured: 18.5 MB → 2.9 MB.
- It costs flaitron-self nothing. The archive path, atomic closure commits, the runners' archive skim, Pair P, `drift-checks.sh`, gitleaks, and CI all stay as they are.
- `/ft-update`'s tag recipe is untouched. Object store, `fetch --tags`, `tag --sort`, and `describe --tags` behave as in `.2`'s full-clone row.

Known costs, for `.4` to document:
- The step is not durable across a superproject re-clone. `.4` places the re-apply in `ft-update` and keeps the fence as fallback.
- Sparse also hides the per-release tasknote that MIGRATION §"Pinning and bumping" names for major bumps. The deny rule already has that cost, and the annotated tag message stays readable.
- Objects are unchanged: the full ~11.5 MB history stays in `.git/modules/.flaitron/core`.

### Rejected options

| Option | Saves | Rejected because |
|---|---|---|
| `shallow = true` in `.gitmodules` (row option A) | ~2.6 MB objects (−23%); cheapest bump (0.24 vs 0.44 MiB) | Leaves the 15.8 MB working-tree share untouched. MIGRATION's add-then-`checkout <tag>` would need a depth-aware `fetch --depth 1 origin tag <tag>` step. The operator declined it, alone and combined with sparse. |
| Bare `--depth 1` | ~5.2 MB objects on the adding machine only | Not recorded, so a superproject re-clone comes back full. With today's `fetch --tags` a bump costs 4.3 MiB and ends larger than a full clone ([[CORE-735.2]] Per-bump table). |
| Relocate archived tasknotes off `main` (row option B: orphan branch, worktree, or separate repo) | Working tree at the source, for every adopter durably | A closure would need two commits on two branches. That breaks SPEC §"Paper-complete guard"'s single atomic closure commit. It also rewires 35 live files that reference `tasknote/archive` (runner archive skim, `/ft-release` Pair P, `drift-checks.sh`, `.gitleaks.toml`, CI), and the decay-window counts for [[CORE-727]] / [[CORE-683]] would have to read another branch. History objects stay in every full clone anyway. |
| Neither (fence only) | — | The fence covers context pollution but none of the bytes. Sparse is a one-line, adopter-side cut of 84%. |

**Decay-window evidence.** The archive stays at `.flaitron/tasknote/archive/` on `main`. [[CORE-727]]'s count (10 notes past `504f160f`, plus an `/ft-audit` filing) and [[CORE-683]]'s (8 epic notes past `a78a8ae5`) keep reading the same path.

### `.4` scope

Filed as [[CORE-735.4]] `[medium]` under the epic, before `.N`:
- MIGRATION §1.1: sparse line after `checkout <tag>`; fence paragraph reworded as the fallback.
- `ft-new-project` Step 2, plus a Step 3b note.
- `ft-update`: re-apply after Step 3 checkout.
- Check the four `AGENTS-snippet.md` fence paragraphs and `tools/update-adopters.mjs`. Its checkout respects an existing sparse config, so the open question is only whether it should also apply one.
- State the git floor.

Out of flaitron's remit: natabula deposits the dogfood-archive fence files (`/natabula-layer-drift` "dogfood-archive fence"). Whether those deposits change is natabula's call once `.4` ships.

### Downstream-impact scan

Triggers: the `.4` filing, plus a direction change (relocation rejected).

| Entry | Shared surface | Class | Action |
|---|---|---|---|
| CORE-EPIC-735 parent | the footprint problem statement | Unaffected | Leave — still describes the problem |
| CORE-735.N | audits the epic | Unaffected | Leave — audits `.4`'s edits as it would have audited either option |
| CORE-727 | decay-window count over `archive/core/` | Unaffected | Leave — archive path unchanged |
| CORE-683 | decay-window count over `archive/core/` | Unaffected | Leave — archive path unchanged |
| CORE-736, CORE-641 | no shared surface | — | not candidates |

No entry is stale, contradictory, or redundant, so no PLAN edit beyond the `.4` filing that the operator approved at the clarifying step.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; the deliverable is this decision record and one PLAN row

- [x] Ran lint/type-check on changed code — N/A: markdown-only diff

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the diff is this tasknote plus one new PLAN row and the `.3` stub flip. There is no code for `/code-review` to grade, Acceptance is decided by the greps below, and the decision itself was the operator's at the clarifying step.

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (run against the archive path after the move, before commit):

- `grep -q '^### Decision' … && grep -q '^### Rejected options' …` → 0
- `awk '…CORE-735.4 before CORE-735.N…' .flaitron/PLAN.md && grep -qE '^  - \[ \] \*\*CORE-735\.4\*\*' .flaitron/PLAN.md` → 0 (54 words, under the 70-word cap)
- `git ls-files .flaitron/tasknote/archive/core | grep -q CORE-724.7.md && … CORE-680.md` → 0
- `grep -q '^### Downstream-impact scan' …` → 0
- Decision-only: `git diff --cached --name-only | grep -v '^\.flaitron/'` → 1 (no output; post-commit `git show --name-only HEAD` confirms)
- `bash tools/drift-checks.sh` → 0 (includes Pair R stub-row shortname check on the flipped `.3` row)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every §"AI-referenced docs" entry (SPEC.md + SPEC modules, README, AGENTS, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION, PHILOSOPHY, DOGFOOD, CONTEXT-BUDGET, VERSION-HISTORY, UPGRADING, GLOSSARY, skill bodies): **no change**. This task only decides. The surfaces the decision will change (MIGRATION §1.1, `ft-new-project`, `ft-update`, the four snippets' fence paragraphs) still describe today's behavior accurately. Editing them is [[CORE-735.4]]'s job.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Task-local: an option set in a PLAN row ("choose between A and B") is not a closed set. A cheap scratchpad probe of a third option can beat both, and the clarifying step is where it reaches the operator.

**Final Summary:**

Decided: adopters sparse-checkout the submodule without `.flaitron/`; flaitron-self's archive stays on `main`. Measured working tree 18.5 → 2.9 MB (−84%). Survives `/ft-update`'s tag checkout; lost on superproject re-clone, so `ft-update` re-applies it and the existing fence stays as fallback. Rejected: `shallow = true` (−23% objects, misses the working tree), bare `--depth 1` (not durable, 10× bump cost), and archive relocation (breaks the atomic closure commit, rewires 35 files, moves the decay-window evidence). Filed [[CORE-735.4]] `[medium]` for the doc/skill edits, before `.N`. Downstream scan: all Leave.

Changed files: `.flaitron/tasknote/archive/core/CORE-735.3.md` (new) and `.flaitron/PLAN.md` (`.4` row added, `.3` stub flip). `touches:` reconciliation: declared `.flaitron/PLAN.md` + the tasknote; actual the same two, with the tasknote at its archive path. No refactors, no doc changes (verdict above). Maintainability effect: the epic has a concrete, adopter-side implementation row instead of an open either/or, and nothing in flaitron-self's workflow surface moves.

**Archived:** 2026-10-08
