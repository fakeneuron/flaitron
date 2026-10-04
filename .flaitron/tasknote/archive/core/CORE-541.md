---
title: release v5.25.0
status: completed
tags: []
created: 2026-09-08
due:
related-tasks: [CORE-EPIC-535, CORE-536, CORE-540, FE-102, FE-105, CORE-525]
---

# CORE-541 | release v5.25.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-EPIC-535]] [[CORE-536]] [[CORE-540]] [[CORE-525]]

## 🎯 Goal

Cut v5.25.0, a minor release tagging the context-load epic (CORE-EPIC-535), the gate-relaxation pass (CORE-536), the visualizer hardening cohort (FE-102–FE-105), and the fleet-updater exit fix (CORE-540) since v5.24.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.24.0` → `v5.25.0`
- [x] docs/MIGRATION.md example pin bumped `v5.24.0` → `v5.25.0`
- [x] SECURITY.md release-tag example pin bumped `v5.24.0` → `v5.25.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.25.0`, or recorded `skipped @ v5.25.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-541 — flowtron v5.25.0 (...)` commit lands
- [ ] Annotated `v5.25.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.25.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-541.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs ai-referenced` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-EPIC-535]] — context-load epic (lazy SPEC split, load ledger, cite-don't-restate, gate-logic untangle), tagged in this release
- [[CORE-536]] — gate-relaxation pass, tagged in this release
- [[CORE-540]] — fleet-updater unreadable-root exit, tagged in this release
- [[FE-102]] — visualizer hardening cohort head (FE-102–FE-105), tagged in this release
- [[CORE-525]] — precedent: prior release tasknote (v5.24.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-525/506/500 precedent); commit log + version drift verified at Step 1.1/2 of `/ft-release`. No un-cut release lines were pending — this cut's PLAN.md line was drafted and filed by Step 1.1 itself.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118`

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-525.md` (prior release tasknote) confirms the 3-edit recipe, the dogfood-gate shape, and the §7.1 standing-check/mirror-pair split are still current.

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.24.0`; `docs/MIGRATION.md:487` and `SECURITY.md:118` example pins both read `v5.24.0` — clean, matches `git describe --tags --abbrev=0`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Adopter-impact classification below found one optional project-side refresh (PLAN.md header prose); nothing required.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 34 commits since v5.24.0. Grouped by cohort:

- **CORE-EPIC-535 (feat: context-load diet, `.1`–`.5` + `.N`)** — the largest cohort. `SPEC.md` shed 647 lines into eight new lazy `SPEC/` modules (`cue-vocabulary.md`, `gate-discipline.md`, `layout.md`, `plan-parser.md`, `purpose-blurb.md`, `scope-boundaries.md`, `superseded-claims.md`, `tasknote-inserts.md`), skills were re-pointed to cite rather than restate contract, and `docs/CONTEXT-BUDGET.md` was added as the per-file byte ledger. All of it lives inside the submodule, so a normal `/ft-update` bump picks it up with no adopter reconcile.
- **`claude/AGENTS-snippet.md` (+22, CORE-535.1)** — adds an advisory §"Keeping `AGENTS.md` small — `.claude/rules/`". The **paste-block itself is unchanged**, so no re-paste is required; the new section is optional guidance for adopters carrying subtree-scoped conventions in `AGENTS.md`.
- **`templates/PLAN.md` (+5)** — the header prose gained the `Blocked by [[TASK-ID]]` grammar note (wikilink-only, literal `Blocked by`). This template is **copied into the project at bootstrap**, so an adopter's existing `.flowtron/PLAN.md` header will not pick it up on a submodule bump. Optional one-paragraph refresh; the grammar itself already parses.
- **`templates/tasknote-template.md` (±2)** — probe hint added to the Archive skim line. Read from the submodule by the skills at scaffold time, so it lands automatically.
- **CORE-536 (feat: gate-relaxation-pass)** — `SPEC/gates.md` restructured (662 lines changed) alongside the new `SPEC/gate-discipline.md`. Contract-layer prose; no adopter-copied surface.
- **FE-102–FE-105 (visualizer)** — `viz/` hardening: cross-site navigation guard on the dev API (`originGuard.ts`, new), a shared fence-mask module, Node-tier contained-read dedup, and a UI shell structure pass. Affects adopters only if they run the bundled visualizer; no config or wiring change.
- **CORE-540 (feat: updater-unreadable-root-exit)** — `tools/update-adopters.mjs` exits cleanly on an unreadable fleet root. Operator-side fleet script, not shipped into adopter checkouts. No adopter surface.
- **CORE-526–534, CORE-537–539 (feat/docs)** — contract and doc corrections (purpose blurb at Step 1, handoff-persistence and deferred-filing discipline, `Blocked by` grammar, bracket-token preservation, satisfied-blocker sweep at closure, several ledger/count accuracy fixes). Prose and skill-body only.

