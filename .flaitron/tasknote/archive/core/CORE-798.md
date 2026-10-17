---
title: prep-guard-wording
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: [CORE-797, CORE-799, CORE-EPIC-783]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/unattended-candidacy.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-798 | prep-guard-wording

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-797]]

## 🎯 Goal

Tighten `SPEC/unattended-candidacy.md` §"Preparing declined rows" so a pin clears a clause-3 cue only when an existing test command decides the result that cue stood for (a generic runner or a path-tripped keyword stays), and a split's mechanical row never uses the person act's result.

## ✅ Acceptance

- [x] The Pin bullet covers any clause-3 decline a test can stand in for (a look or a manual check, cue or no cue), not only a visual phrase, and requires a test command that *decides* that check — `grep -q 'decides'` on the Pin bullet (extracted with `awk '/^- \*\*Pin\.\*\*/{p=1} /^- \*\*Split\.\*\*/{p=0} p'`)
- [x] A generic runner that only exists is named as not a pin — `grep -q 'generic runner'` on the Pin bullet
- [x] A keyword that trips on a path or a name is not cleared by rewording it, and that row stays with the path named in its reason — `grep -q 'trips on a path'` on the Pin bullet, `grep -q 'trips only on a path'` on the Stay bullet + `judgment` (the reading is the deliverable)
- [x] The Split bullet forbids a mechanical row that uses the person act's result or depends on its order, and a failed split stays — `grep -q "person act's result"` and `grep -q 'before, after, or'` on the Split bullet (extracted the same way, Split → Stay)
- [x] The edit stays inside §"Preparing declined rows". The skill body is not edited, because it restates nothing (it Reads the section). Clause 3 and its keyword list are unchanged — `git diff --stat` names only the SPEC file (plus workflow files); `git diff -U0 SPEC/unattended-candidacy.md` hunks all fall inside §"Preparing declined rows"
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the Pin bullet: any clause-3 decline a test can stand in for, a deciding command (not a generic runner), a path-tripped keyword not cleared by rewording
- [x] Extend the Split bullet: the mechanical row never uses the person act's result and is correct before, after, or without the act; a slice that fails is not a split
- [x] Re-read the Stay bullet for consistency (its "true look" definition already says "decides")
- [x] Run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-797]] — predecessor: the dry-run that surfaced G1 (pin guard) and G2 (split guard)
- [[CORE-799]] — sibling follow-up: G3 + G4, the split mechanics in the skill's Step 2 (out of scope here)
- [[CORE-EPIC-783]] — the epic that wrote §"Preparing declined rows" ([[CORE-783.2]] clause 3 two layers, [[CORE-783.3]] the skill)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The section shipped today in v7.1.0. The CORE-797 dry run found the guards held only because the walker read the whole section; the Pin and Split bullets alone let a generic runner clear a 👁️ cue (G1) and let a mechanical row consume the person act's result (G2). One SPEC section, two bullets.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (full), `claude/skills/ft-prep-unattended/SKILL.md` (full), `.flaitron/tasknote/archive/core/CORE-797.md` (full)

- [x] **Best Practices Review** — N/A: prose contract edit, no module boundary. Single-source rule holds: the skill Reads the section and says "Do not restate it here", so the fix lands only in the SPEC.

- [x] **Archive skim** — `<area>` is `archive/core/` (README table, `CORE-*`). Hits for the section: [[CORE-783.1]] (decision table: "A visual phrase may be rewritten only when an existing test command is named" — the wording this task tightens), [[CORE-783.2]] (clause 3 two layers; "do not add visual or raster keywords"), [[CORE-783.3]] (skill restates no clause), [[CORE-783.N]], [[CORE-797]] (G1/G2 evidence). Nothing contradicts the tightening; the 783.1 wording was "named", and this task makes it "decides".

