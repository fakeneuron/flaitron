---
title: Codex reconcile block fails under zsh and the NAT-195 path guard
status: completed
tags: [codex, ft-update, ft-adopt, portability]
created: 2026-10-31
due:
related-tasks: []
touches:
  - codex/reconcile-skills.md
  - tools/update-adopters.test.mjs
---

# CORE-849 | Codex reconcile block fails under zsh and the NAT-195 path guard

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Make the `codex/reconcile-skills.md` wiring block run correctly under any
login shell an agent's Bash tool uses (zsh included), and swap its awk `~`
match for the equivalent `match()` so it stops tripping an operator path
guard at no cost.

## ✅ Acceptance

- [x] The wiring block has no `for` loop over a bare or quoted variable/substitution; all three roster loops (body check, link, retired) split the roster from an unquoted `$(printf …)` substitution, which yields the same words under sh, bash, dash and zsh — `node --test tools/update-adopters.test.mjs` (static assertion + zsh run)
- [x] Bootstrap, retired prune, preserved-conflict exit 1 and missing-body exit 1 behave the same when the block is executed by `zsh -f -c` (skipped only where zsh is absent) — `node --test tools/update-adopters.test.mjs`
- [x] The awk roster filter uses `match($NF, /…/)` instead of `$NF ~ /…/` — `! grep -nE 'NF [~] ' codex/reconcile-skills.md`
- [x] Every existing `pinned Codex wiring procedure` case still passes under `sh -c` — `node --test tools/update-adopters.test.mjs`
- [x] Literal `../../` targets are unchanged (operator decision) — `grep -c '"\.\./\.\./\$ft_dir' codex/reconcile-skills.md` → 2
- [x] Updater syntax checks pass — `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the two slug loops and the retired loop to split from `$(printf '%s\n' "$var")` instead of a bare `$var` (current shell, so `exit 1` and `ft_failed` propagate as before)
- [x] Swap `$NF ~ /re/` → `match($NF, /re/)` in the roster awk
- [x] Add one prose line in `codex/reconcile-skills.md` that the block is shell-neutral
- [x] Tests: static no-unsplit-loop assertion + a `zsh -f -c` case (skip when zsh is missing)
- [x] Run the updater suite, syntax checks and drift checks

## 🔗 Related

- (none) — surfaced in the fakeneuron `/ft-update` repair run 2026-10-31 (pin v8.1.0); block introduced by CORE-789 (archived)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both causes still live at HEAD (`codex/reconcile-skills.md:33,36,43,60`). Cause 1 reproduces in plain zsh outside fakeneuron: `for i in $x` over a two-line value iterates once in zsh, twice in sh/bash/dash.

- [x] Read relevant source files — `codex/reconcile-skills.md`; `tools/update-adopters.test.mjs:890-1000` (extracts the two ```sh blocks and runs the first via `sh -c`); `claude/skills/ft-update/SKILL.md` + `claude/skills/ft-adopt/SKILL.md` (reference the block, don't inline it)

- [x] **Best Practices Review** — the block stays one shared markdown procedure (CORE-789 boundary: no installer executable). Loops stay in the current shell, so early `exit 1` and the `ft_failed` accumulator behave as before. A `sh <<'EOF'` wrapper was rejected: `FT_DIR` would have to be exported, and a plain assignment would silently fall back to the default pin.

- [x] **Archive skim** — `archive/core/` hits: CORE-789 (introduced the block + test suite; "execute the shipped markdown block, not a second installer"), CORE-796 (release notes/doc sweep naming the block), CORE-812.4 (retired-table parser usage). None touch shell portability.

- [x] **Drift check** — starter's cited patterns match current lines 33/36/43/60/45/65; PLAN line matches. Sibling scan (`git grep` over claude/codex/cursor/grok/docs/SPEC/templates) found the unsplit loops and awk `~` only in this file.

- [x] Asked clarifying questions — operator chose: `match()` swap only, keep literal `../../` targets (match the sibling snippets + tests); test = zsh run (skip when absent) + static assertion so CI catches it without zsh.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Cause 2 (NAT-195 guard) is operator-side; flaitron takes only the zero-cost `match()` spelling. NAT-195 is out of scope (frozen under NAT-401). The guard also blocked three commands in this run (`~ /` in a grep pattern, a `/.flaitron/...` filter, a sed `/954/,$p` address); rewording got past each.
- Starter context absorbed (original in git history).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — kept the block's `for` loop shape and only changed what is iterated; tests extend the existing `reconcile()` seam with a `shell` parameter

- [x] **Minimal refactor gate** — no refactor; loop bodies unchanged

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `codex/reconcile-skills.md`: three `for ft_slug in $var` loops → `for ft_slug in $(printf '%s\n' "$var")`. zsh word-splits an unquoted command substitution but not a bare parameter, so all four shells see the same words. An empty `$ft_retired` still yields zero iterations. `$NF ~ /re/` → `match($NF, /re/)`. One intro sentence + one inline comment say why. `../../` targets unchanged (operator decision).
- First attempt used here-doc-fed `while IFS= read -r` loops; External review round 1 rejected it (blockers): bare `EOF` delimiter collides with an outer `sh <<'EOF'` wrapper, column-0 terminators break on re-indent, and an uncreatable here-doc temp file silently skips the loops with exit 0. Replaced as above.
- `tools/update-adopters.test.mjs`: `reconcile(f, shell = 'sh')` (zsh runs `-f` to skip user rc files); static assertion rejecting `for x in $var` / `"…"` and any non-double-quoted `$ft_slugs`/`$ft_retired`; a zsh case covering bootstrap, retired prune, preserved-conflict exit 1, and missing-body exit 1 with no link work. Both new tests fail on the original block — the zsh case reproduces `CONFLICT missing pinned body: ft-close-epic…`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs

- [x] **External review** — two `/code-review medium` rounds on the working-tree diff; findings below

- [x] (frontend) N/A — no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → 0 (79/79, 0 skipped; zsh case ran)
- Same two new tests against the original block (`git stash` of the procedure) → 1 (both fail, as expected)
- `node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs` → 0
- `! grep -nE 'NF [~] ' codex/reconcile-skills.md` → 0
- `grep -c '"\.\./\.\./\$ft_dir' codex/reconcile-skills.md` → 2
- `bash tools/drift-checks.sh` → 0
- Extra: extracted block parses under `dash -n`, `bash -n`, `zsh -n` → 0
- External review round 1 (here-doc version) — **blockers**: `EOF` delimiter collision with an outer here-doc wrapper; column-0 terminators break on re-indent; here-doc temp-file failure skips loops with exit 0. Back to Phase 2 → `$(printf …)` form removes all three. **Notes** fixed: static check broadened to quoted roster vars; zsh case extended to conflict + missing-body exits; `zsh -f`; probe made async inside the test; prose no longer overclaims.
- External review round 2 — no blockers. **Notes**: tasknote described the abandoned here-doc fix (fixed here); Acceptance said "one name per line" (reworded); static regex let a quoted `"$(…)"` pass (tightened); assert message could print `undefined` (fixed); `-f` comment overclaimed (now notes /etc/zshenv). **Declined**: feed awk straight into the loops instead of `printf` — would run awk twice and lose the empty-roster pre-check; `while read` is the rejected here-doc route.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: none of the README §"AI-referenced docs" entries (MIGRATION, codex/AGENTS-snippet, PLATFORMS, SECURITY, …) makes a shell-behavior claim about the block; `git grep` for zsh/word-split hits only `docs/CODEX-VERIFICATION.md`'s environment line

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-31.` stub at top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

- [x] **Learnings** — N/A (no always-loaded-layer change; the zsh rule lives in the procedure's own prose and test)

**Final Summary:**

The Codex reconcile block now runs the same under sh, bash, dash and zsh. Its roster loops split from an unquoted command substitution rather than a bare variable, and its awk uses `match()`, which removes the guard-tripping `~ /` token. Changed: `codex/reconcile-skills.md`, `tools/update-adopters.test.mjs` (two new tests that fail on the old block). Suite 79/79, drift checks clean. `touches:` reconciliation: diff = declared paths + workflow files (PLAN.md, this note). No refactors. Literal `../../` targets kept by operator decision.

**Archived:** 2026-10-31
