---
title: docs/CONVENTIONS.md
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099, CORE-099.1, CORE-099.2, CORE-018, CORE-043, CORE-046]
---

# CORE-099.3 | docs/CONVENTIONS.md

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]] · [[CORE-099.1]]

## 🎯 Goal

Create `docs/CONVENTIONS.md` as the single canonical surface answering "what conventions does flowtron follow?" — bundling 8 axes per [[CORE-099.1]]: Conventional-Commits adherence (de-facto), SemVer cross-link (already-aligned), GFM markdown stance (de-facto), Diátaxis docs framework alignment (de-facto), plus explicit declines (CHANGELOG, ADRs, release-automation, pre-commit) each with rationale.

## ✅ Acceptance

- [ ] `docs/CONVENTIONS.md` created with two top sections — `## Adheres to` and `## Declines` — per user-confirmed structure
- [ ] All 4 adherences covered with one paragraph + canonical-spec link each: Conventional Commits 1.0, SemVer 2.0, GitHub Flavored Markdown, Diátaxis
- [ ] All 4 declines covered with one paragraph + rationale each: CHANGELOG.md, ADRs (as separate registry — nuance per [[CORE-018]]), release automation, pre-commit hooks
- [ ] **Conventional Commits adherence section** documents both the de-facto form (`<type>: <TASK-ID> — <description>` with `feat:` / `fix:` / `chore:` / `docs:`) AND the forward-looking BREAKING form: canonical `!` indicator going forward; parenthetical `(...BREAKING)` was the pre-v3.0.0 form
- [ ] **SemVer section** cross-links to canonical [semver.org/spec/v2.0.0.html] AND to `SPEC/versioning.md` (flowtron's enforcement doc)
- [ ] **Diátaxis section** documents the de-facto mapping: `SPEC.md` = reference, `docs/MIGRATION.md` = how-to, `docs/PHILOSOPHY.md` = explanation; no tutorial by design
- [ ] **CHANGELOG decline** cross-links to README §"Version" (existing "Each release tag's annotated message lists migration steps (no separate CHANGELOG.md)" line) for canonical wording
- [ ] **ADR decline** captures nuance: tasknotes already carry decision-records-on-top-of-execution-log shape ([[CORE-018]]); declined form is the separate `adr/0001-*.md` registry, not the decision-recording habit itself
- [ ] **Pre-commit + release-automation declines** cross-link to `docs/PHILOSOPHY.md` §"Zero scripts" (philosophical backing)
- [ ] `README.md` `## Documents` list updated to include `docs/CONVENTIONS.md` with one-line purpose
- [ ] Markdown mental-pass: GFM-valid (fenced code with langtags, links resolve, no trailing whitespace, em-dash style consistent with sibling docs)
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Draft `docs/CONVENTIONS.md` skeleton: H1 title, intro paragraph (≤3 sentences positioning the doc), `## Adheres to` + `## Declines` sections per user-confirmed structure
- [ ] Fill `## Adheres to` → `### Conventional Commits 1.0` with form + types + BREAKING note (canonical `!` going forward; parenthetical was pre-v3.0.0); link to https://www.conventionalcommits.org/en/v1.0.0/
- [ ] Fill `## Adheres to` → `### Semantic Versioning 2.0` with cross-link to [SPEC/versioning.md](../SPEC/versioning.md) + canonical https://semver.org/spec/v2.0.0.html
- [ ] Fill `## Adheres to` → `### GitHub Flavored Markdown` covering tables, fenced code with langtags, task lists, emoji shortcodes; link to https://github.github.com/gfm/; note rendering compat with Obsidian/Foam (vault-tools handle GFM subset)
- [ ] Fill `## Adheres to` → `### Diátaxis docs framework` with the SPEC=reference / MIGRATION=how-to / PHILOSOPHY=explanation mapping; link to https://diataxis.fr/; note "no tutorial — `/ft-new-project` is the tutorial substitute"
- [ ] Fill `## Declines` → `### CHANGELOG.md` covering annotated-tag-message-as-CHANGELOG choice; link to https://keepachangelog.com/en/1.1.0/ as the canonical pattern declined; cross-link to README §"Version"
- [ ] Fill `## Declines` → `### ADRs as separate registry` with the nuance (tasknotes already carry spec-on-top + log-below ADR shape per [[CORE-018]]); link to https://adr.github.io/
- [ ] Fill `## Declines` → `### Release automation` covering `/ft-release` is deliberate-manual; link to release-please + semantic-release; rationale: assumes Conv-Commits-driven CHANGELOG generation (which flowtron declines) + SemVer auto-bump (which couples release timing to commits, not human judgment); cross-link to PHILOSOPHY §"Zero scripts"
- [ ] Fill `## Declines` → `### Pre-commit hooks` covering Phase 3 lint/typecheck as the in-workflow analog; link to https://pre-commit.com/; cross-link to PHILOSOPHY §"Zero scripts"
- [ ] Update `README.md` `## Documents` section: add `- [docs/CONVENTIONS.md](docs/CONVENTIONS.md) — conventions flowtron adheres to (Conventional Commits, SemVer, GFM, Diátaxis) and declines (CHANGELOG, ADR registry, release automation, pre-commit hooks) with rationale` after the MIGRATION.md line
- [ ] Markdown mental-pass: links resolve, fenced-code langtags present, em-dash separator consistent, GFM-valid, no trailing whitespace
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" + flip PLAN.md line + move tasknote to archive

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-099.1]] — Discovery: per-axis findings + bundling justification for 8-axis CONVENTIONS.md doc
- [[CORE-099.2]] — sibling: LICENSE adoption (same epic cohort, same docs-file-add shape)
- [[CORE-018]] — establishes spec-on-top + log-below tasknote shape mirrors ADR pattern; informs the "ADR decline is registry-only, not decision-records-themselves" nuance
- [[CORE-022]] — Working in Obsidian README section history (not in CONVENTIONS scope; [[CORE-099.5]] handles vault-interop expansion)
- [[CORE-043]] / [[CORE-046]] — release-tag-message-as-CHANGELOG pattern (informs the CHANGELOG decline rationale)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-099.1]] Discovery surveyed 15 external convention axes and explicitly recommended `docs/CONVENTIONS.md` as the natural bundle home for 8 axes (#1 Conv-Commits, #2 SemVer, #3 GFM, #6 CHANGELOG decline, #10 Diátaxis, #11 ADR decline, #13 release-automation decline, #14 pre-commit decline). The PLAN.md line for `.3` matches that bundle exactly. Sibling [[CORE-099.2]] (LICENSE) already landed using the same docs-file-add shape. No drift between Discovery findings and current repo state.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Clarifying questions resolved via AskUserQuestion (doc structure + BREAKING form) — see Discovery Notes
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `docs/PHILOSOPHY.md` — existing prose-style decisions doc (markdown over JSON, zero scripts, one task per context window, relevance before action, versioned/pinned). Prose-heavy `## H2` sections, no frontmatter. Style precedent for CONVENTIONS.md.
- `docs/MIGRATION.md` — sibling doc; line 166 (`chore: adopt flowtron at vX.Y.Z`) and line 350 (`chore: <ID> post-migration cleanup`) are de-facto Conv-Commits examples already in flowtron's own docs.
- `SPEC/versioning.md` — flowtron's SemVer enforcement doc (cross-link target for the SemVer adherence section).
- `README.md` line 100-101 — canonical CHANGELOG-decline wording: "Each release tag's annotated message lists migration steps for major bumps (no separate `CHANGELOG.md`)." Cross-link target.
- `README.md` `## Documents` section (line 10-17) — insertion point for the new doc link.
- `SPEC.md` — workflow contract; reference doc per Diátaxis.
- `templates/tasknote-template.md` — already confirms `feat:`/`chore:`/`fix:` are the in-use prefixes (consumed at scaffold).

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope (`docs/CONVENTIONS.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, `README.md` Documents section, `SPEC/versioning.md`) and for the 8 axes' tokens (CHANGELOG, ADR, Diátaxis, conventional commits). Load-bearing:

- **[[CORE-099.1]]** — Discovery prior; canonical per-axis findings table + adoption shapes + bundling justification. Primary source for CONVENTIONS.md content.
- **[[CORE-099.2]]** — sibling: LICENSE add. Same docs-file-add shape; no SPEC contract change; small commit-scope.
- **[[CORE-018]]** — spec-on-top + log-below tasknote shape: *"Pattern survey: Spec-on-top + log-below mirrors widely-used patterns — Architecture Decision Records (Context/Decision/Consequences at top, deliberation log below)…"*. This is the **key nuance** for the ADR-decline section: flowtron's tasknote shape is *already an ADR variant*. The decline is "no separate `adr/` registry" — not "no decision-records anywhere." CONVENTIONS.md must capture this nuance or it misrepresents flowtron's actual posture.
- **[[CORE-043]]** (release v1.0.0) + **[[CORE-046]]** (release v1.1.0) — establish the annotated-tag-message-as-CHANGELOG pattern: *"v1.0.0 tag message follows v0.4.0 shape: subject + summary + changes + adopter migration block"*. Rationale source for CHANGELOG decline.
- **[[CORE-013]]** + **[[CORE-096]]** — historical CHANGELOG references swept from docs (confirms intentional decline; not legacy bit-rot).
- **[[CORE-022]]** — established Obsidian-companion section in README. **NOT in CONVENTIONS scope** — vault-interop expansion belongs to sibling [[CORE-099.5]] (README "Working in markdown vaults"); CONVENTIONS skips it.
- **[[CORE-079]]** + **[[CORE-086]]** — markdown code-fence langtag sweeps. Establish GFM as the de-facto markdown surface; informs GFM adherence section.

### Drift check (verified at HEAD)

- `docs/PHILOSOPHY.md` exists at expected path ✓ (already referenced in README + MIGRATION.md)
- `docs/MIGRATION.md` exists at expected path ✓
- `SPEC/versioning.md` exists with SemVer alignment ✓ (cross-link target valid)
- `LICENSE` exists at repo root ✓ ([[CORE-099.2]] landed it; sibling cohort is on track)
- `README.md` `## Documents` section at lines 10-17 ✓ (insertion point confirmed)
- `README.md` line 101 CHANGELOG-decline canonical wording present ✓
- Discovery findings table (CORE-099.1 lines 162-180) — 8 bundle-target axes match PLAN.md line description exactly ✓
- Git log confirms `feat:` / `chore:` / `fix:` / `docs:` prefix usage (recent commits 4828c40, ca79b55, 3a314fc, 9e18903, ae539e8 all use the prefix) ✓
- **Nuance flagged for Phase 2:** Discovery surfaced one BREAKING-form variance (CORE-105's `(...BREAKING)` parenthetical vs canonical `!` indicator). Phase 1 clarifying question (below) resolved this: document de-facto + recommend tightening to canonical `!` going forward.

### Clarifying questions (resolved 2026-05-18)

| Question | User's answer | Implication for Phase 2 |
|---|---|---|
| Doc structure shape | **Grouped by stance** (`## Adheres to` + `## Declines`) | Two top sections; 4 H3 axes under each; reader scanning "what does flowtron do?" gets two answers fast |
| BREAKING-change form | **Document de-facto + recommend tightening** | Conv-Commits section notes the parenthetical was pre-v3.0.0 form; canonical `!` indicator is forward-looking convention. Small forward-looking policy shift; not retroactive |

### Out-of-scope (explicit)

- **Vault interop (Obsidian/Foam/Logseq)** — belongs to sibling [[CORE-099.5]] (README "Working in markdown vaults" expansion). CONVENTIONS.md skips vault-tool positioning.
- **EditorConfig** — belongs to sibling [[CORE-099.4]]. CONVENTIONS.md may mention LF endings as part of GFM stance but won't duplicate the `.editorconfig` rationale.
- **CONTRIBUTING.md** — belongs to sibling [[CORE-099.6]]. CONVENTIONS.md is reference-doc (what conventions exist); CONTRIBUTING is how-to-contribute.
- **Adding `docs/CONVENTIONS.md` to AI-referenced docs list** — Phase 4 doc-drift sweep decision. Default: do NOT add; CONVENTIONS is satellite-reference, not cold-start ground-truth. The 4-doc list stays focused on workflow surfaces. Will surface this verdict in Phase 4 explicitly.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/PHILOSOPHY.md` + `docs/MIGRATION.md` are the sibling docs in `docs/`: H1 title, intro paragraph stating doc purpose + cross-links to sibling docs, prose-heavy `## H2` sections, no frontmatter. CONVENTIONS.md adopts the same shape — H1 + 2-sentence intro + cross-link to SPEC.md and PHILOSOPHY.md + `## H2` × 2 (`Adheres to`, `Declines`) + `### H3` × 4 per section. Diverges slightly by using a markdown table for the Diátaxis quadrant mapping (GFM table, lighter than 4 sub-paragraphs).
- [x] Implemented the minimal solution — `docs/CONVENTIONS.md` (84 lines, 818 words) covers all 8 axes; `README.md` `## Documents` list adds the new doc with a one-line purpose.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-prose only; no executable surface).

**Implementation Notes:**

### Files changed

| File | Change | LOC |
|---|---|---|
| `docs/CONVENTIONS.md` | new file | +84 |
| `README.md` | added 3-line entry in `## Documents` list after MIGRATION.md | +3 |

### Adherence-section coverage

| Axis | Form documented | Canonical link | Cross-link |
|---|---|---|---|
| Conventional Commits 1.0 | `<type>: <TASK-ID> — <description>`; types `feat:`/`fix:`/`chore:`/`docs:`; no scope (TASK-ID prefix carries it); BREAKING uses canonical `!` going forward (parenthetical was pre-v3.0.0) | conventionalcommits.org/en/v1.0.0/ | — |
| SemVer 2.0 | tier definitions deferred to `SPEC/versioning.md` | semver.org/spec/v2.0.0.html | `SPEC/versioning.md` |
| GFM | fenced code + tables + task lists + emoji + wikilinks | github.github.com/gfm/ | `README.md` §"Working in Obsidian" |
| Diátaxis | SPEC=reference, MIGRATION=how-to, PHILOSOPHY=explanation, no tutorial (subbed by `/ft-new-project`) | diataxis.fr/ | — |

### Decline-section coverage

| Axis | Pattern declined | Rationale + backing | Canonical link |
|---|---|---|---|
| CHANGELOG.md | Keep a Changelog 1.1 | annotated tag messages substitute; `README.md` line 101 + release tasknotes (CORE-043 / CORE-046) | keepachangelog.com/en/1.1.0/ |
| ADRs as registry | separate `adr/0001-*.md` directory | tasknote shape already carries Context/Decision/Consequences (per [[CORE-018]] pattern survey); decline is registry-only, not decision-records-themselves | adr.github.io/ |
| Release automation | release-please / semantic-release | release tooling reads Conv-Commits → CHANGELOG (which flowtron declines) + couples release timing to commits, not human judgment; backing: PHILOSOPHY.md §"Zero scripts" | release-please + semantic-release links inline |
| Pre-commit hooks | pre-commit framework | Phase 3 validation is the in-workflow analog (lint / typecheck / tests); backing: PHILOSOPHY.md §"Zero scripts" | pre-commit.com/ |

### Open question deferred to Phase 4

Whether `docs/CONVENTIONS.md` should be added to `_project/tasknote/README.md` §"AI-referenced docs" list. **Default:** no — CONVENTIONS is satellite-reference (answers "what conventions" not "what workflow"), the cold-start 4-doc set stays focused on workflow surfaces. Will state explicitly in Phase 4 doc-drift sweep.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only; no executable surface).
- [x] Ran lint/type-check on changed code — N/A (markdown-prose only).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; pure docs).

