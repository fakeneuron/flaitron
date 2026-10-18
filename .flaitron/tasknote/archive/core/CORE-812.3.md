---
title: seed-absorbs-prep
status: completed
tags: [unattended, seed-unattended, prep-unattended, skill]
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-812.1, CORE-812.2, CORE-812.4, CORE-783.3, CORE-797, CORE-810, CORE-811]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-seed-unattended/SKILL.md
  - codex/skills/ft-seed-unattended/SKILL.md
  - docs/CONTEXT-BUDGET.md
blocked-by:
  - CORE-812.2
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-812.3 | seed-absorbs-prep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-812]]

## 🎯 Goal

Fold `/ft-prep-unattended`'s classification and drafting into `claude/skills/ft-seed-unattended/SKILL.md` per the CORE-812.2 contract — one walk, one Step 3 gate (marks · preparations with dependent token items · stays), one filing commit covering tokens, rewrites, mechanical rows, and starters — mirror the Codex wrapper, and re-measure the seed row in `docs/CONTEXT-BUDGET.md`.

- [x] Seed walk classifies declined rows into pin / split / stay from the module and drafts the bytes — `grep -q 'Preparing declined rows' claude/skills/ft-seed-unattended/SKILL.md && grep -q 'tasknote-starter-template.md' claude/skills/ft-seed-unattended/SKILL.md && grep -q 'passes clauses 1–5\|clauses 1–5' claude/skills/ft-seed-unattended/SKILL.md`
- [x] One Step 3 gate in three parts, dependent token items under preparations — `f=claude/skills/ft-seed-unattended/SKILL.md; grep -q '\*\*Marks\*\*' $f && grep -q '\*\*Preparations\*\*' $f && grep -q '\*\*Stays\*\*' $f && grep -q 'dependent token item' $f && test "$(grep -c '^## Step 3' $f)" = 1`
- [x] One filing commit covers PLAN.md and every starter — `f=claude/skills/ft-seed-unattended/SKILL.md; grep -q 'git add .flaitron/tasknote/<ID>.md' $f && grep -q 'chore: seed \[unattended\] — <N> rows' $f && ! grep -q 'chore: prep unattended' $f`
- [x] The seed body names no prep slug and keeps `[handoff]` unwritten — `f=claude/skills/ft-seed-unattended/SKILL.md; ! grep -q 'ft-prep-unattended' $f && grep -q 'never writes `\[handoff\]`' $f`
- [x] Prep body and wrapper left in place, byte-identical — `git diff --quiet HEAD -- claude/skills/ft-prep-unattended codex/skills/ft-prep-unattended`
- [x] Codex wrapper mirrors the merged walk — `grep -qi 'prepar' codex/skills/ft-seed-unattended/SKILL.md`
- [x] Seed row in `docs/CONTEXT-BUDGET.md` §"Skill bodies" matches the measured body — `tr '\n' ' ' < docs/CONTEXT-BUDGET.md | grep -q "ft-seed-unattended $(wc -c < claude/skills/ft-seed-unattended/SKILL.md | awk '{printf "%d,%03d", $1/1000, $1%1000}')"`
- [x] Drift checks green (Pair N mirror + literal, frontmatter, pin-guard parity, budgets, Pair Q) — `bash tools/drift-checks.sh`
- [x] Body matches the CORE-812.2 contract (§"Seeding an existing plan": gate opens on a mark or a preparation; drop-preparation drops item, drop-item keeps preparation; kept item counts for clause 6; verbatim-to-file on a mark, to-draft on an item) — `judgment`: prose correspondence, no command decides it

- [x] Frontmatter `description:` and intro: one walk that marks admitted rows and prepares declined ones; prep's triggers (prep, unblock, split) route here; the operator-act rule kept
- [x] Step 1: Read the module (predicate + §"Preparing declined rows"); skip classes unchanged; "does not rewrite" narrowed to "does not repair a token"
- [x] Step 2: classify every row — candidate, or declined → stay / pin / split with the collision and missing-`.N` stays settled first; draft pins, splits (remainder, mechanical row, screen, starter) as prep did; then a dependent token item when the predicate admits the drafted row; clause-6 ordering with kept items counting
- [x] Step 3: counts · marks · preparations (+ item or the clause that withholds one) · stays · the ask; gate opens on a mark or a preparation
- [x] Step 4: pre-check + ID re-scan; write kept marks, kept preparations, kept items, starters; one commit staging PLAN.md + starters; recognizer list widened
- [x] Step 5 + Notes: report seeded / prepared counts; drop "never writes the token" framing; keep seeds-never-repairs, does-not-retag, filers keep gates
- [x] Codex wrapper description mirrors the merged walk
- [x] Re-measure the seed row in `docs/CONTEXT-BUDGET.md` §"Skill bodies"
- [x] Phase 3: Acceptance commands, `bash tools/drift-checks.sh`, `/code-review medium` on this diff
- [x] Phase 4: doc-drift sweep, PLAN stub nested under CORE-EPIC-812, archive

