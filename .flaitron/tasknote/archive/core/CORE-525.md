---
title: release v5.24.0
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-514, CORE-506]
---

# CORE-525 | release v5.24.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-514]] [[CORE-506]]

## 🎯 Goal

Cut v5.24.0, a minor release tagging the self-host-claude-md feature (CORE-514) since v5.23.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.23.0` → `v5.24.0`
- [x] docs/MIGRATION.md example pin bumped `v5.23.0` → `v5.24.0`
- [x] SECURITY.md release-tag example pin bumped `v5.23.0` → `v5.24.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.24.0`, or recorded `skipped @ v5.24.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-525 — flowtron v5.24.0 (...)` commit lands
- [ ] Annotated `v5.24.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.24.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-525.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-514]] — self-host-claude-md feature, tagged in this release
- [[CORE-506]] — precedent: prior release tasknote (v5.23.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-506/500/484 precedent); commit log + version drift verified at Step 1.1/2 of `/ft-release`. No un-cut release lines were pending — this cut's PLAN.md line was drafted and filed by Step 1.1 itself.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:116`

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-506.md` (prior release tasknote) confirms the 3-edit recipe and dogfood-gate shape are still current.

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.23.0`; `docs/MIGRATION.md:487` and `SECURITY.md:116` example pins both read `v5.23.0` — clean, matches `git describe --tags --abbrev=0`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Adopter-impact classification below found no required project-side edits.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 21 commits since v5.23.0. Grouped by cohort:

