---
title: epic-parent-auto-flip
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-768, CORE-768.1, CORE-768.2, CORE-768.3, CORE-089, CORE-473.5]
touches:
  - SPEC/plan-filing.md
  - SPEC/post-closure.md
  - SPEC/epic.md
  - SPEC.md
  - SPEC/gates.md
  - SPEC/gate-postures.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-close-epic/unattended-close-epic.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/commands/ft-close-epic.md
  - claude/commands/ft-epic-discovery.md
  - claude/CAPABILITIES.md
  - codex/skills/ft-close-epic/SKILL.md
  - docs/EXTERNAL-AGENTS.md
  - docs/GLOSSARY.md
blocked-by:
  - CORE-768.3
---

# CORE-768.4 | epic-parent-auto-flip

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-768]]

## 🎯 Goal

When any closure leaves every child of an epic `[x]`, flip the parent to stub form and move the cohort to the top of `## Completed` automatically (ahead of the rotation check), retiring `/ft-close-epic`'s Yes/No prompt and its `--unattended` deferral.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` carries a §"Epic parent flip" procedure (own-parent check, stub flip, cohort move to top of `## Completed`, `(none)` restore, no worktree skip), and §"Placement rule" points at it instead of `/ft-close-epic` approval — `grep -q '^## Epic parent flip' SPEC/plan-filing.md && ! grep -q 'parent-flip approval' SPEC/plan-filing.md`
- [x] `SPEC/post-closure.md` runs the flip before step 1 stages anything (lands in the closure commit, ahead of step 2's rotation count) and adds a `· flipped <EPIC>` 🏁 suffix — `grep -q 'Epic parent flip' SPEC/post-closure.md && grep -q 'flipped' SPEC/post-closure.md`
- [x] `/ft-close-epic` Yes/No prompt, its bundled-prompt override, and its `--unattended` deferral are retired from the skill, its fragment, the shared unattended fragment, the command doc, and the Codex wrapper — `! git grep -nE 'parent-flip (prompt|Yes/No|deferr|override)|Parent-flip deferr|parent-flip:|deferred rather than|is \*\*deferred\*\*|unbundles' -- claude codex SPEC docs/EXTERNAL-AGENTS.md docs/GLOSSARY.md`
- [x] gate-postures.md (rung 1, matrix row, §"`/ft-close-epic` under the posture"), gates.md (trigger table + override example + extensions line), epic.md placement invariant, SPEC.md collateral-flip rule, SOP + micro-task placement lines no longer name a parent-flip approval/prompt — `! git grep -nE 'parent-flip approval|until .?/ft-close-epic.? moves|epic parent-flip, release' -- SPEC claude`
- [x] Audit misses are filed as open child rows in the audit's own closure commit, so the flip waits for them (operator decision at review; SPEC/epic.md step 5 + `/ft-close-epic` Steps 5/9/Notes) — `grep -q 'by the audit itself' SPEC/epic.md && ! git grep -nE 'filed AFTER audit closure|ft-file-followup <NEW-ID>' -- claude/skills/ft-close-epic`
- [x] Byte budgets and drift checks hold — `bash tools/drift-checks.sh`
- [x] Doc-drift sweep across README §"AI-referenced docs" — `judgment` (per-entry verdicts)

## 🧩 Subtasks

- [x] Write §"Epic parent flip" in `SPEC/plan-filing.md`; repoint §"Placement rule"
- [x] Add the pre-step-1 hook + 🏁 suffix to `SPEC/post-closure.md`; swap its bundled-prompt example to `/ft-release` push-go
- [x] `SPEC/epic.md` lifecycle step 4 + §"Child placement invariant"; `SPEC.md` collateral-flip rule
- [x] `SPEC/gates.md` (:24, :38, :180) and `SPEC/gate-postures.md` (rung 1, matrix, §"`/ft-close-epic` under the posture")
- [x] `/ft-close-epic`: SKILL.md (desc, intro, Acceptance/Subtasks scaffold, Steps 7–9, Notes), `unattended-close-epic.md`, `claude/commands/ft-close-epic.md`, `codex/skills/ft-close-epic/SKILL.md`
- [x] Mirrors: `claude/skills/ft-task/unattended-mode.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-release/SKILL.md` (:340, :362), `claude/skills/ft-epic-discovery/SKILL.md`, `claude/commands/ft-epic-discovery.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md` item 7, `docs/GLOSSARY.md` (epic, parent epic)
- [x] Phase 3: Acceptance greps, `bash tools/drift-checks.sh`, `/code-review medium` on the diff

## 🔗 Related

- [[CORE-EPIC-768]] — parent epic
- [[CORE-768.2]] — predecessor: rotation procedure + post-closure hook this flip runs ahead of
- [[CORE-768.3]] — predecessor (Fan-out sequential)
- [[CORE-089]] — made the parent-flip the bundled in-📦 prompt this task retires
- [[CORE-473.5]] — the `--unattended` parent-flip deferral this task retires

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-768.2]] and [[CORE-768.3]] landed the rotation procedure and its post-closure hook. This is the last implementation child. The operator decided the flip at .1: any closing runner, before the rotation check.

