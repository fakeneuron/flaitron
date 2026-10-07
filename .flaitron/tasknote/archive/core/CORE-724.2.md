---
title: cold-start-trim
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-724.7, CORE-574.5, CORE-558.2]
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
touches:
  - SPEC.md
  - SPEC/gates.md
  - SPEC/gate-postures.md
  - SPEC/post-closure.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
parallel-safe-with:
  - CORE-724.6
---

# CORE-724.2 | cold-start-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]]

## 🎯 Goal

Shrink the four cold-start contract files (SPEC.md, SPEC/gates.md, SPEC/gate-postures.md, SPEC/post-closure.md) by collapsing cross-file restatements, dropping archive-held task-ID archaeology, and retiring gates.md "Moved to" stubs, then lower each CONTEXT-BUDGET cap to the new size.

## ✅ Acceptance

- [x] Four-file combined size drops from 96,308 to ≤ 87,000 chars (→ 84,842) — `wc -c SPEC.md SPEC/gates.md SPEC/gate-postures.md SPEC/post-closure.md | tail -1`
- [x] Two-banner cap stated in full once (gates.md §"Operator-gate cues"); every other site in the four files cites it rather than re-arguing it — `grep -ciE 'two-banner|standing phase-gate|third standing|gate count'` per file, recorded before/after, plus `judgment` read
- [x] `touches:` stated once per duty: declare/exempt in SPEC.md §"Tasknote frontmatter", reconcile in §"Scope reconciliation", gates.md reduced to a one-line not-a-gate pointer — `judgment` (prose dedupe, no command decides it)
- [x] gates.md "Moved to" stubs retired (§"Flag precedence and surface matrix", §"`--fast` operator override", §"`--unattended` operator posture") with no citer left dangling — `! grep -qE '^Moved to|^## Flag precedence|^## .--fast. operator|^## .--unattended. operator' SPEC/gates.md` + Pair Q
- [x] gates.md ↔ gate-postures.md: no flag×surface row restated in gates.md (flag leads collapse to pointers); no gate rule restated in gate-postures.md — `judgment`
- [x] Task-ID archaeology dropped where the archive already holds it — `grep -oE 'CORE-[0-9]+' <file> | wc -l` before (SPEC 12 · gates 16 · postures 4 · post-closure 0) / after recorded
- [x] Pair Q-cited headings and bold leads kept; whole CI drift job green — `node <scratchpad>/drift.cjs` (every `drift` step in `.github/workflows/ci.yml`) → 0
- [x] CORE-558.2 class (§"Cross-repo edit remit", §"Loop tasks", §"What flaitron does NOT provide") and K2's `**Runtime stays out.**` untouched; no CORE-574.5 / CORE-558.2 decline reopened — `git diff -U0 SPEC.md` shows no hunk in those three sections + K2 grep from `step-7.1-mirror-pairs.md`
- [x] Each of the four caps lowered to new size + its row's stated headroom, cap history row appended — CI `Context budget` step → 0 + `judgment` on arithmetic
- [x] `docs/AGENT-NEUTRALITY.md` flag-site counts for the four files recounted — `judgment` (any-mention count by reading)

## 🧩 Subtasks

