---
title: dogfood-prompt-template
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-268, CORE-EPIC-267]
---

# CORE-269 | dogfood-prompt-template

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-268]] · 🔗 [[CORE-EPIC-267]]

## 🎯 Goal

Create a versioned, pasteable dogfood procedure (contract comprehension + cue-render check + Phase-1 drive) that any agent runs to refresh its AGENT-COMPAT `last-verified` row, closing the ad-hoc gap that CORE-268's release run exposed.

## ✅ Acceptance

- [ ] Procedure file created with the three-section structure (contract comprehension · cue-render check · Phase-1 drive)
- [ ] Cue-render check enumerates the **full** SPEC/gates.md §"Operator-cue vocabulary" set (all 4 groups: event · inline asks · landmark · next-task)
- [ ] File is agent-neutral (no Claude-specific machinery in the procedure body)
- [ ] AGENT-COMPAT.md §"Reading the cells" or §"Pre-adoption verification" cross-references the new file
- [ ] Doc-drift sweep at Phase 4 run across all AI-referenced docs

## 🧩 Subtasks

- [ ] Confirm file location (`docs/DOGFOOD.md` vs other — ask user)
- [ ] Write the procedure file with all three sections
- [ ] Add cross-reference from `docs/AGENT-COMPAT.md` to the new file
- [ ] Phase 3: markdown mental-pass on the new file and the AGENT-COMPAT edit
- [ ] Phase 4: doc-drift sweep + flip PLAN line + archive tasknote

## 🔗 Related

- [[CORE-268]] — predecessor; the CORE-268 release run exercised the dogfood gate for the first time and exposed both the procedure gap (no written prompt) and the cue-subset finding (Codex flagged the omission; Grok emitted the full set)
- [[CORE-EPIC-267]] — the release-dogfood-gate epic that wired the gate; CORE-269 is the procedure artifact that gate was missing

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Gap is real and confirmed by two independent dogfood sessions during CORE-268: the ad-hoc prompt used for Grok/Codex had no written form and its cue coverage was incomplete (Codex flagged the omission). The CORE-267 gate wires a release obligation but left the agent-side procedure informal — this task produces the artifact that closes it. Clear, bounded scope.

- [x] Read relevant source files

- [x] **Archive skim** — no prior tasknote in `archive/core/` touches `docs/DOGFOOD.md` or any dogfood procedure file; the related tasknotes (CORE-267.1/267.2/267.3/267.5, CORE-268) are all about the gate convention and wiring, not about a written agent-facing procedure. No load-bearing prior art to carry forward. CORE-270 is a starter tasknote (related — it talks about agent-neutral procedure SOPs as a future architecture) but is not yet scoped; CORE-269 predates CORE-270's SOP framing and stands on its own.

- [x] **Drift check** — `docs/AGENT-COMPAT.md` §"Reading the cells" update-obligation prose is live at HEAD (v5.1.0 state post-CORE-267.2 rewrite); no "see DOGFOOD.md" cross-reference exists yet (as expected). Full cue vocabulary in `SPEC/gates.md` §"Operator-cue vocabulary" is live and complete (10+ cues across 4 groups). No drift on cited paths.

- [x] Asked clarifying questions — see below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source reads

**CORE-268 tasknote (archive)** — the key context:
- **Codex finding:** the dogfood prompt requested only a cue *subset* — Codex flagged that canonical `SPEC/gates.md` entries (🗄️ DB, 👁️ CONFIRM, 🔍 AUDIT, ✅, 🔧 LIGHT, 🧠 HEAVY) were omitted. The dogfood-prompt-template should enumerate the *full* cue set.
- **Grok finding:** PASS — most rigorous of the three. Emitted the *complete* cue vocabulary (covering the CORE-269 gap Codex flagged); full contract read; real archive skim + drift check.
- Both sessions were run from an ad-hoc prompt constructed in-session; no written procedure artifact exists.

**Full cue set (SPEC/gates.md §"Operator-cue vocabulary")** — all groups:
- Event cues: 🗄️ DB · ▶️ RUN · ✋ ACTION
- Inline asks: 🟢 GO · 👁️ CONFIRM · 🔍 AUDIT
- Landmark cues: 🛠️ Phase 1→2 (AWAITING APPROVAL) · 📦 Ready-to-commit (AWAITING APPROVAL) · 🏁 Committed · ✅ Phase/closure complete
- Next-task cues: 🔧 LIGHT · 🧠 HEAVY

**AGENT-COMPAT.md §"Reading the cells"** — the `last-verified` stamp update obligation says "dogfooded row must be resolved at each release" but does NOT point to a procedure doc. §"Pre-adoption verification" and §"Cross-agent cue fallback policy" are adjacent but also have no pointer to a procedure.

**CORE-270 starter** — the future architecture envisions `SPEC/procedures/<intent>.md` as agent-neutral SOPs; the dogfood procedure would logically fit there in the CORE-270 world. But CORE-270 is not yet scoped, and CORE-269 is an independent filing. The simplest landing is `docs/DOGFOOD.md`; if CORE-270 later introduces `SPEC/procedures/`, it can absorb or redirect this doc.

