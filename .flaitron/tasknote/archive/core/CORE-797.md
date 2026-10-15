---
title: prep-unattended-dryrun
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: [CORE-796, CORE-EPIC-783]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-797 | prep-unattended-dryrun

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-796]]

## 🎯 Goal

Dry-run `/ft-prep-unattended` (gate reply `none`, zero writes) against flaitron's PLAN and 2–3 adopter PLANs, recording each pin/split/stay with its failing clause, and confirm pins never strip a 👁️/hand-off cue lacking an existing test command and splits never shed a person-act into the mechanical row; file fixes for any miss.

## ✅ Acceptance

- [x] Dry-run walk recorded for flaitron's PLAN plus three adopter PLANs (aetherlace, fakeneuron-nas, marscharts; email-manager added as a fourth — Implementation Notes): Step 3 counts, then every declined open row as `ID — class — first failing clause` — `judgment` (the classification is the deliverable; no command decides it). Presence check: `grep -c '^| ' .flaitron/tasknote/CORE-797.md`
- [x] Zero writes in every walked repo — `git -C ~/Code/<repo> status --porcelain` empty for aetherlace, fakeneuron-nas, marscharts (and email-manager) before and after
- [x] Guard A graded: every pin that touches a 👁️ / visual phrase or a hand-off cue names a test command that already exists in that repo, else the row stays — `judgment` + a `grep`/`ls` per cited command recorded in Testing Notes
- [x] Guard B graded: no split's mechanical row carries a person-act (the operator act, or a step that needs its result) — `judgment`, one line per split
- [x] Each miss — a guard violation, or a contract gap a real run would hit — filed as an open flaitron PLAN row ≤50w, or logged "no miss" — `grep -n` on the filed IDs in `.flaitron/PLAN.md`

## 🧩 Subtasks

- [x] Walk flaitron's PLAN (Step 1 skip classes → Step 2 predicate + class → Step 3 gate text) and reply `none`
- [x] Walk aetherlace, fakeneuron-nas, and marscharts the same way, read-only; record each repo's gate and the `none` reply (plus email-manager, the one walk that reached a gate)
- [x] Grade Guard A and Guard B over every drafted pin/split; check each named test command exists
- [x] Collect misses and contract gaps; draft a flaitron PLAN row for each (≤50w, next CORE IDs)
- [x] Confirm zero writes in the walked repos (`git status --porcelain`)

## 🔗 Related

- [[CORE-796]] — predecessor: the v7.1.0 release that shipped `/ft-prep-unattended`
- [[CORE-EPIC-783]] — the epic that built the skill ([[CORE-783.2]] clause 3 two layers, [[CORE-783.3]] the skill body)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The skill shipped in v7.1.0 today with no live run on record. [[CORE-783.N]] audited prose coherence, not behavior over real rows. A dry-run with a `none` reply costs no writes and is the cheapest way to find the cases the taxonomy does not settle.

- [x] Read relevant source files — `claude/skills/ft-prep-unattended/SKILL.md` (full), `SPEC/unattended-candidacy.md` (full), `.flaitron/sidequest/CORE-641.md`, and the open rows of flaitron plus five adopter PLANs

- [x] **Best Practices Review** — N/A: no code. The walk applies prose contracts and grades them. It does not edit a module boundary.

- [x] **Archive skim** — `<area>` is `archive/core/` (README table, `CORE-*`). Hits for the skill: [[CORE-783.1]], [[CORE-783.2]], [[CORE-783.3]], [[CORE-783.N]], [[CORE-796]]. Read `.1` and `.N` in full. [[CORE-742.3]] (via a `CORE-641` grep) is load-bearing: `sidequest_orphan()` in `tools/drift-checks.sh` fails `PROMOTED STUB` when a sidequest stub's ID also has a tasknote.

