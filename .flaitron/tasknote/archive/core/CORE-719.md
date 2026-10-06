---
title: dependabot-enable
status: completed
tags: []
created: 2026-10-06
due:
related-tasks: []
touches:
  - .flaitron/PLAN.md
---

# CORE-719 | dependabot-enable

[← PLAN.md](../../PLAN.md) · ✅ Completed

## 🎯 Goal

Enable GitHub Dependabot alerts and automated security fixes on fakeneuron/flaitron so `.github/dependabot.yml` (CORE-581) can fire.

## ⚡ Notes

**Relevance:** Proceed — `vulnerability-alerts` returned 404 and `automated-security-fixes` returned `enabled:false` at start.
**Best Practices Review:** N/A — repo-settings change via `gh api`, no code touched; the optional `/ft-release` §6 check was declined by the operator (not filed).
**Drift check:** no drift — PLAN.md line matched live repo state.
**Archive skim:** no prior tasknotes touch these paths.
**Declared scope:** `touches:` above (PLAN.md flip only; the deliverable is a GitHub setting).
**Pattern survey:** N/A — no code.
**Implementation:** Operator approved `gh` route. `PUT repos/fakeneuron/flaitron/vulnerability-alerts` → 204; `PUT …/automated-security-fixes` → 204.
Verified: `GET …/vulnerability-alerts` → 204; `GET …/automated-security-fixes` → `{"enabled":true,"paused":false}`.
**Docs touched:** no change.

## ✅ Recap

Dependabot alerts and automated security fixes are now enabled on fakeneuron/flaitron (both verified via `gh api`). No repo files changed beyond PLAN.md/tasknote closure. The optional `/ft-release` check was not added. Audit note: secret scanning remains disabled (out of scope).

**Archived:** 2026-10-06
