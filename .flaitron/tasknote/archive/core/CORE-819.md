---
title: plan-only-subjects
status: completed
tags: []
created: 2026-10-22
due:
related-tasks: [CORE-818]
touches:
  - SPEC/post-closure.md
  - claude/skills/ft-open-epic/SKILL.md
---

# CORE-819 | plan-only-subjects

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-818]]

## 🎯 Goal

State in the closure contract that a closure whose diff touches only `.flaitron/` workflow files (PLAN.md, tasknotes) takes a `chore:` subject — a `.1` scope closure whose deliverable is the child list included.

## ✅ Acceptance

- [x] `SPEC/post-closure.md` step 1's proposed-commit-message bullet carries the workflow-only → `chore:` rule, naming the `.1` scope case — `grep -qF 'only `.flaitron/` files' SPEC/post-closure.md`
- [x] `/ft-open-epic` Step 10's proposed `.1` subject no longer hard-codes `feat:` — `! grep -q 'feat: <AREA>-<next-N>.1' claude/skills/ft-open-epic/SKILL.md`
- [x] Both files stay within their context budgets and pass the drift checks — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Add the rule to `SPEC/post-closure.md` step 1 (10,000 cap; 263 bytes headroom)
- [x] Retarget `/ft-open-epic` Step 10's subject to `chore:` with a `feat:` fallback when the diff leaves `.flaitron/` (33,000 cap; 116 bytes headroom)
- [x] Run drift checks

## 🔗 Related

- [[CORE-818]] — filed this follow-up (its downstream scan named it Unaffected)

---

## ⚡ Notes

**Relevance:** Proceed — `/ft-open-epic` still proposes `feat: <ID>.1 — scope … children` (c5542ba0, c40ef300, 3777620b), and `/ft-release` classifies every `feat:` as a minor bump, so a PLAN-only scope commit inflates the bump kind.
**Best Practices Review:** Single-source the rule in `SPEC/post-closure.md` step 1 (the closure contract every closing runner loads); the one contradicting skill-specific override (`ft-open-epic/SKILL.md:254`) is retargeted rather than given its own restated rule. `ft-close-epic` already proposes `chore:` when no code edits land and `step-5-loop-mode.md` lists `chore:` — both consistent, left alone.
**Archive skim:** Precedent for `chore:` on Discovery `.1` closures exists (ce004916 CORE-769.1, 10cc4c8a CORE-223.1, 3f9baa23 CORE-215.1); no archived decision mandating `feat:` for `.1`. No codex/cursor/grok/procedures mirror of the `.1` subject line (grep clean).
**Drift check:** Plan matches the PLAN.md line ("subject rule in the closure contract"); the ft-open-epic retarget is the minimum needed so the new rule is not contradicted by a skill override. Budgets tight: post-closure.md 9,737/10,000, ft-open-epic 32,884/33,000.
**Clarifications:** No clarifications needed (--fast) — assumptions: "only PLAN.md and a tasknote" generalizes to "only `.flaitron/` workflow files" (PLAN-ARCHIVE, sidequest stubs are the same class); a `.1` that lands a non-`.flaitron/` deliverable keeps `feat:`.
**Pattern survey:** Extended the existing proposed-commit-message bullet in place (same spot that already lists `fix:` / `docs:` / `chore:`); ft-open-epic's override edited at its one line, mirroring ft-close-epic's existing `chore:`-when-no-code fallback.
**Implementation:** `SPEC/post-closure.md` step 1 gains one sentence: a diff of only `.flaitron/` files (PLAN.md, tasknotes) takes `chore:`, a `.1` closing on its child list included — no feature ships. Rationale kept adopter-neutral (an earlier draft cited `/ft-release`'s minor bump, which is flaitron-self only). `ft-open-epic/SKILL.md` Step 10's two `.1` subjects flip `feat:` → `chore:`, with `feat:` named as the fallback when the diff leaves `.flaitron/`. No refactors.
**Verification receipt:** `grep -qF 'only `.flaitron/` files' SPEC/post-closure.md` → 0 · `! grep -q 'feat: <AREA>-<next-N>.1' claude/skills/ft-open-epic/SKILL.md` → 0 · `bash tools/drift-checks.sh` → 0 (budgets: post-closure.md 9,872/10,000; ft-open-epic SKILL.md 32,927/33,000). No frontend surface → no 👁️. Changed prose free of duplication and stale pointers.
**External review:** N/A — two one-line prose edits (+135 / +43 bytes); nothing for a reviewer to grade beyond the three grep/drift receipts above.
**Docs touched:** AI-referenced docs swept — all no change (`docs/CONVENTIONS.md` lists commit types generally; the subject rule is contract, not convention). Learnings: N/A.

**Final Summary:** The closure contract now says a workflow-only diff (PLAN.md + tasknote, including a `.1` scope closure) commits as `chore:`, and `/ft-open-epic` proposes `chore:` for its `.1` instead of `feat:`. `touches:` reconciliation: `git diff --name-only` = SPEC/post-closure.md, claude/skills/ft-open-epic/SKILL.md — matches declared.

**Archived:** 2026-10-22
