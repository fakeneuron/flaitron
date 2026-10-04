---
title: spec-paths-autoload
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-097.1, CORE-097.2]
---

# CORE-097.3 | spec-paths-autoload

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-097]] · [[CORE-097.1]] · [[CORE-097.2]]

## 🎯 Goal

Add machine-readable `paths:` frontmatter to `SPEC/*.md` lazy modules so the modules carry a declarative trigger contract — bash-style globs naming the tasknote filename shapes the module applies to (e.g., `SPEC/epic.md` ↔ `*-EPIC-*.md` / `*.[0-9]*.md`).

## ✅ Acceptance

- [ ] All 5 `SPEC/*.md` lazy modules (`epic.md` · `starter.md` · `blocked.md` · `model.md` · `versioning.md`) carry YAML frontmatter with a `paths:` field
- [ ] `SPEC/epic.md` declares populated `paths: ['*-EPIC-*.md', '*.[0-9]*.md']` (the only module today with a filename-based trigger)
- [ ] The four status/content-triggered modules (`starter` · `blocked` · `model` · `versioning`) declare `paths: []` — honest acknowledgement that their trigger is status- or content-based, not filename-based
- [ ] `SPEC.md` gains a short subsection (under §"Working in the flowtron repo itself" or analogous slot) documenting the `paths:` convention: declarative-only today, bash-style globs, populated only where filename triggers apply
- [ ] No change to `claude/skills/ft-task/SKILL.md` dispatch — `/ft-task`'s hardcoded module-list stays the source of truth for now; frontmatter is documentation contract (per user choice on scope)
- [ ] Existing `> Lazy-loaded SPEC module. Loaded by ...` prose comment on each module preserved verbatim (status/content triggers stay documented there for the modules with empty `paths:`)
- [ ] Phase 4 doc-drift sweep: `SPEC.md` changed (contract section); other AI-referenced docs likely "no change"

## 🧩 Subtasks

- [ ] Edit `SPEC/epic.md` — add YAML frontmatter with `paths: ['*-EPIC-*.md', '*.[0-9]*.md']` (the parent-epic + epic-subtask filename shapes; globs verified in Discovery)
- [ ] Edit `SPEC/starter.md` — add YAML frontmatter with `paths: []`
- [ ] Edit `SPEC/blocked.md` — add YAML frontmatter with `paths: []`
- [ ] Edit `SPEC/model.md` — add YAML frontmatter with `paths: []`
- [ ] Edit `SPEC/versioning.md` — add YAML frontmatter with `paths: []`
- [ ] Edit `SPEC.md` — add a short subsection documenting the `paths:` convention (bash-style glob; populated only where filename triggers apply; declarative-only today; future tooling MAY parse)
- [ ] Phase 3: mental-pass YAML validity (frontmatter delimiters, glob quoting) + spot-check that the existing prose back-ref line still reads cleanly directly below the new frontmatter
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey)
- [[CORE-097.1]] — discovery; surfaced the WISC tier-2 `paths:` pattern from claude-workflow-template; cost-estimated "frontmatter edit + SPEC contract note"
- [[CORE-097.2]] — sibling adoption (/ft-stats); validates the cohort's small/declarative sizing pattern

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Adoption was user-approved in CORE-097.1's recommended-adoptions shortlist (P1.b) — "Pattern absorption — adopt `paths:` auto-load on SPEC/* lazy modules; license blocks vendoring." Cost estimate "Small (frontmatter edit + SPEC contract note)" matches the user-confirmed scope (declarative + SPEC contract note; no `/ft-task` refactor). No scope ambiguity remaining post-AskUserQuestion.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `SPEC.md` — always-loaded core; identifies the 5 lazy modules under "Working in the flowtron repo itself" (line 50: "SPEC/ — lazy SPEC modules loaded on demand by skills.")
- `SPEC/epic.md` · `starter.md` · `blocked.md` · `model.md` · `versioning.md` — all 5 lazy modules; each opens with `H1 + > Lazy-loaded SPEC module. Loaded by ...` prose back-ref. **No existing YAML frontmatter on any of them.** Greenfield surface for this task.
- `claude/skills/ft-task/SKILL.md` — current dispatch hardcoded in Steps 1.5 (`model.md` on PLAN-tag mismatch / legacy), 2 (`epic.md` on epic-ID prefix), 3a (`starter.md` on `status: starter`), 3c (`blocked.md` on `status: blocked`), 5 (`blocked.md` on mid-Phase-2 parking). `versioning.md` is loaded ad-hoc for version-bump tasks.
- `_project/tasknote/archive/CORE/CORE-097.1.md` — Discovery findings + adoption-fit verdict
- `templates/tasknote-template.md` — confirms tasknote YAML frontmatter is the canonical schema (no parallel SPEC-frontmatter schema exists yet)

