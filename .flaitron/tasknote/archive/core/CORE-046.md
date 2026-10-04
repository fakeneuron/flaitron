---
title: flowtron v1.1.0 — post-closure /model + recap-only
status: completed
tags: []
created: 2026-05-07
due:
related-tasks: []
---

# CORE-046 | flowtron v1.1.0 — post-closure /model + recap-only

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Land FinTown CORE-098 review proposals 1+2 — fold `/model` into the canonical post-closure copy-paste line, and promote "recap is recap-only" from soft prose to an enforced callout — then tag v1.1.0.

## ✅ Acceptance

- [ ] `SPEC.md` §"Post-closure protocol" Step 3 copy-paste line updated to `/clear then /model <opus|sonnet> then /task <NEXT-ID>` with a one-sentence rationale on the `/model` segment
- [ ] `SPEC.md` §"🚀 Phase 4: Closure" recap paragraph promoted to a stronger "recap is recap-only" callout (no behavior change for adopters who already followed the soft language)
- [ ] `claude/skills/task/SKILL.md` Step 5 Phase 4 + Step 6 copy-paste line updated to match new SPEC
- [ ] `claude/skills/micro-task/SKILL.md` Step 4 + Step 5 copy-paste line updated to match new SPEC (preserve the `/<task|micro-task|starter-task>` choice)
- [ ] v1.1.0 release prep: PLAN.md release entry / changelog if convention exists; annotated tag message highlights the copy-paste-line change as the user-visible behavior shift
- [ ] `flowtron-upstream-proposals.md` removed or archived (its contents are absorbed by this tasknote)

## 🧩 Subtasks

- [ ] SPEC.md line 3 — bump `**Version:** v1.0.0` → `**Version:** v1.1.0`
- [ ] SPEC.md §"🚀 Phase 4: Closure" — replace the soft recap paragraph (lines 288-292) with the trimmed "Recap is recap-only" callout (`> **Recap is recap-only.** The recap is *what changed + verification ask* and stops there. The next-task suggestion belongs in the post-closure protocol, after the commit lands — not inside the Phase 4 recap.`)
- [ ] SPEC.md §"Post-closure protocol" Step 3 — replace the copy-paste code fence (lines 320-322) with `/clear then /model <opus|sonnet> then /task <NEXT-ID>` and add a one-sentence rationale on the `/model` segment (concise: matches the PLAN-line `[model]` tag, no-op on match, pre-empts Step 1.5 model gate on hand-offs)
- [ ] `claude/skills/task/SKILL.md` Step 5 Phase 4 (line 134) — append a one-liner reinforcing recap-only (cite SPEC §"🚀 Phase 4: Closure" callout)
- [ ] `claude/skills/task/SKILL.md` Step 6 (line 145) — update literal to `/clear then /model <opus|sonnet> then /task <NEXT-ID>`
- [ ] `claude/skills/micro-task/SKILL.md` Step 4 (around line 115 closing-list) — append the same recap-only reinforcing one-liner
- [ ] `claude/skills/micro-task/SKILL.md` Step 5 (line 129) — update literal to `/clear then /model <opus|sonnet> then /<task|micro-task|starter-task> <NEXT-ID>` (preserving the slash-command alternation)
- [ ] Grep sweep — confirm no live file outside the proposals file still embeds the old `/clear then /task <NEXT-ID>` form (archive excluded)
- [ ] Phase 3 — markdown lint mental-pass on edited paragraphs; no test suite to run for SPEC/SKILL prose
- [ ] Phase 4 closure — delete `flowtron-upstream-proposals.md`, archive this tasknote, flip PLAN.md line to stub form
- [ ] Post-closure — single commit `feat: CORE-046 — flowtron v1.1.0 (post-closure /model + recap-only)`; then draft + cut annotated tag `v1.1.0` (tag message follows v1.0.0 shape: subject + summary + changes + adopter migration block highlighting the copy-paste-line shift)

