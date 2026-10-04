---
title: narrow-caobunga-batch
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: [CORE-527, CORE-528, CORE-529, CORE-530, CORE-531]
touches:
  - SPEC.md
  - SPEC/blocked.md
  - SPEC/gates.md
  - SPEC/tasknote-selection.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-starter-task/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - templates/PLAN.md
  - docs/AGENT-NEUTRALITY.md
supersedes:
  - CORE-527
  - CORE-531
---

# CORE-533 | narrow-caobunga-batch

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-527]] [[CORE-528]] [[CORE-529]] [[CORE-530]] [[CORE-531]]

## 🎯 Goal

Apply the cold-audit verdicts on the caobunga-filed CORE-527..531 batch: narrow the Phase 4 blocked-by sweep to one sentence, move the dependency-clause grammar to the surfaces that write rows, remove CORE-528's self-contradicting example, repair CORE-530's archived status, and strip adopter task IDs from SPEC prose.

## ⚡ Notes

**Relevance:** Proceed — the PLAN line records the operator's ruling ("proceed with your best judgement") on an audit run cold in this session against `docs/VISION.md` §"What we won't accept", `SPEC.md` §"PR / suggestion archetypes flowtron does not accept", and `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors". Every item traces to a verified finding, not to the filing project's framing.

**Best Practices Review:** Contract-layer markdown only; no module touched. Boundary respected: canonical text stays in `SPEC.md`, labeled pointers at points of use (CONVENTIONS §"Canonical source with labeled mirrors"); the Codex skill directories are thin pointer wrappers (≤500 bytes), so the three Claude filing skills are the only mirror surface for the grammar pointer. Archived tasknotes were touched only in the two ways SPEC sanctions: the append-only superseded-claim pointer (`SPEC.md` §"Tasknote frontmatter") and a lifecycle YAML correction with the [[CORE-483.N]] in-place-fix precedent.

