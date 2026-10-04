---
title: contract-surface-fence-langtags
status: completed
tags: []
created: 2026-05-14
due:
related-tasks: [CORE-079]
---

# CORE-086 | contract-surface-fence-langtags

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-079]]

## 🎯 Goal

Add explicit Markdown code-fence language tags on the contract-facing snippets called out by the audit (README viz commands as `sh`; stack-neutral audit scaffold placeholders as `text` / `sh`) so the markdown-hygiene rubric matches reality.

## ✅ Acceptance

- [x] `README.md` — viz dev/install example block uses a tagged opening fence (e.g. `sh`), not a bare ` ``` `.
- [x] `claude/skills/audit/SKILL.md` — §1 verification-gate block uses `sh` (or equivalent) on the opening fence; §3 finding-format template block uses `text` on the opening fence.
- [x] `.claude/skills/audit/SKILL.md` — remaining bare contract fences aligned for parity: §1 scope tree → `text`, §3 finding-format template → `text` (same shapes as scaffold; keeps fork and scaffold from diverging on hygiene).
- [x] No prose, heading, or structural edits beyond fence openers (and matching closers unchanged).

## 🧩 Subtasks

- [x] `README.md` — retag opening fence before the `cd ~/code/flowtron/viz` / `npm` commands as ` ```sh ` (lines ~39–43).
- [x] `claude/skills/audit/SKILL.md` — retag indented verification-gate block (~39–43) as `sh`; retag §3 finding-format block (~59–65) as `text`.
- [x] `.claude/skills/audit/SKILL.md` — retag §1 scope glob block (~16–25) as `text`; retag §3 finding-format block (~61–67) as `text`.
- [x] `grep` both audit paths + `README.md` for stray bare opening fences (`^```$` / leading-space variants) in the edited sections; confirm quad-backtick `dataview` example in README stays valid.

## 🔗 Related

- [[CORE-079]] — prior SPEC-wide fence-langtag pass; same hygiene pattern (`text` vs `markdown` vs `sh`).
- Audit 2026-05-14 findings #2–#3 (Low) — source of this ticket.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN scope is narrow doc hygiene; paths exist and match repo layout. Optional `.claude/` parity added so the forked audit skill (what agents load) is not left worse than the scaffold.

- [x] Read relevant source files
- [x] **Archive skim** — `grep -l README.md archive/core/*.md` hits many historical tasknotes (viz/README cross-links, migration, etc.); none override this ticket. `grep -l audit` on archives surfaced [[CORE-072]], [[CORE-073]], [[CORE-075]], [[CORE-080]] — load-bearing: [[CORE-079]] already tagged bare fences in `SPEC.md` using `text` / `markdown`; same idiom applies here (`sh` for shell recipes, `text` for illustrative template blocks).
- [x] **Drift check** — `README.md` lines 39–43 still use a bare fence for the viz block. `claude/skills/audit/SKILL.md` still has bare fences at the verification-gate placeholder (39–43) and finding-format template (59–65). `.claude/skills/audit/SKILL.md` already uses ` ```sh ` for verification gates but still uses bare fences for the §1 scope tree (16–25) and §3 template (61–67). PLAN line cites `claude/skills/audit/SKILL.md` only; `.claude/` alignment is an explicit scope extension documented above.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Invocation note:** `/task CORE-086 retag to composer` was interpreted as task ID **CORE-086** only. Flowtron PLAN `[model]` allows `opus` | `sonnet` only — no `[composer]` token. CORE-086 stays `[sonnet]` per PLAN. Model mismatch (Composer vs `sonnet`) was surfaced; user skipped the chooser — proceeding with scaffolding on the current agent.
- **Two audit SKILL paths:** Stack-neutral scaffold at `claude/skills/audit/SKILL.md`; flowtron fork at `.claude/skills/audit/SKILL.md`. Fixing both avoids the fork preaching tagged fences while still showing bare ` ``` ` in its own body.
- **README:** Obsidian `dataview` example uses quadruple-backtick wrapping — leave as-is; only the bare viz command block needs `sh`.

**No clarifications needed.** Assumptions: (1) `sh` is acceptable for README viz commands on macOS/Linux; (2) finding-format blocks are illustrative → `text`; (3) scope tree in `.claude` audit is plain listing → `text`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — [[CORE-079]] established the idiom: `sh` for shell recipes, `text` for illustrative/listing blocks. No new shape needed.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Five fence-opener edits across three files:
- `README.md:39` — ` ``` ` → ` ```sh `
- `claude/skills/audit/SKILL.md:39` — ` ``` ` → ` ```sh ` (verification-gate placeholder)
- `claude/skills/audit/SKILL.md:59` — ` ``` ` → ` ```text ` (finding-format template)
- `.claude/skills/audit/SKILL.md:16` — ` ``` ` → ` ```text ` (scope tree)
- `.claude/skills/audit/SKILL.md:61` — ` ``` ` → ` ```text ` (finding-format template)

All closing fences left unchanged. Grep confirmed no stray bare opening fences remain; `dataview` quad-backtick example in README untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Markdown-only changes; no test suite or linter applicable. Grep verification confirmed all bare opening fences in edited sections are now tagged.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: fence tag added, no structural drift; `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md`: no change.
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Tagged five bare code-fence openers across three files (`README.md`, `claude/skills/audit/SKILL.md`, `.claude/skills/audit/SKILL.md`) using the CORE-079 idiom: `sh` for shell recipes, `text` for illustrative/listing blocks. Grep-verified no stray bare fences remain.

**Archived:** 2026-05-14