- **CORE-514 (feat: self-host-claude-md)** — added one line to flowtron's own root `CLAUDE.md` (the symlink-to-AGENTS.md shim note). Flowtron-self dogfooding only; no adopter-copied template or snippet touched.
- **CORE-507/CORE-508/CORE-513 (refactor: split ft-release / ft-close-epic / ft-epic-discovery into lazy fragments)** — new fragment files land inside skill directories that are already wired by whole-directory symlink (`docs/MIGRATION.md` §1.2, §"symlinks point at flowtron's working tree" / pin to submodule SHA). A normal `/ft-update` submodule bump picks up the new fragments automatically; no separate adopter reconcile step.
- **CORE-509/510/511/512/515/516/517/518/519/520/521 (docs)** — AGENTS.md / claude/AGENTS-snippet.md / docs/*.md wording, cross-reference, and drift corrections found by the 2026-08-30 audit-context pass. Prose-only; the canonical paste-block and symlink roster are unchanged in shape.
- **dd51371 (fix)** — restores a blank line in flowtron-self's own `.flowtron/PLAN.md` after a prior closure edit. No adopter surface.

**Verdict: no required project-side edits.** Nothing in this cut touches adopter-copied template files or requires a project-side reconcile beyond the routine `/ft-update` submodule bump. Migration block opens with the `No required project-side edits` sentinel.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:116`, all `v5.23.0` → `v5.24.0`. Post-edit grep clean — every remaining `v5.23.0` hit is expected residue: the dogfood stamps the gate below resolved, the write-once `docs/VERSION-HISTORY.md` historical entry, and `docs/AGENT-COMPAT.md` prose referencing v5.23.0 as a past dogfooded event.

**SOP-currency check: clean, one candidate re-dismissed.** Two-tier walk over `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/ templates/tasknote-template.md`, stamp `2026-08-29`) returned the same tier-1 candidate as the v5.23.0 cut (4f9ac47, CORE-503) and a tier-2 note of 4 SPEC.md commits. Re-dismissed for the same reason: the SOP already says "the six gates" (SPEC/procedures/ft-task.md:56, confirmed) with no restatement drift; CORE-503's rebuttal prose lives in `SPEC/gates.md`, which the SOP already routes to rather than restates. Tier-2 note (CORE-502, CORE-504, CORE-500, and the v5.23.0 release commit itself touching SPEC.md) skimmed: none touch the operator-facing task-line grammar or gate table the SOP restates. No follow-up filed. Stamp left un-bumped per the flag-don't-bump rule.

**Dogfood gate:**
- **Claude** — refreshed to `v5.24.0 · 2026-08-30 (dogfooded)`. Directly evidenced: this session is driving `/ft-release` end-to-end through the cut. `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified" bumped.
- **Grok** — no real session this cycle; kept pinned at `v5.22.0 · 2026-08-29 (dogfooded)`, suffix bumped to `skipped @ v5.24.0`. `docs/AGENT-COMPAT.md` matrix row + `docs/PLATFORMS.md` footer.
- **Codex** — same as Grok: `v5.22.0 · 2026-08-29 (dogfooded; skipped @ v5.24.0)`.
- **Cursor** — same as Grok: `v5.22.0 · 2026-08-29 (dogfooded; skipped @ v5.24.0)`.

Pre-write concurrent-check: `git status --porcelain` on the three stamp files was empty before any edit landed.

**§7.1 standing checks (`step-7.1-standing-checks.md`):**
- Wiring-consumer derivation (MIGRATION.md §1.6 / ft-new-project Steps 7-8) — clean, no hardcoded roster hits.
- Shipped-skill parity (`claude/skills/` vs `codex/skills/`) — clean, `diff` exit 0.
- Installed-surface policy (4-way diff: skill dir minus non-adopter set / SSOT vs command half / codex / cursor / grok) — all 4 clean.
- Local repo-scoped wiring (blocking, `claude/{skills,commands}` vs `.claude/{skills,commands}` + dangling-symlink scan) — clean.
- Machine-global wiring (advisory) — **not run**: the two `find ~/.claude/...` commands are blocked by this session's path-access guard (operator-approval-in-conversation is insufficient; the hook requires a persistent `path-access-roots` entry the operator adds out of band). Per the fragment's own text this half never blocks commit-go and the fix (if any) lands out of band regardless — carrying forward as "not run" rather than "clean" in the §7.4 closure review, since it genuinely wasn't checked this cut.

**§7.1 mirror pairs (`step-7.1-mirror-pairs.md`, all block):** A (templates roster) · B (Claude/Codex flags) · C (template back-link depth) · D (owned by README task-counter check, below) · E (ft-flowtron roster row+flag coverage) · F (park-priority flags, mirrors + command stubs) · G (`--worktree` mirrors) · H (validation command roster, 5 sites + CI verbatim) · I (CAPABILITIES flag rows ↔ non-Claude triggers) · J (argument-hint ↔ documented flags) · K1/K2 (VISION.md citation labels) — **all 11 clean**, no drift found.

**`/ft-audit docs ai-referenced` subroutine (Step 7.1 doc-drift sweep):** ran via a forked sub-agent over the full 18-file AI-referenced doc set. One Medium finding: `README.md:23`'s closed-task count (808) had drifted from the live archive count. No other findings across the 5 passes (health score 9/10) — expected, given CORE-505–521 landed today specifically fixing drift across this same doc set.

**Standing README task-counter check:** recomputed from `.flowtron/tasknote/archive/` — 824 archived tasknotes (was 808), date range unchanged (2026-04-28 → 2026-08-30, "as of 2026-08-30" still current). Fixed inline at `README.md:23` (808 → 824) — this is the same finding the docs subroutine surfaced; one fix covers both.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — markdown prose edits, mental-pass only (single-token version-string substitutions, no frontmatter/fenced blocks touched)

- [x] Ran lint/type-check on changed code — N/A for the prose edits; standing viz + fleet-updater validation gate run below regardless

- [x] **Quality assertions** — N/A (no code changed)

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation"), run regardless of which files this cut touches:

```
npm --prefix viz test           → 28 files, 524 tests passed
npm --prefix viz run typecheck  → clean
npm --prefix viz run lint       → clean
node --test tools/update-adopters.test.mjs   → 49 tests, 14 suites, 0 failed
node --check tools/update-adopters.test.mjs  → OK
node --check tools/update-adopters.mjs       → OK
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/ft-audit docs ai-referenced` subroutine (forked) found one Medium finding (README task counter), fixed via the standing README task-counter check. All 11 §7.1 mirror pairs and 5 other standing checks clean (machine-global wiring not run — path-access guard, advisory-only, carried forward).

- [x] Closed — every Acceptance criterion ticked once §7.5 lands (commit/tag/push); PLAN.md line flipped below; tasknote archived below.

- [x] **Evidence-based recap** drafted (see Final Summary below)

**Final Summary:**

Cut flowtron v5.24.0, a minor release. Flowtron now self-hosts its own Claude Code agent guide via a repo-root `CLAUDE.md` → `AGENTS.md` symlink (CORE-514); an audit-context sweep landed today fixed 12 cross-reference/wording drift issues across the contract-layer docs (CORE-505–521); and `/ft-release` §7.1 plus the epic-discovery/close-epic skills were split into lazy fragments for maintainability with no behavior change (CORE-507/508/513). No required adopter-side edits — everything lands automatically on the next `/ft-update`. Standing viz + fleet-updater validation gate passed clean (524 viz tests, 49 fleet-updater tests). Dogfood gate: Claude refreshed to v5.24.0; Grok/Codex/Cursor skipped @ v5.24.0. SOP currency clean (one candidate re-dismissed, same as v5.23.0's cut). Doc-drift sweep found and fixed one Medium finding (README task counter, 808→824); all 11 mirror-pair checks and the other 4 standing §7.1 checks clean.

**Archived:** 2026-08-30
