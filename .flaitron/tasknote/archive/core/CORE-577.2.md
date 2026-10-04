---
title: candidacy-contract
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.1, CORE-494, CORE-536, CORE-551, CORE-543, CORE-546]
touches:
  - SPEC/unattended-candidacy.md
  - SPEC.md
  - SPEC/layout.md
  - README.md
  - AGENTS.md
  - docs/EXTERNAL-AGENTS.md
  - docs/CONVENTIONS.md
  - .github/workflows/ci.yml
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
---

# CORE-577.2 | candidacy-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-577]] · [[CORE-577.1]]

## 🎯 Goal

Write the lazy `SPEC/unattended-candidacy.md` module — the recommend-never-write rule, the conservative predicate, the three postures, and the Final-Summary persistence hook — point `SPEC.md` §"Task-line format" and `docs/EXTERNAL-AGENTS.md` step 2 at it, and bind every future filer to it with a CI `drift` step so the `.3`–`.6` children have one contract to mirror.

## ✅ Acceptance

- [x] `SPEC/unattended-candidacy.md` exists in the canonical lazy-module shape (`paths: []` frontmatter + `> Lazy-loaded SPEC module.` preamble) and carries the four named sections: recommend-never-write rule, candidacy predicate, three postures (attended / `--fast` / `--unattended`), persistence hook — `grep -c '^## ' SPEC/unattended-candidacy.md` ≥ 4 and `head -3` shows `paths: []`
- [x] The `unattended-candidates:` emission shape and the labeled-mirror label shape are fixed in the module so children mirror one string, not a paraphrase — `grep -q 'unattended-candidates:' SPEC/unattended-candidacy.md`
- [x] `SPEC.md` §"Task-line format" carries a one-paragraph pointer to the module and stays under its 57,000-char budget — `grep -q 'SPEC/unattended-candidacy.md' SPEC.md && [ "$(wc -c < SPEC.md)" -lt 57000 ]`
- [x] `docs/EXTERNAL-AGENTS.md` step 2 cites the module — `grep -q 'unattended-candidacy' docs/EXTERNAL-AGENTS.md`
- [x] CI `drift` step exists, is lifted from a new §7.1 Pair N in `step-7.1-mirror-pairs.md`, and Pair L binds it — `bash` the Pair N block locally → exit 0; run the Pair L block locally → prints nothing
- [x] Module enumeration sites updated (`SPEC/layout.md` frontmatter list, `README.md` `SPEC/` bullet, `AGENTS.md` `SPEC/` bullet) — `grep -l 'unattended.\{0,3\}candidacy' SPEC/layout.md README.md AGENTS.md` lists all three (pattern widened at Phase 3: the `AGENTS.md` bullet is topical prose, so it reads `` `[unattended]` candidacy ``, matching its siblings "the purpose blurb, superseded claims")
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" names the new lifted pair — `grep -q 'Pair N\|N)' docs/CONVENTIONS.md` — `judgment`: prose roster, checked by reading
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — `judgment`

## 🧩 Subtasks

