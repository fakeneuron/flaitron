---
title: starter-followup-merge
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.4, CORE-571, CORE-572, CORE-573, CORE-391]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - claude/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-file-followup/starter-mode.md
  - claude/skills/ft-file-followup/park-mode.md
  - claude/commands/ft-file-followup.md
  - codex/skills/ft-file-followup/SKILL.md
  - claude/skills/ft-starter-task/SKILL.md
  - claude/commands/ft-starter-task.md
  - codex/skills/ft-starter-task/SKILL.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - AGENTS.md
  - claude/CAPABILITIES.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-spec/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/commands/ft-task.md
  - claude/commands/ft-micro-task.md
  - claude/commands/ft-epic-discovery.md
  - claude/commands/ft-close-epic.md
  - claude/commands/ft-new-project.md
  - claude/commands/ft-release.md
  - claude/commands/ft-spec.md
  - SPEC.md
  - SPEC/layout.md
  - SPEC/starter.md
  - SPEC/tasknote-selection.md
  - docs/PLATFORMS.md
  - docs/MIGRATION.md
  - docs/GLOSSARY.md
  - docs/AGENT-NEUTRALITY.md
  - templates/tasknote-README.md
  - templates/spec-template.md
  - .flowtron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-570 | starter-followup-merge

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-565.4]] [[CORE-571]] [[CORE-572]] [[CORE-573]]

## 🎯 Goal

Decide whether `/ft-starter-task` folds into `/ft-file-followup --starter` — one filer with three weights (PLAN line / `--park` stub / starter body) — and, if so, execute the merge while preserving the no-`SPEC.md`-load property of both filers.

## ✅ Acceptance