### Trigger-source taxonomy (for `paths:` populated-vs-empty decision)

| Module | Trigger source | `paths:` populated? |
|---|---|---|
| `epic.md` | Filename match — `<AREA>-EPIC-<N>.md` and `<AREA>-<N>.<sub>.md` (task ID prefix) | ✅ Yes |
| `starter.md` | YAML `status: starter` on existing tasknote | ❌ No (`paths: []`) |
| `blocked.md` | YAML `status: blocked` on existing tasknote, OR mid-Phase-2 transition | ❌ No (`paths: []`) |
| `model.md` | PLAN-line `[model]` mismatch / legacy entry | ❌ No (`paths: []`) |
| `versioning.md` | Task content (version-bump) | ❌ No (`paths: []`) |

Only `epic.md` has a filename-based trigger. The other four are status- or content-based and so honestly declare empty `paths:` — the contract section in SPEC.md explains this asymmetry rather than papering over it.

### Archive skim findings

Grep for `SPEC/(epic|starter|blocked|model|versioning)` across `_project/tasknote/archive/CORE/` returned ~30+ hits. Material findings:

- **CORE-042.2 (SPEC modularization)** — established the convention: each module opens with `H1 + one-line back-ref note + verbatim moved content`. **No YAML frontmatter added at that time** — pure markdown. Cross-refs within moved content preserved as-is. This task is the natural follow-up: add the missing machine-readable layer that CORE-042.2 deferred.
- **CORE-042.9 (SKILL-side lazy-load)** — parallel pattern on SKILL fragments: `> Lazy-loaded SKILL fragment. Loaded by task SKILL.md Step <X> ...`. Same prose-only back-ref shape; same opportunity for `paths:`-style declarations exists on the SKILL side — out of scope here, but worth noting for a possible follow-up (`paths:` on `claude/skills/ft-task/step-*.md` would be the symmetric move).
- **CORE-042.3 (frontmatter audit)** — audited *tasknote* frontmatter only; did not touch SPEC modules.
- **CORE-049 (workflow token audit)** — touched SPEC.md content for token optimization; no frontmatter changes.

No prior tasknote has added YAML frontmatter to SPEC modules → this is greenfield, no migration burden.

### Drift check

