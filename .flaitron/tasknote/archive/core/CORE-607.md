---
title: spec-headroom-extraction
status: completed
tags: [spec, context-budget]
created: 2026-09-19
due:
related-tasks: [CORE-604.2, CORE-535.3, CORE-555, CORE-189]
touches:
  - SPEC/post-closure.md
  - SPEC.md
  - SPEC/gates.md
  - SPEC/model.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-release/SKILL.md
  - claude/CAPABILITIES.md
  - AGENTS.md
  - README.md
  - CONTRIBUTING.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
  - docs/EXTERNAL-AGENTS.md
  - docs/DOGFOOD.md
  - docs/GLOSSARY.md
---

# CORE-607 | spec-headroom-extraction

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-604.2]]

## 🎯 Goal

Restore SPEC.md's working headroom (currently 3,001 chars under its 57,000 cap, ~1 working unit) by extracting one lazy-loadable section into a budgeted `SPEC/` module per the CORE-604.2 pattern, adding its CONTEXT-BUDGET row, and raising no cap.

## ✅ Acceptance

- [x] `SPEC/post-closure.md` exists as a lazy module carrying §"Post-closure protocol" verbatim apart from the cross-file cites (§"🚀 Phase 4: Closure", §"Paper-complete guard" → `SPEC.md`; module links re-based to `SPEC/`) — `sed -n 3p SPEC/post-closure.md | grep -q 'Lazy-loaded SPEC module'` + `diff <(git show HEAD:SPEC.md | sed -n 648,692p) <(tail -n +5 SPEC/post-closure.md)` shows only those repoints
- [x] `SPEC.md` keeps `## Post-closure protocol` as a stub (pointer + load trigger + one-line what-it-is), so the copied `§"Post-closure protocol"` citation in existing adopters still resolves — `grep -q '^## Post-closure protocol$' SPEC.md` + `grep -c '^## ' SPEC.md` unchanged from HEAD (30)
- [x] `wc -c SPEC.md` ≤ 53,000 and ≥ 2 working units (≈ 5,700) under the new cap; `wc -c SPEC/post-closure.md` ≤ 12,000
- [x] No non-archive surface still cites the protocol as living in `SPEC.md` — `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules -E 'SPEC(\.md)? §"Post-closure protocol"' . | grep -v PLAN` → no output (exit 1); the SPEC.md stub itself and generic prose mentions of "the post-closure protocol" are not citations
- [x] Every runner's final step Reads the module before running the protocol: `grep -c 'post-closure.md' claude/skills/ft-task/SKILL.md claude/skills/ft-micro-task/SKILL.md claude/skills/ft-close-epic/SKILL.md claude/skills/ft-epic-discovery/SKILL.md claude/skills/ft-release/SKILL.md SPEC/procedures/ft-task.md` (each ≥ 1) + `judgment` that no Read sits before Phase 4 on any of them
- [x] `docs/CONTEXT-BUDGET.md`: new Budgets row `SPEC/post-closure.md` 12,000; `SPEC.md` lowered 57,000 → 53,000 with its "why" (operator decision, Discovery §E); "Not budgeted" sentence names the module; §Ledger `SPEC.md` figure, lazy-module list, cold-start sum, and split note refreshed — the CI `Context budget` block from `.github/workflows/ci.yml` run locally → exit 0, no `OVER BUDGET`
- [x] Rosters naming `SPEC/` contents name the module — `grep -q 'post-closure' README.md AGENTS.md`
- [x] `docs/AGENT-NEUTRALITY.md` `--fast` ledger row recounted (any-mention rule) for `SPEC.md` and the new module — `judgment` (recount grep recorded in Testing Notes)
- [x] No release mirror pair or CI step anchors on moved text — `grep -c 'Post-closure' claude/skills/ft-release/step-7.1-*.md .github/workflows/ci.yml` → 0 each
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" — `judgment`

## 🧩 Subtasks

