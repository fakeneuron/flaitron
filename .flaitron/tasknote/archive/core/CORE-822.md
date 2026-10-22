---
title: visual-receipts-vs-park
status: completed
tags: [gates, unattended, visual, docs]
created: 2026-10-22
due:
related-tasks: [CORE-495, CORE-503]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/GATE-DISCIPLINE.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-822 | visual-receipts-vs-park

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-495]] [[CORE-503]]

## 🎯 Goal

Record the third refused form of the `--unattended` 👁️ → park carve-out — agent-reviewed screenshot receipts from an adopter's tiered evidence rule — in `docs/GATE-DISCIPLINE.md`, so the next raise finds the answer rather than re-litigating it.

## ✅ Acceptance

- [x] One Rationalizations row names the receipts form and both defects — `grep -c 'found: pass' docs/GATE-DISCIPLINE.md` ≥ 1
- [x] One Red Flag names its observable symptom — `grep -q 'your own screenshot receipts' docs/GATE-DISCIPLINE.md`
- [x] §"Refused carve-outs" carries the third form with both grounds, what the rule still buys, and provenance — `grep -q 'refused at CORE-822' docs/GATE-DISCIPLINE.md`
- [x] Nothing else changed: no SPEC text, flag semantics, park code, or count — `git status --short` lists only `docs/GATE-DISCIPLINE.md`, PLAN.md, and this note
- [x] Markdown clean — `git diff --check` → 0

## 🧩 Subtasks

- [x] Add the Rationalizations row after the baseline row, the Red Flag after the baseline flag, and the carve-out paragraph after the CORE-503 provenance
- [x] Verify, review, close

## 🔗 Related

- [[CORE-495]] — made the `visual-confirm` park; Q1 declined the gating-vs-corroborating split (first form).
- [[CORE-503]] — refused the byte-identical-baseline form (second) and chose to record it in GATE-DISCIPLINE; this note follows that shape.

---

## ⚡ Notes

**Relevance:** Proceed — the argument has now been raised a third time, from an adopter's visual-evidence rule (natabula NAT-445.3, `docs/VISUAL-EVIDENCE.md`: tiers whose Person column reads "No" for changes with passing screenshot receipts). CORE-503 set the precedent that a good argument refused gets recorded where the next raise will look; the gate itself is unchanged.
**Best Practices Review:** N/A for code boundaries — one teaching doc. Boundary kept: `docs/GATE-DISCIPLINE.md` is never-loaded and owns no rule (`.flaitron/tasknote/README.md`); the rule stays in `SPEC/gate-postures.md` §"Park conversions", which already points here and is not edited.
**Archive skim:** `archive/core/` (README-mapped). CORE-495 — `touches:` is the authority for which surfaces a 👁️-contract change reaches; this task changes no contract, so none of them. CORE-503 — two-file scope precedent (GATE-DISCIPLINE + gate-postures pointer); the pointer already exists, so this is one file. CORE-724.7 dropped the every-gate-change-brings-a-row rule, so the row here is chosen, not owed.
**Drift check:** the Rationalizations table, Red Flags list, and §"Refused carve-outs" exist at HEAD as cited; the "raised twice and refused twice" opener was the one line the third form falsifies and is rewritten. PLAN row matches this goal. ID: CORE-820/821 were filed at `ceb53579` by a parallel session before this row was written, so this is CORE-822.
**Clarifications:** No clarifications needed. Assumptions: the adopter rule is described generically (a "tiered visual-evidence rule"), not by its file path, since flaitron does not reference adopter docs; the provenance names this task ID and date; no version bump here (`/ft-release` owns versioning).
**Pattern survey:** extended CORE-503's shape exactly — a Rationalizations row in the voice of the person raising it, a Red Flag phrased as a visible symptom beside the baseline flag, and a carve-out paragraph pair (premise, split) plus provenance beneath the existing one.
**Implementation:** `docs/GATE-DISCIPLINE.md` +37/−3 (+1 line for the ID fix): opener now says three forms; new row after the baseline row; new Red Flag after the baseline flag; new carve-out block after the CORE-503 provenance, which also states what such a rule *does* buy (receipts beneath the park; the operator's review under `--fast` / `[unattended]`). No refactor.
**Verification receipt:**
```text
grep -c 'found: pass' docs/GATE-DISCIPLINE.md              → 0 (1)
grep -q 'your own screenshot receipts' docs/GATE-DISCIPLINE.md → 0
grep -q 'refused at CORE-822' docs/GATE-DISCIPLINE.md       → 0
git status --short                                          → PLAN.md, docs/GATE-DISCIPLINE.md, this note
git diff --check                                            → 0
```
No duplication: the new paragraph pair argues a different second premise (self-graded) from the baseline pair (unverifiable); no dead text; no stale doc — the opener's count was the one stale line and is rewritten.
**External review:** read-only review probe (not the author) graded the diff against Acceptance — 0 blockers, 4 notes, all fixed: (1) "park on doubt only restates the bias" was imprecise — the conversion parks on every ask, doubt or none; reworded as weaker-than. (2) "self-evaluation is the one Phase 3 input SPEC refuses to trust" inverted SPEC's framing (everything above the external review is self-reported); reworded. (3) The row's last sentence read as an instruction in a doc that owns no rules; made descriptive. (4) Rubric verify command named a file `git diff --name-only` cannot list; switched to `git status --short`.
**Docs touched:** every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry — no change (README, AGENTS, SPEC, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS, WORKTREES, VISION); `docs/GATE-DISCIPLINE.md` is the deliverable and is excluded from the sweep by the README's own note. Learnings: N/A — the always-loaded layer carries no 👁️ rule to update; `SPEC/gate-postures.md` already points at the section that grew.

**Final Summary:** The `--unattended` 👁️ → park rule is unchanged for the third time. `docs/GATE-DISCIPLINE.md` now refuses the receipts form — an adopter's tiered rule under which an agent's own screenshot checks would settle a change — in the words someone raising it would use (one Rationalizations row, one Red Flag, one carve-out block with provenance), and states what such a rule still buys: receipts beneath the park that make the resume one look, and the evidence a present operator reviews under `--fast` or an `[unattended]` marker. Changed: `docs/GATE-DISCIPLINE.md` (+40/−4), PLAN row, this note. Verification: five Acceptance commands → 0; review 0 blockers, 4 notes fixed. `touches:` declared one path; the diff shows that path plus the two workflow records. No SPEC, flag, code, or version change; `/ft-release` owns the cut.

**Archived:** 2026-10-22
