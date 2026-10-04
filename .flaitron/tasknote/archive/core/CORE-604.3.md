---
title: runner-stub-model-trim
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-604, CORE-604.2, CORE-558.4, CORE-555, CORE-535.4]
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
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-task/step-1.5-model-edge.md
  - claude/skills/ft-task/step-0-flags.md
  - claude/commands/ft-task.md
  - SPEC.md
  - SPEC/model.md
  - docs/PLATFORMS.md
  - docs/AGENT-NEUTRALITY.md
  - .flowtron/PLAN.md
blocked-by:
  - CORE-604.2
---

# CORE-604.3 | runner-stub-model-trim

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-604]]

## 🎯 Goal

Trim the runner / command-stub / `model.md` surfaces on the flagless cold-start path — fold the per-step `unattended-mode = true` clauses in `ft-task` and `ft-micro-task` into one pointer each at `unattended-mode.md` §"Conversion map", cut `claude/commands/ft-task.md` to invoke + usage, summarize the four-row tier ladder in `SPEC.md` §"Model field", and move `model.md`'s calibration table to `docs/PLATFORMS.md` (dropping Haiku) — cite-don't-restate, with no operative imperative removed (CORE-558.4).

## ✅ Acceptance

- [x] `ft-task/SKILL.md` carries exactly one `unattended-mode = true` dispatch paragraph (Step 0) plus the two short delegation qualifiers (Step 4 Re-scope, Step 5 Phase 3 👁️); every other per-step posture clause is gone — `grep -c 'When \`unattended-mode = true\`' claude/skills/ft-task/SKILL.md` → 1; `grep -c 'not under .--unattended' claude/skills/ft-task/SKILL.md` → 2
- [x] `ft-micro-task/SKILL.md` carries exactly one `unattended-mode = true` dispatch paragraph (Step 0) — `grep -c 'When \`unattended-mode = true\`' claude/skills/ft-micro-task/SKILL.md` → 1 (its Step 0 flag walk also *sets* the variable inline — a setter, not a branch)
- [x] Every conversion the folded clauses named is still keyed to the right step in `unattended-mode.md` §"Conversion map" / §"Pre-scaffold stops" / §"What `--unattended` never relaxes" (concrete-model park, pre-scaffold terminate-write-nothing, drift park incl. the not-inherited Re-scope downgrade, destructive / prerequisite / advisory-✋ split, downstream-impact → drift, visual-confirm park with the emission-condition rule, input-needed park) — `judgment`: read the fragment against the deleted clauses (CORE-558.4 diff-then-classify)
- [x] `claude/commands/ft-task.md` is invoke + usage only: frontmatter, invoke paragraph, empty-args line, one usage bullet per invocation shape pointing at the contract, sibling-routing line — `wc -c claude/commands/ft-task.md` ≤ 2,600 and Pair J (`step-7.1-mirror-pairs.md`) prints nothing
- [x] `SPEC.md` §"Model field" summarizes the four-rung ladder (`light < medium < heavy < xheavy`, one line each, `xheavy` manual-only) above the pointer — `grep -q 'light  <  medium  <  heavy  <  xheavy' SPEC.md`; `wc -c SPEC.md` ≤ 57,000
- [x] `SPEC/model.md` §"Platform×model×effort calibration table" is a stub (pointer + load trigger), the table lives in `docs/PLATFORMS.md` with its as-of stamp and no `haiku` row — `grep -c '^| Anthropic' docs/PLATFORMS.md` → 3; `grep -c 'Haiku 4.5' SPEC/model.md docs/PLATFORMS.md` → 0 0
- [x] Every `§"…"` citation into the touched files still resolves (headings or bold-lead anchors) — citation-validator loop over `SPEC.md` + `SPEC/**` + `claude/**` + `docs/**` + `templates/**` prints 0 dangling
- [x] No operative imperative removed — every deleted sentence (>45 chars) from the four trimmed bodies has a verbatim or richer home at HEAD, or is a restatement of one — `judgment`: diff-then-classify table in Testing Notes
- [x] CI context-budget block passes locally on the edited surfaces — `ci.yml` §"Context budget" loop → exit 0

