---
title: platforms-doc
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-EPIC-154, CORE-154.1, CORE-154.2, CORE-154.3, CORE-154.5, CORE-154.6]
---

# CORE-154.4 | platforms-doc

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-23 · 🔗 [[CORE-EPIC-154]] · [[CORE-154.1]] · [[CORE-154.2]] · [[CORE-154.3]] · [[CORE-154.5]] · [[CORE-154.6]]

## 🎯 Goal

Author `docs/PLATFORMS.md` documenting the two-layer model (agent-neutral contract via AGENTS.md / Claude-Code-specific wiring at `claude/`) plus the symmetric plug-in pattern for future platforms (Codex CLI / grok / cursor), and link it from the README's `## Documents` index.

## ✅ Acceptance

- [ ] `docs/PLATFORMS.md` authored, ≤300 lines per [[CORE-154.1]] Spec §CORE-154.4, covering: two-layer model (agent-neutral contract / per-platform wiring); today's surface (Claude Code wiring + conversational-only platforms); the symmetric plug-in pattern; minimal scaffold sketch for a sibling `<platform>/` wiring dir (inline, not as a `templates/` artifact); worked example (Claude Code today); reader-scope + out-of-scope sections; Related cross-refs to AGENT-NEUTRALITY + the parent epic
- [ ] Scaffold-shape decision recorded: **inline code-fence sketch** (no `templates/platform-wiring-template/` dir ships) — rationale cites [[CORE-154.1]] Spec wording "not actually shipped; just the template" + no canonical second platform to template against (every speculative file-extension would be guessed)
- [ ] `README.md` `## Documents` index gains `docs/PLATFORMS.md` entry (placed adjacent to `docs/AGENT-NEUTRALITY.md` for topical pairing)
- [ ] `docs/AGENT-NEUTRALITY.md` `(forthcoming)` markers (4 sites: L19, L45, L70, L76) flipped to closed; `Last reviewed` line on L3 appended with `[[CORE-154.4]]`
- [ ] Forward-pointer link-integrity verified: `SPEC.md:53`, `README.md:108`, and the 4 AGENT-NEUTRALITY.md sites all resolve to the new `docs/PLATFORMS.md`
- [ ] AI-referenced docs list (`_project/tasknote/README.md`) decision: NOT added; mirror [[CORE-154.2]] reasoning for AGENT-NEUTRALITY.md (rare-consult contract-layer reference, not cold-start material). Documented in Phase 4 closure notes.
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Author `docs/PLATFORMS.md` — sections per Discovery Notes (two-layer model · today's surface · plug-in pattern · scaffold sketch · AGENTS-snippet expectations · single-source-of-truth posture · mandatory/optional reference table · worked example: Claude Code · reader scope · out-of-scope · Related)
- [ ] Edit `README.md` `## Documents` — add `docs/PLATFORMS.md` entry between `docs/AGENT-NEUTRALITY.md` and `CONTRIBUTING.md`
- [ ] Edit `docs/AGENT-NEUTRALITY.md` — append `[[CORE-154.4]]` to `Last reviewed` (L3); flip 4 `(forthcoming)` markers (L19-20 §Principle; L45 ledger MIGRATION.md row; L70 §"Out of scope" `.4` bullet; L76 §"Out of scope" `.3` bullet's nested PLATFORMS.md ref)
- [ ] Phase 3 — markdown mental-pass on PLATFORMS.md + locator-stability grep across `SPEC.md`, `README.md`, `AGENT-NEUTRALITY.md` for `PLATFORMS.md` references; confirm new doc reachable from all forward-pointers
- [ ] Phase 4 — doc-drift sweep + flip CORE-154.4 PLAN.md line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-154]] — parent epic: multi-agent-portability code sweep
- [[CORE-154.1]] — epic Discovery; filed `.2..(N-1)` children including this one
- [[CORE-154.2]] — agent-neutral surface audit; established the AGENTS.md / `claude/` split
- [[CORE-154.3]] — wiring-layer status-quo lock + PLATFORMS.md forward-pointers (immediate predecessor; this task consumes those forward-pointers)
- [[CORE-154.5]] — portability re-comb + Claude-Code regression read-through (downstream)
- [[CORE-154.6]] — closing audit subtask

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (Step 1 of /ft-task)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-154.1]] Specification §CORE-154.4 locked the deliverable shape (two-layer model + platform-plug-in pattern + scaffold sketch + worked example) and Stage 3 Clarifications resolved the doc location (new `docs/PLATFORMS.md`). [[CORE-154.2]] shipped `docs/AGENT-NEUTRALITY.md` providing the agent-neutrality contract this doc extends. [[CORE-154.3]] locked option (a) status-quo for the wiring layer + added forward-pointers from `SPEC.md:53`, `README.md:108`, and 5 sites in `AGENT-NEUTRALITY.md` (4 of them marked `(forthcoming)`) waiting for this doc to land. Phase 1 read confirms no surprise warranting scope shift.

