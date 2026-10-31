---
title: runner-scope-guardrails
status: completed
tags: []
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-850, CORE-850.1, CORE-850.2, CORE-850.6, CORE-822]
touches:
  - SPEC/blocked.md
  - SPEC/gate-postures.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-task/step-3a-promote-starter.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/step-5-loop-mode.md
  - SPEC/loop.md
  - claude/skills/ft-task/micro-mode.md
  - SPEC/unattended-candidacy.md
  - docs/GATE-DISCIPLINE.md
  - docs/CONTEXT-BUDGET.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
blocked-by:
  - CORE-850.2
parallel-safe-with:
  - CORE-850.3
  - CORE-850.4
---

# CORE-850.5 | runner-scope-guardrails

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-850]]

## 🎯 Goal

Give the `--unattended` runner mechanical scope guardrails — an `out-of-scope` park when the diff leaves `touches:` or exceeds 400 lines, a Phase 3 👁️ decided by a confirmed deciding spec (else `visual-confirm`), and `drift` / `input-needed` park prose that states the operator's question — and record the admitted fourth carve-out form in GATE-DISCIPLINE with provenance.

## ✅ Acceptance

- [x] A1 `SPEC/blocked.md` closed set carries an `out-of-scope` row, and the cause count reads nine — `grep -q '^| \`out-of-scope\` |' SPEC/blocked.md && grep -q 'nine stop causes' SPEC/blocked.md`
- [x] A2 `SPEC/blocked.md` §"Park reason" requires `drift` / `input-needed` prose to state the operator's question — `grep -q 'states the question' SPEC/blocked.md`
- [x] A3 `SPEC/gate-postures.md` §"Scope guardrails" defines both checks (paths vs `touches:`, the 400-line cap), the two check points, the frozen `touches:`, and the `decided by` exception — `grep -q '^### Scope guardrails$' SPEC/gate-postures.md && grep -q '400' SPEC/gate-postures.md && grep -q 'decided by <command>' SPEC/gate-postures.md`
- [x] A4 Surface matrix has an `out-of-scope` row and the 👁️ row names the exception — `grep -q 'Parks \`out-of-scope\`' SPEC/gate-postures.md && grep -q 'confirmed deciding spec' SPEC/gate-postures.md`
- [x] A5 `unattended-mode.md` carries the conversion-map row and an executable §"Scope guardrails" — `grep -q '^## Scope guardrails$' claude/skills/ft-task/unattended-mode.md && grep -q '| \`out-of-scope\` |' claude/skills/ft-task/unattended-mode.md`
- [x] A6 The runner reaches the checks from the steps it walks: `SKILL.md` Phase 3 / Phase 4 and `step-3a-promote-starter.md` cite §"Scope guardrails" — `grep -c 'Scope guardrails' claude/skills/ft-task/SKILL.md` ≥ 1 `&& grep -q 'Scope guardrails' claude/skills/ft-task/step-3a-promote-starter.md`
- [x] A7 The agent-neutral procedure mirrors the guardrail and the exception — `grep -q 'Scope guardrails' SPEC/procedures/ft-task.md`
- [x] A8 `docs/GATE-DISCIPLINE.md` §"Refused carve-outs" admits the fourth form with provenance, plus a Rationalizations row and a Red Flag for the run-chosen variant — `grep -q 'CORE-850' docs/GATE-DISCIPLINE.md && test "$(grep -c 'decided by' docs/GATE-DISCIPLINE.md)" -ge 3`
- [x] A9 Budgets and drift hold (`gate-postures.md` ≤ 22,000; procedure ≤ 34,200) — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`
- [x] A10 Paper walk: an in-scope basis rendered row records `decided by`; a stray path parks `out-of-scope`; an incomplete basis parks `visual-confirm`; a promoted starter needing a new path parks `drift` — `judgment` (contract prose; no executable runner to drive)

## 🧩 Subtasks

- [x] `SPEC/blocked.md`: `out-of-scope` row, count, first-six paragraph, question-prose rule
- [x] `SPEC/gate-postures.md`: `### Scope guardrails`, matrix rows, 👁️ pointer, "six stop causes" wording; compress §"Pre-scaffold stops" to stay ≤ 22,000
- [x] `claude/skills/ft-task/unattended-mode.md`: map row + intro, 👁️ exception, `## Scope guardrails` executable steps, `input-needed` template phrased as a question
- [x] `claude/skills/ft-task/step-3a-promote-starter.md`: basis read + `touches:` ceiling under `--unattended`
- [x] `claude/skills/ft-task/SKILL.md`: Phase 3 / Phase 4 hooks (the attended `decided by` line was dropped at review pass 3)
- [x] `SPEC/procedures/ft-task.md`: mirror within 34,200 (trim restatement to fit)
- [x] `docs/GATE-DISCIPLINE.md`: fourth form admitted, rationalization row, red flags
- [x] `docs/CONTEXT-BUDGET.md`: ledger rows for the re-measured files
- [x] Phase 3: verify commands, drift checks, paper walk, `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-850]] — parent epic
- [[CORE-850.1]] — Discovery; Specification `.5` block and Clarifications 8 / 9 bind this child
- [[CORE-850.2]] — predecessor: readiness basis (`touches:`, `### Acceptance that decides it`, criterion (d))
- [[CORE-850.6]] — follow-up: publishes `out-of-scope` and the park-prose convention in the caller contract
- [[CORE-822]] — third refused carve-out form; this child admits a narrowed fourth beside it

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2`–`.4` closed; the runner still parks every rendered-surface row `visual-confirm` and has no scope fence, so a heavy row admitted on a basis would run unconfined. The PLAN line and `.1` Specification `.5` block match HEAD.

- [x] Read relevant source files — `claude/skills/ft-task/unattended-mode.md`, `SPEC/gate-postures.md`, `SPEC/blocked.md`, `docs/GATE-DISCIPLINE.md`, `SPEC/unattended-candidacy.md` §"Candidacy predicate" / §"Readiness basis" / §"Never autonomous", `SPEC.md` §"🧪 Phase 3" + §"Tasknote frontmatter" (`touches:`), `SPEC/procedures/ft-task.md` (unattended row, parking paragraph, Phase 3), `claude/skills/ft-task/step-3a-promote-starter.md`, `step-0-flags.md`, `SPEC/loop.md` §"Gate collapse", `docs/EXTERNAL-AGENTS.md` steps 1–6, `docs/CONTEXT-BUDGET.md` rows.

- [x] **Best Practices Review** — contract once in `SPEC/gate-postures.md` (new §"Scope guardrails"), executable steps in `unattended-mode.md`, hooks only where the runner walks (`SKILL.md` Phase 3/4, `step-3a`) — CORE-738's lesson: a stop living only in a lazy fragment is never reached. The procedure mirrors by pointer, not restatement.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Hits: gate-postures 46, unattended-mode 68, blocked.md 72, GATE-DISCIPLINE 17. Load-bearing: CORE-850.1 (Spec `.5`, Clarifications 8/9, assumption "basis confirmed `<date>`" = starter `created:`), CORE-850.2 (deferred to `.5`: read the basis as it stands at dispatch), CORE-850.3 (candidacy defers 👁️ handling to gate-postures §"Park conversions"), CORE-822 (third refusal, block shape to extend not rewrite), CORE-738 (hook stops from the walked steps; budget pressure on gate-postures + procedure), CORE-843 (lone-park commit skips when Phase 2 work is dirty).

- [x] **Drift check** — every cited path exists. Budgets: `gate-postures.md` 21,319 / 22,000 (681 left — must trim), `SPEC/procedures/ft-task.md` 34,198 / 34,200 (2 left — every addition offset by a trim), `ft-task/SKILL.md` 26,750 / 33,000. Promotion absorbs the starter block by default (`step-3a` step 5), so the basis must be read and logged at promotion — later in the run it is gone. `created:` survives promotion. No drift from the PLAN line.

- [x] Asked clarifying questions — answered 2026-10-31: (1) check before every Phase 3 entry **and** once more before closure (covers Phase 4 doc-drift edits); (2) on a promoted starter Phase 1 may narrow `touches:` but never widen it — a needed path outside is a `Re-scope`, parks `drift`; (3) the check applies to **every** `--unattended` run.

  Assumptions: the second check runs after Phase 4's doc-drift sweep and before its first closure flip (a check after the archive move could not park cleanly); "diff" = this run's own (working tree + untracked; under `--loop`, from the commit before its first iteration); workflow paths exempt from the path check are this note's active/archive paths, `.flaitron/PLAN.md`, `.flaitron/PLAN-ARCHIVE.md`, and a retired sidequest stub; lockfiles are matched by name pattern and generated files by `linguist-generated`; a miss never self-repairs (no revert, no `touches:` edit); the `decided by` exception needs the basis complete *at promotion*, its (d) command → 0 in this run's receipt; only that command decides — a Phase 1-added criterion or any run-chosen check decides nothing.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Fan-out echo: `blocked-by: [CORE-850.2]` (closed), `parallel-safe-with: [CORE-850.3, CORE-850.4]` (both closed).
- `out-of-scope` is a check, not a gate conversion: the "six gates" counts in `step-0-flags.md`, GATE-DISCIPLINE row 40, and the procedure stay true; the closed-set count in `SPEC/blocked.md` becomes nine.
- `SPEC.md` §"🧪 Phase 3" needs no edit: its 👁️ sentence points at the gate-postures flag row, which carries the exception.
- `docs/EXTERNAL-AGENTS.md` stable-surface rows for the code and the question prose are `.6`'s.
- Budget remedy for `gate-postures.md`: compress §"Pre-scaffold stops" (a near-verbatim duplicate of `unattended-mode.md` §"Pre-scaffold stops"), heading kept so the procedure's and `ft-file-task`'s citations hold.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: a closed-set row in `SPEC/blocked.md`; a `###` posture subsection + matrix rows in `gate-postures.md`; a map row + `##` executable section in `unattended-mode.md` (as CORE-738's open-siblings stop did); one-line hooks in the walked steps; a fourth block in GATE-DISCIPLINE's §"Refused carve-outs" in CORE-822's block shape