- [x] Write `SPEC/unattended-candidacy.md` (rule · predicate · postures · emission shape · persistence · surfaces + mirror label · bounds)
- [x] Add the pointer paragraph to `SPEC.md` §"Task-line format" (after the `[unattended]` table row's "Flowtron itself never writes it" sentence, or as a short paragraph below the examples)
- [x] Cite the module in `docs/EXTERNAL-AGENTS.md` step 2
- [x] Add `unattended-candidacy` to the lazy-module enumerations: `SPEC/layout.md`, `README.md`, `AGENTS.md`
- [x] Mint §7.1 **Pair N** in `claude/skills/ft-release/step-7.1-mirror-pairs.md` (labeled-mirror + literal check with a fenced `sh` block) and add its row to Pair L's mapping; update Pair L's "six lifted checks" count and Pair K's "(A, B, C, E)" aside
- [x] Lift Pair N into `.github/workflows/ci.yml` `drift` job as a `- name: Pair N — …` + `run: |` step
- [x] Update `docs/CONVENTIONS.md` §"GitHub Actions CI" lifted-pair roster
- [x] Phase 3: run Pair N and Pair L blocks locally; `wc -c` SPEC.md; markdown mental-pass
- [x] Phase 4: doc-drift sweep · flip `.2` PLAN line to stub form (kept nested) · archive

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.1]] — Discovery; resolved-scoping table + predicate seed this task carries forward (predecessor)
- [[CORE-494]] — minted `[unattended]`; "flowtron itself never writes it" is the rule this module preserves (related-decision)
- [[CORE-536]] — `[unattended]` implies `--fast` on attended runs; the adopter-without-orchestrator value the proposal leans on (related-decision)
- [[CORE-551]] — unattended filing authority is the duty, not a review — why `--unattended` filing can only *recommend* (related-decision)
- [[CORE-543]] / [[CORE-546]] — Pair L binds every `drift` step to a §7.1 source; a new CI step needs a Pair + mapping row (related-decision)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The `.1` Discovery closed today with this child's scope fixed by an operator-answered scoping table (module home, `--park` exclusion, `--unattended` persistence, M=5). The PLAN line names every deliverable concretely and each still resolves against HEAD (drift check below). Sequential head of the cohort — `.3`–`.6` cannot start until this module exists — so the task is exactly as valuable as filed.

- [x] Read relevant source files — `SPEC.md` §"Task-line format" (:70-115), §"🚀 Phase 4: Closure" → "Handoff persistence" / "Deferred hand-off filing" (:541-566); `SPEC/gates.md` §"Conditional skip rule", §"`--fast` operator override", §"`--unattended` operator posture" (:201-400, 484-498); `SPEC/plan-parser.md` §"`[unattended]` mis-authoring footguns" (:42-70); `SPEC/tasknote-selection.md` §"Unattended filing authority" (:221-252); `SPEC/layout.md` (lazy-module frontmatter + enumeration :60-70); `SPEC/purpose-blurb.md` (shape precedent for a small lazy module); `SPEC/epic.md`; `docs/EXTERNAL-AGENTS.md` steps 1-8; `docs/CONVENTIONS.md` §"GitHub Actions CI" + §"Canonical source with labeled mirrors"; `docs/CONTEXT-BUDGET.md` §"Budgets" + lazy-module ledger; `.github/workflows/ci.yml`; `claude/skills/ft-release/SKILL.md` §7.1 + `step-7.1-mirror-pairs.md` Pairs K and L in full; `viz/src/parser.ts` `[unattended]` handling (:63-143, :405). No probe needed — grep-scoped.