- [x] **Drift check** — PLAN line matches the SPEC's Pin and Split bullets (pre-edit). The "true look" definition in the Stay bullet already says "decides", so the Pin bullet is the inconsistent one. No other file restates the Pin or Split rule: `grep` for the section across non-archive markdown hits only pointers (AGENTS-snippet, GLOSSARY, EXTERNAL-AGENTS, task-line-segments, the skill). `unattended-candidacy.md` has no Budgets-table row (unbudgeted lazy module; ledger is release-refreshed), so no cap applies.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) "A clause-3 cue" covers glyphs and keywords alike. In practice only a visual or *manual*-style cue can be cleared by a test; credential, deploy, and the rest already stay. (2) "A path-tripped keyword stays" means the row stays declined. The skill does not reword a path to dodge the screen, because doing so removes no person. (3) "Consumes the person act's result" includes ordering: a slice that must wait for the person act is not clean either (NAS-11.8's chmod). (4) CORE-799's G3/G4 mechanics stay out of scope.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

G1 evidence (CORE-797): project-19 FE-486.5 — `npm run test:e2e` exists, but no spec decides the inset look. project-10 CORE-EPIC-2.3 and project-11 NAS-13 — `migration` trips on a path (`migrations/0001`, `docs/MIGRATION.md`); rewording would clear clause 3 with no person removed.

