---
title: version-history highlights
status: completed
tags: []
created: 2026-08-09
due:
related-tasks: []
---

# CORE-428 | version-history highlights

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 —

## 🎯 Goal

Ship a curated, moderately-coarse release-history docs surface (main highlights + secondary wins) derived from annotated tags — no CHANGELOG.md; FE out of scope for this cut.

## ✅ Acceptance

- [x] `docs/VERSION-HISTORY.md` exists with curated entries for all current tags (minors/majors: headline + 2–4 main bullets + optional secondary; patches: one-line subject)
- [x] README §Version and "All documentation" inventory link the new surface; CONVENTIONS.md CHANGELOG decline notes it as the scannable highlight reel (not Keep a Changelog)
- [x] `/ft-release` recipe prepends a new entry on each cut (Acceptance/Subtasks + §7.2/7.4 staging) so the doc stays current without a separate CHANGELOG
- [x] FE / viz out of scope — no visualizer changes

## 🧩 Subtasks

- [x] Write `docs/VERSION-HISTORY.md` (intro + curated reverse-chron history from annotated tags)
- [x] Wire pointers: README §Version + docs inventory; CONVENTIONS.md CHANGELOG decline; README repo-layout docs bullet if needed
- [x] Extend `claude/skills/ft-release/SKILL.md` (Acceptance, Subtasks, §7.2 draft entry, §7.4 stage path)
- [x] Sanity-check: every tag has a row; no CHANGELOG.md introduced; Codex wrapper still thin-pointer

## 🔗 Related

—

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN line is clear and current; still the only open Low task. Annotated tags already carry full release notes; a curated docs surface fills the human-scannable gap without reviving declined CHANGELOG.md. FE out of scope matches product cut.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**PLAN line (Low):** `CORE-428 [medium] | version-history highlights — Curated moderately-coarse release history (main highlights + secondary wins) as a docs surface from annotated tags; no CHANGELOG.md; FE out of scope for this cut.`

**Operator locks (AskUserQuestion):**
1. Coverage — all minors+majors with full entries; patches thin (one-line subject) or foldable.
2. Surface — `docs/VERSION-HISTORY.md` + `/ft-release` prepend on each cut.
3. Density — headline + 2–4 main bullets + optional secondary; distilled from tag bodies, not a dump.

**Source inventory:**
- 43 tags (`v0.1.0` … `v5.16.0`): 36 `*.0` minors/majors, 7 patches.
- Tag body shape (canonical from `/ft-release` §7.2): subject + summary + Changes-since groups + Migration block.
- Declined CHANGELOG: `docs/CONVENTIONS.md` §CHANGELOG.md (CORE-013 ghosts removed; annotated tags are SSOT for full notes).
- README §Version points only at SPEC + tags today — no scannable history.
- `/ft-release` is flowtron-self only; Codex wrapper is thin `Read …/claude/skills/ft-release/SKILL.md`.

**Archive skim (core):**
- CORE-013 (referenced, archive missing as standalone note — under skip threshold): removed ghost CHANGELOG refs; tags + release tasknotes are the history.
- CORE-048 / release cohort: tag-message structure subject + summary + Changes + Migration is the established pattern.
- CORE-194.1 survey: candidate "CHANGELOG with Unreleased" declined — deliberate removal.
- No prior VERSION-HISTORY surface; no archive hits for that name.

**Best Practices:** Docs + release-skill recipe only. Extend CONVENTIONS/README pointer pattern and `/ft-release` recipe (same place tag message is drafted). Do not invent a second changelog maintainer. VERSION-HISTORY is **not** AI-referenced cold-start (human browse surface); README + CONVENTIONS already AI-referenced will carry the pointer. Deferred: FE viz "releases" view (explicitly out of scope).

**Drift check:** PLAN says docs surface from tags, no CHANGELOG.md, FE OOS — matches operator locks. SPEC/versioning.md is adopter bump mechanics only; no contradiction. CONVENTIONS decline of Keep a Changelog stays intact if VERSION-HISTORY is framed as curated highlights (no Unreleased, no exhaustive Added/Changed/Fixed taxonomy, tags remain full SSOT).

**Clarifications:** answered above; assumptions going forward — reverse-chron; patch entries as `###` one-liners; `/ft-release` drafts the history entry from the locked tag message (same session, not a separate maintainer).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Extended the existing release-docs pattern — annotated tags remain SSOT; CONVENTIONS decline of Keep a Changelog stays; new surface is a curated sibling under `docs/` (same family as PHILOSOPHY / VISION / CONVENTIONS), not a root CHANGELOG. Maintenance hooks into `/ft-release` §7.2 next to tag-message lock (one draft session) and §7.4 staging.

**Minimal refactor:** None beyond the recipe extension; no adjacent skill rewrites.

**Deliverables:**
- `docs/VERSION-HISTORY.md` — intro + 43 headings (verified: every tag is a `##`/`###` heading; no dups)
- README: §Version pointer, All-documentation list, repo-layout docs bullet
- `docs/CONVENTIONS.md`: CHANGELOG decline reframed to name VERSION-HISTORY as scannable highlights
- `/ft-release`: Acceptance line, §7.2 VERSION-HISTORY draft+prepend, §7.4 `git add docs/VERSION-HISTORY.md`, description/recipe one-liners
- `ft-flowtron` Key docs + `/ft-release` roster row; `claude/commands/ft-release.md` description
- Codex wrapper untouched (thin pointer)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Testing Notes:**

- Tests: N/A — no code / parser / viz changes
- Lint/typecheck: N/A — markdown + skill prose only
- Quality: all 43 tags present as headings; no CHANGELOG.md; FE untouched; VERSION-HISTORY not added to AI-referenced cold-start (intentional — human browse; README/CONVENTIONS carry the pointer)
- Frontend visual confirm: N/A — FE out of scope

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:**
- `README.md` — updated (§Version, All documentation, repo layout)
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — updated (CHANGELOG decline → VERSION-HISTORY pointer)
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — no change
- `docs/WORKTREES.md` — no change

(VERSION-HISTORY deliberately **not** added to the AI-referenced list — human-scannable history, not cold-start contract.)

**Final Summary:**

Shipped `docs/VERSION-HISTORY.md` as a curated reverse-chron highlight reel for all 43 tags (minors/majors with main+optional secondary; patches one-line), linked from README and CONVENTIONS without reviving CHANGELOG.md, and wired `/ft-release` to prepend an entry on every future cut. FE untouched. Maintainability: release notes stay single-source in tags; the docs surface stays current only via the existing release recipe.

**Archived:** 2026-08-09
