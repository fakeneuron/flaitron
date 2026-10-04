---
title: archived-stamp-fill-gate
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: [CORE-EPIC-610, CORE-610.3]
touches:
  - claude/skills/ft-task/SKILL.md
  - SPEC/procedures/ft-task.md
  - docs/CONVENTIONS.md
---

# CORE-610.4 | archived-stamp-fill-gate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-610]]

## 🎯 Goal

Make full-tasknote closure (`/ft-task`'s SKILL and its agent-neutral `SPEC/procedures/ft-task.md` mirror) instruct setting the body's `**Archived:** YYYY-MM-DD` line to today's date, and extend the pre-move gate with a third check that the stamp is filled, not the placeholder.

## ✅ Acceptance

- [x] `claude/skills/ft-task/SKILL.md`'s Phase 4 closure bullet instructs setting `**Archived:**` to today's date and its pre-move gate greps that the stamp is filled — `grep -q "line set to today's date" claude/skills/ft-task/SKILL.md && grep -qE "grep -qE '\^\\\\\*\\\\\*Archived:\\\\\*\\\\\* \[0-9\]" claude/skills/ft-task/SKILL.md`
- [x] `SPEC/procedures/ft-task.md`'s Step 5 Phase 4 paragraph states the same instruction and gate in agent-neutral prose — `grep -q "Also set the body's .Archived:. YYYY-MM-DD. line to" SPEC/procedures/ft-task.md && grep -q "unfilled \`YYYY-MM-DD\` placeholder" SPEC/procedures/ft-task.md`
- [x] Both edited files stay under their `docs/CONTEXT-BUDGET.md` caps (33,000 / 38,000 chars) — `wc -c claude/skills/ft-task/SKILL.md SPEC/procedures/ft-task.md`, each ≤ its cap
- [x] `docs/CONVENTIONS.md`'s "Archived-tasknote integrity floor" no longer misattributes stamp-fill ownership to CORE-610.3 (this task's own filed follow-up moved that ownership here) — `grep -q "pre-archive gate (\`CORE-610.4\`)" docs/CONVENTIONS.md`
- [x] The new pre-move check reuses the existing `grep -q`/idiom register already used by the CORE-610.3 gate rather than inventing a new check shape — `judgment`: inspect the diff by eye

## 🧩 Subtasks

- [ ] Read `claude/skills/ft-task/SKILL.md` Step 5 Phase 4 bullet, `SPEC/procedures/ft-task.md` Step 5 Phase 4 paragraph, `claude/skills/ft-micro-task/SKILL.md` Step 4 item 2 (the existing pattern to mirror), and `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor"
- [ ] Insert the "set `**Archived:**` to today's date" instruction into `claude/skills/ft-task/SKILL.md`'s Phase 4 bullet, next to the `status:` flip
- [ ] Extend that bullet's Executable pre-move gate with a third grep verifying the stamp is a real date, not `YYYY-MM-DD`
- [ ] Insert the same instruction + gate extension into `SPEC/procedures/ft-task.md`'s Step 5 Phase 4 paragraph, in agent-neutral prose
- [ ] Re-check byte counts against `docs/CONTEXT-BUDGET.md` caps
- [ ] Fix the stale CORE-610.3 attribution in `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" (doc-drift sweep)
- [ ] Run the Acceptance verify commands and record the receipt

## 🔗 Related

