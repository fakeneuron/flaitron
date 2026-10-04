---
title: epic-audit-emit-dotN
status: completed
tags: []
created: 2026-07-03
related-tasks: [CORE-333]
---

# CORE-334 | epic-audit-emit-dotN

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-333]]

## 🎯 Goal

Migrate `/ft-epic-discovery` and `/ft-close-epic` to emit and validate the epic audit child as the literal reserved `.N` suffix (retiring the numeric audit-number-bump model), so the CORE-333 grammar support is actually exercised end-to-end — while keeping legacy numeric audit IDs valid.

## ✅ Acceptance

- [ ] `ft-epic-discovery` files the audit child as `**<AREA>-<next-N>.N**` (literal), not `.<count>`
- [ ] `ft-epic-discovery` Step 2 input reframed from "total-subtask-count N" to "implementation-child count M"; impl children = `.2..(M+1)`
- [ ] The "N can shift / audit-number bump" logic is retired (audit `.N` never renumbers; only the numeric-child count M changes)
- [ ] `ft-close-epic` accepts `.N` as canonical audit ID, and a legacy highest-numeric ID as back-compat fallback
- [ ] Both skills' surfaced examples/prose are internally consistent (no lingering `.<N>` numeric-audit references)
- [ ] Markdown mental-pass; no executable surface
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [ ] ft-epic-discovery: 8 edit sites (Step 2 input, Step 3 resolve+surface, Step 4 file-lines, Step 5 acceptance/subtasks, Step 7 impl+notes, Step 9 recap, Notes "N can shift")
- [ ] ft-close-epic: 4 edit sites (frontmatter example, Step 1 args example, Step 2 audit-position validation, back-compat message)
- [ ] Doc-drift sweep + close

## 🔗 Related

- [[CORE-333]] — grammar support for `.N` (this migration exercises it)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly requested the skill-migration follow-up to CORE-333. Without it, `.N` is grammar-legal but never emitted — the friction the epic targeted persists. Well-scoped to two SKILL.md files.

- [x] Read relevant source files — `ft-epic-discovery/SKILL.md` (Steps 2–10 + Notes), `ft-close-epic/SKILL.md` (Steps 1–2), `SPEC/epic.md` (already `.N`-migrated in CORE-333).

- [x] **Archive skim** — CORE-333 (just-closed) is the direct predecessor; the epic-lifecycle contract in SPEC/epic.md already blesses `.N` as the terminal reserved suffix. No further archive precedent needed.

- [x] **Drift check** — ft-epic-discovery frontmatter *already* says "`.N` audit placeholder lines" while its body emits numeric `.<N>` — a pre-existing internal inconsistency this migration resolves. ft-close-epic Step 2 (:45–50) validates "highest numeric `.<SUB>`" — the drift to fix. Confirmed at cited lines.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **Design decisions (recommended defaults; user was away at the AskUserQuestion gate — flagged for review at 📦):**
  1. **N-input model → implementation-child count M.** Audit decoupled from the count and always `.N`. Discovery `.1`, impl `.2..(M+1)`, audit `.N`. Cleaner than keeping a phantom total-count.
  2. **ft-close-epic back-compat → accept both.** `.N` canonical + legacy highest-numeric fallback, matching CORE-333's "both forms valid going forward" doc stance. In-flight epics with a numeric audit still close.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Skills-only change (SPEC/epic.md already migrated in CORE-333). No executable surface → Phase 3 is a markdown mental-pass. Held at 📦 for review rather than auto-committed, since the numbering-model rewrite is a UX/contract change the operator should eyeball.

Discovery surfaced no significant deviation from the filed scope → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — SPEC/epic.md's post-CORE-333 numbering convention is the authority the skills now match.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (skill/command/contract markdown; no executable surface).

**Implementation Notes:**

- `ft-epic-discovery/SKILL.md` — 12 sites migrated: frontmatter + intro, Step 2 input (M model), Step 3 resolve+surface, Step 4 filed lines (`.N` literal audit) + "do NOT pre-write" note, Step 5 Goal/Acceptance/Subtasks + drop-audit note, Step 7 impl + reconciliation + Implementation-Notes capture, Step 9 recap. Retired "audit-number bump" and the "N can shift" note (→ "M can shift"; audit `.N` never renumbers).
- `ft-close-epic/SKILL.md` — 6 sites: frontmatter + intro args examples (`.N` canonical + legacy numeric), Step 1 parse clarification, Step 2 audit-position validation rewritten (accept `.N` canonical OR legacy highest-numeric), cohort-move display, Notes summary.
- `claude/commands/ft-epic-discovery.md` + `ft-close-epic.md` — command stubs synced to the new model.
- `SPEC/epic.md` — steps 4–5 consistency: audit invoked as `.N` (legacy numeric accepted); follow-up notation de-collided from the literal `.N` (`.<N+1>` → "new numeric children slotting before `.N`").

**Open item (flagged for review):** SPEC/epic.md step 5's *second-wave audit* semantics under the pure `.N` model (a single terminal `.N` can't be filed twice) were left deliberately vague ("file a fresh Audit subtask to cover the second wave") rather than inventing a rule. Candidate follow-up if second-wave audits become common.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable surface). Viz parser suite already green from CORE-333.

- [x] Ran lint/type-check on changed code — N/A (markdown only). Markdown mental-pass done: numbering formula internally consistent (M impl children → `.2..(M+1)`, Discovery `.1`, audit `.N`); frontmatter + cross-refs intact.

- [x] (frontend) N/A — no frontend surface.

**Testing Notes:**

Repo-wide grep for old-model residue (`total-subtask-count`, `audit-number bump`, `.2..(N-1)`, "highest numeric audit") returns clean outside archive.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 cold-start AI-referenced docs = **no change** (none describe the epic audit-numbering model; repo-wide scan clean). Non-sweep updates landed in-scope: `SPEC/epic.md` (lazy module), the two SKILL.md files, and the two command stubs (the task deliverable).

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-03.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (held at the 📦 ready-to-commit gate for operator review of the design decisions)

**Final Summary:**

Migrated `/ft-epic-discovery` + `/ft-close-epic` (and their command stubs) to emit/validate the epic audit child as the literal reserved `.N` suffix, retiring the numeric audit-number-bump model. Input reframed from total-subtask-count N to implementation-child count M (audit decoupled, always `.N`); ft-close-epic accepts `.N` canonical + legacy highest-numeric for back-compat. SPEC/epic.md steps 4–5 reconciled. CORE-333's grammar support is now exercised end-to-end.

**Archived:** 2026-07-03
