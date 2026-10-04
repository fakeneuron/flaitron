---
title: graph-lite planning audit
status: completed
tags: []
created: 2026-08-17
due:
related-tasks: [CORE-EPIC-445, CORE-445.1, CORE-445.2, CORE-445.3, CORE-445.4, CORE-445.5]
touches:
  - SPEC/blocked.md
---

# CORE-445.N | graph-lite planning audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-445]]

## 🎯 Goal

Verify the completed `CORE-EPIC-445` (`graph-lite planning`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-445.N — audit CORE-EPIC-445` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-445.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-445.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-445` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-445.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-445]] — parent epic: graph-lite planning
- [[CORE-445.1]] — Discovery: locked omit-when-absent YAML + Fan-out + archive edges + trivial viz overlay
- [[CORE-445.2]] — yaml surface: three planning keys on templates + SPEC
- [[CORE-445.3]] — epic-worktree fan-out + warn-only start + no-runtime guardrail
- [[CORE-445.4]] — archive decision links: typed Related + later-note `supersedes:`
- [[CORE-445.5]] — related-decision: viz overlay that `SPEC/blocked.md`'s viz sentence must match

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-445.N`. All five implementation children closed 2026-08-17 (`.1`–`.5`); no open siblings; early-audit gate N/A. Parent `CORE-EPIC-445` still under `## Medium`.

- [x] Read relevant source files — archived `CORE-445.1`–`.5`; live templates (four, commented planning keys); `SPEC.md` frontmatter / Related / Fan-out / PR archetypes; `SPEC/epic.md` Fan-out; `SPEC/blocked.md` third-signal + viz sentence; `SPEC/procedures/ft-task.md` YAML echo; skills `ft-epic-discovery` / `ft-task` / `ft-worktree-start` / `ft-micro-task`; `docs/WORKTREES.md` / `VISION.md` / `EXTERNAL-AGENTS.md` / `PHILOSOPHY.md` / `GLOSSARY.md` / `MIGRATION.md`; viz `tasknote.ts` / `RelatedChip` / `TaskRowInner` / `TaskDetail` / `visibilityPrefs`

- [x] **Best Practices Review** — N/A (audit is verification over existing deliverables; one in-scope stale-phrase fix in `SPEC/blocked.md` if Discovery confirms it)

- [x] **Archive skim** — cohort archives are the primary inventory. Load-bearing non-cohort context already cited by children: [[CORE-417]] (⚠️ factual-false only; no `superseded-by:`; no backfill), [[CORE-215.1]] / [[CORE-215.6]] (parallel execution = worktrees), [[CORE-352.4]] (EXTERNAL-AGENTS rejects fan-out/swarm runtime), [[CORE-098.3]] (opt-in RelatedChip), [[FE-031]] (deleted always-on BlockerChip), [[CORE-039]] (SPEC cites template, no schema dump), [[CORE-075]] (Related YAML = bare IDs). No extra non-cohort re-read required.

- [x] **Drift check** — HEAD still matches each child's shipped shape:
  - Four templates comment `touches` / `blocked-by` / `parallel-safe-with` / `supersedes` (no live empty arrays); starter `### Files to touch` intact; Related examples carry type-hint parenthetical
  - `SPEC.md` documents four omit-when-absent keys, Related type-hints (YAML mirrors vs prose-only `depends-on:` / `related-decision:`), `## 🌳 Fan-out` optional insert, 8th PR archetype (graph / multi-agent execution runtimes)
  - `SPEC/epic.md` serial default + Fan-out section + child YAML echo + warn-only start
  - `SPEC/blocked.md` third-signal paragraph present; **viz sentence still claims a chip on every row** — false at `.2` (parsed, unused) and still false after `.5` (opt-in, default off). Inline-fix candidate
  - `/ft-epic-discovery` injects Fan-out when M>1; `/ft-task` Step 3b + SOP echo YAML; `/ft-worktree-start` warn-only `blocked-by` vs open PLAN `- [ ]`; Codex wrapper remains a pointer
  - `docs/WORKTREES.md` three-surface table; VISION / EXTERNAL-AGENTS / PHILOSOPHY / GLOSSARY / MIGRATION updated
  - Viz: `parseFrontmatter` maps four keys omit-when-absent; `rowChips.blocked` default false; TaskDetail `planningMetaRows`; no new `Task` fields; no graph view
  - Archived `CORE-445.1` has no `## 🌳 Fan-out` — write-once; `.3` locked no backfill
  - PLAN epic still under `## Medium`; children stubs nested; `.N` was the open audit line

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) full-cohort audit (all five implementation children closed); (2) missing Fan-out on archived `.1` is write-once, not a miss; (3) `ft-new-project` / README vault lists of live YAML fields stay accurate (optional keys are comments, happy path pays nothing); (4) CAPABILITIES / VERSION-HISTORY stamps belong to `/ft-release`; (5) README Obsidian "graph views" is vault-tool, not a flowtron graph runtime.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Closed | Surface | Deliverable |
|---|---|---|---|
| **CORE-445.1** | 2026-08-17 | PLAN.md child scopes | Locked markdown surface; `.2`–`.5` filed (25/25/19/19w); `.N` kept as-filed; no parent planning tasknote |
| **CORE-445.2** | 2026-08-17 | 4 templates + SPEC frontmatter + blocked.md | Three omit-when-absent keys as comments; Related type-hint; third-signal note; no validator |
| **CORE-445.3** | 2026-08-17 | SPEC body/epic + 3 skills + isolation docs | Fan-out insert; child YAML echo; warn-only worktree-start; no-runtime guardrail; no backfill of `.1` |
| **CORE-445.4** | 2026-08-17 | SPEC + templates + skim echoes | Typed Related `depends-on:` / `related-decision:`; later-note `supersedes:`; Phase 1 skim follows edges |
| **CORE-445.5** | 2026-08-17 | viz overlay | PLAN `blockedBy` opt-in chip (default off); four YAML keys on TaskDetail; no new view / required `Task` fields |