## 🔗 Related

- `flowtron-upstream-proposals.md` (repo root, untracked) — source proposal document; FinTown CORE-098 review filed it.
- Proposal 3 (non-task-commit pattern) is intentionally **out of scope** for this task — see the FinTown-side feedback note for rationale.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed.
  **Rationale:** PLAN.md line just filed, accurate. Proposal cites SPEC.md:288-292 (recap paragraph) and SPEC.md:320-322 (copy-paste fence) — drift check confirms both line ranges are still accurate at HEAD. Three live files embed the changing language: `SPEC.md`, `claude/skills/task/SKILL.md`, `claude/skills/micro-task/SKILL.md`. No other files require touching.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — no drift; all proposal-cited line numbers verified at HEAD
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Source files (live + on-spec):** `SPEC.md` (lines 3, 288-292, 318-322), `claude/skills/task/SKILL.md` (Step 5 line 134, Step 6 line 145), `claude/skills/micro-task/SKILL.md` (Step 4 closing list ~109-115, Step 5 line 129).
- **Live grep** for `/clear then /task` and `copy-paste line` returns only those three live files plus the proposals scratch file at repo root and PLAN.md / CORE-046.md (this task's own files). `claude/skills/starter-task/SKILL.md` has no copy-paste line — confirmed, no update needed there. `claude/skills/new-project/SKILL.md` not in scope (it's the adoption flow, not the post-closure flow).
- **Archive skim hits (33 archive files mention copy-paste/post-closure language; only release/SKILL-edit precedents are load-bearing):**
  - `CORE-043.md` (release v1.0.0) — sets the release shape: annotated tag with subject + body + Changes section + adopter Migration block; SPEC.md `**Version:**` line bumped as part of the release commit. v1.1.0 tag message will follow this template (smaller scope: two SPEC tweaks, no symlink wiring needed).
  - `CORE-042.9.md` (SKILL-side lazy-load) — confirms SKILL editing pattern; also confirms the lazy-load architecture means edits to `SKILL.md` Step 6 don't cascade into the lazy fragments.
- **No SPEC contract change.** Proposals 1+2 are an additive/clarification pair — adopters who paste the old line still work (Step 1.5 model gate handles the mismatch). Versioning rule: minor bump (v1.0.0 → v1.1.0) per `SPEC/versioning.md`.
- **Out of scope:** Proposal 3 (non-task-commit pattern). FinTown keeps it project-side per the feedback note already drafted in conversation; flowtron will revisit if a second adopter independently surfaces the same friction.
- **Adopter impact:** FinTown can trim its `CLAUDE.md` model-gate + copy-paste-line guidance to a SPEC pointer after pinning v1.1.0 (the model-per-task and copy-paste-line sections become redundant). Non-task-commit guidance in FinTown's `CLAUDE.md` stays as-is — SPEC won't cover it.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — markdown prose edits, follow existing house style (concise + imperative); no abstractions to introduce
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (prose edits; no test surface)

**Implementation Notes:**

Edits in order:

