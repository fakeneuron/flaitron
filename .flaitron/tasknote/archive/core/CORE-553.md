---
title: release v5.26.0
status: completed
tags: []
created: 2026-09-09
due:
related-tasks: [CORE-542, CORE-543, CORE-551, CORE-541]
---

# CORE-553 | release v5.26.0

[← PLAN.md](../PLAN.md) · ✅ Complete · 🔗 [[CORE-542]] [[CORE-543]] [[CORE-551]] [[CORE-541]]

## 🎯 Goal

Cut v5.26.0, a minor release tagging the unattended filing authority (CORE-551), the CI drift-job binding (CORE-543), and the ft-task SOP probe hint (CORE-542) since v5.25.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v5.25.0` → `v5.26.0`
- [x] docs/MIGRATION.md example pin bumped `v5.25.0` → `v5.26.0`
- [x] SECURITY.md release-tag example pin bumped `v5.25.0` → `v5.26.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v5.26.0`, or recorded `skipped @ v5.26.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flowtron/tasknote/README.md` §"AI-referenced docs" entries
- [ ] Single `feat: CORE-553 — flowtron v5.26.0 (...)` commit lands
- [ ] Annotated `v5.26.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v5.26.0` (minor/major: headline + 2–4 main bullets + optional secondary; patch: one-line subject)
- [ ] Tag pushed to origin
- [ ] PLAN.md line flipped to stub form under `## Completed`
- [ ] Tasknote archived to `.flowtron/tasknote/archive/core/CORE-553.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md)
- [x] Walk the dogfood gate (Claude/Grok/Codex/Cursor) and the SOP-currency flag-don't-bump check
- [x] Run the Phase 4 doc-drift sweep (`/ft-audit docs ai-referenced` subroutine) + standing mirror-pair / wiring-parity checks
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry
- [x] Write Final Summary, flip PLAN.md line, archive tasknote
- [ ] Stage, surface 📦 commit-go, commit/tag/push on GO

## 🔗 Related

- [[CORE-551]] — unattended filing authority (`/ft-file-followup --unattended`), headline feature of this release
- [[CORE-543]] — CI drift-job binding (§7.1 Pair L + Step 6.1 CI-status gate), tagged in this release
- [[CORE-542]] — ft-task SOP probe hint, tagged in this release
- [[CORE-541]] — precedent: prior release tasknote (v5.25.0)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Bump pattern is well-established (CORE-541/525/506 precedent); commit log + version drift verified at Step 1.1/2 of `/ft-release`. No un-cut release lines were pending — this cut's PLAN.md line was drafted and filed by Step 1.1 itself.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118`

