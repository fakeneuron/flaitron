---
title: roster-onboarding-value
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-565, CORE-565.1, CORE-565.2, CORE-565.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - README.md
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
  - SPEC/versioning.md
  - claude/skills/ft-update/SKILL.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-new-project/SKILL.md
  - templates/tasknote-README.md
  - .flowtron/PLAN.md
blocked-by:
  - CORE-565.3
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-565.4 | roster-onboarding-value

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-565]] [[CORE-565.1]] [[CORE-565.2]] [[CORE-565.3]]

## 🎯 Goal

Give every shipped `ft-*` skill a keep / merge / demote verdict backed by archive evidence and `.2`'s cost table, walk the first-contact path (README Quickstart → `/ft-new-project` → first `/ft-task`, `docs/MIGRATION.md`, `/ft-flowtron`) as a new adopter and fix or file its gaps, and confirm the adopter snippet and SPEC rosters agree — skill removals filed, never executed here.

## ✅ Acceptance

- [x] Verdict per shipped skill (19 rows) with the evidence behind it — body size, first-shipped date, self-host real-run signature, adopter uptake — and a keep / merge / demote-to-doc call with a one-line reason — `judgment` (Discovery Notes §B; counts reproducible from the two scratch scripts recorded there)
- [x] Skill removals / merges / demotes **filed, not executed**: four decision rows land in PLAN.md and the shipped inventory and wiring roster are byte-unchanged — `grep -c 'CORE-57[0-3]' .flowtron/PLAN.md` ≥ 4; `ls claude/skills | grep -c '^ft-'` → 19; `grep -c '^ln -s' claude/AGENTS-snippet.md` → 24
- [x] Onboarding walked as a new adopter; each gap fixed in-window or filed — `judgment` (Discovery Notes §C lists the walk and the verdict per gap)
- [x] Global-install recipe creates the agent-home dirs before symlinking — `grep -c 'mkdir -p [~]/.claude/skills' README.md docs/MIGRATION.md` → 1 and 2
- [x] The "tasknote README records the pin" claim is gone from both surfaces that carried it, replaced by the submodule gitlink as the pin — `grep -c 'tasknote/README.md' SPEC/versioning.md` → 0; `grep -c 'for the pinned version' claude/AGENTS-snippet.md` → 0; `grep -q 'describe --tags' SPEC/versioning.md claude/AGENTS-snippet.md`
- [x] `/ft-update` Step 4.5 tests the skill **directory** for a symlink, not only the `SKILL.md` reached through it — `grep -q 'dirname' claude/skills/ft-update/SKILL.md`
- [x] Seeded tasknote README says the archive folder is created when the first tasknote in that area lands — `grep -q 'first tasknote in that area lands' templates/tasknote-README.md`
- [x] `/ft-flowtron` names the adopter-relative path for the adoption guide — `grep -q '.flowtron/core/docs/MIGRATION.md' claude/skills/ft-flowtron/SKILL.md`
- [x] Snippet and SPEC rosters agree: Pair E row coverage and the standing installed-surface derivation both diff empty, and the info-screen row count equals the shipped count — the two `diff -u` blocks from `claude/skills/ft-release/step-7.1-mirror-pairs.md` §Pair E and `step-7.1-standing-checks.md` → exit 0, no output; `test $(ls claude/skills | grep -c '^ft-') -eq $(grep -c '^| \`/ft-' claude/skills/ft-flowtron/SKILL.md)`
- [x] No adopter names or IDs in the contract surfaces this task edits — `grep -ci 'caobunga\|CBN-' SPEC/versioning.md claude/AGENTS-snippet.md templates/tasknote-README.md claude/skills/ft-update/SKILL.md` → 0
- [x] Budgets and hygiene — `wc -c claude/skills/ft-update/SKILL.md` < 33,000; `git diff --check` → 0

## 🧩 Subtasks

