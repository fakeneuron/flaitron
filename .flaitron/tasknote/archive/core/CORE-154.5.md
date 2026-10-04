---
title: portability-recomb
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-EPIC-154, CORE-154.1, CORE-154.2, CORE-154.3, CORE-154.4, CORE-154.6, CORE-132]
---

# CORE-154.5 | portability-recomb

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-154]] · [[CORE-154.2]] · [[CORE-154.3]] · [[CORE-154.4]] · [[CORE-132]]

## 🎯 Goal

Two-pass sweep: (a) re-comb the agent-neutral contract surface with a multi-agent-portability lens (extending CORE-132's user-idiosyncrasy comb) and file findings as a findings table; (b) read-through Claude-Code-effectiveness regression check on `claude/skills/ft-*` + `claude/commands/ft-*.md` to verify the post-Codex-compat work didn't regress the Claude Code experience.

## ✅ Acceptance

- [ ] **Pass A — multi-agent-portability re-comb of contract surface** complete: findings table populated (file · site · classification · recommendation) over `SPEC.md`, `SPEC/`, `templates/`, `docs/`, `README.md`, `SECURITY.md`, `CONTRIBUTING.md`. Material findings (if any) filed as PLAN.md follow-ups per [[CORE-132]] precedent; surgical-scope leaks parallel to [[CORE-154.2]]'s pattern may be fixed in-place if unambiguous.
- [ ] **Pass B — Claude-Code-effectiveness regression check** complete: read-through of every `claude/skills/ft-*/SKILL.md` (incl. lazy fragments) + `claude/commands/ft-*.md` against post-restructure contract surface; per-file verdict `no change` OR specific drift. Live invocation reserved as escalation if read-through surfaces ambiguity, per [[CORE-154.1]] Stage 3 Clarification #3.
- [ ] **AGENT-NEUTRALITY.md ledger currency** confirmed: Pass A findings classified against existing ledger entries; if an intentional surface needs a new ledger row, add it (preserves currency for future audits).
- [ ] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs".

## 🧩 Subtasks

- [ ] Pass A.1 — Targeted grep for residual Claude-Code-runtime-specific tokens in contract layer (`AskUserQuestion`, `/clear`, `/model`, `Claude harness`, etc.) post-[[CORE-154.2]] sweep
- [ ] Pass A.2 — Read-through fresh-eyes pass over the contract surface with the multi-agent-portability lens; tabulate findings (`leak` / `intentional-locator` / `intentional-narrative` / `intentional-wiring` / `tool-call-specific`)
- [ ] Pass A.3 — Disposition decision per finding: in-place fix (mirroring [[CORE-154.2]]) / new AGENT-NEUTRALITY.md ledger row / PLAN.md follow-up filing / no action
- [ ] Pass B.1 — Enumerate the 17 commands + 17 skill bodies (+ lazy fragments under `claude/skills/ft-task/`)
- [ ] Pass B.2 — Grep wiring layer for stale references to the .2/.3/.4-edited contract sites; surface any broken cross-refs
- [ ] Pass B.3 — Per-file read-through verdict; surface drift, log `no change` per file
- [ ] Phase 3 — markdown mental-pass on any landed edits + cross-link integrity grep
- [ ] Phase 4 — doc-drift sweep + PLAN.md flip + archive

## 🔗 Related

- [[CORE-EPIC-154]] — parent epic (multi-agent-portability code sweep)
- [[CORE-154.1]] — Discovery; filed this subtask + epic scope
- [[CORE-154.2]] — agent-neutral surface audit (output: `_project/AGENT-NEUTRALITY.md` ledger)
- [[CORE-154.3]] — wiring-layer status-quo lock (output: `docs/PLATFORMS.md` forward-pointers)
- [[CORE-154.4]] — authored `docs/PLATFORMS.md` two-layer model + plug-in pattern
- [[CORE-154.6]] — final audit subtask (follows this one)
- [[CORE-132]] — user-idiosyncrasy comb (the prior pass this extends with a portability lens)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (Step 1 of /ft-task)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-154.1]] Specification §CORE-154.5 locked the two-pass deliverable shape (a: portability re-comb findings table; b: read-through Claude-Code-effectiveness regression check). [[CORE-154.2]] / [[CORE-154.3]] / [[CORE-154.4]] all landed cleanly with their hand-off notes pointing at this child as the cumulative-lens auditor. Phase 1 reads confirm the contract surface is stable post-cohort and the wiring layer is byte-identical (`claude/` untouched by the epic). Two structured asks fired during Discovery to lock the disposition for the material Pass A finding and the Pass B drift finding.

