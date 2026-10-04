---
title: repo conventions + tech-debt audit
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-049, CORE-037]
---

# CORE-056 | repo conventions + tech-debt audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-049]] [[CORE-037]]

## 🎯 Goal

Audit flowtron's convention + coherence axis (file naming, heading style, cross-refs, template/SPEC/skill parity, dead surfaces) and surface ranked findings, then file follow-ups via the [[CORE-049]] cohort model — distinct from [[CORE-049]]'s token axis and [[FE-018]]'s viz code axis.

## ✅ Acceptance

- [ ] Inspection axes locked (confirm/trim the starter's 10 sketched axes)
- [ ] Walked locked axes across the repo; ranked findings logged with severity threshold applied
- [ ] User walked through findings; prioritized fixes
- [ ] Cohort filed (epic vs individual `/task` entries — locked in Phase 1)
- [ ] Boundaries with [[CORE-055]] (now closed — consume), [[FE-018]] (viz code) explicit in the cohort filing

## 🧩 Subtasks

- [ ] **Survey** — walk all 10 inspection axes across in-scope surfaces (SPEC.md + SPEC/, claude/skills/* (8 skills), templates/, docs/, README.md, _project/tasknote/README.md); record findings inline in Phase 2 Implementation Notes
- [ ] **Rank** — compile ranked candidate list applying severity bar (meaningful coherence gain × no negative tradeoff)
- [ ] **Walk with user** — present ranked candidates via AskUserQuestion; capture approvals / drops / re-prioritizations / cohort-shape preference (epic vs individual tasks vs starters)
- [ ] **File** — write approved candidates to PLAN.md (or record "no changes needed" with rationale)
- [ ] **Doc-drift sweep** — run Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🔗 Related

- [[CORE-049]] — workflow token audit (precedent: same audit-then-cohort model, different axis)
- [[CORE-037]] — original token-cost audit predecessor (reference for two-axis ranking model)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Audit task with concrete brief (10 inspection axes across the convention/coherence axis). Drift only makes the task slightly bigger (8 skills not 4) and slightly easier (CORE-055 / CORE-054 / CORE-EPIC-057 closed today, settling parallel tracks). [[CORE-049]] is the proven precedent for the audit-then-cohort model.

- [x] Read relevant source files — read [[CORE-049]] in full as the load-bearing precedent (audit framework, severity bar, bundling decision, doc-drift canary). Surface-level reads will be done as-needed during Phase 2 survey.
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — done at promotion; see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Archive skim

- **[[CORE-049]]** (workflow token audit, 2026-05-08) — **load-bearing precedent.** Same shape: per-surface review → ranked candidates → user walk → cohort filing. Inherits methodological lesson from [[CORE-037]]: "load-bearing for X doesn't mean live in surface Y" — the convention-axis analog is "consistency for X doesn't mean re-applying everywhere Y" (don't force false uniformity). Bundling outcome was three starters (not an epic) because findings were independent. CORE-049 audit itself touched no AI-referenced docs; only filed follow-ups touched code.
- **[[CORE-037]]** (predecessor token audit, 2026-05-05) — original two-axis cost model. Methodological lesson: file naming finding miscategorized initially; user surfaced the relocation-not-trim distinction. Audit must apply same scrutiny here (false positives where "drift" is actually intentional local convention).
- **[[CORE-038]]** / **[[CORE-039]]** — proven trim patterns (cite-don't-restate; structural compression). For conventions, the analog is "lift convention to canonical home, cite from elsewhere" — same shape.
- **[[CORE-EPIC-042]]** (workflow architecture rethink, 2026-05-06/07) — established the lazy-load architecture (5 SPEC modules + 3 SKILL fragments). Conventions across SPEC modules vs SKILL fragments need separate review (different role: contract vs orchestration).
- **[[CORE-EPIC-057]]** (expand-shipped-skills, closed today) — added /release, /epic-discovery, /close-epic, /file-followup. Just-landed surfaces — strong candidate for axis 7 (sibling-skill consistency drift). The 057.8 sub-task already equalized command-stub cross-refs, suggesting axis 4 (cross-references) work happened recently.
- **[[CORE-055]]** (CLAUDE-snippet review, closed today) — out of audit scope per user boundary; consume as-is.
- **[[CORE-053]] / [[CORE-052]] / [[CORE-051]] / [[CORE-050]]** — recent template + sibling-SKILL trims. Axes 5 (templates) and 7 (skills) recently swept on the *token* dimension; convention-axis findings would be orthogonal but localized.

### Open-at-promotion resolutions (2026-05-09)

- **Inspection axes:** walk all 10 (axis 7 expanded to 8 skills per drift; axis 10 viz/ = boundary-flag only, no source reads).
- **Cohort shape:** defer to post-survey decision per [[CORE-049]] precedent — pick epic vs individual tasks vs starters once finding-count and interdependence are visible.
- **Boundaries:** `claude/CLAUDE-snippet.md` consumed as-is (CORE-055 closed); `viz/` source skipped (FE-018 covers).
- **Severity threshold:** mirror [[CORE-049]]'s implicit bar — file when fix produces meaningful coherence improvement with no readability loss / no churn-for-its-own-sake / no false uniformity. Single-file convention violations get noted in audit summary; cross-surface drift patterns get filed.

**Drift check (run during promotion 2026-05-09):**

- **Skills count:** starter said "4 skills × varying lazy fragments" (axis 7) — now **8 skills** (close-epic, epic-discovery, file-followup, micro-task, new-project, release, starter-task, task) after CORE-EPIC-057 closure today. Axis 7 surface area is 2× the starter's estimate.
- **Templates:** axis 5 says "4 template files"; files-to-touch lists 5. Actual count is **5** (PLAN.md, tasknote, tasknote-micro, tasknote-README, tasknote-starter). Internal inconsistency in the starter — itself a candidate finding for the audit's "internal cross-reference accuracy" sub-axis.
- **[[CORE-055]]** now closed (CLAUDE-snippet review done 2026-05-09) — boundary becomes "consume result, don't coordinate."
- **[[CORE-054]]** and **[[CORE-EPIC-057]]** now closed — skills-expansion parallel track has settled.
- **SPEC modules:** 5 ✓ no drift (blocked, epic, model, starter, versioning).
- **[[FE-018]]** still open ✓ — boundary statement (viz/ code is out of scope) holds.

**Starter context (preserved verbatim — promotion choice 2026-05-09):**

> ### Why this exists
>
> Flowtron has accreted across 50+ tasks (CORE: 53 closed; FE: 16 closed). [[CORE-049]] audited the **token-cost axis** (workflow surfaces vs. AI context budget). This task audits the **conventions + tech-debt axis** (file naming, heading style, cross-references, code/template/SPEC/skill consistency, dead surfaces). Different axis from [[CORE-049]]; the two together cover the meta-quality picture.
>
> The user explicitly framed this as "ensure we're adhering to conventions without too much technical debt while still optimizing the repo" — a coherence sweep, not a pure code-quality sweep.
>
> ### Solution shape (preliminary — inspection axes lock at promotion)
>
> Mirror [[CORE-049]]'s audit-then-cohort model: survey → ranked findings → user walk → cohort filing → child fixes.
>
> **Preliminary inspection axes:**
>
> | # | Axis | Sample probes |
> |---|---|---|
> | 1 | File naming | hyphen vs underscore, casing, prefix consistency across `claude/skills/*`, `SPEC/*.md`, `templates/*.md` |
> | 2 | Heading style | emoji + heading level patterns across SPEC.md, SKILL.md fragments, tasknotes, templates — drift? |
> | 3 | Markdown formatting | code-fence languages, list shapes, table shapes, link-vs-cite styles, blank-line conventions |
> | 4 | Cross-references | broken/stale links, orphan files, missing back-links, wikilink consistency in tasknotes |
> | 5 | Templates | 4 template files (tasknote, starter, micro, README) + PLAN.md template — consistent shape, frontmatter parity, divider conventions? |
> | 6 | SPEC modules | 5 lazy modules (`epic`, `starter`, `blocked`, `model`, `versioning`) — consistent prose style, similar sectioning, drift since each was filed? |
> | 7 | Skill SKILL.md fragments | 4 skills × varying lazy fragments — consistent dispatch style, similar guards, similar verbosity? |
> | 8 | Cross-doc restatements | beyond [[CORE-049]] — README.md vs PHILOSOPHY.md vs MIGRATION.md vs SPEC.md surfaces; non-token coherence |
> | 9 | Dead surfaces | abandoned files, references to removed features, stale tag-message templates |
> | 10 | viz/ code conventions | (out of scope here — covered by FE-018 code/token audit; flag boundary) |
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> Whole repo, scoped per finding. Likely heavy hitters:
>
> - `SPEC.md` + `SPEC/*.md` (5 lazy modules)
> - `claude/skills/*/SKILL.md` + lazy fragments
> - `templates/*.md` (5 files)
> - `docs/*.md` (PHILOSOPHY, MIGRATION)
> - `README.md`
> - `_project/tasknote/README.md` (template + flowtron's own)
> - `claude/CLAUDE-snippet.md` (boundary with [[CORE-055]] — coordinate)
>
> ### Explicitly out of scope
>
> - Token-cost axis (covered by [[CORE-049]] and follow-ups)
> - viz/ code (covered by FE-018 code/token audit)
> - CLAUDE-snippet best-practices (covered by [[CORE-055]] — separate concern)
> - Skills expansion (covered by [[CORE-054]])
>
> This task is the **convention/coherence axis**, distinct from the token, code, snippet, and skill-expansion concerns — they're parallel tracks.
>
> ### Decisions locked at filing
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Filing shape | Starter | Pre-research/inspection-axis enumeration value worth capturing |
> | Audit model | Mirror [[CORE-049]] | Survey → ranked findings → user walk → cohort filing |
> | Axis distinction | Convention + coherence (not token cost, not code quality) | Different from [[CORE-049]] (token) and FE-018 (viz code) |
> | Multi-child shape | Decide at Phase 1 (epic vs individual tasks) | Likely epic given likely finding-count |
> | Model | opus | Cross-surface synthesis + judgment across many file types |
>
> ### Open at promotion (Phase 1 should resolve)
>
> - **Inspection axes:** confirm/trim the 10 sketched axes. (Lean: walk all 10 at survey; user prioritizes.)
> - **Cohort shape:** epic with `.1` Discovery + child fixes vs individual `/task` entries. (Lean: epic given likely finding-count and shared narrative.)
> - **Boundaries with [[CORE-055]] and FE-018:** confirm what this task does NOT touch to avoid double-work.
> - **Severity threshold:** what counts as "worth filing a follow-up" vs "noted but accepted as living-with"? Mirror [[CORE-049]]'s worth-trimming bar.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — n/a for an audit task; methodology mirrors [[CORE-049]]: per-axis section-level review, severity bar, ranked candidate list, propose-then-file with user review.
- [x] Implemented the minimal solution — section-level findings + ranked candidate list below
- [x] Updated/added tests for non-trivial behavior — n/a (audit; no code change)

**Implementation Notes:**

### Surface inventory (drift-checked at HEAD)

**Always-loaded (per `/task` invocation):** `SPEC.md`, `claude/skills/task/SKILL.md`.

**Lazy SPEC modules (5):** `SPEC/blocked.md`, `SPEC/epic.md`, `SPEC/model.md`, `SPEC/starter.md`, `SPEC/versioning.md`.

**SKILL stubs (8 — 2× starter's "4 skills" estimate):** `task`, `micro-task`, `starter-task`, `file-followup`, `epic-discovery`, `close-epic`, `new-project`, `release`.

**Lazy SKILL fragments (4):** `task/step-1.5-model-edge.md`, `task/step-3a-promote-starter.md`, `task/step-3c-resume-blocked.md`, `micro-task/step-1.5-model-edge.md`.

**Command stubs (8):** `claude/commands/{task,micro-task,starter-task,file-followup,epic-discovery,close-epic,new-project,release}.md`.

**Templates (5):** `tasknote-template.md`, `tasknote-micro-template.md`, `tasknote-starter-template.md`, `tasknote-README.md`, `PLAN.md`.

**Docs:** `README.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md` (consume-only per CORE-055 boundary).

**Self-host:** `_project/PLAN.md`, `_project/FUTURE.md`, `_project/tasknote/README.md`.

**Out of scope:** `viz/` (FE-018 boundary), `claude/CLAUDE-snippet.md` (CORE-055 boundary).

### Per-axis findings

**Axis 1 — File naming.** No filing-worthy drift. `claude/skills/*` (hyphenated lowercase), `SPEC/*.md` (lowercase single-word), `docs/*.md` (UPPERCASE), template suffix conventions all defensible. Minor: `tasknote-template.md` is the unmarked default vs `tasknote-{micro,starter}-template.md` (could be `tasknote-standard-template.md` for parity, but renaming is churn — defensible as-is).

**Axis 2 — Heading style.** Phase-emoji H2s (`📝 Phase 1`, `🛠️ Phase 2`, etc.) consistent across SPEC.md, templates, tasknotes ✓. SPEC modules + SKILLs + docs use plain H2 (no emoji) ✓ — appropriate (non-phase content). H1 patterns vary by file role and are consistent within each role. No filing-worthy finding.

**Axis 3 — Markdown formatting.** Code-fence languages (`markdown`, `sh`, untagged), tables, list shapes, bold-paragraph leads (`**Phase 1 entry.**`, `**Lifecycle:**`), block quotes (`>` callouts) — all consistent across surfaces. No filing-worthy finding.

**Axis 4 — Cross-references.** Wikilinks (`[[TASK-ID]]`) used consistently in tasknote bodies ✓. SPEC §"..." citations consistent in SKILLs ✓. `<SPEC_DIR>/x.md` vs `SPEC/x.md` used contextually appropriately (parameterized in skill prose, literal in citations) ✓. README.md "Documents" section excludes `_project/FUTURE.md` — supports axis 9 finding (orphan).

**Axis 5 — Templates.** 5 templates with consistent shape. Frontmatter parity:
- standard template: `status: not-started` (overridden to `in-progress` by `/task` SKILL Step 3b — no-op default; minor inconsistency, not filing-worthy)
- micro template: `status: in-progress`
- starter template: `status: starter` (no `due:` / `related-tasks:` fields per SPEC/starter.md "typically omitted" guidance) ✓ contract-consistent

**Axis 6 — SPEC modules.** Lazy-load preamble (`> Lazy-loaded SPEC module. Loaded by ... See SPEC.md ...`) consistent across all 5 ✓. Bold-paragraph-lead pattern dominant (`**Phase 1 entry.**`, `**Lifecycle:**`, etc.) — model.md doesn't use it but is short enough to not need it. blocked.md has one `## Viz interaction` H2 (rest of modules have none) — orphan-feeling but contextually appropriate (a separate rendering note). No filing-worthy drift.

**Axis 7 — Skill SKILL.md fragments. THREE filing-worthy findings:**

> **7a — Trailing "Date format:" bullet drift.** 7 of 8 SKILLs declare a final Notes bullet "Date format: always use `YYYY-MM-DD`...". Three exact phrasings:
> - `task`, `release`: "...for `Completed` and `Archived` fields."
> - `micro-task`: "...for `created:`, `Completed`, and `Archived` fields."
> - `starter-task`, `file-followup`, `epic-discovery`, `close-epic`: unqualified ("always use `YYYY-MM-DD`.")
> - `new-project`: missing entirely (date format isn't a new-project concern — appropriate)
>
> Cite-don't-restate pattern (per [[CORE-038]] / [[CORE-049]]). Lift to SPEC §"Tasknote frontmatter" (where `created:` lives) or §"`## Completed` archive convention" (where `Completed`/`Archived` live), drop from each SKILL.

> **7b — Command-stub cross-ref drift after [[CORE-057.8]].** [[CORE-057.8]] (closed today, "equalize command-stub sibling cross-refs") was the audit pass. Survey shows incomplete equalization:
> - `task.md`, `micro-task.md`, `starter-task.md`, `close-epic.md`: 6 sibling cross-refs ✓
> - `file-followup.md`: 4 cross-refs (missing `/epic-discovery`, `/close-epic`)
> - `epic-discovery.md`: 5 cross-refs (missing `/micro-task`)
> - `new-project.md`: 0 cross-refs (mentions only manual §2 migration; no sibling pointers)
> - `release.md`: 7 (most comprehensive — appropriate for the rare flowtron-self command)
>
> The convention seems to be "list all 6 OTHER non-release commands"; three stubs miss it.

> **7c — `step-1.5-model-edge.md` cross-fragment drift.** Two near-duplicate fragments in `claude/skills/task/` and `claude/skills/micro-task/`. micro-task version is shorter:
> - Missing the "default recommendation: opus for design / multi-file / ambiguous; sonnet for mechanical" guidance in the Legacy-entry path
> - Missing the "next time `/task` runs against this line, no question is asked" note
>
> Same SPEC contract (`SPEC/model.md`); same operational shape; just under-trimmed in micro-task. Equalize content (or extract a shared note).

**Axis 8 — Cross-doc restatements.** "6 slash commands" list appears in `docs/MIGRATION.md` §1.2, `claude/CLAUDE-snippet.md` Block, `claude/skills/new-project/SKILL.md` Steps 3 + 8, and each command stub's cross-refs. Each surface has a different audience (adopter procedure vs paste-block vs wiring vs sibling-discovery) — restatements are contextually appropriate. No filing-worthy finding (this is the same "load-bearing for X doesn't mean live in Y" lens [[CORE-037]] formalized).

**Axis 9 — Dead surfaces. ONE filing-worthy finding:**

> **9a — `_project/FUTURE.md` orphan + stale.** Three separate problems on one file:
> 1. **Orphan** — not referenced from `README.md` (which lists `SPEC.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md` as canonical docs); not referenced from any SPEC, SKILL, template, or doc. Discoverable only via filesystem walk.
> 2. **Stale content** — lists already-shipped features as "future": [[FE-002]] cross-project viz (closed 2026-05-08), dark mode ([[FE-009]] closed), wikilinks ([[FE-003]] closed), YAML frontmatter ([[CORE-017]] closed), viz polish ([[FE-013]] closed), task graph viz, richer templates. Surviving items: design filters at end, "Public starter templates gallery", "CLI/TUI companion", "task analytics".
> 3. **Stale "Last updated:" line** — `**Last updated:** 2026-04-30` at line 3. [[CORE-035]] retired this convention across the rest of the repo.
>
> Recommendation: delete entirely. Surviving design filters belong in `docs/PHILOSOPHY.md` (already covers "What flowtron is NOT"). Surviving open ideas belong in `_project/PLAN.md` `## Future Opportunities` (currently `(none)`). One file removed; PLAN.md becomes the single source of forward-looking work.

**Axis 10 — viz/ code conventions.** Out of scope (FE-018 boundary). No findings.

### Out-of-scope verdicts (with rationale per [[CORE-037]] "load-bearing for X doesn't mean live in Y" lens)

- **File naming irregularities** — `tasknote-template.md` (unmarked default) vs siblings: defensible; renaming would propagate to ~10 SKILL/SPEC/doc references for no coherence gain.
- **Standard template `status: not-started` no-op default** — overridden by `/task` SKILL anyway; the field's job is to declare the schema slot, not to drive scaffold state.
- **"Last updated:" conditional paths in `starter-task` / `file-followup` SKILLs** — guarded with "if it has one"; legacy-adopter parse path. Mostly dead post-[[CORE-035]] (templates/PLAN.md doesn't have it). Minor; defensible to leave.
- **viz/** — FE-018 boundary.
- **claude/CLAUDE-snippet.md** — [[CORE-055]] boundary; consume only.
- **Cross-doc "6 slash commands" restatement** — each surface has a different audience.

### Ranked candidate list

| # | Surface | Finding | Estimated edit | Severity |
|---|---|---|---|---|
| 1 | `_project/FUTURE.md` | Delete orphan + stale file; survivors → PLAN.md `## Future Opportunities` and PHILOSOPHY.md | 1 file deleted, 0-2 lines added elsewhere | Medium — file misleads anyone who finds it; 0 inbound refs |
| 2 | 7× `claude/skills/*/SKILL.md` (all but `new-project`) | Lift "Date format:" trailing bullet to SPEC; remove from each SKILL | 1 SPEC anchor + 7 small SKILL edits | Low-medium — token-trim sibling of [[CORE-038]] / [[CORE-049]]; clear cite-don't-restate |
| 3 | 3× `claude/commands/*.md` (`file-followup`, `epic-discovery`, `new-project`) | Equalize sibling cross-refs to match the 6-OTHER-non-release convention | 3 small stub edits | Low-medium — closes [[CORE-057.8]]'s incomplete sweep |
| 4 | `claude/skills/micro-task/step-1.5-model-edge.md` | Equalize content with `task/step-1.5-model-edge.md` (default-recommendation guidance + "next-time" note) | 1 file, +5-8 lines | Low — only fires on rare model-mismatch; small fix |

### Bundling options

| Option | Shape | Pros | Cons |
|---|---|---|---|
| **A** | 4 individual tasks (mirrors [[CORE-049]] precedent) | Independently committable; each fix scoped tight | 4 PLAN lines for a coherent audit cohort |
| **B** | 1 individual task (#1) + 1 micro/task bundling #2/#3/#4 as "sibling-drift sweep" | Cohort identity preserved; #1 is independent | Mixed task shapes; user has to track 2 |
| **C** | 1 epic with all 4 as children | Strong cohort identity | Over-structuring; no interdependencies |
| **D** | 1 task bundling all 4 as "convention/coherence cleanup" | Single PLAN line; one commit | Less granular; harder to defer one finding |

User-walk gates the choice. AI lean: **A** — matches [[CORE-049]] precedent (small, independent, sibling shape).

### User-walk decisions (2026-05-09)

- **Bundling shape:** Option A — 4 individual tasks. Mirrors [[CORE-049]] precedent.
- **FUTURE.md fate:** delete entirely; nothing migrates. PHILOSOPHY.md already covers design filters; surviving "someday-maybe" ideas were not deemed worth the PLAN.md `## Future Opportunities` shelf life.
- **new-project.md cross-refs:** equalize to 6-cross-ref convention (no exception carved).

### Filed follow-ups

| ID | Model | Shortname | Scope |
|---|---|---|---|
| [[CORE-061]] | opus | FUTURE.md cleanup | Delete `_project/FUTURE.md` (judgment about what to keep — opus) |
| [[CORE-062]] | sonnet | lift date-format bullet | 1 SPEC anchor + drop from 7 SKILLs (mechanical) |
| [[CORE-063]] | sonnet | equalize stub cross-refs | 3 stub edits (file-followup, epic-discovery, new-project) (mechanical) |
| [[CORE-064]] | sonnet | equalize step-1.5 fragments | 1 fragment edit (mechanical) |

All four under Medium priority, filed per [[CORE-049]] cohort precedent.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (audit task; deliverable is the ranked list + filed follow-ups, not code)
- [x] Ran lint/type-check on changed code — n/a (markdown only)
- [x] (frontend) Asked the user for visual confirmation — n/a (not a frontend change)

**Testing Notes:** Audit task per [[CORE-049]] / [[CORE-037]] precedent — no code, no tests, no lint targets. Phase 3 is a structural pass-through.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `README.md` — **no change.** Public-facing repo overview; the audit doesn't change the shipped surface; filed follow-ups [[CORE-061]] / [[CORE-062]] / [[CORE-063]] / [[CORE-064]] will run their own canaries at closure.
  - `SPEC.md` — **no change.** Audit doesn't modify the workflow contract; [[CORE-062]] (date-format lift) will touch SPEC at its own closure.
  - `docs/MIGRATION.md` — **no change.** Adoption + bump procedures unaffected.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter paste-block unaffected (CORE-055 boundary respected).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Audited flowtron's convention/coherence axis across all in-scope surfaces: SPEC.md + 5 lazy SPEC modules; 8 SKILL stubs + 4 lazy SKILL fragments; 8 command stubs; 5 templates; 3 docs (`README.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`); flowtron-self `_project/` (PLAN.md, FUTURE.md, tasknote/README.md). Out of scope: `viz/` ([[FE-018]] boundary), `claude/CLAUDE-snippet.md` ([[CORE-055]] boundary).

**10-axis survey:** axes 1 (file naming), 2 (heading style), 3 (markdown formatting), 4 (cross-references), 5 (templates), 6 (SPEC modules), 8 (cross-doc restatements), 10 (viz/) — no filing-worthy drift; defensible irregularities tested against the [[CORE-037]] "load-bearing for X doesn't mean live in Y" lens. Axes 7 (skills) and 9 (dead surfaces) surfaced four findings.

**Four findings filed under Medium per [[CORE-049]] cohort precedent (4 individual tasks, not an epic):**

1. **[[CORE-061]]** — `_project/FUTURE.md` cleanup. Orphan (0 inbound refs) + stale (lists shipped features as "future") + retired `**Last updated:**` line ([[CORE-035]]). User-walk decision: **delete entirely; nothing migrates**. PHILOSOPHY.md already covers design filters; surviving open ideas (CLI/TUI, gallery, analytics) declined for PLAN.md `## Future Opportunities` shelf-life.
2. **[[CORE-062]]** — Lift trailing "Date format: YYYY-MM-DD..." Notes bullet from 7 SKILL.md files into SPEC; drop from each SKILL. Cite-don't-restate sibling of [[CORE-038]] / [[CORE-049]]; clean pattern, ~7 small SKILL edits + 1 SPEC anchor.
3. **[[CORE-063]]** — Equalize sibling cross-refs in `claude/commands/{file-followup,epic-discovery,new-project}.md`. [[CORE-057.8]] (epic audit, 2026-05-09) was supposed to close this but missed three stubs (-2/-1/-6 cross-refs). User-walk: equalize new-project too (no exception).
4. **[[CORE-064]]** — Equalize `claude/skills/micro-task/step-1.5-model-edge.md` content with `task/step-1.5-model-edge.md`. micro-task version under-trimmed: missing default-recommendation guidance + "next-time no question" note in legacy-entry path.

**Bundling decision (per user):** four individual tasks (Option A in user-walk). Pattern is the same (sibling drift cleanup) but at four independent surfaces — no shared decisions, no interdependencies. Mirrors [[CORE-049]]'s three-individual-tasks outcome.

**Out of scope (with rationale):**
- File-naming irregularities (`tasknote-template.md` unmarked-default, etc.) — defensible; renames would propagate to ~10 references for no coherence gain.
- Standard template `status: not-started` no-op default — overridden by `/task` SKILL Step 3b; field declares the schema slot, not scaffold state.
- `**Last updated:**` conditional paths in `starter-task` / `file-followup` SKILLs — guarded with "if it has one"; legacy-adopter parse path; mostly dead post-[[CORE-035]] but cheap to leave.
- Cross-doc "6 slash commands" restatement (MIGRATION.md / CLAUDE-snippet.md / new-project SKILL / each command stub) — each surface has a different audience; restatements contextually appropriate.
- SPEC.md round 3 ([[CORE-039]] / [[CORE-049]] swept aggressively).
- `viz/` ([[FE-018]] boundary), `claude/CLAUDE-snippet.md` ([[CORE-055]] boundary).

**Methodological note (per [[CORE-037]] / [[CORE-049]] lens):** Each ruled-out finding tested for whether the convention should propagate or stay local. No findings miscategorized — drift that *looks* like inconsistency but is actually deliberate context-sensitive variation (e.g., command-stub `release.md` listing all 7 siblings vs other stubs listing 6) is preserved as-is.

**Doc-drift canary:** clean. No AI-referenced doc updates from the audit itself — the four filed follow-ups will each run their own canary at closure.

**Archived:** 2026-05-09
