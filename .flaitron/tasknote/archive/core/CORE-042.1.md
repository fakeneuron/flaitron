---
title: workflow architecture rethink — Discovery
status: completed
priority: Medium
area: core
tags: []
created: 2026-05-06
related-tasks: [CORE-037, CORE-038, CORE-039, CORE-040, CORE-036, CORE-041]
---

# CORE-042.1 | workflow architecture rethink — Discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-037]] [[CORE-038]] [[CORE-039]] [[CORE-040]] [[CORE-036]] [[CORE-041]]

## 🎯 Goal

Resolve the open scoping questions for CORE-EPIC-042 — module split for SPEC, workflow rigidity (micro-tasknote + phase rethink), and frontmatter/status-source-of-truth audit — and file the implementation children in PLAN.md.

## ✅ Acceptance

- [x] All 8 "Open at promotion" questions in the preserved starter context have a logged decision in Discovery Notes
- [x] Three-thrust scope confirmed (or re-scoped) with explicit ordering decision (A→C→B vs B-first vs interleaved) — A → C → B
- [x] Module boundary decided: enumerated list of always-loaded-core vs lazy-module content — A2
- [x] `/task` Step 2 dispatch sketched: which file-state branches load which modules — A2/A4 (load by file-state branch + epic-ID prefix; eager-at-branch)
- [x] Phase rethink delivered as side-by-side comparison (4-phase status quo vs continuous-flow with named gates) with a ship/propose decision — A9 (decision: PROPOSE; file as CORE-042.6)
- [x] Frontmatter audit complete: per-field verdict (keep / drop / derive) across all 8 current fields — A5 (drop `priority` + `area`; keep 6 fields)
- [x] Status-source-of-truth decided: which of YAML `status:` / nav header chip / PLAN.md checkbox is canonical — A6 (YAML canonical for tasknote state; PLAN checkbox canonical for roadmap binary; nav chip render-derived)
- [x] Major-version (v1.0) bump decision made; migration scope sketched per SPEC §"Versioning" — yes; bundle Thrusts A + C breaking changes into one major bump; migration steps in annotated tag
- [x] Implementation children filed in PLAN.md with `[model]` + shortnames; CORE-042.2 audit task renumbered to highest — filed CORE-042.2 / .3 / .4 / .5 / .6; renumbered audit .2 → .7

## 🧩 Subtasks

- [ ] Re-confirm load measurements (current PLAN.md / SPEC.md / task SKILL.md word counts vs. CORE-037 baseline)
- [ ] Section-by-section audit of SPEC.md: which sections are hot-path (every `/task`) vs cold-path (only specific file-state branches)
- [ ] Draft proposed module split with target word counts per module file
- [ ] Draft `/task` Step 2 dispatch logic for lazy module loading (eager-at-branch vs per-step-on-demand)
- [ ] Draft micro-tasknote shape (single-section template + dispatch: `/micro-task` skill vs `/task --micro` flag)
- [ ] Draft phase-rethink comparison (4-phase vs continuous-flow with named gates: Relevance → Pattern Survey → Test Pass → Recap)
- [ ] Audit each frontmatter field: viz/tooling consumers vs. derivable from PLAN/ID vs. vestigial
- [ ] Map every read-site for tasknote status (viz parser/renderer, skill file-state branches, archive index) — pick canonical source
- [ ] File implementation children in PLAN.md per resolved scope; renumber CORE-042.2 audit task to last subtask number

## 🔗 Related

- [[CORE-037]] — workflow token-cost audit; parent diagnostic that flagged the structural follow-up
- [[CORE-038]] — task SKILL.md cite-don't-restate trim; established the "cite SPEC" pattern this epic generalizes
- [[CORE-039]] — SPEC.md prose tightening sweep; demonstrated diminishing returns on prose-only trims
- [[CORE-040]] — PLAN.md filing discipline; precedent for routing context off the always-loaded surface
- [[CORE-036]] — PLAN.md `## Completed` archive strategy (starter); orthogonal but same spirit
- [[CORE-041]] — dynamic-index direction; this epic is the lazy-load half of that broader exploration

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Starter was filed today (2026-05-06) and the architectural argument got stronger between filing and promotion — PLAN.md grew +910w in the same day's work, taking the per-`/task` load to ~12,300w. Trim is depleted (CORE-038/039/040 already landed); structural shape change is the only remaining lever. No decision in the starter has been invalidated; the 8 open questions still need resolution before children can be filed.

- [x] Read relevant source files — `SPEC.md`, `claude/skills/task/SKILL.md`, `claude/skills/starter-task/SKILL.md`, `viz/src/parser.ts`, `viz/src/tasknote.ts`, `templates/tasknote-template.md`, `templates/tasknote-starter-template.md`, `_project/PLAN.md`
- [x] **Archive skim** — read [[CORE-037]] (parent diagnostic) and [[CORE-023]] (frontmatter-migration precedent) in full; sized [[CORE-038]] / [[CORE-039]] / [[CORE-040]] (already-landed trim work, conclusions known from CORE-037). Findings logged in Discovery Notes below.
- [x] **Drift check** — paths verified at promotion; section-level survey done (see Discovery Notes for hot/cold-path tagging on SPEC + task SKILL). One additional drift surfaced: `~/code/CLAUDE.md` workspace + `~/.claude/CLAUDE.md` global also load every conversation (~674w combined per [[CORE-037]]) — not in starter's scope but worth flagging since "always-loaded surface" is broader than just SPEC/PLAN/SKILL.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — all 8 starter open questions resolved en bloc (user approved survey-updated leans 2026-05-06); see synthesis table in Discovery Notes
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Survey synthesis (2026-05-06)

