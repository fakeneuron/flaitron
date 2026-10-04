---
title: lowercase-path-rationale
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-410.4]
---

# CORE-414 | lowercase-path-rationale

[← PLAN.md](../PLAN.md) · ⚪ Completed

## 🎯 Goal

Add a sentence to `/ft-release` §7.1's casing paragraph clarifying that the lowercase `~/code/flowtron` literals in `README.md:32-33`, `docs/MIGRATION.md:202-203`, and `codex/AGENTS-snippet.md:57` are deliberate generic clone-destination examples, not casing drift, so a future doc-drift sweep doesn't "fix" them.

## ⚡ Notes

**Relevance:** Proceed — PLAN line still accurate; the rationale it references (CORE-410.4's archived tasknote) still exists only there, undiscoverable from `/ft-release` itself.
**Best Practices Review:** Single-file doc edit, no module boundaries. Placed the new sentence directly after the existing "Machine-global wiring — advisory" casing paragraph in `claude/skills/ft-release/SKILL.md` §7.1 (the paragraph the PLAN line names) rather than a new subsection — keeps the caveat next to the check it qualifies.
**Drift check:** Cited paths/lines confirmed current — `README.md:32-33` (git clone + two `ln -s` lines), `docs/MIGRATION.md:202-203` (`ln -s ~/code/flowtron/claude/...` block), `codex/AGENTS-snippet.md:57` (`ln -s ~/code/flowtron/codex/skills/*`) all still lowercase as described. No contradiction with SPEC.
**Archive skim:** [[CORE-410.4]] (read in full) is the source of the rationale — its Testing Notes "Recurrence vector, noted not fixed" and Phase 4 doc-drift sweep both independently concluded these lowercase paths are intentional generic-clone-destination examples, deliberately left unnormalized. CORE-410.2 built the §7.1 casing check itself but only covers `~/.claude/` symlink targets, not doc prose — no conflict.
**Pattern survey:** Followed the existing paragraph's own prose style (bold lead-in optional, inline code spans for paths, `[[wikilink]]` back-reference per SPEC's archive-linking convention) rather than introducing a new callout format.
**Implementation:** Appended one sentence-paragraph to `claude/skills/ft-release/SKILL.md` §7.1 (after the "Machine-global wiring — advisory" paragraph, ~line 342-343) stating the check is scoped to `~/.claude/` symlink targets, not doc prose, and naming the three doc/line locations to leave alone with a pointer to the archived CORE-410.4 rationale.
**Docs touched:** `claude/skills/ft-release/SKILL.md` — the target of this task, updated. All other AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, etc.) — no change; this task adds clarifying prose to an existing skill file, doesn't touch the paths it references.

## ✅ Recap

Added one sentence-paragraph to `claude/skills/ft-release/SKILL.md` §7.1's "Machine-global wiring — advisory" casing paragraph, clarifying that the check is scoped to `~/.claude/` symlink targets and that `README.md:32-33`, `docs/MIGRATION.md:202-203`, and `codex/AGENTS-snippet.md:57`'s lowercase `~/code/flowtron` are deliberate generic clone-destination examples, not casing drift — with a `[[CORE-410.4]]` pointer to the full rationale. Single-file, single-paragraph doc edit; no code, no refactor. Surfaces the archived rationale at the point a future operator would otherwise misread the check's scope and "fix" the examples.

**Archived:** 2026-08-08