- [x] **Best Practices Review** — N/A (version-string edits only, no code touched)

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/CORE-541.md` (prior release tasknote) confirms the 3-edit recipe, the dogfood-gate shape, and the §7.1 standing-check/mirror-pair split are still current. One structural change since: CORE-543 added Step 6.1 (blocking CI-status gate) and mirror **Pair L**, both of which this cut must walk.

- [x] **Drift check** — `SPEC.md:3` reads `**Version:** v5.25.0`; `docs/MIGRATION.md:487` and `SECURITY.md:118` example pins both read `v5.25.0` — clean, matches `git describe --tags --abbrev=0`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Adopter-impact classification below found no required and no optional project-side edits.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Adopter migration impact — classified all 8 commits since v5.25.0:

- **CORE-551 (feat: unattended-filing-authority)** — the headline. `/ft-file-followup` gains a real `--unattended` mode so an operator-less closure can discharge the `SPEC.md` §"Deferred hand-off filing" duty; previously the flag fell into the unknown-arg branch and fired AskUserQuestion into an empty session. Touches `SPEC.md`, `SPEC/gates.md`, `SPEC/tasknote-selection.md` (new §"Unattended filing authority"), `SPEC/procedures/ft-task.md`, the skill body, the command wrapper's `argument-hint`, the codex wrapper, and the three doc surfaces (`CAPABILITIES.md`, `PLATFORMS.md`, `EXTERNAL-AGENTS.md`). **No new skill** — the wrapper is already symlinked, so an adopter's existing wiring picks the flag up unchanged on the bump.
- **CORE-552 (fix: epic-discovery-unattended-hang)** — the sibling parser hang. `/ft-epic-discovery` now recognizes `--unattended` and terminates readably instead of hanging. Skill-body only.
- **CORE-543 (feat: ci-drift-job-binding)** — binds the `drift` CI job's six lifted checks to their §7.1 sources (mirror **Pair L**) and adds `/ft-release` Step 6.1, a blocking CI-status gate on the commit the release builds on. Filed after the v5.25.0 tag landed on a commit whose own CI run concluded `failure`, unread. Release-skill + `docs/CONVENTIONS.md` + `.flowtron/tasknote/README.md`; flowtron-self surface, not shipped to adopters.
- **CORE-546–CORE-550 (`chore: audit file tickets — docs`)** — five doc-accuracy fixes from a 2026-09-09 audit sweep, landed inline: the CI Pair A target left stale by CORE-535.3's lazy split (which had reddened the badge on every push), a neutrality-ledger SOP citation, the README task counter, an `AGENTS.md` mirror line-cite, and a missing `XHEAVY` fallback label.
- **CORE-544 (fix: release-gate-line-cite-drift)** — `/ft-release` standing-checks fragment line citations. Flowtron-self.
- **CORE-545 (fix: viz-version-lockstep)** — `viz/package.json`'s `version` had been frozen at `5.19.0` for six releases since CORE-478 deleted the `VIZ_VERSION` constant and the release-recipe bump step with it. Reset to `0.1.0` and documented in `viz/README.md` as deliberately unmaintained, so it stops reading as unresolved drift. Affects adopters only if they run the bundled visualizer.
- **CORE-542 (feat: ft-task-sop-probe-hint)** — mirrors CORE-535.2's probe-by-default hint into the agent-neutral `SPEC/procedures/ft-task.md`. This was the SOP-currency finding filed at the v5.25.0 cut, now discharged.

**Verdict: no required project-side edits, and none optional either.** `templates/` is untouched by every commit in this range, so no adopter-copied surface needs a re-copy; no new skill shipped, so `/ft-update`'s re-wire step is a no-op. Everything lands on the routine submodule bump.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — three-pin release recipe + dogfood/SOP walks; no code pattern work

- [x] **Minimal refactor gate** — N/A (version strings + stamps only)

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (no logic changes in this cut)

**Implementation Notes:**

**3 version edits:** `SPEC.md:3`, `docs/MIGRATION.md:487`, `SECURITY.md:118`, all `v5.25.0` → `v5.26.0`. Post-edit grep clean — every remaining `v5.25.0` hit is expected residue: the dogfood stamps the gate below resolved, the `SPEC/procedures/ft-task.md` SOP sync stamp, `docs/CONTEXT-BUDGET.md`'s measured-at stamp (refreshed below), the write-once `docs/VERSION-HISTORY.md` entry, and three narrative references in the `/ft-release` skill to the v5.25.0 CI failure (historical, correct as written).

**Dogfood gate — three of four rows refreshed, the widest resolution in several cuts:**
- **Claude** — refreshed to `v5.26.0 · 2026-09-09 (dogfooded)`. Directly evidenced: this session drove `/ft-release` end-to-end. `docs/AGENT-COMPAT.md:36` + `claude/CAPABILITIES.md:68`.
- **Grok** — refreshed to `v5.26.0 · 2026-09-09 (dogfooded)` per operator confirmation of a real session this cycle; prior `; skipped @ …` suffix dropped. `docs/AGENT-COMPAT.md:37` + `docs/PLATFORMS.md:402`.
- **Cursor** — refreshed to `v5.26.0 · 2026-09-09 (dogfooded)`, same basis. `docs/AGENT-COMPAT.md:39` + `docs/PLATFORMS.md:468`.
- **Codex** — no real session this cycle; kept pinned at `v5.22.0 · 2026-08-29 (dogfooded)`, suffix bumped to `skipped @ v5.26.0`. `docs/AGENT-COMPAT.md:38` + `docs/PLATFORMS.md:440`.

Pre-write concurrent-check: `git status --porcelain` on the three stamp files was empty before any edit landed.

**SOP-currency check: clean.** Two-tier walk over `SPEC/procedures/ft-task.md` (`source: claude/skills/ft-task/ templates/tasknote-template.md`, `restates: SPEC.md`, stamp date 2026-09-08) returned zero tier-1 candidates and zero tier-2 notes. Non-vacuous: exactly one source-touching commit exists since the stamp (b992dbf, CORE-551), and it is correctly filtered as an in-sync mirror — it edited `SPEC/procedures/ft-task.md` and `SPEC.md` in the same commit as `claude/skills/ft-task/unattended-mode.md`. The v5.25.0 cut's finding (CORE-542) was discharged before this one opened, which is why the stamp is only a day old. Stamp left un-bumped per flag-don't-bump.

**§7.1 standing checks (`step-7.1-standing-checks.md`):**
- Wiring-consumer derivation (MIGRATION.md §1.6 / ft-new-project Steps 7–8) — clean, both greps exit 1 with no output.
- Shipped-skill parity (`claude/skills/` vs `codex/skills/`) — clean.
- Installed-surface policy (4-way derived diff + SSOT command half) — all 5 diffs clean.
- Local repo-scoped wiring (blocking) — clean: both `diff`s match, no dangling links, no non-symlink entries.
- Machine-global wiring (advisory) — **not run.** `~/.claude/` is outside the repo and the NAT-195 path-access guard blocks both `find` and one-level `ls` there without an operator-named path; it needs a persistent `path-access-roots` entry added out of band. Per the fragment this half never blocks commit-go and no file in this cut could carry the fix — carried forward as "not run", same as the v5.25.0 and v5.24.0 cuts.
- README task-counter — **drifted, fixed inline.** `README.md:23-24`: 851 → **857**, date range and "as of" both 2026-09-08 → 2026-09-09. Note the count is deliberately the *post-archive* figure: `find` returns 856 at the moment of measurement, and this cut archives its own tasknote before the commit, so 856 would ship one short by construction. That off-by-one is why CORE-548 had to re-fix the same line nine days after CORE-541 set it; filing it as a check amendment was considered and left for a future cut rather than absorbed here.
- Context budget — clean, and the ledger refreshed. Every budgeted surface is under cap: `SPEC.md` 49,285/50,000, `SPEC/gates.md` 34,963/35,000, `ft-release/SKILL.md` 39,315/40,000, largest other skill body `ft-task` 28,845/30,000. §"Known over budget" is empty and stays empty. **`SPEC/gates.md` now sits 37 chars under its cap and `SPEC.md` 715 under** — CORE-551 spent nearly all remaining headroom on both (its own commit message records capping a fix at 96 chars against 134 of room), so the next contract addition to either will trip the gate. That is the ratchet working, but it is now effectively a hard stop rather than a warning. Ledger refreshed across all four subsections plus the two whole-directory totals (`SPEC.md` 49,002→49,285 · `.flowtron/tasknote/README.md` 6,849→7,978 · `gates.md` 34,866→34,963 · `procedures/ft-task.md` 30,315→31,205 · `tasknote-selection.md` 24,480→25,940 · `ft-release` 37,369→39,315 · `ft-file-followup` 16,031→23,648 · `ft-epic-discovery` 26,356→26,986 · `ft-flowtron` 9,134→9,287 · `ft-release` dir 85,691→92,839 · `ft-task` dir 56,378→57,186); stamp moved to `Measured 2026-09-09 at v5.26.0, refreshed by [[CORE-553]]`. Post-refresh every skill-body row was re-verified against `wc -c` programmatically — zero mismatches.

**§7.1 mirror pairs (`step-7.1-mirror-pairs.md`, all block):** A (templates roster — all 10 files in `templates/` named by all three clauses) · B (Claude/Codex flags) · C (template back-link depth — 4 templates carry a back-link, deep-form empty) · D (owned by the README task-counter check above) · E (roster rows + flag coverage) · F (park-priority flags, 5 named mirrors + globbed command stubs) · G (`--worktree` mirrors) · H (validation command roster, 5 sites + CI verbatim diff) · I (CAPABILITIES flag rows ↔ non-Claude triggers; 6 flags derived) · J (argument-hint ↔ documented flags) · K1/K2 (VISION.md citation labels) · **L (new at CORE-543 — `drift` CI job ↔ its six §7.1 sources, path-set comparison)** — **all 12 clean**, no drift found. Pair L's first release-gate run passes, and the seven drift-job steps were additionally executed directly against the working tree (see Testing Notes) since Step 6.1 could not observe a real CI run.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — markdown prose edits, mental-pass only (single-token version-string substitutions, stamp rewrites, and numeric ledger updates; no frontmatter or fenced blocks touched)

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

**Step 6.1 (CI status, new at CORE-543): not a literal pass — resolved by direct local execution.** `gh run list --commit $(git rev-parse HEAD)` returns no runs, because HEAD is **6 commits ahead of `origin/main`** — those commits have never been pushed, so GitHub has never seen them. Per the step's own wording, "no runs reported" is explicitly not a pass, and it is reported as such rather than skipped. The gap was then closed directly: all seven `drift`-job steps were executed against the working tree and pass, and the `validate` job's six commands are the standing gate above. The last pushed ancestor, `dfc3c15`, concluded `success`. The failure mode Step 6.1 exists to catch — an inherited red `main`, unread — is therefore affirmatively ruled out rather than assumed away.

CORE-542/543/551/552/545 each ran their own test pass in their own tasknotes; `/ft-release` does not re-run feature tests beyond this standing gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `/ft-audit docs ai-referenced` subroutine over the 18-doc set: **zero in-scope findings**. Pass 4 surfaced the README task counter, already fixed by the standing check that owns it (one fix, both). Passes 1/2/3/5 clean; health 9/10. All 12 §7.1 mirror pairs clean; 6 of 7 standing checks clean (README counter fixed inline; machine-global wiring not run — path-access guard, advisory-only, carried forward). One out-of-scope Pass 1 observation filed as [[CORE-554]].

- [x] Closed — every Acceptance criterion ticked once §7.5 lands (commit/tag/push); PLAN.md line flipped below; tasknote archived below.

- [x] **Evidence-based recap** drafted (see Final Summary below)

**Final Summary:**

Cut flowtron v5.26.0, a minor release headlined by CORE-551's unattended filing authority: `/ft-file-followup` gained a real `--unattended` mode so an operator-less closure can discharge the deferred-hand-off filing duty `SPEC.md` imposes on every closure — commit authority resting on the duty itself rather than an operator approval, with the filing-discipline cap, skip-on-dirt guard, explicit-pathspec staging and commit-never-push all binding exactly as they do attended. CORE-552 fixed the sibling parser hang in `/ft-epic-discovery`. The release machinery itself hardened: CORE-543 minted §7.1 **Pair L** (binding the `drift` CI job's six lifted checks to their §7.1 sources by path-set comparison) and Step 6.1 (a blocking CI-status gate), both filed because v5.25.0 was tagged on a commit whose own CI run concluded `failure` with nothing reading it. CORE-546–550 landed five doc-accuracy fixes including the stale Pair A grep that had reddened the badge; CORE-542 discharged the previous cut's SOP-currency finding; CORE-545 documented `viz/package.json`'s version as deliberately unmaintained. No required adopter-side edits — no new skill shipped and `templates/` is untouched, so the routine `/ft-update` bump carries everything. Standing validation gate passed clean (530 viz tests, 51 fleet-updater tests, typecheck + lint clean). Step 6.1 could not observe a CI run (HEAD 6 commits unpushed) and was resolved by executing all seven drift-job steps locally rather than skipped. Dogfood gate resolved widest in several cuts: Claude, Grok and Cursor all refreshed to v5.26.0; Codex skipped. SOP currency clean. Doc-drift sweep returned zero in-scope findings across the 18-doc set — the `--unattended` rollout reached five restating surfaces without a single inconsistency — with one out-of-scope frontmatter gap filed as CORE-554. Context budget: all surfaces under cap, but `SPEC/gates.md` now has 37 chars of headroom and `SPEC.md` 715, so the ratchet is effectively a hard stop for the next contract addition.

**Archived:** 2026-09-09
