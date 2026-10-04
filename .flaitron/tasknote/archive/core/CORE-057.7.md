---
title: epic-md inline-cmds
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-057.6]
---

# CORE-057.7 | epic-md inline-cmds

[← PLAN.md](../../../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-057]] · [[CORE-057.6]]

## 🎯 Goal

Update SPEC/epic.md lifecycle steps 2 + 4 so they cite `/epic-discovery` and `/close-epic` as the canonical commands, not just bare `/task <ID>.1` / `/task <ID>.<final>`.

## ✅ Acceptance

- [x] `SPEC/epic.md` lifecycle step 2 cites `/epic-discovery` as the canonical command (with `/task <ID>.1` as the manual fallback) and notes it also handles step 1 filing in one motion
- [x] `SPEC/epic.md` lifecycle step 4 cites `/close-epic <ID>.<final>` as the canonical command (with `/task <ID>.<final>` as the manual fallback)
- [x] Steps 1, 3, 5 unchanged; bottom "**Skills.**" paragraph unchanged; lifecycle prose flows naturally top-down
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" — per-entry verdict (`SPEC/epic.md` itself is a lazy module, not on the cold-start list, but ripple-check the four cold-start docs)

## 🧩 Subtasks

- [x] Edit `SPEC/epic.md` step 2 to cite `/epic-discovery` (no-args; also covers step 1) with `/task <ID>.1` fallback
- [x] Edit `SPEC/epic.md` step 4 to cite `/close-epic <ID>.<final>` with `/task <ID>.<final>` fallback
- [x] Re-read full `SPEC/epic.md` end-to-end: confirm steps 1/3/5 untouched, bottom Skills paragraph still consistent with new inline cites, no double-cite redundancy
- [x] Phase 3: markdown mental-pass on `SPEC/epic.md`
- [x] Phase 4: doc-drift sweep + close + recap

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic (expand-shipped-skills)
- [[CORE-057.6]] — audit subtask that surfaced this drift

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Drift was explicitly filed by the CORE-057.6 audit (acceptance row 4: "SPEC/epic.md inline-step drift filed as CORE-057.7"). Mechanical doc edit, scope locked tight via AskUserQuestion (steps 2 + 4 only). No upstream blockers.

- [x] Read relevant source files — `SPEC/epic.md` (53 lines, current); confirmed step 2 (line 27) + step 4 (line 30) cite only `/task <ID>.1` / `/task <ID>.<final>` while bottom "**Skills.**" paragraph (lines 48-52) names both `/epic-discovery` + `/close-epic`.
- [x] **Archive skim** — `_project/tasknote/archive/core/` enumerated; relevant findings logged below.
- [x] **Drift check** — PLAN description's claim ("steps 2 + 4 cite only `/task ...`") verified accurate against current SPEC/epic.md at HEAD. No drift to flag.
- [x] Asked clarifying questions — scope question (tight steps 2+4 vs. broader incl. step 1) resolved via AskUserQuestion → user chose **Tight (steps 2 + 4 only)**.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Audit precedent:**
- **CORE-057.6 (audit that surfaced this):** Explicitly named the drift target ("SPEC/epic.md inline-step drift filed as CORE-057.7") and the framing ("✓ at the section-level" — bottom Skills paragraph clean; only the inline numbered steps drift).

**Skill-design facts (load-bearing for the wording):**
- **CORE-057.3 (`/epic-discovery`):** Skill is **no-args** (drives 5 AskUserQuestion in Step 2: area + shortname + priority + model + N). Files parent epic + `.1` + `.N` placeholder, then **scaffolds and drives the `.1` Discovery tasknote inline through full 4 phases in one motion**. Maps to lifecycle steps 1-2 jointly. SPEC/epic.md change in CORE-057.3 was the single 4-line "**Skill.**" paragraph at the file end; lifecycle text intentionally unchanged at that time.
- **CORE-057.4 (`/close-epic`):** Skill takes **`<AUDIT-SUBTASK-ID>`** arg (e.g., `/close-epic CORE-EPIC-057.6`). Hard-bails if not the highest `.N` child. Drives audit's full 4 phases inline + parent-flip prompt at closure. Maps to lifecycle steps 4-5 jointly. CORE-057.4 extended the SPEC/epic.md "**Skill.**" paragraph to "**Skills.**" (plural).

**Wording implication:** `/epic-discovery` cited in step 2 should be no-args (`/epic-discovery`, not `/epic-discovery <ID>`); `/close-epic` cited in step 4 takes the audit subtask ID (`/close-epic <ID>.<final>`).

