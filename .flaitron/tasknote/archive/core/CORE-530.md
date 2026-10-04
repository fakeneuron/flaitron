---
title: preserve-bracket-tokens
status: completed
tags: []
created: 2026-09-06
due:
related-tasks: []
---

# CORE-530 | preserve-bracket-tokens

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

State, in SPEC.md's Task-line format section, that any task-line rewrite (Re-scope, model retag, Phase 4 stub flip) must copy the full trailing bracket-token run verbatim rather than reconstructing the line — since dropping a token like `[unattended]` silently disarms it with no diagnostic.

## ⚡ Notes

**Relevance:** Proceed — the PLAN.md long description accurately describes a real gap: §"Task-line format" documents the trailing bracket-token run's *parsing* footguns but never states a rewrite obligation, and the three sites that rewrite a task line (Re-scope, model retag, stub flip) don't cross-reference each other or the grammar.
**Best Practices Review:** Docs-only change to `SPEC.md` (canonical grammar owner) + two lazy modules that already reference it (`SPEC/model.md`, `SPEC/tasknote-selection.md`). Kept the rule in one place (§"Task-line format", beside the existing `[unattended]` mis-authoring footguns it extends) and pointed the three rewrite sites at it rather than duplicating the rule three times. No refactor needed.
**Drift check:** Confirmed current section anchors before citing them — §"Task-line format" mis-authoring footguns (SPEC.md:235-250), Re-scope line (SPEC.md:791, now 801-ish after edit), model retag bullet (SPEC/model.md:31-33), stub-form paragraph (SPEC/tasknote-selection.md:211-225). All matched the PLAN.md description; no drift.
**Archive skim:** No archived tasknote greps `bracket-token` directly except CORE-528 (`.flowtron/tasknote/archive/CORE/CORE-528.md:51-53`), which names CORE-530 itself as related-but-non-overlapping precedent (F5 bracket-token loss vs. its own F2 durability concern) — confirms this task's scope is already carved out distinctly and there's no prior decision to reconcile against.
**Pattern survey:** Followed the existing footgun-documentation shape in §"Task-line format" (bolded lead sentence + prose paragraph, no new subsection heading) and the existing cross-reference style (`` `SPEC.md` §"..." ``, `` [`SPEC/x.md`](SPEC/x.md) §"..." ``) used throughout both files.
**Implementation:** Added one canonical paragraph to `SPEC.md` §"Task-line format" (after the `[unattended]` mis-authoring footguns) stating the rewrite-preservation rule. Added a one-clause cross-reference at each of the three rewrite sites: the Re-scope line (`SPEC.md`, Phase 1 Discovery), the model-retag bullet (`SPEC/model.md`), and the stub-form paragraph (`SPEC/tasknote-selection.md`) — the last also notes the stub-form *example* omits `[unattended]` only because its illustrative row never carried one, not because the convention drops it.
**Docs touched:** `SPEC.md`, `SPEC/model.md`, `SPEC/tasknote-selection.md` — all three edited directly as the fix itself; no other AI-referenced doc describes this rewrite path.

## ✅ Recap

Added a canonical "rewrites must preserve the trailing bracket-token run verbatim" rule to `SPEC.md` §"Task-line format", plus one-clause pointers at the three sites that rewrite a task line: Re-scope (`SPEC.md` Phase 1), model retag (`SPEC/model.md`), and the Phase 4 stub flip (`SPEC/tasknote-selection.md`). Closes the gap the PLAN.md line described (caobunga CBN-120.2 F5): a rewrite that preserves visible text but drops a bracket token like `[unattended]` previously had no documented guard against it. Docs-only; no code changed, no tests affected.

**Archived:** 2026-09-06
