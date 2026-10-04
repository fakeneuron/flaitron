---
title: refactor-planner
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463]
parallel-safe-with:
  - CORE-463.2
  - CORE-463.4
---

# CORE-463.3 | refactor-planner

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Ship a new `/ft-refactor` skill — a read-only depth planner that takes one named target and files a sequenced refactor epic whose children each carry characterization-test and behavior-preservation acceptance criteria; it never edits code (execution happens through normal /ft-task cycles) and installs at the symlinked tier.

## ✅ Acceptance

- [x] New `claude/skills/ft-refactor/SKILL.md` authored — `/ft-refactor <target> [--fast]` grammar, two-layout path resolution, read-only hard rule (files PLAN entries + starter notes, never edits code), depth-analysis procedure over one named target, review-then-file gate (`--fast` skips), and the filing shape: parent epic + implementation children from `.2` + reserved `.N` audit, **no `.1`** (the run is the discovery)
- [x] Each filed child is a **starter tasknote** carrying characterization-test + behavior-preservation acceptance seeds, its slice of the sequenced plan, and `blocked-by:` sequencing (promoted later by `/ft-task` Step 3a — zero new machinery)
- [x] Filing commit follows SPEC/tasknote-selection.md §"Filing commits" (pre-check → named-path staging → `chore:` commit, never push)
- [x] Boundary with the `structure` domain consistent with shipped `passes/structure.md` (breadth sweep there → depth plan here; escalation pointer resolves to this skill's actual contract)
- [x] `ft-` namespace + frontmatter description conventions per SPEC §"Skill namespace" and sibling skills; no new banner, lifecycle phase, schema, or script (PHILOSOPHY/VISION constraints)
- [x] Scope boundary respected — no codex mirror, command wrapper, symlink-count, or roster edits (all owned by `.5`)

## 🧩 Subtasks

- [x] Author frontmatter (`name: ft-refactor`, trigger-rich `description` with args example) per sibling conventions
- [x] Step 0 — standard two-layout path resolution block (adopter `.flowtron/core/` vs self-host)
- [x] Step 1 — parse `<target>` (required; file / dir / module / symbol) + `--fast`; unknown-arg handling per sibling pattern
- [x] Step 2 — read-only depth survey: target + inbound/outbound dependencies, seams, existing test coverage, characterization gaps
- [x] Step 3 — draft the sequenced plan: ordered steps, each behavior-preserving, characterization-tests-first, per-step acceptance seeds
- [x] Step 4 — review gate (AskUserQuestion; `--fast` skips the pause, never widens writes)
- [x] Step 5 — file: resolve next `<AREA>-EPIC-<N>` (ft-epic-discovery Step 3 mechanics), write parent + `.2..(M+1)` + `.N` PLAN lines, write per-child starter notes with `blocked-by:` chain
- [x] Step 6 — filing commit per §"Filing commits" + hand-off (next-move pointer to `/ft-task <N>.2`)
- [x] Notes — read-only hard rule, no-`.1` deviation rationale, compare-with `/ft-epic-discovery` · `/ft-spec` · `structure` domain
- [x] Phase 3 — markdown mental-pass; verify no `.5`-owned surface touched
- [x] Phase 4 — doc-drift sweep + closure

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic (refactor-and-structure-audit)
- [[CORE-463.1]] — epic Discovery that scoped this child (Fan-out: Parallel with [[CORE-463.2]] · [[CORE-463.4]])
- [[CORE-463.5]] — downstream wiring-and-docs child (blocked-by this task per Fan-out Sequential row)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Third implementation child of CORE-EPIC-463, scoped by the `.1` Discovery with the operator. Capability gap re-confirmed at `.1` (no refactor skill anywhere across flowtron/global/adopter skills); the shipped `.2` (`passes/structure.md`) already points at `/ft-refactor <target>` as the depth-escalation path, so this child closes a dangling reference.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Interface already fixed by shipped siblings.** `passes/structure.md` (shipped in `.2`) commits to the invocation `/ft-refactor <target>` and the sentence "that skill files the staged epic with characterization-test acceptance"; its carve-out narrows to non-code nits because "structural fixes always go through tickets or an `/ft-refactor` plan". The `.1` resolved-scoping table fixes: depth planner on **one named target** · read-only (files follow-ups/epics, never fixes inline) · strict safety contract encoded as acceptance criteria on the filed children, not executed by the skill · symlinked tier · boundary vs `structure` = breadth-sweep/flat-tickets vs depth-plan/sequenced-epic.

**Scope split (from `.1` Fan-out + `.2` precedent).** `.3` ships `claude/skills/ft-refactor/` only. `.5` owns: codex mirror, `claude/commands/ft-refactor.md`, ft-new-project symlink block (22 → 24), ft-flowtron roster (18 → 19), and the MIGRATION / SPEC §"Skill namespace" / GLOSSARY / CONVENTIONS / PLATFORMS / AGENTS-snippet sweeps. `.2`'s closure explicitly reserved "ft-refactor wiring + roster counts" to `.5`.

**Pattern survey targets read.** `ft-epic-discovery/SKILL.md` (ID-resolution Step 3, PLAN-line grammar Step 4, priority placement, post-filing reconciliation scan) · `ft-starter-task/SKILL.md` (starter filing + §"Filing commits" auto-commit contract: pre-check → named-path staging → `chore:` commit, never push) · `ft-spec/SKILL.md` (review-gate shape, planning-peer framing, PHILOSOPHY/VISION constraint list) · `ft-audit/SKILL.md` ("Write tickets, not fixes" hard-rule language + anti-rationalization framing) · `templates/tasknote-starter-template.md` (starter body: Solution shape / Files to touch / Decisions locked / Open at promotion).

**Archive skim.** `claude/skills/ft-refactor/` is a new dir — no prior tasknote touches it (`grep -l ft-refactor archive/core/*.md` hits only the 463 cohort). Load-bearing: [[CORE-463.1]] (resolved-scoping table above; CORE-EPIC-389 precedent chain) · [[CORE-463.2]] (boundary encodings; the `<target>` span in its escalation pointer is deliberately outside the §1.5 placeholder-detection block — nothing here may break that) · [[CORE-463.4]] (each child fixes the doc drift it causes; wiring counts stay `.5`).

**Drift check.** PLAN line matches HEAD — no refactor skill exists; `structure.md` shipped with the escalation pointer; symlinked-tier decision unchanged. SPEC compatibility: the skill adds **no** new banner, lifecycle phase, schema, or script; epic filing reuses SPEC/epic.md grammar (`.N` reserved suffix intact). One documented deviation: SPEC/epic.md lifecycle step 1 defaults to "File the epic with a Discovery subtask (`.1`)" — `/ft-refactor` substitutes its own run for `.1` (the analysis is the discovery), so its epics file children from `.2` with no `.1`. The SKILL's Notes section records this deviation inline; epic.md's optional-bracket judgment clause ("apply judgment") covers it, and `.5`'s SPEC sweep can add a pointer sentence if wanted.

**Resolved design decisions (AskUserQuestion, this session):**

| Question | Resolution |
|---|---|
| Epic shape | **No `.1`** — the run is the discovery; file parent + `.2..(M+1)` + reserved `.N` audit; parent description notes "filed via /ft-refactor"; sequencing lives on the children (`blocked-by:`), not a Fan-out on a `.1` note |
| Per-child criteria home | **Starter tasknote per child** — characterization-test + behavior-preservation seeds, plan slice, files-to-touch, `blocked-by:` chain; `/ft-task` Step 3a promotion picks them up with zero new machinery |
| Review gate | **Review-then-file** — sequenced plan surfaced inline for confirm/edit before any PLAN/starter write; `--fast` skips the pause but never widens what gets written |

**Fan-out echo.** Parallel-safe with [[CORE-463.2]] · [[CORE-463.4]] per the `.1` Fan-out — both already closed, so no live worktree concern.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no new shape: the skill composes four established ones — `ft-epic-discovery` (epic-ID resolution + PLAN-line filing mechanics + reconciliation scan), `ft-starter-task` (starter filing + §"Filing commits" contract), `ft-spec` (review-then-write gate + planning-skill framing + PHILOSOPHY/VISION constraint list), `ft-audit` (read-only hard-rule language). SRP boundary: this SKILL owns only the depth-plan-and-file flow; promotion, execution, and audit stay in `/ft-task` / `/ft-close-epic`.

- [x] **Minimal refactor gate** — N/A: new file only; no existing code or prose surface modified.

- [x] Implemented the minimal solution — `claude/skills/ft-refactor/SKILL.md`, 232 lines (sibling band 146–311); no other surface touched.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill prose; no executable code surface).

