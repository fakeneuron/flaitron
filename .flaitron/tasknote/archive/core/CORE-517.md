---
title: Repo Layout Stale
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-517 | Repo Layout Stale

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add the four missing root surfaces (`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/`) to `AGENTS.md` §Repo Layout.

## ✅ Acceptance

- [ ] `AGENTS.md` §Repo Layout lists `README.md`, `SECURITY.md`, `CONTRIBUTING.md`, and `.github/` alongside the existing entries
- [ ] Each new bullet carries a short, accurate one-line description matching the existing entries' style

## 🧩 Subtasks

- [ ] Confirm the four files/dirs exist at repo root and note what each actually contains
- [ ] Add one bullet per surface to `AGENTS.md` §Repo Layout, matching existing bullet style (alphabetical-ish grouping, one-line description)
- [ ] Re-read the full §Repo Layout list for ordering/tone consistency

## 🔗 Related

- [[CORE-511]] — edited `CONTRIBUTING.md` without the Repo Layout map picking up the file's existence; this task closes that gap generally for all four missing surfaces

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed all four surfaces exist at repo root (`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/`) and confirmed `AGENTS.md` §Repo Layout (lines 43-59) omits all four — it lists `SPEC.md`, `SPEC/`, `.flowtron/`, `claude/`, `codex/`, `cursor/`, `grok/`, `docs/`, `templates/`, `tools/`, `viz/` only. The PLAN.md claim holds exactly as stated.

- [x] Read relevant source files — `AGENTS.md` (full file), root directory listing (`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/` all present)

- [x] **Best Practices Review** — N/A (docs-only change, single list; no code/module boundaries touched)

- [x] **Archive skim** — Read `CORE-511.md` (the tasknote cited in this task's PLAN.md description). It edited `CONTRIBUTING.md`'s "Pull requests" section and its own Phase 4 doc-drift sweep explicitly checked `AGENTS.md` and found "no change (no mention of `.claude/` wiring or `CONTRIBUTING.md` content)" — i.e. CORE-511 checked whether its *content* change needed reflecting in AGENTS.md, not whether AGENTS.md's Repo Layout map lists `CONTRIBUTING.md` as a file at all. The gap this task closes (the map itself is stale) is distinct and wasn't addressed by CORE-511. No other archived tasknote (grep for "Repo Layout" across `archive/CORE/` returned only generic `AGENTS.md` mentions, not layout-list edits) touched this specific list.

- [x] **Drift check** — No drift. `AGENTS.md` §Repo Layout content matches what's live in the repo (checked, not recalled); the task's proposed fix (add 4 bullets) doesn't contradict any SPEC contract — Repo Layout is a plain descriptive list, not a schema.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: descriptions should be short and factual (one line, matching existing bullets like "`docs/` — supporting docs, conventions, migration, platform compatibility, and design rationale."), not aspirational — e.g. describe what's actually in `SECURITY.md`/`.github/` today rather than a generic template blurb.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Root surfaces to add, with contents confirmed by reading each:
  - `README.md` — top-level project overview/entry point.
  - `SECURITY.md` — security policy (vulnerability reporting).
  - `CONTRIBUTING.md` — contributor guide (maintenance model, filing issues, PR process, wiring pointer added in CORE-511).
  - `.github/` — GitHub-specific config (checked: contains only `workflows/ci.yml`, no issue/PR templates).
- `AGENTS.md` §Repo Layout currently sorts roughly by role (workflow contract → SPEC modules → flowtron's own state → per-agent wiring dirs → docs/templates/tools → viz). Will insert the four new root-file/dir bullets in a natural place near the top (repo-standard root files) rather than disrupting the existing agent-wiring block ordering.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing bullet pattern exactly: `` `path` — one-line description. `` per existing entries (e.g. `SPEC.md`, `docs/`)

- [x] **Minimal refactor gate** — no refactor; four additive bullets only, no reordering of existing entries

- [x] Implemented the minimal solution — added `README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/` bullets to `AGENTS.md` §Repo Layout

- [x] N/A — docs-only change, no test-worthy behavior

**Implementation Notes:**

- Inserted the four new bullets at the top of the §Repo Layout list (before `SPEC.md`), as standard repo-root surfaces, preserving the existing entries and their order unchanged below.

## 🧪 Phase 3: Testing & Linting

- [x] N/A — no test suite applies to a prose doc addition

- [x] N/A — no lint/type-check applies to markdown prose

- [x] **Quality assertions** — no duplication (each surface described once); no dead code; matches surrounding bullet style; descriptions verified against actual file contents, not templated filler

- [x] N/A — no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**
  - `README.md` — no change (repo-layout detail lives in `AGENTS.md`, not duplicated in `README.md`)
  - `SPEC.md` — no change (workflow contract, not a repo-map doc)
  - `docs/MIGRATION.md` — no change (adopter-facing; flowtron-self's root-file set isn't part of the adopter recipe)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change (none carry a Repo Layout list; confirmed via grep, no match)

- [x] Closed — both `## ✅ Acceptance` criteria met: all four surfaces now listed in `AGENTS.md` §Repo Layout with accurate one-line descriptions matching existing bullet style

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Added four bullets (`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `.github/`) to `AGENTS.md` §Repo Layout, closing the drift the audit-context pass surfaced: the map had never listed these standard root surfaces even though all four exist and `CONTRIBUTING.md` was actively edited under CORE-511. No code changed; no tests apply. 1 file touched, 4 lines added.

**Archived:** 2026-08-30