- [ ] Phase 1: measure the roster (sizes, ages, archive run signatures, caobunga uptake) — done, Discovery Notes §A–§B
- [ ] Phase 1: walk README Quickstart → `/ft-new-project` → `docs/MIGRATION.md` §1 → first `/ft-task` → `/ft-flowtron`; record gaps — done, §C
- [ ] Phase 2 (fixes, six): README + MIGRATION global-install `mkdir -p`; pin-location claim in `SPEC/versioning.md` + paste-block; `/ft-update` Step 4.5 dir-symlink test; template README archive-folder sentence; `/ft-flowtron` adopter path; `/ft-new-project` Step 6 stale README description
- [ ] Phase 2 (filings, four): CORE-570 starter→followup merge · CORE-571 goal-task demote · CORE-572 worktree pair demote-to-doc · CORE-573 ft-spec demote-to-template — decision rows, with the downstream-impact scan (CORE-569 is stale against CORE-571) surfaced for confirm before writing
- [ ] Phase 3: Acceptance greps, Pair E + installed-surface diffs, `git diff --check`, keyword clause
- [ ] Phase 4: doc-drift sweep (18 entries), Acceptance tick-through, stub flip nested under the epic, archive

## 🔗 Related

- [[CORE-EPIC-565]] — parent epic (harness-value-review)
- [[CORE-565.1]] — Discovery: Constitution #1/#2, Q2 (prose trims in-window; skill removals filed), Q7 (usage evidence = own archive + caobunga PLAN) bind this child
- [[CORE-565.2]] — cost table (§A) this child reuses; hand-off: `/ft-file-followup` ↔ `/ft-starter-task` skill↔skill duplication is a roster question
- [[CORE-565.3]] — blocked-by: Sequential predecessor (Fan-out); declared the caller-facing stable surfaces, which no verdict here touches (no probe path, template label, or grammar changes)
- [[CORE-349.5]] — related-decision: the installed-surface check is derived from the snippet's `ln -s` block; no hand-maintained roster exists to drift
- [[CORE-420.N]] — related-decision: Pair E (info-screen roster ↔ shipped skills) was minted after three flags went missing at once
- [[CORE-352.5]] — the only `/ft-spec` run on record (its own dogfood, 2026-07-12)
- [[CORE-485]] — the worktree pair's last substantive edit (`WT_ROOT` genericized); no run on record before or since

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The roster has never been judged on use: every prior roster task (Pair E, the installed-surface check, CORE-510's paste-block trim) checked that the lists *agree*, not that the skills *earn their slot*. The measurement is decisive — five of the twelve adopter-wired skills have no real run in 880 archived notes and none in the one adopter with 185 closed rows — and the onboarding walk found two contract claims a new adopter would act on that nothing implements (the README-records-the-pin claim; the global `ln -s` into a directory the recipe never creates). Scope matches the PLAN line; the one drift (the "Pair K" label) is a misattribution, not a scope change.

- [x] Read relevant source files — `README.md` (Quickstart, Sessions, Repo layout), `docs/MIGRATION.md` §1 in full, `claude/AGENTS-snippet.md`, `claude/skills/{ft-new-project,ft-flowtron,ft-file-followup,ft-starter-task}/SKILL.md`, `claude/skills/ft-update/SKILL.md` Step 4.5, `SPEC/layout.md` §"Skill namespace", `SPEC/versioning.md`, `SPEC/tasknote-selection.md` §routing, `docs/PLATFORMS.md` §"Installed-surface policy", `claude/skills/ft-release/step-7.1-{mirror-pairs,standing-checks}.md` (Pairs E, K; installed-surface derivation), `templates/{PLAN,tasknote-README}.md`, `docs/VISION.md` §"Who it's for". Two scratch scripts (usage signatures, roster checks) did the counting; their returns are §A–§B. caobunga (operator-approved this session, read-only): `.flowtron/` one level, `PLAN.md`, `sidequest/` one level, `.claude/skills/` one level.

- [x] **Best Practices Review** — `N/A`: markdown docs, one adopter paste-block, three skill bodies; no code boundary. The structural rule in play is the one `docs/PLATFORMS.md` and `step-7.1-standing-checks.md` already enforce — rosters are derived from the snippet's `ln -s` block, never hand-maintained — and every edit here keeps that (no roster is restated; no symlink is added or removed).

- [x] **Archive skim** — path greps on `docs/MIGRATION.md` (563 hits), `claude/AGENTS-snippet.md` (389) and the skill bodies return hundreds; the probe clause applied and the load-bearing subset was read directly (§D). `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`).

- [x] **Drift check** — §E. One misattribution on the PLAN line (Pair K), one stale sibling assumption (`.1` said "nineteen skills" — still 19), and two contract claims that nothing implements (§C G2, G6). No SPEC contract is contradicted by any fix; the filings change nothing until their own tasks run.