**Implementation Notes:**

- **One new file:** `claude/skills/ft-refactor/SKILL.md` (232 lines). Frontmatter description follows the trigger-rich sibling style (what · when-to-use · args example).
- **Flow encoded:** Step 0 two-layout path resolution → Step 1 `<target>` + `--fast` parse (missing/nonexistent target asks, never guesses; no whole-repo fallback) → Step 2 read-only depth survey (target · inbound blast radius · outbound deps · test-coverage map · seams · declared structure; probe option; de-scope valve to a single filing when no epic is warranted) → Step 3 sequenced plan (pin-behavior-first, one seam per step, behavior-preservation contract, M = step count) → Step 4 AskUserQuestion review gate (file / edit / stop; `--fast` skips; `.N` declinable) → Step 5 filing (pre-check → epic-ID resolution → parent + `.2..(M+1)` + `.N` PLAN lines, **no `.1`** → one starter per child with acceptance seeds + `blocked-by:` chain → reconciliation scan) → Step 6 filing commit (`chore:`, named-path staging, no 🏁) + hand-off cue.
- **All three resolved design decisions encoded** (no-`.1` shape with Notes rationale; starter-per-child criteria home; review-then-file gate).
- **Deferred to `.5` by design:** codex mirror, command wrapper, symlink block 22 → 24, roster 18 → 19, doc-enumeration sweeps.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose skill file; no test surface).

