---
title: loosen auto-commit gates
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-432.2, CORE-089, CORE-358]
---

# CORE-437 | loosen auto-commit gates

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-432.2]] [[CORE-089]] [[CORE-358]]

## 🎯 Goal

Loosen the 📦 Conditional skip rule so routine frontend and other low-risk diffs auto-commit by default, keep the human pause only for privileged-ops / bundled prompts, and make remaining commit-go asks unmissable — never suggesting a next move until a real SHA lands.

## ✅ Acceptance

- [x] `SPEC/gates.md` §"Conditional skip rule" fires 📦 only on privileged-ops path/keyword hits or a bundled in-📦 prompt; frontend globs and perf-narrative are retired as skip signals
- [x] Remaining fire-branch commit-go is hard to miss: `/ft-task` keeps the 📦 banner; `/ft-micro-task` keeps no banner but emits the emphasized 🟢 GO ask (SPEC.md carve-out no longer says the 🟢 prefix does not apply)
- [x] Post-closure sequencing is explicit: next-move + copy-paste emit only after a deliverable-covering SHA; fire branch waits (no next-move in the same turn as the GO/📦 ask)
- [x] Cite-don't-restate restatements (`SPEC.md` post-closure pointer, `docs/GLOSSARY.md`, skill `--fast` examples, `SECURITY.md` lethal-trifecta note) match the new fire set
- [x] `--fast` still force-skips remaining fire cases; bundled-prompt override still wins

## 🧩 Subtasks

- [x] Rewrite `SPEC/gates.md` §"Conditional skip rule" (drop frontend + perf-narrative; keep privileged-ops + bundled-prompt; retarget table trigger, `--fast` examples, "no AI override", rationalizations/red flags, destructive-escalation analog)
- [x] Tighten `SPEC.md` post-closure protocol: three-signal pointer → remaining fire set; micro-task carve-out gains emphasized 🟢 GO; step 2 sequencing restated as a hard wait
- [x] Align closure-bearing skills: `ft-task`, `ft-micro-task`, `ft-epic-discovery`, `ft-close-epic`, `SPEC/procedures/ft-task.md` (skip/fire prose + `--fast` examples)
- [x] Sync `docs/GLOSSARY.md` Conditional skip / privileged-ops entries; `SECURITY.md` lethal-trifecta note (frontend no longer trips 📦)
- [x] Grep live (non-archive) restatements of the three-signal / frontend-skip wording and fix stragglers (`claude/commands/`, CAPABILITIES if needed)

## 🔗 Related

- [[CORE-432.2]] — motivating incident: micro closed + next-task cue with uncommitted `App.tsx` / PLAN dirt
- [[CORE-089]] — original three-signal Conditional skip rule (frontend + privileged-ops + perf-narrative)
- [[CORE-358]] — paper-complete guard (🏁 only with a deliverable-covering SHA)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The CORE-432.2 incident is a live gate-ergonomics failure (frontend signal fired a quiet micro-task prose ask; next-move emitted with uncommitted dirt); the PLAN line already names the fire-set shrink and the GO/sequencing fix.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Relevance.** Proceed. Two coupled defects, both named on the PLAN line:

1. **Over-fire.** `SPEC/gates.md` §"Conditional skip rule" still requires all three signals to clear (frontend globs, privileged-ops, perf-narrative). A routine `viz/src/ui/App.tsx` edit (CORE-432.2) trips frontend and pauses. Solo flowtron work is mostly this class of diff.
2. **Quiet fire + early next-move.** `/ft-micro-task` fire branch is a buried prose ask (`Ready to commit? Reply commit/go/yes`) with an explicit carve-out that "the 📦 cue and 🟢 prefix do not apply" (`SPEC.md:760`). CORE-432.2 closed, suggested next-task, and left App/PLAN uncommitted — paper-complete + sequencing failure.

**Read set.** `SPEC/gates.md` (full, especially §"Conditional skip rule" + `--fast` + Rationalizations/Red Flags), `SPEC.md` §"Post-closure protocol" + micro-task carve-out, `claude/skills/ft-task/SKILL.md` Step 6, `claude/skills/ft-micro-task/SKILL.md` Step 5, `claude/skills/ft-epic-discovery/SKILL.md` + `ft-close-epic/SKILL.md` skip/fire branches, `SPEC/procedures/ft-task.md` Step 6, `docs/GLOSSARY.md` Conditional skip / privileged-ops / ready-to-commit, `SECURITY.md` lethal-trifecta paragraph, archived CORE-089 / CORE-432.2 / CORE-432.N / CORE-358 / CORE-429.

**Best Practices Review.** Contract-layer, not code modules. Ownership:

- `SPEC/gates.md` owns the skip-rule signal list (cite-once).
- `SPEC.md` core points at it; must not grow a second signal list.
- Closure-bearing skills implement skip/fire branches; they name signals only in examples.
- `docs/GLOSSARY.md` is the cold-start restatement that will otherwise drift.
- `SECURITY.md` currently treats 📦 as the lethal-trifecta control; dropping frontend as a trip is a real control-surface change and must be named there, not smuggled.

No in-scope refactor. Deferred: `docs/AGENT-NEUTRALITY.md` `--fast` site-count (pre-existing CORE-374-class drift, CORE-386 already declined to smuggle).

**Archive skim.** Load-bearing:

