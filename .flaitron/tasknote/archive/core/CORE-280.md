---
title: release-gate-runs-viz-test
status: completed
tags: []
created: 2026-06-04
due:
related-tasks: [FE-052]
---

# CORE-280 | release-gate-runs-viz-test

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add `npm --prefix viz run test` as a hard gate in `/ft-release` Step 6 alongside lint/typecheck, so infra rot can't ship behind a green typecheck alone.

## ⚡ Notes

**Relevance:** Proceed — single-file, single-line addition; FE-052 unblocked the suite, so the gate is now safe to add.
**Drift check:** `claude/skills/ft-release/SKILL.md:164` — line 167 has `npm --prefix viz run lint; npm --prefix viz run typecheck`; line 170 says "does not re-run feature tests beyond this version-string lint gate." Both in scope. No drift from description.
**Archive skim:** no prior tasknotes touch `ft-release/SKILL.md` Step 6 test gate.
**Pattern survey:** the two existing commands use the `npm --prefix viz run <script>` shape — extend the same shape with a third command. Line 170 prose needs to be updated to reflect the new gate name ("lint/typecheck/test gate" vs "lint gate").
**Implementation:** Added `npm --prefix viz run test` to the shell block at line 167 (chained with `;`); updated line 170 prose from "version-string lint gate" to "version-string lint/test gate".
**Docs touched:** `claude/skills/ft-release/SKILL.md` — updated Step 6 shell block and accompanying prose. No other AI-referenced docs touched.

## ✅ Recap

Added `npm --prefix viz run test` as a third hard gate in Step 6 alongside lint and typecheck. Updated the explanatory prose on line 170 to name the gate "lint/test gate" so future readers don't think tests are skipped. One-file, two-line change.

**Archived:** 2026-06-04