- [x] Ran lint/type-check on changed code — N/A (no lintable code surface); markdown mental-pass run instead (see Testing Notes).

- [x] **Quality assertions** — no duplicated contract prose (filing-commit, reconciliation, starter, and epic contracts are cited by SPEC section, not restated); no dead sections; skill adds no banner/phase/schema/script per PHILOSOPHY/VISION; public surface growth is the one intended skill.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass + mechanical checks on `claude/skills/ft-refactor/SKILL.md`:

- Heading skeleton clean (`## Step 0`–`## Step 6` + `## Notes`); no unbalanced code fences (none needed); no tabs; `grep -nE " +$"` → no trailing whitespace ✅
- All cited paths exist at HEAD: `templates/tasknote-starter-template.md` · `templates/subagent-probe-template.md` · `SPEC/starter.md` · `SPEC/epic.md` · `docs/PHILOSOPHY.md` · `docs/VISION.md`; cited SPEC sections resolve (`SPEC/tasknote-selection.md` §"Filing commits" line 135, §"Downstream-impact reconciliation" line 234) ✅
- Zero-width-character scan: one stray ZWSP found in this tasknote's Discovery Notes and removed; SKILL.md clean ✅
- Surface check: `git status --porcelain` shows exactly the two in-scope paths (this tasknote + the new skill dir) — no `.5`-owned surface touched ✅
- Wrapper-name invariant: N/A here — `claude/commands/ft-refactor.md` is `.5`'s deliverable ✅
- Boundary cross-check vs shipped `passes/structure.md`: its escalation sentence ("files the staged epic with characterization-test acceptance") matches the shipped contract; nothing in this skill re-touches that file, so its §1.5 placeholder-detection behavior is unaffected ✅

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change |
  | `AGENTS.md` | no change |
  | `SPEC.md` | no change — §"Skill namespace" roster edit is `.5`'s deliverable |
  | `docs/MIGRATION.md` | no change — §1.2.1 / symlink-block edits land in `.5` (its existing `/ft-refactor` mention shipped with `.2` and matches this skill's contract) |
  | `claude/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `codex/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `cursor/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `grok/AGENTS-snippet.md` | no change — roster edit lands in `.5` |
  | `docs/CONVENTIONS.md` | no change — enumeration edit lands in `.5` |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — enumeration edit lands in `.5` |
  | `docs/AGENT-NEUTRALITY.md` | no change — enumeration edit lands in `.5` |
  | `docs/PLATFORMS.md` | no change — enumeration edit lands in `.5` |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change |
  | `docs/EXTERNAL-AGENTS.md` | no change — the skill delegates nothing and stays inside the one-run boundary |
  | `docs/WORKTREES.md` | no change — filed children carry `blocked-by:` chains; worktree convention untouched |

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Shipped `/ft-refactor` — flowtron's first refactor skill: a read-only depth planner that analyzes one named target and, on operator approval, files a sequenced behavior-preserving epic. The skill never edits code; every planned change executes later through normal `/ft-task` cycles on the filed children.

**Changed files:** `claude/skills/ft-refactor/SKILL.md` (new, 232 lines) + this tasknote + the PLAN.md stub flip. No other surface touched — codex mirror, command wrapper, symlink block (22 → 24), roster (18 → 19), and doc-enumeration sweeps are `.5`'s.

**Design (three operator-resolved decisions):** epics file with **no `.1`** (the run is the discovery; children start at `.2`, reserved `.N` audit kept — epic.md's "apply judgment" clause, rationale recorded in the SKILL's Notes); per-child criteria live on **starter tasknotes** (characterization-test + behavior-preservation acceptance seeds, `touches:`, `blocked-by:` sequencing chain — promoted by `/ft-task` Step 3a with zero new machinery); **review-then-file** gate (AskUserQuestion; `--fast` skips the pause but never widens writes).

**Composition, not invention:** epic-ID resolution + PLAN-line mechanics from `ft-epic-discovery`, starter filing + §"Filing commits" contract from `ft-starter-task`, review-gate + constraint framing from `ft-spec`, read-only hard-rule language from `ft-audit`. Adds no banner, lifecycle phase, schema, or script.

**Verification:** markdown mental-pass (headings, fences, tabs, trailing whitespace) clean; all cited template/SPEC/doc paths verified at HEAD; one stray zero-width space found in this tasknote and removed; `git status` surface = exactly the in-scope paths; shipped `passes/structure.md` escalation sentence cross-checked against the delivered contract — consistent, and its §1.5 placeholder detection untouched.

**Refactors:** none made, none deferred — single new file.

**Documentation verdict:** 17/17 AI-referenced docs "no change"; every enumeration edit is assigned to `.5`.

**Maintainability effect:** closes the epic's dangling reference (`structure.md` has pointed at `/ft-refactor <target>` since `.2` shipped) and gives structural findings a depth path that ends in reviewable, individually-verifiable child tasks instead of one oversized ticket — with the safety contract carried as data on the filed starters rather than as new workflow machinery.

**Archived:** 2026-08-23
