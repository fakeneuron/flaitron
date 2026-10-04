---
title: fast-rescope-park-drift
status: completed
tags: [spec, gates, fast]
created: 2026-09-22
due:
related-tasks: [CORE-665, CORE-661]
touches:
  - SPEC/gates.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
---

# CORE-667 | fast-rescope-park-drift

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-665]] · [[CORE-661]]

## 🎯 Goal

Make the three surfaces that still say a `--fast` Re-scope proceeds into Phase 2 unconditionally carve out the blocked-prerequisite case, which parks `drift` and names the park in the ⚠️ notice per `SPEC/blocked.md` §"Under `--fast`, park and say so".

## ✅ Acceptance

- [x] `SPEC/gates.md` §"Flag interaction" carves out the blocked-prerequisite park under `--fast` and cites `blocked.md` — `grep -n 'blocked prerequisite' SPEC/gates.md` hits inside §"Flag interaction"
- [x] `SPEC/procedures/ft-task.md` exit-gate paragraph carries the same carve-out — `grep -n 'blocked prerequisite' SPEC/procedures/ft-task.md` hits in the Exit gate paragraph
- [x] `claude/skills/ft-task/SKILL.md` Step 4 Re-scope-under-fast bullet parks on a blocked prerequisite instead of taking the Skip marker — `grep -n 'blocked prerequisite' claude/skills/ft-task/SKILL.md` hits on the fast-mode bullet
- [x] All three agree with `blocked.md` and the `gate-postures.md` matrix row (park by default, named in the notice, operator overrules inline) — `judgment`: semantic agreement across prose, read side by side
- [x] Byte budgets hold — `wc -c SPEC/gates.md claude/skills/ft-task/SKILL.md SPEC/procedures/ft-task.md` under 25,000 / 33,000 / 38,000

## 🧩 Subtasks

- [x] Edit `SPEC/gates.md` §"Flag interaction" Re-scope sentence
- [x] Edit `SPEC/procedures/ft-task.md` Exit gate autonomous-mode parenthetical
- [x] Edit `claude/skills/ft-task/SKILL.md:157` fast-mode Re-scope bullet
- [x] Run acceptance greps + byte budget check

## 🔗 Related

- [[CORE-665]] — predecessor; added `SPEC/blocked.md` §"Under `--fast`, park and say so" and the matrix cell, left these three surfaces stale
- [[CORE-661]] — `/code-review` there surfaced findings #2/#3 that filed this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All three cited surfaces still carry the unconditional "proceeding / enters Phase 2" wording; the contract they contradict (`blocked.md:64-71`, `gate-postures.md:64`) is live.

- [x] Read relevant source files — `SPEC/blocked.md` §"Phase 1 entry" + §"Under `--fast`, park and say so"; `SPEC/gate-postures.md` matrix row 64 and §"Each delegation is bounded"; `SPEC/gates.md:186-197`; `SPEC/procedures/ft-task.md:330-350`; `claude/skills/ft-task/SKILL.md:140-159`

- [x] **Best Practices Review** — N/A: prose-contract edit; single responsibility preserved by citing `blocked.md` rather than restating its rationale on each surface.

- [x] **Archive skim** — `archive/core/` (874 notes, area confirmed via README table row `CORE-*` → `archive/core/`). Hits: CORE-665, CORE-661, CORE-664, CORE-536. CORE-665 believed "zero runner wiring changed" because both runners *defer* the Re-scope-to-blocked path to `blocked.md` (SKILL.md:140) — true for the flagless banner path, but the `--fast` bullet at :157 prescribes its own proceed motion, which the deferral does not override. CORE-661 Testing Notes #2/#3 are the source finding. CORE-536 originated the `--fast` Re-scope downgrade.

- [x] **Drift check** — `SPEC/gates.md:188` → the Flag interaction paragraph spans 186-197 (literal at :191); `SPEC/procedures/ft-task.md:343-345` exact; `SKILL.md:157` exact. Plan agrees with the PLAN line and with `blocked.md` / `gate-postures.md`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) scope is exactly the three named surfaces — `CAPABILITIES.md:30`, `PLATFORMS.md:425/454/492`, `GLOSSARY.md:105`, `step-0-flags.md:15` say only "downgrades to an inline ⚠️ notice", which stays true (the park is named *in* the notice), so they are not stale; (2) the park notice form mirrors the proceed form, swapping `proceeding` for the park, so the two variants read as one template.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Headroom: `gates.md` 20,093/25,000, `SKILL.md` 29,120/33,000, `procedures/ft-task.md` 36,074/38,000 — keep each edit to one clause.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose-contract edit, no test surface

**Implementation Notes:**

Pattern: each surface already carried the `--fast` proceed motion; extended it with one "except on a blocked prerequisite" clause citing `blocked.md` rather than restating the park-vs-delete rationale (DRY, the module owns it). Notice form mirrors the proceed variant — the park is named "in place of `proceeding`" — so no second literal template was minted. No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no frontend change. Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n 'blocked prerequisite' SPEC/gates.md` → 0 (§"Flag interaction")
- `grep -n 'blocked prerequisite' SPEC/procedures/ft-task.md` → 0 (Exit gate paragraph)
- `grep -n 'blocked prerequisite' claude/skills/ft-task/SKILL.md` → 0 (Step 4 fast-mode bullet)
- Agreement with `blocked.md:64-71` + `gate-postures.md:64` — judgment: all three say park `drift` by default, named in the notice, operator overrules inline; link targets `blocked.md` / `../blocked.md` resolve, anchor text matches verbatim (`grep -c` → 1)
- `wc -c` → gates.md 20,332/25,000 · SKILL.md 29,340/33,000 · procedures/ft-task.md 36,238/38,000 → all under
- `npm --prefix viz test` → 0 (29 files, 578 tests); lint/type-check N/A — markdown only
- Structural: no duplication (rationale cited, not restated), no dead prose.
- External review: `/code-review low` over the working-tree diff → `(none)`. No findings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Doc-drift sweep: no change to any README §"AI-referenced docs" entry — `PLATFORMS.md:425/454/492` and `CAPABILITIES.md:30` summarize `--fast` as "Re-scope downgrades to an inline ⚠️ notice", still true at that altitude.

Recap: 3 files, +8/−3 lines. Each stale "proceed into Phase 2" surface now carves out the blocked-prerequisite park, citing `blocked.md` §"Under `--fast`, park and say so". `touches:` reconciliation: `git diff --name-only` = the 3 declared paths exactly (plus workflow files PLAN.md + this note). Maintainability: a `--fast` runner reading any of the three runner-facing surfaces now reaches the same disposition as `blocked.md` and the posture matrix.

Learnings: N/A — CORE-665's "runners defer to `blocked.md`, so no wiring edit" held for the banner path only; a flag branch that prescribes its own motion is not covered by a deferral. Already recorded here; too narrow for the always-loaded layer.

**Archived:** 2026-09-22
