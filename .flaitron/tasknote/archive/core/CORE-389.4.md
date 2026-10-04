---
title: migration-and-docs
status: completed
tags: []
created: 2026-08-01
related-tasks: [CORE-EPIC-389, CORE-389.2, CORE-389.3]
---

# CORE-389.4 | migration-and-docs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-389]] [[CORE-389.2]] [[CORE-389.3]]

## 🎯 Goal

Rewrite `docs/MIGRATION.md` §1.2.1 for the parameterized `/ft-audit <domain>` shape with an adopter migration note covering both fork styles, update `templates/audit-overlay-template.md`, and sweep the remaining docs that still enumerate the retired six-scaffold family.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.2.1 rewritten: one parameterized scaffold + six-file `passes/` library replaces the six-scaffold framing; install block forks the whole directory; `/ft-audit-repo` reframed from "seventh family member" to the second (no-fork) member
- [x] §1.2.1 carries an **adopter migration note** distinguishing the two fork styles: full-copy forks keep working unchanged; thin overlays whose referenced-scaffold path points at a retired `ft-audit-<x>/` submodule path **break on bump** and must be repointed
- [x] `templates/audit-overlay-template.md` updated: `flowtron-tracks: ft-audit`, referenced scaffold `ft-audit/SKILL.md`, explicit pass-resolution note, deltas mapped to `passes/<domain>.md` slots
- [x] `docs/PLATFORMS.md` count mirrors corrected 26→21 (×3) and the "six focused / seven `ft-audit`-family skills" enumerations rewritten
- [x] `docs/GLOSSARY.md` **audit-family** entry rewritten for the two-member family + six domains
- [x] Remaining enumerating surfaces swept: `docs/CONVENTIONS.md`, `docs/VISION.md`, `SECURITY.md`, `claude/skills/ft-update/SKILL.md` (`flowtron-tracks:` example), `claude/skills/ft-audit-repo/SKILL.md` (delegation prose), `claude/skills/ft-release/SKILL.md` (forbidden-slug enumerations)
- [x] Repo-wide grep confirms zero live references to the five retired slugs outside `.flowtron/tasknote/archive/` and `.flowtron/PLAN.md`
- [x] Glob forms (`/ft-audit*`) left intact where still correct (`SPEC/gates.md`, `SPEC/tasknote-selection.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-NEUTRALITY.md`) — they still match `ft-audit`, `ft-audit-repo`, `ft-audit-context`

## 🧩 Subtasks

- [x] Rewrite `docs/MIGRATION.md` §1.2.1 (scaffold framing, domain table, install block, fork-style section, provenance markers, uncovered-surfaces para)
- [x] Add the adopter migration note (both fork styles) to §1.2.1
- [x] Fix `docs/MIGRATION.md` §1.2.2's `claude/skills/ft-audit*` scaffold paragraph
- [x] Rewrite `templates/audit-overlay-template.md` for the parameterized scaffold
- [x] Sweep `docs/PLATFORMS.md` (3 count mirrors + 2 enumerations)
- [x] Sweep `docs/GLOSSARY.md`, `docs/CONVENTIONS.md`, `docs/VISION.md`, `SECURITY.md`
- [x] Sweep skill wiring: `ft-update` (`flowtron-tracks:` example), `ft-audit-repo` (delegation prose ×4), `ft-release` (forbidden-slug lists ×3)
- [x] Verify: repo-wide grep for the 5 retired slugs; `git status` diff matches the intended path set
- [x] Phase 4: doc-drift sweep, PLAN flip (nested stub beneath active parent), archive move, closure commit

## 🔗 Related

- [[CORE-EPIC-389]] — parent epic (audit-family-consolidation)
- [[CORE-389.2]] — built the parameterized dispatcher + `passes/` library whose file layout this task documents
- [[CORE-389.3]] — retired the five siblings; explicitly deferred this task's doc set (PLATFORMS, MIGRATION, VISION, SECURITY, overlay template, `ft-update`/`ft-release` enumerations)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-389.2]] landed the dispatcher and [[CORE-389.3]] deleted the five siblings; the doc surface now actively misdescribes what ships (MIGRATION §1.2.1 still instructs adopters to `cp` files that no longer exist). This is the epic's last implementation child and the only one that closes the adopter-facing gap.