- [x] Asked clarifying questions — two (AskUserQuestion): caobunga read scope **approved** (`.flowtron/` one level + named files; `.claude/skills/` one level), evidence **not widened** beyond caobunga (Q7). Assumptions carried: (1) "demote-to-doc" means the procedure survives as a doc or template and the skill directory, command stub, Codex wrapper, and adopter symlinks go — a roster change, hence filed; (2) a skill younger than a month with at least one real run is "keep, young", not a demote candidate; (3) the six in-window fixes are prose corrections under Q2, none touching a `.3`-declared stable surface; (4) `/ft-flowtron`'s roster table is left to Pair E (it passes at HEAD) — no row is reworded here.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (nine paths)

**Discovery Notes:**

**Bar (`.1` Constitution #1 + `docs/VISION.md` §"Who it's for"):** a shipped skill earns its slot when a solo developer who is the agent's only reviewer *reaches for it* — evidence is a run signature in the archive or an adopter's plan, not a mention. A skill nobody invokes costs that developer a roster entry in every session's `/` menu (12 in an adopter, 19 here), two symlinks, a Codex wrapper, a roster row on three surfaces, and a release-gate pair to maintain. Mentions are not use: a note that *edits* `/ft-worktree-start` mentions it as surely as a note that runs it, so §A counts signatures a run leaves behind.

### A. Evidence method

| Signal | What it proves | Source |
|---|---|---|
| `## ✅ Recap` in an archived note | a real `/ft-micro-task` run | 880 notes, `grep -l` |
| `## 🔁 Iterations` | a real `/ft-goal-task` loop | same |
| `🌱 Starter context` | a starter that was filed **and** promoted | same |
| `## 🌳 Fan-out` / `🧭 Deep Pre-pass` / `*.N.md` | `/ft-epic-discovery` (+`--deep`) / `/ft-close-epic` | same |
| `wt-` in any ref, reflog, or commit message | a worktree ever created | `git log --all`, `git reflog` |
| `.flowtron/specs/`, `.flowtron/sidequest/`, `STATS.md` | `/ft-spec`, `--park`, `/ft-stats` writes | tree + `git log` |
| adopter `PLAN.md`: `.1`/`.N` rows, `Filed with starter`, `[unattended]`, pin-bump rows, `sidequest/` | adopter uptake per skill | caobunga, 185 closed rows since 2026-08-19 |

Shipped-inventory facts (HEAD): 19 skill dirs, 19 command stubs, 19 Codex wrappers; adopter subset 12 (snippet `ln -s` block, 24 lines); caobunga wires exactly those 12 plus one local skill.

### B. Roster verdicts (19)

| Skill | `SKILL.md` chars (dir) | Shipped | Real-run evidence, flowtron-self (880 notes) | caobunga (185 closed rows) | Verdict |
|---|---|---|---|---|---|
| `/ft-task` | 29,411 (115,822) | 2026-05-17 | the runner — 266 notes name it; every non-micro note is one | every row | **keep** |
| `/ft-micro-task` | 20,689 | 2026-05-17 | **113** `## ✅ Recap` notes, last 2026-09-09 | invisible in PLAN (no stub marker) | **keep** — the fast path that is actually taken |
| `/ft-epic-discovery` | 26,986 (63,404) | 2026-05-17 | 8 Fan-out + 6 `--deep` notes; 43 epics closed | 16 epics with `.1` | **keep** |
| `/ft-close-epic` | 27,050 (67,514) | 2026-05-17 | **43** `.N` audit notes | 16 `.N` rows | **keep** |
| `/ft-file-followup` (+`--park`) | 24,917 (+8,689) | 2026-05-17 | 4 "Filed by" rows open now; 130 notes name it | 1 `sidequest/` stub (`--park`) | **keep** — the largest fast-path body; its duplication with the starter filer is the merge question below |
| `/ft-starter-task` | 14,330 | 2026-05-17 | **6** promotions ever, last 2026-08-08 (3.5 months) | 0 `Filed with starter` | **merge → file [[CORE-570]]**: `/ft-file-followup --starter` — one filer, three weights; `.2`'s four duplicated paragraphs (area lookup, ID allocation, reconcile scan, pre-check/post-stage commit) become one |
| `/ft-goal-task` | 27,960 | 2026-07-02 | **0** `## 🔁 Iterations` in 10 weeks; 53 notes name it (all authoring/roster) | wired, 0 runs (its loop is its own runtime) | **demote → file [[CORE-571]]**: fold into `/ft-task --loop` so `SPEC/loop.md` (the contract) stays and the 28k body, `--worktree` (Pair G), the heartbeat template row, and two symlinks go — or retire outright; the row decides |
| `/ft-worktree-start` / `-end` | 12,008 / 12,598 | 2026-05-29 | **0** `wt-` refs, reflog entries, or commit messages; **0** merge commits in the repo's history | 0 (`worktree` absent from PLAN) | **demote-to-doc → file [[CORE-572]]**: `docs/WORKTREES.md` already carries the five locked decisions; the skills are `git worktree add` + `cp` wrappers nobody has run in 3.5 months across two repos |
| `/ft-spec` | 7,684 | 2026-07-12 | **1** spec ever — its own dogfood ([[CORE-352.5]], 2026-07-12); `.flowtron/specs/` untouched since | no `specs/` dir | **demote-to-template → file [[CORE-573]]**: `templates/spec-template.md` and the `SPEC/tasknote-selection.md` routing paragraph carry the value; the skill adds a slug, a stub, a wrapper, two symlinks, a roster row |
| `/ft-refactor` | 13,673 | 2026-08-23 | **1** real run — `FE-EPIC-94` scoped by `/ft-refactor viz/src/ui/App.tsx` (2026-08-24); 10 notes carry its characterization seeds | 0 | **keep, young** — 2.5 weeks, one run that produced a closed epic; re-judge at the next roster pass |
| `/ft-audit` | 25,051 (107,920) | 2026-05-17 | **81** release cuts each run `/ft-audit docs ai-referenced`; 15 archived PLAN rows | fork status not readable at the approved scope | **keep** — a release-gate dependency |
| `/ft-audit-repo` | 8,640 | 2026-06-10 | 2 "Repo Map" notes | global utility — not measurable at this scope | **keep** — cheap, first-contact, run before wiring; evidence thin, recorded as such |
| `/ft-audit-context` | 10,209 | 2026-05-24 | recommended by `/ft-new-project` Step 8 and MIGRATION §1.7; 4 Sep notes name it | global — not measurable | **keep** — cheap; the day-one context check |
| `/ft-stats` | 8,893 | 2026-05-18 | `STATS.md` present; regenerated output is gitignored since [[CORE-457.2]], so runs leave no trace | no `STATS.md` | **keep** — read-only, 9k, loaded only when asked; evidence structurally invisible |
| `/ft-new-project` | 11,425 | 2026-05-17 | the Quickstart entry | `CBN-001` adopted via `/ft-new-project` | **keep** |
| `/ft-update` | 16,095 | 2026-06-02 | adopter-only (bails here) | **3** pin bumps (`CBN-EPIC-14.2`, `CBN-127`, `CBN-139`); the last surfaced a Step 4.5 footgun (§C G5) | **keep + fix** |
| `/ft-flowtron` | 9,419 | 2026-05-17 | read-only screen, no trace; 74 notes name it | global — not measurable | **keep** — Pair E keeps its roster honest; one path fix (§C G7) |
| `/ft-release` | 30,619 (199,314) | 2026-05-17 | **81** release notes | n/a (self-only) | **keep** |

Totals: 14 keep (one with a fix, one young), 1 merge, 4 demote — every non-keep verdict is a filed decision row, and the shipped inventory does not change in this task (Q2).

### C. Onboarding walk — README Quickstart → `/ft-new-project` → `docs/MIGRATION.md` §1 → first `/ft-task` → `/ft-flowtron`

| # | Step a new adopter takes | Finding | Verdict |
|---|---|---|---|
| G1 | README "Once per machine": `git clone` then `ln -s … ~/.claude/skills/ft-new-project` | On a machine where Claude Code has never had a user-scope skill, `~/.claude/skills/` and `~/.claude/commands/` do not exist and both `ln -s` lines fail with "No such file or directory". The project-scoped block (`AGENTS-snippet.md` §wiring) starts with `mkdir -p`; the three global recipes (README, MIGRATION §1.0, §1.2.2 "Machine-global") never do | **fix** — one `mkdir -p` line in each of the three blocks |
| G2 | Paste-block bullet 12: "see … `.flowtron/tasknote/README.md` for the pinned version"; `SPEC/versioning.md`: "Each adopting project's `.flowtron/tasknote/README.md` records the currently-pinned flowtron version" | `templates/tasknote-README.md` carries no version line; `/ft-new-project` writes none; `/ft-update` updates none (grep: no `tasknote/README` in its body). The claim has been false since the template shipped — an adopter's doc-drift sweep found it stale this week and filed it on its own side, where it cannot be fixed. The pin *is* the submodule gitlink (`git -C .flowtron/core describe --tags`) and `.flowtron/core/SPEC.md`'s `**Version:**` line, which is what `/ft-flowtron` and `/ft-update` already read | **fix** — reword both surfaces; no new hand-maintained field (zero-scripts, no roster to drift) |
| G3 | `/ft-new-project` Step 0–8 | Preconditions, snippet-derived wiring, `CLAUDE.md` shim, explicit staging, snippet-derived verify — all sound. Step 6's description of the seeded README ("YAML frontmatter (`title`, `status`, …) and a spec-on-top + log-below body") is stale: the template lists the five tasknote variants and the archive-layout table `/ft-task` reads on every run | **fix** — one sentence |
| G4 | First `/ft-task CORE-001` in the fresh project | Step 2 area lookup finds the seeded table ✓; Phase 1 archive skim on an absent `archive/core/` is handled by the re-check rule ✓; Phase 4 moves the note into `archive/core/`, which does not exist yet — flowtron's own README says "the folder is created when the first tasknote in that area lands"; the seeded template does not | **fix** — one clause in the template (adopter-visible, lands with a release like any template edit) |
| G5 | Later: `/ft-update` bump | Step 4.5 says "regular file (not a symlink — `test ! -L <path>`)" for `.claude/skills/*/SKILL.md`. Every adopter skill *directory* is a symlink into the submodule; the `SKILL.md` reached through it is a regular file, so the test passes for all twelve wired skills and a literal reader classifies submodule-owned skills as local forks. Surfaced live on an adopter's third bump; not filed upstream (no hit for `test ! -L` under `.flowtron/`) | **fix** — test the directory too |
| G6 | `docs/MIGRATION.md` §1.0 table, §1.2 roster prose, §1.6 staging, §1.7 verify | §1.0 lists the same five global utilities as `docs/PLATFORMS.md`; §1.2 names the same twelve adopter skills as the snippet; §1.6/§1.7 derive from the snippet. No drift | no change |
| G7 | `/ft-flowtron` in an adopter | Version resolves from `.flowtron/core/SPEC.md` ✓; roster row count 19 = shipped 19 (Pair E passes at HEAD); "Adoption guide: `docs/MIGRATION.md`" and the Key-docs list give repo-root paths only — the Spec line already shows the adopter form | **fix** — add the adopter-relative path once |
| G8 | Seeded `PLAN.md` grammar comment vs the adopter's copy | caobunga's copy predates the `[unattended]` grammar comment — templates are copied at adoption, not symlinked, and [[CORE-500]] already records that as a known optional reconcile | no change — by design |

### D. Archive skim — load-bearing decisions

- [[CORE-565.1]] / [[CORE-565.2]] / [[CORE-565.3]] — read in full: the bar, Q2/Q7, the cost table (§A reuses its per-body sizes), the fast-path finding ("the two filing skills never load `SPEC.md`, which is what makes them cheap" — so the merge in [[CORE-570]] must keep that property), and the `.3` stable-surface list (nothing here touches a probe path, template label, or grammar).
- [[CORE-349.5]] (via `docs/PLATFORMS.md` §"Installed-surface policy") — the adopter subset is *derived* from the snippet's `ln -s` block; §1.6, `/ft-new-project` Steps 7–8, and the standing check restate no roster. Every fix here preserves that; the four filings would each edit the block first and regenerate the three platform blocks by substitution.
- [[CORE-420.N]] (via Pair E) — the info-screen roster went stale three flags at once before the pair existed; Pair E now diffs it bidirectionally at release, so this task does not re-verify rows by hand.
- [[CORE-439]] (via `docs/PLATFORMS.md` §"One canonical install path") — globbing the inventory into an agent home doubles the roster; the G1 fix adds `mkdir -p`, not more installs.
- [[CORE-485]] — the worktree pair's `WT_ROOT` was genericized and the approach ratified on the operator's call; the note records no run, only edits — consistent with the zero-`wt-` finding.
- [[CORE-500]] — templates are copied at adoption; a template edit (G4) reaches existing adopters only as an optional reconcile.
- [[CORE-352.5]] — `/ft-spec`'s one run; "first-ever specs-dir write" on 2026-07-12 is also the last.
- [[CORE-457.2]] — `STATS.md` gitignored as regeneratable, which is why `/ft-stats` runs leave no git trace.
- [[CORE-510]] — the paste-block names skills and points at `SPEC/tasknote-selection.md`; the G2 reword keeps that shape (one clause, one pointer).

### E. Drift check

- **PLAN line "(Pair K)".** Pair K guards `docs/VISION.md` no-runtime mirror *labels* (K1 citations, K2 pointers) — not rosters. The roster-agreement guards are **Pair E** (info-screen roster ↔ shipped skills, bidirectional) and the **standing installed-surface check** (snippet `ln -s` block ↔ `docs/PLATFORMS.md` policy, derived). Both run in Phase 3 as the Acceptance verify commands; both pass at HEAD. Misattribution recorded; the acceptance ("rosters agree") is unchanged, so no re-scope.
- **`.1` spec "nineteen `ft-*` skills"** — 19 at HEAD ✓ (dirs, stubs, Codex wrappers all 19; parity check passes).
- **`.2` hand-off** — `/ft-file-followup` 24,917 + 8,689 and the four duplicated paragraphs reproduce at HEAD (Steps 1, 1a, 3, 4 vs `/ft-starter-task` Steps 1, 1a, 3, 4–5).
- **Contract claims falsified by the walk:** `SPEC/versioning.md:21-22` and the paste-block's last bullet (G2) — corrected here, not superseded-pointered (neither is an archived tasknote). `ft-update/SKILL.md:96` (G5) — a skill body, corrected in place.
- **No SPEC contradiction.** `SPEC/layout.md` §"Skill namespace" lists 19 names and stays as-is (removals are filed); `docs/CONTEXT-BUDGET.md` caps are untouched (largest edited body is `ft-update` at 16k against the 33k glob cap).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — every fix extends a shape already on its surface: the global-install blocks gain the same `mkdir -p` line the project-scoped snippet block opens with; the pin claim now points at the gitlink the way `/ft-update` Step 3 and `/ft-flowtron` Step 0 already read it; the template README sentence mirrors flowtron's own README §"Archive layout"; the filed rows use the 565.2 cohort shape (`[model]🧠 | shortname — … Filed by CORE-565.4.`). No new shape.

- [x] **Minimal refactor gate** — no refactor. Nine prose edits, each a correction or one added line in the touched path; no roster restated, no symlink added or removed, no `.3` stable surface touched.

- [x] Implemented the minimal solution — 9 files, all markdown

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; no code surface). Pair E and the installed-surface derivation run in Phase 3 as the roster checks.

