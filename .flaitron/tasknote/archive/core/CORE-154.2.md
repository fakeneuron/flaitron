---
title: agent-neutral-surface-audit
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-EPIC-154, CORE-154.1, CORE-132, CORE-138, CORE-139]
---

# CORE-154.2 | agent-neutral-surface-audit

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-05-23 · 🔗 [[CORE-EPIC-154]] · [[CORE-154.1]] · [[CORE-132]] · [[CORE-138]] · [[CORE-139]]

## 🎯 Goal

Inventory Claude-Code-specific assumptions leaking into flowtron's agent-neutral contract layer (SPEC.md, SPEC/, templates/, docs/, README.md, SECURITY.md), fix the surgical-scope leaks, and record intentional Claude-specific surfaces as a durable ledger at `docs/AGENT-NEUTRALITY.md`.

## ✅ Acceptance

- [x] Inventory table populated in this tasknote (file · site · current text · classification: `leak` / `intentional-locator` / `tool-call-specific` / `intentional-narrative`)
- [x] **Surgical-scope leak fixes** applied:
  - `SPEC.md:334, 343` — `AskUserQuestion` → `structured ask` (paired with existing `prose ask`)
  - `SPEC/epic.md:64` — same
  - `SPEC/model.md:25` — same
  - `SECURITY.md:19` — scope note added ("Flowtron's bundled skills — currently Claude Code-only")
  - `SECURITY.md:25, 28` — Claude → the assistant (mechanical)
  - `SECURITY.md:29, 36, 42` — reframe `.claude/settings.local.json` allowlist + Claude Code harness as clearly-scoped Claude Code-specific guidance subsection
- [x] **`--fast` references** in SPEC.md unchanged (operator UX documentation; recorded in ledger as wiring-implementation reference)
- [x] **New `docs/AGENT-NEUTRALITY.md`** authored with principle statement + intentional-surface ledger table
- [x] **README.md `## Documents`** index updated to link `docs/AGENT-NEUTRALITY.md` (between CONVENTIONS.md and CONTRIBUTING.md)
- [x] Final grep sweep verifies no surgical-scope leak remains in contract layer
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Author `docs/AGENT-NEUTRALITY.md` (principle + ledger table; ~93 lines; section-named refs for drift resistance)
- [x] `SPEC.md:334, 343` — substitute `AskUserQuestion` → `structured ask` (2 sites)
- [x] `SPEC/epic.md:64` — substitute `AskUserQuestion` → `structured-ask`
- [x] `SPEC/model.md:25` — substitute `AskUserQuestion` → `a structured ask`
- [x] `SECURITY.md` §"Prompt injection via user-authored markdown" — scope note at line 19 + Claude→assistant mechanical at 25, 28
- [x] `SECURITY.md` §"Prompt injection via user-authored markdown" — reframe lines 29, 36, 42 as clearly-scoped Claude Code-specific mitigations subsection
- [x] `README.md:20–21` — insert AGENT-NEUTRALITY.md link in `## Documents` index
- [x] Final grep sweep: zero hits for `AskUserQuestion` / `Claude Code skills` / `Claude into` / `Claude to run` / `Claude Code tool allowlist` across contract layer
- [x] Phase 3: markdown mental-pass + repo-wide cross-ref sanity check
- [x] Phase 4: doc-drift sweep + PLAN.md flip + archive

## 🔗 Related

- [[CORE-EPIC-154]] — parent epic (multi-agent-portability code sweep)
- [[CORE-154.1]] — discovery subtask that filed this work
- [[CORE-132]] — user-idiosyncrasy comb (prior sweep this extends with multi-agent lens)
- [[CORE-138]] — spec-model-grammar-anthropic-lock (prior generalization of `[model]` grammar)
- [[CORE-139]] — spec-clear-claude-specific (prior surgical Claude→assistant fix at SPEC:499)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md (Step 1 of /ft-task)
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-154.1's Specification (Stage 2) already locked the deliverable shape for this child: inventory + classification + targeted leak fix + intentional-surface ledger. The .1 Stage 3 Clarifications resolved the four load-bearing scoping questions for the epic; only one .2-specific clarification was deferred (ledger location), now resolved at this child's Phase 1. Builds on [[CORE-132]] (Pass 4 swept "Model & assistant assumptions" with a different lens), [[CORE-138]] (generalized `[model]` grammar), [[CORE-139]] (Claude→assistant at SPEC:499) — the multi-agent-portability lens here surfaces leaks those passes did not flag.

