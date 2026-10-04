---
title: harness-value-review discovery
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-565, CORE-EPIC-558, CORE-551, CORE-553]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flowtron/PLAN.md
  - .flowtron/tasknote/CORE-565.1.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-565.1 | harness-value-review discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-565]]

## 🎯 Goal

Scope the `CORE-EPIC-565` epic (`harness-value-review`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-565.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-565.2 .. CORE-565.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-565.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-565.2 .. CORE-565.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-565 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-565]] — parent epic
- [[CORE-EPIC-558]] — predecessor: post-shrink fidelity pass (SPEC.md / gates / skill-runner / budget-ceiling checks after the v5.25 context-load diet)
- [[CORE-551]] — `--unattended` filing authority (the caobunga-facing posture this epic reviews)
- [[CORE-553]] — v5.26.0 release that shipped the unattended filing authority + CI-bound release gate

## 🌳 Fan-out

- **Sequential:** [[CORE-565.2]] · [[CORE-565.3]] after .2 · [[CORE-565.4]] after .3
- **Synthesis:** [[CORE-565.N]]

## 🧭 Deep Pre-pass

### Constitution

Hard constraints:

1. **Value to the user is the bar.** [[CORE-EPIC-558]] already checked that the contract is *complete* after the shrink. This epic asks a different question of every surface: does it earn its cost for a solo vibe coder who is the agent's only reviewer? Gaps count in both directions — missing help *and* ceremony that no longer pays for itself. "Add nothing" is a valid child outcome only with a recorded reason.
2. **Review lands as fixes, not as a report.** Each child records findings, then fixes what fits its window and files the rest as PLAN rows. No whole-contract rewrite in one child; no findings left as prose that nobody will read again (SPEC §"Deferred hand-off filing" spirit).
3. **Contract in flowtron, runtime in caobunga.** "Works optimally with caobunga" means the markdown contract caobunga reads — `[unattended]` rows, `--unattended` posture, the three run endings, `park-reason:` codes, resume, deferred filing — is complete, stable, and *verified against caobunga's actual reader and dispatcher*, and no larger than caobunga needs. It never means a caobunga adapter, dispatcher, or supervisor inside flowtron (VISION §"What we won't accept"; EXTERNAL-AGENTS §"Not an Orchestration Runtime").
4. **Verify behavioral claims against source** (CONVENTIONS §"Verify behavioral claims against flowtron's own source") — flowtron's `viz/src/parser.ts` *and*, with operator path approval, caobunga's reader. Adopter task IDs and adopter behavior stay in tasknotes, never in SPEC prose ([[CORE-533]] precedent).
5. **Preserve, don't revert.** Post-shrink features ([[CORE-551]], [[CORE-552]]) and the [[CORE-EPIC-558]] restores stay. Lazy `SPEC/` split and cite-don't-restate stay. Budgets are ceilings; a child may raise one only with the reason recorded in `docs/CONTEXT-BUDGET.md`.
6. **Agent-neutral by construction.** Contract edits land in `SPEC/`; Claude-only mechanics stay under `claude/` and are ledgered in `docs/AGENT-NEUTRALITY.md`.
7. **One cluster per child, serial.** Each child fits one context window; the `.N` audit checks the children sit together.

Invariants:

- The four phases, Relevance Assessment, Acceptance criteria, and one task per context window are the identity — they are not on the table.
- `[unattended]` (row marker, operator-written, deny-by-default) and `--unattended` (invocation posture) remain distinct.
- `park-reason:` codes remain a closed set; caobunga may branch on them exhaustively.
- Closed / Parked / Refused remain filesystem facts a caller reads from the repo, never from a transcript.
- The paper-complete guard has no unattended variant.

Out of scope:

- Editing caobunga. Findings that belong on caobunga's side are listed in the child's Final Summary for the operator to route as CBN rows.
- Visualizer / FE work.
- Adopter personal context files — that is `/ft-audit-context`.
- New workflow features that are not a fix for a gap this review surfaces.

### Specification

**Epic delivers:** a reviewed harness after the v5.25–v5.26 shrink and the `--unattended` work, judged on *value to a solo vibe coder* and on *fit with caobunga's real reader and dispatcher* — not on completeness, which [[CORE-EPIC-558]] already checked. Each child records findings against a stated bar, fixes what fits its window, and files the rest as PLAN rows. The bar is `docs/VISION.md` §"Who it's for" plus friction visible in the archive; no external benchmark.

**Shared review shape (every implementation child):** for each in-scope surface record (a) what it costs the user (context bytes, gates, cues, steps), (b) what it earns them (a caught mistake, a preserved decision, a resumable run), (c) verdict keep / trim / fix / file, with a one-line reason. "Keep everything" is a legal outcome only with those three columns filled.