- **CORE-089** minted the three-signal hybrid (path bright-line + perf-narrative judgment valve) and the micro-task "no banner, same skip rule" carve-out. Dropping two of those three signals is a deliberate reversal of that hybrid, not a bugfix of CORE-089's text.
- **CORE-432.2 / CORE-432.N** filed this task from the header-version micro: viz `App.tsx` change + PLAN/archive flips, next-task cue, uncommitted dirt.
- **CORE-358** already forbids 🏁 without a deliverable-covering SHA; the incident shows agents still emit next-move before that SHA. Sequencing needs a red-flag, not a new guard.
- **CORE-429** auto-commits *filing* skills; execution skills stay behind this gate. Do not conflate the two.
- **CORE-386** added Rationalizations/Red Flags to `gates.md` — the right place to name "I suggested next-move in the same turn as 📦/🟢".

**Drift check.** PLAN cites `SPEC/gates.md` Conditional skip — heading and three-signal list still match HEAD (`gates.md:323–354`). Motivating CORE-432.2 is archived and completed. No cited line numbers. Cross-artifact: shrinking the fire set does not contradict the two-banner cap, paper-complete guard, or `--fast` override; it *does* change SECURITY.md's implication that any risky-looking diff pauses at 📦 — that doc must move with the contract. No PLAN-line rewrite needed.

**Clarifications.** No clarifications needed. Explicit assumptions:

1. **Fire set.** Drop frontend globs *and* perf-narrative. Fire only on privileged-ops (migrations / auth / security-secrets / credential keywords / external integrations — already includes the PLAN's "secrets / migrations") plus the bundled-prompt override. "Other low-risk" on the PLAN line is those two retired signals.
2. **Micro-task GO.** Keep the no-📦-banner carve-out (CORE-089 C9). Reverse "🟢 prefix do not apply": fire branch uses the emphasized 🟢 GO shape (`👁️`-style own-line bold label). That is the "hard-to-miss 🟢 GO (or 📦)" for micros.
3. **Sequencing.** Next-move + copy-paste are post-SHA only. On the fire branch the turn that emits 📦/🟢 contains no next-move. Skip branch is unchanged (commit → 🏁 → next-move in one response).
4. **`--fast`.** Unchanged mechanics; examples that currently say `frontend files touched; suppressed via --fast` retarget to a privileged-ops example.
5. **No executable tests.** Pure SPEC/SKILL/doc prose, same as CORE-089.
6. **Destructive-escalation analog.** Its "mirrors the perf-narrative fire-on-doubt valve" sentence needs a new referent (privileged-ops glob match is deterministic; keep fire-on-doubt on the escalation itself, drop the perf-narrative cross-ref).

---

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey.** Same cite-once shape as CORE-089 / CORE-386: `SPEC/gates.md` owns the signal list; `SPEC.md` core points; skills implement skip/fire branches with examples only; GLOSSARY is the cold-start restatement. No new structure. Destructive-escalation keeps its own fire-on-doubt bias and drops the perf-narrative analog (that valve is gone).

**Minimal refactor.** No refactor. Deferred: `docs/AGENT-NEUTRALITY.md` `--fast` site-count (pre-existing CORE-374-class; CORE-386 already declined to smuggle).

**What landed.**
- `SPEC/gates.md` — one skip signal (privileged-ops globs/keywords); frontend + perf-narrative retired in the intro; table trigger, `--fast` example, no-AI-override (no judgment valve), On-fire wait, new rationalization + red-flag for next-move-before-SHA.
- `SPEC.md` — post-closure pointer; micro-task carve-out now requires emphasized 🟢 GO; steps 2–3 forbidden in the fire-branch turn.
- Skills + procedure — skip examples retargeted; fire branches wait; micro-task emits `🟢 **GO**`.
- `docs/GLOSSARY.md` + `SECURITY.md` lethal-trifecta paragraph.

**Keyword self-quote.** `SPEC/gates.md` still contains `API_KEY`/`SECRET`/`TOKEN`/`PASSWORD` as the trigger list. That is the SECURITY.md scanner false-positive class, not a credential hunk — same interpretation CORE-386 used when editing this file.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

N/A for executable tests — pure SPEC/SKILL/doc prose (CORE-089 precedent). `git diff --check` clean. Live (non-archive) grep for `three-signal test`, `frontend / privileged-ops / perf-narrative`, `no frontend/privileged surface`, `frontend files touched; suppressed`, `🟢 prefix do not apply` returns only this tasknote's Discovery notes + historical archives. Quality: cite-once held (glob list lives only in `gates.md`). 👁️ N/A — no frontend files.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"):

- `README.md` — no change
- `AGENTS.md` — no change
- `SPEC.md` — updated (post-closure pointer + micro-task 🟢 GO carve-out + fire-branch wait)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — updated (lethal-trifecta: 📦 now privileged-ops / bundled-prompt only)
- `docs/AGENT-NEUTRALITY.md` — no change (pre-existing `--fast` site-count drift left; CORE-386 deferred)
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change (`--fast` still force-skips remaining 📦 trips)
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

Off-list: `docs/GLOSSARY.md` Conditional skip / privileged-ops / ready-to-commit entries synced.

**Final Summary:**

Routine frontend and other non-privileged diffs now auto-commit; 📦 / 🟢 GO fire only for privileged-ops or a bundled prompt, and next-move waits for a real SHA. 9 live files, −53/+55, `git diff --check` clean. No refactor. Doc-drift: SPEC.md + SECURITY.md updated; GLOSSARY off-list synced; remaining AI-referenced docs no change.

**Archived:** 2026-08-12
