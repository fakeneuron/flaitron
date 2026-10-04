---
title: security-md updater section
status: completed
tags: []
created: 2026-08-22
due:
related-tasks: []
---

# CORE-462 | security-md updater section

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a SECURITY.md §"Fleet updater (tools/)" documenting `tools/update-adopters.mjs`'s threat posture, per audit-security 2026-08-22 (Finding #1, Low).

## ⚡ Notes

**Relevance:** Proceed — doc-only addition, no design tradeoffs; scope matches the PLAN.md line exactly.
**Best Practices Review:** N/A — pure documentation addition, no code changes; new section follows SECURITY.md's existing `###` subsection style (prose lead + bulleted behaviors, function/line citations).
**Drift check:** `tools/update-adopters.mjs` read end-to-end (current, 718 lines) — all six required points (execFile-only invocation, semver-constrained args, canonical-SHA cross-check, local-commits-never-push, dry-run default, symlink-following write footprint) confirmed present in current code with accurate line references. No SPEC conflict.
**Archive skim:** No prior tasknote titled/filed as `CORE-462`; `tools/update-adopters.mjs` itself was built across CORE-EPIC-459/460 (archived children CORE-459.2/.3/.4, CORE-460.2/.3/.4, audited in CORE-459.N/CORE-460.N) — confirmed current guard-chain order and function names match those archived descriptions, giving accurate line citations for this doc addition. SECURITY.md's own conventions (existing `###` subsections, `**bold-label**` bullets) reused rather than inventing a new style.
**Pattern survey:** New `###` subsection placed after "GitHub Actions CI" and before "Visualizer (`viz/`) dev-server scope" — both are flowtron-self/operator-side execution surfaces, so it groups with GitHub Actions CI rather than the adopter-facing Visualizer section. Bullet shape (bolded behavior label + prose + file:line citation) mirrors the Visualizer section's existing pattern.
**Implementation:** Added `### Fleet updater (\`tools/\`)` section to SECURITY.md covering: execFile-only git invocation (no shell-injection surface), semver-constrained tag arguments (`parseSemverTag`, incl. `FLOWTRON_UPDATE_LATEST` env override), canonical-SHA cross-check on checkout (`verifyPinnedSha` vs `FLOWTRON_REPO`, not the adopter's clone), local-commits-never-push (fetch --tags only network call, git push never invoked), dry-run default (`--apply` required to mutate), and the deliberate symlink-following write footprint under the workspace root (no post-resolution containment check, unlike the viz dev server — framed as an accepted scope difference: operator-invoked tooling over a workspace the operator already controls, not a service resolving attacker-influenced paths).
**Docs touched:** SECURITY.md updated (this task's deliverable). No other AI-referenced doc touches `tools/update-adopters.mjs`'s security posture specifically.

## ✅ Recap

Added SECURITY.md §"Fleet updater (`tools/`)" documenting `tools/update-adopters.mjs`'s threat posture: execFile-only git invocation, semver-constrained arguments, canonical-SHA cross-check on checkout, local-commits-never-push, dry-run default, and the deliberate symlink-following write footprint under the workspace root (with rationale for why it differs from the viz dev server's containment check). Doc-only change, no code touched. Verification: read the full section back to confirm it renders correctly and all line citations match current `tools/update-adopters.mjs`.

**Archived:** 2026-08-22