- [x] **Minimal refactor gate** — two trims, both for A9 (budget): `gate-postures.md` §"Pre-scaffold stops" compressed to a summary pointing at `unattended-mode.md` §"Pre-scaffold stops" (its near-verbatim twin; heading kept for its citers), plus three restatement cuts (the inherited-section quote, two "rows are in" pointers); the procedure's 👁️ paragraph lost one cue-vocabulary restatement

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: contract prose; drift checks and the self-test cover budgets, mirrors, and citations

**Implementation Notes:**

- `SPEC/blocked.md`: `out-of-scope` row; "nine stop causes"; the first-six paragraph names `out-of-scope` as a check; new **`drift` and `input-needed` prose states the question** paragraph with a worked example; both `drift — <what Discovery found>` templates gain ", and the question it puts".
- `SPEC/gate-postures.md` (21,319 → 21,991 / 22,000): 👁️ matrix cell names the exception; new matrix row; new `### Scope guardrails` (two checks, two check points, frozen `touches:`, promoted-starter ceiling, the `decided by` exception, no attended line, pointer to GATE-DISCIPLINE); 👁️ paragraph points at it; "six stop causes" → "stop causes".
- `unattended-mode.md`: map intro + eighth row; 👁️ exception pointer; `## Scope guardrails` with the git commands (`git diff --name-only HEAD` + untracked; `--numstat`; lockfile patterns; `git check-attr linguist-generated`), the park prose, no self-repair, the deciding-spec procedure; full-suite `input-needed` template now ends in a question.
- `step-3a-promote-starter.md`: under `--unattended`, log `Basis at promotion: …` (every (d) command) before the starter block can be absorbed; a non-empty starter `touches:` becomes a ceiling.
- `step-5-loop-mode.md`: guardrail hook at the cycle's verify step; Step 6 records `decided by` on a complete basis; the review-blocker template states the question. `SPEC/loop.md` §"Gate collapse": the complete-basis exception to the one-time park.
- `micro-mode.md`: Phase 3 and Phase 4 hooks (the `--micro` runner walks its own mapping).
- `SKILL.md` (26,750 → 27,101 / 33,000): Phase 3 hook, Phase 4 re-check after the doc-drift sweep, review-blocker template states the question.
- `SPEC/procedures/ft-task.md` (34,198 → 34,199 / 34,200): scope-guardrail pointer at Phase 3 entry and after the doc-drift sweep; 👁️ exception.
- `docs/GATE-DISCIPLINE.md`: intro now "four times … fourth admitted"; fourth block (who chose the check; what it covers; what stays refused; provenance CORE-850 / CORE-850.5 / 2026-10-31); rationalization row for the run-chosen spec; a pointer clause on the "probably fine" row; two red flags.
- `docs/CONTEXT-BUDGET.md`: ledger rows for `gate-postures.md` and the procedure.
- Downstream-impact: `.6` publishes `out-of-scope` and the question-prose convention in `docs/EXTERNAL-AGENTS.md` (already on its PLAN line); no other open row affected.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (pass 21)

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (markdown only; no viz code)

