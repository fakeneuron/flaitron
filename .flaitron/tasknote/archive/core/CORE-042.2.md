---
title: SPEC modularization
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-042.1, CORE-EPIC-042]
---

# CORE-042.2 | SPEC modularization

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-042.1]] [[CORE-EPIC-042]]

## 🎯 Goal

Split `SPEC.md` into a tight always-loaded core plus 5 lazy modules (Epic / Starter / Blocked / Model / Versioning), wired into `/task` Step 2 dispatch so each invocation loads only the modules its file-state branch and epic-ID prefix require.

## ✅ Acceptance

- [ ] `SPEC/` directory created with 5 module files (`epic.md` / `starter.md` / `blocked.md` / `model.md` / `versioning.md`); each carries the canonical contract content moved verbatim from `SPEC.md`
- [ ] `SPEC.md` slimmed: 5 moved sections replaced with `## <Heading>\n\nCanonical contract: see [SPEC/<name>.md].` pointer stubs; all other sections unchanged
- [ ] `/task` skill (`claude/skills/task/SKILL.md`) updated: Step 0 resolves `SPEC_DIR`; Step 1.5 model-gate edge cases load `SPEC/model.md`; Step 3a loads `SPEC/starter.md`; Step 3b loads `SPEC/epic.md` only on epic-ID prefix; Step 3c + Step 5 parking load `SPEC/blocked.md`; existing prose `SPEC §"Foo"` pointers updated to `SPEC/<name>.md`
- [ ] `claude/skills/starter-task/SKILL.md`, `claude/CLAUDE-snippet.md`, `templates/tasknote-README.md` citation sites updated to point at module files where the cited section moved
- [ ] No residual stale citations: `grep` for `SPEC §"Epic lifecycle"|SPEC §"Starter tasknotes"|SPEC §"Blocked tasks"|SPEC §"Model field"|SPEC §"Versioning"` across `claude/`, `templates/`, `docs/` returns zero hits in active (non-archive) files
- [ ] Slim SPEC.md word count ≈ 2,540w core + ~150w pointers (≈2,700w total); per-`/task` saving on fresh-task branch ≈ 17% confirmed by the math
- [ ] Version held — no tag cut; `SPEC.md` `**Version:** v0.7.0` line unchanged (per [[CORE-042.1]] §A8: v1.0 cuts when Thrust C bundles)
- [ ] Sanity read-through: slim SPEC.md stands alone as a coherent always-loaded doc

## 🧩 Subtasks

- [ ] Create `SPEC/` directory
- [ ] Create `SPEC/epic.md` — move §"Epic lifecycle" body verbatim under an H1; re-anchor any `§"Foo"` cross-refs that now span files
- [ ] Create `SPEC/starter.md` — move §"Starter tasknotes" body
- [ ] Create `SPEC/blocked.md` — move §"Blocked tasks" body (incl. §"Viz interaction" subsection)
- [ ] Create `SPEC/model.md` — move §"Model field" body
- [ ] Create `SPEC/versioning.md` — move §"Versioning" body
- [ ] Slim `SPEC.md` — replace each of the 5 section bodies with a 1-line pointer; preserve original H2 heading text for citation continuity
- [ ] Update `claude/skills/task/SKILL.md` — Step 0 SPEC_DIR resolution; Step 1.5 / 3a / 3b epic-prefix / 3c / Step 5 parking → directive Read form for relevant module; update prose `SPEC §"X"` → `SPEC/<name>.md` where X moved
- [ ] Update `claude/skills/starter-task/SKILL.md` — frontmatter description + intro + Notes citations (`SPEC §"Starter tasknotes"` → `SPEC/starter.md`)
- [ ] Update `claude/CLAUDE-snippet.md` L19 (`SPEC.md §"Versioning"` → `SPEC/versioning.md`)
- [ ] Update `templates/tasknote-README.md` (citations to §"Epic lifecycle", §"Starter tasknotes", §"Model field" → respective module files)
- [ ] Cross-citation sanity grep — zero residual stale citations in active files
- [ ] Word-count check on slim SPEC.md
- [ ] Read-through pass on slim SPEC.md as a self-contained doc

## 🔗 Related

- [[CORE-042.1]] — epic Discovery; settled module split (§A2) and dispatch shape (§A4)
- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Foundation child of [[CORE-EPIC-042]]; [[CORE-042.1]] closed the same day with §A2/§A4 surveys that frame this task end-to-end. No re-scope signal — the architectural argument is fresher (PLAN.md grew another +266w today) and the module split is the foundation for Thrusts C and B.