**File-location question (AskUserQuestion):** The PLAN.md explicitly calls this out as uncertain ("Likely `templates/` or `docs/DOGFOOD.md`"). I lean `docs/DOGFOOD.md` — procedure docs live in `docs/`, templates in `templates/` are workflow artifacts consumed by skills. Confirming with user.

### Structure of the procedure (three sections per PLAN.md)

1. **Contract comprehension** — read list: `SPEC.md`, `AGENTS.md`, `docs/AGENT-COMPAT.md`, `SPEC/gates.md`, and `templates/tasknote-template.md`
2. **Cue-render check** — emit each cue in the full vocabulary; confirm it renders (no tofu/strip/mojibake); label is the authoritative fallback
3. **Phase-1 drive** — run Phase 1 Discovery on a real task from the project's PLAN.md; log explicit assumptions; populate Subtasks; reach a Relevance Assessment verdict; confirm default-skip exit-gate is invoked by name

The "versioned" aspect: the procedure document should state the flowtron version it was written for (so the operator knows if the procedure is current), and the output is a dated stamp update to the agent's AGENT-COMPAT row.

### AI-referenced docs decision

`docs/DOGFOOD.md` is an operator-facing runbook, not a cold-start ground truth doc that AI sessions consume for the 4-phase workflow. It should NOT be added to the AI-referenced docs list in `README.md`. However, a cross-reference FROM `docs/AGENT-COMPAT.md` TO `docs/DOGFOOD.md` is the right link — that's where the update obligation lives and agents/operators read it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/` files follow the same shape (H1 title, Audience line, H2 sections, no frontmatter). AGENT-COMPAT.md and PLATFORMS.md are the natural siblings. Procedure is a new shape for `docs/` (runbook-style) but matches the cadence of MIGRATION.md (procedural, step-by-step). No existing dogfood procedure to extend — justified new file.

- [x] Implemented the minimal solution — wrote `docs/DOGFOOD.md` (three-section procedure: contract comprehension · cue-render check · Phase-1 drive) and added two targeted edits to `docs/AGENT-COMPAT.md` (cross-ref in §"Reading the cells" update-obligation paragraph + §"Related" bullet)

- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only; no executable surface)

**Implementation Notes:**

- `docs/DOGFOOD.md` — new file. Three-section pasteable procedure covering the full cue set (4 groups: event · inline asks · landmark · next-task). Agent-neutral throughout; no Claude-specific machinery. Includes `git status --porcelain` zero-write verification at end of Step 3. §"Recording the result" covers Claude / Grok+Codex / other-agent stamp locations. §"Related" links back to AGENT-COMPAT, SPEC/gates.md, PLATFORMS.md, and [[CORE-269]].
- `docs/AGENT-COMPAT.md` — two edits: (1) appended "For the agent-side session procedure…see [`docs/DOGFOOD.md`](DOGFOOD.md)." after the update-obligation paragraph's last sentence; (2) added `DOGFOOD.md` bullet at the top of §"Related".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only; no viz or TypeScript changes)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

Markdown mental-pass on `docs/DOGFOOD.md` (new file) and `docs/AGENT-COMPAT.md` (2 edits):
- `DOGFOOD.md`: no frontmatter, no broken fenced blocks, all 12 cues across 4 groups confirmed against `SPEC/gates.md` table, internal links use relative paths, wikilink `[[CORE-269]]` follows docs/ pattern.
- `AGENT-COMPAT.md`: cross-ref sentence appended cleanly after last period of update-obligation paragraph; `DOGFOOD.md` Related bullet matches sibling format exactly. No table pipes broken, no frontmatter touched, no cross-refs changed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — **updated** (cross-ref to DOGFOOD.md in §"Reading the cells" update-obligation paragraph + §"Related" bullet)
  - `docs/DOGFOOD.md` — new file; intentionally NOT added to the AI-referenced docs list (operator-facing runbook, not cold-start ground truth for normal sessions)

- [x] Closed — PLAN.md line flipped to stub form and tasknote archived to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Created `docs/DOGFOOD.md` — a versioned, pasteable agent-neutral procedure covering the three verification surfaces (contract comprehension, full cue-render check, Phase-1 drive) that any agent runs to refresh its AGENT-COMPAT `last-verified` row. Closes the procedure gap the CORE-267 dogfood gate left open: the ad-hoc CORE-268 prompt had no written form and only covered a cue subset (Codex flagged the omission; Grok's run covered the full set). The new procedure enumerates all 12 cues across 4 groups per SPEC/gates.md §"Operator-cue vocabulary". Added two targeted edits to `docs/AGENT-COMPAT.md`: a cross-reference sentence at the end of the §"Reading the cells" update-obligation paragraph, and a `DOGFOOD.md` bullet in §"Related".

**Archived:** 2026-06-02
