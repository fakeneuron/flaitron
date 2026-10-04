---
title: structure-domain
status: completed
tags: []
created: 2026-08-23
due:
related-tasks: [CORE-EPIC-463]
touches:
  - claude/skills/ft-audit/passes/structure.md
  - claude/skills/ft-audit/SKILL.md
  - claude/commands/ft-audit.md
  - codex/skills/ft-audit/SKILL.md
  - claude/skills/ft-flowtron/SKILL.md
  - claude/skills/ft-audit-repo/SKILL.md
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
  - docs/PLATFORMS.md
  - docs/GLOSSARY.md
parallel-safe-with:
  - CORE-463.3
  - CORE-463.4
---

# CORE-463.2 | structure-domain

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-463]]

## 🎯 Goal

Add a seventh `structure` domain to the `ft-audit` passes/ library — five passes covering duplication clusters, coupling and module boundaries, abstraction drift, god-files, and stray scripts that should become justfile targets, CLI subcommands, tests, or CI — registered across every surface that enumerates the domain set.

## ✅ Acceptance

- [x] `claude/skills/ft-audit/passes/structure.md` exists with the family's exact heading skeleton (Attribution slug · Scope & rubric hints · The 5 passes · Severity guide · Specialist additions; optional cross-cuts preamble per the `performance` precedent), slug `audit-structure`, five passes = Duplication clusters · Coupling & boundaries · Abstraction drift · God-files · Stray scripts, within the family's ~41–52-line size band
- [x] Every placeholder in `structure.md` is §1.5-structurally-detectable: `<…>` spans confined to §"Scope & rubric hints"; `_(forker: …)_` notes for the judgment slots — so the CORE-463.4 bootstrap fires correctly on the unforked scaffold
- [x] Domain registered in the dispatcher: `SKILL.md` frontmatter `description:` Domains list, "One dispatcher, six domains" → seven, §1 step 1 token list
- [x] All eight remaining enumeration surfaces updated: `claude/commands/ft-audit.md` (description + body token list) · `codex/skills/ft-audit/SKILL.md` description · `claude/skills/ft-flowtron/SKILL.md` roster line 55 · `claude/skills/ft-audit-repo/SKILL.md` delegation list line 58 · `docs/GLOSSARY.md` audit-family entry · `docs/MIGRATION.md` §1.2.1 (six-file count, domain table row, "all six domains", "six domains" heading) · `docs/PLATFORMS.md` Claude Code row · `templates/audit-overlay-template.md` ("all six" example + domain-token list)
- [x] Verification: structural-parity check across all seven pass files; §1.5 detection rule (any `<…>` in Scope & rubric hints / any `_(forker: …)_`) confirmed to fire on `structure.md`; repo-wide grep shows zero stale six-domain enumerations outside historical records
- [x] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs" with per-entry verdicts

## 🧩 Subtasks

- [x] Author `claude/skills/ft-audit/passes/structure.md` (five passes per the PLAN line; §1.5-compatible placeholders; `/ft-refactor` depth-escalation pointer per the `.1` scoping boundary)
- [x] Register the `structure` token in `claude/skills/ft-audit/SKILL.md` (description · "six domains" line · §1 step 1 list)
- [x] Update the two wrappers: `claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`
- [x] Update roster + delegation + template surfaces: `ft-flowtron` line 55, `ft-audit-repo` line 58, `templates/audit-overlay-template.md` lines 30/33
- [x] Update doc enumerations: `docs/GLOSSARY.md` line 17, `docs/MIGRATION.md` lines 76 / domain table / 139 / 166, `docs/PLATFORMS.md` line 35
- [x] Phase 3: parity + placeholder-detection + stale-enumeration grep sweep
- [x] Phase 4: doc-drift sweep, PLAN stub flip (kept nested under the active parent), archive

## 🔗 Related

