---
title: followup-filing-commit-index-guard
status: completed
tags: [filing-commits, ft-file-followup, ft-audit, ft-refactor, git-discipline]
created: 2026-09-13
due:
related-tasks: [CORE-429, CORE-563, CORE-551, CORE-455]
touches:
  - SPEC/tasknote-selection.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-file-followup/starter-mode.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
---

# CORE-591 | followup-filing-commit-index-guard

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-429]] [[CORE-563]] [[CORE-551]]

## 🎯 Goal

Make the filing-commit pre-check refuse to auto-commit when the index already carries staged content, so a bare `git commit` in `/ft-file-followup` (and its sibling filing runners) can no longer sweep a closure's pre-staged deliverables under a `chore: file` subject — and correct the `--unattended` "two orderings converge" note that assumed the pre-staged case reads dirty.

## ✅ Acceptance

- [x] `SPEC/tasknote-selection.md` §"Filing commits" → "Pre-check, then skip on dirt" names the index check: staged content anywhere (`git diff --cached --quiet` failing) → `auto-commit = false` — `grep -q 'git diff --cached --quiet' SPEC/tasknote-selection.md`
- [x] Every filing runner's pre-check carries the index check — `test $(grep -l 'diff --cached --quiet' claude/skills/ft-file-followup/SKILL.md claude/skills/ft-file-followup/park-mode.md claude/skills/ft-audit/SKILL.md claude/skills/ft-refactor/SKILL.md | wc -l) -eq 4`
- [x] No filing runner scopes its post-stage `git diff --cached` read to a pathspec any more (the read must inspect exactly what the commit publishes) — `! grep -n 'git diff --cached -- ' claude/skills/ft-file-followup/SKILL.md claude/skills/ft-file-followup/park-mode.md claude/skills/ft-file-followup/starter-mode.md claude/skills/ft-audit/SKILL.md`
- [x] The `/ft-file-followup` `--unattended` paragraph no longer claims the pre-staged closure case "reads dirty" on PLAN.md; it converges on the index check instead — `! grep -q 'it reads dirty' claude/skills/ft-file-followup/SKILL.md`
- [x] `git commit --only` / `git commit <pathspec>` is **not** adopted anywhere (it would re-open the post-`git add` window CORE-563 closed); prose may *name* the rejected form, no code block may *run* it — `! grep -rn '^ *git commit --only\|^ *git commit .* -- ' SPEC/ claude/`
- [x] Skill bodies stay under the 33,000-char budget — `test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 33000 && test $(wc -c < claude/skills/ft-audit/SKILL.md) -le 33000`
- [x] Prose reads coherently across contract + four runners (same rule, same fallback, no contradiction with the CORE-563 "closes the window" argument) — `judgment`: contract prose, no command decides it

## 🧩 Subtasks

- [x] Contract: rewrite the "Pre-check, then skip on dirt" bullet in `SPEC/tasknote-selection.md` §"Filing commits" to a two-part check (PLAN.md working-tree clean **and** index empty), with the CBN-179 shape as the motivating case; drop the pathspec from the post-stage read and tighten the "why this closes the window" sentence accordingly
- [x] `/ft-file-followup` `SKILL.md` Step 4 item 1 (pre-check), item 4 (unscoped `git diff --cached`, verification prose), the `--unattended` convergence note, and the Step 5 skip-report wording
- [x] `park-mode.md` items 1 and 5 — same edits
- [x] `starter-mode.md` item 5 diff line + S5 skip-report wording
- [x] `/ft-audit` `SKILL.md` §5 steps 2 and 5 — same edits
- [x] `/ft-refactor` `SKILL.md` Step 5 pre-check opener — add the index check
- [x] Run the Acceptance verify commands; byte-budget check on both skill bodies

## 🔗 Related

- [[CORE-429]] — created the filing-commit guard and fixed the pre-check's placement (immediately before the first write); that placement rule must survive untouched
- [[CORE-563]] — added post-stage verification; its "commit publishes the index as it stands" argument is why `--only` is rejected here
- [[CORE-551]] — unattended filing authority; the `--unattended` convergence note being corrected was written there
- [[CORE-455]] — `/ft-audit` as a filing runner; Codex wrapper is pointer-only (no edit)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Observed live (caobunga CBN-179, 2026-09-13): ten `git rm`s a closure had staged landed in `chore: file CBN-183 follow-up`. The pre-check reads only PLAN.md's working-tree status, so a non-PLAN staged index passes it, and the bare `git commit -m` publishes the whole index. The post-stage read is scoped to the filing's pathspecs, so the foreign staged deletions were invisible to it too. The defect is class-wide across every runner that restates the rule.