- [x] Read relevant source files — `docs/MIGRATION.md` §§1.2–1.2.2, `templates/audit-overlay-template.md`, `claude/skills/ft-audit/SKILL.md` (post-`.2` dispatcher, for the layout the docs must describe), plus the enumerating spots surfaced by grep in `docs/{PLATFORMS,GLOSSARY,CONVENTIONS,VISION,AGENT-NEUTRALITY}.md`, `SECURITY.md`, `SPEC/{gates,tasknote-selection,procedures/ft-task}.md`, `claude/skills/{ft-update,ft-audit-repo,ft-release,ft-new-project}/SKILL.md`, `codex/AGENTS-snippet.md`

- [x] **Best Practices Review** — documentation-only task; no module boundaries move. The responsibility split to preserve is the one `docs/PLATFORMS.md` §"Installed-surface policy" already owns: MIGRATION §1.2.1 is the **procedural** source (how to fork), PLATFORMS is the **inventory/policy** source (what ships, install tier), GLOSSARY is the **definitional** source. Each surface gets the correction that belongs to its own role rather than restating the others — the existing cross-reference direction (MIGRATION → PLATFORMS for the category table; GLOSSARY → MIGRATION §1.2.1 for forking rules) is preserved, not inverted. No new doc section or abstraction introduced. Duplication being reduced is incidental: six near-identical table rows collapse to one domain list.