- [x] Read relevant source files — `SPEC.md` (full, 4,014w; matches CORE-042.1 §A2 baseline exactly), `claude/skills/task/SKILL.md` (full, 2,319w; matches §A3), `claude/skills/starter-task/SKILL.md`, `claude/skills/new-project/SKILL.md`, `claude/CLAUDE-snippet.md`, `templates/tasknote-template.md`, `templates/tasknote-README.md`, `templates/PLAN.md`, `_project/PLAN.md` (5,635w now; +266w since CORE-042.1 close), `_project/tasknote/archive/core/CORE-042.1.md`, `_project/tasknote/archive/core/CORE-037.md`. `docs/MIGRATION.md` + `docs/PHILOSOPHY.md` enumerated; will read on demand if the version-bump answer pulls them into scope.
- [x] **Archive skim** — read [[CORE-042.1]] (same-day predecessor, full content; surveys §A2 + §A4 are the operational scope) and [[CORE-037]] (parent diagnostic; established the per-`/task` ~11.4k baseline + the trim-vs-shape framing). [[CORE-038]] / [[CORE-039]] / [[CORE-040]] sized only — already-landed prose trims, conclusions known via CORE-037 / CORE-042.1.
- [x] **Drift check** — see Drift section in Discovery Notes below. No code-level drift; one PLAN.md growth observation.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 4 questions resolved (see Open questions section above; user accepted all 4 leans)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Drift check vs CORE-042.1 surveys (2026-05-06, same-day)