1. `SPEC.md` line 3 — `**Version:** v1.0.0` → `**Version:** v1.1.0`.
2. `SPEC.md` lines 288-299 — kept the recap-content paragraph (what changed + verification ask) and the closure-completion paragraph; inserted the trimmed "Recap is recap-only" callout (`>` block) between them. Net: +5 lines.
3. `SPEC.md` lines 321-332 — copy-paste fence updated to `/clear then /model <opus|sonnet> then /task <NEXT-ID>`; added a four-line rationale tail clarifying the `/model` segment matches the PLAN-line `[model]` tag, no-op on match, pre-empts Step 1.5 model gate on hand-offs (and that the gate still fires on cold starts).
4. `claude/skills/task/SKILL.md` line 134 — appended a bolded one-liner inside Phase 4 sentence: "Recap is recap-only — do not include the next-task suggestion until the commit lands (Step 6); see SPEC §"🚀 Phase 4: Closure" callout."
5. `claude/skills/task/SKILL.md` line 145 — copy-paste-line bullet updated to the new SPEC form + a "Substitute the next task's PLAN-line `[model]` tag for `<opus|sonnet>` so the user pastes a fully resolved line" hint (so the assistant resolves the placeholder, doesn't paste literal `<opus|sonnet>`).
6. `claude/skills/micro-task/SKILL.md` step 5 (line 115) — same recap-only one-liner appended; cites Step 5 (micro-task's post-closure step number).
7. `claude/skills/micro-task/SKILL.md` line 129 — copy-paste-line bullet updated, preserving the `/<task|micro-task|starter-task>` slash-command alternation; same resolve-the-placeholder hint added.
8. `SPEC/versioning.md` lines 8-12 — patch/minor examples shifted off the just-cut release: `v1.0.0 → v1.0.1` becomes `v1.1.0 → v1.1.1`; `v1.0.x → v1.1.0` becomes `v1.1.x → v1.2.0`. Major example unchanged (already future-looking at `v1.x.y → v2.0.0`). Follows CORE-043 precedent of not letting the current release be its own self-fulfilling example.
9. `docs/MIGRATION.md` line 294 — example pin in `(e.g., v1.0.0)` bumped to `v1.1.0` for currency. Leaves the unrelated "v1.0 additions" historical reference at line 293 untouched.

Verified post-edit: live grep shows zero stale `/clear then /task` references in non-archive files; new form appears only in the three intended live files (SPEC + both SKILLs) — see Discovery Notes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose; no test surface). Visual review of rendered SPEC paragraphs and SKILL bullets done; reads clean.
- [x] Ran lint/type-check on changed code — N/A for markdown.
- [x] (frontend) Asked the user for visual confirmation — N/A (not a frontend task).

**Testing Notes:**

No automated check applies. The viz codebase is untouched; PLAN.md schema, tasknote frontmatter, and YAML status surface are all unchanged, so the existing viz suite is unaffected and was not re-run. Verification offered to user in Phase 4 recap = read the SPEC/SKILL diffs and the proposed v1.1.0 tag message before tagging.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `SPEC/versioning.md` patch/minor examples shifted; `docs/MIGRATION.md` example pin bumped to `v1.1.0`. SPEC.md `**Version:**` line bumped as part of the SPEC contract edits in Phase 2.
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Cut flowtron v1.1.0 — minor bump landing FinTown CORE-098 review proposals 1+2. (1) SPEC §"Post-closure protocol" canonical copy-paste line is now `/clear then /model <opus|sonnet> then /task <NEXT-ID>`; assistants resolve `<opus|sonnet>` to the next task's PLAN-line `[model]` tag at hand-off, pre-empting the Step 1.5 model gate (gate still fires on cold starts where the assistant didn't pick the model). (2) Phase 4 "Recap is recap-only" promoted from soft prose to an enforced `>` callout in SPEC, with reinforcing one-liners in both `task` and `micro-task` SKILLs. Touches: `SPEC.md` (3 edits), `claude/skills/task/SKILL.md` (2 edits), `claude/skills/micro-task/SKILL.md` (2 edits), plus doc currency updates to `SPEC/versioning.md` (patch/minor examples shifted off the just-cut release per CORE-043 precedent) and `docs/MIGRATION.md` (example pin → v1.1.0). Adopters: paste-line update is the one user-visible behavior shift; pasting the old form still works (Step 1.5 mismatch branch handles it). Proposal 3 (non-task-commit suggestion pattern) intentionally deferred — see the FinTown-side feedback note for rationale; revisit if a second adopter independently surfaces the same friction. Scratch file `flowtron-upstream-proposals.md` deleted at closure (contents absorbed by this tasknote + the v1.1.0 tag message).

**Archived:** 2026-05-07