## 🔗 Related

- [[CORE-EPIC-812]] — parent epic
- [[CORE-812.1]] — Discovery; "Resolved scoping" table
- [[CORE-812.2]] — predecessor; the contract this body implements
- [[CORE-812.4]] — follow-up; retires the prep body, wrapper, and roster entries
- [[CORE-783.3]] — shipped `/ft-prep-unattended` (the Step 2 drafting rules folded here)
- [[CORE-797]] · [[CORE-810]] · [[CORE-811]] — split-safety guard, ship-before-the-act, drafted-row self-screen; all three must survive the fold

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.2` landed the contract (one gate, dependent token items) while both shipped bodies still describe two walks; until this child folds prep's Step 2 into seed, the module promises a gate no skill runs. `.4` cannot retire the prep slug until seed does its work.

- [x] Read relevant source files — `claude/skills/ft-seed-unattended/SKILL.md` and `claude/skills/ft-prep-unattended/SKILL.md` in full; both Codex wrappers; `SPEC/unattended-candidacy.md` §"Seeding an existing plan" + §"Preparing declined rows" (post-`.2`); `SPEC/plan-filing.md` §"Filing commits" (message table, recognizer); `tools/drift-checks.sh` `pair_n`, `skill_frontmatter_yaml`, `skill_pin_guard_parity`; `docs/CONTEXT-BUDGET.md` §"Skill bodies"

- [x] **Best Practices Review** — module-boundary work. The predicate and taxonomy stay single-sourced in the module; the body carries procedure only (walk order, drafting mechanics, gate shape, write, commit). Prep's Step 2 drafting mechanics are procedure, not taxonomy, so they move into seed's Step 2 rather than into the module. Steps 0, 4, 5 of the two bodies were near-duplicates; the merge keeps one copy.

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Hits on the two skill paths: CORE-769.6, CORE-778.1, CORE-778.3, CORE-783.1, CORE-783.3, CORE-783.N, CORE-796, CORE-797, CORE-798, CORE-799, CORE-810, CORE-811, CORE-812.1, CORE-812.2. The load-bearing ones are already digested in `.1` / `.2` (below).

- [x] **Drift check** — PLAN line matches HEAD: both bodies exist (seed 12,487 B, prep 12,837 B); the budget ledger lists seed 12,487 (matches) and prep 12,334 (stale since CORE-810/811 — `.4` deletes the row, so not touched here). `.2`'s merged section is at `SPEC/unattended-candidacy.md:138`, taxonomy `###` at `:196`. `.1` Fan-out "`.3` after `.2`" echoed as `blocked-by: [CORE-812.2]` (closed).

- [x] No clarifications needed. Assumptions: (1) the commit subject stays `chore: seed [unattended] — <N> rows` — `SPEC/plan-filing.md`'s table binds it — with `<N>` = source rows kept (marks + preparations; a token item rides its preparation); (2) the frontmatter `description:` absorbs prep's triggers (prep, unblock, split) so such requests route to seed while both slugs ship; (3) the seed body names no prep slug, and the prep body + wrapper stay byte-identical for `.4`; (4) only the seed figure in the budget ledger is re-measured, with a dated note; (5) `SPEC/plan-filing.md` and the roster docs are not touched (`.2` reconciled the former; `.4` owns the latter).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Archive findings (via `.1` / `.2`):
- [[CORE-797]] G2 — both prep guards held only because the walk read the whole taxonomy section, not the bullets alone. Seed's Step 1 keeps "Read the module in full".
- [[CORE-810]] / [[CORE-811]] — ship-before-the-act and the drafted-row self-screen live in the module's Split bullet; prep's Step 2 "Screen" sub-bullet is the procedural half (screen the mechanical row, not the remainder; drop a tripping source-ID mention and re-screen; a remaining trip → stay). Carried verbatim.
- [[CORE-812.2]] — two defaults kept conservative: a split's mechanical `.k` waits under clause 6 on the highest numeric sibling (the remainder itself when the source was the highest); a pin on a `[heavy]` row is a preparation without an item. The token item's test is the full predicate (clause 6 included) over the drafted row — distinct from the self-screen (clauses 1–5).