- [x] Read relevant source files:
  - `_project/tasknote/archive/core/CORE-154.1.md` — Discovery: Constitution + Specification §CORE-154.4 + Stage 3 Clarifications (`.4` doc location = new `docs/PLATFORMS.md`; scaffold-shape deferred to this child)
  - `_project/tasknote/archive/core/CORE-154.2.md` — Audit + AGENT-NEUTRALITY.md ledger shape; `structured ask` / `prose ask` terminology pair
  - `_project/tasknote/archive/core/CORE-154.3.md` — Wiring-layer decision (option a) + forward-pointer placements
  - `README.md` — `## Documents` index (L10–28); `## Repo layout` (L103–115); insertion point for new doc identified between AGENT-NEUTRALITY.md (L21–23) and CONTRIBUTING.md (L24–25)
  - `docs/AGENT-NEUTRALITY.md` — full read; identified 4 `(forthcoming)` sites needing flip (L19-20 §Principle; L45 ledger MIGRATION.md row; L70 §"Out of scope" `.4` bullet; L76 §"Out of scope" `.3` bullet's nested PLATFORMS.md ref). `Last reviewed:` line (L3) currently cites `[[CORE-154.2]], [[CORE-154.3]]` — needs `[[CORE-154.4]]` appended.
  - `docs/MIGRATION.md` — confirmed §1.2 / §1.3 / §3 are the Claude Code-specific adoption guide today; PLATFORMS.md should NOT duplicate any wiring command content (single-source-of-truth per [[CORE-091]])
  - `docs/CONVENTIONS.md` — Diátaxis quadrant table at L41–48 ("Reference / How-to / Explanation"); PLATFORMS.md fits closest to **Reference** (structural pattern documentation) with a touch of Explanation; this matches AGENT-NEUTRALITY.md's positioning
  - `claude/AGENTS-snippet.md` — confirmed canonical AGENTS-snippet shape: paste-block + One-time symlink wiring + Bumping section. PLATFORMS.md's worked-example references this shape.
  - `claude/commands/ft-task.md` + `claude/skills/ft-task/SKILL.md` head — confirmed slash-command stub + skill body shape for the scaffold sketch
  - `SPEC.md:53` + `README.md:108` — confirmed `.3`'s forward-pointer language ("see [`docs/PLATFORMS.md`](docs/PLATFORMS.md) for the plug-in pattern") in place; PLATFORMS.md must satisfy this reference

- [x] **Archive skim** — `_project/tasknote/archive/core/` grep for prior PLATFORMS/multi-platform/wiring precedent: hits are the expected CORE-154 cluster (.1/.2/.3) plus CORE-057.* (skill-expansion epic; not directly relevant) and CORE-072 (audit-skill; tangential). `templates/platform` grep hits only CORE-154.1 (the scaffold-shape spec mention). No prior PLATFORMS-doc precedent; this is greenfield within the locked epic scope.

- [x] **Drift check** — all cited paths verified at HEAD 2026-05-23:
  - `SPEC.md:53` forward-pointer present (`see [\`docs/PLATFORMS.md\`](docs/PLATFORMS.md) for the plug-in pattern.`)
  - `README.md:108` forward-pointer present (same language)
  - `docs/AGENT-NEUTRALITY.md` 4 `(forthcoming)` sites verified at L19-20, L45, L70, L76
  - `claude/AGENTS-snippet.md` 12 symlink commands at L31-42 intact
  - `claude/commands/` has 17 entries; `claude/skills/` has 17 entries (matches AGENT-NEUTRALITY.md ledger framing of bundled Claude-Code wiring scope)
  - No drift.

- [x] Clarifying questions — **No clarifications needed.** Two explicit assumptions resolve the [[CORE-154.1]] deferred items:
  1. **Scaffold-shape = inline code-fence sketch.** Not a `templates/platform-wiring-template/` dir. Rationale: [[CORE-154.1]] Spec wording ("not actually shipped; just the template") rules out shipping a real templates dir. Also: no canonical second platform exists yet, so every speculative file-extension (`.md` for Codex? `.json`? `.toml`?) would be guessed — inline sketch keeps the example abstract and honest. Constitution principle 2 (markdown-only, zero scripts) also favors not shipping a directory tree of speculative scaffolding.
  2. **PLATFORMS.md NOT added to AI-referenced docs cold-start list.** Mirrors [[CORE-154.2]]'s decision for AGENT-NEUTRALITY.md: this is a rare-consult contract-layer reference, not cold-start material. Adding would bloat every Phase 4 sweep for ~5% relevance. If a future audit surfaces a drift concern, re-evaluate.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Document structure decided

Target ~150-200 lines; ≤300 hard cap per [[CORE-154.1]] Spec. Reference + light explanation tone per Diátaxis (`docs/CONVENTIONS.md:41-48`).

| # | Section | Purpose |
|---|---|---|
| 1 | Lead paragraph | Frame the rare-reader audience; reference AGENT-NEUTRALITY.md as the principle this doc operationalizes |
| 2 | §"The two-layer model" | Contract layer (agent-neutral; AGENTS.md surface) vs. wiring layer (per-platform); cite Constitution principle 1 [[CORE-154.1]] |
| 3 | §"Today's surface" | Claude Code (full wiring) vs. other AGENTS.md-reading platforms (Codex CLI, Cursor, Amp, Aider) which drive conversationally |
| 4 | §"Adding a new platform's wiring" | The symmetric plug-in pattern: sibling top-level `<platform>/` dir per [[CORE-154.3]]; naming convention; hard constraints from AGENT-NEUTRALITY.md |
| 5 | §"Minimal scaffold sketch" | Inline code-fence tree (not a real `templates/` dir); explain placeholders |
| 6 | §"What the `<PLATFORM>`-snippet.md must contain" | Section breakdown: paste-block, platform-specific wiring commands, pinning notes; reference `claude/AGENTS-snippet.md` as worked example |
| 7 | §"Single-source-of-truth posture" | Per [[CORE-091]] — per-platform AGENTS-snippet.md is the single source for that platform's wiring; sharing the AGENTS.md paste-block content vs. duplicating |
| 8 | §"Mandatory vs. optional reference" | Table: AGENTS.md visibility (mandatory); per-platform AGENTS-snippet (recommended); commands/skills dir (optional); operator flags (optional); install mechanism (optional) |
| 9 | §"Worked example: Claude Code" | Concrete instantiation: `claude/` dir, AGENTS-snippet.md, 17 commands + 17 skills, symlink wiring under adopter `.claude/`, `--fast` flag |
| 10 | §"When this doc is useful" | Reader-scope: adding a platform / auditing wiring layer / writing agent-neutrality audits |
| 11 | §"Out of scope" | What this doc deliberately doesn't address (judgment to ship a platform; per-platform skill content; migration tooling) |
| 12 | §"Related" | Cross-refs to SPEC.md §"Working in...", AGENT-NEUTRALITY.md, MIGRATION.md, AGENTS-snippet.md, parent epic + .1/.2/.3 children |

### Closure-of-loop edits to AGENT-NEUTRALITY.md

The 4 `(forthcoming)` markers placed by .2 (3 sites) and .3 (1 site, the §"Out of scope" `.3` bullet's nested PLATFORMS.md ref). Flip pattern mirrors .3's flip of the §"Out of scope" `.3` bullet (forthcoming → closed-decision summary with rationale). Each flip is surgical (~1-line edit). `Last reviewed:` line (L3) appended `[[CORE-154.4]]` per the established pattern.

### Forward-pointer language consistency

`.3` established the canonical phrasing at SPEC.md:53 and README.md:108: "Future non-Claude-Code platform wirings (e.g., `codex/`, `grok/`, `cursor/`) plug in symmetrically as sibling top-level dirs — see [`docs/PLATFORMS.md`](docs/PLATFORMS.md) for the plug-in pattern." PLATFORMS.md's lead paragraph should echo this language so a reader arriving from those forward-pointers immediately recognizes they're in the right place.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — direct precedents: [[CORE-154.2]] for "new doc under `docs/` + README `## Documents` index update + AGENT-NEUTRALITY.md ledger cross-link" shape; [[CORE-154.3]] for "flip `(forthcoming)` placeholder bullets to closed status with rationale" pattern. New shape: documentation doc structure (Reference + light Explanation per Diátaxis), modeled on AGENT-NEUTRALITY.md's tone but with more tables (mandatory/optional reference, today's surface, two-layer model). Inline code-fence scaffold sketch chosen over a `templates/platform-wiring-template/` dir per [[CORE-154.1]] Spec wording "not actually shipped" + no canonical second platform to template against.
- [x] Implemented the minimal solution — 1 new file + 2 surgical edits across 2 files in a single sequential batch (Write PLATFORMS.md → Edit README.md → Edit AGENT-NEUTRALITY.md ×5 surgical-flip edits).
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface).

