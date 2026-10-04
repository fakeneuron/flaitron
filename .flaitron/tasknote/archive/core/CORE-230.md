---
title: doc-nit-sweep
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: []
---

# CORE-230 | doc-nit-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix two doc nits surfaced by audit-docs 2026-05-30: SECURITY.md typo `/less-permission-prompts` → `/fewer-permission-prompts`, and AGENT-NEUTRALITY.md ledger row stale section ref + skill count (6 → 9).

## ⚡ Notes

**Relevance:** Proceed — targeted two-file doc nit patch, exactly the micro-tasknote niche
**Drift check:** SECURITY.md:49 and AGENT-NEUTRALITY.md:34 — will verify exact line numbers before editing
**Archive skim:** no prior tasknotes touch these paths
**Pattern survey:** doc-only patches; no code shape involved
**Implementation:** SECURITY.md:49 `/less-permission-prompts` → `/fewer-permission-prompts` (one-word fix). AGENT-NEUTRALITY.md:34 ledger row: File column updated from `SPEC.md` to `SPEC/tasknote-selection.md` (section moved in CORE-223.3); Reference column expanded from 6 to 9 skill names (added `/ft-debug`, `/ft-release`, `/ft-worktree-{start,end}`).
**Docs touched:** `SECURITY.md` and `docs/AGENT-NEUTRALITY.md` are both AI-referenced docs; content changed but README entry descriptions remain accurate — no change to `_project/tasknote/README.md`.

## ✅ Recap

Fixed two doc nits from the 2026-05-30 audit-docs run: (1) SECURITY.md:49 typo `/less-permission-prompts` → `/fewer-permission-prompts`; (2) AGENT-NEUTRALITY.md ledger row for canonical skill names updated to point at `SPEC/tasknote-selection.md` (where the section now lives) and extended from 6 → 9 entries (adding `/ft-debug`, `/ft-release`, `/ft-worktree-{start,end}`).

**Archived:** 2026-05-30