- [x] Read relevant source files — `SPEC/post-closure.md` (full), `SPEC/plan-filing.md` §"`## Completed` archive convention" → §"Empty-section placeholder", `SPEC/epic.md` (full), `SPEC/gate-postures.md` rung 1 + matrix + §"`/ft-close-epic` under the posture", `SPEC/gates.md` §"Conditional skip rule", `claude/skills/ft-close-epic/SKILL.md` (full) + `unattended-close-epic.md` (full), `claude/skills/ft-task/unattended-mode.md` §"`/ft-close-epic`", `SPEC.md` §"🚀 Phase 4: Closure" + §"Paper-complete guard". Citer list from `git grep -iE "parent[- ]flip|bundled (in-📦 )?prompt|cohort move"`.

- [x] **Best Practices Review** — contract/doc work. The one boundary question is where the procedure lives. It goes in `plan-filing.md`, which owns `## Completed` placement and the rotation procedure, and `post-closure.md` hooks it the same way it hooks rotation. Writing it once avoids a restatement in each of the four runner closure steps.

- [x] **Archive skim** — area `archive/core/` (README table row `CORE-*`). 109 notes mention parent-flip; the load-bearing ones were read and summarized at [[CORE-768.1]] (its Archive skim): [[CORE-089]] made the flip the only bundled in-📦 prompt (its override is generic, so it stays valid with `/ft-release` push-go as the live instance), and [[CORE-473.5]] deferred the flip under `--unattended` only because an autonomous commit "cannot resolve a user-input question", a premise this task removes. `tools/drift-checks.sh`, `tools/update-adopters.mjs`, and `viz/src` carry no parent-flip logic.

- [x] **Drift check** — every cited line resolves at `2271d573`. The PLAN row matches the scope. `docs/CODEX-VERIFICATION.md` :389/:399 and `docs/VERSION-HISTORY.md` are historical records and stay unedited. Two sites the PLAN row doesn't name also cite the flip: `docs/GLOSSARY.md` (epic, parent epic) and `docs/EXTERNAL-AGENTS.md` item 7. Both are in scope as mirrors; that isn't drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — two asked; answers below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Resolved scoping** (operator, 2026-10-09):

| Question | Answer |
|---|---|
| Commit placement | In the closure commit. The hook sits in `SPEC/post-closure.md` ahead of step 1's staging, so the flip appears in the 📦 diff on a fire branch, and step 2's rotation count includes it. 🏁 gets a `· flipped <EPIC>` suffix. |
| Scope | Only the closing task's own parent, with no linked-worktree skip. Epics stranded by an earlier declined flip are not swept up; they are flipped by hand. |

**Explicit assumptions.** The bundled-prompt override (gates.md, gate-postures rung 1, blocked.md `input-needed`, the unattended-mode conversion row) stays as written. `/ft-release` push-go is still a live instance, so only the parent-flip *examples* change. `/ft-close-epic` keeps Step 8 as an open-children heads-up for the early-audit case. Its fragment's Step 9 keeps the "destructive action never reaches Step 9" paragraph, since that clause doesn't depend on the flip. `SPEC.md`:477 and the template's Closed line ("epic child → stays nested") stay accurate as written: the child stays nested, and the whole cohort moves afterward.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — follows the [[CORE-768.2]] rotation shape: the procedure is a numbered list in `SPEC/plan-filing.md`, and `SPEC/post-closure.md` carries a one-paragraph hook plus a 🏁 suffix (`· flipped <EPIC>` alongside `· rotated <N> rows`).

- [x] **Minimal refactor gate** — no refactor. `/ft-close-epic` Step 8 shrank to an open-children check because its Yes/No branch had nothing left to do.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract only. `tools/drift-checks.sh` is the structural check.

**Implementation Notes:**

- `SPEC/plan-filing.md`: new `## Epic parent flip` (check own parent → flip → move, worktree note); §"Placement rule" repointed.
- `SPEC/post-closure.md`: "Epic parent flip first." paragraph ahead of "Push is a separate gated step"; step 1's extension example → `/ft-release` push-go.
- `SPEC/epic.md`: lifecycle step 4 + §"Child placement invariant". `SPEC.md` §"Paper-complete guard" collateral-flip carve-out now names the auto-flip.
- `SPEC/gates.md`: three parent-flip examples → push-go. `SPEC/gate-postures.md`: rung-1 parenthetical and matrix-row parenthetical dropped; §"`/ft-close-epic` under the posture" rewritten (heading kept for citers), −1,190 bytes.
- `/ft-close-epic`: description, intro, scaffold Acceptance/Subtasks flip lines dropped, Steps 7–9 + next-move branches + Notes rewritten (27,757 → 24,882 bytes). Fragment: Steps 7–8 removed, Step 9 keeps the destructive-fix paragraph.
- Mirrors: shared `unattended-mode.md`, SOP step 5, micro-task step 3, ft-release push-go lines (:340, :362 quote of gates.md), ft-epic-discovery + its command doc, ft-close-epic command doc, Codex wrapper description, CAPABILITIES `--unattended` row, EXTERNAL-AGENTS item 7, GLOSSARY (epic, parent epic).
- Downstream impact: none on open PLAN rows. CORE-768.N will audit the cohort; CORE-641 is unrelated.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed; `bash tools/drift-checks.sh` covers the markdown surface