- [x] Read relevant source files:
  - **Predecessor tasknotes (full read):** archives for `.1`, `.2`, `.3`, `.4` to absorb decisions, scope-locks, and hand-off notes feeding this child
  - **Contract surface:** `SPEC.md`, `SPEC/{epic,model,blocked,starter,versioning}.md`, `templates/{tasknote-template,tasknote-micro-template,tasknote-starter-template,tasknote-README,PLAN}.md`, `docs/{MIGRATION,PHILOSOPHY,CONVENTIONS,AGENT-NEUTRALITY,PLATFORMS}.md`, `README.md`, `SECURITY.md`, `CONTRIBUTING.md`
  - **Wiring surface (Pass B target):** spot-read `claude/skills/ft-flowtron/SKILL.md` (74L), `claude/skills/ft-new-project/SKILL.md` (147L), `claude/skills/ft-audit-docs/SKILL.md` (91L), `claude/skills/ft-release/SKILL.md` (251L), plus grep across the full 17-command + 17-skill + 5-lazy-fragment surface (2,749 lines total)

- [x] **Archive skim** — direct predecessors (`.1..4`) read in full; precedents [[CORE-127]] (ft-flowtron Key docs sync), [[CORE-132]] (idiosyncrasy comb shape), [[CORE-138]] / [[CORE-141]] (model-grammar generalization), [[CORE-139]] (surgical Claude→assistant), [[CORE-091]] (single-source-of-truth posture for AGENTS-snippet) all named in `.1`-`.4` Discovery Notes; no fresh archive skim needed (predecessor coverage is current and exhaustive).