#### A1. Current per-`/task` load (drift-checked vs CORE-037 baseline)

| Surface | CORE-037 | Now | Δ |
|---|---|---|---|
| `_project/PLAN.md` | 4,459w | 5,369w | **+910w** |
| `SPEC.md` | 4,319w | 4,014w | -305w (CORE-039 trim landed) |
| `claude/skills/task/SKILL.md` | 2,653w | 2,319w | -334w (CORE-038 trim landed) |
| **Per-`/task` total** | **11,431w** | **~11,702w** | **+271w net** |

CORE-038/039 landed ~639w of trim, but PLAN.md grew +910w in the same window. **Net load grew.** Trim alone is now demonstrably losing to PLAN.md growth — the structural shape change is the only path to meaningful load reduction. CORE-040 (filing discipline) and CORE-036 (Completed archive) target the PLAN.md side; this epic targets SPEC + skill side.

PLAN.md decomposition: `## Completed` is 4,748w (88%); active sections (Critical/High/Medium/Low/Future Opportunities) are only 602w. **Active-PLAN trim is exhausted**; the only PLAN.md lever is the Completed-archive strategy ([[CORE-036]] starter; orthogonal per the original starter scope).

#### A2. SPEC.md section-level hot/cold-path tagging

Hot-path = always relevant per `/task` invocation regardless of file-state branch. Cold-path = only relevant on a specific branch.

**Hot-path (~2,540w of 4,014w; 63%):**

| Section | Words | Why hot |
|---|---|---|
| What is Flowtron | 47 | Frame |
| Core principles | 80 | Always invoked decisions |
| Layout in adopting projects | 92 | Step 0 path resolution |
| Working in the flowtron repo itself | 35 | Step 0 path resolution |
| Task ID convention | 85 | Step 2 area resolution |
| Task-line format | 480 | Step 1 PLAN-line parse |
| Tasknote frontmatter | 160 | Steps 3a/3b scaffold |
| Tasknote body shape | 73 | Steps 3a/3b scaffold |
| The 4-phase workflow | ~810 | Steps 4-5 driving |
| Post-closure protocol | 135 | Step 6 |
| Priority levels | 61 | Step 1 priority capture |
| When to use a tasknote (incl. filing-discipline thresholds) | 406 | Skip-tasknote check + filing thresholds at scaffold |
| What flowtron does NOT provide | 79 | Boundary check |

**Cold-path (~1,475w of 4,014w; 37%):**

| Section | Words | Triggered by |
|---|---|---|
| Epic lifecycle | 278 | Epic ID prefix (`<AREA>-EPIC-N`) |
| Starter tasknotes | 304 | `status: starter` (Step 3a) |
| Blocked tasks | 458 | `status: blocked` (Step 3c) OR mid-Phase-2 hard dep surfaces |
| Model field | 186 | Model-gate edge cases (mismatch / legacy entry) |
| Versioning | 124 | Bump tasks |
| (header) | 125 | Title/version/status |

The cold-path content is genuinely cold — most invocations never read a starter, never park a task, never bump a version. A typical fresh-task invocation skips all 5 cold sections (~1,350w). A starter promotion skips 4 (~1,050w) and uses Starter (304w).

#### A3. task SKILL section-level hot/cold-path tagging

Hot-path (~1,424w of 2,319w; 61%): H1+intro, Step 0, Step 1, Step 2, Steps 4-5-6, Notes.
Cold-path (~895w of 2,319w; 39%):

| Step | Words | Triggered by |
|---|---|---|
| Step 1.5 model-gate (mismatch + legacy branches) | ~150 of 231 | Active model ≠ PLAN `[model]`, OR PLAN line has no `[model]` |
| Step 3a — Promote a starter | 414 | `status: starter` |
| Step 3b — Scaffold a fresh tasknote | 148 | File absent |
| Step 3c — Resume a blocked tasknote | 184 | `status: blocked` |

Branch exclusivity: every invocation hits exactly one of {3a, 3b, 3c, "stop because in-flight/closed"}. So at minimum, Step 3a + 3b + 3c can be lazy-loaded by branch — saving ~600w no matter which branch is taken. Step 1.5 mismatch/legacy bodies are also lazy-eligible.

#### A4. Lazy-load potential (combined SPEC + task SKILL)