- [x] Read relevant source files — `SPEC/tasknote-selection.md` §"Filing commits" (lines 143-215), `/ft-file-followup` Step 4-5 (SKILL.md 179-262), `park-mode.md` 88-135, `starter-mode.md` 70-125, `/ft-audit` §5 steps 2 and 5, `/ft-refactor` Step 5 opener + commit paragraph

- [x] **Best Practices Review** — single responsibility: the pre-check decides `auto-commit`; the post-stage read verifies the index. Both stay in place; the fix widens what each observes rather than adding a third mechanism. No refactor needed.

- [x] **Archive skim** — `ls archive/core/` non-empty (783 notes; area from the README table). `grep -l 'post-stage\|auto-commit'` → 18 hits; load-bearing read directly: [[CORE-429]], [[CORE-563]], [[CORE-551]], [[CORE-455]] (see Related). No ⚠️ pointers on any.

- [x] **Drift check** — see Discovery Notes; the PLAN line's description of the pre-check and the `--unattended` note both match current text. One nuance corrected below.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Which of the two fixes.** The PLAN line offers (a) widen the pre-check to an index-empty check or (b) `git commit --only <paths>`. (b) is rejected: `git commit <pathspec>` commits the *working-tree* content of those paths, bypassing the index, which re-opens exactly the post-`git add` window [[CORE-563]] closed ("`git commit -m` with no pathspec publishes the index as it stands, so a write landing after `git add` cannot reach the commit"). (a) keeps that argument intact: the pre-check gains `git diff --cached --quiet` (index must be empty) alongside the existing PLAN.md working-tree read; either signal → `auto-commit = false`, same skip-on-dirt branch as today.

**Post-stage read goes unscoped.** Today every runner reads `git diff --cached -- <the filing's pathspecs>`. That scoping is why CBN-179's staged deletions were invisible to the verification. With the index-empty pre-check the residual exposure is a concurrent `git add` in agent-only time — the same class as the foreign-write window. Dropping the pathspec makes the contract's sentence "the staged diff is the very content the commit will publish" literally true, at no cost: a clean pre-check means the unscoped diff is normally the filing's own hunks and nothing else. This is the only edit beyond the PLAN line's two named options, and it is the same guard (the index) applied at the second checkpoint.