- All 5 SPEC modules exist at expected paths ✓
- Each module's leading `> Lazy-loaded SPEC module. Loaded by ...` prose comment matches CORE-042.2's pattern ✓
- `/ft-task` SKILL.md Step 0 lists all 5 lazy modules; dispatch logic in Steps 1.5/2/3a/3c/5 unchanged ✓
- No existing YAML frontmatter on SPEC/*.md → no conflict with the additive change ✓
- Glob patterns verified against representative tasknote filenames (see below) ✓

### Glob validation (executed in Discovery)

Created scratch files and tested bash-style globs:

- `*-EPIC-*.md` matches `CORE-EPIC-042.md`, `CORE-EPIC-097.md` ✓ — does NOT match plain `FE-038.md`, `CORE-097.md`, or `CORE-097.1.md` ✓
- `*.[0-9]*.md` matches `CORE-042.9.md`, `CORE-097.1.md`, `CORE-097.10.md` ✓ — does NOT match `CORE-EPIC-097.md`, `CORE-097.md`, `FE-038.md` ✓

Both patterns behave as expected.

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Scope: declarative-only vs. /ft-task wire-up vs. future-wire stub | **Declarative + SPEC contract note** — frontmatter on 5 modules + SPEC.md contract subsection; no /ft-task changes |
| Pattern syntax | **Bash-style globs** — `*-EPIC-*.md`, `*.[0-9]*.md` (`*.N.md` shorthand concretized to executable glob) |

### Explicit assumptions

- The four non-filename-triggered modules carry `paths: []` (rather than omitting `paths:`). Rationale: uniform shape across the 5 lazy modules, self-documenting that the field exists but the trigger isn't filename-based for those modules.
- YAML frontmatter consists of `paths:` only — no `name:` or `description:` fields. The H1 already names the module; the `> Lazy-loaded SPEC module. Loaded by ...` line already describes the trigger. Adding parallel fields would be redundant.
- The SPEC.md contract section is honest about the declarative-only nature today: `/ft-task`'s hardcoded module-list remains the source of truth; the frontmatter is documentation contract that future tooling MAY parse.
- No `viz/src/parser.ts` change needed — viz parses tasknote frontmatter and PLAN.md, not SPEC modules.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the 5 SPEC modules share a uniform pre-existing shape (H1 + `> Lazy-loaded SPEC module. Loaded by ...` prose back-ref, established by CORE-042.2). YAML frontmatter prepends *above* the H1 — mirroring the canonical tasknote-frontmatter delimiter shape (`templates/tasknote-template.md`) — keeping the existing prose verbatim. No new shape invented; the change extends the already-canonical YAML-frontmatter convention to SPEC modules.
- [x] Implemented the minimal solution — 5 SPEC/*.md frontmatter prepends + 1 SPEC.md contract subsection (see Implementation Notes).
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-prose only; no executable surface).

**Implementation Notes:**

### Changes landed

| File | Change |
|---|---|
| `SPEC/epic.md` | Prepended frontmatter `paths: ['*-EPIC-*.md', '*.[0-9]*.md']` |
| `SPEC/starter.md` | Prepended frontmatter `paths: []` |
| `SPEC/blocked.md` | Prepended frontmatter `paths: []` |
| `SPEC/model.md` | Prepended frontmatter `paths: []` |
| `SPEC/versioning.md` | Prepended frontmatter `paths: []` |
| `SPEC.md` | Added `### Lazy SPEC module frontmatter` subsection (~120w) under `## Working in the flowtron repo itself` |

### Decisions

- **`paths:` only** in the frontmatter — no `name:` / `description:` siblings. The H1 names the module; the existing `> Lazy-loaded SPEC module. Loaded by ...` prose comment describes the trigger. Parallel YAML fields would be redundant.
- **Empty `paths: []`** on the 4 status/content-triggered modules rather than omitting the field. Uniform shape across all 5 lazy modules; self-documenting that the field exists but the trigger isn't filename-based.
- **Single-quoted glob strings** in the YAML array — keeps `[` / `]` characters in `*.[0-9]*.md` YAML-safe (unquoted would attempt array nesting).
- **No `/ft-task` SKILL.md changes** — per the user's scope pick (Declarative + SPEC contract note). The hardcoded module-list dispatch in Steps 1.5 / 2 / 3a / 3c / 5 stays the runtime source of truth; the new frontmatter is documentation contract.
- **Contract subsection placed** under `## Working in the flowtron repo itself` (where `SPEC/ — lazy SPEC modules...` is already introduced) rather than a top-level new section. Discoverability via natural prose flow; no new H2.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only).
- [x] Ran lint/type-check on changed code — N/A (no linter / typechecker over flowtron markdown; mental-pass instead).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; flowtron-self repo only).

**Testing Notes:**

Mental-pass on the 6 markdown edits passed cleanly:

- YAML frontmatter on each of 5 SPEC modules: opening `---`, single `paths:` field, closing `---`, blank line above the H1. Valid YAML.
- Glob strings single-quoted in YAML array → `[` / `]` inside `*.[0-9]*.md` parse as literal chars, not nested array syntax ✓
- Existing `> Lazy-loaded SPEC module. Loaded by ...` prose line preserved verbatim on all 5 modules — diff is purely additive (3-line prepend per file) ✓
- SPEC.md contract subsection: H3 nested under H2; fenced code block carries `yaml` lang tag (matches CORE-079 spec-fence-langtags convention); section reads cleanly after the existing "For flowtron-self global installs..." paragraph and flows into "## Skill namespace" without orphan whitespace ✓
- Glob patterns previously validated against representative tasknote filenames in Discovery (no Phase 3 re-test needed) ✓

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-18.`; tasknote moved to `_project/tasknote/archive/core/CORE-097.3.md`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" — 6 markdown files, no frontend / privileged-ops / perf surface)

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — line 86 mentions lazy SPEC modules at top-level only; doesn't describe their frontmatter shape |
| `SPEC.md` | **updated** — added `### Lazy SPEC module frontmatter` subsection under §"Working in the flowtron repo itself" (~120 words) documenting the convention as declarative-only with bash-style glob syntax |
| `docs/MIGRATION.md` | no change — references specific SPEC modules (lines 81 / 82 / 145 / 148) as lifecycle-contract pointers; doesn't describe their frontmatter |
| `claude/CLAUDE-snippet.md` | no change — references `SPEC/epic.md` and `SPEC/versioning.md` as contract pointers (lines 17 / 20); doesn't describe their frontmatter |

### Recap

Adopted claude-workflow-template's WISC tier-2 path-scoped frontmatter pattern: every `SPEC/*.md` lazy module now carries machine-readable `paths:` frontmatter declaring which tasknote-filename shapes the module applies to. `SPEC/epic.md` gets the populated `['*-EPIC-*.md', '*.[0-9]*.md']` array (the only filename-triggered module); the four status/content-triggered modules (`starter` · `blocked` · `model` · `versioning`) honestly declare `paths: []`. SPEC.md gains a 120-word contract subsection codifying the convention as declarative-only — `/ft-task`'s hardcoded dispatch stays the runtime source of truth; future tooling MAY parse the frontmatter. Six markdown files touched (5 SPEC modules + SPEC.md); no SKILL or code surface changed. Closes CORE-097.3 (5/6 of the user-approved CORE-EPIC-097 adoption children; audit `.7` remains).

**Archived:** 2026-05-18
