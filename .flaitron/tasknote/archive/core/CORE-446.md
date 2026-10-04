---
title: public-index leftovers
status: completed
tags: []
created: 2026-08-18
due:
related-tasks: [CORE-438, CORE-445, CORE-404, CORE-383]
touches:
  - README.md
  - SPEC/procedures/ft-task.md
  - docs/AGENT-NEUTRALITY.md
---

# CORE-446 | public-index leftovers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-438]] · 🔗 [[CORE-445]] · 🔗 [[CORE-404]] · 🔗 [[CORE-383]]

## 🎯 Goal

Clear four public-index leftovers: README All-docs no longer calls Cursor future, Quickstart points non-Claude users at Codex/Cursor MIGRATION wiring (Grok via PLATFORMS), glossary count matches GLOSSARY.md, and the `ft-task` SOP `last-verified` stamp records the CORE-445 re-sync.

## ⚡ Notes

**Relevance:** Proceed — four leftover claims still match HEAD (`README.md:59` Codex/grok wiring, `:72` ~60, `:89` Cursor future; `SPEC/procedures/ft-task.md:5` still `v5.15.0 · 2026-08-08` after CORE-445.3/.4 SOP body edits). Mechanical public-index sync; no design tradeoff.
**Best Practices Review:** N/A for code boundaries — markdown index sync. README All-docs / Quickstart are the public restatement of `docs/PLATFORMS.md` + `docs/MIGRATION.md` §1.2; AGENT-NEUTRALITY ledger row for README §Quickstart quotes the hatch and must move with it. SOP stamp follows `SPEC/procedures/README.md` (bump only after a real `source:` + `restates:` re-check; never a release pin). No refactor.
**Drift check:** PLAN cites still match: All-docs PLATFORMS blurb still says "Cursor and others future" after CORE-438 shipped `cursor/`; Quickstart still says "Codex / grok wiring" while MIGRATION §1.2 is Claude/Codex/Cursor and Grok is PLATFORMS contract-only + procedure pointer; GLOSSARY.md header is "~68 entries" (67 counted; tilde); SOP body already carries CORE-445 Fan-out YAML echo + archive-skim follow-edges, stamp does not. No SPEC contradiction.
**Archive skim:** [[CORE-438.4]] updated README `cursor/` layout bullet but left All-docs "future" clause; [[CORE-438.N]] treated that layout bullet as already landed. [[CORE-383]] created the Quickstart hatch + AGENT-NEUTRALITY ledger row (still quotes "Codex / grok wiring"). [[CORE-404]] aligned GLOSSARY/~60 with README; GLOSSARY later grew to ~68, README did not. [[CORE-445.3]] / [[CORE-445.4]] edited `SPEC/procedures/ft-task.md` (Fan-out echo, follow-edges skim) without bumping `last-verified:` — CORE-408.N: stamp asserts a re-check that actually ran. [[CORE-415.3]] last honest bump (`v5.15.0 · 2026-08-08`).
**Pattern survey:** Extend CORE-438.4 / CORE-383 / CORE-404 / CORE-415.3 — one-line public restatement, keep All-docs greppable, hatch + ledger row move together, SOP stamp uses live SPEC version + today after walking `source:` + `restates:`.
**Implementation:** README Quickstart hatch now names Codex / Cursor wiring (§1.2) and routes Grok to PLATFORMS (contract-only). All-docs PLATFORMS blurb restates today's surface (Claude+Codex full; Cursor thin; Grok pointer; others conversational). Glossary blurb ~60 → ~68 to match `docs/GLOSSARY.md` header (67 actual entries; tilde kept). SOP `last-verified` `v5.15.0 · 2026-08-08` → `v5.17.0 · 2026-08-18` after walking Fan-out YAML echo + archive-skim follow-edges against `claude/skills/ft-task/SKILL.md` and SPEC Phase 1; body already current, stamp was the miss. AGENT-NEUTRALITY Quickstart ledger row updated so the hatch quote does not re-stale. No refactor; tests N/A (markdown).
**Docs touched:** `README.md` — updated (deliverable). `docs/AGENT-NEUTRALITY.md` — updated (Quickstart hatch ledger row). `SPEC.md` / `docs/MIGRATION.md` / `docs/PLATFORMS.md` / `claude/AGENTS-snippet.md` / `codex/AGENTS-snippet.md` / `cursor/AGENTS-snippet.md` / `AGENTS.md` / `docs/CONVENTIONS.md` / `CONTRIBUTING.md` / `SECURITY.md` / `claude/CAPABILITIES.md` / `docs/AGENT-COMPAT.md` / `docs/EXTERNAL-AGENTS.md` / `docs/WORKTREES.md` — no change (MIGRATION §1.2 and PLATFORMS today's-surface were already correct; README now restates them). `SPEC/procedures/ft-task.md` is outside the AI-referenced cold-start list (lazy SOP); stamp bump is the named deliverable.

## ✅ Recap

Four leftover public-index claims cleared. `README.md` Quickstart hatch now points non-Claude users at MIGRATION Codex / Cursor wiring (§1.2) and PLATFORMS for Grok (contract-only); All-docs PLATFORMS blurb no longer calls Cursor future; glossary count ~68 matches `docs/GLOSSARY.md`. `SPEC/procedures/ft-task.md` `last-verified` bumped to `v5.17.0 · 2026-08-18` after re-checking CORE-445 Fan-out + follow-edges echoes against skill + SPEC (body already current). AGENT-NEUTRALITY Quickstart ledger row moved with the hatch. `git diff --check` clean; tests/lint N/A. No refactor. Maintainability: public index, ledger, and SOP stamp agree with the shipped Cursor thin bundle and CORE-445 SOP body.

**Archived:** 2026-08-18