- [x] **Drift check** — at HEAD 2026-05-23:
  - All `.1`-`.4` cited file paths verified live (SPEC.md / SPEC/* / README.md / docs/AGENT-NEUTRALITY.md / docs/PLATFORMS.md / SECURITY.md edits all present per recorded line ranges)
  - 17 `claude/commands/ft-*.md` + 17 `claude/skills/ft-*/` confirmed via `ls`; 4 lazy fragments under `ft-task/` + 1 under `ft-micro-task/` confirmed
  - Contract-layer grep verifies `.2`-edited tokens (`AskUserQuestion` / `Claude Code skills` / `Claude into` / `Claude to run` / `Claude Code tool allowlist`) all cleared from contract surface (zero hits except the historical-name column in `docs/AGENT-NEUTRALITY.md`)
  - No drift.

- [x] Clarifying questions — **2 structured asks resolved** at Phase 1:
  - **Q1 (Pass A disposition):** Fix `/clear` + `/model` ledger gap in-place via 1 new row in `docs/AGENT-NEUTRALITY.md` `intentional-wiring` (mirror `.2/.3/.4` pattern over surface-only documentation).
  - **Q2 (Pass B disposition):** Add both AGENT-NEUTRALITY.md + PLATFORMS.md entries to `claude/skills/ft-flowtron/SKILL.md` §"Key docs" (mirror [[CORE-127]] precedent for ft-flowtron sync).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Pass A — Multi-agent-portability re-comb findings table

Lens: re-read contract surface (`SPEC.md`, `SPEC/`, `templates/`, `docs/`, `README.md`, `SECURITY.md`, `CONTRIBUTING.md`) with fresh eyes for any operator-personal preference or Claude-Code-runtime assumption presenting as portable convention. Extends [[CORE-132]]'s 5-pass idiosyncrasy comb with a multi-agent lens specifically. Classifications: `leak` / `intentional-locator` / `intentional-narrative` / `intentional-wiring` / `intentional-recommendation` / `tool-call-specific` (per `docs/AGENT-NEUTRALITY.md` schema).

| # | File:site | Current text | Classification | Disposition |
|---|---|---|---|---|
| A1 | `SPEC.md:498-501` (§"Post-closure protocol" §3) | `/clear then /model <opus\|sonnet> then /ft-task <NEXT-ID>` + "The assistant cannot run `/clear` itself" + "The `/model` segment matches the next task's PLAN-line `[model]`" | **`intentional-wiring`** (gap in ledger — parallel to `--fast` flag entry) | **Fix in-place** (Q1): add 1 row in `docs/AGENT-NEUTRALITY.md` `Intentional Claude-specific surfaces` table for `/clear` + `/model` Claude-Code-UI commands; cite analogy to `--fast` entry (concept platform-neutral, syntax wiring-layer detail). |
| A2 | `SPEC/model.md:22` | `via /model <X> then re-invoke /ft-task` | **`intentional-wiring`** (same gap as A1; same disposition) | Folded into A1's ledger row addition (same `/model` reference). |
| A3 | `SECURITY.md:49-50` (closing harness sentence) | "The flowtron skills themselves do not implement a sandbox; the Claude Code harness is the only enforcement layer." | **`intentional-already-covered`** (the ledger entry for SECURITY.md §"Prompt injection..." Claude Code subsection covers the Claude Code harness mention, but the closing sentence sits *outside* the explicit `(Claude Code)` subsection — borderline positioning) | **No action.** The sentence's logical scope (rationale for the `.claude/settings.local.json` allowlist mitigation) ties it to the Claude Code subsection by content; ledger already covers it. Moving inside the subsection or generalizing the prose are both small alternatives — leaving as-is preserves `.2`'s reframe shape without churn. |
| A4 | `templates/PLAN.md:12-13, 29, 36-42` | `[opus]` / `[sonnet]` examples + recommended-set parenthetical | **`intentional-recommendation`** (covered by ledger per [[CORE-138]] / [[CORE-141]]) | No action. |
| A5 | `SPEC.md:142` + `SPEC/model.md:12` | "mirroring current Anthropic tiering" | **`intentional-recommendation`** (covered by ledger) | No action. |
| A6 | `README.md` §"Working in markdown vaults" (L70-103) | Obsidian / Foam / Logseq positioning section | **`intentional-positioning`** (per [[CORE-132]] / `feedback_post_closure_suggest_next`-style "positioning, not personal workflow" framing — outside-target adopters using markdown vaults) | No action — section pitches editor-agnostic optionality; the AI-driver concern is orthogonal. |

**Pass A summary:** 6 sites surveyed across the contract surface. **1 material finding** (A1+A2 fold into one disposition: ledger gap for `/clear`+`/model`). **0 surgical-scope leaks remaining** post-`.2` (the comprehensive sweep was effective). **4 confirmations** of existing ledger coverage (A4-A6 + A3-via-content-scope).

### Pass B — Claude-Code-effectiveness regression check verdicts

Lens: read-through verification of every `claude/skills/ft-*/SKILL.md` (incl. lazy fragments) + `claude/commands/ft-*.md` against post-`.2/.3/.4` contract surface. Per [[CORE-154.1]] Stage 3 Clarification #3, document `no change` per file or surface drift; live invocation reserved as escalation if read-through surfaces ambiguity. Wiring layer is byte-identical post-epic (epic edited only contract surface) — Pass B is checking whether contract-layer changes broke any wiring cross-reference.

#### Pre-flight grep verification (zero stale tokens)

| Token grepped in `claude/` | Hits | Verdict |
|---|---|---|
| `AskUserQuestion` (used as Claude Code tool name) | 41 | All hits are tool-use imperatives within skill code (correct contract-vs-wiring split per ledger) |
| `Claude Code skills` / `Claude into` / `Claude to run` / `Claude Code tool allowlist` (.2-edited contract tokens) | 0 | No stale references to pre-`.2` phrasing in wiring |
| `prose ask` (post-`.2` agent-neutral term) | 3 | `claude/commands/ft-task.md:13`, `claude/skills/ft-task/SKILL.md:132`, `claude/skills/ft-micro-task/SKILL.md:112` — all correctly use new terminology |
| `PLATFORMS.md` / `AGENT-NEUTRALITY.md` (new doc paths from `.2`/`.4`) | 0 in wiring | Expected — both docs are rare-consult contract-layer references; only the ft-flowtron `## Key docs` list is a candidate for inclusion (see B1 below) |
| `SPEC §"..."` cross-refs from wiring | Multiple | All sections referenced still exist post-epic (no section renames; `.2/.3/.4` edited section *contents* but preserved all section *names*) |

#### Per-file verdict table

| File | Verdict |
|---|---|
| `claude/commands/ft-task.md` | no change |
| `claude/commands/ft-starter-task.md` | no change |
| `claude/commands/ft-micro-task.md` | no change |
| `claude/commands/ft-file-followup.md` | no change |
| `claude/commands/ft-epic-discovery.md` | no change |
| `claude/commands/ft-close-epic.md` | no change |
| `claude/commands/ft-new-project.md` | no change |
| `claude/commands/ft-release.md` | no change |
| `claude/commands/ft-flowtron.md` | no change |
| `claude/commands/ft-stats.md` | no change |
| `claude/commands/ft-quality.md` | no change |
| `claude/commands/ft-audit.md` | no change |
| `claude/commands/ft-audit-docs.md` | no change |
| `claude/commands/ft-audit-security.md` | no change |
| `claude/commands/ft-audit-frontend.md` | no change |
| `claude/commands/ft-audit-backend.md` | no change |
| `claude/commands/ft-audit-performance.md` | no change |
| `claude/skills/ft-task/SKILL.md` (151L) | no change — uses `prose ask` correctly; AskUserQuestion as tool-name; all SPEC §refs resolve |
| `claude/skills/ft-task/step-1.5-model-edge.md` | no change |
| `claude/skills/ft-task/step-3a-promote-starter.md` | no change |
| `claude/skills/ft-task/step-3c-resume-blocked.md` | no change |
| `claude/skills/ft-micro-task/SKILL.md` (127L) | no change |
| `claude/skills/ft-micro-task/step-1.5-model-edge.md` | no change |
| `claude/skills/ft-starter-task/SKILL.md` | no change |
| `claude/skills/ft-file-followup/SKILL.md` | no change |
| `claude/skills/ft-epic-discovery/SKILL.md` (251L) | no change — `SPEC/epic.md` references all resolve; quoted SPEC text on banner-cap remains accurate paraphrase |
| `claude/skills/ft-close-epic/SKILL.md` (205L) | no change — `SPEC/epic.md` §"Audit acceptance" reference resolves |
| `claude/skills/ft-new-project/SKILL.md` | no change — references `docs/MIGRATION.md` §§ that are unchanged |
| `claude/skills/ft-release/SKILL.md` (251L) | no change — references `SPEC §"Post-closure protocol"`, `SPEC §"Task-line format"`, `SPEC §"`## Completed` archive convention"`, all unchanged |
| `claude/skills/ft-flowtron/SKILL.md` (74L) | **drift** — §"Key docs" (L62-71) lists 7 docs but is missing AGENT-NEUTRALITY.md (added by [[CORE-154.2]]) and PLATFORMS.md (added by [[CORE-154.4]]); README.md `## Documents` includes both. Mirrors the gap that motivated [[CORE-127]]. See **Finding B1**. |
| `claude/skills/ft-stats/SKILL.md` | no change |
| `claude/skills/ft-quality/SKILL.md` | no change |
| `claude/skills/ft-audit/SKILL.md` | no change |
| `claude/skills/ft-audit-docs/SKILL.md` | no change — generic scaffold; references `SPEC §"Task-line format"` which is unchanged |
| `claude/skills/ft-audit-security/SKILL.md` | no change |
| `claude/skills/ft-audit-frontend/SKILL.md` | no change |
| `claude/skills/ft-audit-backend/SKILL.md` | no change |
| `claude/skills/ft-audit-performance/SKILL.md` | no change |

**Finding B1 (sole drift)** — `claude/skills/ft-flowtron/SKILL.md` §"Key docs" misses AGENT-NEUTRALITY.md + PLATFORMS.md. Disposition (Q2): **Add both in-place** with one-line descriptions, mirroring [[CORE-127]]'s ft-flowtron-Key-docs-sync precedent.

**Pass B summary:** 34 wiring files surveyed (+ 5 lazy fragments). **1 drift surfaced** (B1). **33 `no change` verdicts.** No wiring file was structurally broken by `.2/.3/.4`'s contract-layer edits — the contract-vs-wiring split per [[CORE-154.1]] Constitution principle 1 held cleanly. The post-restructure Claude Code experience is intact: every `/ft-*` slash command continues to resolve and drive its workflow; AGENTS-snippet untouched; symlinks unchanged; banner-block UX preserved.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — direct precedents: [[CORE-154.2]] for "add a new row to `docs/AGENT-NEUTRALITY.md` Intentional-surfaces table + bump Last-reviewed line" shape (the row addition mirrors the existing `--fast` flag entry's `intentional-wiring` framing — concept platform-neutral, syntax wiring-detail, SPEC documents inline for discoverability); [[CORE-127]] for "ft-flowtron Key docs sync after a contract-layer doc lands" shape (added SECURITY.md in 2026-05-20 after a similar gap). Both edits extend existing patterns; no new shape introduced.
- [x] Implemented the minimal solution — 2 in-place edits across 2 files in a single sequential batch
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface touched)