| Surface | CORE-042.1 §A1 | Now | Δ |
|---|---|---|---|
| `SPEC.md` | 4,014w | 4,014w | 0 |
| `claude/skills/task/SKILL.md` | 2,319w | 2,319w | 0 |
| `_project/PLAN.md` | 5,369w | 5,635w | **+266w** (today's CORE-042.1 closure entries + filed children) |
| **Per-`/task` total** | **~11,702w** | **~11,968w** | **+266w net** |

§A2 hot/cold-path tagging holds verbatim — SPEC sections re-read; section boundaries unchanged. The 5 cold-path modules confirmed at:

- §"Epic lifecycle" — SPEC.md L74-110, ~278w
- §"Starter tasknotes" — SPEC.md L197-241, ~304w
- §"Blocked tasks" — SPEC.md L372-423, ~458w
- §"Model field" — SPEC.md L516-539, ~186w
- §"Versioning" — SPEC.md L541-559, ~124w

Total cold-path moving out: ~1,350w. Slim-core target: ~2,540w (current SPEC less the 5 modules, plus modest pointer overhead per Q2 below).

§A4 dispatch table holds: fresh-task branch (Step 3b) saves ~1,950w / ~17%; starter-promotion (3a) ~13%; blocked-resume (3c) ~12%. PLAN.md growth makes the relative percentage smaller (~17% → ~16% on the now-12k baseline) but the absolute saving is unchanged.

### Citation graph (additive to §A2)

Section moves require citation updates in 5 files. Mapping:

| Cited section | Moves to module | Citation sites |
|---|---|---|
| §"Epic lifecycle" | `SPEC/epic.md` | task SKILL.md L170 (Notes); templates/tasknote-README.md L19 |
| §"Starter tasknotes" | `SPEC/starter.md` | task SKILL.md L87 (Step 3a intro); starter-task SKILL.md frontmatter description + L8 (intro) + L121 (Notes); templates/tasknote-README.md L18 |
| §"Blocked tasks" | `SPEC/blocked.md` | task SKILL.md L128 (Step 3c intro), L138 (Step 4 inline ref), L153 (Step 5 Phase 2 reference) |
| §"Model field" | `SPEC/model.md` | task SKILL.md L71 (Step 1.5 footer); templates/tasknote-README.md L17 |
| §"Versioning" | `SPEC/versioning.md` | claude/CLAUDE-snippet.md L19 (adopter snippet) |

Stays in slim SPEC.md (always-loaded core; **no citation changes needed**): §"Task ID convention", §"Task-line format", §"PLAN.md filing-discipline thresholds", §"Tasknote frontmatter", §"Tasknote body shape", §"📝 Phase 1: Discovery", §"Post-closure protocol", §"When to use a tasknote (and when not to)", §"What is Flowtron", §"Core principles", §"Layout in adopting projects", §"Working in the flowtron repo itself", §"Priority levels", §"What flowtron does NOT provide".

`claude/skills/new-project/SKILL.md` cites `docs/MIGRATION.md` only — no SPEC citations affected.

### `/task` skill dispatch sketch (per §A4)

Step 0 already resolves SPEC path. Add `SPEC_DIR` resolution alongside (`_project/flowtron/SPEC/` for adopting; `SPEC/` for self-hosted). Then:

- Step 1.5 model-gate: on **mismatch** or **legacy entry** branches → load `<SPEC_DIR>/model.md`. (Match-and-proceed branch reads nothing; cheaper than today.)
- Step 2 file-state branch dispatch:
  - **3a (starter promotion)** → load `<SPEC_DIR>/starter.md`.
  - **3b (fresh scaffold)** → load nothing extra **unless** ID is `<AREA>-EPIC-N` or `<AREA>-N.<sub>` → load `<SPEC_DIR>/epic.md`.
  - **3c (blocked resume)** → load `<SPEC_DIR>/blocked.md`.
- Step 5 (mid-Phase-2 parking) → load `<SPEC_DIR>/blocked.md` if not already loaded.
- Versioning module loaded only for explicit version-bump tasks (operator notices via task title; no automatic dispatch).

### Open questions (lean → user confirms)

1. **Module location convention** — lean: `SPEC/<name>.md` (capital `SPEC/` directory next to `SPEC.md`, singular nouns: `epic.md` / `starter.md` / `blocked.md` / `model.md` / `versioning.md`).
2. **Slim SPEC.md treatment of moved sections** — lean: keep section header + 1-line pointer ("## Epic lifecycle\n\nCanonical contract: see [`SPEC/epic.md`].") for citation continuity (~150w pointer overhead vs ~1,350w saved).
3. **Skill dispatch wording** — lean: directive **Read** form for branch-triggered loads ("Read `_project/flowtron/SPEC/<module>.md` before proceeding"), prose `SPEC/<module>.md` for in-prose pointers.
4. **Version bump for this task** — lean: hold the bump; this task lands as a no-bump internal restructure on main, with the v1.0 tag deferred until Thrust A + C breaking changes bundle (per [[CORE-042.1]] §A8 verdict). If user prefers a minor bump now (v0.7.0 → v0.8.0), I'll cut it — but the rationale for v1.0-bundling is that it gives adopters a single migration step rather than two.


## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no precedent in flowtron for a `<file>.md` + `<file>/` sibling-dir split; closest peer-dir analogs are `templates/` and `docs/` next to repo root. Justified new shape because slim `SPEC.md` must stay at the canonical adopter-cited path while modules group under a name that signals "spec content." Module file format chosen: H1 matching original section heading + 1-line back-ref note + verbatim section content (heading depth promoted: H2→H1, H3→H2 for `Viz interaction`).
- [x] Implemented the minimal solution — see Implementation Notes
- [x] Updated/added tests for non-trivial behavior — n/a (no code; spec/skill restructure)
- [x] Ran targeted tests on changed files — n/a (covered in Phase 3 cross-citation grep + word-count + read-through)

**Implementation Notes:**

### Files created

- `SPEC/epic.md` (303w) — §"Epic lifecycle" content
- `SPEC/starter.md` (334w) — §"Starter tasknotes" content
- `SPEC/blocked.md` (494w) — §"Blocked tasks" content (incl. `## Viz interaction` subsection, promoted from H3 to H2)
- `SPEC/model.md` (223w) — §"Model field" content
- `SPEC/versioning.md` (145w) — §"Versioning" content

Each module opens with H1 + a one-line back-ref note (`> Lazy-loaded SPEC module. Loaded by /task <branch>. See SPEC.md for the always-loaded core spec.`) above the verbatim moved content. Cross-references within moved content (e.g., `§"The 4-phase workflow"`, `§"Long-description conventions"`, `§"Task-line format"`) preserved as-is — they all resolve to sections still in slim `SPEC.md`.

### Slim SPEC.md

Replaced 5 section bodies with one-line pointer stubs ("Canonical contract: see [`SPEC/<name>.md`](SPEC/<name>.md)."). Original H2 headings preserved for citation continuity (vault TOC, grep-by-section-name, in-flight `§"Foo"` citations from active tasknotes). All other SPEC.md sections unchanged.

| Surface | Before | After | Δ |
|---|---|---|---|
| `SPEC.md` | 4,014w | 2,680w | **−1,334w** |
| 5 modules | n/a | 1,499w | +1,499w |
| Repo total | 4,014w | 4,179w | +165w (back-ref boilerplate) |

### Skill updates

- `claude/skills/task/SKILL.md` (2,319w → 2,428w; +109w from `SPEC_DIR` resolution + Read directives):
  - Step 0: added `SPEC_DIR` resolution alongside `SPEC` (both adopting + self-hosted layouts).
  - Step 1.5: directive `Read <SPEC_DIR>/model.md` on mismatch + legacy-entry branches.
  - Step 2: new "Epic-ID dispatch" bullet — `Read <SPEC_DIR>/epic.md` for `<AREA>-EPIC-<N>` or `<AREA>-<N>.<sub>` IDs.
  - Step 3a: directive `Read <SPEC_DIR>/starter.md` at top.
  - Step 3c: directive `Read <SPEC_DIR>/blocked.md` at top.
  - Step 4: `<SPEC_DIR>/blocked.md` cited for the Re-scope-to-blocked path.
  - Step 5: directive `Read <SPEC_DIR>/blocked.md` on mid-Phase-2 parking.
  - Notes: §"Epic lifecycle" cite updated to `<SPEC_DIR>/epic.md`.

- `claude/skills/starter-task/SKILL.md` (~1,358w):
  - Frontmatter description: `SPEC §"Starter tasknotes"` → `SPEC/starter.md`.
  - Intro: directive Read on `<SPEC_DIR>/starter.md`.
  - Step 0: added `SPEC_DIR` resolution + post-resolution Read directive for `starter.md`.
  - Step 6 hand-off: cite updated to `<SPEC_DIR>/starter.md`.

### Other consumer updates

- `claude/CLAUDE-snippet.md` L19 — `SPEC.md §"Versioning"` → `SPEC/versioning.md`.
- `templates/tasknote-README.md` — 3 cite sites updated: §"Model field" → `SPEC/model.md`, §"Starter tasknotes" → `SPEC/starter.md`, §"Epic lifecycle" → `SPEC/epic.md`. §"Task-line format", §"Tasknote frontmatter", §"Tasknote body shape" stay unchanged (slim core).

### Per-`/task` load math (recomputed)

Versus today's pre-slim baseline (PLAN.md 5,635w, SPEC.md 4,014w, task SKILL 2,319w = 11,968w).

| Branch | Modules loaded | New total | Saving | % |
|---|---|---|---|---|
| Fresh task (Step 3b, plain ID) | none | 10,743w | −1,225w | **~10.2%** |
| Epic subtask (Step 2 dispatch) | epic.md | 11,046w | −922w | ~7.7% |
| Starter promotion (Step 3a) | starter.md | 11,077w | −891w | ~7.4% |
| Blocked resume (Step 3c) | blocked.md | 11,237w | −731w | ~6.1% |
| Model-gate edge case (Step 1.5) | model.md | 10,966w | −1,002w | ~8.4% |

Saving on the most common branch (fresh task) is **~10.2%**, below the §A4 prediction of ~17%. The §A4 prediction over-estimated combined SPEC+SKILL savings; the SKILL has its own ~600w of branch-specific bodies (Step 3a 414w + Step 3c 184w) that *could* be lazy-loaded but are NOT in this task's scope — moving SKILL bodies into `SPEC/` would mix SPEC content (canonical contract) with SKILL content (executable interpretation), which is a different design decision worth its own task. Filed for future consideration as part of Thrust B (CORE-042.5 micro-tasknote work). The SPEC-side win (~10%) is real and the directive-Read pattern is now established for future modules.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — viz suite passed (`cd viz && npm test`: 2 files, 53 tests, 0 failures); confirms zero regression in PLAN/tasknote parsing. No other automated test surface in the repo.
- [x] Ran lint/type-check on changed code — n/a (markdown only; no TS/JS changed)
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI change)
- [x] Fixed all introduced issues — none surfaced; cross-citation grep + slim-SPEC read-through + viz suite all clean