- [x] Create `SPEC/post-closure.md`: title + trigger line naming the five load points, then `SPEC.md` lines 648–692 moved verbatim; repoint the two intra-SPEC cites that now cross files and re-base the five `SPEC/*.md` link paths
- [x] Rewrite `SPEC.md` §"Post-closure protocol" as a stub (pointer, load trigger, one-line what-it-is); repoint the two internal section cites (Phase 2 tail, Phase 4 recap bundling) at the module
- [x] Repoint citers: `SPEC/gates.md` §"Conditional skip rule" on-fire line, `SPEC/model.md` glyph paragraph, `SPEC/procedures/ft-task.md` §6, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/DOGFOOD.md`, `docs/GLOSSARY.md` (+ `docs/AGENT-NEUTRALITY.md`'s `/model` row, caught by the Phase 3 grep)
- [x] Wire the Read at each runner's final step: `ft-task` Step 6 (+ Step 0 lazy list), `ft-micro-task` Step 5 (+ Step 0 lazy list), `ft-close-epic` Step 9, `ft-epic-discovery` Step 10 (+ Step 0 lazy list), `ft-release` Step 8
- [x] Rosters: `AGENTS.md` `SPEC/` bullet, `README.md` `SPEC/` bullet + line 69 surface description, `CONTRIBUTING.md` SPEC.md description
- [x] `docs/CONTEXT-BUDGET.md`: two Budgets rows (new + lowered) with "why" cells, "Not budgeted" sentence, §Ledger numbers + cold-start sum + split note
- [x] `docs/AGENT-NEUTRALITY.md` row 40: file set + recount
- [x] Phase 3: `wc -c`, verbatim diff, citation grep, Read-wiring grep, CI budget block, mirror-pair grep, neutrality recount, trailing-whitespace check
- [x] Phase 4: doc-drift sweep, Acceptance tick-through, PLAN stub flip (standalone → top of `## Completed`), archive

## 🔗 Related

- [[CORE-604.2]] — the extraction pattern this task copies (gates.md → gate-postures.md, budgeted-although-lazy, cap lowered on the source so the moved bytes stay under the ratchet)
- [[CORE-535.3]] — earlier SPEC.md → `SPEC/` section moves; dispatch-stub shape (`Canonical contract: see …`, naming when the module loads)
- [[CORE-555]] — related-decision: the two-working-unit headroom standard the new 53,000 cap is sized to
- [[CORE-189]] — the protocol's three mirror sites (SPEC section, `ft-task` §6, `ft-micro-task` Step 5) — the skill bodies restate steps 2–3 by reference, not by copy, so the move leaves no second home

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN line's premise holds at HEAD `ab4c40c`: `wc -c SPEC.md` → 53,999, i.e. 3,001 under the 57,000 cap, and the measured working unit (+1,127 to +2,957, CONTEXT-BUDGET §Budgets) makes that ~1 unit against a two-unit standard. One section is large enough to buy a full unit and is consulted only after closure: §"Post-closure protocol" (7,273 b). The extraction pattern the line names (CORE-604.2) still stands and its precedent lowered the *source* cap so the moved bytes stayed under the ratchet — the operator chose the same here (§E). Nothing contradicts a SPEC contract; the line's "no cap raise" is honored (the cap goes down).

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — markdown contract, no code module boundary. The governing boundary is the split: `SPEC.md` keeps the four phases and the paper-complete guard (both fire before or during closure) and a stub naming when the protocol loads; `SPEC/post-closure.md` holds the three post-archive steps and restates no gate or guard. Dependency direction is one-way (the module cites `SPEC.md` §"🚀 Phase 4: Closure" / §"Paper-complete guard" and `SPEC/gates.md`; the core cites the module only through the stub and two 📦-bundling pointers). No in-scope refactor beyond the move

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — one structured ask (section pick + cap shape), answers in §E

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

### A. Read set and the byte map

`SPEC.md` whole (53,999 b), per-section `wc -c` via an awk split on `^##`/`^###`; `docs/CONTEXT-BUDGET.md` whole; `.github/workflows/ci.yml` §"Context budget" (parses `| `path` | N |` rows under §Budgets — a new row and a lowered row are both picked up with no script change); `claude/skills/ft-release/step-7.1-mirror-pairs.md` (no pair anchors on post-closure text; Pair L binds CI to §7.1 sources, untouched); the module header convention (`> Lazy-loaded SPEC module. Loaded by …` on line 3 of `gate-postures.md`, `blocked.md`, `plan-filing.md`, `loop.md`); every non-archive file naming "post-closure protocol" (26 files; the section-citers are the 12 in §C); the five runner final steps and the SOP §6.

**Candidates, measured** (bytes): §"Post-closure protocol" **7,273** · §"🚀 Phase 4: Closure" 7,123 · §"📝 Phase 1: Discovery" 5,717 · §"Task-line format" 5,652 · §"Tasknote frontmatter" 5,295 · §"Tasknote body shape" ≈ 4,650 · §"🧪 Phase 3" 3,307 · §"Paper-complete guard" ≈ 2,850 · §"Task ID convention" 1,566 · everything else ≤ 1,050. Every candidate other than the first is read on the cold-start path (Step 1 parse, scaffold, or Phase 1–4 drive) or is already a pointer stub. §"Post-closure protocol" is consulted only at the runners' final step, after the tasknote is archived — the same "lazy in principle, per-task in practice" class CONTEXT-BUDGET already budgets `gates.md` under. §"Paper-complete guard" is not lazy: its foreign-dirt gate fires at skill entry.

