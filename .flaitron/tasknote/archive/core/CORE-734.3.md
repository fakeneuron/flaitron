---
title: mirror-pair-census
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.2, CORE-734.N, CORE-729, CORE-631.2]
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
---

# CORE-734.3 | mirror-pair-census

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-734]] · [[CORE-734.2]] · [[CORE-734.N]] · [[CORE-729]] · [[CORE-631.2]]

> **⚠️ Superseded by [[CORE-734.N]]** — "Letter E never existed in the file" is false: Pair E (`ft-flowtron` roster ↔ shipped skills) was a live entry until [[CORE-603.2]] deleted it without a stub.

## 🎯 Goal

Classify every §7.1 mirror Pair, every live `KEEP IN SYNC` comment, and the 7× Skill/pin guard as necessary (distinct consumers) or collapsible (one source + pointer), file one CORE-EPIC-734 child per collapsible group, and set the target Pair count the `.N` audit verifies.

## ✅ Acceptance

- [x] The census table in Discovery Notes classifies all 17 `**Pair <L>` entries in `step-7.1-mirror-pairs.md`, the four live `KEEP IN SYNC` comments, and the Skill/pin guard — `grep -c '^\*\*Pair [A-Z]' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 17, matching the table rows; `judgment` on each verdict
- [x] One unchecked child per collapsible group (four, operator-confirmed) is nested under CORE-EPIC-734 between `.3` and `.N`, in order — `awk '/CORE-EPIC-734/{f=1} f&&/^- /&&!/CORE-EPIC-734/{f=0} f' .flaitron/PLAN.md | grep -oE 'CORE-734\.[0-9N]+'` prints `.2 .3 .4 .5 .6 .7 .N` in that order
- [x] Each new row follows the task-line grammar and stays within the ≤50-word target — word-count script over the `.4`–`.7` long descriptions (Phase 3)
- [x] The target Pair count is recorded on the `.N` row, where the audit reads it — `grep -qE 'CORE-734\.N.*12 live' .flaitron/PLAN.md`
- [x] The tree still passes every drift check, including Pair Q on any new citation — `bash tools/drift-checks.sh` → 0

## 🧩 Subtasks

- [x] Census: read each Pair entry, the `KEEP IN SYNC` comments, and the guard; classify each one (Discovery Notes table)
- [x] Confirm the collapsible groups to file with the operator
- [x] File `.4`–`.7` under CORE-EPIC-734, ahead of `.N`, and give the `.N` row its target
- [x] Phase 3: grammar and word count, the ordering awk, the full drift-check run, external review

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax); Discovery supplied by audit-repo 2026-10-07, no `.1` note
- [[CORE-734.2]] — predecessor: moved the drift shell into `tools/drift-checks.sh`, which makes Pair L's source rows collapsible
- [[CORE-734.N]] — the audit that verifies the target set here
- [[CORE-729]] — related-decision: made the 7× Skill/pin guard byte-identical copies on purpose, and CI-enforced
- [[CORE-631.2]] — related-decision: split the §7.1 catalogue from the shell, which is how `Reads:` lines came to exist

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `claude/skills/ft-release/**` sits at 120,145 of its 125,000 budget, and the ledger prices a new mirror pair at +4,000–5,300 bytes. The mirror catalogue is what the budget is paying for. [[CORE-734.2]] has just landed the script, so Pair L's premise has changed and a census now has something to act on.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set.**
  - `step-7.1-mirror-pairs.md` in full.
  - Every `KEEP IN SYNC` hit outside the archive. There are four live comments: three in `AGENTS.md` (L21, L35, L46; `CLAUDE.md` is a symlink to it) and one in `claude/AGENTS-snippet.md` (L9). The snippet comment guards the same three items from the other side. The two hits in `.flaitron/audit-overlay/SKILL.md` and the two in `PLAN.md` mention the phrase but are not guards.
  - The seven `**Skill/pin guard.**` paragraphs, plus `skill_pin_guard_parity` in `tools/drift-checks.sh`.
  - Each mirror site named by Pairs A, F, H and I. The Pair N/O filer sites.
  - The source-row shells behind Pair L: `SPEC/layout.md` L82, and the shipped-skill parity and context-budget checks in `step-7.1-standing-checks.md` at L18 and L152.
- **Best Practices Review.** No code changes here, so the review is about consumers. For each mirror, the question is whether its copy has a **reader the source cannot reach**: a different agent's dispatch surface, a UI field, an executable runner, or a file that must work on its own. If it does, it is **necessary**. If its reader could follow a pointer at no cost to correctness, it is **collapsible**.
- **Census — the 17 §7.1 entries.** Letter E never existed in the file. G is retired, and D is a pointer to a standing check. That leaves **15 live pairs**.

  | Pair | Mirror | Verdict | Why |
  |---|---|---|---|
  | A | `templates/` ↔ README + `SPEC/layout.md` clauses | **collapsible (partial)** | README is a second prose roster for the same reader. It can point at `SPEC/layout.md`. `pair_a` is presence-only (the clause exists in both files), so it has no job left and leaves CI. Accepted tradeoff: the one remaining clause is then guarded only by the release-time content judgment (disk ↔ `SPEC/layout.md`). |
  | B | Claude ↔ Codex `description:` flags | necessary | Codex dispatches from its own `description:`, a separate consumer that cannot follow a pointer |
  | C | template back-link depth | necessary, not a mirror | Checks one file against a write-target invariant. Nothing is restated. |
  | D | README counter | — (pointer) | Already a pointer to the standing check. No mirror here. |
  | F | park-priority flags ↔ GLOSSARY, MIGRATION, tasknote-selection, AGENTS.md, snippet, command stubs | **collapsible** | Only the skill usage line and `SPEC/tasknote-selection.md` (the flag → section mapping) need the roster. The other surfaces carry it only because Pair F demands it. Out of Pair F's scope and kept: `claude/CAPABILITIES.md` L34 (the flag reference Pair I reads), `park-mode.md` / `step-0-flags.md` / the stub `argument-hint:` (the skill itself, covered by J/M), and `docs/CODEX-VERIFICATION.md` L288 (a dated verification record). The AGENTS.md/snippet `KEEP IN SYNC` note says "names-only, except … which the Pair F release gate requires", which is circular. |
  | G | — | retired ([[CORE-571]]) | — |
  | H | validation roster ↔ CI, CONVENTIONS, tasknote README, `/ft-release` Step 6 fence | **collapsible (partial)** | `ci.yml` is necessary because a CI runner executes it. CONVENTIONS and the tasknote README are prose readers. The ft-release fence repeats `AGENTS.md`, which flaitron-self always loads anyway. H keeps its AGENTS ↔ `ci.yml` verbatim half. |
  | I | `CAPABILITIES.md` flag rows ↔ PLATFORMS non-Claude tables | **collapsible** | Every non-Claude flag row restates the Claude semantics and adds "same availability as `--fast`". The real per-platform delta is routing: one story for Grok and Cursor, while Codex has two (SOP-first for the `ft-task` flags, direct wrapper for `--park` / `--starter` / `--deep`), and `.6` keeps that split. |
  | J | stub prose ↔ `argument-hint:` | necessary | `argument-hint:` is the Claude Code slash-command UI, a separate consumer |
  | K | VISION bullets ↔ labeled restatements | necessary | The labeled-mirror pattern is ratified in CONVENTIONS, and each restatement applies the rule to its own surface. A possible K1 → Q check merge is not a mirror collapse. Logged as a note, not filed. |
  | L | `drift-checks.sh` ↔ 3 source shells + 11 `Reads:` lines | **collapsible** | Since [[CORE-734.2]], the script can be the only shell for the three source rows, with `SPEC/layout.md` and the standing checks pointing at it. The `Reads:` line just restates the function, and the `Check: pair_x` line already points at it. Once both halves collapse, L has nothing to bind and retires. |
  | M | `argument-hint:` ↔ skill `description:` | necessary | The description is the dispatch surface and the hint is the UI. Two consumers. |
  | N | filers ↔ `SPEC/unattended-candidacy.md` | necessary | Already pointer-shaped ("Read that module now"). What remains is per-surface: which posture this filer takes. |
  | O | filing runners ↔ `SPEC/plan-filing.md` §"Filing commits" | necessary | Each runner carries its own pathspecs and message fence. That content cannot be a pointer. |
  | P | archive ↔ Acceptance tick-through | necessary, not a mirror | Integrity check on closure output |
  | Q | `§"Title"` citations ↔ headings | necessary, not a mirror | Referential integrity |
  | R | PLAN stub rows ↔ shortname rule | necessary, not a mirror | Integrity check on closure output |

- **Census — `KEEP IN SYNC` (4 comments, 3 guarded items).** The three items are the roster plus path bullets, the `[model]` bullet ([[CORE-516]]), and "Do not skip phases" ([[CORE-519]]). All are **necessary**. `AGENTS.md` is flaitron-self's always-loaded guide. The snippet's fence is pasted into each adopter's always-loaded `AGENTS.md`. Neither can point at the other without costing a Read every session, and the version-bump skill differs by checkout. One part does change: the roster item's park-flag exception goes away with Pair F's retirement, and `.5` edits both comments.
- **Census — 7× Skill/pin guard: necessary.** [[CORE-729]] made the copies deliberate: "each body must be self-sufficient against an old pin". The guard checks the very fragment-loading path a shared pointer would depend on. Moving it to a fragment would make the guard rely on what it guards. It is already CI-enforced by `skill_pin_guard_parity`.
- **Target.** 15 live §7.1 pairs (pointer D and retired G not counted) → **12**: F, I and L retire, and A and H narrow but stay. `pair_*` drift checks: 11 → **10** (`pair_a` leaves CI). This is recorded on the `.N` row so the audit verifies a number rather than a feeling.
- **Archive skim.** `archive/core/` was confirmed against the README table. Read [[CORE-729]] (guard rationale, above) and [[CORE-734.2]] (script move; Pair L rebound). The history of each Pair is summarized in its own entry, and those summaries were used rather than re-reading ~40 minting notes; nothing in them argues for a mirror the table calls collapsible. [[CORE-631.2]] split shell from catalogue for budget reasons, and that is where `Reads:` lines came from.
- **Drift check.**
  - The PLAN line matches the work.
  - "Every Pair" means 17 entries, of which 15 are live.
  - "Every `KEEP IN SYNC` comment" means four, not the 134 raw grep hits. Most of those hits are inside the archive and VERSION-HISTORY.
  - The guard copy count of 7 matches `skill_pin_guard_parity`.
  - No SPEC contract is contradicted. Retiring a pair follows the Pair G precedent: the letter stays so later citations stay stable.
- **Downstream-impact scan (filing trigger).**
  - `CORE-734.N`: impacted, because it receives the target. The operator confirms this at the filing review.
  - Unaffected: `CORE-EPIC-735` (different surface), and `CORE-727`, `CORE-683` and `CORE-641` (decay windows and TS bump).
- **Clarifications (AskUserQuestion, 2026-10-07).** The operator chose to file all four collapsible groups: retire L, retire F, retire I, and narrow H + A.
- **Assumptions.**
  - Children are numbered `.4`–`.7` in that order and run serially. There is no `.1` note, so there is no Fan-out.
  - Model tags: `.4` is `[heavy]🧠`, because it rewrites the CONVENTIONS shell-ownership contract and the standing checks. The others are `[medium]🧩`.
  - `touches:` is omitted because the only deliverable is the `PLAN.md` filing (SPEC §"Tasknote frontmatter" exemption).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no code; the deliverable is a PLAN.md filing

**Implementation Notes:**

- *Pattern survey.* The children were filed in the existing epic-child shape: 2-space nested, inserted before `.N` (`SPEC/epic.md` §"Numbering convention"), with the `[model]` glyphs PLAN.md already uses. Pair retirement follows Pair G's precedent: the letter is kept so later citations stay stable.
- *Filing.*
  - `.4`–`.7` were inserted between `.3` and `.N`.
  - The `.N` row gained the target, a Stale → amend reconcile from the downstream-impact scan, confirmed by the operator ("go").
  - The rows were amended once more after the external review (Testing Notes): `.4` now names CONVENTIONS and the §7.1 local run, `.5` the `pair_j`/`pair_m` exemption, `.6` the Codex routing split and CONVENTIONS, `.7` the `pair_h` narrowing and the "eleven pairs" counts, and `.N` the D/G exclusion.
- *Minimal refactor gate.* Nothing was refactored. The K1 → Q check merge is logged in Discovery Notes as a note, not filed. It is a check consolidation rather than a mirror collapse, and the operator chose the four mirror groups.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; the live PLAN.md was parsed with `viz/src/parser.ts` instead (below)

- [x] Ran lint/type-check on changed code — N/A: markdown only; drift checks cover it

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review blocker was fixed):

```text
grep -c '^\*\*Pair [A-Z]' step-7.1-mirror-pairs.md        → 17; census table rows → 17
awk epic-cohort order                                    → .2 .3 .4 .5 .6 .7 .N
word count .4/.5/.6/.7/.N                                → 41/35/38/35/28 (≤50 target)
viz/src/parser.ts parsePlanWithDiagnostics(PLAN.md)      → all five rows parse; unparsed [] ; nearMissHeadings []
grep -qE 'CORE-734\.N.*12 live' .flaitron/PLAN.md         → 0
bash tools/drift-checks.sh                               → 0 (16 ok)
```

First pass: `bash tools/drift-checks.sh` → 1 once the tasknote was intent-to-add (`pair_q` MISSING FILE `plan-filing.md`). The run before that showed 0 only because the note was untracked and invisible to `git ls-files`.

External review: `/code-review medium` over the working-tree diff (PLAN.md and this note). It found **1 blocker** and **9 notes**.

- **Blocker, fixed.** Pair O's census row cited `plan-filing.md` without the `SPEC/` prefix, so `pair_q` failed and Acceptance #5 was unmet. Fixed, and Phase 3 re-ran from the top.
- **Notes**, all fixed in place:
  1. `.5` left `pair_j`/`pair_m`'s park-flag exemption alone → the row now says to re-home it.
  2. The Pair F verdict missed the roster in CAPABILITIES L34, `park-mode.md`, `step-0-flags.md`, and CODEX-VERIFICATION L288 → the census now lists them as out of scope and kept, with a reason for each.
  3. The Pair I verdict said "one routing story". Codex has two → the census and `.6` now keep the SOP-first vs direct-wrapper split.
  4. The `.N` count of 12 silently excluded pointer D → the `.N` row and the census now say D and G are not counted.
  5. The Pair A rationale called `pair_a` "byte-identity"; it is presence-only. → Corrected, and the residual (one clause guarded only at release) is recorded as an accepted tradeoff.
  6. `.4` omitted `docs/CONVENTIONS.md` → named, and also on `.6`. `.5` touches no CONVENTIONS text about F beyond what `.4` rewrites.
  7. No child updated the "eleven pairs" counts → added to `.7`.
  8. `.7` didn't mention `pair_h`'s presence half → the row now says it narrows `pair_h`.
  9. `.4` would leave the release walk not re-running `shipped_skill_parity`/`context_budget` → `.4` now says the §7.1 local run invokes them.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:** no change to any entry. The diff is PLAN.md and this note only: `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. The surfaces the census names get their edits in `.4`–`.7`.

**Recap.** I classified all 17 §7.1 Pair entries (15 live), the four `KEEP IN SYNC` comments, and the 7× Skill/pin guard. Four groups are collapsible and are filed as CORE-EPIC-734 children:

- `.4`: retire L
- `.5`: retire F
- `.6`: retire I
- `.7`: narrow H and A

Everything else is necessary: it has a separate consumer, is an integrity check rather than a mirror, or (the guard) must stand alone against an old pin. The target, 12 live Pairs and 10 `pair_*` checks, is on the `.N` row for the audit to verify.

- **Changed:** `.flaitron/PLAN.md` (+5 rows / 1 amended) and this note.
- **Verification:** the receipt above. All checks pass on the second pass, after one review blocker was fixed.
- **Refactors:** none.
- **Scope:** `N/A — no file deliverable` (PLAN.md filing only; `touches:` exempt).
- **Maintainability:** the epic now has a measurable target. `.4`–`.7` remove three pairs and one CI check, and give back budget on `claude/skills/ft-release/**` (120,145 of 125,000).

**Learnings:** N/A. The census verdicts live in this note, and the target lives on the `.N` row.

**Archived:** 2026-10-07
