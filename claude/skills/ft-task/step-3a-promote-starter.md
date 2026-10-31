# Step 3a — Promote a starter (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 3a when an existing tasknote has `status: starter`. See `claude/skills/ft-task/SKILL.md` for the always-loaded core dispatch.

The starter file already carries frontmatter and a `## 🌱 Starter context` body section captured at filing time. Promotion converts it into a full tasknote in place.

1. **Drift-check the captured context.** Read each path, line number, function name, and root-cause hypothesis cited in `## 🌱 Starter context` against current code. If anything has moved or been renamed since the starter was filed, surface the drift to the user before re-interpreting the task. Do not silently "correct" the seed.
2. **Update YAML frontmatter** in place:
   - `status: starter` → `status: in-progress`
   - Confirm/add `due:` (leave empty if none)
   - Confirm/add `related-tasks:` from the starter's Related sub-heading if not already present
3. **Replace the nav header.** Change `🌱 Starter (filed ...)` → `🟢 In progress · 🔗 [[<related-id-1>]] [[<related-id-2>]]`. Drop the `· 🔗 ...` segment if `related-tasks: []`.
4. **Insert spec sections** between the nav header and the `## 🌱 Starter context` block:
   - `## 🎯 Goal` — one-sentence goal derived from the starter context.
   - `## ✅ Acceptance` — checklist. When the starter carries `### Acceptance that decides it`, copy its criteria in verbatim as `- [ ]` items, skipping any unfilled template placeholder (`<Criterion>`): they are the operator-confirmed readiness basis (`<SPEC_DIR>/starter.md`). Phase 1 may add criteria, but it never silently rewords or drops these. If step 1's drift check finds that a criterion's path or command has moved, surface it to the user. The fix is the user's call, as for any drifted seed. Otherwise, populate during Phase 1 Discovery as the user clarifies what "done" looks like.
   - `## 🧩 Subtasks` — checklist; populate during Phase 1 Discovery with concrete, ordered steps.
   - `## 🔗 Related` — bullet list mirroring `related-tasks:` from the YAML frontmatter (one bullet per ID with short context, e.g., `- [[<CORE-017>]] — frontmatter (predecessor)`). If `related-tasks: []`, write `- (none)`.
   - **Fidelity check** — verify the starter's `Solution shape` / `Decisions locked` / `Files to touch` are reflected in the synthesized Goal (and earmarked for Phase 1's Acceptance/Subtasks population); flag any dropped substance to the user.
5. **Decide what to do with the `## 🌱 Starter context` block** — per-task call:
   - **Absorb (default):** the spec sections capture the distilled content; drop the starter block. Original lives in git history.
   - **Preserve verbatim:** keep the starter block as a quoted attachment under Phase 1 Discovery Notes.

   Use AskUserQuestion if unclear; default to absorb.
6. **Add the divider + four phase sections** below the spec sections, copied from the template (path resolved in Step 0) (📝 Phase 1: Discovery / 🛠️ Phase 2: Execution / 🧪 Phase 3: Testing & Linting / 🚀 Phase 4: Closure with their full checklists).
7. **Tick** `Reviewed the task entry in PLAN.md` in Phase 1 (already done in Step 1). Continue at **Step 4 (Phase 1: Discovery)**.

The starter's "Open at promotion" sub-heading feeds Phase 1 Step 5 (clarifying questions); resolve them via AskUserQuestion as part of Discovery.
