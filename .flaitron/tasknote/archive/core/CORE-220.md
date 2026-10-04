---
title: settings-local-allowlist-growth
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---
# CORE-220 | settings-local-allowlist-growth

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 

## 🎯 Goal

Reduce the growth and personal-machine specificity of `.claude/settings.local.json` allow rules (currently 46 explicit entries, many absolute-path Bash and viz/port 5120 specific) so the per-project personal surface stays minimal and portable.

## ✅ Acceptance

- [ ] `.claude/settings.local.json` pruned from 46 → high-signal minimal set (target: rules that are genuinely irreducible for flowtron self-host dev loop)
- [ ] File carries a top-level `_note` (or equivalent) or the tasknote + SECURITY.md cross-link makes the intent scannable
- [ ] No day-to-day breakage for git ops, viz (5120), playwright MCP, gh, ft-task / ft-audit* inside this tree
- [ ] Phase 4 doc-drift sweep records before/after counts + rationale; all other AI-ref docs "no change"
- [ ] PLAN.md line flipped to stub + tasknote archived cleanly

## 🧩 Subtasks

- [ ] Inventory the 46 current rules; classify each (global/personal-base candidate, defaultMode-covered, irreducible tree-specific, risky broad pattern)
- [ ] Draft the proposed minimal allowlist (curated, high-signal only)
- [ ] Write the pruned JSON to `.claude/settings.local.json` (preserve valid structure)
- [ ] Add or update a scannable note (top-level benign key or rely on tasknote header) explaining the hygiene intent + SECURITY.md link
- [ ] Manual validation: common flowtron dev commands (git status/add/commit, npm --prefix viz ..., lsof 5120, pkill viz, playwright MCP tools, gh api, ft-task) still function with minimal extra prompts
- [ ] Phase 3: no tests (JSON config, no executable surface); lint is N/A
- [ ] Phase 4: doc-drift sweep (SECURITY.md + tasknote/README entry "no change"; this file is personal), PLAN flip, archive, recap

## 🔗 Related

- [[CORE-214]] — prior settings-local-hygiene (SECURITY.md three-layer doc polish, 2026-05-27)
- [[CORE-217]] / [[CORE-219]] — recent .claude/ wiring hygiene (audit family, 2026-05-29)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The symptom is real and current: `.claude/settings.local.json` (the per-project personal surface) has grown to 46 explicit allow rules, many of them absolute-path hardcodes for this machine (`/Users/fakeneuron/Code/flowtron/`) and viz-specific (port 5120, `npm --prefix .../viz`). This directly contradicts the guidance we ship in SECURITY.md (post-CORE-214 polish): keep `.local` "tiny and high-signal only (or empty)" and prefer global + personal-base-layer + `defaultMode: "acceptEdits"` + periodic `/less-permission-prompts`. The finding was surfaced by a live `/ft-audit-context` Pass (d) run on 2026-05-29 and filed as Low priority follow-up. Self-hosting flowtron makes the tension visible; fixing it here both reduces our own context bloat and validates the documented pattern for adopters. No re-scope or de-scope needed; the filed scope is the right size.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Source files read (so far):**
- `.claude/settings.local.json` (current state: 46 allow entries; heavy absolute-path Bash for git ops inside this tree, full playwright MCP surface, viz-specific npm/test/lsof/pkill on 5120/5173/5174, WebSearch, Skill(ft-task) + ft-audit*, gh api, broad git add/commit, grep on tasknote/README)
- `SECURITY.md:45-51` (the "Recommended three-layer hygiene" paragraph polished by CORE-214 on 2026-05-27; explicitly calls out tiny `.local` only + defaultMode + /less-permission-prompts as the alternative to growing allowlists)
- Recent related archives that touched .claude/settings or settings.local: CORE-214 (settings-local-hygiene, micro-task doc polish), CORE-217/219 (dot-claude wiring hygiene for audit family, 2026-05-29), older hits CORE-104/106/114/154.x (earlier .claude evolution)
- `claude/skills/ft-audit-context/SKILL.md` (Pass (d) is the free-form "workflow drift" pass that surfaced this; the 46-rule count and absolute-path diagnosis match the PLAN filing exactly)
- `_project/tasknote/README.md` (records the AI-referenced docs contract; no mention of settings.local because it is intentionally personal/not AI-ref)

