---
title: external-and-validation
status: completed
tags: []
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-352, CORE-352.1, CORE-352.2, CORE-352.3]
---

# CORE-352.4 | external-and-validation

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-352]] · [[CORE-352.1]] · [[CORE-352.2]] · [[CORE-352.3]]

## 🎯 Goal

Add `docs/EXTERNAL-AGENTS.md` (external CLI-agent handoff patterns — Kiro/Claude/Codex; one-agent-per-tasknote; cross-linked to WORKTREES) plus soft optional Phase 3 / template validation guidance and light property-based-testing wording — no new lifecycle phase.

## ✅ Acceptance

- [ ] `docs/EXTERNAL-AGENTS.md` created: one-agent-per-tasknote rule, the handoff contract (what an external CLI agent needs), tool-agnostic (Kiro / Claude Code / Codex as examples, not dependencies), and a "flowtron ships the contract, not an orchestration runtime" boundary
- [ ] `docs/EXTERNAL-AGENTS.md` cross-links `docs/WORKTREES.md`, and `docs/WORKTREES.md` reciprocally links back (parallel external agents use the worktree isolation convention)
- [ ] `templates/tasknote-template.md` §Phase 3 carries soft validation / property-based-testing guidance as **prose** (not a new checkbox / gate)
- [ ] `SPEC.md` §"🧪 Phase 3: Testing & Linting" carries matching soft guidance; framed as engineering judgment folded into Phase 3 — no new lifecycle phase, no schema/validator
- [ ] `README.md` indexes `docs/EXTERNAL-AGENTS.md` (§Documents + repo-layout `docs/` line), mirroring the `WORKTREES.md` treatment
- [ ] Tone holds the VISION anti-validator / no-new-phase / no-orchestration-runtime stance across every edit
- [ ] Phase 4 doc-drift sweep; `EXTERNAL-AGENTS.md` NOT added to the AI-referenced ledger (mirrors `WORKTREES.md`, which is also a pattern doc, not cold-start ground truth)

## 🧩 Subtasks