- [x] **Verification receipt** — below; the contract is defined once in gate-postures §"Scope guardrails", executable steps once in `unattended-mode.md`, and every other surface points at them

- [x] **External review** — seven `/code-review medium` passes, each returning blockers that were fixed in Phase 2 and followed by a Phase 3 re-run. The operator capped it at pass 7, so pass 7's fixes are unreviewed. Findings and dispositions are below.

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no rendered surface)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:

```text
A1 grep '| `out-of-scope` |' + 'nine stop causes' SPEC/blocked.md        → 1, then 0
    first run: "nine" wrapped onto the line above "stop causes"; rewrapped
A2 grep -q 'states the question' SPEC/blocked.md                         → 0
A3 grep '### Scope guardrails' + '400' + 'decided by <command>' gate-postures → 0
A4 grep 'Parks `out-of-scope`' + 'confirmed deciding spec' gate-postures  → 0
A5 grep '## Scope guardrails' + '| `out-of-scope` |' unattended-mode.md    → 0
A6 grep -c 'Scope guardrails' SKILL.md → 2; grep -q … step-3a            → 0
A7 grep -q 'Scope guardrails' SPEC/procedures/ft-task.md                  → 0
A8 grep -q 'CORE-850' + grep -c 'decided by' ≥ 3 docs/GATE-DISCIPLINE.md  → 0 (3)
A9 bash tools/drift-checks.sh                                             → 0 (context_budget ok)
   node --test tools/drift-checks.test.mjs                                → 0 (pass 21, fail 0)
```