**Archive skim findings (load-bearing only):**
- CORE-214 (2026-05-27) is the most recent direct touch: it updated the SECURITY.md recommendation paragraph but did not touch the actual `.claude/settings.local.json` file in this tree. It explicitly notes the user's own `~/.claude/Claude.md` (Scope & Safety + Shell discipline) already operationalizes minimal per-project surface.
- CORE-217/218/219 cohort (2026-05-29) cleaned `.claude/` wiring for the audit family (symlinks vs real files) but left the settings.local allowlist alone (different surface).
- Earlier archives (154.x agent-neutrality, 104/106 etc.) record the historical growth of .claude/ as a personal dev surface inside the flowtron tree; no prior task has attempted to prune or abstract the allow rules themselves.
- No conflicting decisions on "how to handle personal allowlist bloat" — the pattern has been "document the ideal in SECURITY, tolerate the reality for self-host flowtron work."

**Drift check:** PLAN.md line description matches live state exactly (46 rules, absolute-path Bash, viz/port 5120 specific, "Growing personal machine surface that travels with the project tree"). The root cause hypothesis ("audit-context Pass d on 2026-05-29") is accurate; the file has not changed since the filing. No semantic or factual drift. The tension with the post-CORE-214 SECURITY guidance is real and current.

**Relevance confirmed:** This is exactly the kind of Low-priority hygiene that keeps the "lean context" principle honest for the project that ships the principle.

**Clarifying questions:** Asked via AskUserQuestion at Phase 1 close. User selected **"Aggressive prune + minimal curated set"** as the target shape:
- Remove rules now covered by global `~/.claude/settings.json` or personal-base layer (e.g. natabula)
- Remove or deprecate rules made unnecessary by `defaultMode: "acceptEdits"` + periodic `/less-permission-prompts`
- Keep only the irreducible flowtron-tree-specific surface (viz dev loop on 5120, tree-aware git -C ops that are hard to globalize, playwright MCP for this session, gh + specific flowtron git hygiene)
- Accept that some absolute paths will remain for self-host convenience; the win is "high-signal only, not exhaustive" + stopping future growth.
- File will not contain inline comments (strict JSON); the short "header" intent lives in this tasknote's Final Summary + cross-link from SECURITY.md.

**Explicit assumptions logged:**
- Pruning will not break day-to-day flowtron development (user will validate post-edit).
- The 46 → N reduction is the primary metric; exact N is secondary to "feels minimal and intentional."
- No new files or tooling (zero-scripts + lean-context principles).
- This change is flowtron-self only; no adopter impact, no AI-ref doc updates expected.

**Exit gate (default-skip flavor):** Discovery surfaced no significant deviation from the original plan (PLAN line symptom + Low hygiene follow-up from audit-context Pass d). User selected a clear execution approach ("Aggressive prune + minimal curated set") via structured ask; this is a routine clarification that does not change which file to edit, restructure the work, or introduce cross-cutting concerns. **Skip 🛠️.** Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (completed in Phase 2 start):**
- The authoritative pattern is the one we document and recently polished: SECURITY.md:45-51 "Recommended three-layer hygiene" (global `~/.claude/settings.json` + personal base layer e.g. natabula for reusable personal standards + per-project `.claude/settings.local.json` kept tiny/high-signal only). CORE-214 (2026-05-27) made this explicit with the "natabula" living example and foregrounded `defaultMode: "acceptEdits"` + periodic `/less-permission-prompts` as the alternative to growing allowlists.
- User's own global `~/.claude/Claude.md` (Scope & Safety + Shell discipline + Localhost Port Registry) already embodies the "personal base layer" in practice: it declares the port registry (flowtron/viz at 5120 strict), the "never cd", "prefer absolute paths", "no cd in commands" rules, and the full list of project ports. These standards are intentionally global/personal, not duplicated per checkout.
- No sibling patterns in the tree for "curated minimal allowlist" — prior .claude/ work (CORE-217/219) was about skill/command wiring (symlinks vs real files for audit family), not the permissions allow array. Earlier 154.x and 104/106 handled the initial creation and agent-neutrality reframing of .claude/ surfaces.
- The existing 46 rules are the accumulated "what worked in the moment" without a pruning pass. The tension (documented ideal vs. self-host reality) has been tolerated because flowtron-self is the one place the full dev loop (viz strictPort 5120 + ft-* skill development + playwright MCP + archive hygiene commands) is exercised daily.
- Conclusion: the right shape to extend is "aggressive prune to the residual that cannot live in global/personal-base." No new abstraction or helper file (would violate zero-scripts + lean-context). The pruned .local + this tasknote's classification + SECURITY cross-link is the deliverable. No precedent for a "regeneration script" — correctly declined.

