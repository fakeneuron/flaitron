# Step 3c — Resume a blocked tasknote (executable steps)

> Lazy-loaded SKILL fragment. Loaded by `task` SKILL.md Step 3c when an existing tasknote has `status: blocked`. See `claude/skills/ft-task/SKILL.md` for the always-loaded core dispatch.

A blocked file normally carries frontmatter, the spec sections (🎯 Goal / ✅ Acceptance / 🧩 Subtasks / 🔗 Related), and partial Phase 2 progress captured before the parking event. Resume re-activates it in place.

**Exception — a `model-mismatch` park.** The `--unattended` model gate writes that note as a bare scaffold before Phase 1 runs (`unattended-mode.md` §"Pre-scaffold stops"): it carries no Discovery, Execution notes, or Phase 2 progress. Step 1 is a no-op for it, steps 2–4 run as written, and step 5 routes it to Phase 1 — first filling any Step 3b scaffold value the note lacks (🎯 Goal, `related-tasks:`, the epic Fan-out echo, and the `--loop` addendum when this run carries `--loop`).

1. **Drift-check the parked work.** Read each path, line number, function name, and pattern citation in the existing Discovery / Execution notes against current code. Phase 2 progress may rest on symbols that moved while the task was parked. Surface any drift to the user before re-entering execution.
2. **Update YAML frontmatter** in place: `status: blocked` → `status: in-progress`, and **remove the `park-reason:` key** — it describes a current stop, and the run is no longer stopped (`SPEC/blocked.md` §"Exit (resume)"). A stale code would misroute the next caller that reads it.
3. **Update the nav header.** Change `⏸ Blocked` → `🟢 In progress`.
4. **Optional cleanup of the PLAN.md line** — if `Blocked by [[ID]]` was added to the PLAN.md long description at parking, ask the user (AskUserQuestion) whether to remove it now. Default: leave it (it's accurate historical context and the line remains unchecked until completion).
5. **Continue at Phase 2 — or Phase 1 for a `model-mismatch` park.** On any other park the Phase 1 checklist is already complete — do not re-run it; pick up Execution where the parking note left off. A `model-mismatch` park continues at **Step 4 (Phase 1: Discovery)** instead.