**Implementation Notes:**

**Files changed (2):**

| File | Edit |
|---|---|
| `docs/AGENT-NEUTRALITY.md` | 2 sub-edits: (1) `Last reviewed:` line (L3) appended `[[CORE-154.5]]`; (2) §"Intentional Claude-specific surfaces" table — new row inserted between the existing `--fast` row and the `SPEC/epic.md` row, covering `/clear` + `/model` Claude-Code-UI command references at SPEC.md:498-501 (§"Post-closure protocol" §3) + SPEC/model.md:22 (§"Model field" Step 1.5 mismatch). Row classification: `intentional-wiring`; rationale parallels the `--fast` entry's "concept platform-neutral, syntax wiring-detail" framing. |
| `claude/skills/ft-flowtron/SKILL.md` | §"Key docs" list (L62-71) — 2 new entries inserted between `docs/CONVENTIONS.md` and `CONTRIBUTING.md`: `docs/AGENT-NEUTRALITY.md` (1 line, mirrors README.md `## Documents` description) + `docs/PLATFORMS.md` (1 line, mirrors README.md `## Documents` description). Brings the info screen back in sync with the README's `## Documents` index. |

**Key decisions encoded:**

- **One consolidated ledger row** for `/clear` + `/model` (3 sites total) instead of two sibling rows. Mirrors the `--fast` row's pattern (5 sites, 1 row); keeps the table concise.
- **Insertion position** in AGENT-NEUTRALITY.md table: between `--fast` row and SPEC/epic.md row. Conceptually adjacent to `--fast` (both = operator-UX wiring documented inline in SPEC for discoverability); structurally sits at the SPEC.md / SPEC/* boundary because the new row spans both.
- **Insertion position** in ft-flowtron Key docs: between CONVENTIONS.md and CONTRIBUTING.md. Mirrors README.md's `## Documents` order (SPEC → PHILOSOPHY → MIGRATION → CONVENTIONS → AGENT-NEUTRALITY → PLATFORMS → CONTRIBUTING → SECURITY).
- **Description copy** for the two new ft-flowtron entries: lifted directly from README.md's `## Documents` index for parity. Avoids two slightly-different one-line descriptions of the same docs drifting.
- **No edits to SPEC.md, SPEC/model.md, or SECURITY.md.** Pass A Findings A1-A6 are all surface-only: A1+A2 are gaps in the ledger (the documentation OF those surfaces), not problems with the surfaces themselves; A3-A6 are confirmed `no action` per ledger coverage.
- **No edits to PLAN.md follow-ups.** Zero material findings warrant a follow-up filing — Pass A's only material item folded into the in-place ledger row; Pass B's only drift folded into the in-place ft-flowtron edit. [[CORE-154.6]] audit picks up cumulative slice-local staleness if any surfaces in the doc-drift sweep.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface).
- [x] Ran lint/type-check on changed code — N/A (markdown-only). Markdown mental-pass + verification greps instead (results below).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched; the viz parser at `viz/src/parser.ts` does not consume any of the changed files).

**Testing Notes:**

**Verification gates run inline** (per [[CORE-139]] / [[CORE-154.2]] / [[CORE-154.3]] / [[CORE-154.4]] precedent for prose-only changes):

1. **AGENT-NEUTRALITY.md row-addition integrity** — `grep -nE "/clear|/model" docs/AGENT-NEUTRALITY.md` returns the new row content at the correct insertion point; ledger schema preserved (4 columns: File · Section/context · Reference · Why it stays); no other rows touched.
2. **AGENT-NEUTRALITY.md Last-reviewed line** — `grep -n "Last reviewed" docs/AGENT-NEUTRALITY.md` confirms `[[CORE-154.5]]` appended (4 tasks now in authors list); date stays `2026-05-23`.
3. **ft-flowtron Key docs sync** — `grep -nE "AGENT-NEUTRALITY|PLATFORMS" claude/skills/ft-flowtron/SKILL.md` returns 2 hits (one per new entry), at expected positions between CONVENTIONS.md and CONTRIBUTING.md. README.md `## Documents` and ft-flowtron Key docs now both list 8 entries each in matching order.
4. **No drift in contract surface** — all `claude/*` files except ft-flowtron/SKILL.md remain byte-identical; `git status` shows exactly 3 modified files (`docs/AGENT-NEUTRALITY.md`, `claude/skills/ft-flowtron/SKILL.md`, plus the new `_project/tasknote/CORE-154.5.md` about to archive at closure).
5. **Wikilink integrity** — `[[CORE-154.5]]` in Last-reviewed line targets THIS task (will be resolvable post-archive at `_project/tasknote/archive/core/CORE-154.5.md`); `[[CORE-127]]` reference in Implementation Notes targets archived precedent (verified live); `[[CORE-154.6]]` reference (audit) is a forward-ref that resolves once the audit fires.
6. **Markdown mental-pass** — both edited files parse as well-formed markdown. AGENT-NEUTRALITY.md table cell uses inline-code spans for `/clear` and `/model` correctly (backtick-escaped); ft-flowtron Key docs entries use the same `- \`path\` — description` shape as surrounding entries.

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` in-place under `CORE-EPIC-154` parent (subtask nest preserved per `SPEC/epic.md` — parent + cohort move to `## Completed` only at audit close `.6`); tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals all clear → autonomous-commit inline; surfaces below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |

**Note on edited files vs. AI-referenced docs list.** The 2 edits in this task — `docs/AGENT-NEUTRALITY.md` and `claude/skills/ft-flowtron/SKILL.md` — are deliberately NOT in the cold-start AI-referenced docs list. Per [[CORE-154.2]] / [[CORE-154.4]] decisions, `docs/AGENT-NEUTRALITY.md` and `docs/PLATFORMS.md` are rare-consult contract-layer references; per `_project/tasknote/README.md`'s closing note, `claude/skills/*/SKILL.md` files are loaded on demand by skill stubs. The doc-drift sweep above accordingly returns clean — both edits sit outside the canonical sweep target.

**Final Summary:**

Closed the multi-agent-portability re-comb: Pass A audit-shaped sweep of the contract surface confirmed [[CORE-154.2]]'s leak fixes were complete (zero residual surgical-scope leaks) and surfaced one ledger-currency gap (`/clear` + `/model` Claude-Code-UI commands documented inline in SPEC but not in the AGENT-NEUTRALITY.md ledger); Pass B Claude-Code-effectiveness regression check across all 17 commands + 17 skills + 5 lazy fragments confirmed no wiring file was structurally broken by the contract-layer edits (`/ft-*` slash commands all resolve, AGENTS-snippet untouched, symlinks unchanged, banner-block UX preserved) and surfaced one drift (ft-flowtron `## Key docs` list missing the 2 new contract-layer docs). Both findings disposed via in-place fixes mirroring [[CORE-154.2]] / [[CORE-127]] precedents.