| Branch | SPEC saving | SKILL saving | Total saving | % of 11,702w |
|---|---|---|---|---|
| Fresh task (Step 3b) | ~1,350w (skip Epic/Starter/Blocked/Model-edge/Versioning if not bump) | ~600w (skip 3a + 3c) | ~1,950w | **~17%** |
| Starter promotion (Step 3a) | ~1,050w (skip Epic/Blocked/Model-edge/Versioning, load Starter) | ~480w (skip 3b + 3c, load 3a's mid-section if scaffold-only context) | ~1,500w | ~13% |
| Blocked resume (Step 3c) | ~890w (skip Epic/Starter/Model-edge/Versioning, load Blocked) | ~560w (skip 3a + 3b) | ~1,450w | ~12% |
| Epic with subtask | ~1,070w (skip Starter/Blocked/Model-edge/Versioning, load Epic) | varies | varies | ~9-13% |

Saving ~17% on the most common branch (fresh task) is meaningful. Compounds with future PLAN.md trim if [[CORE-036]] lands.

#### A5. Frontmatter consumer audit (per `viz/src/tasknote.ts`)

Current frontmatter has 8 fields after the v0.2.0 `model:` retirement. Per-field audit:

| Field | Consumer in viz | Required by `parseFrontmatter`? | Derivable from elsewhere? | Verdict |
|---|---|---|---|---|
| `title` | `title` getter; row title fallback | yes (line 68) | partially (PLAN shortname is similar) | **Keep** — H1 source of truth, distinct from PLAN shortname for tasks with rich titles |
| `status` | enum-validated; status badge driver | yes (line 68); enum-checked (line 69) | partially (PLAN checkbox = subset; nav header chip mirrors) | **Keep YAML canonical**; derive nav-header chip at render time (see A6) |
| `priority` | bucket viz rows | yes (line 68) | yes (PLAN.md section heading; parser.ts:156 already reads it from there) | **Drop** — already derivable; viz has both readers, can collapse to one |
| `area` | required on parse; archive subfolder name; not consumed elsewhere in viz | yes (line 68) | yes (ID prefix → area; SPEC §"Task ID convention" mapping) | **Drop** — pure derivation; only string-typed for free-form domain prefixes (`OCR-`), and those are declared in `_project/tasknote/README.md` anyway |
| `tags` | filter chips (potentially) | no | no | **Keep** — free-form, not derivable |
| `created` | display, freshness | yes (line 68) | partially (git first-commit date) | **Keep** — explicit > git-dependent; tiny |
| `due` | display | optional | no | **Keep** — explicit deadline marker |
| `related-tasks` | wikilink chips on row | no (defaults to `[]`) | partially (PLAN long-description `[[wikilinks]]`; parser.ts:150 already reads them) | **Decide**: drop if PLAN.md long-description wikilinks are sufficient (they are for filed tasks); keep for tasknote-author-curated cross-refs that don't appear in the PLAN line |

Net audit: **drop `priority`, drop `area`** (both fully derivable; both have viz readers already in PLAN-line parser). `related-tasks:` is a judgment call — leaning **keep** because the tasknote often surfaces relations that the PLAN line doesn't mention (e.g., "this task referenced predecessor X mid-execution"; the PLAN line is filed before that context exists).

Resulting frontmatter: 6 fields (`title / status / tags / created / due / related-tasks`).

#### A6. Status read-site map

`status:` lives in **3 places** and is read in **6**:

**Sources of truth:**
1. YAML `status:` (canonical for tasknote-bearing rows)
2. PLAN.md checkbox `- [ ]` / `- [x]` (canonical for whole-task completion)
3. Nav header chip (`🟢 In progress` / `✅ Completed` / `⏸ Blocked` / `⚪ Not started` / `🌱 Starter`)

**Read sites:**
1. `viz/src/tasknote.ts:68` — `parseFrontmatter` requires + enum-checks YAML
2. `viz/src/tasknote.ts:135` — `parseTasknote` returns `frontmatter.status` to UI
3. `viz/src/parser.ts:146` — PLAN-line `[ ]` / `[x]` becomes `Task.completed`
4. `claude/skills/task/SKILL.md` Step 1 — checks PLAN-line checkbox (status gate)
5. `claude/skills/task/SKILL.md` Step 2 — branches on YAML `status:` (4-way)
6. Nav header chip (currently authored manually at scaffold + flipped at closure)

**Phase 4 closure** updates 3 of these (PLAN checkbox flip, YAML status:completed, nav chip ✅). Sync drift cost is real — three writes for a single state transition.

**Audit verdict:**

- **YAML `status:` stays canonical** — viz already reads it; enum-validates it; it's the only source that distinguishes the 5-state lifecycle (`starter / not-started / in-progress / blocked / completed`). PLAN checkbox is binary (open / completed). Nav chip is rendering.
- **PLAN checkbox stays canonical for "task is closed in roadmap"** — different question than tasknote status; binary by design. The `[x]` carries `Completed YYYY-MM-DD.` for the roadmap reader.
- **Nav header chip becomes derived** — render time. The chip is what mirrors YAML status into the human-readable nav row; deriving it at render lets Phase 4 closure update only YAML + PLAN checkbox. This is the structural simplification.

Deriving the nav chip means viz renderers compute it on parse; for hand-read tasknote files (the AI reading without viz), the chip text in the file is a stable historical signal but no longer needs human/AI maintenance — it can be regenerated on next `/task` open if it ever drifts. **Trade-off:** in-flight tasknote files that get opened in non-viz markdown editors render the literal chip text; if YAML status changes without chip update, the file shows stale chip text. Mitigation: Phase 4 closure-flip can stay one extra tick for editor parity, or we accept that the file is internally inconsistent for the brief window between status flip and next render. Prefer the latter — write-once policy on archived tasknotes mostly insulates the historical record.

#### A7. Skill overlap: `/starter-task` filing vs `/task` Step 3a promotion

Both skills munge frontmatter and write the same field set. Looking at line counts: `/starter-task` is 130 lines, `/task` Step 3a is 414w (~50 lines of the 172-line task SKILL).

Overlap surface:
- Frontmatter writing — both compute `area` (ID prefix), `priority` (current PLAN section), `created` (today). `/starter-task` writes them at filing; `/task` reads + leaves them on promotion.
- PLAN.md munging — `/starter-task` appends the line at filing; `/task` Step 3a doesn't touch the line (the line is preserved through promotion).
- Pre-flight checks — both compute the same path-resolution + ID-uniqueness gates.

Consolidation candidates:
- A shared "resolve flowtron paths" sub-skill or shared boilerplate (Step 0 in both).
- A shared "compute area + priority + created from ID + PLAN.md + today" sub-skill (Step 1 in both).
- The /starter-task and Step 3a paths still need to stay separate at the user-entry layer (different commands, different intent: `/starter-task` files a NEW task; `/task` STARTS or PROMOTES). Consolidation is at the procedural level, not the surface level.

Lean: **defer skill consolidation to a separate task** outside this epic. Saving 50-100w of duplicated procedure across two skills is small relative to the SPEC modularization win, and the two skills serve genuinely different user intents.

#### A8. Migration playbook reference (per [[CORE-023]] precedent)

Retiring a frontmatter field touches ~10 files: viz parser, parser tests, tasknote parser, tasknote tests, App.tsx, template, PLAN template, README, SPEC, /task SKILL. Same fan-out per field. Active PLAN.md migration is done at end of Phase 2 after parser ships. Archived tasknotes are write-once: `parseFrontmatter` tolerates legacy fields (gray-matter passes through; type narrowing drops). This is a known cost — bundling `priority` + `area` retirements into a single child task saves duplicating the fan-out.

#### A9. Phase rethink: 4-phase status quo vs continuous-flow with named gates

**Status quo: 4-phase workflow (current SPEC §"The 4-phase workflow")**

Four named H3 phases, each with its own checklist:
- 📝 Phase 1: Discovery (7 boxes — review PLAN line, Relevance Assessment, read sources, archive skim, drift check, clarifying questions, populate subtasks)
- 🛠️ Phase 2: Execution (4 boxes — pattern survey, implement, tests, targeted run)
- 🧪 Phase 3: Testing & Linting (4 boxes — targeted suite, lint/typecheck, visual confirmation, fix introduced issues)
- 🚀 Phase 4: Closure (6 boxes — verify prior, update docs, flip PLAN, update nav, archive, recap)
- Total: 21 boxes across 4 named phases.

Pros: predictable, named gates make partial progress legible, well-suited for AI driving the flow with deterministic state transitions. Viz hard-codes 4 phases (`viz/src/tasknote.ts:135`: `[1,2,3,4].map(...)`) — phase count is a structural assumption.
Cons: Phase 3 is often a no-op for non-code tasks (audits, doc patches — see [[CORE-037]] Phase 3 = "structural pass-through"); Phase 4 has 6 boxes that could be 3-4 with status-flip simplification (CORE-042.4 already trims one); ceremony scales by phase count, not task size.

**Alternative: continuous-flow with named gates**

One unified checklist, gates in cognitive order rather than phased. Sample gate set (drawn from the existing 21 boxes, deduplicated):

- [ ] PLAN line reviewed
- [ ] Relevance Assessment: Proceed / Re-scope / De-scope
- [ ] Sources read
- [ ] Archive skim
- [ ] Drift check
- [ ] Clarifying questions OR explicit assumptions logged
- [ ] Subtasks populated
- [ ] Pattern survey
- [ ] Minimal solution implemented
- [ ] Tests added/updated
- [ ] Targeted tests pass
- [ ] Lint/typecheck pass
- [ ] Visual confirmation (frontend only)
- [ ] Docs/inventories updated
- [ ] PLAN flipped + tasknote archived
- [ ] Recap with user

Total: 16 gates (vs 21), reduction comes from collapsing "verify all prior phases complete" (Phase 4 box 1; redundant with prior boxes), nav-header status update (CORE-042.4 derives), targeted-tests-on-changed-files (Phase 2 + Phase 3 partly redundant), and "fixed all introduced issues" (an outcome, not a step).

Pros: less ceremony; gates appear in the order the brain actually traverses them (no jumping back to Phase 4 after a Phase 3 fix); micro-tasks (Thrust B.1) can drop irrelevant gates without inventing a new template; non-code tasks naturally skip lint/test gates; Phase 4 ceremony reduces.
Cons: viz refactor needed (no `[1,2,3,4]` indexing — viz needs to count gates as a flat list, with optional "phase tags" for backwards compat); harder to track partial progress at-a-glance ("3 of 4 phases done" is more legible than "11 of 16 gates done"); existing 25+ archived tasknotes hard-code the 4-phase shape (write-once policy preserves them, but new readers may find the inconsistency jarring); harder to write deterministic skill instructions ("drive Phase 1 to completion before Phase 2" is explicit; "drive gates to completion" is vaguer).

**Hybrid (third option, falls naturally out of the survey):**

Keep 4 phases as the structural shape; sweep the per-phase checklists for redundancy and let micro-tasks (CORE-042.5) declare "skip phase 3 entirely, no code changed" via a template variant. This is the **conservative** evolution: it captures the "ceremony for non-code tasks" win without breaking viz, write-once archives, or the phase-counting mental model.

**Decision: PROPOSE (file CORE-042.6 as Discovery on the rethink).**

The continuous-flow gain is real (~25% gate-count reduction; cognitive-order gates) but the costs are non-trivial:
1. **Viz refactor** breaks the `[1,2,3,4]` phase-counting assumption. Not insurmountable but out of scope for a SPEC-side change.
2. **Archive consistency** — 25+ archived tasknotes hard-code the 4-phase shape. Write-once preserves them, but the inconsistency between archive and active will be visible in viz forever.
3. **AI deterministic driving** — `/task` SKILL.md currently relies on phase boundaries to gate behavior ("Do not enter Phase 2 until every Phase 1 box is ticked"). A flat list weakens that.
4. **The hybrid captures most of the win** — ceremony reduction for non-code tasks lands via CORE-042.5 (micro-tasknote variant) without breaking viz or archives.

Recommended path: ship the hybrid (Phase 4 simplification via CORE-042.4 + micro-tasknote variant via CORE-042.5), and **defer the radical rethink to a separate Discovery (CORE-042.6)** that revisits whether continuous-flow is worth the viz/skill rewrite *after* the easier wins land. The radical rethink may look smaller-or-larger from the post-A/post-C vantage point.

Net: the side-by-side comparison is delivered (above); the ship/propose decision is **propose** — file CORE-042.6 as a Discovery task; do not commit to flat-list now.

### Promotion drift check (2026-05-06):

- PLAN.md grew from 4,459w (per CORE-037 baseline) to 5,369w (+910w / +20%). Total per-`/task` load is now ~12,300w (was ~11,400w). Architectural argument is stronger, not weaker.
- Starter says "Frontmatter has 9 fields" including `model:`. Current template is 8 fields; `model:` is already gone (CORE-023 precedent landed). The starter acknowledges this in the same paragraph — minor numeric inconsistency only, audit scope is 8 fields: `title / status / priority / area / tags / created / due / related-tasks`.
- Starter's "Related" prose section lists one extra ID (CORE-023) that's not in the frontmatter `related-tasks:`. CORE-023 is referenced in-body as the frontmatter-migration precedent for Thrust C and remains load-bearing for that thrust; preserved verbatim below. Frontmatter mirror policy keeps it out of the formal Related section above.

**Preserved starter context (verbatim, captured 2026-05-06):**

> _Captured 2026-05-06 during a prophylactic architecture review. User asked whether flowtron's whole workflow is over-engineered, AI-optimized, and whether context is being bloated. After surveying SPEC + PLAN + task SKILL + the recent [[CORE-037]] audit and the trims it spawned, four direction-setting questions resolved scope. This starter captures the diagnostic, the user's decisions, and the open questions Discovery should resolve before children are filed._
>
> ### Why this exists
>
> [[CORE-037]] measured the per-`/task` load at ~11,400 words (PLAN.md 4,459 + SPEC.md 4,014 + task SKILL.md 2,319) and spawned [[CORE-038]] / [[CORE-039]] / [[CORE-040]], landing ~1,099w of trim. Further prose-trim has diminishing returns. The unrealized win is **shape, not size**: every `/task` invocation pays the full entry tax, even though most tasks never touch starters, blocked-task lifecycle, epic machinery, model-gate edge cases, or filing-discipline thresholds. A 4-line typo fix pays the same load as a multi-child epic.
>
> User framing: prophylactic. The system *feels* heavy and the question is whether the architecture is earning its keep — not whether to ship a feature. Optimize for long-term clarity over short-term token wins.
>
> ### Solution shape
>
> Three complementary thrusts. Discovery should size each, propose ordering, and file children.
>
> **Thrust A — SPEC modularization (always-loaded core + lazy modules)**
>
> Split `SPEC.md` into a tight always-loaded core plus on-demand sub-docs that the `/task` skill loads only when the file-state branch (Step 2) hits the relevant shape:
>
> - **Core (always loaded):** principles, layout in adopting projects, task-ID convention, task-line grammar, 4-phase headings (no body), post-closure protocol, what-flowtron-does-NOT-provide. Target: ≤1,500w.
> - **Modules (lazy loaded):** `SPEC/epics.md` (epic lifecycle), `SPEC/blocked.md` (blocked-task two-signals + resume), `SPEC/starters.md` (starter shape + promotion), `SPEC/model-gate.md` (model field + Step 1.5 contract), `SPEC/filing-discipline.md` (≤50w/70w cap), `SPEC/frontmatter.md` (YAML schema), `SPEC/body-shape.md` (spec-on-top + log-below).
> - **Skill dispatch:** `/task` Step 2 already branches on file state — extend to load only the relevant module(s). E.g., `status: starter` → load `SPEC/starters.md`; `status: blocked` → load `SPEC/blocked.md`; epic ID prefix → load `SPEC/epics.md`.
> - **Discoverability:** SPEC.md becomes a thin index pointing at modules; the always-loaded core sits inline. Markdown vault tooling (Obsidian) still gets one repo-root entry point.
>
> Likely a **major version bump (v1.0 candidate)** — additive on the always-loaded surface but breaking if anything moves out of `SPEC.md` that adopters cite directly. Migration is a deliberate submodule re-read.
>
> **Thrust B — workflow rigidity (micro-tasknote + phase rethink)**
>
> Two complementary moves; user wants both on the table.
>
> - **Micro-tasknote shape:** a single-section tasknote (do-the-work + recap) for tasks above the skip-tasknote threshold but under ~30 min of effort. Inline drift-check + relevance assessment (one paragraph), no Phase 3 boilerplate when no code changed (audits, doc patches), one closure step. SPEC carve-out + either a new `/micro-task` skill or a `/task --micro` flag.
> - **Phase rethink:** question whether 4 named phases is the right primitive at all. Discovery should produce a side-by-side comparison: 4-phase status quo vs. continuous-flow with named gates (Relevance Assessment → Pattern Survey → Test Pass → Recap). Goal is the same contract in less ceremony.
>
> Non-negotiable contracts that must survive any shape: relevance assessment, drift check, archive skim, pattern survey.
>
> **Thrust C — frontmatter + status-duplication audit**
>
> Status currently lives in **three places**: YAML `status:`, nav header chip (`🟢 In progress` / `✅ Completed` / `⏸ Blocked`), and PLAN.md checkbox. Phase 4 closure explicitly requires updating two of them; PLAN.md flip is a third. Sync drift is a real cost.
>
> Frontmatter has 9 fields: `title`, `status`, `priority`, `area`, `model`, `tags`, `created`, `due`, `related-tasks`. `model:` was already moved to the PLAN line ([[CORE-023]] precedent). `priority:` is derivable from PLAN.md section heading; `area:` is derivable from the ID prefix. Audit which fields are load-bearing for viz/tools vs. vestigial.
>
> `/starter-task` and `/task` Step 3a (promotion) overlap heavily on frontmatter writing and PLAN.md munging — candidate for consolidation.
>
> ### Files to touch (preliminary survey — drift-check at promotion)
>
> - `SPEC.md` → split into thin index + `SPEC/` sub-docs (Thrust A). Major restructure.
> - `claude/skills/task/SKILL.md` → Step 2 dispatch loads relevant module(s); Step 3a/3c paths cite their respective modules instead of inline procedure (Thrust A). New micro-task path or flag (Thrust B).
> - `claude/skills/starter-task/SKILL.md` → possibly merged into `/task`; possibly de-duped against Step 3a (Thrust C).
> - `claude/skills/new-project/SKILL.md` → adoption flow may need updating if SPEC is no longer one file.
> - `templates/tasknote-template.md` → possibly micro-tasknote variant; possibly status-derivation simplification (Thrust C).
> - `templates/tasknote-starter-template.md` → audit for fields that drop out under Thrust C.
> - `viz/src/parser.ts` and `viz/src/tasknote.ts` → frontmatter changes ripple; status-source-of-truth changes ripple to badge rendering.
> - `templates/PLAN.md` → possibly status-source-of-truth changes (Thrust C).
> - `docs/MIGRATION.md` → major-version migration notes (Thrusts A + C).
> - `claude/CLAUDE-snippet.md` → adoption snippet may need updating.
> - Adopting projects' CLAUDE.md (`photard`, `natabula`, etc.) — re-read on submodule bump; no in-place edits from here.
>
> ### Explicitly out of scope
>
> - **PLAN.md `## Completed` archive strategy** — already filed as [[CORE-036]] (starter). Orthogonal: reduces PLAN.md size; not blocked by this epic and not blocking it.
> - **Cross-project visualizer** ([[FE-002]]) — separate viz roadmap; out of architecture scope.
> - **Dynamic frontmatter index / Dataview-style queries** ([[CORE-041]]) — Future Opportunity; this epic is the "lazy-load" half but the dynamic-query half is downstream.
> - **In-flight tasknote bodies** — variable cost is task-author authoring, not structural; per [[CORE-037]] finding.
> - **Adopting-project content** — flowtron-side changes only; adopters bump deliberately.
>
> ### Decisions locked in this conversation
>
> | Decision | Choice | Rationale |
> |---|---|---|
> | Epic scope | AI-context architecture rethink | Highest leverage; trim has diminishing returns post-CORE-038/039/040 |
> | Lazy-load shape | Split SPEC into core + modules | Preserves human-readable single-file entry point via index; biggest unrealized win |
> | Workflow rigidity | Both micro-tasknote AND phase rethink | User flagged them as complementary, not either/or |
> | Motivation | Prophylactic; long-term clarity over short-term wins | Sets bias toward clean architecture over quick savings |
>
> ### Open at promotion (Phase 1 should resolve)
>
> - **Module boundaries** — exact split between always-loaded core and lazy modules. Lean: principles + layout + task-ID + task-line grammar + 4-phase skeleton (no body) + post-closure + NOT-provided list = core. Everything else lazy.
> - **Skill dispatch granularity** — does `/task` load modules eagerly at Step 2 (post-branch) or per-step on demand? Lean: Step 2 loads what the file-state branch needs; Step 4+ stays in the loaded set.
> - **Thrust ordering** — A first (foundation), then C (frontmatter), then B (workflow rigidity)? Or B first (smaller, faster feedback)? Lean: A first; B and C ride on the new module shape.
> - **Micro-tasknote: new skill vs `/task --micro`** — separate skill is more discoverable; flag is leaner. Lean: separate skill `/micro-task` mirroring `/starter-task`'s shape.
> - **Phase rethink: ship or just propose?** — Discovery may conclude the 4-phase shape is the right primitive after side-by-side. Lean: produce the comparison, decide at filing.
> - **Status-source-of-truth** — drop YAML status (PLAN.md checkbox + nav header derived) or drop nav header (YAML + PLAN are canonical, viz renders chip)? Lean: keep YAML as canonical (viz already reads it); derive nav header at render time so closure only updates one place.
> - **Frontmatter audit** — which fields drop, which stay? Lean: drop `priority` (derivable from PLAN section), drop `area` (derivable from ID prefix); keep title/status/tags/created/due/related-tasks.
> - **Major version bump** — is this v1.0? Lean: yes. Annotated tag with explicit migration steps per SPEC §"Versioning" major-bump contract.
> - **Back-compat for in-flight tasks** — additive module split is back-compat (core has same headings; modules are extra). Status-source-of-truth and frontmatter changes are breaking; gate behind major bump and leave archived tasknotes write-once per existing policy.
>
> ### Related (from starter; CORE-023 in-body, not in frontmatter mirror)
>
> - [[CORE-037]] — workflow token-cost audit; parent diagnostic. This epic implements the structural follow-up the audit flagged but ruled out as too big for that pass.
> - [[CORE-038]] — task SKILL.md cite-don't-restate; already-landed prose trim that establishes the "cite SPEC" pattern this epic generalizes.
> - [[CORE-039]] — SPEC.md prose tightening sweep; already-landed prose trim; further section-level trim has diminishing returns.
> - [[CORE-040]] — PLAN.md filing discipline; precedent for routing context off the always-loaded surface.
> - [[CORE-036]] — PLAN.md `## Completed` archive strategy (starter); orthogonal but in the same spirit.
> - [[CORE-041]] — dynamic-index direction; this epic is the "lazy-load" half of that broader exploration.
> - [[CORE-023]] — moved `model:` from frontmatter to PLAN line; precedent for frontmatter-field migration in Thrust C.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed [[CORE-037]] precedent for epic-Discovery filing: scope-and-file deliverable lives in this tasknote's Discovery Notes; PLAN.md children carry one-line scoping summaries with §-anchor pointers back to the Discovery surveys (mirrors CORE-037's CORE-038/039 filing). Section-anchor citations (`§A2+A4`, `§A5+A8`, etc.) inside PLAN long descriptions are a new shape — justified because the Discovery Notes are unusually structured (lettered sub-sections) and the children deliberately lean on specific surveys rather than the whole tasknote.
- [x] Implemented the minimal solution — filed CORE-042.2 / .3 / .4 / .5 / .6; renumbered audit (was CORE-042.2) → CORE-042.7. CORE-042.1 PLAN line had `(starter)` suffix dropped (stale after promotion).
- [x] Updated/added tests for non-trivial behavior — n/a (no code change; this is an epic-Discovery filing task)
- [x] Ran targeted tests on changed files — n/a (no code change)