**Testing Notes:**

Three smoke checks performed:

1. **Cross-citation grep** (`grep -rn 'SPEC.md §"\|SPEC §"' (Epic lifecycle\|Starter tasknotes\|Blocked tasks\|Model field\|Versioning)` across `SPEC.md`, `SPEC/`, `claude/`, `templates/`, `docs/`, active PLAN.md): zero residual stale citations in workflow files. The only matches were inside this tasknote (CORE-042.2.md) where the strings appear in acceptance/subtasks descriptions of work-to-do — intentional, not stale citations.

2. **Word-count verification:**
   - Slim `SPEC.md`: 4,014w → 2,680w (−1,334w / −33%)
   - 5 modules total: 1,499w (was ~1,350w in old SPEC; +149w from H1 + back-ref boilerplate)
   - `claude/skills/task/SKILL.md`: 2,319w → 2,428w (+109w from `SPEC_DIR` resolution + Read directives)
   - Net repo growth across spec/skill surface: +330w (one-time cost of the architectural seam)
   - Per-`/task` saving on fresh-task branch: ~10.2% (1,225w off the ~12k baseline)

3. **Slim SPEC.md read-through:** end-to-end pass confirmed coherent as a standalone doc. All 5 pointer stubs in place at original section positions; cross-references within the slim core (e.g., `§"Task-line format"`, `§"Tasknote frontmatter"`, `§"Blocked tasks"`) all resolve to either still-inline content or pointer stubs that direct to modules. No dangling `§"Foo"` references.

