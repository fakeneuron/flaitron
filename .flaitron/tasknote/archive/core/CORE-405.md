---
title: release v5.15.0
status: completed
tags: []
created: 2026-08-02
due:
related-tasks: [CORE-381, CORE-385, CORE-386, CORE-387, CORE-389, CORE-390, CORE-391, CORE-392, CORE-393, CORE-394, CORE-395, CORE-397, CORE-398, CORE-399, CORE-396, CORE-380]
---

# CORE-405 | release v5.15.0

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-390]] [[CORE-391]] [[CORE-392]] [[CORE-396]] [[CORE-380]]

## 🎯 Goal

Cut the v5.15.0 minor release tagging the 29 commits since v5.14.1 — headlined by the skill-roster rationalization (21→18: [[CORE-390]] debug fold, [[CORE-391]] sidequest fold, [[CORE-392]] ft-quality retire, [[CORE-389.3]] audit-sibling retirement) plus the SOP-currency gate and flag-surface sync.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.14.1` → `v5.15.0`
- [x] docs/MIGRATION.md example pin bumped `v5.14.1` → `v5.15.0`
- [x] SECURITY.md release-tag example pin bumped `v5.14.1` → `v5.15.0`
- [x] `viz/src/ui/constants.ts` `VIZ_VERSION` bumped `v5.14.1` → `v5.15.0`
- [x] `viz/package.json` `"version"` bumped `"5.14.1"` → `"5.15.0"` (bare semver, no `v` prefix), `viz/package-lock.json` resynced to match
- [x] docs/MIGRATION.md retired-skills table: `ft-audit-{backend,frontend,security,performance,docs}` "Released in" corrected `v5.14.0` → `v5.15.0` (Discovery finding — the siblings were still present at both v5.14.0 and v5.14.1; CORE-389.3 removes them in *this* cut)
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex) refreshed from a real verification run at `v5.15.0`, or recorded `skipped @ v5.15.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-405 — flowtron v5.15.0 (...)` commit lands
- [ ] Annotated `v5.15.0` tag created with adopter-facing release notes
- [ ] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-405.md`

## 🧩 Subtasks

