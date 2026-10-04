---
title: release-skill example genericize
status: completed
tags: []
created: 2026-05-11
due:
related-tasks: [CORE-060, CORE-080]
---

# CORE-081 | release-skill example genericize

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-060]] [[CORE-080]]

## 🎯 Goal

Replace hardcoded `v1.3.0` example strings in the `/release` skill docs with `vX.Y.Z` placeholders so they stop bit-rotting at every release.

## ✅ Acceptance

- [x] `claude/commands/release.md` + `claude/skills/release/SKILL.md` contain no version-string literals tied to specific shipped releases (no `v1.3.0`, `v1.2.0`, `v2.0.0` as filing/example values)
- [x] No TASK-ID literals tied to specific past tasks in example positions (no `CORE-058`, `FE-013`, `CORE-051`, `CORE-048` in example code blocks / inline examples)
- [x] Placeholder convention matches existing usage: `vX.Y.Z` for versions, `<TASK-ID>` / `<FEAT-A>` / `<PREV-RELEASE>` for IDs
- [x] Verification grep `grep -nE 'v[0-9]+\.[0-9]+\.[0-9]+|CORE-058|FE-013|CORE-051' claude/commands/release.md claude/skills/release/SKILL.md` returns clean
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"
- [x] PLAN.md line flipped to stub form + tasknote archived

## 🧩 Subtasks

- [x] Edit `claude/commands/release.md:7` — `**CORE-058**` → `**<TASK-ID>**`, `v1.3.0` → `vX.Y.Z`
- [x] Edit `claude/skills/release/SKILL.md:15` — full filing-example placeholderization (TASK-ID + version + feat refs)
- [x] Edit `SKILL.md:32` — collapse two-version glob example to single `release vX.Y.Z` placeholder
- [x] Edit `SKILL.md:34` — `**CORE-058**` → `**<TASK-ID>**`, `v1.3.0` → `vX.Y.Z` (inside quoted error message)
- [x] Edit `SKILL.md:86` — `release v1.3.0` → `release vX.Y.Z`
- [x] Edit `SKILL.md:89` — `[FE-013, CORE-051]` → `[<FEAT-A>, <FEAT-B>]`, `[FE-013, CORE-051, CORE-048]` → `[<FEAT-A>, <FEAT-B>, <PREV-RELEASE>]`
- [x] Edit `SKILL.md:131` — `v1.x.y → v2.0.0 style` → `vN.x.y → v(N+1).0.0 style` (matches existing placeholder convention on the same line)
- [x] Run verification grep; confirm clean
- [x] Phase 3: markdown-eyeball pass on the 2 edited files (no code-block fences broken, no frontmatter touched)

## 🔗 Related

- [[CORE-060]] — predecessor release (v1.3.0) whose version got pinned into the example strings
- [[CORE-080]] — most recent release (v2.0.0) that surfaced the carry-forward rot

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed (with scope expansion — wide bit-rot sweep confirmed by user).
  **Rationale:** Task as filed is real and unblocked; PLAN-cited line numbers verified intact; doc-drift sweep found additional rot beyond PLAN.md's literal scope (stale TASK-IDs co-located on the same lines, plus `SKILL.md:131` major-bump example that didn't shift on CORE-080). User chose full sweep + angle-bracket placeholder style.