- [x] Read relevant source files:
  - `SPEC.md` (full read — confirmed 4 AskUserQuestion sites, 5 `--fast` sites, all `claude/` locators + `/ft-*` references)
  - `SPEC/epic.md`, `SPEC/model.md`, `SPEC/blocked.md`, `SPEC/starter.md`, `SPEC/versioning.md` — confirmed 1 AskUserQuestion site in `epic.md`, 1 in `model.md`
  - `templates/PLAN.md`, `templates/tasknote-template.md`, `templates/tasknote-micro-template.md`, `templates/tasknote-starter-template.md`, `templates/tasknote-README.md` — no surgical-scope leaks; intentional-locator references for ledger
  - `docs/MIGRATION.md`, `docs/PHILOSOPHY.md`, `docs/CONVENTIONS.md` — MIGRATION is wiring-layer guide (intentional); PHILOSOPHY narrative defended by [[CORE-132]]; CONVENTIONS has no Claude tokens
  - `README.md` — `## Documents` index at L10–25; insertion point identified (between CONVENTIONS.md L20 and CONTRIBUTING.md L21)
  - `SECURITY.md` — full read; threat-model framing is partially multi-agent (concept) + partially Claude Code-only (mitigations)
  - `claude/AGENTS-snippet.md` — explicitly OUT of this task's scope (wiring layer); flagged for [[CORE-154.3]] / [[CORE-154.4]]
  - `_project/tasknote/README.md` — AI-referenced docs list (Phase 4 sweep target)

- [x] **Archive skim** — `_project/tasknote/archive/core/` for `[model]` grammar / Claude-specific / user-idiosyncrasy precedents:
  - [[CORE-132]] (2026-05-22) — Pass 4 ("Model & assistant assumptions") direct precedent; defended SECURITY.md's Claude framing inside the user-flavored-vs-adopter-shareable lens. This task's multi-agent-portability lens reframes SECURITY.md's threat model (concept is multi-agent; only mitigations stay Claude Code-specific). Defense from CORE-132 is NOT undone — the lens differs.
  - [[CORE-138]] (2026-05-22) — generalized `[model]` grammar; recommended-set framing is preserved as intentional ledger entry.
  - [[CORE-139]] (2026-05-22) — surgical Claude→assistant at SPEC:499; same pattern applied at 4 SECURITY.md sites in this task.
  - [[CORE-129]] (2026-05-22) — AGENTS.md migration; established multi-agent paste-destination posture (Claude Code, Codex CLI, Cursor, Amp, Aider).
  - [[CORE-141]] (2026-05-23) — skill-prompts model-token generalization; loosened SKILL prompts to "recommended" framing.

- [x] **Drift check** — all cited file paths and line numbers verified at HEAD 2026-05-23:
  - `SPEC.md:53, 77, 89, 307, 334, 343, 351–355, 390, 456, 535` all read as expected
  - `SPEC/epic.md:64`, `SPEC/model.md:17, 25` verified
  - `SECURITY.md:19, 25, 28, 29, 36, 42` verified
  - `README.md:10–25` `## Documents` block verified; insertion point at L20–21 confirmed
  - `claude/AGENTS-snippet.md` — flagged OUT of scope (wiring layer per Constitution principle 1)
  - No drift.

- [x] Asked clarifying questions — **2 questions resolved via AskUserQuestion** at Phase 1:
  - Q1 (Ledger location): **New `docs/AGENT-NEUTRALITY.md`** — sibling doc to MIGRATION/PHILOSOPHY/CONVENTIONS; surfaces in README's `## Documents` index. Lands now, no waiting on CORE-154.4.
  - Q2 (Fix scope aggressiveness): **Surgical** — generalize `AskUserQuestion` → `structured ask` (4 sites); keep `--fast` SPEC references as-is (operator UX doc); light touch on SECURITY.md (scope note + mechanical Claude→assistant where appropriate; keep `.claude/settings.local.json` as clearly-scoped subsection).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Full inventory (contract-layer scope: SPEC.md, SPEC/, templates/, docs/, README.md, SECURITY.md)

#### LEAKS — Surgical-scope fixes (8 sites across 4 files)