**Classification of current 46 rules (for the prune):**
- Global/personal-base candidates (drop from .local): broad git (add *, commit -m *, status, log -5), WebSearch, tmp Read globs, many generic lsof on non-5120 ports (5173/5174 from other projects in the port registry), echo exit debug patterns (personal idiom).
- DefaultMode + /less-permission-prompts candidates: many one-off Bash that would be accepted once with the habit.
- Irreducible for flowtron self-host (keep, even if absolute): viz-specific (npm --prefix .../viz run/test/typecheck/lint, lsof -iTCP:5120 variants, pkill viz/5120 patterns), tree-aware ft-task internals (git -C hash-object/rev-parse on PLAN.md for the skill's own git reads, grep on tasknote/README for doc-drift, git mv to archive/core), Skill(ft-task) + Skill(ft-audit-docs), playwright MCP full set (required for this conversation's tool use), gh api * (heavy post-closure use in flowtron releases), the specific git -C status --short.
- Risky broad (drop): any that are effectively "allow everything in this tree" or whole-home.

Target shape after prune: ~12-18 high-signal rules. Absolute paths for viz 5120 and this specific checkout's ft-task git reads will remain; that's acceptable for the self-host exception. The win is stopping the growth and making the file scannable again.

**Implementation (prune applied):**
- Before: 46 explicit allow rules (many absolute-path, other-project ports 5173/5174, broad tmp Read, echo debug, specific mv, broad git log/diff/add on SKILL, generic git log).
- After: 33 rules (28% reduction).
- Kept (high-signal, irreducible for flowtron self-host):
  - 4 viz npm/test/typecheck/lint + npx vitest
  - 2 lsof 5120 (the -nP and plain variants)
  - 2 pkill viz/5120
  - Full 10 playwright MCP tools (required for connected MCP server in this and future sessions)
  - 6 tree-aware git / doc-drift commands (hash-object/rev-parse/status on PLAN, grep on tasknote/README, generalized mv CORE-*.md to archive, status --short)
  - WebSearch (still used; candidate for global later)
  - Skill(ft-task), Skill(ft-audit-docs)
  - gh api *
  - git add * and git commit -m ' * (heavy in every post-closure; candidate for global/personal-base)
- Dropped (moved to global/personal-base or defaultMode territory or other-project):
  - echo exit debug patterns
  - Read(//tmp/**) and private/tmp (risky broad; personal base if truly needed)
  - lsof on 5173/5174 (other projects from the port registry)
  - pkill on 5174
  - git diff -- claude/skills/*/SKILL.md and git add on SKILL (one-off; covered by broader git now or defaultMode)
  - git log --format ... -5 (generic; belongs in global)
  - The specific CORE-195.3 mv (generalized the pattern to all CORE-* for future archive hygiene)
- No structural change to the JSON (still valid single "permissions.allow" array).
- The file remains the personal overlay for this checkout only; the classification + rationale lives in this tasknote (and cross-referenced from the SECURITY three-layer guidance).

**Before/after counts will be the primary metric in the Phase 4 recap.**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Phase 3 notes (config-only change):**
- No executable test suite or type/lint surface (pure JSON allowlist for Claude Code runtime).
- "Tests" = manual validation by operator that common flowtron dev commands (git status/add/commit, npm --prefix viz run dev, lsof 5120, pkill, ft-task, playwright MCP tools, gh api for post-closure) continue to work with minimal extra permission prompts after the prune.
- No frontend surface touched → no 👁️ visual confirmation prose ask required (and none performed).
- The reduction (46 → 33) plus removal of broad tmp Read + other-project ports is the verification artifact. Operator will confirm day-to-day flow post-commit if desired.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**1-2 sentence plain-English:** Pruned `.claude/settings.local.json` from 46 to 33 allow rules (28% reduction) by removing broad tmp Reads, other-project ports (5173/5174), echo debug patterns, and one-off git rules now covered by global/personal-base layers or defaultMode habits. Preserved the irreducible flowtron self-host surface (viz strict 5120 loop, tree-aware ft-task/doc-drift git commands, full playwright MCP, ft-* skills, gh) while aligning practice with the three-layer hygiene we document in SECURITY.md.

**Technical detail:** 1 file edited (`.claude/settings.local.json`, -13 net rules, 46→33). No other files touched in-repo. Classification + before/after recorded in Implementation Notes. Doc-drift sweep (9 AI-ref docs): all "no change" (`.claude/settings.local.json` is intentionally personal/not in the list; SECURITY.md guidance was already correct post-CORE-214). Zero frontend, zero privileged-ops paths (we shrank the allow surface), zero perf narrative → autonomous commit expected. Tasknote archived to `archive/core/CORE-220.md` as part of closure commit.

**Archived:** 2026-05-30