## 🧩 Subtasks

- [x] **ft-task/SKILL.md** — write the single Step 0 posture paragraph; delete the per-step clauses at Step 1.5, Step 2, Step 4 (×2), Step 5 Phase 2 (×2), Step 5 Phase 3, Step 6; add the two short qualifiers at the Step 4 Re-scope and Phase 3 👁️ `fast-mode` sites
- [x] **ft-micro-task/SKILL.md** — tighten the existing Step 0 posture paragraph into the single pointer; delete the per-step clauses at Step 1 (foreign dirt), Step 1.5, Step 3 (×2), Step 5
- [x] **unattended-mode.md** — verify each deleted clause's content is present and step-keyed; add nothing unless a deleted clause has no home (record either way)
- [x] **claude/commands/ft-task.md** — cut to invoke + usage (one bullet per shape, contract pointers; keep `argument-hint:` in the house shape; keep the sibling-routing line)
- [x] **SPEC.md §"Model field"** — add the four-rung ladder summary above the existing pointer
- [x] **SPEC/model.md** — move the calibration table (+ its framing paragraph and as-of stamp) to `docs/PLATFORMS.md` as a new `## Platform×model×effort calibration table` section before §"When this doc is useful"; drop the `haiku` row; leave a stub heading in `model.md` (pointer + when to read it); repoint the three in-file `§"Platform×model×effort calibration table"` self-cites, `step-1.5-model-edge.md:30`, and the `docs/AGENT-NEUTRALITY.md:51` row
- [x] Phase 3: citation validator over the touched section names; diff-then-classify on deleted sentences; Pair J; CI budget block; `wc -c` receipts
- [x] Phase 4: doc-drift sweep, PLAN line stub flip (nested under the epic), archive

## 🔗 Related

- [[CORE-EPIC-604]] — parent epic
- [[CORE-604.2]] — `blocked-by:` predecessor (closed 2026-09-18): created `SPEC/gate-postures.md`, which this task's fold and stub trim cite
- [[CORE-558.4]] — related-decision: fidelity restore after cite-don't-restate over-trimmed skill-local imperatives; its citation validator + deleted-sentence classifier bound what may be cut here
- [[CORE-555]] — related-decision: instruction clarity outranks byte discipline
- [[CORE-535.4]] — precedent: the original cite-don't-restate pass on the runners

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The four trim targets are exactly as [[CORE-604.1]] §A measured them: the runner bodies carry 9 (`ft-task`) and 7 (`ft-micro-task`) per-step `--unattended` clauses whose executable content already lives step-keyed in `unattended-mode.md` §"Conversion map"; `claude/commands/ft-task.md` (4,709 b) restates flag semantics its `description:` and the skill's Step 0 already carry, at twice the size of any sibling stub; `SPEC.md` §"Model field" is a bare pointer while the ladder the gate needs sits only in a lazy module; and `model.md`'s calibration table names dated vendor rosters (Grok 4.6, Haiku 4.5, GPT-5.5) that belong in the platform doc. `.2` has landed (`SPEC/gate-postures.md` exists), so the Fan-out predecessor is cleared. Scope is the PLAN line as filed; no deviation.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — `N/A` — markdown contract + skill prose, no code module boundaries. The governing boundaries are cite-don't-restate ([[CORE-535.4]]), instruction clarity over bytes ([[CORE-555]]), and the [[CORE-558.4]] disambiguator rule (see §D).

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one AskUserQuestion, two questions; answers in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Read set and measured surfaces (bytes at HEAD `8c3971c`)

