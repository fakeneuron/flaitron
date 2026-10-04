---
title: audit-shortname-flip
status: completed
tags: []
created: 2026-08-08
due:
related-tasks: [CORE-416.N, CORE-393]
---

# CORE-418 | audit-shortname-flip

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Stop `/ft-epic-discovery` from filing epic child rows with bare `| discovery` / `| audit` placeholders, so `.1` and `.N` rows carry the epic shortname and render as titled rows in `## Completed`.

## ⚡ Notes

**Relevance:** Proceed (premise corrected, scope widened — operator-confirmed) — the goal on the PLAN line is sound, but two of its claims are false at HEAD. It says "nothing tells the closer to replace the placeholder": `/ft-close-epic/SKILL.md:154` has specified `| <shortname> audit` since `adb47d1` (2026-05-17), predating all six bare `.N` rows. And it scopes the defect to six `.N` rows: the same placeholder pattern on line 83 gives `.1` rows a worse ratio (22 bare / 4 expanded), so the real figure is ~28 rows from one root cause. Scope stays micro-sized — the fix is two lines in one file plus a clause in a second — so this is a premise correction inside the same deliverable, not a re-scope to different work. Operator confirmed "stay micro, corrected + widened" over promoting to `/ft-task`.

**Best Practices Review:** The touched responsibility is filing-time task-line generation, owned by `/ft-epic-discovery` Step 4 alone — `grep -rn '| audit'` across `SPEC.md`, `SPEC/`, `claude/skills/`, `templates/`, and `docs/` returns exactly one non-`<shortname>` hit (`ft-epic-discovery/SKILL.md:84`), so the fix is single-point with no duplication to keep in sync. The `/ft-close-epic` clause is a safety net for already-filed epics, not a second source of truth: it points at the same target shape Step 7 already specifies rather than restating the convention. No dependency direction crossed; no refactor required.

**Drift check:** Drift found, and it is this task's central finding — see Relevance. `git log -S` dates `| <shortname> audit — Completed` in `ft-close-epic/SKILL.md` to `adb47d1` (2026-05-17); the earliest bare `.N` row is `TEST-001.N` / `CORE-349.N` (2026-07-08). The instruction existed for two months before the first miss, so "missing instruction" is not the mechanism. Nothing here contradicts a SPEC contract: `SPEC/tasknote-selection.md:145` already makes `| shortname` required "so visualizers have a row title", and this change makes the filing surface comply rather than amending the rule.

**Archive skim:** `grep -l` across `.flowtron/tasknote/archive/core/` for the two skill paths. Load-bearing: `CORE-393` edited this exact `/ft-close-epic` Step 7 closure block and recorded the governing pattern — each skill "enumerates closure ops explicitly rather than deferring" — which is why the safety-net clause belongs inline in Step 7 rather than as a pointer. `CORE-399` also touched `/ft-epic-discovery`, nothing bearing on the task-line shape. `CORE-416.N` is this task's source (Finding 1).

**Pattern survey:** Extended the established shape rather than introducing one. Line 82 of the same fenced block already writes the parent as `| <shortname>`, so `| <shortname> discovery` / `| <shortname> audit` on lines 83-84 make the three lines internally consistent — the placeholder was the odd one out. The `/ft-close-epic` clause follows Step 7's existing bullet cadence (`**Bold lead** — instruction, then rationale`).

**Implementation:** Two files, +2/-2 and +1/-1.

1. **`claude/skills/ft-epic-discovery/SKILL.md:83-84`** — the filing template now emits `| <shortname> discovery` and `| <shortname> audit` instead of the bare `| discovery` / `| audit`. This is the root fix: the epic's shortname is already known at filing time (line 82 writes it on the parent in the same motion), so there is no reason to file a placeholder that a closer must later remember to substitute. Removes the failure mode instead of adding a reminder about it.

2. **`claude/skills/ft-close-epic/SKILL.md:154`** — added a replace-don't-preserve clause to the existing flip bullet. Needed because fix 1 only reaches epics filed *after* it lands; every in-flight epic still carries a bare placeholder, and its closer still faces the original ambiguity — reading `| <shortname> audit` against a line that already says `| audit` and resolving the substitution to a no-op. Six of twelve closers did exactly that.

Deliberately not done: the 28 existing bare rows stay as they are. They live in `## Completed` and, for closed epics, alongside archived tasknotes — `SPEC.md:272` write-once territory, and `CORE-416.2` already established that body/line backfills against a rule that post-dates them are contra-contract.

**Docs touched:** All 14 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs" — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — **no change**, all 14. The change is to two `claude/skills/*/SKILL.md` files, which `.flowtron/tasknote/README.md` explicitly places outside the cold-start sweep ("loaded on demand by skill stubs — authoritative when fired, but not part of the default cold-start sweep"). `SPEC/tasknote-selection.md:145`'s `| shortname` requirement is unchanged — this makes a filing surface comply with it, not amend it. `docs/AGENT-NEUTRALITY.md` needs no row: both edited files are already-ledgered Claude-specific surfaces.

## ✅ Recap

Fixed the root cause of untitled epic-child rows: `/ft-epic-discovery` Step 4 now files `.1` and `.N` with the epic shortname (`| <shortname> discovery` / `| <shortname> audit`) instead of bare `| discovery` / `| audit` placeholders.

**The filed premise was wrong, and the real defect was larger.** `CORE-416.N` reported that nothing tells the closer to substitute the placeholder. In fact `/ft-close-epic:154` has specified `| <shortname> audit` since 2026-05-17 — two months before the earliest bare row — so the instruction was never missing; it was ambiguous against a line that already read `| audit`, and six of twelve closers resolved it to a no-op. The same placeholder shape on the `.1` line fares worse (**22 bare / 4 expanded**), making the true figure ~28 rows across both child lines from a single root cause, not the six `.N` rows filed.

**Fixed at the source rather than the symptom.** The shortname is known at filing time — line 82 writes it on the parent in the same fenced block — so emitting it on lines 83-84 removes the substitution step entirely. A one-clause replace-don't-preserve note was added to `/ft-close-epic` Step 7 as a safety net for epics already filed with the placeholder, since fix 1 cannot reach those.

**Verification.** `grep -rn '| audit'` across `SPEC.md`, `SPEC/`, `claude/skills/`, `templates/`, `docs/` returns no bare-placeholder hits after the edit (single-point fix confirmed); the same sweep for `| discovery` is clean. No test or lint surface — both files are markdown skill definitions. The 28 existing rows are deliberately untouched under `SPEC.md:272` write-once, consistent with `CORE-416.2`'s ruling against retroactive backfills.

**Maintainability effect.** A defect that recurred on every epic filing for three months, and depended on each closer noticing a substitution the template invited them to skip, is now impossible to introduce: there is no placeholder left to preserve. Net +3/-3 across two files.

**Archived:** 2026-08-08
