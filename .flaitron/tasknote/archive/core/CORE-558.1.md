---
title: post-shrink-fidelity discovery
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-EPIC-558, CORE-EPIC-535, CORE-555, CORE-551, CORE-552]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-558.1 | post-shrink-fidelity discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-558]]

## 🎯 Goal

Scope the `CORE-EPIC-558` epic (`post-shrink-fidelity`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-558.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-558.2 .. CORE-558.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-558.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-558.2 .. CORE-558.5; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-558 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-558]] — parent epic
- [[CORE-EPIC-535]] — predecessor: context-load-diet shrink (SPEC lazy split, cite-don't-restate, gate untangle)
- [[CORE-555]] — predecessor: raised SPEC.md / gates.md operating ceilings; instruction clarity outranks byte discipline
- [[CORE-551]] — post-shrink feature to preserve: `--unattended` filing authority
- [[CORE-552]] — post-shrink feature to preserve: `/ft-epic-discovery` refuses `--unattended`

## 🌳 Fan-out

- **Sequential:** [[CORE-558.2]] · [[CORE-558.3]] after .2 · [[CORE-558.4]] after .3 · [[CORE-558.5]] after .4
- **Synthesis:** [[CORE-558.N]]

## 🧭 Deep Pre-pass

### Constitution

Hard constraints:

1. **Clarity over bytes.** If the shrink removed a load-bearing step or gate, or made an instruction ambiguous, restore the missing contract — even when that grows `SPEC.md` or another budgeted surface.
2. **Raise ceilings when the process needs room.** Caps are a ratchet, not a reason to compress process. [[CORE-555]] already recast `SPEC.md` / `SPEC/gates.md` as operating ceilings; this epic MAY raise again with the reason recorded in `docs/CONTEXT-BUDGET.md`. Do not "make it fit" by tightening prose until the process is unclear.
3. **Post-shrink features stay.** Work landed after [[CORE-EPIC-535]] — especially `--unattended` ([[CORE-551]], [[CORE-552]]) — must remain functional and unambiguous. Restore *around* those paths; never revert, drop, or re-ambiguate them to reclaim bytes.
4. **Cite-don't-restate still governs skill bodies** ([[CORE-535.4]]). Missing skill steps are restored by pointing at SPEC, or by adding a skill-local imperative SPEC does not carry — not by pasting SPEC back into `SKILL.md`.
5. **One cluster per child, serial.** Review one-at-a-time as requested. No whole-contract rewrite in one window.

Invariants:

- The lazy `SPEC/` split ([[CORE-535.3]]) stays; this is not a merge-SPEC-back epic.
- Core principles stay: markdown over JSON, zero scripts, one task per context window.
- The release budget *check* stays; we may change *numbers*, not the mechanism.
- The `[unattended]` PLAN marker and the `--unattended` invocation posture remain distinct.

Out of scope:

- Adopter personal context files (`CLAUDE.md`, natabula deposits) — that is `/ft-audit-context`, not this epic.
- Visualizer / FE work.
- New workflow features beyond restoring or clarifying existing process.
- Wholesale reversal of [[CORE-EPIC-535]].

### Specification

**Epic delivers:** a reviewed contract surface after [[CORE-EPIC-535]]'s shrink. Missing or over-tightened process is restored until an agent can follow it without guessing; budgets are raised where that restore needs room; post-shrink features (especially `--unattended`) remain intact. This epic does not invent new workflow, merge `SPEC/` back into `SPEC.md`, or reverse cite-don't-restate.

**Shared review bar (every implementation child):** for each in-scope file, record (a) load-bearing steps/gates still present and unambiguous, (b) anything removed or tightened into ambiguity, (c) the restore-or-keep decision with a one-line reason, (d) post-shrink additions in that file confirmed still present. A child may close with "no restore" if the shrink held.

**CORE-558.2 — SPEC.md fidelity.** WHAT: the always-loaded contract is complete and unambiguous for the 4-phase lifecycle an agent runs without loading every lazy module. Acceptance: every always-loaded step is either in `SPEC.md` or has a named `SPEC/` home; no dangling section citations left by the lazy split; the deferred-hand-off `--unattended` discharge path named by [[CORE-551]] is still in `SPEC.md`. Interacts with: first child — `.3` and `.4` cite this file; `.5` may raise its ceiling after restores.

**CORE-558.3 — gates + unattended posture.** WHAT: the gate contract (`SPEC/gates.md` and the modules 535.5 split out of it) still specifies when to pause, what `--unattended` / `--fast` change, and what they never relax. Acceptance: `--unattended` "Applies to" lists every runner that accepts or refuses it ([[CORE-551]] includes `/ft-file-followup`; [[CORE-552]] keeps `/ft-epic-discovery` as a readable refusal); pause-vs-proof and "never relaxes" items are intact; cue/discipline modules still match the gates.md pointers. Interacts with: after `.2` (SPEC names the path); `.4` must match this posture, not an older restatement.

**CORE-558.4 — skill cite-don't-restate fidelity.** WHAT: lifecycle skill bodies remain executable after [[CORE-535.4]] — a runner can be followed without reconstructing missing steps from memory. Acceptance: each in-scope `ft-*` body has its skill-local imperatives (parse flags, markers, posture branches such as `--unattended`); citations point at the restored SPEC homes from `.2`/`.3`; no SPEC paste-back. Interacts with: after `.2` and `.3` so citations target current homes.

**CORE-558.5 — budget ceilings.** WHAT: `docs/CONTEXT-BUDGET.md` ceilings match the size the restored process actually needs. `SPEC.md` (and any other surface this epic grew) MAY be raised with the reason recorded in the Budgets table. Acceptance: every budgeted surface grown by `.2`–`.4` has a recorded reason or is still under its cap; §"Known over budget" is empty or has an open owner; the release check still measures, it does not invent new numbers. Interacts with: last implementation child, so it measures the restored files; `.N` synthesizes.

**CORE-558.N — audit.** Unchanged from filing: final-subtask audit per `SPEC/epic.md` (fixed doc-drift sweep). Confirms the four children sit together — no child restored a step another child then cited away, and `--unattended` still works end-to-end.

### Clarifications

Resolved 2026-09-10:

| # | Question | Resolution |
|---|---|---|
| Q1 | Review baseline | **Both.** Diff vs pre-CORE-EPIC-535 to find deletions, then judge against current (post-unattended) truth. Never revert [[CORE-551]] / [[CORE-552]]. Pre-535 text is evidence, not source of truth. |
| Q2 | CORE-558.2 surface | **SPEC.md + pointer-check of 535.3 homes.** Restore in SPEC.md. Extracted modules are in-scope only when the pointer is broken or the home is itself ambiguous — not restore targets in the same child. |
| Q3 | CORE-558.4 roster | **Unattended-critical runners:** `ft-task` + `unattended-mode.md`, `ft-file-followup`, `ft-epic-discovery`, `ft-micro-task`, `ft-goal-task`, `ft-close-epic`. Discovery may split if that is still too big for one window. |
| Q4 | Restore style | **Merge to current truth.** Restore missing steps in today's vocabulary; keep post-shrink features; grow the file if needed. `.5` records any ceiling raise. |
| Q5 | AGENTS.md / tasknote README / templates / snippets | **Out unless Discovery finds shrink damage.** If it does, file a follow-up rather than silently widening M. |

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery` after CORE-EPIC-535's shrink (SPEC.md 78,119 → 49,285; gates.md 51,809 → 34,963; ft-task 33,940 → 28,924) plus later unattended work (CORE-551 / CORE-552) and a ceiling raise (CORE-555). The risk is lost or over-tightened process, not an unowned budget violation — every budgeted surface is under its cap today.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract + skill prose; no code module boundaries. The one boundary that matters is already locked: cite-don't-restate (skills point at SPEC; they do not paste it back).

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Surface inventory (HEAD 2026-09-10)

| Surface | Chars now | Cap | Pre-shrink (baseline SHA) |
|---|---|---|---|
| `SPEC.md` | 49,285 | 55,000 ([[CORE-555]]) | 78,119 at `1fbc7a3` (parent of 535.3) |
| `SPEC/gates.md` | 34,963 | 40,000 ([[CORE-555]]) | 51,809 at `b75a55d` (parent of 535.5) |
| `ft-task/SKILL.md` | 28,924 | 30,000 | 33,940 at `e0773c2` (parent of 535.4) |
| `ft-epic-discovery/SKILL.md` | 26,986 | 30,000 | 28,186 pre-535.4 |
| `ft-micro-task/SKILL.md` | 19,223 | 30,000 | 21,265 pre-535.4 |
| `ft-file-followup/SKILL.md` | 23,648 | 30,000 | not a 535.4 edit — post-shrink / CORE-551 |
| `ft-goal-task/SKILL.md` | 26,775 | 30,000 | not a 535.4 edit |
| `ft-close-epic/SKILL.md` | 26,935 | 30,000 | not a 535.4 edit |
| `ft-task/unattended-mode.md` | 13,811 | unbudgeted fragment | post-shrink — preserve |
| `SPEC/cue-vocabulary.md` | 15,138 | unbudgeted | created by 535.5 |
| `SPEC/gate-discipline.md` | 15,386 | unbudgeted | created by 535.5 |
| `docs/CONTEXT-BUDGET.md` | 10,483 | unbudgeted | created by 535.2 |

535.3 extracted (pointer-check homes, not restore targets unless the pointer is broken): `plan-parser.md` · `layout.md` · `scope-boundaries.md` · `tasknote-inserts.md` · `purpose-blurb.md` · `superseded-claims.md`. All six have a SPEC.md pointer today (inserts / purpose-blurb / superseded-claims use a link, not always the `Canonical contract: see` stub shape — `.2` judges whether that is enough).

### B. Archive skim

`SPEC.md` path grep returned **610** archive notes — probe clause applies. Load-bearing subset read instead of the hit list:

- [[CORE-535.1]] — measured the always-loaded set; filed .2–.5.
- [[CORE-535.3]] — moved ten sections into six modules **verbatim**; deleted only the operator-cue glossary duplicate and the Loop-tasks restatement. Cross-refs repaired in 39 files.
- [[CORE-535.4]] — cite-don't-restate on **three** skills only (`ft-task`, `ft-micro-task`, `ft-epic-discovery`). Claim: nothing deleted from the workflow; realized harvest ~44%, not the 20k projection, because deleting imperatives would have been required.
- [[CORE-535.5]] — split cue inventory + discipline out of `gates.md` (51,809 → 32,299); later [[CORE-536]] consumed most of that headroom.
- [[CORE-535.N]] — 3 citation misses, all fixed inline; no residual contract-loss finding. This epic is not re-doing that audit; it is a post-shrink *fidelity* pass the audit did not attempt.
- [[CORE-551]] / [[CORE-552]] — unattended filing authority + epic-discovery refusal. Present at HEAD (SPEC.md §"Deferred hand-off filing" names `/ft-file-followup --unattended`; gates.md "Applies to" includes `/ft-file-followup` and refuses `/ft-epic-discovery`).
- [[CORE-555]] — already recast SPEC.md / gates.md as operating ceilings (50k→55k, 35k→40k) because instruction clarity outranked byte discipline. This epic's `.5` is a *second* raise only if `.2`–`.4` actually grow past remaining headroom (~5.7k / ~5.0k / ~1.1k on ft-task).

### C. Drift check

- PLAN.md parent + `.1` + `.N` match the locked inputs. **Filing error:** the parent block was written twice; duplicate removed during this Discovery (single cohort remains).
- `--unattended` contract at HEAD matches CORE-551 / CORE-552 claims (verified in `SPEC.md:542-553` and `SPEC/gates.md:522-528`).
- Caps in `docs/CONTEXT-BUDGET.md` match CORE-555 (55k / 40k / 30k). Ledger still stamped v5.26.0; measurements above match `wc -c` now.
- Live sibling [[CORE-557]] will edit `SPEC.md` §"🧪 Phase 3" + the same skill Phase 3 restatements. `.2` / `.4` must not pre-empt that rewrite.
- Q5 surfaces (`AGENTS.md` 6,816, `templates/tasknote-template.md` 4,935, `.flowtron/tasknote/README.md` 7,978) show no shrink-as-goal damage in this inventory — 535.3 repaired citations in them. **Out of epic** unless a child later finds damage; file a follow-up then.

No SPEC contradiction: restoring process and raising ceilings is what CORE-555 already sanctioned; cite-don't-restate and the lazy split stay.

### D. Clarifications

Resolved during deep pre-pass — see `## 🧭 Deep Pre-pass` §Clarifications. Phase 1 adds only shortnames + the 535.4 vs Q3 roster split (below).

### E. Resolved scoping (child lines)

M stays **4**. Audit `.N` confirmed as-filed.

| ID | Shortname | wc | Long description (draft) |
|---|---|---|---|
| CORE-558.2 | spec-md-fidelity | 35 | Diff SPEC.md vs pre-535.3 (`1fbc7a3`); restore missing or ambiguous always-loaded process; pointer-check 535.3 homes. Keep CORE-551's --unattended discharge path. Merge to current truth; grow the file if needed. Do not pre-empt CORE-557's Phase 3 rewrite. |
| CORE-558.3 | gates-unattended-fidelity | 22 | Diff gates.md vs pre-535.5 (`b75a55d`); restore missing pause/--unattended/--fast process. Preserve CORE-551 Applies-to (includes /ft-file-followup) and CORE-552's /ft-epic-discovery refusal. Pointer-check cue-vocabulary.md and gate-discipline.md. |
| CORE-558.4 | skill-runner-fidelity | 31 | Diff unattended-critical runners vs pre-535.4 (`e0773c2`): ft-task + unattended-mode.md, ft-file-followup, ft-epic-discovery, ft-micro-task, ft-goal-task, ft-close-epic. Restore missing skill-local imperatives; cite restored SPEC homes; no paste-back. Split if the roster exceeds one window. |
| CORE-558.5 | budget-ceilings | 33 | After .2–.4 restores, raise docs/CONTEXT-BUDGET.md ceilings (especially SPEC.md) where the restored process needs room; record the reason in the Budgets table. Known-over-budget empty or owned. Measures restored files; does not invent new numbers. |

`.4` roster note: 535.4 only edited `ft-task` / `ft-micro-task` / `ft-epic-discovery`. The other four files are follow-it-today + unattended-preservation reviews, not deletion diffs against 535.4.

Fan-out (Phase 2 fill): Sequential `.2` → `.3` → `.4` → `.5`. Synthesis `.N`. No Parallel (one-at-a-time review).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-EPIC-057 / CORE-EPIC-535 cohort-children filing pattern (2-space indent under the parent; `[heavy]🧠` on every line; em-dash separator; per-child long description ≤50w target / 70w hard cap)

- [x] **Minimal refactor gate** — N/A — PLAN.md filing only; no code refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable code surface)

