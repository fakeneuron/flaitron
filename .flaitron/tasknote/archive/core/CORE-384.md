---
title: conventions-declines-distribution
status: completed
tags: [docs, conventions, positioning]
created: 2026-07-31
due:
related-tasks: [CORE-374, CORE-382, CORE-383]
---

# CORE-384 | conventions-declines-distribution

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Record in `docs/CONVENTIONS.md` §"Declines" the positions flowtron already holds but has never written down — the distribution and integration conventions every popular peer adopts and flowtron deliberately does not.

## ⚡ Notes

**Relevance:** Proceed — filed 2026-07-31 from a competitive-landscape review of spec-kit / agent-skills / claude-task-master / Backlog.md, with operator sign-off the same session on submodule-only distribution. `CONVENTIONS.md` §"Declines" is the doc's stated purpose ("declines it on purpose and the position is worth recording", line 5), so the entries land in their canonical home.

**Best Practices Review:** Consolidated the filed four entries into three. PLAN.md item (2) "CLI / daemon distribution" duplicates two existing surfaces verbatim — `SPEC.md:679` ("A CLI tool (use `cp`, `mv`, and your editor)") and `PHILOSOPHY.md:51` ("It is not a CLI tool. It is not a database."). Restating it as a CONVENTIONS decline would add a third copy of the same position with no new information, which is the CHANGELOG anti-pattern this very doc declines. What *is* unrecorded is the narrower and genuinely distinct convention: the **distribution channel** (npm / uv global install, plugin marketplace, `npx skills add`) — orthogonal to whether the artifact is a CLI, since a package-manager-distributed flowtron would still be pure markdown. Merged filed items (2) and (4) into one entry on that basis; they also share a single rationale (the submodule *is* the SPEC #5 pin mechanism), and splitting them would duplicate it. Net: three entries, eight declines total.

**Drift check:** All four PLAN.md citations verified against current source — `claude/skills/ft-task/SKILL.md:16` resolves `<root>` = `.flowtron/core/` ✓; SPEC.md:19 #2 Zero scripts ✓; SPEC.md:20 #3 One task per context window ✓; SPEC.md:22 #5 Versioned and pinned ✓. No drift.

**Archive skim:** `grep -l CONVENTIONS .flowtron/tasknote/archive/core/*.md` → 8 hits. Load-bearing: **CORE-374** (`conventions-declines-count`, 2026-07-27) fixed drift where the declines *count and enumeration* are mirrored in `README.md:25` and `CONTRIBUTING.md:35`; it had to add the then-missing "CI / GitHub Actions" item to both. That establishes a standing invariant — **any change to the §Declines set must update both mirrors in the same commit.** Adding three entries re-breaks it unless both are patched. Handled below.

**Pattern survey:** Extended the established entry shape from the five existing declines: `### <Name>` → "Flowtron does not X. The pattern declined is [named external thing]." → rationale (often "Two reasons. First… Second…") → explicit backing-principle citation to `PHILOSOPHY.md` §"The decisions that fall out" or `SPEC.md`. No new shape introduced. Each new entry names a concrete peer implementation, matching how existing entries name release-please / semantic-release / pre-commit / Keep a Changelog.

**Implementation:** Added three §Declines entries to `docs/CONVENTIONS.md` — MCP servers, Package-manager and marketplace distribution, Template override stacking. Each cites the SPEC core principle it protects (#3, #5, and the two-project-precedent rule respectively) and the concrete peer that takes the opposite path. Updated both count mirrors per the CORE-374 invariant: `README.md` and `CONTRIBUTING.md` declines enumerations now list all eight. Deliberately did *not* restate the CLI/daemon decline — see Best Practices Review.

**Docs touched:** `docs/CONVENTIONS.md` — three new §Declines entries (the deliverable). `README.md` — §Documents declines enumeration extended to eight. `CONTRIBUTING.md` — same enumeration extended to eight. `SPEC.md` — no change; §"What flowtron does NOT provide" already covers the CLI carve-out and the entries cross-reference it rather than duplicating. `docs/VISION.md` — no change; §"What we won't accept" is the PR-rejection surface, and these are adoption-convention declines, not PR archetypes.

## ✅ Recap

Added three §"Declines" entries to `docs/CONVENTIONS.md` (+37 lines): **MCP servers** (cost against SPEC #3 — task-master's 36 tools ≈ 21k tokens of context spent before task work begins), **Package-manager and marketplace distribution** (the submodule *is* the SPEC #5 pin mechanism; skills resolve `<root>` at `.flowtron/core/`, so a marketplace install ships inert skills or forks the SSOT), and **Template override stacking** (spec-kit's 4-level chain vs. flowtron's single fork seam, backed by the two-project-precedent rule). Declines set: 5 → 8.

Scope consolidated 4 → 3 against the filed PLAN line. The filed "CLI / daemon distribution" entry was dropped as duplication — `SPEC.md:679` and `PHILOSOPHY.md:51` already state it — and its genuinely unrecorded half (the *distribution channel*) merged into the package-manager entry, which shares the same rationale. The new entry closes with an explicit disambiguation so a future reader doesn't read the two as contradictory: SPEC rules out flowtron *being* a CLI, CONVENTIONS rules out it being *delivered* by one.

Per the **CORE-374** invariant surfaced in the archive skim, both count mirrors were updated in the same commit — `README.md` §Documents and `CONTRIBUTING.md` §"Key documents" now enumerate all eight. Leaving either stale would have reproduced exactly the drift CORE-374 existed to fix.

Verification: 8 `###` headings under §Declines; both cited anchors (`ft-task` §"Step 0 — Resolve paths", MIGRATION §1.2.1) resolve; all four relative link targets exist. No code paths touched — lint / typecheck / test N/A.

For a future `/ft-audit` pass: these entries are positioning claims with an expiry. The token figure for task-master and spec-kit's override depth are both cited to mid-2026 peer state and will drift; the SPEC-principle backing will not. Related outward-facing work is queued in CORE-382 (positioning) and CORE-383 (README above-fold), which will surface these declines to first-time readers.

**Archived:** 2026-07-31
