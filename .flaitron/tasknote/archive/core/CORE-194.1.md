---
title: gsd-pi-learnings discovery
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: [CORE-EPIC-194]
---

# CORE-194.1 | gsd-pi-learnings discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-194]]

## 🎯 Goal

Scope the `CORE-EPIC-194` epic (`gsd-pi-learnings`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-194.2..4` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-194.2 .. CORE-194.4 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-194.5 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface — flowtron's own surface (SPEC, SPEC modules, skills, templates, docs) + GSD-Pi's adoptable surface (markdown files, conventions, hygiene files); log in Discovery Notes
- [ ] Skim `_project/tasknote/archive/core/` for relevant precedents (CORE-EPIC-097 external-skill-survey, CORE-EPIC-099 external-conventions-survey) — log load-bearing findings
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-194.2 .. CORE-194.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into `_project/PLAN.md` under `CORE-EPIC-194` with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-194]] — parent epic (gsd-pi-learnings)

## 🧭 Deep Pre-pass

### Constitution

**Epic goal (one sentence):** Survey GSD-Pi (active successor to the archived GSD-2) for patterns flowtron could adopt — filter them through flowtron's Core Principles — and file PLAN children for the survivors. **Not** a wholesale adoption.

**Hard constraints (load-bearing — every candidate lesson MUST pass all five):**

1. **Markdown over JSON** (SPEC §"Core principles" #1) — any adopted artifact must be a markdown file, human-editable, AI-scannable in diffs. No JSON schemas, no YAML state stores beyond tasknote frontmatter.
2. **Zero scripts** (SPEC §"Core principles" #2) — all operations stay `cp`, `mv`, and editing markdown. No CLI tools, daemons, build steps, native binaries, or runtime processes.
3. **One task per context window** (SPEC §"Core principles" #3) — adopted patterns cannot bloat tasknote tokens. New markdown files compete for context budget with SPEC/SKILL files already loaded.
4. **Relevance before action** (SPEC §"Core principles" #4) — adopted patterns cannot undermine Phase 1's gate or add new mandatory gates beyond the up-to-2 already in SPEC §"Operator-gate cues".
5. **Versioned and pinned** (SPEC §"Core principles" #5) — changes ride a flowtron release; no force-upgrades on adopters. Adopters opt in deliberately.

**Explicit non-goals (out of scope at filing time):**

- **GSD-Pi's architecture** — TypeScript monorepo, `packages/`, `gsd-orchestrator/`, `native/`, `web/`, `studio/`, `vscode-extension/`, `docker/`. SPEC §"What flowtron does NOT provide" forbids all of these.
- **`npm install -g @opengsd/gsd-pi`-style distribution** — flowtron is a git submodule; that's the contract.
- **Slash-command runtime** — flowtron uses Claude Code's skill system; GSD-Pi's `gsd auto`/`gsd quick` runtime is irrelevant.
- **GSD-2** — superseded; lessons should come from active GSD-Pi unless a GSD-Pi → GSD-2 cross-check explicitly surfaces a pattern GSD-Pi abandoned. (Cross-check is best-effort, not a deliverable.)

**Filter rule for candidate lessons:**

For each candidate pattern surfaced in Phase 1, run a 5-point pass against the hard constraints above. Document the verdict per candidate:

- **Pass all 5** → file as implementation child (becomes a `.2..(N-1)` PLAN line at Phase 2).
- **Fail 1+** → document in Discovery Notes as "considered and declined" with the failing principle named; do not file a child.

The declined list is itself a deliverable — it records *why* flowtron deliberately doesn't adopt the obvious patterns from a much larger system, which is load-bearing context for future "why don't we do X like Y does?" conversations.

**In-scope candidate surfaces inventoried (where lessons might land):**

- Top-level markdown conventions (GSD-Pi: `CONTEXT.md`, `VISION.md`, `CHANGELOG.md`, `CONTRIBUTING.md`; flowtron: `README.md`, `SPEC.md`, `docs/{PHILOSOPHY,MIGRATION,PLATFORMS,SECURITY,AGENT-NEUTRALITY,CONVENTIONS}.md`).
- Hygiene/security files (`.prompt-injection-scanignore`, `.secretscanignore`) — markdown-adjacent dotfile conventions.
- `.plans/` directory pattern (vs. flowtron's `_project/PLAN.md` + `_project/tasknote/`).
- Plan → milestone → slice → task hierarchy ideas (vs. flowtron's epic → child + audit/discovery bracket).
- Verification-step integration patterns (vs. flowtron's Phase 3 + Phase 4 closure).
- Per-tasknote `.gsd/` runtime-state pattern (vs. flowtron's "no runtime state" stance).

**Candidates surveyed (full menu — see Stage 1 review chat for the detailed value/cost/verdict scoring):**

| Code | Candidate | Verdict |
|---|---|---|
| **A** | `docs/VISION.md` (outward-facing identity) | **Pass** — folded into C1 |
| **B** | "What we won't accept" PR/AI-suggestion list | **Pass** — folded into C1 (as VISION.md subsection, mirroring GSD-Pi's own structure) |
| **L** | `docs/GLOSSARY.md` domain glossary | **Pass** — becomes C2 |
| **D-sub** | `SECURITY.md` adopter scanner-allowlist note | **Pass** — becomes C3 |
| **S** | "Extension-first" principle paragraph | Borderline — not filed (folded paragraph into C1 VISION.md "Principles" section if natural; otherwise skip) |
| **M** | README badges | Borderline — not filed (cosmetic; can ride a future micro-task if wanted) |
| **C, E, F, G, H, I, J, K, N, O, P, Q, R, T** | (see Stage 1 menu) | **Declined** — documented in "considered and declined" deliverable below |

**Considered and declined (load-bearing artifact — records *why* flowtron deliberately doesn't adopt obvious patterns from a much larger system):**

- **C** — `CONTEXT.md` mega-doc. Violates **one-task-per-window**: always-loaded competes with SPEC + SPEC modules + currently-loaded SKILL for context budget. (The glossary slice survives as L → C2.)
- **E** — `.plans/` directory of RFC docs. Overlaps with `/ft-starter-task` + `/ft-epic-discovery --deep` pre-pass. Adding a parallel "design doc" artifact class would compete with tasknotes for "where does design live."
- **F** — Plan → Milestone → Slice → Task 4-level hierarchy. flowtron's 2-level (epic → child) + 1-level (task) already covers solo AI-coding granularity; 4 levels = taxonomy without value.
- **G** — Runtime verification gates (`reconcileBeforeDispatch` etc.). Violates **zero-scripts**: requires a runtime orchestrator. flowtron's Phase 3 + `/ft-quality` already covers human-in-loop verification.
- **H** — ADR convention (`docs/dev/ADR-014-*.md`). Overlaps with archived tasknotes which already capture per-decision rationale.
- **I** — "Triage synthesis" date-stamped log. Audit-family skills do pattern-detection on demand; standing synthesis doc requires maintenance burden and drifts.
- **J** — `CHANGELOG.md` with `[Unreleased]` + `bug-N` grouping. Flowtron **deliberately removed** CHANGELOG.md (CORE-013, completed 2026-04-30); per-task archives are canonical history.
- **K** — "Closeout Boundary Stop" UX. Already present (🏁 state-marker + 📦 bundled-approval = same shape).
- **N** — Star history / Discord callouts. Doesn't fit "solo AI-assisted coding" positioning.
- **O** — `gsd upgrade` self-update CLI. Submodule pin + `git submodule update --remote` already canonical; CLI violates **zero-scripts**.
- **P** — `bug-N` grouping under issue/changelog. Already covered per-task by archives.
- **Q** — Closeout transcript preservation philosophy. Already present (🏁 state-marker).
- **R** — `.gsd/` runtime-state directory. Direct violation of **zero-scripts** + "git-as-database" stance.
- **T** — Public ownership-transparency narrative. Not applicable (flowtron is solo, no governance event).

**Children locked.** N=5 envelope (Discovery + 3 children + Audit) maintained by folding A+B into a single VISION.md child:

- **CORE-194.2** — Add `docs/VISION.md` (folds A + B)
- **CORE-194.3** — Add `docs/GLOSSARY.md` (L)
- **CORE-194.4** — Extend `SECURITY.md` with adopter scanner-allowlist note (D-sub)
- **CORE-194.5** — Audit (no shift; fixed doc-drift sweep acceptance per `SPEC/epic.md`)

**PHILOSOPHY ↔ VISION delineation (non-overlap contract):**

- **PHILOSOPHY.md** (existing, ~60 lines) — historical narrative, first-person, retrospective. "What I tried first and why it didn't stick." STAYS unchanged.
- **VISION.md** (new, ~80 lines) — outward-facing identity, forward-looking. "Who this is for + principles recap + what we won't accept + brief why-exists." References PHILOSOPHY for history, SPEC for contract.

**Audit scope locked.** CORE-194.5 audit verifies the cohort lands cleanly across SPEC, skills, templates, and docs. The fixed doc-drift sweep acceptance line per `SPEC/epic.md` applies as-is; no shift expected.

### Specification

Per-child deliverable + acceptance + interaction. WHAT each child delivers (not HOW — that lives in each child's own Phase 1 Discovery).

#### CORE-194.2 — `docs/VISION.md` + `SPEC.md` PR-shape subsection (folds candidates A + B; resolved per Q3)

**Deliverable.** Two coordinated edits in one child:

**Edit 1 — new file `docs/VISION.md`, ~80 lines, with these sections:**

1. **Header paragraph** (1-3 sentences) — what flowtron *is*, outward-facing. Pithier than PHILOSOPHY's first paragraph; aimed at someone evaluating flowtron for adoption, not reading its origin story.
2. **`## Who it's for`** — solo AI-assisted coders managing 2-5 side projects in parallel; not for teams, not for monorepos at scale, not for non-code workflows. Names the fit explicitly.
3. **`## Principles`** — recap of SPEC §"Core principles" (markdown-over-JSON · zero-scripts · one-task-per-window · relevance-before-action · versioned-and-pinned) with one outward-facing sentence per principle. Each bullet links to SPEC for the contract version. **5 OR 6 bullets** — child's Phase 1 Discovery decides whether to fold borderline candidate S ("Extension-first") as a 6th (per resolved Q1; deferred).
4. **`## What we won't accept`** — 4-6 PR/AI-suggestion archetypes flowtron rejects (prose version, outward-facing). Examples (final wording at child Phase 1): "Scripts or CLI tools" · "Schema validators" · "Helper not-canonical" · "Cross-project query layers beyond the single read-only visualizer" · "Abstractions without two-project precedent" · "Multi-user / team features." Each archetype gets a one-paragraph justification.
5. **`## Why this exists`** (2-3 sentences) — pointer to PHILOSOPHY.md for the full history; this section is the one-paragraph version.

**Edit 2 — extend `SPEC.md` §"What flowtron does NOT provide" with a PR-shape subsection (~15 lines):**

Per resolved Q3, mirror the "What we won't accept" archetypes into SPEC as a terse contract-shape subsection so the AI sees the guard mid-task (SPEC is always-loaded; VISION is lazy). Format:

```markdown
### PR / suggestion archetypes flowtron does not accept

For future-AI mid-task discipline. Outward-facing prose version lives in [`docs/VISION.md`](docs/VISION.md) §"What we won't accept".

- **Scripts or CLI tools.** See §"Core principles" #2.
- **Schema validators.** Markdown is the schema; the assistant catches drift.
- **Helper-not-canonical.** Promote a helper into flowtron only when ≥2 projects need the same shape.
- **Cross-project query layers beyond the read-only visualizer.** Each project owns its history.
- **Abstractions without two-project precedent.** Three similar lines is better than premature abstraction.
- **Multi-user / team features.** Solo system; teams use a different tool.
```

(Final list at child's Phase 1 — terse list, one-line each. Outward prose version in VISION.md.)

**Acceptance.**

- [ ] `docs/VISION.md` exists with the 5 sections above (Principles section: 5 or 6 bullets — child Phase 1 decides per Q1)
- [ ] `SPEC.md` §"What flowtron does NOT provide" gains a PR-shape subsection (~15 lines) mirroring the VISION archetypes terse, AI-facing
- [ ] VISION ↔ SPEC subsection cross-link both directions (VISION points to SPEC for contract version; SPEC points to VISION for prose version)
- [ ] README.md gets a one-line reference link to VISION.md (alongside existing PHILOSOPHY.md link)
- [ ] PHILOSOPHY.md unchanged (delineation contract from Constitution holds; optional one-line forward-link to VISION at PHILOSOPHY's top is a Phase 4 doc-drift-sweep decision at child time)
- [ ] No section in VISION.md duplicates PHILOSOPHY.md content
- [ ] `_project/tasknote/README.md` AI-referenced docs list updated: SPEC.md re-listed (already there) since contract changed; VISION.md **NOT** added (lazy per Q3 resolution)
- [ ] Phase 4 doc-drift sweep at child closure: README.md cross-link + AI-referenced docs list entry for SPEC.md updated

**Interaction with other children.**

- **Sequencing**: still independent of C2 + C3 (any landing order works).
- **Cross-references**: VISION ↔ SPEC.md (PR-shape subsection). VISION links to PHILOSOPHY.md (history). Does NOT cross-reference C2 (GLOSSARY) or C3 (SECURITY) — different concerns. C2's GLOSSARY may want a "PR-shape archetype" term that links to SPEC's new subsection — but that's C2's Phase 1 call.

**Draft PLAN.md line (filed in Phase 2, ≤50w target):**

```markdown
- [ ] **CORE-194.2** [opus] | vision-md — Add `docs/VISION.md` (outward identity: who-it's-for + principles + "what-we-won't-accept" prose + brief why-exists) + extend `SPEC.md` §"What flowtron does NOT provide" with PR-shape subsection (AI-visible mirror). Cross-link both. Adopted-from-gsd-pi VISION + PR-rejection pattern per [[CORE-EPIC-194]].
```

(Word count: ~37w. Under 50w target.)

---

#### CORE-194.3 — `docs/GLOSSARY.md` (candidate L; expanded per Q2 to comprehensive scope)

**Deliverable.** New file `docs/GLOSSARY.md`, ~120-160 lines, alphabetized one-line definitions for the load-bearing flowtron vocabulary. Each entry: term · one-sentence definition · cross-reference to authoritative SPEC section or skill file.

**Term cohort — comprehensive (~40+ terms, per resolved Q2):**

- **Workflow primitives**: tasknote, epic, parent epic, child, starter tasknote, micro-tasknote, follow-up, area prefix, priority level, model field, shortname
- **Phases**: Discovery (Phase 1), Execution (Phase 2), Testing & Linting (Phase 3), Closure (Phase 4), Relevance Assessment, Drift check, Archive skim, Doc-drift sweep, Pattern survey
- **Epic lifecycle**: epic Discovery (`.1`), epic Audit (`.N`), deep pre-pass (Constitution → Specification → Clarifications), starter promotion
- **Operator gates / markers**: 🛠️ Phase 1→2 banner, 📦 ready-to-commit banner, 🏁 state-marker, 👁️ visual-confirmation prefix, 🔍 audit-family next-move flag, Conditional skip rule, Privileged-ops, `--fast` operator override
- **Post-closure**: post-closure protocol, commit-go (🟢), copy-paste line
- **Adoption**: submodule pin, AGENTS.md, `_project/PLAN.md`, `_project/tasknote/README.md`, AI-referenced docs, audit-family fork
- **Audit-family skill names** (per Q2 comprehensive scope): `/ft-audit`, `/ft-audit-docs`, `/ft-audit-backend`, `/ft-audit-frontend`, `/ft-audit-performance`, `/ft-audit-security`, `/ft-audit-context`
- **Grammar elements** (per Q2 comprehensive scope): `[!critical]` flag, `[model]` tag, `| shortname` segment, `[[TASK-ID]]` wikilink, `Blocked by [[ID]]` clause, `Completed YYYY-MM-DD.` stub form

Estimated **~40-50 terms** at filing; final count surfaces from child's Phase 1.

**Acceptance.**

- [ ] `docs/GLOSSARY.md` exists with alphabetized term list
- [ ] Every term has: definition + cross-reference link (SPEC anchor, SPEC module path, or skill file path)
- [ ] No term is defined here that contradicts the authoritative source (glossary is a *pointer*, not a re-spec)
- [ ] **NOT** added to AI-referenced docs in `_project/tasknote/README.md` (lazy-loaded — protects one-task-per-window per Constitution)
- [ ] Referenced from: README.md (skill-resolver navigation section), `docs/MIGRATION.md` §1 (adopter onboarding step)
- [ ] Phase 4 doc-drift sweep at child closure: README.md + MIGRATION.md cross-links; everything else "no change"

**Interaction with other children.**

- **Sequencing**: independent of C1 + C3; can land in any order.
- **Cross-references**: every term links to SPEC anchors. Does NOT define VISION.md or SECURITY.md content — those are concept docs, not load-bearing vocabulary.

**Draft PLAN.md line (filed in Phase 2, ≤50w target):**

```markdown
- [ ] **CORE-194.3** [opus] | glossary — Add `docs/GLOSSARY.md`: alphabetized one-line defs for ~40+ load-bearing terms (workflow primitives, phases, epic lifecycle, 🛠️/📦/🏁/👁️/🔍 markers, audit-family skill names, grammar elements) with cross-refs to SPEC anchors. Lazy-loaded. Adopted-from-gsd-pi `CONTEXT.md` glossary pattern per [[CORE-EPIC-194]].
```

(Word count: ~42w. Under 50w target.)

---

#### CORE-194.4 — `SECURITY.md` extension (candidate D-sub)

**Deliverable.** Extension to existing `SECURITY.md` — add a new section, ~15-25 lines, titled `## Adopter scanner false-positive allowlists` (final heading at child time).

**Section content (sketch — final wording at child's Phase 1):**

1. **Context paragraph** — adopters running prompt-injection scanners (e.g., Semgrep rules, custom LLM-scan tools) or secret-detection scanners (Gitleaks, TruffleHog, Snyk, etc.) WILL encounter false positives in flowtron's prose. Specifically, SPEC §"Conditional skip rule" cites `API_KEY`, `SECRET`, `TOKEN`, `PASSWORD` (uppercase) as privileged-ops triggers — these literal strings appear in SPEC.md, AGENTS.md (if patched in), and any skill file that mentions the privileged-ops list.
2. **Allowlist convention** — document the `filepath:regex` allowlist format (one-line examples). Cite GSD-Pi's `.prompt-injection-scanignore` and `.secretscanignore` as known-good prior art for the format. Do **not** ship the scan-ignore files themselves — that would presuppose a runtime scanner and violate zero-scripts.
3. **Flowtron-aware example** — concrete `filepath:regex` lines an adopter could drop into their own scanner config to whitelist flowtron's submodule path, e.g.:

   ```text
   _project/flowtron/SPEC.md:(API_KEY|SECRET|TOKEN|PASSWORD)
   _project/flowtron/claude/skills/**/*.md:(API_KEY|SECRET|TOKEN|PASSWORD)
   ```

4. **Cross-link** — back to SPEC §"Conditional skip rule" for the canonical privileged-ops keyword list.

**Acceptance.**

- [ ] `SECURITY.md` gains the new section in its current structure (insertion point at child's Phase 1)
- [ ] Section cites SPEC §"Conditional skip rule" by anchor link
- [ ] Section names GSD-Pi as the source of the convention (one-line attribution)
- [ ] **No** `.prompt-injection-scanignore` / `.secretscanignore` files added to flowtron's tree (docs only — Constitution holds)
- [ ] Phase 4 doc-drift sweep at child closure: SECURITY.md edited; SPEC.md anchor verified; everything else "no change"

**Interaction with other children.**

- **Sequencing**: independent of C1 + C2; can land in any order.
- **Cross-references**: links to SPEC §"Conditional skip rule". Does NOT cross-reference C1 (VISION) or C2 (GLOSSARY) — though GLOSSARY may want to add "Privileged-ops" as a term that links here (TBD at C2's Phase 1).

**Draft PLAN.md line (filed in Phase 2, ≤50w target):**

```markdown
- [ ] **CORE-194.4** [opus] | security-scanner-allowlist — Extend `SECURITY.md` with adopter-side prompt-injection / secret-scanner false-positive allowlist guidance (cites SPEC §"Conditional skip rule" privileged-ops keyword triggers). Documents `filepath:regex` convention with flowtron-aware example. Adopted-from-gsd-pi pattern (docs only) per [[CORE-EPIC-194]].
```

(Word count: ~41w. Under 50w target.)

---

#### CORE-194.5 — Audit (no shift from filing)

**Deliverable** (per `SPEC/epic.md`): final-subtask audit verifying CORE-194.2/.3/.4 sit well in the codebase as a whole. Fixed doc-drift sweep acceptance line per spec.

**Specific audit focus areas** (informed by this Discovery, drafted into the audit tasknote at scaffolding time by `/ft-close-epic`):

- Verify VISION.md ↔ PHILOSOPHY.md non-overlap contract holds (no duplicate content)
- Verify VISION.md ↔ SPEC.md PR-shape subsection cross-links both directions and content stays in sync (added per Q3 resolution)
- Verify GLOSSARY.md term cross-refs all resolve to live SPEC anchors (no link-rot from concurrent SPEC edits)
- Verify SECURITY.md scanner-allowlist section's example covers the SPEC §"Conditional skip rule" privileged-ops keyword cluster exhaustively
- Verify README.md cross-link cohort (VISION + GLOSSARY) sits cleanly in existing structure
- **Constitution-compliance pass (per Q4 resolution)** — re-run the 5-point hard-constraints filter from this Discovery's Constitution section against C1/C2/C3 diffs; flag any of the 13 declined patterns that crept in during execution
- Standard 5-pass `/ft-audit` rubric across the cohort
- Fixed doc-drift sweep across AI-referenced docs

**Draft PLAN.md line** (already filed at Step 4):

```markdown
  - [ ] **CORE-194.5** [opus] | audit — Final-subtask audit per SPEC/epic.md (fixed doc-drift sweep acceptance line). Filed at filing time as highest `.N` child.
```

(Filed verbatim per skill Step 4; no re-draft needed unless audit scope shifts.)

### Clarifications

Open scoping decisions resolved via AskUserQuestion before exit. Resolutions back-propagated into the Specification subsection above (final-state reflects resolutions).

| # | Question | Resolution | Downstream impact |
|---|---|---|---|
| Q1 | VISION.md 'Principles' section — include 'Extension-first' as 6th principle (folding borderline candidate S)? | **Defer to C1's Phase 1 Discovery** | C1 PLAN line notes "principles section: 5 or 6 bullets (extension-first TBD at child Phase 1)." |
| Q2 | GLOSSARY.md term scope? | **Comprehensive (~40+ terms)** — workflow primitives + phases + epic lifecycle + operator gates + post-closure + adoption + audit-family skill names + sub-concepts + grammar elements | C2 Spec: term cohort expanded; line-budget upper bound shifts from ~80-120 lines → ~120-160 lines. PLAN line updated to "~40+ terms." |
| Q3 | Where does "What we won't accept" live so AI sees it mid-task (not just humans reviewing VISION)? | **Mirror into SPEC §"What flowtron does NOT provide" as PR-shape subsection; VISION stays lazy** | C1 scope expands: now adds `docs/VISION.md` (~80 lines) **AND** extends `SPEC.md` §"What flowtron does NOT provide" with PR-shape subsection (~15 lines). Both cross-linked. C1 PLAN line rewritten. |
| Q4 | CORE-194.5 audit — add explicit "Constitution-compliance pass" (verify none of the 13 declined patterns crept into landed children)? | **Yes, add the pass** | C5 (audit) Spec: new focus area added — "Constitution-compliance pass: re-run 5-point filter against C1/C2/C3 diffs; flag any declined pattern that crept in." `/ft-close-epic` will scaffold this into the audit tasknote at execution time. |

**Deferred to each child's own Phase 1 Discovery (not load-bearing for filing):**

- Should PHILOSOPHY.md get a one-line cross-link to VISION.md when C1 lands? (C1's Phase 4 doc-drift sweep will decide.)
- Should `docs/MIGRATION.md` mention VISION + GLOSSARY in adopter onboarding? (C1 / C2 each judge at Phase 4.)
- Exact insertion point in SECURITY.md for the new scanner-allowlist section. (C3's Phase 1.)
- Exact GLOSSARY entry for "Privileged-ops" — defines the term + links to SPEC §"Conditional skip rule" **and** to the new SECURITY.md section after C3 lands. (C2's Phase 1 + Phase 4 doc-drift sweep handles ordering.)
- Child sequencing: C1, C2, C3 are independent — pick by user preference at next-move suggestion time after Discovery closure.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` with the topic embedded as args ("explore what GSD-Pi has that flowtron can learn from"). Epic scope confirmed by deep pre-pass (Constitution + Specification + Clarifications) — 3 concrete children + audit identified, all passing flowtron's 5 Core Principles filter. Not a re-scope (children fit the original framing); not a de-scope (the work is real and produces 3 concrete doc deliverables).

- [x] Read relevant source files (`SPEC.md`, `SPEC/epic.md`, `docs/PHILOSOPHY.md`, `_project/PLAN.md`, `templates/tasknote-template.md`, `README.md`, `_project/tasknote/README.md`, `SECURITY.md`, GSD-Pi external surface via WebFetch + `gh api`)
- [x] **Archive skim** — 216 archived CORE tasknotes scanned; ~20 hits on `SECURITY|PHILOSOPHY|VISION|GLOSSARY|prompt-injection|secretscan|gsd`. Load-bearing findings logged in Discovery Notes below.
- [x] **Drift check** — 1 drift found and patched inline (SECURITY.md path); 3 cited concepts re-verified at HEAD. Logged below.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Resolved during deep pre-pass; see `## 🧭 Deep Pre-pass` §Clarifications above.
- [x] Subtasks above populated with concrete, ordered steps (pre-filled at scaffolding; refined per Q2/Q3 resolutions to reflect expanded GLOSSARY scope + SPEC PR-shape subsection)

**Discovery Notes:**

**Inventory of in-scope surfaces** — see `## 🧭 Deep Pre-pass` §Constitution "In-scope candidate surfaces inventoried." Adopted surfaces locked there (A + B + L + D-sub); declined surfaces and reasons recorded in the "considered and declined" deliverable.

**Archive skim — load-bearing precedents:**

- **CORE-121** (`security-md-ai-ref-decision`, archived 2026-05-20) — Decided **include** `SECURITY.md` in `_project/tasknote/README.md` §"AI-referenced docs" with the one-line purpose "prompt-injection and supply-chain threat model; informs how skills handle contributor-authored content and submodule bumps." **Impact on C3**: SECURITY.md is already in the AGENTS chain, so the new "Adopter scanner false-positive allowlists" section gets AI mid-task visibility for free — no further AI-referenced-docs update needed for C3. Doc-drift sweep at C3 closure will just note "SECURITY.md updated" with no list change.
- **CORE-EPIC-099** (`external-conventions-survey`, completed 2026-05-18, 8 children .1–.8) — closest precedent for a survey-shape epic. Used `## Completed` archive convention "Children CORE-099.1–.8 archived; closure consumed the subtask list per epic-close convention." **Impact**: parent epic line at completion will follow the same shape — children move to archive folders; parent line gets stub form when CORE-194.5 closes.
- **CORE-EPIC-097** (`external-skill-survey`, completed 2026-05-18, 8 children .1–.8) — second survey precedent. Same archive convention.
- **CORE-013** (referenced from PLAN.md as `ghost CHANGELOG.md refs`) — historical confirmation that CHANGELOG.md was deliberately removed; reinforces candidate J decline.
- **No prior consideration of `VISION.md` or `GLOSSARY.md`** — `grep VISION|GLOSSARY` across `_project/tasknote/archive/core/*.md` + `docs/*.md` + `SPEC.md` + `README.md` returned zero matches. Clean slate; no in-flight or prior-rejected design to align with.

**Drift check — verdicts:**

- **`SECURITY.md` path drift (FOUND + PATCHED).** Stage 2 Specification drafted `docs/SECURITY.md` (5 occurrences). Actual location is **repo root** (`SECURITY.md`) — same level as README.md, CONTRIBUTING.md, LICENSE. Verified by failed Read at `docs/SECURITY.md` + successful Read at `SECURITY.md` + cross-confirmation against `README.md` §"Documents" (line 30: `[SECURITY.md](SECURITY.md)`) and `_project/tasknote/README.md` (line 40: `SECURITY.md — prompt-injection and supply-chain threat model`). Patched inline in Stage 2 Specification CORE-194.4 (replace_all). Rationale for root placement: SECURITY.md is a GitHub-recognized file (renders in `/security` tab), like CONTRIBUTING.md and LICENSE; non-GitHub-special docs go in `docs/`.
- **Privileged-ops keyword cluster (CONFIRMED at HEAD).** `SPEC.md:464` carries `API_KEY`, `SECRET`, `TOKEN`, `PASSWORD` (uppercase) — matches the cluster cited in C3's draft section. C3's example will use this exact list.
- **README.md §"Documents" cross-link surface (CONFIRMED).** README.md currently lists SPEC, PHILOSOPHY, MIGRATION, CONVENTIONS, AGENT-NEUTRALITY, PLATFORMS, CONTRIBUTING, SECURITY (8 entries). C1 will add VISION; C2 will add GLOSSARY. Insertion points: VISION goes near PHILOSOPHY (companion); GLOSSARY goes near MIGRATION (adopter-facing reference docs).
- **`docs/VISION.md` + `docs/GLOSSARY.md` placement (CONFIRMED).** Both fit `docs/` precedent (non-GitHub-special docs go there, alongside PHILOSOPHY/MIGRATION/CONVENTIONS/AGENT-NEUTRALITY/PLATFORMS). No drift; Spec correct.
- **SPEC.md §"What flowtron does NOT provide" exists (CONFIRMED).** Located at the very bottom of SPEC.md per Read earlier. Adding a PR-shape subsection at the section's end (after the existing feature non-goals bullet list) is the natural insertion point per Q3 resolution.

**Resolved scoping table** — see `## 🧭 Deep Pre-pass` §Clarifications above. All 4 ambiguities resolved before Phase 1 entered.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-057 children (`CORE-057.2..057.8`) and CORE-EPIC-098 children (`CORE-098.1..098.15`) are the closest precedents: 2-space child indent under the parent, `[opus]` model tag preserved on every line, em-dash separator, `| shortname` ≤30 chars, long description ≤50w target / 70w hard cap. C2/C3/C4 lines drafted in Stage 2 follow this shape verbatim.
- [x] Implemented the minimal solution — 3 PLAN.md lines inserted under `CORE-EPIC-194`, between existing `.1` Discovery and `.5` Audit lines.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable code surface).

**Implementation Notes:**

- **3 lines written** to `_project/PLAN.md` under `## Medium` → `CORE-EPIC-194`:
  - `CORE-194.2` (vision-md) — 37 words
  - `CORE-194.3` (glossary) — 42 words
  - `CORE-194.4` (security-scanner-allowlist) — 33 words
- **All 3 under 50w target**; max breach distance = 8w (line 2 at 42/50). Well clear of the 70w hard cap.
- **Audit number unchanged.** Discovery did not shift N — Stage 1 Constitution locked 4 confirmed-pass candidates (A/B/L/D-sub) folding to 3 children (A+B fold), matching the filed N=5 (Discovery + 3 + Audit). `CORE-194.5` stays as filed; no re-numbering needed.
- **2-space child indent preserved** on all 3 new lines (verified visually in PLAN.md diff). `[opus]` tag, `| shortname` segment, em-dash separator, `[[CORE-EPIC-194]]` wikilink back-ref all present.
- **Parent epic description unchanged** at Phase 2 — refinement happens at Phase 4 closure per skill Step 9 ("Parent description is a placeholder. The parent epic's long description filed in Step 4 is a one-paragraph placeholder; the Discovery's Final Summary refines it at closure time.") — but in this case the filing-time description already accurately states the deliverable ("filed child scopes per lesson"), so no refinement needed; Final Summary will confirm.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits only)
- [x] Ran lint/type-check on changed code — N/A (markdown-prose edits only)
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface)

**Testing Notes:**

Markdown mental-pass on the 3 new PLAN.md lines:

- **2-space child indent preserved** on every new line ✓
- **`**CORE-194.<M>**` bold ID intact** on every line ✓
- **`[opus]` tag present** on every line ✓
- **`| <shortname>` segment ≤30 chars:** `vision-md` (9), `glossary` (8), `security-scanner-allowlist` (27) ✓
- **Em-dash separator (` — `) consistent** on every line ✓
- **Long description ≤70w hard cap:** 37 / 42 / 33 (all comfortably under cap) ✓
- **≤50w target:** all 3 under (max 42) ✓
- **No trailing whitespace** ✓
- **`[[CORE-EPIC-194]]` wikilink back-ref present** on every line ✓

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts across `_project/tasknote/README.md` §"AI-referenced docs" (9 entries):
  - `README.md` — **no change** (VISION + GLOSSARY cross-link additions ride C1 + C2)
  - `SPEC.md` — **no change** (PR-shape subsection rides C1; base unchanged at this filing)
  - `docs/MIGRATION.md` — **no change** (adopter-onboarding additions ride C1 + C2)
  - `claude/AGENTS-snippet.md` — **no change** (no agent-neutral surface shift in pure Discovery filing)
  - `docs/CONVENTIONS.md` — **no change** (conventions reaffirmed by Constitution but not edited)
  - `CONTRIBUTING.md` — **no change** (PR-shape guard lands in SPEC + VISION via C1)
  - `SECURITY.md` — **no change** (scanner-allowlist section rides C3)
  - `docs/AGENT-NEUTRALITY.md` — **no change**
  - `docs/PLATFORMS.md` — **no change**
  - **Verdict:** 9/9 no-change — matches Constitution prediction ("typically no AI-referenced doc updates land in pure Discovery filing; contract edits land inside the implementation children")
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (per SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (autonomous-commit skip branch — bundles below)

**Final Summary:**

Filed `CORE-EPIC-194` (`gsd-pi-learnings`) with 3 implementation children + audit envelope by surveying GSD-Pi (active successor to archived GSD-2) and filtering candidate patterns through flowtron's 5 Core Principles. Discovery ran via `/ft-epic-discovery --deep`, exercising the optional Constitution → Specification → Clarifications pre-pass.

**Outcome shape:** 4 pass candidates (A=VISION.md, B=PR-rejection list, L=GLOSSARY.md, D-sub=SECURITY scanner-allowlist) folded into 3 children (A+B combined per GSD-Pi's own VISION structure where the rejection list is a subsection); 13 declined candidates captured as a load-bearing deliverable in Stage 1 Constitution (records *why* flowtron deliberately doesn't adopt obvious patterns from a much larger system).

**Children locked:** CORE-194.2 (vision-md — adds `docs/VISION.md` + extends `SPEC.md` PR-shape subsection per Q3 resolution); CORE-194.3 (glossary — adds `docs/GLOSSARY.md` with ~40+ terms per Q2 resolution); CORE-194.4 (security-scanner-allowlist — extends root `SECURITY.md` per drift-patched Spec). Audit CORE-194.5 unchanged; will gain explicit Constitution-compliance pass per Q4 resolution.

**One drift caught + patched:** Stage 2 Spec drafted `docs/SECURITY.md` (5 occurrences); actual location is repo-root `SECURITY.md` (GitHub-recognized file convention). Patched inline via `replace_all` before Phase 2 fired. No downstream impact on children — their Phase 1 Discoveries will read the patched Spec.

**Archived:** 2026-05-24
