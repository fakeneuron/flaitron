---
title: skill-b2-pointers
status: completed
tags: []
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-857.6, CORE-856, CORE-724.4]
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
  - docs/CONTEXT-BUDGET.md
blocked-by: [CORE-857.6]
---

# CORE-857.4 | skill-b2-pointers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]] [[CORE-857.6]] [[CORE-856]] [[CORE-724.4]]

## 🎯 Goal

Cut the five B2 sites in `claude/skills/ft-task/SKILL.md`, plus the Phase 3 receipt / 👁️ restatement beside them, to a pointer at the owning module plus the skill-only delta. The body should land at ≤23,500 B behind its own budget row, with no rule lost that the module doesn't carry.

## ✅ Acceptance

- [x] Body at ≤23,500 B — `test $(wc -c < claude/skills/ft-task/SKILL.md) -le 23500`
- [x] Skill-only deltas survive the cuts: the pre-move gate (cited by `claude/CAPABILITIES.md:36`), the code-review own-diff scope (cited by `unattended-mode.md:120`), the `**Archived:**` stamp, the `/ft-task <next-ID>` binding, the only-this-task flip, and no-banner — a `grep -qF` per literal over the body prints no `MISSING`
- [x] Every `§"…"` citation resolves and every other drift check holds — `bash tools/drift-checks.sh`
- [x] Per-file budget row `claude/skills/ft-task/SKILL.md` added at new size + headroom (27,000: one upper-bound skill edit), with a history row and the precedence sentence updated — `grep -qF` on the row + `bash tools/drift-checks.sh context_budget`
- [x] Drift-check self-test still green — `node --test tools/drift-checks.test.mjs`
- [x] No cut took a rule its cited module does not carry — `judgment`: CORE-724.4's failure mode; decided by the per-site carrier map in Discovery Notes and the External review

## 🧩 Subtasks

