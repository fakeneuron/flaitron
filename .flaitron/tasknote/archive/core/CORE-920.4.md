---
title: headroom-release-skill
status: completed
tags: [context-budget, skill]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-920, CORE-920.2, CORE-920.3, CORE-869.5, CORE-920.N]
touches:
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/step-5-dogfood-sop.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-920.4 | headroom-release-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-920]] [[CORE-920.2]] [[CORE-920.3]] [[CORE-869.5]] [[CORE-920.N]]

## 🎯 Goal

Bring `claude/skills/ft-release/SKILL.md` and the `claude/skills/ft-release/**` directory total below their 95% NEAR CAP lines with pointer-not-narrate cuts, taking every genuine restatement, rationale tail and archaeology cut in the body and its §5 / §7.1 fragments so the directory keeps about one mirror-pair unit of headroom, and record both in `docs/CONTEXT-BUDGET.md` §"Cap history".

## ✅ Acceptance

- [x] `context_budget` prints no `NEAR CAP` line for either row, and the directory lands ≤ 103,350 (one lower-bound unit under the old 95% line). Landed 31,264 and 95,996. The "caps unchanged" clause was superseded by the operator's Phase 3 choice to ratchet both caps: SKILL.md 40,000 → 33,000 with NEAR CAP at 97%, directory 113,000 → 104,000. Both still print no NEAR CAP (94.7% of a 97% line; 92.3%) — `bash tools/drift-checks.sh context_budget` + `find claude/skills/ft-release -type f -exec cat {} + | wc -c`
- [x] Both Cap-history rows carry a [[CORE-920.4]] entry. They read as re-sizes rather than `held`, per the same ratchet choice, and the two "Why" cells cite it as well — `grep -c 'CORE-920.4' docs/CONTEXT-BUDGET.md` = 4 (2 Cap history + 2 Budgets)
- [x] No command fence changed in any trimmed file (shells, the `(global-only)` allowlist, the rotation command). The only fence diff is SKILL.md's removed example PLAN-line fence (3 lines), whose shape Step 1.1 item 3 still states — per file, `diff <(git show HEAD:<f> | awk '/^ *```/{f=!f;print;next} f') <(awk '/^ *```/{f=!f;print;next} f' <f>)`
- [x] Every inbound citation still resolves (no heading renamed) and the full drift scan and its self-test pass — `bash tools/drift-checks.sh` + `node --test tools/drift-checks.test.mjs`
- [x] No unique rule lost — every cut is a restatement (pointer kept), rationale tail, or archaeology — `judgment`: the External review found one loss (the retired-letter citations), now restored

## 🧩 Subtasks

- [x] Trim `SKILL.md`: intro recipe restatement and example PLAN fence; Step 1.1 restatements of Step 2 and rationale tails; Step 2.5's CORE-507 paragraph and re-entry tail; Step 5 fragment-pointer rationale; §6.1 incident archaeology and scope rationale; §6.2 CONVENTIONS restatement; §7.1 subroutine-rule duplicates and fragment-contents list; §7.4 advisory rationale tails and the duplicate untracked-file parenthetical; §7.5 push-pause archaeology; Notes bullets duplicating Step 0 / 1.1 / 2.5
- [x] Trim `step-7.1-mirror-pairs.md`: per-pair incident IDs and stories (A, B, C, J, K, M, N, O, P, Q, R), retired-letter archaeology, Pair K design-note bullets compressed
- [x] Trim `step-7.1-standing-checks.md`: repeated "Independently of the subroutine findings" leads, incident archaeology (CORE-329.2, 463.5, 352.2, 721, 730, 410.4, 411, 615, 539), the "Why this check exists" rationale
- [x] Trim `step-5-dogfood-sop.md`: CORE-224/588/614/613/586/501/406 incident narration, the race-history paragraph → backstop list, the duplicate `$(echo …)` rationale, the anchor/tier-2 archaeology
- [x] Add two Cap-history entries in `docs/CONTEXT-BUDGET.md` (re-sizes, per the Phase 3 ratchet choice)
- [x] Run `context_budget`, the fence diff, the full drift scan and its self-test

## 🔗 Related