G2 evidence: AL-017 (a pass1.tsv edit that depends on a Scholar authorship answer), AL-022, NAS-11.8 (chmod before Project-17's runbook edit), NAS-15.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the two existing bullets in place. The "decides" wording is the same as the Stay bullet's "true look" definition, so the Pin and Stay bullets now use one test. The section keeps its short-sentence register.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  The Pin and Split bullets changed, and the Stay bullet gained one stay reason: the path-tripped keyword, moved there from the Pin bullet after the second review. Clause 3 and the skill body are untouched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose contract; no drift check binds the bullet text (the skill Reads the section and restates nothing)

**Implementation Notes:**

- **Pin.** A pin may rewrite the words behind a clause-3 decline only when those words stand for a check a test can make: a look or a manual check, with or without a cue. That scoping keeps credentials, deploy, and the rest with the Stay bullet. The pin must also name an existing command that *decides* the check, meaning it tests that result itself and not a nearby one. Two rewrites are not pins: a generic runner that only exists (G1, project-19 FE-486.5), and rewording a keyword that trips on a path or a name (G1, project-10 CORE-EPIC-2.3, NAS-13). A generic-runner row falls to split or stay. A path-tripped row has no person act to split off, so the Stay bullet holds it, and its reason names the path for a hand edit. That stay reason sits in the Stay bullet with the others.
- **Split.** The mechanical row never uses the person act's result: an answer, a value, or a state the act leaves behind. Its test is "correct before, after, or without the act", which also covers ordering (G2: AL-017, NAS-11.8). A slice that fails has not "separated cleanly", which ties the bullet to the preference line, and the row stays.
- The wording avoids "wait for", because CORE-797 G3 notes that clause 6 already sequences an epic's mechanical `.k` after its remainder. That ordering belongs to CORE-799, and this bullet is about substance.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only

- [x] Ran lint/type-check on changed code — N/A: markdown only. `bash tools/drift-checks.sh` → exit 0

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (final run, after review round 3). `$P`, `$SP`, and `$ST` are the Pin, Split, and Stay bullets, extracted from §"Preparing declined rows" with `awk`:

- `grep -q 'decides' <<<"$P"` → 0
- `grep -q 'generic runner' <<<"$P"` → 0
- `grep -q 'trips on a path' <<<"$P"` → 0; `grep -q 'trips only on a path' <<<"$ST"` → 0
- `grep -q "person act's result" <<<"$SP"` → 0; `grep -q 'before, after, or' <<<"$SP"` → 0
- `git diff --stat` → only `SPEC/unattended-candidacy.md` (23+/11−). `git diff -U0` hunks @176, @188, and @196 all fall inside the section (164–211). The skill body and clause 3 are unchanged.
- `bash tools/drift-checks.sh` → 0
- No section line is over 76 columns: `awk 'length>76'` → 0 lines

Structural: no duplication, because the rule stays in one place and the skill Reads it. No dead text. No stale doc, because every other citer is a pointer to the section heading, and the heading is unchanged.

External review: `/code-review medium` on the working-tree diff, three rounds.

- **Round 1 (10 findings). Blockers, fixed, then back to Phase 2:** (a) the Pin bullet let a "deciding" test clear deploy and credential keywords, so it is now scoped to a look or a manual check; (b) a semantic-only decline escaped the guard, so the bullet now also covers "a phrase that reads as one"; (c) "Add a fact" did not license a rewrite, so the bullet now says "may rewrite the words"; (d) ordering was not covered, so the test is now "correct before, after, or without the act". **Notes, fixed:** "the row stays" skipped split, and the antecedent was ambiguous (both reworded); "that result" was loose (reworded); a path-tripped row needed a hand-edit pointer (added); one Acceptance grep passed vacuously (scoped to the bullet); line refs in Discovery were stale (removed).
- **Round 2 (8 findings). Blockers, fixed, then back to Phase 2:** (a) "split or stay" let a path-tripped row split with no person act to split off, so it now goes to the Stay bullet; (b) a failed split did not route anywhere, so it now says "the row stays". **Notes, fixed:** the "decides" rule was stated three times (trimmed to one); stay reasons were scattered (the path case moved into the Stay bullet). **Note, no action:** round 2 finding 3 is the case where the remainder depends on the mechanical row. That is CORE-799's G3 ordering inversion, and "before, after, or without" already rejects NAS-11.8's chmod. Two findings were read from a stale copy of the tasknote and were already fixed.
- **Round 3 (6 findings, no blockers). Notes, fixed:** the Implementation Notes were stale about the Stay bullet (corrected); a pin that leaves another clause-3 trip achieves nothing ("A pin leaves no other clause-3 trip on the row, or it is not a pin"); the ban on rewording a path versus the operator's hand edit was unclear ("so the skill does not do it"); the ordering half of the criterion had no grep (`before, after, or` added); two lines were overlong (reflowed). **Note, no action:** the generic-runner case has no split/stay tiebreak inside the Pin bullet. The class bullets are read together, and the Split bullet's test decides it by construction.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`SPEC/unattended-candidacy.md` §"Preparing declined rows" now carries both CORE-797 guards in the bullet text. A walker no longer has to read the whole section to apply them.

- **Pin.** A pin may rewrite the words that ask for a look or a manual check, whether a cue or a phrase that reads as one. It may do so only when it names an existing test command that *decides* that check. A generic runner that merely exists is not enough. Rewording a path-tripped keyword is not a pin, and a pin must leave no other clause-3 trip on the row.
- **Split.** The mechanical row never uses the person act's result. It must be correct before, after, or without the act; otherwise the row stays.
- **Stay.** The Stay bullet gains the path-tripped keyword row. Its reason names the path, for a hand edit.

One file changed (23+/11−). Clause 3, its keyword list, and the skill body are unchanged. Three `/code-review medium` rounds were run: six blockers were fixed across rounds 1–2, and round 3 found none. `bash tools/drift-checks.sh` exited 0.

Doc-drift sweep: no change to any entry. `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, and `docs/VISION.md` either do not cite the section or cite it by heading only, and the heading is unchanged.

`touches:` reconciliation: declared `SPEC/unattended-candidacy.md`. The diff is that file plus `.flaitron/PLAN.md` and this note's archive move, which are workflow files. Nothing undeclared changed.

Maintainability: the rule still lives in one place, and the Stay bullet now holds every stay reason the section produces. `unattended-candidacy.md` grew by about 700 bytes. It has no Budgets-table row, and the ledger figure is refreshed at release.

Learnings: N/A. This is a contract refinement inside a lazy module, with nothing for the always-loaded layer.

**Archived:** 2026-10-15
