---
title: validation-dev-server-separation
status: completed
tags: []
created: 2026-06-06
due:
related-tasks: []
---

# CORE-295 | validation-dev-server-separation

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Move `npm run dev` out of the `## Validation` section of AGENTS.md into its own heading so agents don't accidentally start the dev server during a validation sweep.

## ⚡ Notes

**Relevance:** Proceed — the PLAN.md description exactly matches current AGENTS.md state; `npm --prefix viz run dev` sits in the validation code block alongside `test`, `typecheck`, and `lint`.
**Drift check:** AGENTS.md `## Validation` block at lines 40–45 still contains `npm --prefix viz run dev`; the port note (`strictPort: 5120`) is on line 50. No drift from the filed description.
**Archive skim:** no prior tasknotes touch AGENTS.md validation layout.
**Pattern survey:** AGENTS.md uses a flat heading structure; adding a `## Dev Server` heading below `## Validation` follows the existing sibling-heading pattern.
**Implementation:** Removed `npm --prefix viz run dev` from the validation code block; extracted the port note and dev-server command into a new `## Dev Server` section directly below `## Validation`. Bare-form `npm run dev` note preserved in the new section via analogy to the bare-form guidance already in `## Validation`.
**Docs touched:** AGENTS.md only — no other AI-referenced docs changed.

## ✅ Recap

Removed `npm --prefix viz run dev` from the `## Validation` code block in AGENTS.md and relocated it — along with the port note — into a new `## Dev Server` section immediately below. Validation block now contains only `test`, `typecheck`, and `lint`; agents sweeping that section won't accidentally start the dev server.

**Archived:** 2026-06-06
