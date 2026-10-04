---
title: docs-tooling-sweep
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: [CORE-EPIC-324, CORE-324.1]
---

# CORE-324.4 | docs-tooling-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-324]]

## 🎯 Goal

Audit `docs/` (MIGRATION, CONVENTIONS, PLATFORMS, etc.) and `tools/update-adopters.mjs` for accuracy, completeness, and code quality; apply inline fixes for each high-confidence finding.

## ✅ Acceptance

- [x] `docs/` set audited for accuracy (claims match SPEC + code), completeness, and internal/cross-doc consistency
- [x] `tools/update-adopters.mjs` audited for correctness and code quality
- [x] Each high-confidence finding fixed inline (low-confidence findings logged, not force-fixed)
- [x] Cross-reference + currency-stamp integrity preserved across edited docs
- [x] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [x] Fix AGENT-COMPAT.md:96 — Grok "re-verified at v5.5.0" → v5.7.0 (match matrix + PLATFORMS footer)
- [x] Fix GLOSSARY.md:63 — add `[medium]` to the `[model]` primary-label list
- [x] Fix GLOSSARY.md:81 — "four shapes" → "six shapes"; add Runtime security scanners + LLM knowledge-base
- [x] Markdown mental-pass on the 3 edits (grammar / lists / cross-refs)
- [x] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-324]] — parent epic (repo-best-practices-sweep)
- [[CORE-324.1]] — epic Discovery that scoped this child

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Epic child filed by CORE-324.1 Discovery; scope (audit `docs/` + `tools/update-adopters.mjs`, fix high-confidence findings) is current and unblocked. Siblings 324.2 (viz) and 324.3 (SPEC/skills) covered disjoint surfaces — no overlap.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Scope read:** All 10 `docs/` files (MIGRATION, CONVENTIONS, PLATFORMS, AGENT-COMPAT, AGENT-NEUTRALITY, GLOSSARY, DOGFOOD, PHILOSOPHY, VISION, WORKTREES) + `tools/update-adopters.mjs` (full).

**Archive skim:** update-adopters touched by CORE-312/319/322; docs touched by many (CORE-321 just refreshed CONVENTIONS' CI section; 324.3 swept SPEC + skills cross-refs and confirmed ft-flowtron roster = 23 skills). No load-bearing decisions contradict this sweep; 324.3's scope was disjoint (SPEC/skills, not docs/tool).

**Verified clean (no change):**
- `tools/update-adopters.mjs` — read in full; correct semver/migration-gate/symlink logic, header comments match code, Node≥20 guard, pathspec-scoped commit. No findings.
- Command/skill counts: 23 commands + 23 skills on disk → matches PLATFORMS.md "23" + MIGRATION.md "ships 23 slash commands, wires nine". Six forkable audit scaffolds + ft-audit-repo (7th) + ft-audit-context (standalone) all consistent across MIGRATION/GLOSSARY.
- AGENT-COMPAT matrix rows, PLATFORMS Grok/Codex footers, DOGFOOD stamp-location list, CONVENTIONS, AGENT-NEUTRALITY ledger, WORKTREES, VISION (six "won't accept" archetypes), PHILOSOPHY (historical narrative, CORE-132-defended) — all accurate.
- GLOSSARY "~52 entries" — counted 52 term definitions; accurate.

**Drift found (3 high-confidence fixes):**
1. `docs/AGENT-COMPAT.md:96` — §"Pre-adoption verification" prose says Grok "re-verified at v5.5.0", but the matrix row (line 37) AND the PLATFORMS.md Grok footer (line 238) both read `v5.7.0 · 2026-06-14`. Stale prose → bump to v5.7.0.
2. `docs/GLOSSARY.md:63` — `[model]` entry lists primary labels "`[heavy]` / `[light]`", omitting `[medium]`. SPEC §"Task-line format" (line 158), AGENT-NEUTRALITY ledger (line 44), and templates/PLAN.md all carry the 3-rung `[heavy]`/`[medium]`/`[light]` set (CORE-259 added `[medium]`). Add it.
3. `docs/GLOSSARY.md:81` — "PR / suggestion archetypes" defines "The four shapes" and lists 4, but SPEC §"PR / suggestion archetypes flowtron does not accept" and VISION §"What we won't accept" both enumerate **six** (adds Runtime security scanners + LLM knowledge-base subsystems). Fix count + add the two.

**Non-findings (judgment, left as-is):**
- `docs/MIGRATION.md:341-342` §3.4 example uses `[opus]`/`[sonnet]` model tokens. Specific model names are explicitly valid per SPEC §"Task-line format" ("Specific names … are valid precision tokens"); in a legacy-migration example they're fine. Not a defect — left unchanged.

**Clarifications:** No clarifications needed. Assumptions: (a) the PLAN line's "etc." = the full `docs/` set → audited all 10; (b) "high-confidence" = factual drift verifiable against SPEC / code / disk, fixed inline; style/voice nits left alone.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:** Pattern survey: each fix aligns the drifted doc to the already-canonical source (AGENT-COMPAT matrix row / PLATFORMS footer; SPEC §"Task-line format"; SPEC + VISION archetype lists) — extending existing canonical phrasing, no new shape introduced. Three single-line edits applied: AGENT-COMPAT.md:96, GLOSSARY.md:63, GLOSSARY.md:81. No code changed → no tests apply (docs-only). GLOSSARY "Last significant update" stamp left at CORE-301.5 — these are drift corrections to existing entries, not new-term additions.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** Docs-only change — no viz code touched, so the `npm` test/lint/typecheck gates don't apply. Verification is a markdown mental-pass: the AGENT-COMPAT prose now matches the matrix + PLATFORMS footer (v5.7.0); GLOSSARY `[model]` lists all three primary labels; GLOSSARY archetypes count (six) + members match SPEC and VISION. No frontend surface → no 👁️ ask.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (AI-referenced docs):**
- `README.md` — no change
- `SPEC.md` — no change (authoritative source the GLOSSARY edits align *to*)
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change (3-rung `[model]` set already correct here)
- `docs/PLATFORMS.md` — no change (Grok footer already v5.7.0; AGENT-COMPAT prose aligned *to* it)
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — **updated** (stale Grok stamp v5.5.0 → v5.7.0)
- (`docs/GLOSSARY.md` is lazy-loaded, explicitly excluded from this list — edited under task scope, not the sweep)

**Final Summary:** Audited the full `docs/` set (10 files) + `tools/update-adopters.mjs` for accuracy, completeness, and code quality. The tool and the bulk of the docs are accurate; fixed 3 high-confidence drift items inline: (1) `docs/AGENT-COMPAT.md` §"Pre-adoption verification" Grok re-verification stamp `v5.5.0`→`v5.7.0` (matrix row + PLATFORMS footer were already current); (2) `docs/GLOSSARY.md` `[model]` entry gained the missing `[medium]` primary label (CORE-259 rung); (3) `docs/GLOSSARY.md` "PR / suggestion archetypes" corrected "four shapes"→"six" and added Runtime security scanners + LLM knowledge-base subsystems to match SPEC + VISION. One judgment-call non-finding left as-is (MIGRATION §3.4 `[opus]`/`[sonnet]` examples are valid specific-name tokens). No follow-ups warranted.

**Archived:** 2026-06-14