- [x] **Archive skim** — `grep -l` over `archive/core/` for the doc paths in scope returned ~25 hits; load-bearing set: [[CORE-389.1]] (epic Discovery — inventoried this exact doc list and flagged the overlay-breaks-on-bump case as "the migration note's core case"), [[CORE-389.2]] (fixed the file layout the docs must now describe: `ft-audit/SKILL.md` + sibling `passes/<domain>.md`; explicitly noted the overlay template is `.4`'s to rewrite against that layout), [[CORE-389.3]] (deferred exactly this doc set to `.4` by name, including `ft-release`'s forbidden-slug enumeration), CORE-374 (count-mirror drift class precedent — a summary count in one file silently diverging from the canonical list in another; same failure mode as PLATFORMS' three literal "26"s). CORE-287 is the overlay's design origin (read via `.1`'s synthesis).

- [x] **Drift check** — every cited surface re-verified on disk this session. Confirmed: `docs/MIGRATION.md:73` still names the six-scaffold brace expansion and `:95–102` still instructs `cp` of paths deleted by `.3` (adopter-breaking as filed); `templates/audit-overlay-template.md` still tracks `ft-audit-<x>`; `docs/PLATFORMS.md` carries **three** literal `26` count mirrors (`:208`, `:213`, `:238`) plus two prose enumerations (`:31` "six focused", `:210` "the seven `ft-audit`-family skills"). Actual on-disk inventory verified as **21** across all three surfaces (`claude/commands/*.md` = 21, `claude/skills/*/` = 21, `codex/skills/*/` = 21) — so 26→21 is correct, not estimated. One addition the PLAN line didn't name: `docs/GLOSSARY.md:17`'s **audit-family** definition enumerates all seven slugs and is the definitional source GLOSSARY→MIGRATION cross-references depend on; folded in. No contradicting drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  1. **The thin overlay survives.** The PLAN line says *update* `templates/audit-overlay-template.md`, not retire it — so the two-fork-styles structure (full copy vs. thin overlay) stays, adapted to the new layout. The overlay gains value under parameterization: one overlay now covers all six domains instead of needing one per domain.
  2. **Pass-file resolution is the overlay's own responsibility to state.** The dispatcher reads `passes/<domain>.md` as a *sibling* of its own `SKILL.md`; an overlay living in `.claude/skills/audit/` has no such sibling. The overlay template carries the explicit "resolve `passes/` relative to the referenced scaffold's directory" instruction rather than editing `.2`'s dispatcher — keeps the pointer semantics where the pointer lives and keeps this task out of `.2`'s file.
  3. **`claude/skills/ft-release/SKILL.md`'s forbidden-slug enumerations are in scope.** `.3` explicitly deferred them here as "remaining enumerating docs" territory. Harmless-but-stale (retired names can never match a real symlink); corrected for accuracy.
  4. **`/ft-audit*` glob forms are left intact.** They still correctly match the surviving `ft-audit`, `ft-audit-repo`, `ft-audit-context` — no edit needed in `SPEC/gates.md`, `SPEC/tasknote-selection.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-NEUTRALITY.md`.
  5. **No CHANGELOG entry.** `/ft-release` owns changelog/version surfaces per `docs/CONVENTIONS.md`; per-task closures don't touch them.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Surface inventory (what changes, by role)

| File | Role | Change |
|---|---|---|
| `docs/MIGRATION.md` §1.2.1 | procedural (how to fork) | primary rewrite + new adopter migration note |
| `docs/MIGRATION.md` §1.2.2 | maintainer guidance | `claude/skills/ft-audit*` glob → singular scaffold |
| `templates/audit-overlay-template.md` | fork artifact | repoint to `ft-audit/` + pass-resolution note + domain delta slot |
| `docs/PLATFORMS.md` | inventory / policy | 3× `26`→`21`, 2× prose enumeration |
| `docs/GLOSSARY.md` | definitional | **audit-family** entry: seven slugs → two members + six domains |
| `docs/CONVENTIONS.md` | rationale (single customization seam) | `ft-audit-*` → `ft-audit` |
| `docs/VISION.md` | rejection rationale | `ft-audit-security` skill → `/ft-audit security` domain |
| `SECURITY.md` | threat model example list | `/ft-audit-docs` → `/ft-audit docs` |
| `claude/skills/ft-update/SKILL.md` | provenance-marker scan | `flowtron-tracks:` example → `ft-audit` |
| `claude/skills/ft-audit-repo/SKILL.md` | delegation prose | "six focused `ft-audit-*`" → the parameterized skill's domains |
| `claude/skills/ft-release/SKILL.md` | install-gate slug lists | 3 enumerations drop the 5 retired slugs |

### The migration note's two cases (the epic's core adopter-facing risk)

- **Full-copy forks** — an adopter who ran the old `cp .../ft-audit-backend/SKILL.md` owns a complete self-contained file. It references nothing upstream, so a version bump past this release **does not break it**. It simply stops receiving scaffold improvements (as it always did) and now diverges structurally from the bundled shape. No action required; re-fork when they want the parameterized form.
- **Thin overlays** — the overlay's whole contract is *read the referenced scaffold at runtime*. Overlays generated from the pre-consolidation template point at `.flowtron/core/claude/skills/ft-audit-<x>/SKILL.md`, a path this epic **deleted**. On bump, the overlay's first action fails: the skill silently has no procedure to run. These **must** be repointed to `ft-audit/SKILL.md` + the domain token. This is the migration note's load-bearing case.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the surface-role split the doc set already uses (MIGRATION = procedural, PLATFORMS = inventory/policy, GLOSSARY = definitional): each file received only the correction belonging to its own role, existing cross-reference direction preserved. The new §1.2.1 subsection "Migrating a pre-consolidation audit fork" adopts MIGRATION's established `####` sub-subsection shape rather than inventing a new callout form.

- [x] **Minimal refactor gate** — one edit beyond the literal Acceptance list, made because the rewrite would otherwise ship an internal contradiction: `claude/skills/ft-update/SKILL.md` Step 4.5's drift-scan `git log`/`git diff` paths were scoped to `claude/skills/<tracked>/SKILL.md`, which cannot detect changes to the new sibling `passes/` library. Widened both to the scaffold **directory** and documented the reason inline, matching the `-- claude/skills/<tracked>/` form the rewritten MIGRATION §1.2.1 now documents. Unrelated cleanup deferred: none surfaced.

- [x] Implemented the minimal solution — 11 files: 1 major rewrite (`docs/MIGRATION.md` §1.2.1 + §1.2.2), 1 template rewrite, 9 targeted sweeps

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown docs/skills only, no test-bearing code touched

**Implementation Notes:**

- **`docs/MIGRATION.md`** — §1.2.1 rewritten end to end: heading (`family` → `scaffold`), six-scaffold intro → one dispatcher + `passes/` library, six-skill table → six-domain table with an invocation-form paragraph, `/ft-audit-repo` reframed "seventh family member" → "the family's other member", install block `cp` → `cp -R <dir>/.` (fork the whole directory), §0-checklist prose repointed at `passes/<domain>.md`, both fork-style paragraphs rewritten (overlay now covers all six domains and carries the pass-resolution rule), provenance-marker example → `flowtron-tracks: ft-audit` with the `git log` path widened to the directory, uncovered-surfaces paragraph → domain framing. New `#### Migrating a pre-consolidation audit fork` subsection carries the two-case adopter note. §1.2.2's maintainer paragraph desglobbed (`claude/skills/ft-audit*` → `claude/skills/ft-audit/`). Skill-table row (`:34`) delegation hint updated.
- **`templates/audit-overlay-template.md`** — rewritten: `flowtron-tracks: ft-audit` (fixed, no longer a placeholder), referenced scaffold → `ft-audit/SKILL.md`, new **Pass files** paragraph making the resolve-relative-to-scaffold rule explicit, new `## Domains` section, `## Deltas` slots repointed at the pass files' section names with a per-domain keying convention, forker footer updated.
- **Sweeps** — `docs/PLATFORMS.md` (3× literal `26`→`21`; `:31` "six focused `/ft-audit`-family skills" → parameterized form; `:210` "seven `ft-audit`-family skills" → the two named stubs; skills bullet notes the `ft-audit/passes/*.md` sibling library) · `docs/GLOSSARY.md` **audit-family** entry (seven slugs → two members + six domain tokens) · `docs/CONVENTIONS.md` (`ft-audit-*` → `ft-audit`, `.claude/skills/audit-*/` → `.claude/skills/audit/`) · `docs/VISION.md` (`ft-audit-security` skill → `ft-audit`'s `security` domain) · `SECURITY.md` (`/ft-audit-docs` → `/ft-audit-repo` in the example skill list) · `claude/skills/ft-audit-repo/SKILL.md` (4 spots: frontmatter description, intro, no-fork note, §5 delegation → domain recommendations) · `claude/commands/ft-audit-repo.md` (delegation blurb) · `claude/skills/ft-release/SKILL.md` (forbidden-slug list 13→9 entries + 3 grep alternations) · `claude/skills/ft-update/SKILL.md` (see refactor gate).
- **Deliberately not touched:** `/ft-audit*` glob forms in `SPEC/gates.md`, `SPEC/tasknote-selection.md`, `SPEC/procedures/ft-task.md`, `docs/AGENT-NEUTRALITY.md` — still correctly match the surviving `ft-audit`, `ft-audit-repo`, `ft-audit-context`. `SPEC.md` — already corrected by [[CORE-389.3]]. `claude/skills/ft-flowtron/SKILL.md` roster — already corrected by [[CORE-389.3]]. `codex/skills/ft-audit-repo/SKILL.md` — thin pointer wrapper, carries no family enumeration (grep-verified).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; markdown-only across `docs/`, `templates/`, `claude/{skills,commands}/`. No `viz/` or `tools/` source touched, so neither `npm --prefix viz test` nor `node --test tools/update-adopters.test.mjs` has changed input.

- [x] Ran lint/type-check on changed code — `N/A`; same reason (repo carries no markdown linter — quick commands are `viz` npm scripts + the updater suite).

- [x] **Quality assertions** — verified against the actual diff: (a) repo-wide grep over tracked `*.md` (excluding `archive/` + `PLAN.md`) for the five retired slugs returns **only** the two intentional hits inside the new migration note, where naming the retired path is the point; (b) every path the rewritten docs instruct an adopter to copy or reference exists on disk — `ft-audit/SKILL.md`, all six `ft-audit/passes/*.md`, `ft-audit-repo/SKILL.md`, `commands/ft-audit.md`, `templates/audit-overlay-template.md` (10/10 OK); (c) the `21` count mirrors match measured on-disk inventory (`claude/commands/*.md`=21, `claude/skills/*/`=21, `codex/skills/*/`=21), not an estimate; (d) overlay template frontmatter is well-formed `key: value` YAML with the same unquoted-placeholder shape it already shipped (no regression); (e) `git status --porcelain` matches exactly the 11 intended files + the tasknote — no collateral edits; (f) no duplication introduced — each surface states its own role's correction and cross-references rather than restating.

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

- [x] **Doc-drift sweep** — per `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (its `templates/` bullet names the audit-overlay template generically; still accurate)
  - `SPEC.md` — no change (§"Skill namespace" brace expansion + fork-naming example already corrected by [[CORE-389.3]]; grep-verified no remaining retired-slug references)
  - `docs/MIGRATION.md` — **updated** (this task's primary deliverable: §1.2.1 rewritten + new "Migrating a pre-consolidation audit fork" subsection; §1.2.2 maintainer paragraph and the `/ft-audit-repo` skill-table row corrected)
  - `claude/AGENTS-snippet.md` — no change (never listed audit slugs as symlink targets — forked-not-symlinked by policy; grep-verified)
  - `codex/AGENTS-snippet.md` — no change (its global-utilities line names only `ft-audit-context` + `ft-audit-repo`, both surviving)
  - `docs/CONVENTIONS.md` — **updated** (single-customization-seam rationale: `ft-audit-*` → `ft-audit`, `.claude/skills/audit-*/` → `.claude/skills/audit/`)
  - `CONTRIBUTING.md` — no change (carries no audit-family claims; grep-verified)
  - `SECURITY.md` — **updated** (skill example list: `/ft-audit-docs` → `/ft-audit-repo`)
  - `docs/AGENT-NEUTRALITY.md` — no change (uses the `/ft-audit*` glob, which still correctly matches the two surviving family members)
  - `docs/PLATFORMS.md` — **updated** (3 literal count mirrors 26→21; two prose enumerations rewritten for the parameterized form; skills bullet notes the `passes/` sibling library)
  - `claude/CAPABILITIES.md` — no change (carries no audit-family claims; grep-verified)
  - `docs/AGENT-COMPAT.md` — no change (per-agent compatibility matrix; carries no audit-family enumeration)

  Non-sweep surfaces also corrected this task (outside the AI-referenced set): `docs/GLOSSARY.md`, `docs/VISION.md`, `templates/audit-overlay-template.md`, `claude/skills/{ft-audit-repo,ft-release,ft-update}/SKILL.md`, `claude/commands/ft-audit-repo.md`.

- [x] Closed — YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and kept nested beneath the active parent `CORE-EPIC-389` (epic still open — `.N` audit remains), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted below

**Final Summary:**

Closed the adopter-facing gap left by the epic's first three children: `docs/MIGRATION.md` §1.2.1 still told adopters to `cp` five scaffold paths that [[CORE-389.3]] had deleted. Rewrote it for the parameterized `/ft-audit <domain>` shape and added a migration note that tells existing forkers exactly what breaks and what doesn't.

**Changed (11 files, +155/−102):**
- `docs/MIGRATION.md` — §1.2.1 rewritten end to end (one scaffold + six-domain table, `cp -R` whole-directory install, both fork styles adapted, provenance markers → `flowtron-tracks: ft-audit`) plus a new `#### Migrating a pre-consolidation audit fork` subsection; §1.2.2 maintainer paragraph and the `/ft-audit-repo` skill-table row corrected
- `templates/audit-overlay-template.md` — repointed at `ft-audit/SKILL.md`, fixed `flowtron-tracks: ft-audit`, new **Pass files** resolution rule + `## Domains` section, deltas re-keyed per domain
- `docs/PLATFORMS.md` — 3× literal `26`→`21`, 2 prose enumerations rewritten
- `docs/GLOSSARY.md` · `docs/CONVENTIONS.md` · `docs/VISION.md` · `SECURITY.md` — one-line definitional/rationale corrections each
- `claude/skills/ft-audit-repo/SKILL.md` (×4 spots) + `claude/commands/ft-audit-repo.md` — delegation prose now recommends domains, not sibling skills
- `claude/skills/ft-release/SKILL.md` — forbidden-slug list 13→9 entries + 3 grep alternations
- `claude/skills/ft-update/SKILL.md` — `flowtron-tracks:` example + drift-scan path widened to the scaffold directory

**Verification:** repo-wide grep over tracked `*.md` for the five retired slugs returns only the two intentional hits inside the new migration note; all 10 paths the rewritten docs reference confirmed present on disk; the `21` count mirrors measured against actual inventory (`claude/commands`=21, `claude/skills`=21, `codex/skills`=21) rather than estimated; `git status --porcelain` matched exactly the 11 intended files. No test/lint gate applies — markdown-only, no `viz/` or `tools/` source touched.

**Refactors:** one beyond Acceptance — `ft-update` Step 4.5's drift-scan `git log`/`git diff` paths were scoped to `<tracked>/SKILL.md` and structurally could not detect `passes/` changes; widened to the scaffold directory so the skill matches the contract MIGRATION now documents. Recorded in Implementation Notes. Nothing else deferred.

**Documentation verdict:** 5 of 12 AI-referenced docs updated (`MIGRATION`, `CONVENTIONS`, `SECURITY`, `PLATFORMS`, plus this task's own deliverable); 7 verified unchanged with reasons. `SPEC.md` needed nothing — [[CORE-389.3]] already corrected it.

**Maintainability effect:** the adopter path is now executable again — every `cp` in §1.2.1 names a path that exists, and pre-consolidation forkers get a two-case decision tree instead of discovering a silently broken overlay on their next bump. Count mirrors and family definitions across 11 surfaces now agree with the 21-skill on-disk reality, removing the drift class CORE-374 caught the last time a summary count diverged from its canonical list.

**Archived:** 2026-08-01