- [x] **Drift check** — the PLAN line matches the skill. Step 3's ask names `none` as the zero-write reply, and §"Preparing declined rows" names pin / split / stay. The guard wording comes from the SPEC: "A visual phrase, including `👁️`, is rewritten only when the replacement names a test command that already exists." A person-act in a mechanical row is ruled out by "describes only the factual slice." One version fact: all five adopters checked pin `v7.0.0`, which predates the skill. The adopter walks therefore apply flaitron HEAD's contract to their PLAN text. They do not run the skill from their own pin. This is a scoping fact, not drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) Adopters are chosen for coverage, not at random. **aetherlace** has `Operator:` rows with a follow-up that depends on the answer, a `Blocked by`, and epic `.N` rows. **fakeneuron-nas** has an operator probe with a conditional fix, a cross-repo dependency, and a mechanical-looking row. **marscharts** has `👁️` on epic children, which is the only place an unmarked open row in the fleet carries the glyph, and an upstream-wait row. (2) "Dry-run" means following the skill's Steps 1–3 by hand from this checkout, then replying `none`. Nothing is written in any walked repo. (3) "File fixes" means open flaitron PLAN rows written in this task's closure commit. The SPEC and skill stay unedited here.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Open rows at HEAD: flaitron 2 (CORE-797 itself, CORE-641). aetherlace 15, fakeneuron-nas 11, marscharts 7 (counts include epic parents). No unmarked open row in the fleet carries a literal `👁️` outside marscharts FE-486.3–.5.

Early lead, verified in Phase 2: the skill's starter-collision check (Step 2 "Starter") looks only at `.flaitron/tasknote/<ID>.md` and the archive. A split whose source ID has a `.flaitron/sidequest/<ID>.md` stub would write a starter. `sidequest_orphan()` then fails CI `PROMOTED STUB`, and `/ft-task`'s Step 3a promote path never retires the stub (Step 3b does). flaitron's CORE-641 has such a stub.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Followed the skill's own Steps 1–3 in each repo. The record uses the Step 3 shape: counts, proposals, then the stayed list. Misses are filed as flaitron PLAN rows, the same way [[CORE-783.N]] files a miss.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No edit to the SPEC or the skill. Each gap is filed, not fixed.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: a read-only walk plus two filed rows; no behavior changed

**Implementation Notes:**

**Scope deviation (inside the task).** The three planned adopters produced zero proposals, so the Step 3 gate never surfaced and the `none` reply was never reached. email-manager was added as a fourth adopter. It was the one surveyed PLAN with a draftable split. No downstream impact.

**Reading rules applied.** (a) A `.k` whose `.1` was never filed (audit-repo epics state "Discovery supplied by audit-repo") is a chain head. (b) An upstream wait written in prose ("Parked: wait for …", "Blocked upstream") is read as a clause-4 block, by the predicate's uncertain-means-not-a-candidate rule. See O1.

### Walk 1 — flaitron (`7f1ce42b`)

Counts: 2 walked · 0 marked · 0 `[handoff]` · 0 candidates · 2 stay · 0 pin · 0 split. Zero proposals: no gate.

| Row | Class | First failing clause | Note |
|---|---|---|---|
| CORE-797 | stay | 1 (`[heavy]`) | active tasknote (this one) |
| CORE-641 | stay | 4 (prose wait) | "Parked: wait for a proper typescript-eslint release"; has `.flaitron/sidequest/CORE-641.md` (G4) |

### Walk 2 — aetherlace (`2d05529`, pin v7.0.0)

Counts: 15 walked · 0 marked · 0 `[handoff]` · 1 candidate (AL-028) · 14 stay · 0 pin · 0 split. Zero proposals: no gate.

| Row | Class | First failing clause | Note |
|---|---|---|---|
| AL-EPIC-012 | stay | 1 | epic parent |
| AL-012.11 | stay | 1 | also `Blocked by [[AL-013.10]]` (clause 4) |
| AL-012.N | stay | 1 | `.N` audit |
| AL-EPIC-013 | stay | 1 | epic parent |
| AL-013.10 | stay | 1 | active tasknote (`in-progress`) |
| AL-013.N | stay | 1 | `.N` audit |
| AL-EPIC-032 | stay | 1 | epic parent |
| AL-032.N | stay | 1 | `.N` audit |
| AL-017 | stay | 3 (`Operator`) | split temptation (G2): the pass1.tsv edit depends on the Scholar answer |
| AL-028 | candidate | — | admitted, so left for seed (a design problem, not a person act) |
| AL-031 | stay | 3 (`Operator`) | the whole text is the person act (enable Email Routing, confirm delivery) |
| AL-EPIC-021 | stay | 1 | epic parent |
| AL-021.1 | stay | 1 | `.1` Discovery |
| AL-021.N | stay | 1 | `.N` audit |
| AL-022 | stay | 3 (`Operator`) | physical bench act; also `Blocked by` (clause 4); "tune the limits if a clean cable misses" is a G2 temptation |