**CORE-565.2 — attended lifecycle value.** WHAT: the run of *one* task by a present operator — `/ft-task` cold start through 🏁 — earns its ceremony. Surfaces: the always-loaded set (`SPEC.md`, the skill body, `AGENTS.md` snippet, template, tasknote README), the Phase 1 checklist, the gate ladder and cue vocabulary, the post-closure protocol, and the fast paths (`/ft-micro-task`, `/ft-file-followup --park`, `--fast`). Acceptance: a measured cold-start cost per runner; each gate and cue named with what mistake it catches; a keep / trim / fix verdict per surface; fixes landed or filed. Interacts with: first child; `.4` reuses its cost table for the roster verdicts.

**CORE-565.3 — caobunga contract fit.** WHAT: the contract caobunga actually consumes is declared, verified, and no larger than needed. Verified against `~/Code/caobunga/backend/caobunga/{flowtron/*,loop.py,close.py}` (read-only, operator-approved). Known coupling to check: capability probes (`ft-task/unattended-mode.md` presence + `--unattended` token in two skill bodies — undeclared as stable); the `in-progress` continue prompt versus EXTERNAL-AGENTS step 6's `interrupted` annotation (caobunga writes none); `[handoff]` extra token and `**Suggested next task:**` line caobunga parses but flowtron never specified; `Blocked by` resolution against PLAN.md only, so a `## Completed` row rotated to `PLAN-ARCHIVE.md` may keep a blocker denied; reader hooks on `**Final Summary:**`, `**Verdict:** De-scope`, `### Follow-up…`, frontmatter `status:` / `park-reason:`; task-line grammar parity with `viz/src/parser.ts`. Acceptance: a caller-facing stability list in `docs/EXTERNAL-AGENTS.md` (or its named home) naming every surface a caller may rely on; each mismatch above resolved on flowtron's side or listed for CBN routing in the Final Summary; no adopter IDs in SPEC prose. Interacts with: independent of `.2`; runs second so `.N` can check the two verdict tables agree.

