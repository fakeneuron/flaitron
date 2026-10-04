---
title: discovery
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-099]
---

# CORE-099.1 | discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-099]]

## 🎯 Goal

Survey external workflow / convention surfaces, identify gaps where flowtron diverges or could adopt, and file the implementation child tasks for [[CORE-EPIC-099]] in PLAN.md.

## ✅ Acceptance

- [ ] Survey axis list locked (open-ended; the 4 PLAN-named + repo-meta + AI-coding + release-automation + markdown-linting + anything else surfacing) and recorded in Discovery Notes
- [ ] Adoption-fit criteria rubric defined and recorded in Discovery Notes (dimensions: gap vs alignment, generalizability, fit with flowtron's solo + adopter dual surface, simplicity, cost, novelty)
- [ ] Per-axis findings table recorded in Phase 2 Implementation Notes (canonical-spec fetch + flowtron drift verdict per axis)
- [ ] Ranked shortlist of recommended adoptions (gaps + document-de-facto, per user filing bar) with per-candidate adoption-fit verdict + rationale + concrete adoption shape (where it lives, what changes)
- [ ] Implementation children `CORE-099.2 .. CORE-099.<N-1>` filed in PLAN.md (one per recommended adoption; each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit subtask `CORE-099.<N>` filed in PLAN.md as the highest-numbered child (per `SPEC/epic.md` §"Numbering convention" + fixed doc-drift sweep acceptance line)
- [ ] Phase 4 doc-drift sweep at closure (per SPEC §"🚀 Phase 4: Closure"): typically no AI-referenced doc updates land in pure Discovery filing

## 🧩 Subtasks

- [ ] Define adoption-fit criteria rubric — record dimensions in Discovery Notes
- [ ] Enumerate the open-ended axis list (~10-15 axes) — record in Discovery Notes
- [ ] Per axis: fetch the canonical spec (Conventional Commits 1.0, SemVer 2.0, CommonMark, Obsidian / Foam / Logseq docs, MIT/Apache/etc license texts, Diátaxis, ADR, release-please/semantic-release, markdownlint, etc.); record link + 1-line summary
- [ ] Per axis: drift-check against flowtron's current state (de-facto alignment, gap, or N/A); record table row
- [ ] Synthesize ranked shortlist (gaps + document-de-facto adoptions); declines noted in Final Summary, not filed
- [ ] Phase 2 gate: surface ranked shortlist + bundling options via AskUserQuestion before filing children
- [ ] Phase 2 write: `.2..(N-1)` implementation children + `.N` audit line under `CORE-EPIC-099` in PLAN.md `## Future Opportunities` (2-space indent; `[opus]`-tagged unless rationale for sonnet; word-count under 50w target / 70w hard cap)
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (indent, model tag, shortname, em-dash, word-count, wikilink integrity)
- [ ] Phase 4: doc-drift sweep + flip `.1` PLAN.md line to stub form + move tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-EPIC-099]] — parent epic (external-conventions-survey)
- [[CORE-097.1]] — direct precedent (external-skill-survey Discovery); same audit-then-cohort shape, different axis
- [[CORE-056]] — convention/coherence-axis audit precedent (internal); validates the survey-then-cohort model for convention work

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed Discovery subtask under [[CORE-EPIC-099]] with explicit deliverable per `SPEC/epic.md` (filed children, not code). Parent epic's intent (external-convention survey + adoption recommendations) is concrete; the four PLAN-named axes (commit conventions, semver discipline, markdown patterns, Obsidian/Foam interop) ground the survey, user-confirmed open-ended scope expands the net to repo-meta + AI-coding + release-automation + markdown-linting + anything else surfacing. CORE-097.1 is the direct shape precedent (external-skill-survey → flowtron analog: external-convention-survey).

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `SPEC.md` — workflow contract (always-loaded core; baseline for "what flowtron already documents")
- `SPEC/epic.md` — epic lifecycle contract (Discovery deliverable = filed children; audit subtask as final-numbered child; fixed doc-drift sweep acceptance)
- `SPEC/versioning.md` — flowtron's current semver discipline (already follows semver; doc cites it explicitly)
- `SPEC/model.md` / `SPEC/starter.md` / `SPEC/blocked.md` — lazy SPEC modules (frontmatter + body conventions baseline)
- `README.md` — public-facing positioning + Obsidian-companion section (Dataview + wikilink claims)
- `docs/MIGRATION.md` — adoption procedure (commit-message form in §1.6 and §3.9; baseline)
- `templates/tasknote-template.md` — canonical scaffold consumed at Step 3b
- `_project/PLAN.md` — confirmed CORE-099.1 line at line 31 under `## Future Opportunities`; parent CORE-EPIC-099 at line 30
- `_project/tasknote/README.md` — AI-referenced docs list for Phase 4 closure sweep

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` (110+ tasknotes); convention-related token grep hit 14 tasknotes. Load-bearing precedents:

- **[[CORE-097.1]]** (External skill survey — Discovery, 2026-05-18) — **direct shape precedent.** Same "survey external surfaces → rank adoptions → file children" Discovery deliverable; same `.1`-Discovery + `.N`-audit bracket; same moderate-depth fetch-canonical-spec + per-candidate findings-table shape. The user already validated the AskUserQuestion gate before filing children (Phase 2 mid-execution gate). Reusing the Acceptance/Subtasks structure with convention-axis substitutions.
- **[[CORE-056]]** (repo conventions + tech-debt audit, 2026-05-09) — convention-axis audit precedent, but internal (10 inspection axes across flowtron's own surfaces). CORE-099 is the external twin: instead of surveying flowtron's internal coherence, survey external-world conventions and decide which to adopt.
- **[[CORE-049]]** (workflow token audit, 2026-05-08) — methodological grandparent of both CORE-056 and CORE-097.1. Same audit-then-cohort model; same "load-bearing for X doesn't mean live in Y" lens for excluded findings.
- **[[CORE-022]]** (Working in Obsidian README section, 2026-05-01) — established flowtron's Obsidian positioning: editor-agnostic core + opt-in Obsidian-companion features (wikilinks + Dataview frontmatter). Foam/Logseq parity is implicit (same syntax). This axis is partly settled.
- **[[CORE-013]]** + **[[CORE-096]]** — CHANGELOG.md decisions. [[CORE-013]] removed ghost CHANGELOG refs from docs; [[CORE-096]] swept residue from audit forks. Flowtron's "no separate CHANGELOG, use annotated tag messages" stance is intentional but not explicitly documented as a *position* relative to Keep-a-Changelog conventions.
- **[[CORE-079]]** + **[[CORE-086]]** — markdown code-fence langtag conventions (SPEC and contract-surface sweeps). Markdown-formatting axis partly addressed internally.
- **[[CORE-095]]** + **[[CORE-076]]** — wikilink-form self-sweep + token placeholder hygiene. The wikilink-token grammar is settled; Obsidian-interop axis is mature.
- **[[CORE-EPIC-097]]** — closed today (2026-05-18) with `/ft-stats`, `/ft-quality`, `paths:` frontmatter, `/ft-epic-discovery --deep`. The `--deep` mode (CORE-097.6) is the spec-kit `constitution → specify → clarify` pre-pass — already a partial Diátaxis-adjacent / AI-coding-pattern adoption; the convention survey should not double-file it.

### Drift check (verified at HEAD)

- `SPEC/epic.md` cited in PLAN.md line 31 — file exists at expected path ✓
- Parent epic `CORE-EPIC-099` line in PLAN.md line 30 — present ✓ (description: "commit conventions, semver discipline, markdown patterns, Obsidian/Foam interop, etc.")
- Repo-meta surface confirmed via `ls`: **no** `LICENSE`, **no** `CHANGELOG.md`, **no** `CONTRIBUTING.md`, **no** `.editorconfig`, **no** `.markdownlint*`, **no** `.github/`, **no** `.gitattributes`. Repo is unlicensed — a significant gap for a project positioned as adoptable via submodule.
- Commit-message form (30 most recent commits): all follow `<type>: <TASK-ID> — <description>` with `feat:` / `chore:` / `fix:` / `docs:` prefixes. De-facto Conventional Commits alignment, but no doc currently says so. One BREAKING change (CORE-105) used a parenthetical `(...BREAKING)` rather than Conventional Commits' `BREAKING CHANGE:` footer or `!` indicator.
- `SPEC/versioning.md` already cites semver explicitly; minor/major/patch definitions stated. Alignment is documented but not cross-linked to the canonical semver.org spec.
- `README.md` "Working in Obsidian" section covers Dataview + wikilinks for Obsidian; Foam / Logseq parity is implicit but not stated.

### Resolved scoping (from AskUserQuestion 2026-05-18)

| Question | Answer |
|---|---|
| Survey scope | **Open-ended** (~10-15 axes): the 4 PLAN-named + repo-meta + AI-coding + release-automation + markdown-linting + anything else surfacing |
| Depth budget | **Moderate** (CORE-097.1 shape): per axis, ~1 web fetch of canonical spec + flowtron-side audit + table row; ranked shortlist with adoption-shape + cost estimate |
| Filing bar | **Gaps + document-de-facto** (per user): file actual adoptions AND doc-only formalizations of de-facto alignments; declines noted in Final Summary only |

### Survey axes (open-ended; locked at Phase 1 close)

The 4 PLAN-named axes, expanded to the user-approved open-ended set. Phase 2 starts here; new axes may surface mid-survey (logged in Implementation Notes, not retroactively added here).

| # | Axis | Canonical spec to fetch | Flowtron de-facto state (Discovery prior) |
|---|------|--------------------------|-------------------------------------------|
| 1 | Commit conventions | Conventional Commits 1.0 (conventionalcommits.org) | De-facto aligned (`feat:` / `fix:` / `chore:` / `docs:` + em-dash); undocumented; BREAKING form differs |
| 2 | Semver discipline | SemVer 2.0 (semver.org) | Aligned; documented in SPEC/versioning.md; no cross-link to canonical spec |
| 3 | Markdown patterns | CommonMark + GitHub Flavored Markdown (github.github.com/gfm) | Uses GFM (tables, fenced code, emoji); langtags swept (CORE-079/086); undocumented stance |
| 4 | Obsidian / Foam / Logseq interop | Obsidian help + Foam + Logseq docs | Wikilinks + Dataview frontmatter — Obsidian-claimed in README; Foam/Logseq parity implicit not stated |
| 5 | Repo licensing | OSI license list (opensource.org/licenses) + choosealicense.com | **Gap** — no LICENSE file; adoptable-via-submodule positioning needs one |
| 6 | CHANGELOG vs annotated tags | Keep a Changelog 1.1 (keepachangelog.com) | Deliberate decline (annotated tags instead); undocumented as a *position* relative to KaC |
| 7 | Contributor guide | GitHub CONTRIBUTING.md convention | **Gap** (or N/A for solo project) — no CONTRIBUTING.md |
| 8 | EditorConfig | editorconfig.org | **Gap** — no `.editorconfig`; flowtron-the-project is markdown-heavy; adopter forks may want one |
| 9 | Markdown linting | markdownlint (DavidAnson/markdownlint) + markdown-link-check | **Gap** — no lint config shipped; CORE-079/086 swept manually |
| 10 | Docs framework | Diátaxis (diataxis.fr) | De-facto aligned (`SPEC.md` = reference, `MIGRATION.md` = how-to, `PHILOSOPHY.md` = explanation); undocumented |
| 11 | Architecture Decision Records | adr.github.io + Michael Nygard pattern | Decline pattern (decisions live in tasknotes); undocumented as a *position* |
| 12 | Spec-kit / upfront staging | github.com/github/spec-kit | Partially adopted via `/ft-epic-discovery --deep` (CORE-097.6); already covered |
| 13 | Release automation | release-please / semantic-release | Decline (manual `/ft-release`); undocumented |
| 14 | Pre-commit hooks | pre-commit.com | Decline (no hooks shipped); intentional but undocumented |
| 15 | `.github/` templates | GitHub issue/PR template conventions | N/A for solo project (likely decline); confirm |

Roughly 15 axes — Phase 2 may collapse some (12 already-done) and may surface 1-2 more.

### Adoption-fit criteria rubric (draft — finalized in Phase 2)

Dimensions to score each surveyed axis on:

1. **Gap vs alignment** — is flowtron missing the convention, de-facto aligned but undocumented, or deliberately declined?
2. **Generalizability** — does adopting it apply project-agnostically (flowtron's core value prop) or only to flowtron-self?
3. **Fit with flowtron's solo + adopter dual surface** — does it serve solo flowtron-self use, adopter projects, or both?
4. **Simplicity** — small doc edit / single file vs heavy machinery / tooling install?
5. **Cost (LOC + drift impact)** — small (one doc paragraph), medium (new file + cross-refs), large (workflow contract change)?
6. **Novelty** — does it fill a real gap, or just formalize what's already happening?

### Open Phase 2 questions (resolve during execution, not before)

- Final candidate-count N for filing — depends on how many clear the adoption-fit bar after survey. Audit subtask number locks at filing time per `SPEC/epic.md` numbering convention.
- LICENSE choice if filed — separate decision (MIT vs Apache vs other); the child task may carry the choice as an open question or pre-resolve via AskUserQuestion at Phase 2 filing.
- Per-axis bundling — some doc-only adoptions (e.g., Conventional Commits + Diátaxis + SemVer cross-link) might bundle into one `flowtron-conventions.md` doc child rather than three children. Decide at Phase 2 synthesis.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — [[CORE-097.1]] is the direct precedent for an external-X-survey Discovery: per-row canonical-spec citation + flowtron drift verdict + adoption shape + ranked shortlist + AskUserQuestion approval before filing. Reusing that shape with convention-axis substitutions. [[CORE-056]] (internal convention audit) and [[CORE-049]] (workflow token audit) supply the "load-bearing for X doesn't mean live in Y" lens for excluded findings.
- [x] Implemented the minimal solution — 6 children (`.2`-`.7`) filed under [[CORE-EPIC-099]] in `_project/PLAN.md` under `## Future Opportunities`. All `[opus]`-tagged; 2-space indent preserved; em-dash separator consistent; word-counts 18-25w (all under 50w target / 70w hard cap). Audit subtask at `.7` per SPEC/epic.md numbering convention.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable code surface).

