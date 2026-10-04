---
title: readme-skill-roster-drift
status: completed
tags: [docs]
created: 2026-05-30
due:
related-tasks: [CORE-226]
---

# CORE-228 | readme-skill-roster-drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Reconcile README §"Bootstrapping a new project" to the canonical seven-tasknote-family-incl-`/ft-debug` + two-worktree-utilities framing used in MIGRATION §1.2 and PLATFORMS §"Today's surface", so it stops omitting `/ft-debug` and stops putting the worktree pair in the seventh tasknote slot.

## ⚡ Notes

**Relevance:** Proceed — README:44-46 lists six tasknote skills + the worktree pair as "the seven tasknote skills", silently dropping `/ft-debug`. `/ft-new-project` (SKILL.md:97-100) and MIGRATION §1.2 both wire nine: seven tasknote family incl `/ft-debug` + two worktree utilities. Live drift; doc-only.
**Drift check:** Confirmed against source. README:44-46 (the drift). Canonical phrasing at MIGRATION.md:61 and PLATFORMS.md:31: "Seven tasknote skills (`/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`, `/ft-debug`) plus two thin worktree utilities (`/ft-worktree-start`, `/ft-worktree-end`)". `/ft-new-project` SKILL.md:97-100 symlinks all nine. No further drift in scope.
**Archive skim:** `grep -l README.md archive/core/*.md` — CORE-226 (doc-drift-skill-roster) was the closest prior touch (skill count + module list); it standardized roster counts elsewhere but did not touch README §"Bootstrapping". No conflicting prior decision.
**Pattern survey:** Adopt the exact MIGRATION §1.2 / PLATFORMS §"Today's surface" phrasing ("Seven tasknote skills (…) plus two thin worktree utilities (…)") rather than inventing a new framing — keeps the three docs byte-consistent.
**Implementation:** Edited README.md:44-46. Replaced the six-skills-plus-worktree-pair-as-seventh list with the canonical seven tasknote family incl `/ft-debug` + two worktree utilities phrasing. Single doc edit, no code touched.
**Docs touched:** README.md — the deliverable. No other AI-referenced doc needs a change; MIGRATION and PLATFORMS were already canonical (they're the reconciliation target, not drifted).

## ✅ Recap

Reconciled README §"Bootstrapping a new project" (lines 44-46) to the canonical roster framing: now lists the seven tasknote family **including `/ft-debug`** plus the two worktree utilities (`/ft-worktree-start`, `/ft-worktree-end`), matching MIGRATION §1.2 and PLATFORMS §"Today's surface" and the nine commands `/ft-new-project` actually wires. Doc-only change; no code. Closes audit-docs Finding #1+#3 (2026-05-30).

**Archived:** 2026-05-30
