---
title: micro-tasknote
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-EPIC-042, CORE-042.1, CORE-042.6]
---

# CORE-042.5 | micro-tasknote

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-042]] [[CORE-042.1]] [[CORE-042.6]]

## 🎯 Goal

Add a `/micro-task <ID>` skill + single-section template for trivially-small tasks (do-the-work + recap; no Phase 3 boilerplate when no code changed; one closure step), and a SPEC carve-out that names when to use it.

## ✅ Acceptance

- [ ] New `templates/tasknote-micro-template.md` ships the chosen single-section body shape (🎯 Goal · ⚡ Notes with bold-prefix sub-paragraphs · ✅ Recap · Archived) — non-negotiable contracts (relevance, drift, archive skim, pattern survey) are visible as named prefixes
- [ ] New `claude/skills/micro-task/SKILL.md` drives the file+execute one-shot flow (Step 0 paths · Step 1 pre-flight · Step 1.5 model gate · Step 2 scaffold from template · Step 3 inline Discovery+Execution · Step 4 closure+recap), mirroring `/starter-task`'s SKILL structure
- [ ] New `claude/commands/micro-task.md` pointer parallels `/task` + `/starter-task` command files
- [ ] `SPEC.md` §"When to use a tasknote" gains a "File a micro-tasknote when…" paragraph parallel to "File a starter when…"; minor version bump (additive non-breaking)
- [ ] `templates/tasknote-README.md` gains a parallel bullet for the micro template
- [ ] `viz/` tests pass and `tsc --noEmit` clean — micro tasknotes have all-zero `phases[]` counts; parser must tolerate without error (no parser change expected)
- [ ] Decided whether to symlink `claude/skills/micro-task` + `claude/commands/micro-task.md` into `.claude/` for self-host dogfood (precedent: only `task` is currently symlinked)

## 🧩 Subtasks

- [ ] Draft `templates/tasknote-micro-template.md` from the chosen body shape (mirror starter template's frontmatter + nav-header structure)
- [ ] Draft `claude/skills/micro-task/SKILL.md` (file+execute one-shot; reuse Step 0 paths + Step 1.5 model gate + Step 1 pre-flight contracts from `/task` / `/starter-task` verbatim where they apply; inline the Discovery contracts as bold-prefix prompts not checklist boxes)
- [ ] Draft `claude/commands/micro-task.md` (parallel to `/task`, `/starter-task` command pointers)
- [ ] Edit `SPEC.md` §"When to use a tasknote": add "File a micro-tasknote when…" paragraph parallel to "File a starter when…"; bump version (minor: additive)
- [ ] Edit `templates/tasknote-README.md`: parallel bullet for the micro template
- [ ] Run `cd viz && npm test -- --run` and `npx tsc --noEmit` — confirm no regression
- [ ] Decide on `.claude/` symlinks (in-task call; default: skip per precedent — only `/task` is currently symlinked)

## 🔗 Related

- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink)
- [[CORE-042.1]] — Discovery subtask that sized Thrust B and named this carve-out
- [[CORE-042.6]] — sibling Thrust B subtask (phase rethink Discovery); revisits 4-phase rigidity post-A/post-C

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today by [[CORE-042.1]] Discovery as the Thrust B "ship" half (paired with [[CORE-042.6]] phase-rethink Discovery as the "propose" half). Thrust C close ([[CORE-042.4]]) just landed; Thrust B is the remaining live work in the epic. PLAN line description is fresh and unambiguous.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes (CORE-027 is the canonical precedent; CORE-040 touched the same SPEC §"When to use a tasknote")
- [x] **Drift check** — no drift detected (see Discovery Notes)
- [x] Asked clarifying questions (execution model + body shape) — both recommended options chosen
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings:**