- [[CORE-EPIC-610]] — parent epic (archive-closure-integrity)
- [[CORE-610.3]] — predecessor: built the two-part pre-move gate this task extends with a third check; its own Discovery Notes found and filed this gap rather than folding it in silently

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line names exactly the two files CORE-610.3 also named (`/ft-task`, `SPEC/procedures/ft-task.md`) plus the two mechanics (instruction + third pre-move grep). Both files exist and carry the exact gate CORE-610.3 built, ready to extend. `docs/CONVENTIONS.md` attribution drift surfaced during the skim (see Drift check) is handled via the mandatory doc-drift sweep, not a scope expansion.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Sources read.** `claude/skills/ft-task/SKILL.md` Step 5's Phase 4 bullet (line 173, the exact bullet CORE-610.3 edited); `SPEC/procedures/ft-task.md` Step 5 "Phase 4: Closure (auto-run)" (lines 424-463, agent-neutral prose, the `**Verify before moving.**` paragraph CORE-610.3 added); `claude/skills/ft-micro-task/SKILL.md` Step 4 item 2 (`Flip YAML status: — in-progress → completed; set Archived: to today's date (YYYY-MM-DD)`) — the existing pattern this task mirrors onto the full-tasknote path; `templates/tasknote-template.md` (confirms the body's `**Archived:** YYYY-MM-DD` line at the very end, currently never instructed to be filled outside micro); `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" (line 78 attributes the stamp-fill gap to "the pre-archive gate (`CORE-610.3`)", which is now stale — CORE-610.3's own Discovery found the gap outside its filed scope and filed this task instead).
- **Byte-budget check.** `docs/CONTEXT-BUDGET.md` caps `claude/skills/*/SKILL.md` at 33,000 and `SPEC/procedures/ft-task.md` at 38,000. Current sizes: `ft-task/SKILL.md` 27,721 (5,279 headroom), `SPEC/procedures/ft-task.md` 35,263 (2,737 headroom — tighter, kept the addition to two short insertions, no new paragraph).
- **Archive skim.** `grep -l` across `.flowtron/tasknote/archive/core/*.md` for `claude/skills/ft-task/SKILL.md` and `SPEC/procedures/ft-task.md` returns `CORE-610.3.md` (read above, the direct predecessor and source of this task's filing) plus unrelated skill-wiring notes with no bearing on the stamp gate itself.
- **Drift check — one finding.** `docs/CONVENTIONS.md` line 78 names `CORE-610.3` as the owner of the stamp-fill gate, but CORE-610.3's own Discovery Notes and Final Summary explicitly excluded it from that task's scope and filed it as this task instead. This is drift within scope of the mandatory Phase 4 doc-drift sweep (`docs/CONVENTIONS.md` is on the `.flowtron/tasknote/README.md` §"AI-referenced docs" list) — fixed inline during this task's own closure rather than treated as a separate follow-up, since it is a direct consequence of this task's own fix landing.
- **Best practices.** No new script or file — two prose insertions (instruction + third grep) into the same two closure surfaces CORE-610.3 already touched, reusing its established idiom and register (Claude-skill imperative prose in `SKILL.md`; agent-neutral SOP prose in `SPEC/procedures/ft-task.md`) rather than inventing a new shape. `No clarifications needed` — assumptions: (1) only the two files named in the PLAN.md line are in scope for the instruction+gate edit, matching CORE-610.3's precedent of citing exactly the files it touches; (2) the `docs/CONVENTIONS.md` attribution fix is in-scope as doc-drift sweep, not scope creep, since it is drift this task's own fix directly causes; (3) `ft-micro-task/SKILL.md` needs no edit — it already sets the stamp, per the PLAN.md line's "unlike `/ft-micro-task`" framing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Reused `claude/skills/ft-micro-task/SKILL.md` Step 4 item 2's exact phrasing ("set `Archived:` to today's date") for the instruction half, and extended CORE-610.3's own two-part `grep`/`awk` gate idiom with a third `grep -qE` clause for the stamp check — same failure-string vocabulary and register a reader already knows from that gate, rather than inventing a new check shape.
- **No refactor.** Two additive insertions into the same two closure surfaces CORE-610.3 touched, plus a one-word attribution fix in `docs/CONVENTIONS.md`; nothing else in any of the three files was touched.
- **`claude/skills/ft-task/SKILL.md`** — added "the body's `**Archived:** YYYY-MM-DD` line set to today's date" to the Phase 4 bullet's closure-ops list, and a third `grep -qE '^\*\*Archived:\*\* [0-9]{4}-[0-9]{2}-[0-9]{2}$'` clause to the Executable pre-move gate.
- **`SPEC/procedures/ft-task.md`** — added one sentence ("Also set the body's `**Archived:** YYYY-MM-DD` line to today's date.") after the `status:` flip instruction, and extended the "**Verify before moving.**" paragraph with the same third stamp check, in agent-neutral prose.
- **`docs/CONVENTIONS.md`** — fixed the "Archived-tasknote integrity floor" section's stale attribution: the stamp-fill gate is owned by `CORE-610.4` (this task), not `CORE-610.3`, per CORE-610.3's own Discovery Notes and Final Summary. Fixed inline as part of the mandatory doc-drift sweep rather than filed as a separate follow-up, since it is a direct consequence of this task landing.
- **Tests.** No test harness for prose skill-file contracts in this repo (same as CORE-610.2 and CORE-610.3's finding) — verification is the grep receipts below.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [ ] (frontend) Asked the user for visual confirmation — N/A — no frontend change (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (all run from repo root, 2026-09-19):

- `grep -q "line set to today's date" claude/skills/ft-task/SKILL.md && grep -qE "grep -qE '\^\\\*\\\*Archived:\\\*\\\* \[0-9\]" claude/skills/ft-task/SKILL.md` → 0
- `grep -q "Also set the body's .Archived:. YYYY-MM-DD. line to" SPEC/procedures/ft-task.md && grep -q "unfilled \`YYYY-MM-DD\` placeholder" SPEC/procedures/ft-task.md` → 0
- `wc -c claude/skills/ft-task/SKILL.md SPEC/procedures/ft-task.md` → 28,015 / 35,513 — both under their `docs/CONTEXT-BUDGET.md` caps (33,000 / 38,000)
- `grep -q "pre-archive gate (\`CORE-610.4\`)" docs/CONVENTIONS.md` → 0
- No code/CI surface touched (markdown-only prose edits to three files) — lint/type-check N/A; structural check: no duplication introduced (each insertion restates the same instruction+gate pair in the register its own file already uses — Claude-skill imperative prose in `ft-task/SKILL.md`, agent-neutral prose in `SPEC/procedures/ft-task.md`); no dead code; no public-surface growth (no new command, flag, or file); no stale code-facing documentation remaining — the `docs/CONVENTIONS.md` attribution drift this task itself caused is fixed in the same commit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `docs/CONVENTIONS.md` — updated (the "Archived-tasknote integrity floor" section's misattribution of the stamp-fill gate to `CORE-610.3` corrected to `CORE-610.4`, this task, per CORE-610.3's own Discovery Notes and Final Summary). `docs/EXTERNAL-AGENTS.md` — checked (names where the `**Archived:**` label sits in the templates; makes no claim about who fills it, so no drift). All other fifteen entries — no change (none names the Phase 4 stamp-fill mechanics this task edits). `claude/skills/ft-task/SKILL.md` and `SPEC/procedures/ft-task.md` are excluded from the sweep set by README's own carve-out (`SPEC/*.md` lazy modules and `claude/skills/*/SKILL.md`).

Added the missing "set `**Archived:**` to today's date" instruction to both full-tasknote closure surfaces named in the PLAN.md line — `/ft-task`'s `SKILL.md` and its agent-neutral `SPEC/procedures/ft-task.md` mirror — mirroring the phrasing `/ft-micro-task` already used, and extended each surface's pre-move gate (built by CORE-610.3) with a third mechanical check that the stamp is filled rather than the template's unfilled `YYYY-MM-DD` placeholder. Fixed the resulting stale `docs/CONVENTIONS.md` attribution in the same commit.

- Changed: `claude/skills/ft-task/SKILL.md` (+1 clause in the Phase 4 bullet, +1 grep clause in the pre-move gate), `SPEC/procedures/ft-task.md` (+1 sentence, +1 grep clause in "Verify before moving"), `docs/CONVENTIONS.md` (1-word attribution fix: `CORE-610.3` → `CORE-610.4`).
- Verification: see Testing Notes — all four grep receipts exit 0; both edited closure-surface files stay under their `docs/CONTEXT-BUDGET.md` caps (28,015/33,000 and 35,513/38,000).
- Refactors: none. Deferred: nothing — no residual gap surfaced.
- `touches:` reconciliation: `git diff --name-only` = the three declared paths (`claude/skills/ft-task/SKILL.md`, `SPEC/procedures/ft-task.md`, `docs/CONVENTIONS.md`) + this tasknote + the PLAN.md flip; no undeclared paths.
- Maintainability effect: a full-tasknote closure now writes the same `**Archived:**` stamp a micro closure already writes, and the pre-move gate now catches an unfilled stamp at write time instead of leaving it to be discovered later by an `archived-tasknote integrity check` audit pass (CORE-610.2) or a future release-time sweep — closing the last of the three closure-fact gaps `CORE-EPIC-610` was filed to cover.

**Archived:** 2026-09-19