- [[CORE-EPIC-463]] — parent epic
- [[CORE-463.1]] — epic Discovery; scoped this child (`parallel-safe-with:` [[CORE-463.3]] · [[CORE-463.4]] per its 🌳 Fan-out)
- [[CORE-463.3]] — `/ft-refactor` depth planner; `structure.md` names it as the depth-escalation path (breadth sweep here, depth plan there — boundary fixed at `.1` scoping)
- [[CORE-389.2]] — built the passes/ library; source of the structural-parity contract (`related-decision:`)
- [[CORE-463.4]] — §1.5 scaffold bootstrap; its structural detection rule was designed to stay correct for this domain (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap re-verified against HEAD this session, not recalled from the `.1` note: `passes/` holds exactly six files, no `structure` token resolves anywhere, and nothing in `general`'s Hygiene/Orphans passes reaches duplication clusters, coupling, abstraction drift, god-files, or stray scripts. Siblings `.1`/`.4` closed without touching this surface; scope filed at `.1` is unchanged.

- [x] Read relevant source files — `claude/skills/ft-audit/SKILL.md` in full (§§0–8 incl. the CORE-463.4 §1.5 bootstrap); pass files `general.md`, `docs.md`, `performance.md` in full + sizes of all six (41–52 lines); `claude/commands/ft-audit.md`; `codex/skills/ft-audit/SKILL.md`; `templates/audit-overlay-template.md`; enumeration contexts in `ft-flowtron`, `ft-audit-repo`, `docs/MIGRATION.md` §1.2.1, `docs/PLATFORMS.md`, `docs/GLOSSARY.md`.

- [x] **Best Practices Review** — pure data-file extension of an established composition: the dispatcher owns the shared procedure, a pass file supplies domain deltas (CORE-389.2's lazy-fragment shape). No new abstraction, no dependency-direction change; SRP boundary is exactly "one domain's deltas in one file". The only design judgments are content-level: pass definitions, severity ladder, and the `/ft-refactor` escalation boundary (fixed at `.1` scoping: `structure` = breadth sweep with flat tickets; `/ft-refactor` = depth plan on one named target).

- [x] **Archive skim** — `grep -l ft-audit archive/core/*.md` → load-bearing hits read: **[[CORE-463.1]]** (epic scoping — resolved-scoping table fixes this child's boundary and the stray-scripts placement); **[[CORE-389.2]]** (built the passes/ library — structural-parity contract: identical heading skeleton across pass files, `performance`'s cross-cuts preamble a sanctioned extra, slug pattern `audit-<domain>`, enumeration surfaces deliberately split out); **[[CORE-463.4]]** (§1.5 bootstrap — detection is *structural*, explicitly designed to fire on "domains not yet written (notably `.2`'s structure)": any `<…>` span in §"Scope & rubric hints", any `_(forker: …)_` note; the pass file *declares* its gate slots and §1.5 derivation reads them, so a new domain composes with zero bootstrap edits; `.4` fixed its own MIGRATION drift at closure — precedent that each child updates the docs its change drifts, while `.5` owns the ft-refactor wiring + roster counts).

- [x] **Drift check** — PLAN line matches HEAD (six domains exist, `structure` absent everywhere); no SPEC contract touched (skill-family content, not workflow contract); enumeration inventory taken fresh via two grep sweeps (the first missed backticked lists — widened gap found `ft-audit-repo:58`, `GLOSSARY:17`, `SKILL.md:32`, overlay-template:33). Ten enumeration/creation surfaces total; no other hits outside historical records (`MIGRATION:501` retirement table, VERSION-HISTORY, archived tasknotes — all write-once, untouched).

- [x] Asked clarifying questions — **No clarifications needed.** The `.1` Discovery already resolved this child's scoping with the operator (breadth-sweep shape, stray-scripts as pass 5, `/ft-refactor` boundary). Explicit assumptions: (1) dispatcher registration + wrapper/mirror/doc enumeration updates are in-scope — a domain that doesn't resolve isn't "added", and per the `.4` precedent each child fixes the drift it causes; `.5` still owns ft-refactor wiring and roster *counts*. (2) `structure.md` may reference `/ft-refactor` although `.3` ships in parallel — both land before `.5` reconciles and the epic closes. (3) Historical records (MIGRATION §"Migrating a pre-consolidation audit fork" v5.15.0 table, VERSION-HISTORY, archives) keep "six".

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Pass-file contract (from the three read in full + CORE-389.2):** heading skeleton `# <domain> — /ft-audit pass library` → loader blockquote → `**Attribution slug:**` → optional cross-cuts preamble → §"Scope & rubric hints (→ dispatcher §1)" → §"The 5 passes (→ dispatcher §2)" → §"Severity guide (→ dispatcher §3)" → §"Specialist additions". Family size band 41–52 lines.
- **§1.5 compatibility is a hard formatting constraint, not a style choice:** `<…>` placeholders only inside §"Scope & rubric hints"; judgment slots marked `_(forker: …)_`. Gate slots must be *declared* by the pass file (structure declares: duplication detector · complexity/size analyzer · dead-code detector) so derivation can match candidates to slots.
- **Gates optional precedent:** `docs.md` ships "Skip entirely if no doc tooling is configured" — structure adopts the same posture (structural passes still run on read-the-code evidence).
- **Cross-cuts:** with `general` (Hygiene/Orphans graze file-local smells — dead imports, >60-line functions); structure takes the cross-file view. Precedent: `performance.md`'s cross-cuts preamble.
- **Carve-out adjustment:** structural fixes are never trivial (even a one-line dedup changes call sites and needs characterization coverage) — narrow the dispatcher §5 trivial-fix carve-out to non-code nits for this domain, mirroring `security`'s narrowing precedent.
- **Enumeration inventory (10 surfaces):** see Acceptance; grep-derived fresh, exact lines recorded there.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-389.2 pass-file shape verbatim: same heading skeleton, `audit-<domain>` slug, dispatcher-§-pointer suffixes on headings, `performance`-precedent cross-cuts preamble, `docs`-precedent optional-gates posture, `security`-precedent carve-out narrowing. No new shape; the dispatcher required zero procedural edits (composition held — a domain is data).

- [x] **Minimal refactor gate** — N/A: no refactor performed or needed; every edit is either the new data file or a mechanical enumeration update. Nothing deferred.

- [x] Implemented the minimal solution — `passes/structure.md` (new, 55 lines) + 16 enumeration edits across 9 files, applied via a fail-loud exact-match script (each pattern asserted unique before replace).

- [x] Updated/added tests — N/A: agent-facing markdown contract, no executable surface. Equivalent verification is the Phase 3 parity/detection/sweep checks.

**Implementation Notes:**

- **`passes/structure.md` (55 lines — top of the family band; the two sanctioned extras, a cross-cuts preamble and the `/ft-refactor` escalation note, account for the delta over the 41–52 core band).** Five passes: Duplication clusters (≥2-site evidence rule) · Coupling & boundaries · Abstraction drift · God-files · Stray scripts (each finding proposes a concrete destination: justfile target / CLI subcommand / test / CI). Declared gate slots: duplication detector · complexity/size analyzer · dead-code detector — all optional per the `docs` precedent. Severity ladder keys Critical to *active correctness consequence* (diverged invariant copies, gate-skipping boundary violation, import-cycle failure), not size aesthetics.
- **Boundary encodings from `.1` scoping:** breadth-vs-depth split written into the cross-cuts preamble (multi-step restructurings → recommend `/ft-refactor <target>`, never an oversized ticket); trivial-fix carve-out narrowed to non-code nits (no code move is trivial in this domain — call-site changes need characterization coverage first); judge-against-declared-structure hard rule prevents textbook-layering false positives.
- **Registration edits (16, all exact-match verified):** dispatcher `SKILL.md` ×3 (description · "seven domains" · §1 token list) · `claude/commands/ft-audit.md` ×2 · `codex/skills/ft-audit/SKILL.md` ×1 · `ft-flowtron` roster ×1 · `ft-audit-repo` delegation list ×1 · `GLOSSARY` ×1 · `MIGRATION` ×4 (seven-file · table row · all seven · heading) · `PLATFORMS` ×1 · overlay template ×2.
- **§1.5 required zero edits** — CORE-463.4 built detection structurally and derivation slot-driven, exactly so a new domain composes for free. Confirmed by inspection: the gate-slot examples in §1.5 step 3 are illustrative and non-exhaustive (backend already absent).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; `viz/` and `tools/` untouched).

- [x] Ran lint/type-check on changed code — N/A (no lintable code surface); trailing-whitespace grep over both new files returned nothing.

- [x] **Quality assertions** — no duplication added (the pass file is pure domain data; shared procedure untouched); no dead content; no public-surface growth beyond the intended domain; enumeration surfaces now consistent repo-wide (see sweep below).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- **Structural parity:** heading-skeleton grep across all 7 pass files — identical (`Attribution slug` → `Scope & rubric hints (→ dispatcher §1)` → `The 5 passes (→ dispatcher §2)` → `Severity guide (→ dispatcher §3)` → `Specialist additions`); `structure.md`'s heading offset (18 vs 9) matches `performance.md`'s sanctioned cross-cuts preamble (14 vs 9). ✅
- **§1.5 detection fires correctly:** 6 `<…>` spans all inside §"Scope & rubric hints" + 10 `_(forker: …)_` notes → unforked scaffold triggers the bootstrap. The single out-of-block span, `<target>` in the `/ft-refactor <target>` command syntax, is invisible to rule 1 (block-scoped) — no false placeholder on a filled fork. ✅
- **Stale-enumeration sweep:** repo-wide greps for `six domain|six-file|all six` and gapped domain-token lists — only survivors are `ft-release:492` (unrelated "six AGENTS command strings") and `MIGRATION:502` (historical v5.15.0 retirement table, write-once). ✅
- **Git surface:** exactly the 9 modified + 2 new intended paths — no collateral. ✅
- **Live confirmation:** the session's skill listing hot-reloaded the updated `ft-audit` description with `structure` present. ✅

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":

  | Doc | Verdict |
  |---|---|
  | `README.md` | no change |
  | `AGENTS.md` | no change |
  | `SPEC.md` | no change (names the skill, never the domain set) |
  | `docs/MIGRATION.md` | **updated in this task** — seven-file library, `structure` table row, "all seven domains", section heading |
  | `claude/AGENTS-snippet.md` | no change (grep: no domain enumeration) |
  | `codex/AGENTS-snippet.md` | no change |
  | `cursor/AGENTS-snippet.md` | no change |
  | `grok/AGENTS-snippet.md` | no change |
  | `docs/CONVENTIONS.md` | no change |
  | `CONTRIBUTING.md` | no change |
  | `SECURITY.md` | no change |
  | `docs/AGENT-NEUTRALITY.md` | no change |
  | `docs/PLATFORMS.md` | **updated in this task** — "over seven domains" |
  | `claude/CAPABILITIES.md` | no change |
  | `docs/AGENT-COMPAT.md` | no change |
  | `docs/EXTERNAL-AGENTS.md` | no change |
  | `docs/WORKTREES.md` | no change |

  (Outside the cold-start list, `docs/GLOSSARY.md` and the skill-layer surfaces were updated as part of the deliverable itself. `.5` still owns the `/ft-refactor` wiring, roster counts, and its own doc sweep.)

- [x] Closed — every `## ✅ Acceptance` criterion ticked (the pass-file size criterion met with the noted 55-line/sanctioned-extras annotation), YAML `status:` flipped to `completed`, PLAN.md `.2` line flipped to stub form and kept 2-space-nested beneath the active `CORE-EPIC-463` parent per the epic child-placement invariant, tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary.

**Final Summary:**

Added the seventh `structure` domain to `/ft-audit`: a new `passes/structure.md` whose five passes sweep duplication clusters, coupling and module boundaries, abstraction drift, god-files, and stray scripts (each stray-script finding proposing a concrete destination — justfile target, CLI subcommand, test, or CI), registered across all ten surfaces that enumerate the domain set.

**Changed files:** `claude/skills/ft-audit/passes/structure.md` (new, 55 lines) + 16 exact-match enumeration edits across `claude/skills/ft-audit/SKILL.md`, `claude/commands/ft-audit.md`, `codex/skills/ft-audit/SKILL.md`, `claude/skills/ft-flowtron/SKILL.md`, `claude/skills/ft-audit-repo/SKILL.md`, `docs/GLOSSARY.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `templates/audit-overlay-template.md`.
**Verification:** structural parity across all 7 pass files; §1.5 placeholder detection confirmed to fire on the unforked scaffold with zero false positives on a filled fork; repo-wide stale-enumeration sweep clean outside write-once historical records; git surface exactly the intended paths.
**Refactors:** none made, none needed — the CORE-389.2 composition absorbed a new domain as pure data (zero dispatcher-procedure edits, zero §1.5 edits).
**Documentation verdict:** 2/17 AI-referenced docs updated in-task (`MIGRATION`, `PLATFORMS`); 15/17 no change.
**Maintainability effect:** closes the structural-audit gap the epic Discovery confirmed (nothing previously reached cross-file duplication, coupling, or stray scripts); `ft-update` Step 4.5 will offer `structure.md` to existing full-copy forks automatically, and thin overlays inherit it with no action — the `.1`-scoped breadth/depth boundary is now encoded in the pass file itself, keeping `/ft-refactor` (`.3`) and this domain composable rather than overlapping.

**Archived:** 2026-08-23
