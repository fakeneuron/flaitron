---
title: tasknote-selection-split
status: completed
tags: []
created: 2026-09-13
due:
related-tasks: [CORE-535.5]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - SPEC/plan-filing.md
  - SPEC/tasknote-selection.md
  - SPEC.md
  - SPEC/gates.md
  - SPEC/plan-parser.md
  - SPEC/superseded-claims.md
  - SPEC/unattended-candidacy.md
  - SPEC/layout.md
  - SPEC/procedures/ft-task.md
  - AGENTS.md
  - README.md
  - claude/commands/ft-file-followup.md
  - claude/AGENTS-snippet.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-audit/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-stats/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/step-0-flags.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/skills/ft-file-followup/starter-mode.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONTEXT-BUDGET.md
  - docs/EXTERNAL-AGENTS.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
  - templates/tasknote-template.md
  - templates/PLAN.md
  - viz/src/parser.ts
  - viz/src/devApi.ts
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-595 | tasknote-selection-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-535.5]]

## 🎯 Goal

Extract the three PLAN.md-filing sections (§"Filing commits", §"`## Completed` archive convention", §"`## Completed` rotation") from `SPEC/tasknote-selection.md` into a new `SPEC/plan-filing.md` lazy module, repoint every citation, and register the module in `SPEC/layout.md`'s roster — following CORE-535.5's `gates.md` split shape.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` exists with `paths: []` frontmatter, a `> Lazy-loaded SPEC module.` trigger line, and the three headings `## Filing commits`, `## \`## Completed\` archive convention`, `## \`## Completed\` rotation` (with the `### Exception — inline audit fixes` / "Unattended filing authority" sub-content moved intact) — `grep -c '^## ' SPEC/plan-filing.md` = 3 and `head -3 SPEC/plan-filing.md | grep -q 'paths: \[\]'`
- [x] `SPEC/tasknote-selection.md` no longer carries any of the three headings, and its trigger line names the sibling — `! grep -qE '^## (Filing commits|`## Completed`)' SPEC/tasknote-selection.md && grep -q 'plan-filing.md' SPEC/tasknote-selection.md`
- [x] No live citation of the three moved sections still points at `tasknote-selection.md` — `grep -rnE 'tasknote-selection\.md[^\n]{0,40}§"(Filing commits|`## Completed` (archive convention|rotation)|Unattended filing authority)' --include='*.md' --include='*.ts' --exclude-dir=archive --exclude-dir=node_modules --exclude-dir=.git . | grep -v 'PLAN-ARCHIVE\|.flowtron/PLAN.md'` prints nothing (multi-line citations checked by the Phase 3 sweep of the file list in Discovery Notes §C)
- [x] Every `plan-filing.md §"…"` heading cited anywhere resolves to a real heading in the new file — `judgment`: grep each cited heading string against the file (recorded in Testing Notes)
- [x] Pair O passes with citations repointed — the fenced `sh` block from `claude/skills/ft-release/step-7.1-mirror-pairs.md` §"Pair O" (and its CI copy) prints nothing
- [x] Pair F still passes — `SPEC/tasknote-selection.md` keeps the four park flags (`for flag in --low --med --fut --high; do grep -q -e "$flag" SPEC/tasknote-selection.md || echo MISSING; done`)
- [x] Module rosters naming `SPEC/` contents (`AGENTS.md` §"Repo Layout", `README.md`, `SPEC/layout.md` §"Lazy SPEC module frontmatter") name the new module — `grep -q 'plan-filing' AGENTS.md README.md SPEC/layout.md` (three hits)
- [x] `docs/CONTEXT-BUDGET.md` lazy-module ledger re-measured to include `plan-filing.md` and the shrunken `tasknote-selection.md` — `judgment`: numbers match `wc -c`
- [x] `docs/AGENT-NEUTRALITY.md` ledger row split so each named section sits under the file that now holds it — `grep -q 'SPEC/plan-filing.md' docs/AGENT-NEUTRALITY.md`
- [x] No budgeted surface regresses — `SPEC.md` ≤ 57,000, `SPEC/gates.md` ≤ 40,000, every `claude/skills/*/SKILL.md` ≤ 33,000 (CI's context-budget step logic, run locally via `wc -c`)
- [x] Visualizer still typechecks/lints after the two comment edits — `npm --prefix viz run typecheck && npm --prefix viz run lint` → 0

## 🧩 Subtasks

- [x] Create `SPEC/plan-filing.md`: frontmatter + trigger line + short intro; move lines 143–370 of `tasknote-selection.md` verbatim; fix the two intra-module cross-refs that now cross files (§"Downstream-impact reconciliation" ← Filing commits; §"PLAN.md filing-discipline thresholds" ← rotation)
- [x] Trim `SPEC/tasknote-selection.md`: delete the three sections, rewrite the trigger line, repoint §"PLAN.md filing-discipline thresholds"' "below" pointer to the sibling
- [x] Repoint the `SPEC.md` citations (Phase 4 `Closed —` box, Deferred hand-off filing, §"When to use a tasknote" summary paragraph)
- [x] Repoint the SPEC-module citations (`gates.md`, `plan-parser.md`, `superseded-claims.md`, `unattended-candidacy.md`, `procedures/ft-task.md`, `layout.md` roster)
- [x] Repoint the skill/command citations (`ft-task` SKILL + `unattended-mode.md`, `ft-micro-task`, `ft-epic-discovery`, `ft-close-epic`, `ft-release` SKILL + `step-7.1-mirror-pairs.md` Pair O title, `ft-audit`, `ft-refactor`, `ft-stats`, `ft-file-followup` SKILL + `step-0-flags.md` + `park-mode.md` + `starter-mode.md`, `commands/ft-file-followup.md`)
- [x] Repoint the docs/templates/viz citations (`AGENTS.md` ×2, `README.md` ×2, `docs/AGENT-NEUTRALITY.md`, `docs/MIGRATION.md`, `docs/EXTERNAL-AGENTS.md` ×2, `docs/GLOSSARY.md`, `docs/CONTEXT-BUDGET.md` ledger, `templates/tasknote-template.md`, `templates/PLAN.md`, `viz/src/parser.ts`, `viz/src/devApi.ts`)
- [x] Phase 3: run every Acceptance verify command; `wc -c` the budgeted surfaces; viz typecheck + lint
- [x] Phase 4 closure

## 🔗 Related

- [[CORE-535.5]] — related-decision: the `gates.md` split whose shape this task mirrors

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Every claim on the PLAN line re-verifies against the tree: `wc -c` = 28,952; 19 commits since 2026-08-01; the three named sections span lines 143–370 (13,939 bytes, ~48% of the file) and are the module's PLAN.md-*filing* concern, distinct from the *selection* thresholds the filename promises. The precedent shape ([[CORE-535.5]]) exists and is re-usable as-is; Pair O ([[CORE-594]]) was written to absorb exactly this move. Nothing has changed since the audit filed it.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

  **Best Practices Review:** the touched responsibility is "what happens to a PLAN.md row" (filing commit · closed-row stub · rotation) — one concern, three sections, currently sharing a file with the unrelated *which-artifact-shape* thresholds. Dependency direction after the split: `tasknote-selection.md` → `plan-filing.md` (thresholds point at the archive convention) and `plan-filing.md` → `tasknote-selection.md` (Filing commits points at Downstream-impact reconciliation). A two-way pointer between siblings is the same shape `gates.md` ↔ `gate-discipline.md` already has; no cycle risk in prose modules. No duplication introduced — the move is verbatim. No deferred cleanup beyond the [[CORE-596]] count note in §D.

  **Drift check:** all PLAN-line claims re-verified (§B, Relevance). The nine loaders it names all appear in §C. Cross-artifact: the plan neither contradicts `SPEC/layout.md` §"Lazy SPEC module frontmatter" (it follows it) nor the [[CORE-223.4]] no-Step-0-roster rule (respected, §F). No drift.

  **No clarifications needed (--fast, implied by `[unattended]`).** Assumptions asserted: (1) module name `plan-filing.md` as filed; (2) verbatim move, no prose trims; (3) no stub *heading* left behind — the rewritten trigger line + the thresholds section's pointer are the "pointer at the old site" the recipe asks for; (4) `paths: []` frontmatter is written even though [[CORE-596]] will retire it — this task follows the contract as it stands today; (5) archived tasknotes, `PLAN.md`, `PLAN-ARCHIVE.md`, and `.flowtron/specs/` keep their historical citations untouched (write-once).

**Discovery Notes:**

### A. Read set

`SPEC.md` (full), `SPEC/tasknote-selection.md` (full, 434 lines), `SPEC/gate-discipline.md` head + `SPEC/gates.md` §"Gate discipline — read before skipping a gate" (the stub shape), `SPEC/layout.md` §"Lazy SPEC module frontmatter", `docs/CONTEXT-BUDGET.md` §"Lazy `SPEC/` modules", `docs/AGENT-NEUTRALITY.md` ledger row, `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pairs F + O, `.github/workflows/ci.yml` Pair O copy, archived [[CORE-535.5]] (Acceptance, Subtasks, Implementation Notes).

### B. What moves, and where the seams are

Lines 143–370 of `tasknote-selection.md` = §"Filing commits" (with its "Unattended filing authority" + "Execution skills keep their commit-go gate" paragraphs), §"`## Completed` archive convention" (with "Placement rule" + "Exception — inline audit fixes"), §"`## Completed` rotation". 13,939 bytes. Two intra-module cross-references become cross-file after the move and must be qualified:

- §"Filing commits" → `§"Downstream-impact reconciliation"` (×2: the "Confirmed reconcile edits ride along" bullet and the unattended "reconciliation applies nothing" limit) — that section **stays** in `tasknote-selection.md`.
- §"`## Completed` rotation" → `§"PLAN.md filing-discipline thresholds"` ("This mirrors the ~50/70-word … advisory") — stays.

One reference runs the other way: §"PLAN.md filing-discipline thresholds" says "Lines under `## Completed` are governed by §"`## Completed` archive convention" below" — repoint to the sibling.

`§"Exception — inline audit fixes"` is cited from inside rotation (moves together — no change) and from `ft-stats` SKILL.md ("the same module's §…" — same module still holds both after the move, wording survives).

### C. Citation inventory (live surfaces only; archive + `PLAN*.md` + `.flowtron/specs/` excluded — historical)

Pointing at a **moved** section (must repoint):
`AGENTS.md:10` · `SPEC.md:501,562,752–763` · `SPEC/gates.md:541` · `SPEC/plan-parser.md:62` · `SPEC/superseded-claims.md:47` · `SPEC/unattended-candidacy.md:135` · `SPEC/procedures/ft-task.md:180` · `claude/commands/ft-file-followup.md:12` · `claude/skills/ft-task/SKILL.md:79` · `claude/skills/ft-task/unattended-mode.md:93` · `claude/skills/ft-micro-task/SKILL.md:126` · `claude/skills/ft-epic-discovery/SKILL.md:225` · `claude/skills/ft-close-epic/SKILL.md:165,183` · `claude/skills/ft-release/SKILL.md:299` · `claude/skills/ft-release/step-7.1-mirror-pairs.md:343` (Pair O title) · `claude/skills/ft-audit/SKILL.md:84,96` · `claude/skills/ft-refactor/SKILL.md:171,234` · `claude/skills/ft-stats/SKILL.md:27,53,64` · `claude/skills/ft-file-followup/SKILL.md:214,221` · `…/step-0-flags.md:78` · `…/park-mode.md:100,131,137` · `…/starter-mode.md:109` · `docs/AGENT-NEUTRALITY.md:39` · `docs/MIGRATION.md:449` · `docs/EXTERNAL-AGENTS.md:75,87` · `docs/GLOSSARY.md:31` · `templates/tasknote-template.md:97` · `templates/PLAN.md:41` · `viz/src/parser.ts:59` · `viz/src/devApi.ts:128` · `README.md:203` · `claude/AGENTS-snippet.md:16` (adopter-relative `.flowtron/core/SPEC/…` path) · `docs/EXTERNAL-AGENTS.md:90` — the last two surfaced by the probe (§F), missed by the first keyword grep because the `\`## Completed\`` backticks inside a double-quoted zsh pattern do not match reliably; Phase 3 sweeps with `grep -F` per section string instead.

Rosters (add the module): `SPEC/layout.md:65` · `README.md:281` · `AGENTS.md:58–63` · `docs/CONTEXT-BUDGET.md:106–124` (ledger + the "near-universal" sentence).

Pointing at a **staying** section (no change): every `§"When to use a tasknote"`, `§"PLAN.md filing-discipline thresholds"`, `§"Downstream-impact reconciliation"`, `§"File a starter"` citation; `claude/CAPABILITIES.md:61–62`; Pair F's file list; `templates/tasknote-README.md`, `templates/loop-heartbeat-template.md`, `templates/tasknote-micro-template.md`; `docs/MIGRATION.md:537`.

### D. Guards that bind the shape

- **Pair O** (`step-7.1-mirror-pairs.md:343` + CI `drift` job): resolves each filing runner's `SPEC/<module>.md §"Filing commits"` citation to a file that has a `^## Filing commits` heading. The new module's heading must be exactly `## Filing commits`; the old file must lose it (a runner still citing the old path would fail `STALE CITATION`, which is the designed behaviour). The pair's prose already names [[CORE-595]] as the split it anticipates.
- **Pair F**: `SPEC/tasknote-selection.md` must keep all four park flags — they live in §"When to use a tasknote", which stays. No effect.
- **CI context budget**: only `SPEC.md` / `SPEC/gates.md` / `claude/skills/*/SKILL.md` are capped. Citation-only edits there are byte-neutral to within a few chars; `SPEC.md` §"When to use a tasknote" summary paragraph shrinks.
- **`SPEC/layout.md` §"Lazy SPEC module frontmatter"** requires `paths: []` + the `> Lazy-loaded SPEC module. Loaded by …` trigger line. [[CORE-596]] (open, filed alongside this task) will retire the `paths:` field fleet-wide; its line counts "all 17 `SPEC/*.md` lazy modules" — after this task there are 18. Surfaced at closure as a stale count on a sibling line; **not edited here** (its own Phase 1 drift check catches a one-digit count, and the task's substance is unchanged).

### F. Archive skim (probe return, distilled)

Probe over 26 candidate notes + the release/CI greps. Conclusion: **no archived note records a must-stay constraint** for any of the three sections; every placement was adjacency-based.

- [[CORE-223.3]] created `tasknote-selection.md` (2026-05-30) as a verbatim extraction of three `SPEC.md` sections, promoting `###`→`##` "so each is independently `§"…"`-referenceable". [[CORE-223.4]] (operator-confirmed): gates/selection are **inline-cited at point-of-use, not dispatch-loaded** — they stay out of the skill Step-0 `SPEC_DIR (lazy modules …)` rosters. `plan-filing.md` is reached the same way → **no Step-0 roster entry**.
- [[CORE-429]] minted §"Filing commits" (2026-08-10) — placement "filing-discipline neighbours it"; it also made `SPEC.md` §"When to use a tasknote" stub *enumerate* the module's contents, so that paragraph must be edited on any move. [[CORE-455]] extended it to `/ft-audit`; [[CORE-551]] added "Unattended filing authority"; [[CORE-563]] / [[CORE-591]] / [[CORE-593]] hardened it (their acceptance greps against `tasknote-selection.md` were one-off, not standing gates).
- [[CORE-467]] minted §"`## Completed` rotation" (2026-08-24): "sits in the module that already owns `## Completed`'s other convention, directly beneath it, rather than in a new module" — an adjacency argument this task preserves by moving both together. It registered `/ft-stats` in the `docs/AGENT-NEUTRALITY.md` per-file row.
- [[CORE-594]] minted Pair O and lifted it to CI; the citation half is path-agnostic by design, anchoring `^## Filing commits` (a retitled heading would fail).
- [[CORE-565.3]]: "the caller doc cites the section by name, so a move carries the pointer" — section names survive, only file paths rewire. [[CORE-535.N]] fixed a stale `ft-stats` file-path citation — evidence stale paths survive per-task sweeps, hence the exhaustive inventory in §C.
- [[CORE-535.3]] warns release-gate greps anchored on moved content broke silently (origin of Pair L); `docs/AGENT-NEUTRALITY.md` rows are repaired by hand — no gate greps them. [[CORE-492]] declined a generic citation-resolution gate (`.flowtron/tasknote/README.md:90-96`).
- Recipe confirmed ([[CORE-535.3]] / [[CORE-535.5]]): `paths: []` + trigger line + pointer at the old site + the three rosters + `docs/AGENT-NEUTRALITY.md` row when the module names skills + `docs/CONTEXT-BUDGET.md` ledger line.

### E. Design decisions

- **No stub heading left in `tasknote-selection.md`.** [[CORE-535.5]] left `gates.md` §"Gate discipline — read before skipping a gate" because the [[CORE-468]] objection required the *trigger* to live in the already-loaded file. Nothing here is discipline prose; every consumer of the three sections reaches them by an explicit citation, and the rewritten trigger line + the thresholds section's pointer name the sibling. A heading-shaped stub would only invite a stale `§"Filing commits"` citation to look resolved to a human while Pair O (correctly) fails it.
- **Move verbatim.** No prose trims — the audit's finding is cohesion, not size, and the two files it produces (~15.0k + ~14.5k) are both comfortably mid-ledger. Only the cross-file qualifiers in §B change wording.
- **Module name `plan-filing.md`** as filed: the three sections are what happens to a PLAN.md *row* — how a filing lands in git, how a closed row collapses, how closed rows rotate out. Trigger line names both loader classes (filers at the filing commit; closers at the Phase 4 stub flip; `/ft-stats` + the visualizer as `## Completed` consumers).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

### Pattern survey

Extended the [[CORE-535.5]] / [[CORE-535.3]] shape unchanged: `paths: []` frontmatter, a `> Lazy-loaded SPEC module. Loaded …` trigger line naming the loaders, a two-way sibling pointer (`tasknote-selection.md` ↔ `plan-filing.md`, the same shape `gates.md` ↔ `gate-discipline.md` has), and registration in the three `SPEC/` rosters + the `docs/AGENT-NEUTRALITY.md` ledger + the `docs/CONTEXT-BUDGET.md` ledger. Per [[CORE-223.4]], no entry in any skill Step-0 `SPEC_DIR (lazy modules …)` roster — the module is reached by inline point-of-use citation, not dispatch.

### What changed

- **`SPEC/plan-filing.md`** (new, 15,141 b): 13-line head (frontmatter, H1, trigger line, one orienting paragraph) + lines 143–370 of the old file verbatim. Three wording changes only, each qualifying a reference that now crosses files: two `§"Downstream-impact reconciliation"` mentions in §"Filing commits" and the `§"PLAN.md filing-discipline thresholds"` mention in §"`## Completed` rotation" gained a `[\`SPEC/tasknote-selection.md\`](tasknote-selection.md)` prefix.
- **`SPEC/tasknote-selection.md`** (28,952 → 15,236 b): the three sections deleted; trigger line rewritten to name what it still holds and route the rest to the sibling; §"PLAN.md filing-discipline thresholds"' "…governed by §… below" repointed to the sibling. No stub heading (Discovery §E).
- **46 citation rewrites** across 32 files (script: a regex matching `tasknote-selection.md` only when directly attached to one of the four moved section strings — `Filing commits` · `\`## Completed\` archive convention` · `\`## Completed\` rotation` · `Unattended filing authority` — link URLs included; then a second pass for the six markdown-link forms whose link *text* sat before the `§`). Every rewrite reviewed in the diff. The sweep also caught three sites the Discovery inventory had not listed by line: `claude/commands/ft-audit.md:5`, `docs/MIGRATION.md:287`, and a third `ft-file-followup` SKILL.md / `ft-audit` SKILL.md pre-check citation each.
- **Hand edits**: `SPEC.md` §"When to use a tasknote" summary paragraph split into two (what-to-file → selection; what-happens-to-the-row → plan-filing); rosters in `SPEC/layout.md`, `README.md`, `AGENTS.md`; `docs/AGENT-NEUTRALITY.md` row split into two (skill-name inventory recomputed from each file's actual mentions — the plan-filing row picks up `/ft-new-project` + `/ft-update` from the "Execution skills keep their commit-go gate" fence, which the old single row omitted); `docs/CONTEXT-BUDGET.md` ledger re-measured + a sentence on why neither half earns a budget row; Pair O prose tense (`is filed to make` → `made`).

### Minimal refactor gate

Pure move plus pointers; no prose trimmed, no section renamed (Pair O anchors `^## Filing commits`). Deferred, untouched: [[CORE-596]]'s "all 17 `SPEC/*.md`" count is now 18 — surfaced in the recap, not edited (Discovery §D).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A: the two `viz/src/*.ts` edits are comment-only citations; nothing renders differently (and `--fast` is implied by `[unattended]`)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (each Acceptance verify command as invoked → exit code):

```text
grep -c '^## ' SPEC/plan-filing.md                                  → 0   (prints 3)
head -3 SPEC/plan-filing.md | grep -q 'paths: \[\]'                  → 0
! grep -qE '^## (Filing commits|`## Completed`)' SPEC/tasknote-selection.md
  && grep -q 'plan-filing.md' SPEC/tasknote-selection.md             → 0
A3 sweep — grep -rn tasknote-selection … | grep -F <each of the four
  moved section strings>, single-line + `-A1` multi-line             → no hits
  (the one -A1 hit is docs/AGENT-NEUTRALITY.md:40, the new plan-filing row
  following the tasknote-selection row — a citation of the *new* file)
A4 — every `plan-filing.md … §"…"` string cited repo-wide:
  §"Filing commits" ×20 · §"`## Completed` archive convention" ×12 ·
  §"`## Completed` rotation" ×10 → all three are `^## ` headings in the file;
  §"Unattended filing authority" ×1 (SPEC/unattended-candidacy.md) → a bold
  paragraph inside §"Filing commits", the same shape it had before the move
bash scratchpad/pairo.sh (CI Pair O block verbatim)                  → 0   PAIR-O-CLEAN
  (an inline zsh transcription first printed NO POST-STAGE DIFF ×4 — zsh's
  `grep -qv -e '--quiet'`; CI runs bash, and the bash run is the receipt)
Pair F flag loop over the five mirror files                          → 0   (no MISSING)
grep -l 'plan-filing' AGENTS.md README.md SPEC/layout.md | wc -l     → 0   (prints 3)
grep -q 'SPEC/plan-filing.md' docs/AGENT-NEUTRALITY.md               → 0
wc -c: SPEC.md 51,918 ≤ 57,000 · SPEC/gates.md 35,929 ≤ 40,000 ·
  largest SKILL.md = ft-release 31,620 (own 40,000 row), next
  ft-epic-discovery 29,501 ≤ 33,000                                 → within budget
wc -c SPEC/plan-filing.md 15,141 · SPEC/tasknote-selection.md 15,236  → match the ledger
npm --prefix viz run typecheck                                       → 0
npm --prefix viz run lint                                            → 0
```

Structural assertions on the diff (36 files, +78 / −295 — the deletion count is the moved block; the new file is untracked and not in `--stat`): no duplication — the three sections exist once, in `plan-filing.md`; no dead pointer — every old-site reference rewired or rewritten; no public-surface growth beyond the one new module the task filed; no stale code-facing doc — both `viz/src` comments name the file that now holds the contract.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"):

- `README.md` — updated: rotation citation → `plan-filing.md`; `SPEC/` roster names the module.
- `AGENTS.md` — updated: rotation citation; §"Repo Layout" roster adds "PLAN.md filing".
- `SPEC.md` — updated: Phase 4 `Closed —` box, §"Deferred hand-off filing", and the §"When to use a tasknote" summary split into a selection paragraph + a plan-filing paragraph.
- `docs/MIGRATION.md` — updated: two archive-convention / rotation citations.
- `claude/AGENTS-snippet.md` — updated: adopter-relative rotation citation.
- `codex/` · `cursor/` · `grok/` `AGENTS-snippet.md` — no change (no mention).
- `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change.
- `docs/AGENT-NEUTRALITY.md` — updated: the `SPEC/tasknote-selection.md` row split into two, each naming the sections its file now holds.
- `claude/CAPABILITIES.md` — no change: its two `tasknote-selection.md` mentions are the `--park` / `--starter` sites in §"When to use a tasknote", which stayed.
- `docs/EXTERNAL-AGENTS.md` — updated: three citations (step 8 Filing commits; the `[unattended]` marker and closed-row-set table rows).
- `docs/GLOSSARY.md` — updated: the `## Completed` rotation entry; the Downstream-impact reconciliation entry keeps its (still-correct) pointer.

**Final Summary:**

Split `SPEC/tasknote-selection.md` (28,952 b, six concerns) into two halves along its real seam: *what to file* stays (`tasknote-selection.md`, 15,236 b — thresholds, word budget, reconciliation scan), and *what happens to a PLAN.md row once filed* moves to the new lazy `SPEC/plan-filing.md` (15,141 b — §"Filing commits", §"`## Completed` archive convention", §"`## Completed` rotation"). Every live citation of the three moved sections now resolves to the new file.

- **Changed:** 36 files, +78 / −295 in tracked files, plus the new untracked module. One new file; three sections deleted from the old one; 46 mechanical citation rewrites across 32 files; hand edits to `SPEC.md`, the three rosters, the AGENT-NEUTRALITY ledger, the CONTEXT-BUDGET ledger, and Pair O's prose.
- **Verification:** receipt in Testing Notes — all Acceptance commands → 0; CI Pair O block clean under bash; Pair F clean; budgets: `SPEC.md` 51,918 / 57,000, `gates.md` 35,929 / 40,000, largest capped skill 29,501 / 33,000; viz typecheck + lint → 0.
- **Refactors:** none beyond the filed move; no prose trimmed, no heading renamed (Pair O anchors `^## Filing commits`). Deferred: [[CORE-596]]'s PLAN line counts "all 17 `SPEC/*.md` lazy modules" — now 18 — left for its own drift check rather than edited from here.
- **Documentation:** sweep above; the new module carries `paths: []` per the `SPEC/layout.md` contract as it stands today (CORE-596 will retire the field, this file included).
- **Scope reconciliation:** declared 37 paths (`touches:`), changed 37 (36 tracked + the new file). Undeclared: `claude/commands/ft-audit.md` (its sentence cites §"Filing commits" — caught by the sweep, missed by the Discovery inventory). Declared-but-unchanged: none.
- **Maintainability effect:** the filename now matches the contents on both sides; a runner citing "how do I commit my filing" or "what does a closed row look like" loads ~15 kB instead of ~29 kB; Pair O's path-agnostic design was exercised for real and held. Both halves are near-universal loaders but half the size, so neither is near a budget row.

**Archived:** 2026-09-13