### Walk 3 — fakeneuron-nas (`c3f3b1a`, pin v7.0.0)

Counts: 11 walked · 0 marked · 0 `[handoff]` · 4 candidates (NAS-10.N, NAS-12.2, NAS-12.N, NAS-14) · 7 stay · 0 pin · 0 split. Zero proposals: no gate.

| Row | Class | First failing clause | Note |
|---|---|---|---|
| NAS-EPIC-10 | stay | 1 | epic parent |
| NAS-10.N | candidate | — | every sibling `[x]` |
| NAS-EPIC-11 | stay | 1 | epic parent |
| NAS-11.8 | stay | 3 (`deploy`, via `DEPLOY-033`; also cross-repo in substance) | "once InvisiPaw's runbook … stops"; a split temptation (G2): the 644 chmod must wait for the InvisiPaw edit |
| NAS-11.N | stay | 6 | waits on open NAS-11.8 |
| NAS-EPIC-12 | stay | 5 | epic parent (`[light]`) |
| NAS-12.2 | candidate | — | chain head (no `.1` filed) |
| NAS-12.N | candidate | — | settled by NAS-12.2, a candidate in the same walk |
| NAS-15 | stay | 3 (`Operator`) | blocked tasknote exists; G2 temptation ("record the value … set it to 1") |
| NAS-14 | candidate | — | left for seed |
| NAS-13 | stay | 3 (`migration`, via the path `docs/MIGRATION.md`) | pin temptation (G1), the same shape as email-manager CORE-EPIC-2.3: the keyword trips on a path, not a person |

### Walk 4 — marscharts (`d91ba6c8a`, pin v7.0.0)

Counts: 7 walked · 0 marked · 0 `[handoff]` · 0 candidates · 7 stay · 0 pin · 0 split. Zero proposals: no gate.

| Row | Class | First failing clause | Note |
|---|---|---|---|
| FE-EPIC-486 | stay | 1 | epic parent |
| FE-486.2 | stay | 1 (`[frontier]`) | contract design |
| FE-486.3 | stay | 1 | carries `👁️`; also clause 6 |
| FE-486.4 | stay | 1 | carries `👁️` |
| FE-486.5 | stay | 3 (`👁️`) | a true look. Pin temptation (G1): `npm run test:e2e` exists, but no spec decides the inset look. `playwright/tests/` has no `toHaveScreenshot`, and `avatar-class-legend.spec.ts` covers the legend. Clause 6 would still decline after any pin. |
| FE-486.N | stay | 1 | `.N` audit |
| CORE-229 | stay | 4 (prose wait) | "Blocked upstream, not by this repo"; the 2026-10-09 seed (`350cf27de`) also left it unmarked |

### Walk 5 — email-manager (`7623062`, pin v7.0.0)

Counts: 14 walked · 3 marked (DEPLOY-EPIC-1.4, BE-EPIC-2.5, CORE-EPIC-2.4, skipped) · 0 `[handoff]` · 2 candidates (CORE-EPIC-2.2, CORE-010) · 8 stay · 0 pin · 1 split.

Gate as it would surface:

```text
Proposals
split BE-EPIC-2.2
  remainder:  - [ ] **BE-EPIC-2.2** [medium]🧩 | cf-rule-id — Migration 0002 adds aliases.cf_rule_id; createCfRule returns + persists the id; delete/compensate by id; the paginated name lookup stays the fallback for legacy null rows.
  mechanical: - [ ] **BE-EPIC-2.6** [medium]🧩 | cf-rule-paginate — deleteCfRuleFor pages through the CF rules list instead of reading the default ~20-rule page, so delete finds every alias's rule; tests with >1 page of rules.
  (placement: highest numeric sibling is .5, the legacy numeric audit; no .N row to insert before — see G3. The remainder's fallback also depends on .6, which clause 6 sequences after .2 — the ordering inversion noted under G3)
Reply `all` to prepare every proposal, `none` to write nothing, a list of source IDs to prepare only those, or `all but <IDs>`. Dropping a split drops its mechanical row and its starter together.
```

Reply: **`none`**. Zero writes.