**Implementation Notes:**

**Fixes (six, in-window).** `README.md` Quickstart + `docs/MIGRATION.md` §1.0 and §1.2.2 "Machine-global": `mkdir -p ~/.claude/skills ~/.claude/commands` ahead of the global `ln -s` lines (§1.0 says why in one clause). `SPEC/versioning.md` + `claude/AGENTS-snippet.md` paste-block last bullet: the pin is the submodule gitlink (`git -C .flowtron/core describe --tags`) and `.flowtron/core/SPEC.md`'s `**Version:**` line; the false "tasknote README records it" claim is gone from both — no new hand-maintained field. `claude/skills/ft-update/SKILL.md` Step 4.5: the fork scan tests the skill *directory* for a symlink as well as the file, with one sentence saying why the file test alone misclassifies every wired skill. `templates/tasknote-README.md` §"Archive layout": the folder is created when the first tasknote in that area lands. `claude/skills/ft-flowtron/SKILL.md`: adopter-relative path for the adoption guide and the `docs/` list. `claude/skills/ft-new-project/SKILL.md` Step 6: the seeded-README description now matches what the template ships.

**Filings (four, decision rows — Q2).** [[CORE-570]] starter→followup merge (Medium), [[CORE-571]] goal-task demote (Medium), [[CORE-572]] worktree pair demote-to-doc (Medium), [[CORE-573]] ft-spec demote-to-template (Low). Each row carries its evidence line from §B so the deciding task needs no re-measurement. **Downstream-impact scan:** active entries are the 565 cohort and [[CORE-566]]–[[CORE-569]]. [[CORE-569]] (trim `/ft-goal-task`'s closure restatement) is **stale** against [[CORE-571]] (may demote the skill) → reconcile action **edit**: `Blocked by [[CORE-571]]` appended, operator-confirmed. [[CORE-566]]/[[CORE-567]]/[[CORE-568]] unaffected; [[CORE-572]] names its `--worktree` coupling to [[CORE-571]] in prose rather than a Blocked-by (the two decisions are independent; only the flag's fate is shared). Word counts after ` — `: 570 = 47 · 571 = 49 · 572 = 48 · 573 = 44 (all ≤ 50 target; each carries its evidence line).