**Verdict: no required project-side edits; one optional refresh.** Everything lands on the routine `/ft-update` submodule bump except the `templates/PLAN.md` header paragraph, which adopters may re-copy into their own `.flowtron/PLAN.md` header if they want the `Blocked by` grammar documented in-repo. The migration block names that as optional rather than opening with the `No required project-side edits` sentinel.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118`, all `v5.24.0` → `v5.25.0`. Post-edit grep clean — every remaining `v5.24.0` hit is expected residue: the dogfood stamps the gate below resolved, the write-once `docs/VERSION-HISTORY.md` historical entry, and `docs/CONTEXT-BUDGET.md`'s measured-at stamp (refreshed by the standing check below, not a release pin).

**Dogfood gate:**
- **Claude** — refreshed to `v5.25.0 · 2026-09-08 (dogfooded)`. Directly evidenced: this session drove `/ft-release` end-to-end through the cut. `docs/AGENT-COMPAT.md` matrix row + `claude/CAPABILITIES.md` §"Last verified" bumped.
- **Grok / Codex / Cursor** — no real session this cycle; each kept pinned at `v5.22.0 · 2026-08-29 (dogfooded)`, suffix bumped to `skipped @ v5.25.0`. `docs/AGENT-COMPAT.md` matrix rows + `docs/PLATFORMS.md` per-agent footers.

Pre-write concurrent-check: `git status --porcelain` on the three stamp files was empty before any edit landed.

**SOP-currency check: 3 candidates, 1 real → filed CORE-542.** Two-tier walk over `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/ templates/tasknote-template.md`, stamp date 2026-08-29) returned three tier-1 candidates and a tier-2 note of 9 SPEC.md commits.
- **b75a55d (CORE-535.4, skills-cite-dont-restate)** — dismissed. It *removed* restated contract from `ft-task/SKILL.md` in favour of citations; the SOP already routes rather than restates by design, so no neutral-layer surface changed.
- **4f9ac47 (CORE-503)** — re-dismissed, same reason recorded at the v5.24.0 cut: the SOP already says "the six gates" and CORE-503's rebuttal prose lives in `SPEC/gates.md`, which the SOP routes to.
- **1fbc7a3 (CORE-535.2, context-load-ledger)** — **real drift.** It added the probe-by-default-above-~3-hits hint to `templates/tasknote-template.md`'s Archive-skim line, but `SPEC/procedures/ft-task.md:255` restates that step without it (the SOP's probe paragraph sits on the *Read source files* bullet only). Filed **CORE-542** under `## Low`. Stamp left un-bumped per the flag-don't-bump rule.
- **Tier-2 note (9 SPEC.md commits)** — skimmed and cleared: all 10 `SPEC.md §"…"` headings the SOP cites still resolve after the CORE-535.3 lazy split.

**§7.1 standing checks (`step-7.1-standing-checks.md`):**
- Wiring-consumer derivation (MIGRATION.md §1.6 / ft-new-project Steps 7–8) — clean, both greps exit 1 with no output.
- Shipped-skill parity (`claude/skills/` vs `codex/skills/`) — clean.
- Installed-surface policy (4-way derived diff + SSOT command half) — all 5 diffs clean.
- Local repo-scoped wiring (blocking) — clean: both `diff`s match, no dangling links, no non-symlink entries.
- Machine-global wiring (advisory) — **not run.** The operator approved the two `~/.claude/` scans in conversation, but the NAT-195 path-access hook blocks both `find` and one-level `ls` outside the repo regardless; it requires a persistent `path-access-roots` entry the operator adds out of band. Per the fragment this half never blocks commit-go and no file in this cut could carry the fix — carried forward as "not run" rather than "clean", same as the v5.24.0 cut.
- README task-counter — **drifted, fixed inline.** Recomputed from `.flowtron/tasknote/archive/`: 849 archived tasknotes (was 824), latest `**Archived:**` date 2026-09-08 (was 2026-08-30). `README.md:22-23` updated on both count and "as of" date.
- Context budget — clean, and the ledger refreshed. Every budgeted surface is under cap: `SPEC.md` 49,002/50,000, `SPEC/gates.md` 34,866/35,000, `ft-release/SKILL.md` 37,369/40,000, largest other skill body `ft-task` 28,845/30,000. §"Known over budget" is empty and stays empty. **Both `SPEC.md` and `SPEC/gates.md` are within ~1,000 and ~150 chars of their caps** — the next contract addition to either will trip the gate, which is the ratchet working as designed. Ledger rows refreshed across all four subsections plus the two whole-directory totals (`SPEC.md` 48,771→49,002 · `ft-task/SKILL.md` 27,588→28,845 · `.flowtron/tasknote/README.md` 6,559→6,849 · `ft-goal-task` 26,176→26,497 · `ft-micro-task` 18,533→18,981 · `ft-release` dir 83,421→85,691 · `ft-task` dir 54,601→56,378 · `templates/PLAN.md` 2,736→2,801); stamp moved to `Measured 2026-09-08 at v5.25.0, refreshed by [[CORE-541]]`. The 18 lazy `SPEC/` module rows all measured unchanged.