Paper walk (A10, judgment). A rendered-surface row is promoted from a starter whose `touches:` is `[web/src/Header.tsx, e2e/header.spec.ts]` and whose (d) criterion is `npx playwright test e2e/header.spec.ts`, asserting the new logo renders at `/`:

- **In scope.** At promotion, step-3a logs `Basis at promotion: complete — (d) npx playwright test e2e/header.spec.ts` and `Scope at promotion: web/src/Header.tsx, e2e/header.spec.ts`. Phase 2 edits the two files (~60 lines). At Phase 3 entry, the paths and size checks are clear. The receipt shows the (d) command `→ 0`. The 👁️ box reads `decided by npx playwright test e2e/header.spec.ts — basis confirmed <created:>`, and nothing parks. After the doc-drift sweep (no change), the re-check is clear and closure proceeds. **Records `decided by`.**
- **Stray path.** Phase 2 also edits `web/src/Footer.tsx`, so the Phase 3 entry check parks `out-of-scope — web/src/Footer.tsx outside touches`. The lone-park commit skips because the Phase 2 work is dirty, and the note is left uncommitted. Variant: the doc-drift sweep edits `README.md`, so the post-sweep re-check parks before any closure flip. **Parks `out-of-scope`.**
- **Over the cap.** A 520-line `Header.tsx` rewrite gives `out-of-scope — 520 lines against the 400 cap`. A regenerated `package-lock.json` does not count.
- **Incomplete basis.** One (b) criterion is marked `judgment`. Promotion logs `incomplete — (b)`. The scope checks still run, since every `--unattended` run takes them, and the 👁️ item parks `visual-confirm`. **Parks `visual-confirm`.**
- **Needs a new path.** Discovery finds `web/src/theme.ts` must change. The logged `Scope at promotion` is the ceiling (and the path check reads it, so widening the frontmatter would not pass anyway), so this is a `Re-scope`: `drift — the header change needs web/src/theme.ts outside the confirmed touches; widen the starter's scope or split the theme change?`. **Parks `drift`**, and the prose ends in the operator's question.
- **`--loop --unattended`.** The guardrails run at step 3 of each cycle, before that cycle's commit, over the working tree plus each `committed <sha>` the `## 🔁 Iterations` log lists. A stray path in cycle 3 parks `out-of-scope` even though cycles 1 and 2 already committed, and a loop resumed after unrelated commits landed counts only its own. On convergence, a complete-basis row records `decided by` at Step 6 with no ask.
- **Attended `[unattended]` row, no flag.** `--fast` is implied, so 👁️ is suppressed and the present operator owns the look. No basis is logged and no `decided by` line is written: the line asserts confinement, and only the `--unattended` checks enforce it.