- [ ] Write `docs/EXTERNAL-AGENTS.md` (locked-conventions prose style à la `WORKTREES.md`: intro · one-agent-per-tasknote · handoff contract · worktree cross-link for parallelism · not-an-orchestrator boundary · relationship to flowtron · cross-link footer)
- [ ] Add reciprocal cross-link from `docs/WORKTREES.md` → `EXTERNAL-AGENTS.md`
- [ ] Add soft validation / PBT guidance note to `templates/tasknote-template.md` §Phase 3 (prose under the checklist)
- [ ] Add matching soft guidance paragraph to `SPEC.md` §"🧪 Phase 3: Testing & Linting"
- [ ] Index `EXTERNAL-AGENTS.md` in `README.md` (§Documents entry + repo-layout `docs/` line)
- [ ] Phase 3: markdown mental-pass + cross-ref/wikilink integrity check across all edited files
- [ ] Phase 4: doc-drift sweep + flip `.4` PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic (spec-agent-validation)
- [[CORE-352.1]] — discovery; locked this child's scope (docs + soft validation, hooks out)
- [[CORE-352.2]] — shipped the `/ft-spec` skill (Validation Approach section)
- [[CORE-352.3]] — wiring fan-out predecessor

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.4` is the docs/validation child of an already-scoped epic (CORE-EPIC-352). Discovery [[CORE-352.1]] locked lock #6/#7: "Docs + soft Phase 3 / template guidance; no hooks — EXTERNAL-AGENTS.md + optional template bullets + short guidance (SPEC or docs); one agent per tasknote; worktree isolation." `/ft-spec` (`.2`) + wiring (`.3`) are shipped; the two deliverables here (EXTERNAL-AGENTS doc + soft validation guidance) fit one context window and one clear diff. Nothing has drifted.

- [x] Read relevant source files — `docs/WORKTREES.md` (locked-conventions doc style + the isolation convention this extends), `.flowtron/tasknote/README.md` (AI-referenced ledger — WORKTREES.md is deliberately NOT in it), `templates/tasknote-template.md` §Phase 3, `templates/spec-template.md` §"✅ Validation Approach" (light PBT prose shipped by `.2`), `claude/skills/ft-spec/SKILL.md` (Validation-Approach framing), `SPEC.md` §"🧪 Phase 3", `docs/VISION.md` §"What we won't accept" (anti-validator stance), `docs/PHILOSOPHY.md` (validator-is-the-assistant), `README.md` §Documents + §"Repo layout".

- [x] **Archive skim** — load-bearing precedents:
  - [[CORE-352.1]] Discovery — lock table rows 6/7 scope this child verbatim; shared-surface table names `docs/EXTERNAL-AGENTS.md` + `docs/WORKTREES.md` cross-link and "soft optional Validation / Phase 3 guidance bullets — no new phase."
  - [[CORE-352.2]] — shipped `templates/spec-template.md` §"Validation Approach" with **light** PBT prose; its assumption #4 explicitly defers the heavier tasknote-template + Phase 3 validation guidance to **this** task. I mirror its language so spec-template / tasknote-template / SPEC all agree.
  - [[CORE-EPIC-215]] / `docs/WORKTREES.md` — multi-agent isolation already codified ("one agent per tasknote per worktree"). EXTERNAL-AGENTS.md **extends** this, does not invent orchestration (Discovery open-risk: no parallel-orchestration runtime).
  - No prior EXTERNAL-AGENTS / external-CLI-agent doc anywhere in archive or HEAD.

- [x] **Drift check** (2026-07-12 HEAD):
  - `docs/EXTERNAL-AGENTS.md` — does not exist yet (net-new). ✅
  - `docs/WORKTREES.md` — present, five locked conventions intact; no EXTERNAL-AGENTS backlink yet. ✅
  - `templates/tasknote-template.md` §Phase 3 — three checklist items, no validation-strategy prose yet. ✅
  - `SPEC.md` §"🧪 Phase 3: Testing & Linting" — checklist + full-suite note + 👁️ paragraph; no PBT/test-strategy prose yet. ✅
  - `README.md` — WORKTREES.md indexed at §Documents (line ~40) + repo-layout `docs/` line (~196), and NOT in the AI-referenced ledger; EXTERNAL-AGENTS.md follows this exact treatment. ✅
  - Grep confirms zero pre-existing `EXTERNAL-AGENTS` / external-CLI-agent references anywhere. ✅

- [x] Asked clarifying questions OR logged "No clarifications needed" — **One AskUserQuestion round.** Discovery lock #6 deliberately left validation-guidance placement open ("SPEC **or** docs" + template bullets). Since SPEC.md is the canonical all-adopter contract (heavier blast radius, and VISION is strongly anti-validator), I surfaced the placement choice. **Operator chose "Template + SPEC §Phase 3"** — soft guidance lands in both `templates/tasknote-template.md` §Phase 3 and `SPEC.md` §Phase 3, guidance-framed, no new checkbox/gate. EXTERNAL-AGENTS.md scope was fixed either way.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Two deliverables

1. **`docs/EXTERNAL-AGENTS.md`** (net-new) — external CLI-agent handoff patterns. Tool-agnostic; Kiro / Claude Code / Codex as *examples*, not dependencies. Core rule: **one agent per tasknote** (the tasknote is the handoff unit + shared context). Cross-links `docs/WORKTREES.md` for the parallel-independent-children case (each external agent in its own worktree). Explicit boundary: flowtron ships the **contract** the handoff reports to, **not** an orchestration runtime / scheduler (mirrors VISION §"What we won't accept" → loop-runtime rejection).
2. **Soft validation / PBT guidance** — prose (not a new checkbox) into `templates/tasknote-template.md` §Phase 3 **and** `SPEC.md` §"🧪 Phase 3", mirroring `templates/spec-template.md` §"Validation Approach" language: targeted tests by default; property-based tests where the input space is wide; visual confirmation for UI. Framed as engineering judgment folded into Phase 3 — **never** a new lifecycle phase or a schema/validator.

### Placement decisions (defaults, held as assumptions unless noted)

- **EXTERNAL-AGENTS.md ledger status:** NOT added to `.flowtron/tasknote/README.md` §"AI-referenced docs" — mirrors `WORKTREES.md` (a niche adopter pattern doc, not cold-start ground truth). Indexed in `README.md` §Documents + repo-layout instead.
- **Validation guidance placement:** template + SPEC §Phase 3 (operator-confirmed via AskUserQuestion).
- **Reciprocal linking:** WORKTREES.md gets a backlink to EXTERNAL-AGENTS.md so the two multi-agent docs form a pair (precedent: KEEP-IN-SYNC reciprocal markers, [[CORE-318]]).

### Philosophy tone gate (every edit)

Zero scripts · no new lifecycle phase · no schema/validator · no hooks/daemons · no orchestration runtime/scheduler · optional never mandatory · agent-neutral. The word "validation" must read as engineering *guidance*, never a validator product (Discovery open-risk).

Discovery surfaced no significant deviation from CORE-352.1's locked scope; the one clarifying answer confirmed an in-scope placement the PLAN line already named ("Phase 3/template validation") → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/EXTERNAL-AGENTS.md` modeled verbatim on `docs/WORKTREES.md`'s locked-conventions prose shape (intro → core rule → contract → relationship → `**Related:**` footer). Soft validation guidance mirrors `templates/spec-template.md` §"Validation Approach" wording so spec-template / tasknote-template / SPEC §Phase 3 all speak the same language. Reciprocal doc backlink follows the [[CORE-318]] KEEP-IN-SYNC pairing habit. No new shape invented.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (documentation / template-prose only; no executable surface). Verification is the markdown link + whitespace sweep in Phase 3.

