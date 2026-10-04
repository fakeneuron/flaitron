---
title: release-global-install-doc
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [CORE-057.2, CORE-044, CORE-070]
---

# CORE-071 | release-global-install-doc

[← PLAN.md](../../../PLAN.md) · ✅ Completed 2026-05-10 · 🔗 [[CORE-057.2]] [[CORE-044]]

## 🎯 Goal

Surface the `/release` skill's one-time global install in `docs/MIGRATION.md` §1.0 and split §1.0's install block into adopter-facing vs flowtron-self-developer subsections so future self-only skills land in the right bucket.

## ✅ Acceptance

- [x] `docs/MIGRATION.md` §1.0 "One-time global install" subsection split into two labeled blocks: adopter-facing (`/new-project`) and flowtron-self-developer-only (`/release`).
- [x] `/release` symlink commands added (skill dir + command stub), mirroring `/new-project`'s install shape.
- [x] Labels make audience clear: `/new-project` block notes it's adopter-facing but also useful for flowtron-self developers bootstrapping new projects; `/release` block notes it's flowtron-self only (bails outside flowtron's checkout).
- [x] No edits to `SPEC.md` or other AI-referenced docs (CORE-070 owns the SPEC.md §"Working in the flowtron repo itself" expansion).
- [x] Markdown renders cleanly; rest of §1.0 narrative flow unchanged.

## 🧩 Subtasks

- [x] Apply the split-and-add edit to `docs/MIGRATION.md` §1.0 "One-time global install" subsection (lines 27–34 region), matching the preview the user approved in Phase 1.
- [x] Re-read the edited region for flow + label clarity; confirm rest of §1.0 narrative (intro + closing "If you don't have the skill installed…" paragraph) reads naturally with the split.
- [x] Phase 3 lint/render mental-pass: markdown headings/lists/code-fences balanced; no broken cross-references.
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (`README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md`) — per-entry verdict.
- [x] Phase 4 closure write: flip PLAN.md line to stub form, move under `## Completed`, move tasknote to `_project/tasknote/archive/core/CORE-071.md`.

## 🔗 Related

- [[CORE-057.2]] — Shipped `/release` skill (2026-05-09); explicitly chose NOT to wire `/release` into MIGRATION.md §1.2 adopter symlinks. The gap surfaced by today's audit is that the **global** install was never doc'd anywhere — Finding #4 closes that gap in §1.0.
- [[CORE-044]] — `/new-project` legacy detection; the closest install-doc precedent for §1.0's existing block shape.
- [[CORE-070]] — Sibling audit-derived task (Findings #3 + #5); owns SPEC.md §"Working in the flowtron repo itself" expansion. CORE-071 deliberately stays out of SPEC.md so CORE-070's edit lands atomically.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed — `/release` global install is currently undocumented anywhere in the canonical AI-referenced doc set (README / SPEC / MIGRATION / CLAUDE-snippet). New machines need to discover it from the release SKILL.md or from prior conversation; that's exactly the doc-currency gap Finding #4 calls out. The "consider splitting" hint is well-founded — `/new-project` install is broadly useful (adopters + flowtron-self developers bootstrapping their own projects); `/release` install is narrow (flowtron-self only). Mixing them in one block introduces noise for adopters.
  **Rationale:** see above.

- [x] Read relevant source files
- [x] **Archive skim** — `_project/tasknote/archive/core/`:
  - [[CORE-057.2]] (2026-05-09) — shipped `/release` skill; install shape confirmed: `~/.claude/skills/release` + `~/.claude/commands/release.md` symlinks targeting `~/code/flowtron/claude/skills/release` + `~/code/flowtron/claude/commands/release.md`. Acceptance line explicitly confirmed NOT added to MIGRATION.md §1.2 (adopter-facing). Pattern reference for §1.0's new block.
  - [[CORE-044]] / [[CORE-045]] — `/new-project` legacy detection + MIGRATION.md pre-flight; defined the current §1.0 install-block shape (per-line symlinks with `ln -s` and end-of-line targets). The split should preserve that shape inside each subsection.
  - No prior tasknote re-examined §1.0's audience split, so no contradicting decision.
- [x] **Drift check** — `docs/MIGRATION.md:27-34` confirmed at HEAD with exactly the `/new-project` install commands cited in the task. Section heading `### 1.0 Quick path: \`/new-project\`` confirmed at line 16. `claude/skills/release/SKILL.md:10` confirmed "flowtron-self only" framing still current. `~/.claude/commands/release.md` + `~/.claude/skills/release` global symlinks confirmed live (user's machine already has them; the doc gap is for re-installs / new machines). No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion (2026-05-10) — two questions answered:
  1. **Structural shape:** *Split §1.0 install block in two* (labeled subsections inside §1.0). User approved the preview verbatim — adopter-facing `/new-project` block first, flowtron-self-developer `/release` block second, both under a shared "One-time global installs" header.
  2. **SPEC.md touch:** *Leave for CORE-070*. CORE-071 stays out of SPEC.md; the cross-ref to the new MIGRATION.md flowtron-self surface lands when CORE-070 expands §"Working in the flowtron repo itself".

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- The preview the user approved is the authoritative shape for Phase 2. Reproduce the labels exactly: *"Adopter-facing — `/new-project` (also useful for flowtron-self developers bootstrapping new projects)"* and *"Flowtron-self developers only — `/release` (bails outside flowtron's checkout; never useful in adopter projects)"*.
- The existing closing paragraph at MIGRATION.md:34 ("The symlinks point at flowtron's working tree…") applies to BOTH blocks (same symlink semantics — direct-target rather than versioned). Keep it as a single shared paragraph after both blocks; don't duplicate it.
- The "If you don't have the skill installed, follow §1.1–1.7 manually below" sentence at MIGRATION.md:36 is `/new-project`-specific (no manual fallback exists for `/release` — it just doesn't run). Keep that sentence's scope tied to `/new-project` only; don't generalize.
- The subsection heading currently reads "**One-time global install**" (singular, bold-paragraph not heading). After the split it should read "**One-time global installs**" (plural). Stays as a bold-paragraph; not a real heading (the split's two labels are italic paragraph leads, not subsection headings — keeps the TOC and anchor structure stable).
- No code or test changes — pure markdown doc edit. Phase 3 is markdown-render mental-pass only; no lint/test command to run.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — existing §1.0 block shape preserved per-subsection: `**bold-paragraph**` header + ```sh code-fence``` + trailing prose. Italic paragraph leads (`_label_`) for the audience-split labels are a lightweight paragraph annotation pattern. No new shape introduced — pure markdown additive edit.
- [x] Implemented the minimal solution — single Edit call against `docs/MIGRATION.md:27-34` region, replacing the single install block with two labeled subsections under a pluralized header and generalizing the closing prose ("the skill" → "a skill") to apply to both.
- [x] Updated/added tests for non-trivial behavior — N/A (pure markdown doc edit; no test surface).

**Implementation Notes:**

Edit shape:

- `**One-time global install**` → `**One-time global installs**` (pluralized; bold-paragraph, not a real heading — TOC anchor structure unchanged).
- Inserted italic label `_Adopter-facing — \`/new-project\` (also useful for flowtron-self developers bootstrapping new projects):_` before the existing `/new-project` code-fence.
- Inserted italic label `_Flowtron-self developers only — \`/release\` (bails outside flowtron's checkout; never useful in adopter projects):_` + the `/release` install code-fence after the `/new-project` block.
- Closing paragraph reworded slightly: `... pin a specific flowtron version of the skill itself ...` → `... pin a specific flowtron version of a skill ...` — generalizes from singular (`/new-project`) to plural (now covers both blocks). Trailing "If you don't have the skill installed, follow §1.1–1.7…" sentence kept as-is (still `/new-project`-specific; `/release` has no manual fallback because it just doesn't run outside flowtron's checkout — Step 0 bails).

Net delta: ~10 lines inserted, 2 lines reworded. No cross-references broken (§1.1–1.7 pointer at the closing sentence still resolves; §3 / §2 pointers in the intro paragraph still resolve).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (pure markdown doc; no test surface).
- [x] Ran lint/type-check on changed code — N/A (flowtron does not ship a markdown linter). Mental render-pass on the edited region (re-read MIGRATION.md:16–50 after edit): headings/lists/code-fences balanced; no broken cross-references; italic paragraph leads render distinctly from bold-paragraph header; rest of §1.0 narrative (intro + closing "If you don't have the skill installed…" line) reads naturally with the split.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (markdown doc, not UI). The user pre-approved the rendered shape via the AskUserQuestion preview in Phase 1; Phase 2 reproduced it verbatim.

**Testing Notes:**

The visible rendered shape on GitHub / in any markdown viewer matches the user's approved preview, with one delta: the "after cloning flowtron to `~/code/flowtron/`" precondition clause from the original line was preserved (the preview omitted it, but it's load-bearing — symlinks don't resolve without flowtron at that path).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — **no change.** The §"Bootstrapping a new project" reference at L21–24 ("`/new-project` … one-time global install") stays valid; it's specifically about `/new-project` adoption, and the §1.0 pointer remains accurate (the reader following it for `/new-project` install finds it in the first subsection). The repo-layout line at L87 (`/task`, `/new-project`) does not yet list `/release` — that's CORE-070's territory per the Phase 1 gate decision.
  - `SPEC.md` — **no change.** §"Working in the flowtron repo itself" expansion is CORE-070's scope per the Phase 1 gate decision; CORE-071 stays out so CORE-070's edit lands atomically.
  - `docs/MIGRATION.md` — **updated.** §1.0 install block split into adopter-facing `/new-project` and flowtron-self-developer-only `/release` subsections; pluralized header; closing prose generalized "the skill" → "a skill". This IS the CORE-071 change.
  - `claude/CLAUDE-snippet.md` — **no change.** Adopter-facing CLAUDE.md block; doesn't reference global installs. Out of scope.
- [x] Closed — PLAN.md line flipped to stub form `[x] **CORE-071** [opus] | release-global-install-doc — Completed 2026-05-10.` (per SPEC §"`## Completed` archive convention"), moved under `## Completed`; tasknote moved to `_project/tasknote/archive/core/CORE-071.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate).

**Final Summary:**

`docs/MIGRATION.md` §1.0 "One-time global install" subsection split in two: adopter-facing `/new-project` block (also useful for flowtron-self developers bootstrapping new projects) and flowtron-self-developer-only `/release` block. `/release` global install is now documented in the canonical AI-referenced doc set for the first time. Future flowtron-self-only skills land cleanly in the second subsection. Single doc file touched; ~10 lines inserted, 2 lines reworded; no cross-references broken; SPEC.md left for CORE-070 as planned.

**Archived:** 2026-05-10