**CORE-565.4 — roster and onboarding value.** WHAT: the shipped skill roster and the first-contact path earn their keep. Surfaces: the nineteen `ft-*` skills (keep / merge / demote-to-doc per skill, using `.2`'s cost table), `README.md` Quickstart → `/ft-new-project` → first `/ft-task`, `docs/MIGRATION.md`, `/ft-flowtron`'s info screen, and the adopter snippet roster. Acceptance: a verdict per skill with the archive evidence (last real use, adopter uptake) behind it; onboarding walked as a new adopter would, gaps fixed or filed; `claude/AGENTS-snippet.md` and the SPEC roster still agree (Pair K). Interacts with: after `.2`; a demote verdict is filed, not executed, unless it fits the window.

**CORE-565.N — audit.** Unchanged from filing: final-subtask audit per `SPEC/epic.md` (fixed doc-drift sweep). Also checks the three verdict tables use the same bar and that no `.3` contract declaration contradicts a `.2` trim.

### Clarifications

Resolved 2026-09-10:

| # | Question | Resolution |
|---|---|---|
| Q0 | Mode / inputs (Step 2) | `--deep`; area CORE; shortname `harness-value-review`; High; `[heavy]`; M=3 + `.N` audit. |
| Q1 | Contract owner on flowtron ↔ caobunga disagreement | **Flowtron declares, caobunga adapts.** `.3` specifies an extension upstream only when it shows real value; otherwise declares it out-of-contract and lists it for CBN cleanup. Per-item judgment, default declare-and-list. |
| Q2 | Trim authority in `.2` / `.4` | **Prose trims in-window; skill removals filed.** Removing, merging, or demoting a whole skill is its own PLAN row (changes adopter rosters; needs a release). |
| Q3 | Routing caobunga-side findings | **Ready-to-paste CBN rows in `.3`'s Final Summary.** Flowtron never writes into caobunga; the operator pastes from caobunga's own session. |
| Q4 | Fan-out | **All sequential** `.2` → `.3` → `.4`; `.N` synthesis. No worktrees. |
| Q5 | caobunga read scope | **`~/Code/caobunga/backend/caobunga/` + `~/Code/caobunga/.flowtron/`**, read-only, one `ls` level then named files. `docs/CONTRACT.md` there is *not* approved; `.3` asks before opening it. |
| Q6 | Benchmark | **Own vision + usage only.** No external harness comparison; the bar is `docs/VISION.md` §"Who it's for" plus archive friction. |
| Q7 | Usage evidence for `.4` (assumed, not asked) | Flowtron's own archive + caobunga's `.flowtron/PLAN.md`. No fleet-wide adopter walk — path access is per-name. |

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-epic-discovery --deep` after the v5.25–v5.26 shrink + `--unattended` work. [[CORE-EPIC-558]] checked contract *completeness*; nobody has yet judged *value to the user* or verified the caller contract against caobunga's actual reader — and the first cross-repo read (Q5) surfaced five concrete mismatches, so the epic has real findings before its first child fires.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract + skill prose; the one boundary that matters (contract in flowtron, runtime in caobunga) is locked in the Constitution. Original text: for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Surface inventory (HEAD 2026-09-10, chars)

| Surface | Now | Cap / note |
|---|---|---|
| `SPEC.md` | 55,895 | 57,000 — [[CORE-558.N]] measured 51,566 one day ago; CORE-557/559/562/564 added ~4.3k. **Headroom 1,105 — below one working unit again.** `.2` records this; a raise or trim is that child's call. |
| `claude/skills/ft-task/SKILL.md` | 30,861 | 33,000 |
| `AGENTS.md` · template · tasknote README · `claude/AGENTS-snippet.md` | 6,816 · 5,592 · 8,623 · 15,884 | unbudgeted always-loaded / adopter surfaces |
| Cold start for one `/ft-task` (SPEC + skill + AGENTS + template + README) | ≈107,800 | ≈27k tokens before the task's own files — `.2`'s measured baseline |
| `SPEC/gates.md` · `cue-vocabulary.md` · `gate-discipline.md` | 35,936 · 15,138 · 15,386 | per-task in practice |
| `ft-task/unattended-mode.md` | 13,811 | **caobunga probes this path's existence** (`layout.supports_unattended`) |
| `docs/EXTERNAL-AGENTS.md` | 15,299 | the caller contract; `.3`'s primary edit target |
| `README.md` · `docs/MIGRATION.md` | 17,038 · 56,676 | `.4` onboarding path |
| Shipped skills | 19 bodies, 339,107 total | `.4` roster verdicts |

### B. Archive skim

Path greps return hundreds of notes (`docs/MIGRATION.md` 563, `claude/AGENTS-snippet.md` 389, `EXTERNAL-AGENTS` + `unattended-mode` 170) — probe clause applies; the load-bearing subset was read directly:

- [[CORE-558.1]] / [[CORE-558.N]] — the `--deep` precedent and the immediately preceding review. Audit verdict: shrink cost "barely, and always in the same narrow way" (a bound or qualifier lost while the rule survived). One open filing: `SPEC.md`'s fourth VISION mirror is absent from Pair K's roster. Not re-done here; this epic's bar is value, not completeness.
- [[CORE-494]] — `[unattended]` marker upstreamed from caobunga `CBN-EPIC-17.2`'s reference reader; deny-by-default; flowtron never writes the marker. Established the "adopter reader is the consumer" stance and the no-viz-chip decision.
- [[CORE-533]] / [[CORE-534]] — narrowed the caobunga-filed CORE-527..531 batch; adopter IDs stay out of SPEC prose; `docs/CONVENTIONS.md` §"Verify behavioral claims against flowtron's own source" is the rule `.3` applies in both directions.
- [[CORE-551]] / [[CORE-552]] — unattended filing authority; `/ft-epic-discovery` refuses the flag. CORE-551 explicitly *assumed* caobunga's need because the path was unapproved — Q5 now closes that gap.
- [[CORE-502]] — glyph-then-marker ordering footgun; caobunga's `seeded_line` and `unparsed_plan_rows` are built around it.

### C. Drift check

- PLAN.md parent + `.1` + `.N` match the locked inputs (single cohort; no duplicate block this time).
- Every heading the pre-pass cites resolves at HEAD: `SPEC/blocked.md` §"Resuming an interrupted run" (:84), `SPEC.md` §"Deferred hand-off filing" (:607), `claude/AGENTS-snippet.md` §"One-time symlink wiring" (:65), `docs/CONVENTIONS.md` §"Verify behavioral claims…" (:75), `/ft-release` §7.1 Pair K.
- `ft-task/SKILL.md:124` refuses any non-starter `status:` — matches caobunga's "that skill is start-only" prose and is *why* caobunga bypasses the skill on continue (`.3` item).
- caobunga facts verified in source, not recalled (`.3` seeds): `layout.py:35-84` probes `unattended-mode.md` presence + `--unattended` token in two SKILL.md bodies; `loop.py:203-240` sends a prose continue for `in-progress` notes and greps show **no** `interrupted` write anywhere; `grammar.py:34` `HANDOFF_MARKER`, `:66` `SUGGESTED_NEXT` — neither exists in `SPEC.md` / `parser.ts`; `selection.py:52` resolves blockers against checked PLAN rows only (rotation to `PLAN-ARCHIVE.md` unread); `close.py` hooks `**Final Summary:**`, `**Verdict:** De-scope`, `^### Follow-ups?`, frontmatter `status:` / `park-reason:`; `tasknote.py:22` open statuses = SPEC's set minus `completed` (in sync).
- No SPEC contradiction: value review + fixes is what VISION §"Who it's for" asks; Q1 keeps flowtron the contract owner.

### D. Clarifications

Resolved during deep pre-pass — see `## 🧭 Deep Pre-pass` §Clarifications (Q0–Q7). Phase 1 adds only shortnames.

### E. Resolved scoping (child lines)

M stays **3**. Audit `.N` confirmed as-filed (its spec addendum — one bar across three verdict tables — rides the tasknote, not the PLAN line).

| ID | Shortname | wc | Long description (draft) |
|---|---|---|---|
| CORE-565.2 | lifecycle-value | see Phase 2 | Review one attended `/ft-task` run, cold start → 🏁, for value to a solo vibe coder: measure cold-start cost per runner, name the mistake each gate and cue catches, verdict keep / trim / fix per surface incl. the fast paths. Prose trims land in-window; larger cuts filed. Note SPEC.md headroom (1,105). |
| CORE-565.3 | caobunga-contract-fit | see Phase 2 | Verify the caller contract against caobunga's reader/dispatcher (approved read-only paths). Declare capability-probe surfaces stable in docs/EXTERNAL-AGENTS.md; resolve in-progress continue vs `interrupted`, `[handoff]` / suggested-next tokens, PLAN-ARCHIVE blocker resolution, Final Summary / Verdict / Follow-up hooks, grammar parity. Flowtron declares; CBN rows in Final Summary. |
| CORE-565.4 | roster-onboarding-value | see Phase 2 | Verdict per shipped ft-* skill (keep / merge / demote, archive evidence) using .2's cost table; walk README Quickstart → /ft-new-project → first /ft-task, docs/MIGRATION.md, /ft-flowtron as a new adopter; fix or file gaps; snippet and SPEC rosters agree (Pair K). Skill removals filed, not executed. |

Fan-out (Phase 2 fill): Sequential `.2` → `.3` → `.4`; Synthesis `.N`; no Parallel (Q4).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: CORE-EPIC-558 cohort shape (2-space indent, `[heavy]🧠` on every line, ` — ` separator). Minimal refactor gate: N/A — PLAN prose only.
- 3 child lines written between `.1` and `.N`. Word counts (long description): `.2` 56 · `.3` 51 · `.4` 48 — all under the 70w cap; `.2` and `.3` just over the 50w target by design (each names its verified seeds so the child needs no re-discovery).
- M unchanged from filing (3). `.N` untouched.
- Downstream-impact scan: every other priority section is `(none)` — **no downstream impact**.
- Fan-out filled: Sequential `.2` → `.3` → `.4`, Synthesis `.N`, no Parallel (Q4).
- Tests: N/A (no code surface).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown mental-pass on the PLAN block: 2-space child indent on all three new lines; bold IDs intact; `[heavy]🧠` present; shortnames 15 / 21 / 23 chars; ` — ` separator consistent; no trailing whitespace; `.N` still last. Fan-out wikilinks match the filed children. Verification receipt: `grep -c 'CORE-565' .flowtron/PLAN.md → 5` (.1 + .2 + .3 + .4 + .N; the parent ID is `CORE-EPIC-565`); no test / lint / frontend surface — N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed `CORE-EPIC-565` (`harness-value-review`) and closed its Discovery with three scoped children. The epic asks a question [[CORE-EPIC-558]] did not: not "is the contract complete after the shrink" but "does each surface earn its cost for a solo vibe coder, and does the caller contract match what caobunga actually does". The `--deep` pre-pass locked a Constitution (value is the bar; contract in flowtron, runtime in caobunga; verify claims against source; preserve, don't revert), a per-child Specification, and eight resolved clarifications.

The first operator-approved read of caobunga's source (`backend/caobunga/{flowtron/*,loop.py,close.py}`) surfaced five concrete mismatches before any child fired, all seeded into `.3`: capability probes keyed on an undeclared skill-fragment path; a prose continue for stranded `in-progress` notes where the contract expects an `interrupted` annotation caobunga never writes; `[handoff]` and `**Suggested next task:**` parsed but never specified; blocker resolution blind to `PLAN-ARCHIVE.md` rotation; four reader hooks on tasknote prose nobody has declared stable. A second finding for `.2`: `SPEC.md` is at 55,895 / 57,000 one day after [[CORE-558.5]]'s raise.

**Doc-drift sweep:** 17 / 17 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs" — no change (pure PLAN filing; contract edits land in the children).

**Evidence.** 2 files: `.flowtron/PLAN.md` (+6 lines, one cohort under `## High`) and this tasknote (scaffold → archive). Child long descriptions 56 / 51 / 48 words, all under the 70w cap. M unchanged at 3; `.N` as filed. No downstream impact (every other section was `(none)`). `touches:` reconciliation: declared `PLAN.md` + this note; `git diff --name-only` shows exactly those two paths.

**Archived:** 2026-09-10
