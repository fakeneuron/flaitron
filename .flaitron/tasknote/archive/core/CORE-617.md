---
title: unattended-full-suite
status: completed
tags: []
created: 2026-09-19
due:
related-tasks: []
touches:
  - SPEC/gate-postures.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/procedures/ft-task.md
  - SPEC.md
  - SPEC/gate-discipline.md
  - docs/EXTERNAL-AGENTS.md
---

# CORE-617 | unattended-full-suite

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-614]]

## 🎯 Goal

Under `--unattended`, Phase 3 runs the repo's full test / lint / typecheck suite instead of the targeted default, so an operator-less close cannot land green-on-targeted but red-on-full (caobunga's root cause).

## ✅ Acceptance

- [x] `SPEC/gate-postures.md` §"What `--unattended` never relaxes" states the full-suite rule (full validation set, never the targeted default; red = Phase 2 evidence, unfixable red parks) — `grep -q 'full' SPEC/gate-postures.md` scoped to that section via `awk`
- [x] `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" carries the executable mirror (what to run, what a red does) — `grep -q 'never the targeted default' claude/skills/ft-task/unattended-mode.md`
- [x] `SPEC/procedures/ft-task.md` Phase 3 bullet states the rule for non-Claude runners — `grep -q 'Under unattended mode.*full' SPEC/procedures/ft-task.md`
- [x] `SPEC.md` §"🧪 Phase 3" "Choosing a test strategy" stays guidance attended and gains only a one-sentence pointer to the posture rule — `judgment`: prose fidelity, no command decides "stays guidance"
- [x] `SPEC/gate-discipline.md` rationalization table refuses "targeted tests are green, so the unattended close is safe" — `grep -q 'green' SPEC/gate-discipline.md`
- [x] All budgeted files stay under `docs/CONTEXT-BUDGET.md` caps — the CI budget `awk`/`wc -c` loop from `.github/workflows/ci.yml` run locally → exit 0

## 🧩 Subtasks

- [x] Add the rule to `SPEC/gate-postures.md` §"What `--unattended` never relaxes" (contract: full validation set, discovery order, red handling, why)
- [x] Mirror executably in `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" (shared by `/ft-micro-task` and `/ft-close-epic`)
- [x] Add the "Under unattended mode" sentence to `SPEC/procedures/ft-task.md` Phase 3 bullet
- [x] Add a one-sentence pointer to `SPEC.md` §"🧪 Phase 3" "Choosing a test strategy"
- [x] Add one rationalization row to `SPEC/gate-discipline.md`
- [x] Run the CI context-budget loop locally; lint-free markdown

## 🔗 Related

- [[CORE-614]] — dogfood-receipt-shape; the most recent Phase 3 receipt wording this task sits next to
- [[CORE-616]] — receipt-not-transcript; sibling Phase 3 wording task (open, Low), touches the same SPEC.md paragraph region

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and unaddressed: `SPEC.md` §"🧪 Phase 3" says "Run the full test suite only when changes are broad or cross-cutting" with no posture caveat, and neither `SPEC/gate-postures.md` nor the shared `unattended-mode.md` fragment says anything about test scope — the surface matrix covers gates only. Under `--unattended` the "is this change broad?" judgment has no reviewer, which is exactly caobunga's green-targeted / red-full failure. Scope matches the PLAN line: attended guidance unchanged, posture gains the rule.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Source reads.** `SPEC.md` §"🧪 Phase 3" (lines 446-500): checklist box "Ran targeted test suite", the standalone sentence "Run the full test suite only when changes are broad or cross-cutting", and the "Choosing a test strategy (guidance, not a gate)" paragraph. `SPEC/gate-postures.md` §"`--unattended` operator posture" → "What `--unattended` never relaxes" (lines 257-270): three paper-complete-guard parts, closing line "removes *pauses*, never *proof*". `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes": same three parts plus two "Nor does it relax …" paragraphs (downstream-impact confirm; deferred hand-off filing) — the executable mirror, shared by `/ft-micro-task` and `/ft-close-epic`. `SPEC/procedures/ft-task.md` Phase 3 bullet (line ~402): "full suite only for broad/cross-cutting changes" plus an "**Under unattended mode**" sentence for 👁️ — the agent-neutral runner needs the same sentence for test scope. `SPEC/blocked.md` §"Park reason": closed code set; `input-needed` = "a question autonomous execution cannot answer".
- **Best practices.** Contract lands once (gate-postures), executable mirror once (shared fragment), agent-neutral SOP once (procedures/ft-task.md). `SPEC.md` gets a pointer sentence only — without it the attended-only sentence "Run the full test suite only when …" reads as unconditional and contradicts the posture. `/ft-micro-task` reads the shared fragment and states "the steps below do not restate it", so no micro-task edit. Surface matrix left alone: it enumerates gates, and test scope is not a gate.
- **Archive skim.** 7 notes touch `gate-postures.md`, 36 touch `unattended-mode.md`; the load-bearing ones are CORE-604.2 (split gate-postures out of gates.md; budget 23,000 at 19,029), CORE-536 (gate relaxation pass), CORE-503 (refused visual-baseline carve-out — the "tests probably cover it" rationalization is named as deleted on purpose, which this rule extends to test scope). No prior note decided test scope under the posture. Root-cause source is external (caobunga), not in this archive.
- **Drift check.** All cited sections exist at the named paths; the never-relaxes heading exists in both gate-postures and the fragment. PLAN line matches this plan. Budgets: `gate-postures.md` 19,029/23,000, `SPEC.md` 47,265/53,000, `procedures/ft-task.md` 35,513/38,000, `unattended-mode.md` unbudgeted (lazy fragment), `gate-discipline.md` unbudgeted. Ample headroom for ~1.5 KB total.
- **No clarifications needed.** Assumptions: (1) "full suite" = the repo's declared full validation set, discovered from its `justfile` recipes, its AGENTS.md/CLAUDE.md validation section, or its CI workflow steps — flowtron mandates no command names; (2) a red full suite under the posture is Phase 2 evidence: a failure the diff caused returns the run to Phase 2, and a red the run cannot make green **parks `input-needed`** (the closed set gains no code — "may I close over a red I did not cause?" is a question autonomous execution cannot answer, and the ✋ "park on doubt" bias applies); (3) a repo with no suite records `N/A — no validation set declared` in the receipt; (4) the rule binds `--unattended` only — `--fast` and the `[unattended]` row marker keep the attended targeted default, since an operator reviews that commit; (5) receipt shape unchanged from CORE-614.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose contract; the CI budget loop is the mechanical check