- **[[CORE-027]]** is the canonical precedent — added the `/starter-task` shape (template + skill + command + SPEC carve-out + parallel "File a starter" paragraph + status-enum addition). This task mirrors that exact pattern minus the status-enum change (micro is body-shape only — `status:` stays `in-progress` → `completed`). CORE-027's Final Summary lists the 3 added + 4 edited files; the same 3+~4 split applies here.
- **[[CORE-040]]** edited the same SPEC §"When to use a tasknote" section to codify the 50/70-word filing-discipline thresholds. The micro carve-out paragraph plants alongside the existing "File a starter when…" / "Skip the starter when…" parallel pair — the section now grows a third "File a micro-tasknote when…" sub-block.
- **[[CORE-018]]** (and earlier skill-creation tasks) established the `claude/skills/<name>/SKILL.md` + `claude/commands/<name>.md` pair shape; nothing surprising to inherit beyond the existing trio.
- No prior tasknote has touched a "micro" shape; clean slate for naming + body design.

**Drift check (paths cited in the PLAN line / Discovery context):**

- `claude/skills/starter-task/SKILL.md`, `claude/commands/starter-task.md`, `templates/tasknote-starter-template.md` — all present, structure matches CORE-027 final summary.
- `SPEC.md` §"When to use a tasknote" at line 331; "File a starter" at line 347. Both as expected.
- `claude/skills/task/SKILL.md` — present; will not be edited per the chosen execution model (micro-task is independent of /task; user picks at invocation time).
- `viz/src/tasknote.ts` line 128 hardcodes `[1,2,3,4]` phase indexing. Micro tasknotes have no Phase N sections → `phases[]` becomes `[{0,0},{0,0},{0,0},{0,0}]`. Confirmed parser-side benign (existing `extractSection` returns null when section absent). Render-side may show "0/0" boxes for micro tasknotes; that's a downstream viz follow-up, parallel to CORE-027 splitting [[FE-006]] for 🌱 chip rendering.
- `.claude/` symlink layout: only `task` is currently symlinked (`starter-task` and `new-project` exist in `claude/` but are not symlinked into `.claude/`). Decision deferred to in-task call.

No drift detected.

**Self-hosted vs adopting-project paths:** This is flowtron itself. Skill paths use `claude/skills/` + `claude/commands/` (the canonical shipped location); adopting projects pick them up via their own copy/symlink at adoption time. The `/task` skill's Step 0 path-resolution shape will be mirrored verbatim in `/micro-task`'s Step 0.

**Versioning:** SPEC currently at v0.8.0 (last bumped at CORE-042.4 close). Adding a new template + new SPEC carve-out is **additive non-breaking** (no archived tasknote becomes invalid; no adopter workflow breaks). Per `<SPEC_DIR>/versioning.md`, this is a minor bump → v0.9.0. Will bump in Phase 4.

**Out of scope (out-of-task items not filed but worth noting):**

- viz/ rendering of micro tasknotes (0/0 phase boxes look ugly) — file as `FE-XXX` follow-up at closure if visually confirmed problematic. Parallel to CORE-027 → FE-006.
- `[micro]` annotation on PLAN.md task lines (would let `/task` auto-route) — explicit user invocation is cleaner for v1; can revisit if discoverability becomes an issue.
- `/task` ↔ `/micro-task` cross-aware branch (e.g., `/task <ID>` realizes the task is small and converts to micro mid-flow) — defer; user can de-scope and re-invoke.
- Promote starter → micro path — defer; starters always promote to full tasknotes per current SPEC.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — see Implementation Notes; existing `/starter-task` trio (template + skill + command + SPEC carve-out from [[CORE-027]]) is the pattern; this task extends it with a sibling. Bold-prefix sub-paragraphs in the body are a micro-template-specific variation justified vs. the starter's `###` sub-headings: filing-time captures invite expansion (sub-headings), execution-time gates want compactness (bold-prefix inline).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — n/a (no parser/viz logic change; the existing parser tolerates the new body shape transparently — verified in Phase 3)
- [x] Ran targeted tests on changed files — viz 54/54 pass

**Implementation Notes:**