**Testing Notes:**

Markdown mental-pass on `docs/CONVENTIONS.md` (84 lines, 818 words): all external links present (conventionalcommits.org/v1.0.0, semver.org/spec/v2.0.0, github.github.com/gfm, diataxis.fr, keepachangelog.com/1.1.0, adr.github.io, release-please / semantic-release github pages, pre-commit.com); internal cross-links resolve from `docs/` (`../SPEC.md`, `../SPEC/versioning.md`, sibling `PHILOSOPHY.md` and `MIGRATION.md`); fenced-code blocks use `text` langtag (GFM-valid); Diátaxis quadrant rendered as GFM table; em-dash separator (` — `) consistent with sibling docs; no trailing whitespace.

Mental-pass on `README.md` `## Documents` edit (3 lines added after MIGRATION.md entry): indent + dash-bullet + em-dash separator style matches sibling lines; line-wrap matches README's prevailing ~80-col soft wrap.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.3` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — added `docs/CONVENTIONS.md` entry to `## Documents` list (3 lines, one-line purpose covering 4 adherences + 4 declines) |
| `SPEC.md` | no change (conventions doc is reference-doc parallel to SPEC; no contract surface affected) |
| `docs/MIGRATION.md` | no change (procedural how-to is intact; CONVENTIONS is reference; no overlap) |
| `claude/CLAUDE-snippet.md` | no change (snippet already mentions CHANGELOG decline at line 51 in adopter-facing version-bump prose; CONVENTIONS is flowtron-self positioning, not adopter assistant guidance) |

