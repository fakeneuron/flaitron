---
title: cursor-wiring audit
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-EPIC-438, CORE-438.1, CORE-438.2, CORE-438.3, CORE-438.4, CORE-438.5]
---

# CORE-438.N | cursor-wiring audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-438]]

## 🎯 Goal

Verify the completed `CORE-EPIC-438` (`cursor-wiring`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-438.N — audit CORE-EPIC-438` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-438.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-438.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-438` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-438.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-438]] — parent epic: promote Cursor from contract-only stub to a first-class wiring platform
- [[CORE-438.1]] — Discovery: thin-bundle decision + child scopes
- [[CORE-438.2]] — install-mechanism lock (relative symlink) + YAML frontmatter repair
- [[CORE-438.3]] — shipped `cursor/` (snippet + procedure pointer)
- [[CORE-438.4]] — surface integration across enumeration / adopter / release sites
- [[CORE-438.5]] — dogfood + trigger table + 4th gated-row enrolment

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User invoked `/ft-close-epic CORE-438.N`. All five implementation children closed 2026-08-12 (`.1`–`.5`); no open siblings; early-audit gate N/A. Parent `CORE-EPIC-438` still under `## High`.

- [x] Read relevant source files — archived `CORE-438.1`–`.5`; live `cursor/` (2 files), `docs/PLATFORMS.md` Cursor section, `docs/AGENT-COMPAT.md` Cursor row, `tools/update-adopters.mjs` `WIRING_SURFACES`, `claude/skills/{ft-release,ft-update,ft-new-project,ft-flowtron}/SKILL.md`, layout bullets (README / SPEC / AGENTS), `.gitignore`

- [x] **Best Practices Review** — N/A (audit is verification over existing deliverables; one in-scope one-line stale-phrase fix if Discovery confirms it)

- [x] **Archive skim** — cohort archives are the primary inventory. Load-bearing non-cohort context already cited by children: [[CORE-154.3]] / [[CORE-154.4]] (sibling-dir plug-in + PLATFORMS), [[CORE-344]] / [[CORE-345]] (codex thin-wrapper precedent that `.1` deliberately did *not* copy), [[CORE-271.4]] (procedure-pointer shape), [[CORE-320]] / [[CORE-439]] (fleet-updater keys + canonical install path), [[CORE-406]] (stamp ownership), [[CORE-267.2]] (dogfood-gate convention). No extra non-cohort re-read required.

- [x] **Drift check** — HEAD still matches each child's shipped shape:
  - `cursor/` exists as two files only (`AGENTS-snippet.md` + `procedures/ft-task.md`); no `cursor/skills/` or `cursor/commands/`
  - Stale phrases `hypothetical Cursor` / Cursor `no flowtron bundle` / `trigger table pending` cleared from live docs (remaining `no flowtron bundle` / `unverified` are Gemini / Aider / Amp only)
  - AGENT-COMPAT Cursor row: Consume mode `Wiring + contract (thin)`; stamp `v5.16.0 · 2026-08-12 (dogfooded)`
  - PLATFORMS tree comment: `Cursor thin wiring (snippet + ft-task procedure pointer)`; Cursor section is a 9-row trigger table, not a stub
  - `WIRING_SURFACES` has a third Cursor entry keyed to `claude/skills/` adds + `cursor/AGENTS-snippet.md`
  - `.gitignore` ignores `.cursor/` and the comment matches the ignored set
  - `cursor/AGENTS-snippet.md` is on the AI-referenced list
  - PLAN epic still under `## High`; children stubs nested; `.N` was the open audit line
  - One leftover: `claude/skills/ft-flowtron/SKILL.md:71` still calls Codex / grok / Cursor "future platforms" — not in `.4`'s ~16-site list (that list was sites naming `codex/` as a shipped dir). Inline-fix candidate.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) full-cohort audit (all five implementation children closed); (2) VERSION-HISTORY Cursor highlight is correctly deferred to `/ft-release` per that doc's Maintenance rule; (3) `.2`'s known leftover (invalid YAML in  `claude/commands/*.md`) stays deferred — Cursor does not read `.claude/commands/`, Claude Code parses them, no observable defect; (4) CORE-433.3 / CORE-433.4 remain complementary adjacent work, not this epic's misses.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort inventory