| Row | Class | First failing clause | Note |
|---|---|---|---|
| DEPLOY-EPIC-1 | stay | 1 | epic parent |
| DEPLOY-EPIC-1.2 | stay | 1 | active tasknote |
| DEPLOY-EPIC-1.3 | stay | 3 (`Operator`) | the whole text is the person act; the 401 check needs the leaked token (a credential) |
| BE-EPIC-2 | stay | 5 | epic parent |
| BE-EPIC-2.2 | split | 3 (`Migration`) | the pagination fix separates cleanly; the remainder keeps the migration and stays declined |
| BE-EPIC-2.3 | stay | 6 | waits on BE-EPIC-2.2 |
| BE-EPIC-2.4 | stay | 6 | waits on BE-EPIC-2.3 |
| CORE-EPIC-2 | stay | 5 | epic parent |
| CORE-EPIC-2.2 | candidate | — | chain head |
| CORE-EPIC-2.3 | stay | 3 (`migration` in the path `migrations/0001`) | pin temptation (G1): rewording the path drops the keyword without removing a person |
| CORE-010 | candidate | — | left for seed |

### Guard grading

**Guard A — no pin strips a `👁️` or hand-off cue without an existing test command.** Zero pins were drafted in five walks, so no violation. Both pin temptations were resolved to stay by reading the whole section, not by the pin bullet alone. **G1:** the pin bullet's literal test is "names a test command that already exists." Any repo's generic runner passes that test (`npm run test:e2e` for FE-486.5). Only the stay bullet's "where no existing test command *decides* it" stops the pin. The bullet also gives no rule for a non-visual cue. Rewording `migrations/0001` to the bare filename would clear clause 3 for CORE-EPIC-2.3 with no person removed. fakeneuron-nas NAS-13 (`docs/MIGRATION.md`) has the same shape. (The first pass listed NAS-13 as a candidate. The external review caught that, and it is corrected above.)

**Guard B — no split sheds a person act into the mechanical row.** The one drafted split holds. `cf-rule-paginate` is code plus vitest (`worker/package.json` `test: vitest run`), and the remainder keeps the migration. **G2:** four rows tempt a split whose slice uses the person act's result: AL-017, AL-022, NAS-11.8, and NAS-15. Only the phrase "separates cleanly" stops it. A slice drafted from AL-017 would read "set oakley-2013-low's pass1.tsv row to other-author and run `screen apply pass1`." That row is `[light]`, trips no keyword, and has no `Blocked by`. A later seed would admit it, and an unattended run would flip the screening without the authorship check. A slice from NAS-11.8 would tighten the db to 644 before InvisiPaw's recovery stops `cp`-ing onto it.

### Mechanics gaps

- **G3 — legacy numeric audit.** The Step 2 epic-child rule allocates "the next `.<k>` after the highest numeric sibling … inserted … immediately before that `.N` row." email-manager's epics have no `.N`. Their audit is the numeric `.5` / `.4`, already `[unattended]`. The split allocates BE-EPIC-2.6 *after* the audit. Then `/ft-close-epic`'s legacy rule ("the chosen ID matches the highest numeric `.<SUB>`") would read `.6` as the audit. Clause 6 also cycles: `.6` waits on `.5` (its `.k-1`), and `.5` waits on every child. Related: on any epic, the mechanical `.k` lands after its own remainder, so clause 6 holds it until the person act closes. That direction is safe, but it is worth stating.
- **G4 — sidequest-stub collision.** Step 2 "Starter" refuses only an existing `.flaitron/tasknote/<ID>.md` or an archived note. A split on an ID that has `.flaitron/sidequest/<ID>.md` (flaitron CORE-641) would write a starter. `tools/drift-checks.sh` `sidequest_orphan()` then fails `PROMOTED STUB` (line 197). The `/ft-task` Step 3a promote path never retires the stub; only Step 3b does. `SPEC/plan-filing.md` §"ID allocation" already scans `.flaitron/sidequest/`, so the asymmetry is local to the skill.

### Observations, not filed

- **O1 — clause 4 and prose waits.** CORE-641 and marscharts CORE-229 match none of clause 4's three literal forms. They are declined only by the uncertain-means-not rule. Both postures write nothing either way, and seed's confirm catches a mark. The marscharts seed left CORE-229 unmarked. Not a prep miss.
- **O2.** Marked audits with open siblings (email-manager DEPLOY-EPIC-1.4) are skipped and not repaired, by design.
- **O3.** marscharts carries four sidequest stubs whose rows are closed (BE-282, CORE-257, FE-447, FE-448). That is adopter housekeeping, outside this task.

