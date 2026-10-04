---
title: skill-description-dispatch-audit
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-328, CORE-328.1, CORE-328.2, CORE-328.4, CORE-328.5]
---

# CORE-328.3 | skill-description-dispatch-audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-328]]

## 🎯 Goal

Audit all bundled SKILL.md `description` fields for agent-dispatch quality — does each state when an agent should invoke it, per the Agent Skills on-demand-loading model — and fix human-first or ambiguous ones via existing-frontmatter edits only.

## ✅ Acceptance

- [x] All 22 bundled `claude/skills/*/SKILL.md` `description` fields read and classified against the Agent Skills on-demand-loading dispatch rubric (states/implies *when* an agent should invoke it, not just *what* it does)
- [x] Yield verified in Discovery Notes before any edits — bounded scope per PLAN.md line (7/22 flagged)
- [x] Human-first/ambiguous descriptions fixed via existing-frontmatter `description:` edits only (no body/structure changes)
- [x] Edited frontmatter still parses as valid YAML (name/description two-field shape unchanged)

## 🧩 Subtasks

- [x] Enumerate all bundled SKILL.md descriptions and classify each (pass / weak) against the dispatch rubric
- [x] Draft minimal "Use when…" trigger clauses for the weak cluster, matching existing voice/length
- [x] Apply edits to each flagged SKILL.md frontmatter description
- [x] Spot-check edited files for valid frontmatter

## 🔗 Related

- [[CORE-EPIC-328]] — parent epic (agent-memory epic)
- [[CORE-328.1]] — discovery (predecessor)
- [[CORE-328.2]] — agent-memory-positioning (predecessor)
- [[CORE-328.4]] — autonomous-loop-guidance (sibling, follows)
- [[CORE-328.5]] — audit (final subtask, follows)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-328.1 Discovery pre-flagged this as "low yield risk (descriptions already rich); bikeshed risk" but still cleared the net-positive filter — genuine audit warranted, bounded scope. Verified yield below: real but narrow (7 of 22 skills), so Proceed (not De-scope) with a light-touch fix.

- [x] Read relevant source files — all 22 `claude/skills/*/SKILL.md` frontmatter blocks (`name`/`description`).

- [x] **Archive skim** — read `CORE-328.1.md` (epic Discovery, this task's direct predecessor and filing rationale). No other archived tasknote touches SKILL.md description-quality specifically (grep on "SKILL.md" alone was too broad — nearly every tasknote references skill paths incidentally). No load-bearing prior art beyond CORE-328.1's own filing table.

- [x] **Drift check** — CORE-328.1 counted "23 `claude/skills/*/SKILL.md`"; current count is 22 (`find` verified). Trivial drift, not load-bearing — doesn't change the audit approach, just the denominator. No other drift: all cited skill dirs exist at HEAD.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Assumptions: (1) "bundled" = the 22 `claude/skills/*/SKILL.md` shipped in this repo, not adopter-side forks under `.claude/skills/`; (2) "agent-dispatch quality" is judged against Anthropic's Agent Skills on-demand-loading model — the `name`+`description` frontmatter is the only always-loaded context, so the description must let an agent decide *when* to invoke without reading the full body; (3) "existing-frontmatter edits only" means touching only the `description:` line text, not restructuring frontmatter shape or skill bodies.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Classification rubric:** does the description state or strongly imply *when* an agent should invoke it (a trigger/scenario), vs. only describing *what* it does or *how* to invoke it (args syntax, output location, internal mechanics)? Domain-specific keywords (e.g. "debugging", "epic", "worktree") count as a strong implicit trigger since they naturally match user phrasing.

| Skill | Verdict | Why |
|---|---|---|
| ft-task, ft-debug, ft-micro-task, ft-starter-task, ft-file-followup | **PASS** | Each states its own carve-out condition (threshold, "discovered mid-flow… isn't ready to start", "hypothesis-first debugging") — mutually differentiated by scenario. |
| ft-epic-discovery, ft-close-epic, ft-worktree-start, ft-worktree-end | **PASS** | Domain keyword ("epic", "worktree", "independent epic child") is a strong implicit trigger; mechanics (args, file paths) are appropriately secondary. |
| ft-new-project, ft-update, ft-release, ft-quality, ft-stats, ft-flowtron | **PASS** | Each names its own clear scenario ("fresh adoption only", "bump… to the latest", "flowtron-self only", "no args"). |
| ft-audit-repo | **PASS** | Explicit trigger clause up front: "for freshly adopting projects." |
| **ft-audit, ft-audit-backend, ft-audit-context, ft-audit-docs, ft-audit-frontend, ft-audit-performance, ft-audit-security** | **WEAK — fix** | All 7 read as adopter/maintainer documentation (pass count, output path, fork/customize instructions, `docs/MIGRATION.md` cross-ref) with **zero** "use when…" framing. The domain adjective (Security-/Backend-/Frontend-focused) gives *some* implicit signal, but every one of the 7 is 100% "what it produces + how adopters configure it" and 0% "when to reach for it" — the pattern the on-demand-loading model expects. This is the human-first cluster the task description was written to catch. |

**Yield: 7 of 22 (32%)** — real, narrow, matches the "low yield risk" pre-flag (most descriptions are already dispatch-quality; the one systematic gap is the audit-family template, which was clearly authored adopter-first — the `docs/MIGRATION.md §1.2.1` cross-ref and "adopters fork into…" clause are meta-info for a human setting up the skill, not a trigger for an agent deciding to invoke it). Fix: append a short "Use when…" clause to each of the 7, matching existing voice, before the adopter-mechanics tail. `ft-audit-repo` is the in-repo proof this pattern already works well — no other structural change needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `ft-audit-repo`'s description already leads with an explicit trigger clause ("First-contact holistic repo audit for freshly adopting projects") ahead of its mechanics. Extended that shape to the 7 weak descriptions instead of inventing new phrasing.

- [x] Implemented the minimal solution — inserted one "Use when…" sentence into each of the 7 flagged `description:` fields, placed after the pass-list/output-path clause and before the existing adopter-mechanics tail. No other frontmatter fields, body content, or non-flagged skills touched.

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only frontmatter edit; no executable surface). Verified all 7 files still parse as two-field `name:`/`description:` frontmatter (single `---` fence pair, no stray line breaks).