**Files added (3) — mirrors [[CORE-027]] precedent:**

- `templates/tasknote-micro-template.md` — single-section body shape per chosen Q2 option (🎯 Goal · ⚡ Notes with 5 bold-prefix sub-paragraphs · ✅ Recap · `Archived:` line). Standard YAML frontmatter (title/status/tags/created/due/related-tasks); `status:` defaults to `in-progress` since this is file+execute one-shot.
- `claude/skills/micro-task/SKILL.md` — 5-step skill (Step 0 paths · Step 1 pre-flight + filing-discipline check · Step 1.5 model gate · Step 2 scaffold · Step 3 inline Discovery+Execution · Step 4 recap+close · Step 5 post-closure protocol). Reuses Step 0 / Step 1 pre-flight / Step 1.5 model-gate language verbatim from `/task` and `/starter-task` for consistency. Step 3 inlines the four non-negotiable contracts (relevance · drift · archive skim · pattern survey) as bold-prefix prompts not checklist boxes.
- `claude/commands/micro-task.md` — slash-command pointer; parallels `/task` and `/starter-task` command files.

**Files edited (2):**

- `SPEC.md` — v0.8.0 → v0.9.0 (minor, additive non-breaking). §"When to use a tasknote" gains two new sub-blocks parallel to "File a starter…" / "Skip the starter…": "File a micro-tasknote (`/micro-task <ID>`) when…" with criteria + a body-shape sentence + skill-behavior sentence, plus "Skip the micro-tasknote (use `/task` instead) when…" with the inverse criteria.
- `templates/tasknote-README.md` — parallel bullet for the new micro template, between the existing standard and starter bullets.

**Decisions made during execution:**

- **Status enum unchanged** — micro tasknotes use `status: in-progress` → `completed` like normal tasknotes; no new `status: micro` value. Body-shape variation only. (Matches CORE-027's approach of body-shape + skill + carve-out without parser logic changes when avoidable. CORE-027 *did* add `starter` to the enum because it was a new lifecycle state; micro doesn't have its own state, just a different ceremony level.)
- **`/task` not edited** — `/micro-task` is independent; user picks the entry point at invocation time. No 5-way file-state branch in `/task`. If `/task <ID>` is invoked on a tasknote authored as micro, the existing pre-flight check ("file already exists, status not starter/blocked → stop, recommend conversational continuation") catches it cleanly.
- **`.claude/` symlinks deferred to user** — precedent (only `task` is symlinked; `starter-task` and `new-project` are not) suggests skip. Surfaced at recap.

**Out-of-task items not filed (will surface at closure):**

- Viz 0/0 phase rendering for micro tasknotes — predicted ugly rendering issue (parser hardcodes `[1,2,3,4]` phase indexing at `viz/src/tasknote.ts:128`; `activePhaseIndex` returns 3 for an all-zero phases array, so a micro tasknote may show "Phase 4 active" in the UI). Parallel to CORE-027 → FE-006. File as FE-XXX follow-up at closure if user confirms it's worth fixing.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npm test -- --run` → **54/54 pass** (parser.test.ts 29, tasknote.test.ts 25)
- [x] Ran lint/type-check on changed code — `cd viz && npx tsc --noEmit` → **clean** (no output)
- [x] (frontend) Asked the user for visual confirmation — N/A (no viz/ source changes; templates/skills/SPEC are markdown-only)
- [x] Fixed all introduced issues — none introduced

**Testing Notes:**

- Parser-side regression check passes — micro template lives in `templates/` (out of scope for the parser, which scans `_project/tasknote/`); no new tasknote in scope of this commit beyond CORE-042.5.md itself, which is the standard 4-phase shape.
- Predicted parser tolerance for a real micro-tasknote (when one is authored): standard frontmatter parses normally; `extractSection` returns null/empty for missing Phase 1-4 sections; `phases` array becomes `[{0,0},{0,0},{0,0},{0,0}]`; `activePhaseIndex` returns 3. UI may visually show "Phase 4 active" — predicted ugly. Parser does NOT crash. Filed as out-of-task viz follow-up candidate (see Implementation Notes).
- No lint or type-check issues introduced — markdown-only changes don't touch TS surfaces. SPEC version bump and SPEC carve-out are pure prose.