`claude/skills/ft-task/SKILL.md` 27,588 · `claude/skills/ft-micro-task/SKILL.md` 20,668 · `claude/commands/ft-task.md` 4,709 · `SPEC/model.md` 16,984 · `SPEC.md` 53,318 (budget 57,000) · `docs/PLATFORMS.md` 64,571 (unbudgeted) · `claude/skills/ft-task/unattended-mode.md` 14,612 · `step-0-flags.md` (unattended paragraph) · `step-1.5-model-edge.md` · `SPEC/epic.md` · `docs/CONTEXT-BUDGET.md` §Budgets + §Ledger · `step-7.1-mirror-pairs.md` Pairs I / J · sibling command stubs (`ft-micro-task.md` 2,221, `ft-close-epic.md` 1,916 — the target shape).

**Per-step posture clauses to fold.** `ft-task/SKILL.md`: Step 1.5 concrete-mismatch (line 91), Step 2 foreign-dirt "does not relax" (98), Step 4 fire branch (151) + Re-scope-under-fast (153), Step 5 Phase 2 destructive/prerequisite (167) + downstream-impact (167), Step 5 Phase 3 👁️ (168), Step 6 input-needed (178) — 9 sites. `ft-micro-task/SKILL.md`: Step 0 dispatch (39, stays as the single pointer), Step 1 foreign-dirt (78), Step 1.5 (92), Step 3 Relevance (112) + dependency/destructive/prerequisite (118), Step 5 (145) — 6 sites beyond the dispatch. Every one cites `unattended-mode.md` §"Conversion map" / §"Pre-scaffold stops" / §"What `--unattended` never relaxes", and each conversion is already a row in the map keyed to *this* skill's step number (the map has separate `/ft-task`, `/ft-task --loop`, `/ft-micro-task` columns).

**Calibration table.** `SPEC/model.md` §"Platform×model×effort calibration table" (lines 160–191): framing paragraph, as-of stamp `2026-08-27`, nine family rows, closing paragraph. Self-cited three times inside `model.md` (lines 77, 86, 133), once from `step-1.5-model-edge.md:30` (legacy-entry branch, "loaded alongside this fragment"), described in prose at `docs/AGENT-NEUTRALITY.md:51`. No skill or CI check greps the table or its stamp — the "refreshed at releases via `/ft-audit docs`" claim is prose, so the move carries it with the stamp. `docs/PLATFORMS.md` has no model-tier section; §"Non-Claude capability triggers" (lines 370–494) is the closest neighbour and is Pair I's awk range (`/^## Non-Claude capability triggers$/,/^## When this doc is useful$/`) — the new section must land **outside** that range, i.e. after §"When this doc is useful" or before §"Non-Claude capability triggers", not between them.

**`SPEC.md` §"Model field"** (line 787) is `Canonical contract: see SPEC/model.md.` — the stub [[CORE-535.3]] left. Cited as `SPEC §"Model field"` from `AGENTS.md`, `claude/AGENTS-snippet.md`, `templates/PLAN.md`, `ft-file-followup`, `ft-epic-discovery`, `docs/AGENT-NEUTRALITY.md`. Headroom 3,682 b.

### B. Archive skim

Path-grep counts over `archive/core/` (2026-09-18): `ft-task/SKILL.md` 106 · `SPEC/model.md` 92 · `ft-micro-task/SKILL.md` 38 · `unattended-mode.md` 20 · `commands/ft-task.md` 18 · `docs/PLATFORMS.md` 20+. Far past the probe line; the deciding cohort was read by [[CORE-604.1]] §B one task ago and is inherited. Read directly here:

