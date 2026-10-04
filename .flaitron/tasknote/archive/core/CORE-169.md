---
title: spec/readme doc drift
status: completed
tags: [docs, audit-followup]
created: 2026-05-24
due:
related-tasks: [CORE-162]
---

# CORE-169 | spec/readme doc drift

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix two adopter-facing doc-drift hits surfaced by the 2026-05-23 audit: SPEC.md viz parenthetical (still "shipped per project", now global) and README.md bootstrap blurb (names only `/ft-task`, but the skill wires six tasknote skills).

## ⚡ Notes

**Relevance:** Proceed — targeted doc-drift fix; both cited findings still present in tree.
**Drift check:** SPEC.md:631 still reads "the read-only visualizer is shipped per project" inside the §"What flowtron does NOT provide" bullet on cross-project query API. README.md:36 still says "wire `/ft-task`" in the `/ft-new-project` bootstrap blurb. Both line numbers and wording match the audit citation.
**Archive skim:** CORE-162 (sibling viz-launch-style-drift, 2026-05-23) established `claude/AGENTS-snippet.md` as the canonical source-of-truth for viz wording and aligned MIGRATION.md to it — same pattern applies here for SPEC.md. CORE-154 epic carried the original viz-global migration. No conflicting guidance.
**Pattern survey:** Canonical viz wording lives at `docs/MIGRATION.md` §"Visualizer" + `claude/AGENTS-snippet.md` §"Visualizer" — both phrase it as "single global instance ... run [it] once per machine from flowtron's own checkout." Canonical six-skills enumeration lives at `docs/MIGRATION.md` §1.2 + `claude/AGENTS-snippet.md` lines 17 + 31-42 — `/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`. Reuse those phrasings; do not invent new variants.
**Implementation:** (1) SPEC.md:631 — replaced "shipped per project" with "a single global instance" inside the cross-project-query-API bullet, preserving the bullet's logical contrast (viz IS this; multi-project query API IS NOT). (2) README.md:36 — replaced "wire `/ft-task`" with "wire the six tasknote skills (`/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-epic-discovery`, `/ft-close-epic`)", mirroring the AGENTS-snippet enumeration. No semantic restructuring; both edits are in-place line replacements.
**Docs touched:** `SPEC.md` — updated (viz parenthetical). `README.md` — updated (bootstrap blurb). `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md` — no change.

## ✅ Recap

Closed two adopter-facing doc-drift hits from the 2026-05-23 audit. SPEC.md:631 now reads "the read-only visualizer is a single global instance" (matches MIGRATION.md + AGENTS-snippet); README.md:36 bootstrap blurb now enumerates all six tasknote skills the `/ft-new-project` skill wires (matches AGENTS-snippet §"One-time symlink wiring"). Both are in-place line replacements — no structural changes, no follow-up needed. CORE-170 (separate audit finding) remains open and unaffected.

**Archived:** 2026-05-24