**Implementation Notes:**

Five surfaces:

1. `docs/EXTERNAL-AGENTS.md` (net-new) — one-agent-per-tasknote rule; three-item handoff contract (tasknote w/ Phase 1 done · SPEC · PLAN); worktree cross-link for parallelism; "Not an orchestration runtime" boundary mirroring VISION §"What we won't accept"; relationship section; `**Related:**` footer. Tool-agnostic — Kiro/Claude/Codex as examples only.
2. `docs/WORKTREES.md` — reciprocal backlink bullet added to §"Relationship to the Rest of Flowtron".
3. `templates/tasknote-template.md` §Phase 3 — blockquote "Choosing a test strategy (guidance, not a gate)" prose (targeted default · PBT for wide input spaces · visual for UI · never a new phase/validator). Not a new checkbox.
4. `SPEC.md` §"🧪 Phase 3" — matching bold-lead paragraph, explicitly tied to the `/ft-spec` "Validation Approach" framing.
5. `README.md` — §Documents entry for EXTERNAL-AGENTS.md (after WORKTREES.md) + repo-layout `docs/` line (`…worktrees, and external-agents docs`).

EXTERNAL-AGENTS.md deliberately kept OUT of the `.flowtron/tasknote/README.md` AI-referenced ledger (mirrors WORKTREES.md — pattern doc, not cold-start ground truth).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (documentation / template-prose only; no test-bearing code). Markdown verification sweep instead.

- [x] Ran lint/type-check on changed code — N/A; deterministic markdown checks run instead (below).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; the viz parser is untouched — no new PLAN grammar).

**Testing Notes:**

- `git diff --check` clean (no trailing whitespace, no missing newline).
- `docs/EXTERNAL-AGENTS.md` carries zero `[[wikilink]]` tokens → no wikilink-integrity exposure; peers referenced as markdown doc links.
- All `**Related:**` / body doc links (`WORKTREES.md`, `AGENT-NEUTRALITY.md`, `AGENT-COMPAT.md`, `PLATFORMS.md`, `VISION.md`) resolve as `docs/`-relative paths.
- In-page anchor `#not-an-orchestration-runtime` matches the `## Not an Orchestration Runtime` heading.
- `git status` shows exactly the five planned edits + the new doc + this tasknote; no viz / skill-roster / MIGRATION surface touched (that was `.3`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 12 AI-referenced ledger entries:

  - `README.md` — **updated** (§Documents EXTERNAL-AGENTS.md entry + repo-layout `docs/` line)
  - `SPEC.md` — **updated** (§"🧪 Phase 3" test-strategy guidance paragraph)
  - `docs/MIGRATION.md` — no change (EXTERNAL-AGENTS.md is a pattern doc, not a symlinked skill; no counts/staging affected)
  - `claude/AGENTS-snippet.md` — no change (no skill/symlink surface)
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change (external agents run the same review-gated 4-phase flow; the operator diff-review at closure is still the control point — no new attack surface)
  - `docs/AGENT-NEUTRALITY.md` — no change (EXTERNAL-AGENTS.md reinforces agent-neutrality; adds no new Claude-specific contract-layer surface to ledger)
  - `docs/PLATFORMS.md` — no change (no new platform wiring/inventory; the new doc references it but ships no skill)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change (no matrix/last-verified change)

  (`docs/GLOSSARY.md` checked and left untouched — "external agent" / "one agent per tasknote" compose existing terms; no new vocabulary, mirroring `.3`'s glossary judgment. Not in the ledger either way.)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` (stays nested under the open `CORE-EPIC-352` in `## High`; cohort moves to `## Completed` when the epic closes at `.N`) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on the conditional skip branch — all three signals clear)

**Final Summary:**

Added `docs/EXTERNAL-AGENTS.md` — a tool-agnostic convention for handing one flowtron tasknote to an external CLI agent (Kiro / Claude Code / Codex): the one-agent-per-tasknote rule, the three-item handoff contract (Phase-1-complete tasknote · SPEC · PLAN), worktree isolation for parallel runs cross-linked to `WORKTREES.md`, and an explicit "flowtron ships the contract, not an orchestration runtime" boundary mirroring VISION §"What we won't accept". Reciprocal backlink added from `WORKTREES.md`. Wove soft, optional property-based-testing guidance ("guidance, not a gate") into both `templates/tasknote-template.md` §Phase 3 and `SPEC.md` §"🧪 Phase 3" (operator-chosen placement), mirroring the `/ft-spec` spec template's "Validation Approach" language so all three surfaces agree — no new lifecycle phase, no validator. Indexed the new doc in `README.md`; kept it out of the AI-referenced cold-start ledger (mirrors `WORKTREES.md`). Verified: `git diff --check` clean; zero wikilink exposure; all doc links resolve. Markdown-only, no code. Remaining epic children: `.5` (dogfood), `.N` (audit).

**Archived:** 2026-07-12