| # | File:line | Current text | Classification | Fix |
|---|---|---|---|---|
| L1 | `SPEC.md:334` | `zero AskUserQuestion calls and zero prose asks` | tool-call-specific | `zero structured asks and zero prose asks` |
| L2 | `SPEC.md:343` | `AskUserQuestion fired, prose asks reshaped scope` | tool-call-specific | `structured asks fired, prose asks reshaped scope` |
| L3 | `SPEC/epic.md:64` | `with AskUserQuestion review-and-confirm gates` | tool-call-specific | `with structured-ask review-and-confirm gates` |
| L4 | `SPEC/model.md:25` | `AskUserQuestion at /ft-task entry, before any scaffolding work.` | tool-call-specific | `a structured ask at /ft-task entry, before any scaffolding work.` |
| L6 | `SECURITY.md:19` | `Flowtron's Claude Code skills (...)` | leak | Add scope note: `Flowtron's bundled skills — currently Claude Code-only (/ft-task, ...) — read content the user authored. The threat model below applies to any AI assistant reading the same files; the mitigations name Claude Code surfaces because that's what flowtron ships today.` |
| L7a | `SECURITY.md:25` | `steer Claude into running` | leak | `steer the assistant into running` |
| L7b | `SECURITY.md:28` | `Claude to run a curl` | leak | `the assistant to run a curl` |
| L8 | `SECURITY.md:29, 36, 42` | `Claude Code tool allowlist` / `.claude/settings.local.json` / `Claude Code harness` | leak (positioning) | Reframe paragraph 29 + bullets 31–43 as Claude-Code-specific **Adopter mitigations (Claude Code)** subsection; concept of "narrow tool allowlist" stated agent-neutrally first, Claude Code instance follows. |

#### INTENTIONAL — Ledger entries (load-bearing; stay as-is)

| File:section | Reference | Classification | Why it stays |
|---|---|---|---|
| `SPEC.md` §"Working in the flowtron repo itself" | `claude/` — Claude Code commands + skills | intentional-locator | Wiring-layer directory name; factual statement (Constitution principle 1). |
| `SPEC.md` §"Lazy SPEC module frontmatter" | `claude/skills/ft-task/SKILL.md` dispatch | intentional-locator | Cross-ref to dispatch-logic location. |
| `SPEC.md` §"Skill namespace" | `.claude/` adopter dir | intentional-locator | Adopter Claude Code wiring location. |
| `SPEC.md` §"When to use a tasknote" | `/ft-task`, etc. (slash-command names) | intentional-locator | Canonical flowtron skill names. |
| `SPEC.md` §"Operator-gate cues" + §"📝 Phase 1: Discovery" + §"🧪 Phase 3: Testing & Linting" + §"Conditional skip rule" | `--fast` / `-f` (5 sites total) | intentional-wiring | Operator force-skip flag implementation in the Claude Code skill bundle. Concept (operator force-skip) is platform-neutral; flag syntax is wiring-layer detail. SPEC documents the operator UX inline rather than punting to SKILL.md for density. |
| `SPEC/epic.md` L55–57 | `claude/skills/ft-epic-discovery/`, `claude/skills/ft-close-epic/`, `claude/skills/ft-new-project/SKILL.md` | intentional-locator | Path facts. |
| `SPEC/model.md` L17 | `claude/skills/ft-task/SKILL.md` | intentional-locator | Path fact. |
| `SPEC/model.md` L11–12 | `opus | sonnet` recommended set + Anthropic-tier note | intentional-recommendation | Per [[CORE-138]] — recommended set, not lock. |
| `templates/tasknote-README.md` L75 | `AGENTS.md` read by Claude Code, Codex CLI, Cursor, Amp, Aider | not-claude | Multi-agent paste-destination — agent-neutral framing. |
| `templates/tasknote-README.md` L76 | `CLAUDE.md` — optional Claude-specific directives | intentional-claude-explicit | Adopter agents skip the entry; explicit carve-out. |
| `templates/tasknote-micro-template.md` L29 | `claude/skills/ft-micro-task/SKILL.md` | intentional-locator | Path fact. |
| `templates/PLAN.md` L12–13, 29, 36 | `[opus]`, `[sonnet]` example tokens + recommended-set parenthetical | intentional-recommendation | Per [[CORE-138]]. |
| `docs/MIGRATION.md` §1.2, §1.3, §3, troubleshooting | `.claude/commands/...`, `.claude/skills/...`, `claude/AGENTS-snippet.md`, slash-command verification commands, "fresh Claude Code session" references | intentional-wiring | MIGRATION IS the Claude Code adoption guide today. Future platforms get their own adoption section if/when wiring lands ([[CORE-154.4]] forthcoming `docs/PLATFORMS.md`). |
| `docs/PHILOSOPHY.md` L7, 13, 21, 41 | `Claude Code` historical narrative + "Claude can read markdown" | intentional-narrative | Per [[CORE-132]] defense — file's role is personal narrative; voice IS the deliverable. |
| `README.md` L105 | `claude/` — Claude Code skills + slash commands | intentional-locator | Factual repo-layout description. |
| `SECURITY.md` L36 | `.claude/settings.local.json` | intentional-claude-explicit | Claude Code-specific mitigation; stays in clearly-scoped subsection after L8 fix. |