- [x] **Best Practices Review** — contract work, no code. Boundaries: the rule lives once in the new module (canonical source); `SPEC.md` gets a pointer, not a restatement (budget: 51,188 / 57,000, and `CORE-574.5` wants headroom, so the pointer stays one short paragraph); each future filer carries a *labeled mirror* per `docs/CONVENTIONS.md` — this task fixes the label shape and the `unattended-candidates:` literal so the children mirror one string. The CI step follows the established lift pattern: §7.1 Pair (source) → `drift` step (copy) → Pair L mapping row (binding) — a step added without all three ships unbound (Pair L's own bullet says so). No refactor of existing pairs.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. `[unattended]` hits (20 notes) were read by the `.1` Discovery; its load-bearing four carry forward: [[CORE-494]] (marker minted; never-writes rule; position after `[model]`; footguns test-pinned), [[CORE-536]] (marker implies `--fast` attended), [[CORE-551]] (unattended filing authority = duty, no review act to attach a marker to), [[CORE-565.3]] (`[handoff]` out of contract; caobunga reader consumes the marker). `ci.yml` hits: [[CORE-543]] (Pair L minted — every `drift` step needs a §7.1 source and a mapping row; step-name prefix is the join key; `echo` text stripped; every step must still yield ≥1 path), [[CORE-546]] (the v5.25.0 CI failure that motivated it), [[CORE-559]]/[[CORE-564]]/[[CORE-567]] (later drift-job edits, all additive). Nothing contradicts the plan.

- [x] **Drift check** — every cited path resolves: `SPEC.md` §"Task-line format" ✅ (the `[unattended]` row already says "Flowtron itself never writes it — seeding is an operator act", which the pointer will hang off); `docs/EXTERNAL-AGENTS.md` step 2 ✅ (:63); CI `drift` job ✅ with Pairs A/B/C/E + two standing checks. Plan vs contract: the module *adds* no gate, banner, cue row, or write path — consistent with `SPEC/gates.md` (two standing banners), `SPEC/purpose-blurb.md`'s not-a-cue precedent, `docs/VISION.md` no-runtime, and EXTERNAL-AGENTS step 2 ("a caller that files rows cannot mark its own"). Plan vs PLAN line: byte-consistent. One structural note: at this task's closure *zero* files under `claude/skills/` name the module (the `.3`–`.6` children add those), so the CI step passes vacuously today — Pair L still requires it to yield ≥1 path after the `echo` strip, which it does (`claude/skills`, `SPEC/unattended-candidacy.md`). `step-7.1-mirror-pairs.md` will itself name the module inside Pair N, so the step must exclude `claude/skills/ft-release/` or it fails on its own source.

- [x] No clarifications needed — the `.1` scoping table settled the open questions. Explicit assumptions this task asserts (all within "Discovery tightens only"):
  1. **Predicate tightened by one clause:** `[!critical]` rows are excluded — the urgency flag exists to pull an operator's eye, which is the opposite of "safe with nobody present".
  2. **The `unattended-candidates:` line always emits** under `--fast` / `--unattended`, with `none` when the predicate matches nothing, so a reader can tell "ran, found none" from "never ran".
  3. **Label shape** is `` mirror of `SPEC/unattended-candidacy.md` §"<section>" `` — the section title must be a real `## ` heading in the module (Pair K1 idiom), so citation rot is caught, not just pointer presence.
  4. **CI trigger** is "any file under `claude/skills/` that names `SPEC/unattended-candidacy.md`", excluding `claude/skills/ft-release/` (the check's home, not a filer). Runner closure fragments that cite the persistence section are bound too, which is intended — they carry the literal by construction.
  5. **`[unattended]` written on confirm lands after `[model]` and its glyph** (`[light]🔧 [unattended]`) — `viz/src/parser.ts:85` confirms both glyph placements parse.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (9 paths).

**Discovery Notes:**

**Module skeleton (decided here, written in Phase 2):**

| Section | Carries |
|---|---|
| Recommend, never write | The CORE-494 rule verbatim + why candidacy is a proposal: the operator's confirmation *inside the surface's existing gate* is the act; no surface gains a gate, no posture gains a write |
| Candidacy predicate | Conservative conjunction over the drafted row text: `[light]`/`[medium]` only · no `[!critical]` · no hand-off cue or keyword · no `Blocked by` · not an `AREA-EPIC-N` parent · epic-child rule (`.1` never; `.N` only when `[light]`/`[medium]`; `.k` only when its predecessor is closed or proposed in the same pass with the same candidacy). False negatives are the status quo (undecided); false positives are what the confirm catches |
| Three postures | Attended → proposal inside the existing confirm; `--fast` → `unattended-candidates:` line, zero writes; `--unattended` → same line, zero writes, + persistence. Emission shape fixed |
| Persistence | Runner closure that discharged via `/ft-file-followup --unattended` copies the line into its Final Summary before archive (SPEC.md "Handoff persistence"); standalone `--unattended` filing: Step 5 report is the only record; attended: nothing to persist |
| Surfaces and mirrors | Filer table (owner child per surface) + the label shape + the literal; Pair N binds them |
| Bounds | Not a cue, not a gate, no cue-vocabulary row, no viz chip, no autonomy chain; readers still deny by default |

**Pair L compatibility of the new step:** name prefix `Pair N`; source pattern `^[*][*]Pair N `; the fenced block in §7.1 and the CI `run: |` body must extract to the same path set after the `echo`-strip: `{claude/skills, SPEC/unattended-candidacy.md}` (plus `claude/skills/ft-release/` from the exclusion — both sides carry it).

**Downstream:** `CORE-574.2/.3` will add more `drift` steps and `CORE-574.5` may trim `SPEC.md` — both additive/ordering-safe, as the `.1` scan found. `docs/CONVENTIONS.md` §"GitHub Actions CI" names the lifted set "A, B, C, and E" and Pair L says "six lifted checks" — both become stale the moment N lifts, so both are in scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — module shape extends `SPEC/purpose-blurb.md` (`paths: []` + `> Lazy-loaded SPEC module.` preamble + bounds paragraph); the CI step extends the established lift triad (§7.1 Pair → `drift` step → Pair L mapping row, per [[CORE-543]]); the label shape borrows Pair K1's quoted-title-resolves-to-a-heading idiom; the `[unattended]` position clause defers to `SPEC/plan-parser.md` rather than restating it. No new shape.

- [x] **Minimal refactor gate** — none. Two one-token roster corrections outside the declared scope, both made stale by the same edit: `claude/skills/ft-release/SKILL.md` "Pair A–L" → "A–N" (was already behind by M) and Pair K's "(A, B, C, E)" aside. Deferred nothing.

- [x] Implemented the minimal solution — `SPEC/unattended-candidacy.md` (5 sections, ~10.3k chars, unbudgeted lazy tier); `SPEC.md` pointer paragraph (+629 chars → 51,817 / 57,000); `docs/EXTERNAL-AGENTS.md` step 2 sentence; enumerations in `SPEC/layout.md`, `README.md`, `AGENTS.md`; §7.1 Pair N + Pair L row + count/aside updates; CI `drift` step; `docs/CONVENTIONS.md` lifted-pair roster.

- [x] Updated/added tests for non-trivial behavior — the CI step *is* the test; exercised negatively and positively in Phase 3 against a throwaway `claude/skills/zz-fake/a.md` (removed).

**Implementation Notes:**

- **Predicate tightening applied** (assumption 1): `[!critical]` excluded. Keyword screen drops *token* — flowtron's own PLAN vocabulary says "bracket token" constantly and the word carries no hand-off meaning here — and adds *password*; the gates.md keyword clause already covers the upper-case credential forms on the diff side.
- **Agent-neutral vocabulary:** the module says *structured ask*, not `AskUserQuestion`, per `docs/AGENT-NEUTRALITY.md` §"Tool-call-specific terminology" (caught at the doc-drift sweep; three sites fixed before commit).
- **Pair N exclusion of `claude/skills/ft-release/`** is load-bearing: the Pair N body names the module inside its own regex text, which does not self-match (`candidacy\.md` ≠ `candidacy.md`), so without the exclusion the check would fail on its own source.
- **`bad=` propagation:** the inner section loop is fed by `done < <(…)`, not a pipe — verified by case 2 below (stale label → exit 1).
- **Downstream reconcile:** none needed. `CORE-574.2/.3` add steps to the same job (additive); `CORE-574.5` trims `SPEC.md` elsewhere.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — CI step body extracted from `ci.yml` and run locally (vacuous pass), then three fixture cases; Pair L block run locally (prints nothing). `viz/` and `tools/` untouched — no code.

- [x] Ran lint/type-check on changed code — `ci.yml` parsed with `js-yaml` (last two `drift` step names resolve, 12-line `run:` body intact); `.editorconfig` pass over every changed file (no trailing whitespace, final newline present); existing `drift` steps (wrapper-name, Pair A roster clause) re-run clean.

- [x] **Verification receipt** — below. Public surface grows by one lazy module and one CI step, both named by the PLAN line; no duplication (rule lives once, pointer + mirrors elsewhere); no stale code-facing doc (CONVENTIONS, Pair L count, Pair K aside, SKILL.md catalogue range all updated).

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash pairN.sh` (CI step body, repo at HEAD) → 0 (vacuous: no filer names the module yet)
- fixture case 1 (cites module, no literal, no label) → 1 · `NO CANDIDATES LITERAL` + `NO LABELED MIRROR`
- fixture case 2 (literal + label to a non-heading) → 1 · `STALE LABEL … Nonexistent section is not a heading`
- fixture case 3 (literal + two resolving labels) → 0
- `bash pairL.sh` (§7.1 Pair L block, 7 rows) → 0, printed nothing
- `grep -c '^## ' SPEC/unattended-candidacy.md` → 5; `head -3` → `paths: []`
- `grep -q 'unattended-candidates:' SPEC/unattended-candidacy.md` → 0
- `grep -q 'SPEC/unattended-candidacy.md' SPEC.md && [ $(wc -c < SPEC.md) -lt 57000 ]` → 0 (51,817)
- `grep -q 'unattended-candidacy' docs/EXTERNAL-AGENTS.md` → 0
- `grep -l 'unattended.\{0,3\}candidacy' SPEC/layout.md README.md AGENTS.md` → all three
- `docs/CONVENTIONS.md` roster → "Pairs A, B, C, E, and N" / "Pairs D, F–K and M" (read)
- `wc -c claude/skills/ft-release/SKILL.md` → 30,619 / 40,000

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: updated (SPEC/ module enumeration) · `AGENTS.md`: updated (SPEC/ bullet) · `SPEC.md`: updated (pointer paragraph) · `docs/MIGRATION.md`: no change (module ships inside the submodule; no adopter step) · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`: no change (no skill roster or flag change this task) · `docs/CONVENTIONS.md`: updated (lifted-pair roster) · `CONTRIBUTING.md`, `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change to the ledger, but its vocabulary rule caught `AskUserQuestion` in the new module → replaced with *structured ask* · `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`: no change (no flag added) · `docs/EXTERNAL-AGENTS.md`: updated (step 2 citation) · `docs/WORKTREES.md`: no change · `docs/VISION.md`: no change (module adds no runtime; its "no autonomy chain" bullet is consistent with §"What we won't accept").

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Landed the `[unattended]` candidacy contract: a lazy `SPEC/unattended-candidacy.md` that lets every filing surface *propose* the marker inside the confirm gate it already has — the operator's confirmation is the act — while `--fast` / `--unattended` emit an `unattended-candidates:` line and write nothing. The CORE-494 rule that flowtron never seeds the marker holds verbatim; the `.3`–`.6` children now have one string to mirror and a CI step that fails when they don't.

- **Changed (10 files, +71/−10):** `SPEC/unattended-candidacy.md` (new, 5 sections) · `SPEC.md` (+1 pointer paragraph, 51,817 / 57,000) · `docs/EXTERNAL-AGENTS.md` step 2 · `SPEC/layout.md`, `README.md`, `AGENTS.md` enumerations · `claude/skills/ft-release/step-7.1-mirror-pairs.md` (Pair N + Pair L row + count/aside) · `claude/skills/ft-release/SKILL.md` (catalogue range A–N) · `.github/workflows/ci.yml` (Pair N step) · `docs/CONVENTIONS.md` (lifted roster).
- **Verification:** CI step run locally against three fixtures (2 fail-as-designed, 1 pass) and vacuously at HEAD; Pair L binding prints nothing; YAML parses; budgets hold.
- **`touches:` reconciliation:** declared 9, changed 10. Undeclared: `claude/skills/ft-release/SKILL.md` (one-token catalogue-range fix, A–L → A–N).
- **Scope decisions:** `[!critical]` added to the predicate's exclusions · keyword screen drops *token*, adds *password* · emission always prints (`none` when empty) · CI trigger = naming the module, `ft-release/` excluded · agent-neutral *structured ask* wording.
- **Documentation:** four AI-referenced docs updated, the rest swept "no change" (list above).
- **Maintainability effect:** one canonical module, a fixed label shape that resolves to a real heading, and a CI check that binds every future mirror the day it lands — the children can be written in parallel without agreeing on prose.

**Archived:** 2026-09-11
