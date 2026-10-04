---
title: file-followup-candidacy
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-577, CORE-577.2, CORE-577.1, CORE-551, CORE-494]
touches:
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/starter-mode.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-task/unattended-mode.md
  - SPEC/procedures/ft-task.md
blocked-by:
  - CORE-577.2
parallel-safe-with:
  - CORE-577.3
  - CORE-577.5
  - CORE-577.6
---

# CORE-577.4 | file-followup-candidacy

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-577]] · 🔗 [[CORE-577.2]]

## 🎯 Goal

Make `/ft-file-followup` propose `[unattended]` for the row it drafts — inside the Step 3 / S3 review gate on the default and `--starter` flows (token written only on confirm), no candidacy under `--park`, and an `unattended-candidates:` report line with zero writes under `--unattended` that the discharging runner copies into its Final Summary.

## ✅ Acceptance

- [x] Default flow: Step 3 runs the predicate over the drafted line and shows a candidate with the token in place inside the existing review; Step 4 writes `[unattended]` after `[model]` only when the operator's confirmation kept it — `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-file-followup/SKILL.md`
- [x] `--starter`: the same proposal rides the S3 review and the S4 line shape carries the confirmed token after `[<model>]`; `starter-mode.md` references the host's Step 3 proposal without re-stating the rule — `grep -q 'unattended' claude/skills/ft-file-followup/starter-mode.md`
- [x] `--park`: no candidacy, stated in both the host's Step 0 park paragraph and `park-mode.md` — `grep -q 'no .*candidacy' claude/skills/ft-file-followup/park-mode.md`
- [x] `--unattended`: predicate runs, no token written, `unattended-candidates: <IDs|none>` emitted on its own line in the Step 5 report — `grep -q '^unattended-candidates:' claude/skills/ft-file-followup/SKILL.md`
- [x] Runner persistence hook: the shared `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" tells a closure that discharged via `/ft-file-followup --unattended` to copy the line into its Final Summary (micro: `## ✅ Recap`) before the archive move, with a resolving label — `grep -q '§"Persistence"' claude/skills/ft-task/unattended-mode.md`
- [x] Pair N passes at HEAD for every touched skill file (literal + resolving label on each file naming the module) — the §7.1 Pair N block run locally → exit 0, prints nothing
- [x] `claude/skills/ft-file-followup/SKILL.md` stays under the 33,000-byte cap — `[ $(wc -c < claude/skills/ft-file-followup/SKILL.md) -lt 33000 ]`
- [x] `SPEC/procedures/ft-task.md` (agent-neutral SOP) names the same persistence duty in one clause — `grep -q 'unattended-candidates' SPEC/procedures/ft-task.md`
- [x] No new gate, cue, banner, or checklist box on any surface — `judgment`: read the diff against `SPEC/unattended-candidacy.md` §"Recommend, never write" → "Not a cue, not a gate"

## 🧩 Subtasks