**Implementation Notes:**

- **Pattern survey.** Extended the existing "Nor does it relax …" paragraph shape in both never-relaxes sections (gate-postures contract; shared fragment executable mirror), the existing "**Under unattended mode** …" sentence shape in the procedure's Phase 3 bullet (it already carried one for 👁️), and the rationalization-table row shape in `gate-discipline.md`. No new section, heading, code, or cue glyph.
- **Contract (gate-postures).** One paragraph: attended default and why it is guidance; full validation set under the posture with a discovery order (`justfile` → `AGENTS.md` validation → CI steps); red = Phase 2 evidence; unfixable red parks `input-needed` (existing code — "may I close over a red I did not cause?" is a question autonomous execution cannot answer; park-on-doubt bias); no-suite repos record `N/A`; `--fast` and the row marker keep the attended default.
- **Executable mirror (fragment).** Same rule with the concrete park-reason prose (checked: no `: `, no ` #`, no trailing `:`). Shared by `/ft-micro-task` and `/ft-close-epic`, so no edit to either skill body.
- **SPEC.md.** One pointer sentence appended to "Choosing a test strategy" — the paragraph's "guidance, not a gate" stands; the sentence names the one posture that removes the judgment. The checklist box and the standalone "Run the full test suite only when …" sentence are untouched.
- **Surface matrix left alone** — it enumerates gates; test scope is not a gate. **docs/EXTERNAL-AGENTS.md** gained one caller-facing sentence (budget the run time; expect the park) via the doc-drift sweep.
- **Refactor gate.** No refactor; deferred nothing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown only; Acceptance verify commands below stand in

- [x] Ran lint/type-check on changed code — the CI context-budget loop (the only mechanical check on these files) run locally, below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
awk '/^### What `--unattended` never relaxes/{a=1;next} a&&/^### /{a=0} a' SPEC/gate-postures.md | grep -q 'full validation set'   → 0
grep -q 'never the targeted default' claude/skills/ft-task/unattended-mode.md                                                     → 0
grep -q 'Under unattended mode.*full' SPEC/procedures/ft-task.md                                                                    → 0
grep -q 'green' SPEC/gate-discipline.md                                                                                             → 0
CI context-budget loop (.github/workflows/ci.yml "Context budget" step, run locally)                                                → 0
```

Sizes after: `SPEC.md` 47,513 / 53,000 · `SPEC/gate-postures.md` 20,412 / 23,000 · `SPEC/procedures/ft-task.md` 35,933 / 38,000 · `unattended-mode.md` 15,662 (unbudgeted) · `gate-discipline.md` 16,077 (unbudgeted). The `SPEC.md` "stays guidance" criterion is `judgment`: the "(guidance, not a gate)" paragraph is intact and only gained a trailing pointer sentence (diff read). Structural half: no duplication beyond the deliberate contract/executable/SOP mirror the repo already maintains; no dead text; no new public surface (no new code, cue, or heading).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- **Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `README.md` no change · `AGENTS.md` no change · `SPEC.md` **updated** (pointer sentence, Phase 3) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (its Phase 3 line describes the attended shape) · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` **updated** (one caller-facing sentence: full-suite cost + `input-needed` park) · `docs/WORKTREES.md` no change.
- **Changed files (6, +36/−3, markdown only):** `SPEC/gate-postures.md` (+20, the rule), `claude/skills/ft-task/unattended-mode.md` (+2, executable mirror), `SPEC/procedures/ft-task.md` (+8/−1, SOP sentence), `SPEC.md` (+6/−1, pointer), `SPEC/gate-discipline.md` (+1, rationalization row), `docs/EXTERNAL-AGENTS.md` (+1/−1, caller note).
- **Verification:** five verify commands → 0 (Testing Notes); CI context-budget loop → 0; one `judgment` criterion read from the diff.
- **Refactors:** none made, none deferred.
- **`touches:` reconciliation:** `git diff --name-only` = the six declared paths; no undeclared paths.
- **Maintainability effect:** the "is this change broad?" judgment now has an explicit owner in every posture — the reviewing operator attended, the full suite unattended — stated once as contract, once executably, once in the agent-neutral SOP, with a pointer where the attended guidance lives. The park-reason closed set is unchanged.

**Archived:** 2026-09-19