- [x] L35 `--unattended` posture → pointer to `unattended-mode.md` sections + the two non-inherited delegations
- [x] L127 Phase 3 → pointer to SPEC §"🧪 Phase 3: Testing & Linting"; keep the scope-guardrails entry, the own-diff review scope, `/ft-file-task --park`, and the `--fast` 👁️ and debug deltas
- [x] L128 Phase 4 → pointer to SPEC §"🚀 Phase 4: Closure"; keep the scope-guardrails re-run, the `**Archived:**` stamp, the only-this-task flip, the paper-complete guard, the pre-move gate, and no-banner
- [x] L139-141 Step 6 skill-specific → pointer to `post-closure.md` steps 2–3 + the `/ft-task <next-ID>` binding
- [x] L145 epic Notes → pointer to `<SPEC_DIR>/epic.md`
- [x] Measure; add the `docs/CONTEXT-BUDGET.md` per-file row + history + precedence line
- [x] Phase 3: drift checks, self-test, external review on the diff

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic (context-redundancy)
- [[CORE-857.6]] — predecessor: SPEC.md C extraction; it moved no heading, so the pointers target current SPEC headings
- [[CORE-856]] — the survey that measured the five B2 sites (`docs/HARNESS-SURVEY.md` §"2026-11-01")
- [[CORE-724.4]] — the prior point-not-narrate pass on this skill + procedure; 9 review blockers, "most were cuts that took a unique rule with them"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.6` closed without moving a heading, so the sequencing precondition holds; the five sites still sit at the filed line numbers (L35 / L127 / L128 / L139-141 / L145).

- [x] Read relevant source files — the five SKILL.md sites; their carriers: `unattended-mode.md` (§"What the posture adds", §"Conversion map", §"Pre-scaffold stops", §"The park recipe", §"What `--unattended` never relaxes"), `step-0-flags.md`, SPEC §"🧪 Phase 3: Testing & Linting", SPEC §"🚀 Phase 4: Closure", SPEC §"Paper-complete guard", `SPEC/post-closure.md` steps 2–3, `SPEC/epic.md`, `SPEC/gate-postures.md` §"What `--unattended` never relaxes", `step-4-debug-mode.md`; guards `tools/drift-checks.sh` (`pair_q`, `pair_s`, `context_budget`), `docs/CONTEXT-BUDGET.md`

- [x] **Best Practices Review** — `N/A`: prose pointer edits; no code boundary

- [x] **Archive skim** — scoped to the epic cohort + [[CORE-724.4]] (the same move on this file). Findings below

- [x] **Drift check** — line numbers, byte figure (27,101 now vs 27,158 at survey; `.5` touched L146), and the PLAN row match. `pair_s` reads only `AGENTS.md` ↔ `claude/AGENTS-snippet.md`, so no SKILL.md literal is bound by it; `pair_q` binds every `§"…"` citation the edit keeps or adds.

- [x] Asked clarifying questions — resolved via AskUserQuestion (table below)

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

**Carrier map (what each cut may drop, and the delta it must keep).**

| Site | Carried by | Skill-only delta kept |
|---|---|---|
| L35 posture | `unattended-mode.md` — fast-mode superset + two non-inherited delegations (§"What the posture adds"), per-step park codes incl. the starter/blocked/sidequest model STOP (§"Conversion map"), pre-flight terminate (§"Pre-scaffold stops"), never-relaxed list, lone-park commit (§"The park recipe") | the "steps below do not restate the posture" rule; the non-inherited delegations, named because Step 4 / Step 5 say "(not under `--unattended` — Step 0)" and point here |
| L127 receipt / 👁️ | SPEC §Phase 3 "The receipt" (tail, not transcript; structural assertions), full-suite rule, emphasized inline ask shape | scope-guardrails entry under `--unattended`; `--fast` 👁️ suppression; debug re-verify even under `--fast` |
| L127 External review | SPEC §Phase 3 "The external review" (two rungs, blocker → Phase 2 + re-run, note never reopens, never patches, `N/A`, neither flag, `--loop` once); "Who reviews" names `/code-review medium` over the own diff; `gate-postures.md` + `unattended-mode.md:120` carry the `input-needed` park | `/code-review medium` own-diff scope + "never an upstream-relative default range" (the known mis-scope; `unattended-mode.md:120` defers to "its SKILL.md Phase 3"); `/ft-file-task --park` as the filing route |
| L128 Phase 4 op list | SPEC §Phase 4 (sweep, tick-through, status flip first, stub + placement, move, superseded pointer, recap + `touches:` reconciliation as recorded fact, recap-only); §"Paper-complete guard" (collateral-flip ban, same-turn commit) | `**Archived:**` stamp (SPEC never names it — only the template); scope-guardrails re-run after the sweep; the executable pre-move gate (cited by `claude/CAPABILITIES.md:36`, mirrored by `ft-close-epic`); no banner |
| L139-141 Step 6 | `post-closure.md` step 2 (rotation line, fresh re-read, candidate verification, terminal form + copy-paste skip, glyph labels, 🔍) and step 3 (glyph copy, own-line no punctuation, 👇) | `<args>` = next ID → `` `/ft-task <next-ID>` `` |
| L145 epic Notes | `SPEC/epic.md` (Discovery `.1`, Audit `.N`, parent flip) | none beyond the pointer |

**Archive precedents.** [[CORE-724.4]] cut this same file 29,387 → 23,437, and its pass-1 blockers were all cuts that took a unique rule with them: "flip nothing unless the commit lands this turn", the `<SKILL>` "flags included", and write-once anti-misread pointers. The carrier map above is the guard. [[CORE-857.2]] did the procedure-side twin and lowered its budget row; [[CORE-857.6]] confirms no SPEC heading moved.

**Resolved scoping** (AskUserQuestion, 2026-11-01):

| question | answer |
|---|---|
| Budget | add a per-file `claude/skills/ft-task/SKILL.md` row at new size + ~1.5 working units, plus a history row (locks the cut in, like `.2`) |
| Reaching ≤23,500 | the five sites alone save ~2.9 KB → also trim L127's receipt / 👁️ restatement (same bullet, same B2 pattern) |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-724.4 / CORE-857.2 point-not-narrate shape ("per SPEC §X, authoritative for …; Skill-specific: <delta>"), already used at L128 and Step 6

- [x] **Minimal refactor gate** — no refactor; only the five filed sites + the operator-approved L127 receipt / 👁️ restatement and the `--fast` 👁️ tail (both carried by SPEC / `gate-postures.md`)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose edits; the drift checks + self-test are the guard

**Implementation Notes:**

- **L35** → one paragraph pointing at `unattended-mode.md` §"Conversion map" / §"Pre-scaffold stops" / §"What the posture adds" / §"What `--unattended` never relaxes"; it keeps the "do not restate the posture" rule and the two non-inherited delegations, because Steps 4–5 refer back to them with "(not under `--unattended` — Step 0)". It drops the gate enumeration, the in-flight clause, the paper-complete / downstream-impact clause, and the park-recipe sentence; every one of them is carried by the fragment (checked by grep).
- **L127** → pointer to SPEC §"🧪 Phase 3" naming what it is authoritative for; it keeps the `--unattended` scope-guardrails entry, the `/code-review medium` own-diff scope and its "never an upstream-relative default range" hardening, `/ft-file-task --park`, and the `--fast` / debug deltas. The `--fast` 👁️ tail became a pointer to `gate-postures.md` §"`--fast` operator override" ("Each delegation is bounded"), which Step 0 loads whenever fast-mode is set. The `--unattended` blocker park was dropped; `unattended-mode.md:120` and `gate-postures.md:321-326` carry it.
- **L128** → the op list is now "per SPEC §Phase 4, authoritative for all of them, under §Paper-complete guard"; it keeps the only-this-task flip, the same-turn commit rule, the scope-guardrails re-run, the `**Archived:**` stamp (which only the template names, never SPEC), the pre-move gate verbatim, and the no-banner line.
- **L139-141** → one line: run `post-closure.md` steps 2–3 as written + the `/ft-task <next-ID>` binding (step 2's terminal form already skips step 3).
- **L145** → one line pointing at `<SPEC_DIR>/epic.md`.
- Size 27,101 → 23,489 (−3,612) at first pass; 23,494 after the review pass-1 restorations and offsets (Testing Notes). `docs/CONTEXT-BUDGET.md`: new per-file row (26,000 at first, 27,000 after review note 4), a history row, and the precedence sentence now names `ft-task` beside `ft-release`.
- Downstream-impact scan: not triggered (no direction-changing decision; pointers only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs`

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (the repo's markdown lint)

- [x] **Verification receipt** — receipt below; no duplication, dead text, or stale docs introduced (the §"Skill bodies" / cold-start ledger figures are release-time refreshes, `/ft-release` §7.1)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test $(wc -c < claude/skills/ft-task/SKILL.md) -le 23500        → 0   (23,489)
grep -qF per skill-only delta (8 literals)                       → 0   (no MISSING)
bash tools/drift-checks.sh                                       → 0   (19/19 ok, pair_q + context_budget included)
grep -qF '| `claude/skills/ft-task/SKILL.md` | 26,000 |' docs/CONTEXT-BUDGET.md → 0
node --test tools/drift-checks.test.mjs                          → 0   (21 pass, 0 fail)
```

**External review — pass 1** (`/code-review medium`, working tree). 3 blockers, 5 notes:

1. **Blocker.** `step-0-flags.md:32` says "The body's Step 0 posture paragraph names the gates it converts". The cut removed that list, which `pair_q` cannot see because it is a prose cross-reference. → Restored the five-gate list in L35, compacted.
2. **Blocker.** L35's "every gate … parks" overgeneralized: the concrete-model STOP on an existing starter / blocked note / sidequest stub terminates and writes nothing. → Carve-out restored.
3. **Blocker.** Phase 3's scope-guardrails entry lost the qualifier that the 👁️ settle comes only after the External review. → Restored as "(its 👁️ settle waits for the External review)".
4. Note. A 26,000 cap left 2,511 headroom, under one upper-bound edit (+3,390). → Fixed: 27,000, cell reworded to "~1.5 working units".
5. Note. Phase 4's `§"Scope guardrails"` lost its file qualifier in the reorder (SPEC/gate-postures.md has a same-named section). → Fixed: qualified as `<SKILL_DIR>/unattended-mode.md`.
6. Note. The reorder put the only-this-task / paper-complete rules before the `Skill-specific` marker, which blurs SPEC-owned vs delta. → Fixed: the original ordering is back under "Skill-specific on top of it".
7. Note. The glob row's "Not lowered when `ft-task` dropped below it…" clause went stale once ft-task got its own row. → Fixed: it now says "`ft-task` has its own row below ([[CORE-857.4]])".
8. Note. The always-loaded table and cold-start sum still read 27,158. → No change: those ledgers are dated measurements that `/ft-release` §7.1 refreshes at the next cut (the doc's own rule), and the per-file history row carries the new figure now.

The restorations cost ~330 B. To stay under the target I offset it inside the same sites with three cuts, each carried elsewhere. The L127 debug clause became a pointer to `step-4-debug-mode.md` §"Phase 3 — repro re-verify", which carries every clause. The pre-move gate's provenance sentence was compressed to one clause, since nothing cites it. The Phase 3 "Flows directly into Phase 4; no gate" line was dropped, because Step 5's intro (L118-119) says the same. Final size 23,494.

**Receipt — re-run after pass-1 fixes:**

```text
test $(wc -c < claude/skills/ft-task/SKILL.md) -le 23500        → 0   (23,494)
grep -qF per skill-only delta (12 literals, restored ones added) → 0   (no MISSING)
bash tools/drift-checks.sh                                       → 0
grep -qF '| `claude/skills/ft-task/SKILL.md` | 27,000 |' docs/CONTEXT-BUDGET.md → 0
node --test tools/drift-checks.test.mjs                          → 0   (21 pass, 0 fail)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry "no change": pointer trims inside one skill body + its budget row, no behavior or interface change; `claude/CAPABILITIES.md:36`'s pre-move-gate citation still resolves

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer; for `.N`: prose cross-references (`step-0-flags.md:32`, `unattended-mode.md:120`) are invisible to `pair_q` and were where pass 1's blockers came from

**Final Summary:**

The always-loaded `/ft-task` body no longer re-narrates the modules it loads. Each of the five B2 sites, plus the Phase 3 receipt / 👁️ / debug restatement, now points at its owner and keeps only the skill-only delta. The body has its own budget row, so the cut cannot grow back under the 33,000 glob.

- **Changed files:** `claude/skills/ft-task/SKILL.md` (27,101 → 23,487, −3,614; 5 lines rewritten, 2 deleted). `docs/CONTEXT-BUDGET.md`: new `claude/skills/ft-task/SKILL.md` row at 27,000, a history row, the precedence sentence, and the glob row's stale ft-task clause.
- **Verification:** size ≤23,500 → 0; 15 skill-only literals present; `bash tools/drift-checks.sh` → 0 (19/19); `node --test tools/drift-checks.test.mjs` → 0 (21/21).
- **Review:** two `/code-review medium` passes. Pass 1 found 3 blockers, all prose cross-references or over-general summaries left by a cut, plus 5 notes; all fixed, one ledger note left to the release refresh by rule. Pass 2 found 0 blockers and 6 notes, all fixed.
- **Refactors:** none beyond the cuts. **Docs:** no AI-referenced doc change.
- **Scope reconciliation:** declared 2 files, changed 2. No undeclared paths.
- **Maintainability:** ~3.6 KB less per Claude `/ft-task` cold start. Rules now have one owner each, and the two prose cross-references the review surfaced are made true in both directions.

**Testing Notes addendum — External review pass 2** (`/code-review medium`, working tree): 0 blockers, 6 notes, all fixed:
1. L35 said the 👁️ ask always parks, but a confirmed deciding spec settles it. → Added "(unless a confirmed deciding spec settles it)".
2. "like every Step 1 pre-flight stop" was broader than §"Pre-scaffold stops". → Narrowed to "the Step 1 pre-flight checks".
3. The `input-needed` review-blocker park was only in `unattended-mode.md:120`, which itself defers to "its SKILL.md Phase 3", so the two pointed at each other. → Restated as one clause in L127.
4. The budget cell's "~1.5 working units" didn't match 27,000 − 23,494. → Reworded to "one upper-bound substantial skill edit (+3,390)".
5. The own-diff clause restated SPEC "Who reviews". → Compressed to "over this task's own diff only", keeping the upstream-range hardening.
6. In Phase 3, `Skill-specific:` came after the skill-only guardrail entry. → The marker now comes first.

Offsets for the ~70 B the notes added: the Step 6 binding line was compressed, "👁️ shape", and the review-scope why-clause shortened to a parenthetical.

**Archived:** 2026-11-01
