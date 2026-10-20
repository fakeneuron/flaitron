---
title: moderate-tier-rename discovery
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-EPIC-815]
---

# CORE-815.1 | moderate-tier-rename discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Scope the `CORE-EPIC-815` epic (`moderate-tier-rename`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-815.2..4` in `.flaitron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [x] Concrete child scopes for CORE-815.2 .. CORE-815.4 filed in .flaitron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-815.N reviewed — rewritten: adds the no-live-tier-`[medium]` grep and the natabula / global-CLAUDE.md hand-off recap
- [x] Phase 4 doc-drift sweep at closure: no change across every AI-referenced doc (contract edits land inside .2–.4)

## 🧩 Subtasks

- [x] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [x] Skim .flaitron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [x] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [x] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [x] Draft refined long descriptions for CORE-815.2 .. CORE-815.4; word-count each (≤50w target / 70w hard cap)
- [x] Phase 2: write the drafted child lines into .flaitron/PLAN.md under CORE-EPIC-815 with 2-space indent
- [x] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [x] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-815]] — parent epic (moderate-tier-rename)
- [[CORE-482.1]] — precedent: model-tier-recalibration discovery (added `[xheavy]`; additive rung, no adopter migration)

## 🌳 Fan-out

- **Sequential:** [[CORE-815.3]] after [[CORE-815.2]] — the viz tests encode the alias rule .2 states; [[CORE-815.4]] after [[CORE-815.3]] — the sweep closes the vocabulary and renames the cohort's own open rows last
- **Synthesis:** [[CORE-815.N]] — cohort audit + residual-`[medium]` grep + downstream hand-offs

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator invoked `/ft-open-epic` with a formed brief: `[medium]` collides with the `## Medium` priority heading (and `Medium`-severity audit tickets), so "a medium task" is ambiguous. Renaming the tier to `[moderate]` makes the two vocabularies disjoint. Vendor effort settings (`low`/`medium`/`high`/…) are a third, vendor-owned axis and stay untouched.

- [x] Read relevant source files — `SPEC.md` §"Priority levels" + §"Model field", `SPEC/model.md` (whole), `viz/src/parser.ts`, `viz/src/ui/ModelChip.tsx`, `SPEC/cue-vocabulary.md` glyph rows, `SPEC/unattended-candidacy.md` clause 1, fixture files

- [x] **Best Practices Review** — N/A: vocabulary rename; no module boundaries change (the parser already accepts any `[a-z][\w.-]*` token)

- [x] **Archive skim** — see Discovery Notes

- [x] **Drift check** — all cited paths exist at HEAD 47743724; the PLAN line matches the brief; no drift

- [x] Asked clarifying questions — resolved via AskUserQuestion; see "Resolved scoping" table below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — `touches:` omitted: deliverable is PLAN.md rows only

**Discovery Notes:**

*Shared design surface (live, excluding archives) — `[medium]` token count per file:*