#### NEAR-NEIGHBOR (out of this task's PLAN.md scope; flagged for awareness only)

| File:line | Note |
|---|---|
| `CONTRIBUTING.md:8` | `Most edits land via Claude Code sessions, including the tasknotes that document them.` — historical narrative similar to PHILOSOPHY.md; defended by [[CORE-132]] under "first-person CONTRIBUTING convention". Not in this task's PLAN.md scope (scope is SPEC/SPEC/templates/docs/README/SECURITY only). If user wants generalization, file as a follow-up; default = leave as-is per CORE-132. |
| `claude/AGENTS-snippet.md` (entire file) | Lives under `claude/` (wiring layer). The paste-block (lines 9–21) contains slash-command references — examined by [[CORE-154.3]] (structural decision) and [[CORE-154.4]] (`docs/PLATFORMS.md` pattern doc). Explicitly out of this task's scope. |

### Tool-call terminology pair (lands in AGENT-NEUTRALITY.md)

The ledger documents the canonical naming for the assistant-asks-user operation:

| Concept | Prior name (Claude Code tool) | Canonical name in SPEC | Notes |
|---|---|---|---|
| Multi-option structured user question | `AskUserQuestion` | **structured ask** | Adopter agents implement via their own primitives. |
| Free-prose user question | (always was) | **prose ask** | Unchanged. |

The pair (structured / prose) describes the operation; the tool name is wiring-implementation detail.

### Out-of-scope explicitly re-affirmed (per Constitution principle 1 + CORE-154.1 spec)

- **AGENTS-snippet.md content audit** — wiring layer per Constitution; handled by [[CORE-154.3]] / [[CORE-154.4]].
- **Renaming `claude/` directory** — structural decision; [[CORE-154.3]] starts from status-quo bias (Stage 3 Clarification #1).
- **Authoring platform-plug-in pattern for Codex/grok/Cursor** — [[CORE-154.4]] deliverable.
- **Re-comb after `.2/.3/.4` land** — [[CORE-154.5]] deliverable.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — direct precedent in [[CORE-139]] (2026-05-22) which executed an identical-shape surgical Claude→assistant fix at SPEC.md:499. Same edit pattern (in-place prose substitution; no functional change) applied here to the 4 AskUserQuestion sites and 4 SECURITY.md sites. New shape: `docs/AGENT-NEUTRALITY.md` ledger doc — modeled after the structure of [[CORE-132]]'s findings table but landing as a durable contract-layer reference rather than transient audit output. No new code shape; markdown-only.
- [x] Implemented the minimal solution — 7 edits + 1 new file landed in a single parallel batch.
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface touched).

**Implementation Notes:**

**Files changed (7) + new (1):**