- [x] Ran lint/type-check on changed code — `N/A`: markdown only

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (first run, before review):
- A1 `grep -q '^## Epic parent flip' SPEC/plan-filing.md && ! grep -q 'parent-flip approval' SPEC/plan-filing.md` → 0
- A2 `grep -q 'Epic parent flip' SPEC/post-closure.md && grep -q 'flipped' SPEC/post-closure.md` → 0
- A3 `! git grep -nE 'parent-flip (prompt|Yes/No|deferr|override)|…|unbundles' -- claude codex SPEC docs/EXTERNAL-AGENTS.md docs/GLOSSARY.md` → 0
- A4 `! git grep -nE 'parent-flip approval|until .?/ft-close-epic.? moves|epic parent-flip, release' -- SPEC claude` → 0
- A5 `bash tools/drift-checks.sh` → 0 (context_budget ok; post-closure 9,213 / 10,000, gate-postures 20,292 / 22,000, plan-filing 22,252, ft-close-epic 24,882 / 33,000)
- Structural: no duplicated procedure (written once in plan-filing, hooked once in post-closure); the retired fragment Steps 7–8 left no citers (`git grep 'Step 8 — Parent-flip'` empty).

External review — `/code-review medium` on the working-tree diff, 9 findings:
- **blocker** · `SPEC/epic.md` step 5: the audit's auto-flip closes the epic before misses can be filed as children, which orphans step 5. Back to Phase 2: operator chose to have the audit file miss rows as open children in its own closure commit (epic.md step 5, `/ft-close-epic` Acceptance/Subtasks/Step 5/Step 8/next-move/Notes, command doc). New Acceptance criterion A6.
- **blocker** · `/ft-close-epic` Step 9 said "Under `--unattended` nothing here differs", but the fragment says 📦 is force-skipped. Fixed: both now say force-skipped.
- note · post-closure: if the operator withholds commit-go on the fire branch, the flip stays in the tree. No change: the stub flip and archive move stay there too; the flip is part of the closure diff.
- note · plan-filing: parallel worktree siblings each see the other open, so neither flips. Fixed: the stranded-epic sentence names this case.
- note · SOP / micro-task "only this task's line". No change: the sentence edited here names the post-closure flip, and `SPEC.md` §"Paper-complete guard" carries the carve-out.
- note · uppercase `[X]` is a parser-legal checked row. Fixed: "`- [x]`, either case".
- note · step 1's closure-review list didn't name the flip, and suffix order was unstated. Fixed: the list names it, and `· flipped` goes ahead of any rotation suffix.
- note · `/ft-close-epic` Step 8 repeated the eligibility rule. Fixed: it now points to plan-filing, and the Final Summary write is dropped.
- note · no audit Acceptance box observes the flip. No change: the flip runs after the archive move, so no box can see it. The 🏁 suffix is the record, as with rotation.

Re-verification after the fixes: A1–A4 and A6 → 0, `bash tools/drift-checks.sh` → 0 (post-closure 9,304 / 10,000; ft-close-epic 25,001 / 33,000).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md`: updated (§"Paper-complete guard" carve-out). `claude/CAPABILITIES.md`: updated (`--unattended` row). `docs/EXTERNAL-AGENTS.md`: updated (item 7). `docs/WORKTREES.md`: no change ("post-closure protocol unchanged" inside a worktree still holds; plan-filing states the flip runs there). `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, all four AGENTS snippets, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (generic bundled-prompt wording still true), `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/VISION.md`: no change.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`

**Final Summary:**

An epic now closes itself. The closure that leaves its last child `[x]`, from any runner and in any posture, flips the parent to stub form and moves the cohort to the top of `## Completed` in its own closure commit, before the rotation count. `/ft-close-epic`'s Yes/No prompt and its `--unattended` deferral are retired. Audit misses are now filed as open child rows in the audit's closure commit, so the flip waits for them.

- Changed: `SPEC/plan-filing.md` (new §"Epic parent flip"), `SPEC/post-closure.md` (pre-step-1 hook, closure-review line, 🏁 suffix), `SPEC/epic.md` (step 4, step 5, placement invariant), `SPEC.md`, `SPEC/gates.md`, `SPEC/gate-postures.md` (−1,190 bytes), `/ft-close-epic` SKILL + fragment (−2,756 bytes), plus 12 mirror files.
- Verification: A1–A6 → 0, drift checks → 0. Both review blockers fixed and re-verified; 5 notes fixed, 3 dismissed with reasons.
- No refactor. Doc verdict: SPEC.md, CAPABILITIES, EXTERNAL-AGENTS updated; others no change.
- `touches:` reconciliation: diff = the 19 declared paths, plus `.flaitron/PLAN.md` and this note.
- Maintainability: one procedure in plan-filing, hooked once. The only remaining bundled in-📦 prompt is `/ft-release` push-go.

**Archived:** 2026-10-09