- [x] Host `SKILL.md` Step 3: add the `[unattended]` candidacy paragraph (Read the module's predicate, evaluate the drafted line, show the candidate line with the token inside the review surface; labeled mirror to §"Three postures")
- [x] Host `SKILL.md` Step 3 `--unattended` bullets: predicate still runs, no gate → report only
- [x] Host `SKILL.md` Step 4 item 2: line shape carries the confirmed token after `[model]`; never under `--unattended`
- [x] Host `SKILL.md` Step 5 `--unattended` report: add the `unattended-candidates:` line (own line, always emitted, `none` when empty) and name the runner copy
- [x] Host `SKILL.md` Step 0 park paragraph + `park-mode.md` Notes: one sentence each — park runs no candidacy
- [x] `starter-mode.md` S3 / S4: the proposal rides the S3 review; the S4 line shape shows where a confirmed token sits
- [x] `claude/skills/ft-task/unattended-mode.md`: persistence hook sentence in the Deferred hand-off paragraph (literal + label to §"Persistence")
- [x] `SPEC/procedures/ft-task.md`: one clause on the same duty
- [x] Phase 3: run the Pair N block locally; byte-count the SKILL body; `.editorconfig` pass on changed files
- [x] Phase 4: doc-drift sweep, flip `.4` PLAN line nested under the parent, archive

## 🔗 Related

- [[CORE-EPIC-577]] — parent epic
- [[CORE-577.2]] — blocked-by: the module (`SPEC/unattended-candidacy.md`) and the Pair N CI check this child mirrors and must pass
- [[CORE-577.1]] — depends-on: resolved scoping (`--park` skips candidacy; `--unattended` persists via the discharging runner's Final Summary)
- [[CORE-577.3]] · [[CORE-577.5]] · [[CORE-577.6]] — parallel-safe-with: disjoint skill directories
- [[CORE-551]] — related-decision: unattended filing authority — the Step 4 commit under `--unattended` is authorized by the SPEC duty, not a review; that is why the posture stays recommend-only here
- [[CORE-494]] — related-decision: minted `[unattended]`; "flowtron itself never writes it" is preserved verbatim

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed the module and the Pair N check (vacuous until a filer names the module); `/ft-file-followup` is the row in the module's §"Surfaces and mirrors" table owned by this child, and its three modes already have exactly the gate shapes the module assumes (prose review on default/`--starter`, none on `--park`, suppressed on `--unattended`). Nothing has moved since `.1` filed the line.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md` (whole module); `claude/skills/ft-file-followup/SKILL.md` (Steps 0–5, Notes), `starter-mode.md` (S3–S5), `park-mode.md` (headings + Notes); `claude/skills/ft-task/unattended-mode.md` §"What `--unattended` never relaxes" + §"`/ft-close-epic`"; `claude/skills/ft-close-epic/unattended-close-epic.md` (Step 8 Final Summary blockquote precedent); `SPEC/procedures/ft-task.md` :70-90; `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair N + `.github/workflows/ci.yml` Pair N step; `docs/CONTEXT-BUDGET.md` §"Budgets". No probe — grep-scoped.

- [x] **Best Practices Review** — prose skills, no code. Boundaries that matter: (1) the rule lives once in the module; each touched skill file carries a one-line labeled mirror, not a paraphrase (`docs/CONVENTIONS.md` §"Canonical source with labeled mirrors"); (2) Pair N binds *every* `claude/skills/` file that names the module path, so a fragment that merely wants to say "no candidacy here" must reference the host step rather than the module, or it is forced to carry a literal it never emits; (3) the runner hook goes in the *shared* `ft-task/unattended-mode.md` fragment — one edit covers `/ft-task`, `/ft-micro-task`, and `/ft-close-epic` (whose own fragment defers to the shared never-relaxed list by reference).

- [x] **Archive skim** — `ls archive/core/` confirmed non-empty (area from the README table). `grep -l 'ft-file-followup/' archive/core/*.md` hits are the CORE-551 (unattended filing authority), CORE-570 (starter merge), CORE-577.1/.2 lineage; read `.1` and `.2` in full, `.1`'s skim already digested CORE-494 / CORE-536 / CORE-551 / CORE-565.3 / CORE-570 / CORE-573. Load-bearing: `.1` Resolved scoping Q2 (`--park` skips) and Q3 (persist into the discharging run's Final Summary; standalone `--unattended` filing has only its Step 5 report); `.2` Implementation Notes — Pair N excludes only `ft-release/`, label must resolve to a `## ` heading, *structured ask* not `AskUserQuestion` in contract prose.

- [x] **Drift check** — PLAN line cites "Step 3 / S3 review gate", "Step 5 report", "runner closure fragments": all exist as named (host Step 3 §"Surface for review", `starter-mode.md` §"Step S3", host Step 5 `--unattended` paragraph, `ft-task/unattended-mode.md` §"What `--unattended` never relaxes" → Deferred hand-off paragraph). Module table row for this surface matches the plan (Step 4 / S4 write step, Step 3 / S3 gate; `--unattended` "emits, persists via the discharging runner"). No SPEC contradiction: the token is written only after the operator's Step 3 assent — the same act CORE-551 identifies as the commit authorization — and never under `--unattended`. One nuance: `SPEC/unattended-candidacy.md` §"Persistence" says the runner "copies the line from the filing report into its own tasknote's **Final Summary**"; `/ft-micro-task` has `## ✅ Recap` rather than a Final Summary block — the hook names both rather than re-interpreting.

- [x] Asked clarifying questions — No clarifications needed. Explicit assumptions: (a) the default flow's review is prose, so the attended branch is the module's "prose review" clause — show the line *with* the token; the operator's assent or edit keeps or drops it; no structured ask is added. (b) Clause 6 (epic-child rule) applies only when the operator explicitly filed an epic subtask ID; standalone rows skip it. (c) `park-mode.md` and `starter-mode.md` do not name the module path (Pair N trigger), so they reference the host's Step 3 instead. (d) `SPEC/procedures/ft-task.md` gets one clause so the agent-neutral SOP does not fall behind the fragment it mirrors; the `.N` audit would otherwise flag it. (e) No edit to `docs/EXTERNAL-AGENTS.md` step 8 — `.2` already cited the module at step 2, and step 8's discharge sentence stays true.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared.

**Discovery Notes:**

**Gate map for this surface** (what the module's three postures land on):

| Mode | Predicate runs | Proposal shown | Token written | `unattended-candidates:` |
|---|---|---|---|---|
| default | Step 3, over the drafted line | inside the Step 3 prose review, line shown with token in place | Step 4 item 2, only if the operator's confirmation kept it | never (attended) |
| `--starter` | host Step 3 (S3 overlay keeps the review) | inside S3 review, same shape | S4 item 3 line, after `[<model>]` | never |
| `--park` | **no** | — | never | never |
| `--unattended` | Step 3 (the scan step) | no gate | never | Step 5 report, own line, always (`none` when empty); discharging runner copies it into Final Summary / `## ✅ Recap` |

**Pair N constraint** drives file placement: `SKILL.md` and `ft-task/unattended-mode.md` name the module → each carries `unattended-candidates:` + a resolving label (`§"Three postures"` on the filer, `§"Persistence"` on the runner hook). `starter-mode.md` / `park-mode.md` do not name the module.

**Budget:** `ft-file-followup/SKILL.md` 28,008 / 33,000 at entry; expected growth ≈ +1,200. Fragments are uncounted.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the module's own "prose review" clause (show the line with the token; assent keeps it) and the labeled-mirror convention (`docs/CONVENTIONS.md`); the runner hook extends the existing Deferred hand-off paragraph in the shared fragment rather than adding a section; the Step 5 `unattended-candidates:` block reuses the fenced-`text` report shape the module fixes. No new shape.

- [x] **Minimal refactor gate** — none. No adjacent prose touched beyond the sentences each edit needed.

- [x] Implemented the minimal solution — host `SKILL.md` (Step 0 park paragraph, Step 3 candidacy paragraph + review bullet + `--unattended` bullet, Step 4 item 2 line shape, Step 5 report block); `starter-mode.md` S3 + S4 item 3; `park-mode.md` Notes bullet; `ft-task/unattended-mode.md` persistence sentence; `SPEC/procedures/ft-task.md` one clause.

- [x] Updated/added tests for non-trivial behavior — N/A (prose skills); the Pair N CI step is the test and was run locally against HEAD (Phase 3).

**Implementation Notes:**

- **Pair N placement drove the file split.** Only `SKILL.md` (label `§"Three postures"`) and `ft-task/unattended-mode.md` (label `§"Persistence"`) name the module path, and each carries the `unattended-candidates:` literal. `starter-mode.md` and `park-mode.md` reference the host's Step 3 instead — naming the module from a fragment that never emits the line would force a literal it does not own.
- **One runner edit covers three runners.** `/ft-task` and `/ft-micro-task` share `unattended-mode.md`; `/ft-close-epic`'s own fragment defers to its "never relaxes" list by reference. The hook names both the Final Summary and a micro-tasknote's `## ✅ Recap` so the module's "Final Summary" wording is not re-interpreted on the micro shape.
- **`--starter` predicate scope:** evaluated over the line without the `Filed with starter at …` suffix — stated in S3 so the suffix's backticked path is never mistaken for a hand-off keyword.
- **`--park` is "no gate", not "suppressed":** worded on both surfaces so nobody later files an un-suppress ticket.
- **Growth:** `SKILL.md` 28,008 → 30,882 (+2,874; 2,118 under the 33,000 cap). Larger than the +1,200 estimate because the Step 5 block spells out the standalone-vs-discharging split the module's §"Persistence" makes.
- Downstream-impact scan: `.3` / `.5` / `.6` touch disjoint skill dirs; the `.N` audit's per-surface degrade walk now has this surface's four-row gate map (Discovery Notes) to check against. No reconcile edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — Pair N block (§7.1 / CI `drift` step) run locally at HEAD → exit 0, printed nothing; bound exactly the two files expected.

- [x] Ran lint/type-check on changed code — `.editorconfig` pass over the five changed files (no trailing whitespace, final newline present); fragments confirmed not to name the module path (0 hits each).

- [x] **Verification receipt** — below. No duplication (rule cited, not restated, on every surface); no public-surface growth beyond what the PLAN line names; no stale code-facing doc.

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -q 'mirror of \`SPEC/unattended-candidacy.md\` §"Three postures"' claude/skills/ft-file-followup/SKILL.md` → 0
- `grep -q 'unattended' claude/skills/ft-file-followup/starter-mode.md` → 0
- `grep -q 'No .\[unattended\]. candidacy' claude/skills/ft-file-followup/park-mode.md` → 0
- `grep -q '^unattended-candidates:' claude/skills/ft-file-followup/SKILL.md` → 0
- `grep -q '§"Persistence"' claude/skills/ft-task/unattended-mode.md` → 0
- Pair N block (bash, from §7.1) → 0, printed nothing; bound `ft-task/unattended-mode.md` + `ft-file-followup/SKILL.md`
- `[ $(wc -c < claude/skills/ft-file-followup/SKILL.md) -lt 33000 ]` → 0 (30,882)
- `grep -q 'unattended-candidates' SPEC/procedures/ft-task.md` → 0
- `grep -c 'SPEC/unattended-candidacy' starter-mode.md park-mode.md` → 0 / 0 (fragments stay outside Pair N)
- editorconfig pass over `git diff --name-only` → clean

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `AGENTS.md`, `SPEC.md`: no change (no new module, roster, or flag; the SPEC pointer paragraph from `.2` already covers this surface) · `docs/MIGRATION.md`: no change (skill bodies ship inside the submodule) · `claude/AGENTS-snippet.md` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`: no change (no roster or flag change; Codex wrapper reads the canonical body) · `docs/CONVENTIONS.md`: no change (mirror convention applied, not amended) · `CONTRIBUTING.md`, `SECURITY.md`: no change · `docs/AGENT-NEUTRALITY.md`: no change (new prose says "review gate" / "operator's assent"; the `SPEC/procedures/` clause is tool-neutral) · `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`: no change (no flag added) · `docs/EXTERNAL-AGENTS.md`: no change (step 2 already cites the module per `.2`; step 8's discharge sentence stays true — the persistence hook is runner-internal) · `docs/WORKTREES.md`, `docs/VISION.md`: no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` → `completed`; `.4` PLAN.md line flipped to stub form, kept nested under `CORE-EPIC-577` in `## High`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

**Final Summary:**

`/ft-file-followup` now proposes `[unattended]` for the row it drafts: on the default and `--starter` flows the candidate line is shown with the token in place inside the Step 3 / S3 review, and Step 4 / S4 writes it only when the operator's confirmation keeps it; `--park` runs no candidacy (no gate to host it); `--unattended` writes no token and reports `unattended-candidates: <ID|none>` on its own line in the Step 5 hand-off, which a discharging runner closure copies into its Final Summary (micro: `## ✅ Recap`) before archiving. The CORE-494 rule that flowtron never seeds the marker holds verbatim; Pair N now binds two real files instead of running vacuously.

- **Changed (5 files, +55/−14):** `claude/skills/ft-file-followup/SKILL.md` (+2,874 B → 30,882 / 33,000) · `starter-mode.md` · `park-mode.md` · `claude/skills/ft-task/unattended-mode.md` (persistence hook, +546 B) · `SPEC/procedures/ft-task.md` (one clause).
- **Verification:** eight grep/size criteria → 0; Pair N block → 0, printing nothing, bound exactly the two module-naming files; editorconfig pass clean.
- **`touches:` reconciliation:** declared 5, changed 5. Undeclared: none.
- **Scope decisions:** fragments reference the host step rather than the module path (Pair N would otherwise demand a literal they never emit) · one shared-fragment edit covers all three runners · the SOP clause keeps the agent-neutral procedure level with the fragment it mirrors · `docs/EXTERNAL-AGENTS.md` untouched (step 8 remains true).
- **Documentation:** all AI-referenced docs swept "no change" (list above).
- **Maintainability effect:** the surface with the most modes now degrades per the module's table without a paraphrase anywhere — each mode's behavior is one labeled sentence pointing at the rule, and the CI check fails the day a label or literal drifts.

**Archived:** 2026-09-11