| File | Change |
|---|---|
| `SPEC.md` | `:334` `AskUserQuestion calls` → `structured asks` + `:343` `AskUserQuestion fired` → `structured asks fired` (2 edits) |
| `SPEC/epic.md` | `:64` `AskUserQuestion review-and-confirm gates` → `structured-ask review-and-confirm gates` |
| `SPEC/model.md` | `:24-25` `via AskUserQuestion` → `via a structured ask` |
| `SECURITY.md` | §"Prompt injection ..." opening paragraph reframed with scope note ("Flowtron's bundled skills — currently Claude Code-only ... The threat model below applies to any AI assistant reading the same files"); `Claude` → `the assistant` at 2 sites; mitigations split into two subsections ("any AI assistant" / "Claude Code") with the `.claude/settings.local.json` allowlist as the Claude-Code-specific bullet; sandbox closing sentence preserved |
| `README.md` | `## Documents` index — inserted `docs/AGENT-NEUTRALITY.md` entry between CONVENTIONS.md and CONTRIBUTING.md |
| `docs/AGENT-NEUTRALITY.md` | **NEW** — ~93 lines. Sections: Principle (agent-neutral contract layer vs. Claude-Code-specific wiring layer) + Intentional Claude-specific surfaces table (17 rows, section-named refs for drift resistance) + Tool-call-specific terminology pair (`structured ask` / `prose ask`) + Out-of-scope (CORE-154.3/.4 forward-refs + near-neighbor surfaces) |

**Key decisions encoded in the ledger:**

- `--fast` SPEC references stay verbatim (operator UX documentation; ledger entry documents *why*).
- `.claude/settings.local.json` stays in SECURITY.md but inside an explicit "Adopter mitigations (Claude Code)" subsection.
- `CONTRIBUTING.md:8` near-neighbor finding noted in ledger but not edited (out of PLAN.md scope; CORE-132 defense applies).
- `claude/AGENTS-snippet.md` is wiring-layer per Constitution principle 1; explicitly handed off to [[CORE-154.3]] / [[CORE-154.4]].

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only; no executable surface).
- [x] Ran lint/type-check on changed code — N/A (markdown-only). Markdown mental-pass: fence-balance check ran across all 6 edited files (SPEC.md 18 fences balanced, others 0 fences; SECURITY.md/SPEC/epic.md/SPEC/model.md/docs/AGENT-NEUTRALITY.md prose-only).
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface touched; viz parser unaffected — AGENT-NEUTRALITY.md lives at `docs/` which viz does not render, and SPEC/SECURITY/README prose changes don't intersect with parser code paths).

**Testing Notes:**

**Verification gates run inline** (per [[CORE-139]] precedent for prose-only changes):

1. **Leak-residue grep across contract layer** — `grep -nE '(AskUserQuestion|Claude Code skills|Claude into|Claude to run|Claude Code tool allowlist)' SPEC.md SPEC/*.md SECURITY.md` returns zero hits. Only remaining `AskUserQuestion` mention in the contract layer is inside `docs/AGENT-NEUTRALITY.md`'s historical-name column — intentional ledger content.
2. **Structured-ask substitution verification** — all 4 substitution sites confirmed: SPEC.md:334 (`zero structured asks`), SPEC.md:343 (`structured asks fired`), SPEC/epic.md:64 (`structured-ask review-and-confirm gates`), SPEC/model.md:25 (`structured ask at /ft-task entry`).
3. **SECURITY.md scope note verification** — `Flowtron's bundled skills — currently Claude Code-only` at L19; `any AI assistant` framing at L23; `the assistant` at L28, L31; mitigations subsections `(any AI assistant)` at L35 and `(Claude Code)` at L43.
4. **README.md docs index verification** — `docs/AGENT-NEUTRALITY.md` entry present at L21 with one-line summary.
5. **Markdown fence balance** — SPEC.md 18 fences (balanced); SECURITY.md/SPEC/epic.md/SPEC/model.md/AGENT-NEUTRALITY.md no fences (clean prose); README.md 6 fences (balanced).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` (per SPEC §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (signals all clear → autonomous-commit inline; surfaces below)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | **updated** — added `docs/AGENT-NEUTRALITY.md` entry to `## Documents` index (L21) |
| `SPEC.md` | **updated** — `AskUserQuestion` → `structured ask` at 2 sites (L334, L343) |
| `docs/MIGRATION.md` | **no change** — wiring-layer content; intentional per ledger |
| `claude/AGENTS-snippet.md` | **no change** — wiring-layer content; explicitly out of scope per Constitution |
| `docs/CONVENTIONS.md` | **no change** — no Claude tokens; clean |
| `CONTRIBUTING.md` | **no change** — narrative; out of PLAN.md scope; noted in ledger as near-neighbor |
| `SECURITY.md` | **updated** — scope note + Claude→assistant at 2 sites + mitigations subsection reframe |