**Implementation Notes:**

Edited (existing-frontmatter `description:` line only, nothing else): `ft-audit`, `ft-audit-backend`, `ft-audit-context`, `ft-audit-docs`, `ft-audit-frontend`, `ft-audit-performance`, `ft-audit-security`. Each got a domain-specific "Use when the user asks to audit/review/harden/profile …" clause; `ft-audit` (the general scaffold) additionally notes to prefer the focused `ft-audit-*` skill when a domain is named, since it's the one skill with real dispatch overlap against its own siblings. Checked `claude/skills/ft-flowtron/SKILL.md`'s roster table and `claude/commands/ft-audit*.md` wrappers for verbatim-copy drift — both carry independent human-facing one-liners, not copies of the frontmatter `description:`, so no sync needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (frontmatter prose only, no executable surface).

- [x] Ran lint/type-check on changed code — N/A; markdown/YAML mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Mental-pass on all 7 edited frontmatter blocks: single `---` fence pair intact ✓ · two-field `name:`/`description:` shape unchanged ✓ · description stays one YAML-safe single-line string (no embedded newlines, no unescaped `:` breaking the mapping) ✓ · inserted clause matches surrounding voice/tense (imperative "Use when the user asks to…") ✓ · no other lines in any of the 7 files touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs: **no change**. None quote the 7 edited descriptions verbatim; `claude/skills/ft-flowtron/SKILL.md`'s roster table and `claude/commands/ft-audit*.md` wrappers carry independent human-facing one-liners (checked in Phase 2), also unaffected. Noted but out of scope: `docs/PLATFORMS.md`:180 says "23 `SKILL.md` skill bodies" vs. the current count of 22 (pre-existing drift unrelated to this task's dispatch-quality fix — flagged in Discovery, not touched here).

  > **Audit correction ([[CORE-328.5]], 2026-07-02):** the "22" denominator above (and in the Drift check + Final Summary) was a miscount — `git ls-tree` at this task's own commit shows 23 skill dirs, and the classification table above itself lists 23 skills (5+4+6+1+7). `docs/PLATFORMS.md:180`'s "23" is **correct**; no PLATFORMS drift exists. Do not "fix" PLATFORMS.md down to 22. The audit's substance (7 weak `ft-audit-*` descriptions, fixed) is unaffected.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-02.`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the 📦/skip closure marker below).

**Final Summary:**

Audited all 22 bundled `claude/skills/*/SKILL.md` `description` fields against the Agent Skills on-demand-loading dispatch model — does each state *when* an agent should invoke it, not just *what* it does. Verified yield matched the epic Discovery's pre-flag: 15 of 22 already pass (domain keywords or explicit scenario clauses give a strong implicit trigger); the 7-skill `ft-audit-*` family (general + backend/context/docs/frontend/performance/security, excluding `ft-audit-repo` which already led with a trigger clause) read as adopter-setup documentation — pass counts, output paths, fork/customize instructions — with zero "when to invoke" framing. Fixed via existing-frontmatter edits only: appended one domain-specific "Use when the user asks to …" clause to each of the 7 `description:` lines, matching `ft-audit-repo`'s existing pattern. No skill bodies, other frontmatter fields, or non-flagged skills touched.

**Archived:** 2026-07-02
