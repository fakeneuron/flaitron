---
title: skill-body-dedupe
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-724.2, CORE-724.3, CORE-724.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-file-followup/starter-mode.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-seed/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-task/unattended-mode.md
blocked-by:
  - CORE-724.3
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-724.4 | skill-body-dedupe

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Replace restated contract prose in `claude/skills/` and `SPEC/procedures/ft-task.md` with citations to its canonical SPEC home (filing-commit motion, candidacy mirrors, post-closure blocks, the ft-task/ft-micro-task shared preamble, Phase 4 re-listings), keeping Pair N/O literals and flag names, and fix the stale month-block line.

## ✅ Acceptance

- [x] Filing-commit motion: all 8 sites (ft-file-followup default / park / starter, ft-audit, ft-audit-repo, ft-refactor, ft-epic-discovery, ft-seed) carry a one-line pre-check pointer, their pathspecs + message fence, and a **Post-stage verification** line naming only their own recognized hunks + the §"Filing commits" pointer; none restates the accumulated-filings line test — `! grep -rq 'every added line a task row or blank' claude/skills` + Pair O
- [x] Candidacy mirrors cut to one labeled paragraph each: branch taken + surface rows / clause-6 specifics. The generic predicate prose is not restated — `! grep -rq 'Every clause must hold' claude/skills` + Pair N
- [x] Post-closure blocks (ft-task Step 6, ft-micro-task Step 5, ft-epic-discovery Step 10, ft-close-epic Step 9) cite `SPEC/post-closure.md` steps 1–3 and keep only skill-specific deltas (commit message, parent-flip bundle, 🟢 GO shape, next-move branches) — `! grep -q 'trailing period' claude/skills/ft-close-epic/SKILL.md` + `judgment` (diff read)
- [x] Shared preamble lives once in `claude/skills/ft-task/preamble.md` (layout pick, status gate, row marker, 🎯 blurb, the two advisories, pre-flight, model gate); both SKILLs Read it and keep only their deltas — `grep -c 'Route on a verified tier' claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md claude/skills/ft-task/preamble.md` → 0/0/1
- [x] Phase 4 re-listings: rationale restatements cut (ft-micro-task's trailing three-flips paragraph, the SOP's chip/write-once rationale). The explicit op sequences stay, and so do the nav-chip bullets in ft-epic-discovery / ft-close-epic (CORE-393 / CORE-535.4) and every executable pre-move gate — `grep -c 'status: completed' <file>` unchanged per file + `grep -c 'nav chip'` on the two epic skills ≥1 + `judgment`
- [x] SOP drift-carve-out restatement (left by .2) reduced to a pointer — `judgment` (diff read of SOP §4 exit)
- [x] Stale month-block line fixed at all three sites — `! grep -rq 'month-block granularity' claude`
- [x] Combined size of the 12 touched skill/SOP files plus the new fragment drops from 258,037 to ≤ 243,000 chars — `wc -c … | tail -1`
- [x] Pair N/O literals, flag literals and every Pair Q-cited heading / bold lead kept; CI drift job green; release Pairs F, K1, K2 print nothing — `node <scratchpad>/drift.cjs` → 0 + the F/K snippets
- [x] `preamble.md` carries its own §"Budgets" row, and the ledger's "`ft-task`'s fragments are genuinely branch-gated" line names it as the one every-run fragment. Extraction is single-sourcing, not cap-gaming (CORE-507 §2.5) — CI `Context budget` + `grep -q 'claude/skills/ft-task/preamble.md' docs/CONTEXT-BUDGET.md`
- [x] CONTEXT-BUDGET: `SPEC/procedures/ft-task.md` cap lowered to new size + its stated units; glob `SKILL.md` row re-justified/lowered against the new largest body; cap-history rows appended — CI `Context budget` step + `judgment` on arithmetic

## 🧩 Subtasks