**Implementation Notes:**

Filed 4 implementation children (M unchanged from filing-time estimate of 4). Word counts: .2 35w · .3 22w · .4 31w · .5 33w — all ≤50w target. Parent long description refined at Discovery closure (placeholder → scoped cohort sentence, 31w). Audit `.N` suffix unchanged.

**Downstream-impact reconciliation:** one active sibling shares a surface — [[CORE-557]] (SPEC.md §"🧪 Phase 3" + ft-task / ft-goal-task / ft-micro-task Phase 3 restatements). Class: **Unaffected / Leave**. Premise unchanged; `.2` is explicitly barred from pre-empting 557's Phase 3 rewrite. No reconcile edit. Closed rows out of scope.

**Fan-out:** Sequential `.2` → `.3` → `.4` → `.5`; Synthesis `.N`; Parallel omitted (one-at-a-time review).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose PLAN filing)

- [x] Ran lint/type-check on changed code — N/A

- [x] **Quality assertions** — N/A — no code. Markdown mental-pass on the PLAN.md block: 2-space child indent; bold IDs; `[heavy]🧠` on every new line; `| shortname` ≤30 chars; em-dash separator; long descriptions ≤70w; no trailing whitespace; CORE-557 left intact; Fan-out present with matching wikilinks.

- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  README.md · AGENTS.md · SPEC.md · docs/MIGRATION.md · claude/AGENTS-snippet.md · codex/AGENTS-snippet.md · cursor/AGENTS-snippet.md · grok/AGENTS-snippet.md · docs/CONVENTIONS.md · CONTRIBUTING.md · SECURITY.md · docs/AGENT-NEUTRALITY.md · docs/PLATFORMS.md · claude/CAPABILITIES.md · docs/AGENT-COMPAT.md · docs/EXTERNAL-AGENTS.md · docs/WORKTREES.md · docs/VISION.md — **no change** (pure Discovery filing; contract edits land in implementation children).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed CORE-EPIC-558 (`post-shrink-fidelity`) and closed Discovery with four serial implementation children plus the reserved `.N` audit. The shrink (CORE-EPIC-535) is treated as evidence, not source of truth: each child diffs against its pre-split SHA, then restores only what is still missing or ambiguous against current (post-unattended) process. CORE-551 / CORE-552 stay. Caps already have working margin; `.5` raises a ceiling only if restores need the room.

Technical: PLAN.md parent refined (31w) + children `.2` spec-md-fidelity (35w) · `.3` gates-unattended-fidelity (22w) · `.4` skill-runner-fidelity (31w) · `.5` budget-ceilings (33w). M unchanged at 4. Downstream: CORE-557 Leave. Doc-drift: 18/18 no change.

**Archived:** 2026-09-10