**Drift check:** Verified before editing — `viz/src/parser.ts` `BLOCKED_BY_BLOCK` is a literal case-sensitive `Blocked by` + wikilink match (the near-miss claims in the new `SPEC.md` sentence describe actual behavior); `viz/src/visibilityPrefs.ts:36` has `rowChips.blocked: false` (the chip is opt-in); flowtron's own PLAN history holds exactly one parseable clause (`git log -S'Blocked by [['` → CORE-280 blocked by FE-052, both closed 2026-06-04, cleared by CORE-280's own stub flip); `SPEC.md` §"Post-closure protocol" step 3 emits the copy-paste line only after a deliverable-covering SHA, so CORE-528's example was unsatisfiable by lifecycle order. `git apply -R --check` confirmed CORE-527's five contract hunks reverse cleanly over the later CORE-528/529/530 insertions; the `docs/AGENT-NEUTRALITY.md` hunk was undone by hand because [[CORE-532]] had since edited the same row.

**Archive skim:** [[CORE-527]] [[CORE-528]] [[CORE-529]] [[CORE-530]] [[CORE-531]] read in full (the audit subjects). [[CORE-494]] — the prior caobunga filing that asserted adopter-reader behavior as flowtron's and was corrected in its PLAN line; the same class recurred in CORE-531's "silently dispatches". [[CORE-280]] / FE-052 — the one organic clause. [[CORE-382]] / [[CORE-386]] — flowtron's own satisfied dependency prose, both caught by the dependent's Phase 1 drift check, i.e. the existing mechanism. [[CORE-393]] — Phase 4 mirror set, used to confirm the reverse-apply reached every mirror. [[CORE-483.N]] — precedent for correcting an archived note's lifecycle fields in place.

**Pattern survey:** Reverse-applied the original commit's contract hunks rather than hand-deleting, so the withdrawal is byte-exact against what CORE-527 added. The surviving sentence rides the existing Re-scope paragraph in `SPEC/blocked.md` (no new heading). The grammar fix extends the existing "wikilink-only" sentence in the canonical section and extends the existing `(SPEC §"Task-line format")` pointer the three filing skills already carry; the template comment extends the existing grammar block. The `Nest` row keeps a one-clause reminder in the shape the table already uses.

**Implementation:**

- **CORE-527 → NARROW.** Reverse-applied `b9a30d8`'s hunks to `SPEC.md`, `SPEC/blocked.md`, `SPEC/gates.md`, `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/SKILL.md`; hand-reverted the `--fast` ledger row (7→6 `SPEC.md` sites, §"🚀 Phase 4: Closure" removed) in `docs/AGENT-NEUTRALITY.md`. Added one sentence to `SPEC/blocked.md`'s Re-scope paragraph: a blocker's own closure may strike a clause naming it, on operator confirmation, in the same commit; the dependent's resume path stays the fallback.
- **CORE-531 → NARROW.** Removed the 11-line **Grammar discipline** paragraph from `SPEC/tasknote-selection.md`; the `Nest` row now carries the grammar in a clause. The near-miss list (`Blocked on`, `Depends on`, bare ID, free prose) moved into `SPEC.md` §"Long-description conventions" with a flowtron-true consequence ("nothing that reads the field sees the dependency") replacing "silently dispatches". Discoverability fix at the write points: `templates/PLAN.md` grammar comment names the convention; `ft-file-followup`, `ft-starter-task`, `ft-epic-discovery` grammar pointers also name §"Long-description conventions".
- **CORE-528 → NARROW.** Rewrote the paragraph: examples are now a proposed commit message, a filing the operator is to run, a manual step; the copy-paste line is named as excluded, with the reason.
- **CORE-530 → SOUND + defect.** Archived note YAML `status: in-progress` → `completed`. Wording: a model-suggestion glyph is no longer listed as a bracket token.
- **CORE-529 → SOUND + nit.** `(caobunga CBN-120.2 F4 / adppro DATA-13.3)` removed from `SPEC.md`.
- Superseded-claim pointers appended under the nav header of CORE-527, CORE-528, CORE-529, CORE-531.

**Docs touched:** `SPEC.md` — updated (deliverable). `docs/AGENT-NEUTRALITY.md` — updated (ledger row restored to 6 `SPEC.md` sites). `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change; none enumerates the conditional Phase 4 writes or the long-description grammar (counter-assertion grep across `SPEC.md`, `SPEC/`, `claude/`, `codex/`, `cursor/`, `grok/`, `docs/`, `templates/` finds no surviving reference to the sweep).

## ✅ Recap

Narrowed the caobunga-filed CORE-527..531 batch to what flowtron's own contract supports. The Phase 4 blocked-by sweep (≈85 lines across six files) is withdrawn to one sentence in `SPEC/blocked.md`: it generalized a pattern with no second-project need in this repo, and its harm claim rested on a viz chip that is off by default. The `Blocked by [[ID]]` grammar, which `SPEC.md` already defined, now surfaces where rows actually get written (seed template comment + three filing skills) instead of on a mid-task reconcile row, and the near-miss list lives in the canonical section with a flowtron-true consequence. CORE-528 no longer claims the post-closure copy-paste line can be written before archive. CORE-530's archived note has its lifecycle status flipped. Adopter task IDs are out of SPEC prose.

16 files, +41/−98. Verification: `npm --prefix viz test` 524/524 (28 files); `tsc --noEmit` and `eslint src` clean; `node --test tools/update-adopters.test.mjs` 49/49; `.editorconfig` hygiene clean on every changed file; counter-assertion grep clean. Refactors: none. Documentation verdict: the change is documentation; one ledger row corrected. Maintainability effect: every adopter's Phase 4 loses a grep plus a `--fast`-defeating 📦 force-fire that flowtron's history shows firing once in ~700 tasks; the dependency grammar becomes discoverable at filing time on the surfaces that file.

**Archived:** 2026-09-06
