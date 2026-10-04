---
title: parameterized-survivor
status: completed
tags: []
created: 2026-08-01
due:
related-tasks: [CORE-EPIC-389, CORE-389.1]
---

# CORE-389.2 | parameterized-survivor

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-389]] [[CORE-389.1]]

## 🎯 Goal

Rewrite `claude/skills/ft-audit/SKILL.md` as the parameterized `/ft-audit <domain>` dispatcher over a six-file `passes/` library, with `general` as the default domain, a single surviving §0 forker checklist, and `/ft-release` §7.1 repointed to `/ft-audit docs`.

## ✅ Acceptance

- [x] `claude/skills/ft-audit/SKILL.md` is a parameterized dispatcher: resolves `<domain>` from the first `$ARGUMENTS` token (`general`/`backend`/`frontend`/`security`/`performance`/`docs`; non-domain first token → domain `general`, whole args = scope), Reads `passes/<domain>.md`, then runs the shared skeleton (scope/rubric/gates · 5 passes · finding format · closing sections · PLAN write + trivial-fix carve-out · hard rules) with the domain deltas applied
- [x] Six pass files exist under `claude/skills/ft-audit/passes/` — `general.md`, `backend.md`, `frontend.md`, `security.md`, `performance.md`, `docs.md` — each carrying its domain's 5 pass definitions, severity guide, scope-token/rubric/gate hints, attribution slug, and specialist deltas
- [x] No behavioral content lost: every domain-specific delta in the six current scaffolds is preserved in either the shared skeleton or its pass file (per-domain check: perf "Measured impact" line + measure-don't-guess + defer-to-specialists; security secret-leaked exception + narrowed carve-out + don't-theorize; docs `ai-referenced` scope token + audit-docs-not-code + archive-write-once + often-hits-carve-out note; backend verify-N+1 + don't-repeat-type-checker; frontend measure-before-memoization + don't-repeat-build-tool)
- [x] "Subroutine-safe" promoted to a shared dispatcher hard rule (any domain callable from another skill; skip forker prompts, report inline, no ticket-write when orchestrated)
- [x] §0 forker checklist survives exactly once, in the dispatcher, updated to cover the pass-file placeholder surfaces
- [x] Frontmatter `description:` covers dispatch for all six domains (CORE-328.3 lesson: descriptions are the dispatch surface)
- [x] `/ft-release` repointed: §7.1 heading + `Skill(ft-audit-docs)` invocation + prose → `/ft-audit docs` subroutine form; the Step-3 context-budget mention (line 84) updated to match
- [x] Out of scope confirmed untouched: the five sibling scaffolds + all wrappers/mirrors (deleted/rewritten in [[CORE-389.3]]), doc enumerations and overlay template ([[CORE-389.3]]/[[CORE-389.4]]) — `git status` shows only the four intended paths

## 🧩 Subtasks

- [x] Draft the dispatcher skeleton: frontmatter description, §0 forker checklist (single survivor, passes-aware), domain-resolution step, shared §§1–6 with explicit "pass file supplies X" insertion points
- [x] Extract the six pass files from the current scaffolds (general from ft-audit §2/§3/§6; the five siblings likewise), preserving all specialist deltas
- [x] Rewrite `claude/skills/ft-audit/SKILL.md` and create `claude/skills/ft-audit/passes/*.md` on disk
- [x] Repoint `claude/skills/ft-release/SKILL.md` §7.1 (+ line-84 mention) to the `/ft-audit docs` subroutine form
- [x] Verify: per-domain delta check against the six originals; markdown consistency pass; grep the two rewritten files for stale `ft-audit-<x>` self-references
- [x] Phase 4: doc-drift sweep, PLAN flip (nested stub), archive, closure commit

## 🔗 Related

- [[CORE-EPIC-389]] — parent epic (audit-family-consolidation)
- [[CORE-389.1]] — discovery child; filed this task's scope and resolved epic-level questions

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Task line matches the on-disk state exactly (six scaffolds present, §0 only in the survivor, `/ft-release` §7.1 invokes `Skill(ft-audit-docs)`); the epic's Discovery (.1) re-confirmed the CORE-388 verdict this week — no drift, no scope change.