### Filed

- **CORE-798** `[heavy]🧠` `| prep-guard-wording` — G1 + G2 (the SPEC section; needs a contract decision)
- **CORE-799** `[medium]🧩` `| prep-split-collisions` — G3 + G4 (skill Step 2 mechanics)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: markdown only. `bash tools/drift-checks.sh` → exit 0 (every check ok)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (re-run after the Phase 2 return):

- `grep -c '^| ' .flaitron/tasknote/CORE-797.md` → exit 0 (51 table lines across five walks)
- `test -z "$(git -C ~/Code/<repo> status --porcelain)"` for aetherlace, fakeneuron-nas, marscharts, email-manager → exit 0 each, before the walks and after. HEADs were unchanged (`2d05529`, `c3f3b1a`, `d91ba6c8a`, `7623062`).
- Guard A commands cited: `grep -q '"test:e2e"' marscharts/frontend/package.json` → 0. `grep -rlE 'toHaveScreenshot|toMatchSnapshot' marscharts/frontend/playwright/tests` → 1 (none, so FE-486.5 is a true look). `grep -q '"test": "vitest run"' email-manager/worker/package.json` → 0 (the split's mechanical slice has a command).
- Keyword re-checks: fakeneuron-nas NAS-13 contains `MIGRATION.md` and NAS-11.8 contains `DEPLOY-033` → both stay at clause 3.
- G4 evidence: `sed -n 197p tools/drift-checks.sh | grep -q 'PROMOTED STUB'` → 0. `grep -c sidequest claude/skills/ft-task/step-3a-promote-starter.md` → 0.
- Filed rows: `grep -n 'CORE-798\|CORE-799' .flaitron/PLAN.md` → lines 19–20. The descriptions are 45 and 48 words. Neither ID appeared in PLAN, PLAN-ARCHIVE, the tasknote dirs, or the sidequest dir before filing.
- `bash tools/drift-checks.sh` → exit 0

Structural: N/A for code. No duplication or stale doc: the SPEC and skill are unedited, and the gaps are filed.

External review (a read-only general-purpose subagent, graded against Acceptance):

- **Blocker, fixed → Phase 2 → Phase 3 re-run:** NAS-13 had been listed as a candidate, but its text contains `docs/MIGRATION.md`. It is reclassified `stay — 3`, and the walk 3 counts are now 4 candidates and 7 stay. The NAS-11.8 note said "keyword miss", but the row contains `DEPLOY-033`; the note is corrected.
- **Blocker, fixed:** the Testing Notes were empty at review time. The receipts are recorded above.
- **Notes, no action:** O1's uncertain-means-not reading is defensible. The CORE-641 G4 example is illustrative only, since that row stays at clause 4. The BE-EPIC-2.2 ordering inversion is now noted under G3. CORE-798's "a path-tripped keyword stays" settles the case in advance, which is acceptable for a `[heavy]` design row.
- **Confirmed:** 16 spot-checked rows. G1–G4 are real, with line evidence. The split draft is clean (24 and 26 words, a 16-character shortname, `[medium]🧩`). CORE-798 and CORE-799 are sound.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`/ft-prep-unattended` was dry-run over five PLANs: flaitron, aetherlace, fakeneuron-nas, marscharts, and email-manager. That covered 49 open rows, with zero writes. One walk reached the gate, email-manager's BE-EPIC-2.2 split, and it was answered `none`. The two guards held on every draft. Each held only because the walk read the whole section, not the pin and split bullets alone. Four gaps were found and filed as CORE-798 (G1 + G2, the guard wording) and CORE-799 (G3 + G4, the split mechanics).

Doc-drift sweep: no change to any entry. `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `*/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, and `docs/VISION.md` are all unchanged. The SPEC and skill fixes belong to CORE-798 and CORE-799.

`touches:` reconciliation: declared `.flaitron/PLAN.md`. The diff is `.flaitron/PLAN.md` plus this note's archive move. Nothing else changed.

Candidacy for the filed rows (attended, no token written): CORE-798 fails clause 1 (`[heavy]`). CORE-799 is admitted by the predicate. That leaves it for a later `/ft-seed-unattended`, where the operator's confirm decides.

Learnings: N/A. Judgments applied while walking (the keyword hits on paths, the prose waits) belong in CORE-798's contract decision, not the always-loaded layer.

**Archived:** 2026-10-15