**Implementation Notes:**

**Files changed (3 total: 1 new + 2 edits):**

| File | Change |
|---|---|
| `docs/PLATFORMS.md` | **NEW** — 236 lines (≤300 cap). 11 sections per Discovery structure table. Lead frames rare-reader audience. Two-layer model + today's surface as adjacent tables. Symmetric plug-in pattern with naming conventions + hard constraints. Inline `text` code-fence scaffold sketch. AGENTS-snippet sectioning expectations. Single-source-of-truth posture per [[CORE-091]]. Mandatory/optional reference table. Worked example: Claude Code concretization (`claude/` dir, 17 commands + 17 skills, symlink wiring, `--fast` flag). Reader scope + out-of-scope + Related cross-refs. |
| `README.md:24-28` | Added `docs/PLATFORMS.md` entry to `## Documents` index between `docs/AGENT-NEUTRALITY.md` and `CONTRIBUTING.md` (topical pairing). |
| `docs/AGENT-NEUTRALITY.md` | 5 surgical edits: L3 `Last reviewed:` appended `[[CORE-154.4]]`; L19 §Principle `(forthcoming)` removed (now just `([[CORE-154.4]])`); L45 ledger MIGRATION.md row `forthcoming docs/PLATFORMS.md` → `see [[CORE-154.4]] / `docs/PLATFORMS.md` for the plug-in pattern`; L70-71 §"Out of scope" `.4` bullet `(forthcoming)` removed (now `[`PLATFORMS.md`](PLATFORMS.md)`); L76 §"Out of scope" `.3` bullet's nested `(forthcoming)` removed. |