External review (`/code-review medium`, working-tree diff only):

- **Pass 1: 1 blocker and 9 notes.**
  - **Blocker, fixed.** Under `--loop`, Phase 2/3 are replaced by `step-5-loop-mode.md`, which never called the guardrails, so A6 was unmet for loop runs. Fixed with a hook at loop step 3 and the loop base derived from `## 🔁 Iterations` (`<first committed sha>^`), with no new record. `touches:` was widened to `step-5-loop-mode.md`. Phase 3 then re-ran from the top.
  - Note, fixed: a `[light]` starter with no `touches:` would have an empty ceiling and always park. It now sets no ceiling, and Phase 1 declares one as on a fresh scaffold (step-3a).
  - Note, fixed: GATE-DISCIPLINE overclaimed that the run "neither chooses the check". It now says the run may write the spec, the assertion is the operator's, and the external review grades the spec against the stated words, so a weaker spec is a blocker.
  - Note, fixed: `/ft-close-epic --unattended` loads the shared fragment but never calls the checks. Both texts now say every *`/ft-task`* unattended run, and that `/ft-close-epic` does not run them.
  - Note, fixed: binary files count 0 lines (numstat `-`), but their path still faces the path check.
  - Note, fixed: with several (d) criteria, the log now lists every (d) command and all must be `→ 0`.
  - Note, fixed: the date is `<starter created: date>` in all three files. Promotion keeps `created:`.
  - Note, fixed: the compressed §"Pre-scaffold stops" said "nothing to park" ahead of an exception list. It now says each stop writes nothing, and that a late skill/pin stop names what it wrote. The model-mismatch exception is unchanged.
  - Note, no change: the doc-drift-sweep re-check parking on an AI-referenced doc outside `touches:` is the operator's Discovery Q1 choice. That park is the intended outcome; the resume is attended.
  - Note, deferred by plan: `docs/EXTERNAL-AGENTS.md` step 4 (exhaustive codes) is [[CORE-850.6]]'s PLAN line, which publishes `out-of-scope`.
- Re-run after fixes: A1–A8 → 0. `bash tools/drift-checks.sh` → 0. `node --test tools/drift-checks.test.mjs` → 0. `gate-postures.md` was then at 21,953 / 22,000, and the procedure at 34,195 / 34,200.
- **Pass 2 — 3 blockers, 7 notes; all fixed.**
  - Blocker: the attended `[unattended]` `decided by` line skipped the confinement it asserts. It now runs both checks as a read first and is written only when they pass (gate-postures + unattended-mode).
  - Blocker: a resumed `--loop` diffed from `<first sha>^`, which swept in unrelated commits that landed after a park. The diff is now the working tree plus each `committed <sha>` listed in `## 🔁 Iterations`, never a range.
  - Blocker: a `--loop` run never reached the `decided by` path. `step-5-loop-mode.md` §"Step 6" now records it on the 👁️ box (a complete basis has no taste criteria to split out).
  - Note fixed: a closure filing (`/ft-file-task --park` / `--starter`) writes new `.flaitron/sidequest/` / `tasknote/` paths. The workflow paths are now `PLAN.md`, `PLAN-ARCHIVE.md`, and anything under `tasknote/` or `sidequest/`.
  - Note fixed: the `input-needed — <the blocker>` templates in SKILL.md, unattended-mode.md, and gate-postures now read `<the blocker, and the question it puts>`. The close-epic clarification park is outside `touches:`, and `SPEC/blocked.md`'s rule still governs it.
  - Note fixed: the compressed §"Pre-scaffold stops" now says each stop "writes nothing further", and that a late skill/pin stop names what it wrote. The old "reverts" clause disagreed with the guard paragraph in SKILL.md ("make no further write"); the compression follows the guard.
  - Note fixed: the procedure's post-sweep retake now sits on its Phase 4 step 1 (CORE-738's lesson), not as a Phase 3 clause.
  - Note fixed: `--no-renames` on every diff, so a move out of scope lists its source.
  - Note fixed: the glob dialect is named as git pathspec `:(glob)`: `*` stops at `/`, and `**` crosses it.
  - Note fixed: the tasknote byte figures now match the files and the ledger.