**Projection.** `SPEC.md` 53,999 − 7,273 + stub (≈ 500) + two repointed cites (≈ 60) ≈ **47,300**; under a 53,000 cap that is ≈ 5,700 of headroom — the two units CORE-555 sized in. `SPEC/post-closure.md` ≈ 7,273 + header (≈ 500) ≈ **7,800**; a 12,000 budget is the file plus ~1.5 units, the `gate-postures.md` sizing rule.

### B. Archive skim

Path grep over `archive/core/` for "post-closure protocol" returns 115 notes — far past the probe line; the two extraction precedents were read whole and the closure-titled notes were skimmed by Final Summary. Load-bearing:

- [[CORE-604.2]] — the pattern named by the PLAN line: verbatim move, stub-with-trigger at the old heading (so the one citation flowtron cannot re-sync, the adopter paste-block, still resolves), Read wired at every load point and nowhere on the flagless path, both halves budgeted, source cap **lowered** so the moved bytes do not escape the ratchet (the fragment-gaming case CONTEXT-BUDGET §Ledger names).
- [[CORE-535.3]] — the SPEC.md → `SPEC/` motion itself: `Canonical contract: see [`SPEC/<mod>.md`]` dispatch stubs naming when the module loads; stubs cost ≈ 95–500 b each, which its own budget arithmetic under-estimated by 47 b — measured here, not projected.
- [[CORE-555]] / [[CORE-558.5]] — the two-working-unit headroom standard and the measured unit (+1,127 to +2,957) the new cap is sized against.
- [[CORE-189]] — the protocol has three mirror sites (SPEC section, `ft-task` §6, `ft-micro-task` Step 5); since then the skill bodies cite steps 2–3 *by reference* ("run … step 2 as written"), so the move creates no second home and the skills' text changes only at the citation.
- [[CORE-046]] / [[CORE-237]] — the protocol's form has drifted between SPEC and skills before; the one-file home plus by-reference citations is what keeps that from recurring, and the move preserves it.

### C. Drift check

- Every figure in the PLAN line reproduces at HEAD: 53,999 / 57,000 / 3,001. `docs/CONTEXT-BUDGET.md` §Ledger still carries the v5.28.0 `SPEC.md` figure (52,993) beside the cold-start paragraph's 53,984 — the standing "ledger is release-refreshed" gap, not new drift; both are refreshed here as [[CORE-604.2]] did for its two files.
- Section-citers of §"Post-closure protocol" outside the archive (12 files): `SPEC.md` (×2 cites + the heading), `SPEC/gates.md:240` (linked), `SPEC/model.md:241` (prose, also still says "SPEC.md cue glossary", stale since [[CORE-535.3]] — repointed with the cite since the parenthetical names where the glyph rule lives), `SPEC/procedures/ft-task.md:462` (linked), `claude/skills/ft-task/SKILL.md` (×3), `ft-micro-task/SKILL.md` (×3), `ft-close-epic/SKILL.md` (×2), `ft-epic-discovery/SKILL.md` (×5), `ft-release/SKILL.md` (×2), `claude/CAPABILITIES.md:55`, `docs/EXTERNAL-AGENTS.md:102`, `docs/DOGFOOD.md:97`, `docs/GLOSSARY.md:107`. Generic prose mentions ("followed by the post-closure protocol") in `claude/AGENTS-snippet.md:28`, `claude/commands/ft-task.md`, `step-4-debug-mode.md`, `step-5-loop-mode.md`, `step-5.5-deep-prepass.md`, `unattended-close-epic.md`, `docs/WORKTREES.md`, `docs/PLATFORMS.md`, `docs/GLOSSARY.md:29,129`, `docs/VERSION-HISTORY.md` are not citations and stay. The paste-block is untouched, which is the point of the stub.
- `README.md:69` and `CONTRIBUTING.md:35` describe `SPEC.md` as the canonical surface for the post-closure protocol — reworded so the description follows the file.
- `docs/AGENT-NEUTRALITY.md:40` — the `--fast` any-mention row counts §"Post-closure protocol" among 5 `SPEC.md` sites. The stub will not name a flag, so `SPEC.md` drops to 4 and the module contributes 1; recount at Phase 3, not assumed.
- No `ft-release` §7.1 pair, standing check, or CI step greps post-closure text (`grep -c` → 0 on all three files). Pair L's CI binding is unaffected: the budget script reads the table.
- `SPEC/layout.md` states the module convention only as "lazy SPEC modules loaded on demand by skills"; the concrete shape is the line-3 trigger line every sibling carries. No frontmatter on the current modules — [[CORE-535.3]]'s `paths: []` note is historical.
- Codex / Cursor / Grok snippets and `templates/` do not cite the section — nothing to repoint there.

