---
title: docs-audit-single-source
status: completed
tags: [docs, audit, release]
created: 2026-10-08
due:
related-tasks: [CORE-721, CORE-722, CORE-723]
touches:
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - CONTRIBUTING.md
  - .flaitron/audit-overlay/SKILL.md
  - claude/skills/ft-audit/SKILL.md
  - docs/PLATFORMS.md
  - .flaitron/PLAN.md
---

# CORE-745 | docs-audit-single-source

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-721]] · [[CORE-722]] · [[CORE-723]]

## 🎯 Goal

Make the tracked `audit` overlay (`.flaitron/audit-overlay/SKILL.md`) the single statement of flaitron-self's docs-audit config: `/ft-release` §7.1 runs it instead of re-supplying a run-once rubric to the bundled scaffold, and `CONTRIBUTING.md` describes auditing this tree as `/audit <domain>`.

## ✅ Acceptance

- [x] §7.1 Reads and follows the tracked overlay body with args `docs ai-referenced`, which does not depend on per-machine wiring. It neither restates the rubric/gates nor carries a copy of the wiring pin, and the standing pin is anchored and non-vacuous — `grep -q 'Read `.flaitron/audit-overlay/SKILL.md` from the tracked tree' claude/skills/ft-release/SKILL.md && ! grep -q 'pair_q final_newline context_budget' claude/skills/ft-release/SKILL.md && ! grep -qF 'cd -P' claude/skills/ft-release/SKILL.md && grep -qF 'o=$(cd -P "$r/.flaitron/audit-overlay" && pwd)' claude/skills/ft-release/step-7.1-standing-checks.md`
- [x] No doc still names `/ft-audit docs` as the release-cut subroutine (the adopter-shipped scaffold's example is now generic) — `! git grep -n '[/]ft-audit docs' -- claude/skills/ft-release docs/PLATFORMS.md claude/skills/ft-audit/SKILL.md`
- [x] CONTRIBUTING's audit paragraph is rewritten around `/audit <domain>` with no pre-overlay run-once / "if you audit often, keep an overlay" advice — `grep -q '/audit <domain>' CONTRIBUTING.md && ! grep -qi 'run once' CONTRIBUTING.md`
- [x] Doc drift checks pass (Pair Q citations, final newline, context budget) — `bash tools/drift-checks.sh`
- [x] §7.1's wiring check covers `.claude/skills/audit` — `grep -q 'MISWIRED  .claude/skills/audit' claude/skills/ft-release/step-7.1-standing-checks.md` (already shipped by [[CORE-723]]; Re-scope, no edit)

## 🧩 Subtasks

- [x] Rewrite `/ft-release` §7.1 heading + invocation + run-once paragraph to route through the overlay
- [x] Update the other `/ft-audit docs` subroutine mentions (ft-release SKILL.md Step 2.5 budget note, standing-checks header, PLATFORMS calibration note); make the adopter-shipped `ft-audit` scaffold's Subroutine-safe example generic
- [x] Rewrite CONTRIBUTING.md's audit paragraph around `/audit <domain>`
- [x] Re-scope the PLAN line (drop the already-shipped wiring-check clause)
- [x] Run drift checks

## 🔗 Related

- [[CORE-721]] — moved the overlay body to tracked `.flaitron/audit-overlay/`
- [[CORE-722]] — filled the overlay's remaining deltas (docs gates/rubric included)
- [[CORE-723]] — already added the `.claude/skills/audit` resolved-path pin to §7.1's wiring check

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The two duplication clauses are real: §7.1 still calls `Skill(ft-audit)` and supplies a run-once rubric + gates that the overlay's `docs:` deltas already declare, and CONTRIBUTING.md:63 still gives pre-overlay advice ("run once is the normal answer… if you audit this tree often, keep a thin overlay fork") while the overlay is now tracked and wired. The third clause — extend §7.1's wiring check to `.claude/skills/audit` — already shipped in [[CORE-723]] (2026-10-07, `step-7.1-standing-checks.md:76`, the fifth `MISWIRED` command), a day before the audit filed this row. Dropped from scope.

- [x] Read relevant source files — `.flaitron/audit-overlay/SKILL.md`, `claude/skills/ft-release/SKILL.md` §7.1, `step-7.1-standing-checks.md`, `CONTRIBUTING.md` §"Developing flaitron skills & commands", `claude/skills/ft-audit/SKILL.md` hard rules.

- [x] **Best Practices Review** — N/A: markdown-only; the change is removing a duplicated config statement in favor of its tracked owner.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Load-bearing hits: [[CORE-721]] (overlay tracked, symlink wiring), [[CORE-722]] (overlay `docs:` gates = `bash tools/drift-checks.sh pair_q final_newline context_budget`, same as §7.1's), [[CORE-723]] (wiring pin), [[CORE-645]] (the gates claim §7.1 carries today).

- [x] **Drift check** — PLAN line matches the code except the wiring-check clause (above). The overlay supports `/audit docs ai-referenced` (`.flaitron/audit-overlay/SKILL.md:32`), and its docs rubric already names `.flaitron/tasknote/README.md` §"AI-referenced docs", so routing §7.1 through it changes no behavior beyond removing the scaffold-bootstrap stop. The overlay inherits the scaffold's hard rules verbatim, Subroutine-safe included.

- [x] No clarifications needed (--fast). Assumptions: §7.1 keeps the `ai-referenced` scope token (its declared doc set), not the overlay's wider default docs glob; the overlay's docs-gate line ("the same gate `/ft-release` §7.1 runs") was planned to stay, but review run 1 showed it now points back at itself, so the clause was dropped; peripheral `/ft-audit docs` subroutine mentions are updated so they don't contradict the new §7.1.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Discovery landed Re-scope → ⚠️ notice (--fast).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing overlay pattern: `.flaitron/audit-overlay/SKILL.md` already declares `docs:` scope, rubric, gates, and the `ai-referenced` token; §7.1 and CONTRIBUTING now point at it rather than restating it.

- [x] **Minimal refactor gate** — no refactor; text replaced in place. The overlay was touched only for review findings 4/5 (run 1) and 7 (run 2): a self-referential clause dropped and one citation retargeted.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only; the existing `drift` checks (Pair Q citations, context budget) cover it.

**Implementation Notes:**

Final state (four review rounds reshaped the §7.1 mechanism; the per-round log is in Testing Notes):

- `claude/skills/ft-release/SKILL.md` §7.1 Reads `.flaitron/audit-overlay/SKILL.md` from the tracked tree and follows it with args `docs ai-referenced`. It does not call `Skill(audit)`: `.claude/skills/audit` is gitignored, absent under Codex or in a fresh clone, and a mid-session repair does not join the session's skill roster. The run-once rubric/gates paragraph is replaced by a note that the overlay is the single config statement. §7.1 says the read counts as a Subroutine-safe invocation, and that a bootstrap stop takes run once with the overlay's `docs:` values plus a Medium finding. The heading and the two Step 2.5 mentions now read "audit-overlay `docs` subroutine".
- `step-7.1-standing-checks.md`: header renamed to the audit-overlay `docs` subroutine; the local-wiring block opens with `cd "$(git rev-parse --show-toplevel)"`. The `MISWIRED` pin is anchored at `git rev-parse --show-toplevel` and requires the overlay to resolve (`o=$(…) &&`), so it can no longer pass as `[ "" = "" ]`. The repair says "from the repo root". It remains the only copy of the pin.
- `.flaitron/audit-overlay/SKILL.md`: the self-referential "same gate `/ft-release` §7.1 runs" clause was dropped, and the `ai-referenced` citation was retargeted from CONTRIBUTING to `passes/docs.md` §"Scope & rubric hints (→ dispatcher §1)".
- `CONTRIBUTING.md`: the run-once / "keep an overlay if you audit often" advice is replaced with `/audit <domain> [scope]` usage, a covered-domains-skip-the-bootstrap note (`backend` excepted), a single-source note, and the no-`audit`-wiring route (Read the overlay, as §7.1 does).
- `claude/skills/ft-audit/SKILL.md` (adopter-shipped): the Subroutine-safe example parenthetical, which named flaitron-self's §7.1, was dropped ("Any domain may be invoked from another skill.").
- `docs/PLATFORMS.md`: calibration note renamed to the audit-overlay `docs` subroutine.
- The path-access hook reads a literal `/ft-audit` in a Bash command as a path, so edits went through Edit and the A2 grep uses `[/]ft-audit`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (markdown-only diff; no viz/tools code touched)

- [x] Ran lint/type-check on changed code — N/A: no code changed; drift checks are the markdown gate

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — five `/code-review medium` rounds, recorded below. Runs 1–4 had blockers (each sent the task back to Phase 2); run 5 had notes only, all fixed. One note dismissed with a reason (run 3 #3).

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final, after review run 4). Earlier receipts for runs 2 and 3 checked A1 forms since replaced, and are superseded by this one:

- A1 (as written in Acceptance) → 0
- A2 `! git grep -n '[/]ft-audit docs' -- claude/skills/ft-release docs/PLATFORMS.md claude/skills/ft-audit/SKILL.md` → 0
- A3 `grep -q '/audit <domain>' CONTRIBUTING.md && ! grep -qi 'run once' CONTRIBUTING.md` → 0
- A4 `bash tools/drift-checks.sh` → 0
- A5 `grep -q 'MISWIRED  .claude/skills/audit' claude/skills/ft-release/step-7.1-standing-checks.md` → 0
- Pin behavior: from the repo root → silent; from `viz/` → silent; with the overlay path missing → MISWIRED (all three observed)
- Structural: rubric/gates stated only in the overlay; one copy of the pin; no dead text.

External review, run 1 (`/code-review medium`, working-tree diff), 6 findings:

1. **Blocker** — `Skill(audit)` unreachable under Codex (no `audit` wiring in `.agents/skills`). → Fixed: §7.1 falls back to `Skill(ft-audit)`. *(Superseded by run 2 finding 6: the fallback now Reads the overlay directly.)*
2. **Blocker** — no fallback when `.claude/skills/audit` is missing or miswired; the MISWIRED pin ran only after the audit. → Fixed: pre-invoke pin + `Skill(ft-audit)` run-once fallback. *(Superseded by run 4: §7.1 Reads the overlay directly and needs no pin.)*
3. **Note** — CONTRIBUTING said every domain clears the bootstrap; the overlay leaves `backend` uncovered. → Fixed: `backend` exception added.
4. **Note** — overlay docs-gate line "the same gate `/ft-release` §7.1 runs" now points back at itself. → Fixed: clause dropped.
5. **Note** — the overlay pointed at CONTRIBUTING for the `ai-referenced` token while CONTRIBUTING pointed back at the overlay. → Fixed: the overlay now cites `claude/skills/ft-audit/passes/docs.md` §"Extra scope tokens", where the token is defined. *(Retargeted in run 2 finding 7.)*
6. **Note** — the adopter-shipped `claude/skills/ft-audit/SKILL.md` example named flaitron-self's overlay. → Fixed: edit reverted, so the file is untouched by this task.

External review, run 2 (`/code-review medium`, working-tree diff), 8 findings:

1. **Note** — the tasknote claimed the `ft-audit/SKILL.md` edit stood after it was reverted. → Fixed: Subtasks and Implementation Notes corrected.
2. **Note** — the tasknote said the overlay gate clause was left alone, but it was dropped. → Fixed: Phase 1 assumptions and the refactor-gate note corrected.
3. **Blocker** — the pin passed vacuously (`[ "" = "" ]`) from a subdirectory. → Fixed: both paths anchored at `git rev-parse --show-toplevel`; negative test exits 1.
4. **Blocker** — the fallback ran a whole audit that the standing check would then block on. → Fixed: repair-and-recheck. *(Superseded by run 4.)*
5. **Note** — the copied pin had no sync marker. → Fixed: §7.1 cites the standing check as its source, and the standing check names §7.1's copy as a keep-in-step sibling. *(Superseded by run 3 finding 9: the copy was removed.)*
6. **Blocker** — the run-once fallback hand-relayed deltas and could drop hard rules. → Fixed: the no-`audit`-wiring path (Codex) Reads `.flaitron/audit-overlay/SKILL.md` directly as the skill body.
7. **Note** — the citation pointed at a bold bullet, not a heading. → Fixed: retargeted to §"Scope & rubric hints (→ dispatcher §1)".
8. **Note** — the CONTRIBUTING "every placeholder" claim wasn't checked per domain. → Fixed: softened to "should reach pass 1; a bootstrap stop means an unfilled slot".

External review, run 3 (`/code-review medium`, working-tree diff), 9 findings:

1. **Blocker** — the repair `ln -sfn` was unanchored while the check was anchored. → Fixed by 9: §7.1 now defers to the standing check, and its repair text says "from the repo root".
2. **Blocker** — the standing check's pin was still unanchored (vacuous from a subdirectory) and drifted from §7.1's copy. → Fixed: anchored at its single home.
3. **Note** — `.claude/commands/audit.md` → the `ft-audit` command body may route `/audit` to the bundled scaffold. → Dismissed: the stub reads "Invoke the `ft-audit` skill (in a forked install, your fork's local name — e.g. `audit`)", which routes to the overlay. The wiring predates this task ([[CORE-721]]).
4. **Note** — the `ft-audit` Subroutine-safe example named `/ft-release` §7.1 → `/ft-audit docs`, which is now false. → Fixed: made generic (wording revised in run 4 finding 6). This satisfies both run 1 finding 6 and this finding.
5. **Note** — the Codex path was ambiguous against the failing pin. → Fixed: §7.1 says Codex skips the pin.
6. **Note** — A1 prose described the superseded `Skill(ft-audit)` fallback. → Fixed: A1 rewritten; run-1 finding 1 marked superseded.
7. **Note** — "Step 0" should be Step 2.5. → Fixed.
8. **Note** — CONTRIBUTING gave Codex no `/audit` route. → Fixed: added a Codex sentence.
9. **Note** — §7.1 duplicated the pin. → Fixed: the copy was removed and §7.1 runs the standing check's command.

External review, run 4 (`/code-review medium`, working-tree diff), 10 findings:

1. **Blocker** — §7.1 ran a command from a fragment it lazy-loads only later. → Fixed by redesign: §7.1 no longer runs the pin.
2. **Blocker** — a mid-session link repair does not add `audit` to the session's skill roster, so `Skill(audit)` could still fail. → Fixed by redesign: §7.1 Reads the tracked `.flaitron/audit-overlay/SKILL.md` directly for every agent.
3. **Note** — the pin was referenced by ordinal ("fifth command"). → Fixed by redesign: the reference is gone.
4. **Blocker** — the pin still passed vacuously when the overlay path didn't resolve. → Fixed: `o=$(cd -P "$r/.flaitron/audit-overlay" && pwd) &&` gates the comparison; the negative test prints MISWIRED.
5. **Note** — "It runs the bundled scaffold" had an ambiguous antecedent. → Fixed: "The overlay runs…".
6. **Note** — `<your audit>` looked like a forker placeholder slot. → Fixed: plain prose.
7. **Note** — Implementation Notes contradicted the final state. → Fixed: rewritten as a final-state summary.
8. **Note** — run-1 fixes 2/5 were not marked superseded. → Fixed: marked.
9. **Note** — the run-2 receipt showed an A1 form that was later inverted. → Fixed: one final receipt, with earlier receipts marked superseded.
10. **Note** — the CONTRIBUTING Codex routing duplicated §7.1. → Partly fixed: the sentence is now agent-generic and cites §7.1 as doing the same thing, so a future Codex `audit` wiring needs only a CONTRIBUTING edit. §7.1's route doesn't depend on wiring at all.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `CONTRIBUTING.md` and `docs/PLATFORMS.md` updated in this task (see Implementation Notes); `README.md`, `AGENTS.md` (its `.flaitron/` bullet still describes the overlay correctly), `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, and `docs/VISION.md` need no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Lesson for skill authors: a skill step that needs a project-local skill should Read its tracked body, not invoke it by wiring. The wiring is per-machine, absent under other agents, and fixed at session start.

**Final Summary:**

The tracked `audit` overlay is now the single statement of flaitron-self's docs-audit config. `/ft-release` §7.1 Reads `.flaitron/audit-overlay/SKILL.md` with args `docs ai-referenced` and treats that read as a Subroutine-safe invocation. It no longer re-supplies a run-once rubric and gates to the bundled scaffold, and it no longer depends on per-machine `.claude/skills/audit` wiring. CONTRIBUTING describes auditing this tree as `/audit <domain> [scope]`.

Re-scoped: the PLAN line's third clause (extend §7.1's wiring check to `.claude/skills/audit`) had already shipped in [[CORE-723]]. On the way, review hardened that check: it is now anchored at the repo root, and the overlay must resolve.

Recap — changed files:
- `claude/skills/ft-release/SKILL.md` (§7.1 + Step 2.5)
- `claude/skills/ft-release/step-7.1-standing-checks.md`
- `CONTRIBUTING.md`
- `.flaitron/audit-overlay/SKILL.md`
- `claude/skills/ft-audit/SKILL.md`
- `docs/PLATFORMS.md`
- `.flaitron/PLAN.md`

Verification: all five Acceptance commands → 0; `bash tools/drift-checks.sh` → 0. No refactors.

`touches:` reconciliation: `git diff --name-only` equals the declared set exactly. `.flaitron/audit-overlay/SKILL.md` and `claude/skills/ft-audit/SKILL.md` were added mid-task for review findings, and the YAML was updated to match.

Maintainability: one config home instead of three, one copy of the wiring pin, and a release step that works in a fresh clone or under Codex.

**Archived:** 2026-10-08

External review, run 5 (`/code-review medium`, working-tree diff), 6 findings, all notes (no blocker, so no phase reopens):

1. CONTRIBUTING said `docs ai-referenced` was "the form §7.1 invokes" via `/audit`. → Fixed: now says §7.1 runs the overlay with those args by Reading the tracked body.
2. The §7.1 heading, the Step 2.5 mentions, the standing-checks header, and PLATFORMS still said "`/audit docs` subroutine". → Fixed: renamed to "audit-overlay `docs` subroutine".
3. Commands 1–4 of the local-wiring block were cwd-relative (this predates the task, but the new prose implied otherwise). → Fixed: the block opens with `cd "$(git rev-parse --show-toplevel)"`.
4. The adopter-shipped scaffold got a cosmetic reword. → Fixed: the example parenthetical was dropped instead.
5. Reading the overlay may not trigger the Subroutine-safe rule. → Fixed: §7.1 says the read counts as one.
6. No instruction for a bootstrap stop mid-release. → Fixed: take run once with the overlay's `docs:` values and treat the gap as a Medium finding.
