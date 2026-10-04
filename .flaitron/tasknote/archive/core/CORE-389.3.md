---
title: sibling-retirement
status: completed
tags: []
created: 2026-08-01
due:
related-tasks: [CORE-EPIC-389, CORE-389.2]
---

# CORE-389.3 | sibling-retirement

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-389]] [[CORE-389.2]]

## 🎯 Goal

Delete the five retired audit scaffolds and their command/codex wrappers, rewrite the surviving wrappers for the parameterized `/ft-audit <domain>` form, and update roster + count enumerations from 26→21.

## ✅ Acceptance

- [ ] Five retired skill dirs deleted: `claude/skills/ft-audit-{backend,frontend,security,performance,docs}/`
- [ ] Five retired command wrappers deleted: `claude/commands/ft-audit-{backend,frontend,security,performance,docs}.md`
- [ ] Five retired codex mirrors deleted: `codex/skills/ft-audit-{backend,frontend,security,performance,docs}/`
- [ ] `claude/commands/ft-audit.md` rewritten to describe the parameterized `/ft-audit <domain>` dispatcher (no longer the stale fixed 5-pass general-only description)
- [ ] `codex/skills/ft-audit/SKILL.md` frontmatter `description:` rewritten to drop the "when no focused audit skill is named" framing (those focused skills no longer exist)
- [ ] `claude/skills/ft-flowtron/SKILL.md` Bundled-skills table: 5 retired rows removed, `/ft-audit` row description updated for the parameterized form (26→21 rows)
- [ ] `SPEC.md` §"Skill namespace" audit-family brace expansion narrowed from `/ft-audit{,-repo,-docs,-security,-frontend,-backend,-performance}` to `/ft-audit{,-repo}` (26→21 enumerated slugs)
- [ ] `git status` shows only the intended deletions + the four rewritten/updated files — no collateral edits to `docs/PLATFORMS.md`, `docs/MIGRATION.md`, `docs/VISION.md`, `SECURITY.md`, `templates/audit-overlay-template.md`, `claude/skills/ft-update/SKILL.md`, `claude/skills/ft-release/SKILL.md` (owned by [[CORE-389.4]])

## 🧩 Subtasks

- [ ] Delete the 5 skill dirs, 5 command wrappers, 5 codex mirrors (15 paths total)
- [ ] Rewrite `claude/commands/ft-audit.md` description for the parameterized dispatcher
- [ ] Rewrite `codex/skills/ft-audit/SKILL.md` frontmatter description to match
- [ ] Trim `claude/skills/ft-flowtron/SKILL.md` roster table (remove 5 rows, refresh `/ft-audit` row)
- [ ] Trim `SPEC.md` §"Skill namespace" audit-family brace expansion
- [ ] Verify: `git status` diff matches exactly the intended path set; grep repo (outside `archive/` and CORE-389.4's declared doc set) for stray references to the 5 retired slugs
- [ ] Phase 4: doc-drift sweep, PLAN flip (nested stub beneath active parent), archive move, closure commit

## 🔗 Related

- [[CORE-EPIC-389]] — parent epic (audit-family-consolidation)
- [[CORE-389.2]] — predecessor (built the parameterized `/ft-audit` survivor these siblings retire in favor of)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-389.2 (parameterized-survivor) landed the `/ft-audit <domain>` dispatcher + `passes/` library; the five domain-specific scaffolds it merged from are now genuinely dead weight. Task is squarely next in the epic sequence.

- [x] Read relevant source files

- [x] **Best Practices Review** — mechanical retirement, not a refactor: delete the 5 dead sibling scaffolds (dirs + wrappers + mirrors) already superseded by CORE-389.2's dispatcher, then sync the two roster-enumeration surfaces this task explicitly owns. No new abstraction introduced; nothing to preserve in the deleted trees (their live content was already extracted into `passes/*.md` by CORE-389.2).

- [x] **Archive skim** — `CORE-389.1` (discovery) and `CORE-389.2` (parameterized-survivor) are the direct predecessors; both explicitly defer sibling deletion + wrapper rewrites to this task. `CORE-388` (skill-roster-utility-review) is the epic's origin verdict: confirms the "26→21" arithmetic (18 keep + 7-skill audit family → 1 dispatcher + `ft-audit-repo`/`ft-audit-context` = 21, pending CORE-390/391/392's further folds down to 18) and states explicitly that roster-enumeration updates are owned by CORE-389's follow-ups, not CORE-388 itself. No prior tasknote touched the deletion paths directly (first time this content is removed).