**Key decisions encoded:**

- **Scaffold-shape = inline code-fence sketch.** No `templates/platform-wiring-template/` dir. Rationale documented in PLATFORMS.md §"Minimal scaffold sketch" lead paragraph ("This is an example, not a `templates/` artifact — every speculative file extension depends on the target platform's skill/command format, so concrete template files would have to guess.") + the Discovery section of this tasknote.
- **PLATFORMS.md NOT added to AI-referenced docs cold-start list.** Mirrors [[CORE-154.2]]'s decision for AGENT-NEUTRALITY.md. Rare-consult contract-layer reference, not cold-start material. Documented in Phase 4 closure notes.
- **Forward-pointer language consistency preserved.** PLATFORMS.md uses identical phrasing to .3's SPEC.md:53 / README.md:108 pointers ("sibling top-level dirs", "Codex CLI / grok / Cursor" examples) so a reader arriving from those pointers immediately recognizes they're in the right place.
- **No edits to SPEC.md, MIGRATION.md, AGENTS-snippet.md.** All wiring/contract surfaces stay byte-identical; PLATFORMS.md is purely additive. SPEC.md:53's forward-pointer placed by .3 already resolves to the new doc.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface touched).
- [x] Ran lint/type-check on changed code — N/A (markdown-only). Markdown mental-pass + locator-stability grep instead (results below).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched; the viz parser at `viz/src/parser.ts` does not consume any of the changed files).

