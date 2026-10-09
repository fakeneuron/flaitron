---
title: skill-surface discovery
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-769, CORE-769.N, CORE-349.5, CORE-572, CORE-510]
touches:
  - .flaitron/PLAN.md
---

# CORE-769.1 | skill-surface discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-769]] [[CORE-769.N]] [[CORE-349.5]] [[CORE-572]] [[CORE-510]]

## 🎯 Goal

Settle flaitron's skill surface — packaging channel, default-wiring policy (incl. the fork-only `ft-audit` and global-only utilities), skill renames, and roster add/retire (incl. the `claude/commands/` wrappers) — and file CORE-EPIC-769's implementation children (or a second epic) in PLAN.md, ahead of the next release.

## ✅ Acceptance

- [x] Shared design surface inventoried (roster sources, adopter wiring, rename mechanics, SPEC/versioning impact) — `judgment`: captured in Discovery Notes (Probes A–D)
- [x] Each "Open at promotion" question from the starter has a recorded decision — `judgment`: "Resolved scoping" table plus the Context-cost line in Discovery Notes. The plugin-pin question is settled by Probe A and CORE-384. The `audit`/`ft-audit` coexistence hazard is real, and `.2` removes it.
- [x] Concrete child scopes filed in `.flaitron/PLAN.md` under CORE-EPIC-769, before `.N` (or a second epic filed) — `grep -cE …` → 7 before the `.1` flip (`.1`–`.7`)
- [x] Each filed child line under the 70w hard cap — `judgment`: `wc -w` gave 42/35/15/31/11/41, all within the 50w target
- [x] Audit line CORE-769.N reviewed and confirmed as filed (or rewritten on a scope shift) — `judgment`: the generic `.N` line fits; no scope shift
- [x] Drift checks clean after closure edits — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Drift-check the starter's captured claims against current files
- [x] Inventory shared design surface via probes (plugin/commands facts, rename mechanics, audit wiring, archive precedents) — log in Discovery Notes
- [x] Surface open scoping questions via AskUserQuestion — record answers in a "Resolved scoping" table
- [x] Draft child lines; word-count each (≤50w target / 70w cap); add `## 🌳 Fan-out` if M>1
- [x] Phase 2: write child lines into `.flaitron/PLAN.md` (2-space nested, before `.N`)
- [x] Phase 3: markdown pass + `bash tools/drift-checks.sh`
- [x] Phase 4: doc-drift sweep, flip `.1` stub, archive

## 🔗 Related

- [[CORE-EPIC-769]] — parent epic
- [[CORE-769.N]] — terminal audit
- [[CORE-349.5]] — added the `/ft-release` §7.1 installed-surface check a roster change must satisfy
- [[CORE-572]] — precedent for retiring a skill (worktrees)
- [[CORE-510]] — made the adopter paste-block name the skills and point at SPEC

## 🌳 Fan-out

- **Sequential:** [[CORE-769.3]] after [[CORE-769.2]]; [[CORE-769.4]] after [[CORE-769.3]]; [[CORE-769.5]] after [[CORE-769.4]]; [[CORE-769.6]] after [[CORE-769.5]]; [[CORE-769.7]] after [[CORE-769.6]] (all edit the shared roster files; `.7` needs the final rename map)
- **Synthesis:** [[CORE-769.N]]

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today; nothing has shipped against it. Four probes found real problems with the current surface: redundant command wrappers, an `/audit` → `ft-audit` routing hazard, and an `ft-audit-repo` global-only rationale that the skill body doesn't support. Packaging is narrowed by a settled decline (see Drift check), not invalidated.

- [x] Read relevant source files — delegated to four read-only probes (plugin/commands facts, rename/retire mechanics, audit wiring, archive skim); distilled below

- [x] **Best Practices Review** — boundary: the snippet `ln -s` blocks are the roster SSOT (CORE-465), and the docs + gates derive from them. Prose slug lists in `SPEC/layout.md` §"Skill namespace", `docs/PLATFORMS.md`, `AGENTS.md`, the paste-block, and `drift-checks.sh` `skill_pin_guard_parity` are unbound duplicates, so every child that renames a slug must sweep them. No in-scope refactor; children own the edits.

