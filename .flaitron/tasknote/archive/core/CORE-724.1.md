---
title: context-diet discovery
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-659, CORE-660, CORE-661, CORE-382, CORE-535.1]
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

# CORE-724.1 | context-diet discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Scope the `CORE-EPIC-724` epic (`context-diet`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-724.2..6` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-724.2 .. CORE-724.7 filed (M shifted 5→6) in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-724.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift); confirmed as-filed, M shift to 6 does not touch `.N`
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-724.2 .. CORE-724.7; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-724 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic
- [[CORE-659]] / [[CORE-660]] — decay-window precedent (propose a window, not a deletion)
- [[CORE-661]] — `/audit context` placeholder clearing
- [[CORE-382]] — context economy demoted from pitch to mechanism

## 🌳 Fan-out

- **Parallel:** [[CORE-724.6]] (personal-conventions-out; light overlap with .2/.3 on `SPEC/gate-postures.md` and `SPEC/layout.md`, so rebase on whichever lands first)
- **Sequential:** [[CORE-724.3]] after [[CORE-724.2]]; [[CORE-724.4]] after [[CORE-724.3]]; [[CORE-724.5]] after [[CORE-724.4]]; [[CORE-724.7]] after [[CORE-724.5]] (SPEC headings settle before the skills and paste-block cite them; the window opens after the direct cuts land)
- **Synthesis:** [[CORE-724.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator explicitly invoked `/ft-epic-discovery` after asking whether flaitron carries low-value or legacy context; multi-surface scope warrants the Discovery + Audit bracket.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A: pure PLAN filing, no code or module-boundary edit; for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Five read-only probes (cold-start SPEC, skill bodies, lazy SPEC modules, adopter surface + personal conventions, precedents + constraints), 2026-10-07. Distilled:

**Cold-start load (measured).** Flagless non-epic `/ft-task`: SKILL 29.3k + SPEC.md 47.1k + gates.md 20.5k + post-closure 8.4k + template 5.6k + tasknote/README 10.7k + PLAN ≈ 111k chars; any flag / `[unattended]` adds gate-postures 20.4k + step-0-flags 5.0k ≈ 136k. `task-line-segments.md` is consulted, not force-Read, so it is off the cold path. SPEC.md ≈ 22% rationale/history, ≈ 15% pointer summaries restating a module, ≈ 63% imperative.

**Candidate pools (raw estimates; precedent harvest ≈ 44% of projection, CORE-535.4).**

| surface | restatement | history/rationale | no-provenance (window) | personal |
|---|---|---|---|---|
| SPEC.md + gates + gate-postures + post-closure | ~20k | ~11k | ~3.4k | ~0.8k |
| skill bodies + SPEC/procedures/ft-task.md | ~30–35k cross-skill dup + ~20–25k SPEC restatement | ~4k (ft-release ~38k ID-lines, CI-bound) | ~10k (ft-audit §7/§8, DRY/SRP imperatives) | <1k |
| lazy SPEC modules | tasknote-selection §"When to use" ~7.5k; scope-boundaries ↔ SPEC; epic ↔ tasknote-inserts Fan-out; model.md ↔ PLATFORMS | cue-vocab, superseded-claims, plan-filing, procedures/README archaeology | gate-discipline empty tables; ~15/30-min heuristics | layout.md `~/code` |
| adopter surface | paste-block 6.4k (×fleet) mostly feature prose SPEC owns; tasknote-template ~3.2k rule prose (×every tasknote); README/MIGRATION/snippet visualizer ×3 | MIGRATION v4/v5 upgrade, §1.2.1/§1.2.2 maintainer sections | snippet derivation table | see below |

**Biggest single levers.** (1) Filing-commit motion re-explained at 8 skill sites (~16.5k) vs `SPEC/plan-filing.md` §"Filing commits"; (2) `[unattended]` candidacy mirrors up to 3.5k each where `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" asks for one line; (3) post-closure orchestration ×4 skills; (4) ft-task ↔ ft-micro-task shared preamble (~6.5k); (5) `SPEC/procedures/ft-task.md` re-narrating SPEC Phases 2–4 (~14.6k); (6) gates.md ↔ gate-postures.md mutual restatement (gates.md claims "none restates a row", restates three); (7) tasknote-selection routing prose (near-universal load, no budget row).

**Module verdicts.** retire/demote: `gate-discipline.md` (→ docs/GATE-DISCIPLINE.md), `purpose-blurb.md`, `procedures/README.md`. merge: Fan-out (epic.md ↔ tasknote-inserts.md). trim: tasknote-selection, model, blocked, unattended-candidacy, epic, layout, scope-boundaries, superseded-claims. keep: plan-filing (trim rationale), cue-vocabulary (kept taste; history only), plan-parser, loop, starter, versioning, fixtures.

**Personal-convention leaks.** natabula pointers in `.gitleaks.toml`, `justfile`, `brand/*`; caobunga in `.gitignore`, `SPEC/gate-postures.md:274`, `docs/HARNESS-SURVEY.md`; `/Users/fakeneuron/...` in `docs/CODEX-VERIFICATION.md`; `~/code` in ft-new-project description/example, ft-release, `SPEC/layout.md:30`; `fintown`/`invisipaw` viz test fixtures; 📡 NAS cue label; `SPEC/scope-boundaries.md:19` sibling-repo history. Legit/kept: `~/code` as env-overridable code default, "solo" product identity, upstream GitHub URL, PHILOSOPHY origin story, VERSION-HISTORY.

**Kept taste (protect).** Phase/section glyphs; 🛠️/📦 banners; 🏁 marker; 👁️ CONFIRM; 🟢 GO; 🔍; 👇; model glyphs 🔧🧩🧠🔭; 🗄️▶️📡💻✋ escalation cues; ⚡/⚠️ markers; status chips; commit-message table and per-skill messages; `Completed YYYY-MM-DD.` stub; "commit only — never push"; explicit-pathspec rule.

**Incidental drift found.** `claude/skills/ft-task/SKILL.md:81` + `ft-micro-task/SKILL.md:81` say "month-block granularity, and the two never-split rules"; `SPEC/plan-filing.md` now says row-count + one never-split rule. `gates.md:270` claims the paste-block cites its stub; `claude/AGENTS-snippet.md:23` now cites gate-postures. Paste-block carries two KEEP IN SYNC comments *inside* the fence (snippet:30-31) contradicting its own line 9. CONTEXT-BUDGET ledger stale for plan-filing (18,660 vs 19,237) and layout (5,396 vs 5,861).

**Archive precedents (load-bearing).** Moves into lazy homes work when the new home is budgeted and every citer repaired (CORE-507, 535.3, 556.2, 607, 664). Fragments defer, don't remove (CORE-507). Projections overshoot ~2× (535.4, 566). Prose compression of rules that fire unprompted had to be restored (CORE-EPIC-558: cross-repo remit, loop tasks, what flaitron does NOT provide). "History" can be anti-misreading hardening (CORE-657, CORE-393). Removal by experiment = drop trigger, record SHA, measure (CORE-659/660/680). Gate-behaviour changes are a separate filing (CORE-535.5).

**Prior declines touching this scope.** Prose-trimming SPEC.md for headroom (CORE-574.5); re-stubbing the three CORE-558.2 summaries; moving CORE-393 hardening out (CORE-657); extracting linear every-run steps (CORE-508); new always-loaded doc (CORE-194.1); validators/linters (VISION); HARNESS-SURVEY "not overkill" list (multi-runner, `[unattended]`, per-row `[model]`, four phases).

**Mechanical constraints.** CI drift: Pair Q (every `§"…"` must resolve → headings/bold-leads are the cost of any trim), A, B, C, H, J, M, N (candidacy label + `unattended-candidates:` literal), O (`auto-commit = ` sites cite §"Filing commits" + non-quiet `git diff --cached`), P, R, context-budget table. Release-only: F (park flags), I, K1, K2 (line windows), L. KEEP IN SYNC: AGENTS.md:21/35/46 ↔ snippet (two are line-number pins). EXTERNAL-AGENTS §"Stable surfaces" (versioned). AGENT-NEUTRALITY site counts need recount on moves. New modules get a budget row; lower the source cap when bytes leave.

**Resolved scoping** (AskUserQuestion, 2026-10-07):

| question | answer |
|---|---|
| Surfaces in scope | All four: cold start, skill bodies, lazy SPEC/ modules, adopter surface |
| Audience | Neutralize personal conventions out of core; keep emoji cues + commit conventions as taste |
| Risk bar | Restatements / history cut directly; no-provenance rules get a test window |
| Vehicle | This discovery epic; `/audit context` is one input |
| Epic shape | CORE-EPIC-724 `context-diet`, High, `[heavy]`, .N audit kept, M=5 → 6 (added batched window child) |
| Prior declines (CORE-574.5, CORE-558.2, labeled mirrors) | Reopen case by case; each reopened decline rides the .7 window, never a direct cut |
| Tasknote template rule prose | Box title + short imperative; detail stays in SPEC |
| 📡 NAS cue | Keep glyph, relabel "remote host" |
| No-provenance rules | One batched window child (.7), CORE-680/683 shape, one restore bar |

**M shift.** Filed estimate M=5 (.2–.6); Discovery adds .7 (batched decay window) → M=6, children .2–.7. `.N` unaffected.

**Drift check.** Cited paths in the PLAN rows and conversation resolve at HEAD `297b3fea`; drift items logged above are inputs to children, not re-interpretations of the epic.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, pure PLAN filing

**Implementation Notes:**

- Wrote 6 child rows (.2–.7) under CORE-EPIC-724, before `.N`, with a 2-space indent. Word counts: 53 / 51 / 52 / 52 / 46 / 45. All are under the 70-word hard cap; four sit slightly over the 50-word target because each names its concrete targets.
- M moved from the filed estimate of 5 to 6 (.7 added for the batched decay window). `.N` is unchanged.
- Downstream-impact scan: the rest of the active PLAN is CORE-683 and CORE-641. CORE-683's restore window on `SPEC/epic.md` overlaps .3, and .3's row already excludes it. No reconcile edit was needed.
- `[unattended]` candidacy: no candidates. .2–.5, .7 and .N are `[heavy]` (clause 1). .6 carries 📡 (clause 3).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, PLAN.md + tasknote markdown only

- [x] Ran lint/type-check on changed code — N/A, no code; markdown mental-pass done instead

- [x] **Verification receipt** — N/A: no Acceptance verify commands (all judgment); no changed code; — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — N/A: the deliverable is filed PLAN rows, not a diff to grade; — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space indent, bold IDs, `[model]` + glyph on every row, `| shortname` ≤30 chars, ` — ` separators, ≤70w, no trailing whitespace (`grep -c ' $'` → 0), no `[unattended]` written, Fan-out wikilinks match filed children.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any of the 18 AI-referenced docs (README, AGENTS, SPEC, MIGRATION, the four snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION); drift found in Discovery is routed to children .3–.6; — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A; the lesson that projections overshoot (~44% harvest) already lives in the archive and is carried into the children's scope — — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Filed CORE-EPIC-724 `context-diet` and scoped six implementation children from a five-probe inventory. They are .2 cold-start-trim, .3 lazy-module-trim, .4 skill-body-dedupe, .5 adopter-surface-trim, .6 personal-conventions-out, and .7 decay-window-batch. The `.N` audit is kept as filed.

- The measured cold start is about 111k chars flagless and about 136k with a flag.
- Most of the bloat is restatement, especially the same blocks repeated across skills. Dead rules are a small share.
- Prior harvest ran about 44% of projection, so a realistic goal is a 15–25% cold-start cut.
- Operator decisions are in the Resolved scoping table. Prior declines are reopened case by case through .7, the template keeps each box title plus a short imperative, 📡 gets a generic label, and no-provenance rules go into one batched window.
- No contract files changed in this task. `touches:` was omitted: the deliverable is the PLAN rows and this note.

**Archived:** 2026-10-07