### D. Design decisions (in-task; nothing reaches beyond it)

- **Module name `SPEC/post-closure.md`, title `# Post-closure protocol`.** The module's title carries the heading every existing `§"Post-closure protocol"` cite names, so repointed cites read `SPEC/post-closure.md` + "step N" with no sub-heading invention; the body moves verbatim as one flat section.
- **Stub shape** — heading kept, `Canonical contract: see …` pointer, the load trigger ("Read it at the runners' final step, once the tasknote is archived"), and one line saying what the three steps are. Not the 🏁 shape, not the accepted-reply set, not the terminal form: restating any of them would recreate the double-home [[CORE-189]] found.
- **Read wiring** — each runner's final step opens with "Read `<SPEC_DIR>/post-closure.md` now"; the Step 0 lazy-module lists that enumerate modules by name (`ft-task`, `ft-micro-task`, `ft-epic-discovery`) gain it. Nothing before Phase 4 loads it. `ft-close-epic` and `ft-release` name paths without a per-module list, so only their final step changes.
- **Cross-file cites inside the moved text** — §"🚀 Phase 4: Closure" and §"Paper-complete guard" become `[`SPEC.md` §"…"](../SPEC.md)`; the five `SPEC/<mod>.md` links re-base to `<mod>.md`. Nothing else in the body is reworded.
- **`SPEC.md`'s own two cites** (Phase 2 tail "the next operator-gate cue is the 📦 banner in §…", Phase 4 recap "bundles into the 📦 motion (§…)") repoint to the module so a reader is not sent to a stub one hop away.

### E. Resolved scoping (AskUserQuestion, 2026-09-19)

| Question | Decision |
|---|---|
| Section pick | **§"Post-closure protocol" → `SPEC/post-closure.md`** (7,273 b; the only section ≥ 1 working unit that is not on the cold-start path). §"Paper-complete guard" and the two-section variant declined: the foreign-dirt gate fires at entry, so its module would load on the cold-start path anyway. |
| Cap shape | **New row `SPEC/post-closure.md` 12,000 + `SPEC.md` lowered 57,000 → 53,000.** Keeps ≈ 2 working units over the ≈ 47.3k file per the CORE-555 standard; leaving 57,000 over 47k would let the moved 7k escape the ratchet — the fragment-gaming case §Ledger names. A lowering, so the PLAN line's "no cap raise" holds. |

Assumptions asserted: `wc -c` bytes is the budget unit; no `SPEC.md` heading is renamed or removed (heading count stays 28); the §Ledger figures for `SPEC.md`, the new module, and the cold-start sum are refreshed here although the ledger is release-owned, because a 52,993 figure beside a 53,000 cap would read as at-cap.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the [[CORE-604.2]] / [[CORE-535.3]] shape exactly: a lazy `SPEC/*.md` module with the `> Lazy-loaded SPEC module.` trigger line on line 3, a `Canonical contract: see …` dispatch stub with the load trigger left at the old heading, the Read wired at each runner's final step, and the two rosters (`AGENTS.md`, `README.md`) extended by one entry. No new shape