- [x] Read relevant source files — all six audit scaffolds in full; `ft-release` SKILL §7.1 + line 84 + expected-slug lists (lines 256–284, noted for `.3`, not touched here); `claude/commands/ft-audit.md` + `codex/skills/ft-audit/SKILL.md` (rewritten in `.3`, read for shape only); `templates/audit-overlay-template.md` (rewritten in `.4`; `.2`'s file layout defines the new stable paths it will reference).

- [x] **Best Practices Review** — extends two established shapes rather than inventing one: (a) the lazy-fragment pattern (`ft-task`'s `SKILL_DIR/step-*.md` Read-on-demand fragments; SPEC.md core + `SPEC/` lazy modules) for the `passes/` library, and (b) the CORE-287 overlay's "read referenced file, substitute deltas" idiom for how the dispatcher consumes a pass file. Dependency direction preserved: `ft-release` → `ft-audit` (subroutine caller); wrappers/mirrors → SKILL.md (their rewrite is `.3`'s); overlay template → submodule paths (`.4`'s, but determined by `.2`'s layout). The duplication being removed (§§3–6 near-verbatim ×6, 65–76 differing lines of ~91) is the task's point.

- [x] **Archive skim** — `grep -l claude/skills/ft-audit archive/core/*.md` → ~20 hits; load-bearing set already synthesized in [[CORE-389.1]] (read in full): CORE-072 (family began as a consolidation), CORE-101 (re-expansion to six, commit `ba6ba8d`), CORE-185 (drift cost: one pass-name rename = 18 edits / 7 files — the maintenance-cost datum motivating this merge), CORE-287 (thin-overlay design the parameterization follows), CORE-289 (growth cap / two-project rule), CORE-328.3 (forked-audit `description:` fields were the one systematic dispatch failure — the new single description must carry all six domains' triggers), CORE-388 (verdict source).

- [x] **Drift check** — no drift: `claude/skills/ft-audit/SKILL.md` 103 lines with §0 at lines 12–25 (sole §0 in the family — siblings carry blank space where it was removed, so "survives once" = keep + extend, not deduplicate); six domains = the five siblings + general, matching the PLAN line's "six-file passes/ library"; `ft-release` §7.1 at lines 200–214 invokes `Skill(ft-audit-docs)` with a second mention at line 84; slug lists at 256–263/282–284 are enumeration surfaces belonging to `.3`.

- [x] Asked clarifying questions — 2 via AskUserQuestion, both resolved to the recommended option: **Subroutine-safe rule → promoted to shared dispatcher hard rule** (invocation mechanics, not domain content); **arg grammar → non-domain first token defaults to `general` with whole args as scope** (backward compatible with `/ft-audit last-commit` etc.).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Shared skeleton (from the 6-way diff):** §1 scope/rubric/gates frame, §2 cap-at-5 preamble, §3 finding-format block, §4 closing sections, §5 PLAN write + trivial-fix carve-out, §6 core hard rules (targeted-not-exhaustive · tickets-not-fixes · don't-audit-adjacent · no-final-summary) — near-verbatim across all six today.
- **Per-domain deltas → pass files:** 5 pass definitions + severity guide + default-scope/rubric/gate placeholder hints + attribution slug (`audit` / `audit-backend` / …) + specialist items: *perf* — cross-cuts preamble, narrow-scope preference, no-measurements-surface-first, extra "Measured impact:" finding line, measured-impact number in tickets, measure-don't-guess + defer-to-specialists rules; *security* — secret-leaked immediate-ask exception, carve-out narrowed to trivial-hygiene-only, don't-repeat-scanner + don't-theorize rules; *docs* — `ai-referenced` scope token, gates-optional wording, audit-docs-not-code + archive-write-once rules, carve-out "doc audits hit this often" note; *backend* — endpoint scope token, don't-repeat-type-checker + verify-N+1 rules; *frontend* — route scope token, don't-repeat-build-tool + measure-before-memoization rules; *general* — "prefer the focused domain when named" becomes the dispatcher's domain-resolution guidance, adopters-may-split note absorbed into §0.
- **`.2`/`.3` boundary:** `.2` leaves the five siblings and all wrappers on disk untouched — transitional state is consistent (nothing references a deleted file; the parameterized `/ft-audit` and the siblings coexist until `.3` retires them).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the established lazy-fragment shape (dispatcher SKILL.md + Read-on-demand `passes/<domain>.md`, mirroring `ft-task`'s `step-*.md` fragments and the SPEC core + `SPEC/` module split); composition of shared-skeleton + per-domain data files replaces the 6-way near-verbatim duplication.

- [x] **Minimal refactor gate** — the consolidation itself is Acceptance. One deliberate merge recorded: the four per-domain "don't repeat the <linter/type-checker/build tool/scanner>" hard-rule variants collapsed into a single shared "Don't repeat the gates" rule (equivalent behavior, removes 4-way duplication). Unrelated cleanup deferred: wrappers, codex mirrors, doc enumerations, overlay template → [[CORE-389.3]]/[[CORE-389.4]].

- [x] Implemented the minimal solution — dispatcher rewrite (103 → ~120 lines) + six pass files (~55–70 lines each) + three `ft-release` edits (heading, invocation + prose, line-84 mention, zero-findings phrasing).

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown contract files, no executable surface.

**Implementation Notes:**

- Domain resolution lives as §1 step 1 (not a new §0) so the forker checklist keeps its established §0 slot; §0 gained a passes-aware rewrite including an optional "delete pass files for surfaces you don't have" line.
- Subroutine-safe (promoted) now also states "do not write PLAN.md tickets when orchestrated" — previously asserted only by `ft-release` §7.1's side of the contract; the two surfaces now agree.
- Attribution slugs preserved per domain (`audit`, `audit-backend`, `audit-frontend`, `audit-security`, `audit-performance`, `audit-docs`) so historical `Surfaced by <slug>` lines in adopter PLANs stay consistent with future ones.
- Cross-list phrases rewritten from sibling-skill names to domain vocabulary ("cross-list with the `security` domain, pass 2").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; markdown-only change surface.

- [x] Ran lint/type-check on changed code — `N/A`; no code changed.

- [x] **Quality assertions** — structural parity verified across the six pass files (identical heading skeleton: Attribution slug · Scope & rubric hints · The 5 passes · Severity guide · Specialist additions; performance's cross-cuts preamble is a deliberate extra); zero stale `ft-audit-<x>` references inside the rewritten directory (grep-verified); §0 exists exactly once; per-domain delta checklist from Acceptance walked against the originals — all specialist items present; `git status` surface is exactly the four intended paths (no sibling/wrapper/doc touched); no public-surface growth beyond the intended `passes/` library.

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

- [x] **Doc-drift sweep** — all 12 AI-referenced entries **no change in this child**: the audit-family enumeration surfaces (`README.md`, `SPEC.md` §"Skill namespace", `docs/MIGRATION.md` §1.2.1, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `docs/CONVENTIONS.md` count mirrors, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`) are explicitly assigned to the filed siblings [[CORE-389.3]] (rosters/counts/wrappers) and [[CORE-389.4]] (MIGRATION + remaining docs); `CONTRIBUTING.md` and `claude/CAPABILITIES.md` carry no audit-family claims (grep-verified). Transitional state is consistent — the five siblings still exist on disk, so no enumeration is false today, only pre-consolidation.

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:**

Rewrote `/ft-audit` from a general-only scaffold into the parameterized `/ft-audit <domain> [scope]` dispatcher over a six-file `passes/` library (general · backend · frontend · security · performance · docs), collapsing the ~65–76-line 6-way duplication the CORE-388 review measured into one shared procedure + ~30–70-line per-domain delta files. Non-domain first tokens default to `general` (backward compatible); the §0 forker checklist survives once, passes-aware; "Subroutine-safe" was promoted from a docs-only rule to a shared hard rule (now also asserting no-ticket-write when orchestrated, matching `ft-release`'s side of the contract); the four per-domain "don't repeat the <tool>" variants merged into one shared "Don't repeat the gates" rule. `/ft-release` §7.1 repointed to `Skill(ft-audit) with args "docs"` (heading, prose, line-84 mention, zero-findings phrasing). Changed surface: `claude/skills/ft-audit/SKILL.md` (rewrite), `claude/skills/ft-audit/passes/{general,backend,frontend,security,performance,docs}.md` (new), `claude/skills/ft-release/SKILL.md` (4 spot edits). Verified: structural parity across pass files, zero stale sibling references in the rewritten dir, per-domain specialist-delta checklist walked against the originals, git surface exactly the intended paths. Siblings/wrappers/doc enumerations deliberately untouched — retirement is [[CORE-389.3]], docs/migration is [[CORE-389.4]]. Maintainability effect: future pass-content edits land in one file per domain instead of six near-copies (CORE-185's 18-edit rename cost class eliminated).

**Archived:** 2026-08-01