- [x] Decision recorded: merge into `/ft-file-followup --starter` (not keep, not retire), `--starter` × `--unattended` refused like `--park` — `judgment` (operator-confirmed via AskUserQuestion; the transcript is the receipt)
- [x] `claude/skills/ft-file-followup/starter-mode.md` exists, carries the starter delta (starter-template write, `## 🌱 Starter context` draft, `Filed with starter at` suffix, >70w override, two-path `chore: file <ID> starter` commit, promotion hand-off), and the host Step 0 loads it only when `--starter` is passed — `grep -q 'starter-mode.md' claude/skills/ft-file-followup/SKILL.md && test -f claude/skills/ft-file-followup/starter-mode.md`
- [x] Three runner paths deleted: `claude/skills/ft-starter-task/`, `claude/commands/ft-starter-task.md`, `codex/skills/ft-starter-task/` — `! test -e claude/skills/ft-starter-task && ! test -e claude/commands/ft-starter-task.md && ! test -e codex/skills/ft-starter-task`
- [x] No live `ft-starter-task` reference remains outside the archive, `docs/VERSION-HISTORY.md`, `PLAN-ARCHIVE.md`, `.flowtron/specs/`, the release-refreshed `docs/CONTEXT-BUDGET.md` ledger, and the three history sites (`docs/MIGRATION.md` retired-skills row; `step-7.1-mirror-pairs.md` Pair F history line; `claude/CAPABILITIES.md` ledger note naming the replaced invocation) — `grep -rn --exclude-dir=archive --exclude-dir=.git --exclude-dir=node_modules 'ft-starter-task' . | grep -v -e 'VERSION-HISTORY' -e 'PLAN-ARCHIVE' -e '.flowtron/specs/' -e 'CONTEXT-BUDGET.md' -e 'MIGRATION.md.*| `ft-starter-task` |' -e 'mirror-pairs.md:97:' -e 'CAPABILITIES.md.*it replaced' -e 'tasknote/archive/core/CORE-570.md' -e 'PLAN.md.*CORE-570'` prints nothing
- [x] The starter *shape* is untouched: `SPEC/starter.md` changes only its lifecycle step 1 invocation, `templates/tasknote-starter-template.md` and `/ft-task` Step 3a are byte-unchanged — `git diff --quiet -- templates/tasknote-starter-template.md claude/skills/ft-task/step-3a-promote-starter.md && grep -q 'ft-file-followup \[ID\] --starter' SPEC/starter.md`
- [x] Neither filer loads `SPEC.md`: the host and both fragments Read only `SPEC/` modules — `! grep -nE 'Read (`<SPEC>`|`SPEC\.md`|SPEC\.md)' claude/skills/ft-file-followup/SKILL.md claude/skills/ft-file-followup/starter-mode.md claude/skills/ft-file-followup/park-mode.md` (the `SPEC=` path line and "treat SPEC.md as authoritative" are citations, not loads)
- [x] Release-gate pairs pass with the new flag: Pair B (Codex twin names `--starter`), Pair E (`ft-flowtron` row), Pair I (three non-Claude trigger rows), Pair J + M (stub `argument-hint:` ↔ skill `description:`), the four-way snippet `ln -s` roster diff, and the shipped-skill parity check — run each `sh` block from `step-7.1-mirror-pairs.md` / `step-7.1-standing-checks.md`; all print nothing
- [x] `claude/skills/ft-file-followup/SKILL.md` stays under the 33,000-char cap — `test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 33000`
- [x] `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" gains an `ft-starter-task` row — `grep -q '| `ft-starter-task` |' docs/MIGRATION.md`
- [x] Roster counts agree at 15 on every surface that states one — `test $(ls claude/skills | grep -c '^ft-') -eq 15 && grep -q '15 `.md` slash-command stubs' docs/PLATFORMS.md && grep -q '15 `SKILL.md` skill bodies' docs/PLATFORMS.md`
- [x] `git diff --check` → 0

## 🧩 Subtasks

- [ ] Write `starter-mode.md` (delta-overlay fragment: Steps S2–S5 keyed to the host's Steps 2–5)
- [ ] Host `SKILL.md`: Step 0 parse `--starter` + marker + two flag-conflict stops (`--park`, `--unattended`); Step 2 >70w gate → escalate to `--starter`; Step 3/4/5 fragment pointers; Notes routing; `description:` clause
- [ ] Command stub + Codex wrapper: `description:` / `argument-hint:` / body name `--starter`
- [ ] Delete the three `ft-starter-task` runner paths + the two gitignored repo-local symlinks
- [ ] Sweep rosters: AGENTS.md, four `AGENTS-snippet.md`, `ft-flowtron` row, `SPEC/layout.md` slug list, `docs/PLATFORMS.md` (rosters, tree, 16→15), `docs/MIGRATION.md` (§1.2 + retired row)
- [ ] Sweep routing prose: `SPEC.md` §Post-closure, `SPEC/starter.md`, `SPEC/tasknote-selection.md`, `CAPABILITIES.md` (+ three PLATFORMS trigger rows), GLOSSARY, AGENT-NEUTRALITY, `park-mode.md`, templates, six sibling skill bodies, seven command-stub see-also lines, Pair C template row + Pair J example
- [ ] Phase 3: Acceptance commands + release-pair blocks; Phase 4: doc-drift sweep, closure

## 🔗 Related

- [[CORE-565.4]] — filed this task (roster-onboarding-value pass of the harness-value-review epic); carries the evidence counts
- [[CORE-391]] — related-decision: the `/ft-sidequest` → `/ft-file-followup --park` fold; the `park-mode.md` lazy-fragment shape and the Step 0 unordered-flag-set grammar this task extends
- [[CORE-571]] — sibling demote decision from the same filing batch (goal-task-demote), precedent for the sweep shape (rosters, pairs, retired-skills row)
- [[CORE-572]] — sibling demote decision (worktree-pair-demote), same
- [[CORE-573]] — sibling open decision (ft-spec-demote); shares the roster / wrapper / symlink surface this task edits

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The evidence on the PLAN line reproduces at HEAD (6 promotions, last 2026-08-08; 0 adopter `Filed with starter` rows; four steps duplicated verbatim), and the fold shape has three precedents (`/ft-sidequest` → `--park` [[CORE-391]], `/ft-debug` → `--debug`, `/ft-goal-task` → `--loop` [[CORE-571]]). The starter *shape* is load-bearing elsewhere (`/ft-refactor` writes child starters from the template; `/ft-task` Step 3a promotes them) and is not in question — only the filer is. Scope matches the PLAN line; no re-scope.

- [x] Read relevant source files — both skill bodies, `park-mode.md`, both command stubs, both Codex wrappers, `SPEC/starter.md`, `SPEC/tasknote-selection.md` §routing + §"Filing commits", `SPEC.md` §"Post-closure protocol", `claude/CAPABILITIES.md`, `docs/PLATFORMS.md` (rosters + non-Claude trigger tables), `step-7.1-mirror-pairs.md` (Pairs B, C, E, F, I, J, M), `docs/MIGRATION.md` §"Retired skills", `SPEC/layout.md` §"Skill namespace", the four `AGENTS-snippet.md` `ln -s` blocks, `docs/CONTEXT-BUDGET.md` §caps. A repo-wide grep enumerated every live `ft-starter-task` mention (40 files; §B below).

- [x] **Best Practices Review** — markdown skill bodies; no code boundary. The structural rule in play: the host `/ft-file-followup` SKILL owns the four shared filing steps (ID suggestion, pre-flight, reconcile scan + review gate, pre-check + post-stage commit) and a mode fragment carries only its delta. `park-mode.md` *replaces* Steps 2–5 (a distinct contract); `starter-mode.md` will *overlay* them (same contract, different artifact + suffix + commit message) — the `--debug` shape from `/ft-task`, not the `--park` one. In-scope refactor: none beyond the fold itself; the host body's >70w gate flips from "recommend the other skill" to "re-invoke with `--starter`".

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Path greps: `ft-starter-task/SKILL.md` 16 hits, `ft-file-followup/SKILL.md` 26; the probe clause applied and the load-bearing subset was read directly (§C). No `supersedes:` or ⚠️ pointers on the hits.

- [x] **Drift check** — §D. PLAN-line facts hold at HEAD. One count drifted upstream of this task: the roster is 16 (not 19) after [[CORE-571]] / [[CORE-572]], so this task lands 16 → 15. No SPEC contradiction: `SPEC/starter.md` names the filer only in lifecycle step 1; `SPEC.md` names `/ft-starter-task` once (post-closure next-skill list) and that entry was already inconsistent with the 👇 context-dependent rule it sits next to — the merge resolves it.

- [x] Asked clarifying questions — two (AskUserQuestion): verdict **merge → `--starter`** (not keep, not retire); `--starter` × `--unattended` **refused** like `--park`. Assumptions carried: (1) `--starter` × `--park` is also refused (two artifact shapes); (2) `docs/CONTEXT-BUDGET.md` §Ledger is left to the release re-measure, per the [[CORE-571]] precedent; (3) `.flowtron/specs/spec-to-work-handoff.md` is a historical spec and stays as written; (4) the retired-skills row cites `v5.27.0`, the next cut, matching the two sibling rows.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (39 paths)

**Discovery Notes:**

### A. Design — `--starter` as a delta overlay

| Host step | Default flow | `--starter` overlay (fragment) |
|---|---|---|
| 0 | parse flags | + `starter-mode = true`, marker `🌱 --starter active — …`; refuse `--park` and `--unattended` combinations terminally |
| 1 / 1a | suggest ID; pre-flight | unchanged (owned by host) |
| 2 | five fields; >70w → STOP | title / priority / model / long description; >70w is **not** a stop — record "Why the line couldn't be trimmed" in the body (the old skill's override) |
| 3 | paragraph + reconcile scan + review | `## 🌱 Starter context` body draft (per `SPEC/starter.md` + template sub-headings) **replaces** the paragraph; scan + review gate unchanged |
| 4 | pre-check → PLAN line → commit one path | pre-check → `cp` starter template + fill → PLAN line **with** `Filed with starter at …` suffix → commit **two** paths, `chore: file <ID> starter — <shortname>` |
| 5 | hand-off | starter wording: file path, PLAN entry, "sits until `/ft-task <ID>` promotes it (Step 3a)" |