- [x] **Drift check** — confirmed all 15 delete-targets exist as named in the PLAN line. One drift found: the PLAN line's "count mirrors (26→21)" has no literal digit-string match in `ft-flowtron`/SPEC — it's an *implicit* count (26 enumerated skill slugs in each surface today, dropping to 21 after removing the 5 audit rows/brace-terms). The literal digit strings ("26 `SKILL.md` skill bodies", etc.) live in `docs/PLATFORMS.md`, which CORE-389.4's PLAN line explicitly owns ("sweep remaining enumerating docs (PLATFORMS, ...)"). Scoping this task to the two enumeration surfaces its own PLAN line names (`ft-flowtron`, SPEC §"Skill namespace") and leaving `docs/PLATFORMS.md`'s literal counts to .4 is the reading that keeps both tasks' diffs non-overlapping.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions: (1) `docs/PLATFORMS.md`'s literal "26" digit strings are CORE-389.4's to fix, not this task's — the temporary "21 in roster, 26 in PLATFORMS.md" inconsistency between this task's commit and .4's is expected and short-lived. (2) `claude/skills/ft-release/SKILL.md`'s "Forbidden repo-scoped upstream `ft-*`" enumeration (which still lists the 5 retired slugs) is left untouched — leaving retired names in a *forbidden*-install list is functionally harmless (they can never match a real symlink) and isn't named in either .3's or .4's PLAN line; treating it as .4's "remaining enumerating docs" sweep territory if it needs touching at all. (3) `claude/AGENTS-snippet.md` / `codex/AGENTS-snippet.md` never listed the 5 retired slugs as symlink targets (audit family was always fork-only, never adopter-symlinked) — confirmed via grep, so nothing to change there.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Five retired scaffolds confirmed on disk: `claude/skills/ft-audit-{backend,frontend,security,performance,docs}/`, their `claude/commands/ft-audit-{backend,frontend,security,performance,docs}.md` wrappers, and `codex/skills/ft-audit-{backend,frontend,security,performance,docs}/` mirrors (15 paths). No grok mirrors exist for the audit family (`grok/` only carries `procedures/ft-task.md`) — nothing to delete there. The surviving `/ft-audit` command (`claude/commands/ft-audit.md`) and codex wrapper (`codex/skills/ft-audit/SKILL.md`) both still describe the pre-CORE-389.2 fixed 5-pass general-only skill and need rewriting for the parameterized dispatcher. `claude/skills/ft-audit/SKILL.md` itself (the dispatcher body) was already correctly rewritten by CORE-389.2 — out of scope here. `ft-audit-context` and `ft-audit-repo` are confirmed non-members of the retired family (per CORE-388's verdict) and are untouched throughout.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrors CORE-389.2's precedent exactly: delete dead siblings, sync the roster surfaces the task line names. No new shape needed.

- [x] **Minimal refactor gate** — beyond the named Acceptance items, fixed 3 small stale references directly caused by this deletion, in files already touched by this task: `SPEC.md:583` (fork-naming example `/ft-audit-docs`→`/ft-audit`, since forks are now single-skill not per-domain), `SPEC.md:719` (`ft-audit-security`→`ft-audit security`), `claude/skills/ft-flowtron/SKILL.md` `/ft-release` row (`` `/ft-audit-docs` ``→`` `/ft-audit docs` ``). All three are one-line corrections in files this task already edits for the named Acceptance criteria — not a broader sweep. Left everything named in CORE-389.4's PLAN line (PLATFORMS, MIGRATION, VISION, SECURITY, overlay template, ft-update/ft-release enumerations, ft-audit-repo) untouched.

- [x] Implemented the minimal solution — 15 deletions (5 skill dirs, 5 command wrappers, 5 codex mirrors) + 3 rewritten/updated files (SPEC.md, `claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`) + 1 trimmed roster file (`claude/skills/ft-flowtron/SKILL.md`)

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only skill/doc changes, no test-bearing code touched