- Re-run after the pass-2 fixes: A1–A8 → 0. `bash tools/drift-checks.sh` → 0. `node --test tools/drift-checks.test.mjs` → 0. `gate-postures.md` is at 21,972 / 22,000, and the procedure at 34,200 / 34,200.
- **Pass 3: 5 blockers and 4 notes; all fixed.**
  - Blockers #1, #4, #7: the attended `[unattended]` `decided by` line. SKILL.md wrote it without the scope precondition, Phase 1 could widen `touches:` on that path, and the matrix omitted it. **Resolved by dropping the attended line** (a `.1` Specification extra, not on the PLAN line). It asserts confinement, which only the `--unattended` checks enforce, and a present operator owns the look. It is gone from gate-postures, unattended-mode, SKILL.md, and step-3a (the basis log is now `--unattended` only). Recorded as a deviation from `.1` in the recap.
  - Blocker #2: in loop Step 6, the `decided by` hook sat inside the park item. It now runs ahead of the numbered items, and a complete basis leaves item 1 nothing to ask.
  - Blocker #3: `SPEC/loop.md` §"Gate collapse" now states the complete-basis exception (`touches:` widened to it).
  - Note fixed: the loop review-blocker `input-needed` template now states the question.
  - Note fixed: the workflow paths carry the `.flaitron/` prefix on all four entries in gate-postures.
  - Note fixed: the paper walk and Implementation Notes now match the current contract.
  - Note fixed: the lockfile patterns gain `*.lock.json` and `npm-shrinkwrap.json`.
- **Pass 4: 2 blockers and 8 notes.**
  - Blocker, fixed: `--micro --unattended` never reached the checks. `micro-mode.md` Phase 3 and Phase 4 are now hooked (`touches:` widened).
  - Blocker, fixed: an unconfirmed basis could decide the 👁️. The exception now also requires the row to carry `[unattended]`, the operator's mark. Starters are only ever filed attended (`--starter` refuses `--unattended`) or by hand, and a hand edit carries the token's trust.
  - Note, fixed: `git check-attr` prints `true` for `linguist-generated=true`. The check now accepts `set` or `true`.
  - Note, fixed: the loop Step 6 paragraph now defers to every condition in "The deciding spec", and item 1 still parks a split-out criterion.
  - Note, fixed: a miss at the post-sweep check now unticks and strikes a `decided by` line before parking.
  - Note, fixed: GATE-DISCIPLINE now cites SPEC.md's existing blocker rung ("verify command passed without deciding it") for the weak-spec case. No new reviewer instruction is needed.
  - Note, no change: the doc-drift-sweep re-check parking on a doc outside `touches:` is the operator's Q1 choice (same as pass 1).
  - Note, no change: the procedure's 👁️ clause dropped "runs the lone-park commit, and stops", which only restated its §"Parking, in one paragraph"; that paragraph governs every park.
  - Note, no change: non-Claude runners reach the loop hook and the basis log through `step-5-loop-mode.md` and `step-3a`, which the procedure already delegates to.
  - Note, no change: the procedure sits at exactly 34,200 / 34,200, which is within budget, and the line-242 snapshot is release-time. The zero headroom is flagged under Learnings.