**The `--unattended` note, precisely.** It says a closure that "has already staged its PLAN.md flip" reads dirty and rides along. That sentence is true as far as it goes — `git status --porcelain -- PLAN.md` does report a staged PLAN.md — but a closure stages deliverables *before* its PLAN flip (CBN-179's `git rm`s), and that case read clean. The rewrite converges both orderings on the index check: any pre-staged content → `auto-commit = false` → the row rides into the closure's atomic commit; clean tree → standalone filing commit, closure follows.

**Scope of runners.** Five surfaces restate the rule: contract (`SPEC/tasknote-selection.md`), `/ft-file-followup` default + `park-mode.md` + `starter-mode.md` (S4 item 1 defers to the host, item 5 has its own scoped diff line), `/ft-audit` §5, `/ft-refactor` Step 5 (pre-check only; its commit paragraph names no diff read). `codex/`, `cursor/`, `grok/` are pointer-only — no edit. `docs/GLOSSARY.md` and `templates/loop-heartbeat-template.md` hit "pre-check" for the unrelated heartbeat cycle pre-check. The `claude/skills/*/SKILL.md` budget is 33,000; `ft-file-followup` 26,408 and `ft-audit` 26,972 have ample headroom. `SPEC/tasknote-selection.md` carries no budget row.

**Skip-report wording.** `left uncommitted (PLAN.md already carried other edits)` becomes `left uncommitted (PLAN.md or the index already carried other changes)` at each site that spells it out (SKILL.md Step 5, `starter-mode.md` S5, `/ft-audit` step 5).

No clarifications needed. Assumptions: (1) option (a) is the fix, for the reason above; (2) the unscoped post-stage read is in scope as part of the same index guard; (3) `/ft-refactor` counts as a filing runner for the pre-check even though its commit item never spelled out a diff read — the pre-check widening applies, nothing else is added there.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose contract; the Acceptance verify greps are the tests

**Implementation Notes:**

**Pattern survey.** Extended the existing two-checkpoint shape (pre-check decides `auto-commit`; post-stage read verifies) at every site that restates it — contract + five runner surfaces. No new mechanism, no new outcome class: both new signals land in the existing `auto-commit = false` skip-on-dirt branch. Minimal-refactor gate: nothing refactored; one stale cross-reference in `/ft-audit` §5 step 2 ("whether step 6 below runs" → step 5, the actual commit item) corrected inside the sentence being rewritten.

**What changed, per surface.**
- `SPEC/tasknote-selection.md` §"Filing commits" — "Pre-check, then skip on dirt" is now two readings (PLAN.md working tree clean **and** `git diff --cached --quiet` exits 0), with the CBN-179 shape as the motivating case; "Post-stage verification" reads `git diff --cached` with **no pathspec** and states why; the "why this closes the window" paragraph now also rejects `git commit --only` / `git commit <path>` by name (working-tree commit bypasses the verified index).
- `/ft-file-followup` `SKILL.md` — Step 4 item 1 adds the index reading + rationale; item 4 drops the pathspec from the diff read, notes why, and names `--only` as the wrong fix; the `--unattended` convergence note now says "staged anything — PLAN flip or deliverables ahead of it — the index reading fails"; Step 5 skip-report wording widened.
- `park-mode.md` items 1 and 5; `starter-mode.md` item 5 + S5 wording; `/ft-audit` §5 steps 2 and 5 + skip wording; `/ft-refactor` Step 5 pre-check opener — same edits, each in its own register.

**Not adopted:** `git commit --only <paths>` — see Discovery. Codex / Cursor / Grok wiring is pointer-only; no edit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the seven Acceptance verify commands (receipt below)

- [x] Ran lint/type-check on changed code — `git diff --check` → 0; CI byte-budget rule mirrored locally → 0

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) `N/A` — no frontend surface. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (all run from repo root, 2026-09-13):

- `grep -q 'git diff --cached --quiet' SPEC/tasknote-selection.md` → 0
- `test $(grep -l 'diff --cached --quiet' <4 runner files> | wc -l) -eq 4` → 0
- `! grep -n 'git diff --cached -- ' <4 diff-read files>` → 0
- `! grep -q 'it reads dirty' claude/skills/ft-file-followup/SKILL.md` → 0
- `! grep -rn '^ *git commit --only\|^ *git commit .* -- ' SPEC/ claude/` → 0 (first draft of this criterion grepped prose too and tripped on the contract *naming* the rejected form; tightened to command-line-only before ticking)
- `test $(wc -c < ft-file-followup/SKILL.md) -le 33000 && test $(wc -c < ft-audit/SKILL.md) -le 33000` → 0 (27,138 / 27,206 against 33,000)
- `git diff --check` → 0
- [[CORE-563]]'s own receipt still holds: `grep -lc 'diff --cached'` across its four runner files → 4

Structural quality: no duplication beyond the deliberate per-runner restatement the contract already carries; no dead text; no new public surface; the one stale cross-reference found in the touched sentence was corrected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filing commits can no longer sweep a closure's pre-staged deliverables under a `chore: file` subject. The pre-check now also requires an empty index (`git diff --cached --quiet`), the post-stage read is unscoped so it inspects exactly what the commit publishes, and the `--unattended` convergence note is corrected to the case that actually bit (deliverables staged ahead of the PLAN flip). `git commit --only` was rejected as the fix because it commits the working tree and re-opens the post-`git add` window CORE-563 closed. 6 files, +58/−41. `touches:` reconciliation: `git diff --name-only` matches the six declared paths exactly; no undeclared path. Doc-drift sweep: no change on all 12 AI-referenced docs. Maintainability effect: one rule, one fallback, restated in the same shape at every runner; the CBN-179 mis-attributed commit class is closed for every filing motion at once.

**Archived:** 2026-09-13