**§7.1 mirror pairs (`step-7.1-mirror-pairs.md`, all block):** A (templates roster — all 10 files in `templates/` named by all three clauses) · B (Claude/Codex flags) · C (template back-link depth) · D (owned by the README task-counter check above) · E (ft-flowtron roster rows + flag coverage) · F (park-priority flags, 5 mirrors + globbed command stubs) · G (`--worktree` mirrors) · H (validation command roster, 5 sites + CI verbatim diff) · I (CAPABILITIES flag rows ↔ non-Claude triggers) · J (argument-hint ↔ documented flags) · K1/K2 (VISION.md citation labels) — **all 11 clean**, no drift found.

**`/ft-audit docs ai-referenced` subroutine (§7.1 doc-drift sweep):** run inline over the full 18-file AI-referenced doc set; rubric = the doc-set contract, gates = none configured (no markdown linter or link checker in this repo). **One Medium finding** — `README.md:22-23`'s closed-task count and date range, the same drift the standing README counter check found and fixed; one fix covers both. Passes 1/2/3/5 clean. Health 9/10. Notable: all `SPEC.md §"…"` and `SPEC/` module citations across the doc set still resolve after CORE-535.3's 647-line lazy split — the highest-risk class this cut could have introduced.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — markdown prose edits, mental-pass only (single-token version-string substitutions and numeric ledger updates; no frontmatter or fenced blocks touched)

- [x] Ran lint/type-check on changed code — N/A for the prose edits; standing viz + fleet-updater validation gate run below regardless

- [x] **Quality assertions** — N/A (no code changed)

**Testing Notes:**

Standing validation gate (`AGENTS.md` §"Validation"), run regardless of which files this cut touches:

```
npm --prefix viz test           → 28 files, 530 tests passed
npm --prefix viz run typecheck  → clean (exit 0)
npm --prefix viz run lint       → clean (exit 0)
node --test tools/update-adopters.test.mjs   → 51 tests, 14 suites, 0 failed
node --check tools/update-adopters.test.mjs  → OK
node --check tools/update-adopters.mjs       → OK
```

The viz cohort (FE-102–FE-105) and CORE-540 each ran their own test pass in their own tasknotes; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/ft-audit docs ai-referenced` subroutine over the 18-file doc set found one Medium finding (README task counter), fixed via the standing README task-counter check. All 11 §7.1 mirror pairs clean; 6 of 7 standing checks clean (README counter fixed inline; machine-global wiring not run — path-access guard, advisory-only, carried forward).

- [x] Closed — every Acceptance criterion ticked once §7.5 lands (commit/tag/push); PLAN.md line flipped below; tasknote archived below.

- [x] **Evidence-based recap** drafted (see Final Summary below)

**Final Summary:**

Cut flowtron v5.25.0, a minor release headlined by CORE-EPIC-535's context-load diet: `SPEC.md` shed 647 lines into eight new lazy `SPEC/` modules, the three largest lifecycle skills were re-pointed to cite rather than restate contract (83,391 → 72,450 bytes), and `docs/CONTEXT-BUDGET.md` shipped as the per-file byte ratchet the earlier CORE-EPIC-223 split never had. CORE-536 untangled and relaxed the gate machinery; FE-102–FE-105 hardened the visualizer (cross-site navigation guard, shared fence-mask module, Node-tier contained-read dedup, UI shell pass); CORE-540 fixed the fleet updater's unreadable-root exit. No required adopter-side edits — everything lands on the routine `/ft-update` bump, with one optional `templates/PLAN.md` header refresh for the `Blocked by` grammar. Standing validation gate passed clean (530 viz tests, 51 fleet-updater tests, typecheck + lint clean). Dogfood gate: Claude refreshed to v5.25.0; Grok/Codex/Cursor skipped @ v5.25.0. SOP currency found one real drift (CORE-535.2's probe hint un-mirrored into the agent-neutral SOP) → filed CORE-542, stamp left un-bumped. Doc-drift sweep found and fixed one Medium finding (README task counter, 824→849); all 11 mirror-pair checks clean, and the context-budget check confirmed every budgeted surface under cap — though `SPEC.md` (49,002/50,000) and `SPEC/gates.md` (34,866/35,000) now sit close enough that the next contract addition to either will trip the gate.

**Archived:** 2026-09-08