- **Pass 5: 3 blockers and 7 notes.**
  - Blocker, fixed: the starter's confirmed scope was not recorded anywhere, so Phase 1 could widen the frontmatter and the path check would read the widened list. step-3a now logs `Scope at promotion: …`, and the path check reads that line.
  - Blocker, fixed: the workflow-path exemption covered every tasknote and stub, archived history included. It is now this note, its archive path, the two PLAN files, and only *new* files under `tasknote/` / `sidequest/` (a closure filing, or this ID's retired stub as a deletion).
  - Blocker, fixed: under `--loop`, size summed per-commit churn. It is now net `git diff --numstat <base> -- <tracked paths>`, with the paths still drawn only from this task's commits.
  - Note, fixed: the procedure's 👁️ clause said "(same section)", which pointed at cue-vocabulary. It now cites gate-postures explicitly; the Phase 3 entry pointer reads "(cited below)", and the remaining cue restatement is cut.
  - Note, fixed: `SPEC/loop.md` defers to the gate-postures conditions instead of asserting `decided by`, and says split-out criteria still park.
  - Note, fixed: `decided by` now also requires an External review that ran (never `N/A`), stated in both the contract and the fragment, since that review is the backstop against a weakened spec.
  - Note, fixed: untracked files are measured by `git diff --no-index --numstat /dev/null <path>` alone (binary `-` → 0), replacing `wc -l` plus a separate probe.
  - Note, fixed in part: the five per-mode hooks stay (CORE-738's pattern), but the fragment now states the rule as "at Phase 3 entry, whatever its mode" and that a new mode replacing Phase 3 must add a hook.
  - Note, no change: `basis confirmed <starter created: date>` is `.1`'s stated assumption ("reads the starter's `created:`"). A later confirmation date has no recorded field to read.
  - Note, no change: the doc-drift-sweep re-check is the operator's Q1 choice (third raise).
- **Pass 6: 4 blockers and 6 notes.**
  - Blockers #1 and #2, fixed: the `decided by` path needs the External review, but loop Step 6 and the micro/SKILL hook wording settled the 👁️ before it. The fragment now says "always after the External review, whatever the mode". Loop Step 6 settles it after item 2, and the micro and SKILL hooks say the same. The plain template already orders the review before the 👁️ box.
  - Blocker #3, fixed: the claim that Phase 2 work is uncommitted, so the park skips its commit, was false under `--loop`. The park recipe's own porcelain read decides.
  - Blocker #4, fixed: pass 5's net range re-admitted foreign commits on a resumed loop. Size is now a per-commit sum (never a range). Churn across cycles counts each time, which is conservative: an over-park costs one resume.
  - Note, fixed: the workflow-path exemption is now limited to notes and stubs this run's `/ft-file-task` filing created, plus the promoted ID's stub deletion.
  - Note, fixed: `git diff --no-index` exits 1 on any non-empty file, which is expected.
  - Note, fixed: subtask 5's text no longer promises the dropped attended line.
  - Note, no change (repeat): the procedure's lone-park and stop steps are governed by its §"Parking, in one paragraph".
  - Note, no change (repeat): the doc-drift re-check is the operator's Q1 choice.
  - Note, no change (repeat): the `created:` date is `.1`'s assumption.
- Re-run after the pass-6 fixes: A1–A8 → 0. `bash tools/drift-checks.sh` → 0. `node --test tools/drift-checks.test.mjs` → 0.
- **Pass 7 — 3 blockers, 7 notes; fixed per the operator's call ("one more pass, then decide"), closed without pass 8 — these fixes are unreviewed.**
  - Blocker #2: SKILL.md / micro prose order the 👁️ before the External review; the fragment's conversion text now settles the 👁️ after the review whatever order the mode's prose lists.
  - Blocker #3: the contract lacked the promoted-stub deletion the fragment exempts; added (with a trim to stay in budget).
  - Blocker #4: lockfile patterns now match on basename at any depth (`*` stops at `/` would have missed nested lockfiles).
  - Note fixed #1: the basis log now copies each (d) criterion verbatim (assertion + command), and the review grades against that logged wording — Phase 1 already may not reword them (step-3a).
  - Note fixed #5: `SPEC/unattended-candidacy.md` pointer → gate-postures §"Scope guardrails" (`touches:` widened).
  - Note fixed #6: `blocked.md` row names the logged scope, not only the note's `touches:`.
  - Note fixed #9: procedure restores "Still inline prose, **not** a banner." (34,199 / 34,200).
  - Note no change #7: an attended promotion later resumed `--unattended` has no log → falls back to the note's `touches:` (operator-witnessed widening) and the exception cannot fire, so the 👁️ parks — the conservative outcome.
  - Note no change #8: doc-drift re-check — operator's Q1 (fifth raise).
  - Note no change #10: §"Refused carve-outs" keeps its title — six citers point at it; its intro now says four forms, one admitted. Candidate for the `.N` audit.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `claude/CAPABILITIES.md`: the `--unattended` row gains the scope guardrail and the deciding-spec exception. No change: `README.md` (the posture bullet stays high-level), `AGENTS.md`, `SPEC.md` (its 👁️ sentence points at the gate-postures flag row, which carries the exception), `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (its row already lists gate-postures and GATE-DISCIPLINE), `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` (no runtime, validator, or new cue), and `docs/EXTERNAL-AGENTS.md` (its stable-surface rows for `out-of-scope` and the question prose belong to [[CORE-850.6]]).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. Two notes for this repo. (1) `SPEC/procedures/ft-task.md` sits at 34,199 / 34,200 and `gate-postures.md` at 21,991 / 22,000, so the next edit to either must extract, not trim. (2) A run-time contract with many modes (plain, `--loop`, `--micro`, attended, procedure) kept surfacing per-mode gaps across review passes. The fix was to state the rule once ("at Phase 3 entry, whatever its mode"; "the 👁️ after the External review, whatever order the prose lists") rather than patch each mode.

**Final Summary:**

**What changed.** An `--unattended` `/ft-task` run is now confined to its note's scope by two mechanical checks over its own diff:
- every changed path matches `touches:`, or the starter's `touches:` logged at promotion;
- lines added plus deleted stay at or under 400 (lockfiles, `linguist-generated`, and `.flaitron/` excluded).

The checks run at every Phase 3 entry, whatever the mode, and again after Phase 4's doc-drift sweep. A miss parks with the new closed-set code `out-of-scope` (`SPEC/blocked.md`, now nine codes). `touches:` is fixed at Phase 1 exit, and a promoted starter's scope may narrow but never widen; widening is a `Re-scope` → `drift`.

The Phase 3 👁️ is settled by `decided by <command> — basis confirmed <starter created: date>`, with no park, only when all of these hold:
- the row carries `[unattended]`;
- the basis logged at promotion is complete, (d) included;
- every (d) command passed;
- both checks are clear;
- the External review ran, not `N/A`.

Otherwise it parks `visual-confirm` as before. `drift` / `input-needed` prose now ends with the operator's question. `docs/GATE-DISCIPLINE.md` records this as the admitted fourth carve-out, with provenance CORE-850 / CORE-850.5 / 2026-10-31, a rationalization row, and two red flags; the three earlier refusals stand.

**Deviation from `.1`.** The `.1` Specification had an attended `[unattended]` run (implied `--fast`) record the same `decided by` line. Dropped at review pass 3: the line asserts confinement that only the `--unattended` checks enforce, and a present operator owns the look anyway.

**Verification.** A1–A9 → 0, and A10 was met by a paper walk with seven scenarios (Testing Notes). `bash tools/drift-checks.sh` → 0. `node --test tools/drift-checks.test.mjs` → 0 (pass 21).

**Review.** Seven `/code-review medium` passes (blockers per pass: 1, 3, 5, 2, 3, 4, 3), all fixed. At the operator's call, it closed after pass 7, so **pass 7's fixes are unreviewed**: the 👁️-after-review ordering line, the stub-deletion exemption in the contract, basename lockfile matching, verbatim (d) logging, the candidacy pointer, the `blocked.md` row wording, and the restored procedure sentence. Recurring notes kept by decision:
- the post-sweep re-check parks on a doc outside `touches:` (operator Q1);
- the stamp reads the starter's `created:` (`.1` assumption);
- §"Refused carve-outs" keeps its title.

**Refactors.** `gate-postures.md` §"Pre-scaffold stops" compressed to a summary pointing at `unattended-mode.md` (its twin), plus restatement cuts, for the 22,000 budget. One cue-vocabulary restatement was cut from the procedure.

**`touches:` reconciliation.** `git diff --name-only` names 14 paths, all declared. `touches:` was widened during the run to `step-5-loop-mode.md`, `SPEC/loop.md`, `micro-mode.md`, `SPEC/unattended-candidacy.md`, and `claude/CAPABILITIES.md`, each recorded where it happened.

**Maintainability.** The rule is stated once in the contract and once in executable form. Five mode hooks point at it, and the fragment says a new mode replacing Phase 3 must add one. Budgets are at their edge (Learnings).

**Next.** [[CORE-850.6]] publishes `out-of-scope` and the question-prose convention in `docs/EXTERNAL-AGENTS.md`.

**Archived:** 2026-10-31