| Child | Closed | Surface | Deliverable |
|---|---|---|---|
| **CORE-438.1** | 2026-08-12 | PLAN.md child scopes | Thin-bundle decision (snippet + procedure pointer, no wrappers); `.2`–`.5` filed; symlink-tolerance named as blocking unknown |
| **CORE-438.2** | 2026-08-12 | empirical fixture + 4 skill frontmatter lines | Relative dir symlink locked at adopter depth in all three candidate dirs; 4 invalid-YAML `description:` scalars repaired; Findings-for-`.3` lift-ready |
| **CORE-438.3** | 2026-08-12 | `cursor/` (2 files) | Shipped thin sibling; primary install = "already wired for Claude → already wired for Cursor"; superseded-claim pointer on `.2` finding 4 |
| **CORE-438.4** | 2026-08-12 | ~16 enumeration / adopter / release sites | `cursor/` registered everywhere `codex/` already was; PLATFORMS + AGENT-COMPAT flipped off stub/hypothetical; fleet updater + `ft-update` / `ft-release` §7.1 / `ft-new-project` |
| **CORE-438.5** | 2026-08-12 | PLATFORMS trigger table + stamps + `ft-release` §5/§7 | Dogfooded at `v5.16.0`; Cursor enrolled as 4th gated row |

### Epic theme check

Theme: *promote Cursor from contract-only stub to a first-class thin wiring platform*. Strictly ordered: verify mechanism → ship bundle → propagate surfaces → dogfood/enrol. Thin-bundle story is consistent `.1`→`.5` (no wrappers, canonical `claude/skills/` bodies, `.cursor/skills/` only as Cursor-only variant). `.3` correctly shrunk from "author install commands" to "reference the Claude block" after `.2` Test 6.

### Adjacent, not this epic

- **[[CORE-439]]** (closed same day, standalone) locked "one canonical install path per project"; `.2`/`.3` inherited it.
- **[[CORE-433.3]]** / **[[CORE-433.4]]** — complementary gate-widening; `.1` reconciliation scan left them alone.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for the verification pass. The one inline fix extends `.4`'s "name shipped platforms as shipped" phrasing into a skill-body Key-docs line `.4`'s site list did not cover.

- [x] **Minimal refactor gate** — one-line prose fix in `claude/skills/ft-flowtron/SKILL.md`; no structural change. Broader leftovers (command-wrapper YAML, VERSION-HISTORY highlight) left deferred with rationale.

- [x] Implemented the minimal solution — verification + the one stale-phrase fix

- [x] Updated/added tests for non-trivial behavior — N/A (markdown prose)

**Implementation Notes:**

### Cohort children inventoried

- **CORE-438.1** — Discovery shrank the epic: Cursor loads `.claude/skills/` natively, so `cursor/` ships thin instead of mirroring Codex's 18 wrappers.
- **CORE-438.2** — Symlink mechanism locked (discovered + invoked at adopter depth). Incidental: 4 skill-body `description:` scalars were invalid YAML and silent under Cursor; repaired. Superseded-claim pointer from `.3` corrects finding 4's named updater mechanism (`newSkillsShipped()` / heading-anchored scan); conclusion (flagged via Claude snippet) stands.
- **CORE-438.3** — Two-file `cursor/` bundle. Fleet updater does not read the new snippet until `.4` registers it — confirmed against source, not assumed.
- **CORE-438.4** — Propagation complete across layout docs, platform docs, skills, updater, `.gitignore`. Trigger table + stamp left to `.5`; VERSION-HISTORY left to `/ft-release`.
- **CORE-438.5** — First-use trigger table, `dogfooded` stamp pair, 4th gated-row enrolment. This session is the dogfood evidence.

### Coherence findings