**Note on AI-referenced docs list (`_project/tasknote/README.md`):** Considered adding `docs/AGENT-NEUTRALITY.md` to the cold-start ground-truth set. Decision: **not added** — it's a reference/audit-time ledger consulted for contract-layer-touching tasks, not cold-start material. Adding would bloat every Phase 4 sweep for ~5% relevance. If a future audit task surfaces a drift concern, re-evaluate.

**Final Summary:**

Inventoried flowtron's contract layer (SPEC.md, SPEC/, templates/, docs/, README.md, SECURITY.md) for Claude-Code-specific assumptions through a multi-agent-portability lens, applied 8 surgical-scope leak fixes across 4 files, and authored `docs/AGENT-NEUTRALITY.md` as the durable ledger of intentional Claude-specific surfaces.

**Technical detail:**

- **8 leak fixes** across 4 files:
  - SPEC.md:334, 343 — `AskUserQuestion calls/fired` → `structured asks` (paired with existing `prose ask` term).
  - SPEC/epic.md:64 — `AskUserQuestion review-and-confirm gates` → `structured-ask`.
  - SPEC/model.md:25 — `via AskUserQuestion` → `via a structured ask`.
  - SECURITY.md §"Prompt injection ..." — scope note added ("Flowtron's bundled skills — currently Claude Code-only ... the threat model below applies to any AI assistant"); 2× Claude→the assistant mechanical; mitigations subsection split into `(any AI assistant)` (2 bullets) + `(Claude Code)` (1 bullet preserving `.claude/settings.local.json` allowlist); sandbox closing sentence preserved.
- **1 new file** — `docs/AGENT-NEUTRALITY.md` (~93 lines):
  - **Principle** section locks the contract-layer / wiring-layer split per Constitution principle 1 of [[CORE-154.1]].
  - **Intentional Claude-specific surfaces** table (17 rows) — section-named refs for drift resistance; covers SPEC.md `claude/` locators + `/ft-*` references + `--fast` flag, SPEC/epic.md + SPEC/model.md path facts + `[opus|sonnet]` recommended-set per [[CORE-138]], templates `CLAUDE.md` carve-out + `[model]` examples, MIGRATION.md wiring-layer guide, PHILOSOPHY.md historical narrative per [[CORE-132]], README.md repo-layout, SECURITY.md `.claude/settings.local.json` Claude Code-specific mitigation.
  - **Tool-call-specific terminology** table — canonical `structured ask` / `prose ask` pair (renamed from `AskUserQuestion`); operation, not tool.
  - **Out-of-scope** section — forward-refs to [[CORE-154.3]] (wiring-layer structure), [[CORE-154.4]] (`docs/PLATFORMS.md` plug-in pattern), [[CORE-154.6]] (audit); near-neighbor notes for CONTRIBUTING.md:8 + claude/AGENTS-snippet.md (both wiring-layer per Constitution).
- **1 link added** — README.md `## Documents` index gains `docs/AGENT-NEUTRALITY.md` entry between CONVENTIONS.md and CONTRIBUTING.md.
- **Verification**: leak-residue grep returns zero hits in contract layer (`SPEC.md`, `SPEC/*.md`, `SECURITY.md`); structured-ask substitutions verified at all 4 sites; SECURITY.md scope note + subsection reframe verified; README.md docs index entry present; markdown fences balanced across all 6 edited files.
- **Decisions encoded**:
  - **Q1 (ledger location)** = new `docs/AGENT-NEUTRALITY.md` sibling doc (chosen over: SPEC.md subsection / defer to CORE-154.4 / tasknote-only).
  - **Q2 (fix aggressiveness)** = surgical (chosen over: aggressive --fast rewrite / minimal AskUserQuestion-only).
  - `--fast` SPEC references kept verbatim — operator UX documentation; ledger entry documents why.
  - `.claude/settings.local.json` kept in SECURITY.md but inside explicit Claude-Code subsection.
  - Out-of-task-scope candidates (`CONTRIBUTING.md:8`, `claude/AGENTS-snippet.md`) noted in ledger; not edited.
- **Hand-off**: ledger sits durable on disk for [[CORE-154.3]] (wiring-layer structure decision) and [[CORE-154.5]] (re-comb) to consult; [[CORE-154.4]] (`docs/PLATFORMS.md`) can cite or absorb AGENT-NEUTRALITY.md as platforms-doc evolves.

**Archived:** 2026-05-23