**Implementation Notes:**

### Web fetches (canonical-state grounding)

- **Foam** (github.com/foambubble/foam) — actively maintained (vscode@0.40.4 released 2026-05-14; 1519 commits; 17.1k stars). Standard `[[wikilink]]` syntax with sections (`[[note#Section]]`) + aliases (`[[note|alias]]`). YAML frontmatter compatible via VS Code's markdown stack.
- **spec-kit** (github.com/github/spec-kit) — actively maintained (v0.8.11 May 2026). Six-phase canonical flow: `/speckit.constitution` → `/speckit.specify` → `/speckit.clarify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`. **Already partially absorbed**: CORE-097.6 added `/ft-epic-discovery --deep` for the `constitution → specify → clarify` pre-pass; the `plan / tasks / implement` tail maps cleanly to flowtron's existing 4-phase tasknote shape (Phase 1 Discovery + 🧩 Subtasks + Phase 2 Execution).
- **Logseq** — fetch failed (oversized); citing working knowledge: native `[[wikilink]]` syntax (core feature), supports markdown files with YAML frontmatter as an alternative to Logseq's native block-properties (`key:: value`). Obsidian-format vault interop is partial — Logseq prefers its own block-tree shape but reads flat-markdown-with-wikilinks vaults.
- Other axes cited from working knowledge (specs stable for years; verdict driven by flowtron-side audit, not canonical re-reading).