**Not done, on purpose.** No `/ft-flowtron` roster rows reworded (Pair E passes; the rows are release-guarded). No edit to `SPEC/layout.md` §"Skill namespace", `docs/PLATFORMS.md`, or the three platform snippets — the inventory is unchanged until a filed decision executes. No `docs/CONTEXT-BUDGET.md` edit (caps untouched). No template restructuring beyond the one sentence. No caobunga edit — the adopter's own `CBN-150` (stale pin pointer) closes on its next `/ft-update`, since the paste-block it copied is now correct upstream.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown only; `viz/` and `tools/` untouched)

- [x] Ran lint/type-check on changed code — N/A; substituted `git diff --check`, the Acceptance greps, and the two release-gate roster diffs below

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A, no rendered surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
grep -c 'CORE-57[0-3]' .flowtron/PLAN.md                                      → 5 (4 rows + the CORE-569 Blocked-by)
ls claude/skills | grep -c '^ft-'                                             → 19 (unchanged)
grep -c '^ln -s' claude/AGENTS-snippet.md                                     → 24 (unchanged)
grep -c 'mkdir -p [~]/.claude/skills' README.md docs/MIGRATION.md             → 1 · 2
grep -c 'tasknote/README.md' SPEC/versioning.md                               → 0
grep -c 'for the pinned version' claude/AGENTS-snippet.md                     → 0
grep -q 'describe --tags' SPEC/versioning.md claude/AGENTS-snippet.md         → 0
grep -q 'dirname' claude/skills/ft-update/SKILL.md                            → 0
grep -q 'first tasknote in that area lands' templates/tasknote-README.md      → 0
grep -q '.flowtron/core/docs/MIGRATION.md' claude/skills/ft-flowtron/SKILL.md → 0
Pair E row-coverage diff (step-7.1-mirror-pairs.md)                           → 0, empty
installed-surface derivation diff (step-7.1-standing-checks.md)               → 0, empty
test <shipped count> -eq <info-screen row count>                              → 0 (19 = 19)
grep -ci 'caobunga\|CBN-' <4 edited contract surfaces>                        → 0 / 0 / 0 / 0
wc -c ft-update · ft-flowtron · ft-new-project SKILL.md                       → 16,460 · 9,547 · 11,337 (glob cap 33,000)
git diff --check                                                              → 0
git diff | grep -cE 'API_KEY|SECRET|TOKEN|PASSWORD'                           → 0 (keyword clause clear)
new-row word counts after ' — ' (570 · 571 · 572 · 573)                       → 47 · 49 · 48 · 44
new rows match the task-line grammar (glyph-then-shortname shape)             → 4 / 4
```

**Structural assertions (changed prose):** no duplication — the `mkdir -p` line is the same one the project-scoped block already opens with, restated on the three global recipes that lacked it; the pin sentence names one source (the gitlink) on both surfaces instead of a phantom third. No dead prose: the removed claim had no implementation to orphan. No public-surface growth: no new heading, key, flag, cue, skill, or symlink — the four filings are decisions, and the inventory is byte-identical (19 / 24). No stale code-facing docs: `ft-update` Step 4.5's new test is stated once with its reason; `/ft-new-project` Step 6 now describes the template it copies.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  `README.md` **deliverable** (Quickstart `mkdir -p`) · `AGENTS.md` no change (self-host guide; roster names unchanged; the pin bullet is adopter-only) · `SPEC.md` no change (§"Versioning" is a pointer; the module changed) · `docs/MIGRATION.md` **deliverable** (§1.0, §1.2.2) · `claude/AGENTS-snippet.md` **deliverable** (paste-block pin bullet; `ln -s` block untouched) · `codex/AGENTS-snippet.md` no change (derives the wiring block, which did not change; carries no pin claim) · `cursor/AGENTS-snippet.md` no change · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change (no `claude/` path newly named from the contract layer; `SPEC/versioning.md` names `.flowtron/core/SPEC.md`, contract-side) · `docs/PLATFORMS.md` no change (policy table unchanged until a filed decision executes) · `claude/CAPABILITIES.md` no change (no flag changed) · `docs/AGENT-COMPAT.md` no change · `docs/EXTERNAL-AGENTS.md` no change (no stable surface touched) · `docs/WORKTREES.md` no change (CORE-572 is a decision row) · `docs/VISION.md` no change — **18 / 18**, three deliverables.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Judged every shipped skill on whether anyone reaches for it, and walked the first-contact path as a stranger would. The roster splits cleanly: fourteen skills earn their slot on run evidence — `/ft-micro-task` alone has 113 real runs, `/ft-close-epic` 43 audits, `/ft-release` 81 cuts, and the one adopter measured drove 185 closures through `/ft-task`, the epic bookends, `/ft-new-project`, and three `/ft-update` bumps — while five have no real run anywhere: `/ft-goal-task` (zero `## 🔁 Iterations` in ten weeks), the worktree pair (no `wt-` branch has ever existed in this repo or the adopter's), `/ft-spec` (one spec, its own dogfood), and `/ft-starter-task` (six promotions in four months, none adopter-side). Per the epic's Q2, those five became four filed decision rows ([[CORE-570]]–[[CORE-573]]) rather than edits — the inventory and the wiring roster are byte-identical, and `/ft-refactor` (2.5 weeks old, one real run) is kept young.