- [x] **Minimal refactor gate** — the move is verbatim; the only deviations are the two intra-SPEC cites that now cross a file boundary and the five link paths re-based from `SPEC/<mod>.md` to `<mod>.md`. `SPEC/model.md:241`'s "SPEC.md cue glossary" (stale since [[CORE-535.3]]) was replaced in the same cite because the parenthetical's job is to name where the glyph rule lives; `docs/AGENT-NEUTRALITY.md`'s `SPEC.md` flag-site count was found under-reported (5 listed, 7 true at HEAD) and corrected by recount rather than left as a note, since the Acceptance criterion *is* the recount. Nothing else reworded

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A` — markdown contract, no executable surface; the Phase 3 receipts are one-off checks, not standing tests

**Implementation Notes:**

- **`SPEC/post-closure.md`** (new, 7,823 b): trigger line naming the five load points (`/ft-task` Step 6, `/ft-micro-task` Step 5, `/ft-close-epic` Step 9, `/ft-epic-discovery` Step 10, `/ft-release` Step 8) and the "nothing before Phase 4 loads it" rule, then `SPEC.md` lines 648–692 moved verbatim. Two prose cites pointed at sections that stayed behind (§"🚀 Phase 4: Closure", §"Paper-complete guard") and were rewritten as `[`SPEC.md` §"…"](../SPEC.md)`; five link targets re-based. `diff` against `HEAD:SPEC.md` 648–692 (links normalised) shows exactly those two lines.
- **`SPEC.md`** (53,999 → 47,265 b): the section is replaced by a stub — pointer, load trigger, one-line description of the three steps — so the heading count stays 30 and the adopter paste-block's copied citation still resolves; the Phase 2 tail and the Phase 4 recap-bundling sentence now cite the module directly instead of sending a reader to the stub.
- **Read wiring** — `ft-task` Step 6, `ft-micro-task` Step 5, `ft-close-epic` Step 9, `ft-epic-discovery` Step 10 and `ft-release` Step 8 each open with **Read `<SPEC_DIR>/post-closure.md` now** (bare `SPEC/post-closure.md` in `ft-release`, which defines no `SPEC_DIR`); the three runners with a Step 0 lazy-module list name it there. `SPEC/procedures/ft-task.md` §6 carries the same read-here-not-earlier note. The step-2 / step-3 "as written" cites in every runner now name the module.
- **Citation repoint** — 14 cites in 13 files outside the archive (the runners above, `SPEC/gates.md` on-fire line, `SPEC/model.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/DOGFOOD.md`, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md` ×2). `README.md:69` / `CONTRIBUTING.md:35` no longer describe `SPEC.md` as the protocol's surface (they name the paper-complete guard instead); `README.md`'s `SPEC/` roster and `AGENTS.md`'s `SPEC/` bullet name the module. `claude/AGENTS-snippet.md` untouched — its "followed by the post-closure protocol" is prose, not a section cite.
- **`docs/CONTEXT-BUDGET.md`** — `SPEC.md` 57,000 → 53,000 and new `SPEC/post-closure.md` 12,000 (operator decision, Discovery §E), each with its "why"; "Not budgeted" sentence names all three budgeted lazy modules; §Ledger `SPEC.md` figure, lazy-module list, cold-start sum (123,850 → 117,719, all seven components re-measured) and split note refreshed. The CI block was run locally against the edited table (bash for the glob row — zsh does not expand `$surface`).
- **Downstream-impact scan** — no direction-changing decision reached beyond the task: no other open PLAN.md row names `SPEC.md`'s cap or the post-closure section, and the next `/ft-release` §7.1 refresh reads the new rows as it reads any other.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A` — markdown only; `viz/` and `tools/` untouched

- [x] Ran lint/type-check on changed code — `N/A` — markdown only; `.editorconfig` conformance checked by the trailing-whitespace grep below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
wc -c SPEC.md                                          → 47265   (was 53,999; cap 53,000 → 5,735 headroom ≈ 2 units)
wc -c SPEC/post-closure.md                             → 7823    (cap 12,000)
sed -n 3p SPEC/post-closure.md | grep -q 'Lazy-loaded SPEC module'      → 0
grep -q '^## Post-closure protocol$' SPEC.md           → 0
grep -c '^## ' SPEC.md                                 → 30 (HEAD: 30)
diff <(git show HEAD:SPEC.md | sed -n 648,692p | sed 's#](SPEC/#](#g') <(tail -n +5 SPEC/post-closure.md)
  → 2 changed lines = the two cross-file prose cites
stale-cite grep (SPEC(.md)? §"Post-closure protocol", non-archive, PLAN excluded)
  → first run: 1 hit (docs/AGENT-NEUTRALITY.md:43, the /model row) — fixed; re-run → exit 1
grep -c 'post-closure.md' — ft-task SKILL 4 · ft-micro-task SKILL 4 · ft-close-epic SKILL 2 ·
  ft-epic-discovery SKILL 6 · ft-release SKILL 2 · procedures/ft-task.md 1
  (README.md / AGENTS.md rosters are name-worded: grep -q 'post-closure' → 0 on both)