### Epic theme check

Theme: *graph-aware planning as markdown facts, never a graph runtime*. Strictly layered: YAML keys (`.2`) → Fan-out + warn (`.3`) → archive edges (`.4`) → trivial viz overlay (`.5`). Two-layer `blocked-by` (PLAN don't-start vs YAML durable dep vs `status: blocked` park) is consistent across SPEC / blocked.md / GLOSSARY / viz (PLAN chip vs YAML TaskDetail). No-runtime story is consistent across VISION / SPEC PR archetypes / EXTERNAL-AGENTS / PHILOSOPHY / WORKTREES.

### Adjacent, not this epic

- **[[CORE-417]]** — ⚠️ pointer stays factual-false; `.4` did not reopen Option B.
- **[[FE-031]]** / **[[CORE-098.3]]** — chip clutter vs opt-in RelatedChip; `.5` extended the latter.
- **[[CORE-215]]** — worktree isolation; `.3` meshed Fan-out onto it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass. The one inline fix extends `.5`'s two-layer viz overlay into the `SPEC/blocked.md` viz sentence `.2` left claiming an always-on chip.

- [x] **Minimal refactor gate** — one-paragraph prose fix in `SPEC/blocked.md`; no structural change. Broader leftovers (live-field lists in README / `ft-new-project`) left deferred with rationale.

- [x] Implemented the minimal solution — verification + the one stale viz-sentence fix

- [x] Updated/added tests for non-trivial behavior — N/A (markdown prose)

**Implementation Notes:**

### Cohort children inventoried

- **CORE-445.1** — Discovery locked omit-when-absent YAML `touches` / `blocked-by` / `parallel-safe-with`, Fan-out on `.1` with child YAML echo, typed Related + later-note `supersedes:`, trivial viz overlay, no-runtime guardrails. Filed `.2`–`.5`. Did not write Fan-out onto its own note (heading did not exist yet).
- **CORE-445.2** — Three keys as template comments + SPEC table/example; Related type-hint; `SPEC/blocked.md` third-signal paragraph. Dogfooded `touches:` + `parallel-safe-with: CORE-445.3`. Left viz parse and fan-out to later children.
- **CORE-445.3** — Fan-out contract + skill inject/echo + warn-only `/ft-worktree-start` + VISION/SPEC/EXTERNAL-AGENTS/PHILOSOPHY/GLOSSARY/MIGRATION/WORKTREES/gates residual. Templates untouched; `.1` not backfilled.
- **CORE-445.4** — Fourth key `supersedes:`; Related prose labels `depends-on:` / `related-decision:` fenced from YAML; Phase 1 skim follows edges; skill/SOP/DOGFOOD echoes. Honest in-execution: MIGRATION parenthetical + `ft-epic-discovery` skim recipe.
- **CORE-445.5** — PLAN `blockedBy` chip behind `rowChips.blocked` default off; four YAML keys on TaskDetail via `planningMetaRows`. RelatedChip generalized (`glyph` / `tone`) rather than a new BlockerChip.

### Coherence findings

- **Layering is consistent** `.1`→`.5`: keys before Fan-out before archive edges before viz. Each child left the next child's surface alone.
- **Two-layer blocked signal** matches across SPEC frontmatter, `SPEC/blocked.md` third-signal note, GLOSSARY, WORKTREES, and viz (PLAN chip vs YAML TaskDetail). One sentence in `SPEC/blocked.md` still claimed an always-on chip — inline fix, not a follow-up.
- **No-runtime story is consistent** across VISION bullet, SPEC 8th PR archetype, EXTERNAL-AGENTS job-graph bullet, PHILOSOPHY sentence, WORKTREES "not a scheduler."
- **Style parity:** optional YAML is comments on all four templates; omit-when-absent language is copy-stable ("undeclared, not 'touches nothing' / 'safe with everyone'").
- **Naming:** PLAN shortnames match tasknote titles (`graph-lite planning`, `graph-lite yaml surface`, `epic-worktree fan-out`, `archive decision links`, `viz optional edges`, `graph-lite planning audit`).
- **No contradictory cross-refs.** `.2` forbids YAML `depends-on:`; `.4` adds it as Related *prose* and SPEC fences the two. `.5` related-tasks omits `.4` — historical, not rewritten.
- **No regressions** on earlier-shipped surfaces: templates still comment-only (no live empty arrays); no `blocks:` / `depends-on:` YAML keys; viz default board unchanged (`rowChips.blocked` false); worktree-start still never locks; Codex `ft-worktree-start` remains a pointer.

### Inline fix

- `SPEC/blocked.md` viz sentence — claimed the parser "surfaces `Blocked by [[ID]]` as a chip on every row." False when `.2` edited the file (`Task.blockedBy` parsed, unused) and still false after `.5` (opt-in chip, default off). Rewrote to: parser extracts PLAN `Blocked by` into `Task.blockedBy`; may show as opt-in row chip (default off); YAML `blocked-by:` is TaskDetail meta, not that chip. One paragraph; two-layer contract preserved.

### Misses / follow-up candidates

- **None to file.** Known leftovers already owned or out of scope:
  - Archived `CORE-445.1` has no `## 🌳 Fan-out` — `.3` locked no backfill (write-once).
  - README vault field list / `ft-new-project` "six live fields" — still accurate for happy-path live YAML; optional keys are comments.
  - CAPABILITIES last-verified / VERSION-HISTORY highlights — `/ft-release` Maintenance rule.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: one markdown prose paragraph in a lazy SPEC module; no executable surface. Cohort's viz suite is unchanged by this audit's diff.

- [x] Ran lint/type-check on changed code — N/A (`git diff --check` only)

- [x] **Quality assertions** — one-paragraph phrasing fix; no duplication, no surface growth, no new viz API. The blocked.md viz sentence now matches `.5`'s shipped overlay.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface this audit (`.5` already confirmed 2026-08-17)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

Markdown-prose verification. `git diff --check` clean. Live greps confirmed no `blocks:` / `depends-on:` YAML keys; templates comment the four planning keys; viz `rowChips.blocked` still defaults false. Frontend 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — no change (vault field list is live happy-path YAML; Obsidian "graph views" is vault-tool, not a flowtron graph runtime)
  - `AGENTS.md` — no change (layout + validation pointer; contract lives in SPEC)
  - `SPEC.md` — no change this audit (children already landed frontmatter / Fan-out / PR archetype)
  - `docs/MIGRATION.md` — no change this audit (`.3`/`.4` already added omit-when-absent one-liner + `supersedes` parenthetical)
  - `claude/AGENTS-snippet.md` — no change (worktree pair already wired; no new skill)
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (wrong home for graph-lite; `.3` left it)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change (last-verified stamp is `/ft-release`)
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change this audit (`.3` landed the job-graph bullet)
  - `docs/WORKTREES.md` — no change this audit (`.3` landed the three-surface mesh)

  Inline fix `SPEC/blocked.md` is a lazy module, outside this list.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Audit of `CORE-EPIC-445` found the cohort coherent: omit-when-absent planning YAML, Fan-out + warn-only worktrees, archive decision links, and a trivial viz overlay all sit on the same two-layer / no-runtime story. One stale `SPEC/blocked.md` viz sentence (always-on chip) was fixed inline to match `.5`'s opt-in overlay. No follow-ups to file.

Parent-flip: Yes. Parent stubbed and cohort moved to top of `## Completed`.

**Archived:** 2026-08-17