- [x] gates.md: collapse intro + §"Operator-cue vocabulary" pointer prose; keep cap paragraph canonical, cut its restatements (§destructive Bound, §cue-vocab "two things left here", flow/bundle lines); flag leads → pointers; `touches:` → one line; drop task-IDs; delete the three "Moved to" stubs
- [x] gate-postures.md: take the Re-scope notice literal from gates.md; trim intro, cap restatement, paper-complete three-part restatement; drop task-IDs (keep `**Runtime stays out.**` + VISION.md, caobunga line left for .6)
- [x] post-closure.md: intro → pointer to gates.md §"Conditional skip rule"; dedupe 🏁/same-turn rule and glyph mapping
- [x] SPEC.md: cut gate-surface restatements (§Operator-gate cues list, Exit gate, Phase 2 flow, External review / 👁️ / test-strategy flag prose), `touches:` duplicates, Phase 4 closure-ops paragraph, duplicate Optional-inserts pointer, §Post-closure / §When-to-use restatement, task-ID archaeology; keep the CORE-558.2 class and chip hardening wording
- [x] Repair any citer Pair Q flags; run CI drift runner
- [x] CONTEXT-BUDGET: lower four caps (size + stated units), append cap history
- [x] AGENT-NEUTRALITY: recount flag sites in the four files

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic
- [[CORE-724.1]] — Discovery; inventory, resolved scoping, precedents
- [[CORE-724.3]] — sequential successor (lazy-module trim; owns gate-discipline.md fold)
- [[CORE-724.6]] — parallel-safe-with: light overlap on `SPEC/gate-postures.md` (caobunga line is .6's)
- [[CORE-724.7]] — decay window; any reopened CORE-574.5 / CORE-558.2 decline routes there
- [[CORE-604.2]] — related-decision: created the gates.md stubs this task retires
- [[CORE-558.2]] — related-decision: restored the three SPEC.md summaries kept here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The filed row's targets all exist at HEAD `1a6c579f` (cap restatement ×6+, `touches:` ×5, three "Moved to" stubs, flag-row restatements, 32 task-ID mentions); .1 measured the four files at 96,308 chars on the always-loaded/near-universal path.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — N/A: markdown contract edits, no code or module boundary moved; — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Measured (HEAD `1a6c579f`).** SPEC.md 47,056 · gates.md 20,454 · gate-postures.md 20,409 · post-closure.md 8,389 = 96,308. Task-ID mentions 12 / 16 / 4 / 0. Cap-restatement greps 4 / 6 / 1 / 0. The CI `drift` job, run locally through a js-yaml extractor of every step (`<scratchpad>/drift.cjs`), was green at baseline.

**Restatement map (what collapses to where).**
- *Two-banner cap.* The canonical statement is gates.md §"Operator-gate cues" ("stated here, cited everywhere else"). It is re-argued in the gates.md intro, the first paragraph of §"Operator-gate cues", §"Operator-cue vocabulary" ("two things the split leaves here"), the opening and Bound bullets of §"Destructive-action escalation", gate-postures "Three readings", SPEC.md §"Operator-gate cues" and the module list, the Phase 2 flow line, the External review "standing gate count unchanged", and the 👁️ "not a banner" line.
- *`touches:`.* It appears in the SPEC.md table row, the lifecycle-duty paragraph, the Phase 1 box, the Phase 4 box, §"Scope reconciliation", and gates.md "`touches:` is not a gate condition". SPEC.md §"Scope reconciliation" and gates.md cite each other for the not-a-gate claim.
- *Matrix rows in gates.md.* "No flag reaches it", "Flag interaction" (the full Re-scope/De-scope × flag table in prose), "Flag overrides", and the bundled-prompt "top rung" clause. The gate-postures matrix already holds all of them. gate-postures, in turn, restates the paper-complete guard's three parts and gates.md's Re-scope rewrite. SPEC.md restates the gate-postures External-review and full-suite rows.
- *post-closure.md.* The intro restates gates.md's on-skip/on-fire routing. The 🏁 "never in the same turn" rule appears twice, and the glyph mapping twice in one paragraph.

**Citers.** No Pair Q-shaped citation targets any of the three "Moved to" stub headings: live citers already point at gate-postures.md, and the archive and PLAN-ARCHIVE are out of Pair Q scope. `ft-task`/`ft-micro-task` cite the bold leads "Flag interaction" and "Flag overrides" through arrow references, so both leads stay as one-line pointers. docs/AGENT-NEUTRALITY.md:40 names the three stubs in its gates.md site count, so it needs a recount. Release-only K2 binds `**Runtime stays out.**` in gate-postures plus 6 lines to name VISION.md, so it stays.

**Archive skim** (`archive/core/`, confirmed against the README table). [[CORE-604.2]] kept the stubs so that copied citations would resolve, "the adopter paste-block included". The paste-block now cites gate-postures.md (.1 drift note), so the stubs' reason has expired. [[CORE-558.2]] restored §"Cross-repo edit remit", §"Loop tasks" and §"What flaitron does NOT provide" as rules that fire unprompted. They are recorded in `step-7.1-mirror-pairs.md` as a class kept on purpose, so they are left untouched. [[CORE-574.5]] declined a prose trim for headroom. This task cuts only restatements and archaeology; any prose trim of a unique rule routes to .7. [[CORE-657]] / CORE-393: the nav-chip "not flipped at closure" warnings are hardening against a misreading, so the warnings stay and only their IDs go. [[CORE-671]]: within-file restatement cuts in gate-postures that kept every heading and cited lead are the precedent for this shape.

**Drift check.** The row's cited files and counts match HEAD. The plan cuts only text that a live module or another section of the same four files already states. It contradicts no SPEC contract and does not diverge from the row.

**Clarification** (AskUserQuestion). Caps follow the existing CONTEXT-BUDGET sizing: trimmed size plus the row's stated headroom (SPEC ~2 units, gates ~2, postures and post-closure ~1.5), rounded to 500.

**Assumptions.** (1) Adopters whose AGENTS.md still carries a pre-604.2 paste-block that cites `gates.md` §"`--unattended` operator posture" lose that anchor. The filed row explicitly retires the stubs, and their copies update on the next paste-block refresh. (2) `docs/CONTEXT-BUDGET.md` §Ledger stays the release's job (precedent CORE-574.5); only Budgets and Cap history change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown contract edits; the CI drift job is the standing check

**Implementation Notes:**

Pattern: CORE-671's within-file restatement cut, applied across all four files. Each rule keeps one canonical statement and every other site gets a pointer. No heading or bold lead that is cited anywhere was renamed.

- **gates.md 20,454 → 14,174.** Merged the intro blockquote and paragraph into one. The cap paragraph is canonical and now also names External review findings (absorbed from SPEC.md's "standing gate count unchanged"). The §"Operator-gate cues" opening, the table's trigger cells, the §"Operator-cue vocabulary" body, the destructive intro, and the Bound bullets were cut back to rule plus pointer. The "No flag reaches it", "Flag interaction" and "Flag overrides" leads each became a one-sentence pointer; the leads stay because ft-task and ft-micro-task arrow-cite them. `touches:` is now 3 lines pointing at SPEC.md §"Scope reconciliation". The three "Moved to" stubs are deleted. Every task-ID is gone (16 → 0).
- **gate-postures.md 20,409 → 19,438.** Took in the `⚠️ Re-scope (--fast) — …; proceeding.` literal plus the blocked-prerequisite `drift` park from gates.md, under the "Each delegation is bounded" lead. Trimmed the intro, the "single place" preface, the `--fast` delegations paragraph (it duplicated §"What is inherited"), the Park conversions list (now just the six codes), the paper-complete three-part list, and the close-epic restatement. IDs 4 → 0. `**Runtime stays out.**` and the caobunga line are untouched (K2; the caobunga line is .6's).
- **post-closure.md 8,389 → 7,653.** The intro now points to gates.md's skip/fire routing instead of restating it. Dropped the duplicated 🏁-SHA and same-turn sentences in step 2 (SPEC §"Paper-complete guard" part 3 plus this file's intro keep them), the duplicated glyph mapping, and the expanded glyph list in step 3.
- **SPEC.md 47,056 → 42,690.** Trimmed the retired-field archaeology, the `touches:` duty paragraph, and the chip IDs (the warnings stay as hardening, per CORE-657). Deleted the duplicate `### Optional inserts` pointer and the backwards-compat line (0 citers). Collapsed the §"Operator-gate cues" module list, the skim probe paragraph, the CORE-393 example, the Exit gate paragraph, the Phase 2 flow line, the External review / test-strategy / 👁️ flag prose, the Phase 4 closure-ops paragraph, the circular gates.md cite in §"Scope reconciliation", the closed-when-archived and paper-complete restatement, §"Post-closure protocol", and §"When to use" (the seven-motion list is plan-filing's). The six remaining IDs are grammar or YAML examples. The CORE-558.2 class is byte-identical.
- **Caps** (size + row's units, rounded up to 500): SPEC 53,000 → 49,000 (+~2 × 2,957); gates 25,000 → 19,500 (+2 × 2,500); postures 23,000 → 22,000 (+1.5 × 1,400); post-closure 12,000 → 10,000 (+1.5 × 1,400). Cap history rows appended; the Ledger is left for `/ft-release` §7.1.
- **AGENT-NEUTRALITY:40.** Any-mention recount: SPEC.md 5 → 4 (Phase 1 no longer names a flag), gates.md 7 → 3, gate-postures.md unchanged at 9. The stale "8 + 9 exceeds 14" clause was rewritten.
- **Left for .4.** `SPEC/procedures/ft-task.md:338-346` still restates the drift carve-out and cite gates.md §"Phase 1→2 exit gate". The citation resolves, and gates.md "Flag interaction" points on to gate-postures, so nothing dangles.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code; CI `drift` job run locally instead

- [x] Ran lint/type-check on changed code — N/A, no code; Pair Q citation resolution + final-newline step cover the markdown

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no rendered surface — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
wc -c SPEC.md SPEC/gates.md SPEC/gate-postures.md SPEC/post-closure.md | tail -1   → 83955 total (≤ 87,000)
grep -ciE 'two-banner|standing phase-gate|third standing|gate count' (per file)    → before 4/6/1/0, after 2/5/0/0
    remaining: SPEC.md module index ×2; gates.md intro index, §Operator-gate cues definition, canonical ¶ ×2 lines, destructive cite
! grep -qE '^Moved to|^## Flag precedence|^## .--fast. operator|^## .--unattended. operator' SPEC/gates.md   → 0
grep -oE 'CORE-[0-9]+' <file> | wc -l                                             → before 12/16/4/0, after 6/0/0/0 (SPEC.md's 6 are grammar/YAML examples)
node <scratchpad>/drift.cjs (all 15 ci.yml drift steps incl. Context budget, Pair Q) → 0 (15 OK / 0 FAIL)
section diff HEAD vs now: Cross-repo edit remit / Loop tasks / What flaitron does NOT provide → identical ×3
grep -A6 '^**Runtime stays out.**' SPEC/gate-postures.md | grep -q VISION.md (K2)  → 0
```

**Re-run after review fixes (Phase 3 from the top):** `wc -c` → 84,842 total (42,901 / 14,314 / 19,840 / 7,787); cap-mentions 2/5/0/0; stubs-gone → 0; ids 6/0/0/0; `drift.cjs` → 0 (15 OK); CORE-558.2 sections identical ×3; K2 → 0; flag-site recount still 4 / 3; `git diff --check` → 0.

**External review** (`/code-review medium`, working-tree diff, 10 findings). Graded against Acceptance:
- **blocker** · gate-postures §"What `--unattended` never relaxes" said "all three parts" but listed two (atomic-commit part dropped) → restored the clause.
- **blocker** · §"`/ft-close-epic` under the posture" kept "real commit" without its consequence → consequence restored.
- **blocker** · §"Park conversions" lost the gate→code mapping (not a restatement in-section; GATE-DISCIPLINE cites it) → mapping restored.
- **blocker** · SPEC.md skim probe clause lost its actionable default (unique content, not restatement) → restored in one sentence.
- note · post-closure step 2 lost the point-of-use 🏁 never-invent ban → restored as one line.
- note · post-closure step 1 lost "preview line mandatory" → restored.
- note · gate-postures intro lost its verb → "live here" restored.
- note · gates.md Flag interaction lost "routine trips: --fast adds nothing" and the delegation reason → restored in one clause.
- note · `docs/GATE-DISCIPLINE.md:26` and `ft-task/SKILL.md:161` cited gates.md Flag interaction for content now in gate-postures → both retargeted to gate-postures §"`--fast` operator override" → "Each delegation is bounded".
- note · cap paragraph gained "External review finding" while SPEC.md's External review lost its no-banner line → SPEC.md now cites the cap paragraph (moved, not new contract).

Structural assertions: no new public surface. The only content that moved is the Re-scope notice literal (gates.md → gate-postures.md). Every pointer added in place of a restatement names a heading or lead that Pair Q confirms resolves.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — SPEC: updated (this task). docs/CONTEXT-BUDGET.md (not on the list): caps and history updated. docs/AGENT-NEUTRALITY: recount updated. docs/GATE-DISCIPLINE.md (not on the list): one citation retargeted. README, AGENTS, MIGRATION, the four snippets, CONVENTIONS, CONTRIBUTING, SECURITY, PLATFORMS, CAPABILITIES (its ledger-row file list still holds), AGENT-COMPAT, EXTERNAL-AGENTS (`:65` names gates.md generically and still holds), WORKTREES, VISION: no change. — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A; the lesson that a restatement cut can silently take a unique rule with it is already the CORE-EPIC-558 lesson, and the external review caught it here as designed — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Trimmed the four cold-start contract files from 96,308 to 84,842 chars (−11.9%). Each restated rule now has one home: the two-banner cap, the `touches:` duties, flag×surface rows, and post-closure routing. The three gates.md "Moved to" stubs and all task-ID archaeology are gone, and each CONTEXT-BUDGET cap was lowered to the new size plus its row's headroom.

- **Files:** SPEC.md 47,056 → 42,901; SPEC/gates.md 20,454 → 14,314; SPEC/gate-postures.md 20,409 → 19,840; SPEC/post-closure.md 8,389 → 7,787. Also docs/CONTEXT-BUDGET.md (caps 49,000 / 19,500 / 22,000 / 10,000, plus history), docs/AGENT-NEUTRALITY.md (recount 5 → 4, 7 → 3), and two retargeted citers (docs/GATE-DISCIPLINE.md:26, claude/skills/ft-task/SKILL.md:161).
- **Verification:** see Testing Notes. CI drift job 15/15 green locally, Pair Q included; the CORE-558.2 class is byte-identical; K2 holds.
- **Review:** 4 blockers (cuts that took unique content) and 6 notes, all fixed in Phase 2, with Phase 3 re-run.
- **Refactors deferred:** the procedure's drift-carve-out restatement is left for [[CORE-724.4]].
- **`touches:` reconciliation:** declared 6, changed 8. Undeclared: docs/GATE-DISCIPLINE.md and claude/skills/ft-task/SKILL.md, both citer repairs prompted by the review.
- **Maintainability:** a flagless `/ft-task` cold start loads about 7.6k fewer chars across SPEC.md, gates.md and post-closure.md, and about 11.5k fewer with a flag. Each gate rule is now edited in one place.

**Archived:** 2026-10-07