Walk order for the merged Step 2: resolve rows predecessor-first (as seed does); for each row, either candidate, or declined → classify → draft → test the drafted row for an item. A kept item counts as a same-walk candidate for clause 6, so a dependent resolved later can lean on it; the Step 3 reply's drop rule then cascades over marks and items alike.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended seed's own five-step shape; prep's Step 2 drafting bullets (pin / split → remainder · mechanical row · screen · starter) carried verbatim into seed's Step 2; the gate example keeps seed's `text` block form

- [x] **Minimal refactor gate** — no refactor beyond the fold; Step 0 (guard paragraph byte-identical, `skill_pin_guard_parity` green) and the Pair N mirror line unchanged

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (skill prose; `tools/drift-checks.sh` is the executable check)

**Implementation Notes:**

`claude/skills/ft-seed-unattended/SKILL.md` 12,487 → 19,799 B (cap 33,000). Changes by step:
- Frontmatter/intro — description names marking and preparing, and prep's triggers (prep, unblock, split); intro says the skill may insert a mechanical row and file a starter; the operator-act paragraph points at §"Preparing declined rows" instead of restating it.
- Step 1 — reads the predicate *and* the taxonomy; "This skill seeds; it does not rewrite" narrowed to "does not rewrite a token into place"; `[handoff]` rows also never prepared.
- Step 2 — candidate → **mark**; declined → stay / pin / split; collision stays settled first; prep's drafting bullets verbatim (minus "No draft contains `[unattended]`", now `[handoff]` only); new **Token items** paragraph: full predicate over the pinned row or the mechanical row (never the remainder), item or withholding clause, the `.k`-waits-on-highest-sibling default from `.2`. Clause 6 counts "a mark, or a token item".
- Step 3 — counts (marks · pins · splits · stays) · Marks · Preparations (each with item or `no item — clause N`) · Stays · the ask (`<ID> item` drops only the item; preparation drop cascades to item, mechanical row, starter; mark/item drop cascades to leaners). Gate opens on a mark or a preparation.
- Step 4 — prep's ID re-scan joined to seed's pre-check; write rules for mark / pin / split with the token on kept items; one commit staging PLAN.md + starters under seed's subject; recognizer widened to match `SPEC/plan-filing.md` (`.2` already recognizes these shapes for seed).
- Step 5/Notes — seeded and prepared lines; lean-drops and taken IDs reported; "seeds, never repairs" → "seeds and prepares, never repairs"; prep's does-not-retag note carried; "never writes `[handoff]`" kept.

`codex/skills/ft-seed-unattended/SKILL.md` description names preparing. `docs/CONTEXT-BUDGET.md` §"Skill bodies": seed re-measured 19,799, re-sorted, one dated sentence. Prep body and wrapper untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (Pair N mirror + literal, `skill_frontmatter_yaml`, `skill_pin_guard_parity`, `context_budget`, Pair Q, final newlines)

- [x] Ran lint/type-check on changed code — N/A (markdown only); trailing-whitespace grep on the added diff lines → 0

- [x] **Verification receipt** — below; the prep/seed duplicate procedure now lives once in the seed body (prep body untouched until `.4`), no dead text, stale sibling prose deferred to `.4` by name

- [x] **External review** — `/code-review` on the working-tree diff, six passes (five medium, one narrow low); dispositions below

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Final verification receipt (after pass-5 fixes):
- A1 `grep -q 'Preparing declined rows' … && grep -q 'tasknote-starter-template.md' … && grep -q 'clauses 1–5' …` → 0
- A2 Marks / Preparations / Stays / `dependent token item` / one `## Step 3` → 0
- A3 starter `git add` + `chore: seed [unattended] — <N> rows` + no prep subject → 0
- A4 `! grep -q 'ft-prep-unattended' … && grep -q 'never writes \`[handoff]\`' …` → 0
- A5 `git diff --quiet HEAD -- claude/skills/ft-prep-unattended codex/skills/ft-prep-unattended` → 0
- A6 `grep -qi 'prepar' codex/skills/ft-seed-unattended/SKILL.md` → 0
- A7 budget ledger figure matches `wc -c` (22,345) → 0
- A8 `bash tools/drift-checks.sh` → 0 (17 ok)
- A9 judgment: gate opens on a mark or a preparation (Step 3 last paragraph); drop-preparation drops item, drop-item keeps preparation (Step 3 ask + reply paragraph); kept item counts for clause 6 (Step 2); verbatim to the file on a mark, to the draft on an item (Step 4 item 2) — matches `.2` §"Seeding an existing plan".