Fragment loads `SPEC/starter.md` (lazy module) — the host still never loads `SPEC.md`, so the fast-path property [[CORE-565.2]] measured survives. Budget: host 24,917 + ~1.6k ≈ 26.5k (cap 33,000); fragment ≈ 7k; net inventory −14,330 −1,297 −342 + fragment.

### B. Sweep inventory (live `ft-starter-task` mentions, 40 files)

Runner: `claude/skills/ft-starter-task/SKILL.md`, `claude/commands/ft-starter-task.md`, `codex/skills/ft-starter-task/SKILL.md` (delete). Rosters: `AGENTS.md:17`, `claude/AGENTS-snippet.md:19,93,99`, `codex/AGENTS-snippet.md:37`, `cursor/AGENTS-snippet.md:52`, `grok/AGENTS-snippet.md:56`, `claude/skills/ft-flowtron/SKILL.md:46`, `SPEC/layout.md:93`, `docs/PLATFORMS.md:35,74,197,205,262-263,267`, `docs/MIGRATION.md:63` (+ retired row). Contract prose: `SPEC.md:674`, `SPEC/starter.md:40`, `SPEC/tasknote-selection.md` ×13, `claude/CAPABILITIES.md:34` (+ new row; + 3 PLATFORMS trigger rows for Pair I), `docs/GLOSSARY.md:67`, `docs/AGENT-NEUTRALITY.md:39`, `templates/tasknote-README.md:18`, `templates/spec-template.md:46`. Sibling skills: `ft-file-followup/SKILL.md` ×8, `park-mode.md` ×2, `ft-epic-discovery` ×2, `ft-spec` ×3, `ft-micro-task` ×3, `ft-refactor` ×1. Stubs (see-also lines): `ft-task`, `ft-micro-task`, `ft-epic-discovery`, `ft-close-epic`, `ft-new-project`, `ft-release`, `ft-spec`, `ft-file-followup` ×3. Release gate: `step-7.1-mirror-pairs.md:46` (Pair C template row → `/ft-file-followup --starter`), `:197` (Pair J foreign-slug example names `ft-starter-task.md` as a live stub → re-point), `:97` (Pair F history — leave). Left alone: `docs/CONTEXT-BUDGET.md:129` (release-refreshed ledger), `.flowtron/specs/`, `PLAN-ARCHIVE.md`, `VERSION-HISTORY.md`.