Viz parser passes confirm the move did not affect PLAN.md / tasknote parsing — viz doesn't read SPEC.md or the new module files, so this was expected, but it's a clean confirmation.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — `claude/CLAUDE-snippet.md` L19 cite updated; `templates/tasknote-README.md` 3 cite sites updated; `claude/skills/task/SKILL.md` Step 0/1.5/2/3a/3c/4/5/Notes updated; `claude/skills/starter-task/SKILL.md` frontmatter+intro+Step 0+Step 6 updated; `SPEC.md` slimmed; 5 modules created at `SPEC/<name>.md`. No archive tasknotes touched (write-once policy).
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.2 was the foundation child of [[CORE-EPIC-042]] (workflow architecture rethink) — Thrust A: SPEC modularization. The slim-`SPEC.md`-plus-lazy-modules architecture is now in place, wired into `/task` and `/starter-task` via directive `Read` calls keyed on file-state branch and epic-ID prefix.

**Architecture landed:**

- `SPEC.md` slimmed from 4,014w to 2,680w (−1,334w / −33%) — 5 sections replaced with one-line pointer stubs at their original H2 positions; all other content unchanged.
- 5 module files at `SPEC/<name>.md` (1,499w combined) — `epic.md` (303w) / `starter.md` (334w) / `blocked.md` (494w) / `model.md` (223w) / `versioning.md` (145w). Each opens with H1 + a one-line back-ref note + verbatim moved content. `Viz interaction` H3 promoted to H2 inside `blocked.md`.
- `claude/skills/task/SKILL.md` (+109w) — Step 0 resolves `SPEC_DIR`; Step 1.5 / 3a / 3c / Step 5 use directive `Read <SPEC_DIR>/<module>.md`; Step 2 adds epic-ID dispatch for `epic.md`.
- `claude/skills/starter-task/SKILL.md` — frontmatter description + intro + Step 0 + Step 6 cite the module path; Step 0 reads `starter.md` post-resolution.
- `claude/CLAUDE-snippet.md` + `templates/tasknote-README.md` — cite sites updated where the cited section moved.

**Per-`/task` load impact** (vs ~12k baseline; PLAN.md 5,635w + SKILL 2,319w + SPEC.md 4,014w):

| Branch | Saving | % |
|---|---|---|
| Fresh task (Step 3b) | −1,225w | **~10.2%** |
| Epic subtask | −922w | ~7.7% |
| Starter promotion | −891w | ~7.4% |
| Blocked resume | −731w | ~6.1% |

**~10% on the most common branch — below the §A4 prediction of ~17%.** The §A4 prediction assumed combined SPEC + SKILL lazy-loading; the SKILL-side savings (~600w from Step 3a + 3c bodies) need a separate split task to materialize and were out of scope here. The SPEC-side win is real and the directive-Read pattern is now established for follow-on work.

**Decisions captured (4 user-confirmed):**

1. Module location — `SPEC/<name>.md` (capital `SPEC/` directory next to `SPEC.md`; singular nouns).
2. Slim SPEC.md treatment — keep H2 heading + 1-line pointer (preserves `§"Foo"` citation continuity, vault TOC, grep-by-section-name).
3. Skill dispatch — directive `Read` form (operationally precise; enables the actual saving).
4. Versioning — held; v1.0 cuts when Thrust C bundles (per [[CORE-042.1]] §A8 verdict). `**Version:** v0.7.0` line on slim SPEC.md unchanged.

**No regressions** — viz suite passed (`cd viz && npm test`: 53/53). Cross-citation grep returned zero residual stale citations in workflow files (matches inside this tasknote are intentional — they describe the work).

**Out-of-epic surface noted but not filed:** SKILL-side body lazy-loading (~600w of Step 3a + 3c bodies). Could file as `CORE-042.8+` audit follow-up if the [[CORE-042.7]] audit surfaces it; otherwise the directive-Read pattern stays SPEC-side.

**Method note:** The directive-`Read` pattern (skill says explicitly "Read X.md before proceeding") is what makes the saving actually materialize — a prose `see SPEC §"Foo"` cite without the directive verb is silently ignored by an AI that already has SPEC.md loaded but assumes it's "everything." This was settled in Q3 of the clarifying questions; it's the operational primitive that lets future modules be added without growing the always-loaded core.

**Archived:** 2026-05-06