**Implementation Notes:**

Filing summary (PLAN.md lines 22-29):

| ID | Title | Thrust | Notes |
|---|---|---|---|
| CORE-042.1 | discovery | — | This tasknote; in-progress |
| CORE-042.2 | SPEC modularization | A | Foundation; major-bump-eligible when bundled with .3/.4 |
| CORE-042.3 | frontmatter audit | C | Drop `priority:` + `area:`; CORE-023-pattern migration |
| CORE-042.4 | status source-of-truth | C | Nav chip render-derived; closure 3→2 writes |
| CORE-042.5 | micro-tasknote | B | New `/micro-task` skill + template variant |
| CORE-042.6 | phase rethink Discovery | B | Revisit continuous-flow comparison post-A/post-C |
| CORE-042.7 | audit | — | Was .2; renumbered per epic convention |

Each child PLAN line ≤50w (verified word-count); rich context lives in this tasknote's Discovery Notes via §-anchor citations.

Out-of-epic items recorded but not filed (per Discovery decisions):

- **`~/.claude/CLAUDE.md` + `~/code/CLAUDE.md`** — already lean per [[CORE-037]]; ruled out of this epic's scope.
- **`/starter-task` ↔ `/task` Step 3a procedural consolidation** (~50-100w of duplicated boilerplate) — deferred outside this epic. Could file as a separate Future Opportunities entry post-closure if user wants; otherwise left implicit since the saving is small and the user-entry intents are different.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — n/a (no code changed; epic-Discovery task)
- [x] Ran lint/type-check on changed code — n/a (no code changed)
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI change)
- [x] Fixed all introduced issues — n/a

