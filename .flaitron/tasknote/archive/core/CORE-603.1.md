---
title: skill-roster-diet discovery
status: completed
tags: []
created: 2026-09-17
due:
related-tasks: [CORE-EPIC-603]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flowtron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-603.1 | skill-roster-diet discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-603]]

## 🎯 Goal

Scope the `CORE-EPIC-603` epic (`skill-roster-diet`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-603.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (skill dirs, command/codex wrappers, roster mention sites, adopter wiring, SPEC contract impact, CONTEXT-BUDGET rows) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-603.2 .. CORE-603.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-603.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [x] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (skill dirs, wrappers, roster mention sites, adopter-wiring surfaces, SPEC contract impact, CONTEXT-BUDGET) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents (prior skill retirements / folds, CORE-EPIC-535 context-load-diet) — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-603.2 .. CORE-603.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-603 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-603]] — parent epic
- [[CORE-EPIC-535]] — context-load-diet precedent (always-on context byte reduction)

## 🌳 Fan-out

- **Sequential:** [[CORE-603.2]] first; [[CORE-603.3]] after [[CORE-603.2]]; [[CORE-603.4]] after [[CORE-603.3]] — all three edit the same roster sites, and `.4` trims `ft-audit`'s description after `.3` adds the `context` token
- **Synthesis:** [[CORE-603.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator asked whether the bundled roster carries "skill bloat"; a fleet usage survey (2026-09-17, 21 adopter repos) found three skills with ≤7 referencing tasknote files across the whole fleet and ~9.6 KB of always-on frontmatter descriptions per session. Operator confirmed epic scope with three implementation children.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A for the Discovery itself (PLAN.md filing only); the children's boundary concerns are logged under "Shared design surface" in Discovery Notes

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Fleet usage survey (2026-09-17).** Tasknote files referencing each skill across the 21 adopter repos under `~/Code` (READMEs and the submodule excluded): ft-file-followup 493 / ft-close-epic 399 / ft-epic-discovery 295 / ft-task 239 / ft-audit 47 / ft-update 39 / ft-refactor 29 / ft-micro-task 16 / ft-audit-repo 15 / ft-new-project 15 / **ft-stats 7 (4 repos; only flowtron ever wrote `STATS.md`, and it is untracked)** / **ft-audit-context 5 (4 repos)** / **ft-flowtron 3 (3 repos)**. Always-on cost is the `description:` frontmatter alone — 9,606 bytes across 14 skills; the seven skills above 700 chars (ft-file-followup 1,328 · ft-task 1,313 · ft-audit 960 · ft-close-epic 804 · ft-refactor 760 · ft-micro-task 759 · ft-epic-discovery 714) carry 6,638 of them.

**Shared design surface.**

- *Three shipped paths per skill* — `claude/skills/<s>/`, `claude/commands/<s>.md`, `codex/skills/<s>/SKILL.md` (Codex wrappers are real files, not symlinks).
- *Roster mention sites* (from `git grep`, tasknotes excluded): `AGENTS.md`, the four `AGENTS-snippet.md` (claude/codex/cursor/grok), `SPEC/layout.md` §"Skill namespace" (+ the `STATS.md` tree line at :20), `docs/MIGRATION.md` §1.0 global-utilities table + §1.2 + §1.7 + §3.8 recommendations, `docs/PLATFORMS.md` installed-surface table, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/CONTEXT-BUDGET.md` ledger, `claude/skills/ft-update/SKILL.md`, `claude/skills/ft-new-project/SKILL.md` (ft-audit-context recommendation), `claude/skills/ft-release/step-7.1-standing-checks.md` (global-only classification list + the `grep -Ev` exclusion at :49), `claude/skills/ft-release/step-7.1-mirror-pairs.md`.
- *Release/CI guards that name `ft-flowtron`* — **Pair A** (templates roster; `ft-flowtron` is one of three files, `.github/workflows/ci.yml:114`) and **Pair E** (`ft-flowtron` roster ↔ shipped skills + flags; `ci.yml:137-150` and mirror-pairs.md:52-80), plus Pair F's file list (:88) and Pair J's cascade note (:308). Operator decision: **delete Pair E** rather than re-point — the drift class it guards disappears with the screen.
- *SPEC rationale clauses that cite `ft-stats`* — `SPEC/model.md:18,143,158` (token vocabulary "feeds `/ft-stats` buckets") and `SPEC/plan-filing.md:224,236` (rotation "loses nothing" for the aggregates). The `[model]` field and rotation contract stand; only the ft-stats-as-consumer wording is rewritten.
- *`ft-audit` domain switch* — `claude/skills/ft-audit/SKILL.md` §1 step 1 lists the seven domain tokens; each domain is a `passes/<domain>.md` sibling (pass definitions, severity guide, scope/rubric hints, attribution slug, specialist additions). `/ft-update` already refreshes filled adopter forks with newly shipped pass files without clobbering rubrics, so a new `passes/context.md` reaches forks on the next bump. `SPEC/unattended-candidacy.md:176` names `/ft-audit-context` §5 as a write-confirm ask surface.
- *Description-trim constraints* — **Pair B** requires every `--flag` in a Claude `description:` to appear in the Codex twin's `description:` (and vice versa); **Pair J** requires every `argument-hint:` flag in `claude/commands/<s>.md` to have a description clause in house shape. So the floor is trigger sentence + one clause per flag; everything else (SPEC pointers, thresholds, compare-with prose) moves to the body.

**Archive skim.** `archive/core/` (per the README table). Load-bearing precedents: **[[CORE-571]] / [[CORE-572]] / [[CORE-573]]** (v5.27.0) established the *retire-and-record (demote)* shape — delete the three shipped paths, sweep every roster site, add a row to `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" naming the replacement, verify with a `git grep` residue check whose exclusion list names the history clauses that may keep the slug; their A2–A9 acceptance lines are the template for `.2` and `.3`. **[[CORE-EPIC-535]]** (context-load-diet) is the byte-budget precedent — `docs/CONTEXT-BUDGET.md` is left for the release re-measure, not edited per child. CORE-420.3 / CORE-433.2 / CORE-475 are the drift incidents that minted Pairs B, F, J — the constraints on `.4`.

**Drift check.** All paths cited above exist at HEAD (`git status` clean at start; SPEC v5.28.0). No SPEC contract is contradicted: `SPEC/epic.md` "simpler implementations don't need the bracket" — the bracket is kept deliberately because retirement touches 15+ roster sites and the adopter release surface.

**Resolved scoping.**

| Question | Answer |
|---|---|
| Children | (.2) retire `ft-flowtron` + `ft-stats`; (.3) fold `ft-audit-context` into `ft-audit`; (.4) trim descriptions. `ft-release` diet explicitly **out** — its own `/ft-refactor` later. |
| Priority / model | Medium; parent + `.1` / `.N` `[heavy]🧠`; `.2` + `.4` `[light]🔧`; `.3` `[medium]🧩` |
| Audit `.N` | Kept |
| Fold shape | `passes/context.md` domain under `ft-audit`'s normal contract (ticket-writing, fork-refreshed via `/ft-update`); standalone skill retired with a MIGRATION row |
| Trim floor | Trigger + flags only, ≤400 chars, the seven skills >700 chars; Codex twins in lockstep; Pairs B + J must print nothing |
| Pair E | Delete (not re-point) |
| Ordering | Sequential `.2 → .3 → .4` — all three edit the same roster sites and `.4` edits `ft-audit`'s description after `.3` adds the `context` token |


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — N/A (PLAN.md filing only).   refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no executable surface)

**Implementation Notes:**

Pattern: CORE-EPIC-556 / FE-EPIC-106 cohort shape (2-space indent, `[model]` glyph on every row, `.N` terminal). Three child lines written directly under `.1`, before `.N`: `.2` 45w · `.3` 36w · `.4` 47w (all ≤50w target). M unchanged from the filing-time estimate (3). Downstream-impact scan: PLAN carries no other open rows — **no downstream impact**. `[unattended]` candidacy: `.2` trips the clause-3 keyword screen (`MIGRATION`), so `.3` and `.4` fail clause 6 behind it and `.N` fails clause 1 (`[heavy]`) — **no candidates**, no review prompt. Fan-out filled: all sequential, `.N` synthesis.


## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only)

- [x] Ran lint/type-check on changed code — `git diff --check` → 0

- [x] **Verification receipt** — see Testing Notes.   recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the PLAN.md block: 2-space child indent on `.2`–`.4`; bold IDs intact; `[model]` + glyph on every row; no `[unattended]` on any row (none confirmed); `| shortname` ≤30 chars (`retire-flowtron-stats` 21, `audit-context-fold` 18, `skill-description-trim` 22); em-dash separators consistent; word counts 45/36/47 (≤70w cap); `git diff --check` → 0. Fan-out wikilinks match the filed children.


## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 18 entries "no change": pure Discovery filing; every roster/contract edit lands inside `.2`–`.4`.   for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Filed `CORE-EPIC-603` (skill-roster-diet) and closed its Discovery: three implementation children scoped from a fleet usage survey that found `ft-flowtron` (3 referencing files), `ft-stats` (7), and `ft-audit-context` (5) as the roster's dead weight, and 9.6 KB of always-on `description:` frontmatter as the per-session tax. `ft-release`'s 115 KB body was explicitly excluded — its own `/ft-refactor` later.

- **Files:** `.flowtron/PLAN.md` (+6 lines under `## Medium`: parent, `.1`, `.2`–`.4`, `.N`), this tasknote (scaffolded + archived).
- **Children:** `.2` retire `ft-flowtron` + `ft-stats` `[light]🔧` 45w · `.3` fold `ft-audit-context` → `passes/context.md` `[medium]🧩` 36w · `.4` trim seven descriptions to ≤400 chars `[light]🔧` 47w. Sequential `.2 → .3 → .4`, `.N` synthesis.
- **Decisions (operator-confirmed):** fold as a pass file under `ft-audit`'s ticket-writing contract (not demote outright); trim floor = trigger + flags, seven skills >700 chars; delete CI/release Pair E rather than re-point it.
- **Precedents:** CORE-571/572/573 retire-and-record shape (delete three paths, roster sweep, MIGRATION row, `git grep` residue check) is the `.2`/`.3` template; CORE-EPIC-535 governs the byte-ledger handling (`CONTEXT-BUDGET.md` re-measured at release, not per child).
- **Verification:** word counts 45/36/47; `git diff --check` → 0; no `[unattended]` candidates; no downstream impact.
- **`touches:` reconciliation:** declared `.flowtron/PLAN.md`; changed `.flowtron/PLAN.md` + this note. No undeclared paths.
- **Documentation:** doc-drift sweep 18/18 "no change".

**Archived:** 2026-09-17