- [[CORE-604.1]] — the epic Discovery; §A sized these surfaces, §E resolved "table → `docs/PLATFORMS.md`, Haiku dropped (unused), tier ladder summarized in `SPEC.md` §Model field".
- [[CORE-604.2]] — the stub-with-trigger shape for a moved section (pointer + one-line definition + "load before you argue…"); `##` stubs only; citation repoint as a whitespace-tolerant regex pass then a validator loop; ledger numbers refreshed in-task only when leaving them would read as over-budget.
- [[CORE-558.4]] — the binding lesson: cite-don't-restate held on 106 deleted sentences, and the one loss was the **disambiguator at the decision point** (Step 1.5 Satisfied routing without the ladder). The fold here has the same shape twice: Step 4 Re-scope and Phase 3 👁️ both say "when `fast-mode = true`, downgrade/suppress", and `--unattended` sets `fast-mode = true` without inheriting either delegation. §E keeps a six-word qualifier at both sites.
- [[CORE-482.2]] — built the table (nine rows, as-of stamp, supersedes [[CORE-353.2]]'s no-table decision); the refresh-at-release mechanism is the docs audit reading the stamp, not a script.
- [[CORE-536]] — the `[unattended]`-marker-implies-`--fast` rule at the runners' Step 1 stays untouched (it is a `--fast` branch, not a posture clause).
- [[CORE-571]] — folded `/ft-goal-task` into `/ft-task --loop`; the command stub's `--loop` bullet dates from there and is the longest of the four.

### C. Drift check

- Every path and heading named by the PLAN line exists at HEAD `8c3971c`; the "four-row tier ladder" is `model.md`'s `light < medium < heavy < xheavy` ladder (four rungs) — the gate-action table is also four rows but is `model.md`'s content and stays there.
- `SPEC.md` §"Model field" is a bare pointer, so "put the ladder into it" is an addition, not a restatement of something present.
- `claude/commands/ft-task.md` is a symlink target in every adopter (`.claude/commands/ft-task.md → …/claude/commands/ft-task.md`); the file path and `argument-hint:` shape are what adopters and Pair J depend on — both survive.
- Pair I's awk range in `docs/PLATFORMS.md` constrains the table's landing spot (§A).
- `docs/CONTEXT-BUDGET.md` §Ledger rows for `model.md` / `ft-task` / `ft-micro-task` will be stale after this task; the ledger is release-owned and none will read as over budget, so they are left for the release refresh (the [[CORE-604.2]] carve-out does not apply). `.4` adds the sum line and reads whatever numbers stand then.
- `SPEC/procedures/ft-task.md` (agent-neutral SOP) cites `SPEC/model.md` by file only — no section repoint needed. `SPEC/scope-boundaries.md`: no validator, script, or generated file is added; the Phase 3 validator loop is a one-off receipt.
- No open PLAN.md row outside this epic names any touched surface; `.4` (parallel) touches `plan-filing.md`, `PLAN.md`, `CONTEXT-BUDGET.md`, and the runners' Step 1 rotation line — the runners' Step 1 advisory paragraph is not one of the sites this task edits, so a `.4` worktree would merge cleanly.

### D. Design decisions (in-task; nothing reaches beyond it)

- **Where the single pointer lives.** `ft-task`: a new bold-lead paragraph at the end of Step 0, right after the flag parse — the flagless path reads it once instead of nine clauses, and it is the paragraph a `--unattended` run has already acted on (`step-0-flags.md` §`unattended-mode` reads the fragment). `ft-micro-task`: its Step 0 already carries this paragraph ("Branches reference it at Step 1, Step 1.5, Step 3, and Step 5"); it becomes the single pointer and the per-step clauses go.
- **What the pointer says.** Three things the fragment cannot say for itself because it is the file not yet loaded on a flagless run: (1) every gate below that would ask an operator parks instead, keyed to this skill's steps in §"Conversion map"; (2) the pre-scaffold checks terminate and write nothing (§"Pre-scaffold stops"); (3) the two `--fast` delegations — 👁️ suppression and the Re-scope downgrade — are not inherited, and the paper-complete guard + downstream-impact confirm are never relaxed (§"What `--unattended` never relaxes"). Codes are not listed; they are the map's.
- **Qualifiers (operator decision, §E).** `(not under `--unattended` — Step 0)` at the two `fast-mode` delegation sites. Six words each; a routing disambiguator, not a restatement.
- **Command stub.** Match `ft-micro-task.md`'s shape: invoke paragraph, empty-args line, one bullet per invocation shape naming the flag's *effect in one clause* and pointing at the contract (`SPEC/gate-postures.md` for `--fast` / `--unattended`, the skill fragments for `--debug` / `--loop`), one composition sentence, the sibling-routing line. `description:` frontmatter stays (it is what the slash menu shows; Pair J derives from it).
- **Calibration table stub.** `model.md` keeps `## Platform×model×effort calibration table` as a stub: pointer to `docs/PLATFORMS.md` + when to read it (a chooser mapping a live session to a band; the Step 1.5 gate never requires it). The three self-cites and the fragment's cite are repointed to the doc.

### E. Resolved scoping (AskUserQuestion, 2026-09-18)

| Question | Decision |
|---|---|
| "Drop Haiku" reach | **Table row only.** The `haiku` example mentions in `model.md` stay — `light` keeps a named example, the token list is unchanged. |
| Fold shape at the two `fast-mode` delegation sites | **One pointer + two short qualifiers.** The Step 0 paragraph is the single pointer; `(not under `--unattended` — Step 0)` stays at the Step 4 Re-scope and Phase 3 👁️ sites per the [[CORE-558.4]] disambiguator finding. |

Assumptions asserted: `wc -c` bytes is the budget unit; no heading in the four trimmed files is renamed except that `model.md`'s table heading becomes a stub; `docs/PLATFORMS.md` gains one new `##` section outside Pair I's awk range; the §Ledger is left to the release.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three established shapes extended, no new one: `ft-micro-task`'s Step 0 posture-dispatch paragraph (now the single pointer in both runners), [[CORE-604.2]]'s stub-with-trigger for a moved section (`model.md` table stub), and `claude/commands/ft-micro-task.md`'s one-bullet-per-shape usage list (the `ft-task` stub now matches it). DRY: the conversion rows have one home (`unattended-mode.md` §"Conversion map"); the calibration table has one home (`docs/PLATFORMS.md`).

- [x] **Minimal refactor gate** — `N/A` beyond the filed trim; `SPEC/procedures/ft-task.md` (the agent-neutral SOP) and `docs/CONTEXT-BUDGET.md` §Ledger were left untouched (Discovery §C) — the SOP is outside the PLAN line, the ledger is release-owned.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — markdown contract + skill prose; the Phase 3 validator / classifier loops are one-off receipts, not standing checks (`SPEC/scope-boundaries.md`)

**Implementation Notes:**

- **`claude/skills/ft-task/SKILL.md`** (27,588 → 26,431 b): new bold-lead paragraph at the end of Step 0 — *"When `unattended-mode = true`, the steps below do not restate the posture."* — naming the five converting gates by step, the pre-scaffold terminate-write-nothing rule, the two non-inherited `--fast` delegations, and the two never-relaxed guards, each cited to its `unattended-mode.md` section. Deleted the posture clauses at Step 1.5 (concrete mismatch), Step 2 (foreign dirt + collision checks), Step 4 (fire branch; Re-scope downgrade), Step 5 Phase 2 (destructive / prerequisite / advisory ✋; downstream-impact → drift), Step 5 Phase 3 (👁️ → visual-confirm), Step 6 (input-needed; the paragraph is now *"`--fast` override"*). Added `(not under `--unattended` — Step 0)` at the Step 4 Re-scope and Phase 3 👁️ `fast-mode` sites (operator decision, Discovery §E). Kept: the Phase 2 hard-dependency parenthetical "(mandatory under `--unattended`, recommended otherwise)" — a `park-reason:` write rule, not a posture clause.
- **`claude/skills/ft-micro-task/SKILL.md`** (20,668 → 19,723 b): the existing Step 0 dispatch paragraph rewritten as the single pointer (same three parts, keyed to Steps 1 / 1.5 / 3 / 5, including the micro-specific promote-on-resume dependency park); deleted the clauses at Step 1 (foreign dirt + collisions + `## Completed` gate), Step 1.5, Step 3 (Relevance verdicts; dependency / destructive / prerequisite), Step 5 (input-needed).
- **`claude/skills/ft-task/step-0-flags.md`**: its `unattended-mode` paragraph said *"Branches at Steps 1.5, 2, 4, 5, and 6"* — now *"The body's Step 0 posture paragraph names the gates it converts; the steps themselves do not restate it."* Not on the PLAN line; a one-clause consistency fix the fold forced.
- **`claude/skills/ft-task/unattended-mode.md`**: unchanged. Every deleted clause was read against §"Conversion map" (all seven rows carry the right `/ft-task` / `/ft-micro-task` step), §"Pre-scaffold stops" (all four stop kinds), §"What `--unattended` never relaxes" (paper-complete guard, downstream-impact → `Re-scope` → `drift`), and the four bold-lead rules (👁️ emission condition, `--loop` one-time ask, ✋ conservative bias, `drift` vs `dependency`, micro dependency park). Nothing had to be added.
- **`claude/commands/ft-task.md`** (4,709 → 2,520 b): frontmatter `description:` shortened to one clause per flag; `argument-hint:` unchanged; invoke paragraph + empty-args line unchanged; usage is five bullets, one per invocation shape, each stating the flag's effect in one clause and citing its contract (`SPEC/gate-postures.md` sections for `--fast` / `--unattended`; `SPEC/loop.md` for `--loop`); one composition sentence pointing at the skill's Step 0; sibling-routing line unchanged.
- **`SPEC.md`** §"Model field" (53,318 → 53,987 b; budget 57,000): the four-rung ladder in a fenced `text` block plus one line per rung, the concrete-name rule, and a closing sentence naming what stays in the module. The `Canonical contract:` pointer is kept as the first sentence.
- **`SPEC/model.md`** (16,984 → 14,626 b): §"Platform×model×effort calibration table" is a six-line stub (pointer + what the table is + when to read it + "the Step 1.5 gate never requires the lookup"); the three self-cites now name `docs/PLATFORMS.md`.
- **`docs/PLATFORMS.md`** (64,571 → 67,500 b, unbudgeted): new `## Platform×model×effort calibration table` inserted immediately before `## Non-Claude capability triggers` — outside Pair I's awk range. Framing paragraph carried over with its two `§` cites rewritten cross-file and one added sentence on why the table lives here; `**As of 2026-08-27:**` stamp carried; eight rows (the `haiku` row dropped per Discovery §E); closing paragraph carried verbatim.
- **`claude/skills/ft-task/step-1.5-model-edge.md`** legacy-entry branch: cite repointed to `docs/PLATFORMS.md` with "Read it for this branch; `SPEC/model.md` keeps only a stub" — the fragment previously relied on the table being "loaded alongside", which is no longer true.
- **`docs/AGENT-NEUTRALITY.md`** `SPEC/model.md` row: the [[CORE-482.2]] parenthetical gains "moved to `docs/PLATFORMS.md` by [[CORE-604.3]], `SPEC/model.md` keeping a stub".
- Downstream-impact scan: no direction-changing decision reached beyond the task — `.4` reads whatever ledger numbers stand, `.N` re-measures; no other open PLAN.md row names a touched surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown only; the release mirror pairs and the CI budget block are the executable checks on these surfaces (run below)

- [x] Ran lint/type-check on changed code — `N/A` — no markdown linter configured; markdown mental-pass on every hunk (fence balance, list indent, no trailing whitespace: `grep -n ' $'` on the nine changed files → 1)

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -c 'When `unattended-mode = true`' claude/skills/ft-task/SKILL.md        → 0   (output 1)
grep -c 'not under `--unattended`' claude/skills/ft-task/SKILL.md              → 0   (output 2)
grep -c 'When `unattended-mode = true`' claude/skills/ft-micro-task/SKILL.md  → 0   (output 1)
wc -c claude/commands/ft-task.md                                              → 0   (2,520 ≤ 2,600)
Pair J loop (step-7.1-mirror-pairs.md)                                        → 0   (prints nothing)
Pair I loop (step-7.1-mirror-pairs.md)                                        → 0   (prints nothing)
grep -q 'light  <  medium  <  heavy  <  xheavy' SPEC.md                       → 0
wc -c SPEC.md                                                                 → 0   (53,987 ≤ 57,000)
grep -c '^| Anthropic' docs/PLATFORMS.md                                      → 0   (output 3)
grep -c 'Haiku 4.5' SPEC/model.md docs/PLATFORMS.md                           → 1   (0 / 0 — the exit code is grep's no-match)
citation validator (272 §-cites into the 10 touched files, headings + bold-lead anchors, whitespace-tolerant) → 0 genuine dangling
ci.yml §"Context budget" loop, run locally                                    → 0
grep -n ' $' <nine changed files>                                             → 1   (no trailing whitespace)
```

**Citation validator.** One reported hit, a validator artifact: `step-7.1-mirror-pairs.md:253` quotes, as history, *"at v5.25.0 the wrapper-name step read `(SPEC.md §"Skill namespace")`"* — pre-exists at HEAD, not a citation.

**Diff-then-classify** ([[CORE-558.4]] method): 96 sentences (>45 chars) deleted from the four trimmed bodies; 43 with no verbatim / near-verbatim home, hand-clustered:

| # | Cluster | Deleted from | Home at HEAD | Carries it? |
|---|---|---|---|---|
| A | Per-step posture conversions (16 sentences: concrete-model park, pre-scaffold terminate, drift park incl. "leave the PLAN.md edit to the operator", Re-scope downgrade not inherited, destructive / prerequisite / advisory ✋, downstream-impact → drift, 👁️ emission condition, input-needed, micro promote-on-resume) | `ft-task`, `ft-micro-task` | `unattended-mode.md` §"Conversion map" rows + the five bold-lead rules beneath it, §"Pre-scaffold stops", §"What `--unattended` never relaxes"; plus the runners' own Step 0 paragraph | ✅ every row step-keyed; "A park never performs the operator's motion" carries the leave-it-to-the-operator clause |
| B | Command-stub flag semantics (17 sentences: `--fast`'s four surfaces + `[unattended]` marker, `--debug`'s prompts / re-verify / soft scaffolding, `--loop`'s machine-checkable criteria / taste split / gate collapse / destructive park, `--unattended`'s six gates / pauses-not-proof / resume, flag composition incl. `--debug --fast` and `--loop --unattended`) | `commands/ft-task.md` | `SPEC/gate-postures.md` §"`--fast` operator override" + §"`--unattended` operator posture"; `step-4-debug-mode.md`; `step-5-loop-mode.md` + `SPEC/loop.md`; `step-0-flags.md` (composition, `--debug` re-verify not a signal trip); `unattended-mode.md` (`--loop`'s one-time ask, resume) | ✅ grep-confirmed per phrase |
| C | `model.md` table framing + self-cites (5 sentences) | `SPEC/model.md` | moved verbatim to `docs/PLATFORMS.md` with the two `§` cites rewritten cross-file; the three self-cites repointed in place | ✅ |
| D | `haiku` table row (1) | `SPEC/model.md` | none — dropped by operator decision (Discovery §E; [[CORE-604.1]] §E "unused") | deliberate |

**Strong-modal sweep** over the residue (`do not` / `never` / `must` / `always` / `only`): *"Do not retag the PLAN.md line autonomously"* → `unattended-mode.md` §"Pre-scaffold stops"; *"never pass both"* → the stub's `--unattended` bullet and `step-0-flags.md`; *"never proof"* → `gate-postures.md` + `unattended-mode.md`; *"the gate still requires no lookup"* → moved with the table and restated in the `model.md` stub. The [[CORE-558.4]] disambiguator class — a qualifier at a decision point that survives nowhere — is what the two `(not under `--unattended` — Step 0)` qualifiers exist to prevent.

**Structural quality assertions:** no duplication introduced (each conversion and the table now have one home); no dead text (the `model.md` stub and the Step 0 paragraph are both load-bearing); no public-surface growth (no new heading anywhere except the moved table's in `docs/PLATFORMS.md`); no stale code-facing documentation (`step-0-flags.md`, `step-1.5-model-edge.md`, `docs/AGENT-NEUTRALITY.md` updated in the same change).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` no change · `AGENTS.md` no change (cites `SPEC/model.md` §"Model field" by file — the heading is `SPEC.md`'s and now carries the ladder) · `SPEC.md` **updated** (§"Model field" ladder summary) · `SPEC/*.md` **updated** (`model.md` table → stub + three self-cites repointed; `epic.md`, `scope-boundaries.md` no change) · `docs/MIGRATION.md` no change (names `claude/commands/ft-task.md` as a symlink target only — path unchanged) · `claude/AGENTS-snippet.md` no change (its `SPEC/model.md` §"Model field" cite resolves as before) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` **updated** (`SPEC/model.md` row notes the table's move) · `docs/PLATFORMS.md` **updated** (receives the table) · `claude/CAPABILITIES.md` no change (cites `SPEC/model.md` §"Effort axis (orthogonal to model choice)" — heading unchanged) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (its posture cite is into `SPEC/gate-postures.md`, untouched) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change · `claude/skills/*/SKILL.md` **updated** (`ft-task`, `ft-micro-task` — the deliverable) · `PLAN.md` flipped below. `docs/CONTEXT-BUDGET.md` (not on the list) left for the release refresh: `model.md` 17,070 → 14,626, `ft-task` 28,291 → 26,431, `ft-micro-task` 20,721 → 19,723 all read *under* their rows.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Trimmed the three surfaces a flagless `/ft-task` cold start reads whether or
not a flag is set. The two runner bodies no longer restate the `--unattended`
posture at every gate: each carries one Step 0 paragraph naming the gates that
park and pointing at `unattended-mode.md` §"Conversion map", where every
conversion was already step-keyed — nothing had to be added to the fragment.
Two six-word qualifiers stay at the Step 4 Re-scope and Phase 3 👁️
`fast-mode` sites, the exact decision points where a run holding
`fast-mode = true` under the posture would otherwise suppress instead of park
([[CORE-558.4]]'s disambiguator class; operator-confirmed). The `ft-task`
command stub is invoke + usage, matching its siblings. `SPEC.md` §"Model field"
now carries the four-rung ladder the Step 1.5 gate routes on, so the
always-loaded contract states it before any lazy module is read; the dated
vendor calibration table moved out of `SPEC/model.md` into `docs/PLATFORMS.md`
(eight rows, Haiku dropped) with a stub left behind.

- Files: 9 non-workflow paths (+87 / −59 lines) — `ft-task/SKILL.md` 27,588 → 26,431 · `ft-micro-task/SKILL.md` 20,668 → 19,723 · `commands/ft-task.md` 4,709 → 2,520 · `SPEC.md` 53,318 → 53,987 · `SPEC/model.md` 16,984 → 14,626 · `docs/PLATFORMS.md` 64,571 → 67,500 · `step-0-flags.md`, `step-1.5-model-edge.md`, `docs/AGENT-NEUTRALITY.md` one-line each; plus PLAN.md and this tasknote.
- Verification: receipts above — validator 272 / 0 dangling, classifier 96 / 43 clustered into A–D with confirmed homes (one deliberate drop), Pair I + Pair J print nothing, CI budget block 0.
- Refactors: none beyond the filed trim; `SPEC/procedures/ft-task.md` and the §Ledger deferred (Discovery §C).
- Documentation verdict: 5 updated / 17 "no change" (sweep above).
- `touches:` reconciliation: declared 11 paths, changed 9 + PLAN + tasknote — undeclared: none; declared-but-unchanged: `unattended-mode.md` (read against every deleted clause; nothing to add).
- Maintainability effect: the flagless cold start drops ≈ 3.1k chars across the two runner reads + ≈ 2.2k on the stub (≈ 1.3k tokens) with the posture now having one dispatch paragraph per runner instead of nine and six scattered clauses; the tier ladder is stated in the always-loaded contract, closing the [[CORE-558.4]] Satisfied-without-reading gap at the source; `SPEC/model.md` no longer carries dated vendor facts, so a roster refresh is a docs edit, not a contract edit.

**Archived:** 2026-09-18