**Testing Notes:** Audit-shape Phase 3 pass-through; mirrors [[CORE-037]] structure. Sanity check: `grep CORE-042 _project/PLAN.md` confirms 7 lines (epic + 6 subtasks + audit) all under priority `## Medium`.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — PLAN.md updated: filed CORE-042.2/.3/.4/.5/.6 under `## Medium` as children of CORE-EPIC-042; renumbered audit (was .2) → .7; flipped CORE-042.1 to `[x]` in place under the epic per subtask-closure convention. Parent epic line stays open per SPEC §"Epic lifecycle".
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Updated nav header status icon to ✅ Completed
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.1 was an epic-Discovery task whose deliverable was to settle the 8 open questions in the [[CORE-042.1]] starter and file the implementation children for [[CORE-EPIC-042]] (workflow architecture rethink). All 8 open questions resolved en bloc with survey-updated leans; filed 5 implementation children + renumbered the audit task.

**Survey punchlines logged in Discovery Notes:**

- **Net per-`/task` load grew despite trim** — [[CORE-038]]/[[CORE-039]] landed 639w of trim, but PLAN.md grew +910w in the same window (5,369w current vs 4,459w baseline). Net: +271w (~12,300w now). Trim alone is losing to PLAN.md growth; structural change is the only path. (§A1)
- **Active-PLAN trim is exhausted** — PLAN.md is 88% `## Completed` (4,748w) vs 602w of active sections. Only [[CORE-036]]'s Completed-archive lever moves it.
- **Lazy-load math** — SPEC is 63% hot / 37% cold; task SKILL is 61% hot / 39% cold. Combined saving on the most common branch (fresh task): ~1,950w / ~17%. (§A2-A4)
- **Frontmatter audit** — `viz/src/tasknote.ts` requires 5 fields (`title/status/priority/area/created`); `priority` is already derived in `parser.ts:156` from PLAN section heading; `area` is fully derivable from ID prefix and has no `parser.ts` consumer. Drop both. (§A5)
- **Status duplication** — lives in 3 places (YAML / PLAN checkbox / nav chip), read in 6. Phase 4 closure currently writes 3 of them. Decision: YAML canonical for tasknote state, PLAN checkbox canonical for roadmap binary, nav chip becomes render-derived → closure flips 2 places instead of 3. (§A6)
- **Phase rethink: PROPOSE not SHIP** — produced side-by-side comparison (4-phase 21 boxes vs continuous-flow 16 gates). Continuous-flow gain is real (~25% gate reduction; cognitive-order traversal) but viz refactor cost (`[1,2,3,4]` phase indexing in `viz/src/tasknote.ts:135`) + 25-archive consistency cost + AI deterministic-driving cost combine to make it propose-not-ship. Hybrid (Phase 4 simplification via .4 + micro-tasknote variant via .5) captures most of the win without breaking viz. Filed [[CORE-042.6]] as a Discovery task to revisit post-A/post-C. (§A9)