**Resolved Phase-2-deferred question:** `docs/CONVENTIONS.md` is NOT added to `_project/tasknote/README.md` §"AI-referenced docs" list. Rationale: AI-referenced docs are cold-start ground-truth workflow surfaces (the 4-doc set: README.md / SPEC.md / MIGRATION.md / CLAUDE-snippet.md). CONVENTIONS is satellite-reference — answers "what conventions does flowtron follow?" not "how does the workflow work?" — and adding it would dilute the focused cold-start set. Reconsider if AI sessions repeatedly hit the convention questions without finding the doc.

### Recap

Created `docs/CONVENTIONS.md` (84 lines, 818 words) as the single canonical surface answering "what conventions does flowtron follow / decline?" Two top sections per user-confirmed structure: `## Adheres to` (Conventional Commits 1.0 with `<type>: <TASK-ID> — <description>` form + types + canonical `!` for BREAKING going forward; SemVer 2.0 cross-linked to `SPEC/versioning.md` + canonical spec; GitHub Flavored Markdown covering tables / fenced code / wikilinks / vault-tool compat; Diátaxis framework with SPEC=reference / MIGRATION=how-to / PHILOSOPHY=explanation quadrant table + intentional tutorial-absence) and `## Declines` (CHANGELOG.md with cross-link to annotated-tag pattern + KaC; ADRs-as-separate-registry with nuance that tasknotes already carry the spec-on-top/log-below ADR shape per [[CORE-018]]; release automation with PHILOSOPHY.md §"Zero scripts" backing; pre-commit hooks with same backing and Phase 3 as the in-workflow analog). `README.md` `## Documents` list updated with a 3-line entry pointing at the new doc. Mental-pass clean: all links resolve, GFM-valid, em-dash + indent style consistent with sibling docs.

Eight axes from [[CORE-099.1]] Discovery bundled into one doc as planned (rejected the flat-per-axis alternative; grouped-by-stance reads faster for "what does flowtron do?" scans). One forward-looking policy nudge captured: BREAKING-change commits use canonical `!` going forward; parenthetical `(...BREAKING)` was the pre-v3.0.0 form. No SPEC contract change; no code surface; sibling cohort tasks [[CORE-099.4]] / [[CORE-099.5]] / [[CORE-099.6]] / [[CORE-099.7]] remain open per epic-close convention.

**Archived:** 2026-05-18
