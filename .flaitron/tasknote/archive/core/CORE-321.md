---
title: ci-question
status: completed
tags: []
created: 2026-06-14
due:
related-tasks: []
---

# CORE-321 | ci-question

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Document flowtron's explicit decision to remain CI-free in `docs/CONVENTIONS.md §Declines`, with rationale consistent with the existing "assistant is the validator" principle.

## ⚡ Notes

**Relevance:** Proceed — CONVENTIONS.md has no CI entry at all; the audit gap is real and the doc-only fix is the right resolution.

**Drift check:** No paths/line numbers cited in PLAN.md. CONVENTIONS.md confirmed at HEAD with no §CI section; `.github/` directory does not exist.

**Archive skim:** No prior tasknotes in `.flowtron/tasknote/archive/core/` touch CONVENTIONS.md or the CI stance question specifically; the pre-commit hooks entry (already in CONVENTIONS.md §Declines) is the closest precedent and sets the pattern.

**Pattern survey:** The Declines section follows a consistent shape: convention name as H3 heading, one-sentence description of what's declined with a canonical reference, then rationale in 2–3 short paragraphs referencing PHILOSOPHY.md and/or SPEC.md. Match that shape exactly.

**Implementation:** Added `### CI / GitHub Actions` entry under `## Declines` in `docs/CONVENTIONS.md`. Rationale: same "assistant is the validator" argument as pre-commit hooks; `/ft-release` already gates on `npm test`, `npm run typecheck`, `npm run lint`; flowtron is a solo system with no external PR surface requiring automated enforcement.

**Docs touched:** `docs/CONVENTIONS.md` — added CI/GitHub Actions entry to §Declines.

## ✅ Recap

Added `### CI / GitHub Actions` to `docs/CONVENTIONS.md §Declines`. The entry documents the explicit decision to remain CI-free: CI would duplicate the validation already running in Phase 3 (targeted test/lint/typecheck per changed file) and in `/ft-release` (full `npm test`, `npm run typecheck`, `npm run lint` gate before the tag lands). Rationale cites the same PHILOSOPHY.md §"Zero scripts" backing principle as pre-commit hooks and release automation.

**Archived:** 2026-06-14