- **Thin-bundle story is consistent** across snippet, PLATFORMS Today's-surface / installed-surface / worked example, AGENT-COMPAT Consume mode, `ft-new-project` Cursor note, `ft-update` Cursor re-wire, `ft-release` §7.1 (slug parity against Cursor-only `ln -s` block, no `cursor/skills/` inventory), and SECURITY.md threat-model intro.
- **Style parity:** `cursor/procedures/ft-task.md` is the `codex/` / `grok/` router with only the platform word in the H1 changed.
- **Naming:** PLAN shortnames match tasknote titles (`cursor-wiring`, `cursor-install-verify`, `cursor-wiring-bundle`, `cursor-surface-integration`, `cursor-dogfood`, `cursor-wiring audit`).
- **No contradictory cross-refs.** `.3` pointer on `.2` is the one factual correction and is already written. `.4` related-tasks omits `.1`/`.2` — historical, not rewritten.
- **No regressions** on earlier-shipped surfaces: `cursor/` still two files; 11/11 `ln -s` parity vs Claude adopter subset still the §7.1 expected set; Cursor `WIRING_SURFACES` entry present.

### Inline fix

- `claude/skills/ft-flowtron/SKILL.md:71` — Key-docs line still called Codex / grok / Cursor "future platforms". Rewrote to name them as shipped siblings (`codex/` full wrappers, `cursor/` thin, `grok/` procedure pointer) with the plug-in pattern remaining for *future* platforms. One line; meaning preserved.

### Misses / follow-up candidates

- **None to file.** Known leftovers already owned elsewhere:
  - Invalid YAML in some `claude/commands/*.md` wrappers — `.2` deferred (Cursor does not read `.claude/commands/`; Claude Code parses them). Not an epic miss.
  - Frontmatter-validity release check — operator declined in `.2`. Not reopened.
  - VERSION-HISTORY Cursor highlight — deferred to `/ft-release` by Maintenance rule (`.4` / `.5`).
  - CORE-433.3 / CORE-433.4 — complementary, already on PLAN.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: one markdown prose line in a skill body; no executable surface. Cohort's updater suite is unchanged by this audit's diff.

- [x] Ran lint/type-check on changed code — N/A: no lintable or typed surface

- [x] **Quality assertions** — one-line phrasing fix; no duplication, no surface growth, no Cursor-specific term in the contract layer. The Key-docs line now matches README / SPEC / AGENTS layout bullets.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface

**Testing Notes:**

Markdown-prose verification. Live-doc greps confirmed stale stub/hypothetical/unverified Cursor phrases are gone. `cursor/` file set still exactly two files. Frontend 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change — `cursor/` layout bullet already landed in `.4` |
  | `SPEC.md` | no change — repo-layout `cursor/` bullet already landed in `.4`; no contract semantics |
  | `docs/MIGRATION.md` | no change — Cursor install + verify paths already landed in `.4` |
  | `claude/AGENTS-snippet.md` | no change — Cursor verify sentence already landed in `.4` |
  | `codex/AGENTS-snippet.md` | no change |
  | `cursor/AGENTS-snippet.md` | no change — added to this list by `.4`; content still matches locked mechanism |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change — Cursor thin surface already in threat-model intro (`.4`) |
  | `docs/AGENT-NEUTRALITY.md` | no change — wiring-layer list already includes `cursor/` (`.4`) |
  | `docs/PLATFORMS.md` | no change — tree / Today's surface / trigger table / stamp already current (`.4` + `.5`) |
  | `claude/CAPABILITIES.md` | no change — Claude-only trigger reference; last-verified `v5.16.0 · 2026-08-09` unaffected |
  | `docs/AGENT-COMPAT.md` | no change — Cursor row already `dogfooded` (`.5`) |
  | `docs/EXTERNAL-AGENTS.md` | no change — handoff/isolation contract; no platform-wiring enumeration owed |
  | `docs/WORKTREES.md` | no change |

  Cumulative sweep: all fifteen cold-start entries current. The one stale phrase lived in an on-demand skill (`ft-flowtron`), not this list — fixed inline.

- [x] Closed — Acceptance ticked (commit + parent-flip pending 📦); YAML `status: completed`; PLAN.md audit line stubbed under active parent; tasknote → `archive/core/CORE-438.N.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cursor-wiring audit found the five-child cohort coherent: thin `cursor/` bundle, surface registration, and dogfood enrolment agree with each other and with HEAD. One leftover "future platforms" phrase in `ft-flowtron`'s Key-docs line was fixed inline. No `/ft-file-followup` candidates — remaining leftovers are already owned by `/ft-release` or by `.2`'s recorded deferrals.

**Parent-flip:** Yes — parent stubbed + full cohort moved to top of `## Completed` (2026-08-12).

**Archived:** 2026-08-12