judgment: every Read sits at the runner's final step; the Step 0 lists enumerate, they do not load
cross-file links in the module resolve (../SPEC.md, gates, gate-postures, cue-vocabulary, model, layout) → all ok
ci.yml "Context budget" block, run locally (bash)     → 0
  SPEC.md 47,265/53,000 · gates.md 20,796/25,000 · gate-postures.md 19,029/23,000 ·
  post-closure.md 7,823/12,000 · ft-release SKILL 31,678/40,000 · glob row: 10 bodies all ≤ 33,000
  (largest ft-epic-discovery 29,174)
grep -c 'Post-closure' step-7.1-mirror-pairs.md step-7.1-standing-checks.md ci.yml → 0 · 0 · 0
AGENT-NEUTRALITY recount (SPEC.md sections whose body names --fast or --unattended, awk over headings):
  HEAD: Task-line format · Operator-gate cues · Phase 1 · Phase 3 · Phase 4 · Loop tasks · Post-closure = 7
  now:  the same minus Post-closure = 6 (ledger had said 5 — Phase 4 and Loop tasks were unlisted)
  SPEC/post-closure.md: 1 (opening paragraph)
grep -rn '57,000' outside archive/PLAN/CONTEXT-BUDGET  → none (no other surface restates the cap)
privileged-ops keyword grep over git diff -U0          → no hits
trailing-whitespace grep over changed files            → none
```

Structural assertions: no duplication introduced (the stub carries a pointer, a trigger, and a one-line description — not the 🏁 shape, the reply set, or the terminal form); no dead pointer (stale-cite grep + link check); public-surface growth is one module plus its two roster entries; code-facing docs updated (`CONTEXT-BUDGET`, `AGENT-NEUTRALITY`, `CAPABILITIES`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` updated (SPEC.md description names the paper-complete guard in place of the moved protocol; `SPEC/` roster names `post-closure`) · `AGENTS.md` updated (`SPEC/` bullet: "the post-closure protocol") · `SPEC.md` updated (section → stub; two internal cites → module) · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (prose mention only; the stub keeps any copied cite resolving) · `codex/AGENTS-snippet.md` no change · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` updated (SPEC.md description) · `SECURITY.md` no change (cites `gates.md` sections only) · `docs/AGENT-NEUTRALITY.md` updated (`--fast` row file set + 7 → 6 recount; `/model` row cite) · `docs/PLATFORMS.md` no change (generic contract-layer mention) · `claude/CAPABILITIES.md` updated (ledger-row pointer; trigger table and last-verified stamp untouched — no capability changed) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` updated (one cite) · `docs/WORKTREES.md` no change (prose mention) · `docs/VISION.md` no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Moved §"Post-closure protocol" out of always-loaded `SPEC.md` into a new lazy
`SPEC/post-closure.md`, read by each closing runner at its final step and by
nothing earlier, so the cold-start path sheds 7.3k it never consulted before
the tasknote was archived. `SPEC.md` keeps a stub at the heading (pointer,
load trigger, one-line description), so the adopter paste-block's copied
citation still resolves. Both halves sit under the CI byte ratchet: a new
12,000 row for the module and `SPEC.md`'s cap lowered 57,000 → 53,000 so the
moved bytes restore two working units of headroom instead of widening the
core's margin.

- Files: 19 non-workflow paths — `SPEC/post-closure.md` (new, 7,823 b), `SPEC.md` (53,999 → 47,265 b), `SPEC/gates.md`, `SPEC/model.md`, `SPEC/procedures/ft-task.md`, five runner `SKILL.md` bodies, `claude/CAPABILITIES.md`, `AGENTS.md`, `README.md`, `CONTRIBUTING.md`, five `docs/`; plus PLAN.md and this tasknote.
- Verification: receipts above — verbatim diff 2 lines (the cross-file cites), stale-cite grep exit 1 after one catch, CI budget block 0 on all five budgeted rows plus the glob row, mirror-pair / CI anchor grep 0, neutrality recount 7 → 6.
- Refactors: none beyond the move. Two adjacent stale facts corrected because the Acceptance criteria owned them (`model.md`'s "cue glossary" cite; the neutrality row's under-count). Nothing deferred.
- Documentation verdict: 8 updated / 10 "no change" (sweep above).
- `touches:` reconciliation: declared 19 paths, changed 19 files — undeclared: none.
- Maintainability effect: default-path cold start 123,850 → 117,719 chars (≈ 1.5k tokens); `SPEC.md` headroom 3,001 → 5,735 under a cap that went down, not up; the protocol has one home with its load trigger stated in five runner bodies, the SOP, and the stub.

**Archived:** 2026-09-19
