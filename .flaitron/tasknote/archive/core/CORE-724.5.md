---
title: adopter-surface-trim
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-724, CORE-724.1, CORE-724.4, CORE-510, CORE-516, CORE-519]
blocked-by: [CORE-724.4]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/AGENTS-snippet.md
  - AGENTS.md
  - templates/tasknote-template.md
  - docs/MIGRATION.md
  - docs/UPGRADING.md
  - CONTRIBUTING.md
  - README.md
  - SPEC/layout.md
  - .gitignore
  - claude/skills/ft-audit/scaffold-bootstrap.md
  - .flaitron/audit-overlay/SKILL.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-update/SKILL.md
  - docs/PLATFORMS.md
  - docs/VERSION-HISTORY.md
  - .flaitron/tasknote/README.md
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-724.5 | adopter-surface-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-724]] [[CORE-724.1]] [[CORE-724.4]]

## 🎯 Goal

Cut the bytes every adopter pays for on the adopter-facing surfaces: names-plus-pointers paste-block with its KEEP IN SYNC comments outside the fence, a tasknote template whose boxes carry a title and short imperative (detail stays in SPEC), and a MIGRATION.md stripped of maintainer and historical sections, with the visualizer runbook kept in one home.

## ✅ Acceptance

- [x] Paste-block fence carries no HTML comment; its KEEP IN SYNC guards live outside the fence — `awk '/^```markdown$/{f=1;next} f&&/^```$/{f=0} f' claude/AGENTS-snippet.md | grep -c '<!--'` → 0
- [x] Paste-block cut to names + pointers + one rule clause per operator-visible constraint; every adopter skill and every flag (Pair F's `--low|--med|--fut|--high`, plus `--park --starter --debug --loop --fast --unattended`) still named — `grep -F` loop over the fence → 0 misses; fence chars < 6,438 (`wc -c`)
- [x] AGENTS.md's three KEEP IN SYNC guards still point at the right snippet sites — `grep -n 'AGENTS-snippet.md:[0-9]' AGENTS.md` names only lines that hold what it claims (`sed -n <n>p`)
- [x] Tasknote template boxes cut to bold title + short imperative; every box, bold label, phase heading and EXTERNAL-AGENTS stable label kept — label/anchor diff vs pre-edit baseline → empty; box count 25; `wc -c` < 5,635
- [x] MIGRATION.md §1.2.2 moved to CONTRIBUTING.md (with the "Machine-global installs: utilities only" block); v5.x and v4.x upgrade recipes moved to new `docs/UPGRADING.md`; MIGRATION keeps a one-line redirect for tag-message readers — `grep -c '^### 1.2.2\|^### Upgrading' docs/MIGRATION.md` → 0
- [x] Visualizer runbook lives once (README.md §"Visualizer"); MIGRATION and snippet carry a pointer — `grep -l 'FLAITRON_VIZ_WORKSPACE:-~/code' README.md docs/MIGRATION.md claude/AGENTS-snippet.md` → README.md only
- [x] Every citer of a moved section repointed; CI `drift` job passes locally (Pair Q included) — extracted drift steps → all exit 0
- [x] Release-side checks that read these files stay clean: Pair F loop, §1.6 wiring derivation awk, platform-snippet `ln -s` diffs, `node --test tools/update-adopters.test.mjs` → 0
- [x] Phase 4 doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs" — `judgment`: per-entry verdict

## 🧩 Subtasks

- [x] Paste-block: rewrite the fence bullets (names + pointers + rule clauses); move the two in-fence KEEP IN SYNC comments into the line-9 comment outside the fence
- [x] AGENTS.md: repair the KEEP IN SYNC pins (line-number pins → named sites)
- [x] Template: trim each box to title + short imperative; keep labels, headings, YAML comment block
- [x] CONTRIBUTING.md: new maintainer section from MIGRATION §1.2.2 (incl. "Machine-global installs: utilities only"); repoint step 4 and the "Where conventions live" bullet
- [x] docs/UPGRADING.md: new doc with the v5.x→v6 and v4.x→v5 recipes; MIGRATION §"Pinning and bumping" gets a redirect line
- [x] Visualizer: MIGRATION §Visualizer and snippet §Visualizer → pointer to README.md §"Visualizer"
- [x] Repoint citers: SPEC/layout.md, .gitignore, scaffold-bootstrap.md, audit-overlay SKILL.md, ft-release standing-checks, ft-update SKILL, PLATFORMS, README §Version, VERSION-HISTORY:29, CONTRIBUTING; register UPGRADING.md where docs are enumerated
- [x] Phase 3: local CI drift job, release-side checks, updater test suite, acceptance greps, /code-review medium

## 🔗 Related

- [[CORE-EPIC-724]] — parent epic (context-diet)
- [[CORE-724.1]] — Discovery; scoped this child and resolved "template: box title + short imperative"
- [[CORE-724.4]] — blocked-by: skill bodies settle before the paste-block cites them (closed)
- [[CORE-510]] — depends-on: paste-block "reference, not restate" precedent; kept skill names + park flags
- [[CORE-516]] / [[CORE-519]] — the two in-fence KEEP IN SYNC guards this task moves out

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN row's targets all still exist at HEAD `746dfcf2`: the two in-fence comments (snippet:30-31), the rule-prose boxes in the template, MIGRATION §1.2.2 and the v4/v5 recipes, and the visualizer section repeated in three places. The predecessor .4 is closed.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flaitron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Baseline.** Paste-block fence 6,438 chars (snippet file 16,139). Template 5,635 chars, 25 boxes. MIGRATION 67,250 chars. Neither the snippet nor the template carries a §"Budgets" row (ledger only: §"Adopter-side always-loaded" and the cold-start sum). As with .2–.4, the ledger refresh is left to `/ft-release`. MIGRATION is exempt by name (CORE-670.4).

**Machine readers of the touched files (must not break).**
- Snippet: only the `^ln -s` block is parsed (ft-release standing checks, `tools/update-adopters.mjs` `wiredSkillKeys()`, `/ft-update` Step 4, ft-new-project Steps 7–8). ft-new-project Step 5 extracts the ```` ```markdown ```` fence whole. So the fence must stay one balanced block, and nothing below it may open a second ```` ```markdown ```` fence.
- Template: EXTERNAL-AGENTS §"Stable surfaces" pins the four phase headings, `## 🎯 Goal`, `**Verdict:**`, `**Final Summary:**` → `**Archived:**`. Skills reference the bold box labels (Relevance Assessment, Archive skim, Pattern survey, Verification receipt, External review, Doc-drift sweep, Learnings). viz parses `**Archived:**`. Pair C covers the back-link depth.
- MIGRATION: Pair F reads its retired-`ft-sidequest` cell (not moved). The standing check `awk`s §1.6 (not moved). Pair Q resolves every `§"…"` in tracked `.md`, including `docs/VERSION-HISTORY.md:29` (not excluded), so a moved section needs every citer repointed.

**Citers of moved sections.**
- §1.2.2: SPEC/layout.md:42, .gitignore:24, scaffold-bootstrap.md:163/176/178, audit-overlay SKILL.md:33, CONTRIBUTING.md:29.
- §"Machine-global installs: utilities only": ft-release standing-checks:93.
- §"Upgrading … from v5.x": ft-update SKILL.md:28, PLATFORMS.md:155, README.md:336, VERSION-HISTORY.md:29, plus MIGRATION's own §"Pinning and bumping" (two internal refs).
- The immutable `v5.0.0` / `v6.0.0` tag messages cite MIGRATION §"Upgrading …" too. A one-line redirect in MIGRATION serves those readers.
- Visualizer: README.md §"Visualizer" is already canonical (`viz/README.md` cites it). Nothing cites the MIGRATION or snippet copies.

**Archive skim.** Hits number in the hundreds (474 / 144 / 694), so I read the paste-block precedents named by the PLAN row and .1 directly instead of using a probe.
- [[CORE-510]] trimmed five bullets to "statement + pointer" and deliberately left bullets 20–22 for a follow-up. It kept skill names and the park flags (the KEEP IN SYNC exception) and dropped the `--fast` superset explanation rather than compress it, because CORE-495 had to correct exactly that claim.
- [[CORE-516]] / [[CORE-519]] put their KEEP IN SYNC comments *inside* the fence only to sit beside the existing one. No decision that they belong there.
- .1's precedent list carries over: rules that fire unprompted had to be restored after compression (CORE-EPIC-558), and "history" can be anti-misreading hardening (CORE-657). Those are why constraint clauses stay in the paste-block.
- .4's lesson is that compressing a restatement into a list can create a sequencing claim the prose never made.

**Best Practices Review.** N/A in code terms; doc-shape only. Responsibilities: the paste-block is the adopter entry contract (names + where to look), SPEC owns semantics, MIGRATION is the adoption guide, CONTRIBUTING the maintainer guide, the new UPGRADING the rename recipes. No new abstraction.

**Drift check.** Every path in the PLAN row resolves. AGENTS.md:35 pins "claude/AGENTS-snippet.md:32" (the `[model]` bullet, now at :32). That line-number pin breaks on any edit above it, so it moves to a named site. AGENTS.md:23 pins `:9` (the outside-fence comment), which stays at line 9. The plan agrees with the PLAN row and with SPEC §"Tasknote body shape", whose layout is canonical in the template while checklist detail lives in SPEC §"The 4-phase workflow".

**Resolved scoping** (AskUserQuestion, 2026-10-07):

| question | answer |
|---|---|
| Paste-block depth | Names + pointers + one rule clause where a bullet carries an operator-visible constraint (`--unattended` never with `--fast`; plan never rewritten without confirm; submodule read-only) |
| §1.2.2 home | CONTRIBUTING.md (new section; carries the "Machine-global installs: utilities only" block) |
| Upgrade recipes | New `docs/UPGRADING.md` holding both v5.x→v6 and v4.x→v5 |

Assumptions (not asked): the micro template is out of scope (the PLAN row says "Tasknote template", singular, and .1's resolved row names the full template). The template's DRY/SRP phrase stays as a short clause, because .7 owns the decay window on those imperatives. Only the snippet's Visualizer section is deduped; its §"Bumping" paragraph and `.claude/rules/` section stay as they are, since the row does not name them.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown only; no executable behaviour changed

**Implementation Notes:**

- **Paste-block** (`claude/AGENTS-snippet.md`). The fence went from 6,438 to 3,349 chars (−48%) and the file from 16,139 to 12,570. Eleven feature bullets became five: the start bullet, a `/ft-task` flags line, the peer-skill roster, downstream-impact, and an "optional, by hand" line for worktrees, specs and heartbeat. The three KEEP-IN-SYNC sentences (Do not skip phases, `[model]`, submodule read-only) stay byte-identical. The two in-fence HTML comments merged into the outside-fence comment at line 9, which now numbers its three guards. Rule clauses kept, per the operator's choice: `--unattended` parks and is never used with `--fast`; `/ft-seed` never writes unconfirmed; the plan is never rewritten without a confirm. Dropped as restatement (SPEC owns them): `--debug`'s cadence steps, loop's per-cycle gate, `/ft-update`'s step list, and the worktree path layout. The Visualizer section is now a pointer.
- **AGENTS.md.** The CORE-516 guard's `:32` line pin is replaced with a named site, since line pins break on any edit above them. The `:9` pin still holds. CONTRIBUTING's repo-layout gloss gained "local skill wiring".
- **Template.** 5,635 → 3,920 chars (−30%). All 25 boxes, every bold label, every heading, and the EXTERNAL-AGENTS stable labels are kept, checked by diffing against a pre-edit baseline. Each box is now a bold title plus a short imperative, and the dropped detail lives in SPEC.md §"The 4-phase workflow". The DRY / SRP phrase is kept short: .7 owns its decay window.
- **MIGRATION.** 67,250 → 56,647. §1.2.2 moved to CONTRIBUTING.md §"Developing flaitron skills & commands" with links rebased to the repo root. The v5.x and v4.x recipes moved to the new `docs/UPGRADING.md` with heading levels raised. MIGRATION keeps a bold-lead redirect, which also serves the immutable `v5.0.0` / `v6.0.0` tag messages that cite it. Visualizer is a pointer to README §"Visualizer".
- **Citers repointed.** SPEC/layout.md, .gitignore, scaffold-bootstrap.md (×3), audit-overlay SKILL.md (×2, including its `description:`), ft-release standing-checks (×2), ft-update SKILL.md, PLATFORMS.md, README.md §Version, VERSION-HISTORY.md:29. Pair Q scans VERSION-HISTORY, so a historical-entry pointer had to be repaired.
- **Registered.** `docs/UPGRADING.md` joins the "outside the sweep set" docs in `.flaitron/tasknote/README.md` (frozen recipes), and README's repo-layout `docs/` enumeration gains "upgrading".
- **Refactors.** None beyond the moves. The snippet's §"Bumping" paragraph still overlaps MIGRATION §"Pinning and bumping"; it is out of the row's scope and deferred.
- **Downstream-impact.** No direction change, so the scan is not triggered.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (the one suite reading these files) → 0

- [x] Ran lint/type-check on changed code — N/A, no code; the CI drift job is the doc-lint equivalent → 15/15

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — 3 passes (4 blockers fixed; notes fixed or recorded below); — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A, no rendered surface — Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run, after the review-pass-2 fixes):

```text
CI drift job, 15 steps extracted from .github/workflows/ci.yml → 15/15 exit 0   (Pair Q incl.; docs/UPGRADING.md intent-to-add so ls-files scans it)
Pair F loop (4 mirrors × 4 flags)                                → no output
awk §1.6 Commit | grep .claude/(commands|skills)/ft-              → 0 hits (exit 1, as required)
ssot ↔ inventory / commands / codex / cursor / grok diffs         → all empty (8 slugs)
node --test tools/update-adopters.test.mjs                        → 0 (65 pass, 0 fail)
node --check tools/update-adopters{,.test}.mjs                    → 0
A1 fence grep -c '<!--'                                           → 0
A2 skill + flag presence in fence                                 → 0 misses; fence 3,697 chars (< 6,438); 1 markdown fence
A3 grep -c 'AGENTS-snippet.md:[0-9]' AGENTS.md                    → 0 (both guards now name the comment, not a line)
A4 label/anchor/every-bold-token diff vs HEAD baseline            → empty; 25 boxes; 4,023 chars (< 5,635)
A5 grep -c '^### 1.2.2\|^### Upgrading' docs/MIGRATION.md        → 0; UPGRADING has 2 recipe headings; CONTRIBUTING has the Machine-global bold lead
A6 FLAITRON_VIZ_WORKSPACE runbook                                 → README.md only
```

No targeted suite and no lint apply (markdown plus one ci.yml comment). The structural checks are the receipt above.

**External review, pass 1** (`/code-review medium`, working tree): 2 blockers, 6 notes.

1. **Blocker.** The PLAN-ARCHIVE bullet had dropped its trigger ("once `## Completed` outgrows its bound", "absent until the first rotation"), so it read as if every closed row rotates. A2 passed without deciding this. → both clauses restored.
2. **Blocker.** The peer roster had gained `/ft-seed` and `/ft-update` with inline descriptions, which broke guard 1 (names-only; AGENTS.md lists `/ft-seed` as a utility). → the roster is back to tasknote-family names, with a separate "Utilities" bullet holding the `/ft-seed` unconfirmed-write rule and a pointer to `SPEC/unattended-candidacy.md` §"Seeding an existing plan".
3. **Note.** The CORE-516 guard still pinned to "line-9 comment". → both AGENTS.md guards now name "the KEEP IN SYNC comment above the paste-block fence" (the `:9` pin is gone too).
4. **Note.** In its new home, CONTRIBUTING's moved paragraph left "§1 step 3" and "§0 forker checklist" without a file. → both now name `claude/skills/ft-audit/SKILL.md`.
5. **Note.** The ci.yml Pair Q comment still said "MIGRATION's v4 recipe". → now "UPGRADING's". Comment only; the step's behaviour is unchanged.
6. **Note.** The CONTEXT-BUDGET ledger is stale for the snippet, MIGRATION and the template. → no change: as in .2–.4, the ledger refresh belongs to `/ft-release` (a partial refresh produces the mixed-stamp total the ledger warns against).
7. **Note.** The CONTRIBUTING intro says "short version" while the page now carries about 5 KB of wiring. → no change: CONTRIBUTING is the operator's chosen home (Resolved scoping).
8. **Note.** The UPGRADING intro cited MIGRATION §"Pinning and bumping" twice. → collapsed to one citation.

Phase 3 re-run from the top after the fixes: every receipt line above holds.

**External review, pass 2:** 2 blockers, 6 notes.

1. **Blocker.** `/ft-refactor`'s "never edits source" guarantee had been dropped, although it is an operator-visible constraint Acceptance keeps. → restored after its name in the roster as a parenthetical. Guard 1's names-only rule is about which skills are listed, and AGENTS.md lists the same names.
2. **Blocker.** The Archive skim box lost its `**probe**` hand-off, which falsified A4's "every bold label kept". A4's regex only captured each box's first bold label. → clause restored, and A4 now also diffs every `**…**` token against HEAD.
3. **Note.** `--fast` was listed with no meaning. → "(suppresses conditional gates; also on `/ft-micro-task` and `/ft-refactor`)".
4. **Note.** The VERSION-HISTORY v6.0.0 entry is a historical record (its Maintenance rule: don't hand-edit). → reverted. Pair Q still resolves it through MIGRATION's redirect bold-lead `**Upgrading an existing adopter from v5.x (…`, which is a prefix match.
5. **Note.** README's docs index lacked UPGRADING.md. → entry added beside MIGRATION.
6. **Note.** The claim that the adopter-side `.flaitron/core/viz/` caveat was lost. → no change: README §"Visualizer" already says it "continues to work (read-only submodule, unchanged)".
7. **Note.** Dropped template pointers. → the Drift check's "flag any drift before re-interpreting the task" is restored (behavioural). The plan-filing cite and the 📦 note stay out: the placement rule itself is still inline, and SPEC owns the rest.
8. **Note.** UPGRADING claimed every `/ft-update` points there. → qualified: a current `/ft-update` does, and a v6.0.0-era copy points at MIGRATION, whose redirect lands here.

Phase 3 re-run from the top again: every receipt line above holds.

**External review, pass 3:** 0 blockers, 7 notes.

1. **Note.** It claimed `/ft-close-epic` takes `--fast` too. → no change: false. `claude/commands/ft-close-epic.md:8` and its SKILL say "no `--fast`", so the paste-block's list (`/ft-task`, `/ft-micro-task`, `/ft-refactor`) is correct.
2. **Note.** UPGRADING is excluded from the sweep as "frozen", yet its intro carried live claims (updater "steps 1–5", current `/ft-update` behaviour). → the intro is cut to the recipes plus one MIGRATION pointer. The live claims stay in swept MIGRATION, so "frozen" is now true.
3. **Note.** VERSION-HISTORY is declared in `touches:` but unedited. → no change: the revert was deliberate (pass 2 #4) and goes on the recap's reconciliation line.
4. **Note.** `.github/workflows/ci.yml` is changed but undeclared. → no change: recorded on the recap's reconciliation line (a recorded fact, not a gate).
5. **Note.** The redirect title is not the exact v6.0.0-cited title. → the bold-lead now carries both exact recipe titles.
6. **Note.** The template and SPEC.md checklists now differ in length. → no change: by design. The operator's resolved scoping was "box title + short imperative; detail stays in SPEC", and SPEC §"The 4-phase workflow" is canonical.
7. **Note.** The CONTEXT-BUDGET ledger is stale. → no change, as pass 1 #6.

After the pass-3 edits: CI drift 15/15 again; the MIGRATION viz-runbook grep is still 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — updated: README (docs index + repo-layout `docs/` gloss gain UPGRADING; §Version cites it), AGENTS (both snippet guards name the comment, not a line; CONTRIBUTING gloss), MIGRATION and `claude/AGENTS-snippet.md` (targets), CONTRIBUTING (maintainer section), PLATFORMS (v5.x recipe pointer). No change: SPEC (its checklist stays canonical; the template is the shorter mirror by design), the codex/cursor/grok snippets (they cite the claude block by heading and MIGRATION §1.1, both unchanged; `ln -s` blocks untouched), CONVENTIONS, SECURITY (cites README#visualizer, which is unchanged), AGENT-NEUTRALITY (MIGRATION row names §1.2/§1.3/§1.6/§3, all still in place; CONTRIBUTING is not contract layer), CAPABILITIES, AGENT-COMPAT (cites §1.3), EXTERNAL-AGENTS (stable template headings and labels kept), WORKTREES, VISION; — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A for the always-loaded layer. Task-local: a label-preservation check must diff every bold token, not the first per line (review pass 2 #2); — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Cut the adopter-facing surfaces down to what an adopter needs and moved the rest to the files that own it. The paste-block every adopter keeps in `AGENTS.md` went from 6,438 to 3,697 chars (−43%), the tasknote template scaffolded into every task from 5,635 to 4,023 (−29%), and `docs/MIGRATION.md` from 67,250 to 56,647 (−16%).

- **Paste-block.** Feature bullets are now names + pointers, keeping one rule clause wherever an operator-visible constraint lives: `--unattended` parks and is never used with `--fast`, `/ft-refactor` never edits source, `/ft-seed` never writes unconfirmed, and the plan is never rewritten without a confirm. The two in-fence KEEP IN SYNC comments now sit in the single outside-fence guard, and both AGENTS.md guards cite that comment by name instead of a line number. The Visualizer section is a pointer to README.
- **Template.** Each box is a bold title plus a short imperative, with detail in SPEC §"The 4-phase workflow". All 25 boxes, every bold token, every heading and the EXTERNAL-AGENTS stable labels are kept, checked by diffing against HEAD.
- **MIGRATION.** §1.2.2 (maintainer wiring, plus "Machine-global installs: utilities only") moved to CONTRIBUTING.md §"Developing flaitron skills & commands". The v5.x→v6 and v4.x→v5 recipes moved to the new `docs/UPGRADING.md`. A bold-lead redirect carrying both exact titles keeps the immutable v5.0.0 / v6.0.0 tag-message citations landing. The Visualizer section is a pointer to README.
- **Citers repointed.** SPEC/layout.md, .gitignore, scaffold-bootstrap.md, the audit overlay (including its `description:`), ft-release standing-checks, ft-update, PLATFORMS, README, and one ci.yml comment.
- **Verification.** See Testing Notes. CI drift job 15/15 locally (Pair Q included); Pair F, the §1.6 derivation and the four platform-snippet diffs are clean; the updater suite passes 65/65; every Acceptance grep holds.
- **Review.** Three passes. Pass 1 had 2 blockers + 6 notes and pass 2 had 2 blockers + 6 notes, all over-cuts that dropped a rule or broke a guard. Pass 3 had 0 blockers + 7 notes. Every finding was fixed or recorded with a reason, one of them a false positive.
- **Deferred.** The CONTEXT-BUDGET ledger (snippet, template, MIGRATION, cold-start sum) goes to the next `/ft-release` refresh, as in .2–.4. The snippet's §"Bumping" paragraph still overlaps MIGRATION §"Pinning and bumping", outside this row's scope.
- **`touches:` reconciliation.** Declared 16, changed 16. Undeclared: `.github/workflows/ci.yml` (one Pair Q comment, review pass 1 #5). Declared but unchanged: `docs/VERSION-HISTORY.md` (edit reverted as a historical record, pass 2 #4).
- **Maintainability.** Every adopter's always-loaded layer carries about 2.7k fewer chars and every new tasknote about 1.6k fewer. Each restated contract now has one home (SPEC for semantics, README for the visualizer, CONTRIBUTING for maintainer wiring, UPGRADING for frozen recipes). No guard depends on a line number any more.

**Archived:** 2026-10-07