External review, pass 1 — ten findings:
1. **blocker, fixed** — the starter-path collision check ran only before the gate; a note created while the operator replied would be overwritten. Step 4's re-scan now re-runs it (widened in pass 2).
2. **blocker, fixed** — a split skipped at Step 4 (ID taken) did not cascade to marks/items leaning on its item. Now it applies the reply's drop rules.
3. **blocker, fixed** — step order read as "marks first, preparations later", so a dependent of a pinned row's item would be declined. Each row is now finished (classification, draft, item) before any row that waits on it.
4. **blocker, fixed** — reply grammar did not say whether a source ID keeps its item or which ID names a split's item. A source ID names its mark or preparation-with-item; `<source ID> item` names only the item; mechanical IDs read as their source.
5. **note, accepted** — the new description overlaps `/ft-prep-unattended`'s triggers. Interim until `.4` retires prep in the same minor; both routes work meanwhile.
6. **note, accepted** — commit-subject `<N>` (source rows kept) differs from Step 5's seeded count. Documented at both sites; the subject is bound by `SPEC/plan-filing.md`'s table.
7. **blocker, fixed** — the recognizer accepted a token on any kept source row; now only on a pin whose item was kept, never on a remainder.
8. **note, accepted** — Step 2 carries drafting mechanics (collision stays, tiers, word limits). Procedure carried verbatim from prep's body by the epic's design (`.1`); the module states the classes, the body the bytes. The prep body had the same split.
9. **note, fixed** — a starter for a remainder now adds the `Filed with starter at …` pointer, as `/ft-file-task --starter` writes it.
10. **note, accepted** — prep's ledger figure (12,334) is its v7.2.0 stamp, unstamped since CORE-810/811 by precedent; `.4` deletes the row.