### C. Archive skim — load-bearing decisions

- [[CORE-391]] sidequest-fold — the fragment is *longer* than the retired skill because it must say which host behaviors it overrides; Step 0 became an unordered flag set with unrecognized-`--` routing to a usage notice; a single Step 0 dispatch because park *replaces* the flow. The starter overlay differs: it augments, so the fragment is keyed to host steps (`--debug`'s shape) and needs no replacement dispatch.
- [[CORE-565.2]] / [[CORE-565.4]] — "the two filing skills never load `SPEC.md`, which is what makes them cheap"; the four duplicated paragraphs (Steps 1, 1a, 3, 4–5) named as the merge's target.
- [[CORE-571]] — the sweep shape this task copies: runner triple deleted, snippet `ln -s` lines dropped, `ft-flowtron` row folded into the survivor's row, retired-skills row with the replacement invocation, Pair example re-pointed, repo-local dangling symlinks `rm`'d so the self-wiring check passes, CONTEXT-BUDGET ledger left to the release re-measure.
- [[CORE-399]] / [[CORE-433.2]] / [[CORE-460.2]] (via Pair F, J) — flag rosters drift on prose surfaces nobody greps; every new flag lands on stub `argument-hint:` + `description:`, skill `description:`, Codex `description:`, `ft-flowtron` row, CAPABILITIES row + three PLATFORMS trigger rows, or a release pair fails.
- [[CORE-359.3]] (via `park-mode.md` §Notes) — orphan sidequest stub after promotion; the promotion pointer `/ft-starter-task <ID>` ("expand context") in that Notes list becomes `/ft-file-followup --starter <ID>`.

### D. Drift check

- PLAN line: "6 promotions in 880 archived notes since 2026-05-17, last 2026-08-08; adopter uptake 0; four paragraphs duplicated" — all reproduce (§B of [[CORE-565.4]]; 883 archived notes at HEAD, same six). "Must keep the no-`SPEC.md`-load property" — the host's only `SPEC.md` mentions are the path line and the "authoritative when silent" citation; no Read. Preserved by design (§A).
- Roster count: PLAN row was filed at 19; HEAD is 16 (`ls claude/skills | grep -c '^ft-'`) after the two sibling demotes. This task lands 15. `docs/PLATFORMS.md:262,267` say 16 today.
- `SPEC.md:674` lists `/ft-starter-task` (filing-only) as a post-closure next-skill while `:676` says `/ft-file-followup` "in either mode" is context-dependent (👇). A starter draws on conversation context exactly as a follow-up does, so the old entry contradicted the rule beside it; after the fold the list drops the entry and `:676` reads "in any mode".
- No archived-tasknote factual claim is falsified → no ⚠️ pointer.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — flag + lazy fragment on the survivor, the shape `park-mode.md` ([[CORE-391]]) and `step-5-loop-mode.md` ([[CORE-571]]) already established; the overlay variant (fragment keyed to host steps rather than replacing them) is `step-4-debug-mode.md`'s shape. Sweep and retired-row shapes copied from [[CORE-571]]. No new shape.

- [x] **Minimal refactor gate** — the fold *is* the refactor: four duplicated steps collapse to one host copy. Nothing else touched; the >70w gate's wording flips only its destination.

- [x] Implemented the minimal solution — 37 deliverable files (3 deleted, 1 added, 33 edited), all markdown; PLAN.md + this note on top at closure

- [x] Updated/added tests for non-trivial behavior — N/A (markdown; the release-gate pair blocks run in Phase 3 as the roster checks)

**Implementation Notes:**

**The fragment.** `claude/skills/ft-file-followup/starter-mode.md` (7,549 chars vs the deleted skill's 14,330) carries only the starter delta as Steps S1–S5 keyed to the host's Steps 1–5: the `<SPEC_DIR>/starter.md` Read, the >70w override (`### Why the line couldn't be trimmed`), the `## 🌱 Starter context` body in place of the paragraph, the starter-template `cp` + fill before the PLAN line, the `Filed with starter at …` suffix, the two-path `chore: file <ID> starter` commit with the host's post-stage verification applied to both paths, no paragraph, and the promotion hand-off. It is an **overlay**, not a replacement: everything `park-mode.md` has to say it bypasses (collection, review gate, reconcile scan, hand-off), starter mode keeps — which is what makes it shorter than the park fragment despite the heavier artifact. The Notes carry the retired skill's "proactive invocation on cross-session handoff" paragraph, the one piece of routing guidance with no other home.

**Host body.** +3,091 chars (24,917 → 28,008; cap 33,000): `description:` clause (Pair M), Step 0 path line gains `SPEC_DIR` + the starter template, `starter-mode` in the flag walk + usage line, two flag-conflict stops (`--starter` × `--unattended` in the existing `⏸ --unattended stop` shape; `--starter` × `--park` as a plain `⏸ stop`), the load-and-overlay paragraph with its `🌱` marker, Step 1a note, Step 2 >70w gate re-pointed at `--starter` (attended) with the unattended over-cap stop naming an attended `--starter` filing, Step 3/4/5 one-line overlay pointers, Notes routing ("one filer, three weights"). Default flow byte-identical in behavior.

**Sweep (33 edited files).** Deleted: `claude/skills/ft-starter-task/SKILL.md`, `claude/commands/ft-starter-task.md`, `codex/skills/ft-starter-task/SKILL.md`; the two gitignored repo-local symlinks `rm`'d so the self-wiring check passes. Rosters: `AGENTS.md` (peer list; `--starter` beside the park flags), four `AGENTS-snippet.md` (`ln -s` lines dropped; `claude/` bullet 19 reworded), `ft-flowtron` (row dropped; `--starter` clause folded into the `/ft-file-followup` row — Pair E), `SPEC/layout.md` slug list, `docs/PLATFORMS.md` (Claude roster "Eight" → "Seven", policy table, scaffold tree, 16 → 15 stubs / bodies, the Codex wrapper count that had sat at 19 through both sibling demotes → 15, three non-Claude `--starter` trigger rows — Pair I), `docs/MIGRATION.md` (§1.2 roster prose; retired-skills row `v5.27.0`). Contract prose: `SPEC.md` post-closure next-skill list (entry dropped; "in either mode" → "in any mode") , `SPEC/starter.md` lifecycle step 1 (+ a clause that `/ft-refactor` writes child starters from the template directly), `SPEC/tasknote-selection.md` ×13 (routing headings, threshold table, filing-commits motion list + message row, reconciliation trigger, unattended limits "Two" → "Three" with the `--starter` exclusion), `claude/CAPABILITIES.md` (`--starter` row; `--unattended` and `--park` composition cells; ledger note), `docs/GLOSSARY.md` sidequest promotion pointer, `docs/AGENT-NEUTRALITY.md` name list, `templates/tasknote-README.md`, `templates/spec-template.md`. Skill bodies: `park-mode.md` (routing + the promotion pointer — which the retired skill's own pre-flight would have refused, since the ID already exists in PLAN.md; now says so), `ft-epic-discovery` ×2, `ft-spec` ×3, `ft-micro-task` ×3, `ft-refactor`. Stubs: `ft-file-followup.md` (rewritten: `--starter` in `description:` + `argument-hint:` + a body paragraph — Pairs J/M), `codex/skills/ft-file-followup/SKILL.md` `description:` (Pair B), seven see-also lines. Release gate: Pair C template row → `/ft-file-followup --starter`; Pair J's foreign-slug example re-pointed at `ft-epic-discovery.md` alone.

**Left alone, deliberately.** `docs/CONTEXT-BUDGET.md` §Ledger (release-refreshed; `ft-starter-task 13,253` drops at the next cut, as the sibling rows did). `.flowtron/specs/spec-to-work-handoff.md` (a historical spec). `docs/VERSION-HISTORY.md` / `PLAN-ARCHIVE.md` (append-only). `step-7.1-mirror-pairs.md:97` (Pair F history naming the stub as it was in CORE-460.2). `templates/tasknote-starter-template.md`, `SPEC/starter.md`'s shape paragraphs, `/ft-task` Step 3a, `/ft-refactor`'s direct template writes — the starter *shape* is untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the release standing checks + mirror pairs this change touches (below)

- [x] Ran lint/type-check on changed code — N/A (markdown only; no linter configured for `.md`); `git diff --check` substituted

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — N/A (no rendered surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

```text
grep -q 'starter-mode.md' claude/skills/ft-file-followup/SKILL.md && test -f …/starter-mode.md   → 0
! test -e claude/skills/ft-starter-task && ! test -e claude/commands/ft-starter-task.md
    && ! test -e codex/skills/ft-starter-task                                                    → 0
grep -rn … 'ft-starter-task' . | grep -v <exclusions>                                            → prints nothing
git diff --quiet -- templates/tasknote-starter-template.md …/step-3a-promote-starter.md
    && grep -q 'ft-file-followup \[ID\] --starter' SPEC/starter.md                               → 0
! grep -nE 'Read (`<SPEC>`|`SPEC\.md`|SPEC\.md)' <host + two fragments>                          → 0 (14 SPEC.md mentions, all citations / path lines)
Pair B / E / F / I / J / M sh blocks (step-7.1-mirror-pairs.md)                                  → each prints nothing, exit 0
Pair A / C sh blocks                                                                             → print their by-design listings (10 templates; 4 `../PLAN.md` back-links), no drift
shipped-skill parity diff (claude/skills ↔ codex/skills)                                         → no output
installed-surface policy: 5 × diff -u (snippet ssot ↔ shipped subset / commands / codex / cursor / grok) → no output
self-wiring: 2 × diff -u + dangling find + non-symlink find (.claude/)                           → no output
test $(wc -c < claude/skills/ft-file-followup/SKILL.md) -le 33000                                → 0 (28,008)
wc -c SPEC.md SPEC/gates.md claude/skills/*/SKILL.md vs docs/CONTEXT-BUDGET.md §Budgets           → all under (SPEC.md 51,188/57,000; gates 35,929/40,000; ft-task 31,839/33,000; ft-release 30,619/40,000)
grep -q '| `ft-starter-task` |' docs/MIGRATION.md                                                → 0
test $(ls claude/skills | grep -c '^ft-') -eq 15 && grep -q '15 `.md` slash-command stubs' …
    && grep -q '15 `SKILL.md` skill bodies' docs/PLATFORMS.md                                    → 0
git diff --check (tracked + intent-to-add fragment)                                              → 0
```

Structural assertions: no duplication introduced — the four shared filing steps now have exactly one home (the host); the fragment restates none of them, only names which it overlays. No dead surface — every `ft-starter-task` mention outside history is gone or re-pointed. Public-surface growth is one flag on an existing skill in exchange for one retired skill, three wrappers, and eight symlink lines (adopter side: two per platform). Code-facing docs: `docs/PLATFORMS.md` counts, tree, and trigger tables, `docs/MIGRATION.md` retired row, `claude/CAPABILITIES.md` row all updated in this diff.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (its `SPEC/` + `templates/` bullets name the starter *module* and *template*, both untouched) · `AGENTS.md` **updated** (peer roster: `/ft-starter-task` dropped, `--starter` beside the park flags) · `SPEC.md` **updated** (post-closure next-skill list; "in any mode") · `docs/MIGRATION.md` **updated** (§1.2 roster prose; retired-skills row) · `claude/AGENTS-snippet.md` **updated** (bullet 19; two `ln -s` lines dropped) · `codex/AGENTS-snippet.md` / `cursor/AGENTS-snippet.md` / `grok/AGENTS-snippet.md` **updated** (one `ln -s` line each) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` **updated** (skill-name list on the `SPEC/tasknote-selection.md` row) · `docs/PLATFORMS.md` **updated** (Claude roster + policy table + scaffold tree + counts 16→15 + the stale Codex "19 wrappers" → 15 + three non-Claude `--starter` trigger rows) · `claude/CAPABILITIES.md` **updated** (`--starter` row, two composition cells, ledger note; last-verified stamp left for the version bump per its own rule) · `docs/AGENT-COMPAT.md` no change (structural matrix; per-agent triggers deferred to PLATFORMS) · `docs/EXTERNAL-AGENTS.md` no change (capability-probe row describes the unattended posture body, which still ships inline with no fragment; `--starter` is refused under that posture, so nothing new to probe) · `docs/WORKTREES.md` no change · `docs/VISION.md` no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

`/ft-starter-task` is folded into `/ft-file-followup --starter`: one filer with three weights (bare PLAN line / `--park` stub / `--starter` body), the four duplicated filing steps now written once in the host, and the starter delta in a 7.5k lazy fragment loaded only when the flag is passed. The starter artifact, its SPEC module, its template, and `/ft-task`'s promotion path are unchanged, so existing starters promote as before.

- **Files:** 37 deliverables — 3 deleted (`claude/skills/ft-starter-task/SKILL.md` 14,330 chars, `claude/commands/ft-starter-task.md`, `codex/skills/ft-starter-task/SKILL.md`), 1 added (`claude/skills/ft-file-followup/starter-mode.md`, 7,549), 33 edited (host body +3,091 → 28,008 of 33,000; the rest are roster / routing / trigger-table lines). Roster 16 → 15; adopters lose two symlinks per platform and gain a flag.
- **Verification:** Acceptance receipt above — every command 0 / prints nothing; Pairs B, E, F, I, J, M and the five standing checks (parity, installed-surface ×5, self-wiring, wiring-consumer derivation, context budget) pass at HEAD+diff.
- **Refactors:** the fold itself; nothing adjacent. Deferred: none.
- **Documentation:** 12 of 18 AI-referenced docs updated (sweep above); `docs/CONTEXT-BUDGET.md` ledger left to the release re-measure ([[CORE-571]] precedent); `.flowtron/specs/` and the append-only histories untouched.
- **`touches:` reconciliation:** declared 39, changed 39 (37 deliverables + PLAN.md + this note). Undeclared: none.
- **Maintainability:** the [[CORE-565.2]] hand-off ("four paragraphs duplicated across the two bodies") is closed — ID allocation, pre-flight, reconcile scan, and pre-check/post-stage commit have one home; a change to any of them no longer needs a twin edit. The no-`SPEC.md`-load property holds for all three weights. Adopter-facing change lands with v5.27.0 via the retired-skills row; `/ft-update` Step 4.6 reports the two dangling links on the next bump.

**Archived:** 2026-09-10
