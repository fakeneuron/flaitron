---
title: epic-discovery-candidacy
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.2, CORE-577.4]
touches:
  - claude/skills/ft-epic-discovery/SKILL.md
blocked-by:
  - CORE-577.2
parallel-safe-with:
  - CORE-577.4
  - CORE-577.5
  - CORE-577.6
---

# CORE-577.3 | epic-discovery-candidacy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-577]] · [[CORE-577.2]] · [[CORE-577.4]]

## 🎯 Goal

`/ft-epic-discovery` Step 7 proposes `[unattended]` for the `.2..M+1` children and the `.N` audit row inside its existing reconcile review prompt, writing the token only on operator-confirmed rows after `[model]` — the parent and `.1` lines are never proposed — as a labeled mirror of `SPEC/unattended-candidacy.md`.

## ✅ Acceptance

- [x] Step 7 carries a labeled mirror (`mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"`) and the `unattended-candidates:` literal, and the label resolves to a real heading — `bash` the CI Pair N block locally → exit 0
- [x] Step 7 runs the predicate over the drafted `.2..M+1` lines and the Step 4 `.N` row, folds candidates into the existing reconcile review prompt (no new gate / cue / banner / box), and writes the token only on confirmed rows after `[model]` + any glyph — `judgment` (prose contract; read the step)
- [x] The parent and `.1` lines are never proposed — `grep -n 'parent' claude/skills/ft-epic-discovery/SKILL.md` shows the exclusion stated in Step 7 (`judgment` on wording)
- [x] Step 8's mental pass covers the token position on any confirmed row; Step 9 / Step 10 unchanged except persistence-free attended posture stated — `judgment`
- [x] `claude/skills/ft-epic-discovery/SKILL.md` stays under the 33,000-char budget — `wc -c claude/skills/ft-epic-discovery/SKILL.md`
- [x] `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" row for `/ft-epic-discovery` still describes the shipped behavior — `grep -n 'ft-epic-discovery' SPEC/unattended-candidacy.md` (`judgment` on wording)

## 🧩 Subtasks

- [x] Step 7: insert the `[unattended]` candidacy paragraph after the reconciliation scan — Read-the-module instruction, predicate over drafted `.2..M+1` + the already-written `.N`, clause-6 reading for this surface (`.1` closes in the same motion), parent + `.1` exclusion, labeled mirror + literal
- [x] Step 7: fold candidates into the reconcile review prompt (candidate rows shown with the token in place; prompt fires when the scan proposes an action *or* the predicate admits a row); write tokens only on confirmed rows; `.N` rewrite preserves its trailing token run
- [x] Step 7: state the attended-only posture (skill accepts neither flag → `unattended-candidates:` never emits here)
- [x] Step 8: add the token-position line to the mental pass
- [x] Step 7 Implementation Notes capture: add "candidates proposed / confirmed" to the recorded facts
- [x] Run the Pair N block locally; `wc -c` the skill; `git diff` review

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.2]] — blocked-by: the module this skill Reads and mirrors (shipped)
- [[CORE-577.4]] — parallel-safe-with: sibling mirror on `/ft-file-followup`; shape precedent for the review-gate fold
- [[CORE-577.5]] / [[CORE-577.6]] — parallel-safe-with: disjoint skill directories

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The module (`.2`) and the sibling mirror (`.4`) have shipped; `SPEC/unattended-candidacy.md` §"Surfaces and mirrors" already names this exact surface, write step, and gate (`/ft-epic-discovery` · Step 7 · reconcile review prompt · [[CORE-577.3]]). The PLAN line matches that row verbatim. Skill-only edit, one file.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — no code. Contract boundary: the rule lives once in `SPEC/unattended-candidacy.md`; the skill carries a *labeled mirror* at its write step (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors") and Reads the module there rather than restating the predicate. Budget: `SKILL.md` is 27,005 / 33,000 — ~6k headroom; `.4`'s equivalent edit cost ~+2.5k.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions — two via AskUserQuestion; answers below.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (`claude/skills/ft-epic-discovery/SKILL.md` only)

**Discovery Notes:**

**Sources read:** `SPEC.md` §"Task-line format" (grammar + candidacy pointer paragraph), §"📝 Phase 1"/§"🚀 Phase 4"; `SPEC/epic.md` (lifecycle, Fan-out, `.N` rules); `SPEC/unattended-candidacy.md` in full (predicate clauses 1–6, three postures, persistence, surfaces table); `claude/skills/ft-epic-discovery/SKILL.md` in full (Step 4 files parent + `.1` + `.N`; Step 7 writes `.2..M+1`, runs the reconcile scan with its AskUserQuestion-style review prompt, fills Fan-out; Step 8 mental pass; Step 1.5 refuses `--unattended`, no `--fast` exists); `.github/workflows/ci.yml` Pair N (requires: every `claude/skills/**.md` naming the module carries the `unattended-candidates:` literal and ≥1 `mirror of … §"<heading>"` label that resolves); the `fd3d8b1` diff of [[CORE-577.4]] (shape precedent: candidacy paragraph after the reconcile scan, candidate shown with the token in place inside the existing review, token written only if the confirmation keeps it). `codex/skills/ft-epic-discovery/SKILL.md` is a thin pointer — nothing to mirror there. No probe needed.

**Archive skim:** `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). `ft-epic-discovery/SKILL.md` appears in 55 archived notes — the load-bearing ones are the current cohort: [[CORE-577.1]] (surface inventory: this skill's confirm gates are the Step 2/3 asks + the Step 7 reconcile prompt; it accepts neither flag), [[CORE-577.2]] (module + Pair N label shape and literal), [[CORE-577.4]] (mirror fold precedent). Budget lineage: [[CORE-535.2]] set the skill cap, [[CORE-558.5]] raised it to 33,000 with this file at 26,986. Nothing contradicts the plan.

**Drift check:** ✅ Step 7 exists as cited, with the reconcile review prompt; ✅ Step 4 files parent + `.1` + `.N` (so the `.N` row is *already in PLAN.md* when Step 7 runs — the proposal on it is a rewrite that preserves the trailing token run, not a fresh write); ✅ module table row matches the PLAN line; ✅ Pair N check present in `ci.yml` and would fail this file the moment it names the module without the literal + label. Two contract ambiguities surfaced (resolved below); no SPEC contradiction.

**Resolved clarifications:**

| # | Question | Answer | Consequence |
|---|---|---|---|
| 1 | Clause 6 at Step 7: `.2`'s predecessor is the `.1`, not yet `[x]` | Treat `.1` as closed (it flips at Step 9 of the same invocation); module untouched | The first implementation child reads its predecessor as closed; later children chain off same-pass candidates per Fan-out (or `.k-1` when undeclared). Skill-local reading, stated in the mirror. |
| 2 | Review prompt is skipped on a clean scan — do candidates still surface? | Fire on either: the same prompt, one more trigger | No new gate; with neither a reconcile action nor a candidate, no prompt, as today. |

**Assumptions:** the skill accepts neither `--fast` nor `--unattended` (Step 1.5), so only the attended branch of §"Three postures" applies and `unattended-candidates:` never emits from this surface — the literal appears in the mirror only to say so (and to satisfy Pair N). Step 4's parent + `.1` lines are excluded by construction (clauses 5–6) and are never re-evaluated at Step 7.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-577.4]]'s shape verbatim: a `**\`[unattended]\` candidacy**` paragraph directly after the reconciliation-scan paragraph, opening with the labeled mirror + Read-now instruction, candidates shown inside the existing review with the token in place, token written only where the confirmation keeps it, the CORE-494 never-writes sentence closing it. No new shape.

- [x] **Minimal refactor gate** — none; two paragraphs inserted in Step 7, one bullet in Step 8, one clause appended to the Implementation-Notes capture list. Adjacent prose untouched.

- [x] Implemented the minimal solution — `claude/skills/ft-epic-discovery/SKILL.md` Step 7 + Step 8 (+2,503 chars → 29,508 / 33,000)

- [x] Updated/added tests for non-trivial behavior — N/A (prose skill); the CI Pair N block is the check and was run locally (Phase 3)

**Implementation Notes:**

- **Step 7 order respected.** The existing step writes the `.2..(M+1)` lines *then* runs the scan, so the predicate is evaluated over the rows "as just written" and a confirmed token is added in place afterwards — the same rewrite motion the `.N` row needs anyway (it was filed at Step 4). The rewrite inserts after `[<model>]` and copies every other segment verbatim (SPEC §"Task-line format" bracket-run rule).
- **Clause 6 reading (Q1):** the `.1` closes at Step 9 of the same invocation, so the implementation child with no filed predecessor reads its predecessor as closed; later children chain off same-pass candidates per Fan-out (or `.k-1` undeclared); `.N` needs clauses 1–4 only. Stated in the skill, module untouched.
- **Prompt trigger (Q2):** the reconcile review prompt fires when the scan proposes an action *or* the predicate admits a row — same prompt, one more trigger; neither → no prompt, as before.
- **Posture:** the skill accepts neither flag, so only the attended branch applies; the mirror says so and carries the `unattended-candidates:` literal only to state it never fires here (Pair N requires the literal in any file naming the module).
- **Not touched:** `codex/skills/ft-epic-discovery/SKILL.md` (thin pointer to the Claude body), `SPEC/unattended-candidacy.md` (its table row already describes this behavior), `docs/CONTEXT-BUDGET.md` ledger figures (release-time measurement).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown skill body); the CI Pair N block run locally stands in

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass: no trailing whitespace (`grep -c '[[:space:]]$'` → 0), fenced/inline code balanced, section headings untouched

- [x] **Verification receipt** — see Testing Notes; no code changed

- [x] (frontend) N/A

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash <Pair N block from .github/workflows/ci.yml>                      → 0  (printed nothing)
wc -c claude/skills/ft-epic-discovery/SKILL.md                         → 0  (29,508 ≤ 33,000)
grep -c '[[:space:]]$' claude/skills/ft-epic-discovery/SKILL.md         → 0 lines
grep -n 'ft-epic-discovery' SPEC/unattended-candidacy.md               → 0  (table row :169 matches shipped behavior)
```

Judgment criteria: Step 7 read end-to-end — predicate over `.2..M+1` + `.N`, parent/`.1` exclusion explicit, fold into the existing prompt with no new cue/banner/box, token after `[model]` + glyph on confirmed rows only; Step 8 carries the position line.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `AGENTS.md`, `SPEC.md` (pointer paragraph already names the module and the per-surface mirrors), `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md` (Pair N already in the lifted-pair roster), `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md` (step 2 already carries the candidacy sentence from `.2`; this surface accepts no unattended posture), `docs/WORKTREES.md`, `docs/VISION.md`: **no change** across the board — skill-body-only edit.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-epic-discovery` now proposes `[unattended]` for the children it files: Step 7 runs the candidacy predicate over the `.2..M+1` rows and the Step 4 `.N` audit row, shows candidates inside the existing reconcile review prompt with the token in place, and writes the token only on rows the operator confirms — the parent and `.1` are never proposed, and the skill's attended-only posture means the `unattended-candidates:` line never fires here.

- **Changed:** `claude/skills/ft-epic-discovery/SKILL.md` — Step 7 +2 paragraphs, Step 8 +1 bullet, capture list +1 clause (+2,503 chars → 29,508 / 33,000). `touches:` reconciliation: declared 1 file, changed 1 (plus this tasknote + PLAN row, excluded by construction) — no undeclared paths.
- **Verification:** CI Pair N block locally → 0; budget → 29,508 ≤ 33,000; trailing-whitespace grep → 0; module table row :169 unchanged and accurate.
- **Decisions:** clause 6 reads the `.1` as closed at Step 7 (it flips at Step 9 of the same motion) — skill-local, module untouched; the review prompt fires on reconcile action *or* candidate, one more trigger for the existing gate. Both confirmed by the operator via AskUserQuestion.
- **Refactors:** none made; none deferred.
- **Documentation:** no AI-referenced doc changed.
- **Maintainability effect:** third labeled mirror of one module (after `/ft-file-followup`'s two modes); the one surface that files whole cohorts now decides per-row at the point of fullest context without gaining a gate.

**Archived:** 2026-09-11