- [x] Read relevant source files
- [x] **Archive skim** — Reviewed `_project/tasknote/archive/core/CORE-060.md` (v1.3.0 release) and `CORE-080.md` (v2.0.0 release) listings; both ran the release recipe end-to-end without genericizing the skill's own example strings, which is exactly why CORE-081 was filed as carry-forward. No prior tasknote touched the release skill's example strings specifically. CORE-046.md flagged generic "release-skill doc currency" but not example genericization. No structural conflicts.
- [x] **Drift check** — All 5 PLAN.md-cited line numbers verified against current files (release.md:7 — `**CORE-058** [opus] | release v1.3.0`; SKILL.md:15, 32, 34, 86 — all match). Additional drift surfaced: SKILL.md:89 (`[FE-013, CORE-051, CORE-048]`) and SKILL.md:131 (`v1.x.y → v2.0.0` style — already stale post-CORE-080). Both folded into Subtasks.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Two AskUserQuestion calls answered: (1) scope = full bit-rot sweep, (2) placeholder style = angle-bracket (`<TASK-ID>`, `<FEAT-A>`, `<PREV-RELEASE>`). Both align with existing convention in release/SKILL.md (e.g., `<TASK-ID>` on lines 84, 192, 195; `vX.Y.Z`/`vA.B.C` placeholder pairs throughout).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Bit-rot pattern:** the `/release` skill itself runs a per-release doc-currency sweep on SPEC.md / SPEC/versioning.md / docs/MIGRATION.md, but does NOT sweep its own example strings. CORE-060 and CORE-080 both shipped without catching this. Genericizing the skill's own examples breaks the rot cycle at the source.
- **Scope boundary — what stays concrete:** SPEC/versioning.md uses concrete version examples by design — these get shifted forward each release by the `/release` skill (SKILL.md:131 documents this as the intentional design). Out of scope for CORE-081.
- **Placeholder convention already established:** the file already uses `vX.Y.Z` (current) and `vA.B.C` (new) pairs, plus `<TASK-ID>` placeholders in 3 places. This task extends that convention consistently to the example strings.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release/SKILL.md already uses `vX.Y.Z` (current) / `vA.B.C` (new) placeholder pairs and `<TASK-ID>` in 3 places (lines 84, 192, 195). Extending the same convention to the filing examples is the existing shape — no new pattern introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A, markdown-prose only

**Implementation Notes:**

7 edits total across 2 files (release.md + release/SKILL.md). All targeted single-token substitutions:
- 4 `v1.3.0` → `vX.Y.Z` (lines 7, 15, 32+collapse, 34, 86 — the line-32 collapse drops one of two example versions since `release v*` is glob-style and one placeholder suffices)
- 2 `**CORE-058**` → `**<TASK-ID>**` (release.md:7, SKILL.md:34) — `SKILL.md:15` filing example also got the same treatment
- 1 `FE-013 + CORE-051 since v1.2.0` → `<FEAT-A> + <FEAT-B> since v<prev>` (SKILL.md:15)
- 2 TASK-ID list examples on SKILL.md:89: `[FE-013, CORE-051]` → `[<FEAT-A>, <FEAT-B>]`; `[FE-013, CORE-051, CORE-048]` → `[<FEAT-A>, <FEAT-B>, <PREV-RELEASE>]`
- 1 `v1.x.y → v2.0.0` → `vN.x.y → v(N+1).0.0` (SKILL.md:131 — already-stale-post-CORE-080 major-bump example surfaced during drift check)

Historical precedent refs (`CORE-048 / CORE-046 / CORE-043` on SKILL.md:7, the `CORE-047` and `CORE-046 precedent` mentions on lines 120/132) intentionally left in place — write-once historical context per existing convention (mirrors the `v1.0 additions stay` precedent on line 132).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown-prose
- [x] Ran lint/type-check on changed code — N/A, markdown-prose
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A, not a frontend change

**Testing Notes:**

Verification grep `grep -nE 'v[0-9]+\.[0-9]+\.[0-9]+|CORE-058|FE-013|CORE-051' claude/commands/release.md claude/skills/release/SKILL.md` returns clean (exit 1, zero matches). Markdown-eyeball pass on edited regions confirms: code fences intact, frontmatter untouched, surrounding prose unchanged, placeholder substitutions consistent with existing convention.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-11.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Doc-drift sweep results:**

- `README.md` — no change (public-facing repo overview doesn't reference release-skill example strings)
- `SPEC.md` — no change (workflow contract untouched; task-line grammar examples are PLAN.md-side, not release-skill-side)
- `docs/MIGRATION.md` — no change (release skill is flowtron-self only; adopters don't run `/release`)
- `claude/CLAUDE-snippet.md` — no change (doesn't reference release-skill internals)

**Final Summary:**

Replaced 7 hardcoded version/TASK-ID literals across `claude/commands/release.md` (1) and `claude/skills/release/SKILL.md` (6) with the file's existing placeholder convention (`vX.Y.Z`, `<TASK-ID>`, `<FEAT-A>`, `<PREV-RELEASE>`). Breaks the per-release bit-rot cycle that surfaced at CORE-060 (v1.3.0) and CORE-080 (v2.0.0). Scope widened beyond PLAN.md's literal `v1.3.0`-only call-out to include co-located stale TASK-IDs (`CORE-058`, `FE-013`, `CORE-051`, `CORE-048`) and SKILL.md:131's `v1.x.y → v2.0.0` major-bump example (stale post-CORE-080) — both surfaced during drift check, both confirmed in-scope by the user. Verification grep clean across both files.

**Archived:** 2026-05-11