- **Contract (SPEC):** `SPEC.md` (ladder block + `medium` bullet, §"Model field"), `SPEC/model.md` (10 — ladder, calibration baseline, round-up default "`[medium]` is the default tag", typical-work heading, worked case, glyph map), `SPEC/cue-vocabulary.md` (2 — glyph row + `MEDIUM` label row, already glossed "(moderate)"), `SPEC/task-line-segments.md` (2), `SPEC/post-closure.md` (2 — candidate print example), `SPEC/unattended-candidacy.md` (3 — **clause 1: `[model]` is `[light]` or `[medium]`**), `SPEC/plan-parser.md` (1 — glyph tolerance example), fixtures `canonical.md` (3), `markers.md` (1), `tolerances.md` (3, incl. `FX-122 medium glyph`), `rotated-history.md` (1).
- **Viz:** `viz/src/parser.ts` (2 — comments only; the TASK_LINE regex accepts any lowercase token, so `[moderate]` parses today), `viz/src/parser.test.ts` (22), `viz/src/ui/ModelChip.tsx` (comment "Medium and light stay glyph-free" — no code change: moderate stays glyph-free). `Priority = 'Medium'` in parser/constants is the **priority** axis — untouched.
- **Skills:** `claude/skills/ft-task/step-1.5-model-edge.md` (3, incl. "medium-tier like grok"), `ft-task/preamble.md`, `ft-open-epic`, `ft-file-task` (+ `park-mode.md`), `ft-refactor`, `ft-audit`, `ft-audit-repo`, `ft-seed-unattended` (2), `ft-release` (2). No hits under `codex/`, `cursor/`, `grok/`, `claude/AGENTS-snippet.md`.
- **Docs / templates:** `docs/PLATFORMS.md` (9 + the calibration table's **Tier column** `medium` and "≈ medium-band" cells — tier words, rename; its effort columns `low/medium/high` are vendor effort — keep), `docs/AGENT-NEUTRALITY.md` (4), `docs/CODEX-VERIFICATION.md` (3), `docs/GLOSSARY.md` (2), `docs/DOGFOOD.md` (`🧩 MEDIUM (moderate)`), `docs/AGENT-COMPAT.md` (`MEDIUM` ASCII label), `claude/CAPABILITIES.md` (3; its `low/medium/high` effort ladder and `/code-review medium` stay), `templates/PLAN.md` (2), `docs/VERSION-HISTORY.md` (3 — historical entries, keep).
- **Do not touch:** `## Medium` priority heading + `Priority` type, `Medium`-severity audit tickets, vendor effort `medium` (`model @ effort` cells, `SPEC/model.md` §"Effort vocabulary" naming `medium`/`high`/`xhigh`, `/code-review medium` in SPEC.md), archived tasknotes (93 carry `[medium]`) and `PLAN-ARCHIVE.md` — history.
- **Tools / CI:** no tier vocabulary in `tools/*.mjs` / `tools/drift-checks.sh`.

*Adopter / fleet impact:* 44 open `[medium]` rows across 17 `~/Code` PLANs (flaitron itself 3 — this epic's own rows). The token is read by the Step 1.5 gate (tier match) and by `[unattended]` candidacy clause 1 — a hard rename with no alias would turn every legacy `[medium]` row into an unknown **concrete** token (switch-or-retag block; candidacy fail). Natabula consumes the vocabulary too (`scripts/format-seed-plan.sh` recognises `heavy|medium|light|xheavy` and defaults a missing model to `[medium]`; `docs/MIGRATION.md`, `templates/BRAINSTORM-PROMPT.md`, `docs/FLEET-BRAND.md`) — natabula's remit. The operator's global `~/.claude/CLAUDE.md` §"Model Selection" names `[medium]🧩` — operator-owned.

*Archive skim:* CORE-482.1 (model-tier-recalibration) added `[xheavy]` additively — "SPEC modules ship via submodule; no per-adopter migration needed beyond normal version bump"; this rename is the first **non-additive** ladder change, so that precedent does not carry over. CORE-259 introduced the medium rung; CORE-353.3 widened the glyph set (🧩 `MEDIUM`). v6.1.0 added `[frontier]` as a minor. `SPEC/versioning.md`: a breaking change is a major with tag-message migration steps; a back-compatible change (alias kept) can be a minor.

*Resolved scoping:*

| Question | Resolution |
|---|---|
| Mode | Default flow (the free-text arg is the epic brief, not a flag) |
| Compat for existing `[medium]` rows | **Alias + migration.** `[medium]` is a permanent read-only legacy alias of `[moderate]` (gate tier match, candidacy clause 1, parser); every writer emits `[moderate]`; the release tag message carries a sed step rewriting open adopter rows on bump. Ships as a minor. |
| Prose scope | **Every tier meaning.** 🧩 `MEDIUM` cue label → `MODERATE`, "medium-tier/-band" → "moderate-tier/-band", PLATFORMS Tier column. Keep: vendor effort `medium`, `## Medium` priority, `Medium` audit severity, VERSION-HISTORY, archives. |
| Child split | `.2` [heavy] contract · `.3` [light] viz · `.4` [medium] prose sweep; sequential `.2 → .3 → .4` |
| Downstream (natabula, operator's global CLAUDE.md) | **Hand-off, out of scope.** `.N` names them in its recap; natabula files its own row; operator edits the global file. |

*Child tokens at filing:* `.4` and `.N` file as `[medium]` — `[moderate]` is not a tier until `.2` lands; `.4`'s own sweep then renames flaitron's open rows (itself and `.N` included).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-812 / CORE-482 cohort shape: 2-space nested children, `[model]` on every row, em-dash separator, no `Blocked by` on child rows (sequencing lives in `## 🌳 Fan-out`)

- [x] **Minimal refactor gate** — N/A: PLAN.md filing only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no executable surface

**Implementation Notes:**

- 3 child rows written (`.2` 49w, `.3` 39w, `.4` 36w); `.N` rewritten (45w); parent placeholder refined (≤70w). M unchanged at 3.
- Drafts shown at the 🛠️ banner carried `Blocked by [[…]]` on `.3`/`.4`; dropped at write — epic children carry no blocked-by on PLAN lines (skill Step 7; no precedent in PLAN-ARCHIVE); the Fan-out Sequential rows carry the order.
- Per-child `[model]` departs from the `[medium]` seed: `.2` `[heavy]` (contract wording + alias rule), `.3` `[light]` (mechanical). Shown beside the epic token at the 🛠️ banner; operator's go confirmed them. `.4` / `.N` uniform.
- Downstream-impact scan: rest of active PLAN is CORE-641 (typescript-7) — no downstream impact.
- `[unattended]` candidacy: no candidates — `.2` fails clause 1 (`[heavy]`); `.3` / `.4` fail clause 6 (stem predecessor `.2` / `.3` neither closed nor proposed); `.N` fails clause 6 (open siblings) and clause 3 (*operator*).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only

- [x] Ran lint/type-check on changed code — N/A: markdown-only

- [x] **Verification receipt** — N/A: no Acceptance verify commands; markdown mental-pass in Testing Notes

- [x] **External review** — N/A: the deliverable is filed PLAN lines, not a diff to grade

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Markdown mental-pass on the CORE-EPIC-815 block: 2-space child indent on every child; bold IDs intact; `[model]` on every row (category tokens ≤ `[frontier]`); no `[unattended]` tokens; shortnames ≤30 chars (max 26); em-dash separators; every description ≤50w; no trailing whitespace; Fan-out wikilinks match the filed children.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change for every entry (README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, the claude/codex/cursor/grok snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md) — the rename edits land in .2–.4

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

Filed CORE-EPIC-815 and scoped its three children: `.2` contract rename + legacy-alias rule + adopter sed migration draft, `.3` viz comments/tests, `.4` prose sweep; `.N` gains a residual-`[medium]` grep and the downstream hand-offs (natabula `format-seed-plan.sh` + docs; operator's global `~/.claude/CLAUDE.md`). Fleet impact measured at 44 open `[medium]` rows across 17 `~/Code` PLANs; the alias keeps them valid, the release-tag sed migrates them. Changed files: `.flaitron/PLAN.md`, this tasknote. `touches:` omitted (PLAN-only deliverable).

**Archived:** 2026-10-20
