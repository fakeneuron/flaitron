---
title: audit-family-consolidation discovery
status: completed
tags: []
created: 2026-07-31
due:
related-tasks: [CORE-EPIC-389, CORE-388, CORE-287]
---

# CORE-389.1 | audit-family-consolidation discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-389]]

## 🎯 Goal

Scope the `CORE-EPIC-389` epic (`audit-family-consolidation`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-389.2..4` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-389.2 .. CORE-389.4 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-389.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (epic promotion, ID reuse, child split M, audit bracket, metadata) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-389.2 .. CORE-389.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-389 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-389]] — parent epic (promoted from plain CORE-389 this session per Re-scope verdict)
- [[CORE-388]] — skill-roster-utility-review; verdict source (cluster verdict b: audit 8 → 3 surfaces)
- [[CORE-287]] — thin-overlay precedent the parameterization follows

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Epic filing is itself the resolution of a Re-scope verdict — `/ft-task CORE-389`'s Phase 1 Discovery (this session) confirmed the consolidation is on-label per CORE-388's measured verdict but epic-sized (~30 files, four distinct work shapes); the operator confirmed promotion via AskUserQuestion.

- [x] Read relevant source files

- [x] **Best Practices Review** — the consolidation extends two established shapes: lazy-loaded skill fragments (ft-task's `step-*.md` precedent) for the pass library, and the CORE-287 overlay's "read referenced file, then act" idiom for by-reference loading. Dependency direction to preserve: `/ft-release` §7.1 → `/ft-audit-docs` subroutine must repoint to the parameterized form; `templates/audit-overlay-template.md` `flowtron-tracks:` + referenced-scaffold path must track the new shape (retired submodule paths break existing thin overlays on version bump — migration-note material). Duplication being removed is the point (§§3–6 near-verbatim ×6).

- [x] **Archive skim** — CORE-388 (verdict source, read in full: audit cluster verdict, measured deltas, install tiers) and CORE-287 (overlay design, read in full); via CORE-388's evidence trail: CORE-072 (family *started* as a consolidation — merged two InvisiPaw skills into one), CORE-101 (re-expansion to six, no surviving tasknote, commit `ba6ba8d`), CORE-185 (drift cost: one pass-name rename = 18 edits / 7 files), CORE-289 (growth cap, two-project rule), CORE-328.3 (forked-audit descriptions were the one systematic dispatch failure).

- [x] **Drift check** — six forked scaffolds confirmed on disk (85–108 lines each); pairwise diffs re-measured this session: 65–76 differing lines of ~91 vs `ft-audit-backend`, §§3–6 structurally near-verbatim (domain-phrasing substitutions) — matches CORE-388's claim. Scope-relevant addition the original task line didn't name: each of the six also has a `claude/commands/ft-audit*.md` wrapper and a `codex/skills/ft-audit*/SKILL.md` thin mirror, and ~12 docs enumerate the family. No contradicting drift.

- [x] Asked clarifying questions — resolved via AskUserQuestion; see "Resolved scoping" table below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface inventory

- **Skills (claude):** `claude/skills/ft-audit/` (survivor → parameterized dispatcher + `passes/` library) · `claude/skills/ft-audit-{backend,frontend,security,performance,docs}/` (retire ×5). `ft-audit-repo` / `ft-audit-context` untouched — never family members (different shape, install tier; CORE-309 / CORE-186).
- **Command wrappers:** `claude/commands/ft-audit*.md` — 1 rewrite + 5 retire (`ft-audit-repo.md` untouched).
- **Codex mirrors:** `codex/skills/ft-audit*/SKILL.md` thin read-the-claude-skill wrappers — 1 rewrite + 5 retire.
- **Templates:** `templates/audit-overlay-template.md` — referenced-scaffold path + `<x>` enumeration + `flowtron-tracks:` form all change; existing adopter overlays referencing retired `.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md` paths **break on bump** → migration note must cover both fork styles.
- **Docs enumerating the family:** `docs/MIGRATION.md` §1.2.1 (primary rewrite + adopter migration note) · `SPEC.md` §"Skill namespace" · `ft-flowtron` roster (6 rows → 1) · `docs/PLATFORMS.md` · `docs/GLOSSARY.md` · `docs/CONVENTIONS.md` · `docs/VISION.md` · `docs/AGENT-NEUTRALITY.md` · `SECURITY.md` · `SPEC/tasknote-selection.md` · `SPEC/gates.md` · `SPEC/procedures/ft-task.md` · `codex/AGENTS-snippet.md`.
- **Skill cross-dependencies:** `ft-release` §7.1 (invokes `/ft-audit-docs` as drift-sweep subroutine) · `ft-update` (overlay `flowtron-tracks` warning) · `ft-new-project` · `ft-audit-repo` (delegation hints to the focused family) · `ft-task` (🔍 audit-family next-move flag).
- **Roster-count invariant:** count mirrors (CORE-374) change 26 → 21 when the five retire.
- **Measured delta (what becomes a pass file):** five pass definitions (§2, ~15–20 lines) + severity-guide bullets (§3, ~4) + scope-glob/rubric hints (§1) + 0–2 specialist hard rules (§6) + attribution string — ~30 lines/domain × 6 domains (general, backend, frontend, security, performance, docs).

### Resolved scoping

| Question | Resolution |
|---|---|
| Promote plain CORE-389 to epic? | Yes — Re-scope verdict confirmed by operator (option: Promote to epic) |
| Epic ID | Reuse the numeric suffix: **CORE-EPIC-389** (keeps [[CORE-389]]-adjacent wikilinks meaningful); plain line converted in place under `## Medium` |
| Implementation-child count M | **M=3** — one child per work shape: build · retire · docs/migration |
| Audit bracket | Include **CORE-389.N** (filed `[medium]🧩` — audit doesn't need the parent's `[heavy]`; deliberate deviation recorded) |
| Parent metadata | Priority Medium · `[heavy]🧠` · shortname `audit-family-consolidation` (carried from plain line) |
| Plain CORE-389.md tasknote | Discovery content folded into this scaffold; superseded file removed (was uncommitted) |

### Drafted child lines (word-counted)

- **.2** `parameterized-survivor` `[heavy]🧠` — ~45w: rewrite `ft-audit` SKILL.md as `/ft-audit <domain>` dispatcher over six-file `passes/` library; default domain general; §0 checklist survives once; repoint `/ft-release` §7.1 subroutine.
- **.3** `sibling-retirement` `[light]🔧` — ~44w: delete five scaffolds + command wrappers + codex mirrors; rewrite surviving wrappers; update roster enumerations + count mirrors.
- **.4** `migration-and-docs` `[medium]🧩` — ~48w: MIGRATION §1.2.1 rewrite + adopter migration note (both fork styles); overlay template; remaining doc sweep.

### Downstream-impact scan (proposed reconcile actions, pending confirm)

- **CORE-386** — *stale reference*: "post-[[CORE-389]]" now points at a converted line → **edit** to "post-[[CORE-EPIC-389]]".
- **CORE-387** — *stale reference*: "fold into `ft-audit-docs`" names a skill being retired → **edit** to name the consolidated audit skill's docs pass.
- **CORE-390 / CORE-391 / CORE-392** — *unaffected* (no audit-family surface; CORE-392 touches count mirrors too, but sequentially — leave).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-EPIC-057 cohort filing pattern: 2-space child indent under the parent, `[model]` tag on every line, em-dash separator, per-child description ≤70w hard cap.

- [x] **Minimal refactor gate** — `N/A`; pure PLAN.md filing, no source modules touched.

- [x] Implemented the minimal solution — three child lines written between `.1` and `.N`.

- [x] Updated/added tests for non-trivial behavior — `N/A`; no executable code surface.

**Implementation Notes:**

- Three child lines filed (`.2` ~45w · `.3` ~44w · `.4` ~48w — all under the 50w target); M unchanged from the filing-time estimate (3); `.N` audit line untouched (reviewed and confirmed as-filed, with its deliberate `[medium]🧩` tag).
- Downstream-impact reconcile edits applied per operator confirm (2): CORE-386 `post-[[CORE-389]]` → `post-[[CORE-EPIC-389]]`; CORE-387 "fold into `ft-audit-docs`" → "fold into the consolidated audit skill's docs pass (post-[[CORE-EPIC-389]])". CORE-390/391/392 unaffected. Note: CORE-386's "all 26 skills" prose is a count mirror that `.3` sweeps at retirement time — meaning intact today, left alone.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; markdown-only (PLAN.md + tasknote).

- [x] Ran lint/type-check on changed code — `N/A`; no code changed.

- [x] **Quality assertions** — markdown mental-pass on the edited PLAN block: 2-space indent preserved on all five child lines, bold IDs intact, `[model]` tag + `| shortname` (≤30 chars) present on every new line, em-dash separators consistent, descriptions ≤70w, reconcile-edited CORE-386/387 lines still parse, no trailing whitespace.

- [x] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 12 entries **no change**: `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`. Pure Discovery filing — no shipped surface changed; the contract/doc edits land inside `.2`–`.4`.

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md `.1` line flipped to stub form and kept nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Promoted plain CORE-389 to CORE-EPIC-389 (Re-scope verdict: ~30 files, four work shapes — epic-sized on contact, as the filed line predicted) and closed its `.1` Discovery in the same session. Filed three implementation children under the parent: `.2` parameterized-survivor (`[heavy]` — `/ft-audit <domain>` dispatcher + six-file pass library), `.3` sibling-retirement (`[light]` — delete five scaffolds + wrappers + mirrors, update rosters/count mirrors), `.4` migration-and-docs (`[medium]` — MIGRATION §1.2.1 rewrite + adopter migration note for both fork styles + doc sweep); `.N` audit confirmed as-filed. Applied two operator-confirmed reconcile edits (CORE-386/387 stale references → `[[CORE-EPIC-389]]`). Key Discovery findings carried into the children: §§3–6 of the six scaffolds are near-verbatim (~30 genuine lines/domain), `/ft-release` §7.1's docs-audit subroutine must repoint, and existing adopter thin overlays referencing retired submodule paths break on bump — the migration note's core case. Workflow-only closure; no shipped surface changed.

**Archived:** 2026-07-31