**Implementation Notes:**

`git status --porcelain` confirmed the diff is exactly: `SPEC.md` (M), `claude/commands/ft-audit.md` (M), `claude/commands/ft-audit-{backend,frontend,security,performance,docs}.md` (D×5), `claude/skills/ft-audit-{backend,frontend,security,performance,docs}/SKILL.md` (D×5), `claude/skills/ft-flowtron/SKILL.md` (M), `codex/skills/ft-audit-{backend,frontend,security,performance,docs}/SKILL.md` (D×5), `codex/skills/ft-audit/SKILL.md` (M), plus the new tasknote itself. No collateral edits to CORE-389.4-owned files.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, markdown-only skill/doc changes; no `viz/` or `tools/` code touched

- [x] Ran lint/type-check on changed code — N/A, same reason

- [x] **Quality assertions** — manually verified: `ft-flowtron` roster table now has exactly 21 rows (was 26); both frontmatter blocks (`claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`) are valid YAML; `SPEC.md`'s brace expansion renders as `/ft-audit{,-repo}`; no dead links to the 5 deleted skills remain in any file this task touched or in the two roster-enumeration surfaces it owns

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — updated (§"Skill namespace" audit-family brace expansion trimmed 26→21; two stale audit-family mentions elsewhere in the file corrected as part of the same edit)
  - `docs/MIGRATION.md` — no change (owned by [[CORE-389.4]])
  - `claude/AGENTS-snippet.md` — no change (never listed the retired slugs as symlink targets — audit family was always fork-only)
  - `codex/AGENTS-snippet.md` — no change (same reason)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (owned by [[CORE-389.4]])
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change (owned by [[CORE-389.4]] — literal "26" digit-string mirrors live here)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form, kept nested beneath active parent `CORE-EPIC-389` (epic still open — `.4` and `.N` remain), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Retired the five domain-specific audit scaffolds (`ft-audit-{backend,frontend,security,performance,docs}`) that CORE-389.2's parameterized `/ft-audit <domain>` dispatcher superseded, and synced the two roster-enumeration surfaces this task owns.

**Changed:**
- 15 deletions: `claude/skills/ft-audit-{backend,frontend,security,performance,docs}/SKILL.md`, `claude/commands/ft-audit-{backend,frontend,security,performance,docs}.md`, `codex/skills/ft-audit-{backend,frontend,security,performance,docs}/SKILL.md`
- `claude/commands/ft-audit.md` — description rewritten for the parameterized dispatcher form
- `codex/skills/ft-audit/SKILL.md` — frontmatter description rewritten to drop "no focused audit skill named" framing
- `claude/skills/ft-flowtron/SKILL.md` — 5 roster rows removed (26→21 rows), `/ft-audit` row refreshed, one stale `/ft-audit-docs` mention corrected
- `SPEC.md` — §"Skill namespace" brace expansion narrowed to `/ft-audit{,-repo}`; two adjacent stale audit-family mentions corrected in the same file (fork-naming example, `ft-audit-security` prose reference)

**Verification:** `git status --porcelain` diff confirmed to match exactly the intended path set (no collateral edits into CORE-389.4-owned files); repo-wide grep for the 5 retired slugs confirmed zero remaining hits outside archive/ and CORE-389.4's declared doc set; roster table row count and frontmatter YAML manually verified.

**Refactors:** none beyond the named Acceptance — 3 small stale-reference fixes (2 in `SPEC.md`, 1 in `ft-flowtron`) made in files already touched, directly caused by this deletion; documented in Implementation Notes.

**Documentation verdict:** `SPEC.md` updated as part of this task's own deliverable (see doc-drift sweep above); all other AI-referenced docs unaffected.

**Maintainability effect:** audit-family skill surface drops from 6 forkable scaffolds to 1 parameterized dispatcher + 2 genuine non-members (`ft-audit-repo`, `ft-audit-context`); roster enumerations now match the post-CORE-389.2 reality, removing a source of adopter confusion (which of 6 near-identical scaffolds to fork).

**Archived:** 2026-08-01
