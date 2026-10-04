---
title: CLAUDE-snippet review against current Claude Code best-practices
status: completed
tags: []
created: 2026-05-09
related-tasks: [CORE-047]
---

# CORE-055 | CLAUDE-snippet review against current Claude Code best-practices

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-047]]

## 🎯 Goal

Review `claude/CLAUDE-snippet.md` against current Claude Code best-practices (Anthropic docs, Claude Engineer repo, X posts), gap-analyze, and revise in place — incorporating missing universal best-practices that benefit every adopter while keeping flowtron-specific contract surface focused (universal good-coding guidance stays in adopter's own CLAUDE.md, not the snippet).

## ✅ Acceptance

- [ ] External research complete: Anthropic Claude Code docs + Claude Engineer repo surveyed; current best-practices for adopter-facing CLAUDE.md content extracted (cap ~45 min)
- [ ] Gap analysis written (table form: best-practice / snippet coverage today / verdict — incorporate / out-of-scope / file follow-up)
- [ ] Snippet revised — additions/trims landed; structural change (if any) justified in Implementation Notes; cite-don't-restate (per CORE-051) preserved
- [ ] Non-snippet findings filed as follow-ups (lines staged for `/file-followup` or `/starter-task`; user files mid-task or post-closure)
- [ ] Doc-drift sweep — `docs/MIGRATION.md` §1.3, `README.md`, `docs/PHILOSOPHY.md`, `templates/` checked for downstream effects of snippet revision
- [ ] Version-bump impact noted in Implementation Notes (minor if structure changed / adopter re-paste; patch if prose-only)

## 🧩 Subtasks

- [ ] Fetch Anthropic Claude Code docs index (docs.claude.com/en/docs/claude-code/); enumerate sub-pages relevant to CLAUDE.md, project memory, context-priming, slash commands, hooks, MCP
- [ ] Fetch the most relevant Anthropic sub-pages; extract best-practice candidates into a working list
- [ ] Fetch Claude Engineer repo (github.com/Doriandarko/claude-engineer); skim its CLAUDE.md / system-prompt / setup patterns; extract patterns
- [ ] Cap research at 45 min; stop early if signal saturates
- [ ] Write gap-analysis table in Implementation Notes (best-practice / snippet coverage today / verdict)
- [ ] Decide revision shape — surgical in-place vs restructure; justify
- [ ] Edit `claude/CLAUDE-snippet.md` (cite-don't-restate preserved)
- [ ] Stage follow-up lines for non-snippet findings (PLAN.md long-description drafts; user files via `/file-followup` or `/starter-task`)
- [ ] Doc-drift sweep — `docs/MIGRATION.md` §1.3, `README.md`, `docs/PHILOSOPHY.md`, `templates/PLAN.md`, `templates/tasknote-README.md`
- [ ] Note version-bump impact (minor / patch) in Implementation Notes

## 🔗 Related

- [[CORE-047]] — doc-drift contract (precedent: extending adopter-facing surface contracts).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today (2026-05-09); snippet is structurally current per CORE-057.6 (lists all 6 adopter-facing commands + 12 symlinks). This task is on a distinct axis (best-practices coverage) from CORE-049 (token cost — explicitly excluded the snippet) and CORE-057.6 (skill-cohort currency — already verified). Adopter-leverage: a single revision propagates to every flowtron-adopting project on next bump.

- [x] Read relevant source files (`claude/CLAUDE-snippet.md` end-to-end; cited `docs/MIGRATION.md` §1.3 verified)
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — file paths cited in starter all present; only drift is the linecount note (55 → 61), non-load-bearing
- [x] Asked clarifying questions (research scope, revision shape, findings boundary — answered via AskUserQuestion)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Starter drift (logged at promotion):** starter cited `claude/CLAUDE-snippet.md` as "Currently 55 lines"; actual is 61 lines. Non-load-bearing prose drift; all cited paths present.
- **Archive skim (CLAUDE-snippet-touching):** 34 hits in `archive/core/`. Load-bearing precedents:
  - **CORE-049** (workflow token audit, 2026-05-08): explicitly excluded the snippet — "adopter paste-block, ships verbatim." Confirms this task is a distinct axis.
  - **CORE-057.6** (skill-cohort audit, 2026-05-09): verified snippet structural currency — "lists all 6 adopter-facing commands; 12 symlinks." So the review is **not** about structural drift; it's about whether the snippet's *content* reflects current Claude Code best-practices for adopter-facing CLAUDE.md.
  - **CORE-051/050** (cite-don't-restate baseline): trim pattern for SKILL.md surfaces. Snippet style bar: cite SPEC, don't restate. Current snippet honors this (line 12 cites SPEC.md; lines 17/20 cite SPEC sub-modules and tasknote/README).
  - **CORE-058** (de-scoped, 2026-05-09): considered moving the model-mismatch gate to a `UserPromptSubmit` hook (Claude Code feature surface) — rejected on viability grounds. Useful precedent: not every Claude Code feature surface (hooks, MCP, etc.) belongs in flowtron's adopter snippet — flowtron-specific contract is the bar.
- **Clarifying-question outcomes (user-confirmed):**
  1. Research scope: **Anthropic docs + Claude Engineer**, cap ~45 min, skip X.
  2. Revision shape: **Open to restructure if compelled** (default surgical).
  3. Non-snippet findings: **File as follow-ups** (`/file-followup` or `/starter-task`).
- **Snippet shape today (4 sections, 61 lines):**
  1. Block to paste into CLAUDE.md (lines 9–21) — the adopter-facing contract block; 12 lines of markdown
  2. One-time symlink wiring (lines 25–47) — sh commands + verify instruction
  3. Bumping the pinned flowtron version (lines 49–51) — 3-line note
  4. Visualizer (lines 53–61) — global instance + scan path + port pin
- **Boundary (per starter Decisions, confirmed):** universal good-coding guidance (formatting, tests, code review patterns) stays in adopter's own CLAUDE.md, not flowtron's snippet. Flowtron's snippet defines the **workflow contract** surface only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the **cite-don't-restate** pattern (per CORE-038/050/051): SPEC owns the contract; surface files (CLAUDE-snippet, SKILLs) cite SPEC by section rather than restating. Bullet 4 trim moves per-skill mechanical detail behind SPEC §"When to use" + SPEC/epic.md citations (both already present at end of original bullet — no new citation surface added). No new shape introduced.
- [x] Implemented the minimal solution (single line edit in `claude/CLAUDE-snippet.md`)
- [x] Updated/added tests for non-trivial behavior — N/A (prose-only doc revision; no executable behavior changed)

**Implementation Notes:**

### Research summary (Anthropic Claude Code docs)

Fetched and analyzed:
- `code.claude.com/docs/en/memory` — CLAUDE.md best-practices canonical page
- `code.claude.com/docs/en/best-practices` — patterns + DOs/DON'Ts table
- `code.claude.com/docs/en/common-workflows` — recipes + workflow patterns
- `code.claude.com/docs/en/skills` — skills page (commands have merged into skills under the unified model)

Skipped Claude Engineer repo (off-topic: autonomous tool-creating agent, not Claude Code project setup). Skipped curated X search (per scope decision). Saturated at ~25 min of the 45-min cap.

### Gap analysis

The snippet's job is the **flowtron-specific workflow contract surface** in adopter CLAUDE.md. Universal good-coding guidance stays in adopter's own CLAUDE.md (per starter Decision). The paste block is the only part that lands in adopter CLAUDE.md and is read every session — every line is recurring token cost (per `/best-practices` "Bloated CLAUDE.md files cause Claude to ignore your actual instructions").

| Best-practice (Anthropic docs) | Snippet coverage today | Verdict |
|---|---|---|
| **Conciseness — every line costs tokens every session** | Bullet 4 of paste block (~210w, dense per-skill mechanical detail for 5 skills) is over-specified | **Incorporate (trim).** Drop per-skill mechanical detail; cite SPEC §"When to use" (already cited at the end of the bullet). Keep names + when-to-reach-for-each. |
| **Specificity / verifiable instructions** | Strong — concrete paths, concrete slash commands | OK |
| **Bash commands the assistant can't guess** | Correctly delegated to symlink section (not in paste block) | OK |
| **`@path` imports for inlining files** | Not used. `@_project/flowtron/SPEC.md` would force-load full SPEC every session — too heavy | **Out-of-scope.** Path-cite is correct; SPEC is read on demand. |
| **AGENTS.md interop** | Not mentioned. Adopters using Cursor/Aider/etc. alongside Claude Code may want guidance | **File follow-up** (MIGRATION.md addition). |
| **CLAUDE.local.md for personal overrides** | Not mentioned | **Out-of-scope.** Adopter's personal preference layer, not flowtron's contract. |
| **Skills (vs commands) — merged under one model** | Symlink section wires both `commands/*.md` + `skills/*` directories. Paste block uses "slash command" (current terminology) | **OK.** Symlink-both pattern is correct under the merged model. |
| **Hook recommendations for deterministic gates** | Not mentioned. CORE-058 considered + de-scoped hooks for the model gate | **Out-of-scope** per CORE-058 precedent. |
| **Auto memory awareness (Claude Code v2.1.59+)** | Not mentioned. Auto memory is on by default; lives at `~/.claude/projects/<project>/memory/`. Adopters new to it may wonder how it relates to flowtron tasknotes | **File follow-up** (PHILOSOPHY.md or MIGRATION.md addition). Universal Claude Code feature, not flowtron contract — belongs in adopter-orientation docs, not snippet. |
| **`@` reference syntax in prompts** | Not mentioned | **Out-of-scope.** Universal Claude Code feature. |
| **Plan mode (Explore → Plan → Implement → Commit)** | flowtron's 4-phase workflow embodies this; bullet 3 says "drives Phase 1 Discovery before any code is written" | **Already covered.** |
| **Verification highest-leverage** | flowtron's Phase 3 (Testing & Linting) embodies this | **Already covered.** |
| **`/clear` between unrelated tasks** | Post-closure copy-paste line says `/clear then /model … then /task <NEXT-ID>` | **Already covered** (one layer down in SPEC). |
| **Sub-agents / parallel sessions / MCP / CLI tools / `/init` interop** | Not mentioned | **Out-of-scope.** Universal features. |
| **`/init` interop with adopter projects** | Not mentioned. `/init` may overwrite or conflict with flowtron's paste block | **File follow-up** (MIGRATION.md addition: order-of-operations note). |
| **Conciseness test ("would removing cause mistakes?")** | All bullets pass except bullet 4's per-skill mechanical detail | **Confirms trim above.** |
| **Block-level HTML comments stripped** | N/A — snippet *is* the maintainer surface | N/A |
| **Path-scoped rules** | flowtron's contract is global, not path-scoped | N/A |

### Revision decision

**Single in-snippet change: trim bullet 4 of the paste block** (~210w → ~80w, ~62% reduction). Cite-don't-restate consistent with CORE-038/050/051 baseline. No restructure compelled — 4-section snippet shape (Block / Symlinks / Bumping / Visualizer) is current. All other sections unchanged.

### Edits applied

- `claude/CLAUDE-snippet.md` line 17 — bullet 4 trimmed from ~210w to ~75w; per-skill mechanical detail moved to citation of SPEC §"When to use" + SPEC/epic.md (both already cited at end of original bullet — no new citation surface).

### Doc-drift sweep (verdicts)

- `docs/MIGRATION.md` §1.3 — **no change.** Points adopters at the snippet; structure unchanged.
- `README.md` — **no change.** No restatement of bullet 4 contents.
- `docs/PHILOSOPHY.md` — **no change.** No skill-mechanics restatement.
- `templates/PLAN.md` — **no change.** Plan template doesn't reference snippet.
- `templates/tasknote-README.md` — **no change** (verified).

### Follow-ups to file (non-snippet, per user-confirmed boundary)

Three lines staged for `/file-followup` post-closure (each fits ≤50w threshold):

1. **CORE-XXX | AGENTS.md interop note** — MIGRATION.md addition: for adopters using Cursor/Aider/etc. alongside Claude Code, document the `@AGENTS.md` import pattern (per docs.claude.com/en/memory#agents-md).
2. **CORE-XXX | /init interop note** — MIGRATION.md addition: order-of-operations clarification for adopters running `/init` before/after pasting the flowtron block.
3. **CORE-XXX | auto-memory awareness** — PHILOSOPHY.md or MIGRATION.md addition: clarify that Claude Code's auto memory (`~/.claude/projects/<project>/memory/`, on by default in v2.1.59+) and flowtron tasknotes are complementary — tasknotes are the canonical task record; auto memory is for cross-session learnings the assistant captures itself.

### Version-bump impact

**Patch** (prose-only trim; contract surface — what the snippet guarantees adopters' CLAUDE.md tells the assistant — is structurally unchanged). Adopters benefit from re-pasting on next bump but existing text remains correct, so no migration step needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose revision; no executable behavior). Visually verified the trimmed bullet 4 reads cleanly in context (line 17, paragraph weight matches sibling bullets 3 and 5).
- [x] Ran lint/type-check on changed code — N/A (markdown).
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend; the viz/ doesn't render the snippet).

**Testing Notes:**

Verification = read the trimmed paste block end-to-end in context. Bullet 4 now matches the sibling-bullet weight pattern (one bullet = one workflow concern, with SPEC citation for details). All 5 filing-skill names retained with one-clause when-to-reach-for-each criterion. SPEC citations preserved verbatim from original.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — verdicts:
  - `README.md` — **no change** (no skill restatements present)
  - `SPEC.md` — **no change** (canonical home for the per-skill detail trimmed from the snippet; cite-don't-restate working as designed)
  - `docs/MIGRATION.md` — **no change** (§1.2 adopter-setup skill descriptions serve a separate purpose from the per-session snippet; structurally independent)
  - `claude/CLAUDE-snippet.md` — **bullet 4 of paste block trimmed** from ~210w to ~75w (this task's deliverable)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Reviewed `claude/CLAUDE-snippet.md` against current Anthropic Claude Code best-practices (`/memory`, `/best-practices`, `/common-workflows`, `/skills` doc pages — Claude Engineer skipped as off-topic; X skipped per scope decision). Wrote a 17-row gap-analysis table; verdict: **single in-snippet revision** (trim bullet 4 of the paste block per cite-don't-restate baseline), **3 follow-ups staged** for non-snippet findings (AGENTS.md interop, `/init` interop, auto-memory awareness — all MIGRATION.md / PHILOSOPHY.md adopter-orientation territory).

**The trim:** bullet 4 went from ~210w (dense per-skill mechanical detail for 5 filing skills) to ~75w (5 skills + 1-clause when-to-reach-for-each + SPEC citation). All 5 skill names retained; per-skill mechanics now live behind SPEC §"When to use a tasknote (and when not to)" + SPEC/epic.md citations (both already present at end of original bullet — no new citation surface added). Cite-don't-restate baseline (CORE-038/050/051) extended; no new shape introduced.

**Version-bump impact:** patch (prose-only; contract surface structurally unchanged). Adopters benefit from re-pasting on next bump but existing text remains correct — no migration step needed.

**Follow-ups (staged for `/file-followup` post-closure, all ≤50w):**
1. AGENTS.md interop note for `docs/MIGRATION.md` — for adopters using Cursor/Aider/etc. alongside Claude Code, document the `@AGENTS.md` import pattern (per docs.claude.com/en/memory#agents-md).
2. `/init` interop note for `docs/MIGRATION.md` — order-of-operations clarification when adopters run `/init` before/after pasting the flowtron block.
3. Auto-memory awareness for `docs/PHILOSOPHY.md` or `docs/MIGRATION.md` — clarify Claude Code's auto memory and flowtron tasknotes are complementary (tasknotes = canonical task record; auto memory = cross-session learnings).

**Archived:** 2026-05-09