**Children filed (PLAN.md lines 22-29):**

| ID | Title | Thrust |
|---|---|---|
| CORE-042.2 | SPEC modularization | A (foundation) |
| CORE-042.3 | frontmatter audit | C |
| CORE-042.4 | status source-of-truth | C |
| CORE-042.5 | micro-tasknote | B |
| CORE-042.6 | phase rethink Discovery | B |
| CORE-042.7 | audit | — (was .2; renumbered) |

Thrust ordering A → C → B confirmed. Major-version (v1.0) bump planned when Thrusts A + C breaking changes bundle. Annotated tag will list explicit migration steps per SPEC §"Versioning".

**Method note:** Survey-first / decide-second was a clean choice — running the section-by-section hot/cold-path tagging on SPEC + task SKILL surfaced concrete word counts that turned 8 abstract leans into single-answer questions. The section-anchor citation pattern (`§A2+A4`, `§A5+A8`, etc.) inside child PLAN long descriptions is new shape; justified because the child tasks deliberately inherit specific surveys rather than the whole tasknote. Pattern survey precedent: [[CORE-037]] filed CORE-038/039 with similar shape (parent diagnostic, children scope-and-file by reference).

**Out-of-epic items recorded but not filed:**

- `~/.claude/CLAUDE.md` + `~/code/CLAUDE.md` (~674w combined, every conversation) — already lean per [[CORE-037]]; ruled out of epic scope.
- `/starter-task` ↔ `/task` Step 3a procedural consolidation (~50-100w of duplicated boilerplate) — deferred; user-entry intents differ; small saving relative to A.

**Archived:** 2026-05-06