**Testing Notes:**

**Verification gates run inline** (per [[CORE-139]] / [[CORE-154.2]] / [[CORE-154.3]] precedent for prose-only changes):

1. **PLATFORMS.md cross-reference integrity** — `grep -nE 'PLATFORMS\.md' SPEC.md README.md docs/AGENT-NEUTRALITY.md docs/PLATFORMS.md docs/MIGRATION.md docs/CONVENTIONS.md docs/PHILOSOPHY.md` returns **7 hits** (2× README — `## Documents` L24 [new] + `## Repo layout` L112 [.3-placed]; 4× AGENT-NEUTRALITY.md — L19 §Principle [flipped] + L45 ledger [flipped] + L71 §"Out of scope" `.4` [flipped] + L76 §"Out of scope" `.3` [flipped]; 1× SPEC.md:53 [.3-placed]). All resolve to `docs/PLATFORMS.md`. **Forward-pointer chain intact.**
2. **`(forthcoming)` residue check** — `grep -nE 'forthcoming' docs/AGENT-NEUTRALITY.md` returns **zero hits**. All four placeholder markers cleanly flipped to closed status.
3. **PLATFORMS.md self-integrity** — 236 lines (under 300 cap per [[CORE-154.1]] Spec); 4 code fences (2 balanced pairs for the `text` scaffold trees); H1 + `Last reviewed:` header in place; Related section closes the doc.
4. **README.md `## Documents` index** — `docs/PLATFORMS.md` entry present at L24-28; 3-line description fits the surrounding pattern (matches AGENT-NEUTRALITY.md's L21-23 entry shape).
5. **Markdown mental-pass on edited bullets** — AGENT-NEUTRALITY.md L19 / L45 / L71 / L76 all read cleanly post-flip; bullet structure preserved; wikilink integrity intact ([[CORE-154.4]] now also in `Last reviewed:` line L3).
6. **Locator-stability across the wider doc set** — no edits to `SPEC/*.md`, `templates/*.md`, `claude/*`, `MIGRATION.md`, `CONVENTIONS.md`, `PHILOSOPHY.md`, `SECURITY.md`, `CONTRIBUTING.md`. All factual locators byte-identical; the only net additions to the file system are `docs/PLATFORMS.md` (new) + the README.md insertion + the AGENT-NEUTRALITY.md flips.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` (per SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals all clear → autonomous-commit inline; surfaces below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — added `docs/PLATFORMS.md` entry to `## Documents` index (L24-28) |
| `SPEC.md` | **no change** — forward-pointer at L53 placed by [[CORE-154.3]] already resolves to the new doc |
| `docs/MIGRATION.md` | **no change** — wiring-layer Claude-Code adoption guide; PLATFORMS.md references it as the today-surface adoption template but doesn't require MIGRATION updates |
| `claude/AGENTS-snippet.md` | **no change** — wiring-layer content; PLATFORMS.md references it as canonical-source worked example without requiring edits |
| `docs/CONVENTIONS.md` | **no change** — no impact; PLATFORMS.md cites it (Diátaxis quadrants) but doesn't require updates |
| `CONTRIBUTING.md` | **no change** — narrative; orthogonal |
| `SECURITY.md` | **no change** — orthogonal; PLATFORMS.md doesn't touch threat-model surface |

**Note on AI-referenced docs list (`_project/tasknote/README.md`):** Considered adding `docs/PLATFORMS.md` to the cold-start ground-truth set. Decision: **not added** — mirrors [[CORE-154.2]]'s reasoning for `docs/AGENT-NEUTRALITY.md`. PLATFORMS.md is a rare-consult contract-layer reference (read when adding platform wiring or auditing wiring structure), not cold-start material. Adding would bloat every Phase 4 sweep for ~5% relevance. If a future audit task surfaces a drift concern, re-evaluate.

**Final Summary:**

Authored `docs/PLATFORMS.md` (236 lines) documenting flowtron's two-layer model — agent-neutral contract via `AGENTS.md` paste-block vs. per-platform wiring at `claude/` — and the symmetric sibling-top-level plug-in pattern future platforms (Codex CLI, grok, Cursor) follow if a contributor ships their wiring. The doc closes the four `(forthcoming)` forward-pointers placed in `docs/AGENT-NEUTRALITY.md` by [[CORE-154.3]] and joins the README's `## Documents` index next to AGENT-NEUTRALITY.md.

**Technical detail:**

- **1 new file** — `docs/PLATFORMS.md` (236 lines, ≤300 cap per [[CORE-154.1]] Spec). 11 sections covering: rare-reader audience framing · two-layer model (contract layer / wiring layer with agent-neutrality column) · today's surface (Claude Code wiring vs. AGENTS.md-only platforms) · symmetric plug-in pattern with naming conventions + hard constraints · inline code-fence scaffold sketch · AGENTS-snippet expectations · single-source-of-truth posture per [[CORE-091]] · mandatory/optional reference table · worked example: Claude Code (17 commands, 17 skills, symlink wiring, `--fast` flag) · reader scope · out-of-scope · Related.
- **2 surgical edits across 2 files:**
  - `README.md:24-28` — `docs/PLATFORMS.md` entry inserted in `## Documents` index between AGENT-NEUTRALITY.md and CONTRIBUTING.md.
  - `docs/AGENT-NEUTRALITY.md` — 5 sub-edits: `Last reviewed:` (L3) appended `[[CORE-154.4]]`; 4× `(forthcoming)` markers flipped to closed at L19 (§Principle), L45 (ledger MIGRATION.md row), L70-71 (§"Out of scope" `.4` bullet), L76 (§"Out of scope" `.3` bullet's nested PLATFORMS.md ref).
- **2 in-child Phase 1 deferral decisions resolved:**
  - **Scaffold-shape = inline code-fence sketch** (no `templates/platform-wiring-template/` dir). Rationale: [[CORE-154.1]] Spec wording "not actually shipped; just the template" + no canonical second platform = every speculative file extension would be guessed.
  - **PLATFORMS.md NOT added to AI-referenced docs cold-start list.** Mirrors [[CORE-154.2]]'s decision for AGENT-NEUTRALITY.md — rare-consult reference, not cold-start material.
- **Cross-link integrity verified:** 7 `PLATFORMS.md` references across the doc surface, all resolving — 2× README, 4× AGENT-NEUTRALITY.md, 1× SPEC.md. Zero `(forthcoming)` residue in AGENT-NEUTRALITY.md.
- **Hand-off:** [[CORE-154.5]] re-comb can now do its Pass A multi-agent-portability lens with PLATFORMS.md as the canonical reference, plus Pass B Claude-Code-effectiveness regression check. [[CORE-154.6]] audit closes the epic.

**Archived:** 2026-05-23