- [[CORE-EPIC-920]] — parent epic (near-cap-trims-2; Theme: Budget trims don't hold).
- [[CORE-920.2]] / [[CORE-920.3]] — sibling hold-the-cap trims; the shape this follows.
- [[CORE-869.5]] — prior trim of the §7.1 fragments (directory 109,984 → 106,845).
- [[CORE-920.N]] — the epic audit.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `context_budget` at HEAD `73dfc108` prints `NEAR CAP` for both: SKILL.md 38,425 of 40,000 (96%), directory 108,536 of 113,000 (96%). The row said 95% for both; [[CORE-919.3]] added 407 to the body after filing.

- [x] Read relevant source files — all five files under `claude/skills/ft-release/` in full; `SPEC/epic.md`; `docs/CONTEXT-BUDGET.md` rows, precedence and Cap history; `tools/drift-checks.sh` references to the fragments.

- [x] **Best Practices Review** — `N/A`: markdown contract trims; no code or module boundary moves.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). `ft-release/SKILL.md` hits 156 notes, too broad to read, so I read the trim precedents directly: [[CORE-920.3]] / [[CORE-920.2]] (hold the cap, `held` entries, headings and guarded literals untouched, §"Ledger" left to `/ft-release`), [[CORE-869.5]] (trimmed the two §7.1 fragments only to 94.6%, which then regrew past 95%; its Learnings note that incident archaeology in the §7.1 catalogue is the cheapest headroom, and that each pair's "why this pair runs per push" sentence carries the rationale).

- [x] **Drift check** — sizes match (row's 95% is now 96%). Growth since [[CORE-869.5]]: directory 106,784 → 108,536 in 18 days; body 37,336 → 38,425. Guards on the text: `tools/drift-checks.sh` reads the `(global-only)` rows of the standing-checks exclusion fence (over-install allowlist); `SPEC/post-closure.md`'s rotation command must stay byte-identical to the standing-checks copy; `pair_q` resolves every path-bearing `§` citation kept. No heading is renamed, so inbound `/ft-release §<n>` citations (31 to §7.1) are safe. `step-7.2-tag-message.md` (2,671) has no cuttable restatement — left alone.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion on scope: the operator chose body + fragments, so the directory keeps about one mirror-pair unit. Assumptions carried from [[CORE-920.3]]: every genuine cut, caps held with `held` entries, §"Ledger" stays `/ft-release`'s job, no heading renamed, no fenced block edited.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** targets — SKILL.md < 38,000 (−426 minimum), directory ≤ 103,350 (−5,186). Each pair's "which is why this pair runs per push" sentence stays as its rationale ([[CORE-869.5]] Learnings); incident IDs and stories go, since the cited tasknotes hold them. Rules stated only in prose stay (Pair H's one-file-per-`node --check`, Pair I's PLATFORMS-route clause, Pair L's accepted cost, the K1 `grep -qF --` notes, the glob-free rationale, the receipt evidence standard).

Phase 1→2: Discovery surfaced no significant deviation (the scope question was answered in Discovery) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-920.3]] / [[CORE-869.5]]'s hold-the-cap trim: restatement → pointer, incident archaeology → dropped (the cited tasknotes hold it), a `held` Cap-history entry per row, every heading and command fence untouched

- [x] **Minimal refactor gate** — one structural change: §7.4's four advisory-verdict bullets, each ending in a "Like the verdict above, this does not block commit-go" rationale, folded into one bullet with four sub-bullets. Each verdict's example lines are kept verbatim.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose contract trims; the drift checks and their self-test are the guard

**Implementation Notes:**

- `SKILL.md` 38,425 → 31,264 (−7,161, 78.2%). Cuts:
  - the intro's recipe list, which the description and steps already state, and the example PLAN-line fence (Step 1.1 item 3 gives the same shape);
  - Step 1.1's restatement of Step 2's classification rule, the CORE-EPIC-815 model archaeology, and its rationale tails;
  - Step 2.5's CORE-507 paragraph, now one sentence: judge the whole cut, since the fragments arrive later. Also the re-entry tail and the deferral restatement;
  - Step 5's why-a-fragment rationale;
  - §6.1's v5.25.0 incident narrative (CORE-546 citation kept), the fails-open aside, and the wait-loop rationale;
  - §6.2's restatement of CONVENTIONS' audit-cadence reasoning, now a pointer;
  - §7.1's duplicate Subroutine-safe sentence, the 5-pass list, the Critical/High restatement (Mid-cut defects applies next), the drifting fragment-contents list, and the "twelve pairs" count;
  - §7.4: the duplicate untracked-file parenthetical and the four advisory rationale tails (see the refactor note);
  - §7.5's push-pause archaeology;
  - the Notes bullets for flaitron-self-only (Step 0 and the intro say it) and the escape hatch (Step 2.5 says it), and the Why-no-args restatement of Step 1.1.
- `step-7.1-mirror-pairs.md` 31,024 → 27,739 (−3,285). Dropped incident IDs and stories from A, B, C, J, K, M, N, O, P, Q, R and the retired letters G and I. Compressed Pair K's labels-not-prose, asymmetry, and the two not-in-K2 bullets. Kept every "which is why this pair runs per push" sentence, Pair H's one-file-per-`node --check` rule, Pair I's PLATFORMS-route rule, Pair L's accepted cost, and the K1 `grep -qF --` notes.
- `step-7.1-standing-checks.md` 22,097 → 21,340 (−757). Dropped four repeated "Independently of the subroutine findings" leads (the fragment header says it), the incident IDs (329.2, 465, 463.5, 352.2, 721, 730, 410.4, 411, 615, 539), and the "Why this check exists" rationale paragraph.
- `step-5-dogfood-sop.md` 14,319 → 12,899 (−1,420). Dropped the incident IDs (224, 588, 614, 613, 586, 501, 406, 361/356, 390/395, 387, 409). The three-incident race history is now a three-item **Backstops** list. The "run the block as written" paragraph is now a pointer to the in-fence comment. Kept the receipt evidence standard and the ledger rule, now stated as "never substitute a self-judged call for the ledger".
- `step-7.2-tag-message.md` untouched.
- Directory 108,536 → 95,913 (84.9%).
- `docs/CONTEXT-BUDGET.md`: two `held` entries; caps and "Why" cells unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `context_budget`, full drift scan, drift-check self-test

- [x] Ran lint/type-check on changed code — `git diff --check` clean; no code changed

- [x] **Verification receipt** — receipt below; no code changed, so the structural assertions are `N/A`

- [x] **External review** — `/code-review medium`; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Final tree (after the review fixes and the cap ratchet):

```text
bash tools/drift-checks.sh context_budget        → 0   (no NEAR CAP; SKILL.md 31,264 / 33,000 (94.7%, line 97%); directory 95,996 / 104,000 (92.3%))
grep -c 'CORE-920.4' docs/CONTEXT-BUDGET.md      → 4
fence diff over the five ft-release files        → only SKILL.md's removed example PLAN-line fence (3 lines)
bash tools/drift-checks.sh                       → 0   (full scan)
node --test tools/drift-checks.test.mjs          → 0   (50 pass, 0 fail)
git diff --check                                 → 0
```

External review (`/code-review medium`): no blocker, five notes. The reviewer graded a wider range than this task's diff — it took in the earlier CORE-931.2 / 919.3 commits — so notes 3–5 fall outside this diff.
- **Fixed**, mirror-pairs retired letters: the paragraph still promises "history is in the cited tasknotes", but the trim had dropped G/I/L's citations. Restored [[CORE-571]], [[CORE-734.6]], [[CORE-734.4]].
- **Fixed (operator choice)**, `ft-release/**` "held 113,000" left ~3.5 units of slack against the row's own measured + ~1.5 units rule. The operator chose to ratchet both caps. Directory → 104,000 (95,996 + 1.5 × 5,300, rounded). SKILL.md → 33,000 (31,264 + 1.5 × its upper unit of ~1,000, measured over its last 25 touching commits), with NEAR CAP at 97% as the snippet row does ([[CORE-891]]), so ~990 chars are left when it fires. Budgets "Why" cells and Cap-history rows updated.
- **Partly fixed**, `reconciled_pin` source rule: the mirror-pairs runner's "read the pair's entry below" now also points at SKILL.md Step 5 for `reconciled_pin` (in a file this task touches). The header and CONVENTIONS "nine checks have neither…" claim is out of scope, so it is filed as [[CORE-940]] (park, `0304acc8`).
- **Filed**, ft-update Step 3.5 "same-length" fence-close prose vs `fenceOpeners`: [[CORE-939]] (park, `35cc8f09`).
- **No change**, the Node ≥20 guard order: already tracked as [[CORE-935]].

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry: no change (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). Their `/ft-release` claims cite section and step numbers this task kept. `docs/AGENT-COMPAT.md` §"Reading the cells" still tells the full CORE-406 / 501 / 588 race history that the §5 fragment now compresses. `docs/VERSION-HISTORY.md:144` names the old 40,000 cap, but it is a write-once historical entry. `docs/CONTEXT-BUDGET.md` §"Ledger" snapshots are `/ft-release`'s to refresh.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the same trim [[CORE-920.2]] / [[CORE-920.3]] ran. One note for [[CORE-920.N]]: this child ratcheted its caps where its siblings held theirs, so the audit can judge whether .2 / .3's rows also hold more than ~1.5 units of slack.

**Final Summary:**

The release skill and its directory now sit well under their NEAR CAP lines, and both caps were ratcheted to the trimmed size, so the freed room can't silently regrow.
- `claude/skills/ft-release/SKILL.md` 38,425 → 31,264. Cap 40,000 → 33,000, NEAR CAP at 97%: about 750 chars before the line fires.
- `claude/skills/ft-release/**` 108,536 → 95,996. Cap 113,000 → 104,000: about 2,800 chars before the 95% line, and 8,000 (one mirror pair plus) under the cap.

Every cut was a restatement with its pointer kept, a rationale tail, or incident archaeology the cited tasknotes hold. Every heading and every command fence was kept.

Recap:
- **Changed:** `SKILL.md` (−7,161), `step-7.1-mirror-pairs.md` (−3,202), `step-7.1-standing-checks.md` (−757), `step-5-dogfood-sop.md` (−1,420), and `docs/CONTEXT-BUDGET.md` (two Budgets rows re-sized, two Cap-history entries).
- **Verification:** see Testing Notes; every command exits 0.
- **Refactors:** §7.4's four advisory verdicts folded into one bullet.
- **Docs:** no drift.
- **Scope:** declared 5 files, changed 5. Nothing undeclared.
- **Follow-ups:** [[CORE-939]] and [[CORE-940]] parked from the review.
- **Maintainability:** the release body loads ~7k chars lighter on every cut. Its fragments lost ~5.4k of incident narrative that duplicated the archive.

**Archived:** 2026-11-24