- [x] Preamble: write `claude/skills/ft-task/preamble.md` from the identical ft-task/ft-micro-task blocks (fixing month-block); replace both SKILL Step 1/1.5 with a Read + skill-specific deltas; list it in both Step 0 path blocks
- [x] Filing-commit motion: compress the 8 sites to pre-check pointer + fence + recognized-hunk line + pointer, keeping each site's unique facts (audit-repo `??`, seed token-write ordering, park authorization, epic-discovery Step 10 fallback, followup unattended convergence)
- [x] Candidacy mirrors: compress the 6 mirrors (followup, audit, audit-repo, refactor, epic-discovery, seed) to labeled one-paragraph form
- [x] Post-closure blocks: compress the 4 skill blocks to pointer + deltas; ft-close-epic's copy-paste restatement → pointer
- [x] Phase 4 re-listings: ft-task, ft-micro-task, ft-epic-discovery, ft-close-epic, SOP step 5 → pointer + executable gate; SOP §4 drift carve-out → pointer
- [x] ft-close-epic:60 month-block fix; Pair O catalogue wording if it says runners "restate"
- [x] CONTEXT-BUDGET caps + history; AGENT-NEUTRALITY recount if a counted site moved
- [x] Phase 3: drift.cjs, Pair F/K1/K2, size total, greps, `git diff --check`, /code-review medium

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic
- [[CORE-724.1]] — Discovery (inventory of the five levers)
- [[CORE-724.3]] — blocked-by: SPEC headings settle before skills cite them
- [[CORE-724.5]] — follow-up: adopter surface cites what this child settles

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All five levers are real and in scope. The archive narrows lever 5 (Phase 4 re-listings) to rationale-only cuts per CORE-393 / CORE-535.4, and adds a budget row for the every-run preamble fragment. The PLAN row's wording ("Phase 4 re-listings") still holds, so this is an approach change inside the filed scope, not a Re-scope.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — Markdown contract surfaces only. The responsibility split is SPEC owns the rule, skill bodies own the executable delta, and the shared fragment is owned by /ft-task (dependency one-way: skill → fragment → SPEC); — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Scope as filed, checked at HEAD `1acae204`.** All five levers are present.