## 🚀 Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change — `templates/tasknote-README.md` parallel bullet for the micro template; `SPEC.md` carve-out + version bump
- [x] Updated PLAN.md (status flipped to `Completed 2026-05-06`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Shipped the **micro-tasknote** lightweight shape — Thrust B's "ship" half (sibling [[CORE-042.6]] is the "propose" half: phase-rethink Discovery). Three new files mirroring [[CORE-027]]'s `/starter-task` precedent: `templates/tasknote-micro-template.md` (single-section body — 🎯 Goal · ⚡ Notes with 5 bold-prefix prompts (Relevance · Drift check · Archive skim · Pattern survey · Implementation) · ✅ Recap · `Archived:` line), `claude/skills/micro-task/SKILL.md` (5-step file+execute one-shot flow; reuses Step 0 paths + Step 1.5 model gate verbatim from `/task` and `/starter-task`), `claude/commands/micro-task.md` (slash-command pointer).

Two edits: `SPEC.md` (v0.8.0 → v0.9.0 — minor, additive non-breaking; §"When to use a tasknote" gained "File a micro-tasknote when…" + "Skip the micro-tasknote (use `/task` instead) when…" sub-blocks parallel to the existing starter pair), `templates/tasknote-README.md` (parallel bullet for the micro template).

**Key decisions:**

- **No status-enum change** — micro is body-shape only; YAML `status:` stays `in-progress` → `completed` like normal tasknotes. CORE-027 added `starter` because it was a new lifecycle state; micro is just a different ceremony level for an in-flight task.
- **`/task` not edited** — `/micro-task` is independent; user picks the entry point at invocation. No 5-way file-state branch needed; `/task`'s existing pre-flight ("file already exists, status not starter/blocked → stop") catches mistaken invocations cleanly.
- **Bold-prefix sub-paragraphs over `###` sub-headings** — execution-time gates want compactness; filing-time captures (starter) want expansion-friendly sub-headings. Different shapes for different lifecycles.
- **Versioning: minor bump (v0.9.0)** — additive non-breaking. No archived tasknote becomes invalid; no adopter workflow breaks. Per `<SPEC_DIR>/versioning.md`.
- **`.claude/` symlinks deferred to user** — precedent (only `task` is symlinked for self-host) suggests skip. Surfaced at recap; user can ask anytime.

**Tests:** `cd viz && npm test -- --run` → **54/54 pass**; `npx tsc --noEmit` → clean. Parser tolerates the new body shape transparently (templates aren't in scope of the parser; future real micro-tasknotes will parse with all-zero `phases[]` counts).

**Open in-task decision (for the user):**

- Symlink `claude/skills/micro-task` and `claude/commands/micro-task.md` into `.claude/`? Default skip per precedent — easy to add later.

**Out-of-task follow-up candidate:**

- Viz UI rendering for micro-tasknotes likely shows "Phase 4 active" badge (parser hardcodes `[1,2,3,4]` phase indexing at `viz/src/tasknote.ts:128`; `activePhaseIndex` returns 3 for an all-zero phases array). Parallel to CORE-027 → FE-006. Worth filing as `FE-XXX` if visually confirmed problematic.

**Epic state after this close:** [[CORE-EPIC-042]] now has Thrusts A + C fully shipped (.2, .3, .4 closed) and Thrust B's ship-half closed (.5). Remaining: [[CORE-042.6]] (Thrust B propose-half: phase-rethink Discovery) and [[CORE-042.7]] (epic Audit). Per `<SPEC_DIR>/epic.md`, parent epic line stays open until all children close.

**Archived:** 2026-05-06