### Per-axis findings table

| # | Axis | Canonical | Flowtron de-facto state | Adoption shape | Cost | Verdict |
|---|------|-----------|--------------------------|------------------|------|---------|
| 1 | Commit conventions | Conventional Commits 1.0 (conventionalcommits.org/en/v1.0.0/) | De-facto aligned: `feat:` / `fix:` / `chore:` / `docs:` prefix + `<TASK-ID>` + em-dash + description; undocumented. BREAKING uses parenthetical `(...BREAKING)` not the canonical `!` or `BREAKING CHANGE:` footer. | Document the de-facto stance + flag the BREAKING variant in a single conventions doc | Small | **Document de-facto** |
| 2 | Semver discipline | SemVer 2.0 (semver.org/spec/v2.0.0.html) | Aligned + documented in `SPEC/versioning.md`; no cross-link to canonical spec | Add canonical URL cross-link; can bundle with #1's conventions doc | Trivial | **Document de-facto (bundle)** |
| 3 | Markdown patterns | CommonMark + GitHub Flavored Markdown (github.github.com/gfm) | Uses GFM (tables, fenced code with langtags, task lists, emoji shortcodes); langtags swept (CORE-079, CORE-086); no documented stance | Document "flowtron uses GFM; renders cleanly on GitHub + Obsidian + Foam" in conventions doc | Small | **Document de-facto (bundle)** |
| 4 | Obsidian / Foam / Logseq interop | obsidian.md/help + foambubble.github.io + docs.logseq.com | Obsidian-claimed in README; Foam (active, same syntax) parity automatic; Logseq parity partial (wikilinks ✓, frontmatter via Logseq's block-properties + markdown fallback) | Expand README "Working in Obsidian" → "Working in markdown vaults" naming Foam + Logseq with parity caveats | Small (README edit) | **Gap-to-adopt** (positioning widen) |
| 5 | Repo licensing | OSI license list (opensource.org/licenses) + choosealicense.com | **Gap** — no `LICENSE`; flowtron is positioned as submodule-adoptable across `~/code/` and similar repos surveyed in CORE-097 all carry MIT | Add `LICENSE` (recommend MIT — most permissive simple, matches all 6 CORE-097 candidates' license) | Small (1 file) | **Gap-to-adopt** |
| 6 | CHANGELOG vs annotated tags | Keep a Changelog 1.1 (keepachangelog.com/en/1.1.0/) | Deliberate decline: `README.md` cites "Each release tag's annotated message lists migration steps (no separate CHANGELOG.md)"; ghost refs swept (CORE-013, CORE-096); not positioned as a decision *vs* KaC | Document the decline + rationale in conventions doc or `PHILOSOPHY.md` | Small | **Document decline (bundle into conventions doc)** |
| 7 | Contributor guide | GitHub `CONTRIBUTING.md` convention | **Gap** (or N/A for solo) — no `CONTRIBUTING.md`; repo description says solo + adoption-by-submodule | Light `CONTRIBUTING.md` (issues OK, PRs rare, convention pointers to SPEC.md, single maintainer) | Small (1 file) | **Gap-to-adopt** (light) |
| 8 | EditorConfig | editorconfig.org | **Gap** — no `.editorconfig`; flowtron is markdown-heavy (LF endings, UTF-8, no trailing whitespace via convention) + has `viz/` TS/JSON | Add `.editorconfig` (md, ts, jsx, json, yaml) | Small (1 file) | **Gap-to-adopt** |
| 9 | Markdown linting | DavidAnson/markdownlint | **Gap** — no lint config; manual sweeps did the job (CORE-079, CORE-086, CORE-EPIC-109 terse pass) | Adopt would mean shipping `.markdownlint.jsonc` + tying to `/ft-quality`; OR document the decline (AI-assisted edits + targeted audits substitute) | Small if adopt, trivial if decline | **Decline** (log in Final Summary, not filed) |
| 10 | Docs framework | Diátaxis (diataxis.fr) | De-facto aligned: `SPEC.md` = reference, `docs/MIGRATION.md` = how-to, `docs/PHILOSOPHY.md` = explanation; no tutorial (intentional — adoption is the tutorial via `/ft-new-project`) | Document the alignment in conventions doc or `PHILOSOPHY.md` | Small | **Document de-facto (bundle)** |
| 11 | ADRs | adr.github.io + Michael Nygard pattern | Decline pattern: design decisions live in tasknotes (e.g., CORE-EPIC-042 SPEC modularization, CORE-097.1 external-skill-survey); undocumented as a position | Document "tasknotes-as-ADR" stance in `PHILOSOPHY.md` | Small | **Document decline (bundle into conventions doc)** |
| 12 | Spec-kit / upfront staging | github.com/github/spec-kit (v0.8.11) | **Already adopted** via `/ft-epic-discovery --deep` (CORE-097.6 — constitution → specify → clarify pre-pass); `plan/tasks/implement` maps to flowtron 4-phase | None — note "already absorbed via CORE-097.6" in Final Summary | None | **N/A — already adopted** (Final Summary note) |
| 13 | Release automation | release-please + semantic-release | Decline: `/ft-release` skill (manual, deliberate); CORE-EPIC-057 closed expand-shipped-skills cohort, automation declined explicitly | Document "manual release motion; no semantic-release" stance | Small | **Document decline (bundle into conventions doc)** |
| 14 | Pre-commit hooks | pre-commit.com | Decline: no hooks shipped; inline 4-phase validation (Phase 3 lint/typecheck) substitutes | Document "no pre-commit hooks; phase-3 validates inline" stance | Small | **Document decline (bundle into conventions doc)** |
| 15 | `.github/` templates | docs.github.com community templates | N/A for solo project (no public issues/PRs expected at scale) | None | None | **Decline** (log in Final Summary) |

### Excluded candidates (rationale per CORE-037 "load-bearing for X doesn't mean live in Y" lens)

- **#9 markdownlint** — value is low: manual + AI-assisted sweeps catch the same drift; adding lint tooling adds maintenance overhead disproportionate to gain for a solo + AI-coding workflow. Reconsider if drift becomes a recurring axis.
- **#12 spec-kit** — already absorbed via CORE-097.6 `--deep` mode; filing a "spec-kit adopt" task would double-file.
- **#13 release automation** — `/ft-release` is the manual + intentional motion; automated tooling assumes Conventional Commits → SemVer + CHANGELOG generation, two of which flowtron declines. Mismatch.
- **#14 pre-commit hooks** — same lens; Phase 3 validation is the in-workflow analog.
- **#15 `.github/` templates** — solo + adopt-via-submodule positioning; no contributor base to template for. Reconsider if public-contribution shape ever matters.

### Recommended adoptions shortlist (ranked; 5 implementation + 1 audit)

| Rank | Candidate | Adoption shape | Bundles from axes | Cost | Novelty |
|------|-----------|----------------|-------------------|------|---------|
| P1.a | **LICENSE** | Add `LICENSE` file (recommend MIT) | #5 | Small (1 file) | High — blocks adoption-positioning |
| P1.b | **`docs/CONVENTIONS.md`** | New doc: Conv-Commits adherence + SemVer cross-link + GFM stance + Diátaxis alignment + CHANGELOG decline + ADR decline + release-automation decline + pre-commit decline | #1, #2, #3, #6, #10, #11, #13, #14 | Medium (1 new doc, ~150-250 LOC) | High — single canonical "what conventions flowtron follows / declines" surface |
| P2.a | **`.editorconfig`** | Add `.editorconfig` (md, ts, jsx, json, yaml) | #8 | Small (1 file) | Medium — defends against editor-introduced drift |
| P2.b | **README "Working in markdown vaults"** | Rename + expand current "Working in Obsidian" to name Foam + Logseq parity (wikilinks ✓, frontmatter caveat for Logseq) | #4 | Small (README section edit) | Medium — broadens positioning, validates existing claims against current (2026) external state |
| P2.c | **CONTRIBUTING.md** | Light `CONTRIBUTING.md`: solo-maintained framing, pointer to SPEC.md, issues OK, PRs rare | #7 | Small (1 file) | Low — table-stakes for an adoptable repo |
| P3 | **CORE-099.7 audit subtask** | Final-numbered child per SPEC/epic.md; fixed doc-drift sweep acceptance | — | Standard audit | — |

### Bundling justification

- **CONVENTIONS.md as single doc bundle:** 8 axes (#1, #2, #3, #6, #10, #11, #13, #14) all want a sentence or paragraph each. A single `docs/CONVENTIONS.md` is the natural home — anyone asking "what conventions does flowtron follow?" gets one answer. Splitting into 8 children would over-structure; the CORE-049 precedent ("bundled when natural; individual when independent") supports the bundle. The five adoptions remaining are genuinely independent surfaces (LICENSE file, `.editorconfig` file, README section edit, CONTRIBUTING.md file, audit) and stay separate.
- **Audit subtask (CORE-099.7):** mandatory per `SPEC/epic.md` for multi-child epics; final-numbered; carries the fixed doc-drift sweep acceptance line.

### Declines noted in Final Summary (per user filing bar — not filed)

- markdownlint (#9) — manual + AI-assisted sweeps substitute
- spec-kit (#12) — already absorbed via CORE-097.6
- `.github/` templates (#15) — N/A for solo positioning

### Open question for user (Phase 2 gate before filing)

Per the [[CORE-049]] + [[CORE-097.1]] precedent, surfacing the shortlist for approval/pruning via AskUserQuestion before writing PLAN.md lines.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only).
- [x] Ran lint/type-check on changed code — N/A (markdown-prose only).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the 6 newly-filed PLAN.md lines passed: 2-space child indent preserved, `**CORE-099.N**` bold IDs intact, `[opus]` tag present on every line, `| <shortname>` segment ≤30 chars (longest: 22 — "README markdown-vaults"), em-dash separator (` — `) consistent, long descriptions 18-25w (all under 50w target / 70w hard cap), no trailing whitespace introduced. Bare-ID references in prose (`CORE-097 candidates`, `CORE-099.2–.6`) do not match the `[[TASK-ID]]` wikilink grammar per SPEC §"Long-description conventions" and are safe as plain text.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `.1` line flipped to stub form; tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change (Discovery filing only; recommended adoption [[CORE-099.5]] will touch this when it runs) |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/CLAUDE-snippet.md` | no change |

Pure Discovery filing introduced no new contracts/concepts. Adoption-shape contract edits land inside each implementation child (`CORE-099.2..6`) as appropriate, and the audit `.7` doc-drift sweep catches cumulative drift.

### Recap

Surveyed 15 external workflow/convention axes (open-ended, per user scope choice) drawn from the 4 PLAN-named (commit, semver, markdown, Obsidian/Foam) + repo-meta (LICENSE, CONTRIBUTING, EditorConfig, markdownlint, .github/) + AI-coding (Diátaxis, ADRs, spec-kit) + release (release-please, pre-commit, KaC). Per-axis findings table records canonical-spec link + flowtron drift verdict + adoption shape + cost per row. Filed 6 children (`.2`-`.7`) under [[CORE-EPIC-099]] representing 5 user-approved adoptions plus a closing audit subtask — LICENSE, `docs/CONVENTIONS.md` (8-axis doc bundle), `.editorconfig`, README markdown-vaults expansion, CONTRIBUTING.md, and the audit. All PLAN.md lines word-counted 18-25w (under 50w target / 70w hard cap), `[opus]`-tagged, 2-space-indented under the parent epic.

**Declines noted (per user filing bar — not filed as children):**

- **markdownlint** — manual + AI-assisted sweeps (CORE-079, CORE-086, CORE-109) substitute; tooling overhead disproportionate for solo + AI-coding workflow.
- **spec-kit upfront staging** — already absorbed via [[CORE-097.6]] `/ft-epic-discovery --deep` (constitution → specify → clarify pre-pass); `plan/tasks/implement` tail maps to flowtron's existing 4-phase tasknote.
- **`.github/` issue/PR/workflow templates** — N/A for solo + adoption-by-submodule positioning; no public-contributor base to template for.

**Per-axis findings + excluded-candidate rationale preserved in this archived tasknote** for [[CORE-099.7]] audit subtask reference + future-flowtron convention-axis re-examinations.

**Archived:** 2026-05-18