The onboarding walk found what a roster-agreement check cannot: two contract claims nothing implements. The global-install recipe on all three surfaces symlinked into `~/.claude/skills/` without ever creating it, and both `SPEC/versioning.md` and the adopter paste-block said the tasknote README "records the pinned version" when no template, bootstrap, or bump has ever written one — an adopter's own doc-drift sweep hit that this week and filed it where it could not be fixed. Both are corrected at the source (the pin is the submodule gitlink; nothing restates it). Three smaller gaps closed in place: `/ft-update` Step 4.5 tested only the `SKILL.md` for a symlink and so read every wired skill as a local fork (surfaced live on the adopter's third bump, unfiled upstream); the seeded README never said the archive folder is created on the first landing; `/ft-flowtron` and `/ft-new-project` each carried one stale line. The rosters agree: Pair E and the installed-surface derivation both diff empty, and the PLAN line's "(Pair K)" is recorded as a misattribution (K guards VISION mirror labels; E and the standing check guard rosters).

**Doc-drift sweep:** 18 / 18 walked; `README.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md` are deliverables; the other fifteen unchanged with reasons above.

**Hand-off to `.N`:** the three verdict tables share one bar — `.2` §B (keep/trim per gate), `.3` §E (declare/out-of-contract per caller surface), this §B (keep/merge/demote per skill) all measure cost to the solo reviewer against a mistake caught or a decision preserved; no verdict here touches a `.3`-declared stable surface, and no `.2` trim is contradicted (the two `SPEC/versioning.md` sentences replaced were not in `.2`'s trim set). Open after this task: [[CORE-570]]–[[CORE-573]] decide the roster; [[CORE-569]] now waits on [[CORE-571]].

**Evidence.** 9 deliverable files, +21/−8 lines: `README.md` +1, `docs/MIGRATION.md` +3/−1, `SPEC/versioning.md` +4/−2, `claude/AGENTS-snippet.md` +1/−1, `claude/skills/ft-update/SKILL.md` +3/−1, `claude/skills/ft-flowtron/SKILL.md` +1/−1, `claude/skills/ft-new-project/SKILL.md` +1/−1, `templates/tasknote-README.md` +2, `.flowtron/PLAN.md` +5/−1 (four rows + one Blocked-by); plus this tasknote. Verification in Testing Notes: 11 / 11 Acceptance commands green, both release-gate roster diffs empty, 19 = 19, `git diff --check` clean, keyword clause clear, no adopter names in contract prose. `touches:` reconciliation: declared 9 paths; `git diff --name-only` shows exactly those 9 (this tasknote excluded by construction) — **no undeclared paths**. Maintainability effect: a first-time adopter's three shell blocks now run on a clean machine; two contract surfaces stop asserting a field nobody writes; the bump skill's fork scan stops misreading every wired skill; and the roster's five unused entries have evidence-carrying decision rows instead of a verdict buried in a tasknote.

**Archived:** 2026-09-10