- [x] 5 version edits + retired-skills table correction
- [x] Dogfood gate walk (Claude / Grok / Codex refresh-or-skip)
- [x] SOP-currency check (flag-don't-bump)
- [x] viz lint/typecheck/test + updater test suite
- [x] Doc-drift sweep + wiring-count/parity/installed-surface standing checks
- [ ] Tag message drafted and approved
- [ ] Commit + tag + push (📦 gate)

## 🔗 Related

- [[CORE-390]] — debug-mode-fold (`/ft-debug` → `/ft-task --debug`)
- [[CORE-391]] — sidequest-fold (`/ft-sidequest` → `/ft-file-followup --park`)
- [[CORE-392]] — ft-quality-retire (no replacement)
- [[CORE-389]] — audit-consolidation epic (parameterized survivor + sibling retirement)
- [[CORE-397]] — sop-currency-gate (this skill's §5 standing check)
- [[CORE-396]] — de-scoped predecessor; pre-verified version state and the retired-skills table
- [[CORE-380]] — prior release v5.14.1 (precedent)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `SPEC.md:3` and `git describe` both read `v5.14.1` (no drift). 29 commits since the tag, 16 `feat:` and no `feat!:` / `BREAKING CHANGE:` — highest rank is minor → `v5.15.0`, matching the PLAN-line target and the user-confirmed bump.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:434` example pin, `SECURITY.md:109` release-tag pin, `viz/src/ui/constants.ts:41`, `viz/package.json:4`

- [x] **Best Practices Review** — N/A (version-string release; no module-boundary work)

- [x] **Archive skim** — CORE-380 (v5.14.1) is the direct prior precedent: same five-pin, dogfood-gate, doc-sweep, tag, archive shape, reused here. This cut adds the CORE-397 SOP-currency check, which did not exist at CORE-380.

- [x] **Drift check** — all five pins resolved at `v5.14.1` pre-edit; last tag matched `SPEC.md:3`. One **doc drift found** in the adopter-impact pass (see Discovery Notes) — absorbed into this cut as a Phase 2 edit.

- [x] No clarifications needed beyond the mandatory dogfood-gate resolution (asked via AskUserQuestion during Phase 2). Bump is minor, not major; adopter impact is unambiguous (retired-skill symlink pruning, already documented).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** 29 commits since v5.14.1 — 16 `feat:`, 1 `fix:`, 3 `docs:`, 4 `chore:`, plus the CORE-EPIC-389 children. The release headline is **skill-roster rationalization, 21 → 18**: [[CORE-390]] folded `/ft-debug` into `/ft-task --debug`, [[CORE-391]] folded `/ft-sidequest` into `/ft-file-followup --park`, [[CORE-392]] retired `/ft-quality` outright, and [[CORE-389.3]] retired the five `ft-audit-<domain>` siblings behind the parameterized `/ft-audit <domain>` survivor built in [[CORE-389.2]]. Supporting work: [[CORE-397]] added the release-cut SOP-currency gate, [[CORE-395]] re-checked the `ft-task` SOP against its source, [[CORE-394]] swept self-symlinks, [[CORE-387]] enforced cross-artifact consistency, [[CORE-393]] tightened Phase 4 closure hygiene, [[CORE-381]] added the Phase 4 status flip, [[CORE-385]] added skill trigger frontmatter, [[CORE-386]] added skill rationalization red-flags, [[CORE-399]] synced flag surfaces, and [[CORE-398]] fixed wrapper invoke names.

**Adopter impact:** **Migration required** — this is a retirement release. Four slash commands disappear from the submodule (`/ft-debug`, `/ft-sidequest`, `/ft-quality`, and the five `ft-audit-<domain>` siblings). Adopters who symlinked any of them keep a dangling symlink that surfaces a slash command failing on invoke; `/ft-update` wires *new* skills but does not prune retired ones, so the cleanup is manual per `docs/MIGRATION.md` §"Retired skills leave dangling symlinks". Thin-overlay audit forks additionally **break on bump** — a pre-consolidation overlay's "Referenced scaffold" line names a now-retired `ft-audit-<x>` path; §1.2.1 "Migrating a pre-consolidation audit fork" carries the repoint steps. Note `/ft-quality` has no replacement.

**Drift found (fixed in Phase 2):** `docs/MIGRATION.md:479` attributes the `ft-audit-{backend,frontend,security,performance,docs}` retirement to **v5.14.0**. Verified against the tree: `git ls-tree v5.14.0` and `git ls-tree v5.14.1` both still contain all five sibling directories; they are removed only at HEAD, by CORE-389.3, shipping in **v5.15.0**. The table's other rows use "release in which the skill was retired" semantics, so the attribution is simply wrong — and it is the row an adopter consults to learn *which bump* breaks their overlay. Corrected to `v5.15.0` in this cut.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — release pattern follows CORE-380

- [x] **Minimal refactor gate** — N/A (version-string release)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (version-string release; feature tests landed in their own tasknotes)

**Implementation Notes:**

Five version pins + retired-skills table correction landed in working tree:

1. `SPEC.md:3` → `v5.15.0`
2. `docs/MIGRATION.md` example pin + retired-skills row for audit siblings `v5.14.0` → `v5.15.0`
3. `SECURITY.md` release-tag example → `v5.15.0`
4. `viz/src/ui/constants.ts` `VIZ_VERSION` → `v5.15.0`
5. `viz/package.json` / `viz/package-lock.json` bare `"5.15.0"`

**Dogfood gate — all three rows refreshed (first clean sweep):**
- Claude — **refreshed** → `v5.15.0 · 2026-08-02 (dogfooded)` (this `/ft-release` cut is itself the Claude verification run)
- Grok — **refreshed** → `v5.15.0 · 2026-08-02 (dogfooded)` (parallel Grok Build session drove the cut independently)
- Codex — **refreshed** → `v5.15.0 · 2026-08-02 (dogfooded)` (parallel Codex CLI session: contract comprehension, operator-cue rendering, Phase-1 drive on CORE-400, `ft-release` wrapper load/translate; no files changed there)

The three agents were dogfooded in parallel against this cut. An interim state written by the Grok session recorded Claude and Codex as `skipped @ v5.15.0` — correct at the time, since neither result existed yet. Both were reconciled to `refreshed` once their runs reported back, so no row carries a skip suffix this release.

Stamp locations: `docs/AGENT-COMPAT.md` matrix + `claude/CAPABILITIES.md` (Claude) + `docs/PLATFORMS.md` Grok/Codex footers.

**SOP currency: clean.** Only shipped SOP is `SPEC/procedures/ft-task.md` (`last-verified: v5.14.1 · 2026-08-02`); no `source:` commits since that date that did not also touch the SOP.

`v5.14.1` residue after edits is expected and limited to two non-pins: the SOP `last-verified:` stamp in `SPEC/procedures/ft-task.md` (a SOP↔source sync stamp, never bumped by a cut) and historical prose in `claude/skills/ft-release/SKILL.md` (the CORE-395 worked example). No dogfood-skip residue this release — all three rows refreshed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — version-string and prose edits only; no duplication, dead code, or public-surface growth introduced

- [x] (frontend) Visual confirmation not needed — version-string release only; no UI behavior changed

**Testing Notes:**

- `npm --prefix viz run lint` — pass
- `npm --prefix viz run typecheck` — pass
- `npm --prefix viz run test` — 18 files / 242 tests pass
- `node --test tools/update-adopters.test.mjs` — 24/24 pass
- Markdown mental-pass: single-token version substitutions; no frontmatter/fence breakage

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  Subroutine `/ft-audit docs` (release orchestrator owns findings; no PLAN writes):
  - Pass 1 Claims vs code: shipped inventory 18/18; retired paths gone (`ft-debug`/`ft-sidequest`/`ft-quality`/five `ft-audit-*` siblings absent). Peer roster in `Agents.md` already uses `/ft-task --debug` and `/ft-file-followup --park`. **Zero findings.**
  - Pass 2 Cross-doc consistency: five release pins + package-lock at `v5.15.0`/`5.15.0`; dogfood stamps coherent. **Zero findings.**
  - Pass 3 Cross-references: standing wiring-count (snippet 22 `ln -s` = MIGRATION §1.6 22 `.claude/` paths = ft-new-project 22 `readlink` lines); Claude/Codex skill parity exact; installed-surface policy exact-set + forbidden-install clean. **Zero findings.**
  - Pass 4 Currency: version pins bumped this cut; dogfood rows resolved; SOP stamp not a release pin. **Zero findings.**
  - Pass 5 Stale content: retired-skills table attribution corrected this cut. **Zero findings.**

  Per-doc: SPEC/MIGRATION/SECURITY/AGENT-COMPAT/PLATFORMS/CAPABILITIES updated this cut; remaining AI-referenced docs no change required for v5.15.0.

- [x] **Follow-up filed** — [[CORE-406]] `parallel-dogfood-stamp-ownership` (Medium), surfaced by this cut's dogfood gate. PLAN line only, no tasknote artifact.

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:** Flowtron v5.15.0 is a minor release headlined by skill-roster rationalization — **26 → 18 shipped skills**, retiring eight slash commands. Three standalone skills were folded or dropped ([[CORE-390]] `/ft-debug` → `/ft-task --debug`, [[CORE-391]] `/ft-sidequest` → `/ft-file-followup --park`, [[CORE-392]] `/ft-quality` with no replacement) and the five `ft-audit-<domain>` siblings were consolidated behind the parameterized `/ft-audit <domain>` survivor ([[CORE-389]] epic). Release tooling gained a standing SOP-currency gate ([[CORE-397]]) plus flag-surface, wrapper-name, self-symlink, and cross-artifact sweeps ([[CORE-399]], [[CORE-398]], [[CORE-394]], [[CORE-387]]); the workflow contract gained the Phase 4 status flip and closure hygiene ([[CORE-381]], [[CORE-393]]) and skill trigger frontmatter plus rationalization red-flags ([[CORE-385]], [[CORE-386]]).

**This is a migration-bearing release** — the first since v5.14.0 to require adopter action. Adopters who symlinked any of the eight retired skills keep dangling symlinks that must be pruned manually (`/ft-update` wires new skills but does not prune retired ones), and thin-overlay audit forks break on the bump because their "Referenced scaffold" line names a now-retired path. The tag's Migration block names all eight slugs, the `find` one-liner, and the §1.2.1 repoint procedure.

Diff shape: 5 version pins + `viz/package-lock.json` resync, one corrected `docs/MIGRATION.md` retired-skills attribution, three dogfood stamp files, the PLAN flip, and this tasknote. **Two defects were caught during the cut and fixed inline**: (1) the retired-skills table attributed the five audit siblings to `v5.14.0`, but `git ls-tree` confirms they were present at both v5.14.0 and v5.14.1 and are removed only here — corrected to `v5.15.0`, clearing the last `v5.14.0` reference in the tree; (2) two dogfood rows carried stale `skipped @ v5.15.0` stamps written by a parallel session before the Claude and Codex results existed — reconciled to `refreshed`, which is what the permanent tag now reflects. The roster delta in the original PLAN line (`21→18`) was also wrong; verified 26→18 against both the shipped inventory and the `/ft-flowtron` displayed roster, and the corrected figure is what ships in the tag.

**Dogfood gate — all three rows refreshed at `v5.15.0 · 2026-08-02 (dogfooded)`, the first clean sweep** (no row carries a skip suffix). Verification: Claude Code drove this `/ft-release` cut end to end; Grok Build drove the cut independently in parallel; Codex CLI verified contract comprehension, operator-cue rendering, a Phase-1 drive on CORE-400, and `ft-release` wrapper load/translate. The parallel-session stamp race is filed as [[CORE-406]].

Gates, all re-run independently by the release chat rather than taken from the parallel sessions' reports: `viz` lint and typecheck clean, 242/242 tests across 18 files, `update-adopters` 24/24 across 9 suites, package reports `flowtron-viz@5.15.0`. Standing checks: Claude symlink wiring count 22 across all four consumers (snippet `ln -s`, MIGRATION §1.6, ft-new-project Step 7 staging + Step 8 `readlink` and its "all twenty-two" prose); shipped-skill parity claude↔codex exact at 18/18; installed-surface 11-slug adopter subset exact across all three snippets with zero forbidden repo-scoped installs. SOP currency: clean. Doc-drift sweep: zero remaining findings.

**Archived:** 2026-08-03