External review, pass 2 — eight findings, all fixed (four of six pass-1 fixes held; #1 and #3 held partly):
1. **blocker, fixed** — a mechanical `.k` waits on a sibling resolved after its source; its item is now decided once that sibling resolves, before the `.N`.
2. **blocker, fixed** — the Step 4 re-scan missed pins and starterless splits; it now re-runs the collision check on every kept preparation's source ID.
3. **blocker, fixed** — dropping or skipping an earlier epic split left later-numbered mechanical rows with gaps and stale leans; it now drops every later-numbered kept split in that epic ("the IDs shown are the IDs written").
4. **blocker, fixed** — a pin leaving another clause-3 trip was shown as a pin; it now reclassifies as split or stay, per the module's Pin bullet.
5. **blocker, fixed** — Step 5's seeded line named a split's item by its source ID; it now lists the IDs that carry the token.
6. **blocker, fixed** — a keep-list naming only an item was undefined; keeping an item keeps its preparation.
7. **blocker, fixed** — "taken" was undefined and the `.k`/`.N` placement was not re-checked; the re-scan now names PLAN, PLAN-ARCHIVE, tasknote/stub, next-`.k`, and `.N` presence.
8. **note, fixed** — a standalone mechanical row now inserts after the source's indented continuation lines.

External review, pass 3 — six findings:
1. **blocker, fixed** — the Step 4 "still the next `.k`" re-check ran before any write and ignored kept splits ahead in the same epic, so a second kept split in one epic always failed. It now counts them, as Step 2 allocates.
2. **note, fixed** — insertion order of several mechanical rows before one `.N` was unfixed; now allocation order.
3. **note, fixed** — an epic `.k` whose ID already had a tasknote or stub was offered and could never be written; Step 2 now stays that split.
4. **note, fixed** — a source row changed during the reply wait, or a replacement failing mid-motion, was undefined. The re-scan checks the source row still reads as shown; a failed replacement stops writing, skips the commit, and reports.
5. **note, fixed** — a keep-list could not keep a preparation without its token; `<source ID> no item` now does.
6. **note, deferred to `.4`** — `docs/GLOSSARY.md:71` still describes seed as marks-only. `.4` owns roster docs; `.2`'s recap already proposes naming GLOSSARY on `.4`'s line.

External review, pass 4 — six findings:
1. **blocker, fixed** — when the re-scan skipped every kept preparation, item 3 still staged and committed (accumulated filings only, under a seed subject). Now: nothing kept survives → nothing written, no commit, `seeded 0 rows` / `prepared 0 source rows`.
2. **note, fixed** — the Step 2 next-`.k` stay check did not count splits drafted ahead; it does now.
3. **note, fixed** — the mechanical-ID re-scan used exact-ID match; it now defers to `SPEC/plan-filing.md` §"ID allocation" (a standalone `N` claimed by epic forms).
4. **note, fixed** — a mid-motion failure could leave an uncommitted starter that blocks the next walk; starters are now written last, and not at all after a failure.
5. **note, accepted** — the gate shows a starter by path, not body. Inherited from prep; a starter is AI-drafted context reviewed at `/ft-task` promotion (Step 3a), and the module asks only that one be filed.
6. **note, fixed** — a row declined by clause 6 alone has no person to remove; it now stays rather than being pinned.

External review, pass 5 (scoped to pass-4 fixes and single-session blockers) — three findings:
1. **blocker, fixed** — the re-scan compared the source row with "as the gate showed it", but the gate shows the rewritten bytes, so every preparation would fail. Now "as Step 1 read it".
2. **note, fixed** — starters-last left a landed remainder pointer naming a missing starter after a mid-motion failure. The starter is now written for exactly the remainders whose pointer landed.
3. **note, fixed** — a nested standalone source's mechanical-row indent was undefined; it now takes the source row's indent.

External review, pass 6 (narrow, the three pass-5 fixes only) — no findings. A light pass (one tool call); the three passages were also re-read by hand.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (line 49 rosters both slugs; `.4`) · `AGENTS.md` no change (line 45 roster; `.4`) · `SPEC.md` no change · `docs/MIGRATION.md` no change (retired-table row is `.4`'s) · `claude/AGENTS-snippet.md` no change here — line 24's seed clause ("seeds `[unattended]` across an existing plan and never writes it unconfirmed") stays true; its prep clause describes the still-shipped prep body (`.4`) · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` no change (`.4`) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change (rosters; `.4`) · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change here — line 63 describes prep as the preparer, named for `.4` by `.2`'s recap · `docs/WORKTREES.md` no change · `docs/VISION.md` no change.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md `.3` line → stub nested under CORE-EPIC-812, tasknote moved to `.flaitron/tasknote/archive/core/`. No superseded-claim pointer.

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — N/A

**Final Summary:**

`/ft-seed-unattended` now runs the merged walk the CORE-812.2 contract describes. Rows the predicate admits become marks. Rows it declines are classified pin / split / stay from `SPEC/unattended-candidacy.md` §"Preparing declined rows", and each pin or split is drafted as the bytes the write will produce. A drafted row the full predicate admits carries a dependent token item. One Step 3 gate lists marks, preparations (each with its item or the withholding clause), and stays. One filing commit stages PLAN.md and every starter under `chore: seed [unattended] — <N> rows`. Prep's drafting rules (remainder, mechanical row, CORE-811 screen, starter) are carried verbatim. The prep body and its Codex wrapper are byte-identical, left for `.4`.

Changed: `claude/skills/ft-seed-unattended/SKILL.md` (12,487 → 22,345 B; cap 33,000), `codex/skills/ft-seed-unattended/SKILL.md` (description), `docs/CONTEXT-BUDGET.md` (§"Skill bodies" seed figure re-measured and re-sorted, one dated sentence). Verification: A1–A7 → 0, `bash tools/drift-checks.sh` → 0, A9 judgment met. Six review passes: 18 blockers and 13 notes fixed; 5 notes accepted; 1 deferred to `.4` (Testing Notes). Most blockers were Step 4 edge cases in the drafting rules carried over from prep: re-checking at write time, numbering several splits in one epic, and failure partway through the writes. The merge adds no new contract rule beyond `.2`'s, except two procedural choices: a row declined by clause 6 alone stays, and a `<source ID> no item` reply form. No refactor. `touches:` reconciliation: declared 3, changed 3, exact match. Maintainability: the walk, gate, write, and commit procedure that lived in two bodies now lives in one, as soon as `.4` deletes the prep copy.

For `.4`: `docs/GLOSSARY.md:67/71/151` and `docs/EXTERNAL-AGENTS.md:63` still describe prep as the preparer and seed as marks-only. `claude/AGENTS-snippet.md:24` and the rosters in `README.md`, `AGENTS.md`, `docs/PLATFORMS.md`, and the four snippets still list both slugs. The "no release before `.4`" proposal from `.2`'s recap still stands: since this commit the two skills overlap on prep's triggers.

**Archived:** 2026-10-18
