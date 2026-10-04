---
title: gate-postures-split
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-EPIC-604, CORE-604.1, CORE-604.3, CORE-604.4, CORE-535.5, CORE-558.2]
parallel-safe-with:
  - CORE-604.4
touches:
  - SPEC/gate-postures.md
  - SPEC/gates.md
  - SPEC.md
  - SPEC/*.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/*.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-close-epic/*.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-file-followup/*.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/AGENTS-snippet.md
  - claude/CAPABILITIES.md
  - AGENTS.md
  - README.md
  - docs/*.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-604.2 | gate-postures-split

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-604]] [[CORE-604.1]]

## 🎯 Goal

Move the ≈17.4k of flag-posture material (`--fast` override, `--unattended` posture, flag precedence + surface matrix) out of `SPEC/gates.md` into a new lazy `SPEC/gate-postures.md`, leaving stub headings so copied citations resolve, and wire its Read at every flag / `[unattended]`-marker branch so a flagless run never loads it.

## ✅ Acceptance

- [x] `SPEC/gate-postures.md` exists as a lazy module carrying the three moved `##` sections and their eight `###` subsections verbatim (citations to sections that stayed in `gates.md` repointed, nothing else reworded) — `grep -c '^## ' SPEC/gate-postures.md` → 3, `grep -c '^### ' SPEC/gate-postures.md` → 8, `sed -n 3p SPEC/gate-postures.md | grep -q 'Lazy-loaded SPEC module'`
- [x] `SPEC/gates.md` keeps a stub heading for each moved `##` section, each a pointer plus the one-line trigger (CORE-558.2 shape) — `for h in 'Flag precedence and surface matrix' '`--fast` operator override' '`--unattended` operator posture'; do grep -q "^## $h\$" SPEC/gates.md; done`
- [x] No dangling section citation anywhere outside the archive: every `gates.md §"…"` names a heading still in `gates.md`, every `gate-postures.md §"…"` names a heading in `gate-postures.md` — citation-validator loop recorded in Testing Notes → 0 misses
- [x] No non-archive surface still cites a moved section under `gates.md` (the three stubs and the PLAN row excepted) — `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules -E 'gates\.md[^\n]{0,80}§"(Flag precedence|`--fast` operator override|`--unattended` operator posture|What is inherited|Park conversions|What a park is|Pre-scaffold stops|What `--unattended` never relaxes|`/ft-close-epic` under the posture)' . | grep -v 'PLAN' | grep -v '^./SPEC/gates.md'` → no output (exit 1)
- [x] The Read is wired at every flag / marker branch and nowhere on the flagless path: `ft-task` step-0-flags (`fast-mode`, `unattended-mode`), `ft-task` SKILL Step 1 `[unattended]` marker, `ft-micro-task` Step 0 flags + Step 1 marker, `ft-close-epic` Step 0 `--unattended` Read list — `grep -c 'gate-postures.md' claude/skills/ft-task/step-0-flags.md claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md claude/skills/ft-close-epic/SKILL.md` (each ≥ 1) + `judgment` that no Read sits on the flagless path
- [x] `unattended-mode.md` and `unattended-close-epic.md` name `SPEC/gate-postures.md` as the contract they interpret — `grep -q 'gate-postures.md' claude/skills/ft-task/unattended-mode.md claude/skills/ft-close-epic/unattended-close-epic.md`
- [x] Adopter paste-block repointed for new adopters — `grep -q 'gate-postures.md' claude/AGENTS-snippet.md`; the copied citation in existing adopters (`SPEC/gates.md` §"`--unattended` operator posture") still resolves to the stub
- [x] Release Pair K2 follows the "Runtime stays out." paragraph to its new file and passes — `step-7.1-mirror-pairs.md` names `SPEC/gate-postures.md`; the K2 loop run locally prints no `K2 MISS`
- [x] `docs/CONTEXT-BUDGET.md`: new Budgets row `SPEC/gate-postures.md` 23,000, `SPEC/gates.md` lowered 40,000 → 25,000 (operator decision, Discovery §E), "Not budgeted" sentence and §Ledger updated — the CI `Context budget` script from `.github/workflows/ci.yml` run locally → exit 0 with no `OVER BUDGET`
- [x] Rosters naming `SPEC/` contents name the module: `AGENTS.md`, `README.md`, `SPEC.md` §"Operator-gate cues" module list — `grep -q 'gate-postures' README.md SPEC.md` + `grep -q 'flag postures' AGENTS.md` (annotated at closure: the `AGENTS.md` roster is topic-worded, not filename-worded, so it names the module as "flag postures" — the criterion's intent, not its literal grep, is met)
- [x] `docs/AGENT-NEUTRALITY.md` `--fast` ledger row recounted for the two files (any-mention rule) — `judgment` (recount grep recorded in Testing Notes)
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — `judgment`

## 🧩 Subtasks

- [x] Create `SPEC/gate-postures.md`: trigger line + intro, then `gates.md` lines 240–540 moved verbatim; repoint the intra-text citations that now cross files (§"Phase 1→2 exit gate", §"Conditional skip rule", §"Operator-gate cues")
- [x] Rewrite `SPEC/gates.md`: intro names the third sibling; six internal `§"Flag precedence and surface matrix"` pointers repointed; three stub headings in place of the moved run
- [x] Repoint every non-archive citation of a moved section (script over the tree, then hand-fix the split-line and link-form leftovers): SPEC.md, SPEC modules, SOP, skills + fragments, docs, README, adopter snippet
- [x] Wire the Read: `ft-task` step-0-flags (fast-mode / unattended-mode), `ft-task` SKILL Step 0 lazy list + Step 1 marker, `ft-micro-task` Step 0 lazy list + flags + Step 1 marker, `ft-close-epic` Step 0 Read list; repoint the fragment contract lines
- [x] Release check: Pair K2 file pattern → `SPEC/gate-postures.md`; `docs/CONVENTIONS.md` + `docs/VISION.md` labeled-mirror rosters → the new file
- [x] Rosters + ledgers: AGENTS.md / README.md / SPEC.md module lists; `claude/CAPABILITIES.md` contract-layer rows; `docs/AGENT-NEUTRALITY.md` recount
- [x] `docs/CONTEXT-BUDGET.md`: two Budgets rows (new + lowered) with "why" cells, "Not budgeted" sentence, §Ledger numbers + split note
- [x] Phase 3: `wc -c`, citation validator, moved-section grep, CI budget script, K2 loop, AGENT-NEUTRALITY recount
- [x] Phase 4: doc-drift sweep, Acceptance tick-through, PLAN stub flip (nested under the epic), archive

## 🔗 Related

- [[CORE-EPIC-604]] — parent epic (gate-tiering-cold-start)
- [[CORE-604.1]] — Discovery; §A sized the move (17.4k of 35.9k), §C fixed the stub-heading constraint, §E named the module
- [[CORE-604.3]] — follow-up: its fold into `unattended-mode.md` cites the module this task creates (Fan-out: Sequential after this)
- [[CORE-604.4]] — parallel-safe-with: touches only one CONTEXT-BUDGET ledger line in common
- [[CORE-535.5]] — precedent: the same extraction motion (`cue-vocabulary.md` + `gate-discipline.md` out of `gates.md`), stub-with-trigger left behind
- [[CORE-558.2]] — related-decision: move flag-conditional machinery, never an operative rule that fires before any module load

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line describes `SPEC/gates.md` exactly as it stands: lines 240–540 (17,352 b of a 35,910 b file) are the three flag-posture sections, none of which a flagless run on an unmarked row consults, and every citation the line names still exists. Two things the line did not name surfaced and are absorbed without changing the deliverable: the release-time Pair K2 grep addresses the "Runtime stays out." paragraph by file and must follow it, and the operator chose the budget shape (both halves budgeted). No contradiction with a SPEC contract; the module name and stub-heading constraint come straight from [[CORE-604.1]] §C / §E.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — markdown contract, no code module boundaries. The boundary that governs is the module split itself: `gates.md` keeps the per-gate *rules* and points at the postures for the flag interaction; `gate-postures.md` holds the postures and the matrix and restates no gate. Dependency direction is one-way by construction (postures cite gates; gates cite the postures only through the stubs and the six "Full surface" pointers). No in-scope refactor beyond the move

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one structured ask (budget-row shape), answer in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Read set

`SPEC/gates.md` (whole, 35,910 b; heading map at lines 240 / 248 / 279 / 308 / 358 / 374 / 398 / 437 / 462 / 480 / 495), `SPEC.md` §§"Task-line format" / "Tasknote frontmatter" / "The 4-phase workflow" / "Post-closure protocol" / "Paper-complete guard", `SPEC/epic.md`, every `SPEC/*.md` header line (the lazy-module trigger convention), `docs/CONTEXT-BUDGET.md`, `.github/workflows/ci.yml` §"Context budget" (parses `| `path` | N |` rows under §Budgets — a new row is picked up with no script change), `claude/skills/ft-release/step-7.1-mirror-pairs.md` §Pair K2, the wiring points (`ft-task` SKILL Step 0 / Step 1 / Step 6, `step-0-flags.md`, `unattended-mode.md`; `ft-micro-task` Step 0–1; `ft-close-epic` Step 0 + `unattended-close-epic.md`), and every non-archive file that names `gates.md` (35 files; the posture-section citers are the 16 listed in §C).

**The move, measured** (`wc -c`, bytes): §"Flag precedence and surface matrix" 4,428 · §"`--fast` operator override" 2,984 · §"`--unattended` operator posture" 9,938 → **17,352** of 35,910. `gates.md` after the move ≈ 18.6k + stubs (≈ 1.4k) ≈ **20k**; `gate-postures.md` ≈ 17.4k + header ≈ **18k**.

### B. Archive skim

Path grep over `archive/core/` for `SPEC/gates.md` returns 138 notes — far past the probe line; [[CORE-604.1]] §B read the deciding cohort one task ago and this task inherits it rather than re-reading. Load-bearing for the shape of this move:

- [[CORE-535.5]] — the direct precedent: extracted `cue-vocabulary.md` + `gate-discipline.md` out of `gates.md`, leaving at each old site a **stub with the trigger** — heading kept, one paragraph naming the new file and *when to load it*, the [[CORE-468]] objection ("a red flag you can only read after loading the fragment cannot catch 'you never loaded it'") answered by putting the trigger in the file the agent already has. Same shape here: each stub carries the pointer plus the one-line "load before you argue the flag covers a case".
- [[CORE-535.3]] / [[CORE-558.2]] — the loss mode: bare pointers where an operative rule used to be. Nothing moved here fires before a flag is parsed, so the flagless path loses no rule; the stubs still carry the one-line what-the-flag-is so a reader of `gates.md` alone is not misled.
- [[CORE-503]] — six-gate parity across five surfaces (`gates.md` ×3, `SPEC.md`, `unattended-mode.md`, `SPEC/procedures/ft-task.md`); the move relocates the `gates.md` three to `gate-postures.md` and touches none of the wording.
- [[CORE-487]] — Pair K2 asserts, by mutation-proven grep, that §"Runtime stays out." still names `docs/VISION.md`. The paragraph moves, so the check's file column must move with it (see §C).
- [[CORE-532]] — `docs/AGENT-NEUTRALITY.md` enumerates the `gates.md` sections mentioning a flag (14 sites, any-mention rule); the split changes both the file set and the count.
- [[CORE-536]] — the `[unattended]`-marker-implies-`--fast` rule and the Re-scope downgrade live in the sections that move; the runners' Step 1 marker branch is one of the Read wirings the PLAN line names.

### C. Drift check

- Every path and section name in the PLAN line exists at HEAD `17dd2e5`. `SPEC/gates.md` heading boundaries verified by `grep -n '^#'`; byte counts in §A measured directly.
- **Pair K2 (`claude/skills/ft-release/step-7.1-mirror-pairs.md:195`) greps `SPEC/gates.md` for `^\*\*Runtime stays out\.\*\*`** — that paragraph is inside §"`--unattended` operator posture" and moves. Not named by the PLAN line; a required repoint, not a scope change (the line already says "repoint citations in … skills"). `docs/CONVENTIONS.md:76` and `docs/VISION.md:32` list `SPEC/gates.md` as the labeled-mirror site for the same paragraph — both follow it.
- `docs/AGENT-NEUTRALITY.md:40` — 14 `gates.md` sites by the any-mention rule. After the split: `gates.md` keeps 5 mentioning sections + 3 stubs (the stubs name the flags); `gate-postures.md` holds the rest. Recount at Phase 3, not assumed.
- `claude/CAPABILITIES.md:52-53` — contract-layer coverage rows name `SPEC.md` + `SPEC/gates.md` for `--fast` / `--unattended`; they gain the new file. Pair I compares CAPABILITIES ↔ PLATFORMS *trigger tables*, not these rows — unaffected.
- `docs/DOGFOOD.md:40` still describes `gates.md` as carrying "the full operator-cue vocabulary" (stale since [[CORE-535.5]]). Not on the AI-referenced docs list and not caused here; **left untouched**, recorded so the `.N` audit can decide.
- Posture-section citers outside the archive (16 files): `SPEC.md` (×3 sites), `SPEC/blocked.md`, `SPEC/cue-vocabulary.md`, `SPEC/gate-discipline.md` (×11), `SPEC/loop.md`, `SPEC/plan-filing.md`, `SPEC/procedures/ft-task.md`, `claude/AGENTS-snippet.md`, `claude/skills/ft-task/{SKILL,step-0-flags,unattended-mode}.md`, `claude/skills/ft-micro-task/SKILL.md`, `claude/skills/ft-close-epic/{SKILL,unattended-close-epic}.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-file-followup/{SKILL,step-0-flags}.md`, `docs/{AGENT-NEUTRALITY,EXTERNAL-AGENTS,VISION,CONVENTIONS}.md`, `README.md`. Several cite across a line break (`step-0-flags.md:43-44`, `ft-file-followup/SKILL.md:169-170`, `gate-discipline.md:68-69, 94-95`, `blocked.md:111-112`) — the repoint script must match across whitespace.
- Codex / Cursor / Grok `AGENTS-snippet.md` siblings do not cite the posture sections — nothing to repoint there. `templates/*.md` likewise.
- `SPEC/scope-boundaries.md`: no validator, script, or generated file is added; the citation-validator loop in Phase 3 is a one-off receipt, not a standing check (same status [[CORE-558.2]] gave it).

### D. Design decisions (in-task; nothing reaches beyond it)

- **Stub granularity — `##` headings only.** The three moved `##` headings stay in `gates.md`; the eight `###` subsections do not. The only citation flowtron cannot re-sync is the adopter paste-block, which cites `§"`--unattended` operator posture"` alone; every in-repo `###` citation is repointed in this commit. Each stub names its subsections so a `→ "Park conversions"`-style citation still reads as resolvable. Mirrors [[CORE-535.5]]'s stub for §"Operator-cue vocabulary".
- **What the stub carries.** Pointer + the one-line definition of the flag + the trigger ("load the module before …"). Not the four surfaces, not the matrix rows — restating either would recreate the double-home [[CORE-535.5]] closed.
- **Read wiring.** `gate-postures.md` is Read (a) in `step-0-flags.md` when `fast-mode` or `unattended-mode` is set, (b) at the runners' Step 1 `[unattended]`-marker branch (which sets `fast-mode` without passing through Step 0's flag walk), (c) in `ft-close-epic` Step 0's `--unattended` Read list. `--debug` and `--loop` alone do not load it: neither reaches a posture until the loop starts running under `--fast` semantics, and `step-5-loop-mode.md` + `SPEC/loop.md` carry that (loop.md's own citation is repointed).
- **`gates.md` intro** names the third sibling with its load trigger, so an agent holding only `gates.md` knows the file exists before it meets a stub.

### E. Resolved scoping (AskUserQuestion, 2026-09-18)

| Question | Decision |
|---|---|
| CONTEXT-BUDGET row shape | **Budget both halves**: new row `SPEC/gate-postures.md` 23,000; `SPEC/gates.md` lowered 40,000 → 25,000. Each keeps ≈ 2 working units of headroom (the measured unit on this material is ≈ 2.5k, [[CORE-555]]); leaving `gates.md` at 40k with ≈ 20k of content would let the moved 17k escape the ratchet — the fragment-gaming case `docs/CONTEXT-BUDGET.md` §Ledger already names |

Assumptions asserted: `wc -c` bytes is the budget unit; no `gates.md` heading is renamed; the §Ledger numbers for the two split files are refreshed here (as [[CORE-535.5]] did) even though the ledger is release-owned, because leaving `gates.md 35,910` beside a 25,000 budget would read as over budget.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the [[CORE-535.5]] shape exactly: a lazy `SPEC/*.md` module with the `> Lazy-loaded SPEC module.` trigger line on line 3, a pointer stub with the load trigger left at each old heading, and the three rosters (`AGENTS.md`, `README.md`, `SPEC.md` §"Operator-gate cues") extended by one entry. No new shape

- [x] **Minimal refactor gate** — the move is verbatim; the only deviations are the seven citations inside the moved text that now cross a file boundary (rewritten as `[`SPEC/gates.md`](gates.md) §"…"`) and the `gates.md` intro paragraph, which had to stop claiming the matrix lives there. `docs/DOGFOOD.md:40`'s stale "full operator-cue vocabulary" description was noticed and deferred (not in scope, not on the sweep list)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — markdown contract, no executable surface; the Phase 3 receipts are one-off checks, not standing tests

**Implementation Notes:**

- **`SPEC/gate-postures.md`** (new, 19,029 b): trigger line naming the three load points (runners' Step 0 flag parse, runners' Step 1 `[unattended]` marker, `ft-close-epic` Step 0), intro, then `gates.md` lines 240–540 moved verbatim. Seven citations inside the run pointed at sections that stayed behind (§"Phase 1→2 exit gate" ×3, §"Conditional skip rule" ×2, §"Operator-gate cues" ×1, "every other section in this module" ×1) and were rewritten as cross-file cites; `diff` against `HEAD:SPEC/gates.md` 240–540 shows exactly those 18 lines.
- **`SPEC/gates.md`** (35,910 → 20,804 b): intro names the third sibling with its load trigger and drops the claim that the matrix lives here; the six internal `§"Flag precedence and surface matrix"` pointers now carry the file; the moved run is replaced by three `##` stubs — pointer, subsection names, one-line "what the flag is", and the load trigger ([[CORE-468]]'s objection answered in the file the agent already holds). `###` subsections were not stubbed: the only citation flowtron cannot re-sync (the adopter paste-block) names the `##` heading.
- **Citation repoint** — one regex pass over every tracked `.md` outside the archive (48 replacements in 21 files, three link forms + the bare form, whitespace-tolerant so split-line cites matched), then hand edits the regex could not express: `SPEC.md` (four-module list, `[unattended]` row's first cite, the post-closure `--fast` mention), `docs/AGENT-NEUTRALITY.md` (file set + recount), `docs/CONVENTIONS.md` and `docs/VISION.md` (labeled-mirror rosters), `claude/CAPABILITIES.md` (contract-layer rows), the `AGENTS.md` / `README.md` rosters, and one wrapped citation in `ft-file-followup/SKILL.md` the validator caught after the pass.
- **Read wiring** — `ft-task/step-0-flags.md`: `fast-mode` paragraph gains "Read `<SPEC_DIR>/gate-postures.md` now"; `unattended-mode` paragraph adds it beside `blocked.md`. `ft-task/SKILL.md`: Step 0 lazy list names it; Step 1 `[unattended]`-marker branch Reads it (Step 0's flag walk did not run there). `ft-micro-task/SKILL.md`: same three sites. `ft-close-epic/SKILL.md` Step 0 `--unattended` Read list + `unattended-close-epic.md` header. `--debug` / `--loop` alone do not load it (Discovery §D).
- **Release check** — Pair K2's file column for `**Runtime stays out.**` now reads `SPEC/gate-postures.md`; the loop passes locally.
- **`docs/CONTEXT-BUDGET.md`** — `SPEC/gates.md` 40,000 → 25,000 and new `SPEC/gate-postures.md` 23,000 (operator decision, Discovery §E), each with its "why"; "Not budgeted" sentence names both; §Ledger lazy-module list re-measured for the two split files with a one-sentence note. The CI block from `ci.yml` was run locally against the edited table.
- **Downstream-impact scan** — no direction-changing decision reached beyond the task: `.3` already expects the module (Fan-out: Sequential after `.2`), `.4`'s ledger sum line will read the new numbers, and no other open PLAN.md row names `gates.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown only; `viz/` and `tools/` untouched

- [x] Ran lint/type-check on changed code — `N/A` — markdown only; `.editorconfig` conformance checked by the trailing-whitespace grep below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
wc -c SPEC/gates.md                                   → 20804   (was 35,910)
wc -c SPEC/gate-postures.md                           → 19029
wc -c SPEC.md                                         → 53318   (was 52,993; four-module list + two cites)
grep -c '^## ' SPEC/gate-postures.md                  → 3
grep -c '^### ' SPEC/gate-postures.md                 → 8
sed -n 3p SPEC/gate-postures.md | grep -q 'Lazy-loaded SPEC module'   → 0
stub-heading loop (3 moved `##` headings in gates.md)                  → 0
citation validator (every gates.md / gate-postures.md §"…" outside the archive,
  headings whitespace-normalized; 112 citations)      → 0 misses
moved-section adjacency check (moved heading cited directly under gates.md,
  non-archive, stubs + PLAN row excepted)             → 0 hits
grep -c 'gate-postures.md' — step-0-flags 2 · ft-task SKILL 3 · ft-micro-task SKILL 5 ·
  ft-close-epic SKILL 2 · unattended-mode.md 5 · unattended-close-epic.md 4 ·
  AGENTS-snippet 1 · README 1 · SPEC.md 4 · step-7.1-mirror-pairs 1 · AGENTS.md 0
  (roster is topic-worded — grep -q 'flag postures' AGENTS.md → 0)
Pair K2 loop, gate-postures.md substituted            → no `K2 MISS`
ci.yml "Context budget" block, run locally            → 0
  SPEC.md 53,318/57,000 · SPEC/gates.md 20,804/25,000 · SPEC/gate-postures.md 19,029/23,000 ·
  ft-release SKILL 31,620/40,000 · glob row all under 33,000
AGENT-NEUTRALITY recount (sections whose body names --fast or --unattended):
  SPEC/gates.md 8 · SPEC/gate-postures.md 9           (ledger row updated to match)
diff <(git show HEAD:SPEC/gates.md | sed -n 240,540p) <(sed -n '17,$p' SPEC/gate-postures.md)
  → 18 changed lines = the 7 cross-file repoints (one 3-line, six 1-line)
privileged-ops keyword grep over `git diff -U0`       → no hits
trailing-whitespace grep over changed files           → none
```

Structural assertions: no duplication introduced (the stubs carry a definition and a trigger, not the four surfaces or a matrix row); no dead pointer (validator); no public-surface growth beyond the one module and its three roster entries; code-facing docs updated (`CONTEXT-BUDGET`, `AGENT-NEUTRALITY`, `CAPABILITIES`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` updated (roster names `gate-postures`; posture citation repointed) · `AGENTS.md` updated (`SPEC/` roster: "flag postures") · `SPEC.md` updated (four-module list under §"Operator-gate cues"; `[unattended]` row cites; Phase 3 matrix-row cite; post-closure `--fast` mention) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` updated (paste-block posture citation → `SPEC/gate-postures.md`; 15,054 → 15,062 b) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change (none cites a posture section) · `docs/CONVENTIONS.md` updated (labeled-mirror roster names the new file) · `CONTRIBUTING.md` no change · `SECURITY.md` no change (cites §"Operator-gate cues" → "Control-marker integrity" and §"Conditional skip rule", both still in `gates.md`) · `docs/AGENT-NEUTRALITY.md` updated (ledger row file set + 8 / 9 recount; capability-probe row cite) · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` updated (contract-layer rows name the new file; the trigger table and its last-verified stamp untouched — no flag changed) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (three posture citations repointed) · `docs/WORKTREES.md` no change · `docs/VISION.md` updated (labeled-mirror roster names the new file)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/plan-filing.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Split the `--fast` / `--unattended` postures and the flag×surface matrix out of
`SPEC/gates.md` into a new lazy `SPEC/gate-postures.md`, so a flagless
`/ft-task` run on an unmarked row no longer loads ≈ 15k of material it never
consults. `gates.md` keeps a stub at each moved heading (pointer, subsection
names, one-line definition, load trigger), so every copied citation — the
adopter paste-block included — still resolves. The Read is wired at the three
places a posture becomes active (runners' Step 0 flag parse, runners' Step 1
`[unattended]`-marker branch, `ft-close-epic` Step 0), and both halves now sit
under a CI byte ratchet.

- Files: 28 non-workflow paths — `SPEC/gate-postures.md` (new, 19,029 b), `SPEC/gates.md` (35,910 → 20,804 b), `SPEC.md` (+325 b), six `SPEC/` modules + the SOP, ten skill files, `claude/AGENTS-snippet.md`, `claude/CAPABILITIES.md`, `AGENTS.md`, `README.md`, five `docs/`; plus PLAN.md and this tasknote.
- Verification: receipts above — validator 112 / 0, adjacency 0, K2 pass, CI budget block 0, moved body byte-identical modulo 7 cross-file cites.
- Refactors: none beyond the move; `docs/DOGFOOD.md:40` staleness deferred (pre-existing, off the sweep list) for the `.N` audit.
- Documentation verdict: 9 updated / 10 "no change" (sweep above).
- `touches:` reconciliation: declared 16 paths / globs, changed 28 files — undeclared: none (every changed path falls under a declared glob).
- Maintainability effect: default-path `gates.md` load drops 35,910 → 20,804 b (≈ 3.8k tokens); the posture contract has one home with one load trigger stated in three runner bodies and the `gates.md` intro; budgets 25,000 / 23,000 keep the moved bytes under the ratchet instead of letting the split un-budget them.

**Archived:** 2026-09-18