- [x] **Archive skim** — `archive/core/` confirmed against README (`CORE-*` → `archive/core/`); >3 hits → probe. Findings below.

- [x] **Drift check** — the starter's rename counts match HEAD~1 exactly (51/49/23/30/25). Cross-artifact drift: the starter treats the packaging channel as open, but `docs/CONVENTIONS.md` §"Package-manager and marketplace distribution" (CORE-384) already declines plugin marketplaces as incompatible with SPEC principle #5. Live Claude Code docs confirm the reasons: a plugin pin lives in the user-level marketplace entry, with one marketplace per name per user, so there is no per-project pin, and plugin skills are namespaced `/flaitron:<skill>`. Verdict: the channel is settled as the submodule, and the `ft-` prefix stays. Renames can proceed without risking a second rename wave.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 4 asks via AskUserQuestion; see Resolved scoping

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

_Starter context (filed 2026-10-09, commit `7e6740a5`) absorbed into Goal and the notes below; the original lives in git history._

**Probe A — Claude Code facts (docs: code.claude.com/docs/en/skills.md, plugins/*).**
- Commands "have been merged into skills". When `.claude/commands/<n>.md` and `.claude/skills/<n>/SKILL.md` share a name, the skill wins. Skills are slash-invocable and support `argument-hint` and `$ARGUMENTS` in their own frontmatter, so the `claude/commands/` wrappers add no capability. This session's own skill listing shows one entry per `ft-*` slug, carrying the SKILL.md description.
- Plugins: project-scoped `enabledPlugins` is supported, but `ref`/`sha` live in the marketplace entry, the marketplace is registered per user, and only one is allowed per name. That rules out per-project pinning. Skills are namespaced `/<plugin>:<skill>`.
- Context cost: every model-invocable skill's description loads each session. The listing budget is 1% of the context window, and descriptions are capped at 1,536 chars each. `disable-model-invocation: true` drops a description from context while keeping it `/`-callable. Measured: the 12 bundled descriptions total ~5.0 KB (~1.2k tokens); `ft-audit` + `ft-audit-repo` add ~1.05 KB. Wiring everything is cheap.

**Probe B — rename/retire mechanics.**
- Nothing in the tooling treats a rename as a rename. It behaves as a retire plus a new skill. `/ft-update` Step 4 wires the new slug, and Step 4.6 reports the old one as dangling without pruning it. `update-adopters.mjs` `addedFilesForSurface` uses `--diff-filter=A`, which drops a `git mv`'d skill (checked against v2.2.0..v3.0.0). A rename release therefore needs a Migration block or a migrate mode.
- `SPEC/versioning.md` never mentions skills. Precedent: the one true rename (v3.0.0) was a BREAKING major hard cut with no alias. Retirements shipped as minors.
- Retiring `claude/commands/` breaks these gates, which must be retired or re-pointed in the same child:
  - drift-checks: `wrapper_name_invariant`, `pair_j` (built on stub `argument-hint`), `pair_m` (MISSING STUB), `skill_frontmatter_yaml`'s glob, and seeded cases in `drift-checks.test.mjs`
  - `/ft-release` §7.1: the "command half covers skill half" diff and the self-wiring check
  - `/ft-update` Step 5: the hardcoded `readlink .claude/commands/ft-task.md` smoke check
  - MIGRATION: §1.0 global recipe, §1.6, and the verify steps
  - `ft-new-project` Steps 7–8
  - the audit fork recipe (`scaffold-bootstrap.md:155`, MIGRATION:135,154)
  - `CONTEXT-BUDGET.md:129` ledger
  - `update-adopters.mjs` `WIRING_SURFACES` (Claude `diffPaths` + key pattern)
- Six command stubs carry `argument-hint:`, and no SKILL.md does. Retiring the stubs means moving those hints into SKILL.md frontmatter.
- A rename also touches `shipped_skill_parity` (claude↔codex dirs), `skill_pin_guard_parity` (hardcoded slug list), §7.1's hardcoded exclusion list and regex (lines 30-35, 45), and the codex wrapper's `name:` and relative path.

**Probe C — audit wiring.**
- Symlinking the bundled `ft-audit` is safe: the bootstrap's only write is the fork+fill under `.claude/skills/audit/`, and it never writes into the submodule. As shipped it is not a usable default, though: 7 of 8 passes carry `<…>` slots, so a symlinked copy (no `## Deltas`) hits the bootstrap stop on every non-`context` run, and its "delete §0" step can't be done read-only. A default-symlink policy therefore needs a bootstrap change for the bundled case: unfilled slots on the bundled copy should mean "run degraded with a banner and an offer to overlay", not a stop.
- Live hazard: the copied `/audit` command stub says "Invoke the `ft-audit` skill". With both slugs present, `/audit` can route to the unfilled scaffold and bypass the overlay, and flaitron-self runs exactly this setup. Retiring the command wrappers removes it.
- `ft-audit-repo` has nothing that needs to run before `.flaitron/core/` exists: it writes `.flaitron/PLAN.md` and reads the tasknote README plus `SPEC/*`. MIGRATION §1.0's "before flaitron is wired in" rationale is unbacked, and the global install also escapes the version pin (no `<root>` resolution or pin guard). Per-project wiring is sound. `ft-new-project` is the only skill that truly must be global (its Step 0 aborts if `.flaitron/core/` exists).

**Probe D — archive precedents.**
- CORE-349.2/.5 set the installed-surface policy and its §7.1 allow-list and deny-list gates. CORE-465 made the snippet `ln -s` block the SSOT. CORE-519 says flaitron-self mirrors the full inventory.
- Rename waves were hard cuts in a major release with no aliases: CORE-104/105 (v3.0.0) and CORE-711.1/712 (v6.0.0). The latter added a migrate mode to `update-adopters.mjs` plus a manual MIGRATION recipe. CORE-712's learning: breaking children carry `feat!:` / `BREAKING CHANGE:` so the classifier proposes the major.
- Retire-and-record shape (CORE-390/571/572/573/603.x): delete the body, the stub, and the codex wrapper; sweep rosters; add a MIGRATION retired-skills row; check `git grep` residue.
- No archived decision explains or defends `claude/commands/`; it is a legacy convention (CORE-057.2/072). CORE-154.3 locks the `claude/` dir name for adopter-symlink stability. That constrains directory renames only, not slugs.

**Sibling callers.** `~/Code/natabula/.claude/skills/` has 21 references to `ft-new-project` / `ft-file-followup` / `ft-seed` / `ft-epic-discovery` (e.g. `natabula-adopt`). Per SPEC §"Cross-repo edit remit", those edits are filed as a natabula PLAN row, not made from here.

**Resolved scoping (AskUserQuestion, 2026-10-09).**

| Question | Decision | Consequence |
|---|---|---|
| Packaging channel | Submodule stays; `ft-` prefix stays (settled: CORE-384 / CONVENTIONS §Declines, re-confirmed by plugin docs) | Not asked — settled contract; renames are the only wave |
| Renames | All four: `ft-file-followup`→`ft-file-task`, `ft-epic-discovery`→`ft-open-epic`, `ft-new-project`→`ft-adopt`, `ft-seed`→`ft-seed-unattended`; `ft-audit-repo` kept | One child per rename (each a ~25–50-file sweep) |
| Roster / wiring | Retire `claude/commands/` wrappers only | `ft-audit` stays fork/overlay; `ft-audit-repo` stays global-only; no merges, no additions |
| Back-compat / version | Hard cut, major (v7.0.0) + rename migrate mode in `update-adopters.mjs` | No aliases; children commit `feat!:` (CORE-712 learning) |
| Epic count | One epic | Sequenced under CORE-EPIC-769 |

**Context cost** (an open-at-promotion item): measured, not a constraint (~1.2k tokens for all 12 descriptions). No `disable-model-invocation` change is filed: no wiring change needs it.

**Drafted children** (word counts after the `— `, measured with `wc -w`):
- `.2` retire-command-wrappers — 42w
- `.3` rename-file-task — 35w
- `.4` rename-open-epic — 15w
- `.5` rename-adopt — 31w
- `.6` rename-seed-unattended — 11w
- `.7` rename-migrate-mode — 41w
- `.N` audit — confirmed as filed

**Sequencing rationale.** `.2` goes first, so the renames move only skill dirs and never the command stubs. `.3`–`.6` all edit the same roster files (four snippet blocks, `SPEC/layout.md`, `docs/PLATFORMS.md`, `AGENTS.md`, `docs/GLOSSARY.md`, drift-check slug lists), so they run sequentially. `.7` needs the final rename map.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-768.1 Discovery shape: children nested 2-space under the parent before `.N`, a `[model]` tag and glyph on each row, a `| shortname`, and a `## 🌳 Fan-out` insert on `.1`

- [x] **Minimal refactor gate** — no refactor; contract edits are left to the children

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: PLAN filing only

**Implementation Notes:**

- Inserted `.2`–`.7` into `.flaitron/PLAN.md` directly above `CORE-769.N`, verbatim as approved at 🛠️.
- Post-approval, I trimmed the parent CORE-EPIC-769 description. It still said ".1 may split this into two epics", which the one-epic decision made stale. It now reads "Packaging stays the submodule (CORE-384); one epic, shipping as v7.0.0." This is a description edit, not a status flip.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no code changed

- [x] Ran lint/type-check on changed code — `N/A`: no code changed

- [x] **Verification receipt** — `N/A` for code. Markdown pass: 2-space indent, bold IDs, `[model]` + glyph, `| shortname` ≤23 chars, em-dash, `[[CORE-769.3]]` wikilinks resolve to a filed row, Fan-out IDs match the filed children.

- [x] **External review** — `N/A`: the deliverable is filed PLAN rows the operator approved verbatim at 🛠️, not a diff to grade (CORE-768.1 precedent).

- [x] (frontend) Asked the user for visual confirmation — `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -cE '^  - \[ \] \*\*CORE-769\.[0-9]+\*\*' .flaitron/PLAN.md   → 7 (pre-flip)
bash tools/drift-checks.sh                                       → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change. Covered: README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the four AGENTS-snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md. Pure Discovery filing; the roster and contract edits land in `.2`–`.7`.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-09.` stub (epic child, kept nested), tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — below

- [x] **Learnings** — `N/A`. The one durable insight is that plugin packaging was already declined and stays declined; `docs/CONVENTIONS.md` §Declines carries it. The `claude/commands/` redundancy lands in `.2`'s own contract edits.

**Final Summary:**

The skill surface for CORE-EPIC-769 is settled. Packaging stays the git submodule, and the `ft-` prefix stays: plugins can't pin per project, which reconfirms the CORE-384 decline. The `claude/commands/` wrappers retire because Claude Code skills now win over same-name commands, which also removes an `/audit` → `ft-audit` routing hazard. Four skills get hard-cut renames: `ft-file-task`, `ft-open-epic`, `ft-adopt`, `ft-seed-unattended`. A rename-aware fleet migrate mode ships them as v7.0.0. `ft-audit` stays fork/overlay and `ft-audit-repo` stays global-only, by operator choice. Probe C found the latter's "before wiring" rationale unbacked, but it was not changed.

- **Changed files:** `.flaitron/PLAN.md` gained 6 child rows plus the parent-description trim; `.flaitron/tasknote/CORE-769.1.md` was promoted from a starter, then archived.
- **Verification:** `bash tools/drift-checks.sh` → 0; child-row grep → 7 before the flip.
- **Refactors:** none.
- **Docs verdict:** no change; contract edits are deferred to the children.
- **`touches:` reconciliation:** declared 1 file and changed 1 (`.flaitron/PLAN.md`), excluding the own note.
- **Maintainability:** six sequenced children, each one context window wide. The roster-file collisions are made explicit in the Fan-out section.
- **Sibling hand-off:** natabula has 21 references to the renamed skills. Its PLAN row is filed by `.7`, not here.

**Archived:** 2026-10-09