| lever | sites | baseline |
|---|---|---|
| Filing-commit motion vs `SPEC/plan-filing.md` §"Filing commits" | ft-file-followup SKILL Step 4 items 1/4 (+ unattended ¶), park-mode P4 items 1/5, starter-mode S4 item 5, ft-audit §5 items 2/5, ft-audit-repo §6, ft-refactor Step 5/6, ft-epic-discovery Step 4, ft-seed Step 4 | each restates the index/porcelain/accumulated-filings classification and the post-stage rationale (why the read closes the window, no `--only`) |
| Candidacy mirrors vs `SPEC/unattended-candidacy.md` | ft-file-followup Step 3, ft-audit §4, ft-audit-repo §6, ft-refactor Step 3, ft-epic-discovery Step 7, ft-seed Step 2 | each restates "every clause must hold / uncertain → not a candidate", "proposed, never seeded", "Flaitron never writes" — module §"Candidacy predicate" + §"Recommend, never write" |
| Post-closure blocks vs `SPEC/post-closure.md` | ft-task Step 6, ft-micro-task Step 5, ft-epic-discovery Step 10, ft-close-epic Step 9 (re-states step 3's copy-paste shape in full) | |
| ft-task ↔ ft-micro-task preamble | Step 1 capture, status gate, row marker, blurb, both advisories, Step 1.5, pre-flight | ~9k duplicated |
| Phase 4 re-listings vs SPEC §"🚀 Phase 4: Closure" | ft-task Step 5, ft-micro-task Step 4, ft-epic-discovery Step 9, ft-close-epic Step 7, SOP step 5 | nav-chip retirement note, write-once rationale, tick-through rules restated |

Baseline bytes of the 12 files: 258,037. Drift job 15/15 green at start.

**Mechanical constraints.** Pair O fires on the `auto-commit = ` literal: each runner needs a non-`--quiet` `git diff --cached` line + a path-bearing `SPEC/….md` §"Filing commits" citation. The Pair O catalogue asks for the fence + a **Post-stage verification** paragraph (`starter-mode.md` shape). Pair N fires on naming the module: each file needs the `unattended-candidates:` literal + the `mirror of \`SPEC/unattended-candidacy.md\` §"…"` label. Pair Q: every `§"…"` must resolve (bare `preamble.md` resolves from the citing dir). Pairs B/J/M read `description:` / `argument-hint:` only — skill bodies' flag prose is free. K2 does not touch skills. No external citer quotes the preamble's bold leads (git grep).

**Drift found.** (1) `month-block granularity … two never-split rules` at ft-task:81, ft-micro-task:81, ft-close-epic:60. `SPEC/plan-filing.md` now says row-count granularity + one never-split-a-cohort rule. (2) The two preamble copies disagree on order: ft-task gates the model (1.5) *before* pre-flight (2), ft-micro-task runs pre-flight first. `unattended-mode.md` §"Pre-scaffold stops" says the model-mismatch park happens when "the tree is known clean (the foreign-dirt gate already passed)", which holds only for micro. Decision: keep each skill's own order. The fragment has three callable sections, so no behaviour changes. The ft-task ordering gap is pre-existing; noted for .N, not fixed here. (3) ft-micro-task's grammar line was missing `[unattended] [handoff]`, and its capture list was missing `[!critical]`. The shared fragment carries the full form.

**Resolved scoping** (AskUserQuestion, 2026-10-07):

| question | answer |
|---|---|
| Preamble dedupe | Shared fragment `claude/skills/ft-task/preamble.md`, owned by /ft-task, Read every run by both. CORE-508's decline was size-motivated within one skill ("costs a Read for the same tokens"); this is cross-skill single-sourcing, so the decline is not reopened |
| SOP depth | Phase 4 re-listing + the .2-deferred drift carve-out → pointers; Phase 2–3 mode narration stays (contract-only agents' unattended safety net) |

**Archive skim** (probe, ~25 notes). Constraints adopted:
- *Fragments* (CORE-042.9/400/473.4/508/558.4). H1 + back-ref header, `<root>`-prefixed path declared in Step 0 as `<PREAMBLE>`, and a `<SKILL>` placeholder. Step headings stay in SKILL.md so citations resolve. The fragment points at the contract and never restates it. CORE-558.4's restored "**Route on a verified tier, not an impression.**" moves verbatim into the fragment, which both runners Read on every run (it is not skippable, so CORE-468/661's "reader who skipped the fragment" case does not arise). CORE-038/049 + 535.4 keep the branch→action dispatch verbatim, and it is.
- *Budget* (CORE-507 §2.5, CONTEXT-BUDGET ledger). An every-run fragment breaks the "ft-task fragments are branch-gated" premise. So `preamble.md` gets its own budget row, the ledger names it, and the ft-task body cap is not lowered on the strength of bytes that only moved.
- *Filing motion* (CORE-563/591/593/594/717). Each runner keeps its own pathspecs, skip-report location, `git diff --cached --quiet` in its pre-check, a fence with a non-quiet `git diff --cached`, its recognized-hunk set, and a path-bearing §"Filing commits" citation. ft-audit keeps its inline-fix sentence. CORE-717 said "no change" because restating the *steps* is the Pair O design: the fence + recognized hunks stay, and only the re-explained classification and rationale go. The PLAN row (filed after .1 weighed this) names exactly that target.
- *Candidacy* (CORE-577.2/.4/.5, 661). One-line labeled mirror, label on a single line, `unattended-candidates:` literal even on attended-only surfaces. Trim, never drop.
- *Post-closure* (CORE-607/189). Every runner's final step still Reads `SPEC/post-closure.md`, and nothing earlier Reads it.
- *Phase 4* (CORE-393, CORE-535.4 §B, CORE-657). The explicit closure-op fan-out in epic-discovery Step 9 / close-epic Step 7 / micro Step 4 is the established shape, not duplication. Keep the nav-chip bullets in both epic skills, and keep branches, literal markers, file Reads, per-skill flag interactions and step refs. → **Lever 5 narrowed:** cut only rationale restatements, not the op sequences.
- *Process.* No prior decline is reopened. Phase 4 narrows to respect CORE-393, and the filing motion stays inside CORE-717's Pair O design.

**Sequencing note.** The preamble fragment and the SOP drift-carve-out pointer were written before this skim returned. Both were re-checked against it and conform: header shape, `<PREAMBLE>` binding, verbatim dispatch, Pair Q.

**Assumptions.** Each runner keeps its message fence, its own pathspecs, and its recognized-hunk list. Those facts differ per surface, and Pair O needs them. Keep each surface's unique facts: audit-repo's untracked-`??` → false, seed's token-write ordering vs pre-check, park's invocation-as-authorization, epic-discovery's Step 10 fallback, and followup's unattended convergence. The SOP's `last-verified:` stays put, since this is a partial re-check (README §"Frontmatter schema": bump only on a re-check against the watched surfaces).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown contract prose; the CI drift pairs are the guard

**Implementation Notes:**

- **Preamble.** New `claude/skills/ft-task/preamble.md` (7,276 after review fixes) has three callable sections — §"Locate and capture", §"Model gate", §"Pre-flight" — and each runner calls them in its own order. ft-task keeps model gate → pre-flight; micro keeps pre-flight → model gate. The four-way status branch (ft-task) and the existing-tasknote stop (micro) stay in their skills. Micro gains the full grammar line, `[!critical]` capture, and `[handoff]` note it was missing. `<PREAMBLE>` binding in micro Step 0; the old `<MODEL_EDGE>` binding retires, so the edge fragment is reached through the preamble. Headers of `step-1.5-model-edge.md` and `unattended-mode.md` were repointed. The month-block line is fixed at all three sites (close-epic too).
- **Filing motion (8 sites).** Each keeps: a one-sentence pre-check with the `git diff --cached --quiet` literal + `auto-commit = ` outcomes; its pathspecs, message fence and non-quiet `git diff --cached`; a **Post-stage verification** line naming its own recognized hunks and restore paths; its skip-report location; a path-bearing §"Filing commits" pointer. Unique facts kept: audit-repo's `??` clause, audit's inline-fix "wider check" sentence, seed's token-write ordering, park's invocation-as-authorization, epic-discovery's Step 10 fallback, and followup's unattended authorization + convergence note. The Pair O catalogue line now says runners "carry the steps … and cite the section".
- **Candidacy (6 mirrors + followup unattended bullet + refactor `--fast` emission).** Kept per surface: the label line, the branch taken, the rows evaluated, surface carve-outs, the clause-6 specifics (refactor no-`.1`, epic-discovery same-motion `.1`), and the `unattended-candidates:` literal. Cut: the restated predicate inputs, "every clause must hold", "proposed, never seeded", and "Flaitron never writes".
- **Post-closure.** ft-close-epic's next-move label print and the full copy-paste restatement → step 2/3 pointers; the skill branches stay. ft-epic-discovery's 🏁 bullet → pointer + its real-SHA path rule. Micro: its duplicated "guard not suppressed" sentence is gone and the 🟢 GO shape is cited as the module's carve-out. ft-task Step 6 is unchanged (already pointer-shaped; its per-skill flag interaction stays per CORE-535.4 §B). Every final step still Reads `SPEC/post-closure.md`.
- **Phase 4.** SOP step 5 is now an ordered 8-op list with rules cited, and the pre-move gate is kept intact (nav-chip clause and trailing-marker-run kept). Micro's three-flips/write-once paragraph is cut. Epic skills: the write-once rationale and CORE-057 precedent pointer are cut; the nav-chip bullets stay (CORE-393/657).
- **SOP §4 exit gate.** The drift carve-out is now a pointer to gates.md "Flag interaction" + gate-postures §"Park conversions".
- **Budget.** `preamble.md` gets a row at 9,000; the SOP row goes 38,000 → 34,200 (32,145 + ~2.3 units); the glob `SKILL.md` row is held at 33,000, re-justified against ft-epic-discovery (29,870). Cap history rows were added, the Ledger table names the preamble unmeasured ("—", after the stamp) and leaves the measurement and cold-start sum to the release refresh, and the release's ledger-refresh `wc` now measures the preamble.
- **AGENT-NEUTRALITY.** No counted site moved (the SOP still names the shared fragments it routes to) → no recount.
- **Downstream impact.** No direction change beyond this task; CORE-724.5 (adopter surface) cites none of the cut prose.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — CI drift job locally (`drift.cjs`), 15/15

- [x] Ran lint/type-check on changed code — `git diff --check` + Pair Q/final-newline; no code lint surface

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no rendered surface — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

No test suite covers markdown contract prose. The validation is the CI drift job plus the Acceptance greps (bash, not zsh: CORE-717/619).

**Verification receipt** (re-run from the top after the pass-1 blockers):
- `! grep -rq 'every added line a task row or blank' claude/skills` → 0
- `! grep -rq 'Every clause must hold' claude/skills` → 0
- `! grep -q 'trailing period' claude/skills/ft-close-epic/SKILL.md` → 0
- `grep -c 'Route on a verified tier'` ft-task SKILL / micro SKILL / preamble → 0 / 0 / 1
- `grep -c 'status: completed'` (pre-move gates) ft-task / micro / close-epic / SOP → 1→1 each; `grep -c 'nav chip'` epic-discovery / close-epic → 1 / 1
- `! grep -rq 'month-block granularity' claude` → 0
- `wc -c` 12 files + preamble → 241,291 (≤ 243,000; −16,746, −6.5% vs 258,037)
- `node <scratchpad>/drift.cjs` → 0 (15 OK / 0 FAIL: Pairs A/B/C/H/J/M/N/O/P/Q/R, context budget, final newline, wrapper-name, parity)
- Pair F park-flag loop → no output; Pair K1 / K2 snippets → no output
- `grep -q 'claude/skills/ft-task/preamble.md' docs/CONTEXT-BUDGET.md` → 0
- `git diff --check` → 0; `grep -c ' $' preamble.md` → 0 (untracked, so outside diff --check)
- Structural: no avoidable duplication left in the five levers; the new fragment is single-sourced and budgeted; no dead pointers (Pair Q).

**External review — pass 1** (`/code-review medium`, working tree + untracked preamble). 6 blockers, 4 notes, all fixed in Phase 2:
1. **Blocker.** SOP Phase 4 lost "flip nothing unless the commit can land this turn" (it applied only to the move). → restored as a gate on items 3–7.
2. **Blocker.** SOP drift pointer lost the unattended "no PLAN edit / no tasknote deletion" rule; the cited sections don't carry it. → restored with a `SPEC/blocked.md` cite.
3. **Blocker.** The preamble's `<SKILL>` dropped "flags included", which conflicts with the edge fragment's hardening. → restored.
4. **Note.** ft-refactor Step 3 said Step 4 emits candidates; Steps 4/6 say the Step 6 hand-off. → aligned.
5. **Blocker.** Write-once anti-misread pointers were cut at the status flips (close-epic, epic-discovery, micro, SOP). → restored as one cited clause each.
6. **Note.** The ledger mixed a fresh preamble figure with v6.0.0-stamped rows. → row shows "—" pending the release refresh.
7. **Blocker.** SOP epic-child placement lost "until `/ft-close-epic` moves the whole cohort". → restored with an `SPEC/epic.md` cite.
8. **Note.** The preamble was listed under "lazy fragments". → relabeled every-run.
9. **Blocker.** Micro ran the archive-collision check before its in-flight check (reverse of before). → in-flight check placed first. The other micro deltas (`[!critical]`/`[handoff]` capture, the full 70w block) are intended convergence, recorded in Discovery.
10. **Note.** CONTEXT-BUDGET row lost its trailing pipe. → fixed.

**External review — pass 2** (`/code-review medium`, same scope). 8 findings:
1. **Blocker.** The SOP's numbered list put the recap/handoff persistence after the archive move. → recap is now item 6, before verify (7) and move (8); the commit-ready gate covers items 3–8.
2. **Note.** `SPEC/model.md` pointed at ft-task SKILL Step 1.5 for the gate body. → repointed to `preamble.md` §"Model gate"; the AGENT-NEUTRALITY row was updated with it.
3. **Note, filed, not fixed.** `/ft-task --unattended` runs the model gate before the foreign-dirt gate, so the "scaffold, then park" path can write into a dirty tree. This predates this task (logged in Discovery); fixing it means reordering ft-task's steps and their citers, which is a behaviour change outside a dedupe. → follow-up row filed (see Final Summary).
4. **Blocker.** The SOP's `--fast` Re-scope behaviour pointed at §"Park conversions", which covers only `--unattended`. → one-sentence summary + cite of gate-postures §"`--fast` operator override".
5. **Blocker.** ft-close-epic said the 👇 exception covers the terminal new-epic branch, while post-closure's terminal form skips the copy-paste line. → that branch now emits no copy-paste line.
6. **Note.** ft-audit lost the thin-overlay vs full-copy fork split and "a declined row says nothing". → both restored.
7. **Note.** Budget figures were stale against the tree. → all four re-measured at closure.
8. **Note.** The preamble header still said "Lazy-loaded", and the PLATFORMS fragment inventory missed it. → header reads "every-run (not lazy)"; PLATFORMS names it.

Phase 3 re-run from the top after pass 2: every receipt line above holds (drift 15/15, F/K silent, greps 0, size 241,291).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/AGENT-NEUTRALITY.md`: model.md row repointed to `preamble.md`. `docs/PLATFORMS.md`: claude/ inventory names the every-run `ft-task/preamble.md`. No change to the other 16 (README, AGENTS — its KEEP IN SYNC roster names skills, not fragments — SPEC, MIGRATION, the four snippets — codex's "lazy fragments" wrapper rule still holds, since the preamble is dispatched unconditionally — CONVENTIONS, CONTRIBUTING, SECURITY, CAPABILITIES (flag rows only), AGENT-COMPAT, EXTERNAL-AGENTS (its capability probe literal `--unattended` is still in ft-task SKILL.md), WORKTREES, VISION); — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A for the always-loaded layer. Task-local lesson, recorded here: compressing a restatement into an ordered list can create a sequencing claim the prose never made (review pass 2 #1); — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Cut restated contract prose across 11 skill bodies and `SPEC/procedures/ft-task.md` down to pointers. The ft-task / ft-micro-task preamble is now one shared fragment. The 12 files plus the new fragment went from 258,037 to 241,291 chars (−16,746, −6.5%). Every surface keeps its own executable facts and every CI-guarded literal.

- **Files.** ft-task SKILL 29,387 → 23,437 + new `preamble.md` 7,276 (one copy for two runners); ft-micro-task 21,345 → 15,873; SOP 34,320 → 32,740; filing runners and mirrors trimmed across followup (+park/starter), audit, audit-repo, refactor, epic-discovery, seed; close-epic and epic-discovery post-closure/Phase 4 rationale trimmed. Citers and inventories repaired: SPEC/model.md, AGENT-NEUTRALITY, PLATFORMS, the edge/unattended fragment headers, the Pair O catalogue line, and the release ledger-refresh `wc`. Budget: preamble row 9,000; SOP cap 38,000 → 34,200; glob SKILL row held at 33,000 and re-justified.
- **Verification.** See Testing Notes. Drift 15/15, Pairs F/K1/K2 silent, all Acceptance greps clean, and the pre-move gates and nav-chip bullets kept.
- **Review.** Three passes. Pass 1 found 6 blockers + 4 notes and pass 2 found 3 blockers + 5 notes, all fixed except one note filed. Pass 3 was clean. Most blockers were cuts that took a unique rule with them, which is the failure mode the archive predicted (CORE-EPIC-558).
- **Filed.** [[CORE-725]] (`chore: file CORE-725 park`, `cfef4787`): `/ft-task --unattended` runs its model gate before the dirt gate. Pre-existing, and the fix changes behaviour, so it is out of a dedupe's scope.
- **Deferred.** The CONTEXT-BUDGET Ledger measurements and the cold-start sum go to the next `/ft-release` refresh. The preamble row there reads "—" until then.
- **`touches:` reconciliation.** Declared 18, changed 21. Undeclared: `SPEC/model.md`, `docs/PLATFORMS.md` (review-pass-2 citer/inventory repairs), and `claude/skills/ft-release/step-7.1-standing-checks.md` (so the release refresh measures the preamble).
- **Maintainability.** Each of the five restated rule families now has one home, and each skill carries only its delta. A flagless `/ft-task` cold start reads about 30.7k across SKILL + preamble instead of 29.4k; that +1.3k buys the full grammar and capture list for micro and one place to edit the gate. A flagless `/ft-micro-task` reads about 23.1k instead of 21.3k, for the same reason. The other nine skill files read about 11.0k less in total (172,985 → 161,965).

**Archived:** 2026-10-07