**Scope decision (user-confirmed):** Tight — only edit the inline text of steps 2 + 4. Step 1 left as-is (its content describes WHAT to file; the canonical command for filing is implicitly carried by step 2's mention of `/epic-discovery` "also handles step 1 filing"). Bottom "**Skills.**" paragraph is already correct and unchanged.

**Doc-drift sweep targets at Phase 4:** README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md (per `_project/tasknote/README.md` §"AI-referenced docs"). SPEC/epic.md itself is a lazy module — not on the cold-start list — so my edit doesn't directly touch the cold-start surface but I'll ripple-check the four for drift caused by changes in canonical-command framing.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `grep` across `SPEC.md` + `SPEC/*.md` for slash-command citation style: SPEC.md uses parenthetical-with-backtick form (e.g., `**File a starter (\`/starter-task <ID>\`) when:**`, `re-invoking \`/task <ID>\`.`). SPEC/epic.md's existing step 2/step 4 already used the inline-parenthetical pattern. Extended that same pattern with a "via X (or Y)" reading; no new shape invented.
- [x] Implemented the minimal solution — 2 inline edits in `SPEC/epic.md` (step 2 lines 27-28; step 4 line 30-31). Steps 1, 3, 5 untouched. Bottom "**Skills.**" paragraph + Audit-acceptance + Forward-looking blocks untouched.
- [x] No tests added — markdown-only doc edit; no executable surface.

**Implementation Notes:**

**File touched:**
- `SPEC/epic.md` — 2 inline edits to lifecycle list:
  - **Step 2** (was: ``2. **Run Discovery** (`/task <ID>.1`). Deliverable: filed child entries in PLAN.md, not code.``) → ``2. **Run Discovery** via `/epic-discovery` (which also files the epic in step 1) or `/task <ID>.1` if filed manually. Deliverable: filed child entries in PLAN.md, not code.``
  - **Step 4** (was: ``4. **Run Audit** (`/task <ID>.<final>`) once all implementation children are closed. Final summary records findings even when nothing is wrong.``) → ``4. **Run Audit** via `/close-epic <ID>.<final>` (or `/task <ID>.<final>`) once all implementation children are closed. Final summary records findings even when nothing is wrong.``

**Wording rationale (user-confirmed in Phase 1):**
- Step 2 uses "via `/epic-discovery` (which also files the epic in step 1)" — directly mirrors the user's selected AskUserQuestion preview. Surfaces the steps-1-2-jointly fact at the point of mention without expanding the edit to step 1's text. Reader gets both "what to run" and "what gets bundled with it" in one parenthetical.
- Step 4 uses "via `/close-epic <ID>.<final>` (or `/task <ID>.<final>`)" — short fallback parenthetical (matches step 2's "or" structure). `/close-epic` ID arg form per CORE-057.4's design (`<AUDIT-SUBTASK-ID>` arg, hard-bails on non-highest-`.N`).

**Files reviewed but not edited (Phase 4 doc-drift sweep — per-entry verdict below).**

## 🧪 Phase 3: Testing & Linting

- [x] No targeted test suite — markdown-only edit, no executable code.
- [x] Markdown mental-pass on `SPEC/epic.md`:
  - Numbered lifecycle list intact (1-5); bold lead phrases preserved (`**File the epic**`, `**Run Discovery**`, `**Run children**`, `**Run Audit**`, `**Audit follow-ups.**`).
  - Backticks balanced — step 2 has 2 code spans (`/epic-discovery`, `/task <ID>.1`); step 4 has 2 code spans (`/close-epic <ID>.<final>`, `/task <ID>.<final>`). All pairs close.
  - Line widths held at ~73-74 chars per line (matches surrounding ~75-char prose).
  - Em-dash usage unchanged (file uses em-dash only in `step 2 — ` — not introduced here).
  - End-to-end re-read confirms: bottom "**Skills.**" paragraph (codifies the same skills at directory-pointer level: `claude/skills/epic-discovery/`, `claude/skills/close-epic/`) complements rather than duplicates the new inline slash-command cites — top-down reader sees "what command to run" inline, then "where the codification lives" in the closing paragraph.
- [x] No frontend surface to visually confirm.

**Testing Notes:**

Visualizer compatibility: the change is markdown-prose-only inside the existing lifecycle numbered list — no frontmatter shifts, no heading changes, no new sections — so any tool parsing SPEC/epic.md (e.g., the workspace visualizer) sees an identical structural shape.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (only generic "lifecycle" mention at line 13; no inline restatement of SPEC/epic.md steps).
  - `SPEC.md` — no change (§"Epic lifecycle" at line 74-76 cites `SPEC/epic.md` as canonical contract without restating steps).
  - `docs/MIGRATION.md` — no change (§1.2 already describes `/epic-discovery` and `/close-epic` correctly at the slash-command level; no inline `SPEC/epic.md` step text to re-sync).
  - `claude/CLAUDE-snippet.md` — no change (workflow-block paragraph already cites both skills with accurate descriptions; no inline SPEC/epic.md step text).
- [x] Closed — PLAN.md line for CORE-057.7 flipped to stub form `Completed 2026-05-09.` in place under CORE-EPIC-057 in `## Medium` (per cohort convention — siblings .1-.6 also stay nested; cohort moves to `## Completed` only when all children, including CORE-057.8, close). Tasknote moved to `_project/tasknote/archive/core/CORE-057.7.md`.
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Closed the SPEC/epic.md inline-step drift filed by the CORE-057.6 audit. Two inline edits to `SPEC/epic.md` lifecycle: step 2 now reads "**Run Discovery** via `/epic-discovery` (which also files the epic in step 1) or `/task <ID>.1` if filed manually..."; step 4 now reads "**Run Audit** via `/close-epic <ID>.<final>` (or `/task <ID>.<final>`)...". First-time top-down readers now see the canonical cohort skills at the inline command point — not only at the bottom "**Skills.**" paragraph. Tight scope per user-confirmed AskUserQuestion: steps 1/3/5 untouched (step 1's WHAT-to-file content remains accurate; the canonical command is implicitly carried by step 2's "(also files the epic in step 1)" parenthetical). Bottom "**Skills.**" paragraph (skill-dir codification level) + Audit-acceptance block + Forward-looking block all unchanged. Doc-drift sweep across the 4 AI-referenced cold-start docs (README.md, SPEC.md, docs/MIGRATION.md, claude/CLAUDE-snippet.md): no ripple — all four were already current at the slash-command level (MIGRATION.md §1.2 + CLAUDE-snippet.md ¶ already describe both skills correctly). With this child, CORE-EPIC-057 is one subtask away from completion (only CORE-057.8 — command-stub cross-refs — remains). Parent `CORE-EPIC-057` line + cohort move to `## Completed` only when .8 closes.

**Archived:** 2026-05-09
