---
title: release-dir-headroom
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: [CORE-826, CORE-750, CORE-622.2]
touches:
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-829 | release-dir-headroom

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-826]]

## 🎯 Goal

Restore at least one working unit (≥ ~5,300 bytes, aiming at ~1.5 units) of headroom under the `claude/skills/ft-release/**` 113,000 directory cap by trimming provenance prose that git history and the archive already hold, without changing any check's behavior or raising the cap.

## ✅ Acceptance

- [x] Directory total ≤ 107,700 (113,000 − one 5,300 unit) — `test $(find claude/skills/ft-release -type f -exec cat {} + | wc -c) -le 107700`
- [x] Cap unchanged and the budget check passes — `grep -qE '^\| `claude/skills/ft-release/\*\*` \| 113,000 \|' docs/CONTEXT-BUDGET.md && bash tools/drift-checks.sh context_budget`
- [x] No citation or pair check broken — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`
- [x] Every shell fence in both fragments byte-identical to before (no check behavior changed) — `diff <(git show HEAD:<f> | awk '/^```/{f=!f;print;next} f') <(awk '/^```/{f=!f;print;next} f' <f>)` per fragment
- [x] Only provenance/archaeology prose cut; operative instructions and load-bearing "do not simplify" warnings kept — `judgment`: prose classification, no command decides it

## 🧩 Subtasks

- [x] Collapse retired Pairs F, I, L to one-line letter stubs (keep the letter, the retiring task, what it bound)
- [x] Trim history clauses in Pairs H, J and Pair K's `SPEC.md` scope bullet
- [x] Standing checks: cut "This check replaces…", compress "Why this shape", "Why the refresh commands are wider…", "Why this check exists" to their operative one-liners
- [x] Re-measure; run drift checks + self-test; diff fences

## 🔗 Related

- [[CORE-826]] — predecessor (surfaced the headroom shortfall)
- [[CORE-750]] — set the 113,000 cap at measured + ~1.5 units
- [[CORE-631.2]] — precedent: moved pair shells out of this directory to cut budget

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Premise holds at HEAD — `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → 111,117 (PLAN's 111,077 predates a +40 edit); headroom 1,883, under one 4,000–5,300 unit.

- [x] Read relevant source files — all five files measured; read both §7.1 fragments in full (SKILL.md 36,957, mirror-pairs 33,125, standing-checks 24,059, dogfood-sop 14,319, tag-message 2,657).

- [x] **Best Practices Review** — N/A: prose-only edit to lazy skill fragments; no code or module boundary changes. Constraint carried: no shell fence changes (check behavior frozen).

- [x] **Archive skim** — `archive/core/` confirmed against README table (`CORE-*` → `archive/core/`). 219 notes cite the directory, so read only the cap's lineage: CORE-826 (filed this; "under the cap but short of one working unit"), CORE-750 (lowered 125,000 → 113,000 = measured 106,247 + ~1.5 units; ratchet purpose), CORE-631.2 (precedent: moved pair shells out of this file because the directory budget paid twice). `docs/CONTEXT-BUDGET.md` warns a split that un-budgets what it moves games the number — so trim, don't relocate.

- [x] **Drift check** — PLAN line matches (number drift +40 only). `docs/CONTEXT-BUDGET.md` row: cap 113,000, unit +4,000–5,300, remedy extract-or-trim. Inbound references to retired Pairs F/L cite the letter only (`tools/drift-checks.sh:381`, `docs/CONVENTIONS.md:60`, `docs/VERSION-HISTORY.md:180`, `.flaitron/tasknote/README.md:123`) — letters stay; no `§"Why …"` citation targets the bold-leads being compressed.

- [x] No clarifications needed. Assumptions: (a) trim, not extract — relocating prose to an unbudgeted file would game the cap; (b) cap stays 113,000 (raising defeats CORE-750's ratchet); (c) target ≤ 107,700 (≥ one 5,300 unit), aiming near ~106,000 (~1.5 units); (d) cut is provenance prose only — retired-pair history, "why this exists" narratives — which git log and archived tasknotes already hold; (e) every shell fence byte-identical; load-bearing "do not simplify" warnings (glob-free, anchored grep, `grep -qF --`, `[/]` bracket, `^` anchor) kept; (f) §Ledger numbers left to the next release cut, as CORE-750 did.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** see boxes above. Baseline fence extracts saved to scratchpad for the Acceptance fence diff.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing retired-pair stub shape ("letter kept so later pair citations stay stable") by grouping F/G/I/L into one line; same trim-not-relocate remedy as CORE-724.2's archaeology trims.

- [x] **Minimal refactor gate** — prose-only; no structural change, no fence touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no behavior change; fences byte-identical, existing drift self-test covers the checks.

**Implementation Notes:** `step-7.1-mirror-pairs.md`: retired Pairs F, G, I, L collapsed into one **Retired letters** paragraph (each letter keeps its retiring task + what it bound; L keeps its accepted-cost note); Pair H, J history clauses and Pair K's `SPEC.md`-scope bullet compressed to their operative claims. `step-7.1-standing-checks.md`: dropped the "This check replaces…" paragraph; "Why this shape", "Why the refresh commands are wider…", "Why this check exists" compressed to their do-not-regress instructions, the last pointing at `docs/CONTEXT-BUDGET.md` §"Why byte budgets" (which already holds that narrative). Directory 111,117 → 106,379 on the first pass; after the review round restored five operative clauses, 107,028 (−4,089), headroom 5,972 ≈ 1.13–1.49 units.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` → 0 (20/20)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `final_newline` + `pair_q` cover it.

- [x] **Verification receipt**
  - `test $(find claude/skills/ft-release -type f -exec cat {} + | wc -c) -le 107700` → 0 (107,028, after review fixes)
  - `grep -qE '^\| `claude/skills/ft-release/\*\*` \| 113,000 \|' docs/CONTEXT-BUDGET.md && bash tools/drift-checks.sh context_budget` → 0 (`context_budget ok`)
  - `bash tools/drift-checks.sh` → 0 (all checks ok, `pair_q` included)
  - `node --test tools/drift-checks.test.mjs` → 0
  - fence diff vs HEAD baseline, both fragments → 0 (identical)
  - judgment: cuts are provenance only; kept every load-bearing warning (glob-free, anchored grep, `grep -qF --`, `[/]` bracket, `^` anchor). No dead code / duplication (N/A — prose).

- [x] **External review** — `/code-review medium` over the working-tree diff, 8 findings:
  - **blocker** (Acceptance 5 — operative guidance cut): F roster locations + "a flag change edits all of them"; the "do not reinstate a count check" note; I's "no PLATFORMS.md edit unless the route changes" and L's "a deleted one stops running"; H's three must-stay-pointer sites. → Phase 2: all restored compactly; Phase 3 re-ran from the top (drift → 0, self-test 20/20, fences identical, size 107,028 ≤ 107,700).
  - **note** CORE-465 credited with shipping `/ft-refactor` → fixed (`CORE-463.5; found by CORE-465`).
  - **note** CORE-539 measurement dropped → fixed ("21 of 46 rows").
  - **note** L now sits under the grouped "Retired letters — F, G, I, L" lead, not between K and M → declined: the lead names L, and a separate stub would spend bytes on an empty slot.
  - **note** Pair K bullet lost "would invite re-filing against its sibling" and the one-off-validator detail → declined: the kept text still names the class and states scope-not-coverage; the detail is history in CORE-558.2.

- [x] (frontend) N/A — no rendered surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md: no change (lazy release-fragment prose only; Pair L/F letter citations in CONVENTIONS / tasknote README still resolve to the retired-letters lead). `docs/CONTEXT-BUDGET.md` §Ledger left to the next release cut, as CORE-750 did.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md stub at top of `## Completed`, moved to `archive/core/`

- [x] **Evidence-based recap** drafted

- [x] **Learnings** — N/A

**Final Summary:** Restored about 1.1–1.5 working units of headroom under the `claude/skills/ft-release/**` 113,000 cap without raising it, by trimming provenance prose in the two §7.1 fragments. Changed: `step-7.1-mirror-pairs.md`, `step-7.1-standing-checks.md` (directory 111,117 → 107,028). Verification: drift-checks → 0, self-test 20/20, both fragments' shell fences byte-identical to HEAD. No refactors. Doc verdict: no change. Scope: declared 2 files, changed 2; nothing undeclared. Maintainability: the next pair-sized edit fits; retired pairs now read as one paragraph; the operative guidance flagged in review was kept.

**Archived:** 2026-10-26