**Technical detail:**

- **2 in-place edits across 2 files:**
  - `docs/AGENT-NEUTRALITY.md` — `Last reviewed:` (L3) appended `[[CORE-154.5]]`; new `intentional-wiring` row inserted (L38) into §"Intentional Claude-specific surfaces" table covering `/clear` + `/model` Claude-Code-UI commands at SPEC.md:498-501 + SPEC/model.md:22 (3 sites total, 1 consolidated row mirroring the `--fast` entry's multi-site shape).
  - `claude/skills/ft-flowtron/SKILL.md` — `## Key docs` list (L68-69) gains `docs/AGENT-NEUTRALITY.md` + `docs/PLATFORMS.md` entries between `docs/CONVENTIONS.md` and `CONTRIBUTING.md`, mirroring README.md `## Documents` order and descriptions. Brings the info screen from 7 entries to 9, in sync with README.
- **Pass A findings table:** 6 sites surveyed (4 confirmed-intentional via existing ledger, 1 material gap fixed, 1 borderline-positioning left as-is). Zero surgical-scope leaks remaining post-`.2` sweep.
- **Pass B verdicts table:** 34 wiring files surveyed + 5 lazy fragments. 33 `no change` + 1 drift (B1, fixed in-place). Wiring layer is byte-identical post-epic except for the ft-flowtron Key docs sync edit.
- **2 structured-ask dispositions resolved at Phase 1:** Q1 (Pass A) → fix in-place via 1 ledger row addition; Q2 (Pass B) → add both AGENT-NEUTRALITY.md + PLATFORMS.md to ft-flowtron Key docs.
- **Zero PLAN.md follow-ups filed.** All material findings folded into the 2 in-place edits; `.6` audit will pick up any cumulative slice-local staleness in its doc-drift sweep.
- **PLAN.md flipped in-place** — `.5` line at line 19 → stub `Completed 2026-05-23.` form; line stays nested under `CORE-EPIC-154` parent per `SPEC/epic.md` epic-lifecycle convention. Parent + cohort move to `## Completed` only when `.6` audit closes via `/ft-close-epic`.
- **Closure-bundle signal check:** zero frontend files touched · zero privileged-ops paths touched (no migrations, auth, secrets, integrations, webhooks) · no perf-sensitive narrative (markdown-only ledger row + Key-docs list extension) → **autonomous-commit branch fires**; per SPEC §"Conditional skip rule" the 📦 banner does not fire on closure.
- **Hand-off:** [[CORE-154.6]] audit can now close the epic. The audit's fixed doc-drift sweep acceptance line will re-walk the 7 AI-referenced docs; `.5` left them all `no change`. The cumulative cohort-level review remains audit's deliverable.

**Archived:** 2026-05-23
